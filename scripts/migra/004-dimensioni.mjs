// migrazione 004: lo schema 4, le dimensioni (progetto/sito/dimensioni.md §3, §5; _schema.md).
// node scripts/migra/004-dimensioni.mjs [--radice DIR] [--prova] [--piano FILE]
// Porta **i nodi** a `schema: 4` e scrive i 58 valori sui 49 nodi della tabella qui sotto: `tipo` sulle 6 opere, `specie`
// sui 35 temi, `campo` sulle 8 persone non `vita`, sulle 6 opere e sulle 3 correnti. Letture e restituzioni non si toccano
// (restano a 3: lo schema 4 le accetta). È lo scrittore del ciclo `migra` (schema/piano.json): nel piano sarebbe un
// `aggiorna-nodo` per nodo, e `--piano FILE` lo scrive; finché `applica.mjs` rifiuta `aggiorna-nodo` (blocco 9), la
// migrazione fa da sé la stessa transazione: cartella di lavoro → file → verifica.mjs → spostamento.
// Idempotente: un valore già scritto e uguale non si riscrive; uno diverso è un rifiuto (congelato, dimensioni.md §3.3).
// --prova: tutto tranne lo spostamento (la cartella di lavoro e la verifica sì). Codice 0 ok, 1 rifiuto.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdtempSync, cpSync, rmSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { frontmatter, GENERI, valoreDimensione, DIMENSIONI } from '../verifica.mjs';
import { ordina, componi } from '../importa.mjs';
import { verificaLavoro } from '../applica.mjs';

export const SCHEMA = 4;
// I valori (dimensioni.md §5): il tipo dalle parole o dal catalogo; la specie dal vecchio percorso del link
// (/emozioni/ → stato, /domande/ → domanda, /stile/ → stile, /fonti/pensiero/ → corrente) e i /concetti/ letti uno per
// uno; il campo, uno per nodo, dal vecchio percorso e da una verifica rapida sul nome `mondo`. Le scelte: schema-4-note.md.
export const VALORI = {
  // persone (8): campo
  camus: { campo: ['filosofia'] },
  deftones: { campo: ['musica'] },
  dostoevskij: { campo: ['letteratura'] },
  'jordan-peterson': { campo: ['psicologia'] },
  'marco-aurelio': { campo: ['filosofia'] },
  radiohead: { campo: ['musica'] },
  'rust-cohle': { campo: ['cinema'] },
  soorajsaxena: { campo: ['arte'] },
  // opere (6): tipo e campo
  berserk: { tipo: 'fumetto', campo: ['letteratura'] },
  'divina-commedia': { tipo: 'libro', campo: ['letteratura'] },
  'fma-brotherhood': { tipo: 'serie', campo: ['cinema'] },
  invictus: { tipo: 'poesia', campo: ['letteratura'] },
  'pensieri-marco-aurelio': { tipo: 'libro', campo: ['filosofia'] },
  'true-detective-s1': { tipo: 'serie', campo: ['cinema'] },
  // temi (35): specie; le correnti anche il campo
  apatia: { specie: 'stato' }, caos: { specie: 'stato' }, dolore: { specie: 'stato' }, gioia: { specie: 'stato' },
  liberta: { specie: 'stato' }, 'pace-interiore': { specie: 'stato' }, rabbia: { specie: 'stato' },
  risentimento: { specie: 'stato' }, solitudine: { specie: 'stato' }, vuoto: { specie: 'stato' },
  'che-senso-ha': { specie: 'domanda' }, 'chi-sono': { specie: 'domanda' }, 'come-stare-con-gli-altri': { specie: 'domanda' },
  'come-vivere': { specie: 'domanda' }, 'cosa-c-e-oltre': { specie: 'domanda' }, 'cosa-e-reale': { specie: 'domanda' },
  'cosa-posso-conoscere': { specie: 'domanda' }, 'perche-soffro': { specie: 'domanda' },
  'incisione-xilografia': { specie: 'stile' }, patchwork: { specie: 'stile' },
  stoicismo: { specie: 'corrente', campo: ['filosofia'] },
  romanticismo: { specie: 'corrente', campo: ['filosofia'] },
  nichilismo: { specie: 'corrente', campo: ['filosofia'] },
  'guida-e-condottiero': { specie: 'simbolo' }, 'resilienza-napoleonica': { specie: 'simbolo' },
  amore: { specie: 'idea' }, assurdo: { specie: 'idea' }, 'avventura-e-scoperta': { specie: 'idea' },
  'battaglie-interiori': { specie: 'idea' }, 'bene-relativo': { specie: 'idea' }, 'dissoluzione-dell-io': { specie: 'idea' },
  'evoluzione-e-percorso': { specie: 'idea' }, 'sacrificio-anonimo': { specie: 'idea' }, 'soglia-e-mistero': { specie: 'idea' },
  verita: { specie: 'idea' },
};

const nodi = (radice) => GENERI.flatMap((g) => (existsSync(join(radice, g)) ? readdirSync(join(radice, g)) : [])
  .filter((f) => f.endsWith('.md') && !f.startsWith('.')).map((f) => ({ genere: g, slug: basename(f, '.md'), percorso: `${g}/${f}` })));

// Il piano → { errori, file: [{percorso, testo}], piano, conti }: niente scritto.
export function prepara(radice = process.cwd(), valori = VALORI) {
  const errori = [], file = [], operazioni = [], conti = { schema: 0, valori: 0, nodi: 0 };
  const visti = new Set();
  for (const n of nodi(radice)) {
    let fm;
    try { fm = frontmatter(readFileSync(join(radice, n.percorso), 'utf8')); } catch (e) { errori.push(`${n.percorso}: ${e.message}`); continue; }
    const dati = { ...fm.dati }, v = valori[n.slug] ?? {}, campi = {};
    visti.add(n.slug);
    if (Object.keys(v).length && dati['fuso-in']) { errori.push(`${n.percorso}: lapide, nessun valore (fuso in ${dati['fuso-in']})`); continue; }
    if (dati.cerchia === 'vita' && v.campo) { errori.push(`${n.percorso}: una persona della vita non ha campo`); continue; }
    for (const k of DIMENSIONI) {
      if (v[k] === undefined) continue;
      if (dati[k] === undefined) { campi[k] = v[k]; continue; }
      if (valoreDimensione(dati[k]) !== valoreDimensione(v[k]))
        errori.push(`${n.percorso}: "${k}" è già ${valoreDimensione(dati[k])}, la migrazione vorrebbe ${valoreDimensione(v[k])}: congelato`);
    }
    const sale = dati.schema !== SCHEMA;
    if (!sale && !Object.keys(campi).length) continue;
    if (sale) conti.schema++;
    if (Object.keys(campi).length) { conti.nodi++; conti.valori += Object.keys(campi).length; operazioni.push({ op: 'aggiorna-nodo', nodo: n.slug, campi }); }
    file.push({ percorso: n.percorso, testo: componi(ordina('nodo', { ...dati, schema: SCHEMA, ...campi }), fm.corpo) });
  }
  for (const s of Object.keys(valori)) if (!visti.has(s)) errori.push(`${s}: nella tabella della migrazione ma non c'è il nodo`);
  return { errori, file, conti, piano: operazioni.length ? { ciclo: 'migra', 'letto-da': 'migrazione-004', operazioni } : null };
}

export function migra({ radice = process.cwd(), prova = false, valori = VALORI } = {}) {
  const p = prepara(radice, valori);
  if (p.errori.length || !p.file.length) return { ...p, scritti: [] };
  const lavoro = mkdtempSync(join(tmpdir(), 'migra-004-'));
  try {
    for (const d of ['frammenti', 'letture', 'restituzioni', ...GENERI, 'banco/sintetici.txt'])
      if (existsSync(join(radice, d))) cpSync(join(radice, d), join(lavoro, d), { recursive: true });
    for (const f of p.file) writeFileSync(join(lavoro, f.percorso), f.testo);
    const v = verificaLavoro(radice, lavoro);
    if (v.length) return { ...p, errori: [...v, 'verifica.mjs non passa: nessun file scritto'], scritti: [] };
    if (prova) return { ...p, scritti: [] };
    const prima = [];
    try {
      for (const f of p.file) { prima.push([f.percorso, readFileSync(join(radice, f.percorso))]); copyFileSync(join(lavoro, f.percorso), join(radice, f.percorso)); }
    } catch (e) {
      for (const [q, b] of prima) writeFileSync(join(radice, q), b);
      return { ...p, errori: [`spostamento: ${e.message}`], scritti: [] };
    }
    return { ...p, scritti: p.file.map((f) => f.percorso) };
  } finally {
    rmSync(lavoro, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2), o = { radice: process.cwd(), prova: false, piano: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--radice' && argv[i + 1]) o.radice = argv[++i];
    else if (argv[i] === '--prova') o.prova = true;
    else if (argv[i] === '--piano' && argv[i + 1]) o.piano = argv[++i];
    else { console.log(`RIFIUTO argomento sconosciuto: ${argv[i]} (uso: [--radice DIR] [--prova] [--piano FILE])`); process.exit(1); }
  }
  const r = migra(o);
  if (o.piano && r.piano) writeFileSync(o.piano, `${JSON.stringify(r.piano, null, 2)}\n`);
  for (const m of r.errori) console.log(m.startsWith('ERRORE ') ? m : `RIFIUTO ${m}`);
  if (r.errori.length) process.exit(1);
  if (!r.file.length) { console.log('migrazione 004: niente da fare (già applicata)'); process.exit(0); }
  for (const f of r.scritti) console.log(`scritto ${f}`);
  console.log(`migrazione 004${o.prova ? ' (prova, niente spostato)' : ''}: ${r.file.length} nodi, ${r.conti.schema} a schema 4, ${r.conti.valori} valori su ${r.conti.nodi} nodi; verifica: ok`);
}
