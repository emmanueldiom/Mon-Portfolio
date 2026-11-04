/**
 * GSAP sert uniquement aux scènes liées au défilement (texte About, carte Vision),
 * situées sous la ligne de flottaison : il est chargé à la demande, hors du bundle initial.
 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

type GsapModule = typeof import('gsap')['gsap'];

let pending: Promise<GsapModule> | null = null;

export function loadGsap(): Promise<GsapModule> {
  pending ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return gsap;
  });
  return pending;
}
