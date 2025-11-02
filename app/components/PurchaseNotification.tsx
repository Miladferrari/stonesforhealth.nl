'use client';

import React from 'react';
import { PurchaseNotificationData } from '../contexts/PurchaseNotificationContext';

interface PurchaseNotificationProps {
  notification: PurchaseNotificationData;
  onDismiss: (id: string) => void;
}

export default function PurchaseNotification({ notification, onDismiss }: PurchaseNotificationProps) {
  const { id, customerName, productName } = notification;

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-lg border bg-white border-gray-200 shadow-lg backdrop-blur-sm animate-slideIn max-w-sm"
      role="alert"
    >
      {/* Shopping bag icon */}
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 mb-0.5">
          {customerName}
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          heeft zojuist <span className="font-medium text-gray-900">{productName}</span> gekocht
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Sluiten"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
