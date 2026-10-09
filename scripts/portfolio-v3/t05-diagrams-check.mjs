// T05 check for the data-driven, auto-running FlowDiagram (all six cases). Static source assertions plus the real data.
// Usage: node scripts/portfolio-v3/t05-diagrams-check.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const read = (p) => readFileSync(resolve(p), "utf8");
const failures = [];
const check = async (name, fn) => {
  try { await fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};
const tsx = read("src/components/ui/FlowDiagram.tsx");
const css = read("src/app/pv3-diagrams.css");
const data = read("src/data/diagrams.ts");
const { flows } = await import(pathToFileURL(join(process.cwd(), "src/data/diagrams.ts")).href);

await check("no new dependencies versus HEAD", () => {
  const head = JSON.parse(execSync("git show HEAD:package.json", { encoding: "utf8" }));
  const now = JSON.parse(read("package.json"));
  assert.deepEqual(now.dependencies, head.dependencies);
  assert.deepEqual(now.devDependencies, head.devDependencies);
});
await check("non-interactive: no buttons, handlers, focus, pin, Escape or live region", () => {
  assert.ok(!/<button|onClick|onMouse|onFocus|onBlur|onKeyDown|tabIndex|aria-pressed|aria-live|Escape|setHover|setPinned|userActive/.test(tsx), "no interaction code");
  assert.ok(!/cursor: pointer|aria-pressed|:hover|:focus/.test(css), "no interactive styling");
  assert.ok(!/Pasa el cursor/.test(tsx), "no helper text");
});
await check("stage and caption are hidden from assistive tech; visually hidden ordered list carries the flow", () => {
  assert.ok(/className="pv3-flow__stage" aria-hidden="true"/.test(tsx), "stage aria-hidden");
  assert.ok(/className="pv3-flow__bar" aria-hidden="true"/.test(tsx), "caption aria-hidden");
  assert.ok(/<ol className="pv3-flow__sr">/.test(tsx));
  assert.ok(/\.pv3-flow__sr \{[^}]*clip-path: inset\(50%\)/.test(css));
});
await check("edges are hidden from assistive tech and carry arrowheads", () => {
  assert.ok(/aria-hidden="true" focusable="false"/.test(tsx) && /markerEnd=/.test(tsx) && /<marker/.test(tsx));
});
await check("no play button; the flow runs by itself and pauses off-screen and in hidden tabs", () => {
  assert.ok(!/Reproducir|Play|Pause/.test(tsx) && !/pv3-flow__play/.test(css), "no button");
  assert.ok(/setTimeout/.test(tsx) && /visibilitychange/.test(tsx) && /document\.hidden/.test(tsx), "timer loop paused in hidden tabs");
  assert.ok(/STEP_MS = 1[89]\d\d|STEP_MS = 2\d\d\d/.test(tsx), "step no faster than ~1.8 s");
  assert.ok(/END_PAUSE_MS = 2400/.test(tsx));
  assert.ok(/IntersectionObserver/.test(tsx) && /dataset\.live/.test(tsx));
  assert.ok(!/requestAnimationFrame/.test(tsx));
});
await check("motion only under no-preference; reduced motion keeps static lines and a colour-only highlight", () => {
  const i = css.indexOf("@media (prefers-reduced-motion: no-preference)");
  assert.ok(i > 0, "no-preference block");
  const outside = css.slice(0, i);
  assert.ok(!/animation:/.test(outside) && !/stroke-dashoffset:\s*1/.test(outside), "no animation or draw-in outside the media block");
  assert.ok(/\.pv3-flow__run \{[^}]*display: none/.test(outside), "dashes hidden by default");
  assert.ok(!/transform: scale/.test(outside), "no scaling in reduced motion");
  assert.ok(/\.pv3-flow__node\.is-hot \{/.test(outside) && /\.pv3-flow__node\.is-dim \{ opacity: 0\.6/.test(outside), "highlight and ~60% dim without motion");
  assert.ok(/\[data-live="0"\][^{]*\{[^}]*animation-play-state: paused/.test(css), "dashes pause off-screen");
});
await check("readability floors: wide titles >= 14px, tall titles >= 12px", () => {
  assert.ok(/max\(calc\(var\(--w\) \* 0\.0185\), 0\.875rem\)/.test(css), "wide floor");
  assert.ok(/max\(calc\(var\(--w\) \* 0\.042\), 0\.75rem\)/.test(css), "tall floor");
});
await check("wide/tall layouts by container query; aspect ratios come from each diagram's viewBox", () => {
  assert.ok(/@container flow \(min-width: 44rem\)/.test(css));
  assert.ok(/--tr/.test(tsx) && /--wr/.test(tsx) && /aspect-ratio: var\(--tr/.test(css) && /aspect-ratio: var\(--wr/.test(css));
  assert.ok(/steps: \[/.test(data), "Squaads keeps its lifecycle steps");
});
await check("pv3-diagrams.css is imported by the layout; old dash rules are gone", () => {
  assert.ok(/import '\.\/pv3-diagrams\.css'/.test(read("src/app/layout.tsx")));
  assert.ok(!/pv3-case__diagram path\[pathLength\]/.test(read("src/app/globals.css")));
});
await check("every case has a diagram on its detail page and in the Projects stage; icons come from the resolver", () => {
  assert.ok(/resolveTechIconKey/.test(tsx) && /TechIcon/.test(tsx));
  assert.ok(/FlowDiagram/.test(read("src/components/ui/SquaadsArchitecture.tsx")));
  assert.ok(/flows\[project\.id\]/.test(read("src/components/sections/Projects.tsx")));
  for (const [route, key] of [["nutriflow", "nutriflowFlow"], ["clinical-ai", "clinicalFlow"], ["tallercardonal", "tallerFlow"], ["jegstudio", "jegFlow"], ["sportbarleague", "sportbarFlow"]]) {
    const page = read(`src/app/${route}/page.tsx`);
    assert.ok(page.includes("<FlowDiagram") && page.includes(key), route);
  }
  assert.ok(/<FlowDiagram/.test(read("src/app/squaads/page.tsx")) || /SquaadsArchitecture/.test(read("src/app/squaads/page.tsx")));
});
await check("data: six flows, edges and boxes reference existing nodes, one path per edge, labelled, no steps for non-lifecycles", () => {
  assert.deepEqual(Object.keys(flows).sort(), ["clinical-ai", "jegstudio", "nutriflow", "sportbarleague", "squaads-meeting-bot", "tallercardonal"]);
  for (const [id, f] of Object.entries(flows)) {
    const ids = new Set(f.nodes.map((n) => n.id));
    assert.equal(ids.size, f.nodes.length, `${id}: unique node ids`);
    for (const e of f.edges) assert.ok(ids.has(e.from) && ids.has(e.to), `${id}: edge ${e.from}->${e.to}`);
    for (const l of [f.wide, f.tall]) {
      assert.equal(l.edges.length, f.edges.length, `${id}: one path per edge`);
      for (const n of f.nodes) assert.ok(l.boxes[n.id], `${id}: box for ${n.id}`);
    }
    for (const s of f.steps ?? []) assert.ok(ids.has(s.node), `${id}: step node`);
    if (id !== "squaads-meeting-bot") {
      assert.ok(f.label && f.label.length > 30, `${id}: accessible label`);
      assert.ok(!f.steps, `${id}: no invented lifecycle`);
      assert.ok(f.nodes.length >= 3 && f.nodes.length <= 5, `${id}: small honest diagram`);
    }
    for (const n of f.nodes) assert.ok(n.caption && n.subtitle && (n.group === "ci" || n.title.length <= 20), `${id}/${n.id}: copy`);
  }
});
await check("no forbidden wording, code, hosts or invented numbers in the diagram data", () => {
  assert.ok(!/recruiter|reclutador/i.test(data + tsx + css));
  assert.ok(!/https?:\/\/|localhost|\.env|process\.env/i.test(data));
  assert.ok(!/\b\d+\s?(ms|s|%|x|k|GB|MB)\b/.test(data), "no metrics");
});

if (failures.length) { console.log(`\n${failures.length} failed`); process.exit(1); }
console.log("\nall ok");
