import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet | Stonesforhealth',
  description: 'Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet. Van transformatie tot rust, van bescherming tot balans.',
  keywords: [
    'malachiet betekenis',
    'lavasteen werking',
    'onyx edelsteen',
    'howliet steen',
    'sodaliet chakra',
    'unakiet eigenschappen',
    'edelstenen betekenis',
    'kristallen kracht',
    'chakra stenen',
    'beschermstenen',
    'transformatie edelstenen',
    'aarding kristallen',
  ],
  openGraph: {
    title: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet',
    description: 'Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen. Van transformatie tot rust, van bescherming tot balans.',
    type: 'article',
    publishedTime: '2025-09-30',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-betekenis-kracht-malachiet-lavasteen-onyx-howliet-sodaliet-unakiet',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet",
  "description": "Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen. Van transformatie tot rust, van bescherming tot balans - elke steen vertelt zijn eigen verhaal.",
  "image": "https://stonesforhealth.nl/logo.webp",
  "datePublished": "2025-09-30T09:00:00Z",
  "dateModified": "2025-09-30T09:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "StonesForHealth"
  },
  "publisher": {
    "@type": "Organization",
    "name": "StonesForHealth",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stonesforhealth.nl/logo.webp"
    }
  }
};

export default function BlogPost() {
  return (
    <>
      <JsonLd data={blogPostingSchema} />

      <article className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Breadcrumbs */}
          <Breadcrumbs
            customItems={[
              { name: 'Home', url: 'https://stonesforhealth.nl' },
              { name: 'Blog', url: 'https://stonesforhealth.nl/blog' },
              { name: 'Edelstenen met Betekenis en Kracht', url: 'https://stonesforhealth.nl/blog/edelstenen-betekenis-kracht-malachiet-lavasteen-onyx-howliet-sodaliet-unakiet' }
            ]}
          />

          {/* Header */}
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime="2025-09-30">30 september 2025</time>
              <span>•</span>
              <span>10 min leestijd</span>
            </div>
          </header>

          {/* Blog Image */}
          <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src="/Blog images /Edelstenen met Betekenis en Kracht- Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet.jpeg"
              alt="Edelstenen met Betekenis en Kracht"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Introductie */}
          <section className="mb-8">
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Edelstenen dragen unieke energieën en frequenties die lichaam en geest kunnen ondersteunen. Bij <Link href="/" className="text-[#8B7355] hover:underline font-medium">Stonesforhealth.nl</Link> geloven we dat iedere steen zijn eigen verhaal vertelt en zijn eigen trilling heeft die past bij een bepaald moment in je leven. Hieronder ontdek je de werking, herkomst en betekenis van zes bijzondere edelstenen.
            </p>
          </section>

          {/* Inhoudsopgave */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#malachiet" className="text-[#8B7355] hover:underline">Malachiet – Steen van Transformatie en Bescherming</a></li>
              <li><a href="#lavasteen" className="text-[#8B7355] hover:underline">Lavasteen – Kracht uit het Hart van de Aarde</a></li>
              <li><a href="#onyx" className="text-[#8B7355] hover:underline">Onyx – De Steen van Bescherming en Focus</a></li>
              <li><a href="#howliet" className="text-[#8B7355] hover:underline">Howliet – Rust, Kalmte en Inzicht</a></li>
              <li><a href="#sodaliet" className="text-[#8B7355] hover:underline">Sodaliet – Helderheid en Communicatie</a></li>
              <li><a href="#unakiet" className="text-[#8B7355] hover:underline">Unakiet – Balans tussen Hart en Ziel</a></li>
              <li><a href="#samenvatting" className="text-[#8B7355] hover:underline">Samenvatting</a></li>
            </ol>
          </section>

          {/* Content Sections */}
          <div className="space-y-8">

            {/* Malachiet */}
            <section id="malachiet">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Malachiet – Steen van Transformatie en Bescherming
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Diepgroen met golvende lijnen<br />
                <strong>Chakra:</strong> Hartchakra<br />
                <strong>Element:</strong> Aarde<br />
                <strong>Vindplaatsen:</strong> Congo, Rusland, Namibië, Zambia, Australië
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Malachiet is een krachtige steen van transformatie. Zijn diepe groene kleur symboliseert groei, genezing en innerlijke vernieuwing. Al in het oude Egypte droegen priesters en farao's malachiet als bescherming tegen negatieve energie.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Malachiet
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Beschermt tegen negatieve energie</li>
                <li>Helpt oude patronen los te laten</li>
                <li>Activeert het hartchakra</li>
                <li>Ondersteunt spijsvertering en ontgifting (energetisch)</li>
                <li>Stimuleert moed en doorzettingsvermogen</li>
              </ul>
            </section>

            {/* Lavasteen */}
            <section id="lavasteen">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Lavasteen – Kracht uit het Hart van de Aarde
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Zwart of donkergrijs<br />
                <strong>Chakra:</strong> Wortelchakra<br />
                <strong>Element:</strong> Vuur<br />
                <strong>Vindplaatsen:</strong> IJsland, Hawaï, Indonesië, Italië
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Lavasteen ontstaat uit gestolde vulkanische lava en draagt een warme, aardende energie. De steen helpt om negatieve emoties los te laten en weer in je kracht te komen.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Lavasteen
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Sterk aardend en stabiliserend</li>
                <li>Geeft kracht en zelfvertrouwen</li>
                <li>Helpt bij stress en spanning</li>
                <li>Bevordert energiestroom</li>
                <li>Ideaal voor aromatherapie-armbanden</li>
              </ul>
            </section>

            {/* Onyx */}
            <section id="onyx">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Onyx – De Steen van Bescherming en Focus
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Diepzwart met glans<br />
                <strong>Chakra:</strong> Wortelchakra<br />
                <strong>Element:</strong> Aarde<br />
                <strong>Vindplaatsen:</strong> Brazilië, India, Madagaskar, Uruguay
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Onyx is een krachtige beschermsteen die negatieve energie weert en helpt bij het vinden van innerlijke rust. In de oudheid droegen Romeinse soldaten onyx als talisman voor moed en concentratie.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Onyx
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Beschermt tegen negatieve invloeden</li>
                <li>Bevordert focus en zelfdiscipline</li>
                <li>Helpt bij stress en besluiteloosheid</li>
                <li>Brengt stabiliteit en aarding</li>
              </ul>
            </section>

            {/* Howliet */}
            <section id="howliet">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Howliet – Rust, Kalmte en Inzicht
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Wit met grijze aders<br />
                <strong>Chakra:</strong> Kroonchakra<br />
                <strong>Element:</strong> Lucht<br />
                <strong>Vindplaatsen:</strong> Canada, Turkije, Mexico, VS
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Howliet is een kalmerende steen die spanning, onrust en stress vermindert. Zijn zachte uitstraling maakt hem ideaal voor mensen die moeite hebben met slapen of piekeren.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Howliet
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Brengt rust en emotioneel evenwicht</li>
                <li>Helpt bij slapeloosheid</li>
                <li>Stimuleert geduld en begrip</li>
                <li>Bevordert innerlijke stilte</li>
              </ul>
            </section>

            {/* Sodaliet */}
            <section id="sodaliet">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Sodaliet – Helderheid en Communicatie
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Diepblauw met witte aders<br />
                <strong>Chakra:</strong> Keelchakra & Derde Oog<br />
                <strong>Element:</strong> Water<br />
                <strong>Vindplaatsen:</strong> Brazilië, Groenland, Namibië
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Sodaliet is de steen van waarheid en communicatie. Hij helpt je trouw te blijven aan jezelf en helder te spreken vanuit je hart. Bekijk onze <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">chakra gids</Link> voor meer informatie over het keelchakra.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Sodaliet
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Stimuleert rationeel denken en intuïtie</li>
                <li>Verbetert zelfexpressie</li>
                <li>Helpt bij angst en onzekerheid</li>
                <li>Brengt balans tussen verstand en gevoel</li>
              </ul>
            </section>

            {/* Unakiet */}
            <section id="unakiet">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Unakiet – Balans tussen Hart en Ziel
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Groen-roze gemengd<br />
                <strong>Chakra:</strong> Hartchakra<br />
                <strong>Element:</strong> Aarde & Water<br />
                <strong>Vindplaatsen:</strong> Zuid-Afrika, Brazilië, VS
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Unakiet is een steen van balans, genezing en zachtheid. Hij combineert roze veldspaat (emotie, liefde) en groene epidoot (groei, heling), waardoor het een steen is die hart en geest verbindt.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Unakiet
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Helpt emotionele blokkades loslaten</li>
                <li>Bevordert harmonie in relaties</li>
                <li>Brengt evenwicht tussen gevoel en verstand</li>
                <li>Ondersteunt herstel bij verdriet of verlies</li>
              </ul>
            </section>

            {/* Samenvatting */}
            <section id="samenvatting">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Samenvatting
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">Edelsteen</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">Chakra</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">Element</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b border-gray-200 font-[family-name:var(--font-eb-garamond)]">Werking</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Malachiet</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Hart</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarde</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Bescherming, groei, loslaten</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Lavasteen</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Wortel</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Vuur</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarding, kracht, balans</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Onyx</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Wortel</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarde</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Bescherming, focus, stabiliteit</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Howliet</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Kroon</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Lucht</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Rust, slaap, inzicht</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Sodaliet</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Keel / Voorhoofd</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Water</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Communicatie, intuïtie, helderheid</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Unakiet</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Hart</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Aarde / Water</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-[family-name:var(--font-eb-garamond)]">Balans, liefde, heling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Bij <Link href="/" className="text-[#8B7355] hover:underline">Stonesforhealth.nl</Link> vind je authentieke, zorgvuldig geselecteerde edelstenen en sieraden van het merk <Link href="/blog/s4h-sieraden-spirituele-kracht-stijl" className="text-[#8B7355] hover:underline">S4H</Link>. Ontdek de kracht van natuurlijke energie en balans.
              </p>
            </section>

            {/* CTA Section */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                Ontdek Edelstenen bij StonesForHealth
              </h2>
              <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
                Bij <strong>StonesForHealth.nl</strong> vind je een ruime collectie van authentieke edelstenen en kristallen, met liefde geselecteerd voor jou. Alle stenen zijn ethisch gewonnen en van de hoogste kwaliteit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link
                  href="/alle-producten"
                  className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Shop Alle Edelstenen
                </Link>
                <Link
                  href="/bestsellers"
                  className="inline-block border border-[#8B7355] hover:bg-gray-50 text-[#8B7355] px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk Bestsellers
                </Link>
              </div>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                Gratis verzending vanaf €50 | 30 dagen retourrecht | 100% authentiek
              </p>
            </section>

            {/* Gerelateerde Artikelen */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                Zie ook
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
                <li>
                  <Link href="/blog/bergkristal-koning-kristallen" className="text-[#8B7355] hover:underline">
                    Bergkristal: De Koning onder de Kristallen
                  </Link>
                </li>
                <li>
                  <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">
                    Chakra's Uitgelegd: Energiesysteem van je Lichaam
                  </Link>
                </li>
                <li>
                  <Link href="/blog/top-10-bekendste-onbekendste-edelstenen" className="text-[#8B7355] hover:underline">
                    Top 10 Bekendste & Onbekendste Edelstenen
                  </Link>
                </li>
                <li>
                  <Link href="/blog/art-of-stones-s4h-edelstenen" className="text-[#8B7355] hover:underline">
                    Art of Stones: Ons Verhaal
                  </Link>
                </li>
              </ul>
            </section>

          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#6D5A42] font-medium transition-colors font-[family-name:var(--font-eb-garamond)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Blog Overzicht
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}
