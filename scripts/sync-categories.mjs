// Maakt de categorieboom aan in WooCommerce. Idempotent: bestaande categorieën
// (op slug) worden bijgewerkt in plaats van opnieuw aangemaakt.
//
//   node scripts/sync-categories.mjs            # dry run
//   node scripts/sync-categories.mjs --apply    # aanmaken/bijwerken

import { woo, getAll, assertCredentials } from './woo.mjs';
import { flatten } from './catalog-tree.mjs';

assertCredentials();
const APPLY = process.argv.includes('--apply');

const wanted = flatten();
const existing = await getAll('products/categories', { hide_empty: false });
const bySlug = new Map(existing.map(c => [c.slug, c]));

const toCreate = wanted.filter(c => !bySlug.has(c.slug));
const toUpdate = wanted.filter(c => {
  const cur = bySlug.get(c.slug);
  if (!cur) return false;
  const wantedParentId = c.parentSlug ? bySlug.get(c.parentSlug)?.id ?? null : 0;
  return cur.name !== c.name || (wantedParentId !== null && cur.parent !== wantedParentId);
});
const extra = existing.filter(c => c.slug !== 'uncategorized' && !wanted.some(w => w.slug === c.slug));

console.log(APPLY ? '>> SYNCHRONISEREN <<\n' : '>> DRY RUN – er wordt niets gewijzigd (gebruik --apply) <<\n');
console.log(`Gewenst:   ${wanted.length} categorieën`);
console.log(`Bestaand:  ${existing.length}`);
console.log(`Aanmaken:  ${toCreate.length}`);
console.log(`Bijwerken: ${toUpdate.length}`);
if (extra.length) {
  console.log(`\nStaan in WooCommerce maar niet in de boom (${extra.length}) – blijven ongemoeid:`);
  for (const c of extra) console.log(`  ${c.name} (${c.slug}, ${c.count} producten)`);
}

if (!APPLY) {
  console.log('\nAan te maken:');
  for (const c of toCreate) console.log(`  ${c.parentSlug ? '    ' : ''}${c.name}  (${c.slug})`);
  console.log('\nNiets gewijzigd. Draai met --apply.');
  process.exit(0);
}

// Eerst de ouders, dan de kinderen, zodat parent-id's bekend zijn.
for (const pass of [null, 'children']) {
  for (const c of wanted) {
    const isChild = Boolean(c.parentSlug);
    if ((pass === null) === isChild) continue;

    const parentId = c.parentSlug ? bySlug.get(c.parentSlug)?.id : 0;
    if (c.parentSlug && !parentId) {
      console.error(`  OVERGESLAGEN: ${c.name} – ouder ${c.parentSlug} niet gevonden`);
      continue;
    }
    const payload = { name: c.name, slug: c.slug, parent: parentId || 0, description: c.description };
    const cur = bySlug.get(c.slug);
    try {
      if (cur) {
        if (cur.name !== c.name || cur.parent !== (parentId || 0) || cur.description !== c.description) {
          const updated = await woo.put(`products/categories/${cur.id}`, payload);
          bySlug.set(c.slug, updated);
          console.log(`  bijgewerkt: ${c.name}`);
        } else {
          console.log(`  ongewijzigd: ${c.name}`);
        }
      } else {
        const created = await woo.post('products/categories', payload);
        bySlug.set(c.slug, created);
        console.log(`  aangemaakt: ${c.name} (id ${created.id})`);
      }
    } catch (e) {
      console.error(`  MISLUKT: ${c.name} – ${e.message}`);
    }
  }
}

const after = await getAll('products/categories', { hide_empty: false });
console.log(`\nKlaar. WooCommerce heeft nu ${after.length} categorieën.`);
