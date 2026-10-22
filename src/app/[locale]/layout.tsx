import type { Metadata } from "next";
import { Cairo, Inter, Oswald } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { BUSINESS, type Locale } from "@/lib/business";
import { DEFAULT_LOCALE, LOCALES, dir, isLocale } from "@/lib/i18n";

/* -----------------------------------------------------------------------------
 * Fonts — self-hosted by next/font, so no render-blocking request to Google.
 * Oswald: Latin display. Inter: Latin body. Cairo: all Arabic.
 * -------------------------------------------------------------------------- */

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Both locales are known ahead of time — prerender them. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META = {
  en: {
    title: "ShieldPlusEGY — Paint Protection Film & Thermal Insulation | Dokki & Nasr City",
    description:
      "ShieldPlusEGY fits paint protection film, Eagle CM8060+ ceramic thermal insulation, Adams graphene protection, polishing and detailing in Dokki, Giza and Nasr City, Cairo. Eight PPF options with published prices.",
  },
  ar: {
    title: "شيلد بلس إيجيبت — أفلام حماية الطلاء والعزل الحراري | الدقي ومدينة نصر",
    description:
      "شيلد بلس بتركّب أفلام حماية الطلاء، والعزل الحراري إيجل CM8060+ سيراميك، وحماية الجرافين من آدامز، والتلميع والغسيل في الدقي بالجيزة ومدينة نصر بالقاهرة. ثمانية أفلام بأسعار معلنة.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const m = META[locale];

  return {
    metadataBase: new URL(BUSINESS.siteUrl),
    title: { default: m.title, template: `%s | ${BUSINESS.name}` },
    description: m.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: BUSINESS.name,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      title: m.title,
      description: m.description,
      url: `${BUSINESS.siteUrl}/${locale}`,
      images: [
        {
          url: "/media/work-bmw-x7.jpeg",
          width: 960,
          height: 1280,
          alt:
            locale === "ar"
              ? "سيارة BMW X7 سوداء داخل مركز شيلد بلس بعد تركيب فيلم حماية الطلاء"
              : "Black BMW X7 inside the ShieldPlusEGY studio after paint protection film fitting",
        },
      ],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  // One AutoBodyShop entry per branch — the correct shape for a multi-location
  // business. Deliberately omits openingHours, aggregateRating and priceRange:
  // none of those have been supplied.
  const jsonLd = BUSINESS.branches.map((branch) => ({
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": `${BUSINESS.siteUrl}/#${branch.id}`,
    name: `${BUSINESS.name} — ${branch.name[locale]}`,
    legalName: BUSINESS.legalName[locale],
    description: META[locale].description,
    url: `${BUSINESS.siteUrl}/${locale}`,
    image: `${BUSINESS.siteUrl}/media/work-bmw-x7.jpeg`,
    telephone: "+201150904009",
    hasMap: branch.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.street[locale],
      addressLocality: branch.district[locale],
      addressRegion: branch.city[locale],
      addressCountry: "EG",
    },
    sameAs: Object.values(BUSINESS.social),
    areaServed: { "@type": "City", name: branch.city[locale] },
  }));

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${oswald.variable} ${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header locale={locale} />

        {/* pt: fixed header. pb: mobile sticky CTA bar (hidden from sm up). */}
        <main className="flex-1 pt-[72px] pb-[76px] sm:pb-0">{children}</main>

        <Footer locale={locale} />
        <StickyCta locale={locale} />
      </body>
    </html>
  );
}
