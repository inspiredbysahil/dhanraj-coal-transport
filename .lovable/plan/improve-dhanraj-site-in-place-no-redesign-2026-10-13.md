# Improve Dhanraj site in place (no redesign)

Keep current look, sections, rates and WhatsApp links. Work in small steps, each tested and reported.

## Step 1 — Rate chart
- Show unit on every price as "₹/ton" (current wording in the data); switch to ₹/MT only if you confirm.
- Visible "Last updated: 12 Jul 2026" from the single maintained date (no auto date).
- One clear charges note: GST 18% extra, TCS as applicable, freight by location, loading as per row remark.
- Label: "Indicative rates — final price confirmed in written quotation".
- Mobile: card list only (no page-wide side scroll), readable text sizes; filter chips scroll inside their own row.
- Test search, each category, every sort column, CSV export, row quote links.

## Step 2 — Contact form
- Fields: name, company, phone (required, 10-digit Indian), email (optional, checked format), product, quantity, delivery city, requirement.
- Clear error messages next to fields, proper labels and required marks, keyboard friendly.
- WhatsApp message built only from filled fields, safely encoded.
- Button "Continue on WhatsApp", disabled briefly after click; message says "WhatsApp opened" — never "sent".
- Test empty, invalid and valid submissions and read the generated link.

## Step 3 — Honest claims
- Hide 63,000 MT, 100+ clients, 15 ports, 28 states, "Trusted by 100+" until you confirm.
- Remove invented founder quote/testimonials; mark or remove generated photos.
- Keep structured data limited to verified facts (name, phone, address, GSTIN).

## Step 4 — SEO metadata
- Fix escaped "&amp;" in titles/descriptions, add twitter:title/description, verify share image loads, match FAQ/product data to visible page.

## Step 5 — Mobile and accessibility
- Test 360/390/768/1024/1440: menu open/close/navigate, overflow, sticky bar not covering buttons, focus outlines, contrast, reduced motion.

## Step 6 — Report
- List exactly what was tested and what needs your manual check.

## Needed from you (can proceed without; claims stay hidden)
- Price unit: per ton or per MT? 
- Confirm the four numbers and second contact.
- Real photos / founder name, email, social links.

## Technical details
- Rate unit/date/charges text in `src/data/rates.ts`; claims in `src/data/home.ts`/`site.ts` with an `approved` flag.
- Form validation with zod in `DhanrajSite.tsx`; Playwright scripts under /tmp/browser.
