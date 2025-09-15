'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';

interface OrderData {
  id: number;
  order_key: string;
  status: string;
  total: string;
  currency: string;
  customer: {
    email: string;
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const redirectStatus = searchParams.get('redirect_status');
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Check redirect_status first and redirect to payment-failed if needed
  useEffect(() => {
    if (redirectStatus === 'failed' && orderId) {
      // Redirect to payment failed page for failed/cancelled payments
      window.location.href = `/payment-failed?order=${orderId}&reason=payment_failed`;
    } else if (redirectStatus === 'succeeded' && orderId) {
      // Clear cart for successful payments only once
      clearCart();
    }
  }, [redirectStatus, orderId]); // Remove clearCart from dependencies to prevent infinite loop

  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetched) return;

    const fetchOrderData = async () => {
      // Skip fetching if payment failed (will redirect anyway)
      if (redirectStatus === 'failed') {
        setLoading(false);
        return;
      }

      if (!orderId) {
        setError('Geen bestelnummer gevonden');
        setLoading(false);
        return;
      }

      setHasFetched(true); // Mark as fetched

      try {
        // Get order data from session storage
        const storedOrderData = sessionStorage.getItem('orderData');
        
        if (storedOrderData) {
          const data = JSON.parse(storedOrderData);
          if (data.id.toString() === orderId) {
            setOrderData(data);
            // Clear session storage after successful payment
            sessionStorage.removeItem('orderData');
            sessionStorage.removeItem('pendingOrderId');
          }
        }
        
        // If not in session, fetch from API
        if (!storedOrderData) {
          const response = await fetch('/api/check-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
          });

          if (!response.ok) {
            throw new Error('Kon bestelgegevens niet ophalen');
          }

          const result = await response.json();
          if (result.success && result.order) {
            setOrderData(result.order);
          } else {
            throw new Error('Bestelling niet gevonden');
          }
        }
      } catch (err: any) {
        console.error('Error fetching order:', err);
        setError(err.message || 'Er ging iets mis');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, redirectStatus, hasFetched]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mx-auto mb-4"></div>
          <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">
            {redirectStatus === 'failed' ? 'Doorsturen naar betaling mislukt pagina...' : 'Bestelgegevens worden geladen...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    // Check if order data still exists in session - payment might not be completed
    const hasSessionData = sessionStorage.getItem('orderData') && sessionStorage.getItem('pendingOrderId');
    
    if (hasSessionData) {
      // Redirect to payment failed page if we still have order data
      // This means the user likely navigated here without completing payment
      window.location.href = `/payment-failed?order=${orderId || ''}&reason=incomplete`;
      return null;
    }
    
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-[family-name:var(--font-eb-garamond)] text-[#2D2D2D] mb-2">Oeps, er ging iets mis</h2>
          <p className="font-[family-name:var(--font-eb-garamond)] text-[#6b7280] mb-6">{error || 'Kon je bestelling niet vinden'}</p>
          <Link
            href="/"
            className="inline-block bg-[#492c4a] text-white px-6 py-3 rounded-md font-[family-name:var(--font-eb-garamond)] font-medium hover:bg-[#492c4a]/90 transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#492c4a]/10 rounded-full mb-4">
            <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-[family-name:var(--font-eb-garamond)] font-bold text-[#2D2D2D] mb-2">Bedankt voor je bestelling!</h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-[#492c4a]">Je betaling is succesvol verwerkt</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-[family-name:var(--font-eb-garamond)] font-semibold text-[#492c4a] mb-4">Bestelgegevens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600">Bestelnummer</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900">#{orderData.id}</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600">Status</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-[#492c4a]">Betaald</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600">E-mailadres</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900">{orderData.customer.email}</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600">Totaalbedrag</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900">€{parseFloat(orderData.total).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-[family-name:var(--font-eb-garamond)] font-semibold text-[#492c4a] mb-3">Bezorgadres</h3>
            <div className="text-sm text-gray-600">
              <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900">{orderData.customer.first_name} {orderData.customer.last_name}</p>
              <p className="font-[family-name:var(--font-eb-garamond)]">{orderData.customer.address_1}</p>
              <p className="font-[family-name:var(--font-eb-garamond)]">{orderData.customer.postcode} {orderData.customer.city}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-eb-garamond)] font-semibold text-[#492c4a] mb-3">Bestelde producten</h3>
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="font-[family-name:var(--font-eb-garamond)] text-gray-600">
                    {item.name} {item.quantity > 1 && `(${item.quantity}x)`}
                  </span>
                  <span className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900">
                    €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#492c4a]/5 border border-[#492c4a]/20 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-[family-name:var(--font-eb-garamond)] font-semibold text-[#492c4a] mb-3">Wat gebeurt er nu?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#492c4a] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)]">Je ontvangt binnen enkele minuten een bevestigingsmail</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#492c4a] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)]">We pakken je bestelling zorgvuldig in</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#492c4a] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)]">Zodra je pakket onderweg is, ontvang je een track & trace code</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#492c4a] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)]">Binnen 2-3 werkdagen wordt je bestelling bezorgd</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-amber-orange text-black px-8 py-4 rounded-xl font-[family-name:var(--font-eb-garamond)] font-semibold text-lg hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Terug naar website
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white border-2 border-[#492c4a] text-[#492c4a] px-8 py-4 rounded-xl font-[family-name:var(--font-eb-garamond)] font-semibold text-lg hover:bg-[#492c4a] hover:text-white transition-all"
          >
            Contact support
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p className="font-[family-name:var(--font-eb-garamond)]">Heb je vragen over je bestelling?</p>
          <p className="font-[family-name:var(--font-eb-garamond)]">Neem contact op via <a href="mailto:info@stonesforhealth.nl" className="text-[#492c4a] hover:underline">info@stonesforhealth.nl</a></p>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mx-auto mb-4"></div>
          <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Pagina wordt geladen...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}