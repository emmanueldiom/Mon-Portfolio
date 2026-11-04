import { m, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { vision } from '../content/journey';
import { RevealText } from '../components/ui/RevealText';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { ABIDJAN, africaPoints, project } from './africa';

/** Générateur pseudo-aléatoire déterministe : même dispersion à chaque visite. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function AfricaField() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [assembled, setAssembled] = useState(true);
  const abidjan = project(ABIDJAN);
  const reducedMotion = usePrefersReducedMotion();
  const progressRef = useRef(1);
  const scheduleRef = useRef<() => void>(() => {});

  // Les points se rassemblent pendant que la carte entre dans l'écran.
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start 85%', 'center 55%'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  useMotionValueEvent(smoothProgress, 'change', (value) => {
    if (reducedMotion) return;
    progressRef.current = value;
    setAssembled(value > 0.92);
    scheduleRef.current();
  });

  const points = useMemo(() => {
    const random = seeded(7);
    return africaPoints().map((target) => ({
      target,
      start: { x: random() * 1.3 - 0.15, y: random() * 1.3 - 0.15 },
      delay: random() * 0.35,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const draw = () => {
      frame = 0;
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const radius = Math.max(1.1, w / 300);
      const progress = progressRef.current;
      for (const point of points) {
        const local = Math.min(1, Math.max(0, (progress - point.delay) / (1 - point.delay)));
        const eased = 1 - Math.pow(1 - local, 3);
        const x = (point.start.x + (point.target.x - point.start.x) * eased) * w;
        const y = (point.start.y + (point.target.y - point.start.y) * eased) * h;
        ctx.globalAlpha = 0.25 + 0.6 * eased;
        ctx.fillStyle = '#a48cff';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = new ResizeObserver(schedule);
    resize.observe(canvas);
    scheduleRef.current = schedule;
    schedule();

    return () => {
      scheduleRef.current = () => {};
      resize.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [points]);

  // Sans animation, la carte est formée d'emblée.
  useEffect(() => {
    const value = reducedMotion ? 1 : smoothProgress.get();
    progressRef.current = value;
    setAssembled(value > 0.92);
    scheduleRef.current();
  }, [reducedMotion, smoothProgress]);

  return (
    <div ref={wrapperRef} className="relative mx-auto aspect-[72/74] w-full max-w-[560px]">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div
        className={`absolute flex items-center gap-2 transition-opacity duration-700 ${assembled ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${abidjan.x * 100}%`, top: `${abidjan.y * 100}%` }}
      >
        <span aria-hidden="true" className="relative -ml-[6px] -mt-[6px] flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan" />
        </span>
        <span className="eyebrow -mt-[6px] text-cyan">Abidjan</span>
      </div>
      <p className="sr-only">Carte de l’Afrique formée de points, avec Abidjan mise en évidence.</p>
    </div>
  );
}

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative overflow-hidden border-y border-line bg-ink-2 py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="grid gap-10 lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-violet">
            <span aria-hidden="true" className="h-px w-6 bg-violet" />
            Vision
          </p>
          <h2 id="vision-title" className="display text-[clamp(3rem,8.5vw,8rem)]">
            <RevealText
              lines={vision.title.map((part) => (part.accent ? <span className="text-violet">{part.text}</span> : part.text))}
            />
          </h2>
          <m.blockquote
            className="display-soft max-w-[30ch] border-l border-violet pl-6 text-[clamp(1.25rem,2vw,1.6rem)] text-fg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {vision.quote}
          </m.blockquote>
          <p className="max-w-[52ch] text-dim">{vision.body}</p>
        </div>

        <div className="lg:col-span-6">
          <AfricaField />
        </div>

        <ol className="grid gap-8 border-t border-line pt-8 md:grid-cols-3 lg:col-span-12">
          {vision.horizons.map((horizon, index) => (
            <m.li
              key={horizon.label}
              className="grid content-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            >
              <p className="eyebrow text-violet">{horizon.label}</p>
              <p className="display-soft text-xl text-fg">{horizon.body}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
