import { createFileRoute } from "@tanstack/react-router";
import { CoalMinesLanding } from "@/components/CoalMinesLanding";
import { coalMinesCopy } from "@/data/coal-mines-landing";

const pageUrl = "https://dhanraj-coal-transport.lovable.app/coal-mines";
const title = coalMinesCopy.seoTitle;
const description = coalMinesCopy.seoDescription;

export const Route = createFileRoute("/coal-mines")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary" }, { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
  }),
  component: CoalMinesLanding,
});
