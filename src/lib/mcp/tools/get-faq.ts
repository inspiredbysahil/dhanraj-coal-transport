import { defineTool } from "@lovable.dev/mcp-js";
import { faq } from "@/data/faq";
import { requireSignedIn, text } from "./_shared";

export default defineTool({
  name: "get_faq",
  title: "Get FAQ",
  description: "Frequently asked questions about MOQ, delivery, pricing, payment and dispatch.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    requireSignedIn(ctx);
    const rows = faq.map(([question, answer]) => ({ question, answer }));
    return { content: text(rows), structuredContent: { faq: rows } };
  },
});
