// archivio.mjs: leggere e scrivere le note (frammenti, letture, restituzioni, nodi) per applica, smista e contesto.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, relative, basename, sep } from 'node:path';
import { Document } from 'yaml';
import { GENERI, frontmatter } from './schema.mjs';
import { chiave } from './slug.mjs';

export const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/;
export const cartella = (id) => `${id.slice(0, 4)}/${id.slice(4, 6)}`; // AAAAMMGG… → AAAA/MM
export const vuoto = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

// L'ordine fisso dei campi (lo stesso ingresso dà gli stessi byte); i campi fuori elenco vanno in coda.
const ORDINE = {
  lettura: ['schema', 'versione', 'letto-da', 'prompt', 'intento', 'reazione', 'legami', 'parole', 'link', 'trascrizione',
    'altrui', 'vissuto', 'delicato', 'nota', 'fonte', 'risposta'],
  nodo: ['schema', 'nome', 'alias', 'cerchia', 'in', 'autore', 'anno', 'attribuita-a', 'citata-da', 'originale', 'traduzione',
    'riferimento', 'esito', 'scopo', 'fuso-in', 'nato-da', 'link'],
  restituzione: ['schema', 'forma', 'letto-da', 'registrato', 'per', 'copre', 'aggancio', 'voci', 'legami', 'fonte'],
};
const FLOW = ['legami', 'voci', 'reazione', 'link', 'aggancio', 'intento', 'alias', 'nato-da', 'parole', 'attribuita-a', 'citata-da', 'copre'];

export function ordina(tipo, o) {
  const fuori = {}, obbl = { lettura: 'legami', restituzione: 'voci' }[tipo]; // obbligatorio anche vuoto
  for (const k of [...ORDINE[tipo], ...Object.keys(o)]) {
    if (k in fuori) continue;
    if (!vuoto(o[k])) fuori[k] = o[k]; else if (k === obbl) fuori[k] = [];
  }
  return fuori;
}

// Frontmatter + corpo; `prompt` sempre tra virgolette (7 cifre esadecimali possono sembrare un numero).
export function componi(tipo, dati, corpo = '') {
  const doc = new Document(ordina(tipo, dati));
  for (const k of FLOW) {
    const n = doc.get(k, true);
    if (!n?.items) continue;
    if (['legami', 'voci', 'reazione', 'link'].includes(k)) n.items.forEach((i) => { i.flow = true; });
    else n.flow = true;
  }
  const p = doc.get('prompt', true);
  if (p) p.type = 'QUOTE_DOUBLE';
  const yaml = doc.toString({ lineWidth: 0, flowCollectionPadding: false });
  const c = corpo.replace(/\s+$/, '');
  return `---\n${yaml}---\n${c ? c + '\n' : ''}`;
}

function elenca(radice, c) {
  const fuori = [], giu = (d) => {
    if (!existsSync(d)) return;
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) giu(p); else if (e.name.endsWith('.md')) fuori.push(relative(radice, p).split(sep).join('/'));
    }
  };
  giu(join(radice, c));
  return fuori.sort();
}

const leggi = (radice, p) => ({ p, id: basename(p, '.md'), ...frontmatter(readFileSync(join(radice, p), 'utf8')) });

// Tutto l'archivio in memoria: Map id → {p, id, dati, corpo}; i nodi con `genere`. Ordinati per id (= per tempo).
export function carica(radice) {
  const mappa = (c) => new Map(elenca(radice, c).map((p) => { const n = leggi(radice, p); return [n.id, n]; }));
  const nodi = new Map();
  for (const g of GENERI) for (const [id, n] of mappa(g)) nodi.set(id, { ...n, genere: g });
  return { frammenti: mappa('frammenti'), letture: mappa('letture'), restituzioni: mappa('restituzioni'), nodi };
}

// L'indice per candidati() e la tabella degli alias (§3.6): i nodi vivi, senza lapidi.
export function indice(nodi) {
  return [...nodi.values()].filter((n) => !n.dati['fuso-in'])
    .map((n) => ({ slug: n.id, nome: n.dati.nome, alias: n.dati.alias ?? [], cerchia: n.dati.cerchia, genere: n.genere }));
}

export function tabellaAlias(nodi) {
  const righe = new Set();
  for (const n of indice(nodi)) for (const f of [n.nome, ...n.alias]) righe.add(`${chiave(f)} → ${n.slug} (${n.genere})`);
  return [...righe].sort();
}
