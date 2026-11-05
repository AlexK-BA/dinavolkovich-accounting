import { motion } from "framer-motion";
import { BookOpen, Building2, Users, FileText, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Services = () => {
  const { t } = useI18n();
  const services = [
    { slug: "jdg", icon: BookOpen, title: t("services.s1.title"), desc: t("services.s1.desc") },
    { slug: "sp-z-oo", icon: Building2, title: t("services.s2.title"), desc: t("services.s2.desc") },
    { slug: "kadry-place", icon: Users, title: t("services.s3.title"), desc: t("services.s3.desc") },
    { slug: "rejestracja", icon: FileText, title: t("services.s4.title"), desc: t("services.s4.desc") },
    { slug: "konsultacje", icon: Briefcase, title: t("services.s5.title"), desc: t("services.s5.desc") },
  ];

  return (
    <section id="services" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="gold-line w-16 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("services.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("services.desc")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.slug} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
              className="group p-8 rounded-xl border border-border bg-background hover:border-accent transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3"><Link to={`/uslugi/${s.slug}`} className="hover:underline">{s.title}</Link></h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p><Link to={`/uslugi/${s.slug}`} className="inline-block mt-5 text-sm font-semibold text-primary underline underline-offset-4">{t("services.title")} →</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
