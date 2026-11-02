// Il banco minimo (piano, blocco 1 e §4; banco "Come si usa" e §5): i criteri deterministici di una prova si controllano
// prima e senza giudice (File, Mappa, Risposta, Non deve e, per le B, G1–G7; Forma e Scrive per le D; D0…Dn per le R);
// poi una riga nella tabella degli esiti; il giudice (banco/giudice.md) solo se i deterministici passano.
//
//   node banco/esegui.mjs --prova B01 [--ramo banco/zero] [--esiti FILE]
//        [--uscita FILE] [--base REF] [--fase consolida|cattura] [--cosa blocco-5] [--etichetta "D02 oggi"]
//        [--partenza REF] [--lettore M] [--giudice M] [--salta G3,…]
//        [--per-giudice] [--giudizi F1,F2,F3] [--radice DIR] [--prove DIR]
//
// --ramo: i file si leggono da quel ramo (git show); senza, dal working tree di --radice (predefinita: questo repository).
// --uscita: un'uscita testuale (la risposta di Specchio o del Progetto salvata così com'è in un file); i criteri la
//   leggono con dove: "@uscita", il giudice la vede accanto ai file.
// --base: il commit "prima del caso" (Nuovo, cambia, G4, G5, G7). Predefinito: per una prova con il suo frammento, il
//   genitore del commit che lo ha aggiunto; altrimenti il campo base della prova (ref, o {dopo: Bnn}: l'ultimo commit che
//   tocca la lettura di Bnn); nel working tree, HEAD.
// --fase consolida: solo i punti "dopo consolida"; --fase cattura: G1 sul file in ingresso/ e G3, lo schema (blocco 3, B18 ridotta).
// --per-giudice: stampa il prompt di banco/giudice.md riempito (prova, preparazione, uscita, domande) e non scrive niente.
// --giudizi: i tre file con le risposte del giudice; vale la maggioranza, "non so" e "con riserve" sono contrari all'attesa.
// Esiti: --esiti FILE, altrimenti banco/esiti/AAAAMMGG-COSA.md (la data di scripts/ora.mjs, COSA da --cosa, "banco").
// Codice d'uscita: 0 passa o in attesa del giudice, 1 fallisce, 2 uso sbagliato.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, mkdtempSync, symlinkSync, unlinkSync } from 'node:fs';
import { join, dirname, relative, sep, basename, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { isDeepStrictEqual } from 'node:util';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { oggi } from '../scripts/ora.mjs';

const QUI = dirname(fileURLToPath(import.meta.url));
const SEZIONI = { file: 'File', mappa: 'Mappa', risposta: 'Risposta', forma: 'Forma', scrive: 'Scrive',
  deterministici: 'Deterministici', non_deve: 'Non deve' };
const GENERALI = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'];
const G4_AMMESSI = new Set(['schema', 'nome', 'alias', 'nato-da', 'attribuita-a']);
const NODI = ['persone', 'opere', 'citazioni', 'temi', 'raccolte'];
const SALTA = new Set(['.git', 'node_modules']);
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre',
  'novembre', 'dicembre'];
const USCITA = '@uscita';

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
const globDi = (data, cartella = 'frammenti') => {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(data);
  const nome = `${m[1]}${m[2]}${m[3]}-${m[4]}${m[5]}-*.md`;
  return cartella === 'ingresso' ? `ingresso/${nome}` : `frammenti/${m[1]}/${m[2]}/${nome}`;
};
const lettura = (id) => `letture/${id.slice(0, 4)}/${id.slice(4, 6)}/${id}.md`;

// I file di una prova: il working tree di `radice`, oppure un ramo. `cartella()` dà una directory con quei file (per
// verifica.mjs e i comandi): la radice, o un worktree temporaneo del ramo che `chiudi()` toglie.
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
  let wt = null;
  const cartella = () => {
    if (!ramo) return radice;
    if (wt) return wt;
    wt = mkdtempSync(join(tmpdir(), 'banco-'));
    git('worktree', 'add', '--detach', wt, ramo);
    if (existsSync(join(radice, 'node_modules'))) symlinkSync(join(radice, 'node_modules'), join(wt, 'node_modules'));
    return wt;
  };
  const chiudi = () => {
    if (!wt) return;
    try { unlinkSync(join(wt, 'node_modules')); } catch { /* non c'era */ }
    forse('worktree', 'remove', '--force', wt);
    wt = null;
  };
  return { radice, ramo, git, forse, righe, elenco, tutti, leggi, cartella, chiudi,
    trova: (g) => { const r = globRe(g); return elenco.filter((f) => r.test(f)); },
    fm: (f) => dividi(leggi(f)).fm };
}

// Il caso: id(Bnn), frammento, lettura, risposte, l'uscita testuale, la base "prima del caso", i file che c'erano e
// quelli cambiati da allora.
export function prepara(prova, { arch, base, altra = () => null, uscita = null, fase = 'ingresso' }) {
  const cart = fase === 'cattura' ? 'ingresso' : 'frammenti';
  const idDi = (p, c = 'frammenti') => { const fs = p?.data ? arch.trova(globDi(p.data, c)) : []; return fs.length === 1 ? fs[0] : null; };
  const frammento = idDi(prova, cart), id = frammento && basename(frammento, '.md');
  const ctx = { prova, arch, id, frammento, lettura: id && lettura(id), uscita, cache: new Map() };
  ctx.idDi = (b) => { const f = b === prova.id ? frammento : idDi(altra(b)); return f && basename(f, '.md'); };
  ctx.leggi = (f) => (f === USCITA ? uscita?.testo ?? '' : arch.leggi(f));
  ctx.fm = (f) => (f === USCITA ? {} : arch.fm(f));
  const ref = (r) => r && arch.forse('rev-parse', '-q', '--verify', `${r}^{commit}`)?.trim();
  const punta = arch.ramo ?? 'HEAD';
  if (!base && frammento) {
    const c = arch.righe(arch.forse('log', punta, '--diff-filter=A', '--format=%H', '--', frammento)).at(-1);
    base = c ? ref(`${c}^`) : arch.ramo ? null : ref('HEAD');
  }
  if (!base && !frammento) for (const b of [].concat(prova.base ?? [])) {
    if (typeof b === 'string') base = ref(b);
    else if (b?.dopo) { const i = ctx.idDi(b.dopo); base = i && arch.righe(arch.forse('log', '-1', '--format=%H', punta, '--', lettura(i)))[0]; }
    if (base) break;
  }
  if (!base && !arch.ramo) base = ref('HEAD');
  ctx.base = base || null;
  ctx.prima = ctx.base ? new Set(arch.righe(arch.forse('ls-tree', '-r', '--name-only', ctx.base))) : null;
  ctx.cambiati = ctx.base ? new Set(arch.righe(arch.forse('diff', '--name-status', '--no-renames', ctx.base, ...(arch.ramo ? [arch.ramo] : [])))
    .filter((r) => !r.startsWith('A')).map((r) => r.split('\t')[1])) : null;
  ctx.risposte = id && fase !== 'cattura' ? arch.trova('restituzioni/**/*.md').filter((f) => { const m = arch.fm(f);
    return m.per === id || [].concat(m.copre ?? []).includes(id); }) : [];
  // un id di frammento o uno slug che alla base c'era (R14 D3)
  ctx.allaBase = (v) => !!ctx.prima && [...ctx.prima].some((f) => (f.startsWith('frammenti/') || NODI.some((n) => f.startsWith(`${n}/`)))
    && basename(f, '.md') === v);
  return ctx;
}

// I segnaposto della scheda: id(Bnn) e nuovo(GLOB), lo slug dell'unico file nuovo che il glob trova.
function sostituisci(ctx, v) {
  if (Array.isArray(v)) return v.map((x) => sostituisci(ctx, x));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, ['motivo', 'oppure'].includes(k) ? x : sostituisci(ctx, x)]));
  if (typeof v !== 'string') return v;
  return v.replace(/id\(([BDRT]\d{2}[a-z]?)\)/g, (_, b) => ctx.idDi(b) ?? (() => { throw new Error(`id(${b}) non risolto`); })())
    .replace(/nuovo\(([^)]+)\)/g, (_, g) => {
      const fs = ctx.prima ? ctx.arch.trova(g).filter((f) => !ctx.prima.has(f)) : [];
      if (fs.length !== 1) throw new Error(`nuovo(${g}): ${fs.length} file nuovi invece di uno`);
      return basename(fs[0], '.md');
    });
}

// `contiene`: liste come sottoinsiemi, oggetti parziali; i confronti speciali $presente, $ogni, $alcuno, $include,
// $regex (+$flag), $nodo, $alla_base.
function combacia(ctx, v, a) {
  if (Array.isArray(a)) return Array.isArray(v) && a.every((x) => v.some((y) => combacia(ctx, y, x)));
  if (a && typeof a === 'object' && Object.keys(a).some((k) => k.startsWith('$'))) {
    const c = v !== undefined && v !== null && v !== '';
    if ('$presente' in a && c !== a.$presente) return false;
    if (!c) return a.$presente === false;
    if ('$ogni' in a && !(Array.isArray(v) && v.every((y) => combacia(ctx, y, a.$ogni)))) return false;
    if ('$alcuno' in a && !(Array.isArray(v) && v.some((y) => combacia(ctx, y, a.$alcuno)))) return false;
    if ('$include' in a && !String(v).includes(a.$include)) return false;
    if ('$regex' in a && !new RegExp(a.$regex, a.$flag ?? '').test(String(v))) return false;
    if ('$nodo' in a && !ctx.arch.tutti.has(`${a.$nodo}/${v}.md`)) return false;
    if ('$alla_base' in a && ctx.allaBase(String(v)) !== a.$alla_base) return false;
    return true;
  }
  if (a && typeof a === 'object') return !!v && typeof v === 'object' && !Array.isArray(v)
    && Object.entries(a).every(([k, x]) => combacia(ctx, v[k], x));
  return v !== undefined && v !== null && String(v) === String(a);
}

function campoRegge(ctx, c, fm) {
  const v = fm[c.campo];
  if (c.assente) return v === undefined || v === null;
  if ('diverso' in c) return !isDeepStrictEqual(v, c.diverso);
  if ('vale' in c) return isDeepStrictEqual(v, c.vale);
  return combacia(ctx, v, c.contiene);
}

function file(ctx, c) {
  const d = c.dove;
  if (d === USCITA) {
    if (!ctx.uscita) throw new Error('manca l\'uscita testuale (--uscita FILE)');
    return [USCITA];
  }
  let fs = d === '@frammento' ? [ctx.frammento] : d === '@lettura' ? [ctx.lettura] : d === '@risposta' ? ctx.risposte
    : d === '@mappa' ? ['contesto/mappa.md'] : ctx.arch.trova(d);
  fs = fs.filter((f) => f && ctx.arch.tutti.has(f));
  if (c.nuovo !== undefined) {
    if (!ctx.prima) throw new Error('base ignota: "nuovo" non si controlla (passa --base)');
    fs = fs.filter((f) => ctx.prima.has(f) !== c.nuovo);
  }
  if (c.filtro) fs = fs.filter((f) => campoRegge(ctx, c.filtro, ctx.fm(f)));
  return fs;
}

function testo(ctx, c, f) {
  const t = ctx.leggi(f), p = c.parte ?? (c.dove === '@risposta' ? 'corpo' : 'tutto');
  const s = f === USCITA || p === 'tutto' ? t : p === 'corpo' ? dividi(t).corpo : dividi(t).testa;
  return c.sezione ? sezione(s, c.sezione) ?? '' : s;
}

// I tratti in corsivo di un markdown (`*…*`, `_…_`; non il grassetto), senza «» e virgolette ai capi.
export function corsivi(t) {
  const re = /(?<![*\\\p{L}\p{N}])\*(?![*\s])([^*\n]+?)(?<![\s\\])\*(?![*\p{L}\p{N}])|(?<![_\\\p{L}\p{N}])_(?![_\s])([^_\n]+?)(?<!\s)_(?![_\p{L}\p{N}])/gu;
  return [...t.matchAll(re)].map((m) => (m[1] ?? m[2]).replace(/^[«"“\s]+|[»"”\s]+$/g, '')).filter(Boolean);
}
// I tratti tra «» (le parole d'altri riportate: R14 per U18–U20).
const virgolette = (t) => [...t.matchAll(/«([^»\n]+)»/g)].map((m) => m[1].replace(/^\*+|\*+$/g, '').trim()).filter(Boolean);
const tratti = (t, quali = 'corsivo') => quali === 'virgolette' ? virgolette(t)
  : quali === 'entrambi' ? [...corsivi(t), ...virgolette(t)] : corsivi(t);
// Un tratto è alla lettera se ogni suo pezzo (tra … o […]) sta nel corpo di uno stesso frammento; con parole_min, se ha
// almeno quelle parole o è il frammento intero (banco parte 2, "Come si leggono i criteri").
const pezzi = (s) => s.split(/\s*(?:\[…\]|\[\.\.\.\]|\(…\)|…|\.\.\.)\s*/).filter((x) => x.trim());
const nParole = (s) => s.split(/\s+/).filter((x) => /[\p{L}\p{N}]/u.test(x) && !/^https?:\/\//.test(x)).length;
function dove(x, fonti, min) {
  const ps = pezzi(x);
  return fonti.filter((f) => ps.every((p) => f.corpo.includes(p))
    && (!min || nParole(ps.join(' ')) >= min || ps.join(' ').trim() === f.corpo.trim()));
}

// Le fonti di un criterio "alla lettera": i corpi dei file del glob (il frammento della prova escluso), filtrati sul
// frontmatter, con le date che una riga può dire: quella dell'id, `registrato` e la data-tetto (`vissuto: ≤…`, §6.2).
function fonti(ctx, glob, filtro, conIlCaso = false) {
  const k = JSON.stringify([glob, filtro ?? null, conIlCaso]);
  if (!ctx.cache.has(k)) ctx.cache.set(k, ctx.arch.trova(glob).filter((f) => conIlCaso || f !== ctx.frammento)
    .filter((f) => !filtro || campoRegge(ctx, filtro, ctx.fm(f))).map((f) => {
      const { fm, corpo } = dividi(ctx.arch.leggi(f)), id = basename(f, '.md'), date = new Set();
      const m = /^(\d{4})(\d{2})(\d{2})/.exec(id);
      if (m) date.add(`${m[1]}-${m[2]}-${m[3]}`);
      if (typeof fm.registrato === 'string') date.add(fm.registrato.slice(0, 10));
      const l = lettura(id);
      if (ctx.arch.tutti.has(l)) { const v = String(ctx.arch.fm(l).vissuto ?? ''); const d = v.replace(/^≤/, ''); if (/^\d{4}-\d{2}-\d{2}/.test(d)) date.add(d.slice(0, 10)); }
      return { f, corpo, date: [...date].filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)) };
    }));
  return ctx.cache.get(k);
}
// "3 novembre", "3/11", "2026-11-03": una data detta in una riga.
export function diceData(t, iso) {
  const [a, m, g] = iso.split('-').map(Number);
  return new RegExp(`(?<!\\d)0?${g}°?\\s+(?:di\\s+)?${MESI[m - 1]}|(?<!\\d)0?${g}/0?${m}(?!\\d)|${iso}`, 'iu').test(t)
    || t.includes(`${a}-${String(m).padStart(2, '0')}-${String(g).padStart(2, '0')}`);
}

// I "?" come li conta G6 (e la parte 2): non contano quelli dentro «» o dentro un corsivo che è una tua frase in frammenti/.
export function domande(ctx, t) {
  let s = t.replace(/«[^»]*»/g, '');
  const fr = fonti(ctx, 'frammenti/**/*.md', null, true);
  for (const x of corsivi(s)) if (fr.some((f) => f.corpo.includes(x))) s = s.replace(x, '');
  return (s.match(/\?/g) ?? []).length;
}
const contaIn = (ctx, t, cosa) => {
  if (cosa === 'righe') return t.split('\n').filter((r) => r.trim()).length;
  if (cosa === 'parole') return nParole(t);
  return domande(ctx, t);
};

const conta = (t, c) => c.regex !== undefined
  ? (t.match(new RegExp(c.regex, (c.flag ?? '').replace('g', '') + 'g')) ?? []).length : t.split(c.testo).length - 1;

// Le righe non vuote dei file (la Forma delle D, R14 D1/D4): `riga` le sceglie per regex, `corsivo_da` tiene quelle con
// un tratto alla lettera di quei file (e, con con_data, la loro data); poi alla_lettera, ogni, dopo, prima, ultima o il conto.
function perRighe(ctx, c, fs) {
  const fuori = [], scelte = [];
  let ultime = [], fonteDi = null;
  const re = c.riga !== undefined ? new RegExp(c.riga, 'u') : null;
  // La data di una riga di un gruppo può stare in testa al gruppo (la riga senza ✦ subito prima, come la nota
  // "trascritta": CLAUDE.md regola 6), una volta per tutte le righe contigue.
  const gruppo = (ls, i) => { let j = i; while (j > 0 && /✦/u.test(ls[j - 1])) j--; return ls.slice(j > 0 ? j - 1 : 0, i + 1).join('\n'); };
  const conData = (r, tutto, trovate, ls, i) => !c.con_data || trovate.some((f) => f.date.some((d) => diceData(c.con_data === 'testo' ? tutto : (ls ? gruppo(ls, i) : r), d)));
  for (const f of fs) {
    const tutto = testo(ctx, c, f), ls = tutto.split('\n').map((r) => r.trim()).filter(Boolean);
    ultime.push(ls.at(-1) ?? '');
    let ks = ls.map((r, i) => ({ r, i, f })).filter((k) => !re || re.test(k.r));
    if (c.corsivo_da) {
      fonteDi = fonti(ctx, c.corsivo_da, c.fonte);
      ks = ks.filter((k) => tratti(k.r, c.tratti).filter((x) => !(c.tranne ?? []).some((t) => t.includes(String(x).trim()))).some((x) => { const t = dove(x, fonteDi, c.parole_min); return t.length && conData(k.r, tutto, t, ls, k.i); }));
    }
    if (c.alla_lettera) {
      const fo = fonti(ctx, c.alla_lettera, c.fonte);
      for (const k of ks) {
        // dopo ○ è il mondo: un corsivo lì è il titolo di un'opera (CLAUDE.md regola 1), non una frase ✦
        const ts = tratti(k.r.split('○')[0], c.tratti);
        if (!ts.length && c.serve_tratto) { fuori.push(`«${k.r}» senza tratto in corsivo`); continue; }
        for (const x of ts) {
          const t = dove(x, fo, c.parole_min);
          if (!t.length) fuori.push(`«${x}» non è alla lettera in ${c.alla_lettera}`);
          else if (!conData(k.r, tutto, t, ls, k.i)) fuori.push(`«${x}» senza la sua data`);
        }
      }
    }
    if (c.dopo !== undefined) {
      const ultima = ls.reduce((m, r, i) => (new RegExp(c.dopo, 'u').test(r) ? i : m), -1);
      for (const k of ks) if (k.i <= ultima) fuori.push(`«${k.r}» prima dell'ultima riga /${c.dopo}/`);
    }
    if (c.prima !== undefined) {
      const prima = ls.findIndex((r) => new RegExp(c.prima, 'u').test(r));
      for (const k of ks) if (prima >= 0 && k.i >= prima) fuori.push(`«${k.r}» dopo la riga /${c.prima}/`);
    }
    // gruppi (D02 «riportate»): le righe scelte che si toccano formano un gruppo; la nota sta una volta sola per gruppo, in
    // testa (sulla prima riga o in una riga senza segni subito prima), e in nessun'altra riga.
    if (c.gruppi !== undefined) {
      const mie = new Set(ks.map((k) => k.i)), ha = (i) => new RegExp(c.gruppi, 'u').test(ls[i]), nota = c.gruppi.replace('[ae]', 'a').replace('[Tt]', 't'), capi = new Set();
      for (const i of [...mie].sort((x, y) => x - y)) {
        if (mie.has(i - 1)) continue;
        const sopra = i > 0 && !/[✦✧◌○●⚠]/u.test(ls[i - 1]) && ha(i - 1);
        if (sopra) capi.add(i - 1);
        if (ha(i)) capi.add(i);
        if (sopra && ha(i)) fuori.push(`«${ls[i]}»: «${nota}» due volte in testa al gruppo`);
        else if (!sopra && !ha(i)) fuori.push(`«${ls[i]}» apre un gruppo senza «${nota}» in testa`);
      }
      ls.forEach((r, i) => { if (ha(i) && !capi.has(i)) fuori.push(`«${r}»: «${nota}» fuori dalla testa di un gruppo`); });
    }
    if (c.ogni && (c.testo !== undefined || c.regex !== undefined))
      for (const k of ks) if (!conta(k.r, c)) fuori.push(`«${k.r}» senza «${c.testo ?? c.regex}»`);
    scelte.push(...ks);
  }
  const dov = `${c.dove}${c.riga !== undefined ? ` (righe /${c.riga}/)` : ''}`;
  if (c.ultima !== undefined) {
    const ok = ultime.length > 0 && ultime.every((u) => u === c.ultima);
    return [ok, ok ? `l'ultima riga è «${c.ultima}»` : `l'ultima riga di ${c.dove} è «${ultime.join('», «')}», non «${c.ultima}»`];
  }
  if (c.alla_lettera || c.dopo !== undefined || c.prima !== undefined || c.ogni || c.gruppi !== undefined) {
    return [!fuori.length, fuori.length ? fuori.slice(0, 4).join('; ') : `${dov}: ${scelte.length} righe a posto`];
  }
  const min = c.min ?? (c.max === undefined ? 1 : 0), n = scelte.length, ok = n >= min && n <= (c.max ?? Infinity);
  return [ok, `${n} righe in ${dov}${c.corsivo_da ? ` con un tratto di ${c.corsivo_da}` : ''} (atteso ${min}–${c.max ?? '∞'})`];
}

// Una riga dell'uscita o un file: un comando ([S], come `smista.mjs vicini`) con il suo ambiente, nella cartella dei file.
function comando(ctx, c) {
  const [bin, ...args] = c.comando;
  const r = spawnSync(bin === 'node' ? process.execPath : bin, args, { cwd: ctx.arch.cartella(), encoding: 'utf8',
    env: { ...process.env, ...(c.env ?? {}) } });
  const out = `${r.stdout ?? ''}`;
  if (r.status !== 0) return [false, `${c.comando.join(' ')} esce con ${r.status}: ${(r.stderr || out).trim().split('\n')[0] ?? ''}`];
  const ok = c.testo === undefined && c.regex === undefined ? true : conta(out, c) > 0;
  return [ok, ok ? `${c.comando.join(' ')}: «${c.testo ?? c.regex}» c'è` : `${c.comando.join(' ')}: «${c.testo ?? c.regex}» non c'è nell'uscita`];
}

// Un criterio → [regge, dettaglio]. "Regge" vuol dire che il fatto descritto accade; in Non deve è il fallimento.
function valuta(ctx, c0) {
  if (c0.oppure) {
    const alt = c0.oppure.map((cs) => cs.flatMap((c) => { const f = esamina(ctx, c, false); return f ? [f] : []; }));
    const ok = alt.some((a) => !a.length);
    return [ok, ok ? 'una delle alternative regge' : alt.map((a, i) => `alternativa ${i + 1}: ${a.join(', ')}`).join(' | ')];
  }
  const c = sostituisci(ctx, c0);
  if ('esiste' in c) { const { esiste, ...r } = c; return valuta(ctx, { ...r, dove: esiste, min: 1 }); }
  if ('comando' in c) return comando(ctx, c);
  if ('cambia' in c) {
    if (!ctx.cambiati) throw new Error('base ignota: "cambia" non si controlla (passa --base)');
    const re = globRe(c.cambia), fs = [...ctx.cambiati].filter((f) => re.test(f));
    return [fs.length > 0, fs.length ? `cambiato ${fs.join(', ')}` : `nessun cambio in ${c.cambia}`];
  }
  const fs = file(ctx, c), cerca = c.testo ?? c.regex, dov = `${c.dove}${c.sezione ? ` § ${c.sezione}` : ''}`;
  if (['riga', 'corsivo_da', 'ultima', 'dopo', 'prima', 'gruppi'].some((k) => k in c)) {
    if (!fs.length) return [false, `nessun file per ${dov}`];
    return perRighe(ctx, c, fs);
  }
  if ('copia_in' in c) {
    if (!fs.length) return [false, `nessun file per ${dov}`];
    const dest = ctx.arch.tutti.has(c.copia_in) ? ctx.arch.leggi(c.copia_in) : null;
    const ok = dest !== null && fs.some((f) => dest.includes(testo(ctx, c, f).trim()));
    return [ok, ok ? `${c.copia_in} è la copia` : `${c.copia_in} ${dest === null ? 'non c\'è' : `non contiene ${dov}`}`];
  }
  if ('legame_nuovo' in c) {
    const chiave = (l) => [].concat(l?.tra ?? []).map(String).sort().join(' | ');
    const noti = new Set(ctx.arch.trova(c.confronta).filter((f) => !fs.includes(f))
      .filter((f) => !c.filtro_confronto || campoRegge(ctx, c.filtro_confronto, ctx.fm(f)))
      .flatMap((f) => [].concat(ctx.fm(f).legami ?? []).filter((l) => l?.p === c.legame_nuovo).map(chiave)));
    const miei = fs.flatMap((f) => [].concat(ctx.fm(f).legami ?? []).filter((l) => l?.p === c.legame_nuovo && l.tra).map(chiave));
    const nuovi = miei.filter((k) => !noti.has(k));
    return [nuovi.length > 0, nuovi.length ? `${c.legame_nuovo} nuovo: ${nuovi[0]}`
      : miei.length ? `ogni ${c.legame_nuovo} di ${dov} c'era già in ${c.confronta}` : `nessun ${c.legame_nuovo} in ${dov}`];
  }
  if ('conta' in c) {
    const n = fs.reduce((s, f) => s + contaIn(ctx, testo(ctx, c, f), c.conta), 0);
    const ok = fs.length > 0 && n >= (c.min ?? 0) && n <= (c.max ?? Infinity);
    return [ok, fs.length ? `${n} ${c.conta} in ${dov} (atteso ${c.min ?? 0}–${c.max ?? '∞'})` : `nessun file per ${dov}`];
  }
  if ('voci_a_inizio_riga' in c) {
    if (!fs.length) return [false, `nessun file per ${dov}`];
    const manca = fs.flatMap((f) => [].concat(ctx.fm(f).voci ?? []).filter((v) => v?.n !== undefined
      && !new RegExp(`^[\\s*_]*${v.n}\\.\\s`, 'm').test(dividi(ctx.leggi(f)).corpo)).map((v) => `${f}: la voce ${v.n}`));
    return [!manca.length, manca.length ? `non a inizio riga: ${manca.join(', ')}` : 'ogni voce a inizio riga'];
  }
  if ('alla_lettera' in c) {
    if (!fs.length) return [false, `nessun file per ${dov}`];
    const fo = fonti(ctx, c.alla_lettera, c.fonte);
    const fuori = fs.flatMap((f) => tratti(testo(ctx, c, f), c.tratti).filter((x) => !dove(x, fo, c.parole_min).length));
    return [!fuori.length, fuori.length ? `non alla lettera in ${c.alla_lettera}: ${fuori.map((x) => `«${x}»`).join(', ')}`
      : `ogni corsivo di ${dov} è in ${c.alla_lettera}`];
  }
  if ('elementi' in c) {
    const n = fs.reduce((s, f) => s + [].concat(ctx.fm(f)[c.campo] ?? []).filter((x) => combacia(ctx, x, c.elementi)).length, 0);
    const min = c.min ?? (c.max === undefined ? 1 : 0), ok = n >= min && n <= (c.max ?? Infinity);
    return [ok, `${n} elementi di ${c.campo} conformi in ${dov} (atteso ${min}–${c.max ?? '∞'})`];
  }
  if ('campo' in c) {
    if (!fs.length) return [false, `nessun file per ${dov}`];
    const f = fs.find((x) => campoRegge(ctx, c, ctx.fm(x)));
    return [!!f, f ? `${c.campo} in ${f}` : `${c.campo} non conforme in ${fs.join(', ')}`];
  }
  if (cerca !== undefined && c.min === undefined && c.max === undefined) {
    if (!fs.length) return [false, `nessun file per ${dov}`];
    const f = fs.find((x) => conta(testo(ctx, c, x), c) > 0);
    return [!!f, f ? `«${cerca}» in ${f}` : `«${cerca}» non c'è in ${dov}`];
  }
  const n = cerca === undefined ? fs.length : fs.reduce((s, f) => s + conta(testo(ctx, c, f), c), 0);
  const ok = n >= (c.min ?? 0) && n <= (c.max ?? Infinity);
  return [ok, `${n} ${cerca === undefined ? 'file' : `volte «${cerca}»`} in ${dov} (atteso ${c.min ?? 0}–${c.max ?? '∞'})`];
}

// Un criterio di una sezione: null se va, altrimenti il motivo.
function esamina(ctx, c, inNonDeve) {
  const non = inNonDeve || c.non === true;
  try {
    const [regge, det] = valuta(ctx, c);
    return regge === non ? c.motivo ?? (non ? `accade: ${det}` : det) : null;
  } catch (e) { return e.message; }
}

// I criteri della scheda: "Sezione n: motivo" (o "D2: motivo", col nome del criterio) per ognuno che cade.
export function criteri(ctx, fase = 'ingresso') {
  if (fase === 'cattura') return [];
  const parti = fase === 'consolida' ? [['dopo_consolida', 'Dopo consolida']] : Object.entries(SEZIONI);
  const falliti = [];
  for (const [k, nome] of parti) (ctx.prova[k] ?? []).forEach((c, i) => {
    const m = esamina(ctx, c, k === 'non_deve');
    if (m) falliti.push(`${c.nome ?? `${nome} ${i + 1}`}: ${m}`);
  });
  return falliti;
}

// G3: lo schema con scripts/verifica.mjs, nella cartella dei file (un worktree, se si legge un ramo).
function verifica(arch) {
  const dir = arch.cartella();
  if (!existsSync(join(dir, 'scripts/verifica.mjs'))) return ['G3: manca scripts/verifica.mjs'];
  const r = spawnSync(process.execPath, ['scripts/verifica.mjs', '--solo', 'schema'], { cwd: dir, encoding: 'utf8' });
  if (r.status === 0) return [];
  const e = `${r.stdout}\n${r.stderr}`.split('\n').filter((l) => l.startsWith('ERRORE')).slice(0, 3);
  return [`G3: ${e.join('; ') || `verifica.mjs esce con ${r.status}`}`];
}

// G1–G7 ("I controlli che valgono per ogni B"); quelli che non si possono decidere qui sono del giudice (G6: i 7 casi).
// Nella fase cattura (blocco 3, B18 ridotta: «G1 e lo schema del frammento») G1 sul file in ingresso/ e G3.
export function generali(ctx, salta = [], fase = 'ingresso') {
  const { prova, arch } = ctx, no = [];
  const g = (n, ok, perche) => { if (!ok) no.push(`${n}: ${perche}`); return !!ok; };
  const tutti = fase === 'cattura' ? ['G1', 'G3'] : prova.generali ?? (prova.id.startsWith('B') ? GENERALI : []);
  const voglio = (n) => tutti.includes(n) && !salta.includes(n);
  const fr = ctx.frammento ? dividi(arch.leggi(ctx.frammento)) : null;
  const le = ctx.lettura && arch.tutti.has(ctx.lettura) ? dividi(arch.leggi(ctx.lettura)) : null;
  const nati = (genere) => arch.trova(`${genere}/*.md`).filter((f) => (ctx.prima && !ctx.prima.has(f))
    || (ctx.id && [].concat(arch.fm(f)['nato-da'] ?? []).includes(ctx.id)));
  if (voglio('G1') && g('G1', fr, `manca il file ${globDi(prova.data, fase === 'cattura' ? 'ingresso' : 'frammenti')} (o non è uno solo)`)) {
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
      const c = dividi(arch.leggi(f)).corpo, q = domande(ctx, c);
      g('G6', q <= 1, `${f}: ${q} "?"`);
      const resto = chiedi ? c : c.replace(/^[\s*_]*(salvat[oa]|ci sono)[.!]?[*_]*/i, '');
      const n = nParole(resto);
      g('G6', n <= (chiedi ? 150 : 40), `${f}: ${n} parole ${chiedi ? '(con chiedi, al più 150)' : 'oltre "Salvato." (al più 40)'}`);
    }
  }
  if (voglio('G7') && g('G7', ctx.cambiati, 'base ignota')) {
    const toccati = [...ctx.cambiati].filter((f) => /^(frammenti|letture|restituzioni)\//.test(f) && f !== 'frammenti/.hash');
    g('G7', !toccati.length, `cambiati ${toccati.join(', ')}`);
  }
  return no;
}

// Il prompt del giudice: solo la prova, la preparazione con i suoi frammenti (banco §5: il campo `frammenti` della prova,
// glob o id(Bnn), più i capi dei legami dell'uscita, piano blocco 1: i frammenti che c'erano alla base e che un legame
// di un file dell'uscita nomina nel `tra` o in `a`; per R14 u19, B01, B02 e il capo vecchio del ponte) e l'uscita (i file di dati nuovi o cambiati dalla base, senza contesto/, e l'uscita testuale).
const DATI = /^(ingresso|frammenti|letture|persone|opere|citazioni|temi|raccolte|restituzioni|riserva)\/.*\.md$/;
export function promptGiudice(ctx, modello) {
  const p = ctx.prova, a = ctx.arch;
  const nuovi = ctx.prima ? a.elenco.filter((f) => !ctx.prima.has(f)) : [];
  const fs = [...new Set([ctx.frammento, ctx.lettura, ...ctx.risposte, ...nuovi, ...(ctx.cambiati ?? [])])]
    .filter((f) => f && a.tutti.has(f) && DATI.test(f)).sort();
  const blocco = (titolo, t) => `### ${titolo}\n\n\`\`\`\`\n${t.trimEnd()}\n\`\`\`\``;
  const parti = fs.map((f) => blocco(f, a.leggi(f)));
  if (ctx.uscita) parti.unshift(blocco('la risposta in chat, così come è stata data', ctx.uscita.testo));
  const uscita = parti.join('\n\n') || '(nessun file nuovo o cambiato)';
  const perId = (i) => a.elenco.filter((f) => f.startsWith('frammenti/') && basename(f, '.md') === i);
  const capi = fs.flatMap((f) => [].concat(a.fm(f)?.legami ?? []))
    .flatMap((l) => [].concat(l?.tra ?? [], l?.a ?? [])).filter((i) => typeof i === 'string' && ctx.allaBase(i));
  const dati = [...new Set([...(p.frammenti ?? []).flatMap((g) => { const v = sostituisci(ctx, g);
    return v.includes('/') ? a.trova(v) : perId(v); }), ...capi.flatMap(perId)])].filter((f) => !fs.includes(f)).sort();
  const testoPrep = p.preparazione ?? `Il ${p.data} arriva dal telefono questo messaggio:\n\n> ${p.messaggio.split('\n').join('\n> ')}`;
  const prep = [testoPrep, ...dati.map((f) => blocco(f, a.leggi(f)))].join('\n\n');
  return modello.split('<!-- prompt -->').at(-1).trimStart()
    .replace('{{PROVA}}', () => `${p.id}${p.titolo ? ` · ${p.titolo}` : ''}`)
    .replace('{{PREPARAZIONE}}', () => prep).replace('{{USCITA}}', () => uscita)
    .replace('{{DOMANDE}}', () => (p.giudice ?? []).map((d, i) => `D${i + 1}. ${d.domanda}`).join('\n'));
}

// Tre giudizi, una riga per domanda ("D1: sì — motivo"); per ogni domanda vale la maggioranza; una domanda senza
// risposta è "non so"; "non so" e una risposta "con riserve" sono contrari all'attesa. Poi la soglia della prova: senza, tutte obbligatorie.
export function maggioranza(domande, testi, soglia = null) {
  const leggi = (t) => {
    const r = {};
    for (const l of t.split('\n')) {
      const m = /^\W*D(\d+)\W*?\s*(sì|si|no|non so)(?=[\s—–\-:.,;*]|$)[\s—–\-:.,;*]*(.*)$/iu.exec(l.trim());
      // una risposta «con riserve» (sì con riserve, no con riserve) conta come esito contrario all'attesa (banco §5)
      if (m) r[m[1]] ??= { v: /^con\s+riserv/iu.test(m[3]) ? 'con riserve' : m[2].toLowerCase() === 'si' ? 'sì' : m[2].toLowerCase(), perche: m[3].trim() };
    }
    return r;
  };
  const g = testi.map(leggi), cadute = [];
  domande.forEach((d, i) => {
    const voti = g.map((x) => x[i + 1] ?? { v: 'non so', perche: 'nessuna risposta' });
    if (voti.filter((x) => x.v === d.attesa).length * 2 <= voti.length) {
      const c = voti.find((x) => x.v !== d.attesa);
      cadute.push({ n: i + 1, riga: `giudice D${i + 1}: ${c.v}${c.perche ? `, ${c.perche}` : ''}` });
    }
  });
  const obbl = soglia?.obbligatorie ?? domande.map((_, i) => i + 1), min = soglia?.min ?? 0;
  const passate = domande.length - cadute.length;
  const ok = cadute.every((c) => !obbl.includes(c.n)) && passate >= min;
  if (ok) return [];
  const righe = cadute.map((c) => c.riga);
  if (passate < min) righe.push(`giudice: ${passate} su ${domande.length}, soglia ${min}`);
  return righe;
}

// La soglia del giudice: la prima di `soglie` il cui `quando` regge (o senza `quando`); altrimenti `soglia`.
function sogliaDi(ctx) {
  for (const s of ctx.prova.soglie ?? []) if (!s.quando || !esamina(ctx, s.quando, false)) return s;
  return ctx.prova.soglia ?? null;
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

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const a = argomenti(process.argv.slice(2));
  const esci = (m) => { console.error(m); process.exit(2); };
  const str = (k) => (typeof a[k] === 'string' ? a[k] : undefined);
  if (!str('prova')) esci('uso: node banco/esegui.mjs --prova B01 [--ramo banco/zero] [--esiti FILE] [--uscita FILE] (vedi la testa del file)');
  const radice = str('radice') ?? join(QUI, '..'), prove = str('prove') ?? join(QUI, 'prove');
  const leggiProva = (id) => { try { return JSON.parse(readFileSync(join(prove, `${id}.json`), 'utf8')); } catch { return null; } };
  const prova = leggiProva(a.prova) ?? esci(`prova ${a.prova} non trovata in ${prove}`);
  const ramo = str('ramo');
  const fase = ['consolida', 'cattura'].includes(a.fase) ? a.fase : 'ingresso';
  let uscita = null;
  if (str('uscita')) { try { uscita = { nome: a.uscita, testo: readFileSync(a.uscita, 'utf8') }; } catch { esci(`uscita ${a.uscita} illeggibile`); } }
  const arch = archivio({ radice, ramo });
  const corri = () => {
    const ctx = prepara(prova, { arch, base: str('base'), altra: leggiProva, uscita, fase });
    if (a['per-giudice']) { process.stdout.write(promptGiudice(ctx, readFileSync(join(QUI, 'giudice.md'), 'utf8'))); return 0; }

    const salta = str('salta')?.split(',').map((s) => s.trim()) ?? [];
    const falliti = [...(fase !== 'consolida' ? generali(ctx, salta, fase) : []), ...criteri(ctx, fase)];
    const domande = fase === 'ingresso' ? prova.giudice ?? [] : [];
    const nota = [];
    if (fase === 'consolida') nota.push('dopo consolida');
    if (fase === 'cattura') nota.push('cattura: G1 in ingresso/ e G3');
    if (salta.length) nota.push(`saltati ${salta.join(', ')}`);
    let esito = falliti.length ? 'fallisce' : domande.length ? 'in attesa del giudice' : 'passa';
    if (!falliti.length && domande.length && str('giudizi')) {
      const testi = a.giudizi.split(',').map((f) => readFileSync(f, 'utf8'));
      if (testi.length !== 3) { arch.chiudi(); esci(`servono tre giudizi, non ${testi.length}`); }
      falliti.push(...maggioranza(domande, testi, sogliaDi(ctx)));
      esito = falliti.length ? 'fallisce' : 'passa';
      nota.push('giudice: maggioranza di 3');
    } else if (esito === 'in attesa del giudice') nota.push(`deterministici passati; ${domande.length} ${domande.length === 1 ? 'domanda' : 'domande'} al giudice`);
    else if (falliti.length && domande.length) nota.push('giudice non serve');

    const sha = (r) => r && arch.forse('rev-parse', '--short=12', r)?.trim();
    const lettore = str('lettore') ?? process.env.BANCO_LETTORE
      ?? (ctx.lettura && arch.tutti.has(ctx.lettura) ? arch.fm(ctx.lettura)['letto-da'] : null) ?? '—';
    const giudice = str('giudice') ?? process.env.BANCO_GIUDICE ?? '—';
    const partenza = sha(str('partenza')) ?? sha(ctx.base) ?? sha(ramo ?? 'HEAD') ?? 'ignoto';
    const cosa = str('cosa') ?? 'banco';
    const testata = `# Banco: ${cosa}, ${oggi()}\n\n- **Modello lettore:** ${lettore}\n- **Modello giudice:** ${giudice}\n`
      + `- **Schema:** 3\n- **Partenza:** ${partenza}${ramo ? ` (ramo \`${ramo}\`)` : ''}\n\n`;
    const etichetta = str('etichetta') ?? (fase === 'ingresso' ? prova.id : `${prova.id} ${fase === 'consolida' ? 'dopo consolida' : 'cattura'}`);
    const out = str('esiti') ?? join(radice, 'banco', 'esiti', `${oggi().replaceAll('-', '')}-${cosa}.md`);
    registra(out, testata, { prova: etichetta, esito, falliti, gravita: esito === 'fallisce' ? prova.gravita : null, nota: nota.join('; ') });
    for (const f of falliti) console.log(`FALLISCE ${etichetta} ${f}`);
    console.log(`${etichetta}: ${esito} → ${relative(process.cwd(), out) || out}`);
    return esito === 'fallisce' ? 1 : 0;
  };
  let codice = 2;
  try { codice = corri(); } finally { arch.chiudi(); }
  process.exit(codice);
}
