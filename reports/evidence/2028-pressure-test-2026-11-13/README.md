# Pressure test of the 2028 path-to-$1M plan (Nov 13 2026)

**Prepared by:** Agent, at Sid's request. **Pulled:** Nov 13 2026 evening ET; every script here was re-run just after midnight on Nov 14 to save its output. **Decision owner:** Sid.

This folder is the evidence behind the pressure test of [nypllc-2028-path-to-1m-plan.md](../../../nypllc-2028-path-to-1m-plan.md). All reads were read-only. Nothing was sent, filed, changed in the CRM, Stripe, the site or any ad account. Nothing here names a client, an order or an entity.

What came out of it: Sid's decisions are in the [decision log](../../../decision-log.md) (Nov 13 rows), and the proposed re-cut of the checklist is in [ops/p2-12-day45-recut-proposal-2026-11-14.md](../../../ops/p2-12-day45-recut-proposal-2026-11-14.md).

Tags: **[M]** measured, **[E]** estimate built on measured counts, **[A]** assumption nothing has measured.

| File | What it is |
|---|---|
| [crm_queries.cjs](crm_queries.cjs) → [crm-queries-output.txt](crm-queries-output.txt) | 29 read-only CRM aggregates (§2) |
| [ny_open_data_counts.py](ny_open_data_counts.py) → [ny-open-data-output.txt](ny-open-data-output.txt) | Counts from NY's public entity data (§3) |
| [model_checks.py](model_checks.py) → [model-checks.txt](model-checks.txt) | The plan's own numbers re-run through `scripts/model_2028.py` (§4) |
| [odds_sim_2028.py](odds_sim_2028.py) → [sim-output.txt](sim-output.txt) | Odds simulation around that model (§6) |

---

## 1. Short version

| The plan says | Measured or re-run | Tag |
|---|---|---|
| "All of it together comes to about $950K–1M" | The model gives **$935K** with every lever at full value, no orders lost to the price rise, and credentialing at 10 jobs a month by Dec 2027 and 15 by Dec 2028. $903K if the price rise costs 5% of orders. The plan's own table adds to $888–958K. | [M] model |
| Credentialing at 12–15 a month is worth +$165–210K | That is the model's paths 2→8→12 and 2→10→15, which is 122–153 jobs in 2028 with no cost to find them. With the standalone doc's own cost per client it is nearer $100–115K. | [M] model, [A] cost |
| Today is about $423K a year | $418K cash and **$360K accrual** (P1-03 rebuild). $20.1K of that was Metro income over seven months; Metro paid $240 in October. The model's own November 2026 month annualizes to about $398K. | [M] |
| About 60–70 formations a month | Apr–Oct were 49, 57, 47, 47, 48, 51, 68. Nov 1–13 was 24, a pace of 55. | [M] |
| About 40% of formations are behavioral health, about 26 a month | Aug–Oct: 17, 19 and 23 a month, which is 34–37%. | [M] |
| Nov 2025–Mar 2026 formations assumed at 45 a month | Actual 24, 32, 51, 34, 39. That is 180, not 225. It moves 2028 by about $1K. | [M] |
| RA first renewal 65% | 4 paid of 9 due so far. All four that didn't pay had no card on file. Not a rate until the windows close (first one Nov 22). | [M] |
| Not in the plan | Metro RA renewals: 1,566 fall due in 2027. At this spring's collection rate they are worth about $30K a year, and the model has no line for them. | [M] counts, [E] dollars |
| Not in the plan | Payment-plan buyers take mail service 33% of the time against 25% for those who pay in full, and the S-corp election 18% against 11%. | [M] |

Central case after the measured corrections: **$633K** for 2028 with credentialing at about 3 jobs a month ([model-checks.txt](model-checks.txt) §2).

---

## 2. CRM figures

From [crm-queries-output.txt](crm-queries-output.txt). Section letters match the output file.

### Orders and mix (B)

- **Orders by month, Eastern time [M]:** Nov 2025 24 · Dec 32 · Jan 51 · Feb 34 · Mar 39 · Apr 49 · May 57 · Jun 47 · Jul 47 · Aug 48 · Sep 51 · Oct 68 · Nov 1–13 24.
- **By week [M]:** the four weeks from Oct 12 ran 19, 17, 17, 18. Sep 21 and Sep 28 were 8 and 4. Nov 9–13 (Monday to Friday) was 5.
- **Mix, Aug–Oct [M]:** behavioral health plus psychiatric NPs 17, 19, 23 a month. Medicine 8–9. Non-health (law, architecture, engineering, accounting) 9–13.
- **Owners [M]:** 376 of 391 entities ordered since April have one owner (96%).
- **Repeat buyers [M]:** 7 of 557 customers.
- **Stage [M]:** 237 entities complete, **151 waiting on NYSED** (OP_SUBMITTED), 87 in publication.
- **Time from order to DOS filing [M]:** median 94–107 days for May–July orders. Only 20 of 46 August entities and 9 of 51 September entities were filed by Nov 14.
- **Behavioral-health entities [M]:** 163 with a license on file (118 core, 45 psychiatric NP), of which 87 are past DOS approval. Another 153 entities have no profession recorded, mostly the Nov 2025–Feb 2026 orders.

### Who buys and how (C)

- **Where customers live, orders since April [M]:** New York City 40%, Long Island 18%, Westchester 8%, Rockland/Orange 3%, upstate 15%, out of state 14%.
- **Payment plans [M]:** 164 of 392 PLLC orders, Mar–Oct (42%).

| Profession group, Mar–Oct [M] | Orders | On a plan | Took mail service | Took S-corp | Ticked the insurance box |
|---|---:|---:|---:|---:|---:|
| Therapists (core behavioral health) | 104 | 42% | 27% | 14% | 15% |
| Psychiatric NPs | 39 | 62% | 41% | 28% | 30% |
| Other NPs, PAs, RNs | 30 | 57% | 33% | 10% | 18% |
| Other health | 50 | 40% | 22% | 10% | 15% |
| Medicine | 64 | 36% | 30% | 14% | 30% |
| Dentistry | 17 | 29% | 12% | 12% | 0% |
| Law | 25 | 32% | 36% | 12% | 11% |
| Other non-health | 43 | 44% | 28% | 14% | 27% |

- **By how they paid [M]:** plan buyers took mail service 33% and S-corp 18%. Pay-in-full buyers took 25% and 11%.

### Credentialing (A)

- **Engagements [M]:** 2. One paid, $2,210 at the old prices (four insurers, Medicaid and Medicare). One at intake, quoted and unpaid.
- **Time logged [M]:** 150 minutes on 9 of 234 events. Hours per job are still unmeasured.
- **Interest box [M]:** ticked on 30 of 147 orders since Aug 27.
- **Email [M, rough]:** 67 of the 545 customers who emailed in the past year mentioned insurance panels, credentialing, NPI, CAQH, Medicaid or Medicare. This is a keyword count on the subject and first 700 characters, so it includes some false matches.

### Add-ons and recurring (D)

- **Sold since April [M]:** 50 S-corp elections and 19 DBAs.
- **What customers email about, same rough keyword count [M]:** DBA 77, address change 61, name change or amendment 57, EIN letter 40, bank account 34, other states 24.
- **Subscriptions [M]:** mail service 99 active and 20 trialing. Direct RA 408 trialing and 8 active, with first billing dates of 50 in Q4 2026, then 99, 105, 102 and 58 by quarter through 2027.

### Metro (E)

- **Clients [M]:** 410 active, 1,305 trialing, 1,702 cancelled.
- **Collection [M]:** 2,271 invoices went out April–July and 377 were paid (17%). Each payment is worth about $48 to us.
- **Income [M]:** $1.7K, $4.3K, $5.9K and $5.8K in April–July, then $1.6K, $479, $240. The spring wave was the one-time backfill of old clients.
- **Ahead [M]:** 1,566 renewals due in 2027 (182, 666, 501, 217 by quarter). New Metro clients have arrived at about 107–149 a month since August.
- **Worth [E]:** about $30K in 2028 at the same collection rate: second renewals from this year's payers, first renewals from the 1,305 trialing, and first invoices for 2027's new clients. The P2-11 model carries no Metro RA line.

---

## 3. Public filing data

From [ny-open-data-output.txt](ny-open-data-output.txt). Active entities only, so each count is a floor.

- **Filed Nov 2025–Oct 2026 [M]:** 5,077 domestic PLLCs, 1,575 domestic PCs, 171 foreign PLLCs, 204 foreign PCs.
- **Our share [M, approximate]:** 477 of the PLLCs are in Rockland County, where we file. That is about 9%.
- **Who else [M]:** the most common names for service of process are "THE PLLC" (self-filed), Registered Agents Inc. 150, a Buffalo law firm 70, LegalZoom's agent 68, Northwest 66. A registered-agent company there is the entity's agent. It does not mean that company sold the formation.
- **Behavioral health, by name [M, approximate]:** 1,664 PLLCs filed in the 12 months, about 158 of them ours. 10,875 active PLLCs and 3,696 active PCs in total. Filings by year: 2019 521 · 2021 859 · 2023 1,273 · 2025 1,484 · 2026 to date 1,451.
- **PCs [M]:** 452 of the year's 1,575 have medical or dental names. By county they are New York 295, Nassau 271, Queens 219, Kings 219, Suffolk 181. PLLCs cluster in Albany (635) and Rockland (477), the low-cost publication counties. PCs do not, because a PC has no publication requirement.

---

## 4. Model checks

From [model-checks.txt](model-checks.txt). Same model, inputs overridden in memory.

- **The plan's realistic case reproduces [M]:** $587K for formations, mail and RA, of which formations $420K, mail $168K, RA $60K, ads −$44K, overhead −$18K. Mail and RA are 39% of it, and most of the growth from today.
- **Credentialing paths [M]:** 2→4→5 jobs a month is $84K in 2028. 2→8→12 is $166K. 2→10→15 is $203K.
- **Ceiling [M]:** $962K with everything at full value, $935K after the $27K ops hire.
- **One price for everyone [M]:** $985 adds $75K if no orders are lost, $48K at 5% lost, $21K at 10%, and loses money past about 13%.
- **Lifetime value of one order [E]:** $547 at formation, plus $476–756 of mail service and $233–303 of RA renewals, so about **$1,250–1,600** undiscounted. On that basis $985 breaks even at 6–7% of orders lost and $1,085 at 11–13%. The one-year view in [price-test-985.md](../../../docs/price-test-985.md) gives 12% and 21%.

---

## 5. Web checks (Nov 13)

- **Northwest does not sell New York PLLC formation.** Its own [New York PLLC page](https://www.northwestregisteredagent.com/llc/new-york/pllc) is a do-it-yourself guide. It says Northwest doesn't offer PLLC formation in all states and tells the reader to mail the articles in. Its [publication service](https://www.northwestregisteredagent.com/new-york-llc-publication.html) is $375 for LLCs, per search results quoting that page.
- **Attorneys:** one lists [$3,295 all-in ($3,595 in NYC)](https://lawyerforbusiness.com/newyork). Another lists [formation with publication extra](https://scottthomasesq.squarespace.com/new-york-pllc-formation-service) and no public PLLC price.
- **Do-it-yourself publication cost** runs from roughly $150–300 in Albany County to $1,200–2,000 in Manhattan. These are third-party guide estimates, not newspaper quotes.
- **Sid, Nov 13:** as far as he knows, NYPLLC is the cheapest all-in option by more than $2,000.

---

## 6. Odds simulation

[odds_sim_2028.py](odds_sim_2028.py) wraps the P2-11 model in 6,000 random draws per scenario. Each input is tagged in the script. The printout is [sim-output.txt](sim-output.txt).

**What it assumes that nothing has measured [A]:**
- **Price sensitivity.** Therapists and NPs lose about 0.9% of orders per 1% of price; other professions about 0.45%. The "barrier worry" runs use 1.6 and 0.7. The grouping rests only on payment-plan use.
- **Whether each fix lands:** Bing 45%, checkout recovery 50%, conversion fixes 50%, a Google bid step 38%.
- **Credentialing:** 2.5 jobs a month from our own customers (median), a 1.2% response to letters sent to newly filed behavioral-health PLLCs, and a 35% chance that letters to existing practices work at all.
- **Product items:** each 40–60% likely to work, at $5–25K apiece.

**After Sid's Nov 13 decisions** (price held at $885; no price by profession; no ops help now; PCs stay shelved; Sid delivers credentialing; acquisition looked at lightly):

| Case | Median 2028 | $800K or more | $1M or more | $1M or more in 2029 |
|---|---:|---:|---:|---:|
| Do nothing new | $645K | 0% | 0% | 0% |
| Nov 13 plan as written | $745K | 16% | 0% | 3% |
| Adopted program, everything done | $848K | 77% | 2% | 47% |
| Adopted program, each item 65% likely to get done | $789K | 45% | 1% | 22% |
| Adopted program, each item 50% likely | $760K | 29% | 0% | 14% |

**What each part of the adopted program is carrying** (odds of $800K with that part removed, everything else done): letters to public lists 40% · stuck fixes 53% · product items 62% · Metro 67% · bid step 71%.

**Options still open, added to the adopted program with everything done:**

| Option | $800K or more | $1M or more |
|---|---:|---:|
| Fee changes (RA with the biennial filing at $129, $60 mail for new subscribers, a higher package tier) | 87% | 5% |
| $985 for everyone | 89% | 7% |
| $985 for everyone, if the barrier worry is right | 78% | 3% |
| Fee changes and $985 for everyone | 94% | 12% |
| A light acquisition look (15% chance of closing) | 80% | 7% |

**Limits.**
- These are odds under the assumptions above. They are not forecasts, and the spread is narrower than real life because the model's structure is taken as given.
- The completion rows matter most. With no ops help and Sid delivering credentialing, "each item 65% likely" is the closer planning case.

**How the 95% quoted in chat on Nov 13 became 77%.** Sid asked for this on Nov 14. The 95% was never the hold-the-price case. It included price by profession, which Sid then declined. Each row changes one thing from the row above (everything done):

| Step | $800K or more | What changed |
|---|---:|---|
| 1. Program quoted in chat, $885 for therapists and NPs, $1,285 for others | 95% | The figure given on Nov 13 |
| 2. Price held at $885 | 69% | Sid's decision: no price by profession |
| 3. PCs removed | 56% | Agent's revision (§7); they stay shelved |
| 4. Mail outreach to existing PLLCs removed | 52% | Agent's revision; worth about $4K |
| 5. Fee changes no longer assumed | 37% | Still Sid's open call |
| 6. No ops hire | 58% | Sid's decision; saves its $33K cost |
| 7. Sid delivers credentialing | 77% | Sid's decision; no contractor cost |

With each item 65% likely to get done, the same three points read 78% (chat program with the price split), 35% (price held) and 45% (adopted program). The chat figure for that case was 75%.

**What would restore it, on the adopted program:**

| Option | Everything done | 65% done |
|---|---:|---:|
| Price by profession, $885 / $1,285 (declined) | 97% | 85% |
| Same, if the barrier worry is right | 92% | not run |
| Price by profession, $885 / $1,085 (declined) | 93% | not run |
| Fee changes and $985 for everyone | 94% | 68% |
| $985 for everyone | 89% | 62% |
| Fee changes | 87% | not run |
| Ops help at $33K, lifting completion from 65% to 90% | — | 49% |

---

## 7. Errors made during the session, and their corrections

| Error | Correction |
|---|---|
| Said Northwest sells PLLC formation plus publication for about $615. That was its LLC prices added together. | It does not sell New York PLLC formation (§5). Sid caught it. |
| Read the 216 PLLCs naming Northwest or Registered Agents Inc. as formations they sold. | They are registered-agent appointments on entities other people formed. |
| Capped the price ladder at $1,185 because of the Northwest figure, then recommended a one-price ladder to $1,485. | Withdrawn. Plan buyers attach mail service and S-corp at higher rates (§2), and a lost order costs about $1,250–1,600 over its life (§4). Sid then declined price by profession. |
| Gave "about 1-in-5" for $1M on a stack of levers at full value. | Simulated, that stack is low single digits. |
| Sized PC formations at +$40–90K using PLLC economics. | A PC has no publication, so doing it yourself costs about $245 in state fees. The PLLC offer wins partly because $885 undercuts the do-it-yourself cost downstate; a PC offer has no such edge. Revised to +$10–25K if it works, about one chance in three. PCs stay shelved under the Nov 13 decision. |
| Said the services page was switched off in the site navigation. | The Services and Pricing links are commented out of the navigation and neither page exists in the app. It has to be built. |

---

## 8. How to re-run

All from the workspace root, `pllc-business/`. None of these write anything unless `--out` is given, and then only a text file in this folder.

```bash
node new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/crm_queries.cjs --out crm-queries-output.txt
python3 new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/ny_open_data_counts.py --out ny-open-data-output.txt
python3 new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/model_checks.py --out model-checks.txt
python3 new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/odds_sim_2028.py --out sim-output.txt
```

- `crm_queries.cjs` uses `PLLC-CRM/crm/node_modules` and `PLLC-CRM/crm/.env`. It opens Postgres with `default_transaction_read_only=on` and stops if that isn't set.
- `model_checks.py` and `odds_sim_2028.py` import `scripts/model_2028.py` and never call its `main()`, so `reports/p2-11-model-2026-11-11/` is not rewritten.
- Other live reads used on Nov 13 and not copied here: `orders-attribution.ts --monthly --since 2025-09-01`, `credentialing-status.ts --all`, `npm run source-survey` (0 responses), and the existing `reports/recurring-cohort-2026-11-13/README.md` in the CRM (not re-run, because a run writes a report file).

---

## 9. Not verified, or not read

- **Not read:** the SEO plan. **Partly read:** the Google Ads plan (Parts 0 and 3), the CRM active context (top section).
- **Price sensitivity** of any group. No price has ever changed.
- **Hours per credentialing job**, cost to win a credentialing client who didn't form with us, and whether letters to public lists get any response.
- **The RA first-renewal rate** (first window closes Nov 22) and the source survey (no answers yet).
- **Metro's 2028 dollars** are an estimate from counts. They depend on how many of the 1,305 trialing clients pay their first invoice.
- **Competitor prices** come from public pages and search summaries on one day.
- **Acquisition prices, loan terms and what is for sale.** Nothing was checked with a lender or a listing.
