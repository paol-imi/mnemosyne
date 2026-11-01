import fs from 'node:fs';
const O='/tmp/memo/importa/';
const { frammenti, nodi, restituzioni } = JSON.parse(fs.readFileSync(O+'tabella.json','utf8'));
const citazioni = JSON.parse(fs.readFileSync(O+'citazioni.json','utf8'));
const N=new Set(nodi.map(n=>n.slug)), F=new Set(frammenti.map(f=>f.id)), R=new Map(restituzioni.map(r=>[r.id,r]));
const conta={}; for(const n of nodi) conta[n.genere]=(conta[n.genere]||0)+1;
console.log('frammenti',frammenti.length,'| nodi',nodi.length,JSON.stringify(conta),'| restituzioni',restituzioni.length,'| voci',restituzioni.reduce((s,r)=>s+(r.voci?.length||0),0),'| citazioni',citazioni.length);
const voce=s=>{const m=/^(r-.+)#(\d+)$/.exec(s); return m&&R.get(m[1])?.voci?.some(v=>v.n==+m[2]);};
const ok=s=>typeof s==='string'&&(N.has(s)||F.has(s)||R.has(s)||(s.startsWith('~')&&s.length>1)||voce(s));
const irr=[]; const chk=(s,w)=>{ if(!ok(s)) irr.push(`${w} → ${s}`); };
for(const f of frammenti) for(const l of f.lettura?.legami||[]){ chk(l.a,f.id+' '+l.p);
  if(R.has(l.a)&&l.n!=null&&!R.get(l.a).voci?.some(v=>v.n===l.n)) irr.push(`${f.id} → ${l.a} voce ${l.n} inesistente`); }
for(const n of nodi){ for(const a of n['nato-da']||[]) if(!F.has(a)) irr.push(`nato-da ${n.slug} → ${a}`);
  if(n.autore) chk(n.autore,'autore '+n.slug); if(n.in) chk(n.in,'in '+n.slug); for(const a of n['attribuita-a']||[]) chk(a,'attribuita-a '+n.slug); }
for(const r of restituzioni){ if(r.aggancio) { if(!F.has(r.aggancio.a)) irr.push(`aggancio ${r.id} → ${r.aggancio.a}`); }
  for(const v of r.voci||[]) chk(v.rif,`${r.id} voce ${v.n}`);
  for(const l of r.legami||[]) for(const t of l.tra||[]) chk(t,`${r.id} ${l.p}`); }
console.log('riferimenti irrisolti:',irr.length); irr.forEach(x=>console.log('  ',x));
const tutti=[...nodi.map(n=>n.slug),...frammenti.map(f=>f.id),...restituzioni.map(r=>r.id)];
const doppi=tutti.filter((s,i)=>tutti.indexOf(s)!==i); console.log('slug doppi:',doppi.length,doppi.join(' '));
const vietati=['nietzsche','sisifo','eraclito','umberto-galimberti'].filter(s=>N.has(s)); console.log('nodi vietati presenti:',vietati.length,vietati.join(' '));
// U30 ritorna-su verso le voci delle domande
const u30=frammenti.find(f=>f.id==='20261007-0000-u30'); console.log('U30 ritorna-su:',u30.lettura.legami.filter(l=>l.p==='ritorna-su').length);
process.exitCode = irr.length||doppi.length||vietati.length ? 1 : 0;
