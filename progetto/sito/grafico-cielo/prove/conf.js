const fs=require('fs'),path=require('path');const { chromium } = require('playwright');
const norm=s=>s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[’']/g," ").replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
function files(d){if(!fs.existsSync(d))return[];return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(d,e.name)):[path.join(d,e.name)]).filter(f=>/\.(md|json|html|txt)$/.test(f));}
const R='/home/user/mnemosyne/';
const corpus=['CLAUDE.md',...['frammenti','letture','restituzioni','contesto','riserva'].flatMap(d=>files(R+d).map(f=>path.relative(R,f))),'progetto/sito/prototipo/index.html'];
const grams=new Map();
for(const f of corpus){const w=norm(fs.readFileSync(R+f,'utf8')).split(' ');for(let i=0;i+5<=w.length;i++){const g=w.slice(i,i+5).join(' ');if(!grams.has(g))grams.set(g,f);}}
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+R+'progetto/sito/grafico-cielo/index.html'+(process.argv[2]?'?n='+process.argv[2]:''));await p.waitForFunction(()=>window.__tempi&&window.__tempi.primo,{timeout:90000});
const testi=await p.evaluate(()=>[...window.__cielo.F.map(f=>f.testo+(f.altrui?' || '+f.altrui.cosa+' || '+f.altrui.riga:''))]);await b.close();
const out=new Map(); console.log('frasi confrontate:', testi.length, '· 5-grammi d\'archivio:', grams.size);
for(const t of testi){const w=norm(t).split(' ');for(let i=0;i+5<=w.length;i++){const g=w.slice(i,i+5).join(' ');if(grams.has(g))out.set(t,(out.get(t)||[]).concat(g+' ['+grams.get(g)+']'));}
 if(w.length<5){/* frasi corte: confronta intere */}}
for(const [t,gs] of out)console.log('*',t,'\n   ',[...new Set(gs)].slice(0,3).join(' | '));
// frasi corte e locuzioni sospette
const all=corpus.map(f=>norm(fs.readFileSync(R+f,'utf8'))).join(' \n ');
for(const t of testi){const n=norm(t);if(n.split(' ').length<5&&all.includes(' '+n+' '))console.log('= corta:',t);}
for(const k of ['mi ha spaccato','mi ha distrutto','vai con la mappa','galimberti','mondo delle emozioni','ci ha preso','pianto come un cretino','mi ha colpito']) console.log(k, testi.filter(t=>norm(t).includes(norm(k))).length);
})();
