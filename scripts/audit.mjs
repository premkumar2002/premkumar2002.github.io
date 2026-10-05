import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

// Run against `npm start`. Playwright supplies a repeatable Chrome executable.
const url = process.env.AUDIT_URL || "http://127.0.0.1:3000/";
await mkdir("reports", { recursive: true });
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"] });
try {
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse(url, { port: chrome.port, output: ["json", "html"], logLevel: "error", ...(mode === "desktop" ? { preset: "desktop" } : {}) });
    if (!result) throw new Error("Lighthouse returned no result");
    await writeFile(`reports/lighthouse-${mode}.json`, result.report[0]);
    await writeFile(`reports/lighthouse-${mode}.html`, result.report[1]);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round((value.score || 0) * 100)]));
    console.log(`${mode}:`, scores);
    for (const audit of Object.values(result.lhr.audits)) {
      if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== "informative") console.log(`  ${audit.id}: ${audit.displayValue || audit.title}`);
    }
  }
} finally { await chrome.kill(); }
