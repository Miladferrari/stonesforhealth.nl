'use client';

import React from 'react';
import { usePurchaseNotifications } from '../contexts/PurchaseNotificationContext';
import PurchaseNotification from './PurchaseNotification';

/**
 * Container voor purchase notifications
 * Rendert notificaties linksonder op de pagina
 */
export default function PurchaseNotificationContainer() {
  const { notifications, dismissNotification } = usePurchaseNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 space-y-3 pointer-events-none">
      <div className="space-y-3 pointer-events-auto">
        {notifications.map((notification) => (
          <PurchaseNotification
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </div>
  );
}
