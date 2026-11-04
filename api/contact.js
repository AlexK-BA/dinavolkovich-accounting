// Vercel Node.js Function. Deploy as a separate API project; never expose secrets to Vite.
const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN || "https://finbizcentrum.pl";
const recipient = process.env.CONTACT_RECIPIENT || "grossbuh23@gmail.com";
const json = (res, status, payload) => res.status(status).json(payload);
const valid = (v, max) => typeof v === "string" && v.trim().length > 0 && v.trim().length <= max;

export default async function handler(req, res) {
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { error: "method_not_allowed" });
  if (req.headers.origin !== allowedOrigin) return json(res, 403, { error: "origin_not_allowed" });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.TURNSTILE_SECRET_KEY)
    return json(res, 503, { error: "service_not_configured" });
  const body = req.body || {};
  if (body.website) return json(res, 200, { ok: true });
  if (!valid(body.name, 120) || !valid(body.phone, 40) ||
      (body.email && (typeof body.email !== "string" || body.email.length > 254 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(body.email))) ||
      !valid(body.type, 100) || typeof body.message !== "string" || body.message.length > 5000 ||
      body.consent !== true || !valid(body.turnstileToken, 4096))
    return json(res, 400, { error: "invalid_submission" });
  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: body.turnstileToken }),
      signal: AbortSignal.timeout(8000),
    });
    const verdict = await verification.json();
    if (!verdict.success) return json(res, 403, { error: "verification_failed" });
    const lines = [
      "New FINBIZ contact enquiry",
      "Name: " + body.name.trim(),
      "Phone: " + body.phone.trim(),
      "Email: " + (body.email || ""),
      "Type: " + body.type.trim(),
      "Message:", body.message.trim(),
    ];
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [recipient],
        subject: "FINBIZ CENTRUM — new website enquiry",
        text: lines.join("\\n"),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!delivery.ok) return json(res, 502, { error: "delivery_failed" });
    return json(res, 200, { ok: true });
  } catch {
    return json(res, 502, { error: "upstream_unavailable" });
  }
}
