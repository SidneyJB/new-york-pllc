#!/usr/bin/env python3
"""One-time OAuth flow to obtain a Google Ads API refresh token."""

from __future__ import annotations

import os
import re
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from dotenv import load_dotenv
from google_auth_oauthlib.flow import InstalledAppFlow

BASE = Path(__file__).parent
ENV_PATH = BASE / ".env"
SCOPES = ["https://www.googleapis.com/auth/adwords"]
REDIRECT_URI = "http://localhost:8080/"


def extract_code(raw: str) -> str:
    raw = raw.strip()
    if "code=" in raw:
        query = urlparse(raw).query
        code = parse_qs(query).get("code", [""])[0]
        if code:
            return code
    match = re.search(r"4/[0-9A-Za-z\-_]+", raw)
    if match:
        return match.group(0)
    return raw


def save_refresh_token(refresh_token: str) -> None:
    lines = ENV_PATH.read_text(encoding="utf-8").splitlines()
    out: list[str] = []
    replaced = False
    for line in lines:
        if line.startswith("GOOGLE_ADS_REFRESH_TOKEN="):
            out.append(f"GOOGLE_ADS_REFRESH_TOKEN={refresh_token}")
            replaced = True
        else:
            out.append(line)
    if not replaced:
        out.append(f"GOOGLE_ADS_REFRESH_TOKEN={refresh_token}")
    ENV_PATH.write_text("\n".join(out) + "\n", encoding="utf-8")


def main() -> None:
    load_dotenv(ENV_PATH)

    client_id = os.environ.get("GOOGLE_ADS_CLIENT_ID", "").strip()
    client_secret = os.environ.get("GOOGLE_ADS_CLIENT_SECRET", "").strip()
    if not client_id or not client_secret:
        raise SystemExit(
            "Set GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET in .env first."
        )

    flow = InstalledAppFlow.from_client_config(
        {
            "installed": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [REDIRECT_URI, "http://127.0.0.1:8080/"],
            }
        },
        scopes=SCOPES,
    )
    flow.redirect_uri = REDIRECT_URI

    auth_url, _ = flow.authorization_url(
        access_type="offline",
        prompt="consent",
    )

    print("\n1. Open this URL in your browser (use contact@nypllc.com):\n")
    print(auth_url)
    print(
        "\n2. After approving, your browser will redirect to localhost and may show "
        "'can't connect' — that's fine."
    )
    print("3. Copy the FULL redirect URL from the address bar (starts with http://localhost:8080/?code=...)")
    print("   Or paste just the code value.\n")

    pasted = input("Paste redirect URL or code here: ")
    code = extract_code(pasted)
    if not code:
        raise SystemExit("Could not parse an authorization code from your input.")

    flow.fetch_token(code=code)
    refresh_token = flow.credentials.refresh_token
    if not refresh_token:
        raise SystemExit(
            "No refresh token returned. Revoke app access at "
            "https://myaccount.google.com/permissions and run again."
        )

    save_refresh_token(refresh_token)
    print("\nSaved GOOGLE_ADS_REFRESH_TOKEN to .env")
    print("Run: .venv/bin/python google_ads_cli.py pull core --compat")


if __name__ == "__main__":
    main()
