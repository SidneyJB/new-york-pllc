# 08 — NY nonprofit formation, beneficial-ownership filings, other recurring entity filings, apostilles

Research date: Nov 18 2026. Facts only, per the [brief](README.md). Tags: `[M]` primary source opened · `[S]` secondary or snippet · `[U]` not found or not opened · `[CALC]` arithmetic on source figures.

**Method limit:** the shared web-search budget ran out partway through. After that I only opened URLs I already had or could reach from provider homepages. Several provider prices and the NY law-firm flat fees are therefore `[U]` (see §E).

Datasets pulled (all read-only):
- NY DOS "Active Corporations: Beginning 1800", data.ny.gov `n9v6-gdp6`, via the Socrata API. The latest filing date in the data is 2026-11-13. It **holds active entities only**, so dissolved or merged entities drop out of the yearly counts.
- IRS Exempt Organizations Business Master File, NY extract `irs.gov/pub/irs-soi/eo_ny.csv` (Last-Modified 2026-11-09).
- IRS Form 1023-EZ approvals spreadsheets for 2022 and 2023 (`irs.gov/pub/irs-tege/f1023ez-approvals-2022.xlsx`, `…-2023.xlsx`). The 2024 file at `irs.gov/system/files/irs-tege/f1023ez-approvals-2024.xlsx` returned an HTML page instead of the spreadsheet `[U]`.
- IRS Data Book FY2025 Table 2-4 (`irs.gov/pub/irs-soi/25db-2-04-eo.xlsx`).
- FinCEN BOI final-rule PDF (`fincen.gov/system/files/2026-08/BOIFinalRuleforFR.pdf`).

---

## A. New York not-for-profit corporation + federal/state tax exemption

### A1. What it is and who buys it
- A NY not-for-profit corporation is formed by filing a Certificate of Incorporation with DOS under N-PCL Article 4. Fee $75 `[M]` [dos.ny.gov/certificate-incorporation-domestic-not-profit-corporations-0](https://dos.ny.gov/certificate-incorporation-domestic-not-profit-corporations-0) and [dos.ny.gov/fee-schedules](https://dos.ny.gov/fee-schedules). The DOS page states: "Certain activities and purposes also require the consent or approval from another state agency prior to filing."
- **N-PCL §404 consents** `[M]` [nysenate.gov/legislation/laws/NPC/404](https://www.nysenate.gov/legislation/laws/NPC/404). Purpose → approving body:
  - (a) trade or business association → Attorney General
  - (b)(1) child welfare, child placement, domestic-violence residential programs, shelters for unmarried mothers → Office of Children and Family Services; adult care facilities → Commissioner of Health
  - (c) hospital, medical or dental expense indemnity → Superintendent of Financial Services and Commissioner of Health
  - (d) schools, post-secondary institutions, libraries, museums, historical societies → Commissioner of Education; colleges and universities → Regents
  - (e) cemetery → Cemetery Board
  - (f) fire corporation → local officials
  - (g) prevention of cruelty to animals → ASPCA, or a Supreme Court order
  - (h) YMCA → chair of the YMCA national board
  - (i) armed-forces solicitation → Adjutant General
  - (j) labor or "union" names → Industrial Board of Appeals
  - (k), (l), (v) savings-bank life insurance, insurance associations, nonprofit property/casualty insurers → Superintendent of Financial Services
  - (m) political-party name → chair of that party's county committee
  - (n) "American Legion" in the name → Department of New York, American Legion
  - (o), (t) hospitals and health-related facilities → Public Health and Health Planning Council
  - (p) PHL Article 44 medical corporations → Commissioner of Health plus the Council
  - (q) facilities needing a mental-health operating certificate → Commissioner of Mental Health
  - (r) HMOs → Commissioner of Health
  - (u) substance-abuse programs → OASAS commissioner
  - Subdivision (s) did not appear in the text retrieved.
- **Federal:** IRS recognition under §501(c)(3) via Form 1023 (user fee $600) or Form 1023-EZ (user fee $275) `[M]` [irs.gov/charities-non-profits/form-1023-and-1023-ez-amount-of-user-fee](https://www.irs.gov/charities-non-profits/form-1023-and-1023-ez-amount-of-user-fee). Form 1023 must be filed electronically through Pay.gov `[M]` [irs.gov/forms-pubs/about-form-1023](https://www.irs.gov/forms-pubs/about-form-1023).
- **NY Charities Bureau:** Executive Law §172(1) says a charitable organization that intends to solicit in NY "shall, prior to any solicitation, file with the attorney general a prescribed registration form" (Form CHAR410). The fee is $25 under §172(3) `[M]` [nysenate.gov/legislation/laws/EXC/172](https://www.nysenate.gov/legislation/laws/EXC/172). The registration portal and instructions on charitiesnys.com returned HTTP 500 on Nov 18 2026 `[U]`.
- **NY state tax:**
  - Sales-tax exemption: application Form ST-119.2; certificate ST-119 with a six-digit exemption number. Corporation franchise tax exemption: Form CT-247, with the IRS letter, articles and bylaws attached. `[S]`: search-result summaries of tax.ny.gov pages and forms ([tax.ny.gov/bus/st/exempt.htm](https://tax.ny.gov/bus/st/exempt.htm), [ct247.pdf](https://www.tax.ny.gov/pdf/current_forms/ct/ct247.pdf)); the pages were not opened.
  - Fees for ST-119.2 and CT-247: `[U]`.

### A2. Annual volume
**New NY not-for-profit corporations** (DOS active-entity dataset; entity types beginning "DOMESTIC NOT-FOR-PROFIT CORPORATION", which includes subtypes) `[M]` data.ny.gov `n9v6-gdp6`, queried Nov 18 2026. Counts are still-active entities only, so earlier years are understated by later dissolutions.

| Year | Still-active NFPs formed that year |
|---|---|
| 2019 | 5,637 |
| 2020 | 5,778 |
| 2021 | 5,839 |
| 2022 | 5,520 |
| 2023 | 6,081 |
| 2024 | 6,212 |
| 2025 | 6,294 |
| 2026 (Jan 1–Nov 13) | 5,611 |

Stock of active domestic NFPs in the same dataset `[M]`:
- 288,531 "DOMESTIC NOT-FOR-PROFIT CORPORATION"
- plus subtypes: 3,441 HDFC (Art. XI); 111 Board of Trade; 85 faculty practice; 46 mental-health companies; others under 30 each
- 10,249 foreign NFPs

**IRS 1023-EZ approvals** (IRS approvals spreadsheets, counting the "State" column) `[M]`:

| Year | US | NY | NY share |
|---|---|---|---|
| 2022 | 80,408 | 3,860 | 4.80% `[CALC]` 3,860/80,408 |
| 2023 | 67,751 | 3,384 | 4.99% `[CALC]` 3,384/67,751 |

The 2024 file did not download and no 2025 file is listed `[U]`.

**All 501(c)(3) rulings for NY orgs, by IRS ruling year** (EO BMF NY extract, SUBSECTION=03; covers both 1023 and 1023-EZ; only organizations still on the BMF) `[M]`:

| Ruling year | NY 501(c)(3) orgs |
|---|---|
| 2019 | 3,478 |
| 2020 | 2,797 |
| 2021 | 3,146 |
| 2022 | 4,465 |
| 2023 | 4,282 |
| 2024 | 5,646 |
| 2025 | 6,325 |
| 2026 (to Nov 9 file date) | 5,003 |

The NY BMF holds 125,622 records in total, 107,519 of them §501(c)(3) `[M]`.

The IRS does not publish a NY split between Form 1023 (full) and 1023-EZ approvals `[U]`.

**US exempt-status closures, FY2025** (IRS Data Book Table 2-4) `[M]`:
- All types: 145,202 closures; 128,642 approved; 149 disapproved; 16,411 other
- §501(c)(3): 137,543 closures; 121,913 approved
- The table does not split Form 1023 from 1023-EZ.

**NY Charities Bureau registrants:** "more than 102,000 charities registered with the OAG Charities Bureau" `[M]` [ag.ny.gov press release, Dec 1 2025](https://ag.ny.gov/press-release/2025/attorney-general-james-releases-annual-pennies-charity-report). A secondary summary of the report text gives 102,194 as of Oct 2025 and 98,127 as of Oct 2024 `[S]`.

### A3. Who sells it (own pages)

| Provider | Price | Includes | Tag / URL |
|---|---|---|---|
| LegalZoom | Economy $99, Standard $239, Express Platinum $359, each + state fee | Articles filing and name check. Standard adds a founder's kit and minutes forms. Platinum adds 1–2 day processing, a discounted EIN and a legal-plan trial that renews at $49/mo. No package lists 501(c)(3) prep, and no price is shown for it | `[M]` [legalzoom.com nonprofit-overview](https://www.legalzoom.com/business/business-formation/nonprofit-overview.html) |
| Foundation Group / SureSTART (shown on Harbor Compliance's page) | Express $1,499 · Core $2,499 · Complete $3,499, + filing fees | Express: EIN, incorporation, 1023-EZ. Core: 1023 or 1023-EZ, "IRS approval guaranteed". Complete: adds one year of SureCOMPLY, including Form 990 | `[M]` [harborcompliance.com/nonprofit](https://www.harborcompliance.com/nonprofit) |
| Foundation Group (own site, 501c3.org) | No prices; "Contact us for a personalized quote" | Express / Core / Complete. Complete adds state tax exemption, state fundraising registration and a first-year 990; the page values the one-year SureComply membership at $2,000 | `[M]` [501c3.org start-a-501c3](https://www.501c3.org/501c3-services/start-a-501c3-nonprofit/) |
| Harbor Compliance: charitable registration | No price; "depend on your individual situation" | Registration specialist, optional power of attorney, portal | `[M]` [harborcompliance.com/fundraising-registration](https://www.harborcompliance.com/fundraising-registration) |
| Nonprofit Legal Center | No prices; phone 1-800-928-4161 | Packages: Full Startup, Tax Exemption, Review & Guidance, Annual Support (ASP), Fiscal Sponsorship. Items listed include articles, bylaws, IRS 501(c)(3), state tax exemption/registration and Form 990; "* = Attorney will Review" | `[M]` [nonprofitlegalcenter.com packages](https://www.nonprofitlegalcenter.com/non-profit-services/review-501c3-non-profit-service-packages/) |
| BryteBridge | — | Site returned HTTP 403 | `[U]` |
| Northwest Registered Agent | — | NY nonprofit page returned HTTP 403 | `[U]` |
| ZenBusiness | — | No nonprofit-formation page found on the site; `/nonprofit/` returns 404 and the sitemaps list none | `[U]` (not offered on site as of Nov 18 2026, per sitemap) |
| NY law firms with flat fees (3 required) | — | Not found before the search budget ran out | `[U]` |

### A4. Size evidence
- LegalZoom: "helped over 100,000 nonprofit organizations get started" `[M]` (own page).
- Foundation Group: "Over 50,000 nonprofits served", since 1995 `[M]` (501c3.org). The Harbor page says "over 75,000 nonprofits" since 1995 and that Foundation Group "Joined BryteBridge Nonprofit Solutions in 2025" `[M]`. The two counts conflict.
- Harbor Compliance: "tens of thousands of state registrations each year"; with Labyrinth it "supports over half of all nonprofits registered nationwide" (its own analysis) `[M]`.
- Revenue, funding and employee counts: `[U]`.

### A5. What it legally takes to offer it
- **IRS representation (Form 2848 instructions)** `[M]` [irs.gov/instructions/i2848](https://www.irs.gov/instructions/i2848):
  - Designations (a)–(r) include attorney, CPA, enrolled agent, officer, full-time employee, family member and unenrolled return preparer.
  - Unenrolled return preparers "may only represent taxpayers before revenue agents" and customer-service staff, only during an examination of a return they prepared and signed. They need a PTIN plus Annual Filing Season Program records.
  - "Filing a Form 8821 will not authorize the unenrolled return preparer to represent you." Form 8821 only authorizes someone to "inspect and/or receive your confidential tax return information."
- Whether Form 1023 has a paid-preparer signature block, and any IRS rule barring non-attorneys from preparing a 1023 the organization signs itself: `[U]` (form not opened).
- **NY unauthorized practice:** Judiciary Law §484 bars non-lawyers from taking compensation for drawing real-estate instruments, instruments disposing of property after death, and court pleadings. Certificates of incorporation are not named in it `[M]` [nysenate.gov JUD/484](https://www.nysenate.gov/legislation/laws/JUD/484). No NYSBA or NYS court opinion on non-attorney NFP-formation or 1023 preparation was found `[U]`.

### A6. The work
- **DOS certificate:** paper filed by mail to One Commerce Plaza, Albany, or by email with a credit-card authorization form. The DOS page does not mention online filing. $75, with optional expedite of $25 (24h), $75 (same day) or $150 (2h) `[M]` (DOS pages above). Any §404 consent is attached before filing.
- **IRS:** Form 1023 or 1023-EZ online through Pay.gov `[M]`. Processing times: `[U]` (IRS page not reached).
- **Charities Bureau:** CHAR410, fee $25 under Exec. Law §172 `[M]`. Portal and processing time: `[U]`.
- **Tax Department:** ST-119.2 and CT-247 `[S]`.

### A7. Recurrence
- **CHAR500 annual filing.** Executive Law §172-b `[M]` [nysenate.gov EXC/172-B](https://www.nysenate.gov/legislation/laws/EXC/172-B):
  - $25 fee.
  - Due "on or before the fifteenth day of the fifth calendar month" after fiscal-year end.
  - CPA review report if revenue is $250,000 to $1,000,000; CPA audit if over $1,000,000.
- **CHAR500 form (2020 version)** `[M]` [ag.ny.gov CHAR500_2020_0.pdf](https://ag.ny.gov/sites/default/files/regulatory-documents/CHAR500_2020_0.pdf):
  - 7A fee: $0 if exempt (NY contributions ≤ $25,000), otherwise $25.
  - EPTL fee: $0 if exempt; otherwise by net worth: $25 (<$50k), $50 (<$250k), $100 (<$1M), $250 (<$10M), $750 (<$50M), $1,500 (≥$50M).
  - DUAL filers pay both.
  - The 2020 form's $750k audit line is superseded by the statute's $1M.
- **CHAR500 instructions (updated Jan 2021)** `[M]` (same PDF set): EPTL filers are due within 6 months, with an automatic extra 180 days. Penalty: "The Attorney General may cancel the registration of or seek civil penalties."
- **Form 990 / 990-EZ / 990-N:** annual. Automatic revocation after three consecutive years of non-filing is under IRC §6033(j) `[S]` (statute not opened this session).
- **DOS:** no biennial statement for NFPs is listed on the DOS NFP certificate page `[M]` (silence only).

### A8. Advertising limits
Google Ads "Government documents and services" policy `[M]` [support.google.com/adspolicy/answer/13156083](https://support.google.com/adspolicy/answer/13156083), fetched Nov 18 2026:
- "Only certified governments and authorized providers may run ads that promote direct acquisition of specific government documents and services."
- The "Business identifiers" category lists "Employer Identification Number (EIN) in the United States" and "Applying for a company registration number".
- Ads in scope get an automatic "Not a government website" disclosure.
- The category list I extracted does not name tax-exempt status, charity registration or apostilles.

### A9. Search demand
`[U]`.

---

## B. Beneficial-ownership filings

### B1. New York LLC Transparency Act (LLCL §1106–1108 as enacted; DOS administers)
**Department of State, own pages** `[M]` [dos.ny.gov/beneficial-owner-disclosure](https://dos.ny.gov/beneficial-owner-disclosure) and [FAQ](https://dos.ny.gov/beneficial-ownership-disclosure-frequently-asked-questions), fetched Nov 18 2026; no last-updated date shown.
- **Scope, as DOS states it:**
  - The requirement covers "non-exempt limited liability companies that were formed under the law of a foreign country" and are authorized to do business in NY.
  - FAQ definition: a reporting company is "a limited liability company that was formed outside of the United States", is authorized to do business in New York, and is not an exempt company.
  - The FAQ also states that domestic NY LLCs, and LLCs formed in another US state or territory (including Puerto Rico) that are authorized in NY, are exempt.
- **Beneficial owner:** anyone with substantial control, or who owns or controls 25% or more.
- **Deadlines:**
  - Effective January 1, 2026.
  - Entities authorized before Jan 1, 2026: file by December 31, 2026.
  - Entities authorized from Jan 1, 2026: file within 30 days of applying for authority.
  - Annual statement thereafter; the page gives no specific annual due date.
- **Fee:** $25, non-refundable, per disclosure statement or attestation of exemption.
- **Filing method:** email to dosCorpBOI@dos.ny.gov with a card-authorization form. "Please do not submit through mail or fax." "SUBMISSION PORTAL COMING SOON."
- **Penalties (FAQ):**
  - More than 30 days late → "past due"; more than two years → "delinquent".
  - AG fine up to $500 per day while past due or delinquent; the AG may seek dissolution or cancellation.
  - No filing within 30 days of a DOS notice → "suspended", and the entity may not conduct business in NY.
  - Curing either status requires the filing plus a $250 DOS fine plus any AG fine.
  - False information: LLCL §1108(c), Penal Law §§175.30 and 175.35.
- **Confidentiality:** exempt from FOIL; access limited to the owner, court order, government agencies and law enforcement.
- **Entity count:** DOS publishes none `[U]`.

**Amendment and veto:**
- S8432 passed the Legislature in June 2025. It would have kept domestic LLCs in scope.
- Gov. Hochul vetoed it on December 19, 2025 (Veto No. 164) `[S]` ([Sidley, Feb 2026](https://www.sidley.com/en/insights/newsupdates/2026/02/ny-llc-transparency-act-took-effect-but-governor-veto-exempts-us-formed-llcs); [Cullen](https://www.cullenllp.com/blog/new-york-governor-vetoes-amendment-to-llc-transparency-act-llcta-applies-only-to-llcs-formed-outside-the-u-s-effective-january-1-2026/)).
- Per Sidley, the narrowing comes from the Act incorporating the federal CTA "reporting company" definition, which FinCEN narrowed in March 2025 `[S]`.
- No 2026 bill, court ruling or DOS regulation on the NY Act was found `[U]`; the search budget ran out before NY Senate and Assembly trackers could be checked.

**Count proxy from the DOS active-entity dataset** `[M]` data.ny.gov `n9v6-gdp6`, foreign LLC plus foreign PLLC types, grouped by jurisdiction:
- Active foreign LLCs: 175,015; foreign PLLCs: 2,060.
- Jurisdictions outside the US: Marshall Islands 14, England-Wales 11, England 7, New Brunswick 3, Scotland 1, Northern Ireland 1, Nunavut 1, Quebec 1, Northwest Territories 1, Alberta 1, Federated States of Micronesia 1, Caroline Islands 1. That is 43 `[CALC]` (14+11+7+3+1+1+1+1+1+1+1+1), not counting Canal Zone (1).
- 3,199 records have a blank jurisdiction.
- This is not an agency count of reporting companies. Jurisdiction coding may be incomplete.

### B2. Federal Corporate Transparency Act (FinCEN)
- **FinCEN page** `[M]` [fincen.gov/boi](https://www.fincen.gov/boi):
  - FinCEN "has finalized its BOI reporting rule", announced August 11, 2026 and "became effective on August 14, 2026".
  - "U.S. companies are exempt."
  - Reporting companies are entities "formed under the law of a foreign country" and registered to do business in a US state or tribal jurisdiction. They do not report US-person beneficial owners.
  - Foreign companies registered before March 26, 2025 were due April 25, 2025. Those registered on or after that date have 30 calendar days.
- **Federal Register** `[S]`: published Aug 14, 2026, 91 FR 52508, doc 2026-16576. It finalizes the March 26, 2025 interim final rule (90 FR 13688).
- **FinCEN's counts** (final rule text, [fincen.gov BOIFinalRuleforFR.pdf](https://www.fincen.gov/system/files/2026-08/BOIFinalRuleforFR.pdf)) `[M]`:
  - "approximately 63,000 possible reporting companies" at end of 2025, of which a "total population of non-exempt reporting companies numbering approximately 28,000".
  - "approximately 13,000 have already reported as of December 31, 2025", leaving 15,000.
  - "approximately 1,800 new" reporting companies per year, out of about 4,000 new foreign companies a year (IRS data).
  - About 760,000 US-person FinCEN ID holders are relieved.
  - About 15 million reports had been received from domestic reporting companies under the original rule.
  - The interim rule had estimated about 20,000 (25,000 in 2025).
- **Litigation note on FinCEN's page:** *National Small Business United v. Yellen* (N.D. Ala., Mar 1 2024 judgment; appealed). No current-status note is given `[M]`.

---

## C. Other recurring or one-time filings for NY LLCs, PLLCs and PCs

| Filing | Agency | Who | Count of filers | Fee | Penalty | Services and prices |
|---|---|---|---|---|---|---|
| PC triennial statement (BCL §1514) | Licensing authority (NYSED for most professions) | Every professional service corporation, "at least once every three years"; lists every shareholder, director and officer and certifies they are licensed `[M]` [BSC/1514](https://www.nysenate.gov/legislation/laws/BSC/1514) | 59,657 active domestic PCs `[M]` dataset | Not in the statute. An internal pilot note says $105 "confirm live" (`p2-09-pc-pilot-2026-11-13/official-steps-and-fees.md`); NYSED site not reachable over TLS `[U]` | Not in the statute `[U]` | `[U]` |
| PLLC periodic statement to NYSED | — | LLCL §1210 contains no periodic filing (it covers death or disqualification buyouts) `[M]` [LLC/1210](https://www.nysenate.gov/legislation/laws/LLC/1210). Other LLCL sections not checked `[U]` | 54,429 active domestic PLLCs `[M]` | — | — | — |
| NYS LLC/LLP annual filing fee, IT-204-LL (Tax Law §658(c)(3)) | NYS Tax Dept | Every LLC treated as a partnership, and every disregarded LLC, with NY-source income (minimum fee applies to disregarded LLCs) `[M]` [TAX/658](https://www.nysenate.gov/legislation/laws/TAX/658) | 2,078,557 active domestic LLCs + 54,429 PLLCs in the dataset (not all owe it) `[M]` | By prior-year NY-source gross income: $25 (≤$100k), $50, $175, $500, $1,500, $3,000, $4,500 (>$25M). Due the 15th day of the 3rd month after year-end | `[U]` | `[U]` |
| NYC Unincorporated Business Tax | NYC DOF | Unincorporated "trades, professions"; partnerships and LLCs file NYC-204/204EZ, individuals and SMLLCs NYC-202; 4% rate; full credit if liability ≤ $3,400. S corps file GCT instead `[M]` [nyc.gov UBT](https://www.nyc.gov/site/finance/business/business-unincorporated-business-tax-ubt.page) | `[U]` | 4% of NYC-allocated income | `[U]` | `[U]` |
| NYC Commercial Rent Tax | NYC DOF | Tenants in Manhattan south of 96th St. Annual return if gross rent > $200,000; tax if annualized base rent ≥ $250,000; 6% rate, 35% reduction (effective 3.9%); small-business credit if income ≤ $5M and base rent < $500k. CR-A due June 20; CR-Q quarterly `[M]` [nyc.gov CRT](https://www.nyc.gov/site/finance/business/business-commercial-rent-tax-crt.page) | `[U]` | Tax as above | `[U]` | `[U]` |
| Unclaimed funds (Abandoned Property Law Art. V / §1315) | NYS OSC | "All Business Entities": cut-off 12/31, report and payment due 03/10; owner due-diligence letters 12/10 (first class) and 01/10 (certified) `[M]` [OSC calendar](https://www.osc.ny.gov/files/unclaimed-funds/reporters/pdf/calendar-of-events.pdf). Reporters page: interest for late payment; penalties for incomplete or late reports `[M]` [osc.ny.gov reporters](https://www.osc.ny.gov/unclaimed-funds/reporters) | `[U]` | No filing fee mentioned | Interest plus penalties (amounts `[U]`) | `[U]` |
| Labor-law posters | NYS DOL | NY employers. Posters cover minimum wage, discrimination, sexual-harassment policy, UI (IA 133), workers' comp/DBL, equal pay (LS 603), §740 retaliation and others. Many are downloadable; WC notices are "Supplied by employer's insurance carrier" `[M]` [dol.ny.gov/posting-requirements](https://dol.ny.gov/posting-requirements) | `[U]` | The DOL page does not state a price | `[U]` | Vendor prices `[U]` |
| Workers' comp / DBL exemption certificate (CE-200) | NYS WCB | Businesses without employees that need proof of exemption | `[U]` | `[U]` (WCB pages returned 404) | `[U]` | `[U]` |
| Annual report service (multi-state) | — | — | — | — | — | Harbor Compliance: "$199 per state plus filing fees"; volume discounts up to 40% `[M]` [harborcompliance.com/annual-report](https://www.harborcompliance.com/annual-report) |
| Privacy / data-security annual filing | — | No NY annual filing for general businesses was found. NYDFS Part 500 certification (DFS licensees only) was not verified this session `[U]` | — | — | — | — |

---

## D. Apostilles, authentications, certified documents, corporate kits

### D1. What it is
- NY DOS authenticates "public documents issued in New York State" signed by a NYS official or county clerk `[M]` [dos.ny.gov apostille](https://dos.ny.gov/apostille-or-certificate-authentication).
- **Fee:** $10 per document `[M]` [obtain-apostillecertificate-authentication](https://dos.ny.gov/obtain-apostillecertificate-authentication).
- **County clerk step first** for:
  - notarized documents (clerk of the county where the notary is commissioned)
  - local or county vital records
  - NYC non-divorce records, which go to the New York County Clerk; NYC birth and death certificates also need a "Letter of Exemplification"
- Educational documents need a notarized certification from a school official. NYS Department of Health vital records need no clerk step `[M]`.
- **County clerk fees (CPLR §8021)** `[M]` [CVP/8021](https://www.nysenate.gov/legislation/laws/CVP/8021):
  - $3 to authenticate a notary's official act
  - $10 per certificate in NYC counties, $5 elsewhere
  - $10 per certificate of exemplification
- **DOS corporate records fees** `[M]` [dos.ny.gov/fee-schedules](https://dos.ny.gov/fee-schedules): certified copy $10, uncertified $5, certificate of status $25; expedite $25, $75 or $150. Certified copies are on the brief's exclusion list, so they were not researched further.

### D2. Volume
- DOS apostille counts: `[U]`, none published on the pages opened.

### D3. Providers and prices

| Provider | Price | Tag / URL |
|---|---|---|
| newyorkapostille.com (233 Broadway, NYC) | "$50 which includes the $10 Dep't of State Fee"; $40 each for 5–10 documents; $30 each for higher counts; next-business-day pickup | `[M]` [newyorkapostille.com](https://www.newyorkapostille.com/) |
| Liberty Apostille (apostillenewyork.com) | Basic $195 (12–15 business days; $195 each additional) · Plus $395 (7–10 days; $245 each additional) · Premier $495 (3–5 days; $295 each additional). All include "NYC Certification" and state fees | `[M]` [apostillenewyork.com](https://www.apostillenewyork.com/) |
| One Day Apostille | $50 per document (company documents); 5% card fee | `[M]` [onedayapostille.com](https://www.onedayapostille.com/); state of origin not confirmed |
| USA Apostille | Company documents $50 per document + shipping; federal $85 | `[M]` [usapostille.com](https://www.usapostille.com/); which state's documents not confirmed |
| CorpKit (kits) | LLC kit $62; ThriftKit $51; Slim Line $23.25; EZ Snap Not-for-Profit kit $19.75; 3" custom minute book $84 | `[M]` [corpkit.com](https://www.corpkit.com/) |
| CorporateKit.com | Profit, nonprofit, LLC and PLLC kits $79.97; electronic kit $39.97 | `[M]` [corporatekit.com](https://www.corporatekit.com/) |
| LegalZoom | Founder's kit and minutes forms bundled in the $239 nonprofit Standard package | `[M]` (see A3) |
| Minute-book / record-keeping subscriptions | `[U]` | — |

### D4. In-person steps
DOS walk-in same-day service, 10 documents per customer `[M]` [dos.ny.gov/walk-service](https://dos.ny.gov/walk-service). No appointment requirement is mentioned.

| Office | Address | Walk-in hours |
|---|---|---|
| NYC | 123 William St., 2nd Fl. | 9:00–4:00 |
| Albany | 1 Commerce Plaza, 99 Washington Ave., 6th Fl. | 9:00–4:15 |
| Binghamton | — | 9–12 and 12:45–4 |
| Buffalo | — | 9–12 and 12:45–4 |
| Utica | — | 9–12 and 12:45–4 |

- Drop-off is available only in Albany and NYC, processed in order of receipt.
- Mail: PO Box 22001, Albany 12201-2001. Overnight: the Albany Commerce Plaza address.
- The DOS pages state no requirement that a person appear; mail is an option. The county clerk step uses the clerk's office (NYC: New York County Clerk), where walk-in vs mail rules were not checked `[U]`.

---

## E. Not found / not verified
1. Three NY law firms with published flat fees for NFP formation and 1023: not found before the search budget ran out.
2. BryteBridge and Northwest prices: sites returned 403. No ZenBusiness nonprofit product page was found.
3. IRS 1023-EZ approvals for 2024 and 2025 by state (2024 file did not download). No IRS split of NY Form 1023 (full) approvals.
4. IRS processing times for 1023 and 1023-EZ. Whether Form 1023 has a paid-preparer block.
5. Any NYSBA or court opinion on non-attorneys preparing NFP certificates, the 1023 or CHAR410.
6. CHAR410 portal steps and processing time (charitiesnys.com returned 500). ST-119.2 and CT-247 fees and processing times (tax.ny.gov not opened).
7. A DOS or agency count of NY LLC Transparency Act reporting companies. Any 2026 NY bill, regulation or court ruling on the Act.
8. NYSED fee and penalty for the PC triennial statement (op.nysed.gov TLS error; internal note says $105, unverified).
9. CE-200 workers' comp exemption details. Counts of UBT, CRT and unclaimed-funds filers. Labor-poster vendor prices.
10. DOS apostille annual volume. Minute-book subscription services.
11. Search-demand figures for all four lines.
12. Revenue, funding and employee counts for the providers.
