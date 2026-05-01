#!/usr/bin/env bash
# Draft a client email from a FULL NYSED email using Claude Haiku. The model
# extracts naming/document-wording requirements and ignores boilerplate.
# Output is body only; use subject "PLLC name corrections needed" when sending.
# Usage:
#   export ANTHROPIC_API_KEY=...
#   ./scripts/draft_client_email_nysed.sh < saved-email.txt
#   ./scripts/draft_client_email_nysed.sh "$(cat saved-email.txt)"
#
# Optional: HAIKU_MODEL=claude-haiku-4-5-20251001 (or claude-haiku-4-5 if your key supports the alias)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  set -a
  [[ -f "${REPO_ROOT}/web/.env" ]] && . "${REPO_ROOT}/web/.env"
  [[ -f "${REPO_ROOT}/web/.env.local" ]] && . "${REPO_ROOT}/web/.env.local"
  set +a
fi

MODEL="${HAIKU_MODEL:-claude-haiku-4-5-20251001}"

if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "Set ANTHROPIC_API_KEY (e.g. in web/.env.local) or export it in the environment." >&2
  exit 1
fi

if [[ -n "${1:-}" ]]; then
  FULL_EMAIL="$1"
else
  FULL_EMAIL="$(cat)"
fi

if [[ -z "${FULL_EMAIL//[$' \t\n\r']}" ]]; then
  echo "Provide the full NYSED email as the first argument or on stdin." >&2
  exit 1
fi

export HAIKU_MODEL="$MODEL"
REQUEST_JSON="$(printf '%s' "$FULL_EMAIL" | python3 -c '
import json, os, sys

full = sys.stdin.read()
model = os.environ.get("HAIKU_MODEL", "claude-haiku-4-5-20251001")

prompt = """You draft short emails for a New York professional entity (PLLC) formation practice. NYS Education Department (Professional Corporations) has emailed with feedback. The client’s only job in this email is to choose or confirm the legal entity name that will satisfy the state. Your firm handles documents and agency follow-up—you never describe that work, timelines, or filing steps to the client in this email.

FULL EMAIL FROM THE STATE (paste everything you have — may include signatures and process language):
""" + full + """

STEP 1 — INTERNAL (do not output this step): From the email, extract only naming rules the client must satisfy: words or phrases that must appear in the legal name, words that must be removed or avoided, misleading or promissory terms, restrictions (e.g. certain phrases reserved for other professions), and any choice the state offers (e.g. alternate acceptable profession wording). Ignore everything else.

STEP 2 — OUTPUT: Write one email I can send to my client.

Client-facing rules (strict):
- Plain English, brief. One short line that the state had feedback on the proposed name is enough context.
- Focus only on what they need to decide: their compliant legal entity name. You may quote short phrases the state explicitly requires or forbids (wording from the email only).
- No suggested names: Do not propose, illustrate, or complete example entity names—no "for example," no formulas, no bracket placeholders like [Your Business Name], and no sample combinations of words. Do not invent name patterns. Ask them to reply with the exact full legal name they want to use (or to confirm one exact string if they already proposed it and only a tweak is needed).
- Do not mention Articles of Organization, affidavits, notarization, PDFs, email chains, paragraphs, exhibit or item numbers, or "everywhere the name appears," even if the state email discusses them.
- No process / next-step language: Do not mention resubmission, filing, applications, reviews with the agency, or what you will do after they reply. Banned phrases include but are not limited to: "resubmit," "resubmission," "move forward," "proceed with," "next steps," "once you confirm we…," "we will take it from there," "from there," or similar. End by asking them to reply with the exact full legal name (or confirm one exact string)—period.
- Naming accuracy: If the state says a phrase must be included in the entity name, do not say they must "rename the company to" that phrase alone or imply the legal name is only that phrase unless the state clearly says so. Say they need a full PLLC name that includes that required language (and omits anything the state rejected), without showing a fabricated example of what that looks like.
- No NYSED letterhead, contact blocks, phone policy, or agency boilerplate.
- Accurate to the state’s rules; do not invent requirements.
- No subject line: Do not output "Subject:", a title line, or anything other than the email body. The subject is set separately (always PLLC name corrections needed).
- Format: Body text only. Do not use "---" or horizontal rules.

Output only the email body. No Step 1, no analysis, no ignored lists."""

body = {
    "model": model,
    "max_tokens": 2048,
    "messages": [{"role": "user", "content": prompt}],
}
print(json.dumps(body))
')"

RESPONSE="$(curl -sS https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: ${ANTHROPIC_API_KEY}" \
  -H "anthropic-version: 2023-06-01" \
  -d "$REQUEST_JSON")"

if echo "$RESPONSE" | python3 -c 'import json,sys; d=json.load(sys.stdin); sys.exit(0 if "content" in d else 1)' 2>/dev/null; then
  echo "$RESPONSE" | python3 -c 'import json,sys; d=json.load(sys.stdin); print("".join(b.get("text","") for b in d.get("content",[]) if b.get("type")=="text"))'
else
  echo "$RESPONSE" >&2
  exit 1
fi
