import heroMine from "@/assets/hero-mine.jpg";
import loadingSite from "@/assets/loading-site.jpg";
import founder from "@/assets/founder.jpg";
import pDomestic from "@/assets/p-domestic.jpg";
import pImported from "@/assets/p-imported.jpg";
import pPetcoke from "@/assets/p-petcoke.jpg";
import pWood from "@/assets/p-woodcoal.jpg";
import impactAerial from "@/assets/impact-aerial.jpg";
import aCement from "@/assets/a-cement.jpg";
import aTrucks from "@/assets/a-trucks.jpg";
import aSteel from "@/assets/a-steel.jpg";

export const home = {
  hero: {
    image: heroMine,
    title: ["Reliable Coal Supply,", "Delivered Across India."],
    cta: "Get a Quote",
    footnote: "Domestic & imported coal, pet coke and wood coal — moved from mines and ports to your plant with dependable logistics.",
    badge: "" as string, // add an approved claim here once the client confirms it
  },
  about: {
    label: "About us",
    title: ["Rooted in the Mines,", "Driven by Trust."],
    image: loadingSite,
    values: [
      ["Verified Quality", "Every load is GCV-checked so what arrives matches the docket."],
      ["On-time Dispatch", "Fleet-managed road, rail and port-to-plant delivery across India."],
      ["Fair Pricing", "Transparent mine, port and vessel-wise rates with no hidden costs."],
    ] as const,
  },
  quote: {
    approved: false, // founder name, photo and words not yet supplied
    image: founder,
    text: "At Dhanraj Coal Transport, we believe real progress is measured not just by how many tons we move, but by the trust we keep. Every dispatch is guided by honesty, quality and commitment — so the industries we serve can keep running without worry.",
    name: "Founder",
    role: "Dhanraj Coal Transport",
  },
  products: {
    label: "Our products",
    title: ["Quality Fuel,", "Real Results."],
    intro: "Every grade is sourced, tested and dispatched to match your furnace and budget.",
    images: { domestic: pDomestic, imported: pImported, "pet-coke": pPetcoke, "wood-coal": pWood } as Record<string, string>,
  },
  impact: {
    approved: false, // numbers below await client confirmation
    label: "Our impact",
    title: ["Real Supply,", "Measurable Results."],
    intro: "Every number reflects a plant kept running and a promise delivered on time.",
    image: impactAerial,
    stats: [
      ["63,000", "MT dispatched every month"],
      ["100", "Industrial clients across India"],
      ["15", "Indian ports covered"],
      ["28", "States delivered"],
    ] as const,
  },
  updates: {
    label: "Industries & updates",
    title: "Who We Power",
    filters: ["All", "Industries", "Logistics"] as const,
    items: [
      { tag: "Industries", image: aCement, date: "Cement", title: "Fuel for Cement Plants", text: "High-CV pet coke and imported coal matched to kiln demand." },
      { tag: "Logistics", image: aTrucks, date: "Road freight", title: "PAN-India Truck Dispatch", text: "Fleet-managed convoys from Dhanbad, Talcher and Ramgarh to your gate." },
      { tag: "Industries", image: aSteel, date: "Steel", title: "Steady Supply for Steel", text: "Low-ash, verified GCV coal that keeps furnaces running at full output." },
    ],
  },
  cta: { title: ["Let's Build Reliable", "Supply Together"], button: "Contact Our Team" },
};
