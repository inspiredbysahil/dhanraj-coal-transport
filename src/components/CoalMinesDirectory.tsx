import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronDown, FileText, Fuel, MessageCircle, Phone, RotateCcw, Search } from "lucide-react";
import { mines, mineHeadquarters, minesSourceDocument, type MineRecord } from "@/data/mines";
import { site, whatsappUrl } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const states = [...new Set(mines.map((m) => m.state))];
const operators = [...new Set(mines.map((m) => m.operator))];
const flaggedTotal = mines.filter((m) => m.needsReview).length;
const selectCls = "h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground";
const show = (v: string) => (v === "unknown" ? "Not stated" : v);

type Group = { state: string; operators: { operator: string; areas: { key: string; coalfield: string; area: string; items: MineRecord[] }[] }[]; count: number };

function group(rows: MineRecord[]): Group[] {
  const out: Group[] = [];
  for (const m of rows) {
    let s = out.find((g) => g.state === m.state); if (!s) { s = { state: m.state, operators: [], count: 0 }; out.push(s); }
    let o = s.operators.find((x) => x.operator === m.operator); if (!o) { o = { operator: m.operator, areas: [] }; s.operators.push(o); }
    const key = `${m.state}|${m.operator}|${m.coalfield}|${m.area}`;
    let a = o.areas.find((x) => x.key === key); if (!a) { a = { key, coalfield: m.coalfield, area: m.area, items: [] }; o.areas.push(a); }
    a.items.push(m); s.count++;
  }
  return out;
}

export function CoalMinesDirectory() {
  const [q, setQ] = useState(""); const [state, setState] = useState(""); const [op, setOp] = useState(""); const [flagged, setFlagged] = useState(false);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const filtered = useMemo(() => { const t = q.trim().toLowerCase(); return mines.filter((m) => (!state || m.state === state) && (!op || m.operator === op) && (!flagged || m.needsReview) && (!t || `${m.mineName} ${m.sourceLabel} ${m.area} ${m.coalfield}`.toLowerCase().includes(t))); }, [q, state, op, flagged]);
  const groups = useMemo(() => group(filtered), [filtered]);
  const active = !!(q || state || op || flagged);
  const reset = () => { setQ(""); setState(""); setOp(""); setFlagged(false); };
  const toggle = (k: string) => setClosed((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const allKeys = groups.flatMap((g) => [g.state, ...g.operators.flatMap((o) => o.areas.map((a) => a.key))]);

  return <main className="min-h-screen bg-background">
    <header className="page-chrome"><div className="site-shell flex h-20 items-center justify-between gap-3"><Link to="/" className="brand-mark"><span className="brand-icon"><Fuel /></span><span><strong>DHANRAJ</strong><small>COAL TRANSPORT</small></span></Link>
      <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Main navigation"><a href="/#about">About</a><a href="/#products">Products</a><a href="/#rates">Rates</a><Link to="/coal-mines" aria-current="page" className="font-semibold">Coal Mines</Link><Link to="/pet-coke-price">Pet Coke</Link><a href="/#contact">Contact</a></nav>
      <Button variant="outline" asChild className="md:hidden"><Link to="/">Home</Link></Button></div></header>

    <section className="section-pad pb-10"><div className="site-shell">
      <p className="eyebrow">Coal mines directory</p>
      <h1 className="headline mt-5">Indian Coal Mines<br />by State & Operator</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">Mines, coalfields and operators as listed in our source document. Use it to tell us where you want coal loaded from.</p>
      <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-md border border-border bg-card p-3 text-sm"><FileText className="mt-0.5 h-4 w-4 shrink-0" /><span>Source-listed directory, not independently verified. Names are shown as printed in “{minesSourceDocument}”, including spellings that may be wrong.</span></p>
      <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">{[["Entries", mines.length], ["States", states.length], ["Need review", flaggedTotal]].map(([l, v]) => <div key={l} className="rounded-lg border border-border bg-card p-4"><dt className="text-xs text-muted-foreground">{l}</dt><dd className="mt-1 text-2xl font-semibold">{v}</dd></div>)}</dl>
    </div></section>

    <section className="pb-24"><div className="site-shell">
      <div className="glass-panel grid gap-3 p-4 md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_auto]">
        <label className="relative"><span className="sr-only">Search mines by name</span><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mine name…" className="h-10 pl-9" /></label>
        <label><span className="sr-only">Filter by state</span><select aria-label="Filter by state" className={selectCls} value={state} onChange={(e) => setState(e.target.value)}><option value="">All states</option>{states.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label><span className="sr-only">Filter by operator</span><select aria-label="Filter by operator" className={selectCls} value={op} onChange={(e) => setOp(e.target.value)}><option value="">All operators</option>{operators.map((o) => <option key={o} value={o}>{show(o)}</option>)}</select></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={flagged} onChange={(e) => setFlagged(e.target.checked)} className="h-4 w-4" />Only needs review</label>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"><p aria-live="polite"><strong>{filtered.length}</strong> of {mines.length} entries</p>
        <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => setClosed(new Set())}>Expand all</Button><Button size="sm" variant="outline" onClick={() => setClosed(new Set(allKeys))}>Collapse all</Button>{active && <Button size="sm" variant="outline" onClick={reset}><RotateCcw /> Reset filters</Button>}</div></div>

      {groups.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center"><p className="font-semibold">No mines match your filters</p><p className="mt-1 text-sm text-muted-foreground">Try a different spelling — names are kept as printed in the source.</p><Button className="mt-4" onClick={reset}><RotateCcw /> Reset filters</Button></div> :
      <div className="mt-6 space-y-4">{groups.map((g) => { const hq = mineHeadquarters[g.state]; const open = !closed.has(g.state); return <section key={g.state} className="directory-group overflow-hidden border border-border bg-card">
        <Button variant="plain" className="flex w-full items-center justify-between gap-3 p-5 text-left" aria-expanded={open} onClick={() => toggle(g.state)}><span className="min-w-0"><span className="block text-lg font-semibold">{g.state}</span><span className="block text-xs text-muted-foreground">HQ: {hq ? `${hq.hq} (PDF p.${hq.sourcePage})` : "Not stated"}</span></span><span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">{g.count}<ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></span></Button>
        {open && <div className="space-y-4 border-t border-border p-4 md:p-5">{g.operators.map((o) => <div key={o.operator}><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Operator · {show(o.operator)}</p>
          <div className="mt-2 space-y-2">{o.areas.map((a) => { const aOpen = !closed.has(a.key); return <div key={a.key} className="directory-area">
            <Button variant="plain" className="flex w-full items-center justify-between gap-3 p-3 text-left text-sm" aria-expanded={aOpen} onClick={() => toggle(a.key)}><span className="min-w-0"><strong>{show(a.coalfield)}</strong>{a.area !== "unknown" && a.area !== a.coalfield && <span className="text-muted-foreground"> · {a.area}</span>}</span><span className="flex shrink-0 items-center gap-2 text-muted-foreground">{a.items.length}<ChevronDown className={`h-4 w-4 transition-transform ${aOpen ? "rotate-180" : ""}`} /></span></Button>
            {aOpen && <ul className="divide-y divide-border border-t border-border">{a.items.map((m) => <li key={m.id} className="flex flex-col gap-1 p-3 text-sm sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0"><p className="font-medium break-words">{show(m.mineName)}</p>{m.sourceLabel !== m.mineName && <p className="text-xs text-muted-foreground break-words">As printed: {m.sourceLabel}</p>}
                {m.reviewNotes.length > 0 && <p className="mt-1 flex items-start gap-1 text-xs text-muted-foreground"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />{m.reviewNotes.join(" · ")}</p>}</div>
              <div className="flex shrink-0 gap-2 text-xs">{m.needsReview && <span className="rounded-full border border-border px-2 py-0.5">Needs review</span>}<span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">PDF p.{m.sourcePage}</span></div></li>)}</ul>}
          </div>; })}</div></div>)}</div>}
      </section>; })}</div>}

      <div className="mt-12 flex flex-col gap-4 border-t border-border py-6 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold">Need coal from a specific mine or coalfield?</p><p className="text-sm text-muted-foreground">Tell us the source and delivery location — availability is confirmed by our team.</p></div>
        <div className="flex flex-wrap gap-2"><Button asChild variant="outline"><a href={site.primaryPhoneHref}><Phone /> Call</a></Button><Button asChild><a href={whatsappUrl("Hello DHANRAJ COAL TRANSPORT, I found a mine in your Coal Mines directory and would like to enquire about supply.")} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button></div></div>
    </div></section>
  </main>;
}
