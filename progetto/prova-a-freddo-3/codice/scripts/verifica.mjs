// verifica.mjs: i controlli deterministici prima di ogni push (piano blocco 1; modello §3.1, §3.7, §7.2 passo 4, §8.3, §14 R7;
// banco G3, G4, G7; piano §4 per i sintetici: nessun campo in più, l'elenco sta in banco/sintetici.txt).
// node scripts/verifica.mjs [--solo schema,hash,…] [--radice DIR] → codice 0/1 e righe "ERRORE file: motivo".
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, relative, resolve, basename, dirname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';

export const CONTROLLI = ['schema', 'hash', 'immutabili', 'slug', 'rif', 'smista', 'esito', 'sintetici'];
export const GENERI = ['persone', 'opere', 'citazioni', 'temi', 'raccolte'];
const TIPI = { frammenti: 'frammento', letture: 'lettura', restituzioni: 'restituzione' };
const DATI = [...Object.keys(TIPI), ...GENERI];
const HASH = 'frammenti/.hash';
const SINTETICI = 'banco/sintetici.txt';
const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/, SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// L'importazione (§14): frammenti AAAAMMGG-0000-<sigla> e restituzioni r-AAAAMMGG-0000-eredita-… (§3.1).
const IMPORTATO = /^(\d{8}-0000-(u\d{2}[ab]?|s\d{2})|r-\d{8}-0000-eredita-[a-z0-9-]+)$/;
// Gli ID esterni tolti dalla tappa 1 (modello §15 n. 19, §16.1): come chiavi, in qualunque punto del frontmatter…
// L'elenco chiuso del modello §3.7 ("ID esterno").
const CHIAVI_ID = new Set(['wikidata', 'qid', 'musicbrainz', 'mbid', 'isbn', 'imdb', 'discogs', 'viaf', 'goodreads', 'openlibrary']);
// …e come link di un nodo nato all'ingresso (un registro di ID, non una pagina).
const DOMINI_ID = /^https?:\/\/([a-z0-9-]+\.)*(wikidata\.org|musicbrainz\.org|isbnsearch\.org|imdb\.com|discogs\.com|viaf\.org|goodreads\.com|openlibrary\.org)\//;
// Banco G4: all'ingresso una citazione ha solo questi campi; il resto lo scrive "consolida" (o l'importazione, §14 R7).
const CITAZIONE_INGRESSO = new Set(['schema', 'nome', 'alias', 'nato-da', 'attribuita-a']);

const schema = JSON.parse(readFileSync(new URL('../schema/frontmatter.json', import.meta.url), 'utf8'));
// strictTypes spento: il §3.7, trascritto alla lettera, ha un "pattern" e un "properties" senza "type".
const ajv = new Ajv2020({ allErrors: true, strictTypes: false }).addSchema(schema);
const valida = (tipo) => ajv.getSchema(`${schema.$id}#/$defs/${tipo}`);

const posix = (p) => p.split(sep).join('/');
export const sha256 = (b) => createHash('sha256').update(b).digest('hex');
const blob = (b) => createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');

// Il tipo dalla cartella: frammenti/AAAA/MM/x.md → frammento; persone/x.md → nodo con il suo genere.
export function tipoDaPercorso(p) {
  const testa = p.split('/')[0];
  if (TIPI[testa]) return { tipo: TIPI[testa] };
  if (GENERI.includes(testa)) return { tipo: 'nodo', genere: testa };
  return null;
}

// Frontmatter YAML 1.2 (schema core: date e ore restano stringhe) e corpo.
export function frontmatter(testo) {
  const m = /^---\n([\s\S]*?)\n?---(?:\n|$)([\s\S]*)$/.exec(testo.replace(/\r\n/g, '\n'));
  if (!m) throw new Error('frontmatter mancante');
  const dati = parse(m[1]) ?? {};
  if (typeof dati !== 'object' || Array.isArray(dati)) throw new Error('il frontmatter non è un oggetto');
  return { dati, corpo: m[2] };
}

// I file sotto una cartella (relativi alla radice, con "/"), senza i nascosti (.gitkeep, .hash).
function elenca(radice, cartella) {
  const fuori = [], giu = (d) => {
    for (const e of existsSync(d) ? readdirSync(d, { withFileTypes: true }) : []) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) giu(p); else fuori.push(posix(relative(radice, p)));
    }
  };
  giu(join(radice, cartella));
  return fuori.sort();
}

function git(radice, args, input) {
  try { return execFileSync('git', args, { cwd: radice, input, maxBuffer: 1 << 28, stdio: ['pipe', 'pipe', 'ignore'] }); }
  catch { return null; }
}
const gitTesto = (radice, args) => git(radice, args)?.toString('utf8') ?? null;

// HEAD: Map percorso → sha1 del blob, solo nelle cartelle dei dati; vuota prima del primo commit (tutto è nuovo);
// null se la radice non è la cima di un repository (allora i controlli su HEAD e sull'ingresso non si fanno).
function alberoHead(radice) {
  if (gitTesto(radice, ['rev-parse', '--show-prefix'])?.trim() !== '') return null;
  const albero = new Map();
  if (gitTesto(radice, ['rev-parse', '--verify', '-q', 'HEAD']) === null) return albero;
  for (const r of (gitTesto(radice, ['ls-tree', '-r', '-z', 'HEAD', '--', ...DATI]) ?? '').split('\0').filter(Boolean)) {
    const [testa, p] = r.split('\t');
    albero.set(p, testa.split(' ')[2]);
  }
  return albero;
}

// I file nati in un commit `smista:` (§8.3, banco G4): Map percorso → testo alla nascita. Una nascita sul bordo di un
// clone superficiale non conta (il commit di confine "aggiunge" tutto ciò che c'era già).
function natiDaSmista(radice, cartelle) {
  const log = gitTesto(radice, ['log', '--no-renames', '--diff-filter=A', '--name-only', '--format=%x01%H %s', 'HEAD', '--', ...cartelle]);
  if (!log) return new Map();
  const confine = new Set(), shallow = gitTesto(radice, ['rev-parse', '--git-path', 'shallow'])?.trim();
  try { if (shallow) readFileSync(resolve(radice, shallow), 'utf8').split('\n').forEach((s) => confine.add(s)); } catch { /* non è superficiale */ }
  const nascita = new Map(); // il log va dal più recente: vale la nascita più recente
  for (const blocco of log.split('\x01').filter(Boolean)) {
    const [testa, ...file] = blocco.split('\n').filter(Boolean);
    const [sha, ...soggetto] = testa.split(' ');
    for (const p of file) if (!nascita.has(p)) nascita.set(p, { sha, smista: soggetto.join(' ').startsWith('smista:') && !confine.has(sha) });
  }
  const scelti = [...nascita].filter(([, n]) => n.smista);
  if (!scelti.length) return new Map();
  const uscita = git(radice, ['cat-file', '--batch'], scelti.map(([p, n]) => `${n.sha}:${p}\n`).join(''));
  const testi = new Map();
  for (let i = 0, k = 0; uscita && i < uscita.length && k < scelti.length; k++) {
    const fine = uscita.indexOf(10, i), testa = uscita.subarray(i, fine).toString('utf8').split(' ');
    if (testa[1] !== 'blob') { i = fine + 1; continue; }
    const n = Number(testa[2]);
    testi.set(scelti[k][0], uscita.subarray(fine + 1, fine + 1 + n).toString('utf8'));
    i = fine + 1 + n + 1;
  }
  return testi;
}

// frammenti/.hash: una riga per file di frammenti/ (anche gli allegati), "<sha256>  <percorso dalla radice>", come sha256sum.
export const leggiHash = (testo) => new Map(testo.split('\n').filter(Boolean).map((r) => {
  const m = /^([0-9a-f]{64}) {2}(\S.*)$/.exec(r);
  return m ? [m[2], m[1]] : [r, null];
}));

// Per chi sposta i frammenti ("smista", blocco 5): aggiunge l'hash dei file nuovi, non riscrive mai una riga che c'è.
export function aggiornaHash(radice = process.cwd()) {
  const f = join(radice, HASH), righe = existsSync(f) ? leggiHash(readFileSync(f, 'utf8')) : new Map();
  const nuovi = elenca(radice, 'frammenti').filter((p) => !righe.has(p));
  for (const p of nuovi) righe.set(p, sha256(readFileSync(join(radice, p))));
  const testo = [...righe].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([p, h]) => `${h}  ${p}`).join('\n');
  writeFileSync(f, testo ? testo + '\n' : '');
  return nuovi;
}

// Gli id sintetici (piano §4): banco/sintetici.txt, una riga per id (frammento, restituzione o slug), "#" commento.
export function idSintetici(radice) {
  const f = join(radice, SINTETICI);
  if (!existsSync(f)) return new Set();
  return new Set(readFileSync(f, 'utf8').split('\n').map((r) => r.replace(/#.*/, '').trim()).filter(Boolean));
}

// I riferimenti di un frontmatter (§3.1): slug, id di frammento, id di restituzione con l'eventuale #n, ~Nome.
function riferimenti(tipo, d) {
  const r = [], add = (...v) => r.push(...v.flat(2).filter((x) => typeof x === 'string'));
  const legami = (l) => (Array.isArray(l) ? l : []).forEach((x) => add(x?.a, x?.tra ?? [], x?.nodo));
  if (tipo === 'frammento') add(d.continua);
  if (tipo === 'lettura') { legami(d.legami); if (ID_R.test(d.risposta ?? '')) add(d.risposta); }
  if (tipo === 'nodo') add(d['nato-da'] ?? [], d['fuso-in'], d.in, d.autore, d['attribuita-a'] ?? [], d['citata-da'] ?? []);
  if (tipo === 'restituzione') {
    add(d.per, d.copre ?? [], d.aggancio?.a);
    (Array.isArray(d.voci) ? d.voci : []).forEach((v) => add(v?.rif));
    legami(d.legami);
  }
  return r.filter(Boolean);
}

const chiaviId = (o, via = '') => (!o || typeof o !== 'object' ? [] : Object.entries(o).flatMap(([k, v]) =>
  [...(CHIAVI_ID.has(k.toLowerCase()) ? [`${via}${k}`] : []), ...chiaviId(v, `${via}${k}.`)]));

// La regola unica dell'ingresso (§7.2 passo 4, banco G4) su una citazione; `importa` = può valere l'eccezione del §14 R7.
function regolaIngresso(d, importa) {
  const accolta = importa && d.esito !== undefined && d.riferimento !== undefined &&
    [d['nato-da'] ?? []].flat().some((x) => IMPORTATO.test(String(x)));
  if (accolta) return [];
  if (d.esito !== undefined && importa && [d['nato-da'] ?? []].flat().some((x) => IMPORTATO.test(String(x))))
    return [`citazione importata con "esito" ma senza "riferimento" (§14 R7: servono entrambi)`];
  const fuori = Object.keys(d).filter((k) => !CITAZIONE_INGRESSO.has(k));
  return fuori.map((k) => k === 'esito'
    ? `"esito" all'ingresso: la citazione nasce senza (⚠), l'attribuzione va in "attribuita-a" (§7.2 passo 4)`
    : `"${k}" all'ingresso: lo scrive solo "consolida" (banco G4)`);
}

export function verifica(radice = process.cwd(), solo = CONTROLLI) {
  const errori = [], err = (f, m) => errori.push(`ERRORE ${f}: ${m}`), fa = (c) => solo.includes(c);
  const head = alberoHead(radice);
  const nuovo = (p) => head !== null && !head.has(p); // non ancora in HEAD: lo scrive questa sessione
  const tutti = DATI.flatMap((c) => elenca(radice, c));
  const note = [];
  for (const p of tutti.filter((x) => x.endsWith('.md'))) {
    const t = tipoDaPercorso(p);
    try { note.push({ p, ...t, id: basename(p, '.md'), ...frontmatter(readFileSync(join(radice, p), 'utf8')) }); }
    catch (e) { if (['schema', 'rif', 'smista', 'esito'].some(fa)) err(p, e.message); }
  }
  const ids = { frammento: new Map(), lettura: new Map(), restituzione: new Map(), nodo: new Map() };
  for (const n of note) ids[n.tipo].set(n.id, n);
  const ramo = process.env.GITHUB_REF_NAME || gitTesto(radice, ['symbolic-ref', '--short', '-q', 'HEAD'])?.trim();

  if (fa('schema')) for (const n of note) {
    const d = { ...n.dati };
    const v = valida(n.tipo);
    if (!v(n.genere ? { ...d, _genere: n.genere } : d))
      for (const e of v.errors) err(n.p, `schema: ${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}`);
  }

  if (fa('hash')) {
    const f = join(radice, HASH), righe = existsSync(f) ? leggiHash(readFileSync(f, 'utf8')) : new Map();
    const frammenti = new Set(elenca(radice, 'frammenti'));
    for (const [p, h] of righe) {
      if (h === null) err(HASH, `riga illeggibile: "${p}"`);
      else if (!frammenti.has(p)) err(p, `nel ${HASH} ma non c'è più`);
    }
    for (const p of frammenti) {
      if (!righe.has(p)) err(p, `senza hash in ${HASH}`);
      else if (righe.get(p) && righe.get(p) !== sha256(readFileSync(join(radice, p)))) err(p, 'il frammento è cambiato (hash diverso)');
    }
    const prima = head && gitTesto(radice, ['show', `HEAD:${HASH}`]);
    if (prima) for (const [p, h] of leggiHash(prima)) if (righe.get(p) !== h) err(HASH, `la riga di ${p} è cambiata o sparita rispetto a HEAD`);
  }

  if (fa('immutabili') && head) for (const [p, sha] of head) { // banco G7: una restituzione scritta non cambia
    if (!p.startsWith('restituzioni/')) continue;
    if (!existsSync(join(radice, p))) err(p, 'restituzione tolta (in HEAD c\'è)');
    else if (blob(readFileSync(join(radice, p))) !== sha) err(p, 'restituzione cambiata rispetto a HEAD');
  }

  if (fa('slug')) {
    const nodi = new Map();
    for (const p of tutti.filter((x) => x.endsWith('.md'))) {
      const t = tipoDaPercorso(p), id = basename(p, '.md'), parti = p.split('/');
      if (t.tipo === 'nodo') {
        if (parti.length !== 2) err(p, 'un nodo sta direttamente nella cartella del suo genere');
        if (!SLUG.test(id) || id.length > 60) err(p, `slug non valido: "${id}"`);
        else if (ID_F.test(id) || ID_R.test(id)) err(p, `lo slug "${id}" ha la forma di un id (§3.1)`);
        if (nodi.has(id)) err(p, `slug "${id}" già usato da ${nodi.get(id)} (unico in tutto il repository)`);
        else nodi.set(id, p);
        continue;
      }
      const forma = t.tipo === 'restituzione' ? ID_R : ID_F, lo = t.tipo === 'restituzione' ? 2 : 0;
      if (!forma.test(id)) err(p, `id non valido per ${t.tipo}: "${id}"`);
      else if (parti.length !== 4 || parti[1] !== id.slice(lo, lo + 4) || parti[2] !== id.slice(lo + 4, lo + 6))
        err(p, `fuori posto: un ${t.tipo} ${id} sta in ${parti[0]}/${id.slice(lo, lo + 4)}/${id.slice(lo + 4, lo + 6)}/`);
    }
    for (const tipo of ['frammento', 'lettura', 'restituzione']) {
      const visti = new Map();
      for (const n of note.filter((x) => x.tipo === tipo))
        if (visti.has(n.id)) err(n.p, `id "${n.id}" già usato da ${visti.get(n.id)}`); else visti.set(n.id, n.p);
    }
  }

  if (fa('rif')) for (const n of note) {
    if (n.tipo === 'lettura' && !ids.frammento.has(n.id)) err(n.p, `lettura senza il suo frammento ${n.id}`);
    if (n.tipo === 'frammento') for (const a of [n.dati.allegati ?? []].flat())
      if (!existsSync(join(radice, dirname(n.p), String(a)))) err(n.p, `allegato inesistente: ${a}`);
    for (const r of riferimenti(n.tipo, n.dati)) {
      if (r.startsWith('~')) continue;
      const [id, voce] = r.split('#');
      const dove = ID_F.test(id) ? 'frammento' : ID_R.test(id) ? 'restituzione' : 'nodo';
      const bersaglio = ids[dove].get(id);
      if (!bersaglio) err(n.p, `riferimento a ${dove} inesistente: ${r}`);
      else if (voce && !(bersaglio.dati.voci ?? []).some((v) => String(v?.n) === voce)) err(n.p, `la voce ${r} non c'è`);
    }
  }

  const smista = ['smista', 'esito'].some(fa) && head ? natiDaSmista(radice, ['citazioni', ...GENERI, 'restituzioni']) : new Map();
  const daSmista = (p) => { try { return smista.has(p) ? frontmatter(smista.get(p)).dati : null; } catch { return null; } };

  if (fa('smista')) for (const n of note) { // banco G3, B24: nessun ID esterno, in nessun file
    for (const k of chiaviId(n.dati)) err(n.p, `ID esterno: ${k}`);
    if (n.tipo !== 'nodo') continue;
    const alla = nuovo(n.p) ? n.dati : daSmista(n.p);
    for (const u of [alla?.link ?? []].flat()) if (DOMINI_ID.test(String(u))) err(n.p, `ID esterno scritto all'ingresso: ${u}`);
  }

  if (fa('esito')) for (const n of note) {
    if (n.genere === 'citazioni') {
      if (nuovo(n.p)) for (const m of regolaIngresso(n.dati, true)) err(n.p, m);
      const nascita = daSmista(n.p);
      if (nascita) for (const m of regolaIngresso(nascita, false)) err(n.p, `alla nascita (commit smista:) ${m}`);
    }
    if (n.tipo === 'restituzione' && n.dati.forma === 'risposta') { // banco G4: nessuna voce di una risposta all'ingresso porta esito
      const ingresso = nuovo(n.p) ? ids.frammento.get(n.dati.per)?.dati.canale === 'telefono' : smista.has(n.p);
      const d = nuovo(n.p) ? n.dati : daSmista(n.p) ?? {};
      if (ingresso) for (const v of Array.isArray(d.voci) ? d.voci : []) if (v?.esito !== undefined)
        err(n.p, `la voce ${v.n} di una risposta all'ingresso porta "esito" (banco G4)`);
    }
  }

  if (fa('sintetici') && ramo === 'main') { // piano §4: su main né l'elenco né i dati che elenca (sui rami banco/* sì)
    if (existsSync(join(radice, SINTETICI))) err(SINTETICI, 'elenco dei dati sintetici su main (piano §4)');
    const elencati = idSintetici(radice);
    for (const p of tutti) {
      // un allegato (<id>.jpg, <id>-2.jpg) conta come il suo frammento
      const id = p.endsWith('.md') ? basename(p, '.md') : basename(p).replace(/(-\d)?\.[^.]+$/, '');
      if (elencati.has(id)) err(p, `dato sintetico su main: ${id} è in ${SINTETICI} (piano §4)`);
    }
  }
  return errori;
}

function argomenti(argv) {
  const a = { radice: process.cwd(), solo: CONTROLLI };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--radice' && argv[i + 1]) a.radice = argv[++i];
    else if (argv[i] === '--solo' && argv[i + 1]) a.solo = argv[++i].split(',').map((s) => s.trim()).filter(Boolean);
    else throw new Error(`argomento sconosciuto: ${argv[i]} (uso: --solo ${CONTROLLI.join(',')} [--radice DIR])`);
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
