// T05 check: navbar veil (content hidden under the navbar, fades just below it). Static assertions.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const css = read("src/app/globals.css");
const nav = read("src/components/layout/Navbar.tsx");
const rule = css.match(/\.portfolio-nav-veil \{[^}]*\}/)?.[0] ?? "";
const t = (name, fn) => { try { fn(); console.log(`ok   ${name}`); } catch (e) { process.exitCode = 1; console.log(`FAIL ${name}: ${e.message}`); } };

t("veil is rendered, decorative (aria-hidden), not focusable", () => {
  assert.ok(/<div className="portfolio-nav-veil" aria-hidden="true" \/>/.test(nav));
});
t("veil is fixed, pointer-events none, two levels below the navbar", () => {
  assert.ok(/position: fixed/.test(rule) && /pointer-events: none/.test(rule));
  assert.ok(/z-index: calc\(var\(--pv3-z-navigation\) - 2\)/.test(rule));
});
t("veil is opaque canvas through the navbar box (4.75rem >= ~74px), then fades out", () => {
  assert.ok(/--pv3-veil-solid: 4\.75rem/.test(rule));
  assert.ok(/var\(--pv3-color-canvas\) 0, var\(--pv3-color-canvas\) var\(--pv3-veil-solid\), color-mix\(in srgb, var\(--pv3-color-canvas\) 0%, transparent\) 100%/.test(rule));
});
t("fade zone below the navbar is 2.5rem", () => assert.ok(/block-size: calc\(var\(--pv3-veil-solid\) \+ 2\.5rem\)/.test(rule)));
t("uses theme tokens only (dark and light), no hex", () => assert.ok(!/#[0-9a-f]{3,6}/i.test(rule)));
t("Projects chip row sits above the veil and below the navbar", () => assert.ok(/\.pv3-case-index \{ position: sticky; inset-block-start: 4\.75rem; z-index: calc\(var\(--pv3-z-navigation\) - 1\)/.test(css)));
t("no animation/transition/backdrop-filter on the veil", () => assert.ok(!/animation|transition|backdrop-filter/.test(rule)));
