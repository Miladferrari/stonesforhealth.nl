import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verzending & Levering | Gratis vanaf €50 | StonesForHealth',
  description: 'Informatie over verzending en levering ✓ Gratis verzending vanaf €50 ✓ Snelle levering binnen 2-4 werkdagen ✓ Track & Trace ✓ Zorgvuldig verpakt',
  keywords: 'verzending edelstenen, gratis verzending, levering kristallen, track and trace',
  openGraph: {
    title: 'Verzending & Levering | StonesForHealth',
    description: 'Gratis verzending vanaf €50 en snelle levering binnen 2-4 werkdagen.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/verzending'
  }
};

export default function VerzendingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
