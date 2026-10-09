// T04 check for compact mobile projects, About (U4), Stack (U5) and Contact (U6). Static source/CSS/i18n assertions.
// Usage: node scripts/portfolio-v3/t04-sections-check.mjs [m|u4|u5|u6 ...]   (no args = all)
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const css = read("src/app/globals.css");
const tr = read("src/data/translations.ts");
const only = process.argv.slice(2);
const failures = [];
const check = (unit, name, fn) => {
  if (only.length && !only.includes(unit)) return;
  try { fn(); console.log(`ok   [${unit}] ${name}`); } catch (e) { failures.push(name); console.log(`FAIL [${unit}] ${name}: ${e.message}`); }
};
const langs = (key) => (tr.match(new RegExp(String.raw`\b${key}\s*:`, "g")) ?? []).length;

// --- M: compact project cases on mobile
const proj = read("src/components/sections/Projects.tsx");
check("m", "extra decisions live in a native <details> with a focusable summary", () => {
  assert.ok(/<details[^>]*pv3-case__more/.test(proj) && /<summary[^>]*pv3-focus/.test(proj));
  assert.ok(/moreDecisions/.test(proj));
});
check("m", "moreDecisions exists in the 5 languages", () => assert.equal(langs("moreDecisions"), 5));
check("m", "extra decisions stay collapsed at every width (tabbed compact stage)", () => {
  assert.ok(!/pv3-case__more::details-content/.test(css) && !/pv3-case__more summary \{ display: none/.test(css));
});
check("m", "mobile rhythm is tightened (media capped)", () => assert.ok(/pv3-case__media[^{}]*\{[^}]*max-block-size/.test(css) || /max-block-size[^;]*;[^}]*pv3-case__media/.test(css) || /\.pv3-case__media \{ max-block-size/.test(css)));

// --- U4: About as editorial manifesto
const about = read("src/components/sections/About.tsx");
check("u4", "no pills, KPI bar, blobs, glass, framer or 100dvh", () => {
  assert.ok(!/framer-motion|<motion|blur-3xl|backdrop-blur|min-h-\[100dvh\]|animate-float|rounded-full/.test(about));
  assert.ok(!/about\.stats|Cloud|24\/7/.test(about), "stats bar or Cloud 24/7 claim remains");
});
check("u4", "uses about composition classes, facts, numbered focus list, thesis", () => {
  for (const c of ["pv3-section", "pv3-about__lede", "pv3-about__points", "pv3-about__facts", "about.facts", "focusAreas", "about.p4"]) assert.ok(about.includes(c), "missing " + c);
  assert.ok(/<ul[^>]*pv3-about__facts/.test(about) && /<ol/.test(about) && /<blockquote/.test(about));
});
check("u4", "about css: reading measure and lede size", () => {
  assert.ok(/\.pv3-about__body[^{}]*\{[^}]*max-inline-size:\s*var\(--pv3-measure\)/.test(css));
  assert.ok(/\.pv3-about__lede[^{}]*\{[^}]*font-size/.test(css));
});
check("u4", "project count fact matches projects.ts in all languages", () => {
  const n = (read("src/data/projects.ts").match(/^ {8}id: '/gm) ?? []).length;
  const facts = [...tr.matchAll(/projects: '(\d+) /g)].map((m) => +m[1]);
  assert.equal(facts.length, 5);
  for (const f of facts) assert.equal(f, n);
});
// --- U5: Stack as an index by role linked to cases
const stack = read("src/components/sections/Stack.tsx");
const projData = read("src/data/projects.ts");
const stack3d = read("src/components/ui/Stack3D.tsx");
const stackCss = read("src/app/pv3-stack.css");
check("u5", "no dependencies, category colors or lucide icons; no 100dvh", () => {
  assert.ok(!/framer-motion|three|<motion|text-(emerald|blue|orange|amber|zinc|pink)-|lucide-react|min-h-\[100dvh\]|blur-3xl/.test(stack + stack3d));
});
check("u5", "3D layers are semantic lists with case anchors, projects data and roles", () => {
  for (const c of ["pv3-section", "pv3-stack", "Stack3D", "projects", "t.stack.roles", "t.stack.usedIn"]) assert.ok(stack.includes(c), "missing " + c);
  for (const c of ["pv3-s3d__layer", "pv3-s3d__chip", "<ul", "aria-pressed", "#caso-", "IntersectionObserver", "prefers-reduced-motion", "pv3-s3d__layerbtn"]) assert.ok(stack3d.includes(c), "missing " + c);
});
check("u5", "3D css: perspective, preserve-3d, transform-only motion, reduced-motion safe, no old tree", () => {
  for (const c of ["perspective", "preserve-3d", "translateZ", "rotateZ", "pv3-s3d__panel"]) assert.ok(stackCss.includes(c), "missing " + c);
  assert.ok(!/pv3-tree|(^|[\s;{])(top|left|width|height)\s*:\s*[^;]*var\(--(px|py|ex|sc)/m.test(stackCss), "old tree or layout-animating vars");
  assert.ok(/prefers-reduced-motion:\s*no-preference/.test(stackCss));
});
check("u5", "every technology is rendered as a list item (full list present)", () => {
  assert.ok(/layer\.items\.map/.test(stack3d) && /<li key=\{item\.label\}>/.test(stack3d));
  for (const r of ["frontend", "backend", "ai", "data", "tools"]) assert.ok(stack.includes(`'${r}'`), "layer " + r);
});
check("u5", "every declared tag exists in projects.ts and Squaads is reachable", () => {
  const declared = [...stack.matchAll(/tech\([^\[)]*\[([^\]]*)\]\)/g)].flatMap((m) => [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]));
  assert.ok(declared.length > 5, "no tag declarations");
  for (const tag of declared) assert.ok(projData.includes(`'${tag}'`), `tag not in projects.ts: ${tag}`);
  assert.ok(declared.includes("Bun") || declared.includes("Docker"), "Squaads tags not linked");
});
check("u5", "no hardcoded Spanish/English item labels; translated items exist in 5 languages", () => {
  assert.ok(!/Nativo|Intermedio|LLM Orchestration|Advanced Prompting|Relational Modeling/.test(stack));
  for (const k of [...stack.matchAll(/t\.stack\.items\.(\w+)/g)].map((m) => m[1])) assert.equal(langs(k), 5, `items.${k}`);
  assert.equal(langs("usedIn"), 5);
});
check("u5", "no duplicate technology names", () => {
  const names = [...stack.matchAll(/tech\('([^']+)'/g)].map((m) => m[1]);
  assert.ok(names.length > 20, "technology rows missing");
  assert.equal(new Set(names).size, names.length, "duplicates");
});
check("u5", "stack css exists with focus-visible link style", () => {
  assert.ok(/\.pv3-s3d__chip/.test(stackCss) && /\.pv3-stack a/.test(css) && stack3d.includes("pv3-focus"));
});
// --- U6: Contact as a single-column letter (markup/style/error strings only)
const contact = read("src/components/sections/Contact.tsx");
check("u6", "no cards, glass, blobs, infinite animation, motion or 100dvh", () => {
  assert.ok(!/framer-motion|<motion|AnimatePresence|backdrop-blur|blur-3xl|blur-\[100px\]|rounded-3xl|shadow-(xl|2xl)|animate-spin|repeat:\s*Infinity|min-h-\[100dvh\]|MapPin/.test(contact));
});
check("u6", "unchanged integration: schema, env vars, sends, field ids/names", () => {
  for (const s of ["contactSchema", "z.string().min(2", "NEXT_PUBLIC_EMAILJS_SERVICE_ID", "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
    "emailjs.send(serviceId, templateId, adminParams, publicKey)", "emailjs.send(serviceId, templateId, autoReplyParams, publicKey)",
    "to_email: 'jcdevelopment94@gmail.com'", "field('name'", "field('email'", "field('message'", "id: name,", "name,", "r1.status === 200 && r2.status === 200"]) assert.ok(contact.includes(s), "missing " + s);
});
check("u6", "letter composition: mailto in large text, underlined fields, no unsourced promises", () => {
  assert.ok(/href="mailto:jcdevelopment94@gmail\.com"/.test(contact) && contact.includes("pv3-contact__mail"));
  assert.ok(contact.includes("pv3-contact") && contact.includes("pv3-section") && contact.includes("pv3-contact__field"));
  assert.ok(!/contact\.guarantee|contact\.chatStatus|contact\.chat\b/.test(contact), "unsourced promise rendered");
});
check("u6", "error strings are translated in 5 languages and used", () => {
  assert.ok(contact.includes("t.contact.errors"), "errors not used");
  assert.ok(!/Hubo un problema|no válido|al menos \d+ caracteres/.test(contact.replace(/z\.string\(\)[^\n]*\n/g, "")), "hardcoded error text in JSX");
  assert.equal(langs("errors"), 5);
  assert.equal(langs("submit"), 5);
});
check("u6", "contact css: wrapping email, visible focus, reduced-motion safe", () => {
  assert.ok(/\.pv3-contact__mail[^{}]*\{[^}]*overflow-wrap:\s*anywhere/.test(css));
  assert.ok(/\.pv3-contact__field[^{}]*:focus[^{}]*\{[^}]*outline|\.pv3-contact__field:focus-visible/.test(css));
  assert.ok(!/\.pv3-contact[^{}]*\{[^}]*animation:[^}]*infinite/.test(css));
});

// --- A3: About as a readable editorial story (text untouched, phrases highlighted)
check("a3", "marks, kickers and timeline exist in 5 languages and every mark is a real phrase of its own text", () => {
  for (const k of ["marks", "kickers", "timeline"]) assert.equal(langs(k), 5, k);
  const blocks = tr.split(/\n {8}about: \{/).slice(1);
  assert.equal(blocks.length, 5);
  for (const b of blocks) {
    const body = b.slice(0, b.indexOf("\n        projects:"));
    const texts = [...body.matchAll(/\bp[1-4]: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]).join(" ");
    const marks = body.match(/marks: '((?:[^'\\]|\\.)*)'/)[1].split('|');
    for (const m of marks) assert.ok(texts.includes(m), "mark not in text: " + m);
  }
});
check("a3", "about reveals per block and highlights are reduced-motion safe", () => {
  assert.ok(/pv3-about__block/.test(about) && /<mark/.test(about) && !/framer-motion/.test(about));
  assert.ok(/\.js-reveal \.pv3-about__mark/.test(css));
});

// --- A5: entrances reach every section group, content stays visible without JS / reduced motion
check("a5", "reveal targets cover contact head and footer; hidden states are gated by js-reveal + no-preference", () => {
  const rv = read("src/components/ui/ScrollReveal.tsx");
  for (const t of [".pv3-contact__head", ".pv3-foot__inner", ".pv3-about__block", ".pv3-case__diagram"]) assert.ok(rv.includes(t), t);
  const block = css.slice(css.indexOf("/* A5 —"), css.indexOf("/* A4 — footer"));
  assert.ok(/@media \(prefers-reduced-motion: no-preference\)/.test(block));
  assert.ok(!/(^|\n)\.pv3-foot__inner[^{]*\{[^}]*opacity: 0/.test(block), "hidden state must sit under .js-reveal");
});
// --- A1/A2: navbar trace, living dividers, no NutriFlow emphasis in nav/hero
check("a2", "nav trace and dividers animate only under no-preference and stay pointer-less", () => {
  assert.ok(/portfolio-nav__trace \{[^}]*display: none/.test(css) && /portfolio-nav__trace \{ display: block; \}/.test(css));
  assert.ok(/#contact::after \{[^}]*pointer-events: none/.test(css));
  assert.ok(!/\/nutriflow/.test(read("src/components/layout/Navbar.tsx")) && !/\/nutriflow/.test(read("src/components/sections/Hero.tsx")));
});
check("x10", "hero entrance: LCP layers never start hidden, reduced motion is opacity-only, pointer loop is gated", () => {
  const x = css.slice(css.indexOf("/* X10 —"));
  assert.ok(/@keyframes hg-in \{\s*from \{ opacity: 0\.4;/.test(x), "shards must start visible (LCP candidate)");
  assert.ok(/prefers-reduced-motion: reduce\) \{[^]*hw-late/.test(x) && !/prefers-reduced-motion: reduce\) \{[^]*translate/.test(x.slice(x.indexOf("reduce) {"), x.indexOf("@keyframes hw-grid"))), "reduce entrance must be opacity-only");
  assert.ok(/classList\.contains\('is-live'\)/.test(read("src/components/sections/Hero.tsx")), "pointer parallax must skip off-screen");
});

if (failures.length) { console.log(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
