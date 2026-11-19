# 03 · Multi-state professional entity market (outside New York)

Research date: Nov 18 2026. Facts only. Tags: `[M]` primary source opened · `[S]` secondary / search snippet / competitor page · `[U]` looked for, not found · `[CALC]` arithmetic on source figures.

Service lines:
- (a) Forming professional entities (PLLC, PC, PA, professional LLC) in states other than New York.
- (b) Multi-state "friendly PC" / PC-MSO / "50-state PC network" setup and upkeep for telehealth and multi-state healthcare companies.
- (c) Foreign-qualifying an existing professional entity into other states (outbound, not into NY).

Method note: the shared web-search budget for this run ran out partway through. States not queried before the cap are listed under §10 as not checked, not as "publishes nothing".

---

## 1. What it is and who buys it

**(a)** In most states, licensed professionals who want an entity for their practice must use a professional entity form (PC, PA, PLLC), and in some states a licensing-board step comes before or after the Secretary of State filing. Examples from the pages opened:
- California: healthcare professionals "generally cannot operate through a standard business corporation — they are required to form a professional corporation that complies with the Moscone-Knox Professional Corporation Act" (West Coast Health Law Group package, `[M]`, cdn.lawlytics.com/…/Corporation-Formation-Package.docx, undated). A Medical Board fictitious name permit is needed to trade under a name other than the corporation's (Bay Legal pricing page, `[M]`, baylegal.com/practice-areas/business-formation/entity-formation-pricing/, "Last updated October 2026").
- Illinois: PLLCs register with IDFPR as well as the Secretary of State; "The registration fee is $50.00 … All Professional Limited Liability Company registrations expire January 1 on a three‑year renewal cycle" (IDFPR checklist, quoted in a search snippet, `[S]`, idfpr.illinois.gov/Forms/Online/(248) Limited Liability Company User Guide.pdf).
- Texas: professional LLC files a separate certificate of formation; filing fee $300 (Swyft / Northwest pages via snippets, `[S]`).
Statutory detail is covered by another agent; not repeated here.

**(b)** Corporate-practice-of-medicine rules lead telehealth companies to run clinical services through a physician-owned PC managed by the company's MSO. Permit Health (`[M]`, permithealth.com/post/the-friendly-pc-mso-model-for-corporate-practice-of-medicine-compliance, Dec 23 2025) lists its products as "MSO-PC Formation", "Friendly PC Owner: Match with a 50-state licensed PC owner", "50-State PC Network: Plug into our existing 50-state PC entities". Foundry PC (`[M]`, foundry-pc.com/mso-pc-formation, Nov 6 2026) says it does not use a pre-built PC for all 50 states and forms in "the states you are actually launching". Buyers: telehealth brands, DTC clinics, multi-state groups.

**(c)** An entity formed in one state that transacts business in another registers there as a foreign entity (certificate of authority). For professional entities, some states also require board steps; Oregon and Colorado registries carry a separate "Foreign Professional Corporation" / "FPC" type (see §2).

---

## 2. Annual volume of the triggering event

### 2.1 State registries with queryable entity-type data (pulled Nov 18 2026)

| State | Data source | Year | Domestic professional entities | Foreign professional entities | Notes |
|---|---|---|---|---|---|
| Oregon | data.oregon.gov dataset `tckn-sxa6` "Active Businesses – ALL" `[M]` | 2024 | 95 Domestic Professional Corporation | 98 Foreign Professional Corporation | Active entities only (registry date in year; one row per entity using the REGISTERED AGENT row). Oregon has no PLLC type; 1 domestic and 88 foreign LLCs registered in 2025 have a PLLC suffix. |
| Oregon | same `[M]` | 2025 | 114 | 117 | as above |
| Colorado | data.colorado.gov dataset `4ykn-tg5h` "Business Entities in Colorado" `[M]` | 2025 | No separate professional type. Name proxy (name ends "PLLC", "P.L.L.C.", "P.C." or " PC"): 1,315 domestic LLC + 167 domestic profit corp = **1,482** `[CALC]` | 89 foreign LLC + 65 foreign profit corp = **154** `[CALC]` (plus 78 "FO" rows) | Proxy, not a legal type. All 2025 filings: DLLC 140,480; DPC 27,447; FLLC 7,429; FPC 3,343. |
| Connecticut | data.ct.gov dataset `n7gp-d28j` "Business Registry – Business Master" `[M]` | 2025 | No separate professional type. Name proxy: 556 domestic LLC + 77 domestic stock = **633** `[CALC]` | 105 foreign LLC + 175 foreign stock = **280** `[CALC]` | Proxy. All 2025 registrations: LLC domestic 47,904; LLC foreign 5,161; Stock domestic 2,188; Stock foreign 3,302. 2024: LLC dom 43,492, LLC for 4,712. |
| Texas | Texas SOS figures quoted in UT CLE presentations (search snippet only; the PDFs returned 404) `[S]` | 2019 / 2020 / 2021 | Professional corporations 570 / 518 / 565; professional associations 304 / 268 / 254. 2018: PC 686, PA 408. | not given | Snippet says PLLCs are not broken out from LLCs. Primary SOS table `[U]`. |
| Florida | `[S]` only | 2025 | `[U]` professional-association / PLLC count | `[U]` | Florida DOS says the division "processed over 670,000 business entity filings" in 2025 (dos.fl.gov year-in-review press release, snippet `[S]`). Sunbiz bulk data (SFTP) not downloaded. |

Queries used (SoQL), so the figures can be re-run:
- Oregon: `$where=registry_date between '2025-01-01' and '2025-12-31' AND associated_name_type='REGISTERED AGENT' AND entity_type like '%PROFESSIONAL%'`, grouped by entity_type.
- Colorado: `entityformdate` in 2025, grouped by `entitytype`, name filter on `entityname`.
- Connecticut: `date_registration` in 2025, grouped by `business_type, citizenship`, name filter on `name`.

### 2.2 States not resolved
- **Checked, no separate professional type in the dataset:** Colorado, Connecticut (name proxy above only).
- **Searched, nothing usable found before the search cap:** Texas (primary table `[U]`), Florida (`[U]`).
- **Not checked (search budget exhausted):** CA, NJ, IL, MI, NC, AZ, WA, PA, MA, OH, GA, VA, MD. `[U]`

### 2.3 National: new healthcare organization NPIs
- CMS "Enumeration Reports" page lists an "NPI Enumeration Statistics by State / Entity Type" file shown as updated 6/30/2016 (search snippet `[S]`, cms.gov/medicare/regulations-guidance/administrative-simplification/enumeration-reports). No newer official annual series found `[U]`.
- NPIScan (third party, built from NPPES enumeration dates, article Feb 2026) `[S]`, npiscan.com/blog/healthcare-provider-boom-2025:

| Year | New NPIs total | Type 1 (individual) | Type 2 (organization) |
|---|---|---|---|
| 2024 | 547,544 | 447,526 | 100,018 |
| 2025 | 631,649 | 519,201 | 112,448 |

  No Type 2 by-state figures on that page. Other NPIScan pages give different totals (search snippet `[S]`). Type 2 covers every organization type (hospitals, pharmacies, group practices, etc.), not only professional entities.

---

## 3. Who sells it today (own pages where opened)

### 3.1 Line (a): professional entity formation

| Provider | Offers PLLC/PC? | Price seen | Board step included? | Source / tag |
|---|---|---|---|---|
| LegalZoom | Yes, "LLC filing service supports PLLCs (when allowed by the state)" | "start at $0 plus state filing fees" (own page). ZenBusiness review says $129 PLLC / $199 PC, phone order only | Own page: will "ensure your documents comply with both state regulations and licensing board requirements"; tells user to "contact your professional board" | `[M]` legalzoom.com/articles/how-to-start-a-pllc-licensed-practitioners (Sep 5 2025); `[S]` zenbusiness.com/legalzoom-pllc-and-pc-service-review/ (Sep 14 2026) |
| ZenBusiness | No. "ZenBusiness doesn't currently offer professional entity formations" | n/a | n/a | `[M]` zenbusiness.com/best-pllc-pc-services/ (Jul 11 2025) |
| Northwest Registered Agent | Has state PLLC/PC guide pages (TX, WA, IL, CA PC, NY) | $39 + state fees incl. 1 yr RA, then $125/yr (snippet). ZenBusiness page says Northwest does not offer PLLC/PC formation | Not verified | `[S]` (site returned 403 to fetch and curl) |
| Bizee (formerly Incfile) | Entity menu lists LLC, S corp, C corp, nonprofit; no PLLC/PC seen. ZenBusiness says Incfile does not offer PLLC/PC | $0 / $199 / $299 + state fee (LLC) | n/a | `[S]` |
| Rocket Lawyer | Corporation page has a "Professional entities" nav link only | Corp: "$0 with a Rocket Lawyer membership", additional $99. ZenBusiness review: $99.99 + state fee for PLLC/PC | `[U]` | `[M]` rocketlawyer.com/corporation; `[S]` ZenBusiness review |
| Harbor Compliance | LLC page does not mention PLLC | LLC "Starting at $99 plus state fees" | No mention of boards | `[M]` harborcompliance.com/limited-liability-company |
| Tailor Brands | Not found; only a New Hampshire PLLC guide | LLC Lite $0 + state fees; Essential $199/yr | `[U]` | `[S]` |
| CorpNet | Yes, PLLC and PC | Basic $99 / Deluxe $219 / Complete $269 (standard); express $249–$419; rush $349–$519; plus state fees and 3% convenience fee | Page does not say CorpNet handles board approval; FAQ: "check with your profession's state licensing board" | `[M]` corpnet.com/about/pricing/ and /start-business/professional-corporation/ (©2026) |
| Swyft Filings | Per ZenBusiness: same price as standard entities | $0 / $169 / $269 + state fee (LLC tiers) | `[U]` | `[S]` |
| Nationwide Incorporators | Yes, PLLC/PC package | $825–$1,475 by state; incl. 1 yr RA + EIN, attorney review | `[U]` | `[S]` ZenBusiness review |
| IncParadise | PLLC only (per ZenBusiness) | $89 | `[U]` | `[S]` |
| SunDoc Filings | Files PLLC documents the customer prepares | $79 | No | `[S]` |
| Bay Legal (CA law firm) | Medical and other professional corporations | $3,500 flat incl. state fees (articles, EIN, bylaws, SOI); fictitious name permit add-on "from $250" | Guidance included; board permit filing is the add-on | `[M]` baylegal.com/…/entity-formation-pricing/ (Oct 2026) |
| West Coast Health Law Group (CA law firm) | CA professional corporation for healthcare | "$1,995" flat + government fees "estimated at $135"; board fictitious name permit add-on $500; S-corp election add-on $500; local permit add-on $500 | Board permit is a $500 add-on: "We handle the application, board submission, and follow-through" | `[M]` package .docx at cdn.lawlytics.com/law-media/uploads/5995/357855/original/Corporation-Formation-Package.docx (undated) |
| LLC Attorney (llcattorney.com) | Profession landing pages (psychiatry, OT, speech therapy); page does not say it forms PLLC/PC specifically | Starter $49 / Professional $199 / International+ $399 + state fees | "Verify with your state medical board before filing" | `[M]` llcattorney.com/industries/psychiatry-llc |
| Discern (entity compliance software/RA) | Lists "Professional corporation formation with licensing coordination" (CA page) | No price; "Book a Demo" | Says licensing coordination | `[M]` discern.com/resources/california-healthcare-compliance-entity-management |
| Texas firms (general LLC/corp, not PLLC-specific) | Flat-fee LLC/corp formation | $1,500 incl. $300 SOS fee (one firm); $2,500 (another) | not stated | `[S]` snippets (mikeyounglaw.com, klemchuk.com) |

### 3.2 Line (b): multi-state friendly PC / PC-MSO / PC network

| Provider | What they sell (own words where opened) | Published price | Source / tag |
|---|---|---|---|
| Foundry PC | "MSO-PC Formation … Documents and project management with healthcare counsel"; "Friendly PC Owner … Ongoing physician ownership of the PC"; forms only in launch states | $15,000 one-time formation; $3,000/mo friendly PC owner; state fees at cost; healthcare counsel engaged and paid directly by client | `[M]` foundry-pc.com/mso-pc-formation (Nov 6 2026). Its cost guide (snippet) gives $2,000–$8,000/mo owner and $12,000–$30,000 single-state MSO-PC `[S]` |
| Permit Health | MSO-PC formation; 50-state licensed PC owner; "Plug into our existing 50-state PC entities"; collaborating physicians; "live in all 50 U.S. states and D.C." | No figures. Pricing page FAQ: "a small monthly fee for your first state, and then a modest additional fee" per added state | `[M]` permithealth.com/pricing and blog (Dec 23 2025) |
| Cuvo Health | "Builds and maintains both the MSO and the physician-owned professional entity for every brand"; 300+ clinicians in 50 states + DC, PR, Guam | Launch $9,800 setup + $997/mo; Grow $15,000 setup + $2,500/mo; $25 per completed consult | `[M]` cuvo.co/blog/telehealth-mso-companies (self-published, updated Nov 3 2026) |
| MyOrbitHealth | White-label platform with MSO/PC structure, 50 states | No price list; flat platform fee scoped at onboarding | `[M]` myorbithealth.com/blog/telehealth-mso-companies (self-published, Oct 6 2026) |
| Qualiphy | Operates as Qualiphy PC, 350+ providers, 48 states + DC | $27.99 per med spa exam | `[S]` (as described on Cuvo page) |
| Wheel | Wheel Medical Group, 50-state clinician network | Quote only | `[S]` |
| OpenLoop, SteadyMD, Beluga Health, Telegra, Fuse Health, Karpa, Rimo, White Label MD | Clinician networks / platforms; competitor pages say they do not set up a PC for the brand (OpenLoop, SteadyMD) or do not publish PC terms | Telegra $2,999/mo + $5,000 onboarding or $5,999/mo + $10,000; Fuse $699/mo or $3,000/mo + 2% | `[S]` (Cuvo / MyOrbit comparison pages) |
| Zivian Health | "helps healthcare enterprises navigate … CPOM and PC ownership"; site nav has a "PC Owners" page | No price | `[M]` zivianhealth.com/blog/what-is-a-pc-owner (Jun 25 2024) |
| Law firms (generic) | One source estimates ~$1,000 per state per PC and 1–2 months; another estimates 1–3 months for corporate setup | No law firm rate card for multi-state PC networks found | `[S]` snippets; named firm price `[U]` |

### 3.3 Line (c): foreign qualification

| Provider | Price | Mentions professional entities / boards? | Source / tag |
|---|---|---|---|
| Harbor Compliance | "$399 service fee includes registered agent" (+ filing fees); includes good standing, certificate of authority filing, 1 yr RA | No | `[M]` harborcompliance.com/foreign-qualification |
| CorpNet | $239 standard / $389 express / $489 rush without RA; $388 / $539 / $639 with RA; plus state fees and 3% | No | `[M]` corpnet.com/about/pricing/ |
| InCorp | "starts at $149 plus state fees", includes home-state good standing | No | `[M]` incorp.com/foreign-qualification |
| LegalZoom | Own page shows totals only after state selection; review snippet: $229 standard / $339 rush + state fees | No | `[M]` legalzoom.com/…/foreign-qualifications-for-business-pricing.html; `[S]` |
| Incfile / Bizee | $149 + state fee | `[U]` | `[S]` (startupsavant review) |
| BizFilings | $219 + state fee | `[U]` | `[S]` |
| FileForms | $149 per state + state fees | `[U]` | `[S]` |
| CT Corporation | $380 + state fees | `[U]` | `[S]` |

None of the foreign-qualification pages opened mention PLLC/PC or licensing-board steps.

---

## 4. Size evidence for providers

| Company | Figure | Source / tag |
|---|---|---|
| OpenLoop | Series A $8M (Mar 2022), $15M (Mar 2023); total ~$26.5M (CB Insights) or ~$18M (ZoomInfo) | `[S]` mobihealthnews.com, cbinsights.com |
| Wheel | $150M Series A; total $216M (article date not shown) | `[S]` mobihealthnews.com |
| Cuvo Health | "300+" clinicians, 50 states + DC/PR/Guam | `[M]` self-published |
| Qualiphy | "350+ providers", 48 states + DC | `[S]` |
| Harbor Compliance | 4.3/5 Google rating from 212 clients (on page) | `[M]` |
| STAT report | Beluga, OpenLoop, MD Integrations, Telegra named as nationwide medical groups affiliated with at least 30% of 70+ telehealth companies warned by FDA | `[S]` snippet |
| Foundry PC, Permit Health, Zivian, SteadyMD, Beluga funding | `[U]` |
| LegalZoom, CorpNet, Northwest PLLC-specific order counts | `[U]` |

---

## 5–7. Legal, work and recurrence (short; another agent covers state rules)

- Filing fees seen: TX PLLC $300 `[S]`; WA PLLC $200 online / $180 paper `[S]`; IL articles $150 + IDFPR $50 (3-year renewal) `[S]`; CA PC fees ~$135 incl. SOI (West Coast Health Law Group) `[M]`; CorpNet table range for PCs $35 (MT) to $744 (NV) `[S]`.
- California board fictitious name permit approval "currently averages 4 to 6 weeks" per one firm `[S]`.
- CA corporations: $800 minimum franchise tax and $25 Statement of Information (Discern page) `[M]`.
- Friendly PC: Withum notes a proposed federal bill targeting MSO/friendly PC structures `[S]`.
- Recurring fees offered by providers: Northwest RA $125/yr `[S]`; CorpNet RA $149/yr retail, bulk down to $49/unit/yr at 1,001+ units `[M]`; Foundry owner $3,000/mo `[M]`; Cuvo $997–$2,500/mo `[M]`.

---

## 8. Advertising limits (Google Ads)

- Government documents and services policy `[M]` support.google.com/adspolicy/answer/13156083 (no date shown, ©2026): business identifiers are in scope, with examples including "Applying for a company registration number or business serial number"; US EIN listed. "Only certified governments and authorized providers may run ads that promote direct acquisition" of these. Google adds "Not a government website" to Search ads in the category unless the advertiser is a certified government provider. No US region is listed as excluded.
- October 2026 update `[M]` support.google.com/adspolicy/answer/17260489 (posted Aug 4 2026, enforced Oct 5 2026): authorized provider = domain linked from an official government website and explicitly referenced as authorized; ads limited to the authorized document and region. Not accepted as authorization: "Commercial contracts;", "Business/trade licenses;", "Registrations or entries on business registries, irrespective of whether they are government-managed;", and articles or blog posts on government sites.
- Whether Google applies this policy to Secretary of State entity formation (as opposed to the EIN step) is not stated on either page `[U]`.

## 9. Public search-demand figures

- No public monthly volume figures found for "[state] pllc", "form a pllc in [state]" or "professional corporation [state]" `[U]`. Semrush, Ahrefs and Google Keyword Planner need an account; the repo's Google Ads tooling has no Keyword Planner function, and none was written for this report.

## 10. Not found / not verified

- State counts not checked (search cap): CA, NJ, IL, MI, NC, AZ, WA, PA, MA, OH, GA, VA, MD.
- Texas primary SOS table by entity type (only CLE snippet figures); Texas PLLC counts.
- Florida PA/PLLC annual count (Sunbiz bulk data not downloaded).
- Official CMS annual new Type 2 NPI counts by state (only third-party NPIScan national totals).
- Colorado and Connecticut figures are name-suffix proxies, not legal entity types; " PC" suffix can catch non-professional names; entities using "Professional Corporation" spelled out are missed.
- Oregon figures cover currently active entities only.
- Northwest Registered Agent PLLC/PC price and scope (site blocked fetching; ZenBusiness says Northwest does not offer PLLC/PC formation, Northwest has PLLC guide pages).
- Bizee, Tailor Brands, Rocket Lawyer PLLC/PC offering on their own pages.
- Permit Health actual prices; any law firm rate card for multi-state PC networks.
- Funding for Foundry PC, Permit Health, Zivian, SteadyMD, Beluga.
- Any provider page that prices foreign qualification of a professional entity separately or includes board steps.
- Keyword volumes.
