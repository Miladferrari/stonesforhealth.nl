import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Volle Maan December 2025 (Cold Moon) - Rituelen & Edelstenen | StonesForHealth',
  description: 'Laatste volle maan van 2025 op 26 december. Ontdek de betekenis van de Cold Moon, afrondingsrituelen en edelstenen voor reflectie en nieuw begin.',
  keywords: 'volle maan december 2025, cold moon, volle maan rituelen, edelstenen volle maan, seleniet, reflectie, nieuw jaar, kristallen opladen',
  openGraph: {
    title: 'Volle Maan December 2025: Cold Moon - Complete Gids',
    description: 'Alles over de Cold Moon van 26 december 2025. Rituelen, betekenis en de beste edelstenen.',
    type: 'article',
    publishedTime: '2025-12-20T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/volle-maan-december-2025',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Volle Maan December 2025: Cold Moon",
  "description": "Laatste volle maan van 2025 op 26 december. Ontdek de betekenis van de Cold Moon, afrondingsrituelen en edelstenen voor reflectie en nieuw begin.",
  "image": "https://stonesforhealth.nl/blog-images/Volle Maan December 2025- Cold Moon.webp",
  "datePublished": "2025-12-20T09:00:00Z",
  "dateModified": "2025-12-20T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/volle-maan-december-2025"
  }
};

export default function VolleMaanDecember2025Page() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Volle Maan December 2025: Cold Moon
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">20 december 2025 • 8 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/blog-images/Volle Maan December 2025- Cold Moon.webp"
            alt="Volle maan december 2025 - Cold Moon met edelstenen"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Op <strong>vrijdag 26 december 2025</strong> staat de maan vol aan de hemel. Deze volle maan wordt de <strong>Cold Moon</strong> genoemd. Het is de laatste volle maan van het jaar en staat symbool voor afsluiting, reflectie en voorbereiding op een nieuw begin. In de donkere wintermaanden straalt de Cold Moon helder en nodigt ze ons uit tot introspectie en rust.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/volle-maan-oktober-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan Oktober 2025
                </Link> - De Jagermaan voor nieuwe begin en actie
              </li>
              <li>
                <Link href="/blog/volle-maan-november-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan November 2025
                </Link> - De Beaver Moon Supermaan voor gronding en stabiliteit
              </li>
              <li>
                <Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Bergkristal voor Intenties
                </Link> - Programmeer je kristallen voor het nieuwe jaar
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#betekenis" className="text-gray-700 hover:text-gray-900 underline">Spirituele Betekenis Cold Moon</a></li>
              <li><a href="#rituelen" className="text-gray-700 hover:text-gray-900 underline">Rituelen tijdens de Cold Moon</a></li>
              <li><a href="#edelstenen" className="text-gray-700 hover:text-gray-900 underline">Edelstenen voor deze Volle Maan</a></li>
              <li><a href="#opladen" className="text-gray-700 hover:text-gray-900 underline">Kristallen Opladen tijdens Volle Maan</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Betekenis */}
          <h2 id="betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Spirituele Betekenis van de Cold Moon
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Cold Moon</strong> is de laatste volle maan van het jaar en valt samen met de koudste tijd van de winter. Deze maan markeert het einde van een cyclus en de voorbereiding op een nieuw begin. Spiritueel gezien symboliseert deze maan:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Kernthema's Cold Moon 2025:
            </h3>
            <ul className="space-y-3 text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Einde & Afronding:</strong> Projecten en patronen die afgerond mogen worden</li>
              <li><strong>Rust & Introspectie:</strong> Een periode van naar binnen keren en zelfreflectie</li>
              <li><strong>Voorbereiding op Nieuw Begin:</strong> Het zaadje van nieuwe intenties wordt geplant</li>
              <li><strong>Helderheid in het Duister:</strong> Inzicht en verlichting, ook in moeilijke tijden</li>
              <li><strong>Dankbaarheid:</strong> Waardering voor de lessen en groei van het afgelopen jaar</li>
            </ul>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            De Cold Moon valt dit jaar op <strong>tweede kerstdag</strong>, een tijd die vaak al gericht is op familie, reflectie en samenzijn. Dit maakt het een extra krachtig moment om bewust stil te staan bij het afgelopen jaar en je voor te bereiden op wat komen gaat.
          </p>

          {/* Rituelen */}
          <h2 id="betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Rituelen tijdens de Cold Moon
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Deze vijf rituelen helpen je om bewust te werken met de afrondende, reflectieve energie van de Cold Moon:
          </p>

          {/* Ritueel 1 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              1. Reflectie & Dankbaarheid
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Kijk terug op het jaar en vier je groei.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Schrijf op wat je dit jaar hebt bereikt en geleerd</li>
              <li>Maak een lijst van momenten waar je dankbaar voor bent</li>
              <li>Noteer welke uitdagingen je hebt overwonnen</li>
              <li>Schrijf op wat je wilt loslaten voordat het nieuwe jaar begint</li>
              <li>Bedank jezelf voor je groei en doorzettingsvermogen</li>
            </ol>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Tip:</strong> Steek een kaars aan tijdens dit ritueel om het symbool van licht in de duisternis te versterken.
              </p>
            </div>
          </div>

          {/* Ritueel 2 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              2. Meditatie met Lichtvisualisatie
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Visualiseer jezelf omgeven door maanlicht dat blokkades oplost.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Ga comfortabel zitten met een Seleniet of Bergkristal in je handen</li>
              <li>Sluit je ogen en adem diep in en uit (10x)</li>
              <li>Visualiseer helder, wit maanlicht dat op je neerstraalt</li>
              <li>Voel hoe dit licht alle blokkades, zorgen en oude energie oplost</li>
              <li>Stel je voor dat je gevuld wordt met helderheid en rust</li>
              <li>Blijf 15-20 minuten zitten in deze staat van zuivering</li>
            </ol>
          </div>

          {/* Ritueel 3 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              3. Kristallen Opladen
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Plaats je stenen in het maanlicht voor zuivering en oplading.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Reinig je kristallen eerst (water, wierook of seleniet plaat)</li>
              <li>Leg ze buiten of op een vensterbank waar maanlicht komt</li>
              <li>Gebruik een schaal van glas, hout of schelp (vermijd metaal)</li>
              <li>Laat ze liggen van zonsondergang tot zonsopkomst</li>
              <li>Bescherm je stenen tegen regen, sneeuw of vorst</li>
            </ol>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Winterse voorzorg:</strong> Extreme kou kan sommige kristallen doen barsten. Leg ze binnen bij het raam als het vriest.
              </p>
            </div>
          </div>

          {/* Ritueel 4 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              4. Loslaatritueel
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Schrijf oude lasten op en laat ze symbolisch los.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Schrijf op een papiertje wat je wilt loslaten uit 2025</li>
              <li>Dit kunnen gewoonten, gedachten, relaties of gevoelens zijn</li>
              <li>Lees het hardop voor aan de volle maan</li>
              <li>Verbrand het papier veilig in een vuurvaste schaal, of begraaf het</li>
              <li>Visualiseer hoe de energie transformeert en weggaat</li>
              <li>Zeg: "Ik laat los wat me niet meer dient. Dank je, Cold Moon."</li>
            </ol>
          </div>

          {/* Ritueel 5 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              5. Intenties voor Hergeboorte
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Formuleer kernwoorden en doelen voor het komende jaar.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 pl-5 list-decimal text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Kies 2-3 kernwoorden voor 2026 (bijv. "vreugde", "kracht", "groei")</li>
              <li>Schrijf concrete intenties bij elk kernwoord</li>
              <li>Visualiseer jezelf levend vanuit deze intenties</li>
              <li>Leg het papier onder een Bergkristal of Citrien voor versterking</li>
              <li>Bewaar het op een speciale plek en lees het regelmatig terug</li>
            </ol>
          </div>

          {/* Edelstenen */}
          <h2 id="betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Edelstenen voor de Cold Moon
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Deze <strong>vijf edelstenen</strong> resoneren perfect met de afrondende, reflectieve energie van de Cold Moon. Gebruik ze tijdens rituelen, meditatie of draag ze als sieraad op 26 december:
          </p>

          {/* Seleniet */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              🤍 Seleniet
            </h3>
            <p className="text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Zuivering, maanverbinding, helderheid, bescherming
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Seleniet</strong> is vernoemd naar Selene, de Griekse maangodin. Deze melkwitte steen versterkt zuivering en verbinding met maanenergie, en reinigt zelfs andere stenen. Perfect voor de laatste volle maan van het jaar.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Leg andere kristallen op een seleniet plaat voor reiniging, of houd vast tijdens meditatie voor maanverbinding.
            </p>
          </div>

          {/* Hematiet/Obsidiaan */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              ⚫ Hematiet of Obsidiaan
            </h3>
            <p className="text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Diepe aarding, bescherming, kracht, stabiliteit
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Hematiet</strong> (zilvergrijs) en <strong>Obsidiaan</strong> (glanzend zwart) bieden beide krachtige bescherming en gronding in donkere tijden. Ze helpen je gegrond te blijven tijdens reflectie en transformatie.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Draag in je zak voor dagelijkse gronding, leg bij je wortelchakra tijdens meditatie, of plaats bij je voordeur voor bescherming.
            </p>
          </div>

          {/* Amethist */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              💜 Amethist
            </h3>
            <p className="text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Rust, intuïtie, spirituele verdieping, bescherming
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Amethist</strong> brengt rust, intuïtie en spirituele verdieping. Deze paarse steen helpt je om naar binnen te keren en de diepere betekenis van het afgelopen jaar te begrijpen. Perfect voor reflectie en meditatie.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Leg onder je kussen voor heldere dromen over het nieuwe jaar, of mediteer ermee voor inzichten.
            </p>
          </div>

          {/* Bergkristal */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              💎 Bergkristal
            </h3>
            <p className="text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Versterking van intenties, helderheid, zuivering, amplificatie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Bergkristal</strong> versterkt intenties en zorgt voor helderheid. De meester healer die alle energieën amplificeert - ideaal voor het zetten van krachtige intenties voor het nieuwe jaar.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Programmeer met je 2026 intenties, gebruik in crystal grids, of mediteer ermee voor helderheid over je pad.
            </p>
          </div>

          {/* Rookkwarts */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              🪨 Rookkwarts
            </h3>
            <p className="text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Loslaten, transmutatie, gronding, angstreductie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Rookkwarts</strong> helpt bij het loslaten van oude energie en patronen. Deze rookgrijze steen transformeert negatieve energie in neutrale of positieve energie - perfect voor het loslaatritueel.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Houd vast tijdens het loslaatritueel, mediteer ermee na het verbranden van je briefje, of draag voor dagelijkse transmutatie.
            </p>
          </div>

          {/* Opladen */}
          <h2 id="betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Laad je Edelstenen Op tijdens de Cold Moon?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De laatste volle maan van het jaar is een <strong>bijzonder moment</strong> om je edelstenen op te laden. De Cold Moon brengt energie van afsluiting en nieuw begin. Volg deze stappen:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan Kristallen Opladen tijdens Cold Moon:
            </h3>
            <ol className="space-y-3 text-gray-700 pl-5 list-decimal font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Reinig eerst grondig:</strong> Gebruik stromend water, wierook of leg ze op een seleniet plaat. Maak ze klaar voor het nieuwe jaar.</li>
              <li><strong>Kies je plek:</strong> Leg ze buiten of op een vensterbank waar maanlicht komt</li>
              <li><strong>Gebruik natuurlijke materialen:</strong> Glas, hout of schelp. Geen metaal - dit blokkeert de energie</li>
              <li><strong>Bescherm tegen winterse omstandigheden:</strong> Bij vorst, regen of sneeuw: leg ze binnen bij het raam</li>
              <li><strong>Timing:</strong> Leg ze uit bij zonsondergang en haal op vóór zonsopkomst</li>
              <li><strong>Zet een intentie:</strong> Zeg: "Ik laad deze kristallen op met Cold Moon energie voor afsluiting, reflectie en nieuw begin"</li>
            </ol>
          </div>

          <div className="border-l-4 border-gray-900 pl-6 my-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Extra Krachtig: Dubbele Intentie
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Omdat dit de laatste volle maan van het jaar is, kun je een dubbele intentie zetten:
            </p>
            <ul className="space-y-2 text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Loslaten:</strong> "Ik zuiver deze stenen van alle oude energie van 2025"</li>
              <li><strong>Nieuw begin:</strong> "Ik laad ze op met intenties voor een krachtig 2026"</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-700 mt-3 font-[family-name:var(--font-eb-garamond)]">
              Dit maakt het opladen extra betekenisvol voor de jaarovergang.
            </p>
          </div>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Bereid je Voor op de Cold Moon
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Vind de perfecte edelstenen voor je Cold Moon rituelen. Seleniet, Amethist, Bergkristal en meer voor afsluiting en nieuw begin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Bekijk Alle Edelstenen
              </Link>
              <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Onze Bestsellers
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 id="betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-8 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wanneer is de Cold Moon in december 2025 precies?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                De volle maan is op <strong>vrijdag 26 december 2025</strong> (tweede kerstdag). De exacte tijd kan variëren afhankelijk van je locatie, maar de energie is krachtig van 24-28 december.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waarom heet het de Cold Moon?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                De naam komt van de Native American traditie en verwijst naar de koudste tijd van het jaar. Andere namen zijn Long Night Moon (langste nacht) of Moon Before Yule.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik mijn kristallen opladen als het vriest?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Sommige kristallen kunnen barsten bij extreme kou (bijv. fluoriet, seleniet). Bij vorst is het veiliger om ze binnen bij het raam te leggen waar maanlicht komt. De energie werkt ook door glas heen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Is de Cold Moon anders dan andere volle manen?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Energetisch gezien brengt elke volle maan een eigen thema. De Cold Moon is bijzonder omdat het de laatste van het jaar is - perfect voor afsluiting, reflectie en het zetten van intenties voor het nieuwe jaar.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat is het verschil tussen Cold Moon rituelen en nieuwjaar intenties?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Cold Moon rituelen (26 december) focussen op loslaten en afsluiten van het oude jaar. Nieuwjaarsintentie (1 januari) focussen op nieuwe begin. De Cold Moon is een mooie voorbereiding op het nieuwe jaar - eerst loslaten, dan opnieuw beginnen.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke edelstenen mag ik niet opladen in de winterse kou?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Fragiele kristallen zoals <strong>Seleniet, Fluoriet, Celestien, Calciet en Kyaniet</strong> kunnen barsten bij vorst. Leg deze binnen bij het raam. Stevige stenen zoals Bergkristal, Amethist, Rookkwarts en Obsidiaan kunnen wel tegen kou.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Sluit 2025 Af met de Cold Moon
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Cold Moon van 26 december 2025</strong> is een bijzonder moment om het jaar bewust af te sluiten. De energie van deze laatste volle maan nodigt uit tot reflectie, dankbaarheid en voorbereiding op een nieuw begin. Het is een tijd om stil te staan bij je groei en ruimte te maken voor wat komen gaat.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Gebruik de <strong>rituelen en edelstenen</strong> uit deze gids om bewust te werken met deze afrondende energie. Of je nu kiest voor reflectie journaling, lichtvisualisatie meditatie of kristallen opladen - elk bewust gebaar helpt je om 2025 in vrede af te sluiten en 2026 krachtig te beginnen.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je alle edelstenen die je nodig hebt voor krachtig volle maan werk: Seleniet voor zuivering, Hematiet voor gronding, Amethist voor rust, Bergkristal voor helderheid, en Rookkwarts voor loslaten. Alle stenen zijn 100% authentiek en klaar om op te laden onder de Cold Moon.
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/volle-maan-oktober-2025" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Volle Maan Oktober 2025
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Ontdek de krachtige Jagermaan in Ram
                  </p>
                </div>
              </Link>
              <Link href="/blog/volle-maan-november-2025" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Volle Maan November 2025
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De Beaver Moon Supermaan voor gronding
                  </p>
                </div>
              </Link>
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal: De Koning
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Perfect voor nieuwjaars intenties
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Complete Gids: Chakra Kristallen
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Ontdek welke kristallen bij elk chakra horen
                  </p>
                </div>
              </Link>
              <Link href="/blog/jaar-van-het-vuurpaard-2026" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    2026: Jaar van het Vuurpaard
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Voorbereiden op het komende jaar
                  </p>
                </div>
              </Link>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Complete balans voor het nieuwe jaar
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
