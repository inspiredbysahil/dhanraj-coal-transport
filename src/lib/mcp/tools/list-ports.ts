import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ports } from "@/data/ports";
import { requireSignedIn, text } from "./_shared";

export default defineTool({
  name: "list_ports",
  title: "List ports",
  description: "List Indian ports in the supply network, optionally filtered by state.",
  inputSchema: { state: z.string().optional().describe("State name, e.g. 'Gujarat'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ state }, ctx) => {
    requireSignedIn(ctx);
    const rows = ports.filter((p) => !state || p.state.toLowerCase().includes(state.toLowerCase())).map((p) => ({ state: p.state, portName: p.portName, needsReview: p.needsReview }));
    return { content: text(rows), structuredContent: { ports: rows } };
  },
});
