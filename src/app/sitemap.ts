import type { MetadataRoute } from "next";

import { BUSINESS } from "@/lib/business";
import { LOCALES } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";

/** Required by `output: "export"`: emit this once at build time as a file. */
export const dynamic = "force-static";


/**
 * Generated from `ROUTES`, so a new page appears in the sitemap automatically.
 * Each URL carries hreflang alternates for its counterpart locale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => {
      const path = route.segment ? `/${locale}/${route.segment}` : `/${locale}`;

      return {
        url: `${BUSINESS.siteUrl}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        // Home and the film catalogue are the pages worth ranking hardest.
        priority: route.segment === "" ? 1 : route.segment === "ppf" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              `${BUSINESS.siteUrl}${route.segment ? `/${l}/${route.segment}` : `/${l}`}`,
            ]),
          ),
        },
      };
    }),
  );
}
