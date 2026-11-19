# 10 - Federal high-volume filings by third-party preparers (research date Nov 18 2026)

Facts only. No recommendations. Tags: `[M]` I opened the primary source; `[S]` secondary; `[U]` looked for, not found/not opened. `[CALC]` = my arithmetic from source figures.

Method notes (limits that affected this report):
- The shared web-search budget ran out mid-session. Provider discovery therefore relied on pages I could open directly and on search results gathered before the cutoff. Some provider pages hide prices behind checkout (marked `[U]`).
- Google and Microsoft policy text is copyrighted web content. I paraphrase it closely and give the URL and read date; exact wording is at the URLs.
- Government-source quotes (eCFR, Federal Register, IRS Rev. Proc.) are public-domain and quoted where useful.
- eCFR text was pulled from the eCFR API snapshot dated 2026-11-10 `[M]`.

---

## Cross-cutting: platform ad policy (brief section 8, applies to every line)

### Google Ads - "Government documents and services" `[M]`
URL: https://support.google.com/adspolicy/answer/13156083?hl=en (read Nov 18 2026, English page).
- Restriction: only certified governments and authorized providers may run ads promoting direct acquisition of specific government documents and services. Government documents and services are defined as official documents issued by, and official services rendered by, the government.
- "Authorized provider" test on the page: an advertiser given explicit permission by a government for a specific document/service. The advertiser's domain must be linked from an official, publicly accessible government website and explicitly named there as authorized for that document/service; the domain may promote only that document/service; ads may target only the matching geography.
- Process: advertisers must be certified by Google. Apply for certification, then complete Google's advertiser verification program (2 steps); a certificate is then applied to the Google Ads account. The same application route is used to request an exclusion (regional or business) or to request an exclusion on the ground that the ads do not promote government documents/services.
- Disclosure: for in-scope categories, Google auto-generates a "Not a government website" disclosure on Search ads when users appear to be searching for government documents, unless the advertiser is certified as a government provider.
- Enforcement: violations do not cause immediate account suspension; a warning is issued at least 7 days before suspension.
- Restricted categories on the page (the full list): regional identification numbers for individuals (SSN named; ITIN not named), birth/death certificates, name or address changes, **business identifiers (EIN named; "applying for a company registration number ... renewing or changing a business identification number")**, criminal background checks, health and welfare benefits, unclaimed tax rebates, electronic travel authorizations, passports, border entry documents, US Trusted Traveler programs, driver license, public road access fees/passes, vehicle owner registration, license plate number, hunting/fishing licenses, residency lotteries.
- Not named on the list I read: SAM.gov/UEI, USDOT/MC/BOC-3/UCR, trademark applications, ITIN (SSN is the named example), FDA registration, FFL/TTB permits, FAA drone/aircraft registration, Form 8822-B. (An item not on the list is out of scope per Google's 2023 change, per `[S]` Search Engine Land coverage; I did not open that article.)
- Secondary report `[S]` (relevantaudience.com, 2026): Google announced an update on Aug 4 2026 ("Update to Other restricted businesses: Government documents and services policy (October 2026)") and enforced a stricter authorized-provider test from Oct 5 2026 (business licences, registry entries, contracts, and articles/blog posts on government sites do not count as authorization). The live page text I read does not contain that "not accepted" sentence; I did not open Google's change log. Discrepancy unresolved.

### Microsoft Advertising - "Government Services and Products" `[M]`
URL: https://help.ads.microsoft.com/#apex/ads/en/60374/-1 (page states "last updated on Nov 11, 2026"; read Nov 18 2026).
- Ads for government services and products are permitted only if the advertiser is a government entity, or a third-party company authorized to provide a specific service in the target market and able to document that authorization (type of evidence varies by jurisdiction).
- Examples listed in scope include passports, citizenship, immigration/travel visas, ESTA, birth certificates, official change of postal address, "license/registration renewals", carte grise, food assistance, Social Security; the "Regulatory and Compliance" examples include registration and renewal of vehicle documents, **business licenses**, access to public records, official postal address changes.
- Preapproval through the "Government Services Advertising Program" is required. Ads must target users 18+.
- Prohibited: aggregators, affiliate marketing, lead-generation advertisers; targeting any location or advertising any product/service not expressly approved with proof of authorization.
- Third-party requirements: no posing as or claiming affiliation with a government agency; the ad destination must clearly disclose it is not a government website; no mimicking government colors, seals, logos, domain names; promoted services must accurately match what the government authorized; fees must be clearly disclosed (in ad copy or prominently on destination) with the government fee itemized separately from the service fee; no claiming services only a government entity can perform.
- Exemption: licensed law firms and accredited accountants/tax preparers providing professional services such as end-to-end tax preparation or immigration filings are exempt from the preapproval requirement.
- Secondary `[S]` (ppcnewsfeed.com, Aug 2026) described the rewrite as effective Aug 19 2026 and said unauthorized advertisers must state they are unauthorized. That "unauthorized advertiser disclaimer" wording does not appear in the Nov 11 2026 page text I read.
- Microsoft's "Restricted Content" index (same help center) separately lists Alcohol, Beauty and Cosmetics, Food Products, Healthcare and Pharmaceutical, Legal Services, and Financial Services as restricted categories `[M]`; I did not open those sub-policies.

### Federal impersonation rules (FTC) `[M]`
16 CFR 461.2 and 461.3 (eCFR, 2026-11-10): it is an unfair or deceptive practice to materially and falsely pose as, or materially misrepresent affiliation with, a government entity or a business. (Rule text confirmed; effective date not opened.)

---

## (a) SAM.gov registration/renewal (UEI) and related federal contractor registrations

### 1. What it is and who buys it
- Registration in SAM is required of offerors/quoters at the time an offer is submitted, with listed exceptions (48 CFR 4.1102(a)) `[M]`; federal-assistance applicants must be registered and review/update annually (2 CFR 25.200(b)) `[M]`. FAR 52.204-13 is the SAM Maintenance clause `[M]`.
- Registration must be renewed every 365 days (sam.gov/content/entity-registration) `[M]`.
- Related programs: SBA 8(a), WOSB, HUBZone, veteran-owned (VetCert) are applied for at certifications.sba.gov; SBA says it charges nothing to apply to its programs or for Small Business Search profile management `[S]` (search-result summary of sba.gov pages; I did not open the pages). SBA also notes a non-SBA site (samregistration.com) is not affiliated with it `[S]`. GSA schedule prep: no agency fee found `[U]`.

### 2. Annual volume
- GSA "SAM.gov by the Numbers" (as of June 2023): 674,000+ registered entities; 56,000+ entity registrations created or renewed per month; 2.8+ million registered users `[M]` https://origin-www.gsa.gov/system/files/SAMgov%20by%20the%20Numbers.pdf. Monthly figure x 12 = 672,000+ [CALC] (created-or-renewed actions, not unique entities).
- Newer official count (2025/2026) `[U]`. Third-party estimates (~700,000 active entities, policyrisk wiki, May 2026) `[S]`.
- Program counts `[S]` (Federal News Network, Jun 2026; Schwabe): SDVOSB in federal market 5,870; HUBZone firms in federal market 2,619 (2025); WOSB firms 11,648; active 8(a) firms 4,985 (FY2025, Schwabe) with ~800 removed after an SBA audit. These are firms with federal market activity, not all certified firms.
- New York count `[U]`.

### 3. Who sells it (own pages)
| Provider | Price on own page | Includes / notes |
|---|---|---|
| fed.net https://www.fed.net/services/sam-registration | $2,499 one-time registration; $1,499 per year renewal `[M]` | Claims 27,000+ clients, $36B in government awards for clients `[M]` (own claim) |
| FedBiz Access https://fedbizaccess.com/services/dynamic-small-business-search-dsbs/ | $600 for "1 yr. registration/renewal" `[M]` (page shown at that URL) | Claims 25+ years in business `[M]` (own claim; page elsewhere says 22+) |
| US Federal Contractor Registration (USFCR) https://usfcr.com | Price `[U]` (not on pages opened) | Claims 13 years, 300,000+ SAM registrations completed `[M]` (own claim). Page states it is "not a government agency" and is a third-party consulting firm. Also sells WOSB, HUBZone, 8(a), VetBiz, GSA schedule program registrations (nav links) |
| Federal Filing (Fed Filing LLC) https://www.federalfiling.com/sam-registration | Price `[U]` on own page | 2022: $399 one-year renewal / $699 two-year / $899 three-year / $998 new registration (TINA.org, Jun 2022) `[S]` |
| File.Business https://file.business/sam-gov-registration.html | $499 annual subscription covering SAM plus GSA Schedule prep and bid support, government fees at cost `[S]` (search snippet; page opened but price not extracted) | |
| Federal Contractor Registry | $597 "complete SAM registration services" (TINA.org Dec 30 2022) `[S]` | Own page not opened |
| USA Filing (samfiling.com) | $399 one-year / $799 three-year renewal (TINA.org Jun 7 2022) `[S]` | Own page not opened |

### 4. Size evidence
- Own claims only: USFCR 300,000+ registrations / 13-15 years; fed.net 27,000+ clients; FedBiz Access 22-25+ years `[M]`. USFCR blog (Jan-2026-dated item) says it was named "Federal Contracting Services of the Year 2026" by Gov Business Review `[S]`.
- Revenue/employees/funding/businesses-for-sale listings: `[U]` for all.
- Enforcement/complaints: TINA.org (non-profit watchdog, not a regulator) sent warning letters to Federal Filing (May 23 2022) and USA Filing (Jun 2 2022); Federal Filing's CEO is quoted saying customers sometimes think the firm is SAM and are refunded; Federal Filing removed the SAM.gov logo after the letter (TINA article updated Jun 23 2022) `[S]` https://truthinadvertising.org/articles/federal-filing-government-imposter-scam . TINA reported no regulator action in those articles `[S]`.

### 5. What it legally takes to offer it
- No license, bond, or agreement found for third-party SAM registration `[U]`. SAM's own non-federal user guide states vendors are engaged "at your own risk" and offers free help via the Federal Service Desk `[S]` (search result summary).
- Entity-side rule: registering requires the Entity Administrator role; FSD can assign it on a notarized letter if the entity has no administrator `[S]` (FSD guide, via search summary).
- Agency warnings `[M]`: GSA bulletin (May 4 2023) says registration is always free and that some third-party companies offer registration for a fee, to confirm legitimacy; SSA bulletin (Jan 30 2026) says "no charge" via the SAM website and warns third parties offer registration/renewal "for a significant fee" and are not endorsed by SSA https://content.govdelivery.com/accounts/USSSATTW/bulletins/4054ec9 .
- New York: no NY-specific licensing for this service found `[U]`.

### 6. The work
- Online only: SAM.gov account, Login.gov, entity data entry (identity, TIN, banking, reps and certs, size/NAICS), IRS TIN and CAGE validation, optional notarized letter for admin role.
- Fee: $0 `[M]` (sam.gov, GSA).
- Time: SAM status tracker (via search summary) states average overall processing up to 3 business days, external reviews up to 10 business days `[S]`; the Entity Registration Checklist advises allowing at least 10 business days `[S]`.
- 2026 changes `[S]` (USFCR blog): eSRS retired Feb 20 2026; FPDS public search retired Feb 24 2026; modernized reps and certs launched Mar 24 2026; registration screens re-laid out Jun-Sep 2025 with no change in data collected.

### 7. Recurrence
- Annual renewal (365 days) `[M]`; fee $0. Provider renewal prices above ($1,499/yr fed.net; $600 FedBiz).

### 9. Search demand
`[U]` (no search-volume tool used).

---

## (b) Motor-carrier filings

### 1. What it is and who buys it
- Every for-hire interstate motor carrier, broker, freight forwarder, and others subject to the FMCSRs must file Form MCSA-1 (URS online application) before beginning operations and every 24 months (biennial update); failure to update brings penalties and USDOT number deactivation (49 CFR 390.201(b),(c),(d)) `[M]`. Biennial schedule keyed to last digit of USDOT number (390.201(d)(3)) `[M]`.
- FMCSA issues an inactive USDOT number first and activates it after required filings; operations and vehicle marking may not begin until written notice of activation (390.201(c)(2)) `[M]`. For-hire carriers/brokers/freight forwarders must file evidence of financial responsibility (49 CFR part 387 subparts C and D) within 90 days (390.205(a)) `[M]`.
- Operating authority (MC/MX/FF) is required for for-hire carriage of regulated commodities owned by others or arranging transport, and for passenger carriage for a fee; not required for private carriers, exempt-commodity-only carriers, or commercial-zone-only carriers (fmcsa.dot.gov/registration/get-mc-number-authority-operate, page dated Apr 20 2026) `[M]`.
- BOC-3 process agent designation: 49 CFR 366.4 requires designating process agents for the states; eCFR notes the section carries "Effective Date Note: ... suspended, effective Jan. 14, 2017" `[M]` (that note is on the eCFR text I pulled; the BOC-3 process continues to appear in FMCSA's Motus materials `[M]`).
- UCR: annual registration (2027 registration portal opened Oct 1 2026) with fees by fleet size `[M]` (plan.ucr.gov via fetch). IFTA credentials are issued by the base jurisdiction `[M]` (iftach.org). IRP: not researched `[U]`.

### 2. Annual volume
- FMCSA Registration Statistics (MCMIS snapshot 10/30/2026) `[M]` https://ai.fmcsa.dot.gov/RegistrationStatistics : 2,132,941 active registered carriers; 9,561,824 drivers; 8,571,319 vehicles; operation classification: 1,079,858 for-hire, 811,141 private, 204,924 both, 37,018 other. Operating-authority counts (L&I snapshot May 15 2026): property 320,831; household goods 7,325; passenger 4,668; brokers 25,074; freight forwarders 1,879.
- New USDOT census records by add-date year, FMCSA Company Census File (data.transportation.gov dataset az4n-8mr2, API pulled Nov 18 2026; file includes active, inactive, and pending records) `[M]`: 2025: 171,607; 2024: 166,387; 2023: 169,135; 2022: 214,020; 2021: 247,878; 2020: 166,353; 2026 to date: 163,897. For 2025: interstate (code A) 96,682; intrastate non-HM (code C) 74,908 `[M]`. New York physical-state records added 2025: 7,672 `[M]`. Of 2025-added records, 145,706 carry status code A (active) `[M]`.
- New operating authorities granted (legacy AuthHist dataset 9mw4-x3tu, authorities with "MOTOR..." type, count by served year; dataset closed to updates at the Motus cutover) `[M]`: 2025: 56,478; 2024: 56,501; 2023: 66,999; 2022: 99,458; 2021: 111,797; 2020: 61,734; 2026 through ~May 14: 22,321. Counts are per authority record, so one carrier can hold more than one.
- Biennial MCS-150/MCSA-1 updates are due every 24 months from every carrier; I did not find an annual count of updates filed `[U]`. UCR registrants/count `[U]`.

### 3. Who sells it (own pages)
| Provider | Price on own page | Includes |
|---|---|---|
| DAT Copilot Authority Program https://www.dat.com/solutions/trucking-authority-packages | $399, itemized on page as including "Federal MC Authority ($300)" and "BOC-3 MC Authority ($30)" `[M]` (page price block); DAT blog says packages start at $399/year with all federal application fees `[S]` | Paperwork filing plus expert support; insurance premium separate (BMC-91) per DAT |
| DOTAuthority.com (Carrier Registration, Inc.) https://dotauthority.com | Prices not on landing page `[U]` | USDOT numbers, UCR, MC authority, BOC-3 not listed on landing, MCS-150 biennial, hazmat registration, Clearinghouse, SCAC; says it is a private third-party service, "NO REFUNDS", serving since 1998 `[M]` |
| Simplex Group https://simplexgroup.net/mc-authority-registration-service/ | `[U]` | USDOT, MC, BOC-3, insurance-filing coordination, 21-day protest tracking; claims 10,000+ carriers served, 25 years `[M]` (own claim) |
| Fiverr sellers (e.g., "file your fmcsa motus registration and mc number") | `[U]` | Search-result listings only `[S]` |
- Market price ranges from vendor/guide pages in search results `[S]`: BOC-3 $20-$75; authority packages $149-$499 excluding government fees; a "full launch" package $3,999.
- Other providers (BOC-3 blanket companies, UCR agents, IFTA/IRP services): named in FMCSA materials as categories (blanket companies, financial-responsibility filers, transportation service providers) `[M]`; individual price pages not collected `[U]`.

### 4. Size evidence
- Own claims: Simplex 10,000+ carriers/25 yrs; DOTAuthority since 1998 `[M]`.
- FTC case `[S]` (ttnews.com Oct 31 2016; cdllife; ccjdigital): FTC sued operators of DOTAuthority.com, James P. Lamb & Associates, DOTFilings.com, Excelsior Enterprises (Fort Lauderdale FL; individuals James Lamb and Uliana Bogash) in S.D. Fla.; alleged posing as DOT, robocalls/emails/texts implying fines, undisclosed fees, enrolling customers in annual renewal programs, charging $25-$200 for a recertification form and $200 for deactivation; alleged over $19 million from thousands of small businesses; fees $25-$550+ on top of government charges; preliminary injunction Sept 29 2016. A consumer-refunds page (ftc.gov) is reported to say a 2018 settlement order bans the defendants from misrepresenting government affiliation and from charging billing information without express consent `[S]`. I did not open ftc.gov's press release page (returned no text via the search tool). Whether today's dotauthority.com is operated by the same defendants `[U]`.
- FMCSA warnings `[S]` (trade-press coverage): predatory firms pose as agencies and contact new carriers right after online FMCSA transactions; FMCSA says it does not use robocalls or telemarketers and does not charge for downloadable forms. FMCSA's own page for this warning not opened `[U]`.
- Revenue/funding of providers `[U]`.

### 5. What it legally takes to offer it
- Motus lets registrants, and separately "supporting companies" (blanket companies/BOC-3 filers, financial-responsibility filers, transportation service providers) complete filings on behalf of registrants `[M]` (fmcsa.dot.gov/registration/move-motus, updated May 18 2026). Account/agreement or approval requirements for becoming a TSP supporting company: `[U]` (I found an FMCSA alert on TSP-role accounts but not the onboarding rules).
- DAT page (a provider's own blog) states the Motus "Company Official" must be the owner or an authorized internal employee, not a third-party provider `[S]` (dat.com blog); FMCSA's registration-alerts page requires new registrants to pass identity verification through Login.gov and IDEMIA-run identity proofing `[M]` https://www.fmcsa.dot.gov/registration/registration-alerts .
- Insurance: BOC-3 and insurance filings are done by process-agent and insurer filers respectively; minimum liability levels (e.g., $750,000 general freight 10,001+ lbs) `[S]`.
- State-law: New York Judiciary Law 478 bars non-admitted persons from practicing or appearing as attorney-at-law `[M]` (nysenate.gov). Whether filing forms for a fee is "practice" under NY law: `[U]`.

### 6. The work
- Online portal (Motus, motus.dot.gov): Login.gov user profile with identity verification (government photo ID, smartphone/tablet face verification) `[M]`; create or claim a company account; apply for USDOT number and/or operating authority; claim existing USDOT with same Login.gov email as FMCSA Portal `[M]`.
- Fees: USDOT number free `[S]` (vendor/guide pages in search results; FMCSA fee table I opened lists only authority fees). Operating-authority fee table on the Apr 20 2026 FMCSA page `[M]`: permanent authority $300 per authority type; reinstatement $80; name change $14; no refunds for mistaken applications. As of Sept 30 2025 FMCSA takes electronic (card) payments only `[M]` (registration-alerts page).
- Time `[M]`: FMCSA page (Apr 20 2026, before the Motus cutover): URS new applications 20-25 business days, up to additional 8 weeks or longer if further review; US-mail existing-carrier applications 45-60 business days. After the May 14 2026 launch, J.J. Keller (May 15 2026) `[S]` says paper MCS-150 and OP-1 forms are still accepted during the transition and initial review may take at least eight business days. Post-launch published processing time on FMCSA's own pages: `[U]`.
- Operating authority becomes active after insurance (BMC-91/91X) and BOC-3 are on file and a protest period runs (Simplex page: 21 days) `[S]`.

### Status of FMCSA's new registration system (Motus) as of Nov 18 2026
- Launch: Motus replaced the Unified Registration System and legacy tools on May 14 2026 per trade press `[S]` (DAT, J.J. Keller, CCJ). FMCSA's Motus pages `[M]` (whats-coming; move-motus page last updated May 18 2026) describe Motus as live ("FMCSA is proud to release Motus"), and its A&I statistics page says legacy operating-authority data is current only to May 15 2026 `[M]`; datasets "Motus AuthHist/Carrier/BOC3/RevokeSuspend" now exist on data.transportation.gov and the legacy authority datasets say they were last refreshed May 14 2026 and will no longer be updated `[M]` (dataset descriptions).
- Federal Register: FMCSA notice "Availability of Motus, FMCSA's New Registration System" published Apr 29 2026 (FR Doc 2026-08334), corrected May 6 2026 (FR Doc 2026-08819, docket FMCSA-2026-1255); it states use of Motus satisfies current URS statutory and regulatory requirements `[M]` (correction notice text opened; the April notice itself was not opened).
- Changes `[M]` (fmcsa.dot.gov/registration/whats-coming): randomized USDOT and docket numbers for new issuances; one docket number per newly granted authority; USDOT suffixes for new registrants; existing numbers unchanged; MC/MX/FF prefixes remain; single company account; voluntary suspension of authority reinstateable up to one year; mobile identity verification.
- Not yet done `[M]`: Safety Registration, eventual elimination of docket numbers, and changes to BOC-3 filing are "under consideration" for a future notice of proposed rulemaking. A UCR fee NPRM was published Apr 7 and May 1 2026 (Federal Register titles) `[M]` (titles only).
- Operational problems `[S]`: a CCJ report (title: carrier stranded at weigh station by bungled Motus rollout) and Overdrive "one week in" coverage exist; not opened `[U]`.

### 7. Recurrence
- Biennial update every 24 months (390.201(d)) `[M]` (free). UCR annual `[M]`: 2027 fees per entity: 0-2 vehicles $46; 3-5 $138; 6-20 $276; 21-100 $963; 101-1,000 $4,592; 1,001+ $44,836 (plan.ucr.gov via fetch). IFTA: quarterly returns and annual credentials via base jurisdiction `[M]` (iftach.org says contact base jurisdiction; fee schedule `[U]`). IRP `[U]`. Provider annual bundles (DAT "per year") `[S]`.

### 9. Search demand
`[U]`.

---

## (c) Federal trademark applications by non-attorney services

### 1. What it is and who buys it
Anyone seeking a federal trademark registration; USPTO base application fee is $350 per class as stated on LegalZoom's page (Jan 2025 fee schedule) `[S]` (provider page; USPTO fee schedule not opened).

### 2. Annual volume
- FY2025: applicants filed "more than 824,000 new classes," up 7.4% from FY2024 `[M]` (USPTO bulletin 12/02/2025 https://content.govdelivery.com/accounts/USPTO/bulletins/3fbc302). Application count: third-party trackers say 620,217 or 620,451 in calendar 2025 `[S]` (gleanmark, patexia via search snippets).
- Pro se share: one third-party analysis (tramatm.com, Mar 2025) says 21.96% self-filed vs 78.04% attorney-filed, success 70.2% vs 86.4% `[S]` (single month; "self-filed" may differ from "pro se"). Official pro se count `[U]`.
- Pendency FY2025: first-action 5.6 months, disposal 11.7 months `[M]` (same bulletin); first half FY2026 first-action 4.45 months `[S]`.
- New York count `[U]`.

### 3. Who sells it (own pages)
| Provider | Price | Includes |
|---|---|---|
| Trademark Engine https://www.trademarkengine.com | Basic $49; Standard $299; Premium $539, each plus government fees `[M]` | Search; attorney review; filed by "legal team"; Standard adds dedicated attorney, 15-minute consult; Premium 60-minute consult |
| LegalZoom https://www.legalzoom.com/business/intellectual-property/trademark-registration-overview.html | Premium package $899 + $350/class USPTO fee `[M]`; 3 months of monitoring then $249/year auto-renewing | Attorney runs search, selects classes, files, handles minor procedural office actions |
| Trademarkia https://www.trademarkia.com | "Starting from $599*" for trademark `[M]` (landing-page price tile) | Licensed US attorneys; claims 120K+ customers, 200k+ trademarks filed, "#1 trademark filing firm" `[M]` (own claims) |
| Bizee (formerly Incfile) | $199 + federal fee for trademark search and registration `[S]` | Own page not reachable (404 on guessed URL) |
| Trademark Factory | $199 search-first; $995 registration package + government fees `[S]` | |
| ZenBusiness, Rocket Lawyer | Not found on own pages `[U]` (one comparison site says ZenBusiness does not offer trademark registration `[S]`) | |

### 4. Size evidence
- Trademark Engine: "100,000+ trademarks filed since 2016" `[M]` (own claim). Trademarkia: 200k+ filed, 120K customers, 10K+ companies `[M]` (own). LegalZoom Inc.: 2025 revenue $756.0 million (all products), 2024 $681.9 million, 2023 $660.7 million (SEC XBRL 10-K data, filed 2026-02-23) `[M]`; trademark-only revenue `[U]`.
- Enforcement/complaints against these providers `[U]`. Unrelated USPTO actions against filing mills not collected `[U]`.

### 5. What it legally takes to offer it (USPTO rules; eCFR 2026-11-10 `[M]`)
- 37 CFR 11.14(a): any individual who is an attorney may represent others before the USPTO in trademark matters; no separate registration needed.
- 37 CFR 11.14(b): individuals who are not attorneys "are not recognized to practice before the Office in trademark ... matters," except individuals recognized before Jan 1 1957 (continuing as agents).
- 37 CFR 2.17(a): only an individual qualified under 11.14 may represent an applicant, registrant, or party in a trademark case; 2.17(f): a non-lawyer may not act as representative except in the limited 11.14(b) circumstance, and such a person must have a written authorization filed first.
- 37 CFR 11.14(e): no one other than those in (a)-(c) may practice before the Office on behalf of a client; except an individual may appear for himself or herself or for a firm of which he/she is a member, a partnership of which he/she is a partner, or a corporation/association of which he/she is an officer and authorized to represent. 11.14(d): recognition does not authorize any act regarded as unauthorized practice of law where performed.
- 37 CFR 2.193(e)(1): a verified statement may be signed by the owner, a person with legal authority to bind the owner, a person with firsthand knowledge and actual or implied authority to act for the owner, or an attorney with a power of attorney. 2.193(e)(2): responses/amendments must be signed by the owner, someone with authority to bind the owner, or a qualified practitioner. 2.193(e)(3): a power of attorney must be signed by the applicant/registrant or someone with legal authority to bind.
- Reading these rules together (no inference beyond the text): a non-attorney company is not a recognized representative; the text of 2.17/11.14 does not list a clerical-preparation role for a non-attorney company. What the rules do allow a non-attorney to do is act as the owner (or its authorized officer/person with authority) signing and filing the owner's own papers. Whether a company preparing a form for the owner to sign is permitted is a state unauthorized-practice-of-law question; USPTO text I read does not address it `[U]`.
- Foreign-domiciled applicants must use a U.S.-licensed attorney (37 CFR 2.11) `[S]` (search summary; 2.11 text not pulled by me).
- New York: Judiciary Law 478 bars non-admitted natural persons from practicing or appearing as attorney-at-law `[M]`. NY-specific limits on non-lawyer document preparers: `[U]`.
- USPTO warns that private companies mine its records and send misleading solicitations; USPTO says it cannot stop them and points to the FTC `[S]` (archived USPTO page via search summary, 2017-2020; live page not opened).

### 6. The work
Online TEAS filing at USPTO; steps: search, classify goods/services, signed declaration, specimen (use-based) or intent-to-use with later statement of use; USPTO fee $350 per class `[S]`. Processing: first action 5.6 months (FY2025) `[M]`; total disposal 11.7 months `[M]`.

### 7. Recurrence
Registration maintenance filings (Section 8 and 9) at set intervals; fees not collected `[U]`. Provider monitoring subscriptions: LegalZoom $249/year `[M]`.

### 8. Ad limits
Trademark filing is not on Google's listed restricted categories (above) `[M]`; Microsoft's policy covers "government services" where the advertiser is a third party, and exempts licensed law firms and accredited accountants/tax preparers from preapproval `[M]`. Whether Microsoft treats trademark filing as in scope: `[U]`.

---

## (d) ITIN (certifying acceptance agents), EIN for foreign owners, Form 8822-B

### 1. What it is and who buys it
- ITIN: Form W-7, attached to a federal tax return (1040 or 1040-NR) with supporting documents; apply by mail, at IRS Taxpayer Assistance Centers, VITA sites, or through acceptance agents/certifying acceptance agents (fee-based) `[M]` https://www.irs.gov/tin/itin/how-to-apply-for-an-itin .
- EIN for foreign owners: online EIN works only for applicants with a legal residence, principal place of business, or principal office in the U.S. or territories; others call 267-941-1099 or fax/mail Form SS-4; the SS-4 instructions say apply online free for applicants in the U.S. `[M]` (Form SS-4 instructions, IRS).
- Form 8822-B: report a change of responsible party (and business mailing address); the form instructions require reporting a responsible-party change within 60 days `[M]` (IRS f8822b.pdf, Rev. Dec 2019 copy).

### 2. Annual volume
- IRS Data Book FY2025 (Oct 1 2024-Sep 30 2025): 7,487,705 online EIN applications `[M]` https://www.irs.gov/pub/irs-pdf/p55b.pdf (online only; total EINs issued including phone/fax/mail `[U]`).
- ITIN issuance per year and number of acceptance agents `[U]` (IRS Data Book text I searched has no ITIN line item). Form 8822-B filings per year `[U]`.
- Foreign-owner share of EIN applications `[U]`.

### 3. Who sells it
- ITIN: IRS page says CAA fees "may vary"; no fixed price on IRS pages `[M]`. Own-page ITIN prices for named providers: `[U]` (candidate URLs I tried returned 404 or no price).
- EIN: Bizee EIN filing service "Only $70" (bizee.com/ein) `[M]`; doola Starter $297/yr includes LLC or C-corp formation, EIN, and US address (own page) `[M]`; doola Tax and Compliance $1,999/yr, Business-in-a-Box $2,999/yr `[M]`.
- 8822-B: no provider prices found `[U]`.

### 4. Size evidence
Provider revenue/customer counts for ITIN/EIN services `[U]`. Enforcement: none collected for this line `[U]`.

### 5. What it legally takes
- Acceptance agent program is by written agreement with the IRS (Rev. Proc. 2006-10, IRS copy opened) `[M]`: eligible persons include financial institutions, colleges/universities, federal agencies, "persons that provide assistance to taxpayers in the preparation of their tax returns," and others the IRS authorizes; apply on Form 13551; applicant must have an EIN; IRS suitability check (section 6); agreement expires Dec 31 of the fourth full calendar year after it takes effect; either party may terminate. A CAA also authenticates identity documents. An acceptance agent "does not act as an agent of the IRS and is not authorized to hold itself out as an agent of the IRS" (sec. 3) `[M]`. The Rev. Proc. 2006-10 version I read may have later modifications (not checked) `[U]`.
- IRS compares agent types: CAA authenticates most supporting documents and returns them immediately; an acceptance agent reviews and mails documents `[M]`.
- Form 8822-B must be signed by owner, officer, or representative (signature block text) `[M]`. Third-party designee line exists on SS-4 `[M]` (instructions mention designee; scope not extracted).
- Paid return preparation (needed with W-7): PTIN/preparer rules and New York paid-preparer registration `[U]` (NY page returned 404).

### 6. The work
- ITIN: Form W-7 + return + supporting documents by mail/in person; IRS says allow 7 weeks for status (9-11 weeks Jan 15-Apr 30 or if applying from overseas) `[M]`. Government fee: none on the IRS page `[M]`.
- EIN (foreign, no U.S. residence): phone 267-941-1099, fax, or mail SS-4; fax-TIN turnaround "generally within 4 business days" `[M]`; online EIN is free `[M]`.
- 8822-B: paper form mailed to the IRS address by state (Cincinnati/Ogden) `[M]`; no fee stated in form `[M]`.

### 7. Recurrence
ITIN expires if not used on a return for three consecutive years or by IRS notice `[U]` (not opened this session). EIN: none. 8822-B: only on change.

### 8. Ad limits
Google lists EIN under "business identifiers" (restricted) and SSN under identification numbers; ITIN is not named on the page I read `[M]`. Microsoft exempts licensed law firms and accredited accountants/tax preparers from preapproval for "end-to-end tax preparation" `[M]`.

---

## (e) FDA establishment registration and US agent (food, device, drug, cosmetic)

### 1. What it is and who buys it
- Food: owners/operators/agents in charge of domestic or foreign facilities that manufacture, process, pack, or hold food for U.S. consumption must register (21 CFR 1.225); renew every other year Oct 1-Dec 31 of even-numbered years (1.230(b)); update within 60 days of changes (1.234); an individual may be authorized to register or renew on the owner's behalf (1.225(c), 1.230) `[M]`. Foreign facilities designate a U.S. agent: a person residing or maintaining a place of business in the U.S.; not a mailbox, answering machine/service, or place where the agent is not physically present (1.227) `[M]`.
- Devices: annual registration Oct 1-Dec 31; foreign establishments must identify one U.S. agent who resides or has a place of business in the U.S., no PO box, no answering service only `[M]` (FDA device pages; U.S. Agents page current as of 12/23/2017).
- Cosmetics (MoCRA, FD&C Act sec. 607): manufacturers/processors register facilities and renew every two years; responsible persons list each marketed product and update annually; small-business exemptions exist except for products in listed higher-risk categories (eye-contact, injected, internal, long-lasting alteration); registration counted "since December 18, 2023" `[M]` (FDA MoCRA and registration pages). U.S. agent for foreign cosmetic facilities is a listed role in the registration record `[M]` (FDA Feb 11 2026 note lists "U.S. agent" among reminder recipients).
- FDA does not issue certificates or letters verifying cosmetic facility registration or product listing; FDA restated this Sept 9 2026 `[M]`. FDA likewise says it does not issue registration certificates to device facilities `[M]`.
- Drug establishment registration/listing: not researched `[U]`.

### 2. Annual volume
- Cosmetics: 16,398 unique active facility registrations; 1,298,361 unique active product listings (as of June 30 2026) `[M]` https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products .
- Devices: openFDA registration/listing API returned 337,446 records (record count, not unique establishments), last_updated 2026-11-09; records with registration expiry year 2027: 177,569; 2026: 159,877 `[M]`. Unique establishment counts `[U]`.
- Food facilities: count `[U]` (FDA page with count not found).
- New York counts `[U]`.

### 3. Who sells it (own pages)
| Provider | Price | Notes |
|---|---|---|
| Registrar Corp (Hampton, VA) https://www.registrarcorp.com | Price `[U]` on pages opened (food page returned 504; US agent page and registration page show no price) | Site states it is not affiliated with FDA; offers registration verification at no extra cost `[M]`; US agent service page exists `[M]` |
| Others (Liberty Management, Emergo, Quality Smart Solutions, etc.) | `[U]` | Not confirmed as providers; domains I guessed did not resolve to priced pages |
- Government fees `[M]`: food registration and renewal no fee (FDA Sept 29 2026 update); cosmetics registration/listing no fee stated on FDA page (none listed); device establishment annual registration fee FY2027 (Oct 1 2026) = $13,785 (Federal Register 2026-15335, Jul 30 2026) `[M]`.

### 4. Size evidence
Registrar Corp revenue/customer count/enforcement `[U]`. No FTC or FDA actions against FDA-registration filing services found `[U]`.

### 5. What it legally takes
- FDA regulation text: U.S. agent must be a person (individual or entity) in the U.S. who is physically present (1.227) `[M]`. No license/bond requirement in FDA text I read `[M]`.
- FDA agency warning, device page (Mar 3 2021): various firms offer help registering; they are not affiliated with FDA, FDA has not contracted with any firm, FDA does not use outside contractors to notify or bill industry, and FDA does not require firms to hire someone to complete online registration `[M]`. The food-facility equivalent page ("Private Businesses Claiming or Suggesting an Affiliation with FDA") returned HTTP 503 and was not read `[U]`. FDA also posted (Jul 20 2026) an advisory to protect food-facility registration information (page 503; not read) `[U]`.
- Cosmetics: FDA states it does not issue certificates (Sept 9 2026) `[M]`.

### 6. The work
- Food: FDA Industry Systems (FIS) account, Food Facility Registration (FFR) module; requires a unique facility identifier (DUNS accepted); no fee; renewal Oct 1-Dec 31, 2026 (this is a renewal year; FDA treats registrations not renewed by Dec 31 2026 as expired) `[M]`. Qualified facilities submit an attestation in the same period `[M]`.
- Devices: FURLS system; annual fee payment; U.S. agent confirms consent by email, 10 business days to respond `[M]`.
- Cosmetics: Cosmetics Direct portal or ESG NextGen (free account, 1-3 weeks) or paper forms 5066/5067; biennial renewal with abbreviated option; product listing annual update `[M]`.
- Processing times for FDA-side confirmation `[U]`.

### 7. Recurrence
Food biennial (even years Oct 1-Dec 31); device annual (Oct 1-Dec 31) with fee; cosmetics biennial facility renewal and annual product-listing update `[M]`.

### 8. Ad limits
FDA registration services are not named on Google's restricted list `[M]`; Microsoft lists "Healthcare and Pharmaceutical" and "Beauty and Cosmetics" as restricted-content categories (index only) `[M]`.

---

## (f) Firearms, alcohol (TTB), aviation (drone Part 107, aircraft registration), brief

- ATF FFL fees `[M]` (27 CFR 478.42): dealer (not destructive devices) $200 for 3 years, renewal $90 for 3 years; manufacturer of firearms other than destructive devices $50 per year; manufacturer of ammunition $10/year; collector of curios and relics $10/year; destructive devices $1,000/year. ATF publishes monthly FFL listings (2021-2026) `[M]` (page navigation text; counts not extracted `[U]`).
- TTB: no federal fee to apply for or maintain approval of permits `[M]` (ttb.gov page); Permits Online is free and "generally results in faster processing"; specific processing times `[U]`. Counts `[U]`.
- FAA aircraft registration (14 CFR 47.17) `[M]`: Certificate of Aircraft Registration $5.00 per aircraft; renewal $5.00; registration valid seven years (47.40) `[M]`.
- FAA drones `[M]` (faa.gov): Part 107 registration $5 per drone valid three years; recreational registration $5 covers all drones, valid three years; registrant must be 13+ (owner under 13: someone 13+ registers); remote pilot certificate requires age 16+, passing the Unmanned Aircraft General - Small knowledge test at an approved testing center after getting an FTN via IACRA, and online recurrent training every 24 calendar months. Test-center fee `[U]`.
- Provider prices and size evidence for these filings `[U]`. Ad policy: Microsoft lists "Alcohol" as a restricted content category (index); Google "dangerous products" restrictions on firearms/alcohol not opened `[U]`.

## (g) Medicare-adjacent / HHS registrations not on the exclusion list
Not researched in depth; items that appeared in this research: FDA registrations (section e) are HHS-agency registrations; NPI, PECOS, DEA, CLIA, and other registrations were not collected `[U]` (some may fall under the brief's exclusion list: credentialing/enrollment/CAH items).

---

## Not found / not verified (consolidated)
- Current official SAM.gov entity count after June 2023 and annual new-registration counts; SAM prices on USFCR and Federal Filing own pages; revenue/employee/funding for any provider except LegalZoom Inc. (SEC filings).
- Official USPTO pro se filer share and annual application count; USPTO fee schedule page itself ($350/class taken from a provider page); any enforcement against trademark filing services; NY rules on non-lawyer form preparation beyond Judiciary Law 478 text.
- FMCSA: post-launch processing times; TSP/supporting-company onboarding rules; FMCSA's own third-party warning page; IRP and IFTA fee schedules; UCR registrant counts; whether the FTC-defendant "DOTAuthority.com" is the same operator as today's site; the April 29 2026 Federal Register notice text; Motus rollout-problem reports (CCJ/Overdrive, not opened).
- ITIN issuance counts, acceptance-agent counts, CAA price pages, 8822-B volume, NY paid-preparer registration rules.
- FDA: food-facility and unique device-establishment counts; priced provider pages; FDA's "Private Businesses Claiming Affiliation" food page and Jul 20 2026 advisory (503); drug-establishment rules.
- ATF/TTB/FAA volumes and provider prices; FAA knowledge-test fee.
- Google change log for the Oct 2026 update; Microsoft Government Services Advertising Program application details and whether certain filings count as "government services."
- Search-demand figures for every line (no tool used).
- Web-search budget was exhausted mid-session; any provider not reachable by direct URL could not be discovered afterward.
