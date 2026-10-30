import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/lib/i18n";

const Hero = () => {
  const { t } = useI18n();
  return (
    <section className="relative flex items-center section-padding pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="gold-line w-16 mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight text-foreground">
            {t("hero.t1")}
            <br />
            <span className="text-primary">{t("hero.t2")}</span>
            <br />
            {t("hero.t3")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            {t("hero.desc")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="bg-primary text-primary-foreground px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
              {t("hero.cta1")}
            </a>
            <a href="#services" className="border border-primary text-primary px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-primary/5 transition-colors">
              {t("hero.cta2")}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 md:gap-8 text-sm text-muted-foreground">
            <div>
              <span className="text-2xl font-heading font-bold text-foreground">50+</span>
              <br />{t("hero.stat1")}
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="text-2xl font-heading font-bold text-foreground">15+</span>
              <br />{t("hero.stat2")}
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="text-2xl font-heading font-bold text-foreground">100%</span>
              <br />{t("hero.stat3")}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl -rotate-2" />
            <img src={heroBg} alt="Professional workspace" className="relative rounded-xl w-full object-cover aspect-[4/3]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
