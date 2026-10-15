# Add trust bar, industries section, and pulsing WhatsApp button

Three additions to the homepage only. No changes to prices, rates, WhatsApp numbers or messages, datasets, or any other page.

## 1 — Stats bar below the Hero
- Full-width bar directly under the hero frame, above the About section: four items side by side (stacked 2×2 on mobile) with a small icon and bold label each:
  - "100 MT Minimum Order" (ShieldCheck)
  - "Pan-India Rail & Road Fleet" (Truck)
  - "100% GCV & Lab Verified" (BadgeCheck)
  - "Direct Port & Mine Lifting" (Anchor)
- Light card surface with hairline dividers, matching the existing value-card row style; no new colors.
- Copy stored in `src/data/home.ts` (`home.assurance`) as typed data, per project convention.

## 2 — "Industries We Fuel" section
- New section between Products and Rates: dot label "Industries we fuel", two-line headline, and a 5-card grid (2 cols mobile, 5 cols desktop) — Steel & Rolling Mills, Cement & Clinker Units, Textile & Dyeing Boilers, Brick Kilns, Chemical Plants.
- Each card: lucide industrial icon (Factory, Building2, Waves, Flame, FlaskConical — final icons picked at build), name, and one short line of copy.
- Section copy and item list in `src/data/home.ts`; icons mapped in the component.
- The existing industry chip row in "Who We Power" stays as is.

## 3 — Floating WhatsApp button with pulse
- Desktop: the existing bottom-right floating actions keep Call, and the WhatsApp button gets a subtle lime pulse ring (CSS animation, honors prefers-reduced-motion — no animation there).
- Mobile: the bottom contact bar already contains a full WhatsApp button; a second floating button would overlap it, so the pulse ring is applied to the bar's WhatsApp button instead of adding a duplicate floating circle.
- Pulse defined in `src/styles.css` using the existing lime token.

## Testing
- Playwright at 360/390/768/1024/1280px: stats bar stacks correctly, industries grid readable, no sideways scrolling, floating button visible and pulsing on desktop, reduced-motion disables the pulse.
- Verify all four stats and five industries render with correct text; confirm WhatsApp links still point to +91 63761 39600.
- Run existing vitest suite.

## Technical notes
- Edits: `src/data/home.ts` (assurance + industries copy), `src/components/DhanrajSite.tsx` (two new components, rendered in the page order), `src/styles.css` (pulse keyframes + reduced-motion fallback).
- No head/sitemap changes (homepage already indexed).
