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
- [ ] **Sid:** approve the written service terms. **Nov 16:** drafted ([terms draft](reports/credentialing-service-terms-draft-2026-11-16.md)); waiting on Sid's call on when we charge (written pre-check vs insurers with no pre-check) and the smaller defaults. These become the "proof" substitute: **Nov 18: all 9 open questions answered** ([decision log](decision-log.md)); terms draft and site updated. Still needs counsel on the items listed in the draft before publishing.
  - We submit within 5 business days of a complete intake.
  - The client spends about 45 minutes in total.
  - We never invoice an insurer before it confirms in writing that it is open.
  - Credit or refund if an insurer declines after payment.
  - Flat published prices.
- [x] **Agent:** add the maintenance tiers, once approved, to the price list (**done Nov 16** in the expansion plan's price table; the planner cheatsheet has no upkeep price line): `PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md` and the planner cheatsheet.
- [x] **Agent:** check Keyword Planner volumes and CPCs for credentialing terms in the five test states. **Nov 16 (Sid approved via API): blocked.** The API developer token has Explorer access, which Google doesn't allow for Keyword Planner (`DEVELOPER_TOKEN_NOT_APPROVED`). Routes: Sid applies for Basic access in the Ads API Center, or the agent reads Keyword Planner in the browser on Sid's signed-in Ads account, or Sid exports a CSV. Needs Sid's Google Ads access; the report's figures came from a third-party tool. **Done Nov 19** in the browser on the NYPLLC account (152-988-0213): [report](reports/credentialing-keyword-planner-2026-11-19/README.md). 8 core head terms total about 1,040 searches/month across the 5 states (TX 340, FL 280, NY 230, NJ 100, MD 90), below the draft's 1,500–2,500; state-named terms return no data. At the draft's assumptions that is roughly $1–4K of spend Dec 3–Feb 14, so treat $9K as a ceiling; NJ and MD fall under the draft's merge rule (under 200 searches). Not done: forecast tab, full 127-term list. Keyword Planner autosaved 2 draft plans in the account (Sid may delete).

## Nov 17–28, 2026: build

- [x] **Agent:** draft the landing page(s) for the five test states, following Sid's site-structure choice. **Done Nov 16:** one site with home, pricing, terms, intake and NY/NJ/FL/TX/MD guides (sourced), restyled away from AI tells and humanized; local repo `credentialing-site` (no remote yet). Brand, phone and address are placeholders.
  - Each covers prices, the 5-day promise, panel check before invoicing, what the client does vs what we do, and state Medicaid notes.
- [ ] **Sid:** approve the landing page copy.
- [x] **Agent:** pull the mailing list from the public NPI registry. **Done Nov 18:** [list README](reports/credentialing-npi-list-2026-11-18/README.md) (CSV gitignored): 2,543 new BH Type 2 NPIs Aug 20-Nov 18 (FL 689, TX 691, NY 427, NJ 399, MD 337; ~2,406 unique addresses); 1 client + 86 large systems dropped; 19 own customers flagged. Re-run: `scripts/pull_credentialing_npi_list.py`. MBS tenant DB not checked for exclusions.
  - Who: new behavioral-health organization NPIs from the last 90 days in the five test states.
  - Exclude: existing clients and anyone formed with us who already has a credentialing case.
- [x] **Agent:** draft the direct-mail piece: postcard or letter, one offer, a state-specific URL or QR code per state for tracking. **Done Nov 18:** [draft](reports/credentialing-direct-mail-draft-2026-11-18/README.md): 6x9 First-Class postcard, one offer (pay for an insurer only after its written yes), per-state short URL + QR + code; Stannp ~$0.73/card (Lob $1.03 fallback); batch 1 ~1,700 pieces ~$1,250. Nothing ordered.
- [x] **Sid:** approve the mail piece and the print/mail vendor and cost. **Approved Nov 18:** 6x9 postcard, Stannp (Lob fallback), batch 1 ~1,500 individual practices; offer line changed to credit-or-refund.
- [x] **Agent:** draft the search campaign: one campaign per test state, exact and phrase match on credentialing terms, sent to that state's page. **Done Nov 18:** [draft](reports/credentialing-search-campaign-draft-2026-11-18/README.md): separate Ads account recommended; 5 campaigns x 5 ad groups, ~600 keywords, manual CPC; $9K Dec 3-Feb 14 (TX $2,264, FL $1,968, NY $1,700, MD $1,622, NJ $1,446). Nothing built in any account.
- [x] **Sid:** approve the campaign and the daily budget. **Approved Nov 18:** new account under the manager login, billed to the credentialing LLC, $9K Dec 3-Feb 14 as drafted; live only on Sid's go.
- [x] **Agent:** set up tracking. **Done Nov 18** (CRM `0551608d` merged to main, live in production `cd14d74f`; migration `20261118120000` applied): lead table (source, state, inquiry → quote → paid), human vs agent minutes, `npm run credentialing-lead`, intake route. Note: [channel-tracking.md](../PLLC-CRM/crm/docs/credentialing/systems/channel-tracking.md). Not yet done (Nov 19): the site form is not wired to `/api/credentialing/leads` (credentialing-site is an undeployed draft); wire it when the site goes live.
  - Mark each lead's source (mail, search, formation funnel) in the CRM.
  - Track inquiry → quote → paid conversion for each channel and state.
  - Log human minutes per job separately from agent work.
- [x] **Agent:** set up the intake → panel check → quote flow for out-of-state clients. **Done Nov 18** (CRM `0551608d` on main; migration applied): NJ/FL/TX/MD county keys, `--state` on lookups, 38 payers / 60 contacts (some unverified) in `payer-network-contacts-2026-11-states.json`; all 60 contacts imported into production (checked Nov 19). The sweep stays off per state until Sid turns it on (`enabled` per state in the watchlist; all four are still off).
  - Extend the panel-status tracker beyond NY: counties and payers per state.
  - Add network-inquiry contacts for the main payers in each test state.

- [x] **Agent:** ABA prep (Sid, Nov 18: ABA stays on the postcard list): add licensed behavior analyst to the panel tracker, and draft a technician-roster price for Sid. Both before mail batch 1. **Done Nov 18** (CRM `0551608d` on main): tracker done; price approved Nov 18 ($99/technician/insurer, $79 for 5+, $149 Medicaid per state; [ABA prep](reports/aba-credentialing-prep-2026-11-18.md)).
- [x] **Agent:** build the batch-1 mail file from the NPI list: drop our 19 customers and the clinic/agency-only rows (Sid, Nov 18; [decision log](decision-log.md)). **Done Nov 18:** [README § Batch 1 file](reports/credentialing-npi-list-2026-11-18/README.md): 1,831 pieces (NY 286, NJ 281, FL 550, TX 502, MD 212); NY letter overlaps also removed; ~$1,337 at Stannp.

- [x] **Agent:** CRM: let a credentialing engagement exist without one of our PLLCs (clients who didn't form with us), so mail/search leads can be entered (Sid, Nov 18). **Done Nov 18** (CRM `0551608d` on main; migration `20261118180000_add_credentialing_outside_clients` applied in production, checked Nov 19). Authorization + W-9 and Cognito matching: next item.
- [x] **Agent:** make the credentialing authorization + W-9 generator and the Cognito intake / Signed W-9 Upload matching work for outside clients (needed before the first mail/search client signs). The old CAQH intake wizard is deprecated (Sid, Nov 10) and out of scope. **Done Nov 18** (CRM `14532d5f`, `0dd98a08`, `cd14d74f` on main): `generate-credentialing-docs.ts --client-id`; Cognito intake matches by practice name; Signed W-9 Upload needs no CRM link ([outside-clients.md](../PLLC-CRM/crm/docs/credentialing/systems/outside-clients.md)). Optional for Sid in Cognito: relabel "PLLC" wording to "practice".

## Dec 1–12, 2026: launch

- [ ] **Sid:** send mail batch 1 (about half the mail budget).
- [ ] **Sid:** turn on the search campaigns.
- [ ] **Agent:** within 1 business day, answer every inquiry with a draft card for Sid and record a panel check per insurer.

## Jan 5–16, 2027

- [ ] **Agent:** NY DOS letter, first drop (Sid, Nov 18; [decision log](decision-log.md)): re-run the list, drop customers and do-not-send, show Sid the letter text, send ~450 Sep-Dec filings via Lob First Class. The `nypllc.com/insurance` redirect must be live first (build after Dec 1, deploy on Sid's go).
- [x] **Agent:** before mail batch 1, drop NY rows that are on the DOS letter list from the postcard file. **Done Nov 18** (54 removed; same file).

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
