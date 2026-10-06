import assert from 'node:assert/strict';
const base = process.env.SITE_URL || 'https://tranquilprize.com';
for (const [route, text] of [
  ['/', '9:30 a.m.'],
  ['/enter/', 'Open the application form'],
  ['/participation/', 'Photography and filming'],
]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  assert((await response.text()).includes(text), `${route}: expected content`);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
}
assert.equal((await fetch(base + '/missing-page/')).status, 404);
const www = await fetch('https://www.tranquilprize.com/enter/?source=smoke', {
  redirect: 'manual',
});
assert.equal(www.status, 301);
assert.equal(www.headers.get('location'), base + '/enter/?source=smoke');
console.log(
  'Live pages, public arrival, security headers, 404 and www redirect passed.',
);
