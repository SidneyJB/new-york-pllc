# P2-12 Day-45 review pack (prepared Nov 19 2026 for Nov 25–29)

**Prepared by:** Agent · **Decision owner:** Sid · **Builds on:** the [Nov 14 re-cut proposal](p2-12-day45-recut-proposal-2026-11-14.md) (still unapproved) and the [decision log](../decision-log.md) rows dated Nov 13–19.

Tags: [M] measured, [E] estimate, [A] assumption. Figures are as of Nov 19 and get refreshed on review day (§4).

---

## 1. Where things stand (Nov 19, read-only pulls)

| Measure | Now | On-track number for Nov (re-cut §4) | Read |
|---|---|---|---|
| Formation orders, November to date | **38 in 19 days, pace ~60/month** [M, `orders-attribution.ts`]; Oct 68 (record), Sep 52 | 55 | Ahead |
| Google share of orders, Nov | 17 of 38 (45%); ChatGPT 15 tagged orders since July [M] | — | — |
| Weekly visitors (Vercel), Nov 9–15 | 200, down 31% from 290; checkout-start rate 26.5%; orders per visitor 4.5% (6.2% prior week) [M, scorecard] | — | One soft week; watch the Nov 16–22 week |
| Virtual mail paying | **103 active + 18 trialing** [M, `recurring-cohort` Nov 19] | 112 (model counts trialing at 80%: 117) | On track |
| VM churn, trailing 30 days | 3.5% (4 net cancels; 3 voluntary) [M] | — | Above the ~2.7% planning figure; small numbers |
| RA first renewal | 9 paid of 14 due, immature; first window closes **Nov 22** [M] | — | Read on review day |
| Compliance Plan upgrade test | 0 upgrades in 47 noticed; red flag not triggered [M] | — | — |
| Credentialing paid | **2 payments in Nov, $2,607** [M, `CredentialingPayment`]; 3 open engagements | under 1/month | Ahead of the target line |
| Credentialing minutes logged | 10 of 451 events, 160 minutes [M] | — | Hours per job still unmeasured |
| Source survey since Nov 13 | 5 answers: Google search 2, Google ad 1, ChatGPT 1, referral 1; "tried another service first" yes 1 / no 1 [M] | — | Too few to read |
| Abandoned checkout | Capture working again since the Nov 19 Spiffy snippet (test row) [M]; 1h email and purchase suppression unconfirmed | — | F1 gate not fairly tested yet |
| Partners | Nov 13: 38 firms, 1 reply, 0 substantive conversations [M]; no new conversation recorded since (not re-checked in Gmail) | — | Day-45 test says Waiting |

## 2. The Nov 14 re-cut: what's already been decided since

These items in the proposal were settled by later decision-log rows, so they come off the review agenda:

| Proposal item | Settled by |
|---|---|
| Mail service: 13 decisions in P2-05 and P2-06 | Nov 16 rows (switch-in free, attach window, OP email, pilot scope) and Nov 18 (pilot scope, practice-location line) |
| Letter to newly filed behavioral-health PLLCs | Nov 18: goes, first drop early January, ~450 letters, Lob First Class; text still to approve (§5) |
| Services page and Practice NPI add-on | Nov 18: five services on Stripe checkout forms; NPI add-on $129; build after Dec 1 |
| `01` ad appeals | Nov 18–19: no appeal; probe ad `832114234315` in review ([change log](../google_ads_changes.md)) |
| Credentialing delivery, coordinator | Nov 13 and Nov 18: Sid delivers; coordinator at $26–32/h only on the trigger |
| Model: Metro RA line | Nov 18: add at the measured 17% |
| Price by profession | Nov 13: declined (re-cut Q6 asks whether to revisit) |
| Credentialing national test | Nov 16–19: states, brand, site, terms, postcard batch, search budget ($6,944 ceiling) |

## 3. Decisions left for the review

1. **Adopt the re-cut** (partners, $985 test and PC pilot to Waiting/Stopped; rewritten P3 packages; §4 on-track numbers), with the edits in §2 above. Yes / edit / no.
2. **Price:** reopen a one-price $985 test in February? (Break-even 6–7 lost orders in 100 counting lifetime value.)
3. **Fee changes**, each yes / no / later: RA with the biennial filing at $129; $60 mail for new subscribers; a higher package tier.
4. **Partners:** apply the written Day-45 test (fewer than 3 substantive conversations → partner line about 5 a month, the rest Waiting). On today's evidence it triggers.
5. **Ads:** one January bid step, $105 → $120, extra spend capped at $1,500, judged after 14 days and 15 conversions (re-cut P3-06). Approve or decline.
6. **Metro:** ask Metro to put cards on file for new orders (first-invoice collection 17% today)?
7. **Price by profession:** leave declined, or revisit (Sid said Nov 14 he'd come back to it)?
8. **The Jan letter:** approve the text in §5, and decide which brand it goes out under: NY PLLC (as drafted, a company these filers may know from search) or Clear Panel Credentialing (the credentialing brand, now live at clearpanelcredentialing.com behind a login). The draft also says "I run NY PLLC, a small company", which is first person from Sid; keep, or change to "we" as on the credentialing site?
9. **Stop list:** confirm what stays paused, each with a revisit trigger: PCs (2 requests a month), MSO ads, affiliates, cold partner outreach, broad SEO content.

## 4. Refresh on review day (agent, before the meeting)

- [ ] RA first-renewal matured rate (window closes Nov 22): `npm run recurring-cohort`.
- [ ] Nov 16–22 scorecard, incl. Vercel visitors (read in the dashboard) and abandoned-checkout capture count.
- [ ] Ad A review result and `01` delivery.
- [ ] Credentialing: payments, open quotes, minutes logged.
- [ ] Partner threads: any reply since Nov 13 (Gmail search on the 41 contacted firms).
- [ ] November orders to date and pace.

## 5. NY DOS letter text (for item 8)

Full draft with merge fields, tracking, cost and pass number: [bh-pllc-letter-draft-2026-11-18](../reports/bh-pllc-letter-draft-2026-11-18/README.md) §3. Prices in it match the live nypllc.com credentialing page as of Nov 18 ($1,795 for three insurers + $350 each after; move-my-contracts $249 + $149; Medicaid $495, Medicare $395). The `nypllc.com/insurance` redirect it points to is built after Dec 1 and deployed on Sid's go. Re-read the Headway line against the live page the week of printing.
