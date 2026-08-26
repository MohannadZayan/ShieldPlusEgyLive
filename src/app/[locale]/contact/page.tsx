import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import { InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { SOCIALS } from "@/components/SocialLinks";
import { Reveal } from "@/components/Reveal";
import { Note, PageHeader, Section, WhatsAppButton } from "@/components/ui";
import { BUSINESS, type Locale } from "@/lib/business";
import { getDict, isLocale } from "@/lib/i18n";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waGeneral } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Contact ShieldPlusEGY — Dokki & Nasr City",
    description:
      "Reach ShieldPlusEGY on WhatsApp at +20 115 090 4009, or visit us at 16 Tehran St., off Mossadak St., Dokki, Giza, or on the Shinzo Abe Axis in Nasr City, Cairo.",
  },
  ar: {
    title: "تواصل مع شيلد بلس — الدقي ومدينة نصر",
    description:
      "كلم شيلد بلس على الواتساب ٠١١٥ ٠٩٠ ٤٠٠٩، أو زورنا في ١٦ شارع طهران، متفرع من شارع مصدق، الدقي، الجيزة، أو في محور شينزو آبي بمدينة نصر، القاهرة.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata(locale, "contact", COPY);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDict(locale);

  const cardClass =
    "flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-hi";

  return (
    <>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body}>
        <WhatsAppButton href={waGeneral(locale)}>{t.cta.whatsapp}</WhatsAppButton>
      </PageHeader>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          {/* WhatsApp / phone */}
          <Reveal className={cardClass}>
            <span className="text-whatsapp">
              <WhatsAppIcon size={26} />
            </span>
            <h2 className="mt-5 font-display text-[18px] font-semibold tracking-wide uppercase">
              {t.contact.callTitle}
            </h2>

            <ul className="mt-4 space-y-3.5 text-[15px]">
              <li>
                <a
                  href={waGeneral(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-fg/85 transition-colors hover:text-whatsapp"
                >
                  <WhatsAppIcon size={17} className="shrink-0" />
                  <span>
                    <span className="block text-[12px] tracking-wide text-muted uppercase">
                      {t.contact.whatsappLine}
                    </span>
                    <span className="force-ltr">{BUSINESS.phonePrimary.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.phoneSecondary.href}
                  className="flex items-center gap-2.5 text-fg/85 transition-colors hover:text-accent"
                >
                  <PhoneIcon size={17} className="shrink-0" />
                  <span>
                    <span className="block text-[12px] tracking-wide text-muted uppercase">
                      {t.contact.secondLine}
                    </span>
                    <span className="force-ltr">{BUSINESS.phoneSecondary.display}</span>
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          {/* Locations — one block per branch */}
          <Reveal delay={80} className={cardClass}>
            <span className="text-accent">
              <PinIcon size={26} />
            </span>
            <h2 className="mt-5 font-display text-[18px] font-semibold tracking-wide uppercase">
              {t.contact.visitTitle}
            </h2>

            <ul className="mt-4 space-y-5">
              {BUSINESS.branches.map((branch) => (
                <li key={branch.id}>
                  <h3 className="font-display text-[12.5px] tracking-[0.14em] text-sun uppercase">
                    {branch.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg/85">
                    {branch.full[locale]}
                  </p>
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-display text-[12.5px] tracking-wider text-accent uppercase hover:underline"
                  >
                    {t.contact.openMaps}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Social */}
          <Reveal delay={160} className={cardClass}>
            <span className="text-accent">
              <InstagramIcon size={26} />
            </span>
            <h2 className="mt-5 font-display text-[18px] font-semibold tracking-wide uppercase">
              {t.contact.followTitle}
            </h2>

            <ul className="mt-4 space-y-3 text-[15px]">
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 text-fg/85 transition-colors hover:text-accent"
                  >
                    <span className="shrink-0">{s.icon}</span>
                    <span className="force-ltr">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Opening hours were never supplied — say so rather than guess. */}
        <div className="mt-9">
          <Note>{t.contact.hoursNote}</Note>
        </div>
      </Section>

      <Section id="request" tone="surface">
        <div className="mx-auto max-w-3xl">
          <AppointmentForm locale={locale} />
        </div>
      </Section>
    </>
  );
}
