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
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Er is een fout opgetreden
            </h2>
            <p className="text-gray-600 mb-8">
              De applicatie heeft een onverwachte fout ondervonden.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#492c4a] text-white rounded-full hover:bg-[#6b4069] transition-all"
            >
              Probeer opnieuw
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}