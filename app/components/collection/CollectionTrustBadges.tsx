'use client';

export default function CollectionTrustBadges() {
  const badges = [
    {
      icon: (
        <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% Authentiek",
      subtitle: "Gecertificeerde edelstenen"
    },
    {
      icon: (
        <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Energetisch Geladen",
      subtitle: "Direct klaar voor gebruik"
    },
    {
      icon: (
        <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Gratis Verzending",
      subtitle: "Vanaf €30"
    },
    {
      icon: (
        <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "30 Dagen Garantie",
      subtitle: "Niet goed, geld terug"
    }
  ];

  return (
    <div className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {badge.icon}
              <div>
                <p className="text-sm lg:text-base font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">
                  {badge.title}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}