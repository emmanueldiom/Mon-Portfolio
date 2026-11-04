import { ArrowDownToLine, ArrowUpRight, LoaderCircle } from 'lucide-react';
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '../content/profile';
import { CopyEmail } from '../components/ui/CopyEmail';
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons';
import { RevealText } from '../components/ui/RevealText';
import { ContactError, sendContact, validateContact, type ContactErrors, type ContactField } from '../lib/contact';

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; message: string };

const EMPTY = { name: '', email: '', subject: '', message: '' };

const FIELDS: { name: ContactField; label: string; type?: string; autoComplete?: string; optional?: boolean; multiline?: boolean }[] = [
  { name: 'name', label: 'Nom', autoComplete: 'name' },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Sujet', optional: true },
  { name: 'message', label: 'Message', multiline: true },
];

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next));
    if (status.state === 'error' || status.state === 'sent') setStatus({ state: 'idle' });
  }

  function blur(field: ContactField) {
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors(validateContact(values));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = FIELDS.find((field) => found[field.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus({ state: 'sending' });
    try {
      await sendContact({ ...values, _gotcha: honeypotRef.current?.value ?? '' });
      setStatus({ state: 'sent' });
      setValues(EMPTY);
      setTouched({});
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof ContactError ? error.message : 'Une erreur inattendue est survenue. Réessayez dans un instant.',
      });
    }
  }

  const sending = status.state === 'sending';

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="grid content-start gap-10 lg:col-span-6">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-cyan" />
            Contact
          </p>
          <h2 id="contact-title" className="display text-[clamp(3.25rem,9vw,8.5rem)]">
            <RevealText lines={['Écrivons', 'la suite.']} />
          </h2>
          <p className="max-w-[44ch] text-lg text-dim">
            Une application à construire, une idée à tester ou une question sur un projet : écrivez-moi, je lis chaque message.
          </p>
          <CopyEmail email={profile.email} />
          <ul className="flex flex-wrap gap-3">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm transition-colors hover:border-cyan hover:text-cyan">
                <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm transition-colors hover:border-cyan hover:text-cyan">
                <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={profile.cvUrl} download className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm transition-colors hover:border-cyan hover:text-cyan">
                <ArrowDownToLine size={16} aria-hidden="true" /> CV (PDF)
              </a>
            </li>
          </ul>
        </div>

        <form ref={formRef} onSubmit={submit} noValidate className="grid content-start gap-8 lg:col-span-5 lg:col-start-8" aria-describedby="form-status">
          {FIELDS.map((field) => {
            const error = touched[field.name] ? errors[field.name] : undefined;
            const id = `contact-${field.name}`;
            const describedBy = error ? `${id}-error` : undefined;
            const common = {
              id,
              name: field.name,
              value: values[field.name],
              onChange: update,
              onBlur: () => blur(field.name),
              required: !field.optional,
              disabled: sending,
              'aria-invalid': error ? true : undefined,
              'aria-describedby': describedBy,
              className: `peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-1 text-lg text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-cyan focus-visible:outline-none disabled:opacity-50 ${
                error ? 'border-danger' : 'border-line-strong'
              }`,
            };
            return (
              <div key={field.name} className="grid gap-2">
                <label htmlFor={id} className="eyebrow flex justify-between">
                  {field.label}
                  {field.optional ? <span>Facultatif</span> : null}
                </label>
                {field.multiline ? (
                  <textarea {...common} rows={5} className={`${common.className} resize-y`} />
                ) : (
                  <input {...common} type={field.type ?? 'text'} autoComplete={field.autoComplete} />
                )}
                {error ? (
                  <p id={`${id}-error`} className="text-sm text-danger">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}

          {/* Champ piège invisible pour les humains, rempli par les robots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Ne pas remplir</label>
            <input ref={honeypotRef} id="contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 bg-cyan px-7 py-4 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-fg disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? <LoaderCircle size={16} aria-hidden="true" className="animate-spin" /> : null}
              {sending ? 'Envoi en cours' : 'Envoyer le message'}
            </button>
            <p id="form-status" role="status" aria-live="polite" className="text-sm">
              {status.state === 'sent' ? <span className="text-cyan">Message envoyé. Je vous réponds dès que possible.</span> : null}
              {status.state === 'error' ? <span className="text-danger">{status.message}</span> : null}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
