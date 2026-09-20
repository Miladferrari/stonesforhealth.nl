import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts } from '@/lib/wordpress';

// Het overzicht komt volledig uit WordPress. De klant schrijft op
// admin.stonesforhealth.nl onder "Berichten"; hier staat niets meer hardgecodeerd.

export const metadata: Metadata = {
  title: 'Blog - Edelstenen, Kristallen & Spiritualiteit | StonesForHealth',
  description: 'Ontdek alles over edelstenen, kristallen en spiritualiteit op onze blog. Tips, inzichten en gidsen over chakras, healing, meditatie en meer.',
  keywords: [
    'edelstenen blog',
    'kristallen gids',
    'spiritualiteit tips',
    'chakra blog',
    'healing kristallen',
    'kristallen informatie'
  ],
  openGraph: {
    title: 'Blog - Edelstenen, Kristallen & Spiritualiteit | StonesForHealth',
    description: 'Ontdek alles over edelstenen, kristallen en spiritualiteit op onze blog.',
    url: 'https://www.stonesforhealth.nl/blog',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Edelstenen, Kristallen & Spiritualiteit | StonesForHealth',
    description: 'Ontdek alles over edelstenen, kristallen en spiritualiteit op onze blog.',
  },
  alternates: {
    canonical: 'https://www.stonesforhealth.nl/blog',
  },
};

// Nieuwe posts moeten zonder deploy verschijnen; de webhook op
// /api/revalidate-blog ververst direct na publiceren, dit is het vangnet.
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts();

  // Het nieuwste bericht krijgt de uitgelichte plek, de rest gaat in het raster
  const [featured, ...rest] = posts;

  // Rubrieken uit de posts zelf, zodat de knoppenrij klopt met wat er staat
  const categories = ['Alle', ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner.webp"
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
        {/* Valt WordPress weg, dan blijft de pagina staan met een nette melding
            in plaats van een lege of kapotte layout */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 font-[family-name:var(--font-eb-garamond)]">
              Er zijn op dit moment geen blogs beschikbaar. Kom snel even terug.
            </p>
          </div>
        ) : (
          <>
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
              <Link href={`/blog/${featured.slug}`} className="group">
                <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
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
                        {featured.category}
                      </span>
                      <span className="text-gray-500 text-sm font-[family-name:var(--font-eb-garamond)]">
                        {featured.date}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      {featured.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-4 font-[family-name:var(--font-eb-garamond)]">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-[family-name:var(--font-eb-garamond)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featured.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((blog) => (
                <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group">
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          </>
        )}

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
