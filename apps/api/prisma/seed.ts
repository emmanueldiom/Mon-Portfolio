import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.project.deleteMany();

  const categories = [
    {
      name: 'Backend',
      icon: 'server',
      sortOrder: 1,
      skills: [
        { name: 'Python', icon: 'python', proficiency: 65 },
        { name: 'Django', icon: 'bolt', proficiency: 40 },
      ],
    },
    {
      name: 'Frontend',
      icon: 'laptop-code',
      sortOrder: 2,
      skills: [
        { name: 'HTML', icon: 'html5', proficiency: 100 },
        { name: 'CSS', icon: 'css3', proficiency: 90 },
        { name: 'Tailwind CSS', icon: 'wind', proficiency: 55 },
        { name: 'React', icon: 'react', proficiency: 20 },
      ],
    },
    {
      name: 'Base de données',
      icon: 'database',
      sortOrder: 3,
      skills: [
        { name: 'SQL', icon: 'table', proficiency: 60 },
        { name: 'PostgreSQL', icon: 'database', proficiency: 50 },
        { name: 'SQLite', icon: 'circle-dot', proficiency: 50 },
      ],
    },
    {
      name: 'Outils',
      icon: 'wrench',
      sortOrder: 4,
      skills: [
        { name: 'Git', icon: 'git-alt', proficiency: 80 },
        { name: 'GitHub', icon: 'github', proficiency: 80 },
        { name: 'Render', icon: 'cloud-arrow-up', proficiency: 60 },
        { name: 'Postman', icon: 'paper-plane', proficiency: 70 },
      ],
    },
  ];

  for (const category of categories) {
    await prisma.skillCategory.create({
      data: {
        name: category.name,
        icon: category.icon,
        sortOrder: category.sortOrder,
        skills: { create: category.skills },
      },
    });
  }

  await prisma.project.createMany({
    data: [
      { title: 'Image Generator', description: 'Application de génération d’images par intelligence artificielle à partir de prompts textuels.', image: '/images/image1.png', demoUrl: 'https://ai-image-generator-9679.onrender.com/', sortOrder: 1 },
      { title: 'CRUD', description: 'Système CRUD pour la gestion efficace des données des employés.', image: '/images/image2.png', demoUrl: 'https://crud-django-ddhm.onrender.com/', sortOrder: 2 },
      { title: 'Calculatrice', description: 'Application de calcul avec interface intuitive pour opérations essentielles.', image: '/images/image3.png', demoUrl: 'https://calculatrice-chi-rouge.vercel.app/', sortOrder: 3 },
      { title: 'SnakeGame', description: 'Implémentation moderne du jeu Snake avec gestion du score.', image: '/images/image4.png', demoUrl: 'https://snake-game-qns7.vercel.app/', sortOrder: 4 },
      { title: 'Authentification', description: 'Système sécurisé d’inscription et de connexion utilisateur.', image: '/images/image5.png', demoUrl: 'https://authentification-phi.vercel.app/', sortOrder: 5 },
      { title: 'Portfolio', description: 'Portfolio moderne présentant mes projets web.', image: '/images/image6.png', demoUrl: 'https://github.com/emmanueldiom/Mon-Portfolio', sortOrder: 6 },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
