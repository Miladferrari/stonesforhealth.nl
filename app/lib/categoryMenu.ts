// GEGENEREERD BESTAND – niet met de hand aanpassen.
// Bron: scripts/catalog-tree.mjs. Opnieuw genereren met:
//   node scripts/gen-menu-config.mjs

export interface MenuSection {
  slug: string;
  /** Subcategorie-slugs in de volgorde waarin ze in het menu horen. */
  children: string[];
}

/** Hoofdcategorieën in menuvolgorde, elk met zijn subcategorieën. */
export const MENU: MenuSection[] = [
  {
    "slug": "edelstenen-kristallen",
    "children": [
      "ruwe-edelstenen",
      "gepolijste-edelstenen",
      "kristalclusters-geodes",
      "edelsteen-punten-torens",
      "edelstenen-op-standaard",
      "edelsteen-beelden-sculpturen",
      "edelsteen-harten",
      "agaatschijven",
      "grote-edelstenen-xxl",
      "unieke-exemplaren"
    ]
  },
  {
    "slug": "edelsteen-armbanden",
    "children": [
      "alle-edelsteen-armbanden",
      "8-mm-armbanden",
      "splitarmbanden",
      "armband-sets",
      "bescherming-armbanden",
      "liefde-relaties",
      "rust-balans",
      "kracht-zelfvertrouwen",
      "geluk-voorspoed",
      "chakra-armbanden",
      "buddha-armbanden",
      "dames-armbanden",
      "heren-armbanden"
    ]
  },
  {
    "slug": "sterrenbeeld-armbanden",
    "children": [
      "sterrenbeeld-ram",
      "sterrenbeeld-stier",
      "sterrenbeeld-tweelingen",
      "sterrenbeeld-kreeft",
      "sterrenbeeld-leeuw",
      "sterrenbeeld-maagd",
      "sterrenbeeld-weegschaal",
      "sterrenbeeld-schorpioen",
      "sterrenbeeld-boogschutter",
      "sterrenbeeld-steenbok",
      "sterrenbeeld-waterman",
      "sterrenbeeld-vissen"
    ]
  },
  {
    "slug": "kettingen-hangers",
    "children": [
      "edelsteen-hangers",
      "donut-hangers",
      "orgonite-hangers",
      "wire-wrap-hangers",
      "edelsteen-kettingen",
      "agaat-hangers",
      "beschermingshangers"
    ]
  },
  {
    "slug": "pendels-spirituele-tools",
    "children": [
      "edelsteen-pendels",
      "chakra-pendels",
      "orgonite-pendels",
      "meditatie",
      "chakra-energie",
      "spirituele-sets"
    ]
  },
  {
    "slug": "wonen-edelsteen-decoratie",
    "children": [
      "edelstenen-op-standaard",
      "kristal-decoratie",
      "edelsteen-beelden-sculpturen",
      "theelichthouders",
      "edelsteen-boompjes",
      "agaat-decoratie",
      "grote-edelstenen-xxl",
      "luxe-woondecoratie"
    ]
  },
  {
    "slug": "reinigen-energie",
    "children": [
      "white-sage",
      "seleniet",
      "wierook",
      "reinigingssets",
      "bescherming",
      "chakra-energie",
      "meditatie"
    ]
  },
  {
    "slug": "cadeaus-sets",
    "children": [
      "edelsteen-cadeausets",
      "armband-sets",
      "cadeau-voor-haar",
      "cadeau-voor-hem",
      "liefde-relaties",
      "bescherming",
      "sterrenbeeld-cadeaus",
      "cadeaus-onder-25",
      "cadeaus-25-50",
      "luxe-cadeaus"
    ]
  },
  {
    "slug": "nieuw",
    "children": []
  },
  {
    "slug": "bestsellers",
    "children": []
  },
  {
    "slug": "sale",
    "children": []
  }
];

/** Vaste volgorde van de hoofdcategorieën. */
export const MAIN_ORDER: string[] = [
  "edelstenen-kristallen",
  "edelsteen-armbanden",
  "sterrenbeeld-armbanden",
  "kettingen-hangers",
  "pendels-spirituele-tools",
  "wonen-edelsteen-decoratie",
  "reinigen-energie",
  "cadeaus-sets",
  "nieuw",
  "bestsellers",
  "sale"
];

/** Weergavenaam per slug, als terugval wanneer WooCommerce (nog) niets levert. */
export const DISPLAY_NAMES: Record<string, string> = {
  "edelstenen-kristallen": "Edelstenen & Kristallen",
  "ruwe-edelstenen": "Ruwe Edelstenen",
  "gepolijste-edelstenen": "Gepolijste Edelstenen",
  "kristalclusters-geodes": "Kristalclusters & Geodes",
  "edelsteen-punten-torens": "Edelsteen Punten & Torens",
  "edelstenen-op-standaard": "Edelstenen op Standaard",
  "edelsteen-beelden-sculpturen": "Edelsteen Beelden",
  "edelsteen-harten": "Edelsteen Harten",
  "agaatschijven": "Agaatschijven",
  "grote-edelstenen-xxl": "Grote Edelstenen",
  "unieke-exemplaren": "Unieke Exemplaren",
  "edelsteen-armbanden": "Edelsteen Armbanden",
  "alle-edelsteen-armbanden": "Alle Edelsteen Armbanden",
  "8-mm-armbanden": "8 mm Armbanden",
  "splitarmbanden": "Splitarmbanden",
  "armband-sets": "Armband Sets",
  "bescherming-armbanden": "Bescherming Armbanden",
  "liefde-relaties": "Liefde & Relaties",
  "rust-balans": "Rust & Balans",
  "kracht-zelfvertrouwen": "Kracht & Zelfvertrouwen",
  "geluk-voorspoed": "Geluk & Voorspoed",
  "chakra-armbanden": "Chakra Armbanden",
  "buddha-armbanden": "Buddha Armbanden",
  "dames-armbanden": "Dames Armbanden",
  "heren-armbanden": "Heren Armbanden",
  "sterrenbeeld-armbanden": "Sterrenbeeld Armbanden",
  "sterrenbeeld-ram": "Ram",
  "sterrenbeeld-stier": "Stier",
  "sterrenbeeld-tweelingen": "Tweelingen",
  "sterrenbeeld-kreeft": "Kreeft",
  "sterrenbeeld-leeuw": "Leeuw",
  "sterrenbeeld-maagd": "Maagd",
  "sterrenbeeld-weegschaal": "Weegschaal",
  "sterrenbeeld-schorpioen": "Schorpioen",
  "sterrenbeeld-boogschutter": "Boogschutter",
  "sterrenbeeld-steenbok": "Steenbok",
  "sterrenbeeld-waterman": "Waterman",
  "sterrenbeeld-vissen": "Vissen",
  "kettingen-hangers": "Kettingen & Hangers",
  "edelsteen-hangers": "Edelsteen Hangers",
  "donut-hangers": "Donut Hangers",
  "orgonite-hangers": "Orgonite Hangers",
  "wire-wrap-hangers": "Wire Wrap Hangers",
  "edelsteen-kettingen": "Edelsteen Kettingen",
  "agaat-hangers": "Agaat Hangers",
  "beschermingshangers": "Beschermingshangers",
  "pendels-spirituele-tools": "Pendels & Spirituele Tools",
  "edelsteen-pendels": "Edelsteen Pendels",
  "chakra-pendels": "Chakra Pendels",
  "orgonite-pendels": "Orgonite Pendels",
  "meditatie": "Meditatie",
  "chakra-energie": "Chakra & Energie",
  "spirituele-sets": "Spirituele Sets",
  "wonen-edelsteen-decoratie": "Wonen & Edelsteen Decoratie",
  "kristal-decoratie": "Kristal Decoratie",
  "theelichthouders": "Theelichthouders",
  "edelsteen-boompjes": "Edelsteen Boompjes",
  "agaat-decoratie": "Agaat Decoratie",
  "luxe-woondecoratie": "Luxe Woondecoratie",
  "reinigen-energie": "Reinigen & Energie",
  "white-sage": "White Sage",
  "seleniet": "Seleniet",
  "wierook": "Wierook",
  "reinigingssets": "Reinigingssets",
  "bescherming": "Bescherming",
  "cadeaus-sets": "Cadeaus & Sets",
  "edelsteen-cadeausets": "Edelsteen Cadeausets",
  "cadeau-voor-haar": "Cadeau voor Haar",
  "cadeau-voor-hem": "Cadeau voor Hem",
  "sterrenbeeld-cadeaus": "Sterrenbeeld Cadeaus",
  "cadeaus-onder-25": "Cadeaus onder €25",
  "cadeaus-25-50": "Cadeaus €25–€50",
  "luxe-cadeaus": "Luxe Cadeaus",
  "nieuw": "Nieuw",
  "bestsellers": "Bestsellers",
  "sale": "Sale"
};

/**
 * Sorteert de hoofdcategorieën uit WooCommerce volgens MAIN_ORDER.
 * Categorieën die niet in de boom voorkomen komen achteraan, op naam.
 */
export function sortMainCategories<T extends { slug: string; name: string }>(categories: T[]): T[] {
  return [...categories].sort((a, b) => {
    const ia = MAIN_ORDER.indexOf(a.slug);
    const ib = MAIN_ORDER.indexOf(b.slug);
    if (ia === -1 && ib === -1) return a.name.localeCompare(b.name);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

/**
 * Subcategorieën van een hoofdcategorie in menuvolgorde. Neemt ook categorieën
 * mee die in WooCommerce onder een andere ouder hangen maar hier wel getoond
 * moeten worden (zoals "Armband Sets" onder zowel Armbanden als Cadeaus).
 */
export function subcategoriesFor<T extends { id: number; slug: string; parent: number }>(
  parentSlug: string,
  allCategories: T[],
): T[] {
  const section = MENU.find(s => s.slug === parentSlug);
  const bySlug = new Map(allCategories.map(c => [c.slug, c]));

  if (!section) {
    const parent = bySlug.get(parentSlug);
    return parent ? allCategories.filter(c => c.parent === parent.id) : [];
  }

  const ordered = section.children.map(slug => bySlug.get(slug)).filter((c): c is T => Boolean(c));

  // Subcategorieën die in WooCommerce zijn toegevoegd maar nog niet in de boom
  // staan, alsnog tonen zodat ze niet onzichtbaar blijven.
  const parent = bySlug.get(parentSlug);
  if (parent) {
    const shown = new Set(ordered.map(c => c.id));
    for (const c of allCategories) {
      if (c.parent === parent.id && !shown.has(c.id)) ordered.push(c);
    }
  }
  return ordered;
}
