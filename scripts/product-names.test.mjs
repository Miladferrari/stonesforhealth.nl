import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProductName, productNamePayload } from './product-names.mjs';
import { setRawProductTitle } from './wp-product-titles.mjs';

// Zelfstandig uitvoerbaar zonder .env.local of echte accounts.
process.env.NEXT_PUBLIC_WOOCOMMERCE_URL = 'https://example.test/wp-json/wc/v3';
process.env.WOOCOMMERCE_CONSUMER_KEY = 'test';
process.env.WOOCOMMERCE_CONSUMER_SECRET = 'test';
const { woo } = await import('./woo.mjs');

test('productnamen decoderen zonder opnieuw te veranderen', () => {
  for (const input of ['A &amp; B', 'A &amp;amp; B', 'A &#38; B', 'A &#x26; B', 'A & B']) {
    const result = normalizeProductName(input);
    assert.equal(result, 'A & B');
    assert.equal(normalizeProductName(result), result);
  }
  assert.equal(normalizeProductName('S4H® – Tijgeroog'), 'S4H® – Tijgeroog');
  const body = { name: 'A &amp; B', description: '<p>A &amp; B</p>', slug: 'a-b' };
  assert.deepEqual(productNamePayload('products/182', body), { ...body, name: 'A & B' });
  assert.equal(productNamePayload('products/categories', body), body);
  assert.equal(body.name, 'A &amp; B');
});

function credentials(t) {
  const previous = { WP_USER: process.env.WP_USER, WP_APP_PASSWORD: process.env.WP_APP_PASSWORD };
  process.env.WP_USER = 'test';
  process.env.WP_APP_PASSWORD = 'test';
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
}

test('WooCommerce-write herstelt de opnieuw gecodeerde titel via WordPress', async t => {
  credentials(t);
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    const pathname = new URL(url).pathname;
    calls.push({ pathname, method: options.method, body: options.body && JSON.parse(options.body) });
    return Response.json(pathname.includes('/wc/v3/')
      ? { id: 182, slug: 'a-b', name: 'A &amp; B' }
      : { id: 182, slug: 'a-b', title: { raw: 'A & B', rendered: 'A &#038; B' } });
  });
  const saved = await woo.put('products/182', { name: 'A &amp; B', description: '<p>A &amp; B</p>' });
  assert.equal(saved.name, 'A & B');
  assert.deepEqual(calls.map(c => c.method), ['PUT', 'POST', 'GET']);
  assert.deepEqual(calls[0].body, { name: 'A & B', description: '<p>A &amp; B</p>' });
  assert.deepEqual(calls[1].body, { title: 'A & B' });
});

test('ontbrekende WordPress-credentials blokkeren vóór de WooCommerce-write', async t => {
  credentials(t);
  delete process.env.WP_APP_PASSWORD;
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Geen netwerk verwacht'); });
  await assert.rejects(woo.put('products/182', { name: 'A & B' }), /WP_APP_PASSWORD/);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('prijsupdates gaan alleen via WooCommerce en vereisen geen WordPress-login', async t => {
  credentials(t);
  delete process.env.WP_APP_PASSWORD;
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push(JSON.parse(options.body));
    return Response.json({ id: 182, regular_price: '20.00' });
  });
  await woo.put('products/182', { regular_price: '20.00' });
  assert.deepEqual(calls, [{ regular_price: '20.00' }]);
});

test('verificatie weigert een nog gecodeerde ruwe titel', async t => {
  credentials(t);
  t.mock.method(globalThis, 'fetch', async () => Response.json({
    id: 182, slug: 'a-b', title: { raw: 'A &amp; B', rendered: 'A &amp; B' },
  }));
  await assert.rejects(setRawProductTitle(182, 'A & B', 'a-b'), /Verificatie/);
});
