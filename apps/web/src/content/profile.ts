import type { AboutContent, Profile } from '../types/content';

export const profile: Profile = {
  firstName: 'Emmanuel',
  lastName: 'Diomandé',
  role: 'Développeur Full Stack',
  headline: "Je conçois des applications web complètes, de l'interface à la base de données.",
  intro:
    "Basé à Abidjan, je conçois et développe des applications web pour les entreprises et les porteurs de projets : interfaces, API, bases de données et mise en ligne. J'y intègre progressivement l'intelligence artificielle.",
  location: {
    city: 'Abidjan',
    country: "Côte d'Ivoire",
    coordinates: '5°19′ N · 4°02′ O',
    timeZone: 'Africa/Abidjan',
  },
  email: 'diomemmanuel01@gmail.com',
  github: 'https://github.com/emmanueldiom',
  linkedin: 'https://www.linkedin.com/in/emmanuel-diomande-b3846234b/',
  cvUrl: '/cv/CV-Emmanuel-Diomande.pdf',
  siteUrl: 'https://mon-portfolio-emmanuel01.vercel.app',
};

export const about: AboutContent = {
  statement: [
    { text: "J'ai écrit mes premières lignes de HTML en 2024." },
    {
      text: "Depuis, je cherche à comprendre ce qui se passe sous chaque outil que j'utilise : le modèle Django qui devient une table, la requête qui attend la réponse d'une API, l'interface qui doit rester claire quand quelque chose échoue.",
      muted: true,
    },
  ],
  facts: [
    { label: 'Formation', value: 'Licence 3 Informatique, Génie Logiciel · UTA' },
    { label: 'Certificat', value: 'Développement backend Python/Django · Neopy, 2026' },
    { label: 'Langues', value: 'Français courant · Anglais en progression' },
  ],
  principles: [
    {
      title: "Comprendre avant d'assembler",
      body: "Je lis la documentation et le code avant d'empiler des bibliothèques. Un outil que je ne comprends pas devient une dette.",
    },
    {
      title: "Prévoir l'échec",
      body: "Une API qui tarde, un quota atteint, un champ mal rempli : l'interface doit dire ce qui se passe et quoi faire.",
    },
    {
      title: 'Mettre en ligne',
      body: "Mes projets tournent sur Vercel ou Render, pas seulement sur mon ordinateur. Le déploiement fait partie du travail.",
    },
  ],
  now: 'React et TypeScript, conception d’API, bases du machine learning avec Python.',
};
