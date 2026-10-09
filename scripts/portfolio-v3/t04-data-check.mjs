// T04 U1/U2 check: tokens, section base, case model and i18n key parity.
// Usage: node scripts/portfolio-v3/t04-data-check.mjs
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import Module from "node:module";
import { resolve } from "node:path";
import ts from "typescript";

const root = resolve(".");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const load = (p) => {
  const filename = resolve(root, p);
  const m = new Module(filename);
  m.filename = filename;
  m._compile(ts.transpileModule(read(p), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
  return m.exports;
};

const failures = [];
const check = (name, fn) => {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};

// U1: tokens and section base
check("tokens.css defines the T04 tokens", () => {
  const css = read("tokens.css");
  for (const t of ["--pv3-space-24", "--pv3-space-section", "--pv3-measure", "--pv3-index-width", "--pv3-trace-width",
    "--pv3-trace-node", "--pv3-color-rule-strong", "--pv3-duration-trace", "--pv3-font-step-lede", "--pv3-font-step-label"]) {
    assert.ok(css.includes(`${t}:`), `missing ${t}`);
  }
});
check("globals.css defines .pv3-section and .pv3-trace", () => {
  const css = read("src/app/globals.css");
  assert.ok(css.includes(".pv3-section"), "missing .pv3-section");
  assert.ok(css.includes(".pv3-trace"), "missing .pv3-trace");
});
check("docs/portfolio-v3/secciones.md exists", () => assert.ok(existsSync(resolve(root, "docs/portfolio-v3/secciones.md"))));

// U2: case model
const { projects } = load("src/data/projects.ts");
const steps = ["problem", "solution", "decisions", "evidence"];
check("every project has a case with 4 steps or an explicit pending", () => {
  assert.equal(projects.length, 6);
  for (const p of projects) {
    assert.ok(p.case, `${p.id}: no case`);
    assert.ok(Array.isArray(p.case.pending), `${p.id}: pending must be an array`);
    for (const s of p.case.pending) assert.ok(steps.includes(s), `${p.id}: bad pending step ${s}`);
    for (const s of steps) {
      const v = p.case[s];
      const filled = Array.isArray(v) ? v.length > 0 : typeof v === "string" && v.trim() !== "";
      assert.ok(filled || p.case.pending.includes(s), `${p.id}: step ${s} empty and not pending`);
    }
  }
});
check("case text has no unsourced figures", () => {
  const bad = /\d+\s*%|lighthouse|24\s*\/\s*7|24\s*h\b|\d+\s*(usuarios|clientes|users)/i;
  for (const p of projects) assert.ok(!bad.test(JSON.stringify(p.case ?? {})), `${p.id}: unsourced figure in case`);
});

check("Squaads case is first, internal, with no colleague names, vendor, URLs or hosts", () => {
  const sq = projects[0];
  assert.equal(sq.id, "squaads-meeting-bot");
  assert.equal(sq.media, "diagram");
  assert.ok(sq.internalProject, "internalProject flag");
  assert.ok(!sq.demoUrl, "no demo link");
  assert.equal(sq.repoUrl, "https://github.com/devs-squaads/tldv-squaads-dev", "only the public repo link");
  const { repoUrl, ...visible } = sq;
  const text = JSON.stringify(visible);
  assert.ok(!/tldv/i.test(text), "tldv mentioned");
  assert.ok(!/https?:\/\/|www\.|\.(com|io|dev|net|app)\b/i.test(text), "URL or host");
  assert.ok(!/\d+\s*%/.test(text), "percentage");
  assert.ok(existsSync(resolve(root, "src/components/ui/SquaadsArchitecture.tsx")), "diagram component");
  assert.ok(sq.case.pending.includes("evidence"), "usage metrics pending");
});

// U2: i18n parity
const { translations } = load("src/data/translations.ts");
const flat = (o, pre = "") => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === "object" ? flat(v, `${pre}${k}.`) : [`${pre}${k}`]);
const reference = new Set(flat(translations.es));
check("new T04 keys exist in es", () => {
  for (const k of ["projects.case.index", "projects.case.problem", "projects.case.solution", "projects.case.decisions",
    "projects.case.evidence", "projects.case.pending", "projects.case.internal", "projects.case.diagramAlt", "projects.case.spanishOnly", "projects.case.moreDecisions",
    "about.facts.education", "about.facts.stack", "about.facts.projects",
    "stack.roles.backend", "stack.roles.frontend", "stack.roles.data", "stack.roles.ai", "stack.roles.tools", "stack.roles.languages", "stack.usedIn", "contact.errors.name", "contact.errors.email", "contact.errors.message", "contact.errors.submit", "stack.items.relationalModeling", "stack.items.languageEs", "stack.items.languageEn", "stack.items.testing"]) {
    assert.ok(reference.has(k), `missing ${k}`);
  }
});
check("es/en/de/fr/it have identical key sets", () => {
  for (const lang of ["en", "de", "fr", "it"]) {
    const keys = new Set(flat(translations[lang]));
    const missing = [...reference].filter((k) => !keys.has(k));
    const extra = [...keys].filter((k) => !reference.has(k));
    assert.deepEqual({ missing, extra }, { missing: [], extra: [] }, `${lang} differs`);
  }
});

check("project tags cover documented stack (Gemini, Railway, Vercel, TypeScript)", () => {
  const tags = (id) => projects.find((p) => p.id === id).tags;
  for (const t of ["Gemini", "Railway"]) assert.ok(tags("nutriflow").includes(t), `nutriflow ${t}`);
  for (const t of ["TypeScript", "Vercel", "Railway", "Gemini"]) assert.ok(tags("squaads-meeting-bot").includes(t), `squaads ${t}`);
});

if (failures.length) { console.log(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
