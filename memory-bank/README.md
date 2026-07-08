# Memory Bank

Lean routing layer for session context. **Depth lives in `docs/`** — not here.

## Session start (default)

**"Read memory bank"** → read only `router.md`, `projectbrief.md`, `activeContext.md`. Stop there.

When the user gives a **task**, also read 1–2 matching `features/*.md` from the router table.

On demand only: `productContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`, `watches/`, `ops-checklists/`.

## Layout

```
memory-bank/
  router.md              # Task → which files to read
  projectbrief.md        # Core scope (always)
  productContext.md      # Why / UX (on demand)
  activeContext.md       # Current sprint (always)
  systemPatterns.md      # Cross-cutting architecture (on demand)
  techContext.md         # Stack & env (on demand)
  progress.md            # Status & backlog (on demand)
  features/              # Per-feature shards (~30–60 lines each)
  watches/               # Operational watch items
  ops-checklists/        # One-time setup steps
```

## Rules

- Core files: **&lt;150 lines** each
- Feature shards: **&lt;60 lines** each — index only, link to `docs/`
- Changelog: **`docs/session-history.md`** — do not duplicate in `activeContext.md`

## After significant work

1. Update the relevant `features/<name>.md` shard (status + paths + gotchas)
2. One-liner in `activeContext.md` if it's current sprint work
3. Full detail → `docs/` if missing; else session-history only
