import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import Module from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = resolve(".");
const require = createRequire(import.meta.url);
const load = (path) => {
  const filename = resolve(root, path);
  const source = require("node:fs").readFileSync(filename, "utf8");
  const javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(root);
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = (specifier) => specifier === "@/data/translations"
    ? originalRequire(resolve(root, "src/data/translations.ts"))
    : specifier === "./language-store"
      ? originalRequire(resolve(root, "src/context/language-store.ts"))
      : originalRequire(specifier);
  loaded._compile(javascript, filename);
  return loaded.exports;
};

const { createLanguageStore, isLanguage } = load("src/context/language-store.ts");
assert.deepEqual(["es", "en", "de", "fr", "it"].map(isLanguage), [true, true, true, true, true]);
for (const invalid of ["en-US", "toString", "__proto__", "garbage", null]) assert.equal(isLanguage(invalid), false);

const fakeStorage = (initial) => {
  const data = new Map(Object.entries(initial ?? {}));
  let throwRead = false;
  let throwWrite = false;
  let reads = 0;
  return {
    get reads() { return reads; }, data,
    getItem(key) { reads += 1; if (throwRead) throw new Error("read denied"); return data.get(key) ?? null; },
    setItem(key, value) { if (throwWrite) throw new Error("write denied"); data.set(key, value); },
    failRead() { throwRead = true; }, failWrite() { throwWrite = true; },
  };
};
const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
const setWindow = (storage) => Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: storage } });
try {
  for (const code of ["es", "en", "de", "fr", "it"]) {
    const storage = fakeStorage({ language: code }); setWindow(storage);
    const store = createLanguageStore();
    assert.equal(store.getSnapshot(), code); assert.equal(store.getServerSnapshot(), "es");
    assert.equal(storage.reads, 1); assert.equal(store.getSnapshot(), code); assert.equal(storage.reads, 1);
  }
  for (const code of ["en-US", "toString", "__proto__", "garbage"]) {
    const storage = fakeStorage({ language: code }); setWindow(storage);
    const store = createLanguageStore(); assert.equal(store.getSnapshot(), "es");
    assert.equal(storage.data.get("language"), code, "invalid raw value is preserved");
    assert.equal(storage.data.has("language"), true);
  }
  const storage = fakeStorage({ language: "en" }); setWindow(storage);
  const store = createLanguageStore();
  let notifications = 0; const listener = () => notifications++;
  const unsubscribe = store.subscribe(listener);
  store.setLanguage("fr"); assert.equal(store.getSnapshot(), "fr"); assert.equal(storage.data.get("language"), "fr");
  assert.equal(notifications, 1); store.setLanguage("fr"); assert.equal(notifications, 1);
  assert.equal(store.getSnapshot(), "fr", "snapshot stays cached without rereading stale storage");
  unsubscribe(); store.setLanguage("de"); assert.equal(notifications, 1);
  const blockedRead = fakeStorage(); blockedRead.failRead(); setWindow(blockedRead);
  const fallbackRead = createLanguageStore(); assert.equal(fallbackRead.getSnapshot(), "es");
  const blockedWrite = fakeStorage({ language: "en" }); blockedWrite.failWrite(); setWindow(blockedWrite);
  const fallbackWrite = createLanguageStore(); assert.equal(fallbackWrite.getSnapshot(), "en");
  let writeNotifications = 0; const stop = fallbackWrite.subscribe(() => writeNotifications++);
  fallbackWrite.setLanguage("it"); assert.equal(fallbackWrite.getSnapshot(), "it"); assert.equal(writeNotifications, 1);
  assert.equal(fallbackWrite.getSnapshot(), "it", "failed persistence cannot restore old persisted preference"); stop();

  let propertyReads = 0;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      get localStorage() { propertyReads++; throw new Error("localStorage property denied"); },
    },
  });
  const blockedProperty = createLanguageStore();
  assert.equal(blockedProperty.getServerSnapshot(), "es", "SSR snapshot does not access browser storage");
  assert.equal(propertyReads, 0, "store creation and SSR snapshot avoid the localStorage getter");
  assert.equal(blockedProperty.getSnapshot(), "es", "throwing localStorage getter falls back to Spanish");
  assert.equal(propertyReads, 1, "client snapshot attempted the blocked storage property");
  let propertyNotifications = 0;
  const stopProperty = blockedProperty.subscribe(() => propertyNotifications++);
  blockedProperty.setLanguage("en");
  assert.equal(blockedProperty.getSnapshot(), "en", "explicit selection stays in memory when the storage getter throws");
  assert.equal(propertyNotifications, 1, "selection notifies despite property access failure");
  assert.equal(propertyReads, 2, "failed persistence attempted the blocked getter");
  stopProperty();

  delete globalThis.window;
  const serverStore = createLanguageStore();
  assert.equal(serverStore.getServerSnapshot(), "es");
  assert.equal(serverStore.getSnapshot(), "es");
  const { LanguageProvider, useLanguage } = load("src/context/LanguageContext.tsx");
  const Probe = () => React.createElement("span", null, useLanguage().t.nav.home);
  assert.match(renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(Probe))), />Inicio</);
  console.log("language context/store checks passed (SSR Spanish, whitelist, storage failures, cache and subscriptions)");
} finally {
  if (originalWindowDescriptor === undefined) delete globalThis.window;
  else Object.defineProperty(globalThis, "window", originalWindowDescriptor);
}
