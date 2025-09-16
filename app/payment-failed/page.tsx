'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order');
  const reason = searchParams.get('reason') || 'cancelled';
  const [hasOrderData, setHasOrderData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we still have order data in session storage
    const checkOrderData = async () => {
      const storedOrderData = sessionStorage.getItem('orderData');
      const pendingOrderId = sessionStorage.getItem('pendingOrderId');

      if (storedOrderData && pendingOrderId) {
        setHasOrderData(true);

        // Only update order status if user doesn't retry payment
        // This allows order to be reused for retry attempts
        // Status will be updated on successful payment or when user gives up
      }
      setIsLoading(false);
    };

    checkOrderData();
  }, [orderId, reason]);

  const handleRetryPayment = () => {
    // Check if order data still exists
    const storedOrderData = sessionStorage.getItem('orderData');
    const pendingOrderId = sessionStorage.getItem('pendingOrderId');

    if (storedOrderData && pendingOrderId) {
      // Go back to checkout page to retry payment
      // Order will be reused
      router.push('/checkout');
    } else {
      // No data, start over from cart
      router.push('/cart');
    }
  };

  const handleAbandonOrder = async () => {
    // Update order status when user explicitly abandons
    if (orderId) {
      try {
        await fetch('/api/update-order-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderId,
            status: 'cancelled',
            note: 'Customer abandoned payment'
          }),
        });
      } catch (error) {
        console.error('Error updating abandoned order:', error);
      }
    }

    // Clear session data and go to shop
    sessionStorage.removeItem('orderData');
    sessionStorage.removeItem('pendingOrderId');
    router.push('/alle-producten');
  };

  const getErrorMessage = () => {
    switch(reason) {
      case 'cancelled':
        return 'Je hebt de betaling geannuleerd';
      case 'failed':
        return 'De betaling is mislukt';
      case 'expired':
        return 'De betaling is verlopen';
      default:
        return 'Er ging iets mis met de betaling';
    }
  };

  const getErrorDescription = () => {
    switch(reason) {
      case 'cancelled':
        return 'Geen probleem! Je bestelling staat nog klaar. Je kunt het opnieuw proberen wanneer je wilt.';
      case 'failed':
        return 'Er was een probleem met het verwerken van je betaling. Controleer je gegevens en probeer het opnieuw.';
      case 'expired':
        return 'Je betaling sessie is verlopen. Klik hieronder om het opnieuw te proberen.';
      default:
        return 'We konden je betaling niet verwerken. Probeer het opnieuw of neem contact met ons op.';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">Even geduld...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Icon and message section */}
        <div className="text-center mb-8">
          {reason === 'cancelled' ? (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}

          <h1 className="text-3xl font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-3">
            {getErrorMessage()}
          </h1>

          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600 max-w-md mx-auto">
            {getErrorDescription()}
          </p>
        </div>

        {/* Order info if available */}
        {orderId && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 max-w-sm mx-auto">
            <p className="text-base font-[family-name:var(--font-eb-garamond)] text-gray-600 text-center">
              Bestelnummer: <span className="font-semibold text-gray-900">#{orderId}</span>
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="max-w-md mx-auto space-y-4">
          {hasOrderData ? (
            <>
              <button
                onClick={handleRetryPayment}
                className="w-full bg-amber-orange text-black py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] flex items-center justify-center font-[family-name:var(--font-eb-garamond)] text-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Opnieuw proberen
              </button>
              
              <p className="text-center text-base font-[family-name:var(--font-eb-garamond)] text-gray-500">
                Je gegevens zijn bewaard, je hoeft ze niet opnieuw in te vullen
              </p>
            </>
          ) : (
            <Link
              href="/cart"
              className="block w-full bg-amber-orange text-black py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] text-center font-[family-name:var(--font-eb-garamond)] text-xl"
            >
              Terug naar winkelwagen
            </Link>
          )}

          <button
            onClick={handleAbandonOrder}
            className="block w-full bg-white text-gray-700 border-2 border-gray-300 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors text-center font-[family-name:var(--font-eb-garamond)] text-lg"
          >
            Verder winkelen
          </button>
        </div>

        {/* Trust badges - bottom of page */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-base font-[family-name:var(--font-eb-garamond)] text-gray-600">Veilig betalen</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-base font-[family-name:var(--font-eb-garamond)] text-gray-600">SSL versleuteld</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span className="text-base font-[family-name:var(--font-eb-garamond)] text-gray-600">14 dagen bedenktijd</span>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">Pagina wordt geladen...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}