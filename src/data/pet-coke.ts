import photo from "@/assets/p-petcoke.jpg";
import { whatsappUrl } from "@/data/site";

export const petCokeCopy = {
  title: "Pet Coke Price & Heat Value | Dhanraj Coal Transport",
  description: "Compare typical Pet Coke specifications, request port-specific prices and calculate equivalent heat value and monthly fuel costs for industrial buying.",
  heroLabel: "Industrial fuel · Bulk enquiries",
  heroTitle: "Pet Coke for industrial buyers",
  heroIntro: "Compare fuel specifications and heat value. Request current port or refinery pricing, lot reports and delivery terms for your plant.",
  heroQuote: "Request Pet Coke price",
  heroNote: "100 MT minimum order · Price and availability confirmed on enquiry",
  photo,
  photoAlt: "Petroleum coke material for industrial fuel supply",
  specsTitle: "Technical Specification Bar",
  specsNote: "Typical buying references only. Exact specifications, GCV basis and grinding suitability must be checked against the lot’s lab report.",
  ratesTitle: "Pet Coke Rate & Port Availability",
  ratesNote: "Current prices and stock confirmed on enquiry. These are enquiry destinations, not verified available lots or a live stock feed.",
  confirm: "Confirm on enquiry",
  remarks: "+18% GST · TCS as applicable · Freight extra",
  quote: "WhatsApp Quote",
  calculatorTitle: "Coal vs. Pet Coke Heat Value Calculator",
  calculatorNote: "Equal gross heat comparison assumes equal efficiency and matching GCV bases. Excludes freight, GST, TCS and plant-conversion costs. Check sulfur limits, equipment compatibility and actual efficiency before switching fuels.",
  calculatorQuote: "Request Today’s Pet Coke Rate on WhatsApp",
  priceNote: "Buyer-entered comparison prices, not verified current rates.",
  pricePrompt: "Enter both prices to compare monthly fuel costs.",
} as const;

export const petCokeSpecs = [
  { label: "GCV", value: "7,800–8,500", unit: "kcal/kg", icon: "heat" },
  { label: "Ash Content", value: "< 1%", unit: "Typical reference", icon: "ash" },
  { label: "Total Moisture", value: "< 8%", unit: "Typical reference", icon: "water" },
  { label: "HGI", value: "35–75+", unit: "Grindability index", icon: "grind" },
] as const;

export const petCokeDestinations = ["Kandla Port", "Tuna Port", "Navlakhi Port", "Domestic Refinery"] as const;
export type PetCokeDestination = typeof petCokeDestinations[number];
export const petCokeFilters = ["All Origins", ...petCokeDestinations] as const;
export const petCokeColumns = ["Origin/Port", "Type (US Gulf / Saudi / Refinery)", "GCV (GAR/ADB)", "Sulfur %", "Rate (₹/Ton)", "Remarks (+18% GST + TCS)", "Action"] as const;

export function petCokeQuoteMessage(destination?: PetCokeDestination) {
  return `Hello DHANRAJ COAL TRANSPORT, please share today’s Pet Coke quote${destination ? ` for ${destination}` : ""}.\nPlease confirm actual origin/type (US Gulf / Saudi / Refinery), GCV and basis (GAR/ADB), sulfur %, lot lab report, current stock in MT, price per ton, GST, applicable TCS, loading and freight terms.\nRequired quantity (minimum 100 MT):\nDelivery city / state:\nPreferred dispatch date:`;
}
export const petCokeQuoteUrl = (destination?: PetCokeDestination) => whatsappUrl(petCokeQuoteMessage(destination));