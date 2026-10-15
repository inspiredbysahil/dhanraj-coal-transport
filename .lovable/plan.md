# Apply client confirmations: email, lab claim, VISHWAKARMA permission

The client confirmed three items. This plan applies them in place — no layout or design changes.

## 1. Enable the email option (dhanrajcoaltransport@gmail.com)

- `src/data/quote-request.ts`: set `contactEmail` to `dhanrajcoaltransport@gmail.com`.
- Effect (already wired in `QuoteRequestSection.tsx`): the "Send via Email for Formal Quotation" button becomes enabled and opens a pre-filled mailto draft; the "Email address coming soon" note disappears; the email contact card (label "Email · Tenders & Proforma", badge "Formal tenders & proforma") appears in the contact section.
- Check for any other place that references the email being unavailable (footer, contact copy) and update wording if present.

## 2. Confirm the "100% GCV & Lab Verified" claim

- The claim already shows in the homepage assurance bar (`src/data/home.ts`). Mark it as client-confirmed in the data comment and in project memory so it is treated as approved, not provisional.
- No visual change — the claim stays exactly as it is.

## 3. Record VISHWAKARMA data permission

- The mines directory (139 entries) and its "VISHWAKARMA.WORL PRIVATE LIMITED" source heading stay as-is; permission is now confirmed by the client.
- Record the confirmation in project memory (`mem://features/mine-supply-trust`) so future work treats the dataset as licensed for use.
- If any page copy hedges on permission, soften it; otherwise no visible change.

## Not changed

- Founder quote/photo and impact numbers stay hidden (`approved: false`) — still unconfirmed.
- Prices, rates, products, WhatsApp numbers, layouts, and all other pages untouched.

## Verification

- Run existing tests (`bunx vitest run`) — all must still pass.
- Browser check: contact section shows the email card and an enabled email button; clicking it opens a mailto draft to dhanrajcoaltransport@gmail.com with the form details; WhatsApp flow unchanged.
- Update `roadmap.md` to mark these three items done.
