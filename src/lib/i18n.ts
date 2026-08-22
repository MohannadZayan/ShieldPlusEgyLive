/**
 * BILINGUAL COPY — SINGLE SOURCE OF TRUTH FOR ALL UI TEXT
 * -----------------------------------------------------------------------------
 * Locales: `en` (LTR) and `ar` (RTL, Egyptian Arabic).
 * Product names, prices and specifications live in `catalog.ts`, not here.
 *
 * Copy rules: no invented reviews, statistics, certifications, years of
 * experience, customer counts or technical claims.
 */

import type { Locale } from "./business";

export const LOCALES = ["en", "ar"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const DICT = {
  en: {
    localeName: "English",
    switchTo: "العربية",

    nav: {
      home: "Home",
      ppf: "Paint Protection",
      thermal: "Window Tint",
      graphene: "Graphene",
      polishing: "Polishing",
      washing: "Washing",
      contact: "Contact",
      menu: "Menu",
      close: "Close menu",
    },

    cta: {
      whatsapp: "WhatsApp Us",
      quote: "Request a Quote",
      appointment: "Request an Appointment",
      freeQuote: "Get a Free Quote on WhatsApp",
      seeServices: "See Our Services",
      call: "Call Now",
      viewDetails: "View details",
      compare: "Compare all films",
      askAbout: "Ask about this",
    },

    common: {
      from: "from",
      price: "Price",
      warranty: "Warranty",
      thickness: "Thickness",
      origin: "Origin",
      duration: "Duration",
      notSupplied: "—",
      yes: "Yes",
      no: "No",
      selfHealing: "Self-healing",
      nanoCeramic: "Nano-ceramic",
      antiYellowing: "Anti-yellowing",
      quoteOnly: "Price on request",
      years: "years",
    },

    hero: {
      eyebrow: "Paint Protection Film & Thermal Insulation",
      title1: "Protect the Paint.",
      title2: "Block the Heat.",
      body: "ShieldPlusEGY fits premium paint protection film, ceramic thermal insulation and graphene protection — keeping your car's finish flawless and its cabin cool, under Egypt's sun and on Egypt's roads.",
      badge1: "Paint Protection Film",
      badge2: "Thermal Insulation",
      badge3: "Fast WhatsApp Response",
    },

    services: {
      eyebrow: "What We Do",
      title: "Protection, applied properly.",
      body: "Six paint protection films, ceramic thermal insulation, graphene coating, surface polishing and full detailing — all fitted in our Dokki studio.",
      ppfDesc:
        "Six film options from value to original French, each self-healing, nano-ceramic and anti-yellowing.",
      thermalDesc:
        "Eagle CM8060+ Ceramic Plus thermal insulation film, American original, with a 5-year warranty.",
      grapheneDesc:
        "Adams Graphene Advance, American, backed by a 9-year warranty.",
      polishingDesc:
        "A surface treatment, not a shine that washes off. Restores the finish before you protect it.",
      washingDesc:
        "German Koch-Chemie nano shampoo outside, Nano Bright inside, with optional graphene wax.",
    },

    ppf: {
      eyebrow: "Paint Protection Film",
      title: "Six films. One honest comparison.",
      body: "Every film we fit is self-healing, nano-ceramic and anti-yellowing. What changes between them is thickness, warranty, origin and price. Compare them below and pick what fits your car and your budget.",
      compareTitle: "Compare all six films",
      compareBody:
        "Scroll the table sideways on mobile, or open a card to see the full specification.",
      tableCaption: "Paint protection film comparison — price, warranty, thickness and features",
      noteTitle: "A note on choosing",
      noteBody:
        "We don't rank these films for you. A thicker film and a longer warranty cost more; a shorter warranty costs less. Tell us your car and how you use it on WhatsApp and we'll walk you through the difference.",
    },

    thermal: {
      eyebrow: "Thermal Insulation",
      title: "Eagle CM8060+",
      body: "Thermal insulation film is not paint protection film. It goes on the glass, not the paint, and its job is to cut the heat coming into your cabin. We fit the American original Eagle CM8060+ in Ceramic Plus grade.",
      distinctionTitle: "Not the same as PPF",
      distinctionBody:
        "Paint protection film protects your bodywork from stones, scratches and sun. Thermal insulation film goes on your windows to reduce heat. Many customers take both.",
      specsNote:
        "We publish only the specifications supplied to us. Ask us on WhatsApp for the available shades and what suits your car.",
    },

    graphene: {
      eyebrow: "Graphene Protection",
      title: "Adams Graphene Advance",
      body: "An American graphene protection product, backed by a 9-year warranty. Pricing depends on your vehicle and its condition, so we quote each car individually.",
      afterPolish:
        "Graphene is what we recommend to hold a polished finish. Polish restores the surface — graphene or film is what keeps it that way.",
    },

    polishing: {
      eyebrow: "Polishing",
      title: "A treatment for the surface — not a shine that washes off.",
      body: "Our polishing is a surface treatment. The aim is to bring the car's appearance back toward a like-new condition, rather than to add a gloss that disappears after a few washes.",
      afterTitle: "What to do afterwards",
      afterBody:
        "Once the surface has been treated, protect it. Graphene or paint protection film is what maintains the result over time.",
      honestNote:
        "Results depend on the condition of the paint we start with. We'll tell you honestly what we can achieve on your car before we begin.",
    },

    washing: {
      eyebrow: "Washing & Detailing",
      title: "Washed with the right products.",
      body: "Exterior with German Koch-Chemie nano shampoo. Interior with Nano Bright, also German. Graphene wax optional.",
      exteriorTitle: "Exterior",
      interiorTitle: "Interior",
      waxTitle: "Graphene Wax",
      choose: "Choose your wash",
    },

    gallery: {
      eyebrow: "Our Work",
      title: "Cars we've protected.",
      body: "Photographed and filmed in our Dokki studio.",
      videoUnsupported: "Your browser does not support embedded video.",
    },

    whyUs: {
      eyebrow: "Why ShieldPlusEGY",
      title: "Straight answers, properly fitted.",
      p1Title: "Real prices, published",
      p1Body:
        "Our film prices are on this page. No 'call for pricing' games — you know the number before you come in.",
      p2Title: "Six films, no pressure",
      p2Body:
        "We stock value options and premium options. We'll tell you the difference and let you choose.",
      p3Title: "Warranty in writing",
      p3Body:
        "Every film we fit carries the warranty stated on its card, including against yellowing.",
      p4Title: "One place, every step",
      p4Body:
        "Protection, insulation, graphene, polishing and washing — all handled in the same studio.",
    },

    contact: {
      eyebrow: "Contact",
      title: "Talk to us on WhatsApp.",
      body: "The fastest way to reach us is WhatsApp. Send us your car and what you need, and we'll come back with a price and a time.",
      visitTitle: "Visit the studio",
      callTitle: "Call us",
      followTitle: "Follow our work",
      whatsappLine: "WhatsApp",
      phoneLine: "Phone",
      secondLine: "Second line",
      openMaps: "Open in Google Maps",
      hoursNote: "Opening hours have not been supplied yet — message us on WhatsApp to check.",
    },

    form: {
      title: "Request an appointment",
      body: "Fill this in and we'll open WhatsApp with your details ready to send. Nothing is booked until we reply and confirm.",
      name: "Your name",
      namePh: "e.g. Ahmed Hassan",
      phone: "Your phone number",
      phonePh: "e.g. 0100 000 0000",
      car: "Car make & model",
      carPh: "e.g. BMW X7 2024",
      service: "Service",
      product: "Film / product",
      productAny: "Not sure yet — advise me",
      date: "Preferred date",
      time: "Preferred time",
      message: "Anything else? (optional)",
      messagePh: "Tell us about the car's condition or anything specific you need.",
      submit: "Open WhatsApp with my request",
      required: "Required",
      errName: "Please enter your name.",
      errPhone: "Please enter a phone number we can reach you on.",
      errCar: "Please tell us the car's make and model.",
      disclaimer:
        "This form does not book anything. It opens WhatsApp with your request pre-filled — you send it, and we confirm your appointment by reply.",
      opened:
        "WhatsApp should have opened with your request. Press send there, and we'll come back to you to confirm the appointment.",
      openManually: "WhatsApp didn't open? Tap here.",
    },

    footer: {
      tagline: "Paint protection film, thermal insulation and detailing in Dokki, Giza.",
      services: "Services",
      contactUs: "Contact",
      rights: "All rights reserved.",
      disclaimer:
        "Prices and specifications shown are those supplied by ShieldPlusEGY and may change. Confirm on WhatsApp before booking.",
    },
  },

  ar: {
    localeName: "العربية",
    switchTo: "English",

    nav: {
      home: "الرئيسية",
      ppf: "حماية الطلاء",
      thermal: "العزل الحراري",
      graphene: "الجرافين",
      polishing: "التلميع",
      washing: "الغسيل",
      contact: "اتصل بنا",
      menu: "القائمة",
      close: "إغلاق القائمة",
    },

    cta: {
      whatsapp: "كلمنا واتساب",
      quote: "اطلب عرض سعر",
      appointment: "احجز موعد",
      freeQuote: "احصل على عرض سعر مجاني",
      seeServices: "شوف خدماتنا",
      call: "اتصل بنا",
      viewDetails: "التفاصيل",
      compare: "قارن كل الأفلام",
      askAbout: "اسأل عن ده",
    },

    common: {
      from: "من",
      price: "السعر",
      warranty: "الضمان",
      thickness: "السماكة",
      origin: "المنشأ",
      duration: "المدة",
      notSupplied: "—",
      yes: "نعم",
      no: "لا",
      selfHealing: "إصلاح ذاتي",
      nanoCeramic: "نانو سيراميك",
      antiYellowing: "مقاوم للاصفرار",
      quoteOnly: "السعر عند الطلب",
      years: "سنوات",
    },

    hero: {
      eyebrow: "أفلام حماية الطلاء والعزل الحراري",
      title1: "احمِ الطلاء.",
      title2: "اقطع الحرارة.",
      body: "شيلد بلس بتركّب أفلام حماية طلاء ممتازة، وعزل حراري سيراميك، وحماية جرافين — علشان تفضل عربيتك بلمعتها من بره وباردة من جوه، تحت شمس مصر وعلى طرق مصر.",
      badge1: "أفلام حماية الطلاء",
      badge2: "عزل حراري",
      badge3: "رد سريع على الواتساب",
    },

    services: {
      eyebrow: "بنعمل إيه",
      title: "حماية متركّبة صح.",
      body: "ستة أفلام لحماية الطلاء، وعزل حراري سيراميك، وطبقة جرافين، وتلميع للسطح، وغسيل وتنظيف كامل — كله بيتعمل في مركزنا بالدقي.",
      ppfDesc: "ستة اختيارات من الاقتصادي للفرنسي الأصلي، وكلها إصلاح ذاتي ونانو سيراميك ومقاومة للاصفرار.",
      thermalDesc: "فيلم عزل حراري إيجل CM8060+ سيراميك بلس، أمريكي أصلي، بضمان ٥ سنوات.",
      grapheneDesc: "آدامز جرافين أدفانس، أمريكي، بضمان ٩ سنوات.",
      polishingDesc: "علاج للسطح مش مجرد لمعة بتروح بعد كام غسلة. بيرجّع السطح قبل ما تحميه.",
      washingDesc: "شامبو نانو ألماني من كوخ-كيمي من بره، ونانو برايت من جوه، مع واكس جرافين اختياري.",
    },

    ppf: {
      eyebrow: "أفلام حماية الطلاء",
      title: "ستة أفلام. مقارنة واضحة.",
      body: "كل فيلم بنركّبه فيه إصلاح ذاتي ونانو سيراميك ومقاومة للاصفرار. اللي بيختلف بينهم هو السماكة والضمان والمنشأ والسعر. قارن تحت واختار اللي يناسب عربيتك وميزانيتك.",
      compareTitle: "قارن الستة أفلام",
      compareBody: "على الموبايل اسحب الجدول جنب، أو افتح الكارت علشان تشوف المواصفات كاملة.",
      tableCaption: "مقارنة أفلام حماية الطلاء — السعر والضمان والسماكة والمميزات",
      noteTitle: "ملاحظة عن الاختيار",
      noteBody:
        "إحنا مش بنرتّب الأفلام دي لك. الفيلم الأسمك والضمان الأطول بيكلّفوا أكتر، والضمان الأقصر بيكلّف أقل. قولنا على عربيتك وبتستخدمها إزاي على الواتساب وهنشرحلك الفرق.",
    },

    thermal: {
      eyebrow: "العزل الحراري",
      title: "إيجل CM8060+",
      body: "فيلم العزل الحراري مش فيلم حماية الطلاء. ده بيتركّب على الزجاج مش على الدهان، وشغلته إنه يقلّل الحرارة الداخلة للكابينة. إحنا بنركّب إيجل CM8060+ الأمريكي الأصلي بدرجة سيراميك بلس.",
      distinctionTitle: "مش نفس حماية الطلاء",
      distinctionBody:
        "فيلم حماية الطلاء بيحمي بودي العربية من الزلط والخدوش والشمس. فيلم العزل الحراري بيتركّب على الشبابيك علشان يقلّل الحرارة. كتير من عملائنا بياخدوا الاتنين.",
      specsNote: "إحنا بنعرض المواصفات اللي وصلتنا بس. اسألنا على الواتساب عن الدرجات المتاحة وإيه اللي يناسب عربيتك.",
    },

    graphene: {
      eyebrow: "حماية الجرافين",
      title: "آدامز جرافين أدفانس",
      body: "منتج حماية جرافين أمريكي، بضمان ٩ سنوات. السعر بيعتمد على عربيتك وحالتها، علشان كده بنحسب سعر كل عربية على حدة.",
      afterPolish: "الجرافين هو اللي بننصح بيه علشان يحافظ على نتيجة التلميع. التلميع بيرجّع السطح — والجرافين أو الفيلم هو اللي بيحافظ عليه.",
    },

    polishing: {
      eyebrow: "التلميع",
      title: "علاج للسطح — مش لمعة بتروح مع الغسيل.",
      body: "التلميع عندنا علاج للسطح. الهدف إننا نرجّع مظهر العربية لأقرب حاجة للحالة الجديدة، مش إننا نضيف لمعة بتختفي بعد كام غسلة.",
      afterTitle: "تعمل إيه بعد كده",
      afterBody: "بعد ما السطح يتعالج، احميه. الجرافين أو فيلم حماية الطلاء هو اللي بيحافظ على النتيجة مع الوقت.",
      honestNote: "النتيجة بتعتمد على حالة الدهان اللي بنبدأ بيها. هنقولك بصراحة إيه اللي نقدر نوصله في عربيتك قبل ما نبدأ.",
    },

    washing: {
      eyebrow: "الغسيل والتنظيف",
      title: "غسيل بمنتجات صح.",
      body: "من بره بشامبو نانو ألماني من كوخ-كيمي. ومن جوه بنانو برايت الألماني كمان. وواكس الجرافين اختياري.",
      exteriorTitle: "من الخارج",
      interiorTitle: "من الداخل",
      waxTitle: "واكس الجرافين",
      choose: "اختار نوع الغسيل",
    },

    gallery: {
      eyebrow: "شغلنا",
      title: "عربيات حميناها.",
      body: "تصوير من داخل مركزنا بالدقي.",
      videoUnsupported: "متصفحك لا يدعم تشغيل الفيديو.",
    },

    whyUs: {
      eyebrow: "ليه شيلد بلس",
      title: "إجابات واضحة، وتركيب مظبوط.",
      p1Title: "أسعار حقيقية ومعلنة",
      p1Body: "أسعار الأفلام عندنا مكتوبة في الصفحة دي. مفيش «كلّمنا علشان السعر» — تعرف الرقم قبل ما تيجي.",
      p2Title: "ستة أفلام من غير ضغط",
      p2Body: "عندنا اختيارات اقتصادية واختيارات ممتازة. هنقولك الفرق ونسيبك تختار.",
      p3Title: "ضمان مكتوب",
      p3Body: "كل فيلم بنركّبه ليه الضمان المكتوب في كارت المنتج، وده شامل الضمان ضد الاصفرار.",
      p4Title: "مكان واحد لكل الخطوات",
      p4Body: "الحماية والعزل والجرافين والتلميع والغسيل — كله بيتعمل في نفس المركز.",
    },

    contact: {
      eyebrow: "اتصل بنا",
      title: "كلمنا على الواتساب.",
      body: "أسرع طريقة توصلنا هي الواتساب. ابعتلنا عربيتك وأنت محتاج إيه، وهنرد عليك بالسعر والميعاد.",
      visitTitle: "زور المركز",
      callTitle: "اتصل بينا",
      followTitle: "تابع شغلنا",
      whatsappLine: "واتساب",
      phoneLine: "تليفون",
      secondLine: "خط تاني",
      openMaps: "افتح على خرائط جوجل",
      hoursNote: "مواعيد العمل لسه ما وصلتناش — كلمنا على الواتساب علشان تتأكد.",
    },

    form: {
      title: "احجز موعد",
      body: "املا البيانات دي وهنفتحلك الواتساب وبياناتك جاهزة تبعتها. مفيش حجز بيتأكد غير لما نرد عليك.",
      name: "اسمك",
      namePh: "مثال: أحمد حسن",
      phone: "رقم موبايلك",
      phonePh: "مثال: 0100 000 0000",
      car: "نوع وموديل العربية",
      carPh: "مثال: BMW X7 2024",
      service: "الخدمة",
      product: "الفيلم / المنتج",
      productAny: "لسه مش متأكد — انصحوني",
      date: "التاريخ المفضل",
      time: "الوقت المفضل",
      message: "أي حاجة تانية؟ (اختياري)",
      messagePh: "قولنا على حالة العربية أو أي حاجة معينة محتاجها.",
      submit: "افتح الواتساب بطلبي",
      required: "مطلوب",
      errName: "من فضلك اكتب اسمك.",
      errPhone: "من فضلك اكتب رقم نقدر نوصلك عليه.",
      errCar: "من فضلك قولنا نوع وموديل العربية.",
      disclaimer:
        "الفورم ده مش بيحجز أي حاجة. هو بيفتح الواتساب وطلبك مكتوب — إنت بتبعته، وإحنا بنأكدلك الموعد بالرد.",
      opened: "المفروض الواتساب اتفتح وطلبك جاهز. اضغط إرسال هناك، وإحنا هنرد عليك نأكد الموعد.",
      openManually: "الواتساب ما اتفتحش؟ اضغط هنا.",
    },

    footer: {
      tagline: "أفلام حماية الطلاء والعزل الحراري والتنظيف في الدقي، الجيزة.",
      services: "الخدمات",
      contactUs: "تواصل معنا",
      rights: "جميع الحقوق محفوظة.",
      disclaimer:
        "الأسعار والمواصفات المعروضة هي المقدمة من شيلد بلس وقابلة للتغيير. تأكد على الواتساب قبل الحجز.",
    },
  },
} as const;

export type Dict = (typeof DICT)["en"];

export function getDict(locale: Locale): Dict {
  return DICT[locale] as Dict;
}
