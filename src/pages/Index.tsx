import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import About from "@/components/About";
import Founder from "@/components/Founder";
import TaxCalculator from "@/components/TaxCalculator";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PartnerServices from "@/components/PartnerServices";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <TaxCalculator />
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
