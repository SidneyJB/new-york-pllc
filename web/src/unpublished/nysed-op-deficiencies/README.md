# NYSED OP deficiencies — unpublished

Do **not** move this folder into `src/app/`. Next.js only serves routes under `app/`, so this page is **not** a production URL.

Vercel also 404s `/nysed-op-deficiencies` in repo-root `vercel.json`, `web/vercel.json`, and `web/next.config.ts` rewrites. Do not remove those until Sid explicitly launches.

To go live later: copy this directory to `src/app/nysed-op-deficiencies/`, add sitemap/footer links, remove the Vercel rewrites, then ship.
