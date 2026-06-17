"use client";
import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const con = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  function set(field: keyof typeof form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    const subject = encodeURIComponent(`Business Diagnosis Request from ${form.name}`);
    const phoneLine = form.phone ? `\nPhone: ${form.phone}` : "";
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}${phoneLine}\n\n${form.message}`);
    const a = document.createElement("a");
    a.href = `mailto:dr.hosamhosny2014@gmail.com?subject=${subject}&body=${body}`;
    a.click();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="text-center py-10 focus:outline-none"
      >
        <p className="font-serif font-semibold text-2xl text-navy mb-3">{con("successTitle")}</p>
        <p className="text-gray-text text-sm">{con("successBody")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-navy/15 rounded-lg px-4 py-[14px] text-navy text-sm transition-colors " +
    "placeholder:text-gray-text/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";

  const labelClass = "block text-gray-text text-xs font-medium tracking-[0.12em] uppercase mb-1.5";

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          {con("name")}
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          placeholder={con("namePlaceholder")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {con("email")}
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          placeholder={con("emailPlaceholder")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          {con("phone")}
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          dir="ltr"
          value={form.phone}
          onChange={set("phone")}
          placeholder={con("phonePlaceholder")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {con("message")}
        </label>
        <textarea
          id="contact-message"
          required
          value={form.message}
          onChange={set("message")}
          placeholder={con("messagePlaceholder")}
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-red-700 text-sm font-medium">
          {con("errorMsg")}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-navy py-[14px] rounded-lg font-medium text-sm hover:bg-[#E8D48B] transition disabled:opacity-60"
      >
        {status === "sending" ? "..." : con("send")}
      </button>
    </form>
  );
}
