import { useState } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
import { useI18n, type Lang } from "@/lib/i18n";

const langLabels: Record<Lang, string> = { ru: "RU", en: "EN", pl: "PL" };

const Header = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const clientLinks = [
    { label: "Efektywne Biuro Rachunkowe", href: "https://efektywnebiurorachunkowe.pl/" },
    { label: "wFirma", href: "https://wfirma.pl/" },
  ];

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="FinBiz Centrum" className="h-12 md:h-14 w-auto max-w-[190px] object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="relative group">
            <button type="button" className="flex items-center gap-1 text-sm font-semibold text-primary hover:opacity-80" aria-haspopup="true">{lang === "pl" ? "Strefa klienta" : lang === "ru" ? "Кабинет клиента" : "Client area"} <ChevronDown size={15}/></button>
            <div className="absolute right-0 top-full pt-3 hidden group-hover:block group-focus-within:block z-50 min-w-[245px]">
              <div className="rounded-lg border border-border bg-card shadow-lg p-2">{clientLinks.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-md px-3 py-3 text-sm hover:bg-secondary">{link.label}<ExternalLink size={14}/></a>)}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
            {(Object.keys(langLabels) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {t("nav.cta")}
          </a>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 pb-6">
          <div className="flex items-center gap-1 py-3">
            {(Object.keys(langLabels) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-foreground/80 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <div className="border-t border-border mt-2 pt-2"><p className="text-xs font-semibold text-muted-foreground py-2">{lang === "pl" ? "Strefa klienta" : lang === "ru" ? "Кабинет клиента" : "Client area"}</p>{clientLinks.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center justify-between py-3 text-sm">{link.label}<ExternalLink size={15}/></a>)}</div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
