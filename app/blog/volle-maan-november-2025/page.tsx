import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Volle Maan November 2025 (Beaver Moon Supermaan) - Rituelen & Edelstenen | StonesForHealth',
  description: 'Supermaan op 5 november 2025 om 14:19 uur. Ontdek de spirituele betekenis van de Beaver Moon, gronding rituelen en de beste edelstenen voor deze krachtige volle maan.',
  keywords: 'volle maan november 2025, beaver moon, supermaan, volle maan rituelen, edelstenen volle maan, citrien, rookkwarts, gronding, kristallen opladen',
  openGraph: {
    title: 'Volle Maan November 2025: Beaver Moon Supermaan - Complete Gids',
    description: 'Alles over de Beaver Moon Supermaan van 5 november 2025. Rituelen, betekenis en de beste edelstenen.',
    type: 'article',
    publishedTime: '2025-11-01T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/volle-maan-november-2025',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Volle Maan November 2025: Beaver Moon Supermaan",
  "description": "Supermaan op 5 november 2025 om 14:19 uur. Ontdek de spirituele betekenis van de Beaver Moon, gronding rituelen en de beste edelstenen.",
  "image": "https://stonesforhealth.nl/Blog images /Volle Maan November 2025- Beaver Moon Supermaan.jpeg",
  "datePublished": "2025-11-01T09:00:00Z",
  "dateModified": "2025-11-01T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/volle-maan-november-2025"
  }
};

export default function VolleMaanNovember2025Page() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Volle Maan November 2025: Beaver Moon Supermaan
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm sm:text-base text-gray-600">1 november 2025 • 9 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/Blog images /Volle Maan November 2025- Beaver Moon Supermaan.jpeg"
            alt="Volle maan november 2025 - Beaver Moon Supermaan met edelstenen"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Op <strong>woensdag 5 november 2025 om 14:19 uur</strong> (Nederlandse tijd, GMT+1) staat de maan vol aan de hemel als een <strong>Supermaan</strong> - extra groot en helder omdat de maan dicht bij de aarde staat. Deze volle maan wordt ook wel de <strong>Beaver Moon</strong> genoemd, vernoemd naar de tijd waarin bevers hun dammen bouwen ter voorbereiding op de winter. Deze maan brengt krachtige energie voor gronding, stabiliteit en het creëren van stevige fundamenten.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/volle-maan-oktober-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan Oktober 2025
                </Link> - De krachtige Jagermaan in Ram voor actie en transformatie
              </li>
              <li>
                <Link href="/blog/volle-maan-december-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan December 2025
                </Link> - De Cold Moon voor afsluiting en reflectie
              </li>
              <li>
                <Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Bergkristal Opladen met Maanenergie
                </Link> - De koning der kristallen versterkt volle maan rituelen
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#betekenis" className="text-gray-700 hover:text-gray-900 underline">Spirituele Betekenis Beaver Moon</a></li>
              <li><a href="#supermaan" className="text-gray-700 hover:text-gray-900 underline">Wat is een Supermaan?</a></li>
              <li><a href="#rituelen" className="text-gray-700 hover:text-gray-900 underline">Rituelen bij de Beaver Moon</a></li>
              <li><a href="#edelstenen" className="text-gray-700 hover:text-gray-900 underline">Edelstenen voor deze Volle Maan</a></li>
              <li><a href="#opladen" className="text-gray-700 hover:text-gray-900 underline">Kristallen Opladen tijdens Supermaan</a></li>
              <li><a href="#faq" className="text-gray-700 hover:text-gray-900 underline">Veelgestelde Vragen</a></li>
            </ul>
          </div>

          {/* Betekenis */}
          <h2 id="betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Spirituele Betekenis van de Beaver Moon
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Beaver Moon</strong> dankt haar naam aan de tijd waarin bevers hun dammen bouwen en zich klaarmaken voor de winter. Ook voor ons is dit een tijd om te bouwen aan stevige fundamenten en ons voor te bereiden op de introspectieve wintermaanden. Spiritueel gezien symboliseert deze maan:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Kernthema's Beaver Moon 2025:
            </h3>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Gronding & Stabiliteit:</strong> Verbind met de aarde en versterk je fundament</li>
              <li><strong>Voorbereiding:</strong> Maak jezelf klaar voor de rustige winterperiode</li>
              <li><strong>Bescherming:</strong> Creëer veilige ruimte voor jezelf en je dierbaren</li>
              <li><strong>Praktische Wijsheid:</strong> Focus op wat echt werkt en duurzaam is</li>
              <li><strong>Afsluiting:</strong> Rond projecten en thema's van dit jaar af</li>
            </ul>
          </div>

          {/* Supermaan */}
          <h2 id="supermaan" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Wat maakt deze Volle Maan een Supermaan?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Een <strong>Supermaan</strong> ontstaat wanneer de volle maan samenvalt met het punt waarop de maan het dichtst bij de aarde staat (perigeum). Hierdoor lijkt de maan tot <strong>14% groter</strong> en <strong>30% helderder</strong> dan normaal. Maar nog belangrijker: de energetische invloed is aanzienlijk sterker.
          </p>

          <div className="border-l-4 border-gray-900 pl-6 my-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Wat betekent dit voor jou?
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li>Extra krachtige emotionele golven - gevoelens komen sterker naar boven</li>
              <li>Versterkte intuïtie en helderziendheid</li>
              <li>Snellere manifestatie van intenties</li>
              <li>Fysieke effecten zoals slaapproblemen of verhoogde energie</li>
              <li>Perfecte tijd voor krachtig transformatiewerk</li>
            </ul>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            <strong>Belangrijk:</strong> Supermaan energie kan overweldigend zijn voor sensitieve mensen. Zorg voor extra gronding, rust en zelfzorg tijdens deze periode.
          </p>

          {/* Rituelen */}
          <h2 id="rituelen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Rituelen bij de Beaver Moon 2025
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Deze vijf rituelen helpen je om bewust te werken met de grondende, stabiliserende energie van de Beaver Moon Supermaan:
          </p>

          {/* Ritueel 1 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              1. Journaling: Bouwen aan je Fundament
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Net zoals de bever zijn dam bouwt, bouw jij aan je eigen stevige fundament.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Reflectievragen:
            </h4>
            <ul className="space-y-2 mb-4 pl-5 list-disc text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Wat heb ik nodig om me veilig en stabiel te voelen?</li>
              <li>Welke praktische stappen kan ik nemen om sterker te staan?</li>
              <li>Waar heb ik meer gronding en structuur nodig in mijn leven?</li>
              <li>Welke gewoonten ondersteunen mijn stabiliteit?</li>
              <li>Wat wil ik loslaten dat mijn fundament verzwakt?</li>
            </ul>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Tip:</strong> Schrijf met een bruine of groene pen om de aardverbinding te versterken.
              </p>
            </div>
          </div>

          {/* Ritueel 2 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              2. Gronding Meditatie met Kristallen
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Verbind diep met de aarde tijdens deze krachtige Supermaan.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Ga comfortabel zitten met Rookkwarts of Hematiet in je handen</li>
              <li>Sluit je ogen en voel je verbinding met de aarde onder je</li>
              <li>Visualiseer wortels die vanuit je lichaam de grond in groeien</li>
              <li>Voel hoe stabiele aardenergie door je heen stroomt</li>
              <li>Adem diep en voel je gegrond, beschermd en stevig geworteld</li>
              <li>Blijf 15-20 minuten zitten in deze staat van gronding</li>
            </ol>
          </div>

          {/* Ritueel 3 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              3. Kristallen Opladen onder de Supermaan
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              De extra krachtige energie van deze Supermaan maakt opladen nog effectiever.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Reinig je kristallen eerst (water, wierook of klankschalen)</li>
              <li>Leg ze op een vensterbank of buiten onder het maanlicht</li>
              <li>Spreek je intentie voor gronding en stabiliteit uit</li>
              <li>Laat ze minimaal 4 uur opladen (hele nacht is optimaal)</li>
              <li>Haal ze op voor zonsopkomst als ze gevoelig zijn voor zonlicht</li>
            </ol>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Extra krachtig voor:</strong> Citrien, Rookkwarts, Bergkristal, Hematiet en Obsidiaan.
              </p>
            </div>
          </div>

          {/* Ritueel 4 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              4. Afrondingsritueel: Voorbereiding op de Winter
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Sluit het jaar af en maak ruimte voor rust en reflectie.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 mb-4 pl-5 list-decimal text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Schrijf wat je dit jaar hebt geleerd en bereikt</li>
              <li>Bedank jezelf voor je groei en doorzettingsvermogen</li>
              <li>Schrijf op wat je niet meer nodig hebt in de winterperiode</li>
              <li>Maak een lijst van intenties voor rust en introspectie</li>
              <li>Verbrand of begraaf symbolisch wat je loslaat</li>
            </ol>
          </div>

          {/* Ritueel 5 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              5. Intenties Zetten voor Hergeboorte
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Bereid je innerlijk voor op transformatie in de komende maanden.
            </p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan:
            </h4>
            <ol className="space-y-2 pl-5 list-decimal text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li>Schrijf welke versie van jezelf je wilt worden</li>
              <li>Welke gewoonten ondersteunen deze transformatie?</li>
              <li>Wat heb je nodig om deze winter door te komen?</li>
              <li>Plant symbolisch zaden (letterlijk of figuurlijk) voor de lente</li>
              <li>Plaats je intenties onder een Citrien of Bergkristal</li>
            </ol>
          </div>

          {/* Edelstenen */}
          <h2 id="edelstenen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Edelstenen voor de Beaver Moon Supermaan
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Deze <strong>zes edelstenen</strong> resoneren perfect met de grondende, stabiliserende energie van de Beaver Moon. Gebruik ze tijdens rituelen, meditatie of draag ze als sieraad op 5 november:
          </p>

          {/* Citrien */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              ☀️ Citrien
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Warmte, vitaliteit, positiviteit, manifestatie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Citrien</strong> brengt warmte en licht in de donkere maanden. Deze goudgele steen verhoogt je vitaliteit en helpt je positief te blijven tijdens de overgang naar winter. Perfect voor het vasthouden van optimisme en energie.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Plaats in je woon- of werkruimte voor warmte, draag als sieraad voor positieve energie, of mediteer ermee voor manifestatie.
            </p>
          </div>

          {/* Rookkwarts */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              🪨 Rookkwarts
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Gronding, stabiliteit, transmutatie, bescherming
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Rookkwarts</strong> is de ultieme grondingsteen. Deze rookgrijze kristal helpt je stabiel en gecentreerd te blijven tijdens de intense Supermaan energie. Transformeert stress en angst in kalmte.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Houd vast tijdens meditatie, draag bij je wortelchakra, of leg bij je voeten voor diepe gronding.
            </p>
          </div>

          {/* Bergkristal */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              💎 Bergkristal
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Energieversterking, helderheid, reiniging, amplificatie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Bergkristal</strong> versterkt de krachtige Supermaan energie. Deze heldere kristal brengt mentale helderheid en versterkt je intenties voor de wintermaanden. De meester healer die alle energie amplificeert.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Programmeer met je intenties, gebruik in crystal grids, of mediteer ermee onder het maanlicht.
            </p>
          </div>

          {/* Amethist */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              💜 Amethist
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Innerlijke rust, spirituele groei, intuïtie, bescherming
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Amethist</strong> bevordert innerlijke rust en spirituele groei. Deze paarse steen helpt je de winterperiode te omarmen als tijd van reflectie en transformatie. Kalmeert de geest en verdiept meditatie.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Leg onder je kussen voor rustgevende slaap, mediteer ermee voor inzichten, of draag als bescherming.
            </p>
          </div>

          {/* Labradoriet */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              ✨ Labradoriet
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Transformatie, bescherming, magie, intuïtie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Labradoriet</strong> beschermt je tijdens transformatie. Deze mysterieuze steen met regenboog flitsen schilt oude lagen af en helpt je nieuwe versies van jezelf te ontdekken. Perfect voor introspectief werk.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Draag tijdens rituelen, gebruik bij introspectief werk, of mediteer ermee voor magische inzichten.
            </p>
          </div>

          {/* Hematiet/Obsidiaan */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              ⚫ Hematiet of Obsidiaan
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Bescherming, aardverbinding, stabiliteit, kracht
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Hematiet</strong> (zilvergrijs) en <strong>Obsidiaan</strong> (glanzend zwart) bieden beide krachtige bescherming en aardverbinding. Perfect voor het bouwen van stevige fundamenten, net zoals de bever zijn dam bouwt.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Draag voor bescherming en stabiliteit, leg bij je wortelchakra, of gebruik in grondingsmeditaties.
            </p>
          </div>

          {/* Opladen */}
          <h2 id="opladen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Laad je Edelstenen Op tijdens de Supermaan?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Een Supermaan is een <strong>extra krachtig moment</strong> om je edelstenen en kristallen op te laden. De nabijheid van de maan versterkt de energie aanzienlijk. Volg deze stappen voor optimale resultaten:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stappenplan Kristallen Opladen bij Supermaan:
            </h3>
            <ol className="space-y-3 text-gray-700 pl-5 list-decimal font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Reinig eerst:</strong> Spoel je kristallen onder stromend water, gebruik wierook, palo santo of leg ze op seleniet</li>
              <li><strong>Kies je plek:</strong> Leg ze buiten of op een vensterbank waar direct maanlicht komt (Supermaan licht is extra helder!)</li>
              <li><strong>Gebruik natuurlijke materialen:</strong> Glazen, houten of keramische schaaltjes. Geen metaal - dit blokkeert de energie</li>
              <li><strong>Timing:</strong> Omdat deze volle maan overdag is (14:19), kun je ze vanaf 14:00 uur neerleggen en tot de volgende ochtend laten liggen</li>
              <li><strong>Zet een intentie:</strong> Zeg: "Ik laad deze kristallen op met Supermaan energie voor gronding, stabiliteit en [jouw specifieke doel]"</li>
              <li><strong>Laat minimaal 4 uur liggen:</strong> Liefst van middag tot volgende ochtend voor maximale lading</li>
            </ol>
          </div>

          <div className="border-l-4 border-gray-900 pl-6 my-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Overdag Volle Maan: Hoe werkt het opladen?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Omdat deze volle maan overdag plaatsvindt (14:19), zie je de maan pas 's avonds. Maar de energie is er al vanaf het exacte moment van volle maan. Je kunt op twee manieren werken:
            </p>
            <ul className="space-y-2 text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Optie 1:</strong> Leg kristallen vanaf 14:00 uur neer (ook al zie je de maan niet) - de energie is er wel</li>
              <li><strong>Optie 2:</strong> Wacht tot de avond en leg ze onder het zichtbare maanlicht</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-700 mt-3 font-[family-name:var(--font-eb-garamond)]">
              Beide werken goed - kies wat voor jou het beste voelt!
            </p>
          </div>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Bereid je Voor op de Beaver Moon Supermaan
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Vind de perfecte grondings- en volle maan kristallen. Citrien, Rookkwarts, Bergkristal en meer voor deze krachtige Supermaan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Bekijk Alle Edelstenen
              </Link>
              <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Onze Bestsellers
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 id="faq" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-8 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe laat is de volle maan in november 2025 precies?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                De volle maan is op <strong>woensdag 5 november 2025 om 14:19 uur</strong> (Nederlandse tijd, GMT+1). Dit is het exacte moment waarop de maan volledig verlicht is als Supermaan.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat maakt deze volle maan een Supermaan?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Een Supermaan ontstaat wanneer de volle maan samenvalt met het punt waarop de maan het dichtst bij de aarde staat (perigeum). Hierdoor lijkt de maan tot 14% groter en 30% helderder, en is de energetische invloed sterker dan bij een normale volle maan.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik mijn rituelen ook een dag eerder of later doen?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! De energie van de volle maan is krachtig van ongeveer 2 dagen ervoor tot 2 dagen erna. Bij een Supermaan kan de energie zelfs iets langer voelbaar zijn. Kies het moment dat voor jou het beste voelt tussen 3-7 november.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke kristallen zijn het beste voor gronding tijdens deze maan?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Rookkwarts, Hematiet en Obsidiaan</strong> zijn de krachtigste grondingsstenen. Combineer ze met Bergkristal om de energie te versterken en met Citrien om warmte en positiviteit toe te voegen aan je grondingswerk.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe bereid ik me voor op de introspectieve wintermaanden?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Gebruik deze Beaver Moon om bewust af te sluiten wat voltooid is, dankbaarheid te voelen voor je groei, en je fundament te versterken. Creëer rust in je huis, voorzie in je fysieke en emotionele behoeften, en stel intenties voor innerlijke groei tijdens de winter.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waarom heet het de Beaver Moon?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                De naam komt van de tijd waarin bevers actief hun dammen bouwen ter voorbereiding op de winter. Het was ook de tijd voor jagers om vallen te zetten voor bever vachten. De naam is afkomstig uit Native American tradities en koloniale kalenders.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Maak het Meeste van de Beaver Moon Supermaan
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De <strong>Beaver Moon Supermaan van 5 november 2025</strong> is een krachtig moment om je te gronden, stevige fundamenten te bouwen en je voor te bereiden op de introspectieve wintermaanden. De extra krachtige Supermaan energie versterkt je intenties en maakt dit een ideaal moment voor transformatiewerk.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Gebruik de <strong>rituelen en edelstenen</strong> uit deze gids om bewust te werken met deze stabiliserende energie. Of je nu kiest voor journaling, gronding meditatie of kristallen opladen - elk bewust gebaar helpt je om de volle maan energie optimaal te benutten.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth</strong> vind je alle edelstenen die je nodig hebt voor krachtig volle maan werk: Citrien voor warmte, Rookkwarts voor gronding, Bergkristal voor versterking, Amethist voor rust, en Labradoriet voor transformatie. Alle stenen zijn 100% authentiek en klaar om op te laden onder de Beaver Moon Supermaan.
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
              <Link href="/blog/volle-maan-december-2025" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Volle Maan December 2025
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De laatste volle maan van 2025: Cold Moon
                  </p>
                </div>
              </Link>
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal: De Koning der Kristallen
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Perfect voor opladen tijdens volle maan
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
              <Link href="/blog/edelstenen-per-sterrenbeeld-numerologie" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Edelstenen per Sterrenbeeld
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Vind de perfecte steen voor jouw sterrenbeeld
                  </p>
                </div>
              </Link>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    De Gouden Driehoek
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Amethist, bergkristal en rozenkwarts voor balans
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
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
