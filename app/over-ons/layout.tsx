import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over Ons | Authentieke Edelstenen sinds 2020 | StonesForHealth',
  description: 'Leer over Stones for Health: ✓ Authentieke edelstenen direct uit Brazilië & Himalaya ✓ Ethisch gewonnen ✓ 3000+ tevreden klanten ✓ Familie bedrijf met passie voor kristallen',
  keywords: 'over stones for health, edelstenen winkel, authentieke kristallen, ethisch gewonnen',
  openGraph: {
    title: 'Over Ons | StonesForHealth',
    description: 'Ontdek ons verhaal en onze passie voor authentieke edelstenen.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/over-ons'
  }
};

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
