import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rozenkwarts: De Steen van de Liefde en het Hartchakra | Complete Gids',
  description: 'Ontdek rozenkwarts - de ultieme edelsteen voor liefde, zelfliefde en emotioneel welzijn. Leer alles over de werking op het hartchakra, geschiedenis, toepassingen en spirituele kracht.',
  keywords: [
    'rozenkwarts',
    'rozenkwarts betekenis',
    'rozenkwarts werking',
    'rozenkwarts hartchakra',
    'rozenkwarts liefde',
    'rozenkwarts steen',
    'rozenkwarts armband',
    'rozenkwarts ketting',
    'rozenkwarts sieraden',
    'rozenkwarts zelfliefde',
    'rozenkwarts meditatie',
    'rozenkwarts chakra',
    'rose quartz',
    'rozenkwarts edelsteen',
    'rozenkwarts healing'
  ],
  openGraph: {
    title: 'Rozenkwarts: De Steen van de Liefde en het Hartchakra',
    description: 'Complete gids over rozenkwarts - de ultieme steen voor liefde, zelfliefde en emotioneel welzijn. Ontdek de werking, geschiedenis en toepassingen.',
    type: 'article',
    publishedTime: '2025-04-05',
  },
};

export default function RozenkwartsBlog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/images/banner.png"
          alt="Rozenkwarts - De Steen van de Liefde"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
              Rozenkwarts
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-[family-name:var(--font-eb-garamond)]">
              De Steen van de Liefde en het Hartchakra
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Rozenkwarts staat wereldwijd bekend als de steen van de liefde. Met zijn zachte roze kleur en warme energie is het een van de meest geliefde <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> in de edelsteentherapie, <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> en spirituele praktijken. Rozenkwarts straalt zachtheid, harmonie en onvoorwaardelijke liefde uit.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-2xl p-8 mb-12 border border-[#492c4a]/10">
          <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Inhoudsopgave
          </h2>
          <nav className="space-y-3">
            <a href="#wat-is-rozenkwarts" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Wat is Rozenkwarts?
            </a>
            <a href="#werking" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Werking van Rozenkwarts
            </a>
            <a href="#hartchakra" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Rozenkwarts en het Hartchakra
            </a>
            <a href="#vindplaatsen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Vindplaatsen van Rozenkwarts
            </a>
            <a href="#geschiedenis" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Geschiedenis en Symboliek
            </a>
            <a href="#toepassingen" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Toepassingen van Rozenkwarts
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)] text-lg">
              → Veelgestelde Vragen
            </a>
          </nav>
        </div>

        {/* Section 1: Wat is Rozenkwarts */}
        <section id="wat-is-rozenkwarts" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Wat is Rozenkwarts?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Rozenkwarts is een variëteit van <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">kwarts</Link> en dankt zijn zachte roze kleur aan sporen van titanium, ijzer en mangaan. De steen is vaak melkachtig doorzichtig tot opaak en wordt wereldwijd gevonden.
            </p>
            <p>
              Net als <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">amethist en bergkristal</Link>, behoort rozenkwarts tot de kwartsgroep, maar heeft een unieke zachte energie die het perfect maakt voor hartchakra werk en emotionele healing.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                💗 Kenmerken van Rozenkwarts
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🔮 Mineraal Familie</h4>
                  <p className="text-white/90">
                    <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">Kwarts</Link> (SiO2 met titanium/ijzer sporen)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💎 Hardheid</h4>
                  <p className="text-white/90">
                    7 op schaal van Mohs
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">🌸 Kleur</h4>
                  <p className="text-white/90">
                    Licht tot diep roze, melkachtig tot doorzichtig
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#fbe022] mb-2">💗 Chakra</h4>
                  <p className="text-white/90">
                    <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">Hartchakra</Link> (Anahata)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                ✨ <strong>Rozenkwarts in de Gouden Driehoek:</strong>
              </p>
              <p className="text-gray-700">
                Rozenkwarts is een van de drie kristallen in <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link>, samen met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">amethist en bergkristal</Link>. Deze combinatie is perfect voor beginners en biedt complete balans: liefde (rozenkwarts), spiritualiteit (amethist) en helderheid (bergkristal).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Werking */}
        <section id="werking" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Werking van Rozenkwarts
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Rozenkwarts wordt gezien als de ultieme steen voor liefde en emotioneel welzijn. De zachte energie werkt diep op het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link> en ondersteunt je in alle aspecten van liefde - voor jezelf, anderen en het leven.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💞 Liefde & Relaties
                </h3>
                <p className="text-gray-700 mb-3">
                  Opent het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link> en trekt liefdevolle energie aan. Helpt bij het aantrekken van nieuwe liefde en versterkt bestaande relaties. Perfect te combineren met <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">morganiet voor zachte liefde</Link>.
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop rozenkwarts voor liefde
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🧘 Innerlijke Rust
                </h3>
                <p className="text-gray-700 mb-3">
                  Vermindert stress en spanning. Brengt een gevoel van kalmte en vrede. Werkt rustgevend zoals blauwe <Link href="/blog/agaat-betekenis-soorten-kleuren-werking" className="text-[#492c4a] font-semibold hover:underline">agaat</Link> en <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">amethist</Link>.
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek rozenkwarts voor rust
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💖 Zelfliefde
                </h3>
                <p className="text-gray-700 mb-3">
                  Helpt bij het accepteren en waarderen van jezelf. Bevordert zelfcompassie en vergeving. Een essentiële steen voor iedereen die werkt aan zelfliefde en zelfacceptatie.
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Bekijk rozenkwarts voor zelfliefde
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  ☮️ Harmonie
                </h3>
                <p className="text-gray-700 mb-3">
                  Bevordert vergeving en begrip. Helpt bij het oplossen van conflicten en het herstellen van harmonie in relaties. Brengt balans in emoties.
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Shop rozenkwarts voor harmonie
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  😴 Slaap & Kinderen
                </h3>
                <p className="text-gray-700 mb-3">
                  Werkt kalmerend en rustgevend. Vaak gebruikt onder het kussen voor betere slaap en aangename dromen. Veilig voor kinderen en baby's.
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Ontdek rozenkwarts voor slaap
                </Link>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🩹 Emotionele Healing
                </h3>
                <p className="text-gray-700 mb-3">
                  Helpt emotionele pijn verzachten en oude wonden helen. Ondersteunt bij het verwerken van trauma en verdriet. Vergelijkbaar met <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">rhodoniet voor emotionele heling</Link>.
                </p>
                <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline text-sm">
                  → Bekijk rozenkwarts voor healing
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Rozenkwarts Combinaties
              </h3>
              <div className="space-y-3">
                <p className="text-white/90">
                  <strong className="text-[#fbe022]">Rozenkwarts + <Link href="/blog/bergkristal-koning-kristallen" className="text-[#fbe022] font-semibold hover:underline">Bergkristal</Link>:</strong> Versterking van liefdes-energie en helderheid in relaties
                </p>
                <p className="text-white/90">
                  <strong className="text-[#fbe022]">Rozenkwarts + <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">Amethist</Link>:</strong> Spirituele liefde en compassie
                </p>
                <p className="text-white/90">
                  <strong className="text-[#fbe022]">Rozenkwarts + <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#fbe022] font-semibold hover:underline">Morganiet</Link>:</strong> Ultieme hartchakra opening en zachte liefde
                </p>
                <p className="text-white/90">
                  <strong className="text-[#fbe022]">Rozenkwarts + <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#fbe022] font-semibold hover:underline">Rhodoniet</Link>:</strong> Emotionele heling en zelfliefde
                </p>
                <p className="text-white/90">
                  <strong className="text-[#fbe022]"><Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">De Gouden Driehoek</Link>:</strong> Complete balans van liefde, spiritualiteit en helderheid
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Hartchakra */}
        <section id="hartchakra" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Rozenkwarts en het Hartchakra
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link> (Anahata) is het centrum van liefde, compassie en verbinding. Dit vierde chakra bevindt zich in het midden van de borst en is de brug tussen de lagere (fysieke) en hogere (spirituele) chakra's.
            </p>
            <p>
              Rozenkwarts is de meest geliefde steen voor het hartchakra omdat het de zachte, onvoorwaardelijke energie draagt die dit chakra nodig heeft om te openen en te helen.
            </p>

            <div className="bg-gradient-to-br from-[#fbe022]/20 to-[#fbe022]/5 rounded-2xl p-8 border border-[#fbe022]/30 my-8">
              <h3 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                💚 Hartchakra Kenmerken
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">📍 Locatie</h4>
                  <p className="text-gray-700">
                    Midden van de borst, tussen de tepels
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">🌈 Kleur</h4>
                  <p className="text-gray-700">
                    Groen (primair) en Roze (secundair)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">🎵 Element</h4>
                  <p className="text-gray-700">
                    Lucht
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#492c4a] mb-2">✨ Thema</h4>
                  <p className="text-gray-700">
                    Liefde, compassie, verbinding, vergeving
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-3">
                💗 <strong>Hoe Rozenkwarts het Hartchakra Opent:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Meer liefde voor jezelf ervaren:</strong> Rozenkwarts helpt je jezelf te accepteren en lief te hebben zoals je bent</li>
                <li><strong>Open stellen voor nieuwe relaties:</strong> Verwijdert blokkades die je tegenhouden in liefde en verbinding</li>
                <li><strong>Oude emotionele blokkades loslaten:</strong> Helpt bij het helen van oude wonden en hartenpijn</li>
                <li><strong>Compassie ontwikkelen:</strong> Voor jezelf en anderen, bevordert begrip en empathie</li>
                <li><strong>Vergeving bevorderen:</strong> Helpt om los te laten en te vergeven, zowel jezelf als anderen</li>
              </ul>
            </div>

            <p className="text-lg font-semibold text-[#492c4a] mt-6">
              Gebruik rozenkwarts in <Link href="/blog/chakra-kristallen-complete-gids" className="hover:underline">chakra meditaties</Link> of draag een <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="hover:underline">rozenkwarts ketting</Link> dichtbij je hart voor dagelijkse ondersteuning.
            </p>
          </div>
        </section>

        {/* Section 4: Vindplaatsen */}
        <section id="vindplaatsen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Vindplaatsen van Rozenkwarts
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Rozenkwarts wordt wereldwijd gevonden, maar de belangrijkste vindplaatsen leveren elk hun eigen unieke varianten met specifieke kenmerken.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇧🇷 Brazilië
                </h3>
                <p className="text-gray-700">
                  Grootste producent van rozenkwarts. Bekend om grote en heldere kristallen. Braziliaans rozenkwarts is vaak licht tot medium roze en heeft een mooie transparantie.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇲🇬 Madagaskar
                </h3>
                <p className="text-gray-700">
                  Vaak diep roze tot bijna paars. Madagaskars rozenkwarts staat bekend om zijn intense kleur en krachtige energie. Zeer geliefd bij verzamelaars.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇮🇳 India
                </h3>
                <p className="text-gray-700">
                  Belangrijke bron van rozenkwarts. Indiase rozenkwarts is vaak gebruikt in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> en spirituele toepassingen.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇲🇿 Mozambique
                </h3>
                <p className="text-gray-700">
                  Opkomende bron van hoogwaardig rozenkwarts. Mooie kleur en goede kwaliteit. Mozambique levert steeds meer rozenkwarts aan de wereldmarkt.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇺🇸 Verenigde Staten
                </h3>
                <p className="text-gray-700">
                  South Dakota is vooral bekend. Amerikaanse rozenkwarts wordt gewaardeerd om zijn unieke kwaliteit en wordt vaak gebruikt in hoogwaardige <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>.
                </p>
              </div>

              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🇿🇦 Zuid-Afrika
                </h3>
                <p className="text-gray-700">
                  Bron van mooie rozenkwarts varianten. Zuid-Afrikaans rozenkwarts heeft vaak een melkachtige, zachte uitstraling die perfect is voor healing werk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Geschiedenis */}
        <section id="geschiedenis" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Geschiedenis en Symboliek
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Rozenkwarts heeft een rijke geschiedenis die teruggaat tot de vroegste beschavingen. Deze <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelsteen</Link> werd door vele culturen gewaardeerd als symbool van liefde en schoonheid.
            </p>

            <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                📜 Historische Tijdlijn
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🏺 Oude Egypte (3000 v.Chr.)
                  </h4>
                  <p className="text-white/90">
                    Egyptenaren gebruikten rozenkwarts als liefdesamulet en voor schoonheid. Ze maakten maskers van rozenkwarts om de huid jong en stralend te houden. Rozenkwarts werd ook gebruikt in <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#fbe022] font-semibold hover:underline">sieraden</Link> voor farao's en koninginnen.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🏛️ Grieken & Romeinen
                  </h4>
                  <p className="text-white/90">
                    Symbool van verzoening en liefde. De Grieken en Romeinen geloofden dat rozenkwarts door Aphrodite/Venus (godin van de liefde) aan de mensheid werd geschonken. Ze gebruikten het voor liefdestalismannen en rituelen.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    ⚗️ Middeleeuwen
                  </h4>
                  <p className="text-white/90">
                    Healers gebruikten rozenkwarts voor emotioneel herstel en harmonie. Het werd ook gebruikt in liefdesdranken en spreuken. Alchemisten waardeerden rozenkwarts om zijn zachte, transformerende energie.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#fbe022] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    🌟 Moderne Tijd
                  </h4>
                  <p className="text-white/90">
                    Rozenkwarts is een van de meest populaire stenen in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">kristaltherapie</Link> en healing praktijken. Onderdeel van <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">de Gouden Driehoek</Link> en essentieel in hartchakra werk.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fbe022]/10 border-l-4 border-[#fbe022] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-2">
                💖 <strong>Mythologie & Legenden:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Griekse mythe:</strong> Aphrodite sneed zich aan een doornstruik terwijl ze Adonis redde. Haar bloed kleurde wit kwarts roze, waardoor rozenkwarts ontstond</li>
                <li><strong>Romeinse mythe:</strong> Cupido bracht rozenkwarts naar de aarde om liefde te brengen aan de mensheid</li>
                <li><strong>Egyptische legende:</strong> Isis gebruikte rozenkwarts om eeuwig jong en mooi te blijven</li>
                <li><strong>Symboliek:</strong> Wereldwijd symbool van onvoorwaardelijke liefde en eeuwige schoonheid</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Toepassingen */}
        <section id="toepassingen" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Toepassingen van Rozenkwarts
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            <p>
              Rozenkwarts kan op vele manieren gebruikt worden voor spirituele en dagelijkse doeleinden. Van <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> tot meditatie en interieur - de mogelijkheden zijn eindeloos.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  📿 Rozenkwarts Sieraden
                </h3>
                <p className="text-white/90 mb-4">
                  Draag <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#fbe022] font-semibold hover:underline">rozenkwarts armbanden</Link>, <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">kettingen</Link> of <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">ringen</Link> om de energie de hele dag bij je te dragen. Een rozenkwarts ketting draag je dichtbij je hart voor maximale werking.
                </p>
                <Link href="/collections/all" className="text-[#fbe022] font-semibold hover:underline">
                  → Shop rozenkwarts sieraden
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🏠 In je Huis
                </h3>
                <p className="text-white/90 mb-4">
                  Plaats rozenkwarts in je slaapkamer, woonkamer of werkruimte voor een liefdevolle en harmonieuze sfeer. Een groot rozenkwarts hart of geode creëert een krachtig energieveld van liefde.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  😴 Onder het Kussen
                </h3>
                <p className="text-white/90 mb-4">
                  Ondersteunt rust en goede slaap. Helpt bij aangename dromen en voorkomt nachtmerries. Perfect voor kinderen en volwassenen die moeite hebben met slapen.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🧘 Meditatie
                </h3>
                <p className="text-white/90 mb-4">
                  Opent het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">hartchakra</Link> tijdens meditatie. Houd rozenkwarts bij je hart of plaats het op je borst terwijl je ligt. Combineer met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#fbe022] font-semibold hover:underline">de Gouden Driehoek</Link>.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  💆 Healing & Massage
                </h3>
                <p className="text-white/90 mb-4">
                  In kristalleggingen en <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#fbe022] font-semibold hover:underline">chakra-healings</Link>. Rozenkwarts massage rollers en gua sha stenen worden gebruikt voor gezichtsbehandelingen.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
                  🛁 Badrituelen
                </h3>
                <p className="text-white/90 mb-4">
                  Plaats rozenkwarts in je bad voor een liefdevolle, ontspannende ervaring. Perfect te combineren met rozenolie of lavendel voor ultieme zelfliefde rituelen.
                </p>
              </div>
            </div>

            <div className="bg-[#492c4a]/5 border-l-4 border-[#492c4a] p-6 rounded-r-lg">
              <p className="font-semibold text-gray-900 mb-3">
                💫 <strong>Tips voor het Gebruik van Rozenkwarts:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Reinig rozenkwarts regelmatig onder lauwwarm stromend water</li>
                <li>Laad op in maanlicht (vol veilig) of met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link></li>
                <li>Vermijd direct zonlicht voor lange tijd - kan kleur doen vervagen</li>
                <li>Combineer met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> voor complete balans</li>
                <li>Gebruik in <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">hartchakra meditaties</Link></li>
                <li>Draag <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts sieraden</Link> dichtbij je hart</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
            Veelgestelde Vragen over Rozenkwarts
          </h2>
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waarom is rozenkwarts de steen van de liefde?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Rozenkwarts trilt op de frequentie van onvoorwaardelijke liefde en opent het <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#492c4a] font-semibold hover:underline">hartchakra</Link>. Het helpt niet alleen bij romantische liefde, maar vooral bij zelfliefde, compassie en emotionele heling. Deze zachte energie maakt het de ultieme steen voor alle vormen van liefde.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe gebruik ik rozenkwarts voor liefde aantrekken?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Draag een <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">rozenkwarts armband of ketting</Link>, plaats het op je nachtkastje, of mediteer met rozenkwarts op je hart terwijl je visualiseert wat je zoekt in liefde. Belangrijk: werk eerst aan zelfliefde voordat je externe liefde aantrekt.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan ik rozenkwarts combineren met andere stenen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja! Rozenkwarts combineert perfect met <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">bergkristal en amethist (de Gouden Driehoek)</Link>, <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">morganiet en rhodoniet</Link> voor hartchakra werk, of <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#492c4a] font-semibold hover:underline">citrien</Link> voor liefde en vreugde.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe herken ik echt rozenkwarts?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Echt rozenkwarts heeft een natuurlijke, ongelijkmatige kleurverdeling, kan kleine inclusies bevatten en voelt koel aan bij aanraking. Fel roze of perfect uniform gekleurde stenen zijn vaak geverfd. Koop bij betrouwbare <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">leveranciers zoals S4H</Link> voor garantie.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Kan rozenkwarts verkleuren?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Ja, rozenkwarts kan verkleuren bij langdurige blootstelling aan direct zonlicht. De roze kleur wordt dan lichter of vervaagt. Laad rozenkwarts daarom het beste op in maanlicht of met <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] font-semibold hover:underline">bergkristal</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                Waar kan ik authentiek rozenkwarts kopen?
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> vind je authentiek rozenkwarts in verschillende vormen: losse stenen, <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link>, harten, geodes en meer. Alle <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H producten</Link> worden zorgvuldig geselecteerd op authenticiteit en kwaliteit.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-2xl p-8 md:p-12 text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de Kracht van Rozenkwarts
          </h2>
          <p className="text-lg text-white/90 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Shop authentieke rozenkwarts edelstenen en sieraden voor liefde, zelfliefde en emotioneel welzijn
          </p>
          <Link
            href="/collections/all"
            className="inline-block bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-4 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)] text-lg"
          >
            Bekijk Rozenkwarts Collectie →
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
                  Rozenkwarts in combinatie met amethist en bergkristal voor complete balans.
                </p>
              </div>
            </Link>

            <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Morganiet & Rhodoniet
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Andere krachtige hartchakra stenen voor liefde en emotionele heling.
                </p>
              </div>
            </Link>

            <Link href="/blog/chakra-kristallen-complete-gids" className="group">
              <div className="bg-white border-2 border-[#492c4a]/20 rounded-xl p-6 hover:border-[#492c4a]/40 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-[#492c4a] mb-2 group-hover:text-[#6b4069] font-[family-name:var(--font-eb-garamond)]">
                  Chakra Kristallen Gids
                </h3>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Leer hoe je rozenkwarts gebruikt voor hartchakra balans en heling.
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
                Stonesforhealth.nl Liefdes-Kristallen Experts
              </h3>
              <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Bij <Link href="/" className="text-[#492c4a] font-semibold hover:underline">Stonesforhealth.nl</Link> en <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] font-semibold hover:underline">S4H</Link> zijn we gespecialiseerd in hartchakra <Link href="/collections/all" className="text-[#492c4a] font-semibold hover:underline">edelstenen</Link> zoals rozenkwarts, <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#492c4a] font-semibold hover:underline">morganiet en rhodoniet</Link>. Ontdek onze collectie authentieke rozenkwarts stenen, <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] font-semibold hover:underline">sieraden</Link> en <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#492c4a] font-semibold hover:underline">de Gouden Driehoek</Link> sets voor liefde, zelfliefde en emotioneel welzijn.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
