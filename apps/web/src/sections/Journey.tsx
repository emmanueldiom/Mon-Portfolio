import { m, useScroll } from 'motion/react';
import { useRef } from 'react';
import { timeline } from '../content/journey';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  // La ligne se remplit au fil du défilement.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });

  return (
    <section id="parcours" aria-labelledby="journey-title" className="shell py-28 md:py-40">
      <SectionHeader
        id="journey-title"
        label="Expérience et formation"
        title={['Le chemin', "jusqu'ici."]}
        aside={<p className="max-w-[34ch]">Formation et projets dans une seule chronologie : c’est ainsi que j’ai progressé.</p>}
      />

      <ol ref={listRef} className="relative mt-16 grid lg:ml-[25%]">
        <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(9rem+7px)]" />
        <m.span
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-cyan md:left-[calc(9rem+7px)]"
          style={{ scaleY: scrollYProgress }}
        />

        {timeline.map((entry) => (
          <li key={entry.title} className="relative grid gap-2 pb-12 pl-10 md:grid-cols-[9rem_1fr] md:gap-0 md:pl-0">
            <p className="eyebrow pt-1 md:pr-10 md:text-right">{entry.period}</p>
            <m.span
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-cyan bg-ink md:left-[9rem]"
              initial={{ scale: 0.4, backgroundColor: 'rgba(7, 9, 15, 1)' }}
              whileInView={{ scale: 1, backgroundColor: entry.current ? 'rgba(62, 227, 240, 1)' : 'rgba(7, 9, 15, 1)' }}
              viewport={{ once: true, margin: '0px 0px -35% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <m.div
              className="grid gap-2 md:pl-12"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow text-cyan">
                {entry.kind}
                {entry.current ? ' · en cours' : ''}
              </p>
              <h3 className="display-soft text-[clamp(1.5rem,2.6vw,2.25rem)]">{entry.title}</h3>
              {entry.place ? <p className="eyebrow">{entry.place}</p> : null}
              <p className="max-w-[56ch] text-dim">{entry.body}</p>
            </m.div>
          </li>
        ))}
      </ol>
    </section>
  );
}
