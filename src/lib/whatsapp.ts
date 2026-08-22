/**
 * WHATSAPP DEEP LINKS — THE ONLY LEAD CHANNEL
 * -----------------------------------------------------------------------------
 * This site has NO backend, NO API routes and NO database. Every appointment
 * request and quote request is a plain `wa.me` deep link carrying a pre-filled
 * message. The customer presses send in WhatsApp; the business owner reads it
 * and confirms manually.
 *
 * Nothing is stored by the website and nothing is auto-confirmed.
 */

import { BUSINESS, type Locale } from "./business";

/** Builds a wa.me link with a URL-encoded pre-filled message body. */
export function waLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** A generic "I'd like a quote" opener, used by header/hero/floating CTAs. */
export function waGeneral(locale: Locale): string {
  return waLink(
    locale === "ar"
      ? `السلام عليكم ${BUSINESS.name}، حابب أستفسر عن خدماتكم وأخد عرض سعر لعربيتي.`
      : `Hello ${BUSINESS.name}, I'd like to ask about your services and get a quote for my car.`,
  );
}

/**
 * Product/service-specific opener.
 * `subject` must already be in the customer's language.
 */
export function waInterest(subject: string, locale: Locale, isQuote = false): string {
  if (locale === "ar") {
    return waLink(
      isQuote
        ? `السلام عليكم ${BUSINESS.name}، حابب أخد عرض سعر لـ "${subject}".`
        : `السلام عليكم ${BUSINESS.name}، مهتم بـ "${subject}" وحابب أحجز موعد.`,
    );
  }
  return waLink(
    isQuote
      ? `Hello ${BUSINESS.name}, I'd like a quote for "${subject}".`
      : `Hello ${BUSINESS.name}, I'm interested in "${subject}" and I'd like to request an appointment.`,
  );
}

/* ---------------------------------------------------------------------------
 * Appointment request builder
 * ---------------------------------------------------------------------------
 * The request form does NOT submit anywhere. It composes these fields into a
 * readable WhatsApp message and opens the chat. The customer sends it himself.
 * ------------------------------------------------------------------------- */

export interface AppointmentDraft {
  name: string;
  phone: string;
  carMakeModel: string;
  service: string;
  /** Selected film / product, when the chosen service has options. */
  product?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

const LABELS: Record<Locale, Record<string, string>> = {
  en: {
    intro: "Hello ShieldPlusEGY, I'd like to request an appointment.",
    name: "Name",
    phone: "Phone",
    car: "Car",
    service: "Service",
    product: "Product",
    date: "Preferred date",
    time: "Preferred time",
    message: "Notes",
  },
  ar: {
    intro: "السلام عليكم شيلد بلس، حابب أطلب موعد.",
    name: "الاسم",
    phone: "رقم الموبايل",
    car: "العربية",
    service: "الخدمة",
    product: "المنتج",
    date: "التاريخ المفضل",
    time: "الوقت المفضل",
    message: "ملاحظات",
  },
};

/**
 * Composes an appointment request into a WhatsApp message.
 * Empty optional fields are omitted rather than sent as blanks.
 */
export function waAppointment(draft: AppointmentDraft, locale: Locale): string {
  const t = LABELS[locale];
  const lines: string[] = [t.intro, ""];

  const add = (label: string, value?: string) => {
    const v = value?.trim();
    if (v) lines.push(`${label}: ${v}`);
  };

  add(t.name, draft.name);
  add(t.phone, draft.phone);
  add(t.car, draft.carMakeModel);
  add(t.service, draft.service);
  add(t.product, draft.product);
  add(t.date, draft.preferredDate);
  add(t.time, draft.preferredTime);

  const note = draft.message?.trim();
  if (note) {
    lines.push("", `${t.message}: ${note}`);
  }

  return waLink(lines.join("\n"));
}
