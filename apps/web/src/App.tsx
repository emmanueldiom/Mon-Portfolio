import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { CursorFollower } from './components/cursor/CursorFollower';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { RouterProvider, useRouter } from './lib/router';
import { CaseStudy } from './pages/CaseStudy';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

function Routes() {
  const { route } = useRouter();
  switch (route.name) {
    case 'home':
      return <Home />;
    case 'project':
      return <CaseStudy key={route.slug} slug={route.slug} />;
    default:
      return <NotFound />;
  }
}

export function App({ initialPath }: { initialPath?: string }) {
  return (
    // reducedMotion="user" : Motion coupe les déplacements si le système le demande.
    <MotionConfig reducedMotion="user">
      {/* LazyMotion + composants `m` : seules les fonctions d'animation utilisées sont embarquées. */}
      <LazyMotion features={domAnimation} strict>
      <RouterProvider initialPath={initialPath}>
        <div className="grain">
          <a
            href="#contenu"
            className="fixed left-4 top-4 z-[80] -translate-y-24 bg-cyan px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-transform focus:translate-y-0"
          >
            Aller au contenu
          </a>
          <Header />
          <main id="contenu" tabIndex={-1} className="outline-none">
            <Routes />
          </main>
          <Footer />
          <CursorFollower />
        </div>
      </RouterProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
