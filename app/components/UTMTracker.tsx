'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

/**
 * UTM Tracker Component
 * Tracks UTM parameters, referrer, and traffic sources
 * This helps understand where visitors come from and which campaigns work
 */
function UTMTrackerContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Only track on client side
    if (typeof window === 'undefined') return;

    // Get all UTM parameters
    const utmParams = {
      utm_source: searchParams?.get('utm_source'),
      utm_medium: searchParams?.get('utm_medium'),
      utm_campaign: searchParams?.get('utm_campaign'),
      utm_term: searchParams?.get('utm_term'),
      utm_content: searchParams?.get('utm_content'),
    };

    // Check if any UTM parameters exist
    const hasUtmParams = Object.values(utmParams).some(value => value !== null);

    if (hasUtmParams) {
      // Store UTM parameters in sessionStorage (persists during session)
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));

      // Also store in localStorage with timestamp (for longer-term tracking)
      const utmData = {
        params: utmParams,
        timestamp: new Date().toISOString(),
        landing_page: pathname,
      };
      localStorage.setItem('last_utm_data', JSON.stringify(utmData));

      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', 'campaign_visit', {
          campaign_source: utmParams.utm_source,
          campaign_medium: utmParams.utm_medium,
          campaign_name: utmParams.utm_campaign,
          campaign_term: utmParams.utm_term,
          campaign_content: utmParams.utm_content,
        });
      }
    }

    // Track referrer (only on first visit to site)
    const hasTrackedReferrer = sessionStorage.getItem('referrer_tracked');
    if (!hasTrackedReferrer && document.referrer) {
      const referrerData = {
        referrer: document.referrer,
        landing_page: pathname,
        timestamp: new Date().toISOString(),
      };

      sessionStorage.setItem('referrer_data', JSON.stringify(referrerData));
      sessionStorage.setItem('referrer_tracked', 'true');

      // Extract domain from referrer
      let referrerDomain = 'direct';
      try {
        const url = new URL(document.referrer);
        referrerDomain = url.hostname;
      } catch (e) {
        // Invalid URL, keep as 'direct'
      }

      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', 'traffic_source', {
          source: referrerDomain,
          landing_page: pathname,
        });
      }
    }

    // Track page path changes for single-page app behavior
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [searchParams, pathname]);

  return null; // This component doesn't render anything
}

export default function UTMTracker() {
  return (
    <Suspense fallback={null}>
      <UTMTrackerContent />
    </Suspense>
  );
}

// Helper function to get stored UTM parameters
export function getStoredUTMParams() {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem('utm_params');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Helper function to get referrer data
export function getStoredReferrer() {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem('referrer_data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
  return null;
}
