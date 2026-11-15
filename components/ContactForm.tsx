"use client";
import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sent" | "invalid";
type ServiceKey = "consulting" | "digital" | "marketing" | "unsure";
const SERVICE_KEYS: ServiceKey[] = ["consulting", "digital", "marketing", "unsure"];

// Requests go to this inbox. The service type is put at the start of the
// subject line so each request can be routed to the right department.
const INBOX = "dr.hosamhosny2014@gmail.com";

export default function ContactForm() {
  const con = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "consulting" as ServiceKey, message: "" });
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  function set(field: keyof typeof form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setStatus("invalid");
      return;
    }
    const serviceLabel = con(`serviceOptions.${form.service}`);
    const subject = encodeURIComponent(`[${serviceLabel}] ${form.name}`);
    const emailLine = form.email ? `\nEmail: ${form.email}` : "";
    const body = encodeURIComponent(
      `Service: ${serviceLabel}\nName: ${form.name}\nPhone: ${form.phone}${emailLine}\n\n${form.message}`,
    );
    window.location.href = `mailto:${INBOX}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div ref={successRef} role="status" aria-live="polite" tabIndex={-1} className="py-10 focus:outline-none">
        <p className="text-2xl font-bold text-navy mb-3">{con("successTitle")}</p>
        <p className="text-gray-text text-base leading-[1.85]">{con("successBody")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full min-h-[50px] border border-[#C5CDD8] rounded-xl px-4 text-navy text-base bg-white transition-colors " +
    "placeholder:text-gray-text/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25";
  const labelClass = "block text-navy text-[15px] font-semibold mb-2";

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass}>{con("name")}</label>
        <input id="contact-name" type="text" required autoComplete="name" value={form.name} onChange={set("name")} placeholder={con("namePlaceholder")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-phone" className={labelClass}>{con("phone")}</label>
        <input id="contact-phone" type="tel" required autoComplete="tel" dir="ltr" value={form.phone} onChange={set("phone")} placeholder={con("phonePlaceholder")} className={`${inputClass} rtl:text-right`} />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>{con("email")}</label>
        <input id="contact-email" type="email" autoComplete="email" dir="ltr" value={form.email} onChange={set("email")} placeholder={con("emailPlaceholder")} className={`${inputClass} rtl:text-right`} />
      </div>
      <div>
        <label htmlFor="contact-service" className={labelClass}>{con("serviceType")}</label>
        <select id="contact-service" value={form.service} onChange={set("service")} className={inputClass}>
          {SERVICE_KEYS.map((k) => (
            <option key={k} value={k}>{con(`serviceOptions.${k}`)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>{con("message")}</label>
        <textarea id="contact-message" required rows={4} value={form.message} onChange={set("message")} placeholder={con("messagePlaceholder")} className={`${inputClass} py-3.5 resize-y`} />
      </div>
      {status === "invalid" && (
        <p role="alert" className="text-red-700 text-sm font-medium m-0">{con("required")}</p>
      )}
      <button type="submit" className="w-full min-h-[54px] bg-gold text-navy rounded-xl font-bold text-lg hover:bg-[#E2C25A] transition">
        {con("send")}
      </button>
    </form>
  );
}
