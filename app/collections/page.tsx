'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CollectionsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to all products collection by default
    router.push('/collections/all');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a]"></div>
    </div>
  );
}