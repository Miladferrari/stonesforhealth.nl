import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amethist: Soorten, Werking, Vindplaatsen en Spirituele Tips | Complete Gids',
  description: 'Ontdek amethist - de paarse steen van rust, intuïtie en spiritualiteit. Leer alles over soorten (chevron, ametrine), werking op het derde oog chakra, vindplaatsen en spirituele toepassingen.',
  keywords: [
    'amethist',
    'amethist werking',
    'amethist steen',
    'amethist soorten',
    'chevron amethist',
    'ametrine',
    'amethist geode',
    'amethist cluster',
    'amethist armband',
    'amethist ketting',
    'amethist derde oog',
    'amethist meditatie',
    'amethist chakra',
    'amethist spiritueel',
    'amethyst'
  ],
  openGraph: {
    title: 'Amethist: Soorten, Werking, Vindplaatsen en Spirituele Tips',
    description: 'Complete gids over amethist - de paarse steen van rust, intuïtie en spiritualiteit. Ontdek alle soorten, werking en toepassingen.',
    type: 'article',
    publishedTime: '2025-04-08',
  },
};

export default function AmethistBlog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/images/banner.png"
          alt="Amethist - De Paarse Steen van Rust en Intuïtie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
              Amethist
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-[family-name:var(--font-eb-garamond)]">
              Soorten, Werking, Vindplaatsen & Spirituele Tips
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Amethist is een prachtige paarse variëteit van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwarts</Link> die wereldwijd bekendstaat als de steen van rust, intuïtie en spirituele groei. Door zijn kalmerende energie en diepe kleur is amethist al eeuwenlang een van de meest populaire <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> voor <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>, <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">meditatie</Link> en spiritueel werk.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 mb-12 border border-[#492c4a]/10">
          <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Inhoudsopgave
          </h2>
          <nav className="space-y-3">
            <a href="#wat-is-amethist" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Wat is Amethist?
            </a>
            <a href="#soorten" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Soorten Amethist
            </a>
            <a href="#werking" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Werking van Amethist
            </a>
            <a href="#vindplaatsen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Vindplaatsen van Amethist
            </a>
            <a href="#geschiedenis" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Geschiedenis & Symboliek
            </a>
            <a href="#spirituele-tips" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Spirituele Tips voor Gebruik
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Veelgestelde Vragen
            </a>
          </nav>
        </div>

        {/* Section 1: Wat is Amethist */}
        <section id="wat-is-amethist" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Wat is Amethist?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Amethist is een <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwartssoort</Link> die zijn kenmerkende paarse kleur dankt aan ijzer- en aluminiumsporen in combinatie met natuurlijke straling. De kleur varieert van licht lavendel tot diep paars, afhankelijk van de concentratie van deze mineralen en de geologische omstandigheden.
            </p>
            <p>
              Net als <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link> en <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>, is amethist een van de drie stenen in <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> - de meest populaire kristalcombinatie voor beginners.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                💜 Kenmerken van Amethist
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🔮 Mineraal Familie</h4>
                  <p className="text-white/90">
                    <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">Kwarts</Link> (SiO2 met ijzer en aluminium)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💎 Hardheid</h4>
                  <p className="text-white/90">
                    7 op schaal van Mohs
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💜 Kleur</h4>
                  <p className="text-white/90">
                    Licht lavendel tot diep paars/violet
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">👁️ Chakra</h4>
                  <p className="text-white/90">
                    <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">Derde Oog & Kruin Chakra</Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                ✨ <strong>Amethist in de Gouden Driehoek:</strong>
              </p>
              <p className="text-gray-700">
                Amethist is een van de drie kristallen in <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>, samen met <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link> en <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>. Deze combinatie biedt complete balans: spiritualiteit (amethist), liefde (rozenkwarts) en helderheid (bergkristal).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Soorten */}
        <section id="soorten" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Soorten Amethist
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Amethist komt in verschillende varianten voor, elk met zijn eigen unieke kenmerken en spirituele eigenschappen. Van diepe paarse clusters tot zeldzame combinaties met andere <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              {/* Donkerpaarse Amethist */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💜 Donkerpaarse Amethist
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Kenmerken:</strong> Intens van kleur, vaak uit Uruguay en Siberië. Deze variant heeft de meest krachtige spirituele energie en wordt zeer gewaardeerd door verzamelaars.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Beste voor:</strong> Diepe <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">meditatie</Link>, spirituele bescherming, intuïtie versterken
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop donkerpaarse amethist
                </Link>
              </div>

              {/* Lichtpaarse Amethist */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌸 Lichtpaarse/Lavendel Amethist
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Kenmerken:</strong> Zacht van kleur, kalmerend en mild. Perfect voor beginners en mensen die gevoelig zijn voor sterke energieën.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Beste voor:</strong> Rust, slaap, stress-reductie, dagelijks gebruik
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek lavendel amethist
                </Link>
              </div>

              {/* Chevron Amethist */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  ⚡ Chevron Amethist
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Kenmerken:</strong> Paars-witte banden in V-vorm (chevron patroon). Combinatie van amethist en witte <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwarts</Link>. Zeer krachtig voor spiritueel werk.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Beste voor:</strong> Meditatie, spirituele inzichten, derde oog opening, helderziendheid
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Bekijk chevron amethist
                </Link>
              </div>

              {/* Ametrine */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌅 Ametrine
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Kenmerken:</strong> Zeldzame combinatie van amethist (paars) en <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link> (geel/oranje) in één kristal. Vooral uit Bolivia.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Beste voor:</strong> Balans tussen spiritualiteit en manifestatie, zon & maan energie
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop ametrine
                </Link>
              </div>

              {/* Amethist Clusters */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💎 Ruwe Amethist Clusters
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Kenmerken:</strong> Natuurlijke kristalformaties met meerdere punten. Ideaal voor energiezuivering in huis of praktijk. Vaak in geode vorm.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Beste voor:</strong> Ruimtezuivering, energieversterking, decoratie, healing praktijk
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek amethist clusters
                </Link>
              </div>

              {/* Amethist Geode */}
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌌 Amethist Geode
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Kenmerken:</strong> Holle rotsen gevuld met amethist kristallen. Vaak grote specimens uit Brazilië en Uruguay. Spectaculair en krachtig.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Beste voor:</strong> Statement piece, krachtige ruimtezuivering, meditatie altaar
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Bekijk amethist geodes
                </Link>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                🔮 <strong>Welke Amethist Soort Past bij Jou?</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Beginners:</strong> Start met lichtpaarse amethist of <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link></li>
                <li><strong>Meditatie:</strong> Kies chevron amethist voor diepe spirituele ervaringen</li>
                <li><strong>Manifestatie:</strong> Gebruik ametrine voor balans tussen spiritualiteit en actie</li>
                <li><strong>Bescherming:</strong> Donkerpaarse Uruguayaanse amethist heeft de sterkste energie</li>
                <li><strong>Ruimte:</strong> Grote clusters of geodes voor energiezuivering van je huis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Werking */}
        <section id="werking" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Werking van Amethist
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Amethist staat bekend als een spirituele beschermsteen en werkt op meerdere niveaus - fysiek, emotioneel, mentaal en spiritueel. De krachtige paarse energie werkt vooral op het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">derde oog en kruin chakra</Link>.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Krachten van Amethist
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-3xl">🧘</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Rust & Ontspanning</h4>
                    <p className="text-white/90">
                      Helpt bij stress, angst en spanning. Brengt innerlijke kalmte en vrede. Werkt rustgevend zoals <Link href="/blog/agaat-betekenis-soorten-kleuren-werking" className="text-[#fbe022] font-semibold hover:underline">blauwe agaat</Link> maar op een hoger spiritueel niveau.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">😴</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Slaap & Dromen</h4>
                    <p className="text-white/90">
                      Bevordert een goede nachtrust en vermindert nachtmerries. Ondersteunt heldere dromen en astrale reizen. Perfect onder je kussen net als <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#fbe022] font-semibold hover:underline">rozenkwarts</Link>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">👁️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Intuïtie & Spiritualiteit</h4>
                    <p className="text-white/90">
                      Opent het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">derde oog chakra</Link> en versterkt helderziendheid. Bevordert spirituele groei en verbinding met hogere bewustzijnsniveaus.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">⚖️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Balans & Loslaten</h4>
                    <p className="text-white/90">
                      Helpt verslavingen en negatieve patronen los te laten. Ondersteunt bij het doorbreken van schadelijke gewoontes en gedachtepatronen. Brengt emotionele balans.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🛡️</span>
                  <div>
                    <h4 className="font-bold text-[#fbe022] mb-1">Bescherming</h4>
                    <p className="text-white/90">
                      Creëert een energetisch schild tegen negatieve invloeden. Beschermt je aura en energieveld. Zuivert negatieve energie uit je omgeving.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💫 Amethist Combinaties
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>+ <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">Bergkristal</Link>:</strong> Versterking spirituele energie</li>
                  <li><strong>+ <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">Rozenkwarts</Link>:</strong> <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">De Gouden Driehoek</Link> - complete balans</li>
                  <li><strong>+ <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">Citrien</Link>:</strong> Spiritualiteit meets manifestatie</li>
                  <li><strong>+ Labradoriet:</strong> Psychische bescherming</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🌟 Chakra Werking
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Derde Oog (Ajna):</strong> Intuïtie, helderziendheid, wijsheid</li>
                  <li><strong>Kruin (Sahasrara):</strong> Spirituele verbinding, bewustzijn</li>
                  <li>Gebruik in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">chakra meditaties</Link></li>
                  <li>Plaats op voorhoofd of bovenkant hoofd</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Vindplaatsen */}
        <section id="vindplaatsen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Vindplaatsen van Amethist
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Amethist wordt wereldwijd gevonden, maar de belangrijkste vindplaatsen leveren elk hun eigen unieke varianten met specifieke kenmerken, kleurintensiteit en kwaliteit.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇧🇷 Brazilië
                </h3>
                <p className="text-gray-700">
                  <strong>Grootste bron ter wereld.</strong> Vooral bekend om grote geodes en clusters. Braziliaanse amethist varieert van licht tot medium paars. Betaalbaar en breed verkrijgbaar.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇺🇾 Uruguay
                </h3>
                <p className="text-gray-700">
                  <strong>Beste kwaliteit.</strong> Bekend om intens donkerpaarse amethist met de meest krachtige spirituele energie. Uruguayaanse amethist is zeer gewild bij verzamelaars en healers.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇿🇲 Zambia
                </h3>
                <p className="text-gray-700">
                  <strong>Diepe paarse kleur.</strong> Zambiaanse amethist heeft een rijke, diepe kleur met roodachtige tinten. Hoogwaardige kwaliteit en krachtige energie.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇲🇬 Madagaskar
                </h3>
                <p className="text-gray-700">
                  <strong>Lichtpaarse varianten.</strong> Vooral bekend om zachte lavendelamethist. Perfect voor beginners en gevoelige mensen. Ook chevron amethist komt voor.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇷🇺 Rusland (Siberië)
                </h3>
                <p className="text-gray-700">
                  <strong>Historisch & zeldzaam.</strong> Siberische amethist is zeldzaam en heeft een diepe paarse kleur met rode flitsen. Zeer geliefd en vaak duur.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇮🇳 India
                </h3>
                <p className="text-gray-700">
                  <strong>Diverse kwaliteiten.</strong> India produceert amethist in verschillende kwaliteiten. Vaak gebruikt in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> en spirituele objecten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Geschiedenis */}
        <section id="geschiedenis" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Geschiedenis & Symboliek
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Amethist heeft een rijke geschiedenis die teruggaat tot de oudheid. Deze paarse <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen</Link> werd door vele culturen gewaardeerd om zijn schoonheid en vermeende magische en spirituele krachten.
            </p>

            <div className="bg-gradient-to-br from-[#fbe022]/20 to-[#fbe022]/5 rounded-2xl p-8 border border-[#fbe022]/30 my-8">
              <h3 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                📜 Historische Tijdlijn
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🏛️ Oud-Griekenland
                  </h4>
                  <p className="text-gray-700">
                    <strong>Symbool voor bescherming tegen overmatig drinken.</strong> De naam "amethyst" komt van het Griekse woord "amethystos" wat "niet dronken" betekent. Grieken maakten drinkbekers van amethist omdat ze geloofden dat dit beschermde tegen dronkenschap en overmatig gedrag.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    ⛪ Middeleeuwen
                  </h4>
                  <p className="text-gray-700">
                    <strong>Symbool van zuiverheid en godsdienst.</strong> Gedragen door bisschoppen en kardinalen als symbool van zuiverheid, toewijding en spirituele wijsheid. Amethist werd gezien als de meest heilige steen na de diamant.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    👑 Koninklijke Families
                  </h4>
                  <p className="text-gray-700">
                    <strong>Edelsteen van royalty.</strong> Werd tot de 18e eeuw beschouwd als even waardevol als diamanten. Gebruikt in kroonjuwelen en koninklijke <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. Symboliseerde macht en wijsheid.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🌟 Hedendaags
                  </h4>
                  <p className="text-gray-700">
                    <strong>Meest geliefde spirituele steen.</strong> Zeer populair in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">kristaltherapie</Link> en healing praktijken. Deel van <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>. Gebruikt wereldwijd voor meditatie, rust en spirituele groei.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                💜 <strong>Mythologie & Legenden:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Griekse mythe:</strong> Bacchus (god van de wijn) wilde een meisje genaamd Amethyst straffen. Diana veranderde haar in een witte steen. Bacchus goot wijn over de steen uit berouw, waardoor deze paars werd</li>
                <li><strong>Egypte:</strong> Amethist werd gebruikt in amuletten en beschermende sieraden voor farao's</li>
                <li><strong>Leonardo da Vinci:</strong> Schreef dat amethist het kwaad kon verdrijven en de intelligentie verhoogde</li>
                <li><strong>Tibetaanse boeddhisme:</strong> Amethist is heilig voor Boeddha en wordt gebruikt in gebedskralen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Spirituele Tips */}
        <section id="spirituele-tips" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Spirituele Tips voor Gebruik
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Amethist is een veelzijdige <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen</Link> die op verschillende manieren gebruikt kan worden voor spirituele groei, bescherming en welzijn. Hier zijn praktische tips om het meeste uit je amethist te halen.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                🔮 Praktische Toepassingen
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🛏️ In de Slaapkamer
                  </h4>
                  <p className="text-white/90 mb-2">
                    Leg een amethistcluster in je slaapkamer voor rust en bescherming. Plaats het op je nachtkastje of onder je kussen voor betere slaap en aangename dromen. Vermindert nachtmerries en bevordert spirituele dromen.
                  </p>
                  <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                    → Shop amethist clusters
                  </Link>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    📿 Draag als Sieraad
                  </h4>
                  <p className="text-white/90 mb-2">
                    Draag een <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#fbe022] font-semibold hover:underline">amethist armband</Link> of <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">hanger</Link> voor bescherming en innerlijke rust gedurende de dag. Amethist <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">sieraden</Link> houden de kalmerende energie altijd bij je.
                  </p>
                  <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                    → Ontdek amethist sieraden
                  </Link>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🧘 Meditatie met Chevron Amethist
                  </h4>
                  <p className="text-white/90 mb-2">
                    Gebruik chevron amethist bij <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">meditatie</Link> voor spirituele inzichten en derde oog opening. Plaats het op je voorhoofd tijdens liggende meditaties of houd het vast tijdens zittende meditatie.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    💎 De Gouden Driehoek
                  </h4>
                  <p className="text-white/90 mb-2">
                    Combineer met <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#fbe022] font-semibold hover:underline">rozenkwarts</Link> en <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">bergkristal</Link> voor <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">de Gouden Driehoek</Link>. Perfect voor beginners - biedt complete balans van spiritualiteit, liefde en helderheid.
                  </p>
                  <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">
                    → Leer meer over de Gouden Driehoek
                  </Link>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🏠 Energiezuivering Thuis
                  </h4>
                  <p className="text-white/90 mb-2">
                    Plaats een amethist in je woonkamer of praktijkruimte voor positieve energie. Grote clusters of geodes zuiveren effectief grotere ruimtes. Perfect in de hoeken van je huis voor complete bescherming.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-3">
                💫 <strong>Onderhoud & Verzorging van Amethist:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Reinigen:</strong> Onder stromend water, met witte salie of palo santo rook</li>
                <li><strong>Opladen:</strong> In maanlicht (NIET in direct zonlicht - kan kleur doen vervagen!)</li>
                <li><strong>Versterken:</strong> Plaats amethist op een <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal cluster</Link> voor herlading</li>
                <li><strong>Programmeren:</strong> Houd vast en spreek je intenties uit voordat je het gebruikt</li>
                <li><strong>Bewaren:</strong> Uit direct zonlicht, bij voorkeur in een donkere, droge plaats</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
            Veelgestelde Vragen over Amethist
          </h2>
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waarom is mijn amethist verkleurd of lichter geworden?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Amethist kan verkleuren bij langdurige blootstelling aan direct zonlicht. De paarse kleur kan lichter worden of zelfs veranderen in geel (<Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link>). Laad amethist daarom altijd op in maanlicht of met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>, niet in zonlicht.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat is het verschil tussen donkere en lichte amethist?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Donkerpaarse amethist (vooral uit Uruguay) heeft de meest krachtige spirituele energie en wordt hoger gewaardeerd. Lichtpaarse/lavendel amethist heeft een zachtere, kalmerendere werking en is perfect voor beginners of gevoelige mensen. Beide zijn effectief, kies wat resoneert met jou.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik amethist combineren met andere kristallen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Amethist combineert uitstekend met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts en bergkristal (de Gouden Driehoek)</Link>, <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien voor balans</Link>, labradoriet voor psychische bescherming, of <Link href="/blog/agaat-betekenis-soorten-kleuren-werking" className="text-[#492c4a] font-semibold hover:underline">zwarte agaat</Link> voor aarding.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe gebruik ik amethist voor meditatie?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Plaats amethist op je voorhoofd (derde oog) of bovenkant hoofd (kruin chakra) tijdens liggende <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">meditatie</Link>. Of houd het vast in je linkerhand tijdens zittende meditatie. Chevron amethist is het krachtigst voor diepe spirituele ervaringen.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Wat is het verschil tussen amethist en ametrine?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ametrine is een zeldzame combinatie van amethist (paars) en <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link> (geel) in één kristal. Het combineert spirituele rust (amethist) met manifestatie energie (citrien). Ametrine komt vooral uit Bolivia en is waardevoller dan gewone amethist.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waar kan ik authentieke amethist kopen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> vind je authentieke amethist in alle vormen: clusters, geodes, <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>, chevron amethist en ametrine. Alle <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H producten</Link> worden zorgvuldig geselecteerd op authenticiteit en kwaliteit.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-2xl p-8 md:p-12 text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de Kracht van Amethist
          </h2>
          <p className="text-lg text-white/90 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Shop authentieke amethist clusters, sieraden en geodes voor rust, intuïtie en spirituele groei
          </p>
          <Link
            href="/collections/all"
            className="inline-block bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-4 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)] text-lg"
          >
            Bekijk Amethist Collectie →
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
                  Amethist met rozenkwarts en bergkristal - de perfecte kristalcombinatie.
                </p>
              </div>
            </Link>

            <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Citrien & Amethist
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Zon & Maan energie - ontdek ametrine en de balans van deze duo.
                </p>
              </div>
            </Link>

            <Link href="/blog/chakra-kristallen-complete-gids" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Chakra Kristallen Gids
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Gebruik amethist voor derde oog en kruin chakra balans en opening.
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
                Stonesforhealth.nl Spirituele Kristallen Experts
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H</Link> zijn we gespecialiseerd in spirituele <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> zoals amethist, <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link> en <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts</Link>. Ontdek onze collectie authentieke amethist clusters, geodes, chevron amethist en <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>. Perfect voor <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">meditatie</Link>, rust en spirituele groei.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
