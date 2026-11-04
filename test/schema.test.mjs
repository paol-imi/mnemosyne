// Blocco 0: gli schemi compilano, gli esempi del modello §3.3–§3.5 validano e una copia con un campo sbagliato no;
// i piani del modello §2.2 e di prompt/formato-piano.md validano; l'albero delle cartelle c'è.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';

const RADICE = new URL('../', import.meta.url).pathname;
const FIX = join(RADICE, 'test/fixture');
const leggiJson = (p) => JSON.parse(readFileSync(join(RADICE, p), 'utf8'));
const frontmatter = leggiJson('schema/frontmatter.json');
const piano = leggiJson('schema/piano.json');

// strictTypes spento: il §3.7, copiato alla lettera, ha un "pattern" e un "properties" senza "type".
const ajv = new Ajv2020({ allErrors: true, strictTypes: false }).addSchema(frontmatter).addSchema(piano);
const valida = (tipo) => ajv.getSchema(`memo/schema-3#/$defs/${tipo}`);
const validaPiano = ajv.getSchema('memo/piano-3');

// Il frontmatter di un file (YAML 1.2 core: date e ore restano stringhe), con _genere per i nodi.
const GENERI = ['persone', 'opere', 'citazioni', 'temi', 'raccolte'];
function dati(rel) {
  const testo = readFileSync(join(FIX, 'esempi', rel), 'utf8');
  const m = /^---\n([\s\S]*?)\n---(\n|$)/.exec(testo);
  assert.ok(m, `${rel}: frontmatter mancante`);
  const d = parse(m[1]);
  const genere = GENERI.find((g) => rel.split('/').includes(g));
  return genere ? { ...d, _genere: genere } : d;
}
function errori(v, x) { return v(x) ? null : JSON.stringify(v.errors.map((e) => `${e.instancePath} ${e.message}`)); }

test('schema/*.json compila con ajv (draft 2020-12, strict di default)', () => {
  for (const s of [frontmatter, piano]) {
    const a = new Ajv2020({ logger: false });
    assert.equal(typeof a.compile(s), 'function');
  }
});

// Lo schema 4 (progetto/sito/dimensioni.md §3.2) tolto, campo per campo: ciò che resta è il §3.7 alla lettera.
function senzaSchema4(s) {
  const x = structuredClone(s), d = x.$defs, nodo = d.nodo;
  for (const k of ['tipo', 'specie', 'campo']) { delete d[k]; delete nodo.properties[k]; }
  d.legame.properties.campo.enum = d.legame.properties.campo.enum.filter((v) => !['tipo', 'specie', 'campo'].includes(v));
  for (const t of [nodo, d.lettura, d.restituzione]) t.properties.schema = { const: 3 };
  nodo.allOf = nodo.allOf.filter((r) => !r.$comment?.startsWith('schema 4') && !(r.if?.required?.includes('campo') && r.if.properties?._genere));
  for (const r of nodo.allOf) {
    const nomi = r.then?.propertyNames?.enum;
    if (nomi) r.then.propertyNames.enum = nomi.filter((v) => !['tipo', 'specie', 'campo'].includes(v));
    const no = r.then?.not?.anyOf;
    if (no) r.then.not.anyOf = no.filter((v) => !v.required.includes('campo'));
  }
  const cosa = d.restituzione.properties.voci.items.properties.cosa;
  cosa.enum = cosa.enum.map((v) => (v === 'canzone' ? 'brano' : v));
  return x;
}

test('schema/frontmatter.json è il modello §3.7 alla lettera, più lo schema 4 di dimensioni.md §3.2', () => {
  const t = readFileSync(join(RADICE, 'progetto/pacchetto/02-modello-v3.md'), 'utf8');
  const da = t.indexOf('```json', t.indexOf('### 3.7')) + 7;
  const modello = JSON.parse(t.slice(da, t.indexOf('```', da)));
  const { title, $comment, ...resto } = senzaSchema4(frontmatter);
  assert.deepEqual(resto, modello);
});

test('schema 4: i campi delle dimensioni, dove stanno e dove no', () => {
  const nodo = valida('nodo'), base = { schema: 4, nome: 'x', 'nato-da': ['20261004-0000-u01'] };
  assert.equal(errori(nodo, { ...base, _genere: 'opere', tipo: 'canzone', campo: ['musica'] }), null);
  assert.equal(errori(nodo, { ...base, _genere: 'temi', specie: 'corrente', campo: ['filosofia'] }), null);
  assert.equal(errori(nodo, { ...base, _genere: 'persone', cerchia: 'mondo', campo: ['filosofia', 'psicologia'] }), null);
  assert.equal(nodo({ ...base, _genere: 'persone', cerchia: 'vita', campo: ['filosofia'] }), false, 'vita senza campo');
  assert.equal(nodo({ ...base, _genere: 'temi', specie: 'stato', campo: ['filosofia'] }), false, 'campo solo sulle correnti');
  assert.equal(nodo({ ...base, _genere: 'temi', campo: ['filosofia'] }), false, 'campo senza specie');
  assert.equal(nodo({ ...base, _genere: 'opere', campo: ['a', 'b'].map(() => 'arte') }), false, 'senza doppioni');
  assert.equal(nodo({ ...base, _genere: 'opere', campo: ['arte', 'musica', 'cinema'] }), false, 'al più 2');
  assert.equal(nodo({ ...base, _genere: 'opere', tipo: 'brano' }), false, 'vocabolario chiuso');
  assert.equal(nodo({ ...base, _genere: 'citazioni', campo: ['filosofia'] }), false, 'mai sulle citazioni');
  assert.equal(nodo({ ...base, schema: 3, _genere: 'opere', tipo: 'film' }), false, 'solo su un nodo a schema 4');
  assert.equal(nodo({ ...base, _genere: 'opere', 'fuso-in': 'y', tipo: 'film' }), false, 'mai su una lapide');
});

test('§3.3: una lettura senza risposta valida solo se importata (con fonte)', () => {
  const d = dati('letture/2026/11/20261103-2340-k7q2.md');
  delete d.risposta;
  assert.equal(valida('lettura')(d), false);
  assert.equal(errori(valida('lettura'), { ...d, fonte: 'atlante/nucleo.md:19@abc1234' }), null);
});

// [sezione, file, tipo, il campo sbagliato]
const ESEMPI = [
  ['§3.3 lettura', 'letture/2026/11/20261103-2340-k7q2.md', 'lettura', (d) => { d.intento = ['salva', 'ricorda']; }],
  ['§3.3 legame', 'letture/2026/11/20261103-2340-k7q2.md', 'lettura', (d) => { d.legami[3].come = 'aggiunge'; }],
  ['§3.3 prompt', 'letture/2026/11/20261103-2340-k7q2.md', 'lettura', (d) => { d.prompt = '3f9a2c'; }],
  ['§3.4 persona', 'persone/umberto-galimberti.md', 'nodo', (d) => { d.cerchia = 'famiglia'; }],
  ['§3.4 citazione', 'citazioni/il-nichilismo-e-l-ospite-inquietante.md', 'nodo', (d) => { d['attribuita-a'] = ['Umberto Galimberti']; }],
  ['§3.4 citazione consolidata', 'consolidata/citazioni/il-nichilismo-e-l-ospite-inquietante.md', 'nodo', (d) => { d.esito = 'vera'; }],
  ['§3.4 lapide', 'temi/stare-da-solo.md', 'nodo', (d) => { d.alias = ['solo']; }],
  ['§3.5 restituzione', 'restituzioni/2026/11/r-20261103-2341-risposta.md', 'restituzione', (d) => { d.voci[0].cosa = 'brano'; }],
  ['§3.5 senza registrato', 'restituzioni/2026/11/r-20261103-2341-risposta.md', 'restituzione', (d) => { delete d.registrato; }],
];

test('le sei fixture sono gli esempi del modello §3.3–§3.5, nello stesso ordine', () => {
  const t = readFileSync(join(RADICE, 'progetto/pacchetto/02-modello-v3.md'), 'utf8');
  const sez = t.slice(t.indexOf('### 3.3'), t.indexOf('### 3.6'));
  const blocchi = [...sez.matchAll(/```(?:yaml|md)\n([\s\S]*?)```/g)]
    .map((m) => /^---\n([\s\S]*?)\n---(\n|$)/m.exec(m[1])).filter(Boolean).map((m) => parse(m[1]));
  const file = ['letture/2026/11/20261103-2340-k7q2.md', 'persone/umberto-galimberti.md',
    'citazioni/il-nichilismo-e-l-ospite-inquietante.md', 'consolidata/citazioni/il-nichilismo-e-l-ospite-inquietante.md',
    'temi/stare-da-solo.md', 'restituzioni/2026/11/r-20261103-2341-risposta.md'];
  assert.equal(blocchi.length, file.length);
  file.forEach((rel, i) => { const { _genere, ...d } = dati(rel); assert.deepEqual(d, blocchi[i], rel); });
});

for (const [sez, rel, tipo, sbaglia] of ESEMPI) {
  test(`${sez}: l'esempio del modello valida, la copia con un campo sbagliato no`, () => {
    const d = dati(rel);
    assert.equal(errori(valida(tipo), d), null);
    assert.equal(errori(ajv.getSchema('memo/schema-3'), d), null, 'anche dalla radice');
    const copia = structuredClone(d);
    sbaglia(copia);
    assert.equal(valida(tipo)(copia), false);
  });
}

test('§3.4: una persona fuori da persone/ non valida (il genere conta)', () => {
  assert.equal(valida('nodo')({ ...dati('persone/umberto-galimberti.md'), _genere: 'temi' }), false);
});

test('la radice rifiuta ciò che non è nessuno dei quattro tipi', () => {
  assert.equal(ajv.getSchema('memo/schema-3')({ schema: 3, nome: 'x' }), false);
});

test('i piani del modello §2.2 e di prompt/formato-piano.md validano', () => {
  // [fixture, file del pacchetto, sezione da cui parte la ricerca del blocco json]
  for (const [f, md, da] of [['piano-2.2.json', 'progetto/pacchetto/02-modello-v3.md', '### 2.2'], ['piano-formato.json', 'prompt/formato-piano.md', '# Il piano']]) {
    const t = readFileSync(join(RADICE, md), 'utf8');
    const i = t.indexOf('```json', t.indexOf(da)) + 7;
    assert.deepEqual(leggiJson(`test/fixture/${f}`), JSON.parse(t.slice(i, t.indexOf('```', i))), `${f} è l'esempio di ${md}`);
    assert.equal(errori(validaPiano, leggiJson(`test/fixture/${f}`)), null, f);
  }
});

test('piano: le regole delle operazioni', () => {
  const base = leggiJson('test/fixture/piano-formato.json');
  const con = (cambia) => { const p = structuredClone(base); cambia(p); return validaPiano(p); };
  const lapide = { op: 'lapide', da: 'stare-da-solo', in: 'solitudine', perche: 'fusione mensile' };
  assert.equal(con((p) => { p.operazioni[4].voci[0].n = 1; }), false, 'mai un numero n nelle voci');
  assert.equal(con((p) => { delete p.operazioni[0].nome; }), false, 'crea-nodo senza nome');
  assert.equal(con((p) => { p.operazioni[0].cerchia = 'famiglia'; }), false);
  assert.equal(con((p) => { p.operazioni[3].legami[0].a = 'Umberto Galimberti'; }), false, 'né slug né @Nome né ~Nome');
  assert.equal(con((p) => { p.operazioni[3].parole = 'cultura'; }), false, 'parole è sempre una lista');
  assert.equal(con((p) => { p.operazioni[2].esito = 'verificata'; }), false, 'smista: una citazione nuova senza esito');
  assert.equal(con((p) => { p.operazioni[3].versione = 2; }), false, 'smista scrive solo la versione 1');
  assert.equal(con((p) => { p.operazioni.push(lapide); }), false, 'lapide solo in consolida');
  assert.equal(con((p) => { p.ciclo = 'consolida'; p.operazioni.splice(3, 1); p.operazioni.push(lapide); }), true);
  assert.equal(con((p) => { p.ciclo = 'consolida'; p.operazioni[3].versione = 1; }), false, 'consolida: una lettura è una versione ≥ 2');
  assert.equal(con((p) => { p.ciclo = 'consolida'; p.operazioni[3].versione = 2; }), true);
  assert.equal(con((p) => { p.operazioni.push({ op: 'alias', nodo: '@Umberto Galimberti', alias: ['umberto'] }); }), true);
  assert.equal(con((p) => { p.operazioni.push({ op: 'teletrasporta' }); }), false);
  const agg = { op: 'aggiorna-nodo', nodo: 'il-nichilismo-e-l-ospite-inquietante', campi: { esito: 'simile' } };
  assert.equal(con((p) => { p.ciclo = 'consolida'; p.operazioni.splice(3, 1); p.operazioni.push(agg); }), true);
  assert.equal(con((p) => { p.ciclo = 'consolida'; p.operazioni.splice(3, 1); p.operazioni.push({ ...agg, corpo: 'x' }); }), false, 'aggiorna-nodo: solo nodo e campi');
  assert.equal(con((p) => { p.ciclo = 'ritratto'; }), false, 'ritratto: solo la restituzione ritratto');
  assert.equal(con((p) => { p.ciclo = 'lettera'; }), false, 'lettera non scrive: nessun piano');
  assert.equal(con((p) => { delete p.operazioni[4].per; }), false, 'una risposta ha per');
  assert.equal(con((p) => { p.operazioni[4].registrato = '2026-11-03T23:41:05+01:00'; }), false, 'registrato lo mette lo script');
});

test('piano: legame e voce sono quelli del §3.7, con @Nome dove il §3.7 vuole uno slug', () => {
  const sost = (s) => JSON.stringify(s)
    .replaceAll('#/$defs/nodo-o-chiaro"', '#/$defs/nodo-o-chiaro-o-nuovo"')
    .replaceAll('#/$defs/oggetto"', '#/$defs/oggetto-o-nuovo"')
    .replaceAll('#/$defs/slug"', '#/$defs/slug-o-nuovo"');
  assert.equal(JSON.stringify(piano.$defs.legame), sost(frontmatter.$defs.legame));
  for (const k of ['idF', 'idR', 'slug', 'chiaro', 'modello', 'voce', 'intento']) {
    assert.deepEqual(piano.$defs[k], frontmatter.$defs[k], k);
  }
});

test("l'albero: le cartelle vuote hanno il loro .gitkeep", () => {
  for (const d of 'ingresso frammenti letture persone opere citazioni temi raccolte restituzioni contesto riserva'.split(' ')) {
    assert.ok(readdirSync(join(RADICE, d)).includes('.gitkeep'), d);
  }
});

test('piano: nodo (alias, aggiorna-nodo, correzione) è slug o @Nome, mai ~Nome; la lapide vuole slug', () => {
  const base = leggiJson('test/fixture/piano-formato.json');
  const con = (cambia) => { const p = structuredClone(base); p.ciclo = 'consolida'; p.operazioni.splice(3, 1); cambia(p); return validaPiano(p); };
  const corr = (nodo) => ({ op: 'lettura', frammento: '20261104-0812-b3n8', versione: 2, intento: ['salva'], legami: [
    { p: 'ritorna-su', a: '20261103-2340-k7q2', come: 'corregge', voce: 'sua', perche: '«non era jung»', nodo, campo: 'autore', valore: 'peterson' }] });
  for (const [nodo, atteso] of [['umberto-galimberti', true], ['@Umberto Galimberti', true], ['~Umberto Galimberti', false]]) {
    assert.equal(con((p) => { p.operazioni.push({ op: 'alias', nodo, alias: ['umberto'] }); }), atteso, `alias ${nodo}`);
    assert.equal(con((p) => { p.operazioni.push({ op: 'aggiorna-nodo', nodo, campi: { scopo: 'x' } }); }), atteso, `aggiorna-nodo ${nodo}`);
    assert.equal(con((p) => { p.operazioni.push(corr(nodo)); }), atteso, `correzione ${nodo}`);
  }
  const lapide = { op: 'lapide', da: 'stare-da-solo', in: 'solitudine', perche: 'fusione mensile' };
  assert.equal(con((p) => { p.operazioni.push(lapide); }), true);
  for (const k of ['da', 'in']) for (const v of ['@Solitudine', '~Solitudine']) {
    assert.equal(con((p) => { p.operazioni.push({ ...lapide, [k]: v }); }), false, `lapide ${k}: ${v}`);
  }
});
