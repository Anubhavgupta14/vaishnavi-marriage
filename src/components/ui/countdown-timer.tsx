'use client';

import { useState, useEffect, useRef } from 'react';
import { WEDDING } from '@/lib/constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = WEDDING.date.getTime();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const [prev, setPrev] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      setPrev(prevRef.current);
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 280);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Card */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(72px, 14vw, 110px)',
          height: 'clamp(80px, 15vw, 120px)',
          borderRadius: '16px',
          background: 'linear-gradient(160deg, #8b1e34 0%, #5a1020 100%)',
          boxShadow:
            '0 2px 0 rgba(255,255,255,0.07) inset, 0 12px 40px rgba(90,16,32,0.55), 0 2px 8px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Shine strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '16px 16px 0 0',
          }}
        />

        {/* Number */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* FIX: Added suppressHydrationWarning here */}
          <span
            suppressHydrationWarning
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 600,
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {pad(flipping ? prev : display)}
          </span>
        </div>

        {/* Flip animation overlay */}
        {flipping && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(160deg, #9b2335 0%, #6a1525 100%)',
              animation: 'ct-flip 0.28s ease-in forwards',
              transformOrigin: 'center top',
            }}
          >
            {/* FIX: Added suppressHydrationWarning here too, just in case */}
            <span
              suppressHydrationWarning
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              {pad(display)}
            </span>
          </div>
        )}

        {/* Center divider */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            right: '8px',
            height: '1px',
            background: 'rgba(0,0,0,0.35)',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#c9973a',
        }}
      >
        {label}
      </span>

      <style>{`
        @keyframes ct-flip {
          0%   { transform: rotateX(0deg); opacity: 1; }
          100% { transform: rotateX(-90deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: timeLeft.days,    label: 'Days' },
    { value: timeLeft.hours,   label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #1a0810 0%, #2e0f1c 50%, #1a0810 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot pattern bg */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(201,151,58,0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      {/* Top + bottom gold lines */}
      {['top', 'bottom'].map((side) => (
        <div
          key={side}
          aria-hidden="true"
          style={{
            position: 'absolute',
            [side]: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #c9973a 50%, transparent 100%)',
          }}
        />
      ))}

      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c9973a',
            marginBottom: '10px',
          }}
        >
          Counting down to forever
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: '#fde8e0',
            marginBottom: '52px',
            lineHeight: 1.2,
          }}
        >
          The Big Day Approaches
        </h2>

        {/* Countdown row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 'clamp(8px, 2.5vw, 20px)',
          }}
        >
          {units.map((u, i) => (
            <div key={u.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px, 2.5vw, 20px)' }}>
              <FlipUnit value={u.value} label={u.label} />
              {i < units.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: '#c9973a',
                    fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    marginTop: 'clamp(18px, 3.5vw, 32px)',
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Date pill */}
        <div
          style={{
            marginTop: '48px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            borderRadius: '100px',
            background: 'rgba(201,151,58,0.1)',
            border: '1px solid rgba(201,151,58,0.28)',
          }}
        >
          <span aria-hidden="true">🗓️</span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
              color: '#f0d080',
            }}
          >
            MAY 8TH 2026 · 12:37 PM IST
          </span>
        </div>
      </div>
    </section>
  );
}