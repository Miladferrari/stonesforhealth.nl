// Zet een kortingspercentage op alle producten, of haalt de sale er weer af.
//
//   node scripts/sale.mjs                      # dry run, 15%
//   node scripts/sale.mjs --procent 20         # dry run, 20%
//   node scripts/sale.mjs --apply              # doorvoeren
//   node scripts/sale.mjs --apply --limit 5    # eerst een kleine batch
//   node scripts/sale.mjs --stop --apply       # sale eraf, prijzen terug
//
// De korting gaat als sale_price in WooCommerce staan, niet in de frontend.
// Dat is de enige plek waar het hoort: /api/create-order haalt de prijs daar
// op en negeert wat de client meestuurt, dus een korting die alleen in de
// code staat wordt wel getoond maar nooit afgerekend.
//
// De oude waarden gaan naar data/sale-voor.json zodat --stop altijd kan,
// ook als iemand later handmatig een prijs aanpast.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woo, getAll, assertCredentials } from './woo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOG = path.join(ROOT, 'data', 'sale-voor.json');

assertCredentials();
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const STOP = args.includes('--stop');
const arg = (naam, standaard) => {
  const i = args.indexOf(naam);
  return i >= 0 && args[i + 1] ? args[i + 1] : standaard;
};
const PROCENT = Number(arg('--procent', '15'));
const LIMIT = Number(arg('--limit', '0')) || Infinity;

if (!Number.isFinite(PROCENT) || PROCENT <= 0 || PROCENT >= 100) {
  console.error('  --procent moet tussen 1 en 99 liggen');
  process.exit(1);
}

const euro = (n) => '€' + n.toFixed(2).replace('.', ',');

/** Rondt af op 2 decimalen; WooCommerce wil een string. */
const prijs = (n) => (Math.round(n * 100) / 100).toFixed(2);

async function main() {
  const producten = await getAll('products', { status: 'publish' });
  const simpel = producten.filter((p) => p.type === 'simple');
  const variabel = producten.filter((p) => p.type === 'variable');

  if (variabel.length) {
    console.log(`  Let op: ${variabel.length} variabele producten overgeslagen.`);
    console.log('  Die hebben hun prijs in de varianten, die moeten apart.\n');
  }

  if (STOP) return stoppen(simpel);
  return starten(simpel);
}

async function starten(producten) {
  const factor = (100 - PROCENT) / 100;
  const eerder = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG, 'utf8')) : {};

  const teDoen = producten
    .filter((p) => {
      const regulier = parseFloat(p.regular_price || p.price || '0');
      if (!(regulier > 0)) return false;
      // Al op de juiste saleprijs? Dan overslaan, zodat opnieuw draaien niets doet
      return p.sale_price !== prijs(regulier * factor);
    })
    .slice(0, LIMIT);

  console.log(`${APPLY ? '' : '[PROEFDRAAI] '}${PROCENT}% korting op ${teDoen.length} van ${producten.length} producten\n`);

  let gedaan = 0, mislukt = 0;
  for (const [i, p] of teDoen.entries()) {
    const regulier = parseFloat(p.regular_price || p.price || '0');
    const nieuw = prijs(regulier * factor);
    const regel = `${String(i + 1).padStart(3)}/${teDoen.length}  ${p.name.replace(/&amp;/g, '&').slice(0, 44).padEnd(46)}${euro(regulier).padStart(9)} -> ${euro(Number(nieuw)).padStart(9)}`;

    if (!APPLY) { console.log(regel); gedaan++; continue; }

    try {
      // Regular_price expliciet meesturen: staat hij leeg, dan zou WooCommerce
      // de saleprijs als nieuwe basisprijs zien en is de korting onzichtbaar
      await woo.put(`products/${p.id}`, {
        regular_price: prijs(regulier),
        sale_price: nieuw,
      });
      // Pas loggen na een geslaagde call, anders herstellen we straks een
      // waarde die nooit gewijzigd is
      eerder[p.id] = { naam: p.name, regular_price: p.regular_price, sale_price: p.sale_price };
      console.log(regel + '  ✓');
      gedaan++;
    } catch (e) {
      console.error(regel + '  MISLUKT: ' + e.message);
      mislukt++;
    }
  }

  if (APPLY) {
    fs.mkdirSync(path.dirname(LOG), { recursive: true });
    fs.writeFileSync(LOG, JSON.stringify(eerder, null, 2));
    console.log(`\n  Oude prijzen bewaard in ${path.relative(ROOT, LOG)}`);
  }
  console.log(`\n${APPLY ? '' : '[PROEFDRAAI] '}gewijzigd ${gedaan} | mislukt ${mislukt}`);
  if (!APPLY) console.log('\n  Draai met --apply om het door te voeren.');
}

async function stoppen(producten) {
  const eerder = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG, 'utf8')) : {};
  const teDoen = producten.filter((p) => p.sale_price).slice(0, LIMIT);

  console.log(`${APPLY ? '' : '[PROEFDRAAI] '}sale eraf bij ${teDoen.length} producten\n`);

  let gedaan = 0, mislukt = 0;
  for (const [i, p] of teDoen.entries()) {
    const vorig = eerder[p.id];
    // Terug naar de prijs van vóór de sale als we die kennen, anders gewoon
    // de saleprijs weghalen
    const body = { sale_price: '' };
    if (vorig?.regular_price) body.regular_price = vorig.regular_price;

    const regel = `${String(i + 1).padStart(3)}/${teDoen.length}  ${p.name.replace(/&amp;/g, '&').slice(0, 44).padEnd(46)}terug naar ${euro(parseFloat(body.regular_price || p.regular_price || '0'))}`;

    if (!APPLY) { console.log(regel); gedaan++; continue; }

    try {
      await woo.put(`products/${p.id}`, body);
      console.log(regel + '  ✓');
      gedaan++;
    } catch (e) {
      console.error(regel + '  MISLUKT: ' + e.message);
      mislukt++;
    }
  }
  console.log(`\n${APPLY ? '' : '[PROEFDRAAI] '}hersteld ${gedaan} | mislukt ${mislukt}`);
  if (!APPLY) console.log('\n  Draai met --stop --apply om het door te voeren.');
}

main().catch((e) => { console.error(e); process.exit(1); });
