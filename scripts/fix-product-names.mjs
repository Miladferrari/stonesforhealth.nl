// Schoont productnamen op die uit de bol.com-export rommelig zijn overgekomen:
// ALL CAPS, dubbele spaties, ontbrekend merk. Verzint niets - er wordt alleen
// herschreven wat er al staat.
//
//   node scripts/fix-product-names.mjs            # dry run
//   node scripts/fix-product-names.mjs --apply

import { woo, getAll, assertCredentials } from './woo.mjs';

assertCredentials();
const APPLY = process.argv.includes('--apply');

// Woorden die binnen een naam klein blijven.
const LOWER = new Set(['en', 'met', 'de', 'het', 'een', 'van', 'voor', 'op', 'in', 'gram', 'cm', 'mm', 'kg']);
// Woorden met een vaste schrijfwijze.
const FIXED = new Map(Object.entries({
  s4h: 'S4H', xxl: 'XXL', '3d': '3D', led: 'LED',
  brazillie: 'Brazilië', kwaliteits: 'Kwaliteit',
}));

function titleCase(name) {
  return name
    .split(/\s+/)
    .map((word, i) => {
      // Leestekens aan het woord (S4H-, 8mm,) mogen de vergelijking niet breken.
      const bare = word.replace(/[®™]/g, '').replace(/^[^\w]+|[^\w]+$/g, '');
      const key = bare.toLowerCase();
      if (FIXED.has(key)) return word.replace(bare, FIXED.get(key));
      // Woorden met cijfers (8mm, 422) of leestekens laten we met rust.
      if (/\d/.test(bare)) return word.toLowerCase();
      if (i > 0 && LOWER.has(key)) return word.toLowerCase();
      return bare.charAt(0).toUpperCase() + bare.slice(1).toLowerCase() + word.slice(bare.length);
    })
    .join(' ');
}

/** Namen die volledig of grotendeels in hoofdletters staan, of rare casing hebben. */
function needsCasingFix(name) {
  const letters = name.replace(/[^a-zA-Z]/g, '');
  if (!letters) return false;
  const caps = letters.replace(/[^A-Z]/g, '').length / letters.length;
  const allLower = letters === letters.toLowerCase();
  return caps > 0.6 || allLower || /\s{2,}/.test(name) || /\bs4h\b/i.test(name) && !/\bS4H\b/.test(name);
}

function cleanName(name) {
  let out = name.replace(/\s{2,}/g, ' ').trim();
  if (needsCasingFix(out)) out = titleCase(out);

  // Het merk hoort één keer vooraan. In de bol.com-titels staat het soms
  // middenin ("Armband Howliet S4H 18 cm") of twee keer. Een ® dat erbij stond
  // blijft staan - dat is het geregistreerde merk.
  const merkteken = /s4h\s*[®™]/i.test(name) ? '®' : '';
  out = out.replace(/^\s*s4h\s*[-–—]\s*/i, 'S4H ');
  const zonderMerk = out.replace(/\bs+s?4h\b\s*[®™]?/gi, ' ').replace(/\s{2,}/g, ' ').trim();
  const merk = (/^ss4h/i.test(out) ? 'SS4H' : 'S4H') + merkteken;
  out = zonderMerk ? `${merk} ${zonderMerk}` : merk;

  return out.replace(/\s{2,}/g, ' ').replace(/\s+([,.])/g, '$1').trim();
}

const products = await getAll('products', { status: 'any' });

const changes = [];
for (const p of products) {
  const next = cleanName(p.name);
  if (next !== p.name) changes.push({ id: p.id, sku: p.sku, from: p.name, to: next });
}

console.log(APPLY ? '>> NAMEN BIJWERKEN <<\n' : '>> DRY RUN (gebruik --apply) <<\n');
console.log(`Producten: ${products.length} | naam wordt aangepast: ${changes.length}\n`);
for (const c of changes) console.log(`  ${String(c.id).padEnd(5)} ${c.from}\n  ${' '.repeat(5)} -> ${c.to}`);

// Namen waar geen enkele productinformatie in zit.
const LEEG = /^s4h(\s*[®]?\s*)?$|kdjaiojf|^s4h\s+(coop)$/i;
const leeg = products.filter(p => LEEG.test(cleanName(p.name).replace(/^S4H\s+/, 'S4H ')) || LEEG.test(p.name));
if (leeg.length) {
  console.log(`\nZonder bruikbare naam (${leeg.length}) - handmatig afmaken:`);
  for (const p of leeg) console.log(`  ${p.id}  ${p.sku}  €${p.price}  "${p.name}"`);
}

if (!APPLY) {
  console.log('\nNiets gewijzigd.');
  process.exit(0);
}

let ok = 0, fail = 0;
for (const c of changes) {
  try {
    await woo.put(`products/${c.id}`, { name: c.to });
    ok++;
  } catch (e) {
    console.error(`  MISLUKT: ${c.id} - ${e.message}`);
    fail++;
  }
}
console.log(`\nKlaar: ${ok} namen bijgewerkt, ${fail} mislukt.`);
