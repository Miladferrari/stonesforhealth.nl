import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen per Sterrenbeeld en Numerologie | Complete Gids | StonesForHealth',
  description: 'Ontdek welke edelsteen perfect bij jou past op basis van je sterrenbeeld, Chinese dierenriem en numerologie getal. Complete gids met alle edelstenen per teken.',
  keywords: 'edelstenen sterrenbeeld, geboorte steen, numerologie edelstenen, chinese dierenriem kristallen, sterrenbeeld kristallen',
  openGraph: {
    title: 'Edelstenen per Sterrenbeeld en Numerologie: Vind jouw Perfecte Steen',
    description: 'Ontdek welke edelsteen bij jou past op basis van je westerse sterrenbeeld, Chinese dierenriem en numerologie.',
    type: 'article',
    publishedTime: '2025-03-08T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-per-sterrenbeeld-numerologie',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Edelstenen per Sterrenbeeld en Numerologie",
  "description": "Ontdek welke edelsteen perfect bij jou past op basis van je sterrenbeeld, Chinese dierenriem en numerologie getal.",
  "image": "https://stonesforhealth.nl/blog-images/Edelstenen per Sterrenbeeld en Numerologie.webp",
  "datePublished": "2025-03-08T09:00:00Z",
  "dateModified": "2025-03-08T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/edelstenen-per-sterrenbeeld-numerologie"
  }
};

export default function EdelstenenSterrenbeeldPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Edelstenen per Sterrenbeeld en Numerologie
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">8 maart 2025 • 15 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/blog-images/Edelstenen per Sterrenbeeld en Numerologie.webp"
            alt="Edelstenen per sterrenbeeld en numerologie - vind jouw perfecte kristal"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            <strong>Edelstenen</strong> worden al duizenden jaren gebruikt als krachtbronnen, amuletten en spirituele hulpmiddelen. Ze worden gezien als dragers van energie die ons kunnen ondersteunen bij onze emoties, levenspad en spirituele groei. De juiste edelsteen kan je helpen in <strong>balans te komen</strong>, je <strong>intuïtie te versterken</strong> en <strong>bescherming</strong> te bieden. Dit overzicht laat zien welke edelsteen bij jou past op basis van je <strong>westerse sterrenbeeld</strong>, je <strong>Chinese dierenriem</strong> en je <strong>numerologisch getal</strong>.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/jaar-van-de-houten-slang-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Jaar van de Houten Slang 2025
                </Link> - Ontdek de Chinese astrologie edelstenen voor 2025
              </li>
              <li>
                <Link href="/blog/top-10-bekendste-onbekendste-edelstenen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Top 10 Edelstenen
                </Link> - Bekendste en zeldzame edelstenen overzicht
              </li>
              <li>
                <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Chakra Kristallen Gids
                </Link> - Kies edelstenen op basis van je energiecentra
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#waarom-edelstenen" className="text-gray-700 hover:text-gray-900 underline">Waarom Edelstenen bij Sterrenbeelden?</a></li>
              <li><a href="#westers-sterrenbeeld" className="text-gray-700 hover:text-gray-900 underline">Edelstenen per Westers Sterrenbeeld</a></li>
              <li><a href="#chinees-sterrenbeeld" className="text-gray-700 hover:text-gray-900 underline">Edelstenen per Chinees Sterrenbeeld</a></li>
              <li><a href="#numerologie" className="text-gray-700 hover:text-gray-900 underline">Edelstenen per Numerologie Getal</a></li>
              <li><a href="#gebruik" className="text-gray-700 hover:text-gray-900 underline">Hoe Gebruik je Edelstenen?</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Waarom Edelstenen */}
          <h2 id="waarom-edelstenen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Edelstenen bij Sterrenbeelden?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
            Elk sterrenbeeld heeft unieke eigenschappen en uitdagingen. <strong>Edelstenen</strong> kunnen deze kwaliteiten versterken of juist balanceren. Net als sterrenbeelden hebben kristallen specifieke <strong>vibratiefrequenties</strong> die aansluiten bij bepaalde energieën.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Door te werken met edelstenen die passen bij je <strong>geboortedatum</strong>, <strong>Chinese dierenriem</strong> of <strong>levenspad getal</strong>, kun je:
          </p>

          <ul className="space-y-2 mb-8 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
            <li>Je natuurlijke talenten versterken</li>
            <li>Uitdagingen van je sterrenbeeld balanceren</li>
            <li>Bescherming en grounding vinden</li>
            <li>Je spirituele groei ondersteunen</li>
            <li>Emotionele stabiliteit creëren</li>
          </ul>

          {/* Westers Sterrenbeeld */}
          <h2 id="westers-sterrenbeeld" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Edelstenen per Westers Sterrenbeeld
          </h2>

          {/* Ram */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♈ Ram (21 maart – 19 april)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Moed, actie, leiderschap, passie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Ram is het eerste teken van de dierenriem - vol energie, pioniers en natuurlijke leiders. Rammen zijn moedig en impulsief, maar kunnen soms te ongeduldig zijn.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Rode Jaspis:</strong> Versterkt moed en doorzettingsvermogen</li>
              <li><strong>Carneool:</strong> Brengt passie en motivatie</li>
              <li><strong>Robijn:</strong> Versterkt leiderschap en vitaliteit</li>
            </ul>
          </div>

          {/* Stier */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♉ Stier (20 april – 20 mei)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Stabiliteit, genieten, volharding, betrouwbaarheid
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stier is een aardteken dat houdt van comfort, schoonheid en stabiliteit. Stieren zijn geduldig en trouw, maar kunnen soms star zijn.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Rozenkwarts:</strong> Opent het hart voor liefde en schoonheid</li>
              <li><strong>Smaragd:</strong> Brengt overvloed en harmonie</li>
              <li><strong>Aventurijn:</strong> Bevordert innerlijke rust en geduld</li>
            </ul>
          </div>

          {/* Tweelingen */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♊ Tweelingen (21 mei – 20 juni)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Communicatie, nieuwsgierigheid, flexibiliteit, intelligentie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Tweelingen zijn sociale vlinders die houden van communicatie en leren. Ze zijn veelzijdig maar kunnen soms onrustig zijn.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Agaat:</strong> Brengt balans en stabiliteit aan drukke geest</li>
              <li><strong>Citrien:</strong> Versterkt communicatie en creativiteit</li>
              <li><strong>Tijgeroog:</strong> Helpt bij focus en concentratie</li>
            </ul>
          </div>

          {/* Kreeft */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♋ Kreeft (21 juni – 22 juli)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Gevoel, bescherming, zorgzaamheid, intuïtie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Kreeft is een waterteken vol emotie en empathie. Kreeften zijn zorgzaam en beschermend, maar kunnen te gevoelig zijn.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Maansteen:</strong> Versterkt intuïtie en emotionele balans</li>
              <li><strong>Chalcedoon:</strong> Brengt innerlijke rust en zachtmoedigheid</li>
              <li><strong>Seleniet:</strong> Zuivert emotionele energie</li>
            </ul>
          </div>

          {/* Leeuw */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♌ Leeuw (23 juli – 22 augustus)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Zelfvertrouwen, warmte, charisma, creativiteit
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Leeuw is de koning van de dierenriem - vol zelfvertrouwen, genereus en dramatisch. Leeuwen stralen natuurlijke autoriteit uit.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Bergkristal:</strong> Versterkt persoonlijke kracht en helderheid</li>
              <li><strong>Zonnesteen:</strong> Brengt optimisme en vitaliteit</li>
              <li><strong>Barnsteen:</strong> Geeft warmte en positieve energie</li>
            </ul>
          </div>

          {/* Maagd */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♍ Maagd (23 augustus – 22 september)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Analyse, dienstbaarheid, zuiverheid, perfectie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Maagd is praktisch, gedetailleerd en behulpzaam. Maagden zijn perfectionisten die graag analyseren en organiseren.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Jade:</strong> Brengt rust en zuiverheid</li>
              <li><strong>Amazoniet:</strong> Helpt bij het loslaten van perfectionisme</li>
              <li><strong>Mosagaat:</strong> Grounding en praktische wijsheid</li>
            </ul>
          </div>

          {/* Weegschaal */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♎ Weegschaal (23 september – 22 oktober)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Balans, liefde, schoonheid, harmonie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Weegschaal zoekt altijd naar balans en harmonie. Ze zijn diplomatiek, charmant en hebben een fijn oog voor schoonheid.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Lapis Lazuli:</strong> Brengt innerlijke waarheid en balans</li>
              <li><strong>Toermalijn:</strong> Beschermt energetisch evenwicht</li>
              <li><strong>Saffier:</strong> Versterkt wijsheid en objectiviteit</li>
            </ul>
          </div>

          {/* Schorpioen */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♏ Schorpioen (23 oktober – 21 november)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Transformatie, intensiteit, mystiek, passie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Schorpioen is het meest intense teken - diepgaand, transformerend en magnetisch. Ze zoeken waarheid en authenticiteit.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Obsidiaan:</strong> Beschermt en helpt bij transformatie</li>
              <li><strong>Granaat:</strong> Versterkt passie en wilskracht</li>
              <li><strong>Malachiet:</strong> Ondersteunt emotionele genezing</li>
            </ul>
          </div>

          {/* Boogschutter */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♐ Boogschutter (22 november – 21 december)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Vrijheid, optimisme, wijsheid, avontuur
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Boogschutter is de filosoof van de dierenriem - vrijheidslievend, optimistisch en altijd op zoek naar waarheid en betekenis.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Amethist:</strong> Versterkt spiritueel inzicht</li>
              <li><strong>Turkoois:</strong> Beschermt tijdens reizen en avonturen</li>
              <li><strong>Sodaliet:</strong> Bevordert waarheidszoeken</li>
            </ul>
          </div>

          {/* Steenbok */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♑ Steenbok (22 december – 19 januari)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Discipline, ambitie, structuur, doorzettingsvermogen
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Steenbok is ambitieus, gedisciplineerd en geduldig. Ze werken hard en bouwen gestaag aan hun doelen.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Onyx:</strong> Geeft kracht en doorzettingsvermogen</li>
              <li><strong>Rookkwarts:</strong> Helpt bij grounding en discipline</li>
              <li><strong>Granaat:</strong> Versterkt ambitie en succes</li>
            </ul>
          </div>

          {/* Waterman */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♒ Waterman (20 januari – 18 februari)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Onafhankelijkheid, originaliteit, idealisme, innovatie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Waterman is de visionair - origineel, onafhankelijk en humanitair. Ze denken buiten de gebaande paden.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Fluoriet:</strong> Stimuleert innovatie en helderheid</li>
              <li><strong>Amethist:</strong> Versterkt intuïtie en spiritueel bewustzijn</li>
              <li><strong>Angeliet:</strong> Verbindt met hogere idealen</li>
            </ul>
          </div>

          {/* Vissen */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
              ♓ Vissen (19 februari – 20 maart)
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Eigenschappen:</strong> Empathie, spiritualiteit, dromen, creativiteit
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Vissen is het meest spirituele teken - empathisch, intuïtief en creatief. Ze leven vaak tussen droom en werkelijkheid.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen:
            </h4>
            <ul className="space-y-2 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Aquamarijn:</strong> Brengt rust en helderheid</li>
              <li><strong>Amethist:</strong> Versterkt spirituele verbinding</li>
              <li><strong>Labradoriet:</strong> Beschermt sensitieve energie</li>
            </ul>
          </div>

          {/* Chinees Sterrenbeeld */}
          <h2 id="chinees-sterrenbeeld" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Edelstenen per Chinees Sterrenbeeld
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Chinese astrologie</strong> werkt met een 12-jarige cyclus waarbij elk jaar wordt geregeerd door een dier. Elk dier heeft unieke eigenschappen en bijbehorende edelstenen.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐀 Rat
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Slim, vindingrijk, charmant
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Amethist:</strong> Wijsheid</li>
                <li><strong>Granaat:</strong> Kracht</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐂 Os
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Betrouwbaar, geduldig, sterk
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Tijgeroog:</strong> Doorzettingsvermogen</li>
                <li><strong>Jade:</strong> Harmonie</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐅 Tijger
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Moedig, competitief, zelfverzekerd
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Robijn:</strong> Passie</li>
                <li><strong>Citrien:</strong> Energie</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐇 Konijn
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Elegant, vriendelijk, diplomatiek
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Rozenkwarts:</strong> Liefde</li>
                <li><strong>Maansteen:</strong> Intuïtie</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐉 Draak
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Krachtig, charismatisch, ambitieus
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Bergkristal:</strong> Zuiverheid</li>
                <li><strong>Carneool:</strong> Levenskracht</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐍 Slang
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wijs, mysterieus, intuïtief
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Malachiet:</strong> Transformatie</li>
                <li><strong>Obsidiaan:</strong> Bescherming</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐴 Paard
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Energiek, onafhankelijk, enthousiast
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Turkoois:</strong> Vrijheid</li>
                <li><strong>Zonnesteen:</strong> Positiviteit</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐐 Geit
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Creatief, zachtaardig, empathisch
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Aventurijn:</strong> Rust</li>
                <li><strong>Fluoriet:</strong> Inzicht</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐵 Aap
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Slim, speels, nieuwsgierig
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Agaat:</strong> Balans</li>
                <li><strong>Labradoriet:</strong> Bescherming</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐓 Haan
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Trots, georganiseerd, punctueel
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Topaas:</strong> Helderheid</li>
                <li><strong>Pyriet:</strong> Succes</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐕 Hond
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Loyaal, eerlijk, beschermend
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Lapis Lazuli:</strong> Waarheid</li>
                <li><strong>Sodaliet:</strong> Spirituele groei</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🐖 Varken
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Genereus, oprecht, genieter
              </p>
              <ul className="space-y-1 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <li><strong>Toermalijn:</strong> Bescherming</li>
                <li><strong>Rozenkwarts:</strong> Liefde</li>
              </ul>
            </div>
          </div>

          {/* Numerologie */}
          <h2 id="numerologie" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Edelstenen per Numerologie Getal
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Je <strong>levenspad getal</strong> bereken je door alle cijfers van je geboortedatum op te tellen tot één enkel cijfer (tenzij je 11, 22 of 33 krijgt - dit zijn meestergetallen).
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)] mb-2">
              <strong>Voorbeeld:</strong> Geboren op 25-03-1990
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              2 + 5 + 0 + 3 + 1 + 9 + 9 + 0 = 29 → 2 + 9 = <strong>11</strong> (Meestergetal!)
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 1 – Leider, Initiatiefnemer
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Onafhankelijk, ambitieus, pionier
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Rode Jaspis, Robijn, Granaat
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 2 – Harmonie, Gevoeligheid
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Diplomatiek, intuïtief, samenwerkend
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Maansteen, Rozenkwarts, Jade
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 3 – Creativiteit, Communicatie
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Expressief, optimistisch, sociaal
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Citrien, Zonnesteen, Carneool
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 4 – Stabiliteit, Structuur
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Praktisch, betrouwbaar, hard werkend
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Onyx, Rookkwarts, Zwarte Toermalijn
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 5 – Vrijheid, Avontuur
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Veranderlijk, nieuwsgierig, vrijheidslievend
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Turkoois, Labradoriet, Sodaliet
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 6 – Liefde, Zorgzaamheid
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Verantwoordelijk, zorgzaam, harmonieus
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Smaragd, Aventurijn, Rozenkwarts
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 7 – Spiritualiteit, Wijsheid
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Analytisch, spiritueel, introspectief
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Amethist, Fluoriet, Bergkristal
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 8 – Kracht, Materieel Succes
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Ambitieus, krachtig, zakelijk
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Pyriet, Obsidiaan, Granaat
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 9 – Universele Liefde, Idealisme
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Humanitair, compassievol, wijs
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Lapis Lazuli, Amethist, Chrysocolla
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6 bg-gray-50 rounded">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 11 – Intuïtie, Verlichting (Meestergetal)
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Spiritueel, intuïtief, inspirerend
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Celestien, Seleniet, Labradoriet
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6 bg-gray-50 rounded">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 22 – Meesterbouwer, Visie (Meestergetal)
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Praktisch, visionair, manifestator
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Bergkristal, Jaspis, Jade
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6 bg-gray-50 rounded">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Getal 33 – Universele Leraar, Compassie (Meestergetal)
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]">
                Zelfopofferend, dienend, liefdevol
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <strong>Edelstenen:</strong> Rozenkwarts, Rhodochrosiet, Kunziet
              </p>
            </div>
          </div>

          {/* Gebruik */}
          <h2 id="gebruik" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Hoe Gebruik je Edelstenen?
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                1. Draag als Sieraad
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Draag edelstenen als <strong>armband, ketting of ring</strong> om hun energie dicht bij je te houden. De constante nabijheid versterkt de verbinding met de steen.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                2. Mediteer met Edelstenen
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Neem je edelsteen in je hand tijdens meditatie of leg deze op <strong>chakra's</strong>. Stel een intentie en visualiseer de energie van de steen.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                3. Plaats in je Huis
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Plaats edelstenen strategisch in je huis voor <strong>harmonie en bescherming</strong>. Bergkristal in de woonkamer, Rozenkwarts in de slaapkamer, Zwarte Toermalijn bij de voordeur.
              </p>
            </div>

            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                4. Combineer met Intenties
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Gebruik edelstenen in combinatie met <strong>affirmaties</strong> en intenties om je doelen kracht bij te zetten. De steen versterkt en houdt je focus.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Ontdek jouw Perfecte Edelsteen
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Vind edelstenen, sieraden en chakra sets die perfect bij jouw sterrenbeeld en levenspad passen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)] text-center">
                Bekijk Alle Edelstenen
              </Link>
              <Link href="/bestsellers" className="border-2 border-gray-900 hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)] text-center">
                Onze Bestsellers
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 id="faq" className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Moet ik alleen de edelsteen van mijn sterrenbeeld gebruiken?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Nee! Je sterrenbeeld edelsteen is een goed startpunt, maar je mag alle stenen gebruiken waar je je tot aangetrokken voelt. Luister naar je intuïtie - vaak weet je lichaam welke steen je nodig hebt.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik meerdere edelstenen tegelijk dragen?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Absoluut! Je kunt edelstenen combineren zolang hun energieën aanvullen. Bijvoorbeeld: Rozenkwarts (liefde) + Amethist (spiritualiteit) + Citrien (overvloed) werken mooi samen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe bereken ik mijn numerologie getal?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Tel alle cijfers van je geboortedatum op tot één cijfer. Bijvoorbeeld: 15-06-1985 = 1+5+0+6+1+9+8+5 = 35 = 3+5 = 8. Let op: 11, 22 en 33 zijn meestergetallen en tel je NIET verder door.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat is het verschil tussen westers en Chinees sterrenbeeld?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Westerse astrologie werkt met maanden (12 tekens per jaar), Chinese astrologie met jaren (12-jarige cyclus). Beide systemen bieden waardevolle inzichten - je kunt beide gebruiken!
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe vaak moet ik mijn edelstenen reinigen?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Reinig je edelstenen minstens 1x per maand, of vaker als je ze intensief gebruikt. Vooral na emotioneel zware periodes is reinigen belangrijk. Gebruik maanlicht, seleniet of sage.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik edelstenen cadeau geven?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Een edelsteen op basis van iemands sterrenbeeld of geboortedag is een persoonlijk en betekenisvol cadeau. Reinig de steen wel eerst en zet een positieve intentie.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Begin je Reis met Edelstenen
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Of je nu kijkt naar je <strong>sterrenbeeld</strong>, je <strong>Chinese dierenteken</strong> of je <strong>numerologisch getal</strong> - edelstenen geven steun en kracht op je levenspad. Elk systeem biedt unieke inzichten in je persoonlijkheid, talenten en uitdagingen.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Het mooiste is dat je deze systemen kunt <strong>combineren</strong>. Gebruik je westerse sterrenbeeld steen voor dagelijkse ondersteuning, je Chinese dierenriem steen voor jaarlijkse doelen, en je numerologie steen voor levenspad begeleiding.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je alle edelstenen die je nodig hebt voor je spirituele reis. Van individuele kristallen tot complete sets - elk product is 100% authentiek en met liefde geselecteerd.
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Complete Gids: Chakra Kristallen
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Ontdek welke kristallen bij elk chakra horen
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakras-en-hun-kleuren" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Chakra's en hun Kleuren
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De 7 energiepunten van je lichaam
                  </p>
                </div>
              </Link>
              <Link href="/blog" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Rozenkwarts: Steen van Liefde
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Alles over deze krachtige hartsteen
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
