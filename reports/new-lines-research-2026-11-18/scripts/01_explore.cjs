// Read-only exploration: aggregate counts only, no names or addresses printed.
const { ro, pool } = require('./_ro.cjs')
;(async () => {
  await ro()
  const q = async (l, s) => { const r = await pool.query(s); console.log('\n## ' + l); console.table(r.rows) }
  await q('inbound 12m by link', `SELECT ("customerId" IS NOT NULL) cust, ("enterpriseCustomerId" IS NOT NULL) ent, count(*), count(DISTINCT lower("fromEmail")) senders
    FROM "InboundEmail" WHERE "receivedAt">=now()-interval '12 months' GROUP BY 1,2`)
  await q('inbound date range', `SELECT min("receivedAt"), max("receivedAt"), count(*) FROM "InboundEmail"`)
  await q('top unlinked sender domains 12m', `SELECT split_part(lower("fromEmail"),'@',2) dom, count(*) n, count(DISTINCT lower("fromEmail")) s
    FROM "InboundEmail" WHERE "customerId" IS NULL AND "enterpriseCustomerId" IS NULL AND "receivedAt">=now()-interval '12 months' GROUP BY 1 ORDER BY 2 DESC LIMIT 60`)
  await q('top linked sender domains 12m (non-consumer)', `SELECT split_part(lower("fromEmail"),'@',2) dom, count(*) n, count(DISTINCT lower("fromEmail")) s
    FROM "InboundEmail" WHERE ("customerId" IS NOT NULL OR "enterpriseCustomerId" IS NOT NULL) AND "receivedAt">=now()-interval '12 months'
    AND split_part(lower("fromEmail"),'@',2) NOT IN ('gmail.com','yahoo.com','hotmail.com','icloud.com','aol.com','outlook.com','me.com','msn.com','live.com')
    GROUP BY 1 ORDER BY 2 DESC LIMIT 40`)
  await q('to addresses', `SELECT lower(coalesce("toEmail",'')) t, count(*) FROM "InboundEmail" WHERE "receivedAt">=now()-interval '12 months' GROUP BY 1 ORDER BY 2 DESC LIMIT 10`)
  await q('profession values (license)', `SELECT lower(coalesce(profession,'')) p, count(*) FROM "ProfessionalLicense" GROUP BY 1 ORDER BY 2 DESC LIMIT 60`)
  await q('customer profession values', `SELECT lower(coalesce(profession,'')) p, count(*) FROM "Customer" GROUP BY 1 ORDER BY 2 DESC LIMIT 30`)
  await q('subs', `SELECT "subscriptionType", coalesce("stripeStatus",status) st, count(*) FROM "Subscription" GROUP BY 1,2 ORDER BY 1,3 DESC`)
  await q('ra subs legacy', `SELECT status, count(*) FROM "RegisteredAgentSubscription" GROUP BY 1`)
  await q('formation statuses', `SELECT "formationStatus", count(*) FROM "Pllc" GROUP BY 1 ORDER BY 2 DESC`)
  await pool.end()
})()
