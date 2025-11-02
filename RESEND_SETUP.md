# Resend Email Setup Instructies

## Stap 1: Maak een Resend Account

1. Ga naar [resend.com](https://resend.com)
2. Klik op "Sign Up" en maak een gratis account
3. Verifieer je email adres

## Stap 2: Voeg je Domein Toe

1. Log in op Resend dashboard
2. Ga naar "Domains" in het menu
3. Klik op "Add Domain"
4. Voer in: `stonesforhealth.nl`
5. Je krijgt nu DNS records te zien die je moet toevoegen

### DNS Records toevoegen:

Je moet deze 3 records toevoegen bij je DNS provider (waar je domein gehost is):

**1. SPF Record (TXT)**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**2. DKIM Record (TXT)**
```
Type: TXT
Name: resend._domainkey
Value: [krijg je van Resend dashboard]
```

**3. DMARC Record (TXT)**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@stonesforhealth.nl
```

**Let op:** DNS changes kunnen 24-48 uur duren, maar vaak werken ze binnen 1-2 uur.

## Stap 3: Haal je API Key op

1. Ga naar "API Keys" in Resend dashboard
2. Klik op "Create API Key"
3. Geef het een naam: "Stonesforhealth Production"
4. Selecteer "Full Access"
5. Kopieer de API key (hij wordt maar 1x getoond!)

## Stap 4: Configureer Environment Variables

### Lokaal (.env.local):

Voeg deze regel toe aan je `.env.local` file:

```bash
RESEND_API_KEY=re_jouwAPIkey_hier
```

### Production (Vercel):

1. Ga naar je Vercel dashboard
2. Selecteer je project "stonesforhealth"
3. Ga naar "Settings" > "Environment Variables"
4. Add nieuwe variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_jouwAPIkey_hier`
   - **Environment:** Production, Preview, Development (alle 3)
5. Klik "Save"
6. **Redeploy** je applicatie voor de changes

## Stap 5: Test de Setup

### Quick Test:

Je kunt de email functie testen door:

1. Open je website
2. Wacht op de nieuwsbrief popup (na 5 seconden)
3. Vul je eigen email in
4. Check je inbox!

### Als het niet werkt:

**Check Resend Dashboard:**
- Ga naar "Logs" om te zien of de email is verstuurd
- Check of je domein is geverifieerd (groen vinkje)

**Check Server Logs:**
```bash
# In je terminal waar de dev server draait, kijk naar:
[Newsletter] Email verzonden naar: jouw@email.nl
```

**Als je deze error ziet:**
```
Missing API key
```
Dan is de RESEND_API_KEY environment variable niet correct ingesteld.

## Stap 6: Productie Setup

Voor productie heb je 2 opties:

### Optie A: Gratis Plan (Ontwikkeling)
- 100 emails per dag
- 3,000 emails per maand
- Perfect voor testen en kleine volumes

### Optie B: Betaald Plan (Aanbevolen)
- €20/maand voor 50,000 emails
- €0.004 per extra email
- Betere deliverability
- Email support

## Email Sender Address

De emails worden verzonden vanaf:
```
Stones for Health <noreply@stonesforhealth.nl>
```

Als je een ander adres wilt gebruiken (bijv. `info@stonesforhealth.nl`), moet je dit email adres verifiëren in Resend:
1. Ga naar "Email Addresses" in Resend
2. Add email: `info@stonesforhealth.nl`
3. Verifieer via de email die je ontvangt
4. Update de code in `/app/api/newsletter-subscribe/route.ts`

## Troubleshooting

### Email komt niet aan?

1. **Check spam folder** - Eerste emails kunnen in spam belanden
2. **Check Resend Logs** - Zie of email is verstuurd
3. **Verify domain** - DNS records moeten correct zijn
4. **Wacht 5 minuten** - Soms vertraging in delivery

### DNS Verificatie Problemen?

Als je domein niet verifieert:
1. Check of DNS records exact kloppen (geen spaties)
2. Wacht 24 uur - DNS kan tijd nodig hebben
3. Gebruik online DNS checker tools
4. Contact Resend support als het langer duurt

## Productie Checklist

- [ ] Resend account aangemaakt
- [ ] Domein `stonesforhealth.nl` toegevoegd
- [ ] DNS records correct ingesteld
- [ ] Domein geverifieerd (groen vinkje)
- [ ] API key aangemaakt
- [ ] `RESEND_API_KEY` toegevoegd aan Vercel
- [ ] Website gedeployed met nieuwe env variable
- [ ] Test email verstuurd en ontvangen
- [ ] Email komt in inbox (niet spam)

## Kosten Overzicht

Met 100 nieuwsbrief aanmeldingen per maand:
- **Gratis plan:** €0 (binnen limiet van 3000/maand)
- **Betaald plan:** €20/maand (veel ruimte over voor andere emails)

De emails zien er professioneel uit met jullie huisstijl (paars/geel kleuren) en bevatten:
- Welkomstbericht
- Grote zichtbare kortingscode
- Voorwaarden (€25 minimum, 30 dagen geldig)
- CTA button naar bestsellers
- Mooie opmaak die werkt op alle email clients

## Support

Als je hulp nodig hebt:
- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
- Status Page: https://status.resend.com
