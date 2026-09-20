// Toont wat de import zou doen, zonder WooCommerce aan te raken.
// Gebruik:  node scripts/preview-import.mjs [pad/naar.xlsx]

import { readSheet } from './xlsx.mjs';
import { categorize } from './categorize.mjs';
import { flatten } from './catalog-tree.mjs';

export const DEFAULT_XLSX = '/Users/miladazizi/Desktop/jouw_aanbod_20260919_052312bolcom.xlsx';

export function loadProducts(file) {
  file = file || DEFAULT_XLSX;
  const rows = readSheet(file).filter(r => r.rowNumber >= 4);
  const withTitle = [];
  const eanOnly = [];
  for (const { rowNumber, cells } of rows) {
    const ean = cells.B;
    if (!ean) continue;
    const entry = {
      row: rowNumber,
      ean,
      title: (cells.J || '').trim(),
      price: parseFloat(cells.E || '0'),
      stock: Math.round(parseFloat(cells.D || '0')),
      forSale: cells.I === 'Ja',
    };
    (entry.title ? withTitle : eanOnly).push(entry);
  }
  return { withTitle, eanOnly };
}

export function plan(products) {
  return products.map(p => ({ ...p, ...categorize(p) }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Alleen als dit script zelf wordt aangeroepen mag argv het bestand bepalen.
  const { withTitle, eanOnly } = loadProducts(process.argv.find(a => a.endsWith('.xlsx')));
  const planned = plan(withTitle);
  const known = new Set(flatten().map(c => c.slug));

  const skipped = planned.filter(p => p.skip);
  const drafts = planned.filter(p => !p.skip && p.draft);
  const live = planned.filter(p => !p.skip && !p.draft);

  console.log('=== BRON ===');
  console.log(`Excel-regels met EAN:        ${withTitle.length + eanOnly.length}`);
  console.log(`  met titel (importeerbaar): ${withTitle.length}`);
  console.log(`  alleen EAN (geen naam):    ${eanOnly.length}  -> niet te importeren`);
  console.log('');
  console.log('=== IMPORTPLAN ===');
  console.log(`Importeren:                     ${live.length + drafts.length}`);
  console.log(`  waarvan met een vage naam:    ${drafts.length}  (komen ook live)`);
  console.log(`Overslaan (buiten assortiment): ${skipped.length}`);
  console.log('');

  const bad = planned.flatMap(p => p.slugs.filter(s => !known.has(s)));
  console.log('Onbekende categorie-slugs:', bad.length ? [...new Set(bad)] : 'geen');
  console.log('');

  const count = new Map();
  for (const p of planned) if (!p.skip) for (const s of p.slugs) count.set(s, (count.get(s) || 0) + 1);
  console.log('=== PRODUCTEN PER CATEGORIE ===');
  for (const c of flatten()) {
    const n = count.get(c.slug) || 0;
    const indent = c.parentSlug ? '    ' : '';
    const flag = n === 0 ? '  <- leeg' : '';
    console.log(`${indent}${String(n).padStart(4)}  ${c.name}${flag}`);
  }
  console.log('');
  console.log('=== OVERGESLAGEN ===');
  for (const p of skipped) console.log(`  - ${p.title.slice(0, 80)}`);
  console.log('');
  console.log(`=== VAGE NAMEN, KOMEN WEL LIVE (${drafts.length}) ===`);
  for (const p of drafts) console.log(`  - €${p.price} | ${p.title.slice(0, 70)}`);
}
