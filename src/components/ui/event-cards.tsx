'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { EVENTS } from '@/lib/constants';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EventCards() {
  return (
    <section
      style={{
        background: '#fdf6f0',
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.68rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#c9973a',
              marginBottom: '12px',
            }}
          >
            Wedding Day
          </p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: '#7a1a2e',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Ceremony &amp; Events
          </h2>
          {/* Ornamental divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '72px',
                background: 'linear-gradient(90deg, transparent, #c9973a)',
              }}
            />
            <span style={{ color: '#c9973a', fontSize: '0.75rem' }}>✦</span>
            <div
              style={{
                height: '1px',
                width: '72px',
                background: 'linear-gradient(90deg, #c9973a, transparent)',
              }}
            />
          </div>
        </div>

        {/* Cards */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {EVENTS.map((event) => (
            <motion.div
              key={event.name}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                position: 'relative',
                borderRadius: '20px',
                padding: '32px 24px 28px',
                textAlign: 'center',
                background: '#fff',
                border: '1px solid #edd8cc',
                boxShadow: '0 2px 16px rgba(122,26,46,0.05)',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Top accent bar */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  borderRadius: '20px 20px 0 0',
                  background: `linear-gradient(90deg, ${event.color ?? '#7a1a2e'}, #c9973a)`,
                }}
              />

              {/* Icon circle */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#fdf6f0',
                  border: '1.5px solid #edd8cc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  margin: '0 auto 20px',
                }}
              >
                {event.icon}
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  color: '#7a1a2e',
                  marginBottom: '6px',
                  lineHeight: 1.2,
                }}
              >
                {event.name}
              </h3>

              {/* Time */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: '#c9973a',
                  marginBottom: '12px',
                }}
              >
                {event.time}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.83rem',
                  color: '#7a5060',
                  lineHeight: 1.65,
                }}
              >
                {event.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '44px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: '#8a5060',
          }}
        >
          All events at{' '}
          <strong style={{ color: '#7a1a2e', fontWeight: 600 }}>
            Sanskar Banquet Hall, Aundh, Pune
          </strong>
          {' '}· May 8th, 2026
        </p>
      </div>
    </section>
  );
}