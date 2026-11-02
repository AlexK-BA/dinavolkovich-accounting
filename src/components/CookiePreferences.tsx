import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; version: 1; updatedAt: string };
const KEY = "finbiz-cookie-consent-v1";
const copy = {
  pl: { title: "Ustawienia prywatności", intro: "Niezbędne funkcje strony działają bez dodatkowej zgody. Analityka i marketing są opcjonalne; obecnie nie uruchamiamy ich w tej wersji testowej.", necessary: "Niezbędne (zawsze aktywne)", analytics: "Analityka", marketing: "Marketing", accept: "Akceptuj wszystkie", reject: "Odrzuć opcjonalne", customize: "Dostosuj", save: "Zapisz wybór", settings: "Ustawienia cookies", close: "Zamknij", draft: "Informacje o przetwarzaniu danych i dostawcach wymagają zatwierdzenia przed publikacją." },
  ru: { title: "Настройки приватности", intro: "Необходимые функции сайта работают без дополнительного согласия. Аналитика и маркетинг необязательны; в этой тестовой версии они пока не запускаются.", necessary: "Необходимые (всегда включены)", analytics: "Аналитика", marketing: "Маркетинг", accept: "Принять все", reject: "Отклонить необязательные", customize: "Настроить", save: "Сохранить выбор", settings: "Настройки cookies", close: "Закрыть", draft: "Информация об обработке данных и поставщиках требует согласования до публикации." },
  en: { title: "Privacy preferences", intro: "Essential website features work without additional consent. Analytics and marketing are optional and are not enabled in this preview.", necessary: "Essential (always active)", analytics: "Analytics", marketing: "Marketing", accept: "Accept all", reject: "Reject optional", customize: "Customize", save: "Save preferences", settings: "Cookie settings", close: "Close", draft: "Data processing and vendor details require approval before publication." },
} as const;

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const value = parsed as Partial<Consent>;
    if (value.version !== 1 || value.necessary !== true || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean" || typeof value.updatedAt !== "string") return null;
    return value as Consent;
  } catch { return null; }
}

export default function CookiePreferences() {
  const { lang } = useI18n();
  const t = copy[lang];
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    const stored = loadConsent();
    setConsent(stored);
    setAnalytics(stored?.analytics ?? false);
    setMarketing(stored?.marketing ?? false);
    setOpen(!stored);
    setReady(true);
  }, []);
  const save = (a: boolean, m: boolean) => {
    const next: Consent = { necessary: true, analytics: a, marketing: m, version: 1, updatedAt: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* preference remains in memory */ }
    setConsent(next);
    setAnalytics(a);
    setMarketing(m);
    setOpen(false);
    setCustom(false);
    window.dispatchEvent(new CustomEvent("finbiz:consent-updated", { detail: next }));
  };
  if (!ready) return null;
  return <>
    <button type="button" onClick={() => { setOpen(true); setCustom(true); }} className="fixed bottom-3 left-3 z-40 rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t.settings}</button>
    {open && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-3 sm:items-center" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="cookie-title" className="w-full max-w-xl rounded-xl border border-border bg-background p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-3"><h2 id="cookie-title" className="text-xl font-bold">{t.title}</h2>{consent && <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-sm underline">{t.close}</button>}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.intro}</p>
        {custom && <div className="mt-5 space-y-4 rounded-lg border border-border p-4">
          <label className="flex items-center justify-between gap-3 text-sm"><span>{t.necessary}</span><input type="checkbox" checked disabled aria-label={t.necessary}/></label>
          <label className="flex items-center justify-between gap-3 text-sm"><span>{t.analytics}</span><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)}/></label>
          <label className="flex items-center justify-between gap-3 text-sm"><span>{t.marketing}</span><input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)}/></label>
        </div>}
        <p className="mt-4 text-xs text-muted-foreground">{t.draft}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => save(false, false)} className="rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary">{t.reject}</button>
          <button type="button" onClick={() => save(true, true)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">{t.accept}</button>
          {custom ? <button type="button" onClick={() => save(analytics, marketing)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold">{t.save}</button> : <button type="button" onClick={() => setCustom(true)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold">{t.customize}</button>}
        </div>
      </section>
    </div>}
  </>;
}
