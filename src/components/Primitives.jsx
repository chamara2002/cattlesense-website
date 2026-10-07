// Small mono eyebrow label e.g. "02 / DOMAIN"
export function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`font-mono text-xs tracking-widest uppercase text-primary mb-3 ${className}`}
      style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', letterSpacing: '0.12em' }}
    >
      {children}
    </p>
  );
}

// Section heading
export function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`font-heading font-bold ${className}`}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
        letterSpacing: '-0.02em',
        lineHeight: 1.18,
        color: 'var(--ink)',
      }}
    >
      {children}
    </h2>
  );
}

// "To be updated" chip shown when value is "TODO"
export function TodoChip() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border"
      style={{
        background: 'var(--surface-2)',
        borderColor: 'var(--line)',
        color: 'var(--ink-muted)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
      To be updated
    </span>
  );
}

// Inline content that renders a TODO chip or the actual value
export function MaybeValue({ value, render }) {
  if (value === 'TODO' || value == null) return <TodoChip />;
  return render ? render(value) : <span>{value}</span>;
}

// Chip / tag pill
export function Chip({ children, variant = 'default', className = '' }) {
  const variants = {
    default: { background: 'var(--surface-2)', color: 'var(--ink-muted)', borderColor: 'var(--line)' },
    primary: { background: 'rgba(15,118,110,0.1)', color: 'var(--primary)', borderColor: 'rgba(15,118,110,0.25)' },
    leaf: { background: 'rgba(77,124,15,0.1)', color: 'var(--leaf)', borderColor: 'rgba(77,124,15,0.25)' },
    amber: { background: 'rgba(245,158,11,0.1)', color: 'var(--heat-1)', borderColor: 'rgba(245,158,11,0.25)' },
    rose: { background: 'rgba(239,68,68,0.08)', color: 'var(--heat-2)', borderColor: 'rgba(239,68,68,0.2)' },
    completed: { background: 'rgba(77,124,15,0.1)', color: 'var(--leaf)', borderColor: 'rgba(77,124,15,0.25)' },
    progress: { background: 'rgba(245,158,11,0.1)', color: 'var(--heat-1)', borderColor: 'rgba(245,158,11,0.25)' },
    upcoming: { background: 'var(--surface-2)', color: 'var(--ink-muted)', borderColor: 'var(--line)' },
  };
  const s = variants[variant] || variants.default;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}
      style={{ ...s, fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}
    >
      {children}
    </span>
  );
}

// Status chip
export function StatusChip({ status }) {
  if (status === 'TODO' || !status) return <TodoChip />;
  const v = status.toLowerCase().includes('complet') ? 'completed'
    : status.toLowerCase().includes('progress') ? 'progress'
    : 'upcoming';
  return <Chip variant={v}>{status}</Chip>;
}

// Primary / ghost button
export function Button({ children, variant = 'primary', as = 'button', href, onClick, disabled, className = '', id }) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 font-medium transition-all duration-200 focus-visible:ring-2 ring-offset-2 text-sm leading-snug';
  const styles = {
    primary: 'bg-primary text-white hover:opacity-90 active:scale-95',
    ghost: 'btn-ghost-fix active:scale-95',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white active:scale-95',
  };
  const Tag = as === 'a' || href ? 'a' : 'button';
  return (
    <Tag
      id={id}
      href={href}
      onClick={onClick}
      disabled={disabled}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${base} ${styles[variant] || styles.primary} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? 'var(--primary)' : undefined,
        color: variant === 'primary' ? '#fff' : variant === 'outline' ? 'var(--primary)' : 'var(--ink)',
        borderRadius: 'var(--radius-control)',
      }}
    >
      {children}
    </Tag>
  );
}

// Card wrapper
export function Card({ children, className = '', onClick, style }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      className={`card-hover rounded-[20px] border p-6 ${className}`}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius-card)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
