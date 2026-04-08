# 🎯 Portfolio Personnel - Emmanuel

Bienvenue sur mon portfolio ! Ce projet présente mon profil professionnel, mes compétences techniques et mes réalisations en tant que **Junior Fullstack Developer**.

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation et utilisation](#-installation-et-utilisation)
- [Sections du portfolio](#-sections-du-portfolio)
- [Compétences](#-compétences)
- [Me contacter](#-me-contacter)

---

## 👨‍💻 À propos

Je suis **Emmanuel**, un **Junior Fullstack Developer** passionné par la conception de solutions numériques. Je transforme des idées en projets concrets en combinant créativité et rigueur technique.

**Mon profil :**

- 🎓 Toujours en apprentissage et à la recherche de nouveaux défis
- 🔧 Spécialisé en JavaScript, Python, React et Django
- 🚀 Intéressé par les technologies émergentes et l'IA
- 💡 Engagé à comprendre en profondeur les technologies et concevoir des solutions utiles

**Liens importants :**

- 🔗 [LinkedIn](https://www.linkedin.com/in/emmanuel-diomande-b3846234b/)
- 🐙 [GitHub](https://github.com/emmanueldiom)

---

## 📁 Structure du projet

```
Portfolio-Emmanuel-final/
├── index.html          # Page d'accueil principale
├── about.html          # Page "À propos" détaillée
├── style.css           # Styles personnalisés
├── script.js           # Fonctionnalités JavaScript
├── README.md           # Ce fichier
└── images/
    └── emmanuel.jpg    # Photo de profil
```

---

## ✨ Fonctionnalités

### 📱 Design Responsive

- **Mobile-first** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- Menu hamburger interactif pour mobile
- Navigation fluide et intuitive

### 🎨 Animations fluides

- **ScrollReveal** : Révélation progressive des sections
- **Typed.js** : Texte animé avec effet de frappe
- **Barres de progression** : Animation des compétences au scroll
- **Sticky navbar** : Barre de navigation collante

### 🎯 Navigation interactive

- Navigation par ancres (#home, #about, #skills, #portfolio, #contact)
- Mise en surbrillance automatique du lien actif
- Défilement doux entre sections

### 🎭 Effets visuels

- Thème dark moderne avec accent cyan
- Transitions fluides au survol
- Design minimaliste et professionnel

---

## 🛠️ Technologies utilisées

### Frontend

- **HTML5** : Structure sémantique
- **CSS3** : Design responsif, flexbox, variables CSS
- **JavaScript (ES6+)** : Interactivité et animations

### Librairies et frameworks

- **[ScrollReveal.js](https://scrollrevealjs.org/)** : Animations au scroll
- **[Typed.js](https://github.com/mattbolg/typed.js)** : Texte animé
- **[Font Awesome](https://fontawesome.com/)** : Icônes modernes

### Polices

- **Google Fonts - Poppins** : Typographie moderne et lisible

### Connexions externes

- **LinkedIn** : Profil professionnel
- **GitHub** : Repositories et projets

---

## 🚀 Installation et utilisation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Optionnel : Un serveur local développement

### Méthode 1 : Ouverture directe

```bash
# Naviguez simplement vers le fichier index.html
open index.html
# ou cliquez deux fois sur index.html
```

### Méthode 2 : Serveur local (recommandé)

```bash
# Avec Python 3
python3 -m http.server 8000

# Puis visitez : http://localhost:8000
```

```bash
# Avec Python 2
python -m SimpleHTTPServer 8000

# Puis visitez : http://localhost:8000
```

```bash
# Avec Node.js (http-server)
npx http-server

# Puis visitez : http://localhost:8080
```

---

## 📑 Sections du portfolio

### 🏠 **Home (Accueil)**

- Présentation personnelle percutante
- Différentes variantes de profession affichées dynamiquement
- Bouton de téléchargement du CV
- Liens vers profils LinkedIn et GitHub
- Photo de profil

### ℹ️ **About (À propos)**

- Description détaillée de mon profil
- Parcours professionnel et académique
- Philosophie de travail
- Lien vers une page dédiée pour plus de détails

### 🎓 **Skills (Compétences)**

Organisées par catégories avec barres de progression animées:

#### Backend

- **Python** : 65%
- **Django** : 40%

#### Frontend (voir page complète)

- **JavaScript** : Compétences avancées
- **React** : Développement de composants

#### Outils & Autres

- Maîtrise de Git, GitHub, VS Code
- Principes de programmation et de design

### 🎪 **Projects (Portfolio)**

Vitrine des projets réalisés avec :

- Descriptions des projets
- Technologies utilisées
- Liens vers les démos/repos

### 📮 **Contact**

- Formulaire de contact
- Méthodes de communication
- Coordonnées

---

## 💻 Compétences

### Langages de programmation

- **JavaScript** : DOM manipulation, ES6+, async/await
- **Python** : Scripting, automatisation
- **HTML5** & **CSS3** : Markup sémantique, design responsive

### Frameworks & Librairies

- **React** : Composants, hooks, state management
- **Django** : Développement web backend, ORM
- **SCSS/Tailwind** : Préprocesseurs CSS

### Outils & Techniques

- **Git & GitHub** : Versionning et collaboration
- **Responsive Design** : Mobile-first approach
- **SEO Basics** : Meta tags, structure sémantique
- **Web Performance** : Optimisation d'assets

### Autres

- Apirest
- Bases de données (SQL)
- API integrations

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `style.css` :

```css
:root {
  --bg-color: #1f242d; /* Fond principal */
  --second-bg-color: #323946; /* Fond secondaire */
  --text-color: #fff; /* Couleur texte */
  --main-color: #0ef; /* Accent (cyan) */
}
```

### Modifier le texte animé

Dans `script.js`, cherchez la section **Typed.js** :

```javascript
const typed = new Typed(".multiple-text", {
  strings: [
    "a Junior Fullstack Developer",
    "a Motivated Software Developer",
    "an Aspiring AI Engineer",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
```

### Ajouter des compétences

Dupliquez la structure `skill-item` dans `index.html` et mettez à jour le pourcentage.

---

## 📞 Me contacter

- **Email** : diomemmanuel01@gmail.com
- **LinkedIn** : [Emmanuel Diomandé](https://www.linkedin.com/in/emmanuel-diomande-b3846234b/)
- **GitHub** : [@emmanueldiom](https://github.com/emmanueldiom)
- **Formulaire de contact** : Disponible sur le site

---

## 📊 Performance & Optimisations

✅ **Léger** : Pas de heavy frameworks, utilise des CDN pour les librairies
✅ **Rapide** : Chargement optimisé des images
✅ **Accessible** : Navigation au clavier, contraste approprié
✅ **SEO-friendly** : Meta tags, structure sémantique HTML5

---

## 🔒 Licence & Crédits

Ce portfolio est mon travail personnel.

**Ressources utilisées :**

- Icon library : [Font Awesome](https://fontawesome.com/) - Icons
- Animation library : [ScrollReveal.js](https://scrollrevealjs.org/)
- Text animation : [Typed.js](https://typed.js.org/)
- Fonts : [Google Fonts](https://fonts.google.com/)

---

## 🚀 Améliorations futures

- [ ] Ajouter un système de dark/light mode switcher
- [ ] Intégrer un vrai formulaire de contact (backend)
- [ ] Ajouter des filtres pour les projets
- [ ] Implémenter un blog
- [ ] Ajouter des certificats
- [ ] Multilingue (FR/EN)
- [ ] Progressive Web App (PWA)

---

## 📝 Notes de développement

Pour mettre à jour ce portfolio :

1. Éditez directement les fichiers HTML, CSS, JS
2. Testez localement avant de déployer
3. Conservez une sauvegarde des versions
4. Maintenez ce README à jour

---

## ⭐ Vous aimez ce portfolio ?

Consultez mon [profil GitHub](https://github.com/emmanueldiom) pour voir d'autres projets !

---

**Dernière mise à jour** : Avril 2026
**Auteur** : Emmanuel Diomandé
**Status** : ✅ En production

---

<div align="center">

Merci d'avoir visité mon portfolio ! 👋

</div>
