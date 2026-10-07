import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ZoomIn } from 'lucide-react';
import { Eyebrow, SectionTitle, Chip } from '../components/Primitives';
import { Reveal } from '../components/Reveal';
import { Lightbox } from '../components/ScanFrame';
import { domain } from '../data/siteContent';

const PANELS = [
  { id: 'literature', label: 'Literature Survey' },
  { id: 'gap', label: 'Research Gap' },
  { id: 'problem', label: 'Research Problem' },
  { id: 'objective', label: 'Main Objective' },
  { id: 'subobjectives', label: 'Sub-Objectives' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'tools', label: 'Tools & Frameworks' },
];

export function DomainSection() {
  const [active, setActive] = useState('literature');
  const [lightbox, setLightbox] = useState(false);
  const contentRef = useRef(null);

  const scrollToPanel = (id) => {
    setActive(id);
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <section
      id="domain"
      className="section-py topo-bg"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>02 / DOMAIN</Eyebrow>
          <SectionTitle className="mb-10">Research Context</SectionTitle>
        </Reveal>

        <div className="lg:flex gap-8">
          {/* Side nav – sticky on desktop, horizontal scroll on mobile */}
          <aside
            className="lg:w-56 flex-shrink-0 mb-8 lg:mb-0"
            aria-label="Domain sub-navigation"
          >
            <nav
              className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:sticky"
              style={{ top: 88 }}
            >
              {PANELS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollToPanel(p.id)}
                  className="flex-shrink-0 lg:flex-shrink text-left px-3 py-2 rounded-xl text-sm transition-all duration-200"
                  style={{
                    background: active === p.id ? 'var(--surface-2)' : 'transparent',
                    color: active === p.id ? 'var(--primary)' : 'var(--ink-muted)',
                    fontWeight: active === p.id ? 600 : 400,
                    borderLeft: active === p.id ? '2px solid var(--primary)' : '2px solid transparent',
                    fontFamily: 'var(--font-sans)',
                    whiteSpace: 'nowrap',
                  }}
                  aria-current={active === p.id ? 'page' : undefined}
                >
                  {p.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Panel content */}
          <div ref={contentRef} className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {active === 'literature' && <LiteraturePanel />}
                {active === 'gap' && <GapPanel />}
                {active === 'problem' && <TextPanel eyebrow="Research Problem" content={domain.researchProblem} />}
                {active === 'objective' && <TextPanel eyebrow="Main Objective" content={domain.mainObjective} />}
                {active === 'subobjectives' && <SubObjectivesPanel />}
                {active === 'methodology' && <MethodologyPanel onOpenLightbox={() => setLightbox(true)} />}
                {active === 'tools' && <ToolsPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src="/assets/images/architecture.png"
          alt="System Architecture Diagram"
          onClose={() => setLightbox(false)}
        />
      )}
    </section>
  );
}

function PanelHeading({ children }) {
  return (
    <h3
      className="font-heading font-bold mb-4"
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
        color: 'var(--ink)',
        letterSpacing: '-0.015em',
      }}
    >
      {children}
    </h3>
  );
}

function LiteraturePanel() {
  return (
    <div>
      <PanelHeading>Literature Survey</PanelHeading>
      <p style={{ color: 'var(--ink-muted)', lineHeight: 1.75 }}>{domain.literatureSurvey.body}</p>
    </div>
  );
}

function GapPanel() {
  return (
    <div>
      <PanelHeading>Research Gap</PanelHeading>
      <p className="mb-6" style={{ color: 'var(--ink-muted)', lineHeight: 1.75 }}>{domain.researchGap.intro}</p>
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--line)' }}>
        <table className="w-full text-sm" aria-label="Research gap comparison table">
          <thead>
            <tr style={{ background: 'var(--surface-2)' }}>
              <th className="text-left px-4 py-3" style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Capability</th>
              <th className="text-center px-4 py-3 w-32" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>PRIOR WORK</th>
              <th className="text-center px-4 py-3 w-32" style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>CATTLESENSE</th>
            </tr>
          </thead>
          <tbody>
            {domain.researchGap.table.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderTop: '1px solid var(--line)',
                  background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
                }}
              >
                <td className="px-4 py-3" style={{ color: 'var(--ink)' }}>{row.capability}</td>
                <td className="text-center px-4 py-3">
                  {row.prior
                    ? <Check size={16} className="inline" style={{ color: 'var(--leaf)' }} aria-label="Yes" />
                    : <X size={16} className="inline" style={{ color: 'var(--heat-2)' }} aria-label="No" />
                  }
                </td>
                <td className="text-center px-4 py-3">
                  {row.cattlesense
                    ? <Check size={16} className="inline" style={{ color: 'var(--primary)' }} aria-label="Yes" />
                    : <X size={16} className="inline" style={{ color: 'var(--heat-2)' }} aria-label="No" />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TextPanel({ eyebrow, content }) {
  return (
    <div>
      <PanelHeading>{eyebrow}</PanelHeading>
      <p style={{ color: 'var(--ink-muted)', lineHeight: 1.8, fontSize: '1.02rem' }}>{content}</p>
    </div>
  );
}

function SubObjectivesPanel() {
  return (
    <div>
      <PanelHeading>Sub-Objectives</PanelHeading>
      <div className="grid sm:grid-cols-2 gap-4">
        {domain.subObjectives.map((obj, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 border"
            style={{ background: 'var(--surface)', borderColor: 'var(--line)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold flex-shrink-0"
                style={{ background: 'rgba(15,118,110,0.12)', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-semibold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>{obj.module}</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 1.7 }}>{obj.objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MethodologyPanel({ onOpenLightbox }) {
  return (
    <div>
      <PanelHeading>Methodology</PanelHeading>
      <p className="mb-8" style={{ color: 'var(--ink-muted)', lineHeight: 1.8 }}>{domain.methodology}</p>
      <PipelineDiagram />
      <div className="mt-8">
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>System Architecture</p>
        <button
          onClick={onOpenLightbox}
          className="relative w-full rounded-2xl overflow-hidden border group"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', aspectRatio: '16/7' }}
          aria-label="Open system architecture diagram in lightbox"
        >
          <img
            src="/assets/images/architecture.png"
            alt="System Architecture Diagram"
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:bg-black/10 transition-colors">
            <ZoomIn size={24} style={{ color: 'var(--primary)' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>Click to zoom</span>
          </div>
        </button>
      </div>
    </div>
  );
}

function PipelineDiagram() {
  const nodes = [
    { label: 'Photo', sub: 'Phone camera', icon: '📷' },
    { label: 'Measurements', sub: 'Farm data', icon: '📊' },
    { label: 'ML Models', sub: 'Per module', icon: '🧠' },
    { label: 'Fusion', sub: 'Score level', icon: '⚡' },
    { label: 'Result', sub: 'Probability', icon: '✓' },
    { label: 'Vet Report', sub: 'Bilingual PDF', icon: '📋' },
  ];

  return (
    <div
      className="rounded-2xl p-6 border overflow-x-auto"
      style={{ background: 'var(--surface)', borderColor: 'var(--line)', boxShadow: 'var(--shadow-card)' }}
      aria-label="ML Pipeline diagram"
    >
      <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
        ML Pipeline
      </p>
      <div className="flex items-center gap-0 min-w-max">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: i === nodes.length - 1 ? 'rgba(15,118,110,0.15)' : 'var(--surface-2)',
                  border: `1px solid ${i === nodes.length - 1 ? 'var(--primary)' : 'var(--line)'}`,
                }}
              >
                {node.icon}
              </div>
              <p className="text-xs font-semibold text-center w-16" style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}>{node.label}</p>
              <p className="text-xs text-center w-16" style={{ color: 'var(--ink-muted)', fontSize: '0.65rem' }}>{node.sub}</p>
            </div>
            {i < nodes.length - 1 && (
              <svg width="36" height="16" viewBox="0 0 36 16" className="mx-1 flex-shrink-0" aria-hidden="true">
                <line x1="0" y1="8" x2="30" y2="8" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M28 4 L36 8 L28 12" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsPanel() {
  const colors = {
    Frontend: 'primary',
    Backend: 'amber',
    'Machine Learning': 'leaf',
    Data: 'rose',
    Deployment: 'default',
  };

  return (
    <div>
      <PanelHeading>Tools & Frameworks</PanelHeading>
      <div className="space-y-5">
        {Object.entries(domain.tools).map(([group, tools]) => (
          <div key={group}>
            <p
              className="text-xs font-mono uppercase tracking-widest mb-2.5"
              style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}
            >
              {group}
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Chip key={tool} variant={colors[group] || 'default'}>{tool}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
