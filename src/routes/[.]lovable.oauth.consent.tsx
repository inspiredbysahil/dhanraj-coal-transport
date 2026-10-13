import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Details = { client?: { name?: string; redirect_uri?: string } | null; redirect_uri?: string; scope?: string; redirect_url?: string; redirect_to?: string; user?: { email?: string } };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: Details | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  staticData: { sitemap: false },
  validateSearch: (s: Record<string, unknown>) => ({ authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "" }),
  head: () => ({ meta: [{ title: "Connect an app — Dhanraj Coal Transport" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("This connection link is missing its authorization ID.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login", search: { next: location.pathname + location.searchStr } });
    return { email: data.session.user.email ?? "your account" };
  },
  loader: async ({ location }) => {
    const id = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(id);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="site-shell flex min-h-screen items-center justify-center">
      <div className="max-w-md rounded-3xl border border-border bg-card p-8">
        <h1 className="font-display text-xl font-semibold">This connection request can't be loaded</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : String(error)}</p>
        <p className="mt-2 text-sm text-muted-foreground">It may have expired. Start the connection again from your assistant.</p>
      </div>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const { email } = Route.useRouteContext();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = details?.client?.name ?? "An app";
  const redirectUri = details?.client?.redirect_uri ?? details?.redirect_uri;
  const scopes = (details?.scope ?? "").split(" ").filter(Boolean);
  const label = (s: string) => s === "openid" ? "Confirm your identity" : s === "email" ? "Share your email address" : s === "profile" ? "Share your basic profile" : `Additional permission requested: ${s}`;

  async function decide(approve: boolean) {
    setBusy(true); setError(null);
    const { data, error } = approve ? await oauth().approveAuthorization(authorization_id) : await oauth().denyAuthorization(authorization_id);
    if (error) { setBusy(false); return setError(error.message); }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); return setError("No redirect was returned. Please try again."); }
    window.location.href = target;
  }

  return (
    <main className="site-shell flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold">Connect {name} to Dhanraj Coal Transport</h1>
        <p className="mt-2 text-sm text-muted-foreground">Signed in as {email}. This lets {name} use this app as you — reading products, rates, mines, ports and FAQs.</p>
        {redirectUri && <p className="mt-3 break-all text-xs text-muted-foreground">Returns to: {redirectUri}</p>}
        {scopes.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">{scopes.map((s) => <li key={s}>{label(s)}</li>)}</ul>}
        <p className="mt-4 text-xs text-muted-foreground">This does not bypass this app's permissions.</p>
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button disabled={busy} onClick={() => decide(true)} className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">Approve</button>
          <button disabled={busy} onClick={() => decide(false)} className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-medium disabled:opacity-60">Cancel connection</button>
        </div>
      </div>
    </main>
  );
}
