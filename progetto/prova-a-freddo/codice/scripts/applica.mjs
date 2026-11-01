// applica.mjs: il piano → i file (modello §2.2, §3.1-3.6, §8.2; prompt/formato-piano.md, che vince sul piano).
// node scripts/applica.mjs PIANO.json [--radice DIR] → 0 scritto; 1 rifiutato (un motivo per riga, nessun file scritto).
// Non lancia la verifica: la lancia chi chiama. Non fatto: titolo dei link da oEmbed (blocco 5, con curl: per ora solo l'url);
// aggiorna-nodo, riserva e lapide (operazioni di "consolida", blocco 8): rifiutate con il motivo.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { validaPiano, validatore } from './schema.mjs';
import { aggiornaHash } from './verifica.mjs';
import { slug, chiave } from './slug.mjs';
import { iso } from './ora.mjs';
import { carica, componi, cartella, ID_F, ID_R } from './archivio.mjs';

// `prompt`: le prime 7 cifre dello SHA-1 del blob git di prompt/<ciclo>.md (lo stesso di `git hash-object`).
export function hashPrompt(radice, ciclo) {
  const b = readFileSync(join(radice, 'prompt', `${ciclo}.md`));
  return createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex').slice(0, 7);
}

// Link puliti: `si` via, `t` e il resto tenuti, http → https, pin Pinterest normalizzato.
export function pulisciLink(u) {
  const url = new URL(String(u).replace(/^http:/, 'https:'));
  const pin = /(^|\.)pinterest\.[a-z.]+$/.test(url.hostname) && /^\/pin\/([^/]+)/.exec(url.pathname);
  if (pin) return `https://www.pinterest.com/pin/${pin[1]}/`;
  url.searchParams.delete('si');
  return url.toString();
}
export const linkDelTesto = (t) => [...new Set((String(t).match(/https?:\/\/[^\s<>"«»]+/g) ?? [])
  .map((u) => pulisciLink(u.replace(/[.,;:!?)\]]+$/, ''))))];

// Le voci si numerano nell'ordine del testo: "1." … "k." devono comparire, in quest'ordine, uno per voce.
function controllaNumeri(testo, k) {
  let da = 0;
  for (let n = 1; n <= k; n++) {
    const m = new RegExp(`(^|\\s|\\*)${n}\\.(?=\\s)`, 'g'); m.lastIndex = da;
    const t = m.exec(testo);
    if (!t) return `nel testo manca "${n}." (dopo ${n - 1 || 'l\'inizio'}): ${k} voci, una per numero`;
    da = t.index + t[0].length;
  }
  return new RegExp(`(^|\\s)${k + 1}\\.(?=\\s)`).test(testo.slice(da)) ? `nel testo c'è "${k + 1}." ma le voci sono ${k}` : null;
}

export function prepara(piano, radice) {
  const errori = [], err = (m) => errori.push(m), avvisi = [];
  if (!validaPiano(piano)) return { errori: validaPiano.errors.map((e) => `piano${e.instancePath}: ${e.message}`), file: [] };
  const a = carica(radice), ops = piano.operazioni, file = [], ciclo = piano.ciclo;
  const prompt = hashPrompt(radice, ciclo), registrato = iso(), lettoDa = piano['letto-da'];
  const quando = registrato.slice(0, 16).replace(/[-:]/g, '').replace('T', '-'); // AAAAMMGG-HHMM

  // 1. @Nome → slug: nessuno slug già presente, nessun doppione nel piano.
  const nuovi = new Map(), creati = new Map();
  for (const o of ops.filter((o) => o.op === 'crea-nodo')) {
    const base = o.genere === 'citazioni' ? slug(o.nome).split('-').slice(0, 6).join('-') : slug(o.nome);
    if (a.nodi.has(base)) err(`crea-nodo "${o.nome}": lo slug ${base} esiste già (${a.nodi.get(base).genere}): usa quello`);
    else if (creati.has(base)) err(`crea-nodo "${o.nome}": slug ${base} doppio nel piano`);
    nuovi.set(o.nome, base); nuovi.set(chiave(o.nome), base); creati.set(base, o);
  }
  const sostituisci = (v) => typeof v === 'string' && v.startsWith('@')
    ? (nuovi.get(v.slice(1)) ?? nuovi.get(chiave(v.slice(1))) ?? (err(`${v}: nessun crea-nodo con questo nome nel piano`), v))
    : Array.isArray(v) ? v.map(sostituisci) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, sostituisci(x)])) : v;
  const risolte = ops.map(sostituisci);

  // 2. Restituzioni: id dall'ora, -2, -3 se collide; una sola `risposta` per `per` (§8.2).
  const restituzioni = new Map(), letture = risolte.filter((o) => o.op === 'lettura');
  for (const o of risolte.filter((o) => o.op === 'restituzione')) {
    let id = `r-${quando}-${o.forma}`;
    for (let i = 2; a.restituzioni.has(id) || restituzioni.has(id); i++) id = `r-${quando}-${o.forma}-${i}`;
    if (o.forma === 'risposta') {
      const gia = [...a.restituzioni.values()].find((r) => r.dati.forma === 'risposta' && r.dati.per === o.per);
      if (gia) err(`restituzione per ${o.per}: c'è già la risposta ${gia.id}`);
    }
    const prob = controllaNumeri(o.testo, o.voci.length);
    if (prob) err(`restituzione ${o.forma}: ${prob}`);
    for (const l of o.legami ?? []) if (l.da && l.da > o.voci.length) err(`restituzione ${o.forma}: legame con da: ${l.da} oltre le voci`);
    const voci = o.voci.map((v, i) => ({ n: i + 1, ...v }));
    restituzioni.set(id, { o, dati: { schema: 3, forma: o.forma, 'letto-da': lettoDa, registrato, per: o.per, copre: o.copre,
      aggancio: o.aggancio, voci, legami: o.legami } });
  }

  // 3. Nodi nuovi (nato-da: di default il frammento letto) e alias.
  const nodi = new Map();
  for (const o of risolte.filter((o) => o.op === 'crea-nodo')) {
    const { op, genere, corpo = '', ...campi } = o, s = nuovi.get(o.nome);
    if (ciclo === 'smista' && genere === 'temi') err(`crea-nodo "${o.nome}": "smista" non crea temi (prompt/smista.md, Limiti)`);
    const nato = campi['nato-da'] ?? (letture[0] ? [letture[0].frammento] : null);
    if (!nato) err(`crea-nodo "${o.nome}": manca nato-da e il piano non ha letture`);
    if (campi.link) campi.link = campi.link.map(pulisciLink);
    nodi.set(s, { genere, dati: { schema: 3, ...campi, 'nato-da': nato ?? [] }, corpo, nuovo: true });
  }
  for (const o of risolte.filter((o) => o.op === 'alias')) {
    const n = nodi.get(o.nodo) ?? (a.nodi.has(o.nodo) && { ...a.nodi.get(o.nodo), dati: { ...a.nodi.get(o.nodo).dati } });
    if (!n) { err(`alias: il nodo ${o.nodo} non esiste`); continue; }
    if (n.dati['fuso-in']) { err(`alias: ${o.nodo} è una lapide (fuso in ${n.dati['fuso-in']})`); continue; }
    const note = new Set([n.dati.nome, ...(n.dati.alias ?? [])].map(chiave));
    n.dati.alias = [...(n.dati.alias ?? []), ...[o.alias].flat().filter((x) => !note.has(chiave(x)) && note.add(chiave(x)))];
    nodi.set(o.nodo, n);
  }
  for (const o of risolte.filter((o) => ['aggiorna-nodo', 'riserva', 'lapide'].includes(o.op)))
    err(`${o.op}: operazione non ancora implementata (blocco 8, "consolida")`);

  // 4. Letture: il frammento c'è, reazione esatta, versione calcolata, link dal testo, risposta dalla restituzione.
  for (const o of letture) {
    const f = a.frammenti.get(o.frammento), prima = a.letture.get(o.frammento);
    if (!f) { err(`lettura ${o.frammento}: frammento assente in frammenti/`); continue; }
    if (prima && ciclo !== 'consolida') err(`lettura ${o.frammento}: c'è già (versione ${prima.dati.versione}); solo "consolida" scrive v ≥ 2`);
    for (const r of o.reazione ?? []) if (!f.corpo.includes(r.parole)) err(`lettura ${o.frammento}: reazione "${r.parole}" non è nel frammento`);
    const { op, frammento, ...campi } = o;
    const risposta = campi.risposta ?? [...restituzioni].find(([, r]) => r.o.per === frammento || r.o.copre?.includes(frammento))?.[0];
    const link = linkDelTesto(f.corpo).map((url) => ({ url }));
    if (link.length) avvisi.push(`lettura ${frammento}: ${link.length} link senza titolo (oEmbed non ancora fatto)`);
    file.push({ p: `letture/${cartella(frammento)}/${frammento}.md`, tipo: 'lettura', dati: { schema: 3,
      versione: prima ? prima.dati.versione + 1 : 1, 'letto-da': lettoDa, prompt, ...campi, link, risposta }, corpo: prima?.corpo ?? '' });
  }
  for (const [s, n] of nodi) file.push({ p: `${n.genere}/${s}.md`, tipo: 'nodo', genere: n.genere, dati: n.dati, corpo: n.corpo });
  for (const [id, r] of restituzioni) file.push({ p: `restituzioni/${cartella(id.slice(2))}/${id}.md`, tipo: 'restituzione', dati: r.dati, corpo: r.o.testo, nuovo: true });

  // 5. Schema e riferimenti di ogni file prodotto.
  const esiste = (r) => {
    const i = r.replace(/#\d+$/, '');
    return r.startsWith('~') || (ID_F.test(i) ? a.frammenti.has(i) : ID_R.test(i) ? a.restituzioni.has(i) || restituzioni.has(i) : a.nodi.has(i) || nodi.has(i));
  };
  for (const t of file) {
    const v = validatore(t.tipo), o = t.genere ? { ...t.dati, _genere: t.genere } : t.dati;
    if (!v(o)) for (const e of v.errors) err(`${t.p}: schema ${e.instancePath || '/'} ${e.message}`);
    const d = t.dati, rif = [d['nato-da'], d.in, d.autore, d['attribuita-a'], d['citata-da'], d.per, d.copre, d.aggancio?.a,
      ID_R.test(d.risposta ?? '') && d.risposta, (d.voci ?? []).map((x) => x.rif),
      (d.legami ?? []).map((l) => [l.a, l.tra, l.nodo, l.valore && l.campo ? l.valore : null])].flat(3);
    for (const r of rif) if (typeof r === 'string' && !esiste(r)) err(`${t.p}: riferimento inesistente ${r} (mai uno slug inventato)`);
  }
  return { errori, avvisi, file };
}

export function applica(piano, radice) {
  const { errori, avvisi = [], file } = prepara(piano, radice);
  if (errori.length) return { errori, avvisi, scritti: [] };
  for (const t of file) {
    const p = join(radice, t.p);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, componi(t.tipo, t.dati, t.corpo));
  }
  if (existsSync(join(radice, 'frammenti'))) aggiornaHash(radice);
  return { errori, avvisi, scritti: file.map((t) => t.p) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const argv = process.argv.slice(2), i = argv.indexOf('--radice');
    const radice = i >= 0 ? argv.splice(i, 2)[1] : fileURLToPath(new URL('..', import.meta.url));
    if (argv.length !== 1) throw new Error('uso: node scripts/applica.mjs PIANO.json [--radice DIR]');
    const e = applica(JSON.parse(readFileSync(argv[0], 'utf8')), radice);
    for (const m of e.avvisi) console.log(`AVVISO ${m}`);
    for (const m of e.errori) console.log(`RIFIUTO ${m}`);
    for (const p of e.scritti) console.log(`scritto ${p}`);
    process.exit(e.errori.length ? 1 : 0);
  } catch (err) {
    console.log(`RIFIUTO applica: ${err.message}`);
    process.exit(1);
  }
}
