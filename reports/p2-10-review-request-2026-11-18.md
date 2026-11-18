# P2-10: honest-review request workflow (Nov 18 2026)

Checklist item: P2-10 "Run the honest-review request workflow at the chosen milestone. Verify that it reaches real customers once and respects communication preferences." Due Nov 13. Related: P1-08 "Prepare a review request tied to a genuine successful milestone" (also open) and integrated plan F3.

**Bottom line:** there is no review-request workflow. There is no template, no milestone send, no dedupe and no opt-out flag. Asks happen only when a client replies "thank you" to the formation-complete email and the close-out lint makes the reply include a Google link. That has produced 28 asks to about 25 people in 12 months, against 335 formation-complete emails since February (about 7%). One person got asked twice, two of the asks went to partner contacts, and one went out in the same email as a refund. Nothing is sent automatically. The item cannot be closed until Sid picks the milestone and approves the text below.

All counts come from read-only queries (`BEGIN READ ONLY`, rolled back) against the production CRM DB. The `OutboundEmail` table holds every synced send from contact@nypllc.com since Oct 23 2025 (10,232 rows). Scripts: `/private/tmp/claude-501/-Users-sidb-dev-pllc-business/b15a47c6-cb50-464c-b368-0274e2a459e1/scratchpad/review-ro*.cjs`. No code, DB rows or email were touched.

## 1. What exists

| Piece | Where | What it does |
|---|---|---|
| Lint `formation_complete_thanks_missing_review_ask` | `PLLC-CRM/crm/lib/ops-closeout/formation-complete-review-ask-lint.ts` | In a close-out batch, if the inbound mail is a plain thank-you on a formation-complete thread ("100% complete" / "successfully formed", no question, no payment/publication words), the row must have a reply containing the Google link. Otherwise lint fails. |
| Reply text `formation-complete-thanks` | `PLLC-CRM/crm/lib/ops-closeout-draft/build-client-reply-draft.ts` (~line 93) | "You're very welcome! No pressure at all, but it would mean a great deal if you could leave us a review here: Google Reviews" + link. |
| Link constant `NYPLLC_GOOGLE_REVIEWS_URL` | same lint file | The Maps place page. It is the same URL as the site's `BUSINESS_INFO.googleBusinessProfileUrl` (`new-york-pllc/web/src/lib/constants/index.ts`; site shows 5.0 / 16 reviews). It opens the listing, not the "write a review" box, so it takes an extra tap. Older manual asks used `g.page/r/CUcOH_eHLbWTE…/review`, which opens the review box directly. |
| Formation-complete email | `PLLC-CRM/crm/lib/email-templates/pllc-formed-with-faq.ts` (subject "Congratulations! Your PLLC Has Been Successfully Formed") | **No review ask.** It goes out at the DOS-filed milestone with the certified Articles, EIN letter and OA, and already ends with the insurance-credentialing question. |
| Cert of Publication receipt email | `PLLC-CRM/crm/lib/email-templates/cert-pub-and-receipt.ts` (sent via `template-send … cert-pub`) | **No review ask.** This is the last email of the service ("your publication requirement has been completed"). |
| Opt-out / preference fields | `prisma/schema.prisma` | Only `Customer.preferredContact` (EMAIL 584, SMS 1). No email opt-out, no do-not-contact, no `reviewRequestedAt`. |

**Correction to F3 in the integrated plan:** F3 step 1 says the ask "sits in the formation-complete thanks, which comes months later after publication." In fact the formation-complete email *is* the DOS-filed email ("you can start using the PLLC right away"). Publication comes after it, and the final email is the Cert of Publication receipt. So today's reactive ask already lands at the DOS milestone, but only for clients who reply to say thanks.

## 2. What has been sent

Matched outbound mail containing the Google link / "leave us a review" / "google review", Oct 2025 to Nov 18 2026: 30 messages.

- **2 were not asks:** reviews shared as proof with prospects (Robert Newborn Aug 3, Stephanie Simon Aug 27). That's fine.
- **28 review asks to ~25 people.** All were hand-written or close-out replies. Most went on "Re: Congratulations! Your PLLC Has Been Successfully Formed" threads (20), a few on Cert of Publication receipt threads (3: Ebony Strachan Aug 5, Avi Ramprashad Sep 21, Shakiva Pierre Oct 11), and the rest on other threads. The most recent was Nina Jaroslaw on Nov 15.
- Volume: 335 distinct formation-complete recipients since Feb 2026; 19 of them were ever asked (15 after that email).
- Reviews gained: the site count went from 6 (integrated plan) to 16 (Sid, Oct 30). The CRM can't tie reviews to asks.

## 3. Problems found in the asks so far

1. **No dedupe.** The lint fires on every warm thank-you, whether or not that person was asked before. Ebony Strachan (High Water) was asked on Apr 29 and again on Aug 5. Emily Dickinson's second match (Mar 19) is just the quoted earlier ask, not a second ask.
2. **Partner contacts got asks.** Rocco Romeo (Neurohaven; `b2b_partners` REFERRAL contact) was asked on Mar 6 on his own PLLC, and again on Nov 6 on the thread for Gerald Frazier's PPE affidavit, a client he is handling. Ebony Strachan is our only WHITE_LABEL partner. Asking a partner once for his own experience is fine. Asking again on a client's thread mixes the partner relationship with the client's file.
3. **An ask in the same email as a refund.** Carl Frankel, Nov 26 2025: "Your $200 refund has already been initiated … You can leave a Google review for us here." Google's policy bans incentivized reviews, and putting a refund next to the ask reads like a trade. Never pair the two.
4. **Asks before the service was finished.** Rocco's Nov 6 ask came while that file was still at NYSED. The reactive lint only fires after formation-complete, but manual asks have no guard.
5. **Intermediaries.** Only 2 PLLCs in the formation/publication stages have an `enterpriseCustomerId` (CPA/law-firm orders). None of them has been asked yet. On those orders every email goes to the intermediary (memory: intermediary is the contact), so an ask at the client's milestone would reach the CPA/lawyer and not the owner. Recommend skipping them, or asking the intermediary once for their own experience if Sid wants that. 11 customers have 2+ PLLCs; ask them once per person, not once per entity.
6. **No opt-out record.** There is no field to honor "don't email me". The only signal is `preferredContact = SMS` (1 customer).

## 4. Proposed minimal workflow

**Milestone (Sid to choose):**
- **A, recommended: the Cert of Publication receipt email.** The service is finished, nothing is pending, and the email is short and has no other ask in it. Volume: 11–43 a month (211 since January).
- **B, F3 as written: the formation-complete (DOS-filed) email.** This is the moment of most relief, with higher volume (28–57 a month). But publication is still open and the email already ends with the insurance question, so two asks would compete.
- Either way, keep the existing reactive ask on thank-you replies. It needs the dedupe below.

**Who gets it:** one send per person, ever (match `Customer.email` + `alternateEmails`). Skip anyone who:
- was already asked (any outbound mail to them containing the Google link or `g.page/r/`);
- has a PLLC with `enterpriseCustomerId` set (intermediary order), or is a `b2b_partners.contactEmail`, or bought through a WHITE_LABEL partner order;
- has status `CANCELLED_AND_REFUNDED`, `formationRefundedCents > 0`, or a Stripe dispute;
- has an open CRM task, held close-out row or unresolved complaint;
- has `preferredContact = SMS`, or a CRM note saying not to email them.

REFERRAL-partner clients are our own customers under the referral terms ($25 off / $75 fee; we deal with the client directly), so they're eligible.

**Follow-up:** none. One ask, no reminder. F3 suggested a reminder after 7 days "if no review exists", but Google reviewer names often don't match client names, so we can't reliably check. Revisit this only if reviews stay under 3 a month at day 60.

**Text (option A, a paragraph added to the Cert of Publication receipt email; Sid's voice, ASCII only):**

> That was the last step, so [PLLC Name] is all set. If you have a minute, I'd really appreciate an honest Google review of how it went: [direct review link]. It helps other people figure out who to trust with this. And if anything about the process frustrated you, just reply and tell me. I read every one.

For option B, the same paragraph without the first sentence, placed before the insurance question.

The text promises nothing in return, doesn't ask for five stars, and invites complaints by reply. Use the direct `g.page/r/…/review` link from the GBP "Ask for reviews" button (Sid to confirm the current link), not the Maps place page.

**Logging:** the Gmail sync already saves each send in `OutboundEmail`. Also add a PLLC note, "Review request sent to {email} (Gmail {id})", the way the formation-package send already logs. That note and the link search are the dedupe source.

**Replies and opt-outs:** replies come into the close-out batch like any other mail.
- A complaint becomes a row for Sid, with no second ask.
- "Don't email me" or "unsubscribe" gets a CRM note "No marketing/review email", and the skip list honors it. Until a field exists, that note is the record.
- Sid replies to every new Google review within 48h (F3 step 4).

## 5. Code changes needed (described only; nothing edited in PLLC-CRM)

1. **`lib/email-templates/cert-pub-and-receipt.ts`** (option A): add the paragraph above with a `[Review Link]` placeholder filled from a shared constant `NYPLLC_GOOGLE_REVIEW_WRITE_URL`. Put that constant next to `NYPLLC_GOOGLE_REVIEWS_URL`.
2. **New `lib/review-request/review-request-eligibility.ts`:** `getReviewRequestEligibility(pllcId)` returns `{ eligible, reason }` using the skip list in §4 (an `OutboundEmail` search for either review URL across the customer's email + alternateEmails; enterprise, partner and white-label checks; refunds; preferredContact; a note containing "No marketing").
3. **`lib/template-send/build-filled-email.ts`** (cert-pub branch): call the eligibility check. When it isn't eligible, drop the review paragraph, send the receipt as usual, and print the reason. The receipt itself is never blocked.
4. **`lib/ops-closeout/formation-complete-review-ask-lint.ts`:** have `context` stamp `reviewAlreadyAsked` / `reviewIneligibleReason` on the row (from #2). The lint then *does not require* the ask when either is set, and a new lint `review_ask_ineligible` *fails* any draft that contains the review link for an ineligible or already-asked person. Also fail any draft that contains both the review link and refund/credit/discount wording.
5. **After sending:** add a PLLC note "Review request sent …" (same pattern as `send-formation-complete-email-for-pllc.ts`).
6. **Optional schema** (later, only if the note convention proves fragile): `Customer.reviewRequestedAt DateTime?` and `Customer.emailOptOut Boolean @default(false)`.

These touch `lib/template-send` and `lib/ops-closeout`, not `express/`. Still, check `ps` for the filing worker before any edit (memory: no worker code edits while it runs).

## 6. One-time backfill (optional, needs Sid's yes)

Cert of Publication receipts sent Sep 15 to Nov 18: 65 recipients. Excluded: 5 already asked, 1 intermediary, 3 partner contacts, 1 with no customer record, 1 SMS-preference. That leaves **about 54 candidates** before a manual check for open complaints. A one-time send of the option-A paragraph as its own short email, through close-out rows, one per person, would satisfy "reaches real customers once". Sid approves the text and the list first.

## 7. What Sid must approve

1. Milestone A (Cert of Publication receipt) or B (formation-complete / DOS).
2. The review text in §4, and the direct review link to use.
3. One ask with no follow-up (or a single reminder).
4. Whether intermediaries and partners are skipped (recommended) or asked once for their own experience.
5. The code changes in §5, to be built in a later session when the filing worker is idle.
6. Whether to run the ~54-person backfill.

The P2-10 and P1-08 checklist bullets stay unchecked until the first eligible sends go out and are confirmed once per person.

## 8. Sid's decisions (Nov 18)

1. **No automatic ask.** Milestones A and B are both declined. The ask stays where it is today: only when a customer thanks us and has evidently been very happy with the process.
2. **Skip list as proposed** applies to that ask: one ask per person ever, no reminder; skip intermediaries, partner contacts, white-label orders, refunds/disputes, open complaints, SMS-preference or opt-out customers; never alongside a refund or credit.
3. **No backfill.**
4. Text and direct review link: no preference given; current reply wording and link stay.

Build needed: §5 item 4 only (close-out context stamps `reviewAlreadyAsked` / `reviewIneligibleReason`; the lint stops requiring the ask for those rows and fails any draft that asks an ineligible or already-asked person, or pairs the link with refund/credit wording). Items 1-3 and 5 are dropped.
