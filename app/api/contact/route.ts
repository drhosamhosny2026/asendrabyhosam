import { NextResponse } from "next/server";

// Sends contact-form requests by email through Resend (https://resend.com).
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      required. Without it this route answers 503 and the form
//                       falls back to opening the visitor's email app.
//   CONTACT_TO_EMAIL    inbox that receives requests.
//   CONTACT_FROM_EMAIL  sender, e.g. "ASCENDRA <website@ascendrabyhosam.com>" once the
//                       domain is verified in Resend. Until then Resend's test sender
//                       (onboarding@resend.dev) works, but only to the Resend account's
//                       own email address.

const SERVICES = ["consulting", "digital", "marketing", "unsure"] as const;
type Service = (typeof SERVICES)[number];

const SERVICE_LABEL: Record<Service, string> = {
  consulting: "الاستشارات",
  digital: "الحلول الرقمية",
  marketing: "التسويق",
  unsure: "غير محدد",
};

const MAX = { name: 120, phone: 40, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const email = clean(body.email, MAX.email);
  const message = clean(body.message, MAX.message);
  const service: Service = SERVICES.includes(body.service as Service) ? (body.service as Service) : "unsure";
  const locale = body.locale === "en" ? "en" : "ar";

  if (!name || !phone || !message || (email && !EMAIL_RE.test(email))) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || "dr.hosamhosny2014@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "ASCENDRA Website <onboarding@resend.dev>";
  const label = SERVICE_LABEL[service];

  const rows: [string, string][] = [
    ["القسم", label],
    ["الاسم", name],
    ["الجوال", phone],
    ["البريد", email || "—"],
    ["لغة الموقع", locale === "en" ? "English" : "العربية"],
  ];
  const html = `
<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;color:#0B1D33;max-width:600px">
  <h2 style="margin:0 0 16px">طلب جديد من الموقع — ${escapeHtml(label)}</h2>
  <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;background:#F0F2F4;font-weight:bold;width:120px">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #E3E7ED" dir="auto">${escapeHtml(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="font-weight:bold;margin:0 0 8px">الرسالة</p>
  <p style="white-space:pre-wrap;line-height:1.8;margin:0" dir="auto">${escapeHtml(message)}</p>
</div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[${label}] ${name}`,
        html,
        text,
        ...(email ? { reply_to: email } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
