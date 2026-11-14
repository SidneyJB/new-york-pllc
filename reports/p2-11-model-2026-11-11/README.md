# P2-11: 2028 model, first pass (Nov 11 2026)

**Prepared by:** Agent. **Decision owner:** Sid. **Due:** Nov 24 (P2-11). This is a first pass for review, not the final model.

**Files:** [model script](../../scripts/model_2028.py) (every assumption is in it, with its source) · monthly output per case: [downside](monthly-downside.csv), [target](monthly-target.csv), [strong](monthly-strong.csv) · [summary.json](summary.json). Re-run with `python3 scripts/model_2028.py`.

## 1. Result

Operating profit is before owner pay and before business taxes, the same definition as the P1-03 P&L.

| 2028 | Downside | Target | Strong |
|---|---:|---:|---:|
| Formations (year) | 709 | 1,264 | 1,496 |
| Formations per month by Dec 2028 | 60 | 114 | 138 |
| Formation contribution (incl. S-corp add-on) | $384.7K | $667.7K | $785.4K |
| Virtual mail (net of card fees) | $140.4K | $225.2K | $276.2K |
| Registered agent renewals | $50.2K | $64.6K | $75.0K |
| Ads (Google + Bing) | −$37.8K | −$56.8K | −$62.3K |
| Overhead (incl. staff help above 90 orders/mo) | −$17.6K | −$77.6K | −$77.6K |
| **Operating profit** | **$520K** | **$823K** | **$997K** |
| After Sid's pay ($10.8K/mo) | $390K | $693K | $867K |
| **Insurance credentialing (own line, below)** | +$20.7K | +$91.4K | +$136.1K |
| **Operating profit with credentialing** | **$541K** | **$915K** | **$1,133K** |
| VM subscribers, Dec 2028 | 268 | 473 | 600 |

2027 operating profit: downside $438K, target $575K, strong $624K.

**Check against today:** Apr–Oct 2026 actual operating profit was $423K annualized on cash (P1-03 §3a). The downside 2027 ($438K) is roughly "today, held flat, with recurring revenue still building," so the starting point reconciles.

**Read (formations, VM and RA only):** the $1M goal needs the **strong** case: about 138 formations a month by the end of 2028, with 35 a month from partners and a VM book near 600. The target case, which uses the integrated plan's own lever estimates, lands around **$820K**.

## 1a. Insurance credentialing (added Nov 11, after Sid's question)

The first pass left credentialing at $0, following P2-11's rule that unproven lines stay out of the base. It should have been a separate line from the start: there is one paid job, one open invoice, two quotes out at the new price, and at least five clients interested (Sid, Nov 11). It's now modeled as its own line and reported both with and without, so the formation base stays clean.

| Assumption | Value | Source |
|---|---|---|
| Average job | $1,670 | Danielle $2,210 paid, Gabriella $894 invoiced, Nicole and Nick quoted $1,795 [T] |
| Cash cost per job | $35 + 3% card fee | Expansion plan §3.4 |
| Labor | $0 for the first 3 jobs/month (Sid); about $450/job above that (~13 h at $35/h) | Plan §3.4 hire trigger at ~3+ jobs/month [I] |
| Upkeep | 40% of jobs add $249/yr; 2%/mo churn | Plan §3.4 [I] |
| Jobs per month (Nov 2026 → Dec 2027 → Dec 2028) | Downside 1 → 1 → 1 · Target 2 → 4 → 6 · Strong 2 → 6 → 10 | [I] |

| 2028 | Downside | Target | Strong |
|---|---:|---:|---:|
| Credentialing jobs (year) | 12 | 61 | 98 |
| Credentialing net contribution | $20.7K | $91.4K | $136.1K |
| Operating profit with credentialing | $541K | $915K | $1,133K |

**What it means:**
- **Credentialing nearly closes the gap in the target case.** $823K becomes about $915K.
- **Getting the target case to $1M needs about 11 credentialing jobs a month** from late 2027 through 2028, about 130 in the year. At roughly 13 hours a job, that's a full-time coordinator or two part-timers, which the $450/job labor line covers.
- **Per job, it's worth about three formations.** About $1,590 net while Sid does the work, about $1,140 once it's paid labor, against $546 per formation.
- **The risk is execution, not demand.** No job has reached an insurer decision yet, and hours per job aren't measured (0 of 41 credentialing events have `minutesSpent`). The go/no-go measures in plan §3.10 (hours ≤ 125% of estimate, submissions within 21 days, first effective date by Jan 8) are what turn these assumptions into evidence.

## 1b. Partner reality check (added Nov 13, after Sid's question)

Sid, Nov 13: the plan leans on partners as the largest channel, and new-partner outreach has gone nowhere. This section re-runs the model with only the partner line changed. Nothing in the script was edited; the runs override `partner` (and `cred_jobs` where shown) in memory.

**Evidence to date:** 38 firms contacted (waves 1–4), 1 reply (Iris Kimberg, NY Therapy Guide, a directory, not a formation referrer), 0 substantive conversations, 1 productive partner in 90 days (JEFFREYTAQY, a past-customer advocate). The partner orders the business has actually had came from warm relationships: past-customer advocates (four paid payouts, Jul 30) and Metro wholesale (declining). None came from cold outreach.

2028 operating profit before owner pay; partners shown as (now, Dec 2027, Dec 2028) per month:

| Case | Partners 0 | Partners 3 → 5 | Partners 15 → 25 (plan) | Partners 22 → 35 |
|---|---:|---:|---:|---:|
| Target | $760K | $759K | $823K | $876K |
| Target + credentialing 2 → 8 → 12 jobs/mo | $925K | $925K | $989K | $1,041K |
| Strong (credentialing 2 → 6 → 10) | $964K | $979K | $1,079K | $1,133K |
| Strong + credentialing 2 → 8 → 12 | **$993K** | $1,009K | $1,109K | $1,162K |

Orders per month by Dec 2028 in the target case: 89 with no partners, 114 at the plan's 25.

**What it means:**
- **Partners are the largest volume gap, not the largest profit gap.** Zero partners costs about $64K in the target case.
- A partner order is worth about $420 against $546 retail. Partner clients attach virtual mail at half the retail rate, and partner volume pushes past the ~90 orders/month staff-help step in overhead. That is why 0 → 5 partners a month adds nothing.
- **$1M without partners** needs the strong retail case (Google, organic/AI, abandoned-checkout fix, virtual mail) plus about 12 credentialing jobs a month: $993K.
- These are model assumptions, mostly labeled [I]. Credentialing is the least proven line (no insurer decision yet, hours per job not measured).

**Why cold outreach is failing (Agent's read):**
- Thin offer for the firm: a $75 referral payout or a small wholesale discount on something a CPA or consultant sees a few times a year.
- Volume arithmetic: at about one case per partner per quarter, 25 a month takes about 75 productive partners.
- Channel conflict: 7 of the 12 Wave 4 firms are credentialing companies, and since Nov 3 NYPLLC sells insurance credentialing itself.
- 1 reply in 38 is within the normal 1–3% for cold email, so this is the expected result, not bad luck. The checklist's holiday caution applies to the newest waves only.

**Proposed (not adopted; Sid decides at the Day-45 review, P2-12, Nov 25–29):**
1. Finish what is already built: Wave 4 follow-up Mon Nov 16, Wave 5 Tue Nov 17, and Sid personally contacts the Tier 1 warm referrers ([list](../warm-referrers-2026-11-09.md)). No new cold wave.
2. Day-45 test: if waves 4–5 plus the warm list produce **fewer than 3 substantive conversations**, cut the partner line to about 5/month in this model, mark the rest of P2-03/P3-02 Waiting, and record it in the decision log.
3. Move Sid's Tue/Thu sales blocks to insurance credentialing, where demand arrived unprompted (Green Sparrow, Cove Compass, Dr. Hanna, the 29 checkout-interest leads; Headway's new fee is pushing therapists to own contracts).
4. Stop pitching credentialing firms as referrers, or offer them formation wholesale only.

Reproduce: from `scripts/`, import `model_2028`, copy `SCENARIOS['target']` or `SCENARIOS['strong']`, set `partner` and `cred_jobs`, and print `summarize(run(case))[2028]`.

## 1c. Organic and competitor reality check (added Nov 13, after Sid's questions)

Findings, not decisions. Same method as §1b: the model script is unchanged and runs override `organic_ai_other`, `partner` and `cred_jobs` in memory.

**Organic is flat, not growing.** Non-Google orders (UTM + untagged, CRM attribution): Jul 37, Aug 33, Sep 32, Oct 30 (Nov 1–8: 12). Some of the decline is better Google tagging, so the true non-paid figure is flat at best. The target case assumes organic/AI grows from 25 to 36 a month by Dec 2028 (+20%/yr) and the strong case to 42. Nothing measured supports that yet. The 20-term rank tracker has only its Aug 4 baseline (every later column empty). ChatGPT is the one growing source: 14 tagged orders since July, 3 in the Nov 2–8 week.

2028 operating profit before owner pay:

| Scenario | Orders/mo Dec 2028 | Formations + VM + RA | + credentialing |
|---|---:|---:|---:|
| Target, as written | 114 | $823K | $915K |
| Target, organic flat at 25 | 103 | $758K | $850K |
| Target, organic flat, no partners | 78 | $695K | $786K |
| Same, credentialing 2 → 8 → 12 jobs/mo | 78 | $695K | $860K |
| Strong retail, organic flat, no partners, 12 jobs/mo | 86 | $774K | $940K |
| Same, Google pushed to 55/mo by Dec 2028 | 101 | $805K | $971K |

**What it means:** without partners or organic growth, formations + VM + RA top out around $700–800K. Extra Google volume adds little, because ads cost and the ~90 orders/month staff-help step absorb most of it. $1M then needs credentialing at roughly 15–16 jobs a month (each extra monthly job ≈ $14K/yr at paid labor), and credentialing is the least proven line.

**Competitors (checked Nov 13; web search, not Google SERP):**
- Google Ads auction insights (Sales, Jun 8–Sep 5): LegalZoom 42% impression share with **62% overlap** with us, above us 66% of the time; Northwest 29% / 42%; newyorkregisteredagent.com 25% / 49%; ZenBusiness 21% / 12%; us 14%. We compete with them **for the click**.
- **For the sale, mostly not.** ZenBusiness says it doesn't form PLLCs. LegalZoom sells PLLC formation by phone only ($129 + state fee, per a ZenBusiness review; no LegalZoom NY PLLC page found). Northwest's PLLC page doesn't confirm NY. The firms that actually sell NY PLLC formation are local: Scott Thomas Esq. (profession-priced, publication extra), Lawyer for Business ($3,295 / $3,595 NYC) and us ($885 all-in).
- **Organic results on head terms** were law-firm blogs and guide sites (UpCounsel, Nolo, Scott Thomas, Lawyer for Business, Freelancers Union, ZenBusiness and Northwest guides), not LegalZoom. Our Clutch profile ranked near the top on 2 of 3 terms; nypllc.com wasn't in the top ~16 on any. The SEO plan's "competing with LegalZoom and Northwest" is right for paid, wrong for organic.
- **Sid's bounce-back hypothesis** (LegalZoom clickers can't buy there and come back to us) is plausible but not "almost all": winning more auctions after the Aug 4 fix raised orders (Google 10 → 38/mo Jul–Oct), the cannibalization study found paid adds ~6–14 orders/mo, and non-Google orders are flat. The post-payment survey (live Nov 13) measures it directly.

**To make organic credible:** a monthly Search Console export into the rank tracker; ChatGPT orders as their own scorecard line; set organic flat in the model at the Mar 31 gate if non-Google orders are still around 30/month.

## 2. What drives the difference

Downside to strong is $477K in 2028:

| Piece | Share of the gap |
|---|---:|
| Formation volume (787 more orders) | ~$400K |
| VM book (attach, churn, more formations feeding it) | ~$136K |
| RA renewals | ~$25K |
| More ads and staff help | −$85K |

**The two assumptions that matter most:**
1. **Formation volume from channels we don't have yet.** Partners (0 today → 25–35 a month) plus organic/AI growth make up most of the gap. Today partners are at zero conversations.
2. **Contribution per order and the funnel fix.** −$50 per order costs about $51K in 2028. Leaving abandoned-checkout capture broken (F1 = 0) costs about the same ($51K).

One-at-a-time changes to the target case (2028 operating profit):

| Change | Effect |
|---|---:|
| Retail contribution −$50/order | −$51K |
| Abandoned-checkout recovery never fixed | −$51K |
| Partners end at 15/mo instead of 25 | −$46K |
| Organic/AI ends 8/mo lower | −$44K |
| Google ends at 30/mo instead of 37 | −$43K |
| VM attach 22% instead of 27% | −$31K |
| Bing stays blocked | −$27K |
| VM churn 3.0% instead of 2.4% | −$13K |
| RA first renewal 55% instead of 65% | −$10K |

## 3. Assumptions (all in the script)

- **Contribution:** $514 per retail order at $885 (P1-03, no labor line per Sid, Nov 9), plus the S-corp add-on (17.3% × $195). Partner orders $420 (referral: client pays $860 and we pay a $75 fee; wholesale near $800).
- **Price:** $885 held (decision log Nov 9). No $985 effect is modeled.
- **Channels** (orders/month at Nov 2026 → Dec 2027 → Dec 2028, target): Google 30 → 36 → 37; organic/AI/other 25 → 30 → 36; abandoned-checkout recovery 0 → 6; checkout/mobile fixes 0 → 4 → 6; Bing 0 → 4; partners 0 → 15 → 25. Each order counts once, under one channel. These are the integrated plan's Section 2 central lever estimates, not new forecasts.
- **Ads:** the first 30 Google orders at the current ~$105 CPA; anything above that at the $150 allowance (decision log Nov 9). Bing at $150.
- **VM:** opening book of 96 active + 80% of 23 trialing; 27% attach; first paid month 2 months after formation; 2.4%/mo churn; $50/mo net of card fee. Partner orders attach at half the rate [I]. Metro VM: 14 subscribers at $23.47 to us.
- **RA:** $99/yr, first billed 12 months after formation, only for retail formations without VM (VM includes RA). First renewal 65% (plan target), later years 85% [I]. Nov 2025–Mar 2026 formations assumed at 45/mo [U]; Apr–Oct 2026 are actuals.
- **Overhead:** $1,464/mo (Relay actuals + Spiffy), plus $5K/mo for part-time help once formations pass 90/mo [I].
- **Not in the base (P2-11 rule):** PC formations, CAQH-only, affiliate income, Compliance Plan upgrades, $985 pricing. Credentialing is its own line (section 1a), reported with and without.

## 4. Market size check (time-boxed)

Source: NY DOS "Active Corporations: Beginning 1800" ([data.ny.gov n9v6-gdp6](https://data.ny.gov/resource/n9v6-gdp6.json)), counted by year of initial filing, pulled Nov 11.

| Year filed | Domestic PLLCs still active | Domestic PCs still active |
|---|---:|---:|
| 2021 | 2,971 | 1,850 |
| 2022 | 3,045 | 1,731 |
| 2023 | 3,874 | 1,895 |
| 2024 | 4,292 | 1,874 |
| 2025 | 4,626 | 1,705 |
| 2026 (to about Nov 11) | 4,410 | 1,354 |

- **These are active entities only**, so every year is a floor. Dissolved ones are missing, more so for older years, so the growth rate is overstated. A full-filings count would need DOS's filing data, which this dataset doesn't include.
- **Rough share:** about 500 of our formations in 2026 so far against at least 4,410 domestic PLLCs is about **11%** (our count also includes some LLCs and foreign entities).
- **What 2028 implies:** if PLLC formations keep growing about 5–8% a year, 2028 is roughly 5,200–5,800. The target case (1,264) is about 22–24% of that, and the strong case (1,496) about 26–29%. That's more than double today's share. It is only reachable if partners and AI search add volume competitors don't capture.
- A count of licensed professionals is not the formation market, so it isn't used here.

## 5. Not done yet (for the Nov 24 version)

- **Cash view.** This pass is operating profit. Cash timing (installments over about 6 weeks, publication and certificate costs paid months after the order, 0.5% bad debt) isn't modeled month by month yet.
- **Product mix.** Only retail vs partner is split. PLLC vs LLC vs foreign qualification each carry a different contribution, and there's no per-product split yet.
- **Nov 2025–Mar 2026 actual formations** (assumed 45/mo) should be pulled from the CRM, since they drive 2027 RA renewals.
- **Sid's review** of the channel paths, especially partners (0 conversations today vs 25 a month in the target case).
