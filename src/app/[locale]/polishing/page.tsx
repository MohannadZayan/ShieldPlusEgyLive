import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ClosingCta } from "@/components/ClosingCta";
import { LayersIcon, ShieldIcon, SparkleIcon } from "@/components/Icons";
import { MediaTile } from "@/components/MediaTile";
import { Reveal } from "@/components/Reveal";
import {
  GhostLink,
  Note,
  PageHeader,
  Section,
  SpecRow,
  WhatsAppButton,
} from "@/components/ui";
import { BUSINESS, type Locale } from "@/lib/business";
import { formatPrice, POLISHING } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waInterest } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Car Polishing — Surface Treatment, 2,500 EGP",
    description:
      "Polishing at ShieldPlusEGY is a surface treatment, not a temporary shine. 2,500 EGP, 3–4 hours, in Dokki, Giza. Maintain the result with graphene or paint protection film.",
  },
  ar: {
    title: "تلميع السيارات — علاج للسطح بسعر ٢٬٥٠٠ ج.م",
    description:
      "التلميع في شيلد بلس علاج للسطح مش مجرد لمعة مؤقتة. ٢٬٥٠٠ ج.م، ٣–٤ ساعات، في الدقي بالجيزة. حافظ على النتيجة بالجرافين أو فيلم حماية الطلاء.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata(locale, "polishing", COPY);
}

export default async function PolishingPage({
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
    "@type": "Service",
    serviceType: "Car polishing and surface treatment",
    provider: { "@type": "AutoBodyShop", name: BUSINESS.name },
    areaServed: BUSINESS.branches.map((b) => ({ "@type": "City", name: b.city.en })),
    offers: {
      "@type": "Offer",
      price: POLISHING.priceEGP,
      priceCurrency: "EGP",
    },
  };

  /** What to do after polishing — the client's own positioning. */
  const aftercare = [
    { icon: <LayersIcon size={24} />, label: t.nav.graphene, segment: "graphene" },
    { icon: <ShieldIcon size={24} />, label: t.nav.ppf, segment: "ppf" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={t.polishing.eyebrow}
        title={t.polishing.title}
        body={t.polishing.body}
      >
        <WhatsAppButton href={waInterest(POLISHING.name[locale], locale)}>
          {t.cta.appointment}
        </WhatsAppButton>
      </PageHeader>

      <Section>
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            <SparkleIcon size={28} className="text-accent" />

            <h2 className="mt-5 font-display text-[24px] font-semibold tracking-wide uppercase">
              {POLISHING.name[locale]}
            </h2>

            <p className="mt-6 force-ltr font-display text-[34px] leading-none font-semibold">
              {formatPrice(POLISHING.priceEGP, locale)}
            </p>

            <dl className="mt-6">
              <SpecRow
                label={t.common.duration}
                value={POLISHING.durationHours[locale]}
                emphasis
              />
            </dl>

            <WhatsAppButton
              href={waInterest(POLISHING.name[locale], locale)}
              className="mt-8 w-full"
            >
              {t.cta.appointment}
            </WhatsAppButton>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <h2 className="font-display text-[20px] font-semibold tracking-wide uppercase">
                {t.polishing.afterTitle}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {t.polishing.afterBody}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {aftercare.map((a) => (
                  <div
                    key={a.segment}
                    className="flex flex-col rounded-xl border border-border bg-card-hi p-5"
                  >
                    <span className="text-accent">{a.icon}</span>
                    <h3 className="mt-3.5 font-display text-[15px] font-semibold tracking-wide uppercase">
                      {a.label}
                    </h3>
                    <div className="mt-4">
                      <GhostLink href={href(locale, a.segment)} className="!px-4 !py-2 !text-[12px]">
                        {t.cta.viewDetails}
                      </GhostLink>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Manages expectations before the customer books. */}
            <Note>{t.polishing.honestNote}</Note>
          </div>
        </div>

        {/* The machine at work, and the finish it leaves. */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 lg:max-w-2xl">
          <MediaTile
            src="/media/polishing-machine.jpeg"
            alt={
              locale === "ar"
                ? "استخدام مكينة تلميع بفوطة صوف على كابوت سيارة داخل المركز"
                : "A rotary polisher with a wool pad being worked across a car's bonnet in the studio"
            }
            locale={locale}
          />
          <MediaTile src="/media/finish-walkaround.mp4" locale={locale} delay={90} />
        </div>
      </Section>

      <Section id="request" tone="surface">
        <div className="mx-auto max-w-3xl">
          <AppointmentForm locale={locale} defaultService="polishing" />
        </div>
      </Section>

      <ClosingCta locale={locale} />
    </>
  );
}
