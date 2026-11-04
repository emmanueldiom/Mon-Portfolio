import { ArrowUp } from 'lucide-react';
import { profile } from '../../content/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

export function Footer() {
  const time = useLocalTime(profile.location.timeZone);
  const year = new Date().getFullYear();

  return (
    <footer className="shell pb-[max(2rem,env(safe-area-inset-bottom))] pt-24">
      <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end">
        <p className="display text-[clamp(3.5rem,12vw,9rem)] md:col-span-6" aria-hidden="true">
          E<span className="text-cyan">.</span>D
        </p>
        <div className="grid gap-2 md:col-span-3">
          <p className="eyebrow">Conçu et développé à {profile.location.city}</p>
          <p className="eyebrow">
            {profile.location.coordinates} · <span className="text-fg">{time}</span> GMT
          </p>
          <p className="eyebrow">© {year} {profile.firstName} {profile.lastName}</p>
        </div>
        <div className="flex items-center gap-5 md:col-span-3 md:justify-end">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-dim transition-colors hover:text-cyan" aria-label="GitHub (nouvel onglet)">
            <GithubIcon size={20} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-dim transition-colors hover:text-cyan" aria-label="LinkedIn (nouvel onglet)">
            <LinkedinIcon size={20} />
          </a>
          <a href="#contenu" className="ml-2 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-dim transition-colors hover:text-fg">
            Haut de page <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
