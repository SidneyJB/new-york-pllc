# 2028: realistic outlook and the path to $1M

**Written:** Nov 13 2026, from Sid's reality-check session. **Owner:** Sid. **Status:** plan for Sid's review. The decisions already adopted are in the [decision log](decision-log.md); everything else here is proposed.

**Where this sits:** the [integrated operating plan v3](nypllc-integrated-operating-plan.md) §6 sets the $1M hurdle, and the [90-day checklist](nypllc-90-day-execution-checklist.md) runs execution through Jan 13 2027. This document is the honest read on where 2028 is heading and what would change it. When it disagrees with the integrated plan's channel targets (partners at 25–30 a month, organic growth), this document wins until the Day-45 review (P2-12) or Sid says otherwise. Model detail: [P2-11 §1b and §1c](reports/p2-11-model-2026-11-11/README.md).

All dollar figures are annual operating profit before Sid's pay and before business taxes, from the P2-11 model ([`scripts/model_2028.py`](scripts/model_2028.py)) unless marked as an estimate.

---

## 1. Sid's time: 20–25 hours a week now, with headroom

Sid is the only person in the business: sales, ops, the mail station, filings, close-outs and now credentialing. As of Nov 13 2026 he works about **20–25 hours a week**, and **he has substantial headroom before he's close to overwhelmed** (Sid, Nov 13). His limit is **about 40 hours a week** (Sid, Nov 13).

What that means:

- **Sid can carry credentialing himself for a while.** At about 12 hours per full job ([credentialing plan §3.4](../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md); not yet measured), 15–20 extra hours a week is about 5–7 jobs a month. While Sid does the work, each job keeps about $1,590 instead of about $1,140 with paid labor.
- **Up to about 5–7 jobs a month, the limit is leads, not hours.** Lead flow (section 3A) is the first problem to solve.
- **15 jobs a month still needs paid help.** That's about 180 hours a month (about 42 a week) of credentialing alone, on top of everything else.
- **The part-time ops hire isn't needed yet.** It becomes useful when Sid's week approaches his limit, so credentialing sales keep their time.

## 2. Where 2028 is really heading

**Today:** about $423K a year (Apr–Oct 2026 actuals, cash basis), on about 60–70 formations a month. October set a record: 68 orders, $63.6K.

**Most likely 2028: about $650K.** Range about $600–750K. **$1M: roughly a 1-in-6 chance** on the current course. Sid's headroom doesn't move the central figure much, because the forecast is limited by demand (leads and orders), not hours. It does make the credentialing ramp faster and cheaper, which nudges the $1M odds toward 1-in-5.

The target case in the model says $823K (formations, virtual mail, RA) or $915K with credentialing. It needs almost every line to go right at once. Taking out one optimistic assumption at a time:

| Step | Orders/mo by Dec 2028 | Formations + VM + RA | With credentialing |
|---|---:|---:|---:|
| Target case as written | 114 | $823K | $915K |
| 1. Partners to zero (0 conversations from 38 firms) | 89 | $760K | $851K |
| 2. Organic/AI flat (non-Google orders flat at ~30–37/mo since Jul) | 78 | $695K | $786K |
| 3. Bing stays blocked | 74 | $668K | $760K |
| 4. Conversion fixes deliver half | 71 | $648K | $739K |
| 5. Abandoned-checkout recovery delivers half | 68 | $622K | $714K |
| 6. Google reaches 34/mo, not 37 | 65 | $602K | $694K |
| 7. VM attach 25%, churn 2.7% | 65 | $587K | $679K |
| 8. Credentialing ~5 jobs/mo, not 6 | 65 | $587K | **$663K** |

Steps 1–2 match what we measured. Step 3 is today's status. Steps 4–7 are judgment: fixes usually deliver about half of what's planned. Giving back steps 3–7 in full still only reaches about $760K.

**What this means:**
- No single assumption sinks the plan. Partners and organic cost about $65K each, and the rest about $15–27K each.
- Without partners or organic growth, formations, virtual mail and RA top out around $600–700K.
- The gap to $1M (about $335K) is too big for any formation lever. Only credentialing is large enough.

### What we learned on Nov 13

- **Partners are the biggest *volume* gap but a small *profit* gap.** A partner order is worth about $420 against $546 retail. Partner clients take virtual mail at half the rate, and partner volume pushes past the ~90 orders/month point where the model adds staff help. Zero partners costs about $64K.
- **Cold partner outreach doesn't work for us.** 1 reply in 38 firms, 0 conversations. The partner orders we have had came from past-customer advocates and Metro, which are warm relationships.
- **Organic isn't growing.** SEO hasn't been measured since the Aug 4 baseline. ChatGPT is the one rising source (14 tagged orders since July, 3 in the first week of November).
- **Who we compete with:** LegalZoom and Northwest compete with us for the *click* in Google Ads (LegalZoom shows in 62% of our auctions). They mostly don't sell NY PLLCs. In organic results we compete with law-firm blogs and guide sites, which is more winnable than the SEO plan assumed. Detail: [P2-11 §1c](reports/p2-11-model-2026-11-11/README.md).

---

## 3. The path to $1M

From the realistic ~$587K base (formations, virtual mail, RA):

| Lever | 2028 effect | Needs Sid's hours? | When |
|---|---:|---|---|
| A. Credentialing at 12–15 jobs/month | +$165–210K | Yes: Sid sells and delivers up to ~5–7 jobs/month; a coordinator above that | Build from now; coordinator when the trigger hits (likely mid-2027) |
| B. Price $885 → $985 | +$75–85K | No (a one-time change) | Bounded test, Feb 2027 |
| C. Paid help when Sid's week fills (part-time ops, then coordinator) | Keeps A growing past ~5–7 jobs/month; ops ~$27K/yr | Saves about 10–15 h/week | When Sid nears his ~40 h/week limit |
| D. Bing reinstated | +$27K | One task (registration address) | Before the Dec 15 gate |
| E. Abandoned-checkout fix, full | +$26K | No | On Spiffy's reply |
| F. Conversion fixes, full | +$20K | Little | Dec–Feb (site freeze until Dec 1) |
| G. Virtual mail a bit better (attach, churn) | +$15–30K | Little | Ongoing |

All of it together comes to about **$950K–1M**, which makes $1M roughly a coin flip instead of 1-in-6. Each piece raises the floor on its own: partial execution lands around $750–850K.

### A. Credentialing: the only lever big enough

Our own formation flow can't reach 15 jobs a month by itself. About 40% of formations are behavioral health (about 26 a month). Even at a 10% take rate that's about 3 jobs a month. Getting to 12–15 needs three lead sources:

1. **Our own flow (automatic now): 2–4 jobs a month.** The checkout interest question, the formation-complete email question, the [credentialing guide](https://www.nypllc.com/ny-pllc-insurance-credentialing) (Headway fee news added Nov 13), and the checkbox-lead follow-ups (11 behavioral-health leads emailed Nov 11, 7 medical Nov 13, nudge scheduled Nov 18).
2. **Our existing customers: a one-time Q1 campaign, perhaps 10–20 jobs.** About 230 behavioral-health entities in the CRM by name, about 130 past DOS approval (rough count, Nov 13). Most still pay us for RA or virtual mail, so it's an owned list. Headway's $9.99 per-session fee gives them a reason to act now.
3. **Clinicians who never formed with us: the standalone credentialing business.** This is the [idea parked Nov 5](../PLLC-CRM/memory-bank/features/credentialing-standalone-business.md): its own site, ads and LLC, aimed at NY therapists leaving Headway or Alma. It's the only route to 15 a month that isn't capped by our formation volume. Its biggest unknown is ad cost per client; only a live ad test answers it.

**Capacity:** with his headroom, Sid can deliver credentialing himself up to about 5–7 jobs a month. Above that it moves to a coordinator. The [credentialing plan](../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md) §3.4 sizes the role: 4–5 jobs a month is about 12–16 hours a week (a part-time coordinator, about $2.3K/month at $35/h), and 8+ jobs a month is about 25+ hours a week. The model already charges about $450 of labor per job above 3 a month, so the coordinator pays for itself.

**Hire trigger (revised Nov 13):** hire a coordinator when credentialing holds at about **5 jobs a month for two months**, or when Sid's total week nears his ~40-hour limit, whichever comes first. Measured hours per job will move this either way. The role needs its own CRM login with an audit trail first (SSNs, DOBs, CAQH logins).

**Before any of this is real:** log minutes on every credentialing job now (`credentialing-log.ts --minutes`; 0 of 41 events had minutes on Nov 8). Median hours per job decides the hire timing, the price, and whether 15 a month is affordable.

Note: credentialing plan §3.4 calls credentialing "a modest line" that the $1M plan "does not depend on". That was written before Nov 13 and no longer holds. On today's numbers, $1M depends on it.

### B. Price

At 750–850 orders a year, $100 is worth about $80K, and volume would have to fall about 12% before the increase loses money (counting VM, RA and add-ons; 16% formation-only). It needs no new channel and none of Sid's hours. Sid held $885 on Nov 9 because October set a record, which is sound for the holiday period. **Proposed:** a bounded $985 test in **February 2027**, after the January ads decision, using the rules already drafted in [price-test-985.md](docs/price-test-985.md). It only reopens by a new decision-log row.

### C. Paid help when Sid's week fills

Not needed yet: Sid has headroom above his current 20–25 hours. Plan a part-time ops person (about 10–15 hours a week, about $27K a year) for when his week approaches his limit. It would take the mail station (the Friday pack list, holds, drop-offs), routine close-out rows and the daily billing exceptions, so credentialing sales keep Sid's hours. This cost isn't in the model's overhead below 90 orders a month, so it comes out of the gains above.

### D–G. Smaller fixes, done properly

- **Bing:** update the NY business registration address to match the Microsoft account, then go back to support (case 7109261224; two verification attempts left). The Dec 15 gate decides whether it stays in the forecast.
- **Abandoned checkout:** the Spiffy support email went Nov 13. If they have no server-side option, decide on the email-first checkout after Dec 1.
- **Conversion fixes:** the virtual mail accuracy fixes (P2-05 S1–S6) and the price-clarity items in P1-08.
- **Virtual mail:** keep checkout attach near 30% and churn near 2%. The weekly report (`npm run recurring-cohort`) watches both.

---

## 4. What to stop

- New cold partner prospecting. Reply to existing threads the same business day; no new waves. Never contact credentialing firms as partners: they're competitors ([decision log](decision-log.md), Nov 13).
- PC work beyond manual quotes (shelved Nov 13).
- Broad SEO content. Keep only a monthly rank-tracker update and pages that answer what AI assistants and law-firm blogs don't.
- Anything else that takes Sid's hours without feeding credentialing, price or capacity.

---

## 5. Next 90 days

| When | What | Who |
|---|---|---|
| Now | Log minutes on every credentialing job. Work the checkbox leads (nudge Nov 18). | Sid, Agent |
| Nov 25–29 | Day-45 review (P2-12): partner test (fewer than 3 conversations → partner line ~5/month, rest Waiting), virtual mail, the model. | Sid + Agent |
| December | Credentialing scale plan: existing-customer campaign copy and list, a decision on reopening the standalone business (including a small ad test to price a client), coordinator job description and hire trigger. Bing task before Dec 15. | Agent drafts, Sid decides |
| January | Existing-customer credentialing campaign. January ads decision (no automatic surge). Sid delivers the new jobs himself. | Sid, Agent |
| February | Bounded $985 test, if Sid reopens it. Check the hire trigger (~5 jobs/month for two months, or Sid near his limit). | Sid |
| By Mar 31 | **Gate:** credentialing at 4–6 jobs a month means the $1M path is real. Under 3 means plan around $750K. | Sid |

---

## 6. What to measure

| Measure | Where | Why |
|---|---|---|
| Credentialing jobs started per month; median hours per job | `credentialing-status.ts`, `credentialing-log.ts --minutes` | Decides whether A is real, and when to hire |
| Sid's hours per week by area (sales, ops, mail, credentialing) | Rough weekly note in the scorecard | Shows when the ops hire is needed |
| Non-Google orders per month; ChatGPT orders as their own line | `orders-attribution.ts`, weekly scorecard | Tests the organic assumption |
| "Tried another service first" share | `npm run source-survey` (live Nov 13) | Tests Sid's LegalZoom bounce-back theory |
| VM attach and churn; RA first-renewal rate (first window closes Nov 22) | `npm run recurring-cohort` | The compounding lines |
| Rank-tracker positions | Monthly Search Console export → [seo-rank-tracker.csv](seo-rank-tracker.csv) | SEO hasn't been measured since Aug 4 |

---

## 7. Open decisions for Sid

1. Adopt this as the working 2028 view (about $650K most likely; $1M through credentialing and hiring)?
2. Reopen the standalone credentialing business conversation in December?
3. Coordinator trigger: ~5 jobs a month for two months, or your week nearing 40 hours (your limit, confirmed Nov 13).
4. Part-time ops hire: when your week nears that ceiling, not on a fixed date.
5. Reopen the $985 test for February?

---

## 8. Context for a deeper review

For an agent or advisor asked how to make the goal real. Read in this order:

| What | Where |
|---|---|
| This plan | You're reading it |
| Model, assumptions with sources, scenario runs | [P2-11 README](reports/p2-11-model-2026-11-11/README.md) (§1a credentialing, §1b partners, §1c organic and competitors) · [`scripts/model_2028.py`](scripts/model_2028.py) (`SCENARIOS`; override fields in memory to test cases) |
| Decisions and supersessions | [decision-log.md](decision-log.md) |
| Execution status through Jan 13 2027 | [90-day checklist](nypllc-90-day-execution-checklist.md) · [task board](ops/90-day-task-board.md) · weekly [scorecards](scorecards/) |
| Strategy, hurdle, lever playbooks | [integrated operating plan v3](nypllc-integrated-operating-plan.md) · [Google Ads plan](nypllc-google-ads-operating-plan.md) · [SEO plan](nypllc-seo-content-moat-plan.md) · [revenue levers](nypllc-revenue-levers-plan.md) |
| Credentialing (the line $1M depends on) | [credentialing expansion plan](../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md) (tiers, hours §3.4, go/no-go §3.10) · [standalone business](../PLLC-CRM/memory-bank/features/credentialing-standalone-business.md) · [ops manual](../PLLC-CRM/crm/docs/credentialing/README.md) · [checkbox-lead follow-ups](../PLLC-CRM/crm/docs/insurance-credentialing-checkbox-followup-draft-2026-11.md) |
| Draft packages | [P2-05 VM attach](reports/p2-05-vm-attach-2026-11-13/README.md) · [P2-06 VM migration](reports/p2-06-vm-migration-2026-11-13/README.md) · [P2-09 PC pilot](reports/p2-09-pc-pilot-2026-11-13/README.md) · [P1-07 buying journey](reports/p1-07-buying-journey-2026-11-08.md) · [$985 test design](docs/price-test-985.md) |
| Live data (read-only) | From `PLLC-CRM/crm`: `npm run recurring-cohort`, `npm run source-survey`, `npx tsx scripts/orders-attribution.ts --monthly`, `scripts/weekly-scorecard-export.ts`, `scripts/baseline-financial-export.ts`, `scripts/credentialing-status.ts` |
| Owner cash, pay and taxes (whether hires are affordable) | `financial-planner` repo memory bank ([router](../financial-planner/memory-bank/router.md)) |

**Known gaps (Nov 13 2026):**
- **Lost evidence, rebuilt Nov 13.** P1-03 and P1-05 lived in the gitignored `PLLC-CRM/crm/reports/` and were lost in a folder move. Both were rebuilt from live data into committed folders: [P1-03 unit economics](reports/evidence/p1-03-unit-economics-2026-11-13/README.md) (+ [cost trace](reports/evidence/p1-03-unit-economics-2026-11-13/TRACE.md)) and [P1-05 VM economics](reports/evidence/p1-05-vm-economics-2026-11-13/README.md), each with re-run commands. Per-order $514/$513 reproduce exactly; operating profit rebuilt at $418K annualized cash (was $423K), $360K accrual (was $371K), $286K after owner pay (was $290K). **Overhead ($1,365/month, 74% Amazon) can't be rebuilt until Sid exports Apr–Oct Relay statements** (`financial-planner/relay_pick_zip.py`). VM: churn and attach reproduce; churn isn't all voluntary; the Nov 8 count of 96 paying can't be rebuilt (99 today). The Nov 8 scorecard extraction and Nov 9 billing scan weren't rebuilt (the weekly scorecard and `npm run billing-scan` replace them).
- **Unmeasured:** credentialing hours per job (0 of 41 events had minutes on Nov 8), credentialing ad cost per client, the RA first-renewal rate (first window closes Nov 22), and the source-survey "tried another service first" share (live Nov 13, no answers yet).
- **SEO** hasn't been measured since the Aug 4 rank-tracker baseline.
