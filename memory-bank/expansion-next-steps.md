# Expansion — next steps (Aug 10, 2026)

**As of:** Sep 2, 2026.
**Owner:** Cross-cutting expansion strategy lives here (website memory bank). CRM builds link from [PLLC-CRM/memory-bank/features/](../../PLLC-CRM/memory-bank/features/).

Companion operating plans: [Ads v2](../nypllc-google-ads-operating-plan.md) · [SEO moat](../nypllc-seo-content-moat-plan.md) · [Revenue levers v1](../nypllc-revenue-levers-plan.md) · CAQH v1 · B2B v1 (CRM). **MSO path (offer locked):** [mso-msa.md](features/mso-msa.md) · packet [synthesis](../docs/business-ideas-ny-mso-msa-synthesis.md). License filing + credentialing packet research still in [PLLC-CRM catalog](../../PLLC-CRM/business%20ideas.md).

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
| **5** | **Ads — $105 diagnostic; Gate 2 still no `03`/Bing** | **new-york-pllc** | Portfolio tCPA **$90 → $105** (Sep 2). Judge Sales eligible toward **4.5–5k/wk in 2 weeks**; revert if flat. Gate 2 (~Sep 12) **will fail on volume** — hold `03`, Discovery, Bing. Last structural change **Nov 14**; freeze **Nov 15–Dec 1**. $985 → **February**. |
| **6** | **SEO — 1 piece/week** | **new-york-pllc** | OP deficiencies `#4` and PLLC vs LLC `#5` **built unpublished** (Vercel 404s `/nysed-op-deficiencies`, `/pllc-vs-llc`). **MSO page built unpublished** (Vercel 404s `/ny-mso`). Next editorial: `#6` PLLC vs PC. 20-term tracker: [`seo-rank-tracker.csv`](../seo-rank-tracker.csv) |
| **7** | **Big B2B outreach — paused** | **PLLC-CRM** | Advocate/referral side keeps running until 1–4 are done |
| **8** | **MSO path** | **new-york-pllc** + CRM | Offer locked. **Do not launch public checkout.** Draft at [`web/src/unpublished/ny-mso/`](../web/src/unpublished/ny-mso/). No ads. 📖 [mso-msa.md](features/mso-msa.md) |

---

## Later — September onward

| When | What |
|------|------|
| **September** | Ads **$105 diagnostic** (eligible-volume test); Gate 2 **permission check only** (expect fail); **do not** launch `03` / Discovery / Bing; CAQH real offer **mid-September** (not Oct 15); **restart partner outreach** after CAQH+EXP+affiliates; **$985 deferred to February**; MSO, OP deficiencies `#4`, **and PLLC vs LLC `#5` stay unpublished** until Sid launches |
| **October** | First **renewal charges** land; **compliance-plan** test on Oct–Dec 2025 cohort; ads get **first bid raise** |
| **November** | Last ads changes **by Nov 14**, then **freeze** through Dec 1 (budgets + emergency negatives only) |
| **December** | Load up for **January** |
| **January** | Peak season — whole ballgame; first January with a working machine |
| **After Jan** | Scale what worked; decide on payer enrollment, wholesale partners, maybe **New Jersey** |

---

## Ads freeze scorecard (Sep 2 2026)

January = a **stable frozen** ads machine, not a rebuilt one.

| Date | Rule |
|------|------|
| **Every weekly SOP** | Search terms, self-block, eligible volume, CPA vs freeze $130, Ads↔CRM ±10%. **tCPA is $105** (Sep 2 diagnostic). Watch Sales eligible vs 4.5–5k/wk; revert to $90 if still ~3.3–3.7k after ≥14 days. Do **not** ladder further on SOP day. |
| **~Sep 8** | Attorneys v5 policy. If DISAPPROVED → pause Attorneys ad group, stop copy churn. Auction Insights manual export. EXP silent → default referral + code. CAQH 8 still silent → healthcare backlist $499 + pay link. |
| **~Sep 12 (Gate 2)** | Permission slip only. Expected fail. **Do not** demote Sales, launch `03`, start Discovery, or Bing. $105 diagnostic is independent of this gate. |
| **~Sep 22** | Direct-RA first T-30s (CRM). Not an ads scale date. |
| **Nov 14** | **Last structural ads change.** After this: budgets + emergency negatives only. |
| **Nov 15 – Dec 1** | **FREEZE.** Gate 4 on Dec 1 is a readout, not a rebuild. |
| **Dec 26–28** | Surge budgets + target **only if** freeze held and CPA ≤ freeze band. |
| **Jan 2–31** | Surge protocol. No new campaigns, RSA rewrites, or match-type experiments. |
| **February** | $985 price test window (deferred from Sep). |

Holds until freeze: `03` paused · no Microsoft scale · no MSO ads · no B2B blast.

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
