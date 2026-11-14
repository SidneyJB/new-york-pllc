# P2-06 - Prospect selection method

Draft, Nov 13 2026. Agent. Counts only here. The per-entity list is in the gitignored CRM folder `PLLC-CRM/crm/reports/p2-06-vm-migration-2026-11-13/` (`candidates.csv`, `shortlist-tiered.csv`). Nobody was contacted.

## Query

Read-only Prisma script against the production CRM database, run Nov 13 2026:
`PLLC-CRM/crm/reports/p2-06-vm-migration-2026-11-13/count-prospects.ts` (plus `ra-overlap.ts`, `check-blocklist.ts`). No writes.

## Funnel (counts)

| Step | Count |
|---|---:|
| PLLC rows in CRM (after finance exclusion list) | 579 |
| Not yet formed (no DOS approval) | -189 |
| **Formed** | **390** |
| Cancelled and refunded | 0 |
| Non-professional LLC | -16 |
| Foreign | -8 |
| Partner/enterprise-owned | 0 |
| Current VM client | -163 |
| Former VM client (cancelled) | -7 |
| Formed under 90 days ago (P2-05 path) | -17 |
| **Formed NY professional entity, no VM, 90+ days old** | **179** |

## Address on file (the 179)

The CRM entity address is the address on the Articles, which is the DOS service-of-process address for non-VM clients.

| Address type | Count |
|---|---:|
| Matches an owner's personal address in the CRM (home address on DOS record) | **85** |
| - of which apartment/unit addresses | 13 |
| - of which house-style addresses (no unit) | 71 |
| - of which looks commercial but matches owner address | 1 |
| Looks commercial (suite, floor, plaza, medical building) | 26 |
| No unit, not matched to an owner (could be a house or a small office) | 62 |
| Apartment/unit, not matched to an owner | 3 |
| Already shows our address (data check needed) | 2 |
| PO box | 1 |

Address type is a text heuristic plus an exact match to the owner's personal address. Each prospect must still be checked by hand.

## Other checks on the 179

| Check | Count |
|---|---:|
| Live RA subscription with us ($99/yr; VM would replace it) | 174 |
| RA opt-out set | 6 |
| Registered agent elsewhere | Unknown. The CRM field for the DOS agent name is empty on every row. Every PLLC we formed names us as agent, so "RA elsewhere" prospects come only from partner introductions. |
| Law firms | 29 (12 among the home-address group) |
| Orders attributed to a B2B partner | 3 |
| Owner email missing | 0 |
| On the email blocklist | 0 |
| Days since DOS approval, home-address group | 95 to 352 (median 217) |

## Tiers

| Tier | Rule | Count |
|---|---|---:|
| **1** | Home address on DOS record, not a law firm, office-light profession (psychiatric NP, LCSW, LMHC, LMFT, psychology) | **20** |
| 2 | Home address on DOS record, not a law firm, other professions (medicine, PT, OT, family NP, architecture, etc.) | 52 |
| 3 | Everything else (commercial or unclear address, law firms) | 107 |

## How to pick the 10-15

1. Start from Tier 1 (20).
2. Ops reviews each one by hand and removes:
   - anyone with an open complaint, dispute, refund, or unpaid balance
   - anyone who asked not to receive email, or whose thread shows a bad experience
   - anyone whose address is actually an office (check DOS and a map)
   - anyone with a permitted-use red flag (needs our address for NPPES or patients)
3. Fill to 10-15 from Tier 2, oldest DOS approval first, preferring telehealth-heavy practices.
4. Add any partner introductions, especially entities with an outside agent. Partner intros skip the tiering but pass the same fit check.
5. Sid confirms we may contact each past customer for this offer (see README decision).
6. Do not send to all 179. Former formation buyers are not automatically mail customers.

## Permission note

These are past customers with a service relationship (most are paying us for registered agent). Any email is a commercial message: it must identify us, include a way to opt out, and honor opt-outs. Sid decides whether a one-to-one email from him is acceptable for each Tier 1 contact.
