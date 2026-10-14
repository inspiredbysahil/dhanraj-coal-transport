# Quick Order & Tax Estimator

## What will change
- Replace the existing compact calculator directly below the Rate Chart with a professional **Quick Order & Tax Estimator**, preserving the chart and its filters.
- Match the current light design and lime action accent. Use subtle glass only around supporting chrome; keep inputs and monetary figures on opaque, readable surfaces.

## Customer inputs
- **Coal grade:** select a specific entry from the full rate list. Each option identifies grade/vessel, GCV/GAR, mine/port and listed unit price so similarly named grades remain distinguishable.
- **Quantity (MT):** number input, initially 100, with a minimum of 100 MT. Allow decimal quantities; show an inline error for blank, invalid or below-minimum values rather than silently changing them.
- **Delivery City / State:** required text input, accepting the customer's destination without inventing freight rates.

## Live estimate
- Display selected rate and separate amounts in Indian rupees:
  - Base Coal Amount = quantity × selected rate.
  - GST (18%) = base amount × 0.18.
  - Estimated Total Before Freight = base amount + GST.
- Format monetary amounts consistently to two decimal places and suppress misleading totals for invalid quantities.
- Keep the estimate explicitly indicative: freight excluded, TCS as applicable, loading according to the selected row's remarks, availability and final quotation subject to confirmation. Show the maintained rate-sheet date.

## WhatsApp request
- Add the prominent button **Get Final Landed Price (Incl. Freight) on WhatsApp** with a WhatsApp/message icon; allow its full label to wrap neatly on narrow screens.
- Validate quantity and destination before opening WhatsApp for **+91 63761 39600**.
- Prefill grade/vessel, category, GCV/GAR, mine/port, listed rate, quantity in MT, delivery destination, base amount, GST, estimated total before freight, rate-sheet date and relevant remarks, followed by a request for the final landed price including freight and applicable charges.
- Open a safely encoded WhatsApp link. Do not imply that the request was sent or an order was placed.

## Technical details
- Create a focused estimator component and remove the old rate-only calculator state from `RateTable.tsx`.
- Keep widget copy, tax/minimum settings, calculation and message helpers in typed `src/data` exports; use the existing rates and `whatsappUrl` helper without modifying source rows or contact details.
- Use existing design-system controls and semantic styling tokens. This is a browser-side estimator: no new storage, sign-in, integrations or freight service.
- Record the component/data separation in `AGENTS.md` during implementation.

## Verification
- Test exact calculations: 100 MT at ₹9,200 gives ₹9,20,000 base, ₹1,65,600 GST and ₹10,85,600 before freight; verify another grade and decimal quantity.
- Test blank, negative, below-100 and invalid quantity values, and missing/whitespace-only destination; ensure errors are clear and invalid requests do not open WhatsApp.
- Confirm changing grades updates the price and all totals, and decode the WhatsApp request to verify every selected detail and the correct recipient.
- Check keyboard access, visible labels, readable amounts and the full CTA at desktop and mobile widths without overflow.
- Run relevant existing tests plus new estimator tests, verify the live request flow, and check browser/build diagnostics.

## Unchanged
Existing pricing rows, rate-chart filters/search/sorting/export, row quote links, other enquiry forms, contact details and permissions remain unchanged. No freight amount or confirmed landed price is fabricated.