import type { NextConfig } from "next";

/**
 * Base path for GitHub Project Pages, which serve from a subfolder
 * (`https://<user>.github.io/ShieldPlusEgyLive/`) rather than the domain root.
 *
 * Set by the deploy workflow. Leave EMPTY for a custom domain or for Vercel.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // CLAUDE.md is hand-written and is the project's source of truth for scope
  // and content rules. Stop `next dev` from regenerating over it.
  agentRules: false,

  /**
   * Static HTML export. The site has no backend, no API routes and no server
   * actions, so nothing is lost — every page was already prerendered. This is
   * what makes GitHub Pages possible, and it still deploys fine on Vercel.
   */
  output: "export",

  basePath: basePath || undefined,

  /**
   * The next/image optimizer needs a running server, which a static host has
   * no concept of. Images are therefore served at their original size.
   * Keep source images reasonably sized — nothing resizes them at request time.
   */
  images: { unoptimized: true },

  /**
   * Emit `/en/index.html` rather than `/en.html`, so static hosts resolve
   * directory-style URLs without per-host rewrite rules.
   */
  trailingSlash: true,

  /**
   * The "/" -> "/en/" hop is handled TWICE, on purpose, because each mechanism
   * only covers one environment:
   *
   *  - This redirect runs under `next dev` (and on a Node host such as
   *    Vercel). Without it, visiting localhost:3000 just 404s, since no route
   *    owns "/".
   *  - `public/index.html` covers the static export, where there is no server
   *    to perform a redirect. Next prints a warning that these redirects are
   *    not exported — that warning is expected and safe to ignore.
   */
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
