// T04 U7/U8/U-SQ check: case detail routes share CaseHeader and keep their facts.
// Usage: node scripts/portfolio-v3/t04-routes-check.mjs [u7|u8|sq ...]   CHECK_URL=http://localhost:3023 also checks SSR HTML
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const only = process.argv.slice(2);
const failures = [];
const check = async (unit, name, fn) => {
  if (only.length && !only.includes(unit)) return;
  try { await fn(); console.log(`ok   [${unit}] ${name}`); } catch (e) { failures.push(name); console.log(`FAIL [${unit}] ${name}: ${e.message}`); }
};
const groups = {
  u7: ["nutriflow", "clinical-ai"],
  u8: ["jegstudio", "sportbarleague", "tallercardonal"],
  sq: ["squaads"],
};
const css = read("src/app/globals.css");

for (const [unit, routes] of Object.entries(groups)) {
  for (const r of routes) {
    const f = `src/app/${r}/page.tsx`;
    await check(unit, `${r}: shared case header, back link to its home case, no legacy shell`, () => {
      assert.ok(existsSync(resolve(f)), "page exists");
      const src = read(f);
      assert.ok(/CaseHeader/.test(src) && src.includes(`id="${r === "squaads" ? "squaads-meeting-bot" : r}"`), "CaseHeader with case id");
      assert.ok(!/animate-slide-up|MagneticPillButton|from 'lucide-react'|from "lucide-react"/.test(src), "legacy shell or unused icons");
      assert.ok(!/<a\b[^>]*href="https?:/.test(src), "external links go through CaseHeader actions");
    });
  }
}
await check("u7", "CaseHeader links to /#caso-<id> and external actions are noopener", () => {
  const src = read("src/components/ui/CaseHeader.tsx");
  assert.ok(/href=\{`\/#caso-\$\{id\}`\}/.test(src));
  assert.ok(/target="_blank" rel="noopener noreferrer"/.test(src));
  assert.ok(/\.pv3-detail__title/.test(css) && /\.pv3-detail__lede[^{]*\{[^}]*border-inline-start/.test(css));
});
await check("u7", "clinical-ai keeps metadata, the architecture flow and scrolls it inside its box", () => {
  const src = read("src/app/clinical-ai/page.tsx");
  assert.ok(/export const metadata/.test(src) && /AgentRouter/.test(src) && /AnalyzeOutput/.test(src));
  assert.ok(/pv3-detail__code[^>]*tabIndex/.test(src) && /\.pv3-detail__code\s*\{[^}]*overflow-x:\s*auto/.test(css));
});
await check("u8", "removed figures are not re-added", () => {
  const all = ["nutriflow", "jegstudio", "sportbarleague"].map((r) => read(`src/app/${r}/page.tsx`)).join("\n") + read("src/app/tallercardonal/page.tsx");
  assert.ok(!/40\s*%|reduce el costo|Lighthouse\s*(>|\+)\s*90|90\+/i.test(all));
});
await check("sq", "squaads page: metadata, only verified content, CI/CD phrase", () => {
  const src = read("src/app/squaads/page.tsx");
  assert.ok(/export const metadata/.test(src) && /SquaadsArchitecture/.test(src));
  assert.ok(!/tldv/i.test(src.replace(/https:\/\/github\.com\/devs-squaads\/tldv-squaads-dev/, "")), "tldv in visible text");
  assert.ok(!/\d+\s*%/.test(src), "percentage");
  assert.ok(/CI en dev y main; despliegue continuo automático solo desde main/.test(src), "CI/CD phrase");
  assert.ok(src.includes("https://github.com/devs-squaads/tldv-squaads-dev"));
});
await check("sq", "home CTA links to /squaads and sitemap lists it", () => {
  const proj = read("src/components/sections/Projects.tsx");
  assert.ok(!/internalProject \?/.test(proj), "CTA still gated on internalProject");
  assert.ok(/pv3-case__note/.test(proj) && /case\.internal/.test(proj), "internal note kept");
  assert.ok(/'\/squaads'/.test(read("src/app/sitemap.ts")));
});

if (process.env.CHECK_URL) {
  for (const r of Object.values(groups).flat()) {
    if (only.length && !only.some((u) => groups[u].includes(r))) continue;
    await check(only[0] ?? "all", `SSR ${r}: h1, back link, 200`, async () => {
      const res = await fetch(`${process.env.CHECK_URL}/${r}`);
      assert.equal(res.status, 200);
      const html = await res.text();
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "one h1");
      assert.ok(html.includes('href="/#caso-'), "back link");
    });
  }
}
await check("d1", "every detail route has an at-a-glance panel (kind, role, stack, 2-3 proves)", () => {
  for (const r of ["squaads", "clinical-ai", "nutriflow", "sportbarleague", "jegstudio", "tallercardonal"]) {
    const src = read(`src/app/${r}/page.tsx`);
    assert.ok(/summary=\{\{/.test(src) && /kind:/.test(src) && /role:/.test(src) && /stack:/.test(src) && /proves:/.test(src), r + ": summary missing");
    const block = src.match(/proves:\s*\[([\s\S]*?)\n\s*\]/)[1];
    const n = block.split("\n").filter((l) => l.trim().startsWith('"')).length;
    assert.ok(n >= 2 && n <= 3, r + ": proves count " + n);
  }
  assert.ok(/De un vistazo/.test(read("src/components/ui/CaseAtAGlance.tsx")));
  assert.ok(/CaseAtAGlance/.test(read("src/components/ui/CaseHeader.tsx")));
  for (const f of ["CaseAtAGlance.tsx", "CaseHeader.tsx"]) assert.ok(!/recruiter|reclutador/i.test(read("src/components/ui/" + f)), "recruiter wording in " + f);
});
await check("d1", "readability css: 68ch measure, numbered h2s, sticky toc at wide widths", () => {
  const c = read("src/app/pv3-contact-detail.css");
  assert.ok(/\.pv3-detail__steps\s*\{[^}]*68ch/.test(c) && /counter-increment:\s*pv3-sec/.test(c) && /\.pv3-detail__toc[^{]*\{[^}]*position:\s*sticky/.test(c));
});
if (failures.length) { console.log(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
