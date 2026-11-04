import { m, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useFinePointerDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Anneau qui suit la souris et affiche une étiquette sur les éléments [data-cursor].
 * Le curseur natif reste visible : l'anneau ajoute une information, il ne remplace rien.
 */
export function CursorFollower() {
  const finePointer = useFinePointerDesktop();
  const reducedMotion = usePrefersReducedMotion();
  if (!finePointer || reducedMotion) return null;
  return <Follower />;
}

function Follower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(target?.dataset.cursor ?? null);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [x, y]);

  const size = label ? 88 : 28;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.85 : 1,
        backgroundColor: label ? 'rgba(62, 227, 240, 1)' : 'rgba(62, 227, 240, 0)',
        borderColor: label ? 'rgba(62, 227, 240, 0)' : 'rgba(62, 227, 240, 0.6)',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {label ? <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.08em] text-ink">{label}</span> : null}
    </m.div>
  );
}
