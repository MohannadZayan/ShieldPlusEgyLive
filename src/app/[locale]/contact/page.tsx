import { notFound } from "next/navigation";

import { AppointmentForm } from "@/components/AppointmentForm";
import {
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { Note, PageHeader, Section, WhatsAppButton } from "@/components/ui";
import { BUSINESS, type Locale } from "@/lib/business";
import { getDict, isLocale } from "@/lib/i18n";
import { localeParams, pageMetadata } from "@/lib/seo";
import { waGeneral } from "@/lib/whatsapp";

export const generateStaticParams = localeParams;

const COPY = {
  en: {
    title: "Contact ShieldPlusEGY — Dokki, Giza",
    description:
      "Reach ShieldPlusEGY on WhatsApp at +20 115 090 4009, or visit the studio at 16 Tehran St., off Mossadak St., Dokki, Giza.",
  },
  ar: {
    title: "تواصل مع شيلد بلس — الدقي، الجيزة",
    description:
      "كلم شيلد بلس على الواتساب ٠١١٥ ٠٩٠ ٤٠٠٩، أو زور المركز في ١٦ شارع طهران، متفرع من شارع مصدق، الدقي، الجيزة.",
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

          {/* Location */}
          <Reveal delay={80} className={cardClass}>
            <span className="text-accent">
              <PinIcon size={26} />
            </span>
            <h2 className="mt-5 font-display text-[18px] font-semibold tracking-wide uppercase">
              {t.contact.visitTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg/85">
              {BUSINESS.address.full[locale]}
            </p>
            <a
              href={BUSINESS.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-display text-[12.5px] tracking-wider text-accent uppercase hover:underline"
            >
              {t.contact.openMaps}
            </a>
          </Reveal>

          {/* Social */}
          <Reveal delay={160} className={cardClass}>
            <span className="text-accent">
              <InstagramIcon size={26} />
            </span>
            <h2 className="mt-5 font-display text-[18px] font-semibold tracking-wide uppercase">
              {t.contact.followTitle}
            </h2>

            <ul className="mt-4 space-y-3.5 text-[15px]">
              <li>
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-fg/85 transition-colors hover:text-accent"
                >
                  <InstagramIcon size={17} className="shrink-0" />
                  <span className="force-ltr">@shieldplusegy</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-fg/85 transition-colors hover:text-accent"
                >
                  <TikTokIcon size={17} className="shrink-0" />
                  <span className="force-ltr">@shieldplusegy</span>
                </a>
              </li>
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
