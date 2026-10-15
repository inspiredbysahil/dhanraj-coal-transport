import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, FileText, Fuel, Menu, MessageCircle, Phone, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappUrl } from "@/data/site";
import { ports, portsSourceHeading } from "@/data/ports";
import { filterPorts, groupPorts, portStates, portsCopy as copy } from "@/data/ports-directory";

function PortsHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links = <>
    <Link to="/" hash="about" onClick={close}>About</Link>
    <Link to="/" hash="products" onClick={close}>Products</Link>
    <Link to="/" hash="rates" onClick={close}>Rates</Link>
    <Link to="/coal-mines" onClick={close}>Coal Mines</Link>
    <Link to="/ports" onClick={close} aria-current="page" className="border-b-2 border-lime py-2 font-semibold text-foreground">Indian Ports</Link>
    <Link to="/pet-coke-price" onClick={close}>Pet Coke</Link>
    <Link to="/" hash="contact" onClick={close}>Contact</Link>
  </>;
  return <header className="page-chrome relative z-20">
    <div className="site-shell flex min-h-20 items-center justify-between gap-3">
      <Link to="/" className="brand-mark shrink-0" aria-label="Dhanraj Coal Transport home"><span className="brand-icon"><Fuel aria-hidden="true" /></span><span><strong>DHANRAJ</strong><small>COAL TRANSPORT</small></span></Link>
      <nav className="hidden items-center gap-5 text-sm text-muted-foreground xl:flex" aria-label="Main navigation">{links}</nav>
      <div className="flex shrink-0 items-center gap-2">
        <Button asChild variant="outline" className="gap-2" aria-label={`Call ${site.primaryPhone}`}><a href={site.primaryPhoneHref}><Phone className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">{site.primaryPhone}</span></a></Button>
        <Button variant="circle" className="xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="ports-mobile-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
      </div>
    </div>
    {open && <nav id="ports-mobile-menu" className="mobile-nav xl:hidden" aria-label="Mobile navigation">{links}</nav>}
  </header>;
}

export function PortsDirectory() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const shown = useMemo(() => filterPorts(ports, query, state), [query, state]);
  const groups = groupPorts(shown);
  return <main>
    <PortsHeader />
    <section className="section-pad"><div className="site-shell">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="mt-5 text-4xl font-medium leading-tight md:text-5xl">{copy.title}</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">{copy.intro}</p>
      <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-md border border-border bg-card p-3 text-sm"><FileText className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>{copy.notice} Names shown as printed in “{ports[0]?.sourceDocument}” ({portsSourceHeading}).</span></p>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1"><span className="sr-only">Search ports</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.search} className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm" /></label>
        <label><span className="sr-only">Filter by state</span><select aria-label="Filter by state" value={state} onChange={(e) => setState(e.target.value)} className="h-11 w-full rounded-full border border-border bg-card px-4 text-sm md:w-56"><option value="">{copy.allStates}</option>{portStates.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
        <Button variant="outline" onClick={() => { setQuery(""); setState(""); }}>{copy.reset}</Button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite" data-testid="ports-count">Showing {shown.length} of {ports.length} ports</p>

      {groups.length === 0 ? <p className="mt-8 rounded-lg border border-border bg-card p-6 text-center">{copy.empty}</p> :
        <div className="mt-6 grid gap-4 md:grid-cols-2">{groups.map((g) => <section key={g.state} className="rounded-lg border border-border bg-card" aria-label={g.state}>
          <h2 className="flex items-center justify-between border-b border-border p-4 text-lg font-semibold"><span>{g.state}</span><span className="text-sm font-normal text-muted-foreground">{g.items.length}</span></h2>
          <ul className="divide-y divide-border">{g.items.map((p) => <li key={p.id} className="flex flex-col gap-1 p-4 text-sm sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0"><p className="font-medium break-words">{p.portName}</p>{p.reviewNotes.length > 0 && <p className="mt-1 flex items-start gap-1 text-xs text-muted-foreground"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />{p.reviewNotes.join(" · ")}</p>}</div>
            <div className="flex shrink-0 gap-2 text-xs">{p.needsReview && <span className="rounded-full border border-border px-2 py-0.5">Needs review</span>}<span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">PDF p.{p.sourcePage}</span></div></li>)}</ul>
        </section>)}</div>}

      <div className="mt-12 flex flex-col gap-4 border-t border-border py-6 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold">Need material from a specific port?</p><p className="text-sm text-muted-foreground">Tell us the port and delivery location — availability is confirmed by our team.</p></div>
        <div className="flex flex-wrap gap-2"><Button asChild variant="outline"><a href={site.primaryPhoneHref}><Phone aria-hidden="true" /> Call</a></Button><Button asChild><a href={whatsappUrl(copy.enquiry)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> WhatsApp</a></Button></div></div>
    </div></section>
  </main>;
}
