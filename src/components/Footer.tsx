const logo = "/finbiz-logo-dark.svg";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <img src={logo} alt="FinBiz Centrum" className="block w-[260px] max-w-full h-auto object-contain mb-5" />
            <p className="text-sm opacity-60 leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.nav")}</h4>
            <div className="space-y-2">
              <a href="#services" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.services")}</a>
              <a href="#pricing" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.pricing")}</a>
              <a href="#about" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.about")}</a>
              <a href="#contact" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.contact")}</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.legal")}</h4>
            <div className="text-sm opacity-60 space-y-1">
              <p>FINBIZ CENTRUM SP. Z O.O.</p>
              <p>KRS: 0001224296</p>
              <p>NIP: 5253079744</p>
              <p>REGON: 54401217000000</p>
              <a href="mailto:grossbuh23@gmail.com" className="block pt-2 underline underline-offset-2 hover:opacity-100">grossbuh23@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs opacity-40">
          © {new Date().getFullYear()} FINBIZ CENTRUM SP. Z O.O. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
