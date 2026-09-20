# Blogs publiceren

De webshop draait headless: de winkel zelf zit in code, maar **WordPress blijft
het CMS voor de blog**. Er komt dus geen developer meer aan te pas om een blog
te plaatsen.

---

## Voor de redactie

### Waar
`https://admin.stonesforhealth.nl/wp-admin` → linkermenu **Berichten** → **Nieuw bericht**

Directe link: `https://admin.stonesforhealth.nl/wp-admin/post-new.php`

> **Let op:** "Berichten" is de blog. "Producten" is de webshop — daar niets
> wijzigen, dat loopt via WooCommerce.

### Wat invullen

| Veld | Waar staat het | Wat het op de site doet |
|---|---|---|
| **Titel** | Bovenaan | De kop van het artikel en de titel in Google |
| **Tekst** | Het grote vlak | Het artikel zelf |
| **Uitgelichte afbeelding** | Rechterzijbalk, onderaan | De foto in het blogoverzicht én bovenaan het artikel |
| **Categorie** | Rechterzijbalk | Het paarse labeltje (Kristallen, Spiritualiteit, …) |
| **Samenvatting** | Rechterzijbalk ("Samenvatting") | Het tekstje onder de titel in het overzicht |
| **Permalink** | Onder de titel | De URL: `stonesforhealth.nl/blog/<permalink>` |

**De uitgelichte afbeelding is verplicht.** Zonder die foto valt de blog terug
op een standaardafbeelding en ziet het overzicht er rommelig uit. Dat veld zit
rechtsonder in de zijbalk en wordt vaak over het hoofd gezien.

### Tekst uit Word of Google Docs
Kopieer en plak rechtstreeks in de WP-editor. Koppen, vetgedrukte tekst, lijsten
en links komen dan mee.

Plak **geen** tekst uit een PDF: daar zit geen opmaak in, dus alles wordt één
lange lap tekst zonder koppen. Dat leest slecht en scoort slecht in Google.

### Publiceren
Knop **Publiceren** rechtsboven. De blog staat binnen enkele seconden op
`https://www.stonesforhealth.nl/blog`.

Naast elk bericht in de lijst staat een link **"Bekijk op webshop"** die direct
naar de juiste pagina gaat.

### Google
Nieuwe blogs komen automatisch in `sitemap.xml` te staan. Google pikt dat
vanzelf op, meestal binnen een paar dagen. Sneller kan via Google Search
Console → URL-inspectie → "Indexering aanvragen".

---

## Voor de developer

### Hoe het werkt

```
WordPress (admin.stonesforhealth.nl)
  │  Berichten → Publiceren
  │
  ├─→ mu-plugin vuurt webhook ─────→ /api/revalidate-blog  (direct live)
  │
  └─→ WP REST API /wp-json/wp/v2/posts
        │
        ├─→ lib/wordpress.ts        ophalen + normaliseren
        ├─→ app/blog/page.tsx       overzicht (WP-posts bovenaan)
        ├─→ app/blog/[slug]/        het artikel
        └─→ app/sitemap.ts          sitemap
```

### Bestanden

| Bestand | Rol |
|---|---|
| `lib/wordpress.ts` | Ophalen en normaliseren van WP-posts |
| `app/blog/[slug]/page.tsx` | Rendert een WP-blog |
| `app/blog/page.tsx` | Overzicht, volledig uit WordPress |
| `app/api/revalidate-blog/route.ts` | Webhook voor direct publiceren |
| `app/globals.css` (`.wp-content`) | Opmaak van de HTML uit de WP-editor |
| `wordpress/s4h-blog-webhook.php` | mu-plugin op de WordPress-kant |

### Migratie van de oude blogs
De 38 blogs die eerder hardgecodeerd in `app/blog/<slug>/page.tsx` stonden, zijn
allemaal naar WordPress overgezet. Die mappen zijn verwijderd; er staat geen
enkele blog meer in code. Alle URLs zijn hetzelfde gebleven.

Wat er is meegegaan: titel, volledige tekst met koppen en lijsten, uitgelichte
afbeelding, categorie, samenvatting en publicatiedatum. Interne links naar
producten en andere blogs zijn omgezet naar volledige URLs.

Tekst wijzigen in WordPress werkt nu dus ook voor die 38: aanpassen en
bijwerken, en de webshop volgt direct.

### Uitrollen

1. **Vercel** → Project Settings → Environment Variables:
   `BLOG_REVALIDATE_SECRET` = het geheim uit `.env.local` (Production + Preview)
2. **WordPress**: upload `wordpress/s4h-blog-webhook.php` naar
   `wp-content/mu-plugins/` en zet daarin hetzelfde geheim bij
   `S4H_REVALIDATE_SECRET`
3. **Gebruiker aanmaken**: WP admin → Gebruikers → Nieuwe gebruiker, rol
   **Auteur** (mag eigen berichten schrijven en publiceren, komt niet bij
   producten, instellingen of bestellingen)

### Zonder webhook
Dan komt een nieuwe blog er alsnog op, maar pas na de ISR-termijn van 5 minuten
(`revalidate = 300`). De webhook maakt het direct.

### Handmatig verversen
```bash
curl "https://www.stonesforhealth.nl/api/revalidate-blog?secret=<geheim>&slug=<slug>"
```
