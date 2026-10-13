import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Fuel, Instagram, Linkedin, Mail, MapPin, Menu, MessageCircle, Phone, Quote, Recycle, Search, ShieldCheck, Truck, X, BadgeIndianRupee, Award } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { products } from "@/data/products";
import { faq } from "@/data/faq";
import { home } from "@/data/home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RateTable } from "@/components/RateTable";
import { z } from "zod";

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: .6 } } as const;
const navItems = site.nav.filter(([, id]) => id !== "top" && id !== "network" && id !== "services");

function Pill({ href, children, light, onClick }: { href: string; children: React.ReactNode; light?: boolean; onClick?: () => void }) {
  return <a href={href} onClick={onClick} className={`pill ${light ? "light" : ""}`}>{children}<span className="dot"><ArrowRight /></span></a>;
}

function Label({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }

function Brand() {
  return <a href="#top" className="brand-mark" aria-label="Dhanraj Coal Transport home"><span className="brand-icon"><Fuel /></span><span><strong>DHANRAJ</strong><small>COAL TRANSPORT</small></span></a>;
}

function Nav() {
  const [open, setOpen] = useState(false); const [stuck, setStuck] = useState(false);
  useEffect(() => { const on = () => { const n = window.scrollY > 500; setStuck((p) => p === n ? p : n); }; on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  const links = <>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a href="/pet-coke-price">Pet Coke</a></>;
  return <>
    <header className="top-nav"><div className="site-shell flex h-20 items-center justify-between">
      <Brand />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{links}</nav>
      <div className="flex items-center gap-2"><a href={site.primaryPhoneHref} className="hidden text-xs opacity-80 md:block">{site.primaryPhone}</a><a href="#contact" className="hidden rounded-full bg-card px-4 py-2 text-xs font-semibold text-foreground lg:block">Contact Us</a>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-card text-foreground lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button></div>
    </div>{open && <nav className="mobile-nav lg:hidden" aria-label="Mobile navigation">{links}<Pill href="#contact" onClick={() => setOpen(false)}>Contact Us</Pill></nav>}</header>
    <motion.div initial={false} animate={{ opacity: stuck ? 1 : 0, y: stuck ? 0 : -20 }} style={{ pointerEvents: stuck ? "auto" : "none" }} className="sticky-nav hidden lg:block">
      <div className="flex h-14 items-center justify-between pl-5 pr-2"><Brand /><nav className="flex gap-6 text-sm text-muted-foreground" aria-label="Sticky navigation">{navItems.map(([label, id]) => <a className="hover:text-foreground" key={id} href={`#${id}`}>{label}</a>)}</nav><Pill href="#contact">Get a Quote</Pill></div>
    </motion.div>
  </>;
}

function Hero() {
  const h = home.hero;
  return <section id="top" className="px-0 md:px-4 md:pt-4"><div className="hero-frame md:rounded-3xl">
    <img className="bg" src={h.image} alt="Aerial view of an open-pit coal mine with trucks on the haul road" width={1600} height={960} fetchPriority="high" />
    <Nav />
    <div className="site-shell flex min-h-[min(100svh,860px)] flex-col justify-between pb-8 pt-36 md:pt-44">
      <div><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="headline max-w-3xl !text-[clamp(2.5rem,6vw,4.8rem)]">{h.title[0]}<br />{h.title[1]}</motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="mt-8 flex flex-wrap gap-3"><Pill href="#contact">{h.cta}</Pill><a href="#products" className="glass rounded-full px-5 py-3 text-sm font-semibold">Explore products</a></motion.div></div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><p className="max-w-sm text-sm opacity-85">{h.footnote}</p>{h.badge && <p className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs"><Award className="h-4 w-4 text-lime" />{h.badge}</p>}</div>
    </div>
  </div></section>;
}

function About() {
  const a = home.about; const icons = [Recycle, ShieldCheck, BadgeIndianRupee];
  return <section id="about" className="section-pad"><div className="site-shell">
    <Label>{a.label}</Label>
    <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><motion.h2 {...fade} className="headline">{a.title[0]}<br />{a.title[1]}</motion.h2><Pill href="#products" light>Explore More</Pill></div>
    <div className="mt-14 grid overflow-hidden rounded-2xl border border-border lg:grid-cols-[1fr_1fr_1fr_1.1fr]">
      {a.values.map(([t, d], i) => { const Icon = icons[i] ?? Truck; return <motion.div {...fade} transition={{ duration: .6, delay: i * .1 }} key={t} className="value-card flex flex-col" style={{ paddingTop: `${1.75 + i * 3}rem` }}><Icon className="h-6 w-6" /><h3 className="mt-6 text-base font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p></motion.div>; })}
      <img src={a.image} alt="Excavator loading coal into a truck at a floodlit coal yard" width={768} height={960} loading="lazy" className="h-full max-h-[460px] w-full object-cover" />
    </div>
    <p className="mt-6 text-xs text-muted-foreground">GSTIN {site.gstin} · {site.legalName} · {site.tradeName} · {site.motto}</p>
  </div></section>;
}

function Founder() {
  const q = home.quote;
  return <section className="pb-20 md:pb-28"><div className="site-shell grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[.8fr_1.2fr]">
    <img src={q.image} alt="Portrait of the founder of Dhanraj Coal Transport" width={816} height={816} loading="lazy" className="h-full max-h-[440px] w-full object-cover" />
    <div className="flex flex-col justify-between gap-10 p-7 md:p-12"><div><Quote className="h-8 w-8 text-positive" /><motion.p {...fade} className="mt-6 text-lg leading-8 md:text-xl">{q.text}</motion.p></div>
      <div className="flex items-end justify-between"><div><p className="font-semibold">{q.name}</p><p className="text-sm text-muted-foreground">{q.role}</p></div><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="circle-btn" aria-label="Message us on WhatsApp"><ArrowUpRight /></a></div></div>
  </div></section>;
}

function Products() {
  const p = home.products; const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 310, behavior: "smooth" });
  return <section id="products" className="section-pad border-t border-border"><div className="site-shell">
    <Label>{p.label}</Label>
    <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><motion.h2 {...fade} className="headline">{p.title[0]}<br />{p.title[1]}</motion.h2><p className="max-w-xs text-sm text-muted-foreground">{p.intro}</p></div>
    <div ref={ref} className="scroller mt-12">{products.map((item) => <a key={item.id} href="#contact" onClick={() => window.dispatchEvent(new CustomEvent("select-product", { detail: item.name }))} className="product-card" aria-label={`Enquire about ${item.name}`}>
      <img src={p.images[item.id]} alt={item.name} width={736} height={912} loading="lazy" />
      <span className="status-badge absolute left-4 top-4 z-10">{item.status}</span>
      <div className="meta"><div><p className="text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs opacity-75">GCV {item.gcv} · Ash {item.ash}</p></div><span className="arrow-dot"><ArrowUpRight /></span></div>
    </a>)}</div>
    <div className="mt-6 flex gap-2"><button className="circle-btn" onClick={() => scroll(-1)} aria-label="Previous products"><ChevronLeft /></button><button className="circle-btn" onClick={() => scroll(1)} aria-label="Next products"><ChevronRight /></button></div>
  </div></section>;
}

function Impact() {
  const m = home.impact;
  return <section className="md:px-4"><div className="photo-band md:rounded-3xl">
    <img className="bg" src={m.image} alt="Freight train carrying coal wagons through green hills" width={1600} height={912} loading="lazy" />
    <div className="site-shell grid gap-10 py-16 md:py-24 lg:grid-cols-[1.2fr_.8fr]">
      <div className="flex flex-col justify-between gap-10"><div><p className="eyebrow !text-[oklch(.97_0_0/.75)]">{m.label}</p><h2 className="headline mt-5">{m.title[0]}<br />{m.title[1]}</h2><p className="mt-5 max-w-sm text-sm opacity-85">{m.intro}</p></div><Pill href="#rates">See Rates</Pill></div>
      <div className="grid gap-3">{m.stats.map(([v, l], i) => <motion.div {...fade} transition={{ duration: .5, delay: i * .08 }} key={l} className="glass rounded-xl p-5"><p className="text-4xl font-medium tracking-tight">{v}<span className="text-lime">+</span></p><p className="mt-1 text-xs opacity-75">{l}</p></motion.div>)}</div>
    </div>
  </div></section>;
}

function Rates() {
  return <section id="rates" className="section-pad"><div className="site-shell"><Label>Rate chart</Label><div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><motion.h2 {...fade} className="headline">Transparent,<br />GCV-wise Pricing.</motion.h2><p className="max-w-xs text-sm text-muted-foreground">Indicative mine, port and vessel-wise rates in ₹ per ton. Final price is confirmed only in a written quotation.</p></div><div className="mt-12"><RateTable /></div></div></section>;
}

function Updates() {
  const u = home.updates; const [f, setF] = useState<string>("All");
  const items = u.items.filter((i) => f === "All" || i.tag === f);
  return <section className="section-pad border-t border-border"><div className="site-shell">
    <Label>{u.label}</Label>
    <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><h2 className="headline">{u.title}</h2><div className="flex gap-1 rounded-full border border-border bg-card p-1">{u.filters.map((x) => <button key={x} className="chip-btn" aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>)}</div></div>
    <div className="mt-12 grid gap-6 md:grid-cols-3">{items.map((i) => <motion.article {...fade} key={i.title} className="article-card"><div className="relative overflow-hidden rounded-xl"><img src={i.image} alt={i.title} width={976} height={688} loading="lazy" /><span className="absolute right-3 top-3 rounded-full bg-card px-3 py-1 text-xs font-semibold">{i.tag}</span></div><p className="mt-4 text-xs font-semibold text-positive">{i.date}</p><h3 className="mt-2 font-semibold">{i.title}</h3><p className="mt-1 text-sm text-muted-foreground">{i.text}</p></motion.article>)}</div>
    <div className="mt-10 flex flex-wrap gap-2">{site.industries.map((x) => <span key={x} className="rounded-full border border-border bg-card px-4 py-2 text-sm">{x}</span>)}</div>
  </div></section>;
}

function FAQSection() {
  const [search, setSearch] = useState(""); const items = faq.filter(([q, a]) => `${q} ${a}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="section-pad border-t border-border"><div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><Label>FAQ</Label><h2 className="headline mt-5">Answers Before<br />You Call.</h2><div className="relative mt-8"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-full bg-card pl-9" placeholder="Search questions…" aria-label="Search frequently asked questions" /></div></div>
    <Accordion type="single" collapsible>{items.map(([q, a], i) => <AccordionItem value={`item-${i}`} key={q}><AccordionTrigger className="text-base">{q}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>;
}

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  company: z.string().trim().max(100, "Company name is too long"),
  phone: z.string().trim().transform((v) => v.replace(/[\s-]/g, "")).refine((v) => /^(\+91|0)?[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().max(120).refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Enter a valid email address, or leave it empty"),
  product: z.string(),
  quantity: z.string().trim().max(40, "Keep quantity short, e.g. 500 tons"),
  city: z.string().trim().max(80, "City name is too long"),
  requirement: z.string().trim().max(800, "Please keep this under 800 characters"),
});
type EnquiryKey = keyof z.infer<typeof enquirySchema>;
const emptyForm: Record<EnquiryKey, string> = { name: "", company: "", phone: "", email: "", product: "", quantity: "", city: "", requirement: "" };

function EnquiryForm() {
  const [form, setForm] = useState(emptyForm); const [errors, setErrors] = useState<Partial<Record<EnquiryKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "busy" | "opened" | "blocked">("idle"); const [link, setLink] = useState("");
  useEffect(() => { const h = (e: Event) => { const p = (e as CustomEvent<string>).detail; setForm((v) => ({ ...v, product: products.some((x) => x.name === p) ? p : v.product, requirement: v.requirement || `Enquiry for ${p}` })); }; window.addEventListener("select-product", h); return () => window.removeEventListener("select-product", h); }, []);
  const set = (k: EnquiryKey, v: string) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (status === "busy") return;
    const r = enquirySchema.safeParse(form);
    if (!r.success) { const n: Partial<Record<EnquiryKey, string>> = {}; r.error.issues.forEach((i) => { const k = i.path[0] as EnquiryKey; n[k] ??= i.message; }); setErrors(n); const first = Object.keys(n)[0]; document.getElementById(`enq-${first}`)?.focus(); return; }
    setErrors({}); const d = r.data;
    const lines = [["Name", d.name], ["Company", d.company], ["Phone", d.phone], ["Email", d.email], ["Product", d.product], ["Quantity", d.quantity], ["Delivery city", d.city], ["Requirement", d.requirement]].filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`);
    const url = whatsappUrl(`Hello DHANRAJ COAL TRANSPORT,\n\n${lines.join("\n")}`); setLink(url); setStatus("busy");
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(w === null ? "blocked" : "opened");
    setTimeout(() => setStatus((s) => (s === "busy" ? "idle" : s)), 2500);
  }
  const field = (k: EnquiryKey, label: string, opts: { required?: boolean; type?: string; placeholder?: string; auto?: string } = {}) => <label htmlFor={`enq-${k}`} className="muted text-sm">{label}{opts.required && <span aria-hidden="true"> *</span>}
    <Input id={`enq-${k}`} className="mt-2" type={opts.type ?? "text"} inputMode={k === "phone" ? "tel" : undefined} autoComplete={opts.auto} placeholder={opts.placeholder} required={opts.required} value={form[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `enq-${k}-err` : undefined} />
    {errors[k] && <span id={`enq-${k}-err`} role="alert" className="mt-1 block text-xs text-destructive">{errors[k]}</span>}</label>;
  return <form className="grid gap-4 rounded-2xl border border-[oklch(1_0_0/.12)] p-7 md:grid-cols-2" onSubmit={submit} noValidate aria-label="Enquiry form">
    <p className="muted text-xs md:col-span-2">Fields marked * are required. Submitting opens WhatsApp with your details filled in — you press send there.</p>
    {field("name", "Name", { required: true, auto: "name" })}{field("company", "Company", { auto: "organization" })}
    {field("phone", "Phone", { required: true, type: "tel", placeholder: "98765 43210", auto: "tel" })}{field("email", "Email", { type: "email", auto: "email" })}
    <label htmlFor="enq-product" className="muted text-sm">Product<select id="enq-product" className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground" value={form.product} onChange={(e) => set("product", e.target.value)}><option value="">Not sure yet</option>{products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}</select></label>
    {field("quantity", "Quantity", { placeholder: "e.g. 500 tons" })}
    {field("city", "Delivery city / plant location", { auto: "address-level2" })}
    <label htmlFor="enq-requirement" className="muted text-sm md:col-span-2">Requirement<Textarea id="enq-requirement" className="mt-2 min-h-28" value={form.requirement} onChange={(e) => set("requirement", e.target.value)} aria-invalid={!!errors.requirement} />{errors.requirement && <span role="alert" className="mt-1 block text-xs text-destructive">{errors.requirement}</span>}</label>
    <button type="submit" disabled={status === "busy"} className="pill light justify-between disabled:opacity-60 md:col-span-2">{status === "busy" ? "Opening WhatsApp…" : "Continue on WhatsApp"}<span className="dot"><MessageCircle /></span></button>
    <p aria-live="polite" className="muted text-xs md:col-span-2">{status === "opened" && "WhatsApp opened in a new tab. Your enquiry is sent only after you press send in WhatsApp."}{status === "blocked" && <>Your browser blocked the new tab. <a className="underline" href={link} target="_blank" rel="noreferrer">Open WhatsApp manually</a>.</>}</p>
  </form>;
}

function ContactAndFooter() {
  return <section className="md:px-4 md:pb-4"><div id="contact" className="dark-block md:rounded-3xl">
    <div className="site-shell py-20 text-center md:py-28"><h2 className="headline mx-auto">{home.cta.title[0]}<br />{home.cta.title[1]}</h2><div className="mt-8 flex justify-center"><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="pill light">{home.cta.button}<span className="dot"><ArrowRight /></span></a></div></div>
    <div className="site-shell grid gap-6 pb-16 lg:grid-cols-[.8fr_1.2fr]">
      <div className="space-y-5 rounded-2xl border border-[oklch(1_0_0/.12)] p-7">{[[Phone, "Primary", site.primaryPhone, site.primaryPhoneHref], [Phone, site.secondaryContact, site.secondaryPhone, site.secondaryPhoneHref], [MapPin, "Head office", site.address, "https://www.google.com/maps/search/?api=1&query=Mouza+Deulbeda+Talcher+Angul+Odisha+759107"]].map(([Icon, l, v, href]) => { const I = Icon as typeof Phone; return <a key={String(l)} href={String(href)} className="flex gap-4"><span className="arrow-dot shrink-0"><I /></span><span><small className="muted block text-xs">{String(l)}</small><strong className="text-sm font-semibold">{String(v)}</strong></span></a>; })}<p className="muted border-t border-[oklch(1_0_0/.12)] pt-5 text-xs">Branches · {site.branches.join(" · ")}</p></div>
      <EnquiryForm />
    </div>
    <footer className="border-t border-[oklch(1_0_0/.12)]"><div className="site-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div><Brand /><p className="muted mt-5 max-w-xs text-sm">Trusted coal supply and logistics from mines and ports to industrial plants across India.</p><div className="mt-6 flex gap-2">{[[Phone, site.primaryPhoneHref, "Call"], [MessageCircle, whatsappUrl(), "WhatsApp"]].map(([I, h, l]) => { const Icon = I as typeof Phone; return <a key={String(l)} href={String(h)} aria-label={String(l)} className="grid h-9 w-9 place-items-center rounded-full bg-[oklch(1_0_0/.08)]"><Icon className="h-4 w-4" /></a>; })}</div></div>
      <div><h3 className="text-sm font-semibold">Company</h3><div className="muted mt-4 grid gap-2 text-sm">{navItems.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</div></div>
      <div><h3 className="text-sm font-semibold">Products</h3><div className="muted mt-4 grid gap-2 text-sm">{products.map((p) => <a key={p.id} href="#products">{p.shortName}</a>)}<a href="/pet-coke-price">Pet Coke price</a></div></div>
      <div><h3 className="text-sm font-semibold">Contact</h3><div className="muted mt-4 grid gap-2 text-sm"><p>{site.address}</p><a href={site.primaryPhoneHref}>{site.primaryPhone}</a><a href={site.secondaryPhoneHref}>{site.secondaryPhone}</a><p className="text-xs">GSTIN {site.gstin}</p></div></div>
    </div><div className="site-shell muted flex flex-col gap-2 border-t border-[oklch(1_0_0/.12)] py-5 text-xs sm:flex-row sm:justify-between"><span>© 2026 Dhanraj Coal Transport. All rights reserved.</span><span>{site.tagline}</span></div></footer>
  </div></section>;
}

export function DhanrajSite() {
  return <><main><Hero /><About />{home.quote.approved && <Founder />}<Products />{home.impact.approved && <Impact />}<Rates /><Updates /><FAQSection /><ContactAndFooter /></main>
    <div className="floating-actions"><a href={site.primaryPhoneHref} aria-label="Call Dhanraj"><Phone className="h-5 w-5" /></a><a target="_blank" rel="noreferrer" href={whatsappUrl()} aria-label="WhatsApp Dhanraj"><MessageCircle className="h-5 w-5" /></a></div>
    <div className="mobile-contact-bar"><a href={site.primaryPhoneHref}><Phone className="h-4 w-4" /> Call</a><a target="_blank" rel="noreferrer" href={whatsappUrl()}><MessageCircle className="h-4 w-4" /> WhatsApp</a></div></>;
}
