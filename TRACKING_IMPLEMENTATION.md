# 🎯 Tracking & Analytics Implementation - StonesForHealth

## ✅ Wat is geïmplementeerd?

### 1. 🍪 Cookie Consent Banner (GDPR Compliant)
**Status:** ✅ Compleet

**Wat doet het:**
- Vraagt bezoekers om toestemming voor cookies
- Respecteert GDPR wetgeving
- Schakelt tracking alleen in na toestemming
- Moderne, professionele Nederlandse UI

**Files:**
- `app/components/CookieConsent.tsx` - De consent banner
- `app/components/GoogleAnalytics.tsx` - Updated met consent mode
- `app/components/MetaPixel.tsx` - Updated met consent mode

**Hoe werkt het:**
1. Bezoeker ziet banner bij eerste bezoek
2. Keuze wordt opgeslagen in localStorage
3. Tracking wordt automatisch geactiveerd/gedeactiveerd

---

### 2. 📊 Enhanced E-commerce Tracking
**Status:** ✅ Compleet

**Wat wordt getrackt:**
- ✅ Product views (elke keer dat iemand een product bekijkt)
- ✅ Add to cart (wanneer iemand iets in winkelwagen doet)
- ✅ Remove from cart (wanneer iemand iets verwijdert)
- ✅ Begin checkout (wanneer iemand naar checkout gaat)
- ✅ Purchases (succesvolle bestellingen)
- ✅ Newsletter signups
- ✅ Search queries

**Files:**
- `app/lib/analytics.ts` - Centrale tracking utilities
- `app/components/ProductCard.tsx` - Track add-to-cart
- `app/(main)/product/[slug]/HikeGemstoneProductPageV2.tsx` - Track product views
- `app/(main)/checkout/success/page.tsx` - Track purchases

**Wat zie je in Google Analytics 4:**

1. **Reports → Monetization → E-commerce purchases**
   - Welke producten het meest verkocht worden
   - Totale omzet per product
   - Gemiddelde orderwaarde
   - Conversie rates

2. **Reports → Engagement → Events**
   - `view_item` - Product bekeken
   - `add_to_cart` - Toegevoegd aan winkelwagen
   - `begin_checkout` - Checkout gestart
   - `purchase` - Aankoop voltooid

3. **Reports → Acquisition → Traffic acquisition**
   - Waar klanten vandaan komen
   - Welke marketing kanalen het beste werken
   - ROI per kanaal

---

### 3. 🎯 UTM Parameters & Referrer Tracking
**Status:** ✅ Compleet

**Wat doet het:**
- Automatisch UTM parameters detecteren en opslaan
- Referrer tracking (van welke site komen bezoekers)
- Landing page tracking
- Session persistentie

**Files:**
- `app/components/UTMTracker.tsx` - Automatische UTM tracking

**Hoe te gebruiken:**

**Voor marketing campagnes:**
```
https://stonesforhealth.nl?utm_source=instagram&utm_medium=social&utm_campaign=kerst2024
```

**Voor email campagnes:**
```
https://stonesforhealth.nl?utm_source=newsletter&utm_medium=email&utm_campaign=nieuweklanten
```

**Voor Google Ads:**
```
https://stonesforhealth.nl?utm_source=google&utm_medium=cpc&utm_campaign=edelstenen_nl
```

**Wat je ziet in GA4:**
- Reports → Acquisition → Traffic acquisition
- Reports → Engagement → Events (campaign_visit)

---

### 4. 🔍 Structured Data (JSON-LD) voor SEO
**Status:** ✅ Compleet

**Wat doet het:**
- Verbetert zichtbaarheid in Google Search
- Rich snippets (sterren, prijzen, etc.)
- Betere rankings

**Geïmplementeerde Schema's:**
- ✅ Organization (homepage)
- ✅ Product (product pages)
- ✅ Breadcrumb
- ✅ AggregateRating (reviews)
- ✅ Website Search

**Files:**
- `app/lib/structuredData.ts` - Alle schema generators
- `app/(main)/page.tsx` - Organization schema
- `app/(main)/product/[slug]/page.tsx` - Product schema

**Resultaat:**
- Producten verschijnen met sterren in Google
- Prijzen worden getoond in zoekresultaten
- Betere click-through rate (CTR)

---

## 📈 Hoe data te bekijken?

### Google Analytics 4

**1. Real-time data bekijken:**
- Ga naar GA4 Dashboard
- Reports → Realtime
- Zie live bezoekers en events

**2. E-commerce rapporten:**
- Reports → Monetization → E-commerce purchases
- Zie: Items purchased, Revenue, Average purchase revenue

**3. Conversie funnels:**
- Reports → Engagement → Conversions
- Zie: view_item → add_to_cart → begin_checkout → purchase

**4. Marketing prestaties:**
- Reports → Acquisition → Traffic acquisition
- Filter op UTM parameters
- Zie welke campagnes omzet genereren

### Meta Pixel (Facebook/Instagram)
- Events Manager: https://business.facebook.com/events_manager
- Zie: PageView, AddToCart, InitiateCheckout, Purchase

---

## 🚀 Volgende stappen (optioneel)

### Google Tag Manager (GTM)
**Status:** ⏳ Niet geïmplementeerd (optioneel)

**Voordelen:**
- Centraal beheer van alle tracking tags
- Makkelijk nieuwe tools toevoegen zonder code changes
- A/B testing support

**Wanneer implementeren:**
- Als je vaak nieuwe tracking tools wilt toevoegen
- Als je niet-developers toegang wilt geven tot tracking
- Voor geavanceerde event tracking

---

## 🧪 Testen

### Build geslaagd:
```bash
npm run build
✓ Build successful
```

### Handmatig testen:

**1. Cookie Consent:**
- Open site in incognito mode
- Check of banner verschijnt
- Test "Accepteren" en "Weigeren"

**2. E-commerce Tracking:**
- Open browser console
- Voer acties uit (product bekijken, add to cart, etc.)
- Check Network tab voor gtag events

**3. UTM Tracking:**
- Bezoek: `http://localhost:3000?utm_source=test&utm_medium=test`
- Check localStorage voor opgeslagen UTM data

**4. Structured Data:**
- Gebruik Google Rich Results Test: https://search.google.com/test/rich-results
- Test product pages voor Product schema

---

## 📊 Verwachte resultaten

**Binnen 1 week:**
- Data verschijnt in GA4
- Eerste conversie insights
- UTM tracking data

**Binnen 1 maand:**
- Duidelijke patronen in klantreis
- Best performing producten
- Marketing ROI inzichten
- SEO ranking verbeteringen

**Binnen 3 maanden:**
- Optimalisatie opportunities
- A/B test mogelijkheden
- Voorspelbare conversie rates

---

## 🛠️ Onderhoud

**Maandelijks:**
- Check GA4 voor anomalieën
- Bekijk top performing producten
- Analyseer marketing campagnes

**Per kwartaal:**
- Review conversie funnels
- Optimaliseer underperforming pages
- Update marketing strategie

---

## 📞 Support

Voor vragen over deze implementatie:
- Check Google Analytics 4 documentatie
- Test tracking in browser console
- Gebruik GA4 DebugView mode

---

## 🎉 Conclusie

Je webshop heeft nu:
- ✅ GDPR-compliant tracking
- ✅ Complete e-commerce analytics
- ✅ Marketing attribution
- ✅ SEO optimalisatie
- ✅ Professional tracking infrastructure

**Je kunt nu:**
- Precies zien waar klanten vandaan komen
- Begrijpen welke producten het beste verkopen
- Marketing ROI meten
- Data-driven beslissingen maken
- Omzet optimaliseren

**Veel succes met je webshop! 🚀**
