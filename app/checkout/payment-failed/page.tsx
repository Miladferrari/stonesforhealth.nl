'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentFailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [retryCountdown, setRetryCountdown] = useState(10);

  useEffect(() => {
    // Get order details from session or URL params
    const orderId = searchParams?.get('orderId');
    const sessionOrder = sessionStorage.getItem('currentOrder');

    if (sessionOrder) {
      try {
        const order = JSON.parse(sessionOrder);
        setOrderDetails(order);
      } catch (error) {
        console.error('Failed to parse order details:', error);
      }
    } else if (orderId) {
      // Try to fetch order details
      fetchOrderDetails(orderId);
    }

    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    // Auto-redirect countdown
    if (retryCountdown > 0) {
      const timer = setTimeout(() => {
        setRetryCountdown(retryCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [retryCountdown]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await fetch(`/api/check-order?orderId=${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const handleRetryPayment = () => {
    if (orderDetails?.paymentUrl) {
      window.location.href = orderDetails.paymentUrl;
    } else {
      router.push('/checkout');
    }
  };

  const handleContactSupport = () => {
    router.push('/contact');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#492c4a] text-center mb-4 font-[family-name:var(--font-eb-garamond)]">
            Betaling Mislukt
          </h1>

          <p className="text-center text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Helaas is er iets misgegaan met je betaling. Je bestelling is niet verwerkt.
          </p>

          {/* Order Details (if available) */}
          {orderDetails && (
            <div className="bg-[#F9F7F4] rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-[#492c4a] mb-3">
                Bestelgegevens
              </h2>
              <div className="space-y-2 text-sm">
                {orderDetails.id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bestelnummer:</span>
                    <span className="font-medium">#{orderDetails.id}</span>
                  </div>
                )}
                {orderDetails.total && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Totaalbedrag:</span>
                    <span className="font-medium">
                      €{parseFloat(orderDetails.total).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                {orderDetails.customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">E-mail:</span>
                    <span className="font-medium">{orderDetails.customerEmail}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Possible Reasons */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Mogelijke redenen:</h3>
            <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
              <li>Onvoldoende saldo op je rekening</li>
              <li>Betaling geannuleerd bij je bank</li>
              <li>Technische storing bij de betaalprovider</li>
              <li>Time-out tijdens het betalingsproces</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-[#FAD14C] hover:bg-[#f9c41c] text-[#2D2D2D] font-bold py-3 px-6 rounded-full transition-colors duration-200"
            >
              Probeer Opnieuw
            </button>

            <button
              onClick={() => router.push('/cart')}
              className="w-full bg-white hover:bg-gray-50 text-[#492c4a] font-bold py-3 px-6 rounded-full border-2 border-[#492c4a] transition-colors duration-200"
            >
              Terug naar Winkelwagen
            </button>

            <button
              onClick={handleContactSupport}
              className="w-full text-[#492c4a] hover:text-[#6b4a6c] font-medium py-2 transition-colors duration-200 underline"
            >
              Contact Klantenservice
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Je bestelling is veilig opgeslagen en kan binnen 24 uur worden afgerond.
              Voor vragen kun je contact met ons opnemen via{' '}
              <a
                href="mailto:info@stonesforhealth.nl"
                className="text-[#492c4a] hover:underline"
              >
                info@stonesforhealth.nl
              </a>
            </p>
          </div>

          {/* Auto-retry Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Je wordt automatisch teruggestuurd naar de winkelwagen over{' '}
              <span className="font-semibold">{retryCountdown}</span> seconden
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Veilige betaalomgeving met SSL-encryptie</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}