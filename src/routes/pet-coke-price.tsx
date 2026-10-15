import { createFileRoute } from "@tanstack/react-router";
import { PetCokeLanding } from "@/components/PetCokeLanding";
import { products } from "@/data/products";
import { businessId, businessSchema, jsonLd, publicOrigin, seoHead, seoPages } from "@/data/seo";

const petCoke = products.find((product) => product.id === "pet-coke");

export const Route = createFileRoute("/pet-coke-price")({
  staticData: { sitemap: true },
  head: () => ({
    ...seoHead(seoPages.petCoke),
    scripts: [jsonLd(businessSchema), ...(petCoke ? [jsonLd({
        "@context": "https://schema.org",
        "@type": "Product",
        name: petCoke.name,
        "@id": `${publicOrigin}/pet-coke-price#product`,
        url: `${publicOrigin}/pet-coke-price`,
        description: seoPages.petCoke.description,
        brand: { "@id": businessId },
      })] : [])],
  }),
  component: PetCokeLanding,
});

