import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import FlowerShower from '@/components/ui/flower-shower';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Navbar />
      <FlowerShower />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="relative"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
