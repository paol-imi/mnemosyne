import fs from 'node:fs'; import { candidati } from '/tmp/memo/scripts/slug.mjs';
const P='/tmp/memo/importa/parti/'; const n=JSON.parse(fs.readFileSync(P+'nodi.json')), r=JSON.parse(fs.readFileSync(P+'restituzioni.json')), f=JSON.parse(fs.readFileSync(P+'frammenti.json'));
const tild=new Map(), uses=new Map();
const see=(s,w)=>{ if(typeof s!=='string')return; if(s.startsWith('~')) tild.set(s,(tild.get(s)||0)+1); else uses.set(s,(uses.get(s)||[]).concat(w)); };
for(const x of r){ for(const v of x.voci||[]) see(v.rif,x.id); for(const l of x.legami||[]) for(const t of l.tra||[]) see(t,x.id); }
for(const x of n){ see(x.autore,'autore '+x.slug); see(x.in,'in '+x.slug); for(const a of x['attribuita-a']||[]) see(a,'attr '+x.slug); }
for(const [t,c] of tild){ const k=candidati(t.slice(1),n); if(k.length) console.log(t,c,'->',k.map(x=>x.slug+':'+x.via).join(',')); }
console.log('tilde totali',tild.size);
for(const s of ['pensieri','sooraj-saxena','i-think-human-consciousness-is-a','rust-cohle','marco-aurelio']) console.log(s,(uses.get(s)||[]).length);
const ks=new Set(); for(const x of n) Object.keys(x).forEach(k=>ks.add(k)); console.log([...ks]);
