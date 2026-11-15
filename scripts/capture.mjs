// Takes fresh screenshots of the demo sites for the hero fan and work tiles.
// Usage: npm run build && npm run capture   (needs Playwright with Chromium installed)
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const slugs = ['aurel', 'orbit', 'maison', 'osteria', 'dash'];
const port = 4399;
const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 4000));
mkdirSync('public/work', { recursive: true });
const browser = await chromium.launch();
try {
  for (const slug of slugs) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:${port}/portfolio/work/${slug}/`, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '.concept-bar{display:none!important}*{animation-play-state:paused!important}' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `public/work/${slug}.jpg`, type: 'jpeg', quality: 88 });
    await page.close();
    console.log('captured', slug);
  }
} finally {
  await browser.close();
  server.kill();
}
