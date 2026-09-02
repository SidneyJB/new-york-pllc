"""Set Target CPA on a portfolio bidding strategy (dry-run by default)."""

from __future__ import annotations

import argparse
import sys

from google.ads.googleads.errors import GoogleAdsException
from google.protobuf import field_mask_pb2

from google_ads.client import customer_id, load_client

PORTFOLIO_ID = "12148056412"
PORTFOLIO_NAME = "NYPLLC Search Portfolio"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strategy-id", default=PORTFOLIO_ID)
    parser.add_argument("--tcpa-usd", type=float, required=True)
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Apply the mutate. Without this flag, print current vs target only.",
    )
    args = parser.parse_args(argv)

    if args.tcpa_usd <= 0:
        print("FAIL --tcpa-usd must be positive")
        return 1

    micros = int(round(args.tcpa_usd * 1_000_000))
    client = load_client()
    cid = customer_id()
    ga = client.get_service("GoogleAdsService")
    resource = client.get_service("BiddingStrategyService").bidding_strategy_path(
        cid, args.strategy_id
    )
    query = f"""
        SELECT
          bidding_strategy.id,
          bidding_strategy.name,
          bidding_strategy.type,
          bidding_strategy.target_cpa.target_cpa_micros
        FROM bidding_strategy
        WHERE bidding_strategy.id = {args.strategy_id}
    """
    rows = list(ga.search(customer_id=cid, query=query))
    if not rows:
        print(f"FAIL no bidding strategy {args.strategy_id}")
        return 1
    row = rows[0]
    name = row.bidding_strategy.name
    current = row.bidding_strategy.target_cpa.target_cpa_micros
    print(
        f"{resource}  {name}  current_tcpa=${current / 1_000_000:.2f}  "
        f"({current})  →  ${args.tcpa_usd:.2f}  ({micros})"
    )
    if name != PORTFOLIO_NAME:
        print(f"WARN expected name {PORTFOLIO_NAME!r}, got {name!r}")
    if not args.execute:
        print("dry-run (pass --execute to mutate)")
        return 0
    if current == micros:
        print("already at target; no mutate")
        return 0

    service = client.get_service("BiddingStrategyService")
    op = client.get_type("BiddingStrategyOperation")
    strategy = op.update
    strategy.resource_name = resource
    strategy.target_cpa.target_cpa_micros = micros
    op.update_mask.CopyFrom(field_mask_pb2.FieldMask(paths=["target_cpa.target_cpa_micros"]))
    try:
        service.mutate_bidding_strategies(customer_id=cid, operations=[op])
    except GoogleAdsException as exc:
        msgs = "; ".join(e.message for e in exc.failure.errors)
        print(f"FAIL {msgs}")
        return 1
    print("OK mutated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
