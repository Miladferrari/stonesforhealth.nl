import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art-of-Stones B.V.: Het Verhaal achter S4H Edelstenen & Sieraden | Stonesforhealth.nl',
  description: 'Ontdek Art-of-Stones B.V., het bedrijf achter het private label S4H (Stones for Health). Hoogwaardige edelstenen en sieraden in 11 Europese landen via Amazon, Bol.com en Rakuten.',
  keywords: [
    'Art-of-Stones B.V.',
    'S4H edelstenen',
    'Stones for Health',
    'private label edelstenen',
    'S4H sieraden',
    'edelstenen Nederland',
    'kristallen webshop',
    'spirituele sieraden',
    'chakra armbanden',
    'edelsteen ketting',
    'Amazon edelstenen',
    'Bol.com kristallen',
    'internationale edelstenen',
    'Art of Stones',
    'stonesforhealth.nl'
  ],
  openGraph: {
    title: 'Art-of-Stones B.V.: Het Verhaal achter S4H Edelstenen',
    description: 'Ontdek het krachtige bedrijf achter Stonesforhealth.nl. Art-of-Stones B.V. en S4H brengen hoogwaardige edelstenen naar Europa.',
    type: 'article',
    publishedTime: '2025-03-28',
  },
};

export default function ArtOfStonesBlog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/images/banner.png"
          alt="Art-of-Stones B.V. - S4H Edelstenen & Sieraden"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
              Art-of-Stones B.V.
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-[family-name:var(--font-eb-garamond)]">
              Het Verhaal achter het Merk S4H Edelstenen & Sieraden
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> vind je een breed assortiment aan <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>, spirituele producten en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. Wat veel klanten niet weten, is dat er een krachtig bedrijf achter dit succes staat: <strong>Art-of-Stones B.V.</strong> Dit bedrijf is de trotse eigenaar van het private label <strong>S4H (Stones for Health)</strong> ‒ een uniek merk dat staat voor kwaliteit, spiritualiteit en pure energie.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 mb-12 border border-[#492c4a]/10">
          <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Inhoudsopgave
          </h2>
          <nav className="space-y-3">
            <a href="#wie-is-art-of-stones" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Wie is Art-of-Stones B.V.?
            </a>
            <a href="#internationaal-actief" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Internationaal Actief ‒ Een Merk zonder Grenzen
            </a>
            <a href="#s4h-merk" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Het Merk S4H ‒ Stones for Health
            </a>
            <a href="#s4h-edelstenen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → S4H Edelstenen Collectie
            </a>
            <a href="#s4h-sieraden" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → S4H Sieraden ‒ Draagbare Energie
            </a>
            <a href="#missie-visie" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Missie & Visie
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Veelgestelde Vragen
            </a>
          </nav>
        </div>

        {/* Section 1: Wie is Art-of-Stones */}
        <section id="wie-is-art-of-stones" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Wie is Art-of-Stones B.V.?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              <strong>Art-of-Stones B.V.</strong> is opgericht in 2024 met een duidelijke missie: het aanbieden van hoogwaardige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>, <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kristallen</Link>, spirituele tools en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> die bijdragen aan welzijn, balans en bewustwording.
            </p>
            <p>
              Door directe samenwerking met leveranciers en strenge selectie garandeert het bedrijf dat elk product authentiek en energetisch waardevol is. Of je nu op zoek bent naar <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra kristallen</Link>, <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>, of spirituele <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> - bij Art-of-Stones vind je alleen het beste.
            </p>
            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900">
                🌟 <strong>Waarom Art-of-Stones?</strong>
              </p>
              <ul className="mt-3 space-y-2 ml-6 list-disc">
                <li>Directe samenwerking met betrouwbare leveranciers</li>
                <li>Strenge kwaliteitscontrole voor elk product</li>
                <li>Focus op authentieke, energetisch krachtige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link></li>
                <li>Betaalbare prijzen zonder tussenstappen</li>
                <li>Spirituele missie: welzijn en bewustwording bevorderen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Internationaal Actief */}
        <section id="internationaal-actief" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Internationaal Actief ‒ Een Merk zonder Grenzen
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Art-of-Stones B.V. en S4H zijn niet alleen actief via <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link>, maar ook via internationale platforms en markten. Dit maakt S4H <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> toegankelijk voor duizenden klanten in heel Europa.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                  🛒 Verkoopkanalen
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-[#fbe022]">✓</span>
                    <span>Amazon (EU & UK)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#fbe022]">✓</span>
                    <span>Bol.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#fbe022]">✓</span>
                    <span>Rakuten.fr</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#fbe022]">✓</span>
                    <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                  🌍 Actief in 11 Landen
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-700">🇳🇱 Nederland</span>
                  <span className="text-gray-700">🇧🇪 België</span>
                  <span className="text-gray-700">🇩🇪 Duitsland</span>
                  <span className="text-gray-700">🇫🇷 Frankrijk</span>
                  <span className="text-gray-700">🇪🇸 Spanje</span>
                  <span className="text-gray-700">🇸🇪 Zweden</span>
                  <span className="text-gray-700">🇩🇰 Denemarken</span>
                  <span className="text-gray-700">🇫🇮 Finland</span>
                  <span className="text-gray-700">🇦🇹 Oostenrijk</span>
                  <span className="text-gray-700">🇵🇹 Portugal</span>
                  <span className="text-gray-700">🇬🇧 United Kingdom</span>
                </div>
              </div>
            </div>

            <p>
              Deze internationale aanwezigheid zorgt ervoor dat meer mensen toegang hebben tot kwalitatieve <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra sets</Link> en spirituele <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> tegen eerlijke prijzen.
            </p>
          </div>
        </section>

        {/* Section 3: Het Merk S4H */}
        <section id="s4h-merk" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Het Merk S4H ‒ Stones for Health
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              <strong>S4H</strong> is het eigen label van Art-of-Stones en staat voor hoogwaardige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. De naam <em>Stones for Health</em> zegt het al: elk product is bedoeld om bij te dragen aan je fysieke, emotionele en spirituele gezondheid.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Wat maakt S4H Uniek?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🔮 Zorgvuldig Geselecteerd</h4>
                  <p className="text-white/90">
                    <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">Edelstenen</Link> worden handmatig geselecteerd bij betrouwbare bronnen. Elk stuk wordt gecontroleerd op authenticiteit en energetische kwaliteit.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💰 Eerlijke Prijzen</h4>
                  <p className="text-white/90">
                    Door directe samenwerking met leveranciers kunnen we <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">edelstenen</Link> en <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">sieraden</Link> aanbieden zonder onnodige tussenstappen.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🧘 Spirituele Focus</h4>
                  <p className="text-white/90">
                    Producten die balans, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">meditatie</Link> en healing ondersteunen. Van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link> tot <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">amethist</Link>.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💎 Stijlvolle Designs</h4>
                  <p className="text-white/90">
                    <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">Sieraden</Link> die energie geven én dagelijks gedragen kunnen worden. Combinatie van schoonheid en spirituele kracht.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: S4H Edelstenen */}
        <section id="s4h-edelstenen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            S4H Edelstenen Collectie
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Het S4H <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> assortiment omvat een breed aanbod voor zowel beginners als ervaren verzamelaars. Of je nu op zoek bent naar een enkele krachtige steen of een complete set voor een specifiek doel - bij S4H vind je wat je zoekt.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🪨 Losse Edelstenen
                </h3>
                <p>
                  Voor rituelen, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">meditatie</Link> en verzamelaars. Van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link> tot zeldzame varianten.
                </p>
                <Link href="/collections/all" className="inline-block mt-4 text-[#492c4a] font-semibold hover:underline">
                  → Bekijk losse edelstenen
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💝 Kristalsets
                </h3>
                <p>
                  Thema's zoals liefde (<Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">morganiet & rhodoniet</Link>), bescherming, intuïtie en <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>.
                </p>
                <Link href="/collections/all" className="inline-block mt-4 text-[#492c4a] font-semibold hover:underline">
                  → Ontdek kristalsets
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🔺 Piramides & Punten
                </h3>
                <p>
                  Edelsteen <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">piramides</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">punten</Link> voor energie-focus, manifestatie en ruimtezuivering.
                </p>
                <Link href="/collections/all" className="inline-block mt-4 text-[#492c4a] font-semibold hover:underline">
                  → Shop piramides & punten
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌈 Chakra-sets
                </h3>
                <p>
                  Complete <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra sets</Link> voor heling en balans. 7 stenen voor 7 energiecentra.
                </p>
                <Link href="/collections/all" className="inline-block mt-4 text-[#492c4a] font-semibold hover:underline">
                  → Bekijk chakra-sets
                </Link>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                🔮 <strong>Populaire S4H Edelstenen:</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-2 ml-6">
                <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] hover:underline">• Bergkristal - De Koning</Link>
                <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] hover:underline">• Amethist - Spirituele Rust</Link>
                <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] hover:underline">• Rozenkwarts - Liefde</Link>
                <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] hover:underline">• Citrien - Vreugde & Succes</Link>
                <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] hover:underline">• Morganiet - Zachte Liefde</Link>
                <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] hover:underline">• Rhodoniet - Emotionele Heling</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: S4H Sieraden */}
        <section id="s4h-sieraden" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            S4H Sieraden ‒ Draagbare Energie
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Naast losse <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> biedt S4H een collectie spirituele <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. Deze zijn ontworpen om niet alleen mooi, maar ook energetisch waardevol te zijn. Draag je favoriete edelsteen de hele dag bij je en ervaar de positieve invloed op je welzijn.
            </p>

            <div className="bg-gradient-to-br from-[#fbe022]/20 to-[#fbe022]/5 rounded-2xl p-8 my-8 border border-[#fbe022]/30">
              <h3 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                💎 S4H Sieraden Collectie
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    📿 Armbanden van Edelsteen
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Draagbare krachtbronnen voor dagelijks gebruik. <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">Chakra armbanden</Link>, beschermende <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">obsidiaan armbanden</Link>, of liefdes <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts armbanden</Link>.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Bekijk armbanden collectie
                  </Link>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    📿 Kettingen met Hangers
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Symbolen van bescherming en intuïtie. <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">Bergkristal</Link> hangers, <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">amethist</Link> kettingen, en meer.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Ontdek kettingen & hangers
                  </Link>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    💍 Ringen & Oorbellen
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Stijlvol en betekenisvol. Edelsteen <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">ringen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">oorbellen</Link> voor dagelijks of speciale gelegenheden.
                  </p>
                  <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                    → Shop ringen & oorbellen
                  </Link>
                </div>
              </div>
            </div>

            <p>
              Onze <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> zijn ontworpen om niet alleen mooi, maar ook energetisch waardevol te zijn. Elk stuk wordt gemaakt met aandacht voor detail en spirituele betekenis.
            </p>
          </div>
        </section>

        {/* Section 6: Missie & Visie */}
        <section id="missie-visie" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Missie & Visie
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              De visie van Art-of-Stones en S4H is helder: we willen <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en spirituele tools toegankelijk maken voor iedereen die op zoek is naar balans, welzijn en bewustzijn.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                🌟 Onze Kernwaarden
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Energie Toegankelijk Maken</h4>
                    <p className="text-white/90">
                      Iedereen verdient toegang tot kwalitatieve <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">edelstenen</Link> en <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">kristallen</Link> voor welzijn en spirituele groei.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🧘</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Spirituele Groei Ondersteunen</h4>
                    <p className="text-white/90">
                      Met kwalitatieve tools zoals <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">chakra sets</Link>, <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">meditatie kristallen</Link> en spirituele <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">sieraden</Link>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">⚖️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Balans en Welzijn Bevorderen</h4>
                    <p className="text-white/90">
                      Door echte, krachtige <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">edelstenen</Link> zoals <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link>, <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#fbe022] font-semibold hover:underline">citrien & amethist</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xl font-semibold text-[#492c4a]">
              <Link href="/collections/all" className="hover:underline">Edelstenen</Link> en <Link href="/collections/all" className="hover:underline">sieraden</Link> zijn meer dan decoratie ‒ ze zijn bronnen van kracht en bescherming.
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
                Wat is het verschil tussen Art-of-Stones B.V. en S4H?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Art-of-Stones B.V. is het bedrijf dat eigenaar is van het private label S4H (Stones for Health). S4H is het merk waaronder we <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> verkopen via <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en internationale platforms.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waar kan ik S4H producten kopen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                S4H <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> zijn verkrijgbaar via <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link>, Amazon (EU & UK), Bol.com en Rakuten.fr in 11 Europese landen.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn S4H edelstenen authentiek?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja, alle S4H <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> worden zorgvuldig geselecteerd bij betrouwbare leveranciers en gecontroleerd op authenticiteit. We werken alleen met natuurlijke, echte <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kristallen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Welke landen bedient S4H?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                S4H is actief in 11 Europese landen: Nederland, België, Duitsland, Frankrijk, Spanje, Zweden, Denemarken, Finland, Oostenrijk, Portugal en het Verenigd Koninkrijk (UK).
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat voor soort edelstenen biedt S4H aan?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                S4H biedt losse <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra sets</Link>, kristalsets, edelsteen <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">piramides</Link> & punten, en spirituele <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> zoals <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">armbanden</Link>, <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">kettingen</Link>, <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">ringen</Link> en <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">oorbellen</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waarom kiezen voor S4H edelstenen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                S4H staat voor kwaliteit, authenticiteit, eerlijke prijzen en spirituele focus. Elk product wordt zorgvuldig geselecteerd en gecontroleerd. We bieden <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> die niet alleen mooi zijn, maar ook energetisch krachtig.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-2xl p-8 md:p-12 text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de Kracht van S4H Edelstenen
          </h2>
          <p className="text-lg text-white/90 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Shop hoogwaardige edelstenen, kristallen en sieraden bij Stonesforhealth.nl
          </p>
          <Link
            href="/collections/all"
            className="inline-block bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-4 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)] text-lg"
          >
            Bekijk Alle Edelstenen →
          </Link>
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
                  Ontdek waarom bergkristal de koning van alle kristallen is en hoe je het gebruikt.
                </p>
              </div>
            </Link>

            <Link href="/blog/chakra-kristallen-complete-gids" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Chakra Kristallen Gids
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Complete gids over chakra's en bijbehorende kristallen voor balans en heling.
                </p>
              </div>
            </Link>

            <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  De Gouden Driehoek
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Ontdek de kracht van de meest populaire kristalcombinatie voor balans en liefde.
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
                Art-of-Stones B.V. Team
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Het team achter Art-of-Stones B.V. en S4H bestaat uit gepassioneerde experts in <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">kristallen</Link> en spiritualiteit. Onze missie is om kwalitatieve, authentieke producten toegankelijk te maken voor iedereen die op zoek is naar balans, welzijn en spirituele groei. Via <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en internationale platforms delen we onze kennis en passie voor de kracht van <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
