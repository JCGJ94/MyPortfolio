// T05 check for the Stack click-to-front interaction. Static source/CSS assertions.
// Usage: node scripts/portfolio-v3/t05-stack-focus-check.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const s3d = read("src/components/ui/Stack3D.tsx");
const css = read("src/app/pv3-stack.css");
const pkg = JSON.parse(read("package.json"));
const failures = [];
const check = (name, fn) => {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};

check("blocks are real buttons with aria-pressed bound to the featured block", () => {
  assert.ok(/<button type="button" className="pv3-s3d__layerbtn pv3-focus" aria-pressed=\{feat === layer\.key\}/.test(s3d));
});
check("neutral default: featured starts null and is exposed only as data-feat", () => {
  assert.ok(/useState<string \| null>\(null\)/.test(s3d) && /data-feat=\{feat \?\? undefined\}/.test(s3d));
});
check("Escape, stage click and re-click close the featured block", () => {
  assert.ok(/e\.key === 'Escape'\) close\(\)/.test(s3d));
  assert.ok(s3d.includes("closest('.pv3-s3d__layer')) close()"));
  assert.ok(s3d.includes("if (feat === key) return close()"));
});
check("idle auto-cycle stops after the first user choice and while featured", () => {
  assert.ok(/!locked\.current/.test(s3d) && /featRef\.current \|\|/.test(s3d));
});
check("css: featured flies via transform-only properties, siblings shrink back", () => {
  assert.ok(/\.is-feat \{[^}]*--face: 1/.test(css) && /\[data-feat\] \.pv3-s3d__layer:not\(\.is-feat\) \{[^}]*scale:[^}]*translate:/.test(css));
  assert.ok(!/(^|[\s;{])(top|left|width|height)\s*:\s*[^;]*is-feat/m.test(css));
});
check("css: featured card un-tilts with the exact inverse of the rig rotation, transform-only and without opacity", () => {
  assert.ok(/@property --face/.test(css));
  assert.ok(/rotateZ\(calc\(var\(--b\) \* var\(--face\) \* -1deg\)\) rotateX\(calc\(var\(--a\) \* var\(--face\) \* -1deg\)\)/.test(css), "inverse rig rotation");
  assert.ok(/--face 850ms/.test(css));
  assert.ok(!/\.is-feat(?!\s+\.pv3-s3d__ghost)[^{]*\{[^}]*opacity/.test(css) && !/\[data-feat\][^{]*\{[^}]*opacity/.test(css), "no opacity on 3D layers");
  assert.ok(!/--face[^;]*850ms[^}]*reduce/.test(css.slice(css.indexOf("prefers-reduced-motion: reduce"), css.indexOf("prefers-reduced-motion: no-preference"))), "reduce must not animate --face");
});
check("css: motion only under no-preference; reduce keeps a border/background crossfade", () => {
  assert.ok(/prefers-reduced-motion: no-preference\) \{\s*\.pv3-s3d__layer \{ transition:[^}]*scale 850ms/.test(css));
  const red = css.slice(css.indexOf("prefers-reduced-motion: reduce"));
  assert.ok(/transition: border-color 200ms, background-color 200ms/.test(red) && !/scale|translate/.test(red.slice(0, red.indexOf("}") + 1)));
});
check("mobile fallback and hover lift exist", () => {
  assert.ok(/max-width: 63\.99rem\) \{[^]*is-feat \.pv3-s3d__ghost \{ display: flex/.test(css));
  assert.ok(/hover: hover\) and \(min-width: 64rem\)/.test(css));
});
check("no new dependencies in the Stack files", () => {
  assert.ok(!/framer-motion|three|gsap/.test(s3d));
  assert.ok(!("gsap" in (pkg.dependencies ?? {})), "gsap present");
});

if (failures.length) { console.log(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
