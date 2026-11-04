import { ArrowDown, ArrowDownToLine } from 'lucide-react';
import { profile } from '../content/profile';
import { RevealText } from '../components/ui/RevealText';
import { HeroVisual } from '../three/HeroVisual';

/** Apparition en CSS : démarre dès l'affichage du HTML, sans attendre React. */
const fadeUp = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Champ de points : décor, à droite sur ordinateur, au milieu sur mobile. */}
      <div className="field-mask absolute inset-x-0 top-[22%] -z-10 h-[56%] lg:inset-y-0 lg:left-[28%] lg:right-0 lg:top-0 lg:h-full">
        <HeroVisual />
      </div>

      <div className="shell flex flex-1 flex-col justify-between gap-10 pb-6 pt-24 md:pt-28">
        <p className="fade-up eyebrow flex flex-wrap gap-x-4 gap-y-1" {...fadeUp(0.1)}>
          <span>
            {profile.location.city}, {profile.location.country}
          </span>
          <span aria-hidden="true" className="hidden text-line-strong sm:inline">
            /
          </span>
          <span>{profile.location.coordinates}</span>
        </p>

        <div className="grid gap-8">
          <h1 id="hero-title" className="display text-[clamp(4.25rem,15.5vw,13rem)]">
            <span className="sr-only">
              {profile.firstName} {profile.lastName}, {profile.role}
            </span>
            <span aria-hidden="true">
              <RevealText
                immediate
                delay={0.15}
                lines={[profile.firstName, profile.lastName]}
                lineClassName={(index) => (index === 1 ? 'pl-[0.55em] md:pl-[1.1em]' : '')}
              />
            </span>
          </h1>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="fade-up grid gap-3 md:col-span-6 lg:col-span-5" {...fadeUp(0.55)}>
              <p className="display-soft text-[clamp(1.5rem,2.6vw,2.25rem)] text-fg">
                {profile.role}
              </p>
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-dim">{profile.intro}</p>
            </div>

            <div className="fade-up flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7" {...fadeUp(0.7)}>
              <a
                href="#projets"
                className="group inline-flex items-center gap-3 bg-cyan px-6 py-4 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-fg"
              >
                Voir les projets
                <ArrowDown size={16} aria-hidden="true" className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0.5" />
              </a>
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-3 border border-line-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.08em] text-fg transition-colors hover:border-cyan hover:text-cyan"
              >
                CV · PDF
                <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="fade-up flex items-end justify-between gap-6 border-t border-line pt-4" {...fadeUp(0.9)}>
          <p className="eyebrow">Interface · API · Données · IA</p>
          <p className="eyebrow hidden items-center gap-3 sm:flex">
            Défiler
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_var(--ease-expo)_infinite] bg-cyan" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
