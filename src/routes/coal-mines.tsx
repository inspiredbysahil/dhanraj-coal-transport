import { createFileRoute } from "@tanstack/react-router";
import { CoalMinesDirectory } from "@/components/CoalMinesDirectory";

const pageUrl = "https://dhanraj-coal-transport.lovable.app/coal-mines";
const title = "Coal Mines Directory India by State & Operator | Dhanraj Coal Transport";
const description = "Browse Indian coal mines, coalfields and operators by state — West Bengal, Jharkhand, Odisha, Chhattisgarh and more — with search and filters.";

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
  component: CoalMinesDirectory,
});
