# Credentialing direct mail: draft piece (Nov 18 2026)

Status: DRAFT for Sid. Nothing is ordered, no vendor account exists, nothing is sent. Sid approves the piece, the vendor and the cost (checklist item "Sid: approve the mail piece and the print/mail vendor and cost").

Sources read: [national test checklist](../../credentialing-national-test-checklist.md), [path to $350-500K](../credentialing-path-to-350-500k-net-2028.md) §5.2 and §8, [service terms draft](../credentialing-service-terms-draft-2026-11-16.md), [upkeep pricing](../credentialing-upkeep-pricing-2026-11-16.md), [decision log](../../decision-log.md) rows of 2026-11-16, [credentialing-site README](../../../credentialing-site/README.md), [pricing.ts](../../../credentialing-site/src/lib/pricing.ts), [site.ts](../../../credentialing-site/src/lib/site.ts), the five state guides in [content/states](../../../credentialing-site/content/states/), [AI-TELLS.md](../../../credentialing-site/AI-TELLS.md), [HUMANIZER-PASS.md](../../../credentialing-site/HUMANIZER-PASS.md), and the price list in [insurance-credentialing-expansion-plan-2026-11.md](../../../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md).

Other files in this folder: [vendors.md](vendors.md) (prices checked Nov 18 2026, recommendation, batch-1 cost) and [compliance.md](compliance.md) (what the piece must and must not say).

---

## 1. Recommendation: a 6x9 postcard, mailed First-Class

| | 6x9 postcard | Letter (8.5x11, #10 window envelope) |
|---|---|---|
| Cost per piece, recommended vendor, First-Class, ~1,700 pieces | $0.73 (Stannp Starter) | $1.19 (Stannp Starter, calculator) |
| Cost per piece, fallback vendor (Lob Developer, First-Class) | $1.030 | $1.066 B&W / $1.226 color |
| Batch 1 at ~1,700 pieces | ~$1,250 | ~$2,020 |
| Seen without opening | Yes | Only if opened |
| Room for the offer, four prices and the commitments | Yes, tight on the back | Plenty, plus a note from Sid |
| Looks less like a government notice | Yes: full color, photo, brand, message visible | A plain window envelope can read as an official notice, and Medicare contractors have warned providers about fraudulent letters (see [compliance.md](compliance.md)) |

Prices are from [vendors.md](vendors.md) (vendor pages, Nov 18 2026). The response columns are left out on purpose: I could not verify a format-specific response benchmark from a primary source in this pass (the ANA figures in the path plan are members-only and quoted via secondaries), so the choice rests on cost and what the piece has to carry.

Why the postcard:

1. Cost. At the same budget it reaches about 1.6 times as many practices as a letter. The test's job is to measure cost per paid client, and the path plan's median assumption is that 0.3% of practices mailed (over 2-3 touches) become a paid setup [estimate, path plan §5.2]. At ~1,700 practices that is about 5 paid clients across all five states, so every extra piece matters more than format polish.
2. The offer is short. It needs to say one thing (if an insurer turns you down, you get that insurer's share back or moved to another insurer), show the prices, and point to a state page. A 6x9 card holds that. The terms, refund detail and the "what you do / what we do" list already live on the site, which the card points to.
3. No A/B test in batch 1. With an expected ~5 paid clients, a postcard-vs-letter split could not show a difference. If batch 1 comes back weak, batch 2 can switch to the letter (alternate copy in §4).

Why 6x9 and not 4x6: at Stannp the 6x9 First-Class price ($0.73) is about the same as the 4x6 Marketing Mail price ($0.72), and the 4x6 has too little room for the prices plus the required disclaimers (see [compliance.md](compliance.md)).

Why First-Class and not Marketing Mail: batch 1 drops Dec 1-12. Marketing Mail takes 7-14 business days at Stannp and 7-21 at Lob, so many pieces would land in the last two weeks of December, when practices are closed or distracted. First-Class takes 3-7 business days (Stannp's stated window), and USPS forwards or returns undeliverable First-Class mail without an extra charge, while Marketing Mail is normally discarded unless it carries an endorsement. Returns help clean the list for batch 2; confirm with the vendor where returns go and whether it reports them. At Stannp the 6x9 First-Class price is lower than Lob's Marketing Mail price, so there is little saving to give up.

## 2. The one offer

**If an insurer turns you down, you get that insurer's share back or moved to another insurer.**

Sid approved this line on Nov 18. It is the same promise as the draft terms ("If an insurer declines after you've paid": credit to another open insurer or a refund of that insurer's share within 5 business days of the client's choice) and ops-manual ground rule 10 (package billed up front once the client confirms insurers; we never sell an insurer already known closed for that profession and county). It replaces the old check-first wording ("you only pay for an insurer once it has said yes in writing"), which no longer matches how we bill. It costs us nothing beyond the refunds the terms already promise, it answers the most common objection (closed panels), and it is not a discount, so it doesn't conflict with flat published prices. I recommend against the "founding-client discount" listed for Q1 in the path plan §10: a mail-only price would contradict "flat published prices" and the site's single price list.

Terms open question 1 is answered (Sid, Nov 18): the package is billed up front, so the old "pay only once it has said yes in writing" line and its fallback are retired. Two limits stay off the card and live in the terms: setup work (NPIs, CAQH, documents) isn't refunded, and a decline caused by the client's own file gets one free resubmission once fixed, not a credit or refund.

## 3. Copy for the 6x9 postcard

Rules applied: [AI-TELLS.md](../../../credentialing-site/AI-TELLS.md) (no em dashes, no rhetorical-question headlines, no "why choose us", no invented stats or testimonials, no triplets, bold only for prices) and the voice from [HUMANIZER-PASS.md](../../../credentialing-site/HUMANIZER-PASS.md). Every claim below already appears on the site or in the draft terms. Placeholders stay in square brackets: `[Brand]`, `[Phone]`, `[Business address]`, `[domain]`. Merge fields from the NPI list are in curly braces.

### 3.1 Front (address side is the back; this is the picture side)

> **[Brand]** · Insurance credentialing
>
> # We do the insurance paperwork, and you sign it.
>
> Insurance credentialing for therapists, counselors, social workers and psychiatric NPs in {State}
>
> For {Organization name}
>
> To get in network you need an NPI for your practice, a CAQH profile, an application to each insurer, and then months of calls to chase those applications. We take care of all of it for one flat price. Your part is the intake, your CAQH attestation and your signatures.
>
> If an insurer turns you down, you get that insurer's share back or moved to another insurer. We never sell you an insurer we already know is closed to new providers like you in your county.
>
> [Photo of Sid] Sid Brodsky, owner. I read every intake myself and write back with what's involved and a price.

Design notes: same look as the site (white, one blue #1b5e9b, Source Sans 3, real photo of Sid, no stock image, no icons, no gradient, no seal or anything that looks like an agency mark). No "URGENT", "ACTION REQUIRED", "NOTICE" or "FINAL" wording anywhere.

### 3.2 Back (message panel left, address panel right)

> **What it costs**
>
> Get in network: **$1,795**. Your NPI and CAQH work, applications to 3 commercial insurers, and a follow-up every two weeks until each one decides. Each insurer past 3 is $350.
>
> Prescriber package: **$2,995**. Applications to 4 commercial insurers, state Medicaid and Medicare, for psychiatric NPs and other prescribers.
>
> We also offer payment plans. Every price is on [domain]/pricing.
>
> **What we commit to**
>
> - We submit your NPI and CAQH work within 5 business days of a complete intake, and each insurer application within 5 business days of your CAQH attestation.
> - If an insurer turns you down, its share is $350 for a commercial insurer, $495 for Medicaid or $395 for Medicare. If you pick a refund, we pay it within 5 business days.
> - We never need your passwords.
> - Each insurer decides whether to accept you and when your contract starts. We can't promise either one.
>
> {State line, see §3.3}
>
> **Start at [domain]/{code}** or scan the code. The intake takes about five minutes, and sending it doesn't charge you anything.
>
> Questions? Call Sid at [Phone]. Postcard code {STATE}-1
>
> [QR code, about 0.9 in square]
>
> Small print (7-8 pt, contrasting): [Brand] is a private company and isn't affiliated with CMS, Medicare, Medicaid, CAQH or any insurer. NPIs, CAQH profiles and Medicare enrollment are free, and you can apply for them yourself; you pay us for doing the paperwork and the follow-up. THIS PRODUCT OR SERVICE HAS NOT BEEN APPROVED OR ENDORSED BY THE FEDERAL GOVERNMENT, AND THIS OFFER IS NOT BEING MADE BY AN AGENCY OF THE FEDERAL GOVERNMENT.

Address panel: return address `[Brand], [Business address]` (with ZIP) upper left; vendor's indicia; recipient block `{Authorized official first and last name}` / `{Organization name}` / `{NPPES mailing address}`. Leave the vendor's required clear zone empty.

Why "Your part is the intake, your CAQH attestation and your signatures" instead of the site's "about 45 minutes": the 45-minute figure is in the draft terms, but no client minutes are logged yet (expansion plan, Nov 16: "still 0 logged"). On a mailed solicitation I would only print it once the logs back it. Sid can put it back if he's comfortable with it as a stated estimate.

### 3.3 One state line per piece (from the sourced state guides)

| State | Line printed on the back | Guide it comes from |
|---|---|---|
| NY | In New York, Medicaid and the commercial insurers are separate tracks with their own portals, and we run both at once. | [new-york.md](../../../credentialing-site/content/states/new-york.md) |
| NJ | In New Jersey you enroll with NJ FamilyCare first, and only then credential with the managed care plans. | [new-jersey.md](../../../credentialing-site/content/states/new-jersey.md) |
| FL | In Florida you need a Florida Medicaid ID and a contract with each managed care plan you want to join. | [florida.md](../../../credentialing-site/content/states/florida.md) |
| TX | In Texas every Medicaid health plan uses the same credentialing verification organization, and the steps have to happen in order. | [texas.md](../../../credentialing-site/content/states/texas.md) |
| MD | In Maryland, therapists' Medicaid claims usually don't go through the HealthChoice managed care plans, so the steps are different. | [maryland.md](../../../credentialing-site/content/states/maryland.md) |

Each line restates the first paragraph of that state's guide, which carries its own source list. If a guide changes before printing, re-copy the line.

### 3.4 Retired: the panel-check line

The earlier offer ("You only pay for an insurer once it has said yes in writing") and its fallback are retired as of Nov 18. Sid answered terms open question 1: the package is billed up front once the client confirms insurers, and an insurer that closes or declines after payment is credited or refunded. Don't reuse the old line on any piece.

## 4. Short alternate: one-page letter (for batch 2 if the postcard underperforms)

Envelope: #10 window, return address `[Brand], [Business address]` upper left, a small blue `[Brand]` wordmark, no teaser text, nothing styled as official ("Important notice", "Time-sensitive", eagle, seal). Letter on `[Brand]` letterhead, signed by Sid.

> {Authorized official first name},
>
> I run [Brand], a small credentialing firm. We get therapists, counselors, social workers and psychiatric NPs in {State} in network with insurers under their own practice, and I'm writing because {Organization name} looks like a new practice.
>
> To get in network you need an NPI for your practice, a CAQH profile, an application to each insurer, and then months of calls to chase those applications. We take care of all of it for one flat price. Your part is the intake, your CAQH attestation and your signatures.
>
> If an insurer turns you down, you get that insurer's share back or moved to another insurer. That share is $350 for each commercial insurer ($495 for Medicaid, $395 for Medicare), and if you pick a refund, we pay it within 5 business days. We also never sell you an insurer we already know is closed to new providers like you in your county.
>
> Get in network is $1,795 for 3 commercial insurers ($350 for each one after that). The prescriber package is $2,995 and adds state Medicaid and Medicare. We also offer payment plans. We send in your NPI and CAQH work within 5 business days of a complete intake, and each insurer application within 5 business days of your CAQH attestation. Each insurer decides whether to accept you and when your contract starts, and we can't promise either one.
>
> {State line from §3.3}
>
> If you'd like to see which insurers make sense for you, the intake is at [domain]/{code} (or scan the code below). It takes about five minutes and sending it doesn't charge you anything. You can also call me at [Phone].
>
> Sid Brodsky, owner, [Brand]
>
> Small print: same as the postcard (§3.2), including the federal-government sentence.

## 5. Per-state tracking

Two signals per piece: a short typed URL (people type what's printed) and a QR code that carries full UTM parameters. Everything below uses `[domain]` until the brand and domain are picked.

### 5.1 Exact URLs

| State | Printed URL (typed) | Typed URL redirects to | QR code encodes | Postcard code |
|---|---|---|---|---|
| NY | `[domain]/ny` | `https://[domain]/new-york?utm_source=mail&utm_medium=print_url&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_ny` | `https://[domain]/new-york?utm_source=mail&utm_medium=qr&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_ny` | NY-1 |
| NJ | `[domain]/nj` | `https://[domain]/new-jersey?utm_source=mail&utm_medium=print_url&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_nj` | `https://[domain]/new-jersey?utm_source=mail&utm_medium=qr&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_nj` | NJ-1 |
| FL | `[domain]/fl` | `https://[domain]/florida?utm_source=mail&utm_medium=print_url&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_fl` | `https://[domain]/florida?utm_source=mail&utm_medium=qr&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_fl` | FL-1 |
| TX | `[domain]/tx` | `https://[domain]/texas?utm_source=mail&utm_medium=print_url&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_tx` | `https://[domain]/texas?utm_source=mail&utm_medium=qr&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_tx` | TX-1 |
| MD | `[domain]/md` | `https://[domain]/maryland?utm_source=mail&utm_medium=print_url&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_md` | `https://[domain]/maryland?utm_source=mail&utm_medium=qr&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_md` | MD-1 |

Batch 2 (Jan 5-16): same paths, `utm_campaign=cred_mail_2027_01`, and `utm_content` gets a touch suffix: `pc6x9_nj_t1` for the fresh 90-day list, `pc6x9_nj_t2` for the repeat to batch-1 non-responders. Postcard codes become NJ-2 (new list) and NJ-2R (repeat). If batch 2 switches to the letter, use `ltr_nj_t1` / `ltr_nj_t2`.

Why the QR goes straight to the state page instead of through `/nj`: it keeps working even if a redirect is misconfigured, and the UTM tells QR scans apart from typed visits.

### 5.2 What the site needs before the first piece prints (proposals only; I did not edit the site)

1. A live domain. The site is `noindex` and undeployed; the printed URL cannot change after printing.
2. Five temporary redirects (302, not 301, so they can be changed later), for example in `credentialing-site/next.config.ts`:
   ```ts
   async redirects() {
     const s = { ny: 'new-york', nj: 'new-jersey', fl: 'florida', tx: 'texas', md: 'maryland' }
     return Object.entries(s).map(([code, slug]) => ({
       source: `/${code}`,
       destination: `/${slug}?utm_source=mail&utm_medium=print_url&utm_campaign=cred_mail_2026_12&utm_content=pc6x9_${code}`,
       permanent: false,
     }))
   }
   ```
3. Analytics on the site (none is set up in the repo today), plus first-touch UTM capture: store the landing page's `utm_*` values in a first-party cookie or `localStorage` and send them with the intake, because visitors move from the state page to `/contact` and the query string is lost.
4. The intake form must actually submit (today it "submits nowhere yet", per the site README) and write the lead's source into the CRM, as the checklist's tracking step says.
5. An optional "Code on your postcard" field on the intake form, and the same question in the phone script, for people who call instead of visiting. The code is the only way to attribute a call to a state and batch with one shared phone number.

### 5.3 How each lead is attributed (in this order)

1. Intake with `utm_source=mail`: mail, state and batch from `utm_content` / `utm_campaign`.
2. Intake or call with a postcard code: mail, state and batch from the code.
3. Intake whose organization NPI or name matches the mailing list for that batch, with no other source: mail (match-back). Keep the mailed list with NPI, state and batch so this can be run at read-out.
4. Everything else: not mail.

## 6. What to print for each state

One campaign with variable data per recipient is the cheapest way to order (see the volume-tier caveat in [vendors.md](vendors.md)). If the vendor can't merge a per-recipient QR code, order five versions, one per state.

| Field | Per state or per recipient | NY | NJ | FL | TX | MD |
|---|---|---|---|---|---|---|
| {State} in subhead and offer | state | New York | New Jersey | Florida | Texas | Maryland |
| State line (§3.3) | state | NY line | NJ line | FL line | TX line | MD line |
| Printed URL | state | `[domain]/ny` | `[domain]/nj` | `[domain]/fl` | `[domain]/tx` | `[domain]/md` |
| QR target | state | §5.1 NY | §5.1 NJ | §5.1 FL | §5.1 TX | §5.1 MD |
| Postcard code | state and batch | NY-1 | NJ-1 | FL-1 | TX-1 | MD-1 |
| {Organization name}, {Authorized official}, mailing address | recipient | from the NPI pull | | | | |
| Everything else (prices, commitments, small print, return address, photo) | same on all | | | | | |

Counts per state come from the NPI pull, which hasn't run yet (checklist item "Agent: pull the mailing list"). Planning figure: about 6,900 new behavioral-health organization NPIs a year across the five states, so about 1,700 in a 90-day window [estimate from the path plan §8; actual count TBD from the pull, after excluding existing clients and anyone formed with us who already has a credentialing case].

## 7. Decisions for Sid

1. Format: 6x9 postcard, First-Class (recommended) or the letter.
2. Vendor and cost: Stannp Starter at about $1,250 for batch 1 (recommended, after two checks in [vendors.md](vendors.md)), or Lob Developer at about $1,750.
3. Batch-1 size: one touch to the whole 90-day list (~1,700, recommended), leaving ~$3,750 for batch 2 (fresh list plus a repeat touch). Or spend closer to $2,500 now with a second touch in mid-December, which would land in the holidays.
4. ~~Terms open question 1 (apply-first insurers)~~ Answered Nov 18: billed up front, credit or refund if an insurer turns you down. The §2 offer line is the approved one.
5. Brand, domain, phone and return address. Nothing can print with placeholders.
6. Whether to print "about 45 minutes" (left off; no logged minutes yet) and the prescriber price nationally (the $2,995 package includes state Medicaid, which pricing.ts notes is still the NY effort applied to every state).
7. Whether NY is mailed to the credentialing site's `/new-york` page or held back while NY credentialing still lives on nypllc.com (checklist note).
8. No founding-client or mail-only discount (recommended), so the mail matches the published price list.
