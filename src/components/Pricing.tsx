import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router-dom";

const Pricing = () => {
  const { t, lang } = useI18n();
  const plans = [
    {
      slug: "jdg", name: t("pricing.p1.name"), price: `${t("pricing.from")} 300`, currency: "zł",
      features: [t("pricing.p1.f1"), t("pricing.p1.f2"), t("pricing.p1.f3"), t("pricing.p1.f4")],
    },
    {
      slug: "jdg-vat", name: t("pricing.p2.name"), price: `${t("pricing.from")} 500`, currency: "zł", popular: true,
      features: [t("pricing.p2.f1"), t("pricing.p2.f2"), t("pricing.p2.f3"), t("pricing.p2.f4")],
    },
    {
      slug: "sp-z-oo", name: t("pricing.p3.name"), price: `${t("pricing.from")} 1 200`, currency: "zł",
      features: [t("pricing.p3.f1"), t("pricing.p3.f2"), t("pricing.p3.f3"), t("pricing.p3.f4")],
    },
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="gold-line w-16 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("pricing.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("pricing.desc")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-8 rounded-xl border ${p.popular ? "border-accent bg-primary text-primary-foreground" : "border-border bg-card"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-8 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {t("pricing.popular")}
                </span>
              )}
              <h3 className={`text-xl font-semibold mb-2 ${p.popular ? "" : "text-foreground"}`}>{p.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-heading font-bold">{p.price}</span>
                <span className={`text-sm ml-1 ${p.popular ? "opacity-80" : "text-muted-foreground"}`}>{p.currency}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.popular ? "text-accent" : "text-primary"}`} />
                    <span className={p.popular ? "opacity-90" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3">
                <Link to={`/uslugi/${p.slug}`} className={`block text-center py-3 rounded-md border text-sm font-semibold transition-colors ${p.popular ? "border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10" : "border-primary text-primary hover:bg-primary/10"}`}>
                  {lang === "pl" ? "Dowiedz się więcej" : lang === "ru" ? "Подробнее об услуге" : "Explore service"}
                </Link>
                <Link to={`/kalkulator?type=${p.slug}`} className={`block text-center py-3 rounded-md text-sm font-semibold transition-colors ${p.popular ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                  {lang === "pl" ? "Oblicz podatki" : lang === "ru" ? "Рассчитать налоги" : "Calculate taxes"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
