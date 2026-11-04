/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Adresse d'envoi du formulaire (Formspree par défaut). */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
