// Toont de huidige staat van de WooCommerce-shop: categorieën, producten, orders.
// Gebruik:  node scripts/inventory.mjs

import { woo, getAll, assertCredentials, config } from './woo.mjs';
import { classifyOrder, classifyProduct } from './testdata.mjs';

assertCredentials();

const euro = n => '€' + Number(n || 0).toFixed(2);

console.log('WooCommerce:', config.baseUrl);

const info = await woo.get('').catch(() => null);
if (info) console.log('Verbinding: OK\n');

const [categories, products, orders, coupons] = await Promise.all([
  getAll('products/categories', { hide_empty: false, orderby: 'name' }),
  getAll('products', { status: 'any' }),
  getAll('orders', { status: 'any' }),
  getAll('coupons').catch(() => []),
]);

console.log(`=== CATEGORIEËN (${categories.length}) ===`);
const byParent = new Map();
for (const c of categories) {
  if (!byParent.has(c.parent)) byParent.set(c.parent, []);
  byParent.get(c.parent).push(c);
}
const printTree = (parent = 0, depth = 0) => {
  for (const c of (byParent.get(parent) || []).sort((a, b) => a.name.localeCompare(b.name))) {
    console.log('  '.repeat(depth + 1) + `${c.name}  (${c.slug}, id ${c.id}, ${c.count} producten)`);
    printTree(c.id, depth + 1);
  }
};
printTree();

console.log(`\n=== PRODUCTEN (${products.length}) ===`);
for (const p of products) {
  const v = classifyProduct(p);
  console.log(`  [${v.verdict.padEnd(10)}] id ${String(p.id).padEnd(6)} ${p.status.padEnd(8)} ${euro(p.price).padEnd(10)} sku:${(p.sku || '-').padEnd(16)} ${p.name}`);
}

console.log(`\n=== BESTELLINGEN (${orders.length}) ===`);
if (orders.length === 0) console.log('  (geen)');
for (const o of orders) {
  const v = classifyOrder(o);
  const naam = `${o.billing?.first_name || ''} ${o.billing?.last_name || ''}`.trim() || '-';
  console.log(`  [${v.verdict.padEnd(10)}] #${String(o.id).padEnd(6)} ${o.status.padEnd(12)} ${euro(o.total).padEnd(10)} ${(o.date_created || '').slice(0, 10)}  ${naam} <${o.billing?.email || '-'}>`);
  console.log(`${' '.repeat(15)}betaald: ${o.date_paid ? o.date_paid.slice(0, 10) : 'nee'} | methode: ${o.payment_method_title || '-'} | txn: ${o.transaction_id || '-'}`);
  console.log(`${' '.repeat(15)}reden: ${v.reason}`);
}

console.log(`\n=== KORTINGSCODES (${coupons.length}) ===`);
for (const c of coupons) console.log(`  ${c.code} (${c.amount} ${c.discount_type}, gebruikt ${c.usage_count}x)`);

const testProducts = products.filter(p => classifyProduct(p).verdict === 'TEST');
const testOrders = orders.filter(o => classifyOrder(o).verdict === 'TEST');
const unclear = orders.filter(o => classifyOrder(o).verdict === 'ONDUIDELIJK');

console.log('\n=== SAMENVATTING ===');
console.log(`Testproducten:        ${testProducts.length} / ${products.length}`);
console.log(`Testbestellingen:     ${testOrders.length} / ${orders.length}`);
console.log(`Onduidelijke orders:  ${unclear.length}  (worden NIET verwijderd)`);
