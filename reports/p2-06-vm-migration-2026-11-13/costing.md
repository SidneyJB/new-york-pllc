# P2-06 - Migration costing and setup fee

Draft, Nov 13 2026. Agent. All labor minutes are **estimates**: neither the CRM nor the ops docs record touch time for a Certificate of Change, a 1583, or VM setup. P3-04 must measure real minutes on the first three cases.

## Government and third-party costs per migration

| Item | Cost | Source / note |
|---|---:|---|
| NY DOS Certificate of Change filing fee | $30.00 | [NY DOS](https://dos.ny.gov/certificate-change-domestic-limited-liability-companies-0) |
| 24-hour expedite (the CRM DOS worker's default) | $25.00 | Same page. Optional. |
| NYSED entity address letter | $0 | No fee found |
| Payment processing on the setup fee (2.9% + $0.30) | about $4.04 on $129 | Standard card rate; confirm against P1-03 fee study |
| Notary for the 1583 | $0 to us | Customer pays their own notary. Online notary is typically $25-$50 (not verified). |
| Postage | $0 to us | No mail-in filing needed if filed online. Forwarding postage is billed to the customer at cost, monthly (agreement 3.3). |
| **Total outside cost** | **about $59** | $30 + $25 + $4.04 |

This matches Sid's earlier "$30-55 each" for a Certificate of Change (CRM `form-1583-cmra.md`).

## Labor (estimates)

| Step | Minutes (est.) |
|---|---:|
| Fit check and offer email/call | 15 |
| Agreement, 1583 send, chase, check IDs | 15 |
| Certificate of Change prep and queue (CRM-generated) | 10 |
| Check DOS result, save filed copy | 5 |
| NYSED letter: generate, get signature, send | 10 |
| CRM: VM start, RA end, forwarding address | 5 |
| Confirmation emails | 5 |
| **Total** | **about 65 minutes** |

Expect more on the first three cases. Partner-introduced entities with an outside agent may add 10-15 minutes.

## Proposed fee

**Recommendation: $129 one-time setup and change fee, government fees included.**

Math:

- $129.00 fee
- less $30.00 state filing fee
- less $25.00 24-hour expedite
- less about $4.04 card processing
- = **about $70 left for about 65 minutes of work**, or about $65/hour before overhead.

Why $129:

- It is the price we already charge everywhere for a VM address change (decision log, Nov 6 2026; agreement 4.1; CRM `VM_CERTIFICATE_OF_CHANGE_FEE_LABEL`). One number is easier to explain and matches what customers have already been told.
- The migration filing is the same filing, plus a 1583 and a NYSED letter.
- The real profit is the subscription, not the setup fee.

Alternatives for Sid:

| Option | Fee | Left after outside costs | Note |
|---|---:|---:|---|
| A. Same as address change (recommended) | $129 incl. gov fee | ~$70 | Simple and consistent |
| B. Price for the extra 1583 and NYSED work | $149 incl. gov fee | ~$90 | A second price to explain beside $129 |
| C. Pilot incentive | $129, first month free | ~$70 now, $50 later | Only if the first offers do not convert. Do not lead with it. |
| D. Fee plus pass-through | $99 + $55 state fees = $154 | ~$95 | More transparent, but more numbers on one page |

Unusual filings (foreign entity, amendment, reinstatement, biennial statement) are quoted separately.

## Recurring economics per migration

| Item | Per year |
|---|---:|
| VM subscription, $50 x 12 | $600 |
| Less RA subscription the customer no longer pays (VM includes RA) | -$99 |
| **Net added recurring revenue** | **$501** |
| Less card fees on $600 (about 3.5% incl. per-charge fee) | about -$21 |
| Servicing cost | $0 per Sid (Oct 29 2026); P1-05 still wants a measured week |

At the observed 2.4% monthly churn (P1-05, Nov 8), the average life is about 40 months. That is an estimate from a young book.

## Overlap rule

- The RA subscription ends when VM starts, the same day, with a note.
- If the customer prepaid an RA year, Sid decides between a pro-rated credit and no credit (see README decisions). Most RA subs are still in the free first year, so the cost is usually $0.

## Comparison with the existing $129 address change

| | Address change (leaving VM) | Migration (joining VM) |
|---|---|---|
| Filing | Certificate of Change, out of our address | Certificate of Change, into our address |
| 1583 | No | Yes, before filing |
| NYSED letter | Yes (since Oct 26) | Yes |
| RA designation change | Usually no | Only for partner-introduced entities |
| Fee | $129 | $129 proposed |
