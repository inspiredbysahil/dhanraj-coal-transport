# Audit and staged improvement plan

## Audit findings (from current code)

**Trust and honesty (highest impact)**
- Generated photos are presented as real: founder portrait, loading site, trucks, products. The brief forbids invented company photos.
- A "Founder" quote is invented (no real name or words supplied).
- Numbers shown as fact need confirmation: 63,000 MT/month, 100+ clients, 15 ports, 28 states, "Trusted by 100+ industrial clients".
- Footer LinkedIn / Instagram / "Enquiry" icons only jump to the form — they look like real links but are not.
- No email address exists anywhere, yet a mail icon is shown.

**Enquiry flow**
- The form does not send anything; it builds a WhatsApp message. Labels say "Send enquiry", which is misleading. Missing: product, quantity, delivery location fields, clear note that it opens WhatsApp.
- Call/WhatsApp buttons are consistent (+91 63761 39600), but the second contact (Aditya Singh Jaryal) needs confirming.

**SEO / technical**
- Page addresses, canonical links, sitemap and robots.txt all point to the old address `coal-visual-connect.lovable.app`, not the live `dhanraj-coal-transport.lovable.app`. Search engines will be sent to the wrong site.
- Homepage renders only in the browser (no pre-rendered content), weakening SEO.
- Pet Coke page still uses the old header/footer, inconsistent with home.
- Several hardcoded colors in the page break the "colors only in tokens" rule.

**Responsive** — not yet measured; stage 3 will test 360/390/768/1024/1440 and fix overflow, cropping, tap sizes.

## Stages (each reported separately with what was tested)

1. **Correct information & SEO base** — switch all addresses to the live site, fix robots/sitemap/canonical/og links, enable server rendering of the homepage, remove dead social icons and mail icon.
2. **Honest content** — remove or clearly mark generated photos and the founder quote; hide unconfirmed numbers until you confirm them (placeholders shown only after your answer).
3. **Enquiry form** — add product, quantity, delivery city fields; validation messages; button wording "Continue on WhatsApp"; confirmation state. Tested by opening the generated WhatsApp link.
4. **Responsive & accessibility pass** — test at 5 widths, fix issues, heading order, alt text, tap sizes, reduced motion, move hardcoded colors to tokens.
5. **Pet Coke page** — apply same header/footer.

## Needed from you
- Real photos (trucks, yard, loading), founder name/photo/quote — or permission to remove those sections.
- Confirm or correct the four statistics and second contact person.
- Business email, LinkedIn/Instagram links (if any).

## Technical details
- Replace `coal-visual-connect` base URL with one constant in `src/data/site.ts`, used by index, pet-coke, sitemap route; update `public/robots.txt`.
- Remove `ssr: false` from `/` after confirming no browser-only imports at module load.
- Content edits stay in `src/data/home.ts`; form logic in `DhanrajSite.tsx` with zod.
