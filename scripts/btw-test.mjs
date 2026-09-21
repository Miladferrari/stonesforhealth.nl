// Dezelfde formules als lib/orderAmounts.ts, getoetst op gevallen die we
// (nog) niet in de winkel hebben staan.
const num = v => { const n = typeof v === 'number' ? v : parseFloat(String(v ?? '')); return Number.isFinite(n) ? n : 0; };
const brutoRegel = i => num(i.total) + num(i.total_tax);
const brutoStuk  = i => brutoRegel(i) / (num(i.quantity) || 1);
const brutoSub   = o => (o.line_items ?? []).reduce((s, i) =>
  s + (i.subtotal != null ? num(i.subtotal) + num(i.subtotal_tax) : brutoRegel(i)), 0);
const brutoVerz  = o => num(o.shipping_total) + num(o.shipping_tax);
const brutoKort  = o => num(o.discount_total) + num(o.discount_tax);

const gevallen = [
  { naam: '21% btw, 1 stuk (order 688)',
    o: { line_items: [{ quantity: 1, subtotal: '12.36', subtotal_tax: '2.59', total: '12.36', total_tax: '2.59' }],
         shipping_total: '4.09', shipping_tax: '0.86', discount_total: '0', discount_tax: '0', total: '19.90' },
    verwacht: { stuk: 14.95, sub: 14.95, verz: 4.95 } },

  { naam: '21% btw, 3 stuks',
    o: { line_items: [{ quantity: 3, subtotal: '37.07', subtotal_tax: '7.78', total: '37.07', total_tax: '7.78' }],
         shipping_total: '0', shipping_tax: '0', total: '44.85' },
    verwacht: { stuk: 14.95, sub: 44.85, verz: 0 } },

  { naam: '9% btw (als je dat ooit verkoopt)',
    o: { line_items: [{ quantity: 1, subtotal: '13.72', subtotal_tax: '1.23', total: '13.72', total_tax: '1.23' }],
         shipping_total: '4.09', shipping_tax: '0.86', total: '19.90' },
    verwacht: { stuk: 14.95, sub: 14.95, verz: 4.95 } },

  { naam: 'twee tarieven in een order (21% + 9%)',
    o: { line_items: [
           { quantity: 1, subtotal: '12.36', subtotal_tax: '2.59', total: '12.36', total_tax: '2.59' },
           { quantity: 1, subtotal: '13.72', subtotal_tax: '1.23', total: '13.72', total_tax: '1.23' }],
         shipping_total: '4.09', shipping_tax: '0.86', total: '34.85' },
    verwacht: { sub: 29.90, verz: 4.95 } },

  { naam: 'met kortingscode (10% van 14,95)',
    o: { line_items: [{ quantity: 1, subtotal: '12.36', subtotal_tax: '2.59', total: '11.12', total_tax: '2.34' }],
         shipping_total: '4.09', shipping_tax: '0.86', discount_total: '1.24', discount_tax: '0.25', total: '18.41' },
    verwacht: { sub: 14.95, kort: 1.49, verz: 4.95 } },

  { naam: 'btw-vrij (0%)',
    o: { line_items: [{ quantity: 1, subtotal: '14.95', subtotal_tax: '0', total: '14.95', total_tax: '0' }],
         shipping_total: '4.95', shipping_tax: '0', total: '19.90' },
    verwacht: { stuk: 14.95, sub: 14.95, verz: 4.95 } },

  { naam: 'ontbrekende btw-velden (oude order)',
    o: { line_items: [{ quantity: 1, total: '14.95' }], shipping_total: '4.95', total: '19.90' },
    verwacht: { stuk: 14.95, sub: 14.95, verz: 4.95 } },
];

let fouten = 0;
for (const g of gevallen) {
  const sub = brutoSub(g.o), verz = brutoVerz(g.o), kort = brutoKort(g.o);
  const berekend = sub - kort + verz;
  const totaalKlopt = Math.abs(berekend - num(g.o.total)) < 0.02;
  const checks = [];
  if (g.verwacht.stuk !== undefined) checks.push(['stukprijs', brutoStuk(g.o.line_items[0]), g.verwacht.stuk]);
  if (g.verwacht.sub !== undefined)  checks.push(['subtotaal', sub, g.verwacht.sub]);
  if (g.verwacht.verz !== undefined) checks.push(['verzending', verz, g.verwacht.verz]);
  if (g.verwacht.kort !== undefined) checks.push(['korting', kort, g.verwacht.kort]);
  const mis = checks.filter(([, a, b]) => Math.abs(a - b) > 0.015);
  const ok = mis.length === 0 && totaalKlopt;
  if (!ok) fouten++;
  console.log(`${ok ? 'ok  ' : 'FOUT'} ${g.naam}`);
  console.log(`       ${checks.map(([n, a]) => `${n} €${a.toFixed(2)}`).join('  ')}   optelling ${berekend.toFixed(2)} vs totaal ${num(g.o.total).toFixed(2)} ${totaalKlopt ? '' : '<- WIJKT AF'}`);
  for (const [n, a, b] of mis) console.log(`       !! ${n}: €${a.toFixed(2)} verwacht €${b.toFixed(2)}`);
}
console.log(`\n${gevallen.length - fouten}/${gevallen.length} goed`);
