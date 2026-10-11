import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Fuel, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { site, whatsappUrl } from "@/data/site";

const petCoke = products.find((product) => product.id === "pet-coke");
const pageUrl = "https://coal-visual-connect.lovable.app/pet-coke-price";
const title = "Pet Coke Price in India & Specifications | Dhanraj Coal Transport";
const description = "Request the latest Pet Coke price in India. Compare typical GCV, sulphur, ash and moisture specifications for bulk cement, boiler and kiln supply.";

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
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: petCoke ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: petCoke.name,
        description: `Bulk ${petCoke.name} for ${petCoke.detail}. Typical GCV ${petCoke.gcv} kcal/kg, sulphur ${petCoke.sulphur}, ash ${petCoke.ash} and moisture ${petCoke.moisture}.`,
        brand: { "@type": "Brand", name: site.brand },
        additionalProperty: [
          { "@type": "PropertyValue", name: "GCV", value: `${petCoke.gcv} kcal/kg` },
          { "@type": "PropertyValue", name: "Sulphur", value: petCoke.sulphur },
          { "@type": "PropertyValue", name: "Ash", value: petCoke.ash },
          { "@type": "PropertyValue", name: "Moisture", value: petCoke.moisture },
        ],
      }),
    }] : [],
  }),
  component: PetCokePricePage,
});

function PetCokePricePage() {
  if (!petCoke) return null;
  const enquiry = whatsappUrl("Hello DHANRAJ COAL TRANSPORT, please share your latest Pet Coke price, available quantity, loading point and delivery terms.");
  const specs = [["GCV", `${petCoke.gcv} kcal/kg`], ["Sulphur", petCoke.sulphur], ["Ash", petCoke.ash], ["Moisture", petCoke.moisture]];
  return <main className="min-h-screen bg-background">
    <header className="border-b border-border"><div className="site-shell flex h-20 items-center justify-between"><Link to="/" className="brand-mark"><span className="brand-icon"><Fuel /></span><span><strong>DHANRAJ</strong><small>COAL TRANSPORT</small></span></Link><Button variant="outline" asChild><Link to="/"><ArrowLeft /> Home</Link></Button></div></header>
    <section className="section-pad"><div className="site-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-start"><div><p className="eyebrow">Bulk industrial fuel supply</p><h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-none md:text-7xl">Pet Coke price in India</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Pet Coke pricing changes with origin, sulphur level, quantity, loading point, freight and market availability. Send your destination and required tonnage for a current delivered or ex-yard quote.</p><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" asChild><a href={enquiry} target="_blank" rel="noreferrer"><MessageCircle /> Get latest price</a></Button><Button size="lg" variant="outline" asChild><a href={site.primaryPhoneHref}><Phone /> Call sales</a></Button></div><div className="mt-14"><h2 className="font-display text-3xl font-bold">Typical Pet Coke specifications</h2><p className="mt-3 max-w-2xl text-muted-foreground">These are typical values for product comparison. Exact specifications and test reports are confirmed for each available lot.</p><div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">{specs.map(([label,value])=><div className="bg-card p-6" key={label}><p className="font-mono text-xs uppercase text-muted-foreground">{label}</p><strong className="mt-3 block font-display text-2xl text-foreground">{value}</strong></div>)}</div></div></div><aside className="industrial-card p-7 md:p-9"><p className="status-badge">{petCoke.status}</p><h2 className="mt-6 font-display text-3xl font-bold">Request an accurate quote</h2><ul className="mt-7 space-y-4 text-sm text-muted-foreground">{["Required quantity in metric tons", "Delivery city and state", "Preferred GCV and sulphur range", "Ex-yard or delivered pricing"].map((item)=><li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />{item}</li>)}</ul><div className="mt-8 border-t border-border pt-6"><p className="text-sm text-muted-foreground">Suitable use</p><p className="mt-2 font-semibold text-foreground">{petCoke.detail}</p><p className="mt-6 text-sm text-muted-foreground">Availability</p><p className="mt-2 font-semibold text-foreground">{petCoke.availability}</p></div><Button className="mt-8 w-full" size="lg" asChild><a href={enquiry} target="_blank" rel="noreferrer">Request Pet Coke quote <MessageCircle /></a></Button></aside></div></section>
  </main>;
}