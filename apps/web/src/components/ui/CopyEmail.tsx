import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/** Adresse e-mail en grand, copiable en un clic, avec confirmation annoncée aux lecteurs d'écran. */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const addressRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (status === 'idle') return;
    const id = window.setTimeout(() => setStatus('idle'), 2400);
    return () => window.clearTimeout(id);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      // Presse-papiers refusé : on sélectionne l'adresse pour une copie manuelle.
      const node = addressRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      setStatus('failed');
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <a
        ref={addressRef}
        href={`mailto:${email}`}
        className="break-all font-mono text-[clamp(0.95rem,1.6vw,1.25rem)] text-cyan underline decoration-cyan/30 underline-offset-[6px] transition-colors hover:decoration-cyan"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-dim transition-colors hover:border-cyan hover:text-fg"
      >
        {status === 'copied' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {status === 'copied' ? 'Copiée' : 'Copier'}
      </button>
      <span role="status" className="sr-only">
        {status === 'copied' ? 'Adresse e-mail copiée.' : status === 'failed' ? 'Copie impossible : adresse sélectionnée, copiez-la avec Ctrl+C.' : ''}
      </span>
      {status === 'failed' ? <span className="eyebrow">Adresse sélectionnée · Ctrl+C</span> : null}
    </div>
  );
}
