# Draft: email to Spiffy support about abandoned-checkout capture (Nov 11 2026)

**Status: draft, not sent.** Sid sends it from contact@nypllc.com to Spiffy support, or pastes it into their help chat. Background: [P1-07 § Root cause](../../reports/p1-07-buying-journey-2026-11-08.md). This is fix route (a) for P1-08's "verify abandonment capture".

---

**Subject:** Inline checkout no longer sends `identify` to the parent page (abandoned-cart capture)

Hi Spiffy team,

We embed our Spiffy checkout inline on www.nypllc.com/order (store: nypllc.spiffy.co). Since about October 14, we've stopped capturing abandoned checkouts, and I'm hoping you can help.

**What we built.** Our page listens for the `identify` message that the embedded checkout used to post to the parent window, plus the `_sp_id` cookie. When either appeared after a visitor typed their email, we saved the email so we could follow up if they didn't finish. This worked through October 14.

**What we see now.** In a live test on November 9, I filled in name, email and phone in the embedded checkout without submitting. Spiffy's debug bus (`window.__SPIFFY_DEBUG__`) logged only `ready`, `form:ready`, `persistHandle` and `form:size`. No `identify` message was posted, and no `_sp_id` cookie was set. Reading the current `spiffy.js`, it looks like `identify` now comes only from `autoIdentify` on a form in the parent page, not from anything typed inside the checkout iframe.

**Questions:**

1. Did something change around mid-October in how the inline checkout reports a buyer's email to the parent page? Is there still a supported way to receive it?
2. If not, is there a server-side option instead: a webhook, Zapier trigger or integration that fires when a checkout is started, or when an email is entered but the order isn't completed?
3. Does Spiffy have built-in abandoned-cart emails for inline checkouts that we could turn on, and do they cover customers who type an email but never submit?
4. If the only route is your multi-step checkout (email collected on our page first, passed in by URL parameter), can you confirm that's the recommended setup for an inline embed?

Happy to share a screen recording or our embed code if that helps.

Thanks,
Sid Brodsky
NYPLLC.com
contact@nypllc.com

---

## Notes for Sid (not part of the email)

- If they offer (2), we'd point it at the existing CRM ingest (the site endpoint and CRM side both still work; only the trigger is missing).
- If they say only (4) is possible, that's route (b) in P1-07: it works, but adds a step to the checkout. It's a structural change, so it waits until after the Nov 15–Dec 1 freeze unless you decide otherwise.
- The freeze allows a tracking fix, so sending this email and wiring up a webhook can happen during the freeze.
