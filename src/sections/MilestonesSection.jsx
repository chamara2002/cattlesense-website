import { useRef, useEffect, useState } from 'react';
import { Eyebrow, SectionTitle, StatusChip, TodoChip } from '../components/Primitives';
import { Reveal } from '../components/Reveal';
import { milestones } from '../data/siteContent';

export function MilestonesSection() {
  const lineRef = useRef(null);
  const fillRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el || !fillRef.current) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const visible = Math.min(window.innerHeight - rect.top, total);
      const ratio = Math.max(0, Math.min(1, visible / total));
      fillRef.current.style.height = `${ratio * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="milestones"
      ref={sectionRef}
      className="section-py"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>04 / MILESTONES</Eyebrow>
          <SectionTitle className="mb-12">Project Timeline</SectionTitle>
        </Reveal>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="timeline-line"
            aria-hidden="true"
          >
            <div ref={fillRef} className="timeline-fill" style={{ height: 0 }} />
          </div>

          <ol className="space-y-0" aria-label="Project milestones">
            {milestones.map((m, i) => (
              <TimelineItem key={i} milestone={m} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ milestone, index }) {
  const isLeft = index % 2 === 0;

  return (
    <li className="relative flex" style={{ paddingBottom: 40 }}>
      {/* Dot */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background: 'var(--surface)',
          border: '2px solid var(--primary)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      >
        <span
          className="font-mono font-bold"
          style={{ fontSize: '0.65rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content alternates left / right */}
      <div
        className={`w-[calc(50%-36px)] ${isLeft ? 'pr-4 text-right' : 'ml-auto pl-4 text-left'}`}
      >
        <Reveal delay={index}>
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--line)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3
              className="font-heading font-semibold mb-2"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--ink)' }}
            >
              {milestone.title}
            </h3>
            <div className={`flex flex-wrap gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
              <StatusChip status={milestone.status} />
            </div>
            <div className="flex flex-col gap-1">
              <MetaRow label="Date">
                {milestone.date === 'TODO' ? <TodoChip /> : <span style={{ color: 'var(--ink)' }}>{milestone.date}</span>}
              </MetaRow>
              <MetaRow label="Marks">
                {milestone.marks === 'TODO' ? <TodoChip /> : <span style={{ color: 'var(--ink)' }}>{milestone.marks}</span>}
              </MetaRow>
            </div>
          </div>
        </Reveal>
      </div>
    </li>
  );
}

function MetaRow({ label, children }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-mono" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
        {label}:
      </span>
      <span className="text-xs">{children}</span>
    </div>
  );
}
