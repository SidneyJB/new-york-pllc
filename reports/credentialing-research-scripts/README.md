# Credentialing research scripts (Nov 14 2026)

Scripts behind the credentialing studies in `reports/credentialing-*.md`, copied from the research session's scratchpad. Code only: raw NPI pulls (~40 MB) and CRM query outputs (client names) were not kept.

- `npi/`, `npi2/`: public CMS NPI Registry API pulls of new behavioral-health organization NPIs by state and taxonomy (`npi2/national.py` covers all 50 states + DC; `analyze.py` summarizes).
- `sim/`: simulations for the upside-paths study.
- `sim7/`, `sim8/`: simulations for the path-to-$350–500K-net study (v1 and v2; `sim8/sim3.py` is v2).

They wrote outputs into the session scratchpad; pass an output path or edit the path before re-running.
