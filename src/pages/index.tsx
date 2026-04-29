import Head from 'next/head';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import CountdownTimer from '@/components/ui/countdown-timer';
import EventCards from '@/components/ui/event-cards';
import VenueMap from '@/components/ui/venue-map';

// ─── SVG Mandap Illustration ─────────────────────────────────────────────────

function MandapSVG() {
  return (
    <svg
      className="mandap-svg"
      viewBox="0 0 700 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ground */}
      <rect x="0" y="240" width="700" height="20" rx="4" fill="#f0cfc0" />

      {/* Left pillar */}
      <rect x="90" y="80" width="22" height="160" rx="6" fill="#c9973a" />
      <rect x="82" y="68" width="38" height="18" rx="5" fill="#e0b050" />
      {/* Pillar flowers left */}
      <circle cx="101" cy="60" r="10" fill="#9b2335" />
      <circle cx="101" cy="60" r="6" fill="#c9973a" />

      {/* Right pillar */}
      <rect x="588" y="80" width="22" height="160" rx="6" fill="#c9973a" />
      <rect x="580" y="68" width="38" height="18" rx="5" fill="#e0b050" />
      {/* Pillar flowers right */}
      <circle cx="599" cy="60" r="10" fill="#9b2335" />
      <circle cx="599" cy="60" r="6" fill="#c9973a" />

      {/* Arch */}
      <path
        d="M 90 80 Q 350 -30 610 80"
        stroke="#c9973a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hanging marigold garland */}
      {Array.from({ length: 15 }, (_, i) => {
        const t = i / 14;
        const x = 100 + t * 500;
        const y = 70 + Math.sin(t * Math.PI) * 60 - Math.sin(t * Math.PI) * 30 + 20;
        return (
          <g key={i}>
            <circle cx={x} cy={y + 10} r="6" fill="#e07830" opacity="0.9" />
            <circle cx={x} cy={y + 10} r="3.5" fill="#f0a048" />
          </g>
        );
      })}

      {/* Draping fabric */}
      <path
        d="M 100 90 Q 350 160 600 90 L 600 100 Q 350 170 100 100 Z"
        fill="#7a1a2e"
        opacity="0.15"
      />
      <path
        d="M 100 90 Q 350 160 600 90"
        stroke="#9b2335"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />

      {/* Sacred fire */}
      <ellipse cx="350" cy="230" rx="28" ry="8" fill="#f0cfc0" />
      <rect x="335" y="200" width="30" height="30" rx="2" fill="#c9973a" opacity="0.5" />
      {/* Flames */}
      <path d="M350 200 Q340 185 350 170 Q358 185 350 200" fill="#e07830" opacity="0.9" />
      <path d="M350 200 Q342 188 348 175 Q356 188 350 200" fill="#f0a048" />
      <path d="M350 200 Q344 190 350 178 Q356 190 350 200" fill="#ffd080" opacity="0.8" />

      {/* Bride silhouette (right of fire) */}
      {/* Body */}
      <ellipse cx="395" cy="220" rx="18" ry="30" fill="#9b2335" opacity="0.6" />
      {/* Saree drape detail */}
      <path d="M378 220 Q395 200 412 220" stroke="#c9973a" strokeWidth="1.5" fill="none" opacity="0.6"/>
      {/* Head */}
      <circle cx="395" cy="180" r="12" fill="#c9973a" opacity="0.5" />
      {/* Dupatta/veil */}
      <path d="M384 185 Q390 170 405 178" stroke="#7a1a2e" strokeWidth="2" fill="none" opacity="0.5" />

      {/* Groom silhouette (left of fire) */}
      <ellipse cx="305" cy="218" rx="16" ry="32" fill="#5a1020" opacity="0.55" />
      {/* Sherwani detail */}
      <path d="M290 210 Q305 200 320 210" stroke="#c9973a" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Head */}
      <circle cx="305" cy="178" r="12" fill="#7a1a2e" opacity="0.5" />
      {/* Turban */}
      <path d="M295 174 Q305 165 315 174 Q305 168 295 174Z" fill="#c9973a" opacity="0.6"/>

      {/* Flower petals scattered */}
      {[
        [160, 235], [200, 238], [480, 233], [530, 237], [250, 242], [440, 241],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 30})`}>
          <ellipse rx="5" ry="3" fill="#f0cfc0" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

// ─── Hanging Rings ────────────────────────────────────────────────────────────

function HangingRings() {
  const rings = [
    { left: '35%', delay: 0 },
    { left: '50%', delay: 0.3 },
    { left: '65%', delay: 0.6 },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none" aria-hidden="true">
      {rings.map((ring, i) => (
        <div
          key={i}
          className="ring-string absolute top-0 flex flex-col items-center"
          style={{ left: ring.left, animationDelay: `${ring.delay}s` }}
        >
          {/* String */}
          <div style={{ width: '2px', height: '60px', background: 'linear-gradient(180deg, #c9973a88, #c9973a)' }} />
          {/* Outer ring */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '3px solid #c9973a',
              background: 'linear-gradient(135deg, rgba(201,151,58,0.15), rgba(201,151,58,0.05))',
              boxShadow: '0 0 18px rgba(201,151,58,0.4), inset 0 0 8px rgba(201,151,58,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Inner ring */}
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                border: '2px solid #e0b050',
                background: 'rgba(201,151,58,0.1)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fff5f0 0%, #fde8e0 40%, #f9d5c5 100%)',
      }}
    >
      {/* Hanging rings */}
      <HangingRings />

      {/* Decorative gold circles bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '-8%',
            width: '35vw',
            height: '35vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122,26,46,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 pt-28 pb-8 max-w-4xl mx-auto">
        
        {/* Lord Ganesha Icon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center mb-5"
        >
          <Image
            src="/ganesh.png" // Make sure this image exists in your /public folder
            alt="Shri Ganeshay Namah"
            width={84}
            height={84}
            className="object-contain drop-shadow-md"
            priority
          />
        </motion.div>

        {/* Invite subtitle */}
        <motion.p
          className="text-sm tracking-[0.35em] uppercase mb-6"
          style={{ color: '#c9973a', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          We cordially invite you
        </motion.p>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          <h1
            className="leading-none mb-2"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 500,
            }}
          >
            <span
              className="block"
              style={{
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                color: '#7a1a2e',
                lineHeight: 1.05,
              }}
            >
              Vaishnavi
            </span>
            <span
              className="block"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                color: '#c9973a',
                letterSpacing: '0.3em',
                fontStyle: 'normal',
                fontWeight: 400,
                margin: '-10px 0',
              }}
            >
              &amp;
            </span>
            <span
              className="block"
              style={{
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                color: '#7a1a2e',
                lineHeight: 1.05,
              }}
            >
              Sumeet
            </span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex justify-center items-center gap-4 my-7"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, #c9973a)' }} />
          <span style={{ color: '#c9973a', fontSize: '1.2rem' }}>✦ 💕 ✦</span>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, #c9973a, transparent)' }} />
        </motion.div>

        {/* Invite message */}
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-xl mx-auto"
          style={{ color: '#5a3040', fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Join us for the celebration of our wedding
        </motion.p>

        {/* Date badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-10"
          style={{
            background: '#7a1a2e',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            boxShadow: '0 4px 24px rgba(122,26,46,0.35)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span>🗓️</span>
          <span>MAY 8TH 2026</span>
          <span style={{ color: '#c9973a' }}>·</span>
          <span>12:37 PM</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #c9973a 0%, #e0b050 100%)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(201,151,58,0.4)',
            }}
          >
            📸 View Gallery
          </Link>
          <Link
            href="/venue"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(122,26,46,0.08)',
              color: '#7a1a2e',
              border: '1.5px solid rgba(122,26,46,0.2)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            📍 Venue & Directions
          </Link>
        </motion.div>
      </div>

      {/* Mandap SVG illustration */}
      <motion.div
        className="relative z-10 w-full px-4 mt-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        style={{ maxWidth: '700px', margin: '0 auto' }}
      >
        <MandapSVG />
      </motion.div>
    </section>
  );
}

// ─── Parallax Image Section ───────────────────────────────────────────────────

function ParallaxImageSection({
  imageSrc,
  caption,
  alt,
  reverse = false,
}: {
  imageSrc: string;
  caption: string;
  alt: string;
  reverse?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // More travel range for visible parallax depth
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  // Caption drifts subtly upward as you scroll through
  const captionY = useTransform(scrollYProgress, [0, 1], ['24px', '-24px']);
  // Wider opacity window so caption is visible longer
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2, 0.8, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: 'clamp(520px, 75vh, 860px)',
        overflow: 'hidden',          // keep overflow on the section, not the motion div
      }}
    >
      {/* Parallax image — oversized so edges never show during travel */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: imageY,
          top: '-15%',               // pre-expand so travel never reveals edges
          bottom: '-15%',
          left: 0,
          right: 0,
        }}
      >
        <img
          src={imageSrc}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Overlay — slightly heavier for caption legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: reverse
            ? 'linear-gradient(180deg, rgba(26,10,15,0.55) 0%, rgba(26,10,15,0.2) 50%, rgba(26,10,15,0.55) 100%)'
            : 'linear-gradient(180deg, rgba(26,10,15,0.2) 0%, rgba(26,10,15,0.55) 50%, rgba(26,10,15,0.2) 100%)',
        }}
      />

      {/* Gold border lines */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '3px', background: 'linear-gradient(90deg, transparent 10%, #c9973a 50%, transparent 90%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '3px', background: 'linear-gradient(90deg, transparent 10%, #c9973a 50%, transparent 90%)' }}
      />

      {/* Floating caption */}
      <motion.div
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{
          y: captionY,
          opacity: captionOpacity,
          justifyContent: reverse ? 'flex-start' : 'flex-end',
          paddingLeft: reverse ? '6%' : undefined,
          paddingRight: reverse ? undefined : '6%',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            padding: '32px 44px',
            background: 'rgba(26,10,15,0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1.5px solid rgba(201,151,58,0.45)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              color: '#fff',
              lineHeight: 1.45,
              margin: 0,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {caption}
          </p>
          <div
            style={{
              width: '56px',
              height: '1.5px',
              margin: '18px auto 0',
              background: 'linear-gradient(90deg, transparent, #c9973a, transparent)',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Head>
        <title>Vaishnavi &amp; Sumeet — Wedding Celebration · May 8th, 2026</title>
        <meta
          name="description"
          content="Join Vaishnavi & Sumeet for their wedding celebration on May 8th, 2026 at Sanskar Banquet Hall, Aundh, Pune."
        />
      </Head>

      <main>
        <HeroSection />

        {/* Parallax image — traditional */}
        <ParallaxImageSection
          imageSrc="/5.jpeg"
          alt="Vaishnavi and Sumeet in traditional attire at a temple"
          caption="Two souls, one heart — forever entwined"
        />

        <CountdownTimer />

        {/* Parallax image — romantic silhouette */}
        <ParallaxImageSection
          imageSrc="/7.jpeg"
          alt="Vaishnavi and Sumeet silhouette by the ocean"
          caption="Where the sky meets the sea, I found you"
          reverse
        />

        <EventCards />
        <VenueMap />
      </main>
    </>
  );
}