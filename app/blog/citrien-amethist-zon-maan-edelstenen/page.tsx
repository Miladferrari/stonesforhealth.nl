import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Citrien & Amethist: Zon & Maan in Edelstenen | StonesForHealth',
  description: 'Ontdek de perfecte balans tussen Citrien en Amethist. ✓ Zon en maan ✓ Energie en rust ✓ Actie en ontspanning ✓ Ametrien ✓ Manifestatie en spiritualiteit',
  keywords: 'citrien amethist, zon maan kristallen, ametrien, citrien werking, amethist betekenis, kristallen combinatie',
  openGraph: {
    title: 'Citrien & Amethist: Zon & Maan in Edelstenen',
    description: 'De complete gids over Citrien en Amethist - de krachtigste duo voor harmonie, succes en spirituele groei.',
    type: 'article',
    publishedTime: '2025-03-12T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/citrien-amethist-zon-maan-edelstenen',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Citrien & Amethist: Zon & Maan in Edelstenen",
  "description": "Ontdek de perfecte balans tussen Citrien en Amethist. Zon en maan energie, actie en rust, manifestatie en spiritualiteit.",
  "image": "https://stonesforhealth.nl/Blog images /Citrien & Amethist- Zon & Maan in Edelstenen.jpeg",
  "datePublished": "2025-03-12T09:00:00Z",
  "dateModified": "2025-03-12T09:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "StonesForHealth"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stones for Health",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stonesforhealth.nl/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stonesforhealth.nl/blog/citrien-amethist-zon-maan-edelstenen"
  }
};

export default function CitrienAmethistPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Citrien & Amethist: Zon & Maan in Edelstenen
        </h1>

        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">12 maart 2025 • 7 min leestijd</p>
          </div>
        </div>
        {/* Featured Image */}
        <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src="/Blog images /Citrien & Amethist- Zon & Maan in Edelstenen.jpeg"
            alt="Citrien en Amethist edelstenen - zon en maan energie in kristallen"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            <strong>Citrien</strong> en <strong>Amethist</strong> zijn twee van de bekendste en meest geliefde edelstenen ter wereld. Ze worden vaak samen gebruikt, omdat hun energie elkaar prachtig aanvult: Citrien straalt de warmte en kracht van de <strong>zon</strong> uit, terwijl Amethist de rust en intuïtie van de <strong>maan</strong> belichaamt. Samen brengen ze balans tussen energie en kalmte, actie en ontspanning, vreugde en wijsheid.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li><Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-purple-600 hover:text-purple-800 underline font-medium">Amethist Complete Gids</Link> - Alle soorten en toepassingen van amethist</li>
              <li><Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">Bergkristal: De Koning</Link> - Versterkt citrien en amethist perfect</li>
              <li><Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">De Gouden Driehoek</Link> - Amethist met bergkristal en rozenkwarts</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#citrien-zon" className="text-gray-700 hover:text-gray-900 underline">Citrien – De Zonnestraal onder de Edelstenen</a></li>
              <li><a href="#amethist-maan" className="text-gray-700 hover:text-gray-900 underline">Amethist – De Steen van Spiritualiteit</a></li>
              <li><a href="#combinatie-balans" className="text-gray-700 hover:text-gray-900 underline">De Combinatie: Zon & Maan in Balans</a></li>
              <li><a href="#ametrien" className="text-gray-700 hover:text-gray-900 underline">Ametrien: Zon en Maan Verenigd</a></li>
              <li><a href="#hoe-gebruiken" className="text-gray-700 hover:text-gray-900 underline">Hoe Gebruik je Citrien & Amethist?</a></li>
              <li><a href="#dos-donts" className="text-gray-700 hover:text-gray-900 underline">Do's & Don'ts</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Section 1: Citrien */}
          <h2 id="citrien-zon" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            ☀️ Citrien – De Zonnestraal onder de Edelstenen
          </h2>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-6 md:p-8 mb-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Kleur & Uiterlijk
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Geel tot goudbruin, helder en sprankelend als zonlicht
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Herkomst
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Brazilië, Madagaskar, Rusland, Verenigde Staten
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Betekenis & Werking van Citrien
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
            <strong>Citrien</strong> is de steen van vreugde, overvloed en manifestatie. Deze stralende gele kristal wordt vaak de <strong>"steen van de koopman"</strong> genoemd omdat het bekend staat om het aantrekken van voorspoed en succes:
          </p>

          <div className="bg-white border border-yellow-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              ✨ Krachten van Citrien:
            </h4>
            <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)] pl-5 list-disc">
              <li><strong>Vreugde & Optimisme:</strong> Brengt een zonnige, positieve energie die somberheid verdrijft</li>
              <li><strong>Zelfvertrouwen & Wilskracht:</strong> Versterkt je persoonlijke kracht en besluitvaardigheid</li>
              <li><strong>Succes & Manifestatie:</strong> Helpt bij het realiseren van doelen en dromen</li>
              <li><strong>Overvloed & Voorspoed:</strong> Trekt financieel succes en kansen aan</li>
              <li><strong>Energie Transformatie:</strong> Zet negatieve energie om in positieve vibraties</li>
              <li><strong>Creativiteit:</strong> Stimuleert creatief denken en innovatie</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded">
            <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Voor wie is Citrien ideaal?</strong> Citrien is perfect voor mensen die meer energie, positiviteit en daadkracht willen ervaren. Ondernemers, studenten en iedereen die een boost in zelfvertrouwen kan gebruiken, profiteert enorm van deze steen.
            </p>
          </div>

          {/* Section 2: Amethist */}
          <h2 id="amethist-maan" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            🌙 Amethist – De Steen van Spiritualiteit en Intuïtie
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 md:p-8 mb-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Kleur & Uiterlijk
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Paars, variërend van licht lavendel tot diep violet
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Herkomst
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Brazilië, Uruguay, Zuid-Afrika, India
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Betekenis & Werking van Amethist
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
            <strong>Amethist</strong> is de meest spirituele steen onder de kwartsfamilie. Deze prachtige paarse kristal staat symbool voor wijsheid, zuiverheid en verbinding met het hogere:
          </p>

          <div className="bg-white border border-purple-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              🔮 Krachten van Amethist:
            </h4>
            <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)] pl-5 list-disc">
              <li><strong>Rust & Ontspanning:</strong> Kalmeert een overactieve geest en vermindert stress</li>
              <li><strong>Betere Slaap:</strong> Helpt bij slapeloosheid en nachtmerries</li>
              <li><strong>Meditatie & Spiritualiteit:</strong> Verdiept spirituele praktijken en bewustzijn</li>
              <li><strong>Intuïtie:</strong> Opent het derde oog en versterkt innerlijke wijsheid</li>
              <li><strong>Bescherming:</strong> Weert negatieve energie en psychische aanvallen af</li>
              <li><strong>Emotionele Balans:</strong> Brengt innerlijke harmonie en emotionele stabiliteit</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 my-6 rounded">
            <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Voor wie is Amethist ideaal?</strong> Amethist is perfect voor gevoelige en spirituele mensen, of voor iedereen die meer rust, innerlijke vrede en spirituele verbinding zoekt. Ideaal voor mensen met een druk leven die behoefte hebben aan ontspanning.
            </p>
          </div>

          {/* Section 3: Combinatie */}
          <h2 id="combinatie-balans" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            ☯️ De Combinatie: Zon & Maan in Balans
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Samen vormen Citrien en Amethist een krachtige <strong>yin-yang balans</strong> die de beste eigenschappen van beide werelden verenigt:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Citrien Yang */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-300 rounded-xl p-6">
              <div className="text-center mb-4">
                <span className="text-5xl">☀️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
                Citrien – Yang Energie
              </h3>
              <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li>✓ Actie & Daadkracht</li>
                <li>✓ Vreugde & Optimisme</li>
                <li>✓ Energie & Vitaliteit</li>
                <li>✓ Manifestatie & Succes</li>
                <li>✓ Externe Focus</li>
                <li>✓ Uitstraling & Zichtbaarheid</li>
              </ul>
            </div>

            {/* Amethist Yin */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-purple-300 rounded-xl p-6">
              <div className="text-center mb-4">
                <span className="text-5xl">🌙</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
                Amethist – Yin Energie
              </h3>
              <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li>✓ Rust & Ontspanning</li>
                <li>✓ Intuïtie & Wijsheid</li>
                <li>✓ Spiritualiteit & Meditatie</li>
                <li>✓ Bescherming & Zuivering</li>
                <li>✓ Interne Focus</li>
                <li>✓ Reflectie & Innerlijk Werk</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 via-white to-purple-50 border-2 border-gray-300 rounded-xl p-8 my-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
              🌟 Samen Creëren Ze Perfecte Harmonie
            </h3>
            <p className="text-gray-700 leading-relaxed text-center mb-6 font-[family-name:var(--font-eb-garamond)]">
              Deze combinatie helpt om:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Stress Loslaten</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Amethist ontspant, Citrien transformeert</p>
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Vertrouwen Vergroten</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Citrien geeft kracht, Amethist innerlijke wijsheid</p>
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Spiritueel Groeien</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Amethist opent, Citrien manifesteert</p>
              </div>
            </div>
          </div>

          {/* Section 4: Ametrien */}
          <h2 id="ametrien" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            💎 Ametrien: Zon en Maan Verenigd
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            In zeldzame gevallen komen Citrien en Amethist samen voor in <strong>één enkele steen</strong>. Deze bijzondere kristal wordt <strong>Ametrien</strong> genoemd – een letterlijke fusie van beide namen en energieën.
          </p>

          <div className="bg-gradient-to-r from-purple-100 via-white to-yellow-100 border-2 border-gray-300 rounded-lg p-6 md:p-8 mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Wat maakt Ametrien zo bijzonder?
            </h3>
            <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)] pl-5 list-disc">
              <li><strong>Natuurlijke Harmonie:</strong> De zon en maan energie zijn al in balans in één steen</li>
              <li><strong>Zeldzaamheid:</strong> Vooral gevonden in Bolivia (Anahi mijn)</li>
              <li><strong>Dubbele Werking:</strong> Draagt zowel manifestatie als spiritualiteit in zich</li>
              <li><strong>Visueel Prachtig:</strong> De overgang van paars naar geel is adembenemend</li>
              <li><strong>Ideaal voor Balans:</strong> Perfect voor mensen die beide energieën willen combineren</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Ametrien is de ultieme balans-steen – het draagt letterlijk <strong>zon en maan</strong> in zich. Als je op zoek bent naar één enkele steen die de krachten van Citrien en Amethist verenigt, is Ametrien de perfecte keuze.
          </p>

          {/* Section 5: Hoe Gebruiken */}
          <h2 id="hoe-gebruiken" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Gebruik je Citrien & Amethist?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Er zijn verschillende manieren om de kracht van Citrien en Amethist te benutten:
          </p>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                1. In Huis Plaatsen
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                <strong>Woonkamer:</strong> Plaats Citrien voor energie en vreugde tijdens sociale momenten.
              </p>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Slaapkamer:</strong> Plaats Amethist voor rust en betere slaap.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 bg-purple-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                2. Tijdens Meditatie
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                <strong>Citrien:</strong> Gebruik voor manifestatie-meditaties en het visualiseren van doelen.
              </p>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Amethist:</strong> Gebruik voor ontspannings-meditaties en spiritueel werk.
              </p>
            </div>

            <div className="border-l-4 border-gray-500 pl-6 bg-gray-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                3. Dragen als Sieraad
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Draag <strong>beide stenen samen</strong> als armband of ketting voor continue balans tussen energie en rust. Of wissel af: Citrien overdag voor productiviteit, Amethist 's avonds voor ontspanning.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6 bg-indigo-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                4. Met Intenties Werken
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                <strong>Citrien:</strong> Houd vast tijdens het stellen van intenties, manifestatie-werk en het schrijven van doelen.
              </p>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Amethist:</strong> Houd vast tijdens spirituele praktijken, droomwerk en innerlijke reflectie.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-6 bg-amber-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                5. In Combinatie met Andere Kristallen
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Voeg <strong>Bergkristal</strong> toe om de werking van beide te versterken. Of combineer met <strong>Rozenkwarts</strong> voor extra emotionele balans (dit creëert een krachtige driehoek).
              </p>
            </div>
          </div>

          {/* Section 6: Do's & Don'ts */}
          <h2 id="dos-donts" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Do's & Don'ts bij Citrien & Amethist
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
                  <span>Gebruik Citrien overdag voor energie en focus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Gebruik Amethist 's avonds voor ontspanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Reinig beide stenen regelmatig met maanlicht of salie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Gebruik met heldere intenties voor beste resultaat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Combineer beide voor perfecte balans in je leven</span>
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
                  <span>Laat Amethist NIET langdurig in fel zonlicht (kan verkleuren)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Gebruik Citrien NIET vlak voor het slapen (te energetisch)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Vergeet NIET te reinigen na intensief gebruik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Gebruik NIET zonder intentie of doel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Laat ze NIET vallen – beide zijn kwarts en kunnen breken</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ⚠️ Let op: Amethist en Zonlicht
            </h3>
            <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Amethist</strong> kan verkleuren bij langdurige blootstelling aan direct zonlicht. Laad Amethist daarom liever op met <strong>maanlicht</strong> of plaats het in indirect licht. Citrien heeft geen last van zonlicht.
            </p>
          </div>

          {/* CTA */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Breng Zon & Maan in je Leven
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Ontdek onze collectie Citrien, Amethist en zeldzame Ametrien bij StonesForHealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Shop Kristallen
              </Link>
              <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Bestsellers
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 id="faq" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-8 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik Citrien en Amethist samen dragen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Absoluut! Samen creëren ze perfecte <strong>balans tussen energie en rust</strong>. Je kunt ze dragen als armband, ketting of gewoon in je zak. De energie's complementeren elkaar mooi.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke steen moet ik kiezen als ik er maar één kan hebben?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Kies <strong>Citrien</strong> als je meer energie, zelfvertrouwen en succes wilt. Kies <strong>Amethist</strong> als je rust, spiritualiteit en betere slaap zoekt. Of kies <strong>Ametrien</strong> voor het beste van beide werelden!
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Is Ametrien beter dan Citrien en Amethist apart?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Niet per se <strong>beter</strong>, maar wel <strong>anders</strong>. Ametrien heeft de energie al in balans in één steen. Afzonderlijke stenen geven je meer flexibiliteit om specifiek met één energie te werken wanneer je dat nodig hebt.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welk chakra hoort bij Citrien en Amethist?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Citrien</strong> resoneert met het <strong>Zonnevlechtchakra</strong> (persoonlijke kracht) en soms het Sacraalchakra. <strong>Amethist</strong> resoneert met het <strong>Derde Oog</strong> (intuïtie) en <strong>Kroonchakra</strong> (spiritualiteit).
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe reinig ik Citrien en Amethist?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Beide:</strong> Maanlicht, salie, palo santo, seleniet oplaadplaat. <strong>Alleen Citrien:</strong> Ook veilig in (indirect) zonlicht. <strong>Amethist:</strong> Vermijd langdurig direct zonlicht – gebruik liever maanlicht.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn deze stenen geschikt voor beginners?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Zowel Citrien als Amethist zijn <strong>perfect voor beginners</strong>. Ze hebben milde, veilige energie en zijn veelzijdig inzetbaar. Ze behoren tot de meest aanbevolen stenen voor mensen die net beginnen met kristallen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik Citrien onder mijn kussen leggen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Niet aan te raden.</strong> Citrien is te energetisch voor onder je kussen en kan je wakker houden. Kies voor Amethist onder je kussen voor betere slaap. Gebruik Citrien liever overdag of op je bureau.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Laat Zon & Maan je Pad Verlichten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            <strong>Citrien en Amethist</strong> zijn twee edelstenen die elkaar perfect aanvullen. Citrien brengt de warmte, vreugde en manifestatiekracht van de zon, terwijl Amethist de rust, intuïtie en spiritualiteit van de maan draagt. Samen creëren ze een harmonieuze balans die je ondersteunt in alle aspecten van het leven.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Of je nu kiest voor beide stenen afzonderlijk om flexibel te kunnen wisselen, of voor de zeldzame <strong>Ametrien</strong> waarin zon en maan al verenigd zijn – deze kristallen brengen krachtige transformatie in je dagelijks leven.
          </p>
          <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je hoogwaardige Citrien, Amethist en zeldzame Ametrien – alle 100% authentiek en ethisch gewonnen. Gratis verzending vanaf €50. Laat deze prachtige zon en maan stenen je pad verlichten naar succes, vreugde én innerlijke vrede!
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Amethist Complete Gids
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Alles over soorten, werking en vindplaatsen
                  </p>
                </div>
              </Link>
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal: De Koning
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Versterkt beide stenen perfect
                  </p>
                </div>
              </Link>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Amethist, Bergkristal & Rozenkwarts
                  </p>
                </div>
              </Link>
              <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Rozenkwarts: Steen van Liefde
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Hartchakra steen voor emotionele balans
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Complete Gids: Chakra Kristallen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Welke stenen bij welke chakra's
                  </p>
                </div>
              </Link>
              <Link href="/blog/volle-maan-oktober-2025" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Volle Maan Rituelen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Gebruik amethist bij volle maan
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Over StonesForHealth
            </h3>
            <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Bij StonesForHealth geloven we in de kracht van natuurlijke kristallen voor holistisch welzijn. Onze missie is om hoogwaardige, ethisch gewonnen edelstenen toegankelijk te maken voor iedereen. Alle kristallen in onze collectie zijn 100% authentiek en met liefde geselecteerd om jou te ondersteunen in je reis naar balans tussen energie en rust, actie en contemplatie, zon en maan.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
