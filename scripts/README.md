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

# 5. Beschrijvingen en foto's van bol.com overnemen
node scripts/bol-scrape.mjs                     # haalt het hele bol-assortiment op
node scripts/enrich-from-bol.mjs                # laat zien wat er zou veranderen
node scripts/enrich-from-bol.mjs --apply --limit 5
node scripts/enrich-from-bol.mjs --apply

# 6. Namen en alt-teksten nalopen
node scripts/fix-seo.mjs                        # laat zien wat er scheef staat
node scripts/fix-seo.mjs --apply

# 7. Controleren
node scripts/inventory.mjs
```

## Bol.com overnemen

`bol-scrape.mjs` loopt de verkooppagina af (14 pagina's, 324 producten) en haalt
per product de titel, de volledige beschrijving, de EAN en de fotogalerij op.
Het resultaat staat in `data/bol-scrape.jsonl`; onderbreken mag, een tweede
run pakt alleen de ontbrekende producten op (`--fresh` begint opnieuw).

`enrich-from-bol.mjs` koppelt op EAN — de SKU in de webshop is dezelfde EAN als
op bol — en zet de tekst en de foto's in WooCommerce. Twee dingen doet het
script onderweg:

* **Verkopers-aantekeningen weghalen.** In een deel van de bol-teksten staan
  resten van het schrijfproces ("zou ik op Bol.com niet schrijven dat…",
  "SEO Zoekwoorden", "ChatGPT zei:"). Die blokken worden niet overgenomen en
  aan het eind van de run opgesomd. *Op bol staan ze nog wel.*
* **Foto's met een nette bestandsnaam.** De foto's gaan via de WordPress
  media-API naar binnen als `productnaam-1.jpg` in plaats van `1200x1200.jpg`.
  Daarvoor is een applicatiewachtwoord nodig (zie hieronder). Met `--sideload`
  laat je WooCommerce de foto's zelf ophalen; dan is geen wachtwoord nodig,
  maar krijg je de bestandsnamen van bol.

Een product met te weinig bruikbare tekst of zonder bol-gegevens wordt
overgeslagen: wat in de webshop staat, blijft dan staan.

Handig bij het nakijken:

```bash
node scripts/enrich-from-bol.mjs --show 8721425211100   # één product bekijken
node scripts/enrich-from-bol.mjs --apply --force-images # foto's vervangen
node scripts/enrich-from-bol.mjs --apply --text-only    # alleen teksten
node scripts/enrich-from-bol.mjs --apply --names       # titels 1:1 van bol
```

De titels in de webshop staan 1:1 gelijk aan die op bol (`--names`). Ze zijn
daardoor lang — gemiddeld ruim 100 tekens. Op de productpagina is dat de `<h1>`;
voor de `<title>` knipt `app/(main)/product/[slug]/page.tsx` de titel in op de
kop vóór het eerste streepje, zodat Google hem niet afkapt.

`fix-seo.mjs` ruimt op wat daarna nog scheef staat: placeholdernamen die bol
wél goed heeft, een dubbel merkvoorvoegsel, en alt-teksten boven de 125 tekens.

## WordPress-applicatiewachtwoord

De WooCommerce-sleutel werkt alleen op `/wc/v3`. Voor het uploaden van foto's
is een los wachtwoord nodig:

1. WordPress → Gebruikers → Profiel → Toepassingswachtwoorden
2. Maak er een aan met de naam `productimport`
3. Zet in `.env.local`:

```
WP_USER=jouw-wp-gebruikersnaam
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
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
| `bol.mjs` | Haalt bol.com-pagina's op en leest de JSON-LD |
| `bol-scrape.mjs` | Scrapet het hele assortiment naar `data/bol-scrape.jsonl` |
| `enrich-from-bol.mjs` | Zet beschrijvingen en foto's in WooCommerce |
| `wp-media.mjs` | Uploadt foto's naar de WordPress-mediabibliotheek |
| `fix-seo.mjs` | Repareert namen en alt-teksten na de import |

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
