import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen (FAQ) - Edelstenen & Kristallen | StonesForHealth',
  description: 'Vind antwoorden op al uw vragen over edelstenen, kristallen, verzending, retourneren en meer. Ontdek alles wat u moet weten bij StonesForHealth.',
  keywords: [
    'faq edelstenen',
    'veelgestelde vragen kristallen',
    'edelstenen info',
    'kristallen verzending',
    'retourbeleid edelstenen'
  ],
  openGraph: {
    title: 'Veelgestelde Vragen (FAQ) | StonesForHealth',
    description: 'Vind antwoorden op al uw vragen over edelstenen, kristallen, verzending en meer.',
    url: 'https://stonesforhealth.nl/faq',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/faq',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
