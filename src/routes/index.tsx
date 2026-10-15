import { createFileRoute } from "@tanstack/react-router";
import { DhanrajSite } from "@/components/DhanrajSite";
import { faq } from "@/data/faq";
import { products } from "@/data/products";
import { businessId, businessSchema, jsonLd, seoHead, seoPages } from "@/data/seo";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    ...seoHead(seoPages.home),
    scripts: [
      jsonLd(businessSchema),
      jsonLd({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      }),
      ...products.map((product) => jsonLd({
        "@context": "https://schema.org", "@type": "Product", name: product.name,
        description: `${product.name} for ${product.detail}. Typical GCV ${product.gcv} kcal/kg, ash ${product.ash}, moisture ${product.moisture} and sulphur ${product.sulphur}.`,
        brand: { "@id": businessId },
        additionalProperty: [
          { "@type": "PropertyValue", name: "GCV", value: `${product.gcv} kcal/kg` },
          { "@type": "PropertyValue", name: "Ash", value: product.ash },
          { "@type": "PropertyValue", name: "Moisture", value: product.moisture },
          { "@type": "PropertyValue", name: "Sulphur", value: product.sulphur },
        ],
      })),
    ],
  }),
  component: DhanrajSite,
});
