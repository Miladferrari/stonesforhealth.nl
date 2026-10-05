// Gebruik title.raw: WooCommerce kan name ook in context=edit HTML-coderen.
export function assertTitleCredentials() {
  if (!process.env.WP_USER || !process.env.WP_APP_PASSWORD) {
    throw new Error('Producttitels herstellen vereist WP_USER en WP_APP_PASSWORD in .env.local.');
  }
}

async function request(endpoint, body) {
  assertTitleCredentials();
  const base = (process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '')
    .replace(/\/wp-json\/wc\/v3\/?$/, '').replace(/\/$/, '');
  const auth = Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD.replace(/\s+/g, '')}`).toString('base64');
  const res = await fetch(`${base}/wp-json/wp/v2/product${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`WordPress-producttitel: HTTP ${res.status}`);
  const data = await res.json();
  return { data, pages: Number(res.headers.get('x-wp-totalpages') || 1) };
}

function rawProduct(p) {
  if (typeof p.title?.raw !== 'string') throw new Error(`Ruwe titel ontbreekt voor product ${p.id}.`);
  return { id: p.id, slug: p.slug, name: p.title.raw };
}

export async function getRawProductTitle(id) {
  return rawProduct((await request(`/${id}?context=edit&_fields=id,slug,title`)).data);
}

export async function getRawProductTitles() {
  const products = [];
  let pages = 1;
  for (let page = 1; page <= pages; page++) {
    const result = await request(`?context=edit&status=any&per_page=100&page=${page}&_fields=id,slug,title`);
    pages = result.pages;
    products.push(...result.data.map(rawProduct));
  }
  return products;
}

export async function setRawProductTitle(id, name, expectedSlug) {
  await request(`/${id}?context=edit`, { title: name });
  const saved = await getRawProductTitle(id);
  if (saved.name !== name || saved.slug !== expectedSlug) {
    throw new Error(`Verificatie van titel/slug mislukt voor product ${id}.`);
  }
  return saved;
}
