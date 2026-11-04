import type { CaseStudy, LabItem } from '../types/content';

/**
 * Chaque affirmation ci-dessous correspond à du code présent dans le dépôt lié.
 * Avant d'ajouter une fonctionnalité ici, vérifiez qu'elle existe dans le code.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-image-generator',
    title: 'AI Image Generator',
    year: '2026',
    summary: "Une application qui transforme un texte en images, en s'appuyant sur la file d'attente de Stable Horde.",
    role: 'Conception et développement',
    stack: ['Node.js', 'Express 5', 'JavaScript', 'HTML', 'CSS', 'API Stable Horde', 'Render'],
    accent: 'violet',
    demo: {
      label: 'Voir la démo',
      href: 'https://ai-image-generator-9679.onrender.com/',
      note: 'Hébergée sur l’offre gratuite de Render : le premier chargement peut prendre jusqu’à une minute.',
    },
    repo: { label: 'Code source', href: 'https://github.com/emmanueldiom/AI-IMAGE-GENERATOR' },
    image: {
      name: 'ai-image-generator',
      widths: [800],
      width: 800,
      height: 500,
      alt: "Interface de l'AI Image Generator : le prompt « un chien sur la lune » et quatre images générées.",
    },
    context:
      "Projet personnel pour comprendre comment une application web peut s'appuyer sur un service d'IA générative, sans jamais exposer de clé d'API dans le navigateur.",
    problem:
      "Les services gratuits de génération d'images ne répondent pas instantanément. Stable Horde place chaque demande dans une file d'attente partagée et la réponse peut prendre plusieurs minutes. L'interface doit rester utilisable pendant l'attente et expliquer clairement les échecs.",
    features: [
      'Saisie d’un prompt, avec une suggestion aléatoire parmi des exemples',
      'Génération de 1 à 4 images, lancées l’une après l’autre avec 3 secondes d’écart',
      'Une carte de chargement par image, remplacée par le résultat ou par le message d’erreur',
      'Téléchargement de chaque image générée',
      'Thème clair ou sombre, mémorisé dans le navigateur',
      'Serveur Express qui sert l’interface et relaie les demandes vers Stable Horde',
    ],
    challenges: [
      {
        title: 'Une génération asynchrone',
        body: "Le serveur soumet la tâche, puis interroge son état toutes les 5 secondes. Après 36 tentatives (3 minutes), il abandonne et renvoie une erreur 502 avec un message explicite.",
      },
      {
        title: 'Garder la clé côté serveur',
        body: "La clé est lue dans les variables d'environnement du serveur. Le navigateur n'appelle que la route /generate de l'application.",
      },
      {
        title: 'Renvoyer une image directement',
        body: "Stable Horde renvoie l'image encodée en base64. Le serveur la convertit en binaire et la renvoie avec son type MIME ; le navigateur l'affiche via une URL blob.",
      },
    ],
    nextSteps: [
      'Transmettre au serveur le format d’image et le modèle choisis dans l’interface',
      'Ajouter un second fournisseur pour prendre le relais quand la file d’attente est saturée',
    ],
    learnings:
      "Travailler avec un service externe lent m'a appris à concevoir l'interface autour de l'attente et de l'échec, pas seulement autour du cas idéal.",
  },
  {
    slug: 'crud-django',
    title: 'CRUD Django',
    year: '2026',
    summary: 'Une application de gestion des employés, du modèle de données au déploiement en production.',
    role: 'Conception et développement',
    stack: ['Python', 'Django 6', 'SQLite', 'Gunicorn', 'Render'],
    demo: {
      label: 'Voir la démo',
      href: 'https://crud-django-ddhm.onrender.com/',
      note: 'Hébergée sur l’offre gratuite de Render : le serveur se met en veille et peut mettre une minute à répondre.',
    },
    repo: { label: 'Code source', href: 'https://github.com/emmanueldiom/Crud-Django' },
    image: {
      name: 'crud-django',
      widths: [800],
      width: 800,
      height: 500,
      alt: 'Liste des employés avec leur e-mail, leur poste et leur salaire en FCFA, et les boutons Modifier et Supprimer.',
    },
    context:
      "Application construite pour maîtriser le cycle complet d'un projet Django : modèle, formulaires, vues, templates et mise en production.",
    problem:
      "Une petite structure a besoin d'une liste d'employés fiable : ajouter une personne, corriger ses informations et la retirer sans erreur de manipulation.",
    features: [
      'Liste des employés avec nom, e-mail, poste et salaire',
      'Ajout et modification via un formulaire Django (ModelForm) validé côté serveur',
      'Suppression avec page de confirmation, exécutée uniquement sur une requête POST',
      'Page 404 propre si l’employé demandé n’existe pas',
      'Déploiement sur Render avec Gunicorn',
    ],
    challenges: [
      {
        title: 'Un formulaire, deux usages',
        body: "La même vue de formulaire sert à la création et à la modification : pour modifier, l'instance existante est passée au ModelForm.",
      },
      {
        title: 'Sécuriser la suppression',
        body: "Un lien ne supprime jamais directement. Il affiche une confirmation ; seule la requête POST qui suit efface l'enregistrement.",
      },
      {
        title: 'Passer en production',
        body: 'Configuration pour Render : DEBUG désactivé, hôtes autorisés limités au domaine de production, serveur Gunicorn.',
      },
    ],
    nextSteps: [
      'Ajouter la recherche et la pagination',
      'Passer de SQLite à PostgreSQL pour conserver les données entre deux redémarrages',
    ],
    learnings:
      "Django apporte beaucoup de choses toutes prêtes. Le travail consiste à savoir lesquelles utiliser et à comprendre ce qu'elles font à ma place.",
  },
  {
    slug: 'portfolio',
    title: 'Ce portfolio',
    year: '2026',
    summary: 'Le site que vous lisez : une application React typée, animée et pensée pour rester rapide.',
    role: 'Conception, contenu et développement',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Motion', 'GSAP', 'React Three Fiber'],
    repo: { label: 'Code source', href: 'https://github.com/emmanueldiom/Mon-Portfolio' },
    context:
      "Refonte complète de mon premier portfolio en HTML, CSS et JavaScript. L'objectif : présenter mes projets tels qu'ils sont, avec la même exigence que pour une application cliente.",
    problem:
      "Un portfolio doit donner envie d'explorer sans ralentir la lecture : animations utiles, 3D légère, accessibilité et bon score de performance, y compris sur mobile.",
    features: [
      'Champ de points en 3D (WebGL) qui réagit au curseur, chargé uniquement sur ordinateur',
      'Contenus typés en TypeScript, séparés des composants',
      'Une page dédiée par étude de cas',
      'Animations désactivées si le système demande moins de mouvement',
      'Formulaire de contact validé, avec messages d’erreur explicites',
    ],
    challenges: [
      {
        title: 'La 3D sans pénaliser le chargement',
        body: "La scène est chargée à part, après l'affichage du texte, et seulement si l'appareil le permet. Sinon, une version fixe dessinée en 2D la remplace.",
      },
      {
        title: 'Des animations qui servent la lecture',
        body: 'Chaque mouvement accompagne une information : le texte qui s’éclaire au fil de la lecture, la frise qui avance, la carte qui se forme.',
      },
    ],
    nextSteps: ['Version anglaise', 'Ajouter chaque nouveau projet sous forme d’étude de cas'],
    learnings:
      'Retravailler mon propre site m’a obligé à juger mes projets avec honnêteté et à présenter seulement ce que le code prouve.',
  },
];

export const labItems: LabItem[] = [
  {
    title: 'Snake',
    description: 'Grille CSS de 30 × 30, boucle de jeu à 125 ms, collisions, meilleur score enregistré dans le navigateur et contrôles tactiles.',
    stack: ['JavaScript', 'CSS Grid'],
    demo: 'https://snake-game-qns7.vercel.app/',
    repo: 'https://github.com/emmanueldiom/SnakeGame',
    image: { name: 'snake', widths: [800], width: 800, height: 500, alt: 'Partie de Snake en cours, score 9.' },
  },
  {
    title: 'Calculatrice',
    description: 'Saisie au clavier ou à la souris, effacement et calcul de l’expression affichée.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    demo: 'https://calculatrice-chi-rouge.vercel.app/',
    repo: 'https://github.com/emmanueldiom/Calculatrice',
    image: { name: 'calculatrice', widths: [800], width: 800, height: 500, alt: 'Calculatrice affichant le résultat 20.' },
  },
  {
    title: 'Interface de connexion',
    description: 'Bascule animée entre les formulaires de connexion et d’inscription. Exercice d’interface, sans logique d’authentification.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://authentification-phi.vercel.app/',
    repo: 'https://github.com/emmanueldiom/Authentification',
    image: { name: 'interface-login', widths: [800], width: 800, height: 500, alt: 'Formulaire de connexion avec un panneau violet « Hello, welcome ».' },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((project) => project.slug === slug);
}
