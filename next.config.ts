import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CLAUDE.md is hand-written and is the project's source of truth for scope
  // and content rules. Stop `next dev` from regenerating over it.
  agentRules: false,

  // The site is bilingual and every page lives under /en or /ar.
  // Bare "/" has no content of its own — send it to the default locale.
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
