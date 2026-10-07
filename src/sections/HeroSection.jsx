import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Eyebrow, Button } from '../components/Primitives';
import { HeroStat } from '../components/StatReadout';
import { site, stats } from '../data/siteContent';

export function HeroSection() {
  const scrollToExplore = () => {
    const el = document.getElementById('domain');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden topo-bg"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 80,
        paddingBottom: 60,
      }}
    >
      {/* Heat glow behind hero */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '5%',
          top: '20%',
          width: '45vw',
          height: '45vw',
          maxWidth: 600,
          maxHeight: 600,
          background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, rgba(239,68,68,0.06) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
        aria-hidden="true"
      />

      <div className="content-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              <Eyebrow>SLIIT Research Project / {site.groupId}</Eyebrow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="font-heading font-extrabold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)', fontSize: '1.05rem', letterSpacing: '-0.01em', marginBottom: 8 }}
              >
                {site.name}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  marginBottom: 20,
                }}
              >
                {site.fullTitle}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              style={{ color: 'var(--ink-muted)', fontSize: '1.06rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}
            >
              {site.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
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

          {/* Right: Diagnostic card illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <DiagnosticCard />
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 md:p-6 text-center border"
              style={{ background: 'var(--surface)', borderColor: 'var(--line)', boxShadow: 'var(--shadow-card)' }}
            >
              <HeroStat value={s.value} label={s.label} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: 'var(--ink-muted)' }}
      >
        <span className="text-xs font-mono" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SCROLL</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.button>
    </section>
  );
}

// ─── Diagnostic Card Illustration ──────────────────────────────
const MODULE_TABS = [
  { label: 'Mastitis', active: true },
  { label: 'FMD', active: false },
  { label: 'LSD', active: false },
  { label: 'Milk Fever', active: false },
];

function DiagnosticCard() {
  const scanRef = useRef(null);

  return (
    <div
      className="relative rounded-3xl p-1"
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, transparent 60%)',
        boxShadow: 'var(--shadow-card-hover)',
      }}
    >
      <div
        className="rounded-3xl p-5 space-y-4"
        style={{ background: 'var(--surface)', borderRadius: 22 }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
              CattleSense / Diagnostic
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>
              Disease Screening
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>LIVE</span>
          </div>
        </div>

        {/* Image frame with scan line */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
          }}
        >
          <div className="scan-line" />
          <div className="heat-glow absolute inset-0" />
          {/* Corner brackets */}
          {[
            { top: 8, left: 8, flip: false },
            { top: 8, right: 8, flipX: true },
            { bottom: 8, left: 8, flipY: true },
            { bottom: 8, right: 8, flipX: true, flipY: true },
          ].map((pos, i) => (
            <svg
              key={i}
              width="16" height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                position: 'absolute',
                ...pos,
                stroke: 'var(--primary)',
                strokeWidth: 2,
                transform: `scale(${pos.flipX ? -1 : 1}, ${pos.flipY ? -1 : 1})`,
              }}
              aria-hidden="true"
            >
              <path d="M0 8 L0 0 L8 0" />
            </svg>
          ))}
          {/* Crosshair */}
          <div
            className="absolute rounded-lg border-2 dashed"
            style={{
              top: '25%', left: '30%', right: '20%', bottom: '20%',
              border: '1.5px dashed var(--primary)',
              borderRadius: 8,
              opacity: 0.6,
            }}
          />
          <div
            className="absolute text-xs font-mono"
            style={{
              bottom: 12, left: 12,
              color: 'var(--primary)',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(15,118,110,0.1)',
              padding: '2px 6px',
              borderRadius: 4,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
            }}
          >
            UDDER / ANALYSING
          </div>
        </div>

        {/* Module tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {MODULE_TABS.map((tab) => (
            <span
              key={tab.label}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                background: tab.active ? 'rgba(15,118,110,0.12)' : 'var(--surface-2)',
                borderColor: tab.active ? 'var(--primary)' : 'var(--line)',
                color: tab.active ? 'var(--primary)' : 'var(--ink-muted)',
                fontWeight: tab.active ? 600 : 400,
              }}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Probability readout */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--surface-2)', borderRadius: 12 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono tracking-wider uppercase" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              Mastitis Probability
            </span>
            <ResultChip label="POSITIVE" />
          </div>
          {/* Animated bar */}
          <div className="rounded-full overflow-hidden mb-2" style={{ background: 'var(--line)', height: 8 }}>
            <div
              className="h-full rounded-full"
              style={{
                width: '87%',
                background: 'linear-gradient(90deg, var(--primary), var(--heat-1))',
                animation: 'none',
                transition: 'width 1.5s ease 0.5s',
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-xs font-mono" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>0.00</span>
            <span className="text-sm font-semibold font-mono" style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>0.87</span>
            <span className="text-xs font-mono" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>1.00</span>
          </div>
        </div>

        {/* Bottom labels */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { val: '87.01%', lbl: 'Img Acc' },
            { val: '0.9376', lbl: 'AUC' },
            { val: '99.38%', lbl: 'Bio Acc' },
          ].map((m) => (
            <div key={m.lbl}>
              <p className="font-mono font-semibold text-sm" style={{ color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>{m.val}</p>
              <p className="font-mono text-xs" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>{m.lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultChip({ label }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
      style={{
        background: 'rgba(239,68,68,0.1)',
        color: 'var(--heat-2)',
        border: '1px solid rgba(239,68,68,0.25)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.08em',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block animate-pulse" />
      {label}
    </span>
  );
}
