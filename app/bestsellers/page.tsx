import type { Metadata } from 'next';
import BestsellersClient from './BestsellersClient';
import { GRATIS_VANAF, bedragKort } from '@/lib/shippingConfig';

// Server component - handles SEO metadata
export const metadata: Metadata = {
  title: 'Bestsellers - Meest Populaire Edelstenen | StonesForHealth',
  description: `Ontdek onze bestselling edelstenen en kristallen. De meest geliefde en effectieve stenen, gekozen door duizenden tevreden klanten. Gratis verzending vanaf ${bedragKort(GRATIS_VANAF)}.`,
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
    url: 'https://www.stonesforhealth.nl/bestsellers',
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
    canonical: 'https://www.stonesforhealth.nl/bestsellers',
  },
};

export default function BestsellersPage() {
  return <BestsellersClient />;
}