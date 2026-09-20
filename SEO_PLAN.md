# SEO Actieplan — stonesforhealth.nl

Audit: 21-09-2026 · Search Console geverifieerd als `sc-domain:stonesforhealth.nl` · GA4 `G-MK8E1TDJBE`

---

## Kernprobleem

De site **redirect alles naar `www`** (apex → 308 → www), maar **bijna alle SEO-signalen wijzen naar non-www**.
Google krijgt dus overal tegenstrijdige instructies. Dit is fase 1 en blokkeert de rest.

| Signaal | Staat nu | Moet zijn |
|---|---|---|
| Werkelijke site | `https://www.stonesforhealth.nl` ✅ | — |
| `metadataBase` (layout.tsx:39) | `https://stonesforhealth.nl` ❌ | www |
| Handmatige canonicals (~8 bestanden) | `https://stonesforhealth.nl/...` ❌ | www |
| `robots.txt` → Host + Sitemap | non-www ❌ | www |
| `server-sitemap.xml` → 110 URLs | non-www ❌ | www |
| `app/sitemap.ts` → 105 URLs | www ✅ | — |

---

## FASE 1 — Canonical fixen (KRITIEK)

> Impact: hoog · Tijd: ~30 min · Zonder dit is de rest zinloos

- [x] 1.1 `app/layout.tsx:39` → `metadataBase: new URL('https://www.stonesforhealth.nl')`
- [x] 1.2 Alle hardcoded canonicals naar www (`alle-producten`, `contact`, `verzending`, + overige layouts/pages)
- [ ] 1.3 Canonical centraal maken: relatieve paden i.c.m. `metadataBase` i.p.v. hardcoded absolute URLs
- [x] 1.4 `next-sitemap.config.js` → `siteUrl: 'https://www.stonesforhealth.nl'`
- [x] 1.5 `server-sitemap/route.ts` → alle `loc` naar www
- [x] 1.6 `public/robots.txt` → `Host:` en `Sitemap:` naar www

---

## FASE 2 — Sitemaps opschonen (KRITIEK)

> Impact: hoog · Tijd: ~45 min
> Nu draaien er **twee concurrerende sitemaps** met verschillende inhoud en verschillend domein.

- [x] 2.1 **Keuze: één sitemap.** Behoud `app/sitemap.ts` (native Next.js), schrap `server-sitemap.xml`
- [x] 2.2 `/checkout` en `/cart` **uit** sitemap.ts halen — die staan in robots.txt op Disallow (direct conflict)
- [x] 2.3 **40+ blogposts toevoegen** — staan nu in GEEN ENKELE sitemap ⚠️ grootste gemiste kans
- [x] 2.4 Collectiepagina's toevoegen (`/collections/[slug]`)
- [x] 2.5 Statische pagina's toevoegen: `/alle-producten`, `/bestsellers`, `/contact`, `/verzending`, `/faq`
- [x] 2.6 `per_page: 100` → paginatie, anders mis je producten boven de 100
- [x] 2.7 robots.txt → alleen nog naar `https://www.stonesforhealth.nl/sitemap.xml`
- [x] 2.8 `noindex` op checkout/cart/thank-you/volg-je-bestelling (robots.txt blokkeert crawl, maar niet indexering)

---

## FASE 3 — 404's en dode routes

> Impact: middel-hoog · Tijd: ~20 min

- [x] 3.1 `app/(main)/page.tsx:322` linkt naar `/collectie/${slug}` → **geeft 404**. Moet `/collections/${slug}` zijn
- [x] 3.2 Lege route `app/(main)/collectie/[slug]` verwijderen
- [x] 3.3 301-redirect `/collectie/*` → `/collections/*` in `next.config.ts` (voor eventuele oude links)
- [ ] 3.4 Volledige crawl draaien om resterende 404's te vinden

---

## FASE 4 — Structured data (rich results)

> Impact: hoog voor CTR · Tijd: ~1 uur

- [x] 4.1 **Organization** schema in root layout (logo, naam, social, contact)
- [x] 4.2 **WebSite** schema met `SearchAction` (sitelinks searchbox)
- [ ] 4.3 **BreadcrumbList** op product- en collectiepagina's
- [ ] 4.4 Collectiepagina's: `ItemList` schema — nu **geen enkele** structured data
- [x] 4.5 Product schema controleren: `price`, `availability`, `priceValidUntil`, `aggregateRating`, `shippingDetails`, `hasMerchantReturnPolicy` — Google vereist deze laatste twee sinds 2024
- [ ] 4.6 Alles valideren via Rich Results Test

Status: product ✅ · blogs ✅ (43×) · FAQ ✅ · collecties ❌ · Organization ❌ · Breadcrumbs ❌

---

## FASE 5 — Core Web Vitals (performance)

> Impact: hoog · Tijd: ~2 uur · `public/` is **63 MB**

- [x] 5.1 `bannerhome.mp4` = **5,4 MB** op de homepage → LCP-killer. Comprimeren naar <1 MB, `poster` toevoegen, lazy/preload-strategie
- [x] 5.2 `banner.mp4` (7,8 MB) — wordt nergens gebruikt → verwijderen
- [ ] 5.3 15+ PNG's van 1–2,5 MB → converteren naar WebP/AVIF (`logo.png` is 1,2 MB voor een logo!)
- [ ] 5.4 10× `<img>` vervangen door `next/image` (lazy loading, srcset, geen CLS)
- [x] 5.5 `width`/`height` overal expliciet → voorkomt layout shift
- [ ] 5.6 PageSpeed Insights meten vóór en na

---

## FASE 6 — GA4 + Search Console koppelen

> Impact: middel · Tijd: ~30 min

- [x] 6.1 ⚠️ **Consent Mode v2 incompleet** — `ad_user_data` en `ad_personalization` ontbreken in `GoogleAnalytics.tsx`. Sinds maart 2024 verplicht voor EU-verkeer, anders loopt remarketing/Ads-data leeg
- [ ] 6.2 GA4 ↔ Search Console koppelen (GA4 → Beheer → Productkoppelingen)
- [ ] 6.3 Verifiëren dat property `486850317` daadwerkelijk bij `G-MK8E1TDJBE` hoort
- [x] 6.4 Meetings-ID naar env var i.p.v. hardcoded
- [ ] 6.5 E-commerce events controleren: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`
- [ ] 6.6 In Search Console: sitemap indienen + Bing Webmaster Tools aanzetten

---

## FASE 7 — Meta tags & content

> Impact: middel · Tijd: ~1,5 uur

- [ ] 7.1 Dubbele metadata opruimen (zowel `layout.tsx` als `page.tsx` in dezelfde route — rommelig)
- [ ] 7.2 Titels: max 60 tekens, merknaam consistent achteraan (`| Stones for Health`)
- [ ] 7.3 Descriptions: 150–160 tekens, uniek, met call-to-action
- [x] 7.4 OG-image: nu `/logo.png` (1024×1024, 1,2 MB) → echte 1200×630 OG-image maken
- [ ] 7.5 Alt-teksten op alle productafbeeldingen (nu deels leeg)
- [ ] 7.6 Interne links: blogs ↔ producten koppelen
- [ ] 7.7 `lang="nl"` ✅ al goed

---

## Volgorde van uitvoeren

```
Fase 1  →  Fase 2  →  Fase 3     ← technische basis, moet eerst
   ↓
Fase 4  +  Fase 6                ← parallel mogelijk
   ↓
Fase 5  →  Fase 7                ← doorlopend
```

**Quick wins eerst (samen ~1,5 uur, grootste effect):**
1. Canonical naar www (1.1–1.6)
2. Blogs in sitemap (2.3)
3. 404-link op homepage (3.1)
4. Consent Mode v2 (6.1)


---

## Uitgevoerd op 21-09-2026

### Resultaat in cijfers

| | Voor | Na |
|---|---|---|
| URLs in sitemap | 105 (+110 dubbel, non-www) | **271** (één sitemap, www) |
| Blogs in sitemap | 0 | **38** |
| Collecties in sitemap | 0 | **68** |
| Producten in sitemap | 100 (gecapt) | **154** (paginatie) |
| non-www verwijzingen | 234 | **0** |
| Homepage-video | 5,4 MB | **617 KB** + poster |
| USP-iconen (productpagina) | 3,9 MB SVG | **23 KB** WebP |
| logo.png | 1,2 MB | **69 KB** |
| OG-image | 1024×1024, 1,2 MB | **1200×630, 16 KB** |
| `public/` totaal | 63 MB | **46 MB** |

### Ook gevonden en gerepareerd (stond niet in de audit)

- **Fake review-markup**: elk product claimde `aggregateRating` 4,8 met 127 reviews,
  terwijl de echte Woo-data 0,00 met 0 reviews is. Dit is spammy structured markup
  en kan een handmatige Google-penalty opleveren. Nu alleen een rating bij echte reviews.
- **Placeholder telefoonnummer** `+31-6-12345678` stond in het Organization-schema.
- **Niet-bestaande social profielen** (`facebook.com/stonesforhealth`, idem Instagram)
  stonden als `sameAs` in het schema — die pagina's bestaan niet.
- **SearchAction-schema** wees naar `/zoeken`, wat een 404 geeft (zoeken zit in een modal).
- **`structuredData.ts`** bestond met 9 schema-functies, maar werd nergens geïmporteerd.
- **`next-sitemap`** stond geconfigureerd maar draaide nooit (geen `postbuild` script).
- **Blog `zilveren-koord-slapen-zoutlampen-spirituele-tips`** bestaat als pagina maar
  ontbreekt in de lijst op `/blog` — wel nu in de sitemap.

---

## Openstaand

### Vereist jouw beslissing
- [ ] **46 MB ongebruikte afbeeldingen** in `public/` (sterrenbeelden, elementen, intenties).
      Nergens in de code gebruikt. Kosten bezoekers niets, wel repo- en deploytijd. Weggooien?
- [ ] **Nep-testimonials**: de homepage toont 4 avatars van `i.pravatar.cc` (een
      placeholder-service) met alt-teksten als "Verified Stonesforhealth klant".
      Vervangen door echte klanten of weghalen.
- [ ] **USP alt-teksten kloppen niet**: `usp1` toont een wereldbol met blad maar heeft
      alt "Kwaliteit"; `usp4` toont een kristal met alt "Bescherming". Omwisselen?
- [ ] Echt telefoonnummer + bestaande social-profielen aanleveren voor het Organization-schema

### Handmatig in Google (kan ik niet voor je doen)
- [ ] 6.2 GA4 ↔ Search Console koppelen (GA4 → Beheer → Productkoppelingen)
- [ ] 6.3 Verifiëren dat GA4-property 486850317 bij `G-MK8E1TDJBE` hoort
- [ ] 6.5 E-commerce events controleren (`view_item`, `add_to_cart`, `purchase`)
- [ ] 6.6 Sitemap indienen: `https://www.stonesforhealth.nl/sitemap.xml`
- [ ] 6.6 Oude sitemap `server-sitemap.xml` verwijderen in Search Console
- [ ] Bing Webmaster Tools aanzetten

### Nog te doen in code
- [ ] 4.3 BreadcrumbList-schema aansluiten (component bestaat al, wordt niet gebruikt)
- [ ] 4.4 ItemList-schema op collectiepagina's
- [ ] 4.6 Valideren via Rich Results Test (kan pas na deploy)
- [ ] 5.3 Resterende grote PNG's naar WebP (alleen zinvol als ze gebruikt gaan worden)
- [ ] 5.6 PageSpeed meten na deploy
- [ ] 7.1 Dubbele metadata opruimen (`layout.tsx` + `page.tsx` in dezelfde route)
- [ ] 7.2/7.3 Titels en descriptions doorlopen op lengte
- [ ] 7.5 Alt-teksten productafbeeldingen
- [ ] 7.6 Interne links blogs ↔ producten
- [ ] Blog `zilveren-koord-...` toevoegen aan de lijst op `/blog`
