import {ArrowRight,ShieldCheck,CheckCircle2} from "lucide-react";
import {useI18n} from "@/lib/i18n";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import TaxCalculatorV2 from "@/components/TaxCalculatorV2";
import Process from "@/components/Process";
import About from "@/components/About";
import Founder from "@/components/Founder";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import PartnerServices from "@/components/PartnerServices";
import Footer from "@/components/Footer";
import CookiePreferences from "@/components/CookiePreferences";

const copy={
 pl:{badge:"Wersja testowa nowego designu",back:"Obecna strona",headline:"Księgowość, która daje Ci więcej czasu na biznes.",intro:"Obsługa JDG i sp. z o.o. w Polsce. Jasne zasady współpracy, wsparcie księgowej i pomoc w codziennych formalnościach.",cta:"Zapytaj o współpracę",more:"Zobacz usługi",nav:["Usługi","Cennik","Kalkulator","Kontakt"],trust:"Co zyskujesz?",points:["Obsługa JDG i sp. z o.o.","Kontakt po polsku, rosyjsku i angielsku","Przejrzysty proces współpracy"],note:"Wersja testowa. Ceny, zakres usług i dokumenty prawne wymagają zatwierdzenia.",legal:["Polityka prywatności","Polityka cookies","Regulamin"]},
 ru:{badge:"Тестовая версия нового дизайна",back:"Текущий сайт",headline:"Бухгалтерия, которая освобождает время для бизнеса.",intro:"Сопровождение JDG и sp. z o.o. в Польше. Понятные условия сотрудничества, связь с бухгалтером и помощь с документами.",cta:"Обсудить сотрудничество",more:"Наши услуги",nav:["Услуги","Цены","Калькулятор","Контакты"],trust:"Что вы получаете?",points:["Сопровождение JDG и sp. z o.o.","Общение на польском, русском и английском","Прозрачный процесс сотрудничества"],note:"Тестовая версия. Цены, условия и юридические документы требуют согласования.",legal:["Конфиденциальность","Cookies","Условия использования"]},
 en:{badge:"New design preview",back:"Current website",headline:"Accounting that gives you more time for business.",intro:"Accounting support for JDG and limited companies in Poland. Clear terms, access to an accountant and help with everyday paperwork.",cta:"Discuss your needs",more:"Explore services",nav:["Services","Pricing","Calculator","Contact"],trust:"What you get",points:["JDG and sp. z o.o. support","Polish, Russian and English communication","Transparent onboarding"],note:"Preview only. Pricing, service scope and legal drafts require approval.",legal:["Privacy policy","Cookie policy","Terms"]}
} as const;
export default function DesignPreview(){
 const {lang,setLang}=useI18n();const t=copy[lang];
 return <div className="min-h-screen bg-background text-foreground">
  <div className="bg-[#173D30] text-white px-5 py-2.5 text-sm"><div className="max-w-7xl mx-auto flex justify-between gap-3"><span>{t.badge}</span><a href="/" className="underline underline-offset-4">{t.back}</a></div></div>
  <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur border-b border-[#E5E1D9]">
   <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex flex-wrap justify-between items-center gap-4">
    <a href="#top"><img src="/finbiz-logo.svg" alt="FINBIZ CENTRUM" className="w-[180px]"/></a>
    <nav aria-label="Navigation" className="flex flex-wrap gap-4 text-sm font-semibold"><a href="#services">{t.nav[0]}</a><a href="#pricing">{t.nav[1]}</a><a href="#calculator">{t.nav[2]}</a><a href="#contact">{t.nav[3]}</a></nav>
    <div className="flex gap-1">{(["pl","ru","en"] as const).map(l=><button type="button" key={l} aria-pressed={lang===l} onClick={()=>setLang(l)} className={`px-2 py-1 rounded text-xs font-bold ${lang===l?"bg-primary text-primary-foreground":"border border-border"}`}>{l.toUpperCase()}</button>)}</div>
   </div>
  </header>
  <main id="top">
   <section className="bg-[#FAF9F6] px-5 md:px-10 py-20 md:py-28"><div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
    <div><p className="uppercase tracking-[.16em] text-primary font-bold text-sm mb-5">FINBIZ CENTRUM · POLSKA</p>
     <h1 className="font-heading text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.09] tracking-tight">{t.headline}</h1>
     <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
     <div className="mt-9 flex flex-wrap gap-3"><a href="#contact" className="bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold inline-flex gap-2 items-center">{t.cta}<ArrowRight size={18}/></a><a href="#services" className="border border-primary text-primary px-6 py-4 rounded-lg font-semibold">{t.more}</a></div>
    </div>
    <aside className="bg-white border border-[#DCE5DE] rounded-3xl p-8 md:p-10 shadow-[0_20px_70px_rgba(22,55,43,.08)]">
     <h2 className="flex items-center gap-3 text-primary font-bold text-xl mb-7"><ShieldCheck size={26}/>{t.trust}</h2>
     <ul className="space-y-6">{t.points.map(p=><li key={p} className="flex gap-3 items-start"><CheckCircle2 className="text-primary shrink-0 mt-0.5"/><span className="font-medium">{p}</span></li>)}</ul>
    </aside>
   </div></section>
   <Services/><Pricing/><TaxCalculatorV2/><Process/><About/><Founder/><FAQ/><Contact/><PartnerServices/>
  </main>
  <div className="bg-[#F3F0E9] text-center text-sm px-5 py-5">{t.note}</div><nav aria-label="Preview legal documents" className="bg-[#F3F0E9] px-5 pb-6 flex flex-wrap justify-center gap-5 text-sm underline"><a href="/design-preview/polityka-prywatnosci">{t.legal[0]}</a><a href="/design-preview/polityka-cookies">{t.legal[1]}</a><a href="/design-preview/regulamin">{t.legal[2]}</a></nav><Footer/><CookiePreferences/>
 </div>;
}
