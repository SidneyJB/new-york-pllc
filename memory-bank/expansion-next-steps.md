# Expansion — next steps (Aug 10, 2026)

**As of:** Sep 4, 2026.
**Owner:** Cross-cutting expansion strategy lives here (website memory bank). CRM builds link from [PLLC-CRM/memory-bank/features/](../../PLLC-CRM/memory-bank/features/).

Companion operating plans: [Ads v2](../nypllc-google-ads-operating-plan.md) · [SEO moat](../nypllc-seo-content-moat-plan.md) · [Revenue levers v1](../nypllc-revenue-levers-plan.md) · CAQH v1 · B2B v1 (CRM). **MSO path (offer locked):** [mso-msa.md](features/mso-msa.md) · packet [synthesis](../docs/business-ideas-ny-mso-msa-synthesis.md). License filing + credentialing packet research still in [PLLC-CRM catalog](../../PLLC-CRM/business%20ideas.md).

---

## ~$1M net (2028-type year) — mix vs current rate

Target stack (owner): formations **~$670K** (≈1,600 × ~$500 − ~$140K ads) + recurring **~$270K** (VM ~$165K + RA ~$105K) + services **~$100K** (CAQH ~$55K + other ~$45K).

| Engine | Plan | Sep 3 read |
|--------|------|------------|
| Google/Bing | 600–700/yr (~50–60/mo) | **Stretch, not base.** May ~29 paid/mo at $110; last 30d **~15–16**; Sales eligible stuck **~3.3–3.7k/wk** at $90. **Nov 1** decides if 50–60/mo is alive. |
| Organic/AI/referral | 450–550 | **~400/yr if ~50 orders/mo and ~2/3 non-paid hold.** SEO doc was 200–350 organic in 2028; money pages still pos 20–45. Untagged ≠ organic. ChatGPT is the surprise. |
| B2B | 300–350 | **Biggest hole.** Professional outreach paused. Partner/wholesale contribution often **<$500**. |
| VM / RA | $165K / $105K | Plausible **if** attach ~28% and **65% RA collection** (untested until Oct). Smaller formation book → less stock, not zero. |
| CAQH / shelf | $55K / $45K | Math fine; **$0 until shipped/sold.** |

**Frozen current rate (~50 formations/mo, B2B off, CAQH not selling):** ~**$400–550K** in a 2028-type year, not $1M. **$1M needs B2B (or paid/SEO beating the mix)** plus RA/CAQH/VM actually landing. Likelihood at today’s pace: **low-teens** without those engines; **~1 in 4** if RA+CAQH+VM work and mix holds; **this calendar year: no.**

January is a **freeze/surge hedge** (n=1 Ads peak; May CRM orders **57 > Jan 51**). Do not bank 50–60 paid/mo on “January will finish it” until Nov 1.

---

## What we've done (5 weeks in)

- **Ads rebuilt** — new campaigns, better tracking, proper structure. Bad negative-keyword spec broke delivery for most of July; **fixed Aug 4**.
- **SEO foundation** — analytics live; three data pages including the approval-time tracker.
- **B2B advocate side working** — ~60 referral links out, 2 new orders, partners paid.
- **Business held** — **47–49 orders/mo** even with ads down; virtual mail grew.
- **ChatGPT** — 5 orders; brand-new channel showing up on its own.
- **CAQH customer intake** — document-first wizard shipped in PLLC-CRM (Aug 16).
- **CAQH interest checkbox (Spiffy)** — **live Aug 26 2026** on formation order form (interest only, no charge). CRM persists `Order.caqhInterest` from webhook; staff **CAQH Interest** badge on PLLC list + header.
- **CAQH pilot outreach** — Sent Aug 25–26; Aaron **declined**; **follow-up sent Sep 1** to 8 awaiting. 📖 [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
- **Direct-RA / Lever 1 live (Aug 25 2026)** — `DIRECT_RA_NOTICES_LIVE=true` on CRM Production. T-30/T-7/receipt cron active; Compliance Plan $249 verified. Build shipped Aug 12. 📖 [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md)

## What didn't happen

Anything that **takes money** (build + launch) — still open:

- **CAQH** — awaiting pilot replies → **$499** Stripe invoice on interest → first paid delivery. **Interest checkbox live Aug 26** (Spiffy, no charge; CRM badge). **Paid Spiffy SKU** after 2–3 pilots.
- **CAQH segmented email** — second wave to LCSW cohort after pilots.
- **Professional B2B** outreach = 5 emails only.
- **Affiliate links** — Mercury + Gusto applied Aug 14; links not live. (Expedite SKU removed Aug 17 — already in $885.)

---

## Near future — next 4 weeks (priority order)

| # | Item | Repo / owner | Notes |
|---|------|--------------|-------|
| **1** | **CAQH — close pilots + paid Spiffy SKU** | **PLLC-CRM** (+ site checkout when SKU ships) | **Interest checkbox live Aug 26**. Aaron declined. **Follow-up sent Sep 1** (8 awaiting). Invoice on interest → intake → fulfill. **$499 paid SKU** after 2–3 pilots. 📖 [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) |
| **2** | **Direct-RA ops** | **PLLC-CRM** | **Live Aug 25.** Checkout disclosure **audited**; staff **$99 CoC** + **$249 Compliance Plan** support paths **confirmed**. First T-30s ~Sep 22; October auto-charges. 📖 [direct-ra-launch-status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) |
| **3** | **EXP Credentialing** | **PLLC-CRM** ops email | **Sep 1 close-out sent.** If silent **~Sep 8**, default **referral** (`scripts/provision-exp-referral-partner.ts --confirm`) and send `?c=` code. |
| **4** | **Two affiliate links** (banking + payroll) | **Site** lifecycle email + backlist / S Corp page | **Mercury + Gusto Impact applied Aug 14**; **third ping Sep 1**. Links not live. 📖 [affiliate-partners.md](../docs/affiliate-partners.md) |
| **5** | **Ads — Sep 3 calendar** | **new-york-pllc** | **Sep 15:** $105 eligible ~3.5k → 4.5–5k (May pattern = paid capped). **Sep 15–22: enable `03` + Bing** (small ≠ broken). **Oct 1:** mCPA <$160 → tCPA **~$120**. Oct: mobile + pub-cost calculator on LPs. **Nov 1 verdict:** 30–40 vs 20–25 paid. Freeze Dec–Jan. Still **no** Discovery demotion. $985 → **February**. |
| **6** | **SEO — 1 piece/week** | **new-york-pllc** | OP deficiencies `#4` and PLLC vs LLC `#5` **live Sep 4** (`/nysed-op-deficiencies`, `/pllc-vs-llc`; sitemap + footer). **MSO page built unpublished** (Vercel 404s `/ny-mso`). Next editorial: `#6` PLLC vs PC. 20-term tracker: [`seo-rank-tracker.csv`](../seo-rank-tracker.csv) |
| **7** | **Big B2B outreach — paused** | **PLLC-CRM** | Advocate/referral side keeps running until 1–4 are done |
| **8** | **MSO path** | **new-york-pllc** + CRM | Offer locked. **Do not launch public checkout.** Draft at [`web/src/unpublished/ny-mso/`](../web/src/unpublished/ny-mso/). No ads. 📖 [mso-msa.md](features/mso-msa.md) |

---

## Later — September onward

| When | What |
|------|------|
| **September** | Ads **Sep 15** eligible readout; **`03` + Bing Sep 15–22**; CAQH real offer **mid-September**; **restart partner outreach** after CAQH+EXP+affiliates; **$985 → February**; OP deficiencies `#4` and PLLC vs LLC `#5` **launched Sep 4**; **MSO stays unpublished** until Sid launches |
| **October** | First **renewal charges**; compliance-plan test; **Oct 1** tCPA ~$120 if mCPA <$160; mobile + LP calculator |
| **Nov 1** | Paid-volume **verdict** (30–40 vs 20–25) |
| **November** | Last ads changes **by Nov 14** (unless already capped), then **freeze** through Dec 1 |
| **December** | Preload budgets |
| **January** | Run at full force (hedge, not proven 4×) |
| **After Jan** | Scale what worked; decide on payer enrollment, wholesale partners, maybe **New Jersey** |

---

## Ads freeze scorecard (Sep 3 2026)

January = **frozen machine at full force**, not a rebuild. **Nov 1** is the paid-ceiling verdict.

| Date | Rule |
|------|------|
| **Every weekly SOP** | Search terms, self-block, **Sales eligible**, mCPA vs $160, Ads↔CRM ±10%. tCPA **$105** until Oct 1. |
| **Sep 15** | Eligible **~3,500 → 4,500–5,000**? Spend-up/auctions-flat = **May pattern → paid capped**. |
| **Sep 15–22** | **Enable `03` + Bing clone.** No Sales→Discovery. Attorneys AG stays paused. |
| **~Sep 22** | Direct-RA first T-30s (CRM). |
| **Oct 1** | Extra-Sep mCPA **<$160** → tCPA **~$120**; else don't. |
| **Oct** | Mobile CVR + publication-cost calculator on LPs (not List E / not county shop). |
| **Nov 1** | Oct **30–40** paid → 50–60/mo path alive. Oct **20–25** → **50–60/mo does not exist at prices worth paying.** |
| **Nov 14** | Last structural ads change (unless Nov 1 already stopped). |
| **Nov 15 – Dec 1** | **FREEZE.** |
| **Dec–Jan** | Preload; January at full force. |
| **February** | $985 price test. |

Still hold: Discovery demotion · MSO ads · B2B blast. **`03` and Bing are no longer held.**

---

## Other product-line research

NY-specialist wedges still in research (not the MSO package). Catalog: [PLLC-CRM business ideas](../../PLLC-CRM/business%20ideas.md).

| Track | Status | Docs |
|-------|--------|------|
| NYSED personal license filing | Research complete Aug 7 2026; not built | [PLLC-CRM synthesis](../../PLLC-CRM/business-ideas-nysed-personal-license-filing-synthesis.md) |
| NY credentialing packet | Research synthesis done; CAQH **pilot** is a separate live SKU | [PLLC-CRM synthesis](../../PLLC-CRM/business-ideas-ny-credentialing-packet-synthesis.md) |

---

## Session rule

When Sid asks **what's next on expansion**, read this file first, then the matching `features/*.md` shard for the lever being worked.
