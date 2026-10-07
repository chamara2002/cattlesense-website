import { useState } from 'react';
import { Link2, Code2, Mail } from 'lucide-react';
import { Eyebrow, SectionTitle, TodoChip } from '../components/Primitives';
import { Reveal } from '../components/Reveal';
import { team } from '../data/siteContent';

const MODULE_COLORS = {
  'Mastitis Detection': 'teal',
  'FMD Detection': 'amber',
  'LSD Detection': 'leaf',
  'Milk Fever Detection': 'rose',
};

const COLOR_VARS = {
  teal: { bg: 'linear-gradient(135deg, #0F766E, #2DD4BF)', label: 'rgba(15,118,110,0.12)', labelColor: 'var(--primary)' },
  amber: { bg: 'linear-gradient(135deg, #B45309, #F59E0B)', label: 'rgba(245,158,11,0.1)', labelColor: 'var(--heat-1)' },
  leaf: { bg: 'linear-gradient(135deg, #365314, #4D7C0F)', label: 'rgba(77,124,15,0.1)', labelColor: 'var(--leaf)' },
  rose: { bg: 'linear-gradient(135deg, #991B1B, #EF4444)', label: 'rgba(239,68,68,0.08)', labelColor: 'var(--heat-2)' },
};

function Monogram({ name, colorScheme = 'teal' }) {
  const initials = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const c = COLOR_VARS[colorScheme];
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white font-heading font-bold text-2xl"
      style={{ background: c?.bg || 'linear-gradient(135deg, #0F766E, #2DD4BF)' }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function MemberCard({ member }) {
  const [imgError, setImgError] = useState(false);
  const color = MODULE_COLORS[member.component] || 'teal';
  const c = COLOR_VARS[color];

  return (
    <div
      className="rounded-[20px] border overflow-hidden card-hover"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      {/* Portrait */}
      <div className="w-full overflow-hidden" style={{ height: 180 }}>
        {!imgError ? (
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <Monogram name={member.name} colorScheme={color} />
        )}
      </div>

      <div className="p-5">
        <h3
          className="font-heading font-bold mb-0.5"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '1rem' }}
        >
          {member.name}
        </h3>
        <p
          className="font-mono text-xs mb-2"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {member.studentId}
        </p>
        <span
          className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3"
          style={{
            background: c?.label,
            color: c?.labelColor,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
          }}
        >
          {member.component}
        </span>
        <div className="flex items-center gap-1 mb-3">
          <Mail size={13} style={{ color: 'var(--ink-muted)' }} aria-hidden="true" />
          {member.email === 'TODO' ? (
            <TodoChip />
          ) : (
            <a
              href={`mailto:${member.email}`}
              className="text-xs hover:text-primary transition-colors"
              style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {member.email}
            </a>
          )}
        </div>

        {/* Social links – hidden when TODO */}
        <div className="flex gap-2">
          {member.linkedin && member.linkedin !== 'TODO' && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-primary"
              style={{ background: 'var(--surface-2)', color: 'var(--ink-muted)' }}
            >
              <Link2 size={14} />
            </a>
          )}
          {member.github && member.github !== 'TODO' && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} GitHub`}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-primary"
              style={{ background: 'var(--surface-2)', color: 'var(--ink-muted)' }}
            >
              <Code2 size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SupervisorCard({ supervisor }) {
  return (
    <div
      className="rounded-[20px] border p-6 card-hover"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center"
        style={{ background: 'rgba(15,118,110,0.1)' }}
        aria-hidden="true"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="12" r="6" fill="var(--primary)" opacity="0.7" />
          <path d="M6 28 C6 22 10 18 16 18 C22 18 26 22 26 28" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <span
        className="inline-block px-2.5 py-1 rounded-full text-xs font-mono mb-3"
        style={{ background: 'rgba(15,118,110,0.1)', color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
      >
        {supervisor.role}
      </span>
      <h3 className="font-heading font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
        {supervisor.name === 'TODO' ? <TodoChip /> : supervisor.name}
      </h3>
      <p className="text-sm mb-0.5" style={{ color: 'var(--ink-muted)' }}>
        {supervisor.title === 'TODO' ? <TodoChip /> : supervisor.title}
      </p>
      <p className="text-sm mb-3" style={{ color: 'var(--ink-muted)' }}>
        {supervisor.department === 'TODO' ? <TodoChip /> : supervisor.department}
      </p>
      <div className="flex items-center gap-1.5">
        <Mail size={13} style={{ color: 'var(--ink-muted)' }} aria-hidden="true" />
        {supervisor.email === 'TODO' ? <TodoChip /> : (
          <a href={`mailto:${supervisor.email}`} className="text-xs" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
            {supervisor.email}
          </a>
        )}
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="section-py topo-bg"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>07 / ABOUT US</Eyebrow>
          <SectionTitle className="mb-10">Research Team</SectionTitle>
        </Reveal>

        {/* Supervisors */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
            Supervisors
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            {team.supervisors.map((s, i) => (
              <Reveal key={s.id} delay={i}>
                <SupervisorCard supervisor={s} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
            Project Members
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.members.map((m, i) => (
              <Reveal key={m.id} delay={i}>
                <MemberCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
