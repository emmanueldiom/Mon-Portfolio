/**
 * Écrit le HTML pré-rendu de chaque page dans dist/ après le build.
 * Lancé par `npm run build`, après `vite build` (client) et `vite build --ssr` (serveur).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, routes } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');
const siteUrl = 'https://mon-portfolio-emmanuel01.vercel.app';

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function withMeta(html, route) {
  const url = new URL(route.path, siteUrl).toString();
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${escape(route.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/s, `$1${escape(route.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(route.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/s, `$1${escape(route.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
}

if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html ne contient pas <div id="root"></div> : pré-rendu impossible.');
}

for (const route of routes) {
  const body = await render(route.path);
  let html = withMeta(template, route);
  // La page 404 ne doit pas être indexée.
  if (route.path === '/404') html = html.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>');
  const page = html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="${route.path}">${body}</div>`,
  );
  // /projets/x est écrit dans projets/x.html : servi à l'adresse /projets/x grâce à cleanUrls (vercel.json).
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, `${route.path}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log(`pré-rendu ${route.path} (${(page.length / 1024).toFixed(1)} Ko)`);
}

// Le code serveur ne sert qu'au build : on ne le déploie pas.
await rm(ssrDir, { recursive: true, force: true });
