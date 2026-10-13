# Coal Mines Directory page (/coal-mines)

The newly attached PDFs are identical to the ones already imported, so the 139 mine entries already stored are reused. Nothing is re-guessed.

## 1. Data additions
- Add headquarters per state and operator, worded as printed: West Bengal "Saktoria, Pandaveswar, Paschim Bardhman District, West Bengal"; Chhattisgarh "Bilaspur"; Madhya Pradesh "Singrauli"; Telangana "Kothagudem, Bhadragri Kothagudem District, Telangana"; Jharkhand "Dhanbad"; Odisha "Sambalpur"; Maharashtra "Nagpur (Maharashtra)". Assam, Nagaland and Meghalaya have no HQ in the PDF, so they show "Not stated".
- Re-check every page of the PDF against the stored entries before finishing.

## 2. New page: Coal Mines
- Header and footer match the homepage style (same colours, fonts, pill buttons).
- Intro, and a note that this is "Source-listed directory, not independently verified", with the source document named.
- Summary: total entries (139), number of states, and entries flagged for review.
- Controls: search by mine name, State filter, Operator filter, "Show only flagged" toggle, and a Reset filters button. A results count updates live.
- List: State (collapsible, with count and HQ) → Operator → Coalfield/Area (collapsible) → mine rows.
- Each mine row shows the name as printed, "PDF p.X", and a "Needs review" tag with its note.
- "Expand all" and "Collapse all" buttons.
- Empty state: "No mines match your filters" with a reset button.
- Call/WhatsApp enquiry buttons at the end, using the existing number.
- Works on phone, tablet and desktop. Rows stack on small screens with no sideways scrolling.

## 3. Navigation
- Add a "Coal Mines" link to the homepage's desktop, mobile and sticky menus, and to the footer. All other links stay.

## 4. Search engines
- Own title, description, share tags and address link. The page is added to the sitemap.

## 5. Testing and report
- Automated check: counts per state are unchanged.
- In a browser at phone and desktop widths, test:
  - search (for example "Gevra", the Hindi "भरतपुर", and a name with no match)
  - each filter and the flagged toggle
  - reset, and expanding/collapsing sections
  - the menu link from the homepage
  - that the homepage rates, form and WhatsApp still work
- Report counts, duplicates and unclear names (the same list as before).

## Technical details
- `src/data/mines.ts`: add a `mineHeadquarters` record keyed by state and operator. Records stay unchanged.
- New route `src/routes/coal-mines.tsx` with `staticData: { sitemap: true }` and head(). The UI goes in `src/components/CoalMinesDirectory.tsx` and groups data with useMemo, with no hardcoded colours.
- Export `Nav`/footer pieces from `DhanrajSite.tsx` so the page reuses them. Anchor links point to `/#about` etc. when used off the homepage.
- Filters are kept in local state. A deep-linked search in the address bar is not needed now.
