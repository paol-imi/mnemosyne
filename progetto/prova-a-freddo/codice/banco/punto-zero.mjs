// punto-zero.mjs: il collaudo deterministico del blocco 2 (piano, "Collaudo"), sui file scritti da importa.mjs.
// node banco/punto-zero.mjs --da /tmp/atlante [--radice DIR] [--registra]
// Una riga per controllo, PASSA/FALLISCE; uscita 1 se uno fallisce. Con --registra scrive la riga d'esito
// in banco/esiti/AAAAMMGG-punto-zero.md (formato di esegui.mjs; la data viene da ATLANTE_ORA).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { registra } from './esegui.mjs';

const QUI = dirname(fileURLToPath(import.meta.url));
const ATTESI = { frammenti: 35, nodi: 52, eredita: 60 }, TOLLERANZA = 0.15;
const VIETATI = ['nietzsche', 'sisifo', 'eraclito'];
const GENERI = ['persone', 'opere', 'citazioni', 'temi', 'raccolte'];
const U30 = 'letture/2026/10/20261007-0000-u30.md';

const tutti = (dir, filtro = () => true) => !existsSync(dir) ? [] : readdirSync(dir).flatMap((e) => {
  const p = join(dir, e);
  if (statSync(p).isDirectory()) return ['.git', 'node_modules', '_progetto'].includes(e) ? [] : tutti(p, filtro);
  return filtro(p) ? [p] : [];
});
function leggi(p) {
  const t = readFileSync(p, 'utf8'), m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(t);
  return m ? { dati: parse(m[1]) ?? {}, corpo: m[2] } : { dati: {}, corpo: t };
}
// Due viste di ogni file, con gli spazi normalizzati: senza markup (link resi in testo, enfasi, citazioni, titoli,
// elenchi, a capo forzati `\`) e grezza (solo citazioni e a capo forzati tolti: tiene gli URL dei link e il frontmatter).
const spazi = (t) => t.replace(/\s+/g, ' ').trim();
const base = (t) => t.replace(/\\$/gm, '').replace(/^\s*(?:>\s*)+/gm, '');
export function piano(t) {
  return spazi(base(t)
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/(\*\*|__|\*|`)/g, ''));
}
export const grezzo = (t) => spazi(base(t));

export function collauda({ radice, da }) {
  const righe = [], ok = (nome, passa, dettaglio) => righe.push({ nome, passa: !!passa, dettaglio });
  const entro = (n, a) => Math.abs(n - a) <= a * TOLLERANZA;

  // 1. conti entro ±15%
  const frammenti = tutti(join(radice, 'frammenti'), (p) => p.endsWith('.md'));
  const nodi = GENERI.flatMap((g) => tutti(join(radice, g), (p) => p.endsWith('.md')));
  const eredita = tutti(join(radice, 'restituzioni'), (p) => p.endsWith('.md')).filter((p) => leggi(p).dati.forma === 'eredita');
  const conti = { frammenti: frammenti.length, nodi: nodi.length, eredita: eredita.length };
  for (const k of Object.keys(ATTESI)) ok(`conti ${k}`, entro(conti[k], ATTESI[k]), `${conti[k]} (atteso ${ATTESI[k]} ±15%)`);

  // 2. nessun nodo vietato (né come slug né come alias o nome)
  const slugNodi = new Set(nodi.map((p) => p.split('/').pop().replace(/\.md$/, '')));
  for (const v of VIETATI) {
    const anche = nodi.filter((p) => { const d = leggi(p).dati; return [d.nome, ...(d.alias ?? [])].some((x) => String(x ?? '').toLowerCase() === v); });
    ok(`nessun nodo ${v}`, !slugNodi.has(v) && !anche.length, slugNodi.has(v) ? 'presente' : anche.length ? `alias in ${anche.join(', ')}` : 'assente');
  }

  // 3. raccolte/tatuaggi.md nato da s03
  const tat = join(radice, 'raccolte/tatuaggi.md');
  const nato = existsSync(tat) ? leggi(tat).dati['nato-da'] : null;
  ok('raccolte/tatuaggi nato-da [20261004-0000-s03]', JSON.stringify(nato) === JSON.stringify(['20261004-0000-s03']), JSON.stringify(nato));

  // 4. le 8 domande dell'Atlante come temi, accolti dalla lettura di U30 (ritorna-su/accoglie sulla voce del tema)
  const domande = readdirSync(join(da, 'domande')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort();
  const u30 = existsSync(join(radice, U30)) ? leggi(join(radice, U30)).dati.legami ?? [] : [];
  const vociDi = new Map();
  for (const p of eredita) { const { dati } = leggi(p); for (const v of dati.voci ?? []) vociDi.set(`r-${''}${p.split('/').pop().replace(/^r-|\.md$/g, '')}#${v.n}`, v.rif); }
  const accolti = new Set(u30.filter((l) => l.p === 'ritorna-su' && l.come === 'accoglie').map((l) => vociDi.get(`${l.a}#${l.n}`)));
  ok('8 domande nell\'Atlante', domande.length === 8, `${domande.length}`);
  const mancanti = domande.filter((d) => !existsSync(join(radice, 'temi', `${d}.md`)));
  ok('8 temi delle domande presenti', !mancanti.length, mancanti.length ? `mancano ${mancanti.join(', ')}` : domande.join(', '));
  const nonAccolti = domande.filter((d) => !accolti.has(d));
  ok('8 temi delle domande accolti da U30', !nonAccolti.length, nonAccolti.length ? `non accolti ${nonAccolti.join(', ')}` : '8 accoglie');

  // 5. ogni corpo dei frammenti U nell'Atlante, nessuna parola cambiata: il corpo è un mosaico di righe della fonte,
  //    e ogni riga non vuota deve comparire tale e quale (spazi normalizzati, senza markup) in un file dell'Atlante,
  //    cercata prima nel file della `fonte` della lettura.
  const atlante = tutti(da, (p) => p.endsWith('.md')).map((p) => {
    const t = readFileSync(p, 'utf8');
    return { p: p.slice(da.length + 1), viste: [piano(t), grezzo(t)] };
  });
  const u = frammenti.filter((p) => /-u\d+[a-z]?\.md$/.test(p)).sort();
  ok('frammenti U presenti', u.length > 0, `${u.length}`);
  for (const p of u) {
    const id = p.split('/').pop().replace(/\.md$/, '');
    const righeU = leggi(p).corpo.split('\n').map((r) => piano(r)).filter(Boolean);
    const lp = join(radice, p.slice(radice.length + 1).replace(/^frammenti/, 'letture'));
    const fonte = existsSync(lp) ? String(leggi(lp).dati.fonte ?? '').replace(/:.*$/, '') : '';
    const ordine = [...atlante].sort((a, b) => (b.p === fonte) - (a.p === fonte));
    const dove = new Set(), mancano = [];
    for (const r of righeU) {
      const f = ordine.find((x) => x.viste.some((v) => v.includes(r)));
      f ? dove.add(f.p) : mancano.push(r);
    }
    ok(`U ${id} verbatim nell'Atlante`, righeU.length && !mancano.length,
      !righeU.length ? 'corpo vuoto' : mancano.length ? `non trovato: «${mancano[0]}»` : `${righeU.length} righe in ${[...dove].join(', ')}`);
  }
  return { righe, conti };
}

function argomenti(v) {
  const a = { radice: join(QUI, '..'), da: null, registra: false };
  for (let i = 0; i < v.length; i++) {
    if (v[i] === '--da') a.da = v[++i];
    else if (v[i] === '--radice') a.radice = v[++i];
    else if (v[i] === '--registra') a.registra = true;
    else throw new Error(`argomento sconosciuto: ${v[i]}`);
  }
  if (!a.da) throw new Error('manca --da <cartella dell\'Atlante>');
  return a;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const a = argomenti(process.argv.slice(2));
  const { righe } = collauda(a);
  for (const r of righe) console.log(`${r.passa ? 'PASSA' : 'FALLISCE'} ${r.nome}: ${r.dettaglio}`);
  const falliti = righe.filter((r) => !r.passa).map((r) => `${r.nome}: ${r.dettaglio}`);
  console.log(`punto zero: ${righe.length - falliti.length}/${righe.length} passano`);
  if (a.registra) {
    let sha = 'ignoto';
    try { sha = execFileSync('git', ['rev-parse', '--short', 'punto-zero'], { cwd: a.radice, encoding: 'utf8', stdio: 'pipe' }).trim(); } catch {}
    const file = registra({ dir: join(QUI, 'esiti'), cosa: 'punto-zero', falliti, sha,
      prova: { id: 'punto-zero', gravita: 'alta' }, lettore: process.env.BANCO_LETTORE ?? 'claude-opus-5-5',
      giudice: 'non serve (collaudo deterministico)' });
    console.log(`esito → ${file}`);
  }
  process.exit(falliti.length ? 1 : 0);
}
