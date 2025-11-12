import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bestsellers | Meest Verkochte Edelstenen & Kristallen | StonesForHealth',
  description: 'Shop onze bestseller edelstenen en kristallen ✓ Meest populaire stenen ✓ Gratis verzending vanaf €30 ✓ 30 dagen retour ✓ Amethist, Bergkristal, Rozenkwarts & meer',
  keywords: 'bestseller edelstenen, populaire kristallen, meest verkocht, amethist, rozenkwarts',
  openGraph: {
    title: 'Bestsellers | StonesForHealth',
    description: 'Onze meest populaire edelstenen en kristallen, geliefd door 4000+ klanten.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/bestsellers'
  }
};

export default function BestsellersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
