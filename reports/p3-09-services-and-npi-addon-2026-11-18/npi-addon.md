# P3-09 Practice NPI add-on at checkout: draft (Nov 18 2026)

Draft only. No Spiffy change, no CRM change, no site change. The CRM was read only (a live filing worker runs there).

Source item: [p2-12 recut §3 P3-09](../../ops/p2-12-day45-recut-proposal-2026-11-14.md): "Practice NPI add-on at checkout for health professions, about $129. **Pass:** taken on 10% of health orders in its first 30 days. Each buyer is a credentialing lead."

## 1. What the service is

An organization (Type 2) NPI for the new PLLC, applied for in NPPES. The clinician keeps their own individual (Type 1) NPI; the PLLC bills under its Type 2 and the clinician is the rendering provider. The site's credentialing guide already explains this ([/ny-pllc-insurance-credentialing](../../web/src/app/ny-pllc-insurance-credentialing/page.tsx), step 1).

**Included:**
- Prepare the NPPES Type 2 application from what the CRM already holds: exact legal business name from the filed Articles, EIN (it must match the IRS record), mailing address, authorized official, and the taxonomy for the profession (the CRM's `PANEL_PROFESSIONS` list has the usual NUCC codes, e.g. LCSW 1041C0700X, LMHC 101YM0800X, PMHNP 363LP0808X).
- Submit it once the client has given us surrogate access in CMS I&A, or have them sign the paper CMS-10114. Workspace rule: we never take their NPPES or I&A password. The CRM credentialing plan uses the same route (step 4 for Danielle, step 3 for Gabriella).
- Check their Type 1 record while we're there and tell them if it shows an old license, credential or address (we fix it only if they ask, or as part of Foundation).
- Email the issued NPI and log it on the PLLC (`PllcCaqhInfo.type2Npi`).

**Not included:** CAQH, insurer applications, Medicaid or Medicare. Those are the credentialing tiers on the guide page.

**Who signs, and the authorized official.** NPPES requires an authorized official for an organization: a person with legal authority to bind it, and "only the authorized official(s) has the authority to sign the application on behalf of the organization provider" ([CMS-10114 instructions, HHS guidance copy](https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS-10114-Dec20.pdf)). For a one-owner PLLC that is the member. For a multi-member PLLC, any member (or a manager) can be named; we'd default to the person who placed the order and confirm.

**When it can be done.** Not at checkout. A Type 2 NPI needs the PLLC's legal name and EIN, and both exist only after DOS files the Articles and the EIN is issued. So fulfillment starts when the CRM records the EIN. This must be stated plainly in the box copy so nobody expects it in week one.

**Practice location.** NPPES wants a real practice location; older CMS-10114 versions say "P.O. Boxes Not Acceptable", and a 2026 OMB supporting statement says the form now allows a P.O. box only for providers with no location other than home, such as telehealth ([OMB supporting statement](https://omb.report/icr/202604-0938-010/doc/original/167833101.docx); not checked against the live NPPES form). Our Pearl River virtual address is a mailing address, not a practice location (same limit as the VM page). We ask for the practice address at fulfillment, by email, never as a checkout field.

**Government fee:** none. The NPI is free from NPPES.

## 2. Price check

| Seller | Type 2 NPI service price | Source |
|---|---:|---|
| EXP Credentialing Services | $100 flat, Type 1 or Type 2 | [expcredentialingservices.com/pricing](https://expcredentialingservices.com/pricing) |
| CM&D Credentialing | $120 one-time | [cmd-credentialing.com pricing](https://cmd-credentialing.com/my-front-page/pricing/) |
| PayerReady | $99 per profile (1–10), $50 at 10+ | [payerready.com/pricing](https://payerready.com/pricing) |
| KS Credential Bridge | $100 Type 2, $60 Type 1 | [services page](https://website-kscredentialbridge-com.pages.dev/services) (looks like a draft site; weakest source) |
| Our Foundation tier | Type 2 is included in $399 (with Type 1 update, CAQH, W-9) | [guide page TIERS](../../web/src/app/ny-pllc-insurance-credentialing/page.tsx); [CRM credentialing plan](../../../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md) §3 |

Market for standalone Type 2 help is **$99–$120**. $129 is a little above that.

**Recommendation: $129, credited in full toward Foundation ($399) or Move my contracts ($249 + $149 per insurer) if they upgrade within 90 days of the NPI being issued.**

Why $129 and not $99:
- It's sold at the moment of highest trust, alongside the formation, with nothing to fill in. We already hold every input. Competitors start from a blank intake.
- The credit is what makes it work as a credentialing lead. The buyer isn't paying twice if they go further, and Foundation's net price after the credit is $270, which is an easy next step to offer when the NPI is done.
- Cash cost is about $0 plus card fees; Sid's time is a few minutes of review per NPI (agents prefill). So the price question is about take rate, not margin.

If the 30-day take rate comes in under 5%, test $99 before dropping the box (decision 6 in the [README](README.md)).

Without the credit, $129 is hard to justify against $99–$120 elsewhere for a free federal form. With it, the box is close to a deposit on credentialing.

## 3. Checkout box copy

Rules: optional, **unchecked by default**, no extra fields, no pre-payment check, no extra step. Placed directly under the existing "insurance credentialing interest" box (or replacing it; decision 4).

**Label (one line):**
> Add a practice NPI for my PLLC (+$129)

**Description under the label (two short sentences):**
> For health care practices that plan to bill insurance. We apply for your PLLC's own NPI once the EIN is issued, and the $129 counts toward our credentialing service if you go further.

Notes on the copy:
- "For health care practices" does the filtering if Spiffy can't show the box only for health professions (see §4 step 2). An architect who ticks it anyway gets a refund email; at our volume that's rare.
- No "recommended", no countdown, no pre-checked state. Same tone as the S Corp box.
- Don't promise a date. "Once the EIN is issued" is honest; the EIN comes after DOS filing.

**Confirmation and follow-up email line (CRM, later):**
> You added a practice NPI. We'll apply for it once your PLLC's EIN is issued, usually a few weeks after we file. When it's ready we'll email you the number and what comes next if you want to take insurance.

## 4. Spiffy setup steps for Sid

Do these after Dec 1, in the Spiffy dashboard for the `new-york-pllc-formation` checkout. Nothing here was changed.

1. **Create the product.** Products → New: name **"Practice NPI (Type 2)"**, price $129, one-time. Note the product ID Spiffy assigns; the CRM change needs it (the S Corp item is matched by name "S-Corp Tax Election" or `product_id` 10123 the same way).
2. **Add it as a checkbox add-on** on the formation checkout, the same way the S Corp $195 box is set up. Set it **not selected by default** (`is_default: false`, as the VM box is). Check whether Spiffy can show it only when `practice_type` is a health profession. If it can, use that; if not, show it to everyone with the copy above.
3. **Paste the label and description** from §3.
4. **Place it** directly under the insurance credentialing interest box.
5. **Don't add any new required field.** The practice address is collected later by email.
6. **Leave the webhook as is.** The add-on rides on the normal formation order to `/api/webhooks/spiffy/order-success`, so it arrives in the CRM with the order. Until the CRM change in §5 ships, the item is only visible in the order's item list and Spiffy email, so **ship the CRM change first or same day**.
7. **Test** with a Spiffy test order (never by loading the live `/order/confirmation` page; it fires purchase tags).

The LLC checkout (`/order-llc`) and the MSO checkout don't get the box.

## 5. How the CRM receives it (needed change; not made)

**Today** (read-only check of `PLLC-CRM/crm`):
- `app/api/webhooks/spiffy/order-success/route.ts` reads `payload.items`. It finds S Corp by name/product ID and creates `PllcSCorpDesignation` with the sold price. VM is found by `hasVirtualAddressItem(items)`.
- The free credentialing box is read by `lib/spiffy/parse-spiffy-caqh-interest.ts` (`insurance_credentialing_interest`, legacy `caqh_interest`) and stored on `Order.caqhInterest`. `computeHasCaqhInterest` and `components/PllcHeader.tsx` show a staff badge from it; `app/page.tsx` filters on it.
- An unknown add-on item is ignored by the CRM. Its price lands in `Order.totalCents` (Spiffy's order total) with nothing recording what it was for.
- Credentialing work is tracked in `CredentialingEngagement` (status `SOLD` → … `COMPLETE`, `tier`, `amountCents`, `paidAt`) with `CredentialingItem` rows of kind `NPI_TYPE2`, `CredentialingPayment` and `CredentialingEvent`. `scripts/credentialing-create-engagement.ts` refuses a second engagement for the same clinician and PLLC.

**Change needed (for the CRM repo, after checking no filing worker is mid-run):**
1. New `lib/spiffy/find-spiffy-npi-addon-item.ts`: match the item by product ID (from step 1 above) or name "Practice NPI (Type 2)". Unit test like `has-virtual-address-item.test.ts`.
2. In `order-success/route.ts`, after the PLLC and Order upserts, when the item is present and a PLLC exists:
   - Upsert a `CredentialingEngagement` for (pllcId, billing customer): `status: SOLD`, `tier: 'npi_addon'`, `amountCents` from the item amount (default 12900), `paidAt` = order date. Idempotent on webhook retries: look up by pllcId + customerId first, as the S Corp block does.
   - Create one `CredentialingItem` of kind `NPI_TYPE2`, `NOT_STARTED`, waiting on EIN.
   - Create a `CredentialingPayment` (no Stripe invoice; description "Spiffy order #…") so credentialing revenue reports include it.
   - Add a `CredentialingEvent` "Sold at checkout as formation add-on".
   - Set `Order.caqhInterest = true` as well, so the existing badge, lead lists and the Nov 16 campaign script exclusions all see the buyer.
3. Finances: the $129 sits inside the formation `Order.totalCents`. Check that `credentialing-money` and the finances page don't count it twice (once as formation revenue, once as credentialing payment). Simplest is to mark the payment row as "included in Spiffy order total" and exclude it from the formation AOV, the same question the S Corp $195 already raises.
4. Upgrade path: when the buyer takes Foundation or Move my contracts later, **update the existing engagement's tier and amount** and record the $129 credit, rather than creating a new engagement (the create script would refuse anyway).
5. Trigger: when the EIN is recorded on the PLLC, flag the `NPI_TYPE2` item as ready to prepare (a staff task or the ops action board, whichever close-outs already use). No new cron needed.

## 6. How each buyer becomes a credentialing lead

1. **Checkout:** box ticked → CRM engagement `SOLD`, tier `npi_addon`, `caqhInterest` true, staff badge.
2. **EIN issued** (weeks after order) → item ready. One email asks for the practice address (or "telehealth from home") and for I&A surrogate access, with a two-line how-to. The client signs; we never take passwords.
3. **NPI filed and issued** → number logged; email with the number. Same email: "Next is CAQH and the insurers. Your $129 counts toward Foundation, so it's $270 from here." One link to the guide page. That's the lead touch.
4. **No reply** → one follow-up at 14 days, then the engagement closes as `COMPLETE` (NPI-only). Log every action as it happens; end at no gaps (workspace credentialing rules).

**Measures for the pass test (30 days from launch):**
- Take rate = orders with the NPI item ÷ health-profession formation orders placed through the PLLC checkout. Pass ≥ 10%.
- Separately track checkout completion rate for the 30 days before and after. The NY sales tax box was pulled on Aug 18 for low take rate and form friction; if completion drops, that matters more than the add-on revenue.
- Lead value, later: share of NPI buyers who take a paid tier within 90 days of their NPI being issued. This can't be read inside 30 days because fulfillment waits on the EIN.
