'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContextStoreAPI';

export default function CartRecoveryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items, addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('Ongeldige recovery link');
      setLoading(false);
      return;
    }

    async function recoverCart() {
      try {
        const response = await fetch(`/api/abandoned-cart/recover?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to recover cart');
        }

        // Add items back to cart
        const cartItems = JSON.parse(data.cart.cart_data);

        for (const item of cartItems) {
          // Fetch product from WooCommerce
          const productResponse = await fetch(`/api/products/${item.product_id}`);
          if (productResponse.ok) {
            const product = await productResponse.json();

            // Add to cart with bundle info if available
            const bundleInfo = item.bundleType ? {
              type: item.bundleType,
              discount: item.bundleDiscount || 0,
              totalPrice: item.bundlePrice || 0
            } : undefined;

            addToCart(product, item.quantity, bundleInfo);
          }
        }

        // Mark cart as recovered
        await fetch('/api/abandoned-cart/save', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.cart.customer_email
          })
        });

        // Redirect to checkout after 1 second
        setTimeout(() => {
          router.push('/checkout');
        }, 1000);

      } catch (err) {
        console.error('Cart recovery error:', err);
        setError('Er is iets misgegaan bij het herstellen van je winkelwagen');
        setLoading(false);
      }
    }

    recoverCart();
  }, [searchParams, router, addToCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#492c4a] mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
            Je winkelwagen wordt hersteld...
          </h1>
          <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
            Een moment geduld
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Oeps!
            </h1>
            <p className="text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">
              {error}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-[#fbe022] hover:bg-[#e6cc1f] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 font-[family-name:var(--font-eb-garamond)]"
            >
              Terug naar home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
          Winkelwagen hersteld!
        </h1>
        <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
          Je wordt doorgestuurd naar de checkout...
        </p>
      </div>
    </div>
  );
}
