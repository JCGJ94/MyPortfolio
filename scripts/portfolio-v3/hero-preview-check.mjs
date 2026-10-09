// Read-only browser audit for the T03 hero/navigation prototype. Never submits forms.
// Usage: AUDIT_URL=http://localhost:3000/ node scripts/portfolio-v3/hero-preview-check.mjs
// Set PLAYWRIGHT_MODULE to an external Playwright package path when it is not project-installed.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function loadPlaywright() {
  if (process.env.PLAYWRIGHT_MODULE) {
    const configuredPath = path.resolve(process.env.PLAYWRIGHT_MODULE);
    const modulePath = fs.statSync(configuredPath).isDirectory()
      ? path.join(configuredPath, 'index.mjs')
      : configuredPath;
    return import(pathToFileURL(modulePath).href);
  }

  if (process.env.NODE_PATH) {
    const moduleRoots = process.env.NODE_PATH.split(path.delimiter);
    for (const root of moduleRoots) {
      const modulePath = path.join(root, 'playwright', 'index.mjs');
      if (fs.existsSync(modulePath)) return import(pathToFileURL(modulePath).href);
    }
  }

  return import('playwright');
}

const { chromium } = await loadPlaywright();
const base = process.env.AUDIT_URL || 'http://localhost:3000/';
const outputDir = path.resolve(
  process.env.AUDIT_OUTPUT_DIR || path.join(os.tmpdir(), `portfolio-v3-audit-${Date.now()}`)
);
const availableGroups = ['hero', 'layout', 'navigation', 'theme', 'focus', 'motion', 'reflow', 'locale'];
const requestedGroups = process.env.AUDIT_GROUPS
  ? new Set(process.env.AUDIT_GROUPS.split(',').map((group) => group.trim()).filter(Boolean))
  : new Set(availableGroups);
const activeGroups = new Set(
  requestedGroups.has('all') ? availableGroups : [...requestedGroups].filter((group) => availableGroups.includes(group))
);
const skippedGroups = availableGroups.filter((group) => !activeGroups.has(group));
const widths = [360, 390, 768, 1024, 1440];
const languages = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
};

const failures = [];
const errors = [];
const rows = [];
const check = (condition, details) => {
  if (!condition) failures.push(details);
};
const enabled = (group) => activeGroups.has(group);

async function readState(page, inspectOverflow = false) {
  return page.evaluate((shouldInspectOverflow) => {
    const hero = document.querySelector('#hero');
    const title = hero?.querySelector('h1');
    const role = hero?.querySelector('.hero-workbench__role') || title?.nextElementSibling;
    const avatar = hero?.querySelector('img[alt*="Avatar"]');
    const copy = hero?.querySelector('.hero-workbench__copy') || title?.parentElement;
    const description = hero?.querySelector('.hero-workbench__description') || copy?.querySelector('p');
    const scrollControl = document.querySelector('[aria-label="Scroll Down"]');
    const menuToggle = document.querySelector('.portfolio-nav__toggle, header button[aria-label*="menú"]');
    const footerBuildRow = document.querySelector('footer > div > div:last-child > div.flex.items-center');
    const rect = (element) => {
      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    };
    const intersects = (left, right) => Boolean(
      left && right && left.x < right.x + right.width && right.x < left.x + left.width &&
      left.y < right.y + right.height && right.y < left.y + left.height
    );
    const titleRect = rect(title);
    const avatarRect = rect(avatar);
    const copyRect = rect(copy);
    const descriptionRect = rect(description);
    const titleText = title?.firstChild;
    const titleWords = titleText?.textContent
      ? [...titleText.textContent.matchAll(/\S+/g)].map(({ 0: word, index }) => {
        const range = document.createRange();
        range.setStart(titleText, index);
        range.setEnd(titleText, index + word.length);
        return [...range.getClientRects()].map(({ x, width }) => ({ x, width }));
      })
      : [];
    const actions = [...(hero?.querySelectorAll('.hero-workbench__actions a') || [])].map((element) => ({
      rect: rect(element),
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      text: element.textContent?.trim() || '',
    }));
    const overflowCandidates = shouldInspectOverflow
      ? [...document.body.querySelectorAll('*')]
        .map((element) => ({ element, bounds: element.getBoundingClientRect() }))
        .filter(({ element, bounds }) => getComputedStyle(element).display !== 'none' && bounds.width > 0 && bounds.right > document.documentElement.clientWidth + 1)
        .sort((left, right) => right.bounds.right - left.bounds.right)
        .slice(0, 12)
        .map(({ element, bounds }) => {
          const ancestry = [];
          let current = element;
          while (current && current !== document.body && ancestry.length < 6) {
            const classes = typeof current.className === 'string'
              ? current.className.trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.')
              : '';
            ancestry.unshift(`${current.tagName.toLowerCase()}${current.id ? `#${current.id}` : ''}${classes ? `.${classes}` : ''}`);
            current = current.parentElement;
          }
          return {
            ancestry: ['body', ...ancestry].join(' > '),
            text: element.textContent?.trim().slice(0, 48) || '',
            x: bounds.x,
            right: bounds.right,
            width: bounds.width,
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
            position: getComputedStyle(element).position,
            overflowX: getComputedStyle(element).overflowX,
          };
        })
      : [];
    const navTargets = [...(document.querySelectorAll('.portfolio-nav__tools > button') || [])]
      .map((element) => rect(element));
    return {
      lang: document.documentElement.lang,
      theme: document.documentElement.className,
      role: role?.textContent?.trim() || '',
      heading: titleRect,
      headingText: title?.textContent?.trim() || '',
      titleWords,
      avatar: avatarRect,
      copy: copyRect,
      hero: rect(hero),
      scrollControl: rect(scrollControl),
      scrollControlDescriptionOverlap: intersects(rect(scrollControl), descriptionRect),
      copyAvatarOverlap: intersects(copyRect, avatarRect),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      documentOverflowX: getComputedStyle(document.documentElement).overflowX,
      bodyOverflowX: getComputedStyle(document.body).overflowX,
      footerBuildRow: footerBuildRow ? {
        ...rect(footerBuildRow),
        scrollWidth: footerBuildRow.scrollWidth,
        clientWidth: footerBuildRow.clientWidth,
      } : null,
      overflowCandidates,
      imageFetchPriority: avatar?.fetchPriority || avatar?.getAttribute('fetchpriority') || '',
      imageSizes: avatar?.getAttribute('sizes') || '',
      imageLoading: avatar?.loading || '',
      menuExpanded: menuToggle?.getAttribute('aria-expanded'),
      navTargets,
      actions,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    };
  }, inspectOverflow);
}

async function preparePage(page, theme, width, height) {
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ colorScheme: theme, reducedMotion: width === 390 || width === 1440 ? 'reduce' : 'no-preference' });
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(800);
  await page.addStyleTag({ content: '[data-feedback-toolbar],nextjs-portal{display:none!important}' });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const currentTheme = (await readState(page)).theme.includes('dark') ? 'dark' : 'light';
    if (currentTheme === theme) break;
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await page.waitForTimeout(300);
  }
  await page.evaluate(() => scrollTo(0, 0));
}

async function runStandardAudit(browser) {
  for (const width of widths) {
    for (const theme of ['dark', 'light']) {
      const context = await browser.newContext({ viewport: { width, height: width >= 1024 ? 900 : 844 } });
      const page = await context.newPage();
      try {
        await preparePage(page, theme, width, width >= 1024 ? 900 : 844);
        const first = await readState(page);
        rows.push({ width, requestedTheme: theme, phase: 'first-load', ...first });
        if (enabled('hero')) {
          check(first.role.includes('Full Stack Developer'), {
            width, theme, phase: 'first-load', reason: 'role-not-complete-within-800ms', observed: first.role,
          });
        }
        if (enabled('layout')) {
          check(!first.horizontalOverflow, { width, theme, phase: 'first-load', reason: 'horizontal-overflow' });
          check(!first.scrollControlDescriptionOverlap, {
            width, theme, phase: 'first-load', reason: 'scroll-control-overlaps-hero-description',
          });
          if (width >= 1024) {
            check(!first.copyAvatarOverlap, { width, theme, phase: 'first-load', reason: 'copy-and-avatar-overlap' });
          }
        }
        if (enabled('hero')) {
          check(first.imageFetchPriority === 'high', {
            width, theme, phase: 'first-load', reason: 'avatar-fetchpriority-not-high', observed: first.imageFetchPriority,
          });
          check(first.imageSizes.includes('40rem') && first.imageSizes.includes('64rem'), {
            width, theme, phase: 'first-load', reason: 'avatar-responsive-sizes-missing', observed: first.imageSizes,
          });
          check(first.imageLoading !== 'lazy', {
            width, theme, phase: 'first-load', reason: 'lcp-avatar-lazy-loaded', observed: first.imageLoading,
          });
        }
        if (enabled('motion')) {
          const reducedMotion = width === 390 || width === 1440;
          check(first.reducedMotion === reducedMotion, {
            width, theme, phase: 'first-load', reason: 'reduced-motion-emulation-mismatch',
          });
        }

        const themeState = await readState(page);
        rows.push({ width, requestedTheme: theme, phase: 'theme', ...themeState });
        if (enabled('theme')) {
          check(themeState.theme.includes(theme), {
            width, theme, phase: 'theme', reason: 'theme-toggle-did-not-reach-requested-theme', observed: themeState.theme,
          });
        }
        await page.screenshot({ path: path.join(outputDir, `hero-${width}-${theme}.png`) });

        if (enabled('focus')) {
          await page.keyboard.press('Tab');
          const focused = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            href: document.activeElement?.getAttribute('href'),
            label: document.activeElement?.getAttribute('aria-label'),
            outlineStyle: getComputedStyle(document.activeElement).outlineStyle,
            outlineWidth: getComputedStyle(document.activeElement).outlineWidth,
          }));
          rows.push({ width, theme, phase: 'keyboard-tab', focused });
          check(['A', 'BUTTON'].includes(focused.tag), {
            width, theme, phase: 'keyboard-tab', reason: 'first-tab-stop-not-interactive', observed: focused,
          });
          check(focused.outlineStyle !== 'none' && focused.outlineWidth !== '0px', {
            width, theme, phase: 'keyboard-tab', reason: 'focus-visible-indicator-missing', observed: focused,
          });
        }

        if (enabled('navigation') && width < 960) {
          const toggle = page.locator('.portfolio-nav__toggle, header button[aria-label*="menú"]').first();
          if (await toggle.count() && await toggle.isVisible()) {
            const before = await toggle.getAttribute('aria-expanded');
            await toggle.focus();
            await page.keyboard.press('Enter');
            const afterOpen = await toggle.getAttribute('aria-expanded');
            const mobileMenu = page.locator('header nav[aria-label="Navegación móvil"]');
            const mobileLinks = mobileMenu.locator('a[href="/#projects"]');
            const menuVisible = (await mobileLinks.count()) > 0;
            const target = await toggle.boundingBox();
            rows.push({ width, theme, phase: 'keyboard-menu-open', before, afterOpen, menuVisible, target });
            check(before === 'false' && afterOpen === 'true' && menuVisible, {
              width, theme, phase: 'keyboard-menu-open', reason: 'keyboard-menu-does-not-expose-expanded-state',
              before, afterOpen, menuVisible,
            });
            check(Boolean(target && target.width >= 44 && target.height >= 44), {
              width, theme, phase: 'keyboard-menu-open', reason: 'menu-toggle-target-under-44px', target,
            });

            const allMobileLinks = mobileMenu.locator('a');
            await allMobileLinks.last().focus();
            await page.keyboard.press('Tab');
            const focusAfterMenuTab = await page.evaluate(() => ({
              tag: document.activeElement?.tagName,
              href: document.activeElement?.getAttribute('href'),
              stillInMenu: Boolean(document.activeElement?.closest('nav[aria-label="Navegación móvil"]')),
            }));
            rows.push({ width, theme, phase: 'keyboard-menu-tab-exit', focusAfterMenuTab });
            check(!focusAfterMenuTab.stillInMenu && ['A', 'BUTTON'].includes(focusAfterMenuTab.tag), {
              width, theme, phase: 'keyboard-menu-tab-exit', reason: 'mobile-menu-traps-keyboard-focus', focusAfterMenuTab,
            });

            await mobileLinks.first().focus();
            const focusBeforeEscape = await page.evaluate(() => ({
              tag: document.activeElement?.tagName,
              href: document.activeElement?.getAttribute('href'),
              inMobileMenu: Boolean(document.activeElement?.closest('nav[aria-label="Navegación móvil"]')),
            }));
            await page.keyboard.press('Escape');
            await page.waitForTimeout(0);
            const afterEscape = await toggle.getAttribute('aria-expanded');
            const visibleAfterEscape = (await mobileLinks.count()) > 0 && await mobileLinks.first().isVisible().catch(() => false);
            const focusAfterEscape = await page.evaluate(() => ({
              tag: document.activeElement?.tagName,
              label: document.activeElement?.getAttribute('aria-label'),
              isToggle: document.activeElement?.matches('.portfolio-nav__toggle') || false,
              isBody: document.activeElement === document.body,
            }));
            rows.push({ width, theme, phase: 'keyboard-menu-escape-from-link', focusBeforeEscape, afterEscape, visibleAfterEscape, focusAfterEscape });
            check(focusBeforeEscape.inMobileMenu, {
              width, theme, phase: 'keyboard-menu-escape-from-link', reason: 'escape-test-did-not-focus-menu-link', focusBeforeEscape,
            });
            check(afterEscape === 'false' && !visibleAfterEscape && focusAfterEscape.isToggle, {
              width, theme, phase: 'keyboard-menu-escape-from-link', reason: 'escape-from-link-does-not-close-and-restore-focus',
              afterEscape, visibleAfterEscape, focusAfterEscape,
            });

            await toggle.focus();
            await page.keyboard.press('Enter');
            await page.locator('header nav[aria-label="Navegación móvil"] a[href="/#projects"]').click();
            await page.waitForTimeout(250);
            const afterLink = await toggle.getAttribute('aria-expanded');
            const visibleAfterLink = (await page.locator('header nav[aria-label="Navegación móvil"] a[href="/#projects"]:visible').count()) > 0;
            const hashAfterLink = await page.evaluate(() => window.location.hash);
            rows.push({ width, theme, phase: 'menu-link-close', afterLink, visibleAfterLink, hashAfterLink });
            check(afterLink === 'false' && !visibleAfterLink && hashAfterLink === '#projects', {
              width, theme, phase: 'menu-link-close', reason: 'menu-link-does-not-close-and-navigate',
              afterLink, visibleAfterLink, hashAfterLink,
            });
          }
        }

        if (enabled('locale')) {
          for (const [code, label] of Object.entries(languages)) {
            const switcher = page.locator('footer button').first();
            await switcher.click({ timeout: 5000 });
            await page.getByRole('button', { name: label, exact: true }).click({ timeout: 5000 });
            await page.waitForTimeout(120);
            const localeState = await readState(page);
            rows.push({ width, theme, phase: 'language', selected: code, ...localeState });
            check(localeState.lang === code, {
              width, theme, phase: 'language', selected: code, reason: 'html-lang-mismatch', observed: localeState.lang,
            });
          }
        }
      } catch (error) {
        errors.push({ width, theme, error: String(error).slice(0, 450) });
      } finally {
        await context.close();
      }
    }
  }
}

async function runReflowAudit(browser) {
  for (const width of [195, 320, 375, 414, 720]) {
    for (const theme of ['dark', 'light']) {
      const height = width === 195 ? 422 : width >= 720 ? 900 : 844;
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage();
      try {
        await preparePage(page, theme, width, height);
        const state = await readState(page, true);
        rows.push({ width, theme, phase: 'reflow', ...state });
        check(!['hidden', 'clip'].includes(state.documentOverflowX) && !['hidden', 'clip'].includes(state.bodyOverflowX), {
          width, theme, phase: 'reflow', reason: 'document-overflow-x-is-hidden-or-clipped',
          documentOverflowX: state.documentOverflowX, bodyOverflowX: state.bodyOverflowX,
        });
        check(!state.horizontalOverflow, {
          width, theme, phase: 'reflow', reason: 'document-overflows-effective-viewport',
          clientWidth: state.clientWidth, scrollWidth: state.scrollWidth,
        });
        if (width === 195) {
          check(state.footerBuildRow && state.footerBuildRow.x >= -1 &&
            state.footerBuildRow.x + state.footerBuildRow.width <= width + 1 &&
            state.footerBuildRow.scrollWidth <= state.footerBuildRow.clientWidth + 1, {
              width, theme, phase: 'reflow', reason: 'footer-build-row-overflows-effective-viewport',
              footerBuildRow: state.footerBuildRow,
            });
        }
        check(state.titleWords.length > 0 && state.titleWords.every((fragments) =>
          fragments.length === 1 && fragments[0].width <= (state.heading?.width || 0) + 1 && fragments[0].x + fragments[0].width <= width + 1
        ), {
          width, theme, phase: 'reflow', reason: 'headline-word-clipped-or-fragmented',
          headingText: state.headingText, titleWords: state.titleWords,
        });
        check(state.navTargets.length > 0 && state.navTargets.every((target) =>
          target && target.width >= 44 && target.height >= 44
        ), {
          width, theme, phase: 'reflow', reason: 'navigation-control-target-under-44px', navTargets: state.navTargets,
        });
        check(state.actions.length === 2 && state.actions.every((action) =>
          action.rect && action.clientWidth >= 44 && action.scrollWidth <= action.clientWidth + 1
        ), {
          width, theme, phase: 'reflow', reason: 'hero-action-content-overflows-its-control', actions: state.actions,
        });
        await page.screenshot({ path: path.join(outputDir, `hero-${width}-${theme}.png`) });
      } catch (error) {
        errors.push({ width, theme, phase: 'reflow', error: String(error).slice(0, 450) });
      } finally {
        await context.close();
      }
    }
  }
}

(async () => {
  if (!activeGroups.size) throw new Error(`No valid AUDIT_GROUPS selected. Available: ${availableGroups.join(', ')}`);
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
    args: ['--no-first-run', '--disable-extensions'],
  });

  await runStandardAudit(browser);
  if (enabled('reflow')) await runReflowAudit(browser);
  await browser.close();

  const report = {
    base,
    outputDir,
    groups: { selected: [...activeGroups], skipped: skippedGroups },
    generatedAt: new Date().toISOString(),
    rows,
    errors,
    failures,
  };
  const reportPath = path.join(outputDir, 'hero-preview-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ report: reportPath, groups: report.groups, rows: rows.length, errors, failures }, null, 2));
  process.exitCode = errors.length || failures.length ? 1 : 0;
})().catch((error) => {
  console.error(error);
  process.exitCode = 2;
});
