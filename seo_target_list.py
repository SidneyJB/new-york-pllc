#!/usr/bin/env python3
"""
Build a ranked SEO target list from cannibalization join + GSC impressions.

Joins the ads_incrementality cannibalization CSV with a Search Console Queries
export to size the organic prize (impressions), maps each query to the page
that should rank, and scores priority for a concrete SEO work queue.

Examples:
  .venv/bin/python seo_target_list.py \\
    --cannibalization cannibalization-2026-08-04.csv \\
    --gsc gsc/Queries_2025-10-27_to_2026-08-02.csv \\
    --out-csv seo-target-list-2026-08-04.csv \\
    --out-md seo-target-list-2026-08-04.md
"""

from __future__ import annotations

import argparse
import csv
import math
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

# Paid-spend window used to produce the cannibalization export (days).
DEFAULT_PAID_WINDOW_DAYS = 281

GSC_QUERY_COLS = ("top queries", "query", "queries", "search query")
GSC_CLICK_COLS = ("clicks", "url clicks")
GSC_IMPR_COLS = ("impressions",)
GSC_CTR_COLS = ("ctr",)
GSC_POS_COLS = ("position", "average position", "avg. position", "avg position")

# --------------------------------------------------------------------------
# CSV helpers (mirrors ads_incrementality.py — kept local to avoid Ads deps)
# --------------------------------------------------------------------------


def _norm(q: str) -> str:
    return re.sub(r"\s+", " ", q.strip().lower())


def _pick(header: list[str], candidates: tuple[str, ...]) -> int | None:
    lowered = [h.strip().lower().lstrip("\ufeff") for h in header]
    for cand in candidates:
        if cand in lowered:
            return lowered.index(cand)
    return None


def _to_float(raw: str) -> float:
    cleaned = (raw or "").strip().replace("%", "").replace(",", "")
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def load_gsc(path: Path) -> dict[str, dict]:
    if not path.exists():
        raise SystemExit(f"GSC export not found: {path}")

    with path.open(newline="", encoding="utf-8-sig") as fh:
        rows = list(csv.reader(fh))
    if not rows:
        raise SystemExit(f"GSC export is empty: {path}")

    header = rows[0]
    qi = _pick(header, GSC_QUERY_COLS)
    ci = _pick(header, GSC_CLICK_COLS)
    ii = _pick(header, GSC_IMPR_COLS)
    ti = _pick(header, GSC_CTR_COLS)
    pi = _pick(header, GSC_POS_COLS)

    if qi is None:
        raise SystemExit(
            f"Could not find query column in {path}.\nHeader was: {header}"
        )

    out: dict[str, dict] = {}
    for row in rows[1:]:
        if not row or len(row) <= qi:
            continue
        q = _norm(row[qi])
        if not q:
            continue
        out[q] = {
            "impressions": _to_float(row[ii]) if ii is not None else 0.0,
            "clicks": _to_float(row[ci]) if ci is not None else 0.0,
            "ctr": _to_float(row[ti]) if ti is not None else 0.0,
            "position": _to_float(row[pi]) if pi is not None else 0.0,
        }
    return out


def load_cannibalization(path: Path) -> list[dict]:
    if not path.exists():
        raise SystemExit(f"Cannibalization CSV not found: {path}")

    with path.open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        rows = []
        for row in reader:
            q = _norm(row.get("query", ""))
            if not q:
                continue
            pos_raw = (row.get("organic_position") or "").strip()
            rows.append(
                {
                    "query": q,
                    "bucket": (row.get("bucket") or "").strip(),
                    "organic_position": float(pos_raw) if pos_raw else None,
                    "organic_clicks": int(_to_float(row.get("organic_clicks", "0"))),
                    "paid_clicks": int(_to_float(row.get("paid_clicks", "0"))),
                    "paid_cost": _to_float(row.get("paid_cost", "0")),
                    "paid_conv": _to_float(row.get("paid_conv", "0")),
                    "campaigns": (row.get("campaigns") or "").strip(),
                }
            )
    if not rows:
        raise SystemExit(f"No rows in {path}")
    return rows


# --------------------------------------------------------------------------
# Site URL map (from web/src/app/ routes)
# --------------------------------------------------------------------------

PROFESSION_SLUGS: list[tuple[str, str]] = [
    ("nurse practitioner", "/professions/nurse-practitioner"),
    ("nurse-practitioner", "/professions/nurse-practitioner"),
    ("speech language pathologist", "/professions/speech-language-pathologist"),
    ("speech-language-pathologist", "/professions/speech-language-pathologist"),
    ("slp", "/professions/speech-language-pathologist"),
    ("physical therapist", "/professions/physical-therapist"),
    ("physical therapy", "/professions/physical-therapist"),
    ("occupational therapist", "/professions/occupational-therapist"),
    ("massage therapist", "/professions/massage-therapist"),
    ("massage therapy", "/professions/massage-therapist"),
    ("psychologist", "/professions/psychologist"),
    ("chiropractor", "/professions/chiropractor"),
    ("veterinarian", "/professions/veterinarian"),
    ("optometrist", "/professions/optometrist"),
    ("pharmacist", "/professions/pharmacist"),
    ("podiatrist", "/professions/podiatrist"),
    ("architect", "/professions/architect"),
    ("engineer", "/professions/engineer"),
    ("engineers", "/professions/engineer"),
    ("engineering", "/professions/engineer"),
    ("professional engineer", "/professions/engineer"),
    ("physician", "/professions/physician"),
    ("dentist", "/professions/dentist"),
    ("dentistry", "/professions/dentist"),
    ("therapist", "/professions/mhc"),
    ("counselor", "/professions/mhc"),
    ("mental health counselor", "/professions/mhc"),
    ("lmhc", "/professions/mhc"),
    ("lmsw", "/professions/mhc"),
    ("mhc", "/professions/mhc"),
    ("lcsw", "/professions/lcsw"),
    ("social work", "/professions/lcsw"),
    ("cpa", "/professions/cpa"),
    ("accountant", "/professions/cpa"),
    ("lawyer", "/professions/law"),
    ("attorney", "/professions/law"),
    ("law firm", "/professions/law"),
]

FOREIGN_STATE_SLUGS: dict[str, str] = {
    "new jersey": "/foreign-pllc/new-jersey",
    "new-jersey": "/foreign-pllc/new-jersey",
    "nj": "/foreign-pllc/new-jersey",
    "pennsylvania": "/foreign-pllc/pennsylvania",
    "pa": "/foreign-pllc/pennsylvania",
    "florida": "/foreign-pllc/florida",
    "fl": "/foreign-pllc/florida",
    "texas": "/foreign-pllc/texas",
    "tx": "/foreign-pllc/texas",
    "connecticut": "/foreign-pllc/connecticut",
    "ct": "/foreign-pllc/connecticut",
}

NY_MARKERS = re.compile(
    r"\b(new york|new-york|nyc|nys|ny state|state of new york|in ny|ny pllc|pllc ny)\b",
    re.I,
)

OTHER_STATE_MARKERS = re.compile(
    r"\b("
    r"texas|florida|california|pennsylvania|new jersey|connecticut|"
    r"ohio|illinois|georgia|virginia|massachusetts|michigan|"
    r"north carolina|arizona|colorado|washington|oregon|nevada|"
    r"tennessee|maryland|minnesota|wisconsin|missouri|indiana|"
    r"alabama|louisiana|kentucky|south carolina|oklahoma|iowa|"
    r"arkansas|utah|mississippi|kansas|new mexico|nebraska|"
    r"idaho|hawaii|maine|montana|delaware|south dakota|north dakota|"
    r"alaska|vermont|wyoming|rhode island|west virginia|new hampshire|"
    r"\btx\b|\bfl\b|\bca\b|\bpa\b|\bnj\b|\bct\b"
    r")\b",
    re.I,
)

RESEARCH_PATTERNS = [
    re.compile(r"^what is\b"),
    re.compile(r"^what's\b"),
    re.compile(r"^what does\b"),
    re.compile(r"\bstands for\b"),
    re.compile(r"\bstand for\b"),
    re.compile(r"\bdefinition of\b"),
    re.compile(r"\bmeaning of\b"),
    re.compile(r"\bmeaning\b"),
    re.compile(r"\bvs\.?\b"),
    re.compile(r"\bversus\b"),
    re.compile(r"\bcompared to\b"),
    re.compile(r"\bdifference between\b"),
    re.compile(r"\bbenefits of\b"),
    re.compile(r"^how does a pllc\b"),
    re.compile(r"^how does pllc\b"),
]

JOB_SCHOOL_LICENSE_PATTERNS = [
    re.compile(r"\bjob(s)?\b"),
    re.compile(r"\bsalary\b"),
    re.compile(r"\bschool\b"),
    re.compile(r"\buniversity\b"),
    re.compile(r"\bceu\b"),
    re.compile(r"\bcontinuing education\b"),
    re.compile(r"\bsupervision hours?\b"),
    re.compile(r"\bsupervision ny\b"),
    re.compile(r"\bprep course\b"),
    re.compile(r"\bbootcamp\b"),
    re.compile(r"\bstudy guide\b"),
    re.compile(r"\bstudy group\b"),
    re.compile(r"\bexam prep\b"),
    re.compile(r"\bhow to become\b"),
    re.compile(r"\bhow to get (an? )?(lcsw|lmhc|lmsw|license)\b"),
    re.compile(r"\bapplication (for|process)\b"),
    re.compile(r"\bnys (lcsw|lmhc|lmsw) application\b"),
    re.compile(r"\blicense (lookup|search|verification)\b"),
    re.compile(r"\blookup ny\b"),
    re.compile(r"\bpllc lookup\b"),
]

JUNK_PATTERNS = [
    re.compile(r"^nypllc(\.com)?(\s|$)"),
    re.compile(r"^yes$"),
    re.compile(r"^flat fee$"),
    re.compile(r"^whic one$"),
    re.compile(r"^for nys$"),
    re.compile(r"^what do i need to do$"),
    re.compile(r"\breviews?\b"),
    re.compile(
        r"\b(legalzoom|legal zoom|zen\s*business|zenbusiness|incfile|northwest registered|"
        r"windsor corporate|capitol services|rivky weiss|jennisel marte|"
        r"sullivan & cromwell|sterlington)\b"
    ),
    re.compile(r"^p l l c$"),
    re.compile(r"^p llc$"),
    re.compile(r"^limited liability$"),
    re.compile(r"^(list|which|what) (online|are|do)\b"),
    re.compile(r"\bcompanies in new york that\b"),
    re.compile(r"\bpricing strategies\b"),
    re.compile(r"\bcustomer loyalty\b"),
]

MAX_QUERY_LEN = 80

COST_PATTERN = re.compile(r"\b(cost|price|pricing|fee|fees|how much)\b", re.I)
HOW_LONG_PATTERN = re.compile(r"\bhow long\b", re.I)
HOW_TO_FORM_PATTERN = re.compile(
    r"\b(how to (form|start|create|set up|open|register)|forming a|form a|start a|create a)\b",
    re.I,
)
NYSED_PATTERN = re.compile(r"\bnysed\b", re.I)
FOREIGN_PATTERN = re.compile(
    r"\b(foreign (qualification|llc|corporation|entity|registration)|"
    r"register foreign|doing business in|authorization to do business|"
    r"qualification to do business|certificate of authority)\b",
    re.I,
)
# Plain-LLC work is deliberately ceded to the sister company (cheapnewyorkllc).
# /order-llc exists to take orders, not to rank — it is never an SEO target.
# These stay visible in the report so nobody re-derives them as an opportunity.
OUT_OF_SCOPE_LLC = "OUT OF SCOPE — LLC (sister company)"

PUBLICATION_PATTERN = re.compile(r"\b(publication|publish)\b", re.I)
CHECKLIST_PATTERN = re.compile(r"\bchecklist\b", re.I)
VIRTUAL_ADDRESS_PATTERN = re.compile(
    r"\b(virtual address|virtual office|virtual business address|virtual mail|"
    r"registered agent|registered (business )?address|business address|"
    r"mailing address|mail forwarding)\b",
    re.I,
)


def _is_research_query(q: str) -> bool:
    if COST_PATTERN.search(q):
        return False
    return any(p.search(q) for p in RESEARCH_PATTERNS)


def _is_job_school_license(q: str) -> bool:
    return any(p.search(q) for p in JOB_SCHOOL_LICENSE_PATTERNS)


def _is_junk(q: str) -> bool:
    if len(q) > MAX_QUERY_LEN:
        return True
    return any(p.search(q) for p in JUNK_PATTERNS)


def _is_other_state_formation(q: str) -> bool:
    """Exclude queries about forming/operating in another state (not NY foreign qual)."""
    if NY_MARKERS.search(q):
        return False
    if FOREIGN_PATTERN.search(q):
        # "foreign qualification texas" = qualify IN texas, not our NY service
        for state in FOREIGN_STATE_SLUGS:
            if re.search(rf"\b{re.escape(state)}\b", q, re.I):
                return True
        return False
    if OTHER_STATE_MARKERS.search(q):
        return True
    return False


def _match_profession(q: str) -> str | None:
    for term, url in sorted(PROFESSION_SLUGS, key=lambda x: -len(x[0])):
        if re.search(rf"\b{re.escape(term)}\b", q, re.I):
            return url
    return None


def _match_foreign_url(q: str) -> str | None:
    if not FOREIGN_PATTERN.search(q):
        return None
    for state, url in sorted(FOREIGN_STATE_SLUGS.items(), key=lambda x: -len(x[0])):
        if re.search(rf"\b{re.escape(state)}\b", q, re.I):
            return url
    if NY_MARKERS.search(q) or re.search(r"\bnew york\b", q, re.I):
        return "/foreign-pllc"
    if re.search(r"\bny\b", q, re.I):
        return "/foreign-pllc"
    # Stateless foreign-qual queries are NY queries here — the whole site is
    # NY-scoped and other-state queries are already excluded upstream.
    return "/foreign-pllc"


def suggest_target_url(q: str) -> str:
    if _is_junk(q):
        return "GAP — no page"

    if COST_PATTERN.search(q):
        return "/ny-pllc-cost"

    if HOW_LONG_PATTERN.search(q):
        return "/how-long-to-form-a-pllc-in-ny"

    if NYSED_PATTERN.search(q):
        return "/nysed-approval-times"

    foreign = _match_foreign_url(q)
    if foreign:
        return foreign

    prof = _match_profession(q)
    if prof:
        return prof

    if VIRTUAL_ADDRESS_PATTERN.search(q):
        return "/virtual-address-services"

    # Publication is not a standalone offer — we publish (Rockland) as part of
    # formation, so these route to the formation page for the entity type rather
    # than to a publishing-only page the SEO plan explicitly forbids.
    if PUBLICATION_PATTERN.search(q):
        if re.search(r"\bpllc\b", q, re.I):
            return "/"
        if re.search(r"\bllc\b", q, re.I):
            return OUT_OF_SCOPE_LLC
        return "GAP — no page"

    if CHECKLIST_PATTERN.search(q):
        return "GAP — no page"

    if HOW_TO_FORM_PATTERN.search(q):
        return "/how-to-form-a-pllc-in-ny"

    # Core commercial formation / service queries
    if re.search(
        r"\b(pllc|professional (llc|corporation|limited liability)|formation|"
        r"articles of organization|operating agreement|registered agent|"
        r"file|filing|ein|biennial)\b",
        q,
        re.I,
    ):
        if re.search(r"\bllc\b", q, re.I) and not re.search(r"\bpllc\b", q, re.I):
            return OUT_OF_SCOPE_LLC
        return "/"

    if re.search(r"\bllc\b", q, re.I):
        return OUT_OF_SCOPE_LLC

    return "GAP — no page"


def is_commercial_target(q: str, row: dict, gsc: dict | None) -> bool:
    if _is_junk(q):
        return False
    if _is_other_state_formation(q):
        return False
    if _is_research_query(q):
        return False
    if _is_job_school_license(q):
        return False

    impressions = gsc["impressions"] if gsc else 0.0
    paid_cost = row["paid_cost"]
    paid_clicks = row["paid_clicks"]

    # Must show commercial signal: paid spend, or meaningful organic demand.
    if paid_cost > 0 or paid_clicks > 0:
        return True
    if impressions >= 10:
        return True
    if row["organic_clicks"] > 0:
        return True

    # Low-volume organic-only: keep if clearly formation/service intent.
    if impressions > 0 and re.search(
        r"\b(pllc|formation|foreign (qualification|llc)|professional (llc|corporation))\b",
        q,
        re.I,
    ):
        return True

    return False


# --------------------------------------------------------------------------
# Priority scoring
# --------------------------------------------------------------------------


def gap_multiplier(position: float | None | str) -> float:
    """
    Winnable-gap weight. Position 11–30 is the sweet spot; deep results are
    harder; page-1 slots still worth pursuing but less incremental than page 2.
    """
    if position is None or position == "" or position == "—":
        return 0.5  # PAID_ONLY — no organic baseline yet
    if isinstance(position, str):
        try:
            position = float(position)
        except ValueError:
            return 0.5
    if position <= 0:
        return 0.5  # PAID_ONLY — no organic baseline yet
    if position <= 10:
        return 0.7
    if position <= 30:
        return 1.0
    if position <= 50:
        return 0.55
    return 0.25


def compute_priority_scores(rows: list[dict]) -> None:
    impr_logs = [math.log1p(r["organic_impressions"]) for r in rows]
    cost_logs = [math.log1p(r["est_annual_paid_cost"]) for r in rows]
    max_impr = max(impr_logs) if impr_logs else 1.0
    max_cost = max(cost_logs) if cost_logs else 1.0

    for r, il, cl in zip(rows, impr_logs, cost_logs):
        impr_n = il / max_impr if max_impr else 0.0
        cost_n = cl / max_cost if max_cost else 0.0
        gap = gap_multiplier(r["organic_position"])
        score = 100.0 * (0.45 * impr_n + 0.35 * cost_n + 0.20 * gap)
        r["priority_score"] = round(score, 1)


def annualize_cost(paid_cost: float, window_days: int) -> float:
    if window_days <= 0:
        return paid_cost
    return paid_cost * 365.0 / window_days


# --------------------------------------------------------------------------
# Build target list
# --------------------------------------------------------------------------

OUTPUT_FIELDS = [
    "query",
    "organic_position",
    "organic_impressions",
    "organic_clicks",
    "organic_ctr",
    "paid_clicks",
    "paid_cost",
    "paid_conv",
    "est_annual_paid_cost",
    "suggested_target_url",
    "priority_score",
]


def build_targets(
    cannibalization: list[dict],
    gsc: dict[str, dict],
    *,
    paid_window_days: int,
) -> list[dict]:
    targets = []
    for row in cannibalization:
        q = row["query"]
        g = gsc.get(q)
        if not is_commercial_target(q, row, g):
            continue

        impressions = g["impressions"] if g else 0.0
        gsc_clicks = int(g["clicks"]) if g else 0
        gsc_ctr = g["ctr"] if g else 0.0
        gsc_pos = g["position"] if g else None

        # Prefer cannibalization organic position when present; else GSC.
        position = row["organic_position"]
        if position is None and gsc_pos:
            position = gsc_pos

        organic_clicks = row["organic_clicks"] or gsc_clicks
        if g and gsc_ctr > 0:
            ctr = gsc_ctr
        elif impressions > 0:
            ctr = round(organic_clicks / impressions * 100, 2)
        else:
            ctr = 0.0

        est_annual = round(annualize_cost(row["paid_cost"], paid_window_days), 2)
        url = suggest_target_url(q)

        targets.append(
            {
                "query": q,
                "organic_position": round(position, 1) if position is not None else "",
                "organic_impressions": int(impressions),
                "organic_clicks": organic_clicks,
                "organic_ctr": round(ctr, 2),
                "paid_clicks": row["paid_clicks"],
                "paid_cost": round(row["paid_cost"], 2),
                "paid_conv": round(row["paid_conv"], 1),
                "est_annual_paid_cost": est_annual,
                "suggested_target_url": url,
                "priority_score": 0.0,
                "bucket": row["bucket"],
            }
        )

    compute_priority_scores(targets)
    targets.sort(key=lambda r: (-r["priority_score"], -r["organic_impressions"], -r["paid_cost"]))
    return targets


# --------------------------------------------------------------------------
# Markdown report
# --------------------------------------------------------------------------


def write_markdown(
    path: Path,
    targets: list[dict],
    *,
    paid_window_days: int,
    cannibalization_path: Path,
    gsc_path: Path,
) -> None:
    out_of_scope = [t for t in targets if t["suggested_target_url"] == OUT_OF_SCOPE_LLC]
    actionable = [t for t in targets if t["suggested_target_url"] != OUT_OF_SCOPE_LLC]

    total_annual = sum(t["est_annual_paid_cost"] for t in actionable)
    total_impr = sum(t["organic_impressions"] for t in actionable)
    oos_annual = sum(t["est_annual_paid_cost"] for t in out_of_scope)
    oos_impr = sum(t["organic_impressions"] for t in out_of_scope)
    gap_items = [t for t in actionable if t["suggested_target_url"] == "GAP — no page"]

    lines = [
        "# SEO Target List — 2026-08-04",
        "",
        f"Generated from [{cannibalization_path.name}]({cannibalization_path}) + "
        f"[{gsc_path.name}]({gsc_path}).",
        "",
        "## Headline numbers",
        "",
        f"- **{len(actionable)}** commercial queries in the work queue",
        f"- **{total_impr:,}** organic impressions at stake (GSC window)",
        f"- **${total_annual:,.0f}** estimated annual paid spend represented "
        f"(`paid_cost` annualised over {paid_window_days} days → ×{365 / paid_window_days:.2f})",
        f"- **{len(gap_items)}** content gaps (`GAP — no page`)",
        f"- **{len(out_of_scope)}** plain-LLC queries held **out of scope** "
        f"({oos_impr:,} impr, ${oos_annual:,.0f}/yr) — see below",
        "",
        "## Priority formula",
        "",
        "```",
        "priority_score = 100 × (0.45 × norm(log1p(impressions))",
        "                      + 0.35 × norm(log1p(est_annual_paid_cost))",
        "                      + 0.20 × gap_multiplier(position))",
        "",
        "gap_multiplier:",
        "  no organic position (PAID_ONLY) → 0.50",
        "  position  1–10                  → 0.70  (page 1 — worth pushing, less upside)",
        "  position 11–30                  → 1.00  (winnable sweet spot)",
        "  position 31–50                  → 0.55",
        "  position 51+                    → 0.25",
        "```",
        "",
        "Normalisation (`norm`) is min-max over the filtered target set.",
        "",
        "## Exclusion rules",
        "",
        "Queries are dropped when they match any of:",
        "",
        "1. **Other-state formation** — targets another US state without NY context "
        "(e.g. `texas pllc`, `foreign qualification florida`). NY foreign-qualification "
        "queries are kept and mapped to `/foreign-pllc`.",
        "2. **Research / definition** — `what is…`, `…vs…`, `stands for`, comparisons. "
        "**Cost/pricing queries are kept** (`pllc cost`, `how much…`).",
        "3. **Jobs / school / licensing path** — salary, CEU, supervision hours, exam prep, "
        "`how to become an lcsw`, license lookup.",
        "4. **Junk / navigational** — brand (`nypllc`), competitor brands (LegalZoom, etc.), "
        "personal names, nonsense GSC tail.",
        "5. **Low signal** — organic-only with &lt;10 impressions and no formation keywords, "
        "and no paid spend.",
        "6. **LLM / spam tail** — queries over 80 characters, or prompt-style patterns "
        "(`list online…`, `which online…`, `pricing strategies`).",
        "",
        "## Top 20 priorities",
        "",
        "| Priority | Query | Pos | Impr | Paid $/yr | Target URL |",
        "|---------:|-------|----:|-----:|----------:|------------|",
    ]

    for t in actionable[:20]:
        pos = t["organic_position"] if t["organic_position"] != "" else "—"
        lines.append(
            f"| {t['priority_score']:.1f} | {t['query']} | {pos} | "
            f"{t['organic_impressions']:,} | ${t['est_annual_paid_cost']:,.0f} | "
            f"`{t['suggested_target_url']}` |"
        )

    lines.extend(["", "## Work batches by target URL", ""])

    by_url: dict[str, list[dict]] = defaultdict(list)
    for t in actionable:
        if t["suggested_target_url"] != "GAP — no page":
            by_url[t["suggested_target_url"]].append(t)

    for url in sorted(
        by_url,
        key=lambda u: (-sum(t["priority_score"] for t in by_url[u]), u),
    ):
        batch = by_url[url]
        batch_impr = sum(t["organic_impressions"] for t in batch)
        batch_annual = sum(t["est_annual_paid_cost"] for t in batch)
        lines.append(f"### `{url}` ({len(batch)} queries)")
        lines.append("")
        lines.append(
            f"_{batch_impr:,} impressions · ${batch_annual:,.0f}/yr paid represented_"
        )
        lines.append("")
        lines.append("| Query | Pos | Impr | Paid $/yr | Score |")
        lines.append("|-------|----:|-----:|----------:|------:|")
        for t in sorted(batch, key=lambda x: -x["priority_score"])[:15]:
            pos = t["organic_position"] if t["organic_position"] != "" else "—"
            lines.append(
                f"| {t['query']} | {pos} | {t['organic_impressions']:,} | "
                f"${t['est_annual_paid_cost']:,.0f} | {t['priority_score']:.1f} |"
            )
        if len(batch) > 15:
            lines.append(f"| _…and {len(batch) - 15} more_ | | | | |")
        lines.append("")

    lines.extend(["## Content commissions (`GAP — no page`)", ""])
    if gap_items:
        lines.append("| Query | Pos | Impr | Paid $/yr | Score |")
        lines.append("|-------|----:|-----:|----------:|------:|")
        for t in sorted(gap_items, key=lambda x: -x["priority_score"]):
            pos = t["organic_position"] if t["organic_position"] != "" else "—"
            lines.append(
                f"| {t['query']} | {pos} | {t['organic_impressions']:,} | "
                f"${t['est_annual_paid_cost']:,.0f} | {t['priority_score']:.1f} |"
            )
    else:
        lines.append("_None._")

    lines.extend(
        [
            "",
            f"## Out of scope — plain LLC ({len(out_of_scope)} queries)",
            "",
            f"_{oos_impr:,} impressions · ${oos_annual:,.0f}/yr paid represented — "
            "**deliberately not pursued.**_",
            "",
            "Plain-LLC formation is ceded to the sister company (cheapnewyorkllc). "
            "`/order-llc` exists to take orders, not to rank, and is never an SEO target. "
            "These queries are listed only so they are not re-discovered as an "
            "opportunity in a future refresh — they are excluded from every headline "
            "number above.",
            "",
        ]
    )
    if out_of_scope:
        lines.append("| Query | Pos | Impr | Paid $/yr |")
        lines.append("|-------|----:|-----:|----------:|")
        for t in sorted(out_of_scope, key=lambda x: -x["priority_score"])[:15]:
            pos = t["organic_position"] if t["organic_position"] != "" else "—"
            lines.append(
                f"| {t['query']} | {pos} | {t['organic_impressions']:,} | "
                f"${t['est_annual_paid_cost']:,.0f} |"
            )
        if len(out_of_scope) > 15:
            lines.append(f"| _…and {len(out_of_scope) - 15} more_ | | | |")

    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def write_csv(path: Path, targets: list[dict]) -> None:
    with path.open("w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=OUTPUT_FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(targets)


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Build a ranked SEO target list from cannibalization + GSC data.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument(
        "--cannibalization",
        required=True,
        help="Cannibalization join CSV (from ads_incrementality.py cannibalization --out)",
    )
    p.add_argument(
        "--gsc",
        required=True,
        help="Search Console Queries CSV export (for impressions)",
    )
    p.add_argument(
        "--paid-window-days",
        type=int,
        default=DEFAULT_PAID_WINDOW_DAYS,
        help=f"Days in the paid-spend window for annualisation (default: {DEFAULT_PAID_WINDOW_DAYS})",
    )
    p.add_argument("--out-csv", required=True, help="Machine-readable output CSV")
    p.add_argument("--out-md", required=True, help="Human-readable output markdown")
    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)

    cann_path = Path(args.cannibalization)
    gsc_path = Path(args.gsc)
    out_csv = Path(args.out_csv)
    out_md = Path(args.out_md)

    cannibalization = load_cannibalization(cann_path)
    gsc = load_gsc(gsc_path)

    targets = build_targets(
        cannibalization,
        gsc,
        paid_window_days=args.paid_window_days,
    )

    write_csv(out_csv, targets)
    write_markdown(
        out_md,
        targets,
        paid_window_days=args.paid_window_days,
        cannibalization_path=cann_path,
        gsc_path=gsc_path,
    )

    out_of_scope = [t for t in targets if t["suggested_target_url"] == OUT_OF_SCOPE_LLC]
    actionable = [t for t in targets if t["suggested_target_url"] != OUT_OF_SCOPE_LLC]

    total_annual = sum(t["est_annual_paid_cost"] for t in actionable)
    total_impr = sum(t["organic_impressions"] for t in actionable)
    gap_n = sum(1 for t in actionable if t["suggested_target_url"] == "GAP — no page")

    print(f"Targets    : {len(actionable)} queries")
    print(f"Impressions: {total_impr:,}")
    print(f"Paid $/yr  : ${total_annual:,.0f} (annualised over {args.paid_window_days}d)")
    print(f"Gaps       : {gap_n}")
    print(f"Out of scope (plain LLC / sister company): {len(out_of_scope)} queries")
    print(f"Wrote CSV  : {out_csv}")
    print(f"Wrote MD   : {out_md}")

    print("\n=== TOP 10 ===")
    for t in actionable[:10]:
        pos = t["organic_position"] or "—"
        print(
            f"  {t['priority_score']:5.1f}  {t['query'][:42]:<42}  "
            f"pos={pos}  impr={t['organic_impressions']:>5}  "
            f"${t['est_annual_paid_cost']:>6.0f}/yr  -> {t['suggested_target_url']}"
        )

    return 0


if __name__ == "__main__":
    sys.exit(main())
