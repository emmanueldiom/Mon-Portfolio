import type { ReactNode } from 'react';
import { RevealText } from './RevealText';

interface SectionHeaderProps {
  id: string;
  label: string;
  title: ReactNode[];
  aside?: ReactNode;
  accent?: 'cyan' | 'violet';
}

/** En-tête de section : étiquette mono à gauche, titre condensé, note optionnelle à droite. */
export function SectionHeader({ id, label, title, aside, accent = 'cyan' }: SectionHeaderProps) {
  return (
    <header className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
      <p className="eyebrow flex items-center gap-3 lg:col-span-3">
        <span aria-hidden="true" className={`h-px w-6 ${accent === 'violet' ? 'bg-violet' : 'bg-cyan'}`} />
        {label}
      </p>
      <h2 id={id} className="display text-[clamp(2.75rem,8vw,7.5rem)] lg:col-span-6">
        <RevealText lines={title} />
      </h2>
      {aside ? <div className="text-dim lg:col-span-3 lg:self-end">{aside}</div> : null}
    </header>
  );
}
