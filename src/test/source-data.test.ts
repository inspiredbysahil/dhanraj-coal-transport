import { describe, expect, it } from "vitest";
import { mines, countsByState } from "@/data/mines";
import { ports } from "@/data/ports";

describe("imported source data", () => {
  it("matches mine counts per state from the PDF", () => {
    expect(mines).toHaveLength(139);
    expect(countsByState(mines)).toEqual({ "West Bengal": 16, Chhattisgarh: 20, "Madhya Pradesh": 16, Telangana: 19, Jharkhand: 19, Odisha: 20, Maharashtra: 1, Nagaland: 4, Assam: 10, Meghalaya: 14 });
  });
  it("matches port counts per state and page from the PDF", () => {
    expect(ports).toHaveLength(30);
    expect(countsByState(ports)).toEqual({ "West Bengal": 2, Odisha: 3, "Andhra Pradesh": 5, "Tamil Nadu": 5, Kerala: 2, Karnataka: 1, Goa: 1, Maharashtra: 5, Gujarat: 6 });
    expect(countsByState(ports.map((p) => ({ state: String(p.sourcePage) })))).toEqual({ "1": 7, "2": 11, "3": 12 });
  });
  it("keeps source label and page on every record, with unique ids", () => {
    for (const r of [...mines, ...ports]) { expect(r.sourceLabel).toBeTruthy(); expect(r.sourcePage).toBeGreaterThan(0); }
    expect(new Set([...mines, ...ports].map((r) => r.id)).size).toBe(169);
    for (const m of mines) if (m.reviewNotes.length || Object.values(m).includes("unknown")) expect(m.needsReview).toBe(true);
  });
});
