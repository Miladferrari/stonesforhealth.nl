import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Agaat: Betekenis, Soorten, Kleuren en Spirituele Werking | Complete Gids',
  description: 'Ontdek alles over agaat - van blauwe agaat tot vuuragaat. Leer over de betekenis, werking, soorten, kleuren en geschiedenis van deze veelzijdige edelsteen voor balans en bescherming.',
  keywords: [
    'agaat',
    'agaat betekenis',
    'blauwe agaat',
    'rode agaat',
    'mosagaat',
    'vuuragaat',
    'agaat werking',
    'agaat soorten',
    'agaat steen',
    'agaat edelsteen',
    'agaat armband',
    'agaat sieraden',
    'agaat chakra',
    'agaat bescherming',
    'groene agaat',
    'roze agaat',
    'zwarte agaat'
  ],
  openGraph: {
    title: 'Agaat: Betekenis, Soorten, Kleuren en Spirituele Werking',
    description: 'Complete gids over agaat - de veelzijdige edelsteen met duizenden jaren geschiedenis. Ontdek alle soorten, kleuren en hun unieke werking.',
    type: 'article',
    publishedTime: '2025-04-02',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/agaat-betekenis-soorten-kleuren-werking',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Agaat: Betekenis, Soorten, Kleuren en Spirituele Werking",
  "description": "Ontdek alles over agaat - van blauwe agaat tot vuuragaat. Leer over de betekenis, werking, soorten, kleuren en geschiedenis van deze veelzijdige edelsteen.",
  "image": "https://stonesforhealth.nl/blog-images/Agaat- Betekenis, Soorten, Kleuren en Spirituele Werking.webp",
  "datePublished": "2025-04-02T09:00:00Z",
  "dateModified": "2025-04-02T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/agaat-betekenis-soorten-kleuren-werking"
  }
};

export default function AgaatBlog() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Agaat: Betekenis, Soorten, Kleuren en Spirituele Werking
        </h1>
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">S4H</div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">2 april 2025 • 16 min read</p>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] my-8 rounded-xl overflow-hidden">
          <Image
            src="/blog-images/Agaat- Betekenis, Soorten, Kleuren en Spirituele Werking.webp"
            alt="Agaat - Betekenis, Soorten en Werking"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Agaat is een van de bekendste <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en wordt al duizenden jaren gebruikt vanwege zijn schoonheid én spirituele kracht. Deze bijzondere variant van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwarts</Link> komt in talloze kleuren en patronen voor, en wordt vaak gezien als een steen van balans, bescherming en kracht.
          </p>
        </div>

        {/* Lees Ook Section */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
          <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">
                Chakra Kristallen Complete Gids
              </Link> - Gebruik verschillende agaat kleuren voor specifieke chakra's
            </li>
            <li>
              <Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                Bergkristal: De Koning van Kristallen
              </Link> - Perfect te combineren met agaat voor versterking
            </li>
            <li>
              <Link href="/blog/top-10-bekendste-onbekendste-edelstenen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                Top 10 Bekendste & Onbekendste Edelstenen
              </Link> - Ontdek meer over agaat en andere krachtige stenen
            </li>
          </ul>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 mb-12 border border-[#492c4a]/10">
          <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Inhoudsopgave
          </h2>
          <nav className="space-y-3">
            <a href="#wat-is-agaat" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Wat is Agaat?
            </a>
            <a href="#kleuren-soorten" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Kleuren en Soorten Agaat
            </a>
            <a href="#werking" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Werking van Agaat
            </a>
            <a href="#vindplaatsen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Vindplaatsen van Agaat
            </a>
            <a href="#geschiedenis" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Geschiedenis van Agaat
            </a>
            <a href="#gebruik" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Hoe Gebruik je Agaat?
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Veelgestelde Vragen
            </a>
          </nav>
        </div>

        {/* Section 1: Wat is Agaat */}
        <section id="wat-is-agaat" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Wat is Agaat?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Agaat is een variant van chalcedoon, een vorm van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwarts</Link> die gekenmerkt wordt door zijn gelaagde structuur. De prachtige patronen en kleuren ontstaan door mineralen die zich in holtes van gesteenten hebben afgezet, vaak in vulkanische gebieden.
            </p>
            <p>
              Elke laag vertelt een eigen verhaal, waardoor geen enkele agaatsteen hetzelfde is. Deze unieke karakteristiek maakt agaat tot een van de meest verzamelde <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> ter wereld.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Kenmerken van Agaat
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🔮 Mineraal Familie</h4>
                  <p className="text-white/90">
                    Chalcedoon (variant van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">kwarts</Link>)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💎 Hardheid</h4>
                  <p className="text-white/90">
                    6.5 - 7 op schaal van Mohs
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🌈 Kleuren</h4>
                  <p className="text-white/90">
                    Vrijwel alle kleuren - blauw, rood, groen, roze, zwart, wit
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">⚡ Energie</h4>
                  <p className="text-white/90">
                    Aardend, stabiliserend, beschermend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Kleuren en Soorten */}
        <section id="kleuren-soorten" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Kleuren en Soorten Agaat
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Agaat komt voor in talloze kleuren en patronen. Elke soort heeft zijn eigen energie en werking. Net zoals <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra kristallen</Link> verschillende energiecentra ondersteunen, werken verschillende agaat kleuren op unieke gebieden.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              {/* Blauwe Agaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💙 Blauwe Agaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Rustgevend en kalmerend, helpt bij communicatie en zelfexpressie. Verbonden met het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">keelchakra</Link>.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: stress-reductie, presentaties, moeilijke gesprekken, meditatie
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop blauwe agaat
                </Link>
              </div>

              {/* Roze Agaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💗 Roze Agaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Stimuleert liefde, harmonie en emotioneel herstel. Werkt op het <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link>.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: zelfliefde, relaties, emotionele wonden helen, compassie
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek roze agaat
                </Link>
              </div>

              {/* Rode Agaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  ❤️ Rode Agaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Staat voor kracht, energie en doorzettingsvermogen. Activeert het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">wortelchakra</Link>.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: motivatie, uithoudingsvermogen, fysieke energie, aarding
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Bekijk rode agaat
                </Link>
              </div>

              {/* Groene Agaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💚 Groene Agaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Brengt balans en harmonie, ondersteunt heling en herstel. Verbonden met het hartchakra.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: emotionele balans, fysieke heling, harmonie, groei
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop groene agaat
                </Link>
              </div>

              {/* Mosagaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌿 Mosagaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Nauw verbonden met de natuur, werkt aardend en bevordert groei. De "tuinierssteen".
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: contact met natuur, nieuwe begin, groei, overvloed
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek mosagaat
                </Link>
              </div>

              {/* Vuuragaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🔥 Vuuragaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Geeft passie, energie en doorzettingsvermogen. Vlammen in de steen zichtbaar.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: creativiteit, passie, motivatie, manifestatie
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Bekijk vuuragaat
                </Link>
              </div>

              {/* Zwarte Agaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🖤 Zwarte Agaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Beschermend en aardend, helpt negatieve energie af te weren. Krachtige beschermsteen.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: bescherming, aarding, negatieve energie afweren, stabiliteit
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop zwarte agaat
                </Link>
              </div>

              {/* Witte/Grijze Agaat */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🤍 Witte/Grijze Agaat
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Werking:</strong> Zuiverend en balancerend, brengt helderheid en rust. Neutraal en veelzijdig.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Perfect voor: helderheid, balans, zuivering, neutraliteit
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek witte agaat
                </Link>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                🌈 <strong>Combineer Agaat met andere Kristallen:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Agaat + <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">Bergkristal</Link> - versterking van agaat's werking</li>
                <li>Agaat + <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">Amethist</Link> - spirituele rust en bescherming</li>
                <li>Agaat + <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">Citrien</Link> - vreugde en stabiliteit</li>
                <li>Gebruik in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra sets</Link> voor complete balans</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Werking */}
        <section id="werking" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Werking van Agaat
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Agaat staat bekend als een beschermende en stabiliserende steen. De werking varieert per kleur, maar alle agaten delen bepaalde basiseigenschappen die ze tot krachtige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> maken voor dagelijks gebruik.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Universele Werking van Agaat
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-3xl">⚖️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Emotionele Balans</h4>
                    <p className="text-white/90">
                      Brengt emotionele stabiliteit en innerlijke rust. Helpt bij het verwerken van emoties en trauma's. Vergelijkbaar met <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#fbe022] font-semibold hover:underline">rhodoniet voor emotionele heling</Link>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🛡️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Stress & Angst Vermindering</h4>
                    <p className="text-white/90">
                      Kalmeert innerlijke onrust en vermindert angst. Brengt een gevoel van veiligheid en stabiliteit. Ideaal voor <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">meditatie</Link> en ontspanning.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">💪</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Fysieke Kracht & Uithoudingsvermogen</h4>
                    <p className="text-white/90">
                      Bevordert fysieke kracht en energie. Ondersteunt het immuunsysteem en algemene vitaliteit.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Aarding & Stabiliteit</h4>
                    <p className="text-white/90">
                      Zorgt voor een goede aarding en innerlijke stabiliteit. Verbindt je met de aarde en het hier-en-nu. Werkt op het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">wortelchakra</Link>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Zelfvertrouwen & Focus</h4>
                    <p className="text-white/90">
                      Vergroot zelfvertrouwen en concentratie. Helpt bij het stellen en bereiken van doelen. Ondersteunt mentale helderheid zoals <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                💎 <strong>Agaat voor Specifieke Doeleinden:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Voor bescherming:</strong> Zwarte agaat of mosagaat</li>
                <li><strong>Voor communicatie:</strong> Blauwe agaat op het keelchakra</li>
                <li><strong>Voor liefde:</strong> Roze agaat met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link></li>
                <li><strong>Voor energie:</strong> Rode agaat of vuuragaat</li>
                <li><strong>Voor balans:</strong> Groene agaat of witte agaat</li>
                <li><strong>Voor creativiteit:</strong> Vuuragaat met <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Vindplaatsen */}
        <section id="vindplaatsen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Vindplaatsen van Agaat
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Agaat wordt wereldwijd gevonden, maar de belangrijkste vindplaatsen leveren elk hun eigen unieke varianten met specifieke kenmerken en kleuren.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇧🇷 Brazilië
                </h3>
                <p className="text-gray-700">
                  Grootste producent van agaat. Bekend om grote specimens en kleurrijke varianten. Braziliaanse agaten zijn geliefd bij verzamelaars.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇺🇾 Uruguay
                </h3>
                <p className="text-gray-700">
                  Bekend om hoogwaardige kwaliteit en diepe kleuren. Uruguayaanse amethist geodes bevatten vaak agaat lagen.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇮🇳 India
                </h3>
                <p className="text-gray-700">
                  Eeuwenoude bron van agaat. Historisch belangrijk voor agaathandel. Diverse kleuren en patronen.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇲🇬 Madagaskar
                </h3>
                <p className="text-gray-700">
                  Bijzondere patronen en kleuren. Bron van zeldzame agaat varianten en unieke specimens.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇩🇪 Duitsland
                </h3>
                <p className="text-gray-700">
                  Idar-Oberstein, historisch centrum van agaatbewerking sinds de 16e eeuw. Eeuwenoude traditie van edelsteensnijden.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇺🇸 Verenigde Staten
                </h3>
                <p className="text-gray-700">
                  Lake Superior agaat (Minnesota), Montana agaat, Oregon agaat. Unieke Amerikaanse varianten met karakteristieke kleuren.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Geschiedenis */}
        <section id="geschiedenis" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Geschiedenis van Agaat
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Agaat heeft een rijke geschiedenis die teruggaat tot de vroegste beschavingen. Deze <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen</Link> werd door vele culturen gewaardeerd om zijn schoonheid en vermeende magische krachten.
            </p>

            <div className="bg-gradient-to-br from-[#fbe022]/20 to-[#fbe022]/5 rounded-2xl p-8 border border-[#fbe022]/30">
              <h3 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                📜 Historische Tijdlijn
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🏺 Oudheid (4000 v.Chr. - 500 n.Chr.)
                  </h4>
                  <ul className="space-y-2 ml-6 list-disc text-gray-700">
                    <li><strong>Sumeriërs (4000 v.Chr.):</strong> Gebruikten agaat in amuletten en <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link></li>
                    <li><strong>Oude Egyptenaren:</strong> Maakten scarabeeën en beschermende amuletten van agaat</li>
                    <li><strong>Grieken:</strong> Noemden het naar de rivier Achates in Sicilië waar het gevonden werd</li>
                    <li><strong>Romeinen:</strong> Gebruikten agaat als talisman tegen ongeluk en gevaar</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    ⚗️ Middeleeuwen (500 - 1500 n.Chr.)
                  </h4>
                  <ul className="space-y-2 ml-6 list-disc text-gray-700">
                    <li><strong>Alchemisten:</strong> Gebruikten agaat in hun experimenten en rituelen</li>
                    <li><strong>Healers:</strong> Schreven agaat genezende krachten toe</li>
                    <li><strong>Bescherming:</strong> Agaat werd gedragen als bescherming tegen gif en ziekte</li>
                    <li><strong>Landbouw:</strong> Boeren gebruikten agaat voor betere oogsten (vooral mosagaat)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    💎 Renaissance tot Heden (1500 - nu)
                  </h4>
                  <ul className="space-y-2 ml-6 list-disc text-gray-700">
                    <li><strong>16e eeuw:</strong> Idar-Oberstein (Duitsland) werd wereldcentrum van agaatbewerking</li>
                    <li><strong>19e eeuw:</strong> Ontdekking van grote agaat deposito's in Brazilië en Uruguay</li>
                    <li><strong>20e eeuw:</strong> Agaat populair in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">spirituele sieraden</Link> en healing praktijken</li>
                    <li><strong>21e eeuw:</strong> Moderne toepassingen in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra werk</Link> en kristaltherapie</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                🌟 <strong>Interessante Feiten:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>De naam "agaat" komt van de Griekse rivier Achates (nu Dirillo in Sicilië)</li>
                <li>In de oudheid werd agaat gebruikt om oogziekten te genezen</li>
                <li>Sommige culturen geloofden dat agaat onzichtbaar maakte</li>
                <li>Agaat werd gebruikt als ogen in standbeelden en beelden</li>
                <li>Idar-Oberstein verwerkt nog steeds wereldwijd <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Gebruik */}
        <section id="gebruik" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Hoe Gebruik je Agaat?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Agaat is een veelzijdige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen</Link> die op verschillende manieren gebruikt kan worden voor spirituele en dagelijkse doeleinden.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  📿 Draag als Sieraad
                </h3>
                <p className="text-white/90 mb-3">
                  <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#fbe022] font-semibold hover:underline">Agaat armbanden</Link>, <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">kettingen</Link> en <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">ringen</Link> houden de energie de hele dag bij je.
                </p>
                <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                  → Shop agaat sieraden
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🧘 Meditatie
                </h3>
                <p className="text-white/90 mb-3">
                  Houd agaat vast tijdens <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">meditatie</Link> voor aarding en focus. Combineer met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link>.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🏠 In je Huis
                </h3>
                <p className="text-white/90 mb-3">
                  Plaats agaat geodes of schijven in je huis voor beschermende en stabiliserende energie. Perfect voor woonkamer of werkruimte.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌈 Chakra Werk
                </h3>
                <p className="text-white/90 mb-3">
                  Gebruik agaat kleuren op specifieke <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">chakra's</Link>. Blauwe agaat op keelchakra, rode agaat op wortelchakra.
                </p>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                💫 <strong>Tips voor Gebruik:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Reinig agaat regelmatig onder stromend water</li>
                <li>Laad op in maanlicht of met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link></li>
                <li>Combineer met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> voor complete balans</li>
                <li>Gebruik verschillende kleuren voor verschillende doeleinden</li>
                <li>Draag dagelijks voor continue ondersteuning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
            Veelgestelde Vragen over Agaat
          </h2>
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat is het verschil tussen agaat en jaspis?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Beide zijn <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwarts</Link> varianten, maar agaat heeft gelaagde banden terwijl jaspis een meer uniforme, vaak gevlekte of gestreepte structuur heeft. Agaat is transparanter dan jaspis.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke kleur agaat is het beste voor beginners?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Blauwe agaat of witte/grijze agaat zijn perfect voor beginners. Ze hebben zachte, kalmerende energie en werken op meerdere niveaus. Combineer met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> voor een complete start.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe onderscheid je echte agaat van nep?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Echte agaat heeft natuurlijke, onregelmatige banden en voelt zwaar aan voor zijn grootte. Nep agaat (glas) heeft vaak perfecte, symmetrische patronen en luchtbellen. Koop bij betrouwbare <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">leveranciers zoals S4H</Link> voor garantie van echtheid.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik agaat combineren met andere edelstenen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Agaat combineert goed met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link> (versterking), <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">amethist</Link> (spiritualiteit), <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link> (vreugde) en in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra sets</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe reinig en laad ik agaat op?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Reinig agaat onder stromend water of met witte salie. Laad op in maanlicht (volledig veilig) of met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>. Sommige kleuren kunnen in zonlicht, maar test eerst met een klein stukje.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waar kan ik authentieke agaat edelstenen kopen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> vind je een uitgebreid assortiment authentieke agaat <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. Alle <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H producten</Link> worden zorgvuldig geselecteerd op authenticiteit.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Ontdek de Kracht van Agaat</h3>
          <p className="text-base sm:text-lg text-gray-700 mb-6">Shop authentieke agaat edelstenen en sieraden voor balans, bescherming en stabiliteit</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">Bekijk Agaat Collectie</Link>
            <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold">Bestsellers</Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t-2 border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
            Gerelateerde Artikelen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/bergkristal-koning-kristallen" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Bergkristal: De Koning
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Ontdek de kracht van bergkristal - perfect te combineren met agaat.
                </p>
              </div>
            </Link>

            <Link href="/blog/chakra-kristallen-complete-gids" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Chakra Kristallen Gids
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Gebruik agaat kleuren op specifieke chakra's voor optimale balans.
                </p>
              </div>
            </Link>

            <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  S4H Sieraden Collectie
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Draag agaat als armband, ketting of ring voor dagelijkse ondersteuning.
                </p>
              </div>
            </Link>

            <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  De Gouden Driehoek
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Combineer agaat met de drie krachtigste kristallen voor beginners.
                </p>
              </div>
            </Link>

            <Link href="/blog/top-10-bekendste-onbekendste-edelstenen" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Top 10 Edelstenen
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Ontdek de bekendste en onbekendste edelstenen inclusief agaat.
                </p>
              </div>
            </Link>

            <Link href="/blog/art-of-stones-s4h-edelstenen" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Art of Stones S4H
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Leer over authentieke agaat en andere edelstenen bij S4H.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 border border-[#492c4a]/10">
          <div className="flex items-start gap-6">
            <div className="bg-[#492c4a] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
              S4H
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                Stonesforhealth.nl Edelstenen Experts
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Het team van <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H</Link> brengt je kennis over <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> zoals agaat, <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>, <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">amethist</Link> en meer. Ontdek de spirituele werking, geschiedenis en toepassingen van alle <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">kristallen</Link> in onze collectie. Shop authentieke <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">edelsteen sieraden</Link> en losse stenen bij ons.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
