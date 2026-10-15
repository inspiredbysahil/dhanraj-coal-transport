# Coal Mines B2B landing-page upgrade

## Goal
Upgrade `/coal-mines` into a clear, enquiry-focused industrial supply page while preserving the complete source directory, existing homepage, prices, products, estimator, contact behaviour and integrations.

## 1. Navigation and first screen
- Keep the existing light, photo-led style, lime action accent and subtle glass navigation; keep specifications and directory rows opaque.
- Add a compact coal-supply opening with Dhanraj branding, an existing illustrative mine photograph, a lifting-enquiry CTA and a link to the directory below. Do not label generated photography as a real company site.
- The current desktop header already uses `/#about`, `/#products`, `/#rates` and `/#contact`. Preserve these destinations and verify that each actually opens the correct homepage section.
- Make “Coal Mines” visibly active with `aria-current="page"`, including the mobile menu. Replace the current mobile-only Home button with a usable navigation menu.
- Add the phone icon and number to the header using exactly `tel:+916376139600`, with a compact mobile presentation that cannot collide with navigation.

## 2. Major Coalfields & Lifting Hubs
Add four responsive cards: **Dhanbad (BCCL / Jharia)**, **Ramgarh (CCL)**, **Raniganj (ECL)** and **Central/Eastern Coalfields**.

- Each card shows coal types, GCV in kcal/kg, ash %, stock in MT and “Get Lifting Quote on WhatsApp”.
- Use only explicitly matching source-location rows from the existing rate list. These are location-level listings, not proof of operator-specific or individual-mine stock.
- Existing figures are dated **12 July 2026**. Label them as dated reference listings, not current confirmed availability. Do not sum quantities across grades or relabel source categories.
- Show matching grades and GCV bands without inventing Steam or Slack availability. Ash and current stock display **“Confirm on enquiry”** where not verified; keep any historical per-grade quantities clearly dated and separate from current stock.
- Central/Eastern Coalfields displays confirmation-required values unless an explicit source match supports a particular specification. Do not infer inventory from the mines directory or apply general product ash ranges to a hub.
- A keyboard-accessible “View listed grades” disclosure reveals matching dated source rows where available. No whole-card click target or unnecessary new order form.
- Every WhatsApp button opens `https://wa.me/916376139600` with its specific hub name and a request for grade, GCV, ash, available stock, lifting terms and freight to the buyer’s plant. It does not claim the enquiry has been sent.

## 3. Quick Grade-to-GCV Reference Chart
- Show the requested **G1–G12** non-coking coal bands from the Ministry of Coal, using kcal/kg and accurate greater-than/less-than-or-equal boundaries.
- Explain briefly that this is a selected part of the full G1–G17 classification, not a complete national grade list.
- Show **W-I–W-IV** alongside their official **ash-content bands**, with GCV marked **“Confirm from lab report”**. Washery grades do not have a universal grade-to-GCV conversion; do not invent one.
- Link the official reference: https://coal.gov.in/major-statistics/coal-grades . Clearly distinguish the general classification from the company’s available supply grades.
- Keep the chart compact and readable on phones without page-wide horizontal scrolling.

## 4. Mine-to-Plant Quality Guarantee
Present the three services you confirmed with industrial icons and concise descriptions:
1. **Siding Crushing & Stone Sorting**
2. **Pre-Dispatch GCV & Moisture Verification**
3. **GPS-Tracked Road & Rake Logistics**

Do not extend these confirmations into invented certifications, numerical quality guarantees, compensation promises or live tracking access. Close with a clear lifting-enquiry CTA.

## 5. Preserve the directory
- Keep all 139 entries, source wording, source-page labels, review notes, state/operator filters, search and expand/collapse controls.
- Place the unchanged directory functionality below the new supply sections with its source disclaimer and counts clearly associated with the directory, not presented as commercial stock metrics.

## Technical details
- Keep new typed hub mappings, landing-page copy, official reference bands, source citations and WhatsApp message helpers in focused files under `src/data`; presentation consumes those exports.
- Introduce a focused landing-page component around the existing directory, separating navigation and commercial sections from directory filtering logic. Record the structural rule in `AGENTS.md` during implementation.
- Reuse existing Button/Input components, semantic CSS tokens and bundled photos; no new 3D, server logic, migrations or changes to MCP tools.
- Preserve `/coal-mines`, its canonical URL and sitemap eligibility. Update its unique title, description and social metadata to reflect supply and lifting enquiries alongside the directory.
- Record your confirmed quality services and confirmed-data-only requirement in project memory during implementation.

## Verification
- Run existing source-data, routing and estimator tests plus focused tests for hub mappings, official grade boundaries and hub-specific WhatsApp messages.
- Test direct entry to `/coal-mines` and desktop/mobile menu navigation back to all four homepage sections; verify active state and exact phone destination.
- Open each hub enquiry through the UI and verify the recipient and prefilled hub name.
- Check the grade disclosures, chart, directory filters, empty states and expand/collapse controls at desktop and mobile widths, including the current narrower desktop viewport.
- Check contrast, keyboard access, no overlapping text or sideways page scrolling, reduced-motion behaviour and clean preview diagnostics.

## Boundaries
No publishing in this task. Current stock and hub-specific ash remain unconfirmed until supplied; historical rates will not be presented as live inventory.