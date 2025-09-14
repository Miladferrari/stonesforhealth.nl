'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
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
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Er is iets misgegaan
        </h2>
        <p className="text-gray-600 mb-8">
          We hebben een onverwachte fout ondervonden. Probeer het opnieuw.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Probeer opnieuw
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-colors"
          >
            Naar home
          </Link>
        </div>
      </div>
    </div>
  );
}