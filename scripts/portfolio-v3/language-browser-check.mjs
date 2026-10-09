import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { isAbsolute, relative, resolve, win32 } from "node:path";
import { pathToFileURL } from "node:url";
import Module from "node:module";
import ts from "typescript";

const modulePath = process.env.PLAYWRIGHT_MODULE;
const chromePath = process.env.CHROME_PATH;
const auditUrl = process.env.AUDIT_URL;
const outputDir = process.env.AUDIT_OUTPUT_DIR;
const auditScope = process.env.AUDIT_SCOPE ?? "full";
assert.ok(modulePath && chromePath && auditUrl && outputDir, "Set PLAYWRIGHT_MODULE, CHROME_PATH, AUDIT_URL and external AUDIT_OUTPUT_DIR");
const root = resolve(".");
const outputPath = resolve(outputDir);
const outputRelativeToRoot = relative(root, outputPath);
assert.ok(isAbsolute(outputRelativeToRoot) || outputRelativeToRoot === ".." || outputRelativeToRoot.startsWith(`..${win32.sep}`), "AUDIT_OUTPUT_DIR must be outside the repository");
const importPath = win32.isAbsolute(modulePath) ? pathToFileURL(modulePath).href : modulePath;
let translations;
const codes = ["es", "en", "de", "fr", "it"];
const invalidCodes = [
  { name: "empty", value: "" },
  { name: "missing", value: null },
  ...["en-US", "toString", "__proto__", "unrecognized"].map((value) => ({ name: value, value })),
];
const tempDir = resolve(outputDir, "browser-temp");
process.env.TEMP = tempDir;
process.env.TMP = tempDir;
process.env.TMPDIR = tempDir;
const failures = [];
const results = [];
const base = new URL(auditUrl);
let browser;
const expectedHydrationWarning = /hydration|did not match|server html|server rendered html|hydrating/i;

async function newContext({ seed = "es", blockRead = false, blockWrite = false, blockProperty = false, javascript = true } = {}) {
  const context = await browser.newContext({
    javaScriptEnabled: javascript,
    ...(!javascript ? { storageState: { origins: [{ origin: base.origin, localStorage: [{ name: "language", value: seed }] }] } } : {}),
  });
  if (javascript) {
    await context.addInitScript(({ seed, blockRead, blockWrite, blockProperty }) => {
      if (sessionStorage.getItem("__portfolioLanguageSeeded") !== "yes") {
        if (seed === null) localStorage.removeItem("language");
        else localStorage.setItem("language", seed);
        sessionStorage.setItem("__portfolioLanguageSeeded", "yes");
      }
      const nativeStorage = window.localStorage;
      const originalGet = Storage.prototype.getItem;
      const originalSet = Storage.prototype.setItem;
      if (blockRead) {
        let blockedReads = 0;
        Object.defineProperty(window, "__portfolioLanguageAudit", {
          configurable: true,
          value: {
            blockedReads: () => blockedReads,
            rawLanguage: () => originalGet.call(nativeStorage, "language"),
          },
        });
        Storage.prototype.getItem = function (key) {
          if (key === "language") { blockedReads++; throw new Error("language read blocked"); }
          return originalGet.call(this, key);
        };
      }
      if (blockWrite) Storage.prototype.setItem = function (key, value) {
        if (key === "language") throw new Error("language write blocked");
        return originalSet.call(this, key, value);
      };
      if (blockProperty) {
        const propertyStacks = [];
        Object.defineProperty(window, "__portfolioLanguageAudit", {
          configurable: true,
          value: {
            propertyStacks,
            rawLanguage: () => originalGet.call(nativeStorage, "language"),
          },
        });
        Object.defineProperty(window, "localStorage", {
          configurable: true,
          get() {
            const error = new Error("localStorage property blocked");
            propertyStacks.push(error.stack);
            throw error;
          },
        });
      }
    }, { seed, blockRead, blockWrite, blockProperty });
  }
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  const signals = { pageErrors: [], consoleErrors: [], consoleWarnings: [], hydrationWarnings: [], badResponses: [] };
  page.on("pageerror", (error) => signals.pageErrors.push(serializeError(error)));
  page.on("console", (message) => {
    const entry = { text: message.text(), location: message.location() };
    if (message.type() === "error") signals.consoleErrors.push(entry);
    if (message.type() === "warning") {
      signals.consoleWarnings.push(entry);
      if (expectedHydrationWarning.test(message.text())) signals.hydrationWarnings.push(entry);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && new URL(response.url()).origin === base.origin) {
      signals.badResponses.push({ status: response.status(), url: response.url() });
    }
  });
  return { context, page, signals };
}

async function visit(page, path = "/") {
  await page.goto(new URL(path, base).href, { waitUntil: "domcontentloaded" });
}
function languagePicker(page) {
  return page.locator("button").filter({ has: page.locator("svg.lucide-languages") });
}
async function hydratedLanguage(page, code) {
  const picker = languagePicker(page);
  await picker.waitFor({ state: "visible" });
  await page.waitForFunction((expected) => Array.from(document.querySelectorAll("button")).some((button) =>
    button.querySelector("svg.lucide-languages") && button.innerText.trim().toLowerCase() === expected
  ), code);
  assert.equal((await picker.innerText()).trim().toLowerCase(), code);
}
async function translatedContent(page, code) {
  const expected = translations[code];
  const homeLink = page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: expected.nav.home, exact: true });
  await homeLink.waitFor({ state: "visible" });
  await page.getByRole("link", { name: expected.hero.viewProjects, exact: true }).waitFor({ state: "visible" });
  assert.equal(await homeLink.count(), 1);
}
function serializeError(error) {
  const causes = [];
  for (let current = error; current; current = current.cause) {
    causes.push({ name: current.name, message: current.message, stack: current.stack });
  }
  return { name: error.name, message: error.message, stack: error.stack, causes };
}
function retainSignals(row, signals) {
  row.signals = signals;
  return signals;
}
function assertSignals(signals, label) {
  assert.deepEqual(signals.pageErrors, [], `${label}: page errors`);
  assert.deepEqual(signals.consoleErrors, [], `${label}: console errors`);
  assert.deepEqual(signals.hydrationWarnings, [], `${label}: hydration warnings`);
  assert.deepEqual(signals.badResponses, [], `${label}: local HTTP errors`);
}
async function scenario(name, run) {
  const row = { name, passed: false };
  try {
    await run(row);
    row.passed = true;
  } catch (error) {
    row.error = serializeError(error);
    failures.push(`${name}${row.step ? ` (${row.step})` : ""}: ${row.error.message}`);
  }
  results.push(row);
}

try {
  await mkdir(outputDir, { recursive: true });
  if (!["full", "language"].includes(auditScope)) throw new Error(`AUDIT_SCOPE must be 'full' or 'language', got ${auditScope}`);
  await mkdir(tempDir, { recursive: true });
  const { chromium } = await import(importPath);
  const require = createRequire(import.meta.url);
  const translationPath = resolve(root, "src/data/translations.ts");
  const translationSource = require("node:fs").readFileSync(translationPath, "utf8");
  const translationJs = ts.transpileModule(translationSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const translationModule = new Module(translationPath);
  translationModule.filename = translationPath;
  translationModule.paths = Module._nodeModulePaths(root);
  translationModule._compile(translationJs, translationPath);
  translations = translationModule.exports.translations;
  browser = await chromium.launch({ executablePath: chromePath, headless: true });
  await scenario("SSR Spanish snapshot with stored English and JavaScript disabled", async (row) => {
    const { context, page, signals } = await newContext({ seed: "en", javascript: false });
    retainSignals(row, signals);
    try {
      await visit(page);
      const es = translations.es;
      await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: es.nav.home, exact: true }).waitFor({ state: "visible" });
      await page.getByRole("link", { name: es.hero.viewProjects, exact: true }).waitFor({ state: "visible" });
      assert.equal((await languagePicker(page).innerText()).trim().toLowerCase(), "es");
      assertSignals(signals, "SSR JavaScript-disabled response");
      row.serverHtml = "Spanish navigation, hero CTA and switcher despite stored English";
    } finally { await context.close(); }
  });

  for (const code of codes) {
    await scenario(`stored ${code}, hydration, selection, reload and local navigation`, async (row) => {
      const { context, page, signals } = await newContext({ seed: code });
      retainSignals(row, signals);
      try {
        row.step = "open seeded route";
        await visit(page);
        row.step = "await hydrated seeded language";
        await hydratedLanguage(page, code);
        row.step = "verify seeded translations";
        await translatedContent(page, code);
        assertSignals(signals, `${code} initial hydration`);
        const selected = codes[(codes.indexOf(code) + 1) % codes.length];
        await languagePicker(page).click();
        const names = { es: "Español", en: "English", de: "Deutsch", fr: "Français", it: "Italiano" };
        await page.getByRole("button", { name: names[selected], exact: true }).click();
        await hydratedLanguage(page, selected);
        await translatedContent(page, selected);
        assert.equal(await page.evaluate(() => localStorage.getItem("language")), selected);
        row.step = "verify persisted selection after reload";
        await page.reload({ waitUntil: "domcontentloaded" });
        await hydratedLanguage(page, selected);
        await translatedContent(page, selected);
        row.step = "navigate locally to NutriFlow";
        await page.locator('#tab-nutriflow').click();
        const caseStudy = page.locator('.pv3-case__cta[href="/nutriflow"]').first();
        await caseStudy.click();
        await page.waitForURL("**/nutriflow");
        row.step = "return locally to home";
        await page.getByRole("link", { name: translations[selected].nav.home, exact: true }).first().click();
        await page.waitForURL((url) => url.pathname === "/");
        await hydratedLanguage(page, selected);
        await translatedContent(page, selected);
        assert.equal(await page.evaluate(() => localStorage.getItem("language")), selected);
        assertSignals(signals, `${code} selection/navigation`);
        row.seeded = code;
        row.selected = selected;
        row.persistedThroughReloadAndLocalNavigation = true;
      } finally { await context.close(); }
    });
  }

  for (const { name, value } of invalidCodes) {
    await scenario(`invalid stored value ${name} falls back without mutation`, async (row) => {
      const { context, page, signals } = await newContext({ seed: value });
      retainSignals(row, signals);
      try {
        await visit(page);
        await hydratedLanguage(page, "es");
        await translatedContent(page, "es");
        assert.equal(await page.evaluate(() => localStorage.getItem("language")), value);
        assertSignals(signals, `invalid ${name}`);
        row.rawValuePreserved = value;
      } finally { await context.close(); }
    });
  }

  const storageFaults = auditScope === "full" ? ["read", "write", "property"] : ["read", "write"];
  for (const fault of storageFaults) {
    await scenario(`blocked storage ${fault} failure`, async (row) => {
      const blocked = fault === "read" ? { blockRead: true } : fault === "write" ? { blockWrite: true } : { blockProperty: true };
      const { context, page, signals } = await newContext({ seed: "de", ...blocked });
      retainSignals(row, signals);
      try {
        await visit(page);
        if (fault === "property") {
          row.propertyProbe = await page.evaluate(() => {
            let getterError;
            try { void window.localStorage; } catch (error) {
              getterError = { name: error.name, message: error.message, stack: error.stack, cause: error.cause?.stack };
            }
            const picker = document.querySelector("button:has(svg.lucide-languages)");
            return {
              url: location.href,
              navigationText: document.querySelector('nav[aria-label="Navegación principal"]')?.innerText,
              pickerCount: document.querySelectorAll("button").length,
              languagePickerText: picker?.innerText,
              getterError,
              propertyAccessStacks: window.__portfolioLanguageAudit.propertyStacks,
              underlyingStoredLanguage: window.__portfolioLanguageAudit.rawLanguage(),
            };
          });
        }
        const chosen = fault === "write" ? "de" : "es";
        await hydratedLanguage(page, chosen);
        await translatedContent(page, chosen);
        if (fault === "read") {
          const initialReadEvidence = await page.evaluate(() => ({
            blockedAttempts: window.__portfolioLanguageAudit.blockedReads(),
            persistedValue: window.__portfolioLanguageAudit.rawLanguage(),
          }));
          assert.ok(initialReadEvidence.blockedAttempts > 0, "store must attempt the blocked language read before choosing another language");
          assert.equal(initialReadEvidence.persistedValue, "de", "the blocked read must leave and observe the original seeded preference");
          row.initialBlockedReadEvidence = initialReadEvidence;
          await languagePicker(page).click();
          await page.getByRole("button", { name: "English", exact: true }).click();
          await hydratedLanguage(page, "en");
          await translatedContent(page, "en");
          const readEvidence = await page.evaluate(() => ({
            blockedAttempts: window.__portfolioLanguageAudit.blockedReads(),
            persistedValue: window.__portfolioLanguageAudit.rawLanguage(),
          }));
          assert.ok(readEvidence.blockedAttempts > 0, "store must attempt the blocked language read");
          assert.equal(readEvidence.persistedValue, "en", "the explicit selection persists via unpatched storage observation");
          row.blockedReadEvidence = readEvidence;
        } else if (fault === "write") {
          await languagePicker(page).click();
          await page.getByRole("button", { name: "English", exact: true }).click();
          await hydratedLanguage(page, "en");
          await translatedContent(page, "en");
          assert.equal(await page.evaluate(() => Storage.prototype.getItem.call(localStorage, "language")), "de");
          await languagePicker(page).click();
          await page.getByRole("button", { name: "Italiano", exact: true }).dispatchEvent("click");
          await hydratedLanguage(page, "it");
          await translatedContent(page, "it");
          await page.locator('#tab-nutriflow').click();
          await page.locator('.pv3-case__cta[href="/nutriflow"]').first().click();
          await page.waitForURL("**/nutriflow");
          await page.getByRole("link", { name: translations.it.nav.home, exact: true }).first().click();
          await page.waitForURL((url) => url.pathname === "/");
          await hydratedLanguage(page, "it");
          await translatedContent(page, "it");
          assert.equal(await page.evaluate(() => Storage.prototype.getItem.call(localStorage, "language")), "de");
          row.step = "verify memory-only selection ends on full reload";
          await page.reload({ waitUntil: "domcontentloaded" });
          await hydratedLanguage(page, "de");
          await translatedContent(page, "de");
        } else {
          const underlyingStoredLanguage = await page.evaluate(() => window.__portfolioLanguageAudit.rawLanguage());
          assert.equal(underlyingStoredLanguage, "de");
          row.underlyingStoredLanguage = underlyingStoredLanguage;
        }
        assertSignals(signals, `blocked ${fault}`);
        row.inMemoryLanguage = fault === "write" ? "it" : fault === "read" ? "en" : "es";
        row.rawStoredValue = fault === "write" ? "de" : fault === "read" ? "en" : "de (read intentionally blocked)";
        if (fault === "write") row.afterReloadLanguage = "de";
      } finally { await context.close(); }
    });
  }
  if (auditScope === "language") {
    results.push({
      name: "blocked storage property failure",
      passed: null,
      status: "NOT_RUN",
      excludedByScope: true,
      reason: "Whole-page localStorage property denial reaches the separately owned EmailJS initializer; this is diagnostic, not language-store conformance.",
    });
  }
} catch (error) {
  const row = { name: "browser setup/run", passed: false, error: serializeError(error) };
  results.push(row);
  failures.push(`browser setup/run: ${row.error.message}`);
} finally {
  if (browser) {
    try { await browser.close(); }
    catch (error) { failures.push(`browser close: ${serializeError(error).message}`); }
  }
  try {
    const summary = {
      scope: auditScope,
      passedCount: results.filter((row) => row.passed === true).length,
      failedCount: results.filter((row) => row.passed === false).length,
      notRunCount: results.filter((row) => row.status === "NOT_RUN").length,
    };
    await writeFile(resolve(outputDir, "language-browser-results.json"), JSON.stringify({ url: auditUrl, summary, cases: results, failures }, null, 2));
  } catch (error) {
    failures.push(`result report write: ${serializeError(error).message}`);
    console.error(JSON.stringify({ url: auditUrl, scope: auditScope, cases: results, failures }, null, 2));
  }
}

const summary = {
  scope: auditScope,
  passedCount: results.filter((row) => row.passed === true).length,
  failedCount: results.filter((row) => row.passed === false).length,
  notRunCount: results.filter((row) => row.status === "NOT_RUN").length,
};
console.log(JSON.stringify({ url: auditUrl, summary, cases: results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
