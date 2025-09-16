'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center px-4">
        <div className="text-6xl mb-4">💎</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Er ging iets mis
        </h2>
        <p className="text-gray-600 mb-8">
          Probeer de pagina te vernieuwen
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
        >
          Probeer opnieuw
        </button>
      </div>
    </div>
  );
}