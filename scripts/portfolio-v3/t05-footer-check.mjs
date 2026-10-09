// T05 check for the footer code layer (code rain + terminal lines). Static source/CSS assertions.
// Usage: node scripts/portfolio-v3/t05-footer-check.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const rain = read("src/components/ui/FooterCodeRain.tsx");
const foot = read("src/components/layout/Footer.tsx");
const css = read("src/app/pv3-footer.css");
const failures = [];
const check = (name, fn) => {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};

check("rain is aria-hidden and pointer-less; real name stays sr-only text", () => {
  assert.ok(/className="pv3-rain"\s+aria-hidden="true"/.test(rain));
  assert.ok(/\.pv3-rain \{[^}]*pointer-events: none/.test(css));
  assert.ok(/sr-only/.test(read("src/components/ui/FooterSignature.tsx")));
  assert.ok(/pv3-term[^>]*aria-hidden="true"/.test(foot));
});
check("loop runs only near viewport and visible tab (IntersectionObserver + visibilitychange), single rAF", () => {
  assert.ok(rain.includes("IntersectionObserver") && rain.includes("visibilitychange"));
  assert.equal((rain.match(/requestAnimationFrame\(/g) ?? []).length, 2, "one loop: initial + re-arm");
  assert.ok(rain.includes("cancelAnimationFrame"));
});
check("reduced motion never starts the loop; static texture + css fallback exist", () => {
  assert.ok(rain.includes("prefers-reduced-motion: reduce") && /!reduce\.matches/.test(rain));
  assert.ok(/prefers-reduced-motion: reduce\) \{[^}]*pv3-rain__canvas \{ display: none/.test(css));
  assert.ok(rain.includes("pv3-rain__static"));
});
check("DPR capped at 1.5 and ~30fps throttle", () => {
  assert.ok(/dprCap = 1\.5/.test(rain) && /Math\.min\(window\.devicePixelRatio/.test(rain));
  assert.ok(/1000 \/ 30/.test(rain));
});
check("mounts lazily after idle", () => assert.ok(/requestIdleCallback/.test(rain)));
check("no setState in effects, only react import (no new dependency), css not in globals", () => {
  assert.ok(!/import \{[^}]*useState|setState\(|[^'] useState\(/.test(rain.replace(/'[^']*'/g, "''")));
  assert.ok(!/^import .* from '(?!react)/m.test(rain), "unexpected import");
  assert.ok(foot.includes("@/app/pv3-footer.css") && !read("src/app/globals.css").includes("pv3-rain"));
});
check("caret blink is slow and finite (< 3 flashes/s, WCAG 2.2.2)", () => {
  assert.ok(/pv3-term-blink 1\.2s steps\(1\) 3s 4/.test(css) && /pv3-term-blink 2\.4s steps\(1\) 0s 2/.test(css));
});
check("no invented claims or recruiter wording", () => assert.ok(!/recruiter|reclutador|years of|\d+\+ ?(years|años)/i.test(foot + rain + css)));

if (failures.length) { console.log(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
