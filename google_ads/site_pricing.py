"""Expected ad prices — keep in sync with web/src/lib/constants and foreign-states.ts."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class PriceOffering:
    header: str
    description: str
    price_dollars: float
    final_url: str
    unit: str | None = None  # None or "PER_MONTH"


# Shared 3-offer price extension (operating plan §1.4).
SHARED_PRICE_ASSET_NAME_TEMPLATE = (
    "NYPLLC Prices v{version} — Formation / VA / Foreign from ${foreign_floor}"
)
SHARED_PRICE_CAMPAIGNS = (
    "Sales-Search-1",
    "01_Core_Exact_NY",
    "02_Professions_NY",
    "03_ForeignQual_US",
)

FORMATION_PRICE = 885
VIRTUAL_ADDRESS_MONTHLY = 50
FOREIGN_QUAL_FLOOR = 895  # min(foreign-states.ts pllcPrice) — Colorado Sep 2026

# Deferred in price assets until dedicated landing URLs exist (plan §1.4).
DEFERRED_AD_PRICES = {
    "DBA / Assumed Name": 199,
    "S Corp election": 195,
    "RA CoC / year-2": 99,
}

FOREIGN_STATE_PRICES = {
    "Colorado": 895,
    "California": 905,
    "Florida": 930,
    "Texas": 930,
    "New Jersey": 995,
    "Pennsylvania": 995,
    "Connecticut": 1000,
}


def shared_price_offerings() -> list[PriceOffering]:
    return [
        PriceOffering(
            header="PLLC Formation",
            description="All-inclusive flat fee",
            price_dollars=FORMATION_PRICE,
            final_url="https://www.nypllc.com/order",
        ),
        PriceOffering(
            header="Virtual NY Address",
            description="Mail forwarding / month",
            price_dollars=VIRTUAL_ADDRESS_MONTHLY,
            final_url="https://www.nypllc.com/virtual-address-services",
            unit="PER_MONTH",
        ),
        PriceOffering(
            header="Foreign PLLC Into NY",
            description="Qualify by origin state",
            price_dollars=FOREIGN_QUAL_FLOOR,
            final_url="https://www.nypllc.com/foreign-pllc",
        ),
    ]


def shared_price_asset_name(version: int = 4) -> str:
    return SHARED_PRICE_ASSET_NAME_TEMPLATE.format(
        version=version,
        foreign_floor=int(FOREIGN_QUAL_FLOOR),
    )
