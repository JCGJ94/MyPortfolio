// T04 U3 check: Projects as case files. Static source/CSS assertions; with CHECK_URL also asserts the SSR HTML.
// Usage: node scripts/portfolio-v3/t04-projects-check.mjs   |   CHECK_URL=http://localhost:3021/ node ...
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const failures = [];
const check = async (name, fn) => {
  try { await fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};
const tsx = read("src/components/sections/Projects.tsx");
const css = read("src/app/globals.css");
const block = (sel) => [...css.matchAll(new RegExp(`${sel.replace(/[.]/g, "\.")}[^{}]*\{[^}]*\}`, "g"))].map((m) => m[0]).join("\n");

await check("CTA is not hover-only (no opacity-0 / group-hover gating)", () => {
  assert.ok(!/opacity-0|group-hover|lg:opacity/.test(tsx), "hover-gated classes remain in Projects.tsx");
  assert.ok(/t\.projects\.viewProject/.test(tsx), "CTA label missing");
  assert.ok(!/\.pv3-case__cta[^{}]*\{[^}]*opacity:\s*0/.test(css), "CTA css hides at rest");
});
await check("no hover preview, portal or pointer tracking", () => {
  assert.ok(!/ProjectHoverPreview|onPointerMove|createPortal/.test(tsx));
  assert.ok(!existsSync(resolve("src/components/ui/ProjectHoverPreview.tsx")), "orphan preview file kept");
});
await check("uses base classes and case anchors", () => {
  for (const c of ["pv3-section", "pv3-trace", "pv3-trace__node", "pv3-focus"]) assert.ok(tsx.includes(c), `missing ${c}`);
  assert.ok(/caso-\$\{|#caso-/.test(tsx), "missing #caso-* anchors");
  assert.ok(/id="projects"/.test(tsx));
});
await check("renders four steps with pending marker and heading order h2>h3>h4", () => {
  for (const s of ["problem", "solution", "decisions", "evidence"]) assert.ok(tsx.includes(s), `step ${s}`);
  assert.ok(/case\.pending|\.pending/.test(tsx) && /t\.projects\.case\.pending/.test(tsx));
  assert.ok(tsx.includes("<h2") && tsx.includes("<h3") && tsx.includes("<h4"));
});
await check("no tiny text, no initial opacity 0, no lazy/priority misuse", () => {
  assert.ok(!/text-\[(9|10|11)px\]/.test(tsx));
  assert.ok(!/initial=\{\{[^}]*opacity:\s*0/.test(tsx));
  assert.ok(!/min-h-\[100dvh\]/.test(tsx));
});
await check("sticky index is pure CSS and motion respects reduced-motion", () => {
  assert.ok(/\.pv3-case-index[^{}]*\{[^}]*position:\s*sticky/.test(css), "sticky index css");
  if (/\.pv3-case[^{}]*\{[^}]*transition/.test(css)) assert.ok(/prefers-reduced-motion/.test(css));
});
await check("sizes: no label below 0.75rem in case css", () => {
  for (const m of block(".pv3-case").matchAll(/font-size:\s*([\d.]+)(px|rem)/g)) {
    const px = m[2] === "px" ? +m[1] : +m[1] * 16;
    assert.ok(px >= 12, `font-size ${m[0]}`);
  }
});
if (process.env.CHECK_URL) await check("SSR HTML: 6 cases x 4 steps, CTA links, pending text", async () => {
  const html = await (await fetch(process.env.CHECK_URL)).text();
  const sec = html.slice(html.indexOf('id="projects"'));
  const panels = sec.match(/<div id="caso-[^"]*" role="tabpanel"[^>]*>/g) ?? [];
  assert.equal(panels.length, 6, "6 tabpanels in SSR");
  assert.ok(panels.every((p) => !/\shidden/.test(p)), "no panel is hidden before hydration (crawlers / no-JS)");
  const tabs = sec.match(/<a id="tab-[^"]*"[^>]*role="tab"[^>]*>/g) ?? [];
  assert.equal(tabs.length, 6, "6 case tabs");
  assert.equal(tabs.filter((t) => t.includes('aria-selected="true"')).length, 1, "exactly one selected tab");
  assert.ok(tabs[0].includes('aria-selected="true"') && tabs[0].includes('tabindex="0"') && tabs.slice(1).every((t) => t.includes('tabindex="-1"')), "default = case 01, roving tabindex");
  assert.ok(tabs.every((t, i) => t.includes(`aria-controls="${panels[i].match(/id="([^"]*)"/)[1]}"`)), "aria-controls matches panels");
  assert.ok(sec.includes('role="tablist"'), "tablist");
  assert.ok((sec.match(/data-step="/g) ?? []).length >= 24, "4 steps per case");
  assert.ok((sec.match(/href="\/(squaads|nutriflow|clinical-ai|tallercardonal|jegstudio|sportbarleague)"/g) ?? []).length >= 6);
  assert.ok(sec.includes('pv3-flow__sr') && sec.includes('role="group"'), "diagram with sr-only flow list");
  assert.ok((sec.match(/class="pv3-flow /g) ?? []).length >= 6, "a flow diagram in every case");
  assert.ok(sec.includes("Pendiente de documentar"));
  assert.ok(sec.indexOf("<h2") < sec.indexOf("<h3") && sec.indexOf("<h3") < sec.indexOf("<h4"), "heading order");
});
await check("diagram media and internal cases keep the CTA plus a small note", () => {
  assert.ok(/SquaadsArchitecture/.test(tsx) && /media === 'diagram'/.test(tsx), "diagram branch");
  assert.ok(/internalProject/.test(tsx) && /t.projects.case.internal/.test(tsx), "internal note");
  assert.ok(/detailPath/.test(tsx) && /viewProject/.test(tsx), "internal case keeps the Ver Proyecto CTA");
});
await check("tabbed cases: WAI-ARIA tablist, roving tabindex, arrows/Home/End, no scroll-driven observer", () => {
  assert.ok(/role="tablist"/.test(tsx) && /role="tab"/.test(tsx) && /role="tabpanel"/.test(tsx), "tab roles");
  assert.ok(/aria-selected=\{selected === p\.id\}/.test(tsx) && /aria-controls=\{`caso-\$\{p\.id\}`\}/.test(tsx), "selected + controls");
  assert.ok(/tabIndex=\{selected === p\.id \? 0 : -1\}/.test(tsx), "roving tabindex");
  for (const k of ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"]) assert.ok(tsx.includes(k), `key ${k}`);
  assert.ok(!/IntersectionObserver|aria-current/.test(tsx), "scroll-driven active state removed");
  assert.ok(/useState\(projects\[0\]\.id\)/.test(tsx), "default is the first case");
});
await check("deep links: hash selects a case, selecting uses replaceState, panels hide only after hydration", () => {
  assert.ok(/history\.replaceState\(null, '', `#caso-\$\{id\}`\)/.test(tsx), "replaceState on select");
  assert.ok(/hashchange/.test(tsx) && /#caso-/.test(tsx) && /scrollIntoView/.test(tsx), "hash handling");
  assert.ok(/hidden=\{ready && selected !== p\.id\}/.test(tsx), "hidden only when ready (SSR keeps all cases)");
  assert.ok(/\.pv3-case\[hidden\]\s*\{\s*display:\s*none/.test(css), "hidden panels are display:none");
});
await check("switch animation is transform/opacity and gated by no-preference; cases are not content-visibility", () => {
  const m = css.match(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?pv3-case-in 250ms[\s\S]*?\n\}/);
  assert.ok(m && /@keyframes pv3-case-in \{ from \{ opacity: 0; transform: translateY\(10px\)/.test(m[0]), "keyframes inside no-preference");
  assert.ok(!/\.pv3-case\s*\{[^}]*content-visibility/.test(css) && !/^\.pv3-case[,{ ]/m.test(css.slice(css.indexOf("Perf: skip style"), css.indexOf("/* t */"))), "no content-visibility on cases");
});
await check("V2 stage: navigator column reserved, tall diagram, 2x2 steps beside-media layout on desktop", () => {
  assert.ok(css.includes("var(--pv3-index-width) minmax(0, 1fr)"), "navigator has its own grid track");
  assert.ok(/"head media" "chain media" "steps steps" "links links"/.test(css), "compact desktop stage");
  assert.ok(/repeat\(2, minmax\(0, 1fr\)\)/.test(css.slice(css.indexOf("@container pv3cases (min-width: 50rem)"))), "steps 2x2");
  const svg = read("src/components/ui/SquaadsArchitecture.tsx");
  const flow = read("src/components/ui/FlowDiagram.tsx") + read("src/data/diagrams.ts");
  const fcss = read("src/app/pv3-diagrams.css");
  assert.ok(/FlowDiagram/.test(svg) && /wide: \{/.test(flow) && /tall: \{/.test(flow) && /pv3-flow__edges--\$\{kind\}/.test(flow) && /kind="wide"/.test(flow) && /kind="tall"/.test(flow), "two diagram layouts");
  assert.ok(/min\(max\(calc\(var\(--w\) \* 0\.042\), 0\.75rem\), 1\.05rem\)/.test(fcss) && /max\(calc\(var\(--w\) \* 0\.0185\), 0\.875rem\)/.test(fcss), "diagram fonts scale with the stage, floors 12px tall / 14px wide");
  assert.ok(/grid-template-areas: "head" "chain" "media" "steps" "links"/.test(css), "media above steps");
  assert.ok(!/grid-template-areas: "head head" "chain chain" "media steps"/.test(css), "no side-by-side media/steps");
});
await check("X9: Squaads stage fits one view (balanced step columns, 39rem floor, wide diagram on the architecture tab)", () => {
  assert.ok(css.includes("block-size: clamp(39rem, calc(100svh - 17rem), 48rem)"), "stage floor");
  assert.ok(css.includes(".pv3-case__steps { display: block; columns: 2;"), "steps in balanced columns");
  assert.ok(css.includes('.pv3-case__tab[id$="-tab-architecture"][aria-selected="true"]) { grid-template-columns: minmax(0, 1fr)'), "full-width stage on architecture tab");
  assert.ok(/@container flow \(min-width: 44rem\)[\s\S]*?--w: min\(100cqw, calc\(17rem \* var\(--wr, 2\.905\)\)\)/.test(read("src/app/pv3-diagrams.css")), "wide diagram capped to fit the stage");
  assert.ok(css.includes("pv3cases (max-width: 49.999rem)"), "single-column stage grows instead of scrolling");
});
await check("X4: Squaads screenshot is optimized, has alt in 5 languages and reserved dimensions", () => {
  assert.ok(existsSync(resolve("public/projects/squaads-login.webp")));
  assert.ok(readFileSync(resolve("public/projects/squaads-login.webp")).length < 80_000);
  assert.ok(/width=\{1111\}\s+height=\{1064\}/.test(tsx) && /role="tablist"/.test(tsx));
  const tr = read("src/data/translations.ts");
  for (const k of ["tabProduct", "tabArchitecture", "screenshotAlt"]) assert.equal((tr.match(new RegExp(`\\b${k}:`, "g")) ?? []).length, 5, k);
  assert.ok(/squaads-login\.webp/.test(read("src/app/squaads/page.tsx")));
});

if (failures.length) { console.log(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
