// Importeert de producten uit de bol.com-export in WooCommerce.
// Idempotent: bestaat de SKU (EAN) al, dan wordt het product bijgewerkt.
//
//   node scripts/import-products.mjs                     # dry run
//   node scripts/import-products.mjs --apply             # importeren
//   node scripts/import-products.mjs --apply --limit 10  # eerst een kleine batch

import { woo, getAll, assertCredentials } from './woo.mjs';
import { loadProducts, plan } from './preview-import.mjs';

assertCredentials();

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
// Producten met een vage titel worden standaard gewoon gepubliceerd. Met
// --draft-vague komen ze als concept in WooCommerce om later af te maken.
const DRAFT_VAGUE = args.includes('--draft-vague');
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;
const XLSX = args.find(a => a.endsWith('.xlsx'));

/**
 * De bol.com-titels zijn SEO-titels: productnaam, dan kenmerken achter
 * streepjes. Splitsen gebeurt alleen op een streepje mét spaties eromheen,
 * zodat "2-delige" en "18-21 cm" heel blijven.
 */
function splitTitle(title) {
  const parts = title.split(/\s+[–—-]\s+|\s*\|\s*/).map(s => s.trim()).filter(Boolean);
  let name = parts.shift() || title;
  // Titels die met het merk beginnen ("S4H - Orgonite ...") leveren een leeg
  // eerste segment op; plak dan het volgende segment eraan vast.
  while (parts.length && (name.length < 12 || /^s4h[®\s.-]*$/i.test(name))) {
    name = `${name} ${parts.shift()}`.replace(/\s+/g, ' ').trim();
  }
  if (name.length > 80) name = name.slice(0, 77).trimEnd() + '…';
  return { name, features: parts };
}

function buildDescription(title, features) {
  const intro = `<p>${title}</p>`;
  if (!features.length) return intro;
  return `${intro}\n<ul>\n${features.map(f => `  <li>${f}</li>`).join('\n')}\n</ul>`;
}

const { withTitle, eanOnly } = loadProducts(XLSX);
const planned = plan(withTitle).filter(p => !p.skip).slice(0, LIMIT);

const categories = await getAll('products/categories', { hide_empty: false });
const catBySlug = new Map(categories.map(c => [c.slug, c.id]));

const missing = [...new Set(planned.flatMap(p => p.slugs).filter(s => !catBySlug.has(s)))];
if (missing.length) {
  console.error('\n  Deze categorieën bestaan nog niet in WooCommerce:');
  for (const s of missing) console.error('   - ' + s);
  console.error('\n  Draai eerst:  node scripts/sync-categories.mjs --apply\n');
  process.exit(1);
}

const existing = await getAll('products', { status: 'any' });
const bySku = new Map(existing.filter(p => p.sku).map(p => [p.sku, p]));

console.log(APPLY ? '>> IMPORTEREN <<\n' : '>> DRY RUN – er wordt niets aangemaakt (gebruik --apply) <<\n');
console.log(`Excel-regels zonder naam die niet mee kunnen: ${eanOnly.length}`);
console.log(`Te verwerken producten: ${planned.length}`);
console.log(`Al aanwezig op SKU:     ${planned.filter(p => bySku.has(p.ean)).length}`);
console.log(`Vage titels:            ${planned.filter(p => p.draft).length}  -> ${DRAFT_VAGUE ? 'als concept' : 'gewoon publiceren'}\n`);

let created = 0, updated = 0, failed = 0;

for (const p of planned) {
  const { name, features } = splitTitle(p.title);
  const payload = {
    name,
    type: 'simple',
    status: DRAFT_VAGUE && p.draft ? 'draft' : 'publish',
    catalog_visibility: 'visible',
    sku: p.ean,
    regular_price: String(p.price.toFixed(2)),
    description: buildDescription(p.title, features),
    short_description: features.slice(0, 4).map(f => f).join(' · '),
    manage_stock: true,
    stock_quantity: p.stock,
    stock_status: p.stock > 0 ? 'instock' : 'outofstock',
    backorders: 'no',
    categories: p.slugs.map(s => ({ id: catBySlug.get(s) })),
    meta_data: [{ key: '_ean', value: p.ean }],
  };

  const cur = bySku.get(p.ean);
  const label = `${DRAFT_VAGUE && p.draft ? '[concept] ' : ''}${p.draft ? '(vage titel) ' : ''}${name}`;

  if (!APPLY) {
    console.log(`  ${cur ? 'bijwerken ' : 'aanmaken  '} ${String(p.ean).padEnd(15)} €${String(p.price).padEnd(7)} v:${String(p.stock).padEnd(4)} ${label}`);
    console.log(`${' '.repeat(14)}categorieën: ${p.slugs.join(', ')}`);
    continue;
  }

  try {
    if (cur) {
      await woo.put(`products/${cur.id}`, payload);
      console.log(`  bijgewerkt: ${label}`);
      updated++;
    } else {
      const res = await woo.post('products', payload);
      console.log(`  aangemaakt: ${label} (id ${res.id})`);
      created++;
    }
  } catch (e) {
    console.error(`  MISLUKT: ${p.ean} ${name} – ${e.message}`);
    failed++;
  }
}

if (APPLY) {
  console.log(`\nKlaar: ${created} aangemaakt, ${updated} bijgewerkt, ${failed} mislukt.`);
  if (DRAFT_VAGUE) {
    console.log('Let op: producten met een vage titel staan als CONCEPT in WooCommerce en zijn niet zichtbaar in de shop.');
  } else {
    const vague = planned.filter(p => p.draft);
    if (vague.length) {
      console.log(`\nLet op: ${vague.length} producten hebben nog een vage naam en staan wel live:`);
      for (const p of vague) console.log(`  ${p.ean}  ${splitTitle(p.title).name}`);
    }
  }
} else {
  console.log('\nNiets gewijzigd. Draai met --apply om te importeren.');
}
