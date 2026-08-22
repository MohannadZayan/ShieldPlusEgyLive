"use client";

import { useMemo, useState } from "react";

import type { Locale } from "@/lib/business";
import {
  FILMS,
  formatPrice,
  formatThickness,
  formatWarranty,
  type Film,
} from "@/lib/catalog";
import { getDict } from "@/lib/i18n";
import { waInterest } from "@/lib/whatsapp";
import { CheckIcon } from "./Icons";

type SortKey = "priceEGP" | "warrantyYears" | "thickness";
type SortDir = "asc" | "desc";

const TH = "px-4 py-3.5 text-start font-display text-[12px] uppercase tracking-[0.1em]";
const TD = "px-4 py-4 text-[14px] align-middle whitespace-nowrap";

/** Declared at module scope so it isn't recreated (and remounted) each render. */
function SortButton({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      // -my-2 keeps the padded hit area from growing the header row.
      className="-my-2 inline-flex min-h-11 cursor-pointer items-center gap-1.5 py-2 transition-colors hover:text-fg"
    >
      {label}
      <span aria-hidden="true" className={active ? "text-accent" : "text-muted/40"}>
        {active && dir === "desc" ? "▼" : "▲"}
      </span>
    </button>
  );
}

/**
 * Film comparison table.
 *
 * Mobile: the table scrolls horizontally inside its own container, with the
 * film-name column pinned so you never lose track of which row you're reading.
 * The page body itself never scrolls sideways.
 *
 * Sorting is on the three numeric specs that actually differ between films.
 * Nulls (a spec the client never supplied) always sort last, in both
 * directions — a missing value is not "cheapest" or "shortest".
 */
export function FilmComparison({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [sortKey, setSortKey] = useState<SortKey>("priceEGP");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const rows = useMemo(() => {
    return [...FILMS].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const ariaSort = (key: SortKey): "ascending" | "descending" | "none" => {
    if (sortKey !== key) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  };

  const yes = (
    <>
      <CheckIcon size={17} className="text-accent" />
      <span className="sr-only">{t.common.yes}</span>
    </>
  );

  return (
    <div>
      {/* overflow-x-auto keeps the sideways scroll inside this box only. */}
      <div
        className="-mx-5 overflow-x-auto overscroll-x-contain px-5 sm:mx-0 sm:rounded-xl sm:border sm:border-border sm:px-0"
        tabIndex={0}
        role="region"
        aria-label={t.ppf.tableCaption}
      >
        <table className="w-full min-w-[820px] border-collapse text-fg">
          <caption className="sr-only">{t.ppf.tableCaption}</caption>

          <thead className="bg-surface text-muted">
            <tr className="border-b border-border">
              {/* Sticky name column — bg must be opaque so rows scroll under it. */}
              <th
                scope="col"
                className={`${TH} sticky start-0 z-10 bg-surface min-w-[190px]`}
              >
                {t.nav.ppf}
              </th>
              <th scope="col" className={TH}>
                {t.common.origin}
              </th>
              <th scope="col" className={TH} aria-sort={ariaSort("priceEGP")}>
                <SortButton
                  label={t.common.price}
                  active={sortKey === "priceEGP"}
                  dir={sortDir}
                  onClick={() => toggleSort("priceEGP")}
                />
              </th>
              <th scope="col" className={TH} aria-sort={ariaSort("warrantyYears")}>
                <SortButton
                  label={t.common.warranty}
                  active={sortKey === "warrantyYears"}
                  dir={sortDir}
                  onClick={() => toggleSort("warrantyYears")}
                />
              </th>
              <th scope="col" className={TH} aria-sort={ariaSort("thickness")}>
                <SortButton
                  label={t.common.thickness}
                  active={sortKey === "thickness"}
                  dir={sortDir}
                  onClick={() => toggleSort("thickness")}
                />
              </th>
              <th scope="col" className={TH}>
                {t.common.selfHealing}
              </th>
              <th scope="col" className={TH}>
                {t.common.nanoCeramic}
              </th>
              <th scope="col" className={TH}>
                {t.common.antiYellowing}
              </th>
              <th scope="col" className={`${TH} sr-only`}>
                {t.cta.askAbout}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((film: Film) => (
              <tr
                key={film.slug}
                className="border-b border-border last:border-b-0 hover:bg-card/60"
              >
                <th
                  scope="row"
                  className={`${TD} sticky start-0 z-10 bg-bg text-start font-display text-[15px] font-semibold tracking-wide uppercase`}
                >
                  {film.name[locale]}
                </th>
                <td className={`${TD} text-muted whitespace-normal min-w-[150px]`}>
                  {film.origin ? film.origin[locale] : t.common.notSupplied}
                </td>
                <td className={`${TD} force-ltr font-display text-[15px] font-semibold`}>
                  {formatPrice(film.priceEGP, locale)}
                </td>
                <td className={`${TD} force-ltr`}>
                  {formatWarranty(film.warrantyYears, locale)}
                </td>
                <td className={`${TD} force-ltr`}>
                  {formatThickness(film.thickness, locale)}
                </td>
                <td className={TD}>{film.selfHealing ? yes : t.common.notSupplied}</td>
                <td className={TD}>{film.nanoCeramic ? yes : t.common.notSupplied}</td>
                <td className={TD}>{film.antiYellowing ? yes : t.common.notSupplied}</td>
                <td className={TD}>
                  <a
                    href={waInterest(film.name[locale], locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-2 inline-flex min-h-11 items-center py-2 font-display text-[12px] tracking-wider text-accent uppercase hover:underline"
                  >
                    {t.cta.askAbout}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3.5 text-[13px] text-muted sm:hidden">{t.ppf.compareBody}</p>
    </div>
  );
}
