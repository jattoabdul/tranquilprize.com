// Renders /programme/ with its print stylesheet to public/tpsp-2026-programme.pdf.
// Usage: npm run programme:pdf (builds, then serves dist from an in-process server).
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const build = spawnSync(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'build'],
  { stdio: 'inherit' },
);
assert.equal(build.status, 0, 'Build failed');

const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
const server = createServer(async (req, res) => {
  let path = normalize(
    decodeURIComponent(new URL(req.url, 'http://x').pathname),
  );
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join('dist', path));
    res.writeHead(200, {
      'content-type': types[extname(path)] || 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(base + '/programme/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: 'public/tpsp-2026-programme.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log('Wrote public/tpsp-2026-programme.pdf');
} finally {
  await browser?.close();
  server.close();
}
