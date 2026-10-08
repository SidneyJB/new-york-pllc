# Checkout funnel by device (last 60 days)

Generated: 2026-10-07

## If Google says “This app is blocked”

`gcloud auth application-default login` uses Google’s **shared** OAuth client. Google often blocks it for Analytics scopes. **Do not fight that flow** — use a **service account** (5 minutes, works for scripts):

1. [Google Cloud Console](https://console.cloud.google.com/) → pick a project you own (or create one, e.g. `nypllc-tools`).
2. **APIs & Services → Library** → enable **Google Analytics Data API**.
3. **IAM & Admin → Service accounts → Create** (e.g. `ga4-funnel-reader`) → **Keys → Add key → JSON**. Save the file outside git (e.g. `~/secrets/nypllc-ga4-reader.json`).
4. [GA4](https://analytics.google.com/) → **Admin** (gear) → **Property access management** → **+** → add the service account **email** → role **Viewer** (property level, not just account).
5. **Admin → Property settings** → copy numeric **Property ID**.

```bash
cd ~/Dev/pllc-business/new-york-pllc
export GOOGLE_APPLICATION_CREDENTIALS=~/secrets/nypllc-ga4-reader.json
export GA4_PROPERTY_ID=PASTE_NUMERIC_PROPERTY_ID
.venv-ga4/bin/python scripts/pull_checkout_funnel_by_device.py --days 60
```

Optional (user ADC with **your** OAuth client, not gcloud’s): Credentials → **Create OAuth client ID** → **Desktop app** → download JSON →

```bash
gcloud auth application-default login \
  --client-id-file=/path/to/client_secret_....json \
  --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly
```

## Run this from **new-york-pllc** (not PLLC-CRM)

`new-york-pllc` is a **sibling** repo next to `PLLC-CRM` under `pllc-business`:

```bash
cd ~/Dev/pllc-business/new-york-pllc
```

If your shell is already in `PLLC-CRM`:

```bash
cd ../new-york-pllc
```

## One-time setup

```bash
python3 -m venv .venv-ga4
.venv-ga4/bin/pip install google-analytics-data
```

GA4 → **Admin** (gear) → **Property settings** → copy **Property ID** (numeric, e.g. `412345678`).  
That is **not** the measurement id `G-X6Y3R8ZTXS` in the site source.

Auth (user ADC):

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly
```

`gcloud` **rejects** `--scopes` if `cloud-platform` is missing. On the consent screen, approve **all** requested access (including Analytics read-only if shown as a separate checkbox).

If you see a warning that `analytics.readonly` will be blocked for the default gcloud client, use a **service account** instead:

1. GCP → IAM → Service account → key JSON  
2. GA4 Admin → Property access management → add that email as **Viewer**  
3. `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json`

## Pull

```bash
export GA4_PROPERTY_ID=PASTE_NUMERIC_PROPERTY_ID_HERE
.venv-ga4/bin/python scripts/pull_checkout_funnel_by_device.py --days 60
```

This overwrites this file with the table when it succeeds.

## What gets measured

| Step | Source | GA4 |
|------|--------|-----|
| Order page views | `/order`, `/order-llc` | `screenPageViews` by `deviceCategory` |
| Purchase | Confirmation gtag | `purchase` event by `deviceCategory` |
| Checkout started | Vercel only | Use Vercel → Analytics → `checkout_start` by device |

**F2 read:** largest gap between mobile and desktop on purchase ÷ order-page views.
