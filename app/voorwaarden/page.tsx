import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Stones for Health',
  description: 'Algemene voorwaarden van Stones for Health. Lees onze voorwaarden voor het bestellen en kopen van kristallen en edelstenen.',
};

export default function VoorwaardenPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Algemene Voorwaarden
          </h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600">
            Laatst bijgewerkt: Januari 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none font-[family-name:var(--font-eb-garamond)]">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 1 - Definities</h2>
            <p className="text-gray-700 mb-4">In deze voorwaarden wordt verstaan onder:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Ondernemer:</strong> Stones for Health, gevestigd te Koperhoek 54, 3162 LA Rhoon, ingeschreven bij de Kamer van Koophandel onder nummer 95898476;</li>
              <li><strong>Consument:</strong> de natuurlijke persoon die niet handelt in de uitoefening van beroep of bedrijf;</li>
              <li><strong>Overeenkomst:</strong> de overeenkomst tussen de ondernemer en de consument;</li>
              <li><strong>Product:</strong> kristallen, edelstenen en aanverwante artikelen die door de ondernemer worden aangeboden;</li>
              <li><strong>Dag:</strong> kalenderdag;</li>
              <li><strong>Bedenktijd:</strong> de termijn waarbinnen de consument gebruik kan maken van zijn herroepingsrecht;</li>
              <li><strong>Herroepingsrecht:</strong> de mogelijkheid voor de consument om binnen de bedenktijd af te zien van de overeenkomst.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 2 - Identiteit van de ondernemer</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Stones for Health</strong></p>
              <p className="text-gray-700 mb-2">Koperhoek 54</p>
              <p className="text-gray-700 mb-2">3162 LA Rhoon</p>
              <p className="text-gray-700 mb-2">Nederland</p>
              <p className="text-gray-700 mb-2 mt-4"><strong>Telefoonnummer:</strong> Op aanvraag beschikbaar</p>
              <p className="text-gray-700 mb-2"><strong>E-mailadres:</strong> info@stonesforhealth.nl</p>
              <p className="text-gray-700 mb-2"><strong>KvK-nummer:</strong> 95898476</p>
              <p className="text-gray-700 mb-2"><strong>BTW-nummer:</strong> NL866676988B01</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 3 - Toepasselijkheid</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Deze algemene voorwaarden zijn van toepassing op elk aanbod van de ondernemer en op elke tot stand gekomen overeenkomst op afstand tussen ondernemer en consument.</li>
              <li>Voordat de overeenkomst op afstand wordt gesloten, wordt de tekst van deze algemene voorwaarden aan de consument beschikbaar gesteld.</li>
              <li>Afwijkingen van deze algemene voorwaarden zijn alleen geldig indien deze uitdrukkelijk schriftelijk zijn overeengekomen.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 4 - Het aanbod</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Indien een aanbod een beperkte geldigheidsduur heeft of onder voorwaarden geschiedt, wordt dit nadrukkelijk in het aanbod vermeld.</li>
              <li>Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten. De beschrijving is voldoende gedetailleerd om een goede beoordeling van het aanbod door de consument mogelijk te maken.</li>
              <li>Alle afbeeldingen en specificaties in het aanbod zijn een indicatie en kunnen geen aanleiding zijn tot schadevergoeding of ontbinding van de overeenkomst.</li>
              <li>Afbeeldingen bij producten zijn een waarheidsgetrouwe weergave van de aangeboden producten. Ondernemer kan niet garanderen dat de weergegeven kleuren exact overeenkomen met de echte kleuren van de producten.</li>
              <li>Elk aanbod bevat zodanige informatie, dat voor de consument duidelijk is wat de rechten en verplichtingen zijn, die aan de aanvaarding van het aanbod zijn verbonden.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 5 - De overeenkomst</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De overeenkomst komt tot stand op het moment van aanvaarding door de consument van het aanbod en het voldoen aan de daarbij gestelde voorwaarden.</li>
              <li>Indien de consument het aanbod langs elektronische weg heeft aanvaard, bevestigt de ondernemer onverwijld langs elektronische weg de ontvangst van de aanvaarding van het aanbod.</li>
              <li>De ondernemer zal uiterlijk bij levering van het product aan de consument de volgende informatie meesturen:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Het bezoekadres van de vestiging van de ondernemer waar de consument met klachten terecht kan;</li>
                  <li>De voorwaarden waaronder en de wijze waarop de consument van het herroepingsrecht gebruik kan maken;</li>
                  <li>De informatie over garanties en bestaande service na aankoop.</li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 6 - Herroepingsrecht</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De consument heeft het recht om binnen een bedenktijd van 30 dagen zonder opgave van redenen de overeenkomst te ontbinden.</li>
              <li>De bedenktijd gaat in op de dag nadat de consument, of een vooraf door de consument aangewezen derde, het product heeft ontvangen.</li>
              <li>Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking. Hij zal het product slechts uitpakken of gebruiken in de mate die nodig is om de aard, de kenmerken en de werking van het product vast te stellen.</li>
              <li>Indien de consument gebruik maakt van zijn herroepingsrecht, meldt hij dit binnen de bedenktermijn door middel van een ondubbelzinnige verklaring aan de ondernemer.</li>
              <li>De consument zendt het product binnen 14 dagen na de melding terug, of overhandigt dit aan de ondernemer.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 7 - Kosten in geval van herroeping</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Indien de consument gebruik maakt van zijn herroepingsrecht, komen ten hoogste de kosten van terugzending voor zijn rekening.</li>
              <li>Indien de consument een bedrag betaald heeft, zal de ondernemer dit bedrag zo spoedig mogelijk, doch uiterlijk binnen 14 dagen na herroeping, terugbetalen.</li>
              <li>De terugbetaling geschiedt via dezelfde betaalmethode als waarmee de consument de oorspronkelijke transactie heeft verricht, tenzij uitdrukkelijk anders is overeengekomen.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 8 - Uitsluiting herroepingsrecht</h2>
            <p className="text-gray-700 mb-4">
              De ondernemer kan het herroepingsrecht van de consument uitsluiten voor:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Producten die volgens specificaties van de consument zijn vervaardigd (custom orders);</li>
              <li>Producten die duidelijk persoonlijk van aard zijn;</li>
              <li>Producten die door hun aard niet kunnen worden teruggezonden;</li>
              <li>Verzegelde producten die om redenen van gezondheidsbescherming of hygiëne niet geschikt zijn om te worden teruggezonden en waarvan de verzegeling na levering is verbroken.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 9 - De prijs</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Gedurende de in het aanbod vermelde geldigheidsduur worden de prijzen van de aangeboden producten niet verhoogd, behoudens prijswijzigingen als gevolg van veranderingen in btw-tarieven.</li>
              <li>Alle prijzen zijn inclusief btw en exclusief verzendkosten, tenzij anders vermeld.</li>
              <li>De ondernemer behoudt zich het recht voor om prijzen te wijzigen. Wijzigingen gelden niet voor reeds gesloten overeenkomsten.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 10 - Levering en uitvoering</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De ondernemer zal de grootst mogelijke zorgvuldigheid in acht nemen bij het in ontvangst nemen en bij de uitvoering van bestellingen van producten.</li>
              <li>Als plaats van levering geldt het adres dat de consument aan de ondernemer kenbaar heeft gemaakt.</li>
              <li>De ondernemer zal geaccepteerde bestellingen met bekwame spoed doch uiterlijk binnen 30 dagen uitvoeren, tenzij een andere leveringstermijn is overeengekomen.</li>
              <li>Indien de bezorging vertraging ondervindt, of indien een bestelling niet dan wel slechts gedeeltelijk kan worden uitgevoerd, ontvangt de consument hiervan uiterlijk 30 dagen nadat hij de bestelling geplaatst heeft bericht.</li>
              <li>Het risico van beschadiging en/of vermissing van producten berust bij de ondernemer tot het moment van bezorging aan de consument.</li>
              <li>De ondernemer werkt samen met betrouwbare bezorgdiensten zoals PostNL en DHL voor de verzending van producten.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 11 - Betaling</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Voor zover niet anders is bepaald in de overeenkomst of aanvullende voorwaarden, dienen de door de consument verschuldigde bedragen te worden voldaan bij het plaatsen van de bestelling.</li>
              <li>De consument kan betalen via de aangeboden betaalmethoden: iDEAL, creditcard (Visa/Mastercard), Bancontact en andere door Stripe ondersteunde betaalmethoden.</li>
              <li>De consument heeft de plicht om onjuistheden in verstrekte of vermelde betaalgegevens onverwijld aan de ondernemer te melden.</li>
              <li>Indien de betaling niet kan worden geïncasseerd, behoudt de ondernemer zich het recht voor de bestelling te annuleren.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 12 - Garantie</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De ondernemer garandeert dat de producten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties, aan de redelijke eisen van deugdelijkheid en/of bruikbaarheid.</li>
              <li>Alle door Stones for Health verkochte kristallen en edelstenen zijn 100% natuurlijk en authentiek, tenzij expliciet anders vermeld.</li>
              <li>Natuurlijke variaties in kleur, vorm en grootte van kristallen en edelstenen zijn inherent aan deze natuurproducten en vormen geen gebrek.</li>
              <li>De ondernemer biedt geen garantie op de vermeende spirituele of helende eigenschappen van kristallen en edelstenen.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 13 - Klachtenregeling</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De ondernemer beschikt over een voldoende bekend gemaakte klachtenprocedure en behandelt de klacht overeenkomstig deze klachtenprocedure.</li>
              <li>Klachten over de uitvoering van de overeenkomst moeten binnen bekwame tijd nadat de consument de gebreken heeft geconstateerd, volledig en duidelijk omschreven worden ingediend bij de ondernemer.</li>
              <li>Bij de ondernemer ingediende klachten worden binnen een termijn van 14 dagen gerekend vanaf de datum van ontvangst beantwoord. Als een klacht een voorzienbaar langere verwerkingstijd vraagt, wordt door de ondernemer binnen de termijn van 14 dagen geantwoord met een bericht van ontvangst en een indicatie wanneer de consument een meer uitvoerig antwoord kan verwachten.</li>
              <li>De consument dient de ondernemer in ieder geval 4 weken de tijd te geven om de klacht in onderling overleg op te lossen.</li>
              <li>Klachten kunnen worden ingediend via e-mail: info@stonesforhealth.nl</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 14 - Geschillen</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Op overeenkomsten tussen de ondernemer en de consument waarop deze algemene voorwaarden betrekking hebben, is uitsluitend Nederlands recht van toepassing.</li>
              <li>Geschillen tussen de consument en de ondernemer over de totstandkoming of uitvoering van overeenkomsten met betrekking tot door deze ondernemer te leveren of geleverde producten en diensten, kunnen zowel door de consument als de ondernemer worden voorgelegd aan de Geschillencommissie Webshop.</li>
              <li>Een geschil wordt door de Geschillencommissie slechts in behandeling genomen, indien de consument zijn klacht eerst binnen bekwame tijd aan de ondernemer heeft voorgelegd.</li>
              <li>De uitspraken van de Geschillencommissie geschieden bij wege van bindend advies.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 15 - Aansprakelijkheid</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De ondernemer is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat de ondernemer is uitgegaan van door of namens de consument verstrekte onjuiste en/of onvolledige gegevens.</li>
              <li>De ondernemer is uitsluitend aansprakelijk voor directe schade. Aansprakelijkheid voor indirecte schade, daaronder begrepen gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie, is uitgesloten.</li>
              <li>De aansprakelijkheid van de ondernemer is in ieder geval steeds beperkt tot het bedrag der uitkering van zijn verzekeraar in voorkomend geval, dan wel tot het factuurbedrag van de betreffende bestelling.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 16 - Overmacht</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>De ondernemer is niet gehouden tot het nakomen van enige verplichting jegens de consument indien hij daartoe gehinderd wordt als gevolg van een omstandigheid die niet is te wijten aan schuld, en noch krachtens de wet, een rechtshandeling of in het verkeer geldende opvattingen voor zijn rekening komt.</li>
              <li>Onder overmacht wordt in deze algemene voorwaarden verstaan, naast hetgeen daaromtrent in de wet en jurisprudentie wordt begrepen, alle van buitenkomende oorzaken, voorzien of niet-voorzien, waarop de ondernemer geen invloed kan uitoefenen, doch waardoor de ondernemer niet in staat is zijn verplichtingen na te komen.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 17 - Intellectuele eigendom</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Alle rechten van intellectuele eigendom op alle in het kader van de overeenkomst ontwikkelde of ter beschikking gestelde materialen, programmatuur, analyses, ontwerpen, documentatie, adviezen, rapporten, offertes, alsmede voorbereidend materiaal daarvan, berusten uitsluitend bij de ondernemer.</li>
              <li>De consument verkrijgt uitsluitend de gebruiksrechten die bij deze voorwaarden en de wet uitdrukkelijk zijn toegekend.</li>
              <li>Het is de consument niet toegestaan enige aanduiding omtrent auteursrechten, merken, handelsnamen of andere rechten van intellectuele eigendom uit de materialen te verwijderen of te wijzigen.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 18 - Privacy</h2>
            <p className="text-gray-700 mb-4">
              De gegevens en informatie die de consument aan de ondernemer verstrekt, zal de ondernemer vertrouwelijk en zorgvuldig behandelen. De ondernemer zal deze gegevens alleen gebruiken in overeenstemming met het privacybeleid. Voor meer informatie wordt verwezen naar het privacybeleid van Stones for Health.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 19 - Aanvullende bepalingen</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Aanvullende dan wel van deze algemene voorwaarden afwijkende bepalingen mogen niet ten nadele van de consument zijn en dienen schriftelijk te worden vastgelegd.</li>
              <li>Indien één of meerdere bepalingen in deze algemene voorwaarden op enig moment geheel of gedeeltelijk nietig zijn of vernietigd mochten worden, dan blijven de overige bepalingen volledig van toepassing.</li>
              <li>De ondernemer behoudt zich het recht voor deze algemene voorwaarden te wijzigen. Wijzigingen treden in werking op het aangekondigde tijdstip van inwerkingtreding.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel 20 - Disclaimer</h2>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded">
              <p className="text-gray-700 mb-4">
                <strong>Belangrijk:</strong> Kristallen en edelstenen worden door Stones for Health verkocht als decoratieve objecten en verzamelobjecten. Eventuele vermeende spirituele, helende of therapeutische eigenschappen die aan kristallen worden toegeschreven, zijn niet wetenschappelijk bewezen.
              </p>
              <p className="text-gray-700">
                Kristallen en edelstenen zijn geen vervanging voor medische behandeling, diagnose of medicatie. Raadpleeg altijd een gekwalificeerde arts voor gezondheidskwesties. Stones for Health aanvaardt geen aansprakelijkheid voor claims met betrekking tot de werking of eigenschappen van kristallen anders dan hun fysieke eigenschappen.
              </p>
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
          <h3 className="text-xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Vragen over onze voorwaarden?
          </h3>
          <p className="text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Neem contact met ons op als u vragen heeft over deze algemene voorwaarden.
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