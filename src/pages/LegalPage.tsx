import { Link } from "react-router-dom";
type Kind = "privacy" | "cookies" | "terms";
const titles: Record<Kind,string> = {privacy:"Polityka prywatności (RODO)",cookies:"Polityka cookies",terms:"Regulamin korzystania ze strony i kalkulatora"};
const sections: Record<Kind,{title:string;paragraphs:string[]}[]> = {
 privacy:[
 {title:"1. Administrator danych",paragraphs:["Administratorem danych osobowych przekazywanych za pośrednictwem serwisu jest FINBIZ CENTRUM SP. Z O.O., NIP 5253079744, KRS 0001224296, REGON 544012170, Chmielna 2/31, 00-020 Warszawa. Kontakt: finbiz.office@gmail.com. [DO POTWIERDZENIA: aktualność danych i właściwy kontakt ds. ochrony danych]."]},
 {title:"2. Zakres i cele przetwarzania",paragraphs:["W przypadku kontaktu z biurem mogą być przetwarzane dane podane dobrowolnie: imię, numer telefonu, adres e-mail, rodzaj działalności i treść wiadomości. Celem jest obsługa zapytania, kontakt i ewentualne podjęcie działań przed zawarciem umowy.","[DO POTWIERDZENIA PRZED PUBLIKACJĄ: czy formularz rzeczywiście wysyła dane, jakim kanałem, do jakiego dostawcy i czy dane trafiają do CRM; osobno ustalić cele analityki i marketingu]."]},
 {title:"3. Podstawy prawne",paragraphs:["W zależności od celu przetwarzania podstawą może być art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy), lit. f (uzasadniony interes w obsłudze korespondencji) lub lit. a (zgoda, gdy jest wymagana). Konkretne podstawy wymagają potwierdzenia dla rzeczywiście uruchomionych funkcji."]},
 {title:"4. Odbiorcy, transfery i przechowywanie",paragraphs:["Dostęp do danych mogą uzyskać upoważnione osoby i dostawcy usług technicznych, hostingowych oraz komunikacyjnych, wyłącznie w odpowiednim zakresie. [DO UZUPEŁNIENIA: lista kategorii dostawców, lokalizacje, ewentualne transfery poza EOG, okresy retencji lub kryteria ich ustalania]."]},
 {title:"5. Prawa osób",paragraphs:["Osobie, której dane dotyczą, przysługuje — w granicach RODO — prawo dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia danych, sprzeciwu oraz cofnięcia zgody, jeśli przetwarzanie opiera się na zgodzie. Można także złożyć skargę do Prezesa UODO. Kontakt w sprawach danych: finbiz.office@gmail.com."]},
 {title:"6. Kalkulator podatkowy",paragraphs:["Dane wprowadzane do kalkulatora służą wyłącznie do przygotowania orientacyjnej symulacji. [DO POTWIERDZENIA TECHNICZNEGO: czy są przetwarzane lokalnie w przeglądarce i czy nie są przesyłane lub rejestrowane przez narzędzia analityczne]. Kalkulator nie stanowi indywidualnej porady podatkowej."]},
 {title:"7. Aktualizacja dokumentu",paragraphs:["Projekt wymaga weryfikacji przez administratora i dostosowania do faktycznej konfiguracji serwisu przed publikacją jako obowiązująca polityka."]}
 ],
 cookies:[
 {title:"1. Czym są cookies",paragraphs:["Pliki cookies to dane zapisywane na urządzeniu użytkownika przez przeglądarkę. Mogą wspierać działanie serwisu, zapamiętywanie ustawień lub pomiar ruchu."]},
 {title:"2. Kategorie",paragraphs:["Niezbędne pliki cookies mogą być wykorzystywane do zapewnienia działania strony. Cookies analityczne, funkcjonalne i marketingowe wymagają osobnej identyfikacji oraz — gdy jest to wymagane — uprzedniej zgody.","[DO UZUPEŁNIENIA: audyt rzeczywiście używanych cookies, dostawców, celów, czasu życia i dostępu podmiotów trzecich]."]},
 {title:"3. Zarządzanie zgodą",paragraphs:["Użytkownik może zmieniać ustawienia cookies w przeglądarce. Jeżeli serwis korzysta z opcjonalnych cookies, należy wdrożyć mechanizm wyrażenia, odmowy i wycofania zgody przed ich uruchomieniem. [DO POTWIERDZENIA: czy wymagany jest baner CMP]."]},
 {title:"4. Powiązane informacje",paragraphs:["Więcej o danych osobowych znajduje się w Polityce prywatności. Dokument wymaga uzupełnienia po audycie technicznym."]}
 ],
 terms:[
 {title:"1. Informacje o serwisie",paragraphs:["Serwis finbizcentrum.pl jest stroną informacyjną FINBIZ CENTRUM SP. Z O.O., Chmielna 2/31, 00-020 Warszawa, NIP 5253079744, KRS 0001224296. Kontakt: finbiz.office@gmail.com. [DO POTWIERDZENIA: dane i zakres usług świadczonych drogą elektroniczną]."]},
 {title:"2. Charakter informacji",paragraphs:["Materiały na stronie mają charakter ogólny i informacyjny. Nie stanowią indywidualnej porady podatkowej, prawnej ani księgowej i nie zastępują konsultacji z profesjonalnym księgowym. Warunki odpłatnej obsługi księgowej są ustalane odrębnie."]},
 {title:"3. Kalkulator podatkowy — istotne ograniczenia",paragraphs:["Kalkulator służy wyłącznie do przedstawienia przybliżonych szacunków na podstawie danych wpisanych przez użytkownika i dostępnych, uproszczonych założeń. Wyniki mogą różnić się od rzeczywistych zobowiązań, w szczególności ze względu na formę opodatkowania, kwalifikację działalności, przychody, koszty, składki ZUS i zdrowotne, ulgi, inne źródła dochodów, okres prowadzenia działalności oraz zmiany przepisów.","Wyniki nie są wiążącą kalkulacją, gwarancją oszczędności ani rekomendacją wyboru formy opodatkowania. Ostateczne wyliczenie oraz ocena sytuacji konkretnej osoby wymagają indywidualnej analizy przez profesjonalnego księgowego. Użytkownik nie powinien podejmować decyzji podatkowych wyłącznie na podstawie kalkulatora."]},
 {title:"4. Korzystanie z serwisu",paragraphs:["Użytkownik powinien korzystać z serwisu zgodnie z prawem i jego przeznaczeniem. Zewnętrzne systemy, w tym panel klienta oraz wFirma, działają na warunkach swoich operatorów; przejście do nich może oznaczać opuszczenie serwisu FINBIZ CENTRUM."]},
 {title:"5. Kontakt i reklamacje dotyczące serwisu",paragraphs:["Uwagi dotyczące działania strony można zgłaszać na finbiz.office@gmail.com. [DO UZUPEŁNIENIA: wymagane zasady i terminy obsługi zgłoszeń, jeśli serwis świadczy usługi elektroniczne objęte regulaminem]."]},
 {title:"6. Płatności i zawieranie umów",paragraphs:["Na obecnym etapie strona nie powinna sugerować możliwości zawarcia umowy ani dokonania płatności online bez wdrożonego i zweryfikowanego procesu. [DO UZUPEŁNIENIA przed uruchomieniem płatności: metody, operator, waluta, warunki, fakturowanie, zwroty i reklamacje]."]},
 {title:"7. Postanowienia końcowe",paragraphs:["Niniejszy projekt wymaga zatwierdzenia i dostosowania do rzeczywistych funkcji strony oraz przepisów mających zastosowanie do oferowanych usług."]}
 ]
};
const LegalPage = ({kind}:{kind:Kind}) => <main className="min-h-screen bg-background text-foreground px-5 py-10 md:py-16">
 <div className="max-w-3xl mx-auto">
 <Link to="/" className="text-sm text-primary underline underline-offset-4">← FINBIZ CENTRUM</Link>
 <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">{titles[kind]}</h1>
 <div role="note" className="rounded-lg border border-accent bg-card p-4 mb-7 text-sm"><strong>Projekt do weryfikacji przed publikacją.</strong> Fragmenty oznaczone [DO POTWIERDZENIA] lub [DO UZUPEŁNIENIA] wymagają sprawdzenia przez administratora strony. Ten tekst nie jest jeszcze zatwierdzonym dokumentem.</div>
 <article className="rounded-xl border border-border bg-card p-5 md:p-8 space-y-7">
 {sections[kind].map(section => <section key={section.title}><h2 className="font-semibold text-xl mb-3">{section.title}</h2><div className="space-y-3">{section.paragraphs.map((p,i)=><p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">{p}</p>)}</div></section>)}
 </article>
 <nav className="flex flex-wrap gap-4 mt-7 text-sm text-primary">{(Object.keys(titles) as Kind[]).filter(k=>k!==kind).map(k=><Link key={k} className="underline" to={k==="privacy"?"/polityka-prywatnosci":k==="cookies"?"/polityka-cookies":"/regulamin"}>{titles[k]}</Link>)}</nav>
 </div></main>;
export default LegalPage;
