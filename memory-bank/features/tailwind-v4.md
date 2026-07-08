# Tailwind v4

## One-liner

Tailwind CSS v4 with explicit `@config`, CSS variables, and Server Component root layout.

## Status

**Live.** Centralized color system; dark mode via `.dark` variable swaps.

## Key paths

- `web/src/app/globals.css` — `@import "tailwindcss"` + `@config "../../tailwind.config.js"`
- `web/tailwind.config.js` — colors as `hsl(var(--…))`
- `web/postcss.config.js` — `@tailwindcss/postcss`
- Root `layout.tsx` must stay **Server Component** (no `'use client'`) so CSS loads

## Gotchas

- v4 does **not** auto-load JS config without `@config`
- Turbopack can break ESM PostCSS configs — prefer CommonJS `.js`

## Docs

📖 [Tailwind v4](../../docs/tailwind-v4.md)
