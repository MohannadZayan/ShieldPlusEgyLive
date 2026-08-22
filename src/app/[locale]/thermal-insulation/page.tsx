import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ClosingCta } from "@/components/ClosingCta";
import { ShieldIcon, SunIcon } from "@/components/Icons";
import { MediaTile } from "@/components/MediaTile";
import { Reveal } from "@/components/Reveal";
import {
  FeaturePill,
  Note,
  PageHeader,
  Section,
  SpecRow,
  WhatsAppButton,
} from "@/components/ui";
import { BUSINESS, type Locale } from "@/lib/business";
import { formatPrice, formatWarranty, THERMAL } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waInterest } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Eagle CM8060+ Thermal Insulation Film — 8,000 EGP",
    description:
      "Eagle CM8060+ Ceramic Plus thermal insulation film, American original, with a 5-year warranty. Fitted at ShieldPlusEGY in Dokki, Giza for 8,000 EGP.",
  },
  ar: {
    title: "فيلم العزل الحراري إيجل CM8060+ — ٨٬٠٠٠ ج.م",
    description:
      "فيلم عزل حراري إيجل CM8060+ سيراميك بلس، أمريكي أصلي، بضمان ٥ سنوات. التركيب في شيلد بلس بالدقي، الجيزة بسعر ٨٬٠٠٠ ج.م.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata(locale, "thermal-insulation", COPY);
}

export default async function ThermalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDict(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: THERMAL.name.en,
    category: "Automotive window film",
    description: COPY.en.description,
    offers: {
      "@type": "Offer",
      price: THERMAL.priceEGP,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: BUSINESS.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader eyebrow={t.thermal.eyebrow} title={t.thermal.title} body={t.thermal.body}>
        <WhatsAppButton href={waInterest(THERMAL.name[locale], locale)}>
          {t.cta.appointment}
        </WhatsAppButton>
      </PageHeader>

      <Section>
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left column: the product, then the work itself */}
          <div className="flex flex-col gap-5">
          <Reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            <h2 className="font-display text-[24px] font-semibold tracking-wide uppercase">
              {THERMAL.name[locale]}
            </h2>
            <p className="mt-1.5 text-[14px] text-muted">{THERMAL.origin[locale]}</p>

            <p className="mt-6 force-ltr font-display text-[34px] leading-none font-semibold">
              {formatPrice(THERMAL.priceEGP, locale)}
            </p>

            <dl className="mt-6">
              <SpecRow
                label={t.common.warranty}
                value={formatWarranty(THERMAL.warrantyYears, locale)}
                emphasis
              />
              <SpecRow label="Type" value={THERMAL.type[locale]} />
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <FeaturePill>{THERMAL.grade[locale]}</FeaturePill>
              <FeaturePill>{THERMAL.origin[locale]}</FeaturePill>
            </div>

            <WhatsAppButton
              href={waInterest(THERMAL.name[locale], locale)}
              className="mt-8 w-full"
            >
              {t.cta.appointment}
            </WhatsAppButton>
          </Reveal>

          {/* Film going onto glass — the distinction this page is making.
              The alt text stops at what is visible: it does not claim this
              particular car was fitted with Eagle CM8060+. */}
          <MediaTile
            src="/media/tint-windscreen.jpeg"
            alt={
              locale === "ar"
                ? "فني بيركّب فيلم على الزجاج الأمامي لسيارة ويسحب المياه بالمعصفة داخل المركز"
                : "An installer squeegeeing wet-applied film across a car's windscreen in the studio"
            }
            locale={locale}
            delay={90}
            className="!aspect-[4/5]"
          />
          </div>

          {/* PPF vs tint explainer */}
          <div className="flex flex-col gap-6">
            <Reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <h2 className="font-display text-[20px] font-semibold tracking-wide uppercase">
                {t.thermal.distinctionTitle}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {t.thermal.distinctionBody}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card-hi p-5">
                  <ShieldIcon size={24} className="text-accent" />
                  <h3 className="mt-3.5 font-display text-[15px] font-semibold tracking-wide uppercase">
                    {t.nav.ppf}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                    {t.hero.badge1}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card-hi p-5">
                  <SunIcon size={24} className="text-sun" />
                  <h3 className="mt-3.5 font-display text-[15px] font-semibold tracking-wide uppercase">
                    {t.nav.thermal}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                    {t.hero.badge2}
                  </p>
                </div>
              </div>
            </Reveal>

            <Note>{t.thermal.specsNote}</Note>
          </div>
        </div>
      </Section>

      <Section id="request" tone="surface">
        <div className="mx-auto max-w-3xl">
          <AppointmentForm locale={locale} defaultService="thermal" />
        </div>
      </Section>

      <ClosingCta locale={locale} />
    </>
  );
}
