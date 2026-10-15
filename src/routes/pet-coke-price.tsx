import { createFileRoute } from "@tanstack/react-router";
import { PetCokeLanding } from "@/components/PetCokeLanding";
import { petCokeCopy } from "@/data/pet-coke";
import { products } from "@/data/products";
import { site } from "@/data/site";

const petCoke = products.find((product) => product.id === "pet-coke");
const pageUrl = "https://dhanraj-coal-transport.lovable.app/pet-coke-price";
const title = petCokeCopy.title;
const description = petCokeCopy.description;

export const Route = createFileRoute("/pet-coke-price")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: petCoke ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: petCoke.name,
        description,
        brand: { "@type": "Brand", name: site.brand },

      }),
    }] : [],
  }),
  component: PetCokeLanding,
});

