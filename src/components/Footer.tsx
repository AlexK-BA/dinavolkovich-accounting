import logo from "@/assets/logo.png";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t, lang } = useI18n();
  const legal = lang === "pl" ? "Dokumenty i informacje" : lang === "ru" ? "Документы и информация" : "Documents and information";
  const payment = lang === "pl" ? "Płatności" : lang === "ru" ? "Платежи" : "Payments";
  return (
    <footer className="bg-foreground text-primary-foreground px-5 md:px-10 lg:px-16 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="bg-white rounded-lg inline-flex p-2 mb-3"><img src={logo} alt="FinBiz Centrum" className="h-12 w-auto max-w-[180px] object-contain" /></div>
            <p className="text-sm opacity-75 leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("footer.nav")}</h4>
            <div className="flex flex-col gap-2 text-sm">
              {[[t("nav.services"),"#services"],[t("nav.pricing"),"#pricing"],[t("nav.about"),"#about"],[t("nav.contact"),"#contact"]].map(([label,href]) => <a key={href} href={href} className="opacity-75 hover:opacity-100">{label}</a>)}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{legal}</h4>
            <p className="text-sm opacity-75">FINBIZ CENTRUM SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</p>
            <p className="text-sm opacity-75">KRS: 0001224296</p>
            <p className="text-sm opacity-75">NIP: 5253079744</p>
            <p className="text-sm opacity-75">REGON: 54401217000000</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href="/polityka-prywatnosci" className="opacity-75 hover:opacity-100">Polityka prywatności / RODO</a>
              <a href="/polityka-cookies" className="opacity-75 hover:opacity-100">Polityka cookies</a>
              <a href="/regulamin" className="opacity-75 hover:opacity-100">Regulamin</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{payment}</h4>
            <p className="text-sm opacity-75">{lang === "pl" ? "Informacje o sposobach płatności i rozliczeniach zostaną opublikowane po ich zatwierdzeniu." : lang === "ru" ? "Информация об оплате появится после согласования условий." : "Payment information will be published after approval."}</p>
            <a href="mailto:finbiz.office@gmail.com" className="mt-3 block text-sm opacity-75 hover:opacity-100">finbiz.office@gmail.com</a>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-5 text-xs opacity-65">© {new Date().getFullYear()} FINBIZ CENTRUM SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ {t("footer.rights")}</div>
      </div>
    </footer>
  );
};
export default Footer;
