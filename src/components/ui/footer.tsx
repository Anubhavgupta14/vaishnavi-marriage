'use client';

import { WEDDING } from '@/lib/constants';

export default function Footer() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `You're invited to the wedding of ${WEDDING.bride} & ${WEDDING.groom}! 💕 ${typeof window !== 'undefined' ? window.location.href : ''}`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch {
      /* ignore */
    }
  };

  return (
    <footer
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#7a1a2e', color: '#fffaf5' }}
    >
      {/* Gold top border - fixed strictly to the top edge */}
      <div 
        className="absolute top-0 w-full h-1" 
        style={{ background: 'linear-gradient(90deg, #c9973a, #f0d080, #c9973a)' }} 
      />

      {/* Decorative petals with z-0 to prevent event blocking */}
      <div
        className="absolute inset-0 z-0 opacity-5 select-none pointer-events-none"
        style={{ fontSize: '6rem', lineHeight: 1.2 }}
        aria-hidden="true"
      >
        {['🌸', '🌺', '🏵️', '🌼'].map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: `${10 + i * 20}%`,
              left: `${5 + i * 22}%`,
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Content wrapper with z-10 */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 py-16 mx-auto text-center">
        
        {/* Names */}
        <h2
          className="mb-3 text-5xl tracking-wide md:text-6xl"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f0d080' }}
        >
          <span className="italic">{WEDDING.bride}</span> 
          <span className="mx-3 text-3xl opacity-70 md:text-4xl">&amp;</span> 
          <span className="italic">{WEDDING.groom}</span>
        </h2>

        {/* Improved Divider */}
        <div className="flex items-center justify-center w-full gap-4 mb-8">
          <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-[#c9973a]" />
          <span className="text-sm text-[#c9973a]">💕</span>
          <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-[#c9973a]" />
        </div>

        {/* Invitation message */}
        <p
          className="max-w-xl mx-auto mb-10 text-base font-light leading-relaxed md:text-lg md:leading-loose text-[#fde8e0]/90"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {WEDDING.message}
        </p>

        {/* Action Section: Grouped Date and Buttons */}
        <div className="flex flex-col items-center w-full gap-6 mb-12">
          
          {/* Enhanced Date Badge */}
          <div 
            className="inline-block px-8 py-2.5 rounded-full border border-[#c9973a]/50 bg-[#c9973a]/10 backdrop-blur-sm" 
            style={{ color: '#f0d080', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.15em' }}
          >
            MAY 8TH 2026 <span className="mx-2 opacity-50">|</span> 12:37 PM
          </div>

          {/* Share buttons */}
          <div className="flex flex-col items-center w-full gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center w-full gap-2.5 px-6 py-3 text-sm font-medium transition-transform duration-300 rounded-full shadow-sm sm:w-auto hover:-translate-y-1 hover:shadow-lg"
              style={{ background: '#25D366', color: '#fff', fontFamily: 'Inter, sans-serif' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.524 5.832L0 24l6.345-1.498A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.358-.213-3.773.891.95-3.669-.234-.376A9.818 9.818 0 112 12c0 5.414 4.404 9.818 9.818 9.818H12z"/>
              </svg>
              <span>Share on WhatsApp</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center w-full gap-2.5 px-6 py-3 text-sm font-medium transition-transform duration-300 rounded-full sm:w-auto hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fde8e0',
                border: '1px solid rgba(255,255,255,0.2)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Footer sign-off */}
        <p
          className="mt-4 text-sm tracking-wide text-white/50"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          With love — {WEDDING.bride} &amp; {WEDDING.groom}
        </p>
      </div>
    </footer>
  );
}