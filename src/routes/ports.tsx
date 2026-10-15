import { createFileRoute } from "@tanstack/react-router";
import { PortsDirectory } from "@/components/PortsDirectory";
import { portsCopy } from "@/data/ports-directory";
import { ports } from "@/data/ports";

const pageUrl = "https://dhanraj-coal-transport.lovable.app/ports";
const title = portsCopy.seoTitle;
const description = portsCopy.seoDescription;

export const Route = createFileRoute("/ports")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary" }, { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "ItemList", name: portsCopy.title, numberOfItems: ports.length,
      itemListElement: ports.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.portName}, ${p.state}` })),
    }) }],
  }),
  component: PortsDirectory,
});
