# Project History - Stones for Health

## 2026-01-23 - Yoast SEO Headless Integratie

**Wat:** WordPress Yoast SEO data koppelen aan Next.js frontend

**Probleem:** SEO werd niet beheerd vanuit WordPress, klant kon geen meta titles/descriptions aanpassen

**Oplossing:**

1. **WordPress kant** - PHP filter toegevoegd aan `functions.php`:
   - Voegt `yoast_seo` object toe aan WooCommerce REST API response
   - Bevat: title, meta_description, focus_keyword, canonical_url
   - Fallback naar product naam als Yoast velden leeg zijn

2. **Next.js kant** - Was al aanwezig:
   - Product interface in `/lib/woocommerce.ts` had al `yoast_seo` type
   - `generateMetadata()` in `/app/(main)/product/[slug]/page.tsx` gebruikt Yoast data
   - Sitemap in `/app/sitemap.ts` al geconfigureerd
   - Structured data (schema.org) al aanwezig

**Workflow voor klant:**
1. WooCommerce → Producten → Product bewerken
2. Yoast SEO sectie invullen (titel, beschrijving, focus keyword)
3. Opslaan → Next.js haalt data automatisch op

**Status:** Voltooid

---

## 2026-01-23 - Dead Code Cleanup

**Wat:** Ongebruikte bestanden en code verwijderd voor betere performance

**Verwijderd:**
1. Backup bestanden (8 stuks, ~150 KB):
   - `Header.backup.tsx`
   - `Header.tsx.megamenu-backup-20251020-002309`
   - `stripe-webhook/route.ts.backup`
   - `page.tsx.backup-20251020-000711`
   - `product/[slug]/page.tsx.backup-20251020-000727`
   - `woocommerce.ts.backup-20251020-000523`
   - `.env.local.backup` (security risk)
   - `pages.bak/` directory

2. Ongebruikte code:
   - `app/contexts/CartContext.tsx` (vervangen door CartContextStoreAPI)
   - `/api/test-store` endpoint
   - `/api/test-add-cart` endpoint
   - `/app/(main)/test-store-api` pagina

**Status:** Voltooid
