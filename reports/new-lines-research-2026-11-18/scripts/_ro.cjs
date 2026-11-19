// Shared read-only Postgres pool for this folder's scripts. Default tenant (DATABASE_URL) only.
// Session opened with default_transaction_read_only=on; ro() stops the process if that is not confirmed.
const path = require('path')
const crm = path.resolve(__dirname, '../../../../PLLC-CRM/crm')
const req = require('module').createRequire(path.join(crm, 'package.json'))
const dotenv = req('dotenv')
const pg = req('pg')
dotenv.config({ path: path.join(crm, '.env'), quiet: true })
dotenv.config({ path: path.join(crm, '.env.local'), override: true, quiet: true })
const cs = process.env.DATABASE_URL
const pool = new pg.Pool({
  connectionString: cs,
  ssl: /render\.com|neon|supabase|amazonaws/.test(cs || '') ? { rejectUnauthorized: false } : undefined,
  options: '-c default_transaction_read_only=on',
  max: 1,
})
async function ro() {
  const r = await pool.query('SHOW default_transaction_read_only')
  if (r.rows[0].default_transaction_read_only !== 'on') { console.error('Session is not read-only. Stopping.'); process.exit(1) }
  const t = await pool.query('SHOW transaction_read_only')
  if (t.rows[0].transaction_read_only !== 'on') { console.error('Transaction is not read-only. Stopping.'); process.exit(1) }
  return pool
}
module.exports = { ro, pool }
