import Image from "next/image";

import type { Locale } from "@/lib/business";
import { asset } from "@/lib/asset";
import { getDict } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { waGeneral } from "@/lib/whatsapp";
import { ShieldIcon, SunIcon, WhatsAppIcon } from "./Icons";
import { Container, GhostLink, WhatsAppButton } from "./ui";

/**
 * Home hero.
 *
 * The background is the client's own studio footage. It is decorative, so it
 * carries no accessible name — the headline is what conveys the message.
 * A still frame stands in as the poster and as the reduced-data fallback.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Background layer — a sheet of protection film going onto a car, which
          is what the headline is actually about. The poster is a still lifted
          from this same clip, so there's no visual jump when it starts. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={asset("/media/hero-poster.jpeg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <video
          src={asset("/media/ppf-application.mp4")}
          poster={asset("/media/hero-poster.jpeg")}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />

        {/* Two-axis scrim: vertical for text legibility over the fold,
            horizontal so the copy side stays dark regardless of the frame. */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/25" />
        <div className="hero-scrim-x absolute inset-0" />
      </div>

      <Container className="relative w-full pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-display text-[11.5px] tracking-[0.14em] text-accent uppercase">
            {t.hero.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[40px] leading-[1.03] font-semibold text-balance-tight uppercase sm:text-[58px] lg:text-[68px]">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-fg/80 sm:text-[18px]">
            {t.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <WhatsAppButton href={waGeneral(locale)}>{t.cta.freeQuote}</WhatsAppButton>
            <GhostLink href={href(locale, "ppf")}>{t.cta.seeServices}</GhostLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-display text-[12.5px] tracking-wide text-fg/70 uppercase">
            <li className="flex items-center gap-2">
              <ShieldIcon size={16} className="text-accent" />
              {t.hero.badge1}
            </li>
            <li className="flex items-center gap-2">
              <SunIcon size={16} className="text-sun" />
              {t.hero.badge2}
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon size={16} className="text-whatsapp" />
              {t.hero.badge3}
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
