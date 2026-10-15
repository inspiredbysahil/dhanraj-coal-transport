# Landed-Price Quotation contact section

Redesign the homepage contact area into a 2-column "Request a Landed-Price Quotation" section (stacked on mobile), keeping the current look: light pages, dark contact block, lime accent.

## Left column: Dispatch desk
- Eyebrow "DIRECT DISPATCH & QUOTATION DESK", heading and subtext as written, including the 15-minute reply promise (confirmed).
- Clickable cards:
  - Phone +91 63761 39600, with the badge "Mon–Sat · 9:00 AM – 8:00 PM IST"
  - WhatsApp desk, with the badge "Instant Rate Sheet & Lab Reports"
  - Email card: stays hidden until you send the real address
- Trust box: legal name "DHANRAJ COAL TRANSPORT", GSTIN 21EWPPR7307G1ZA, MOQ 100 MT, and the tagline "Vishwas aur Quality — Hamari Pehchan".
- The second contact person, head office and branches move to a small line under the trust box so no details are lost.

## Right column: Quote form
Fields with clear error messages:
- Name & designation, company / plant, and a 10-digit mobile with a fixed +91 prefix (all required)
- Optional email
- Fuel category pills (4 options, required)
- GCV / grade dropdown with the listed options plus "Other"
- Quantity: minimum 100 MT, with quick chips for 100 / 250 / 500 / 1,000+ MT
- Delivery mode and city / state / pin (both required)
- Remarks (optional)

## Actions
- Main button "Send Inquiry on WhatsApp (Instant Quote)": checks the form, then opens WhatsApp to +91 63761 39600 with a neat bulleted summary. The message only says WhatsApp opened, never "sent".
- Email button "Send via Email for Formal Quotation": shown but turned off with the note "Email address coming soon". Once you share the address, it will show the "Quotation request prepared!" message and open a ready-made email with the subject from your brief.
- Pre-fill: clicking a product card or a rate-row quote button fills in the fuel category and grade, then scrolls to the form.

## Not changed
Prices, rates, the estimator, other pages and the contact numbers.

## Technical details
- New `src/data/quote-request.ts`: copy, options, a zod schema, WhatsApp and mailto builders, and `contactEmail: null`.
- New `src/components/QuoteRequestSection.tsx` replaces the contact block inside DhanrajSite. It listens to the existing `select-product` event plus a new `select-rate` event that RateTable sends.
- `site.ts`: legalName changes to "DHANRAJ COAL TRANSPORT"; add business hours.
- Add the sonner Toaster in __root if it is missing.
- Tests: `src/test/quote-request.test.ts` covers validation and message building. Playwright checks run at 360 and 1280px.
