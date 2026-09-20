// Haalt producten zonder foto uit de winkeloverzichten, tot er foto's zijn.
//
//   node scripts/verberg-zonder-foto.mjs             # dry run
//   node scripts/verberg-zonder-foto.mjs --apply
//   node scripts/verberg-zonder-foto.mjs --herstel --apply
//
// Standaard worden ze verborgen (catalog_visibility = hidden): ze verdwijnen
// uit alle overzichten en uit de zoekfunctie, maar de productpagina blijft
// bestaan. Dat is belangrijk, want alle 28 staan in de sitemap; op concept
// zetten zou 28 geïndexeerde URL's een 404 geven.
//
//   --concept   zet ze wel op concept (pagina verdwijnt helemaal)
//
// Wat er is gewijzigd komt in data/verborgen-zonder-foto.json, zodat --herstel
// precies die producten terugzet en niets anders.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woo, getAll, assertCredentials } from './woo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOG = path.join(ROOT, 'data', 'verborgen-zonder-foto.json');

assertCredentials();
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const HERSTEL = args.includes('--herstel');
const CONCEPT = args.includes('--concept');

const producten = await getAll('products', { status: 'any' });

// ---------- terugzetten ----------

if (HERSTEL) {
  if (!fs.existsSync(LOG)) {
    console.error(`\n  ${path.relative(ROOT, LOG)} bestaat niet; er is niets om terug te zetten.\n`);
    process.exit(1);
  }
  const eerder = JSON.parse(fs.readFileSync(LOG, 'utf8'));
  const opId = new Map(producten.map(p => [p.id, p]));

  console.log(APPLY ? '>> TERUGZETTEN <<\n' : '>> DRY RUN <<\n');
  let terug = 0, overgeslagen = 0;
  for (const e of eerder) {
    const p = opId.get(e.id);
    if (!p) { console.log(`  weg       ${e.sku}  bestaat niet meer`); continue; }
    if (!p.images.length) {
      console.log(`  nog leeg  ${e.sku}  ${p.name.slice(0, 45)}  -> heeft nog steeds geen foto`);
      overgeslagen++;
      continue;
    }
    if (!APPLY) { console.log(`  terug     ${e.sku}  ${p.name.slice(0, 45)}`); terug++; continue; }
    await woo.put(`products/${p.id}`, { catalog_visibility: e.was.catalog_visibility, status: e.was.status });
    console.log(`  teruggezet ${e.sku}  ${p.name.slice(0, 45)}`);
    terug++;
  }
  console.log(`\n${APPLY ? 'Teruggezet' : 'Zou terugzetten'}: ${terug}. Nog zonder foto, dus overgeslagen: ${overgeslagen}.`);
  if (APPLY && !overgeslagen) fs.rmSync(LOG, { force: true });
  process.exit(0);
}

// ---------- verbergen ----------

const zonderFoto = producten.filter(p => !p.images.length && p.status === 'publish' && p.catalog_visibility === 'visible');

console.log(APPLY ? '>> VERBERGEN <<\n' : '>> DRY RUN – er wordt niets gewijzigd (gebruik --apply) <<\n');
console.log(`Producten in de webshop:  ${producten.length}`);
console.log(`Zonder foto, nu zichtbaar: ${zonderFoto.length}`);
console.log(`Manier: ${CONCEPT ? 'op concept (pagina verdwijnt, url geeft 404)' : 'verbergen (pagina blijft, uit alle overzichten)'}\n`);

const gewijzigd = [];
for (const p of zonderFoto) {
  console.log(`  ${String(p.sku).padEnd(14)} €${String(p.regular_price).padEnd(7)} ${p.name.slice(0, 55)}`);
  if (!APPLY) continue;
  try {
    const nieuw = CONCEPT ? { status: 'draft' } : { catalog_visibility: 'hidden' };
    await woo.put(`products/${p.id}`, nieuw);
    gewijzigd.push({ id: p.id, sku: p.sku, naam: p.name, was: { status: p.status, catalog_visibility: p.catalog_visibility } });
  } catch (e) {
    console.error(`    MISLUKT: ${e.message}`);
  }
}

if (APPLY) {
  // Eerdere regels behouden, zodat twee runs elkaar niet wissen.
  const bestaand = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG, 'utf8')) : [];
  const samen = [...bestaand.filter(b => !gewijzigd.some(g => g.id === b.id)), ...gewijzigd];
  fs.mkdirSync(path.dirname(LOG), { recursive: true });
  fs.writeFileSync(LOG, JSON.stringify(samen, null, 2));
  console.log(`\nKlaar: ${gewijzigd.length} producten ${CONCEPT ? 'op concept gezet' : 'verborgen'}.`);
  console.log(`Vastgelegd in ${path.relative(ROOT, LOG)} — terugzetten kan met --herstel --apply.`);
} else {
  console.log(`\n${zonderFoto.length} producten zouden ${CONCEPT ? 'op concept gaan' : 'verborgen worden'}. Draai met --apply.`);
}
