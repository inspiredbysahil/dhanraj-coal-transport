import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mines } from "@/data/mines";
import { requireSignedIn, text } from "./_shared";

export default defineTool({
  name: "search_mines",
  title: "Search coal mines",
  description: "Search the coal mines directory by state, operator or mine name (names kept as printed in the source PDF). Returns up to 50 matches.",
  inputSchema: {
    state: z.string().optional().describe("State name, e.g. 'Odisha'."),
    operator: z.string().optional().describe("Operator, e.g. 'MCL'."),
    query: z.string().optional().describe("Text to match in mine name, area or coalfield."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ state, operator, query }, ctx) => {
    requireSignedIn(ctx);
    const has = (v: string, f?: string) => !f || v.toLowerCase().includes(f.toLowerCase());
    const all = mines.filter((m) => has(m.state, state) && has(m.operator, operator) && has(`${m.mineName} ${m.area} ${m.coalfield} ${m.sourceLabel}`, query));
    const rows = all.slice(0, 50).map((m) => ({ state: m.state, operator: m.operator, coalfield: m.coalfield, area: m.area, mineName: m.mineName, needsReview: m.needsReview }));
    return { content: text({ total: all.length, mines: rows }), structuredContent: { total: all.length, mines: rows } };
  },
});
