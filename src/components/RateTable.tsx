import { useMemo, useState } from "react";
import { ArrowUpDown, Download, MessageCircle, Search } from "lucide-react";
import { rates, effectiveDate, effectiveDateLabel } from "@/data/rates";
import { whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickOrderEstimator } from "@/components/QuickOrderEstimator";
import { rateFilters, rateColumns, rateChartCopy, type RateSortKey } from "@/data/rate-chart";



export function RateTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<RateSortKey>("gcv");
  const [ascending, setAscending] = useState(false);
  const filtered = useMemo(() => rates.filter((item) => {
    const matchesCategory = category === "" || item.category === category;
    const haystack = Object.values(item).join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }).sort((a,b) => {
    const av = a[sort], bv = b[sort];
    return (typeof av === "number" && typeof bv === "number" ? av-bv : String(av).localeCompare(String(bv))) * (ascending ? 1 : -1);
  }), [query, category, sort, ascending]);

  function changeSort(key: RateSortKey) {
    if (sort === key) setAscending((value) => !value); else { setSort(key); setAscending(true); }
  }
  function exportCsv() {
    const head = "Category,GCV,Source,Grade/Vessel,Qty (Tons),Rate (INR/ton),Remarks";
    const rows = filtered.map((item) => [item.category,item.gcv,item.source,item.grade,item.qty,item.rate,item.remarks].map((cell)=>`"${String(cell).replaceAll('"','""')}"`).join(","));
    const url = URL.createObjectURL(new Blob([[head,...rows].join("\n")], { type: "text/csv" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `dhanraj-rates-${effectiveDate.replaceAll("/","-")}.csv`; anchor.click(); URL.revokeObjectURL(url);
  }
  return <div className="space-y-6">
    <div className="rounded-md border border-border bg-card p-4 text-sm"><p className="font-semibold">Last updated: {effectiveDateLabel} · Indicative rates, not a confirmed quotation</p><p className="mt-1 text-muted-foreground">Prices are per ton. 18% GST extra · TCS as applicable · Freight extra, by delivery location · Loading as noted in each row · MOQ 100 tons · Subject to availability.</p></div>
    <div className="glass-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0"><div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap">{rateFilters.map((item)=><Button className="shrink-0" key={item.label} aria-pressed={category===item.category} variant={category===item.category?"default":"outline"} size="sm" onClick={()=>setCategory(item.category)}>{item.label}</Button>)}</div></div>
      <div className="flex gap-2"><div className="relative min-w-0 flex-1 lg:w-72"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input aria-label="Search rates" className="h-11 pl-9" placeholder={rateChartCopy.search} value={query} onChange={(e)=>setQuery(e.target.value)}/></div><Button variant="outline" onClick={exportCsv}><Download/> Export</Button></div>
    </div>
    <div className="rate-table-wrap hidden overflow-auto rounded-md border border-border md:block">
      <table className="w-full min-w-[1050px] text-left text-sm"><thead className="sticky top-0 z-10 bg-card text-foreground"><tr>{rateColumns.map(({key,label})=><th scope="col" aria-sort={sort===key?(ascending?"ascending":"descending"):"none"} key={key} className="p-4 text-sm font-semibold"><Button variant="plain" className="flex items-center gap-2 px-0 text-left text-foreground" onClick={()=>changeSort(key)}>{label}<ArrowUpDown className="h-3 w-3" aria-hidden="true"/></Button></th>)}<th scope="col" className="p-4 text-sm font-semibold">{rateChartCopy.remarks}</th><th scope="col" className="p-4 text-sm font-semibold">{rateChartCopy.action}</th></tr></thead>
      <tbody>{filtered.length===0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">{rateChartCopy.empty}</td></tr>}{filtered.map((item,index)=><tr key={`${item.grade}-${index}`} className="border-t border-border transition-colors hover:bg-accent"><td className="p-4">{item.category}</td><td className="p-4 font-mono text-spark">{item.gcv}</td><td className="p-4">{item.source}</td><td className="max-w-72 p-4">{item.grade}</td><td className="p-4 font-mono">{item.qty}</td><td className="p-4 font-mono font-bold text-primary">₹{item.rate.toLocaleString("en-IN")}<span className="font-normal text-muted-foreground">/ton</span></td><td className="p-4 text-muted-foreground">{item.remarks}</td><td className="p-4"><Button title="Get quote for this row" variant="ghost" size="icon" asChild><a aria-label={`Request quote for ${item.grade}, ${item.gcv} GCV from ${item.source}`} target="_blank" rel="noreferrer" href={whatsappUrl(`Hello DHANRAJ COAL TRANSPORT, please quote ${item.category}, ${item.gcv} GCV, ${item.grade}, from ${item.source} at the listed rate ₹${item.rate}/ton.`)}><MessageCircle/></a></Button></td></tr>)}</tbody></table>
    </div>
    <div className="grid gap-3 md:hidden">{filtered.length===0 && <p className="text-sm text-muted-foreground">{rateChartCopy.empty}</p>}{filtered.map((item,index)=><article key={`${item.grade}-${index}`} className="industrial-card min-w-0 p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0"><p className="text-xs text-muted-foreground">{rateColumns[1]?.label}</p><h3 className="mt-1 break-words font-display text-lg font-semibold">{item.gcv}</h3></div>
        <div className="shrink-0 text-right"><p className="text-xs text-muted-foreground">{rateColumns[5]?.label}</p><p className="mt-1 font-mono font-bold text-foreground">₹{item.rate.toLocaleString("en-IN")}<span className="text-xs font-normal text-muted-foreground">/Ton</span></p></div>
      </div>
      <dl className="mt-4 grid min-w-0 grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div className="min-w-0"><dt className="text-xs text-muted-foreground">{rateColumns[0]?.label}</dt><dd className="mt-1 break-words">{item.category}</dd></div>
        <div className="min-w-0"><dt className="text-xs text-muted-foreground">{rateColumns[2]?.label}</dt><dd className="mt-1 break-words font-medium">{item.source}</dd></div>
        <div className="col-span-2 min-w-0"><dt className="text-xs text-muted-foreground">{rateColumns[3]?.label}</dt><dd className="mt-1 break-words">{item.grade}</dd></div>
        <div className="col-span-2"><dt className="text-xs text-muted-foreground">{rateColumns[4]?.label}</dt><dd className="mt-1 font-mono">{item.qty}</dd></div>
        <div className="col-span-2 min-w-0"><dt className="text-xs text-muted-foreground">{rateChartCopy.remarks}</dt><dd className="mt-1 break-words">{item.remarks}</dd></div>
      </dl>
      <Button className="mt-4 w-full" asChild><a aria-label={`${rateChartCopy.quote} for ${item.grade}, ${item.gcv} from ${item.source}`} target="_blank" rel="noreferrer" href={whatsappUrl(`Please quote ${item.category}, ${item.gcv} GCV, ${item.grade}.`)}><MessageCircle/>{rateChartCopy.quote}</a></Button>
    </article>)}</div>
    <QuickOrderEstimator/>
  </div>;
}