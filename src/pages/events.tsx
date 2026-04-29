import Head from 'next/head';
import { motion } from 'framer-motion';
import EventCards from '@/components/ui/event-cards';

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Events — Vaishnavi &amp; Sumeet Wedding</title>
        <meta
          name="description"
          content="All ceremony events for the wedding of Vaishnavi & Sumeet on May 8th, 2026 — Varmala, Saptapadi, Phera, Reception."
        />
      </Head>

      <main style={{ background: '#fdf6f0', paddingTop: '80px', minHeight: '100vh' }}>
        {/* Hero strip */}
        <section
          className="py-20 px-4 text-center"
          style={{
            background: 'linear-gradient(135deg, #fde8e0 0%, #f9d5c5 100%)',
            borderBottom: '1px solid #f0cfc0',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm tracking-[0.3em] uppercase mb-3"
              style={{ color: '#c9973a', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              May 8th, 2026
            </p>
            <h1
              className="text-5xl md:text-6xl italic"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: '#7a1a2e',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Wedding Ceremonies
            </h1>
            <p
              className="mt-4 text-base md:text-lg"
              style={{ color: '#8a5060', fontFamily: 'Inter, sans-serif' }}
            >
              Sanskar Banquet Hall, Aundh, Pune
            </p>
          </motion.div>
        </section>

        {/* Event cards */}
        <EventCards />
      </main>
    </>
  );
}
