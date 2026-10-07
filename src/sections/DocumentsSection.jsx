import { FileText, Archive, Download } from 'lucide-react';
import { Eyebrow, SectionTitle, Button } from '../components/Primitives';
import { Reveal } from '../components/Reveal';
import { documents, presentations } from '../data/siteContent';

const TYPE_ICON = {
  PDF: FileText,
  ZIP: Archive,
};

function FileCard({ item, wide = false }) {
  const Icon = TYPE_ICON[item.type] || FileText;
  const bgColor = item.type === 'PDF'
    ? 'rgba(239,68,68,0.08)'
    : 'rgba(245,158,11,0.08)';
  const color = item.type === 'PDF' ? 'var(--heat-2)' : 'var(--heat-1)';

  return (
    <div
      className={`rounded-[20px] border p-5 flex ${wide ? 'flex-row items-center gap-5' : 'flex-col gap-4'} card-hover`}
      style={{
        background: item.available ? 'var(--surface)' : 'var(--surface-2)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
        opacity: item.available ? 1 : 0.65,
        borderRadius: 'var(--radius-card)',
      }}
    >
      {/* File type badge */}
      <div
        className={`${wide ? 'w-12 h-12 flex-shrink-0' : 'w-10 h-10'} rounded-xl flex items-center justify-center`}
        style={{ background: bgColor }}
      >
        <Icon size={wide ? 22 : 18} style={{ color }} aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h3
            className="font-heading font-semibold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '0.95rem' }}
          >
            {item.title}
          </h3>
          <span
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: bgColor,
              color,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
            }}
          >
            {item.type}
          </span>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
          {item.description}
        </p>
        <Button
          as={item.available ? 'a' : 'button'}
          href={item.available ? item.file : undefined}
          disabled={!item.available}
          variant={item.available ? 'outline' : 'ghost'}
          id={`download-${item.id}`}
        >
          {item.available ? (
            <><Download size={14} /> Download</>
          ) : (
            'Coming soon'
          )}
        </Button>
      </div>
    </div>
  );
}

export function DocumentsSection() {
  return (
    <section
      id="documents"
      className="section-py"
      style={{ borderTop: '1px solid var(--line)', background: 'var(--surface-2)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>05 / DOCUMENTS</Eyebrow>
          <SectionTitle className="mb-10">Project Documents</SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, i) => (
            <Reveal key={doc.id} delay={i}>
              <FileCard item={doc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PresentationsSection() {
  return (
    <section
      id="presentations"
      className="section-py"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>06 / PRESENTATIONS</Eyebrow>
          <SectionTitle className="mb-10">Presentations</SectionTitle>
        </Reveal>
        <div className="grid gap-4">
          {presentations.map((pres, i) => (
            <Reveal key={pres.id} delay={i}>
              <FileCard item={pres} wide />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
