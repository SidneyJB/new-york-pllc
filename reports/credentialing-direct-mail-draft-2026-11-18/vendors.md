# Print-and-mail vendors (checked Nov 18 2026)

All prices below were read from each vendor's own public pages on Nov 18 2026 and include printing and postage, as each vendor states. No account was created and no vendor was contacted. Prices change with USPS rate changes (the last one was Jul 12 2026, and Lob's newer rates took effect Nov 1 2026), so recheck on the day of ordering.

## Summary

| Vendor | Upload / API | Plan needed for ~1,700 pieces | 6x9 postcard, First-Class | 6x9 postcard, Marketing Mail | Letter, First-Class | Letter, Marketing Mail | Fit |
|---|---|---|---|---|---|---|---|
| **Stannp** (US) | Web designer and PDF upload, API on paid plans | Starter, $12/month | **$0.73** (1,000-9,999 items) | not offered for 6x9 (4x6 is Marketing Mail at $0.72) | $1.19 (calculator, 1,500 pieces) | $0.90 (calculator, 1,500 pieces) | Recommended, after two checks below |
| **Lob** | API (HTML or PDF per piece), dashboard upload | Developer, $0/month (up to 6,000 mailings a year) | $1.030 | $0.992 | $1.066 B&W / $1.226 color | $0.834 B&W / $0.994 color | Fallback |
| **PostGrid** | API and dashboard | Starter, $0/month, capped at 500 mailings a month | $1.023 | $0.987 | $1.059 B&W / $1.219 color | $0.827 B&W / $0.987 color | Doesn't fit without a sales call (cap) |
| **Click2Mail** | Web upload and API | not verified | not verified | not verified | not verified | not verified | Not priced: pricing pages blocked or missing on Nov 18 |

## Stannp (recommended)

Sources (checked Nov 18 2026):
- Plan table and per-item volume pricing: https://www.stannp.com/us/detailed-pricing
- Calculator (postage class and delivery windows): https://www.stannp.com/us/pricing

What the pages show:
- Plans: Free $0/mo, Starter $12/mo, Growth $48/mo, Premium $315/mo, all "with no minimum order quantities". API access is listed as a Starter plan benefit. The page also lists "HIPAA certified" under compliance features.
- 4x6 color postcard (the calculator labels it Marketing Mail, 7-14 business days): Free $0.86; Starter $0.80 up to 999 items, $0.72 at 1,000-9,999.
- 6x9 color postcard, "Mailed first class" (calculator: 3-7 business days): Free $1.05; Starter $0.99 up to 999 items, $0.73 at 1,000-9,999.
- 8.5x11 color letter, single side: Free $1.00; Starter $0.94 up to 999, $0.82 at 1,000-9,999 (the table doesn't name the postage class). The calculator, at its default letter settings and 1,500 pieces on Starter, shows $0.90 Marketing Mail and $1.19 First-Class. Letter add-ons: extra one-sided page +$0.08, extra two-sided page +$0.10, non-USPS-matched address +$0.20.
- Third-party pages quote older Stannp US prices that differ from these; use only the live pages above.

Two things to confirm before ordering (by reading Stannp's help docs or terms, or by Sid asking them; I did not contact them):
1. Whether the volume tier is counted per campaign or per month. If it is per campaign and the order has to be split into five state campaigns of under 1,000 each, the 6x9 First-Class price is $0.99, not $0.73.
2. Whether one campaign can merge a different QR code and URL per recipient (variable data). If yes, one campaign of ~1,700 gets the $0.73 tier. If not, see point 1.

Why Stannp: the 6x9 First-Class price is about 30% below Lob's Developer price, which is the difference between the full test (batch 1 plus batch 2) fitting inside the ~$5K mail budget or not. The $12 plan can be cancelled after batch 2.

## Lob (fallback)

Sources (checked Nov 18 2026):
- Plans: https://www.lob.com/pricing/print-mail
- Per-piece rates: https://help.lob.com/print-and-mail/ready-to-get-started/pricing-details (shows "Current rates (effective July 12, 2026)" and "Upcoming rates (take effect 11/01/2026)"; the Nov 1 figures are in effect today and are the ones used here)
- Mail classes: https://help.lob.com/print-and-mail/building-a-mail-strategy/mailing-classes-and-postage

Per piece, rates effective Nov 1 2026:

| Item | Developer ($0/mo) First-Class | Developer Standard (Marketing Mail) | Startup (from $260/mo) First-Class | Startup Standard |
|---|---:|---:|---:|---:|
| Postcard 4x6 | $0.909 | not offered | $0.649 | not offered |
| Postcard 6x9 | $1.030 | $0.992 | $0.710 | $0.672 |
| Postcard 6x11 | $1.294 | $1.052 | $0.954 | $0.722 |
| Letter B&W | $1.066 | $0.834 | $0.896 | $0.664 |
| Letter color | $1.226 | $0.994 | $0.936 | $0.714 |
| Extra page B&W / color | $0.101 / $0.201 | | $0.091 / $0.191 | |

Notes: the Developer plan allows up to 6,000 mailings a year. Lob's help docs say Standard Class needs at least 200 pieces (or 50 lb) and has no delivery-time guarantee (7-21 business days for postcards). Lob is the best-documented API of the four and the safest choice if Stannp's two checks fail.

## PostGrid

Source (checked Nov 18 2026): https://www.postgrid.com/pricing-print-mail/

- Starter $0/month, "up to 500 mailings/month"; overage pricing requires contacting support. Enterprise is custom.
- Starter per piece: 6x9 postcard $1.023 First-Class / $0.987 Standard; 6x11 $1.289 / $1.045; 4x6 $0.902 First-Class only. Letters: B&W $1.059 First-Class / $0.827 Standard; color $1.219 / $0.987. Standard is marked "marketing only", 10-15 business days.
- The page also shows a second, higher price set (for example $2.12 for a First-Class letter) without saying which country it applies to; I read it as the Canadian list and did not use it.

Why not: ~1,700 pieces in one month is over the 500-a-month Starter cap, so it needs a sales conversation, which is out of scope.

## Click2Mail

Not priced. On Nov 18 2026, https://www.click2mail.com/pricing returned HTTP 403 to a fetch and https://click2mail.com/pricing returned 404 in a browser; a product page (https://click2mail.com/postcard-4-x-6-shipped) also returned 404. Its blog quotes postage figures but no current per-piece price for print plus postage, so I left it out rather than estimate.

## Batch 1 cost estimate

Assumes ~1,700 pieces: one touch to the 90-day list of new behavioral-health organization NPIs in NY, NJ, FL, TX and MD. This count is an estimate (path plan: ~6,900 a year across the five states); the real count comes from the NPI pull.

| Option | Per piece | Batch 1 (~1,700) | Full test: batch 1 + batch 2 (~1,700 new + ~1,700 repeat) |
|---|---:|---:|---:|
| **Stannp Starter, 6x9 postcard, First-Class (recommended)** | $0.73 | **~$1,241 + $12 plan = ~$1,253** | ~$3,723 + $24 = **~$3,747** |
| Stannp Starter, 6x9, if split into 5 campaigns under 1,000 each | $0.99 | ~$1,695 | ~$5,060 |
| Lob Developer, 6x9 postcard, First-Class | $1.030 | ~$1,751 | ~$5,253 |
| Lob Startup, 6x9 postcard, First-Class | $0.710 + $260/mo | ~$1,467 | ~$4,141 (2 months) |
| Stannp Starter, letter, First-Class | $1.19 | ~$2,023 | ~$6,069 |
| Lob Developer, color letter, First-Class | $1.226 | ~$2,084 | ~$6,253 |

All figures are estimates: piece count × the published price, plus the plan fee. Not included: address-correction add-ons (Stannp +$0.20 for non-USPS-matched addresses, if the list has any) and any design help. With the recommended option, batch 1 uses about half of what was set aside for it (~$2,500), and the full test fits inside ~$5K with room for a third touch or a letter test in January.

Cost per paid client, for scale only: at the path plan's median of 0.3% of practices becoming a paid setup over 2-3 touches [estimate], two touches at $0.73 come to about $1.46 per practice, or roughly $490 per paid client. At 0.1% it is about $1,460, above the $1,200 scale threshold. These are model numbers, not results.

## Recommendation

Stannp Starter, 6x9 postcard, First-Class, one campaign with per-recipient variable data, after confirming the two points in the Stannp section. If either fails, use Lob Developer at the same format (~$1,751 for batch 1); the full test then runs slightly over $5K, so batch 2's repeat touch would need trimming to non-responders in the larger states.

## Nov 18 confirmation

Checked Nov 18 2026 from Stannp's public US pages, US help center and API docs only. No account, sign-up, form or contact with Stannp. Planning count for batch 1 here is ~1,500 pieces (README); the ~1,700 figure above is the earlier NPI estimate.

**Recommendation: Stannp confirmed.** Send each batch as one campaign of 1,000+ pieces with a per-recipient QR variable; Lob not needed.

### Point 1: how the volume tier is counted, and the 6x9 price

- Live US table, "6x9 Color postcard, Mailed first class" (https://www.stannp.com/us/detailed-pricing, Postcards tab, format picker): Free $1.05 at every volume; Starter $0.99 up to 999, **$0.73 at 1,000-9,999**, $0.73 above; Growth and Premium the same $0.99 / $0.73 up to 9,999, then $0.69 at 10,000+ (Premium $0.66 at 50,000+). For ~1,500 pieces Growth and Premium give no saving over Starter.
- First-Class is not extra. 6x9 is offered only as "Mailed first class" (the picker lists no Marketing Mail 6x9), and the page says "Our item prices include production, printing, postage, and mailing."
- No minimum, no setup fee. Same page: "no minimum order quantities"; help article https://knowledge.stannp.com/us/what-is-the-minimum-and-maximum-send-volume-how-much-will-it-cost says "There are no minimum or maximum send limits" and "no hidden fees". The only per-piece add-on that could apply is +$0.20 for an address that doesn't match USPS data (https://knowledge.stannp.com/us/address-verification).
- Per campaign or per month: **the US pages don't say.** They describe tiers only as "based on the volume of items you send" with brackets of up to 1,000, 1,000-9,999, and so on. A web search snippet of Stannp's UK pricing page (https://www.stannp.com/uk/pricing) reads "Volume pricing applies to individual campaigns, volume discount cannot be applied across multiple campaigns"; my direct fetch of that page today did not show the sentence, so treat it as likely, not confirmed. Nothing anywhere suggests per-month counting.
- Why it doesn't block the plan: point 2 below means each batch can be one campaign. One campaign of ~1,500 reaches the 1,000-9,999 tier under either rule, so **$0.73 applies**. The rule only matters if a batch (for example a trimmed batch 2 of non-responders) falls under 1,000 pieces in one campaign; then expect $0.99.

### Point 2: a different QR code / URL per recipient in one campaign

Confirmed, in the web designer and the API, with no plan restriction stated:
- https://knowledge.stannp.com/us/adding-qr-codes: add a column of per-recipient links to the CSV, map it as a custom variable on upload, add a Stannp QR code to the design and put the variable in its destination field in curly brackets (example `{dynamic-qr-code}`; names are lowercase; links must start with https). Scan reporting shows "which individual recipients have engaged."
- https://knowledge.stannp.com/us/how-can-i-add-dynamic-variable-content-to-mail: text variables via "Insert Variable" in a Stannp text block (so {Organization name} and {State} work); variables placed inside an uploaded PDF do not merge, so build the card in the Stannp designer or add Stannp text blocks over the PDF.
- https://stannp.com/us/direct-mail-api/tools: QR endpoint takes template variables such as `{{url}}` in `data`, replaced per recipient at mail merge.

### Other checks

- Where printed: Stannp's pages describe a US "print network" of fulfillment partners and name no plant or city. Calculator (https://www.stannp.com/us/pricing, read earlier today) gives 3-7 business days for First-Class; Stannp says it prints and mails the next business day. No state-by-state transit figure is published, so NY, NJ, FL, TX and MD all fall under that 3-7 day window as far as public pages go. Early December drop should land before mid-December.
- Address quality: all mail is run through CASS on import and NCOALink at mailing time for US addresses; NCOA updates are not shown in the dashboard (USPS privacy rules); unmatched addresses cost +$0.20 each and are shown at checkout (https://knowledge.stannp.com/us/address-verification).
- Proof and approval: "Live preview: See and approve the design before you send" (detailed-pricing page). API (https://www.stannp.com/us/direct-mail-api/campaigns) can produce a PDF sample of the campaign; approving locks design and recipient list and makes the sender responsible for errors; booking takes a send date and charges the account balance; unbooked campaigns can be deleted.
- Not found publicly: where USPS returns (undeliverable First-Class) go and whether Stannp reports them. Ask before batch 2 if returns are needed for list cleaning.

### Batch 1 cost (updated)

| Item | Amount |
|---|---:|
| ~1,500 × $0.73 (Starter, Tier 2, 6x9 First-Class) | $1,095 |
| Starter plan, 1 month | $12 |
| **Batch 1 total** | **~$1,107** |
| If ~10% of addresses fail USPS matching: 150 × $0.20 | +$30 |

Batch 2 at ~1,500 in one campaign costs the same (~$1,107 with the plan month). If batch 2 is trimmed below 1,000 pieces, budget $0.99 a piece unless Stannp confirms otherwise.

### Optional question for Stannp (draft, not sent; only needed if batch 2 may drop under 1,000)

> On the US Starter plan, is the 1,000-9,999 price tier counted per campaign or across all items sent in a month?
> If we send 1,500 6x9 First-Class postcards in December and 800 in January as separate campaigns, which tier does the January campaign get?
> Where do undeliverable First-Class returns go, and do you report them per recipient?
