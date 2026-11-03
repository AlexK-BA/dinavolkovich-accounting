import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { previewContactConfig } from "@/lib/previewContactConfig";
const translations = {
 pl: ["Zapytaj o współpracę","Imię","Telefon","Email","Rodzaj działalności","Wiadomość","Zapoznałem/am się z","polityką prywatności","Wyślij zapytanie","Wysyłanie…","Wysłano zgłoszenie do usługi pocztowej.","Nie udało się wysłać. Napisz na grossbuh23@gmail.com"],
 ru: ["Обсудить сотрудничество","Имя","Телефон","Email","Тип деятельности","Сообщение","Я ознакомился(-ась) с","политикой конфиденциальности","Отправить заявку","Отправка…","Почтовый сервис принял заявку.","Ошибка отправки. Напишите на grossbuh23@gmail.com"],
 en: ["Discuss cooperation","Name","Phone","Email","Business type","Message","I have read the","privacy policy","Send enquiry","Sending…","Email provider accepted your enquiry.","Sending failed. Email grossbuh23@gmail.com"]
} as const;
export default function PreviewContactForm() {
 const {lang}=useI18n();const t=translations[lang];const [busy,setBusy]=useState(false);const [status,setStatus]=useState<"idle"|"success"|"error">("idle");
 async function submit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault();if(busy)return;
  const form=e.currentTarget;const d=new FormData(form);
  const payload={name:String(d.get("name")||""),phone:String(d.get("phone")||""),email:String(d.get("email")||""),type:String(d.get("type")||""),message:String(d.get("message")||""),website:String(d.get("website")||""),privacyAccepted:d.get("privacy")==="on"};
  setBusy(true);setStatus("idle");
  try { const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});if(!r.ok)throw new Error("delivery failed");setStatus("success");form.reset(); }
  catch {setStatus("error");}finally {setBusy(false);}
 }
 const input="block w-full rounded-md border border-border bg-background px-4 py-3 text-foreground";
 return <section id="contact" className="section-padding bg-card"><div className="mx-auto max-w-3xl"><h2 className="mb-6 text-3xl font-bold">{t[0]}</h2><form onSubmit={submit} className="space-y-4">
  <label className="block text-sm">{t[1]}<input className={input} name="name" maxLength={120} required autoComplete="name"/></label>
  <label className="block text-sm">{t[2]}<input className={input} name="phone" type="tel" maxLength={40} minLength={6} required autoComplete="tel"/></label>
  <label className="block text-sm">{t[3]}<input className={input} name="email" type="email" maxLength={254} autoComplete="email"/></label>
  <label className="block text-sm">{t[4]}<select className={input} name="type"><option>JDG</option><option>Sp. z o.o.</option><option>Other</option></select></label>
  <label className="block text-sm">{t[5]}<textarea className={input} name="message" maxLength={2500} rows={4}/></label>
  <label className="sr-only">Website<input name="website" type="text" tabIndex={-1} autoComplete="off"/></label>
  <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="privacy" required className="mt-1"/><span>{t[6]} <a className="underline" href="/design-preview/polityka-prywatnosci" target="_blank" rel="noopener noreferrer">{t[7]}</a>.</span></label>
  <button disabled={busy} className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60" type="submit">{busy?t[9]:t[8]}</button>
  <div role="status" aria-live="polite">{status==="success"?<p className="text-sm text-primary">{t[10]}</p>:status==="error"?<p className="text-sm text-destructive">{t[11].replace("grossbuh23@gmail.com",previewContactConfig.email)}</p>:null}</div>
 </form></div></section>;
}
