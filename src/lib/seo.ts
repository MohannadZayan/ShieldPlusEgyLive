/**
 * Per-page SEO. Titles and descriptions describe only what the client actually
 * offers — no keyword stuffing, no claims the business hasn't made.
 */

import type { Metadata } from "next";

import { BUSINESS, type Locale } from "./business";
import { LOCALES } from "./i18n";

type Copy = { title: string; description: string };

/** Builds canonical + hreflang metadata for a page at `/{locale}/{segment}`. */
export function pageMetadata(
  locale: Locale,
  segment: string,
  copy: Record<Locale, Copy>,
): Metadata {
  const { title, description } = copy[locale];
  const path = segment ? `/${locale}/${segment}` : `/${locale}`;

  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, segment ? `/${l}/${segment}` : `/${l}`]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ...languages, "x-default": segment ? `/en/${segment}` : "/en" },
    },
    openGraph: {
      title: `${title} | ${BUSINESS.name}`,
      description,
      url: `${BUSINESS.siteUrl}${path}`,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
  };
}

/** Both locales are prerendered for every page. */
export function localeParams() {
  return LOCALES.map((locale) => ({ locale }));
}
