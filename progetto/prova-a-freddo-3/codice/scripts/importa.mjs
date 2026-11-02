// importa.mjs: il punto zero, l'Atlante importato una volta sola (modello §14, piano blocco 2).
// node scripts/importa.mjs --da /tmp/atlante [--prova] [--radice DIR]
// Legge <radice>/importa/: fonte.json (url, sha), tabella.json (nodi = l'elenco 0, frammenti, restituzioni; più le
// eventuali parti in importa/parti/), citazioni.json (le 17 vive dopo il protocollo) e, piano B (piano §1),
// correzioni-citazioni.json, applicato solo alle voci delle restituzioni `eredita`. Controlla che l'Atlante sia allo SHA
// di fonte.json, poi nell'ordine del §14: elenco dei nodi → frammenti → nodi → letture → restituzioni → riconciliazione
// (fallisce se resta uno slug fuori elenco) → scrittura (ATLANTE_ORA = data del passo) e frammenti/.hash → contesto.mjs
// → verifica.mjs. Con --prova stampa i conti e gli errori e non scrive niente.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Document } from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';
import { aggiornaHash, verifica, GENERI } from './verifica.mjs';
import { chiave, slug } from './slug.mjs';
import { iso } from './ora.mjs';
import { contesto } from './contesto.mjs';

// Chi ha letto (§14 R1): il modello della sessione d'importazione; `prompt` sono le prime 7 cifre dello SHA dell'Atlante.
export const LETTORE = process.env.LETTORE ?? 'lettore-importazione';
export const ATTESI = { frammenti: 35, nodi: 52, restituzioni: 60 }; // §14, ±15% (collaudo del blocco 2)
const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/, SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ID_IMP = /^\d{8}-0000-(u\d{2}[ab]?|s\d{2})$/, ID_RIMP = /^r-\d{8}-0000-eredita-[a-z0-9-]+$/;
const CITAZIONI = 'r-20261007-0000-eredita-citazioni';
// Le note di lavoro della tabella: non entrano nei file.
const LAVORO = new Set(['dubbio', 'riga', 'placement']);
const RIGA_F = new Set(['id', 'fonte', 'registrato', 'voce', 'forma', 'vissuto', 'testo', 'nota', 'lettura', 'serve-a', 'altrui', 'delicato', 'allegati']);
const CITAZIONE_INGRESSO = new Set(['schema', 'nome', 'alias', 'nato-da', 'attribuita-a']); // §7.2 passo 4, banco G4
const ORDINE = {
  frammento: ['registrato', 'canale', 'voce', 'forma', 'continua', 'intento', 'allegati'],
  lettura: ['schema', 'versione', 'letto-da', 'prompt', 'intento', 'reazione', 'legami', 'parole', 'link', 'trascrizione',
    'altrui', 'vissuto', 'delicato', 'nota', 'fonte', 'risposta'],
  nodo: ['schema', 'nome', 'alias', 'cerchia', 'in', 'autore', 'anno', 'attribuita-a', 'citata-da', 'originale', 'traduzione',
    'riferimento', 'esito', 'scopo', 'fuso-in', 'nato-da', 'link'],
  restituzione: ['schema', 'forma', 'letto-da', 'registrato', 'per', 'copre', 'aggancio', 'voci', 'legami', 'fonte'],
};
const FLOW = ['legami', 'voci', 'reazione', 'link', 'aggancio', 'intento', 'alias', 'nato-da', 'parole', 'attribuita-a', 'citata-da', 'copre', 'allegati'];

const schema = JSON.parse(readFileSync(new URL('../schema/frontmatter.json', import.meta.url), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strictTypes: false }).addSchema(schema);
const valida = (tipo) => ajv.getSchema(`${schema.$id}#/$defs/${tipo}`);

const leggiJson = (f) => JSON.parse(readFileSync(f, 'utf8'));
const vuoto = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
const data = (id) => `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`; // AAAAMMGG… → AAAA-MM-GG
const cartella = (id) => `${id.slice(0, 4)}/${id.slice(4, 6)}`;
const spazi = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();
const senza = (o, via) => Object.fromEntries(Object.entries(o).filter(([k]) => !via.has(k) && !LAVORO.has(k)));

// I campi nell'ordine fisso del tipo (gli altri in coda, lo schema li ferma), senza i vuoti; `legami` e `voci` restano.
export function ordina(tipo, o) {
  const fuori = {}, obbl = { lettura: 'legami', restituzione: 'voci' }[tipo];
  for (const k of [...ORDINE[tipo], ...Object.keys(o)]) {
    if (k in fuori) continue;
    if (!vuoto(o[k])) fuori[k] = o[k]; else if (k === obbl) fuori[k] = [];
  }
  return fuori;
}

// Frontmatter + corpo, sempre gli stessi byte; `prompt` tra virgolette (7 cifre esadecimali possono sembrare un numero).
export function componi(dati, corpo = '') {
  const doc = new Document(dati);
  for (const k of FLOW) {
    const n = doc.get(k, true);
    if (!n?.items) continue;
    if (['legami', 'voci', 'reazione', 'link'].includes(k)) n.items.forEach((i) => { i.flow = true; });
    else n.flow = true;
  }
  const p = doc.get('prompt', true);
  if (p) p.type = 'QUOTE_DOUBLE';
  const yaml = doc.toString({ lineWidth: 0, flowCollectionPadding: false });
  const c = String(corpo ?? '').replace(/\s+$/, '');
  return `---\n${yaml}---\n${c ? c + '\n' : ''}`;
}

// L'ora di un passo: la mezzanotte di Roma di quel giorno, con il suo scarto (ora.mjs la rilegge da ATLANTE_ORA).
export const oraDelPasso = (giorno) => `${giorno}T00:00:00${iso(new Date(`${giorno}T00:00:00Z`)).slice(-6)}`;

// Gli ingressi: fonte, tabella (più le parti), citazioni, correzioni del piano B.
export function caricaIngressi(radice) {
  const dir = join(radice, 'importa'), parti = join(dir, 'parti');
  if (!existsSync(join(dir, 'fonte.json'))) throw new Error('manca importa/fonte.json');
  const tabella = existsSync(join(dir, 'tabella.json')) ? leggiJson(join(dir, 'tabella.json')) : {};
  const nomi = existsSync(parti) ? readdirSync(parti).filter((f) => f.endsWith('.json')).sort() : [];
  const di = (re) => nomi.filter((f) => re.test(f)).flatMap((f) => leggiJson(join(parti, f)));
  const unione = {
    nodi: [...(tabella.nodi ?? []), ...di(/^nodi.*\.json$/)],
    frammenti: [...(tabella.frammenti ?? []), ...di(/^frammenti.*\.json$/)],
    restituzioni: [...(tabella.restituzioni ?? []), ...di(/^restituzioni.*\.json$/)],
  };
  if (!unione.nodi.length && !unione.frammenti.length) throw new Error('manca importa/tabella.json (né importa/parti/)');
  const citazioni = [...(existsSync(join(dir, 'citazioni.json')) ? leggiJson(join(dir, 'citazioni.json')) : []), ...di(/^citazioni.*\.json$/)];
  const correzioni = existsSync(join(dir, 'correzioni-citazioni.json')) ? leggiJson(join(dir, 'correzioni-citazioni.json')) : null;
  return { fonte: leggiJson(join(dir, 'fonte.json')), tabella: unione, citazioni, correzioni };
}

// "file:a-b" (stringa, elenco con virgole o array) → `fonte` dello schema: per file "file:righe@sha7"; più file, una lista.
function fonte(valore, sha, atlante, err, chi) {
  const voci = [valore ?? []].flat().flatMap((v) => String(v).split(',')).map((v) => v.trim()).filter(Boolean);
  const perFile = new Map();
  let file = null;
  for (const v of voci) {
    const m = /^(.+?):(\d+(?:-\d+)?)$/.exec(v) ?? /^(\d+(?:-\d+)?)$/.exec(v);
    if (!m) { err(`${chi}: fonte illeggibile "${v}"`); continue; }
    if (m.length === 3) file = m[1];
    if (!file) { err(`${chi}: fonte senza file "${v}"`); continue; }
    if (!perFile.has(file)) perFile.set(file, []);
    const r = m.length === 3 ? m[2] : m[1];
    if (!perFile.get(file).includes(r)) perFile.get(file).push(r);
  }
  for (const [f, righe] of perFile) {
    if (!atlante) continue;
    const p = join(atlante, f);
    if (!existsSync(p)) { err(`${chi}: fonte ${f} assente nell'Atlante`); continue; }
    const n = readFileSync(p, 'utf8').split('\n').length;
    for (const r of righe) if (Math.max(...r.split('-').map(Number)) > n) err(`${chi}: fonte ${f}:${r} oltre la fine (${n} righe)`);
  }
  const fuori = [...perFile].map(([f, righe]) => `${f}:${righe.join(', ')}@${sha.slice(0, 7)}`);
  return fuori.length > 1 ? fuori : fuori[0];
}

// R7: le voci della restituzione delle citazioni prendono esito, riferimento ed estratto da citazioni.json (vince il
// protocollo); sopra i 200 caratteri resta il taglio della tabella, fatto di pezzi della citazione separati da […].
function riempiCitazioni(r, citazioni, err, avvisi) {
  const usate = new Set();
  const voci = (r.voci ?? []).map(({ entita, ...v }) => {
    const c = (entita && citazioni.find((x) => x.entita === entita))
      ?? citazioni.find((x) => v.estratto && spazi(x.citazione) === spazi(v.estratto))
      ?? citazioni.find((x) => x.entita === slug(String(v.rif).replace(/^~/, '')));
    if (!c) { err(`${r.id}#${v.n}: nessuna citazione per ${v.rif} in citazioni.json`); return v; }
    usate.add(c.entita);
    for (const k of ['esito', 'riferimento'])
      if (v[k] && c[k] && spazi(v[k]) !== spazi(c[k])) avvisi.push(`${r.id}#${v.n}: ${k} della tabella diverso da citazioni.json (vince citazioni.json)`);
    let estratto = c.citazione ?? v.estratto;
    if (spazi(estratto).length > 200) {
      if (!tagliato(v.estratto, c.citazione)) err(`${r.id}#${v.n}: citazione oltre 200 caratteri e l'estratto della tabella non ne è un taglio`);
      estratto = v.estratto;
    }
    return { ...v, estratto, esito: c.esito ?? v.esito, riferimento: c.riferimento ?? v.riferimento };
  });
  for (const c of citazioni) if (!usate.has(c.entita)) err(`${r.id}: la citazione di ${c.entita} non ha una voce`);
  const testo = voci.map((v) => `${v.n}. ${v.estratto}\n— ${v.riferimento}`).join('\n\n');
  if (r.testo && spazi(r.testo) !== spazi(testo)) avvisi.push(`${r.id}: corpo ricomposto da citazioni.json`);
  return { ...r, voci, testo };
}

// Un estratto è un taglio di un testo se i suoi pezzi (separati da […]) vi compaiono in ordine.
function tagliato(estratto, testo) {
  const t = spazi(testo), pezzi = spazi(estratto).split(/\s*\[…\]\s*/).map((x) => x.replace(/^[,:;. ]+|[,:;. ]+$/g, '')).filter(Boolean);
  let da = 0;
  return pezzi.length > 0 && pezzi.every((x) => { const i = t.indexOf(x, da); da = i + x.length; return i >= 0; });
}

// Piano B (piano §1): importa/correzioni-citazioni.json, {correzioni: [{entita, prima, nel-checkpoint, dopo, esito?,
// riferimento?}]} (o la sola lista). Solo le voci delle restituzioni `eredita`, mai i frammenti: dove una voce porta
// `prima` o `nel-checkpoint` (nell'estratto, o nel corpo se il suo rif è l'entità) scrive `dopo`, con esito e
// riferimento; dove c'è già `dopo` non fa nulla. Le entità morte non hanno voce: nessuna voce non è un errore.
const taglia = (t) => { // un estratto resta ≤ 25 parole e ≤ 200 caratteri (§3.5, schema)
  let p = spazi(t).split(' ').slice(0, 25);
  while (p.join(' ').length > 200) p = p.slice(0, -1);
  return p.join(' ');
};
function correggi(file, correzioni, avvisi) {
  const elenco = Array.isArray(correzioni) ? correzioni : correzioni?.correzioni ?? [];
  const eredita = file.restituzione.filter((x) => x.dati.forma === 'eredita');
  for (const c of elenco) {
    const vecchi = [c.prima, c['nel-checkpoint']].filter((t) => t && t !== c.dopo), chi = c.entita ?? `n. ${c.n}`;
    let fatte = 0, gia = 0;
    for (const t of eredita) for (const v of t.dati.voci) {
      const sua = chiave(String(v.rif).replace(/^~/, '')) === chiave(c.entita ?? '');
      const vecchio = vecchi.find((x) => String(v.estratto ?? '').includes(x) || (sua && t.corpo.includes(x)));
      if (!vecchio) { if (c.dopo && (String(v.estratto ?? '').includes(c.dopo) || (sua && (t.corpo.includes(c.dopo) || tagliato(v.estratto, c.dopo))))) gia++; continue; }
      t.corpo = t.corpo.split(vecchio).join(c.dopo);
      if (v.estratto) v.estratto = taglia(v.estratto.split(vecchio).join(c.dopo));
      if (c.esito) v.esito = c.esito;
      if (c.riferimento) v.riferimento = c.riferimento;
      fatte++;
    }
    avvisi.push(`correzioni-citazioni (piano B) ${chi}: ${fatte ? `${fatte} voci corrette` : gia ? `già corretta in ${gia} voci` : 'nessuna voce eredita'}`);
  }
}

// Ogni riferimento di un frontmatter, con il modo di sostituirlo: f(valore, dove) → nuovo valore.
function perRiferimenti(d, f) {
  const uno = (o, k, dove) => { if (o && typeof o[k] === 'string') o[k] = f(o[k], dove); };
  const tanti = (o, k, dove) => { if (o && Array.isArray(o[k])) o[k] = o[k].map((x) => (typeof x === 'string' ? f(x, dove) : x)); };
  for (const k of ['in', 'autore', 'fuso-in', 'per', 'continua']) uno(d, k, k);
  for (const k of ['nato-da', 'attribuita-a', 'citata-da', 'copre']) tanti(d, k, k);
  uno(d.aggancio, 'a', 'aggancio');
  for (const l of Array.isArray(d.legami) ? d.legami : []) { uno(l, 'a', l.p); tanti(l, 'tra', l.p); uno(l, 'nodo', `${l.p} nodo`); }
  for (const v of Array.isArray(d.voci) ? d.voci : []) uno(v, 'rif', `voce ${v.n}`);
}
const riferimenti = (d) => { const r = []; perRiferimenti(structuredClone(d), (x) => { r.push(x); return x; }); return r; };

// La riconciliazione (§14, R27): ogni slug e ogni ~Nome diventa lo slug dell'elenco 0, per chiave (di slug, nome, alias);
// uno slug che non si riconduce all'elenco è un errore: la scrittura non parte.
export function riconcilia(file, elenco, err) {
  const slugs = new Set(elenco.map((n) => n.slug)), perChiave = new Map(), sostituzioni = [];
  for (const n of elenco) for (const forma of [n.slug, n.nome, ...(n.alias ?? [])]) {
    const k = chiave(forma);
    if (k) (perChiave.get(k) ?? perChiave.set(k, new Set()).get(k)).add(n.slug);
  }
  const unico = (k) => (perChiave.get(k)?.size === 1 ? [...perChiave.get(k)][0] : null);
  for (const t of Object.values(file).flat()) {
    perRiferimenti(t.dati, (r, dove) => {
      if (ID_F.test(r) || ID_R.test(r.replace(/#\d+$/, ''))) return r;
      if (r.startsWith('~')) {
        const s = unico(chiave(r.slice(1)));
        if (s) sostituzioni.push(`${t.percorso} (${dove}): ${r} → ${s}`);
        return s ?? r;
      }
      if (slugs.has(r)) return r;
      const s = unico(chiave(r));
      if (s) { sostituzioni.push(`${t.percorso} (${dove}): ${r} → ${s}`); return s; }
      err(`${t.percorso} (${dove}): slug fuori elenco: ${r}${perChiave.get(chiave(r))?.size > 1 ? ` (ambiguo: ${[...perChiave.get(chiave(r))].join(', ')})` : ''}`);
      return r;
    });
    // dopo la sostituzione due legami possono coincidere: ne resta uno
    if (Array.isArray(t.dati.legami)) {
      const visti = new Set();
      t.dati.legami = t.dati.legami.filter((l) => { const k = JSON.stringify(l); return !visti.has(k) && visti.add(k); });
    }
  }
  return sostituzioni;
}

// Dalla tabella ai file, nell'ordine del §14: { file: {frammento, nodo, lettura, restituzione}, errori, avvisi, sostituzioni }.
export function prepara({ fonte: f, tabella, citazioni = [], correzioni = null }, atlante) {
  const errori = [], avvisi = [], err = (m) => errori.push(m), sha = f.sha;
  const { nodi = [], frammenti = [], restituzioni = [] } = tabella;
  const file = { frammento: [], nodo: [], lettura: [], restituzione: [] };
  const ids = { frammento: new Set(), nodo: new Set(), restituzione: new Set() };
  const unico = (tipo, id) => { if (ids[tipo].has(id)) err(`${id}: ${tipo} doppio nella tabella`); ids[tipo].add(id); };

  // 0. l'elenco dei nodi (slug, nome, genere)
  for (const x of nodi) {
    unico('nodo', x.slug);
    if (!GENERI.includes(x.genere)) err(`${x.slug}: genere sconosciuto ${x.genere}`);
    if (!SLUG.test(String(x.slug)) || String(x.slug).length > 60) err(`${x.slug}: slug non valido`);
    if (vuoto(x.nome)) err(`${x.slug}: nome vuoto`);
  }

  // 1. frammenti (e da ciascuno la sua lettura, scritta al passo 3)
  for (const x of frammenti) {
    unico('frammento', x.id);
    for (const k of Object.keys(x)) if (!RIGA_F.has(k) && !LAVORO.has(k)) err(`${x.id}: campo sconosciuto nella riga: ${k}`);
    if (!ID_IMP.test(String(x.id))) err(`${x.id}: id di frammento importato non valido (§3.1)`);
    else if (x.registrato !== data(x.id)) err(`${x.id}: registrato ${x.registrato} diverso dalla data dell'id`);
    if (vuoto(x.testo)) err(`${x.id}: testo vuoto`);
    const giorno = data(String(x.id));
    file.frammento.push({ percorso: `frammenti/${cartella(x.id)}/${x.id}.md`, tipo: 'frammento', giorno,
      dati: ordina('frammento', { registrato: x.registrato, canale: 'importato', voce: x.voce, forma: x.forma, allegati: x.allegati }),
      corpo: x.testo ?? '' });
    const l = x.lettura ?? {};
    const legami = [...(l.legami ?? [])];
    if (x['serve-a'] && !legami.some((g) => g.p === 'serve-a' && g.a === x['serve-a']))
      legami.push({ p: 'serve-a', a: x['serve-a'], voce: x.voce, perche: 'frase per i tatuaggi nell\'Atlante (R8)' });
    // la nota sta in una riga (≤ 200 caratteri): una cornice più lunga va nel corpo della lettura (§3.3, R41)
    let nota = x.nota, corpo = [l.corpo, l.nota];
    if (nota && nota.length > 200) { corpo = [nota, ...corpo]; nota = undefined; avvisi.push(`${x.id}: nota oltre 200 caratteri, nel corpo della lettura`); }
    const dati = ordina('lettura', {
      ...senza(l, new Set(['corpo', 'nota', 'fonte', 'legami'])), schema: 3, versione: 1, 'letto-da': l['letto-da'] ?? LETTORE,
      prompt: sha.slice(0, 7), intento: l.intento ?? ['salva'], legami, altrui: x.altrui, delicato: x.delicato,
      vissuto: x.vissuto, nota, fonte: fonte(l.fonte ?? x.fonte?.[0] ?? x.fonte, sha, atlante, err, x.id),
    });
    file.lettura.push({ percorso: `letture/${cartella(x.id)}/${x.id}.md`, tipo: 'lettura', giorno, dati,
      corpo: corpo.filter((t) => !vuoto(t)).join('\n\n') });
  }

  // 2. nodi
  for (const x of nodi) {
    let o = { ...senza(x, new Set(['genere', 'slug', 'corpo'])), schema: 3, link: [x.link ?? []].flat() };
    if (x.genere === 'citazioni' && vuoto(x.esito)) { // ⚠: all'ingresso solo nome, alias, nato-da, attribuita-a (§7.2 passo 4)
      const via = Object.keys(o).filter((k) => !CITAZIONE_INGRESSO.has(k) && !vuoto(o[k]));
      if (via.length) avvisi.push(`${x.slug}: citazione senza esito, tolti ${via.join(', ')} (li scrive "consolida")`);
      o = Object.fromEntries(Object.entries(o).filter(([k]) => CITAZIONE_INGRESSO.has(k)));
    } else if (x.genere === 'citazioni' && vuoto(x.riferimento)) err(`${x.slug}: citazione accolta con esito ma senza riferimento (R7)`);
    const nate = [x['nato-da'] ?? []].flat().map(String).sort();
    const giorno = nate.length ? data(nate[0].replace(/^r-/, '')) : null;
    file.nodo.push({ percorso: `${x.genere}/${x.slug}.md`, tipo: 'nodo', genere: x.genere, giorno, dati: ordina('nodo', o), corpo: x.corpo ?? '' });
  }

  // 4. restituzioni (R4, R6, R7, R8, R13), poi le correzioni del piano B
  for (const x0 of restituzioni) {
    unico('restituzione', x0.id);
    const x = x0.id === CITAZIONI ? riempiCitazioni(x0, citazioni, err, avvisi) : x0;
    if (!ID_RIMP.test(String(x.id))) { err(`${x.id}: id di restituzione importata non valido (§3.1)`); continue; }
    const id = x.id.slice(2);
    if (x.data !== data(id)) err(`${x.id}: data ${x.data} diversa dalla data dell'id`);
    const legami = [...(x.legami ?? [])];
    if (x['serve-a'] && !legami.some((g) => g.p === 'serve-a' && g.a === x['serve-a']))
      legami.push({ p: 'serve-a', a: x['serve-a'], voce: 'proposta', perche: 'idea per un tatuaggio nell\'Atlante (R8)' });
    const voci = (x.voci ?? []).map(({ entita, ...v }) => v);
    voci.forEach((v, i) => { if (v.n !== i + 1) err(`${x.id}: le voci vanno numerate da 1 senza salti (trovata ${v.n} al posto ${i + 1})`); });
    const dati = ordina('restituzione', {
      ...senza(x, new Set(['id', 'data', 'testo', 'serve-a', 'voci', 'legami', 'fonte'])), schema: 3, forma: x.forma ?? 'eredita',
      'letto-da': x['letto-da'] ?? LETTORE, registrato: x.data, voci, legami, fonte: fonte(x.fonte, sha, atlante, err, x.id),
    });
    file.restituzione.push({ percorso: `restituzioni/${cartella(id)}/${x.id}.md`, tipo: 'restituzione', giorno: x.data, dati, corpo: x.testo ?? '' });
  }
  correggi(file, correzioni, avvisi);

  // 5. riconciliazione
  const sostituzioni = riconcilia(file, nodi, err);

  // Schema, riferimenti, estratti: nessun id inventato, nessuna voce che non c'è.
  const voci = new Map(file.restituzione.map((t) => [t.percorso.split('/').pop().slice(0, -3), new Set(t.dati.voci.map((v) => v.n))]));
  for (const t of Object.values(file).flat()) {
    const v = valida(t.tipo);
    if (!v(t.genere ? { ...t.dati, _genere: t.genere } : t.dati))
      for (const e of v.errors) err(`${t.percorso}: schema ${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}`);
    for (const r of riferimenti(t.dati)) {
      if (r.startsWith('~')) continue;
      const [i, n] = r.split('#'), dove = ID_F.test(i) ? 'frammento' : ID_R.test(i) ? 'restituzione' : 'nodo';
      if (dove === 'nodo') continue; // gli slug li ha già controllati la riconciliazione
      if (!ids[dove].has(i)) err(`${t.percorso}: riferimento a ${dove} assente: ${r}`);
      else if (n && !voci.get(i)?.has(Number(n))) err(`${t.percorso}: la voce ${r} non c'è`);
    }
    for (const l of Array.isArray(t.dati.legami) ? t.dati.legami : [])
      if (l.n && voci.has(l.a) && !voci.get(l.a).has(l.n)) err(`${t.percorso}: ${l.p} verso la voce ${l.a}#${l.n}, che non c'è`);
    if (t.tipo === 'restituzione') for (const x of t.dati.voci) // §3.5: l'estratto è copiato dal corpo (Q3)
      if (x.estratto && !spazi(t.corpo).includes(spazi(x.estratto)) && !tagliato(x.estratto, t.corpo))
        err(`${t.percorso}: l'estratto della voce ${x.n} non è nel corpo`);
  }
  return { file, errori, avvisi, sostituzioni };
}

// Scrive nell'ordine frammenti → nodi → letture → restituzioni, ciascuno con ATLANTE_ORA alla data del suo passo; un file
// già presente e uguale si salta, diverso è un errore (l'importazione si rifà solo da capo). Poi frammenti/.hash.
export function scrivi(radice, file) {
  const errori = [], scritti = [];
  const testi = Object.values(file).flat().map((t) => ({ ...t, testo: componi(t.dati, t.corpo) }));
  for (const t of testi) {
    const p = join(radice, t.percorso);
    if (existsSync(p) && readFileSync(p, 'utf8') !== t.testo) errori.push(`${t.percorso}: esiste già ed è diverso`);
  }
  if (errori.length) return { errori, scritti };
  const prima = process.env.ATLANTE_ORA;
  try {
    for (const tipo of ['frammento', 'nodo', 'lettura', 'restituzione']) {
      for (const t of testi.filter((x) => x.tipo === tipo)) {
        const p = join(radice, t.percorso);
        if (existsSync(p)) continue;
        if (t.giorno) process.env.ATLANTE_ORA = oraDelPasso(t.giorno);
        mkdirSync(dirname(p), { recursive: true });
        writeFileSync(p, t.testo);
        scritti.push(t.percorso);
      }
      if (tipo === 'frammento') aggiornaHash(radice);
    }
  } finally {
    if (prima === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = prima;
  }
  return { errori, scritti };
}

export function conti(file) {
  const c = {
    frammenti: file.frammento.length,
    sua: file.frammento.filter((t) => t.dati.voce === 'sua').length,
    seme: file.frammento.filter((t) => t.dati.voce === 'seme').length,
    letture: file.lettura.length, nodi: file.nodo.length,
  };
  for (const g of GENERI) c[g] = file.nodo.filter((n) => n.genere === g).length;
  c.restituzioni = file.restituzione.length;
  c.voci = file.restituzione.reduce((s, t) => s + t.dati.voci.length, 0);
  return c;
}

function argomenti(argv) {
  const a = { radice: process.cwd(), prova: false, da: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--da' && argv[i + 1]) a.da = argv[++i];
    else if (argv[i] === '--radice' && argv[i + 1]) a.radice = argv[++i];
    else if (argv[i] === '--prova') a.prova = true;
    else throw new Error(`argomento sconosciuto: ${argv[i]} (uso: --da DIR [--prova] [--radice DIR])`);
  }
  if (!a.da) throw new Error('manca --da <cartella dell\'Atlante>');
  return a;
}

// L'Atlante si legge solo al commit fissato in importa/fonte.json, e pulito: gli stessi file a ogni giro.
function controllaAtlante(da, sha) {
  let head;
  try { head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: da, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
  catch { return [`${da} non è un clone git dell'Atlante`]; }
  if (head !== sha) return [`Atlante a ${head}, atteso ${sha} (importa/fonte.json)`];
  const sporco = execFileSync('git', ['status', '--porcelain'], { cwd: da, encoding: 'utf8' }).trim();
  return sporco ? [`Atlante con modifiche locali: ${sporco.split('\n')[0]}…`] : [];
}

export function importa({ da, radice = process.cwd(), prova = false }) {
  const ingressi = caricaIngressi(radice);
  const atl = controllaAtlante(da, ingressi.fonte.sha);
  if (atl.length) return { errori: atl, avvisi: [], sostituzioni: [], scritti: [] };
  const { file, errori, avvisi, sostituzioni } = prepara(ingressi, da);
  const esito = { conti: conti(file), errori, avvisi, sostituzioni, scritti: [] };
  if (prova || errori.length) return esito;
  const s = scrivi(radice, file);
  if (s.errori.length) return { ...esito, errori: s.errori };
  // contesto.mjs alla data dell'ultimo passo importato: nessun conto di Stato contiene l'importato (§14, ordine)
  const ultimo = Object.values(file).flat().map((t) => t.giorno).filter(Boolean).sort().at(-1);
  const prima = process.env.ATLANTE_ORA;
  try {
    if (ultimo) process.env.ATLANTE_ORA = oraDelPasso(ultimo);
    contesto(radice);
  } finally {
    if (prima === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = prima;
  }
  return { ...esito, scritti: s.scritti, verifica: verifica(radice) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const a = argomenti(process.argv.slice(2));
    const e = importa(a);
    if (e.conti) {
      const c = e.conti;
      console.log(`conti: frammenti ${c.frammenti} (sua ${c.sua}, seme ${c.seme}; attesi ~${ATTESI.frammenti}), letture ${c.letture}, ` +
        `nodi ${c.nodi} (${GENERI.map((g) => `${g} ${c[g]}`).join(', ')}; attesi ~${ATTESI.nodi}), ` +
        `restituzioni ${c.restituzioni} (attese ~${ATTESI.restituzioni}), voci ${c.voci}`);
      for (const k of Object.keys(ATTESI)) if (Math.abs(c[k] - ATTESI[k]) > ATTESI[k] * 0.15) console.log(`AVVISO ${k}: ${c[k]} fuori dal ±15% di ${ATTESI[k]}`);
    }
    console.log(`riconciliazione: ${e.sostituzioni.length} sostituzioni`);
    for (const m of e.sostituzioni) console.log(`  ${m}`);
    for (const m of e.avvisi) console.log(`AVVISO ${m}`);
    for (const m of e.errori) console.log(`ERRORE ${m}`);
    if (!a.prova && !e.errori.length) {
      console.log(`scritti: ${e.scritti.length} file; contesto: recenti.md, parole.md (con il seme), mappa.md (Stato, Nodi, Alias)`);
      for (const m of e.verifica) console.log(m);
      if (!e.verifica.length) console.log('verifica: ok');
    }
    process.exit(e.errori.length || e.verifica?.length ? 1 : 0);
  } catch (err) {
    console.log(`ERRORE importa: ${err.message}`);
    process.exit(1);
  }
}
