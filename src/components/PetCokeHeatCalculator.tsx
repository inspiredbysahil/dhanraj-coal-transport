import { useState } from "react";
import { ArrowUpRight, Calculator, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { petCokeCopy as copy } from "@/data/pet-coke";
import { calculateHeat, formatHeatQuantity, heatDefaults, heatFields, heatQuoteMessage } from "@/data/pet-coke-calculator";
import { formatINR } from "@/data/order-estimator";
import { whatsappUrl } from "@/data/site";

export function PetCokeHeatCalculator() {
  const [inputs, setInputs] = useState(heatDefaults);
  const result = calculateHeat(inputs);
  const message = heatQuoteMessage(inputs);
  return <section className="section-pad" aria-labelledby="heat-calculator-title"><div className="site-shell">
    <p className="eyebrow"><Calculator className="h-4 w-4" aria-hidden="true" />Fuel comparison</p>
    <h2 id="heat-calculator-title" className="mt-4 max-w-3xl text-3xl font-medium leading-tight md:text-4xl">{copy.calculatorTitle}</h2>
    <div className="mt-9 grid gap-10 lg:grid-cols-2">
      <div><div className="grid gap-5 sm:grid-cols-2">{heatFields.map((field) => <div key={field.key} className={field.key === "coalMT" ? "sm:col-span-2" : ""}><label htmlFor={`heat-${field.key}`} className="block text-sm font-semibold">{field.label}</label><input id={`heat-${field.key}`} type="number" inputMode="decimal" min="0" step="any" value={inputs[field.key]} placeholder={field.placeholder} onChange={(event) => setInputs((prev) => ({ ...prev, [field.key]: event.target.value }))} aria-invalid={Boolean(result.errors[field.key])} aria-describedby={result.errors[field.key] ? `heat-${field.key}-error` : undefined} className="mt-2 min-h-12 w-full min-w-0 rounded-lg border border-input bg-card px-4 text-foreground focus-visible:outline-2 focus-visible:outline-ring" />{result.errors[field.key] && <p id={`heat-${field.key}-error`} className="mt-2 text-xs text-destructive">{result.errors[field.key]}</p>}</div>)}</div><p className="mt-4 text-xs leading-5 text-muted-foreground">{copy.priceNote}</p></div>
      <div className="min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <div aria-live="polite" aria-atomic="true"><p className="text-sm text-muted-foreground">Equivalent Pet Coke per month</p><p className="mt-3 break-words text-4xl font-semibold tabular-nums md:text-5xl">{result.equivalentMT !== null ? formatHeatQuantity(result.equivalentMT) : "—"}<span className="ml-2 text-lg font-medium">MT</span></p><p className="mt-3 text-xs text-muted-foreground">Equal gross heat · Before efficiency adjustments</p>
          {result.difference !== null && result.coalCost !== null && result.petCokeCost !== null ? <dl className="mt-7 space-y-4 border-t border-border pt-5 text-sm"><div className="flex flex-wrap justify-between gap-2"><dt>Monthly coal cost</dt><dd className="font-semibold tabular-nums">{formatINR(result.coalCost)}</dd></div><div className="flex flex-wrap justify-between gap-2"><dt>Equivalent Pet Coke cost</dt><dd className="font-semibold tabular-nums">{formatINR(result.petCokeCost)}</dd></div><div className="border-t border-border pt-4"><dt className="font-semibold">{result.difference < 0 ? "Estimated additional cost / month" : result.difference === 0 ? "Monthly cost difference" : "Estimated savings / month"}</dt><dd className="mt-2 break-words text-3xl font-semibold tabular-nums">{formatINR(Math.abs(result.difference))}</dd></div></dl> : <p className="mt-7 border-t border-border pt-5 text-sm text-muted-foreground">{copy.pricePrompt}</p>}
        </div>
        {message ? <Button asChild className="mt-7 h-auto min-h-12 w-full whitespace-normal py-4"><a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{copy.calculatorQuote}<ArrowUpRight aria-hidden="true" /></a></Button> : <Button disabled className="mt-7 h-auto min-h-12 w-full whitespace-normal py-4"><MessageCircle aria-hidden="true" />{copy.calculatorQuote}</Button>}
      </div>
    </div>
    <p className="mt-8 border-l-2 border-lime pl-4 text-xs leading-6 text-muted-foreground">{copy.calculatorNote}</p>
  </div></section>;
}