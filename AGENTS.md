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
- Keep shared B2B SEO metadata and the stable business schema in `src/data/seo.ts`, consumed by leaf route heads; social images and canonical URLs belong only on leaf routes to avoid merged-head conflicts.
- Keep Coal Mines commercial sections in a focused landing-page wrapper and sourced hub/reference helpers in `src/data`, separate from directory filtering, so supply enquiries cannot alter verbatim mine records.
- Keep Pet Coke references and enquiry destinations in a dedicated typed data module, with heat-comparison validation and WhatsApp helpers separate from focused presentation components, so unverified availability cannot become priced inventory and arithmetic remains independently testable.
- Keep rate-chart display labels and category mappings separate from source rate rows in `src/data/rate-chart.ts` so buyer-facing wording never changes dataset identities.
- Keep the order estimator in a focused presentation component with typed copy, validation, calculations and WhatsApp message helpers in `src/data/order-estimator.ts` so estimates can be tested independently of layout.
- Keep Three.js scenes procedural, client-only, intersection-gated, and capped at 1.75 DPR to protect mobile performance and avoid SSR hydration failures.
- Keep shared visual colors in semantic CSS tokens and `src/lib/theme-palette.ts` so DOM and Three.js visuals remain synchronized.
- Keep sitemap eligibility explicit in every route through required `staticData.sitemap` decisions so new public pages are discoverable by default review.
- Keep the public interface light, photo-led and contrast-driven with a single accent token for actions, because industrial buyers prioritize trust and speed.
- The homepage is photo-only; any future 3D must load through `src/components/three/LazyScenes.tsx` (lazy, idle-gated, client-only) to keep first paint fast.
- Use shared glass surface tokens and supporting-chrome classes only; keep data rows and credential/consent forms opaque to preserve readability and avoid stacked blur costs.
- Keep the Indian Ports page as a source-listed directory (`src/data/ports-directory.ts` helpers over verbatim `src/data/ports.ts`) with no prices or stock, so listing a port never implies active supply.
