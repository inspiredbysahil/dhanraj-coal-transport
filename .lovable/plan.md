# Audit and in-place improvements: Indian Ports directory, data review, testing

No redesign. Existing header, footer, colours, fonts, prices, estimator and quotation form stay as they are.

## Priority 1 — Indian Ports directory (new page /ports)
- There is no /ports page today. The 30 port entries are already stored (with state, spelling as printed and PDF page). They are not shown anywhere yet.
- Before building, compare the stored list against all three PDF pages again, entry by entry. Expected counts: West Bengal 2, Odisha 3, Andhra Pradesh 5, Tamil Nadu 5, Kerala 2, Karnataka 1, Goa 1, Maharashtra 5, Gujarat 6. Pages: p.1 = 7, p.2 = 11, p.3 = 12.
- The page includes:
  - A heading and a visible "Showing X of 30 ports" count
  - A search box for port names
  - A state filter with all nine states, plus a Reset button
  - Ports grouped by state as printed. Each port shows its name as printed, "PDF p.X", and a "Needs review" tag with its note (for example, Puducherry and Karaikal are listed under Tamil Nadu)
  - An empty-results message
  - A clear notice: "Source-listed ports only. Listing does not mean current stock or an active Dhanraj supply location. Confirm availability on enquiry."
  - Call and WhatsApp enquiry buttons that use the existing number. No prices or stock are shown.
- Add "Indian Ports" to the navigation on the homepage (desktop menu, mobile menu, sticky menu and footer), the Coal Mines page and the Pet Coke page. The Ports page header marks "Indian Ports" as the active page.
- Add the page to the sitemap with its own title, description, social tags, self-canonical and matching structured data (a list of the ports shown).

## Priority 2 — Coal Mines directory (no data changes)
- Keep all 139 entries, their spellings and page references exactly as they are.
- Go through the 115 flagged entries and group them by reason: spelling unclear, possible duplicate, operator questionable, state questionable, Hindi or broken text, or missing fields.
- Add a small "Source-listed, not verified" note to the directory. This keeps source data separate from the confirmed services and hub information above it.
- No names are corrected, no operators changed and no duplicates removed. Everything goes into the report.

## Priority 3 — Commercial data (check only)
- Check that the rate date "12 July 2026" is shown, prices are marked per ton and "indicative", and GST, TCS, freight and availability conditions are visible on the homepage rates, the estimator and the Pet Coke rows.
- Check that reference quantities are labelled as reference, not live stock. Fix only missing labels. No prices or dates change.

## Priority 4 — Testing
- Automated: existing tests (21+), plus new tests for the ports page (30 total, counts per state and page, filter, search and reset logic).
- Browser at 360, 390, 768 and 1280px: every navigation link across all pages and the mobile menus; searches and filters on both directories; contact form errors and valid WhatsApp message generation; quote buttons; estimator; no sideways scrolling; console errors; broken internal links; one H1 per page; labels on form fields.
- SEO: title, description, canonical and structured data on every public page, checked against what the page shows.
- Email: will be reported as not yet implemented (the button is switched off until the client provides an address).

## Final report
1. Ports per state. 2. Mines total and how many still need review. 3. Missing or duplicate source entries. 4. Files changed. 5. Tests and results. 6. Items the client still needs to verify: source company permission, the lab claim, the email address, real photos and founder details, the mines review list, an updated rate sheet, and the connected-app sign-in.

## Technical details
- New: `src/routes/ports.tsx` (`staticData.sitemap: true`, head with ItemList JSON-LD), `src/components/PortsDirectory.tsx`, `src/data/ports-directory.ts` (copy, filter helpers, review notice), `src/test/ports-directory.test.ts`.
- Edited: nav arrays in `DhanrajSite.tsx`, `CoalMinesLanding.tsx`, `PetCokeHeader.tsx` (or the shared nav data in `src/data/site.ts` if present); a directory note in `CoalMinesDirectory.tsx`; `roadmap.md`; `AGENTS.md` rule for the ports module.
- `src/data/ports.ts` and `src/data/mines.ts` are unchanged unless the PDF comparison finds a real mismatch, which would be reported before any change.
