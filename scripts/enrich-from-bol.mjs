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
//   --sideload       foto's door WooCommerce laten ophalen (bestandsnaam
//                    wordt dan 1200x1200.jpg i.p.v. een nette naam)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woo, getAll, assertCredentials } from './woo.mjs';
import { decode } from './bol.mjs';
import { hasWpCredentials, checkWpCredentials, uploadImage, deleteMedia, slugify } from './wp-media.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRAPE = path.join(ROOT, 'data', 'bol-scrape.jsonl');

assertCredentials();

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const FORCE_IMAGES = args.includes('--force-images');
const TAKE_NAMES = args.includes('--names');
const TEXT_ONLY = args.includes('--text-only');
const SIDELOAD = args.includes('--sideload');
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
  // Resten van het schrijfproces die op bol zijn blijven staan.
  /chatgpt/i,
  /\bproducttitel\b/i,
  /\bhier komt\b/i,
  /seo[- ]?titel/i,
  /seo[- ]?zoekwoorden|zoekwoorden:|relevante zoekwoorden/i,
  /meta[- ]?(beschrijving|description)/i,
  /prestashop|shopify|woocommerce|\bbing\b/i,
  /eerste circa \d+ tekens|±\s*\d+\s*tekens/i,
  /output the content|write about the product|weet niet of dit/i,
  // Tekst die van een andere aanbieder is overgenomen.
  /ruben robijn/i,
];

// Onder deze lengte is er na het opschonen te weinig over om te publiceren.
const MIN_DESC = 150;

const isHeading = b => /^<(h[1-6]|strong)\b/i.test(b.trim());
const isList = b => /^<(ul|ol)\b/i.test(b.trim());
const normalize = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

/**
 * Is dit blok een herhaling van de productnaam? Bol verwoordt de titel in de
 * tekst vaak net anders dan in de productnaam, dus kijken we naar hoeveel
 * woorden uit de naam erin terugkomen.
 */
function titleOverlap(text, name) {
  const words = decode(name).toLowerCase().replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/).filter(w => w.length >= 3 && !/^s?s4h$/.test(w));
  if (!words.length) return 0;
  const lower = text.toLowerCase();
  return words.filter(w => lower.includes(w)).length / words.length;
}

/**
 * Zoekt het afsluitende tag dat bij het openende tag op `from` hoort.
 * Telt de diepte mee, want bol nest lijsten in lijsten.
 */
function findClose(html, from, tag) {
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = from;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return re.lastIndex;
  }
  return html.length;   // niet netjes gesloten: de rest hoort erbij
}

/** Knipt de html in blokken op het bovenste niveau (<p>, <ul>, <h3>, ...). */
function blocks(html) {
  const START = /<(p|ul|ol|h[1-6]|strong|div|table)\b[^>]*>|<br\s*\/?>/i;
  const out = [];
  let rest = html;
  for (let guard = 0; rest.length && guard < 10000; guard++) {
    const m = rest.match(START);
    if (!m) { const tail = rest.trim(); if (tail) out.push(tail); break; }
    if (m.index > 0) {
      const loose = rest.slice(0, m.index).trim();
      if (loose) out.push(loose);
    }
    if (/^<br/i.test(m[0])) {
      out.push(m[0]);
      rest = rest.slice(m.index + m[0].length);
      continue;
    }
    const end = findClose(rest, m.index, m[1].toLowerCase());
    out.push(rest.slice(m.index, end));
    rest = rest.slice(end);
  }
  return out;
}

/** Controle achteraf: staat er evenveel open als dicht? */
function unbalanced(html) {
  const bad = [];
  for (const tag of ['p', 'ul', 'ol', 'li', 'strong', 'h3', 'h4']) {
    const open = (html.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (open !== close) bad.push(`${tag}: ${open}/${close}`);
  }
  return bad;
}

const textOf = h => decode(h.replace(/<[^>]+>/g, ' '))
  .replace(/\s+/g, ' ').replace(/\s+([.,!?;:])/g, '$1').trim();

/**
 * Bol zet de SEO-titel als kale tekst vóór de eerste <p>. Die halen we eruit,
 * want de productnaam staat in de webshop al boven de beschrijving.
 * Geeft ook terug wat er is weggegooid, zodat de dry run het kan laten zien.
 */
function cleanDescription(html, name = '', naam2 = '') {
  if (!html) return { html: '', dropped: [] };
  let src = html.trim();
  const firstTag = src.indexOf('<');
  if (firstTag > 0) {
    const lead = decode(src.slice(0, firstTag)).trim();
    // Alleen weghalen als het echt de titel is en niet een echte zin.
    if (lead.length < 200 && !/[.!?]$/.test(lead)) src = src.slice(firstTag);
  }

  const bs = blocks(src);
  const kept = [], dropped = [];
  const titleKey = normalize(name);

  for (let i = 0; i < bs.length; i++) {
    // "Specificaties (veilig voor Bol.com)" -> de kop blijft, de opmerking gaat eruit.
    const trimmed = bs[i].replace(/\s*\([^()]*bol\.com[^()]*\)/gi, '');
    const text = textOf(trimmed);
    if (!text) continue;

    if (SELLER_NOTE.some(r => r.test(text))) {
      dropped.push(text);
      // Een weggegooide kop ("SEO Zoekwoorden") neemt de lijst eronder mee.
      if (isHeading(trimmed) && isList(bs[i + 1] || '')) dropped.push(textOf(bs[++i]));
      continue;
    }
    // De productnaam staat in de webshop al boven de tekst. Bol begint de
    // beschrijving bijna altijd met dezelfde titel — soms als kop, soms als
    // eerste alinea, en bijna nooit exact hetzelfde verwoord.
    // Soms staat er een punt achter de titelregel; dan is het nog steeds de
    // titel en geen zin, mits de tekst exact de productnaam is.
    const zonderPunt = text.replace(/\.+$/, '').trim();
    const isExactDeNaam = normalize(zonderPunt) === titleKey
      || (naam2 && normalize(zonderPunt) === normalize(naam2));
    const eindigtAlsZin = /[.!?]$/.test(text) && !isExactDeNaam;
    const overlap = Math.max(titleOverlap(text, name), naam2 ? titleOverlap(text, naam2) : 0);
    const titelachtig = overlap >= 0.6 && !eindigtAlsZin
      && (isHeading(trimmed) || text.length < 200);
    if (titelachtig && !kept.length) continue;
    if (isHeading(trimmed) && normalize(text) === titleKey) continue;
    // Bol heeft hier en daar hetzelfde blok twee keer staan.
    if (kept.length && textOf(kept[kept.length - 1]) === text) continue;

    kept.push(trimmed);
  }

  const out = kept.join('\n').replace(/[ \t]+/g, ' ').replace(/>\s+</g, '>\n<').trim();
  return { html: out, dropped, broken: unbalanced(out) };
}

/**
 * Korte samenvatting voor de meta-description. Google toont er ongeveer 155
 * tekens van, dus we plakken alinea's aan elkaar tot we daar in de buurt zijn.
 * Specificatielijsten slaan we eerst over: "Merk: S4H" is geen samenvatting.
 */
function shortDescription(html, doel = 150, max = 300) {
  // Losse kandidaten: alinea's, en van een lijst elk item apart.
  const kandidaten = [];
  for (const b of blocks(html)) {
    if (/^<(ul|ol)\b/i.test(b.trim())) {
      for (const li of b.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
        const t = textOf(li[1]);
        if (t) kandidaten.push(t);
      }
    } else {
      const t = textOf(b);
      // Koppen zijn geen samenvatting; die horen niet in de meta-description.
      if (t && !isHeading(b)) kandidaten.push({ tekst: t });
    }
  }
  const tekstVan = k => (typeof k === 'string' ? k : k.tekst);
  // "Merk: S4H" is een specificatie, geen samenvatting. Die komen achteraan.
  const isSpec = t => /^[^:]{2,25}:/.test(t) || t.length < 40;
  const lopend = kandidaten.filter(k => !isSpec(tekstVan(k))).map(tekstVan);
  const specs = kandidaten.filter(k => isSpec(tekstVan(k))).map(tekstVan);

  let tekst = '';
  for (const deel of [...lopend, ...specs]) {
    if (tekst.length >= doel) break;
    tekst = tekst ? `${tekst} ${deel}` : deel;
  }
  tekst = tekst.replace(/\s+/g, ' ').trim();
  if (tekst.length <= max) return tekst;

  const cut = tekst.slice(0, max);
  const punt = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  if (punt > 120) return cut.slice(0, punt + 1);
  const spatie = cut.lastIndexOf(' ');
  return (spatie > 120 ? cut.slice(0, spatie) : cut).replace(/[\s,;:.-]+$/, '') + '…';
}

/** Alt-tekst afkappen op een woordgrens; zoekmachines lezen ~125 tekens. */
export function trimAlt(text, max = 125) {
  const t = decode(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space > 60 ? cut.slice(0, space) : cut).replace(/[\s,;:.-]+$/, '');
}

function buildImages(rec) {
  return (rec.images || []).slice(0, MAX_IMAGES).map((img, i) => ({
    src: img.src,
    alt: trimAlt(img.alt || rec.name || ''),
    position: i,
  }));
}

// ---------- één product bekijken ----------

if (SHOW) {
  const rec = byEan.get(SHOW);
  if (!rec) { console.error(`EAN ${SHOW} niet gevonden in de scrape.`); process.exit(1); }
  const { html, dropped } = cleanDescription(rec.description, rec.name, rec.name);
  console.log(`NAAM:  ${rec.name}\nEAN:   ${rec.ean}\nPRIJS: ${rec.price}\n`);
  console.log(`FOTO'S (${(rec.images || []).length}):`);
  for (const i of buildImages(rec)) console.log(`  ${i.src}\n      alt: ${i.alt}`);
  console.log(`\nKORTE OMSCHRIJVING:\n  ${shortDescription(html)}`);
  console.log(`\nBESCHRIJVING (${html.length} tekens):\n${html}`);
  if (dropped.length) console.log(`\nWEGGELATEN (verkopers-aantekeningen):\n  - ${dropped.join('\n  - ')}`);
  process.exit(0);
}

// ---------- foto's ----------

const UPLOAD = !TEXT_ONLY && !SIDELOAD;
if (UPLOAD && APPLY) {
  if (!hasWpCredentials()) {
    console.error(`
  Voor nette bestandsnamen is een WordPress-applicatiewachtwoord nodig.

  1. Ga naar WordPress -> Gebruikers -> Profiel -> Toepassingswachtwoorden
  2. Maak er een aan met de naam "productimport"
  3. Zet in .env.local:
       WP_USER=jouw-wp-gebruikersnaam
       WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

  Of draai met --sideload; dan halen de foto's binnen als 1200x1200.jpg.
`);
    process.exit(1);
  }
  console.log(`Ingelogd op WordPress als: ${await checkWpCredentials()}\n`);
}

/** Alleen foto's die wij eerder van bol haalden mogen weg. */
const isBolFilename = src => /\/\d+x\d+(-\d+)?\.(jpe?g|png|webp)$/i.test(src || '');

/** Zet de galerij in de mediabibliotheek met een bestandsnaam op de productnaam. */
async function uploadGallery(shopName, rec) {
  const slug = slugify(decode(shopName)) || 'product';
  const out = [];
  for (const [i, img] of buildImages(rec).entries()) {
    const ext = (img.src.match(/\.(jpe?g|png|webp)$/i) || ['.jpg'])[0];
    const media = await uploadImage(img.src, {
      filename: `${slug}-${i + 1}${ext}`,
      alt: img.alt,
      title: decode(shopName),
    });
    out.push({ id: media.id, position: i });
  }
  return out;
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
const tooShort = [];
const brokenHtml = [];

for (const { p, rec } of todo) {
  const { html: description, dropped, broken } = cleanDescription(rec.description, p.name, rec.name);
  if (dropped.length) removedNotes.push({ sku: p.sku, name: p.name, dropped });
  if (broken.length) brokenHtml.push({ sku: p.sku, name: p.name, broken });

  const payload = {};
  // Met --names komt de titel 1:1 van bol, ook bij een dunne beschrijving.
  if (TAKE_NAMES && rec.name && decode(rec.name) !== p.name) payload.name = decode(rec.name);

  // Een paar bol-pagina's hebben alleen een titel en verder geen tekst. Die
  // leveren geen samenvatting op; dan laten we staan wat er in de shop stond.
  const samenvatting = shortDescription(description);
  if (description.length >= MIN_DESC && samenvatting.length >= 40) {
    payload.description = description;
    payload.short_description = samenvatting;
  } else {
    tooShort.push({ sku: p.sku, name: p.name, len: description.length });
  }

  const hasImages = (p.images || []).length > 0;
  const wanted = TEXT_ONLY ? [] : buildImages(rec);
  const doImages = wanted.length > 0 && (!hasImages || FORCE_IMAGES);
  if (!doImages && hasImages && !FORCE_IMAGES) skippedImages++;

  if (!APPLY) {
    const txt = payload.description ? `${String(description.length).padStart(5)} tekens` : '  tekst over  ';
    console.log(`  ${p.sku.padEnd(14)} ${txt}  ${String(doImages ? wanted.length : 0)} foto's  ${p.name.slice(0, 50)}${rec.partial ? '  (alleen variantgegevens)' : ''}`);
    continue;
  }

  // Oude bol-foto's opruimen zodra de nieuwe erin staan; eigen uploads blijven.
  const stale = doImages ? (p.images || []).filter(i => isBolFilename(i.src)).map(i => i.id) : [];

  try {
    if (doImages) {
      payload.images = UPLOAD ? await uploadGallery(p.name, rec) : wanted;
    }
    if (!Object.keys(payload).length) continue;

    await woo.put(`products/${p.id}`, payload);
    updated++;
    console.log(`  bijgewerkt  ${p.sku.padEnd(14)} ${String(payload.images ? payload.images.length : 0)} foto's  ${p.name.slice(0, 50)}`);

    for (const id of stale) {
      try { await deleteMedia(id); } catch (e) { console.error(`     oude foto ${id} niet verwijderd: ${e.message}`); }
    }
  } catch (e) {
    failed++;
    problems.push({ sku: p.sku, name: p.name, error: e.message });
    console.error(`  MISLUKT     ${p.sku}  ${p.name.slice(0, 40)} – ${e.message}`);
  }
  continue;

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

if (brokenHtml.length) {
  console.log(`\n=== ${brokenHtml.length} producten met scheve html na het opschonen ===`);
  for (const b of brokenHtml) console.log(`  ${b.sku}  ${b.broken.join(', ')}  ${b.name.slice(0, 45)}`);
}

if (tooShort.length) {
  console.log(`\n=== ${tooShort.length} producten hielden te weinig bruikbare tekst over ===`);
  console.log('De bestaande beschrijving in de webshop blijft daar staan.\n');
  for (const t of tooShort) console.log(`  ${t.sku}  ${String(t.len).padStart(4)} tekens  ${t.name.slice(0, 50)}`);
}

if (noBolData.length) {
  console.log(`\n=== ${noBolData.length} producten in de webshop zonder bol-gegevens ===`);
  for (const p of noBolData.slice(0, 40)) console.log(`  ${String(p.sku).padEnd(14)} ${p.name.slice(0, 60)}`);
  if (noBolData.length > 40) console.log(`  ... en nog ${noBolData.length - 40}`);
}
