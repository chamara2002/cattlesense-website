import { useState } from 'react';
import { X } from 'lucide-react';

// Image frame with scan line effect
export function ScanFrame({ src, alt = '', className = '', aspectRatio = '4/3', children }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        aspectRatio,
        background: 'var(--surface-2)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-control)',
      }}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Heat glow overlay */}
      <div className="heat-glow absolute inset-0 pointer-events-none z-0" />

      {/* Image */}
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <DiagnosticPlaceholder />
        </div>
      )}

      {/* Corner brackets */}
      <CornerBrackets />

      {children}
    </div>
  );
}

function CornerBrackets() {
  const s = { position: 'absolute', width: 16, height: 16, stroke: 'var(--primary)', strokeWidth: 2, fill: 'none' };
  return (
    <>
      <svg style={{ ...s, top: 8, left: 8 }} viewBox="0 0 16 16"><path d="M0 8 L0 0 L8 0" /></svg>
      <svg style={{ ...s, top: 8, right: 8, transform: 'scaleX(-1)' }} viewBox="0 0 16 16"><path d="M0 8 L0 0 L8 0" /></svg>
      <svg style={{ ...s, bottom: 8, left: 8, transform: 'scaleY(-1)' }} viewBox="0 0 16 16"><path d="M0 8 L0 0 L8 0" /></svg>
      <svg style={{ ...s, bottom: 8, right: 8, transform: 'scale(-1,-1)' }} viewBox="0 0 16 16"><path d="M0 8 L0 0 L8 0" /></svg>
    </>
  );
}

// Decorative placeholder when image is missing
function DiagnosticPlaceholder() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ opacity: 0.25 }}>
      <circle cx="40" cy="40" r="36" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="40" cy="40" r="24" stroke="var(--primary)" strokeWidth="1" />
      <circle cx="40" cy="40" r="4" fill="var(--primary)" />
      <line x1="40" y1="16" x2="40" y2="24" stroke="var(--primary)" strokeWidth="1.5" />
      <line x1="40" y1="56" x2="40" y2="64" stroke="var(--primary)" strokeWidth="1.5" />
      <line x1="16" y1="40" x2="24" y2="40" stroke="var(--primary)" strokeWidth="1.5" />
      <line x1="56" y1="40" x2="64" y2="40" stroke="var(--primary)" strokeWidth="1.5" />
    </svg>
  );
}

// Lightbox for architecture diagram
export function Lightbox({ src, alt, onClose }) {
  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'var(--surface)', color: 'var(--ink)' }}
      >
        <X size={20} />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="relative max-w-5xl w-full mx-4">
        <img src={src} alt={alt} className="w-full h-auto rounded-2xl" />
      </div>
    </div>
  );
}
