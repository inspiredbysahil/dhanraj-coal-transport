import { ports, type PortRecord } from "@/data/ports";

export const portsCopy = {
  seoTitle: "Indian Ports Directory by State — Dhanraj Coal Transport",
  seoDescription: "Source-listed Indian ports across 9 states, from Haldia to Pipavav, with search, state filter and PDF page references. Availability confirmed on enquiry.",
  eyebrow: "Indian ports directory",
  title: "Indian Ports by State",
  intro: "Ports as listed in our source document, grouped by state. Use it to tell us which port you want material from.",
  notice: "Source-listed ports only. Listing does not mean current stock or an active Dhanraj supply location. Confirm availability on enquiry.",
  search: "Search port name…",
  allStates: "All states",
  reset: "Reset filters",
  empty: "No ports match your filters",
  enquiry: "Hello DHANRAJ COAL TRANSPORT, I found a port in your Indian Ports directory and would like to enquire about availability.",
};

export const portStates = [...new Set(ports.map((p) => p.state))];

export function filterPorts(list: PortRecord[], query: string, state: string) {
  const q = query.trim().toLowerCase();
  return list.filter((p) => (!state || p.state === state) && (!q || p.portName.toLowerCase().includes(q) || p.sourceLabel.toLowerCase().includes(q)));
}

export function groupPorts(list: PortRecord[]) {
  return portStates.map((state) => ({ state, items: list.filter((p) => p.state === state) })).filter((g) => g.items.length);
}
