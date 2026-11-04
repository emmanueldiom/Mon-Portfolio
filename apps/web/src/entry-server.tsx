/**
 * Point d'entrée du pré-rendu (exécuté au build, dans Node).
 * Chaque page est écrite en HTML statique : le contenu s'affiche avant le chargement de React,
 * et les moteurs de recherche comme les aperçus de liens lisent le vrai texte.
 */
import { prerenderToNodeStream } from 'react-dom/static';
import { App } from './App';
import { profile } from './content/profile';
import { caseStudies } from './content/projects';

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
}

const siteName = `${profile.firstName} ${profile.lastName}`;

export const routes: PrerenderRoute[] = [
  {
    path: '/',
    title: `${siteName} · ${profile.role}`,
    description:
      "Emmanuel Diomandé, développeur Full Stack à Abidjan. Je conçois des applications web complètes, de l'interface à la base de données, et j'y intègre l'intelligence artificielle.",
  },
  ...caseStudies.map((project) => ({
    path: `/projets/${project.slug}`,
    title: `${project.title} · ${siteName}`,
    description: project.summary,
  })),
  // Servie par Vercel, avec le statut 404, pour toute adresse inconnue.
  { path: '/404', title: `Page introuvable · ${siteName}`, description: 'Cette page n’existe pas.' },
];

export async function render(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App initialPath={path} />);
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
