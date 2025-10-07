import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'S4H Sieraden: Spirituele Kracht en Stijl in Één | Stonesforhealth.nl',
  description: 'Ontdek S4H sieraden - edelsteen armbanden, kettingen en ringen met echte spirituele werking. Combineer stijl met chakra balans, bescherming en liefde. Exclusief bij Stonesforhealth.nl.',
  keywords: [
    'S4H sieraden',
    'edelsteen armbanden',
    'spirituele sieraden',
    'chakra armbanden',
    'edelsteen kettingen',
    'kristal sieraden',
    'amethist armband',
    'rozenkwarts sieraden',
    'bergkristal ketting',
    'spirituele armband',
    'edelsteen ringen',
    'chakra sieraden',
    'S4H armband',
    'Stones for Health sieraden',
    'energetische sieraden'
  ],
  openGraph: {
    title: 'S4H Sieraden: Spirituele Kracht en Stijl in Één',
    description: 'Ontdek S4H sieraden - de perfecte combinatie van schoonheid en spiritualiteit. Edelsteen armbanden, kettingen en ringen voor dagelijks gebruik.',
    type: 'article',
    publishedTime: '2025-03-30',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/s4h-sieraden-spirituele-kracht-stijl',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "S4H Sieraden: Spirituele Kracht en Stijl in Één",
  "description": "Ontdek S4H sieraden - edelsteen armbanden, kettingen en ringen met echte spirituele werking. Combineer stijl met chakra balans, bescherming en liefde.",
  "image": "https://stonesforhealth.nl/Blog images /S4H Sieraden- Spirituele Kracht en Stijl in Één.webp",
  "datePublished": "2025-03-30T09:00:00Z",
  "dateModified": "2025-03-30T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/s4h-sieraden-spirituele-kracht-stijl"
  }
};

export default function S4HSieradenBlog() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          S4H Sieraden: Spirituele Kracht en Stijl in Één
        </h1>
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">S4H</div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">30 maart 2025 • 13 min read</p>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] my-8 rounded-xl overflow-hidden">
          <Image
            src="/Blog images /S4H Sieraden- Spirituele Kracht en Stijl in Één.webp"
            alt="S4H Sieraden - Spirituele Kracht en Stijl"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> vind je niet alleen losse <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">kristalsets</Link>, maar ook onze eigen lijn <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> onder het label <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H (Stones for Health)</Link>. Deze collectie is ontworpen voor iedereen die stijl wil combineren met spirituele betekenis. In dit blog ontdek je waarom S4H sieraden uniek zijn, hoe ze worden gemaakt en welke spirituele werking ze hebben.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Art of Stones: Het Verhaal achter S4H
                </Link> - Ontdek het bedrijf achter onze sieraden collectie
              </li>
              <li>
                <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  De Gouden Driehoek
                </Link> - Ook verkrijgbaar als elegante armband set
              </li>
              <li>
                <Link href="/blog/chakra-kristallen-complete-gids" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Chakra Kristallen Gids
                </Link> - Kies je armband op chakra-werking
              </li>
            </ul>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 mb-12 border border-[#492c4a]/10">
          <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Inhoudsopgave
          </h2>
          <nav className="space-y-3">
            <a href="#waarom-s4h" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Waarom Kiezen voor S4H Sieraden?
            </a>
            <a href="#soorten-sieraden" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Soorten S4H Sieraden
            </a>
            <a href="#spirituele-betekenis" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Spirituele Betekenis van Edelsteen Sieraden
            </a>
            <a href="#duurzaamheid" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Duurzaamheid en Kwaliteit
            </a>
            <a href="#missie" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Missie achter S4H Sieraden
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Veelgestelde Vragen
            </a>
          </nav>
        </div>

        {/* Section 1: Waarom S4H */}
        <section id="waarom-s4h" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Waarom Kiezen voor S4H Sieraden?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Er zijn talloze <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden met edelstenen</Link> verkrijgbaar, maar de <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H-collectie</Link> onderscheidt zich door een unieke combinatie van kwaliteit, spiritualiteit en stijl.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Wat maakt S4H Sieraden Uniek?
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-3xl">💎</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Echte Edelstenen</h4>
                    <p className="text-white/90">
                      Zorgvuldig geselecteerd en energetisch getest. Alle <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">edelstenen</Link> zijn authentiek en natuurlijk - geen synthetische stenen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🧘</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Spirituele Werking</h4>
                    <p className="text-white/90">
                      Elk <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">sieraad</Link> draagt een unieke energie die je dagelijks ondersteunt. Van <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">chakra balans</Link> tot bescherming.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Stijlvol Design</h4>
                    <p className="text-white/90">
                      Modern, draagbaar en geschikt voor dagelijks gebruik. Combineer spiritualiteit met elegantie.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Betaalbare Kwaliteit</h4>
                    <p className="text-white/90">
                      Hoogwaardige materialen voor een eerlijke prijs. Geen onnodige tussenstappen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🏷️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Eigen Merk (S4H)</h4>
                    <p className="text-white/90">
                      Exclusief bij <Link href="/" className="text-[#fbe022] font-semibold hover:underline">Stonesforhealth.nl</Link> en geselecteerde partners zoals Amazon, Bol.com en Rakuten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Soorten Sieraden */}
        <section id="soorten-sieraden" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Soorten S4H Sieraden
          </h2>
          <div className="space-y-10 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">

            {/* Armbanden */}
            <div>
              <h3 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                📿 Edelsteen Armbanden
              </h3>
              <p className="mb-6">
                Onze <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">armbanden</Link> zijn gemaakt van echte edelsteen kralen en dragen de energie van de gekozen steen altijd met je mee. Perfect voor dagelijks gebruik en spirituele ondersteuning.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    💜 Amethist Armband
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Rust, intuïtie en bescherming. <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">Amethist</Link> is een van de meest krachtige <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">spirituele stenen</Link> en perfect voor meditatie en stress-reductie.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Shop Amethist Armbanden
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    💗 Rozenkwarts Armband
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Liefde, harmonie en zelfliefde. <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">Rozenkwarts</Link> opent het <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link> en bevordert compassie en empathie.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Ontdek Rozenkwarts Armbanden
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    🐯 Tijgeroog Armband
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Kracht, bescherming en focus. Tijgeroog helpt bij het behouden van focus en beschermt tegen negatieve energie.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Bekijk Tijgeroog Armbanden
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    🌈 Labradoriet Armband
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Bescherming tegen negatieve energie. Labradoriet is een krachtige beschermsteen die je aura versterkt.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Shop Labradoriet Armbanden
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    🌈 Chakra Armband
                  </h4>
                  <p className="text-gray-700 mb-3">
                    7 stenen voor 7 <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra's</Link>. Complete balans en harmonie in één armband.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Ontdek Chakra Armbanden
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    ✨ Bergkristal Armband
                  </h4>
                  <p className="text-gray-700 mb-3">
                    <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">De Koning der Kristallen</Link> voor helderheid, zuivering en versterking van intenties.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Bekijk Bergkristal Armbanden
                  </Link>
                </div>
              </div>
            </div>

            {/* Kettingen */}
            <div>
              <h3 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                📿 Kettingen en Hangers
              </h3>
              <p className="mb-6">
                S4H <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">kettingen</Link> worden vaak gedragen als spiritueel symbool. Ze dragen de energie dichtbij je hart en kunnen dienen als dagelijkse herinnering aan je intenties.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-lg font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🔮 Bergkristal Punten
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Voor helderheid en focus. <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">Bergkristal</Link> hangers versterken je intenties.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold text-sm hover:underline">
                    → Bekijk nu
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-lg font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🌈 Chakra Hangers
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Voor balans en harmonie. <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">Chakra</Link> hangers met 7 stenen.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold text-sm hover:underline">
                    → Ontdek meer
                  </Link>
                </div>

                <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-lg font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🌳 Symbolen
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Levensboom, lotusbloem en meer. Spirituele symbolen voor kracht en groei.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold text-sm hover:underline">
                    → Shop symbolen
                  </Link>
                </div>
              </div>
            </div>

            {/* Ringen & Oorbellen */}
            <div>
              <h3 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                💍 Ringen en Oorbellen
              </h3>
              <p className="mb-4">
                Subtiele maar krachtige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> die elegantie combineren met spirituele betekenis. Perfect voor dagelijks gebruik of speciale gelegenheden.
              </p>
              <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
                <p className="font-semibold text-gray-900">
                  💎 <strong>Ontdek onze collectie:</strong>
                </p>
                <ul className="mt-3 space-y-2 ml-6 list-disc">
                  <li><Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">Edelsteen ringen</Link> - voor dagelijks of speciale momenten</li>
                  <li><Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">Edelsteen oorbellen</Link> - subtiele energie dichtbij je hoofd</li>
                  <li>Combineer met <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">armbanden</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">kettingen</Link> voor complete sets</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Spirituele Betekenis */}
        <section id="spirituele-betekenis" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Spirituele Betekenis van Edelsteen Sieraden
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">Edelstenen</Link> hebben van nature een energetische werking. Door ze te dragen in de vorm van <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>, kun je hun kracht dagelijks benutten en altijd bij je dragen.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
                  🛡️ Bescherming
                </h3>
                <p className="text-white/90 mb-3">
                  Zoals zwarte toermalijn en labradoriet. Deze stenen vormen een energetisch schild rondom je aura.
                </p>
                <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                  → Shop beschermende sieraden
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
                  ⚖️ Balans
                </h3>
                <p className="text-white/90 mb-3">
                  <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">Chakra-sieraden</Link> brengen de energiebanen in evenwicht. 7 stenen voor 7 energiecentra.
                </p>
                <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                  → Ontdek chakra sieraden
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
                  ✨ Manifestatie
                </h3>
                <p className="text-white/90 mb-3">
                  <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#fbe022] font-semibold hover:underline">Citrien</Link> en <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link> versterken jouw intenties en helpen bij het manifesteren van je dromen.
                </p>
                <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                  → Bekijk manifestatie sieraden
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
                  💗 Liefde & Rust
                </h3>
                <p className="text-white/90 mb-3">
                  <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">Rozenkwarts</Link> en <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">amethist</Link> openen hart en geest voor liefde, compassie en rust.
                </p>
                <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                  → Shop liefde sieraden
                </Link>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                🌟 <strong>Populaire Spirituele Toepassingen:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">Chakra balans</Link> - draag chakra armbanden of kettingen</li>
                <li><Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">Hartchakra heling</Link> - rozenkwarts en morganiet sieraden</li>
                <li><Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">Helderheid & focus</Link> - bergkristal hangers en ringen</li>
                <li><Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">Energie balans</Link> - citrien & amethist combinaties</li>
                <li>Meditatie ondersteuning - <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> sieraden</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Duurzaamheid */}
        <section id="duurzaamheid" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Duurzaamheid en Kwaliteit
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H</Link> kiest bewust voor authentieke stenen en duurzame materialen. Elke steen wordt met zorg geselecteerd en gecontroleerd. Zo garanderen we dat je geen synthetische of nep-stenen ontvangt, maar een echt product met spirituele waarde.
            </p>

            <div className="bg-gradient-to-br from-[#fbe022]/20 to-[#fbe022]/5 rounded-2xl p-8 border border-[#fbe022]/30">
              <h3 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✓ Onze Kwaliteitsgarantie
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">🔍 Zorgvuldige Selectie</h4>
                  <p className="text-gray-700">
                    Elk <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraad</Link> wordt gemaakt met handmatig geselecteerde <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> van betrouwbare bronnen.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">✨ Energetische Controle</h4>
                  <p className="text-gray-700">
                    Alle stenen worden gecontroleerd op authenticiteit en energetische kwaliteit voordat ze worden verwerkt.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">🌍 Ethisch Gewonnen</h4>
                  <p className="text-gray-700">
                    We werken alleen met leveranciers die ethische winningspraktijken hanteren en eerlijke handel garanderen.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">💎 100% Authentiek</h4>
                  <p className="text-gray-700">
                    Geen synthetische of nep-stenen. Alleen natuurlijke <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> met echte energetische werking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Missie */}
        <section id="missie" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Missie achter S4H Sieraden
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Het merk <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H</Link> wil <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> aanbieden die meer zijn dan accessoires. Elk stuk vertelt een verhaal en ondersteunt je in je dagelijks leven.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                💫 S4H Sieraden Betekenis
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-3xl">💪</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Dagelijkse Kracht</h4>
                    <p className="text-white/90">
                      Een <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">armband</Link> kan je kracht geven op drukke dagen. Draag <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link> voor helderheid of tijgeroog voor focus.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🧿</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Spirituele Herinnering</h4>
                    <p className="text-white/90">
                      Een <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">ketting</Link> kan dienen als amulet of spirituele herinnering. Perfect voor <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">meditatie</Link> en intentie-setting.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Subtiele Energie</h4>
                    <p className="text-white/90">
                      <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">Oorbellen</Link> of <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">ringen</Link> kunnen subtiel je energie versterken zonder opvallend te zijn. Perfect voor dagelijks gebruik.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xl font-semibold text-[#492c4a]">
              S4H <Link href="/collections/all" className="hover:underline">sieraden</Link> zijn meer dan mooi - ze zijn energetische tools voor welzijn en spirituele groei.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn S4H sieraden gemaakt met echte edelstenen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja, alle <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H sieraden</Link> zijn gemaakt met 100% natuurlijke, authentieke <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>. We gebruiken geen synthetische of nep-stenen. Elk sieraad wordt zorgvuldig gecontroleerd op kwaliteit en authenticiteit.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke sieraden zijn het beste voor beginners?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Begin met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>: amethist, bergkristal en rozenkwarts armbanden. Of kies een <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra armband</Link> voor complete balans. Deze stenen zijn krachtig maar zacht genoeg voor dagelijks gebruik.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe moet ik mijn edelsteen sieraden onderhouden?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Reinig je <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen sieraden</Link> regelmatig onder stromend water of met witte salie. Laad ze op in maanlicht of zonlicht (afhankelijk van de steen). <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">Bergkristal</Link> kan alle stenen zuiveren en herladen.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik meerdere edelsteen sieraden tegelijk dragen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Je kunt meerdere <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen sieraden</Link> combineren. Kies stenen met complementaire energieën zoals <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien & amethist</Link> of <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">morganiet & rhodoniet</Link>. Start met 2-3 stenen en voel wat werkt voor jou.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waar kan ik S4H sieraden kopen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H sieraden</Link> zijn exclusief verkrijgbaar bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en geselecteerde partners zoals Amazon (EU & UK), Bol.com en Rakuten.fr in 11 Europese landen.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke sieraden zijn het beste voor bescherming?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Voor bescherming raden we aan: zwarte toermalijn <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">armbanden</Link>, labradoriet <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">kettingen</Link>, of obsidiaan sieraden. Deze stenen vormen een energetisch schild tegen negatieve energie.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Ontdek de S4H Sieraden Collectie</h3>
          <p className="text-base sm:text-lg text-gray-700 mb-6">Stijl en spiritualiteit in één - shop edelsteen armbanden, kettingen en ringen</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">Bekijk Alle Sieraden</Link>
            <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold">Bestsellers</Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t-2 border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
            Gerelateerde Artikelen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/art-of-stones-s4h-edelstenen" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Art-of-Stones & S4H
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Het verhaal achter het merk S4H en de missie van Art-of-Stones B.V.
                </p>
              </div>
            </Link>

            <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  De Gouden Driehoek
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Ook verkrijgbaar als armband set
                </p>
              </div>
            </Link>

            <Link href="/blog/top-10-edelstenen-beginners" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Top 10 Edelstenen
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Must-have kristallen in sieraden vorm
                </p>
              </div>
            </Link>

            <Link href="/blog/chakra-kristallen-complete-gids" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Chakra Kristallen Gids
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Kies je armband op chakra-werking
                </p>
              </div>
            </Link>

            <Link href="/blog/bergkristal-koning-kristallen" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Bergkristal Sieraden
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  De koning der kristallen in armband vorm
                </p>
              </div>
            </Link>

            <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Rozenkwarts Sieraden
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Populairste liefdes sieraden collectie
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
                S4H Sieraden Design Team
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Het design team van <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H (Stones for Health)</Link> combineert spirituele kennis met moderne esthetiek. Elk <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraad</Link> wordt ontworpen met oog voor detail en spirituele betekenis. Van <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra armbanden</Link> tot <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link> kettingen - elk stuk draagt de energie die jou ondersteunt in je dagelijks leven. Ontdek de volledige collectie bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link>.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
