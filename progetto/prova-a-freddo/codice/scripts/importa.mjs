// importa.mjs: il punto zero, l'Atlante importato una volta sola (modello §14, piano blocco 2).
// node scripts/importa.mjs --da /tmp/atlante [--prova] [--radice DIR]
// Legge <radice>/importa/{fonte,tabella,citazioni}.json (se mancano tabella e citazioni, unisce importa/parti/*.json),
// controlla lo SHA dell'Atlante, valida tutto con lo schema e i riferimenti, poi scrive nell'ordine
// frammenti → nodi → letture → restituzioni, aggiorna frammenti/.hash e lancia la verifica.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Document } from 'yaml';
import { validatore, GENERI } from './schema.mjs';
import { aggiornaHash, verifica } from './verifica.mjs';
import { slug } from './slug.mjs';

// Chi ha letto: la tabella l'ha preparata Claude; `prompt` sono le prime 7 cifre dello SHA dell'Atlante letto.
export const LETTORE = 'claude-opus-5-5';
const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/;
const CITAZIONI = 'r-20261007-0000-eredita-citazioni';
const ORDINE = {
  frammento: ['registrato', 'canale', 'voce', 'forma'],
  lettura: ['schema', 'versione', 'letto-da', 'prompt', 'intento', 'reazione', 'legami', 'parole', 'altrui', 'vissuto', 'nota', 'fonte'],
  nodo: ['schema', 'nome', 'alias', 'cerchia', 'in', 'autore', 'anno', 'attribuita-a', 'citata-da', 'originale', 'traduzione',
    'riferimento', 'esito', 'scopo', 'fuso-in', 'nato-da', 'link'],
  restituzione: ['schema', 'forma', 'letto-da', 'registrato', 'aggancio', 'voci', 'legami', 'fonte'],
};
const FLOW = ['legami', 'voci', 'reazione', 'aggancio', 'intento', 'alias', 'nato-da', 'parole', 'attribuita-a', 'citata-da'];

const leggiJson = (f) => JSON.parse(readFileSync(f, 'utf8'));
const vuoto = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
const data = (id) => `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`; // AAAAMMGG → AAAA-MM-GG
const cartella = (id) => `${id.slice(0, 4)}/${id.slice(4, 6)}`;

// I campi nell'ordine fisso del tipo, senza i vuoti: lo stesso ingresso dà sempre gli stessi byte.
function ordina(tipo, o) {
  const fuori = {};
  for (const k of ORDINE[tipo]) if (!vuoto(o[k])) fuori[k] = o[k];
  return fuori;
}

export function componi(dati, corpo = '') {
  const doc = new Document(dati);
  for (const k of FLOW) {
    const n = doc.get(k, true);
    if (!n?.items) continue;
    if (['legami', 'voci', 'reazione'].includes(k)) n.items.forEach((i) => { i.flow = true; });
    else n.flow = true;
  }
  const yaml = doc.toString({ lineWidth: 0, flowCollectionPadding: false });
  const c = corpo.replace(/\s+$/, '');
  return `---\n${yaml}---\n${c ? c + '\n' : ''}`;
}

// La tabella: importa/tabella.json, oppure l'unione delle parti (frammenti, nodi, restituzioni).
export function caricaIngressi(radice) {
  const dir = join(radice, 'importa'), parti = join(dir, 'parti');
  const parte = (n) => (existsSync(join(parti, `${n}.json`)) ? leggiJson(join(parti, `${n}.json`)) : []);
  const tabella = existsSync(join(dir, 'tabella.json')) ? leggiJson(join(dir, 'tabella.json'))
    : { frammenti: parte('frammenti'), nodi: parte('nodi'), restituzioni: parte('restituzioni') };
  const citazioni = existsSync(join(dir, 'citazioni.json')) ? leggiJson(join(dir, 'citazioni.json'))
    : (existsSync(parti) ? readdirSync(parti).filter((f) => /^citazioni-.*\.json$/.test(f)).sort()
      .flatMap((f) => leggiJson(join(parti, f))) : []);
  return { fonte: leggiJson(join(dir, 'fonte.json')), tabella, citazioni };
}

// "file:a-b" (stringa, elenco con virgole o array) → una `fonte` dello schema: un file solo, righe unite, @commit.
function fonte(valore, sha, atlante, err, avvisi, chi) {
  const voci = [valore].flat().flatMap((v) => String(v).split(',')).map((v) => v.trim()).filter(Boolean);
  const perFile = new Map();
  let file = null;
  for (const v of voci) {
    const m = /^(.+?):(\d+(?:-\d+)?)$/.exec(v) ?? /^(\d+(?:-\d+)?)$/.exec(v);
    if (!m) { err(`${chi}: fonte illeggibile "${v}"`); continue; }
    if (m.length === 3) file = m[1];
    if (!file) { err(`${chi}: fonte senza file "${v}"`); continue; }
    if (!perFile.has(file)) perFile.set(file, []);
    perFile.get(file).push(m.length === 3 ? m[2] : m[1]);
  }
  for (const [f, righe] of perFile) {
    if (!atlante) continue;
    const p = join(atlante, f);
    if (!existsSync(p)) { err(`${chi}: fonte ${f} assente nell'Atlante`); continue; }
    const n = readFileSync(p, 'utf8').split('\n').length;
    for (const r of righe) if (Math.max(...r.split('-').map(Number)) > n) err(`${chi}: fonte ${f}:${r} oltre la fine (${n} righe)`);
  }
  const [primo, ...altri] = perFile.keys();
  if (!primo) return undefined;
  if (altri.length) avvisi.push(`${chi}: fonte ridotta al file primario ${primo} (fuori: ${altri.join(', ')})`);
  return `${primo}:${perFile.get(primo).join(', ')}@${sha.slice(0, 7)}`;
}

// Riempie le voci della restituzione delle citazioni da citazioni.json: per esito e riferimento vince il protocollo
// (citazioni.json) sulla tabella; anche per l'estratto, salvo quando la citazione supera i 200 caratteri: allora resta
// il taglio della tabella, che deve essere fatto di pezzi della citazione separati da […]. Il corpo si ricompone.
function riempiCitazioni(r, citazioni, err, avvisi) {
  const usate = new Set(), spazi = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();
  const voci = (r.voci ?? []).map(({ entita, ...v }) => {
    // la voce si riconosce dall'`entita` esplicita, dal testo (estratto = citazione) o dallo slug del rif (`~Kant` → kant)
    const c = (entita && citazioni.find((x) => x.entita === entita))
      ?? citazioni.find((x) => v.estratto && spazi(x.citazione) === spazi(v.estratto))
      ?? citazioni.find((x) => x.entita === slug(String(v.rif).replace(/^~/, '')));
    if (!c) { err(`${r.id}#${v.n}: nessuna citazione per ${v.rif} in citazioni.json`); return v; }
    usate.add(c.entita);
    for (const [k, ck] of [['esito', 'esito'], ['riferimento', 'riferimento']]) {
      if (v[k] && spazi(v[k]) !== spazi(c[ck])) avvisi.push(`${r.id}#${v.n}: ${k} della tabella diverso da citazioni.json (vince citazioni.json)`);
    }
    let estratto = c.citazione ?? v.estratto;
    if (spazi(estratto).length > 200) {
      const pezzi = spazi(v.estratto).split(/\s*\[…\]\s*/).map((t) => t.replace(/^[,:;. ]+|[,:; ]+$/g, '')).filter(Boolean);
      let da = 0;
      const dentro = v.estratto && pezzi.every((t) => { const i = spazi(c.citazione).indexOf(t, da); da = i + t.length; return i >= 0; });
      if (!dentro) err(`${r.id}#${v.n}: citazione oltre 200 caratteri e l'estratto della tabella non ne è un taglio`);
      estratto = v.estratto;
    } else if (v.estratto && spazi(v.estratto) !== spazi(estratto)) avvisi.push(`${r.id}#${v.n}: estratto della tabella diverso da citazioni.json (vince citazioni.json)`);
    return { ...v, estratto, esito: c.esito ?? v.esito, riferimento: c.riferimento ?? v.riferimento };
  });
  for (const c of citazioni) if (!usate.has(c.entita)) err(`${r.id}: la citazione di ${c.entita} non ha una voce`);
  const testo = voci.map((v) => `${v.n}. ${v.estratto}\n— ${v.riferimento}`).join('\n\n');
  if (r.testo && spazi(r.testo) !== spazi(testo)) avvisi.push(`${r.id}: corpo ricomposto da citazioni.json`);
  return { ...r, voci, testo };
}

// Dalla tabella ai file: { percorso, tipo, dati, corpo } nell'ordine di scrittura, più errori e avvisi.
export function prepara({ fonte: f, tabella, citazioni }, atlante) {
  const errori = [], avvisi = [], err = (m) => errori.push(m), sha = f.sha;
  const frammenti = tabella.frammenti ?? [], nodi = tabella.nodi ?? [], restituzioni = tabella.restituzioni ?? [];
  const ids = { frammento: new Set(), nodo: new Set(), restituzione: new Set() };
  const unico = (tipo, id) => { if (ids[tipo].has(id)) err(`${id}: ${tipo} doppio nella tabella`); ids[tipo].add(id); };
  frammenti.forEach((x) => unico('frammento', x.id));
  nodi.forEach((x) => unico('nodo', x.slug));
  restituzioni.forEach((x) => unico('restituzione', x.id));
  const file = { frammento: [], nodo: [], lettura: [], restituzione: [] };

  for (const x of frammenti) {
    if (!ID_F.test(x.id)) err(`${x.id}: id di frammento non valido`);
    else if (x.registrato !== data(x.id)) err(`${x.id}: registrato ${x.registrato} diverso dalla data dell'id`);
    file.frammento.push({ percorso: `frammenti/${cartella(x.id)}/${x.id}.md`, tipo: 'frammento',
      dati: ordina('frammento', { ...x, canale: 'importato' }), corpo: x.testo ?? '' });
    const l = x.lettura ?? {};
    if (vuoto(x.testo)) err(`${x.id}: testo vuoto`);
    const serve = x['serve-a'] ? [{ p: 'serve-a', a: x['serve-a'], voce: x.voce, perche: 'frase per i tatuaggi nell\'Atlante (R8)' }] : [];
    const dati = ordina('lettura', {
      ...l, schema: 3, versione: 1, 'letto-da': LETTORE, prompt: sha.slice(0, 7), intento: l.intento ?? ['salva'],
      legami: [...(l.legami ?? []), ...serve], altrui: x.altrui, vissuto: x.vissuto, nota: x.nota,
      fonte: fonte(l.fonte ?? x.fonte?.[0], sha, atlante, err, avvisi, x.id),
    });
    dati.legami ??= [];
    // corpo della lettura: il seguito della nota (campo `corpo` della tabella), poi la nota della lettura
    const corpo = [l.corpo, l.nota].filter((t) => !vuoto(t)).join('\n\n');
    file.lettura.push({ percorso: `letture/${cartella(x.id)}/${x.id}.md`, tipo: 'lettura', dati, corpo });
  }

  for (const x of nodi) {
    if (!GENERI.includes(x.genere)) { err(`${x.slug}: genere sconosciuto ${x.genere}`); continue; }
    const dati = ordina('nodo', { ...x, schema: 3, link: [x.link ?? []].flat() });
    file.nodo.push({ percorso: `${x.genere}/${x.slug}.md`, tipo: 'nodo', genere: x.genere, dati, corpo: x.corpo ?? '' });
  }

  for (const x0 of restituzioni) {
    const x = x0.id === CITAZIONI ? riempiCitazioni(x0, citazioni, err, avvisi) : x0;
    const id = x.id.slice(2);
    if (!ID_R.test(x.id)) { err(`${x.id}: id di restituzione non valido`); continue; }
    if (x.data !== data(id)) err(`${x.id}: data ${x.data} diversa dalla data dell'id`);
    const serve = x['serve-a'] ? [{ p: 'serve-a', a: x['serve-a'], voce: 'proposta', perche: 'idea per un tatuaggio nell\'Atlante (R8)' }] : [];
    const dati = ordina('restituzione', {
      ...x, schema: 3, forma: x.forma ?? 'eredita', 'letto-da': LETTORE, registrato: x.data,
      legami: [...(x.legami ?? []), ...serve], fonte: fonte(x.fonte, sha, atlante, err, avvisi, x.id),
    });
    dati.voci ??= [];
    file.restituzione.push({ percorso: `restituzioni/${cartella(id)}/${x.id}.md`, tipo: 'restituzione', dati, corpo: x.testo ?? '' });
  }

  // Schema, poi riferimenti: nessuno slug inventato, ogni assente è un errore.
  const tutti = [...file.frammento, ...file.nodo, ...file.lettura, ...file.restituzione];
  for (const t of tutti) {
    const v = validatore(t.tipo), o = t.genere ? { ...t.dati, _genere: t.genere } : t.dati;
    if (!v(o)) for (const e of v.errors) err(`${t.percorso}: schema ${e.instancePath || '/'} ${e.message}`);
    for (const r of riferimenti(t.dati)) {
      if (r.startsWith('~')) continue;
      const i = r.replace(/#\d+$/, ''), dove = ID_F.test(i) ? 'frammento' : ID_R.test(i) ? 'restituzione' : 'nodo';
      if (!ids[dove].has(i)) err(`${t.percorso}: riferimento a ${dove} assente: ${r}`);
    }
  }
  return { file, errori, avvisi };
}

function riferimenti(d) {
  const r = [], add = (v) => [v].flat().forEach((s) => typeof s === 'string' && r.push(s));
  ['nato-da', 'fuso-in', 'in', 'autore', 'attribuita-a', 'citata-da'].forEach((k) => add(d[k] ?? []));
  (d.legami ?? []).forEach((l) => { add(l.a ?? []); add(l.tra ?? []); add(l.nodo ?? []); });
  (d.voci ?? []).forEach((v) => add(v.rif ?? []));
  add(d.aggancio?.a ?? []);
  return r;
}

// Scrive nell'ordine; un file già presente e diverso non si tocca (i frammenti e le restituzioni sono immutabili).
export function scrivi(radice, file) {
  const errori = [], scritti = [];
  const testi = Object.values(file).flat().map((t) => ({ ...t, testo: componi(t.dati, t.corpo) }));
  for (const t of testi) {
    const p = join(radice, t.percorso);
    if (existsSync(p) && readFileSync(p, 'utf8') !== t.testo) errori.push(`${t.percorso}: esiste già ed è diverso`);
  }
  if (errori.length) return { errori, scritti };
  for (const tipo of ['frammento', 'nodo', 'lettura', 'restituzione']) {
    for (const t of testi.filter((x) => x.tipo === tipo)) {
      const p = join(radice, t.percorso);
      if (existsSync(p)) continue;
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, t.testo);
      scritti.push(t.percorso);
    }
    if (tipo === 'frammento') aggiornaHash(radice);
  }
  return { errori, scritti };
}

export function conti(file) {
  const c = { frammenti: file.frammento.length, letture: file.lettura.length, restituzioni: file.restituzione.length };
  for (const g of GENERI) c[g] = file.nodo.filter((n) => n.genere === g).length;
  c.nodi = file.nodo.length;
  return c;
}

function argomenti(argv) {
  const a = { radice: fileURLToPath(new URL('..', import.meta.url)), prova: false, da: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--da') a.da = argv[++i];
    else if (argv[i] === '--radice') a.radice = argv[++i];
    else if (argv[i] === '--prova') a.prova = true;
    else throw new Error(`argomento sconosciuto: ${argv[i]}`);
  }
  if (!a.da) throw new Error('manca --da <cartella dell\'Atlante>');
  return a;
}

export function importa({ da, radice, prova }) {
  const ingressi = caricaIngressi(radice);
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: da, encoding: 'utf8' }).trim();
  if (head !== ingressi.fonte.sha) return { errori: [`Atlante a ${head}, atteso ${ingressi.fonte.sha} (importa/fonte.json)`], avvisi: [] };
  const { file, errori, avvisi } = prepara(ingressi, da);
  const esito = { conti: conti(file), errori, avvisi, scritti: [] };
  if (prova || errori.length) return esito;
  const s = scrivi(radice, file);
  return { ...esito, errori: s.errori, scritti: s.scritti, verifica: s.errori.length ? [] : verifica(radice) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const a = argomenti(process.argv.slice(2));
    const e = importa(a);
    if (e.conti) console.log(`conti: ${Object.entries(e.conti).map(([k, v]) => `${k} ${v}`).join(', ')}`);
    for (const m of e.avvisi) console.log(`AVVISO ${m}`);
    for (const m of e.errori) console.log(`ERRORE ${m}`);
    if (!a.prova && !e.errori.length) {
      console.log(`scritti: ${e.scritti.length} file`);
      for (const m of e.verifica) console.log(m);
      if (!e.verifica.length) console.log('verifica: ok');
    }
    process.exit(e.errori.length || e.verifica?.length ? 1 : 0);
  } catch (err) {
    console.log(`ERRORE importa: ${err.message}`);
    process.exit(1);
  }
}
