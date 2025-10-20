import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Chakra\'s Uitgelegd: Het Energiesysteem van je Lichaam | StonesForHealth',
  description: 'Ontdek hoe het chakra-systeem werkt. Complete gids over de 7 hoofdchakra\'s, hun kleuren, betekenis en hoe je ze in balans brengt met edelstenen en meditatie.',
  keywords: 'chakras, chakra systeem, 7 chakras, chakra kleuren, chakra betekenis, energiesysteem, edelstenen chakras, chakra balans',
  openGraph: {
    title: 'Chakra\'s Uitgelegd: Zo Werkt het Energiesysteem van je Lichaam',
    description: 'Complete gids over chakra\'s, hun betekenis en hoe je ze in balans brengt met edelstenen.',
    type: 'article',
    publishedTime: '2025-10-03T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/chakras-uitgelegd-energiesysteem',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Chakra's Uitgelegd: Zo Werkt het Energiesysteem van je Lichaam",
  "description": "Ontdek hoe het chakra-systeem werkt. Leer over de 7 hoofdchakra's, hun kleuren, betekenis en hoe je ze in balans brengt met edelstenen en meditatie.",
  "image": "https://stonesforhealth.nl/blog-images/Chakra's Uitgelegd- Zo Werkt het Energiesysteem van je Lichaam.jpeg",
  "datePublished": "2025-10-03T09:00:00Z",
  "dateModified": "2025-10-03T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/chakras-uitgelegd-energiesysteem"
  }
};

export default function ChakrasUitgelegPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Chakra's Uitgelegd: Zo Werkt het Energiesysteem van je Lichaam
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">3 oktober 2025 • 10 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/blog-images/Chakra's Uitgelegd- Zo Werkt het Energiesysteem van je Lichaam.jpeg"
            alt="Chakra's uitgelegd - Het energiesysteem van je lichaam met de 7 hoofdchakra's"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Alles in het universum bestaat uit energie - ook jij. Binnen de oosterse en spirituele tradities wordt die levensenergie ook wel <strong>prana</strong> of <strong>chi</strong> genoemd. Deze energie stroomt door je lichaam via energiebanen (nadi's) en komt samen in energiecentra, de <strong>chakra's</strong>.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Het woord <em>chakra</em> komt uit het Sanskriet en betekent letterlijk <strong>"wiel"</strong> of <strong>"draaiend energiepunt"</strong>. Elk chakra is een draaikolk van energie die invloed heeft op je lichaam, emoties, geest en ziel. Wanneer de chakra's in balans zijn, voel je je vitaal, rustig en verbonden. Zijn ze geblokkeerd, dan kan dat leiden tot spanning, vermoeidheid of emotionele disbalans.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Chakra Kristallen - Complete Gids
                </Link> - Welke edelstenen bij welk chakra horen
              </li>
              <li>
                <Link href="/blog/chakras-en-hun-kleuren" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Chakra's en hun Kleuren
                </Link> - Dieper in op de energiepunten
              </li>
              <li>
                <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  De Gouden Driehoek
                </Link> - Krachtige kristalcombinatie voor chakra balans
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#hoe-werkt-chakra-systeem" className="text-gray-700 hover:text-gray-900 underline">Hoe Werkt het Chakra-systeem?</a></li>
              <li><a href="#7-hoofdchakras" className="text-gray-700 hover:text-gray-900 underline">De 7 Hoofdchakra's Uitgelegd</a></li>
              <li><a href="#edelstenen-chakra-balans" className="text-gray-700 hover:text-gray-900 underline">Edelstenen en Chakra-balans</a></li>
              <li><a href="#chakras-in-balans" className="text-gray-700 hover:text-gray-900 underline">Chakra's in Balans Brengen</a></li>
              <li><a href="#waarom-belangrijk" className="text-gray-700 hover:text-gray-900 underline">Waarom Chakra's Belangrijk Zijn</a></li>
            </ul>
          </div>

          {/* Hoe Werkt Chakra Systeem */}
          <h2 id="hoe-werkt-chakra-systeem" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Werkt het Chakra-systeem?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Er zijn <strong>zeven hoofdchakra's</strong> die zich langs je ruggengraat bevinden — van je stuitje tot aan je kruin. Ze vormen samen een energetische route, waarbij elk chakra zijn eigen kleur, element en betekenis heeft.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Wanneer energie vrij door alle chakra's stroomt, voel je je in balans. Maar <strong>stress, negatieve emoties of onverwerkte ervaringen</strong> kunnen die stroming blokkeren. Door middel van meditatie, ademhaling, yoga, <Link href="/alle-producten" className="text-[#492c4a] hover:underline font-semibold">edelstenen</Link> of klanken kun je de chakra's weer openen en in harmonie brengen.
          </p>

          {/* 7 Hoofdchakras */}
          <h2 id="7-hoofdchakras" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            De 7 Hoofdchakra's Uitgelegd
          </h2>

          {/* Chakra Tabel */}
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Chakra</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Kleur</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Locatie</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Thema</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">1. Wortelchakra (Muladhara)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Rood</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Onderkant ruggengraat</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Veiligheid, basis, overleven</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">2. Sacraalchakra (Svadhisthana)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Oranje</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Onderbuik</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Creativiteit, emoties, sensualiteit</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">3. Zonnevlechtchakra (Manipura)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Geel</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Maagstreek</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Wilskracht, zelfvertrouwen, energie</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">4. Hartchakra (Anahata)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Groen / Roze</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Hartstreek</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Liefde, compassie, vergeving</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">5. Keelchakra (Vishuddha)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Lichtblauw</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Keel en nek</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Communicatie, expressie, waarheid</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">6. Voorhoofdchakra (Ajna)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Indigo</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Tussen wenkbrauwen</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Intuïtie, inzicht, bewustzijn</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">7. Kruinchakra (Sahasrara)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Wit / Violet</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Boven je hoofd</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Spirituele verbinding, verlichting</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Edelstenen en Chakra Balans */}
          <h2 id="edelstenen-chakra-balans" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Edelstenen en Chakra-balans
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            <Link href="/alle-producten" className="text-[#492c4a] hover:underline font-semibold">Edelstenen</Link> werken op <strong>vibratieniveau</strong>: elke steen heeft een eigen trilling die overeenkomt met de frequentie van een bepaald chakra. Wanneer je een steen bij het bijpassende chakra draagt of neerlegt, helpt dat om de energie te activeren, zuiveren of kalmeren.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Voorbeelden van Chakra Edelstenen:
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><Link href="/alle-producten?search=amethist" className="text-[#492c4a] hover:underline font-semibold">Amethist</Link> kalmeert het voorhoofdchakra</li>
              <li><Link href="/alle-producten?search=citrien" className="text-[#492c4a] hover:underline font-semibold">Citrien</Link> activeert de zonnevlecht</li>
              <li><Link href="/alle-producten?search=rozenkwarts" className="text-[#492c4a] hover:underline font-semibold">Rozenkwarts</Link> opent het hartchakra</li>
              <li><Link href="/alle-producten?search=bergkristal" className="text-[#492c4a] hover:underline font-semibold">Bergkristal</Link> reinigt alle chakra's</li>
            </ul>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Je kunt ook kiezen voor een <strong>chakra set</strong> - met zeven stenen, elk afgestemd op één chakra. Bekijk onze <Link href="/alle-producten?search=chakra" className="text-[#492c4a] hover:underline">chakra collectie</Link>.
          </p>

          {/* Chakras in Balans */}
          <h2 id="chakras-in-balans" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Chakra's in Balans Brengen
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Er zijn veel manieren om je chakra's te reinigen of te activeren:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🧘 Meditatie
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Visualiseer elk chakra als een draaiend wiel van licht in de bijbehorende kleur.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                💎 Edelstenen
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Leg stenen op de chakrapunten tijdens meditatie of draag ze als <Link href="/alle-producten?search=chakra+armband" className="text-[#492c4a] hover:underline">sieraden</Link>.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🌿 Etherische Oliën
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Gebruik geur om chakra's te activeren (bijv. lavendel voor het kruinchakra).
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🔔 Klankschalen
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Elke toon resoneert met een specifiek chakra en helpt energie te herstellen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🌙 Maanlicht
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Laad je <Link href="/blog/edelstenen-opladen-maanlicht" className="text-[#492c4a] hover:underline">chakra stenen op in maanlicht</Link> voor extra kracht.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🧘‍♀️ Yoga
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Specifieke houdingen activeren bepaalde chakra's (bijv. hartopener voor hartchakra).
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Door deze rituelen regelmatig te doen, kun je <strong>energie blokkades loslaten</strong> en innerlijke harmonie herstellen.
          </p>

          {/* Waarom Belangrijk */}
          <h2 id="waarom-belangrijk" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Waarom Chakra's Belangrijk Zijn
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Wanneer je chakra's in balans zijn:
          </p>

          <div className="bg-purple-50 border-l-4 border-[#492c4a] rounded-lg p-6 md:p-8 mb-8">
            <ul className="space-y-3 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>✓ Stroomt je energie vrij</li>
              <li>✓ Voel je je emotioneel stabieler</li>
              <li>✓ Ervaar je meer focus, rust en intuïtie</li>
              <li>✓ Leef je dichter bij je ware zelf</li>
            </ul>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Een gezonde chakra-balans ondersteunt niet alleen je <strong>spirituele groei</strong>, maar ook je <strong>fysieke en mentale welzijn</strong>.
          </p>

          {/* Tot Slot */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Tot Slot
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Het chakra-systeem is een <strong>eeuwenoud kompas</strong> voor innerlijke balans en bewustwording. Door je chakra's te begrijpen en te verzorgen, geef je je lichaam en ziel ruimte om te helen.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Ontdek bij <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stonesforhealth.nl</Link> de <Link href="/alle-producten?search=chakra" className="text-[#492c4a] hover:underline">chakra edelstenen</Link>, <Link href="/alle-producten?search=chakra+armband" className="text-[#492c4a] hover:underline">sieraden</Link> en sets om jouw energie in balans te brengen.
          </p>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Breng je Chakra's in Balans
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Ontdek onze collectie chakra edelstenen, sets en sieraden. Perfect afgestemd op alle 7 chakra's.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten?search=chakra" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Bekijk Chakra Edelstenen
              </Link>
              <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Onze Bestsellers
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Chakra Kristallen Gids
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Welke edelstenen bij welk chakra
                  </p>
                </div>
              </Link>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Krachtige kristalcombinatie
                  </p>
                </div>
              </Link>
              <Link href="/blog/edelstenen-opladen-maanlicht" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Edelstenen Opladen
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Reinig en laad je chakra stenen op
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
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Bij StonesForHealth geloven we in de kracht van natuurlijke kristallen en edelstenen voor holistisch welzijn. Onze missie is om hoogwaardige, ethisch gewonnen kristallen toegankelijk te maken voor iedereen die werkt aan persoonlijke groei en spirituele ontwikkeling. Alle producten in onze collectie zijn 100% authentiek en met liefde geselecteerd.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
