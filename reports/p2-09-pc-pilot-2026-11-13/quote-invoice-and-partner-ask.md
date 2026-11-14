# PC pilot: manual quote, invoice, ownership, partner ask (drafts; nothing sent)

## 1. Process with tools we already have

| Step | Tool | Owner |
|---|---|---|
| Ask comes in (partner email, contact form, inbound) | Gmail mirror in CRM | Sid |
| Qualify against [pilot-scope.md](pilot-scope.md); entity-choice disclosure; 10–15 min call if needed | Email / phone | Sid |
| Send the written quote (template below) | Gmail, ASCII only per house style | Sid |
| On acceptance, create the CRM record with **entityType PC on both the entity and the order**, using the existing manual-order path (orders show `checkoutSlug` `*-manual`; foreign PCs use `foreign-pc-manual`). **Gap:** there is no domestic-PC intake creator (`lib/ops-create-foreign-pllc` covers foreign PLLC only). For ≤5 cases, Sid or a dev creates it by hand or with a small CLI extension, **Sid decides**. Set `serviceCogsCents` = 28000 (standard) or 35500 (MSO-ready) so projections use PC costs, not PLLC publication costs. | CRM | Sid |
| Invoice: **Stripe hosted invoice** via the existing ops payment-link CLI (`crm/scripts/create-ops-payment-link.ts`, keyed to the CRM entity, reuses an open invoice for the same charge). Label e.g. "New York professional corporation formation". **Do not** route through the PLLC Spiffy checkout plus a coupon (that is how Case A ended up recorded as a PLLC order, and how `PC100` undercut the floor). | Stripe | Sid |
| Payment confirmed in Stripe before any filing | Stripe | Sid |
| Run [pc-checklist.md](pc-checklist.md); packet review note before each mailing or filing | CRM notes | Sid (case owner); reviewer as in README decision 4 |

**Case owner:** Sid. **Filing-packet reviewer:** Sid's second pass against the checklist plus doc-check. For the **first** live case, counsel or a second person reviews the proposed Certificate of Incorporation before it goes to NYSED, if Sid wants that (decision 4).

## 2. Quote template, standard PC (draft; ASCII; replace [brackets])

```
Hi [Name],

New York professional corporation (PC) formation: $[985] flat.

Included
- NYSED consent to the certificate of incorporation ($90 state fee)
- Certificate of Incorporation filed with the Department of State ($125), with a certified copy ($10)
- Filing the certified copy with NYSED within 30 days, as the law requires ($20)
- EIN
- First-year registered agent
- Bylaws, organizational consent, stock certificates and stock ledger, prepared for your signature
- A one-page calendar of what the PC must file later (biennial statement with the Department of State, statement to NYSED every three years)

State fees listed above are included. You are not billed them separately.

Not included
- Tax or legal advice on PC vs PLLC. Please confirm the choice with your accountant or attorney.
- Shareholders' agreements, buy-sell terms, or any non-licensed owner (we can introduce you to counsel)
- S Corp election ($195 if you want it)
- Registered agent after year one ($99 per year)

Who can own it: every shareholder, director and officer must hold a New York license in [profession], and the PC can practice only [profession].

Timing: NYSED review is usually the longest step (it has taken about 8 weeks recently). The Department of State filing takes a day or two after that. There is no newspaper publication for a PC.

What we need from you: your license details, home address, the names you would like (ending in "P.C."), and signatures on an affidavit, the SS-4 and the corporate records.

If this works, reply and I will send a secure Stripe invoice. We start as soon as it is paid.

Sid
```

MSO-ready variant: the existing $1,285 block in [domestic-ny-pc.md](../../memory-bank/features/domestic-ny-pc.md), **minus the "organization tax for 200 no-par shares ($10)" line**, which was repealed in 2014–15 (see [official-steps-and-fees.md](official-steps-and-fees.md)). The total stays $1,285.

## 3. Partner ask (3–5 qualified partners; draft only, Sid sends)

Who qualifies: partners already sending health-professional formations, plus the two intermediaries who raised PCs this year (the CFO firm behind the MSO quote and the attorney who asked about a medical PC). From the active B2B list, pick those serving physicians and dentists: credentialing firms, dental and medical CPAs, practice-startup consultants. Sid picks 3–5 names from [warm-referrers-2026-11-09.md](../warm-referrers-2026-11-09.md) and the Wave 1–4 replies. Do not cold-blast.

Subject: Any doctor or dentist who needs a PC rather than a PLLC?

```
Hi [First name],

Quick one. We are taking on a small number of New York professional corporations (PCs) by hand for doctors and dentists, alongside the PLLCs you already send us.

It fits when the client has a reason to want a PC specifically: their accountant or attorney chose it, an existing partnership or practice agreement requires it, or a management-company setup calls for one. Owners must all be licensed in the same profession.

We handle NYSED, the Department of State, the NYSED certified-copy filing, the EIN and the corporate records. Flat $[985] including state fees. Your usual [referral fee / terms] apply.

Do you have anyone like that right now or coming up? If so, reply with a first name and the profession and I will take it from there.

Thanks,
Sid
```

Rules for this ask:
- A "yes, maybe" is not validation. Only a **paid invoice** counts (P2-09 bullet 7, P3-05).
- The partner fee for a PC is **Sid's call** (decision 3). Default proposal: same dollar referral fee as a PLLC ($75); no wholesale PC price during the pilot.
- Log each ask and reply on the partner's CRM record or tracker row.
