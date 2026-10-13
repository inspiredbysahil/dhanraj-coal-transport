import { ToolError, type ToolContext } from "@lovable.dev/mcp-js";
export function requireSignedIn(ctx: ToolContext) {
  if (!ctx.isAuthenticated()) throw new ToolError("Not authenticated");
}
export const text = (value: unknown) => [{ type: "text" as const, text: JSON.stringify(value) }];
