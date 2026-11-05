import { Link, useParams } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculatorV2 from "@/components/TaxCalculatorV2";

type Slug = "jdg" | "jdg-vat" | "sp-z-oo" | "kadry-place" | "rejestracja" | "konsultacje";
const copy = {
  pl: {
    back: "Wszystkie usługi", heading: "Usługi księgowe", scope: "Co obejmuje usługa",
    estimate: "Wstępna kalkulacja", estimateNote: "Wybierz parametry działalności. Wynik jest orientacyjny i wymaga weryfikacji z księgową.",
    quote: "Zapytaj o indywidualną wycenę", note: "Zakres i cena końcowa zależą od liczby dokumentów i specyfiki działalności.",
    items: {
      jdg: ["Księgowość JDG", "Obsługa KPiR lub ryczałtu, rozliczenia ZUS i bieżące wsparcie.", ["KPiR lub ewidencja przychodów", "Rozliczenia ZUS", "Rozliczenia PIT", "Kontakt z księgową"]],
      "jdg-vat": ["Księgowość JDG + VAT", "Obsługa JDG z rozliczeniami VAT i JPK_V7.", ["KPiR lub ryczałt", "Rozliczenia VAT i JPK_V7", "ZUS i PIT", "Wsparcie przy dokumentach"]],
      "sp-z-oo": ["Księgowość sp. z o.o.", "Pełne księgi rachunkowe dla spółek z ograniczoną odpowiedzialnością.", ["Pełna księgowość", "CIT, VAT i JPK", "Sprawozdania finansowe", "Bieżąca obsługa spółki"]],
      "kadry-place": ["Kadry i płace", "Obsługa pracowników, umów i rozliczeń wynagrodzeń.", ["Listy płac", "ZUS pracowników", "Umowy i dokumentacja", "Obsługa kadrowa"]],
      rejestracja: ["Rejestracja działalności", "Wsparcie przy zakładaniu JDG lub spółki.", ["Wybór formy działalności", "Przygotowanie formalności", "Rejestracja JDG lub spółki", "Rozpoczęcie rozliczeń"]],
      konsultacje: ["Konsultacje księgowe", "Omówienie sytuacji biznesowej i możliwych rozwiązań.", ["Analiza zapytania", "Wyjaśnienie obowiązków", "Omówienie rozliczeń", "Dalsze rekomendacje"]],
    },
  },
  ru: {
    back: "Все услуги", heading: "Бухгалтерские услуги", scope: "Что входит в услугу",
    estimate: "Предварительный расчёт", estimateNote: "Настройте параметры бизнеса. Результат ориентировочный и требует проверки бухгалтером.",
    quote: "Запросить индивидуальную стоимость", note: "Окончательный объём и стоимость зависят от количества документов и особенностей бизнеса.",
    items: {
      jdg: ["Бухгалтерия JDG", "Ведение KPiR или ryczałt, расчёты ZUS и сопровождение.", ["KPiR или учёт выручки", "Расчёты ZUS", "Расчёты PIT", "Связь с бухгалтером"]],
      "jdg-vat": ["Бухгалтерия JDG + VAT", "Ведение JDG с отчётностью VAT и JPK_V7.", ["KPiR или ryczałt", "VAT и JPK_V7", "ZUS и PIT", "Поддержка с документами"]],
      "sp-z-oo": ["Бухгалтерия sp. z o.o.", "Полный бухгалтерский учёт для компаний.", ["Полная бухгалтерия", "CIT, VAT и JPK", "Годовая финансовая отчётность", "Сопровождение компании"]],
      "kadry-place": ["Кадры и зарплаты", "Ведение сотрудников, договоров и начислений.", ["Расчёт зарплат", "ZUS сотрудников", "Договоры и документы", "Кадровое сопровождение"]],
      rejestracja: ["Регистрация бизнеса", "Помощь с открытием JDG или компании.", ["Выбор формы бизнеса", "Подготовка документов", "Регистрация JDG или компании", "Запуск бухгалтерского учёта"]],
      konsultacje: ["Бухгалтерские консультации", "Разбор ситуации и возможных решений.", ["Анализ запроса", "Объяснение обязательств", "Обсуждение налогов", "Рекомендации"]],
    },
  },
  en: {
    back: "All services", heading: "Accounting services", scope: "What's included",
    estimate: "Initial estimate", estimateNote: "Adjust your business parameters. Results are indicative and require accountant verification.",
    quote: "Request a tailored quote", note: "Final scope and price depend on document volume and business specifics.",
    items: {
      jdg: ["JDG accounting", "KPiR or lump-sum bookkeeping, ZUS filings and ongoing support.", ["KPiR or revenue register", "ZUS filings", "PIT filings", "Accountant support"]],
      "jdg-vat": ["JDG + VAT accounting", "JDG bookkeeping with VAT and JPK_V7 reporting.", ["KPiR or lump-sum", "VAT and JPK_V7", "ZUS and PIT", "Document support"]],
      "sp-z-oo": ["Sp. z o.o. accounting", "Full accounting books for limited liability companies.", ["Full accounting", "CIT, VAT and JPK", "Annual financial statements", "Company support"]],
      "kadry-place": ["Payroll and HR", "Employee, contract and payroll administration.", ["Payroll calculations", "Employee ZUS", "Contracts and documents", "HR administration"]],
      rejestracja: ["Business registration", "Support for establishing a JDG or company.", ["Choosing a business structure", "Preparing documents", "JDG or company registration", "Accounting onboarding"]],
      konsultacje: ["Accounting consultations", "Review of your business situation and options.", ["Review of your question", "Explaining obligations", "Discussing tax options", "Recommendations"]],
    },
  },
} as const;

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useI18n();
  const t = copy[lang];
  if (!slug || !(slug in t.items)) return <div className="min-h-screen"><Header /><main className="max-w-5xl mx-auto px-6 py-24"><h1>404</h1><Link to="/#services">{t.back}</Link></main><Footer /></div>;
  const key = slug as Slug;
  const [title, description, features] = t.items[key];
  const hasJdgCalculator = key === "jdg" || key === "jdg-vat";
  return <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main>
      <section className="section-padding bg-card"><div className="max-w-5xl mx-auto">
        <Link to="/#services" className="text-sm text-primary underline">{t.back}</Link>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mt-7 mb-5">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
        <div className="mt-10 rounded-xl border border-border bg-background p-7">
          <h2 className="text-2xl font-semibold mb-5">{t.scope}</h2>
          <ul className="grid md:grid-cols-2 gap-4">{features.map(f => <li key={f} className="flex gap-3"><span className="text-primary">✓</span>{f}</li>)}</ul>
        </div>
        <p className="text-sm text-muted-foreground mt-5">{t.note}</p>
        <Link to={`/?service=${encodeURIComponent(key)}#contact`} className="inline-block mt-7 rounded-md bg-primary text-primary-foreground px-6 py-4 font-semibold">{t.quote}</Link>
      </div></section>
      {hasJdgCalculator && <div><div className="max-w-5xl mx-auto px-6 pt-12"><h2 className="text-2xl font-bold">{t.estimate}</h2><p className="text-muted-foreground mt-2">{t.estimateNote}</p></div><TaxCalculatorV2 initialRevenue={key === "jdg-vat" ? 20000 : 12000} initialRate={0.12}/></div>}
    </main>
    <Footer />
  </div>;
}
