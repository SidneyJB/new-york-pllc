# Self-block check — October 21, 2026

**Account:** 1529880213  
**Pull:** this folder. Keyword settings 178 rows. Ad-group negatives 141 rows. Shared negatives 151 rows. Campaign shared sets 20 rows. Campaign-level keyword negatives 119 rows.  
**Checker:** [self_block_check.py](self_block_check.py). Same phrase rule as the weekly SOP: a phrase negative blocks only when its words appear in order inside the keyword.

## Result

**Pass. 0 self-blocked enabled keywords.**

| Campaign | Enabled keywords in enabled ad groups | Self-blocked |
|---|---:|---:|
| 01_Core_Exact_NY | 48 | 0 |
| 02_Professions_NY | 31 | 0 |
| 03_ForeignQual_US | 39 | 0 |
| Sales-Search-1 | 39 | 0 |

157 keywords checked. **4** enabled keywords were skipped because the ad group is paused (Attorneys). Same counts as the October 18 weekly SOP.

## Short tokens

Shared lists still contain two short phrase negatives. Neither matches an enabled keyword:

- List B, phrase `vs`
- List D, phrase `$0`

No phrase negative under 3 characters, and none of `in` / `or` / `me` / `ok` / `la` / `ca` / `pa` / `co`, sits on a campaign or an ad group.

List sizes: A **53**, A-FQ **44**, B **15**, C **27**, D **5**, E **7**. A is on Sales, `01`, and `02`. A-FQ is on `03` only. The August 4 stop-word abbreviations are not back.

## Coverage

Each enabled campaign has lists B, C, D, and E attached. Sales, `01`, and `02` also have list A. `03` has A-FQ instead of A. No account change from this check.
