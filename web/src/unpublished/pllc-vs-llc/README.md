# PLLC vs LLC — unpublished

Do **not** move this folder into `src/app/`. Next.js only serves routes under `app/`, so this page is **not** a production URL.

Vercel also 404s `/pllc-vs-llc` in repo-root [`vercel.json`](../../../vercel.json), [`web/vercel.json`](../../vercel.json) (if Root Directory is `web`), and [`web/next.config.ts`](../../next.config.ts) rewrites. Do not remove those until Sid explicitly launches.

To go live later: copy this directory to `src/app/pllc-vs-llc/`, add sitemap/footer links, remove the Vercel rewrites, then ship.

**Scope:** licensed-professional decision content. Do not add `/order-llc` CTAs, sitemap equity, or plain-LLC keywords. CheapNewYorkLLC owns that market.
