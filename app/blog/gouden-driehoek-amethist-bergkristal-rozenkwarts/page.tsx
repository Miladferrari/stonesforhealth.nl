import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts | StonesForHealth',
  description: 'Ontdek de kracht van de Gouden Driehoek - de meest populaire kristalcombinatie. ✓ Amethist ✓ Bergkristal ✓ Rozenkwarts ✓ Toepassingen ✓ Do\'s & Don\'ts',
  keywords: 'gouden driehoek kristallen, amethist bergkristal rozenkwarts, kristallen combinatie, edelstenen driehoek, kristallen beginners',
  openGraph: {
    title: 'De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts',
    description: 'De complete gids over de Gouden Driehoek - balans, liefde en helderheid in één krachtige kristalcombinatie.',
    type: 'article',
    publishedTime: '2025-03-05T09:00:00Z',
    authors: ['StonesForHealth'],
  }
};

export default function GoudenDriehoekPage() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#fbe022] text-black px-4 py-1.5 rounded-full text-sm font-bold font-[family-name:var(--font-eb-garamond)]">
              KRISTALLEN
            </span>
            <span className="text-white/80 text-sm font-[family-name:var(--font-eb-garamond)]">
              5 maart 2025 • 8 min leestijd
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
            De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts
          </h1>
          <p className="text-xl text-white/90 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de kracht van de Gouden Driehoek - de meest populaire kristalcombinatie voor balans, liefde en helderheid. Complete gids met toepassingen en tips.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Featured Image */}
        <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src="/images/banner.png"
            alt="De Gouden Driehoek - Amethist, Bergkristal en Rozenkwarts kristallen arrangement"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Gouden Driehoek</strong> is één van de bekendste en krachtigste kristalcombinaties ter wereld. Deze magische combinatie bestaat uit drie essentiële edelstenen: <strong>Amethist</strong>, <strong>Bergkristal</strong> en <strong>Rozenkwarts</strong>. Samen vormen zij een unieke energiecirkel die balans, harmonie en positieve vibraties brengt. Deze combinatie is populair bij zowel beginners als ervaren kristalgebruikers en staat bekend om zijn helende en spirituele kracht.
          </p>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#wat-is-gouden-driehoek" className="text-gray-700 hover:text-gray-900 underline">Wat is de Gouden Driehoek?</a></li>
              <li><a href="#werking-driehoek" className="text-gray-700 hover:text-gray-900 underline">Werking van de Gouden Driehoek</a></li>
              <li><a href="#waarvoor-goed" className="text-gray-700 hover:text-gray-900 underline">Waarvoor is de Gouden Driehoek Goed?</a></li>
              <li><a href="#hoe-gebruiken" className="text-gray-700 hover:text-gray-900 underline">Hoe Gebruik je de Gouden Driehoek?</a></li>
              <li><a href="#dos-donts" className="text-gray-700 hover:text-gray-900 underline">Do's & Don'ts</a></li>
              <li><a href="#plaatsing-tips" className="text-gray-700 hover:text-gray-900 underline">Advies & Plaatsing Tips</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Section 1: Wat is de Gouden Driehoek */}
          <h2 id="wat-is-gouden-driehoek" className="text-3xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Wat is de Gouden Driehoek?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De Gouden Driehoek is geen letterlijke gouden driehoek, maar de benaming voor een <strong>kristalcombinatie van drie specifieke edelstenen</strong> die samen worden geplaatst in een driehoeksvorm. Deze drie kristallen zijn zorgvuldig gekozen vanwege hun complementaire energieën en hun vermogen om elkaar te versterken.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                💜 Amethist
              </h3>
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Spiritualiteit, rust en intuïtie
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🤍 Bergkristal
              </h3>
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Zuiverheid, balans en versterking
              </p>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-400 p-6 rounded">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🩷 Rozenkwarts
              </h3>
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Liefde, compassie en harmonie
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Deze drie stenen worden vaak de "heilige drie-eenheid van kristallen" genoemd omdat ze de drie essentiële aspecten van menselijk welzijn representeren: <strong>geest (Amethist), lichaam (Bergkristal) en ziel (Rozenkwarts)</strong>.
          </p>

          {/* Section 2: Werking */}
          <h2 id="werking-driehoek" className="text-3xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Werking van de Gouden Driehoek
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            De drie stenen vullen elkaar perfect aan en <strong>versterken elkaars werking</strong>. Wanneer ze samen in een driehoek worden geplaatst, creëren ze een energetisch veld dat groter is dan de som der delen:
          </p>

          {/* Amethist */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              💜 Amethist – De Steen van Spiritualiteit
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Amethist</strong> is de steen van rust, spiritualiteit en intuïtie. Deze prachtige paarse kristal:
            </p>
            <ul className="space-y-2 mb-4 pl-5 list-disc text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Helpt bij stress, angst en slapeloosheid</li>
              <li>Versterkt intuïtie en spirituele bewustzijn</li>
              <li>Ondersteunt meditatie en contemplatief werk</li>
              <li>Beschermt tegen negatieve energie</li>
              <li>Bevordert innerlijke rust en emotionele balans</li>
              <li>Helpt bij het loslaten van verslavingen en ongezonde patronen</li>
            </ul>
            <div className="bg-purple-50 border-l-4 border-purple-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Rol in de Driehoek:</strong> Amethist brengt kalmte en spirituele verbinding. Het is het "derde oog" van de driehoek.
              </p>
            </div>
          </div>

          {/* Bergkristal */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              🤍 Bergkristal – De Steen van Zuiverheid
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Bergkristal</strong> is de meester-healer en versterker van alle kristallen:
            </p>
            <ul className="space-y-2 mb-4 pl-5 list-disc text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Versterkt de werking van andere edelstenen</li>
              <li>Brengt helderheid en mentale focus</li>
              <li>Zuivert en balanceert alle chakra's</li>
              <li>Versterkt intenties en affirmaties</li>
              <li>Brengt harmonie en energetische balans</li>
              <li>Kan geprogrammeerd worden voor specifieke doelen</li>
            </ul>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Rol in de Driehoek:</strong> Bergkristal versterkt Amethist en Rozenkwarts en zorgt voor helderheid. Het is de "versterker" van de driehoek.
              </p>
            </div>
          </div>

          {/* Rozenkwarts */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              🩷 Rozenkwarts – De Steen van Liefde
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Rozenkwarts</strong> is dé steen van onvoorwaardelijke liefde en emotionele heling:
            </p>
            <ul className="space-y-2 mb-4 pl-5 list-disc text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Opent het hart voor liefde (zelfliefde en liefde voor anderen)</li>
              <li>Helpt bij emotionele genezing en trauma's</li>
              <li>Bevordert compassie, vergeving en empathie</li>
              <li>Versterkt relaties en romantiek</li>
              <li>Brengt innerlijke vrede en harmonie</li>
              <li>Verzacht verdriet en hartpijn</li>
            </ul>
            <div className="bg-pink-50 border-l-4 border-pink-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Rol in de Driehoek:</strong> Rozenkwarts brengt liefde en emotionele warmte. Het is het "hart" van de driehoek.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 via-gray-50 to-pink-50 border-l-4 border-[#492c4a] p-6 my-8 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              ✨ De Synergie van de Driehoek
            </h3>
            <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Samen vormen Amethist, Bergkristal en Rozenkwarts een <strong>energetische driehoek</strong> die rust, liefde en helderheid in perfecte balans brengt. Het Bergkristal versterkt de kalmerende werking van Amethist en de liefdevolle energie van Rozenkwarts, terwijl alle drie de stenen elkaar in harmonie houden.
            </p>
          </div>

          {/* Section 3: Waarvoor Goed */}
          <h2 id="waarvoor-goed" className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Waarvoor is de Gouden Driehoek Goed?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De Gouden Driehoek kan ingezet worden voor talloze doeleinden. Hier zijn de belangrijkste toepassingen:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🏠 Harmonie in Huis of Werkruimte
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Brengt balans en positieve energie in elk ruimte. Perfect voor woonkamers, slaapkamers of kantoren.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ❤️ Liefdevolle Relaties
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Versterkt communicatie, begrip en liefde tussen partners, familie en vrienden.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🧘 Meditatie & Innerlijke Rust
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Helpt bij ontspanning, meditatie en het vinden van innerlijke vrede.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ✨ Energiezuivering
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Zuivert negatieve energie en versterkt positieve vibraties in je omgeving.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                😴 Betere Nachtrust
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Ondersteunt een goede nachtrust en helpt bij slapeloosheid en nachtmerries.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                💚 Emotioneel Herstel
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Helpt bij het verwerken van emoties, trauma's en hartpijn.
              </p>
            </div>
          </div>

          {/* Section 4: Hoe Gebruiken */}
          <h2 id="hoe-gebruiken" className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Gebruik je de Gouden Driehoek?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Er zijn verschillende manieren om de Gouden Driehoek te gebruiken. Hier zijn de meest effectieve methoden:
          </p>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                1. Driehoeksvorm in je Ruimte
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Plaats de drie stenen in een <strong>gelijkzijdige driehoek</strong> in je woonkamer, slaapkamer of werkruimte. De afstand tussen de stenen kan variëren van 20 cm tot enkele meters, afhankelijk van de ruimte.
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Amethist aan de top (spiritualiteit/hoofd)</li>
                <li>Bergkristal linksonder (balans/lichaam)</li>
                <li>Rozenkwarts rechtsonder (liefde/hart)</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                2. Tijdens Meditatie
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Houd één steen in je hand (afhankelijk van je intentie) en leg de andere twee naast je. Of leg alle drie rondom je in driehoeksvorm terwijl je mediteert voor volledige energetische balans.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                3. Voor Betere Nachtrust
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Leg de drie stenen onder je kussen of op je nachtkastje in driehoeksvorm. Amethist helpt bij slapeloosheid, Bergkristal zuivert energie en Rozenkwarts brengt rustige dromen.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                4. Met Intenties & Affirmaties
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Combineer de driehoek met specifieke intenties of affirmaties. Schrijf je intentie op een papiertje en plaats dit in het midden van de driehoek om de energie te versterken.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                5. Regelmatig Reinigen
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Reinig de stenen minstens 1x per maand om hun werking optimaal te houden. Methoden:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Stromend water (niet voor alle stenen geschikt, check eerst)</li>
                <li>Witte salie of palo santo rook</li>
                <li>Maanlicht (vooral bij volle maan)</li>
                <li>Seleniet oplaadplaat</li>
              </ul>
            </div>
          </div>

          {/* Section 5: Do's & Don'ts */}
          <h2 id="dos-donts" className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Do's & Don'ts bij de Gouden Driehoek
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* DO's */}
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-green-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                ✅ DO's – Wat je WEL moet doen
              </h3>
              <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Plaats de stenen met een heldere intentie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Reinig de kristallen regelmatig (minimaal 1x per maand)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Gebruik ze bewust en met respect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Combineer met meditatie en visualisatie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Plaats in het centrum van je huis voor optimale werking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vertrouw op je intuïtie bij plaatsing</span>
                </li>
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-red-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                ❌ DON'Ts – Wat je NIET moet doen
              </h3>
              <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Plaats NIET vlakbij wifi-routers of elektronische apparaten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Gebruik NIET zonder intentie of doel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Laat kinderen of huisdieren er NIET mee spelen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Vergeet NIET te reinigen – stenen absorberen energie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Plaats NIET in chaotische of rommelige ruimtes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Gebruik NIET met negatieve intenties</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ⚠️ Let op: Breekbare Stenen
            </h3>
            <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Deze kristallen zijn niet alleen energetisch krachtig, maar ook <strong>fysiek breekbaar</strong>. Behandel ze met zorg en plaats ze op stabiele oppervlakken waar ze niet kunnen vallen.
            </p>
          </div>

          {/* Section 6: Advies & Tips */}
          <h2 id="plaatsing-tips" className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Advies & Plaatsing Tips
          </h2>

          <div className="space-y-6 mb-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🏠 Centrum van je Huis
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Plaats de driehoek in het <strong>centrum van je huis</strong> (vaak de woonkamer) voor een harmoniserende werking door het hele huis. De energie verspreidt zich vanuit dit punt naar alle kamers.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🕯️ Persoonlijk Ritueel
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Maak er een ritueel van: steek een witte kaars aan in het midden van de driehoek, spreek je intentie uit en visualiseer hoe de energie zich verspreidt. Herhaal dit wekelijks of maandelijks.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ✨ Combinatie met Seleniet
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Voeg <strong>Seleniet</strong> toe aan het midden van de driehoek voor extra zuivering en versterking. Seleniet laadt ook automatisch de andere kristallen op.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                💍 Draag als Sieraad
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Draag Amethist, Rozenkwarts of Bergkristal als <strong>sieraad</strong> (armband, ketting of oorbellen) voor balans onderweg. Je hoeft niet alle drie tegelijk te dragen – kies degene die je op dat moment het meest nodig hebt.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🌙 Maanlicht Opladen
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Leg de driehoek buiten of op een vensterbank tijdens <strong>volle maan</strong> om ze maximaal op te laden met natuurlijke energie. Dit is vooral krachtig bij de volle maan.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                📝 Journaling bij de Driehoek
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Zit bij je Gouden Driehoek terwijl je journalt of mediteert. De gecombineerde energie van de drie stenen kan helpen bij <strong>helderheid, emotionele verwerking en spirituele inzichten</strong>.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="not-prose bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-xl p-8 my-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)] text-white">
              Creëer je Eigen Gouden Driehoek
            </h3>
            <p className="text-lg mb-6 font-[family-name:var(--font-eb-garamond)] text-white">
              Shop Amethist, Bergkristal en Rozenkwarts afzonderlijk of als complete set bij StonesForHealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/alle-producten" className="bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-3 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)]">
                Shop Kristallen
              </Link>
              <Link href="/bestsellers" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white px-8 py-3 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)]">
                Bestsellers
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-8 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Moet de driehoek exact gelijkzijdig zijn?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Nee, het hoeft niet perfect te zijn. Het belangrijkste is de <strong>intentie</strong> en dat de drie stenen samen een driehoeksvorm vormen. De afstand tussen de stenen mag variëren afhankelijk van de ruimte.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke kant moet de top van de driehoek op wijzen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Traditioneel wordt de <strong>Amethist aan de top</strong> geplaatst (wijzend naar boven/noorden voor spirituele verbinding). Maar vertrouw vooral op je intuïtie – sommigen draaien de driehoek anders voor specifieke intenties.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik andere kristallen toevoegen aan de Gouden Driehoek?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Je kunt bijvoorbeeld <strong>Seleniet</strong> in het midden plaatsen voor zuivering, of <strong>Zwarte Toermalijn</strong> toevoegen voor bescherming. De basisdriehoek blijft Amethist-Bergkristal-Rozenkwarts.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe groot moeten de stenen zijn?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                De grootte maakt niet uit voor de werking. <strong>Kleine gepolijste stenen (3-5 cm)</strong> werken net zo goed als grote clusters. Kies wat past bij je ruimte en budget. Grotere stenen hebben wel een groter energieveld.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe vaak moet ik de Gouden Driehoek reinigen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Minimaal <strong>1x per maand</strong>, of vaker als je ze intensief gebruikt of negatieve energie voelt. Na ruzie, ziekte of stressvolle periodes is het goed om de stenen te reinigen. Gebruik maanlicht, salie of een seleniet oplaadplaat.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Is de Gouden Driehoek geschikt voor beginners?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Absoluut! De Gouden Driehoek is <strong>perfect voor beginners</strong> omdat de drie stenen mild en veilig zijn. Ze werken harmonieus samen zonder overweldigende energie. Het is een ideale eerste kristalcombinatie.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik de stenen in mijn broekzak dragen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja, je kunt <strong>één of alle drie de stenen</strong> bij je dragen in een zakje. Ze werken ook individueel krachtig. Kies Amethist voor rust, Bergkristal voor helderheid of Rozenkwarts voor liefde – afhankelijk van wat je op dat moment nodig hebt.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Ervaar de Magie van de Gouden Driehoek
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Gouden Driehoek van Amethist, Bergkristal en Rozenkwarts</strong> is een krachtige en toegankelijke manier om liefde, rust en balans in je leven te brengen. Of je de combinatie nu in je woonkamer plaatst, bij meditatie gebruikt of meeneemt naar je slaapkamer – deze drie edelstenen vormen samen een harmonieus energieveld dat je dagelijks ondersteunt.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De schoonheid van de Gouden Driehoek ligt in zijn <strong>eenvoud en effectiviteit</strong>. Het vereist geen complexe rituelen of uitgebreide kennis. Alles wat je nodig hebt is intentie, de drie kristallen en een open hart.
          </p>
          <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je hoogwaardige Amethist, Bergkristal en Rozenkwarts – zowel afzonderlijk als in complete sets. Alle stenen zijn 100% authentiek en ethisch gewonnen. Gratis verzending vanaf €50. Creëer vandaag je eigen Gouden Driehoek en ervaar de transformerende kracht!
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Complete Gids: Chakra Kristallen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Leer welke kristallen bij elk chakra horen
                  </p>
                </div>
              </Link>
              <Link href="/blog" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Hoe Reinig en Laad je Kristallen?
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    7 methoden voor optimaal onderhoud
                  </p>
                </div>
              </Link>
              <Link href="/blog" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Kristallen voor Beginners
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Complete startgids voor nieuwe gebruikers
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Over StonesForHealth
            </h3>
            <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Bij StonesForHealth geloven we in de kracht van natuurlijke kristallen voor holistisch welzijn. Onze missie is om hoogwaardige, ethisch gewonnen edelstenen toegankelijk te maken voor iedereen – van beginners tot ervaren gebruikers. Alle kristallen in onze collectie zijn 100% authentiek en met liefde geselecteerd om jou te ondersteunen in je reis naar balans en harmonie.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
