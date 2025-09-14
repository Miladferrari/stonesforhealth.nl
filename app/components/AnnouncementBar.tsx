export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#3b223b] to-[#4d2e4d] hidden md:block">
      <div className="flex justify-center items-center space-x-8 text-white py-3 px-4 mx-auto">
        {/* USP 1 */}
        <div className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Gratis verzending vanaf €50</span>
        </div>
        
        <span className="text-white/30">•</span>
        
        {/* USP 2 */}
        <div className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-white/90" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Al 1000+ tevreden klanten</span>
        </div>
        
        <span className="text-white/30">•</span>
        
        {/* USP 3 */}
        <div className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm font-light tracking-wide font-[family-name:var(--font-eb-garamond)]">Persoonlijk advies</span>
        </div>
      </div>
    </div>
  );
}