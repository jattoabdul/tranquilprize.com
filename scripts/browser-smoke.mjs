import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8788';
const server = process.env.TEST_BASE_URL
  ? null
  : spawn(
      process.execPath,
      [
        'node_modules/wrangler/bin/wrangler.js',
        'dev',
        '--env',
        'production',
        '--local',
        '--ip',
        '127.0.0.1',
        '--port',
        '8788',
      ],
      { stdio: 'pipe' },
    );
let logs = '';
server?.stdout.on('data', (data) => {
  logs += data;
});
server?.stderr.on('data', (data) => {
  logs += data;
});
let browser;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await setTimeout(500);
  }
  assert(ready, `Preview failed to start: ${logs}`);
  browser = await chromium.launch();
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of ['/', '/enter/', '/participation/']) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route} overflows at ${width}px`,
      );
    }
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    assert.deepEqual(
      audit.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((n) => n.target),
      })),
      [],
      `Accessibility on ${route}`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(
    await page
      .locator('.skip-link')
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
  await page.getByRole('button', { name: 'Menu' }).click();
  assert.equal(await page.locator('#primary-nav').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#primary-nav').isVisible(), false);
  assert.equal(
    await page
      .locator('.menu-toggle')
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.locator('summary').first().focus();
  await page.keyboard.press('Enter');
  assert.equal(
    await page
      .locator('details')
      .first()
      .evaluate((el) => el.open),
    true,
  );
  await page
    .getByRole('link', { name: 'Enter the competition', exact: true })
    .filter({ visible: true })
    .click();
  await page.waitForURL('**/enter/');
  assert(
    (
      await page
        .getByRole('link', { name: 'Open the application form' })
        .getAttribute('href')
    ).includes('1FAIpQLSdUkh8KxkuA2PvPiT6XQPXW8VVwKw78BsorWLr-NLBboDW7IQ'),
  );
  assert.equal(
    await page
      .getByRole('link', { name: 'RSVP to attend' })
      .getAttribute('href'),
    'https://luma.com/3nrxc5t9',
  );
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    'auto',
  );
  assert.deepEqual(errors, [], 'Page errors or CSP violations');
  const missing = await fetch(base + '/missing-page/');
  assert.equal(missing.status, 404);
  assert((await missing.text()).includes('Let’s get you'));
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await nojs.newPage();
  await staticPage.goto(base);
  assert.equal(await staticPage.locator('#primary-nav').isVisible(), true);
  await nojs.close();
  console.log(
    'Mobile/desktop layouts, accessibility, CSP, keyboard controls, application/RSVP paths, reduced motion and no-JS navigation passed.',
  );
} finally {
  await browser?.close();
  server?.kill('SIGTERM');
}
