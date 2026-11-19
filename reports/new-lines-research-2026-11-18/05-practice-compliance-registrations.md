# 05: Practice compliance and registrations (facts only)

Research date: Nov 18 2026. Read-only. Tags: `[M]` primary source opened · `[S]` secondary or search snippet only · `[U]` looked for, not found or not opened · `[CALC]` arithmetic on source figures.

Excluded per brief: insurer credentialing, payer/Medicare/Medicaid enrollment, NPI/CAQH, registered agent, biennial statement, sales tax, S-corp election.

**Session limits hit:** the run's web-search budget (200 per turn, shared) ran out partway, then the fetch tool hit a usage limit. hhs.gov, dol.ny.gov and gusto.com blocked automated fetches (403). Items that would have needed more searching are listed under "Not found / not verified" in each section.

---

## Cross-line: count of new practices

| Figure | Value | Tag / source |
|---|---|---|
| US business applications, NAICS 62 (Health Care and Social Assistance), calendar 2025 | 348,185 total; 56,212 "high-propensity" (BA_WBA) | `[M]` [CALC] sum of monthly unadjusted values, Census Business Formation Statistics, https://www.census.gov/econ/bfs/csv/bfs_monthly.csv (downloaded Nov 18 2026) |
| US NAICS 62 applications Jan–Oct 2026 | 26,610–42,260 per month | `[M]` same file |
| NY business applications, all sectors, 2025 | Monthly 22,019–30,248 | `[M]` same file. **The file has no NY × NAICS 62 cut.** |
| Count of new solo/small healthcare practices per year (NY or US) | Not found | `[U]` NAICS 62 includes child care, home care and social assistance, so it is not a count of practices. Census CBP API needs a key (not used). |
| CLIA-exempt state labs, NY | 7,282 | `[M]` CMS CLIA statistics, Nov 2026 (see (c)) |

---

## (a) HIPAA compliance subscriptions and OSHA programs for small practices

### 1. What it is and who buys it
- HIPAA Security Rule, 45 CFR 164.308(a)(1)(ii)(A): "Risk analysis (Required). Conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of electronic protected health information held by the covered entity or business associate." (B) risk management is also "Required". `[M]` https://www.law.cornell.edu/cfr/text/45/164.308 (eCFR redirected to a bot block).
- Pending changes: RIN 0945-AA22, "HIPAA Security Rule to Strengthen the Cybersecurity of Electronic Protected Health Information." NPRM 01/06/2025 (90 FR 898). Final Action listed as **07/00/2027**. Stage: **Long-Term Actions**. Economically significant. Major: Yes. `[M]` reginfo.gov Unified Agenda entry, publication "2026" (pubId 202510), https://www.reginfo.gov/public/do/eAgendaViewRule?pubId=202510&RIN=0945-AA22. Trade press says the date moved from May 2026 to July 2027 `[S]` https://www.fiercehealthcare.com/health-tech/feds-push-back-hipaa-security-rule-overhaul-july-2027. No final rule found in the Federal Register as of today `[S]`.
- OSHA: rules that apply to medical and dental offices are bloodborne pathogens (29 CFR 1910.1030) and hazard communication (1910.1200) `[U]` (not opened this run). Whether NAICS 6211/6212/6213 are partially exempt from injury recordkeeping (29 CFR 1904 App. A to Subpart B) `[U]`: the fetch failed on a usage limit.
- Buyers: every HIPAA covered entity (any provider that bills electronically) and its business associates.

### 2. Annual volume of the triggering event
- No count of covered entities or of new covered entities per year was found `[U]`. Proxy: DEA practitioner registrants (see (b)) and CLIA waiver labs (see (c)).
- HHS OCR enforcement counts for the latest year, including how many involved small practices: `[U]`. hhs.gov returned 403 for the enforcement-highlights and resolution-agreements pages. Compliancy Group's homepage cites "$1.5M+ average fine avoided per HIPAA enforcement action" (vendor claim, not OCR data) `[M]`.

### 3. Who sells it (own-page prices)
| Provider | Published price | Includes | Tag |
|---|---|---|---|
| Accountable HQ | Basic $199/mo (or $169/mo annual, $2,028/yr); Plus $299/mo ($254/mo annual); Pro $799/mo ($679/mo annual). 15–20 employees included, then $9–$19 per extra seat per month | SRA, policies, training, BAA management, vendor management; Plus adds phishing, exclusion screening, hotline; Pro adds a vulnerability scan twice a year and a yearly pen test | `[M]` https://www.accountablehq.com/pricing |
| Total HIPAA | HIPAA DIY $199/mo + $999 onboarding; HIPAA Prime $485/mo billed annually; Concierge not published | Training, online risk assessment, policies, BAAs, breach guide; Prime adds a review and audit/breach support | `[M]` https://www.totalhipaa.com/pricing-offerings-page/ (the page does not tie each price to a plan unambiguously) |
| Smart Training (dental) | OSHA Core $495/yr per location; HIPAA Core $495/yr; Basic+ $79/yr per user; Fundamentals $750/yr; Essentials $1,500/yr; Premium $2,100/yr; virtual inspection $500; Privacy Officer training $100/user | Training plus written programs; Essentials and above add a consultant and a virtual inspection | `[M]` https://www.smarttraining.com/dental-compliance/pricing |
| Smart Training (general) | Subscription training $70–125/user | Staff compliance training | `[M]` https://www.smarttraining.com/compliance-training-pricing |
| Compliancy Group | Base $139/mo + $8/employee/mo (buy-now page); four tiers Foundation–Elite at $8–$10/employee | Coaching and "The Guard" software | `[S]` search snippet of https://compliancy-group.com/buy-now/. Prices load by JavaScript and the fetch could not read them. |
| Abyde | Prices not shown (template placeholders); priced by locations and employees; 10% off for annual prepay | SRA, policies, training, BAAs; separate OSHA product | `[M]` https://abyde.com/pricing/ (no figures) |
| HIPAAtrek | "$4.99/month starting" | Not stated | `[S]` Capterra / Software Advice listing; vendor page had no price `[M]` |
| MedSafe | Not published | Onsite and online HIPAA/OSHA | `[M]` medsafe.com (no prices) |
| HealthFirst (Henry Schein) | All-In-One OSHA & HIPAA Premium $1,699; OSHA/HIPAA Online Training Select $550 | Dental | `[S]` estore snippets, possibly 2024–2025 |

### 4. Size evidence
- Compliancy Group: "3,000+ healthcare customers", "20+ yrs in business" `[M]` compliancy-group.com homepage, Nov 2026.
- Abyde: "3,000+ Happy Customers" `[M]` abyde.com.
- Accountable: "more than 10,000 companies" `[M]` pricing page.
- MedSafe: "2,500+ Clients", "33 Years", "1,000,000+ People Trained", "32,000+ Onsite Visits" `[M]` medsafe.com.
- Smart Training: "Trusted by 1,000+ dental practices", "Over 3 million courses delivered", "95%+ client retention" `[M]` smarttraining.com.
- Revenue and funding for any of these: `[U]`.

### 5. What it legally takes to offer it
- No federal or NY license for HIPAA or OSHA consulting was found `[U]`. A vendor that handles PHI becomes a business associate and needs a BAA under 45 CFR 164.502(e) and 164.504(e) `[U]` (not opened).

### 6. The work itself
- Steps (SRA questionnaire, policies, training, BAA log) are vendor-defined. No government filing and no government fee.

### 7. Recurrence
- The rule requires risk analysis to be "accurate and thorough", with ongoing review under 164.308(a)(8) `[U]` for the exact text. Vendors sell yearly or monthly subscriptions (above).

### 8. Ad policy
- Not checked `[U]`.

### 9. Search demand
- Not found `[U]`.

### 10. Not found / not verified
- OCR counts for CY2025 or 2026, and the share involving small practices. Compliancy Group's exact current tiers. Abyde, HIPAAtrek and MedSafe prices. OSHA recordkeeping exemption rows. Funding and revenue for all vendors.

---

## (b) DEA registration and NY controlled-substance steps

### 1. What it is and who buys it
- Every practitioner who prescribes, administers or dispenses controlled substances must register (21 CFR 1301.11(a), as cited in DEA FAQ) `[M]` https://www.deadiversion.usdoj.gov/faq/registration-faq.html. A separate registration is required for each principal place of business in each state (same FAQ) `[M]`.
- New application: DEA Form 224. Renewal: Form 224a. Online only (final rules of July 24 2020 and April 11 2022) `[M]` https://www.deadiversion.usdoj.gov/drugreg/registration.html.

### 2. Volume
| Business activity | US, cycle 10-2026 | US, cycle 10-2025 | NY, 10-2026 | NY, 10-2025 |
|---|---|---|---|---|
| Practitioner (C) | 1,502,954 | 1,475,685 | 94,867 | 94,527 |
| Mid-Level Practitioner (M) | 684,731 | 643,772 | 45,684 | 43,750 |

`[M]` DEA Registrant Population by State and Business Activity, https://apps.deadiversion.usdoj.gov/RAPR/raprRegistrantPopulationByStateAndBusinessActivity.xhtml (queried Nov 18 2026). Year-over-year net change [CALC]: US practitioners +27,269, US mid-level +40,959; NY practitioners +340, NY mid-level +1,934. These are net figures, not counts of new registrations.
- DOJ OIG Audit 26-069 (July 2026): "Between fiscal years (FY) 2022 and 2024, the DEA received over 2.1 million initial and renewal applications", and "approximately 1.5 million renewal applications were auto-approved" without secondary review `[M]` https://oig.justice.gov/sites/default/files/reports/26-069.pdf. A separate count of new registrations per year is `[U]`.

### 3. Who sells it
- Harbor Compliance lists DEA as an agency it files with ("paid services and software to help you file"). No service price was shown `[M]` https://www.harborcompliance.com/information/agency/united-states-drug-enforcement-administration-diversion-control-division.
- No other named provider with an own-page DEA price was found before the search budget ran out `[U]`. A "$149 processing charge" cited by thepricer.org is unverified `[S]`.

### 4. Size evidence
- `[U]`.

### 5. Legal: who may submit
- 21 CFR 1301.13(j): applications "shall be signed by the applicant, if an individual"; "An applicant may authorize one or more individuals" to sign "by filing with the Registration Unit of the Administration a power of attorney for each such individual." `[M]` https://www.law.cornell.edu/cfr/text/21/1301.13.
- No DEA guidance specific to third-party preparers was found `[U]`.

### 6. The work itself
- Fee: $888 per 3 years for practitioners and mid-levels `[M]` OIG 26-069, p. 2; same figure on Harbor's agency page `[M]`. In effect since the Oct 1 2020 fee rule `[S]`. No pending fee NPRM was found `[S]`.
- Period: expires 36 months after the initial expiration date (21 CFR 1301.13(d)) `[M]`.
- Renewal emails go out at 60, 45, 30, 15 and 5 days before expiry. A registration can be reinstated within one calendar month after expiry. A timely renewal lets the registrant keep operating until DEA acts `[M]` registration.html.
- Initial applications get a specialist's review (SSN, background, state license and address checks) `[M]` OIG 26-069.
- Published processing time: `[U]`.
- One-time 8-hour MATE Act training attestation (DEA page lists "Opioid Use Disorder – MATE Act training requirements") `[M]` for the page heading; text not opened.

### 6a. New York specifics
- **No separate NY controlled-substance license for individual practitioners was found.** NY requires the following:
  - **Official Prescription Program registration with the Bureau of Narcotic Enforcement (BNE).** "Before a practitioner can order official prescriptions, the practitioner must register with the Bureau of Narcotic Enforcement," and "PHL requires that practitioners renew their registration with the Department every two years." Online via ROPES on the Health Commerce System (HCS). PAs file paper forms DOH-4329 and DOH-5054. Fee not stated `[M]` https://www.health.ny.gov/professionals/narcotic/official_prescription_program/.
  - **Mandatory e-prescribing** of controlled and non-controlled prescriptions since March 27 2016, with exceptions. EPCS software must meet DEA rules and "must be registered with the Department of Health, Bureau of Narcotic Enforcement" (PHL 3302(35); 10 NYCRR 80.64). The practitioner registers EPCS software in ROPES via HCS: "All Practitioners can go online after 24 - 48 hours of registering and enter their EPCS themselves." `[M]` health.ny.gov …/electronic_prescribing/requirements.htm and …/ropes.htm.
  - **I-STOP PMP:** since August 27 2013 most prescribers must consult the PMP Registry before prescribing Schedule II–IV. Access is via HCS. A designee can be assigned `[M]` https://www.health.ny.gov/professionals/narcotic/prescription_monitoring/.
  - Mandatory prescriber education (page heading exists) `[M]` for the heading; details `[U]`.

### 7. Recurrence
- DEA every 3 years at $888 `[M]`. NY BNE official-prescription registration every 2 years `[M]`.

### 8. Ad policy
- `[U]`.

### 9. Search demand
- `[U]`.

### 10. Not found / not verified
- New DEA registrations per year. Named DEA-help services and their prices. DEA processing times. Any HCS account fee (none seen). Whether a non-employee may hold a PMP designee role.

---

## (c) CLIA certificates of waiver and NY lab rules

### 1–2. What it is; volume
- Under CLIA, labs "are generally required to have the appropriate certificate before they can begin testing". Certificate of Waiver covers waived tests only. All certificates are valid 2 years `[M]` CMS CLIA Certification Quick Start Guide, Nov 2026, https://www.cms.gov/files/document/clia-cert-quick-start-guide.pdf.
- CMS CLIA statistics, **November 2026** `[M]` https://www.cms.gov/files/document/laboratory-statistics.pdf:
  - Labs registered (non-exempt): 282,264, of which 112,817 are physician office labs (POLs)
  - **Certificates of Waiver: 230,652 (84,028 POLs)**. PPM 20,996. Compliance 15,164. Accreditation 15,452.
  - **New York (non-exempt): Waiver 3,826**, Compliance 648, PPMP 405, Accreditation 97. NY CLIA-exempt labs: 7,282.
- New certificates of waiver per year: not published in this file `[U]`.

### 3–4. Who sells it
- No provider pages were reached before the budget ran out `[U]`.

### 5–6. The work, fees, NY rules
- Form CMS-116 (04/2026 version, OMB 0938-0581). The steps `[M]` from the Quick Start Guide:
  1. Fill in the fillable PDF (Waiver: sections 1–6 and 9–10).
  2. Submit it to the State Agency.
  3. Receive the fee notice by email and pay on pay.gov.
  4. Receive the certificate by email.
  5. Report changes (ownership, name, location, director) to the State Agency within 30 days.
- Paper coupons and certificates ended March 1 2026. Fees are paid only on pay.gov (ACH or card) `[M]` https://www.cms.gov/files/document/clia-paperless-faq-sheet.pdf.
- Fee: Certificate of Waiver **$248 biennial**; PPM $297 `[S]` (snippet of the CMS fee schedule PDF, after the Dec 28 2023 fee rule, 88 FR / FR Doc 2023-28170).
- **New York:**
  - PHL 579(1) excludes labs run by licensed physicians and similar practitioners testing "solely as an adjunct to the treatment of his or her own patients" from the state permit title `[M]` https://www.nysenate.gov/legislation/laws/PBH/579.
  - PHL 579(3)(b): Limited Service Laboratory registration (waived tests and PPM) runs "for a period of up to two years" and carries a "two hundred dollar biennial registration fee for each location" `[M]` same.
  - LSL instructions state that private physician office labs are the only facilities exempt from LSL registration `[S]` (DOH-4081 PDF did not download).
  - NY physician practices testing their own patients get CMS CLIA certification through DOH's Physician Office Laboratory Evaluation Program (POLEP) `[S]` health.ny.gov lead-testing page snippet.
  - CLEP issued amended regulations on 09/02/2026 (Subpart 58-…) `[M]` heading on wadsworth.org/regulatory/clep; content not read.

### 7. Recurrence
- CLIA every 2 years. NY LSL every 2 years at $200 per location `[M]`.

### 8–9. Ad policy; search demand
- `[U]`.

### 10. Not found / not verified
- New waiver certificates per year. Current CMS fee page (opened only as a snippet). Whether nurse-practitioner-owned or therapist-owned NY practices fall under the PHL 579(1) exclusion or need LSL registration (text names "licensed physicians and similar practitioners"; exact list not read). Provider prices.

---

## (d) New-employer setup for a NY practice's first hire

### 1. Triggering requirements and agencies
| Item | Agency / form | Fee | Online? | Tag |
|---|---|---|---|---|
| UI + withholding + wage-reporting registration | NYS DOL, Form NYS-100 | None found | Yes, via NY Business Express | `[S]` dol.ny.gov form pages (403 to fetch). Fee `[U]`. |
| Quarterly combined return | NYS-45 | — | Yes | `[S]` |
| UI rates 2026 | New-employer total 4.1% (4.025% UI + 0.075% RSF); wage base **$17,600** (2025: $12,800) | — | — | `[S]` snippet of https://dol.ny.gov/unemployment-insurance-rate-information |
| Workers' compensation | Insurance from a private carrier, NYSIF or self-insurance | Premium | — | `[M]` WCB DBL page lists these three routes. "NYSIF must provide insurance to any employer seeking coverage." |
| Disability (DBL) | WCL Art. 9. Covered employer = "one or more employees on each of at least thirty days in any calendar year". Coverage due "four weeks following the thirtieth day" | Employee share 0.5% of wages, max $0.60/week | — | `[M]` https://www.nysenate.gov/legislation/laws/WKC/202; https://www.wcb.ny.gov/content/main/DisabilityBenefits/employer-disability-benefits.jsp |
| Paid Family Leave | Rider on the DBL policy. 2026 employee rate 0.432%, annual max $411.91 | — | — | `[M]` WCB page for the rider; rate `[S]` WCB 2026 press release snippet |
| Pay notice at hire | Labor Law 195(1): written notice in English and the primary language, with a signed acknowledgment kept 6 years | — | — | `[M]` https://www.nysenate.gov/legislation/laws/LAB/195 |
| Sexual harassment policy and annual interactive training | Labor Law 201-g: "Every employer shall adopt the model sexual harassment prevention policy". Training "on an annual basis". Written notice at hire | — | — | `[M]` https://www.nysenate.gov/legislation/laws/LAB/201-G |
| Posters | dol.ny.gov/posting-requirements-0; a new law (A7595) requires posters to be available online | — | — | `[S]` |
| Paid sick leave (LL 196-b), HERO Act (LL 218-b), electronic-monitoring notice (Civ. Rights 52-c), new-hire reporting (Tax Law 171-h) | — | — | — | `[U]` not opened this run |

### 3. Who sells it
| Provider | Price | Includes | Tag |
|---|---|---|---|
| Mosey | Essential $399/mo or $3,999/yr (≤50 employees, up to 15 states) + $399 implementation; 1 registration/month included, extra registrations $150 | State and local payroll registrations, posters, policy generator, handbooks $2/employee/month, tax-account mailroom | `[M]` https://mosey.com/pricing/ |
| Gusto, ADP, Paychex, Justworks, Middesk, Harbor Compliance, CorpNet | — | — | `[U]`: gusto.com 403; Middesk and Harbor URLs 404; the search budget was used up |

### 4. Size evidence
- `[U]`.

### 5. Legal: selling WC/DBL coverage
- Insurance Law 2102(a)(1)(A): "No person, firm, association or corporation shall act as an insurance producer … in this state without having authority to do so by virtue of a license" `[M]` https://www.nysenate.gov/legislation/laws/ISC/2102.
- 2101 defines "solicit" as "attempting to sell insurance or asking or urging a person to apply for a particular kind of insurance", and "negotiate" as "conferring directly with or offering advice directly to a purchaser" about a particular contract `[M]` https://www.nysenate.gov/legislation/laws/ISC/2101.
- 2102(e)(3) allows insurers or licensed producers to pay consideration to "persons who do not sell, solicit or negotiate a contract of insurance in this state", unless another provision of the chapter forbids it `[M]`.

### 7. Recurrence
- NYS-45 quarterly. DBL/PFL and WC premiums yearly. Harassment training yearly. PFL rate reset each year by DFS (2027 rate 0.452% per GTM `[S]`).

### 8–9. Ad policy; search demand
- `[U]`.

### 10. Not found / not verified
- NYS-100 fee and processing time (dol.ny.gov blocked). Payroll provider prices. Official poster list. Statute text for 196-b, 218-b, 52-c and 171-h.

---

## (e) Other first-two-year government registrations or filings (not excluded)

The list was compiled from the sources above. Items marked `[U]` were **not opened** and need checking.

| Item | Agency | Form | Fee | Frequency | Tag |
|---|---|---|---|---|---|
| NY BNE official prescription registration and EPCS software registration | NYSDOH BNE | ROPES (HCS); PAs use DOH-4329/5054 | Not stated | Every 2 years | `[M]` |
| HCS account (needed for ROPES and PMP) | NYSDOH | HCS application | Not stated | Once | `[M]` mentioned on ROPES page |
| NY Limited Service Lab registration (non-physician-office labs) | NYSDOH Wadsworth CLEP | DOH-4081 | $200 per location | Biennial | `[M]` PHL 579 |
| CLIA certificate (any practice doing waived tests) | CMS via State Agency | CMS-116 | $248 (waiver) | Biennial | `[M]` / `[S]` |
| DEA registration per location | DEA | 224 / 224a | $888 | 3 years | `[M]` |
| NY UI/withholding registration and quarterly NYS-45 | NYS DOL / DTF | NYS-100, NYS-45 | — | Once, then quarterly | `[S]` |
| DBL/PFL and WC coverage | Carrier or NYSIF; WCB | Policy | Premium | Annual | `[M]` |
| Dental/medical X-ray equipment registration | NYSDOH Bureau of Environmental Radiation Protection (outside NYC); NYC DOHMH Office of Radiological Health | — | — | — | `[U]` |
| Regulated medical waste generator obligations | NYS DEC / NYSDOH | — | — | — | `[U]` |
| NP collaborative relationship / practice-agreement attestation (NPs under the experience threshold) | NYSED | — | — | — | `[U]` (overlaps the excluded NYSED personal-license line) |
| NYS PTET annual election; NYC UBT for PLLCs in NYC | DTF; NYC DOF | — | — | Annual | `[U]` |
| NY LLC Transparency Act (beneficial-owner filing, effective Jan 1 2026) and which LLCs it covers | NYS DOS | — | — | — | `[U]` |
| Federal BOI (CTA) for domestic entities | FinCEN | — | — | — | `[U]` (March 2025 interim rule status not verified this run) |

---

## Not found / not verified (consolidated)
1. HHS OCR enforcement counts for the latest year and the small-practice share (hhs.gov 403).
2. New DEA registrations per year; named DEA-filing services with prices.
3. New CLIA certificates of waiver per year; current CMS fee page (snippet only).
4. Prices for Compliancy Group (snippet only), Abyde, HIPAAtrek (aggregator only), MedSafe and HealthFirst (snippet only).
5. Revenue or funding for any HIPAA/OSHA vendor.
6. NYS-100 fee and processing time; payroll-registration vendor prices other than Mosey.
7. All of the Google Ads policy checks and search-volume figures (sections 8–9) for every line.
8. Item (e) rows marked `[U]`.
9. Count of new solo/small healthcare practices per year in NY or the US. BFS NAICS 62 is broader than practices and has no NY × sector cut.
