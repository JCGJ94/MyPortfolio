// T05 check for the site-wide tech icons (TechLabel + resolveTechIconKey). Static source assertions.
// Usage: node scripts/portfolio-v3/t05-site-icons-check.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const failures = [];
const check = (name, fn) => {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};

// Load the pure resolver by stripping the type annotations of techIcons.ts (no TS runtime needed).
const src = read("src/data/techIcons.ts")
  .replace(/export type BrandIcon[^\n]*\n/, "")
  .replace(/: Record<string, (BrandIcon|string)>/g, "")
  .replace(/\(name: string\): string \| null/, "(name)")
  .replace(/\(k\) =>/g, "(k) =>")
  .replace(/export /g, "");
const { resolveTechIconKey: resolve_, brandIcons } = new Function(`${src}; return { resolveTechIconKey, brandIcons };`)();

check("aliases and versions resolve to the right brand", () => {
  const cases = {
    "Next.js 16": "Next.js", "FastAPI (async)": "FastAPI", "FastAPI 0.136 (async)": "FastAPI", "Postgres": "PostgreSQL",
    "Tailwind": "Tailwind CSS", "Tailwind CSS 3.4": "Tailwind CSS", "SQLAlchemy 2.0": "SQLAlchemy", "LangChain LCEL": "LangChain",
    "Gemini 2.0 Flash": "Gemini API", "Gemini": "Gemini API", "Supabase (PostgreSQL)": "Supabase", "React 18 (Vite)": "React",
    "Flask (Python 3.13)": "Flask", "Pydantic v2": "Pydantic", "Vite 7": "Vite", "CSS 3": "CSS3", "GA4": "Google Analytics",
    "Drizzle": "Drizzle ORM", "NestJS 11": "NestJS", "Node.js": "Node.js", "REST API": "REST APIs", "pgvector (RAG)": "pgvector",
    "Testing (Jest/Vitest)": "testing", "Nvidia NIM": "NVIDIA", "Google Ads": "Google Ads", "JWT": "JWT",
  };
  for (const [name, key] of Object.entries(cases)) assert.equal(resolve_(name), key, name);
});
check("non-technology words and look-alikes get no icon", () => {
  for (const n of ["Colaboración", "Marketing", "SEO", "IA", "LLMs", "Git Flow", "Code Review", "Router de triage", "Salida tipada", "Alembic", "EmailJS", "Groq", ""])
    assert.equal(resolve_(n), null, n);
});
check("every resolved key exists as a brand icon or a TechIcon glyph", () => {
  const glyphs = read("src/components/ui/TechIcon.tsx").match(/const glyphs[^{]*\{([\s\S]*?)\n\};/)[1];
  for (const n of ["Next.js 16", "REST API", "pgvector", "Testing", "RAG"]) {
    const k = resolve_(n);
    assert.ok(brandIcons[k] || glyphs.includes(k), n);
  }
});
check("icons are decorative: aria-hidden, not focusable; labels keep the text", () => {
  const t = read("src/components/ui/TechIcon.tsx");
  assert.ok(/aria-hidden="true" focusable="false"/.test(t) && /export function TechLabel/.test(t));
  assert.ok(!/tabIndex|opacity/.test(t));
});
check("no opacity or tab stop in pv3-icons.css; hover scale gated", () => {
  const css = read("src/app/pv3-icons.css");
  assert.ok(!/opacity/.test(css) && /hover: hover\) and \(prefers-reduced-motion: no-preference\)/.test(css));
  assert.ok(/\.pv3-ti \{[^}]*inline-size/.test(css));
});
check("pv3-icons.css imported in layout; base rule no longer duplicated in pv3-stack.css", () => {
  assert.ok(/import '\.\/pv3-icons\.css'/.test(read("src/app/layout.tsx")));
  assert.ok(!/^\.pv3-ti \{/m.test(read("src/app/pv3-stack.css")));
});
check("TechLabel is used on every surface", () => {
  for (const f of ["components/ui/CaseAtAGlance.tsx", "components/ui/CaseHeader.tsx", "components/sections/Hero.tsx", "components/sections/About.tsx", "components/sections/Projects.tsx", "app/cv/page.tsx"])
    assert.ok(/<TechLabel /.test(read(`src/${f}`)), f);
});
check("footer, translations, projects data and diagram code untouched; no new dependencies", () => {
  const diff = execSync("git diff --name-only HEAD", { encoding: "utf8" });
  for (const f of ["src/components/layout/Footer.tsx", "src/data/translations.ts", "src/data/projects.ts", "package.json", "package-lock.json"])
    assert.ok(!diff.split("\n").includes(f), f);
  assert.ok(/FlowDiagram/.test(read("src/components/ui/SquaadsArchitecture.tsx")), "Squaads diagram is the shared FlowDiagram");
});
if (failures.length) { console.log(`\n${failures.length} failed`); process.exit(1); }
console.log("\nall passed");
