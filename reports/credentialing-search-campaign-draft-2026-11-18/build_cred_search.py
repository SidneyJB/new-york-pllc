#!/usr/bin/env python3
"""Generate the credentialing search campaign draft CSVs (Nov 18 2026).

Read-only with respect to any Google Ads account: this only writes local CSV files.
Output dir is passed as argv[1].
"""
import csv
import re
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
DOMAIN = "https://BRAND-DOMAIN.com"  # placeholder until Sid picks brand + domain

STATES = [
    # code, name, slug, licenses (therapist titles used in that state), medicaid kws, medicaid headline, share
    dict(code="NY", name="New York", slug="new-york", lic=["lcsw", "lmhc", "lmft"],
         medicaid=["ny medicaid credentialing", "new york medicaid credentialing",
                   "ny medicaid provider enrollment services"],
         med_h="NY Medicaid Credentialing", guide_desc="Our New York guide covers NY Medicaid, Fidelis Care, Healthfirst and commercial plans.",
         tz_note="ET", share=0.19),
    dict(code="NJ", name="New Jersey", slug="new-jersey", lic=["lcsw", "lpc", "lmft"],
         medicaid=["nj familycare credentialing", "nj medicaid credentialing",
                   "new jersey medicaid credentialing"],
         med_h="NJ FamilyCare Credentialing", guide_desc="Our New Jersey guide covers NJ FamilyCare, the five Medicaid plans and commercial plans.",
         tz_note="ET", share=0.16),
    dict(code="FL", name="Florida", slug="florida", lic=["lcsw", "lmhc", "lmft"],
         medicaid=["florida medicaid credentialing", "fl medicaid credentialing",
                   "florida medicaid provider enrollment services"],
         med_h="FL Medicaid Credentialing", guide_desc="Our Florida guide covers Medicaid enrollment, the SMMC plans and Florida Blue.",
         tz_note="ET", share=0.22),
    dict(code="TX", name="Texas", slug="texas", lic=["lcsw", "lpc", "lmft"],
         medicaid=["texas medicaid credentialing", "tx medicaid credentialing",
                   "texas medicaid provider enrollment services"],
         med_h="TX Medicaid Credentialing", guide_desc="Our Texas guide covers TMHP enrollment, the statewide CVO and the health plans.",
         tz_note="CT", share=0.25),
    dict(code="MD", name="Maryland", slug="maryland", lic=["lcsw-c", "lcpc", "lcmft"],
         medicaid=["maryland medicaid credentialing", "md medicaid credentialing",
                   "maryland medicaid provider enrollment services"],
         med_h="MD Medicaid Credentialing", guide_desc="Our Maryland guide covers Medicaid, the Carelon carve-out and CareFirst.",
         tz_note="ET", share=0.18),
]

E, P = "Exact", "Phrase"
EP = (E, P)


def ag_keywords(s):
    n, c = s["name"].lower(), s["code"].lower()
    ags = {}
    ags["Credentialing Services"] = [
        ("insurance credentialing", EP), ("insurance credentialing services", EP),
        ("credentialing services", EP), ("provider credentialing services", EP),
        ("provider credentialing", (E,)), ("credentialing services for providers", EP),
        ("credentialing company", EP), ("credentialing companies", EP),
        ("insurance credentialing company", EP), ("credentialing services near me", (E,)),
        ("private practice credentialing", EP), ("help with insurance credentialing", EP),
        ("caqh credentialing services", (E,)), ("medical credentialing services", (E,)),
        (f"insurance credentialing {n}", EP), (f"{n} insurance credentialing", EP),
        (f"credentialing services {n}", EP), (f"{c} credentialing services", EP),
        (f"provider credentialing {n}", EP), (f"credentialing companies in {n}", EP),
    ]
    ther = [
        ("insurance credentialing for therapists", EP), ("therapist credentialing", EP),
        ("therapist credentialing services", EP), ("credentialing for therapists", EP),
        ("mental health credentialing", EP), ("mental health credentialing services", EP),
        ("behavioral health credentialing", EP), ("insurance credentialing for counselors", EP),
        ("insurance credentialing for social workers", EP), ("counselor credentialing", EP),
        ("how to get credentialed as a therapist", (E,)),
        (f"therapist credentialing {n}", EP), (f"mental health credentialing {n}", EP),
    ]
    for lic in s["lic"]:
        ther += [(f"{lic} credentialing", EP), (f"{lic} insurance credentialing", EP)]
    ags["Therapists"] = ther
    ags["Prescribers"] = [
        ("psychiatric nurse practitioner credentialing", EP), ("pmhnp credentialing", EP),
        ("pmhnp insurance credentialing", EP), ("psych np credentialing", EP),
        ("nurse practitioner credentialing services", EP),
        ("nurse practitioner insurance credentialing", EP),
        ("psychiatrist credentialing services", EP), ("psychiatrist insurance credentialing", EP),
        (f"pmhnp credentialing {n}", EP), (f"nurse practitioner credentialing {n}", EP),
    ]
    ags["Get In Network"] = [
        ("get on insurance panels", EP), ("getting on insurance panels", EP),
        ("how to get on insurance panels", (E,)), ("insurance paneling services", EP),
        ("get paneled with insurance companies", EP), ("credentialing with insurance companies", EP),
        ("get in network with insurance companies", EP), ("join insurance panels", EP),
        (f"get on insurance panels {n}", EP),
    ]
    ags["Medicaid"] = [("medicaid credentialing services", EP),
                       ("medicaid credentialing for therapists", EP)] + [(k, EP) for k in s["medicaid"]]
    return ags


PHASE1_BUDGET = {"NY": 26, "NJ": 8, "FL": 30, "TX": 34, "MD": 7}  # Dec 3-20 daily, README section 7 (NJ/MD cut Nov 19)

START_CPC = {"Credentialing Services": 30, "Therapists": 28, "Prescribers": 30,
             "Get In Network": 22, "Medicaid": 22}

# Shared negative list (phrase). Rule from the Aug 4 2026 incident: no single common short word,
# nothing under 3 characters, and nothing that occurs inside one of our own keywords (checked below).
NEG_SHARED = """jobs
job
hiring
career
careers
salary
salaries
remote
work from home
resume
interview
internship
indeed
glassdoor
ziprecruiter
linkedin
credentialing specialist
credentialing coordinator
credentialing analyst
credentialing manager
credentialing assistant
credentialing representative
credentialing jobs
course
courses
class
classes
training
certification
certified
certificate
exam
cpcs
cpmsm
namss
school
degree
university
college
free
template
sample
pdf
caqh login
caqh log in
caqh proview login
proview login
caqh customer service
caqh phone number
caqh contact
caqh number
caqh id
caqh help desk
password
npi lookup
npi number
npi registry
npi search
lookup
look up
license lookup
license verification
verify license
primary source verification
medical staff
hospital credentialing
hospital privileges
privileging
privileges
nurse credentialing
nursing credentialing
travel nurse
registered nurse
nursing jobs
teacher
teaching
teaching credential
substitute
pharmacy
pharmacist
dental
dentist
optometry
optometrist
chiropractor
chiropractic
vendor credentialing
vendormate
reptrax
symplr
software
definition
meaning
what is
wikipedia
coding
medical billing and coding
medical assistant
background check
real estate
insurance agent
agent
producer license
nipr
veterans affairs""".split("\n")

STATE_NAMES = sorted("""alabama,alaska,arizona,arkansas,california,colorado,connecticut,delaware,florida,georgia,hawaii,idaho,illinois,indiana,iowa,kansas,kentucky,louisiana,maine,maryland,massachusetts,michigan,minnesota,mississippi,missouri,montana,nebraska,nevada,new hampshire,new jersey,new mexico,new york,north carolina,north dakota,ohio,oklahoma,oregon,pennsylvania,rhode island,south carolina,south dakota,tennessee,texas,utah,vermont,virginia,washington,west virginia,wisconsin,wyoming""".split(","))
assert len(STATE_NAMES) == 50, (len(STATE_NAMES), STATE_NAMES)

# ---------- RSA copy ----------
COMMON_H = [
    "Get In Network for $1,795",       # pinned H1 in variant A of Services/Therapists/Get In Network
    "Covers 3 Commercial Insurers",
    "Flat, Published Prices",
    "Credit or Refund If Declined",
    "You Sign, We Do the Paperwork",
    "About 45 Minutes of Your Time",
    "Foundation Package: $399",
    "We Follow Up Every 2 Weeks",
    "No Hourly Fees or % of Claims",
    "Contracts in Your Own Name",
]


def headlines(s, ag):
    code, name = s["code"], s["name"]
    st = [f"Insurance Credentialing {code}", f"{name} Credentialing Help"]
    if ag == "Credentialing Services":
        h = [COMMON_H[0]] + st + ["Credentialing for Practices"] + COMMON_H[1:]
        h += ["Medicaid and Medicare Add-Ons"]
    elif ag == "Therapists":
        lic = s["lic"][0].upper()
        h = [COMMON_H[0], "Credentialing for Therapists", f"{lic} Insurance Credentialing",
             f"Therapist Credentialing {code}"] + COMMON_H[1:] + [st[1]]
    elif ag == "Prescribers":
        h = ["Prescriber Package: $2,995", "Psych NP Credentialing", "PMHNP Insurance Credentialing",
             f"Insurance Credentialing {code}", "Includes Medicaid and Medicare", "4 Commercial Insurers",
             COMMON_H[2], COMMON_H[3], COMMON_H[4], COMMON_H[5], COMMON_H[7], COMMON_H[8], st[1]]
    elif ag == "Get In Network":
        h = [COMMON_H[0], "Get On Insurance Panels", "Get In Network With Insurers",
             f"Insurance Credentialing {code}"] + COMMON_H[1:] + [st[1]]
    elif ag == "Medicaid":
        first = "NY Medicaid Add-On: $495" if code == "NY" else "Medicaid Add-On Available"
        h = [first, s["med_h"], "Medicaid Credentialing Help", f"Insurance Credentialing {code}",
             "Medicaid and Commercial Plans", COMMON_H[2], COMMON_H[3], COMMON_H[4], COMMON_H[5],
             COMMON_H[7], COMMON_H[0], st[1]]
    return h[:15]


def descriptions(s, ag, variant):
    d_price = "Flat published prices. Get in network with 3 commercial insurers for $1,795."
    if ag == "Prescribers":
        d_price = "Flat published prices. $2,995 covers 4 commercial insurers, Medicaid and Medicare."
    if ag == "Medicaid" and s["code"] != "NY":
        d_price = "Flat published prices. We quote Medicaid after we check your state's plans."
    d_check = "If an insurer turns you down, you get its share back or moved to another insurer."
    d_split = "We prepare your NPI, CAQH and insurer applications. You sign and attest, about 45 min."
    d_honest = "Insurers decide who they accept and when. We never promise an approval or a start date."
    d_guide = s["guide_desc"]
    d_indep = "Independent firm. Not affiliated with any insurer, Medicaid program or agency."
    if variant == "A":
        return [d_price, d_check, d_split, d_honest]
    return [d_guide, d_price, d_check, d_indep]


def check_len(kind, text, limit):
    if len(text) > limit:
        raise SystemExit(f"{kind} too long ({len(text)}>{limit}): {text}")
    if "→" in text or "—" in text:
        raise SystemExit(f"{kind} has a prohibited symbol: {text}")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    kw_rows, ad_rows, neg_rows, camp_rows, ag_rows = [], [], [], [], []
    all_pos = set()
    seed = set()
    for s in STATES:
        camp = f"CRED-Search-{s['code']}"
        ags = ag_keywords(s)
        for ag, kws in ags.items():
            agn = f"{s['code']} - {ag}"
            ag_rows.append(dict(Campaign=camp, **{"Ad group": agn, "Max CPC": START_CPC[ag], "Ad group status": "Paused"}))
            for k, mts in kws:
                all_pos.add(k)
                seed.add(k)
                for mt in mts:
                    kw_rows.append({"Campaign": camp, "Ad group": agn, "Keyword": k, "Match type": mt})
            for variant in ("A", "B"):
                hs = headlines(s, ag)
                ds = descriptions(s, ag, variant)
                if len(hs) < 10:
                    raise SystemExit(f"{agn}: only {len(hs)} headlines")
                if len(set(hs)) != len(hs):
                    raise SystemExit(f"{agn}: duplicate headline {hs}")
                for h in hs:
                    check_len("Headline", h, 30)
                for d in ds:
                    check_len("Description", d, 90)
                row = {"Campaign": camp, "Ad group": agn, "Ad type": "Responsive search ad",
                       "Variant": "A pinned price" if variant == "A" else "B unpinned"}
                for i in range(15):
                    row[f"Headline {i+1}"] = hs[i] if i < len(hs) else ""
                    row[f"Headline {i+1} position"] = "1" if (variant == "A" and i == 0) else ""
                for i in range(4):
                    row[f"Description {i+1}"] = ds[i]
                row["Path 1"] = "credentialing"
                row["Path 2"] = s["slug"][:15]
                check_len("Path 2", row["Path 2"], 15)
                row["Final URL"] = f"{DOMAIN}/{s['slug']}"
                row["Status"] = "Paused"
                ad_rows.append(row)
        # campaign-level negatives: other states (full names only)
        for st in STATE_NAMES:
            if st != s["name"].lower():
                neg_rows.append({"Campaign": camp, "Ad group": "", "Keyword": st, "Criterion Type": "Campaign Negative Phrase", "List": "per-campaign"})
        suffix = (f"utm_source=google&utm_medium=cpc&utm_campaign=cred-search-{s['code'].lower()}"
                  "&utm_content={adgroupid}&utm_term={keyword}&matchtype={matchtype}")
        camp_rows.append({"Campaign": camp, "Budget": PHASE1_BUDGET[s["code"]], "Budget type": "Daily", "Campaign type": "Search", "Networks": "Google search",
                          "Bid strategy type": "Manual CPC", "Location": s["name"],
                          "Location option": "Presence", "Language": "English",
                          "Final URL suffix": suffix, "Campaign status": "Paused"})
    for n in NEG_SHARED:
        n = n.strip()
        if not n:
            continue
        if len(n) < 3:
            raise SystemExit(f"negative under 3 chars: {n}")
        for k in all_pos:
            if re.search(rf"(^| ){re.escape(n)}( |$)", k):
                raise SystemExit(f"negative '{n}' self-blocks keyword '{k}'")
        neg_rows.append({"Campaign": "", "Ad group": "", "Keyword": n, "Criterion Type": "Negative Phrase", "List": "CRED Neg - Wrong intent (shared)"})
    # cross-state negative self-block check (per campaign)
    for s in STATES:
        own = [kk for kws in ag_keywords(s).values() for kk, _ in kws]
        for k in own:
            for st in STATE_NAMES:
                if st != s["name"].lower() and re.search(rf"(^| ){re.escape(st)}( |$)", k):
                    raise SystemExit(f"state negative {st} blocks {k} in {s['code']}")

    def write(name, rows):
        with open(OUT / name, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            w.writerows(rows)

    write("keywords.csv", kw_rows)
    write("ads.csv", ad_rows)
    write("negatives.csv", neg_rows)
    write("campaigns.csv", camp_rows)
    write("ad-groups.csv", ag_rows)
    (OUT / "keyword-planner-seed.txt").write_text("\n".join(sorted(seed)) + "\n")
    print("keywords", len(kw_rows), "ads", len(ad_rows), "neg", len(neg_rows),
          "unique kw texts", len(seed))
    per = {}
    for r in kw_rows:
        per[r["Campaign"]] = per.get(r["Campaign"], 0) + 1
    print(per)


if __name__ == "__main__":
    main()
