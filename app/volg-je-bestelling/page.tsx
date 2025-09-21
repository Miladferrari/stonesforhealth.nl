'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OrderData {
  id: number;
  orderNumber: string;
  status: string;
  statusInfo: {
    label: string;
    description: string;
    color: string;
    icon: string;
  };
  timeline: Array<{
    step: string;
    label: string;
    date: string;
    completed: boolean;
    active: boolean;
  }>;
  dateCreated: string;
  dateModified: string;
  total: string;
  currency: string;
  paymentMethod: string;
  customer: {
    firstName: string;
    lastName: string;
    city: string;
    postcode: string;
  };
  shipping: {
    method: string;
    total: string;
    address: {
      city: string;
      postcode: string;
      country: string;
    };
  };
  tracking: {
    hasTracking: boolean;
    trackingNumber: string | null;
    carrier: string | null;
    trackingUrl: string | null;
    shipmentDate: string | null;
    estimatedDelivery: string | null;
  };
  items: Array<{
    name: string;
    quantity: number;
    total: string;
    price: string;
    image: string | null;
  }>;
  customerNotes: string | null;
}

export default function TrackOrderPage() {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrderData(null);
    setLoading(true);

    try {
      const response = await fetch('/api/track-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          orderNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Er ging iets mis. Probeer het opnieuw.');
        return;
      }

      if (data.success && data.order) {
        setOrderData(data.order);
      } else {
        setError('Kon de bestelling niet ophalen. Probeer het opnieuw.');
      }
    } catch (err) {
      console.error('Error tracking order:', err);
      setError('Er is een fout opgetreden. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      gray: 'bg-gray-100 text-gray-800 border-gray-300',
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      red: 'bg-red-100 text-red-800 border-red-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return colors[color] || colors.gray;
  };

  const getTimelineStepColor = (completed: boolean, active: boolean) => {
    if (active) return 'bg-amber-orange border-amber-orange';
    if (completed) return 'bg-green-600 border-green-600';
    return 'bg-gray-300 border-gray-300';
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-[family-name:var(--font-eb-garamond)] font-bold text-gray-900 mb-2">
            Volg je bestelling
          </h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600">
            Vul je e-mailadres en bestelnummer in om de status van je bestelling te bekijken
          </p>
        </div>

        {/* Track Form */}
        {!orderData && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-1">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="jouw@email.nl"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-orange focus:border-transparent transition-all font-[family-name:var(--font-eb-garamond)] text-gray-900 bg-white"
                />
              </div>

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-1">
                  Bestelnummer
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  placeholder="12345"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-orange focus:border-transparent transition-all font-[family-name:var(--font-eb-garamond)] text-gray-900 bg-white"
                />
                <p className="mt-1 text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                  Je vindt het bestelnummer in je bevestigingsmail
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-red-700 font-[family-name:var(--font-eb-garamond)]">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-orange text-black py-3 px-6 rounded-xl font-bold font-[family-name:var(--font-eb-garamond)] text-lg hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Zoeken...
                  </span>
                ) : 'Volg Bestelling'}
              </button>
            </form>

            {/* Help Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-[#492c4a] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900">Waar vind ik mijn bestelnummer?</h3>
                    <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)] mt-1">
                      Je bestelnummer staat in de bevestigingsmail die je hebt ontvangen na je aankoop.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-[#492c4a] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900">Geen mail ontvangen?</h3>
                    <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)] mt-1">
                      Check je spam folder of <Link href="/contact" className="text-[#492c4a] hover:text-[#492c4a]/80 hover:underline">neem contact op</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        {orderData && (
          <>
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                    Bestelling #{orderData.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)] mt-1">
                    Geplaatst op {new Date(orderData.dateCreated).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderData(null);
                    setEmail('');
                    setOrderNumber('');
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Current Status */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 font-[family-name:var(--font-eb-garamond)] uppercase tracking-wider mb-2">
                      Huidige Status
                    </p>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{orderData.statusInfo.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                          {orderData.statusInfo.label}
                        </h3>
                        <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                          {orderData.statusInfo.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full border-2 ${getStatusColor(orderData.statusInfo.color)}`}>
                    <span className="font-semibold font-[family-name:var(--font-eb-garamond)]">
                      {orderData.statusInfo.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-6">
                  Voortgang van je bestelling
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    {orderData.timeline.map((step, index) => (
                      <div key={step.step} className="relative flex items-start">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white z-10 ${getTimelineStepColor(step.completed, step.active)}`}>
                          {step.completed ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className={`font-semibold font-[family-name:var(--font-eb-garamond)] ${step.active ? 'text-amber-orange' : step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </h4>
                          <p className="text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                            {step.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tracking Information */}
              {orderData.tracking.hasTracking && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
                    Track & Trace Informatie
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Pakketcode</p>
                      <p className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                        {orderData.tracking.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Vervoerder</p>
                      <p className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                        {orderData.tracking.carrier || 'PostNL'}
                      </p>
                    </div>
                    {orderData.tracking.estimatedDelivery && (
                      <div>
                        <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Verwachte levering</p>
                        <p className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                          {new Date(orderData.tracking.estimatedDelivery).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                    )}
                  </div>
                  {orderData.tracking.trackingUrl ? (
                    <a
                      href={orderData.tracking.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-[family-name:var(--font-eb-garamond)]"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Volg je pakket
                    </a>
                  ) : orderData.tracking.trackingNumber ? (
                    <p className="mt-4 text-sm text-blue-700 font-[family-name:var(--font-eb-garamond)]">
                      Gebruik deze code op de website van {orderData.tracking.carrier || 'de vervoerder'}
                    </p>
                  ) : null}
                </div>
              )}

              {/* Order Items */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
                  Bestelde producten
                </h3>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      {item.image ? (
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                          Aantal: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                        €{parseFloat(item.total).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-6 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-900">
                    <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Verzendkosten</span>
                    <span className="font-semibold font-[family-name:var(--font-eb-garamond)]">
                      €{parseFloat(orderData.shipping.total).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span className="font-[family-name:var(--font-eb-garamond)]">Totaal</span>
                    <span className="font-[family-name:var(--font-eb-garamond)]">
                      €{parseFloat(orderData.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-lg font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
                  Bezorgadres
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900">
                    {orderData.customer.firstName} {orderData.customer.lastName}
                  </p>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    {orderData.customer.postcode} {orderData.customer.city}
                  </p>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    {orderData.shipping.method}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setOrderData(null);
                    setEmail('');
                    setOrderNumber('');
                  }}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold font-[family-name:var(--font-eb-garamond)] hover:bg-gray-300 transition-colors"
                >
                  Andere bestelling zoeken
                </button>
                <Link
                  href="/contact"
                  className="w-full px-6 py-3 bg-[#492c4a] text-white rounded-xl font-semibold font-[family-name:var(--font-eb-garamond)] hover:bg-[#492c4a]/90 transition-colors text-center"
                >
                  Hulp nodig? Contact support
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Trust Badges */}
        <div className="mt-8 mb-8 flex justify-center items-center space-x-8 text-gray-500">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-[family-name:var(--font-eb-garamond)]">Veilig & Betrouwbaar</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-[family-name:var(--font-eb-garamond)]">Privacy Gegarandeerd</span>
          </div>
        </div>
      </div>
    </div>
  );
}