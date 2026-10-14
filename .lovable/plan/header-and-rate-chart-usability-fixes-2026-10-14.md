# Header and Rate Chart usability fixes

## 1. Header navigation
- Keep the verified phone destination `tel:+916376139600` and add a visible phone icon alongside **+91 63761 39600**.
- Add **Pet Coke** linking to `/pet-coke-price` in the sticky navigation, matching the main navigation.
- Check spacing so the extra link does not overlap the brand or quote button.

## 2. Readable table headings
Use these eight visible labels, in order:
1. Source Type
2. GCV / GAR
3. Location / Port
4. Grade / Vessel
5. Avail. Qty (MT)
6. Rate (₹/Ton)
7. Remarks
8. Action

Use high-contrast foreground text on an opaque header background. Preserve sorting on the six currently sortable columns and give all headers column scope.

## 3. Immediate filtering
- Refine the existing category controls to show **All**, **Domestic Mine**, **Domestic Port**, **Imported Vessel**, and **Kandla / Tuna**, in that order.
- Map these display labels to the existing category values without modifying source rows.
- Keep quick search immediately above the results, with the prompt **Search Port, Mine, or GCV…**. Search and category selection work together, with a clear selected state and a no-results message on desktop and mobile.
- Keep filter controls within their own row on narrow screens; prevent page-wide sideways scrolling.

## 4. Mobile rate cards
- Retain the existing card-only layout below 768px and improve its hierarchy and spacing.
- Clearly label source type, GCV / GAR, location, grade / vessel, available quantity, rate, and remarks; preserve unknown quantities as shown in the data.
- Use a stable two-column card heading with shrinkable text, wrapping long vessel names without overlap.
- Provide a full-width **WhatsApp quote** button for every card, retaining the existing WhatsApp destination and message behavior.

## Guardrails
Preserve the current light/glass design, prices, date, quantities, charges, estimator calculations, CSV export, contact functionality, and datasets. The requested MT/Ton wording is a presentation change, not a numerical conversion.

## Technical details
- Update header presentation in `src/components/DhanrajSite.tsx` and rate presentation in `src/components/RateTable.tsx`.
- Keep display labels and category mappings in typed exports under `src/data`, following the existing content convention.
- Use existing Button/Input components and semantic color tokens; add narrowly scoped table/card styling only where needed.

## Verification
- Confirm the rendered phone href and icon, then scroll to reveal the sticky navigation and open Pet Coke.
- Check all eight visible headers and their text contrast; exercise existing sorting.
- Test all five filters and combined searches for Navlakhi, Dhanbad, and a GCV value; verify the no-results state.
- Check desktop plus 360px, 390px, and 767px widths: cards only below 768px, readable fields, full-width quote buttons, no overlap or page-wide overflow.
- Inspect generated WhatsApp links, verify CSV export and estimator remain functional, run relevant tests, and check browser/build diagnostics.