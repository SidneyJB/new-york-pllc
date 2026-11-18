// Read-only export of CRM PLLC names and DOS IDs (main tenant + MBS tenant) for the letter-list exclusion.
// Run from anywhere: NODE_PATH=~/dev/pllc-business/PLLC-CRM/crm/node_modules node crm-names.js <outdir>
// Opens each connection READ ONLY and runs one SELECT. Writes <outdir>/crm-pllcs.json. Keep <outdir> outside every repo.
const fs=require('fs');const {Client}=require('pg');const path=require('path');const OUTDIR=process.argv[2]||'.';
const env=fs.readFileSync('/Users/sidb/dev/pllc-business/PLLC-CRM/crm/.env.local','utf8');
function get(k){const m=env.match(new RegExp('^'+k+'=(.*)$','m'));return m?m[1].trim().replace(/^["']|["']$/g,''):null}
(async()=>{const out={};
for (const k of ['DATABASE_URL','MBS_DATABASE_URL']){const url=get(k);if(!url){out[k]=null;continue}
 const c=new Client({connectionString:url,ssl:{rejectUnauthorized:false}});await c.connect();
 await c.query('SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY');
 const r=await c.query('SELECT name, "dosEntityId", "formationJurisdiction"::text AS j, "createdAt" FROM "Pllc"');
 out[k]=r.rows;await c.end();}
fs.writeFileSync(path.join(OUTDIR,'crm-pllcs.json'),JSON.stringify(out));
for(const k in out) console.log(k, out[k]?out[k].length:null);
})().catch(e=>{console.error(e.message);process.exit(1)});
