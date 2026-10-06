import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { parseHTML } from 'linkedom';

const origin = 'https://tranquilprize.com';
const routes = ['/', '/enter/', '/participation/'];
const pages = new Map();
for (const route of routes) {
  const html = await readFile(`dist${route}index.html`, 'utf8');
  const { document } = parseHTML(html);
  pages.set(route, document);
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: one H1`);
  assert.equal(
    document.querySelector('link[rel="canonical"]').href,
    origin + route,
  );
  assert(
    document.querySelector('meta[name="description"]').content.length > 30,
  );
  assert(
    document
      .querySelector('meta[property="og:image"]')
      .content.startsWith(origin),
  );
  assert(!html.includes('9:45'), 'Internal arrival time must not be published');
  assert(!html.includes('/Users/'), 'Machine paths must not be published');
  assert.equal(
    document.querySelectorAll('form, iframe').length,
    0,
    'Intake stays external',
  );
  for (const el of document.querySelectorAll('[src], link[rel="stylesheet"]')) {
    const url = el.getAttribute('src') || el.getAttribute('href');
    assert(url.startsWith('/'), `Unexpected external resource: ${url}`);
    await access(`dist${new URL(url, origin).pathname}`);
  }
}
for (const [route, document] of pages) {
  for (const a of document.querySelectorAll('a')) {
    assert(
      a.getAttribute('href') && a.getAttribute('href') !== '#',
      'Empty link',
    );
    const url = new URL(a.getAttribute('href'), origin + route);
    if (url.origin !== origin) {
      assert(
        [
          'https://luma.com/3nrxc5t9',
          'https://docs.google.com/forms/d/e/1FAIpQLSdUkh8KxkuA2PvPiT6XQPXW8VVwKw78BsorWLr-NLBboDW7IQ/viewform',
        ].includes(url.href),
        'Unapproved external destination',
      );
      assert(a.rel.includes('noopener'), 'External link needs noopener');
    } else {
      assert(pages.has(url.pathname), `Missing route ${url.pathname}`);
      if (url.hash)
        assert(
          pages.get(url.pathname).getElementById(url.hash.slice(1)),
          `Missing anchor ${url.href}`,
        );
    }
  }
}
assert(pages.get('/').body.textContent.includes('9:30 a.m.'));
assert(pages.get('/').body.textContent.includes('10:30 a.m.'));
assert(pages.get('/enter/').body.textContent.includes('JS1'));
assert(pages.get('/enter/').body.textContent.includes('60 seconds'));
await access('dist/404.html');
await access('dist/_headers');
await access('dist/_redirects');
console.log(
  'Built routes, anchors, local assets, event timings and external destinations passed.',
);
