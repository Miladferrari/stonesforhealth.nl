'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Falls back to the hardcoded ID so a missing env var never silently kills tracking
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MK8E1TDJBE';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Replay the stored choice: gtag starts denied on every page load
    const consent = localStorage.getItem('cookie_consent');

    if (typeof window !== 'undefined' && window.gtag) {
      if (consent === 'granted') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      } else if (consent === 'denied') {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Consent Mode v2: everything denied until the banner says otherwise.
          // ad_user_data and ad_personalization are required for EU traffic
          // since March 2024 — without them Ads/remarketing data stays empty.
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'send_page_view': true
          });
        `}
      </Script>
    </>
  );
}
