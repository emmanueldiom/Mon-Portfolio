/**
 * Envoi du formulaire de contact via Formspree (déjà utilisé par l'ancien site).
 * Aucun secret côté navigateur : l'identifiant du formulaire est public par conception.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? 'https://formspree.io/f/mjgpljlk';
const TIMEOUT_MS = 15_000;

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Champ piège : rempli uniquement par les robots. */
  _gotcha: string;
}

export type ContactField = 'name' | 'email' | 'subject' | 'message';
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(data: Omit<ContactPayload, '_gotcha'>): ContactErrors {
  const errors: ContactErrors = {};
  const name = data.name.trim();
  const message = data.message.trim();
  if (name.length < 2) errors.name = 'Indiquez votre nom (2 caractères minimum).';
  else if (name.length > 80) errors.name = 'Le nom ne doit pas dépasser 80 caractères.';
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = 'Indiquez une adresse e-mail valide, par exemple nom@domaine.com.';
  if (data.subject.trim().length > 120) errors.subject = 'Le sujet ne doit pas dépasser 120 caractères.';
  if (message.length < 10) errors.message = 'Votre message doit contenir au moins 10 caractères.';
  else if (message.length > 3000) errors.message = 'Votre message ne doit pas dépasser 3 000 caractères.';
  return errors;
}

export class ContactError extends Error {}

export async function sendContact(payload: ContactPayload): Promise<void> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
        _gotcha: payload._gotcha,
        _subject: `Portfolio · ${payload.subject.trim() || 'Nouveau message'}`,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = '';
      try {
        const body = (await response.json()) as { errors?: { message?: string }[] };
        detail = body.errors?.map((error) => error.message).filter(Boolean).join(' ') ?? '';
      } catch {
        // Réponse non JSON : on garde le message générique.
      }
      throw new ContactError(detail || "Le message n'a pas pu être envoyé. Réessayez dans un instant ou écrivez directement à l'adresse e-mail.");
    }
  } catch (error) {
    if (error instanceof ContactError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ContactError("Le service d'envoi met trop de temps à répondre. Réessayez dans un instant.");
    }
    throw new ContactError('Connexion impossible. Vérifiez votre connexion internet, puis réessayez.');
  } finally {
    window.clearTimeout(timer);
  }
}
