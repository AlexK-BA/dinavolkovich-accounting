import {useMemo,useState} from "react";
import {calculateTax2026, type ZusMode} from "@/lib/taxCalculator";
import {useI18n} from "@/lib/i18n";
const money=(n:number)=>n.toLocaleString("pl-PL",{maximumFractionDigits:2,minimumFractionDigits:2})+" zł";
const rates=[0.02,0.03,0.055,0.085,0.10,0.12,0.125,0.14,0.15,0.17];
const descriptions={skala:"Skala podatkowa",liniowy:"Podatek liniowy",ryczalt:"Ryczałt"};
export default function TaxCalculator(){
 const {lang}=useI18n();
 const [detailed,setDetailed]=useState(false);
 const [revenue,setRevenue]=useState(12000);
 const [costs,setCosts]=useState(2000);
 const [rate,setRate]=useState(0.12);
 const [zusMode,setZusMode]=useState<ZusMode>("full");
 const [chorobowe,setChorobowe]=useState(true);
 const [months,setMonths]=useState(12);
 const [deduction,setDeduction]=useState(0);
 const result=useMemo(()=>calculateTax2026({monthlyRevenue:revenue,monthlyCosts:costs,ryczaltRate:rate,zusMode,chorobowe,months,additionalDeduction:deduction}),[revenue,costs,rate,zusMode,chorobowe,months,deduction]);
 const numberField=(label:string,value:number,change:(n:number)=>void,max?:number)=><label className="block text-sm font-semibold">{label}<input className="mt-2 w-full rounded-md border border-border bg-background p-3" type="number" min="0" max={max} value={value} onChange={e=>change(Math.max(0,Number(e.target.value)||0))}/></label>;
 return <section id="calculator" className="section-padding bg-card"><div className="max-w-6xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold mb-3">Kalkulator podatkowy JDG 2026</h2>
  <p className="text-muted-foreground mb-5">Porównanie orientacyjne: skala podatkowa, podatek liniowy i ryczałt.</p>
  <div role="note" className="border-2 border-primary/40 rounded-xl p-5 mb-7 bg-background">
   <strong className="block mb-2">Ważne — tylko szacunkowe wyliczenia</strong>
   <p className="text-sm leading-relaxed">Wyniki są przybliżonymi szacunkami na podstawie podanych danych, publicznie dostępnych informacji i uproszczonych założeń. Nie obejmują wszystkich ulg, wyjątków, zasad ZUS ani indywidualnych okoliczności. Nie są poradą podatkową, rekomendacją ani gwarancją oszczędności. Ostateczne rozliczenie oraz wybór formy opodatkowania powinien zweryfikować profesjonalny księgowy. <a href="#contact" className="underline text-primary">Zapytaj FINBIZ CENTRUM</a>.</p>
  </div>
  <div className="flex gap-2 mb-6" role="group" aria-label="Tryb kalkulatora">
   <button type="button" aria-pressed={!detailed} onClick={()=>setDetailed(false)} className={`rounded-md px-5 py-2 border ${!detailed?"bg-primary text-primary-foreground":"bg-background"}`}>Uproszczony</button>
   <button type="button" aria-pressed={detailed} onClick={()=>setDetailed(true)} className={`rounded-md px-5 py-2 border ${detailed?"bg-primary text-primary-foreground":"bg-background"}`}>Szczegółowy</button>
  </div>
  <div className="rounded-xl bg-background border border-border p-5 md:p-7 mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
   {numberField("Przychód miesięczny netto (zł)",revenue,setRevenue)}
   {numberField("Koszty miesięczne (zł)",costs,setCosts)}
   <label className="block text-sm font-semibold">Stawka ryczałtu — wymaga potwierdzenia PKWiU<select className="mt-2 w-full rounded-md border border-border bg-background p-3" value={rate} onChange={e=>setRate(Number(e.target.value))}>{rates.map(r=><option key={r} value={r}>{(r*100).toLocaleString("pl-PL")}%</option>)}</select></label>
   <label className="block text-sm font-semibold">Składki społeczne ZUS<select className="mt-2 w-full rounded-md border border-border bg-background p-3" value={zusMode} onChange={e=>setZusMode(e.target.value as ZusMode)}><option value="full">Pełny ZUS</option><option value="preferential">Preferencyjny ZUS</option><option value="start">Ulga na start</option></select></label>
   {detailed&&<><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={chorobowe} onChange={e=>setChorobowe(e.target.checked)}/>Dobrowolne chorobowe</label>{numberField("Miesiące prowadzenia działalności",months,n=>setMonths(Math.min(12,Math.max(1,n))),12)}{numberField("Inne odliczenia roczne (zł) — tylko kwalifikowane",deduction,setDeduction)}</>}
  </div>
  <div className="grid md:grid-cols-3 gap-5">{result.map(r=><article key={r.regime} className="rounded-xl border border-border bg-background p-5">
   <h3 className="text-xl font-semibold mb-3">{descriptions[r.regime]}</h3>
   <p className="text-xs text-muted-foreground mb-2">Szacunkowo na rękę / rok</p><p className="text-2xl font-bold text-primary mb-5">{money(r.net)}</p>
   <dl className="text-sm space-y-3">{[["Przychód",r.annualRevenue],["Koszty",r.annualCosts],["ZUS społeczny",r.social],["Składka zdrowotna",r.health],["Podatek PIT",r.pit],["Średnio na miesiąc",r.monthlyNet]].map(([k,v])=><div key={String(k)} className="flex justify-between gap-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-right">{money(Number(v))}</dd></div>)}</dl>
  </article>)}</div>
  <p className="text-xs text-muted-foreground mt-6">Model szacunkowy 2026. Nie uwzględnia m.in. Małego ZUS Plus, wakacji składkowych, pełnej listy ulg, innych źródeł dochodu, indywidualnych zasad rozliczenia składki zdrowotnej i wszystkich wyjątków. W przypadku takich sytuacji wymagane jest indywidualne wyliczenie. <a href="/regulamin" className="underline">Regulamin kalkulatora</a>.</p>
 </div></section>;
}
