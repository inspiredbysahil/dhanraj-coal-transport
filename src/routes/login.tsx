import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { oauthReturnPath } from "@/lib/oauth-return-path";

export const Route = createFileRoute("/login")({
  staticData: { sitemap: false },
  validateSearch: (s: Record<string, unknown>) => ({ next: oauthReturnPath(s["next"]) }),
  head: () => ({
    meta: [
      { title: "Sign in — Dhanraj Coal Transport" },
      { name: "description", content: "Sign in to connect an AI assistant to Dhanraj Coal Transport." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sign in — Dhanraj Coal Transport" },
      { property: "og:description", content: "Sign in to connect an AI assistant to Dhanraj Coal Transport." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg(error.message);
      window.location.assign(next);
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: new URL(next, window.location.origin).href } });
      setBusy(false);
      setMsg(error ? error.message : "Check your email to confirm your account, then come back here.");
    }
  }

  async function google() {
    setMsg(null);
    sessionStorage.setItem("auth_next", next);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: new URL(next, window.location.origin).href });
    if (result.error) return setMsg(result.error.message ?? "Google sign-in failed.");
    if (result.redirected) return;
    navigate({ href: next });
  }

  return (
    <main className="site-shell flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold">{mode === "in" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Used to connect AI assistants to Dhanraj Coal Transport.</p>
        <button onClick={google} className="mt-6 w-full rounded-full border border-border px-4 py-3 text-sm font-medium hover:bg-muted">Continue with Google</button>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block text-sm">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2" /></label>
          <label className="block text-sm">Password<input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2" /></label>
          {msg && <p role="alert" className="text-sm text-muted-foreground">{msg}</p>}
          <button disabled={busy} className="w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Sign up"}</button>
        </form>
        <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }} className="mt-4 text-sm underline">
          {mode === "in" ? "New here? Create an account" : "Have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
