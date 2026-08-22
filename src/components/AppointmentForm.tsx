"use client";

import { useState, type MouseEvent } from "react";

import type { Locale } from "@/lib/business";
import { FILMS, GRAPHENE, POLISHING, THERMAL, WASHING } from "@/lib/catalog";
import { getDict } from "@/lib/i18n";
import { waAppointment, type AppointmentDraft } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/**
 * APPOINTMENT REQUEST — MESSAGE BUILDER, NOT A SUBMISSION
 * ---------------------------------------------------------------------------
 * This form posts nowhere. There is no endpoint, no database and no record.
 * It composes the customer's answers into a WhatsApp message and opens the
 * chat; the customer presses send, and the business confirms by replying.
 *
 * The submit control is a real <a href="wa.me/...">, kept in sync with form
 * state, so a valid click is an ordinary link navigation that popup blockers
 * leave alone. Validation runs on click and cancels navigation when it fails.
 */

type ServiceKey = "ppf" | "thermal" | "graphene" | "polishing" | "washing";
type Errors = Partial<Record<"name" | "phone" | "car", string>>;

export function AppointmentForm({
  locale,
  /** Preselects the service when the form is embedded on a service page. */
  defaultService = "ppf",
  /** Preselects a specific film, e.g. when linked from a film card. */
  defaultProduct,
}: {
  locale: Locale;
  defaultService?: ServiceKey;
  defaultProduct?: string;
}) {
  const t = getDict(locale);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [service, setService] = useState<ServiceKey>(defaultService);
  const [product, setProduct] = useState(defaultProduct ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  /** Service labels come from the catalogue so they never drift from the pages. */
  const serviceOptions: { key: ServiceKey; label: string }[] = [
    { key: "ppf", label: t.nav.ppf },
    { key: "thermal", label: `${t.nav.thermal} — ${THERMAL.name[locale]}` },
    { key: "graphene", label: `${t.nav.graphene} — ${GRAPHENE.name[locale]}` },
    { key: "polishing", label: POLISHING.name[locale] },
    { key: "washing", label: WASHING.withWax.name[locale] },
  ];

  /** Only PPF has a product list worth choosing from. */
  const productOptions = service === "ppf" ? FILMS.map((f) => f.name[locale]) : [];

  const serviceLabel =
    serviceOptions.find((s) => s.key === service)?.label ?? serviceOptions[0].label;

  const draft: AppointmentDraft = {
    name,
    phone,
    carMakeModel: car,
    service: serviceLabel,
    product: product || undefined,
    preferredDate: date,
    preferredTime: time,
    message,
  };

  // Cheap string building — recomputing on every keystroke is fine, and it
  // keeps the link in sync with the fields without a dependency list to drift.
  const waHref = waAppointment(draft, locale);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = t.form.errName;
    // Deliberately loose: Egyptian numbers get written many ways, and a
    // rejected-but-valid number costs a lead.
    if (phone.replace(/\D/g, "").length < 8) e.phone = t.form.errPhone;
    if (!car.trim()) e.car = t.form.errCar;
    return e;
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      // Move focus to the first field with a problem.
      const first = Object.keys(found)[0];
      document.getElementById(`appt-${first}`)?.focus();
      return;
    }
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-[15px] text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";
  const label = "block font-display text-[12.5px] uppercase tracking-[0.1em] text-muted";

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-9">
      <h2 className="font-display text-[24px] font-semibold tracking-wide uppercase sm:text-[28px]">
        {t.form.title}
      </h2>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{t.form.body}</p>

      {/* Not a <form>: there is no submission target and nothing to POST. */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="appt-name">
            {t.form.name} <span className="text-accent">*</span>
          </label>
          <input
            id="appt-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePh}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "appt-name-err" : undefined}
            className={`mt-2 ${field} ${errors.name ? "border-red-500/70" : ""}`}
          />
          {errors.name && (
            <p id="appt-name-err" role="alert" className="mt-1.5 text-[13px] text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={label} htmlFor="appt-phone">
            {t.form.phone} <span className="text-accent">*</span>
          </label>
          <input
            id="appt-phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.form.phonePh}
            autoComplete="tel"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "appt-phone-err" : undefined}
            className={`mt-2 ${field} ${errors.phone ? "border-red-500/70" : ""}`}
          />
          {errors.phone && (
            <p id="appt-phone-err" role="alert" className="mt-1.5 text-[13px] text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="appt-car">
            {t.form.car} <span className="text-accent">*</span>
          </label>
          <input
            id="appt-car"
            type="text"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            placeholder={t.form.carPh}
            aria-required="true"
            aria-invalid={!!errors.car}
            aria-describedby={errors.car ? "appt-car-err" : undefined}
            className={`mt-2 ${field} ${errors.car ? "border-red-500/70" : ""}`}
          />
          {errors.car && (
            <p id="appt-car-err" role="alert" className="mt-1.5 text-[13px] text-red-400">
              {errors.car}
            </p>
          )}
        </div>

        <div>
          <label className={label} htmlFor="appt-service">
            {t.form.service}
          </label>
          <select
            id="appt-service"
            value={service}
            onChange={(e) => {
              setService(e.target.value as ServiceKey);
              setProduct(""); // the old film selection no longer applies
            }}
            className={`mt-2 ${field} cursor-pointer`}
          >
            {serviceOptions.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {productOptions.length > 0 && (
          <div>
            <label className={label} htmlFor="appt-product">
              {t.form.product}
            </label>
            <select
              id="appt-product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={`mt-2 ${field} cursor-pointer`}
            >
              <option value="">{t.form.productAny}</option>
              {productOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className={label} htmlFor="appt-date">
            {t.form.date}
          </label>
          <input
            id="appt-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`mt-2 ${field} cursor-pointer`}
          />
        </div>

        <div>
          <label className={label} htmlFor="appt-time">
            {t.form.time}
          </label>
          <input
            id="appt-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`mt-2 ${field} cursor-pointer`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="appt-message">
            {t.form.message}
          </label>
          <textarea
            id="appt-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.form.messagePh}
            className={`mt-2 ${field} resize-y`}
          />
        </div>
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 py-4 font-display text-[14.5px] font-medium tracking-wide text-white uppercase shadow-lg shadow-whatsapp/20 transition-colors hover:bg-whatsapp-dark"
      >
        <WhatsAppIcon size={19} />
        {t.form.submit}
      </a>

      {sent && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-whatsapp/30 bg-whatsapp/10 px-4 py-3.5 text-[14px] text-fg/90"
        >
          {t.form.opened}{" "}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-whatsapp underline underline-offset-2"
          >
            {t.form.openManually}
          </a>
        </p>
      )}

      <p className="mt-4 text-[12.5px] leading-relaxed text-muted">{t.form.disclaimer}</p>
    </div>
  );
}
