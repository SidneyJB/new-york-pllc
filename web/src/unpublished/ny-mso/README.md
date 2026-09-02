# NY MSO page — unpublished

Do **not** move this folder into `src/app/`. Next.js only serves routes under `app/`, so this checkout page is **not** a production URL.

Vercel also 404s `/ny-mso` and `/pllc-and-mso` in repo-root [`vercel.json`](../../../vercel.json), [`web/vercel.json`](../../vercel.json) (if Root Directory is `web`), and [`web/next.config.ts`](../../next.config.ts) rewrites. Do not remove those until Sid explicitly launches.

To go live later: copy this directory to `src/app/ny-mso/`, add sitemap/footer links, remove the Vercel rewrites, then ship.