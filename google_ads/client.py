"""Shared Google Ads API client and query helpers."""

from __future__ import annotations

import os
from datetime import date, timedelta
from pathlib import Path

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

BASE = Path(__file__).resolve().parent.parent
ENV_PATH = BASE / ".env"


def load_client() -> GoogleAdsClient:
    load_dotenv(ENV_PATH)
    required = [
        "GOOGLE_ADS_DEVELOPER_TOKEN",
        "GOOGLE_ADS_CLIENT_ID",
        "GOOGLE_ADS_CLIENT_SECRET",
        "GOOGLE_ADS_REFRESH_TOKEN",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
    ]
    missing = [key for key in required if not os.environ.get(key, "").strip()]
    if missing:
        raise SystemExit(
            "Missing in .env: "
            + ", ".join(missing)
            + "\nRun google_ads_auth.py after creating OAuth credentials."
        )

    config = {
        "developer_token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": os.environ["GOOGLE_ADS_LOGIN_CUSTOMER_ID"],
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(config)


def customer_id(explicit: str | None = None) -> str:
    load_dotenv(ENV_PATH)
    raw = (explicit or os.environ.get("GOOGLE_ADS_CUSTOMER_ID", "")).strip()
    if not raw:
        raise SystemExit(
            "Set GOOGLE_ADS_CUSTOMER_ID in .env or pass --customer-id."
        )
    return raw.replace("-", "")


def parse_date_range(
    *,
    days: int | None,
    start: str | None,
    end: str | None,
) -> tuple[str, str]:
    if start and end:
        return start, end
    if start or end:
        raise SystemExit("Provide both --start and --end, or use --days.")
    span = days if days is not None else 30
    end_date = date.today()
    start_date = end_date - timedelta(days=span - 1)
    return start_date.isoformat(), end_date.isoformat()


def run_query(client: GoogleAdsClient, customer_id: str, query: str):
    service = client.get_service("GoogleAdsService")
    return service.search_stream(customer_id=customer_id, query=query)
