import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import About from "@/components/About";
import Founder from "@/components/Founder";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PartnerServices from "@/components/PartnerServices";

const Index = () => {
  const { lang } = useI18n();
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <section id="calculator" className="section-padding bg-card">
        <div className="max-w-5xl mx-auto text-center rounded-2xl border border-border bg-background p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{lang === "pl" ? "Kalkulator dla Twojej firmy" : lang === "ru" ? "Калькулятор для вашего бизнеса" : "Business tax calculator"}</h2>
          <p className="text-muted-foreground mb-7">{lang === "pl" ? "Wybierz JDG, JDG + VAT lub sp. z o.o. i przejdź do osobnej strony kalkulatora." : lang === "ru" ? "Выберите JDG, JDG + VAT или sp. z o.o. на отдельной странице калькулятора." : "Choose JDG, JDG + VAT or sp. z o.o. on a dedicated calculator page."}</p>
          <Link to="/kalkulator" className="inline-block rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90">{lang === "pl" ? "Otwórz kalkulator" : lang === "ru" ? "Открыть калькулятор" : "Open calculator"}</Link>
        </div>
      </section>
      <About />
      <Founder />
      <FAQ />
      <Contact />
      <PartnerServices />
      <Footer />
    </div>
  );
};

export default Index;
