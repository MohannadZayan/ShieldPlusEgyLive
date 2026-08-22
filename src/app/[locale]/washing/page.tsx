import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ClosingCta } from "@/components/ClosingCta";
import { DropletIcon, SparkleIcon, SunIcon } from "@/components/Icons";
import { MediaTile } from "@/components/MediaTile";
import { Reveal } from "@/components/Reveal";
import { PageHeader, Section, SectionHeading, WhatsAppButton } from "@/components/ui";
import { BUSINESS, type Locale } from "@/lib/business";
import { formatPrice, WASHING } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waInterest } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Car Washing & Detailing — from 200 EGP",
    description:
      "Exterior wash with German Koch-Chemie nano shampoo, interior with Nano Bright. Wash with graphene wax 300 EGP, without wax 200 EGP, at ShieldPlusEGY in Dokki, Giza.",
  },
  ar: {
    title: "غسيل وتنظيف السيارات — يبدأ من ٢٠٠ ج.م",
    description:
      "غسيل خارجي بشامبو نانو ألماني من كوخ-كيمي، وتنظيف داخلي بنانو برايت. غسيل مع واكس جرافين ٣٠٠ ج.م، وبدون واكس ٢٠٠ ج.م، في شيلد بلس بالدقي، الجيزة.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata(locale, "washing", COPY);
}

export default async function WashingPage({
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
    serviceType: "Car washing and detailing",
    provider: { "@type": "AutoBodyShop", name: BUSINESS.name },
    areaServed: { "@type": "City", name: BUSINESS.address.city.en },
    offers: [
      {
        "@type": "Offer",
        name: WASHING.withWax.name.en,
        price: WASHING.withWax.priceEGP,
        priceCurrency: "EGP",
      },
      {
        "@type": "Offer",
        name: WASHING.withoutWax.name.en,
        price: WASHING.withoutWax.priceEGP,
        priceCurrency: "EGP",
      },
    ],
  };

  const tiers = [
    { ...WASHING.withWax, featured: true },
    { ...WASHING.withoutWax, featured: false },
  ];

  const products = [
    {
      icon: <DropletIcon size={24} />,
      title: t.washing.exteriorTitle,
      name: WASHING.products.exterior.name[locale],
      origin: WASHING.products.exterior.origin[locale],
      note: null,
    },
    {
      icon: <SparkleIcon size={24} />,
      title: t.washing.interiorTitle,
      name: WASHING.products.interior.name[locale],
      origin: WASHING.products.interior.origin[locale],
      note: WASHING.products.interior.note[locale],
    },
    {
      icon: <SunIcon size={24} />,
      title: t.washing.waxTitle,
      name: WASHING.products.wax.name[locale],
      origin: WASHING.products.wax.origin[locale],
      note: WASHING.products.wax.note[locale],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader eyebrow={t.washing.eyebrow} title={t.washing.title} body={t.washing.body}>
        <WhatsAppButton href={waInterest(WASHING.withWax.name[locale], locale)}>
          {t.cta.appointment}
        </WhatsAppButton>
      </PageHeader>

      {/* Pricing tiers, with the wash itself shown alongside them */}
      <Section>
        <SectionHeading eyebrow={t.washing.eyebrow} title={t.washing.choose} />

        <div className="mt-11 grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-9">
          <div className="grid gap-5 sm:grid-cols-2">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.name.en}
              delay={i * 90}
              className={`flex flex-col rounded-2xl border p-7 sm:p-8 ${
                tier.featured ? "border-accent/50 bg-card-hi" : "border-border bg-card"
              }`}
            >
              <h3 className="font-display text-[19px] leading-tight font-semibold tracking-wide uppercase">
                {tier.name[locale]}
              </h3>

              <p className="mt-5 force-ltr font-display text-[34px] leading-none font-semibold">
                {formatPrice(tier.priceEGP, locale)}
              </p>

              <div className="mt-auto pt-8">
                <WhatsAppButton
                  href={waInterest(tier.name[locale], locale)}
                  className="w-full"
                >
                  {t.cta.appointment}
                </WhatsAppButton>
              </div>
            </Reveal>
          ))}
          </div>

          {/* The wash in progress — the client's own studio footage. */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
            <MediaTile src="/media/washing-rinse.mp4" locale={locale} delay={100} />
            <MediaTile
              src="/media/washing-microfibre.jpeg"
              alt={
                locale === "ar"
                  ? "تجفيف زجاج جانبي مبلل بفوطة ميكروفايبر صفراء أثناء الغسيل"
                  : "Drying a wet side window with a yellow microfibre cloth during the wash"
              }
              locale={locale}
              delay={170}
            />
          </div>
        </div>
      </Section>

      {/* Products used */}
      <Section tone="surface">
        <SectionHeading eyebrow={t.washing.eyebrow} title={t.washing.title} />

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <span className="text-accent">{p.icon}</span>

              <h3 className="mt-5 font-display text-[13px] tracking-[0.14em] text-muted uppercase">
                {p.title}
              </h3>
              <p className="mt-2 font-display text-[19px] font-semibold tracking-wide uppercase">
                {p.name}
              </p>
              <p className="mt-1 text-[13.5px] text-muted">{p.origin}</p>

              {p.note && (
                <p className="mt-4 border-t border-border pt-4 text-[13.5px] leading-relaxed text-muted">
                  {p.note}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="request">
        <div className="mx-auto max-w-3xl">
          <AppointmentForm locale={locale} defaultService="washing" />
        </div>
      </Section>

      <ClosingCta locale={locale} />
    </>
  );
}
