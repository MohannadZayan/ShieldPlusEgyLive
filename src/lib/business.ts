/**
 * BUSINESS INFORMATION — SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 * Every phone number, address, social link and site URL used anywhere on the
 * site comes from this file. To update the business details, edit here only.
 *
 * Do NOT add invented information (hours, reviews, certifications, awards).
 */

export const BUSINESS = {
  name: "ShieldPlusEGY",
  legalName: {
    en: "ShieldPlusEGY Car Protection",
    ar: "شيلد بلس إيجيبت لحماية السيارات",
  },

  /** Primary line — this is also the WhatsApp number. */
  phonePrimary: {
    display: "+20 115 090 4009",
    displayLocal: "0115 090 4009",
    href: "tel:+201150904009",
  },
  /** Secondary line — voice calls only, NOT confirmed as a WhatsApp number. */
  phoneSecondary: {
    display: "+20 128 122 0433",
    displayLocal: "0128 122 0433",
    href: "tel:+201281220433",
  },

  /** Country code + number, digits only. Used to build every wa.me link. */
  whatsappNumber: "201150904009",

  address: {
    street: { en: "16 Tehran St., off Mossadak St.", ar: "١٦ شارع طهران، متفرع من شارع مصدق" },
    district: { en: "Dokki", ar: "الدقي" },
    city: { en: "Giza", ar: "الجيزة" },
    country: { en: "Egypt", ar: "مصر" },
    full: {
      en: "16 Tehran St., off Mossadak St., Dokki, Giza, Egypt",
      ar: "١٦ شارع طهران، متفرع من شارع مصدق، الدقي، الجيزة، مصر",
    },
    /** Search-based map link — safe without a verified place ID. */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=16+Tehran+Street+Mossadak+Dokki+Giza+Egypt",
  },

  social: {
    tiktok: "https://www.tiktok.com/@shieldplusegy",
    instagram: "https://www.instagram.com/shieldplusegy",
  },

  /**
   * Drives canonical URLs, Open Graph and the sitemap.
   *
   * The deploy workflow sets NEXT_PUBLIC_SITE_URL to wherever the site is
   * actually being published, so canonicals always match the live address.
   *
   * PRE-LAUNCH: once the client's real domain is connected, replace the
   * fallback below with it.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://shieldplusegy.com",
} as const;

export type Locale = "en" | "ar";
