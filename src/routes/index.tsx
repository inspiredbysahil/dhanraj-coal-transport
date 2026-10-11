import { createFileRoute } from "@tanstack/react-router";
import { DhanrajSite } from "@/components/DhanrajSite";
import { site } from "@/data/site";
import { faq } from "@/data/faq";
import { products } from "@/data/products";

const pageUrl = "https://coal-visual-connect.lovable.app/";

export const Route = createFileRoute("/")({
  ssr: false,
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: site.seoTitle },
      { name: "description", content: site.seoDescription },
      { property: "og:title", content: site.seoTitle },
      { property: "og:description", content: site.seoDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#01161E" },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness", name: site.brand,
        url: pageUrl, description: site.seoDescription, telephone: site.primaryPhone, taxID: site.gstin,
        address: { "@type": "PostalAddress", streetAddress: "Mouza Deulbeda", addressLocality: "Talcher", addressRegion: "Odisha", postalCode: "759107", addressCountry: "IN" },
        areaServed: "India", priceRange: "₹₹₹",
      }) },
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      }) },
      ...products.map((product) => ({ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product", name: product.name,
        description: `${product.name} for ${product.detail}. Typical GCV ${product.gcv} kcal/kg, ash ${product.ash}, moisture ${product.moisture} and sulphur ${product.sulphur}.`,
        brand: { "@type": "Brand", name: site.brand },
        additionalProperty: [
          { "@type": "PropertyValue", name: "GCV", value: `${product.gcv} kcal/kg` },
          { "@type": "PropertyValue", name: "Ash", value: product.ash },
          { "@type": "PropertyValue", name: "Moisture", value: product.moisture },
          { "@type": "PropertyValue", name: "Sulphur", value: product.sulphur },
        ],
      }) })),
    ],
  }),
  component: DhanrajSite,
});
