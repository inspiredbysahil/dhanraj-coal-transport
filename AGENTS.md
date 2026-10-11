<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all Dhanraj business copy and datasets in `src/data`; presentation components consume typed exports so content changes never require layout edits.
- Keep Three.js scenes procedural, client-only, intersection-gated, and capped at 1.75 DPR to protect mobile performance and avoid SSR hydration failures.
- Keep shared visual colors in semantic CSS tokens and `src/lib/theme-palette.ts` so DOM and Three.js visuals remain synchronized.
- Keep sitemap eligibility explicit in every route through required `staticData.sitemap` decisions so new public pages are discoverable by default review.
