// Carica e compila gli schemi (schema/frontmatter.json, schema/piano.json) e legge il frontmatter di un file.
import { readFileSync } from 'node:fs';
import { basename, dirname } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';

const radice = new URL('../schema/', import.meta.url);
const leggi = (nome) => JSON.parse(readFileSync(new URL(nome, radice), 'utf8'));

// strictTypes spento: lo schema del §3.7 è trascritto alla lettera e ha due "pattern"/"properties" senza "type".
export const ajv = new Ajv2020({ allErrors: true, strictTypes: false });
export const schemaFrontmatter = leggi('frontmatter.json');
export const schemaPiano = leggi('piano.json');
ajv.addSchema(schemaFrontmatter).addSchema(schemaPiano);

export const GENERI = ['persone', 'opere', 'citazioni', 'temi', 'raccolte'];
const TIPI = { frammenti: 'frammento', letture: 'lettura', restituzioni: 'restituzione' };

const validatori = {};
export function validatore(tipo) {
  const id = tipo ? `${schemaFrontmatter.$id}#/$defs/${tipo}` : schemaFrontmatter.$id;
  return (validatori[id] ??= ajv.getSchema(id));
}
export const validaPiano = ajv.getSchema(schemaPiano.$id);

// Il tipo dalla cartella: frammenti/AAAA/MM/x.md → frammento; persone/x.md → nodo (con _genere).
export function tipoDaPercorso(percorso) {
  for (let d = dirname(percorso); d && d !== '.' && d !== '/'; d = dirname(d)) {
    const c = basename(d);
    if (TIPI[c]) return { tipo: TIPI[c] };
    if (GENERI.includes(c)) return { tipo: 'nodo', genere: c };
  }
  return null;
}

// Frontmatter YAML 1.2 (core: date e ore restano stringhe) → oggetto, e corpo.
export function frontmatter(testo) {
  const m = /^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(testo.replace(/\r\n/g, '\n'));
  if (!m) throw new Error('frontmatter mancante');
  return { dati: parse(m[1]) ?? {}, corpo: m[2] };
}

// Valida un file del repository; restituisce l'elenco degli errori (vuoto se valido).
export function validaFile(percorso, testo = readFileSync(percorso, 'utf8')) {
  const t = tipoDaPercorso(percorso);
  if (!t) return [`${percorso}: cartella sconosciuta`];
  const { dati } = frontmatter(testo);
  const oggetto = t.genere ? { ...dati, _genere: t.genere } : dati;
  const v = validatore(t.tipo);
  return v(oggetto) ? [] : v.errors.map((e) => `${percorso}: ${e.instancePath || '/'} ${e.message}`);
}
