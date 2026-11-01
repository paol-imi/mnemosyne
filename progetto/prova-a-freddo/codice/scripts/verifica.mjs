// verifica.mjs: i controlli deterministici prima di ogni push (piano, blocco 1; modello §3, §8.3, §12).
// node scripts/verifica.mjs [--solo schema,hash,immutabili,slug,rif,smista,esito,sintetico] [--radice DIR] → 0/1, righe "ERRORE file: motivo".
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, relative, basename, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { GENERI, tipoDaPercorso, frontmatter, validatore } from './schema.mjs';

export const CONTROLLI = ['schema', 'hash', 'immutabili', 'slug', 'rif', 'smista', 'esito', 'sintetico'];
const DATI = ['frammenti', 'letture', 'restituzioni', ...GENERI];
const ID_ESTERNI = ['wikidata', 'musicbrainz', 'registrazione', 'openlibrary', 'titolo-vero'];
const DOMINI_ID = /^https?:\/\/([a-z]+\.)?(wikidata\.org|musicbrainz\.org|openlibrary\.org)\//;
const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/;
const HASH = 'frammenti/.hash';

const posix = (p) => p.split(sep).join('/');
const sha256 = (b) => createHash('sha256').update(b).digest('hex');
const blob = (b) => createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');

// Tutti i file sotto una cartella (relativi alla radice, con "/"), esclusi i nascosti.
function elenca(radice, cartella) {
  const fuori = [], giu = (d) => {
    if (!existsSync(d)) return;
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      e.isDirectory() ? giu(p) : fuori.push(posix(relative(radice, p)));
    }
  };
  giu(join(radice, cartella));
  return fuori.sort();
}

function git(radice, args) {
  try { return execFileSync('git', args, { cwd: radice, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch { return null; }
}

// HEAD: Map percorso → sha1 del blob (null se il repo non ha HEAD). I percorsi sono relativi alla radice.
function alberoHead(radice) {
  if (git(radice, ['rev-parse', '--verify', '-q', 'HEAD']) === null) return null;
  const out = git(radice, ['ls-tree', '-r', '-z', 'HEAD', '--', ...DATI]) ?? '';
  const albero = new Map();
  for (const r of out.split('\0').filter(Boolean)) {
    const [testa, p] = r.split('\t');
    albero.set(p, testa.split(' ')[2]);
  }
  return albero;
}

const leggiHash = (testo) => new Map(testo.split('\n').filter(Boolean).map((r) => {
  const m = /^([0-9a-f]{64}) {2}(.+)$/.exec(r);
  return m ? [m[2], m[1]] : [r, null];
}));

// Per chi scrive frammenti: aggiunge l'hash dei file nuovi, non riscrive mai una riga esistente.
export function aggiornaHash(radice) {
  const f = join(radice, HASH), righe = existsSync(f) ? leggiHash(readFileSync(f, 'utf8')) : new Map();
  const nuovi = elenca(radice, 'frammenti').filter((p) => !righe.has(p));
  for (const p of nuovi) righe.set(p, sha256(readFileSync(join(radice, p))));
  const testo = [...righe].sort(([a], [b]) => a.localeCompare(b)).map(([p, h]) => `${h}  ${p}`).join('\n');
  writeFileSync(f, testo ? testo + '\n' : '');
  return nuovi;
}

// Raccoglie i riferimenti di un frontmatter (modello §3.1): slug, id di frammento, id di restituzione (con #n).
function riferimenti(tipo, d) {
  const r = [], add = (...v) => r.push(...v.flat().filter((x) => typeof x === 'string'));
  const legami = (l = []) => l.forEach((x) => add(x?.a ?? [], x?.tra ?? [], x?.nodo ?? []));
  if (tipo === 'nodo') add(d['nato-da'] ?? [], d['fuso-in'] ?? [], d.in ?? [], d.autore ?? [], d['attribuita-a'] ?? [], d['citata-da'] ?? []);
  if (tipo === 'lettura') { legami(d.legami); if (ID_R.test(d.risposta ?? '')) add(d.risposta); }
  if (tipo === 'restituzione') {
    add(d.per ?? [], d.copre ?? [], d.aggancio?.a ?? []);
    (d.voci ?? []).forEach((v) => add(v?.rif ?? []));
    legami(d.legami);
  }
  if (tipo === 'frammento') add(d.continua ?? []);
  return r;
}

function chiaviVietate(o, via = '') {
  if (!o || typeof o !== 'object') return [];
  return Object.entries(o).flatMap(([k, v]) =>
    [...(ID_ESTERNI.includes(k) ? [`${via}${k}`] : []), ...chiaviVietate(v, `${via}${k}.`)]);
}

export function verifica(radice = process.cwd(), solo = CONTROLLI) {
  const errori = [], err = (f, m) => errori.push(`ERRORE ${f}: ${m}`), fa = (c) => solo.includes(c);
  const head = alberoHead(radice);
  const nuovo = (p) => head !== null && !head.has(p); // scritto in questa sessione (non ancora in HEAD)
  const file = DATI.flatMap((c) => elenca(radice, c));
  const note = [];
  for (const p of file.filter((x) => x.endsWith('.md'))) {
    const t = tipoDaPercorso(p);
    if (!t) continue;
    try { note.push({ p, ...t, id: basename(p, '.md'), dati: frontmatter(readFileSync(join(radice, p), 'utf8')).dati }); }
    catch (e) { err(p, e.message); }
  }
  const nodi = note.filter((n) => n.tipo === 'nodo');
  const insiemi = { frammento: new Set(), restituzione: new Set(), nodo: new Set() };
  for (const n of note) insiemi[n.tipo]?.add(n.id);

  if (fa('schema')) for (const n of note) {
    const { sintetico, ...d } = n.dati; // `sintetico` è dei rami banco/* (piano §4), fuori dallo schema del §3.7
    const v = validatore(n.tipo);
    if (!v(n.genere ? { ...d, _genere: n.genere } : d))
      for (const e of v.errors) err(n.p, `schema: ${e.instancePath || '/'} ${e.message}`);
  }

  if (fa('hash')) {
    const f = join(radice, HASH), righe = existsSync(f) ? leggiHash(readFileSync(f, 'utf8')) : new Map();
    const frammenti = elenca(radice, 'frammenti');
    for (const [p, h] of righe) {
      if (h === null) err(HASH, `riga illeggibile: ${p}`);
      else if (!frammenti.includes(p)) err(p, 'frammento nell\'hash ma assente');
    }
    for (const p of frammenti) {
      if (!righe.has(p)) err(p, `frammento senza hash in ${HASH}`);
      else if (righe.get(p) && righe.get(p) !== sha256(readFileSync(join(radice, p)))) err(p, 'il frammento è cambiato (hash diverso)');
    }
    const prima = head && git(radice, ['show', `HEAD:./${HASH}`]);
    if (prima) for (const [p, h] of leggiHash(prima)) if (righe.get(p) !== h) err(HASH, `riga di ${p} cambiata o tolta rispetto a HEAD`);
  }

  if (fa('immutabili') && head) for (const [p, sha] of head) {
    if (!p.startsWith('restituzioni/')) continue;
    const f = join(radice, p);
    if (!existsSync(f)) err(p, 'restituzione tolta dopo il commit');
    else if (blob(readFileSync(f)) !== sha) err(p, 'restituzione cambiata dopo il commit');
  }

  if (fa('slug')) {
    const visti = new Map();
    for (const n of note) {
      const chi = n.tipo === 'nodo' ? 'nodo' : n.tipo; // lettura e frammento condividono l'id per costruzione
      const k = `${chi}:${n.id}`;
      if (visti.has(k)) err(n.p, `slug "${n.id}" già usato da ${visti.get(k)}`);
      else visti.set(k, n.p);
    }
  }

  if (fa('rif')) for (const n of note) {
    if (n.tipo === 'lettura' && !insiemi.frammento.has(n.id)) err(n.p, `lettura senza frammento ${n.id}`);
    for (const r of riferimenti(n.tipo, n.dati)) {
      if (r.startsWith('~')) continue;
      const id = r.replace(/#\d+$/, '');
      const dove = ID_F.test(id) ? 'frammento' : ID_R.test(id) ? 'restituzione' : 'nodo';
      if (!insiemi[dove].has(id)) err(n.p, `riferimento a ${dove} inesistente: ${r}`);
    }
  }

  if (fa('smista')) for (const n of note) {
    for (const k of chiaviVietate(n.dati)) err(n.p, `ID esterno: ${k}`);
    if (n.tipo === 'nodo' && nuovo(n.p))
      for (const u of [n.dati.link ?? []].flat()) if (DOMINI_ID.test(String(u))) err(n.p, `ID esterno scritto all'ingresso: ${u}`);
  }

  // All'ingresso una citazione nuova non ha esito, salvo l'apocrifo noto (esito: errata, con la scheda in riferimento).
  if (fa('esito')) for (const n of nodi) {
    if (n.genere !== 'citazioni' || !nuovo(n.p) || n.dati.esito === undefined) continue;
    if (n.dati.esito !== 'errata' || !n.dati.riferimento) err(n.p, `esito "${n.dati.esito}" all'ingresso (ammesso solo un apocrifo noto)`);
  }

  if (fa('sintetico')) {
    const ramo = git(radice, ['symbolic-ref', '--short', '-q', 'HEAD'])?.trim();
    if (ramo === 'main') for (const n of note) if (n.dati?.sintetico === true) err(n.p, 'dato sintetico su main');
  }
  return errori;
}

function argomenti(argv) {
  const a = { radice: process.cwd(), solo: CONTROLLI };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--radice') a.radice = argv[++i];
    else if (argv[i] === '--solo') a.solo = argv[++i].split(',').map((s) => s.trim());
    else throw new Error(`argomento sconosciuto: ${argv[i]}`);
  }
  const ignoti = a.solo.filter((c) => !CONTROLLI.includes(c));
  if (ignoti.length) throw new Error(`controlli sconosciuti: ${ignoti.join(', ')}`);
  return a;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { radice, solo } = argomenti(process.argv.slice(2));
    const errori = verifica(radice, solo);
    for (const e of errori) console.log(e);
    if (!errori.length) console.log(`verifica: ok (${solo.join(', ')})`);
    process.exit(errori.length ? 1 : 0);
  } catch (e) {
    console.log(`ERRORE verifica: ${e.message}`);
    process.exit(1);
  }
}
