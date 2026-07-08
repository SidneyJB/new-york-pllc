# SEO & Domain

## One-liner

Canonical **www.nypllc.com** with Next metadata API, JSON-LD, sitemap, and Vercel 301s from old domains.

## Status

**Live.** PROJ-016 SEO complete; domain consolidation done.

## Key paths

- `web/src/lib/seo/config.ts` — hardcoded `siteUrl: 'https://www.nypllc.com'`
- `web/src/app/layout.tsx` — `metadataBase`, `alternates.canonical`
- Repo-root `vercel.json` — 301 redirects (`newyorkpllc.com` → www)
- Sitemap / robots / structured data under `web/`

## Gotchas

- Do not reintroduce env-var fallback for site URL
- Old domains must stay redirect-only in Vercel dashboard

## Docs

📖 [SEO & domain](../../docs/seo-and-domain.md) · repo `seo-backlink-strategy.md`
