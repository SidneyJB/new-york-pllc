# P3-09 Services page draft (Nov 18 2026)

Draft only. Nothing deployed, nothing changed on `main`, no Spiffy change. Build after the landing-page freeze ends Dec 1. Proposed code is in [proposed-code/](proposed-code/).

Source item: [p2-12 recut §3 P3-09](../../ops/p2-12-day45-recut-proposal-2026-11-14.md): "List DBA, address change, amendment, good standing and dissolution at the prices already in the revenue levers plan. **Pass:** 5 paid orders in its first 30 days."

## 1. What exists today

- `NAVIGATION.main` in [web/src/lib/constants/index.ts](../../web/src/lib/constants/index.ts) has `// Temporarily disabled: { name: 'Services', href: '/services' }` and the same for `/pricing`. The navbar does not read `NAVIGATION.main` at all: [navbar.tsx](../../web/src/components/layout/navbar.tsx) hard-codes a "Services" dropdown (PLLC formation, LLC formation, foreign qualification, virtual address). Neither `/services` nor `/pricing` exists under `web/src/app`.
- `PRICING.assumedNamePrice = 199` is already live and shown on `/ny-pllc-cost` and every foreign-state page. Nothing else on this list has a site price.
- Two address-change prices are already published: **$129** for a virtual-mail customer's Certificate of Change ([mail-forwarding-agreement](../../web/src/app/mail-forwarding-agreement/page.tsx) §4, [terms](../../web/src/app/terms/page.tsx)) and **$99 all-in** for a direct RA customer leaving us (`/change-registered-agent`, noindex, retention path). The services page's $99 + $30 = $129 matches that $129 without expedite; with expedite it's $154 (decision 2). Leave the $99 exit price where it is.
- The CRM can already fill all five DOS forms: `lib/certificate-of-change` (DOS-1359), `lib/certificate-of-amendment` (1358/1360), `lib/certificate-of-assumed-name`, `lib/articles-of-dissolution` (1366), `lib/cert-copy`. Read-only check, nothing changed.

## 2. Prices and DOS fees

Our fee from the [revenue levers plan](../../nypllc-revenue-levers-plan.md) Lever 2, state fee from DOS.

| Service | DOS form | Our fee | DOS filing fee | With 24-hour expedite (+$25) | Customer total (with expedite) |
|---|---|---:|---:|---:|---:|
| DBA (Certificate of Assumed Name) | DOS assumed-name form for LLCs | $199 | **$25**, no county fee for LLCs | $50 | **$249** |
| Address change (Certificate of Change) | DOS-1359 | $99 | **$30** | $55 | **$154** (or $129 without expedite, see decision 2) |
| Amendment (Certificate of Amendment) | DOS-1358 | $249 | **$60** | $85 | **$334** |
| Certificate of Good Standing (Certificate of Status) | request | $99 | **$25** | $50 | **$149** |
| Dissolution (Articles of Dissolution) | DOS-1366 | $299 | **$60** | $85 | **$384** |
| *(optional sixth)* Certified copy of a filed document | request | $99 | $10 | $35 | $134 |

**Sources for state fees (checked Nov 18 2026):**
- DOS fee schedule, domestic LLC: amendment $60, certificate of change §211-A(a) $30, dissolution $60, certificate of status $25, certified copy $10; expedite $25 within 24 hours, $75 same day, $150 two hours, for filings and for status/copy requests. [dos.ny.gov/fee-schedules](https://dos.ny.gov/fee-schedules) (page marked "Rev. 3/16").
- Assumed name: "$25 plus any associated county fee(s)" and "There is no county fee for limited liability companies or limited partnerships." [DOS instructions for the Certificate of Assumed Name](https://dos.ny.gov/instructions-completing-certificate-assumed-name-0).
- Articles of Dissolution, $60, due within 90 days after dissolution: [dos.ny.gov articles of dissolution, domestic LLC](https://dos.ny.gov/articles-dissolution-domestic-limited-liability-companies).

**Two corrections to the revenue levers plan's COGS column** (not edited there; for Sid to note):
- DBA state fee is listed as $45. DOS says $25 for an LLC/PLLC with no county fee ($50 with expedite). Several filing-service sites wrongly say LLCs pay county fees; the DOS instructions say they don't.
- Certificate of Good Standing "~$25" and certified copies "~$10–25" are confirmed at $25 and $10.

**Address change vs amendment.** Changing only the PLLC's address for service of process is a Certificate of Change ($30), not an amendment ($60). Name, purpose/profession, member or county changes are amendments. The page explains which is which so buyers pick the right one.

## 3. How ordering works (recommended route)

**Recommend: one hosted Spiffy checkout per service, linked (not embedded) from `/services`.** It's the lightest route that already exists: Sid knows the Spiffy product setup, payment and receipts already work, and a plain link needs no new embed code or tracking code on the page. Five services, five checkout links.

Hard rule for the setup: **these checkouts must not post to the CRM's `/api/webhooks/spiffy/order-success` webhook.** That handler treats every Spiffy order as a new PLLC formation. It upserts a PLLC by `pllc_name` (overwriting the address on an existing record), sets `INTAKE_RECEIVED` on new names, and auto-starts an RA or VM subscription (`maybeStartSubscriptionFromOrderIntake`). A DBA buyer would land in the formation pipeline and get billed for RA. Read-only check of `PLLC-CRM/crm/app/api/webhooks/spiffy/order-success/route.ts`.

At launch: order email only (the same Zapier email the formation checkout sends), staff opens the order in the CRM by hand. At the pass target (5 orders in 30 days) manual entry is a few minutes a week. If the page passes, a small `service-order-success` webhook that creates an `Order` with an `orderKind` (the pattern `ra_change_coc` already uses) comes after. Not part of this draft.

Fields each checkout needs (keep them short; no pre-payment checks):

| Checkout | Fields |
|---|---|
| All | Name, email, phone, PLLC exact legal name, DOS ID if known (optional) |
| DBA | Name you want to use |
| Address change | New address for service of process |
| Amendment | What you want to change (free text) |
| Good standing | Who it's for (optional: bank, insurer, other state) |
| Dissolution | Effective date wanted (optional) |

Alternative routes considered:
- **Contact form / quote then a pay link.** No setup, but every order needs a back-and-forth before payment. Fine for amendments if Sid prefers (scope varies), worse for fixed-scope items.
- **Stripe Checkout one-offs like the $99 RA CoC.** That flow needs a known `pllcId` in the session metadata, so it only works for existing customers from an email link. Not for strangers on a public page.

## 4. Page copy

URL: `/services`. H1 and body below are in Sid's voice; the [proposed page.tsx](proposed-code/services-page.tsx) uses the same text.

**SEO title (57 chars):** `NY PLLC Filings: DBA, Amendments, Dissolution | NYPLLC`
**Meta description (151 chars):** `DBA, address change, amendment, good standing and dissolution for New York PLLCs. Flat fee plus the state fee, shown up front. We prepare and file it.`
**Canonical:** `/services`. Index: yes. Add to sitemap at priority 0.7.

---

### Filings for your PLLC after it's formed

You formed the PLLC. Now something has changed: a new name to use, a new address, a partner leaving, or you're closing it. These are the filings we do most. Each one is a flat fee plus the state's fee, and both are listed below.

You don't have to have formed with us.

#### DBA (Certificate of Assumed Name)
**$199 + $50 state fees**

Use a name other than your PLLC's legal name, on a sign, a website or invoices. We check the name, prepare the certificate and file it with the Department of State. You get the filed certificate by email.

New York's fee for a PLLC is $25, with no county fees. We add the $25 24-hour expedite so it doesn't sit in the queue.

The name still has to follow New York's rules for professional entities. If yours won't pass, we'll tell you before we file and refund you if you'd rather not change it.

[Order a DBA]

#### Address change
**$99 + $55 state fees**

Changes the address New York uses to send legal papers to your PLLC (the "service of process" address). We prepare the Certificate of Change, file it, and send you the filed copy.

If you're on our virtual mail service, this is the same filing that ends it. See the [mail forwarding agreement](/mail-forwarding-agreement).

[Order an address change]

#### Amendment
**$249 + $85 state fees**

For changing what's in your Articles of Organization: the PLLC's name, the profession, the county, or members. Tell us what's changing and we prepare the Certificate of Amendment and file it.

Some name or profession changes need sign-off from the State Education Department first. If yours does, we'll tell you within one business day of your order, before anything is filed. You can go ahead or cancel for a full refund.

Only changing the address? That's the address change above, not an amendment.

[Order an amendment]

#### Certificate of Good Standing
**$99 + $50 state fees**

Banks, insurers, landlords and other states ask for this. New York calls it a Certificate of Status. We order it from the Department of State and email it to you.

[Order a certificate]

#### Dissolution
**$299 + $85 state fees**

Closing the PLLC. We prepare the Articles of Dissolution and file them. New York expects them within 90 days after you decide to dissolve.

Filing the articles ends the PLLC with the state. It doesn't file your final tax returns or close your bank account or EIN. Your accountant handles the taxes. If you have registered agent or mail service with us, we stop it when the dissolution is filed.

[Order a dissolution]

#### How long it takes

We file within one business day after we have what we need from you. With the 24-hour expedite, the state usually returns it the next business day. Name issues, or a State Education Department step on an amendment, add time, and we'll tell you when that's the case.

#### About the state fees

They're the Department of State's fees, passed through at cost. We don't mark them up. The state can change them; these are current as of November 2026.

Not sure which one you need? Text or email us: [646-444-2102](tel:6464442102) · [contact@nypllc.com](mailto:contact@nypllc.com).

---

Copy notes:
- Every price line reads "our fee + state fees" so the government fee is always separate, per the task. If Sid drops expedite (decision 2), state fees become $25 / $30 / $60 / $25 / $60 and the turnaround paragraph changes to "the state's own processing time, usually one to two weeks" (unverified; DOS doesn't publish a current non-expedited time that I could find).
- No claims I couldn't source: no NYSED step promised or denied for amendments beyond "some need it", no tax-consent claim for dissolution (secondary sources conflict; tax.ny.gov not checked).
- Short FAQ for schema, if wanted: "Do I need to have formed with you?" (no) and "Is the state fee included?" (no, it's listed separately and passed through at cost).

## 5. Navigation and sitemap changes

In [proposed-code/nav-footer-constants-sitemap.diff](proposed-code/nav-footer-constants-sitemap.diff):

1. **Navbar Services dropdown** (desktop and mobile): add "DBA, amendments & other filings" → `/services` as the last item. The navbar hard-codes these items, so the change goes there.
2. **Footer Services list:** add "Other PLLC Filings" → `/services`.
3. **`NAVIGATION.main`:** replace the commented Services line with a live entry, and delete the commented `/pricing` line. `/ny-pllc-cost` already does the pricing job; a separate pricing page would compete with it for the same searches.
4. **`PRICING`:** add `amendmentPrice`, `addressChangePrice`, `goodStandingPrice`, `dissolutionPrice`, and a `DOS_FEES` constant so the page and `/ny-pllc-cost` read from one place.
5. **Sitemap:** add `/services`, monthly, priority 0.7.
6. **Metadata:** add `SERVICES_METADATA` to `lib/seo/metadata.ts`.
7. Optional, small: on `/ny-pllc-cost`, link the "Assumed name / DBA (optional)" row to `/services#dba`.

## 6. Getting to 5 orders in 30 days

A new page with no links into it and no ads will get almost no traffic in 30 days. Organic ranking for "NY PLLC dissolution" or "certificate of good standing NY" takes longer than that. The realistic sources in the first month are existing customers. That would mean one email to past formation customers, or a line in the existing lifecycle emails. That's a send, so it's listed as a decision for Sid and nothing is drafted to send.
