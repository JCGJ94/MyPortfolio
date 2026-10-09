// T05 check for the Contact icons pass. Static source/CSS assertions.
// Usage: node scripts/portfolio-v3/t05-contact-check.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const tsx = read("src/components/sections/Contact.tsx");
const css = read("src/app/pv3-contact-detail.css");
const failures = [];
const check = (name, fn) => {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failures.push(name); console.log(`FAIL ${name}: ${e.message}`); }
};

check("every Lucide icon in Contact is aria-hidden", () => {
  const icons = (tsx.match(/<(AlertCircle|Check|Copy|FileText|Linkedin|Mail|Globe|Send|Icon)\b[^>]*>/g) ?? []).filter((i) => !/^<(Mail|Check) size/.test(i));
  assert.ok(icons.length >= 8, `found ${icons.length}`);
  for (const i of icons) assert.ok(i.includes('aria-hidden="true"'), i);
  assert.ok(tsx.includes('className="pv3-contact__badge" aria-hidden="true"'));
});
check("each field keeps its label bound by htmlFor and its error message", () => {
  assert.ok(/<label htmlFor=\{name\} className="pv3-contact__float">\{label\}<\/label>/.test(tsx));
  assert.ok(tsx.includes("aria-describedby") && tsx.includes('role="alert"'));
  for (const f of ["name", "email", "message"]) assert.ok(new RegExp(`${f}: (User|Mail|MessageSquare)`).test(tsx), f);
});
check("zod validation, EmailJS and form flow untouched", () => {
  assert.ok(tsx.includes("import('zod')") && tsx.includes("@emailjs/browser") && tsx.includes("noValidate"));
});
check("GitHub uses the brand TechIcon; LinkedIn keeps Lucide (absent from Simple Icons 16.34)", () => {
  assert.ok(tsx.includes('<TechIcon name="GitHub" />'));
  assert.ok(tsx.includes("Linkedin"));
});
check("no phone number text and no new personal data", () => {
  assert.ok(!/(\+\d{2}[\s\d]{8,}|\b\d{3}[\s.-]\d{3}[\s.-]\d{3}\b)/.test(tsx));
  const emails = new Set(tsx.match(/[\w.+-]+@[\w-]+\.[\w.]+/g));
  assert.deepEqual([...emails], ["jcdevelopment94@gmail.com"]);
});
check("translations.ts and package.json unchanged vs HEAD", () => {
  const diff = execSync("git diff --stat HEAD -- src/data/translations.ts package.json package-lock.json", { encoding: "utf8" });
  assert.equal(diff.trim(), "");
});
check("animated send icon and lift only under hover + no-preference", () => {
  const m = css.match(/@media \(hover: hover\) and \(prefers-reduced-motion: no-preference\) \{[\s\S]*$/);
  assert.ok(m, "media block");
  assert.ok(m[0].includes("pv3-send") && m[0].includes("translateY(-2px)"));
  const outside = css.slice(0, css.indexOf(m[0]));
  assert.ok(!/animation: pv3-send/.test(outside) && !/pv3-contact__submit:hover[^{]*svg \{ transform/.test(outside));
});
check("icon animation is transform-only", () => {
  assert.ok(/@keyframes pv3-send \{[^}]*transform[^}]*\}[^}]*transform/.test(css));
});

if (failures.length) { console.log(`\n${failures.length} failed`); process.exit(1); }
console.log("\nall ok");
