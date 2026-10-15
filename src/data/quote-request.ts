import { z } from "zod";
import { site } from "@/data/site";
import type { Rate } from "@/data/rates";

/** Client-confirmed address; the email card and button are live. */
export const contactEmail: string | null = "dhanrajcoaltransport@gmail.com";

export const quoteCopy = {
  eyebrow: "DIRECT DISPATCH & QUOTATION DESK",
  title: "Get Today's Confirmed Landed Rate to Your Plant.",
  sub: "Share your furnace specs and delivery location. Our logistics desk will calculate the exact ex-mine/port rate + road/rail freight and respond within 15 minutes.",
  phoneBadge: "Mon–Sat · 9:00 AM – 8:00 PM IST",
  whatsappLabel: "WhatsApp Desk",
  whatsappBadge: "Instant Rate Sheet & Lab Reports",
  emailLabel: "Email · Tenders & Proforma",
  formTitle: "Request a Landed-Price Quotation",
  formNote: "Fields marked * are required. WhatsApp opens with your details filled in — you press send there.",
  whatsappButton: "Send Inquiry on WhatsApp (Instant Quote)",
  emailButton: "Send via Email for Formal Quotation",
  emailSoon: "Email address coming soon — please use WhatsApp for now.",
  emailToast: "Quotation request prepared!",
  opened: "WhatsApp opened in a new tab. Your enquiry is sent only after you press send in WhatsApp.",
  blocked: "Your browser blocked the new tab.",
  minimumMT: 100,
};

export const fuelCategories = [
  "Domestic Coal (Mine Lifting)",
  "Imported Indonesian / SA Coal",
  "Pet Coke (Kandla / Tuna / Navlakhi / Refinery)",
  "Wood Coal / Charcoal",
] as const;

export const gradeOptions = [
  "6500–7000 GCV (Dhanbad/Ramgarh)",
  "5500–6000 GCV",
  "5400–5800 GAR (Navlakhi)",
  "Pet Coke 8000+ GCV (Kandla/Tuna)",
  "Need Lab Recommendation",
  "Other (mention in remarks)",
] as const;

export const quantityChips = [
  { label: "100 MT (MOQ)", value: "100" },
  { label: "250 MT", value: "250" },
  { label: "500 MT", value: "500" },
  { label: "1,000+ MT (Rake)", value: "1000" },
] as const;

export const deliveryModes = ["By Road (Tipper/Trailer)", "By Rail Rake", "Ex-Mine / Ex-Port (Self Lifting)"] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name and designation").max(100),
  company: z.string().trim().min(2, "Enter your company or plant name").max(120),
  phone: z.string().trim().transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, "")).refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().max(120).refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Enter a valid email, or leave it empty"),
  fuel: z.string().refine((v) => (fuelCategories as readonly string[]).includes(v), "Choose a fuel category"),
  grade: z.string().trim().max(160),
  quantity: z.string().trim().refine((v) => /^\d+(\.\d+)?$/.test(v), "Enter quantity in MT").refine((v) => Number(v) >= quoteCopy.minimumMT, `Minimum order is ${quoteCopy.minimumMT} MT`),
  mode: z.string().refine((v) => (deliveryModes as readonly string[]).includes(v), "Choose a delivery mode"),
  location: z.string().trim().min(3, "Enter delivery city, state and pin code").max(160),
  remarks: z.string().trim().max(800, "Please keep remarks under 800 characters"),
});
export type QuoteForm = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteKey = keyof QuoteForm;
export const emptyQuote: QuoteForm = { name: "", company: "", phone: "", email: "", fuel: "", grade: "", quantity: "100", mode: "", location: "", remarks: "" };

export function quoteLines(d: QuoteData) {
  return [
    ["Name & designation", d.name], ["Company / plant", d.company], ["Mobile", `+91 ${d.phone}`], ["Email", d.email],
    ["Fuel category", d.fuel], ["GCV / grade", d.grade], ["Quantity", `${d.quantity} MT`],
    ["Delivery mode", d.mode], ["Delivery location", d.location], ["Remarks", d.remarks],
  ].filter(([, v]) => v).map(([l, v]) => `• ${l}: ${v}`);
}

export function quoteWhatsappMessage(d: QuoteData) {
  return `Hello ${site.brand}, please share a landed-price quotation:\n\n${quoteLines(d).join("\n")}`;
}

export function quoteMailto(d: QuoteData, to: string) {
  const subject = `B2B Coal/Pet Coke Quotation Request - ${d.company} (${d.quantity} MT)`;
  const body = `Dear ${site.brand} team,\n\nPlease send a formal quotation for:\n\n${quoteLines(d).join("\n")}\n\nThank you.`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function fuelForProduct(name: string): string | undefined {
  if (/pet/i.test(name)) return fuelCategories[2];
  if (/import/i.test(name)) return fuelCategories[1];
  if (/wood/i.test(name)) return fuelCategories[3];
  if (/domestic/i.test(name)) return fuelCategories[0];
  return undefined;
}

export function prefillFromRate(r: Rate): Partial<QuoteForm> {
  const fuel = r.category.startsWith("Imported") ? fuelCategories[1] : r.category.startsWith("Port") ? fuelCategories[2] : fuelCategories[0];
  return { fuel, grade: `${r.gcv} ${/GAR/.test(r.gcv) ? "" : "GCV "}· ${r.grade} · ${r.source}`.replace(/\s+/g, " ") };
}
