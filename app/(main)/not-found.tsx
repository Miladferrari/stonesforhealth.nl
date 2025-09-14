import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Large 404 Number */}
        <div className="mb-12">
          <h1 className="text-[120px] md:text-[160px] font-light text-[#492c4a]/10 leading-none font-[family-name:var(--font-eb-garamond)]">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-light text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
          Pagina niet gevonden
        </h2>

        <p className="text-base text-[#492c4a]/70 mb-12 max-w-sm mx-auto leading-relaxed font-[family-name:var(--font-eb-garamond)]">
          Deze pagina bestaat niet meer of is verplaatst naar een andere locatie.
        </p>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-10 py-3.5 bg-[#492c4a] text-white text-sm rounded-full hover:bg-[#492c4a]/90 transition-all duration-300 font-semibold uppercase tracking-wider"
          >
            Terug naar home
          </Link>

          <div className="flex items-center justify-center gap-6 mt-8">
            <Link
              href="/shop"
              className="text-sm text-[#492c4a]/60 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]"
            >
              Shop
            </Link>
            <span className="text-[#492c4a]/20">•</span>
            <Link
              href="/over-ons"
              className="text-sm text-[#492c4a]/60 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]"
            >
              Over ons
            </Link>
            <span className="text-[#492c4a]/20">•</span>
            <Link
              href="/contact"
              className="text-sm text-[#492c4a]/60 hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-20">
          <div className="w-12 h-0.5 bg-[#492c4a]/10 mx-auto mb-6"></div>
          <p className="text-xs text-[#492c4a]/30 uppercase tracking-widest">
            Stones for Health
          </p>
        </div>
      </div>
    </div>
  );
}