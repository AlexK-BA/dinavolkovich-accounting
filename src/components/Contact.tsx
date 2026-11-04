
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Contact = () => {
  const { t } = useI18n();

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { lang } = useI18n();
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();
  const captchaElement = useRef<HTMLDivElement>(null);
  const captchaToken = useRef("");
  const captchaWidgetId = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!endpoint || !siteKey) return;
    let disposed = false;
    let retries = 0;
    const mount = () => {
      const api = (window as Window & { turnstile?: { render: (el: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void } }).turnstile;
      if (disposed || !captchaElement.current) return;
      if (!api) {
        if (retries++ < 40) setTimeout(mount, 250);
        return;
      }
      captchaWidgetId.current = api.render(captchaElement.current, {
        sitekey: siteKey,
        callback: (token: string) => { captchaToken.current = token; },
        "expired-callback": () => { captchaToken.current = ""; },
        "error-callback": () => { captchaToken.current = ""; },
      });
    };
    const scriptId = "finbiz-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    mount();
    return () => {
      disposed = true;
      const api = (window as Window & { turnstile?: { remove: (id: string) => void } }).turnstile;
      if (captchaWidgetId.current && api) api.remove(captchaWidgetId.current);
    };
  }, [endpoint, siteKey]);
  const labels = {
    pl: { consent: "Wyrażam zgodę na kontakt w sprawie mojego zapytania. Dane zostaną wykorzystane wyłącznie do obsługi zapytania.", sending: "Wysyłanie…", sent: "Zapytanie zostało wysłane.", error: "Nie udało się wysłać zapytania. Spróbuj ponownie lub napisz do nas e-mail.", fallback: "Otworzy się program pocztowy. Wiadomość trzeba wysłać samodzielnie." },
    ru: { consent: "Согласен(на) на связь со мной по моему запросу. Данные используются только для обработки обращения.", sending: "Отправка…", sent: "Заявка отправлена.", error: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам на почту.", fallback: "Откроется почтовая программа. Письмо необходимо отправить самостоятельно." },
    en: { consent: "I agree to be contacted about my enquiry. My data will be used only to handle this enquiry.", sending: "Sending…", sent: "Request sent.", error: "Unable to send your request. Please try again or email us.", fallback: "Your email app will open. You must send the message yourself." },
  }[lang];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // Honeypot field
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      type: String(data.get("type") || ""),
      message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
      source: "finbizcentrum.pl",\n      turnstileToken: captchaToken.current,
    };
    if (!payload.name || !payload.phone || !payload.consent) return;\n    if (endpoint && (!siteKey || !payload.turnstileToken)) { setStatus("error"); return; }
    if (!endpoint) {
      const subject = encodeURIComponent("Zapytanie FINBIZ CENTRUM — " + payload.type);
      const body = encodeURIComponent(["Imię: " + payload.name, "Telefon: " + payload.phone, "Email: " + payload.email, "Rodzaj: " + payload.type, "", payload.message].join("\\n"));
      window.location.href = `mailto:grossbuh23@gmail.com?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Contact endpoint rejected submission");
      setStatus("sent");
      form.reset();\n      captchaToken.current = "";\n      const turnstile = (window as Window & { turnstile?: { reset: (id: string) => void } }).turnstile;\n      if (captchaWidgetId.current && turnstile) turnstile.reset(captchaWidgetId.current);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="gold-line w-16 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("contact.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("contact.desc")}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {(
              <form onSubmit={handleSubmit} className="space-y-5">\n                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.name")}</label>
                    <input name="name" type="text" required className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder={t("contact.name.ph")} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.phone")}</label>
                    <input name="phone" type="tel" required className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+48..." />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.email")}</label>
                  <input name="email" type="email" className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.type")}</label>
                  <select name="type" className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>{t("contact.type.jdg")}</option>
                    <option>{t("contact.type.sp")}</option>
                    <option>{t("contact.type.plan")}</option>
                    <option>{t("contact.type.other")}</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.message")}</label>
                  <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder={t("contact.message.ph")} />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" name="consent" required className="mt-1" /><span>{labels.consent}</span></label>
                {!endpoint && <p className="text-sm text-muted-foreground" role="note">{labels.fallback}</p>}
                {status === "sent" && <p role="status" className="text-sm text-primary">{labels.sent}</p>}
                {status === "error" && <p role="alert" className="text-sm text-destructive">{labels.error}</p>}
                {endpoint && siteKey && <div ref={captchaElement} aria-label="Spam protection verification" />}\n                <button type="submit" disabled={status === "sending"} className="w-full bg-primary text-primary-foreground py-3.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {t("contact.submit")}
                </button>
              </form>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{t("contact.address")}</h4>
                <p className="text-sm text-muted-foreground mt-1">Chmielna 2/31, 00-020 Warszawa, Polska</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{t("contact.phone")}</h4>
                <a href="tel:511183644" className="text-sm text-muted-foreground mt-1 block hover:text-primary transition-colors">511 183 644</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{t("contact.email")}</h4>
                <a href="mailto:grossbuh23@gmail.com" className="text-sm text-muted-foreground mt-1 block hover:text-primary transition-colors">grossbuh23@gmail.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{t("contact.hours")}</h4>
                <p className="text-sm text-muted-foreground mt-1">{t("contact.hours.val")}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <a href="https://t.me/FinBizC" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-md border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">Telegram</a>
              <a href="tel:511183644" className="px-5 py-2.5 rounded-md border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">{t("contact.call")}</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
