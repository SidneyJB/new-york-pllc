# Credentialing direct-mail list, batch 1 (pulled Nov 18 2026, NOT mailed)

For the national channel test in [credentialing-national-test-checklist.md](../../credentialing-national-test-checklist.md) ("Agent: pull the mailing list from the public NPI registry"). Nothing has been sent and no vendor has been contacted.

| File | What | In git? |
|---|---|---|
| [list.csv](list.csv) | **2,543 organizations to mail** (one row per NPI) | No (gitignored: names and addresses) |
| [dropped.csv](dropped.csv) | 87 rows removed, each with `drop_reason`, so Sid can check the cuts | No (gitignored) |
| [summary.json](summary.json) | All counts below, machine-readable | Yes |
| [scripts/pull_credentialing_npi_list.py](../../scripts/pull_credentialing_npi_list.py) | The pull | Yes |
| [scripts/export_crm_credentialing_exclusions.ts](../../scripts/export_crm_credentialing_exclusions.ts) | Read-only CRM export used for exclusions | Yes |

## 1. Counts

**Date window:** NPI enumeration date **Aug 20 – Nov 18 2026** (90 days), inclusive.
**Pulled:** NPI API 2026-11-18 19:13 UTC; CRM export 2026-11-18 19:06 UTC.

| State (practice address) | Rows |
|---|---:|
| FL | 689 |
| TX | 691 |
| NY | 427 |
| NJ | 399 |
| MD | 337 |
| **Total** | **2,543** |

By category. Each row is counted once, under its first category in this order: prescriber, psychologist, therapist, addiction therapist, ABA, clinic/agency.

| Category | NY | NJ | FL | TX | MD | Total |
|---|---:|---:|---:|---:|---:|---:|
| Prescriber (psychiatry, psych NP, psych CNS) | 87 | 60 | 134 | 111 | 69 | **461** |
| Psychologist | 27 | 20 | 28 | 37 | 12 | **124** |
| Therapist (LCSW, LMHC/LPC, MFT, psychoanalyst) | 217 | 147 | 237 | 338 | 114 | **1,053** |
| Therapist, addiction only | 1 | 5 | 2 | 4 | 5 | **17** |
| Behavior analyst (ABA) | 35 | 59 | 169 | 57 | 23 | **343** |
| Clinic/agency only (mental health clinic, SUD clinic, community BH agency) | 60 | 108 | 119 | 144 | 114 | **545** |

Top primary taxonomies: Counselor, Mental Health 456 · Social Worker, Clinical 360 · Behavior Analyst 343 · Psych/Mental Health NP 336 · Mental health clinic 232 · Community/Behavioral Health agency 208 · Counselor, Professional 130 · Psychiatry 78. The full breakdown is in `summary.json` (`kept_by_primary_taxonomy`, `kept_by_bh_code_any`).

**Funnel:**

| Step | Count |
|---|---:|
| Active Type 2 orgs scanned (any BH-matching taxonomy description, any enumeration date): NY 14,921 · NJ 14,148 · FL 28,664 · TX 23,177 · MD 16,162 | 97,072 |
| Enumerated in the window | 2,836 |
| Practice address not in the 5 states (API state filter also matches mailing address) | -153 |
| No taxonomy code in the BH list (matched the description search only) | -53 |
| **BH, in window, practice in a test state** | **2,630** |
| Existing credentialing client (CRM) | -1 |
| Large system / chain (§3c) | -86 |
| **List** | **2,543** |

## 2. Taxonomy codes used (any listed taxonomy, not just primary)

| Codes | Why |
|---|---|
| `101Y00000X`, `101YM0800X`, `101YP2500X`, `101YA0400X`, `101YP1600X` | Counselors: mental health (LMHC/LPC), professional, addiction, pastoral. All credential with insurers |
| `104100000X`, `1041C0700X` | Social workers, clinical (LCSW) |
| `106H00000X` | Marriage & family therapist |
| `102L00000X` | Psychoanalyst (NY-licensed profession) |
| `103T*` (all psychologist specialties), `103G00000X` | Psychologists, clinical neuropsychologist |
| `103K00000X` | Behavior analyst (ABA). Kept but separate: the Nov 16 existing-customer campaign held ABA for Sid's call |
| `2084P0800X`, `2084P0804X`, `2084P0802X`, `2084P0805X`, `2084P0015X`, `2084F0202X`, `2084A0401X` | Psychiatry (general, child, addiction, geriatric, psychosomatic, forensic) and addiction medicine under Psychiatry & Neurology |
| `363LP0808X` | Psych/mental health NP (PMHNP) |
| `364SP0807X`–`364SP0813X` | Psych/mental health clinical nurse specialists |
| `261QM0801X`, `261QM0850X`, `261QM0855X`, `261QR0405X` | Mental health clinics (general, adult, child), substance-use clinics. Outpatient, so they credential with insurers |
| `251S00000X` | Community/behavioral health agency |

**Left out on purpose:** school counselor `101YS0200X` and school social worker `1041S0200X` (they don't bill insurers); behavior technicians `106S`; residential and inpatient facilities (`32xx`, `27x`/`28x` hospitals); neurology `2084N`.

106 kept rows have a non-BH **primary** taxonomy but a BH secondary one: multi-specialty groups, family NPs who also list psych, and similar (`primary_is_bh = no` in the CSV). Sid can filter them out.

## 3. Exclusions and flags

**(a) Existing credentialing clients: dropped.**
- **Source:** read-only `findMany` over every `Pllc` in the CRM (596).
- **Credentialing case means:** a `CredentialingEngagement` (any status), or a CAQH intake past draft. There are 3 cases.
- **Matched on:** NPI from CAQH intake `type1Npi`/`type2Npi` and from `NPI_TYPE1`/`NPI_TYPE2` credentialing item `externalId`, then normalized legal name. Normalizing lowercases, removes punctuation and drops PLLC/LLC/PC/Inc-type suffixes. DBA names are checked too.
- **Named-client regex:** also checks the named clients and quotes from the Nov 16 campaign builder (Green Sparrow, Cove Compass, Dunia Gibson, Madeline Rose, Sohayegh, Danielle Byrne, Gabriella Carbonara).
- **Result:** 1 dropped, Green Sparrow Counseling (NPI match). The other clients' NPIs were not enumerated in this window.
- **Not checked:** the separate MBS tenant database.

**(b) Our formation customers: flagged, not dropped.**
- **Rule:** the `our_customer_flag` column is set when the NPI or normalized name matches a PLLC in the CRM.
- **Result:** 19 rows (18 NY, 1 NJ). They are already in the existing-customer campaign's pool, so **Sid decides** whether they also get mail. Mailing them twice would double-count the test.

**(c) Large systems and chains: dropped (86).** Judged by structure and name, not size data; NPPES has no headcount.

| Rule | Dropped |
|---|---:|
| Has a hospital or hospital-unit taxonomy (`27x`, `28x`). Example: Bexar County Hospital District, 20 NPIs | 22 |
| Name matches a list of hospitals, health systems, universities, government bodies, FQHC/community health centers, and national BH/telehealth/ABA chains (LifeStance, Talkiatry, Thriveworks, Headway, Charlie Health, Acadia, Centria, Hopebridge, and others; the full regex is `BIG_NAME` in the script). Examples: Johns Hopkins All Children's, NYC Health + Hospitals, Meritus | 15 |
| The same organization name appears on 3 or more new NPIs in the window, meaning multi-site rollouts. Examples: Pomelo, Privia, Soar Health | 42 |
| The same authorized official and mailing street appear on 3 or more new NPIs, meaning one operator running multiple entities (for example, multi-state ABA LLCs) | 7 |

**Kept on purpose:**
- **Subparts:** 80 rows are NPI "subparts" of a parent organization (`subpart_of` column). Most are small practices registering a second location; dropping them cut real small practices.
- **Possible over-cuts:** 2 small "medical center" LLCs were dropped by the name rule. See `dropped.csv`.

## 4. Data limits

- **No date filter in the API.** It cannot filter by enumeration date, so the script pulls every active matching Type 2 org per state and taxonomy description. It splits by ZIP prefix (3, then 4, then 5 digits) until no query hits the 1,200-result cap, then filters by date. 1,392 queries; **0 cells left capped**.
- **Active NPIs only.** Deactivated NPIs are not returned.
- **Type 2 only.** Solo clinicians who bill under a Type 1 NPI are not here, which undercounts solos outside NY (study §2.1).
- **Addresses are as filed in NPPES.** No CASS/NCOA hygiene has been run yet.
  - 41 rows have a mailing address outside the 5 states. The `state` column is the practice state.
  - 77 mailing addresses are shared by 2 or more rows (137 extra rows). This is mostly one owner with several entities. Dedupe by mailing address before printing: **~2,406 unique addresses**.
- **Clinic/agency rows (545) are the least likely to be small practices.** Community BH agencies and clinics include nonprofits and Medicaid-heavy agencies. Sid may want to mail practitioner categories first.

## 5. Re-run (batch 2, Jan 5–16 2027)

From `~/dev/pllc-business`:

```bash
python3 new-york-pllc/scripts/pull_credentialing_npi_list.py --end 2027-01-05 --days 90 \
  --out new-york-pllc/reports/credentialing-npi-list-2027-01-05
```

- **Runtime:** about 5 minutes for the API pull. It runs the read-only CRM export itself through `npx tsx` in `PLLC-CRM/crm`.
- **Options:**
  - `--raw-cache <file.json>` saves the API records so re-filtering skips the pull.
  - `--crm-json <file>` reuses an existing CRM export.
  - `--states` changes the states.
- **Avoid mailing the same orgs twice:** batch 2's window overlaps batch 1 (Oct 7 – Nov 18). Either use `--days 47` with `--end 2027-01-05` (window starts Nov 19 2026), or drop NPIs already in this `list.csv`.
- **Copy the gitignore:** copy this folder's `.gitignore` into the new report folder.

## Sid's decisions (Nov 18)

1. Drop the 19 rows that are our own formation customers.
2. Include ABA. Before batch 1 drops: add licensed behavior analyst to the panel tracker and draft a technician-roster price for Sid's approval.
3. Batch 1 is individual practices only. Clinic/agency-only rows wait for batch 2, and go only if batch 1 results justify it.
4. NY rows that are also on the NY DOS letter list are dropped from the postcards (Sid, Nov 18): they get the letter only.

## Batch 1 file (Nov 18)

Built Nov 18 2026 from `list.csv` with Sid's decisions above. **Nothing is sent, uploaded or ordered.** No vendor account exists.

| File | What | In git? |
|---|---|---|
| [batch-1-mail-file.csv](batch-1-mail-file.csv) | **1,831 pieces**, one per mailing address. Columns: attention line (authorized official), organization, mailing address lines, city, state, ZIP, `state_code`, printed URL, redirect target, QR URL, `postcard_code`, `source_npis`, `other_orgs_at_address`, `address_flag`, `note` | No (gitignored) |
| [batch-1-excluded.csv](batch-1-excluded.csv) | 712 rows taken out, each with its step and reason | No (gitignored) |
| [batch-1-summary.json](batch-1-summary.json) | Counts only | Yes |
| [scripts/build_credentialing_mail_batch.py](../../scripts/build_credentialing_mail_batch.py) | Builds the file | Yes |
| [scripts/export_crm_credentialing_mail_checks.ts](../../scripts/export_crm_credentialing_mail_checks.ts) | Read-only CRM export for step 3 (`findMany` only on the main DB, one `SELECT` in a READ ONLY session on the MBS tenant) | Yes |

### Waterfall (practice state)

| Step | NY | NJ | FL | TX | MD | Total |
|---|---:|---:|---:|---:|---:|---:|
| NPI list (`list.csv`) | 427 | 399 | 689 | 691 | 337 | **2,543** |
| 1. Drop our formation customers (`our_customer_flag`) | 409 | 398 | 689 | 691 | 337 | 2,524 (-19) |
| 2. Drop clinic/agency-only rows (ABA stays) | 349 | 290 | 570 | 547 | 223 | 1,979 (-545) |
| 3. CRM re-check | 344 | 290 | 570 | 547 | 223 | 1,974 (-5) |
| 4. Drop NY rows on the NY DOS letter list (letter only) | 290 | 290 | 570 | 547 | 223 | 1,920 (-54) |
| 5. One piece per mailing address | **286** | **281** | **550** | **502** | **212** | **1,831** (-89) |

Pieces by category: therapist 954, prescriber 410, behavior analyst (ABA) 331, psychologist 119, addiction therapist 17.

**Cost:** 1,831 × $0.73 (Stannp 6x9 First-Class) = **$1,337**; at Lob's $1.03 = **$1,886**.

### How each step was done

- **Step 3, CRM re-check (read-only, Nov 18 21:21 UTC).** Checked all 596 CRM PLLCs for any credentialing touch: an engagement (3), a CAQH intake (2), checkout CAQH interest (36), a quote by email (5), the CAQH backlist (34), credentialing notes (14), open credentialing tasks, or credentialing emails sent (5). Also checked the do-not-send list (`do-not-send.ts`: names, emails and PLLC IDs), the 3,447 MBS tenant PLLC names, and 30 credentialing-related inbound emails from senders not linked to a customer. Matches were on NPI, normalized org or DBA name, and authorized official = owner name. Five rows dropped, all NY:
  - 3 formation customers the pull missed. Same owner, and org names that differ only in wording (for example "Confluence NP in Psychiatry" vs "Confluence Nurse Practitioner in Psychiatry PLLC").
  - 1 CAQH backlist skip. The official owns that PLLC; the org name has no "LCSW, PLLC".
  - 1 MBS tenant customer (name match).
  - No do-not-send, quote or open-lead hits remained after steps 1–2. The 19 dropped in step 1 already covered them.
- **Step 4, NY DOS letter list.** Compared against the 298 mailable rows from the letter list (`bh-pllc-letter-draft-2026-11-18/list-method/build-list.py`, Nov 18 run; filed Aug 20 – Nov 17).
  - **51 matched on normalized entity name**, compared with spaces removed so "Grace WellnessNP" matches "Grace Wellness NP".
  - **3 matched on address plus name:** same ZIP5, house number and street, and the names share a distinctive word or the letter's PLLC name carries the official's last name.
  - **23 address-only matches were kept.** They were different practices in the same office building or at the Albany agent address.
  - 1 non-NY row also matched on name. It was kept, because the rule is NY only.
  - Rows the letter list leaves out (ABA, Rockland no-match, "c/o" agent addresses) stay on the postcards, since they get no letter.
- **Step 5, dedupe.** Rows are grouped by normalized mailing line 1, line 2 and ZIP5, then rows with the same org name and ZIP5 are merged (for example one org filed as "STE 3350" and "STE C3350"). The earliest-enumerated row sets the attention line and organization. The other NPIs go in `source_npis` and `other_orgs_at_address`.
- **Tracking fields** follow [the direct-mail draft §5.1](../credentialing-direct-mail-draft-2026-11-18/README.md): printed URL `[domain]/{ny|nj|fl|tx|md}`, redirect and QR URLs with `utm_campaign=cred_mail_2026_12` and `utm_content=pc6x9_{state}`, and postcard code `{STATE}-1`. They use the practice state, not the mailing state. `[domain]` stays a placeholder until the brand and domain are picked. Re-run with `--domain` to fill it.

### Flagged (kept in the file; Sid decides)

- **4 pieces with an address flag** (`address_flag`):
  - 3 virtual-mailbox addresses with no private box number (7901 4th St N, St Petersburg ×2; 5900 Balcones Dr Ste 100, Austin). These will probably come back.
  - 1 billing lockbox (PO Box 1000 Dept 394, Memphis) for a FL org.
  - No row has a blank street, city or ZIP, or a ZIP outside its state. NPPES validates those fields.
- **26 pieces mail to an address outside the 5 states** (`note`). The card still uses the practice state's URL and code. Two of them are Northwest agent addresses in Albuquerque.
- **38 pieces go to a virtual-mailbox or registered-agent address** (`note`), mostly 5900 Balcones (Austin) and 7901 4th St N (St Petersburg). They are forwarded by box number, so they should arrive late rather than not at all.
- **18 pieces cover addresses with different officials on the rows.** Only the first official is printed, and the rest are listed in `note`.
- **The letter list is a snapshot.** It came from the Nov 18 scratch run. The January letter re-run will add NY PLLCs filed after Nov 17, and those may also get a December postcard. That only matters for NPIs enumerated Nov 18 or later, which is none in this file.
- **Not run yet: CASS/NCOA.** The vendor's address check will catch more before printing.

### Re-run

From `~/dev/pllc-business` (`$TMP` = a folder outside every repo):

```bash
(cd PLLC-CRM/crm && npx tsx ../../new-york-pllc/scripts/export_crm_credentialing_mail_checks.ts $TMP/crm-mail-checks.json)
# NY DOS letter list (see bh-pllc-letter-draft-2026-11-18/README.md):
NODE_PATH=PLLC-CRM/crm/node_modules node new-york-pllc/reports/bh-pllc-letter-draft-2026-11-18/list-method/crm-names.js $TMP
python3 -I new-york-pllc/reports/bh-pllc-letter-draft-2026-11-18/list-method/build-list.py $TMP --start 2026-08-20 --end 2026-11-18
python3 new-york-pllc/scripts/build_credentialing_mail_batch.py \
  --list new-york-pllc/reports/credentialing-npi-list-2026-11-18/list.csv \
  --crm-json $TMP/crm-mail-checks.json --letter-list $TMP/letter-list.csv \
  --batch 1 --campaign cred_mail_2026_12 --out new-york-pllc/reports/credentialing-npi-list-2026-11-18
```

**Batch 2** uses the new folder's `list.csv` with these settings:
- `--batch 2 --campaign cred_mail_2027_01 --content-suffix _t1`
- `--exclude-npis new-york-pllc/reports/credentialing-npi-list-2026-11-18/batch-1-mail-file.csv`, which drops NPIs already mailed.
- `--keep-clinics`, only if batch 1 results justify clinic/agency rows.

For the repeat touch to batch-1 non-responders, use `--content-suffix _t2 --code-suffix R`. Re-run the CRM export the day the file goes to the vendor.
