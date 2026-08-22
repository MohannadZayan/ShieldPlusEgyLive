import type { Locale } from "@/lib/business";
import { getDict } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { waGeneral } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";
import { Container, GhostLink, WhatsAppButton } from "./ui";

/** Bottom-of-page conversion band. Appears on every page. */
export function ClosingCta({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-[28px] leading-tight font-semibold text-balance-tight uppercase sm:text-[36px]">
              {t.contact.title}
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-muted">{t.contact.body}</p>
          </div>

          <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <WhatsAppButton href={waGeneral(locale)}>{t.cta.freeQuote}</WhatsAppButton>
            <GhostLink href={href(locale, "contact")}>{t.nav.contact}</GhostLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
