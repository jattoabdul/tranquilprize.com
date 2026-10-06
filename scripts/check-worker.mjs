import assert from 'node:assert/strict';
import worker from '../worker/index.js';

for (const protocol of ['http:', 'https:']) {
  const response = await worker.fetch(
    new Request(`${protocol}//www.tranquilprize.com/enter/?source=check`),
    {},
  );
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get('location'),
    'https://tranquilprize.com/enter/?source=check',
  );
}
const request = new Request('https://tranquilprize.com/enter/');
const asset = new Response('Asset response', { status: 404 });
const response = await worker.fetch(request, {
  ASSETS: {
    fetch: (forwarded) => {
      assert.equal(forwarded, request);
      return asset;
    },
  },
});
assert.equal(response, asset);
const html = await worker.fetch(request, {
  ASSETS: {
    fetch: () =>
      new Response('Page', {
        status: 404,
        headers: {
          'content-type': 'text/html',
          'cache-control': 'public, max-age=0',
          'x-content-type-options': 'nosniff',
        },
      }),
  },
});
assert.equal(html.status, 404);
assert.equal(
  html.headers.get('cache-control'),
  'public, max-age=0, no-transform',
);
assert.equal(html.headers.get('x-content-type-options'), 'nosniff');
assert.equal(await html.text(), 'Page');
console.log('Canonical host redirect and asset response forwarding passed.');
