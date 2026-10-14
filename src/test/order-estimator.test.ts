import { describe, expect, it } from "vitest";
import { rates } from "@/data/rates";
import { estimateOrder, formatINR, gradeOptionLabel, orderMessage } from "@/data/order-estimator";
import { whatsappUrl } from "@/data/site";

describe("Quick Order & Tax Estimator", () => {
  const rate = rates[0];
  if (!rate) throw new Error("Missing test rate");
  it("calculates base, GST and total at the minimum quantity", () => {
    expect(estimateOrder(rate, "100")).toEqual({ mt: 100, base: 920000, gst: 165600, total: 1085600 });
    expect(formatINR(1085600)).toBe("₹10,85,600.00");
  });
  it("supports other grades and decimal quantities", () => {
    const other = rates[1];
    if (!other) throw new Error("Missing second rate");
    expect(estimateOrder(other, "100.5")).toEqual({ mt: 100.5, base: 773850, gst: 139293, total: 913143 });
    expect(gradeOptionLabel(other)).toContain("6500–6800");
    expect(gradeOptionLabel(other)).toContain("Dhanbad");
  });
  it.each(["", " ", "99.99", "0", "-100", "NaN", "Infinity", "1e309"])("rejects invalid quantity %s", (quantity) => {
    expect(estimateOrder(rate, quantity)).toBeNull();
    expect(orderMessage(rate, quantity, "Morbi, Gujarat")).toBeNull();
  });
  it("rejects empty destinations", () => {
    expect(orderMessage(rate, "100", "   ")).toBeNull();
  });
  it("safely encodes a complete request to the business phone", () => {
    const message = orderMessage(rate, "100", " Morbi & Rajkot, Gujarat ");
    if (!message) throw new Error("Expected valid request");
    const url = new URL(whatsappUrl(message));
    expect(url.pathname).toBe("/916376139600");
    expect(url.searchParams.get("text")).toBe(message);
    for (const part of [rate.grade, rate.category, rate.gcv, rate.source, "100 MT", "Morbi & Rajkot, Gujarat", "₹9,20,000.00", "₹1,65,600.00", "₹10,85,600.00", "14", rate.remarks]) {
      if (part !== "14") expect(message).toContain(part);
    }
    expect(message).toContain("12 July 2026");
    expect(message).toContain("final landed price including freight");
  });
});