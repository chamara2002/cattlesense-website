import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { useScrollProgress, useActiveSection } from '../hooks/useAnimations';
import { site } from '../data/siteContent';

const NAV_ITEMS = [
  { id: 'home',          label: 'Home' },
  { id: 'domain',        label: 'Domain' },
  { id: 'modules',       label: 'Modules' },
  { id: 'milestones',    label: 'Milestones' },
  { id: 'documents',     label: 'Documents' },
  { id: 'presentations', label: 'Presentations' },
  { id: 'team',          label: 'Team' },
  { id: 'contact',       label: 'Contact' },
];

export function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();
  const [activeSection, setActiveSection] = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const pillRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
    setActiveSection(id);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          paddingTop: 3,
          background: scrolled
            ? 'var(--surface)'
            : theme === 'dark' ? 'rgba(7,21,18,0.6)' : 'rgba(246,248,244,0.6)',
          boxShadow: scrolled ? '0 1px 0 var(--line)' : 'none',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>

        <nav
          ref={navRef}
          className="content-width flex items-center justify-between"
          style={{ height: 64 }}
          aria-label="Main navigation"
        >
          <button onClick={() => scrollTo('home')} aria-label="Go to home" className="flex-shrink-0">
            <Logo />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 relative" role="list">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                role="listitem"
                onClick={() => scrollTo(item.id)}
                className="relative px-3 py-1.5 text-sm rounded-full transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: activeSection === item.id ? 'var(--primary)' : 'var(--ink-muted)',
                  fontWeight: activeSection === item.id ? 600 : 400,
                  background: activeSection === item.id ? 'var(--surface-2)' : 'transparent',
                }}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{ background: 'var(--surface-2)', color: 'var(--ink-muted)' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Live system link */}
            <a
              href={site.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ background: 'var(--primary)', fontFamily: 'var(--font-sans)' }}
            >
              Live System <ExternalLink size={13} />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--surface-2)', color: 'var(--ink)' }}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--surface-2)', color: 'var(--ink)' }}
            >
              <X size={20} />
            </button>

            <nav className="flex flex-col items-center gap-4" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-heading font-bold transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: activeSection === item.id ? 'var(--primary)' : 'var(--ink)',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                href={site.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium"
                style={{ background: 'var(--primary)' }}
              >
                View Live System <ExternalLink size={15} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
