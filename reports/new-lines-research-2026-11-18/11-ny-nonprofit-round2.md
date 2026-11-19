# 11 — NY not-for-profit formation + 501(c)(3), round 2 (gap fill)

Research date: Nov 18 2026. Facts only, per the [brief](README.md). Builds on [08](08-ny-nonprofit-and-entity-annual-filings.md); facts already in 08 are not repeated unless a figure changed or is needed for a table.

Tags: `[M]` I opened the primary source (agency page, statute, form, dataset, provider's own page) · `[S]` secondary (search summary, vendor blog, third-party tool) · `[U]` looked for, not found or not opened · `[CALC]` my arithmetic on source figures, shown.

**Method.** I used 24 web searches. Most figures come from direct downloads, run read-only:
- NY DOS datasets on data.ny.gov via the Socrata API, queried Nov 18 2026:
  - `n9v6-gdp6`: active entities only
  - `63wc-4exh`: all filings, with filed and approved dates
  - `k4vb-judh`: daily filings with filer names; only covers approvals from Oct 19 to Nov 16 2026 for NFP certificates
- IRS files:
  - 1023-EZ approvals spreadsheets for 2020–2023. The 2024 link on the IRS page returns 404, and no 2025 file is listed.
  - EO BMF NY extract (Last-Modified Nov 9 2026)
  - BMF codebook `eo-info.pdf`
  - Auto-revocation list `data-download-revocation.zip` (file dated Nov 17 2026)
  - Form 1023 instructions (Rev. 12-2024) and Form 1023-EZ instructions (Rev. 1-2025)
- Price pages were fetched with curl. Five pages blocked curl (BryteBridge, Northwest, Rocket Lawyer, NYCON, Chisholm); I opened those in the desktop app's built-in browser, read-only. The Google results pages in §6 were also opened there.

---

## 1. Step list with timing (formation → state tax exemption)

| # | Step | Agency / form | Gov't fee | Online? | Expedite | Published processing time | Who must sign / submit |
|---|---|---|---|---|---|---|---|
| 1 | Name check (optional) | DOS written name-availability request | $5 per name `[M]` [fee schedule](https://dos.ny.gov/fee-schedules) | Mail/email | — | `[U]` | Anyone |
| 1b | Name reservation (optional, 60 days, two 60-day extensions) | DOS, N-PCL §303 | $10 `[M]` fee schedule; 60-day term `[M]` [AG procedures, rev. Feb 2024](https://ag.ny.gov/sites/default/files/regulatory-documents/Procedures-for-Forming-and-Changing-NFP.pdf) | Mail | — | `[U]` | Anyone |
| 2 | §404 consent, only if purposes trigger it (list in 08 §A1) | e.g. NYSED Office of Counsel (schools, libraries, museums, historical societies; §404(d)); OCFS (child care, adult care, DV shelters; §404(b)); AG Antitrust Bureau (trade associations; §404(a)); DOH/PHHPC (hospitals, §404(c),(o)); OASAS (§404(u)) `[M]` AG procedures p.7–8 | NYSED: **$10 per consent for NFPs** ($20 for other entities; $100 for §3.26 certificates) `[M]` [NYSED FAQ](https://counsel.nysed.gov/consents/ques), [NYSED III](https://www.counsel.nysed.gov/iii-incorporation-under-statutes-other-education-law). Others `[U]` | NYSED: mail only, check or money order, no credit cards `[M]` | NYSED: "does not offer expedited review" `[M]` | NYSED: "a minimum of four weeks from receipt… plus mailing time" `[M]`. OCFS, DOH, OASAS, AG: `[U]` | Not stated as officer-only. NYSED takes one photocopy of the signed certificate `[M]` |
| 2b | Post-filing copy (no prior consent) | OCFS for child day care (§404(b)(2)); NYSED for Regents-type purposes (§404(d)) `[M]` AG procedures | `[U]` | Certified mail | — | Within 10 business days of DOS confirmation (stated for applications for authority) `[M]` | Corporation |
| 3 | Certificate of Incorporation | DOS, Form DOS-1511-f, N-PCL §402 | $75 `[M]` | DOS NFP page: mail or email with card form `[M]`. The DOS e-Corp portal could not be loaded (ECONNRESET) `[U]`. Swyft says online filing exists `[S]` | $25 (24h), $75 (same day), $150 (2h) `[M]` | No DOS-published time `[U]`. **Dataset (`63wc-4exh`), 2025 NFP certificates:** median 2 days filed-to-approved, 27.6% same day, p75 12 days, p90 36 days (n=6,273) `[CALC]`. 2026 YTD: median 1, p90 32 (n=5,554) `[CALC]`. Vendor claims: Harbor "~14 business days" `[M-vendor]`; Northwest "two weeks" `[M-vendor]`; Swyft "3 to 5 business days" `[M-vendor]`; NYCON "6-12 months due to backlogs at the Department of State and IRS" (whole process) `[M-vendor]` | Incorporator(s) sign; any adult may be incorporator. Not officer-only `[S]` |
| 4 | EIN | IRS SS-4 / online | $0 | Yes | — | `[U]` (IRS page not opened) | Responsible party; third-party designee allowed on SS-4 `[S]` |
| 5a | Federal exemption, short form | IRS Form 1023-EZ (eligible if projected gross receipts ≤$50k in each of the next 3 years and assets ≤$250k) `[M]` i1023ez | $275 `[M]` | **Online only**, via Pay.gov or IRS.gov/Form1023EZ: "We will not accept printed copy submissions" `[M]` | **"Form 1023-EZ can't be expedited"** `[M]` | **80% of determinations within 22 days**. Cases needing more review: 80% within 120 days. Queue at review cut-off: Oct 7 2026 `[M]` [IRS status page, updated Oct 29 2026](https://www.irs.gov/charities-non-profits/charitable-organizations/wheres-my-application-for-tax-exempt-status) | "An officer, director, or trustee listed in Part I, line 8, who is authorized to sign" must sign `[M]` i1023ez. Line 4 contact may be an "authorized representative," such as an attorney, CPA or EA `[M]` |
| 5b | Federal exemption, full form | IRS Form 1023 | $600 `[M]` | Online only via Pay.gov; one consolidated PDF upload `[M]` i1023 | "In certain cases" may be expedited `[M]` | **80% of determinations within 191 days**; cases submitted on or before Oct 1 2026 are being reviewed `[M]` | "An officer, director, trustee, or other official who is authorized to sign" must digitally sign. Signer must be among the first five people listed in Part I line 9. **"An individual authorized by Form 2848 may not sign the application unless that person is also an officer, director, trustee…"** `[M]` i1023 (Rev. 12-2024). The instructions do not say who must hold the Pay.gov account `[M]` (silence) |
| 6 | Charities Bureau registration | NY AG, CHAR410 (Exec. Law §172; EPTL §8-1.4) | $25 under Exec. Law §172 (08) | **Online portal** (credit card except AmEx, or e-check); the application can be saved for 30 days `[M]` [AG registration page](https://ag.ny.gov/resources/government-organizations/charities-nonprofits-fundraisers/charities-registration), [user guide](https://ag.ny.gov/sites/default/files/regulatory-documents/online-reg-useguide.pdf) | — | AG: none published `[U]`. Northwest: "Three weeks" `[M-vendor]` | **Two e-signatures required: the president or another authorized officer, and the CFO or treasurer.** Signers get the form by email `[M]`. Needs the EIN; a new EIN can take "up to 30 days" to appear in the AG system `[M]` user guide. Purpose description must be at least 100 words `[M]` |
| 7 | Sales-tax exemption | NYS Tax, ST-119.2 (rev. 6/25) → certificate ST-119 | No fee on the form or instructions `[M]`; Northwest: "$0" `[M-vendor]` | **Mail only**, to Sales Tax Exempt Organizations Unit, Albany 12227 `[M]` [st119_2i.pdf](https://www.tax.ny.gov/pdf/current_forms/st/st119_2i.pdf) | — | Tax Dept: `[U]`. Northwest: "Approximately three months" `[M-vendor]`. A search summary cites ~2 months `[S]` | **"An officer, trustee, governing chief, or member of the ruling body… must sign."** If the contact person is not an officer, the application "must be accompanied by a power of attorney" `[M]` |
| 8 | Franchise-tax exemption | NYS Tax, CT-247 (rev. 12/25) | No fee on the form `[M]` | **Fax (518-435-2995, "preferred response method") or mail** `[M]` [ct247.pdf](https://www.tax.ny.gov/pdf/current_forms/ct/ct247.pdf) | — | `[U]` | Certified by the president, VP, treasurer, assistant treasurer, chief accounting officer or another authorized officer. **The form has a paid-preparer block (firm EIN, PTIN, NYTPRIN or exclusion code)**: "If an outside individual or firm prepared the application, all applicable entries in the paid preparer section must be completed" `[M]` |
| 9 | NYC corporate tax exemption affidavit (NYC entities) | NYC DOF | `[U]` | `[U]` | — | `[U]` | Listed as a package item by James Hsui PLLC `[M-vendor]` |

Note on DOS processing: `date_filed` in `63wc-4exh` may record the receipt date or the date of a later resubmission. The gap is therefore what the dataset records, not a published DOS turnaround.

---

## 2. IRS data for New York

### 2a. 1023-EZ approvals (IRS approval spreadsheets, rows where address State = NY) `[M]`

| Year | US EZ approvals | NY EZ approvals | NY share `[CALC]` |
|---|---|---|---|
| 2020 | 51,935 | 2,578 | 5.0% |
| 2021 | 61,409 | 3,003 | 4.9% |
| 2022 | 80,408 | 3,860 | 4.8% |
| 2023 | 67,751 | 3,384 | 5.0% |
| 2024 | `[U]` link on [IRS page](https://www.irs.gov/charities-non-profits/exempt-organizations-form-1023-ez-approvals) (updated Jun 27 2026) returns 404 | `[U]` | — |
| 2025 | not listed `[U]` | `[U]` | — |

Other facts from the NY rows (2020–2023):
- Every row shows a $275 user fee.
- 94–95% list NY as the state of incorporation; Delaware is second (70–152 a year).

### 2b. Full Form 1023 determinations for NY

The IRS publishes no NY count `[U]`. The IRS Data Book FY2025 Table 2-4 gives US totals only and does not split 1023 from 1023-EZ: 137,543 §501(c)(3) closures, 121,913 approved `[M]`.

Proxy `[CALC]`: I matched the EINs of NY §501(c)(3) organizations on the current BMF, by ruling year, against the NY EZ approval files for 2020–2023. "Not matched" means full Form 1023, an EZ approval in 2024 or later, or a filing from a non-NY address. Organizations that have since left the BMF are not counted.

| BMF ruling year | NY c3 on BMF | EIN found in NY EZ approvals 2020–23 | Not matched |
|---|---|---|---|
| 2020 | 2,797 | 1,302 (46.5%) | 1,495 |
| 2021 | 3,146 | 1,737 (55.2%) | 1,409 |
| 2022 | 4,465 | 2,359 (52.8%) | 2,106 |
| 2023 | 4,282 | 2,416 (56.4%), understated because the 2024 EZ file is missing | 1,866 |

Of 12,637 distinct NY EZ approval EINs from 2020–2023, 8,230 are still on the NY BMF `[CALC]`.

Vendor claim on the form split: InstantNonprofit says "About 88% of our customers qualify for Express" (its 1023-EZ tier). Its intake quiz says "~80% choose" under $50k `[M-vendor]`.

### 2c. Current IRS processing times

See step 5 in §1: EZ 80% within 22 days; full 1023 80% within 191 days; 1024 80% within 210 days; 1024-A 80% within 229 days `[M]` (page updated Oct 29 2026).

### 2d. Does any IRS dataset record a paid preparer?

- **1023-EZ approvals file:** there is no preparer field. The columns are: Ein, Case Number, org name/address, `Primarycontactname`, `Primarycontactphone`, `Userfeesubmitted`, officers 1–5, eligibility and purpose flags, `Mission`, `Signaturename`, `Signaturetitle`, `Signaturedate` `[M]`.
  - NY rows where the primary contact's name differs from the signer's name `[CALC]`: 2020 857/2,578 (33.2%); 2021 984/3,003 (32.8%); 2022 1,367/3,860 (35.4%); 2023 1,292/3,384 (38.2%). This does not show the contact is paid or outside the organization.
  - Most common signer titles: President, Director, Treasurer, Executive Director.
- **Form 1023 and 1023-EZ instructions:** the word "preparer" appears 0 times in either. The 1023-EZ form has no preparer block `[M]`.
- **EO BMF:** no preparer field (codebook) `[M]`.
- **NY CT-247:** does have a paid-preparer block (see §1, step 8) `[M]`.

---

## 3. DOS open data: new NY not-for-profit corporations in 2025

**By type** (`n9v6-gdp6`, still-active entities with initial filing date in 2025; total 6,294) `[M]`:

| Entity type | 2025 |
|---|---|
| DOMESTIC NOT-FOR-PROFIT CORPORATION | 6,130 |
| … (HOUSING DEVELOPMENT FUND COMPANY) (ARTICLE XI) | 138 |
| … (BOARD OF TRADE AND CHAMBER OF COMMERCE) | 16 |
| … (LOCAL DEVELOPMENT CORPORATION) | 5 |
| … (FIRE CORPORATION) | 4 |
| … (PUBLIC CEMETERY CORPORATION) | 1 |

- Neither dataset records charitable vs non-charitable (N-PCL §201) `[U]`.
- The all-filings dataset `63wc-4exh` (which includes entities since dissolved) shows 6,273 NFP Certificates of Incorporation filed in 2025. Other 2025 NFP filings in it: 1,569 assumed-name certificates, 924 amendments, 827 certificates of change, 293 dissolutions `[M]`.

**By county, top 15** (`n9v6-gdp6` county field, 2025) `[M]`:

| # | County | 2025 | # | County | 2025 |
|---|---|---|---|---|---|
| 1 | New York | 1,111 | 9 | Albany | 178 |
| 2 | Kings | 844 | 10 | Rockland | 148 |
| 3 | Queens | 693 | 11 | Orange | 119 |
| 4 | Nassau | 461 | 12 | Richmond | 113 |
| 5 | Suffolk | 399 | 13 | Onondaga | 97 |
| 6 | Westchester | 351 | 14 | Dutchess | 93 |
| 7 | Bronx | 344 | 15 | Ulster | 64 |
| 8 | Erie | 297 | | | |

The five NYC counties total 3,105, which is 49.3% of 6,294 `[CALC]` (1,111+844+693+344+113).

**Who filed NFP certificates.** Filer name on DOS daily dataset `k4vb-judh`, NFP Certificates of Incorporation approved Oct 19–Nov 16 2026, n=629 `[M]`. Individuals' names are omitted.

| Filer | Filings | Filer | Filings |
|---|---|---|---|
| LegalZoom.com, Inc. (CA) | 44 | Corporation Service Company | 6 |
| Inc Authority, LLC (NV) | 24 | USACorp Inc. | 5 |
| Gerald Weinberg, P.C. (NY) | 16 | Bond, Schoeneck & King, PLLC | 5 |
| United Corporate Services, Inc. | 14 | Delaney Corporate Services | 5 |
| Swyft Filings (TX) | 13 | Servico, Inc. | 5 |
| Premier Corporate Services (NJ) | 7 | Cannon Heyman & Weiss, LLP | 3 |
| Registered Agent Solutions | 7 | C T Corporation System | 3 |

- 223 of 629 filings (35.5%) carry a filer name containing a business, law-firm or service word `[CALC]`.
- 496 of 629 (78.9%) list an NY filer address.
- James Hsui, PLLC appears twice.

---

## 4. Yearly filings

### 4a. NY organizations by IRS filing requirement (EO BMF NY, 125,622 records) `[M]`

Codes are from the [BMF codebook](https://www.irs.gov/pub/foia/ig/tege/eo-info.pdf):

| FILING_REQ_CD | Meaning | NY count |
|---|---|---|
| 02 | Required to file 990-N (income < $50,000) | 55,128 |
| 01 | 990 (all other) or 990-EZ | 35,437 |
| 06 | Not required (church) | 21,184 |
| 00 | Not required (all other) | 12,988 |
| 13 | Not required (religious org) | 650 |
| 14 | Not required (instrumentality) | 142 |
| 07 / 03 | Government 501(c)(1) / group return | 48 / 45 |
| PF_FILING_REQ_CD = 1 | **990-PF** | **12,380** |

The BMF does not separate 990 from 990-EZ. Splitting codes 01+02 (90,565 orgs) by the INCOME_AMT and ASSET_AMT from each org's latest return, using IRS form thresholds `[CALC]`:
- income ≤ $50k: 49,352
- $50k < income < $200k and assets < $500k (990-EZ range): 10,334
- income ≥ $200k or assets ≥ $500k (full 990): 23,494
- no amount on file: 7,385

### 4b. Charities Bureau filers by revenue tier

Not published `[U]`. The thresholds are in 08: no accountant's report up to $250k, CPA review report to $1M, audit above $1M `[M]` [CHAR500-C instructions](https://ag.ny.gov/sites/default/files/regulatory-documents/char500-Ci.pdf).
- New fact: "All filings have an automatic 6 month extension applied" `[M]`.
- Registrant count: over 102,000 (08).

### 4c. NY organizations on the IRS automatic revocation list `[M]`

Source: `data-download-revocation.txt`, Nov 17 2026. 74,130 NY rows out of 1,248,282 US rows.

| Year | NY by revocation date | NY by posting date | of which §501(c)(3) (posting yr) | US by posting date |
|---|---|---|---|---|
| 2021 | 2,627 | 2,139 | 1,847 | 37,194 |
| 2022 | 2,793 | 3,053 | 2,304 | 59,787 |
| 2023 | 3,029 | 2,927 | 2,451 | 60,101 |
| 2024 | 3,126 | 3,228 | 2,658 | 66,286 |
| 2025 | 2,777 | 2,878 | 2,458 | 58,831 |
| 2026 (to Nov 17) | 2,234 | 2,715 | 2,351 | 53,120 |

- 11,581 of the 74,130 NY rows (15.6%) carry an exemption-reinstatement date `[CALC]`.
- The reinstatement date is an effective date and can be retroactive, so reinstatement counts by year are not meaningful.

### 4d. Reinstatement steps and fee `[M]`

- **Process:** file a new Form 1023 or 1023-EZ and pay the same user fee ($600 or $275) under Rev. Proc. 2014-11 ([IRS page, updated Oct 9 2026](https://www.irs.gov/charities-non-profits/automatic-exemption-revocation-for-nonfiling-reinstating-tax-exempt-status); 1023-EZ instructions Part V).
- **Section 4 (streamlined retroactive):** for organizations that were eligible for 990-EZ or 990-N in each of the three missed years, revoked for the first time, and filing within 15 months of the later of the revocation letter or list posting. Can be done on the 1023-EZ.
- **Sections 5 and 6 (retroactive):** require the full 1023, a reasonable-cause statement and the missing returns.
- **Section 7:** reinstatement effective from the filing date. Can be done on the 1023-EZ.
- 1023-EZ processing times apply.

---

## 5. Providers: own-page prices and inclusions

### 5a. National providers

| Provider | Price (own page) | Includes | Tag |
|---|---|---|---|
| Foundation Group SureSTART (also shown on Harbor Compliance) | Express **$1,499** · Core **$2,499** · Complete **$3,499**, + filing fees | Express: EIN, incorporation, bylaws template, 1023-EZ only, 30-day SurePLAN trial. Core: 1023 or 1023-EZ, approval guarantee, personal specialist, first-year registered agent, conflict policy. Complete: adds one year of SureCOMPLY (990 preparation, state fundraising registration) | `[M]` [501c3.org Express](https://www.501c3.org/501c3-services/surestart-express/), [harborcompliance.com/nonprofit](https://www.harborcompliance.com/nonprofit) |
| Foundation Group 990, charity registration, reinstatement (ReSTART) | No price; quote or questionnaire | — | `[M]` (501c3.org service pages) |
| BryteBridge | No prices. "All services are now fulfilled by Foundation Group" (SureSTART, SureCOMPLY, ReSTART) | — | `[M]` [brytebridge.com/pricing](https://brytebridge.com/pricing/) |
| Harbor Compliance | Formation is referred to Foundation Group ("Services from $1,499"). Charitable registration: no price (08) | — | `[M]` |
| InstantNonprofit | Express **$877** (or $317 × 3) · Enterprise (full 1023) **$1,497** (or $547 × 3) · Private Foundation $1,997 · 501(c)(4) $1,497; + state and government fees | "200% 501(c)3 Approval". Express "4-10 weeks average"; Enterprise "6-16 weeks". Auto-Pilot annual plan (990-N plus state report) has no price shown | `[M]` [instantnonprofit.com](https://instantnonprofit.com/) |
| Nonprofit Elite | No fixed price. Form 1023 page: "Do you really want to pay $2,500-$5,000… we'll complete your application for half" | — | `[M]` [nonprofitelite.com](https://nonprofitelite.com/501c3-services/irs-form-1023/) |
| Chisholm Law Firm, PLLC (Florida, virtual, all 50 states) | No price on its site; "Free Consultation (Value: $450)" | — | `[M]` [chisholmfirm.com](https://chisholmfirm.com/lawyer-referral/) |
| Northwest Registered Agent | **Does not offer it.** "Northwest does not currently handle the full formation process for nonprofit corporations in New York" | — | `[M]` [NW NY nonprofit](https://www.northwestregisteredagent.com/nonprofit/new-york) |
| LegalZoom | $99 / $239 / $359 + state fee (formation only, see 08) | — | `[M]` (08) |
| Rocket Lawyer | "$0" first registration with membership; additional registrations $99. Membership price not shown on that page | Formation; "guidance" on the 501(c)(3) application | `[M]` [rocketlawyer.com/nonprofit](https://www.rocketlawyer.com/nonprofit) |
| Swyft Filings | Basic $0 · Standard $169 (list $199) · Premium $269 (list $299), + state fees. "The separate federal application" is extra | Basic: articles in 7–10 business days. Standard adds bylaws and resolutions in 3 days. Premium: 1 day | `[M]` [swyftfilings.com/nonprofit](https://www.swyftfilings.com/nonprofit/) |
| Inc Authority | "Starting at $0 + filing fees" | Formation | `[M]` [incauthority.com/nonprofit](https://www.incauthority.com/nonprofit/) |
| MyCorporation | "$99 + state fees" | — | `[S]` search snippet; page renders no price |
| Beacon Nonprofit | "Starting at $99 + state filing fees" | — | `[M]` [beaconnonprofit.com](https://www.beaconnonprofit.com/) |
| ZenBusiness | Not offered: "we don't support nonprofit corporation formations at this time" | — | `[S]` |
| Resilia | Pricing page redirects to a sign-up page with no price | — | `[U]` |
| Wylie Advisory "Startup Navigator" | "From $2,000" | Formation guidance, governance, exemption application, compliance | `[M]` [wylieadvisory.com](https://wylieadvisory.com/start-a-nonprofit/new-york/costs) |

### 5b. New York–specific firms and providers with published fees

| Provider | Price | Includes | Tag |
|---|---|---|---|
| **James Hsui, PLLC** (25 Broadway, NYC) | NY NFP + standard 1023 package **$5,589**; NY NFP + 1023-EZ package **$3,289**; Delaware + NY registration packages $5,989 and $3,689. Formation alone "starting at $1,989". 1023 alone "starting at $1,889 (1023-EZ) and $4,389 (1023)". Form 1023 schedules $1,200 each. All exclude state and IRS fees | Certificate, DOS filing, bylaws, conflict policy, resolutions, EIN, 1023 or 1023-EZ, CHAR410, ST-119.2, CT-247, NYC exemption affidavit | `[M]` [jameshsuilaw.com](https://www.jameshsuilaw.com/form-new-york-501c3/) |
| **New York Council of Nonprofits (NYCON)** Legal Services Group | "Costs for proper formation can range from **$4,235 to $6,585** or more"; process "6-12 months"; NYCON membership required | Legal formation support | `[M]` [nycon.org](https://www.nycon.org/resources/start-a-nonprofit) |
| **Nick Spradlin** (attorney site, NY page) | "New York Nonprofit Company **$445** + $75 State Filing Fee"; "501c3 Starting at **$699** + Filing Fees" | Attorney fees, EIN, lifetime registered agent, certificate, minutes and bylaws, name search | `[M]` [nickspradlin.com/newyork](https://www.nickspradlin.com/newyork/) |
| **terms.law** (attorney's NY formation page) | "Nonprofit / Professional Package **$960–$1,440** (4–6 hrs)"; $300/hr otherwise | NFP or PLLC/PC filings, Charities Bureau registration, 1023 or 1023-EZ | `[M]` [terms.law](https://terms.law/2025/06/27/how-i-form-new-york-companies/) |
| Lawyer for Business (NYC) | Nonprofit pages show no price; "expect to spend about $2,750 in total, when you include lawyer fees" | — | `[M]` |
| Lawyers Alliance for New York | "a minimum of $350" (government fees); no fee schedule | — | `[S]` search snippet, PDF dated Feb 2 2026 |
| Contracts Counsel marketplace (NY 501(c)(3) post) | 6 lawyer bids, $500–$2,500 flat | — | `[S]` |

### 5c. Yearly-service prices

| Service | Provider: price | Tag |
|---|---|---|
| 990-N | IRS: free. Tax990 $19.90 self-file, $49.90 "Full Service"; File990 $54.99 per filing | `[M]` [tax990 pricing](https://www.tax990.com/pricing/), [file990 pricing](https://www.file990.org/pricing) |
| 990-EZ | Tax990 $109.90; File990 $84.99 (software e-file, not preparation) | `[M]` |
| 990 / 990-PF | Tax990 $229.90 / $199.90 (e-file software) | `[M]` |
| 990 preparation by a firm | Foundation Group: quote only. Nonprofit Elite: none | `[M]` |
| CHAR500 preparation | No published price found | `[U]` |
| Multi-state charity registration | Labyrinth "Nonprofit Essentials" **$500/yr per state** (list $900), for 1–3 states, includes registration, registered agent, annual report. CSC $240 per state/entity, Charity Compliance Solutions $120 per state for INN members (2022 chart) | `[M]` [labyrinthinc.com](https://labyrinthinc.com/offer-solutions-csr/); others `[S]` |
| Reinstatement | Foundation Group ReSTART: quote only. No flat price found elsewhere | `[M]` / `[U]` |
| Annual compliance bundle | Foundation Group SureComply valued at $2,000/yr on its own page (08). InstantNonprofit Auto-Pilot: no price | `[M]` |

---

## 6. Who shows up for the four searches

Google, run in the desktop app's built-in browser on Nov 18 2026 from the owner's Mac (location as Google infers it). The order is as displayed. Organic results exclude the AI overview, "People also ask" and duplicates `[M]` (pages viewed).

| Query | Advertisers (top and bottom ad blocks) | Top 8 organic |
|---|---|---|
| start a nonprofit in new york | LegalZoom; **Chisholm Law Firm, PLLC**; Swyft Filings ("$0 - File a New York Nonprofit"); Inc Authority ("Free New York NonProfit"); bottom: LegalZoom, Chisholm | 1 NYCON · 2 dos.ny.gov NFP certificate page · 3 Lawyers Alliance for NY PDF · 4 NYC Business (nyc-business.nyc.gov) · 5 Labyrinth · 6 Albany Law School PDF · 7 Harbor Compliance · 8 Tax990 |
| new york nonprofit formation service | LegalZoom; Chisholm Law Firm; Swyft Filings; bottom: LegalZoom, Chisholm | 1 NYCON · 2 dos.ny.gov · 3 Northwest RA · 4 Perlman & Perlman (NYC firm) · 5 NYC.gov nonprofits · 6 James Hsui, PLLC · 7 Labyrinth · 8 Foundation Group |
| 501c3 application new york | **None shown** | 1 dos.ny.gov · 2 Foundation Group · 3 IRS "How to apply" · 4 Lawyers Alliance PDF · 5 dos.ny.gov NFP instructions PDF · 6 NYCON · 7 Beacon Nonprofit · 8 James Hsui, PLLC |
| form a nonprofit new york cost | **None shown** | 1 dos.ny.gov · 2 NYCON · 3 Foundation Group · 4 Albany Law School PDF · 5 Northwest RA · 6 Lawyers Alliance PDF · 7 Harbor Compliance · 8 NYLPI PDF |

A different search engine (the WebSearch tool, which shows no ads) ranked LegalZoom, Labyrinth, Harbor, Swyft, MyCorporation, ZenBusiness, FindLaw and Zeffy guides near the top `[S]`.

**Keyword volume and CPC.** Source: seodata.dev, which says its figures come "from the Google Ads API"; US monthly averages; queried Nov 18 2026 `[S]`.

| Term | Monthly searches | CPC |
|---|---|---|
| start a nonprofit in new york | 110 | $22.10 |
| how to start a nonprofit in new york | 110 | $6.92 |
| how to start a non profit in new york | 140 | $10.63 |
| start a non profit in ny | 140 | $29.83 |
| how to register a nonprofit in new york | 110 | $23.29 |
| how to start a 501c3 in ny | 40 | $13.67 |
| new york nonprofit formation service / 501c3 application new york / form a nonprofit new york cost | 0 (no data) | — |
| 501c3 application (US) | 6,600 | $11.87 |
| start a nonprofit (US) | 4,400 | $22.10 |
| how to start a non profit (US) | 12,100 | $9.02 |
| nonprofit formation services (US) | 480 | $38.71 |
| char500 | 880 | $12.58 |
| 990-n filing | 3,600 | $4.61 |
| 501c3 reinstatement | 170 | $18.29 |

---

## 7. Size evidence for the specialists

| Provider | Evidence | Tag |
|---|---|---|
| BryteBridge (owns Foundation Group) | "45,000+ nonprofits helped since 2004", "150+ team members", "BryteBridge acquired Foundation Group in 2025" | `[M]` own page |
| | Acquisition announced Nov 12 2025; terms undisclosed; backed by RFE Investment Partners and Knox Capital (invested Dec 2023); combined "over 70,000 nonprofits" | `[S]` press coverage |
| Foundation Group | Conflicting counts: "50,000 IRS approvals" (own page); "over 75,000" (Harbor page); "more than 25,000 organizations" (Nov 2025 press release) | `[M]` / `[S]` |
| Harbor Compliance | "Rated 4.6 / 5 by 84 clients on Google" (nonprofit page); 4.3 (212) Google stars shown in search results | `[M]` |
| InstantNonprofit | "Trusted by 5,000+ Nonprofits"; Built In: 3 employees, founded 2014, Denver; the company's own pages give other counts (3,000 / 4,000 / 5,000+) | `[M]` / `[S]` |
| Chisholm Law Firm | "helped over 6,500 clients gain their 501c3 status"; "since 2010" | `[M]` |
| LegalZoom | 4.8 stars, 27,576 reviews (Google ad extension) | `[M]` |
| Inc Authority | "4.8 Excellent 49,918 reviews" | `[M]` |
| Beacon Nonprofit | "Join 33,000+ Founders" | `[M]` |
| DOS filer counts (Oct 19–Nov 16 2026, n=629) | LegalZoom 44, Inc Authority 24, Gerald Weinberg P.C. 16, United Corporate Services 14, Swyft 13 | `[M]` §3 |
| Revenue for any of the above | — | `[U]` |

---

## 8. Legal lines

- **IRS signing and representation** `[M]` (i1023 Rev. 12-2024; i1023ez Rev. 1-2025):
  - An officer, director or trustee must sign either form.
  - A Form 2848 representative "may not sign the application" unless also an officer.
  - Form 8821 lets the IRS "discuss your application" with a named person but "doesn't authorize… to represent you".
  - Neither form has a paid-preparer block, and neither set of instructions uses the word "preparer".
  - Representation rules (attorney, CPA, EA, limited unenrolled preparers): see 08 (Form 2848 instructions).
- **NY CT-247** asks a paid preparer for firm EIN, PTIN and NYTPRIN or an exclusion code `[M]`.
- **ST-119.2:** a non-officer contact needs a power of attorney `[M]`.
- **NY Judiciary Law §495** `[M]` [JUD/495](https://www.nysenate.gov/legislation/laws/JUD/495) (via WebFetch summary):
  - A corporation may not "hold itself out to the public as being entitled to practice law, or to render legal services or advice," nor "render legal services of any kind."
  - Exceptions: title insurers; Article 15 / 15-A professional corporations; prepaid legal plans; and nonprofits that provide legal services incidentally to another primary purpose.
  - §478 bars natural persons from practicing law for others (search summary) `[S]`.
- **NY enforcement found:**
  - NY AG v. Legal Docs by Me (Watertown document-preparation firm): alleged unauthorized practice and deceptive pricing; ordered to repay consumers `[S]` (cnybj.com). The documents involved are not stated as nonprofit forms.
  - *Sussman v. Grado* (NY District Court): an independent paralegal preparing a legal document without attorney supervision was held to be unauthorized practice `[S]`.
  - The NYSBA and NYCLA drafted "Best Practices Guidelines for On-Line Document Providers," approved by the ABA House of Delegates in Aug 2019. Not binding NY law `[S]` (legal500/Mondaq, Sep 17 2019).
- **Not found:** any NY AG, court or bar opinion specifically about non-attorneys preparing NFP certificates, the 1023, or CHAR410 `[U]`.

---

## 9. Sister sites: cheapnewyorkllc.com and nyllc.com

Both sitemaps were expanded (Wix; cheapnewyorkllc.com 5 pages, nyllc.com 18 pages) and every page fetched. Zero matches for "not-for-profit", "nonprofit", "non-profit", "501(c)", "501c3" or "charit" on any page `[M]`, Nov 18 2026.
- The nyllc.com services page lists LLC services, a PLLC at $885, "Licenses & permits Varies" and "Something else… Ask". It lists no NFP formation.
- **Not-for-profit formation offered on either site: `[U]`** (no page found).

---

## 10. PC triennial statement (BCL §1514)

| Item | Fact | Tag |
|---|---|---|
| Statute | "at least once every three years on or before the date prescribed by the licensing authority"; lists each shareholder, director and officer with residence address and certifies their licensure; signed by the president or a VP and attested by the secretary or an assistant secretary | `[M]` BCL §1514 (WebFetch summary) |
| Where filed | NYSED Office of the Professions, Professional Corporation Unit (for NYSED-licensed professions) | `[M]` |
| Fee | **$105** "Triennial Statement (every 3yrs)", for both P.C. and D.P.C. Foreign PC annual statement $35 (due July 1) | `[M]` [op.nysed.gov section XI](https://www.op.nysed.gov/corporate/disclaimer/section-xi), [section 12 FAQ](https://www.op.nysed.gov/corporate/disclaimer/section-12) |
| Form / method | NYSED mails a pre-printed statement: "Triennial statements are routinely mailed by the Division of Professional Licensing Services." Online filing or payment: "No, all documents and fees must be mailed in. Payments must be made by check or money order" | `[M]` [section III](https://www.op.nysed.gov/corporate/disclaimer/section-iii), section 12 |
| Reminder | The mailed statement is the reminder. "It is the corporation's responsibility to maintain a current address… and to return these completed statements… in a timely manner." If not received, contact the PC Unit by Contact Us form | `[M]` |
| Penalty for missing it | None in the statute, and none on the NYSED pages read. A late fee ($10 per month) is listed only for Certificates of Authorization (engineering, geology, surveying) | `[U]` |
| Active domestic PCs | 59,657 (08) | `[M]` |
| Services charging to file it | None found | `[U]` |

---

## 11. Not found / not verified

1. IRS 1023-EZ approvals for 2024 (link returns 404) and 2025 (not listed). The IRS publishes no NY count of full Form 1023 determinations; §2b gives only an EIN-match bound.
2. DOS-published processing time for NFP certificates. The e-Corp portal page would not load, so whether an NFP certificate can be filed online is unconfirmed (DOS page says mail or email; Swyft says online).
3. Processing times and fees for OCFS, DOH/PHHPC, OASAS and AG Antitrust consents. Processing times for CHAR410, ST-119.2 and CT-247 (only vendor or snippet figures).
4. Charities Bureau filer counts by revenue tier.
5. Reliable advertiser lists: only one geography and one time snapshot. No Google Keyword Planner access; seodata.dev is a third-party tool.
6. Prices not published or not found: Foundation Group 990, registration and ReSTART; Chisholm; Nonprofit Elite (fixed); Resilia; Rocket Lawyer membership; MyCorporation (snippet only); CHAR500 preparation; reinstatement flat fees.
7. Revenue for any provider. The three published Foundation Group nonprofit counts disagree (25,000 / 50,000 / 75,000).
8. Any NY AG, court or bar ruling specific to non-attorney NFP or 1023 preparation.
9. BCL §1514 penalty, and any service selling triennial-statement filing.
10. NFP formation on cheapnewyorkllc.com or nyllc.com: no page found on either site.
