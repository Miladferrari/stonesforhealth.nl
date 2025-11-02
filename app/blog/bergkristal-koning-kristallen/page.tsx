import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Bergkristal: De Koning onder de Kristallen | StonesForHealth',
  description: 'Ontdek waarom Bergkristal de koning van alle kristallen is. ✓ Zuivering ✓ Versterking ✓ Balans ✓ Bescherming ✓ Meditatie ✓ Complete gids over helder kwarts',
  keywords: 'bergkristal, helder kwarts, clear quartz, bergkristal werking, kristallen zuiveren, master healer kristal',
  openGraph: {
    title: 'Bergkristal: De Koning onder de Kristallen',
    description: 'De complete gids over Bergkristal - de meest veelzijdige en krachtige edelsteen voor zuivering, versterking en spirituele groei.',
    type: 'article',
    publishedTime: '2025-03-22T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/bergkristal-koning-kristallen',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Bergkristal: De Koning onder de Kristallen",
  "description": "Ontdek waarom Bergkristal de koning van alle kristallen is. Complete gids over helder kwarts, werking, soorten en gebruik.",
  "image": "https://stonesforhealth.nl/blog-images/Bergkristal- De Koning onder de Kristallen .webp",
  "datePublished": "2025-03-22T09:00:00Z",
  "dateModified": "2025-03-22T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/bergkristal-koning-kristallen"
  }
};

export default function BergkristalPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Bergkristal: De Koning onder de Kristallen
        </h1>

        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">22 maart 2025 • 9 min leestijd</p>
          </div>
        </div>
        {/* Featured Image */}
        <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src="/blog-images/Bergkristal- De Koning onder de Kristallen .webp"
            alt="Bergkristal - helder kwarts kristal, de koning van alle edelstenen"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            <strong>Bergkristal</strong>, ook wel <strong>helder kwarts</strong> of <strong>clear quartz</strong> genoemd, is één van de meest krachtige en veelzijdige edelstenen ter wereld. Het wordt gezien als de <strong>"koning van de kristallen"</strong>, omdat het zowel zuiverend als versterkend werkt en al duizenden jaren een belangrijke rol speelt in culturen over de hele wereld. Van oude Griekse filosofen tot moderne healers - iedereen erkent de bijzondere kracht van deze heldere kristal.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts
                </Link> - Ontdek de krachtigste kristalcombinatie voor beginners
              </li>
              <li>
                <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Chakra Kristallen Complete Gids
                </Link> - Gebruik bergkristal voor alle chakra's
              </li>
              <li>
                <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Amethist: De Spirituele Partner van Bergkristal
                </Link> - Combineer deze twee krachtige kwartsen
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#werking" className="text-gray-700 hover:text-gray-900 underline">Werking van Bergkristal</a></li>
              <li><a href="#soorten" className="text-gray-700 hover:text-gray-900 underline">Soorten Bergkristal</a></li>
              <li><a href="#vindplaatsen" className="text-gray-700 hover:text-gray-900 underline">Vindplaatsen Wereldwijd</a></li>
              <li><a href="#geschiedenis" className="text-gray-700 hover:text-gray-900 underline">Bergkristal in Cultuur & Geschiedenis</a></li>
              <li><a href="#hoe-gebruiken" className="text-gray-700 hover:text-gray-900 underline">Hoe Gebruik je Bergkristal?</a></li>
              <li><a href="#dos-donts" className="text-gray-700 hover:text-gray-900 underline">Do's & Don'ts</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Section 1: Werking */}
          <h2 id="werking" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            💎 Werking van Bergkristal
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bergkristal staat bekend als een <strong>universele genezer</strong> en een krachtige <strong>energieversterker</strong>. Het is de meest veelzijdige steen in de kristalwereld omdat het op alle niveaus werkt - fysiek, emotioneel, mentaal en spiritueel.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Zuivering */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ✨ Zuivering
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Reinigt energievelden, ruimtes en andere kristallen. Bergkristal absorbeert negatieve energie en transformeert deze naar neutraliteit.
              </p>
            </div>

            {/* Versterking */}
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🔋 Energieversterker
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Versterkt intenties, gedachten en de werking van andere stenen. Zoals een vergrootglas voor energie - amplifies alles.
              </p>
            </div>

            {/* Balans */}
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ☯️ Balans
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Brengt harmonie tussen lichaam, geest en ziel. Balanceert alle chakra's en herstelt energetisch evenwicht.
              </p>
            </div>

            {/* Helderheid */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🧠 Helderheid
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Stimuleert concentratie, geheugen en spiritueel inzicht. Brengt mentale helderheid en focus.
              </p>
            </div>

            {/* Bescherming */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🛡️ Bescherming
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Vormt een schild tegen negatieve energie en elektromagnetische straling van apparaten.
              </p>
            </div>

            {/* Programmeerbaar */}
            <div className="bg-pink-50 border-l-4 border-pink-400 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🎯 Programmeerbaar
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Kan geprogrammeerd worden met specifieke intenties. Houdt deze energie vast en blijft werken aan je doel.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-2 border-gray-300 rounded-xl p-8 my-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center font-[family-name:var(--font-eb-garamond)]">
              👑 Waarom "Koning van de Kristallen"?
            </h3>
            <p className="text-gray-700 leading-relaxed text-center font-[family-name:var(--font-eb-garamond)]">
              Bergkristal is dé steen voor iedereen die balans, zuiverheid en kracht zoekt. Het werkt <strong>universeel</strong> - geschikt voor alle doeleinden, <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">alle chakra's</Link> en alle mensen. Geen andere steen is zo veelzijdig en krachtig tegelijk. Daarom wordt het vaak gecombineerd met <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-purple-600 hover:text-purple-800 underline font-medium">amethist</Link> en <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-purple-600 hover:text-purple-800 underline font-medium">rozenkwarts</Link> in <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">de Gouden Driehoek</Link>.
            </p>
          </div>

          {/* Section 2: Soorten */}
          <h2 id="soorten" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            🔮 Soorten Bergkristal
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bergkristal komt in verschillende vormen voor, elk met zijn eigen specifieke toepassingen:
          </p>

          <div className="space-y-6 mb-12">
            {/* Heldere Kristallen */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                💠 Heldere Kristallen (Single Points)
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Transparant en glashelder met één of twee punten. Ideaal voor:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Meditatie en spiritueel werk</li>
                <li>Gerichte energiestroming (punt wijst richting)</li>
                <li>Dragen als sieraad of bij je dragen</li>
                <li>Programmeren met intenties</li>
              </ul>
            </div>

            {/* Clusters */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ✨ Cluster (Meerdere Punten)
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Meerdere kristalpunten die samen groeien op een basis. Ideaal voor:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Zuivering van ruimtes (woonkamer, kantoor)</li>
                <li>Opladen van andere kristallen</li>
                <li>Creëren van een krachtig energieveld</li>
                <li>Decoratief én functioneel</li>
              </ul>
            </div>

            {/* Geodes */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🪨 Geodes
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Holtes gevuld met kristalpunten, vaak groot en indrukwekkend. Ideaal voor:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Sterke energetische zuivering van grote ruimtes</li>
                <li>Meditatie- of altaarruimtes</li>
                <li>Als krachtbron en rustpunt</li>
                <li>Statement piece met spirituele waarde</li>
              </ul>
            </div>

            {/* Ruwe Stukken */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                ⛰️ Ruwe Stukken
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Natuurlijke, onbewerkte kristallen met krachtige authentieke uitstraling. Ideaal voor:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Grounding en natuurlijke energie</li>
                <li>Plaatsen in tuinen of bij planten</li>
                <li>Ruwe, ongefilterde kristalkracht</li>
                <li>Voor puristen die natuurlijke vormen prefereren</li>
              </ul>
            </div>

            {/* Geslepen Vormen */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🔺 Geslepen Vormen
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Piramides, bollen, obelisken of schedels. Ideaal voor:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Piramides:</strong> Concentreren en richten energie</li>
                <li><strong>Bollen:</strong> Spreiden energie gelijkmatig in alle richtingen</li>
                <li><strong>Obelisken:</strong> Trekken en richten energie verticaal</li>
                <li><strong>Schedels:</strong> Verbinding met wijsheid en bewustzijn</li>
              </ul>
            </div>

            {/* Insluitingen */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🌫️ Insluitingen (Speciale Varianten)
              </h3>
              <p className="text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Unieke structuren binnen het kristal met extra betekenis:
              </p>
              <ul className="space-y-1 pl-5 list-disc text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Rookkwarts:</strong> Donkere inkleuring, extra grounding</li>
                <li><strong>Fantoomkwarts:</strong> "Geest" van oudere groei, transformatie</li>
                <li><strong>IJskwarts:</strong> Barsten die op ijs lijken, innerlijke reflectie</li>
                <li><strong>Regenboogkwarts:</strong> Lichtreflecties, vreugde en hoop</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Vindplaatsen */}
          <h2 id="vindplaatsen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            🌍 Vindplaatsen Wereldwijd
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bergkristal komt wereldwijd voor, maar sommige locaties zijn beroemd om hun kwaliteit:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🇧🇷 Brazilië
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                De grootste en helderste kristallen ter wereld. Brazilië is de nummer één exporteur van bergkristal.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🇨🇭 Zwitserland & de Alpen
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Al eeuwenlang gebruikt door bergvolken. "Bergkristal" is vernoemd naar de Alpen.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🇲🇬 Madagaskar
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Ruwe, krachtige stukken met intense energie. Vaak met unieke insluitingen.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🇮🇳 India & Tibet
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Spirituele toepassingen in rituelen en meditatie. Hooggebergte kristallen met zuivere energie.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🇺🇸 Arkansas (VS)
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                Zeer pure kristallen met heldere transparantie. Populair bij verzamelaars en healers.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🌏 Andere Locaties
              </h3>
              <p className="text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                China, Rusland, Australië, Afrika - bergkristal is één van de meest voorkomende mineralen op aarde.
              </p>
            </div>
          </div>

          {/* Section 4: Geschiedenis */}
          <h2 id="geschiedenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            📜 Bergkristal in Cultuur & Geschiedenis
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bergkristal heeft een rijke geschiedenis en werd in vrijwel elke cultuur gebruikt voor spirituele, geneeskrachtige of beschermende doeleinden:
          </p>

          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🏛️ Oude Grieken
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Geloofden dat bergkristal <strong>eeuwig bevroren ijs</strong> was dat zo koud was dat het nooit meer kon smelten. Het woord "kristal" komt van het Griekse "krystallos" (ijs).
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🏺 Romeinen
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Gebruikten bergkristal als <strong>amulet voor bescherming en genezing</strong>. Rijke Romeinen hadden kristallen bollen om hun handen mee te koelen.
              </p>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🎌 Japan
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Symbool voor zuiverheid en de <strong>adem van de draak</strong>. Werd gezien als de perfecte edelsteen vanwege zijn helderheid.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🕉️ India & Tibet
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Gebruikt in <strong>mala's en gebedskralen</strong> voor meditatie. Bergkristal versterkt spirituele praktijken en mantras.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                🔮 Moderne Tijd
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Veel gebruikt bij <strong>healing, meditatie, Feng Shui en technologie</strong> (horloges, computers). Bergkristal is zowel spiritueel als wetenschappelijk waardevol.
              </p>
            </div>
          </div>

          {/* Section 5: Hoe Gebruiken */}
          <h2 id="hoe-gebruiken" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Gebruik je Bergkristal?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bergkristal is zo veelzijdig dat je het op talloze manieren kunt gebruiken:
          </p>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-blue-400 pl-6 bg-blue-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                1. In Huis voor Zuivering & Harmonie
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Plaats een <strong>cluster of geode</strong> in je woonkamer, slaapkamer of kantoor. Het zuivert de ruimte continu en creëert een harmonieus energieveld.
              </p>
            </div>

            <div className="border-l-4 border-purple-400 pl-6 bg-purple-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                2. Tijdens Meditatie
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Houd een bergkristal vast of plaats op je derde oog/kroonchakra voor <strong>helderheid en spirituele verbinding</strong>. Het versterkt je meditatie-ervaring exponentieel.
              </p>
            </div>

            <div className="border-l-4 border-green-400 pl-6 bg-green-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                3. Combineren met Andere Edelstenen
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Plaats bergkristal <strong>tussen andere kristallen</strong> om hun werking te versterken. Denk aan <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">de Gouden Driehoek</Link> met <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-purple-600 hover:text-purple-800 underline font-medium">Amethist</Link> en <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-purple-600 hover:text-purple-800 underline font-medium">Rozenkwarts</Link>, of combineer met <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-purple-600 hover:text-purple-800 underline font-medium">Citrien</Link> voor manifestatie.
              </p>
            </div>

            <div className="border-l-4 border-yellow-400 pl-6 bg-yellow-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                4. Dragen als Sieraad
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Draag als <strong>hanger, armband of oorbellen</strong> voor dagelijkse balans, bescherming en helderheid. Werkt als persoonlijk energieveld.
              </p>
            </div>

            <div className="border-l-4 border-pink-400 pl-6 bg-pink-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                5. Programmeren met Intenties
              </h3>
              <p className="text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Bergkristal kan <strong>geprogrammeerd</strong> worden:
              </p>
              <ol className="space-y-1 pl-5 list-decimal text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                <li>Reinig het kristal eerst (water, salie of maanlicht)</li>
                <li>Houd het vast en focus op je intentie</li>
                <li>Spreek je intentie hardop uit of visualiseer het doel</li>
                <li>Het kristal houdt deze energie vast en werkt eraan</li>
              </ol>
            </div>

            <div className="border-l-4 border-red-400 pl-6 bg-red-50 py-4 rounded-r">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                6. Opladen van Andere Kristallen
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Leg andere kristallen <strong>op of naast een bergkristal cluster</strong> om ze op te laden. Bergkristal zuivert én versterkt andere stenen.
              </p>
            </div>
          </div>

          {/* Section 6: Do's & Don'ts */}
          <h2 id="dos-donts" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Do's & Don'ts bij Bergkristal
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
                  <span>Reinig regelmatig (water, maanlicht of salie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Programmeer met heldere intenties voor beste resultaat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Gebruik voor meditatie en spiritueel werk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Combineer met andere kristallen voor versterking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Plaats in ruimtes die zuivering nodig hebben</span>
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
                  <span>Gebruik NIET bij onrust of slapeloosheid (kan energie versterken)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Plaats NIET te dicht bij bed van jonge kinderen (te energetisch)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Vergeet NIET te herprogrammeren als je intentie verandert</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Laat NIET vallen - kwarts is breekbaar ondanks hardheid</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Deel NIET geprogrammeerde kristallen zonder ze te resetten</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ⚠️ Let op: Versterkend Effect
            </h3>
            <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Bergkristal <strong>versterkt alles</strong> - zowel positieve als negatieve energie. Als je je onrustig of angstig voelt, kan bergkristal dit versterken. Gebruik in dat geval eerst <strong>grounding stenen</strong> (Zwarte Toermalijn, Rookkwarts) voordat je met bergkristal werkt.
            </p>
          </div>

          {/* CTA */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Ervaar de Kracht van de Koning
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Ontdek onze collectie Bergkristal in alle vormen bij StonesForHealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Shop Bergkristal
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
                Waarom heet bergkristal de "koning van de kristallen"?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Omdat het de <strong>meest veelzijdige</strong> edelsteen is. Bergkristal werkt op alle chakra's, versterkt alle intenties, zuivert alle energie én kan voor elk doel worden ingezet. Geen enkele andere steen is zo universeel krachtig.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe programmeer ik een bergkristal?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Reinig eerst</strong> (water/salie/maanlicht), houd het vast, focus op je intentie en spreek deze hardop uit (bijv. "Ik programmeer dit kristal voor innerlijke vrede"). Het kristal houdt deze energie vast. Herprogrammeer door te reinigen en opnieuw te programmeren.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke vorm bergkristal moet ik kiezen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Cluster/geode:</strong> voor ruimtes. <strong>Heldere punt:</strong> voor meditatie en dragen. <strong>Bol:</strong> voor algehele energiespreiding. <strong>Piramide:</strong> voor gerichte energie. Kies op basis van je doel en intuïtie.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan bergkristal andere kristallen opladen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Leg andere kristallen <strong>op of naast een bergkristal cluster</strong> om ze op te laden. Bergkristal zuivert én versterkt andere stenen. Dit is één van de meest effectieve manieren om kristallen te reinigen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Is bergkristal geschikt voor beginners?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Absoluut! Bergkristal is <strong>perfect voor beginners</strong> omdat het veelzijdig, veilig en krachtig is. Het is vaak de eerste steen die kristalliefhebbers kopen. Let wel op bij slapeloosheid - kies dan voor Amethist.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe reinig ik bergkristal?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Stromend water</strong> (bergkristal kan tegen water), <strong>maanlicht</strong> (vooral bij volle maan), <strong>salie/palo santo rook</strong>, of <strong>in de aarde</strong> begraven voor diepe zuivering. Reinig minimaal 1x per maand of na intensief gebruik.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat is het verschil tussen bergkristal en glas?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bergkristal is een <strong>natuurlijk mineraal</strong> met unieke kristalstructuur en energetische eigenschappen. Glas is kunstmatig gemaakt en heeft geen kristalrooster. Echt bergkristal voelt kouder aan, heeft soms natuurlijke imperfecties en conduceert energie anders.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            De Tijdloze Kracht van Bergkristal
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            <strong>Bergkristal</strong> is terecht de koning van de kristallen. Deze tijdloze edelsteen brengt zuiverheid, kracht, balans en spiritueel inzicht - eigenschappen die al duizenden jaren door culturen wereldwijd worden gewaardeerd. Of je nu zoekt naar mentale helderheid, energetische zuivering, spirituele groei of simpelweg een krachtige basis voor je kristalcollectie - bergkristal is de ultieme keuze.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De veelzijdigheid van bergkristal is ongeëvenaard. Het werkt op <strong>alle chakra's, versterkt alle intenties en past bij iedereen</strong>. Van heldere punten voor meditatie tot grote geodes voor ruimtezuivering - elke vorm heeft zijn eigen krachtige toepassingen.
          </p>
          <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je hoogwaardige bergkristal in alle vormen - clusters, geodes, punten, bollen en meer. Alle kristallen zijn 100% authentiek en ethisch gewonnen. Gratis verzending vanaf €50. Ervaar zelf waarom bergkristal al eeuwenlang de koning van alle edelstenen is!
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal met Amethist & Rozenkwarts
                  </p>
                </div>
              </Link>
              <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Amethist: Spirituele Partner
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De krachtigste paarse edelsteen
                  </p>
                </div>
              </Link>
              <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Rozenkwarts: Steen van Liefde
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Hartchakra opening met rozenkwarts
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Chakra Kristallen Gids
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal voor alle chakra's
                  </p>
                </div>
              </Link>
              <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Citrien & Amethist: Zon & Maan
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Balans tussen energie en rust
                  </p>
                </div>
              </Link>
              <Link href="/blog/top-10-bekendste-onbekendste-edelstenen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Top 10 Edelstenen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal in de top edelstenen
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
              Bij StonesForHealth geloven we in de universele kracht van natuurlijke kristallen. Onze missie is om hoogwaardige, ethisch gewonnen edelstenen toegankelijk te maken voor iedereen. Bergkristal vormt de basis van onze collectie - de koning van alle kristallen die iedereen kan helpen met zuivering, versterking en spirituele groei. Alle kristallen zijn 100% authentiek en met zorg geselecteerd.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
