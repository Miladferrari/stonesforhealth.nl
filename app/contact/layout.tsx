import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Vragen over Edelstenen? | StonesForHealth',
  description: 'Neem contact op met Stones for Health voor vragen over edelstenen, kristallen, bestellingen of verzending. ✓ Snelle reactie ✓ Persoonlijk advies ✓ Bereikbaar via email en telefoon',
  keywords: 'contact stones for health, edelstenen vragen, kristallen advies, klantenservice',
  openGraph: {
    title: 'Contact | StonesForHealth',
    description: 'Vragen over edelstenen of kristallen? Neem contact op met ons team.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/contact'
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
