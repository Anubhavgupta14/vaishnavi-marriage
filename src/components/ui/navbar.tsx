'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

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
    const onScroll = () => setScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); 
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHero = router.pathname === '/';
  const isGallery = router.pathname === '/gallery';

  // FIX 1: The navbar is ONLY transparent if the menu is CLOSED. 
  // If menuOpen is true, this becomes false, forcing a solid background.
  const isTransparent = !menuOpen && (isGallery || (isHero && !scrolled));

  // FIX 2: Icon color adapts based on transparency.
  // If it's transparent on the gallery (closed), it's light. Otherwise (open, or standard), it's dark.
  const iconColor = (isTransparent && isGallery) ? '#fde8e0' : '#7a1a2e';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        // When menuOpen is true, isTransparent is false, making the whole top bar solid cream
        background: isTransparent ? 'transparent' : 'rgba(255,250,245,0.98)',
        backdropFilter: isTransparent ? 'none' : 'blur(16px)',
        WebkitBackdropFilter: isTransparent ? 'none' : 'blur(16px)',
        boxShadow: isTransparent ? 'none' : '0 1px 0 rgba(122,26,46,0.1)',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="max-w-6xl mx-auto px-4 py-2 md:px-6 md:py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="group" onClick={() => setMenuOpen(false)}>
          <div className="relative w-12 h-12 md:w-16 md:h-16 transition-all duration-300">
            <Image 
              src="/favicon.png" 
              alt="Logo" 
              fill 
              sizes="(max-width: 768px) 48px, 64px"
              className="object-contain drop-shadow-sm" 
              priority 
            />
          </div>
        </Link>

        {/* Desktop links */}
        {!isGallery && (
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
        )}

        {/* Hamburger Menu Button */}
        <button
          id="nav-menu-toggle"
          className={`${isGallery ? 'block' : 'md:hidden'} p-2 rounded-lg transition-colors`}
          style={{ color: iconColor }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="overflow-hidden shadow-xl"
            style={{ background: 'rgba(255,250,245,0.98)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {NAV_LINKS.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 text-base font-medium border-b transition-colors"
                      style={{
                        color: isActive ? '#7a1a2e' : '#a87585',
                        borderColor: 'rgba(240, 207, 192, 0.4)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}