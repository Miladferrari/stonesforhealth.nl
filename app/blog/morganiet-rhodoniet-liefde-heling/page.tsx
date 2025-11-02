import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Morganiet & Rhodoniet: Edelstenen van Liefde & Heling | StonesForHealth',
  description: 'Ontdek Morganiet en Rhodoniet voor hartchakra heling. ✓ Onvoorwaardelijke liefde ✓ Emotionele heling ✓ Vergeving ✓ Relaties ✓ Zelfliefde ✓ Compassie',
  keywords: 'morganiet, rhodoniet, hartchakra stenen, liefde edelstenen, emotionele heling kristallen, vergeving stenen',
  openGraph: {
    title: 'Morganiet & Rhodoniet: Edelstenen van Liefde & Heling',
    description: 'De complete gids over Morganiet en Rhodoniet - zachte liefde en krachtige emotionele transformatie.',
    type: 'article',
    publishedTime: '2025-03-18T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/morganiet-rhodoniet-liefde-heling',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Morganiet & Rhodoniet: Edelstenen van Liefde & Heling",
  "description": "Ontdek Morganiet en Rhodoniet voor hartchakra heling. Onvoorwaardelijke liefde, emotionele heling, vergeving en compassie.",
  "image": "https://stonesforhealth.nl/blog-images/Morganiet & Rhodoniet- Edelstenen van Liefde & Heling.webp",
  "datePublished": "2025-03-18T09:00:00Z",
  "dateModified": "2025-03-18T09:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "StonesForHealth"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stones for Health",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stonesforhealth.nl/logo.webp"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stonesforhealth.nl/blog/morganiet-rhodoniet-liefde-heling"
  }
};

export default function MorganietRhodonietPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Morganiet & Rhodoniet: Edelstenen van Liefde & Heling
        </h1>

        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">18 maart 2025 • 7 min leestijd</p>
          </div>
        </div>
        {/* Featured Image */}
        <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src="/blog-images/Morganiet & Rhodoniet- Edelstenen van Liefde & Heling.webp"
            alt="Morganiet en Rhodoniet edelstenen - hartchakra kristallen voor liefde en emotionele heling"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            <strong>Morganiet</strong> en <strong>Rhodoniet</strong> zijn edelstenen die beide verbonden zijn met het <strong>hartchakra</strong> en symbool staan voor liefde, compassie en innerlijke heling. Toch hebben ze elk hun eigen unieke energie en werking: Morganiet is de zachte, liefdevolle steen van onvoorwaardelijke liefde en emotionele balans, terwijl Rhodoniet de krachtige heler is die helpt oude wonden en trauma's los te laten.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li><Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-purple-600 hover:text-purple-800 underline font-medium">Rozenkwarts: Steen van Liefde</Link> - De meest populaire hartchakra steen</li>
              <li><Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">Chakra Kristallen Complete Gids</Link> - Alle hartchakra stenen op een rij</li>
              <li><Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">De Gouden Driehoek</Link> - Combineer met rozenkwarts voor extra kracht</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#morganiet" className="text-gray-700 hover:text-gray-900 underline">Morganiet - De Steen van Onvoorwaardelijke Liefde</a></li>
              <li><a href="#rhodoniet" className="text-gray-700 hover:text-gray-900 underline">Rhodoniet - De Steen van Heling & Vergeving</a></li>
              <li><a href="#combinatie" className="text-gray-700 hover:text-gray-900 underline">De Combinatie: Zachte Liefde & Krachtige Heling</a></li>
              <li><a href="#hoe-gebruiken" className="text-gray-700 hover:text-gray-900 underline">Hoe Gebruik je Morganiet & Rhodoniet?</a></li>
              <li><a href="#dos-donts" className="text-gray-700 hover:text-gray-900 underline">Do's & Don'ts</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Section 1: Morganiet */}
          <h2 id="morganiet" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            💗 Morganiet - De Steen van Onvoorwaardelijke Liefde
          </h2>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-l-4 border-pink-400 p-6 md:p-8 mb-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Kleur & Uiterlijk
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Lichtroze tot perzikroze, doorschijnend en vaak helder als een zachte dageraad
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Herkomst
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Brazilië, Mozambique, Madagaskar, Afghanistan
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Betekenis & Werking van Morganiet
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
            <strong>Morganiet</strong> behoort tot de beryl-familie (net als smaragd en aquamarijn) en wordt vaak de <strong>"engelsteen"</strong> genoemd vanwege zijn hoge, liefdevolle vibratie. Deze zachte roze kristal werkt op het diepste niveau van het hart:
          </p>

          <div className="bg-white border border-pink-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              ✨ Krachten van Morganiet:
            </h4>
            <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)] pl-5 list-disc">
              <li><strong>Opent het Hartchakra:</strong> Brengt balans en harmonie in emoties op zachte wijze</li>
              <li><strong>Onvoorwaardelijke Liefde:</strong> Verbindt je met pure, universele liefde</li>
              <li><strong>Loslaten van Angsten:</strong> Helpt stress en angsten in relaties te verminderen</li>
              <li><strong>Compassie & Empathie:</strong> Bevordert begrip en mededogen voor jezelf en anderen</li>
              <li><strong>Zachte Communicatie:</strong> Stimuleert liefdevolle, authentieke gesprekken</li>
              <li><strong>Hoge Vibratie:</strong> Verbindt je met engelachtige en spirituele energie</li>
              <li><strong>Zelfliefde:</strong> Helpt je jezelf te accepteren en liefhebben zoals je bent</li>
            </ul>
          </div>

          <div className="bg-pink-50 border-l-4 border-pink-400 p-6 my-6 rounded">
            <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <strong>Voor wie is Morganiet ideaal?</strong> Morganiet is perfect voor wie meer innerlijke rust, zelfliefde en harmonie in relaties wil ervaren. Ook geschikt voor gevoelige mensen die bescherming nodig hebben terwijl hun hart open blijft. Ideaal voor nieuwe liefde, relatieverdieping en het helen van emotionele kwetsbaarheid.
            </p>
          </div>

          {/* Section 2: Rhodoniet */}
          <h2 id="rhodoniet" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            ❤️‍🩹 Rhodoniet - De Steen van Heling & Vergeving
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 border-l-4 border-red-400 p-6 md:p-8 mb-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Kleur & Uiterlijk
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Roze tot diep rood met karakteristieke zwarte aders of vlekken (mangaan)
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                  Herkomst
                </h3>
                <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Rusland, Australië, Zweden, Verenigde Staten
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Betekenis & Werking van Rhodoniet
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
            <strong>Rhodoniet</strong> is een krachtige helingssteen voor emotionele trauma's en hartpijn. De naam komt van het Griekse woord "rhodon" (roos), wat zijn verbinding met liefde en heling symboliseert. De zwarte aders in Rhodoniet vertegenwoordigen de donkere momenten die we allemaal meemaken - maar ook de kracht om erdoorheen te groeien:
          </p>

          <div className="bg-white border border-red-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              🔥 Krachten van Rhodoniet:
            </h4>
            <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)] pl-5 list-disc">
              <li><strong>Heelt Emotionele Wonden:</strong> Werkt diep op oude trauma's, hartpijn en verdriet</li>
              <li><strong>Vergeving:</strong> Brengt vergeving voor jezelf en anderen, essentieel voor vooruitgang</li>
              <li><strong>Innerlijke Kracht:</strong> Stimuleert zelfvertrouwen en emotionele veerkracht</li>
              <li><strong>Liefdevolle Assertiviteit:</strong> Helpt grenzen stellen vanuit liefde, niet uit angst</li>
              <li><strong>Crisis Ondersteuning:</strong> Geeft kracht tijdens moeilijke periodes van verlies of verdriet</li>
              <li><strong>Transformatie:</strong> Zet pijn om in wijsheid en groei</li>
              <li><strong>Relationele Heling:</strong> Helpt patronen doorbreken in moeilijke relaties</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-6 my-6 rounded">
            <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <strong>Voor wie is Rhodoniet ideaal?</strong> Rhodoniet is een krachtige steen voor genezing, vergeving en innerlijke kracht. Perfect voor mensen die werken aan het loslaten van oude pijn, verwerkingsprocessen na relatiebreuk, of het helen van jeugdtrauma's. Ook geschikt voor mensen die moeite hebben met vergeven (zichzelf of anderen).
            </p>
          </div>

          {/* Section 3: Combinatie */}
          <h2 id="combinatie" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            💞 De Combinatie: Zachte Liefde & Krachtige Heling
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Morganiet en Rhodoniet vullen elkaar prachtig aan in hartchakra werk. Ze benaderen liefde en heling vanuit verschillende hoeken, maar werken naar hetzelfde doel:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Morganiet */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-300 rounded-xl p-6">
              <div className="text-center mb-4">
                <span className="text-5xl">💗</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
                Morganiet - Zachte Opener
              </h3>
              <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li>✓ Opent het hart zachtzinnig</li>
                <li>✓ Brengt liefde en compassie</li>
                <li>✓ Creëert veiligheid om kwetsbaar te zijn</li>
                <li>✓ Bevordert zelfacceptatie</li>
                <li>✓ Verbindt met engelachtige energie</li>
                <li>✓ Zachte, rustgevende vibratie</li>
              </ul>
            </div>

            {/* Rhodoniet */}
            <div className="bg-gradient-to-br from-red-50 to-rose-100 border-2 border-red-300 rounded-xl p-6">
              <div className="text-center mb-4">
                <span className="text-5xl">❤️‍🩹</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
                Rhodoniet - Krachtige Heler
              </h3>
              <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li>✓ Heelt oude wonden diepgaand</li>
                <li>✓ Brengt vergeving en loslaten</li>
                <li>✓ Geeft kracht en veerkracht</li>
                <li>✓ Doorbreekt negatieve patronen</li>
                <li>✓ Transformeert pijn in wijsheid</li>
                <li>✓ Actieve, krachtige energie</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 via-white to-red-50 border-2 border-rose-300 rounded-xl p-8 my-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
              🌸 Samen Creëren Ze Volledige Hartheling
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-center font-[family-name:var(--font-eb-garamond)]">
              Deze combinatie is perfect voor:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center bg-white p-4 rounded-lg">
                <p className="text-gray-700 font-semibold mb-2 font-[family-name:var(--font-eb-garamond)]">Relatieheling</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Rhodoniet heelt oude pijn, Morganiet opent voor nieuwe liefde</p>
              </div>
              <div className="text-center bg-white p-4 rounded-lg">
                <p className="text-gray-700 font-semibold mb-2 font-[family-name:var(--font-eb-garamond)]">Zelfliefde</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Rhodoniet helpt vergeven, Morganiet helpt jezelf liefhebben</p>
              </div>
              <div className="text-center bg-white p-4 rounded-lg">
                <p className="text-gray-700 font-semibold mb-2 font-[family-name:var(--font-eb-garamond)]">Emotionele Balans</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Rhodoniet geeft kracht, Morganiet geeft rust</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 border-l-4 border-rose-500 p-6 my-8 rounded">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              Het Proces van Hartheling
            </h3>
            <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <strong>Rhodoniet</strong> helpt de oude blokkades los te laten die liefde in de weg staan - het ruimt op en heelt. <strong>Morganiet</strong> opent vervolgens het hart op een zachte, liefdevolle manier - het vult aan en herstelt. Samen zorgen ze ervoor dat er ruimte komt voor nieuwe liefde, harmonie en groei.
            </p>
          </div>

          {/* Section 4: Hoe Gebruiken */}
          <h2 id="hoe-gebruiken" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Gebruik je Morganiet & Rhodoniet?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Er zijn verschillende krachtige manieren om met deze hartchakra stenen te werken:
          </p>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-pink-400 pl-6 bg-pink-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                1. Dragen als Sieraad
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Draag ze <strong>samen als armband of hanger</strong> om het hartchakra dagelijks te ondersteunen. De stenen werken continu aan het openen en helen van je hart.
              </p>
              <p className="text-sm text-gray-600 italic font-[family-name:var(--font-eb-garamond)]">
                Tip: Draag ze direct op de huid voor maximale werking.
              </p>
            </div>

            <div className="border-l-4 border-red-400 pl-6 bg-red-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                2. Hartchakra Meditatie
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Leg tijdens meditatie:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Morganiet</strong> op je hartchakra (midden borst) voor opening</li>
                <li><strong>Rhodoniet</strong> op je zonnevlecht of in je hand voor kracht</li>
                <li>Of beide op je hartchakra voor volledige heling</li>
              </ul>
              <p className="text-sm text-gray-600 italic mt-2 font-[family-name:var(--font-eb-garamond)]">
                Visualiseer hoe Rhodoniet oude pijn oplost en Morganiet liefde inbrengt.
              </p>
            </div>

            <div className="border-l-4 border-rose-400 pl-6 bg-rose-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                3. In de Slaapkamer Plaatsen
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Plaats beide stenen in de <strong>slaapkamer</strong> om harmonie en zachtheid in relaties te versterken. Ze helpen communicatie te verbeteren en emotionele intimiteit te verdiepen.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-6 bg-pink-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                4. Met Affirmaties Werken
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Houd de stenen vast terwijl je affirmaties uitspreekt:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Met Rhodoniet:</strong> "Ik vergeef mezelf en anderen. Ik laat oude pijn los."</li>
                <li><strong>Met Morganiet:</strong> "Ik open mijn hart voor liefde. Ik ben waardig geliefd te worden."</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-6 bg-red-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                5. Heling Ritueel
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Creëer een <strong>heling ritueel</strong>: licht een roze kaars aan, schrijf wat je wilt loslaten (werk met Rhodoniet), daarna wat je wilt ontvangen (werk met Morganiet). Verbrand het papier veilig als symbolische transformatie.
              </p>
            </div>
          </div>

          {/* Section 5: Do's & Don'ts */}
          <h2 id="dos-donts" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Do's & Don'ts bij Morganiet & Rhodoniet
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* DO's */}
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-green-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                ✅ DO's - Wat je WEL moet doen
              </h3>
              <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Gebruik bewuste intenties en affirmaties voor diepere werking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Draag ze dicht bij je hart (als ketting of in borstzak)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Combineer met journaling over gevoelens en inzichten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Reinig regelmatig met maanlicht of salie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Gebruik in combinatie met ademhalingsoefeningen</span>
                </li>
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-red-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                ❌ DON'Ts - Wat je NIET moet doen
              </h3>
              <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Vermijd intens zonlicht (Morganiet kan vervagen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Gebruik NIET alleen passief zonder intentie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Verwacht geen instant resultaat - heling vraagt tijd</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Forceer GEEN emoties - laat het natuurlijk gebeuren</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Negeer NIET professionele hulp bij zware trauma's</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ⚠️ Let op: Emotionele Intensiteit
            </h3>
            <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Vooral <strong>Rhodoniet</strong> kan intense emoties naar boven brengen tijdens het helingsproces. Dit is normaal en deel van de transformatie. Zorg voor voldoende zelfregie en zoek indien nodig professionele begeleiding bij zware trauma's.
            </p>
          </div>

          {/* CTA */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Open je Hart voor Liefde & Heling
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Ontdek Morganiet en Rhodoniet in onze collectie hartchakra edelstenen bij StonesForHealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Shop Hartchakra Stenen
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
                Welke steen moet ik kiezen: Morganiet of Rhodoniet?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Kies <strong>Morganiet</strong> als je primair zoekt naar zachtheid, zelfliefde en het openen van je hart voor nieuwe liefde. Kies <strong>Rhodoniet</strong> als je werkt aan het helen van oude wonden, vergeving of het doorbreken van patronen. Voor <strong>volledig hartheling</strong> is de combinatie ideaal.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik Morganiet en Rhodoniet samen dragen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Absoluut! Ze versterken elkaar perfect. <strong>Morganiet</strong> zorgt voor zachtheid tijdens het helingsproces, terwijl <strong>Rhodoniet</strong> de diepe transformatie faciliteert. Samen creëren ze een veilige ruimte voor hartheling.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe lang duurt het voordat ik resultaat zie?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Dit verschilt per persoon en situatie. Sommigen voelen direct een <strong>zachtheid of emotionele release</strong>, anderen merken geleidelijke veranderingen over weken. Emotionele heling is een proces - wees geduldig en liefdevol met jezelf.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn deze stenen geschikt voor relationele problemen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! <strong>Rhodoniet</strong> helpt oude pijn en patronen los te laten die relaties belasten. <strong>Morganiet</strong> opent ruimte voor compassie, communicatie en nieuwe intimiteit. Samen ondersteunen ze relationele heling en verdieping.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe reinig ik Morganiet en Rhodoniet?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Maanlicht</strong> is ideaal voor beide (vooral bij volle maan). Ook <strong>salie rook, palo santo of seleniet</strong> werkt goed. Vermijd langdurig direct zonlicht voor Morganiet (kan kleur vervagen). Reinig na emotioneel werk of minimaal 1x per maand.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik deze stenen combineren met Rozenkwarts?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! <strong>Rozenkwarts</strong> past perfect bij zowel Morganiet als Rhodoniet. Alle drie werken op het hartchakra. Je kunt ze combineren voor extra krachtige hartchakra heling - bijvoorbeeld in een driehoek geplaatst of alle drie gedragen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn deze stenen geschikt voor kinderen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Morganiet</strong> is zeer geschikt voor kinderen - het heeft een zachte, geruststellende energie. <strong>Rhodoniet</strong> kan intens zijn voor jonge kinderen. Voor kinderen boven de 12 jaar met emotionele uitdagingen kan Rhodoniet ondersteunend werken onder begeleiding.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Laat Liefde & Heling je Hart Transformeren
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            <strong>Morganiet en Rhodoniet</strong> zijn beide krachtige hartchakra stenen met unieke eigenschappen. Morganiet brengt zachtheid, onvoorwaardelijke liefde en emotionele balans. Rhodoniet heelt oude wonden, brengt vergeving en innerlijke kracht. Samen creëren ze een complete hartchakra transformatie.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Of je nu werkt aan <strong>zelfliefde, relationele heling, het loslaten van oude pijn of het openen voor nieuwe liefde</strong> - deze stenen bieden krachtige ondersteuning. Rhodoniet ruimt op en heelt, Morganiet vult aan en herstelt. Dit is het proces van complete emotionele transformatie.
          </p>
          <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je hoogwaardige Morganiet en Rhodoniet - zowel afzonderlijk als in sets. Alle stenen zijn 100% authentiek en ethisch gewonnen. Gratis verzending vanaf €50. Laat deze prachtige hartstenen je pad naar liefde, vergeving en emotionele vrijheid ondersteunen!
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Rozenkwarts: Steen van Liefde
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De meest geliefde hartchakra steen
                  </p>
                </div>
              </Link>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Met Rozenkwarts voor hartchakra
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Complete Gids: Chakra Kristallen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Alle hartchakra stenen
                  </p>
                </div>
              </Link>
              <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Amethist Complete Gids
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Voor rust en spirituele heling
                  </p>
                </div>
              </Link>
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal: De Koning
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Versterkt alle hartchakra stenen
                  </p>
                </div>
              </Link>
              <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    S4H Sieraden Collectie
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Draag hartchakra stenen dagelijks
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
              Bij StonesForHealth geloven we in de helende kracht van natuurlijke kristallen voor emotioneel welzijn. Onze missie is om hoogwaardige, ethisch gewonnen edelstenen toegankelijk te maken voor iedereen die werkt aan hartheling, zelfliefde en emotionele groei. Alle kristallen in onze collectie zijn 100% authentiek en met liefde geselecteerd om jou te ondersteunen op je reis naar een open, heel en liefdevol hart.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
