/**
 * Resolves a path in `public/` to a URL that works under a base path.
 *
 * GitHub Project Pages serve the site from a subfolder
 * (`/ShieldPlusEgyLive/`), not the domain root. Next rewrites `next/image`
 * sources and `<Link href>` for that automatically — but it does NOT touch raw
 * attributes like `<video src>` or `poster`, which would then 404.
 *
 * Use this for every non-`next/image` reference to a file in `public/`.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
