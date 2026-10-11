import { createFileRoute } from "@tanstack/react-router";
import { DhanrajSite } from "@/components/DhanrajSite";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: site.seoTitle },
      { name: "description", content: site.seoDescription },
      { property: "og:title", content: site.seoTitle },
      { property: "og:description", content: site.seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A0A0B" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "LocalBusiness", name: site.brand,
      description: site.seoDescription, telephone: site.primaryPhone, taxID: site.gstin,
      address: { "@type": "PostalAddress", streetAddress: "Mouza Deulbeda", addressLocality: "Talcher", addressRegion: "Odisha", postalCode: "759107", addressCountry: "IN" },
      areaServed: "India", priceRange: "₹₹₹",
    }) }],
  }),
  component: DhanrajSite,
});
