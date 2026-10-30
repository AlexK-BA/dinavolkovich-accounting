import { useI18n } from "@/lib/i18n";

const partners = [
  {
    name: "wFirma",
    href: "https://wfirma.pl/logowanie",
    logo: "",
    caption: { pl: "System księgowy", ru: "Бухгалтерская система", en: "Accounting platform" },
    logoClass: "h-12 max-w-[220px]",
    dark: false,
  },
  {
    name: "AIHUB WORKS",
    href: "https://aihub.works",
    logo: "/aihub-logo.svg",
    caption: { pl: "Technologia i automatyzacja", ru: "Технологии и автоматизация", en: "Technology and automation" },
    logoClass: "h-14 max-w-[230px]",
    dark: true,
  },
] as const;

const PartnerServices = () => {
  const { lang } = useI18n();
  const title = lang === "pl" ? "Systemy i partnerzy technologiczni" : lang === "ru" ? "Сервисы и технологические партнёры" : "Systems and technology partners";
  return (
    <section aria-label={title} className="bg-card border-t border-border px-5 md:px-10 lg:px-16 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-5 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {partners.map(partner => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              className={`rounded-xl border border-border px-6 py-5 min-h-32 flex flex-col items-center justify-center gap-3 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-colors ${partner.dark ? "bg-[#121820]" : "bg-white"}`}
            >
              {partner.logo ? <img src={partner.logo} alt={partner.name} loading="lazy" className={`w-auto object-contain ${partner.logoClass}`} /> : <span className="text-4xl font-bold tracking-tight text-[#1875B9]" aria-label="wFirma">wFirma</span>}
              <span className={`text-xs ${partner.dark ? "text-white/75" : "text-slate-600"}`}>{partner.caption[lang]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PartnerServices;
