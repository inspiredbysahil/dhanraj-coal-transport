import { effectiveDateLabel, type Rate } from "./rates";
import { site } from "./site";

export const orderSettings = { minimumMT: 100, gstRate: 0.18 } as const;
export const orderCopy = {
  title: "Quick Order & Tax Estimator",
  grade: "Coal grade / vessel",
  quantity: "Quantity (MT)",
  destination: "Delivery City / State",
  destinationPlaceholder: "e.g. Morbi, Gujarat",
  base: "Base Coal Amount",
  gst: "GST (18%)",
  total: "Estimated Total Before Freight",
  unitRate: "Selected rate / MT",
  cta: "Get Final Landed Price (Incl. Freight) on WhatsApp",
  quantityError: "Enter a valid quantity of at least 100 MT.",
  destinationError: "Enter your delivery city / state.",
  caveat: "Indicative estimate only. Freight excluded · TCS as applicable · Subject to availability and final written quotation.",
  updated: "Rate sheet updated:",
  remarks: "Loading / row remarks:",
} as const;

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

export function estimateOrder(rate: Rate, quantity: string) {
  const mt = Number(quantity);
  if (!quantity.trim() || !Number.isFinite(mt) || mt < orderSettings.minimumMT) return null;
  const base = Math.round(mt * rate.rate * 100) / 100;
  const gst = Math.round(base * orderSettings.gstRate * 100) / 100;
  const total = Math.round((base + gst) * 100) / 100;
  if (![base, gst, total].every(Number.isFinite)) return null;
  return { mt, base, gst, total };
}

export function gradeOptionLabel(rate: Rate): string {
  return `${rate.grade} · ${rate.gcv} GCV / GAR · ${rate.source} · ${rate.category} · ${formatINR(rate.rate)}/MT`;
}

export function orderMessage(rate: Rate, quantity: string, destination: string): string | null {
  const estimate = estimateOrder(rate, quantity);
  if (!estimate || !destination.trim()) return null;
  return [
    `Hello ${site.brand}, please share a final landed price including freight and applicable charges.`,
    `Grade / Vessel: ${rate.grade}`,
    `Source Type: ${rate.category}`,
    `GCV / GAR: ${rate.gcv}`,
    `Mine / Port: ${rate.source}`,
    `Listed Rate: ${formatINR(rate.rate)}/MT`,
    `Quantity: ${estimate.mt} MT`,
    `Delivery City / State: ${destination.trim()}`,
    `Base Coal Amount: ${formatINR(estimate.base)}`,
    `GST (18%): ${formatINR(estimate.gst)}`,
    `Estimated Total Before Freight: ${formatINR(estimate.total)}`,
    `Rate sheet updated: ${effectiveDateLabel}`,
    `Loading / row remarks: ${rate.remarks}`,
    orderCopy.caveat,
  ].join("\n");
}