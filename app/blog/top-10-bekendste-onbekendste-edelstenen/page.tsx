import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top 10 Bekendste & Onbekendste Edelstenen Met Hun Werking | Complete Gids',
  description: 'Ontdek de top 10 meest populaire edelstenen (amethist, rozenkwarts, bergkristal, citrien) én de top 10 zeldzame geheimen (moldaviet, larimar, shungiet) met hun unieke spirituele krachten en toepassingen.',
  keywords: [
    'bekendste edelstenen',
    'populaire edelstenen',
    'zeldzame edelstenen',
    'onbekende edelstenen',
    'edelstenen top 10',
    'moldaviet',
    'larimar',
    'shungiet',
    'amethist',
    'rozenkwarts',
    'bergkristal',
    'edelstenen werking',
    'kristallen lijst',
    'spirituele edelstenen'
  ],
  openGraph: {
    title: 'Top 10 Bekendste & Onbekendste Edelstenen Met Hun Werking',
    description: 'Complete gids met de 10 meest populaire én 10 zeldzame edelstenen. Ontdek hun werking en spirituele betekenis.',
    type: 'article',
    publishedTime: '2025-04-10',
  },
};

export default function Top10EdelsteneBlog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/images/banner.png"
          alt="Top 10 Bekendste & Onbekendste Edelstenen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
              Top 10 Edelstenen
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-[family-name:var(--font-eb-garamond)]">
              Bekendste & Onbekendste Edelstenen Met Hun Werking
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">Edelstenen</Link> worden al eeuwenlang gebruikt voor bescherming, heling en spirituele groei. Sommige stenen zijn wereldberoemd en worden vaak toegepast in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> en spiritualiteit, terwijl andere minder bekend zijn, maar minstens zo krachtig. In deze blog ontdek je de top 10 meest bekende edelstenen en de top 10 minder bekende edelstenen, met hun werking en spirituele betekenis.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 mb-12 border border-[#492c4a]/10">
          <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Inhoudsopgave
          </h2>
          <nav className="space-y-3">
            <a href="#bekende-edelstenen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Top 10 Bekendste Edelstenen
            </a>
            <a href="#onbekende-edelstenen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Top 10 Minder Bekende Edelstenen
            </a>
            <a href="#gebruik" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Hoe Gebruik je Deze Edelstenen?
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Veelgestelde Vragen
            </a>
          </nav>
        </div>

        {/* Section 1: Bekende Edelstenen */}
        <section id="bekende-edelstenen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Top 10 Bekendste Edelstenen
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Deze <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> zijn wereldwijd geliefd en worden veel gebruikt in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra werk</Link> en spirituele praktijken. Ze zijn gemakkelijk verkrijgbaar en perfect voor beginners.
            </p>

            <div className="grid gap-6 my-8">
              {/* 1. Amethist */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💜 Amethist
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Rust, bescherming, spirituele groei. Perfect voor <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">meditatie</Link> en het openen van het derde oog chakra.
                    </p>
                    <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#492c4a] font-semibold hover:underline">
                      → Lees meer over amethist
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2. Rozenkwarts */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💗 Rozenkwarts
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Liefde, compassie, emotionele heling. De ultieme steen voor <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link> werk en zelfliefde.
                    </p>
                    <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">
                      → Lees meer over rozenkwarts
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3. Bergkristal */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      ✨ Bergkristal
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Zuivering, energieversterking, balans. De koning der kristallen - versterkt alle andere stenen.
                    </p>
                    <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">
                      → Lees meer over bergkristal
                    </Link>
                  </div>
                </div>
              </div>

              {/* 4. Citrien */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      🌟 Citrien
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Succes, vreugde, overvloed. Perfect voor manifestatie en positieve energie. Zon-energie in kristalvorm.
                    </p>
                    <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">
                      → Lees meer over citrien
                    </Link>
                  </div>
                </div>
              </div>

              {/* 5. Tijgeroog */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      🐯 Tijgeroog
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Kracht, bescherming, focus. Helpt bij concentratie en het behouden van focus op doelen. Aardende beschermsteen.
                    </p>
                    <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                      → Shop tijgeroog
                    </Link>
                  </div>
                </div>
              </div>

              {/* 6. Lapis Lazuli */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💙 Lapis Lazuli
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Wijsheid, communicatie, intuïtie. Gebruikt door farao's en in oude beschavingen. Werkt op <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">keelchakra en derde oog</Link>.
                    </p>
                    <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                      → Shop lapis lazuli
                    </Link>
                  </div>
                </div>
              </div>

              {/* 7. Onyx */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    7
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      🖤 Onyx
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Bescherming, stabiliteit, kracht. Zwarte beschermsteen die negatieve energie absorbeert en transformeert. Aardend en stabiliserend.
                    </p>
                    <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                      → Shop onyx
                    </Link>
                  </div>
                </div>
              </div>

              {/* 8. Jade */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    8
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💚 Jade
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Harmonie, geluk, gezondheid. Zeer geliefd in Chinese cultuur. Brengt voorspoed en bescherming. Symbool van zuiverheid.
                    </p>
                    <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                      → Shop jade
                    </Link>
                  </div>
                </div>
              </div>

              {/* 9. Saffier */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    9
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💎 Saffier
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Spirituele waarheid, inzicht, bescherming. Edelsteen van wijsheid en koninklijke macht. Gebruikt in kroonjuwelen.
                    </p>
                    <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                      → Shop saffier
                    </Link>
                  </div>
                </div>
              </div>

              {/* 10. Robijn */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#492c4a] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    10
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      ❤️ Robijn
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Werking:</strong> Passie, vitaliteit, levensenergie. Activeert het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">wortelchakra</Link>. Brengt passie en levenslust.
                    </p>
                    <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">
                      → Shop robijn
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                ✨ <strong>De Gouden Driehoek voor Beginners:</strong>
              </p>
              <p className="text-gray-700">
                De drie meest populaire stenen voor beginners zijn <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#492c4a] font-semibold hover:underline">amethist</Link>, <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link> en <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>. Samen vormen ze <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> - een perfecte balans van spiritualiteit, liefde en helderheid.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Onbekende Edelstenen */}
        <section id="onbekende-edelstenen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Top 10 Minder Bekende Edelstenen
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Deze zeldzame en minder bekende <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> hebben krachtige spirituele energieën en worden vaak gebruikt door gevorderde practitioners en healers. Ze zijn moeilijker te vinden maar zeer waardevol voor spiritueel werk.
            </p>

            <div className="grid gap-6 my-8">
              {/* 1. Shungiet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      ⚫ Shungiet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Bescherming tegen straling (EMF), detox, heling. Bevat fullerenen - krachtige antioxidanten. Zuivert water.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Zeldzaam, alleen gevonden in Rusland. Zeer krachtig voor moderne EMF-bescherming van telefoons, wifi, computers.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Larimar */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      🌊 Larimar
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Rust, communicatie, vrouwelijke energie. "Steen van Atlantis" - kalmerend als de zee. Werkt op <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">keelchakra</Link>.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Alleen gevonden in Dominicaanse Republiek. Zeldzaam en zeer geliefd. Perfect voor zachte communicatie en innerlijke rust.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Ajoiet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💠 Ajoiet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Spirituele heling, trauma's loslaten. Krachtige healsteen voor diepe emotionele wonden. Verbindt met hogere dimensies.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Zeer zeldzaam. Helpt bij het helen van oude pijn en trauma's. Perfect voor <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">emotionele heling</Link>.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Pietersiet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      🌪️ Pietersiet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Intuïtie, bescherming, verandering. "Tempest Stone" - helpt door turbulente tijden. Activeert derde oog.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Perfect voor grote levensveranderingen. Beschermt tijdens transformatie. Versterkt intuïtie en helderziendheid.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Moldaviet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💚 Moldaviet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Transformatie, spirituele groei, hoge vibratie. Ontstaan door meteoorinslag. Extreem krachtig en zeldzaam.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Een van de krachtigste transformatiestenen. Kan "Moldaviet Flush" veroorzaken - intense energiegolf. Alleen voor gevorderden.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Nuummiet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      🌑 Nuummiet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Oeroude wijsheid, bescherming, schaduwwerk. 3 miljard jaar oud - oudste steen op aarde. Zeer grondend.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Perfect voor schaduwwerk en diep innerlijk werk. Helpt verborgen aspecten van jezelf te ontdekken. Krachtige bescherming.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. Charoiet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    7
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💜 Charoiet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Angst loslaten, spirituele transformatie. Helpt angsten en fobieën overwinnen. Sterke beschermende energie.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Alleen gevonden in Rusland. Combineert goed met <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#492c4a] font-semibold hover:underline">amethist</Link> voor spirituele rust.
                    </p>
                  </div>
                </div>
              </div>

              {/* 8. Kyaniet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    8
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💙 Kyaniet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Communicatie, balans, chakra-afstemming. Hoeft nooit gereinigd - reinigt zichzelf en andere stenen.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Brengt alle <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra's</Link> in balans. Perfect voor meditatie en spirituele ontwikkeling.
                    </p>
                  </div>
                </div>
              </div>

              {/* 9. Astrofylliet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    9
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      ⭐ Astrofylliet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Zelfinzicht, transformatie, innerlijke kracht. "Star Leaf" - sterpatroon in de steen. Helpt je levensdoel ontdekken.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Perfect voor zelfreflectie en het ontdekken van je waarheid. Verbindt met hogere zelf en spirituele gidsen.
                    </p>
                  </div>
                </div>
              </div>

              {/* 10. Tanzaniet */}
              <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    10
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      💎 Tanzaniet
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Werking:</strong> Intuïtie, spiritualiteit, verbinding. Hoge vibratie zoals <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#492c4a] font-semibold hover:underline">amethist</Link> maar zeldzamer.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Alleen gevonden in Tanzania. 1000x zeldzamer dan diamanten. Activeert <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">derde oog en kruin chakra</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
                💫 Waarom Zeldzame Edelstenen Kiezen?
              </h3>
              <ul className="space-y-2 ml-6 list-disc text-white/90">
                <li>Krachtigere en specifiekere energieën voor gevorderd spiritueel werk</li>
                <li>Unieke trillingen die niet in bekende stenen te vinden zijn</li>
                <li>Perfect voor specifieke healing doeleinden en transformatie</li>
                <li>Vaak zeer krachtig voor <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">chakra werk</Link> en meditatie</li>
                <li>Waardevolle aanvulling op collectie van bekende <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">edelstenen</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Gebruik */}
        <section id="gebruik" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Hoe Gebruik je Deze Edelstenen?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Of je nu kiest voor bekende klassiekers of zeldzame spirituele stenen, er zijn vele manieren om <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> in je dagelijks leven te integreren.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                  📿 Bekende Stenen
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Dagelijks gebruik:</strong> Perfect in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> zoals armbanden en kettingen</li>
                  <li><strong>Kristalsets:</strong> <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">De Gouden Driehoek</Link> voor complete balans</li>
                  <li><strong>Meditatie:</strong> Begin met <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#492c4a] font-semibold hover:underline">amethist</Link> of <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link></li>
                  <li><strong>In huis:</strong> Clusters en geodes voor ruimtezuivering</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                  🔮 Onbekendere Stenen
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Krachtiger werk:</strong> Voor spirituele verdieping en specifieke heling</li>
                  <li><strong>Zeldzamer:</strong> Perfect voor gevorderde practitioners</li>
                  <li><strong>Meditatie:</strong> Moldaviet, tanzaniet voor intense ervaringen</li>
                  <li><strong>Bescherming:</strong> Shungiet voor EMF, nuummiet voor schaduwwerk</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#fbe022]/20 to-[#fbe022]/5 rounded-2xl p-8 border border-[#fbe022]/30">
              <h3 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                💎 Praktische Toepassingen
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">🏠 Plaats in je Huis</h4>
                  <p className="text-gray-700">
                    Grote clusters in woonkamer, <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link> in slaapkamer, shungiet bij wifi-router
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">📿 Draag als Sieraad</h4>
                  <p className="text-gray-700">
                    <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">Armbanden, kettingen en ringen</Link> met je favoriete stenen
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">🧘 Meditatie & Rituelen</h4>
                  <p className="text-gray-700">
                    Gebruik in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra meditaties</Link> en volle maan rituelen
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">💼 Bij je Werk</h4>
                  <p className="text-gray-700">
                    Tijgeroog voor focus, <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link> voor succes, shungiet tegen EMF
                  </p>
                </div>
              </div>
            </div>
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
                Welke edelstenen zijn het beste voor beginners?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Begin met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>: <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#492c4a] font-semibold hover:underline">amethist</Link>, <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link> en <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>. Deze drie bieden complete balans en zijn zacht genoeg voor dagelijks gebruik.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zijn zeldzame edelstenen krachtiger dan bekende?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Niet per definitie "krachtiger", maar wel specifieker en intensiever. Zeldzame stenen zoals moldaviet of tanzaniet hebben unieke trillingen voor specifieke doeleinden. Bekende stenen zijn veelzijdiger en geschikt voor dagelijks gebruik.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik verschillende edelstenen combineren?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Combinaties zoals <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>, <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien & amethist</Link>, of <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">morganiet & rhodoniet</Link> werken uitstekend samen. Start met complementaire energieën.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waar kan ik deze edelstenen kopen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> vind je zowel bekende als zeldzame <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> en <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. Alle <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H producten</Link> worden zorgvuldig geselecteerd op authenticiteit en kwaliteit.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-2xl p-8 md:p-12 text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek Jouw Perfecte Edelsteen
          </h2>
          <p className="text-lg text-white/90 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Van bekende klassiekers tot zeldzame schatten - vind de steen die resoneert met jou
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
            <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  De Gouden Driehoek
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  De 3 meest populaire edelstenen voor beginners in één krachtige combinatie.
                </p>
              </div>
            </Link>

            <Link href="/blog/chakra-kristallen-complete-gids" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Chakra Kristallen Gids
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Ontdek welke edelstenen bij welke chakra's horen voor complete balans.
                </p>
              </div>
            </Link>

            <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  S4H Sieraden
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Draag je favoriete edelstenen als armband, ketting of ring.
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
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H</Link> bieden we zowel bekende klassiekers als zeldzame <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>. Van <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> tot exclusieve stenen zoals moldaviet en larimar. Ontdek onze collectie authentieke <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">edelsteen sieraden</Link> en losse kristallen voor elk spiritueel doel.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
