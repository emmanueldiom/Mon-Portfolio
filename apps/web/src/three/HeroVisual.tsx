import { lazy, Suspense, useEffect, useState } from 'react';
import { useFinePointerDesktop, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { StaticSignal } from './StaticSignal';

const SignalScene = lazy(() => import('./SignalScene'));

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Décide entre la scène 3D et la version fixe.
 * La 3D n'est chargée qu'après l'affichage du texte, quand le navigateur est libre.
 */
export function HeroVisual() {
  const desktop = useFinePointerDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const [load3D, setLoad3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!desktop || reducedMotion || !supportsWebGL()) {
      setLoad3D(false);
      return;
    }
    const start = () => setLoad3D(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(start, 600);
    return () => globalThis.clearTimeout(id);
  }, [desktop, reducedMotion]);

  return (
    <div className="relative h-full w-full">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <StaticSignal />
      </div>
      {load3D ? (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
              <SignalScene onReady={() => setReady(true)} />
            </div>
          </Suspense>
        </ErrorBoundary>
      ) : null}
    </div>
  );
}
