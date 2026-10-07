import { useRef, useState } from 'react';
import { useCountUp, useInView } from '../hooks/useAnimations';

// Animated metric arc readout
export function StatReadout({ label, value, unit = '%', size = 100 }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 1200, inView);

  const isPercent = unit === '%';
  const ratio = isPercent ? value / 100 : value;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference * (1 - Math.min(ratio, 1));

  const display = Number.isInteger(value)
    ? count
    : count.toFixed(String(value).split('.')[1]?.length ?? 2);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={inView ? offset : circumference}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="text-sm font-semibold leading-none" style={{ color: 'var(--ink)', fontSize: size < 90 ? '0.75rem' : '1rem' }}>
            {display}{unit}
          </span>
        </div>
      </div>
      <p className="text-center text-xs leading-snug" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', maxWidth: size + 20 }}>
        {label}
      </p>
    </div>
  );
}

// Horizontal bar readout
export function BarReadout({ label, value, unit = '%', max = 100 }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 1000, inView);
  const ratio = (value / max) * 100;
  const display = Number.isInteger(value) ? count : count.toFixed(String(value).split('.')[1]?.length ?? 2);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>{label}</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
          {display}{unit}
        </span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ background: 'var(--line)', height: 6 }}>
        <div
          className="h-full rounded-full"
          style={{
            width: inView ? `${ratio}%` : '0%',
            background: 'linear-gradient(90deg, var(--primary), var(--leaf))',
            transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
}

// Big hero stat
export function HeroStat({ value, label }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="text-center">
      <div
        className="font-mono font-bold text-4xl md:text-5xl"
        style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}
      >
        {value}
      </div>
      <div
        className="text-xs mt-1 tracking-wider uppercase"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
      >
        {label}
      </div>
    </div>
  );
}
