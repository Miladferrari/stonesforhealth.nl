// Scrapet het volledige S4H-assortiment van bol.com: titel, beschrijving,
// EAN en de fotogalerij per product.
//
//   node scripts/bol-scrape.mjs              # alles, hervat waar het stopte
//   node scripts/bol-scrape.mjs --limit 5    # eerst een paar proberen
//   node scripts/bol-scrape.mjs --fresh      # opnieuw beginnen
//
// Resultaat: data/bol-scrape.jsonl (één product per regel).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchPage, imageExists, parseLd, decode, sleep } from './bol.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'bol-scrape.jsonl');
const SELLER = 'https://www.bol.com/nl/nl/b/s4h/608391561/';

const args = process.argv.slice(2);
const FRESH = args.includes('--fresh');
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;
const CONCURRENCY = 4;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
if (FRESH) fs.rmSync(OUT, { force: true });

// ---------- 1. alle product-ids van de verkooppagina ----------

async function collectProductIds() {
  const ids = new Map(); // id -> pad op bol
  for (let page = 1; page <= 20; page++) {
    const html = await fetchPage(page === 1 ? SELLER : `${SELLER}?page=${page}`);
    const before = ids.size;
    for (const m of html.matchAll(/\/nl\/nl\/p\/([a-z0-9-]+)\/(\d{10,})\//g)) {
      if (!ids.has(m[2])) ids.set(m[2], m[1]);
    }
    const total = (html.match(/([\d.]+)\s*resultaten/) || [])[1];
    console.log(`  pagina ${page}: ${ids.size - before} nieuw, totaal ${ids.size}${total ? ` van ${total}` : ''}`);
    if (ids.size === before) break;
    await sleep(400);
  }
  return ids;
}

// ---------- 2. de galerij uit de pagina ----------

const IMG_RE = /https:\/\/media\.s-bol\.com\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/(\d+)x(\d+)\.jpg/g;
const bestSizeCache = new Map();

/** Bol serveert per foto maar een paar maten. 1200x1200 is de mooiste als die bestaat. */
async function bestImageUrl(key, seen) {
  if (bestSizeCache.has(key)) return bestSizeCache.get(key);
  const big = `https://media.s-bol.com/${key}/1200x1200.jpg`;
  const url = (await imageExists(big))
    ? big
    : seen.sort((a, b) => b.area - a.area)[0].url;
  bestSizeCache.set(key, url);
  return url;
}

async function extractGallery(html) {
  const start = html.indexOf('data-test="left-column"');
  if (start < 0) return [];
  const end = html.indexOf('data-test="right-column"');
  const seg = html.slice(start, end > start ? end : start + 60000);

  // Alt-tekst per foto bewaren: bruikbaar als alt in de webshop.
  const alts = new Map();
  for (const m of seg.matchAll(/<img[^>]*?src="(https:\/\/media\.s-bol\.com\/[^"]+)"[^>]*?alt="([^"]*)"/g)) {
    const k = (m[1].match(IMG_RE) || [])[0];
    if (k) alts.set(k, decode(m[2]));
  }

  const byKey = new Map(); // "id/hash" -> alle gevonden maten, in volgorde van verschijnen
  for (const m of seg.matchAll(IMG_RE)) {
    const key = `${m[1]}/${m[2]}`;
    const entry = { url: m[0], area: Number(m[3]) * Number(m[4]) };
    if (!byKey.has(key)) byKey.set(key, { alt: alts.get(m[0]) || '', sizes: [] });
    byKey.get(key).sizes.push(entry);
    if (!byKey.get(key).alt && alts.get(m[0])) byKey.get(key).alt = alts.get(m[0]);
  }

  const out = [];
  for (const [key, info] of byKey) {
    out.push({ src: await bestImageUrl(key, info.sizes), alt: info.alt });
    if (out.length >= 8) break;
  }
  return out;
}

// ---------- 3. één product ----------

function h1Of(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  return m ? decode(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')) : '';
}

function productFromLd(lds, productId) {
  for (const ld of lds) {
    if (ld['@type'] === 'Product' && String(ld.productID) === productId) return ld;
    for (const v of ld.hasVariant || []) {
      if (String(v.productID) === productId) return v;
    }
  }
  // Geen exacte match: dan het groepsniveau, dat heeft vaak dezelfde tekst.
  return lds.find(l => l['@type'] === 'ProductGroup' || l['@type'] === 'Product') || null;
}

/** Alle varianten van de groep: levert EANs op van producten die we los niet bezoeken. */
function siblingsFromLd(lds) {
  const out = [];
  for (const ld of lds) {
    for (const v of ld.hasVariant || []) {
      if (!v.gtin13) continue;
      out.push({
        ean: String(v.gtin13),
        productId: String(v.productID || ''),
        name: decode(v.name || ''),
        description: v.description || '',
        image: (v.image && v.image.url) || '',
        price: v.offers && (v.offers.price || (v.offers.lowPrice)),
      });
    }
  }
  return out;
}

async function scrapeProduct(productId, slug) {
  const url = `https://www.bol.com/nl/nl/p/${slug || 'x'}/${productId}/`;
  const html = await fetchPage(url);
  const lds = parseLd(html);
  const p = productFromLd(lds, productId) || {};
  const offers = p.offers || {};
  return {
    productId,
    url,
    ean: p.gtin13 ? String(p.gtin13) : '',
    name: decode(p.name || '') || h1Of(html),
    h1: h1Of(html),
    description: p.description || '',
    brand: (p.brand && (p.brand.name || p.brand)) || '',
    price: offers.price || offers.lowPrice || null,
    images: await extractGallery(html),
    siblings: siblingsFromLd(lds),
    scrapedAt: new Date().toISOString(),
  };
}

// ---------- 4. draaien ----------

const done = new Set();
if (fs.existsSync(OUT)) {
  for (const line of fs.readFileSync(OUT, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { done.add(JSON.parse(line).productId); } catch { /* halve regel */ }
  }
  console.log(`Al gescrapet: ${done.size} producten (die slaan we over).\n`);
}

console.log('Product-ids verzamelen van de verkooppagina...');
const ids = await collectProductIds();
const todo = [...ids.entries()].filter(([id]) => !done.has(id)).slice(0, LIMIT);
console.log(`\nGevonden: ${ids.size} producten. Nog te doen: ${todo.length}.\n`);

const stream = fs.createWriteStream(OUT, { flags: 'a' });
let ok = 0, fail = 0, n = 0;
const failures = [];

async function worker(queue) {
  for (;;) {
    const item = queue.shift();
    if (!item) return;
    const [id, slug] = item;
    n++;
    try {
      const p = await scrapeProduct(id, slug);
      stream.write(JSON.stringify(p) + '\n');
      ok++;
      const flag = p.ean ? '' : '  (GEEN EAN)';
      console.log(`  ${String(n).padStart(3)}/${todo.length}  ${p.images.length} foto's  ${(p.ean || '-').padEnd(14)} ${p.name.slice(0, 60)}${flag}`);
    } catch (e) {
      fail++; failures.push({ id, error: e.message });
      console.error(`  ${String(n).padStart(3)}/${todo.length}  MISLUKT ${id}: ${e.message}`);
    }
    await sleep(250 + Math.random() * 350);
  }
}

const queue = [...todo];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));
stream.end();

console.log(`\nKlaar: ${ok} gescrapet, ${fail} mislukt. Totaal in ${path.relative(ROOT, OUT)}: ${done.size + ok}`);
if (failures.length) {
  console.log('Mislukt:');
  for (const f of failures) console.log(`  ${f.id}  ${f.error}`);
  console.log('Draai het script nog eens; het pakt alleen de ontbrekende op.');
}
