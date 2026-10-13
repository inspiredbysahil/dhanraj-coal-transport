# Dhanraj — Subtle Liquid-Glass UI Refresh

## Direction
Refresh the interface with **subtle, professional glass**, as selected: lightly frosted surfaces, fine highlights, restrained shadows, and clearer visual hierarchy. Preserve the light, photo-led look, near-black text, lime action accent, and familiar page structure.

## What will change
- **Navigation:** refine the photo-overlay header, floating navigation, mobile menu, and contact bar with controlled frosting, clearer contrast, and comfortable touch targets.
- **Homepage:** keep photography unobscured and text directly over the opening image. Improve spacing, typography, product labels, filters, FAQ rows, and contact presentation. Keep page sections unframed; reserve glass for navigation, selected controls, and genuinely framed tools.
- **Rates and enquiries:** use a frosted toolbar or estimator frame, but keep prices, table rows, input fields, instructions, and validation messages on readable solid surfaces. Make selected filters, focus, and disabled states unmistakable.
- **Other screens:** carry the same visual language through Coal Mines, Pet Coke, sign-in, and connection approval. Preserve directory grouping, source/review labels, and explicit approval choices.
- **Trust:** make existing legal identity, contact details, pricing caveats, and source labels easy to find. Keep unapproved founder content and statistics hidden; do not invent testimonials, credentials, or business claims.

## Guardrails
- No changes to prices, products, source datasets, calculations, WhatsApp messages, contact details, sign-in behavior, integrations, or permissions.
- Keep current photographs; no new 3D scenes, heavy effects, cursor trails, or animated distortion.
- Maintain readable contrast and keyboard focus. Provide solid-surface fallbacks where blur is unavailable and reduce effects on smaller screens or reduced-motion settings.
- Keep opening fast: no fullscreen blur layers, overlapping stacks of filters, or continuous glass animations.

## Technical details
- Define shared glass surface, edge, shadow, and overlay tokens in `src/styles.css`; keep palette roles synchronized with `src/lib/theme-palette.ts`.
- Use standard `backdrop-filter` or Tailwind backdrop utilities without handwritten vendor prefixes.
- Apply consistent design-system button variants and reusable surface treatments rather than per-page color values.
- Keep business content in `src/data`, retain route-specific metadata and explicit sitemap decisions, and document any shared presentation structure introduced in `AGENTS.md`.

## Verification
- Inspect the homepage and each affected screen at desktop and mobile widths for readable text, visible next-section content, stable layouts, and no sideways scrolling or overlap.
- Exercise navigation, product-to-enquiry selection, rate search/filter/sort/export/estimator/quote, mine filters and expand/collapse, FAQ search, and enquiry validation with valid input and the WhatsApp handoff.
- Check sign-in and connection-approval presentation without changing authentication or consent behavior; verify authenticated flows when a test session is available and report any unavailable checks.
- Run relevant existing tests and check browser errors, reduced-motion/blur fallbacks, and build diagnostics before completion.