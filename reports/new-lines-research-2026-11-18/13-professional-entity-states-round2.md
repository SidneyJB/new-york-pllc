# 13 · Professional-entity states, round 2 (fills the [U] cells in 02 and 03)

Research date: Nov 18 2026. Brief: [README.md](README.md). Round-1 files: [02](02-multistate-professional-entity-rules.md), [03](03-multistate-professional-entity-market.md). This file repeats round-1 facts only where a row needs them; "(r1)" marks a figure taken from those files.

Tags: `[M]` primary source opened · `[S-mirror]` statute text read on a mirror (FindLaw, texas.public.law) because the official site blocked the fetch · `[S]` secondary or search snippet · `[U]` looked for, not found or not opened · `[CALC]` arithmetic on source figures. California is out of scope (another agent).

**Method.** I used 41 web searches. Most pages were fetched by URL. Blocked or failing: ILGA and the CT General Assembly (certificate errors), MN SOS and MN Board of Medical Practice (bot check), GA SOS fee PDF, TN SOS, FL Sunbiz statistics and MA BoRM (403), and AZ ACJA 7-208 (404 at both URLs tried). For counts I queried state open-data APIs (Socrata) directly. Those queries are listed in §17.

---

## 1. Summary table

| State | Ordinary LLC allowed for healthcare licensees? | Board step (when, fee, renewal) | SOS formation fee | Publication | New professional entities per year | Main sources |
|---|---|---|---|---|---|---|
| **NC** | No. LLC may render professional services "only to the extent" a corporation could, complying with ch. 55B [M] | Board certificate **before** SOS: NCMB $50, Social Work $50, LCMHC $50 (up to 30 days), Psychology $50 [S]; Dental $50 after SOS. All renew yearly at $25 [M] | $125 (r1) | None | NCMB 2023: **617** new (147 PC + 470 PLLC); 5,531 registered [M]. SOS count [U] | G.S. 57D-2-02, 55B-4/-10/-11; board pages; NCMB annual reports |
| **IL** | No, where the profession is IDFPR-licensed: an LLC "must be formed in compliance with the Professional Limited Liability Company Act" [S-mirror] | IDFPR certificate **after** SOS, $50; expires Jan 1 every 3rd year; renewal $40 [S-mirror]. Medical corporation $50 [S-mirror] | $150 [S-mirror] | None | IDFPR PLLC registrations issued: **773** (2023), **1,115** (2024), **1,632** (2025) [M] | 805 ILCS 180/1-25, 185/15, 185/20, 15/5; data.illinois.gov |
| **NV** | No requirement found in NRS 89 [M] | Board certificate **inside** the articles (NRS 89.040(1)(c)) [M]. BME fee schedule lists no entity fee [M] | $75 articles + $150 list + $200 business license = $425 [M]/[S] | None | [U] | NRS 89, NRS 240A; BME fee PDF |
| **MN** | Only if no other law requires the 319B election or bars practice without it (319B.03 subd. 1) [M] | $100 per board **before** services; $25 per board yearly by Jan 1 [M] | $155 online / $135 mail [S] | None | [U] | Minn. Stat. 319B.03, 319B.11, 481.02 |
| **AZ** | PLLC is an election; the statute has no mandate; the ACC says to ask the board [M] | None in A.R.S. 29-4102 [M] | $50; $85 expedited [M] | Yes, unless the statutory agent is in Maricopa or Pima. $30–300 [S] | All new LLCs: 146,691 in FY2026 (121,223 the year before); professional not split out [M] | ACC fee schedule (Rev. 3.2026), L010i, FAQ, FY25-26 annual report |
| **TX** | [U]. SOS FAQ: "may be required to form as a professional entity" [M] | None on Form 206 [M] | PLLC $300, PC $300, PA $750 (r1) | None | Active taxpayers chartered in 2025: PC **670**, PA **195**, Texas LLCs with "PLLC" in the name **9,910** (proxy) [M] | Form 206; data.texas.gov 9cir-efmm |
| **NJ** | Yes for physicians: LLC "composed solely of health care professionals" (N.J.A.C. 13:35-6.16) [S] | None found [U] | $100 (r1) | None | [U] | BME rule; N.J.S.A. 54:10A-18; UPL Op. 47 |
| **PA** | Restricted professions (incl. medicine, dentistry, psychology) use a PLLC/RPC; others not listed [M] | None found [U] | $125 (r1) | Corporations: §1307, two newspapers [S]. LLCs: sources conflict [S] | Name proxy, 2025: 750 domestic (526 LLC + 224 corp) [CALC] | 15 Pa.C.S. §102, §8998; DOS page; data.pa.gov |
| **GA** | The LLC Act refers to "a person rendering professional services" [S-mirror] | None in O.C.G.A. 14-7-4 [S-mirror] | $100 + $10 service charge [S] | None | [U] | O.C.G.A. 14-11-1101, -314, 14-7-4 |
| **MD** | Yes: an LLC may "Render professional services" (§4A-203(10)) [M] | [U] | $100 [M] | None | [U] | Corps. & Ass'ns §1-203, §4A-203 |
| **CT** | [U] (statute site cert error) | None in C.G.S. 33-182c [S-mirror] | LLC $120 [M] | None | Name proxy, 2025: 633 domestic (r1) | business.ct.gov |
| **CO** | Physicians: "corporation" in 12-240-138 also covers LLCs and LLPs [S-mirror] | None in 12-240-138 [S-mirror] | $50 (online only) [M] | None | Name proxy, 2025: 1,482 domestic (r1) | SOS fee page |
| **TN** | PLLC is an election (48-248-104) [S-mirror]. Ordinary LLC [U] | None in 48-248-104 [S-mirror] | $300 [S] | None | [U] | sos.tn.gov (snippet) |
| **MA** | Listed professions need a board certificate to form an LLC (c.156C §6(c)) [M] | Regulatory board certificate attached; paper filing only [M]. Fee [U] | Professional LLC $500; professional PC $275 min. [M] | None | [U] | c.156A §2, c.156C §6, SOC fee schedule (3/14/22) |
| **FL** | Yes: ch. 621 is permissive ("may") [M] | None in ch. 621 [M] | LLC $125 incl. RA (r1) | None | [U] (Sunbiz statistics 403) | Fla. Stat. ch. 621 |

---

## 2. North Carolina

**1. Entity rules.**
- G.S. 57D-2-02(a) [M] ([link](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_57D/GS_57D-2-02.html)): "a limited liability company may engage in rendering professional services only to the extent that it would be able to render those services were it a corporation, including, as applicable, complying with Chapter 55B".
- G.S. 55B-2(6) [M] covers medicine, dentistry, registered nurses under the Nursing Practice Act, psychologists, MFT, OT, speech-language pathology and audiology, LCMHC, and LCSWs (ch. 90B), among others.
- Entity types: professional corporation (PC or PA) and PLLC.

**2. Board step.**

Statute [M]:
- G.S. 55B-4(4): the articles "shall be accompanied by a certification by the appropriate licensing board".
- G.S. 55B-10: no PC may operate "without first having obtained a certificate of registration". The fee is "not to exceed fifty dollars ($50.00)", and the certificate is effective "until January 1 following".
- G.S. 55B-11: renewal fee "not to exceed the sum of twenty-five dollars ($25.00)". A certificate not renewed within 30 days is suspended; reinstatement costs the renewal fee plus $10.

Board by board:

| Board | Order | Fee | Renewal | Processing time | Source |
|---|---|---|---|---|---|
| Medical | Before SOS | $50 | $25 yearly, $10 late | Not published | (r1) [M] |
| Social Work | Before SOS | $50 | $25 yearly | Not published | [M] ([page](https://www.ncswboard.gov/professional-corp-llc/)) |
| LCMHC | Before SOS | $50 | $25 yearly, expires Dec 31 | "allow up to 30 days" | [M] ([PDF](https://www.ncblcmhc.org/Assets/Forms/Incorporation_Instructions.pdf), file dated Jan 7 2020) |
| Dental | After SOS (online; upload filed articles) | $50 | $25 yearly | Not published | [M] ([page](https://ncdentalboard.org/Professional_corporation.htm)) |
| Psychology | [U] | $50 | $25 | [U] | 21 NCAC 54 .1605 [S] |

- **Social Work:** each organizer signs before a notary. The board returns a Certificate of Registration "to be used for filing with the Secretary of State". An amendment costs $25.
- **LCMHC:**
  - The applicant sends the application, $50 and the "unapproved Articles". The board returns a Certification of Application for the SOS filing.
  - That certification expires in 6 months.
  - The Certificate of Registration is issued after the approved articles are sent back to the board.
  - Only LCMHCs and LCMHCAs may be co-owners: "Any other profession is strictly prohibited."
- **Dental:** "Once registered with The Secretary of State… complete the online application for registration and pay the $50 fee. Upload the filed Articles." The name "must include your surname".
- **Nursing (NPs):** [U].

**3. SOS.** $125 articles; 24-hour expedite $100; same-day $200 (r1, [M]).

**4. Publication.** None.

**5. Annual.** SOS annual report: $200 LLC, $25 corporation (r1). Plus the board renewal ($25).

**6. Volume.**
- NCMB 2023 Annual Report [M] ([PDF](https://www.ncmedboard.org/images/uploads/disciplinary_reports/NCMB_AnnualReport2023_3_22_24.pdf), p. 9, "MEDICAL CORPORATIONS IN 2023"):
  - New registrants (total): 617 (professional corporations 147, PLLCs 470).
  - Total registrants: PC 2,400, PLLC 3,131 (5,531 [CALC]).
- NCMB 2025 Annual Report [M] ([PDF](https://www.ncmedboard.org/images/uploads/disciplinary_reports/NCMB_2025AnnualReport_05272026_web.pdf)): "Corporation fees $172,700" (2023 report: $154,300). The extracted text gives no 2025 registrant count [U].
- NC SOS counts by entity type: [U]. Other NC boards' counts: [U].

**7. Providers.**
- Northwest Registered Agent NC PLLC guide [S] (search snippet; the site returns 403): $125 state fee; RA $125/yr; "Before you can form your company, you must have already received your license."
- No NC law-firm flat fee for a PLLC was found [U]. One snippet gives a general range of "$500 to $1,500 flat-fee" (terms.law NC guide) [S].

**8. Non-attorney preparers.**
- G.S. 84-2.1(a) [M] ([link](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_84/GS_84-2.1.html)): "practice law" means "performing any legal service for any other person, firm or corporation, with or without compensation". Business-formation papers are not named.
- G.S. 84-2.2 [M] ([link](https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_84/GS_84-2.2.html)):
  - The practice of law "does not include the operation of a website by a provider that offers consumers access to interactive software that generates a legal document based on the consumer's answers," if seven conditions are met.
  - Among the conditions: a North Carolina attorney "has reviewed each blank template", and the consumer is told the forms "are not a substitute for the advice or services of an attorney".
  - (b): the provider "shall register with the North Carolina State Bar prior to commencing operation". (c): initial fee "not to exceed one hundred dollars ($100.00)", annual renewal "not to exceed fifty dollars ($50.00)".

## 3. Illinois

**1. Entity rules.**
- 805 ILCS 180/1-25(d) [S-mirror] ([FindLaw](https://codes.findlaw.com/il/chapter-805-business-organizations/il-st-sect-805-180-1-25/), "current as of January 01, 2025"): an LLC that intends to provide a professional service licensed by the Department "must be formed in compliance with the Professional Limited Liability Company Act."
- Other entity types: medical corporation (805 ILCS 15) and professional service corporation (805 ILCS 10).
- The ILGA official text was not reachable (certificate error).

**2. Board step.**
- PLLC, 805 ILCS 185/15 [S-mirror] ([link](https://codes.findlaw.com/il/chapter-805-business-organizations/il-st-sect-805-185-15/)):
  - No establishment may be opened "without… a certificate of registration from the Department".
  - "the Department shall issue, upon payment of a registration fee of $50". One application per location.
  - The certificate "shall expire on January 1, 2019 and on January 1 of every third year thereafter". Renewal fee $40.
  - The IDFPR guide says the application comes **after** the SOS filing (r1, [M]).
- PLLC penalties, 185/20 [S-mirror]: "$50 application fee and a late fee of $100 for each year", capped at $500; civil penalty "up to $1,000".
- Medical corporation, 805 ILCS 15/5 [S-mirror]: "upon payment of a registration fee of $50, a certificate of registration". The section gives no renewal fee.
- Processing time: [U].

**3. SOS.** 805 ILCS 180/50-10 [S-mirror]: articles $150 ($400 with series); annual report $75.
- Expedite $100 [S] (ZenBusiness snippet).
- A DEV Community post claims a $250 PLLC fee on "Form LLC-5.5(P)" [S, not verified]. The SOS site returned 403.

**4. Publication.** None. **5. Annual.** $75 SOS, plus IDFPR renewal every 3 years ($40).

**6. Volume** [M] (data.illinois.gov dataset `pzzh-kp68`, IDFPR "Professional Licensing", queried Nov 18 2026):

| Item | Count |
|---|---|
| PLLC registrations issued in 2023 (`original_issue_date`) | 773 |
| Issued in 2024 | 1,115 |
| Issued in 2025 | 1,632 |
| All PLLC records ever | 8,812 (5,782 ACTIVE, 2,947 NOT RENEWED, 53 CLOSED, 20 INACTIVE, 9 CANCELLED, 1 change of ownership) |
| "LICENSED PSYCHOLOGICAL CORPORATION" (all years) | 90 |

- The PLLC records use license type "LIMITED LIABILITY CO" with description "PROFESSIONAL LIMITED LIABILITY COMPANY".
- The dataset has no profession field for PLLCs, so health care cannot be split out [U].
- Medical corporations and professional service corporations are not in the dataset [U].

**7. Providers.** No IL provider price that includes the IDFPR step was found [U]. IL law-firm flat fee [U].

**8. UPL.** 705 ILCS 205/1 [S-mirror]:
- "No person shall be permitted to practice as an attorney or counselor at law within this State without having previously obtained a license".
- Remedies include a civil penalty up to $5,000.
- No IL opinion on business-formation services was found [U].

## 4. Nevada

**1. Entity rules.**
- NRS 89.020 [M] ([link](https://www.leg.state.nv.us/nrs/nrs-089.html)): "'Professional entity' means either a professional corporation or a professional limited-liability company". Professional associations are also covered by ch. 89.
- No section requiring licensees to use a ch. 89 entity was seen [M].

**2. Board step.**
- NRS 89.040(1)(c) [M]: the articles must contain "a certificate from the regulating board of the profession to be practiced".
- NV Board of Medical Examiners "Public Records and Other Fees" schedule [M] ([PDF](https://medboard.nv.gov/uploadedFiles/medboardnvgov/content/Forms/Fee%20Schedule.pdf), undated): lists no professional-entity certificate fee. It lists "Written license verification $25.00".
- Board certificate fee and processing time: [U]. Other NV boards: [U].

**3. SOS.**
- Fees: $75 articles + $150 initial list + $200 state business license = $425 total (r1 statutes [M]; Nevada Corporate Headquarters guide, Aug 12 2026, [S]).
- Online filing (conflicting):
  - NCH says a PLLC can be registered "through the SilverFlume portal". It also says "Project ORION" was set to replace SilverFlume in summer 2026.
  - A round-1 snippet says online articles are only for ch. 86 LLCs [S].

**4. Publication.** None. **5. Annual.** List $150 + business license $200 (non-corp) or $500 (corp) (r1).

**6. Volume.** [U]. No NV open dataset or board count was found.

**7. Providers.** The NCH PLLC guide gives no PLLC price [M]. Law firms: [U].

**8. NRS 240A** [M] ([link](https://www.leg.state.nv.us/nrs/nrs-240A.html)):
- §240A.030(1): a document preparation service is "a person who: (a) For compensation and at the direction of a client, provides assistance to the client in a legal matter".
- §240A.040: "legal matter" includes "Any proceeding, filing or action otherwise affecting the legal rights, duties, obligations or liabilities of a person."
- Exempt (§240A.030(3)): "A commercial registered agent" ((l)); "A person who provides legal forms or computer programs that enable another person to create legal documents" ((k)).
- Requirements: registration with the SOS, $100 application, $50 renewal, $25,000 bond (up to $200,000 for entities with more than 200 registrants), and a state business license (§240A.170).

## 5. Minnesota

**1. Entity rules.**
- §319B.03 subd. 1 [M] ([link](https://www.revisor.mn.gov/statutes/cite/319B.03)): "A Minnesota firm may furnish professional services within Minnesota without making an election under subdivision 2 only if:" (1) no other law "requires the Minnesota firm to make that election", and (2) no other law "precludes the Minnesota firm from furnishing professional services… in the absence of that election."
- Corporations, LLCs and LLPs elect in the organizational document (r1).
- Which health-licensing laws require the election: [U].

**2. Board step.** §319B.11 [M]:
- Subd. 3: "No professional firm may furnish professional services within Minnesota until the firm files with each board having jurisdiction", with "a fee of $100".
- Subd. 4: "Every professional firm must file annually on or before January 1", "a fee of $25 to each board".
- Processing time: [U]. The Board of Medical Practice professional-firms page sits behind a bot check.

**3. SOS.** $155 online or in person, $135 by mail [S]. No annual renewal fee [S]. Expedite [U].

**4. Publication.** None. **6. Volume.** [U].

**7. Providers.**
- A Minnesota LLC vendor ($250 package) says 319B formations need "a Minnesota attorney or CPA" [S].
- Law-firm flat fee: [U].

**8. Minn. Stat. 481.02** [M] ([link](https://www.revisor.mn.gov/statutes/cite/481.02)):
- Subd. 1 bars non-attorneys "for a fee or any consideration, to prepare for another person, firm, or corporation, any other legal document" except as subd. 3 allows.
- Subd. 2 bars corporations from preparing "any other legal document, for another person, firm, or corporation" for a charge.
- Subd. 3 has no exemption for business-entity articles or filings with the secretary of state (as read on the page).

## 6. Arizona

**1. Entity rules.**
- A.R.S. 29-4102 [M] ([link](https://www.azleg.gov/ars/29/04102.htm)): "One or more persons may form a professional limited liability company". The articles state "The professional service or services". An existing LLC may elect PLLC status.
- 29-4101 contains no mandate [M].
- ACC L010i instructions [M] (Rev. 7/2021): "You should check with the agency or board that licenses your profession to see if it requires you to form a professional LLC or if it prohibits you from forming a professional LLC."

**2. Board step.** None in 29-4102 [M]. Board-specific rules: [U].

**3. ACC** [M] ([fee schedule](https://azcc.gov/docs/default-source/corps-files/fee-schedules/fee-schedule-llcs.pdf), Rev. 3.2026; [FAQ](https://azcc.gov/faqs/BusinessServicesFAQs)):
- Articles of Organization $50 regular, $85 expedited.
- Next-day +$100; same-day +$200 (received before 10am); 2-hour +$400.
- "estimated processing time is typically 14-16 days" regular, "3-5 days" expedited. Online filing "highly recommended".

**4. Publication.**
- A.R.S. 29-3201(G) (r1).
- L010i [M]:
  - "DO NOT PUBLISH UNTIL THE COMMISSION APPROVES THE ARTICLES FOR FILING."
  - If the statutory agent's street address is in Maricopa or Pima, "a notice will automatically be published on our website". Otherwise "you will need to publish notice in a newspaper."
- Cost: formation-service blogs give $30–$300 [S]. No newspaper rate card was opened [U].

**5. Annual.** The LLC fee schedule lists no LLC annual report [M]. Corporation annual report fee: [U].

**6. Volume.** ACC FY2025-26 Annual Report [M] ([PDF](https://azcc.gov/docs/default-source/administration-files/annual-reports/fy2025-2026-annual-report.pdf)):
- "New LLC Formations": 121,223 last year; 146,691 this year.
- Active LLCs: 1,559,145.
- PLLCs and professional corporations are not split out [U].

**7. Providers.**
- KEYTLaw [M] ([page](https://www.keytlaw.com/llc-contents/), "Updated on November 13, 2026"): Bronze $500, Silver $900, Gold "Confidential LLC" $1,400. The page does not mention PLLCs. An older KEYTLaw page says packages cover an "LLC or PLLC" [S]. The ACC fee appears to be separate.
- LLC Attorney: from $49 + state fees [S].

**8. Legal document preparers.**
- ACJA §7-208 (text via search snippet, [S]): "All corporations, limited liability companies, partnerships, and all sole proprietorships that offer authorized legal document preparation services to nonrepresented parties and employs certified legal document preparers… shall obtain certification as a business entity."
- Supreme Court Rule 31.3(e)(4) is the exception for certified preparers [S].
- The full 7-208 text and any exemption covering ACC filings: [U] (azcourts PDF URLs returned 404).

## 7. Texas

**1. Entity rules.**
- BOC §301.003 [S-mirror] ([link](https://texas.public.law/statutes/tex._bus._orgs._code_section_301.003)): "'Professional entity' means a professional association, professional corporation, or professional limited liability company."
- §301.012 [S-mirror]: physicians, podiatrists, chiropractors "may jointly form and own a professional association or a professional limited liability company". With PAs, "An organizer of the entity must be a physician."
- SOS formation FAQ [M] ([link](https://www.sos.state.tx.us/corp/formationfaqs.shtml)): an entity performing professional services "may be required to form as a professional entity."
- BOC §2.004 not opened [U].

**2. Board step.** Form 206 (Revised 09/26) has no board certificate field. It asks only "The type of professional service to be provided" [M].

**3. SOS.**
- $300 PLLC / $300 PC / $750 PA (r1).
- "Certificates of formation can be filed online through SOSPortal 24 hours a day, 7 days a week" [M].
- Expedite fee: [U]. The fee-schedule link returned 404.

**5. Annual.** Franchise tax report (r1).

**6. Volume** [M] (Texas Comptroller "Active Franchise Taxpayers", data.texas.gov `9cir-efmm`, rows updated Nov 13 2026; organization-type codes from the attached "Franchise Layout.docx"):

| SOS charter year | TX professional corp (CP) | TX professional assoc (AP) | Foreign prof. assoc (AF) | Foreign prof. corp (CU) | TX LLCs (CL) with "PLLC"/"P.L.L.C"/"PROFESSIONAL LIMITED LIABILITY" in name |
|---|---|---|---|---|---|
| 2024 | 452 | 145 | 41 | 275 | 7,426 |
| 2025 | 670 | 195 | 59 | 256 | 9,910 |

- These are **currently active** taxpayers only. Entities that have ended are not counted.
- Texas PLLCs file as type CL (Texas LLC), so the PLLC column is a name proxy.
- For context: all CL rows with a 2025 charter date = 372,634.

**7. Providers.**
- terms.law (Sergei Tokmakov, Esq.) [M] ([page](https://terms.law/2025/07/27/how-i-form-texas-companies-llcs-corporations-pllcs-lps-nonprofits/), Jul 27 2025): "LLC / PLLC Formation" $480–$720 (2–3 hrs). State fee $300 and $30 card fee listed separately; RA $150/yr; no board step mentioned.
- Mike Young Law [M] ([page](https://mikeyounglaw.com/pricing-schedule-of-estimated-legal-fees/), undated): Texas LLC + operating agreement $975 + state fees. No PLLC price listed.
- Another TX firm: $1,500 including the $300 SOS fee (r1) [S].

**8. UPL.** Tex. Gov't Code §81.101 [S-mirror] ([link](https://texas.public.law/statutes/tex._gov't_code_section_81.101)):
- (a) covers "the rendering of any service requiring the use of legal skill or knowledge, such as preparing a will, contract, or other instrument".
- (c) excludes sale "by means of an Internet web site, of written materials, books, forms, computer software, or similar products if the products clearly and conspicuously state that the products are not a substitute for the advice of an attorney."

## 8. New Jersey

**1. Entity rules.**
- N.J.A.C. 13:35-6.16 [S] (reproduction, current through Nov 4 2024): a practitioner may practice in "a partnership, professional association, or limited liability company, but such entity shall be composed solely of health care professionals".
- PCs under N.J.S.A. 14A:17 [S].
- Rules for psychologists, social workers and counselors: [U].

**2. Board step.** None found [U].

**3. SOS.** $100 (r1).

**5. Annual.**
- $75 annual report (r1).
- Professional corporations and professional associations "that have more than two licensed professionals" pay $150 per licensed professional, up to "$250,000 per year", with the CBT return (N.J.S.A. 54:10A-18) [M] ([page](https://www.nj.gov/njbonds/treasury/taxation/licensedprofessionalfees.shtml)).

**6. Volume.** [U].

**7. Providers.** NJ law-firm flat fee: [U].

**8. UPL.** Committee on the Unauthorized Practice of Law, **Opinion 47** (issued June 13 2011) [M] ([PDF](https://www.njcourts.gov/sites/default/files/notices/2011/06/n110614d.pdf)):
- "preparing corporate operating agreements, by-laws, resolutions, and similar legal documents is the practice of law and may only be performed by lawyers."
- "nonlawyers may present to customers prepared, fill-in-the-blank certificates of incorporation, certificates of formation, statements of qualification, and certificates of limited partnership… and type, transcribe, or translate the customers' information in the form documents. Nonlawyers, however, may not advise or counsel the customer as to the appropriate contents of the certificates."

## 9. Pennsylvania

**1. Entity rules.** 15 Pa.C.S. §102 [M] ([link](https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/15/00.001.002.000..HTM)): "Restricted professional services" are "chiropractic, dentistry, law, medicine and surgery, optometry, osteopathic medicine and surgery, podiatric medicine, public accounting, psychology or veterinary medicine." Social work, counseling and nursing are not in that list.

**2. Board step.** None found [U].

**3. SOS.** $125; expedite $100, $300 or $1,000 (r1).

**4. Publication.**
- Corporations: §1307 notice; DOS method is two newspapers in the county [S].
- LLCs: Northwest and ZenBusiness say not required; ActiveFilings lists LLCs [S]. Unresolved.

**5. Annual.** Certificate of Annual Registration for RPCs/PLLCs [M] ([DOS page](https://www.pa.gov/agencies/dos/programs/business/types-of-filings-and-registrations/certificates-of-annual-registration)):
- "$700 times the number of persons who were members". Counted only members licensed in the company's service and with a Pennsylvania principal residence on Dec 31.
- $700 for filings in 2025 and 2026; $610 for 2022–2024.
- Due April 15; late penalty $500. Statute: 15 Pa.C.S. §8998(b).

**6. Volume** [M] (data.pa.gov `xvd7-5r2c`, "Registered Businesses in PA Current by County", updated Nov 3 2026):
- The dataset has no RPC or PC type ("Domestic Professional Association" = 1 entity).
- Name proxy (names containing PLLC or P.L.L.C, or ending P.C. or " PC"), created in 2025:

| Type | Count |
|---|---|
| Domestic LLC | 526 |
| Domestic business corporation | 224 |
| **Domestic total** | **750** [CALC] |
| Foreign business corporation | 73 |
| Foreign LLC | 67 |
| Foreign professional association | 16 |

- Current entities only.

**7. Providers.** [U].

## 10. Georgia
- **1. Entity rules:**
  - O.C.G.A. 14-11-314 [S-mirror] (FindLaw, current as of Mar 28 2024) refers to "a person rendering professional services" in the LLC chapter.
  - 14-7-4: "A professional corporation may practice only one profession" (listed exceptions). It mentions no board certificate.
- **3. Fees:**
  - 14-11-1101: articles $100, annual registration $50 [S-mirror].
  - SOS fee schedule effective Sep 6 2025 (PDF 403; snippet) [S]: $100 + $10 service charge; same-day $275; one-hour $1,200; two-business-day $120.
- **6. Volume:** [U]. **7. Providers:** [U].

## 11. Maryland
- **1. Entity rules:**
  - §4A-203(10) [M] ([link](https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gca&section=4A-203&enactments=false)): an LLC may "Render professional services within or without this State".
  - §5-102 PC rules (r1).
- **3. Fees,** §1-203 [M]:
  - Articles $100 (corporation or LLC); annual report $300.
  - Expedite $425 (§1-203.2(b)(1) processing) or $50. From Jan 1 2028 a $1,000 tier is added (Ch. 312 of 2026).
- **2, 6, 7:** [U].

## 12. Connecticut
- **1. Entity rules:** C.G.S. 33-182c [S-mirror]: a PC may be organized by persons "licensed or otherwise legally authorized to render the same professional services". No board certificate is mentioned. The LLC professional-services provision was not opened [U].
- **3. Fees** [M] ([business.ct.gov](https://business.ct.gov/knowledge-base/articles/domestic-limited-liability-companies-forms-and-fees)): Certificate of Organization $120; annual report $80 (Jan 1–Mar 31, online). "Expedited service is only available online"; fee not shown.
- **6. Volume:** name proxy 633 domestic in 2025 (r1).

## 13. Colorado
- **1. Entity rules:** C.R.S. 12-240-138 [S-mirror] (FindLaw, Jan 1 2025):
  - Physicians "may form professional service corporations"; the term covers LLCs and LLPs.
  - All shareholders are licensed physicians; PAs are allowed if physicians keep the majority.
  - Insurance condition: $50,000 per claim / $150,000 aggregate per licensee, or entity coverage.
  - No board filing is named.
- **3. Fees** [M] ([SOS](https://www.sos.state.co.us/pubs/info_center/fees/business.html)): articles $50 (LLC or corp), online only; periodic report $25; expedite $150 (paper column, "within 3 business days").
- **6. Volume:** name proxy 1,482 domestic in 2025 (r1).

## 14. Tennessee
- **1. Entity rules:** T.C.A. 48-248-104 [S-mirror] (Jan 2 2024): an LLC "may elect" PLLC status "solely for the purpose of rendering professional services" within one profession. No board certification is in that section. Whether an ordinary LLC may be used: [U].
- **3. Fees** [S] (sos.tn.gov snippets; pages 403):
  - Articles (SS-4270) $300.
  - Annual report "$300 minimum up to a maximum of $3000".
  - SB0037 (114th GA) would change the fees; status [U].
- **6, 7:** [U].

## 15. Massachusetts
- **1. Entity rules:**
  - c.156A §2(b) [M] ([link](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter156A/Section2)) lists "registered physicians and surgeons, chiropractors, podiatrists… physical therapists, psychologists… dentists… optometrists acupuncturists and registered nurses". Social workers and mental-health counselors are not listed.
  - c.156C §6(c) [M] ([link](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter156C/Section6)): an LLC providing those services files a board certificate that "indicates compliance".
- **2 and 3. Board step and fees** [M] (SOC Corporation Division Fee Schedule, "updated 3/14/22", [PDF](https://www.sec.state.ma.us/divisions/corporations/download/Fee_Schedule.pdf)):

| Filing | Fee | Notes |
|---|---|---|
| Certificate of Organization (Professional), LLC | $500 | "Cannot file electronically"; "Requires additional form: Certificate by Regulatory Board" |
| Annual Report (Professional), LLC | $500 | Fax or electronic expedite +$20 |
| Professional corporation articles (c.156A) | $275 min. | "Cannot file electronically"; requires "Regulatory Board Certificate" |
| Corporation annual report | $125 ($150 late) | |

  - BoRM certificate fee: [U].
- **6:** [U].

## 16. Florida
- **1. Entity rules:** ch. 621 [M]:
  - §621.051: professionals "may organize and become members of a professional limited liability company".
  - §621.14: the act does not restrict laws on "organization of limited liability companies". No board step.
- **6. Volume:** Sunbiz "Yearly Statistics" page 403 [U]. A search snippet shows LLC and corporation rows only, with no PA or PLLC row [S].

---

## 17. Named providers that publish a price (multi-state)

| Provider | Price | Board step? | Source |
|---|---|---|---|
| File.Business | "$149 service fee + state filing fee"; "PLLC + Compliance" $199/yr | Says it submits "where required, the licensing-board certification"; the $149 list does not name it | [M] file.business/pllc.html (© 2026) |
| Manay CPA | No price; consultation | "manages the licensing board registration as a standard and non-negotiable component"; "all 50 states where available" | [M] manaycpa.com/pllc-formation (© 2026) |
| terms.law | "Standard Medical PLLC/PC Formation" $1,500 (7–10 business days); MSO setup $2,500; full compliance $3,500; premium $4,500; state fees extra | Checklist says register with the medical board "if required" | [M] terms.law guide, Nov 25 2025 |
| Taxstra | Formation via CorpNet inside an annual package, "Scoped on your free 30-minute tax fit call" | Not mentioned | [M] taxstra.com/physicians/done-for-you |

State-specific law-firm flat fees found: AZ (KEYTLaw, LLC packages) and TX (terms.law, Mike Young Law). **NC, IL, NV, MN, NJ law-firm flat fees: not found [U].**

**Open-data queries used (re-runnable):**
- Illinois: `data.illinois.gov/resource/pzzh-kp68.json?$select=count(*)&$where=license_type='LIMITED LIABILITY CO' AND original_issue_date like '%/2025'`
- Texas: `data.texas.gov/resource/9cir-efmm.json?$select=taxpayer_organizational_type,count(*)&$where=sos_charter_date between '2025-01-01T00:00:00' and '2025-12-31T23:59:59'&$group=taxpayer_organizational_type` (add the name filter for the PLLC proxy).
- Pennsylvania: `data.pa.gov/resource/xvd7-5r2c.json?$select=typeofbusinessregistration,count(distinct filing_number)&$where=creationdate between '2025-01-01T00:00:00' and '2025-12-31T23:59:59' AND (upper(business_name) like '%PLLC%' OR … )&$group=typeofbusinessregistration`

## 18. Not found / not verified

- **New professional entities per year:** NV, MN, NJ, GA, MD, TN, MA and FL (no dataset or board count found). NC SOS. IL medical corporations and PSCs. A health-care-only split of IL PLLCs.
- **Board fees and processing times:**
  - NV BME entity certificate fee.
  - MN board processing times.
  - MA BoRM certificate fee.
  - NC Nursing Board entity rule for NPs; NC Psychology Board timing.
  - IL processing time and medical corporation renewal.
- **Rules on using an ordinary LLC:** TX (BOC §2.004 not opened); TN; CT LLC text; psychologist and counselor rules in NJ, CO and GA.
- **Fees:** TX expedite fee. MN expedite fee and the official MN fee page (snippets only). GA and TN official fee pages (snippets only). AZ corporation annual report.
- **Rate cards:** AZ publication (only blog ranges). Law-firm flat fees for NC, IL, NV, MN and NJ. Whether any national filer completes NC, NV or MN board steps for its listed price.
- **AZ ACJA 7-208:** full text and any exemption for ACC filings. IL, TX and NC bar opinions specific to business-formation services.
- **Method caveats:**
  - FindLaw and texas.public.law text is a mirror. FindLaw shows "current as of" dates from 2024–2025.
  - TX, PA, CO and CT counts are of active or current entities and/or name proxies. They are not counts of filings received.
