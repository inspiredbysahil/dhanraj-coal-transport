import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, ChevronDown, Fuel, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Truck, X, Pickaxe, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoalMinesDirectory } from "@/components/CoalMinesDirectory";
import { site } from "@/data/site";
import { coalMinesCopy as copy, liftingHubs, hubReference, liftingQuoteUrl, nonCokingGrades, washeryGrades, gcvBandLabel, qualitySteps } from "@/data/coal-mines-landing";

function MinesHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links = <>
    <Link to="/" hash="about" onClick={close}>About</Link>
    <Link to="/" hash="products" onClick={close}>Products</Link>
    <Link to="/" hash="rates" onClick={close}>Rates</Link>
    <Link to="/coal-mines" onClick={close} aria-current="page" className="border-b-2 border-lime py-2 font-semibold text-foreground">Coal Mines</Link>
    <Link to="/ports" onClick={close}>Indian Ports</Link>
    <Link to="/pet-coke-price" onClick={close}>Pet Coke</Link>
    <Link to="/" hash="contact" onClick={close}>Contact</Link>
  </>;
  return <header className="page-chrome relative z-20">
    <div className="site-shell flex min-h-20 items-center justify-between gap-3">
      <Link to="/" className="brand-mark shrink-0" aria-label="Dhanraj Coal Transport home"><span className="brand-icon"><Fuel aria-hidden="true" /></span><span><strong>DHANRAJ</strong><small>COAL TRANSPORT</small></span></Link>
      <nav className="hidden items-center gap-5 text-sm text-muted-foreground xl:flex" aria-label="Main navigation">{links}</nav>
      <div className="flex shrink-0 items-center gap-2">
        <Button asChild variant="outline" className="gap-2" aria-label={`Call ${site.primaryPhone}`}><a href={site.primaryPhoneHref}><Phone className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">{site.primaryPhone}</span></a></Button>
        <Button variant="circle" className="xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mines-mobile-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
      </div>
    </div>
    {open && <nav id="mines-mobile-menu" className="mobile-nav xl:hidden" aria-label="Mobile navigation">{links}</nav>}
  </header>;
}

function LiftingHubs() {
  return <section className="section-pad" aria-labelledby="hubs-title"><div className="site-shell">
    <p className="eyebrow">{copy.hubsLabel}</p>
    <h2 id="hubs-title" className="mt-4 text-3xl font-medium leading-tight md:text-4xl">{copy.hubsTitle}</h2>
    <p className="mt-4 max-w-2xl text-muted-foreground">{copy.hubsIntro}</p>
    <p className="mt-6 border-l-2 border-lime pl-4 text-sm leading-6 text-muted-foreground">{copy.datedNotice}</p>
    <div className="mt-8 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
      {liftingHubs.map((hub) => {
        const ref = hubReference(hub);
        return <article key={hub.id} className="industrial-card min-w-0 p-5" aria-labelledby={`${hub.id}-title`}>
          <p className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />{hub.context}</p>
          <h3 id={`${hub.id}-title`} className="mt-4 min-h-14 text-xl font-semibold leading-7">{hub.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{hub.region}</p>
          <dl className="mt-6 space-y-4 border-t border-border pt-5 text-sm">
            <div><dt className="text-xs text-muted-foreground">{copy.coalTypes}</dt><dd className="mt-1 font-medium">{ref.grades.length ? ref.grades.join(" · ") : copy.missingTypes}</dd>{ref.grades.length > 0 && <p className="mt-1 text-xs text-muted-foreground">{copy.typesNote}</p>}</div>
            <div><dt className="text-xs text-muted-foreground">{copy.gcv}</dt><dd className="mt-1 font-semibold">{ref.gcv}</dd></div>
            <div><dt className="text-xs text-muted-foreground">{copy.ash}</dt><dd className="mt-1">{copy.confirm}</dd></div>
            <div><dt className="text-xs text-muted-foreground">{copy.stock}</dt><dd className="mt-1">{copy.confirm}</dd></div>
          </dl>
          {ref.rows.length > 0 && <details className="mt-5 border-t border-border pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">{copy.viewGrades}<ChevronDown className="h-4 w-4" aria-hidden="true" /></summary>
            <p className="mt-3 text-xs text-muted-foreground">{copy.referenceDate} · {copy.historicalQuantity}</p>
            <ul className="mt-2 divide-y divide-border">{ref.rows.map((row, index) => <li key={`${hub.id}-${index}`} className="py-3 text-xs leading-5"><p className="font-semibold">{row.grade}</p><p>{row.gcv} kcal/kg · {row.qty} MT</p><p className="text-muted-foreground">{row.category} · {row.remarks}</p></li>)}</ul>
          </details>}
          <Button asChild className="mt-6 h-auto min-h-12 w-full gap-2 whitespace-normal px-3 py-3 text-left text-xs leading-5"><a href={liftingQuoteUrl(hub)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.quote}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a></Button>
        </article>;
      })}
    </div>
  </div></section>;
}

function GradeReference() {
  return <section className="section-pad border-y border-border bg-secondary" aria-labelledby="grade-reference-title"><div className="site-shell">
    <p className="eyebrow">{copy.chartLabel}</p>
    <h2 id="grade-reference-title" className="mt-4 text-3xl font-medium leading-tight md:text-4xl">{copy.chartTitle}</h2>
    <p className="mt-4 text-muted-foreground">{copy.chartIntro}</p>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div><h3 className="font-semibold">{copy.nonCokingTitle}</h3><p className="mt-2 text-sm text-muted-foreground">{copy.nonCokingNote}</p>
        <dl className="mt-5 grid gap-x-6 sm:grid-cols-2">{nonCokingGrades.map((grade) => <div key={grade.grade} className="flex items-center justify-between gap-3 border-b border-border py-3 text-sm"><dt className="font-semibold">{grade.grade}</dt><dd className="tabular-nums">{gcvBandLabel(grade)}</dd></div>)}</dl>
      </div>
      <div><h3 className="font-semibold">{copy.washeryTitle}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.washeryNote}</p>
        <table className="mt-5 w-full text-left text-sm"><thead><tr className="border-b border-border"><th scope="col" className="py-3">Grade</th><th scope="col" className="py-3">Ash content</th><th scope="col" className="py-3">GCV</th></tr></thead><tbody>{washeryGrades.map((grade) => <tr key={grade.grade} className="border-b border-border"><th scope="row" className="py-3 pr-2 font-semibold">{grade.grade}</th><td className="py-3 pr-2">&gt; {grade.lowerExclusive} to ≤ {grade.upperInclusive}%</td><td className="max-w-24 py-3 text-xs text-muted-foreground">{copy.labReport}</td></tr>)}</tbody></table>
      </div>
    </div>
    <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-5 md:flex-row"><p className="max-w-xl text-xs leading-5 text-muted-foreground">{copy.chartDisclaimer}</p><a className="flex items-center gap-2 text-xs font-semibold underline underline-offset-4" href={copy.officialUrl} target="_blank" rel="noopener noreferrer">{copy.officialSource}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a></div>
  </div></section>;
}

function QualityGuarantee() {
  const icons = { sorting: Pickaxe, verification: FlaskConical, logistics: Truck };
  return <section className="section-pad" aria-labelledby="quality-title"><div className="site-shell">
    <p className="eyebrow">{copy.qualityLabel}</p><h2 id="quality-title" className="mt-4 text-3xl font-medium leading-tight md:text-4xl">{copy.qualityTitle}</h2><p className="mt-4 text-muted-foreground">{copy.qualityIntro}</p>
    <ol className="mt-10 grid gap-8 md:grid-cols-3">{qualitySteps.map((step, i) => { const Icon = icons[step.icon]; return <li key={step.icon} className="border-t border-border pt-5"><div className="flex items-center justify-between"><span className="font-mono text-sm text-muted-foreground">0{i + 1}</span><Icon className="h-6 w-6 text-foreground" aria-hidden="true" /></div><h3 className="mt-5 text-lg font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.detail}</p></li>; })}</ol>
    <div className="mt-12 flex flex-col justify-between gap-6 border-t border-border pt-8 lg:flex-row lg:items-center"><div><h3 className="text-xl font-semibold">{copy.closeTitle}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{copy.closeIntro}</p></div><div><Button asChild className="h-auto min-h-12 whitespace-normal py-3"><a href={liftingQuoteUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{copy.closeQuote}</a></Button><p className="mt-2 max-w-xs text-xs text-muted-foreground">{copy.footnote}</p></div></div>
  </div></section>;
}

export function CoalMinesLanding() {
  return <main className="min-h-screen bg-background">
    <MinesHeader />
    <section className="hero-frame" aria-labelledby="mines-hero-title">
      <img className="bg" src={copy.photo} alt={copy.photoAlt} width={1600} height={960} fetchPriority="high" />
      <div className="site-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase">{copy.heroLabel}</p>
        <h1 id="mines-hero-title" className="mt-5 max-w-3xl text-4xl font-medium leading-tight md:text-5xl">{copy.heroTitle}</h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-on-photo-muted md:text-base">{copy.heroIntro}</p>
        <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" className="h-auto min-h-12 whitespace-normal bg-lime py-3 text-lime-foreground hover:bg-lime"><a href={liftingQuoteUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{copy.heroQuote}<ArrowUpRight aria-hidden="true" /></a></Button><Button asChild variant="glass" size="lg" className="h-auto min-h-12 whitespace-normal py-3"><a href="#mines-directory">{copy.heroDirectory}<ArrowDown aria-hidden="true" /></a></Button></div>
        <p className="mt-7 flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.minimum}</p><p className="mt-2 text-xs text-on-photo-muted">{copy.heroNote}</p>
      </div>
    </section>
    <LiftingHubs />
    <GradeReference />
    <QualityGuarantee />
    <CoalMinesDirectory />
  </main>;
}