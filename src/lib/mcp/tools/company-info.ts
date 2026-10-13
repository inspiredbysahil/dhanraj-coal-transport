import { defineTool } from "@lovable.dev/mcp-js";
import { site } from "@/data/site";
import { requireSignedIn, text } from "./_shared";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description: "Contact details, address, branches, services and industries served by Dhanraj Coal Transport.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    requireSignedIn(ctx);
    const info = {
      brand: site.brand, intro: site.intro, primaryPhone: site.primaryPhone,
      secondaryContact: site.secondaryContact, secondaryPhone: site.secondaryPhone,
      gstin: site.gstin, address: site.address, branches: [...site.branches],
      industries: [...site.industries],
      services: site.services.map(([name, detail]) => ({ name, detail })),
    };
    return { content: text(info), structuredContent: { info } };
  },
});
