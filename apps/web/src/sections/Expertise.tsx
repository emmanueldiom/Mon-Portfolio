import { Plus } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useId, useState } from 'react';
import { caseStudies } from '../content/projects';
import { skillGroups } from '../content/skills';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Link } from '../lib/router';
import { useFinePointerDesktop } from '../hooks/useMediaQuery';

export function Expertise() {
  const [active, setActive] = useState<string | null>(skillGroups[0].id);
  const hoverable = useFinePointerDesktop();
  const baseId = useId();

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="shell py-28 md:py-40">
      <SectionHeader
        id="expertise-title"
        label="Expertise"
        title={['Ce que je', 'sais faire.']}
        aside={<p className="max-w-[34ch]">Chaque domaine renvoie aux projets où je l’ai mis en pratique.</p>}
      />

      <ul className="mt-16 border-b border-line">
        {skillGroups.map((group) => {
          const open = active === group.id;
          const panelId = `${baseId}-${group.id}`;
          const evidence = group.evidence
            .map((slug) => caseStudies.find((project) => project.slug === slug))
            .filter((project) => project !== undefined);
          const accentText = group.accent === 'violet' ? 'text-violet' : 'text-cyan';

          return (
            <li
              key={group.id}
              className="border-t border-line"
              onMouseEnter={hoverable ? () => setActive(group.id) : undefined}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setActive(open ? null : group.id)}
                  className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 text-left md:grid-cols-12 md:py-8"
                >
                  <span className={`display text-[clamp(2.25rem,5.5vw,4.75rem)] transition-colors duration-500 md:col-span-4 ${open ? accentText : 'text-fg'}`}>
                    {group.name}
                  </span>
                  <Plus
                    size={20}
                    aria-hidden="true"
                    className={`self-center text-muted transition-transform duration-500 ease-[var(--ease-expo)] md:order-last md:col-span-1 md:justify-self-end ${open ? 'rotate-45' : ''}`}
                  />
                  <span className="col-span-2 text-dim md:col-span-5 md:col-start-5">{group.items.join(' · ')}</span>
                  <span className={`eyebrow col-span-2 md:col-span-2 md:text-right ${open ? accentText : ''}`}>{group.level}</span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-label={`Projets liés : ${group.name}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 pb-8 md:grid-cols-12">
                      <p className="eyebrow md:col-span-4">{evidence.length ? 'Prouvé dans' : 'Utilisé dans tous mes projets'}</p>
                      {evidence.length ? (
                        <ul className="flex flex-wrap gap-3 md:col-span-8">
                          {evidence.map((project) => (
                            <li key={project.slug}>
                              <Link
                                to={`/projets/${project.slug}`}
                                className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-cyan hover:text-cyan"
                              >
                                {project.title}
                                <span aria-hidden="true">→</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
