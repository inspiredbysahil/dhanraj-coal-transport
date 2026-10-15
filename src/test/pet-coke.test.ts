import { describe, expect, it } from "vitest";
import { calculateHeat, heatDefaults, heatQuoteMessage } from "@/data/pet-coke-calculator";
import { petCokeDestinations, petCokeFilters, petCokeQuoteUrl } from "@/data/pet-coke";

describe("Pet Coke buyer references and enquiries", () => {
  it("has four destinations without invented supply rows", () => {
    expect(petCokeDestinations).toHaveLength(4);
    expect(petCokeFilters).toHaveLength(5);
    for (const port of petCokeDestinations) {
      const url = new URL(petCokeQuoteUrl(port));
      expect(url.pathname).toBe("/916376139600");
      expect(url.searchParams.get("text")).toContain(port);
      expect(url.searchParams.get("text")).toContain("lot lab report");
    }
  });
  it("calculates gross heat without inventing prices", () => {
    const result = calculateHeat(heatDefaults);
    expect(result.equivalentMT).toBeCloseTo(335.3658536585);
    expect(result.difference).toBeNull();
  });
  it("compares costs using unrounded quantities", () => {
    const result = calculateHeat({ ...heatDefaults, coalPrice: "9000", petCokePrice: "11000" });
    expect(result.coalCost).toBe(4500000);
    expect(result.petCokeCost).toBeCloseTo(3689024.39024);
    expect(result.difference).toBeCloseTo(810975.60976);
    expect(calculateHeat({ ...heatDefaults, coalPrice: "6000", petCokePrice: "15000" }).difference).toBeLessThan(0);
  });
  it("handles decimal quantities and zero cost difference", () => {
    expect(calculateHeat({ ...heatDefaults, coalMT: "100.5", coalGCV: "8200", coalPrice: "9000", petCokePrice: "9000" }).difference).toBe(0);
  });
  it.each(["", "0", "-1", "NaN", "Infinity"])("rejects invalid GCV %s", (value) => {
    const input = { ...heatDefaults, petCokeGCV: value };
    expect(calculateHeat(input).equivalentMT).toBeNull();
    expect(heatQuoteMessage(input)).toBeNull();
  });
  it("rejects invalid prices without hiding valid heat comparison", () => {
    const result = calculateHeat({ ...heatDefaults, coalPrice: "-5" });
    expect(result.equivalentMT).not.toBeNull();
    expect(result.errors.coalPrice).toBeTruthy();
    expect(result.difference).toBeNull();
  });
  it("includes references and entered prices in request", () => {
    const message = heatQuoteMessage({ ...heatDefaults, coalPrice: "9000", petCokePrice: "11000" });
    expect(message).toContain("335.37 MT");
    expect(message).toContain("Buyer-entered coal comparison price: ₹9000/ton");
    expect(message).toContain("5500 kcal/kg");
    expect(message).toContain("8200 kcal/kg");
  });
});