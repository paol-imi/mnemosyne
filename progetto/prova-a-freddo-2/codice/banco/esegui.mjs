// Il banco minimo (piano, blocco 1 e §4; banco "Come si usa" e §5): i criteri deterministici di una prova (File, Mappa,
// Risposta, Non deve e, per le B, i controlli G1–G7) si controllano prima e senza giudice; poi una riga nella tabella degli esiti.
//
//   node banco/esegui.mjs --prova B01 [--ramo banco/zero] [--esiti FILE] [--cosa smista] [--fase consolida]
//        [--base REF] [--partenza REF] [--lettore M] [--giudice M] [--salta G3,…]
//        [--per-giudice] [--giudizi F1,F2,F3] [--radice DIR] [--prove DIR]
//
// --ramo: i file si leggono da quel ramo (git show); senza, dal working tree di --radice (predefinita: questo repository).
// --base: il commit "prima del caso" (Nuovo, G4, G5, G7); predefinito il genitore del commit che ha aggiunto il frammento.
// --fase consolida: solo i punti "dopo consolida" della scheda, senza G1–G7.
// --per-giudice: stampa il prompt di banco/giudice.md riempito (prova, preparazione, uscita, domande) e non scrive niente.
// --giudizi: i tre file con le risposte del giudice; vale la maggioranza, "non so" è contrario all'attesa.
// Esiti: --esiti FILE, altrimenti banco/esiti/AAAAMMGG-COSA.md (la data di scripts/ora.mjs, COSA da --cosa, "banco").
// Codice d'uscita: 0 passa o in attesa del giudice, 1 fallisce, 2 uso sbagliato.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, mkdtempSync, symlinkSync, unlinkSync } from 'node:fs';
import { join, dirname, relative, sep, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { isDeepStrictEqual } from 'node:util';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { oggi } from '../scripts/ora.mjs';

const QUI = dirname(fileURLToPath(import.meta.url));
const SEZIONI = { file: 'File', mappa: 'Mappa', risposta: 'Risposta', non_deve: 'Non deve' };
const GENERALI = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'];
const G4_AMMESSI = new Set(['schema', 'nome', 'alias', 'nato-da', 'attribuita-a']);
const SALTA = new Set(['.git', 'node_modules']);

// `**` qualunque profondità, `*` e `?` dentro un nome, `{a,b}` alternative.
export function globRe(g) {
  let s = '';
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === '*' && g[i + 1] === '*') { s += g[i + 2] === '/' ? '(?:.*/)?' : '.*'; i += g[i + 2] === '/' ? 2 : 1; }
    else if (c === '*') s += '[^/]*';
    else if (c === '?') s += '[^/]';
    else if (c === '{') { const f = g.indexOf('}', i); s += '(?:' + g.slice(i + 1, f).split(',').map((x) => globRe(x).source.slice(1, -1)).join('|') + ')'; i = f; }
    else s += c.replace(/[.+^$()|[\]\\]/g, '\\$&');
  }
  return new RegExp('^' + s + '$');
}

// Frontmatter (YAML 1.2 core: le date restano stringhe), il suo testo e il corpo.
export function dividi(t) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(t);
  if (!m) return { fm: {}, testa: '', corpo: t };
  let fm = {};
  try { fm = parse(m[1]) ?? {}; } catch { /* un frontmatter rotto non ha campi: i criteri cadono da sé */ }
  return { fm, testa: m[1], corpo: t.slice(m[0].length) };
}

// La sezione di un markdown (`## 3. Alias`): dal titolo al titolo successivo dello stesso livello o più alto.
export function sezione(t, nome) {
  const righe = t.split('\n');
  const re = new RegExp(`^(#+)\\s+(?:\\d+\\.\\s*)?${nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  const i = righe.findIndex((r) => re.test(r));
  if (i < 0) return null;
  const liv = re.exec(righe[i])[1].length;
  const f = righe.findIndex((r, j) => j > i && /^#+\s/.test(r) && /^#+/.exec(r)[0].length <= liv);
  return righe.slice(i + 1, f < 0 ? undefined : f).join('\n');
}

const piano = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const globDi = (data) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(data);
  return `frammenti/${m[1]}/${m[2]}/${m[1]}${m[2]}${m[3]}-${m[4]}${m[5]}-*.md`;
};

// I file di una prova: il working tree di `radice`, oppure un ramo.
export function archivio({ radice, ramo }) {
  const git = (...a) => execFileSync('git', a, { cwd: radice, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });
  const forse = (...a) => { try { return git(...a); } catch { return null; } };
  const righe = (s) => (s ?? '').split('\n').filter(Boolean);
  let elenco = [];
  if (ramo) elenco = righe(git('ls-tree', '-r', '--name-only', ramo));
  else {
    const giu = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) {
      if (SALTA.has(e.name)) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) giu(p); else elenco.push(relative(radice, p).split(sep).join('/'));
    } };
    giu(radice);
  }
  const tutti = new Set(elenco), cache = new Map();
  const leggi = (f) => {
    if (!cache.has(f)) cache.set(f, ramo ? git('show', `${ramo}:${f}`) : readFileSync(join(radice, f), 'utf8'));
    return cache.get(f);
  };
  return { radice, ramo, git, forse, righe, elenco, tutti, leggi,
    trova: (g) => { const r = globRe(g); return elenco.filter((f) => r.test(f)); },
    fm: (f) => dividi(leggi(f)).fm };
}

// Il caso: id(Bnn), frammento, lettura, risposte, la base "prima del caso", i file che ci sono e quelli cambiati da allora.
export function prepara(prova, { arch, base, altra = () => null }) {
  const idDi = (p) => { const fs = p?.data ? arch.trova(globDi(p.data)) : []; return fs.length === 1 ? fs[0] : null; };
  const frammento = idDi(prova), id = frammento && basename(frammento, '.md');
  const ctx = { prova, arch, id, frammento, lettura: id && `letture/${id.slice(0, 4)}/${id.slice(4, 6)}/${id}.md`, fm: arch.fm };
  ctx.idDi = (b) => { const f = b === prova.id ? frammento : idDi(altra(b)); return f && basename(f, '.md'); };
  if (!base && frammento) {
    const c = arch.righe(arch.forse('log', arch.ramo ?? 'HEAD', '--diff-filter=A', '--format=%H', '--', frammento)).at(-1);
    base = c ? arch.forse('rev-parse', '-q', '--verify', `${c}^`)?.trim() : arch.ramo ? null : arch.forse('rev-parse', 'HEAD')?.trim();
  }
  ctx.base = base || null;
  ctx.prima = ctx.base ? new Set(arch.righe(arch.forse('ls-tree', '-r', '--name-only', ctx.base))) : null;
  ctx.cambiati = ctx.base ? new Set(arch.righe(arch.forse('diff', '--name-status', '--no-renames', ctx.base, ...(arch.ramo ? [arch.ramo] : [])))
    .filter((r) => !r.startsWith('A')).map((r) => r.split('\t')[1])) : null;
  ctx.risposte = id ? arch.trova('restituzioni/**/*.md').filter((f) => { const m = arch.fm(f);
    return m.per === id || [].concat(m.copre ?? []).includes(id); }) : [];
  return ctx;
}

// I segnaposto della scheda: id(Bnn) e nuovo(GLOB), lo slug dell'unico file nuovo che il glob trova.
function sostituisci(ctx, v) {
  if (Array.isArray(v)) return v.map((x) => sostituisci(ctx, x));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'motivo' ? x : sostituisci(ctx, x)]));
  if (typeof v !== 'string') return v;
  return v.replace(/id\(([BDRT]\d{2})\)/g, (_, b) => ctx.idDi(b) ?? (() => { throw new Error(`id(${b}) non risolto`); })())
    .replace(/nuovo\(([^)]+)\)/g, (_, g) => {
      const fs = ctx.prima ? ctx.arch.trova(g).filter((f) => !ctx.prima.has(f)) : [];
      if (fs.length !== 1) throw new Error(`nuovo(${g}): ${fs.length} file nuovi invece di uno`);
      return basename(fs[0], '.md');
    });
}

// `contiene`: liste come sottoinsiemi, oggetti parziali; i confronti speciali $include, $regex (+$flag), $nodo, $presente.
function combacia(ctx, v, a) {
  if (Array.isArray(a)) return Array.isArray(v) && a.every((x) => v.some((y) => combacia(ctx, y, x)));
  if (a && typeof a === 'object' && Object.keys(a).some((k) => k.startsWith('$'))) {
    const c = v !== undefined && v !== null && v !== '';
    if ('$presente' in a && c !== a.$presente) return false;
    if (!c) return a.$presente === false;
    if ('$include' in a && !String(v).includes(a.$include)) return false;
    if ('$regex' in a && !new RegExp(a.$regex, a.$flag ?? '').test(String(v))) return false;
    if ('$nodo' in a && !ctx.arch.tutti.has(`${a.$nodo}/${v}.md`)) return false;
    return true;
  }
  if (a && typeof a === 'object') return !!v && typeof v === 'object' && !Array.isArray(v)
    && Object.entries(a).every(([k, x]) => combacia(ctx, v[k], x));
  return v !== undefined && v !== null && String(v) === String(a);
}

function campoRegge(ctx, c, fm) {
  const v = fm[c.campo];
  if (c.assente) return v === undefined || v === null;
  if ('vale' in c) return isDeepStrictEqual(v, c.vale);
  return combacia(ctx, v, c.contiene);
}

function file(ctx, c) {
  const d = c.dove;
  let fs = d === '@frammento' ? [ctx.frammento] : d === '@lettura' ? [ctx.lettura] : d === '@risposta' ? ctx.risposte
    : d === '@mappa' ? ['contesto/mappa.md'] : ctx.arch.trova(d);
  fs = fs.filter((f) => f && ctx.arch.tutti.has(f));
  if (c.nuovo !== undefined) {
    if (!ctx.prima) throw new Error('base ignota: "nuovo" non si controlla');
    fs = fs.filter((f) => ctx.prima.has(f) !== c.nuovo);
  }
  if (c.filtro) fs = fs.filter((f) => campoRegge(ctx, c.filtro, ctx.fm(f)));
  return fs;
}

function testo(ctx, c, f) {
  const t = ctx.arch.leggi(f), p = c.parte ?? (c.dove === '@risposta' ? 'corpo' : 'tutto');
  const s = p === 'tutto' ? t : p === 'corpo' ? dividi(t).corpo : dividi(t).testa;
  return c.sezione ? sezione(s, c.sezione) ?? '' : s;
}

// I tratti in corsivo di un markdown (`*…*`, `_…_`; non il grassetto), senza «» e virgolette ai capi.
export function corsivi(t) {
  const re = /(?<![*\\\p{L}\p{N}])\*(?![*\s])([^*\n]+?)(?<![\s\\])\*(?![*\p{L}\p{N}])|(?<![_\\\p{L}\p{N}])_(?![_\s])([^_\n]+?)(?<!\s)_(?![_\p{L}\p{N}])/gu;
  return [...t.matchAll(re)].map((m) => (m[1] ?? m[2]).replace(/^[«"“\s]+|[»"”\s]+$/g, '')).filter(Boolean);
}
// Un corsivo è alla lettera se ogni suo pezzo (tra … o […]) sta nel corpo di uno stesso frammento.
const pezzi = (s) => s.split(/\s*(?:\[…\]|\[\.\.\.\]|\(…\)|…|\.\.\.)\s*/).filter((x) => x.trim());

const conta = (t, c) => c.regex !== undefined
  ? (t.match(new RegExp(c.regex, (c.flag ?? '').replace('g', '') + 'g')) ?? []).length : t.split(c.testo).length - 1;

// Un criterio → [regge, dettaglio]. "Regge" vuol dire che il fatto descritto accade; in Non deve è il fallimento.
function valuta(ctx, c0) {
  const c = sostituisci(ctx, c0);
  if ('esiste' in c) { const { esiste, ...r } = c; return valuta(ctx, { ...r, dove: esiste, min: 1 }); }
  if ('cambia' in c) {
    if (!ctx.cambiati) throw new Error('base ignota: "cambia" non si controlla');
    const re = globRe(c.cambia), fs = [...ctx.cambiati].filter((f) => re.test(f));
    return [fs.length > 0, fs.length ? `cambiato ${fs.join(', ')}` : `nessun cambio in ${c.cambia}`];
  }
  const fs = file(ctx, c), cerca = c.testo ?? c.regex, dove = `${c.dove}${c.sezione ? ` § ${c.sezione}` : ''}`;
  if ('alla_lettera' in c) {
    if (!fs.length) return [false, `nessun file per ${dove}`];
    const fonti = ctx.arch.trova(c.alla_lettera).filter((f) => f !== ctx.frammento).map((f) => dividi(ctx.arch.leggi(f)).corpo);
    const fuori = fs.flatMap((f) => corsivi(testo(ctx, c, f)).filter((x) => !fonti.some((t) => pezzi(x).every((p) => t.includes(p)))));
    return [!fuori.length, fuori.length ? `non alla lettera in ${c.alla_lettera}: ${fuori.map((x) => `«${x}»`).join(', ')}`
      : `ogni corsivo di ${dove} è in ${c.alla_lettera}`];
  }
  if ('campo' in c) {
    if (!fs.length) return [false, `nessun file per ${dove}`];
    const f = fs.find((x) => campoRegge(ctx, c, ctx.fm(x)));
    return [!!f, f ? `${c.campo} in ${f}` : `${c.campo} non conforme in ${fs.join(', ')}`];
  }
  if (cerca !== undefined && c.min === undefined && c.max === undefined) {
    if (!fs.length) return [false, `nessun file per ${dove}`];
    const f = fs.find((x) => conta(testo(ctx, c, x), c) > 0);
    return [!!f, f ? `«${cerca}» in ${f}` : `«${cerca}» non c'è in ${dove}`];
  }
  const n = cerca === undefined ? fs.length : fs.reduce((s, f) => s + conta(testo(ctx, c, f), c), 0);
  const ok = n >= (c.min ?? 0) && n <= (c.max ?? Infinity);
  return [ok, `${n} ${cerca === undefined ? 'file' : `volte «${cerca}»`} in ${dove} (atteso ${c.min ?? 0}–${c.max ?? '∞'})`];
}

// I criteri della scheda: "Sezione n: motivo" per ognuno che cade.
export function criteri(ctx, fase = 'ingresso') {
  const parti = fase === 'consolida' ? [['Dopo consolida', ctx.prova.dopo_consolida ?? []]]
    : Object.entries(SEZIONI).map(([k, nome]) => [nome, ctx.prova[k] ?? []]);
  const falliti = [];
  for (const [nome, cs] of parti) cs.forEach((c, i) => {
    const non = nome === 'Non deve' || c.non === true;
    try {
      const [regge, det] = valuta(ctx, c);
      if (regge === non) falliti.push(`${nome} ${i + 1}: ${c.motivo ?? (non ? `accade: ${det}` : det)}`);
    } catch (e) { falliti.push(`${nome} ${i + 1}: ${e.message}`); }
  });
  return falliti;
}

// G3: lo schema con scripts/verifica.mjs; su un ramo, in un worktree temporaneo con i node_modules della radice.
function verifica(arch) {
  let dir = arch.radice, via = () => {};
  if (arch.ramo) {
    dir = mkdtempSync(join(tmpdir(), 'banco-'));
    arch.git('worktree', 'add', '--detach', dir, arch.ramo);
    if (existsSync(join(arch.radice, 'node_modules'))) symlinkSync(join(arch.radice, 'node_modules'), join(dir, 'node_modules'));
    via = () => { try { unlinkSync(join(dir, 'node_modules')); } catch { /* non c'era */ } arch.forse('worktree', 'remove', '--force', dir); };
  }
  try {
    if (!existsSync(join(dir, 'scripts/verifica.mjs'))) return ['G3: manca scripts/verifica.mjs'];
    const r = spawnSync(process.execPath, ['scripts/verifica.mjs', '--solo', 'schema'], { cwd: dir, encoding: 'utf8' });
    if (r.status === 0) return [];
    const e = `${r.stdout}\n${r.stderr}`.split('\n').filter((l) => l.startsWith('ERRORE')).slice(0, 3);
    return [`G3: ${e.join('; ') || `verifica.mjs esce con ${r.status}`}`];
  } finally { via(); }
}

// G1–G7 ("I controlli che valgono per ogni B"); quelli che non si possono decidere qui sono del giudice (G6: i 7 casi).
export function generali(ctx, salta = []) {
  const { prova, arch } = ctx, no = [];
  const g = (n, ok, perche) => { if (!ok) no.push(`${n}: ${perche}`); return !!ok; };
  const voglio = (n) => (prova.generali ?? (prova.id.startsWith('B') ? GENERALI : [])).includes(n) && !salta.includes(n);
  const fr = ctx.frammento ? dividi(arch.leggi(ctx.frammento)) : null;
  const le = ctx.lettura && arch.tutti.has(ctx.lettura) ? dividi(arch.leggi(ctx.lettura)) : null;
  const nati = (genere) => arch.trova(`${genere}/*.md`).filter((f) => (ctx.prima && !ctx.prima.has(f))
    || (ctx.id && [].concat(arch.fm(f)['nato-da'] ?? []).includes(ctx.id)));
  if (voglio('G1') && g('G1', fr, `manca il frammento ${globDi(prova.data)} (o non è uno solo)`)) {
    g('G1', fr.corpo === prova.messaggio || fr.corpo === `${prova.messaggio}\n`, 'il corpo non è il messaggio byte per byte');
    g('G1', fr.fm.canale === 'telefono', `canale: ${fr.fm.canale}`);
    g('G1', Math.abs(new Date(fr.fm.registrato) - new Date(prova.data)) <= 60000, `registrato ${fr.fm.registrato}, non ${prova.data} ± 60 s`);
  }
  if (voglio('G2') && g('G2', le, `manca la lettura ${ctx.lettura ?? '(frammento non trovato)'}`)) {
    g('G2', le.fm.versione === 1 && le.fm.schema === 3, `versione ${le.fm.versione}, schema ${le.fm.schema}`);
    g('G2', le.fm['letto-da'] && le.fm.prompt, 'manca letto-da o prompt');
    const s = arch.righe(arch.forse('log', arch.ramo ?? 'HEAD', '--diff-filter=A', '--format=%s', '--', ctx.lettura)).at(-1);
    g('G2', /^smista:/.test(s ?? ''), `la lettura non viene da un commit smista: (${s ?? 'nessun commit'})`);
  }
  if (voglio('G3')) no.push(...verifica(arch));
  if (voglio('G4')) {
    for (const f of nati('citazioni')) {
      const fuori = Object.keys(arch.fm(f)).filter((k) => !G4_AMMESSI.has(k));
      g('G4', !fuori.length, `${f} ha ${fuori.join(', ')} all'ingresso`);
    }
    for (const f of ctx.risposte) g('G4', ![].concat(arch.fm(f).voci ?? []).some((v) => v && 'esito' in v), `${f}: una voce con esito all'ingresso`);
  }
  if (voglio('G5')) {
    const parole = ` ${piano(fr?.corpo ?? '')} `;
    for (const f of nati('temi')) {
      const n = piano(String(arch.fm(f).nome ?? ''));
      g('G5', n && parole.includes(` ${n} `), `${f}: il tema «${arch.fm(f).nome}» non è una parola del frammento`);
    }
    const leg = [].concat(le?.fm.legami ?? []);
    g('G5', !leg.some((l) => l?.p === 'contraddice'), 'contraddice all\'ingresso');
    const p = leg.filter((l) => l?.voce === 'proposta').length;
    g('G5', p <= 2, `${p} legami voce: proposta (al più 2)`);
  }
  if (voglio('G6')) {
    const chiedi = [].concat(le?.fm.intento ?? []).includes('chiedi');
    for (const f of ctx.risposte) {
      const c = dividi(arch.leggi(f)).corpo, q = c.split('?').length - 1;
      g('G6', q <= 1, `${f}: ${q} "?"`);
      const resto = chiedi ? c : c.replace(/^[\s*_]*(salvat[oa]|ci sono)[.!]?[*_]*/i, '');
      const n = resto.split(/\s+/).filter((x) => /\p{L}/u.test(x)).length;
      g('G6', n <= (chiedi ? 150 : 40), `${f}: ${n} parole ${chiedi ? '(con chiedi, al più 150)' : 'oltre "Salvato." (al più 40)'}`);
    }
  }
  if (voglio('G7') && g('G7', ctx.cambiati, 'base ignota')) {
    const toccati = [...ctx.cambiati].filter((f) => /^(frammenti|letture|restituzioni)\//.test(f) && f !== 'frammenti/.hash');
    g('G7', !toccati.length, `cambiati ${toccati.join(', ')}`);
  }
  return no;
}

// Il prompt del giudice: solo la prova, la preparazione e l'uscita (i file di dati nuovi o cambiati dalla base; contesto/ no).
const DATI = /^(ingresso|frammenti|letture|persone|opere|citazioni|temi|raccolte|restituzioni|riserva)\/.*\.md$/;
export function promptGiudice(ctx, modello) {
  const p = ctx.prova, a = ctx.arch;
  const nuovi = ctx.prima ? a.elenco.filter((f) => !ctx.prima.has(f)) : [];
  const fs = [...new Set([ctx.frammento, ctx.lettura, ...ctx.risposte, ...nuovi, ...(ctx.cambiati ?? [])])]
    .filter((f) => f && a.tutti.has(f) && DATI.test(f)).sort();
  const uscita = fs.map((f) => `### ${f}\n\n\`\`\`\`\n${a.leggi(f).trimEnd()}\n\`\`\`\``).join('\n\n') || '(nessun file nuovo o cambiato)';
  const prep = p.preparazione ?? `Il ${p.data} arriva dal telefono questo messaggio:\n\n> ${p.messaggio.split('\n').join('\n> ')}`;
  return modello.split('<!-- prompt -->').at(-1).trimStart()
    .replace('{{PROVA}}', () => `${p.id}${p.titolo ? ` · ${p.titolo}` : ''}`)
    .replace('{{PREPARAZIONE}}', () => prep).replace('{{USCITA}}', () => uscita)
    .replace('{{DOMANDE}}', () => (p.giudice ?? []).map((d, i) => `D${i + 1}. ${d.domanda}`).join('\n'));
}

// Tre giudizi, una riga per domanda ("D1: sì — motivo"); vale la maggioranza; una domanda senza risposta è "non so".
export function maggioranza(domande, testi) {
  const leggi = (t) => {
    const r = {};
    for (const l of t.split('\n')) {
      const m = /^\W*D(\d+)\W*?\s*(sì|si|no|non so)(?=[\s—–\-:.,;*]|$)[\s—–\-:.,;*]*(.*)$/iu.exec(l.trim());
      if (m) r[m[1]] ??= { v: m[2].toLowerCase() === 'si' ? 'sì' : m[2].toLowerCase(), perche: m[3].trim() };
    }
    return r;
  };
  const g = testi.map(leggi), no = [];
  domande.forEach((d, i) => {
    const voti = g.map((x) => x[i + 1] ?? { v: 'non so', perche: 'nessuna risposta' });
    if (voti.filter((x) => x.v === d.attesa).length * 2 <= voti.length) {
      const c = voti.find((x) => x.v !== d.attesa);
      no.push(`giudice D${i + 1}: ${c.v}${c.perche ? `, ${c.perche}` : ''}`);
    }
  });
  return no;
}

// La tabella del banco §5: una riga per prova (la stessa prova rifatta sostituisce la sua riga), poi i conti.
const TABELLA = '| prova | esito | criteri falliti | gravità | nota |\n|---|---|---|---|---|\n';
const celle = (r) => r.split(/(?<!\\)\|/).slice(1, -1).map((x) => x.trim());
const ESITI = ['passa', 'fallisce', 'in attesa del giudice', 'lacuna'];

function conti(righe) {
  const rs = righe.map(celle), n = (xs, e) => xs.filter((r) => r[1] === e).length;
  const frase = (xs) => `${xs.length} prove: ${n(xs, 'passa')} passano, ${n(xs, 'fallisce')} falliscono, `
    + `${n(xs, 'in attesa del giudice')} in attesa del giudice, ${n(xs, 'lacuna')} lacune`;
  const parti = [...new Set(rs.map((r) => r[0][0]))].sort().map((k) => `- **Parte ${k}:** ${frase(rs.filter((r) => r[0][0] === k))}.`);
  const grav = ['alta', 'media', 'bassa'].map((g) => { const ps = rs.filter((r) => r[1] === 'fallisce' && r[3] === g).map((r) => r[0]);
    return `${g} ${ps.length}${ps.length ? ` (${ps.join(', ')})` : ''}`; });
  return `## Conti\n\n${parti.join('\n')}\n- **Fallimenti per gravità:** ${grav.join(', ')}.\n- **Sintesi:** ${frase(rs)}.\n`;
}

export function registra(file, testata, r) {
  const esc = (s) => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
  const riga = `| ${[r.prova, r.esito, r.falliti.length ? r.falliti.join('; ') : '—', r.gravita ?? '—', r.nota ?? ''].map(esc).join(' | ')} |`;
  let capo = testata, righe = [];
  if (existsSync(file)) {
    const t = readFileSync(file, 'utf8'), i = t.indexOf('| prova |');
    capo = i < 0 ? `${t.trimEnd()}\n\n` : t.slice(0, i);
    righe = i < 0 ? [] : t.slice(i).split('\n').filter((l) => l.startsWith('| ') && ESITI.includes(celle(l)[1]));
  }
  righe = righe.filter((l) => celle(l)[0] !== celle(riga)[0]).concat(riga);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${capo}${TABELLA}${righe.join('\n')}\n\n${conti(righe)}`);
  return file;
}

function argomenti(v) {
  const a = {};
  for (let i = 0; i < v.length; i++) if (v[i].startsWith('--')) {
    a[v[i].slice(2)] = v[i + 1] === undefined || v[i + 1].startsWith('--') ? true : v[++i];
  }
  return a;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const a = argomenti(process.argv.slice(2));
  const esci = (m) => { console.error(m); process.exit(2); };
  if (typeof a.prova !== 'string') esci('uso: node banco/esegui.mjs --prova B01 [--ramo banco/zero] [--esiti FILE] (vedi la testa del file)');
  const radice = a.radice ?? join(QUI, '..'), prove = a.prove ?? join(QUI, 'prove');
  const leggiProva = (id) => { try { return JSON.parse(readFileSync(join(prove, `${id}.json`), 'utf8')); } catch { return null; } };
  const prova = leggiProva(a.prova) ?? esci(`prova ${a.prova} non trovata in ${prove}`);
  const ramo = typeof a.ramo === 'string' ? a.ramo : undefined;
  const arch = archivio({ radice, ramo });
  const ctx = prepara(prova, { arch, base: typeof a.base === 'string' ? a.base : undefined, altra: leggiProva });

  if (a['per-giudice']) { process.stdout.write(promptGiudice(ctx, readFileSync(join(QUI, 'giudice.md'), 'utf8'))); process.exit(0); }

  const fase = a.fase === 'consolida' ? 'consolida' : 'ingresso';
  const salta = typeof a.salta === 'string' ? a.salta.split(',').map((s) => s.trim()) : [];
  const falliti = [...(fase === 'ingresso' ? generali(ctx, salta) : []), ...criteri(ctx, fase)];
  const domande = fase === 'ingresso' ? prova.giudice ?? [] : [];
  const nota = [];
  if (fase === 'consolida') nota.push('dopo consolida');
  if (salta.length) nota.push(`saltati ${salta.join(', ')}`);
  let esito = falliti.length ? 'fallisce' : domande.length ? 'in attesa del giudice' : 'passa';
  if (!falliti.length && domande.length && typeof a.giudizi === 'string') {
    const testi = a.giudizi.split(',').map((f) => readFileSync(f, 'utf8'));
    if (testi.length !== 3) esci(`servono tre giudizi, non ${testi.length}`);
    falliti.push(...maggioranza(domande, testi));
    esito = falliti.length ? 'fallisce' : 'passa';
    nota.push('giudice: maggioranza di 3');
  } else if (esito === 'in attesa del giudice') nota.push(`deterministici passati; ${domande.length} ${domande.length === 1 ? "domanda" : "domande"} al giudice`);
  else if (falliti.length && domande.length) nota.push('giudice non serve');

  const sha = (r) => r && arch.forse('rev-parse', '--short=12', r)?.trim();
  const lettore = a.lettore ?? process.env.BANCO_LETTORE
    ?? (ctx.lettura && arch.tutti.has(ctx.lettura) ? arch.fm(ctx.lettura)['letto-da'] : null) ?? '—';
  const giudice = a.giudice ?? process.env.BANCO_GIUDICE ?? '—';
  const partenza = sha(a.partenza) ?? sha(ctx.base) ?? sha(ramo ?? 'HEAD') ?? 'ignoto';
  const cosa = typeof a.cosa === 'string' ? a.cosa : 'banco';
  const testata = `# Banco: ${cosa}, ${oggi()}\n\n- **Modello lettore:** ${lettore}\n- **Modello giudice:** ${giudice}\n`
    + `- **Schema:** 3\n- **Partenza:** ${partenza}${ramo ? ` (ramo \`${ramo}\`)` : ''}\n\n`;
  const etichetta = fase === 'consolida' ? `${prova.id} dopo consolida` : prova.id;
  const out = typeof a.esiti === 'string' ? a.esiti : join(radice, 'banco', 'esiti', `${oggi().replaceAll('-', '')}-${cosa}.md`);
  registra(out, testata, { prova: etichetta, esito, falliti, gravita: esito === 'fallisce' ? prova.gravita : null, nota: nota.join('; ') });
  for (const f of falliti) console.log(`FALLISCE ${etichetta} ${f}`);
  console.log(`${etichetta}: ${esito} → ${relative(process.cwd(), out) || out}`);
  process.exit(esito === 'fallisce' ? 1 : 0);
}
