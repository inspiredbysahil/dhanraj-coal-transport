import { defineTool } from "@lovable.dev/mcp-js";
import { products } from "@/data/products";
import { requireSignedIn, text } from "./_shared";

export default defineTool({
  name: "list_products",
  title: "List coal products",
  description: "List coal products with GCV, ash, moisture, sulphur and availability.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    requireSignedIn(ctx);
    const rows = products.map((p) => ({ id: p.id, name: p.name, status: p.status, gcv: p.gcv, ash: p.ash, moisture: p.moisture, sulphur: p.sulphur, detail: `${p.detailLabel}: ${p.detail}`, availability: p.availability }));
    return { content: text(rows), structuredContent: { products: rows } };
  },
});
