# Technical Context: NY PLLC Formation Service

## Stack

- **App**: Next.js 15 / React 19 / TypeScript (see `web/package.json`)
- **CSS**: Tailwind CSS v4 + PostCSS
- **Payments**: Spiffy.co
- **Email**: Zapier (from Spiffy)
- **Analytics**: GA4 + Vercel Analytics + Bing UET
- **Hosting**: Vercel
- **Tests**: Vitest + React Testing Library

## Setup

```bash
cd new-york-pllc/web   # or repo root if package lives there
npm install
cp .env.example .env.local
npm run dev
```

## Env (typical)

`SPIFFY_CO_*` · `SENTRY_DSN` · `GA_TRACKING_ID` / measurement id · `NEXT_PUBLIC_APP_URL`

Email delivery does not need SendGrid in-app (Zapier).

## Constraints

- Page load / CWV in “Good” range; HTTPS only; PCI via Spiffy; privacy compliance

## Layout (web)

`app/` pages · `components/{ui,analytics,forms,layout,sections}` · `lib/{analytics,validations,seo}` · `__tests__/`

## Deploy

Vercel GitHub integration; env in Vercel dashboard; canonical domain redirects in `vercel.json`.

## Git push note

Pushing from agent terminals may need full permissions so git can use macOS Keychain credentials.

📖 Feature depth via [router.md](router.md) · [docs/](../docs/)
