# ABA credentialing prep (draft for Sid, Nov 18 2026)

For: decision log Nov 18 2026: behavior analysts stay on the national postcard list. Before mail batch 1 (Dec 1-12): (1) add "licensed behavior analyst" to the insurer panel-status tracker, and (2) draft a technician-roster price for Sid's approval. Nothing here is live until Sid approves it. Nothing was sent, pushed, or written to a database.

Source tags: [C] primary source read (a state Medicaid manual or payer document); [S] search result or secondary page, not read in full; [I] our inference.

## 1. What changed in the tracker

**Branch `credentialing-channel-tracking` (PLLC-CRM worktree), commit `a946ea04`.** Not pushed and not merged. No migration is needed because profession is a free string column. The main checkout was not touched, because a live filing worker runs from it.

- **New profession `behavior_analyst`.** Label "Behavior analyst (LBA/BCBA)". Inquiry label "Licensed behavior analyst (LBA/BCBA), applied behavior analysis (ABA)". NUCC taxonomy **103K00000X**. Aliases: `aba`, `lba`, `bcba`, `bcba_d`, `licensed_behavior_analyst`, `applied_behavior_analysis`, `autism`. These cover intake forms, the lead CLI, and contacts files.
- **ABA counts as behavioral health.** The insurer's behavioral-health vendor handles it: Optum BH for UHC, Carelon for Anthem and Emblem, Evernorth for Cigna. Inquiries go to that vendor, and the apply-first rule applies (`APPLY_TO_CHECK`).
- **Assistants and technicians are roster roles, not sellable professions.** `ABA_ROSTER_ROLES` holds:
  - assistant behavior analyst (NY CBAA, BCaBA; **106E00000X**)
  - behavior technician (RBT; **106S00000X**)

  `normalizeAbaRosterRole()` reads "RBT", "CBAA" and "BCaBA" as these roles. `normalizeProfession('RBT')` returns null on purpose. Why: whether an insurer is open is decided for the analyst and the group, not for each technician. Making technicians a profession would create panel cells and "do not sell" lines that no insurer actually publishes.
- **Seeded ABA facts.** These sit in the seed file only. They reach the database when someone runs the seed command.
  - MetroPlus closed to ABA in all five boroughs (`research-2026-11:metroplus-closed:behavior_analyst`, published notice updated Apr 29 2026). Under ground rule 10, **MetroPlus cannot be sold to an NYC behavior analyst.**
  - TRICARE East (Humana Military) is accepting ABA network requests (`contacts-2026-11:tricare-east-open:behavior_analyst`).
  - Contacts files scoped "ABA" now import as `behavior_analyst`. Before this change they were kept as an unknown "aba" slug.
- **Tests run.** All 313 credentialing tests pass (`tsx --test lib/credentialing/**`), including the new `professions.test.ts`. `tsc --noEmit` is clean, and eslint is clean on the touched files.
- **Docs.** `crm/docs/credentialing/systems/panel-status-tracker.md` has a new "ABA" section and an updated profession row.
- **Not changed: the sweep watchlist.** `behavior_analyst` is not in `sweep/watchlist.ts`. Adding it makes every sweep send ABA inquiries to every payer (decision D4).

## 2. What an ABA practice needs credentialed

At every payer there are three layers:

1. **The supervising analyst's own enrollment.** LBA or BCBA: NPI type 1 with taxonomy 103K00000X, CAQH, and the payer application. The same work we already sell.
2. **The group (the PLLC).** Type 2 NPI and a group contract. ABA payers contract the agency or group and bill technician time under the group and the analyst.
3. **Technicians.** Depending on the payer, they are either listed on a roster, enrolled one by one (some Medicaid programs), or not credentialed at all and billed under the analyst with a modifier (HM/HN tiers). Examples of the modifier tiers: Optum and BCBS IL [S].

The analyst's Medicaid and commercial work fits the existing tiers ("Get in-network", "NY Medicaid add-on"). The new work is layer 3.

### By test state

| State | Analyst license | Medicaid: analyst | Medicaid: assistant / technician | Who runs ABA | Source |
|---|---|---|---|---|---|
| **NY** | LBA (NYSED Art. 167); CBAA certified | The LBA **must enroll in NY Medicaid (eMedNY)** for FFS or managed-care members. Two routes: billing provider, or OPRA non-billing for managed care only | A **CBAA enrolls as an OPRA non-billing provider**, and the LBA bills for the CBAA's work. **Unlicensed aides cannot enroll** (Educ. Law §8807 aides on a multidisciplinary team). NY has no "RBT" Medicaid role. | ABA has been in Medicaid managed care since Jan 1 2023, so each MMC plan credentials separately. An LBA can supervise up to 6 CBAAs. **CBAAs cannot own a group practice.** | [C] eMedNY ABA Policy Manual (updated Oct 1 2025) §7; [C] eMedNY ABA enrollment page; [C] Empire HealthPlus ABA FAQ (Dec 2022) |
| **NJ** | NJ license required for BCBAs once the temporary exemption ends **May 6 2027**. The board opened applications Sep 2024. | The NJ FamilyCare **ASD Treatment Provider Addendum** goes to Gainwell. | The same addendum **lists every ASD treatment staff member**: name, SSN, DOB, NPI, BACB number, specialty (BCBA-D, BCBA, BCaBA, RBT, BT). It needs a signed experience attestation for each person. I found no separate per-technician Medicaid ID. | MCOs credential the agency; Optum runs ABA for UHC Community Plan NJ [S]. | [C] NJ DMAHS ASD addendum (rev 11/19); [S] NJ DDD bulletin and Garfunkel Wild on licensure |
| **FL** | **No state license.** Medicaid uses BACB certification: Lead Analyst = BCBA. | Provider type 39: Lead Analyst (392), or a group (393) with at least one Lead Analyst | **RBTs (390) and assistant analysts (391) each enroll in FL Medicaid** and must link to a PT 39 group. Plans check each RBT's Medicaid ID against AHCA's list, and Aetna Better Health FL asks for an RBT roster with Medicaid IDs. | **SMMC plans pay all BA claims since Feb 1 2025.** Coverage policy Rule 59G-4.125 (Feb 10 2025). | [C] AHCA BA services page; [C] AHCA ABA task force deck (Aug 12 2026); [C] Sunshine Health BA guide; [S] FL Medicaid enrollment FAQ KA-01489 and type list KA-01482 (enterprise.floridafx.gov did not load) |
| **TX** | LBA (TDLR); LaBA | **Only the LBA enrolls** (TMHP) and is the rendering provider on every claim | **LaBAs and BTs are "not Medicaid enrolled".** They render under the LBA, with a modifier on the claim. | STAR / STAR Kids MCOs, Medicaid Autism Services benefit (TMPPM, since Feb 2022) | [C] 1 TAC §354.5011 |
| **MD** | LBA (MD Board of Professional Counselors and Therapists) [I, not re-checked] | Group or individual provider (psychologist, BCBA-D, BCBA) in **ePREP**, then registration with the behavioral-health ASO | **Each BT enrolls in ePREP** (specialty 325). A BT may enroll before RBT certification but must upload the RBT certificate **within 90 days** or be suspended. BCaBAs and RBTs cannot bill directly. | The ASO moved from **Optum to Carelon on Jan 1 2025**; ABA claims go through the ASO. This matches the tracker's MD `medicaid_ffs` line. | [C] MD Medicaid transmittal PT 35-23 (Jan 13 2023); [S] MD ABA Provider Manual (2026 PDF did not download); [S] MDH ASO transition report (Aug 2025) |

**Commercial and TRICARE (all states).**
- **Optum:** to credential individuals inside a group, the group needs a group agreement. Optum Network Management lists a line for "agency/group, facility and ABA status" (877-614-0484) [C, from our contacts JSON].
- **Technician credentials:** commercial payers and TRICARE generally want technicians to hold RBT, BCAT or ABAT. TRICARE's Autism Care Demonstration asks for **TRICARE-certified BTs on a roster**, and HNFS (West region) asks for BLS/CPR and a background check with each new provider on the roster [S].
- **Main point:** for commercial insurers, the technician work is mostly keeping a roster current, plus adding each new hire. Payers like Optum expect roster changes reported within days [S, secondary].

**The biggest state-by-state difference:**
- **Texas** enrolls only the LBA in Medicaid. Technicians never enroll.
- **Florida and Maryland** enroll **every RBT/BT individually** in Medicaid: FL as type 390 linked to a group, MD in ePREP with a 90-day RBT deadline.
- **New York** sits in between. CBAAs enroll as OPRA non-billing providers, and aides cannot enroll at all.
- **New Jersey** lists every staff member on the agency's addendum.

So an ABA job in FL or MD has real per-technician Medicaid work. The same job in TX has none.

## 3. Market prices (checked Nov 18 2026)

| Firm | Price | Covers | Source | Status |
|---|---|---|---|---|
| Spectrum ABA Billing | **$200 per RBT per payer**; $350 per payer for group + 1 BCBA; $300 per extra BCBA per payer; $500 Medicaid (agency + 1 BCBA) | ABA-only credentialing | https://www.spectrumababilling.com/services-1 | [C] page read |
| Raven Health | $200 per insurer for the practice + $200 per BCBA per insurer; RBT price not listed | ABA software + enrollment | https://ravenhealth.com/pricing | [C] page read |
| MedSole RCM | $99 per payer (own price); quotes a market range of **$100-250 per payer for RBT credentialing** | General | https://medsolercm.com/blog/aba-credentialing-services | [C] page read; the range is their own estimate |
| Alpaca Health guide | Lists Spectrum $200/RBT, Liaison $225 per insurer, Liaison $1,495 startup bundle (3 providers x 3 insurers) | Comparison | https://www.alpacahealth.io/provider-resources/aba-credentialing-guide | [C] page read; listed Oct 2026 |
| Staffingly | $399/week per specialist ($349 at 5+) | Outsourced staff | https://staffingly.com/behavioral-health/services/aba-credentialing/ | [S] |

Our own reference points:
- +$350 per extra payer for a clinician
- $149 per payer to link an existing contract ("Move my contracts")
- **$595 per new-hire roster add** on the group retainer (for a full clinician)

## 4. Proposed technician price (for approval)

Cash cost: card fees (~3%) only. Labor is not counted as a cost. Agents fill the roster sheets and ePREP/AHCA forms, and Sid reviews each batch in ~10-15 minutes [I]. State fees, such as fingerprinting or background screening where a program requires it, pass through at cost.

| Item | Proposed price | What it is |
|---|---|---|
| **Technician roster add** | **$99 per technician per insurer** | Add an RBT, BT, CBAA or BCaBA to an insurer where the group is already in network or being contracted by us: roster sheet, certificate, NPI and modifier tier, then follow-up until the payer confirms. Also covers NJ addendum staff entries and TRICARE roster entries. |
| **Technician Medicaid enrollment** (only where the state enrolls them: FL type 390/391, MD ePREP BT, NY CBAA OPRA) | **$149 per technician per state** | Individual enrollment linked to the group, the follow-up, and the MD 90-day RBT upload reminder. After that, the roster add at each Medicaid plan is $99 per plan. |
| **Batch rate** | **5 or more technicians at one insurer in one batch: $79 each** | Opening-day rosters for a new practice. |

Not offered: Texas Medicaid technician enrollment, because Texas doesn't enroll technicians. An insurer that only bills technicians under the analyst with modifiers (no roster) costs nothing; we just tell the client which modifier to use.

**Why $99.** It is half of Spectrum's published $200 per RBT per payer, and at the bottom of MedSole's $100-250 market range. That fits our position as the low-friction flat-price option. It sits below our $149 contract-link fee, because a roster add is the lightest payer task we do: one sheet, no application. Cash cost is ~$3, so almost all of it is margin.

**Why $149 for Medicaid enrollment.** It is a full individual application: FL needs SSN, BACB certificate and group link; MD needs ePREP with a supplemental RBT upload. That is the same weight as our per-payer link work. It also stays well under the $500 Spectrum charges for an agency's Medicaid application.

**Worked example (a new FL practice).** 1 BCBA, 6 RBTs, 2 Medicaid plans and 1 commercial insurer:
- "Get in-network" for the BCBA and group: $1,795 (3 insurers)
- 6 RBTs x $149 Medicaid enrollment: $894
- 6 RBTs x 3 insurers at the batch rate, 18 x $79: $1,422
- **Total about $4,111**

The same practice at Spectrum: 3 x $350 + $500 + 18 x $200 = **$5,150**.

**Billing rule (ground rule 10).** Technician fees are invoiced with the package. If an insurer turns out closed to the analyst or group, its technician fees are refunded in full, because no roster work can start there. This is on top of the existing offer of a substitute insurer or a $350 refund.

## 5. Decisions for Sid

1. **D1. Approve the technician prices:** $99 per technician per insurer roster add, $79 each for 5+ in one batch, and $149 per technician per state for Medicaid enrollment (FL, MD, NY CBAA only). Alternative: a flat $595 per insurer for up to 10 technicians, simpler but worse for small practices.
2. **D2. Technician turnover.** RBT turnover is high, so later roster changes for an existing client need a rule. Options:
   - (a) $99 per add, as above
   - (b) include adds in the group roster retainer at **$15/technician/month**, which needs a retainer change
3. **D3. Merge the tracker change.** Branch `credentialing-channel-tracking`, commit `a946ea04`. Then run the research seed (`apply-research-seed --confirm`) so the MetroPlus ABA closure and the TRICARE ABA open line are in the database before batch 1. Both need Sid's go-ahead, and the worker check comes first.
4. **D4. Add `behavior_analyst` to the sweep watchlist?** This sends ABA network inquiries to every swept payer. My recommendation: wait for the first ABA lead, and run single-client inquiries until then.
5. **D5. Postcard copy for ABA.**
   - NYC behavior analysts cannot be sold MetroPlus.
   - In TX, technicians need no Medicaid work, so the TX offer is analyst + group only.
   - In NY, technician work is mostly CBAA OPRA enrollment and commercial rosters, because NY aides cannot enroll.
6. **D6. Check before quoting a first NJ or MD client.**
   - NJ: whether the BCBA holds (or will hold by May 6 2027) an NJ license.
   - MD: the current ABA Provider Manual (2026 edition did not download) and Carelon's ABA registration steps.

## Sources

- eMedNY ABA Policy Manual (updated Oct 1 2025): https://www.emedny.org/ProviderManuals/ABA/PDFS/ABA_Policy.pdf
- eMedNY ABA enrollment options: https://www.emedny.org/info/ProviderEnrollment/ABA/
- Empire BCBS HealthPlus ABA FAQ (Dec 2022): https://mediprovider.empireblue.com/docs/gpp/NYE_CAID_AppliBehaviAnalysisSrvcsFAQsProvider.pdf
- NJ DMAHS ASD Treatment Provider Addendum (rev 11/19): https://www.autismnj.org/wp-content/uploads/2020/05/ABA-Treatement-Provider-Addendum.pdf
- NJ licensure: https://www.nj.gov/humanservices/ddd/documents/bulletins/behavioral-supports-licensure-requirements.pdf ; https://garfunkelwild.com/insights/new-jersey-now-requires-licensure-for-the-practice-of-applied-behavior-analysis/ [S]
- FL AHCA BA services: https://ahca.myflorida.com/medicaid/medicaid-policy-quality-and-operations/medicaid-policy-and-quality/medicaid-policy/medical-and-behavioral-health-coverage-policy/behavioral-health-and-health-facilities/behavior-analysis-services-information.html
- FL AHCA ABA task force deck (Aug 12 2026): https://ahca.myflorida.com/file/aba-task-force/Final_FLMedicaidBAServices_ProgramHistory_CurrentStructure_andKeyData_PPT.pdf
- FL enrollment FAQ / type list [S]: https://enterprise.floridafx.gov/en-us/knowledgebase/article/KA-01489 ; https://enterprise.floridafx.gov/en-US/knowledgebase/article/KA-01482
- Sunshine Health BA guide: https://www.sunshinehealth.com/BA
- TX 1 TAC §354.5011: https://www.law.cornell.edu/regulations/texas/1-Tex-Admin-Code-SS-354-5011
- MD transmittal PT 35-23: https://marylandbehavioralhealth.optum.com/content/dam/ops-maryland/documents/provider/Alerts/january-2023/new%20PT%2035-23%20Updated%20Transmittal%202023%20BT%20enrollment%20with%2090-day%20grace%20period%20sk%20signed%201.12.2023%20(1).pdf
- MD ASO transition report (Aug 2025) [S]: https://health.maryland.gov/mmcp/Documents/ASOtransitionJCRfinal8-25.pdf
- Optum network page (ABA line): https://public.providerexpress.com/content/ope-provexpr/us/en/our-network.html
- Prices: see the table in section 3.
