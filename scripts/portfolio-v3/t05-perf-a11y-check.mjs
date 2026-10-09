// Static asserts for the perf / a11y pass: accessible names, landmarks, contrast tweaks, no new dependencies.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import assert from 'node:assert/strict';

const read = (p) => readFileSync(new URL(`../../${p}`, import.meta.url), 'utf8');

const navbar = read('src/components/layout/Navbar.tsx');
const brand = navbar.match(/className="portfolio-nav__brand"[^>]*aria-label="([^"]+)"/);
assert.ok(brand && brand[1].startsWith('JC'), 'brand link accessible name must contain its visible text (JC.dev)');

assert.match(read('src/app/cv/page.tsx'), /<main[\s>]/, '/cv needs a <main> landmark');
assert.match(read('src/app/cv/page.tsx'), /pv3-cv-download/, '/cv download button keeps its contrast class');

const css = read('src/app/globals.css');
assert.match(css, /\.pv3-case__cta \{[^}]*color-mix\(in srgb, var\(--pv3-color-accent\) 80%, #000\)/s, 'case CTA background deepened for contrast');
assert.match(css, /\.pv3-case__tab\[aria-selected="true"\] \{ background: color-mix/, 'selected case tab background deepened for contrast');
assert.match(css, /\.dark \.pv3-cv-download/, 'dark /cv download contrast rule');

const hero = read('src/components/sections/Hero.tsx');
assert.match(hero, /preload fetchPriority="high"/, 'hero image keeps preload + fetchpriority high');

const head = JSON.parse(execSync('git show HEAD:package.json', { cwd: new URL('../../', import.meta.url), encoding: 'utf8' }));
const now = JSON.parse(read('package.json'));
for (const k of ['dependencies', 'devDependencies']) assert.deepEqual(now[k], head[k], `no new ${k}`);

console.log('t05-perf-a11y-check: ok');
