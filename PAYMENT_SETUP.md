# Payment Integration Setup Guide

## Environment Configuration

Voor de payment integratie zijn de volgende environment variabelen nodig:

```
# Payment Provider Settings
PAYMENT_SECRET_KEY=<your-secret-key-here>
PAYMENT_PUBLIC_KEY=<your-public-key-here>
WEBHOOK_ENDPOINT_SECRET=<your-webhook-secret-here>

# Application Settings  
NODE_ENV=development
APP_URL=http://localhost:3000
```

## Veiligheidsrichtlijnen

1. **Bewaar nooit echte API keys in je codebase**
2. Gebruik altijd environment variables voor gevoelige data
3. Voeg `.env` bestanden toe aan `.gitignore`
4. Roteer API keys regelmatig
5. Gebruik restricted keys waar mogelijk

## Setup Stappen

1. Maak een account aan bij je payment provider
2. Genereer API keys in het dashboard
3. Maak een `.env.local` bestand aan (wordt genegeerd door Git)
4. Kopieer de keys naar je environment bestand
5. Start je development server opnieuw op

## Test Omgeving

Voor development en testen:
- Gebruik altijd test/sandbox keys
- Test met dummy credit card nummers
- Verifieer webhook endpoints lokaal

## Webhook Configuratie

1. Configureer je webhook endpoint URL
2. Selecteer de events die je wilt ontvangen
3. Bewaar het webhook secret veilig
4. Test de webhook integratie lokaal

## Productie Deployment

Voor productie:
1. Vervang alle test keys door productie keys
2. Configureer environment variables in je hosting platform
3. Verifieer SSL certificaat is actief
4. Test de complete payment flow

## Support & Documentatie

Raadpleeg de officiële documentatie van je payment provider voor:
- API referentie
- Best practices
- Troubleshooting guides
- Security recommendations