# Credentialing national test: paid search campaign draft

**Written:** Nov 18 2026, for Sid. **Draft only.** Nothing was built, uploaded or changed in any Google Ads account (no API calls, no Editor posts). Checklist item: "Agent: draft the search campaign" in [credentialing-national-test-checklist.md](../../credentialing-national-test-checklist.md). It stays unchecked until Sid approves the campaign and the daily budget.

**Tags:** **[M]** measured (our CRM, our Ads data, the live site, a primary source) · **[S]** secondary (third-party keyword tool, vendor or trade page) · **[E]** our estimate from measured inputs · **[A]** assumption · **[U]** unverified.

**Files in this folder**

| File | What it is |
|---|---|
| [keywords.csv](keywords.csv) | 600 rows: Campaign, Ad group, Keyword, Match type (Exact / Phrase). 120 per state. |
| [ads.csv](ads.csv) | 50 RSAs (2 per ad group: A with the price headline pinned to position 1, B unpinned). |
| [negatives.csv](negatives.csv) | Shared negative list (phrase, 105 terms) plus per-campaign other-state negatives (full state names only). |
| [campaigns.csv](campaigns.csv) / [ad-groups.csv](ad-groups.csv) | Campaign settings (phase 1 daily budget, Manual CPC, presence, Final URL suffix) and starting max CPCs. All Paused. |
| [keyword-planner-seed.txt](keyword-planner-seed.txt) | The 127 unique keyword texts to paste into Keyword Planner (section 9). |
| [build_cred_search.py](build_cred_search.py) | Generator. Re-run after copy edits: it checks headline ≤30 / description ≤90 / path ≤15, blocks `→` and em dashes, and fails if any negative would block one of our own keywords (the Aug 4 2026 stop-word lesson). |

---

## 1. Account: open a new, separate Google Ads account

**Recommendation: a new Google Ads account for the credentialing brand, not new campaigns in the nypllc account.**

Why:
- **Separate business.** The standalone credentialing business is meant to have its own site, ads and LLC ([decision log Nov 16](../../decision-log.md); `credentialing-site/README.md`). Its spend, conversions and later its sale or hand-off stay clean if the account is its own from day one.
- **The nypllc account is frozen Nov 15–Dec 1** for structural changes, and the Dec 1 post-freeze memo plus the one-variable / 14-day rule follow it ([operating plan §3.4–3.5, Part 10](../../nypllc-google-ads-operating-plan.md); decision log Oct 29). Five new campaigns in that account in the first two weeks of December would land on top of the formation read.
- **Conversion goals don't mix.** In the nypllc account, Purchase (`7678072764`) is the only primary website goal and the portfolio runs on Target CPA $105 [M, Ads shard]. Credentialing inquiries would either distort that goal set or need campaign-level goal overrides on every campaign.
- **No overlap today.** The nypllc account doesn't bid on credentialing terms. In its Jul 9–Oct 18 search terms the only credentialing query is `pllc credential` (1 impression) [M, `ads-pull-2026-10-18-weekly-sop/since-jul9/`]. Two separate businesses with separate sites showing on different queries is within Google's one-ad-per-auction rule; after Dec 1 we can add `insurance credentialing` as an exact negative in nypllc's broad Sales campaign to keep the auctions separate (Sid's call; it's a structural change in that account).

How:
- Create it under the same manager account the API tooling already logs in through (`GOOGLE_ADS_LOGIN_CUSTOMER_ID` in `new-york-pllc/.env`, if that ID is a manager account [U]), so the existing read-only pull scripts can report on it. Account time zone America/New_York, currency USD. Neither can be changed later.
- **Payments profile and advertiser verification:** Google shows the verified payer's legal name in the Ads Transparency Center. If the new account bills to the NYPLLC entity, that name appears on the credentialing ads. Use the new LLC's payments profile once it exists; until then Sid decides between his personal profile and waiting. Start verification early: it can take several business days [A].
- Turn off at creation: auto-apply recommendations, Search Partners, Display Expansion, broad match / AI Max, **automatically created assets** (Google writes its own headlines, which could add claims we can't back up). Auto-tagging on.
- **Downside:** a brand-new account with no spend gets ranged volumes in Keyword Planner ("100–1K"). Run the Keyword Planner pulls in the nypllc account (read-only; section 9).

## 2. Structure

One Search campaign per test state, five ad groups each. Same keyword families in every state; the generic terms are geo-limited by the campaign's location targeting, and each state also carries state-name and state-license variants.

| Campaign | Location (presence) | Final URL | Therapist license titles used |
|---|---|---|---|
| `CRED-Search-NY` | New York | `/new-york` | LCSW, LMHC, LMFT |
| `CRED-Search-NJ` | New Jersey | `/new-jersey` | LCSW, LPC, LMFT |
| `CRED-Search-FL` | Florida | `/florida` | LCSW, LMHC, LMFT |
| `CRED-Search-TX` | Texas | `/texas` | LCSW, LPC, LMFT |
| `CRED-Search-MD` | Maryland | `/maryland` | LCSW-C, LCPC, LCMFT |

Ad groups (per state, named `NY - Credentialing Services` etc.):

| Ad group | Query family | Starting max CPC [A] | Pinned H1 (RSA A) |
|---|---|---:|---|
| Credentialing Services | insurance / provider credentialing services, credentialing company, near me, state-name variants | $30 | Get In Network for $1,795 |
| Therapists | insurance credentialing for therapists, mental health / behavioral health credentialing, `{license} credentialing` | $28 | Get In Network for $1,795 |
| Prescribers | PMHNP / psychiatric NP / psychiatrist credentialing | $30 | Prescriber Package: $2,995 |
| Get In Network | get on insurance panels, insurance paneling services, credentialing with insurance companies | $22 | Get In Network for $1,795 |
| Medicaid | `{state Medicaid program} credentialing`, medicaid credentialing services | $22 | NY: NY Medicaid Add-On: $495; others: Medicaid Add-On Available |

**NY note:** the checklist's site note says NY stays on nypllc.com's credentialing page until the separate brand launches. This draft points NY at the credentialing site's `/new-york` so all five states run on the same page template and the test compares like with like. If the brand isn't live by launch, NY can point at `https://www.nypllc.com/ny-pllc-insurance-credentialing` instead; that changes the NY read (different page, different brand) and should be noted in the results.

## 3. Keywords (exact + phrase)

Full list in [keywords.csv](keywords.csv). Every keyword is Exact + Phrase except a few head or research terms that pull mostly the wrong intent at phrase match; those are Exact only: `provider credentialing` (1,600/mo nationally, $26.53 CPC [S, seodata.dev]; heavy with job and hospital searches), `credentialing services near me`, `caqh credentialing services`, `medical credentialing services`, `how to get credentialed as a therapist`, `how to get on insurance panels`.

Generic families (geo-limited by the campaign):
- **Credentialing Services:** insurance credentialing; insurance credentialing services; credentialing services; provider credentialing services; credentialing services for providers; credentialing company / companies; insurance credentialing company; private practice credentialing; help with insurance credentialing.
- **Therapists:** insurance credentialing for therapists ($46.66 CPC [S]); therapist credentialing (590/mo [S]); therapist credentialing services; credentialing for therapists; mental health credentialing (+ services); behavioral health credentialing; insurance credentialing for counselors / social workers; counselor credentialing; `{license} credentialing` and `{license} insurance credentialing` for the state's three titles.
- **Prescribers:** psychiatric nurse practitioner credentialing; pmhnp credentialing; pmhnp insurance credentialing; psych np credentialing; nurse practitioner credentialing services; nurse practitioner insurance credentialing; psychiatrist credentialing services; psychiatrist insurance credentialing.
- **Get In Network:** get on / getting on insurance panels; insurance paneling services; get paneled with insurance companies; credentialing with insurance companies; get in network with insurance companies; join insurance panels.
- **Medicaid:** medicaid credentialing services; medicaid credentialing for therapists; plus per state: NY `ny medicaid credentialing`, `new york medicaid credentialing`; NJ `nj familycare credentialing`, `nj medicaid credentialing`, `new jersey medicaid credentialing`; FL/TX/MD `{state} medicaid credentialing`, `{xx} medicaid credentialing`, `{state} medicaid provider enrollment services` (NY too).

State variants in every campaign: `insurance credentialing {state}`, `{state} insurance credentialing`, `credentialing services {state}`, `{xx} credentialing services`, `provider credentialing {state}`, `credentialing companies in {state}`, `therapist credentialing {state}`, `mental health credentialing {state}`, `pmhnp credentialing {state}`, `nurse practitioner credentialing {state}`, `get on insurance panels {state}`.

Left out on purpose: bare `caqh` / `caqh credentialing` (6,600/mo [S], mostly people logging in; our CAQH pilot found "I already have CAQH" was the top reason for passing [M, path report §11]); NPI terms (people want the free NPPES form, and NPI copy invites the government-documents policy, see section 5); "move my contracts" phrasing (too little volume to tell from Keyword Planner yet; add after section 9).

**Policy gotcha [M, Ads shard]:** keywords with `lcsw`, `mental health`, psychiatric NP etc. hit Google's health-terms policy check; in the nypllc account they were created with `exempt_policy_violation_keys`. In Editor, request the exemption when it flags them.

## 4. Negatives

[negatives.csv](negatives.csv), two parts:

1. **Shared list `CRED Neg - Wrong intent`** (phrase match, attach to all five campaigns), 105 terms:
   - Jobs and careers: jobs, job, hiring, career(s), salary/salaries, remote, work from home, resume, interview, internship, indeed, glassdoor, ziprecruiter, linkedin, credentialing specialist / coordinator / analyst / manager / assistant / representative / jobs.
   - Courses and certification: course(s), class(es), training, certification, certified, certificate, exam, cpcs, cpmsm, namss, school, degree, university, college.
   - Freebies and DIY: free, template, sample, pdf, definition, meaning, what is, wikipedia.
   - CAQH and NPI lookups: caqh login, caqh log in, caqh proview login, proview login, caqh customer service, caqh phone number, caqh contact, caqh number, caqh id, caqh help desk, password, npi lookup, npi number, npi registry, npi search, lookup, look up.
   - Verification and hospital work: license lookup, license verification, verify license, primary source verification, medical staff, hospital credentialing, hospital privileges, privileging, privileges, vendor credentialing, vendormate, reptrax, symplr, software.
   - Nursing jobs and other fields: nurse credentialing, nursing credentialing, travel nurse, registered nurse, nursing jobs, teacher, teaching, teaching credential, substitute, pharmacy, pharmacist, dental, dentist, optometry, optometrist (our own Search Console shows optometry credentialing queries [M, `gsc/Queries_2025-10-27_to_2026-08-02.csv`]), chiropractor, chiropractic, coding, medical billing and coding, medical assistant, background check, real estate, insurance agent, agent, producer license, nipr, veterans affairs.
2. **Per campaign:** the other 49 state names as campaign negative phrase, full names only. **No two-letter abbreviations, ever** (`in`, `or`, `me` blocked our own keywords in the nypllc account on Aug 4 2026 [M, Ads shard]). The generator fails if any negative appears inside one of our keywords.

Not negatived on purpose: `headway`, `alma` (the site has a section for clinicians weighing those platforms), `billing` (credentialing-and-billing shoppers are buyers), `cvo` (Texas Medicaid credentialing runs through a statewide CVO), `cost`, `price`, `how to`, `reddit`.

## 5. Ads (RSAs)

[ads.csv](ads.csv): 2 RSAs per ad group, 50 total. A pins the price headline to position 1 (the pinned-price variant beat unpinned on nypllc Formation-Core [M, operating plan §4.1]); B is unpinned with a state-guide description and an independence line. 12–14 headlines each, 4 descriptions, path `credentialing/{state-slug}`. All headlines ≤30, descriptions ≤90 (checked by the generator). Title Case to match the nypllc account; no em dashes, no `→`.

Sample (NY, Credentialing Services):
- Headlines: Get In Network for $1,795 · Insurance Credentialing NY · New York Credentialing Help · Credentialing for Practices · Covers 3 Commercial Insurers · Flat, Published Prices · Credit or Refund If Declined · You Sign, We Do the Paperwork · About 45 Minutes of Your Time · Foundation Package: $399 · We Follow Up Every 2 Weeks · No Hourly Fees or % of Claims · Contracts in Your Own Name · Medicaid and Medicare Add-Ons
- Descriptions: "Flat published prices. Get in network with 3 commercial insurers for $1,795." · "If an insurer turns you down, you get its share back or moved to another insurer." · "We prepare your NPI, CAQH and insurer applications. You sign and attest, about 45 min." · "Insurers decide who they accept and when. We never promise an approval or a start date."

Where each claim comes from:

| Claim | Source | Status |
|---|---|---|
| $1,795 for 3 commercial insurers; $399 Foundation; $2,995 prescriber (4 insurers + Medicaid + Medicare) | Live nypllc.com credentialing page [M, `web/src/app/ny-pllc-insurance-credentialing/page.tsx`]; `credentialing-site/src/lib/pricing.ts` | Published |
| $495 Medicaid add-on | NY price; the site README says confirm per state before launch | **NY ads only.** Other states say "Medicaid Add-On Available" and "We quote Medicaid after we check your state's plans." |
| Credit or refund if an insurer turns the client down (headline "Credit or Refund If Declined"; description "If an insurer turns you down, you get its share back or moved to another insurer.") | [Terms draft](../credentialing-service-terms-draft-2026-11-16.md) "If an insurer declines after you've paid"; ops-manual ground rule 10 (Nov 14); offer line approved by Sid Nov 18 | Matches the terms (package billed up front; credit to another open insurer or refund of that insurer's share within 5 business days). Replaces the retired "Panel Check Before We Bill" headline and "we confirm in writing" description, which no longer match how we bill. Client-caused declines get a free resubmission, not a credit or refund; that limit lives in the terms. |
| Insurers decide who they accept and when; no promised approval or start date | Terms draft "Insurers decide" | Matches |
| About 45 minutes; you sign and attest; follow-up every 2 weeks; no hourly fees or % of claims | Site home page and terms draft | Pending terms approval |
| Contracts in your own name | Site's Headway/Alma section | On site |

Nothing says or implies an insurer will accept the client. The "Insurers decide who they accept" line says the opposite outright. No review stars, client counts or "trusted by" claims (the brand has none yet; AI-TELLS.md bans invented trust signals).

**Policy risk: government documents and official services.** nypllc's Attorneys ads were disapproved five times under this policy [M, Ads shard]. NPI and Medicaid enrollment are free from the government, so expect `APPROVED_LIMITED` or a review on the Medicaid ad group. The B variant carries "Independent firm. Not affiliated with any insurer, Medicaid program or agency." If the Medicaid ad group is disapproved, pause it rather than churning copy.

**Assets (add in the new account):** sitelinks Pricing (`/pricing`), Terms (`/terms`), Start an intake (`/contact`), the state guide; callouts "Flat Published Prices", "No Hourly Fees", "Independent Firm"; structured snippet Services: Get in network, Move my contracts, Foundation, Medicaid, Medicare; call asset once the phone number exists. Account-level "automatically created assets" off.

## 6. Final URLs and UTMs

Final URL = the state page, no parameters (`https://BRAND-DOMAIN.com/new-york` etc.; `BRAND-DOMAIN` is a placeholder until Sid picks the brand). UTMs go in the campaign-level **Final URL suffix**, because ValueTrack parameters aren't allowed in the final URL itself:

| State | Resulting landing URL |
|---|---|
| NY | `https://BRAND-DOMAIN.com/new-york?utm_source=google&utm_medium=cpc&utm_campaign=cred-search-ny&utm_content={adgroupid}&utm_term={keyword}&matchtype={matchtype}` |
| NJ | `…/new-jersey?utm_source=google&utm_medium=cpc&utm_campaign=cred-search-nj&…` |
| FL | `…/florida?utm_source=google&utm_medium=cpc&utm_campaign=cred-search-fl&…` |
| TX | `…/texas?utm_source=google&utm_medium=cpc&utm_campaign=cred-search-tx&…` |
| MD | `…/maryland?utm_source=google&utm_medium=cpc&utm_campaign=cred-search-md&…` |

Auto-tagging adds `gclid` (or `gbraid`/`wbraid` on iOS). Direct mail should use the same scheme with `utm_source=mail&utm_medium=direct-mail&utm_campaign=cred-mail-b1-{xx}` (b2 for batch 2) so one CRM field reports both channels.

## 7. Bidding, budget, location, schedule

### Bidding: Manual CPC, with Maximize clicks (capped) as the fallback

- **Why not Smart Bidding:** Maximize conversions and Target CPA need a steady flow of conversions to learn; Google's own guidance is tens a month per campaign [A]. This test expects maybe 1–4 inquiries a week across all five states [E] and a new account with no history. A bidder that can't learn just wanders, and the CPA it would chase is an inquiry, not a paid client.
- **Why Manual CPC over Maximize clicks:** Maximize clicks buys the cheapest clicks it can find, and in this category the cheapest clicks are job and course searches. Manual CPC keeps a firm ceiling per ad group and lets us bid higher on Prescribers and Services than on Medicaid and paneling questions. (Enhanced CPC is no longer offered for Search [A], so this is plain Manual CPC.)
- **Ceiling math:** at the $1,200 scale line and 2–5% of clicks becoming a paid setup [A, path report §5.1: formation's 10.4% × 0.2–0.5], the break-even CPC is $24–60; central 3% gives ~$36 [E]. Third-party CPCs: $18.01 (medical credentialing) to $67.98 (credentialing services) [S, seodata.dev]. Starting bids of $22–30 sit below the central break-even and leave room to raise.
- **Adjusting:** weekly, by ad group, at most +15% per change (the nypllc rule [M, operating plan]). Raise only where search terms are clean and most lost impression share is rank-lost. Don't change bids and ads in the same week.
- **Fallback:** if a campaign has spent under 30% of budget after 7 days at its max CPCs, switch that campaign to Maximize clicks with a max CPC limit of $35.

### Budget: ~$9,000, Dec 3 to Feb 14, weighted by phase and by state

**State weights** are half equal and half proportional to new behavioral-health organizations per year (TX 1,993, FL 1,603, NY 1,202, MD 1,078, NJ 896 [M, NPPES via path report §2.1]) so the big states get more while every state still gets enough spend to read: **TX 25%, FL 22%, NY 19%, MD 18%, NJ 16%** [A].

**Phase weights:** a learning stretch, a holiday dip (clinicians aren't shopping for vendors between Christmas and New Year [A]), the main push in January, and a smaller February tail. Paid clients lag inquiries by weeks, so February spend mostly won't show up as paid clients by the mid-February read; it's there to keep the signal alive while we decide.

| Phase | Days | NY | NJ | FL | TX | MD | Total/day | Phase total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Dec 3–20 (launch, learning) | 18 | $26 | $8 | $30 | $34 | $7 | $105 | $1,890 |
| Dec 21–Jan 3 (holidays) | 14 | $13 | $4 | $15 | $18 | $4 | $54 | $756 |
| Jan 4–31 (main) | 28 | $28 | $8 | $33 | $38 | $9 | $116 | $3,248 |
| Feb 1–14 (tail, if not stopped) | 14 | $19 | $6 | $21 | $24 | $5 | $75 | $1,050 |
| **Total per state** | 74 | **$1,700** | **$508** | **$1,968** | **$2,264** | **$504** | | **$6,944** |

**Nov 19 change (Sid):** Keyword Planner ([report](../credentialing-keyword-planner-2026-11-19/README.md)) put NJ at about 100 and MD at about 90 core searches a month, under this draft's own ~200 rule, while they held 34% of the budget for 19% of measured demand. NJ and MD stay **separate campaigns** (each keeps its own state landing page; location targeting is per campaign) with about **$500 each**. TX, FL and NY are unchanged. The ceiling is now $6,944; expected spend is still about $2–4K. Was: NJ $1,446, MD $1,622, total $9,000.

Launch is assumed Thu Dec 3; if Sid approves later in the Dec 1–12 window, shorten phase 1 and keep the other rows. Google can spend up to 2× a daily budget on a single day but not more than 30.4× in a month, so the monthly totals hold.

**What $9K buys [E]:** at $25–40 average CPC, 225–360 clicks; at 2–5% to a paid setup, roughly 5–18 paid clients across all five states, i.e. $500–1,800 each. That's 1–4 per state, so **the state-level numbers will be directional only; the channel-level number is the one to decide on.**

**Demand may cap spend before the budget does [E]:** the path report estimates ~6–9K commercial-intent credentialing searches a month nationally [E, from S]. These five states hold roughly a quarter of the US population [A], so maybe 1,500–2,500 in-state searches a month; at a 30–50% impression share and ~5% CTR [A] that's ~25–60 clicks a month, well under what $150/day can buy. If that's right, spend will run under budget, and the levers are phrase variants and higher bids, not broad match. The Keyword Planner pulls (section 9) settle this before launch.

### Location

Each campaign targets its state with **Presence** ("people in or regularly in"), not "presence or interest". This keeps the state read clean: an NJ clinician researching New York lands on the NJ campaign only if they're in NJ. The cost: clinicians licensed in a state but living elsewhere (telehealth) are missed. That's acceptable for a test whose purpose is cost per client by state.

### Schedule and devices

- Ads run every day 7:00–22:00 local time. Account time zone is Eastern, so NY/NJ/FL/MD run 7:00–22:00 ET and TX runs 8:00–23:00 ET. Overnight clicks are low-intent and nobody answers them [A].
- Call asset only during hours Sid will actually pick up (Sid to set; his Tue/Thu 10:00–12:00 credentialing sales blocks at least [M, decision log Nov 13]).
- No device adjustments at launch. Revisit after 4 weeks if mobile spends but sends no inquiries.

## 8. Conversion actions and CRM lead-source tracking

### In the new Ads account

| Action | Type | Primary? | Counting | Notes |
|---|---|---|---|---|
| **Inquiry form submit** | Website tag on the intake form's success response (not the button click) | **Primary** (fills the Conversions column) | One per click, 30-day window | Turn on **Enhanced conversions for leads** (hashed email) so later offline imports can match without a gclid |
| Email click | Website tag on `mailto:` clicks | Secondary | One | Weak signal; reporting only |
| Calls from ads ≥60s | Call asset with Google forwarding number | Secondary | One | Needs the real phone number |
| Website calls ≥60s | Google forwarding number swapped onto the site | Secondary | One | Needs the phone snippet on the site |
| Quote sent | Offline import (gclid or hashed email) | Secondary | One | Weekly CSV upload in the Ads UI (Goals > Conversions > Uploads); no API needed |
| **Paid client** | Offline import, value = amount paid | Secondary for now | One | The number the test is judged on. Make it primary only if volume ever supports Smart Bidding |

Under Manual CPC, primary vs secondary only changes reporting, not bids.

### Site and CRM work this depends on (the checklist's "Agent: set up tracking" item)

1. **The intake form submits nowhere yet** (`credentialing-site/src/app/contact/intake-form.tsx` has a TODO) [M]. It needs a real endpoint before launch.
2. **Port the nypllc click-attribution cookie** (`web/src/lib/click-attribution/`, 90 days, captures gclid/gbraid/wbraid/msclkid/UTMs [M, Ads shard]) to the credentialing site, and send those fields with the intake form as hidden fields, plus the landing path and referrer.
3. **CRM has nowhere to put an out-of-state inquiry with its source.** `CredentialingEngagement` requires a `pllcId` and has no source or UTM fields [M, `PLLC-CRM/crm/prisma/schema.prisma`]. Needed: an inquiry record (or a nullable `pllcId` plus source fields) holding source (`search` / `mail` / `formation` / `other`), state, utm_*, click IDs, landing path, first-touch time, then quote sent and paid linked to the engagement.
4. **Source rule:** gclid present or `utm_medium=cpc` → search; `utm_source=mail` → mail with batch and state from `utm_campaign`; existing nypllc customer → formation funnel. Calls and emails have no automatic source, so the inquiry form also asks "How did you hear about us?" (reuse the wording of the live nypllc post-payment survey [M, activeContext]) and Sid's draft card records the source for phone/email leads.
5. **Weekly report:** Ads cost by campaign (= state) from the read-only pull; inquiries, quotes and paid clients by source and state from the CRM; cost per paid client = cost ÷ paid clients from inquiries in the window.

## 9. Keyword data still needed

The search volumes and CPCs above are third-party [S] (seodata.dev pages citing Google Ads API data, path report §5.1). None has been checked in Google's Keyword Planner. The API route is blocked: the developer token has **Explorer** access, and Keyword Planner returns `DEVELOPER_TOKEN_NOT_APPROVED` at that level [M, checklist Nov 16].

### The exact pulls

Use the **nypllc** account (it has spend history, so it shows exact volumes; a new empty account shows only ranges). Keyword Planner is read-only and creates nothing unless someone clicks "Create campaign" or "Add to plan", so it doesn't break the nypllc freeze.

| # | Tool | Input | Location | Settings | Save as |
|---|---|---|---|---|---|
| 1–5 | Get search volume and forecasts | All of [keyword-planner-seed.txt](keyword-planner-seed.txt) (127 terms) | One run each: New York, New Jersey, Florida, Texas, Maryland | English, Google (no partners), last 12 months (Nov 2025–Oct 2026) | `kp-volume-{xx}.csv` |
| 6 | Same | Same | United States | Same | `kp-volume-us.csv` (sanity check against seodata.dev) |
| 7–11 | Discover new keywords | Seeds: insurance credentialing, therapist credentialing, provider credentialing, credentialing services, pmhnp credentialing, medicaid credentialing | One run per state | Same | `kp-ideas-{xx}.csv` (finds terms we missed and more negatives) |
| 12 | Forecast (from run 1–5 plan view) | The state's Exact + Phrase keywords at the starting max CPCs and phase-3 daily budget | Per state | Next month | Screenshot or note: forecast clicks, cost, avg CPC |

Columns needed from each: Avg. monthly searches, Three-month change, Competition, Top of page bid (low range), Top of page bid (high range). Save to this folder.

**What changes on the result:** if in-state volume for a state is under ~200 commercial searches a month, merge its budget into the bigger states; if top-of-page high bids run above $45 on the core terms, lower the expected click count and keep the $30 caps (don't chase); add any job/course terms from the ideas lists to the shared negatives.

### Three routes

**Route A: apply for Basic access (lets the agent run it by API from then on).**
1. Sid signs in to the manager account that owns the developer token (the `GOOGLE_ADS_LOGIN_CUSTOMER_ID` account).
2. Tools > Setup > **API Center**. Under access level, click **Apply for Basic Access**.
3. The form asks for the company, website, how the tool uses the API (internal reporting and planning for our own accounts, no third-party clients) and a short design doc. The agent can draft the answers for Sid to paste.
4. Wait for Google's email (often days to a few weeks [A]). After approval, the agent runs `GenerateKeywordHistoricalMetrics` and `GenerateKeywordIdeas` for the pulls above with the existing `google_ads/` client; read-only, no mutations.
5. Doesn't help before a Dec 1–12 launch unless approval is fast. Worth doing anyway for the next round.

**Route B: browser read in Sid's signed-in Ads account (fastest).**
1. Sid opens a signed-in Google Ads tab in his own Chrome (portals run in Sid's Chrome, not the built-in pane) and tells the agent to go ahead.
2. The agent uses Claude in Chrome: Tools > Planning > **Keyword Planner** > "Get search volume and forecasts", pastes the seed list, sets location to one state, English, Google, last 12 months.
3. The agent reads the results table off the page and writes `kp-volume-{xx}.csv` itself (no file download needed), repeats for each state and the US, then does the "Discover new keywords" runs.
4. The agent never clicks "Create campaign", "Add to plan" or "Save", and changes nothing in the account.
5. About 30–45 minutes of agent time; Sid's part is opening the tab.

**Route C: Sid exports the CSVs himself.**
1. ads.google.com > nypllc account > Tools > Planning > **Keyword Planner** > **Get search volume and forecasts**.
2. Paste the contents of [keyword-planner-seed.txt](keyword-planner-seed.txt), click Get started.
3. Set location (pencil icon) to New York only, language English, network Google, date range last 12 months.
4. Open the **Historical metrics** tab, click the download icon > **.csv**. Rename to `kp-volume-ny.csv` and drop it in this folder.
5. Repeat step 3–4 for NJ, FL, TX, MD and United States.
6. Optional: Discover new keywords with the six seeds above, one state at a time, download each.
7. About 20 minutes of Sid's time.

## 10. Kill and scale rules

From the checklist: **scale a channel at ≤ $1,200 per paid client; if both channels (search and mail) come in above $1,600, stop paid acquisition and stay with the formation funnel plus groups; in between, one more round with copy or offer changes.**

**Minimums before judging search [A]:**
- At least **6 weeks live** and at least **$4,800 spent** (3 × the $1,600 stop line), counting paid clients from inquiries up to 21 days after the window ends (quote and payment lag).
- **Stop call:** spend ≥ $4,800 and ≤ 2 paid clients (≥ $2,400 each, clearly above $1,600 even with one more late client).
- **Scale call:** at least 3 paid clients and cost per paid client ≤ $1,200. Two clients at $900 each is encouraging but not a scale signal.
- **Per state:** don't kill a state on paid clients; it won't have enough. A state can be paused early only on a leading signal (below).

**Leading signals (weekly, before paid clients exist) [A]:**
- A state spends $800 with **zero inquiries** → pause that state and move its budget to the best state by cost per inquiry.
- Cost per inquiry is the early proxy. If 25–40% of inquiries pay [A, untested: the CAQH pilot was 0 of 23 [M], the first credentialing jobs came from our own customers], $1,200 per paid client needs cost per inquiry of **≤ $300–480**. Above ~$650 per inquiry after $2,500 of channel spend, expect a stop.
- Search terms: if more than a third of spend in week 1 goes to job, course or lookup searches, fix negatives before judging anything.

**Cadence:** search terms daily for the first two weeks, then weekly with the formation SOP; one change per campaign per week; no ad edits and bid changes in the same week. Results go into the weekly channel report the checklist asks for (Jan 5–16 onward), and the late-January write-up compares search and mail on the same cost-per-paid-client basis.

## 11. What Sid must decide or provide before launch

1. **Approve the account route** (new separate account) and which payments profile it bills to.
2. **Brand, domain, phone** (`credentialing-site/src/lib/site.ts` placeholders). Without a live domain there is no final URL.
3. ~~**Terms call**, open question 1~~ Answered Nov 18: the package is billed up front, so the ads now say "Credit or Refund If Declined" and "If an insurer turns you down, you get its share back or moved to another insurer." (section 5). Nothing left to decide here.
4. **Landing page copy approval** (checklist item) and a deployed site with a working intake form.
5. **Medicaid price outside NY**: confirm $495 per state or keep the non-NY Medicaid ads price-free as drafted.
6. **Keyword Planner route** (A, B or C), ideally before Nov 28 so budgets can be set from real volumes.
7. **Approve this campaign and the daily budgets**, then turn the campaigns on Dec 1–12 (Sid's step in the checklist).
8. Optional, after Dec 1: an exact negative `insurance credentialing` in nypllc's broad Sales campaign.

## Sources

- [credentialing-national-test-checklist.md](../../credentialing-national-test-checklist.md) (budget, states, kill/scale lines, Keyword Planner block).
- [credentialing-path-to-350-500k-net-2028.md](../credentialing-path-to-350-500k-net-2028.md) §2.1 (NPPES flows by state [M]), §11 (CAQH pilot) and §5.1 (seodata.dev volumes and CPCs [S], conversion assumptions [A]).
- [nypllc-google-ads-operating-plan.md](../../nypllc-google-ads-operating-plan.md) §1.1–1.3, §3.4–3.6, §4.1, Part 10 (conventions, negatives architecture, freeze).
- [memory-bank/features/google-ads.md](../../memory-bank/features/google-ads.md) (stop-word incident, health-terms exemptions, gov-docs disapprovals, click-attribution capture).
- [decision-log.md](../../decision-log.md) rows Oct 29 (freeze), Nov 13 (sales blocks), Nov 16 (site structure, prices).
- `credentialing-site/` README, `content/states/*.md`, `src/lib/pricing.ts`, `src/lib/site.ts`, `src/app/contact/intake-form.tsx`, AI-TELLS.md, HUMANIZER-PASS.md.
- [credentialing-service-terms-draft-2026-11-16.md](../credentialing-service-terms-draft-2026-11-16.md).
- `ads-pull-2026-10-18-weekly-sop/since-jul9/` search terms and `gsc/Queries_2025-10-27_to_2026-08-02.csv` (no credentialing bidding in nypllc; optometry queries).
- `PLLC-CRM/crm/prisma/schema.prisma` (`CredentialingEngagement`, `Order` attribution fields).
