import { describe, expect, it } from "vitest";
import { liftingHubs, hubRateRows, hubReference, liftingQuoteUrl, nonCokingGrades, washeryGrades, gcvBandLabel } from "@/data/coal-mines-landing";
import { rates } from "@/data/rates";

describe("Coal Mines supply references", () => {
  it("only maps exact source-location listings and never invents central inventory", () => {
    expect(liftingHubs).toHaveLength(4);
    for (const hub of liftingHubs) {
      expect(hubRateRows(hub)).toEqual(rates.filter(row => hub.sourceLocations.includes(row.source)));
      expect(hubRateRows(hub).every(row => rates.includes(row))).toBe(true);
    }
    const central = liftingHubs.find(hub => hub.id === "central-eastern");
    if (!central) throw new Error("Missing central hub");
    expect(hubReference(central)).toEqual({ rows: [], grades: [], gcv: "Confirm on enquiry" });
  });
  it("derives location reference bands without aggregating stock", () => {
    const expected = ["5,500–7,000 kcal/kg", "4,500–6,500 kcal/kg", "5,500 kcal/kg", "Confirm on enquiry"];
    expect(liftingHubs.map(hub => hubReference(hub).gcv)).toEqual(expected);
    const dhanbad = liftingHubs.find(hub => hub.id === "dhanbad");
    if (!dhanbad) throw new Error("Missing Dhanbad hub");
    expect(hubReference(dhanbad).grades).not.toContain("Steam");
  });
  it("prefills each hub and the right WhatsApp recipient", () => {
    for (const hub of liftingHubs) {
      const url = new URL(liftingQuoteUrl(hub));
      expect(url.origin + url.pathname).toBe("https://wa.me/916376139600");
      const text = url.searchParams.get("text") ?? "";
      for (const field of [hub.name, hub.region, "GCV", "ash %", "stock (MT)", "freight", "Delivery city / state", "minimum 100 MT"]) expect(text).toContain(field);
    }
  });
  it("preserves official non-coking boundaries G1–G12", () => {
    expect(nonCokingGrades).toHaveLength(12);
    expect(nonCokingGrades[0]).toEqual({ grade: "G1", lowerExclusive: 7000, upperInclusive: null });
    expect(nonCokingGrades[11]).toEqual({ grade: "G12", lowerExclusive: 3700, upperInclusive: 4000 });
    for (let i = 1; i < nonCokingGrades.length; i++) expect(nonCokingGrades[i]?.upperInclusive).toBe(nonCokingGrades[i - 1]?.lowerExclusive);
    const g2 = nonCokingGrades.find(grade => grade.grade === "G2");
    if (!g2) throw new Error("Missing G2 grade");
    expect(gcvBandLabel(g2)).toBe("> 6,700 to ≤ 7,000");
  });
  it("classifies washery grades by ash, not fabricated GCV", () => {
    expect(washeryGrades.map(row => [row.lowerExclusive, row.upperInclusive])).toEqual([[18, 21], [21, 24], [24, 28], [28, 35]]);
    for (const row of washeryGrades) expect(row).not.toHaveProperty("gcv");
  });
});