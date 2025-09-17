# 123NoodKlaar Quiz - Persoonlijke Noodpakket Samensteller

## Overzicht
De verbeterde quiz voor 123noodklaar.nl stelt bezoekers in staat om een gepersonaliseerd noodpakket samen te stellen op basis van hun huishoudsamenstelling en specifieke behoeften.

## Features

### 1. Multi-step Flow
De quiz bestaat uit 4-5 stappen (afhankelijk van gebruikerskeuzes):
- **Stap 1**: Huishoudgrootte (1-10 personen)
- **Stap 2**: Leeftijden van alle personen
- **Stap 3**: Prioriteiten (multi-select)
- **Stap 4**: Medicatie behoeften (alleen als EHBO geselecteerd)
- **Resultaten**: Gepersonaliseerde productaanbevelingen

### 2. Dynamische Vragen
- Aantal leeftijdsvelden wordt automatisch aangepast op basis van huishoudgrootte
- Medicatie vraag verschijnt alleen als EHBO als prioriteit is geselecteerd

### 3. State Management
- Quiz state wordt opgeslagen in `sessionStorage` 
- Gebruikers kunnen terug navigeren zonder data te verliezen
- Progress wordt bijgehouden met voortgangsbalk

### 4. Aanbevelingslogica
Het systeem analyseert:
- Huishoudsamenstelling (volwassenen, kinderen, baby's, ouderen)
- Geselecteerde prioriteiten
- Berekent benodigde hoeveelheden (bijv. 3L water pp/dag)
- Scoort producten op relevantie
- Selecteert top 6 aanbevelingen uit verschillende categorieën

### 5. WooCommerce Integratie
- Haalt real-time productdata op via WooCommerce API
- "Voeg alles toe aan winkelwagen" functionaliteit
- Respecteert voorraadstatus

## Technische Details

### Gebruikte Dependencies
- React (hooks: useState, useEffect)
- Next.js (routing)
- Framer Motion (animaties)
- Tailwind CSS (styling)
- WooCommerce API client

### File Structuur
```
app/quiz/
├── page.tsx          # Hoofdcomponent met alle quiz logica
```

### Key Functies

#### `handleHouseholdSize(size: number)`
Initialiseert personen array op basis van gekozen huishoudgrootte.

#### `generateRecommendations()`
Complexe scoring algoritme dat producten matcht op basis van:
- Huishoudgrootte matching
- Prioriteit matching
- Speciale behoeften (baby's, ouderen)
- Hoeveelheid berekeningen

#### `addAllToCart()`
Voegt alle aanbevolen producten met juiste hoeveelheden toe aan winkelwagen.

## Aanpassingen Maken

### Nieuwe Prioriteit Toevoegen
In stap 3, voeg een nieuw object toe aan de prioriteiten array:
```javascript
{ 
  id: 'nieuwe-prioriteit', 
  label: 'Label', 
  icon: '🎯', 
  desc: 'Beschrijving' 
}
```

### Scoring Logica Aanpassen
In `generateRecommendations()`, voeg nieuwe scoring regels toe:
```javascript
if (needsNieuwePrioriteit && product.name.includes('keyword')) {
  score += 15;
}
```

### Aantal Personen Uitbreiden
Pas de array in stap 1 aan:
```javascript
{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
  // button code
))}
```

## Styling Aanpassen

De quiz gebruikt Tailwind CSS classes die consistent zijn met de rest van de site:
- `bg-medical-green`: Primaire kleur
- `bg-amber-orange`: Secundaire kleur
- `text-navy-blue`: Tekst kleur
- `text-steel-gray`: Secundaire tekst

Animaties worden gecontroleerd via Framer Motion props.

## Testing

### Lokaal Testen
1. Start de development server: `npm run dev`
2. Navigeer naar `/quiz`
3. Test verschillende scenario's:
   - 1-persoons huishouden
   - Groot gezin met kinderen
   - Ouderen huishouden
   - Verschillende prioriteit combinaties

### Edge Cases
- Geen producten beschikbaar
- API errors
- Lege voorraad
- Zeer grote huishoudens

## Productie Checklist
- [ ] Test alle user flows
- [ ] Controleer mobile responsiveness
- [ ] Valideer WooCommerce API connectie
- [ ] Test sessionStorage in verschillende browsers
- [ ] Controleer Nederlandse vertalingen
- [ ] Test "vorige" knop functionaliteit
- [ ] Valideer cart integratie

## Toekomstige Verbeteringen
1. Email resultaten functie
2. Opslaan van quiz resultaten voor terugkerende bezoekers
3. A/B testing verschillende aanbevelingsalgoritmes
4. Integratie met klantaccounts
5. Uitgebreidere productfiltering opties