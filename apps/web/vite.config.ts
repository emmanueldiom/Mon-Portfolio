import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    // three.js est chargé à part, à la demande : sa taille ne compte pas dans le chargement initial.
    chunkSizeWarningLimit: 1000,
  },
});
