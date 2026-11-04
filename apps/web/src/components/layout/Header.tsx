import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../../content/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import { Link } from '../../lib/router';

const NAV = [
  { href: '/#projets', label: 'Projets' },
  { href: '/#expertise', label: 'Expertise' },
  { href: '/#parcours', label: 'Parcours' },
  { href: '/#vision', label: 'Vision' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const time = useLocalTime(profile.location.timeZone);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Se cache en descendant, réapparaît en remontant.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > previous && !open);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <m.header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-500 ${
          scrolled && !open ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'
        }`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link to="/" className="display text-2xl leading-none" onClick={() => setOpen(false)}>
            E<span className="text-cyan">.</span>D<span className="sr-only"> · Emmanuel Diomandé, accueil</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="group relative font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-dim transition-colors hover:text-fg">
                    {item.label}
                    <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="eyebrow hidden lg:block" aria-label={`Heure locale à ${profile.location.city} : ${time}`}>
            {profile.location.city} <span className="text-fg">{time}</span> GMT
          </p>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-full bg-fg transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-full bg-fg transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[calc(4rem+env(safe-area-inset-top))] md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Navigation mobile" className="shell flex flex-1 flex-col justify-center">
              <ul className="grid gap-2">
                {NAV.map((item, index) => (
                  <li key={item.href} className="overflow-hidden">
                    <m.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.15 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="display block py-1 text-[clamp(3rem,16vw,5rem)] transition-colors active:text-cyan"
                      >
                        {item.label}
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="shell eyebrow pb-[max(2rem,env(safe-area-inset-bottom))]">
              {profile.location.city} · {time} GMT
            </p>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
