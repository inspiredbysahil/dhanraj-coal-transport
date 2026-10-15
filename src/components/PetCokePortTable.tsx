import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { petCokeCopy as copy, petCokeColumns, petCokeDestinations, petCokeFilters, petCokeQuoteUrl, type PetCokeDestination } from "@/data/pet-coke";

function Quote({ destination }: { destination: PetCokeDestination }) {
  return <Button asChild className="h-auto min-h-11 w-full whitespace-normal py-3 text-xs"><a href={petCokeQuoteUrl(destination)} target="_blank" rel="noopener noreferrer" aria-label={`${copy.quote} — ${destination}`}><MessageCircle aria-hidden="true" />{copy.quote}<ArrowUpRight aria-hidden="true" /></a></Button>;
}

export function PetCokePortTable() {
  const [filter, setFilter] = useState<typeof petCokeFilters[number]>("All Origins");
  const destinations = petCokeDestinations.filter((port) => filter === "All Origins" || port === filter);
  return <section className="section-pad border-y border-border bg-secondary" aria-labelledby="pet-coke-rates-title"><div className="site-shell">
    <h2 id="pet-coke-rates-title" className="text-3xl font-medium leading-tight md:text-4xl">{copy.ratesTitle}</h2>
    <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{copy.ratesNote}</p>
    <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Pet Coke origin filters">{petCokeFilters.map((label) => <Button key={label} variant="chip" aria-pressed={filter === label} onClick={() => setFilter(label)} className={filter === label ? "border-lime bg-lime text-lime-foreground" : ""}>{label}</Button>)}</div>
    <div className="rate-table-wrap mt-7 hidden overflow-hidden rounded-lg border border-border md:block">
      <table className="w-full table-fixed text-left text-xs lg:text-sm"><thead className="bg-card text-foreground"><tr>{petCokeColumns.map((label) => <th key={label} scope="col" className="break-words border-b border-border px-3 py-5 font-semibold">{label}</th>)}</tr></thead>
        <tbody>{destinations.map((port) => <tr key={port} className="border-b border-border last:border-0"><th scope="row" className="px-3 py-5 font-semibold">{port}</th>{Array.from({ length: 4 }, (_, i) => <td key={i} className="px-3 py-5 leading-5 text-muted-foreground">{copy.confirm}</td>)}<td className="px-3 py-5 text-muted-foreground">{copy.remarks}</td><td className="px-3 py-5"><Quote destination={port} /></td></tr>)}</tbody>
      </table>
    </div>
    <div className="mt-7 grid gap-4 md:hidden">{destinations.map((port) => <article key={port} className="industrial-card p-5"><h3 className="text-xl font-semibold">{port}</h3><dl className="my-5 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">{petCokeColumns.slice(1, 5).map((label) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{copy.confirm}</dd></div>)}</dl><p className="mb-5 text-xs leading-5 text-muted-foreground">{copy.remarks}</p><Quote destination={port} /></article>)}</div>
  </div></section>;
}