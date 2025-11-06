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
  "headline": "S4H Koperen Armbanden met Magneten - Stijl, Balans en Natuurlijke Energie",
  "description": "Ontdek de kracht van koperen armbanden met magneten. Eeuwenoude kennis gecombineerd met modern design voor balans, herstel en stijlvolle energie.",
  "image": "https://stonesforhealth.nl/blog-images/S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie.jpeg",
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
      "url": "https://stonesforhealth.nl/logo.webp"
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
      <Breadcrumbs customItems={[
        { name: 'Blog', url: 'https://stonesforhealth.nl/blog' },
        { name: 'S4H Koperen Armbanden met Magneten', url: 'https://stonesforhealth.nl/blog/s4h-koperen-armbanden-magneten' }
      ]} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ fontFamily: 'var(--font-eb-garamond)' }}>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-eb-garamond)' }}>
          S4H Koperen Armbanden met Magneten - Stijl, Balans en Natuurlijke Energie
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-300">
          <time dateTime="2025-10-01">1 oktober 2025</time>
          <span>•</span>
          <span>8 min leestijd</span>
        </div>

        {/* Blog Image */}
        <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/blog-images/S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie.jpeg"
            alt="S4H Koperen armbanden met magneten voor balans en natuurlijke energie"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Koper is al eeuwenlang een geliefd metaal — niet alleen vanwege zijn warme, roodgouden gloed, maar ook door zijn vermeende positieve werking op het lichaam en de energiehuishouding. De <strong>koperen armbanden met magneten van S4H</strong> combineren klassieke schoonheid met natuurlijke balans. Ze zijn meer dan een sieraad; ze zijn een symbool van kracht, herstel en harmonie.
        </p>

        {/* Table of Contents */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Inhoudsopgave</h2>
          <ul className="space-y-2 text-base">
            <li><a href="#kracht-koper" className="text-[#8B7355] hover:underline">De Kracht van Koper</a></li>
            <li><a href="#waarom-magneten" className="text-[#8B7355] hover:underline">Waarom Magneten?</a></li>
            <li><a href="#combinatie" className="text-[#8B7355] hover:underline">De Unieke Combinatie</a></li>
            <li><a href="#s4h-design" className="text-[#8B7355] hover:underline">S4H: Natuurlijke Kracht in Stijlvol Design</a></li>
            <li><a href="#onderhoud" className="text-[#8B7355] hover:underline">Onderhoud</a></li>
            <li><a href="#spirituele-betekenis" className="text-[#8B7355] hover:underline">Spirituele Betekenis</a></li>
          </ul>
        </div>

        {/* Content Sections */}
        <section id="kracht-koper" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
            De Kracht van Koper
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Koper wordt sinds de oudheid gebruikt in sieraden, geneeskunde en spiritualiteit. In de Egyptische, Griekse en Ayurvedische tradities werd koper gezien als een <strong>geleider van levensenergie (prana)</strong> en een metaal dat helpt bij ontgifting en vitaliteit.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Belangrijke eigenschappen van koper:
          </h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6 list-disc pl-6">
            <li>Bevordert een goede doorbloeding</li>
            <li>Ondersteunt het immuunsysteem</li>
            <li>Werkt ontstekingsremmend bij gewrichtsklachten</li>
            <li>Helpt vermoeidheid en spanningen verminderen</li>
            <li>Heeft een aardende en beschermende energie</li>
          </ul>
        </section>

        <section id="waarom-magneten" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
            Waarom Magneten?
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            De magneten in de S4H-koperen armbanden zijn <strong>strategisch geplaatst aan de binnenzijde</strong> van de armband, zodat ze contact maken met de huid. Volgens de magnetische therapie kunnen deze magneten het lichaam helpen zijn energetische balans te herstellen.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Mogelijke voordelen van magnetische armbanden:
          </h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6 list-disc pl-6">
            <li>Verlichting bij spier- en gewrichtspijn</li>
            <li>Verbeterde bloedsomloop</li>
            <li>Bevordering van ontspanning en herstel</li>
            <li>Ondersteuning bij slaapproblemen of stress</li>
          </ul>
        </section>

        <section id="combinatie" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
            De Unieke Combinatie van Koper en Magneten
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Wanneer koper en magneten samen worden gedragen, <strong>versterken ze elkaars werking</strong>. Koper helpt de magnetische energie beter door het lichaam te laten stromen, waardoor het effect dieper wordt ervaren.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Deze combinatie is krachtig voor mensen die:
          </h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6 list-disc pl-6">
            <li>Last hebben van reuma of artrose</li>
            <li>Behoefte hebben aan meer energie of focus</li>
            <li>Simpelweg meer balans in hun dagelijks leven willen</li>
          </ul>
        </section>

        <section id="s4h-design" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
            S4H: Natuurlijke Kracht in Stijlvol Design
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            De <strong>S4H-koperen armbanden met magneten</strong> zijn met zorg ontworpen. Elk model combineert functionele energie met stijlvolle elegantie. De armbanden zijn:
          </p>

          <ul className="space-y-2 text-lg text-gray-700 mb-6 list-disc pl-6">
            <li><strong>Verstelbaar</strong> - Past bij elke polsmaat</li>
            <li><strong>Unisex</strong> - Voor iedereen draagbaar</li>
            <li><strong>Divers</strong> - Meerdere stijlen beschikbaar</li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            S4H staat voor <strong>kwaliteit, balans en energie in harmonie met de natuur</strong>. Elke armband is zorgvuldig getest op draagcomfort en duurzaamheid.
          </p>
        </section>

        <section id="onderhoud" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
            Onderhoud van je Koperen Armband
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Om de werking en glans van je armband te behouden:
          </p>

          <ol className="space-y-2 text-lg text-gray-700 mb-6 list-decimal pl-6">
            <li>Reinig het koper af en toe met een zachte doek en een beetje citroensap of azijn</li>
            <li>Vermijd langdurig contact met water of parfum</li>
            <li>Draag de armband regelmatig - de natuurlijke huidoliën helpen het koper mooi te houden</li>
          </ol>

          <p className="text-lg text-gray-700 leading-relaxed bg-gray-50 border-l-4 border-gray-400 pl-4 py-3 rounded">
            <strong>Let op:</strong> Koper kan een lichte verkleuring op de huid geven. Dit is volkomen onschadelijk en juist een teken van authentiek koper.
          </p>
        </section>

        <section id="spirituele-betekenis" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
            Spirituele Betekenis van Koper
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            In de spirituele leer wordt koper gezien als een <strong>brug tussen de fysieke en spirituele wereld</strong>. Het:
          </p>

          <ul className="space-y-2 text-lg text-gray-700 mb-8 list-disc pl-6">
            <li>Versterkt intuïtie</li>
            <li>Helpt emoties te aarden</li>
            <li>Ondersteunt de verbinding tussen hart en verstand</li>
            <li>Laat je negatieve energie loslaten</li>
            <li>Brengt je persoonlijke energieveld in balans</li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="border-t-2 border-gray-300 pt-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ontdek de Collectie van S4H
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Bij <Link href="/" className="text-[#8B7355] hover:underline font-semibold">Stonesforhealth.nl</Link> vind je de exclusieve <strong>S4H-collectie koperen armbanden met magneten</strong> - handgemaakt, krachtig en stijlvol. Elk ontwerp combineert eeuwenoude kennis met moderne elegantie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/alle-producten?search=koper" className="inline-block text-center px-6 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5943] transition-colors font-semibold">
              Bekijk Koperen Armbanden
            </Link>
            <Link href="/alle-producten" className="inline-block text-center px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Alle S4H Producten
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t-2 border-gray-300 pt-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerelateerde Artikelen</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#8B7355] hover:underline">
                S4H Sieraden - Spirituele kracht en stijl in één
              </Link>
            </li>
            <li>
              <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#8B7355] hover:underline">
                Art-of-Stones B.V. - Het verhaal achter S4H
              </Link>
            </li>
            <li>
              <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">
                Chakra's & Energie - Hoe energiebalans werkt
              </Link>
            </li>
          </ul>
        </section>

        {/* Back to Blog */}
        <div className="border-t border-gray-300 pt-8">
          <Link href="/blog" className="text-[#8B7355] hover:underline text-lg">
            ← Terug naar alle blogartikelen
          </Link>
        </div>

      </article>
    </main>
  );
}
