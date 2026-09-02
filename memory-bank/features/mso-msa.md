# NY MSO path (PLLC + management LLC)

## One-liner

NYPLLC forms a practice **PLLC** and a management **LLC** ($1,770). Independent counsel drafts the MSA ($945, billed by him). Customer is intro’d at **DOS filing**, not from the website.

## Status

**Offer locked Aug 31 2026.** Page draft **unpublished** Sep 1 (`web/src/unpublished/ny-mso/`). **Not a live route.** Vercel rewrites `/ny-mso` and `/pllc-and-mso` to 404. **No ads campaign.** Do not attach to the $90 Purchase portfolio. Do not add sitemap/footer until launch.

CRM ops: [PLLC-CRM mso-msa shard](../../../PLLC-CRM/memory-bank/features/mso-msa.md). Expansion calendar: [expansion-next-steps.md](../expansion-next-steps.md).

**This shard is SoT for the locked offer.** Research packet (snowflake, blank MSA, Harmony/Jordan example): [synthesis](../../docs/business-ideas-ny-mso-msa-synthesis.md). Pencil **$1,500–$1,800** in that packet is superseded by **$1,770**. Jonah’s fee is now **$945**. Do not publish his name on the site.

## Product (locked)

| Piece | Who | Price |
|-------|-----|-------|
| Practice PLLC + management LLC (two formations, publication included each, year-1 RA on both) | NYPLLC | **$1,770** |
| Management services agreement | Independent NY counsel (Jonah Brodsky). **Do not name him on the site or ads.** | **$945**, he bills the customer |
| Customer cash if they do both | — | **$2,715** + optional VM / S Corp / DBA |

- **$0 referral fee.** Intro only. Engagement is customer ↔ counsel.
- **Default PLLC.** PC only if counsel says so for that profession after intro.
- **CheapNewYorkLLC is not in this product.** The management LLC is sold only as part of this licensed-professional pair (or as the already-formed add-on below). Never SEO or ads for generic LLC. `/order-llc` stays order-taking only.
- **Not included in $1,770:** MSA, S Corp ($195/entity), DBA ($199), FMV, medical director, CAQH, HIPAA pack.

### Recurring (pair, not two solos)

- Year-1 RA included on **both** entities (BFS on both Articles).
- Then **$149/year** covering **both** entities (not 2× $99 Direct-RA). Do not mix this cohort into solo Direct-RA $99 / Compliance Plan $249 copy.
- Optional VM **$85/mo** covering **both** entities (one mailbox; not 2× $50).

### Variants

- Greenfield pair → $1,770 Spiffy (invoice if they ask).
- Already have a PLLC, need LLC + MSA → **$885** LLC + **$945** counsel. Same page, different sentence.
- Only need a PLLC after talking → normal **$885** `/order`.
- Counsel declines the MSA → formation still stands; $1,770 is filings, not a guaranteed MSA.
- Jonah-out-of-scope (PE, % of collections, multi-state, etc.) → decline or his custom quote; we can still form entities if they want that piece.

### Profession fence (v1)

**In:** therapy, medicine, ordinary dentistry, NP, PT, vet, chiro, and other $885 professions.  
**Out:** medspa, aesthetics, IV therapy, ketamine, wellness + medical director, dental spa.

**In-scope MSA:** simple two-entity setup (licensed owners on the PLLC; spouse or other unlicensed person on the LLC). Not OA rewrites, investor docs, or extra professions.

## Page + checkout (unpublished until Sid launches)

- Draft slug `/ny-mso` (also block `/pllc-and-mso`). **No main nav, no sitemap, no footer, no sitelinks, no ads.**
- Source: [`web/src/unpublished/ny-mso/`](../../web/src/unpublished/ny-mso/) — **outside** `src/app`, so Next does not serve it. Vercel.json rewrites those URLs to 404 even if someone later copies the folder into `app/`.
- CTA = Spiffy embed URL `https://nypllc.spiffy.co/checkout/ny-pllc-and-management-llc` (Sid still creates the product). Secondary: already-formed PLLC `/order-llc`; PLLC-only `/order`.
- **Print $1,770 and $945 on the page** when live. Do **not** name Jonah. Intro **after DOS filing**.
- Physician page: stripped “MSO-friendly governance” / “we craft MSO agreements” (Sep 1). No public MSO link.
- Not legal advice. Not a CPOM opinion.

Spiffy form should collect: PLLC name + licensed members; LLC name + members; profession; spouse/unlicensed-partner; address; VM $85 checkbox; optional S Corp/DBA **not** in $1,770. Disclose RA $149/yr for both starting year 2; VM $85/mo for both if selected; counsel $945 after DOS.

## Ads (later — not this launch)

Do not bid `msa`, lawyer/attorney terms, templates, PE, or generic LLC. If a campaign ever exists: isolated (`05` or similar), lead conversion **not** Purchase, **not** on `NYPLLC Search Portfolio` tCPA $90, $10–15/day, exact match, NY presence. **Campaign waits.**

## Implementation order (when Sid launches)

1. Sid: Spiffy $1,770 checkout URL (product must exist).
2. Copy `web/src/unpublished/ny-mso/` → `web/src/app/ny-mso/`, remove Vercel 404 rewrites, add sitemap/footer.
3. CRM: first pairs **manual** (see CRM shard). Do not block the page on pair-subscription schema.
