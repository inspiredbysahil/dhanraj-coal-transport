import { describe, expect, it } from "vitest";
import { emptyQuote, quoteMailto, quoteSchema, quoteWhatsappMessage, prefillFromRate } from "@/data/quote-request";
import { rates } from "@/data/rates";
const ok = { ...emptyQuote, name: "Rajesh - PM", company: "ABC Steel", phone: "+91 98765 43210", fuel: "Pet Coke (Kandla / Tuna / Navlakhi / Refinery)", quantity: "250", mode: "By Rail Rake", location: "Raipur, CG 492001" };
describe("quote request", () => {
  it("accepts a valid form and normalises phone", () => { const r = quoteSchema.parse(ok); expect(r.phone).toBe("9876543210"); });
  it("accepts mobile numbers starting with 91 and strips country/leading-zero prefixes", () => {
    expect(quoteSchema.parse({ ...ok, phone: "9123456789" }).phone).toBe("9123456789");
    expect(quoteSchema.parse({ ...ok, phone: "+919876543210" }).phone).toBe("9876543210");
    expect(quoteSchema.parse({ ...ok, phone: "919876543210" }).phone).toBe("9876543210");
    expect(quoteSchema.parse({ ...ok, phone: "098765 43210" }).phone).toBe("9876543210");
  });
  it("rejects bad phone, below-MOQ and missing fuel", () => {
    const r = quoteSchema.safeParse({ ...ok, phone: "12345", quantity: "50", fuel: "" });
    expect(r.success).toBe(false); expect(r.error!.issues.map((i) => i.path[0]).sort()).toEqual(["fuel", "phone", "quantity"]);
  });
  it("builds messages", () => {
    const d = quoteSchema.parse(ok);
    expect(quoteWhatsappMessage(d)).toContain("• Quantity: 250 MT");
    expect(decodeURIComponent(quoteMailto(d, "a@b.com"))).toContain("B2B Coal/Pet Coke Quotation Request - ABC Steel (250 MT)");
  });
  it("prefills from a rate row", () => { expect(prefillFromRate(rates[0]!).fuel).toBe("Domestic Coal (Mine Lifting)"); });
});
