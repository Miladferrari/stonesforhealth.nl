import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alle Collecties | Edelstenen & Kristallen | Stones for Health',
  description:
    'Blader door alle collecties edelstenen en kristallen: armbanden, ruwe stenen, clusters, sieraden en meer. 100% authentiek en met zorg geselecteerd.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Alle Collecties | Stones for Health',
    description: 'Blader door alle collecties edelstenen en kristallen.',
    url: '/collections',
    type: 'website',
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
