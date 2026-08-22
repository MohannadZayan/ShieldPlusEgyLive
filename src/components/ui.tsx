import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "./Reveal";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

/* -----------------------------------------------------------------------------
 * Layout
 * -------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  id,
  tone = "bg",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  /** `surface` is the alternating band used to separate adjacent sections. */
  tone?: "bg" | "surface";
  className?: string;
}) {
  const toneClass =
    tone === "surface" ? "bg-surface border-y border-border" : "bg-bg";
  return (
    <section id={id} className={`py-20 sm:py-28 ${toneClass} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Typography
 * -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "start" | "center";
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment}`}>
      <span className="font-display text-[12px] tracking-[0.18em] text-accent uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-3.5 font-display text-[30px] leading-[1.1] font-semibold text-balance-tight uppercase sm:text-[40px]">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-[15.5px] leading-relaxed text-muted sm:text-[16.5px]">{body}</p>
      )}
    </Reveal>
  );
}

/**
 * Top-of-page header for the service pages. `h1` — one per page.
 * The diagonal lower edge is the film-application motif carried from the demo.
 */
export function PageHeader({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  /** CTAs rendered beneath the intro copy. */
  children?: ReactNode;
}) {
  return (
    <header className="clip-diagonal border-b border-border bg-surface pt-16 pb-24 sm:pt-20 sm:pb-28">
      <Container>
        <Reveal className="max-w-3xl">
          <span className="font-display text-[12px] tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-3.5 font-display text-[34px] leading-[1.06] font-semibold text-balance-tight uppercase sm:text-[48px]">
            {title}
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted sm:text-[17.5px]">{body}</p>
          {children && <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">{children}</div>}
        </Reveal>
      </Container>
    </header>
  );
}

/* -----------------------------------------------------------------------------
 * Actions
 * -------------------------------------------------------------------------- */

const BTN_BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-display font-medium uppercase tracking-wide transition-colors cursor-pointer";

const BTN_SIZE = "px-6 py-3.5 text-[14px]";

/** Green WhatsApp action — always an external link, always new tab. */
export function WhatsAppButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BTN_BASE} ${BTN_SIZE} bg-whatsapp text-white shadow-lg shadow-whatsapp/20 hover:bg-whatsapp-dark ${className}`}
    >
      <WhatsAppIcon size={18} />
      {children}
    </a>
  );
}

/** Outlined secondary action for internal navigation. */
export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${BTN_BASE} ${BTN_SIZE} border border-fg/25 text-fg hover:border-fg/50 ${className}`}
    >
      {children}
      <ArrowIcon size={17} className="rtl:rotate-180" />
    </Link>
  );
}

/* -----------------------------------------------------------------------------
 * Data display
 * -------------------------------------------------------------------------- */

/** A single label/value line inside a product card. */
export function SpecRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 last:border-b-0">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd
        className={`force-ltr text-end ${
          emphasis ? "font-display text-[17px] font-semibold text-fg" : "text-[14px] text-fg/90"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

/** Small capability pill, e.g. "Self-healing". */
export function FeaturePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card-hi px-2.5 py-1 text-[11.5px] tracking-wide text-fg/75">
      {children}
    </span>
  );
}

/**
 * Callout used for honest caveats — "we don't rank these films for you",
 * "results depend on the paint we start with", missing-spec notes.
 */
export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Reveal className="rounded-xl border border-border bg-card p-6 sm:p-7">
      {title && (
        <h3 className="font-display text-[16px] font-semibold tracking-wide uppercase">{title}</h3>
      )}
      <p className={`text-[14.5px] leading-relaxed text-muted ${title ? "mt-2.5" : ""}`}>
        {children}
      </p>
    </Reveal>
  );
}
