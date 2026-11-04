import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ru" | "en" | "pl";

type Translations = Record<string, Record<Lang, string>>;

const t: Translations = {
  // Nav
  "nav.services": { ru: "Услуги", en: "Services", pl: "Usługi" },
  "nav.pricing": { ru: "Цены", en: "Pricing", pl: "Cennik" },
  "nav.about": { ru: "О нас", en: "About", pl: "O nas" },
  "nav.contact": { ru: "Контакты", en: "Contact", pl: "Kontakt" },
  "nav.cta": { ru: "Оставить заявку", en: "Get in touch", pl: "Wyślij zapytanie" },

  // Hero
  "hero.t1": { ru: "Бухгалтерия", en: "Accounting", pl: "Księgowość" },
  "hero.t2": { ru: "для вашего бизнеса", en: "for your business", pl: "dla Twojego biznesu" },
  "hero.t3": { ru: "в Польше", en: "in Poland", pl: "w Polsce" },
  "hero.desc": {
    ru: "Профессиональное бухгалтерское обслуживание для JDG и sp.\u00a0z\u00a0o.o. Работаем онлайн по всей Польше. Русский, английский, польский.",
    en: "Professional accounting services for JDG and sp.\u00a0z\u00a0o.o. We work online across Poland. Russian, English, Polish.",
    pl: "Profesjonalne usługi księgowe dla JDG i sp.\u00a0z\u00a0o.o. Pracujemy online w całej Polsce. Rosyjski, angielski, polski.",
  },
  "hero.cta1": { ru: "Записаться на консультацию", en: "Book a consultation", pl: "Umów konsultację" },
  "hero.cta2": { ru: "Наши услуги", en: "Our services", pl: "Nasze usługi" },
  "hero.stat1": { ru: "постоянных клиентов", en: "regular clients", pl: "stałych klientów" },
  "hero.stat2": { ru: "лет опыта", en: "years of experience", pl: "lat doświadczenia" },
  "hero.stat3": { ru: "онлайн", en: "online", pl: "online" },

  // Services
  "services.title": { ru: "Наши услуги", en: "Our Services", pl: "Nasze usługi" },
  "services.desc": {
    ru: "Полный спектр бухгалтерских услуг для вашего бизнеса в Польше",
    en: "Full range of accounting services for your business in Poland",
    pl: "Pełen zakres usług księgowych dla Twojego biznesu w Polsce",
  },
  "services.s1.title": { ru: "Бухгалтерия JDG", en: "JDG Accounting", pl: "Księgowość JDG" },
  "services.s1.desc": {
    ru: "Полное ведение бухгалтерии для индивидуальных предпринимателей. Книга доходов и расходов, stawka ryczałtowa.",
    en: "Full accounting for sole proprietors. Revenue and expense ledger, lump-sum tax rate.",
    pl: "Pełna obsługa księgowa dla jednoosobowych działalności. KPiR, ryczałt ewidencjonowany.",
  },
  "services.s2.title": { ru: "Бухгалтерия sp. z o.o.", en: "Sp. z o.o. Accounting", pl: "Księgowość sp. z o.o." },
  "services.s2.desc": {
    ru: "Полный бухгалтерский учёт для sp. z o.o., включая CIT, VAT и годовую финансовую отчётность.",
    en: "Full accounting for limited companies, including CIT, VAT and annual financial statements.",
    pl: "Pełna księgowość dla spółek z o.o., w tym CIT, VAT i roczne sprawozdania finansowe.",
  },
  "services.s3.title": { ru: "Кадры и зарплаты", en: "Payroll & HR", pl: "Kadry i płace" },
  "services.s3.desc": {
    ru: "Kadry i płace — расчёт зарплат, ZUS, трудовые договоры, umowy zlecenie и o dzieło.",
    en: "Payroll calculation, ZUS contributions, employment contracts, civil contracts.",
    pl: "Naliczanie wynagrodzeń, ZUS, umowy o pracę, umowy zlecenie i o dzieło.",
  },
  "services.s4.title": { ru: "Регистрация бизнеса", en: "Business Registration", pl: "Rejestracja firmy" },
  "services.s4.desc": {
    ru: "Помощь в регистрации JDG и sp. z o.o. — от выбора формы до получения NIP и REGON.",
    en: "Help with JDG and sp. z o.o. registration — from choosing a form to obtaining NIP and REGON.",
    pl: "Pomoc w rejestracji JDG i sp. z o.o. — od wyboru formy po uzyskanie NIP i REGON.",
  },
  "services.s5.title": { ru: "Консультации", en: "Consultations", pl: "Konsultacje" },
  "services.s5.desc": {
    ru: "Налоговые, юридические и управленческие консультации для предпринимателей.",
    en: "Tax, legal and management consultations for entrepreneurs.",
    pl: "Konsultacje podatkowe, prawne i zarządcze dla przedsiębiorców.",
  },

  // Process
  "process.title": { ru: "Как начать", en: "How to Start", pl: "Jak zacząć" },
  "process.desc": {
    ru: "Четыре простых шага к профессиональной бухгалтерии",
    en: "Four simple steps to professional accounting",
    pl: "Cztery proste kroki do profesjonalnej księgowości",
  },
  "process.s1.title": { ru: "Заявка", en: "Request", pl: "Zapytanie" },
  "process.s1.desc": { ru: "Оставьте заявку на сайте или напишите нам в мессенджер", en: "Submit a request on the website or message us", pl: "Wyślij zapytanie na stronie lub napisz do nas" },
  "process.s2.title": { ru: "Консультация", en: "Consultation", pl: "Konsultacja" },
  "process.s2.desc": { ru: "Обсуждаем ваши потребности и подбираем оптимальный пакет", en: "We discuss your needs and select the best package", pl: "Omawiamy Twoje potrzeby i dobieramy optymalny pakiet" },
  "process.s3.title": { ru: "Договор", en: "Contract", pl: "Umowa" },
  "process.s3.desc": { ru: "Подписываем договор и оформляем доверенности", en: "We sign the contract and prepare authorizations", pl: "Podpisujemy umowę i przygotowujemy pełnomocnictwa" },
  "process.s4.title": { ru: "Работа", en: "Work", pl: "Praca" },
  "process.s4.desc": { ru: "Начинаем бухгалтерское обслуживание вашего бизнеса", en: "We start accounting services for your business", pl: "Rozpoczynamy obsługę księgową Twojej firmy" },

  // Pricing
  "pricing.title": { ru: "Цены", en: "Pricing", pl: "Cennik" },
  "pricing.desc": {
    ru: "Прозрачное ценообразование. Стоимость зависит от количества документов и сложности операций.",
    en: "Transparent pricing. Cost depends on the number of documents and complexity of operations.",
    pl: "Przejrzyste ceny. Koszt zależy od ilości dokumentów i złożoności operacji.",
  },
  "pricing.popular": { ru: "Популярный", en: "Popular", pl: "Popularny" },
  "pricing.cta": { ru: "Оставить заявку", en: "Get in touch", pl: "Wyślij zapytanie" },
  "pricing.from": { ru: "от", en: "from", pl: "od" },
  "pricing.p1.name": { ru: "JDG Базовый", en: "JDG Basic", pl: "JDG Podstawowy" },
  "pricing.p1.f1": { ru: "Книга доходов и расходов", en: "Revenue & expense ledger", pl: "Książka przychodów i rozchodów" },
  "pricing.p1.f2": { ru: "Декларации ZUS", en: "ZUS declarations", pl: "Deklaracje ZUS" },
  "pricing.p1.f3": { ru: "Ежемесячная отчётность", en: "Monthly reporting", pl: "Miesięczna sprawozdawczość" },
  "pricing.p1.f4": { ru: "Консультации по e-mail", en: "E-mail consultations", pl: "Konsultacje e-mail" },
  "pricing.p2.name": { ru: "JDG + VAT", en: "JDG + VAT", pl: "JDG + VAT" },
  "pricing.p2.f1": { ru: "Всё из пакета Базовый", en: "Everything from Basic", pl: "Wszystko z pakietu Podstawowy" },
  "pricing.p2.f2": { ru: "Регистрация и декларации VAT", en: "VAT registration & declarations", pl: "Rejestracja i deklaracje VAT" },
  "pricing.p2.f3": { ru: "JPK_V7", en: "JPK_V7", pl: "JPK_V7" },
  "pricing.p2.f4": { ru: "Приоритетная поддержка", en: "Priority support", pl: "Priorytetowe wsparcie" },
  "pricing.p3.name": { ru: "Sp. z o.o.", en: "Sp. z o.o.", pl: "Sp. z o.o." },
  "pricing.p3.f1": { ru: "Полная бухгалтерия", en: "Full accounting", pl: "Pełna księgowość" },
  "pricing.p3.f2": { ru: "CIT, VAT, JPK", en: "CIT, VAT, JPK", pl: "CIT, VAT, JPK" },
  "pricing.p3.f3": { ru: "Годовая отчётность", en: "Annual reporting", pl: "Sprawozdania roczne" },
  "pricing.p3.f4": { ru: "Кадры и зарплаты", en: "Payroll & HR", pl: "Kadry i płace" },

  // About
  "about.title": { ru: "Почему выбирают нас", en: "Why Choose Us", pl: "Dlaczego my" },
  "about.desc": {
    ru: "FINBIZ CENTRUM — бухгалтерское бюро для предпринимателей в Польше. Мы специализируемся на обслуживании IT-компаний, строительных предприятий и бизнесов русскоязычного сообщества. Индивидуальный подход, профессиональный сервис и средний ценовой сегмент.",
    en: "FINBIZ CENTRUM is an accounting firm for entrepreneurs in Poland. We specialize in serving IT companies, construction businesses, and the Russian-speaking community. Individual approach, professional service, and competitive pricing.",
    pl: "FINBIZ CENTRUM to biuro rachunkowe dla przedsiębiorców w Polsce. Specjalizujemy się w obsłudze firm IT, budowlanych oraz społeczności rosyjskojęzycznej. Indywidualne podejście, profesjonalna obsługa i konkurencyjne ceny.",
  },
  "about.a1.title": { ru: "Застрахованы", en: "Insured", pl: "Ubezpieczeni" },
  "about.a1.desc": { ru: "Страхование профессиональной ответственности до 50 000 zł", en: "Professional liability insurance up to 50,000 PLN", pl: "Ubezpieczenie OC do 50 000 zł" },
  "about.a2.title": { ru: "Мультиязычность", en: "Multilingual", pl: "Wielojęzyczność" },
  "about.a2.desc": { ru: "Работаем на русском, английском и польском языках", en: "We work in Russian, English and Polish", pl: "Pracujemy po rosyjsku, angielsku i polsku" },
  "about.a3.title": { ru: "С 2009 года", en: "Since 2009", pl: "Od 2009 roku" },
  "about.a3.desc": { ru: "Более 15 лет опыта в бухгалтерии и финансовом учёте", en: "Over 15 years of accounting and financial experience", pl: "Ponad 15 lat doświadczenia w księgowości i rachunkowości" },
  "about.a4.title": { ru: "Онлайн", en: "Online", pl: "Online" },
  "about.a4.desc": { ru: "Работаем удалённо по всей Польше. Документы — в электронном виде", en: "We work remotely across Poland. Documents in electronic form", pl: "Pracujemy zdalnie w całej Polsce. Dokumenty w formie elektronicznej" },
  "about.extra": { ru: "Дополнительные услуги", en: "Additional Services", pl: "Dodatkowe usługi" },
  "about.e1": { ru: "Юридическая поддержка бизнеса", en: "Business legal support", pl: "Wsparcie prawne dla biznesu" },
  "about.e2": { ru: "Помощь с легализацией в Польше", en: "Help with legalization in Poland", pl: "Pomoc w legalizacji w Polsce" },
  "about.e3": { ru: "Управленческие консультации", en: "Management consulting", pl: "Konsultacje zarządcze" },
  "about.e4": { ru: "Обучение предпринимателей", en: "Entrepreneur training", pl: "Szkolenia dla przedsiębiorców" },
  "about.e5": { ru: "Бухгалтерия для фондов и организаций", en: "Accounting for funds & organizations", pl: "Księgowość dla fundacji i organizacji" },

  // Founder
  "founder.role": { ru: "Основатель и руководитель FINBIZ CENTRUM", en: "Founder & CEO of FINBIZ CENTRUM", pl: "Założycielka i prezes FINBIZ CENTRUM" },
  "founder.p1": {
    ru: "Профессиональный бухгалтер с опытом более <strong>15 лет</strong>. Начала карьеру в 2009 году в Беларуси, где прошла путь от бухгалтера до руководителя собственного бухгалтерского бюро.",
    en: "Professional accountant with over <strong>15 years</strong> of experience. Started her career in 2009 in Belarus, growing from an accountant to the head of her own accounting firm.",
    pl: "Profesjonalna księgowa z ponad <strong>15-letnim</strong> doświadczeniem. Karierę rozpoczęła w 2009 roku na Białorusi, awansując od księgowej do szefa własnego biura rachunkowego.",
  },
  "founder.p2": {
    ru: "В Польше с 2023 года. Основала FINBIZ CENTRUM с миссией создать надёжный финансовый фундамент для бизнесов предпринимателей-эмигрантов. Специализируется на IT-секторе и строительных компаниях.",
    en: "In Poland since 2023. Founded FINBIZ CENTRUM with a mission to build a solid financial foundation for immigrant entrepreneurs. Specializes in IT and construction sectors.",
    pl: "W Polsce od 2023 roku. Założyła FINBIZ CENTRUM z misją budowania solidnych fundamentów finansowych dla przedsiębiorców-emigrantów. Specjalizuje się w sektorze IT i budownictwie.",
  },
  "founder.p3": {
    ru: "Профильное экономическое образование, сертификат СКВП. Лично курирует ключевых клиентов и выстраивает долгосрочные партнёрские отношения, основанные на доверии и прозрачности.",
    en: "Specialized economic education, SKVP certificate. Personally oversees key clients and builds long-term partnerships based on trust and transparency.",
    pl: "Wykształcenie ekonomiczne, certyfikat SKVP. Osobiście nadzoruje kluczowych klientów i buduje długoterminowe relacje oparte na zaufaniu i przejrzystości.",
  },
  "founder.b1": { ru: "15+ лет опыта", en: "15+ years experience", pl: "15+ lat doświadczenia" },
  "founder.b2": { ru: "50+ клиентов", en: "50+ clients", pl: "50+ klientów" },
  "founder.b3": { ru: "Экономическое образование", en: "Economic education", pl: "Wykształcenie ekonomiczne" },

  // Contact
  "contact.title": { ru: "Связаться с нами", en: "Contact Us", pl: "Skontaktuj się" },
  "contact.desc": { ru: "Оставьте заявку и мы свяжемся с вами в ближайшее время", en: "Leave a request and we'll contact you shortly", pl: "Zostaw zapytanie, a skontaktujemy się wkrótce" },
  "contact.name": { ru: "Имя", en: "Name", pl: "Imię" },
  "contact.name.ph": { ru: "Ваше имя", en: "Your name", pl: "Twoje imię" },
  "contact.phone": { ru: "Телефон", en: "Phone", pl: "Telefon" },
  "contact.email": { ru: "Email", en: "Email", pl: "Email" },
  "contact.type": { ru: "Тип бизнеса", en: "Business type", pl: "Typ działalności" },
  "contact.type.jdg": { ru: "JDG", en: "JDG", pl: "JDG" },
  "contact.type.sp": { ru: "Sp. z o.o.", en: "Sp. z o.o.", pl: "Sp. z o.o." },
  "contact.type.plan": { ru: "Планирую открыть", en: "Planning to open", pl: "Planuję otworzyć" },
  "contact.type.other": { ru: "Другое", en: "Other", pl: "Inne" },
  "contact.message": { ru: "Сообщение", en: "Message", pl: "Wiadomość" },
  "contact.message.ph": { ru: "Опишите ваш запрос...", en: "Describe your request...", pl: "Opisz swoje zapytanie..." },
  "contact.submit": { ru: "Отправить заявку", en: "Send request", pl: "Wyślij zapytanie" },
  "contact.sent.title": { ru: "Заявка отправлена!", en: "Request sent!", pl: "Zapytanie wysłane!" },
  "contact.sent.desc": { ru: "Мы свяжемся с вами в ближайшее время", en: "We'll contact you shortly", pl: "Skontaktujemy się wkrótce" },
  "contact.address": { ru: "Адрес", en: "Address", pl: "Adres" },
  "contact.hours": { ru: "Часы работы", en: "Working hours", pl: "Godziny pracy" },
  "contact.hours.val": { ru: "Пн — Пт: 10:00 — 18:00", en: "Mon — Fri: 10:00 — 18:00", pl: "Pon — Pt: 10:00 — 18:00" },
  "contact.call": { ru: "Позвонить", en: "Call us", pl: "Zadzwoń" },

  // Footer
  "footer.desc": {
    ru: "Профессиональное бухгалтерское обслуживание для бизнеса в Польше",
    en: "Professional accounting services for businesses in Poland",
    pl: "Profesjonalne usługi księgowe dla biznesu w Polsce",
  },
  "footer.nav": { ru: "Навигация", en: "Navigation", pl: "Nawigacja" },
  "footer.legal": { ru: "Юридическая информация", en: "Legal Information", pl: "Informacje prawne" },
  "footer.rights": { ru: "Все права защищены.", en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },

  // FAQ
  "faq.title": { ru: "Часто задаваемые вопросы", en: "Frequently Asked Questions", pl: "Najczęściej zadawane pytania" },
  "faq.desc": { ru: "Ответы на популярные вопросы предпринимателей", en: "Answers to common questions from entrepreneurs", pl: "Odpowiedzi na popularne pytania przedsiębiorców" },

  // Calculator
  "calc.title": { ru: "Калькулятор налогов", en: "Tax Calculator", pl: "Kalkulator podatków" },
  "calc.desc": { ru: "Сравните рычалт и огульне для JDG в Польше", en: "Compare ryczałt and ogólne for JDG in Poland", pl: "Porównaj ryczałt i ogólne dla JDG w Polsce" },
  "calc.income": { ru: "Месячный доход (brutto)", en: "Monthly income (gross)", pl: "Miesięczny przychód (brutto)" },
  "calc.annual": { ru: "Годовой доход", en: "Annual income", pl: "Przychód roczny" },
  "calc.recommendation": { ru: "Рекомендация", en: "Recommendation", pl: "Rekomendacja" },
  "calc.savings": { ru: "Экономия", en: "Savings", pl: "Oszczędność" },
  "calc.net.year": { ru: "чистыми/год", en: "net/year", pl: "netto/rok" },
  "calc.better": { ru: "Лучше", en: "Better", pl: "Lepiej" },
  "calc.ryczalt": { ru: "Рычалт 3%", en: "Ryczałt 3%", pl: "Ryczałt 3%" },
  "calc.ogolne": { ru: "Огульне 12%", en: "Ogólne 12%", pl: "Ogólne 12%" },
  "calc.ryczalt.desc": { ru: "Фиксированная ставка от дохода", en: "Fixed rate on revenue", pl: "Stała stawka od przychodu" },
  "calc.ogolne.desc": { ru: "Прогрессивная шкала PIT", en: "Progressive PIT scale", pl: "Progresywna skala PIT" },
  "calc.tax": { ru: "Налог", en: "Tax", pl: "Podatek" },
  "calc.zus": { ru: "ZUS", en: "ZUS", pl: "ZUS" },
  "calc.health": { ru: "Здравоохранение", en: "Health insurance", pl: "Składka zdrowotna" },
  "calc.total.deductions": { ru: "Всего отчислений", en: "Total deductions", pl: "Łączne odliczenia" },
  "calc.net.monthly": { ru: "Чистыми в месяц", en: "Net monthly", pl: "Netto miesięcznie" },
  "calc.net.annual": { ru: "Чистыми в год", en: "Net annual", pl: "Netto rocznie" },
  "calc.disclaimer": {
    ru: "* Расчёты приблизительные для JDG. Ульга на старт — 6 мес, преф. ZUS — 24 мес. Без хоробовей.",
    en: "* Calculations are approximate for JDG. Start-up relief — 6 months, preferential ZUS — 24 months. Without sickness insurance.",
    pl: "* Obliczenia przybliżone dla JDG. Ulga na start — 6 mies., preferencyjny ZUS — 24 mies. Bez chorobowego.",
  },
};

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("pl");

  const translate = (key: string): string => {
    return t[key]?.[lang] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
