import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { getPost, getPosts } from '@/lib/wordpress';

// Deze route vangt alleen de blogs die in WordPress geschreven zijn. De oudere,
// hardgecodeerde posts hebben een eigen map onder app/blog/<slug>; Next.js geeft
// die statische routes voorrang, dus die blijven werken zoals ze waren.

const baseUrl = 'https://www.stonesforhealth.nl';

// Nieuwe posts mogen niet op een deploy hoeven wachten. De webhook op
// /api/revalidate zet een verse publicatie meteen live; dit is het vangnet.
export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Blog niet gevonden | StonesForHealth' };
  }

  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      url,
      siteName: 'Stones for Health',
      locale: 'nl_NL',
      type: 'article',
      publishedTime: post.isoDate,
      modifiedTime: post.modifiedIso,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seoDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const url = `${baseUrl}/blog/${post.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    image: post.image,
    datePublished: post.isoDate,
    dateModified: post.modifiedIso,
    author: { '@type': 'Organization', name: 'StonesForHealth' },
    publisher: {
      '@type': 'Organization',
      name: 'Stones for Health',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  // Drie andere posts onderaan, zodat een bezoeker doorklikt in plaats van weg te vallen
  const related = (await getPosts(8)).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <Breadcrumbs />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <span className="inline-block bg-[#492c4a]/10 text-[#492c4a] px-3 py-1 rounded-full text-xs font-semibold mb-4 font-[family-name:var(--font-eb-garamond)]">
          {post.category}
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-600">
              <time dateTime={post.isoDate}>{post.date}</time> • {post.readTime}
            </p>
          </div>
        </div>

        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        {/* De HTML komt uit de WordPress-editor van de eigen redactie, niet van
            bezoekers; WordPress saneert die bij het opslaan. */}
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#492c4a] font-semibold hover:gap-3 transition-all font-[family-name:var(--font-eb-garamond)]"
          >
            ← Terug naar alle blogs
          </Link>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Lees ook
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="group">
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-auto font-[family-name:var(--font-eb-garamond)]">
                        {item.date} • {item.readTime}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
