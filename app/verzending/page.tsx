import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verzending & Retour | Stones for Health',
  description: 'Informatie over verzending, levertijden, verzendkosten en retourbeleid bij Stones for Health. Gratis verzending vanaf €30 in Nederland en België.',
};

export default function VerzendingPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Verzending & Retour
          </h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600">
            Alles wat u moet weten over verzending en retourneren
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 p-6 rounded-lg text-center">
            <svg className="w-12 h-12 text-[#492c4a] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-2">Gratis Verzending</h3>
            <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Nederland & België<br />
              vanaf €30
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 p-6 rounded-lg text-center">
            <svg className="w-12 h-12 text-[#492c4a] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-2">Snelle Levering</h3>
            <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Voor 16:00 besteld,<br />
              dezelfde dag verzonden
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 p-6 rounded-lg text-center">
            <svg className="w-12 h-12 text-[#492c4a] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-2">30 Dagen Bedenktijd</h3>
            <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Niet tevreden?<br />
              Geld terug garantie
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Verzending Section */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              Verzending
            </h2>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Verzendkosten</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-[family-name:var(--font-eb-garamond)] text-gray-700">Nederland - Standaard</span>
                    <span className="font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900">€4,95</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-[family-name:var(--font-eb-garamond)] text-gray-700">Nederland - Vanaf €30</span>
                    <span className="font-semibold font-[family-name:var(--font-eb-garamond)] text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-[family-name:var(--font-eb-garamond)] text-gray-700">België - Standaard</span>
                    <span className="font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900">€4,95</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-[family-name:var(--font-eb-garamond)] text-gray-700">België - Vanaf €30</span>
                    <span className="font-semibold font-[family-name:var(--font-eb-garamond)] text-green-600">Gratis</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Levertijden</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>Bestellingen geplaatst vóór 16:00 uur op werkdagen worden dezelfde dag verzonden</li>
                  <li>Nederland: 1-2 werkdagen na verzending</li>
                  <li>België: 2-3 werkdagen na verzending</li>
                  <li>In het weekend en op feestdagen worden geen pakketten verzonden</li>
                  <li>Tijdens drukke periodes kan de levertijd iets langer zijn</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Track & Trace</h3>
                <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  Zodra uw bestelling is verzonden, ontvangt u een e-mail met een track & trace code. Hiermee kunt u uw pakket volgen vanaf ons magazijn tot aan uw deur. Wij werken samen met PostNL voor verzendingen in Nederland en met PostNL/bpost voor verzendingen naar België.
                </p>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Verpakking</h3>
                <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  Uw kristallen worden met de grootste zorg verpakt. We gebruiken:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>Zachte beschermende materialen voor elke steen</li>
                  <li>Stevige dozen die bestand zijn tegen transport</li>
                  <li>Milieuvriendelijke verpakkingsmaterialen waar mogelijk</li>
                  <li>Extra bescherming voor grotere of kwetsbare kristallen</li>
                  <li>Een mooie presentatie, klaar om cadeau te geven</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Retour Section */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Retourneren
            </h2>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">30 Dagen Bedenktijd</h3>
                <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  U heeft het recht om binnen 30 dagen na ontvangst van uw bestelling, zonder opgave van redenen, de overeenkomst te ontbinden. De bedenktijd gaat in op de dag nadat u, of een door u aangewezen derde, het product heeft ontvangen.
                </p>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Retour Procedure</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>
                    <strong>Meld uw retour aan:</strong> Stuur een e-mail naar info@stonesforhealth.nl met uw ordernummer en welke producten u wilt retourneren
                  </li>
                  <li>
                    <strong>Ontvang retourinstructies:</strong> U ontvangt binnen 24 uur een bevestiging met retourinstructies
                  </li>
                  <li>
                    <strong>Verpak de producten:</strong> Verpak de producten zorgvuldig in de originele verpakking indien mogelijk
                  </li>
                  <li>
                    <strong>Verstuur het pakket:</strong> Stuur het pakket binnen 14 dagen na aanmelding naar:<br />
                    <div className="mt-2 ml-4 p-3 bg-gray-50 rounded">
                      <strong>Stones for Health</strong><br />
                      Koperhoek 54<br />
                      3162 LA Rhoon<br />
                      Nederland
                    </div>
                  </li>
                  <li>
                    <strong>Ontvang uw geld terug:</strong> Na ontvangst en controle ontvangt u binnen 14 dagen uw geld terug
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Retourvoorwaarden</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>Producten moeten ongebruikt en onbeschadigd zijn</li>
                  <li>Producten moeten in originele staat verkeren</li>
                  <li>Originele verpakking moet intact zijn (indien redelijkerwijs mogelijk)</li>
                  <li>Retourkosten zijn voor rekening van de klant</li>
                  <li>Wij adviseren verzending met track & trace voor uw eigen zekerheid</li>
                  <li>Bewaar het verzendbewijs tot de retour is verwerkt</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Terugbetaling</h3>
                <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  Wij storten het aankoopbedrag zo spoedig mogelijk, doch uiterlijk binnen 14 dagen na ontvangst van de retourzending terug. De terugbetaling gebeurt via dezelfde betaalmethode als waarmee u de oorspronkelijke transactie heeft verricht. Voor deze terugbetaling brengen wij geen kosten in rekening.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Uitzonderingen
                </h3>
                <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  Het herroepingsrecht geldt niet voor:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>Producten die volgens uw specificaties zijn gemaakt (custom orders)</li>
                  <li>Producten die duidelijk persoonlijk van aard zijn</li>
                  <li>Verzegelde producten die om hygiënische redenen niet kunnen worden geretourneerd</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Beschadigd/Verkeerd Product Section */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Beschadigd of Verkeerd Product
            </h2>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ondanks onze zorgvuldige verpakking en controle kan het voorkomen dat een product beschadigd aankomt of dat u een verkeerd product ontvangt. In dat geval nemen wij volledige verantwoordelijkheid.
              </p>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Wat te doen?</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>Maak foto's van de beschadiging en/of het verkeerde product</li>
                  <li>Maak ook een foto van de verpakking</li>
                  <li>Stuur binnen 48 uur na ontvangst een e-mail naar info@stonesforhealth.nl met:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Uw ordernummer</li>
                      <li>De foto's</li>
                      <li>Een beschrijving van het probleem</li>
                    </ul>
                  </li>
                  <li>Wij nemen binnen 24 uur contact met u op voor een passende oplossing</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">Onze Oplossing</h3>
                <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  Afhankelijk van de situatie bieden wij:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>Kosteloze vervanging van het product</li>
                  <li>Volledige terugbetaling</li>
                  <li>Gedeeltelijke terugbetaling bij kleine beschadigingen</li>
                  <li>Retourkosten worden door ons vergoed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact bij Vragen
            </h2>

            <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 p-6 rounded-lg">
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)] mb-4">
                Heeft u vragen over verzending of retourneren? Wij helpen u graag!
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@stonesforhealth.nl" className="text-[#492c4a] hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)] font-semibold">
                    info@stonesforhealth.nl
                  </a>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="font-[family-name:var(--font-eb-garamond)]">
                    <p className="font-semibold text-gray-900">Retouradres:</p>
                    <p className="text-gray-700">
                      Stones for Health<br />
                      Koperhoek 54<br />
                      3162 LA Rhoon<br />
                      Nederland
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    Wij reageren binnen 24 uur op werkdagen
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-block bg-[#492c4a] text-white px-8 py-3 rounded-xl font-[family-name:var(--font-eb-garamond)] font-semibold hover:bg-[#6b4069] transition-colors"
          >
            Neem Contact Op
          </a>
        </div>
      </div>
    </div>
  );
}