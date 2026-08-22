import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ClosingCta } from "@/components/ClosingCta";
import { FilmCard } from "@/components/FilmCard";
import { FilmComparison } from "@/components/FilmComparison";
import { MediaTile } from "@/components/MediaTile";
import { Reveal } from "@/components/Reveal";
import {
  Note,
  PageHeader,
  Section,
  SectionHeading,
  WhatsAppButton,
} from "@/components/ui";
import { BUSINESS, type Locale } from "@/lib/business";
import { FILMS } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waGeneral } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Paint Protection Film — Six Options, Prices Published",
    description:
      "IKON, Pro Tech 7 & 10 Year, Royal, Dino Stek and Hexis paint protection film fitted in Dokki, Giza. All self-healing, nano-ceramic and anti-yellowing. Prices from 30,000 EGP.",
  },
  ar: {
    title: "أفلام حماية الطلاء — ستة اختيارات بأسعار معلنة",
    description:
      "أفلام حماية الطلاء IKON وبرو تك ٧ و١٠ سنوات ورويال ودينو ستيك وهيكسيس، تركيب في الدقي بالجيزة. كلها إصلاح ذاتي ونانو سيراميك ومقاومة للاصفرار. الأسعار تبدأ من ٣٠٬٠٠٠ ج.م.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata(locale, "ppf", COPY);
}

export default async function PpfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDict(locale);

  // Product-level structured data. Only films with a supplied price get an
  // `offers` block — a price is not invented to satisfy the schema.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: COPY[locale].title,
    itemListElement: FILMS.map((film, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: film.name.en,
        category: "Paint Protection Film",
        brand: { "@type": "Brand", name: film.name.en.split(" — ")[0] },
        ...(film.priceEGP !== null && {
          offers: {
            "@type": "Offer",
            price: film.priceEGP,
            priceCurrency: "EGP",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: BUSINESS.name },
          },
        }),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader eyebrow={t.ppf.eyebrow} title={t.ppf.title} body={t.ppf.body}>
        <WhatsAppButton href={waGeneral(locale)}>{t.cta.quote}</WhatsAppButton>
      </PageHeader>

      {/* Product cards */}
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film, i) => (
            <FilmCard key={film.slug} film={film} locale={locale} delay={i * 70} />
          ))}
        </div>

        {/* The fitting itself, next to the caveat about choosing a film. */}
        <div className="mt-9 grid gap-5 lg:grid-cols-[1fr_1.3fr] lg:gap-9">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
            <MediaTile src="/media/ppf-application.mp4" locale={locale} />
            <MediaTile src="/media/ppf-squeegee.mp4" locale={locale} delay={90} />
          </div>
          <Note title={t.ppf.noteTitle}>{t.ppf.noteBody}</Note>
        </div>
      </Section>

      {/* Comparison */}
      <Section id="compare" tone="surface">
        <SectionHeading
          eyebrow={t.ppf.eyebrow}
          title={t.ppf.compareTitle}
          body={t.ppf.compareBody}
        />
        <Reveal className="mt-11">
          <FilmComparison locale={locale} />
        </Reveal>
      </Section>

      {/* Appointment request */}
      <Section id="request">
        <div className="mx-auto max-w-3xl">
          <AppointmentForm locale={locale} defaultService="ppf" />
        </div>
      </Section>

      <ClosingCta locale={locale} />
    </>
  );
}
