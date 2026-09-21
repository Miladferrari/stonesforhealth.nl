import { Metadata } from 'next';
import { GRATIS_VANAF, bedragKort } from '@/lib/shippingConfig';

export const metadata: Metadata = {
  title: `Verzending & Levering | Gratis vanaf ${bedragKort(GRATIS_VANAF)} | StonesForHealth`,
  description: `Informatie over verzending en levering ✓ Gratis verzending vanaf ${bedragKort(GRATIS_VANAF)} ✓ Snelle levering binnen 2-4 werkdagen ✓ Track & Trace ✓ Zorgvuldig verpakt`,
  keywords: 'verzending edelstenen, gratis verzending, levering kristallen, track and trace',
  openGraph: {
    title: 'Verzending & Levering | StonesForHealth',
    description: `Gratis verzending vanaf ${bedragKort(GRATIS_VANAF)} en snelle levering binnen 2-4 werkdagen.`,
  },
  alternates: {
    canonical: 'https://www.stonesforhealth.nl/verzending'
  }
};

export default function VerzendingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
