'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Check if consent was previously given
    const consent = localStorage.getItem('cookie_consent');

    if (typeof window !== 'undefined' && window.gtag) {
      if (consent === 'granted') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
        });
      } else if (consent === 'denied') {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
        });
      }
    }
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MK8E1TDJBE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Set default consent to denied (GDPR compliant)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'wait_for_update': 500
          });

          gtag('js', new Date());
          gtag('config', 'G-MK8E1TDJBE', {
            'send_page_view': true
          });
        `}
      </Script>
    </>
  );
}
