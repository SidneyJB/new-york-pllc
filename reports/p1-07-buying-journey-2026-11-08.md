# P1-07 buying journey check — Nov 8 2026

**Prepared by:** Agent. Read-only browser walkthrough of the live site at 375×812 (phone), plus Google Ads landing-page and device data for Sep 9–Nov 7.

## Traffic that matters

| Landing page (Ads, 60 days) | Clicks | Conv |
|---|---:|---:|
| `/` (home) | 503 | 55.9 |
| `/how-to-form-a-pllc-in-ny` | 41 | 2 |
| `/foreign-pllc` | 32 | 1 |
| `/professions/lcsw` | 7 | 1 |
| `/faq`, `/order`, `/contact` | 6 | 0 |

| Device (Ads, 60 days) | Clicks | Conv | Rate |
|---|---:|---:|---:|
| Desktop | 404 | 45.9 | 11.4% |
| **Mobile** | 188 | 13.0 | **6.9%** |
| Tablet | 5 | 1.0 | — |

Mobile converts at about 60% of the desktop rate on the same campaigns.

## Phone walkthrough

| Page | Sideways scroll | Price | Payment plan mentioned | First order button |
|---|---|---|---|---|
| Home | None | $885 above the fold; sticky "Start your PLLC — $885" bar | **No** | 462px (above the fold) |
| `/order` | None | Inside the Spiffy form | **Not on our page** (only inside Spiffy) | Form starts at 548px. The Spiffy frame is **4,170px tall** on a phone |
| `/how-to-form-a-pllc-in-ny` | None | $885 | No | 2,697px down a 32,115px page |
| `/foreign-pllc` | None | State list $895–$1,000 | No | State links at 619px |
| `/professions/lcsw` | **Yes: 400px wide on a 375px screen** | $885 | No | 947px |
| `/faq` | — | — | Only as the question "Do you offer payment plans?" | — |

**Confirmed malfunction:** `/professions/lcsw` scrolls sideways on phones (25px overflow). The other pages tested don't.

**Observations (hypotheses, not confirmed causes):**
- 40% of buyers use a payment plan, but no page outside the Spiffy form says one exists, except an FAQ question.
- On a phone the Spiffy form is about five screens tall.

## Checkout start event

- `checkout_start` (Vercel) fires **once per `/order` page load** when the `spiffy-checkout` element appears (`useCheckoutTracking` in `form-tracking.tsx`). That makes it an order-page view, not a unique checkout start: reloads and return visits count again.
- Google's begin-checkout observation action fires on the same trigger.
- **Ads vs CRM, October:** 43.0 Ads conversions against 38 CRM orders with a Google click id (+13%, just outside the ±10% band). Fractional data-driven credit and late-captured click ids are the likely reasons; nothing is double-imported.

## Fallback route

- `/order` shows "open the secure checkout directly", which links to `nypllc.spiffy.co/checkout/new-york-pllc-formation` **with no query string**.
- A buyer who uses it leaves our page, so the site's click-id cookie and partner `?c=` capture don't travel with them. Attribution likely drops to Unknown on that path.
- This is inferred from the link. It hasn't been tested with a real purchase.

## Abandoned checkout capture

**Not working.** Only 5 rows were ever captured (Oct 7, and four on Oct 14). None have been captured since Oct 14, through a record month. The recovery cron itself runs (1,617 runs). Capture runs in `use-checkout-abandonment-capture.ts` (Spiffy `identify` postMessage and page-exit cookie). P1-08 owns the fix; Sid deferred P1-08 on Nov 8.

## Customer conversations

**Not started.**
- **Buyers:** about 10 can come from the Oct 26–Nov 8 orders (35 orders).
- **Abandoners:** only 3 reachable addresses exist (Oct 7, Oct 14 ×2, excluding the recovered one), so 10 abandoners isn't possible until capture works.
- Sid or Ops makes the asks. A short email, ready to send on Sid's word:

> Subject: Two quick questions about your PLLC order
>
> Hi {first name}, thanks again for forming {PLLC name} with us. Would you answer two questions? A one-line reply is plenty.
> 1. What made you decide to order when you did, and what almost stopped you?
> 2. Did you look at anyone else (another service, an attorney, doing it yourself)?
> Your answers go straight to me and help us fix what gets in people's way. Sid

## Top obstacles with evidence so far

1. **Mobile conversion is about 40% lower** (Ads device data). Cause not established. The tall embedded form and the LCSW overflow are candidates.
2. **No visible payment plan before checkout** (walkthrough), against 40% plan usage. Hypothesis only.
3. **Abandoners aren't captured**, so no recovery and no abandoner interviews (CRM).

These can't be ranked by buyer feedback until the conversations happen.
