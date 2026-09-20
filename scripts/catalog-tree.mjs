// Categorieboom voor Stones for Health.
// In WooCommerce kan een categorie maar één ouder hebben. Categorieën die in het
// gewenste menu onder twee ouders horen, worden één keer aangemaakt (primaire
// ouder) en krijgen `alsoUnder` — de frontend toont ze dan ook onder die tweede
// ouder, met dezelfde URL. Zo geen dubbele slugs en geen dubbele content.

export const TREE = [
  {
    name: 'Edelstenen & Kristallen',
    slug: 'edelstenen-kristallen',
    description: 'Natuurlijke edelstenen en kristallen: ruw, gepolijst, clusters, punten en unieke exemplaren.',
    children: [
      { name: 'Ruwe Edelstenen', slug: 'ruwe-edelstenen' },
      { name: 'Gepolijste Edelstenen', slug: 'gepolijste-edelstenen' },
      { name: 'Kristalclusters & Geodes', slug: 'kristalclusters-geodes' },
      { name: 'Edelsteen Punten & Torens', slug: 'edelsteen-punten-torens' },
      { name: 'Edelstenen op Standaard', slug: 'edelstenen-op-standaard', alsoUnder: 'wonen-edelsteen-decoratie' },
      { name: 'Edelsteen Beelden & Sculpturen', slug: 'edelsteen-beelden-sculpturen', alsoUnder: 'wonen-edelsteen-decoratie', aliasName: 'Edelsteen Beelden' },
      { name: 'Edelsteen Harten', slug: 'edelsteen-harten' },
      { name: 'Agaatschijven', slug: 'agaatschijven' },
      { name: 'Grote Edelstenen / XXL', slug: 'grote-edelstenen-xxl', alsoUnder: 'wonen-edelsteen-decoratie', aliasName: 'Grote Edelstenen' },
      { name: 'Unieke Exemplaren', slug: 'unieke-exemplaren' },
    ],
  },
  {
    name: 'Edelsteen Armbanden',
    slug: 'edelsteen-armbanden',
    description: 'Handgemaakte edelsteen armbanden met natuurlijke kralen, per steensoort en per intentie.',
    children: [
      { name: 'Alle Edelsteen Armbanden', slug: 'alle-edelsteen-armbanden' },
      { name: '8 mm Armbanden', slug: '8-mm-armbanden' },
      { name: 'Splitarmbanden', slug: 'splitarmbanden' },
      { name: 'Armband Sets', slug: 'armband-sets', alsoUnder: 'cadeaus-sets' },
      { name: 'Bescherming Armbanden', slug: 'bescherming-armbanden', alsoUnder: 'intenties' },
      { name: 'Liefde & Relaties', slug: 'liefde-relaties', alsoUnder: 'cadeaus-sets' },
      { name: 'Rust & Balans', slug: 'rust-balans', alsoUnder: 'intenties' },
      { name: 'Kracht & Zelfvertrouwen', slug: 'kracht-zelfvertrouwen', alsoUnder: 'intenties' },
      { name: 'Geluk & Voorspoed', slug: 'geluk-voorspoed', alsoUnder: 'intenties' },
      { name: 'Chakra Armbanden', slug: 'chakra-armbanden', alsoUnder: 'intenties' },
      { name: 'Buddha Armbanden', slug: 'buddha-armbanden' },
      { name: 'Dames Armbanden', slug: 'dames-armbanden' },
      { name: 'Heren Armbanden', slug: 'heren-armbanden' },
    ],
  },
  {
    name: 'Sterrenbeeld Armbanden',
    slug: 'sterrenbeeld-armbanden',
    description: 'Edelsteen armbanden per sterrenbeeld, afgestemd op de energie van jouw horoscoopteken.',
    children: [
      { name: 'Ram', slug: 'sterrenbeeld-ram' },
      { name: 'Stier', slug: 'sterrenbeeld-stier' },
      { name: 'Tweelingen', slug: 'sterrenbeeld-tweelingen' },
      { name: 'Kreeft', slug: 'sterrenbeeld-kreeft' },
      { name: 'Leeuw', slug: 'sterrenbeeld-leeuw' },
      { name: 'Maagd', slug: 'sterrenbeeld-maagd' },
      { name: 'Weegschaal', slug: 'sterrenbeeld-weegschaal' },
      { name: 'Schorpioen', slug: 'sterrenbeeld-schorpioen' },
      { name: 'Boogschutter', slug: 'sterrenbeeld-boogschutter' },
      { name: 'Steenbok', slug: 'sterrenbeeld-steenbok' },
      { name: 'Waterman', slug: 'sterrenbeeld-waterman' },
      { name: 'Vissen', slug: 'sterrenbeeld-vissen' },
    ],
  },
  {
    name: 'Intenties',
    slug: 'intenties',
    description: 'Shop op wat je nodig hebt: bescherming, liefde, rust, kracht of geluk.',
    // Alle subcategorieën hangen primair onder Edelsteen Armbanden.
    menu: [
      'bescherming-armbanden', 'liefde-relaties', 'rust-balans',
      'kracht-zelfvertrouwen', 'geluk-voorspoed', 'chakra-armbanden',
    ],
    children: [],
  },
  {
    name: 'Kettingen & Hangers',
    slug: 'kettingen-hangers',
    description: 'Edelsteen hangers, donuts, orgonite en wire wrap kettingen.',
    children: [
      { name: 'Edelsteen Hangers', slug: 'edelsteen-hangers' },
      { name: 'Donut Hangers', slug: 'donut-hangers' },
      { name: 'Orgonite Hangers', slug: 'orgonite-hangers' },
      { name: 'Wire Wrap Hangers', slug: 'wire-wrap-hangers' },
      { name: 'Edelsteen Kettingen', slug: 'edelsteen-kettingen' },
      { name: 'Agaat Hangers', slug: 'agaat-hangers' },
      { name: 'Beschermingshangers', slug: 'beschermingshangers' },
    ],
  },
  {
    name: 'Pendels & Spirituele Tools',
    slug: 'pendels-spirituele-tools',
    description: 'Pendels, meditatie- en chakra tools voor energiewerk en divinatie.',
    children: [
      { name: 'Edelsteen Pendels', slug: 'edelsteen-pendels' },
      { name: 'Chakra Pendels', slug: 'chakra-pendels' },
      { name: 'Orgonite Pendels', slug: 'orgonite-pendels' },
      { name: 'Meditatie', slug: 'meditatie', alsoUnder: 'reinigen-energie' },
      { name: 'Chakra & Energie', slug: 'chakra-energie', alsoUnder: 'reinigen-energie' },
      { name: 'Spirituele Sets', slug: 'spirituele-sets' },
    ],
  },
  {
    name: 'Wonen & Edelsteen Decoratie',
    slug: 'wonen-edelsteen-decoratie',
    description: 'Edelstenen als woondecoratie: op standaard, beelden, boompjes en theelichthouders.',
    // Weergavevolgorde in het menu, inclusief categorieën die primair onder een
    // andere hoofdcategorie hangen.
    menu: [
      'edelstenen-op-standaard', 'kristal-decoratie', 'edelsteen-beelden-sculpturen',
      'theelichthouders', 'edelsteen-boompjes', 'agaat-decoratie',
      'grote-edelstenen-xxl', 'luxe-woondecoratie',
    ],
    children: [
      { name: 'Kristal Decoratie', slug: 'kristal-decoratie' },
      { name: 'Theelichthouders', slug: 'theelichthouders' },
      { name: 'Edelsteen Boompjes', slug: 'edelsteen-boompjes' },
      { name: 'Agaat Decoratie', slug: 'agaat-decoratie' },
      { name: 'Luxe Woondecoratie', slug: 'luxe-woondecoratie' },
    ],
  },
  {
    name: 'Reinigen & Energie',
    slug: 'reinigen-energie',
    description: 'White sage, seleniet, wierook en reinigingssets om je stenen en ruimte te zuiveren.',
    menu: [
      'white-sage', 'seleniet', 'wierook', 'reinigingssets',
      'bescherming', 'chakra-energie', 'meditatie',
    ],
    children: [
      { name: 'White Sage', slug: 'white-sage' },
      { name: 'Seleniet', slug: 'seleniet' },
      { name: 'Wierook', slug: 'wierook' },
      { name: 'Reinigingssets', slug: 'reinigingssets' },
      { name: 'Bescherming', slug: 'bescherming', alsoUnder: 'cadeaus-sets' },
    ],
  },
  {
    name: 'Cadeaus & Sets',
    slug: 'cadeaus-sets',
    description: 'Edelsteen cadeausets en geschenken, per gelegenheid en per budget.',
    menu: [
      'edelsteen-cadeausets', 'armband-sets', 'cadeau-voor-haar', 'cadeau-voor-hem',
      'liefde-relaties', 'bescherming', 'sterrenbeeld-cadeaus',
      'cadeaus-onder-25', 'cadeaus-25-50', 'luxe-cadeaus',
    ],
    children: [
      { name: 'Edelsteen Cadeausets', slug: 'edelsteen-cadeausets' },
      { name: 'Cadeau voor Haar', slug: 'cadeau-voor-haar' },
      { name: 'Cadeau voor Hem', slug: 'cadeau-voor-hem' },
      { name: 'Sterrenbeeld Cadeaus', slug: 'sterrenbeeld-cadeaus' },
      { name: 'Cadeaus onder €25', slug: 'cadeaus-onder-25' },
      { name: 'Cadeaus €25–€50', slug: 'cadeaus-25-50' },
      { name: 'Luxe Cadeaus', slug: 'luxe-cadeaus' },
    ],
  },
];

// Losse menu-ingangen naast de boom.
export const TOP_LEVEL = [
  { name: 'Nieuw', slug: 'nieuw', description: 'De nieuwste aanwinsten in onze collectie.' },
  { name: 'Bestsellers', slug: 'bestsellers', description: 'Onze meest gekozen edelstenen en armbanden.' },
  { name: 'Sale', slug: 'sale', description: 'Tijdelijk afgeprijsde edelstenen en sieraden.' },
];

/** Vlakke lijst van alles wat in WooCommerce aangemaakt moet worden. */
export function flatten() {
  const out = [];
  for (const top of TREE) {
    out.push({ name: top.name, slug: top.slug, description: top.description || '', parentSlug: null });
    for (const child of top.children) {
      out.push({ name: child.name, slug: child.slug, description: child.description || '', parentSlug: top.slug });
    }
  }
  for (const t of TOP_LEVEL) {
    out.push({ name: t.name, slug: t.slug, description: t.description || '', parentSlug: null });
  }
  return out;
}

/** Menu-aliassen: slug van de categorie -> extra ouder-slug waaronder hij ook hoort. */
export function aliases() {
  const out = [];
  for (const top of TREE) {
    for (const child of top.children) {
      if (child.alsoUnder) {
        out.push({ slug: child.slug, name: child.aliasName || child.name, parentSlug: child.alsoUnder, primaryParentSlug: top.slug });
      }
    }
  }
  return out;
}

/**
 * De menustructuur zoals de webshop hem moet tonen: hoofdcategorieën in vaste
 * volgorde, elk met zijn subcategorie-slugs in vaste volgorde. Aliassen staan
 * hier onder beide ouders; de frontend zoekt de bijbehorende WooCommerce-
 * categorie op slug op.
 */
export function menuStructure() {
  const sections = TREE.map(top => ({
    slug: top.slug,
    children: top.menu || top.children.map(c => c.slug),
  }));
  for (const t of TOP_LEVEL) sections.push({ slug: t.slug, children: [] });
  return sections;
}
