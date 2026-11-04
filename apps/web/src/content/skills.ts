import type { SkillGroup } from '../types/content';

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    name: 'Backend',
    items: ['Python', 'Django', 'Node.js', 'Express', 'API REST'],
    level: 'Projets déployés',
    evidence: ['crud-django', 'ai-image-generator'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'React', 'TypeScript'],
    level: 'React et TypeScript en progression',
    evidence: ['ai-image-generator', 'portfolio'],
  },
  {
    id: 'data',
    name: 'Données',
    items: ['SQL', 'PostgreSQL', 'SQLite', 'ORM Django'],
    level: 'Utilisé en projet',
    evidence: ['crud-django'],
  },
  {
    id: 'ia',
    name: 'IA',
    items: ['API de génération d’images', 'Python pour la donnée', 'Bases du machine learning'],
    level: 'En exploration',
    evidence: ['ai-image-generator'],
    accent: 'violet',
  },
  {
    id: 'tools',
    name: 'Outils',
    items: ['Git', 'GitHub', 'Postman', 'DBeaver', 'Render', 'Vercel'],
    level: 'Au quotidien',
    evidence: [],
  },
];
