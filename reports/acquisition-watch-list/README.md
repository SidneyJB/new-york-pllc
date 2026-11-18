# Acquisition watch list

**Started Nov 18 2026 by the agent. Refreshed monthly.** Basis: [decision-log.md](../../decision-log.md), row 2026-11-13 "Acquisition". Sid decided to **look lightly**: the agent keeps a watch list from public listings, with **no outreach and no lender contact unless Sid asks**. Background: [pressure test §6 and §9](../evidence/2028-pressure-test-2026-11-13/README.md) (a 15% chance of closing a $150–300K-profit business) and [credentialing upside paths, Path D §3.5](../credentialing-upside-paths-2027-2028.md) (buy a credentialing or credentialing-plus-billing book of about $500–700K revenue on retainers).

**Every figure below is what a public listing or search result showed, and none of it is verified.** Brokers' numbers are seller-reported and unaudited. No broker was contacted, no NDA was signed, no account was created, and no form was submitted.

Full data: [watch-list.csv](watch-list.csv) (31 rows: 12 live listings, 19 sold, pending or off-market comps).

---

## 1. Method

- **Searched** web search across the marketplaces, then read each live listing page in a browser. BizQuest and BizBuySell block automated fetches. No sign-in was used. Pages behind "Sign In to View" or a contact form were not opened.
- **Recorded only** what the page shows: title, URL, location, asking price, revenue, cash flow/SDE, EBITDA, year established, employees, remote, listing date, broker. **No listing showed a posting date.** BizBuySell shows only the ad number, so `first_seen` in the CSV is the first date we saw it.
- **Status check.** A listing is "Live" only if its page loaded on Nov 18. Sold, pending and removed listings are kept as **price comps**, and their figures are marked as coming from a search snippet when the page itself could not be read.
- **Stopped** when BizBuySell began returning "Access Denied" to broker-profile pages. I did not try to work around it.

### Filter criteria

| Line | Wanted | Size | Where |
|---|---|---|---|
| 1. Insurance credentialing / provider enrollment | Retainer or recurring re-credentialing clients | Revenue $300K–$1M (Path D); profit $150–300K (pressure-test scenario) | Remote-operable; NY clients a plus |
| 2. Medical billing / RCM with a credentialing book | Behavioral health first | Same | Same |
| 3. Business formation / registered agent / compliance filing | Professional entities, NY a plus | Any size, for comps | Remote |
| 4. Virtual mailbox / RA books | NY address or remote | Any size, for comps | NY or remote |

**Fit score (1–5)** in the CSV: 5 = the Path D shape (credentialing retainers, remote, in size); 1 = outside our lines or size.

### Sources checked (Nov 18 2026)

| Source | Result |
|---|---|
| BizBuySell: medical billing category, its "established" view, consulting category, one keyword search | 12 relevant live listings (W01–W12). Keyword search ignored the term. |
| BizQuest: medical billing category; 14 detail URLs from search | Same inventory as BizBuySell. Every BizQuest-only credentialing listing found by search was off market. |
| LoopNet business listings (loopnet.ca mirrors of BizBuySell ads) | Two credentialing/BH billing listings, both 404 |
| Synergy Business Brokers | One sold credentialing comp (C01). Page 1 of 355 had nothing else in our lines; keyword filter not used. |
| Website Closers | One pending BH billing comp (C02), one removed (C03). Page 1 of 163 had nothing else in our lines. |
| BusinessBroker.net | Listing 1007469 now resolves to a search page (removed) |
| BusinessesForSale.com | Three relevant listings, all "no longer available" |
| Flippa | One sold LLC-formation affiliate content site; no service books |
| Empire Flippers, Acquire.com, Quiet Light, FE International | Search found nothing in our four lines. Acquire.com needs an account to browse, so it was not opened. |
| SearchFunder (public posts) | One formation/registered-agent comp under LOI (C13) |
| Axial | Teasers need a member account; not opened |
| RCM-specialist brokers | One broker (BizBuySell profile, says 50+ RCM/credentialing deals) returned Access Denied; not retried |

---

## 2. Ranked candidates (live on Nov 18)

**No live listing matches Path D** (a credentialing retainer book of $500–700K revenue). The two closest businesses are already sold (C01) or pending (C02). Live listings are billing-first.

| Rank | ID | Listing | Ask | Revenue | SDE | Ask ÷ SDE | Why it's on the list | Red flags |
|---|---|---|---:|---:|---:|---:|---|---|
| 1 | W01 | [Established Medical Billing Business, Mansfield TX](https://www.bizbuysell.com/business-opportunity/established-medical-billing-business/2575836/) | $225,000 | $168,000 | $77,200 | 2.9× | ~50% mental-health clients, credentialing offered, 4 remote contractors, seller financing | Too small for the scenario's $150–300K profit; founded 2023 |
| 2 | W02 | [Established Medical Billing Business, Experienced Team, Dallas County TX](https://www.bizbuysell.com/business-opportunity/established-medical-billing-business-experienced-team-500k/2574992/) | $500,000 | $274,714 | not disclosed | n/a (1.8× revenue) | 100% remote, offshore team does ~90%, credentialing listed | SDE hidden; revenue shown as Stripe totals; asset sale, LLC excluded |
| 3 | W03 | [Medical Billing Company With Recurring Monthly Revenue, SC](https://www.bizbuysell.com/business-opportunity/medical-billing-company-with-recurring-monthly-revenue/2570181/) | $381,000 | $437,000 | $110,000 | 3.5× | Since 1999, retiring owner, Northeast clients, relocatable | No credentialing; chiro/PT, not behavioral health; owner works a book personally |
| 4 | W04 | [600k SDE Medical Billing, Specialty Behavior Health, Ohio](https://www.bizbuysell.com/business-opportunity/600k-sde-medical-billing-company-specialty-behavior-health-growing/2435743/) | $2,900,000 | $2,600,000 | $600,000 | 4.8× | Behavioral-health billing, 39 staff, absentee with managers | "No SBA loans, buyer must have cash"; far above our capacity |
| 5 | W05 | [$450K owner benefit billing company with software, WV](https://www.bizbuysell.com/business-opportunity/450-000-owner-benefit-growing-medical-billing-company-with-software/2171676/) | $2,200,000 | $1,400,000 | $450,000 | 4.9× | Psych is one of many specialties | Earnout plus "no loans" (SBA bans seller earnouts) |

Not ranked, out of fit (in the CSV): W06 turnaround billing in IL, W07–W08 large healthcare consultancies, W09–W11 hospital, EMS and school billing, W12 outbound mail automation (not a mailbox book).

**Worth watching for a relist or a collapse:**
- **C02**, Website Closers WC 4081: behavioral-health billing with credentialing, 21 clients, $2.2M ask on $548,378 cash flow, owner 1–2 h/week, **pending**.
- **C04** ($1M-revenue credentialing, payor enrollment and RCM business) and **C05** ($1.415M revenue, $470K EBITDA credentialing and billing business, Dallas, remote). Both are the Path D shape and were gone before Nov 18.

**Lines 3 and 4: nothing live.** The only formation/registered-agent comp is a Montana LLC and vehicle-registration business ($4.4M revenue, $900K EBITDA, under LOI per the poster, C13). The only virtual-mail listings (Seattle; a NY County coworking site with mail clients) were removed.

---

## 3. Valuation multiples observed (asking prices, not sale prices)

| Category | n | Ask ÷ SDE/cash flow | Ask ÷ revenue | Listings |
|---|---:|---|---|---|
| Credentialing and compliance, remote, retainers (**sold**) | 1 | **3.2×** | 1.9× | C01 [Synergy](https://synergybb.com/listings/high-margin-credentialing-and-compliance-services-firm-with-built-in-saas-upside/) |
| Behavioral-health or specialty billing (C02 and C06 list credentialing) | 4 | 3.7–4.8× | 1.1–3.5× where shown | C02 [Website Closers](https://www.websiteclosers.com/businesses/medical-billing-company-21-active-clients-85-net-margin-9-year-business-50k-average-contract-size-full-staff-in-place-zero-ad-spend/119279/) 4.0×; C03 3.7× (search summary); W04 4.8×; C06 4.8× (snippet) |
| Small billing books (ask under $500K) | 2 | 2.9–3.5× | 0.9–1.3× | W01, W03 |
| Larger billing/RCM ($900K–$6.75M ask) | 5 | 4.5–6.8× | 0.8–2.2× | W05, W08–W11 |
| **All priced billing/credentialing listings** | 11 | **2.9–6.8×, median 4.8×** | — | Above |
| Formation / registered agent | 0 priced | — | — | C13 had no asking price |

Reading:
- Asks run above sales. The one closed comp sold at 3.2× cash flow; the asks cluster near 4–5×.
- Small owner-run books ask about 3×.
- **[S]** The earlier Path D note cited a BizBuySell medical-billing overview at a median ask of $2.1M on $382K SDE (about 5.5×). That figure came from a search summary and was not re-checked here.

---

## 4. What an SBA 7(a)-financed deal would need (published SBA sources only)

**Sources:**
- [SBA 7(a) terms, conditions and eligibility](https://www.sba.gov/partners/lenders/7a-loan-program/terms-conditions-eligibility), read Nov 18.
- **SOP 50 10 8.1, Technical Updates, effective Oct 1 2026**, Appendix 15 "7(a) Changes of Ownership" ([SOP 50 10 page](https://www.sba.gov/document/sop-50-10-lender-development-company-loan-programs); the .docx was downloaded from the SBA site and read). **[SBA]**

| Rule | What SBA publishes |
|---|---|
| Max loan | $5M **[SBA terms page]** |
| Max variable rate | Base rate + 3.0% for loans over $350K; +4.5% for $250,001–350K; +6.0% for $50,001–250K **[SBA terms page]**. Today's prime was not checked. |
| Term | 10 years or less for non-real-estate uses, including a business purchase; fully amortizing, no balloon **[SBA terms page; SOP App. 15]** |
| SBA guaranty to the lender | 75% for loans over $150K **[SBA terms page]** |
| Deal type | "Initial Acquisition" is the default. "Business Expansion" requires that the buyer has operated at least 2 full fiscal years, buys 100% of a business in the **same 4-digit NAICS group**, and the lender documents it **[SOP App. 15 §B]**. Whether a PLLC-formation company and a credentialing or billing firm share a NAICS group is **not checked**. |
| Equity injection | **10% of total project cost.** For an Initial Acquisition it cannot be reduced. For a Business Expansion the lender may reduce it if liquidity and working capital are sufficient. Seller debt on **full standby** (no principal or interest for the loan's term) counts, but limited sources together may supply **no more than half** of the required injection **[SOP App. 15 equity requirements]** |
| Debt service coverage | Initial Acquisition **1.25:1**; Business Expansion 1.15:1, on the last year-end or a two-year average **[SOP App. 15 credit analysis]** |
| Valuation | Independent valuation by a qualified source (ABV, CVA and others) ordered by the lender. At $350K or less the lender may value it itself. A Quality of Earnings report is required at $3M and up. A price above the valuation must be covered by equity **[SOP App. 15 §C.1]** |
| Seller | **Seller earnouts are prohibited.** In an Initial Acquisition or Business Expansion the seller may not stay as an owner or employee; a consulting contract of up to 24 months is allowed **[SOP App. 15 §A]** |
| Guaranties | Anyone with 20%+ ownership gives an unlimited personal guaranty **[SOP Section A]** |
| Verification | The lender verifies the seller's figures against IRS transcripts and reviews 3 years of financials **[SOP App. 15]** |
| Intangibles | Goodwill and client lists may be financed if the valuation rules are met **[SOP App. 15 §A]** |

**Illustration [A, rate assumed; not a quote]:** 90% financed, 10-year full amortization, at 9.5% and 10.5% (no fees or closing costs).

| Price | Loan (90%) | Cash equity (10%) | Annual debt service | Cash flow needed at 1.25× |
|---:|---:|---:|---:|---:|
| $225,000 (W01) | $202,500 | $22,500 | $31–33K | $39–41K |
| $500,000 (W02) | $450,000 | $50,000 | $70–73K | $87–91K |
| $1,200,000 (C01-type) | $1,080,000 | $120,000 | $168–175K | $210–219K |
| $2,900,000 (W04; listing says no SBA) | $2,610,000 | $290,000 | $405–423K | $507–528K |

At these numbers, W01's $77,200 SDE and C01's $376,782 cash flow both clear 1.25×. Whether they still clear it **after paying someone to replace the seller** is the lender's call and is not modeled here.

**Not done (by decision):** no lender contacted, no rate quote, no NAICS ruling.

---

## 5. Monthly refresh (how to append)

Each month, the agent:
1. Re-opens every row in [watch-list.csv](watch-list.csv) whose status is not Sold. It updates `last_checked` and `status_on_last_check`, and it never deletes a row.
2. Re-checks the same sources as §1, and adds new listings with new IDs (W13 onward for live listings, C20 onward for comps) and `first_seen` set to that date.
3. Appends a dated section below, using the template. It leaves §1–§4 as dated history unless a figure is corrected; a correction is noted in the month's section.

Same rules apply: public listings only, no outreach, no sign-ups, no forms, no lender contact unless Sid asks.

Template:

```
### YYYY-MM-DD refresh
- Checked: <sources>. New: <IDs>. Status changes: <ID: old → new>.
- Path D match (credentialing retainer book, $500–700K revenue, remote)? <yes: ID / no>
- Top 3 now: <ID — one line each>
- Notes: <anything Sid should see>
```

---

## Refresh log

### 2026-11-18 (first build)
- Checked: the sources in §1. Logged 31 rows: 12 live (W01–W12), 19 comps (C01–C19).
- Path D match: **no.** The closest (C01) is sold and C02 is pending. C04 and C05 fit the shape and were already off market.
- Top 3: W01 (small BH-heavy billing with credentialing, $225K), W02 (remote billing with credentialing, $500K, SDE hidden), W03 (25-year billing book, $381K, no credentialing).
- Lines 3–4 (formation, registered agent, virtual mail): nothing live; one formation comp under LOI (C13).
