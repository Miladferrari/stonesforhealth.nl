'use client';

import { useEffect, useState } from 'react';
import CookieConsentLib from 'react-cookie-consent';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAccept = () => {
    // Enable all tracking
    if (typeof window !== 'undefined') {
      // Enable Google Analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });

      // Enable Meta Pixel
      window.fbq?.('consent', 'grant');

      // Store consent
      localStorage.setItem('cookie_consent', 'granted');
      localStorage.setItem('cookie_consent_date', new Date().toISOString());
    }
  };

  const handleDecline = () => {
    // Disable all tracking
    if (typeof window !== 'undefined') {
      // Disable Google Analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });

      // Disable Meta Pixel
      window.fbq?.('consent', 'revoke');

      // Store decline
      localStorage.setItem('cookie_consent', 'denied');
      localStorage.setItem('cookie_consent_date', new Date().toISOString());
    }
  };

  return (
    <CookieConsentLib
      location="bottom"
      buttonText="Accepteren"
      declineButtonText="Weigeren"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="stonesforhealth_cookie_consent"
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '20px',
        alignItems: 'center',
        fontFamily: 'var(--font-geist-sans)',
      }}
      buttonStyle={{
        background: '#10b981',
        color: '#ffffff',
        fontSize: '14px',
        padding: '12px 30px',
        borderRadius: '8px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        marginRight: '10px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: '#ffffff',
        fontSize: '14px',
        padding: '12px 30px',
        borderRadius: '8px',
        fontWeight: '600',
        border: '1px solid #ffffff',
        cursor: 'pointer',
      }}
      expires={365}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>
          🍪 Wij gebruiken cookies
        </p>
        <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.6', opacity: '0.9' }}>
          Wij gebruiken cookies en vergelijkbare technologieën om je ervaring te verbeteren,
          verkeer te analyseren en advertenties te personaliseren. Door op "Accepteren" te klikken,
          stem je in met het gebruik van deze cookies. Je kunt je keuze op elk moment aanpassen.{' '}
          <a
            href="/privacy-policy"
            style={{ color: '#10b981', textDecoration: 'underline' }}
          >
            Meer informatie
          </a>
        </p>
      </div>
    </CookieConsentLib>
  );
}
