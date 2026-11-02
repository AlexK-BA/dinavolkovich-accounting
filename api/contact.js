// Vercel Node.js function. Configure RESEND_API_KEY and verified RESEND_FROM_EMAIL.
// No secrets are exposed to the browser. No messages are persisted by this function.
const recipient = "grossbuh23@gmail.com";
const MAX_BYTES = 12_000;
const clean = (v, max) => typeof v === "string" ? v.trim().slice(0, max) : "";
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "method_not_allowed" }); }
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host || (() => { try { const u = new URL(origin); return u.host !== host || u.protocol !== "https:" && u.hostname !== "localhost"; } catch { return true; } })()) return res.status(403).json({ error: "invalid_origin" });
  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
  if (Buffer.byteLength(raw, "utf8") > MAX_BYTES) return res.status(413).json({ error: "too_large" });
  let input;
  try { input = typeof req.body === "string" ? JSON.parse(req.body) : req.body; } catch { return res.status(400).json({ error: "invalid_json" }); }
  if (!input || typeof input !== "object" || Array.isArray(input)) return res.status(400).json({ error: "invalid_data" });
  if (input.website) return res.status(200).json({ ok: true }); // honeypot; do not send
  const name = clean(input.name, 120), phone = clean(input.phone, 40), email = clean(input.email, 254);
  const type = clean(input.type, 100), message = clean(input.message, 2500);
  if (!name || !phone || !type || !input.privacyAccepted || name.length > 120 || phone.length > 40) return res.status(422).json({ error: "invalid_fields" });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(422).json({ error: "invalid_email" });
  if (!/^[+\d()\s.-]{6,40}$/.test(phone)) return res.status(422).json({ error: "invalid_phone" });
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) return res.status(503).json({ error: "mail_not_configured" });
  const lines = [`Name: ${name}`,`Phone: ${phone}`,`Email: ${email || "(not provided)"}`,`Type: ${type}`, "", message, "", "Source: FINBIZ design-preview contact form"];
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [recipient], subject: "FINBIZ CENTRUM — new website enquiry", text: lines.join("\n"), ...(email ? { reply_to: email } : {}) }),
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) { console.error("Email provider rejected request", response.status); return res.status(502).json({ error: "delivery_failed" }); }
    return res.status(200).json({ ok: true });
  } catch (error) { console.error("Email delivery request failed", error instanceof Error ? error.name : "unknown"); return res.status(502).json({ error: "delivery_failed" }); }
}
