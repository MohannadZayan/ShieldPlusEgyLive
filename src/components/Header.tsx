"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BUSINESS, type Locale } from "@/lib/business";
import { getDict } from "@/lib/i18n";
import { navItems, href } from "@/lib/routes";
import { waGeneral } from "@/lib/whatsapp";
import {
  CloseIcon,
  GlobeIcon,
  LogoMark,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./Icons";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navItems(locale, t);

  // The drawer is closed on link click rather than in an effect keyed to
  // `pathname` — closing is a direct consequence of the tap, not something to
  // synchronise after the fact.
  const closeMenu = () => setOpen(false);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Same page, other language. Falls back to that locale's home page. */
  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const swappedPath = pathname.replace(/^\/(en|ar)/, `/${otherLocale}`) || `/${otherLocale}`;

  const isActive = (itemHref: string) =>
    itemHref === href(locale, "") ? pathname === itemHref : pathname.startsWith(itemHref);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href={href(locale, "")}
          className="flex min-h-11 shrink-0 items-center gap-2.5"
          aria-label={`${BUSINESS.name} — ${t.nav.home}`}
        >
          <LogoMark size={28} />
          <span className="font-display text-[19px] leading-none font-semibold tracking-wide">
            SHIELD<span className="text-accent">+</span>
            <span className="ms-0.5 align-top text-[13px] text-muted">EGY</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 font-display text-[13.5px] tracking-wider text-muted uppercase xl:flex"
          aria-label={t.nav.menu}
        >
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`transition-colors hover:text-fg ${
                isActive(item.href) ? "text-fg" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href={swappedPath}
            hrefLang={otherLocale}
            className="flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg"
          >
            <GlobeIcon size={16} />
            {t.switchTo}
          </Link>

          <a
            href={BUSINESS.phonePrimary.href}
            className="flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-fg"
          >
            <PhoneIcon size={16} />
            <span className="force-ltr">{BUSINESS.phonePrimary.display}</span>
          </a>

          <a
            href={waGeneral(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-display text-[12.5px] font-medium tracking-wide text-white uppercase transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon size={16} />
            {t.cta.whatsapp}
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.close : t.nav.menu}
          className="-me-2 cursor-pointer p-2 text-fg xl:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-border bg-bg xl:hidden"
      >
        <nav className="flex flex-col px-5 py-4" aria-label={t.nav.menu}>
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b border-border/70 py-3.5 font-display text-[15px] tracking-wide uppercase ${
                isActive(item.href) ? "text-accent" : "text-fg/90"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={swappedPath}
            hrefLang={otherLocale}
            onClick={closeMenu}
            className="flex items-center gap-2 border-b border-border/70 py-3.5 font-display text-[15px] tracking-wide text-fg/90 uppercase"
          >
            <GlobeIcon size={17} />
            {t.switchTo}
          </Link>

          <div className="mt-5 mb-2 flex gap-3">
            <a
              href={BUSINESS.phonePrimary.href}
              onClick={closeMenu}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3.5 text-[13px] tracking-wider"
            >
              <PhoneIcon size={16} />
              {t.cta.call}
            </a>
            <a
              href={waGeneral(locale)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 text-[13px] tracking-wider text-white"
            >
              <WhatsAppIcon size={16} />
              {t.cta.whatsapp}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
