import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { calculateAnnual } from "@/lib/taxCalculator";
import { useI18n } from "@/lib/i18n";

function fmt(n: number) {
  return n.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const TaxCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(6000);
  const [ryczaltRate, setRyczaltRate] = useState(0.12);
  const [monthlyCosts, setMonthlyCosts] = useState(0);
  const { t } = useI18n();

  const results = useMemo(() => calculateAnnual(monthlyIncome, ryczaltRate, monthlyCosts * 12), [monthlyIncome, ryczaltRate, monthlyCosts]);
  
  
  

  return (
    <section id="calculator" className="section-padding bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12">
            <div className="gold-line w-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
              <Calculator className="w-8 h-8 text-primary" />
              {t("calc.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("calc.desc")}</p>
          </div>

          {/* Income input */}
          <div className="bg-background rounded-xl border border-border p-8 mb-8">
            <label className="text-sm font-semibold text-foreground mb-4 block">{t("calc.income")}</label>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
                className="w-36 px-4 py-2.5 rounded-md border border-border bg-card text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <span className="text-muted-foreground text-sm">zł</span>
            </div>
            <Slider
              value={[monthlyIncome]}
              onValueChange={(v) => setMonthlyIncome(v[0])}
              min={2000}
              max={30000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>2 000 zł</span>
              <span>{t("calc.annual")}: {fmt(monthlyIncome * 12)} zł</span>
              <span>30 000 zł</span>
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border p-6 mb-6 grid sm:grid-cols-2 gap-5">
            <div><label htmlFor="ryczalt-rate" className="text-sm font-semibold block mb-2">Stawka ryczałtu (do weryfikacji)</label><select id="ryczalt-rate" value={ryczaltRate} onChange={e => setRyczaltRate(Number(e.target.value))} className="w-full rounded-md border border-border bg-card p-3 text-sm">{[0.02,0.03,0.055,0.085,0.10,0.12,0.125,0.14,0.15,0.17].map(rate => <option key={rate} value={rate}>{rate * 100}%</option>)}</select></div>
            <div><label htmlFor="monthly-costs" className="text-sm font-semibold block mb-2">Koszty miesięczne (zł)</label><input id="monthly-costs" type="number" min="0" value={monthlyCosts} onChange={e => setMonthlyCosts(Math.max(0,Number(e.target.value)))} className="w-full rounded-md border border-border bg-card p-3 text-sm" /></div>
          </div>
          <div role="note" className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 mb-7">
            <h3 className="font-semibold text-foreground mb-2">Ważne: wyłącznie szacunek orientacyjny</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Kalkulator przedstawia przybliżone wartości na podstawie podanych danych i uproszczonych założeń. Nie uwzględnia wszystkich okoliczności, ulg, wyjątków i indywidualnych zasad ZUS. Nie jest poradą podatkową, ofertą ani gwarancją wyniku. Ostateczne wyliczenie i dobór formy opodatkowania wymagają analizy przez profesjonalną księgową. <a href="#contact" className="underline text-primary">Skontaktuj się z FINBIZ CENTRUM</a>.</p>
          </div>
          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {(["ryczalt", "ogolne"] as const).map((regime) => {
              const data = results[regime];
              
              return (
                <div key={regime} className={`rounded-xl border p-6 ${isBetter ? "border-accent bg-background" : "border-border bg-background"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{regime === "ryczalt" ? `Ryczałt ${ryczaltRate * 100}%` : "Skala podatkowa"}</h3>
                    
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{t(`calc.${regime}.desc`)}</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">{t("calc.tax")}</span><span className="text-foreground font-medium">{fmt(data.tax)} zł</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">{t("calc.zus")}</span><span className="text-foreground font-medium">{fmt(data.zus)} zł</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">{t("calc.health")}</span><span className="text-foreground font-medium">{fmt(data.health)} zł</span></div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between"><span className="text-muted-foreground font-medium">{t("calc.total.deductions")}</span><span className="text-foreground font-bold">{fmt(data.totalDeductions)} zł</span></div>
                    <div className="flex justify-between"><span className="text-primary font-medium">{t("calc.net.monthly")}</span><span className="text-primary font-bold">{fmt(data.net)} zł</span></div>
                    <div className="flex justify-between"><span className="text-primary font-medium">{t("calc.net.annual")}</span><span className="text-primary font-bold">{fmt(data.annualNet)} zł</span></div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground mt-6 text-center">Wyniki są orientacyjne. Szczegóły: <a className="underline" href="/regulamin">Regulamin i zasady kalkulatora</a>.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TaxCalculator;
