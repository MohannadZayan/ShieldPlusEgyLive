import Link from "next/link";

import { BUSINESS, type Locale } from "@/lib/business";
import { getDict } from "@/lib/i18n";
import { href, serviceItems } from "@/lib/routes";
import { LogoMark, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { SocialRow } from "./SocialLinks";
import { waGeneral } from "@/lib/whatsapp";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const services = serviceItems(locale, t);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href={href(locale, "")} className="flex items-center gap-2.5">
              <LogoMark size={28} />
              <span className="font-display text-[19px] leading-none font-semibold tracking-wide">
                SHIELD<span className="text-sun">+</span>
                <span className="ms-0.5 align-top text-[13px] text-muted">EGY</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-muted">
              {t.footer.tagline}
            </p>

            <SocialRow className="mt-5" />
          </div>

          {/* Services */}
          <nav aria-label={t.footer.services}>
            <h2 className="font-display text-[13px] tracking-[0.14em] text-muted uppercase">
              {t.footer.services}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="text-[14.5px] text-fg/80 transition-colors hover:text-accent"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-[13px] tracking-[0.14em] text-muted uppercase">
              {t.footer.contactUs}
            </h2>
            <ul className="mt-4 space-y-3.5 text-[14.5px]">
              <li>
                <a
                  href={waGeneral(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-fg/80 transition-colors hover:text-whatsapp"
                >
                  <WhatsAppIcon size={17} className="mt-0.5 shrink-0" />
                  <span className="force-ltr">{BUSINESS.phonePrimary.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.phoneSecondary.href}
                  className="flex items-start gap-2.5 text-fg/80 transition-colors hover:text-accent"
                >
                  <PhoneIcon size={17} className="mt-0.5 shrink-0" />
                  <span className="force-ltr">{BUSINESS.phoneSecondary.display}</span>
                </a>
              </li>
              {/* One entry per branch, labelled so it's clear which is which. */}
              {BUSINESS.branches.map((branch) => (
                <li key={branch.id}>
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-fg/80 transition-colors hover:text-accent"
                  >
                    <PinIcon size={17} className="mt-0.5 shrink-0" />
                    <span>
                      <span className="block font-display text-[12px] tracking-wide text-muted uppercase">
                        {branch.name[locale]}
                      </span>
                      {branch.full[locale]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-7">
          <p className="text-[12.5px] leading-relaxed text-muted">{t.footer.disclaimer}</p>
          <p className="mt-3 text-[12.5px] text-muted">
            © {new Date().getFullYear()} {BUSINESS.legalName[locale]}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
