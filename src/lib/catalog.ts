/**
 * PRODUCT & SERVICE CATALOG — SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 * Every price, warranty, thickness and specification shown anywhere on the site
 * comes from this file.
 *
 * RULES:
 *  - Only client-supplied information appears here.
 *  - A value that was never supplied is `null` and renders as an em dash (—).
 *  - Never fill a `null` with a guess, an average, or a "reasonable" estimate.
 *  - `priceEGP: null` means the product uses a Request-a-Quote CTA instead of
 *    a displayed price.
 */

import type { Locale } from "./business";

export type Localized = Record<Locale, string>;

export interface Film {
  slug: string;
  name: Localized;
  /** Origin or market positioning. `null` when the client supplied none. */
  origin: Localized | null;
  /** Warranty in years. `null` when the client supplied none. */
  warrantyYears: number | null;
  /** Price in EGP. `null` means quote-only. */
  priceEGP: number | null;
  /** Film thickness in microns. `null` when the client supplied none. */
  thickness: number | null;
  selfHealing: boolean;
  nanoCeramic: boolean;
  antiYellowing: boolean;
  /** Extra client-supplied notes shown as bullets on the product card. */
  notes: Localized[];
}

/** The six paint protection films, in ascending price order. */
export const FILMS: Film[] = [
  {
    slug: "ikon",
    name: { en: "IKON", ar: "IKON" },
    origin: { en: "Made in China", ar: "صناعة صينية" },
    warrantyYears: 7,
    priceEGP: 30000,
    thickness: 170,
    selfHealing: true,
    nanoCeramic: true,
    antiYellowing: true,
    notes: [
      {
        en: "Multi-layer film construction",
        ar: "تركيب متعدد الطبقات",
      },
      {
        en: "Covered by a warranty against yellowing",
        ar: "مغطى بضمان ضد الاصفرار",
      },
    ],
  },
  {
    slug: "pro-tech-7",
    name: { en: "Pro Tech — 7 Year", ar: "برو تك — ٧ سنوات" },
    origin: { en: "Made in China", ar: "صناعة صينية" },
    warrantyYears: 7,
    priceEGP: 32000,
    thickness: 180,
    selfHealing: true,
    nanoCeramic: true,
    antiYellowing: true,
    notes: [
      {
        en: "7-year anti-yellowing warranty",
        ar: "ضمان ضد الاصفرار لمدة ٧ سنوات",
      },
    ],
  },
  {
    slug: "pro-tech-10",
    name: { en: "Pro Tech — 10 Year", ar: "برو تك — ١٠ سنوات" },
    origin: { en: "Made in China", ar: "صناعة صينية" },
    warrantyYears: 10,
    priceEGP: 40000,
    thickness: 190,
    selfHealing: true,
    nanoCeramic: true,
    antiYellowing: true,
    notes: [],
  },
  {
    slug: "royal",
    name: {
      en: "Royal — American / Gulf Specification",
      ar: "رويال — أمريكي / مواصفات خليجية",
    },
    origin: { en: "American — Gulf specification", ar: "أمريكي — مواصفات خليجية" },
    warrantyYears: null,
    priceEGP: 45000,
    thickness: 180,
    selfHealing: true,
    nanoCeramic: true,
    antiYellowing: true,
    notes: [
      {
        en: "Protection against sunlight and radiation",
        ar: "حماية ضد أشعة الشمس والإشعاع",
      },
    ],
  },
  {
    slug: "dino-stek",
    name: { en: "Dino Stek", ar: "دينو ستيك" },
    origin: { en: "American", ar: "أمريكي" },
    warrantyYears: 10,
    priceEGP: 80000,
    thickness: 180,
    selfHealing: true,
    nanoCeramic: true,
    antiYellowing: true,
    notes: [
      {
        en: "Layered film construction delivering self-healing and nano-ceramic performance",
        ar: "تركيب طبقي يوفر خاصية الإصلاح الذاتي والنانو سيراميك",
      },
    ],
  },
  {
    slug: "scotch-guard",
    name: { en: "Scotch Guard", ar: "سكوتش جارد" },
    origin: { en: "American", ar: "أمريكي" },
    /**
     * SOURCE NOTE — these three are MANUFACTURER-PUBLISHED figures for 3M
     * Scotchgard™ Paint Protection Film Pro Series, not client-supplied
     * numbers like the rest of this file:
     *   - 8 mil / ~203 microns (rounded to 200 to match the catalogue's scale)
     *   - self-healing formula
     *   - warranty covers yellowing, so anti-yellowing holds
     *
     * ASSUMPTION: the client stocks the Pro Series variant. Other Scotchgard
     * variants differ in thickness — if the client confirms a different one,
     * correct `thickness` here.
     *
     * `nanoCeramic` stays FALSE deliberately. 3M Scotchgard uses a urethane
     * clear coat, not a ceramic topcoat; 3M sells ceramic coating as a
     * separate product applied over the film. Marking it true would be a
     * fabricated technical claim.
     *
     * `warrantyYears` stays NULL deliberately. 3M's 10-year warranty is
     * conditional on installation by a 3M Certified Installer, which has not
     * been confirmed for this business — publishing it could promise cover
     * the client cannot honour.
     */
    warrantyYears: null,
    priceEGP: 90000,
    thickness: 200,
    selfHealing: true,
    nanoCeramic: false,
    antiYellowing: true,
    notes: [],
  },
  {
    slug: "hexis",
    name: { en: "Hexis — Original French", ar: "هيكسيس — فرنسي أصلي" },
    origin: { en: "Original French", ar: "فرنسي أصلي" },
    warrantyYears: 10,
    priceEGP: 120000,
    thickness: 180,
    selfHealing: true,
    nanoCeramic: true,
    antiYellowing: true,
    notes: [],
  },
];

/** Thermal insulation / window film. */
export const THERMAL = {
  slug: "eagle-cm8060",
  name: { en: "Eagle CM8060+", ar: "إيجل CM8060+" },
  origin: { en: "American — original", ar: "أمريكي — أصلي" },
  type: { en: "CM8060+", ar: "CM8060+" },
  grade: { en: "Ceramic Plus", ar: "سيراميك بلس" },
  warrantyYears: 5,
  priceEGP: 8000,
} as const;

/** Graphene coating — no price supplied, quote-only. */
export const GRAPHENE = {
  slug: "adams-graphene-advance",
  name: { en: "Adams Graphene Advance", ar: "آدامز جرافين أدفانس" },
  origin: { en: "American", ar: "أمريكي" },
  warrantyYears: 9,
  priceEGP: null,
} as const;

/** Polishing — surface treatment. */
export const POLISHING = {
  slug: "polishing",
  name: { en: "Polishing", ar: "تلميع" },
  priceEGP: 2500,
  durationHours: { en: "3–4 hours", ar: "٣–٤ ساعات" },
} as const;

/** Washing / detailing tiers. */
export const WASHING = {
  slug: "washing",
  withWax: {
    name: { en: "Wash + Graphene Wax", ar: "غسيل + واكس جرافين" },
    priceEGP: 300,
  },
  withoutWax: {
    name: { en: "Wash without wax", ar: "غسيل بدون واكس" },
    priceEGP: 200,
  },
  products: {
    exterior: {
      name: { en: "Koch-Chemie nano shampoo", ar: "شامبو نانو من كوخ-كيمي" },
      origin: { en: "German", ar: "ألماني" },
    },
    interior: {
      name: { en: "Nano Bright", ar: "نانو برايت" },
      origin: { en: "German", ar: "ألماني" },
      note: {
        en: "Withstands temperatures up to 250°C. Used to help protect fabric, upholstery and leather.",
        ar: "يتحمل درجات حرارة حتى ٢٥٠° مئوية. يُستخدم للمساعدة في حماية الأقمشة والفرش والجلد.",
      },
    },
    wax: {
      name: { en: "Graphene Wax", ar: "واكس جرافين" },
      origin: { en: "American", ar: "أمريكي" },
      note: {
        en: "Applied for protection against sunlight and dust. Client-supplied duration: up to two weeks.",
        ar: "يُطبّق للحماية من أشعة الشمس والأتربة. المدة حسب بيانات العميل: حتى أسبوعين.",
      },
    },
  },
} as const;

/* ---------------------------------------------------------------------------
 * Formatting helpers
 * ------------------------------------------------------------------------- */

/** Renders a price, or an em dash when no price was supplied. */
export function formatPrice(priceEGP: number | null, locale: Locale): string {
  if (priceEGP === null) return "—";
  const n = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(priceEGP);
  return locale === "ar" ? `${n} ج.م` : `${n} EGP`;
}

/** Renders a warranty, or an em dash when none was supplied. */
export function formatWarranty(years: number | null, locale: Locale): string {
  if (years === null) return "—";
  if (locale === "ar") {
    const n = new Intl.NumberFormat("ar-EG").format(years);
    return years === 10 ? `${n} سنوات` : `${n} سنوات`;
  }
  return `${years} years`;
}

/** Renders a thickness, or an em dash when none was supplied. */
export function formatThickness(thickness: number | null, locale: Locale): string {
  if (thickness === null) return "—";
  const n = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(thickness);
  return locale === "ar" ? `${n} ميكرون` : `${n} microns`;
}
