'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/events', label: 'Events' },
  { href: '/venue', label: 'Venue' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHero = router.pathname === '/';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(255,250,245,0.92)'
          : isHero
          ? 'transparent'
          : 'rgba(255,250,245,0.92)',
        backdropFilter: scrolled || !isHero ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || !isHero ? 'blur(16px)' : 'none',
        boxShadow:
          scrolled || !isHero
            ? '0 1px 0 rgba(122,26,46,0.1)'
            : 'none',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span
            className="font-serif text-2xl italic"
            style={{ color: '#7a1a2e', fontFamily: 'Cormorant Garamond, serif' }}
          >
            V <span style={{ color: '#c9973a' }}>♥</span> S
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium tracking-wide transition-colors duration-200 group"
                  style={{
                    color: isActive ? '#7a1a2e' : '#5a3040',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                    style={{
                      background: '#c9973a',
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          id="nav-menu-toggle"
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: '#7a1a2e' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(255,250,245,0.98)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-base font-medium border-b"
                    style={{
                      color: '#7a1a2e',
                      borderColor: '#f0cfc0',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
