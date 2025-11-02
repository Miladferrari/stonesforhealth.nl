'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

export interface PurchaseNotificationData {
  id: string;
  orderId: number;
  customerName: string;
  productName: string;
  timestamp: string;
}

interface PurchaseNotificationContextType {
  notifications: PurchaseNotificationData[];
  dismissNotification: (id: string) => void;
}

const PurchaseNotificationContext = createContext<PurchaseNotificationContextType | undefined>(undefined);

// Polling interval in milliseconds (15 seconden)
const POLL_INTERVAL = 15000;

export function PurchaseNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<PurchaseNotificationData[]>([]);
  const [shownNotificationIds, setShownNotificationIds] = useState<Set<string>>(new Set());
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  /**
   * Haalt nieuwe notificaties op van de server
   */
  const fetchNotifications = useCallback(async () => {
    // Alleen fetchen als component nog gemount is
    if (!isMountedRef.current) return;

    try {
      const response = await fetch('/api/purchase-notifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Voeg cache: 'no-store' toe om caching issues te voorkomen
        cache: 'no-store',
      });

      if (!response.ok) {
        // Stille failure - log alleen in console
        console.warn('Purchase notifications fetch failed:', response.status);
        return;
      }

      const data = await response.json();

      // Check of component nog gemount is voor state updates
      if (!isMountedRef.current) return;

      if (data.success && Array.isArray(data.notifications)) {
        // Filter notificaties die we nog niet hebben getoond
        const newNotifications = data.notifications.filter(
          (notification: PurchaseNotificationData) => !shownNotificationIds.has(notification.id)
        );

        if (newNotifications.length > 0) {
          // Voeg nieuwe notificaties toe aan de lijst
          setNotifications((prev) => {
            // Voeg alleen notificaties toe die nog niet in de lijst zitten
            const existingIds = new Set(prev.map(n => n.id));
            const uniqueNew = newNotifications.filter(
              (n: PurchaseNotificationData) => !existingIds.has(n.id)
            );
            return [...prev, ...uniqueNew];
          });

          // Markeer deze notificaties als getoond
          setShownNotificationIds((prev) => {
            const newSet = new Set(prev);
            newNotifications.forEach((notification: PurchaseNotificationData) => {
              newSet.add(notification.id);
            });
            return newSet;
          });
        }
      }
    } catch (error) {
      // Stille failure - alleen loggen, niet crashen
      if (isMountedRef.current) {
        console.warn('Purchase notifications: Unable to fetch (this is normal if server is starting)');
      }
    }
  }, [shownNotificationIds]);

  /**
   * Verwijdert een notificatie uit de lijst
   */
  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  /**
   * Start polling voor nieuwe notificaties
   */
  useEffect(() => {
    // Zet mounted flag
    isMountedRef.current = true;

    // Wacht 1 seconde voor de eerste fetch (geef server tijd om te starten)
    const initialFetchTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        fetchNotifications();
      }
    }, 1000);

    // Start polling interval
    pollingRef.current = setInterval(() => {
      if (isMountedRef.current) {
        fetchNotifications();
      }
    }, POLL_INTERVAL);

    // Cleanup bij unmount
    return () => {
      isMountedRef.current = false;
      clearTimeout(initialFetchTimeout);
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [fetchNotifications]);

  /**
   * Auto-dismiss notificaties na 10 seconden
   */
  useEffect(() => {
    if (notifications.length === 0) return;

    const timers = notifications.map((notification) => {
      return setTimeout(() => {
        dismissNotification(notification.id);
      }, 10000); // 10 seconden
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, dismissNotification]);

  return (
    <PurchaseNotificationContext.Provider value={{ notifications, dismissNotification }}>
      {children}
    </PurchaseNotificationContext.Provider>
  );
}

export function usePurchaseNotifications() {
  const context = useContext(PurchaseNotificationContext);
  if (!context) {
    throw new Error('usePurchaseNotifications must be used within a PurchaseNotificationProvider');
  }
  return context;
}
