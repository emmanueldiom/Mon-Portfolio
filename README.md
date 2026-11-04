# Emmanuel Diomandé · Portfolio

Portfolio de développeur Full Stack basé à Abidjan.
En ligne : https://mon-portfolio-emmanuel01.vercel.app

## Ce que contient le site

- **Hero** : nom, rôle et champ de points 3D (WebGL) qui réagit au curseur, chargé uniquement sur ordinateur.
- **À propos** : parcours, principes de travail, ce que j'apprends en ce moment.
- **Projets** : index des études de cas (une page par projet) et rubrique « Lab » pour les exercices.
- **Expertise** : compétences par domaine, chacune reliée aux projets qui la prouvent.
- **Parcours** : formation et projets dans une seule chronologie.
- **Vision** : l'IA au service de l'Afrique, avec une carte en points qui se forme au défilement.
- **Contact** : formulaire validé (envoi via Formspree) et adresse e-mail copiable.

## Stack

| Rôle | Outil |
| --- | --- |
| Interface | React 19, TypeScript (strict) |
| Build | Vite 8, pré-rendu HTML de chaque page au build |
| Styles | Tailwind CSS 4, polices auto-hébergées |
| Animations | Motion (apparitions, survols), GSAP ScrollTrigger (texte About), animations CSS (premier écran) |
| 3D | React Three Fiber + three.js, chargés à la demande |
| Icônes | Lucide React |

## Démarrer

Node 22.12 ou plus récent est nécessaire (`nvm use` lit le fichier `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # vérifie les types, construit et pré-rend les pages dans apps/web/dist
npm run preview   # sert la version construite
```

## Organisation

```
apps/web/
  src/content/     textes et données des projets, typés (seule source à modifier pour le contenu)
  src/sections/    les sections de la page d'accueil
  src/pages/       accueil, étude de cas, page 404
  src/three/       champ de points 3D et sa version fixe
  src/components/  en-tête, pied de page, curseur, composants réutilisables
  scripts/         pré-rendu HTML exécuté après le build
  public/          images optimisées (AVIF/WebP), polices, CV, image de partage
apps/api/          API NestJS + Prisma (non utilisée par le site, conservée)
```

**Ajouter un projet** : ajouter une entrée dans `apps/web/src/content/projects.ts`, ses images dans `apps/web/public/media/`, et son adresse dans `apps/web/public/sitemap.xml`. La page `/projets/<slug>` est générée au build.

## Déploiement (Vercel)

Dans les réglages du projet Vercel, définir **Root Directory** sur `apps/web`. La configuration (`apps/web/vercel.json`) gère le build, les adresses propres, la page 404, le cache et les en-têtes de sécurité (CSP, HSTS).

## Accessibilité et performance

- Animations coupées si le système demande moins de mouvement.
- Navigation au clavier, lien d'évitement, focus visible, menu mobile fermable avec Échap.
- Lighthouse (build local) : 100 en performance sur ordinateur, environ 90 sur mobile, SEO et bonnes pratiques à 100.

## Ancienne version

La première version statique (`index.html`, `about .html`, `style.css`, `script.js`, `images/`) reste à la racine, à titre d'archive. Elle n'est plus utilisée par le nouveau site.
