import { ExternalLink } from 'lucide-react';
import { Logo } from '../components/Logo';
import { site } from '../data/siteContent';

const NAV_LINKS = [
  { label: 'Domain', id: 'domain' },
  { label: 'Modules', id: 'modules' },
  { label: 'Milestones', id: 'milestones' },
  { label: 'Documents', id: 'documents' },
  { label: 'Presentations', id: 'presentations' },
  { label: 'Team', id: 'team' },
  { label: 'Contact', id: 'contact' },
];

export function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}
      role="contentinfo"
    >
      <div className="content-width" style={{ paddingTop: 48, paddingBottom: 40 }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Logo className="mb-3" />
            <p className="text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 1.65 }}>
              {site.fullTitle}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              Quick Links
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-sm transition-colors hover:text-primary"
                      style={{ color: 'var(--ink-muted)' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Live system */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              Live System
            </p>
            <a
              href={site.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
              style={{ color: 'var(--primary)' }}
            >
              {site.liveUrl.replace('https://', '')} <ExternalLink size={13} />
            </a>
            <p className="text-xs mt-2" style={{ color: 'var(--ink-muted)' }}>
              Access the live CattleSense platform for Sri Lankan dairy farmers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-end pt-6"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p className="text-xs text-right ml-auto" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} CattleSense
          </p>
        </div>
      </div>
    </footer>
  );
}
