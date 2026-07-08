"""Google Ads GAQL report definitions."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Report:
    slug: str
    title: str
    resource: str
    fields: tuple[str, ...]
    where: tuple[str, ...] = ()
    order_by: tuple[str, ...] = ()
    dated: bool = True
    compat_filename: str | None = None
    tags: tuple[str, ...] = field(default_factory=tuple)

COMMON_METRICS = (
    "metrics.impressions",
    "metrics.clicks",
    "metrics.ctr",
    "metrics.average_cpc",
    "metrics.cost_micros",
    "metrics.conversions",
    "metrics.conversions_by_conversion_date",
    "metrics.all_conversions",
    "metrics.cost_per_conversion",
    "metrics.conversions_from_interactions_rate",
    "metrics.absolute_top_impression_percentage",
    "metrics.top_impression_percentage",
)

BASIC_METRICS = (
    "metrics.impressions",
    "metrics.clicks",
    "metrics.ctr",
    "metrics.average_cpc",
    "metrics.cost_micros",
    "metrics.conversions",
)

SEARCH_TERM_METRICS = BASIC_METRICS

SEARCH_AUCTION_METRICS = (
    "metrics.search_impression_share",
    "metrics.search_rank_lost_impression_share",
    "metrics.search_budget_lost_impression_share",
)

CAMPAIGN_METRICS = (
    *BASIC_METRICS,
    "metrics.conversions_by_conversion_date",
    "metrics.all_conversions",
    "metrics.cost_per_conversion",
    "metrics.conversions_from_interactions_rate",
    "metrics.absolute_top_impression_percentage",
    "metrics.top_impression_percentage",
    *SEARCH_AUCTION_METRICS,
)

REPORTS: dict[str, Report] = {}


def _register(report: Report) -> Report:
    REPORTS[report.slug] = report
    return report


_register(
    Report(
        slug="keywords",
        title="Keyword performance (daily)",
        resource="keyword_view",
        fields=(
            "segments.date",
            "campaign.name",
            "campaign.status",
            "ad_group.name",
            "ad_group.status",
            "ad_group_criterion.criterion_id",
            "ad_group_criterion.status",
            "ad_group_criterion.system_serving_status",
            "ad_group_criterion.cpc_bid_micros",
            "ad_group_criterion.effective_cpc_bid_micros",
            "ad_group_criterion.keyword.text",
            "ad_group_criterion.keyword.match_type",
            *COMMON_METRICS,
        ),
        where=("campaign.status != 'REMOVED'", "ad_group_criterion.negative = FALSE"),
        order_by=("segments.date", "campaign.name", "ad_group.name"),
        compat_filename="Ads - kw_daily (api).csv",
        tags=("performance", "search", "core"),
    )
)

_register(
    Report(
        slug="search-terms",
        title="Search terms (daily)",
        resource="search_term_view",
        fields=(
            "segments.date",
            "campaign.name",
            "ad_group.name",
            "search_term_view.search_term",
            "search_term_view.status",
            "segments.search_term_match_type",
            *SEARCH_TERM_METRICS,
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "campaign.name", "ad_group.name"),
        compat_filename="Ads - search_terms_daily (api).csv",
        tags=("performance", "search", "core"),
    )
)

_register(
    Report(
        slug="campaigns",
        title="Campaign performance (daily)",
        resource="campaign",
        fields=(
            "segments.date",
            "campaign.id",
            "campaign.name",
            "campaign.status",
            "campaign.advertising_channel_type",
            "campaign.bidding_strategy_type",
            "campaign_budget.amount_micros",
            *CAMPAIGN_METRICS,
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "campaign.name"),
        tags=("performance",),
    )
)

_register(
    Report(
        slug="ad-groups",
        title="Ad group performance (daily)",
        resource="ad_group",
        fields=(
            "segments.date",
            "campaign.name",
            "campaign.status",
            "ad_group.id",
            "ad_group.name",
            "ad_group.status",
            "ad_group.type",
            "ad_group.cpc_bid_micros",
            "ad_group.effective_cpc_bid_micros",
            *COMMON_METRICS,
        ),
        where=("campaign.status != 'REMOVED'", "ad_group.status != 'REMOVED'"),
        order_by=("segments.date", "campaign.name", "ad_group.name"),
        tags=("performance",),
    )
)

_register(
    Report(
        slug="ads",
        title="Ad performance (daily)",
        resource="ad_group_ad",
        fields=(
            "segments.date",
            "campaign.name",
            "ad_group.name",
            "ad_group_ad.ad.id",
            "ad_group_ad.ad.type",
            "ad_group_ad.ad.name",
            "ad_group_ad.status",
            "ad_group_ad.ad.final_urls",
            *SEARCH_TERM_METRICS,
        ),
        where=(
            "campaign.status != 'REMOVED'",
            "ad_group.status != 'REMOVED'",
            "ad_group_ad.status != 'REMOVED'",
        ),
        order_by=("segments.date", "campaign.name", "ad_group.name"),
        tags=("performance",),
    )
)

_register(
    Report(
        slug="campaign-hourly",
        title="Campaign performance by hour",
        resource="campaign",
        fields=(
            "segments.date",
            "segments.hour",
            "campaign.name",
            "campaign.status",
            *BASIC_METRICS,
            "metrics.absolute_top_impression_percentage",
            "metrics.top_impression_percentage",
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "segments.hour", "campaign.name"),
        tags=("performance", "timing"),
    )
)

_register(
    Report(
        slug="devices",
        title="Campaign performance by device",
        resource="campaign",
        fields=(
            "segments.date",
            "segments.device",
            "campaign.name",
            *SEARCH_TERM_METRICS,
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "segments.device", "campaign.name"),
        tags=("performance", "segmentation"),
    )
)

_register(
    Report(
        slug="geo",
        title="Geographic performance (daily)",
        resource="geographic_view",
        fields=(
            "segments.date",
            "campaign.name",
            "campaign.status",
            "ad_group.name",
            "geographic_view.country_criterion_id",
            "geographic_view.location_type",
            *SEARCH_TERM_METRICS,
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "campaign.name"),
        tags=("performance", "segmentation"),
    )
)

_register(
    Report(
        slug="landing-pages",
        title="Landing page performance (daily)",
        resource="landing_page_view",
        fields=(
            "segments.date",
            "campaign.name",
            "campaign.status",
            "ad_group.name",
            "landing_page_view.unexpanded_final_url",
            *SEARCH_TERM_METRICS,
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "campaign.name"),
        tags=("performance",),
    )
)

_register(
    Report(
        slug="conversion-actions",
        title="Conversions by conversion action (daily)",
        resource="campaign",
        fields=(
            "segments.date",
            "campaign.name",
            "segments.conversion_action",
            "segments.conversion_action_name",
            "metrics.conversions",
            "metrics.conversions_by_conversion_date",
            "metrics.all_conversions",
            "metrics.conversions_value",
            "metrics.all_conversions_value",
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("segments.date", "campaign.name"),
        tags=("conversions",),
    )
)

_register(
    Report(
        slug="keyword-settings",
        title="Keyword inventory (current settings)",
        resource="ad_group_criterion",
        fields=(
            "campaign.name",
            "campaign.status",
            "ad_group.name",
            "ad_group.status",
            "ad_group_criterion.criterion_id",
            "ad_group_criterion.status",
            "ad_group_criterion.system_serving_status",
            "ad_group_criterion.negative",
            "ad_group_criterion.cpc_bid_micros",
            "ad_group_criterion.effective_cpc_bid_micros",
            "ad_group_criterion.keyword.text",
            "ad_group_criterion.keyword.match_type",
            "ad_group_criterion.approval_status",
        ),
        where=(
            "ad_group_criterion.type = 'KEYWORD'",
            "ad_group_criterion.negative = FALSE",
            "ad_group_criterion.status != 'REMOVED'",
            "campaign.status != 'REMOVED'",
        ),
        order_by=("campaign.name", "ad_group.name"),
        dated=False,
        tags=("structure", "search"),
    )
)

_register(
    Report(
        slug="negative-keywords",
        title="Negative keywords (campaign + ad group)",
        resource="ad_group_criterion",
        fields=(
            "campaign.name",
            "ad_group.name",
            "ad_group_criterion.criterion_id",
            "ad_group_criterion.negative",
            "ad_group_criterion.keyword.text",
            "ad_group_criterion.keyword.match_type",
            "ad_group_criterion.status",
        ),
        where=(
            "ad_group_criterion.type = 'KEYWORD'",
            "ad_group_criterion.negative = TRUE",
            "ad_group_criterion.status != 'REMOVED'",
        ),
        order_by=("campaign.name", "ad_group.name"),
        dated=False,
        tags=("structure", "search"),
    )
)

_register(
    Report(
        slug="campaign-settings",
        title="Campaign settings snapshot",
        resource="campaign",
        fields=(
            "campaign.id",
            "campaign.name",
            "campaign.status",
            "campaign.advertising_channel_type",
            "campaign.bidding_strategy_type",
            "campaign_budget.amount_micros",
            "campaign_budget.delivery_method",
            "campaign_budget.period",
        ),
        where=("campaign.status != 'REMOVED'",),
        order_by=("campaign.name",),
        dated=False,
        tags=("structure",),
    )
)

_register(
    Report(
        slug="change-history",
        title="Account change history",
        resource="change_event",
        fields=(
            "change_event.change_date_time",
            "change_event.user_email",
            "change_event.client_type",
            "change_event.change_resource_type",
            "change_event.resource_change_operation",
            "change_event.changed_fields",
            "change_event.old_resource",
            "change_event.new_resource",
            "change_event.campaign",
            "change_event.ad_group",
        ),
        where=(
            "change_event.change_date_time >= '{start} 00:00:00'",
            "change_event.change_date_time <= '{end} 23:59:59'",
        ),
        order_by=("change_event.change_date_time",),
        tags=("audit",),
    )
)

CORE_REPORTS = ("keywords", "search-terms")
DEFAULT_REPORTS = CORE_REPORTS
ALL_REPORTS = tuple(REPORTS.keys())

PRESETS: dict[str, tuple[str, ...]] = {
    "core": CORE_REPORTS,
    "performance": tuple(
        slug for slug, report in REPORTS.items() if "performance" in report.tags
    ),
    "structure": tuple(
        slug for slug, report in REPORTS.items() if "structure" in report.tags
    ),
    "all": ALL_REPORTS,
}


def resolve_report_names(names: list[str]) -> list[str]:
    resolved: list[str] = []
    seen: set[str] = set()
    for name in names:
        if name in PRESETS:
            items = PRESETS[name]
        elif name in REPORTS:
            items = (name,)
        else:
            known = ", ".join(sorted({*REPORTS.keys(), *PRESETS.keys()}))
            raise SystemExit(f"Unknown report or preset: {name}\nKnown: {known}")
        for slug in items:
            if slug not in seen:
                seen.add(slug)
                resolved.append(slug)
    return resolved


def get_report(slug: str) -> Report:
    try:
        return REPORTS[slug]
    except KeyError as exc:
        raise SystemExit(f"Unknown report: {slug}") from exc
