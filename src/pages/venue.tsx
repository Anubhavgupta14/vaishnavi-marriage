import Head from 'next/head';
import { motion } from 'framer-motion';
import VenueMap from '@/components/ui/venue-map';
import { WEDDING, EVENTS } from '@/lib/constants';
import { Clock } from 'lucide-react';

export default function VenuePage() {
  return (
    <>
      <Head>
        <title>Venue — Vaishnavi &amp; Sumeet Wedding</title>
        <meta
          name="description"
          content={`Wedding venue: ${WEDDING.venue.name}, ${WEDDING.venue.address}. May 8th, 2026.`}
        />
      </Head>

      <main style={{ background: '#fdf6f0', paddingTop: '80px', minHeight: '100vh' }}>
        {/* Hero strip */}
        <section
          className="py-20 px-4 text-center"
          style={{
            background: 'linear-gradient(135deg, #7a1a2e 0%, #5a1020 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm tracking-[0.3em] uppercase mb-4"
              style={{ color: '#c9973a', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Wedding Venue
            </p>
            <h1
              className="text-5xl md:text-6xl italic mb-4"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: '#fde8e0',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {WEDDING.venue.name}
            </h1>
            <p
              className="text-base md:text-lg opacity-80 max-w-xl mx-auto"
              style={{ color: '#fde8e0', fontFamily: 'Inter, sans-serif' }}
            >
              {WEDDING.venue.address}
            </p>
          </motion.div>
        </section>

        {/* Map + directions */}
        <div className="mt-10">
          <VenueMap />
        </div>

        {/* Schedule strip */}
        <section
          className="py-16 px-4"
          style={{ background: '#fff' }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl italic"
                style={{ color: '#7a1a2e', fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
              >
                Day Schedule
              </h2>
              <div className="flex justify-center mt-4 gap-3 items-center">
                <div className="h-px w-16" style={{ background: '#c9973a' }} />
                <span style={{ color: '#c9973a' }}>✦</span>
                <div className="h-px w-16" style={{ background: '#c9973a' }} />
              </div>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5"
                style={{ background: '#f0cfc0' }}
                aria-hidden="true"
              />

              <div className="space-y-8 pl-16">
                {EVENTS.map((event, i) => (
                  <motion.div
                    key={event.name}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    {/* Dot on timeline */}
                    <div
                      className="absolute -left-12 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ background: '#7a1a2e', color: '#fff', border: '3px solid #fdf6f0' }}
                    >
                    </div>

                    {/* Updated Card Container */}
                    <div
                      className="rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
                      style={{ background: '#fdf6f0', border: '1px solid #f0cfc0' }}
                    >
                      {/* Icon and Text Wrapper */}
                      <div className="flex items-center gap-4 sm:gap-5 flex-1">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: '#fff', border: '1px solid #f0cfc0' }}
                        >
                          {event.icon}
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-xl italic"
                            style={{ color: '#7a1a2e', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                          >
                            {event.name}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: '#8a5060', fontFamily: 'Inter, sans-serif' }}
                          >
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Time Container */}
                      <div className="flex items-center gap-1.5 pl-16 sm:pl-0 flex-shrink-0">
                        <Clock size={14} style={{ color: '#c9973a' }} />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: '#c9973a', fontFamily: 'Inter, sans-serif' }}
                        >
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}