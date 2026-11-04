import { ArrowLeft } from 'lucide-react';
import { Link } from '../lib/router';
import { useDocumentMeta } from '../lib/seo';

export function NotFound() {
  useDocumentMeta({ title: 'Page introuvable' });
  return (
    <section className="shell grid min-h-[80svh] content-center gap-8 pt-28" aria-labelledby="not-found-title">
      <p className="eyebrow text-cyan">Erreur 404</p>
      <h1 id="not-found-title" className="display text-[clamp(3.5rem,12vw,10rem)]">
        Rien ici.
      </h1>
      <p className="max-w-[44ch] text-lg text-dim">Cette page n’existe pas ou a changé d’adresse. Les projets sont sur la page d’accueil.</p>
      <Link to="/" className="inline-flex items-center gap-2 justify-self-start bg-cyan px-6 py-4 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-fg">
        <ArrowLeft size={16} aria-hidden="true" /> Retour à l’accueil
      </Link>
    </section>
  );
}
