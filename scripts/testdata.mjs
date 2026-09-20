// Bepaalt of een product of bestelling testdata is.
// Conservatief: bij twijfel 'ONDUIDELIJK', en die wordt nooit automatisch verwijderd.

const TEST_WORDS = /\btest\b|testproduct|testorder|testbestelling|dummy|voorbeeld|sample|\bfoo\b|\bbar\b|asdf|qwerty|xxx/i;
const TEST_EMAIL = /@(example|test|testing|mailinator|yopmail)\.|^test@|\+test@|@localhost/i;

export function classifyProduct(p) {
  const name = p.name || '';
  const sku = p.sku || '';
  if (TEST_WORDS.test(name) || TEST_WORDS.test(sku)) {
    return { verdict: 'TEST', reason: 'naam of SKU bevat een testwoord' };
  }
  if (!p.sku && Number(p.price) === 0) {
    return { verdict: 'ONDUIDELIJK', reason: 'geen SKU en prijs 0' };
  }
  return { verdict: 'ECHT', reason: '' };
}

export function classifyOrder(o) {
  const email = o.billing?.email || '';
  const naam = `${o.billing?.first_name || ''} ${o.billing?.last_name || ''}`.trim();
  const items = (o.line_items || []).map(i => i.name).join(' ');
  const betaald = Boolean(o.date_paid);
  const total = Number(o.total || 0);
  const redenen = [];

  if (TEST_EMAIL.test(email)) redenen.push('test-e-mailadres');
  if (TEST_WORDS.test(naam)) redenen.push('testnaam');
  if (TEST_WORDS.test(items)) redenen.push('testproduct in de order');
  if (o.status === 'checkout-draft') redenen.push('nooit afgerond (checkout-draft)');

  // Betaalde orders zijn nooit automatisch testdata, ongeacht de overige signalen.
  if (betaald && total > 0) {
    return {
      verdict: redenen.length ? 'ONDUIDELIJK' : 'ECHT',
      reason: redenen.length ? `betaald (${o.date_paid.slice(0, 10)}) maar: ${redenen.join(', ')} – handmatig beoordelen` : 'betaalde bestelling',
    };
  }

  if (redenen.length) return { verdict: 'TEST', reason: redenen.join(', ') + ', niet betaald' };

  if (!betaald && ['pending', 'failed', 'cancelled'].includes(o.status)) {
    return { verdict: 'ONDUIDELIJK', reason: `${o.status}, niet betaald – kan een afgebroken echte bestelling zijn` };
  }
  if (total === 0) return { verdict: 'ONDUIDELIJK', reason: 'totaal €0' };

  return { verdict: 'ECHT', reason: '' };
}
