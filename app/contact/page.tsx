import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact - Neem Contact Op | StonesForHealth',
  description: 'Heb je vragen over edelstenen, kristallen of je bestelling? Neem contact op met StonesForHealth. We helpen je graag! Reactie binnen 24 uur.',
  keywords: [
    'contact stonesforhealth',
    'edelstenen klantenservice',
    'kristallen vragen',
    'bestelling hulp',
    'contact webshop'
  ],
  openGraph: {
    title: 'Contact - Neem Contact Op | StonesForHealth',
    description: 'Heb je vragen? Neem contact op met StonesForHealth. We helpen je graag!',
    url: 'https://stonesforhealth.nl/contact',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
