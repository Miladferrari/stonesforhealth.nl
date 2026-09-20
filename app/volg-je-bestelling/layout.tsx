import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volg je bestelling | Stones for Health',
  // Transactional page: keep it out of the index (robots.txt blocks crawling,
  // this stops it being indexed from external links)
  robots: { index: false, follow: false },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
