#!/usr/bin/env node
/**
 * 01-internal-demand-signals: what clients asked about by email (last 12 months), plus customer-base counts.
 * READ-ONLY: Postgres session opened with default_transaction_read_only=on (stops if not confirmed). SELECT only.
 * Default tenant database (DATABASE_URL) only, never the MBS one.
 * Prints aggregates to stdout. With --samples <dir>, writes match snippets for hand-checking to <dir>
 * (use a scratch folder outside the repo; snippets are not part of the report).
 *
 * Run from the workspace root:
 *   node new-york-pllc/reports/new-lines-research-2026-11-18/scripts/02_topics.cjs [--samples /path/to/scratch]
 */
const fs = require('fs')
const path = require('path')
const { ro, pool } = require('./_ro.cjs')

// ---- sender exclusions (government, newspapers, vendors, partners, our own) ----
const EXCL_DOMAIN = new RegExp([
  String.raw`\.gov$`, String.raw`\.gov\.`, String.raw`\.mil$`, 'nysed', 'zendesk', 'state\\.[a-z]{2}\\.us$', 'njportal',
  'nypllc\\.com$', 'nyllc\\.com$', // own + sister company
  'hamodia', 'newspaper', 'times', 'post\\.com$', 'gazette', 'journal', 'courier', 'herald', 'tribune', 'legals?\\b', 'lawjournal', 'dailyrecord', 'news',
  'google\\.com$', 'googlemail', 'cognitoforms', 'adobesign', 'adobe\\.com$', 'proof\\.com$', 'notarize', 'spiffy', 'quo\\.com$', 'tawk\\.to', 'usps',
  'jotform', 'fax\\.plus', 'alohi', 'pirateship', 'stripe', 'slack', 'easypost', 'microsoft', 'apple\\.com$', 'intuit', 'docusign', 'dropbox', 'zapier',
  'vercel', 'github', 'twilio', 'openphone', 'calendly', 'zoom\\.us', 'hubspot', 'mailchimp', 'linkedin', 'facebook', 'meta\\.com', 'amazon', 'paypal',
  'myfilingservices', 'fideliscare', 'carelon', 'caqh', 'availity', 'sendgrid', 'squarespace', 'godaddy', 'namecheap', 'wix', 'yelp', 'bing',
].join('|'), 'i')
const EXCL_LOCAL = /^(no-?reply|do-?not-?reply|mailer-daemon|postmaster|notifications?|alerts?|bounce|support|billing|info|news|legals?|receipts?)\b/i

// ---- topics: keyword regexes applied to subject + the client's own text (quoted replies and disclaimers removed) ----
const TOPICS = [
  // [label, match regex, optional exclusion regex applied to the same sentence]
  ['T01 taxes / accountant / bookkeeping / CPA', String.raw`\b(accountants?|accounting (firm|services?|help)|bookkeep\w*|tax returns?|tax filings?|file (my|our|the) (business )?taxes|do (my|our) taxes|tax prep\w*|tax advi\w*|tax professional|tax planning|tax guy|quarterly (estimated )?tax\w*|estimated tax\w*|1120-?s?|form 1065|k-1|cpa (help|services?|recommendation|referral)|(need|recommend|refer)\w* (a |an )?(cpa|accountant))\b`],
  ['T02 payroll / hiring an employee / workers comp / DBL-PFL', String.raw`\b(payroll|hir(e|ed|ing) (an? |my first |our first )?(employees?|staff|therapists?|clinicians?|providers?|w-?2|assistant|receptionist|nurse)|employees?|w-?2 (employee|staff)|workers'? ?comp\w*|disability (insurance|benefits|coverage)|dbl|paid family leave|pfl|unemployment insurance|gusto|adp)\b`, String.raw`number of employees|employer identification|employee or agent`],
  ['T03 malpractice / liability insurance', String.raw`\b(malpractice|liability insurance|professional liability|general liability|liability (coverage|policy)|certificate of insurance|coi|hpso|cm&f|tail coverage|business insurance)\b`, String.raw`car insurance|vehicle insurance|home or vehicle`],
  ['T04 website / domain / business email / phone number', String.raw`\b((my|our|a|new|own|business|practice|practice's|company|pllc|firm's|professional) (websites?|web ?site)|build\w* (a |my |our )?(websites?)|work on a website|website (for|design|builder|branding)|domain( names?)?|business emails?|professional emails?|email domain|google workspace|g ?suite|business (phone|line) (number|service)|phone line|google voice|virtual phone|phone system|logo)\b`, String.raw`free call registry|first orion|website analyst`],
  ['T05 HIPAA / compliance / BAA', String.raw`\b(hipaa|hippa|baa'?s?|business associate|compliance (program|officer|requirements?|training)|osha|notice of privacy practices|regulatory (compliance|things|requirements))\b`],
  ['T06 DEA / CLIA / prescribing / controlled substances', String.raw`\b(dea|clia|prescrib\w*|prescriptions?|controlled substances?|i-?stop|narcotic|buprenorphine|suboxone|x-?waiver)\b`],
  ['T07 license renewal / license in another state', String.raw`(licen[cs]e renewal|renew\w* (my|the|her|his|our) (professional |nursing |medical |dental )?licen[cs]e|licen[cs]e (in|for) (another|other|a different|multiple) states?|licen[cs]ed in (another|other|multiple) states|\b(new jersey|nj|connecticut|ct|florida|california|pennsylvania|massachusetts|texas|vermont|maryland|virginia|georgia|illinois|colorado|arizona|washington|michigan|ohio|north carolina|delaware) (state )?(dental |nursing |medical )?licen[cs]e|licen[cs]ed in\b.{0,30}\b(new jersey|nj|connecticut|ct|florida|california|pennsylvania|massachusetts|ma|texas|vermont|maryland|virginia|va|georgia|illinois|colorado|maine)\b|dual licensed|psypact|counseling compact|nurse licensure compact|\bnlc\b|interstate (medical )?licen)`],
  ['T08 forming / registering in another state', String.raw`(another state|other states|out[- ]of[- ]state|multi[- ]?state|(form|open|register|regist\w+|qualify|qualified|set ?up|start|expand|file|do business)\w* .{0,40}\b(in|into|for) (new jersey|nj|connecticut|florida|california|pennsylvania|massachusetts|texas|vermont|maryland|virginia|georgia|illinois|colorado|arizona|delaware|wyoming|nevada|north carolina|michigan|ohio|montana|washington)\b|\b(new jersey|nj|connecticut|florida|california|pennsylvania|massachusetts|texas|delaware|wyoming|washington|wa) (pllc|llc|pc|entity|company|corporation|professional corporation|foreign registration|dba)\b)`, String.raw`\b(in|into|business in|to) (new york|nys|nyc)\b|foreign (policy|pllc) in the state of ny`],
  ['T09 nonprofit / 501(c)(3)', String.raw`(non-?profit|not[- ]for[- ]profit|501 ?\(?c\)?|charit(y|able) (organization|foundation))`, String.raw`mistake the firm`],
  ['T10 trademark', String.raw`(trademark|uspto|service mark|\btm\b registration)`],
  ['T11 contracts / lease / employment-contractor agreement / lawyer referral', String.raw`\b(contracts?|lease|sublease|employment (agreements?|contracts?)|contractor agreements?|non-?compete|(lawyer|attorney) (referral|recommendation)|(refer|recommend)\w* (me )?(to )?(a|an) (lawyer|attorney)|lawyer you refer|need (a|an) (lawyer|attorney)|legal (advice|services)|review (a|the|my|our) (contract|agreement|lease))\b`, String.raw`lease agreement|current lease, mortgage|contract work|contract worker|terminated for cause|current contract with us|contract directly with insurance`],
  ['T12 add / remove member-owner; sell or close practice', String.raw`(add\w* (a |an |another |new |second )?(member|partner|owner|co-?owner)s?\b|remov\w* (a |an )?(member|partner|owner)|new (member|partner|owner)s?\b|second owner|buy-?out|bought out|sell\w* (the|my|our) (practice|business|pllc)|clos\w* (the|my|our) (practice|business|pllc|company)|dissol\w*|shut\w* (it )?down|wind\w* down|transfer\w* (of )?ownership|ownership (change|transfer))`, String.raw`admission of additional members|shut down my current bank`],
  ['T13 annual state tax filing / fee (IT-204-LL, annual fee, franchise tax)', String.raw`(it-?204|annual (filing )?fee|yearly fee|franchise tax|annual (report|filing|reporting|regulatory)\w*|(ongoing|recurring) (or annual )?fees)`, String.raw`registered[- ]agent|\$99|florida business must|nj annual reports`],
  ['T14 EHR / practice software', String.raw`\b(ehr|emr|simple ?practice|therapy ?notes|athena\w*|kareo|tebra|practice management|electronic (health|medical) records?|health records|charm ?health|jane app|ivy ?pay|valant|practice ?better)\b`],
  ['T15 apostille', String.raw`(apostille|embassy|consulate|authenticat\w+ (of )?(the )?(document|certificate|articles))`],
  ['T16 operating agreement changes', String.raw`((amend|chang|updat|revis|modif|redo|rewrit|correct)\w* .{0,60}operating agreement|operating agreement.{0,100}(amend|chang|updat|revis|modif|correct|clarif|provision|additions?))`],
  ['T17 business credit card / loan', String.raw`(business credit|credit card for (the|my|our) (business|practice|pllc)|corporate card|amex business|\bloans?\b|line of credit|\bsba\b|lender|financing for)`],
  ['T18 "do you also / can you help with / do you offer"', String.raw`(do you (also )?(offer|provide|handle|help|assist|do|guys)\b|can you (also )?(help|assist|handle|set up|take care)|could you (also )?(help|assist|handle)|(does|do) (your|y'?all) (company|firm|team|service|office) (also )?(offer|provide|do|handle|help)|is (this|that|it) something you (do|offer|handle|can help|provide)|would you be able to (help|assist|handle)|(are|is) (you|your (company|firm|team|office)) able to (help|assist|handle|work)|is there anything (else |other than .{0,30})?(that )?you('re| are)? (able to )?(assist|help)|any chance i can pay you)`],
]
const OP_AGMT_ALL = /operating agreement/i

// ---- profession groups ----
function group(p) {
  p = (p || '').toLowerCase()
  if (!p.trim()) return 'unknown'
  if (/psychiatr/.test(p) && /nurse|np/.test(p)) return 'psych NP'
  if (/social work|lcsw|lmsw|mental health|counsel|marriage|family therap|creative arts|psycholog|psychoanal|behavior anal|psychotherap/.test(p)) return 'therapist'
  if (/nurse practitioner|physician assist|\bnp\b/.test(p)) return 'other NP-PA'
  if (/veterin/.test(p)) return 'other'
  if (/^medicine|physician|medical doctor|\bmd\b|osteopath/.test(p)) return 'physician'
  if (/dentist(ry)?\b|^dentistry/.test(p) && !/hygien/.test(p)) return 'dentist'
  if (/nurs|physical therap|occupational|speech|chiro|acupunct|massage|podiat|optom|diet|nutrition|pharm|midwi|audiol|hygien|aesthetic|respiratory|athletic/.test(p)) return 'other health'
  if (/\blaw\b|legal|attorney/.test(p)) return 'law'
  return 'other'
}
const GROUPS = ['therapist', 'psych NP', 'other NP-PA', 'physician', 'dentist', 'other health', 'law', 'other', 'unknown']

// ---- body cleaning ----
// Cut quoted replies, our own text, signatures and disclaimers; drop boilerplate sentences.
const CUT = [/\n\s*On .{5,200}?wrote:/s, /\bOn [A-Z][a-z]{2}, .{5,80}?wrote:/s, /<?contact@nypllc\.com>? (wrote|于)/i, /\n-{2,}\s*Original Message/i, /\n_{5,}/,
  /\bFrom: .{0,80}(Sent|Date): /is, /\bFrom: Sid\b/i, /Sid[’']s reply:/i, /-- ?Sid Brodsky/i, /Sid Brodsky\s+Founder/i, /\n\s*Sent from my /i, /Sent from \[?Proton/i,
  /\n\s*Get Outlook for/i, /\n-- ?\n/, /\*?Disclaimer\*?/i, /PRIVACY STATEMENT/i, /CONFIDENTIALITY NOTICE/i, /\*IMPORTANT:\*/i, /This (e-?mail )?message \(and any attachments/i,
  /The information contained in this/i, /-{10,}\*/]
const BOILER = /confidential|intended (only |solely )?for the (use|recipient)|intended recipient|privileged|unauthorized (review|use|disclosure)|if you (have )?received this|42 ?cfr|not the recipient|unsubscribe|opted in|update your preferences|you are receiving this|privacy policy|terms of service|click here|website: |www\.|phone\/fax|https?:|within the last (five|seven) years|wishing you joy|\?: ?(no|yes)\b|construed as legal advice|shall not operate to bind|upload up to \d+ files|tax advice contained in this/i
function clean(subject, body) {
  let b = (body || '').replace(/\r/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
  for (const re of CUT) { const m = b.search(re); if (m > 0) b = b.slice(0, m) }
  b = b.split('\n').filter((l) => !/^\s*>/.test(l)).join('\n').slice(0, 3000)
  let t = (subject || '') + '\n' + b
  t = t.replace(/\b(your|nypllc(\.com)?'?s?|the nypllc) (web ?site|site)\b/gi, ' ')
  return t.split(/(?<=[.!?])\s+|\n+/).filter((x) => x.trim() && !BOILER.test(x))
}
// vendor solicitations / platform notices from senders not linked to a client record
const VENDOR_TEXT = /unsubscribe|opted in|update your preferences|you are receiving this|website (improvement|design|redesign|audit)|build (new )?websites|web design|rank (higher )?on google|backlinks|\bseo\b services|platform polic|intellectual property rights violation|advertising account|new llcs and corporations were formed|lead list|webinar|free trial|special offer|limited time/i
;(async () => {
  await ro()
  const q = async (s, p) => (await pool.query(s, p)).rows
  const out = []
  const say = (s) => { out.push(s); console.log(s) }
  say(`Pulled ${new Date().toISOString()} (session default_transaction_read_only=on confirmed; default tenant DATABASE_URL)`)

  // partner addresses to exclude
  const partnerEmails = new Set((await q(`SELECT lower(email) e FROM "Partner" UNION SELECT lower("contactEmail") FROM b2b_partners`)).map((r) => r.e))

  // customer -> profession group, earliest formation filed date
  const custRows = await q(`
    WITH links AS (
      SELECT o."customerId" cid, o."pllcsId" pid FROM "Order" o WHERE o."customerId" IS NOT NULL AND o."pllcsId" IS NOT NULL
      UNION SELECT w."customerId", w."pllcId" FROM "PllcOwner" w WHERE w."customerId" IS NOT NULL),
    lic AS (SELECT DISTINCT ON (coalesce(l."customerId", l."pllcId")) l."customerId", l."pllcId", l.profession FROM "ProfessionalLicense" l ORDER BY coalesce(l."customerId", l."pllcId"), l."createdAt")
    SELECT c.id, lower(c.email) email, c."alternateEmails" alts,
      coalesce(nullif(c.profession,''), (SELECT l.profession FROM "ProfessionalLicense" l WHERE l."customerId"=c.id AND coalesce(l.profession,'')<>'' ORDER BY l."createdAt" LIMIT 1),
        (SELECT l.profession FROM links k JOIN "ProfessionalLicense" l ON l."pllcId"=k.pid WHERE k.cid=c.id AND coalesce(l.profession,'')<>'' ORDER BY l."createdAt" LIMIT 1)) prof,
      (SELECT min(p."formationDocumentFiledAt") FROM links k JOIN "Pllc" p ON p.id=k.pid WHERE k.cid=c.id) filed
    FROM "Customer" c`)
  const cust = new Map(custRows.map((r) => [r.id, r]))

  // emails, last 12 months
  const emails = await q(`SELECT id, lower("fromEmail") f, "customerId" cid, "enterpriseCustomerId" eid, subject, coalesce("bodyPlain", snippet, '') body, "receivedAt" d
    FROM "InboundEmail" WHERE "receivedAt" >= now() - interval '12 months'`)
  say(`InboundEmail rows, last 12 months: ${emails.length}`)

  const isExcluded = (f) => { const [loc, dom] = f.split('@'); return !dom || EXCL_DOMAIN.test(dom) || EXCL_LOCAL.test(loc) || partnerEmails.has(f) }
  const kept = []
  let exclLinked = 0, exclUnlinked = 0, vendorUnl = 0
  for (const e of emails) {
    const linked = !!(e.cid || e.eid)
    if (isExcluded(e.f)) { linked ? exclLinked++ : exclUnlinked++; continue }
    const sents = clean(e.subject, e.body)
    if (!linked && VENDOR_TEXT.test((e.subject || '') + ' ' + (e.body || '').slice(0, 4000))) { vendorUnl++; continue }
    kept.push({ ...e, linked, sents, t: sents.join(' \n ') })
  }
  const linkedN = kept.filter((e) => e.linked)
  const unl = kept.filter((e) => !e.linked)
  say(`Excluded by sender address as government/newspaper/vendor/partner/own: ${exclLinked} linked + ${exclUnlinked} unlinked messages; unlinked vendor solicitations/platform notices by text: ${vendorUnl}`)
  say(`Kept: client-linked ${linkedN.length} messages from ${new Set(linkedN.map((e) => e.f)).size} senders; unlinked ${unl.length} messages from ${new Set(unl.map((e) => e.f)).size} senders`)

  const res = []
  const samples = {}
  for (const [name, pat, ex] of TOPICS) {
    const re = new RegExp(pat, 'i'); const exre = ex ? new RegExp(ex, 'i') : null
    const hit = (e) => e.sents.find((x) => re.test(x) && !(exre && exre.test(x)))
    const m = kept.filter((e) => hit(e))
    const ml = m.filter((e) => e.linked), mu = m.filter((e) => !e.linked)
    const byG = {}; const sByG = {}
    let before = 0, after = 0, nofile = 0
    for (const e of ml) {
      let g = 'unknown', filed = null
      if (e.cid && cust.has(e.cid)) { g = group(cust.get(e.cid).prof); filed = cust.get(e.cid).filed }
      else if (e.eid) g = 'other' // intermediary firm (enterprise customer)
      byG[g] = (byG[g] || 0) + 1; (sByG[g] = sByG[g] || new Set()).add(e.f)
      if (!filed) nofile++; else if (e.d < filed) before++; else after++
    }
    res.push({ name, senders: new Set(ml.map((e) => e.f)).size, msgs: ml.length, uSenders: new Set(mu.map((e) => e.f)).size, uMsgs: mu.length,
      byG: Object.fromEntries(GROUPS.map((g) => [g, `${sByG[g] ? sByG[g].size : 0}/${byG[g] || 0}`])), before, after, nofile })
    // deterministic sample of 15 (linked + unlinked) for hand check
    const pick = [...m].sort((a, b) => (hash(a.id) - hash(b.id))).slice(0, 15)
    const ctx = (e) => { const h = hit(e); const k = e.sents.indexOf(h); return `[${e.linked ? 'L' : 'U'}] ` + e.sents.slice(Math.max(0, k - 1), k + 2).join(' ').replace(/\s+/g, ' ').slice(0, 600) }
    samples[name] = pick.map(ctx)
    samples[name + ' ALL'] = m.map(ctx)
  }
  function hash(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }

  say('\n## Topic counts (client-linked senders = matched to a CRM Customer or enterprise intermediary)')
  say('topic | senders | messages | unlinked senders | unlinked msgs | msgs before filing | after filing | no filed entity')
  for (const r of res) say(`${r.name} | ${r.senders} | ${r.msgs} | ${r.uSenders} | ${r.uMsgs} | ${r.before} | ${r.after} | ${r.nofile}`)
  say('\n## By profession group (senders/messages), client-linked only')
  say('topic | ' + GROUPS.join(' | '))
  for (const r of res) say(`${r.name.slice(0, 3)} | ` + GROUPS.map((g) => r.byG[g]).join(' | '))
  const oa = kept.filter((e) => e.sents.some((x) => OP_AGMT_ALL.test(x)))
  say(`\nAny mention of "operating agreement": ${new Set(oa.filter((e) => e.linked).map((e) => e.f)).size} linked senders / ${oa.filter((e) => e.linked).length} msgs; unlinked ${new Set(oa.filter((e) => !e.linked).map((e) => e.f)).size} / ${oa.filter((e) => !e.linked).length}`)

  // sender base by group (denominator)
  const gs = {}
  for (const e of linkedN) { let g = e.cid && cust.has(e.cid) ? group(cust.get(e.cid).prof) : 'other'; (gs[g] = gs[g] || new Set()).add(e.f) }
  say('\nClient-linked senders by group (denominator): ' + GROUPS.map((g) => `${g} ${gs[g] ? gs[g].size : 0}`).join(', '))

  // ---- customer base ----
  const T = async (label, sql) => { const r = await q(sql); say('\n## ' + label); if (!r.length) return say('(no rows)'); const cols = Object.keys(r[0]); say(cols.join(' | ')); for (const x of r) say(cols.map((c) => x[c] === null ? '-' : String(x[c])).join(' | ')) }
  const PAIDCUST = `SELECT DISTINCT o."customerId" cid FROM "Order" o WHERE o."customerId" IS NOT NULL AND o."totalCents">0`
  await T('B1. Customers (with >=1 paid order) by state of residence (Customer.state)', `
    WITH c AS (SELECT CASE WHEN coalesce(trim(c.state),'')='' THEN '(blank)' WHEN upper(trim(c.state)) IN ('NY','NEW YORK') THEN 'NY'
      WHEN upper(trim(c.state)) IN ('NJ','NEW JERSEY') THEN 'NJ' WHEN upper(trim(c.state)) IN ('CT','CONNECTICUT') THEN 'CT' WHEN upper(trim(c.state)) IN ('FL','FLORIDA') THEN 'FL'
      WHEN upper(trim(c.state)) IN ('PA','PENNSYLVANIA') THEN 'PA' WHEN upper(trim(c.state)) IN ('CA','CALIFORNIA') THEN 'CA' WHEN upper(trim(c.state)) IN ('MA','MASSACHUSETTS') THEN 'MA'
      WHEN upper(trim(c.state)) IN ('TX','TEXAS') THEN 'TX' ELSE upper(trim(c.state)) END st FROM "Customer" c WHERE c.id IN (${PAIDCUST}))
    SELECT st AS state, count(*) AS customers FROM c GROUP BY 1 ORDER BY 2 DESC`)
  const ENT = `p.name NOT ILIKE '%E2E TEST%' AND coalesce(p."formationStatus",'')<>'CANCELLED_AND_REFUNDED'`
  await T('B2. Customers linked to 2+ entities (owner rows or orders; excludes cancelled/test)', `
    WITH links AS (SELECT o."customerId" cid, o."pllcsId" pid FROM "Order" o WHERE o."customerId" IS NOT NULL AND o."pllcsId" IS NOT NULL
      UNION SELECT w."customerId", w."pllcId" FROM "PllcOwner" w WHERE w."customerId" IS NOT NULL),
    n AS (SELECT k.cid, count(DISTINCT k.pid) n FROM links k JOIN "Pllc" p ON p.id=k.pid WHERE ${ENT} GROUP BY 1)
    SELECT count(*) FILTER (WHERE n>=2) AS customers_2plus, count(*) FILTER (WHERE n>=3) AS customers_3plus, count(*) AS customers_with_entity FROM n`)
  await T('B2b. Enterprise (intermediary) customers and their entity counts', `
    SELECT count(*) AS enterprise_customers, count(*) FILTER (WHERE n>=2) AS with_2plus, sum(n) AS entities FROM
      (SELECT e.id, (SELECT count(*) FROM "Pllc" p WHERE p."enterpriseCustomerId"=e.id AND ${ENT}) n FROM "EnterpriseCustomer" e) t`)
  // entities by profession (first license on the entity; else primary owner's customer profession)
  const ents = await q(`SELECT p.id, coalesce(
      (SELECT l.profession FROM "ProfessionalLicense" l WHERE l."pllcId"=p.id AND coalesce(l.profession,'')<>'' ORDER BY l."createdAt" LIMIT 1),
      (SELECT c.profession FROM "PllcOwner" w JOIN "Customer" c ON c.id=w."customerId" WHERE w."pllcId"=p.id AND coalesce(c.profession,'')<>'' ORDER BY w."isPrimary" DESC LIMIT 1),
      (SELECT c.profession FROM "Order" o JOIN "Customer" c ON c.id=o."customerId" WHERE o."pllcsId"=p.id AND coalesce(c.profession,'')<>'' LIMIT 1)) prof,
      p."isLawFirm" law, p."entityType"::text et, p."isForeign" f
    FROM "Pllc" p WHERE ${ENT}`)
  const eg = {}; const raw = {}
  for (const e of ents) { const g = e.law && !e.prof ? 'law' : group(e.prof); eg[g] = (eg[g] || 0) + 1; const k = (e.prof || '(none)').toLowerCase().replace(/\s*\(\d+\)\s*$/, '').trim(); raw[k] = (raw[k] || 0) + 1 }
  say(`\n## B3. Entities by profession group (non-cancelled, non-test; n=${ents.length})`)
  for (const g of GROUPS) say(`${g} | ${eg[g] || 0}`)
  say('\n## B3b. Entities by recorded profession (top 30)')
  for (const [k, v] of Object.entries(raw).sort((a, b) => b[1] - a[1]).slice(0, 30)) say(`${k} | ${v}`)
  await T('B3c. Entities by entity type / foreign flag', `SELECT coalesce(p."entityType"::text,'-') et, p."isForeign" foreign_into_ny, count(*) FROM "Pllc" p WHERE ${ENT} GROUP BY 1,2 ORDER BY 3 DESC`)
  await T('B4. Recurring subscriptions by product and status (Subscription table; distinct entities)', `
    SELECT "subscriptionType"::text AS product, coalesce("stripeStatus",status) AS status, count(*) AS subs, count(DISTINCT "pllcId") AS entities, round(avg("amountCents")/100.0) AS avg_amount, string_agg(DISTINCT "billingFrequency", ',') AS freq
    FROM "Subscription" GROUP BY 1,2 ORDER BY 1,3 DESC`)
  await T('B4b. Open recurring subscribers by product (status active, trialing or past_due)', `
    SELECT "subscriptionType"::text AS product, count(DISTINCT "pllcId") AS entities,
      count(*) FILTER (WHERE coalesce("stripeStatus",status)='active') AS active, count(*) FILTER (WHERE coalesce("stripeStatus",status)='trialing') AS trialing,
      count(*) FILTER (WHERE coalesce("stripeStatus",status)='past_due') AS past_due
    FROM "Subscription" WHERE coalesce("stripeStatus",status) IN ('active','trialing','past_due') GROUP BY 1`)
  await T('B4c. RA compliance plan flag on open RA subs', `SELECT count(*) FILTER (WHERE "compliancePlanAt" IS NOT NULL) AS compliance_plan FROM "Subscription" WHERE "subscriptionType"='REGISTERED_AGENT' AND coalesce("stripeStatus",status) IN ('active','trialing','past_due')`)
  await T('B4d. Legacy RegisteredAgentSubscription table by status', `SELECT status::text, count(*) FROM "RegisteredAgentSubscription" GROUP BY 1`)
  await T('B4e. Partner (Metro) RA clients and Metro VM clients by status', `SELECT 'partner RA' AS product, status::text, count(*) FROM "PartnerClient" GROUP BY 1,2 UNION ALL SELECT 'Metro VM', status::text, count(*) FROM "MetroVmClient" GROUP BY 1,2 ORDER BY 1,3 DESC`)
  await T('B4f. Credentialing engagements by status', `SELECT status::text, count(*) FROM "CredentialingEngagement" GROUP BY 1`)
  await T('B5. Distinct client email addresses (Customer.email + alternateEmails; EnterpriseCustomer separately)', `
    WITH a AS (SELECT c.id, lower(c.email) e FROM "Customer" c UNION SELECT c.id, lower(x) FROM "Customer" c, unnest(c."alternateEmails") x),
    links AS (SELECT o."customerId" cid, o."pllcsId" pid FROM "Order" o WHERE o."customerId" IS NOT NULL AND o."pllcsId" IS NOT NULL
      UNION SELECT w."customerId", w."pllcId" FROM "PllcOwner" w WHERE w."customerId" IS NOT NULL),
    done AS (SELECT DISTINCT k.cid FROM links k JOIN "Pllc" p ON p.id=k.pid WHERE p."formationStatus" IN ('FORMATION_COMPLETE','COMPLETED') OR p."completedAt" IS NOT NULL),
    filed AS (SELECT DISTINCT k.cid FROM links k JOIN "Pllc" p ON p.id=k.pid WHERE p."formationDocumentFiledAt" IS NOT NULL OR p."formationDocumentApprovedAt" IS NOT NULL)
    SELECT (SELECT count(*) FROM "Customer") AS customer_rows, count(DISTINCT e) AS distinct_emails,
      count(DISTINCT e) FILTER (WHERE id IN (SELECT cid FROM done)) AS emails_completed_formation,
      count(DISTINCT id) FILTER (WHERE id IN (SELECT cid FROM done)) AS customers_completed_formation,
      count(DISTINCT e) FILTER (WHERE id IN (SELECT cid FROM filed)) AS emails_dos_filed,
      (SELECT count(*) FROM "EnterpriseCustomer") AS enterprise_customers,
      (SELECT count(*) FROM "Person") AS additional_owner_persons
    FROM a`)

  await pool.end()
  const si = process.argv.indexOf('--samples')
  if (si > 0) {
    const dir = process.argv[si + 1]; fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'samples.txt'), Object.entries(samples).map(([k, v]) => `##### ${k} (${v.length})\n` + v.map((s, i) => `${i + 1}. ${s}`).join('\n')).join('\n\n'))
  }
  fs.writeFileSync(path.join(__dirname, '02_topics_output.txt'), out.join('\n') + '\n')
})()
