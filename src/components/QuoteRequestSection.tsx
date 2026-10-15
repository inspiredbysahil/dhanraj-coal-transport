import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { site, whatsappUrl } from "@/data/site";
import type { Rate } from "@/data/rates";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  contactEmail, deliveryModes, emptyQuote, fuelCategories, fuelForProduct, gradeOptions, prefillFromRate,
  quantityChips, quoteCopy as c, quoteMailto, quoteSchema, quoteWhatsappMessage, type QuoteData, type QuoteForm, type QuoteKey,
} from "@/data/quote-request";

const selectCls = "mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

function QuoteForm() {
  const [form, setForm] = useState<QuoteForm>(emptyQuote);
  const [errors, setErrors] = useState<Partial<Record<QuoteKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "opened" | "blocked">("idle");
  const [link, setLink] = useState("");

  useEffect(() => {
    const onProduct = (e: Event) => { const fuel = fuelForProduct((e as CustomEvent<string>).detail); if (fuel) setForm((f) => ({ ...f, fuel })); };
    const onRate = (e: Event) => setForm((f) => ({ ...f, ...prefillFromRate((e as CustomEvent<Rate>).detail) }));
    window.addEventListener("select-product", onProduct); window.addEventListener("select-rate", onRate);
    return () => { window.removeEventListener("select-product", onProduct); window.removeEventListener("select-rate", onRate); };
  }, []);

  const set = (k: QuoteKey, v: string) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  function validate(): QuoteData | null {
    const r = quoteSchema.safeParse(form);
    if (r.success) { setErrors({}); return r.data; }
    const n: Partial<Record<QuoteKey, string>> = {};
    r.error.issues.forEach((i) => { const k = i.path[0] as QuoteKey; n[k] ??= i.message; });
    setErrors(n); document.getElementById(`q-${Object.keys(n)[0]}`)?.focus(); return null;
  }

  function sendWhatsapp() {
    const d = validate(); if (!d) return;
    const url = whatsappUrl(quoteWhatsappMessage(d)); setLink(url);
    const w = window.open(url, "_blank"); if (w) w.opener = null;
    setStatus(w ? "opened" : "blocked");
  }
  function sendEmail() {
    if (!contactEmail) return; const d = validate(); if (!d) return;
    toast.success(c.emailToast); window.location.href = quoteMailto(d, contactEmail);
  }

  const err = (k: QuoteKey) => errors[k] && <span id={`q-${k}-err`} role="alert" className="mt-1 block text-xs text-destructive">{errors[k]}</span>;
  const aria = (k: QuoteKey) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `q-${k}-err` : undefined });
  const text = (k: QuoteKey, label: string, o: { req?: boolean; ph?: string; auto?: string; type?: string } = {}) =>
    <label htmlFor={`q-${k}`} className="text-sm font-medium">{label}{o.req && <span aria-hidden="true"> *</span>}
      <Input id={`q-${k}`} className="mt-2" type={o.type ?? "text"} placeholder={o.ph} autoComplete={o.auto} value={form[k]} onChange={(e) => set(k, e.target.value)} {...aria(k)} />{err(k)}</label>;

  return <form className="quote-card grid gap-4 rounded-3xl border border-border bg-card p-5 text-card-foreground md:grid-cols-2 md:p-7" onSubmit={(e) => { e.preventDefault(); sendWhatsapp(); }} noValidate aria-label="Quotation request form">
    <div className="md:col-span-2"><h3 className="text-xl font-semibold">{c.formTitle}</h3><p className="mt-1 text-xs text-muted-foreground">{c.formNote}</p></div>
    {text("name", "Full Name & Designation", { req: true, ph: "Rajesh Sharma - Purchase Manager", auto: "name" })}
    {text("company", "Company / Plant Name", { req: true, auto: "organization" })}
    <label htmlFor="q-phone" className="text-sm font-medium">Mobile / WhatsApp Number<span aria-hidden="true"> *</span>
      <div className="mt-2 flex"><span className="grid place-items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm">+91</span><Input id="q-phone" className="rounded-l-none" type="tel" inputMode="tel" placeholder="98765 43210" autoComplete="tel-national" value={form.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} /></div>{err("phone")}</label>
    {text("email", "Work Email Address (optional)", { type: "email", auto: "email" })}
    <fieldset className="md:col-span-2"><legend className="text-sm font-medium">Fuel Category <span aria-hidden="true">*</span></legend>
      <div id="q-fuel" tabIndex={-1} className="mt-2 flex flex-wrap gap-2">{fuelCategories.map((f) => <button type="button" key={f} aria-pressed={form.fuel === f} onClick={() => set("fuel", f)} className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${form.fuel === f ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-accent"}`}>{f}</button>)}</div>{err("fuel")}</fieldset>
    <label htmlFor="q-grade" className="text-sm font-medium md:col-span-2">Required GCV / Grade & Origin
      <Input id="q-grade" list="q-grade-list" className="mt-2" placeholder="Choose or type, e.g. 5500–6000 GCV" value={form.grade} onChange={(e) => set("grade", e.target.value)} {...aria("grade")} />
      <datalist id="q-grade-list">{gradeOptions.map((g) => <option key={g} value={g} />)}</datalist>{err("grade")}</label>
    <div className="md:col-span-2"><label htmlFor="q-quantity" className="text-sm font-medium">Quantity (MT) <span aria-hidden="true">*</span>
      <Input id="q-quantity" className="mt-2" type="number" inputMode="decimal" min={c.minimumMT} value={form.quantity} onChange={(e) => set("quantity", e.target.value)} {...aria("quantity")} /></label>
      <div className="mt-2 flex flex-wrap gap-2">{quantityChips.map((q) => <button type="button" key={q.value} aria-pressed={form.quantity === q.value} onClick={() => set("quantity", q.value)} className={`rounded-full border px-3 py-1.5 text-xs ${form.quantity === q.value ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-accent"}`}>{q.label}</button>)}</div>{err("quantity")}</div>
    <label htmlFor="q-mode" className="text-sm font-medium">Delivery Mode <span aria-hidden="true">*</span>
      <select id="q-mode" className={selectCls} value={form.mode} onChange={(e) => set("mode", e.target.value)} {...aria("mode")}><option value="">Select mode</option>{deliveryModes.map((m) => <option key={m}>{m}</option>)}</select>{err("mode")}</label>
    {text("location", "Delivery City, State & Pin Code", { req: true, ph: "Raipur, Chhattisgarh 492001", auto: "address-level2" })}
    <label htmlFor="q-remarks" className="text-sm font-medium md:col-span-2">Special Remarks / Payment Terms (optional)
      <Textarea id="q-remarks" className="mt-2 min-h-24" placeholder="Need 0-50mm sizing, low sulfur, or formal GST Proforma Invoice" value={form.remarks} onChange={(e) => set("remarks", e.target.value)} {...aria("remarks")} />{err("remarks")}</label>
    <Button type="submit" size="lg" className="h-auto min-h-12 whitespace-normal md:col-span-2"><MessageCircle />{c.whatsappButton}</Button>
    <div className="md:col-span-2"><Button type="button" variant="outline" size="lg" className="h-auto min-h-11 w-full whitespace-normal" disabled={!contactEmail} onClick={sendEmail}><Mail />{c.emailButton}</Button>
      {!contactEmail && <p className="mt-2 text-center text-xs text-muted-foreground">{c.emailSoon}</p>}</div>
    <p aria-live="polite" className="text-xs text-muted-foreground md:col-span-2">{status === "opened" && c.opened}{status === "blocked" && <>{c.blocked} <a className="underline" href={link} target="_blank" rel="noreferrer">Open WhatsApp manually</a>.</>}</p>
  </form>;
}

export function QuoteRequestSection() {
  const cards = [
    { Icon: Phone, label: "Call the dispatch desk", value: site.primaryPhone, href: site.primaryPhoneHref, badge: c.phoneBadge, ext: false },
    { Icon: MessageCircle, label: c.whatsappLabel, value: site.primaryPhone, href: whatsappUrl(), badge: c.whatsappBadge, ext: true },
    ...(contactEmail ? [{ Icon: Mail, label: c.emailLabel, value: contactEmail, href: `mailto:${contactEmail}`, badge: "Formal tenders & proforma", ext: false }] : []),
  ];
  return <div className="site-shell grid gap-8 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
    <div>
      <p className="font-mono text-xs tracking-widest opacity-70">{c.eyebrow}</p>
      <h2 className="headline mt-4">{c.title}</h2>
      <p className="muted mt-5 max-w-lg text-sm md:text-base">{c.sub}</p>
      <div className="mt-8 grid gap-3">{cards.map(({ Icon, label, value, href, badge, ext }) =>
        <a key={label} href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} className="contact-details flex items-center gap-4 rounded-2xl border p-4 transition-colors hover:border-spark">
          <span className="arrow-dot shrink-0"><Icon /></span>
          <span className="min-w-0"><small className="muted block text-xs">{label}</small><strong className="block text-base font-semibold">{value}</strong><span className="mt-1 inline-block rounded-full bg-inverse-surface px-2.5 py-0.5 text-[11px]">{badge}</span></span></a>)}</div>
      <div className="contact-details mt-6 rounded-2xl border p-5 text-sm">
        <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4" /> Verified business</p>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs"><dt className="muted">Legal name</dt><dd>{site.legalName}</dd><dt className="muted">GSTIN</dt><dd className="font-mono">{site.gstin}</dd><dt className="muted">MOQ</dt><dd>{c.minimumMT} Metric Tons (MT)</dd></dl>
        <p className="mt-4 border-t border-inverse-border pt-3 italic">"{site.motto}"</p>
      </div>
      <p className="muted mt-4 text-xs">{site.secondaryContact}: <a className="underline" href={site.secondaryPhoneHref}>{site.secondaryPhone}</a> · Head office: {site.address} · Branches: {site.branches.join(", ")}</p>
    </div>
    <QuoteForm />
  </div>;
}
