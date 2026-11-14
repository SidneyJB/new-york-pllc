#!/usr/bin/env python3
"""
Counts from NY's public "Active Corporations: Beginning 1800" data (data.ny.gov n9v6-gdp6),
the same source as P2-11 section 4. Public data only; nothing about our customers is sent.

Run:  python3 new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/ny_open_data_counts.py [--out ny-open-data-output.txt]

Limits to keep in mind when quoting these:
  - Active entities only, so every count is a floor and older years are understated.
  - "Behavioral health" is a name match (the entity name must state the profession), so it is approximate.
  - The process name is who receives legal papers. A registered-agent company there means it is the
    entity's agent, not that it sold the formation.
"""
from __future__ import annotations

import argparse
import datetime
import json
import os
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
URL = 'https://data.ny.gov/resource/n9v6-gdp6.json?'
OUT = []


def say(s=''):
    OUT.append(s)
    print(s)


def q(select, where, group=None, order=None, limit=50):
    p = {'$select': select, '$where': where, '$limit': limit}
    if group:
        p['$group'] = group
    if order:
        p['$order'] = order
    return json.load(urllib.request.urlopen(URL + urllib.parse.urlencode(p), timeout=90))


def n(where):
    return int(q('count(*) as n', where)[0]['n'])


PLLC = "entity_type = 'DOMESTIC PROFESSIONAL SERVICE LIMITED LIABILITY COMPANY'"
PC = "entity_type = 'DOMESTIC PROFESSIONAL SERVICE CORPORATION'"
YEAR = "initial_dos_filing_date >= '2025-11-01T00:00:00' AND initial_dos_filing_date < '2026-11-01T00:00:00'"
NAME = 'upper(current_entity_name)'
BH = '(' + ' OR '.join(f"{NAME} like '%{w}%'" for w in (
    'SOCIAL WORK', 'LCSW', 'MENTAL HEALTH', 'PSYCH', 'COUNSELING', 'BEHAVIOR', 'LMHC', 'LMFT',
    'FAMILY THERAP', 'PSYCHOTHERAP', 'CREATIVE ARTS')) + ')'
MED = '(' + ' OR '.join(f"{NAME} like '%{w}%'" for w in (
    'MEDIC', 'PHYSICIAN', ' MD', 'M.D.', 'DENT', 'D.D.S', 'DDS', 'SURG', 'CARDIO', 'PEDIATR', 'DERMAT', 'ORTHO')) + ')'
OURS = "(upper(dos_process_address_1) like '%BLUE HILL%' OR county='Rockland')"

say(f'NY open data counts, pulled {datetime.datetime.utcnow().isoformat(timespec="seconds")}Z')
say()
say('1. Filed Nov 1 2025 - Oct 31 2026, still active')
for label, t in (('Domestic PLLCs', PLLC), ('Domestic PCs', PC),
                 ('Foreign PLLCs', "entity_type = 'FOREIGN PROFESSIONAL SERVICE LIMITED LIABILITY COMPANY'"),
                 ('Foreign PCs', "entity_type = 'FOREIGN PROFESSIONAL SERVICE CORPORATION'")):
    say(f'   {label:16s} {n(t + " AND " + YEAR):6d}')
r = q('date_trunc_ym(initial_dos_filing_date) as m, count(*) as n', PLLC + ' AND ' + YEAR, 'm', 'm')
say('   Domestic PLLCs by month: ' + ', '.join(f"{x['m'][:7]} {x['n']}" for x in r))
r = q('county, count(*) as n', PLLC + ' AND ' + YEAR, 'county', 'n DESC', 10)
say('   Domestic PLLCs by county: ' + ', '.join(f"{x.get('county')} {x['n']}" for x in r))
r = q('county, count(*) as n', PC + ' AND ' + YEAR, 'county', 'n DESC', 10)
say('   Domestic PCs by county:   ' + ', '.join(f"{x.get('county')} {x['n']}" for x in r))

say()
say('2. Who is named for service of process on those PLLCs (top 12)')
r = q('upper(dos_process_name) as p, count(*) as n', PLLC + ' AND ' + YEAR, 'p', 'n DESC', 12)
for x in r:
    say(f"   {x['n']:>5}  {x.get('p')}")
say(f'   At 1 Blue Hill Plaza (our mail clients): {n(PLLC + " AND " + YEAR + " AND upper(dos_process_address_1) like " + chr(39) + "%BLUE HILL%" + chr(39))}')

say()
say('3. Behavioral-health names')
say(f'   Domestic PLLCs filed in the 12 months: {n(PLLC + " AND " + YEAR + " AND " + BH)}')
say(f'     of those in Rockland County or at Blue Hill Plaza (roughly ours): {n(PLLC + " AND " + YEAR + " AND " + BH + " AND " + OURS)}')
say(f'   Active domestic PLLCs, all years: {n(PLLC + " AND " + BH)}')
say(f'   Active domestic PCs, all years:   {n(PC + " AND " + BH)}')
r = q('date_extract_y(initial_dos_filing_date) as y, count(*) as n',
      PLLC + ' AND ' + BH + " AND initial_dos_filing_date >= '2016-01-01T00:00:00'", 'y', 'y')
say('   Domestic PLLCs by filing year: ' + ', '.join(f"{x['y']} {x['n']}" for x in r))

say()
say('4. Size of the installed base')
say(f'   Active domestic PLLCs, all years: {n(PLLC)}')
say(f'   Active domestic PCs, all years:   {n(PC)}')
say(f'   Domestic PCs filed in the 12 months with medical or dental names: {n(PC + " AND " + YEAR + " AND " + MED)}')

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out')
    a = ap.parse_args()
    if a.out:
        with open(os.path.join(HERE, os.path.basename(a.out)), 'w') as f:
            f.write('\n'.join(OUT) + '\n')
