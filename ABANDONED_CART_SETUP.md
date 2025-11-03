# Abandoned Cart Email Flow - Setup Instructies

## 📋 Overzicht

Dit systeem stuurt automatisch emails naar klanten die items in hun winkelwagen hebben maar niet hebben afgerekend.

### Email Flow:
- **2 uur na verlaten**: Email 1 - "Je winkelwagen wacht op je!" (geen korting)
- **24 uur na verlaten**: Email 2 - "5% EXTRA korting" met code COMEBACK5
- **Elke 3 dagen**: Email 3+ - Herinnering met 5% korting (blijft sturen tot bestelling)

---

## 🚀 Setup Stappen

### 1. Installeer Dependencies

```bash
npm install mysql2
```

### 2. Database Tabel Aanmaken

Voer het volgende SQL script uit in je WooCommerce database (via phpMyAdmin of MySQL client):

```bash
mysql -u [gebruikersnaam] -p [database_naam] < database/abandoned-cart-schema.sql
```

Of kopieer de SQL uit `database/abandoned-cart-schema.sql` en voer deze uit in phpMyAdmin.

### 3. Environment Variables Toevoegen

Voeg de volgende variabelen toe aan je `.env.local` (development) en Vercel Environment Variables (production):

```bash
# Database credentials (waarschijnlijk al geconfigureerd)
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name

# Resend API (waarschijnlijk al geconfigureerd)
RESEND_API_KEY=re_your_api_key

# Cron Secret (nieuw - genereer een willekeurige string)
CRON_SECRET=your-super-secret-random-string-here
```

**Genereer een CRON_SECRET:**
```bash
# In terminal:
openssl rand -base64 32
```

### 4. Vercel Environment Variables Instellen

1. Ga naar je Vercel Dashboard
2. Selecteer je project `stonesforhealth`
3. Ga naar **Settings** → **Environment Variables**
4. Voeg alle database credentials toe (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
5. Voeg `CRON_SECRET` toe met de gegenereerde waarde
6. Sla op

### 5. Deploy naar Vercel

```bash
git add .
git commit -m "Add abandoned cart email flow"
git push origin main
```

Vercel zal automatisch deployen en de cron job activeren.

### 6. Vercel Cron Job Verificatie

Na deployment:

1. Ga naar Vercel Dashboard → je project
2. Klik op **Settings** → **Crons**
3. Je zou moeten zien: `/api/cron/abandoned-cart` met schedule `0 * * * *` (elk uur)

---

## 🧪 Testen

### Development Testing (Lokaal)

Je kunt de cron job handmatig testen:

```bash
# In je terminal:
curl -X POST http://localhost:3000/api/cron/abandoned-cart
```

### Production Testing

1. **Test het opslaan van abandoned cart:**
   - Ga naar je checkout pagina
   - Vul een test email in
   - Verlaat de pagina zonder te bestellen
   - Check de database of de cart is opgeslagen

2. **Check database:**
```sql
SELECT * FROM wp_abandoned_carts ORDER BY created_at DESC LIMIT 10;
```

3. **Handmatig een email triggeren:**
   - Update `created_at` in database naar 3 uur geleden:
```sql
UPDATE wp_abandoned_carts
SET created_at = DATE_SUB(NOW(), INTERVAL 3 HOUR)
WHERE customer_email = 'your-test@email.com';
```
   - Wacht tot de volgende cron run (elk uur)
   - Of trigger handmatig via Vercel Cron in dashboard

---

## 📊 Monitoring

### Database Queries

**Bekijk alle abandoned carts:**
```sql
SELECT id, customer_email, cart_total, email_count, status, created_at, last_email_sent_at
FROM wp_abandoned_carts
WHERE status = 'pending'
ORDER BY created_at DESC;
```

**Bekijk recovered carts (successen!):**
```sql
SELECT COUNT(*) as recovered_count, SUM(cart_total) as total_revenue
FROM wp_abandoned_carts
WHERE status = 'recovered';
```

**Emails verzonden vandaag:**
```sql
SELECT email_count, COUNT(*) as count
FROM wp_abandoned_carts
WHERE DATE(last_email_sent_at) = CURDATE()
GROUP BY email_count;
```

### Vercel Logs

Check cron job logs in Vercel:
1. Vercel Dashboard → je project
2. **Functions** tab
3. Zoek naar `/api/cron/abandoned-cart`
4. Bekijk execution logs

---

## 🔧 Configuratie Aanpassen

### Timing Aanpassen

In `/app/api/cron/abandoned-cart/route.ts`, pas de SQL query aan:

```typescript
// Email 1: Na X uren
(email_count = 0 AND TIMESTAMPDIFF(HOUR, created_at, NOW()) >= 2)  // Verander 2 naar gewenst aantal uren

// Email 2: Na X uren na email 1
(email_count = 1 AND TIMESTAMPDIFF(HOUR, last_email_sent_at, NOW()) >= 22)  // Verander 22 naar gewenst aantal

// Email 3+: Elke X dagen
(email_count >= 2 AND TIMESTAMPDIFF(DAY, last_email_sent_at, NOW()) >= 3)  // Verander 3 naar gewenst aantal dagen
```

### Kortingspercentage Aanpassen

In `/app/api/cron/abandoned-cart/route.ts`, functie `createRecoveryCoupon`:

```typescript
amount: '5',  // Verander '5' naar gewenst percentage (bijv. '10' voor 10%)
```

Ook updaten in email templates:
- `/app/emails/AbandonedCartEmail2.tsx`

### Cron Frequency Aanpassen

In `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/abandoned-cart",
      "schedule": "0 * * * *"  // Elk uur
      // "0 */2 * * *"  // Elke 2 uur
      // "0 */6 * * *"  // Elke 6 uur
      // "0 9,15,21 * * *"  // 3x per dag (9:00, 15:00, 21:00)
    }
  ]
}
```

---

## 🛡️ Beveiliging

### CRON_SECRET

De cron endpoint is beveiligd met een secret token. Zonder het juiste token kan niemand de cron job handmatig triggeren.

**Belangrijk:** Deel de `CRON_SECRET` nooit publiekelijk en commit deze niet naar git!

### Email Rate Limiting

De cron job verwerkt max 50 carts per run met een 100ms delay tussen emails om rate limiting te voorkomen.

---

## 📈 Conversie Tracking

### Cart Recovery

Wanneer een klant een bestelling plaatst, markeer de cart als recovered:

```typescript
// In je order success handler:
await fetch('/api/abandoned-cart/save', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: customerEmail,
    orderId: order.id
  })
});
```

Dit is **al geïmplementeerd** in de checkout flow.

---

## ❓ Troubleshooting

### Emails worden niet verzonden

1. **Check database:** Zijn er carts met `status = 'pending'`?
2. **Check timing:** Is `created_at` lang genoeg geleden?
3. **Check Vercel cron logs:** Draait de cron job?
4. **Check Resend API:** Is je API key geldig?
5. **Check CRON_SECRET:** Is deze correct ingesteld in Vercel?

### Cron job faalt

```bash
# Check Vercel logs
vercel logs [your-project-url]

# Of via dashboard:
Vercel Dashboard → Project → Functions → /api/cron/abandoned-cart
```

### Database connection errors

Verify je database credentials in environment variables.

### Emails gaan naar spam

1. Verify je domain in Resend
2. Setup SPF, DKIM, DMARC records
3. Zorg dat `from` email een geverifieerd domain gebruikt

---

## 📝 Maintenance

### Clean-up oude carts

De cron job markeert automatisch carts ouder dan 30 dagen als 'abandoned'.

Je kunt deze periodiek verwijderen:

```sql
DELETE FROM wp_abandoned_carts
WHERE status = 'abandoned'
AND TIMESTAMPDIFF(DAY, created_at, NOW()) > 90;
```

---

## 🎉 Klaar!

Je abandoned cart email flow is nu actief!

**Verwachte resultaten:**
- 10-15% cart recovery rate
- Gemiddeld €X extra omzet per maand
- Betere customer experience

**Support:** Bij vragen, check de logs of neem contact op met je developer.
