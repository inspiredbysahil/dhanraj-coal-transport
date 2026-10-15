import { site } from "@/data/site";
import { contactEmail } from "@/data/quote-request";

export const publicOrigin = "https://dhanraj-coal-transport.lovable.app";
export const seoSiteName = "Dhanraj Coal Transport (Dhanraj Traders)";

type SeoPage = {
  path: string;
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
  image: string;
  imageAlt: string;
};

export const seoPages = {
  home: {
    path: "/",
    title: "Dhanraj Coal Transport | Coal & Pet Coke Supplier in India",
    description: "Indicative GCV-wise rates for domestic coal and imported Indonesian coal; Pet Coke quotes for Kandla, Navlakhi, Dhanbad & Ramgarh enquiries. Pan-India road & rail dispatch. MOQ 100 MT.",
    socialTitle: "Coal & Pet Coke Rate Chart and Quotes | Dhanraj Coal Transport",
    socialDescription: "Check indicative GCV-wise ₹/ton coal rates and request Pet Coke prices for Kandla, Tuna, Navlakhi, Dhanbad & Ramgarh. Get a landed-price quote on WhatsApp (+91 63761 39600).",
    image: "/share-coal-mine.jpg",
    imageAlt: "Aerial view of an open-pit coal mine with trucks on the haul road",
  },
  mines: {
    path: "/coal-mines",
    title: "Domestic Coal Mine Rates: Dhanbad, Ramgarh & Raniganj | Dhanraj Coal",
    description: "Request direct coal lifting quotes for BCCL Dhanbad, CCL Ramgarh & ECL Raniganj. Explore listed grades and GCV references with lab verification and pan-India logistics.",
    image: "/share-coal-mine.jpg",
    imageAlt: "Open-pit coal mine and haul roads",
  },
  petCoke: {
    path: "/pet-coke-price",
    title: "Pet Coke Price Per Ton & Quotes | Kandla, Tuna & Navlakhi Port",
    description: "Request imported & refinery Pet Coke prices per ton for Kandla, Tuna & Navlakhi. Typical references: 7800–8500 GCV, ash below 1%. MOQ 100 MT; specifications and availability confirmed per lot.",
    image: "/share-pet-coke.jpg",
    imageAlt: "Petroleum coke material for industrial fuel supply",
  },
} satisfies Record<string, SeoPage>;

export function seoHead(page: SeoPage) {
  const url = `${publicOrigin}${page.path}`;
  const image = `${publicOrigin}${page.image}`;
  const socialTitle = page.socialTitle ?? page.title;
  const socialDescription = page.socialDescription ?? page.description;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:site_name", content: seoSiteName },
      { property: "og:title", content: socialTitle },
      { property: "og:description", content: socialDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: page.imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: socialTitle },
      { name: "twitter:description", content: socialDescription },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: page.imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const businessId = `${publicOrigin}/#business`;
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": businessId,
  name: seoSiteName,
  legalName: site.legalName,
  alternateName: site.tradeName,
  url: `${publicOrigin}/`,
  telephone: "+91-63761-39600",
  email: contactEmail,
  taxID: site.gstin,
  areaServed: "India",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mouza Deulbeda",
    addressLocality: "Talcher",
    addressRegion: "Odisha",
    postalCode: "759107",
    addressCountry: "IN",
  },
  makesOffer: ["Domestic Coking & Steam Coal", "Imported Indonesian Coal", "Fuel Grade Pet Coke", "Wood Coal"].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name },
    seller: { "@id": businessId },
  })),
};

export const jsonLd = (schema: object) => ({
  type: "application/ld+json",
  children: JSON.stringify(schema).replace(/</g, "\\u003c"),
});