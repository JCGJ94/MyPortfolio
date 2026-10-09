import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import Module from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = resolve(".");
const baselineRef = "d98ece194a20c552b5145b864d177955e411653e";
const files = {
  icon: ["src/components/ui/IconOrbitButton.tsx", "IconOrbitButton"],
  pill: ["src/components/ui/MagneticPillButton.tsx", "MagneticPillButton"],
};

const loadComponent = (filename, source, exportName) => {
  const javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const componentModule = new Module(filename);
  componentModule.filename = filename;
  componentModule.paths = Module._nodeModulePaths(root);
  const originalRequire = componentModule.require.bind(componentModule);
  componentModule.require = (specifier) => specifier === "@/lib/utils"
    ? require(resolve(root, "src/lib/utils.ts"))
    : originalRequire(specifier);
  componentModule._compile(javascript, filename);
  return componentModule.exports[exportName];
};

const components = {};
for (const [key, [relativePath, exportName]] of Object.entries(files)) {
  const filename = resolve(root, relativePath);
  const candidateSource = await readFile(filename, "utf8");
  const baselineSource = execFileSync("git", ["show", `${baselineRef}:${relativePath}`], { encoding: "utf8" });
  components[key] = {
    current: loadComponent(filename, candidateSource, exportName),
    baseline: loadComponent(filename, baselineSource, exportName),
  };
}

const icon = (component, props = {}) => React.createElement(component, { icon: "icon-content", ...props });
const pill = (component, props = {}) => React.createElement(component, { label: "Projects", ...props });
const has = (markup, attribute) => assert.ok(markup.includes(attribute), `expected rendered markup to contain ${attribute}`);
const rootElement = (element) => element.type(element.props);
const normalizeTree = (value) => {
  if (Array.isArray(value)) return value.map(normalizeTree);
  if (!React.isValidElement(value)) return value;
  if (value.type === React.Fragment) return normalizeTree(value.props.children);
  const { children, ...props } = value.props;
  return {
    type: typeof value.type === "string" ? value.type : value.type.displayName ?? value.type.name ?? "component",
    props: Object.fromEntries(Object.entries(props).filter(([key]) => key !== "ref" && key !== "key")),
    children: normalizeTree(children),
  };
};

for (const kind of ["icon", "pill"]) {
  const { current, baseline } = components[kind];
  const makeElement = kind === "icon" ? icon : pill;
  const callback = () => "called";
  const scenarios = [
    { name: "no href", props: { "aria-label": `${kind} action`, "data-test": kind, onClick: callback } },
    { name: "empty href", props: { href: "", target: "_blank", rel: "noreferrer", "aria-label": `${kind} empty`, "data-test": kind, onClick: callback } },
    { name: "internal href", props: { href: "/projects", "aria-label": `${kind} internal`, "data-test": kind, onClick: callback } },
    { name: "external href", props: { href: "https://example.com/work", target: "_blank", rel: "noopener noreferrer", "aria-label": `${kind} external`, download: true, hrefLang: "en", "data-test": kind, onClick: callback } },
  ];
  if (kind === "icon") {
    scenarios.push({ name: "icon hover pair", props: { hoverIcon: "hover-content" } });
  } else {
    for (const variant of ["primary", "secondary", "ghost"]) {
      scenarios.push({ name: `${variant} variant`, props: { variant } });
    }
  }

  for (const scenario of scenarios) {
    const candidateElement = makeElement(current, scenario.props);
    const baselineElement = makeElement(baseline, scenario.props);
    const candidateRoot = rootElement(candidateElement);
    const baselineRoot = rootElement(baselineElement);
    assert.equal(candidateRoot.props.initial, "initial", `${kind} ${scenario.name}: initial state`);
    assert.equal(candidateRoot.props.whileHover, "hover", `${kind} ${scenario.name}: hover state`);
    assert.equal(candidateRoot.props.whileFocusVisible, "hover", `${kind} ${scenario.name}: focus-visible state`);
    assert.deepEqual(candidateRoot.props.whileTap, { scale: kind === "icon" ? 0.95 : 0.98 }, `${kind} ${scenario.name}: tap scale`);
    assert.equal(candidateRoot.props.className, baselineRoot.props.className, `${kind} ${scenario.name}: root visual classes`);
    if (scenario.props.onClick) {
      assert.equal(candidateRoot.props.onClick, callback, `${kind} ${scenario.name}: callback is forwarded`);
    }
    assert.deepEqual(normalizeTree(candidateRoot.props.children), normalizeTree(baselineRoot.props.children), `${kind} ${scenario.name}: child classes, styles and animation variants match baseline`);

    const markup = renderToStaticMarkup(candidateElement);
    const baselineMarkup = renderToStaticMarkup(baselineElement);
    if (!scenario.props.href) {
      assert.match(markup, /^<button\b/, `${kind} ${scenario.name}: falsey href uses native button`);
      assert.equal(markup, baselineMarkup, `${kind} ${scenario.name}: button SSR markup matches baseline exactly`);
    } else {
      assert.match(markup, /^<a\b/, `${kind} ${scenario.name}: truthy href uses anchor`);
      has(markup, `href="${scenario.props.href}"`);
      has(markup, `aria-label="${kind} ${scenario.name.replace(" href", "")}"`);
      if (scenario.props.target) has(markup, `target="${scenario.props.target}"`);
      if (scenario.props.rel) has(markup, `rel="${scenario.props.rel}"`);
    }
    if (scenario.props["data-test"]) has(markup, `data-test="${kind}"`);
  }

  if (kind === "icon") {
    const buttonMarkup = renderToStaticMarkup(icon(current, { disabled: true, type: "submit", "aria-label": "Disabled icon" }));
    assert.match(buttonMarkup, /^<button\b/);
    has(buttonMarkup, 'disabled=""');
    has(buttonMarkup, 'type="submit"');
    has(buttonMarkup, 'aria-label="Disabled icon"');
  } else {
    const buttonMarkup = renderToStaticMarkup(pill(current, { disabled: true, type: "button", "aria-label": "Disabled pill" }));
    assert.match(buttonMarkup, /^<button\b/);
    has(buttonMarkup, 'disabled=""');
    has(buttonMarkup, 'type="button"');
    has(buttonMarkup, 'aria-label="Disabled pill"');
  }

  const hrefProps = { href: "/stable" };
  const firstRoot = rootElement(makeElement(current, hrefProps));
  const secondRoot = rootElement(makeElement(current, hrefProps));
  const baselineFirstRoot = rootElement(makeElement(baseline, hrefProps));
  const baselineSecondRoot = rootElement(makeElement(baseline, hrefProps));
  assert.equal(firstRoot.type, secondRoot.type, `${kind}: Motion Link root type remains stable across calls`);
  assert.notEqual(baselineFirstRoot.type, baselineSecondRoot.type, `${kind}: baseline recreated Motion Link root per call`);
}

// Real SSR checks initial DOM only. Callback forwarding is inspected on returned React elements, not browser activation.
// This does not prove keyboard/focus operation, client navigation, or interactive hover/tap execution.
console.log("PASS: installed React, Next Link and Framer Motion; absent/empty href render buttons with baseline-identical SSR, nonempty internal/external href render anchors; stable Motion Link identity beats original HEAD; root animation props, variants, classes, callbacks, attributes, and button/link SSR cases checked. Browser interaction and animated playback remain unproven.");
