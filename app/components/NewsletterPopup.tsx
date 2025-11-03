'use client';

import { useState, useEffect } from 'react';

interface NewsletterPopupProps {
  onClose: () => void;
}

export default function NewsletterPopup({ onClose }: NewsletterPopupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Disable scrolling when popup is open
  useEffect(() => {
    // Save current styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Get scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Disable scrolling on both body and html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Add padding to prevent layout shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan');
      }

      // Success!
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden. Probeer het later opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#faf8f4] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-2 border-[#492c4a]/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#492c4a] hover:text-[#6b4069] transition-all z-10 flex items-center justify-center shadow-sm"
          aria-label="Sluiten"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {!isSuccess ? (
          <div className="p-6 sm:p-8 md:p-10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#492c4a]/5 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#fbe022]/10 to-transparent rounded-full blur-2xl"></div>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#492c4a] mb-2 sm:mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ontvang €10 Korting!
              </h2>
              <p className="text-sm sm:text-base text-[#3b223b]/80 font-medium max-w-sm mx-auto px-2">
                Schrijf je in voor onze nieuwsbrief en ontvang direct een unieke kortingscode van €10.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 relative">
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">
                  E-mailadres
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  className="w-full px-5 py-4 bg-white border-2 border-[#492c4a]/20 rounded-xl focus:ring-2 focus:ring-[#492c4a] focus:border-[#492c4a] transition-all text-[#3b223b] placeholder:text-gray-400 shadow-sm"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#fbe022] hover:bg-[#e6cc1f] text-black font-bold py-3 sm:py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-[family-name:var(--font-eb-garamond)] text-base sm:text-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bezig...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="hidden sm:inline">Ontvang mijn €10 korting</span>
                    <span className="sm:hidden">Ontvang €10 korting</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-[#492c4a]/10">
                <p className="text-xs text-[#3b223b]/70 text-center leading-relaxed">
                  ✨ Minimale besteding van €25 vereist<br />
                  ⏰ Kortingscode is 30 dagen geldig
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 md:p-10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#fbe022]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#492c4a]/5 to-transparent rounded-full blur-2xl"></div>

            {/* Success state */}
            <div className="text-center relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#492c4a] to-[#6b4069] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[#fbe022]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#492c4a] mb-2 sm:mb-3 font-[family-name:var(--font-eb-garamond)]">
                Check je inbox! 📧
              </h2>
              <p className="text-sm sm:text-base text-[#3b223b]/80 font-medium mb-6 sm:mb-8 px-2">
                We hebben je kortingscode van €10 naar <span className="font-bold text-[#492c4a]">{email}</span> verzonden.
              </p>

              {/* Email info card */}
              <div className="bg-gradient-to-br from-white to-[#fbe022]/5 border-2 border-[#fbe022] rounded-2xl p-5 sm:p-6 md:p-8 mb-5 sm:mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbe022]/10 rounded-full blur-2xl"></div>
                <div className="relative space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-[#492c4a] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-bold text-[#492c4a] text-sm sm:text-base">Open je email</p>
                      <p className="text-xs sm:text-sm text-[#3b223b]/70">Controleer ook je spam/promotie folder</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-[#492c4a] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-bold text-[#492c4a] text-sm sm:text-base">Kopieer je unieke code</p>
                      <p className="text-xs sm:text-sm text-[#3b223b]/70">De code is persoonlijk voor jou</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-[#492c4a] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-bold text-[#492c4a] text-sm sm:text-base">Gebruik bij het afrekenen</p>
                      <p className="text-xs sm:text-sm text-[#3b223b]/70">Bij minimale besteding van €25</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6 border border-[#492c4a]/10">
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#3b223b]">
                  <p className="flex items-center justify-center gap-2 sm:gap-3 font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#492c4a] text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    <span>€10 korting op je bestelling</span>
                  </p>
                  <p className="flex items-center justify-center gap-2 sm:gap-3 font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#492c4a] text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    <span>Minimale besteding: €25</span>
                  </p>
                  <p className="flex items-center justify-center gap-2 sm:gap-3 font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#492c4a] text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    <span>Geldig voor 30 dagen</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#fbe022] hover:bg-[#e6cc1f] text-black font-bold py-3 sm:py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-[family-name:var(--font-eb-garamond)] text-base sm:text-lg inline-flex items-center justify-center gap-2"
              >
                Start met winkelen
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
