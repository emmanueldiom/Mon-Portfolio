import { m } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

interface RevealTextProps {
  lines: ReactNode[];
  /** Classe appliquée à chaque ligne (ex. retrait de la deuxième ligne). */
  lineClassName?: (index: number) => string;
  delay?: number;
  /**
   * true : anime dès l'affichage, en CSS pur (Hero, titre d'étude de cas).
   * Le texte apparaît sans attendre le JavaScript, ce qui accélère le premier affichage.
   * false : anime à l'entrée dans l'écran, avec Motion.
   */
  immediate?: boolean;
}

/**
 * Chaque ligne monte derrière un masque. Le texte reste dans le DOM,
 * lisible par les lecteurs d'écran ; avec moins de mouvement, il s'affiche directement.
 */
export function RevealText({ lines, lineClassName, delay = 0, immediate = false }: RevealTextProps) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className={`block overflow-hidden pb-[0.06em] ${lineClassName?.(index) ?? ''}`}>
          {immediate ? (
            <span className="reveal-rise block" style={{ animationDelay: `${delay + index * 0.08}s` } as CSSProperties}>
              {line}
            </span>
          ) : (
            <m.span
              className="block will-change-transform"
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: delay + index * 0.08 }}
            >
              {line}
            </m.span>
          )}
        </span>
      ))}
    </>
  );
}
