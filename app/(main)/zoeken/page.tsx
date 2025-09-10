import { Suspense } from 'react';
import SearchPage from './SearchPage';

function SearchLoading() {
  return (
    <div className="min-h-screen bg-off-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy-blue mb-4">Zoekresultaten</h1>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green"></div>
          <p className="mt-4 text-steel-gray">Laden...</p>
        </div>
      </div>
    </div>
  );
}

export default function ZoekenPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPage />
    </Suspense>
  );
}