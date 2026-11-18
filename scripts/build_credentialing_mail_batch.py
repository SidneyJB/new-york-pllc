#!/usr/bin/env python3
"""Build a credentialing postcard mail file (one row per piece) from a pull_credentialing_npi_list.py list.

Steps (Sid's rules, Nov 18 2026), applied in this order; each dropped row is written with its reason:
  1. Drop our own formation customers (`our_customer_flag` set by the pull).
  2. Drop clinic/agency-only rows (first category "Clinic/agency"): batch 1 is individual practices. ABA stays.
  3. Re-check against the CRM (read-only export from export_crm_credentialing_mail_checks.ts):
     credentialing clients, open credentialing leads/quotes/touches, the do-not-send list, MBS tenant
     PLLC names. Match on NPI, normalized org/DBA name, and authorized official name = owner name of a
     credentialing-touched PLLC. Official name = owner of any other CRM PLLC is flagged, not dropped.
  4. NY rows also on the NY DOS letter list (bh-pllc-letter-draft list-method/build-list.py output)
     get the letter only: dropped. Match on normalized entity name, then on ZIP5 + house number +
     first street word of the letter's process address vs the NPI mailing or practice address.
  5. One piece per unique mailing address (normalized line 1 + line 2 + ZIP5).
Rows with obviously undeliverable or incomplete addresses are flagged (`address_flag`), never dropped.

Writes to --out: batch-<N>-mail-file.csv, batch-<N>-excluded.csv (both hold names/addresses: gitignore them),
and batch-<N>-summary.json (counts only). Nothing is sent, uploaded or written to any database.

Batch 1 (Nov 18 2026), from ~/dev/pllc-business:
  (cd PLLC-CRM/crm && npx tsx ../../new-york-pllc/scripts/export_crm_credentialing_mail_checks.ts $TMP/crm-mail-checks.json)
  python3 new-york-pllc/scripts/build_credentialing_mail_batch.py \
      --list new-york-pllc/reports/credentialing-npi-list-2026-11-18/list.csv \
      --crm-json $TMP/crm-mail-checks.json --letter-list $TMP/letter-run/letter-list.csv \
      --batch 1 --campaign cred_mail_2026_12 --out new-york-pllc/reports/credentialing-npi-list-2026-11-18
Batch 2: --batch 2 --campaign cred_mail_2027_01 --content-suffix _t1 --code-suffix "" and
--exclude-npis <batch-1 mail file> to skip NPIs already mailed (see the README of the report folder).
"""
import argparse, collections, csv, json, os, re

STATES = {"NY": "new-york", "NJ": "new-jersey", "FL": "florida", "TX": "texas", "MD": "maryland"}
ZIP3 = {
    "NY": [f"{z:03d}" for z in range(100, 150)] + ["005", "063"],
    "NJ": [f"{z:03d}" for z in range(70, 90)],
    "FL": [f"{z:03d}" for z in range(320, 350)],
    "TX": [f"{z:03d}" for z in range(750, 800)] + ["885"],
    "MD": [f"{z:03d}" for z in range(206, 220)],
}

SUFFIX = re.compile(r"\b(p\s*l\s*l\s*c|l\s*l\s*c|p\s*c|inc|incorporated|corp|corporation|ltd|co|company|pllc|llc|pa|p\s*a|lp|llp|"
                    r"professional limited liability company|limited liability company|the)\b")
def norm_name(name):
    s = (name or "").lower().replace("&", " and ")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = SUFFIX.sub(" ", s)
    return re.sub(r"\s+", " ", s).strip()

ABBR = {"street": "st", "avenue": "ave", "av": "ave", "road": "rd", "drive": "dr", "boulevard": "blvd", "lane": "ln",
        "court": "ct", "place": "pl", "parkway": "pkwy", "highway": "hwy", "suite": "ste", "apartment": "apt", "floor": "fl",
        "fl": "fl", "building": "bldg", "north": "n", "south": "s", "east": "e", "west": "w", "turnpike": "tpke",
        "circle": "cir", "terrace": "ter", "square": "sq", "expressway": "expy", "room": "rm", "unit": "unit",
        "plaza": "plz", "center": "ctr", "trail": "trl", "way": "way", "point": "pt", "first": "1st", "second": "2nd"}
def norm_addr(line):
    s = (line or "").lower().replace("#", " ste ")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    toks = [ABBR.get(t, t) for t in s.split()]
    # "ste 200" / "apt 2" / "unit 5" all mean the same secondary unit for dedupe purposes
    toks = ["ste" if t in ("apt", "unit", "rm") else t for t in toks]
    return " ".join(toks)

GENERIC = set("""np in of and for the a psychiatry psychiatric psychiatrist lcsw lmhc lmft lcat pmhnp services service therapy therapies
therapist therapeutic mental health behavioral counseling counselling counselor psychology psychological psychologist psychotherapy
psychotherapist wellness licensed clinical social work worker nurse practitioner practitioners marriage family center centre group
care practice associates solutions dpc d md phd psyd psy dnp aba analysis behavior applied llc pllc pc inc""".split())
def distinct_tokens(name):
    return {t for t in norm_name(name).split() if t not in GENERIC and len(t) > 1}

def compact(name): return norm_name(name).replace(" ", "")

def zip5(z): return re.sub(r"\D", "", z or "")[:5]

def street_key(line, z):
    """ZIP5 + house number + first street word, for matching addresses written differently."""
    s = norm_addr(line)
    m = re.match(r"(\d+[a-z]?)\s+(\w+)", s)
    if not m or not zip5(z): return None
    word = m.group(2)
    if word in ("n", "s", "e", "w") and len(s.split()) > 2: word = s.split()[2]
    return (zip5(z), m.group(1), word[:6])

def address_flags(r):
    f = []
    a1, a2, city, st, z, ctry = (r[k].strip() for k in ("mail_address_1", "mail_address_2", "mail_city", "mail_state", "mail_zip", "mail_country"))
    if not a1: f.append("no street line")
    if not city: f.append("no city")
    if ctry and ctry != "US": f.append(f"mailing country {ctry}")
    if not re.fullmatch(r"\d{5}(-\d{4})?", z): f.append("ZIP missing or malformed")
    if a1 and not re.search(r"\d", a1 + " " + a2) and not re.search(r"\b(p\.?\s*o\.?\s*box|box|rr|hc)\b", a1, re.I):
        f.append("no house number")
    if re.search(r"\b(same|n/?a|none|unknown|tbd|test)\b", a1, re.I) and len(a1) < 15: f.append("placeholder street line")
    if st in ZIP3 and zip5(z) and zip5(z)[:3] not in ZIP3[st]: f.append(f"ZIP {zip5(z)} not in {st}")
    if not st: f.append("no state")
    if re.search(r"\b(general delivery)\b", a1, re.I): f.append("general delivery")
    if re.search(r"\bp\.?\s*o\.?\s*box\b.*\bdept\b", a1, re.I): f.append("billing lockbox (PO Box + Dept), not the practice")
    full = f"{a1} {a2}"
    if AGENT_ADDR.search(full) and not re.search(r"(#\s*\d{3,}|\b(ste|suite|pmb)\s*[a-z]?\d{4,}|#\d{3,})", full, re.I) \
            and not re.search(r"\b(ste|suite)\s*[a-z]\b", full, re.I):
        f.append("virtual-mailbox address with no private box number")
    return "; ".join(f)

# Shared virtual-mailbox / registered-agent street addresses seen in NPPES (mail is forwarded by box number).
AGENT_ADDR = re.compile(r"7901 4th st|5900 balcones|1209 mountain road pl|418 broadway|2261 market st|30 n gould|"
                        r"1013 centre rd|8 the gr(ee)?n\b|251 little falls|3411 silverside|99 washington ave", re.I)

def title(s):
    s = (s or "").strip()
    return s.title() if s.isupper() or s.islower() else s

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", required=True, help="list.csv from pull_credentialing_npi_list.py")
    ap.add_argument("--crm-json", required=True, help="output of export_crm_credentialing_mail_checks.ts")
    ap.add_argument("--letter-list", help="letter-list.csv from bh-pllc-letter-draft list-method/build-list.py (NY overlap step)")
    ap.add_argument("--exclude-npis", action="append", default=[], help="CSV with a source_npis or npi column: NPIs already mailed")
    ap.add_argument("--keep-clinics", action="store_true", help="keep clinic/agency-only rows (batch 1 drops them)")
    ap.add_argument("--batch", default="1")
    ap.add_argument("--campaign", default="cred_mail_2026_12")
    ap.add_argument("--content-suffix", default="", help="utm_content suffix, e.g. _t1 for batch 2 fresh list")
    ap.add_argument("--code-suffix", default="", help="postcard code suffix after the batch number, e.g. R")
    ap.add_argument("--domain", default="[domain]", help="placeholder until the brand domain is picked")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    rows = list(csv.DictReader(open(a.list)))
    crm = json.load(open(a.crm_json))
    states = [s for s in STATES if any(r["state"] == s for r in rows)]
    wf = collections.OrderedDict()          # step -> Counter(state)
    def snap(label, rs): wf[label] = collections.Counter(r["state"] for r in rs)
    excluded = []
    def drop(rs, test, step):
        keep = []
        for r in rs:
            why = test(r)
            if why: excluded.append({**r, "excluded_step": step, "excluded_reason": why})
            else: keep.append(r)
        return keep

    snap("NPI list (list.csv)", rows)

    # 0. Already mailed (batch 2+)
    mailed = set()
    for f in a.exclude_npis:
        for r in csv.DictReader(open(f)):
            for n in re.split(r"[;\s]+", r.get("source_npis") or r.get("npi") or ""):
                if n: mailed.add(n)
    if mailed:
        rows = drop(rows, lambda r: "already mailed in an earlier batch" if r["npi"] in mailed else "", "0 already mailed")
        snap("After dropping NPIs already mailed", rows)

    # 1. Our formation customers
    rows = drop(rows, lambda r: r["our_customer_flag"], "1 our formation customer")
    snap("1. Drop our formation customers", rows)

    # 2. Clinic/agency-only
    if not a.keep_clinics:
        rows = drop(rows, lambda r: "clinic/agency only" if r["category"].split("; ")[0] == "Clinic/agency" else "", "2 clinic/agency only")
        snap("2. Drop clinic/agency-only rows", rows)

    # 3. CRM re-check
    touch_npi, touch_name, touch_person, any_person = {}, {}, {}, {}
    for p in crm["pllcs"]:
        reason = ("do-not-send list" if p["doNotSend"] else "") or (f"CRM {p['credentialingTouch']}" if p["credentialingTouch"] else "")
        names = [p["name"]] + p.get("dbas", [])
        for pe in p["people"]:
            k = (pe["first"].strip().lower(), pe["last"].strip().lower())
            if k[0] and k[1]:
                any_person.setdefault(k, p["name"])
                if reason: touch_person.setdefault(k, (reason, p["name"]))
        if not reason: continue
        for n in p["npis"]: touch_npi[n] = (reason, p["name"])
        for n in names:
            if norm_name(n): touch_name[norm_name(n)] = (reason, p["name"])
    dns_re = re.compile(crm["doNotSend"]["nameRegex"], re.I)
    mbs = {norm_name(n) for n in (crm.get("mbsPllcNames") or []) if norm_name(n)}
    lead_names = {}
    for l in crm.get("outsideInboundCredLeads", []):
        parts = re.sub(r"[^a-z ]", " ", (l["fromName"] or "").lower()).split()
        if len(parts) >= 2: lead_names[(parts[0], parts[-1])] = l

    def crm_test(r):
        names = [r["org_name"]] + [x for x in r["dba"].split("; ") if x]
        nn = [norm_name(x) for x in names]
        off = (r["official_first"].strip().lower(), r["official_last"].strip().lower())
        if any(dns_re.search(x) for x in names): return "do-not-send list (name)"
        if r["npi"] in touch_npi: return f"{touch_npi[r['npi']][0]} (NPI match: {touch_npi[r['npi']][1]})"
        for n in nn:
            if n in touch_name: return f"{touch_name[n][0]} (name match: {touch_name[n][1]})"
        if off in touch_person: return f"{touch_person[off][0]} (official = owner of {touch_person[off][1]})"
        for n in nn:
            if n in mbs: return "MBS tenant formation customer (name match)"
        if off in any_person and set().union(*(distinct_tokens(n) for n in names)) & distinct_tokens(any_person[off]):
            return f"formation customer missed by the pull (official = owner of {any_person[off]}, org names share a word)"
        if off in lead_names: return f"outside credentialing inquiry in CRM inbox (sender name match, {lead_names[off]['receivedAt']})"
        return ""
    rows = drop(rows, crm_test, "3 CRM re-check")
    snap("3. CRM re-check: credentialing clients/leads/quotes, do-not-send, MBS tenant, missed formation customers", rows)
    crm_flags = {}
    for r in rows:
        off = (r["official_first"].strip().lower(), r["official_last"].strip().lower())
        if off in any_person: crm_flags[r["npi"]] = f"official shares a name with a CRM formation owner ({any_person[off]}); check before printing"

    # 4. NY DOS letter overlap
    letter_match = collections.Counter()
    if a.letter_list:
        letters = list(csv.DictReader(open(a.letter_list)))
        l_names = {compact(l["pllc_name"]): l for l in letters}
        l_addr = {}
        for l in letters:
            k = street_key(l["address_1"], l["zip"])
            if k: l_addr.setdefault(k, l)
        def letter_test(r):
            names = [r["org_name"]] + [x for x in r["dba"].split("; ") if x]
            for n in names:
                if compact(n) in l_names:
                    letter_match["name" if r["state"] == "NY" else "name (non-NY row, kept)"] += 1
                    if r["state"] != "NY": return ""
                    return f"on NY DOS letter list (name match: DOS {l_names[compact(n)]['dos_id']})"
            if r["state"] != "NY": return ""
            for line, z in ((r["mail_address_1"], r["mail_zip"]), (r["practice_address_1"], r["practice_zip"])):
                k = street_key(line, z)
                if k and k in l_addr:
                    # Same building is not enough (shared office suites, agent addresses): the names must also
                    # share a distinctive word, or the letter's PLLC name must carry the official's last name.
                    l = l_addr[k]
                    mine = set().union(*(distinct_tokens(n) for n in names))
                    last = norm_name(r["official_last"])
                    if mine & distinct_tokens(l["pllc_name"]) or (last and last in norm_name(l["pllc_name"]).split()):
                        letter_match["address + name word"] += 1
                        return f"on NY DOS letter list (address + name-word match: DOS {l['dos_id']} {l['pllc_name']})"
                    letter_match["address only, kept (different practice at the same building)"] += 1
            return ""
        rows = drop(rows, letter_test, "4 NY DOS letter list")
        snap("4. Drop NY rows on the NY DOS letter list", rows)

    # 5. Dedupe by mailing address
    groups = collections.OrderedDict()
    for r in sorted(rows, key=lambda x: (x["enumeration_date"], x["npi"])):
        k = (norm_addr(r["mail_address_1"]), norm_addr(r["mail_address_2"]), zip5(r["mail_zip"]))
        if not k[0]: k = ("__no_address__", r["npi"], "")
        groups.setdefault(k, []).append(r)
    merged = collections.OrderedDict()   # second pass: same org name + ZIP5 written two ways (e.g. "STE 3350" / "STE C3350")
    for k, g in groups.items():
        k2 = (compact(g[0]["org_name"]), zip5(g[0]["mail_zip"])) if k[0] != "__no_address__" else k
        merged.setdefault(k2, []).extend(g)
    groups = merged
    pieces = []
    for k, g in groups.items():
        first = g[0]
        for r in g[1:]:
            excluded.append({**r, "excluded_step": "5 duplicate mailing address", "excluded_reason": f"same mailing address as NPI {first['npi']} ({first['org_name']})"})
        st = first["state"]; code = st.lower()
        officials = list(dict.fromkeys(f"{title(r['official_first'])} {title(r['official_last'])}".strip() for r in g))
        flags = [address_flags(first)]
        notes = []
        if first["mail_state"] and first["mail_state"] not in ZIP3: notes.append(f"mailing address in {first['mail_state']}; postcard uses practice state {st}")
        if any(r["state"] != st for r in g): notes.append("rows at this address span practice states " + "/".join(sorted({r['state'] for r in g})))
        if len(officials) > 1: notes.append("different officials at this address: " + ", ".join(officials))
        if AGENT_ADDR.search(first["mail_address_1"] + " " + first["mail_address_2"]): notes.append("virtual-mailbox / registered-agent address (forwarded)")
        q = f"utm_source=mail&utm_campaign={a.campaign}&utm_content=pc6x9_{code}{a.content_suffix}"
        pieces.append({
            "piece_id": f"B{a.batch}-{st}-{len(pieces) + 1:04d}",
            "attention": " ".join(x for x in [title(first["official_first"]), title(first["official_last"])] if x),
            "official_title": first["official_title"],
            "organization": first["org_name"],
            "address_1": first["mail_address_1"], "address_2": first["mail_address_2"],
            "city": first["mail_city"], "state": first["mail_state"], "zip": first["mail_zip"], "country": first["mail_country"] or "US",
            "state_code": st, "state_name": STATES[st].replace("-", " ").title(),
            "printed_url": f"{a.domain}/{code}",
            "url_redirect_target": f"https://{a.domain}/{STATES[st]}?utm_source=mail&utm_medium=print_url&utm_campaign={a.campaign}&utm_content=pc6x9_{code}{a.content_suffix}",
            "qr_url": f"https://{a.domain}/{STATES[st]}?" + q.replace("utm_source=mail&", "utm_source=mail&utm_medium=qr&"),
            "postcard_code": f"{st}-{a.batch}{a.code_suffix}",
            "category": first["category"].split("; ")[0],
            "source_npis": "; ".join(r["npi"] for r in g),
            "other_orgs_at_address": "; ".join(dict.fromkeys(r["org_name"] for r in g[1:] if r["org_name"] != first["org_name"])),
            "address_flag": "; ".join(x for x in flags if x),
            "note": " | ".join(notes),
            "crm_check_flag": "; ".join(crm_flags[r["npi"]] for r in g if r["npi"] in crm_flags),
        })
    pieces.sort(key=lambda p: (p["state_code"], zip5(p["zip"]), p["organization"]))
    seq = collections.Counter()
    for p in pieces:
        seq[p["state_code"]] += 1; p["piece_id"] = f"B{a.batch}-{p['state_code']}-{seq[p['state_code']]:04d}"
    wf["5. One piece per unique mailing address"] = collections.Counter(p["state_code"] for p in pieces)

    os.makedirs(a.out, exist_ok=True)
    mf = os.path.join(a.out, f"batch-{a.batch}-mail-file.csv")
    with open(mf, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(pieces[0].keys())); w.writeheader(); w.writerows(pieces)
    ex = os.path.join(a.out, f"batch-{a.batch}-excluded.csv")
    cols = ["excluded_step", "excluded_reason"] + [k for k in rows[0].keys()] if rows else ["excluded_step", "excluded_reason"]
    with open(ex, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore"); w.writeheader(); w.writerows(excluded)

    summary = {
        "batch": a.batch, "campaign": a.campaign, "crm_exported_at": crm.get("exportedAt"),
        "waterfall": {k: {**{s: v.get(s, 0) for s in states}, "total": sum(v.values())} for k, v in wf.items()},
        "excluded_by_reason_group": dict(collections.Counter(re.sub(r" \((name|NPI|address|official|sender).*", "", e["excluded_reason"]) for e in excluded if not e["excluded_step"].startswith("5"))),
        "letter_match_method": dict(letter_match),
        "pieces": len(pieces), "pieces_by_state": dict(collections.Counter(p["state_code"] for p in pieces)),
        "pieces_by_category": dict(collections.Counter(p["category"] for p in pieces)),
        "pieces_with_address_flag": sum(1 for p in pieces if p["address_flag"]),
        "address_flag_kinds": dict(collections.Counter(re.sub(r"\d{5}", "#####", f) for p in pieces for f in p["address_flag"].split("; ") if f)),
        "pieces_mailing_outside_test_states": sum(1 for p in pieces if p["note"].startswith("mailing address in")),
        "pieces_with_multiple_officials": sum(1 for p in pieces if "different officials" in p["note"]),
        "pieces_with_crm_check_flag": sum(1 for p in pieces if p["crm_check_flag"]),
        "cost_stannp_0.73": round(len(pieces) * 0.73, 2), "cost_lob_1.03": round(len(pieces) * 1.03, 2),
    }
    json.dump(summary, open(os.path.join(a.out, f"batch-{a.batch}-summary.json"), "w"), indent=1)
    print(json.dumps(summary, indent=1))
    print(f"{len(pieces)} pieces -> {mf}\n{len(excluded)} excluded rows -> {ex}")

if __name__ == "__main__":
    main()
