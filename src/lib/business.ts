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

  /**
   * Branches, in the order they should be listed. The first is treated as the
   * primary location for structured data and metadata.
   *
   * Opening hours have not been supplied for either branch — do not invent any.
   */
  branches: [
    {
      id: "dokki",
      name: { en: "Dokki", ar: "الدقي" },
      street: {
        en: "16 Tehran St., off Mossadak St.",
        ar: "١٦ شارع طهران، متفرع من شارع مصدق",
      },
      district: { en: "Dokki", ar: "الدقي" },
      city: { en: "Giza", ar: "الجيزة" },
      country: { en: "Egypt", ar: "مصر" },
      full: {
        en: "16 Tehran St., off Mossadak St., Dokki, Giza",
        ar: "١٦ شارع طهران، متفرع من شارع مصدق، الدقي، الجيزة",
      },
      /** Search-based link — safe without a verified place ID. */
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=16+Tehran+Street+Mossadak+Dokki+Giza+Egypt",
    },
    {
      id: "nasr-city",
      name: { en: "Nasr City", ar: "مدينة نصر" },
      street: {
        en: "Shinzo Abe Axis, opposite the Jetour dealership",
        ar: "محور شينزو آبي، أمام توكيل جيتور",
      },
      district: { en: "Nasr City", ar: "مدينة نصر" },
      city: { en: "Cairo", ar: "القاهرة" },
      country: { en: "Egypt", ar: "مصر" },
      full: {
        en: "Shinzo Abe Axis, opposite the Jetour dealership, Nasr City, Cairo",
        ar: "محور شينزو آبي، أمام توكيل جيتور، مدينة نصر، القاهرة",
      },
      /** Client-supplied Google Maps pin. */
      mapsUrl: "https://maps.app.goo.gl/WokKd5RPhpjfd5XX6",
    },
  ],

  social: {
    facebook: "https://www.facebook.com/shieldplusegy/",
    instagram: "https://www.instagram.com/shieldplusegy",
    tiktok: "https://www.tiktok.com/@shieldplusegy",
    youtube: "https://youtube.com/@shieldplusegy",
    x: "https://x.com/shieldplusuegy",
  },

  /**
   * Drives canonical URLs, Open Graph and the sitemap.
   *
   * LIVE: the site is served at the root of shieldplusegy.com. The deploy
   * workflow sets NEXT_PUBLIC_SITE_URL to the same value; this fallback keeps
   * a local `npm run build` producing identical URLs.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://shieldplusegy.com",
} as const;

export type Locale = "en" | "ar";

/** The location used for metadata and primary structured data. */
export const PRIMARY_BRANCH = BUSINESS.branches[0];
