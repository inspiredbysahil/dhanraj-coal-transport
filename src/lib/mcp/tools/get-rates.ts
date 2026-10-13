import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { rates, effectiveDateLabel } from "@/data/rates";
import { requireSignedIn, text } from "./_shared";

export default defineTool({
  name: "get_rates",
  title: "Get coal rates",
  description: "Indicative coal rates in INR per ton (GST 18%, TCS and freight extra), optionally filtered by category or search text.",
  inputSchema: {
    category: z.string().optional().describe("Category name to match, e.g. 'Imported'."),
    query: z.string().optional().describe("Text to match against source, grade or remarks."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, query }, ctx) => {
    requireSignedIn(ctx);
    const c = category?.toLowerCase(); const q = query?.toLowerCase();
    const rows = rates
      .filter((r) => !c || r.category.toLowerCase().includes(c))
      .filter((r) => !q || [r.source, r.grade, r.remarks, r.gcv].join(" ").toLowerCase().includes(q))
      .map((r) => ({ ...r, unit: "INR/ton" }));
    const result = { lastUpdated: effectiveDateLabel, note: "Indicative rates, not a confirmed quotation.", rates: rows };
    return { content: text(result), structuredContent: result };
  },
});
