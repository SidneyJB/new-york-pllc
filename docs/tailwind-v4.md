# Tailwind v4 (reference)

Depth extracted from legacy memory bank. Shard: `memory-bank/features/tailwind-v4.md`.

## Required wiring

1. `globals.css`: `@import "tailwindcss";` + `@config "../../tailwind.config.js";`
2. `tailwind.config.js`: map utilities to `hsl(var(--token))`
3. `postcss.config.js`: `@tailwindcss/postcss`
4. Root layout: Server Component importing global CSS

## Theme

- Tokens in `:root` and `.dark`
- Brand primary kept consistent across themes where intentional
