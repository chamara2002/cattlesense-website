import { useState } from 'react';
import { Send, AlertCircle, CheckCircle, Mail, MapPin } from 'lucide-react';
import { Eyebrow, SectionTitle, Button, TodoChip } from '../components/Primitives';
import { Reveal } from '../components/Reveal';
import { contact } from '../data/siteContent';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const subject = encodeURIComponent(`CattleSense Enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    const mailto = `mailto:${contact.groupEmail !== 'TODO' ? contact.groupEmail : ''}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const field = (name, label, type = 'text', rows) => (
    <div>
      <label
        htmlFor={`contact-${name}`}
        className="block text-sm font-medium mb-1.5"
        style={{ color: 'var(--ink)' }}
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={`contact-${name}`}
          name={name}
          rows={rows}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'var(--surface-2)',
            border: `1px solid ${errors[name] ? 'var(--heat-2)' : 'var(--line)'}`,
            color: 'var(--ink)',
            resize: 'vertical',
            borderRadius: 'var(--radius-control)',
            fontFamily: 'var(--font-sans)',
          }}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        />
      ) : (
        <input
          id={`contact-${name}`}
          name={name}
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'var(--surface-2)',
            border: `1px solid ${errors[name] ? 'var(--heat-2)' : 'var(--line)'}`,
            color: 'var(--ink)',
            borderRadius: 'var(--radius-control)',
            fontFamily: 'var(--font-sans)',
          }}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        />
      )}
      {errors[name] && (
        <p id={`contact-${name}-error`} className="mt-1 text-xs flex items-center gap-1" style={{ color: 'var(--heat-2)' }}>
          <AlertCircle size={12} aria-hidden="true" /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      className="section-py"
      style={{ borderTop: '1px solid var(--line)', background: 'var(--surface-2)' }}
    >
      <div className="content-width">
        <Reveal>
          <Eyebrow>08 / CONTACT</Eyebrow>
          <SectionTitle className="mb-10">Get in Touch</SectionTitle>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl">
          {/* Left: invitation & details */}
          <Reveal delay={0}>
            <div className="space-y-4">
              <p className="mb-2" style={{ color: 'var(--ink-muted)', lineHeight: 1.8, fontSize: '1.02rem' }}>
                {contact.inviteText}
              </p>

              {/* Group Email */}
              <div
                className="rounded-2xl p-5 border flex items-start gap-3.5"
                style={{ background: 'var(--surface)', borderColor: 'var(--line)', borderRadius: 'var(--radius-card)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(15,118,110,0.1)', color: 'var(--primary)' }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    Group Email
                  </p>
                  <a
                    href={`mailto:${contact.groupEmail}`}
                    className="font-mono text-sm font-semibold hover:text-primary transition-colors"
                    style={{ color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}
                  >
                    {contact.groupEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div
                className="rounded-2xl p-5 border flex items-start gap-3.5"
                style={{ background: 'var(--surface)', borderColor: 'var(--line)', borderRadius: 'var(--radius-card)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(77,124,15,0.1)', color: 'var(--leaf)' }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    Address
                  </p>
                  <address className="not-italic text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                    Sri Lanka Institute of Information Technology,<br />
                    Malabe,<br />
                    Sri Lanka.
                  </address>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border p-6 space-y-5"
              style={{ background: 'var(--surface)', borderColor: 'var(--line)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius-card)' }}
              noValidate
              aria-label="Contact form"
            >
              {field('name', 'Your Name')}
              {field('email', 'Email Address', 'email')}
              {field('message', 'Message', 'text', 5)}

              {sent && (
                <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--leaf)' }}>
                  <CheckCircle size={15} aria-hidden="true" /> Opening your email app…
                </p>
              )}

              <Button
                variant="primary"
                as="button"
                id="contact-submit"
              >
                Send message <Send size={14} />
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
