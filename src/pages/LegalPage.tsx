import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

type Kind = "privacy" | "cookies" | "terms";
const labels: Record<Kind, string> = { privacy: "Polityka prywatności / RODO", cookies: "Polityka cookies", terms: "Regulamin" };
const LegalPage = ({ kind }: { kind: Kind }) => {
  const { lang } = useI18n();
  return <main className="min-h-screen bg-background text-foreground px-5 py-12 md:py-20">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-primary underline underline-offset-4">← FINBIZ CENTRUM</Link>
      <h1 className="text-3xl md:text-5xl font-bold mt-10 mb-6">{labels[kind]}</h1>
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
        <p className="font-semibold">{lang === "pl" ? "Dokument w przygotowaniu" : lang === "ru" ? "Документ готовится" : "Document in preparation"}</p>
        <p className="text-muted-foreground">{lang === "pl" ? "Treść wymaga zatwierdzenia przez administratora strony po weryfikacji procesów przetwarzania danych, plików cookies i warunków świadczenia usług. Ta strona nie stanowi jeszcze kompletnej polityki ani regulaminu." : lang === "ru" ? "Текст должен быть утверждён владельцем сайта после проверки обработки персональных данных, cookies и условий оказания услуг. Пока это не полноценный юридический документ." : "The site owner must approve this document after reviewing actual data processing, cookies and service terms. This is not yet a complete legal policy."}</p>
        <p className="text-sm">FINBIZ CENTRUM SP. Z O.O. · NIP: 5253079744 · <a href="mailto:finbiz.office@gmail.com" className="underline">finbiz.office@gmail.com</a></p>
      </div>
    </div>
  </main>;
};
export default LegalPage;
