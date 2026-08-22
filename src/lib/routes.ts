/**
 * Site map — shared by the header, the footer and `sitemap.ts` so navigation
 * and SEO can never drift apart.
 */

import type { Locale } from "./business";
import type { Dict } from "./i18n";

/** Path segments, appended to `/{locale}`. "" is the home page. */
export const ROUTES = [
  { segment: "", key: "home" },
  { segment: "ppf", key: "ppf" },
  { segment: "thermal-insulation", key: "thermal" },
  { segment: "graphene", key: "graphene" },
  { segment: "polishing", key: "polishing" },
  { segment: "washing", key: "washing" },
  { segment: "contact", key: "contact" },
] as const;

export type RouteKey = (typeof ROUTES)[number]["key"];

/** Builds a locale-prefixed href, e.g. ("ar", "ppf") -> "/ar/ppf". */
export function href(locale: Locale, segment: string): string {
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

/** Nav items with labels resolved for the given locale. */
export function navItems(locale: Locale, t: Dict) {
  return ROUTES.map((r) => ({
    ...r,
    href: href(locale, r.segment),
    label: t.nav[r.key],
  }));
}

/** Service pages only — used by the footer's "Services" column. */
export function serviceItems(locale: Locale, t: Dict) {
  return navItems(locale, t).filter((r) => r.key !== "home" && r.key !== "contact");
}
