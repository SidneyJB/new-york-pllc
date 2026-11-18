#!/usr/bin/env python3
"""Credentialing direct-mail list: new behavioral-health organization NPIs (Type 2) from the public
CMS NPPES NPI Registry API, in the test states, enumerated in the last N days.

The API cannot filter by enumeration date, so this pulls every active Type 2 NPI that matches a
behavioral-health taxonomy description in each state (split by ZIP prefix until no query hits the
API's 1,200-result cap), keeps the ones enumerated inside the window, then filters by taxonomy code.

Re-run (batch 2, Jan 2027):
  python3 new-york-pllc/scripts/pull_credentialing_npi_list.py --end 2027-01-05 --days 90 \
      --out new-york-pllc/reports/credentialing-npi-list-2027-01-05
Use --skip-crm to skip the CRM exclusion export (then no client exclusions are applied: don't mail that list).
The CRM export (export_crm_credentialing_exclusions.ts) is read-only.
"""
import argparse, csv, collections, datetime as dt, json, os, re, subprocess, sys, tempfile, time
import urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

API = "https://npiregistry.cms.hhs.gov/api/?"
UA = "npi-registry-list-script/1.0"
HERE = os.path.dirname(os.path.abspath(__file__))
WORKSPACE = os.path.abspath(os.path.join(HERE, "..", ".."))
CRM_DIR = os.path.join(WORKSPACE, "PLLC-CRM", "crm")

def rng(a, b): return [f"{z:03d}" for z in range(a, b + 1)]
ZIP3 = {
    "NY": rng(100, 149) + ["005", "063"],
    "NJ": rng(70, 89),
    "FL": rng(320, 349),
    "TX": rng(750, 799) + ["885"],
    "MD": rng(206, 219),
}

# API taxonomy_description search terms (each matches a family of taxonomy descriptions).
QUERIES = [
    "Counselor", "Social Worker", "Marriage & Family Therapist", "Psycholog", "Clinical Neuropsychologist",
    "Psychoanalyst", "Behavior Analyst", "Psychiatry", "Psych/Mental Health", "Addiction Medicine",
    "Mental Health (Including", "Adult Mental Health", "Adolescent and Children Mental Health",
    "Community/Behavioral Health", "Rehabilitation, Substance Use Disorder",
]

# Taxonomy codes that count as behavioral health -> category. Prefix match where the key ends with '*'.
BH_CODES = {
    "101Y00000X": "Therapist", "101YA0400X": "Therapist (addiction)", "101YM0800X": "Therapist",
    "101YP2500X": "Therapist", "101YP1600X": "Therapist",
    "104100000X": "Therapist", "1041C0700X": "Therapist",
    "106H00000X": "Therapist",
    "102L00000X": "Therapist",
    "103T*": "Psychologist", "103G00000X": "Psychologist",
    "103K00000X": "Behavior analyst (ABA)",
    "2084P0800X": "Prescriber", "2084P0804X": "Prescriber", "2084P0802X": "Prescriber",
    "2084P0805X": "Prescriber", "2084P0015X": "Prescriber", "2084F0202X": "Prescriber", "2084A0401X": "Prescriber",
    "363LP0808X": "Prescriber",
    "364SP0808X": "Prescriber", "364SP0809X": "Prescriber", "364SP0807X": "Prescriber",
    "364SP0810X": "Prescriber", "364SP0811X": "Prescriber", "364SP0812X": "Prescriber", "364SP0813X": "Prescriber",
    "261QM0801X": "Clinic/agency", "261QM0850X": "Clinic/agency", "261QM0855X": "Clinic/agency",
    "261QR0405X": "Clinic/agency", "251S00000X": "Clinic/agency",
}
CATEGORY_ORDER = ["Prescriber", "Psychologist", "Therapist", "Therapist (addiction)", "Behavior analyst (ABA)", "Clinic/agency"]

def bh_category(code):
    if code in BH_CODES: return BH_CODES[code]
    for k, v in BH_CODES.items():
        if k.endswith("*") and code.startswith(k[:-1]): return v
    return None

# Large-system screens.
HOSPITAL_TAX_PREFIXES = ("27", "28")  # hospitals and hospital units
BIG_NAME = re.compile(
    r"\bhospitals?\b|health ?system|medical center|\bmed ctr\b|universit|college|school district|board of education|"
    r"\bcounty of\b|county (government|board|department|chapter)|^city of\b|^state of (new york|new jersey|florida|texas|maryland)\b|department of|\bdept\b|veterans|\bymca\b|catholic charities|salvation army|"
    r"jewish (board|family)|lutheran|\bfqhc\b|federally qualified|"
    r"lifestance|talkiatry|thriveworks|^headway|^grow therapy|\brula\b|brightline|cerebral|charlie health|acadia|"
    r"universal health|\buhs\b|centene|optum|elevance|baymark|sondermind|mindpath|refresh mental health|spring health|"
    r"iris telehealth|array behavioral|brightside|two chairs|cityblock|amwell|teladoc|ophelia|bicycle health|"
    r"groups recover|pyramid healthcare|recovery centers of america|american addiction|centerstone|devereux|"
    r"centria|bluesprig|hopebridge|action behavior centers|autism learning partners|behavioral innovations|"
    r"butterfly effects|learn behavioral|trumpet behavioral|caravel autism|invo healthcare|kaleidoscope|"
    r"included health|done global|\bdone\b.*adhd|the ellie|ellie mental health|nirvana|talkspace|betterhelp|"
    r"\bcommunity health center\b",
    re.I,
)
CHAIN_THRESHOLD = 3  # same org name, or same official + mailing street, on >= this many new NPIs -> multi-site

# Named credentialing clients / quotes from the CRM campaign builder (build-list.ts.txt, Nov 16 2026).
NAMED_CRED = re.compile(r"green sparrow|cove compass|dunia gibson|madeline rose|sohayegh|danielle byrne|gabriella carbonara", re.I)

SUFFIX = re.compile(r"\b(p\s*l\s*l\s*c|l\s*l\s*c|p\s*c|inc|incorporated|corp|corporation|ltd|co|company|pllc|llc|pa|p\s*a|lp|llp)\b")
def norm(name):
    s = (name or "").lower().replace("&", " and ")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = SUFFIX.sub(" ", s)
    return re.sub(r"\s+", " ", s).strip()

def get(params):
    q = urllib.parse.urlencode({"version": "2.1", "enumeration_type": "NPI-2", **params, "limit": 200})
    for attempt in range(8):
        try:
            req = urllib.request.Request(API + q, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                d = json.load(r)
            if d.get("Errors"):
                return []
            return d.get("results") or []
        except Exception:
            time.sleep(3 + attempt * 6)
    raise RuntimeError(f"API failed: {params}")

def pull(params):
    out = []
    for skip in range(0, 1001, 200):
        res = get({**params, "skip": skip}); out += res
        time.sleep(0.05)
        if len(res) < 200: return out, False
    return out, True  # 1,200 returned: there may be more

STATS = collections.Counter()
def pull_cell(st, desc, prefix, sink):
    """Pull one (state, taxonomy description, zip prefix) cell, splitting while capped."""
    params = {"state": st, "taxonomy_description": desc}
    if prefix: params["postal_code"] = prefix + "*"
    res, capped = pull(params)
    STATS["api_cells"] += 1
    if capped:
        if prefix and len(prefix) >= 5:
            STATS["still_capped"] += 1; print("STILL CAPPED", st, desc, prefix, file=sys.stderr)
        else:
            subs = ZIP3[st] if not prefix else [prefix + str(i) for i in range(10)]
            for p in subs: pull_cell(st, desc, p, sink)
            return
    sink(res)

def do_state(st, start, end):
    recs = {}
    scanned = set()
    def sink(res):
        for r in res:
            scanned.add(r["number"])
            d = r["basic"].get("enumeration_date", "")
            if start <= d <= end: recs[r["number"]] = r
    for desc in QUERIES:
        pull_cell(st, desc, "", sink)
    print(f"{st}: scanned {len(scanned)} active orgs matching BH descriptions; {len(recs)} enumerated in window", flush=True)
    return st, recs, len(scanned)

def addr(r, purpose):
    for a in r.get("addresses", []):
        if a.get("address_purpose") == purpose: return a
    return {}

def fmt_zip(z):
    z = (z or "").strip()
    return f"{z[:5]}-{z[5:]}" if len(z) == 9 else z

def crm_export(path):
    cmd = ["npx", "tsx", os.path.join(HERE, "export_crm_credentialing_exclusions.ts"), path]
    subprocess.run(cmd, cwd=CRM_DIR, check=True)
    return json.load(open(path))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--end", default=dt.date.today().isoformat(), help="last enumeration date (YYYY-MM-DD)")
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--states", default="NY,NJ,FL,TX,MD")
    ap.add_argument("--out", required=True)
    ap.add_argument("--crm-json", help="use an existing CRM export instead of running it")
    ap.add_argument("--skip-crm", action="store_true")
    ap.add_argument("--raw-cache", help="JSON file of in-window API records: reused if it exists, else written (holds names; keep out of git)")
    a = ap.parse_args()
    end = dt.date.fromisoformat(a.end); start = end - dt.timedelta(days=a.days)
    S, E = start.isoformat(), end.isoformat()
    states = a.states.split(",")
    os.makedirs(a.out, exist_ok=True)
    pulled_at = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")

    if a.raw_cache and os.path.exists(a.raw_cache):
        c = json.load(open(a.raw_cache)); raw, scanned, pulled_at = c["raw"], c["scanned"], c["pulled_at"]
        STATS.update(c["stats"])
    else:
        with ThreadPoolExecutor(3) as ex:
            results = list(ex.map(lambda s: do_state(s, S, E), states))
        scanned = {st: n for st, _, n in results}
        raw = {}
        for _, recs, _ in results: raw.update(recs)
        if a.raw_cache:
            json.dump({"raw": raw, "scanned": scanned, "pulled_at": pulled_at, "stats": dict(STATS)}, open(a.raw_cache, "w"))

    # CRM
    crm = None
    if not a.skip_crm:
        path = a.crm_json or os.path.join(tempfile.mkdtemp(), "crm.json")
        crm = json.load(open(path)) if a.crm_json else crm_export(path)
    case_npis, case_names, cust_npis, cust_names = set(), {}, {}, {}
    if crm:
        for p in crm["pllcs"]:
            n = norm(p["name"])
            cust_names.setdefault(n, p["name"])
            for x in p["npis"]: cust_npis[x] = p["name"]
            if p["credentialingCase"]:
                case_names[n] = p["name"]
                case_npis.update(p["npis"])

    funnel = collections.Counter()
    kept, dropped = [], []
    rows = []
    for npi, r in raw.items():
        b = r["basic"]
        loc, mail = addr(r, "LOCATION"), addr(r, "MAILING")
        funnel["in_window_any_state"] += 1
        if loc.get("state") not in states:
            funnel["practice_not_in_test_states"] += 1; continue
        if b.get("status") != "A":
            funnel["not_active"] += 1; continue
        taxes = r.get("taxonomies", [])
        bh = [(t["code"], t["desc"], bh_category(t["code"])) for t in taxes if bh_category(t["code"])]
        if not bh:
            funnel["no_bh_taxonomy_code"] += 1; continue
        rows.append((npi, r, b, loc, mail, taxes, bh))
    funnel["bh_in_window_in_states"] = len(rows)

    # Multi-site detection across the in-window set.
    name_ct = collections.Counter(norm(b.get("organization_name")) for _, _, b, *_ in rows)
    off_ct = collections.Counter(
        (b.get("authorized_official_first_name", "").upper(), b.get("authorized_official_last_name", "").upper(), (mail.get("address_1") or "").upper())
        for _, _, b, _, mail, _, _ in rows)

    for npi, r, b, loc, mail, taxes, bh in rows:
        name = b.get("organization_name", "")
        dbas = [o.get("organization_name", "") for o in r.get("other_names", []) if o.get("organization_name")]
        prim = next((t for t in taxes if t.get("primary")), taxes[0] if taxes else {})
        cats = sorted({c for _, _, c in bh}, key=CATEGORY_ORDER.index)
        names_norm = [norm(name)] + [norm(x) for x in dbas]
        reason = ""
        if npi in case_npis: reason = "CRM credentialing case (NPI match)"
        elif any(n in case_names for n in names_norm): reason = "CRM credentialing case (name match)"
        elif any(NAMED_CRED.search(x) for x in [name] + dbas): reason = "named credentialing client/quote"
        elif any(t["code"].startswith(HOSPITAL_TAX_PREFIXES) for t in taxes): reason = "large: hospital taxonomy"
        elif any(BIG_NAME.search(x) for x in [name] + dbas): reason = "large: name matches system/chain/government list"
        elif name_ct[norm(name)] >= CHAIN_THRESHOLD: reason = f"large: same name on >= {CHAIN_THRESHOLD} new NPIs"
        elif off_ct[(b.get("authorized_official_first_name", "").upper(), b.get("authorized_official_last_name", "").upper(), (mail.get("address_1") or "").upper())] >= CHAIN_THRESHOLD:
            reason = f"large: same official + mailing street on >= {CHAIN_THRESHOLD} new NPIs"
        flag = ""
        if npi in cust_npis: flag = f"formation customer (NPI): {cust_npis[npi]}"
        else:
            hit = next((cust_names[n] for n in names_norm if n in cust_names), None)
            if hit: flag = f"formation customer (name): {hit}"
        row = {
            "npi": npi,
            "org_name": name,
            "dba": "; ".join(dbas),
            "official_first": b.get("authorized_official_first_name", ""),
            "official_last": b.get("authorized_official_last_name", ""),
            "official_credential": b.get("authorized_official_credential", ""),
            "official_title": b.get("authorized_official_title_or_position", ""),
            "mail_address_1": mail.get("address_1", ""), "mail_address_2": mail.get("address_2", ""),
            "mail_city": mail.get("city", ""), "mail_state": mail.get("state", ""), "mail_zip": fmt_zip(mail.get("postal_code")),
            "mail_country": mail.get("country_code", ""),
            "practice_address_1": loc.get("address_1", ""), "practice_address_2": loc.get("address_2", ""),
            "practice_city": loc.get("city", ""), "practice_state": loc.get("state", ""), "practice_zip": fmt_zip(loc.get("postal_code")),
            "practice_phone": loc.get("telephone_number", ""),
            "state": loc.get("state", ""),
            "category": "; ".join(cats),
            "primary_taxonomy_code": prim.get("code", ""), "primary_taxonomy_desc": prim.get("desc", ""),
            "bh_taxonomy_codes": "; ".join(sorted({c for c, _, _ in bh})),
            "primary_is_bh": "yes" if bh_category(prim.get("code", "")) else "no",
            "enumeration_date": b.get("enumeration_date", ""),
            "subpart_of": b.get("parent_organization_legal_business_name", "") if b.get("organizational_subpart") == "YES" else "",
            "our_customer_flag": flag,
        }
        if reason:
            row["drop_reason"] = reason; dropped.append(row)
        else:
            kept.append(row)

    kept.sort(key=lambda x: (x["state"], x["practice_zip"], x["org_name"]))
    dropped.sort(key=lambda x: (x["drop_reason"], x["state"], x["org_name"]))
    cols = [k for k in kept[0].keys()] if kept else []
    with open(os.path.join(a.out, "list.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(kept)
    if dropped:
        with open(os.path.join(a.out, "dropped.csv"), "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(dropped[0].keys())); w.writeheader(); w.writerows(dropped)

    by_state = collections.Counter(r["state"] for r in kept)
    by_cat = collections.Counter(c for r in kept for c in r["category"].split("; "))
    by_prim = collections.Counter((r["primary_taxonomy_code"], r["primary_taxonomy_desc"]) for r in kept)
    by_bh = collections.Counter(c for r in kept for c in r["bh_taxonomy_codes"].split("; "))
    state_cat = collections.Counter((r["state"], r["category"].split("; ")[0]) for r in kept)
    summary = {
        "pulled_at_utc": pulled_at, "window": [S, E], "states": states,
        "api_cells": STATS["api_cells"], "still_capped_cells": STATS["still_capped"],
        "scanned_active_orgs_by_state": scanned,
        "crm_exported_at": crm.get("exportedAt") if crm else None,
        "crm_pllcs": len(crm["pllcs"]) if crm else 0,
        "crm_credentialing_cases": len(case_names),
        "funnel": dict(funnel),
        "drop_reasons": dict(collections.Counter(r["drop_reason"] for r in dropped)),
        "dropped_by_state": dict(collections.Counter(r["state"] for r in dropped)),
        "kept": len(kept), "kept_by_state": dict(by_state),
        "kept_by_category_any": dict(by_cat),
        "kept_by_state_first_category": {f"{s}|{c}": n for (s, c), n in sorted(state_cat.items())},
        "kept_by_primary_taxonomy": {f"{c} {d}": n for (c, d), n in by_prim.most_common()},
        "kept_by_bh_code_any": dict(by_bh.most_common()),
        "flagged_formation_customers": sum(1 for r in kept if r["our_customer_flag"]),
        "primary_not_bh": sum(1 for r in kept if r["primary_is_bh"] == "no"),
        "mail_outside_us_or_blank": sum(1 for r in kept if r["mail_country"] not in ("US", "") or not r["mail_address_1"]),
    }
    json.dump(summary, open(os.path.join(a.out, "summary.json"), "w"), indent=1)
    print(json.dumps(summary, indent=1))

if __name__ == "__main__":
    main()
