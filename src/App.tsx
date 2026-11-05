import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import TaxCalculatorV2 from "./components/TaxCalculatorV2";
import DesignPreview from "./pages/DesignPreview";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator-preview" element={<div className="min-h-screen bg-background"><div className="bg-primary text-primary-foreground px-5 py-3 text-sm flex flex-wrap justify-between gap-2"><span>FINBIZ CENTRUM · Kalkulator JDG 2026 · Wersja testowa</span><a className="underline" href="/">Powrót na stronę główną / На главную</a></div><TaxCalculatorV2 /></div>} />
            <Route path="/design-preview" element={<DesignPreview />} />
            <Route path="/uslugi/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
