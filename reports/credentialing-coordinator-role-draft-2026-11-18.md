# Credentialing coordinator: role draft (Nov 18 2026, NOT posted)

**Status: draft for Sid. Not posted anywhere, nobody contacted, no hire decided.** Sid's position (decision log, Nov 13): no contractor yet, Sid delivers. This is the December item in the [2028 outlook](../nypllc-2028-path-to-1m-plan.md) §5 ("coordinator job description and hire trigger"), written early so it's ready when the trigger hits.

Tags: **[M]** measured, **[E]** estimate, **[A]** assumption, **[C]** cited source, **[U]** not confirmed.

---

## 1. Hire trigger (unchanged)

Hire when **either** comes first (decision log Nov 13; outlook §3A):

- credentialing holds at **about 5 jobs a month for two straight months**, or
- **Sid's total week nears his ~40-hour limit** (he works about 20–25 hours now).

Check it monthly (re-cut §6). Before posting, the access setup in §6 has to be built; that takes longer than the posting, so start it when credentialing first reaches about 4 jobs in a month.

## 2. How big the role is: unmeasured, so size it on logged minutes

- **Sid's own time on the first full case was about 30 minutes**, with agents doing the rest (Sid's figure).
- **CRM log, read-only, Nov 18 2026 [M]:** 422 credentialing events across 3 engagements. Minutes are logged on 10 of them (160 minutes, all agent work). Sid's and staff time is not logged on any event.
- So **hours per job are unmeasured.** The older figures (12–22 hours a job; "4–5 jobs a month is about 12–16 hours a week" in the [credentialing plan](../../PLLC-CRM/crm/docs/insurance-credentialing-expansion-plan-2026-11.md) §3.4) assumed hand work and were retired on Nov 16. Don't size the role from them.
- **How to size it when the trigger hits:** take the median logged human minutes per job over the last two months, multiply by jobs a month, and add the payer phone follow-ups (the part agents can't do, and the part the plan expected to be the long tail). That gives the weekly hours to post. Until then, the cost lines in §8 are a menu, not a forecast.
- What the person does is the **human-only part of an agent-driven case**: the steps the ops manual §2 reserves for a person (logging in under their own account, MFA, identity checks, CAPTCHAs, reading a filled form back before submit), phone calls to insurers, and keeping clients moving. Agents keep doing the drafting, form-filling and logging.

---

## 3. Job description (draft)

**Credentialing coordinator, part-time (contract). Remote, or New York.**

We're a small New York company that forms professional practices (PLLCs) for clinicians, and we now get those practices in network with insurance companies. Most of our clients are therapists, counselors, social workers, psychologists and psychiatric nurse practitioners. You'd work directly with Sid, the owner.

Our process is heavily automated. Software prepares the forms, fills the portals and keeps the case log. We need a person for the parts that have to be done by a person: logging in to the government and insurer portals under your own account, calling insurers to move applications along, checking each application before it goes in, and helping clients get through the few steps only they can do.

**What you'd do**

- Work a case list of clinicians at different stages, using our CRM, where every step and every follow-up date is tracked.
- Check that each application is complete and correct before it's submitted, then submit it where you're authorized to.
- Call and write to insurers every two weeks about each open application, and record exactly what they said, with names, reference numbers and dates.
- Work in the portals: NPPES (NPI records), CMS Identity & Access and PECOS (Medicare), CAQH ProView and Practice Manager, NY eMedNY / Medicaid enrollment, Availity, Optum Provider Express and other insurer portals.
- Record every network-status answer from an insurer ("open" or "closed" for a profession and county) in our panel tracker the same day.
- Send clients the short, plain updates Sid has approved, and help them with their own steps (CAQH attestation, the NY.gov account, the Medicaid submit, one notarized form).
- Log your time on every step. It sets our prices and staffing.

**What you need**

- At least 2 years of provider enrollment or credentialing work, including commercial insurer applications (for example UnitedHealthcare/Optum, Aetna, Cigna/Evernorth, Anthem/Carelon, Healthfirst, Fidelis).
- CAQH ProView: building and maintaining provider profiles, attestation and authorization.
- NPPES: Type 1 and Type 2 NPIs, taxonomy codes, updates.
- Medicare PECOS: 855I and 855B, reassignment, surrogate access through CMS I&A.
- NY Medicaid (eMedNY): individual and group enrollment, and how the provider's own submit and the 45-day application window work.
- Behavioral-health credentialing experience (LCSW, LMHC, LMFT, psychologist, psychiatric NP).
- Careful with sensitive personal data. You'll see licenses, NPIs and dates of birth, never passwords.
- Clear, plain writing and calm phone manner. Comfortable with a CRM and with checking software's work instead of retyping it.

**Nice to have:** New Jersey, Florida, Texas or Maryland Medicaid (states we're adding); Medicaid managed care plans; group practice rosters.

**Terms:** part-time contract, about 10–25 hours a week depending on case volume, flexible hours within the business day (insurer phone lines). [Pay range from §7.] Paid trial project first (§5).

## 4. What stays with Sid

- Pricing, quotes, invoices, refunds and credits (the Stripe refund for a closed insurer runs only on Sid's approval).
- Anything said to a client that isn't an approved template: Sid approves the wording (manual ground rule 8).
- Selling, and deciding what any client is offered.
- The business's own accounts: Sid stays the CMS I&A Authorized Official and the CAQH Practice Manager admin, and approves the coordinator's user on each.
- Typing a tax ID (EIN or SSN) into any web form, and fetching a signed W-9 or the SSN form from Cognito when a payer needs it.
- Attestations Sid must make personally.
- Hiring, contracts, and any new system access.

## 5. Trial project (paid, no real client data)

About 4–6 hours at the offered rate, done from the candidate's own computer with **no access to our systems**:

1. **Intake check.** A fictional LMHC's intake (CV, license, malpractice certificate, a CAQH data sheet with three planted errors: a taxonomy that doesn't match the license, a practice address that differs from NPPES, an expired malpractice date). Find the errors and list what you'd ask the client for, in the order you'd ask.
2. **Public NPI lookup.** For two public NPIs we name, read the NPPES record and say what would need updating before a group application under a new PLLC.
3. **Follow-up plan.** For a fictional case with applications at three insurers (submitted 3, 6 and 10 weeks ago), write the follow-up log entries: who you'd call, what to ask, what you'd record.
4. **Client update.** Rewrite one of our real templates (provided) as a short update to that fictional client. Plain, warm, no jargon.

Judge on accuracy, the order of asks (fewest things at once, ground rule 3), and whether the log entries would let someone else pick up the case.

## 6. Access and security setup required before day one

Today the CRM has **one shared staff password** (`CRM_PASSWORD` in `crm/lib/auth-config.ts`) and no per-person accounts or audit log [M, code read Nov 18]. That's fine for Sid alone and not acceptable for a second person who would see dates of birth and license data. The credentialing plan §3.4 already makes this a condition of the hire.

**Build first (CRM change, Sid approves the plan; nothing built here):**

- **Own CRM login** per person (Google sign-in or email + MFA), replacing the shared password for staff.
- **Role scoping:** a credentialing role sees only credentialing engagements, their PLLCs' credentialing fields, events, tasks and the panel tracker. No Stripe, billing, other customers' orders, virtual mail, Metro/MBS tenant data or the ops action board.
- **Audit trail:** every view and change of a credentialing record logged with person, time and record (who opened which client's DOB, not just who edited). Exportable for review.
- **Event attribution:** `CredentialingEvent.actor` set from the login, so minutes are logged per person.
- **Off-boarding:** one switch disables the CRM login; a checklist to remove the person from each portal below the same day.

**Data they can see:** client name, practice and home address (only if the client agreed it can be used), license numbers, NPIs, date of birth, CAQH ID, malpractice details, insurer reference numbers, approved email threads with that client.

**Data they never see or handle:**

- **SSNs.** W-9s and the SSN form stay in Cognito (encrypted entries; ground rule 5); Sid fetches them when a payer needs one. Nothing with an SSN goes to S3, email, the CRM or chat (ground rule 7).
- **Client passwords.** We never ask (ground rule 5). The coordinator works through surrogate and delegate access or on paper, like Sid.
- **Sid's own logins**, MFA devices and recovery codes. No shared accounts anywhere.
- Bank details.

**Their own accounts on each system** (one person, one login, per the manual):

| System | Setup | Status |
|---|---|---|
| CMS I&A (NPPES, PECOS) | Registers as a Staff End User under Business Filing Solutions LLC; Sid approves as Authorized Official | [C] [manual: CMS I&A](../../PLLC-CRM/crm/docs/credentialing/systems/cms-ia.md) step 7 |
| CAQH Practice Manager | Added as a user on our practice by Sid as admin | [U] that a second user can be added; check before posting |
| NY.gov / NY Medicaid PSP | Own NY.gov Business account; a delegate can prepare, the provider submits | [C] [manual: NY Medicaid](../../PLLC-CRM/crm/docs/credentialing/systems/ny-medicaid.md) |
| Optum One Healthcare ID, Availity, other insurer portals | Own user on our desk account, or a delegate role the client grants | [U] per portal |
| Email | Own mailbox or Gmail delegate on the credentialing inbox; client sends still go through the send gate and Sid-approved templates | To decide |

**Paperwork:** a contractor agreement with a confidentiality and data-handling clause (no copies of client data off our systems, no personal devices without disk encryption and a screen lock, a password manager, report any suspected exposure within 24 hours). Ask counsel whether a background check or a BAA-style clause is advisable [U]; we've treated credentialing data as sensitive, not as patient health information.

## 7. Pay range

Market, checked Nov 18 2026:

| Source | Figure | Note |
|---|---|---|
| [BLS OOH, medical records specialists](https://www.bls.gov/ooh/healthcare/medical-records-and-health-information-technicians.htm) (closest BLS occupation; BLS has no separate credentialing title) | Median **$24.59/h** ($51,140/yr), May 2025; bottom 10% under $37,000, top 10% over $81,150 | [C] national |
| [Indeed, credentialing specialist](https://www.indeed.com/salaries/credentialing-specialist-Salaries) | **$24.90/h** national (about 2,100 postings, 36 months); **$26.04/h New York, NY**; updated Nov 8 2026 | [C] posting averages |
| [Indeed, credentialing coordinator](https://www.indeed.com/salaries/credentialing-coordinator-Salaries) | **$27.57/h** national (774 postings); **$25.80/h New York, NY**; updated Nov 8 2026 | [C] |
| Payscale, credentialing specialist with medical credentialing skills ([via search](https://www.payscale.com/research/US/Job=Credentialing_Specialist/Hourly_Rate/00bbb083/Medical-Credentialing)) | About $23.54/h national, 2026 | [S] not opened directly |
| NY contract postings seen in search results (CareerBuilder, ZipRecruiter) | About $25–30/h | [S] |

**Proposed range: $26–32 an hour, part-time contract.** The bottom matches the NY posting averages; the top pays for someone who already knows eMedNY and PECOS and needs little training, which is what an agent-heavy process needs. The plan's older $35/h is above market and can stay as the ceiling for an exceptional candidate. If Sid prefers a part-time employee instead of a contractor, add about 8–10% for employer payroll taxes [E].

## 8. Cost per month

At $26–32/h, 4.33 weeks a month: **10 h/week $1,130–1,390 · 15 h/week $1,690–2,080 · 25 h/week $2,820–3,470.**

For scale only: one Get in network job is $1,795, and one Move my contracts job with three insurers is $696.

## 9. Decisions for Sid

1. Approve the draft, or edit the duties and what stays with him.
2. Pay range $26–32/h, contract (or part-time employee at about 8–10% more).
3. Approve planning the CRM access build in §6 (per-person login, credentialing role, audit trail). It's the long pole and should start at about 4 jobs a month, before the trigger.
4. Remote only, or prefer NY (NY Medicaid and notary steps don't need a NY location; insurer phone hours are Eastern).
5. Where it would be posted when the trigger hits (Indeed, LinkedIn, a credentialing community board, a referral). Nothing goes up before Sid says so.
