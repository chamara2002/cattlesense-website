import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Eyebrow, Button } from '../components/Primitives';
import { HeroStat } from '../components/StatReadout';
import { site, stats } from '../data/siteContent';

export function HeroSection() {
  const [hasHeroImage, setHasHeroImage] = useState(true);

  const scrollToExplore = () => {
    const el = document.getElementById('domain');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden topo-bg flex flex-col justify-center"
      style={{
        minHeight: '100svh',
        paddingTop: 'calc(var(--nav-height, 68px) + 24px)',
        paddingBottom: '36px',
      }}
    >
      {/* Background Heat glow */}
      {hasHeroImage ? (
        <div
          className="absolute pointer-events-none"
          style={{
            right: '5%',
            top: '25%',
            width: '45vw',
            height: '45vw',
            maxWidth: 550,
            maxHeight: 550,
            background: 'radial-gradient(ellipse at center, rgba(15,118,110,0.12) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '60vw',
            height: '50vw',
            maxWidth: 650,
            maxHeight: 500,
            background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, rgba(239,68,68,0.05) 45%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
      )}

      <div className="content-width w-full my-auto">
        {hasHeroImage ? (
          /* Two-column layout with product preview */
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left: text */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Eyebrow>SLIIT Research Project</Eyebrow>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  className="font-heading font-extrabold"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    letterSpacing: '-0.01em',
                    marginBottom: 6,
                  }}
                >
                  {site.name}
                </div>
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.1rem, 3.8vw, 3.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    color: 'var(--ink)',
                    marginBottom: 16,
                  }}
                >
                  {site.fullTitle}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                style={{
                  color: 'var(--ink-muted)',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  lineHeight: 1.65,
                  marginBottom: 24,
                }}
              >
                {site.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.24 }}
                className="flex flex-wrap gap-3"
              >
                <Button
                  as="a"
                  href={site.liveUrl}
                  variant="primary"
                  id="hero-live-link"
                >
                  View live system <ExternalLink size={15} />
                </Button>
                <Button
                  onClick={scrollToExplore}
                  variant="ghost"
                  id="hero-explore-btn"
                >
                  Explore the research
                </Button>
              </motion.div>
            </div>

            {/* Right: Real product preview in clean browser frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="w-full flex justify-center lg:justify-end"
            >
              <div
                className="hero-preview-frame w-full max-w-[560px] rounded-2xl border overflow-hidden transition-all duration-500"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--line)',
                  boxShadow: 'var(--shadow-hero-frame, 0 24px 60px -15px rgba(15, 118, 110, 0.22), 0 0 0 1px var(--line))',
                }}
              >
                {/* Clean browser top chrome */}
                <div
                  className="flex items-center justify-between px-3.5 py-2.5 border-b"
                  style={{
                    background: 'var(--surface-2)',
                    borderColor: 'var(--line)',
                  }}
                >
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444', opacity: 0.8 }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B', opacity: 0.8 }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981', opacity: 0.8 }} />
                  </div>
                  <div
                    className="px-3 py-0.5 rounded-md text-[11px] font-mono tracking-tight text-center truncate max-w-[220px]"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      color: 'var(--ink-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    cattlesensesl.vercel.app
                  </div>
                  <div className="w-8" aria-hidden="true" />
                </div>

                {/* Screenshot view */}
                <div className="relative aspect-[16/10] bg-black/5 overflow-hidden">
                  <img
                    src="/assets/images/hero.png"
                    alt="CattleSense Live Platform Product Interface"
                    className="w-full h-full object-cover object-top"
                    onError={() => setHasHeroImage(false)}
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Centred single-column layout (fallback when hero image does not exist) */
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Eyebrow>SLIIT Research Project</Eyebrow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
              className="mt-2"
            >
              <div
                className="font-heading font-extrabold"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary)',
                  fontSize: '1.05rem',
                  letterSpacing: '-0.01em',
                  marginBottom: 8,
                }}
              >
                {site.name}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: 'var(--ink)',
                  marginBottom: 18,
                }}
              >
                {site.fullTitle}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              style={{
                color: 'var(--ink-muted)',
                fontSize: '1.08rem',
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 620,
              }}
            >
              {site.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button
                as="a"
                href={site.liveUrl}
                variant="primary"
                id="hero-live-link"
              >
                View live system <ExternalLink size={15} />
              </Button>
              <Button
                onClick={scrollToExplore}
                variant="ghost"
                id="hero-explore-btn"
              >
                Explore the research
              </Button>
            </motion.div>
          </div>
        )}

        {/* Four-stat strip below */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 lg:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3.5 md:p-5 text-center border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                boxShadow: 'var(--shadow-card)',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <HeroStat value={s.value} label={s.label} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle scroll cue */}
      <motion.button
        onClick={scrollToExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Scroll down to research domain"
        className="hidden md:flex mx-auto mt-4 flex-col items-center gap-1 transition-opacity hover:opacity-80"
        style={{ color: 'var(--ink-muted)' }}
      >
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}
        >
          SCROLL
        </span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
