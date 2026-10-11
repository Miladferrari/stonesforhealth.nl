import type { Product } from './woocommerce';

/**
 * Zoeken over de hele catalogus, in plaats van via ?search= van WooCommerce.
 * Die sorteert op datum en weegt een treffer in de lange omschrijving even
 * zwaar als een treffer in de titel: op "amethist" kwam een agaatschijf
 * bovenaan. Typfouten ("ametist") gaven niets. De catalogus is een paar
 * honderd producten, dus alles in het geheugen scoren is goedkoop.
 */

// Lidwoorden en voorzetsels: "steen voor liefde" moet ook zonder "voor" in
// de titel iets vinden.
const STOPWOORDEN = new Set([
  'de', 'het', 'een', 'en', 'van', 'voor', 'met', 'in', 'op', 'te', 'of', 'aan', 'bij', 'om',
]);

export function normaliseer(tekst: string): string {
  return tekst
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z0-9#]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

interface Veld {
  woorden: string[];
  gewicht: number;
  // Lange teksten alleen op heel woord of begin van een woord, anders
  // matcht "oog" in elke omschrijving.
  alleenWoordbegin: boolean;
}

interface Index {
  product: Product;
  velden: Veld[];
  naam: string;
  naamAaneen: string;
  // Titelwoorden zonder het merk ervoor.
  kernwoorden: string[];
}

function maakIndex(product: Product): Index {
  const naam = normaliseer(product.name || '');
  const woorden = (tekst: string) => normaliseer(tekst).split(' ').filter(Boolean);
  const labels = [
    ...(product.categories || []).map(c => c.name),
    ...(product.tags || []).map(t => t.name),
    ...(product.attributes || []).flatMap(a => a.options || []),
  ].join(' ');

  return {
    product,
    naam,
    naamAaneen: naam.replace(/ /g, ''),
    kernwoorden: naam.split(' ').filter(w => w && w !== 's4h'),
    velden: [
      { woorden: naam.split(' ').filter(Boolean), gewicht: 10, alleenWoordbegin: false },
      { woorden: woorden(product.sku || ''), gewicht: 10, alleenWoordbegin: true },
      { woorden: woorden(labels), gewicht: 5, alleenWoordbegin: false },
      { woorden: woorden(product.short_description || ''), gewicht: 2, alleenWoordbegin: true },
      { woorden: woorden(product.description || ''), gewicht: 1, alleenWoordbegin: true },
    ],
  };
}

function afstand(a: string, b: string): number {
  // Levenshtein met verwisseling van twee buren ("amehtist").
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const kost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + kost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

function toegestaneFouten(term: string): number {
  if (term.length >= 7) return 2;
  if (term.length >= 4) return 1;
  return 0;
}

/** 1 = heel woord, lager = minder zeker, 0 = geen treffer. */
function matchWoord(term: string, woord: string, veld: Veld, fuzzy: boolean): number {
  if (woord === term) return 1;
  if (woord.startsWith(term)) return 0.9;
  if (veld.alleenWoordbegin) return 0;
  // Samenstellingen: "kwarts" in "rozenkwarts", "oog" in "tijgeroog".
  if (term.length >= 3 && woord.includes(term)) return 0.7;
  if (!fuzzy) return 0;
  const max = toegestaneFouten(term);
  if (max === 0) return 0;
  if (Math.abs(woord.length - term.length) <= max && afstand(term, woord) <= max) return 0.6;
  // Halverwege typen: "ametis" tegen het begin van "amethist".
  if (woord.length > term.length && afstand(term, woord.slice(0, term.length)) <= 1) return 0.5;
  return 0;
}

function scoreTerm(term: string, index: Index, fuzzy: boolean): number {
  // Per veld de beste treffer, opgeteld: titel én categorie "Hangers" weegt
  // zwaarder dan alleen "Leaf Hanger" ergens achteraan in de titel.
  let totaal = 0;
  for (const veld of index.velden) {
    let beste = 0;
    for (const woord of veld.woorden) {
      const s = matchWoord(term, woord, veld, fuzzy);
      if (s > beste) beste = s;
    }
    totaal += beste * veld.gewicht;
  }
  // Staat de term vooraan in de titel, dan gaat het product er vermoedelijk
  // over: "Tijgeroog op Standaard" vóór "Sterrenbeeld Armband – Tijgeroog".
  const positie = index.kernwoorden.findIndex(w => matchWoord(term, w, index.velden[0], fuzzy) > 0);
  if (positie >= 0 && positie < 3) totaal += 3 - positie;
  return totaal;
}

let cacheBron: Product[] | null = null;
let cacheIndex: Index[] = [];

function indexVoor(producten: Product[]): Index[] {
  if (cacheBron !== producten) {
    cacheBron = producten;
    cacheIndex = producten.map(maakIndex);
  }
  return cacheIndex;
}

export function zoekProducten(producten: Product[], zoekterm: string): Product[] {
  const zin = normaliseer(zoekterm).slice(0, 100);
  const alleTermen = [...new Set(zin.split(' ').filter(t => t.length >= 2))];
  if (alleTermen.length === 0) return [];
  const zonderStop = alleTermen.filter(t => !STOPWOORDEN.has(t));
  const termen = zonderStop.length > 0 ? zonderStop : alleTermen;

  const index = indexVoor(producten);

  // Typfouten alleen toestaan voor een term die letterlijk nergens voorkomt,
  // anders vindt "hanger" ook alles met "hangen".
  const fuzzy = new Map(
    termen.map(t => [t, !index.some(i => scoreTerm(t, i, false) > 0)])
  );

  const zinAaneen = zin.replace(/ /g, '');
  const gescoord = index.map(i => {
    const perTerm = termen.map(t => scoreTerm(t, i, fuzzy.get(t)!));
    const geraakt = perTerm.filter(s => s > 0).length;
    let score = perTerm.reduce((a, b) => a + b, 0);
    // Hele zoekopdracht in de titel, ook "rozen kwarts" tegen "rozenkwarts".
    if (zin.length >= 3 && (i.naam.includes(zin) || i.naamAaneen.includes(zinAaneen))) score += 8;
    if (i.product.stock_status !== 'instock') score *= 0.85;
    return { product: i.product, geraakt, score };
  });

  // Eerst alleen producten die op álle termen matchen; is dat niets, dan wat
  // het dichtst in de buurt komt, zodat "amethist ketting" niet leeg blijft.
  let treffers = gescoord.filter(g => g.geraakt === termen.length);
  if (treffers.length === 0 && termen.length > 1) {
    treffers = gescoord.filter(g => g.geraakt > 0);
  }

  return treffers
    .sort((a, b) => b.geraakt - a.geraakt || b.score - a.score || a.product.name.localeCompare(b.product.name, 'nl'))
    .map(g => g.product);
}
