// applica.mjs: il piano → i file (modello §2.2, §2.3, §3.1, §3.5; prompt/formato-piano.md; piano blocchi 4 e 5).
// node scripts/applica.mjs PIANO.json [--radice DIR] → 0 scritto e verificato; 1 rifiutato ("RIFIUTO motivo", uno per riga).
// Transazionale: convalida il piano contro schema/piano.json, prepara tutti i file, li scrive solo se non c'è nessun motivo
// di rifiuto, poi lancia verifica.mjs; se la verifica non passa, toglie ciò che ha scritto e non resta niente.
// Blocco 4: `restituzione` (id dall'ora, -2 se collide; voci numerate nell'ordine del testo). Blocco 5: `crea-nodo` (slug
// da slug.mjs, unico in tutto il repository, §3.6; @Nome → slug), `alias`, `lettura` v1 (`prompt` = hashPrompt, `risposta`
// dalla restituzione del piano, link puliti con il titolo dall'oEmbed di Spotify e YouTube via curl). "AVVISO …" quando
// l'oEmbed non risponde: il link resta senza titolo e il piano non si rifiuta. aggiorna-nodo, lapide, riserva: blocco 8.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, rmdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, dirname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { verifica, frontmatter, GENERI } from './verifica.mjs';
import { ordina, componi } from './importa.mjs';
import { slug, chiave } from './slug.mjs';
import { iso } from './ora.mjs';

const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/;
const leggiJson = (n) => JSON.parse(readFileSync(new URL(`../schema/${n}`, import.meta.url), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strictTypes: false }).addSchema(leggiJson('frontmatter.json')).addSchema(leggiJson('piano.json'));
const validaPiano = ajv.getSchema('memo/piano-3');
const validaFile = (tipo) => ajv.getSchema(`memo/schema-3#/$defs/${tipo}`);
const cartella = (id) => `${id.slice(0, 4)}/${id.slice(4, 6)}`;

// `prompt` (modello §2.2): le prime 7 cifre dello SHA-1 del blob git di CLAUDE.md + prompt/<ciclo>.md +
// prompt/formato-piano.md messi in fila, cioè `cat CLAUDE.md prompt/<ciclo>.md prompt/formato-piano.md | git hash-object --stdin`.
// Lo scrive la lettura (blocco 5); la restituzione non ha il campo (§3.5, §3.7).
export function hashPrompt(radice, ciclo) {
  const b = Buffer.concat(['CLAUDE.md', `prompt/${ciclo}.md`, 'prompt/formato-piano.md'].map((f) => readFileSync(join(radice, f))));
  return createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex').slice(0, 7);
}

// I numeri delle voci nel corpo (§3.5): `1.` a inizio riga oppure `[1]` dentro la prosa (non `2[127]`, non `[1](url)`),
// nell'ordine in cui compaiono.
export function numeriDelTesto(testo) {
  const re = /^[ \t]*(\d+)\.(?=\s)|(?<![\w\]])\[(\d+)\](?!\()/gm;
  return [...String(testo).matchAll(re)].map((m) => Number(m[1] ?? m[2]));
}

// Le voci 1…k compaiono tutte, la prima volta in ordine, e nessun numero oltre k (R38, R61); ripetere un numero già visto va.
export function controllaNumeri(testo, k) {
  const fuori = [], visti = [];
  for (const n of numeriDelTesto(testo)) {
    if (n < 1 || n > k) fuori.push(`nel testo c'è il numero ${n} ma le voci sono ${k}`);
    else if (!visti.includes(n)) {
      if (n !== visti.length + 1) fuori.push(`nel testo il ${n} viene prima del ${visti.length + 1}: i numeri seguono l'ordine delle voci`);
      visti.push(n);
    }
  }
  for (let n = 1; n <= k; n++) if (!visti.includes(n)) fuori.push(`nel testo manca la voce ${n} (come "${n}." a inizio riga o "[${n}]")`);
  return [...new Set(fuori)];
}

// Che cosa c'è già nel repository: frammenti e nodi (id → percorso), letture, restituzioni (con forma, per, voci).
function indice(radice) {
  const md = (c) => {
    const fuori = [], giu = (d) => { for (const e of existsSync(d) ? readdirSync(d, { withFileTypes: true }) : []) {
      if (e.name.startsWith('.')) continue;
      if (e.isDirectory()) giu(join(d, e.name)); else if (e.name.endsWith('.md')) fuori.push(join(d, e.name));
    } };
    giu(join(radice, c));
    return fuori;
  };
  const restituzioni = new Map();
  for (const p of md('restituzioni')) {
    let dati = {};
    try { dati = frontmatter(readFileSync(p, 'utf8')).dati; } catch { /* lo dice verifica */ }
    restituzioni.set(basename(p, '.md'), dati);
  }
  return {
    frammenti: new Map(md('frammenti').map((p) => [basename(p, '.md'), p])),
    letture: new Set(md('letture').map((p) => basename(p, '.md'))),
    nodi: new Map(GENERI.flatMap((g) => md(g).map((p) => [basename(p, '.md'), { genere: g, percorso: `${g}/${basename(p)}`, p }]))),
    restituzioni,
  };
}
const leggi = (p) => { try { return frontmatter(readFileSync(p, 'utf8')); } catch { return null; } };

// I link del frammento (§3.3, banco B13–B15): `si` via, `t` e il resto tenuti, http → https, il pin di Pinterest
// normalizzato su www.pinterest.com/pin/ID/. Il frammento non si tocca: il link pulito va nella lettura.
export function pulisciLink(u) {
  const url = new URL(String(u).replace(/^http:/i, 'https:'));
  const pin = /(^|\.)pinterest\.[a-z.]+$/.test(url.hostname) && /^\/pin\/([^/?#]+)/.exec(url.pathname);
  if (pin) return `https://www.pinterest.com/pin/${pin[1]}/`;
  url.searchParams.delete('si');
  return url.toString();
}
export const linkDelTesto = (t) => [...new Set((String(t).match(/https?:\/\/[^\s<>"«»]+/gi) ?? [])
  .map((u) => u.replace(/[.,;:!?)\]]+$/, '')).flatMap((u) => { try { return [pulisciLink(u)]; } catch { return []; } }))];

// L'oEmbed (Spotify, YouTube; gli altri siti no): l'indirizzo da chiedere, oppure null.
export function indirizzoOembed(url) {
  const h = new URL(url).hostname.replace(/^(www|m|music)\./, '');
  if (h === 'open.spotify.com') return `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
  if (h === 'youtube.com' || h === 'youtu.be') return `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`;
  return null;
}
// curl → {stato: 'ok', titolo, autore} · {stato: 'assente'} (HTTP ≥ 400: il link non esiste o è privato) · {stato: 'rete'}.
// MEMO_RETE=no la spegne (i test, una sessione senza rete). Mai per una persona `vita`: qui passano solo URL mandati da te.
export function chiediOembed(indirizzo) {
  if (process.env.MEMO_RETE === 'no') return { stato: 'rete' };
  const r = spawnSync('curl', ['-sS', '-f', '-L', '--max-time', '8', indirizzo], { encoding: 'utf8', timeout: 10000 });
  if (r.status === 22) return { stato: 'assente' };
  if (r.status !== 0) return { stato: 'rete' };
  try {
    const j = JSON.parse(r.stdout);
    return typeof j.title === 'string' && j.title.trim()
      ? { stato: 'ok', titolo: j.title.trim(), ...(typeof j.author_name === 'string' && j.author_name.trim() ? { autore: j.author_name.trim() } : {}) }
      : { stato: 'assente' };
  } catch { return { stato: 'rete' }; }
}

// `@Nome` → slug dei nodi creati nello stesso piano (§2.2), dentro i campi che portano riferimenti (non nella prosa).
const PROSA = new Set(['testo', 'corpo', 'perche', 'nome', 'alias', 'parole', 'nota', 'trascrizione', 'vissuto', 'vecchio']);
function risolvi(v, nuovi, err) {
  if (typeof v === 'string' && v.startsWith('@')) {
    const s = nuovi.get(v.slice(1))?.slug;
    if (!s) err(`${v}: nessun crea-nodo con questo nome nel piano (per un nodo esistente usa il suo slug)`);
    return s ?? v;
  }
  if (Array.isArray(v)) return v.map((x) => risolvi(x, nuovi, err));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, PROSA.has(k) ? x : risolvi(x, nuovi, err)]));
  return v;
}

// Lo slug di ogni crea-nodo (§3.6): dal nome (una citazione: le prime 6 parole); se lo slug c'è già ed è lo stesso nodo
// (stesso genere, il nome è il suo nome o un alias, la stessa cerchia) non nasce niente: si aggiungono gli alias (§8.2);
// se è un'altra cosa, il genere al singolare (`sisifo-opera`), poi -2, -3.
const SINGOLARE = { persone: 'persona', opere: 'opera', citazioni: 'citazione', temi: 'tema', raccolte: 'raccolta' };
function conCoda(base, coda) {
  const max = 60 - coda.length - 1, t = base.lastIndexOf('-', max);
  return `${base.length > max ? base.slice(0, t > 0 ? t : max) : base}-${coda}`;
}
export const baseSlug = (genere, nome) => slug(genere === 'citazioni' ? String(nome).trim().split(/\s+/).slice(0, 6).join(' ') : nome);
function calcolaSlug(ops, c) {
  const nuovi = new Map(), presi = new Map();
  for (const o of ops.filter((x) => x.op === 'crea-nodo')) {
    const nome = `crea-nodo "${o.nome}"`, base = baseSlug(o.genere, o.nome);
    if (nuovi.has(o.nome)) { c.err(`${nome}: due volte nello stesso piano`); continue; }
    if (presi.get(base) === o.genere) { c.err(`${nome}: lo slug ${base} è già di un altro crea-nodo dello stesso genere nel piano`); continue; }
    const gia = c.indice.nodi.get(base), d = gia && leggi(gia.p)?.dati;
    if (d && gia.genere === o.genere && [d.nome, ...(d.alias ?? [])].map(chiave).includes(chiave(o.nome))
      && (o.genere !== 'persone' || d.cerchia === o.cerchia)) {
      if (d['fuso-in']) c.err(`${nome}: ${base} è una lapide, fuso in ${d['fuso-in']}: usa ${d['fuso-in']}`);
      nuovi.set(o.nome, { slug: base, gia: true });
      continue;
    }
    let s = base;
    for (let i = 1; c.indice.nodi.has(s) || presi.has(s); i++) s = conCoda(base, i === 1 ? SINGOLARE[o.genere] : `${SINGOLARE[o.genere]}-${i}`);
    presi.set(s, o.genere);
    nuovi.set(o.nome, { slug: s, gia: false });
  }
  return nuovi;
}

// Un tema di "smista" è una parola del frammento (banco G5): ogni parola del nome, a meno della vocale finale ("padri" → padre).
const radici = (t) => chiave(t).split(' ').filter(Boolean).map((w) => (w.length > 3 ? w.replace(/[aeiou]$/, '') : w));
const nominato = (nome, testo) => { const r = new Set(radici(testo)); return radici(nome).every((w) => r.has(w)); };

// Le operazioni, nell'ordine in cui si applicano: i nodi, poi le restituzioni (la lettura ne prende l'id), poi le letture.
function creaNodo(o, c) {
  const nome = `crea-nodo "${o.nome}"`, n = c.nuovi.get(o.nome);
  if (!n) return;
  if (n.gia) return aggiungiAlias(n.slug, [o.nome, ...(o.alias ?? [])], c, nome);
  const { op, genere, corpo = '', ...campi } = o;
  const cita = (l) => [l.legami ?? [], (l.voci ?? []).map((v) => ({ a: v.rif }))].flat()
    .some((x) => [x.a, x.tra, x.nodo].flat().includes(n.slug));
  const letture = c.ops.filter((x) => x.op === 'lettura'), risposte = c.ops.filter((x) => x.op === 'restituzione' && x.per);
  const nato = campi['nato-da'] ?? (letture.filter(cita).length ? letture.filter(cita).map((l) => l.frammento)
    : letture.length === 1 ? [letture[0].frammento] : risposte.length === 1 ? [risposte[0].per] : null);
  if (!nato) return c.err(`${nome}: manca "nato-da" e il piano non dice da quale frammento nasce (nessuna lettura lo nomina)`);
  if (genere === 'temi' && ['smista', 'specchio'].includes(c.piano.ciclo)) {
    const testo = nato.filter((x) => ID_F.test(x)).map((x) => leggi(c.indice.frammenti.get(x) ?? '')?.corpo ?? '').join('\n');
    if (!nominato(o.nome, testo))
      c.err(`${nome}: "${c.piano.ciclo}" crea un tema solo se è una parola tua del frammento (✦); i temi dedotti li crea "consolida"`);
  }
  if (campi.link) campi.link = [...new Set(campi.link.map(pulisciLink))];
  c.file.push({ tipo: 'nodo', genere, id: n.slug, percorso: `${genere}/${n.slug}.md`,
    dati: ordina('nodo', { schema: 3, ...campi, 'nato-da': nato }), corpo });
}
// Gli alias nuovi (per chiave: "Galimberti" e "galimberti" sono la stessa forma) in coda a quelli che ci sono.
function aggiungiAlias(s, forme, c, nome) {
  let f = c.file.find((x) => x.tipo === 'nodo' && x.id === s);
  if (!f) {
    const n = c.indice.nodi.get(s), letto = n && leggi(n.p);
    if (!n) return c.err(`${nome}: il nodo ${s} non esiste`);
    if (!letto) return c.err(`${nome}: ${n.percorso} non si legge`);
    if (letto.dati['fuso-in']) return c.err(`${nome}: ${s} è una lapide, fuso in ${letto.dati['fuso-in']}: l'alias va lì`);
    f = { tipo: 'nodo', genere: n.genere, id: s, percorso: n.percorso, dati: letto.dati, corpo: letto.corpo, sopra: true };
  }
  const note = new Set([f.dati.nome, ...(f.dati.alias ?? [])].map(chiave));
  const nuove = forme.filter((x) => { const k = chiave(x); return k && !note.has(k) && note.add(k); });
  if (!nuove.length) return;
  f.dati = ordina('nodo', { ...f.dati, alias: [...(f.dati.alias ?? []), ...nuove] });
  if (!c.file.includes(f)) c.file.push(f);
}
const alias = (o, c) => aggiungiAlias(o.nodo, o.alias, c, `alias ${o.nodo}`);

function restituzione(o, c) {
  const nome = `restituzione ${o.forma}`;
  const quando = c.registrato.slice(0, 16).replace(/[-:]/g, '').replace('T', '-'); // AAAAMMGG-HHMM, ora di Roma (§3.1)
  let id = `r-${quando}-${o.forma}`;
  for (let i = 2; c.indice.restituzioni.has(id) || c.ids.has(id); i++) id = `r-${quando}-${o.forma}-${i}`;
  c.ids.add(id);
  for (const m of controllaNumeri(o.testo, o.voci.length)) c.err(`${nome}: ${m}`);
  for (const l of o.legami ?? []) if (l.da > o.voci.length) c.err(`${nome}: un legame parte dalla voce ${l.da}, ma le voci sono ${o.voci.length}`);
  if (o.forma === 'risposta') { // una sola risposta per frammento (§8.2)
    const gia = [...c.indice.restituzioni].find(([, d]) => d.forma === 'risposta' && d.per === o.per)?.[0]
      ?? c.file.find((f) => f.tipo === 'restituzione' && f.dati.forma === 'risposta' && f.dati.per === o.per)?.id;
    if (gia) c.err(`${nome} per ${o.per}: c'è già la risposta ${gia}`);
  }
  const { op, testo, voci, ...campi } = o;
  const dati = ordina('restituzione', { schema: 3, ...campi, 'letto-da': c.piano['letto-da'], registrato: c.registrato,
    voci: voci.map((v, i) => ({ n: i + 1, ...v })) });
  c.file.push({ tipo: 'restituzione', id, percorso: `restituzioni/${cartella(id.slice(2))}/${id}.md`, dati, corpo: testo });
}

// La lettura v1 (§3.3): `risposta` = l'id della restituzione `risposta` del piano che ha il frammento in `per` o in `copre`
// (lo mette lo script); senza, quella del piano: `salvato`, `ci-sono`, o l'id di una risposta che c'è già (§8.2, raffica).
function lettura(o, c) {
  const id = o.frammento, nome = `lettura ${id}`;
  if (c.piano.ciclo === 'consolida') return c.err(`${nome}: le versioni ≥ 2 non sono ancora fatte da applica.mjs (blocco 8, "consolida")`);
  const fr = c.indice.frammenti.has(id) && leggi(c.indice.frammenti.get(id));
  if (!fr) return c.err(`${nome}: il frammento non c'è in frammenti/ (prima "smista.mjs prepara")`);
  if (c.indice.letture.has(id)) return c.err(`${nome}: c'è già; dopo la versione 1 scrive solo "consolida"`);
  if (c.file.some((f) => f.tipo === 'lettura' && f.id === id)) return c.err(`${nome}: due letture dello stesso frammento nel piano`);
  for (const r of o.reazione ?? []) if (!fr.corpo.includes(r.parole)) c.err(`${nome}: la reazione «${r.parole}» non è copiata esatta dal frammento`);
  for (const i of [fr.dati.intento ?? []].flat()) if (!o.intento.includes(i)) c.err(`${nome}: manca l'intento "${i}" del frammento (la lettura lo contiene sempre)`);
  const del = c.file.filter((f) => f.tipo === 'restituzione' && f.dati.forma === 'risposta' && (f.dati.per === id || (f.dati.copre ?? []).includes(id)));
  let risposta = o.risposta;
  if (del.length > 1) c.err(`${nome}: il piano ha ${del.length} risposte per questo frammento (una per raffica)`);
  if (del.length) {
    if (risposta) c.err(`${nome}: "risposta: ${risposta}", ma il piano scrive la risposta per questo frammento: togli il campo, l'id lo mette lo script`);
    risposta = del[0].id;
  } else if (!risposta) c.err(`${nome}: manca "risposta": salvato, ci-sono, l'id di una risposta che c'è, o una restituzione con per o copre ${id}`);
  else if (ID_R.test(risposta) && c.indice.restituzioni.get(risposta)?.forma !== 'risposta')
    c.err(`${nome}: risposta ${risposta} non è una restituzione "risposta" che c'è già`);
  if (c.prompt === undefined) {
    try { c.prompt = hashPrompt(c.radice, c.piano.ciclo); }
    catch { c.prompt = null; c.err(`${nome}: per "prompt" servono CLAUDE.md, prompt/${c.piano.ciclo}.md e prompt/formato-piano.md`); }
  }
  const link = linkDelTesto(fr.corpo).map((url) => ({ url }));
  for (const l of link) c.link.push({ id, l });
  const { op, frammento, versione, ...campi } = o;
  c.file.push({ tipo: 'lettura', id, percorso: `letture/${cartella(id)}/${id}.md`, corpo: '',
    dati: ordina('lettura', { schema: 3, versione: 1, 'letto-da': c.piano['letto-da'], prompt: c.prompt ?? undefined, ...campi, link, risposta }) });
}
const blocco = (dove) => (o, c) => c.err(`${o.op}: non ancora fatta da applica.mjs (${dove})`);
const OPERAZIONI = [
  ['crea-nodo', creaNodo], ['alias', alias], ['aggiorna-nodo', blocco('blocco 8, "consolida"')],
  ['lapide', blocco('blocco 8, "consolida"')], ['restituzione', restituzione], ['lettura', lettura],
  ['riserva', blocco('blocco 8, "consolida"')],
];

// Il titolo dall'oEmbed, solo se il piano è buono (niente rete per un piano che si rifiuta). Se non risponde, il link resta
// senza titolo e lo dice un avviso: il titolo non si inventa (banco B13, B14); se lo sai, va in `nota` con ⚠ (prompt/smista.md).
function titoli(c, rete) {
  for (const { id, l } of c.link) {
    const dove = indirizzoOembed(l.url);
    if (!dove) continue;
    const r = rete(dove);
    if (r.stato === 'ok') Object.assign(l, { titolo: r.titolo, ...(r.autore ? { autore: r.autore } : {}) });
    else if (r.stato === 'assente') c.avvisi.push(`lettura ${id}: l'oEmbed non trova ${l.url}: link senza titolo`);
    else c.avvisi.push(`lettura ${id}: oEmbed non raggiunto per ${l.url} (rete): link senza titolo; il titolo, se lo sai, in "nota" con ⚠`);
  }
}

// I riferimenti di un file prodotto (come in verifica.mjs): esistono già o nascono in questo piano. Mai uno slug inventato.
function riferimenti(f) {
  const d = f.dati, l = (d.legami ?? []).flatMap((x) => [x.a, x.tra, x.nodo]);
  const nodo = f.tipo === 'nodo' ? [d['nato-da'], d.in, d.autore, d['attribuita-a'], d['citata-da']] : [];
  return [d.per, d.copre, d.aggancio?.a, (d.voci ?? []).map((v) => v.rif), l, nodo, ID_R.test(d.risposta ?? '') ? d.risposta : null]
    .flat(2).filter((x) => typeof x === 'string');
}
function esiste(r, c) {
  if (r.startsWith('~')) return true;
  const [id, n] = r.split('#');
  if (ID_F.test(id)) return c.indice.frammenti.has(id);
  if (ID_R.test(id)) {
    const voci = c.indice.restituzioni.get(id)?.voci ?? c.file.find((f) => f.id === id)?.dati.voci;
    return Boolean(voci) && (!n || voci.some((v) => String(v?.n) === n));
  }
  return c.indice.nodi.has(id) || c.file.some((f) => f.tipo === 'nodo' && f.id === id);
}

// Il piano → { errori, avvisi, file }: nessun file scritto. `rete` (per i test) sostituisce curl.
export function prepara(piano, radice = process.cwd(), { rete = chiediOembed } = {}) {
  if (!validaPiano(piano)) return { errori: [...new Set(validaPiano.errors.map((e) => `piano${e.instancePath}: ${e.message}`))], avvisi: [], file: [] };
  const errori = [];
  const c = { piano, radice, indice: indice(radice), registrato: iso(), ids: new Set(), file: [], link: [], avvisi: [], err: (m) => errori.push(m) };
  c.nuovi = calcolaSlug(piano.operazioni, c);
  c.ops = piano.operazioni.map((o) => risolvi(o, c.nuovi, c.err));
  for (const [nome, fa] of OPERAZIONI) for (const o of c.ops.filter((x) => x.op === nome)) fa(o, c);
  if (!errori.length) titoli(c, rete);
  for (const f of c.file) {
    const v = validaFile(f.tipo);
    if (!v(f.genere ? { ...f.dati, _genere: f.genere } : f.dati))
      for (const e of v.errors) c.err(`${f.percorso}: schema ${e.instancePath || '/'} ${e.message}`);
    for (const r of riferimenti(f)) if (!esiste(r, c)) c.err(`${f.percorso}: riferimento inesistente ${r}`);
  }
  return { errori: [...new Set(errori)], avvisi: c.avvisi, file: c.file };
}

// Scrive, verifica, e se la verifica non passa toglie tutto ciò che ha scritto.
// Un file nuovo non va mai sopra uno che c'è; un nodo a cui si aggiunge un alias (`sopra`) si riscrive, e si rimette com'era.
export function applica(piano, radice = process.cwd(), opzioni = {}) {
  const { errori, avvisi, file } = prepara(piano, radice, opzioni);
  if (errori.length) return { errori, avvisi, scritti: [] };
  const scritti = [], cartelle = [], prima = [];
  const togli = () => {
    for (const p of scritti) try { unlinkSync(join(radice, p)); } catch { /* già via */ }
    for (const [p, b] of prima) writeFileSync(p, b);
    for (const d of cartelle.reverse()) try { rmdirSync(d); } catch { /* non vuota */ }
  };
  try {
    for (const f of file) {
      const p = join(radice, f.percorso);
      if (f.sopra) { prima.push([p, readFileSync(p)]); writeFileSync(p, componi(f.dati, f.corpo)); continue; }
      for (let d = dirname(p); !existsSync(d); d = dirname(d)) cartelle.unshift(d);
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, componi(f.dati, f.corpo), { flag: 'wx' });
      scritti.push(f.percorso);
    }
  } catch (e) { togli(); return { errori: [`scrittura: ${e.message}`], avvisi, scritti: [] }; }
  const v = verifica(radice);
  if (v.length) { togli(); return { errori: [...v, 'verifica.mjs non passa: nessun file resta'], avvisi, scritti: [] }; }
  return { errori: [], avvisi, scritti: file.map((f) => f.percorso) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const argv = process.argv.slice(2), i = argv.indexOf('--radice');
    const radice = i >= 0 ? argv.splice(i, 2)[1] : process.cwd();
    if (argv.length !== 1 || !radice) throw new Error('uso: node scripts/applica.mjs PIANO.json [--radice DIR]');
    const { errori, avvisi, scritti } = applica(JSON.parse(readFileSync(argv[0], 'utf8')), radice);
    for (const m of avvisi) console.log(`AVVISO ${m}`);
    for (const m of errori) console.log(m.startsWith('ERRORE ') ? m : `RIFIUTO ${m}`);
    for (const p of scritti) console.log(`scritto ${p}`);
    if (!errori.length) console.log('verifica: ok');
    process.exit(errori.length ? 1 : 0);
  } catch (e) {
    console.log(`RIFIUTO applica: ${e.message}`);
    process.exit(1);
  }
}
