/* Run with PORTFOLIO_PLAYWRIGHT_PATH pointing to an installed Playwright package. */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_PATH || "playwright");
const root = path.resolve("docs");
const output = path.resolve("portfolio-check");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml" };
const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const body = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch (_) { res.writeHead(404).end("Not found"); }
});
const checks = [];
const record = (message) => { checks.push(message); console.log("PASS " + message); };
let browser;
(async () => {
  await fs.mkdir(output, { recursive: true });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const url = "http://127.0.0.1:" + server.address().port;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.url().startsWith(url) && response.status() >= 400) errors.push(response.status() + " " + response.url());
    });
    assert.equal((await page.goto(url)).status(), 200);
    assert.equal(await page.locator("html").getAttribute("lang"), "tr");
    assert.equal(await page.locator(".project-card:visible").count(), 8);
    assert.equal(await page.locator("h1").count(), 1);
    record("Turkish first render, eight real project cards, one page heading");

    for (const [category, count] of [["ai", 4], ["nlp", 2], ["apps", 4], ["all", 8]]) {
      await page.locator('[data-filter="' + category + '"]').click();
      assert.equal(await page.locator(".project-card:visible").count(), count);
      assert.equal(await page.locator('[data-filter="' + category + '"]').getAttribute("aria-pressed"), "true");
      assert.equal(await page.locator("#project-count").textContent(), count + " proje gösteriliyor");
    }
    record("Project categories filter correctly and announce counts");

    const details = page.locator('[data-detail="flight"]');
    await details.click();
    assert.equal(await page.locator("#project-dialog").evaluate(node => node.open), true);
    assert.match(await page.locator("#dialog-evidence").textContent(), /Dimar Tarmizi/);
    assert.equal(await page.locator("#dialog-repo").getAttribute("href"), "https://github.com/cebrailbagatarhan/web-flight-simulator");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#project-dialog").evaluate(node => node.open), false);
    assert.equal(await details.evaluate(node => node === document.activeElement), true);
    record("Project dialog preserves attribution, links correctly and restores keyboard focus");

    await page.locator("#language-toggle").click();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.match(await page.locator("h1").textContent(), /working code/);
    assert.equal(await page.locator("#project-count").textContent(), "8 projects shown");
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    await page.locator('[data-detail="results"]').click();
    assert.match(await page.locator("#dialog-evidence").textContent(), /single-seed/);
    await page.locator(".dialog-close").click();
    record("English translation, stored preference and translated project details");

    await page.locator('[data-metric="throughput"]').click();
    assert.equal(await page.locator("#off-value").textContent(), "8,584.66");
    assert.equal(await page.locator("#legacy-value").textContent(), "6,607.76");
    assert.equal(await page.locator("#metric-difference").textContent(), "29.9%");
    assert.equal(await page.locator("#off-bar").evaluate(node => node.style.width), "100%");
    await page.locator('[data-metric="ppl"]').click();
    assert.equal(await page.locator("#metric-difference").textContent(), "20.5%");
    record("Both experiment metrics use recorded values, correct ratios and a zero baseline");

    await page.locator("#copy-profile").click();
    await page.waitForFunction(() => document.getElementById("copy-status").textContent.includes("copied"));
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), "https://github.com/cebrailbagatarhan");
    record("Copy-profile action writes the intended public URL");

    for (const language of ["en", "tr"]) {
      if (await page.locator("html").getAttribute("lang") !== language) await page.locator("#language-toggle").click();
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true, language + " overflow at " + width);
      }
    }
    record("No horizontal overflow at 320, 390, 768 and 1440 px in both languages");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("#menu-toggle").click();
    assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("#site-nav").isVisible(), true);
    await page.locator('#site-nav a[href="#projects"]').click();
    assert.equal(await page.locator("#site-nav").isVisible(), false);
    await page.locator("#menu-toggle").click();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "false");
    assert.equal(await page.locator("#menu-toggle").evaluate(node => node === document.activeElement), true);
    assert.equal(await page.locator(".orbit-path").evaluate(node => getComputedStyle(node).animationName), "none");
    record("Mobile menu, Escape focus and reduced-motion preference");

    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href")).filter(href => !document.getElementById(href.slice(1))));
    assert.deepEqual(brokenAnchors, []);
    const emptyLinks = await page.locator("a").evaluateAll(nodes => nodes.filter(node => !node.textContent.trim() && !node.getAttribute("aria-label")).length);
    assert.equal(emptyLinks, 0);
    assert.deepEqual(errors, []);
    record("Internal navigation, accessible link names, assets and browser error checks");

    await page.setViewportSize({ width: 1360, height: 1050 });
    await page.goto(url);
    const desktop = await page.screenshot({ path: path.join(output, "desktop.jpg"), type: "jpeg", quality: 70 });
    await page.screenshot({ path: path.join(output, "full-page.jpg"), type: "jpeg", quality: 65, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    const mobile = await page.screenshot({ path: path.join(output, "mobile.jpg"), type: "jpeg", quality: 75 });

    const fallback = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
    const fallbackPage = await fallback.newPage();
    await fallbackPage.goto(url);
    assert.equal(await fallbackPage.locator(".project-card:visible").count(), 8);
    assert.equal(await fallbackPage.locator("#site-nav").isVisible(), true);
    assert.equal(await fallbackPage.locator(".project-toolbar").isVisible(), false);
    assert.equal(await fallbackPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    record("Content and mobile navigation remain usable with JavaScript disabled");
    await fallback.close();

    await fs.writeFile(path.join(output, "report.json"), JSON.stringify({ checks, browserErrors: errors }, null, 2));
    console.log("PORTFOLIO_DESKTOP_JPEG=" + desktop.toString("base64"));
    console.log("PORTFOLIO_MOBILE_JPEG=" + mobile.toString("base64"));
    console.log("All " + checks.length + " portfolio checks passed.");
    await context.close();
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
