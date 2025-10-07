import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'S4H Koperen Armbanden met Magneten - Stijl, Balans en Natuurlijke Energie | StonesForHealth',
  description: 'Ontdek S4H koperen armbanden met magneten. Eeuwenoude kennis van koper en magnetische therapie voor balans, herstel en stijlvolle energie.',
  keywords: 'koperen armband, magneettherapie, S4H armbanden, koper gezondheid, magnetische armband, natuurlijke energie, gewrichtsklachten',
  openGraph: {
    title: 'S4H Koperen Armbanden met Magneten - Natuurlijke Energie & Stijl',
    description: 'De kracht van koper en magneten gecombineerd in stijlvolle armbanden voor balans en herstel.',
    type: 'article',
    publishedTime: '2025-10-01T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/s4h-koperen-armbanden-magneten',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie",
  "description": "Ontdek de kracht van koperen armbanden met magneten. Eeuwenoude kennis gecombineerd met modern design voor balans, herstel en stijlvolle energie.",
  "image": "https://stonesforhealth.nl/Blog images /S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie.jpeg",
  "datePublished": "2025-10-01T09:00:00Z",
  "dateModified": "2025-10-01T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/s4h-koperen-armbanden-magneten"
  }
};

export default function S4HKoperenArmbanden() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie
        </h1>

        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">1 oktober 2025 • 8 min leestijd</p>
          </div>
        </div>

        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/Blog images /S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie.jpeg"
            alt="S4H Koperen armbanden met magneten voor balans en natuurlijke energie"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Koper is al eeuwenlang een geliefd metaal — niet alleen vanwege zijn warme, roodgouden gloed, maar ook door zijn vermeende positieve werking op het lichaam en de energiehuishouding. De <strong>koperen armbanden met magneten van S4H</strong> combineren klassieke schoonheid met natuurlijke balans. Ze zijn meer dan een sieraad; ze zijn een symbool van kracht, herstel en harmonie.
          </p>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  S4H Sieraden - Spirituele Kracht en Stijl
                </Link> - Ontdek meer S4H collecties
              </li>
              <li>
                <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Art-of-Stones - Het Verhaal achter S4H
                </Link> - Leer over het merk
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#kracht-koper" className="text-gray-700 hover:text-gray-900 underline">De Kracht van Koper</a></li>
              <li><a href="#waarom-magneten" className="text-gray-700 hover:text-gray-900 underline">Waarom Magneten?</a></li>
              <li><a href="#combinatie" className="text-gray-700 hover:text-gray-900 underline">De Unieke Combinatie</a></li>
              <li><a href="#s4h-design" className="text-gray-700 hover:text-gray-900 underline">S4H: Natuurlijke Kracht in Stijlvol Design</a></li>
              <li><a href="#onderhoud" className="text-gray-700 hover:text-gray-900 underline">Onderhoud</a></li>
              <li><a href="#spirituele-betekenis" className="text-gray-700 hover:text-gray-900 underline">Spirituele Betekenis</a></li>
            </ul>
          </div>

          <h2 id="kracht-koper" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            De Kracht van Koper
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Koper wordt sinds de oudheid gebruikt in sieraden, geneeskunde en spiritualiteit. In de Egyptische, Griekse en Ayurvedische tradities werd koper gezien als een <strong>geleider van levensenergie (prana)</strong> en een metaal dat helpt bij ontgifting en vitaliteit.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Belangrijke eigenschappen van koper:
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>• Bevordert een goede doorbloeding</li>
              <li>• Ondersteunt het immuunsysteem</li>
              <li>• Werkt ontstekingsremmend bij gewrichtsklachten</li>
              <li>• Helpt vermoeidheid en spanningen verminderen</li>
              <li>• Heeft een aardende en beschermende energie</li>
            </ul>
          </div>

          <h2 id="waarom-magneten" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Waarom Magneten?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De magneten in de S4H-koperen armbanden zijn <strong>strategisch geplaatst aan de binnenzijde</strong> van de armband, zodat ze contact maken met de huid. Volgens de magnetische therapie kunnen deze magneten het lichaam helpen zijn energetische balans te herstellen.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Mogelijke voordelen van magnetische armbanden:
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>• Verlichting bij spier- en gewrichtspijn</li>
              <li>• Verbeterde bloedsomloop</li>
              <li>• Bevordering van ontspanning en herstel</li>
              <li>• Ondersteuning bij slaapproblemen of stress</li>
            </ul>
          </div>

          <h2 id="combinatie" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            De Unieke Combinatie van Koper en Magneten
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Wanneer koper en magneten samen worden gedragen, <strong>versterken ze elkaars werking</strong>. Koper helpt de magnetische energie beter door het lichaam te laten stromen, waardoor het effect dieper wordt ervaren.
          </p>

          <div className="bg-purple-50 border-l-4 border-[#492c4a] rounded-lg p-6 md:p-8 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Deze combinatie is krachtig voor mensen die:
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>✓ Last hebben van reuma of artrose</li>
              <li>✓ Behoefte hebben aan meer energie of focus</li>
              <li>✓ Simpelweg meer balans in hun dagelijks leven willen</li>
            </ul>
          </div>

          <h2 id="s4h-design" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            S4H: Natuurlijke Kracht in Stijlvol Design
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De <strong>S4H-koperen armbanden met magneten</strong> zijn met zorg ontworpen. Elk model combineert functionele energie met stijlvolle elegantie. De armbanden zijn:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-gray-900 mb-2">Verstelbaar</p>
              <p className="text-sm text-gray-600">Past bij elke polsmaat</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-gray-900 mb-2">Unisex</p>
              <p className="text-sm text-gray-600">Voor iedereen draagbaar</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-gray-900 mb-2">Divers</p>
              <p className="text-sm text-gray-600">Meerdere stijlen beschikbaar</p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            S4H staat voor <strong>kwaliteit, balans en energie in harmonie met de natuur</strong>. Elke armband is zorgvuldig getest op draagcomfort en duurzaamheid.
          </p>

          <h2 id="onderhoud" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Onderhoud van je Koperen Armband
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Om de werking en glans van je armband te behouden:
          </p>

          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <ol className="space-y-3 text-base sm:text-lg text-gray-700 pl-5 list-decimal font-[family-name:var(--font-eb-garamond)]">
              <li>Reinig het koper af en toe met een zachte doek en een beetje citroensap of azijn</li>
              <li>Vermijd langdurig contact met water of parfum</li>
              <li>Draag de armband regelmatig – de natuurlijke huidoliën helpen het koper mooi te houden</li>
            </ol>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 pl-6 p-4 my-8 rounded">
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Let op:</strong> Koper kan een lichte verkleuring op de huid geven. Dit is volkomen onschadelijk en juist een teken van authentiek koper.
            </p>
          </div>

          <h2 id="spirituele-betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Spirituele Betekenis van Koper
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            In de spirituele leer wordt koper gezien als een <strong>brug tussen de fysieke en spirituele wereld</strong>. Het:
          </p>

          <ul className="space-y-3 text-base sm:text-lg text-gray-700 pl-5 list-disc mb-8 font-[family-name:var(--font-eb-garamond)]">
            <li>Versterkt intuïtie</li>
            <li>Helpt emoties te aarden</li>
            <li>Ondersteunt de verbinding tussen hart en verstand</li>
            <li>Laat je negatieve energie loslaten</li>
            <li>Brengt je persoonlijke energieveld in balans</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de Collectie van S4H
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Bij <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stonesforhealth.nl</Link> vind je de exclusieve <strong>S4H-collectie koperen armbanden met magneten</strong> – handgemaakt, krachtig en stijlvol. Elk ontwerp combineert eeuwenoude kennis met moderne elegantie.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Draag de kracht van de natuur om je pols – met een <Link href="/alle-producten?search=koper" className="text-[#492c4a] hover:underline">S4H koperen armband met magneten</Link>.
          </p>

          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Ontdek S4H Koperen Armbanden
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Handgemaakt, krachtig en stijlvol. Combineer eeuwenoude kennis met moderne elegantie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten?search=koper" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Bekijk Koperen Armbanden
              </Link>
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Alle S4H Producten
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    S4H Sieraden
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Spirituele kracht en stijl in één
                  </p>
                </div>
              </Link>
              <Link href="/blog/art-of-stones-s4h-edelstenen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Art-of-Stones B.V.
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Het verhaal achter S4H
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakras-uitgelegd-energiesysteem" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Chakra's & Energie
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Hoe energiebalans werkt
                  </p>
                </div>
              </Link>
            </div>
          </div>

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
