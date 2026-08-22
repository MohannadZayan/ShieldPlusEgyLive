import Link from "next/link";

import { Container } from "@/components/ui";

/**
 * Locale-agnostic 404. `notFound()` can fire before a locale is validated, so
 * this page shows both languages rather than guessing which one applies.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-[13px] tracking-[0.2em] text-accent uppercase">404</p>

      <h1 className="mt-4 font-display text-[32px] leading-tight font-semibold uppercase sm:text-[44px]">
        Page not found
      </h1>
      <p className="mt-3 font-display text-[22px] text-muted sm:text-[28px]">
        الصفحة غير موجودة
      </p>

      <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
        <Link
          href="/en"
          className="inline-flex items-center justify-center rounded-full border border-fg/25 px-6 py-3.5 font-display text-[14px] tracking-wide uppercase transition-colors hover:border-fg/50"
        >
          English
        </Link>
        <Link
          href="/ar"
          className="inline-flex items-center justify-center rounded-full border border-fg/25 px-6 py-3.5 font-display text-[14px] tracking-wide uppercase transition-colors hover:border-fg/50"
        >
          العربية
        </Link>
      </div>
    </Container>
  );
}
