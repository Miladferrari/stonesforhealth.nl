import { Metadata } from 'next';
import { GRATIS_VANAF, bedragKort } from '@/lib/shippingConfig';

export const metadata: Metadata = {
  title: 'Alle Producten | 100+ Edelstenen & Kristallen Kopen | StonesForHealth',
  description: `Browse door onze volledige collectie edelstenen en kristallen ✓ 100+ authentieke stenen ✓ Gratis verzending ${bedragKort(GRATIS_VANAF)}+ ✓ Amethist, Rozenkwarts, Bergkristal, Agaat & meer`,
  keywords: 'edelstenen kopen, kristallen webshop, alle producten, edelsteen collectie',
  openGraph: {
    title: 'Alle Producten | StonesForHealth',
    description: 'Ontdek onze volledige collectie van 100+ authentieke edelstenen en kristallen.',
  },
  alternates: {
    canonical: 'https://www.stonesforhealth.nl/alle-producten'
  }
};

export default function AlleProductenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
