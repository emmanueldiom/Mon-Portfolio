import { m } from 'motion/react';
import { useEffect, useRef } from 'react';
import { about } from '../content/profile';
import { Picture } from '../components/ui/Picture';
import { loadGsap, MOTION_OK } from '../lib/gsap';

export function About() {
  const statementRef = useRef<HTMLParagraphElement>(null);

  // Le texte s'éclaire mot à mot au rythme de la lecture.
  useEffect(() => {
    const node = statementRef.current;
    if (!node || !window.matchMedia(MOTION_OK).matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    // GSAP n'est téléchargé qu'à l'approche du texte, jamais pendant le premier affichage.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        start();
      },
      { rootMargin: '0px 0px 400px 0px' },
    );
    observer.observe(node);

    const start = () => loadGsap().then((gsap) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          node.querySelectorAll('[data-word]'),
          { opacity: 0.3 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: node, start: 'top 78%', end: 'bottom 52%', scrub: 0.6 },
          },
        );
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, []);

  return (
    <section id="a-propos" aria-labelledby="about-title" className="shell py-28 md:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <h2 id="about-title" className="eyebrow sticky top-24 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-cyan" />À propos
          </h2>
        </div>

        <div className="grid gap-16 lg:col-span-9">
          <div className="grid gap-10 md:grid-cols-9 md:gap-8">
            <p ref={statementRef} className="display-soft text-[clamp(1.75rem,3.4vw,3.25rem)] md:col-span-6">
              {about.statement.map((segment, s) =>
                segment.text.split(' ').map((word, w) => (
                  <span key={`${s}-${w}`} data-word className={segment.muted ? 'text-dim' : 'text-fg'}>
                    {word}{' '}
                  </span>
                )),
              )}
            </p>

            <m.figure
              className="duotone relative max-w-[320px] self-start overflow-hidden md:col-span-3 md:max-w-none"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              tabIndex={0}
            >
              <Picture
                image={{ name: 'portrait', widths: [480, 800], width: 800, height: 1000, alt: 'Portrait d’Emmanuel Diomandé en costume sombre.' }}
                sizes="(min-width: 768px) 25vw, 320px"
                imgClassName="block h-auto w-full"
              />
              <figcaption className="eyebrow absolute bottom-3 left-3 z-10 text-fg/80">Survolez · couleur</figcaption>
            </m.figure>
          </div>

          <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid gap-2">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid gap-10 md:grid-cols-3">
            {about.principles.map((principle, index) => (
              <m.div
                key={principle.title}
                className="grid content-start gap-3"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              >
                <h3 className="display-soft text-2xl">{principle.title}</h3>
                <p className="text-dim">{principle.body}</p>
              </m.div>
            ))}
          </div>

          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border border-line px-5 py-4">
            <span className="eyebrow flex items-center gap-2 text-cyan">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              En ce moment
            </span>
            <span className="text-dim">{about.now}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
