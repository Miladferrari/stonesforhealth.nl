'use client';

import Image from 'next/image';

interface CollectionHeroProps {
  title?: string;
  discount?: string;
}

export default function CollectionHero({
  title = "EDELSTENEN COLLECTIE",
  discount = "TOT WEL 50% KORTING"
}: CollectionHeroProps) {
  const features = [
    { label: "Authentieke Kwaliteit", icon: "✓" },
    { label: "Energetische Kracht", icon: "⚡" },
    { label: "Spirituele Balans", icon: "☯" },
    { label: "Ethisch Gewonnen", icon: "🌍" }
  ];

  return (
    <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner.png"
          alt="Collection Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 font-[family-name:var(--font-eb-garamond)]">
          {title}
        </h1>

        {/* Discount Badge */}
        <div className="bg-[#fbe022] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 md:mb-6">
          <span className="text-base sm:text-lg md:text-xl font-bold font-[family-name:var(--font-eb-garamond)]">
            {discount}
          </span>
        </div>

        {/* Mobile Features - Compact Grid - Hidden */}
        <div className="hidden">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-md">
              <div className="flex items-center gap-1">
                <span className="text-base">{feature.icon}</span>
                <span className="text-[10px] font-semibold text-gray-800 font-[family-name:var(--font-eb-garamond)]">
                  {feature.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}