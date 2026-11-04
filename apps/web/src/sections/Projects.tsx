import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, m, useMotionValue, useSpring } from 'motion/react';
import { useState, type PointerEvent } from 'react';
import { caseStudies, labItems } from '../content/projects';
import type { CaseStudy } from '../types/content';
import { Picture } from '../components/ui/Picture';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GithubIcon } from '../components/ui/BrandIcons';
import { useFinePointerDesktop, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { Link } from '../lib/router';
import { StaticSignal } from '../three/StaticSignal';

function ProjectCover({ project, priority = false }: { project: CaseStudy; priority?: boolean }) {
  if (project.image) {
    return <Picture image={project.image} sizes="(min-width: 1024px) 360px, 100vw" imgClassName="block h-full w-full object-cover" priority={priority} />;
  }
  // Ce portfolio n'a pas de capture : on montre son propre champ de points.
  return (
    <div className="h-full w-full bg-ink-2">
      <StaticSignal />
    </div>
  );
}

export function Projects() {
  // Les deux hooks sont toujours appelés : un hook conditionnel casserait l'ordre des hooks.
  const finePointer = useFinePointerDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const richHover = finePointer && !reducedMotion;
  const [hovered, setHovered] = useState<CaseStudy | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const followY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    x.set(event.clientX);
    y.set(event.clientY);
  }

  return (
    <section id="projets" aria-labelledby="projects-title" className="shell py-28 md:py-40">
      <SectionHeader
        id="projects-title"
        label="Projets sélectionnés"
        title={['Projets', 'choisis.']}
        aside={<p className="max-w-[34ch]">Chaque étude de cas décrit ce que le code fait vraiment, défis et prochaines étapes compris.</p>}
      />

      <ol className="mt-16 border-b border-line" onPointerMove={richHover ? onPointerMove : undefined} onPointerLeave={() => setHovered(null)}>
        {caseStudies.map((project) => (
          <li key={project.slug} className="border-t border-line">
            <Link
              to={`/projets/${project.slug}`}
              data-cursor="Lire"
              onPointerEnter={richHover ? () => setHovered(project) : undefined}
              onFocus={() => setHovered(null)}
              className="group grid gap-x-8 gap-y-4 py-8 md:grid-cols-12 md:items-baseline md:py-10"
            >
              <span className="eyebrow md:col-span-1">{project.year}</span>
              <span className="grid gap-3 md:col-span-7">
                <span className="display flex items-baseline gap-3 text-[clamp(2.5rem,6.5vw,5.75rem)] transition-[color,transform] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:text-cyan group-focus-visible:text-cyan">
                  {project.title}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-[0.45em] w-[0.45em] shrink-0 -translate-x-2 opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>
                <span className="max-w-[52ch] text-dim">{project.summary}</span>
              </span>
              <span className="eyebrow md:col-span-4 md:text-right">{project.stack.slice(0, 4).join(' · ')}</span>
              {/* Mobile et tablette : la capture est affichée dans la ligne. */}
              <span className="block aspect-[16/10] max-w-full overflow-hidden border border-line md:col-span-12 lg:hidden">
                <ProjectCover project={project} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Ordinateur : la capture suit le curseur. */}
      {richHover ? (
        <m.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[360px] lg:block"
          style={{ x: followX, y: followY, translateX: '14%', translateY: '-55%' }}
        >
          <AnimatePresence>
            {hovered ? (
              <m.div
                key={hovered.slug}
                className="aspect-[16/10] overflow-hidden border border-line-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCover project={hovered} />
              </m.div>
            ) : null}
          </AnimatePresence>
        </m.div>
      ) : null}

      <div className="mt-24 grid gap-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-cyan" />
            Lab · exercices
          </h3>
          <p className="max-w-[48ch] text-sm text-muted">Des projets courts pour pratiquer JavaScript et l’interface, avant les applications complètes.</p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labItems.map((item) => (
            <li key={item.title} className="group grid content-start gap-4">
              <div className="aspect-[16/10] max-w-full overflow-hidden border border-line">
                <Picture
                  image={item.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  imgClassName="block h-full w-full object-cover opacity-80 grayscale transition duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <div className="grid gap-2">
                <p className="display-soft text-xl">{item.title}</p>
                <p className="text-sm text-dim">{item.description}</p>
                <p className="eyebrow">{item.stack.join(' · ')}</p>
              </div>
              <div className="flex gap-5 text-sm">
                <a href={item.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan hover:underline">
                  Démo <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">de {item.title} (nouvel onglet)</span>
                </a>
                <a href={item.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-dim hover:text-fg">
                  <GithubIcon size={14} /> Code
                  <span className="sr-only">de {item.title} sur GitHub (nouvel onglet)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
