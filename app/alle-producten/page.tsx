import type { Metadata } from 'next';
import AlleProductenClient from './AlleProductenClient';

// Server component - handles SEO metadata
export const metadata: Metadata = {
  title: 'Alle Producten - Edelstenen & Kristallen | StonesForHealth',
  description: 'Browse alle authentieke edelstenen en kristallen bij StonesForHealth. Ontdek onze volledige collectie met chakra stenen, beschermingsstenen en meer. Gratis verzending vanaf €30.',
  keywords: [
    'alle edelstenen',
    'kristallen collectie',
    'edelstenen webshop',
    'kristallen kopen',
    'chakra stenen',
    'beschermingsstenen',
    'healing kristallen'
  ],
  openGraph: {
    title: 'Alle Producten - Edelstenen & Kristallen | StonesForHealth',
    description: 'Browse alle authentieke edelstenen en kristallen bij StonesForHealth.',
    url: 'https://stonesforhealth.nl/alle-producten',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alle Producten - Edelstenen & Kristallen | StonesForHealth',
    description: 'Browse alle authentieke edelstenen en kristallen bij StonesForHealth.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/alle-producten',
  },
};

export default function AlleProductenPage() {
  return <AlleProductenClient />;
}