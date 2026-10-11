import { useMemo, useState } from "react";
import { ArrowUpDown, Calculator, Download, MessageCircle, Search } from "lucide-react";
import { rates, effectiveDate, type Rate } from "@/data/rates";
import { whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["All categories", "Domestic (Port)", "Domestic (Mine)", "Imported (Navlakhi)", "Port (Kandla/Tuna)"];
type SortKey = keyof Pick<Rate, "category" | "gcv" | "source" | "grade" | "qty" | "rate">;

export function RateTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [sort, setSort] = useState<SortKey>("gcv");
  const [ascending, setAscending] = useState(false);
  const [tons, setTons] = useState(100);
  const [selectedRate, setSelectedRate] = useState(() => rates[0]?.rate ?? 0);
  const filtered = useMemo(() => rates.filter((item) => {
    const matchesCategory = category === categories[0] || item.category === category;
    const haystack = Object.values(item).join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }).sort((a,b) => {
    const av = a[sort], bv = b[sort];
    return (typeof av === "number" && typeof bv === "number" ? av-bv : String(av).localeCompare(String(bv))) * (ascending ? 1 : -1);
  }), [query, category, sort, ascending]);

  function changeSort(key: SortKey) {
    if (sort === key) setAscending((value) => !value); else { setSort(key); setAscending(true); }
  }
  function exportCsv() {
    const head = "Category,GCV,Source,Grade/Vessel,Qty (Tons),Rate,Remarks";
    const rows = filtered.map((item) => [item.category,item.gcv,item.source,item.grade,item.qty,item.rate,item.remarks].map((cell)=>`"${String(cell).replaceAll('"','""')}"`).join(","));
    const url = URL.createObjectURL(new Blob([[head,...rows].join("\n")], { type: "text/csv" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `dhanraj-rates-${effectiveDate.replaceAll("/","-")}.csv`; anchor.click(); URL.revokeObjectURL(url);
  }
  const subtotal = Math.max(0, tons) * selectedRate;
  return <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">{categories.map((item)=><Button key={item} variant={category===item?"default":"outline"} size="sm" onClick={()=>setCategory(item)}>{item}</Button>)}</div>
      <div className="flex gap-2"><div className="relative min-w-0 flex-1 lg:w-72"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/><Input aria-label="Search rates" className="pl-9" placeholder="Search GCV, source, vessel…" value={query} onChange={(e)=>setQuery(e.target.value)}/></div><Button variant="outline" onClick={exportCsv}><Download/> Export</Button></div>
    </div>
    <div className="rate-table-wrap hidden overflow-auto rounded-md border border-border md:block">
      <table className="w-full min-w-[1050px] text-left text-sm"><thead className="sticky top-0 z-10 bg-card"><tr>{([['category','Category'],['gcv','GCV'],['source','Source'],['grade','Grade / Vessel'],['qty','Qty (Tons)'],['rate','Rate']] as [SortKey,string][]).map(([key,label])=><th key={key} className="p-4 font-mono text-xs uppercase text-muted-foreground"><button className="flex items-center gap-2" onClick={()=>changeSort(key)}>{label}<ArrowUpDown className="h-3 w-3"/></button></th>)}<th className="p-4 font-mono text-xs uppercase text-muted-foreground">Remarks</th><th className="p-4"><span className="sr-only">Quote</span></th></tr></thead>
      <tbody>{filtered.map((item,index)=><tr key={`${item.grade}-${index}`} className="border-t border-border transition-colors hover:bg-accent"><td className="p-4">{item.category}</td><td className="p-4 font-mono text-spark">{item.gcv}</td><td className="p-4">{item.source}</td><td className="max-w-72 p-4">{item.grade}</td><td className="p-4 font-mono">{item.qty}</td><td className="p-4 font-mono font-bold text-primary">₹{item.rate.toLocaleString("en-IN")}</td><td className="p-4 text-muted-foreground">{item.remarks}</td><td className="p-4"><Button title="Get quote for this row" variant="ghost" size="icon" asChild><a target="_blank" rel="noreferrer" href={whatsappUrl(`Hello DHANRAJ COAL TRANSPORT, please quote ${item.category}, ${item.gcv} GCV, ${item.grade}, from ${item.source} at the listed rate ₹${item.rate}/ton.`)}><MessageCircle/></a></Button></td></tr>)}</tbody></table>
    </div>
    <div className="grid gap-3 md:hidden">{filtered.map((item,index)=><article key={`${item.grade}-${index}`} className="industrial-card p-4"><div className="flex justify-between gap-3"><div><p className="font-mono text-xs text-primary">{item.category}</p><h3 className="mt-1 font-display text-lg">{item.gcv} GCV</h3></div><p className="font-mono font-bold text-spark">₹{item.rate.toLocaleString("en-IN")}</p></div><p className="mt-3 text-sm">{item.grade}</p><p className="mt-1 text-xs text-muted-foreground">{item.source} · {item.qty} tons · {item.remarks}</p><Button className="mt-4 w-full" variant="outline" asChild><a target="_blank" rel="noreferrer" href={whatsappUrl(`Please quote ${item.category}, ${item.gcv} GCV, ${item.grade}.`)}><MessageCircle/> Get quote</a></Button></article>)}</div>
    <div className="grid gap-5 border-t border-border pt-6 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-xs uppercase text-muted-foreground">Tentative rates · MOQ 100 tons+ · 18% GST extra · Freight as per delivery location · Subject to availability.</p><p className="mt-2 font-mono text-xs text-primary">Effective {effectiveDate}</p></div><div className="industrial-card grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"><label className="text-xs text-muted-foreground">Tons<Input type="number" min={1} value={tons} onChange={(e)=>setTons(Number(e.target.value))}/></label><label className="text-xs text-muted-foreground">Rate / ton<select className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-sm" value={selectedRate} onChange={(e)=>setSelectedRate(Number(e.target.value))}>{[...new Set(rates.map((item)=>item.rate))].map((rate)=><option key={rate} value={rate}>₹{rate.toLocaleString("en-IN")}</option>)}</select></label><div className="min-w-52"><p className="flex items-center gap-2 text-xs text-muted-foreground"><Calculator className="h-4 w-4"/> Estimated incl. GST</p><strong className="font-mono text-xl text-primary">₹{Math.round(subtotal*1.18).toLocaleString("en-IN")}</strong><p className="text-[10px] text-muted-foreground">Freight extra · TCS as applicable</p></div></div></div>
  </div>;
}