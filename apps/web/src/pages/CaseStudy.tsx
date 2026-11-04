import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { m } from 'motion/react';
import type { ReactNode } from 'react';
import { caseStudies, getCaseStudy } from '../content/projects';
import { GithubIcon } from '../components/ui/BrandIcons';
import { Picture } from '../components/ui/Picture';
import { RevealText } from '../components/ui/RevealText';
import { Link } from '../lib/router';
import { useDocumentMeta } from '../lib/seo';
import { StaticSignal } from '../three/StaticSignal';
import { NotFound } from './NotFound';

const appear = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <m.section className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8" {...appear}>
      <h2 className="eyebrow lg:col-span-3">{label}</h2>
      <div className="lg:col-span-8">{children}</div>
    </m.section>
  );
}

export function CaseStudy({ slug }: { slug: string }) {
  const project = getCaseStudy(slug);
  useDocumentMeta({ title: project?.title ?? 'Projet introuvable', description: project?.summary, path: `/projets/${slug}` });
  if (!project) return <NotFound />;

  const index = caseStudies.indexOf(project);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const accent = project.accent === 'violet' ? 'text-violet' : 'text-cyan';

  return (
    <article className="shell pb-16 pt-28 md:pt-36" aria-labelledby="case-title">
      <Link to="/#projets" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-fg">
        <ArrowLeft size={14} aria-hidden="true" /> Tous les projets
      </Link>

      <header className="mt-10 grid gap-10">
        <p className={`eyebrow ${accent}`}>
          Étude de cas · {project.year}
        </p>
        <h1 id="case-title" className="display text-[clamp(3.5rem,11vw,10rem)]">
          <RevealText immediate lines={[project.title]} />
        </h1>
        <m.p className="display-soft max-w-[32ch] text-[clamp(1.4rem,2.4vw,2rem)] text-dim" {...appear}>
          {project.summary}
        </m.p>

        <m.dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4" {...appear}>
          <div className="grid content-start gap-2">
            <dt className="eyebrow">Rôle</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="grid content-start gap-2">
            <dt className="eyebrow">Année</dt>
            <dd>{project.year}</dd>
          </div>
          <div className="grid content-start gap-2">
            <dt className="eyebrow">Stack</dt>
            <dd className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="border border-line px-2 py-0.5 font-mono text-[0.6875rem] text-dim">
                  {tech}
                </span>
              ))}
            </dd>
          </div>
          <div className="grid content-start gap-2">
            <dt className="eyebrow">Liens</dt>
            <dd className="grid gap-2">
              {project.demo ? (
                <>
                  <a href={project.demo.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-cyan hover:underline">
                    {project.demo.label} <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                  {project.demo.note ? <span className="text-xs text-muted">{project.demo.note}</span> : null}
                </>
              ) : null}
              {project.repo ? (
                <a href={project.repo.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-dim hover:text-fg">
                  <GithubIcon size={14} /> {project.repo.label}
                  <span className="sr-only">sur GitHub (nouvel onglet)</span>
                </a>
              ) : null}
            </dd>
          </div>
        </m.dl>
      </header>

      <m.figure className="mt-16 grid gap-3" {...appear}>
        <div className="aspect-[16/10] max-w-full overflow-hidden border border-line bg-ink-2">
          {project.image ? (
            <Picture image={project.image} sizes="(min-width: 1440px) 1312px, 100vw" imgClassName="block h-full w-full object-cover" priority />
          ) : (
            <StaticSignal />
          )}
        </div>
        <figcaption className="eyebrow">{project.image ? project.image.alt : 'Le champ de points du Hero, en version fixe.'}</figcaption>
      </m.figure>

      <div className="mt-24 grid gap-16">
        <Block label="Contexte">
          <p className="display-soft text-[clamp(1.25rem,2vw,1.6rem)] text-fg">{project.context}</p>
        </Block>
        <Block label="Le problème">
          <p className="max-w-[62ch] text-lg text-dim">{project.problem}</p>
        </Block>
        <Block label="Ce que j'ai construit">
          <ul className="grid gap-4">
            {project.features.map((feature) => (
              <li key={feature} className="grid grid-cols-[1.5rem_1fr] text-lg text-dim">
                <span aria-hidden="true" className={accent}>
                  —
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </Block>
        <Block label="Défis techniques">
          <div className="grid gap-10 md:grid-cols-2">
            {project.challenges.map((challenge) => (
              <div key={challenge.title} className="grid content-start gap-3">
                <h3 className="display-soft text-2xl">{challenge.title}</h3>
                <p className="text-dim">{challenge.body}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block label="Prochaines étapes">
          <ul className="grid gap-3">
            {project.nextSteps.map((step) => (
              <li key={step} className="grid grid-cols-[1.5rem_1fr] text-dim">
                <span aria-hidden="true">→</span>
                {step}
              </li>
            ))}
          </ul>
        </Block>
        <Block label="Ce que j'en retiens">
          <p className="display-soft max-w-[40ch] text-[clamp(1.4rem,2.4vw,2rem)] text-fg">{project.learnings}</p>
        </Block>
      </div>

      <nav aria-label="Projet suivant" className="mt-32 border-t border-line pt-8">
        <Link to={`/projets/${next.slug}`} data-cursor="Suivant" className="group grid gap-4">
          <span className="eyebrow">Projet suivant</span>
          <span className="display flex items-center gap-4 text-[clamp(2.75rem,8vw,7rem)] transition-colors duration-500 group-hover:text-cyan">
            {next.title}
            <ArrowRight aria-hidden="true" className="h-[0.4em] w-[0.4em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
