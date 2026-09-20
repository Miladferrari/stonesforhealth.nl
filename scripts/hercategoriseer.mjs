// Werkt de collecties bij nu de producttitels compleet zijn.
//
// De categorieën zijn ooit bepaald op de korte namen uit de Excel-export
// ("S4H Armband"). Met de volledige bol-titel valt er veel meer uit af te
// leiden. Dit script rekent de categorieën opnieuw uit en:
//
//   * voegt toe wat de titel duidelijk zegt;
//   * haalt alleen SOORT-categorieën weg die de titel tegenspreekt
//     (een ketting die in "8 mm armbanden" staat);
//   * laat thema-, intentie- en cadeaucategorieën met rust — die zijn
//     handmatig gekozen en kan een script niet beoordelen.
//
//   node scripts/hercategoriseer.mjs            # dry run
//   node scripts/hercategoriseer.mjs --apply

import { woo, getAll, assertCredentials } from './woo.mjs';
import { categorize } from './categorize.mjs';

assertCredentials();
const APPLY = process.argv.includes('--apply');

// Wie het draagt en of het een set is, staat lang niet altijd in de titel.
// Die categorieën blijven dus staan, ook als de titel er niets over zegt:
// 'dames-armbanden', 'heren-armbanden' en 'armband-sets'.

/** Categorieën die zeggen WAT een product is. Die mag een titel tegenspreken. */
const SOORT = new Set([
  'edelsteen-armbanden', 'alle-edelsteen-armbanden', '8-mm-armbanden', 'splitarmbanden',
  'chakra-armbanden', 'buddha-armbanden',
  'kettingen-hangers', 'edelsteen-hangers', 'donut-hangers', 'orgonite-hangers',
  'wire-wrap-hangers', 'edelsteen-kettingen', 'agaat-hangers', 'beschermingshangers',
  'pendels-spirituele-tools', 'edelsteen-pendels', 'chakra-pendels', 'orgonite-pendels',
  'edelstenen-kristallen', 'ruwe-edelstenen', 'gepolijste-edelstenen', 'kristalclusters-geodes',
  'edelsteen-punten-torens', 'edelstenen-op-standaard', 'edelsteen-beelden-sculpturen',
  'edelsteen-harten', 'agaatschijven', 'grote-edelstenen-xxl',
  'wonen-edelsteen-decoratie', 'kristal-decoratie', 'theelichthouders', 'edelsteen-boompjes',
  'agaat-decoratie', 'white-sage', 'seleniet', 'wierook', 'reinigingssets',
]);

const decode = s => (s || '').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/&quot;/g, '"');

const categorieen = await getAll('products/categories', { hide_empty: false });
const idBySlug = new Map(categorieen.map(c => [c.slug, c.id]));

const producten = await getAll('products', { status: 'any' });
const live = producten.filter(p => p.status === 'publish' && p.catalog_visibility === 'visible');

console.log(APPLY ? '>> BIJWERKEN <<\n' : '>> DRY RUN – er wordt niets gewijzigd (gebruik --apply) <<\n');

const plan = [];
for (const p of live) {
  const huidig = p.categories.map(c => c.slug);
  const { slugs } = categorize({ title: decode(p.name), price: Number(p.regular_price) || 0 });
  const gewenst = slugs.filter(s => idBySlug.has(s));

  const erbij = gewenst.filter(s => !huidig.includes(s));
  // Alleen soort-categorieën die de titel tegenspreekt gaan eraf.
  const eraf = huidig.filter(s => SOORT.has(s) && !gewenst.includes(s));
  if (!erbij.length && !eraf.length) continue;

  const nieuw = [...new Set([...huidig.filter(s => !eraf.includes(s)), ...erbij])];
  plan.push({ p, erbij, eraf, nieuw });
}

console.log(`Live producten:      ${live.length}`);
console.log(`Al goed ingedeeld:   ${live.length - plan.length}`);
console.log(`Bij te werken:       ${plan.length}\n`);

for (const a of plan) {
  console.log(`  ${String(a.p.sku).padEnd(14)} ${decode(a.p.name).slice(0, 55)}`);
  if (a.erbij.length) console.log(`                 erbij: ${a.erbij.join(', ')}`);
  if (a.eraf.length) console.log(`                 eraf : ${a.eraf.join(', ')}`);
}

const totErbij = plan.reduce((n, a) => n + a.erbij.length, 0);
const totEraf = plan.reduce((n, a) => n + a.eraf.length, 0);
console.log(`\nTotaal: ${totErbij} categorieën erbij, ${totEraf} eraf.`);

if (!APPLY) {
  console.log('Draai met --apply om dit door te voeren.');
  process.exit(0);
}

let ok = 0, fout = 0;
for (const a of plan) {
  try {
    await woo.put(`products/${a.p.id}`, { categories: a.nieuw.map(s => ({ id: idBySlug.get(s) })) });
    ok++;
  } catch (e) {
    fout++;
    console.error(`  MISLUKT ${a.p.sku}: ${e.message}`);
  }
}
console.log(`\nKlaar: ${ok} producten bijgewerkt, ${fout} mislukt.`);
