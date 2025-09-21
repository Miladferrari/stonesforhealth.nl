import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid | Stones for Health',
  description: 'Privacybeleid van Stones for Health. Lees hoe wij omgaan met uw persoonsgegevens en privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Privacybeleid
          </h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600">
            Laatst bijgewerkt: Januari 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none font-[family-name:var(--font-eb-garamond)]">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Inleiding</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health, gevestigd aan Koperhoek 54, 3162 LA Rhoon, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring. Wij respecteren uw privacy en zorgen ervoor dat uw persoonlijke gegevens vertrouwelijk worden behandeld.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Contactgegevens</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Bedrijfsnaam:</strong> Stones for Health</p>
              <p className="text-gray-700 mb-2"><strong>Adres:</strong> Koperhoek 54, 3162 LA Rhoon</p>
              <p className="text-gray-700 mb-2"><strong>KvK-nummer:</strong> 95898476</p>
              <p className="text-gray-700 mb-2"><strong>E-mail:</strong> info@stonesforhealth.nl</p>
              <p className="text-gray-700"><strong>Website:</strong> www.stonesforhealth.nl</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Persoonsgegevens die wij verwerken</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Voor- en achternaam</li>
              <li>Adresgegevens</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>IP-adres</li>
              <li>Betaalgegevens</li>
              <li>Bestelgeschiedenis</li>
              <li>Gegevens over uw activiteiten op onze website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bijzondere en/of gevoelige persoonsgegevens</h2>
            <p className="text-gray-700 mb-4">
              Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar, tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Waarom wij gegevens nodig hebben</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health verwerkt uw persoonsgegevens voor de volgende doelen:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Het afhandelen van uw betaling</li>
              <li>Verzenden van uw bestelling</li>
              <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
              <li>U te informeren over wijzigingen van onze diensten en producten</li>
              <li>U de mogelijkheid te bieden een account aan te maken</li>
              <li>Om goederen en diensten bij u af te leveren</li>
              <li>Stones for Health verwerkt ook persoonsgegevens als wij hier wettelijk toe verplicht zijn</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Hoe lang we gegevens bewaren</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Klantgegevens:</strong> 7 jaar na laatste aankoop (wettelijke bewaarplicht)</li>
              <li><strong>Factuurgegevens:</strong> 7 jaar (wettelijke bewaarplicht)</li>
              <li><strong>Nieuwsbrief aanmeldingen:</strong> Tot uitschrijving</li>
              <li><strong>Cookie gegevens:</strong> Maximaal 1 jaar</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Delen van persoonsgegevens met derden</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst.
            </p>
            <p className="text-gray-700 mb-4">
              Wij werken samen met de volgende categorieën van verwerkers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Bezorgdiensten (PostNL, DHL)</li>
              <li>Betalingsproviders (Stripe, iDEAL)</li>
              <li>E-mailmarketingplatforms</li>
              <li>Hosting- en websitediensten</li>
              <li>Boekhoudsoftware</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies en tracking</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health gebruikt functionele, analytische en tracking cookies. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van uw computer, tablet of smartphone.
            </p>
            <p className="text-gray-700 mb-4">
              Wij gebruiken cookies met een puur technische functionaliteit. Deze zorgen ervoor dat de website naar behoren werkt en dat bijvoorbeeld uw voorkeursinstellingen onthouden worden. Deze cookies worden ook gebruikt om de website goed te laten werken en deze te kunnen optimaliseren.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Gegevens inzien, aanpassen of verwijderen</h2>
            <p className="text-gray-700 mb-4">
              U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Stones for Health.
            </p>
            <p className="text-gray-700 mb-4">
              U heeft de volgende rechten:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Recht op inzage</li>
              <li>Recht op rectificatie</li>
              <li>Recht op gegevenswissing</li>
              <li>Recht op beperking van de verwerking</li>
              <li>Recht op overdraagbaarheid van gegevens</li>
              <li>Recht van bezwaar</li>
            </ul>
            <p className="text-gray-700 mt-4">
              U kunt een verzoek tot inzage, correctie, verwijdering of overdracht van uw persoonsgegevens sturen naar info@stonesforhealth.nl.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Beveiliging</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan.
            </p>
            <p className="text-gray-700 mb-4">
              Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via info@stonesforhealth.nl.
            </p>
            <p className="text-gray-700 mb-4">
              Wij hebben de volgende maatregelen genomen om uw persoonsgegevens te beveiligen:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>SSL-beveiliging op onze website</li>
              <li>Beveiligde betalingsomgeving via Stripe</li>
              <li>Regelmatige software-updates</li>
              <li>Sterke wachtwoorden en twee-factor authenticatie</li>
              <li>Beperkte toegang tot persoonsgegevens</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Klachten</h2>
            <p className="text-gray-700 mb-4">
              Mocht u een klacht hebben over de verwerking van uw persoonsgegevens dan vragen wij u hierover direct contact met ons op te nemen via info@stonesforhealth.nl.
            </p>
            <p className="text-gray-700 mb-4">
              U heeft altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, dit is de toezichthoudende autoriteit op het gebied van privacybescherming.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Wijzigingen</h2>
            <p className="text-gray-700 mb-4">
              Stones for Health behoudt zich het recht voor om wijzigingen aan te brengen in dit privacybeleid. Het verdient aanbeveling om dit privacybeleid regelmatig te raadplegen, zodat u van de wijzigingen op de hoogte bent.
            </p>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
          <h3 className="text-xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Vragen over ons privacybeleid?
          </h3>
          <p className="text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Neem gerust contact met ons op als u vragen heeft over hoe wij met uw gegevens omgaan.
          </p>
          <a
            href="mailto:info@stonesforhealth.nl"
            className="inline-block bg-[#492c4a] text-white px-8 py-3 rounded-xl font-[family-name:var(--font-eb-garamond)] font-semibold hover:bg-[#6b4069] transition-colors"
          >
            Contact opnemen
          </a>
        </div>
      </div>
    </div>
  );
}