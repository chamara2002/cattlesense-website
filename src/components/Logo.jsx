// Wordmark logo: tries logo.png first, falls back to SVG text mark
import { useState } from 'react';

export function Logo({ className = '' }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/assets/images/logo.png"
        alt="CattleSense"
        height={36}
        className={`h-9 w-auto ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LeafPulseMark />
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.15rem',
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        Cattle<span style={{ color: 'var(--primary)' }}>Sense</span>
      </span>
    </div>
  );
}

function LeafPulseMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Leaf shape */}
      <path
        d="M14 4 C14 4 22 6 22 14 C22 20 17 24 14 24 C11 24 6 20 6 14 C6 6 14 4 14 4Z"
        fill="var(--leaf)"
        opacity="0.9"
      />
      {/* Pulse line through leaf */}
      <polyline
        points="7,14 10,14 12,10 14,18 16,12 18,14 21,14"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
