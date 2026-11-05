import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculatorV2 from "@/components/TaxCalculatorV2";
import { useI18n } from "@/lib/i18n";

type BusinessType = "jdg" | "jdg-vat" | "sp-z-oo";
const types: BusinessType[] = ["jdg", "jdg-vat", "sp-z-oo"];

export default function CalculatorPage() {
  const { lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const initial = params.get("type");
  const [type, setType] = useState<BusinessType>(types.includes(initial as BusinessType) ? initial as BusinessType : "jdg");
  useEffect(() => {
    const next = params.get("type");
    if (types.includes(next as BusinessType)) setType(next as BusinessType);
  }, [params]);
  const labels = {
    pl: { title: "Kalkulator dla firm", intro: "Wybierz formę działalności. Wyniki są orientacyjne i wymagają potwierdzenia przez księgową.", back: "Strona główna", company: "Sp. z o.o. — indywidualna kalkulacja", companyText: "Podatek CIT, wynagrodzenia, wypłaty zysku i składki zależą od sytuacji spółki. Nie stosujemy tutaj kalkulatora PIT dla JDG.", quote: "Zapytaj o kalkulację spółki", vat: "VAT nie jest dodatkową formą podatku dochodowego. Dla JDG + VAT kalkulator porównuje PIT; rozliczenie VAT wymaga osobnych danych." },
    ru: { title: "Калькулятор для бизнеса", intro: "Выберите форму бизнеса. Расчёты ориентировочные и требуют подтверждения бухгалтером.", back: "Главная", company: "Sp. z o.o. — индивидуальный расчёт", companyText: "CIT, зарплаты, распределение прибыли и взносы зависят от обстоятельств компании. Формулы PIT для JDG здесь не применяются.", quote: "Запросить расчёт для компании", vat: "VAT не является отдельным режимом подоходного налога. Для JDG + VAT здесь сравнивается PIT; расчёт VAT требует дополнительных данных." },
    en: { title: "Business tax calculator", intro: "Select your business structure. Estimates require accountant confirmation.", back: "Home", company: "Sp. z o.o. — tailored estimate", companyText: "CIT, payroll, profit distributions and contributions depend on company circumstances. JDG PIT calculations do not apply.", quote: "Request a company estimate", vat: "VAT is not an income-tax regime. For JDG + VAT, the calculator compares PIT; VAT reporting needs separate inputs." },
  }[lang];
  const choose = (next: BusinessType) => { setType(next); setParams({ type: next }); };
  return <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main className="pt-28">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <Link className="text-sm text-primary underline" to="/">{labels.back}</Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-5 mb-3">{labels.title}</h1>
        <p className="text-muted-foreground mb-8">{labels.intro}</p>
        <div role="group" aria-label={labels.title} className="grid sm:grid-cols-3 gap-3 mb-8">
          {types.map(item => <button key={item} type="button" aria-pressed={type === item} onClick={() => choose(item)} className={`rounded-xl border px-5 py-5 text-left font-semibold transition-colors ${type === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
            {item === "jdg" ? "JDG" : item === "jdg-vat" ? "JDG + VAT" : "Sp. z o.o."}
          </button>)}
        </div>
        {type === "jdg-vat" && <p role="note" className="mb-6 rounded-lg border border-border bg-card p-4 text-sm">{labels.vat}</p>}
        {type === "sp-z-oo" ? <section className="rounded-xl border border-border bg-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">{labels.company}</h2>
          <p className="text-muted-foreground max-w-3xl mb-7">{labels.companyText}</p>
          <Link to="/?service=sp-z-oo#contact" className="inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold">{labels.quote}</Link>
        </section> : <TaxCalculatorV2 key={type} initialRevenue={type === "jdg-vat" ? 20000 : 12000} initialRate={0.12} />}
      </div>
    </main>
    <Footer />
  </div>;
}
