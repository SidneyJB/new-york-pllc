# P1-05 rebuild: VM economics and the customer promise (Nov 13 2026)

This rebuilds the lost `PLLC-CRM/crm/reports/p1-05-2026-11-08/README.md` from live data. All reads were read-only. Nothing was sent, written to the database, or changed in Stripe or Vercel.

- Data as of **Nov 13 2026, end of day ET**. Series start **Apr 1 2026**. A **Nov 8** cut is shown wherever the lost original quoted a Nov 8 figure.
- Aggregates only. No client names, emails, order ids or entity names are in this folder.
- Files: this README, the helper [p1-05-vm-economics.ts](p1-05-vm-economics.ts), and its output [p1-05-output.json](p1-05-output.json).
- Cross-check: the P2-07 weekly report ([recurring-cohort-2026-11-13](../../../../PLLC-CRM/crm/reports/recurring-cohort-2026-11-13/README.md), gitignored) gives the same paying count (99), exposure (523.5), net cancels (9), gross cancels (13) and 30-day churn (2.7%).

**Short answer:** the original's **2.4%** churn, its **35/31/21/19** attach and its **27%** mature attach are all reproduced. The 2.4% is the *gross* basis through Nov 8. On the finance engine's net basis it was 1.6% then and is 1.7% now. The "all voluntary" claim does not hold under today's classifier: 2 of the 13 cancels since Apr 1 had an unpaid balance. The **96 paying** on Nov 8 can't be rebuilt, because the CRM only keeps current status. Today there are **99**.

## §1 Paying book, starts and cancels (Apr–Nov 2026)

**Book today (one status per entity, finance population):** 99 active (paying on Stripe), 20 trialing, 1 past due, 9 cancelled, 97 offer-only placeholders (not subscribers). "Trialing" means the first month was paid at formation checkout and Stripe billing starts in month two. Stripe agrees: 99 active VM subscriptions.

**By month.** "Live at month end" counts active + trialing + past due. "Stripe paid" counts paid VM invoices with an amount above $0 on our Stripe. Cancels are gross: every cancel row except tests.

| Month | New starts | Reinstates | Live at month end | Stripe paid (count / $) | Voluntary | Payment failure | Administrative | Net cancels (engine) | Subscriber-months | Net monthly churn |
|---|---:|---:|---:|---|---:|---:|---|---:|---:|---:|
| Apr | 14 | 0 | 34 | 20 / $1,000 | 0 | 0 | 0 | 0 | 27.4 | 0.0% |
| May | 19 | 0 | 52 | 33 / $1,650 | 1 | 0 | 1 formation refunded | 0 | 47.1 | 0.0% |
| Jun | 12 | 0 | 62 | 54 / $2,660 | 2 | 0 | 0 | 1 | 57.4 | 1.7% |
| Jul | 11 | 2 | 74 | 64 / $3,160 | 1 | 0 | 1 formation refunded | 1 | 69.4 | 1.4% |
| Aug | 10 | 0 | 81 | 70 / $3,485 | 2 | 1 | 0 | 3 | 77.6 | 3.9% |
| Sep | 15 | 0 | 95 | 78 / $3,860 | 1 | 0 | 0 | 1 | 87.8 | 1.1% |
| Oct | 20 | 0 | 114 | 93 / $4,610 | 1 | 0 | 0 | 1 | 106.2 | 0.9% |
| Nov 1–13 | 8 | 0 | 120 | 55 / $2,737 | 1 | 1 | 5 Metro migration | 2 | 50.5 | 4.0% (partial) |
| **Total** | **109** | **2** | | **467 / $23,162** | **9** | **2** | **2 refunded + 5 Metro** | **9** | **523.5** | **1.7%** |

- Classes follow the P2-07 classifier. *Voluntary* means the client asked and had no unpaid balance. *Payment failure* means an unpaid invoice or a dunning cycle at cancel. *Administrative* means the formation was cancelled and refunded, or the client moved to Metro's Stripe (Nov 9). Neither administrative kind is churn.
- Stripe's own reason says `cancellation_requested` on all 14 non-Metro VM cancels ever. Staff API cancels also say that. So the Stripe reason alone can't separate voluntary from payment failure.
- Closure (the practice shut down) and migration to the client's own address aren't recorded. Every voluntary cancel needs a DOS address change first (agreement 4.1), but the CRM doesn't store which one.
- Stripe also issued 108 $0 invoices in the window. Those are trial starts, not revenue.

## §2 VM/RA overlap

**Rule: we stay RA through VM.** The $50 includes registered agent service (site pricing card; agreement 2.5, "unless the Customer explicitly opts out in writing"). A checkout VM buyer gets no RA subscription in the CRM. So no separate $99 RA revenue is forecast for a VM entity.

| Item | Count |
|---|---:|
| Live VM entities (active, trialing, past due) | 120 |
| Live direct-RA subs on those entities today | **1** (trialing, set to stop at period end) |
| Legacy active RA rows on live VM entities | 0 |
| RA subs cancelled since Apr 1 because VM includes RA | 3 (1 in Oct, 2 in Nov) |
| Live VM entities with the CRM RA opt-out flag | 3 |
| RA subs ever on entities that have had real VM | 6 |

- This matches the checklist. Three entities had both. Two RA subs were cancelled on Sid's instruction; the CRM timestamps them Nov 8 ET, and the checklist says Nov 9. The third is the one still stopping at period end.
- **Not verified:** the CRM opt-out flag stops RA billing. It does not prove who is RA on the DOS record. This check didn't read DOS.
- **Open:** what happens to the RA role when VM ends. P2-06 drafts "RA sub ends when VM starts" for migrations. There's no written rule for the reverse (VM cancelled, RA continues at $99).

## §3 Attach: checkout vs later, one 90-day formation cohort

**Method.** Each entity is counted once, in the ET month of its first paid formation order (not VM-only, total above $0). The numerator is the entity's first real VM sub (Stripe sub id set, or status not pending or cancelled), started within 90 days of that order. Path: *checkout* if the sub carries the formation order id or was created within 3 days of it. *OP-stage* if the OP-approved upsell checkout was completed. Anything else is *other later* (staff start, reply to the OP email, reinstate). The paths add up to the total. A cohort is *mature* once 90 days have passed since the month's last day. Apr–Jul are mature. Aug matures Nov 29.

**Basis 1: all formation entity types (PLLC + LLC).** This reproduces the original.

| Order month | Entities | VM within 90 d | Attach | Checkout | OP-stage | Other later | Mature |
|---|---:|---:|---:|---:|---:|---:|---|
| Apr | 49 | 17 | 34.7% | 15 | 0 | 2 | yes |
| May | 57 | 18 | 31.6% | 17 | 0 | 1 | yes |
| Jun | 47 | 10 | 21.3% | 10 | 0 | 0 | yes |
| Jul | 47 | 9 | 19.1% | 9 | 0 | 0 | yes |
| Aug | 47 | 10 | 21.3% | 8 | 0 | 2 | no (23 windows open) |
| Sep | 51 | 16 | 31.4% | 15 | 0 | 1 | no |
| Oct | 68 | 19 | 27.9% | 19 | 0 | 0 | no |
| Nov 1–13 | 24 | 7 | 29.2% | 7 | 0 | 0 | no |
| **Apr–Jul pooled (mature)** | **200** | **54** | **27.0%** | **51** | **0** | **3** | |

**Basis 2: PLLC entities only (the P2-05 basis).** Apr 17/48 = 35.4%, May 18/55 = 32.7%, Jun 10/44 = 22.7%, Jul 9/44 = 20.5%, Aug 10/44, Sep 16/51, Oct 19/67. Pooled mature: **54/191 = 28.3%**.

**Basis 3: drop cancelled-and-refunded formations.** All types: pooled mature 52/197 = 26.4%. PLLC only: 52/188 = 27.7%.

What this shows:

- **Attach is almost all at checkout.** In the mature cohorts, 51 of 54 attaches came at checkout. 3 came later, none through the OP-approved checkout.
- **No mature cohort gained a VM start after day 90.** "Ever attached to date" equals "within 90 days" for Apr–Jul.
- **The OP-approved email:** 98 sent, 2 bought, ever. Neither purchase falls inside a 90-day window. P2-05 explains why: the email goes out a median of 104 days after the order.
- The checklist bullet asks to compare the two paths inside one cohort. That can be done now with the path rule above (the rule P2-05 proposed). The only guess left is the 3-day checkout window, which a `Subscription.acquisitionSource` field would remove.

## §4 Churn on both bases

Exposure is subscriber-months at risk: the union of each entity's live VM intervals inside the window, divided by 30.44 days. Pending placeholders never count.

| Window | Exposure | Net cancels (finance engine) | Net monthly | Gross cancels | Gross monthly |
|---|---:|---:|---:|---:|---:|
| Apr 1 – Nov 8 | 503.9 | 8 | **1.6%** | 12 | **2.4%** |
| Apr 1 – Nov 13 | 523.5 | 9 | **1.7%** (18.8%/yr compounded) | 13 | **2.5%** |
| Trailing 30 days to Nov 8 | 108.5 | 2 | 1.8% | | |
| Trailing 30 days to Nov 13 | 111.6 | 3 | 2.7% | | |

**Why they differ.** The finance engine (`computeVirtualMailChurn`) counts one cancel per entity, only if the entity was never reinstated, and it leaves out cancelled-and-refunded formations and the 5 Metro VM-only LLCs. Gross counts every cancel row except tests and Metro moves. Of the 13 gross cancels since Apr 1:

- 9 are net churn (7 voluntary, 2 payment failure)
- 2 were reinstated later (May and Jun cancels, reinstated in Jul)
- 2 were refunded formations, which the engine drops

Use the net basis for the model. It is what the Finances tab and projections use. The gross basis is kept only to compare with the old 2.4%. The 30-day figure (2.7%) rests on 3 cancels, so it is noisy. Nov 1–13 shows 4.0% on 50.5 months for the same reason.

## §5 Unit economics

From Stripe, Apr 1 – Nov 13: 467 paid VM invoices, $23,162 collected.

| Line, per account per month | Amount | Source |
|---|---:|---|
| Subscription revenue | $50.00 | 457 of 467 paid invoices at $50; 6 at $35 and 4 at $25 (custom prices; $25 is the second-entity price, Sid Nov 12) |
| Card fee | −$1.75 (3.5%) | Actual Stripe fees on 456 $50 charges: $797.70, $1.749 each. That is 2.9% + $0.30. |
| Refunds | about −$0.32 (0.6%) | $150 refunded on VM charges in the window |
| Unpaid (bad debt) | about −$0.32 (0.6%) | 3 open, attempted VM invoices, $150, against $23,312 billed |
| Postage | $0 net when billed | Pass-through at cost (agreement 3.3); see below |
| Staff time | not costed | Decision log Nov 9: labor isn't counted in dollars. Sid is the only staff. |
| **Contribution** | **$48.25** before refunds and bad debt; **about $47.60** after | |

**Postage status.** The mail station started Nov 6. It has bought 12 billable labels for $25.91 (6 flats, 5 letters, 1 parcel). 8 of them ($12.82, the Nov 6 run) are on clients' Stripe invoices. One $1.98 line has been collected on a paid invoice so far. 4 labels ($13.09, Nov 13) aren't billed yet. One $0.78 Partner RA label is never billable. The daily billing cron is still off (`MAIL_POSTAGE_BILLING_LIVE` not set), so billing is by hand. Low-volume vs high-volume accounts can't be compared yet: there is one week of data.

**What "zero overhead" leaves out.** Sid's Oct 29 call holds for per-account cash costs: the only one found is the card fee. These are not in the $48.25:

- Stripe Billing/invoicing fees. P1-03 found $42–62 a month of these across the whole account, not split by product.
- Any fee for Suite 1509-24. The Office Evolution agreement hasn't been reviewed (form-1583 shard).
- Label stock and envelopes. Not tracked.
- Postage float: we pay USPS now and collect on the next monthly invoice. Postage on held, cancelled or unpaid subs is not billed automatically, and final invoices aren't built.
- Staff time, by decision.

**Monthly vs $540 annual.** There is no annual VM price. All live VM prices on Stripe are monthly, so there is no annual retention evidence at all. The comparison below is a model, not data.

- Annual: $540 less a $15.96 card fee = **$524.04**, collected up front.
- Monthly: $48.25 a charge. Expected first-year take, if every month's churn is *c*:

| Monthly churn | Expected paid months in year 1 | Year-1 take |
|---|---:|---:|
| 1.7% (net, since Apr 1) | 10.94 | $527.82 |
| 2.4% (old gross figure) | 10.54 | $508.37 |
| 2.7% (trailing 30 days) | 10.37 | $500.31 |

- Annual comes out ahead when monthly churn is above **1.8%**. At today's net 1.7% it's about even. Annual saves $5.04 a year in card fees and gives up $60 of list revenue.
- This assumes annual buyers would churn the same way, that annual is non-refundable, and that every first month is paid on our Stripe. None of that is verified. Today the first month is paid inside the formation checkout. The $129 address-change step already slows cancels.

## §6 Permitted uses and limits of the promise

**What the live pages promise today** (agreement "Last updated: November 6, 2026"; `/virtual-address-services`; checkout text as recorded in P2-05 `checkout-offer-copy.md`):

- Our address at 1 Blue Hill Plaza, Pearl River, with a "unique suite number" (agreement 1.1, site). **Not true yet:** every client is on Suite 1509-24.
- No mail handled until a notarized Form 1583 and two IDs are verified (1.2–1.3). **Not how we operate:** Sid decided Nov 6 that mail continues while 1583s are backfilled.
- Weekly forwarding on Fridays (2.1). The Friday cadence isn't logged. The pack list isn't built.
- Junk mail not forwarded unless the client opts in (2.2). Packages accepted, shipping at cost (2.3). The first parcel label was bought Nov 13.
- Signature authority for registered, certified and insured mail (2.4).
- Registered agent for service of process unless opted out. Legal papers are forwarded on the weekly schedule (2.5). In practice, legal and government mail goes out the same day (mail-station decision, Nov 6). That practice isn't written into the agreement.
- $50 a month. Postage at cost, itemized on the next monthly invoice (3.1–3.3).
- Cancellation isn't complete until our address is off the DOS record. The client files it, or we file for $129 (4.1).
- After a missed payment, 30 days to cure or change the address. Then we file the client's home address (4.2).
- Mail after the end of service is held 30 days. Release costs $50 plus postage (4.3–4.4). Ops waive the $50 the first time; the agreement doesn't say so.
- Mail is confidential and not opened without written consent or legal order (5.1). The site also says "Complete privacy and confidentiality". The checkout says the address keeps your home address off public records, and that it is "permanently searchable".
- The agreement says nothing about what the address may or may not be used for. Only the CRM post-formation FAQ says it: payers, NPPES and banks need a physical practice location.

**Draft permitted-use wording for Sid (not confirmed, not legal advice):**

> Use this address for: your PLLC's address on the NY Department of State record, your registered agent address, and business mail.
>
> Don't use it as: your practice or service location. That includes NPPES (NPI), payer and CAQH enrollment, license or registration practice addresses, and a bank's "physical address". Give them the address where you actually practice.
>
> What we keep private: your home address stays off your state filing. It may still appear on other records you file yourself, such as license, NPI or tax records.

**Open legal questions for the attorney (not decided here):**

1. May each profession we serve list a mail-receiving address as the PLLC's DOS address? Are there profession-specific office rules, for example for law firms?
2. CMRA status. Who is the CMRA at Suite 1509 (Office Evolution or us)? Is it OK that we hold the signed 1583s? Must we register ourselves? (form-1583 shard)
3. Agreement 1.1 (unique suite) and 1.2–1.3 (no mail before verification) don't match operations. How should they be rewritten?
4. Agreement 2.5 forwards legal papers on the weekly schedule. Should the same-day practice be the written promise? Is our RA designation recorded on each VM client's filing? (not checked here)
5. Privacy claims: "complete privacy", "keep your home address off public records", "permanently searchable". What may we say?
6. Section 10 notice for existing clients on monthly postage billing. The decision log (Nov 6) says 30 days' notice is needed and none was sent. The mail-station shard says no notice is planned, because clients were told up front they pay postage. These conflict. Does a section 10 email bind existing clients?
7. Authority for the 4.2 default filing to the home address. Also missing: a relocation clause (who pays if the Pearl River address changes).
8. Unwritten terms in use: the $25 second-entity price, the first-time waiver of the $50 holding fee, and same-day legal mail.

**Gaps vs the old §5 list, updated:** package forwarding is now live (first parcel Nov 13). "RA included" vs billing RA subs is resolved (§2). The Friday cadence still isn't logged. The postage notice is still unresolved (question 6).

## §7 How each figure was produced (re-run)

One helper. It reads only, and it writes only `p1-05-output.json` in this folder:

```bash
cd /Users/sidb/dev/pllc-business/PLLC-CRM/crm && \
  npx tsx --tsconfig tsconfig.json \
  ../../new-york-pllc/reports/evidence/p1-05-vm-economics-2026-11-13/p1-05-vm-economics.ts --asof 2026-11-13
```

- **Database:** `createReadOnlyScriptPrisma` (session `default_transaction_read_only=on`). Tables: `Subscription` (VM + RA, via the P2-07 loader `loadCrmSubscriptions`), `Pllc` + `Order` (attach cohorts), `RegisteredAgentSubscription` (legacy RA), `MailShipment` (postage).
- **Stripe:** `createReadOnlyStripe` (restricted CRM key). Calls: `invoices.list` (created Apr 1 – Nov 13 ET), `invoices.listLineItems` when needed, `charges.list` with `balance_transaction` expanded, `prices.retrieve`. Per cancelled sub: `subscriptions.retrieve` and `invoices.list`, through the P2-07 `buildCancellationRows`.
- **Population:** the finance population. Tests (`E2E TEST` names), the 5 Metro VM-only LLCs and cancelled-and-refunded formations are left out of the book and the net churn. Gross cancels keep refunded formations.
- **§1** `monthly[]`, `bookNow`. **§2** `overlap` (same logic as `scripts/report-vm-ra-overlap.ts`, run on a read-only session). **§3** `attach[]`: basis 1 = variant E, basis 2 = variant A, basis 3 = variants B and F. **§4** `churn`. **§5** `stripeVm`, `liveVmPrices`, `postage`.
- **Windows:** months are ET calendar months. Nov 8 cuts end at Nov 8 23:59 ET. Mature means order month end + 90 days ≤ Nov 13.
- **Not re-run:** `npm run recurring-cohort`, because it writes into `PLLC-CRM/crm/reports/`. Its existing Nov 13 output was used as a cross-check only.
- **Known quirk:** the CRM's `etMidnight` uses the noon offset, so on Nov 1 (the DST change) it lands one hour late. October therefore runs to Nov 1 01:00 ET. No figure here changes.

## §8 Differences vs the lost original

| Original figure | Rebuilt | Why |
|---|---|---|
| Churn **2.4%/month** (12 cancels / 503.5 months since Apr 1, Nov 8) | **Reproduced:** 12 / 503.9 = 2.4% gross through Nov 8 | Same basis. The 0.4-month exposure gap is likely later edits to start or cancel dates. Not traced. |
| (same, model basis) | Net 8 / 503.9 = **1.6%** (Nov 8); 9 / 523.5 = **1.7%** (Nov 13) | The original counted reinstated entities (2) and refunded formations (2) as churn. Use 1.7% net in P2-11. Revisit with the 30-day 2.7%. |
| **All voluntary** ("all 13 ever, `cancellation_requested`") | Since Apr 1 through Nov 13: 9 voluntary, 2 payment failure, 2 refunded formations. Through Nov 8: 9 / 1 / 2. | The original read Stripe's reason only. Staff cancels after unpaid months also say `cancellation_requested`. The P2-07 classifier now checks for an unpaid balance. |
| **96 paying** (Nov 8) | **Not reproducible.** Today: 99 active, 20 trialing, 1 past due. | The CRM stores current status only, not a dated snapshot. A likely bridge is trialing subs turning active in month two. Not verified. |
| Attach **35/31/21/19** (Apr–Jul) | **Reproduced:** 34.7 / 31.6 / 21.3 / 19.1 | The original used all formation entity types, PLLC and LLC. May rounds to 32 here, so the original may have truncated. P2-05's 36/32/23/20 is the PLLC-only basis (35.4 / 32.7 / 22.7 / 20.5 here). One Apr/May entity sits in a different month between P2-05 and this run, likely a month-boundary (time zone) difference. Not traced. |
| **27% mature attach** | **Reproduced:** 54 / 200 = 27.0% (Apr–Jul, all types) | PLLC only is 28.3%. Without refunded formations it is 26.4–27.7%. Pick one basis and keep it for P2-11 and P2-05. |
| **0.5% bad debt** | VM only: **0.6%** ($150 unpaid of $23,312 billed). VM refunds: another 0.6%. | The source of 0.5% wasn't recorded. It may cover all products. Not reproduced exactly. |
| **Zero overhead** | Holds for per-account cash cost apart from card fees ($1.75) | Unallocated: Stripe Billing fees, any suite fee, supplies, postage float. Labor is excluded by decision. |
| Overlap: 3 entities, 2 RA subs cancelled Nov 9 | 1 live (stopping at period end); 2 cancelled (CRM timestamp Nov 8 ET); 1 more administrative RA cancel in Oct | Matches. The Nov 8 vs Nov 9 date is a timestamp vs instruction-day difference. |
| §6 permitted-use draft | Redrafted above from the live agreement, site and CRM FAQ | The original draft text is lost. This is a new draft, not a copy. |

**Unverified or unreproducible:** the 96 Nov 8 count; the source of the 0.5% bad debt; the exact 503.5 exposure; who is RA on the DOS record for VM entities; any Office Evolution suite cost; the Friday cadence; staff time per piece.
