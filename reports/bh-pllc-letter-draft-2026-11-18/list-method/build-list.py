#!/usr/bin/env python3
"""
Letter list: newly filed behavioral-health PLLCs in NY that are not our customers.

Source: NY open data "Active Corporations: Beginning 1800" (data.ny.gov n9v6-gdp6), public.
Exclusion: CRM PLLC names and DOS IDs exported read-only by crm-names.js (main + MBS tenant).

Run (both outputs go to OUTDIR, which must be outside every repo; the list holds names and addresses):
  NODE_PATH=~/dev/pllc-business/PLLC-CRM/crm/node_modules node crm-names.js OUTDIR
  python3 -I build-list.py OUTDIR --start 2026-08-20 [--end 2026-11-18]

Writes OUTDIR/letter-list.csv (mailable rows only) and prints counts by month (safe to paste).
Nothing is sent to data.ny.gov except the query; nothing is written to the CRM.
"""
from __future__ import annotations

import argparse
import collections
import csv
import datetime
import json
import os
import re
import urllib.parse
import urllib.request

URL = 'https://data.ny.gov/resource/n9v6-gdp6.json?'
PLLC = "entity_type = 'DOMESTIC PROFESSIONAL SERVICE LIMITED LIABILITY COMPANY'"

# First match wins. Name match only: a PLLC whose name doesn't state the profession is missed.
PATTERNS = [
    ('Psychiatric NP', 'psychiatric NPs',
     r'\bNP IN PSYCHIATRY\b|PSYCHIATRIC NURSE|\bPMHNP\b|NURSE PRACTI\w* IN PSYCHIATRY|\bNP\b.*PSYCHIATR|PSYCHIATR.*\bNP\b'),
    ('LCSW / social work', 'LCSWs', r'\bLCSW\b|CLINICAL SOCIAL WORK|SOCIAL WORK'),
    ('Mental health counseling', 'mental health counselors', r'\bLMHC\b|MENTAL HEALTH COUNSEL'),
    ('Marriage and family therapy', 'marriage and family therapists', r'\bLMFT\b|MARRIAGE AND FAMILY|FAMILY THERAP'),
    ('Creative arts therapy', 'creative arts therapists', r'CREATIVE ARTS|\bLCAT\b|ART THERAP|MUSIC THERAP|DRAMA THERAP'),
    ('Psychology', 'psychologists', r'PSYCHOLOG'),
    ('Psychotherapy / counseling (other)', 'therapists',
     r'PSYCHOTHERAP|PSYCHOANALY|COUNSELING|COUNSELLING|MENTAL HEALTH|BEHAVIORAL HEALTH'),
    ('Psychiatry (MD or unstated)', 'psychiatric providers', r'PSYCHIATR'),
]
ABA = r'BEHAVIOR ANALY|APPLIED BEHAVIOR|\bABA\b'          # held, as in the existing-customer campaign
LMSW = r'\bLMSW\b|MASTER SOCIAL WORK'                      # can't panel independently; dropped
AGENT = ('REGISTERED AGENT', 'LAW', 'ACCUMERA', 'USACORP', 'CORPORATION SYSTEM', 'LEGALINC',
         'INCORP', 'FILINGS', 'P.C.', 'ESQ', 'LLP')        # c/o an agent or law firm: letter won't reach the clinician


def norm(s: str | None) -> str:
    s = (s or '').upper().replace('&', ' AND ')
    s = re.sub(r'[^A-Z0-9 ]', ' ', s)
    s = re.sub(r'\b(P ?L ?L ?C|PLLC|PROFESSIONAL LIMITED LIABILITY COMPANY|THE)\b', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def fetch(start: str, end: str) -> list[dict]:
    where = f"{PLLC} AND initial_dos_filing_date >= '{start}T00:00:00' AND initial_dos_filing_date < '{end}T00:00:00'"
    q = urllib.parse.urlencode({'$where': where, '$limit': 50000})
    return json.load(urllib.request.urlopen(URL + q, timeout=120))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('outdir')
    ap.add_argument('--start', default=(datetime.date.today() - datetime.timedelta(days=90)).isoformat())
    ap.add_argument('--end', default=datetime.date.today().isoformat())
    a = ap.parse_args()

    crm = json.load(open(os.path.join(a.outdir, 'crm-pllcs.json')))
    ours_n = {norm(r['name']) for r in crm['DATABASE_URL'] or []}
    ours_id = {str(r['dosEntityId']) for r in crm['DATABASE_URL'] or [] if r['dosEntityId']}
    mbs_n = {norm(r['name']) for r in crm['MBS_DATABASE_URL'] or []}
    mbs_id = {str(r['dosEntityId']) for r in crm['MBS_DATABASE_URL'] or [] if r['dosEntityId']}

    counts = collections.defaultdict(collections.Counter)
    keep = []
    for x in fetch(a.start, a.end):
        name = x['current_entity_name'].upper()
        hit = next(((lab, plural) for lab, plural, p in PATTERNS if re.search(p, name)), None)
        is_aba = bool(re.search(ABA, name))
        if not hit and not is_aba:
            continue
        m = x['initial_dos_filing_date'][:7]
        c = counts[m]
        c['bh_named'] += 1
        n = norm(name)
        pname = (x.get('dos_process_name') or '').upper()
        if n in ours_n or x['dos_id'] in ours_id:
            c['ours_crm'] += 1; continue
        if n in mbs_n or x['dos_id'] in mbs_id:
            c['mbs_tenant'] += 1; continue
        if x.get('county') == 'Rockland':      # we file every order in Rockland; unmatched ones may be ours
            c['rockland_unmatched'] += 1; continue
        if not hit:
            c['aba_held'] += 1; continue
        if re.search(LMSW, name):
            c['lmsw'] += 1; continue
        c['list'] += 1
        if any(k in pname for k in AGENT):
            c['agent_address'] += 1; continue
        c['mailable'] += 1
        keep.append({
            'dos_id': x['dos_id'], 'pllc_name': x['current_entity_name'], 'filed': x['initial_dos_filing_date'][:10],
            'profession': hit[0], 'profession_plural': hit[1], 'county': x.get('county'),
            'process_name': x.get('dos_process_name'), 'address_1': x.get('dos_process_address_1'),
            'city': x.get('dos_process_city'), 'state': x.get('dos_process_state'), 'zip': x.get('dos_process_zip'),
        })

    cols = ['bh_named', 'ours_crm', 'mbs_tenant', 'rockland_unmatched', 'aba_held', 'lmsw', 'list', 'agent_address', 'mailable']
    print('month | ' + ' | '.join(cols))
    tot = collections.Counter()
    for m in sorted(counts):
        tot.update(counts[m])
        print(m + ' | ' + ' | '.join(str(counts[m][k]) for k in cols))
    print('total | ' + ' | '.join(str(tot[k]) for k in cols))

    out = os.path.join(a.outdir, 'letter-list.csv')
    with open(out, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(keep[0].keys()) if keep else ['dos_id'])
        w.writeheader(); w.writerows(keep)
    print(f'{len(keep)} mailable rows -> {out}')


if __name__ == '__main__':
    main()
