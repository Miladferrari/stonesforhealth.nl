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

  // Check redirect_status first and redirect to payment-failed if needed
  useEffect(() => {
    if (redirectStatus === 'failed' && orderId) {
      // Redirect to payment failed page for failed/cancelled payments
      window.location.href = `/payment-failed?order=${orderId}&reason=payment_failed`;
    } else if (redirectStatus !== 'failed' && orderId) {
      // Clear cart for successful payments
      clearCart();
    }
  }, [redirectStatus, orderId, clearCart]);

  useEffect(() => {
    const fetchOrderData = async () => {
      // Skip fetching if payment failed (will redirect anyway)
      if (redirectStatus === 'failed') {
        return;
      }
      
      if (!orderId) {
        setError('Geen bestelnummer gevonden');
        setLoading(false);
        return;
      }

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
        if (!orderData) {
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
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oeps, er ging iets mis</h2>
          <p className="text-gray-600 mb-6">{error || 'Kon je bestelling niet vinden'}</p>
          <Link 
            href="/" 
            className="inline-block bg-medical-green text-white px-6 py-3 rounded-md font-medium hover:bg-medical-green/90 transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bedankt voor je bestelling!</h1>
          <p className="text-lg text-gray-600">Je betaling is succesvol verwerkt</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bestelgegevens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Bestelnummer</p>
                <p className="font-medium text-gray-900">#{orderData.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-medium text-medical-green">Betaald</p>
              </div>
              <div>
                <p className="text-gray-600">E-mailadres</p>
                <p className="font-medium text-gray-900">{orderData.customer.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Totaalbedrag</p>
                <p className="font-medium text-gray-900">€{parseFloat(orderData.total).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Bezorgadres</h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">{orderData.customer.first_name} {orderData.customer.last_name}</p>
              <p>{orderData.customer.address_1}</p>
              <p>{orderData.customer.postcode} {orderData.customer.city}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Bestelde producten</h3>
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} {item.quantity > 1 && `(${item.quantity}x)`}
                  </span>
                  <span className="font-medium text-gray-900">
                    €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Wat gebeurt er nu?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Je ontvangt binnen enkele minuten een bevestigingsmail
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              We pakken je bestelling zorgvuldig in
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Zodra je pakket onderweg is, ontvang je een track & trace code
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Binnen 2-3 werkdagen wordt je bestelling bezorgd
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="inline-block bg-medical-green text-white px-6 py-3 rounded-md font-medium hover:bg-medical-green/90 transition-colors text-center"
          >
            Verder winkelen
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Heb je vragen over je bestelling?</p>
          <p>Neem contact op via <a href="mailto:info@stonesforhealth.nl" className="text-medical-green hover:underline">info@stonesforhealth.nl</a></p>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">Pagina wordt geladen...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}