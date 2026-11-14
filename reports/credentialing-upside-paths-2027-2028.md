# Credentialing: every path to much more than $100–200K a year by end of 2028

> **Correction (Sid, Nov 14 2026): hours per job were overstated.** On Danielle Byrne's case, Sid spent about **30 minutes** of his own time; agents did the rest, at roughly $0 cash. The 20–30 h (first jobs) and 12–18 h (steady state) estimates below assumed a person does the work. They are wrong for how we operate. What changes: capacity is not the binding constraint. A coordinator is needed for person-only steps (insurer phone calls, typing SSNs and tax IDs, in-person tasks), not for hours per job, so hire timing and coordinator pay should be resized down. Cash profit is higher than shown, and the "hours per job above 20–25" trigger does not apply. The real limits are demand, conversion and payer clocks (60–150 days). From now on, measure human minutes per job separately from agent work.


**Written:** Nov 14 2026, for Sid. Research and analysis only. Nothing was sent, filed, signed up for, bought or changed. CRM figures come from read-only queries run Nov 14 (every statement inside `BEGIN READ ONLY`; runner kept in the session scratchpad, not the repo). Public data came from the CMS NPI Registry API and published web pages.
**Builds on:** [the first study](credentialing-market-share-2027-2028.md) (most likely ~$58K in 2027, ~$110K in 2028, ~70 jobs; high case 75/140 jobs). Read that first; this report does not repeat its market tables.
**Question:** Sid believes credentialing can be built to much more than $100–200K a year by end of 2028 and is open to any expansion. Which paths realistically raise the odds, and by how much?

**Tags on every number:** **[M]** measured (our CRM, a primary source such as NPPES, NYSED, a payer, a company's own page or a broker's sale listing) · **[S]** secondary (vendor blog, review site, trade press, aggregator) · **[E]** our estimate built from measured inputs · **[A]** assumption with no direct evidence · **[U]** looked for, could not verify.

**Money terms:** revenue is what clients pay. Cash profit is revenue minus cash costs only: ads, card fees, tools, insurance, contractors and hired staff pay. Sid's own time is not a cost. "Run-rate" means December 2028 revenue × 12 (recurring lines at their December level).

---

## 1. The answer on one page

**Short version: yes, materially more than the first study's ~$110K is realistic, but only through recurring revenue from groups (and, if Sid accepts it, billing), not through more solo one-time jobs. On today's evidence the most realistic outcome of the best plan is about $170–230K of credentialing revenue in 2028 and a December 2028 run-rate of about $230–300K. $500K a year by end of 2028 is unlikely without an acquisition or moving into billing: roughly 1 in 10 organically, 1 in 5 with both.**

### What the evidence changed since the first study

1. **The market of new NY practices is bigger and growing faster than the first study assumed.** New NY organization NPIs (Type 2) with a behavioral-health taxonomy: 815 in 2024, 947 in 2025, 1,106 in 2026 up to Nov 14 (about 1,265 annualized, +34%) **[M, NPPES pull, §7.1]**. Psych NP organizations alone: 138 → 158 → about 232 annualized (+47%) **[M]**. A Type 2 NPI is the first step of billing insurance as an entity, so this is a measured flow of new practices entering exactly our job. We form about 13–21% of them **[E]**.
2. **Psych NPs are the clearly better solo buyer.** Of our formed psych NP PLLCs, 10 of 21 (48%) already have a Type 2 NPI, against 8 of 35 (23%) of formed therapist PLLCs **[M, exact-name match, so a floor]**. They got them without us. 34% of our psych NP owners live outside NY, against 5% of therapists **[M]**. They also take virtual mail at 36% against 23% **[M]**. NPs registered 5,097 new practices nationally Jan 1–Sep 26 2026, nearly 6× the 2019 rate, and over half are psych NPs ([Medical Economics, Oct 2026](https://www.medicaleconomics.com/view/nps-are-registering-new-practices-at-nearly-6-times-the-2019-rate)) **[S, citing NPI data]**. NY extended NP independent practice to Jul 1 2030 ([McCM, 2026](https://www.mccmlaw.com/news-and-articles/articles/new-york-extends-independent-practice-authority-for-nurse-practitioners-through-2030)) **[S]**.
3. **The businesses that reach $500K+ in this field are retainer businesses, not per-job ones.** A fully remote credentialing and compliance firm serving independent providers sold for **$1.2M on $620,168 revenue and $376,782 net cash flow, with 68 clients on annual retainers including renewals and re-credentialing** (about $9,100 per client a year) ([Synergy BB, sold listing](https://synergybb.com/listings/high-margin-credentialing-and-compliance-services-firm-with-built-in-saas-upside/)) **[M, broker listing, unaudited]**. A behavioral-health billing firm with credentialing as a side line lists **21 clients at $30–70K a year each, $628,801 revenue, $548,378 cash flow, $2.2M ask** ([Website Closers](https://www.websiteclosers.com/businesses/medical-billing-company-21-active-clients-85-net-margin-9-year-business-50k-average-contract-size-full-staff-in-place-zero-ad-spend/119279/)) **[M, listing]**. Our model sells $1,400 one-time jobs and $249/yr upkeep. At that mix, $500K would need about 350 jobs a year, close to the whole estimated NY pool.
4. **Payers and platforms are squeezing the solo own-contract market.** Payers steer small providers to platforms during rate talks; Aetna cut rates paid via Alma from Jul 15 2026; Alma was acquired by Spring Health ([Behavioral Health Business, May 2026](https://bhbusiness.com/2026/05/27/small-providers-flock-to-therapist-enablement-platforms-at-the-cost-of-autonomy/)) **[S]**. Headway's $9.99 fee causes friction (a petition from Oct 1 2026) but no measured exodus ([Therapist Rates](https://buttondown.com/therapistrates/archive/headway-widened-its-999-fee-on-october-16-check/)) **[S]**. Solo therapist credentialing alone stays a ~$100K line.

### The paths, ranked by realistic odds

Probabilities are my judgment, informed by a simple simulation (§2.4, §7.3). "+$X" is added annual revenue run-rate by Dec 2028, on top of the first study's base.

| # | Path | +$100K | +$250K | +$500K | What it needs | Verdict |
|---:|---|---:|---:|---:|---|---|
| A | **Prescribers first: psych NPs, psychiatrists and other NY prescribers, including out-of-state clinicians entering NY.** Higher-priced package (Medicare, Medicaid, medical and behavioral payers) | 20–25% | <5% | ~0% | A $2,495–2,995 prescriber tier, one landing page, a Type 2 NPI watch on our own base, a small ad test on prescriber terms | **Keep. Start now.** Highest-probability gain, small ceiling |
| B | **Group roster retainers: NY behavioral-health groups of 3–30 clinicians**, per clinician per month (CAQH, re-credentialing, revalidation, roster adds, new locations) plus a fee per new hire | 25–35% | 8–12% | ~2% | 2 pilot groups by Mar 31 2027; CRM support for many clinicians per practice; a coordinator by mid-2027; Sid's selling time (4–6 h/week) | **Keep. The only organic route to a high ceiling.** Gate Sep 30 2027 |
| C | **Credentialing → billing (claims at 5–8% of collections)** for our in-network clients and groups | 25–35% if started by mid-2027 | ~10% | ~2% | A biller (US or offshore), a clearinghouse, a HIPAA business-associate setup, E&O. A different business with patient data | **Option, decided at the Sep 2027 gate.** Test demand now with one question; don't build yet |
| D | **Buy a small credentialing or credentialing-plus-billing book** (~$500–700K revenue, retainer clients) | — | — | 7–10% (closing odds 10–15%) | ~$120–250K cash down plus an SBA loan; a seller transition; Sid's time to integrate | **Watch list only** (already Sid's Nov 13 decision). The biggest single jump, lowest odds |
| E | **Repricing and packaging:** upkeep from $249/yr to ~$39/mo; a prescriber tier; offering formation + credentialing after checkout | <5% | 0% | 0% | Price decisions only | **Keep. Do with A.** +$15–40K, near-free |
| F | **Direct mail to new NY practices from public NPPES data** (~105 new behavioral-health organization NPIs a month) | ~10% | ~0% | 0% | ~$150–250/month in postcards; a landing page | **Cheap test** (Sid's call; it's a new outbound channel) |
| G | NY License Desk as an upstream funnel | <5% | 0% | 0% | Launch the site (no domain or legal identity yet) | Keep small, only as part of A's out-of-state bundle |
| — | National solo ads, multi-state telehealth enterprise, SaaS/software, white-label for billing firms or EHRs, dental, hospitals/FQHC delegated work, standalone rate negotiation, CAQH-only, collaborating-physician matching, NJ before clients pull | — | — | — | — | **Drop** (§3) |

### What each realistic combination gives (2028)

| Plan | 2028 revenue (median, 80% range) | Dec 2028 run-rate (median) | P(run-rate ≥ $250K) | P(run-rate ≥ $500K) | 2028 cash profit, median (after ads, coordinator, contractors) |
|---|---:|---:|---:|---:|---:|
| First study's plan (solo, NY behavioral health) | $110K ($53–235K) | ~$130K | ~13% | ~1% | ~$43K |
| **A + E (prescribers, repricing)** | ~$155K ($75–335K) | ~$185K | ~25–30% | ~3% | ~$70K |
| **A + B + E (adds group retainers): recommended core** | ~$175–185K ($85–390K) | ~$230K | **~35–45%** | ~5–10% | ~$90–100K |
| A + B + C + E (adds billing) | ~$215–225K ($105–450K) | ~$300K | ~55–65% | ~15–20% | ~$100–115K in 2028; more in 2029 as billing builds |
| All, including an acquisition (D) | ~$245K ($115–565K) | ~$340K | ~65% | ~20–25% | Depends on the deal; see §3.5 |

Simulation results are shown with my haircut. The raw model gives the top of each range or a little above it (§7.3), and its group inputs rest on no data yet, so I shade them down.

**What the recommended core (A + B) requires:**
- **By Mar 31 2027:** at least 4 prescriber jobs at an average of $2,300 or more, at least 1 group pilot signed, and logged hours per full job falling toward 18.
- **By Sep 30 2027:** at least 3 groups and 20 or more clinicians on a monthly retainer, logo churn 0, and about 1 hour or less per clinician per month. Otherwise drop B and plan around A (about $150K).
- **Mid-2027:** a credentialing coordinator, plus an offshore assistant only for non-sensitive follow-up work.
- **Through 2028:** Sid's selling time stays around 4–6 hours a week for groups.

**What would make me wrong upward:**
- A pre-2025 customer list exists outside the CRM (§2.1).
- Group interest is strong at the first 5 calls.
- Ad cost for prescriber terms comes in under $500 per client.

**What would make me wrong downward:**
- Psych NP payers turn out to be closed in NY too.
- Groups say their admin already does this.
- Hours per job stay above 25.

---

## 2. Re-test of the first study

### 2.1 Its key assumptions, one by one

| Assumption (first study) | New evidence | Likely direction | Effect |
|---|---|---|---|
| **Pool: ~450 paying NY behavioral-health buyers a year (range 200–1,000); 180 from new licensees** | New NY behavioral-health organization NPIs: about 1,265 a year in 2026, rising +16% (2025) and +34% (2026 annualized) **[M]**. If 15–30% of new entities pay for help, that's 190–380 buyers from new entities alone **[E]**, before existing practices. Caveat: the NPI API returns active numbers only, so older years are understated and growth is partly survivorship; the taxonomy match includes multi-specialty organizations and agencies; only 677 of 2026's 1,106 have "PLLC" in the name **[M]**. | **Too low, probably by 20–50%**, for new entities. The ±2x band still holds | A bigger flow helps the standalone channels (A, F), not the funnel |
| **Paying share 30%** | Our own formed clients set up Type 2 NPIs on their own: 48% of psych NPs, 23% of therapists **[M]**. None bought from us. Payers steer solos to platforms **[S]**. | **About right for therapists, too low for prescribers** | Prescribers are the solo segment worth pricing for |
| **Formation flow → ~10% buy (1–2 jobs/month)** | The checkbox stands at 30 of 151 orders since Aug 27 (19.9%) **[M]**, but only ~8 of the 30 ticks are therapists or psych NPs. Medicine is the largest group (6), and at least 7 are non-clinical (CPA, architecture, law) **[M]**. | **The tick rate overstates behavioral-health intent**; physicians are under-counted as buyers | Use NPI appearance (§4 A) as the intent signal, not the checkbox |
| **Past-customer campaign: ~5 jobs (path plan: 10–20)** | The CRM holds only Nov 18 2025 onward: 585 entities **[M]**. Of 163 behavioral-health and psych NP PLLCs, only ~56 are past publication; ~85 are still at NYSED or publication **[M]**. 18 of the 56 already have a Type 2 NPI **[M]**. | **~5 is right; 10–20 is not supportable** from the CRM list. **Unknown:** whether pre-CRM customer records exist (the company has formed entities since 2005) **[U, ask Sid]** | A pre-2025 list of therapists who formed years ago would be the best cheap source of group and "move my contracts" buyers |
| **Ad cost ~$800 per client** | Still unmeasured. Competing national shops sell at $79–149 per payer ([Crown Counseling review](https://crowncounseling.com/reviews/best-credentialing-services-for-therapists)) **[S]**. Our formation account: $9.51 CPC, 10.4% click-to-order **[M, first study]**. | **More likely too low for therapist terms; possibly fine for prescriber terms** (higher ticket, fewer cheap competitors) **[A]** | Test prescriber and "into NY" terms first, not generic therapist terms |
| **Hours per full job: 20–30 for the first 10, 12–18 later** | No new measurement (minutes are on 9 of 248+ events, first study). Delegated access cuts real steps: CAQH Practice Manager bulk upload (pending), CMS I&A surrogacy (pending), NY.gov delegate (done) **[M, ops manual]**. Payers still need client attestation, notarized ETIN, wet ink and phone holds **[M]**. | **About right** | Offshore labor at $5–9/h ([onlinejobs.ph postings](https://www.onlinejobs.ph/jobseekers/job/1554524), [HireTalent.ph](https://hiretalent.ph/skill/medical-billing-support)) **[S]** against ~$24–28/h for a NY credentialing specialist ([Payscale](https://www.payscale.com/research/US/Job=Credentialing_Specialist/Salary/a276da63/New-York-NY)) **[S]** changes **cash margin**, not demand |
| **Average ticket $1,400–1,450** | The rule of invoicing an insurer only after a written "open" lowers it for therapists. Prescriber packages run higher in the market ($2,500–5,000 full packages, [Carepatron](https://www.carepatron.com/blog/medical-credentialing-services)) **[S]**. | **Right for therapists; $2,300–2,900 is realistic for prescribers** **[E]** | Raises A's value |
| **Upkeep at $249/yr; 30–35 subscribers** | Market maintenance: $100–500 per provider per month (Carepatron) **[S]**; $150–400 (Assured's own blog) **[S]**; software-only roster tracking $25 per provider per month (RosterSafe, [Capterra](https://www.capterra.com/p/10021675/CredentialStream-for-Groups/) listings) **[S]**; retainer firm ~$9,100 per client a year (Synergy) **[M]**. | **Priced ~3–6× below market**, so recurring revenue is structurally capped | Reprice (E); group retainers (B) |
| **Groups: 0.5 group a quarter; 2–5 groups by Dec 2028** | Multi-owner PLLCs are rare in our base: 1 of 116 therapist, 2 of 47 psych NP, 5 of 74 physician **[M]**. Groups show up as solo-owned PLLCs that employ clinicians (Cotayo with 10 therapists, My Way Behavioral Health, Physicians Healthy Hub) **[M, standalone note]**. | **Can't be judged from data; no group has been asked** | Groups have to be found by asking at intake and through lists (§5) |
| **Formation volume ~52/month** | 585 orders Nov 18 2025 – Nov 14 2026, about 49/month **[M]** | Confirmed | — |

**Most likely wrong:**
- **Upward:** the new-practice flow (NPPES), prescriber ticket and willingness to pay, and the recurring price ceiling.
- **Downward:** the past-customer campaign (the path plan's 10–20), the checkbox as a therapist-intent signal, and ad cost for generic therapist terms.

### 2.2 What changes if one key figure is wrong (trace)

- **Prescriber ticket only $1,800 (not $2,500):** A adds about +$20K instead of +$45K. The core's median falls about $15K. Groups are unaffected.
- **Hours per job stay at 25:** coordinator capacity falls from ~5–6 to ~3–4 jobs a month. The hire comes earlier, and 2028 cash falls about $15–25K. Groups, which have low hours per clinician, become relatively more attractive.
- **Group retainers churn at 3%/month (not ~1%):** the run-rate gain from B roughly halves by Dec 2028. P(run-rate ≥ $250K) for the core falls from ~40% to ~25%.
- **Prescriber ad cost $1,500 per client:** ads still clear about $700–1,000 per job at a $2,500 ticket before labor. Keep them small. For therapist terms at $1,500, stop.
- **A pre-2025 customer list of several thousand exists:** B and the past-customer campaign both improve. That is the cheapest upside in this report.

### 2.3 Where the first study was right

- **Lead flow, not hours, limits a solo-only business.** It was also right that our edge is NY-specific: other states make us one more national ad buyer.
- **Medallion's market is not ours.** It was right that AI raises margin but doesn't win clients.
- **The base rate is still bad:** 1 paid client, 0 of 23 in the CAQH pilot. Nothing here changes that until quotes convert.

### 2.4 Calibration check

The simulation's base strategy reproduces the first study: a median of $110K, an 80% range of $53–235K, and P(≥$250K) of 8% **[E]**. Its other strategies change only the inputs listed in §7.3.

---

## 3. Every path considered: verdict and evidence

Format for each: base rate · evidence · who does it and how they make money · strongest argument against · what would have to be true · verdict.

### 3.1 Buyer segments

**A1. Psychiatric NPs (NY-based) — KEEP, lead with it.**
- **Base rate:** our formed psych NPs get a Type 2 NPI within the year about 48% of the time, twice the therapist rate **[M]**. We form ~46 a year **[M]**. NY psych NP organization NPIs grow ~+47%/yr **[M]**.
- **Evidence:**
  - Psychiatry is rarely on closure lists. MetroPlus's published closures name LCSW/LMHC/LMFT, not NPs **[M, panel tracker seed]**.
  - NY Reg 230 network adequacy, and Carelon's AG settlement requiring recruitment of NY psychiatrists and psych NPs **[M, first study]**.
  - NY NP independent practice runs to 2030 **[S]**.
- **Who does it:** national per-payer shops ($79–400/payer) and platforms (Talkiatry, Cerebral-type employers, Headway for prescribers). Physician-billing firms bundle it with billing.
- **Against:**
  - More steps: medical plus behavioral payers, Medicare, Medicaid, DEA and NY prescription pads are separate from our scope **[A]**.
  - New NPs with under 3,600 hours need a written collaborative agreement with a physician ([NYSED](https://www.op.nysed.gov/professions/nurse-practitioners/practice-issues/collaborative-practice-with-physicians)) **[M]**. Some payers ask for it.
  - Our psych NP buyers already self-serve the first step (48% with NPIs and no purchase).
- **Must be true:** quote-to-paid of 35% or more at $2,300 or above; panels open for psych NPs in their counties (the tracker answers this).
- **Verdict:** keep. It's the best solo segment.

**A2. Out-of-state clinicians entering NY (psych NPs first, then psychiatrists and telehealth groups) — KEEP as part of A.**
- **Base rate:** 3,279 of 8,002 NY-certified psych NPs live outside NY **[M, NYSED via first study]**. 16 of our 47 psych NP owners do (NJ, FL, TX, PA) **[M]**.
- **Evidence:** NY is not in PSYPACT, the Counseling Compact or the Social Work Compact ([Emora Health, reviewed Aug 2026](https://www.emorahealth.com/for-clinicians/licensing/new-york)) **[S]**. Anyone serving NY patients needs a NY license, and NY is a separate payer and Medicaid market. Psych NPs take virtual mail at 36% **[M]**, so the NY address bundle fits.
- **Who does it:** national shops do the payer part. Nobody we found sells license, entity, address and enrollment together for NY **[U, one search]**.
- **Against:** the audience is national, so ads cost more; telehealth-only applicants are turned away more often by some payers **[S, first study]**.
- **Must be true:** a landing page plus a small ad test brings 2 or more out-of-state prescriber jobs a quarter.
- **Verdict:** keep, as a page and a bundle, not a separate business.

**A3. Physicians (psychiatrists, solo MDs) — KEEP inside A, selectively.**
- **Evidence:**
  - Medicine is the largest checkbox group: 6 of 30 ticks **[M]**. We form 74 medicine PLLCs a year, and 18% of the owners live out of state **[M]**.
  - An MD/PhD psychiatrist lead in Suffolk is active **[M, fee-schedule research]**.
- **Against:** many are employed or need hospital privileges, which is out of scope; specialists have complex payer sets.
- **Verdict:** keep for psychiatrists and outpatient solos only. No hospital privileges.

**A4. Solo LCSW/LMHC/LMFT/psychologists — KEEP as the base, don't scale with ads.** First study §6 holds. Platforms are free, payers steer solos to them **[S]**, and panels are closed exactly where volume is **[M]**. Sell through our funnel, "Move my contracts" and Headway-leaver content. No generic paid search until prescriber terms prove out.

**A5. Multi-clinician groups (3–30) — KEEP. This is path B.** See §3.3.

**A6. Groups onboarding many new hires — KEEP inside B.** Roster adds (a new clinician joining the group's existing contracts) are the most repeatable job: about 30–90 days per payer, no panel-closure risk for adds to an existing group contract in many plans **[A; varies by payer, U]**. Price per add.

**A7. MSOs/DSOs — FOLD INTO B.** Our MSO package ($1,770, unpublished) sells to multi-clinician businesses **[M, mso-msa shard]**. Those are natural retainer prospects, but the page isn't live, so volume is ~0 today.

**A8. Telehealth companies needing multi-state enrollment (enterprise) — DROP for 2027–28.**
- **Who does it:** Medallion ($130M raised **[M]**), Assured ($19M Series A **[M]**), CertifyOS, Verifiable. They sell usage-based or per-provider contracts; a third-party estimate puts Medallion around $150+ per provider per month and a ~$45K median contract **[S, rfp.wiki/G2]**. Vendors also sell multi-state solo enrollment at $79–149 per payer **[S]**.
- **Against:** no NY edge outside NY; long sales cycles; no references; we'd need 50-state Medicaid knowledge.
- **Verdict:** drop. Small NY-entering telehealth groups are handled under A2/B.

**A9. PT/OT/SLP/chiro — DROP as a focus; take inbound.** About 25 a year with us; mostly cash or clean Medicare **[M, first study]**. Low willingness to pay.

**A10. Dental — DROP.** 16 a year, none ticked the box **[M]**. Dedicated dental credentialing firms sell $399–529 per provider per month bundles ([DCS](https://www.dentalclaimsupport.com/blog/dcs-dental-credentialing-cost)) **[S]**. Different payers and vendors.

**A11. ABA, home health, agencies, FQHCs, hospitals' delegated credentialing — DROP.** These are agency licensure (OMH/OASAS/DOH) and enterprise CVO work. They need NCQA-style verification and long sales. Not our edge; ABA is 6 a year with us **[M]**.

**A12. Behavioral-health startups — DROP** (same as A8).

### 3.2 Revenue model and adjacent services

**E1. Reprice upkeep and add a prescriber tier — KEEP.** Market maintenance is $100–500 per provider per month **[S]**; ours is about $21/month. Proposed: solo upkeep about $39/month or $399/yr (CAQH every 120 days, Medicare and Medicaid revalidation, license and malpractice expiry, address changes everywhere, a yearly check of each payer's directory); prescriber package $2,495–2,995.
- **Against:** solos are price-sensitive; CAQH re-attestation is free and takes 10 minutes.
- **What sells it:** the revalidation and directory-accuracy work (federal directory rules and the No Surprises Act directory requirements) **[A]**.
- **Effect:** +$15–40K by 2028 **[E]**.

**B1. Group roster retainer — KEEP** (§3.3).

**C1. Revenue cycle / billing (5–8% of collections) — OPTION, not now.**
- **Base rate:**
  - Published rates run 3.5–8%: TheraThink 6.5–8% of allowed amount plus $35/month per tax ID and NPI, with credentialing priced separately at $120 per commercial plan and $260 for Medicaid or Medicare ([TheraThink pricing](https://therathink.com/pricing/)) **[M]**; Ellora "as low as 3.5%" **[S]**.
  - Billing firms use cheap credentialing as the wedge: TheraThink's own page advertises free credentialing for a limited time **[M]**.
- **Value:** a full-time therapist collecting about $100K in insurance pays about $5–8K a year **[E]**, 3–5× a one-time credentialing job, every year.
- **Against:**
  - It means patient data (PHI): HIPAA business-associate agreements, security, breach exposure.
  - It's a different skill: denials, AR follow-up, coding. It's crowded, and SimplePractice's built-in claims make DIY easy.
  - It cuts against the expansion plan's "we do no billing work" scope.
  - It loads Sid's week with exceptions.
- **Must be true:** at least 30% of in-network clients ask who will file their claims, a biller can be hired, and Sid accepts PHI.
- **Verdict:** ask the billing question on every handoff now (zero cost). Decide at the Sep 30 2027 gate. If yes, start with groups.

**C2. Contract and rate negotiation — DROP as a product; fold a yearly "rate review" into the group retainer.** No published price for negotiation-only services **[U]**. Payers refuse increases even for 14-year contracts and point providers to platforms **[S, BHB]**. Solos have little leverage.

**C3. Enrollment for new locations, revalidation, CAQH, license/DEA tracking, payer audits — KEEP inside upkeep and the retainer.** Low hours, recurring, sticky.

**C4. White-label fulfillment for billing companies, EHRs, MSOs, accountants, lawyers — DROP white-label; keep referral.**
- Billing companies already sell credentialing, and some give it away (TheraThink) **[M]**.
- EHRs embed Medallion: SimplePractice's credentialing page references Medallion **[M, first study]**; its terms are not on the page (checked Nov 14) **[U]**.
- Accountants and lawyers refer; they don't buy white-label. Cold partner outreach got 1 reply in 38 **[M]**.
- Sid's rule: never credentialing firms as partners **[M]**.

**C5. Productized software or AI tooling sold to clinicians — DROP as revenue; keep as internal tooling.**
- CAQH is free. Roster software sells at about $25 per provider per month **[S]**. Venture-funded vendors (Medallion, Assured, Verifiable) give away or undercut software.
- Our software's value is cutting our own hours (CAQH bulk files, NPI watch, panel tracker).

**C6. Bundles with formation (PLLC + credentialing + virtual office; PLLC + MSO + credentialing) — KEEP, but post-checkout.**
- Offer the bundle on the confirmation page and in the formation-complete email, not as a checkout step (Sid's no-checkout-friction rule).
- Measured hook: ~20% tick the box **[M]**, and psych NPs take VM at 36% **[M]**.

**C7. Compliance plans (e.g., NY OMIG compliance-program help for Medicaid-heavy groups; HIPAA pack) — DROP as standalone; maybe a retainer add-on later.** Thresholds and scope not verified this pass **[U]**.

**C8. Collaborating-physician matching for new NY NPs (under 3,600 hours) — DROP as a business; consider a referral.**
- Market exists: Collaborating Docs $500 match plus a monthly fee **[S, press release]**; NY averages about $550–803 a month per a marketplace **[S]**.
- We'd need physicians. NY bars fee-splitting between physician and NP **[M, NYSED]**; whether a referral fee to us is clean is **[U]**, so it needs counsel.

### 3.3 Path B in detail: group roster retainers

- **Base rate:** zero groups contacted **[M]**. Nobody from our 38-firm cold wave replied, but those were partners, not buyers. The comparable retainer firm took an unknown number of years to reach 68 clients nationally **[M/U]**.
- **Evidence for:**
  - Groups pay retainers in this market. Synergy's 68 clients average about $9,100 a year **[M]**; market maintenance is $100–500 per provider per month **[S]**.
  - Groups hire constantly, and every hire needs roster adds at each payer.
  - NY has 9,722 active behavioral-health organization NPIs **[M]**. How many are 3–30 clinician groups is **[U]**: the CMS clinician file that counts group members blocked our automated pull, so Sid can download it (§5).
  - We have 10 named target accounts **[M]**.
- **Who does it:** in-house office managers (the real competitor); billing firms bundling it; national shops; Headway and Alma's group programs; Medallion and Assured for larger groups.
- **Strongest argument against:** a group of 3–30 often already has an admin who does this for "free". Groups want credentialing bundled with billing. Sales take months. Our first-year references won't exist until mid-2027.
- **Must be true:**
  - At least 3 of the first 10 groups asked agree to a pilot.
  - Hours per clinician per month at or under ~1. Re-attestation and revalidation are batchable; offshore staff can do status calls without SSN access.
  - Logo churn at or under ~1%/month.
  - Price at or above ~$75 per clinician per month, with a $400/month minimum, plus ~$600 per new-hire roster add.
- **Proposed offer:** setup about $1,500 per group plus $350 per clinician to audit and fix everything once (NPIs, CAQH, Medicaid/Medicare enrollment, payer directories); then $79–129 per clinician per month; roster adds $595 per clinician (all current payers); new location $395.
- **What it adds:** 8 groups × 7 clinicians × $100/month ≈ **$67K ARR** plus ~$20K of adds and setup a year **[E]**. 15 groups ≈ **$150K**.
- **Verdict:** keep, and gate hard.

### 3.4 Geography

| Option | Evidence | Cost to enter | Verdict |
|---|---|---|---|
| **NY depth** | All edges are here: formation funnel, PLLC entity data, NY Medicaid group know-how, panel tracker **[M]**. New BH entities ~1,265/yr and rising **[M]** | $0 | **Primary** |
| **Into NY (out-of-state clinicians)** | 41% of NY psych NP certificate holders and 34% of our psych NP owners live elsewhere **[M]**. No compacts for NY **[S]** | A page, messaging; same payers | **Keep (A2)** |
| **New Jersey** | 12 of our NP/MD owners live in NJ **[M]**; NJ FamilyCare MCOs, payer portals and licensing are all new **[U]** | ~2–3 months learning on live cases **[E, first study]** | **Only when 3+ clients ask** |
| **Multi-state telehealth depth** | Competitors at $79–149/payer **[S]**; funded platforms | Ad spend with no edge | **Drop** |
| **FL/TX/PA** | FL 9, TX 4, PA 2 owners in our base **[M]** | Separate Medicaid and payers | **Drop for 2027–28** |

### 3.5 Path D in detail: acquisition

- **Comps:**
  - Synergy credentialing and compliance firm: sold at $1.2M, about 3.2× $377K cash flow, 1.9× revenue **[M, listing]**.
  - Behavioral-health billing firm (21 clients): asks $2.2M at 4.0× $548K cash flow, status pending **[M, listing]**.
  - Medical billing generally: median ask $2.1M on $382K SDE, per a BizBuySell overview cited in search **[S]**.
- **Financing (illustrative):** SBA 7(a) with ~10% down on $1.2M is about $120K plus ~$40K closing. Debt service on $1.08M at ~10.5% over 10 years is about $175K a year **[A, rate not checked]**. Keeping roughly Synergy's cash flow ($377K), less a manager to replace the seller (~$60–80K), leaves about **$120–140K a year of cash after debt service** **[E]**, plus about +$600K of revenue.
- **Against:**
  - Client retention after a sale (89% claimed, unverified).
  - Contractors who leave with the seller.
  - National clients outside our NY edge.
  - Roll-up buyers bid against us.
  - It takes Sid's hours exactly when B needs them.
  - Talking to sellers' brokers is not "contacting credentialing firms as partners", but it is outreach, which Sid has said waits until he asks (Nov 13).
- **Must be true:** a NY- or behavioral-health-focused retainer book appears at or under 3.5× cash flow, and B has proven we can run retainers.
- **Odds:** closing by end of 2028 about 10–15% **[A]**.
- **Verdict:** watch list from public listings only; evaluate after the Sep 2027 gate.

### 3.6 Channels

| Channel | Evidence | Verdict |
|---|---|---|
| **Our formation funnel** | ~163 BH and psych NP formations a year; ~13–21% of NY's new BH entities **[E]** | Keep. Add the NPI watch (A) so we reach clients when they act, not when they tick a box |
| **NPI watch on our own base** | 18 of 56 formed BH and psych NP PLLCs already have Type 2 NPIs, found by exact name **[M]** | **New, cheap.** Weekly public-API check; question-led email via the close-out flow |
| **Direct mail to new NY BH entities from NPPES** | ~105 new BH org NPIs a month with public address and phone **[M]**. Response rate unknown **[U]**; assume 0.5–2% to a qualified conversation **[A]** | Cheap test ($300–500 over 2 months), Sid's call. No calls, no email scraping |
| **NY License Desk** | Not launched: no domain, legal identity placeholders, last change Aug 9 2026 (repo memory bank, read via GitHub) **[M]**. Scope excludes endorsement routes **[M]** | Small: add an out-of-state psych NP path only when A2 shows demand |
| **Paid search** | Unmeasured; generic therapist terms contested at $79–149/payer **[S]** | Test prescriber and "into NY" terms first, $1.5–2K |
| **SEO / AI answers** | ChatGPT is our only rising formation source **[M, path plan]** | Keep one prescriber guide and one Headway-leaver guide; no broad content |
| **Referrers (accountants, attorneys, billing firms, EHRs, residency programs, NP and social work schools, associations)** | 1 reply in 38 cold firms **[M]**. Schools and associations: new graduates aren't buyers until licensed and forming (6–18 months) **[A]** | Warm only. A sponsored talk at one NY psych NP association is a possible test **[U]** |
| **Platforms (Headway, Alma, SimplePractice)** | They are competitors for credentialing **[M]** | Drop as credentialing partners (formation partner only) |
| **Acquisition** | §3.5 | Watch list |

### 3.7 Capacity and margin

| Work | Who | Cost | Notes |
|---|---|---|---|
| Sales, scope, payer judgment, PII steps (SSN, tax IDs typed by Sid only) | Sid, then the US coordinator | Sid: $0. Coordinator ~$34K/yr at 20 h/week, ~$55–65K loaded full-time **[A, first study]**. NY market ~$24–28/h **[S]** | The ops manual makes typing tax IDs and creating accounts person-only **[M]** |
| Follow-up calls, status checks, re-attestation reminders, directory checks | Offshore assistant | ~$5–9/h **[S]**, ~$8–15K/yr at 20–40 h/week | No SSN or bank access; logged CRM user; written data-access policy first |
| Paperwork prep (CAQH bulk files, NPPES worksheets, payer emails, panel tracker) | AI and CRM | ~$0 marginal | Cuts ~20–35% of paperwork hours **[A]**; payer clocks unchanged |

**Throughput:**
- One US coordinator (~1,700 h/yr) plus offshore help handles about 60–80 full jobs a year at 15 h each, or about 150–250 retainer clinicians at ~0.5–1 h a month **[E]**.
- Groups are about 3–5× more profitable per hour than solo jobs once set up **[E]**.

**Where payers block automation:**
- Client-only steps: CAQH attestation, the NY.gov identity check and Medicaid submit click, the notarized ETIN, and wet ink on paper 855s and CMS-10114 **[M, ops manual]**.
- Payer phone queues.
- Portals' terms against shared logins **[A]**.

### 3.8 Competition and moats

**Our real edges:**
1. **At the moment of need:** we know the day a NY PLLC is formed, plus its EIN, Articles and address, and we can see the day it gets a Type 2 NPI.
2. **NY entity enrollment know-how:** PLLC group enrollment in NY Medicaid, eMedNY forms, and the virtual address vs service location rule.
3. **The panel-status tracker:** our own record of open and closed networks by payer, profession and county. No vendor or public dataset publishes this (first-study research) **[M]**.
4. **Trust:** the client only signs, there are no passwords, and everything is logged.
5. **Recurring relationships already in place:** RA and virtual mail.

**What doesn't protect us:**
- Software (funded rivals).
- Price (national shops are cheaper).
- Speed (payer clocks).

**Competitive response to expect:**
- Platforms lowering fees.
- SimplePractice/Medallion free enrollment.
- Billing firms giving credentialing away.

None of these target NY entity-level work for groups or prescribers specifically **[A]**.

**The honest moat:** a reference base of NY groups and prescribers, plus the tracker, built over 2027. It is defensible locally, not nationally.

---

## 4. Roadmaps for the top paths

### Path A — Prescribers first (psych NPs, psychiatrists, out-of-state prescribers entering NY)

| When | Step | Gate / leading indicator |
|---|---|---|
| Dec 2026 | Prescriber package at $2,495–2,995 (Sid's call on price); quote Dunia (INTAKE) and the Suffolk psychiatrist; weekly NPI watch on our formed entities (read-only public API; flags new Type 2 NPIs) | Quotes out ≥ 3 |
| Jan 2027 | One prescriber page on nypllc.com ("Get in-network as a NY psych NP or psychiatrist, including out-of-state"); question-led emails to NPI-watch hits | NPI-watch hits contacted ≥ 4/month |
| Jan–Feb 2027 | Ad test, $1.5–2K, exact match on prescriber and NY Medicaid enrollment terms (Keyword Planner volumes first) | Cost per paid prescriber client ≤ $1,000 with ≥ 2 paid; stop above $1,500 |
| **Mar 31 2027 gate** | — | **≥ 4 prescriber jobs in Q1 at an average ≥ $2,300**, ≥ 1 effective date, payers approved by day 150 / submitted ≥ 60%. Fail → prescribers stay a tier, no ads |
| Q2–Q4 2027 | Out-of-state bundle (NY certificate via License Desk, PLLC or foreign PLLC, address, enrollment) only if ≥ 2 out-of-state inquiries a month | Out-of-state inquiries/month |
| 2028 | 3–5 prescriber jobs a month; all convert to upkeep at about $39/month | Upkeep attach ≥ 50% for prescribers |

**Monthly indicators:**
- Qualified prescriber conversations: healthy ≥ 6, alarm < 3.
- Quote → paid: healthy ≥ 35%.
- Average prescriber ticket: healthy ≥ $2,300.
- Psych NP panel answers logged per month.

### Path B — Group roster retainers (NY behavioral health, 3–30 clinicians)

| When | Step | Gate / leading indicator |
|---|---|---|
| Dec 2026 | Add one intake question to formation and credentialing: "How many clinicians will bill under this practice?" CRM: allow a credentialing engagement for many clinicians per practice and for a group not formed with us (`CredentialingEngagement.pllcId` is required today **[M]**) | Question live |
| Dec 2026 – Jan 2027 | Sid downloads the CMS clinicians file (Doctors and Clinicians National Downloadable File) to count NY BH groups with 3–30 enrolled members (our automated pull was blocked) | Count of NY target groups |
| Jan–Mar 2027 | Warm asks to the 10 named accounts (fix Cotayo's formation issue first). Discovery calls, then 1–2 paid pilots at setup + per clinician per month | ≥ 5 calls, ≥ 1 signed by Mar 31 |
| Q2 2027 | Hire the credentialing coordinator if A + B volume supports it (path plan trigger). Offshore assistant only after the data-access policy | Hours per clinician per month ≤ 1 |
| **Sep 30 2027 gate** | — | **≥ 3 groups, ≥ 20 clinicians on retainer, logo churn 0, price ≥ $75/clinician/month.** Fail → drop B and plan around A (~$150K) |
| Q4 2027 – 2028 | Grow through references from those groups, the MSO package if launched, our new-entity flow, and direct mail if it tested well. Add a yearly rate review and directory audit to the retainer | Groups in conversation ≥ 3/month; net new clinicians ≥ 6/month |

**Monthly indicators:**
- Clinicians under retainer.
- Net new clinicians.
- Roster adds billed.
- Hours per clinician per month.
- Logo churn.
- Retainer revenue per clinician.

### Path C — Option: credentialing → billing (decide Sep 30 2027)

- **Now:** add one question to every in-network handoff and group call: "Who will submit your claims?" Record the answer.
- **Sep 2027 decision:** go if ≥ 30% of in-network clients or ≥ 2 retainer groups ask us to bill, and Sid accepts PHI. Then start with 1–2 groups, a contract biller (US, or offshore with a business-associate setup), a clearinghouse, and E&O and cyber cover.
- **2028 marks:** 10+ billing clinicians by Jun 2028; denial rate < 10%; days in AR < 45 (industry quality marks **[S]**).
- **If no:** refer billing out and move on.

### Track D — Acquisition watch

- Monthly check of public listings for credentialing and payer-enrollment books between $300K and $1M revenue. Note price/SDE, client type, recurring share and staff.
- Evaluate only after a B pass. No broker contact unless Sid asks.

---

## 5. First 90 days: cheap tests (Nov 15 2026 – Feb 15 2027)

| # | Test | Pass mark | Cash | Owner |
|---:|---|---|---:|---|
| 1 | **NPI watch:** weekly read of the public NPI Registry for every formed CRM entity; a hit is a client mid-credentialing. Question-led email through the close-out flow | ≥ 4 qualified conversations a month from hits | $0 | Agent builds, Sid approves sends |
| 2 | **Prescriber tier:** price it; quote Dunia and the psychiatrist; log reasons for every no | ≥ 2 prescriber jobs at ≥ $2,300 by Feb 15 | $0 | Sid |
| 3 | **Keyword volumes (Keyword Planner UI)** for prescriber, "NY Medicaid enrollment", out-of-state NP and therapist terms | Prescriber terms can buy ≥ 2 jobs a month | $0 | Sid |
| 4 | **Prescriber ad test** (after 3) | ≤ $1,000 per paid client, ≥ 2 paid | $1.5–2K | Sid approves |
| 5 | **Group discovery:** the intake question; warm asks to the named accounts; CMS clinicians file download for a NY group count | ≥ 5 calls, ≥ 1 pilot signed by Mar 31 | $0 | Sid |
| 6 | **Direct mail pilot** to ~200 new NY BH organization NPIs (2 months) | ≥ 3 qualified conversations | $300–500 | Sid decides first |
| 7 | **Billing question** on every handoff | Share who want billing help, measured on ≥ 10 clients | $0 | Agent adds to templates |
| 8 | **Upkeep repriced** for new sales (~$39/month) | Attach ≥ 35% | $0 | Sid |
| 9 | **Pre-2025 customer list:** ask whether historical PLLC customer records exist outside the CRM | Yes/no, plus count by profession | $0 | Sid |
| 10 | **Minutes on every credentialing event** (existing rule) | Median hours for Danielle's job by Jan 15 | $0 | Agent |
| 11 | **Data-access policy** for any future contractor (no SSNs, tax IDs or bank numbers; own logged CRM login) before hiring | Written | $0 | Agent drafts |
| 12 | **Acquisition watch list** from public listings | Monthly note | $0 | Agent |

Total cash: about $2–2.5K, plus E&O and cyber cover before any hire ($1–2K, first study).

**The Mar 31 2027 gate combines the first study's (§6.5) with A's prescriber gate and B's first pilot.**
- **Scale** if solo plus prescriber jobs average ≥ 4/month, prescribers ≥ 4 in the quarter, and 1 group pilot is signed.
- **Shrink** to formation customers only if fewer than 2 jobs a month in total.

---

## 6. Risks and self-critique

**Where this report is most likely wrong:**
1. **Group inputs are guesses.** Success odds (50%), groups by 2028 (median 8 if it works), size (7) and price ($100) have no data behind them. B is the swing factor in every combined plan. The first 10 group conversations will tell more than this report.
2. **The NPPES pull overstates the target in some ways and understates it in others.**
   - It matches any listed BH taxonomy (not just primary), includes agencies and multi-specialty organizations, and returns active NPIs only, so growth is partly survivorship.
   - Exact-name matching to our CRM undercounts our clients' NPIs (name variants), so the 48% / 23% figures are floors.
3. **The billing path conflicts with Sid's stated scope** (client only signs, no billing) and adds PHI risk. Sid may reasonably refuse it; the core plan doesn't depend on it.
4. **Acquisition figures come from broker listings** (unaudited, seller-friendly). The SBA rate was not checked.
5. **Prescriber uplift could be smaller.** Psych NPs already self-serve the NPI step (48% did it without us), which may mean they self-serve the rest too. One closed-panel wave for NPs would cut A in half.
6. **Sid's hours:** A + B together need about 8–12 h/week of Sid's selling and judgment in 2027 on top of formation. The ops hire's timing matters more than it looks.
7. **No new paid evidence since the first study.** Still 1 paid client **[M]**. All upside here is conditional on quotes converting in Dec–Mar.
8. **The simulation's correlation is crude:** one shared demand factor at ±30%. Real outcomes are lumpier, especially for groups and acquisition.
9. **Market pricing is mostly vendor marketing.** Only TheraThink's page and the two broker listings were read directly.

**What I refused to claim:**
- Medallion or Assured prices (custom).
- SimplePractice's free-enrollment terms (not on its page).
- Headway exodus volume.
- NY group counts.
- NY search volumes.
- Direct-mail response rates.
- The legality of collaborating-physician referral fees.

**Risks to the business** (in addition to first study §6):
- A data incident: more people and contractors touching SSNs and DOBs.
- Retainer churn if early effective dates slip.
- Brand confusion if the standalone site launches before references exist.
- Billing (if chosen) exposes us to claims errors and PHI breach liability.

---

## 7. Sources and assumptions

### 7.1 Measured, our systems and public data (Nov 14 2026)

**CRM (read-only):**
- 585 entities, Nov 18 2025 – Nov 14 2026 (about 49/month).
- License mix: medicine 74, MHC 49, psych NP 46, LCSW 40, family NP 23, psychology 11, MFT 6.
- Credentialing engagements: Green Sparrow, SIGNATURES, $2,210 paid Nov 5 (4 insurers + Medicaid + Medicare); Dunia Gibson NP in Psychiatry, INTAKE, no amount.
- Checkbox: 30 of 151 orders since Aug 27. By license: medicine 6, psych NP 4, MHC 3, LBA 2, CPA 2, architecture 2, LCSW 1, family NP 1, OT 1, PA 1, RN 1, dietetics 1, landscape architecture 1, law 2.
- Multi-owner PLLCs: therapist 1/116, psych NP 2/47, physician 5/74, other 13/273.
- Primary owner outside NY: psych NP 16/47, physician 13/74, therapist 6/116, other NP 4/32. Among NP and MD owners by state: NJ 12, FL 9, TX 4, PA 2, others 1 each.
- Virtual mail: psych NP 17/47, therapist 27/116, MD 20/74.
- Formation status of 163 BH and psych NP PLLCs: ~56 past publication; 45 BH and 15 psych NP at OP_SUBMITTED.

**NPPES (CMS NPI Registry API v2.1)** ([npiregistry.cms.hhs.gov/api](https://npiregistry.cms.hhs.gov/api/?version=2.1)):
- Query: Type 2, location state NY; taxonomy descriptions Social Worker, Counselor, Marriage & Family Therapist, Psychologist, Psychiatry, Psych/Mental Health (NP); split by 3-digit ZIP prefix 100–149, paged to 1,200 (no prefix hit the cap).
- 9,722 unique active organizations.
- By enumeration year: 2022 613 · 2023 726 · 2024 815 · 2025 947 · 2026 (to Nov 14) 1,106.
- "PLLC" in name: 2024 401 · 2025 540 · 2026 677.
- Psych NP organizations: 2023 92 · 2024 138 · 2025 158 · 2026 203.
- CRM exact-name match: BH formed 8/35, psych NP formed 10/21.
- Script and output: session scratchpad `npi/count.py`, `npi/out.json` (not committed).

**Repos:** first study; [2028 path plan](../nypllc-2028-path-to-1m-plan.md); [decision log](../decision-log.md); [standalone note](../../PLLC-CRM/memory-bank/features/credentialing-standalone-business.md); [expansion plan](../../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md); [ops manual](../../PLLC-CRM/crm/docs/credentialing/README.md); [panel tracker shard](../../PLLC-CRM/memory-bank/features/credentialing-panel-status.md); [fee schedules research](../../PLLC-CRM/crm/docs/credentialing/research-fee-schedules-and-panels-2026-11.md); [CAQH shard](../../PLLC-CRM/memory-bank/features/caqh-credentialing.md); [B2B shard](../../PLLC-CRM/memory-bank/features/b2b-partners.md); [MSO shard](../memory-bank/features/mso-msa.md); [revenue levers](../memory-bank/features/revenue-levers.md); [business-ideas credentialing research](../../PLLC-CRM/business-ideas-ny-credentialing-research/) (07 distribution, 11 whitespace); [NYSED license-filing synthesis](../../PLLC-CRM/business-ideas-nysed-personal-license-filing-synthesis.md). NY License Desk memory bank (router, projectbrief, activeContext) was read from GitHub `SidneyJB/nysed-licensing`, because the repo isn't cloned on this Mac.

**Not done:** the CMS Doctors and Clinicians file (group member counts). Its API refused the automated request (HTTP 403), and I did not work around it. Sid can download it from data.cms.gov.

### 7.2 External

- **Retainer and billing businesses:** [Synergy BB sold listing](https://synergybb.com/listings/high-margin-credentialing-and-compliance-services-firm-with-built-in-saas-upside/) · [Website Closers listing](https://www.websiteclosers.com/businesses/medical-billing-company-21-active-clients-85-net-margin-9-year-business-50k-average-contract-size-full-staff-in-place-zero-ad-spend/119279/) · [BizBuySell medical billing](https://www.bizbuysell.com/medical-billing-established-businesses-for-sale/) (median figures via search summary **[S]**).
- **Billing prices:** [TheraThink pricing](https://therathink.com/pricing/) **[M]** · [Ellora billing FAQ](https://ellorasystems.com/billing-faq) **[S]** · [SimplePractice on billing services](https://www.simplepractice.com/blog/billing-services-mental-health/) **[S]**.
- **Credentialing prices:** [Carepatron](https://www.carepatron.com/blog/medical-credentialing-services) · [Medwave](https://medwave.io/2026/03/how-much-does-medical-credentialing-cost/) · [Assured blog](https://www.withassured.com/blog/in-house-vs-outsourced-credentialing) · [DCS dental](https://www.dentalclaimsupport.com/blog/dcs-dental-credentialing-cost) · [RosterSafe/CredentialStream on Capterra](https://www.capterra.com/p/10021675/CredentialStream-for-Groups/) · [Crown Counseling review](https://crowncounseling.com/reviews/best-credentialing-services-for-therapists) · [Medallion on G2](https://www.g2.com/products/medallion/pricing) and [rfp.wiki comparison](https://www.rfp.wiki/specialty-industries/healthcare-life-sciences/healthcare/healthcare-provider-network-management-software/medallion/assured) **[all S]** · [SimplePractice credentialing page](https://www.simplepractice.com/features/credentialing/) (no terms published, checked Nov 14).
- **Market signals:** [Medical Economics: NP practice registrations](https://www.medicaleconomics.com/view/nps-are-registering-new-practices-at-nearly-6-times-the-2019-rate) · [BHB on platforms](https://bhbusiness.com/2026/05/27/small-providers-flock-to-therapist-enablement-platforms-at-the-cost-of-autonomy/) · [Therapist Rates on Headway's fee](https://buttondown.com/therapistrates/archive/headway-widened-its-999-fee-on-october-16-check/) · [Change.org petition](https://www.change.org/p/urge-headway-to-adopt-a-fair-fee-structure-for-marketplace-referrals) · [Klarity on the fee](https://www.helloklarity.com/post/marketplace-session-fees-in-2026-headways-9-99-fee-and-where-klarity-fits/) (competitor).
- **Regulation:** [NY NP practice extended to 2030 (McCM)](https://www.mccmlaw.com/news-and-articles/articles/new-york-extends-independent-practice-authority-for-nurse-practitioners-through-2030) · [NYSED NP collaborative practice](https://www.op.nysed.gov/professions/nurse-practitioners/practice-issues/collaborative-practice-with-physicians) · [NY compact status (Emora)](https://www.emorahealth.com/for-clinicians/licensing/new-york) · [AANP 461K NPs](https://www.aanp.org/advocacy/advocacy-resource/position-statements/nurse-practitioners-in-primary-care).
- **Labor:** [Payscale NY credentialing specialist](https://www.payscale.com/research/US/Job=Credentialing_Specialist/Salary/a276da63/New-York-NY) · [onlinejobs.ph credentialing assistant](https://www.onlinejobs.ph/jobseekers/job/1554524) · [HireTalent.ph](https://hiretalent.ph/skill/medical-billing-support).
- **Collaborating physicians:** [SingleAim NY](https://www.singleaimhealth.com/collaborating-physician-pay/new-york) · [Collaborating Docs press release](https://www.einpresswire.com/article/616932225/collaborating-docs-makes-drafting-a-collaborative-agreement-affordable).

### 7.3 Simulation inputs (all [A]/[E]; script: session scratchpad `sim/sim2.py`, 40,000 runs)

| Input | Base | With A/E | With B | With C | With D |
|---|---|---|---|---|---|
| Solo jobs 2028 (median; p90/median) | 70; 1.9× | 85; 1.9× | — | — | — |
| Solo ticket | $1,250–1,700 | $1,400–2,000 | — | — | — |
| Upkeep price / attach | $249 / 35% | $480 / 35% | — | — | — |
| Groups | 40% chance of a few at $249/yr per clinician | — | 50% chance the thesis fails by Sep 2027; else median 8 groups (p90 20), 7 clinicians (p90 11), $75–125/clinician/month, 25% yearly adds at $600, setup $1,500; 55% of December ARR recognized in 2028 | — | — |
| Billing | — | — | — | 35% fails; else median 20 clients (p90 44) × $3,500–6,500/yr; 50% recognized in 2028 | — |
| Acquisition | — | — | — | — | 12% closes; $300–900K revenue; 30–90% of a year in 2028 |
| Shared demand/execution factor | ±30% (lognormal σ 0.3) on jobs, groups and billing clients | | | | |

**Raw outputs (2028 revenue median / P≥$250K / Dec 2028 run-rate median / P run-rate ≥$250K / ≥$500K):**

| Strategy | 2028 median | P≥$250K | Run-rate median | P run-rate ≥$250K | P run-rate ≥$500K |
|---|---:|---:|---:|---:|---:|
| Base | $110K | 8% | $128K | 13% | 1% |
| A/E only | $157K | 22% | $183K | 30% | 4% |
| A + B | $186K | 31% | $232K | 45% | 10% |
| A + C | $198K | 34% | $260K | 53% | 12% |
| A + B + C | $226K | 43% | $310K | 64% | 20% |
| All | $246K | 49% | $341K | 68% | 29% |

The one-page table shades these down.

### 7.4 Cash profit (2028, medians, [E])

| | Base | A + E | A + B + E | A + B + C + E |
|---|---:|---:|---:|---:|
| Revenue | $110K | $155K | $185K | $225K |
| Ads | $15–20K | $20–25K | $25K | $25K |
| Card fees (~3%) | $3K | $5K | $6K | $7K |
| US coordinator | $34K | $34–42K | $42K | $42K |
| Offshore assistant | — | — | $8K | $15K |
| Biller, clearinghouse, BA/cyber/E&O | — | — | — | $25–30K |
| E&O, tools, site | $6K | $7K | $8K | $8K |
| **Cash profit** | **~$45K** | **~$75K** | **~$95K** | **~$105K** |
| Cash profit before the coordinator | ~$78K | ~$115K | ~$135K | ~$145K |

Billing and groups earn more in 2029 than in 2028, because their revenue is recurring and starts mid-year.

### 7.5 Open questions for Sid

1. Do customer records from before Nov 2025 exist outside the CRM, and roughly how many PLLCs by profession?
2. Prescriber tier price ($2,495 vs $2,995)?
3. Direct mail to new NY behavioral-health practices from public NPPES data: yes or no?
4. Is billing (PHI) ever acceptable, or off the table? If off, the core plan is A + B (~$175–185K median in 2028).
5. Group retainer price floor ($75 or $100 per clinician per month) and the per-hire add fee?
