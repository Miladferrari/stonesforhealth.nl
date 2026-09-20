// Verwijdert testproducten en testbestellingen.
// Standaard alleen tonen (dry run). Pas met --apply wordt er echt verwijderd.
//
//   node scripts/cleanup-testdata.mjs            # laat zien wat er zou gebeuren
//   node scripts/cleanup-testdata.mjs --apply    # voert de verwijdering uit

import { woo, getAll, assertCredentials } from './woo.mjs';
import { classifyOrder, classifyProduct } from './testdata.mjs';

assertCredentials();

const APPLY = process.argv.includes('--apply');
const euro = n => '€' + Number(n || 0).toFixed(2);

// Betaalde orders worden nooit automatisch als testdata gezien. Wie er toch een
// weg wil hebben, noemt het ordernummer expliciet:
//   node scripts/cleanup-testdata.mjs --orders 18,21,23 --apply
const ordersFlag = process.argv.indexOf('--orders');
const FORCE_ORDER_IDS = new Set(
  ordersFlag >= 0
    ? (process.argv[ordersFlag + 1] || '').split(',').map(s => Number(s.trim())).filter(Boolean)
    : []
);

const [products, orders] = await Promise.all([
  getAll('products', { status: 'any' }),
  getAll('orders', { status: 'any' }),
]);

const testProducts = products.filter(p => classifyProduct(p).verdict === 'TEST');
const testOrders = orders.filter(
  o => classifyOrder(o).verdict === 'TEST' || FORCE_ORDER_IDS.has(o.id)
);
const unclearProducts = products.filter(p => classifyProduct(p).verdict === 'ONDUIDELIJK');
const unclearOrders = orders.filter(
  o => classifyOrder(o).verdict === 'ONDUIDELIJK' && !FORCE_ORDER_IDS.has(o.id)
);

console.log(APPLY ? '>> VERWIJDEREN <<\n' : '>> DRY RUN – er wordt niets verwijderd (gebruik --apply) <<\n');

const onbekend = [...FORCE_ORDER_IDS].filter(id => !orders.some(o => o.id === id));
if (onbekend.length) {
  console.error(`  LET OP: deze ordernummers bestaan niet: ${onbekend.join(', ')}\n`);
}

console.log(`Te verwijderen producten (${testProducts.length}):`);
for (const p of testProducts) console.log(`  id ${p.id}  ${euro(p.price)}  ${p.name}  – ${classifyProduct(p).reason}`);
if (!testProducts.length) console.log('  (geen)');

console.log(`\nTe verwijderen bestellingen (${testOrders.length}):`);
for (const o of testOrders) {
  const reden = FORCE_ORDER_IDS.has(o.id) ? 'handmatig opgegeven met --orders' : classifyOrder(o).reason;
  console.log(`  #${o.id}  ${o.status}  ${euro(o.total)}  ${o.billing?.email || '-'}  – ${reden}`);
}
if (!testOrders.length) console.log('  (geen)');

if (unclearProducts.length || unclearOrders.length) {
  console.log(`\nOvergeslagen – handmatig beoordelen (${unclearProducts.length} producten, ${unclearOrders.length} orders):`);
  for (const p of unclearProducts) console.log(`  product id ${p.id}  ${p.name}  – ${classifyProduct(p).reason}`);
  for (const o of unclearOrders) console.log(`  order #${o.id}  ${o.status}  ${euro(o.total)}  ${o.billing?.email || '-'}  – ${classifyOrder(o).reason}`);
}

if (!APPLY) {
  console.log('\nNiets gewijzigd. Draai met --apply om bovenstaande te verwijderen.');
  process.exit(0);
}

let ok = 0, fail = 0;
for (const o of testOrders) {
  try {
    await woo.del(`orders/${o.id}`, { force: true });
    console.log(`  verwijderd: order #${o.id}`);
    ok++;
  } catch (e) {
    console.error(`  MISLUKT: order #${o.id} – ${e.message}`);
    fail++;
  }
}
for (const p of testProducts) {
  try {
    await woo.del(`products/${p.id}`, { force: true });
    console.log(`  verwijderd: product ${p.id} (${p.name})`);
    ok++;
  } catch (e) {
    console.error(`  MISLUKT: product ${p.id} – ${e.message}`);
    fail++;
  }
}
console.log(`\nKlaar: ${ok} verwijderd, ${fail} mislukt.`);
