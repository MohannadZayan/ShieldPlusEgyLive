import { BUSINESS, type Locale } from "@/lib/business";
import { getDict } from "@/lib/i18n";
import { waGeneral } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Persistent conversion surface.
 *  - Mobile: a bottom bar with Call + WhatsApp, sat above the home indicator.
 *  - Desktop: a single floating WhatsApp bubble.
 *
 * The bar's height is offset by padding on <main> so it never covers the
 * footer's last line.
 */
export function StickyCta({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const wa = waGeneral(locale);

  return (
    <>
      {/* Mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="flex gap-2.5 px-4 py-3">
          <a
            href={BUSINESS.phonePrimary.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border-hi py-3.5 font-display text-[13px] tracking-wider text-fg uppercase"
          >
            <PhoneIcon size={17} />
            {t.cta.call}
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 font-display text-[13px] tracking-wider text-white uppercase"
          >
            <WhatsAppIcon size={17} />
            {t.cta.whatsapp}
          </a>
        </div>
      </div>

      {/* Desktop bubble */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.cta.whatsapp}
        className="fixed bottom-7 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/25 transition-transform hover:scale-105 sm:flex end-7"
      >
        <span className="whatsapp-pulse absolute inset-0 -z-10 rounded-full" aria-hidden="true" />
        <WhatsAppIcon size={27} />
      </a>
    </>
  );
}
