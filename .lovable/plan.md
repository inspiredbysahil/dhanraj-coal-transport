# Pet Coke industrial buyer page upgrade

## Goal
Upgrade `/pet-coke-price` with consistent navigation, prominent technical references, port-specific quote requests and a useful heat-value comparison calculator. Preserve the light photo-led design, lime accent and fast opening.

## 1. Navigation and first screen
- Add full main and scroll-triggered sticky navigation, with **Pet Coke** marked active in both.
- Link About, Products, Rates and Contact to the corresponding homepage sections; keep Home and Coal Mines navigation working.
- Show a phone icon and `tel:+916376139600` link in the header, plus an accessible mobile menu.
- Use the existing Pet Coke photograph in an unframed introductory section with prominent quote and call actions.

## 2. Technical Specification Bar
Show four readable, opaque industrial cards directly below the introductory section:
- GCV: **7,800–8,500 kcal/kg**
- Ash Content: **< 1%**
- Total Moisture: **< 8%**
- HGI: **35–75+**

As confirmed, label these as **typical buying references**, not verified specifications for every available lot. Exact GCV basis, specifications and grinding suitability require the lot’s lab report; do not promise easy grinding from HGI alone. Keep these page-specific references separate from the existing product dataset so this upgrade does not silently change other pages.

## 3. Pet Coke Rate & Port Availability
- Add tabs: **All Origins**, **Kandla Port**, **Tuna Port**, **Navlakhi Port**, **Domestic Refinery**.
- Provide clearly labeled columns: **Origin/Port**, **Type (US Gulf / Saudi / Refinery)**, **GCV (GAR/ADB)**, **Sulfur %**, **Rate (₹/Ton)**, **Remarks (+18% GST + TCS)** and **WhatsApp Quote**.
- The existing coal sheet has no explicitly identified Pet Coke rate rows. As confirmed, create enquiry destinations for the requested ports/refinery rather than invent priced stock listings.
- Mark price, actual origin/type, GCV basis, sulfur and availability **Confirm on enquiry** wherever unsupported. Do not assign US Gulf or Saudi supply to a port without evidence.
- Use the heading **Pet Coke Rate & Port Availability** with a clear current-price-on-enquiry notice, rather than implying a live inventory feed.
- Each quote button sends the selected port/refinery and requests current price, origin, lab report, stock, quantity and delivery terms on WhatsApp at **+91 63761 39600**.
- Below 768px, use labeled cards and full-width quote buttons rather than horizontal table scrolling.

## 4. Coal vs. Pet Coke Heat Value Calculator
- Editable inputs: monthly coal consumption (default **500 MT**), coal GCV (**5,500 kcal/kg**), Pet Coke GCV (**8,200 kcal/kg**), coal price per ton and Pet Coke price per ton.
- Leave both prices blank initially; they are buyer-entered comparison prices, not today’s verified rates.
- Calculate equivalent Pet Coke tonnage immediately:
  **Pet Coke MT = Coal MT × Coal GCV ÷ Pet Coke GCV**.
- Once both prices are provided, show coal monthly cost, equivalent Pet Coke cost and the cost difference. Label a negative difference as an **additional cost**, not savings.
- For 500 MT at 5,500 GCV versus 8,200 GCV, show approximately **335.37 MT** of Pet Coke.
- Clearly state that this is equal-gross-heat comparison, assumes equal efficiency and matching GCV bases, and excludes freight, GST, TCS and plant-conversion costs. Sulfur limits, equipment compatibility and actual efficiency must be assessed before switching fuels.
- Validate all numeric inputs and prevent invalid or empty values from producing misleading results. This is a comparison tool, not an order submission; keep the existing 100 MT order minimum unchanged.
- Add **Request Today’s Pet Coke Rate on WhatsApp**. Prefill consumption, GCV values, equivalent quantity and any entered comparison prices; request current rate and delivery terms without promising a rate is locked.

## Technical implementation
- Keep typed page copy, specification references and enquiry destinations in `src/data/pet-coke.ts`; keep calculator validation, calculations and WhatsApp helpers in a separately testable data helper.
- Build focused landing, port-table and calculator components. Keep the route responsible for page composition and app-specific title, description, canonical, social metadata and accurate Product structured data without invented offers.
- Reuse existing navigation and button styling; scope changes to this page and required navigation reuse, leaving coal prices, source documents, integrations and permissions untouched.
- Record the new structural decisions in `AGENTS.md` and the confirmed Pet Coke reference/enquiry safeguards in project memory during implementation.

## Verification
- Test equal-heat arithmetic, decimal inputs, invalid inputs, savings versus additional cost, filters and complete WhatsApp messages.
- Check desktop and mobile navigation, both active states, exact phone link, filter results, specification visibility and calculator updates.
- Exercise quote handoffs and calculator requests through the page; verify the recipient and prefilled details.
- Confirm no sideways scrolling, accessible labels, reduced-motion behavior, no runtime errors and passing existing tests.