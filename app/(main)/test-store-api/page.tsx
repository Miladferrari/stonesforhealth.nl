'use client';

import { useState, useEffect } from 'react';
import { storeAPI } from '@/lib/woocommerce-store';

export default function TestStoreAPIPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState<any>(null);

  const addResult = (test: string, success: boolean, data: any, error?: any) => {
    setResults(prev => [...prev, {
      test,
      success,
      data,
      error,
      timestamp: new Date().toISOString()
    }]);
  };

  // Test 1: Get Cart (should return empty cart initially)
  const testGetCart = async () => {
    setLoading(true);
    try {
      const cart = await storeAPI.getCart();
      setCartData(cart);
      addResult('GET Cart', true, cart);
    } catch (error: any) {
      addResult('GET Cart', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 2: Add Item to Cart
  const testAddToCart = async () => {
    setLoading(true);
    try {
      // Using product ID 53 from your WooCommerce
      const cart = await storeAPI.addToCart(53, 1);
      setCartData(cart);
      addResult('Add to Cart (Product 53)', true, cart);
    } catch (error: any) {
      addResult('Add to Cart', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 3: Update Customer Info
  const testUpdateCustomer = async () => {
    setLoading(true);
    try {
      const cart = await storeAPI.updateCustomer({
        shipping_address: {
          country: 'NL',
          postcode: '1000AA',
          city: 'Amsterdam'
        }
      });
      setCartData(cart);
      addResult('Update Customer Address', true, cart);
    } catch (error: any) {
      addResult('Update Customer', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 4: Apply Coupon
  const testApplyCoupon = async () => {
    setLoading(true);
    try {
      const cart = await storeAPI.applyCoupon('TEST10');
      setCartData(cart);
      addResult('Apply Coupon TEST10', true, cart);
    } catch (error: any) {
      addResult('Apply Coupon', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 5: Get Shipping Methods
  const testGetShipping = async () => {
    setLoading(true);
    try {
      const shipping = await storeAPI.getShippingMethods();
      addResult('Get Shipping Methods', true, shipping);
    } catch (error: any) {
      addResult('Get Shipping', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 6: Get Payment Methods
  const testGetPaymentMethods = async () => {
    setLoading(true);
    try {
      const methods = await storeAPI.getPaymentMethods();
      addResult('Get Payment Methods', true, methods);
    } catch (error: any) {
      addResult('Get Payment Methods', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 7: Clear Cart
  const testClearCart = async () => {
    setLoading(true);
    try {
      const cart = await storeAPI.clearCart();
      setCartData(cart);
      addResult('Clear Cart', true, cart);
    } catch (error: any) {
      addResult('Clear Cart', false, null, error.message);
    }
    setLoading(false);
  };

  // Test 8: Get Countries
  const testGetCountries = async () => {
    setLoading(true);
    try {
      const countries = await storeAPI.getCountries();
      addResult('Get Countries', true, countries);
    } catch (error: any) {
      addResult('Get Countries', false, null, error.message);
    }
    setLoading(false);
  };

  // Run basic test on mount
  useEffect(() => {
    testGetCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">WooCommerce Store API Test Page</h1>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={testGetCart}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Get Cart
            </button>
            <button
              onClick={testAddToCart}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Add to Cart
            </button>
            <button
              onClick={testUpdateCustomer}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Update Customer
            </button>
            <button
              onClick={testApplyCoupon}
              disabled={loading}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              Apply Coupon
            </button>
            <button
              onClick={testGetShipping}
              disabled={loading}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
            >
              Get Shipping
            </button>
            <button
              onClick={testGetPaymentMethods}
              disabled={loading}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50"
            >
              Payment Methods
            </button>
            <button
              onClick={testGetCountries}
              disabled={loading}
              className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 disabled:opacity-50"
            >
              Get Countries
            </button>
            <button
              onClick={testClearCart}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Current Cart State */}
        {cartData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Cart State</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Items Count:</p>
                <p className="text-lg font-semibold">{cartData.items_count || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Price:</p>
                <p className="text-lg font-semibold">
                  {cartData.totals?.currency_symbol || '€'}
                  {cartData.totals?.total_price ? (parseInt(cartData.totals.total_price) / 100).toFixed(2) : '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Needs Payment:</p>
                <p className="text-lg font-semibold">{cartData.needs_payment ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Needs Shipping:</p>
                <p className="text-lg font-semibold">{cartData.needs_shipping ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {cartData.items && cartData.items.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Cart Items:</h3>
                <div className="space-y-2">
                  {cartData.items.map((item: any) => (
                    <div key={item.key} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} |
                        Price: {item.prices?.currency_symbol}{(parseInt(item.prices?.price || 0) / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-gray-500">No tests run yet. Click a button above to test.</p>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{result.test}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {result.success ? 'SUCCESS' : 'FAILED'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{result.timestamp}</p>

                  {result.error && (
                    <div className="bg-red-100 p-2 rounded mb-2">
                      <p className="text-sm text-red-700">Error: {result.error}</p>
                    </div>
                  )}

                  {result.data && (
                    <details className="cursor-pointer">
                      <summary className="text-sm text-gray-600 hover:text-gray-800">
                        View Response Data
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">ℹ️ Store API Information</h2>
          <p className="text-sm text-blue-800 mb-2">
            This page tests the WooCommerce Store API v1 endpoints for cart management and checkout.
          </p>
          <p className="text-sm text-blue-800 mb-2">
            Base URL: {process.env.NEXT_PUBLIC_WOOCOMMERCE_URL?.replace('/wp-json/wc/v3', '')}/wp-json/wc/store/v1
          </p>
          <p className="text-sm text-blue-700">
            Note: Store API requires session handling via cookies. Some endpoints may require authentication.
          </p>
        </div>
      </div>
    </div>
  );
}