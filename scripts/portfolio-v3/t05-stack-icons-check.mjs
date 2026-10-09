// T05 check for the Stack tech icons. Static source assertions.
// Usage: node scripts/portfolio-v3/t05-stack-icons-check.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const stack = read("src/components/sections/Stack.tsx");
const icons = read("src/data/techIcons.ts");
const glyphs = read("src/components/ui/TechIcon.tsx");
const css = read("src/app/pv3-stack.css");
const s3d = read("src/components/ui/Stack3D.tsx");
const failures = [];
const check = (name, fn) => {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};

const brands = [...icons.matchAll(/^\s+"([^"]+)": \{ d: "([^"]*)"/gm)].map((m) => ({ name: m[1], d: m[2] }));
const fallbackKeys = new Set([...glyphs.match(/const glyphs[^{]*\{([\s\S]*?)\n\};/)[1].matchAll(/(?:'([^']+)'|(\w+)):/g)].map((m) => m[1] ?? m[2]));
const techs = [...stack.split("const langs")[0].matchAll(/tech\(('[^']+'|it\.\w+)(?:, (\[[^\]]*\]))?(?:, '([^']+)')?\)/g)].map((m) => ({ label: m[1], icon: m[3] ?? (m[1].startsWith("'") ? m[1].slice(1, -1) : null) }));

check("found the Stack technologies", () => assert.ok(techs.length >= 30, `only ${techs.length}`));
check("every tech has a brand icon or a declared fallback glyph", () => {
  for (const t of techs) assert.ok(t.icon && (brands.some((b) => b.name === t.icon) || fallbackKeys.has(t.icon)), `no icon for ${t.label}`);
});
check("every brand SVG path is non-empty and starts with a move command", () => {
  assert.ok(brands.length >= 20);
  for (const b of brands) assert.ok(/^M/i.test(b.d) && b.d.length > 15, b.name);
});
check("icons are decorative: aria-hidden, not focusable, in every render path", () => {
  assert.equal((glyphs.match(/aria-hidden="true" focusable="false"/g) ?? []).length, 2);
  assert.ok(s3d.split("<TechIcon").length - 1 === 3, "ghost, linked chip and plain chip");
});
check("no network fetch: icons are inline paths only", () => assert.ok(!/https?:\/\/(?!simpleicons)|fetch\(|<img|<Image/.test(glyphs + icons.replace(/https:\/\/simpleicons\.org[^\s)]*|https:\/\/creativecommons[^\s)]*/g, ""))));
check("no opacity rule on icons", () => assert.ok(!/\.pv3-ti[^{]*\{[^}]*opacity/.test(css)));
check("package.json dependencies are unchanged vs HEAD", () => {
  const head = JSON.parse(execSync("git show HEAD:package.json", { encoding: "utf8" }));
  const now = JSON.parse(read("package.json"));
  assert.deepEqual(now.dependencies, head.dependencies);
  assert.deepEqual(now.devDependencies, head.devDependencies);
});

if (failures.length) { console.log(`\n${failures.length} failed`); process.exit(1); }
console.log("\nall ok");
