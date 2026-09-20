// Repareert wat er na de bol-import nog niet SEO-proof was:
//
//   1. Placeholdernamen ("S4H Armband", "S4H Kdjaiojf") -> de naam van bol
//   2. &amp; en dubbel merk (SS4H) in productnamen
//   3. Alt-teksten langer dan 125 tekens afkappen op een woordgrens
//
//   node scripts/fix-seo.mjs            # dry run
//   node scripts/fix-seo.mjs --apply

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woo, getAll, assertCredentials } from './woo.mjs';
import { decode } from './bol.mjs';
import { hasWpCredentials, checkWpCredentials } from './wp-media.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assertCredentials();
const APPLY = process.argv.includes('--apply');

const MAX_NAAM = 70;
const MAX_ALT = 125;

// ---------- bol-namen inlezen ----------

const bolNaam = new Map();
const scrape = path.join(ROOT, 'data', 'bol-scrape.jsonl');
if (fs.existsSync(scrape)) {
  for (const line of fs.readFileSync(scrape, 'utf8').trim().split('\n')) {
    if (!line.trim()) continue;
    const r = JSON.parse(line);
    for (const s of r.siblings || []) if (s.ean && !bolNaam.has(s.ean)) bolNaam.set(s.ean, s.name);
    if (r.ean) bolNaam.set(r.ean, r.name);
  }
}

// ---------- hulpjes ----------

/** Bol-titels zijn lang: "naam – kenmerk – kenmerk". Alleen de kop houden. */
function kortAf(titel, max = MAX_NAAM) {
  const schoon = decode(titel).replace(/\s+/g, ' ').trim();
  if (schoon.length <= max) return schoon;
  const delen = schoon.split(/\s+[–—|]\s+/);
  let uit = delen.shift() || schoon;
  for (const deel of delen) {
    if (`${uit} – ${deel}`.length > max) break;
    uit = `${uit} – ${deel}`;
  }
  if (uit.length > max) {
    const cut = uit.slice(0, max);
    const spatie = cut.lastIndexOf(' ');
    uit = (spatie > 30 ? cut.slice(0, spatie) : cut).replace(/[\s,;:–-]+$/, '');
  }
  return uit;
}

/** Een naam die niets zegt: te kort, of toetsenbordgeklets. */
function isPlaceholder(naam) {
  const kaal = decode(naam).replace(/^s?s4h[®\s.-]*/i, '').trim();
  if (kaal.length < 10) return true;
  // Eén woord zonder klinkerritme is meestal een typefout ("Kdjaiojf").
  return /^[a-z]{6,}$/i.test(kaal) && !/[aeiou]{1}[a-z]*[aeiou]/i.test(kaal.slice(1));
}

function schoonNaam(naam) {
  return decode(naam).replace(/^SS4H\b/, 'S4H').replace(/\s+/g, ' ').trim();
}

function kortAlt(tekst, max = MAX_ALT) {
  const t = decode(tekst || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const spatie = cut.lastIndexOf(' ');
  return (spatie > 60 ? cut.slice(0, spatie) : cut).replace(/[\s,;:.-]+$/, '');
}

// ---------- 1 + 2: namen ----------

const producten = await getAll('products', { status: 'any' });
const naamFixes = [];

for (const p of producten) {
  const huidig = p.name;
  let nieuw = schoonNaam(huidig);
  let reden = nieuw !== decode(huidig) ? 'merk/tekens' : '';

  if (isPlaceholder(nieuw)) {
    const bol = bolNaam.get(String(p.sku));
    if (bol) { nieuw = kortAf(bol); reden = 'placeholder -> bol'; }
    else reden = reden || 'GEEN BOL-NAAM';
  }
  if (nieuw !== huidig && reden && reden !== 'GEEN BOL-NAAM') {
    naamFixes.push({ p, nieuw, reden });
  } else if (reden === 'GEEN BOL-NAAM') {
    naamFixes.push({ p, nieuw: null, reden });
  }
}

console.log(APPLY ? '>> REPAREREN <<\n' : '>> DRY RUN – niets wordt gewijzigd (gebruik --apply) <<\n');
console.log('=== 1+2. PRODUCTNAMEN ===');
const teDoen = naamFixes.filter(f => f.nieuw);
const onmogelijk = naamFixes.filter(f => !f.nieuw);
for (const f of teDoen) {
  console.log(`  ${f.p.sku}  [${f.reden}]`);
  console.log(`      was: ${f.p.name}`);
  console.log(`      nu : ${f.nieuw}`);
}
if (onmogelijk.length) {
  console.log(`\n  ${onmogelijk.length} placeholdernamen zonder bol-gegevens (handmatig):`);
  for (const f of onmogelijk) console.log(`      ${f.p.sku}  "${f.p.name}"`);
}

let naamOk = 0, naamFout = 0;
if (APPLY) {
  for (const f of teDoen) {
    try { await woo.put(`products/${f.p.id}`, { name: f.nieuw }); naamOk++; }
    catch (e) { naamFout++; console.error(`  MISLUKT ${f.p.sku}: ${e.message}`); }
  }
}

// ---------- 3: alt-teksten ----------

console.log('\n=== 3. ALT-TEKSTEN ===');
const teLang = [];
for (const p of producten) {
  for (const img of p.images || []) {
    const alt = decode(img.alt || '');
    if (alt.length > MAX_ALT) teLang.push({ p, img, alt, nieuw: kortAlt(alt) });
  }
}
console.log(`  ${teLang.length} alt-teksten langer dan ${MAX_ALT} tekens`);
for (const t of teLang.slice(0, 5)) {
  console.log(`      ${t.alt.length} -> ${t.nieuw.length}  ${t.nieuw.slice(0, 80)}…`);
}

let altOk = 0, altFout = 0;
if (APPLY && teLang.length) {
  if (!hasWpCredentials()) {
    console.error('\n  Alt-teksten aanpassen vraagt WP_USER en WP_APP_PASSWORD in .env.local.');
  } else {
    await checkWpCredentials();
    const base = (process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '').replace(/\/wp-json\/wc\/v3\/?$/, '').replace(/\/$/, '');
    const auth = 'Basic ' + Buffer.from(`${process.env.WP_USER}:${(process.env.WP_APP_PASSWORD || '').replace(/\s+/g, '')}`).toString('base64');
    for (const t of teLang) {
      try {
        const res = await fetch(`${base}/wp-json/wp/v2/media/${t.img.id}`, {
          method: 'POST',
          headers: { Authorization: auth, 'Content-Type': 'application/json' },
          body: JSON.stringify({ alt_text: t.nieuw }),
        });
        if (!res.ok) throw new Error(`${res.status}`);
        altOk++;
      } catch (e) { altFout++; console.error(`  MISLUKT media ${t.img.id}: ${e.message}`); }
    }
  }
}

console.log('');
if (APPLY) {
  console.log(`Klaar: ${naamOk} namen aangepast (${naamFout} mislukt), ${altOk} alt-teksten ingekort (${altFout} mislukt).`);
} else {
  console.log(`${teDoen.length} namen en ${teLang.length} alt-teksten zouden worden aangepast. Draai met --apply.`);
}
