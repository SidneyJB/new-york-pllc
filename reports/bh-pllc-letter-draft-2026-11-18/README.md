# Letter to newly filed behavioral-health PLLCs (draft, Nov 18 2026, NOT sent)

**Status: prepared, not sent, not printed, nothing bought.** Sid decides in January whether it goes ([P2-12 re-cut](../../ops/p2-12-day45-recut-proposal-2026-11-14.md) §3 P3-09 and §6; [2028 outlook](../../nypllc-2028-path-to-1m-plan.md) §3A lead source 3, §5 January row). The re-cut flags this letter as the item the $800K program leans on most: without letters to public lists, the "everything done" odds fall from 77% to 40% (re-cut §1).

Tags: **[M]** measured, **[E]** estimate, **[A]** assumption, **[C]** cited source.

| Piece | Where |
|---|---|
| List method, part 1: CRM names, read-only | [list-method/crm-names.js](list-method/crm-names.js) (one `SELECT` on `Pllc`, session set `READ ONLY`, main + MBS tenant; writes nothing to the DB or the CRM repo) |
| List method, part 2: open data pull and filters | [list-method/build-list.py](list-method/build-list.py) |
| The list itself (names and addresses) | **Not in this repo.** The Nov 18 run wrote it to the session scratchpad (`.../scratchpad/letter-run/letter-list.csv`, 298 rows), which is temporary. Re-run in January for a fresh list; keep the output outside every repo, the same way the existing-customer campaign kept its per-person CSV in a gitignored folder. |

---

## 1. Count: new behavioral-health PLLCs that aren't ours, last 90 days

Pulled Nov 18 2026 from [data.ny.gov "Active Corporations: Beginning 1800"](https://data.ny.gov/d/n9v6-gdp6) (`n9v6-gdp6`), domestic PLLCs with an initial DOS filing date from Aug 20 to Nov 17 2026. The dataset's latest filing date was Nov 17 2026, so it runs about one day behind [M].

| Filed | BH by name | Ours (CRM match) | MBS tenant | Rockland, no CRM match | ABA (held) | LMSW | **Not ours** | c/o agent or law firm | **Mailable** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Aug 20–31 | 44 | 9 | 0 | 1 | 2 | 0 | **32** | 2 | **30** |
| September | 146 | 13 | 0 | 2 | 5 | 1 | **125** | 14 | **111** |
| October | 152 | 17 | 1 | 5 | 9 | 0 | **120** | 15 | **105** |
| Nov 1–17 | 82 | 13 | 1 | 5 | 3 | 0 | **60** | 8 | **52** |
| **90 days** | **424** | **52** | **2** | **13** | **19** | **1** | **337** | **39** | **298** |

**About 120–125 a month aren't ours, and about 105–110 a month have an address a letter can reach** [M]. That matches the re-cut's "about 125 a month" from the Nov 13 pull. November's pace (60 in 17 days, about 106 a month) may be low only because recent filings are still landing in the dataset.

What we file is about 12% of these names (52 of 424 in 90 days) [M].

Mix of the 337 (by the name pattern): LCSW / social work 123, psychiatric NP 68, mental health counseling 61, psychology 51, psychiatry with no profession stated (MD, DO or NP) 14, marriage and family therapy 11, creative arts therapy 6, other psychotherapy or psychoanalysis 4. Process address outside NY: 9.

### How the list is built

1. **Pull** every domestic PLLC filed in the window from the open data set (public; only the query goes out).
2. **Keep behavioral-health names**, first match wins: NP in Psychiatry / psychiatric nurse practitioner / PMHNP; LCSW, clinical social work, social work; LMHC, mental health counseling; LMFT, marriage and family (therapy); creative arts, LCAT, art/music/drama therapy; psycholog-; psychotherapy, psychoanalysis, counseling, mental health, behavioral health; psychiatr-. NY PLLC names almost always state the profession, but a name that doesn't is missed, so the count is a floor.
3. **Drop our customers:** exact match on the normalized name (punctuation, "PLLC" and "The" removed) or on the DOS ID, against every `Pllc` row in the CRM (596) and the MBS tenant (3,444), read-only. Fuzzy matching was tried and only produced false pairs (for example "Hall Psychological Services" against another firm's "JG Psychological Services"), so it isn't used.
4. **Drop every Rockland County filing with no CRM match** (13). Every one of our 52 matches was filed in Rockland, because we file there, so an unmatched Rockland filing may be ours under a changed name, a sister-company (nyllc.com) filing, or a neighbor. Cheap to skip.
5. **Hold behavior analysts (ABA)** (19), as the existing-customer campaign does: ABA credentialing works differently. **Drop LMSW names** (1): they can't enroll on their own.
6. **Set aside "c/o" an agent or law firm** (39: MJ Morley Law 14, Registered Agents Inc. 8, Northwest 4, Accumera 3 and others). The letter would go to a forwarding service or a lawyer, not the clinician. That leaves **298 mailable**.
7. **Re-run on the day of printing** so anyone who ordered from us since then drops out, and check the printed list against the CRM do-not-send list and any open credentialing lead or quote. (Every January customer is in the CRM by then; formation customers already get the insurance question in their formation-complete email.)

### Sample (business names only, from the 298; filed Aug 20 – Nov 17)

Shown without addresses. These are public-record business names; several mailable rows carry a person's name, and those are left out of this sample.

| Filed | County | PLLC | Pattern |
|---|---|---|---|
| Aug 24 | Suffolk | Anchor NP in Psychiatry Services PLLC | Psychiatric NP |
| Aug 26 | Albany | Dear Mind Therapy LCSW PLLC | LCSW |
| Sep 8 | Rensselaer | Sage Mental Health Counseling PLLC | Mental health counseling |
| Sep 17 | Suffolk | Lighthouse Creative Arts Therapy PLLC | Creative arts therapy |
| Sep 25 | Albany | Arc Psychology PLLC | Psychology |
| Sep 30 | Westchester | Life Beyond the Stigma Mental Health Counseling PLLC | Mental health counseling |
| Oct 1 | Chautauqua | Guiding Light Counseling LCSW PLLC | LCSW |
| Oct 13 | Albany | Essence Counseling Wellness LCSW PLLC | LCSW |
| Nov 5 | Ontario | Legacy Marriage and Family Therapy PLLC | MFT |
| Nov 10 | Albany | Unity NP in Psychiatry PLLC | Psychiatric NP |
| Nov 12 | Albany | Tranquility LCSW Services PLLC | LCSW |

Albany is the most common county (68 of the 337). Online formation services often name Albany as the county, so the county field says little about where the clinician practices. The letter asks for the county instead of guessing it.

---

## 2. The address on file is often a home address (consideration for Sid)

The open data gives one address: the DOS **process address**, where the state mails legal papers. For 286 of the 338 not-ours rows the process name is the PLLC itself ("The PLLC" or its own name), so it is the clinician's own address [M]. Of the 298 mailable rows, 242 are a plain street address (often a house), 29 have an apartment or unit, 22 a suite or floor (likely an office) and 6 a PO box [M, by address pattern].

So most of these letters would go to a clinician's home, addressed to a business that is a few weeks old. Things for Sid to weigh:

- **It's public and lawful to use,** and it's the same record every formation and compliance mailer works from. It still reads as a cold letter that found your home through a state database. Some clinicians chose the PLLC as process recipient because they couldn't afford a separate address, and some care a lot about home privacy (ground rule 6 in the [credentialing manual](../../../PLLC-CRM/crm/docs/credentialing/README.md) exists because several of our clients do).
- **The draft below handles it by** addressing the envelope and the letter to the PLLC, not the person; saying plainly where we saw the filing; and never mentioning the address or the person's name in the body.
- **A related upsell to leave out of this letter:** our virtual address takes a home address off the DOS record. Putting it in a letter that arrived at their home is a second offer and could feel like pointing at a problem we used. One offer only, per the brief.
- **Look-alike risk:** NY clinicians get official-looking "compliance" and "certificate" mailers after filing. Plain letterhead, a real signature, a first-class stamp or meter strip, and no "important notice" or form-style layout keep this from being mistaken for one.
- **Agent and law-firm addresses** (39) are excluded rather than mailed "c/o".

---

## 3. The letter

One page, from Sid, on plain NY PLLC letterhead. Written to the rules in [AI-TELLS.md](../../../credentialing-site/AI-TELLS.md) and [HUMANIZER-PASS.md](../../../credentialing-site/HUMANIZER-PASS.md): no em dashes, no bold, no rhetorical questions, no "why choose us", first person. Prices are the live [nypllc.com credentialing page](https://www.nypllc.com/ny-pllc-insurance-credentialing) as checked Nov 18 2026; the Headway lines stay inside what that page says. Merge fields: `{PLLC name}` (title case), `{month}` (filing month), `{profession plural}` (from the pattern: "LCSWs", "mental health counselors", "psychologists", "psychiatric NPs", "marriage and family therapists", "creative arts therapists", else "therapists").

> **Letterhead:** NY PLLC · 1 Blue Hill Plaza, Suite 1509-24, Pearl River, NY 10965 · (646) 444-2102 · contact@nypllc.com · nypllc.com
>
> {Date}
>
> {PLLC name}
> {Address}
>
> Hello,
>
> I saw in the NY Department of State's records that {PLLC name} was filed in {month}. Congratulations on starting your practice. My name is Sid, and I run NY PLLC, a small company in Pearl River that forms PLLCs for clinicians. I'm writing about one thing we do that a new practice often needs next: getting the PLLC in network with insurance companies.
>
> To bill insurers under the PLLC, the practice needs its own NPI, a CAQH profile that lists it, and an application to each insurer. After that, someone has to keep following up until each insurer decides. We do all of it and follow up with every insurer every two weeks. Your part is mostly signing, and we never ask for your passwords. We use the delegate access the portals offer, or we file on paper.
>
> Our prices are flat and published:
>
> - In network with three commercial insurers: $1,795, and $350 for each insurer after that
> - Already in network under your own name: moving those contracts to the PLLC is $249 plus $149 per insurer
> - NY Medicaid ($495) and Medicare ($395), if you want them
>
> We also offer payment plans. Before I send you an invoice, I check what we know about which of your insurers are taking new {profession plural} where you practice, and I won't sell you one we know is closed. If an insurer turns you down, you get that insurer's share back or moved to another insurer.
>
> If you see clients through Headway, you may know it now deducts $9.99 from your payout for every session with a client it sends you, and that it has been rolling the fee out state by state. Contracts you hold yourself under your PLLC don't carry a platform fee, and they stay yours if you leave. If you're happy on a platform, you may not need us at all.
>
> Prices and details are at nypllc.com/insurance. If you'd like to go ahead, email me at contact@nypllc.com with the county where you see clients (or say you're telehealth only) and the insurers you have in mind.
>
> Sid Brodsky
> NY PLLC

About 370 words, so it fits one page at 11 pt with the letterhead.

Notes on the copy:

- **One offer.** Medicaid and Medicare sit inside the price list because prescribers (68 psychiatric NPs, 14 psychiatry) care about them most; Foundation ($399) and upkeep are left for replies.
- **Headway:** the page says "rolling it out state by state through late 2026" and that dates have moved. By January "through late 2026" is in the past, so the letter says "has been rolling the fee out state by state" with no date. Re-read the page the week of printing and match it.
- **Refund line** is the offer line Sid approved Nov 18 and follows the Nov 14 billing rule and the terms draft: the client chooses a credit to another open insurer or a refund of that insurer's share, paid within 5 business days of their choice; setup isn't refunded, and a decline caused by the client's own file gets one free resubmission instead. "That insurer's share" covers both the $350 and the $149 lines.
- **"I check what we know"** is the same hedge the existing-customer email uses: apply-first insurers (UHC/Optum BH, Carelon BH, Evernorth BH, Excellus) have no written pre-check.
- **Phone** is in the letterhead only. The body asks for an email, which is where the close-out flow and the panel check run.
- **"Your part is mostly signing"**, not "you only sign": clients also attest CAQH and, for Medicaid, submit and get one form notarized (standalone shard, "honest promise").
- **Brand:** this goes out as NY PLLC, because the standalone credentialing brand, phone and domain aren't decided. The re-cut's correction 4 makes this letter the first test of outside demand, before any separate brand.

---

## 4. Tracking

- **Printed URL: `nypllc.com/insurance`**, a new redirect to `https://www.nypllc.com/ny-pllc-insurance-credentialing?utm_source=dos-letter&utm_medium=mail&utm_campaign=bh-pllc-2027-01`. It doesn't exist yet (no such route or redirect in `web/`, checked Nov 18). It's a one-line `next.config` redirect, a site change after the Dec 1 freeze, and needs Sid's go. Change the campaign value for each later monthly drop (`bh-pllc-2027-02`, ...). If Sid doesn't want a new route, print the full page URL and rely on the match below.
- **Main attribution: match replies to the mailed list by PLLC name or DOS ID.** Every reply names the PLLC, and the mailed list has the DOS ID, so a letter-driven inquiry is recognizable whether or not the person typed the URL. Keep the printed list (outside the repo) with the mail date.
- **On a reply:** the normal close-out row answers it, with the panel-status lookup. Add a CRM note on the lead with source "DOS letter, {mail date}". For non-customers that needs a lead record without a PLLC; `CredentialingEngagement.pllcId` is required today (standalone shard), so creating the first outside engagement needs that fixed or a placeholder PLLC record. That's a CRM build item for Sid to approve, not done here.
- **Read at 60 days after each drop:** letters mailed, replies, paid jobs, and dollars, by drop.

---

## 5. Cost per 1,000 letters

Cash costs only (labor isn't a cost; log Sid's minutes instead).

| Route | Per letter | Per 1,000 | Source |
|---|---:|---:|---|
| Print and mail service, Lob Developer plan (no monthly fee), B&W letter, First Class, print + envelope + postage | $1.066 | **$1,066** | [C] [Lob pricing details](https://help.lob.com/print-and-mail/ready-to-get-started/pricing-details), rates effective Nov 1 2026, checked Nov 18 |
| Same, Standard (marketing) class: slower, no forwarding | $0.834 | $834 | Same |
| Print in the office, Forever stamp | $0.82 postage + about $0.08 paper, envelope, toner [E] | **about $900** | [C] [USPS Forever stamp 82¢ since Jul 12 2026](https://www.freightwaves.com/news/price-of-forever-stamp-reaches-82-cents) |
| Print in the office, metered | $0.78 + about $0.08 [E] | about $860 | Same source: metered 1-oz letters $0.78 |

Recommendation: the in-office route at about $900 per 1,000 if the mail station can absorb roughly 110 letters a month (log the minutes); Lob at about $1,070 if not. First Class either way, so bad addresses come back.

**Scale:** about 105–110 mailable letters a month means 1,000 letters is about nine months of new filings. A first January drop that back-fills Sep–Dec filings would be about 400–450 letters (about $400 in office, about $480 by Lob) [E].

**Break-even:** one Get in network job ($1,795) pays for about 1,700–2,000 letters; one Move my contracts job with two insurers ($547) pays for about 500–600.

---

## 6. Pass number

From the re-cut §6 [A]: **4 paid credentialing jobs per 1,000 letters within 60 days of mailing.** Pro-rated, a 450-letter first drop passes at **2 paid jobs within 60 days** of its mail date. Pass means monthly drops continue and the next step in re-cut §6 opens (letters to the roughly 14,600 existing behavioral-health practices). Below it, stop after the first drop and record why (reply mix: Headway-only, cash pay, already in network).

Capacity check: 2–4 extra jobs in a month sits inside the existing-customer campaign's pacing rule (hold sends at 5 or more jobs started in a month). If both run in January, the letter drop waits on that rule too.

---

## 7. Decisions for Sid (January)

1. **Send at all, yes or no** (re-cut question 3).
2. **Home addresses** (§2): mail to the DOS process address as drafted, or only to rows that look like offices (22 with a suite or floor), which makes the test too small to read.
3. **Back-fill:** first drop covers Sep–Dec filings (about 400–450), or only December's (about 110).
4. **Route:** office printing with stamps (about $900 per 1,000) or Lob (about $1,070).
5. **Tracking URL:** approve the `/insurance` redirect on nypllc.com, or print the full page URL.
6. **Copy:** approve or edit the letter, including the Headway paragraph after a fresh read of the live page.
7. **Holds:** keep behavior analysts (19) and Rockland no-match filings (13) out.
8. **Outside-client record:** approve the CRM change that lets a credentialing engagement exist without one of our PLLCs, before the first letter reply turns into a sale.

## Sid's decisions (Nov 18)

1. It goes. First drop in early January 2027.
2. Mail to the DOS process address as drafted.
3. The first drop back-fills Sep-Dec filings (~450 letters). Pass: 2 paid jobs within 60 days.
4. Lob, First Class, for the first drop. Revisit the route for monthly drops.
5. Build the `nypllc.com/insurance` redirect after the Dec 1 freeze; deploy only on Sid's go.
6. NY practices that are also on the NPI postcard list get the letter only.

Still open: Sid approves the letter text before anything prints.
