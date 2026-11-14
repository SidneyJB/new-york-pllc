# Domestic NY PC: case checklist and completion definition (draft)

Built for the PC, not adapted from the PLLC publication workflow. There is no publication, no Rockland county default, no Form 1583 / virtual-mail step unless sold separately, and no cert-pub tail. Use this as a manual checklist in the case's CRM notes until the `ny-pc` workflow is fixed (see [official-steps-and-fees.md](official-steps-and-fees.md) "build gaps").

Roles: **Case owner = Sid (Ops)**. **Packet reviewer = a second check before each mailing or filing.** Sid is the only staff, so the second check is the CRM doc-check plus this checklist signed off in a note. Counsel reviews only the corporate-record templates (once) and any case routed out under [pilot-scope.md](pilot-scope.md). Sid can decide to have counsel review the first live packet too (see README decisions).

## 0. Qualify and quote

- [ ] Profession and ownership fit [pilot-scope.md](pilot-scope.md); anything else is routed to counsel and written in a note.
- [ ] Customer confirms in writing that the PC choice is theirs (and their adviser's if they have one). We sent the entity-choice disclosure.
- [ ] Written quote sent (template in [quote-invoice-and-partner-ask.md](quote-invoice-and-partner-ask.md)): scope, total, government fees included, documents the customer must sign, timeline ranges.
- [ ] Paid in full (hosted invoice), and the CRM record carries entityType **PC** on both the entity and the order.

## 1. Intake

- [ ] Each owner: full legal name, residence address, NY license number and date checked on the NYSED verification search, specialty certification if it appears in the name.
- [ ] Office address and **actual county** of the office (not Rockland). Process address. RA = us, year one.
- [ ] Proposed names (3), ending "P.C." with periods. DOS availability checked.
- [ ] Shares: number (default 200 no-par), split among owners. Officers and directors named.
- [ ] Fiscal year (default calendar) and whether the customer wants the S-corp add-on.

## 2. NYSED consent

- [ ] Proposed Certificate of Incorporation (BCL §1503 / §402 content: name, professional purpose limited to the one profession, county, shares, DOS process address, RA, original shareholders/directors/officers with residence addresses). **Not** the PLLC Articles.
- [ ] Licensee affidavit (PPE form, PC box checked), signed by every owner.
- [ ] License and certification copies; contact sheet; name explanation if needed.
- [ ] Check **$90** to "New York State Education Department". Not $10 x owners.
- [ ] Reviewer pass: names on the certificate match the NYSED license names; the profession wording matches the license; the check amount is right. Log a note "PC packet reviewed".
- [ ] Mailed; tracking saved. Status checks go through the NYSED Professional Corporations contact-us form.
- [ ] Deficiency loop if one arrives; consent / Certificate of Authority received and saved.

## 3. DOS filing

- [ ] Certificate of Incorporation plus NYSED consent filed with DOS, **by hand** (the auto-filing worker files professional LLCs only). $125, plus $25 for 24-hour handling unless Sid waives it. Request the **$10 certified copy** with the filing.
- [ ] Filing receipt, DOS ID and certified copy saved to Documents. Filing date recorded (this starts the 30-day clock).

## 4. Within 30 days of the DOS filing (BCL §1503(c))

- [ ] Certified copy filed with NYSED with the **$20** fee. Date sent recorded in `certCopySentToNysedAt`. Case A missed this by 22 days; set a CRM task due DOS date + 21 days.
- [ ] NYSED acknowledgment saved. The entity appears on the NYSED verification search; record the date checked.

## 5. EIN and corporate records

- [ ] SS-4 as a corporation, signed; EIN letter saved.
- [ ] Bylaws, organizational consent of incorporator / directors / shareholders, share issuance to licensees only, stock certificate(s) with the Article 15 transfer legend, stock ledger. All from counsel-reviewed templates. Signed copies saved.
- [ ] S-corp add-on if bought: 2553 + CT-6 per the existing playbook, with fax proof (see the S-corp audit fixes).

## 6. Delivery and close

- [ ] PC completion email (its own template; the PLLC FAQ PDF does not fit): filed certificate, NYSED consent, NYSED certified-copy acknowledgment, EIN letter, signed corporate records, and the compliance calendar: biennial statement $9 (DOS), triennial statement to NYSED, 30-day amendment rule, shares only to licensees.
- [ ] Measured for P3-05: minutes per stage, rework, customer questions (message count), days per stage.
- [ ] Ask the customer or partner whether this met the need.

## Completion definition

A pilot PC case is **complete** only when all of the following are saved in the CRM:

1. NYSED consent;
2. DOS filing receipt and certified copy (entity active on DOS);
3. NYSED acknowledgment of the certified copy (or, if NYSED is slow, proof the copy and $20 reached NYSED within 30 days plus the queue reply), and the entity found on the NYSED verification search when it appears;
4. EIN letter;
5. Signed bylaws, organizational consent, stock certificate(s) and ledger;
6. The delivery email with the compliance calendar sent;
7. The S-corp proof of submission, when bought.

Stopping at the DOS acceptance is **not** complete (P3-05: "do not stop at the first state acceptance").
