import fs from 'node:fs'; import path from 'node:path';
import { candidati } from '/tmp/memo/scripts/slug.mjs';
const root='/tmp/atlante', S=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory()){ if(['_progetto','node_modules','.git','.vitepress','img','_templates','scripts'].includes(e.name))continue; if(fs.existsSync(path.join(p,'index.md'))) S.push({slug:e.name,nome:e.name,dir:p}); walk(p);}
 else if(e.name.endsWith('.md')&&e.name!=='index.md') S.push({slug:e.name.slice(0,-3),nome:e.name.slice(0,-3),dir:p});}})(root);
const nodi=JSON.parse(fs.readFileSync('/tmp/memo/importa/parti/nodi.json'));
const set=new Set(S.map(s=>s.slug));
for(const n of nodi){ if(set.has(n.slug)) continue; const c=candidati(n.nome,S).slice(0,3); console.log('NON-ATLANTE',n.genere,n.slug,'|',n.link||'',JSON.stringify(c.map(x=>x.slug+':'+x.via)));}
