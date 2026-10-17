# Klarna als betaalmethode — onderzoek

Onderzocht: 22-09-2026 · Stripe-integratie · frontend Next.js, backend WooCommerce

---

## Korte antwoord

**Technisch kan het, en het is weinig werk.** Of het verstandig is, hangt af van iets anders:
bij je huidige orderbedragen is Klarna ruim drie keer zo duur als iDEAL, en de functie waar
Klarna bekend om staat ("betaal in 3 termijnen") werkt bij de meeste van je orders niet.

---

## 1. Kan het? Ja

| Voorwaarde | Status |
|---|---|
| Stripe-account in een land dat Klarna ondersteunt | ✅ NL staat op Stripe's lijst |
| Klanten in ondersteunde landen | ✅ NL en BE allebei |
| Valuta | ✅ EUR |
| Redirect-flow (klant gaat weg en komt terug) | ✅ werkt al — iDEAL en Bancontact doen hetzelfde |
| Factuuradres beschikbaar | ✅ checkout verzamelt naam, adres, postcode, land |
| Consumentenverkoop (Klarna staat geen B2B toe) | ✅ |

Er is geen blokkade. De bestaande betaalarchitectuur kan Klarna aan.

---

## 2. Wat het kost

Stripe-tarieven voor een Nederlands account:

| Methode | Tarief | Bij een order van €22,66 |
|---|---|---|
| iDEAL | € 0,29 vast | € 0,29 — **1,3%** |
| Bancontact | € 0,35 vast | € 0,35 — 1,5% |
| Kaart (standaard EEA) | 1,5% + € 0,25 | € 0,59 — 2,6% |
| **Klarna** | **2,99% + € 0,35** | **€ 1,03 — 4,5%** |

Klarna is bij jouw gemiddelde order **3,5× duurder dan iDEAL**.

Dat is geen argument tegen Klarna op zich — het is duurder omdat Klarna het risico overneemt
en jij direct je geld krijgt. Maar bij kleine bedragen weegt dat percentage zwaar.

---

## 3. Het echte probleem: je orderbedragen

Uit de laatste orders in WooCommerce:

```
gemiddeld   € 22,66
mediaan     € 19,90
laagste     € 19,90
hoogste     € 30,95
```

Klarna's opties in Nederland hebben ondergrenzen:

| Klarna-optie | Minimum | Hoeveel van je orders halen dat |
|---|---|---|
| Betaal binnen 30 dagen | € 1 | 100% |
| **Betaal in 3 termijnen** | **€ 25** | **25%** |
| Direct betalen | € 0 | 100% |

De reden dat webshops Klarna aanbieden — gespreid betalen — **valt bij driekwart van je orders weg**.
Wat overblijft is "betaal over 30 dagen": nuttig, maar een duurdere variant van wat iDEAL al doet.

Ter illustratie: bij een armband van €21 zou "3 termijnen van €7" ook een vreemd aanbod zijn.

> Let op: dit is gebaseerd op **4 orders**. Dat is te weinig om hard te concluderen. Als je
> verwacht dat de gemiddelde orderwaarde stijgt — sets, cadeaus, duurdere clusters — verandert
> dit plaatje.

---

## 4. Wat ervoor nodig is

### In het Stripe-dashboard (jij, ~5 minuten)

Instellingen → Betaalmethoden → Klarna → inschakelen.
Stripe beoordeelt dit meestal direct; soms volgt een korte controle.

### In de code (~1 uur)

Drie plekken:

**a. `app/api/create-payment-intent/route.ts`** — de methode toestaan

```ts
const paymentMethodTypes = paymentMethod === 'card'
  ? ['card']
  : paymentMethod === 'ideal'
  ? ['ideal']
  : paymentMethod === 'bancontact'
  ? ['bancontact']
  : paymentMethod === 'klarna'
  ? ['klarna']
  : ['card'];
```

**b. `app/components/StripePaymentForm.tsx`** — de keuze tonen

Een vierde optie naast iDEAL, Creditcard en Bancontact, en `'klarna'` toevoegen aan
`paymentMethodOrder`.

**c. Regelitems meesturen (aanbevolen)**

Klarna keurt vaker goed als het weet wát er gekocht wordt. Stripe raadt aan de winkelwagen
mee te sturen bij de PaymentIntent. Zonder dit werkt Klarna wel, maar wordt vaker geweigerd.

### Teksten bijwerken

`/faq`, `/voorwaarden` en `/privacy` noemen nu iDEAL, creditcard en Bancontact. Die lijst
moet mee.

---

## 5. Aandachtspunten

- **Terugbetalingen lopen anders.** Klarna annuleert resterende termijnen en betaalt het
  betaalde deel terug. Werkt via Stripe, maar je boekhouding ziet andere bedragen dan bij iDEAL.
- **Klarna toont zichzelf alleen aan wie het mag gebruiken.** Stripe bepaalt dat op
  verzendadres of IP. Een klant buiten NL/BE ziet de optie niet — dat is goed, maar je eigen
  UI moet dat aankunnen (nu is de knoppenlijst hardcoded).
- **De huidige opzet is kwetsbaar.** Het Stripe PaymentElement staat off-screen verborgen en
  er ligt een eigen UI overheen die via DOM-manipulatie synchroniseert. Dat werkt, maar elke
  nieuwe methode maakt het fragieler. Overweeg op termijn het gewone PaymentElement te tonen:
  dan komen nieuwe methodes vanzelf mee, zonder code.

---

## 6. Advies

**Niet nu.** Bij een gemiddelde order van €22,66 betaal je 4,5% voor een functie die bij
driekwart van je orders niet beschikbaar is.

**Wel het overwegen zodra** de gemiddelde orderwaarde richting €40–50 gaat. Dan komt
"betaal in 3" binnen bereik en kan Klarna de orderwaarde verder omhoog duwen — dat is het
mechanisme waar het zijn kosten mee terugverdient.

**Goedkoper alternatief met hetzelfde effect:** de drempel voor gratis verzending (nu €30)
ligt al boven je gemiddelde order. Daar valt waarschijnlijk meer winst te halen dan met een
nieuwe betaalmethode — zonder 4,5% transactiekosten.

### Als je het tóch wilt

Dat is verdedigbaar: Klarna is een vertrouwd merk en de aanwezigheid van het logo kan op
zich al conversie opleveren. Vier orders is te weinig data om hard nee te zeggen. Het werk is
ongeveer een uur en volledig terug te draaien.
