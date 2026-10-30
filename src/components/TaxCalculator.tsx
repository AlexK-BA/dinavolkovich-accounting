import {useMemo,useState} from "react";
import {calculateTax2026, type TaxResult, type ZusMode} from "@/lib/taxCalculator";
import {useI18n} from "@/lib/i18n";
const money=(n:number)=>n.toLocaleString("pl-PL",{maximumFractionDigits:2,minimumFractionDigits:2})+" zł";
const rates=[0.02,0.03,0.055,0.085,0.10,0.12,0.125,0.14,0.15,0.17];
const descriptions={skala:"Skala podatkowa",liniowy:"Podatek liniowy",ryczalt:"Ryczałt"};
const uiText={
 pl:{heading:"Kalkulator podatkowy JDG 2026",intro:"Porównanie orientacyjne: skala podatkowa, podatek liniowy i ryczałt.",warning:"Ważne — tylko szacunkowe wyliczenia",warningBody:"Wyniki są przybliżonymi szacunkami opartymi na uproszczonych założeniach. Nie są poradą podatkową ani gwarancją oszczędności. Wybór formy opodatkowania należy zweryfikować z księgową.",contact:"Zapytaj FINBIZ CENTRUM",simple:"Uproszczony",detailed:"Szczegółowy",revenue:"Przychód miesięczny netto (zł)",costs:"Koszty miesięczne (zł)",rate:"Stawka ryczałtu — wymaga potwierdzenia PKWiU",zus:"Składki społeczne ZUS",sickness:"Dobrowolne chorobowe",start:"Miesiąc rozpoczęcia (1–12)",months:"Liczba miesięcy działalności",deduction:"Inne odliczenia roczne (zł) — tylko kwalifikowane",net:"Szacunkowo na rękę / rok",annualRevenue:"Przychód",annualCosts:"Koszty",social:"ZUS społeczny i FP/FS",health:"Składka zdrowotna",pit:"Podatek PIT",monthly:"Średnio na miesiąc",disclaimer:"Model szacunkowy 2026. Nie uwzględnia wszystkich ulg, wyjątków, zmian podstaw składek ani indywidualnych okoliczności. Wymaga weryfikacji przez księgową.",terms:"Regulamin kalkulatora",regimes:["Skala podatkowa","Podatek liniowy","Ryczałt"]},
 ru:{heading:"Налоговый калькулятор JDG 2026",intro:"Предварительное сравнение: налоговая шкала, линейный налог и ryczałt.",warning:"Важно — только предварительный расчёт",warningBody:"Результаты приблизительны и основаны на упрощённых допущениях. Они не являются налоговой консультацией или гарантией экономии. Выбор режима налогообложения необходимо согласовать с бухгалтером.",contact:"Связаться с FINBIZ CENTRUM",simple:"Простой",detailed:"Подробный",revenue:"Выручка в месяц без VAT (zł)",costs:"Расходы в месяц (zł)",rate:"Ставка ryczałt — необходимо подтвердить PKWiU",zus:"Социальные взносы ZUS",sickness:"Добровольное chorobowe",start:"Месяц начала (1–12)",months:"Количество месяцев деятельности",deduction:"Другие годовые вычеты (zł) — только допустимые",net:"Ориентировочно на руки / год",annualRevenue:"Выручка",annualCosts:"Расходы",social:"Социальные взносы и FP/FS",health:"Медицинские взносы",pit:"Налог PIT",monthly:"В среднем за месяц",disclaimer:"Ориентировочная модель 2026 года. Не учитывает все льготы, исключения, изменения баз взносов и индивидуальные обстоятельства. Требует проверки бухгалтером.",terms:"Правила калькулятора",regimes:["Налоговая шкала","Линейный налог","Ryczałt"]},
 en:{heading:"JDG tax calculator 2026",intro:"Indicative comparison: tax scale, flat tax and ryczałt.",warning:"Important — estimates only",warningBody:"Results are approximate and based on simplified assumptions. They are not tax advice or a guarantee of savings. Confirm your tax regime with an accountant.",contact:"Ask FINBIZ CENTRUM",simple:"Simple",detailed:"Detailed",revenue:"Monthly revenue excluding VAT (PLN)",costs:"Monthly expenses (PLN)",rate:"Ryczałt rate — PKWiU confirmation required",zus:"ZUS social contributions",sickness:"Voluntary sickness insurance",start:"Starting month (1–12)",months:"Number of active months",deduction:"Other annual deductions (PLN) — eligible only",net:"Estimated take-home / year",annualRevenue:"Revenue",annualCosts:"Expenses",social:"Social contributions and FP/FS",health:"Health contributions",pit:"PIT tax",monthly:"Monthly average",disclaimer:"Indicative 2026 model. Does not include all reliefs, exceptions, changes to contribution bases or individual circumstances. Accountant verification required.",terms:"Calculator terms",regimes:["Tax scale","Flat tax","Ryczałt"]}
} as const;
const pdfText = {
 pl: {button:"Zapisz jako PDF",title:"Porównanie form opodatkowania JDG — 2026",subtitle:"Orientacyjna symulacja podatkowa",generated:"Data wygenerowania",period:"Okres",months:"miesięcy",revenue:"Przychód miesięczny",costs:"Koszty miesięczne",rate:"Stawka ryczałtu",zus:"Rodzaj ZUS",sickness:"Dobrowolne chorobowe",yes:"Tak",no:"Nie",annualRevenue:"Przychód roczny",annualCosts:"Koszty roczne",social:"Składki społeczne",health:"Składka zdrowotna",pit:"Podatek PIT",net:"Kwota po kosztach i podatkach",monthly:"Średnio miesięcznie",disclaimer:"UWAGA: Wyniki są szacunkowe, bazują na uproszczonych założeniach i nie stanowią porady podatkowej. Nie obejmują wszystkich ulg, wyjątków i zasad rozliczania składek. Ostateczne wyliczenie i wybór formy opodatkowania należy potwierdzić z księgową FINBIZ CENTRUM.",contact:"Strona: finbizcentrum.pl",regimes:["Skala podatkowa","Podatek liniowy","Ryczałt"]},
 ru: {button:"Сохранить как PDF",title:"Сравнение режимов налогообложения JDG — 2026",subtitle:"Предварительный налоговый расчёт",generated:"Дата формирования",period:"Период",months:"мес.",revenue:"Месячная выручка",costs:"Месячные расходы",rate:"Ставка ryczałt",zus:"Режим ZUS",sickness:"Добровольное chorobowe",yes:"Да",no:"Нет",annualRevenue:"Годовая выручка",annualCosts:"Годовые расходы",social:"Социальные взносы",health:"Медицинские взносы",pit:"Налог PIT",net:"Остаток после расходов и налогов",monthly:"В среднем за месяц",disclaimer:"ВНИМАНИЕ: Расчёты приблизительные и основаны на упрощённых допущениях. Это не налоговая консультация. Учтены не все льготы, исключения и правила взносов. Итоговые расчёты и выбор режима необходимо подтвердить у бухгалтера FINBIZ CENTRUM.",contact:"Сайт: finbizcentrum.pl",regimes:["Налоговая шкала","Линейный налог","Ryczałt"]},
 en: {button:"Save as PDF",title:"JDG tax regime comparison — 2026",subtitle:"Indicative tax estimate",generated:"Generated on",period:"Period",months:"months",revenue:"Monthly revenue",costs:"Monthly costs",rate:"Ryczałt rate",zus:"ZUS category",sickness:"Voluntary sickness insurance",yes:"Yes",no:"No",annualRevenue:"Annual revenue",annualCosts:"Annual costs",social:"Social contributions",health:"Health contributions",pit:"PIT income tax",net:"Net after expenses and taxes",monthly:"Monthly average",disclaimer:"IMPORTANT: These figures are estimates based on simplified assumptions, not tax advice. Not all reliefs, exceptions or contribution rules are included. Confirm final figures and tax regime eligibility with a FINBIZ CENTRUM accountant.",contact:"Website: finbizcentrum.pl",regimes:["Tax scale","Flat tax","Ryczałt"]},
} as const;
const zusLabels = {pl:{start:"Ulga na start",preferential:"Preferencyjny ZUS",full:"Pełny ZUS"},ru:{start:"Ulga na start",preferential:"Льготный ZUS",full:"Полный ZUS"},en:{start:"Start-up relief",preferential:"Preferential ZUS",full:"Full ZUS"}} as const;
const regimeOrder = ["skala","liniowy","ryczalt"] as const;

export default function TaxCalculator(){
 const {lang}=useI18n();
 const [detailed,setDetailed]=useState(false);
 const [revenue,setRevenue]=useState(12000);
 const [costs,setCosts]=useState(2000);
 const [rate,setRate]=useState(0.12);
 const [zusMode,setZusMode]=useState<ZusMode>("full");
 const [chorobowe,setChorobowe]=useState(true);
 const [months,setMonths]=useState(12);
 const [startMonth,setStartMonth]=useState(1);
 const [deduction,setDeduction]=useState(0);
 const result=useMemo(()=>calculateTax2026({monthlyRevenue:revenue,monthlyCosts:costs,ryczaltRate:rate,zusMode,chorobowe,months,startMonth,additionalDeduction:deduction}),[revenue,costs,rate,zusMode,chorobowe,months,startMonth,deduction]);
 const pdf=pdfText[lang];
 const ui=uiText[lang];
 const printPdf=()=>{window.print();}; // Chromium: choose “Save as PDF” in the print dialog.
 const numberField=(label:string,value:number,change:(n:number)=>void,max?:number)=><label className="block text-sm font-semibold">{label}<input className="mt-2 w-full rounded-md border border-border bg-background p-3" type="number" min="0" max={max} value={value} onChange={e=>change(Math.max(0,Number(e.target.value)||0))}/></label>;
 return <section id="calculator" className="section-padding bg-card"><div className="max-w-6xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold mb-3">{ui.heading}</h2>
  <p className="text-muted-foreground mb-5">{ui.intro}</p>
  <div role="note" className="border-2 border-primary/40 rounded-xl p-5 mb-7 bg-background">
   <strong className="block mb-2">{ui.warning}</strong>
   <p className="text-sm leading-relaxed">{ui.warningBody} <a href="#contact" className="underline text-primary">{ui.contact}</a>.</p>
  </div>
  <div className="flex gap-2 mb-6" role="group" aria-label={ui.heading}>
   <button type="button" aria-pressed={!detailed} onClick={()=>setDetailed(false)} className={`rounded-md px-5 py-2 border ${!detailed?"bg-primary text-primary-foreground":"bg-background"}`}>{ui.simple}</button>
   <button type="button" aria-pressed={detailed} onClick={()=>setDetailed(true)} className={`rounded-md px-5 py-2 border ${detailed?"bg-primary text-primary-foreground":"bg-background"}`}>{ui.detailed}</button>
  </div>
  <div className="rounded-xl bg-background border border-border p-5 md:p-7 mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
   {numberField(ui.revenue,revenue,setRevenue)}
   {numberField(ui.costs,costs,setCosts)}
   <label className="block text-sm font-semibold">{ui.rate}<select className="mt-2 w-full rounded-md border border-border bg-background p-3" value={rate} onChange={e=>setRate(Number(e.target.value))}>{rates.map(r=><option key={r} value={r}>{(r*100).toLocaleString("pl-PL")}%</option>)}</select></label>
   <label className="block text-sm font-semibold">{ui.zus}<select className="mt-2 w-full rounded-md border border-border bg-background p-3" value={zusMode} onChange={e=>setZusMode(e.target.value as ZusMode)}><option value="full">{zusLabels[lang].full}</option><option value="preferential">{zusLabels[lang].preferential}</option><option value="start">{zusLabels[lang].start}</option></select></label>
   {detailed&&<><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={chorobowe} onChange={e=>setChorobowe(e.target.checked)}/>{ui.sickness}</label>{numberField(ui.start,startMonth,n=>setStartMonth(Math.min(12,Math.max(1,n))),12)}{numberField(ui.months,months,n=>setMonths(Math.min(12,Math.max(1,n))),12)}{numberField(ui.deduction,deduction,setDeduction)}</>}
  </div>
  {zusMode==="start"&&Math.min(months,13-startMonth)>6&&<p role="alert" className="mb-5 text-sm font-semibold text-destructive">{lang==="pl"?"Ulga na start: model nie uwzględnia zakończenia sześciomiesięcznej ulgi. Wynik może być zawyżony — skonsultuj się z księgową.":lang==="ru"?"Ulga na start: модель не учитывает окончание шестимесячной льготы. Результат может быть завышен — проконсультируйтесь с бухгалтером.":"Start-up relief: this estimate does not account for the end of the six-month relief period. The result may be overstated — consult an accountant."}</p>}
  <div className="mb-5"><button type="button" onClick={printPdf} className="rounded-md bg-primary text-primary-foreground px-5 py-3 font-semibold hover:opacity-90" aria-label={pdf.button}>{pdf.button}</button></div>
  <div className="grid md:grid-cols-3 gap-5">{result.map(r=><article key={r.regime} className="rounded-xl border border-border bg-background p-5">
   <h3 className="text-xl font-semibold mb-3">{ui.regimes[regimeOrder.indexOf(r.regime)]}</h3>
   <p className="text-xs text-muted-foreground mb-2">{ui.net}</p><p className="text-2xl font-bold text-primary mb-5">{money(r.net)}</p>
   <dl className="text-sm space-y-3">{[[ui.annualRevenue,r.annualRevenue],[ui.annualCosts,r.annualCosts],[ui.social,r.social],[ui.health,r.health],[ui.pit,r.pit],[ui.monthly,r.monthlyNet]].map(([k,v])=><div key={String(k)} className="flex justify-between gap-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-right">{money(Number(v))}</dd></div>)}</dl>
  </article>)}</div>
  <p className="text-xs text-muted-foreground mt-6">{ui.disclaimer} <a href="mailto:grossbuh23@gmail.com" className="underline">{ui.contact}</a>.</p>
 </div>
 <div id="tax-print-report" className="tax-print-report">
  <header className="tax-print-header"><img src="/finbiz-logo.svg" alt="FINBIZ CENTRUM"/><div><h1>{pdf.title}</h1><p>{pdf.subtitle}</p></div></header>
  <p className="tax-print-date">{pdf.generated}: {new Intl.DateTimeFormat(lang==="pl"?"pl-PL":lang==="ru"?"ru-RU":"en-GB",{dateStyle:"long"}).format(new Date())}</p>
  <div className="tax-print-inputs">
   <p><strong>{pdf.period}:</strong> {startMonth}–{Math.min(12,startMonth+months-1)} / 2026 ({Math.min(months,13-startMonth)} {pdf.months})</p>
   <p><strong>{pdf.revenue}:</strong> {money(revenue)}</p>
   <p><strong>{pdf.costs}:</strong> {money(costs)}</p>
   <p><strong>{pdf.rate}:</strong> {rate*100}%</p>
   <p><strong>{pdf.zus}:</strong> {zusLabels[lang][zusMode]}</p>
   <p><strong>{pdf.sickness}:</strong> {chorobowe?pdf.yes:pdf.no}</p>
  </div>
  <table><thead><tr><th></th>{regimeOrder.map((regime,i)=><th key={regime}>{pdf.regimes[i]}</th>)}</tr></thead><tbody>
   {([[pdf.annualRevenue,"annualRevenue"],[pdf.annualCosts,"annualCosts"],[pdf.social,"social"],[pdf.health,"health"],[pdf.pit,"pit"],[pdf.net,"net"],[pdf.monthly,"monthlyNet"]] as [string,keyof TaxResult][]).map(([label,key])=><tr key={key}><th>{label}</th>{result.map(r=><td key={r.regime}>{money(r[key] as number)}</td>)}</tr>)}
  </tbody></table>
  <p className="tax-print-disclaimer">{pdf.disclaimer}</p>
  <footer>FINBIZ CENTRUM · finbizcentrum.pl · {pdf.contact}</footer>
 </div>
 </section>;
}
