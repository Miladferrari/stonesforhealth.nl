import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen (FAQ) | Alles over Edelstenen | StonesForHealth',
  description: 'Antwoorden op veelgestelde vragen over edelstenen, kristallen, bestellingen, verzending en gebruik ✓ Echtheid ✓ Verzorging ✓ Betaling ✓ Levering ✓ Retourneren',
  keywords: 'faq edelstenen, veelgestelde vragen kristallen, edelstenen echtheid, kristallen gebruik',
  openGraph: {
    title: 'Veelgestelde Vragen | StonesForHealth',
    description: 'Vind antwoorden op al je vragen over edelstenen en kristallen.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/faq'
  }
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
