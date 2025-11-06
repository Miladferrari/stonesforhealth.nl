'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function MetaPixel() {
  useEffect(() => {
    // Check if consent was previously given
    const consent = localStorage.getItem('cookie_consent');

    if (typeof window !== 'undefined' && window.fbq) {
      if (consent === 'granted') {
        window.fbq('consent', 'grant');
      } else if (consent === 'denied') {
        window.fbq('consent', 'revoke');
      }
    }
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          // Initialize with consent mode
          fbq('consent', 'revoke');
          fbq('init', '706502092486460');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=706502092486460&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
