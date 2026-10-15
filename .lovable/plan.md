# B2B SEO, WhatsApp previews and buyer FAQs

Preserve the existing design, source directories, rate sheet, estimator and quotation workflow. Use accurate indicative-rate and enquiry wording, as confirmed, rather than imply live prices or stock.

## 1. Page-specific search metadata

Set titles and descriptions through the existing route-head system so they render in the initial HTML and update on navigation.

| Page | Title |
| --- | --- |
| `/` | Dhanraj Coal Transport \| Coal & Pet Coke Supplier in India |
| `/coal-mines` | Domestic Coal Mine Rates: Dhanbad, Ramgarh & Raniganj \| Dhanraj Coal |
| `/pet-coke-price` | Pet Coke Price Per Ton & Quotes \| Kandla, Tuna & Navlakhi Port |

Descriptions:
- **Homepage:** “Indicative GCV-wise rates for domestic coal and imported Indonesian coal; Pet Coke quotes for Kandla, Navlakhi, Dhanbad & Ramgarh enquiries. Pan-India road & rail dispatch. MOQ 100 MT.”
- **Coal Mines:** “Request direct coal lifting quotes for BCCL Dhanbad, CCL Ramgarh & ECL Raniganj. Explore listed grades and GCV references with lab verification and pan-India logistics.”
- **Pet Coke:** “Request imported & refinery Pet Coke prices per ton for Kandla, Tuna & Navlakhi. Typical references: 7800–8500 GCV, ash below 1%. MOQ 100 MT; specifications and availability confirmed per lot.”

Keep the visible 12 July 2026 coal-rate date and all current prices unchanged.

## 2. WhatsApp and social previews

- Set the shared site name to **Dhanraj Coal Transport (Dhanraj Traders)**.
- Homepage social title: **Coal & Pet Coke Rate Chart and Quotes | Dhanraj Coal Transport**.
- Homepage social description: **Check indicative GCV-wise ₹/ton coal rates and request Pet Coke prices for Kandla, Tuna, Navlakhi, Dhanbad & Ramgarh. Get a landed-price quote on WhatsApp (+91 63761 39600).**
- Give Coal Mines and Pet Coke their own social titles/descriptions matching their page metadata.
- Create lightweight 1200×630 share renditions from the existing photos: the displayed coal-mine hero for the homepage and Coal Mines, and the displayed Pet Coke photo for Pet Coke. No new imagery or replacement of displayed photographs.
- Put absolute published-domain image URLs in both `og:image` and `twitter:image` on each page; include image dimensions, descriptive alt text and `summary_large_image` Twitter cards.
- Keep each canonical and `og:url` pointed at that page itself.

## 3. Google JSON-LD

- Extend the existing business schema rather than duplicate it. Use a stable business identifier and the name **Dhanraj Coal Transport (Dhanraj Traders)**, telephone **+91-63761-39600**, GSTIN **21EWPPR7307G1ZA**, verified address, email and area served **India**.
- Describe the four requested categories through `makesOffer`: Domestic Coking & Steam Coal, Imported Indonesian Coal, Fuel Grade Pet Coke and Wood Coal. Do not invent offer prices, availability, ratings or inventory.
- Include the consistent business entity on all three requested pages and link relevant existing Product/page schemas to it.
- Retain only structured claims consistent with visible content; retain the existing FAQPage schema and synchronize it with the updated accordion. FAQ markup does not guarantee Google FAQ rich results.

## 4. B2B Buyer FAQ

Update the existing FAQ accordion immediately above `#contact` instead of adding a duplicate section. Use the heading **Frequently Asked Questions (B2B Buyer FAQ)** and these five questions:

1. What is the Minimum Order Quantity (MOQ) for coal and pet coke dispatch?
2. Which ports and coal mines do you lift from?
3. Are the listed ₹/ton rates inclusive of GST, TCS, and freight?
4. How do you verify GCV, Ash %, and moisture before dispatch?
5. How fast can I get a landed-price quote to my factory pin code?

Answers will state the 100 MT minimum; distinguish supply enquiries from source-listed directories; explain indicative dated rates, 18% GST extra, applicable TCS, freight and row-specific loading conditions; explain confirmed pre-dispatch GCV/moisture checks and lot-specific lab reports for ash and other specifications; and repeat the confirmed 15-minute response promise during Mon–Sat, 9 AM–8 PM IST, requesting plant location, pin code, grade and quantity. No new guarantee of immediate dispatch or stock.

## Technical details

- Keep business copy and SEO/schema configuration in typed `src/data` exports, consumed by the existing `head()` definitions in `src/routes/index.tsx`, `coal-mines.tsx` and `pet-coke-price.tsx`.
- Use `src/routes/__root.tsx` only for shared site-name/default metadata. Do not place canonical links or share images there.
- This project uses TanStack Start route heads, not a static `index.html`; implement the requested tags through that existing mechanism, without creating a second head system.
- Update `src/data/faq.ts` and the focused FAQ presentation only as needed; preserve existing accordion styling, keyboard behavior and search.
- Record the accurate-price wording requirement and shared SEO structure after approval.

## Verification and release

- Test initial HTML and browser navigation across all three pages for title/description updates, one canonical, correct social metadata, valid JSON-LD and no stale page tags.
- Check share images load locally, are JPEGs at 1200×630 and remain a few hundred KB or less; check published URLs after the next publish.
- Exercise all five FAQs and FAQ search at desktop and mobile sizes; verify readable text, no sideways scrolling and no browser errors.
- Run relevant automated tests and new metadata/schema/FAQ checks; inspect preview error logs.
- Report what was verified. Changes reach the live URL only on the next publish; actual WhatsApp preview fetching requires that publish and may then require re-fetching by the platform. Do not claim a live WhatsApp preview was verified beforehand.