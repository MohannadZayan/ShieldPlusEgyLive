import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ClosingCta } from "@/components/ClosingCta";
import { MediaTile } from "@/components/MediaTile";
import { Reveal } from "@/components/Reveal";
import {
  FeaturePill,
  GhostLink,
  Note,
  PageHeader,
  Section,
  SpecRow,
  WhatsAppButton,
} from "@/components/ui";
import { type Locale } from "@/lib/business";
import { formatWarranty, GRAPHENE } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waInterest } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Adams Graphene Advance — 9-Year Graphene Protection",
    description:
      "Adams Graphene Advance graphene protection, American, backed by a 9-year warranty. Applied at ShieldPlusEGY in Dokki, Giza. Price quoted per vehicle.",
  },
  ar: {
    title: "آدامز جرافين أدفانس — حماية جرافين بضمان ٩ سنوات",
    description:
      "حماية الجرافين آدامز جرافين أدفانس، أمريكي، بضمان ٩ سنوات. التطبيق في شيلد بلس بالدقي، الجيزة. السعر بيتحدد لكل عربية على حدة.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata(locale, "graphene", COPY);
}

export default async function GraphenePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDict(locale);

  // No `offers` block: the client supplied no price, and inventing one to
  // satisfy the schema would put a fabricated figure into search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: GRAPHENE.name.en,
    category: "Automotive graphene protection",
    description: COPY.en.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader eyebrow={t.graphene.eyebrow} title={t.graphene.title} body={t.graphene.body}>
        <WhatsAppButton href={waInterest(GRAPHENE.name[locale], locale, true)}>
          {t.cta.quote}
        </WhatsAppButton>
      </PageHeader>

      <Section>
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left column: the product, then the coating in the studio */}
          <div className="flex flex-col gap-5">
          <Reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            <h2 className="font-display text-[24px] font-semibold tracking-wide uppercase">
              {GRAPHENE.name[locale]}
            </h2>
            <p className="mt-1.5 text-[14px] text-muted">{GRAPHENE.origin[locale]}</p>

            {/* Quote-only: a label sits where the price would be, so the card
                reads as complete rather than as a missing value. */}
            <p className="mt-6 font-display text-[26px] leading-none font-semibold text-fg/70">
              {t.common.quoteOnly}
            </p>

            <dl className="mt-6">
              <SpecRow
                label={t.common.warranty}
                value={formatWarranty(GRAPHENE.warrantyYears, locale)}
                emphasis
              />
              <SpecRow label={t.common.origin} value={GRAPHENE.origin[locale]} />
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <FeaturePill>{GRAPHENE.origin[locale]}</FeaturePill>
              <FeaturePill>{formatWarranty(GRAPHENE.warrantyYears, locale)}</FeaturePill>
            </div>

            <WhatsAppButton
              href={waInterest(GRAPHENE.name[locale], locale, true)}
              className="mt-8 w-full"
            >
              {t.cta.quote}
            </WhatsAppButton>
          </Reveal>

          {/* The coating itself, in the studio. */}
          <MediaTile
            src="/media/graphene-bottle.mp4"
            locale={locale}
            delay={90}
            className="!aspect-[4/5]"
          />
          </div>

          <div className="flex flex-col gap-6">
            <Reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <h2 className="font-display text-[20px] font-semibold tracking-wide uppercase">
                {t.polishing.afterTitle}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {t.graphene.afterPolish}
              </p>
              <div className="mt-7">
                <GhostLink href={href(locale, "polishing")}>{t.nav.polishing}</GhostLink>
              </div>
            </Reveal>

            <Note>{t.thermal.specsNote}</Note>
          </div>
        </div>
      </Section>

      <Section id="request" tone="surface">
        <div className="mx-auto max-w-3xl">
          <AppointmentForm locale={locale} defaultService="graphene" />
        </div>
      </Section>

      <ClosingCta locale={locale} />
    </>
  );
}
