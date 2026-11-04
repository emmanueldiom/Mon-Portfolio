import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('Élément #root introuvable dans index.html.');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

// Page pré-rendue pour cette adresse : React reprend le HTML existant.
// Sinon (adresse inconnue servie par la redirection), on rend depuis zéro.
if (root.dataset.prerendered && normalize(root.dataset.prerendered) === normalize(window.location.pathname)) {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}
