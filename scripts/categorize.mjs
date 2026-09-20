// Leidt uit een producttitel af in welke categorieën het product hoort.
// Een product mag in meerdere categorieën staan (bv. agaat op standaard hoort
// zowel bij Edelstenen & Kristallen als bij Wonen & Edelsteen Decoratie).

const has = (t, ...words) => words.some(w => t.includes(w));
const re = (t, pattern) => new RegExp(pattern, 'i').test(t);

// Producten die niet in een edelstenenwebshop thuishoren.
const OFF_ASSORTMENT = /iphone|hoesje|telefoonhoes|zandkunst|sand art|noodpakket|ehbo|verbanddoos|survival|slaapzak|bivy|reddingsdeken/i;

// Titels die te vaag zijn om live te zetten (restanten uit de bol.com-export).
const PRODUCT_WORDS = /armband|hanger|ketting|pendel|cluster|geode|punt|obelisk|beeld|hart|schijf|standaard|boompje|theelicht|waxine|sage|seleniet|wierook|set|steen|kristal|edelsteen|edelstenen|freeform|brok|donut|roller|gua sha|magneet/i;

const SIGNS = [
  { slug: 'sterrenbeeld-ram', pattern: /\bram\b|\baries\b/i },
  { slug: 'sterrenbeeld-stier', pattern: /\bstier\b|\btaurus\b/i },
  { slug: 'sterrenbeeld-tweelingen', pattern: /tweelingen|\bgemini\b/i },
  { slug: 'sterrenbeeld-kreeft', pattern: /\bkreeft\b|\bcancer\b/i },
  { slug: 'sterrenbeeld-leeuw', pattern: /\bleeuw\b|\bleo\b/i },
  { slug: 'sterrenbeeld-maagd', pattern: /\bmaagd\b|\bvirgo\b/i },
  { slug: 'sterrenbeeld-weegschaal', pattern: /weegschaal|\blibra\b/i },
  { slug: 'sterrenbeeld-schorpioen', pattern: /schorpioen|scorpio/i },
  { slug: 'sterrenbeeld-boogschutter', pattern: /boogschutter|sagittarius/i },
  { slug: 'sterrenbeeld-steenbok', pattern: /steenbok|capricorn/i },
  { slug: 'sterrenbeeld-waterman', pattern: /waterman|aquarius/i },
  { slug: 'sterrenbeeld-vissen', pattern: /\bvissen\b|\bvis\b|pisces/i },
];

/** Gewicht in gram uit de titel halen ("5,08 kg", "278 gram", "600-800 gram"). */
function weightGrams(title) {
  const kg = title.match(/(\d+[.,]?\d*)\s*kg\b/i);
  if (kg) return parseFloat(kg[1].replace(',', '.')) * 1000;
  const g = title.match(/(\d+)(?:\s*-\s*\d+)?\s*(?:gram|gr\b|g\b)/i);
  if (g) return parseFloat(g[1]);
  return null;
}

/**
 * @param {{title:string, price:number}} product
 * @returns {{slugs:string[], skip:boolean, draft:boolean, reason:string}}
 */
export function categorize(product) {
  const title = product.title || '';
  const t = title.toLowerCase();
  const price = Number(product.price) || 0;
  const slugs = new Set();

  if (OFF_ASSORTMENT.test(title)) {
    return { slugs: [], skip: true, draft: false, reason: 'buiten assortiment' };
  }

  const vague = title.length < 25 || !PRODUCT_WORDS.test(title);
  const grams = weightGrams(title);

  const isBracelet = has(t, 'armband', 'bracelet');
  const isPendel = has(t, 'pendel', 'pendulum');
  const isPendant = has(t, 'hanger', 'ketting', 'donut', 'amulet', 'necklace');
  const isSet = re(t, '\\bset\\b|2-delige|2 delige|2 stuks|set van|\\bkit\\b|cadeauset');

  // --- Sieraden -------------------------------------------------------------
  if (isBracelet) {
    slugs.add('edelsteen-armbanden');
    slugs.add('alle-edelsteen-armbanden');

    const sign = SIGNS.find(s => s.pattern.test(title));
    const zodiacContext = has(t, 'sterrenbeeld', 'horoscoop', 'zodiac');
    if (sign && (zodiacContext || SIGNS.some(s => s.pattern.test(title) && /armband/i.test(title)))) {
      if (zodiacContext) {
        slugs.add('sterrenbeeld-armbanden');
        slugs.add(sign.slug);
        slugs.add('sterrenbeeld-cadeaus');
        slugs.add('cadeaus-sets');
      }
    }
    if (re(t, '\\b8\\s*mm\\b')) slugs.add('8-mm-armbanden');
    if (has(t, 'split')) slugs.add('splitarmbanden');
    if (isSet) { slugs.add('armband-sets'); slugs.add('cadeaus-sets'); }
    if (has(t, 'buddha', 'boeddha')) slugs.add('buddha-armbanden');
    if (has(t, 'chakra')) { slugs.add('chakra-armbanden'); slugs.add('chakra-energie'); }
    if (has(t, 'dames')) slugs.add('dames-armbanden');
    if (has(t, 'heren')) slugs.add('heren-armbanden');
    if (has(t, 'unisex')) { slugs.add('dames-armbanden'); slugs.add('heren-armbanden'); }

    // Intenties
    if (has(t, 'bescherming', 'beschermings', 'bescherm', 'protection')) slugs.add('bescherming-armbanden');
    if (has(t, 'liefde', 'zelfliefde', 'relatie', 'rozenkwarts', 'love')) slugs.add('liefde-relaties');
    if (has(t, 'rust', 'balans', 'harmonie', 'kalmte', 'stabiliteit')) slugs.add('rust-balans');
    if (has(t, 'kracht', 'zelfvertrouwen', 'focus', 'aarding', 'power')) slugs.add('kracht-zelfvertrouwen');
    if (has(t, 'geluk', 'voorspoed', 'manifestatie', 'money', 'positiviteit', 'positieve')) slugs.add('geluk-voorspoed');
  }

  if (isPendel) {
    slugs.add('pendels-spirituele-tools');
    slugs.add('edelsteen-pendels');
    if (has(t, 'chakra')) slugs.add('chakra-pendels');
    if (has(t, 'orgonite')) slugs.add('orgonite-pendels');
  }

  if (isPendant && !isBracelet) {
    slugs.add('kettingen-hangers');
    if (has(t, 'donut')) slugs.add('donut-hangers');
    if (has(t, 'orgonite')) slugs.add('orgonite-hangers');
    if (has(t, 'wire wrap', 'wire-wrap', 'wirewrap')) slugs.add('wire-wrap-hangers');
    if (has(t, 'agaat')) slugs.add('agaat-hangers');
    if (has(t, 'bescherming', 'beschermende', 'amulet')) slugs.add('beschermingshangers');
    if (has(t, 'ketting', 'necklace')) slugs.add('edelsteen-kettingen');
    if (!has(t, 'donut', 'orgonite', 'ketting')) slugs.add('edelsteen-hangers');
  }

  // --- Wonen & decoratie ----------------------------------------------------
  if (has(t, 'waxine', 'theelicht')) {
    slugs.add('wonen-edelsteen-decoratie');
    slugs.add('theelichthouders');
  }
  if (has(t, 'boompje', 'gemstone tree', 'levensboompje')) {
    slugs.add('wonen-edelsteen-decoratie');
    slugs.add('edelsteen-boompjes');
  }
  if (re(t, 'op standaard|op voet|met standaard|display|\\bstandaard\\b')) {
    slugs.add('edelstenen-kristallen');
    slugs.add('edelstenen-op-standaard');
    slugs.add('wonen-edelsteen-decoratie');
  }

  // --- Ruwe stenen, clusters, punten, beelden -------------------------------
  if (has(t, 'cluster', 'geode', 'druse')) {
    slugs.add('edelstenen-kristallen');
    slugs.add('kristalclusters-geodes');
  }
  if (re(t, '\\bpunt\\b|obelisk|\\btoren\\b|kristalpunt')) {
    slugs.add('edelstenen-kristallen');
    slugs.add('edelsteen-punten-torens');
  }
  if (has(t, 'beeld', 'sculptuur', 'draak', 'schedel', 'figuur') && !isBracelet) {
    slugs.add('edelstenen-kristallen');
    slugs.add('edelsteen-beelden-sculpturen');
    slugs.add('wonen-edelsteen-decoratie');
  }
  if (re(t, '\\bhart\\b|\\bharten\\b|heart') && !isBracelet) {
    slugs.add('edelstenen-kristallen');
    slugs.add('edelsteen-harten');
  }
  if (re(t, 'agaatschijf|agaat\\s*schijf|agaatplak|\\bplakjes\\b')) {
    slugs.add('edelstenen-kristallen');
    slugs.add('agaatschijven');
  }
  if (has(t, 'agaat') && has(t, 'decoratie', 'standaard', 'styling')) {
    slugs.add('wonen-edelsteen-decoratie');
    slugs.add('agaat-decoratie');
  }
  if (re(t, '\\bruw\\b|\\bruwe\\b|\\bbrok\\b') && !isBracelet) {
    slugs.add('edelstenen-kristallen');
    slugs.add('ruwe-edelstenen');
  }
  if (has(t, 'gepolijst', 'freeform', 'getrommeld', 'knuffelsteen', 'polychroom') && !isBracelet) {
    slugs.add('edelstenen-kristallen');
    slugs.add('gepolijste-edelstenen');
  }
  if (has(t, 'xxl') || (grams !== null && grams >= 1000)) {
    slugs.add('edelstenen-kristallen');
    slugs.add('grote-edelstenen-xxl');
    slugs.add('wonen-edelsteen-decoratie');
  }
  if (has(t, 'uniek exemplaar', 'uniek natuurproduct', 'uniek decoratiestuk', 'unieke ', 'verzamelsteen')) {
    slugs.add('edelstenen-kristallen');
    slugs.add('unieke-exemplaren');
  }

  // --- Reinigen & energie ---------------------------------------------------
  if (has(t, 'white sage', 'sage', 'salie')) {
    slugs.add('reinigen-energie');
    slugs.add('white-sage');
  }
  if (has(t, 'seleniet', 'selenite')) {
    slugs.add('reinigen-energie');
    slugs.add('seleniet');
  }
  if (has(t, 'wierook', 'incense', 'palo santo')) {
    slugs.add('reinigen-energie');
    slugs.add('wierook');
  }
  if (has(t, 'reinigingskit', 'reinigingsset', 'reinig je energie', 'cleansing')) {
    slugs.add('reinigen-energie');
    slugs.add('reinigingssets');
  }
  if (has(t, 'meditatie', 'meditation')) {
    slugs.add('pendels-spirituele-tools');
    slugs.add('meditatie');
  }
  if (has(t, 'chakra') && !isBracelet) {
    slugs.add('pendels-spirituele-tools');
    slugs.add('chakra-energie');
  }
  if (has(t, 'orgonite') && !isPendant && !isPendel) {
    slugs.add('pendels-spirituele-tools');
    slugs.add('spirituele-sets');
  }

  // --- Cadeaus --------------------------------------------------------------
  if (has(t, 'cadeauset', 'cadeau voor', 'geschenkset', 'informatiekaart')) {
    slugs.add('cadeaus-sets');
    slugs.add('edelsteen-cadeausets');
  }
  if (isSet && !isBracelet) {
    slugs.add('cadeaus-sets');
    slugs.add('edelsteen-cadeausets');
  }
  if (has(t, 'cadeau voor haar', 'voor haar')) slugs.add('cadeau-voor-haar');
  if (has(t, 'cadeau voor hem', 'voor hem')) slugs.add('cadeau-voor-hem');

  // Prijsbuckets: alleen voor producten die als cadeau werken.
  if (slugs.size > 0) {
    if (price > 0 && price < 25) slugs.add('cadeaus-onder-25');
    else if (price >= 25 && price <= 50) slugs.add('cadeaus-25-50');
    else if (price > 100) { slugs.add('luxe-cadeaus'); slugs.add('cadeaus-sets'); }
    if (price > 100) slugs.add('luxe-woondecoratie');
  }

  // Vangnet: een product zonder enkele match komt in de hoofdcategorie
  // Edelstenen & Kristallen, zodat het nooit in Uncategorized belandt.
  if (slugs.size === 0) slugs.add('edelstenen-kristallen');

  return {
    slugs: [...slugs],
    skip: false,
    draft: vague,
    reason: vague ? 'titel te vaag – handmatig afmaken' : '',
  };
}
