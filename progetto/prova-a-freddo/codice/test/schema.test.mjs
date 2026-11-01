import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { stringify } from 'yaml';
import { ajv, schemaFrontmatter, schemaPiano, validatore, validaPiano, validaFile, frontmatter, tipoDaPercorso } from '../scripts/schema.mjs';

const FIX = new URL('./fixture/', import.meta.url).pathname;
const leggi = (p) => readFileSync(join(FIX, p), 'utf8');
const json = (p) => JSON.parse(leggi(p));

// Riscrive il frontmatter di un esempio cambiando un campo (la "copia con un campo sbagliato").
function copiaSbagliata(p, cambia) {
  const { dati, corpo } = frontmatter(leggi(p));
  cambia(dati);
  return `---\n${stringify(dati)}---\n${corpo}`;
}

test('i due schemi compilano con ajv (draft 2020-12, modo strict di default)', () => {
  for (const s of [schemaFrontmatter, schemaPiano]) {
    const a = new Ajv2020({ strictTypes: false, allErrors: true });
    assert.equal(typeof a.compile(s), 'function');
  }
  assert.ok(validatore() && validaPiano);
});

test('il tipo dalla cartella', () => {
  assert.deepEqual(tipoDaPercorso('frammenti/2026/11/x.md'), { tipo: 'frammento' });
  assert.deepEqual(tipoDaPercorso('citazioni/x.md'), { tipo: 'nodo', genere: 'citazioni' });
  assert.equal(tipoDaPercorso('contesto/mappa.md'), null);
});

const ESEMPI = [
  ['§3.2', 's3.2/frammenti/20261103-2340-k7q2.md', (d) => { d.canale = 'whatsapp'; }],
  ['§3.2 chat', 's3.2/frammenti/20261114-2104-c1a7.md', (d) => { d.registrato = '2026-11-14'; }],
  ['§3.3', 's3.3/letture/20261103-2340-k7q2.md', (d) => { d.intento = ['salva', 'ricorda']; }],
  ['§3.3 legame', 's3.3/letture/20261103-2340-k7q2.md', (d) => { d.legami[3].come = 'aggiunge'; }],
  ['§3.4 persona', 's3.4/persone/umberto-galimberti.md', (d) => { d.cerchia = 'famiglia'; }],
  ['§3.4 citazione', 's3.4/citazioni/il-nichilismo-e-l-ospite-inquietante.md', (d) => { d['attribuita-a'] = ['Umberto Galimberti']; }],
  ['§3.4 citazione consolidata', 's3.4-consolida/citazioni/il-nichilismo-e-l-ospite-inquietante.md', (d) => { d.esito = 'vera'; }],
  ['§3.4 lapide', 's3.4/temi/stare-da-solo.md', (d) => { d.alias = ['solo']; }],
  ['§3.5', 's3.5/restituzioni/r-20261103-2341-risposta.md', (d) => { d.voci[0].cosa = 'canzone'; }],
];

for (const [sez, p, cambia] of ESEMPI) {
  test(`${sez}: l'esempio del modello valida, la copia sbagliata no`, () => {
    assert.deepEqual(validaFile(p, leggi(p)), []);
    assert.notDeepEqual(validaFile(p, copiaSbagliata(p, cambia)), []);
  });
}

test('§3.4: una persona fuori da persone/ non passa (il genere conta)', () => {
  const p = 's3.4/persone/umberto-galimberti.md';
  assert.notDeepEqual(validaFile('temi/umberto-galimberti.md', leggi(p)), []);
});

test('§3.5: l\'esempio del modello (§13.2) senza registrato non valida', () => {
  const p = 's3.5/restituzioni/r-20261103-2341-risposta.md';
  assert.notDeepEqual(validaFile(p, copiaSbagliata(p, (d) => { delete d.registrato; })), []);
});

test('la radice dello schema sceglie il tipo dalle chiavi', () => {
  const v = validatore();
  const { dati } = frontmatter(leggi('s3.3/letture/20261103-2340-k7q2.md'));
  assert.ok(v(dati));
  assert.ok(v({ ...frontmatter(leggi('s3.4/temi/stare-da-solo.md')).dati, _genere: 'temi' }));
  assert.ok(!v({ schema: 3, nome: 'x' }));
});

test('il piano di prompt/formato-piano.md valida', () => {
  assert.ok(validaPiano(json('piano-formato.json')), JSON.stringify(validaPiano.errors));
});

test('il piano piatto del modello §2.2 non valida (vince l\'involucro)', () => {
  assert.ok(!validaPiano(json('piano-piatto-2.2.json')));
});

test('piano: le regole delle operazioni', () => {
  const base = json('piano-formato.json');
  const con = (cambia) => { const p = structuredClone(base); cambia(p); return validaPiano(p); };
  assert.ok(!con((p) => { p.operazioni[3].voci[0].n = 1; }), 'mai un numero n nelle voci');
  assert.ok(!con((p) => { p.operazioni[0].nome = undefined; delete p.operazioni[0].nome; }), 'crea-nodo senza nome');
  assert.ok(!con((p) => { p.operazioni[0].cerchia = 'famiglia'; }));
  assert.ok(!con((p) => { p.operazioni[2].legami[0].a = 'Umberto Galimberti'; }), 'né slug né @Nome né ~Nome');
  assert.ok(!con((p) => { p.operazioni[2].versione = 1; }), 'la versione la mette lo script');
  assert.ok(!con((p) => { p.operazioni.push({ op: 'lapide', da: 'stare-da-solo', in: 'solitudine', perche: 'fusione mensile' }); }), 'lapide solo in consolida');
  assert.ok(con((p) => { p.ciclo = 'consolida'; p.operazioni.push({ op: 'lapide', da: 'stare-da-solo', in: 'solitudine', perche: 'fusione mensile' }); }));
  assert.ok(con((p) => { p.operazioni.push({ op: 'alias', nodo: '@Umberto Galimberti', alias: 'umberto' }); }));
  assert.ok(!con((p) => { p.operazioni.push({ op: 'teletrasporta' }); }));
  assert.ok(!con((p) => { p.ciclo = 'ritratto'; }), 'ritratto: solo una restituzione forma ritratto');
  assert.ok(!con((p) => { delete p.operazioni[3].per; }), 'una risposta ha per');
});

test('piano: legame e voce sono quelli del §3.7, con @Nome al posto dello slug', () => {
  const sost = (s) => JSON.stringify(s)
    .replaceAll('#/$defs/nodo-o-chiaro"', '#/$defs/nodo-o-chiaro-o-nuovo"')
    .replaceAll('#/$defs/oggetto"', '#/$defs/oggetto-o-nuovo"')
    .replaceAll('#/$defs/slug"', '#/$defs/slug-o-nuovo"');
  assert.equal(JSON.stringify(schemaPiano.$defs.legame), sost(schemaFrontmatter.$defs.legame));
  assert.deepEqual(schemaPiano.$defs.voce, schemaFrontmatter.$defs.voce);
  for (const k of ['idF', 'idR', 'slug', 'chiaro', 'modello']) assert.deepEqual(schemaPiano.$defs[k], schemaFrontmatter.$defs[k]);
});

test('le cartelle dell\'albero hanno tutte un .gitkeep', () => {
  const radice = new URL('../', import.meta.url).pathname;
  for (const d of 'ingresso frammenti letture persone opere citazioni temi raccolte restituzioni contesto riserva'.split(' ')) {
    assert.ok(readdirSync(join(radice, d)).includes('.gitkeep'), d);
  }
});

void ajv;
