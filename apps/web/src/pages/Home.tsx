import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { useDocumentMeta } from '../lib/seo';
import { Hero } from '../sections/Hero';

/**
 * Les sections sous le Hero sont des morceaux séparés, chacune dans sa propre frontière Suspense.
 * Le HTML pré-rendu les affiche immédiatement ; React les hydrate ensuite une par une,
 * en petites tâches, au lieu de bloquer le navigateur avec toute la page d'un coup.
 */
function section<T extends Record<string, ComponentType>>(load: () => Promise<T>, name: keyof T): LazyExoticComponent<ComponentType> {
  return lazy(() => load().then((module) => ({ default: module[name] })));
}

const About = section(() => import('../sections/About'), 'About');
const Projects = section(() => import('../sections/Projects'), 'Projects');
const Expertise = section(() => import('../sections/Expertise'), 'Expertise');
const Journey = section(() => import('../sections/Journey'), 'Journey');
const Vision = section(() => import('../sections/Vision'), 'Vision');
const Contact = section(() => import('../sections/Contact'), 'Contact');

const BELOW_THE_FOLD = [About, Projects, Expertise, Journey, Vision, Contact];

export function Home() {
  useDocumentMeta({
    description:
      "Emmanuel Diomandé, développeur Full Stack à Abidjan. Je conçois des applications web complètes, de l'interface à la base de données, et j'y intègre l'intelligence artificielle.",
  });

  return (
    <>
      <Hero />
      {BELOW_THE_FOLD.map((Section, index) => (
        <Suspense key={index} fallback={null}>
          <Section />
        </Suspense>
      ))}
    </>
  );
}
