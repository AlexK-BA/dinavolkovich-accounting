
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Contact = () => {
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Zapytanie FINBIZ CENTRUM — " + String(data.get("type") || ""));
    const body = encodeURIComponent(["Imię: " + String(data.get("name") || ""), "Telefon: " + String(data.get("phone") || ""), "Email: " + String(data.get("email") || ""), "Rodzaj: " + String(data.get("type") || ""), "", String(data.get("message") || "")].join("\n"));
    window.location.href = `mailto:grossbuh23@gmail.com?subject=${subject}&body=${body}`;
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
              <form onSubmit={handleSubmit} className="space-y-5">
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
                <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
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
