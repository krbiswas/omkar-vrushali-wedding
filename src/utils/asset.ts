/**
 * Resolves a root-relative public asset path (e.g. "/images/foo.jpg") against
 * Vite's configured base path, so assets work both in dev (base "/") and when
 * deployed under a subpath (e.g. GitHub Pages "/omkar-vrushali-wedding/").
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}
