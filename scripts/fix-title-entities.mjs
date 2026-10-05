// Alleen producttitels herstellen; standaard dry run.
// node scripts/fix-title-entities.mjs [--apply]
import fs from 'node:fs';
import { assertCredentials } from './woo.mjs';
import { normalizeProductName } from './product-names.mjs';
import { getRawProductTitle, getRawProductTitles, setRawProductTitle } from './wp-product-titles.mjs';

assertCredentials();
const apply = process.argv.includes('--apply');
const products = await getRawProductTitles();
const changes = products.map(p => ({ id: p.id, slug: p.slug, from: p.name, to: normalizeProductName(p.name) }))
  .filter(p => p.from !== p.to);
console.log(JSON.stringify({ apply, total: products.length, changes }, null, 2));
if (apply && changes.length) {
  const backup = new URL(`../data/title-entities-before-${Date.now()}.json`, import.meta.url);
  fs.mkdirSync(new URL('../data/', import.meta.url), { recursive: true });
  fs.writeFileSync(backup, JSON.stringify(changes, null, 2), { flag: 'wx' });
  for (const change of changes) {
    const current = await getRawProductTitle(change.id);
    if (current.name !== change.from || current.slug !== change.slug) {
      throw new Error(`Product ${change.id} is ondertussen gewijzigd; gestopt.`);
    }
    await setRawProductTitle(change.id, change.to, change.slug);
    console.log(`Hersteld en gecontroleerd: ${change.id}`);
  }
}
