// Il banco minimo (piano, blocco 1 e §4): i criteri deterministici di una prova, prima e senza giudice.
// node banco/esegui.mjs --prova B01 [--ramo banco/zero] [--uscita FILE] [--cosa smista] [--esiti DIR]
//   [--lettore MODELLO] [--giudice MODELLO] [--radice DIR] [--prove DIR]
// Codice 0 se tutti i criteri deterministici passano; le domande del giudice restano da porre (banco/giudice.md).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { oggi } from '../scripts/ora.mjs';

const QUI = dirname(fileURLToPath(import.meta.url));
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

// Una sorgente di file: il working tree, un ramo git, più l'eventuale file di risposta (`@uscita`).
export function sorgente({ radice, ramo, uscita }) {
  const git = (...a) => execFileSync('git', a, { cwd: radice, encoding: 'utf8', maxBuffer: 1 << 28 });
  let elenco;
  if (ramo) elenco = git('ls-tree', '-r', '--name-only', ramo).split('\n').filter(Boolean);
  else {
    elenco = [];
    const giu = (d) => { for (const n of readdirSync(d)) { if (SALTA.has(n)) continue; const p = join(d, n);
      if (statSync(p).isDirectory()) giu(p); else elenco.push(relative(radice, p).split(sep).join('/')); } };
    giu(radice);
  }
  const leggi = (f) => {
    if (f === '@uscita' && uscita) return readFileSync(uscita, 'utf8');
    return ramo ? git('show', `${ramo}:${f}`) : readFileSync(join(radice, f), 'utf8');
  };
  // `@uscita` è il file di risposta: quello dato con --uscita, altrimenti il percorso della prova (es. contesto/recenti.md).
  const trova = (g, predefinita) => g === '@uscita' && uscita ? ['@uscita']
    : g === '@uscita' && !predefinita ? [] : elenco.filter((f) => globRe(g === '@uscita' ? predefinita : g).test(f));
  return { leggi, trova };
}

const frontmatter = (t) => { const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(t); return m ? YAML.parse(m[1]) ?? {} : {}; };
const contiene = (v, a) => Array.isArray(a) ? a.every((x) => Array.isArray(v) && v.some((y) => contiene(y, x)))
  : a && typeof a === 'object' ? v && typeof v === 'object' && Object.entries(a).every(([k, x]) => contiene(v[k], x))
  : String(v) === String(a);
const re = (c) => c.regex !== undefined ? new RegExp(c.regex, c.flag ?? 'm') : null;
const occorrenze = (t, c) => c.regex !== undefined ? (t.match(new RegExp(c.regex, (c.flag ?? 'm') + 'g')) ?? []).length
  : c.testo !== undefined ? t.split(c.testo).length - 1 : 1;

// I controlli: restituisce l'elenco dei criteri falliti, ognuno "tipo[i]: motivo".
export function controlla(prova, src) {
  const falliti = [];
  const no = (tipo, i, c, perche) => falliti.push(`${tipo}[${i}]: ${c.motivo ?? perche}`);
  const dove = (c) => src.trova(c.file ?? c.glob ?? '@uscita', prova.uscita);
  (prova.file_attesi ?? []).forEach((g, i) => { if (!src.trova(g, prova.uscita).length) no('file_attesi', i, {}, `manca ${g}`); });
  (prova.ricerche_esatte ?? []).forEach((c, i) => {
    const fs = dove(c);
    if (!fs.length) return no('ricerche_esatte', i, {}, `nessun file per ${c.file ?? c.glob}`);
    if (!fs.some((f) => re(c) ? re(c).test(src.leggi(f)) : src.leggi(f).includes(c.testo))) no('ricerche_esatte', i, c, `non trovato «${c.testo ?? c.regex}»`);
  });
  (prova.frontmatter ?? []).forEach((c, i) => {
    const fs = dove(c);
    if (!fs.length) return no('frontmatter', i, {}, `nessun file per ${c.file ?? c.glob}`);
    const ok = fs.some((f) => { const v = frontmatter(src.leggi(f))[c.campo];
      if ('assente' in c) return v === undefined;
      return 'vale' in c ? contiene(v, c.vale) && contiene(c.vale, v) : contiene(v, c.contiene); });
    if (!ok) no('frontmatter', i, c, `${c.campo} non conforme`);
  });
  (prova.divieti ?? []).forEach((c, i) => {
    const f = dove(c).find((f) => re(c) ? re(c).test(src.leggi(f)) : src.leggi(f).includes(c.testo));
    if (f) no('divieti', i, c, `«${c.testo ?? c.regex}» in ${f}`);
  });
  (prova.conteggi ?? []).forEach((c, i) => {
    const n = dove(c).reduce((s, f) => s + occorrenze(src.leggi(f), c), 0);
    if (n < (c.min ?? 0) || n > (c.max ?? Infinity)) no('conteggi', i, c, `${n} fuori da [${c.min ?? 0}, ${c.max ?? '∞'}]`);
  });
  return falliti;
}

// Una riga nella tabella di banco/esiti/AAAAMMGG-COSA.md; la testata la scrive il primo.
export function registra({ dir, cosa, prova, falliti, lettore, giudice, sha }) {
  const file = join(dir, `${oggi().replaceAll('-', '')}-${cosa}.md`);
  if (!existsSync(file)) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(file, `# Banco: ${cosa}, ${oggi()}\n\n- **Modello lettore:** ${lettore}\n- **Giudice:** ${giudice}\n` +
      `- **Modello di dati:** schema 3\n- **Partenza:** ${sha}\n\n| prova | esito | criteri falliti | gravità | nota |\n|---|---|---|---|---|\n`);
  }
  const esc = (s) => s.replaceAll('|', '\\|');
  const nd = prova.giudice?.length ?? 0;
  const riga = falliti.length
    ? `| ${prova.id} | fallisce | ${esc(falliti.join('; '))} | ${prova.gravita} | giudice non serve |`
    : `| ${prova.id} | passa | — | — | ${nd ? `deterministici; giudice da fare (${nd} domande)` : ''} |`;
  writeFileSync(file, readFileSync(file, 'utf8') + riga + '\n');
  return file;
}

function argomenti(v) {
  const a = {};
  for (let i = 0; i < v.length; i++) if (v[i].startsWith('--')) a[v[i].slice(2)] = v[i + 1]?.startsWith('--') || v[i + 1] === undefined ? true : v[++i];
  return a;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const a = argomenti(process.argv.slice(2));
  if (!a.prova) { console.error('uso: node banco/esegui.mjs --prova B01 [--ramo banco/zero] [--uscita FILE]'); process.exit(2); }
  const radice = a.radice ?? join(QUI, '..');
  const prova = JSON.parse(readFileSync(join(a.prove ?? join(QUI, 'prove'), `${a.prova}.json`), 'utf8'));
  const src = sorgente({ radice, ramo: a.ramo, uscita: a.uscita });
  const falliti = controlla(prova, src);
  let sha = 'ignoto';
  try { sha = execFileSync('git', ['rev-parse', '--short', a.ramo ?? 'HEAD'], { cwd: radice, encoding: 'utf8' }).trim(); } catch {}
  const file = registra({ dir: a.esiti ?? join(QUI, 'esiti'), cosa: a.cosa ?? 'banco', prova, falliti,
    lettore: a.lettore ?? process.env.BANCO_LETTORE ?? 'da indicare', giudice: a.giudice ?? process.env.BANCO_GIUDICE ?? 'da indicare', sha });
  for (const f of falliti) console.log(`FALLISCE ${prova.id} ${f}`);
  console.log(`${prova.id}: ${falliti.length ? 'fallisce' : 'passa'} → ${relative(process.cwd(), file)}`);
  process.exit(falliti.length ? 1 : 0);
}
