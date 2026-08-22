import Link from "next/link";
import { notFound } from "next/navigation";

import { FilmComparison } from "@/components/FilmComparison";
import { ClosingCta } from "@/components/ClosingCta";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import {
  ArrowIcon,
  DropletIcon,
  LayersIcon,
  ShieldIcon,
  SparkleIcon,
  SunIcon,
} from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import {
  GhostLink,
  Section,
  SectionHeading,
  WhatsAppButton,
} from "@/components/ui";
import { type Locale } from "@/lib/business";
import { formatPrice, POLISHING, THERMAL, WASHING } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { waGeneral } from "@/lib/whatsapp";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDict(locale);

  const services = [
    {
      key: "ppf",
      icon: <ShieldIcon size={26} />,
      title: t.nav.ppf,
      desc: t.services.ppfDesc,
      meta: `${t.common.from} ${formatPrice(30000, locale)}`,
      segment: "ppf",
    },
    {
      key: "thermal",
      icon: <SunIcon size={26} />,
      title: t.nav.thermal,
      desc: t.services.thermalDesc,
      meta: formatPrice(THERMAL.priceEGP, locale),
      segment: "thermal-insulation",
    },
    {
      key: "graphene",
      icon: <LayersIcon size={26} />,
      title: t.nav.graphene,
      desc: t.services.grapheneDesc,
      meta: t.common.quoteOnly,
      segment: "graphene",
    },
    {
      key: "polishing",
      icon: <SparkleIcon size={26} />,
      title: t.nav.polishing,
      desc: t.services.polishingDesc,
      meta: formatPrice(POLISHING.priceEGP, locale),
      segment: "polishing",
    },
    {
      key: "washing",
      icon: <DropletIcon size={26} />,
      title: t.nav.washing,
      desc: t.services.washingDesc,
      meta: `${t.common.from} ${formatPrice(WASHING.withoutWax.priceEGP, locale)}`,
      segment: "washing",
    },
  ];

  const reasons = [
    { title: t.whyUs.p1Title, body: t.whyUs.p1Body },
    { title: t.whyUs.p2Title, body: t.whyUs.p2Body },
    { title: t.whyUs.p3Title, body: t.whyUs.p3Body },
    { title: t.whyUs.p4Title, body: t.whyUs.p4Body },
  ];

  return (
    <>
      <Hero locale={locale} />

      {/* ---------------------------------------------------------------- */}
      {/* SERVICES                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section id="services" tone="surface">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          body={t.services.body}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={i * 80}>
              <Link
                href={href(locale, s.segment)}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-accent/50"
              >
                <span className="text-accent">{s.icon}</span>

                <h3 className="mt-5 font-display text-[20px] font-semibold tracking-wide uppercase">
                  {s.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-muted">{s.desc}</p>

                <span className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="force-ltr font-display text-[15px] font-semibold text-fg">
                    {s.meta}
                  </span>
                  <ArrowIcon
                    size={18}
                    className="text-muted transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FILM COMPARISON — the centrepiece of the site                     */}
      {/* ---------------------------------------------------------------- */}
      <Section id="compare">
        <SectionHeading
          eyebrow={t.ppf.eyebrow}
          title={t.ppf.compareTitle}
          body={t.ppf.body}
        />

        <Reveal className="mt-11">
          <FilmComparison locale={locale} />
        </Reveal>

        <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
          <GhostLink href={href(locale, "ppf")}>{t.cta.viewDetails}</GhostLink>
          <WhatsAppButton href={waGeneral(locale)}>{t.cta.quote}</WhatsAppButton>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* GALLERY                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section id="gallery" tone="surface">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          body={t.gallery.body}
        />
        <Gallery locale={locale} />
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* WHY US                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section id="why-us">
        <SectionHeading eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} />

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 80} className="border-t border-border pt-6">
              <h3 className="font-display text-[18px] font-semibold tracking-wide uppercase">
                {r.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* CLOSING CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <ClosingCta locale={locale} />
    </>
  );
}
