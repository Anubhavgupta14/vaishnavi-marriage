'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { WEDDING } from '@/lib/constants';

export default function VenueMap() {
  return (
    <section
      style={{
        background: '#fdf6f0',
        padding: '0 24px 96px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#fff',
            borderRadius: '24px',
            border: '1px solid #edd8cc',
            boxShadow: '0 4px 32px rgba(122,26,46,0.07)',
            overflow: 'hidden',
          }}
        >
          {/* Header inside card */}
          <div
            style={{
              padding: '44px 40px 32px',
              textAlign: 'center',
              borderBottom: '1px solid #f5e0d5',
            }}
          >
            {/* Eyebrow */}
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
              Find Us Here
            </p>

            {/* Venue name */}
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
                color: '#7a1a2e',
                lineHeight: 1.15,
                marginBottom: '18px',
              }}
            >
              {WEDDING.venue.name}
            </h2>

            {/* Gold divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '18px',
              }}
            >
              <div style={{ height: '1px', width: '56px', background: 'linear-gradient(90deg, transparent, #c9973a)' }} />
              <span style={{ color: '#c9973a', fontSize: '0.7rem' }}>✦</span>
              <div style={{ height: '1px', width: '56px', background: 'linear-gradient(90deg, #c9973a, transparent)' }} />
            </div>

            {/* Address */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'flex-start',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              <MapPin
                size={15}
                style={{ color: '#c9973a', flexShrink: 0, marginTop: '2px' }}
              />
              <address
                style={{
                  fontStyle: 'normal',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: '#5a3040',
                  lineHeight: 1.6,
                  textAlign: 'left',
                }}
              >
                {WEDDING.venue.address}
              </address>
            </div>
          </div>

          {/* Map embed — full width, no padding */}
          <div style={{ width: '100%', height: '340px', position: 'relative' }}>
            <iframe
              title="Venue Map — Sanskar Banquet Hall"
              src={`https://maps.google.com/maps?q=${WEDDING.venue.lat},${WEDDING.venue.lng}&z=16&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Footer with directions button */}
          <div
            style={{
              padding: '28px 40px',
              textAlign: 'center',
              borderTop: '1px solid #f5e0d5',
              background: '#fffaf8',
            }}
          >
            <motion.a
              href={WEDDING.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 36px',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #7a1a2e 0%, #9b2335 100%)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.88rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(122,26,46,0.3)',
              }}
            >
              <Navigation size={16} />
              Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}