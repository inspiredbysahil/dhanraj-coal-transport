import { describe, expect, it } from "vitest";
import { businessId, businessSchema, jsonLd, publicOrigin, seoHead, seoPages } from "@/data/seo";
import { faq } from "@/data/faq";

describe("B2B SEO metadata", () => {
  it("provides unique titles and self-referencing canonical/social URLs", () => {
    expect(new Set(Object.values(seoPages).map((page) => page.title)).size).toBe(3);
    for (const page of Object.values(seoPages)) {
      const head = seoHead(page);
      expect(head.links).toEqual([{ rel: "canonical", href: `${publicOrigin}${page.path}` }]);
      expect(head.meta).toContainEqual({ title: page.title });
      expect(head.meta).toContainEqual({ name: "description", content: page.description });
      expect(head.meta).toContainEqual({ property: "og:url", content: `${publicOrigin}${page.path}` });
      expect(head.meta).toContainEqual({ property: "og:image", content: `${publicOrigin}${page.image}` });
      expect(head.meta).toContainEqual({ name: "twitter:image", content: `${publicOrigin}${page.image}` });
      expect(head.meta).toContainEqual({ property: "og:image:width", content: "1200" });
      expect(head.meta).toContainEqual({ property: "og:image:height", content: "630" });
      expect(page.description).not.toMatch(/live|today.s/i);
    }
  });

  it("describes the confirmed business and unpriced offers without inventory claims", () => {
    expect(businessSchema["@id"]).toBe(businessId);
    expect(businessSchema.telephone).toBe("+91-63761-39600");
    expect(businessSchema.taxID).toBe("21EWPPR7307G1ZA");
    expect(businessSchema.makesOffer.map((offer) => offer.itemOffered.name)).toEqual([
      "Domestic Coking & Steam Coal", "Imported Indonesian Coal", "Fuel Grade Pet Coke", "Wood Coal",
    ]);
    expect(JSON.stringify(businessSchema)).not.toMatch(/price|availability|rating/i);
    expect(JSON.parse(jsonLd(businessSchema).children)).toEqual(businessSchema);
    expect(jsonLd({ text: "</script>" }).children).not.toContain("</script>");
  });

  it("provides five buyer FAQs with accurate MOQ, taxes, dated rates and response terms", () => {
    expect(faq).toHaveLength(5);
    expect(faq[0]?.[1]).toContain("100 Metric Tons");
    expect(faq[2]?.[1]).toMatch(/12 July 2026/);
    expect(faq[2]?.[1]).toContain("18%");
    expect(faq[2]?.[1]).toContain("not live inventory");
    expect(faq[4]?.[1]).toContain("15 minutes");
    expect(faq[4]?.[1]).toContain("Mon–Sat");
  });
});