# Compliance notes for the mail piece (Nov 18 2026)

Draft checklist for Sid, not legal advice. The service terms are still a draft and are marked for counsel ([terms draft](../credentialing-service-terms-draft-2026-11-16.md), "Needs counsel before publishing"). Have counsel read this piece together with the terms before anything prints.

## 1. What the piece must carry

| Requirement | Why | Where it is in the draft |
|---|---|---|
| A real return address with ZIP Code, upper left of the address side | USPS DMM 602 §1.5.3 requires a return address on "matter bearing a company permit imprint" (the usual way print-and-mail vendors pay postage) and §1.5.2 requires the ZIP Code in it. Source: https://pe.usps.com/text/DMM300/602.htm (checked Nov 18 2026). It must be a domestic address. | `[Brand], [Business address]` placeholder. Nothing prints until Sid sets it. |
| The sender's real business name | Honest identification; the federal-government rules below turn on whether a reader could mistake the sender. | `[Brand]` placeholder, on both sides. |
| The federal-government disclaimer, in contrasting type on the face | 39 U.S.C. §3001(h): a solicitation that could reasonably be read as implying a federal connection must say "THIS PRODUCT OR SERVICE HAS NOT BEEN APPROVED OR ENDORSED BY THE FEDERAL GOVERNMENT, AND THIS OFFER IS NOT BEING MADE BY AN AGENCY OF THE FEDERAL GOVERNMENT" in conspicuous, contrasting type; an envelope must also say "THIS IS NOT A GOVERNMENT DOCUMENT". Source: https://www.law.cornell.edu/uscode/text/39/3001 | Included in the small print of both versions. The piece mentions NPIs, Medicare and CMS, so I recommend printing it even though the design avoids any official look. For the letter, add "THIS IS NOT A GOVERNMENT DOCUMENT" to the envelope if counsel thinks §3001(h) applies. |
| A notice that the federal items are free | 39 U.S.C. §3001(j): a solicitation for a product or service available free from the federal government must say so clearly and conspicuously. NPIs (NPPES) and Medicare enrollment for individual practitioners have no federal fee (path plan §4 notes the Medicare application fee applies to institutional providers, not individual practitioners or their groups). | Small print: "NPIs, CAQH profiles and Medicare enrollment are free, and you can apply for them yourself; you pay us for doing the paperwork and the follow-up." |
| A no-affiliation line | The piece names Medicare, Medicaid, CAQH and state programs. The site's footer already says insurers and programs are named for reference only. | Small print: "isn't affiliated with CMS, Medicare, Medicaid, CAQH or any insurer". |

## 2. What the piece must not do

- **Look like a bill or invoice.** 39 U.S.C. §3001(d) requires a specific "not a bill" disclaimer on any solicitation that reasonably could be taken for one. The draft avoids the trigger: no "amount due", no due date, no account or invoice number, no remittance stub. The postcard code is labeled "Postcard code" so it doesn't read as an account number.
- **Look like a government or insurer notice.** No seals, eagles, flags, agency-style headers, "Official", "Notice", "Action required", "Final", "Time-sensitive", or wording like "your NPI requires" or "update required". No insurer, CMS or CAQH logos (names only, plain text, as on the site). This matters more than usual: Medicare contractors have warned providers about fraudulent letters made to look official (for example Noridian: https://med.noridianmedicare.com/web/jea/article-detail/-/view/10521/alert-fraudulent-correspondence-targeting-medicare-providers), and new NPI holders are the audience those letters target.
- **Create false urgency.** No deadlines, countdowns or "limited spots". The test offer has no expiry.
- **Use a price the site doesn't publish.** No mail-only discount. Every price printed must match `credentialing-site/src/lib/pricing.ts` and the CRM price list on the day of printing.
- **Print the recipient's NPI number or anything that hints at private data.** Use only the organization name, the authorized official's name and the mailing address from the public NPPES record.

## 3. Every promise on the piece, matched to its source

Credentialing promises must match the draft terms. Insurer outcomes and timelines are never promised.

| Printed claim | Source | Status |
|---|---|---|
| "We submit your NPI and CAQH work within 5 business days of a complete intake, and each insurer application within 5 business days of your CAQH attestation." | Terms draft, "Our timeline" (Sid's answer to Q2, Nov 18); site commitments | Matches. |
| "If an insurer turns you down, you get that insurer's share back or moved to another insurer." (offer line, approved by Sid Nov 18) | Terms draft, "If an insurer declines after you've paid" (credit or refund); ops-manual ground rule 10 (Nov 14); site FAQ | Matches. The terms add two limits the card leaves to the site: setup work isn't refunded, and a client-caused decline gets one free resubmission instead of a credit or refund. Replaces the retired "only pay once it has said yes in writing" line. |
| "We never sell you an insurer we already know is closed to new providers like you in your county." | Terms draft, "We check insurers before you buy" | Matches. |
| "If an insurer turns you down, its share is $350 for a commercial insurer, $495 for Medicaid or $395 for Medicare. If you pick a refund, we pay it within 5 business days." | Terms draft, Sid's answers Q3 and Q5 (Nov 18) | Matches. |
| "We never need your passwords." | Terms draft, "We never ask for your passwords"; site FAQ | Matches. |
| Flat prices: $1,795 (+$350 per insurer past 3), $2,995, "We also offer payment plans." | `pricing.ts`; CRM price list; site FAQ ("We also offer payment plans") | Matches. Sid to confirm payment plans are offered for credentialing, not only formation. The $2,995 package includes state Medicaid, which `pricing.ts` flags as the NY effort applied to all states. |
| "Each insurer decides whether to accept you and when your contract starts. We can't promise either one." | Terms draft, "Insurers decide"; site commitments | Required honesty line. Keep it on every version. |
| "I read every intake myself and write back with what's involved and a price." | Site hero caption and intake page | True only while Sid does it. Sid to confirm before print. |
| "The intake takes about five minutes, and sending it doesn't charge you anything." | Site intake page and home "Your part" list | Matches. |
| State lines (§3.3 of README) | Each state guide's first paragraph, which has its own source list | Re-copy if a guide changes. |
| Not printed: "about 45 minutes" of client time | Terms draft, "Your time" | Left off: no client minutes logged yet. |
| Not printed: insurer timelines (the site's "commonly 60 to 180 days") | Site FAQ | Left off on purpose; the brief says no insurer timelines on the mail. |

## 4. List and handling

- **Source and exclusions.** Use only the public NPPES record (organization name, authorized official, mailing address). Exclude existing clients and anyone formed with us who already has a credentialing case (checklist). Mail to the NPPES mailing address, not the practice location.
- **NPPES data use.** I could not confirm today whether CMS places any condition on using NPI Registry data for marketing mail (web search hit its limit on this pass). Check the NPPES data dissemination notice before the pull.
- **Opt-outs.** Keep a do-not-mail list and honor any request to stop, by phone or email, before batch 2. Add batch-1 returns (undeliverable) to it.
- **Keep the mailed list** (NPI, state, batch, date) for the match-back in README §5.3, and keep it with the CRM's other lead data, not in a vendor account only.
- **Calls and replies.** Callers asking for a password or SSN get the same answer as the terms: we don't take them by phone or email.

## 5. Open items for counsel (carried from the terms draft, plus mail-specific)

- Whether §3001(h) and (j) apply and whether the draft's small print satisfies them as worded and placed.
- Whether any test state (NY, NJ, FL, TX, MD) licenses or regulates credentialing services or requires extra disclosures on solicitations to licensed professionals.
- Whether the credit-or-refund line ("you get that insurer's share back or moved to another insurer") reads as a guarantee under state consumer-protection rules, and the general FTC Act §5 standard that every claim be truthful and backed up.
