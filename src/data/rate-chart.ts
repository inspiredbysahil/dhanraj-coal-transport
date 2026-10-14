import type { Rate } from "./rates";

export type RateSortKey = keyof Pick<Rate, "category" | "gcv" | "source" | "grade" | "qty" | "rate">;
export const rateFilters = [
  { label: "All", category: "" },
  { label: "Domestic Mine", category: "Domestic (Mine)" },
  { label: "Domestic Port", category: "Domestic (Port)" },
  { label: "Imported Vessel", category: "Imported (Navlakhi)" },
  { label: "Kandla / Tuna", category: "Port (Kandla/Tuna)" },
] as const;
export const rateColumns: { key: RateSortKey; label: string }[] = [
  { key: "category", label: "Source Type" },
  { key: "gcv", label: "GCV / GAR" },
  { key: "source", label: "Location / Port" },
  { key: "grade", label: "Grade / Vessel" },
  { key: "qty", label: "Avail. Qty (MT)" },
  { key: "rate", label: "Rate (₹/Ton)" },
];
export const rateChartCopy = {
  remarks: "Remarks", action: "Action", search: "Search Port, Mine, or GCV…",
  empty: "No rates match your search.", quote: "WhatsApp quote",
};