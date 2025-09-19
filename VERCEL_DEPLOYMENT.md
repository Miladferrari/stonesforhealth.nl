# Vercel Deployment Guide voor Stonesforhealth

## BELANGRIJKE Environment Variables

Je MOET de volgende environment variables instellen in Vercel:

### 1. WooCommerce API (VERPLICHT)
```
NEXT_PUBLIC_WOOCOMMERCE_URL=https://wordpress.stonesforhealth.nl/wp-json/wc/v3
WOOCOMMERCE_CONSUMER_KEY=[jouw consumer key]
WOOCOMMERCE_CONSUMER_SECRET=[jouw consumer secret]
```

### 2. Site URL (VERPLICHT)
```
NEXT_PUBLIC_SITE_URL=https://stonesforhealth.nl
```

### 3. Stripe (als je betalingen wilt)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[jouw Stripe publishable key]
STRIPE_SECRET_KEY=[jouw Stripe secret key]
STRIPE_WEBHOOK_SECRET=[jouw webhook secret]
```

## Stappen om in Vercel in te stellen:

1. **Ga naar Vercel Dashboard**
   - Log in op https://vercel.com
   - Selecteer je project

2. **Ga naar Settings**
   - Klik op "Settings" tab
   - Ga naar "Environment Variables"

3. **Voeg Variables toe**
   - Klik op "Add"
   - Voer de naam en waarde in
   - Selecteer "Production", "Preview" en "Development"
   - Klik "Save"

4. **Belangrijk voor de API keys:**
   - Gebruik EXACT dezelfde keys als in je .env.local
   - De keys die nu werken op localhost

5. **Redeploy**
   - Ga naar "Deployments"
   - Klik op de drie puntjes bij je laatste deployment
   - Klik "Redeploy"
   - Wacht tot het klaar is

## Checklist om te controleren:

- [ ] WordPress API is bereikbaar vanaf internet (niet alleen localhost)
- [ ] DNS records zijn correct (wordpress.stonesforhealth.nl moet bereikbaar zijn)
- [ ] SSL certificaat werkt op WordPress site
- [ ] WooCommerce REST API is ingeschakeld
- [ ] API keys hebben de juiste permissies (Read voor producten)

## Test na deployment:

1. Open de browser console (F12)
2. Ga naar Network tab
3. Ververs de pagina
4. Kijk of er API calls naar wordpress.stonesforhealth.nl gaan
5. Check of je 200 OK responses krijgt

## Troubleshooting:

### Probleem: Geen producten zichtbaar
- Check: Environment variables zijn correct ingesteld
- Check: WordPress API is bereikbaar vanaf Vercel servers
- Check: CORS headers zijn correct geconfigureerd

### Probleem: 401 Unauthorized
- Check: API keys zijn correct
- Check: Keys hebben de juiste permissies

### Probleem: Network errors
- Check: WordPress site heeft SSL certificaat
- Check: DNS is correct geconfigureerd

## CORS Headers voor WordPress

Als je CORS problemen hebt, voeg dit toe aan je WordPress .htaccess of functions.php:

```php
// In WordPress functions.php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://stonesforhealth.nl');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

Of in .htaccess:
```apache
Header set Access-Control-Allow-Origin "https://stonesforhealth.nl"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Authorization, Content-Type"
```

## Contact voor hulp

Als het nog steeds niet werkt na deze stappen, check:
1. Vercel deployment logs
2. Browser console voor errors
3. WordPress error logs