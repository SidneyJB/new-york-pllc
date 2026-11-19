# 01 · Internal demand signals: what clients asked us about by email (CRM, read-only)

Pulled Nov 18 2026 19:10 UTC from the default-tenant CRM database (`DATABASE_URL`), Postgres session opened with `default_transaction_read_only=on` (checked before every run; the scripts stop if it is not set). SELECT statements only. No MBS database, Gmail, Stripe or PLLC-CRM file was touched. All figures below are `[M]` (pulled from our own CRM by the scripts here); arithmetic is tagged `[CALC]`. No names, entity names, emails or addresses appear in this report.

- Scripts: [scripts/_ro.cjs](scripts/_ro.cjs) (read-only pool) · [scripts/02_topics.cjs](scripts/02_topics.cjs) (all counts in this report) · [scripts/01_explore.cjs](scripts/01_explore.cjs) (data-shape check)
- Raw aggregate output: [scripts/02_topics_output.txt](scripts/02_topics_output.txt)
- Hand-check snippets were written to a session scratch folder outside the repo and are not kept.

## 1. Method

**Window.** `InboundEmail.receivedAt` from Nov 18 2025 to Nov 18 2026: 10,581 rows. (The table's earliest row is Oct 23 2025, so the window is fully covered.)

**Senders kept.**
- *Client-linked*: the CRM matched the sender to a `Customer` (or the one `EnterpriseCustomer`, an intermediary accounting firm). This is the main count.
- *Unlinked*: sender not matched to any client record (prospects, clients writing from another address, and residual vendors). Shown in separate columns.
- *Excluded by sender address* (793 linked + 4,291 unlinked messages): `.gov`/`.mil`/state domains, NYSED and its Zendesk, NJ portal, our own domain and the sister company, newspapers (Hamodia and generic newspaper/legals domains), vendors (Google, Cognito Forms, Adobe Sign, Proof/Notarize, Spiffy, Quo, Tawk, USPS, JotForm, Fax.Plus, PirateShip, Stripe, Slack, EasyPost, Microsoft, Apple and similar), payers (Fidelis, Carelon, CAQH, Availity), no-reply/notification local parts, and every address in `Partner` and `b2b_partners`.
- *Excluded by text, unlinked only* (48 messages): marketing and platform notices (unsubscribe footers, website/SEO pitches, IP-violation notices, lead-list offers).
- Kept: **4,552 client-linked messages from 506 senders**; 897 unlinked messages from 381 senders.

**Text matched.** Subject plus the sender's own text: quoted replies, our own quoted text, signatures and confidentiality/HIPAA disclaimers are cut, and boilerplate sentences (questionnaire answers, upload lists, legal-advice disclaimers) are dropped. Matching is per sentence, case-insensitive, with an optional per-topic exclusion pattern.

**Profession group** (client-linked senders): `Customer.profession`, else the customer's first license, else the first license on a linked entity. therapist = social work, mental health counseling, MFT, creative arts, psychology, behavior analysis · psych NP = nurse practitioner in psychiatry · other NP-PA = other NP specialties and PA · physician = medicine · dentist = dentistry · other health = RN, PT, OT, SLP, chiropractic, acupuncture, podiatry, optometry, dietetics, midwifery, massage, dental hygiene, aesthetics · law · other = architecture, engineering, CPA, veterinary, the intermediary firm, etc.

**Before / after filing.** A client-linked message is "before" if received before the earliest `formationDocumentFiledAt` of any entity linked to that customer, "after" if on or after it, and "no filed entity" if there is none (this includes the intermediary firm's messages).

**Hand check.** For each topic, a deterministic 15-match sample (or every match if there are fewer than 15) was read. *False match* = the keyword hit but the message is not about the topic (signature, disclaimer, our quoted text, an agency's website, a filing into NY counted as "another state", our own fees). *Asks us* = the sender asks whether we provide or can do it.

## 2. Keyword lists

| # | Topic | Keywords (regex summary) | Sentence excluded if it contains |
|---|---|---|---|
| T01 | taxes / accountant / bookkeeping / CPA | accountant(s), accounting firm/services/help, bookkeep*, tax return(s), tax filing(s), file my/our/the (business) taxes, do my taxes, tax prep*, tax advi*, tax professional, tax planning, tax guy, quarterly/estimated tax*, 1120(-S), form 1065, K-1, CPA help/services/referral, need/recommend/refer a CPA/accountant | (bare "CPA" not used: many clients are CPAs) |
| T02 | payroll / hiring / workers comp / DBL-PFL | payroll, hire/hiring (an/my first) employee/staff/therapist/clinician/provider/W-2/assistant/receptionist/nurse, employee(s), W-2 employee, workers comp*, disability insurance/benefits/coverage, DBL, paid family leave, PFL, unemployment insurance, Gusto, ADP | number of employees, employer identification, employee or agent |
| T03 | malpractice / liability insurance | malpractice, liability insurance, professional liability, general liability, liability coverage/policy, certificate of insurance, COI, HPSO, CM&F, tail coverage, business insurance | car/vehicle insurance |
| T04 | website / domain / business email / phone | my/our/a/new/own/business/practice/company/PLLC website, build a website, website for/design/builder/branding, domain (name), business/professional email, email domain, Google Workspace, G Suite, business phone/line number/service, phone line, Google Voice, virtual phone, phone system, logo | free call registry, First Orion, website analyst; "your website"/"the NYPLLC site" removed before matching |
| T05 | HIPAA / compliance / BAA | HIPAA (and "HIPPA"), BAA(s), business associate, compliance program/officer/requirements/training, OSHA, notice of privacy practices, regulatory compliance/things/requirements | (disclaimers removed in cleaning) |
| T06 | DEA / CLIA / prescribing | DEA, CLIA, prescrib*, prescription(s), controlled substance(s), I-STOP, narcotic, buprenorphine, Suboxone, X-waiver | |
| T07 | license renewal / license in another state | license renewal, renew my/the license, license in another/other/multiple state(s), licensed in another state, [state] license (NJ, CT, FL, CA, PA, MA, TX, VT, MD, VA, GA, IL, CO, AZ, WA, MI, OH, NC, DE), licensed in [state], dual licensed, PSYPACT, counseling compact, nurse licensure compact, NLC, interstate license | |
| T08 | forming / registering in another state | another state, other states, out-of-state, multi-state, form/open/register/qualify/set up/start/expand/file/do business … in/into [state], [state] PLLC/LLC/PC/entity/company/foreign registration/DBA | in/into/business in/to New York/NYS/NYC (filings *into* NY are a current service) |
| T09 | nonprofit / 501(c)(3) | non-profit, not-for-profit, 501(c), charitable organization/foundation | |
| T10 | trademark | trademark, USPTO, service mark, TM registration | |
| T11 | contracts / lease / agreements / lawyer referral | contract(s), lease, sublease, leasing, employment agreement/contract, contractor agreement, non-compete, lawyer/attorney referral/recommendation, refer/recommend a lawyer, lawyer you refer, need a lawyer, legal advice/services, review a contract/agreement/lease | lease agreement (ID list), contract work(er), current contract with us, contract directly with insurance |
| T12 | add/remove member; sell or close | add (a/new/second) member/partner/owner, remove a member/partner/owner, new member/partner/owner, second owner, buyout, bought out, sell my practice/business/PLLC, close my practice/business/PLLC/company, dissol*, shut down, wind down, transfer of ownership, ownership change/transfer | admission of additional members (OA text), shut down my bank account |
| T13 | annual state tax filing / fee | IT-204(-LL), annual (filing) fee, yearly fee, franchise tax, annual report/filing/reporting/regulatory, ongoing/recurring fees | registered agent, $99, other states' annual-report notices |
| T14 | EHR / practice software | EHR, EMR, SimplePractice, TherapyNotes, Athena*, Kareo, Tebra, practice management, electronic health/medical records, health records, Charm, Jane App, IvyPay, Valant, Practice Better | |
| T15 | apostille | apostille, embassy, consulate, authentication of document/certificate/articles | |
| T16 | operating agreement changes | amend/change/update/revise/modify/redo/rewrite/correct … operating agreement, operating agreement … amend/change/update/revise/modify/correct/clarify/provision/additions | |
| T17 | business credit card / loan | business credit, credit card for the business/practice, corporate card, Amex business, loan(s), line of credit, SBA, lender, financing for | |
| T18 | "do you also / can you help / do you offer" | do you (also) offer/provide/handle/help/assist/do/guys, can you (also) help/assist/handle/set up/take care, could you help/assist/handle, does your company/firm/team/service offer…, is this something you do/offer/handle, would you be able to help/assist/handle, are you able to help/assist/work, is there anything (else) you can assist with, any chance I can pay you | |

## 3. Topic counts, last 12 months

Client-linked = sender matched to a CRM client record. Before/after columns cover client-linked messages only.

| Topic | Client senders | Client msgs | Unlinked senders | Unlinked msgs | Msgs before filing | After filing | No filed entity | Hand-checked | False matches | Asks us to provide it |
|---|---|---|---|---|---|---|---|---|---|---|
| T01 taxes / accountant / bookkeeping / CPA | 22 | 26 | 13 | 17 | 8 | 14 | 4 | 15 | 6 (40%) | 0 |
| T02 payroll / hiring / workers comp / DBL-PFL | 11 | 12 | 5 | 6 | 1 | 8 | 3 | 15 | 5 (33%) | 1 |
| T03 malpractice / liability insurance | 12 | 14 | 3 | 3 | 7 | 5 | 2 | 15 | 3 (20%) | 1 |
| T04 website / domain / business email / phone | 25 | 34 | 11 | 14 | 11 | 10 | 13 | 15 | 4 (27%) | 0 |
| T05 HIPAA / compliance / BAA | 4 | 4 | 1 | 3 | 2 | 1 | 1 | 7 (all) | 0 | 4 |
| T06 DEA / CLIA / prescribing | 4 | 5 | 2 | 2 | 4 | 1 | 0 | 7 (all) | 0 | 0 |
| T07 license renewal / license in another state | 5 | 5 | 5 | 5 | 3 | 2 | 0 | 10 (all) | 2 (20%) | 0 |
| T08 forming / registering in another state | 15 | 22 | 9 | 10 | 7 | 5 | 10 | 15 | 5 (33%) | 5 |
| T09 nonprofit / 501(c)(3) | 1 | 1 | 0 | 0 | 1 | 0 | 0 | 1 (all) | 1 (100%) | 0 |
| T10 trademark | 2 | 2 | 1 | 1 | 1 | 1 | 0 | 3 (all) | 0 | 1 |
| T11 contracts / lease / agreements / lawyer referral | 22 | 29 | 6 | 8 | 14 | 8 | 7 | 15 | 2 (13%) | 2 |
| T12 add/remove member; sell or close practice | 14 | 21 | 3 | 3 | 6 | 9 | 6 | 15 | 0 | 5 |
| T13 annual state tax filing / fee | 5 | 5 | 7 | 7 | 1 | 4 | 0 | 12 (all) | 7 (58%) | 2 |
| T14 EHR / practice software | 6 | 7 | 0 | 0 | 2 | 4 | 1 | 7 (all) | 0 | 0 |
| T15 apostille | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | – | 0 |
| T16 operating agreement changes | 3 | 3 | 1 | 1 | 1 | 2 | 0 | 4 (all) | 2 (50%) | 2 |
| T17 business credit card / loan | 5 | 6 | 0 | 0 | 3 | 3 | 0 | 6 (all) | 0 | 0 |
| T18 "do you also / can you help / do you offer" | 34 | 38 | 18 | 20 | 8 | 25 | 5 | 58 (all) | 0 | 58 (see §5) |

Notes from the hand check (facts, not adjustments to the counts above):
- T01: none of the 9 on-topic sampled messages asked us for tax or bookkeeping work; they mention the client's own accountant or ask where to find tax identifiers.
- T06: all 7 matches use the words in their normal sense; none asks about DEA, CLIA or prescribing registrations as a service.
- T07: none of the 8 on-topic matches asks us to renew or obtain a license; 2 ask about registering the entity in the other state.
- T08: the 5 false matches were filings into New York or address moves.
- T11: 6 of 15 sampled matches are lease mentions tied to an address change.
- T12: 11 of 15 sampled matches concern dissolving a prior LLC or PC (a researched/decided line per the brief); 2 concern adding a member.
- T13: the 7 false matches ask about our own recurring fees (registered agent), not state fees.
- Any mention of "operating agreement" (not only changes): 22 client senders / 26 messages; unlinked 17 / 20.

## 4. By profession group (client-linked senders / messages)

Denominator, client-linked senders in the window: therapist 132 · psych NP 41 · other NP-PA 44 · physician 71 · dentist 26 · other health 82 · law 53 · other 51 · unknown 6.

| Topic | therapist | psych NP | other NP-PA | physician | dentist | other health | law | other | unknown |
|---|---|---|---|---|---|---|---|---|---|
| T01 | 9/10 | 2/2 | 2/3 | 3/3 | 1/1 | 3/4 | 0/0 | 2/3 | 0/0 |
| T02 | 5/5 | 1/1 | 1/1 | 1/2 | 1/1 | 1/1 | 0/0 | 1/1 | 0/0 |
| T03 | 5/7 | 0/0 | 0/0 | 3/3 | 0/0 | 3/3 | 0/0 | 1/1 | 0/0 |
| T04 | 9/13 | 4/8 | 0/0 | 3/3 | 0/0 | 5/5 | 1/2 | 2/2 | 1/1 |
| T05 | 1/1 | 0/0 | 0/0 | 1/1 | 0/0 | 1/1 | 1/1 | 0/0 | 0/0 |
| T06 | 0/0 | 0/0 | 0/0 | 2/2 | 0/0 | 2/3 | 0/0 | 0/0 | 0/0 |
| T07 | 2/2 | 0/0 | 0/0 | 2/2 | 1/1 | 0/0 | 0/0 | 0/0 | 0/0 |
| T08 | 3/4 | 4/4 | 0/0 | 2/4 | 1/1 | 2/2 | 1/1 | 2/6 | 0/0 |
| T09 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 1/1 | 0/0 |
| T10 | 2/2 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| T11 | 2/2 | 3/3 | 1/1 | 5/9 | 0/0 | 5/6 | 3/4 | 2/3 | 1/1 |
| T12 | 4/4 | 1/1 | 1/1 | 3/6 | 0/0 | 3/4 | 1/4 | 0/0 | 1/1 |
| T13 | 1/1 | 0/0 | 0/0 | 1/1 | 0/0 | 1/1 | 1/1 | 1/1 | 0/0 |
| T14 | 4/5 | 0/0 | 0/0 | 1/1 | 0/0 | 1/1 | 0/0 | 0/0 | 0/0 |
| T15 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| T16 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 2/2 | 1/1 | 0/0 | 0/0 |
| T17 | 0/0 | 0/0 | 0/0 | 4/5 | 0/0 | 1/1 | 0/0 | 0/0 | 0/0 |
| T18 | 7/9 | 6/6 | 1/1 | 7/9 | 1/1 | 6/6 | 3/3 | 2/2 | 1/1 |

## 5. T18: distinct things asked for ("do you also / can you help / do you offer")

All 58 matches (38 client-linked + 20 unlinked) were read and sorted by what was asked. Some messages ask for two things. "Sold today" follows the brief's list of current or decided lines.

**Things the brief does not list as sold or decided**

| Asked for | Messages |
|---|---|
| Forming or foreign-registering an entity in a state other than NY (NJ, other states, PLLC "in a different state") | 5 |
| HIPAA-compliant virtual office / signing a BAA | 2 |
| Contract drafting or review (legal services), incl. a contract between an LLC and a supervising physician's PLLC | 2 |
| Trademark application for the PLLC name | 1 |
| Hiring employees, payroll, employer agreements (same message also asks about S-corp) | 1 |
| Use of a physical office or conference room at the business address | 1 |
| Fixing form submissions on the client's own website | 1 |
| Help with an Appellate Division application | 1 |
| "Annual regulatory things" in NY and whether we do them | 1 |
| Rush/expedited processing at the state | 1 |
| Converting an existing LLC to a PLLC | 1 |
| Partial formation plan for attorneys (publication, bar filing, affidavit only) | 1 |
| Referrals to agencies for insurance contracting | 1 |
| Separate LLC for a prescriber's supplement sales | 1 |

**Things already sold or decided (for completeness)**: DBA / assumed name 8 · plain LLC formation (incl. food truck, interim LLC) 4 · insurance credentialing / CAQH / carrier relationships 4 · publication or certificate of publication (incl. finishing a decades-old publication and another firm's client) 4 · foreign qualification into NY 3 · S-corp election 3 · registered agent / service-of-process-only plan 3 · dissolution 2 · address change 2 · EIN 1 · name availability check 1 · group-practice PLLC 1 · NP PLLC with NYSED approval 1 · medical-spa PLLC with a custom operating agreement 1 · help completing one of our forms / resending a payment link / unclear 3.

## 6. De-identified paraphrases (3 per topic)

- **T01** · A newly formed client asks where to find the business tax number for filing taxes. · A client's accountant advises against the S-corp election and asks whether the election forms already went out. · A client copies their accountants on a sales-tax question about online sales across NJ and NY.
- **T02** · A client asks whether we help with hiring employees, payroll and employer agreements. · A client with no employees asks whether labor-law posters can be bought later. · A client reports that the payroll provider will not pay under the assumed name and wants it in the PLLC name.
- **T03** · A client asks whether their malpractice policy stays valid once the PLLC exists. · A client asks whether our package includes liability insurance. · A prospect asks whether to buy malpractice coverage right after formation or after publication.
- **T04** · A client asks whether to change their domain name to match the approved entity name. · A client asks whether they can set up business email before state approval. · A client asks whether a business phone number is needed before starting, or a personal cell will do.
- **T05** · A prospect asks whether the virtual office is HIPAA-compliant and whether we sign BAAs. · A client wants to start a HIPAA-compliant website before the EIN arrives. · A client asks for a low-cost HIPAA-compliant health-records option.
- **T06** · A client needs a separate address for the entity's DEA registration and asks about cancelling the virtual address. · An NP client says they will not prescribe and asks how to state the profession. · A prospect asks about a separate LLC for supplements they prescribe.
- **T07** · A client licensed in several other states asks about registering the entity in those states. · A dentist asks whether another state's license can be used for the NY PLLC while the NY license name change is pending. · A client sends a license-renewal document.
- **T08** · A client doing telehealth in another state asks what steps are needed to use the NY PLLC there. · An intermediary asks to register a NY entity to do business in Texas. · A client with an out-of-state PC asks about qualifying it in five other states.
- **T09** · The only match is a name explanation stating the firm is not a nonprofit; no request about nonprofits was found.
- **T10** · A prospect asks to pay us to prepare a trademark application for the PLLC name. · A client asks whether a trademarked brand name can still be used on the practice website. · An intermediary needs an LLC formed quickly so trademark and copyright applications can be filed under it.
- **T11** · A client asks whether we provide contract drafting and review. · A client asks what the attorney we refer to would charge. · A prospect asks whether most psychologists need to hire legal help to set up and run a PLLC.
- **T12** · A client asks whether we can also dissolve their old PC. · A group-practice owner asks whether adding a member or owner makes it a group. · A client says the order indicated an additional member but the filing went in as single-member.
- **T13** · A client asks whether they must file Form IT-204-LL. · A client asks whether there is any annual filing or reporting and whether we handle it. · A client asks about annual regulatory items in NY and whether we do them.
- **T14** · A client asks how SimplePractice differs from CAQH. · A client says their EHR platform will handle insurance billing. · A client wants a low-cost HIPAA-compliant records system rather than a platform.
- **T15** · No matches.
- **T16** · A client asks for help changing the operating agreement after an address change. · A client asks us to correct the formation date stated in the operating agreement. · A prospect forming a medical-spa PLLC asks whether the operating agreement can be customized.
- **T17** · A client is waiting on a business credit card mailed to the virtual address. · A client needs a filing-submission letter for a loan. · A client asks how to keep spending separate before the EIN and a business card exist.
- **T18** · A client asks whether we handle DBAs. · A prospect asks whether we can form a PLLC in a state where they hold a license other than NY. · A client asks whether we offer contract legal services.

## 7. Customer base (no names)

**Customers with at least one paid order, by state of residence (`Customer.state`)**: NY 489 · NJ 32 · blank 14 · FL 10 · PA 7 · TX 4 · VA 2 · NC 2 · AZ 2 · GA 2 · CA 2 · MA, CO, ME, OK, MN, TN, OH, WA, DC 1 each. Total 576 `[CALC]` (sum of rows).

**Customers with 2+ entities** (owner rows or orders; cancelled and test entities excluded): 10 with 2+, of which 2 with 3+, out of 569 customers with an entity. The one intermediary (enterprise) customer has 3 entities.

**Entities by profession group** (586 non-cancelled, non-test; first license on the entity, else the owner's profession): therapist 145 · psych NP 56 · other NP-PA 51 · physician 93 · dentist 26 · other health 92 · law 57 · other 53 · unknown 13.
Top recorded professions: medicine 93 · mental health counseling 57 · NP in psychiatry 54 · LCSW 52 · law 42 (+ law firm 6, legal 4) · NP in family health 33 · dentistry 25 · physical therapy 22 · architecture 21 · professional engineering 15 · RN 14 · psychology 12 · chiropractic 11 · CPA 9 · MFT 8.
By entity type: PLLC 550 domestic + 10 foreign-into-NY · LLC 21 + 1 foreign · PC 1 + 2 foreign · blank 1.

**Open recurring subscriptions (status active, trialing or past_due; one per entity)**
| Product | Entities | Active | Trialing | Past due | Price |
|---|---|---|---|---|---|
| Registered agent (direct) | 425 | 12 | 409 | 4 | $99/yr |
| Virtual mail | 122 | 102 | 19 | 1 | $50/mo |

Other statuses: RA canceled 13, scheduled 2, pending 1, unpaid 1; virtual mail pending 97, canceled/cancelled 21. Compliance-plan flag on open RA subs: 0. Legacy `RegisteredAgentSubscription` table: 4 ACTIVE. Partner (Metro) RA clients: ACTIVE 410, TRIALING 1,317, CANCELLED 1,710. Metro virtual-mail clients: TRIALING 14, NEEDS_CARD 4. Credentialing engagements: 3 (intake 1, signatures 1, in progress 1).

**Client email addresses**: 585 `Customer` rows; 592 distinct addresses (primary + alternates). 235 addresses (232 customers) belong to a customer with a completed formation (status FORMATION_COMPLETE/COMPLETED or a completion date); 390 addresses belong to a customer whose entity has a DOS filing or approval date. Plus 1 enterprise (intermediary) customer and 32 additional-owner `Person` records.

## 8. Not found / not verified

- `[U]` Phone calls, texts, chat-widget conversations and web-form notes are not in `InboundEmail`; only email is counted.
- `[U]` Unlinked senders could not be split into prospects vs. clients writing from another address; some vendor mail remains in the unlinked columns (2 of 15 sampled T04 matches were vendor pitches).
- `[U]` Keyword counts are not corrected for the false-match rates in §3; counts are raw keyword hits after cleaning.
- `[U]` Messages whose body is stored only as HTML or a short snippet may be under-counted; matching reads at most the first 3,000 characters after quote removal.
- `[U]` Profession is missing for 6 client-linked senders and 13 entities; customers with several entities of different professions are assigned one profession.
- `[U]` State of residence is `Customer.state` as entered at checkout; 14 paying customers have it blank.
- `[U]` Apostille: no matches in the window.
