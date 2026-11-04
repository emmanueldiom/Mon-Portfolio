import { useEffect } from 'react';
import { profile } from '../content/profile';

const DEFAULT_TITLE = `${profile.firstName} ${profile.lastName} · ${profile.role}`;

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

/** Met à jour titre, description, canonique et Open Graph pour la page affichée. */
export function useDocumentMeta({ title, description, path = '/' }: { title?: string; description?: string; path?: string }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${profile.firstName} ${profile.lastName}` : DEFAULT_TITLE;
    const url = new URL(path, profile.siteUrl).toString();
    document.title = fullTitle;
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    }
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [title, description, path]);
}
