# NYSED naming correction → client email (Claude Haiku)

Use this when the **New York State Education Department / Professional Corporations** emails with corrections on the **entity name** or required **profession wording** in the name. The draft you send the client should **only** help them **choose or approve the legal name**—not filing mechanics.

## 1. What you paste into Haiku

Paste the **complete** agency email (thread body is fine: headers like “OPCORP 4:14 PM” do not need to be stripped). Haiku will **decide** which parts are substantive naming/document-wording requirements and **ignore** boilerplate.

## 2. Prompt to send to Claude Haiku

Use **one** user message. Replace the placeholder with the full email.

```
You draft short emails for a New York professional entity (PLLC) formation practice. NYS Education Department (Professional Corporations) has emailed with feedback. The **client’s only job in this email is to choose or confirm the legal entity name** that will satisfy the state. Your firm handles documents and agency follow-up—you **never** describe that work, timelines, or filing steps to the client in this email.

FULL EMAIL FROM THE STATE (paste everything you have — may include signatures and process language):
<<<PASTE FULL NYSED EMAIL HERE>>>

STEP 1 — INTERNAL (do not output this step): From the email, extract **only naming rules** the client must satisfy: words or phrases that must appear in the legal name, words that must be removed or avoided, misleading/promissory terms, restrictions (e.g. certain phrases reserved for other professions), and any **choice** the state offers (e.g. alternate acceptable profession wording). Ignore everything else.

STEP 2 — OUTPUT: Write one email I can send to my client.

**Client-facing rules (strict):**
- Plain English, brief. One short line that the state had feedback on the **proposed name** is enough context.
- Focus **only** on what they need to **decide**: their compliant **legal entity name**. You may **quote** short phrases the state **explicitly** requires or forbids (wording from the email only).
- **No suggested names:** Do **not** propose, illustrate, or complete example entity names—no “for example,” no formulas, no bracket placeholders like `[Your Business Name]`, and no sample combinations of words. Do not invent name patterns. Ask them to reply with the **exact full legal name** they want to use (or to confirm one exact string if they already proposed it and only a tweak is needed).
- **Do not** mention Articles of Organization, affidavits, notarization, PDFs, email chains, paragraphs, exhibit/item numbers, or “everywhere the name appears,” even if the state email discusses them.
- **No process / next-step language:** Do **not** mention resubmission, filing, applications, reviews with the agency, or what you will do after they reply. Banned phrases include but are not limited to: “resubmit,” “resubmission,” “move forward,” “proceed with,” “next steps,” “once you confirm we…,” “we’ll take it from there,” “from there,” or similar. End by asking them to **reply with the exact full legal name** (or confirm one exact string)—period.
- **Naming accuracy:** If the state says a phrase must be **included in** the entity name, do **not** say they must “rename the company to” that phrase alone or imply the legal name **is only** that phrase unless the state clearly says so. Say they need a full PLLC name that **includes** that required language (and omits anything the state rejected), without showing a fabricated example of what that looks like.
- No NYSED letterhead/contact blocks, phone policy, or boilerplate from the agency.
- Accurate to the state’s rules; do not invent requirements.
- **No subject line:** Do **not** output `Subject:`, a title line, or anything other than the email **body**. The subject is set separately (always **PLLC name corrections needed**).
- **Format:** Body text only. Do **not** use `---` or horizontal rules.

Output only the email body. No Step 1, no analysis, no “ignored” lists.
```

## 3. Ways to run Haiku

- **Claude.ai**: Choose **Haiku**, paste section 2 (with the full email in place of the placeholder), send.  
- **API**: From repo root, with `ANTHROPIC_API_KEY` set:

```bash
./scripts/draft_client_email_nysed.sh < email-from-nysed.txt
```

Or pass as one argument (use a file for long threads):

```bash
./scripts/draft_client_email_nysed.sh "$(cat path/to/email.txt)"
```

The script sends the same instructions and the full text you provide. Default API model in `draft_client_email_nysed.sh` is **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`). Older IDs such as `claude-3-5-haiku-latest` may return `not_found` on current API accounts. Override with `HAIKU_MODEL` if you use an alias (e.g. `claude-haiku-4-5`) supported for your key.

The shell script loads `ANTHROPIC_API_KEY` from the environment first, then from `web/.env` and `web/.env.local` if present.

When sending to clients, set the subject in your app to **`PLLC name corrections needed`**; the model output is body-only.
