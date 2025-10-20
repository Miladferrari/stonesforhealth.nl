import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Chakra\'s en hun Kleuren: Complete Gids over Energiepunten | StonesForHealth',
  description: 'Ontdek alles over de 7 chakra\'s en hun kleuren. Leer welke energiepunten er zijn, hoe ze je beïnvloeden en hoe je ze in balans brengt met edelstenen en kristallen.',
  keywords: 'chakra kleuren, chakra energiepunten, 7 chakras, chakra balans, chakra edelstenen, energiesysteem',
  openGraph: {
    title: 'Chakra\'s en hun Kleuren: De Energiepunten van je Lichaam',
    description: 'Ontdek de 7 hoofdchakra\'s, hun kleuren en betekenis. Leer hoe je je chakra\'s in balans brengt.',
    type: 'article',
    publishedTime: '2025-03-10T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/chakras-en-hun-kleuren',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Chakra's en hun Kleuren: De Energiepunten van je Lichaam",
  "description": "Ontdek alles over de 7 chakra's en hun kleuren. Leer welke energiepunten er zijn, hoe ze je beïnvloeden en hoe je ze in balans brengt.",
  "image": "https://stonesforhealth.nl/blog-images/Chakra's en hun Kleuren- De Energiepunten van je Lichaam.webp",
  "datePublished": "2025-03-10T09:00:00Z",
  "dateModified": "2025-03-10T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/chakras-en-hun-kleuren"
  }
};

export default function ChakraKleurenPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Chakra&apos;s en hun Kleuren: De Energiepunten van je Lichaam
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">10 maart 2025 • 10 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/blog-images/Chakra's en hun Kleuren- De Energiepunten van je Lichaam.webp"
            alt="De 7 chakra's en hun kleuren - energiepunten van het lichaam"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Ons lichaam bestaat niet alleen uit botten, spieren en organen, maar ook uit <strong>energiebanen en energiepunten</strong>. Deze energiepunten worden <strong>chakra's</strong> genoemd. Het woord chakra komt uit het Sanskriet en betekent letterlijk 'wiel' of 'draaiend energieveld'. Chakra's zijn de brug tussen lichaam, geest en ziel en spelen een belangrijke rol bij je emotionele en spirituele balans.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Complete Gids: Chakra Kristallen
                </Link> - Ontdek welke kristallen bij elk chakra horen voor optimale balans
              </li>
              <li>
                <Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Bergkristal: Koning der Kristallen
                </Link> - De ultieme steen voor chakra zuivering en versterking
              </li>
              <li>
                <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Amethist voor Kruinchakra
                </Link> - Perfect voor het activeren van je hoogste energiecentrum
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#wat-zijn-chakras" className="text-gray-700 hover:text-gray-900 underline">Wat zijn Chakra's?</a></li>
              <li><a href="#wortelchakra" className="text-gray-700 hover:text-gray-900 underline">1. Wortelchakra (Muladhara) - Rood</a></li>
              <li><a href="#sacraalchakra" className="text-gray-700 hover:text-gray-900 underline">2. Sacraalchakra (Svadhisthana) - Oranje</a></li>
              <li><a href="#zonnevlechtchakra" className="text-gray-700 hover:text-gray-900 underline">3. Zonnevlechtchakra (Manipura) - Geel</a></li>
              <li><a href="#hartchakra" className="text-gray-700 hover:text-gray-900 underline">4. Hartchakra (Anahata) - Groen/Roze</a></li>
              <li><a href="#keelchakra" className="text-gray-700 hover:text-gray-900 underline">5. Keelchakra (Vishuddha) - Lichtblauw</a></li>
              <li><a href="#derde-oogchakra" className="text-gray-700 hover:text-gray-900 underline">6. Derde Oogchakra (Ajna) - Indigo</a></li>
              <li><a href="#kroonchakra" className="text-gray-700 hover:text-gray-900 underline">7. Kroonchakra (Sahasrara) - Violet/Wit</a></li>
              <li><a href="#chakras-in-balans" className="text-gray-700 hover:text-gray-900 underline">Chakra's in Balans Brengen</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Section 1: Wat zijn Chakra's */}
          <h2 id="wat-zijn-chakras" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat zijn Chakra's?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
            Er zijn <strong>zeven hoofdchakra's</strong> die verticaal langs je wervelkolom lopen, elk met hun eigen <strong>kleur, element, functie en ligging</strong> in het lichaam. Wanneer al je chakra's in balans zijn, stroomt de levensenergie (ook wel <em>prana</em> of <em>chi</em> genoemd) vrij door je lichaam. Dit resulteert in fysiek welzijn, emotionele stabiliteit en spirituele verbinding.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
            Elke chakra heeft een unieke <strong>kleur</strong> die resoneert met een specifieke <strong>vibratiefrequentie</strong>. Deze kleuren zijn niet alleen symbolisch - ze vertegenwoordigen de energetische eigenschappen van elk chakra. Door te werken met de kleuren via edelstenen, meditatie of visualisatie, kun je je chakra's activeren en harmoniseren.
          </p>

          {/* De 7 Chakra's */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-6 font-[family-name:var(--font-eb-garamond)]">
            De 7 Hoofdchakra's en hun Kleuren
          </h2>

          {/* 1. Wortelchakra */}
          <div id="wortelchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              1. Wortelchakra – Muladhara
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Rood • <strong>Locatie:</strong> Stuitje • <strong>Element:</strong> Aarde
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Veiligheid, stabiliteit, overleven, grounding
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>wortelchakra</strong> is de basis van je energiesysteem. Dit chakra helpt je om je gegrond en veilig te voelen in de wereld. Het rode kleur symboliseert aardse energie, kracht en vitaliteit. Wanneer je wortelchakra in balans is, voel je je verankerd, stabiel en in staat om uitdagingen aan te gaan.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Rode Jaspis:</strong> Grounding en bescherming</li>
              <li><strong>Hematiet:</strong> Versterkt je fundament</li>
              <li><strong>Granaat:</strong> Vitaliteit en overlevingskracht</li>
              <li><strong>Zwarte Toermalijn:</strong> Afwering van negatieve energie</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Angstgevoelens, financiële zorgen, gevoel van onveiligheid, rugklachten.
              </p>
            </div>
          </div>

          {/* 2. Sacraalchakra */}
          <div id="sacraalchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              2. Sacraalchakra – Svadhisthana
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Oranje • <strong>Locatie:</strong> Onderbuik • <strong>Element:</strong> Water
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Emoties, creativiteit, seksualiteit, plezier
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>sacraalchakra</strong> staat voor gevoel, passie en plezier. De oranje kleur vertegenwoordigt creativiteit, warmte en emotionele expressie. Dit chakra regelt je vermogen om te genieten van het leven, nieuwe ervaringen te omarmen en je creatieve energie te kanaliseren.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Carneool:</strong> Stimuleert creativiteit en passie</li>
              <li><strong>Oranje Calciet:</strong> Brengt vreugde en speelsheid</li>
              <li><strong>Maansteen:</strong> Emotionele balans</li>
              <li><strong>Tijgeroog:</strong> Moed en zelfvertrouwen</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Gebrek aan creativiteit, emotionele onrust, lage libido, schuldgevoelens.
              </p>
            </div>
          </div>

          {/* 3. Zonnevlechtchakra */}
          <div id="zonnevlechtchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              3. Zonnevlechtchakra – Manipura
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Geel • <strong>Locatie:</strong> Maagstreek • <strong>Element:</strong> Vuur
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Zelfvertrouwen, wilskracht, persoonlijke kracht
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>zonnevlechtchakra</strong> is je innerlijke krachtcentrum. De gele kleur symboliseert zonlicht, intelligentie en persoonlijke macht. Dit chakra bepaalt hoe je jezelf ziet, hoe je je staande houdt in de wereld en hoe je je doelen bereikt.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Citrien:</strong> Overvloed en succes</li>
              <li><strong>Gele Calciet:</strong> Optimisme en zelfwaardering</li>
              <li><strong>Barnsteen:</strong> Transformeert negatieve energie</li>
              <li><strong>Pyriet:</strong> Wilskracht en manifestatie</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Laag zelfvertrouwen, besluiteloosheid, controlebehoefte, maagklachten.
              </p>
            </div>
          </div>

          {/* 4. Hartchakra */}
          <div id="hartchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              4. Hartchakra – Anahata
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Groen of Roze • <strong>Locatie:</strong> Hart • <strong>Element:</strong> Lucht
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Liefde, compassie, vergeving, verbinding
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>hartchakra</strong> verbindt de onderste (fysieke) en bovenste (spirituele) chakra's. Groen staat voor genezing en groei, roze voor onvoorwaardelijke liefde. Dit chakra regelt je vermogen om lief te hebben, compassie te voelen en vergiffenis te schenken - aan jezelf én anderen.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Rozenkwarts:</strong> Onvoorwaardelijke liefde en zelfliefde</li>
              <li><strong>Groene Aventurijn:</strong> Emotioneel evenwicht</li>
              <li><strong>Jade:</strong> Harmonie en sereniteit</li>
              <li><strong>Smaragd:</strong> Diepe hartverbinding</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Moeite met liefde geven/ontvangen, eenzaamheid, verdriet, hartklachten.
              </p>
            </div>
          </div>

          {/* 5. Keelchakra */}
          <div id="keelchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              5. Keelchakra – Vishuddha
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Lichtblauw • <strong>Locatie:</strong> Keel • <strong>Element:</strong> Ether
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Communicatie, waarheid, zelfexpressie
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>keelchakra</strong> is het centrum van communicatie en expressie. De lichtblauwe kleur staat voor helderheid, vrede en authentieke zelfexpressie. Dit chakra bepaalt hoe goed je jezelf kunt uiten, naar anderen kunt luisteren en je waarheid kunt spreken.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Blauwe Calciet:</strong> Vreedzame communicatie</li>
              <li><strong>Aquamarijn:</strong> Helder en kalm spreken</li>
              <li><strong>Lapis Lazuli:</strong> Waarheid en wijsheid</li>
              <li><strong>Sodaliet:</strong> Rationeel denken en objectiviteit</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Moeite met jezelf uiten, angst om te spreken, keelpijn, niet gehoord voelen.
              </p>
            </div>
          </div>

          {/* 6. Derde Oog Chakra */}
          <div id="derde-oogchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              6. Derde Oog Chakra – Ajna
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Indigo • <strong>Locatie:</strong> Voorhoofd • <strong>Element:</strong> Licht
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Intuïtie, inzicht, bewustzijn, innerlijke wijsheid
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>derde oog chakra</strong> verbindt met innerlijk weten en wijsheid. Indigo symboliseert diep inzicht, mystiek en spiritueel bewustzijn. Dit chakra helpt je om verder te kijken dan het fysieke en toegang te krijgen tot je intuïtie en hogere waarheid.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Amethist:</strong> Intuïtie en spiritueel inzicht</li>
              <li><strong>Lapis Lazuli:</strong> Innerlijke waarheid</li>
              <li><strong>Sodaliet:</strong> Mentale helderheid</li>
              <li><strong>Fluoriet:</strong> Concentratie en focus</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Gebrek aan focus, verwarring, hoofdpijn, nachtmerries, moeite met beslissingen.
              </p>
            </div>
          </div>

          {/* 7. Kroonchakra */}
          <div id="kroonchakra" className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              7. Kroonchakra – Sahasrara
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              <strong>Kleur:</strong> Violet of Wit • <strong>Locatie:</strong> Kruin • <strong>Element:</strong> Universele energie
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Thema:</strong> Spirituele verbinding, verlichting, eenheid
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
              Het <strong>kroonchakra</strong> verbindt met het hogere bewustzijn. Violet en wit symboliseren goddelijke verbinding, zuiverheid en spirituele verlichting. Dit chakra opent je voor universele wijsheid en helpt je om je eenheid met alles wat is te ervaren.
            </p>

            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Edelstenen:
            </h4>
            <ul className="space-y-2 mb-6 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Bergkristal:</strong> Meester healer en spirituele versterker</li>
              <li><strong>Amethist:</strong> Spirituele groei en meditatie</li>
              <li><strong>Seleniet:</strong> Hogere bewustzijnsniveaus</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Uit balans?</strong> Spirituele disconnect, gebrek aan levensdoel, cynisme, verwarring.
              </p>
            </div>
          </div>

          {/* Chakra's in Balans Brengen */}
          <h2 id="chakras-in-balans" className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Breng je je Chakra's in Balans?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
            Wanneer één of meerdere chakra's uit balans zijn, kun je dit merken aan <strong>fysieke klachten</strong> of <strong>emotionele onrust</strong>. Gelukkig zijn er verschillende manieren om je chakra's te harmoniseren:
          </p>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                1. Edelstenen en Chakra-sieraden
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Draag kristallen die bij het specifieke chakra horen. Een <strong>chakra armband</strong> met alle 7 kleuren helpt om je complete energiesysteem in balans te houden.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                2. Meditatie of Klankschalen
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Chakra meditatie met visualisatie van kleuren en geluid helpt om geblokkeerde energie te laten stromen. Elke chakra heeft een specifieke frequentie.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                3. Yoga en Ademhalingsoefeningen
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Specifieke yoga poses activeren bepaalde chakra's. Pranayama (ademwerk) helpt energie vrij te laten stromen door alle chakra's.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                4. Reiki of Energiewerk
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Een reiki behandeling of andere vorm van energiewerk kan geblokkeerde chakra's openen en je energieveld zuiveren.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                5. Geuren en Etherische Oliën
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Wierook, Palo Santo en specifieke etherische oliën kunnen chakra's activeren. Elke chakra reageert op bepaalde geuren.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Breng je Chakra&apos;s in Balans
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Bij Stonesforhealth.nl vind je een uitgebreid assortiment aan chakra sets, edelstenen, armbanden en sieraden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten?category=chakra" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Bekijk Chakra Producten
              </Link>
              <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Onze Bestsellers
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 id="faq" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-6">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waarom hebben chakra's verschillende kleuren?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Elke chakra heeft een unieke vibratiefrequentie die correspondeert met een specifieke kleur in het lichtspectrum. Rood heeft de laagste frequentie (wortelchakra), violet de hoogste (kroonchakra). Deze kleuren helpen om de chakra's te identificeren en te activeren.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe weet ik welke chakra uit balans is?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Fysieke symptomen in een bepaald lichaamsgebied wijzen vaak op een geblokkeerd chakra. Emotionele patronen geven ook aanwijzingen: angst wijst op wortelchakra, communicatieproblemen op keelchakra. Luister naar je lichaam en intuïtie.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik aan meerdere chakra's tegelijk werken?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Een chakra armband of chakra set met alle 7 kleuren helpt om je complete energiesysteem in balans te brengen. Voor specifieke klachten kun je focussen op één chakra, maar holistische aanpak werkt vaak het beste.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe lang duurt het om chakra's te balanceren?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Dit verschilt per persoon en chakra. Sommige blokkades lossen snel op, andere vragen meer tijd en geduld. Consistente praktijk - of het nu meditatie, kristallen of yoga is - geeft de beste resultaten. Reken op minimaal 2-4 weken voor merkbare veranderingen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke chakra moet ik als eerste balanceren?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Begin altijd met het wortelchakra - dit is je fundament. Een stabiel wortelchakra zorgt ervoor dat hogere chakra's beter kunnen functioneren. Werk daarna van onder naar boven door je energiesysteem.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn chakra kristallen wetenschappelijk bewezen?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Kristallen hebben wetenschappelijk meetbare vibratiefrequenties (gebruikt in technologie zoals horloges). Het effect op chakra's is gebaseerd op eeuwenoude traditie en persoonlijke ervaring. Gebruik kristallen complementair aan - niet als vervanging voor - professionele medische zorg.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Begin Vandaag met Chakra Balancering
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
            Het <strong>chakrasysteem</strong> biedt een krachtig framework om je fysieke, emotionele en spirituele welzijn te begrijpen en te verbeteren. Door bewust te worden van de <strong>kleuren en functies van elk chakra</strong>, kun je gericht werken aan balans en harmonie in je leven.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 font-[family-name:var(--font-eb-garamond)]">
            Of je nu kiest voor <strong>edelstenen, meditatie, yoga of een combinatie</strong> - het belangrijkste is consistentie en intentie. Elk klein stapje richting balans helpt je om je levensenergie vrijer te laten stromen.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je alles wat je nodig hebt voor je chakra reis: van complete chakra sets tot individuele edelstenen, armbanden, piramides en pendels. Elk product is met zorg geselecteerd om jouw energie weer in balans te brengen.
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
                    Ontdek welke kristallen bij elk chakra horen
                  </p>
                </div>
              </Link>
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal: Koning der Kristallen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De master healer voor alle chakra's
                  </p>
                </div>
              </Link>
              <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Amethist: Kruinchakra Activatie
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Perfect voor spirituele ontwikkeling en intuïtie
                  </p>
                </div>
              </Link>
              <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Rozenkwarts voor Hartchakra
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De ultieme steen van liefde en compassie
                  </p>
                </div>
              </Link>
              <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Citrien voor Zonnevlechtchakra
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Versterkt persoonlijke kracht en zelfvertrouwen
                  </p>
                </div>
              </Link>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Complete chakra balans met 3 krachtige kristallen
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
