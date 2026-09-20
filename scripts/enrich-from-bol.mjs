// Zet de beschrijvingen en foto's van bol.com in WooCommerce.
// Koppelt op EAN: de SKU in de webshop is dezelfde EAN als op bol.
//
//   node scripts/bol-scrape.mjs                        # eerst scrapen
//   node scripts/enrich-from-bol.mjs                   # dry run
//   node scripts/enrich-from-bol.mjs --apply --limit 5 # kleine batch
//   node scripts/enrich-from-bol.mjs --apply           # alles
//
// Opties:
//   --force-images   ook foto's zetten bij producten die er al hebben
//   --names          neem ook de productnaam van bol over
//   --max-images N   maximaal N foto's per product (standaard 6)
//   --text-only      alleen teksten, geen foto's

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woo, getAll, assertCredentials } from './woo.mjs';
import { decode } from './bol.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRAPE = path.join(ROOT, 'data', 'bol-scrape.jsonl');

assertCredentials();

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const FORCE_IMAGES = args.includes('--force-images');
const TAKE_NAMES = args.includes('--names');
const TEXT_ONLY = args.includes('--text-only');
const numArg = (flag, dflt) => {
  const i = args.indexOf(flag);
  return i >= 0 ? Number(args[i + 1]) : dflt;
};
const LIMIT = numArg('--limit', Infinity);
const showIdx = args.indexOf('--show');
const SHOW = showIdx >= 0 ? String(args[showIdx + 1]) : null;
const MAX_IMAGES = numArg('--max-images', 6);

// ---------- de gescrapete data ----------

if (!fs.existsSync(SCRAPE)) {
  console.error(`\n  ${path.relative(ROOT, SCRAPE)} bestaat niet. Draai eerst:  node scripts/bol-scrape.mjs\n`);
  process.exit(1);
}

const scraped = fs.readFileSync(SCRAPE, 'utf8').trim().split('\n')
  .filter(Boolean).map(l => JSON.parse(l));

/** EAN -> productgegevens. Volledige pagina's winnen van variant-gegevens. */
const byEan = new Map();
for (const r of scraped) {          // eerst de varianten als vangnet
  for (const s of r.siblings || []) {
    if (s.ean && !byEan.has(s.ean)) {
      byEan.set(s.ean, {
        ean: s.ean, name: s.name, description: s.description,
        images: s.image ? [{ src: s.image, alt: s.name }] : [],
        price: s.price, partial: true,
      });
    }
  }
}
for (const r of scraped) {          // daarna de echte productpagina's
  if (r.ean) byEan.set(r.ean, { ...r, partial: false });
}

// ---------- tekst opschonen ----------

/**
 * In een deel van de bol-teksten staan aantekeningen die voor de verkoper
 * bedoeld waren ("zou ik op Bol.com niet schrijven dat...", "Kenmerken
 * (Bol.com bulletpoints)"). Die mogen niet in de webshop terechtkomen.
 */
const SELLER_NOTE = [
  /bol\.com/i,
  /\bzou ik\b/i,
  /je leverancier|jouw leverancier/i,
  /je aanbod|jouw aanbod|productvermelding|productomschrijving/i,
  /bulletpoints/i,
  /\bbol\s+(adviseert|geeft aan|raadt)\b/i,
];

/** Knipt de html in blokken op het bovenste niveau (<p>, <ul>, <h3>, ...). */
function blocks(html) {
  const out = [];
  const re = /<(p|ul|ol|h[1-6]|strong|div|table)\b[^>]*>[\s\S]*?<\/\1>|<br\s*\/?>/gi;
  let last = 0, m;
  while ((m = re.exec(html))) {
    if (m.index > last) {
      const loose = html.slice(last, m.index).trim();
      if (loose) out.push(loose);
    }
    out.push(m[0]);
    last = re.lastIndex;
  }
  const tail = html.slice(last).trim();
  if (tail) out.push(tail);
  return out;
}

const textOf = h => decode(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/**
 * Bol zet de SEO-titel als kale tekst vóór de eerste <p>. Die halen we eruit,
 * want de productnaam staat in de webshop al boven de beschrijving.
 * Geeft ook terug wat er is weggegooid, zodat de dry run het kan laten zien.
 */
function cleanDescription(html) {
  if (!html) return { html: '', dropped: [] };
  let src = html.trim();
  const firstTag = src.indexOf('<');
  if (firstTag > 0) {
    const lead = decode(src.slice(0, firstTag)).trim();
    // Alleen weghalen als het echt de titel is en niet een echte zin.
    if (lead.length < 200 && !/[.!?]$/.test(lead)) src = src.slice(firstTag);
  }

  const kept = [], dropped = [];
  for (const b of blocks(src)) {
    // "Specificaties (veilig voor Bol.com)" -> de kop blijft, de opmerking gaat eruit.
    const trimmed = b.replace(/\s*\([^()]*bol\.com[^()]*\)/gi, '');
    const text = textOf(trimmed);
    if (text && SELLER_NOTE.some(r => r.test(text))) dropped.push(text);
    else kept.push(trimmed);
  }

  const out = kept.join('\n').replace(/[ \t]+/g, ' ').replace(/>\s+</g, '>\n<').trim();
  return { html: out, dropped };
}

/** Korte samenvatting: de eerste alinea, afgekapt op een zinseinde. */
function shortDescription(html) {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const text = decode((m ? m[1] : html).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  if (text.length <= 300) return text;
  const cut = text.slice(0, 300);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  return (stop > 120 ? cut.slice(0, stop + 1) : cut.trimEnd() + '…');
}

function buildImages(rec) {
  return (rec.images || []).slice(0, MAX_IMAGES).map((img, i) => ({
    src: img.src,
    alt: decode(img.alt || rec.name || ''),
    position: i,
  }));
}

// ---------- één product bekijken ----------

if (SHOW) {
  const rec = byEan.get(SHOW);
  if (!rec) { console.error(`EAN ${SHOW} niet gevonden in de scrape.`); process.exit(1); }
  const { html, dropped } = cleanDescription(rec.description);
  console.log(`NAAM:  ${rec.name}\nEAN:   ${rec.ean}\nPRIJS: ${rec.price}\n`);
  console.log(`FOTO'S (${(rec.images || []).length}):`);
  for (const i of buildImages(rec)) console.log(`  ${i.src}\n      alt: ${i.alt}`);
  console.log(`\nKORTE OMSCHRIJVING:\n  ${shortDescription(html)}`);
  console.log(`\nBESCHRIJVING (${html.length} tekens):\n${html}`);
  if (dropped.length) console.log(`\nWEGGELATEN (verkopers-aantekeningen):\n  - ${dropped.join('\n  - ')}`);
  process.exit(0);
}

// ---------- vergelijken met de webshop ----------

const products = await getAll('products', { status: 'any' });
const shopByEan = new Map(products.filter(p => p.sku).map(p => [String(p.sku), p]));

const matched = [];
const noBolData = [];
for (const [ean, p] of shopByEan) {
  const rec = byEan.get(ean);
  if (rec && rec.description) matched.push({ p, rec });
  else noBolData.push(p);
}
const notInShop = [...byEan.values()].filter(r => !shopByEan.has(r.ean));

console.log(APPLY ? '>> BIJWERKEN <<\n' : '>> DRY RUN – er wordt niets gewijzigd (gebruik --apply) <<\n');
console.log(`Gescrapete bol-pagina's:        ${scraped.length}`);
console.log(`Unieke EANs van bol:            ${byEan.size}`);
console.log(`Producten in de webshop:        ${products.length}`);
console.log(`  koppelen op EAN:              ${matched.length}`);
console.log(`  geen bol-gegevens gevonden:   ${noBolData.length}`);
console.log(`Op bol maar niet in de webshop: ${notInShop.length}\n`);

const todo = matched.slice(0, LIMIT);
let updated = 0, failed = 0, skippedImages = 0;
const problems = [];
const removedNotes = [];

for (const { p, rec } of todo) {
  const { html: description, dropped } = cleanDescription(rec.description);
  if (dropped.length) removedNotes.push({ sku: p.sku, name: p.name, dropped });
  const payload = { description, short_description: shortDescription(description) };
  if (TAKE_NAMES && rec.name) payload.name = rec.name;

  const hasImages = (p.images || []).length > 0;
  const images = TEXT_ONLY ? [] : buildImages(rec);
  if (images.length && (!hasImages || FORCE_IMAGES)) payload.images = images;
  else if (hasImages && !FORCE_IMAGES) skippedImages++;

  if (!APPLY) {
    console.log(`  ${p.sku.padEnd(14)} ${String(description.length).padStart(5)} tekens  ${String(payload.images ? payload.images.length : 0)} foto's  ${p.name.slice(0, 50)}${rec.partial ? '  (alleen variantgegevens)' : ''}`);
    continue;
  }

  try {
    await woo.put(`products/${p.id}`, payload);
    updated++;
    console.log(`  bijgewerkt  ${p.sku.padEnd(14)} ${String(payload.images ? payload.images.length : 0)} foto's  ${p.name.slice(0, 50)}`);
  } catch (e) {
    failed++;
    problems.push({ sku: p.sku, name: p.name, error: e.message });
    console.error(`  MISLUKT     ${p.sku}  ${p.name.slice(0, 40)} – ${e.message}`);
  }
}

console.log('');
if (APPLY) {
  console.log(`Klaar: ${updated} bijgewerkt, ${failed} mislukt.`);
  if (skippedImages) console.log(`${skippedImages} producten hadden al foto's; die zijn niet aangeraakt (--force-images overschrijft ze).`);
  if (problems.length) {
    console.log('\nMislukt:');
    for (const q of problems) console.log(`  ${q.sku}  ${q.name.slice(0, 40)} – ${q.error}`);
  }
} else {
  console.log(`${todo.length} producten zouden worden bijgewerkt. Draai met --apply.`);
}

if (removedNotes.length) {
  console.log(`\n=== ${removedNotes.length} producten hadden verkopers-aantekeningen in de bol-tekst (weggelaten) ===`);
  console.log('Let op: deze stukken staan nu wel gewoon op bol.com zichtbaar voor klanten.\n');
  for (const r of removedNotes) {
    console.log(`  ${r.sku}  ${r.name.slice(0, 45)}`);
    for (const d of r.dropped) console.log(`      - ${d.slice(0, 150)}${d.length > 150 ? '...' : ''}`);
  }
}

if (noBolData.length) {
  console.log(`\n=== ${noBolData.length} producten in de webshop zonder bol-gegevens ===`);
  for (const p of noBolData.slice(0, 40)) console.log(`  ${String(p.sku).padEnd(14)} ${p.name.slice(0, 60)}`);
  if (noBolData.length > 40) console.log(`  ... en nog ${noBolData.length - 40}`);
}
