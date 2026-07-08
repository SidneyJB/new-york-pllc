# SEO & domain (reference)

Depth extracted from legacy memory bank. Shard: `memory-bank/features/seo-and-domain.md`.

## Canonical domain

- Live exclusively on `https://www.nypllc.com`
- `vercel.json` 301s from old variants (e.g. `newyorkpllc.com`)
- `SEO_CONFIG.siteUrl` hardcoded (no env fallback)
- `metadataBase` + `alternates.canonical` in root layout
- Sitemap / structured data / OG use canonical host

## SEO system (PROJ-016)

- Next.js Metadata API per page
- JSON-LD (Organization, breadcrumbs, Article on DIY)
- XML sitemap + robots.txt
- Image optimization / Core Web Vitals config
