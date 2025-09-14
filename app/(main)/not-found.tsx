import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl">🔮</div>
          <div className="text-6xl font-bold text-purple-200 mt-4">404</div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Deze pagina bestaat niet
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          De kristallen hebben ons verteld dat deze pagina niet bestaat. Laten we je terugbrengen naar onze collectie.
        </p>

        {/* Helpful Links */}
        <div className="space-y-6">
          {/* Primary CTA */}
          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Terug naar home
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/cart"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center gap-1"
            >
              Bekijk winkelwagen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Trust Message */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Specialist in noodpakketten sinds 2020</span>
          </div>
        </div>

        {/* Popular Products Suggestion */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-navy-blue mb-6">Populaire producten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <Link href="/product/1" className="group">
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="aspect-square bg-white rounded mb-3 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 group-hover:text-medical-green transition-colors">
                  Basis Noodpakket
                </h3>
              </div>
            </Link>
            
            <Link href="/product/2" className="group">
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="aspect-square bg-white rounded mb-3 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 group-hover:text-medical-green transition-colors">
                  Gezinspakket
                </h3>
              </div>
            </Link>
            
            <Link href="/product/3" className="group">
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="aspect-square bg-white rounded mb-3 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 group-hover:text-medical-green transition-colors">
                  Noodradio
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}