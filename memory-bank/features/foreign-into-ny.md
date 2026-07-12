# Foreign-into-NY Pages

## One-liner

Hub + state landings for out-of-state professional entities qualifying into NY, with shared page module and hero state selector.

## Status

**Live.** States: NJ, PA, FL, TX, CT. Expand coverage as needed.

## Key paths

- Hub: `web/src/app/foreign-pllc/page.tsx`
- States: `web/src/app/foreign-pllc/{state}/page.tsx`
- Shared: `StateForeignQualificationPage`, `ForeignStateSelector`
- Constants: `web/src/lib/constants/foreign-states.ts`

## UX rules

- "What we need from you" = **customer-provided** info only
- We obtain standing / certified formation docs (do not list as customer homework)
- Cross-sell `/virtual-address-services` for NY address + registered agent
- Avoid duplicate document cards

## Pricing note

**Rule (Jul 2026):** One flat list price per home state for foreign PLLC **and** foreign PC: `round_to_5(895 + unified_doc_cogs)` where unified docs = max(PLLC path, PC path). Do not maintain separate PLLC/PC list prices when adding states. Quote unusual certified-copy page counts, NYSED per-member fees, publication, or assumed-name work separately.

Source: `data/foreign-qualification-cogs.json`. Current flats: NJ $995 · PA $995 · FL $930 · TX $930 · CT $1000.

## Pricing data (all states)

**Use for future expansion** — not wired to the site beyond the five live states yet.

| File | Contents |
|------|----------|
| `data/foreign-qualification-cogs.json` | Home-state doc CoGS, NY fixed fees, `list_price_usd` per state (`round_to_5(895 + unified_doc_cogs)`), sources, confidence. 50 states + DC. |
| `data/spiffy-foreign-qualification-products.json` | Spiffy product IDs for all 50 states (`{State} to New York Foreign Qualification`). |

Regenerate list prices from CoGS when fee schedules change; Spiffy catalog is maintained separately in Spiffy + the products JSON.

## Docs

📖 [Session history](../../docs/session-history.md)
