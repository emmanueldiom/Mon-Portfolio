import { useEffect, useState } from 'react';

/** Heure locale d'une ville, mise à jour toutes les 30 secondes. */
export function useLocalTime(timeZone: string): string {
  // Vide au premier rendu : l'heure du pré-rendu serait fausse au moment de la visite.
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(format(timeZone));
    const id = window.setInterval(() => setTime(format(timeZone)), 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

function format(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date());
  } catch {
    return '';
  }
}
