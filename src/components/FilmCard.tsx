import type { Locale } from "@/lib/business";
import {
  formatPrice,
  formatThickness,
  formatWarranty,
  type Film,
} from "@/lib/catalog";
import { getDict } from "@/lib/i18n";
import { waInterest } from "@/lib/whatsapp";
import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { FeaturePill, SpecRow, WhatsAppButton } from "./ui";

/** Thickness range across the catalogue, used to scale the gauge below. */
const MIN_THICKNESS = 160;
const MAX_THICKNESS = 200;

/**
 * Product card for a paint protection film.
 *
 * NOTE ON IMAGERY: no verified manufacturer product photography was supplied
 * for any of the eight films. Rather than pass a generic automotive photo off
 * as a named product's shot, these cards are typographic and spec-led. Drop a
 * real product image in when the client supplies one.
 */
export function FilmCard({
  film,
  locale,
  delay = 0,
}: {
  film: Film;
  locale: Locale;
  delay?: number;
}) {
  const t = getDict(locale);

  // Position of this film's thickness within the catalogue range.
  // Null thickness means the client never supplied one — show no gauge rather
  // than a bar at an invented position.
  const gauge =
    film.thickness === null
      ? null
      : ((film.thickness - MIN_THICKNESS) / (MAX_THICKNESS - MIN_THICKNESS)) * 100;

  return (
    <Reveal
      as="article"
      delay={delay}
      className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-hi sm:p-7"
    >
      <header>
        <h3 className="font-display text-[21px] leading-tight font-semibold tracking-wide uppercase">
          {film.name[locale]}
        </h3>
        <p className="mt-1.5 min-h-[20px] text-[13.5px] text-muted">
          {film.origin ? film.origin[locale] : t.common.notSupplied}
        </p>
      </header>

      {/* Price — the number customers scan for first. */}
      <p className="mt-5 font-display text-[30px] leading-none font-semibold text-fg force-ltr">
        {formatPrice(film.priceEGP, locale)}
      </p>

      {/* Thickness gauge: a visual read on how this film sits in the range. */}
      <div className="mt-5" aria-hidden="true">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-hi">
          {gauge !== null && (
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.max(8, Math.min(100, gauge))}%` }}
            />
          )}
        </div>
      </div>

      <dl className="mt-4">
        <SpecRow
          label={t.common.warranty}
          value={formatWarranty(film.warrantyYears, locale)}
          emphasis
        />
        <SpecRow
          label={t.common.thickness}
          value={formatThickness(film.thickness, locale)}
        />
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {film.selfHealing && <FeaturePill>{t.common.selfHealing}</FeaturePill>}
        {film.nanoCeramic && <FeaturePill>{t.common.nanoCeramic}</FeaturePill>}
        {film.antiYellowing && <FeaturePill>{t.common.antiYellowing}</FeaturePill>}
      </div>

      {film.notes.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {film.notes.map((note) => (
            <li key={note.en} className="flex items-start gap-2.5 text-[13.5px] text-muted">
              <CheckIcon size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>{note[locale]}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Push the CTA to the bottom so cards in a row align. */}
      <div className="mt-auto pt-7">
        <WhatsAppButton
          href={waInterest(film.name[locale], locale)}
          className="w-full"
        >
          {t.cta.appointment}
        </WhatsAppButton>
      </div>
    </Reveal>
  );
}
