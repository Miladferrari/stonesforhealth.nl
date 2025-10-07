'use client';

import Image from 'next/image';
import Link from 'next/link';

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    title: 'Edelstenen met Betekenis en Kracht: Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet',
    excerpt: 'Ontdek de werking, herkomst en betekenis van zes krachtige edelstenen. Van transformatie tot rust, van bescherming tot balans - elke steen vertelt zijn eigen verhaal.',
    image: '/Blog images /Edelstenen met Betekenis en Kracht- Malachiet, Lavasteen, Onyx, Howliet, Sodaliet en Unakiet.jpeg',
    category: 'Kristallen',
    date: '30 september 2025',
    readTime: '10 min leestijd',
    slug: 'edelstenen-betekenis-kracht-malachiet-lavasteen-onyx-howliet-sodaliet-unakiet'
  },
  {
    id: 2,
    title: 'S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie',
    excerpt: 'Ontdek de kracht van koperen armbanden met magneten. Eeuwenoude kennis gecombineerd met modern design voor balans, herstel en stijlvolle energie.',
    image: '/Blog images /S4H Koperen Armbanden met Magneten – Stijl, Balans en Natuurlijke Energie.jpeg',
    category: 'Kristallen',
    date: '1 oktober 2025',
    readTime: '8 min leestijd',
    slug: 's4h-koperen-armbanden-magneten'
  },
  {
    id: 3,
    title: 'Chakra\'s Uitgelegd: Zo Werkt het Energiesysteem van je Lichaam',
    excerpt: 'Ontdek hoe het chakra-systeem werkt. Leer over de 7 hoofdchakra\'s, hun kleuren, betekenis en hoe je ze in balans brengt met edelstenen en meditatie.',
    image: '/Blog images /Chakra\'s Uitgelegd- Zo Werkt het Energiesysteem van je Lichaam.jpeg',
    category: 'Spiritualiteit',
    date: '3 oktober 2025',
    readTime: '10 min leestijd',
    slug: 'chakras-uitgelegd-energiesysteem'
  },
  {
    id: 4,
    title: 'Edelstenen Schoonmaken en Opladen in Maanlicht: Zo Doe Je Dat!',
    excerpt: 'Leer hoe je edelstenen reinigt en oplaadt met maanlicht. Complete gids met timing, methodes en welke stenen perfect reageren op maanenergie.',
    image: '/Blog images /Edelstenen Schoonmaken en Opladen in Maanlicht- Zo Doe Je Dat!.jpeg',
    category: 'Onderhoud',
    date: '5 oktober 2025',
    readTime: '8 min leestijd',
    slug: 'edelstenen-opladen-maanlicht'
  },
  {
    id: 5,
    title: 'Supermaan 7 Oktober 2025 – Krachtige Maanenergie voor Balans',
    excerpt: 'Ontdek de krachtige supermaan van 7 oktober 2025 in Ram. Rituelen, edelstenen en spirituele betekenis voor balans, vernieuwing en persoonlijke groei.',
    image: '/Blog images /Supermaan 7 Oktober 2025 – Krachtige Maanenergie voor Balans en Vernieuwing.jpeg',
    category: 'Spiritualiteit',
    date: '7 oktober 2025',
    readTime: '9 min leestijd',
    slug: 'supermaan-oktober-2025'
  },
  {
    id: 6,
    title: 'Complete Gids: Chakra\'s en Bijbehorende Kristallen',
    excerpt: 'Ontdek hoe chakra kristallen je energiecentra kunnen balanceren en harmoniseren. Leer welke stenen bij welke chakra\'s horen en hoe je ze het beste kunt gebruiken.',
    image: '/Blog images /Complete Gids- Chakra\'s en Bijbehorende Kristallen.webp',
    category: 'Spiritualiteit',
    date: '15 maart 2025',
    readTime: '12 min leestijd',
    slug: 'chakra-kristallen-complete-gids'
  },
  {
    id: 7,
    title: 'Chakra\'s en hun Kleuren: De Energiepunten van je Lichaam',
    excerpt: 'Ontdek de 7 hoofdchakra\'s, hun unieke kleuren en energetische betekenis. Leer hoe je deze energiepunten in balans brengt voor optimaal welzijn.',
    image: '/Blog images /Chakra\'s en hun Kleuren- De Energiepunten van je Lichaam.webp',
    category: 'Spiritualiteit',
    date: '10 maart 2025',
    readTime: '10 min leestijd',
    slug: 'chakras-en-hun-kleuren'
  },
  {
    id: 8,
    title: 'Edelstenen per Sterrenbeeld en Numerologie',
    excerpt: 'Ontdek welke edelsteen perfect bij jou past op basis van je westerse sterrenbeeld, Chinese dierenriem en numerologisch getal. Complete gids met alle edelstenen.',
    image: '/Blog images /Edelstenen per Sterrenbeeld en Numerologie.webp',
    category: 'Spiritualiteit',
    date: '8 maart 2025',
    readTime: '15 min leestijd',
    slug: 'edelstenen-per-sterrenbeeld-numerologie'
  },
  {
    id: 9,
    title: 'Volle Maan Oktober 2025: Jagermaan in Ram',
    excerpt: 'Volle maan op 14 oktober 2025. Ontdek de betekenis van de Jagermaan, krachtige rituelen en welke edelstenen perfect passen bij deze transformerende energie.',
    image: '/Blog images /Volle Maan Oktober 2025- De Jagermaan in Ram .webp',
    category: 'Spiritualiteit',
    date: '10 oktober 2025',
    readTime: '8 min leestijd',
    slug: 'volle-maan-oktober-2025'
  },
  {
    id: 10,
    title: 'Volle Maan November 2025: Beaver Moon Supermaan',
    excerpt: 'Supermaan op 5 november 2025. Ontdek de betekenis van de Beaver Moon, gronding rituelen en de beste edelstenen voor deze krachtige volle maan.',
    image: '/Blog images /Volle Maan November 2025- Beaver Moon Supermaan.webp',
    category: 'Spiritualiteit',
    date: '1 november 2025',
    readTime: '9 min leestijd',
    slug: 'volle-maan-november-2025'
  },
  {
    id: 11,
    title: 'Volle Maan December 2025: Cold Moon',
    excerpt: 'Laatste volle maan van 2025 op 26 december. Ontdek de betekenis van de Cold Moon, afrondingsrituelen en edelstenen voor reflectie en nieuw begin.',
    image: '/Blog images /Volle Maan December 2025- Cold Moon.webp',
    category: 'Spiritualiteit',
    date: '20 december 2025',
    readTime: '8 min leestijd',
    slug: 'volle-maan-december-2025'
  },
  {
    id: 12,
    title: '2026: Het Jaar van het Vuurpaard',
    excerpt: 'Chinese astrologie 2026: Ontdek wat het Jaar van het Vuurpaard betekent voor carrière, liefde, gezondheid en spiritualiteit. Inclusief gelukskleuren, nummers en beste edelstenen.',
    image: '/Blog images /2026- Het Jaar van het Vuurpaard.webp',
    category: 'Spiritualiteit',
    date: '1 januari 2026',
    readTime: '10 min leestijd',
    slug: 'jaar-van-het-vuurpaard-2026'
  },
  {
    id: 13,
    title: '2025: Het Jaar van de Houten Slang',
    excerpt: 'Chinese astrologie 2025: Ontdek de wijsheid van het Jaar van de Houten Slang. Transformatie, intuïtie en spirituele groei met de beste edelstenen voor dit jaar.',
    image: '/Blog images /2025- Het Jaar van de Houten Slang.webp',
    category: 'Spiritualiteit',
    date: '29 januari 2025',
    readTime: '9 min leestijd',
    slug: 'jaar-van-de-houten-slang-2025'
  },
  {
    id: 14,
    title: 'De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts',
    excerpt: 'Ontdek de kracht van de Gouden Driehoek - de meest populaire kristalcombinatie voor balans, liefde en helderheid. Complete gids met toepassingen en tips.',
    image: '/Blog images /De Gouden Driehoek- Amethist, Bergkristal & Rozenkwarts .webp',
    category: 'Kristallen',
    date: '5 maart 2025',
    readTime: '8 min leestijd',
    slug: 'gouden-driehoek-amethist-bergkristal-rozenkwarts'
  },
  {
    id: 15,
    title: 'Citrien & Amethist: Zon & Maan in Edelstenen',
    excerpt: 'Ontdek de perfecte balans tussen Citrien en Amethist. Zon en maan, energie en rust, actie en ontspanning - de krachtigste duo voor harmonie en succes.',
    image: '/Blog images /Citrien & Amethist- Zon & Maan in Edelstenen.webp',
    category: 'Kristallen',
    date: '12 maart 2025',
    readTime: '7 min leestijd',
    slug: 'citrien-amethist-zon-maan-edelstenen'
  },
  {
    id: 16,
    title: 'Morganiet & Rhodoniet: Edelstenen van Liefde & Heling',
    excerpt: 'Ontdek de kracht van Morganiet en Rhodoniet voor hartchakra heling. Zachte liefde meets krachtige emotionele transformatie - perfect voor relaties en zelfliefde.',
    image: '/Blog images /Morganiet & Rhodoniet- Edelstenen van Liefde & Heling.webp',
    category: 'Kristallen',
    date: '18 maart 2025',
    readTime: '7 min leestijd',
    slug: 'morganiet-rhodoniet-liefde-heling'
  },
  {
    id: 17,
    title: 'Bergkristal: De Koning onder de Kristallen',
    excerpt: 'Ontdek waarom Bergkristal de koning van alle kristallen is. Zuivering, versterking, balans en bescherming - de meest veelzijdige en krachtige edelsteen.',
    image: '/Blog images /Bergkristal- De Koning onder de Kristallen .webp',
    category: 'Kristallen',
    date: '22 maart 2025',
    readTime: '9 min leestijd',
    slug: 'bergkristal-koning-kristallen'
  },
  {
    id: 18,
    title: 'Masters of Shilajit: Pure Kracht uit de Himalaya',
    excerpt: 'Ontdek Masters of Shilajit - het beste Shilajit merk ter wereld. 100% pure Himalaya-hars voor energie, focus, herstel en spirituele balans. Zwart goud van de bergen.',
    image: '/Blog images /Masters of Shilajit- Pure Kracht uit de Himalaya.webp',
    category: 'Bescherming',
    date: '25 maart 2025',
    readTime: '8 min leestijd',
    slug: 'masters-of-shilajit-himalaya'
  },
  {
    id: 19,
    title: 'Art-of-Stones B.V.: Het Verhaal achter S4H Edelstenen',
    excerpt: 'Ontdek het krachtige bedrijf achter Stonesforhealth.nl. Art-of-Stones B.V. en het private label S4H brengen hoogwaardige edelstenen en sieraden naar 11 Europese landen.',
    image: '/Blog images /Art-of-Stones B.V.- Het Verhaal achter S4H Edelstenen.webp',
    category: 'Kristallen',
    date: '28 maart 2025',
    readTime: '7 min leestijd',
    slug: 'art-of-stones-s4h-edelstenen'
  },
  {
    id: 20,
    title: 'S4H Sieraden: Spirituele Kracht en Stijl in Één',
    excerpt: 'Ontdek S4H sieraden - de perfecte combinatie van schoonheid en spiritualiteit. Edelsteen armbanden, kettingen en ringen met echte energetische werking voor dagelijks gebruik.',
    image: '/Blog images /S4H Sieraden- Spirituele Kracht en Stijl in Één.webp',
    category: 'Kristallen',
    date: '30 maart 2025',
    readTime: '8 min leestijd',
    slug: 's4h-sieraden-spirituele-kracht-stijl'
  },
  {
    id: 21,
    title: 'Agaat: Betekenis, Soorten, Kleuren en Spirituele Werking',
    excerpt: 'Ontdek agaat - de veelzijdige edelsteen met duizenden jaren geschiedenis. Van blauwe agaat tot vuuragaat, elke kleur heeft unieke kracht voor balans, bescherming en heling.',
    image: '/Blog images /Agaat- Betekenis, Soorten, Kleuren en Spirituele Werking.webp',
    category: 'Kristallen',
    date: '2 april 2025',
    readTime: '10 min leestijd',
    slug: 'agaat-betekenis-soorten-kleuren-werking'
  },
  {
    id: 22,
    title: 'Rozenkwarts: De Steen van de Liefde en het Hartchakra',
    excerpt: 'Ontdek rozenkwarts - de ultieme steen voor liefde, zelfliefde en emotioneel welzijn. Leer over de werking op het hartchakra, toepassingen en waarom deze roze steen al eeuwen geliefd is.',
    image: '/Blog images /Rozenkwarts- De Steen van de Liefde en het Hartchakra.webp',
    category: 'Kristallen',
    date: '5 april 2025',
    readTime: '9 min leestijd',
    slug: 'rozenkwarts-steen-van-de-liefde'
  },
  {
    id: 23,
    title: 'Amethist: Soorten, Werking, Vindplaatsen en Spirituele Tips',
    excerpt: 'Ontdek amethist - de paarse steen van rust, intuïtie en spiritualiteit. Leer over alle soorten, werking op het derde oog chakra, vindplaatsen en hoe je amethist gebruikt voor meditatie.',
    image: '/Blog images /Amethist- Soorten, Werking, Vindplaatsen en Spirituele Tips.webp',
    category: 'Kristallen',
    date: '8 april 2025',
    readTime: '10 min leestijd',
    slug: 'amethist-soorten-werking-spirituele-tips'
  },
  {
    id: 24,
    title: 'Top 10 Bekendste & Onbekendste Edelstenen Met Hun Werking',
    excerpt: 'Ontdek de top 10 meest populaire edelstenen (amethist, rozenkwarts, bergkristal) én de top 10 zeldzame geheimen (moldaviet, larimar, shungiet) met hun unieke spirituele krachten.',
    image: '/Blog images /Top 10 Bekendste & Onbekendste Edelstenen Met Hun Werking.webp',
    category: 'Kristallen',
    date: '10 april 2025',
    readTime: '12 min leestijd',
    slug: 'top-10-bekendste-onbekendste-edelstenen'
  }
];

const categories = ['Alle', 'Spiritualiteit', 'Kristallen', 'Onderhoud', 'Bescherming', 'Meditatie'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner.png"
            alt="Stonesforhealth blog header - Kristallen en spiritualiteit gids met edelstenen"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-[family-name:var(--font-eb-garamond)]">
            Kristallen & Spiritualiteit Blog
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-[family-name:var(--font-eb-garamond)]">
            Ontdek de wereld van kristallen, edelstenen en spirituele groei. Praktische tips, diepe inzichten en inspirerende verhalen.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full font-medium transition-colors font-[family-name:var(--font-eb-garamond)] ${
                  category === 'Alle'
                    ? 'bg-[#492c4a] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blog Post (First Post) */}
        <div className="mb-16">
          <Link href={`/blog/${sampleBlogs[0].slug}`} className="group">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={sampleBlogs[0].image}
                  alt={sampleBlogs[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#fbe022] text-black px-3 py-1 rounded-full text-sm font-bold font-[family-name:var(--font-eb-garamond)]">
                    UITGELICHT
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#492c4a] text-white px-3 py-1 rounded-full text-sm font-semibold font-[family-name:var(--font-eb-garamond)]">
                    {sampleBlogs[0].category}
                  </span>
                  <span className="text-gray-500 text-sm font-[family-name:var(--font-eb-garamond)]">
                    {sampleBlogs[0].date}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                  {sampleBlogs[0].title}
                </h2>
                <p className="text-gray-600 text-lg mb-4 font-[family-name:var(--font-eb-garamond)]">
                  {sampleBlogs[0].excerpt}
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-sm font-[family-name:var(--font-eb-garamond)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {sampleBlogs[0].readTime}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBlogs.slice(1).map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
              <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category and Date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#492c4a]/10 text-[#492c4a] px-3 py-1 rounded-full text-xs font-semibold font-[family-name:var(--font-eb-garamond)]">
                      {blog.category}
                    </span>
                    <span className="text-gray-400 text-xs font-[family-name:var(--font-eb-garamond)]">
                      {blog.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 flex-1 font-[family-name:var(--font-eb-garamond)]">
                    {blog.excerpt}
                  </p>

                  {/* Read Time */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-[family-name:var(--font-eb-garamond)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {blog.readTime}
                    </div>
                    <span className="text-[#492c4a] font-semibold text-sm group-hover:translate-x-1 transition-transform font-[family-name:var(--font-eb-garamond)]">
                      Lees meer →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
            Blijf op de hoogte
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
            Ontvang de nieuwste blogs, tips en exclusieve aanbiedingen direct in je inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Jouw e-mailadres"
              className="flex-1 px-5 py-3.5 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#fbe022] focus:border-transparent shadow-sm transition-all font-[family-name:var(--font-eb-garamond)]"
            />
            <button
              type="submit"
              className="bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-6 py-3 rounded-lg font-bold transition-colors font-[family-name:var(--font-eb-garamond)] whitespace-nowrap shadow-sm"
            >
              Aanmelden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
