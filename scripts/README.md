# Beheerscripts webshop

Scripts om de WooCommerce-catalogus van Stones for Health in te richten.
Alles draait vanuit de projectmap en leest de credentials uit `.env.local`.

## Eenmalig: credentials ophalen

```bash
vercel env pull .env.local
```

Nodig zijn `NEXT_PUBLIC_WOOCOMMERCE_URL`, `WOOCOMMERCE_CONSUMER_KEY` en
`WOOCOMMERCE_CONSUMER_SECRET`. De key moet **lees- en schrijfrechten** hebben
(WooCommerce → Instellingen → Geavanceerd → REST API).

## Volgorde

Elk script draait standaard als **dry run**. Pas met `--apply` verandert er iets.

```bash
# 1. Kijken wat er nu in de shop staat
node scripts/inventory.mjs

# 2. Testproducten en testbestellingen opruimen
node scripts/cleanup-testdata.mjs            # laat zien wat eruit gaat
node scripts/cleanup-testdata.mjs --apply

# 3. De categorieboom aanmaken (76 categorieën)
node scripts/sync-categories.mjs             # laat zien wat erbij komt
node scripts/sync-categories.mjs --apply

# 4. Producten importeren uit de bol.com-export
node scripts/preview-import.mjs              # verdeling over categorieën
node scripts/import-products.mjs --apply --limit 10   # eerst een kleine batch
node scripts/import-products.mjs --apply              # de rest
# --draft-vague zet producten met een vage naam als concept weg i.p.v. live

# 5. Controleren
node scripts/inventory.mjs
```

## Bestanden

| Bestand | Doel |
| --- | --- |
| `catalog-tree.mjs` | De categorieboom. **Enige bron van waarheid.** |
| `gen-menu-config.mjs` | Genereert `app/lib/categoryMenu.ts` uit de boom |
| `categorize.mjs` | Leidt uit een producttitel de categorieën af |
| `testdata.mjs` | Bepaalt of een product/order testdata is |
| `woo.mjs` | WooCommerce REST-client |
| `xlsx.mjs` | Leest de bol.com-export zonder extra dependency |

## Categorie toevoegen of hernoemen

1. Pas `catalog-tree.mjs` aan.
2. `node scripts/gen-menu-config.mjs` — werkt het menu van de webshop bij.
3. `node scripts/sync-categories.mjs --apply` — werkt WooCommerce bij.

Het menu van de webshop volgt de volgorde uit de boom, niet het aantal
producten. Categorieën die onder twee ouders horen (zoals *Armband Sets* onder
zowel Armbanden als Cadeaus) bestaan één keer in WooCommerce en worden in het
menu op beide plekken getoond, met dezelfde URL.

## Veiligheid

`cleanup-testdata.mjs` verwijdert **nooit** een betaalde bestelling. Orders die
niet duidelijk testdata zijn, worden als `ONDUIDELIJK` gemeld en overgeslagen.
