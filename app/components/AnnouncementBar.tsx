export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#3b223b] to-[#4d2e4d]">
      {/* Mobile view - single rotating USP */}
      <div className="md:hidden flex justify-center items-center text-white py-2.5 px-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Verzending in Nederland en België</span>
        </div>
      </div>

      {/* Desktop view - all 3 USPs */}
      <div className="hidden md:flex justify-center items-center space-x-8 text-white py-3 px-4 mx-auto">
        {/* USP 1 */}
        <div className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Verzending in Nederland en België</span>
        </div>

        <span className="text-white/30">•</span>

        {/* USP 2 */}
        <div className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-white/90" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Al 3000+ tevreden klanten</span>
        </div>

        <span className="text-white/30">•</span>

        {/* USP 3 */}
        <div className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <span className="text-sm font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Vind jouw persoonlijke steen - Quiz</span>
        </div>
      </div>
    </div>
  );
}