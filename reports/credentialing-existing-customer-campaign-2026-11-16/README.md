# Existing-customer insurance credentialing campaign (prepared Nov 16 2026, NOT sent)

Lead source 2 in [the 2028 plan §3A](../../nypllc-2028-path-to-1m-plan.md): behavioral-health PLLCs we formed. Sid asked for it to be ready now instead of Q1. **Nothing has been sent.** Every send needs Sid's go-ahead, batch by batch.

| Piece | Where |
|---|---|
| Per-person list (has emails; gitignored) | `PLLC-CRM/crm/reports/credentialing-existing-customers-2026-11-16/` (`campaign-list.csv` = sendable waves; `all-behavioral-health.csv` = every row with its exclusion reason; `held-past-caqh-offer.csv`; `build-list.ts.txt` = the read-only query that built it) |
| Send script (uncommitted in PLLC-CRM) | `PLLC-CRM/crm/scripts/send-credentialing-existing-customers-2026-11-16.ts` |
| Offer and prices used | Live page [/ny-pllc-insurance-credentialing](https://www.nypllc.com/ny-pllc-insurance-credentialing) (checked live Nov 16; matches `web/src/app/ny-pllc-insurance-credentialing/page.tsx`) |

## 1. Counts (no names or emails)

Read-only queries against the CRM on Nov 16 2026. Behavioral health is decided from the profession fields (license profession/type and the owner's profession); the PLLC name is used only when there is no profession at all (0 rows needed it), plus Medicine PLLCs with "psychiatry" in the name (4, counted as psychiatrists).

| Step | PLLCs |
|---|---:|
| Behavioral-health PLLCs in the CRM (not LLCs) | 212 |
| Cancelled or refunded | -6 |
| Not yet DOS-approved | -84 |
| **DOS-approved, not cancelled** | **122** |

The plan's rough Nov 13 figures were about 230 and about 130; the profession-field count is 212 and 122.

How the 122 split (each PLLC counted once, under the first rule that applies):

| Group | PLLCs | What happens |
|---|---:|---|
| **Wave 1: send** | **58** | 4 batches (§3). 57 pass the live re-check today; 1 emailed us after the list was built and is skipped until that thread is answered |
| Wave 2: got the virtual-mail address note today (Nov 16) | 13 | Later wave, Jan 5 2027 (the script refuses within 7 days of that note anyway) |
| Wave 3: already asked in the formation-complete email (Nov 10 to 16) | 6 | Later wave, Jan 5 2027 (script waits 3 weeks after that email) |
| Held: got the Sep/Oct $499 CAQH offer with an invoice | 28 | Sid's call (open question 2). Counted as a past quote, so not in any wave |
| Held: behavior analysts (ABA) | 2 | Sid's call (open question 3) |
| Excluded: credentialing engagement in the CRM, or named (Green Sparrow, Cove Compass, Dunia Gibson, Madeline Rose) | 4 | Never |
| Excluded: credentialing price already sent by email (Nov 11 and 13 quotes, plus one from the CAQH pilot) | 3 | Never; they are open quotes |
| Excluded: partner-referred order (`b2bPartnerId`) | 4 | Never |
| Excluded: CRM do-not-send list | 2 | Never |
| Excluded: stop / charge-consent complaint on file | 1 | Never |
| Excluded: PLLC ownership transfer in progress | 1 | Never |
| Excluded: law firm, enterprise customer, checkbox lead, no usable email | 0 each | (all 29 checkbox leads, including the Nov 18 nudge list, were still before DOS approval; the script also blocks `caqhInterest` orders) |

Wave 1 (58) by profession: mental health counselors 23, psychiatric NPs 18, LCSWs 6, psychiatrists (MD) 4, psychologists 3, creative arts therapists 2, LMFT 1, other mental health 1.

Wave 1 flags (columns in the CSV, not exclusions):

- **RA past due: 2** (registered-agent renewal charge failed). One of them is the PLLC Sid left out of today's VM note for the same reason. Both are in batch 1; see open question 4.
- Paying us now: RA 45, virtual mail 11, neither 2.
- Emailed us in the last 7 days: 5 (put in batch 4, the last one).
- Has mentioned insurance, credentialing or Headway to us before: 9 (put first, in batch 1).
- Business address outside NY: 2 (likely telehealth into NY).
- County field is blank for 56 of 58, so the email asks for the county instead of guessing it from the city.

## 2. The emails

ASCII only, from contact@nypllc.com, plain text with the usual HTML wrapper. Merge fields: `{First name}` (case fixed when the CRM has it all lower or upper case), `{PLLC name}` (all-caps legal names shown in title case), `{profession plural}` (for example "mental health counselors", "LCSWs", "psychiatric NPs"). No insurer is named anywhere, so the panel-status rule cannot be broken by this copy.

**Subject:** Getting {PLLC name} in network with insurers
**Alternative:** Insurance contracts under {PLLC name}

> Hi {First name},
>
> I hope things are going well with {PLLC name}. I wanted to let you know about something new we do: we get clients in network with insurance companies under their own PLLC.
>
> If you see clients through Headway, you've probably seen that it now takes $9.99 out of your payout for every session with a client it sent you. It's rolling that out state by state. Contracts you hold yourself under the PLLC don't carry a platform fee, and they stay yours if you leave.
>
> We handle the paperwork: the PLLC's NPI, your CAQH profile, the applications, and following up with each insurer every two weeks until they decide. Your part is mostly signing, about 45 minutes in all, and we never need your passwords.
>
> It's $1,795 for three insurers and $350 for each one after that, with payment plans if that helps. If you're already in network under your own name, moving those contracts over to the PLLC is $249 plus $149 per insurer.
>
> If you'd like to do this, write back with the county where you see clients (or tell me you're telehealth only) and the insurers you have in mind. Before you pay anything, I'll check what we know about which of them are taking new {profession plural} there.
>
> Sid

Notes on the copy:

- The Headway line gives no start date. The live page says the fee is rolling out state by state through late 2026 and that Headway has moved the dates more than once, so the email states only the fee and the rollout.
- Medicaid ($495), Medicare ($395), Foundation ($399) and upkeep are left out to keep it short; they come up in replies.
- "Before you pay anything, I'll check what we know" is deliberate. The Nov 14 billing rule says we never sell an insurer known closed, but the apply-first insurers (UHC/Optum BH, Carelon BH, Evernorth BH, Excellus) have no written pre-check, so the email does not promise a guaranteed answer for every insurer. The page's refund-or-switch rule covers the rest and goes in the quote.

**Follow-up (recommended, once, 7 to 12 days later, in the same thread, only to people who have not emailed us since):**

> Hi {First name},
>
> Following up on my email about insurance contracts for {PLLC name}. If you're thinking about it, send me your county and the insurers you have in mind, and I'll check which are taking new {profession plural} before you decide anything.
>
> If it's not for you, no problem at all. I won't email about this again.
>
> Sid

Why recommend it: in the CAQH pilot, the Oct 7 follow-up drew 15+ replies against 4 to the first email. Most were no's, but a no is useful too (it tells us who is on Headway only, cash pay, or already in network). One follow-up, then never again.

## 3. Plan

### Timing and batches

Sid's Tue/Thu 10:00 to 12:00 blocks are credentialing sales from Nov 17, so sends go out on those mornings and replies get answered in the next block. Thanksgiving week is skipped.

| Batch | PLLCs | Send | Follow-up | Who |
|---|---:|---|---|---|
| 1 | 15 | Thu Nov 19 | Tue Dec 1 | Warmest first: mentioned insurance/Headway to us before, then the longest-formed |
| 2 | 15 | Tue Dec 1 | Thu Dec 10 | Next longest-formed |
| 3 | 15 | Tue Dec 8 | Thu Dec 17 | |
| 4 | 13 | Thu Dec 10 | Thu Dec 17 | Most recently formed, plus the 5 who emailed us this week |
| vm (wave 2) | 13 | Tue Jan 5 2027 | Thu Jan 14 | VM address note recipients |
| fc (wave 3) | 6 | Tue Jan 5 2027 | Thu Jan 14 | Asked in the formation-complete email |

**Pacing rule:** about 15 a batch keeps replies answerable (at the estimates below, 2 to 5 replies and about 1 job per batch). Hold the next batch if more than 5 replies are unanswered, or if 5 or more credentialing jobs have started that month (the script refuses at 7 a month unless Sid says otherwise; 3 have started so far in November). The 84 PLLCs not yet DOS-approved are not a campaign: they get the insurance question in the formation-complete email automatically.

### Expected results (estimate, not a forecast)

- Benchmarks we have: checkbox leads (self-selected) replied 4 of 11; the Sep/Oct CAQH $499 waves got replies but **0 paid** (wrong offer, invoice attached, many already credentialed or cash pay).
- **Wave 1 (58): replies about 15 to 30% (9 to 17), real conversations 4 to 8, paid jobs 2 to 5.** Many replies will be "Headway only", "cash pay" or "already in network". The last group is a Move my contracts sale ($249 + $149 per insurer), so expect more of those than full Get in network jobs.
- **All waves (77 sendable): about 3 to 7 jobs**, more if Sid releases the 28 held CAQH-offer PLLCs.
- That is below the plan's "perhaps 10 to 20 jobs" for this lead source. The owned list is smaller after exclusions (58 now, 77 with later waves) than the 130 it was sized on.

### How it gets sent

`PLLC-CRM/crm/scripts/send-credentialing-existing-customers-2026-11-16.ts` (copied from the Nov 16 VM-note script; left uncommitted because another session is working in PLLC-CRM).

- Dry run unless `--confirm`. `--batch 1|2|3|4|vm|fc`; `--followup` for the one follow-up; `--status` prints replies and engagements per batch (read-only).
- Refuses if that batch's log already exists, refuses before the batch's planned date, and refuses at 7 credentialing jobs started in the month.
- One email per PLLC ever: skips any PLLC or address in an earlier batch log, any PLLC with a `CREDENTIALING_LEAD` note, and any matching campaign subject already in the mailbox.
- Re-checks every row live on the day: DOS approval, cancelled/refunded, law firm, partner/enterprise order, checkbox lead, credentialing engagement or CAQH intake, the CAQH-offer skip list, do-not-send list, stop/dispute/complaint wording, an RA renewal dispute, any email from the client since the list was built, any credentialing price we sent since, the 3-week wait after the formation-complete question, and 7 days after the VM note. ASCII check and the 30-day duplicate-outbound guard before each send.
- On `--confirm` it sends through the Gmail API, mirrors the message into the CRM, adds a `CREDENTIALING_LEAD` note on the PLLC, and writes the batch log. The follow-up threads under the first email and skips anyone who wrote back.

**Dry run, Nov 16:** batch 1 would send 15, batch 2 15, batch 3 15, batch 4 12 (1 skipped: emailed us after the list was built). Waves vm (13) and fc (6) send 0 today, as intended (VM note under a week old; formation-complete question under 3 weeks old; 2 of the 6 also emailed us since). Follow-up dry run refuses (batch 1 not sent). No log was written and nothing was sent.

### How replies are tracked

- Replies land in contact@nypllc.com and come through the normal close-out as client rows. Each is answered there (quote on reply, with the panel-status lookup for the insurers they name).
- On a yes: create the case with `credentialing-create-engagement.ts`, then log everything with `credentialing-log.ts` (with `--minutes`), per the credentialing tracking rule.
- On a no or "not now": a CRM note on the PLLC with the reason (Headway only, cash pay, already in network, timing). Reasons feed the next version of the offer.
- `--status` gives the per-batch numbers for the Jan 8 2027 results check.

## 4. Conflicts found

- **Prices:** live page, credentialing plan §1 and decision log agree: Get in network $1,795 + $350; Move my contracts $249 + $149 (from Nov 16); Medicaid $495; Medicare $395; Foundation $399. Stale copies: the decision log's Nov 3 row ($1,095 + $225; $199 + $99, superseded by later rows), the credentialing plan's Danielle and Cove Compass worked examples ($1,095, $199 + $99), and the old `credentialing-interest-email-template.md` ($3,000 to $4,000), already marked replaced.
- **Closed-insurer rule:** the live page says "you get that insurer's portion back, or we switch it"; the Nov 14 rule says switch first, then a $350 refund, setup not refunded. Same outcome; the quote should use the Nov 14 wording.
- **The brief vs the Nov 14 billing rule:** "check which insurers are open before they pay" can't be fully true for the apply-first insurers. The email says "check what we know" instead.
- **Client time "about 45 minutes":** I found no measured source for the client's own time (the plan's 30 to 45 minutes is Sid's time per job). It is Sid's figure from the brief; confirm it.
- **Timing:** the 2028 plan calls this a Q1 campaign; Sid moved it to now (Nov 16).

## 5. Open questions for Sid

1. **Go-ahead for batch 1 on Thu Nov 19**, and is the subject line or the alternative better?
2. **The 28 who got the Sep/Oct $499 CAQH offer:** leave them out (current), or send a version with one extra line ("I emailed you in the fall about CAQH setup; we do a lot more now") to those who didn't decline? Several replied then that they're cash pay, on Headway only, or already have CAQH.
3. **Behavior analysts (2):** include? ABA credentialing works differently from therapy panels.
4. **RA past due (2, both in batch 1):** send anyway, or hold until the RA renewal is paid? You left one of them out of today's VM note for this reason.
5. **The follow-up:** OK to send it once per batch as planned?
6. **"About 45 minutes" of the client's time:** keep that figure?
7. **Psychiatrists (MD, 4) and psychiatric NPs (18):** the copy works for prescribers, but Medicare/Medicaid matter more for them. Keep the same email, or add one line on Medicare/Medicaid?
