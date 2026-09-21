# Yoast SEO in een headless setup — analyse

Onderzocht: 21-09-2026 · backend `admin.stonesforhealth.nl` · frontend `www.stonesforhealth.nl` (Next.js op Vercel)

---

## 1. Wat er nu is

### Yoast draait niet

| Check | Resultaat |
|---|---|
| `yoast/v1` in REST-namespaces | ❌ afwezig |
| `yoast_head_json` op `wp/v2/posts` | ❌ afwezig |
| `yoast_seo` op `wc/v3/products` | ❌ afwezig |
| Yoast-meta in `meta_data` | ❌ alleen `_ean` |
| `<meta name="generator">` | WordPress 7.1.1, WooCommerce 11.1.1 — geen SEO-plugin |

**Yoast is nooit geïnstalleerd geweest.**

### Maar de frontend verwacht het al

De code leest op drie plekken Yoast-velden die altijd `undefined` zijn en dus altijd terugvallen:

```
app/(main)/product/[slug]/page.tsx:66-74   product.yoast_seo?.title
                                            product.yoast_seo?.meta_description
                                            product.yoast_seo?.canonical_url
                                            product.yoast_seo?.focus_keyword
lib/woocommerce.ts:53-59                    type-definitie, comment "added via WordPress filter"
lib/wordpress.ts:56,129,133                 post.yoast_head_json?.title / .description
```

Iemand heeft de integratie dus ooit voorbereid, maar de WordPress-kant is er nooit gekomen.

### Wat dat makkelijk maakt

| Gunstig | Waarom het telt |
|---|---|
| `wp/v2/product` geeft **200** | Het product-CPT zit in de WP REST API. Yoast vult daar `yoast_head_json` **automatisch** — geen PHP nodig. |
| Code Snippets plugin draait | PHP toevoegen kan via de admin, zonder FTP of child theme. |
| Blogs komen al uit WordPress | Sinds PR #17 leest `lib/wordpress.ts` `wp/v2/posts`. Daar werkt Yoast meteen. |
| Backend staat op `noindex` | Geen duplicate content tussen backend en frontend. **Let op: dit botst met Yoast — zie §3.** |

---

## 2. Waarom headless Yoast niet vanzelf werkt

Yoast is gebouwd om de `<head>` van WordPress zélf te vullen. In headless gebruik je alleen de data. Vier dingen breken daarbij:

### 2.1 Yoast slaat templates op, geen tekst

In de database staat niet de titel maar het sjabloon:

```
_yoast_wpseo_title  →  %%title%% %%page%% %%sep%% %%sitename%%
```

Lees je de meta rauw uit, dan krijg je die placeholders in je `<title>`. Ze moeten door `wpseo_replace_vars()`.

**`yoast_head_json` doet dit al** — dat veld bevat de gerenderde tekst. Rauwe meta uitlezen is de valkuil.

### 2.2 Canonicals wijzen naar de backend

Yoast bouwt canonicals op de WordPress-URL:

```
Yoast geeft:   https://admin.stonesforhealth.nl/product/s4h-rozenkwarts-pendel/
Nodig:         https://www.stonesforhealth.nl/product/s4h-rozenkwarts-pendel
```

Neem je dat klakkeloos over, dan wijs je Google naar een `noindex`-backend. Dat is erger dan geen canonical.

### 2.3 De noindex-instelling lekt mee ⚠️

De backend staat op *"Zoekmachines ontmoedigen"* (`noindex, nofollow` op elke pagina). Dat is correct voor de backend, **maar Yoast zet die noindex ook in `yoast_head_json.robots`**.

Neem je dat veld over, dan zet je je hele webshop op noindex. Dat is het grootste risico van deze operatie.

### 2.4 Yoast-schema botst met je eigen schema

`yoast_head_json.schema` bevat een `@graph` met Organization, WebSite, BreadcrumbList — allemaal met `admin.stonesforhealth.nl`-URLs. Je hebt die schema's al in `app/lib/structuredData.ts`, met de juiste URLs.

Twee keer Organization-schema op één pagina is een conflict.

---

## 3. De regel die alles oplost

> **Neem van Yoast alleen `title`, `description` en `focus keyword` over. Negeer `canonical`, `robots`, `schema` en `og:url`.**

Die drie velden zijn precies waar Yoast waarde toevoegt: redactionele controle. De rest heb je al beter geregeld in Next.js.

---

## 4. Drie routes, afgewogen

### Route A — `wp/v2/product` + `wp/v2/posts` (geen PHP)

Yoast vult `yoast_head_json` automatisch op beide endpoints.

```
GET /wp-json/wp/v2/product?slug=<slug>&_fields=slug,yoast_head_json
GET /wp-json/wp/v2/posts?slug=<slug>&_fields=slug,yoast_head_json
```

| ✅ | ❌ |
|---|---|
| Nul PHP, nul onderhoud | Tweede API-call per productpagina |
| Overleeft elke Yoast-update | Twee bronnen om te cachen |
| Werkt meteen na installatie | `wp/v2/product` is publiek — check of dat gewenst is |

### Route B — PHP-filter op het Woo-endpoint (past bij bestaande code)

Eén snippet voegt `yoast_seo` toe aan `wc/v3/products` — exact de vorm die `lib/woocommerce.ts:54` al verwacht.

| ✅ | ❌ |
|---|---|
| Eén API-call, bestaande code werkt meteen | ~25 regels PHP in Code Snippets |
| Geen extra latency | Breekt als Yoast zijn API wijzigt (zeldzaam) |
| Type-definitie staat al klaar | Iemand moet die snippet onderhouden |

### Route C — `yoast/v1/get_head?url=`

Officieel headless-endpoint van Yoast.

| ✅ | ❌ |
|---|---|
| Alles in één response | Verwacht de **WP**-URL, niet de frontend-URL |
| | Extra call per pagina, traag |
| | Levert juist de velden die je níet wilt |

**Niet doen** in dit geval.

---

## 5. Aanbeveling: Route B

Omdat de frontend-code er al op gebouwd is (`product.yoast_seo`), is dit de kortste weg: installeren, snippet plakken, klaar. Voor blogs werkt Route A automatisch mee, zonder extra werk.

### Stap 1 — Yoast installeren

WordPress → Plugins → Nieuwe plugin → "Yoast SEO" → activeren.
De gratis versie volstaat; Premium voegt vooral redirects en meerdere focus-keywords toe, die je in headless nauwelijks gebruikt.

### Stap 2 — Snippet toevoegen (Code Snippets → Nieuw)

```php
<?php
/**
 * Voegt Yoast-velden toe aan de WooCommerce REST API.
 * De frontend (Next.js) leest product.yoast_seo en gebruikt alleen
 * title, meta_description en focus_keyword. Canonical, robots en schema
 * komen bewust uit de frontend zelf.
 */
add_filter( 'woocommerce_rest_prepare_product_object', function ( $response, $product ) {
    if ( ! class_exists( 'WPSEO_Frontend' ) && ! function_exists( 'wpseo_replace_vars' ) ) {
        return $response;
    }

    $id = $product->get_id();

    // Yoast bewaart sjablonen (%%title%% %%sep%% %%sitename%%), geen tekst.
    // wpseo_replace_vars rendert ze naar de titel die Google te zien krijgt.
    $raw_title = get_post_meta( $id, '_yoast_wpseo_title', true );
    $raw_desc  = get_post_meta( $id, '_yoast_wpseo_metadesc', true );
    $post      = get_post( $id );

    $title = $raw_title ? wpseo_replace_vars( $raw_title, $post ) : '';
    $desc  = $raw_desc  ? wpseo_replace_vars( $raw_desc,  $post ) : '';

    $response->data['yoast_seo'] = array(
        'title'            => $title,
        'meta_description' => $desc,
        'focus_keyword'    => get_post_meta( $id, '_yoast_wpseo_focuskw', true ),
        // Canonical op de frontend-URL, niet op admin.stonesforhealth.nl
        'canonical_url'    => 'https://www.stonesforhealth.nl/product/' . $product->get_slug(),
    );

    return $response;
}, 10, 2 );
```

Let op: lege velden komen als lege string terug. De frontend valt daar al op terug (`|| fallback`), dus een product zonder ingevulde Yoast-titel blijft gewoon werken.

### Stap 3 — Frontend: niets aanpassen voor producten

`app/(main)/product/[slug]/page.tsx` leest de velden al. Na stap 2 vult het zichzelf.

### Stap 4 — Blogs: één controle

`lib/wordpress.ts:129` leest `post.yoast_head_json?.title`. Dat werkt automatisch zodra Yoast draait — **maar** `yoast_head_json` bevat ook `robots`. Controleer dat die nergens wordt overgenomen (nu niet het geval, alleen `.title` en `.description` worden gelezen — goed).

### Stap 5 — De noindex-val

Laat *"Zoekmachines ontmoedigen"* in WordPress **aan staan**. Dat houdt de backend uit Google.

Zet het niet uit "omdat Yoast anders klaagt" — Yoast toont dan een waarschuwing in de admin die je kunt negeren. Zou je het uitzetten, dan wordt `admin.stonesforhealth.nl` indexeerbaar en krijg je duplicate content met je eigen webshop.

### Stap 6 — Yoast-instellingen die er wél toe doen

| Instelling | Waarde | Waarom |
|---|---|---|
| Zoekuiterlijk → Producten → Titelsjabloon | `%%title%% \| Stones for Health` | Consistent met de frontend |
| Zoekuiterlijk → Media → Bijlage-URL's | Omleiden | Voorkomt losse afbeeldingspagina's |
| XML-sitemaps | **Uit** | Next.js genereert de sitemap al (271 URLs) |
| Schema | Laat staan, **niet uitlezen** | Eigen schema in `structuredData.ts` is leidend |

---

## 6. Wat je hiermee wint — en wat niet

### Wint

- Je team kan per product een SEO-titel en -omschrijving schrijven zonder code
- Focus keyword + leesbaarheidsanalyse in de vertrouwde Yoast-UI
- Titels en descriptions worden data in plaats van hardcoded strings

### Wint níet

- **Sitemaps** — Next.js doet dat al beter (271 URLs, automatisch bijgewerkt)
- **Schema** — eigen implementatie is correcter, met de juiste URLs
- **Redirects** (Premium) — die horen in `next.config.ts`
- **Breadcrumbs** — die komen uit je eigen component
- **Core Web Vitals / interne links** — Yoast meet de WordPress-rendering, niet je Next.js-frontend

Je gebruikt dus een fractie van de plugin. Dat is prima, zolang je weet waarvoor.

---

## 7. Eerlijke tegenvraag

Als het enige doel is *"redacteuren moeten titel en description kunnen invullen"*, dan kan dat ook zonder Yoast:

| Aanpak | Werk | Voor wie |
|---|---|---|
| **Yoast** | plugin + 25 regels PHP | Team kent Yoast al, wil de analyse-UI |
| **Twee ACF-velden** | plugin + 5 regels PHP | Alleen titel/description nodig, minder overhead |
| **Native custom fields** | 0 plugins, 15 regels PHP | Minimalistisch, ruwere UI |
| **Rank Math** | plugin + 0 PHP | Heeft een betere headless REST API dan Yoast |

Rank Math is technisch de nettere keuze voor headless — het levert out-of-the-box een schoner REST-object. Maar als je team Yoast kent, weegt vertrouwdheid zwaarder dan die paar regels PHP.

---

## 8. Checklist

- [ ] Yoast SEO installeren en activeren
- [ ] Snippet uit §5 toevoegen via Code Snippets
- [ ] Controleren: `wc/v3/products` bevat nu `yoast_seo`
- [ ] Eén product een Yoast-titel geven en controleren of die live doorkomt
- [ ] Yoast XML-sitemaps **uit**
- [ ] "Zoekmachines ontmoedigen" **aan** laten
- [ ] Titelsjabloon voor producten instellen
- [ ] Controleren dat `yoast_head_json.robots` nergens wordt overgenomen
- [ ] Na een week: Search Console controleren op onverwachte noindex-meldingen

---

## 9. Uitgevoerd op 21-09-2026

| Stap | Status |
|---|---|
| Yoast SEO (gratis) geïnstalleerd en geactiveerd | ✅ |
| `yoast/v1` namespace beschikbaar | ✅ |
| `yoast_head_json` op `wp/v2/posts` (blogs) | ✅ automatisch |
| Snippet toegevoegd via Code Snippets (id 6) | ✅ |
| `yoast_seo` op `wc/v3/products` | ✅ |
| Yoast XML-sitemaps uitgezet | ✅ `/sitemap_index.xml` → 404 |
| Eigen sitemap intact | ✅ 272 URLs |
| Schema-aggregatie pop-up afgewezen | ✅ eigen schema blijft leidend |

### Geverifieerd met een testproduct

Product 185 (`ss4h-turkoois-hematiet-edelstenen-armband`) kreeg een Yoast-titel en -omschrijving.
De hele keten is daarna live gecontroleerd:

```
WordPress (Yoast-invoer)
  → _yoast_wpseo_title:  "Turkoois Armband kopen %%sep%% Bescherming & Aarding %%sep%% %%sitename%%"
  → wc/v3/products:      "Turkoois Armband kopen - Bescherming & Aarding - Stones for Health"   (sjabloon gerenderd)
  → live <title>:        "Turkoois Armband kopen - Bescherming & Aarding - Stones for Health"   ✅
  → live description:    "Handgemaakte turkoois en hematiet armband van 18 cm..."               ✅
  → live canonical:      "https://www.stonesforhealth.nl/product/ss4h-..."                      ✅
```

Doorlooptijd: ongeveer één minuut (`revalidate = 60` op de productpagina).

**Let op:** de titel en omschrijving op product 185 zijn testwaarden. Ze zijn bruikbaar,
maar pas ze gerust aan — of laat de medewerker dat doen.

### Bevestigd: de noindex-val is echt

`yoast_head_json.robots` geeft op deze site `{'index': 'noindex'}` terug, omdat de backend
op "zoekmachines ontmoedigen" staat. `lib/wordpress.ts` leest alleen `.title` en
`.description` — dat moet zo blijven. Wie daar ooit `robots` aan toevoegt, haalt de hele
webshop uit Google.
