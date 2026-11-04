/** Image servie depuis /public/media en AVIF + WebP. */
export interface MediaImage {
  /** Nom de base du fichier, sans largeur ni extension (ex. "crud-django"). */
  name: string;
  /** Largeurs disponibles, en pixels. */
  widths: number[];
  /** Dimensions intrinsèques de la plus grande version (évite les décalages de mise en page). */
  width: number;
  height: number;
  alt: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  role: string;
  /** Phrase d'accroche du Hero. */
  headline: string;
  /** Présentation : ce que je fais et pour qui. */
  intro: string;
  location: { city: string; country: string; coordinates: string; timeZone: string };
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  siteUrl: string;
}

export interface AboutContent {
  /** Texte révélé mot à mot. Les segments `muted` démarrent plus sombres. */
  statement: { text: string; muted?: boolean }[];
  facts: { label: string; value: string }[];
  principles: { title: string; body: string }[];
  now: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  items: string[];
  /** Niveau formulé en mots, jamais en pourcentage. */
  level: string;
  /** Slugs des projets qui prouvent la compétence. */
  evidence: string[];
  accent?: 'cyan' | 'violet';
}

export interface Challenge {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  /** Une phrase, affichée dans l'index. */
  summary: string;
  role: string;
  stack: string[];
  demo?: ExternalLink & { note?: string };
  repo?: ExternalLink;
  image?: MediaImage;
  context: string;
  problem: string;
  features: string[];
  challenges: Challenge[];
  nextSteps: string[];
  learnings: string;
  accent?: 'cyan' | 'violet';
}

export interface LabItem {
  title: string;
  description: string;
  stack: string[];
  demo: string;
  repo: string;
  image: MediaImage;
}

export interface TimelineEntry {
  period: string;
  kind: 'Formation' | 'Projets' | 'Certification' | 'Pratique';
  title: string;
  place?: string;
  body: string;
  current?: boolean;
}

export interface VisionContent {
  title: { text: string; accent?: boolean }[];
  quote: string;
  body: string;
  horizons: { label: string; body: string }[];
}
