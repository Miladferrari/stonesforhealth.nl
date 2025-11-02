'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NewsletterPopup from './NewsletterPopup';

const STORAGE_KEY = 'newsletter_popup_shown';
const DELAY_MS = 5000; // 5 seconden wachttijd voor de popup

export default function NewsletterPopupContainer() {
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check of we op een product pagina zijn
    const isProductPage = pathname?.startsWith('/product/');

    // Check of popup al eerder is getoond
    const hasSeenPopup = localStorage.getItem(STORAGE_KEY);

    // Als de gebruiker de popup al heeft gezien, of als we op een product pagina zijn, toon dan niet
    if (hasSeenPopup || isProductPage) {
      return;
    }

    // Wacht X seconden voordat de popup wordt getoond
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    // Sla op in localStorage dat de gebruiker de popup heeft gezien
    localStorage.setItem(STORAGE_KEY, 'true');
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return <NewsletterPopup onClose={handleClose} />;
}
