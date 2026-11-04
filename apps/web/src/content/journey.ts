import type { TimelineEntry, VisionContent } from '../types/content';

export const timeline: TimelineEntry[] = [
  {
    period: '2024',
    kind: 'Formation',
    title: "Entrée à l'Université de Technologie d'Abidjan",
    place: 'UTA · Abidjan',
    body: 'Licence Informatique, option Génie Logiciel. Premiers projets en HTML et CSS.',
  },
  {
    period: '2025',
    kind: 'Pratique',
    title: 'JavaScript et premières interfaces',
    body: 'Calculatrice, jeu Snake, interfaces animées : la logique côté navigateur, projet après projet.',
  },
  {
    period: 'Avril 2026',
    kind: 'Projets',
    title: 'Premières applications full stack',
    body: 'AI Image Generator avec Node.js et Express, puis une application Django déployée sur Render.',
  },
  {
    period: 'Juin 2026',
    kind: 'Certification',
    title: 'Certificat en développement backend Python/Django',
    place: 'Neopy',
    body: 'Modèles, vues, formulaires, ORM et logique métier côté serveur.',
  },
  {
    period: '2026 – 2027',
    kind: 'Formation',
    title: 'Licence 3 Informatique, Génie Logiciel',
    place: 'UTA · Abidjan',
    body: 'Dernière année de licence, en parallèle de mes projets.',
    current: true,
  },
];

export const vision: VisionContent = {
  title: [{ text: 'Construire une IA' }, { text: 'utile, ici.', accent: true }],
  quote: "L'IA ne remplace pas le développeur. Elle devient son meilleur outil, à condition de comprendre ce qu'elle fait.",
  body: "L'avenir du logiciel se joue à la rencontre du code et de l'intelligence artificielle. Je veux y apprendre mon métier, puis l'appliquer aux besoins du continent.",
  horizons: [
    { label: 'Maintenant', body: "Maîtriser toute la chaîne du web : interface, API, données et mise en ligne." },
    { label: 'Ensuite', body: "Intégrer des modèles de langage et des API d'IA dans des applications concrètes." },
    { label: 'À terme', body: "Contribuer à des technologies d'IA éthiques et accessibles, utiles à l'Afrique." },
  ],
};
