import minePhoto from "@/assets/hero-mine.jpg";
import { rates, effectiveDateLabel, type Rate } from "@/data/rates";
import { whatsappUrl } from "@/data/site";

export type LiftingHub = {
  id: string;
  name: string;
  region: string;
  context: string;
  sourceLocations: readonly string[];
};

export const liftingHubs: readonly LiftingHub[] = [
  { id: "dhanbad", name: "Dhanbad", region: "BCCL / Jharia", context: "Jharkhand", sourceLocations: ["Dhanbad"] },
  { id: "ramgarh", name: "Ramgarh", region: "CCL", context: "Jharkhand", sourceLocations: ["Ramgarh"] },
  { id: "raniganj", name: "Raniganj", region: "ECL", context: "West Bengal", sourceLocations: ["Raniganj"] },
  { id: "central-eastern", name: "Central/Eastern Coalfields", region: "Source-specific enquiries", context: "Central & Eastern India", sourceLocations: [] },
];

export function hubRateRows(hub: LiftingHub): Rate[] {
  return rates.filter((row) => hub.sourceLocations.includes(row.source));
}

export function hubReference(hub: LiftingHub) {
  const rows = hubRateRows(hub);
  const bands = rows.flatMap((row) => {
    const match = row.gcv.match(/^(\d+)(?:[–-](\d+))?$/);
    if (!match?.[1]) return [];
    return [Number(match[1]), Number(match[2] ?? match[1])];
  });
  const gcv = bands.length
    ? `${Math.min(...bands).toLocaleString("en-IN")}${Math.min(...bands) === Math.max(...bands) ? "" : `–${Math.max(...bands).toLocaleString("en-IN")}`} kcal/kg`
    : coalMinesCopy.confirm;
  return { rows, grades: [...new Set(rows.map((row) => row.grade))], gcv };
}

export function liftingQuoteMessage(hub?: LiftingHub): string {
  const name = hub ? `${hub.name} (${hub.region})` : "Indian coal mine / coalfield supply";
  return `Hello DHANRAJ COAL TRANSPORT, I need a lifting quote for ${name}. Please confirm available coal types (Coking ROM, Steam or Slack), grade and GCV (kcal/kg), ash %, moisture, current available stock (MT), lifting terms and final landed price including freight to my plant.\nQuantity (minimum 100 MT):\nDelivery city / state:\nRequired dispatch date:`;
}

export const liftingQuoteUrl = (hub?: LiftingHub) => whatsappUrl(liftingQuoteMessage(hub));

export type NonCokingGrade = { grade: string; lowerExclusive: number; upperInclusive: number | null };
export const nonCokingGrades: readonly NonCokingGrade[] = Array.from({ length: 12 }, (_, i) => ({
  grade: `G${i + 1}`, lowerExclusive: 7000 - i * 300, upperInclusive: i === 0 ? null : 7300 - i * 300,
}));
export const washeryGrades = [
  { grade: "W-I", lowerExclusive: 18, upperInclusive: 21 },
  { grade: "W-II", lowerExclusive: 21, upperInclusive: 24 },
  { grade: "W-III", lowerExclusive: 24, upperInclusive: 28 },
  { grade: "W-IV", lowerExclusive: 28, upperInclusive: 35 },
] as const;

export function gcvBandLabel(grade: NonCokingGrade): string {
  const lower = grade.lowerExclusive.toLocaleString("en-IN");
  return grade.upperInclusive === null ? `> ${lower}` : `> ${lower} to ≤ ${grade.upperInclusive.toLocaleString("en-IN")}`;
}

export const qualitySteps = [
  { icon: "sorting", title: "Siding Crushing & Stone Sorting", detail: "Coal is crushed and stone-sorted at the siding for a cleaner, plant-ready load." },
  { icon: "verification", title: "Pre-Dispatch GCV & Moisture Verification", detail: "GCV and moisture are checked before dispatch against your agreed fuel requirements." },
  { icon: "logistics", title: "GPS-Tracked Road & Rake Logistics", detail: "GPS-tracked logistics coordinate road movements and rake dispatch from source to your plant." },
] as const;

export const coalMinesCopy = {
  photo: minePhoto,
  photoAlt: "Illustrative aerial view of an open-pit coal mine and haul roads",
  heroLabel: "Mine lifting · Industrial coal supply",
  heroTitle: "Coal Mines & Plant Supply",
  heroIntro: "Source your industrial fuel from India's coalfield regions. Match the grade, confirm lifting availability and arrange transport to your plant.",
  heroQuote: "Request a Lifting Quote",
  heroDirectory: "Browse the Mines Directory",
  minimum: "100 MT minimum order",
  heroNote: "Grade, availability and landed price confirmed on enquiry.",
  hubsLabel: "Choose your lifting region",
  hubsTitle: "Major Coalfields & Lifting Hubs",
  hubsIntro: "A starting point for your next bulk order — with source-listed grades and a direct line to our supply team.",
  referenceDate: effectiveDateLabel,
  datedNotice: `Reference listings dated ${effectiveDateLabel} — not live inventory. Hub names identify enquiry regions; listed specifications are location-level, not individual-mine or operator-specific guarantees.`,
  coalTypes: "Coal types / listed grades",
  gcv: "Reference GCV",
  ash: "Ash %",
  stock: "Current available stock (MT)",
  confirm: "Confirm on enquiry",
  missingTypes: "Coking ROM, Steam & Slack — confirm on enquiry",
  typesNote: "Steam / Slack availability: confirm on enquiry.",
  viewGrades: "View listed grades",
  historicalQuantity: "Reference quantity (MT)",
  quote: "Get Lifting Quote on WhatsApp",
  chartLabel: "Fuel specification reference",
  chartTitle: "Quick Grade-to-GCV Reference Chart",
  chartIntro: "Match your boiler's fuel specification before requesting a source-specific quote.",
  nonCokingTitle: "Indian non-coking coal · G1–G12",
  nonCokingNote: "Selected grades from the full G1–G17 classification. GCV in kcal/kg, as-received basis.",
  washeryTitle: "Coking coal · Washery W-I–W-IV",
  washeryNote: "Washery grades are classified by ash content, not fixed GCV bands. This selection is part of the W-I–W-VI scale.",
  labReport: "Confirm from lab report",
  officialSource: "Ministry of Coal · Official grade classification",
  officialUrl: "https://coal.gov.in/major-statistics/coal-grades",
  chartDisclaimer: "Classification reference only, not a stock list. The source-specific lab report and agreed specification determine suitability for your plant.",
  qualityLabel: "Quality from source to delivery",
  qualityTitle: "Mine-to-Plant Quality Guarantee",
  qualityIntro: "Three checkpoints for your industrial fuel supply.",
  closeTitle: "Ready to plan your next lifting?",
  closeIntro: "Share your coalfield, required grade, quantity and plant location. Our team will confirm availability and freight before you commit.",
  closeQuote: "Get a Mine-to-Plant Quote",
  footnote: "WhatsApp opens with your request. Send it there to start your enquiry.",
  directoryTitle: "Indian Coal Mines by State & Operator",
  seoTitle: "Coal Mine Supply & Lifting Quotes | Dhanraj Coal Transport",
  seoDescription: "Explore Dhanbad, Ramgarh and Raniganj coal supply regions, Indian coal grade references and a searchable mines directory. Request a mine-to-plant lifting quote.",
};