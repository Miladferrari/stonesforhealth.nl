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
    const checkOrderData = () => {
      const storedOrderData = sessionStorage.getItem('orderData');
      const pendingOrderId = sessionStorage.getItem('pendingOrderId');
      
      if (storedOrderData && pendingOrderId) {
        setHasOrderData(true);
      }
      setIsLoading(false);
    };

    checkOrderData();
  }, []);

  const handleRetryPayment = () => {
    // Check if order data still exists
    const storedOrderData = sessionStorage.getItem('orderData');
    const pendingOrderId = sessionStorage.getItem('pendingOrderId');
    
    if (storedOrderData && pendingOrderId) {
      // Go back to payment page with existing data
      router.push('/checkout/payment');
    } else {
      // No data, start over from cart
      router.push('/cart');
    }
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

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {getErrorMessage()}
          </h1>
          
          <p className="text-gray-600 max-w-md mx-auto">
            {getErrorDescription()}
          </p>
        </div>

        {/* Order info if available */}
        {orderId && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 max-w-sm mx-auto">
            <p className="text-sm text-gray-600 text-center">
              Bestelnummer: <span className="font-medium text-gray-900">#{orderId}</span>
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="max-w-md mx-auto space-y-4">
          {hasOrderData ? (
            <>
              <button
                onClick={handleRetryPayment}
                className="w-full bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Opnieuw proberen
              </button>
              
              <p className="text-center text-sm text-gray-500">
                Je gegevens zijn bewaard, je hoeft ze niet opnieuw in te vullen
              </p>
            </>
          ) : (
            <Link
              href="/cart"
              className="block w-full bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] text-center"
            >
              Terug naar winkelwagen
            </Link>
          )}

          <Link
            href="/"
            className="block w-full bg-white text-gray-700 border-2 border-gray-300 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Verder winkelen
          </Link>
        </div>

        {/* Help section - styled like the rest of the site */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Hulp nodig?</h3>
              <p className="text-sm text-gray-700 mb-3">
                Kom je er niet uit? Onze klantenservice helpt je graag verder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <a 
                  href="mailto:info@stonesforhealth.nl" 
                  className="inline-flex items-center text-medical-green hover:text-medical-green/80 font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@stonesforhealth.nl
                </a>
                <a 
                  href="tel:+31123456789" 
                  className="inline-flex items-center text-medical-green hover:text-medical-green/80 font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Bel ons
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges - bottom of page */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Veilig betalen</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>SSL versleuteld</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>14 dagen bedenktijd</span>
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