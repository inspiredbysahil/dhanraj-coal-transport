import { useState, type FormEvent } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rates, effectiveDateLabel } from "@/data/rates";
import { whatsappUrl } from "@/data/site";
import { estimateOrder, formatINR, gradeOptionLabel, orderCopy, orderMessage, orderSettings } from "@/data/order-estimator";

export function QuickOrderEstimator() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState("100");
  const [destination, setDestination] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const selected = rates[selectedIndex];
  if (!selected) return null;
  const estimate = estimateOrder(selected, quantity);
  const quantityError = estimate === null;
  const destinationError = submitted && !destination.trim();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!selected) return;
    const message = orderMessage(selected, quantity, destination);
    if (!message) {
      document.getElementById(quantityError ? "order-quantity" : "order-destination")?.focus();
      return;
    }
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return <section aria-labelledby="order-estimator-title" className="overflow-hidden rounded-lg border border-border bg-card">
    <header className="glass-panel rounded-none border-0 border-b border-border px-5 py-5 sm:px-6">
      <div className="flex min-w-0 items-center gap-3"><Calculator className="h-5 w-5 shrink-0 text-primary" aria-hidden="true"/><h3 id="order-estimator-title" className="font-display text-xl font-semibold sm:text-2xl">{orderCopy.title}</h3></div>
      <p className="mt-2 text-xs text-muted-foreground">{orderCopy.updated} {effectiveDateLabel}</p>
    </header>
    <form noValidate onSubmit={submit} className="grid min-w-0 gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10">
      <div className="min-w-0 space-y-5">
        <div className="min-w-0"><label htmlFor="order-grade" className="mb-2 block text-sm font-semibold">{orderCopy.grade}</label>
          <select id="order-grade" className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" value={selectedIndex} onChange={(e) => setSelectedIndex(Number(e.target.value))}>
            {rates.map((rate, index) => <option key={index} value={index}>{gradeOptionLabel(rate)}</option>)}
          </select>
          <p className="mt-2 break-words text-sm text-muted-foreground">{gradeOptionLabel(selected)}</p>
        </div>
        <div><label htmlFor="order-quantity" className="mb-2 block text-sm font-semibold">{orderCopy.quantity} <span aria-hidden="true">*</span></label>
          <Input id="order-quantity" type="number" inputMode="decimal" min={orderSettings.minimumMT} step="any" required value={quantity} onChange={(e) => setQuantity(e.target.value)} aria-invalid={quantityError} aria-describedby={quantityError ? "order-quantity-error" : undefined}/>
          {quantityError && <p id="order-quantity-error" role="alert" className="mt-2 text-sm text-destructive">{orderCopy.quantityError}</p>}
        </div>
        <div><label htmlFor="order-destination" className="mb-2 block text-sm font-semibold">{orderCopy.destination} <span aria-hidden="true">*</span></label>
          <Input id="order-destination" required autoComplete="address-level2" placeholder={orderCopy.destinationPlaceholder} value={destination} onChange={(e) => setDestination(e.target.value)} aria-invalid={destinationError} aria-describedby={destinationError ? "order-destination-error" : undefined}/>
          {destinationError && <p id="order-destination-error" role="alert" className="mt-2 text-sm text-destructive">{orderCopy.destinationError}</p>}
        </div>
      </div>
      <div className="min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <dl aria-live="polite" aria-atomic="true" className="min-w-0 space-y-4">
          {[[orderCopy.unitRate, formatINR(selected.rate)], [orderCopy.base, estimate ? formatINR(estimate.base) : "—"], [orderCopy.gst, estimate ? formatINR(estimate.gst) : "—"]].map(([label, value]) => <div key={label} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="break-all text-right font-mono font-semibold">{value}</dd></div>)}
          <div className="border-t border-border pt-4"><dt className="text-sm font-semibold">{orderCopy.total}</dt><dd className="mt-2 break-all font-mono text-2xl font-bold">{estimate ? formatINR(estimate.total) : "—"}</dd></div>
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{orderCopy.caveat}</p>
        <p className="mt-2 break-words text-xs leading-relaxed text-muted-foreground">{orderCopy.remarks} {selected.remarks}</p>
        <Button type="submit" className="mt-6 h-auto w-full whitespace-normal rounded-md px-4 py-4 text-left leading-relaxed"><MessageCircle aria-hidden="true"/><span>{orderCopy.cta}</span></Button>
      </div>
    </form>
  </section>;
}