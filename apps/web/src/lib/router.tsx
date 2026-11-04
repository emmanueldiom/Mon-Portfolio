import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';

/**
 * Routeur minimal (History API) : le site n'a que trois types de pages,
 * une bibliothèque de routage serait une dépendance de trop.
 */
export type Route = { name: 'home' } | { name: 'project'; slug: string } | { name: 'notFound' };

function parse(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { name: 'home' };
  const match = path.match(/^\/projets\/([a-z0-9-]+)$/);
  if (match) return { name: 'project', slug: match[1] };
  return { name: 'notFound' };
}

interface RouterValue {
  route: Route;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

function scrollAfterNavigation(hash: string) {
  requestAnimationFrame(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
}

/** `initialPath` sert au pré-rendu, où `window` n'existe pas. */
export function RouterProvider({ children, initialPath }: { children: ReactNode; initialPath?: string }) {
  const [pathname, setPathname] = useState(() => initialPath ?? window.location.pathname);

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.href);
    window.history.pushState(null, '', url.pathname + url.hash);
    setPathname(url.pathname);
    scrollAfterNavigation(url.hash);
  }, []);

  const value = useMemo(() => ({ route: parse(pathname), navigate }), [pathname, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const value = useContext(RouterContext);
  if (!value) throw new Error('useRouter doit être utilisé dans <RouterProvider>.');
  return value;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; ref?: Ref<HTMLAnchorElement> };

/** Lien interne : intercepte le clic sauf pour une ancre de la page courante ou un clic modifié. */
export function Link({ to, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(to, window.location.href);
    // Même page avec ancre : le navigateur gère le défilement.
    if (url.pathname === window.location.pathname && url.hash) return;
    event.preventDefault();
    navigate(to);
  }

  return <a href={to} onClick={handleClick} {...rest} />;
}
