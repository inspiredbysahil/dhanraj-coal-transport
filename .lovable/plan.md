# Rebuild the homepage in the uploaded reference design

Recreate the layout, rhythm and styling of the reference (clean light page, big photo blocks, dark footer, bright lime accent buttons) using Dhanraj's own content. All business text, rates, phone numbers and WhatsApp links stay as they are.

## Look and feel
- Light off-white page background, near-black text, dark footer block.
- One bright lime-green accent used only for round arrow buttons, "+" on numbers, small icons and active filter chips. This replaces the strict black-and-white rule (memory will be updated).
- Clean modern sans font, large tight headlines in two lines ("Rooted in the Earth, / Guided by Humanity." style).
- Rounded pill buttons: dark pill with text + lime circle with arrow.
- Small section labels ("• ABOUT US") above each heading.

## Sections (top to bottom, matching the reference)
1. **Hero** — full-width rounded photo (aerial coal mine / truck route), menu bar on top with logo, links, "Contact Us" pill; big headline "Reliable Coal Supply, Delivered Across India."; "Get a Quote" pill; small bottom line text and a badge at the bottom right ("Trusted by 500+ industries").
2. **About** — heading on left, "Explore More" pill on right; three value cards in a staggered row (Verified Quality, On-time Dispatch, Fair Pricing) with lime icons, plus a tall photo of a loading site on the right.
3. **Founder quote** — portrait photo on left, large quote text on right, name and role, small arrow controls.
4. **Products** — "Quality Fuel, Real Results." with a sideways-scrolling row of tall photo cards (Indonesian coal, Steam coal, Pet coke, etc.) each with label and arrow button; prev/next arrows.
5. **Impact numbers** — full-width aerial photo with heading on left and four glass stat boxes on right (years, tons delivered, clients, cities) with lime "+".
6. **Rates** — existing rate table kept (search, filters, estimator, quote links), restyled to match.
7. **Latest updates / Industries** — "Latest Articles" style three-card grid with tag chips and All / Industries / Updates filter pills (used for industries served and FAQ highlights).
8. **FAQ and contact form** — kept, restyled.
9. **Dark closing block** — centered "Let's Build Reliable Supply Together" with "Contact Our Team" pill, then footer with logo, short text, link columns, contact info and social icons.

3D scenes are removed from the homepage, since the reference uses photos only — this also makes the site lighter and faster.

## Photos
New realistic images generated for: hero aerial mine, loading site, founder portrait (placeholder — please share your real photo), 4 product cards, aerial impact background, 3 update cards.

## Technical details
- Update tokens in `src/styles.css` and `src/lib/theme-palette.ts` (add `--accent` lime); load font via `<link>` in `__root.tsx`.
- Rewrite `src/components/DhanrajSite.tsx` into section components; content stays in `src/data` (add founder quote, stats, article cards to `site.ts`).
- Restyle `RateTable.tsx` without changing its logic; Pet Coke page gets the new header/footer.
- Drop `LazyScenes` usage from homepage; update memory visual direction and AGENTS.md rule about 3D.
- Keep SEO head metadata, sitemap, and JSON-LD unchanged.
