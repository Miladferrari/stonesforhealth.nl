import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet | Stonesforhealth',
  description: 'Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet. Van transformatie tot rust, van bescherming tot balans.',
  keywords: 'malachiet betekenis, lavasteen werking, onyx edelsteen, howliet steen, sodaliet chakra, unakiet eigenschappen, edelstenen betekenis, kristallen kracht, chakra stenen',
  openGraph: {
    title: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet',
    description: 'Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen. Van transformatie tot rust, van bescherming tot balans.',
    type: 'article',
    publishedTime: '2025-09-30',
    authors: ['Stonesforhealth'],
    images: [
      {
        url: '/Blog images /Edelstenen met Betekenis en Kracht- Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet.jpeg',
        width: 1200,
        height: 630,
        alt: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet',
  description: 'Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen. Van transformatie tot rust, van bescherming tot balans - elke steen vertelt zijn eigen verhaal.',
  image: '/Blog images /Edelstenen met Betekenis en Kracht- Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet.jpeg',
  datePublished: '2025-09-30',
  dateModified: '2025-09-30',
  author: {
    '@type': 'Organization',
    name: 'Stonesforhealth',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Stonesforhealth',
    logo: {
      '@type': 'ImageObject',
      url: '/logo.png',
    },
  },
};

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#492c4a] font-medium font-[family-name:var(--font-eb-garamond)]">
                Edelstenen met Betekenis en Kracht
              </span>
            </nav>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/Blog images /Edelstenen met Betekenis en Kracht- Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet.jpeg"
            alt="Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-[#492c4a] text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 font-[family-name:var(--font-eb-garamond)]">
                Kristallen
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-eb-garamond)]">
                Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet
              </h1>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <span className="font-[family-name:var(--font-eb-garamond)]">30 september 2025</span>
                <span>•</span>
                <span className="font-[family-name:var(--font-eb-garamond)]">10 min leestijd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)] mb-6">
              Edelstenen dragen unieke energieën en frequenties die lichaam en geest kunnen ondersteunen. Bij <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stonesforhealth.nl</Link> geloven we dat iedere steen zijn eigen verhaal vertelt en zijn eigen trilling heeft die past bij een bepaald moment in je leven. Hieronder ontdek je de werking, herkomst en betekenis van zes bijzondere edelstenen.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-12 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <nav className="space-y-2">
              <a href="#malachiet" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                1. Malachiet – Steen van Transformatie en Bescherming
              </a>
              <a href="#lavasteen" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                2. Lavasteen – Kracht uit het Hart van de Aarde
              </a>
              <a href="#onyx" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                3. Onyx – De Steen van Bescherming en Focus
              </a>
              <a href="#howliet" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                4. Howliet – Rust, Kalmte en Inzicht
              </a>
              <a href="#sodaliet" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                5. Sodaliet – Helderheid en Communicatie
              </a>
              <a href="#unakiet" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                6. Unakiet – Balans tussen Hart en Ziel
              </a>
              <a href="#samenvatting" className="block text-[#492c4a] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]">
                7. Samenvatting
              </a>
            </nav>
          </div>

          {/* Section 1: Malachiet */}
          <section id="malachiet" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Malachiet – Steen van Transformatie en Bescherming
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p className="mb-4">
                <strong>Kleur:</strong> Diepgroen met golvende lijnen<br />
                <strong>Chakra:</strong> Hartchakra<br />
                <strong>Element:</strong> Aarde<br />
                <strong>Vindplaatsen:</strong> Congo, Rusland, Namibië, Zambia, Australië
              </p>

              <p>
                Malachiet is een krachtige steen van transformatie. Zijn diepe groene kleur symboliseert groei, genezing en innerlijke vernieuwing. Al in het oude Egypte droegen priesters en farao's malachiet als bescherming tegen negatieve energie.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 md:p-8 my-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Malachiet
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>• Beschermt tegen negatieve energie</li>
                  <li>• Helpt oude patronen los te laten</li>
                  <li>• Activeert het hartchakra</li>
                  <li>• Ondersteunt spijsvertering en ontgifting (energetisch)</li>
                  <li>• Stimuleert moed en doorzettingsvermogen</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Lavasteen */}
          <section id="lavasteen" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Lavasteen – Kracht uit het Hart van de Aarde
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p className="mb-4">
                <strong>Kleur:</strong> Zwart of donkergrijs<br />
                <strong>Chakra:</strong> Wortelchakra<br />
                <strong>Element:</strong> Vuur<br />
                <strong>Vindplaatsen:</strong> IJsland, Hawaï, Indonesië, Italië
              </p>

              <p>
                Lavasteen ontstaat uit gestolde vulkanische lava en draagt een warme, aardende energie. De steen helpt om negatieve emoties los te laten en weer in je kracht te komen.
              </p>

              <div className="bg-gray-50 border-l-4 border-gray-700 rounded-lg p-6 md:p-8 my-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Lavasteen
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>• Sterk aardend en stabiliserend</li>
                  <li>• Geeft kracht en zelfvertrouwen</li>
                  <li>• Helpt bij stress en spanning</li>
                  <li>• Bevordert energiestroom</li>
                  <li>• Ideaal voor <Link href="/alle-producten?zoek=aromatherapie" className="text-[#492c4a] hover:underline font-semibold">aromatherapie-armbanden</Link></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Onyx */}
          <section id="onyx" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Onyx – De Steen van Bescherming en Focus
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p className="mb-4">
                <strong>Kleur:</strong> Diepzwart met glans<br />
                <strong>Chakra:</strong> Wortelchakra<br />
                <strong>Element:</strong> Aarde<br />
                <strong>Vindplaatsen:</strong> Brazilië, India, Madagaskar, Uruguay
              </p>

              <p>
                Onyx is een krachtige beschermsteen die negatieve energie weert en helpt bij het vinden van innerlijke rust. In de oudheid droegen Romeinse soldaten onyx als talisman voor moed en concentratie.
              </p>

              <div className="bg-gray-50 border-l-4 border-black rounded-lg p-6 md:p-8 my-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Onyx
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>• Beschermt tegen negatieve invloeden</li>
                  <li>• Bevordert focus en zelfdiscipline</li>
                  <li>• Helpt bij stress en besluiteloosheid</li>
                  <li>• Brengt stabiliteit en aarding</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Howliet */}
          <section id="howliet" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Howliet – Rust, Kalmte en Inzicht
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p className="mb-4">
                <strong>Kleur:</strong> Wit met grijze aders<br />
                <strong>Chakra:</strong> Kroonchakra<br />
                <strong>Element:</strong> Lucht<br />
                <strong>Vindplaatsen:</strong> Canada, Turkije, Mexico, VS
              </p>

              <p>
                Howliet is een kalmerende steen die spanning, onrust en stress vermindert. Zijn zachte uitstraling maakt hem ideaal voor mensen die moeite hebben met slapen of piekeren.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-300 rounded-lg p-6 md:p-8 my-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Howliet
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>• Brengt rust en emotioneel evenwicht</li>
                  <li>• Helpt bij slapeloosheid</li>
                  <li>• Stimuleert geduld en begrip</li>
                  <li>• Bevordert innerlijke stilte</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Sodaliet */}
          <section id="sodaliet" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Sodaliet – Helderheid en Communicatie
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p className="mb-4">
                <strong>Kleur:</strong> Diepblauw met witte aders<br />
                <strong>Chakra:</strong> Keelchakra & Derde Oog<br />
                <strong>Element:</strong> Water<br />
                <strong>Vindplaatsen:</strong> Brazilië, Groenland, Namibië
              </p>

              <p>
                Sodaliet is de steen van waarheid en communicatie. Hij helpt je trouw te blijven aan jezelf en helder te spreken vanuit je hart. Bekijk onze <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#492c4a] hover:underline font-semibold">chakra gids</Link> voor meer informatie over het keelchakra.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 md:p-8 my-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Sodaliet
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>• Stimuleert rationeel denken en intuïtie</li>
                  <li>• Verbetert zelfexpressie</li>
                  <li>• Helpt bij angst en onzekerheid</li>
                  <li>• Brengt balans tussen verstand en gevoel</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Unakiet */}
          <section id="unakiet" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Unakiet – Balans tussen Hart en Ziel
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p className="mb-4">
                <strong>Kleur:</strong> Groen-roze gemengd<br />
                <strong>Chakra:</strong> Hartchakra<br />
                <strong>Element:</strong> Aarde & Water<br />
                <strong>Vindplaatsen:</strong> Zuid-Afrika, Brazilië, VS
              </p>

              <p>
                Unakiet is een steen van balans, genezing en zachtheid. Hij combineert roze veldspaat (emotie, liefde) en groene epidoot (groei, heling), waardoor het een steen is die hart en geest verbindt.
              </p>

              <div className="bg-pink-50 border-l-4 border-pink-400 rounded-lg p-6 md:p-8 my-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Unakiet
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>• Helpt emotionele blokkades loslaten</li>
                  <li>• Bevordert harmonie in relaties</li>
                  <li>• Brengt evenwicht tussen gevoel en verstand</li>
                  <li>• Ondersteunt herstel bij verdriet of verlies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Samenvatting Table */}
          <section id="samenvatting" className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Samenvatting
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">
                      Edelsteen
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">
                      Chakra
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">
                      Element
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">
                      Belangrijkste werking
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">
                      Vindplaatsen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold font-[family-name:var(--font-eb-garamond)]">Malachiet</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Hart</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarde</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Bescherming, groei, loslaten</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Congo, Rusland, Namibië</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold font-[family-name:var(--font-eb-garamond)]">Lavasteen</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Wortel</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Vuur</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarding, kracht, balans</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">IJsland, Italië, Hawaï</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold font-[family-name:var(--font-eb-garamond)]">Onyx</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Wortel</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarde</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Bescherming, focus, stabiliteit</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Brazilië, India, Uruguay</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold font-[family-name:var(--font-eb-garamond)]">Howliet</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Kroon</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Lucht</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Rust, slaap, inzicht</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Canada, Mexico, Turkije</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold font-[family-name:var(--font-eb-garamond)]">Sodaliet</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Keel / Voorhoofd</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Water</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Communicatie, intuïtie, helderheid</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Brazilië, Groenland</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold font-[family-name:var(--font-eb-garamond)]">Unakiet</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Hart</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarde / Water</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Balans, liefde, heling</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">VS, Zuid-Afrika, Brazilië</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              <p>
                Bij <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stonesforhealth.nl</Link> vind je authentieke, zorgvuldig geselecteerde edelstenen en sieraden van het merk <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#492c4a] hover:underline font-semibold">S4H</Link>. Ontdek de kracht van natuurlijke energie en balans.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-2xl p-8 md:p-12 text-center text-white mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
              Klaar om jouw perfecte edelsteen te vinden?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Ontdek onze complete collectie natuurlijke edelstenen en kristallen, met liefde geselecteerd voor jou.
            </p>
            <Link
              href="/alle-producten"
              className="inline-block bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-3 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)]"
            >
              Bekijk Alle Edelstenen
            </Link>
          </div>

          {/* Related Articles */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/Blog images /Bergkristal- De Koning onder de Kristallen .webp"
                      alt="Bergkristal: De Koning onder de Kristallen"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Bergkristal: De Koning onder de Kristallen
                    </h3>
                  </div>
                </div>
              </Link>

              <Link href="/blog/chakras-uitgelegd-energiesysteem" className="group">
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/Blog images /Chakra's Uitgelegd- Zo Werkt het Energiesysteem van je Lichaam.jpeg"
                      alt="Chakra's Uitgelegd: Energiesysteem van je Lichaam"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Chakra's Uitgelegd: Energiesysteem
                    </h3>
                  </div>
                </div>
              </Link>

              <Link href="/blog/top-10-bekendste-onbekendste-edelstenen" className="group">
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/Blog images /Top 10 Bekendste & Onbekendste Edelstenen Met Hun Werking.webp"
                      alt="Top 10 Bekendste & Onbekendste Edelstenen"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Top 10 Edelstenen Met Hun Werking
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Over Stonesforhealth
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                    Bij Stonesforhealth.nl brengen we de kracht van natuurlijke edelstenen naar jou toe. Ontdek <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#492c4a] hover:underline font-semibold">ons verhaal</Link> en leer meer over de spirituele werking van kristallen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
