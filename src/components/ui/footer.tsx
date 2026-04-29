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
      {/* Gold top border */}
      <div
        className="absolute top-0 w-full h-1"
        style={{ background: 'linear-gradient(90deg, #c9973a, #f0d080, #c9973a)' }}
      />

      {/* Decorative petals */}
      <div
        className="absolute inset-0 z-0 opacity-5 select-none pointer-events-none"
        style={{ fontSize: '5rem', lineHeight: 1.2 }}
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

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-5 pt-12 pb-10 mx-auto text-center">

        {/* Names — fluid font size so it never overflows */}
        <h2
          className="mb-3 leading-tight"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            color: '#f0d080',
            fontSize: 'clamp(2rem, 10vw, 3.5rem)',
            wordBreak: 'break-word',
          }}
        >
          <span className="italic">{WEDDING.bride}</span>
          <span
            className="mx-2 opacity-70 not-italic"
            style={{ fontSize: 'clamp(1.2rem, 6vw, 2rem)' }}
          >
            &amp;
          </span>
          <span className="italic">{WEDDING.groom}</span>
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center w-full gap-3 mb-7">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #c9973a)' }} />
          <span className="text-xs" style={{ color: '#c9973a' }}>💕</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #c9973a)' }} />
        </div>

        {/* Invitation message */}
        <p
          className="max-w-sm mx-auto mb-8 text-sm leading-relaxed sm:text-base sm:leading-loose"
          style={{ fontFamily: 'Inter, sans-serif', color: '#fde8e0', opacity: 0.88 }}
        >
          {WEDDING.message}
        </p>

        {/* Date badge — inline, never stretches full width */}
        <div
          className="mb-7 px-5 py-2 rounded-full border border-[#c9973a]/50 bg-[#c9973a]/10 backdrop-blur-sm"
          style={{
            color: '#f0d080',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.65rem, 3vw, 0.8rem)',
            letterSpacing: '0.12em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <span>MAY 8TH 2026</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>12:37 PM</span>
        </div>

        {/* Share buttons — auto width, centered row */}
        <div className="flex flex-row flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: '#25D366',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            <svg
              viewBox="0 0 448 512"
              className="w-4 h-4 fill-current shrink-0"
            >
              <path d="M414.73 97.1A222.14 222.14 0 0 0 256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0 0 29.78 111L32 480l118.25-30.87a223.63 223.63 0 0 0 106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 0 0 414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 0 1-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0 1 71.53 254c.05-101.7 83.36-184.65 185.48-184.65a185.89 185.89 0 0 1 131.58 54.52 185.62 185.62 0 0 1 54.5 131.47c-.06 101.71-83.38 184.66-186.15 184.66zm101.69-138.7c-5.57-2.8-33-16.33-38.08-18.22s-8.83-2.8-12.52 2.8-14.4 18.22-17.65 21.94-6.53 4.19-12.1 1.4-23.54-8.68-44.84-27.69c-16.58-14.76-27.76-33-31-38.6s-.35-8.64 2.44-11.4c2.51-2.48 5.57-6.53 8.36-9.8s3.71-5.6 5.57-9.34 1-7-1-9.8-12.52-30.34-17.15-41.54c-4.51-10.95-9.13-9.48-12.52-9.66-3.23-.17-6.93-.19-10.63-.19s-9.74 1.4-14.83 7-19.5 19.12-19.5 46.6 20 54.07 22.77 57.8 39.5 60.36 95.73 84.66c13.4 5.82 23.86 9.3 32 11.9 13.43 4.27 25.68 3.66 35.34 2.2 10.82-1.63 33-13.48 37.66-26.54s4.66-24.23 3.27-26.54-5.06-3.73-10.63-6.53z" />
            </svg>
            Share on WhatsApp
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fde8e0',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
            Copy Link
          </button>
        </div>

        {/* Sign-off */}
        <p
          className="text-xs tracking-wide"
          style={{ fontFamily: 'Inter, sans-serif', color: '#fde8e0', opacity: 0.45 }}
        >
          With love — {WEDDING.bride} &amp; {WEDDING.groom}
        </p>
      </div>
    </footer>
  );
}