# Credentialing national channel test: checklist

Created Nov 14 2026. Source: [credentialing-path-to-350-500k-net-2028.md](reports/credentialing-path-to-350-500k-net-2028.md) (v2). The test starts now instead of waiting for March; results are read in late January to mid-February 2027.

**Goal:** measure cost per paid credentialing client from direct mail and paid search, outside the formation funnel. Scale a channel at **≤ $1,200 per paid client**. If both channels come in **above $1,600**, fall back to the formation funnel plus groups.

**Budget:** about $14K in total: about $5K for direct mail, about $9K for search.

**Owner:** "Agent" means Claude does the work and Sid approves anything client-facing. "Sid" means only Sid can do it.

## Week of Nov 16, 2026: decisions and setup

- [x] **Sid:** approve maintenance prices: $69/month for therapists, $119/month for prescribers. **Approved Nov 16** (Sid approved them if the research found them best; it did: [upkeep pricing](reports/credentialing-upkeep-pricing-2026-11-16.md)).
  - Current upkeep is $249/yr. The report sets the market at $45–150/month.
- [x] **Sid:** pick the site structure: state hub pages on one site, or separate state sites (see the note at the end). **Nov 16: one site with state pages** ([decision log](decision-log.md)).
- [x] **Sid:** confirm the test states: NY, NJ, FL, TX, MD. **Confirmed Nov 16** (Sid: matches the research).
- [ ] **Sid:** approve the written service terms. These become the "proof" substitute:
  - We submit within 5 business days of a complete intake.
  - The client spends about 45 minutes in total.
  - We never invoice an insurer before it confirms in writing that it is open.
  - Credit or refund if an insurer declines after payment.
  - Flat published prices.
- [x] **Agent:** add the maintenance tiers, once approved, to the price list (**done Nov 16** in the expansion plan's price table; the planner cheatsheet has no upkeep price line): `PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md` and the planner cheatsheet.
- [ ] **Agent:** check Keyword Planner volumes and CPCs for credentialing terms in the five test states. **Nov 16 (Sid approved via API): blocked.** The API developer token has Explorer access, which Google doesn't allow for Keyword Planner (`DEVELOPER_TOKEN_NOT_APPROVED`). Routes: Sid applies for Basic access in the Ads API Center, or the agent reads Keyword Planner in the browser on Sid's signed-in Ads account, or Sid exports a CSV. Needs Sid's Google Ads access; the report's figures came from a third-party tool.

## Nov 17–28, 2026: build

- [ ] **Agent:** draft the landing page(s) for the five test states, following Sid's site-structure choice.
  - Each covers prices, the 5-day promise, panel check before invoicing, what the client does vs what we do, and state Medicaid notes.
- [ ] **Sid:** approve the landing page copy.
- [ ] **Agent:** pull the mailing list from the public NPI registry.
  - Who: new behavioral-health organization NPIs from the last 90 days in the five test states.
  - Exclude: existing clients and anyone formed with us who already has a credentialing case.
- [ ] **Agent:** draft the direct-mail piece: postcard or letter, one offer, a state-specific URL or QR code per state for tracking.
- [ ] **Sid:** approve the mail piece and the print/mail vendor and cost.
- [ ] **Agent:** draft the search campaign: one campaign per test state, exact and phrase match on credentialing terms, sent to that state's page.
- [ ] **Sid:** approve the campaign and the daily budget.
- [ ] **Agent:** set up tracking.
  - Mark each lead's source (mail, search, formation funnel) in the CRM.
  - Track inquiry → quote → paid conversion for each channel and state.
  - Log human minutes per job separately from agent work.
- [ ] **Agent:** set up the intake → panel check → quote flow for out-of-state clients.
  - Extend the panel-status tracker beyond NY: counties and payers per state.
  - Add network-inquiry contacts for the main payers in each test state.

## Dec 1–12, 2026: launch

- [ ] **Sid:** send mail batch 1 (about half the mail budget).
- [ ] **Sid:** turn on the search campaigns.
- [ ] **Agent:** within 1 business day, answer every inquiry with a draft card for Sid and record a panel check per insurer.

## Jan 5–16, 2027

- [ ] **Agent:** pull a fresh 90-day NPI list for mail batch 2.
- [ ] **Sid:** send mail batch 2 (the rest of the mail budget).
- [ ] **Agent:** report spend, inquiries, quotes and paid clients by channel and state every week.

## Late Jan – mid Feb, 2027: read the results

- [ ] **Agent:** write up cost per paid client for each channel and state, plus quote → paid rate, average ticket, maintenance attach rate and human minutes per job.
- [ ] **Sid:** decide.
  - **Either channel ≤ $1,200 per paid client:** scale that channel and state.
  - **Both channels > $1,600:** stop paid acquisition and stay with the formation funnel plus groups.
  - **In between:** run one more round with copy or offer changes.
- [ ] **Agent:** update the 2028 path plan and the decision log with the measured figures.

## Note: state-specific sites vs one national site

My recommendation: **one credentialing brand site with a strong page for each state**, not a separate site per state.

- **For separate state sites:**
  - Exact-match local branding, like nypllc.com for NY.
  - Pages that look local in search results.
  - Agents make the content cheap to produce.
- **Against separate state sites:**
  - Each new domain starts with no search authority.
  - Google treats many near-identical sites as doorway pages.
  - Every site multiplies upkeep: hosting, analytics, prices and legal text.
  - Paid search doesn't need separate domains, because ads can point to a state page on one site.
- **Recommended structure:**
  - **One site:** `/new-jersey`, `/florida`, … with real state-specific content (Medicaid program and plans, state rules, local panel notes from the tracker, state prices if they differ).
  - **NY:** stays on nypllc.com, where the credentialing page already exists, until the separate brand launches.
  - **Separate domains:** only for a state that later proves to be big enough to justify its own brand.
