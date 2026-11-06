import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

const money = (n: number) => n.toLocaleString("pl-PL", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " zł";
const clamp = (n: number) => Number.isFinite(n) ? Math.max(0, n) : 0;
const copy = {
  pl: { heading: "Symulacja VAT", note: "Uproszczona symulacja VAT za miesiąc. Wprowadź kwoty netto. Stawki i prawo do odliczenia należy zweryfikować dla każdej transakcji.", sales: "Sprzedaż netto miesięcznie", purchases: "Zakupy netto miesięcznie uprawniające do odliczenia", salesRate: "Stawka VAT sprzedaży", purchaseRate: "Stawka VAT zakupów", due: "VAT należny", input: "VAT naliczony do odliczenia", balance: "Saldo VAT", pay: "Orientacyjnie do zapłaty", surplus: "Nadwyżka podatku naliczonego", caution: "Nie uwzględnia sprzedaży mieszanej, zwolnień, proporcji, korekt, importu, WNT ani szczególnych zasad rozliczenia. Nadwyżka nie oznacza automatycznego zwrotu." },
  ru: { heading: "Расчёт VAT", note: "Упрощённая месячная модель. Указывайте суммы без VAT. Ставки и право на вычет проверяются по каждой операции.", sales: "Продажи в месяц без VAT", purchases: "Покупки в месяц без VAT с правом вычета", salesRate: "Ставка VAT продаж", purchaseRate: "Ставка VAT покупок", due: "Начисленный VAT", input: "Входящий VAT к вычету", balance: "Разница VAT", pay: "Ориентировочно к уплате", surplus: "Превышение входящего VAT", caution: "Не учитываются смешанные продажи, освобождения, пропорции, корректировки, импорт, WNT и специальные правила. Превышение не гарантирует возврат." },
  en: { heading: "VAT estimate", note: "Simplified monthly VAT model. Enter amounts excluding VAT. Verify applicable rates and deduction eligibility per transaction.", sales: "Monthly sales excluding VAT", purchases: "Monthly deductible purchases excluding VAT", salesRate: "Output VAT rate", purchaseRate: "Input VAT rate", due: "Output VAT", input: "Deductible input VAT", balance: "VAT balance", pay: "Estimated payable", surplus: "Input VAT surplus", caution: "Excludes mixed supplies, exemptions, pro-rata deduction, adjustments, imports, intra-EU acquisitions and special rules. Surplus does not automatically mean a refund." },
} as const;
export default function VatEstimate() {
  const { lang } = useI18n();
  const t = copy[lang];
  const [sales, setSales] = useState(20000);
  const [purchases, setPurchases] = useState(5000);
  const [salesRate, setSalesRate] = useState(0.23);
  const [purchaseRate, setPurchaseRate] = useState(0.23);
  const result = useMemo(() => {
    const due = clamp(sales) * salesRate;
    const input = clamp(purchases) * purchaseRate;
    return { due, input, balance: due - input };
  }, [sales, purchases, salesRate, purchaseRate]);
  const field = (label: string, value: number, setter: (n: number) => void) => <label className="block text-sm font-semibold">{label}<input type="number" min="0" step="0.01" value={value} onChange={e => setter(clamp(Number(e.target.value)))} className="mt-2 block w-full rounded-md border border-border bg-background p-3" /></label>;
  const rateField = (label: string, value: number, setter: (n: number) => void) => <label className="block text-sm font-semibold">{label}<select value={value} onChange={e => setter(Number(e.target.value))} className="mt-2 block w-full rounded-md border border-border bg-background p-3">{[0.23, 0.08, 0.05, 0].map(r => <option key={r} value={r}>{r * 100}%</option>)}</select></label>;
  return <section className="rounded-xl border border-border bg-card p-5 md:p-8 mb-10">
    <h2 className="text-2xl font-bold mb-3">{t.heading}</h2><p className="text-sm text-muted-foreground mb-6">{t.note}</p>
    <div className="grid sm:grid-cols-2 gap-4 mb-7">{field(t.sales, sales, setSales)}{field(t.purchases, purchases, setPurchases)}{rateField(t.salesRate, salesRate, setSalesRate)}{rateField(t.purchaseRate, purchaseRate, setPurchaseRate)}</div>
    <dl className="grid sm:grid-cols-3 gap-4">{[[t.due,result.due],[t.input,result.input],[t.balance,result.balance]] .map(([label,value]) => <div key={String(label)} className="rounded-lg bg-background border border-border p-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="text-xl font-bold mt-2">{money(Number(value))}</dd></div>)}</dl>
    <p className="font-semibold mt-5">{result.balance >= 0 ? t.pay : t.surplus}: {money(Math.abs(result.balance))}</p><p className="text-xs text-muted-foreground mt-4">{t.caution}</p>
  </section>;
}
