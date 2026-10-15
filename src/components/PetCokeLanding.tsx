import { ArrowDown, ArrowUpRight, Droplets, Flame, Gauge, Layers, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PetCokeHeader } from "@/components/PetCokeHeader";
import { PetCokePortTable } from "@/components/PetCokePortTable";
import { PetCokeHeatCalculator } from "@/components/PetCokeHeatCalculator";
import { petCokeCopy as copy, petCokeSpecs, petCokeQuoteUrl } from "@/data/pet-coke";
import { site } from "@/data/site";

export function PetCokeLanding() {
  const icons = { heat: Flame, ash: Layers, water: Droplets, grind: Gauge };
  return <main className="min-h-screen bg-background">
    <PetCokeHeader />
    <section className="hero-frame" aria-labelledby="pet-coke-hero-title">
      <img className="bg" src={copy.photo} alt={copy.photoAlt} width={1600} height={960} fetchPriority="high" />
      <div className="site-shell py-12 md:py-16"><p className="text-xs font-semibold uppercase">{copy.heroLabel}</p><h1 id="pet-coke-hero-title" className="mt-5 max-w-3xl text-4xl font-medium leading-tight md:text-5xl">{copy.heroTitle}</h1><p className="mt-5 max-w-xl text-sm leading-6 text-on-photo-muted md:text-base">{copy.heroIntro}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" className="h-auto min-h-12 whitespace-normal bg-lime py-3 text-lime-foreground hover:bg-lime"><a href={petCokeQuoteUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{copy.heroQuote}<ArrowUpRight aria-hidden="true" /></a></Button><Button asChild variant="glass" size="lg"><a href={site.primaryPhoneHref}><Phone aria-hidden="true" />Call sales</a></Button></div><p className="mt-7 text-xs text-on-photo-muted">{copy.heroNote}</p></div>
    </section>
    <section className="py-10 md:py-12" aria-labelledby="pet-coke-specs-title"><div className="site-shell"><div className="flex items-center justify-between gap-4"><h2 id="pet-coke-specs-title" className="text-xl font-semibold">{copy.specsTitle}</h2><ArrowDown className="h-5 w-5 shrink-0" aria-hidden="true" /></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{petCokeSpecs.map((spec) => { const Icon = icons[spec.icon]; return <article key={spec.label} className="industrial-card min-w-0 p-5"><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">{spec.label}</h3><Icon className="h-5 w-5" aria-hidden="true" /></div><p className="mt-5 text-2xl font-semibold tabular-nums">{spec.value}</p><p className="mt-2 text-xs text-muted-foreground">{spec.unit}</p></article>; })}</div><p className="mt-5 max-w-3xl text-xs leading-6 text-muted-foreground">{copy.specsNote}</p></div></section>
    <PetCokePortTable />
    <PetCokeHeatCalculator />
  </main>;
}