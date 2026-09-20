// Zet de winkelprijzen gelijk aan die op bol.
//
//   node scripts/sync-prijzen.mjs            # dry run
//   node scripts/sync-prijzen.mjs --apply
//   node scripts/sync-prijzen.mjs --herstel --apply   # oude prijzen terug
//
// De oude prijzen komen in data/prijzen-voor-sync.json, zodat terugdraaien
// altijd kan.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woo, getAll, assertCredentials } from './woo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOG = path.join(ROOT, 'data', 'prijzen-voor-sync.json');
const SCRAPE = path.join(ROOT, 'data', 'bol-scrape.jsonl');

assertCredentials();
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const HERSTEL = args.includes('--herstel');

const decode = s => (s || '').replace(/&amp;/g, '&');
const euro = n => '€' + Number(n).toFixed(2);

// ---------- terugdraaien ----------

if (HERSTEL) {
  if (!fs.existsSync(LOG)) {
    console.error(`\n  ${path.relative(ROOT, LOG)} bestaat niet; er is niets om terug te zetten.\n`);
    process.exit(1);
  }
  const eerder = JSON.parse(fs.readFileSync(LOG, 'utf8'));
  console.log(APPLY ? '>> TERUGZETTEN <<\n' : '>> DRY RUN <<\n');
  for (const e of eerder) {
    console.log(`  ${e.sku}  ${euro(e.nu)} -> ${euro(e.was)}  ${e.naam.slice(0, 45)}`);
    if (APPLY) await woo.put(`products/${e.id}`, { regular_price: String(Number(e.was).toFixed(2)) });
  }
  console.log(`\n${APPLY ? 'Teruggezet' : 'Zou terugzetten'}: ${eerder.length} prijzen.`);
  if (APPLY) fs.rmSync(LOG, { force: true });
  process.exit(0);
}

// ---------- bol-prijzen ----------

const bolPrijs = new Map();
for (const line of fs.readFileSync(SCRAPE, 'utf8').trim().split('\n')) {
  if (!line.trim()) continue;
  const r = JSON.parse(line);
  for (const s of r.siblings || []) if (s.ean && s.price && !bolPrijs.has(s.ean)) bolPrijs.set(s.ean, Number(s.price));
  if (r.ean && r.price) bolPrijs.set(r.ean, Number(r.price));
}

const producten = await getAll('products', { status: 'any' });

const afwijkend = [];
for (const p of producten) {
  const bol = bolPrijs.get(String(p.sku));
  if (!bol) continue;
  const shop = Number(p.regular_price);
  if (!shop || Math.abs(shop - bol) <= 0.01) continue;
  afwijkend.push({ p, shop, bol, verschil: bol - shop });
}

console.log(APPLY ? '>> PRIJZEN GELIJKTREKKEN <<\n' : '>> DRY RUN – er wordt niets gewijzigd (gebruik --apply) <<\n');
console.log(`Producten met een bol-prijs: ${[...bolPrijs.keys()].filter(e => producten.some(p => String(p.sku) === e)).length}`);
console.log(`Prijs wijkt af:              ${afwijkend.length}\n`);

const omlaag = afwijkend.filter(a => a.verschil < 0).sort((a, b) => a.verschil - b.verschil);
const omhoog = afwijkend.filter(a => a.verschil > 0).sort((a, b) => b.verschil - a.verschil);

if (omlaag.length) {
  console.log(`--- ${omlaag.length} gaan OMLAAG (shop was duurder dan bol) ---`);
  for (const a of omlaag) {
    const sale = a.p.sale_price ? `  LET OP: staat in de aanbieding voor ${euro(a.p.sale_price)}` : '';
    console.log(`  ${String(a.p.sku).padEnd(14)} ${euro(a.shop)} -> ${euro(a.bol)}   ${euro(a.verschil)}  ${decode(a.p.name).slice(0, 42)}${sale}`);
  }
}
if (omhoog.length) {
  console.log(`\n--- ${omhoog.length} gaan OMHOOG (shop was goedkoper dan bol) ---`);
  for (const a of omhoog) {
    const sale = a.p.sale_price ? `  LET OP: staat in de aanbieding voor ${euro(a.p.sale_price)}` : '';
    console.log(`  ${String(a.p.sku).padEnd(14)} ${euro(a.shop)} -> ${euro(a.bol)}   +${euro(a.verschil)}  ${decode(a.p.name).slice(0, 42)}${sale}`);
  }
}

if (!APPLY) {
  console.log('\nDraai met --apply om de prijzen gelijk te trekken.');
  process.exit(0);
}

const gewijzigd = [];
let fout = 0;
for (const a of afwijkend) {
  try {
    await woo.put(`products/${a.p.id}`, { regular_price: String(a.bol.toFixed(2)) });
    gewijzigd.push({ id: a.p.id, sku: a.p.sku, naam: decode(a.p.name), was: a.shop, nu: a.bol });
  } catch (e) {
    fout++;
    console.error(`  MISLUKT ${a.p.sku}: ${e.message}`);
  }
}

fs.mkdirSync(path.dirname(LOG), { recursive: true });
fs.writeFileSync(LOG, JSON.stringify(gewijzigd, null, 2));
console.log(`\nKlaar: ${gewijzigd.length} prijzen gelijkgetrokken, ${fout} mislukt.`);
console.log(`Oude prijzen bewaard in ${path.relative(ROOT, LOG)} — terugdraaien met --herstel --apply.`);
