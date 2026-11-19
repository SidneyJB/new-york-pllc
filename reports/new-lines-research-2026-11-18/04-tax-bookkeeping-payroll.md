# 04 · Tax, bookkeeping and payroll for small professional practices (facts only)

Research date: Nov 18 2026. Read-only. Tags: `[M]` primary source opened · `[S]` secondary / snippet · `[U]` looked for, not found or not opened · `[CALC]` arithmetic on source figures.

Lines covered:
- **(a)** Monthly bookkeeping + annual returns for solo/small professional practices, incl. S-corp practices (1120-S, owner payroll, quarterly estimates).
- **(b)** Annual NY entity filings for LLCs/PLLCs: IT-204-LL fee, NY PTET election, NYC UBT.
- **(c)** Payroll for small practices as a reseller / accountant-partner of a payroll platform.

---

## Shared primary data (used by all three lines)

### IRS returns filed, FY2025 (IRS Data Book Table 1-2 and 1-3)
Source: https://www.irs.gov/pub/irs-soi/25db-1-02-nr.xlsx and https://www.irs.gov/pub/irs-soi/25db-1-03-nr.xlsx (FY2025, opened Nov 18 2026). State = state of the filing address.

| Return | US FY2024 | US FY2025 | New York FY2025 |
|---|---|---|---|
| Form 1120-S (S corporation) | 6,080,370 [M] | 6,154,614 [M] | 440,562 [M] |
| Form 1065 (partnership) | 5,100,408 [M] | 5,215,815 [M] | 433,623 [M] |
| Individual income tax (1040 series) | 161,052,672 [M] | 162,754,810 [M] | 9,943,062 [M] |
| Individual estimated tax (1040-ES) | n/a | 13,315,355 [M] | 977,197 [M] |
| Employment tax forms (940/941/943/944/945 etc.) | 33,662,190 [M] | 34,143,809 [M] | 2,335,665 [M] |

- NY share of US 1120-S filings: 440,562 / 6,154,614 = 7.16% [CALC].
- The Data Book does not split 1120-S filers by industry or by profession. [U]
- Schedule C count by state was not pulled (IRS SOI individual tables by state not opened). [U]

### NY active entities (NY Department of State, "Active Corporations: Beginning 1800", data.ny.gov dataset n9v6-gdp6, rows updated Nov 18 2026)
Query: `https://data.ny.gov/resource/n9v6-gdp6.json?$select=entity_type,count(*)&$group=entity_type` [M]

| Entity type | Active count |
|---|---|
| Domestic LLC | 2,078,557 [M] |
| Foreign LLC | 175,015 [M] |
| Domestic professional service LLC (PLLC) | 54,429 [M] |
| Foreign professional service LLC | 2,060 [M] |
| Domestic professional service corporation (PC) | 59,657 [M] |
| Domestic registered LLP | 4,827 [M] |
| Domestic business corporation | 1,421,584 [M] |

Note: "active" in the DOS dataset means not dissolved on the DOS record; it does not show whether the entity files tax returns. The dataset does not show tax classification (disregarded / partnership / S corp). [M]

### Federal return preparer population (IRS Return Preparer Office statistics, data as of 11/1/2026)
https://www.irs.gov/tax-professionals/return-preparer-office-federal-tax-return-preparer-statistics [M]
- Valid PTINs (2026): 902,514 · Attorneys: 26,696 · CPAs: 210,487 · Enrolled agents: 72,945 · 2027 AFSP Records of Completion issued: 14,492 [M]
- No NY breakdown on the page. [U]

---

## Line (a): Monthly bookkeeping + annual returns for solo/small professional practices (incl. S corps)

### 1. What it is and who buys it
- Any S corporation must file Form 1120-S annually (IRC §6037) [S, statute not opened]; owner-employees receive W-2 wages, so the S corp runs payroll and files 941/940 (Data Book counts above) [M for counts].
- Individuals with self-employment or pass-through income generally make quarterly estimated payments (1040-ES; 13.3M US / 977,197 NY estimated-tax forms FY2025) [M].
- NY S-corp election for NY purposes and NY S-corp return (CT-3-S) exist [S, not opened].

### 2. Annual volume
See shared table: 6,154,614 US / 440,562 NY 1120-S returns FY2025 [M]. NY active PLLCs 54,429 and PCs 59,657 [M]. Count of these that are healthcare, or that elect S status: not published. [U]

### 3. Who sells it today (own-page prices, opened Nov 18 2026 unless marked)

| Provider | Tier and price | What is included (per own page) | Tag / URL |
|---|---|---|---|
| **Heard** (therapists) | Solo Lite $159/mo ($139/mo annual = $1,668/yr) · Solo Essential $219/mo ($189 annual) · Solo Premium $399/mo ($339 annual) · S corp/group Essential $349/mo ($299 annual = $3,588/yr) · S corp/group Premium $499/mo ($424 annual = $5,088/yr) | Bookkeeping and quarterly estimates in all; Lite excludes 1040 ($750 add-on); S-corp tiers include 1120-S + 1040, salary/distribution guidance, accountable plan; payroll add-on $49/mo + $9/person | [M] joinheard.com/pricing. Other Heard pages show older/different figures ($149/$129, $299/$255, payroll $39+$6) [S] |
| **Collective** (solopreneurs) | LLC $199/mo · S Corp $349/mo (yearly "save 15%", yearly price not shown) | S Corp: 2553 filing, 1120-S, member payroll, bookkeeping; payroll extra $15/employee/mo, $5/contractor; 1040 "basic" incl. on LLC, add-on on S Corp (no price shown) | [M] collective.com/plans-and-pricing |
| **Formations** | Business-in-a-Box $500 one-time · LLC Management $219/mo ($199 annual) · S-Corp Management $389/mo+ ($350/mo+ annual) | S-Corp tier: S election, payroll + owner distribution, personal and business returns; 12-month commitment; state/banking fees extra | [M] formationscorp.com/pricing |
| **Found** | $0 · Plus $35/mo ($315/yr) · Pro $80/mo ($720/yr) | Bookkeeping software; Schedule C and 1120/1120-S *form generation*; page does not say Found files returns | [M] found.com/pricing |
| **1-800Accountant** | Tax Advisory $209/mo · Starter $299/mo · Business Complete $469/mo (billed annually) | Starter: one business return (Sch C/1065/1120/1120S) + personal return; Business Complete adds bookkeeper (from 75 txns/mo), payroll, quarterly estimates | [M] 1800accountant.com/pricing |
| **Pilot** | Bookkeeping Essentials $99/mo; Core "starts at $0/mo" (volume-based); Tax: SMLLC from $1,000/yr; Partnership/S-corp from $2,000/yr (1040 +$1,000/person); C-corp from $2,450/yr; extra state $250–$500, city $250–$500 | Tax must be bought with Pilot Bookkeeping; payroll priced by quote | [M] pilot.com/pricing |
| **Bench** (now on Mainstreet; footer "© Bench Accounting", privacy link to mainstreet.ai) | Bookkeeping Light $199/mo · Bookkeeping $399/mo · Full-service tax $300/mo ($2,880/yr) · Bookkeeping + Tax $649/mo ($6,230/yr) · Returning customer tax $1,200/yr | Business tax filing, advisory calls; QBO tiers $399–$999+/mo | [M] bench.co/pricing |
| **TL;DR Accounting** | LLC/PLLC from $199/mo · S-Corp from $349/mo | LLC: bookkeeping + 1040; S-Corp: bookkeeping + 1040 + 1120S; payroll is an unpriced add-on | [M] tldraccounting.com/pricing |
| **Keeper** | Bookkeeping Only $20/mo · Standard $199/yr · Premium $399/yr · Business $1,199/yr | Business tier: 1120-S and 1065 filing, year-end book review; returns "reviewed and signed by a tax pro" | [M] keepertax.com/pricing |
| **Cleared** (psychologists, psychiatrists, therapists netting $150k+) | Bookkeeping $449/mo · Tax return prep $2,000/yr (add-on) · Tax planning $5,000/yr (FAQ says per engagement) · Catch-up $449 per month of backlog | No payroll listed | [M] joincleared.com |
| **Dimov Tax** (dentist page; CPA/EA firm) | Business return (1065/1120-S) from $795 · Bookkeeping from $395 · Personal from $395 (listed for expats) | Quotes after review | [M] dimovtax.com/pricing |
| **Taxstra** (physicians; CPA firm) | Own bookkeeping page: no prices ("quote"). Secondary: from $500/mo solo, $1,500–$3,000+/mo groups; "Physician Practice Package" $20,000/yr | Bookkeeping, tax prep, CFO; payroll not stated | [M] taxstra.com/physicians/bookkeeping-for-doctors (no price); figures [S] via WCI/search |
| **NovaPoint CFO** (physicians, WCI partner) | Typical bookkeeping client $600/mo | Flat monthly for accounting + payroll | [S] whitecoatinvestor.com/partner/novapoint-cfo |
| **Reza & Sharif CPAs** (physicians, WCI partner) | Average subscription fee $2,500/yr | Subscription model | [S] whitecoatinvestor.com/partner/reza-sharif-cpas-p-c |
| **eAssist Dental** | Monthly fee + $3/employee (≤10 employees), $399 setup for advanced bookkeeping | Dental bookkeeping | [S] (own page 403) dentalbilling.com |

Range seen on own pages for "bookkeeping + 1120-S + 1040" bundles: $299/mo (Heard S-corp annual) to $469/mo (1-800Accountant Business Complete); Keeper $1,199/yr is a tax-plus-software bundle; Pilot S-corp tax alone from $2,000/yr. [M]

### 4. Size evidence

| Provider | Evidence | Tag / source |
|---|---|---|
| Heard | Series A $10M (May 2022, Footwork); Series A-2 $15M (Jun 2023, Headline); total $26.3M. "Many thousands of therapists" through 2025 tax season; returns +45% YoY (State of Heard Q1 2025, Apr 22 2025). No customer count found. | [S] geekwire.com 2022/2023; [M] joinheard.com/articles/state-of-heard-q1-2025 |
| Collective | "Trusted by 12k+ solopreneurs" (own homepage, Nov 2026). $100M announced Oct 29 2026 ($40M Series B + $60M General Catalyst Customer Value Fund); acquired Open Ledger Apr 2026; earlier $50M and $20M Series A. | [M] collective.com; [S] foundra.ai, unite.ai |
| Formations | $8M Series A (Apr 2022, Arthur Ventures); totals cited $11.5M–$12M; 51–100 employees. | [S] benzinga 2022, caplight, village.ai |
| Found | Not researched beyond pricing. | [U] |
| 1-800Accountant | 50–249 employees (Clutch); "100k+ business clients" (techlist.ai estimate). Adopted Salesforce Agentforce 2025. | [S] |
| Pilot | $100M Series C at $1.2B valuation (Mar 2021, Bezos Expeditions); layoffs Jan 2023, Jun 2023, May 2024; "1,750+ customers" on own page; revenue est. $43M (2022, Sacra). | [S] trueup.io, sacra.com; [S] pilot.com/why-pilot-ai-startups |
| Bench | Shut down abruptly Dec 27 2024; Employer.com announced acquisition Dec 30 2024; Bench had claimed 35,000+ customers, Employer.com said ~12,000; 250–600+ staff reported let go; brand reported consolidated under Mainstreet Aug 11 2025 (one source). | [S] techcrunch.com/2024/12/30, accountingtoday.com, uplinq.com |
| TL;DR Accounting | Not found. | [U] |
| Keeper | $13M Series A (Apr 2021, e.ventures); $1.6M seed 2019; total $14.6M–$15.8M. No 2025–26 round found. | [S] prnewswire 2021, techcrunch 2019 |
| Taxfyle (marketplace, see white-label) | "100+ firm partnerships", "7,200+ US-based CPAs & EAs" (own firm page per snippet). | [S] taxfyle.com/for-accounting-firms |

### 5. What it legally takes to offer it

**Federal**
- **PTIN:** "Anyone who prepares or assists in preparing federal tax returns for compensation" must have a valid PTIN; fee $18.75 new or renewal (2027 cycle). [M] irs.gov/tax-professionals/ptin-requirements-for-tax-return-preparers
- **Credential levels:** Attorneys, CPAs and EAs "continue to be the only tax professionals with unlimited representation rights." PTIN holders without AFSP or a credential "will only be permitted to prepare tax returns" and, for returns signed after Dec 31 2015, may not represent clients. [M] irs.gov/tax-professionals/annual-filing-season-program
- **AFSP (voluntary):** 18 hours CE incl. 6-hour AFTR course with test (15 hours for RTRP-exam passers); PTIN renewal; consent to Circular 230 obligations; gives limited representation for returns the participant prepared and signed. [M] same page. Program created by Rev. Proc. 2014-42 [S].
- **Circular 230 (31 CFR Part 10):** §10.3 lists who may practice (attorneys, CPAs, EAs, actuaries, retirement plan agents; (f) RTRP limited to preparing and signing returns, no advice beyond what is needed for the return). [M] law.cornell.edu/cfr/text/31/10.3. The RTRP mandatory regime was struck down in Loving v. IRS (D.C. Cir. 2014) [S, not opened].
- **Enrolled agent:** 3-part IRS exam (SEE); CE 72 hours per 3-year cycle. Exam fees and Form 23 enrollment fee not on page opened. [M] irs.gov enrolled-agent-information; fees [U].
- **E-file provider (ERO):** steps: e-Services account → online application listing each Principal and Responsible Official → fingerprinting (Livescan, via IRS vendor) for those not certified/licensed → suitability check (credit, tax compliance, criminal background, prior e-file non-compliance) → acceptance letter with EFIN. "up to 45 days" to approve. The page does not mention a fee. [M] irs.gov/e-file-providers/become-an-authorized-e-file-provider
- **Mandatory e-file for preparers:** IRC §6011(e)(3): a "specified tax return preparer" who reasonably expects to file more than 10 individual income tax returns in a calendar year must e-file them; hardship waiver on Form 8944. [S] govinfo.gov FR 2011-7571; current IRS page returned 404. Business-return e-file threshold (10 returns aggregate, T.D. 9972, 2023) [S, not opened].
- **AI use:** IRS OPR Alert 2026-19, "Introductory Guidelines for Responsible AI Use in Federal Tax Practice" (Jun 24 2026): no new rules; applies Circular 230 §10.22 (verify AI facts, citations, calculations), §10.27(a) (fees; AI savings), §10.35 (competence incl. tools), §10.36 (firm written AI procedures), §10.37 (written advice); confidentiality under IRC §§6713, 7216 and §10.51(a)(15); "Practitioners cannot rely solely on AI." No standalone client-disclosure rule. [M] content.govdelivery.com/accounts/USIRS/bulletins/41d6e70
- **Preparer due diligence (Form 8867, IRC §6695(g))** applies to EITC/CTC/AOTC/head-of-household claims, not to business returns [S, not opened]. Preparer penalties IRC §6694/§6695 [S, not opened].

**New York**
- **NY tax return preparer registration** (Tax Law §32 per secondary sources; DTF page cites Ch. 503 L.2009 and Ch. 242 L.2010): anyone paid to prepare a substantial portion of a NY return must register each calendar year. Commercial preparer (paid for ≥10 returns prior year or this year): $100 annual fee. Exempt: attorneys, CPAs, public accountants, enrolled agents, volunteers, and employees supervised by them. Penalties: $250 per year unregistered; $50 per return for unpaid fee, up to $5,000/yr. CE: first-time registrants 16 hours "Qual" coursework; then 4 CPE (state SLMS courses; IRS courses do not count). Must post certificate, price list, Pub 135.1; give clients Pub 135; NYTPRIN on every return. 2027 application available. No competency exam mentioned. [M] tax.ny.gov/tp/reg/tpreg.htm
- **NY Education Law Art. 149 (public accountancy):**
  - §7401: practice of public accountancy = attest/compilation services (§7401-A), related professional services, and accounting/tax/advisory services that use a licensee's professional skills. [M] nysenate.gov/legislation/laws/EDN/7401 (paraphrased; full text on page)
  - §7408(2): a firm may not use "CPA"/"certified public accountant" in its name unless every owner engaged in US public accounting is a CPA in good standing in some state. [M]
  - §7408(4): class A misdemeanor to use titles such as "chartered accountant," "certified accountant," "enrolled public accountant," "licensed accountant," or any designation tending to imply expert knowledge in accounting or auditing / independent accountant status; "enrolled agent"/"E.A." only by IRS-designated individuals. [M]
  - §7408(5): non-licensees may prepare financial statements only with two required statements (limited to management's representations; not audited or reviewed; no opinion or assurance) and no wording implying CPA/PA status. [M]
  - §7408 does not mention a bookkeeping or tax-preparation exemption; it is silent on them. [M]
  - Whether NY treats a non-CPA company's use of the word "accounting" alone (e.g., in a brand name) as a §7408(4) violation: no Education Department guidance found. [U]
- Entity form for a non-CPA bookkeeping/tax company: a CPA firm must be registered with NYSED (§7408(1),(3)); a non-CPA firm is not a "firm" under Art. 149. [M for registration text]

### 6. The work itself
- Federal returns: 1120-S, 1040 + Schedule C/E, K-1s, 941 quarterly, 940 annual, W-2/W-3, 1099-NEC; all e-filed via ERO/EFIN-approved software (portal-free; software submits through MeF) [S].
- NY: IT-201 personal; CT-3-S for NY S corps; IT-204 for multi-member LLCs; NYS-45 quarterly withholding/UI (payroll) [S, forms not opened].
- Government fees: none for federal e-filing [S]; NY IT-204-LL fee (line b); NY S-corp fixed dollar minimum (CT-3-S) [S, not opened].
- Fingerprinting for EFIN applicants in person at Livescan site [M].

### 7. Recurrence
Bookkeeping monthly; 1120-S/1065 due 15th day of 3rd month (Mar 15 for calendar year); 1040 Apr 15; estimates 4x/year; 941 quarterly. [S] PTIN renews annually ($18.75) [M]; NY preparer registration annual ($100) [M]; AFSP annual [M]; EA CE 72h/3 yrs [M].

### 8. Advertising limits
- Google announced Oct 20 2026 that Financial Services Verification will extend to the US and Canada in early 2027; which categories (tax prep, bookkeeping) are covered was not published at time of search. [S] ppc.land; support.google.com/adspolicy/answer/12390454 not opened in full.
- No Google policy specific to tax preparation found. [U]

### 9. Search demand
No public search-volume figures found for "accountant for therapists", "S corp accountant", etc. [U]

### 10. Fee studies (published prices CPAs/preparers charge)
- **NATP 2025 Fee Study (Media Highlights, Nov 2025):** average set hourly rate $182 (2023: $179), middle half $129–$250/hr; 7% of respondents charge hourly; respondent revenue mix: tax forms 65%, bookkeeping 12%, payroll 4%; designations: EA 43%, AFSP 29%, CPA 21%. Exact per-form averages (Schedule C, 1120-S) are in the members-only appendix, not in the highlights. [M] dam.natptax.com/m/5f112786acbd1130/original/2025_NATP_Fee_Study_MediaHighlights.pdf
- NATP 2025 per secondary: 1040 base average $228 (EA) / $280 (CPA); business forms (1065/1120-S/1120) average minimum fee $634, middle half $350–$850; Schedule C add-on ~$123–$135. [S] eduyush.com 2026 guide
- NATP base 1040 with schedules average $236 (2025 study) vs $162 (2024 article). [S] cpatrendlines.com
- NSA Income & Fees surveys (older): 1120-S $809, Schedule C $184 (2016-17 survey); 1120-S $761, Schedule C $218 (2013). No 2023–2025 NSA figure found. [S] cpapracticeadvisor.com 2017, 2013
- Heard's own estimate: S-corp business return $700–$1,000 at a CPA. [S] joinheard.com article

---

## Line (b): Annual NY entity tax filings (IT-204-LL, PTET, NYC UBT)

### 1. What it is and who must file
**IT-204-LL** (2025 instructions, IT-204-LL-I) [M] tax.ny.gov/pdf/2025/inc/it204lli_2025.pdf
- Must file: (i) an LLC that is a federally disregarded entity with income, gain, loss or deduction from NY sources; (ii) an LLC/LLP required to file a NY partnership return with NY-source items; (iii) a regular partnership with ≥$1M NY-source gross income in the prior year.
- Do not file: entities with no NY-source items; LLCs/LLPs that elected corporate treatment (incl. S corp).
- Fee: disregarded LLC with NY-source items = $25. LLC/LLP fee table by prior-year NY-source gross income: ≤$100k $25; $100k–$250k $50; $250k–$500k $175; $500k–$1M $500; $1M–$5M $1,500; $5M–$25M $3,000; >$25M $4,500. Regular partnerships: $500 / $1,500 / $3,000 / $4,500 from $1M up.
- Due 15th day of 3rd month after year end (2025 partnership returns due Mar 16 2026). "There is no extension of time to file Form IT-204-LL or pay the annual fee." Penalties and interest if late.
- E-file mandate applies under conditions stated on form; paper otherwise to PO Box 15310 Albany.
- PLLCs are LLCs under NY LLC Law and fall in the same categories [S: inferred from LLC definition; instructions do not name PLLCs].

**NY PTET (Tax Law Art. 24-A)** [M] tax.ny.gov/bus/ptet/
- Optional, annual. Eligible: partnerships (incl. LLCs taxed as partnerships) and NY S corporations. Not eligible: sole proprietors; single-member LLCs unless they elect S treatment for NY.
- Election Jan 1–Mar 15, online through the entity's Business Online Services account by an authorized person. "Tax professionals may not make this election on behalf of their clients." Revocable until first estimated payment due.
- Estimates Mar 15, Jun 15, Sep 15, Dec 15 by ACH via Web File; each ≥25% of required annual payment; annual PTET return due Mar 15 online. Owners claim credit on Form IT-653.
- Rates: 6.85%–10.90% [S, PKF / practitioner summaries; not on DTF page opened]. NYC PTET companion exists for NYC resident owners [S/M: tax.ny.gov/bus/ptet/city.htm in results, not opened].

**NYC UBT** [M] nyc.gov UBT page + NYC-202 instructions 2025 (pdf)
- Applies to unincorporated businesses incl. "trades, professions, and certain occupations" of individuals, partnerships and LLCs; rate 4% of income allocated to NYC. S corporations are not subject (they pay GCT).
- Filing threshold: total gross income from all business of more than $95,000. Forms: NYC-202 (individuals and single-member LLCs), NYC-204 (partnerships/multi-member LLCs).
- Business tax credit: full credit if tax ≤ $3,400; partial credit between $3,400 and $5,400.
- NYC-202 due on or before April 15 (calendar year). Estimated tax forms NYC-5UB / NYC-5UBTI.

### 2. Annual volume
- Number of IT-204-LL filers / fee collections: not published in any DTF statistics page found. [U]
- Number of PTET electing entities: not found. [U]
- NYC UBT filer counts: NYC DOF publishes UBT statistical reports [S]; not opened. [U]
- Proxy counts: NY active domestic LLCs 2,078,557; PLLCs 54,429; foreign LLCs 175,015 [M]; NY-address 1065 filings 433,623 and 1120-S 440,562 (FY2025) [M].

### 3. Who sells it today
- No provider found selling IT-204-LL filing as a standalone product with a published price. [U]
- Pilot lists state income tax filings $250–$500/state and city filings $250–$500/city as add-ons. [M]
- Tax software that prepares IT-204-LL: TaxAct, Drake, UltraTax, TaxSlayer Pro support articles exist. [S]

### 4. Size evidence
None specific to this line. [U]

### 5. What it takes to offer it
- Paid preparation of a NY return/report triggers NY preparer registration ($100/yr commercial; CE) unless exempt (CPA/attorney/EA). [M] tax.ny.gov/tp/reg/tpreg.htm
- PTET election itself cannot be made by a tax professional for the client. [M]
- Federal PTIN is required only for federal returns. [M]

### 6. The work itself
- IT-204-LL: NY-approved e-file software or paper + check; fee table above; no extension. [M]
- PTET: owner logs into Business Online Services (requires the entity's online account); estimates by ACH only. [M]
- NYC UBT: NYC-202/204 via NYC-approved software or paper; due Apr 15 (202). [M]

### 7. Recurrence
All three are annual (IT-204-LL every year with NY-source items; PTET election renewed each year by Mar 15 plus quarterly estimates; UBT annual + estimates). [M]

### 8. Advertising limits
Same as line (a). [U/S]

### 9. Search demand
Not found. [U]

---

## Line (c): Payroll for small practices as reseller / accountant partner

### 1. What it is and who buys it
Employers file Form 941 quarterly and 940 annually (US FY2025 34.1M employment-tax forms; NY 2,335,665) [M]. S-corp owner-employees must take wages (reasonable compensation doctrine) [S].

### 2. Annual volume
Employment-tax forms filed FY2025: 34,143,809 US, 2,335,665 NY [M]. Number of NY employers with ≤5 employees: not pulled. [U]

### 3. Who sells it / partner programs (published terms)

| Platform | Program terms | Tag / URL |
|---|---|---|
| **ADP** (Accountant Revenue Share Incentive Program) | 25% of monthly payroll invoice fees for the referral's first 12 months, payment activated at 3rd credited referral; 5–9 referrals: 50% (+ retro 25% for clients 1–4) + 10% annual residual years 2–5; 10+ referrals: 75% for rest of 12-month contract + 10% residual; checks 45 days after quarter end. Page inconsistent: "clients 1-4" vs FAQ "1-5". Referral (ADP bills client), not resale. | [M] info.adp.com/lp=11737 |
| **Paychex** (Accountant Benefits Program, with CPA.com) | Advocate (0–9 mutual payroll clients) 25% revenue share on new-sale monthly billings; Advisor (10–29) 40% + 5% recurring residual for 3 years; Champion (30+) 50% + 10% residual. Revenue share labeled "Optional." | [M] paychex.com/accounting-professionals/benefits |
| **OnPay** (accountants) | Free firm payroll; 3–19 clients 10% discount; 20–49 15%; 50+ 20%; firm chooses OnPay-billed or firm-billed clients and discount-to-client or revenue share (percentage not published); base price "starts at $55 per month"; "up to $10,000" switch promotion. | [M] onpay.com/accountants |
| **Gusto** (Partner Program / Gusto Pro) | Per client: client-billed with revenue share, client-billed with partner discount, or firm-billed (firm pays Gusto, sets own price); top tier "up to 20% revenue share"; free Gusto Plus for firm if ≥1 client onboarded/yr; revenue share extended to 401(k) mid-Nov 2026. Lower-tier % not published. Direct pricing (secondary): Simple $49 + $6/person, Plus $80 + $12, Premium $180 + $22. | [S] gusto.com/partners/accountants (403 to fetcher), cpapracticeadvisor.com Oct 12 2026 |
| **Rippling** | Accountant partner type listed; no revenue share or commission published. | [M] rippling.com/partners |
| **Gusto Embedded / Check (checkhq) / Zeal** (white-label payroll APIs for platforms) | Pricing not public; Check bills per unique employee/contractor in approved payrolls; platform contracts + usage fees. | [S] embedded.gusto.com, help.checkhq.com |

### 4. Size evidence
- Gusto, ADP, Paychex, Rippling company size not researched (outside scope of partner terms). [U]

### 5. What it legally takes to offer it
- Payroll processing is not a licensed activity under federal law; a third party that files employment returns for clients as a Reporting Agent uses Form 8655 and IRS Reporting Agent authorization [S, Pub 1474 not opened].
- NY: no payroll-service license found for firms that do not hold client funds; money-transmitter licensing (NY Banking Law Art. 13-B) can apply to entities that hold and transmit funds [S, not opened]. Under firm-billed models the platform still moves the payroll funds [S].
- NY tax preparer registration covers "returns or reports"; whether NYS-45 payroll filings by a payroll reseller count: not found. [U]

### 6. The work itself
Platform-run: onboarding (EIN, NY withholding/UI registration via NY Business Express), payroll runs, 941/940/NYS-45/W-2 filings handled by platform as reporting agent [S].

### 7. Recurrence
Payroll per pay period; 941 and NYS-45 quarterly; W-2/940 annually. Partner revenue share: ADP first 12 months + residuals yrs 2–5; Paychex residuals 3 yrs; Gusto/OnPay ongoing (terms not fully published). [M/S as above]

### 8. Advertising limits
None found specific to payroll. [U]

### 9. Search demand
Not found. [U]

---

## White-label tax / bookkeeping platforms (non-CPA company selling under own brand)
| Platform | What is offered | Published terms | Tag |
|---|---|---|---|
| Taxfyle | Firm partnerships; reviews describe white-label portals (own branding/domain); marketplace of CPAs/EAs who prepare and sign | No public white-label price; partnerships page: commission "15% or more" (appears to be referral/affiliate) | [S] taxfyle.com/dev/partnerships-2, taxfyle.com/for-accounting-firms |
| File.Business | White-label client filing portal for tax firms; partner pricing firms can mark up | Domain did not resolve on fetch; terms not verified | [S]/[U] |
| X.TAX, FileYourTaxes | APIs that file 1065/1120/1120-S | Pricing not found | [S] |
| Gusto Embedded, Check, Zeal | White-label payroll APIs | Pricing by contract | [S] |
| Bookkeeping white-label (e.g., outsourced bookkeeping firms) | Not researched to the level of named published terms | — | [U] |

---

## Not found / not verified
1. Count of NY IT-204-LL filers and fee collections; count of NY PTET electing entities; NYC UBT filer counts. [U]
2. IRS 1120-S counts by industry (healthcare) or by entity legal form (PLLC/PC). [U]
3. NATP 2025 exact per-form averages for Schedule C and 1120-S (members-only appendix); any NSA survey after 2016-17. [U]
4. Gusto partner program lower-tier revenue share and discount percentages; Gusto own pricing page (403). [S only]
5. OnPay revenue share percentage; Rippling partner economics; any payroll platform's true wholesale (reseller) price list. [U]
6. Customer counts for Heard, Found, TL;DR, Formations (current). Heard total customers not published. [U]
7. Whether a non-CPA company may use "accounting" in its name in NY: no NYSED opinion found. [U]
8. Current IRS page for the 10-return preparer e-file mandate (404); T.D. 9972 business-return e-file threshold not opened. [S]
9. ERO application fee (page silent); EA exam and enrollment fees. [U]
10. NY PTET rates on a DTF page (only secondary). [S]
11. Whether Google's 2027 US Financial Services Verification will cover tax preparation/bookkeeping. [U]
12. Public search-volume data for any of the three lines. [U]
13. Own-page prices for at least two of the physician/dental firms (Taxstra, NovaPoint, Reza & Sharif, eAssist) — only secondary figures. [S]
