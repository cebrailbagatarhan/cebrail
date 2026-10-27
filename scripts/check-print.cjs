/* Run with PORTFOLIO_PLAYWRIGHT_PATH pointing to the installed Playwright package. */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_PATH || "playwright");
const root = path.resolve("docs");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml" };
const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const data = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch (_) { res.writeHead(404).end("Not found"); }
});
let browser;
(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 800, height: 1000 } });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const url = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await page.goto(url)).status(), 200);
    await page.locator('[data-filter="nlp"]').click();
    assert.equal(await page.locator(".project-card:visible").count(), 2);
    await page.emulateMedia({ media: "print" });
    assert.equal(await page.locator(".project-card:visible").count(), 8, "print must include filtered-out projects");
    assert.equal(await page.locator(".site-header").evaluate(node => getComputedStyle(node).display), "none");
    assert.equal(await page.locator(".project-art").first().evaluate(node => getComputedStyle(node).display), "none");
    assert.equal(await page.locator("body").evaluate(node => getComputedStyle(node).backgroundColor), "rgb(255, 255, 255)");
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    await page.emulateMedia({ media: "screen" });
    assert.equal(await page.locator(".project-card:visible").count(), 2, "screen filter must remain unchanged");
    assert.deepEqual(errors, []);
    console.log("PASS printable overview: 8 cards, readable print style, original screen filter retained");
    await page.close();
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
