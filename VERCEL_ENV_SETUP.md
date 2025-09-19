# Vercel Environment Variables Setup

## Stappen om de environment variables in Vercel bij te werken:

### 1. Login op Vercel Dashboard
Ga naar https://vercel.com en log in met je account.

### 2. Selecteer het Project
Klik op het **stonesforhealth** project in je dashboard.

### 3. Ga naar Environment Variables
- Klik op **Settings** in de project navigatie
- Klik op **Environment Variables** in het linker menu

### 4. Update de WooCommerce URL
Zoek naar `NEXT_PUBLIC_WOOCOMMERCE_URL` en update de waarde:

**Oude waarde:**
```
https://wordpress.123noodboxen.nl/wp-json/wc/v3
```

**Nieuwe waarde:**
```
https://wordpress.stonesforhealth.nl/wp-json/wc/v3
```

### 5. Belangrijke Environment Variables

Zorg ervoor dat deze variables correct zijn ingesteld:

| Variable Name | Value | Environment |
|--------------|-------|------------|
| `NEXT_PUBLIC_WOOCOMMERCE_URL` | `https://wordpress.stonesforhealth.nl/wp-json/wc/v3` | Production, Preview, Development |
| `WOOCOMMERCE_CONSUMER_KEY` | `ck_...` (je API key) | Production, Preview, Development |
| `WOOCOMMERCE_CONSUMER_SECRET` | `cs_...` (je API secret) | Production, Preview, Development |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Production |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://stonesforhealth.nl` | Production |

### 6. Deploy de Wijzigingen
Na het updaten van de environment variables:
1. Klik op **Save** bij elke gewijzigde variable
2. Ga naar **Deployments** tab
3. Klik op de drie puntjes (...) bij de laatste deployment
4. Kies **Redeploy** om de nieuwe environment variables te activeren

### 7. Verificatie
Na de deployment, controleer:
- Of de website correct werkt op https://stonesforhealth.nl
- Of producten correct worden geladen
- Of bestellingen correct worden verwerkt

## Stripe Webhook Setup (Production)

Wanneer de site live is, configureer de Stripe webhook:

1. Ga naar https://dashboard.stripe.com/webhooks
2. Klik op **Add endpoint**
3. Endpoint URL: `https://stonesforhealth.nl/api/stripe-webhook`
4. Selecteer deze events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Kopieer de **Signing secret** (begint met `whsec_`)
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel met deze waarde

## Troubleshooting

Als de API verbinding niet werkt:
1. Controleer of WordPress actief is op https://wordpress.stonesforhealth.nl
2. Verifieer dat WooCommerce REST API is ingeschakeld
3. Check of de API keys correct zijn (begin met `ck_` en `cs_`)
4. Zorg dat permalinks zijn ingeschakeld in WordPress

## Contact
Bij problemen, check de Vercel deployment logs of neem contact op met de developer.