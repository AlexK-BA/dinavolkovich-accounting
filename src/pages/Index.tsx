import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import About from "@/components/About";
import Founder from "@/components/Founder";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PartnerServices from "@/components/PartnerServices";

const Index = () => {
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
