// Genereert app/lib/categoryMenu.ts uit de categorieboom, zodat het menu van de
// webshop en de categorieën in WooCommerce nooit uit elkaar lopen.
//
//   node scripts/gen-menu-config.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { menuStructure, TREE, TOP_LEVEL } from './catalog-tree.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'app/lib/categoryMenu.ts');

const names = new Map();
for (const top of TREE) {
  names.set(top.slug, top.name);
  for (const c of top.children) names.set(c.slug, c.aliasName || c.name);
}
for (const t of TOP_LEVEL) names.set(t.slug, t.name);

const sections = menuStructure();

const body = `// GEGENEREERD BESTAND – niet met de hand aanpassen.
// Bron: scripts/catalog-tree.mjs. Opnieuw genereren met:
//   node scripts/gen-menu-config.mjs

export interface MenuSection {
  slug: string;
  /** Subcategorie-slugs in de volgorde waarin ze in het menu horen. */
  children: string[];
}

/** Hoofdcategorieën in menuvolgorde, elk met zijn subcategorieën. */
export const MENU: MenuSection[] = ${JSON.stringify(sections, null, 2)};

/** Vaste volgorde van de hoofdcategorieën. */
export const MAIN_ORDER: string[] = ${JSON.stringify(sections.map(s => s.slug), null, 2)};

/** Weergavenaam per slug, als terugval wanneer WooCommerce (nog) niets levert. */
export const DISPLAY_NAMES: Record<string, string> = ${JSON.stringify(Object.fromEntries(names), null, 2)};

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
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body);
console.log(`Geschreven: ${path.relative(ROOT, OUT)}  (${sections.length} secties)`);
