import { describe, expect, it } from "vitest";
import { ports } from "@/data/ports";
import { filterPorts, groupPorts, portStates } from "@/data/ports-directory";

describe("ports directory", () => {
  it("shows all 30 ports across 9 states by default", () => {
    expect(filterPorts(ports, "", "")).toHaveLength(30);
    expect(portStates).toHaveLength(9);
    expect(groupPorts(ports).reduce((n, g) => n + g.items.length, 0)).toBe(30);
  });
  it("filters by state and search, case-insensitive", () => {
    expect(filterPorts(ports, "", "Gujarat")).toHaveLength(6);
    expect(filterPorts(ports, "haldia", "")).toHaveLength(1);
    expect(filterPorts(ports, "mundra", "Odisha")).toHaveLength(0);
    expect(filterPorts(ports, "zzz", "")).toHaveLength(0);
  });
});
