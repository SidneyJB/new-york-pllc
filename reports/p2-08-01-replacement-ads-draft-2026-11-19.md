# `01_Core_Exact_NY`: replacement ads for the 3 disapproved RSAs (draft, Nov 19 2026)

**Status:** draft for Sid. Nothing changed in the Ads account. Owner: Sid. Checklist: P2-08 policy item.

## What the API shows (read-only, Nov 19)

- Disapproved (GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES, FULLY_LIMITED, "certificate required"): `816213581518` (Formation-Core), `816213581680` and `816286167770` (Service-Intent), all to /order. `816213581518` is also DESTINATION_NOT_ACCESSIBLE.
- **The two Cost-Price ads (`816213589888`, `816286168247`) carry the same headlines, descriptions and /order URL and are APPROVED with no policy entries.** So the ad text alone doesn't explain the disapproval [O].
- Likely reasons [I]: (1) the disapproved ads were re-reviewed after the Nov 18 repoint, under the policy Google tightened on Oct 5 2026, while the Cost-Price ads haven't been re-reviewed since; (2) the ad-group keywords add context ("file a pllc in ny", "pllc application ny", "ny pllc filing", "pllc filing service"). Any new ad gets a fresh review under the current policy, so a text rewrite may still be disapproved.
- The policy lists the US EIN among restricted documents and requires certification (domain linked from a government site as an authorized provider), which we can't get. Advertisers who don't promote acquiring those documents may request exclusion. ([policy](https://support.google.com/adspolicy/answer/13156083?hl=en), [Oct 2026 update](https://support.google.com/adspolicy/answer/17260489?hl=en))

## Approach

Sell the service, not the government documents: no "EIN", "NYSED", "DOS", "filing", "application", "certificate" or "official". Add "Not a Government Agency" and "Private Formation Service". Treat it as a probe: add one new ad first (Service-Intent), keep the old ones paused rather than removed, and see whether Google approves it. If approved, add the other two; if not, request the policy exclusion or leave `01` to the Dec 1 memo.

Freeze: this counts as a policy-fix exception (decision log Nov 18). Final URL: https://www.nypllc.com/order (or `/` if the /order "not accessible" flag recurs).

## Headlines (all ≤ 30 characters)

| # | Headline | Pin |
|---|---|---|
| 1 | NY PLLC Formation, $885 Flat | H1 |
| 2 | Newspaper Publication Included | |
| 3 | Done-For-You PLLC Setup | |
| 4 | Built for Licensed Pros | |
| 5 | Talk to a PLLC Specialist | |
| 6 | Rated 5 Stars on Google | |
| 7 | No Hourly Attorney Fees | |
| 8 | Payment Plan Available | |
| 9 | Operating Agreement Included | |
| 10 | Registered Agent Yr 1 Free | |
| 11 | Thousands of NY Entities | |
| 12 | Start Your NY PLLC Today | |
| 13 | Not a Government Agency | |
| 14 | One Flat Fee, No Surprises | |
| 15 | Private Formation Service | |

## Descriptions (all ≤ 90 characters)

1. Flat $885 NY PLLC formation for licensed pros. Publication and agreement included.
2. We prepare your paperwork, handle the approvals and manage the newspaper publication.
3. Private formation service, not a government agency. Pay in full or in 4 payments.
4. Specialists in New York professional entities. No hourly attorney fees.

## The three ads

- **Ad A (Service-Intent, the probe):** all 15 headlines and 4 descriptions above.
- **Ad B (Service-Intent):** same, with headline 12 swapped for "Licensed Pro? Form Your PLLC" (only if A is approved).
- **Ad C (Formation-Core):** same as A (only if A is approved).

Every claim is already on the site or in approved ads: $885 flat, publication and operating agreement included, registered agent year 1 free, 4-payment plan, 5.0 Google rating, thousands of NY entities.
