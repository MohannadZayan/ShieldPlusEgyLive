import type { MetadataRoute } from "next";

import { BUSINESS } from "@/lib/business";

/** Required by `output: "export"`: emit this once at build time as a file. */
export const dynamic = "force-static";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BUSINESS.siteUrl}/sitemap.xml`,
  };
}
