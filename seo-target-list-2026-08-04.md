# SEO Target List — 2026-08-04

Generated from [cannibalization-2026-08-04.csv](cannibalization-2026-08-04.csv) + [Queries_2025-10-27_to_2026-08-02.csv](gsc/Queries_2025-10-27_to_2026-08-02.csv).

## Headline numbers

- **259** commercial queries in the work queue
- **10,878** organic impressions at stake (GSC window)
- **$9,109** estimated annual paid spend represented (`paid_cost` annualised over 281 days → ×1.30)
- **14** content gaps (`GAP — no page`)
- **74** plain-LLC queries held **out of scope** (1,720 impr, $331/yr) — see below

## Priority formula

```
priority_score = 100 × (0.45 × norm(log1p(impressions))
                      + 0.35 × norm(log1p(est_annual_paid_cost))
                      + 0.20 × gap_multiplier(position))

gap_multiplier:
  no organic position (PAID_ONLY) → 0.50
  position  1–10                  → 0.70  (page 1 — worth pushing, less upside)
  position 11–30                  → 1.00  (winnable sweet spot)
  position 31–50                  → 0.55
  position 51+                    → 0.25
```

Normalisation (`norm`) is min-max over the filtered target set.

## Exclusion rules

Queries are dropped when they match any of:

1. **Other-state formation** — targets another US state without NY context (e.g. `texas pllc`, `foreign qualification florida`). NY foreign-qualification queries are kept and mapped to `/foreign-pllc`.
2. **Research / definition** — `what is…`, `…vs…`, `stands for`, comparisons. **Cost/pricing queries are kept** (`pllc cost`, `how much…`).
3. **Jobs / school / licensing path** — salary, CEU, supervision hours, exam prep, `how to become an lcsw`, license lookup.
4. **Junk / navigational** — brand (`nypllc`), competitor brands (LegalZoom, etc.), personal names, nonsense GSC tail.
5. **Low signal** — organic-only with &lt;10 impressions and no formation keywords, and no paid spend.
6. **LLM / spam tail** — queries over 80 characters, or prompt-style patterns (`list online…`, `which online…`, `pricing strategies`).

## Top 20 priorities

| Priority | Query | Pos | Impr | Paid $/yr | Target URL |
|---------:|-------|----:|-----:|----------:|------------|
| 100.0 | pllc formation new york | 26.5 | 813 | $1,687 | `/` |
| 94.6 | ny pllc formation | 28.9 | 396 | $1,507 | `/` |
| 88.1 | new york pllc formation | 25.1 | 487 | $281 | `/` |
| 84.0 | pllc formation | 25.2 | 282 | $256 | `/` |
| 81.4 | pllc new york | 35.9 | 302 | $901 | `/` |
| 77.8 | pllc new york cost | 17.4 | 343 | $50 | `/ny-pllc-cost` |
| 77.6 | ny pllc | 20.4 | 67 | $495 | `/` |
| 77.2 | new york pllc | 32.7 | 457 | $203 | `/` |
| 74.1 | start a pllc | 17.9 | 134 | $89 | `/how-to-form-a-pllc-in-ny` |
| 72.2 | pllc ny | 44.8 | 212 | $211 | `/` |
| 71.7 | form pllc new york | 37.6 | 236 | $162 | `/` |
| 70.0 | forming a pllc in ny | 30.9 | 142 | $230 | `/how-to-form-a-pllc-in-ny` |
| 68.7 | pllc in new york | 43.9 | 193 | $114 | `/` |
| 67.8 | pllc new york state | 19.3 | 36 | $148 | `/` |
| 67.4 | create a pllc | 19.9 | 94 | $34 | `/how-to-form-a-pllc-in-ny` |
| 66.9 | nys pllc | 40.9 | 182 | $83 | `/` |
| 66.8 | pllc | 39.7 | 59 | $409 | `/` |
| 66.2 | how long does it take to form a pllc in ny | 8.8 | 107 | $82 | `/how-long-to-form-a-pllc-in-ny` |
| 66.1 | pllc application | 36.7 | 265 | $41 | `/` |
| 64.9 | how to form a pllc in new york | 36.3 | 159 | $66 | `/how-to-form-a-pllc-in-ny` |

## Work batches by target URL

### `/` (113 queries)

_5,997 impressions · $7,984/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| pllc formation new york | 26.5 | 813 | $1,687 | 100.0 |
| ny pllc formation | 28.9 | 396 | $1,507 | 94.6 |
| new york pllc formation | 25.1 | 487 | $281 | 88.1 |
| pllc formation | 25.2 | 282 | $256 | 84.0 |
| pllc new york | 35.9 | 302 | $901 | 81.4 |
| ny pllc | 20.4 | 67 | $495 | 77.6 |
| new york pllc | 32.7 | 457 | $203 | 77.2 |
| pllc ny | 44.8 | 212 | $211 | 72.2 |
| form pllc new york | 37.6 | 236 | $162 | 71.7 |
| pllc in new york | 43.9 | 193 | $114 | 68.7 |
| pllc new york state | 19.3 | 36 | $148 | 67.8 |
| nys pllc | 40.9 | 182 | $83 | 66.9 |
| pllc | 39.7 | 59 | $409 | 66.8 |
| pllc application | 36.7 | 265 | $41 | 66.1 |
| pllc formation in new york | 33.7 | 155 | $35 | 61.8 |
| _…and 98 more_ | | | | |

### `/how-to-form-a-pllc-in-ny` (27 queries)

_1,572 impressions · $760/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| start a pllc | 17.9 | 134 | $89 | 74.1 |
| forming a pllc in ny | 30.9 | 142 | $230 | 70.0 |
| create a pllc | 19.9 | 94 | $34 | 67.4 |
| how to form a pllc in new york | 36.3 | 159 | $66 | 64.9 |
| how to form a pllc | 35.6 | 204 | $25 | 62.1 |
| how to form a pllc in ny | 29.8 | 152 | $4 | 61.5 |
| how to set up a pllc | 50.3 | 138 | $17 | 51.6 |
| how to create a pllc in ny | 15.6 | 11 | $14 | 49.4 |
| form a pllc | 14.5 | 2 | $78 | 47.9 |
| how to create a pllc | 36.4 | 223 | $0 | 47.3 |
| forming a pllc | 36.5 | 10 | $63 | 46.7 |
| how to start a pllc | 24.6 | 9 | $10 | 46.7 |
| forming a pllc in new york | 40.1 | 13 | $25 | 44.0 |
| how to form an llc in ny | 92.4 | 126 | $0 | 37.5 |
| how to open a pllc | 6.3 | 3 | $6 | 32.2 |
| _…and 12 more_ | | | | |

### `/virtual-address-services` (30 queries)

_892 impressions · $57/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| registered agent mail forwarding | 29.1 | 81 | $0 | 49.6 |
| virtual office pearl river | 19.4 | 73 | $0 | 48.9 |
| nyc virtual office with mail forwarding | 74.2 | 205 | $0 | 40.8 |
| registered business address service | 47.9 | 34 | $0 | 34.9 |
| new york virtual address | 71.5 | 80 | $0 | 34.5 |
| virtual business address new york | 50.0 | 24 | $0 | 32.6 |
| new york mail forwarding | 47.2 | 21 | $0 | 31.8 |
| mail forwarding new york | 53.6 | 47 | $0 | 31.0 |
| virtual office registered agent | 47.3 | 15 | $0 | 29.6 |
| virtual address in new york | 82.1 | 33 | $0 | 28.7 |
| pearl river virtual office | 38.9 | 13 | $0 | 28.7 |
| best virtual address service for llc | 64.8 | 30 | $0 | 28.1 |
| pllc registered agent | 11.0 | 2 | $0 | 27.4 |
| virtual address and phone number for llc | 76.2 | 26 | $0 | 27.1 |
| the new york registered agent co | — | 0 | $32 | 26.4 |
| _…and 15 more_ | | | | |

### `/foreign-pllc` (24 queries)

_447 impressions · $9/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| foreign qualification new york | 40.3 | 52 | $0 | 37.7 |
| ny foreign qualification | 44.1 | 35 | $0 | 35.1 |
| ny foreign llc registration | 43.7 | 27 | $0 | 33.4 |
| foreign llc new york | 46.6 | 23 | $0 | 32.3 |
| foreign llc registration new york | 49.1 | 22 | $0 | 32.1 |
| foreign llc in ny | 46.8 | 19 | $0 | 31.1 |
| new york foreign llc | 46.9 | 17 | $0 | 30.4 |
| ny foreign llc | 43.5 | 17 | $0 | 30.4 |
| new york foreign qualification | 36.1 | 15 | $0 | 29.6 |
| new york foreign llc registration | 60.9 | 33 | $0 | 28.7 |
| foreign qualification service | 36.0 | 12 | $0 | 28.2 |
| registering a foreign llc in new york | 62.6 | 29 | $0 | 27.8 |
| foreign llc doing business in ny | 70.2 | 24 | $0 | 26.6 |
| foreign llc doing business in new york | 66.1 | 24 | $0 | 26.6 |
| register foreign llc in ny | 60.5 | 22 | $0 | 26.1 |
| _…and 9 more_ | | | | |

### `/professions/law` (16 queries)

_241 impressions · $27/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| pllc lawyer | 16.4 | 35 | $15 | 57.1 |
| pllc attorney | 10.2 | 29 | $0 | 42.8 |
| law firm filing | 17.1 | 24 | $0 | 41.6 |
| law firm formation | 15.6 | 11 | $0 | 36.7 |
| attorney llc formation | 51.5 | 63 | $0 | 32.9 |
| can a law firm be an llc in new york | 34.4 | 23 | $0 | 32.3 |
| law firm pllc | 25.0 | 5 | $0 | 32.0 |
| attorney to set up llc | 33.6 | 18 | $0 | 30.8 |
| pllc law firm | 10.7 | 3 | $0 | 29.3 |
| articles of organization lawyer | 77.9 | 18 | $0 | 24.8 |
| what type of lawyer handles llc formation | 12.0 | 1 | $0 | 24.7 |
| entity formation attorney | 21.0 | 1 | $0 | 24.7 |
| lawyer llc formation | 39.2 | 6 | $0 | 24.1 |
| 501(c)(3) formation attorney | 43.2 | 4 | $0 | 21.8 |
| manhattan business lawyer | — | 0 | $6 | 19.3 |
| _…and 1 more_ | | | | |

### `/professions/mhc` (9 queries)

_351 impressions · $0/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| mhc lp | 40.0 | 104 | $0 | 42.2 |
| lmhc | 40.6 | 64 | $0 | 39.0 |
| lmhc new york | 45.0 | 45 | $0 | 36.7 |
| mhc-lp | 41.7 | 34 | $0 | 34.9 |
| new york state licensed mental health counselor | 49.9 | 30 | $0 | 34.1 |
| lmhc nyc | 53.7 | 45 | $0 | 30.7 |
| mhc new york | 30.2 | 15 | $0 | 29.6 |
| pllc therapist | 26.0 | 3 | $0 | 29.3 |
| licensed mental health counselor | 33.5 | 11 | $0 | 27.7 |

### `/professions/massage-therapist` (4 queries)

_407 impressions · $0/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| llc for massage therapy | 8.1 | 357 | $0 | 53.5 |
| llc for massage therapist | 25.8 | 17 | $0 | 39.4 |
| what documents do i need to apply for massage therapist insurance? | 37.7 | 32 | $0 | 34.5 |
| for massage therapy | 4.0 | 1 | $0 | 18.7 |

### `/professions/engineer` (5 queries)

_70 impressions · $0/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| incorporation for engineers | 49.6 | 21 | $0 | 31.8 |
| professional engineer ny | 34.9 | 16 | $0 | 30.0 |
| new york professional engineer | 30.9 | 13 | $0 | 28.7 |
| nys professional engineer | 34.9 | 10 | $0 | 27.1 |
| professional engineer | 75.0 | 10 | $0 | 21.1 |

### `/ny-pllc-cost` (3 queries)

_346 impressions · $56/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| pllc new york cost | 17.4 | 343 | $50 | 77.8 |
| pllc cost | 7.3 | 3 | $0 | 23.3 |
| new york llc publication cost | — | 0 | $5 | 18.8 |

### `/professions/lcsw` (4 queries)

_34 impressions · $11/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| new york lcsw | 32.8 | 33 | $0 | 34.7 |
| affective lcsw services | — | 0 | $6 | 19.4 |
| lcsw pllc | 1.0 | 1 | $0 | 18.7 |
| lcsw website | — | 0 | $5 | 18.3 |

### `/professions/nurse-practitioner` (4 queries)

_37 impressions · $6/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| nurse practitioner new york | 59.9 | 21 | $0 | 25.8 |
| new york nurse practitioner license | 58.1 | 10 | $0 | 21.1 |
| pllc nurse practitioner | — | 0 | $6 | 19.3 |
| nurse practitioner professional corporation | 57.5 | 6 | $0 | 18.1 |

### `/nysed-approval-times` (2 queries)

_30 impressions · $18/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| nysed pllc | 10.0 | 23 | $18 | 49.1 |
| nysed pllc application | 9.6 | 7 | $0 | 28.0 |

### `/how-long-to-form-a-pllc-in-ny` (1 queries)

_107 impressions · $82/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| how long does it take to form a pllc in ny | 8.8 | 107 | $82 | 66.2 |

### `/professions/dentist` (1 queries)

_6 impressions · $0/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| pllc dentist | 31.5 | 6 | $0 | 24.1 |

### `/professions/optometrist` (1 queries)

_12 impressions · $0/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| optometrist insurance credentialing | 75.8 | 12 | $0 | 22.2 |

### `/professions/physical-therapist` (1 queries)

_12 impressions · $0/yr paid represented_

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| physical therapy practice name requirements | 53.9 | 12 | $0 | 22.2 |

## Content commissions (`GAP — no page`)

| Query | Pos | Impr | Paid $/yr | Score |
|-------|----:|-----:|----------:|------:|
| ny pllc checklist | 47.6 | 153 | $39 | 62.3 |
| pbc 1 form | 13.5 | 23 | $0 | 41.3 |
| pt registration | 69.1 | 53 | $0 | 31.8 |
| pt establishment | 66.2 | 47 | $0 | 31.0 |
| optometry insurance credentialing | 36.1 | 15 | $0 | 29.6 |
| nys mental health counseling | 40.2 | 15 | $0 | 29.6 |
| ny llcta | — | 0 | $22 | 24.7 |
| new york publication requirement | — | 0 | $14 | 22.8 |
| new york state architecture license | 50.7 | 11 | $0 | 21.7 |
| certificate of incorporation new york | — | 0 | $10 | 21.5 |
| new york licensing services | — | 0 | $7 | 19.9 |
| new york secretary of state business registration | — | 0 | $3 | 16.1 |
| new york state business license | — | 0 | $2 | 15.0 |
| new york business license application | — | 0 | $1 | 13.6 |

## Out of scope — plain LLC (74 queries)

_1,720 impressions · $331/yr paid represented — **deliberately not pursued.**_

Plain-LLC formation is ceded to the sister company (cheapnewyorkllc). `/order-llc` exists to take orders, not to rank, and is never an SEO target. These queries are listed only so they are not re-discovered as an opportunity in a future refresh — they are excluded from every headline number above.

| Query | Pos | Impr | Paid $/yr |
|-------|----:|-----:|----------:|
| professional llc | 48.2 | 83 | $25 |
| professional llc formation services | 9.3 | 279 | $0 |
| best llc formation services in new york 2026 | 12.0 | 88 | $0 |
| llc for nurse practioner | 25.6 | 79 | $0 |
| llc for nurse practictioners | 25.6 | 66 | $0 |
| new york llc formation services | 22.3 | 63 | $0 |
| professional new york llc formation services with ongoing legal support | 14.3 | 50 | $0 |
| professional llc new york | 41.3 | 190 | $0 |
| best anonymous llc formation services in new york | 11.7 | 46 | $0 |
| what form of llc do i need as a mental health professional | 28.2 | 39 | $0 |
| new york llc formation service | 32.0 | 125 | $0 |
| best affordable new york llc formation services 2026 | 17.2 | 30 | $0 |
| best llc formation services new york 2026 | 12.2 | 20 | $0 |
| best llc formation services in 2026 | 12.3 | 12 | $0 |
| best new york llc formation service | 38.0 | 26 | $0 |
| _…and 59 more_ | | | |
