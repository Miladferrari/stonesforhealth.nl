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
    images?: Array<{ src: string }>;
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-900 font-[family-name:var(--font-eb-garamond)]">
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
          <h2 className="text-2xl font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-2">Oeps, er ging iets mis</h2>
          <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600 mb-6">{error || 'Kon je bestelling niet vinden'}</p>
          <Link
            href="/"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-[family-name:var(--font-eb-garamond)] font-medium hover:bg-green-700 transition-colors"
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-[family-name:var(--font-eb-garamond)] font-bold text-gray-900 mb-2">Bedankt voor je bestelling!</h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600">Je betaling is succesvol verwerkt</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-[family-name:var(--font-eb-garamond)] font-semibold text-gray-900 mb-4">Bestelgegevens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600 text-base">Bestelnummer</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900 text-lg">#{orderData.id}</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600 text-base">Status</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-green-600 text-lg">Betaald</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600 text-base">E-mailadres</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900 text-lg">{orderData.customer.email}</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-600 text-base">Totaalbedrag</p>
                <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900 text-lg">€{parseFloat(orderData.total).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-[family-name:var(--font-eb-garamond)] font-semibold text-gray-900 mb-3">Bezorgadres</h3>
            <div className="text-gray-600">
              <p className="font-[family-name:var(--font-eb-garamond)] font-medium text-gray-900 text-lg">{orderData.customer.first_name} {orderData.customer.last_name}</p>
              <p className="font-[family-name:var(--font-eb-garamond)] text-base">{orderData.customer.address_1}</p>
              <p className="font-[family-name:var(--font-eb-garamond)] text-base">{orderData.customer.postcode} {orderData.customer.city}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-eb-garamond)] font-semibold text-gray-900 mb-4">Bestelde producten</h3>
            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {item.images && item.images[0]?.src ? (
                      <div className="w-[90px] h-[90px] relative overflow-hidden rounded-xl border border-gray-100">
                        <Image
                          src={item.images[0].src}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="90px"
                        />
                      </div>
                    ) : (
                      <div className="w-[90px] h-[90px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-100">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-[family-name:var(--font-eb-garamond)] font-semibold text-gray-900 text-base truncate">
                      {item.name}
                    </h4>
                    {item.quantity > 1 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-[family-name:var(--font-eb-garamond)] bg-amber-orange/10 text-amber-orange">
                          {item.quantity}x
                        </span>
                        <span className="font-[family-name:var(--font-eb-garamond)] text-sm text-gray-500">
                          €{parseFloat(item.price).toFixed(2)} per stuk
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end">
                    <p className="font-[family-name:var(--font-eb-garamond)] font-bold text-xl text-gray-900">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-[family-name:var(--font-eb-garamond)] font-semibold text-gray-900 mb-3">Wat gebeurt er nu?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)] text-base">Je ontvangt binnen enkele minuten een bevestigingsmail</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)] text-base">We pakken je bestelling zorgvuldig in</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)] text-base">Zodra je pakket onderweg is, ontvang je een track & trace code</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)] text-base">Binnen 2-3 werkdagen wordt je bestelling bezorgd</span>
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
        <div className="mt-12 text-center text-gray-600">
          <p className="font-[family-name:var(--font-eb-garamond)] text-base">Heb je vragen over je bestelling?</p>
          <p className="font-[family-name:var(--font-eb-garamond)] text-base">Neem contact op via <a href="mailto:info@stonesforhealth.nl" className="text-green-600 hover:underline">info@stonesforhealth.nl</a></p>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-900 font-[family-name:var(--font-eb-garamond)]">Pagina wordt geladen...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}