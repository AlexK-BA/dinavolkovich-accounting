import { useI18n } from "@/lib/i18n";
const partners = [
  { name: "wFirma", href: "https://wfirma.pl/logowanie", caption: "System księgowy", mark: "wFirma" },
  { name: "AIHUB WORKS", href: "https://aihub.works", caption: "Technologia i automatyzacja", mark: "AIHUB WORKS" },
];
const PartnerServices = () => {
  const { lang } = useI18n();
  const title = lang === "pl" ? "Systemy i partnerzy technologiczni" : lang === "ru" ? "Сервисы и технологические партнёры" : "Systems and technology partners";
  return <section aria-label={title} className="bg-card border-t border-border px-5 md:px-10 lg:px-16 py-8 md:py-10">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-5 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {partners.map(partner => <a key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.name} className="rounded-xl border border-border bg-background px-6 py-5 min-h-28 flex flex-col items-center justify-center gap-2 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-colors">
          <span className="text-2xl font-bold tracking-tight text-primary">{partner.mark}</span>
          <span className="text-xs text-muted-foreground">{partner.caption}</span>
        </a>)}
      </div>
    </div>
  </section>;
};
export default PartnerServices;
