import fs from 'node:fs';
const P='/tmp/memo/importa/parti/', O='/tmp/memo/importa/';
const rd=f=>JSON.parse(fs.readFileSync(P+f,'utf8'));
const frammenti=rd('frammenti.json'), nodi=rd('nodi.json'), restituzioni=rd('restituzioni.json');
const citazioni=[...rd('citazioni-1.json'),...rd('citazioni-2.json')];
const nota=(o,t)=>{o.dubbio=(o.dubbio?o.dubbio+' ':'')+'Riconciliazione: '+t};
let correzioni=0; const log=[];
// 1. slug: uno per entità (Atlante se c'è, altrimenti slug(nome)/§3.6)
const RINOMINA={ 'monologo-di-rust':'i-think-human-consciousness-is-a', 'sooraj-saxena':'soorajsaxena', 'pensieri':'pensieri-marco-aurelio' };
for(const n of nodi) if(RINOMINA[n.slug]){ log.push(`nodo ${n.slug} → ${RINOMINA[n.slug]}`); nota(n,`slug ${n.slug} → ${RINOMINA[n.slug]} (slug della ricerca nell'Atlante, R5).`); n.slug=RINOMINA[n.slug]; correzioni++; }
const fix=(s,dove)=>{ if(typeof s==='string'&&RINOMINA[s]){ log.push(`${dove}: ${s} → ${RINOMINA[s]}`); correzioni++; return RINOMINA[s]; } return s; };
for(const f of frammenti) for(const l of f.lettura?.legami||[]){ const v=fix(l.a,f.id); if(v!==l.a){ nota(f,`legame ${l.a} → ${v} (un solo slug per entità).`); l.a=v; } }
for(const n of nodi){ n.autore=fix(n.autore,'autore '+n.slug); n.in=fix(n.in,'in '+n.slug); if(n['attribuita-a']) n['attribuita-a']=n['attribuita-a'].map(a=>fix(a,'attr '+n.slug)); if(n.autore===undefined) delete n.autore; if(n.in===undefined) delete n.in; }
for(const r of restituzioni){ for(const v of r.voci||[]) v.rif=fix(v.rif,r.id); for(const l of r.legami||[]) l.tra=l.tra.map(t=>fix(t,r.id)); if(r.aggancio) r.aggancio.a=fix(r.aggancio.a,r.id); }
for(const c of citazioni) c.entita=fix(c.entita,'citazione');
// 3. legami verso nodi che §14.1 non fa nascere
const TOGLI={ '20261005-0000-s04':['machiavelli','il-principe','lamed-vav'], '20261005-0000-s01':['peso-sguardo-oltre'] };
const tolti=[];
for(const f of frammenti) if(TOGLI[f.id]){ const via=f.lettura.legami.filter(l=>TOGLI[f.id].includes(l.a)); f.lettura.legami=f.lettura.legami.filter(l=>!TOGLI[f.id].includes(l.a)); via.forEach(l=>tolti.push(`${f.id} ${l.p} ${l.a}`)); if(via.length) nota(f,`tolti i legami verso ${via.map(l=>l.a).join(', ')}: §14.1 non li fa nascere (resta il testo).`); }
// 4. nato-da solo verso frammenti
const F=new Set(frammenti.map(f=>f.id));
for(const n of nodi){ const prima=n['nato-da']||[]; const dopo=prima.filter(id=>F.has(id)); if(dopo.length!==prima.length){ log.push(`nato-da ${n.slug}: tolto ${prima.filter(i=>!F.has(i)).join(',')}`); nota(n,`nato-da solo frammenti: tolto ${prima.filter(i=>!F.has(i)).join(', ')} (resta U30 che accoglie, R13).`); n['nato-da']=dopo; } }
fs.writeFileSync(O+'tabella.json', JSON.stringify({frammenti,nodi,restituzioni},null,2)+'\n');
fs.writeFileSync(O+'citazioni.json', JSON.stringify(citazioni,null,2)+'\n');
console.log(log.join('\n')); console.log('correzioni slug:',correzioni); console.log('tolti:',tolti.join(' | '));
