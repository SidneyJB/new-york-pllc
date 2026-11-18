# P2-06 pilot scope and requirements check (draft for Sid)

Nov 18 2026. Agent draft for the two open P2-06 bullets (included work / exclusions / documents / authorizations / activation / state records / responsibilities; and the mail-receiving and professional-entity requirements check). **Not approved. Nothing was sent, filed or changed.** Built within Sid's Nov 16 decisions ([decision log](../../decision-log.md) rows 61, 63, 64, 65). Where a source conflicts with a decision or a live page, it is flagged in §3, not changed.

Supersedes the fee and authorization parts of [scope.md](scope.md) (Nov 13, written before the free switch).

---

## 1. One-page scope (pilot, up to 10 migrations)

**Who:** an existing, active NY PLLC whose DOS service-of-process line shows the owner's home, with a real business-mail need. Not law firms, not partner-referred, not foreign entities, not PCs ([customer-definition.md](customer-definition.md)).

**Price (Sid, Nov 16):** switch is free, Certificate of Change included. Customer pays the **$50 first month** through the VM subscription. No setup fee, no pro-rated credit for prepaid RA. The RA subscription ends when VM starts. Postage at cost on the monthly invoice.

### Included (we do)

1. Fit check by reply (no invoice before a written yes).
2. Agreement acceptance link (nypllc.com/mail-forwarding-agreement).
3. Form 1583 prepared from the CRM generator (item 2 = our fixed address, 2b blank, 7c-7g left for the client's real business address), sent for signature; returned form and both IDs checked against each other.
4. One NY DOS **Certificate of Change** (DOS-1359-f) changing only the **address for service of process** to 1 Blue Hill Plaza, Suite 1509-24, Pearl River, NY 10965, with 24-hour expedite. Registered agent line is already Business Filing Solutions LLC on every PLLC we formed, so it is not touched. County of office is not changed. Filed **only after the 1583 and IDs are in** (Sid, Nov 16).
5. NYSED entity address letter prepared from the CRM generator for one member to sign; sent to the Professional Corporations Unit.
6. CRM: VM flag, forwarding address, VM subscription started, RA subscription cancelled in the same session, note tagged `P2-06 migration pilot`.
7. Filed copy of the DOS certificate saved and sent to the customer with their own update list (below).
8. First Friday forward and "your mail is on the way" email.

### Excluded (decline, or quote separately)

| Request | Handling |
|---|---|
| Name change, amendment, member change, county change for another reason | Quote separately (Certificate of Amendment; NYSED consent may apply) |
| Foreign PLLC, PC, law firm, non-professional LLC | Out of pilot |
| Overdue biennial statement, publication not done, not active with DOS | Fix first, quoted separately |
| IRS 8822-B, bank, NPPES, Medicare/Medicaid, CAQH, payer, DEA, insurance, individual NYSED registration updates | Customer does; we give the list |
| Closing their old mailbox, old agent, or USPS forwarding order | Customer does |
| Scanning, daily handling, pickup, rush beyond 24-hour expedite | Not offered |
| Use of our address as a clinical or practice location (see §2) | Not offered; stop at fit check |
| Drugs, medical samples, hazardous items, high package volume | Agreement 6.2 |

### Setup documents

| Document | From | Note |
|---|---|---|
| Agreement acceptance | Customer | Live agreement, Nov 6 2026 version |
| PS Form 1583, signed by a member with title, notarized (in person or live video) | Customer | DMM 508.1.8.3 |
| Two current IDs: one primary photo ID + one secondary; names and address must match the 1583 | Customer | DMM 508.1.8.3 |
| **Written authority for us to sign and file the Certificate of Change** | Customer signs | **Needed: the agreement has no such clause** (only 4.2 default filing). Proposed: one-paragraph authorization signed with the 1583. Wording for Sid/attorney. |
| Forwarding address, contact email | Customer | Intake |
| NYSED entity letter (entity name, PSC number, old address, new address, member signature, date) | We prepare, customer signs | NYSED guidance, §2.3 |
| Card on file for the VM subscription | Customer | Per-subscription card link |

### Activation steps (order matters)

1. Written yes after fit check.
2. Agreement accepted; card on file.
3. 1583 + IDs received and matched.
4. Start VM (billing start at least 24 h out, CRM rule; first $50 charged) and cancel RA, same session.
5. File the Certificate of Change (CRM CoC CLI with `--address-from explicit`; there is no "our address" option). Record filing date.
6. Check DOS record; save filed copy.
7. NYSED letter signed and emailed; record date.
8. Customer told filing is done, with their update list.
9. First forward; 30-day check-in.

### State-record changes

| Record | Change | Fee | Who |
|---|---|---|---|
| DOS service-of-process address | Certificate of Change, LLC Law 211-A(a) | $30 + $25 expedite, **paid by us** (Sid waived) | We file on written authority |
| DOS registered agent | None (already us) | — | — |
| NYSED entity address | Letter to opcorp@nysed.gov | None found | Customer signs, we send |
| Individual licensee address (8 NYCRR 59.8(e)) | Only if the licensee's own address changes; this migration does not require it | — | Customer |

### Customer does / we do

| Customer | Us |
|---|---|
| Accurate entity, owner, forwarding info | Fit check, all prep and filing |
| Sign + notarize 1583, two IDs | Check IDs match; keep the 1583 on file |
| Sign filing authority and NYSED letter (within 7 days) | File DOS certificate; send NYSED letter |
| Keep old mailbox/agent until DOS shows our address and senders are updated (we suggest 30 days) | Tell them when DOS shows our address |
| Update IRS, bank, payer, NPPES, CAQH, Medicare, DEA, board records as they choose, using a real practice address where a practice location is asked for | Give the list |
| Card on file; postage at cost | Weekly forwarding; legal/government mail same day in practice |

### When we quote separately

Any second DOS filing (amendment, name, member, county move not tied to this switch), reinstatement or biennial catch-up, a second entity (existing $25/month rule), foreign or PC entities, or a customer whose fit check finds a practice-location use. Cancellation later follows agreement 4.1 ($129 if we file the move-out).

---

## 2. Requirements check (primary sources)

### 2.1 USPS: mail received through an agent (CMRA)

Source: [USPS DMM 508.1.8](https://pe.usps.com/text/dmm300/508.htm) (fetched Nov 18 2026).

- **1.8.3:** each addressee files PS Form 1583 with one primary and one secondary ID, signed or confirmed before the CMRA owner, a CMRA employee, or a notary, in person or by real-time audio and video. The CMRA must deny if the application and IDs conflict.
- **1.8.3:** "The CMRA must enter the information provided on each PS Form 1583 and upload a clear and legible copy" of the IDs into the Customer Registration Database, keep at least a digital copy at the CMRA location, and certify quarterly (Jan 15, Apr 15, Jul 15, Oct 15).
- **1.8.3:** the delivery address must use "PMB" or "#"; "It is not permissible to combine the secondary address element" (suite) with the box number.
- **1.8.4:** on termination "neither the addressee nor the CMRA will file a change-of-address order", and the CMRA must remail for at least 6 months.

**What this limits:**
- We collect the 1583 before filing (Sid, Nov 16), which meets agreement 1.2 for pilot clients. But by Sid's rule the 1583 stays in our files and is never entered in the USPS CRD, and the CMRA question with Office Evolution is still open. **So we may say a 1583 is required and collected; we should not say the customer is "registered with USPS" or that the address is a USPS-registered CMRA box.**
- Suite 1509-24 (shown on the service sheet per Sid, Nov 16) is a suite-plus-number in the form 1.8.3 says not to combine with a PMB. Fine as long as no PMB is added to it; when PMB numbers come, the format must change and pilot clients may need to re-sign (cost on us).
- The agreement's 30-day post-termination hold (4.3) is shorter than the CMRA 6-month remail duty in 1.8.4, if Office Evolution or we are the CMRA. New finding, for the attorney list; not a pilot blocker.

### 2.2 NY DOS: Certificate of Change

Sources: [NY LLC Law § 211-A](https://www.nysenate.gov/legislation/laws/LLC/211-A); [DOS: Certificate of Change for Domestic LLCs](https://dos.ny.gov/certificate-change-domestic-limited-liability-companies-0) (both fetched Nov 18 2026).

- 211-A(a): a certificate of change may change the office location, the post office address to which the Secretary of State mails process, and make, revoke or change a registered agent designation. It must state the LLC name, the date the articles were filed, and each change.
- 211-A(b) (signing by the agent after 30 days' mailed notice) covers only an agent changing its own designated address. It does **not** fit a migration, so the filing is under (a), signed for the LLC. **We need the customer's written authority to sign and file** (see documents).
- DOS fee: **$30**; expedite $25 (24 h), $75 (same day), $150 (2 h); fees non-refundable. Our cost per pilot migration: $55, absorbed (Sid's waiver). Ten migrations = $550.
- The DOS page says nothing specific about professional service LLCs. Our customers are PLLCs (LLC Law Art. XII); the same 1359-f form is used by the CRM today.

### 2.3 NYSED Office of the Professions

- **Entity address:** NYSED guidance (via search; op.nysed.gov pages fail the TLS certificate check from here, so not fetched directly) says a professional practice entity changes its address by a letter on company letterhead with entity name and PSC number, old address, new address, signature of at least one member, and date, emailed to the Professional Corporations Unit at opcorp@nysed.gov. Source: [NYSED, miscellaneous information for professional practice entities](https://www.op.nysed.gov/corporate/disclaimer/miscellaneous-information-for-professional-practice-entities). This settles the Nov 13 open question: **email to opcorp@nysed.gov**, not the Contact Us form. No fee or deadline found.
- **Individual licensee:** [8 NYCRR 59.8(e)](https://www.law.cornell.edu/regulations/new-york/8-NYCRR-59.8): "Each professional practitioner shall notify the department in writing of any change of name or address ... not later than 30 days after such change." Subdivision (c) of the same section refers to "the exact address of each such office" where the licensee practices. **So a licensee should not report our address to NYSED as an office where they practice.**
- **No rule found** that bars a PLLC's DOS process address from being a mail-receiving address, for therapists (LCSW, LMHC, LMFT, psychology) or NPs. Not confirmed with NYSED or counsel.

### 2.4 NPI (NPPES) and Medicare records

- **NPPES:** the NPPES address help page says, for Type 2 (organization) NPIs, the practice location "must be a physical address, it cannot be a PO Box or a CMRA"; mailing addresses may be a PO box or CMRA. Source: [NPPES Help, Address page](https://nppes.cms.hhs.gov/webhelp/nppeshelp/ADDRESS%20PAGE.html) (quoted from search index; the page is script-rendered and did not load in fetch). Trade press reports a 2024 change letting home-only **individual** providers use a PO box or private mailbox as the Type 1 practice location ([DecisionHealth](https://pbn.decisionhealth.com/Articles/Detail.aspx?id=547642); [Texas Medical Association](https://www.texmed.org/TexasMedicineDetail.aspx?id=63793)); not confirmed on a CMS page.
- **Medicare (CMS-855I):** "Your practice location address cannot be a Post Office (P.O.) box, commercial mailbox, or a drop box." The correspondence address "cannot be the address of a billing agency, management services organization, or the supplier's representative." Source: [First Coast (Medicare contractor), completing the CMS-855I](https://medicare.fcso.com/enrollment/completing-medicare-enrollment-cms-855i-application). Whether our address counts as a "representative" address for correspondence is not settled; safest is that Medicare correspondence also goes to an address the practitioner controls.
- **Commercial insurers, NY Medicaid, CAQH:** not researched; nothing to cite.

---

## 3. What limits the promise, and conflicts to flag

1. **Practice location.** NPPES (Type 2) and Medicare bar a CMRA/commercial mailbox as a practice location, and 8 NYCRR 59.8 speaks of practice-office addresses. The pilot can only promise our address for the **DOS record and business mail**. Sid did **not** approve the sheet line "not a practice location" (Nov 16). **Conflict to flag, not changed:** the customer-facing sheet currently says nothing about this. Options for Sid: (a) keep it internal only (fit check + exclusion, as now); (b) a different client line such as "On NPI and Medicare forms, list the address where you see patients." Agent recommends (b) or at least (a) enforced at fit check.
2. **USPS registration.** 1583s are kept on file, not entered in the CRD, and the CMRA is unresolved. Do not promise USPS registration; pilot stays at 10 (Sid, Nov 16).
3. **Filing authority.** The agreement does not authorize us to sign a Certificate of Change on the customer's behalf except the 4.2 default. A signed authorization is needed for each pilot client. Wording needs Sid (and ideally the attorney).
4. **Suite format.** Suite 1509-24 stays (Sid, Nov 16). It must not later carry a PMB in the same line (DMM 1.8.3).
5. **Agreement vs DMM on post-termination mail** (30-day hold vs 6-month remail): attorney list, not a pilot blocker.
6. **Privacy.** Older DOS filings keep the home address; NYSED, IRS, NPPES keep their own. The first-touch note and sheet do not claim full privacy, consistent with Sid's Nov 16 removal of that line.
7. **Already sent (Nov 16)** first-touch note to 15 Tier 1 customers promises "We file the change with the state at no charge". Consistent with this scope.

## 4. Decisions for Sid

1. Filing authorization: approve a one-paragraph signed authorization collected with the 1583 (wording to draft), or another route.
2. Practice-location line on the client sheet: none (internal only) or a reworded line (§3 item 1).
3. NYSED channel: confirm email to opcorp@nysed.gov (per NYSED guidance) for the entity letter.

Nothing here changes the checklist, decision log or memory bank. Bullets 1 and 2 of P2-06 can be checked once Sid approves this scope.

## 5. Sid's decisions (Nov 18)

1. **Scope approved** as drafted, with the three answers below.
2. **Filing authority:** the client's written yes by email ("yes, file the change") is the authorization. No separate signed paragraph. Save the email to the PLLC before filing.
3. **Practice location:** client sheet gets the line "On NPI and Medicare forms, list the address where you see patients." (added to [service-sheet.md](service-sheet.md)). Fit check still declines anyone who wants our address as a practice location.
4. **NYSED:** same as every Certificate of Change today: client signs the `generate_nysed_address_change_letter` letter; we email it to opcorp@nysed.gov and log the date.
5. **Attorney list (not blocking):** USPS 6-month remail after termination vs our 30-day hold; no "USPS-registered" claim while the Office Evolution CMRA question is open.
