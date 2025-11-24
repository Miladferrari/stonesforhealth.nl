import type { Metadata } from 'next';
import BestsellersClient from './BestsellersClient';

// Server component - handles SEO metadata
export const metadata: Metadata = {
  title: 'Bestsellers - Meest Populaire Edelstenen | StonesForHealth',
  description: 'Ontdek onze bestselling edelstenen en kristallen. De meest geliefde en effectieve stenen, gekozen door duizenden tevreden klanten. Gratis verzending vanaf €30.',
  keywords: [
    'bestseller edelstenen',
    'populaire kristallen',
    'meest verkochte stenen',
    'top edelstenen',
    'favoriete kristallen',
    'klant favorieten'
  ],
  openGraph: {
    title: 'Bestsellers - Meest Populaire Edelstenen | StonesForHealth',
    description: 'Ontdek onze bestselling edelstenen en kristallen. De meest geliefde stenen gekozen door duizenden klanten.',
    url: 'https://stonesforhealth.nl/bestsellers',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bestsellers - Meest Populaire Edelstenen | StonesForHealth',
    description: 'Ontdek onze bestselling edelstenen en kristallen.',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/bestsellers',
  },
};

export default function BestsellersPage() {
  return <BestsellersClient />;
}