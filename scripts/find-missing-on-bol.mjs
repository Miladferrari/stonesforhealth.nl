// Zoekt op bol naar de producten die in de webshop nog geen foto hebben.
// De verkooppagina toont alleen actieve listings; zoeken vindt er soms meer.
//
//   node scripts/find-missing-on-bol.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAll, assertCredentials } from './woo.mjs';
import { fetchPage, parseLd, decode, sleep } from './bol.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assertCredentials();

// Wat we al hebben, hoeven we niet nog eens te zoeken.
const bekend = new Set();
const scrape = path.join(ROOT, 'data', 'bol-scrape.jsonl');
if (fs.existsSync(scrape)) {
  for (const line of fs.readFileSync(scrape, 'utf8').trim().split('\n')) {
    if (!line.trim()) continue;
    const r = JSON.parse(line);
    if (r.ean) bekend.add(r.ean);
    for (const s of r.siblings || []) if (s.ean) bekend.add(s.ean);
  }
}

const producten = await getAll('products', { status: 'any' });
const zonder = producten.filter(p => !p.images.length || !bekend.has(String(p.sku)));

console.log(`Producten zonder bol-gegevens of zonder foto: ${zonder.length}\n`);

/** Zoekterm: de productnaam zonder merk en zonder maten. */
function zoekterm(naam) {
  return decode(naam)
    .replace(/^s?s4h[®\s.-]*/i, '')
    .split(/\s+[–—|]\s+/)[0]
    .replace(/\s+/g, ' ')
    .trim();
}

const gevonden = [];
const nietGevonden = [];

for (const p of zonder) {
  const term = zoekterm(p.name);
  if (!term || term.length < 4) { nietGevonden.push({ p, reden: 'naam te vaag om op te zoeken' }); continue; }

  let kandidaten = [];
  try {
    const html = await fetchPage(`https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent('S4H ' + term)}`);
    kandidaten = [...new Set([...html.matchAll(/\/nl\/nl\/p\/[a-z0-9-]+\/(\d{10,})\//g)].map(m => m[1]))].slice(0, 6);
  } catch (e) {
    nietGevonden.push({ p, reden: `zoeken mislukt: ${e.message}` });
    continue;
  }

  let match = null;
  for (const id of kandidaten) {
    try {
      const html = await fetchPage(`https://www.bol.com/nl/nl/p/x/${id}/`);
      for (const ld of parseLd(html)) {
        const alle = [ld, ...(ld.hasVariant || [])];
        for (const v of alle) {
          if (v.gtin13 && String(v.gtin13) === String(p.sku)) { match = { id, naam: decode(v.name || '') }; break; }
        }
        if (match) break;
      }
    } catch { /* volgende kandidaat */ }
    if (match) break;
    await sleep(300);
  }

  if (match) {
    gevonden.push({ p, match });
    console.log(`  GEVONDEN  ${p.sku}  ${p.name.slice(0, 45)}`);
    console.log(`            -> https://www.bol.com/nl/nl/p/x/${match.id}/`);
  } else {
    nietGevonden.push({ p, reden: `geen bol-listing met EAN ${p.sku}`, kandidaten: kandidaten.length });
    console.log(`  niet      ${p.sku}  ${p.name.slice(0, 45)}  (${kandidaten.length} zoekresultaten, geen EAN-match)`);
  }
  await sleep(500);
}

console.log(`\n=== ${gevonden.length} alsnog gevonden op bol ===`);
for (const g of gevonden) console.log(`  ${g.p.sku}  ${g.match.id}  ${g.match.naam.slice(0, 70)}`);
if (gevonden.length) {
  fs.writeFileSync(path.join(ROOT, 'data', 'bol-extra-ids.json'),
    JSON.stringify(gevonden.map(g => ({ ean: g.p.sku, productId: g.match.id })), null, 2));
  console.log('\n  Opgeslagen in data/bol-extra-ids.json');
}
console.log(`\n=== ${nietGevonden.length} niet op bol te vinden ===`);
for (const n of nietGevonden) console.log(`  ${n.p.sku}  ${String(n.p.name).slice(0, 45).padEnd(46)} ${n.reden}`);
