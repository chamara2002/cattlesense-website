import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { Eyebrow, SectionTitle, Chip } from '../components/Primitives';
import { Reveal } from '../components/Reveal';
import { StatReadout, BarReadout } from '../components/StatReadout';
import { ScanFrame } from '../components/ScanFrame';
import { modules } from '../data/siteContent';

const TINT_STYLES = {
  teal: { accent: 'var(--primary)', bg: 'rgba(15,118,110,0.06)', border: 'rgba(15,118,110,0.18)' },
  amber: { accent: 'var(--heat-1)', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.18)' },
  leaf: { accent: 'var(--leaf)', bg: 'rgba(77,124,15,0.06)', border: 'rgba(77,124,15,0.18)' },
  rose: { accent: 'var(--heat-2)', bg: 'rgba(239,68,68,0.05)', border: 'rgba(239,68,68,0.15)' },
};

const CHIP_VARIANT = {
  teal: 'primary',
  amber: 'amber',
  leaf: 'leaf',
  rose: 'rose',
};

export function ModulesSection() {
  const [expanded, setExpanded] = useState(null);

  const openModule = (id) => setExpanded(id === expanded ? null : id);
  const closeModule = () => setExpanded(null);

  return (
    <section
      id="modules"
      className="section-py"
      style={{ borderTop: '1px solid var(--line)', background: 'var(--surface-2)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>03 / MODULES</Eyebrow>
          <SectionTitle className="mb-3">Disease Focus</SectionTitle>
          <p className="mb-10" style={{ color: 'var(--ink-muted)', maxWidth: 560 }}>
            Four independent ML modules, each targeting a specific cattle disease. Click any card to explore in depth.
          </p>
        </Reveal>

        {/* Bento grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {modules.map((mod, i) => {
            const tint = TINT_STYLES[mod.tint] || TINT_STYLES.teal;
            const isOpen = expanded === mod.id;

            return (
              <Reveal key={mod.id} delay={i}>
                <motion.div
                  layout
                  onClick={() => openModule(mod.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openModule(mod.id)}
                  aria-expanded={isOpen}
                  aria-label={`${mod.disease} module — click to expand`}
                  className="rounded-[20px] border cursor-pointer overflow-hidden"
                  style={{
                    background: isOpen ? 'var(--surface)' : tint.bg,
                    borderColor: isOpen ? tint.accent : tint.border,
                    boxShadow: isOpen ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="font-heading font-bold mb-1"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.2rem',
                            color: 'var(--ink)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {mod.disease}
                        </h3>
                        <p className="font-mono text-xs" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                          {mod.owner}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        style={{
                          color: tint.accent,
                          transform: isOpen ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.25s ease',
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-sm mb-4" style={{ color: 'var(--ink-muted)', lineHeight: 1.65 }}>
                      {mod.description}
                    </p>

                    {/* Model chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {mod.models.map((m) => (
                        <Chip key={m} variant={CHIP_VARIANT[mod.tint]}>{m}</Chip>
                      ))}
                    </div>

                    {/* Metric bars (collapsed) */}
                    {!isOpen && (
                      <div className="space-y-2.5">
                        {mod.metrics.slice(0, 2).map((metric) => (
                          <BarReadout
                            key={metric.label}
                            label={metric.label}
                            value={metric.value}
                            unit={metric.unit}
                            max={metric.unit === '%' ? 100 : 1}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-6">
                          <hr style={{ borderColor: 'var(--line)' }} />

                          {/* Image frame */}
                          <ScanFrame
                            src={mod.image}
                            alt={`${mod.disease} module illustration`}
                            aspectRatio="16/7"
                          />

                          {/* Metric readouts */}
                          <div className="flex flex-wrap justify-center gap-6">
                            {mod.metrics.map((metric) => (
                              <StatReadout
                                key={metric.label}
                                label={metric.label}
                                value={metric.value}
                                unit={metric.unit}
                                size={90}
                              />
                            ))}
                          </div>

                          <div className="grid sm:grid-cols-3 gap-4">
                            {/* Inputs */}
                            <DetailBlock
                              title="What the farmer provides"
                              items={mod.inputs}
                              accent={tint.accent}
                            />
                            {/* How it works */}
                            <div
                              className="rounded-xl p-4 sm:col-span-1 lg:col-span-1"
                              style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-control)' }}
                            >
                              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: tint.accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                                How it decides
                              </p>
                              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                                {mod.howItWorks}
                              </p>
                            </div>
                            {/* Outputs */}
                            <DetailBlock
                              title="What the farmer gets back"
                              items={mod.outputs}
                              accent={tint.accent}
                            />
                          </div>

                          <button
                            onClick={closeModule}
                            className="w-full text-center text-sm py-2 rounded-xl transition-colors"
                            style={{ color: 'var(--ink-muted)', background: 'var(--surface-2)', borderRadius: 'var(--radius-control)' }}
                          >
                            Collapse
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ title, items, accent }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-control)' }}
    >
      <p className="text-xs font-mono uppercase tracking-widest mb-2.5" style={{ color: accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: accent }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
