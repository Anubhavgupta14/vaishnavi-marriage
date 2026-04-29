'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PETALS = ['🌸', '🌺', '🌹', '🏵️', '🌼', '🪷'];

interface Petal {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  drift: number;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

let petalCounter = 0;

export default function FlowerShower() {
  const [petals, setPetals] = useState<Petal[]>([]);

  const bless = useCallback(() => {
    const newPetals: Petal[] = Array.from({ length: 60 }, () => ({
      id: petalCounter++,
      emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
      x: randomBetween(2, 98),
      size: randomBetween(16, 28),
      duration: randomBetween(2.5, 5),
      delay: randomBetween(0, 1.5),
      rotate: randomBetween(-360, 360),
      drift: randomBetween(-80, 80),
    }));
    setPetals(newPetals);
    // Clear after longest animation
    setTimeout(() => setPetals([]), 8000);
  }, []);

  return (
    <>
      {/* Petal overlay — fixed, full screen */}
      <div className="petal-overlay" aria-hidden="true">
        <AnimatePresence>
          {petals.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: -60, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: '105vh',
                x: [`${p.x}vw`, `calc(${p.x}vw + ${p.drift}px)`],
                opacity: [1, 1, 0.8, 0],
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeIn',
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                fontSize: p.size,
                display: 'inline-block',
                userSelect: 'none',
                willChange: 'transform',
              }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky button */}
      <motion.button
        id="flower-shower-btn"
        onClick={bless}
        className="fixed bottom-8 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #7a1a2e 0%, #9b2335 100%)',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 4px 24px rgba(122,26,46,0.5)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        🌸 Bless the Couple
      </motion.button>
    </>
  );
}
