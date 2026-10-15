import { createFileRoute } from "@tanstack/react-router";
import { CoalMinesLanding } from "@/components/CoalMinesLanding";
import { businessId, businessSchema, jsonLd, publicOrigin, seoHead, seoPages } from "@/data/seo";

export const Route = createFileRoute("/coal-mines")({
  staticData: { sitemap: true },
  head: () => ({
    ...seoHead(seoPages.mines),
    scripts: [
      jsonLd(businessSchema),
      jsonLd({
        "@context": "https://schema.org", "@type": "WebPage",
        "@id": `${publicOrigin}/coal-mines#webpage`,
        url: `${publicOrigin}/coal-mines`, name: seoPages.mines.title,
        description: seoPages.mines.description, about: { "@id": businessId },
      }),
    ],
  }),
  component: CoalMinesLanding,
});
