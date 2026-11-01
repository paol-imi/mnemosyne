// Blocco 4: applica.mjs, la parte che convalida il piano, numera le voci e salva la restituzione (qui un ritratto).
// Blocco 5: crea-nodo, alias, la lettura v1 con il suo `prompt` e la sua `risposta`, i link puliti e l'oEmbed (senza rete).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applica, prepara, hashPrompt, numeriDelTesto, controllaNumeri, pulisciLink, linkDelTesto, baseSlug } from '../scripts/applica.mjs';
import { frontmatter, verifica, aggiornaHash } from '../scripts/verifica.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const SCRIPT = join(RADICE, 'scripts/applica.mjs');
const FID = '20261103-2340-k7q2';
const ORA = '2026-11-03T22:41:30Z'; // 23:41:30 a Roma
const RIT = 'restituzioni/2026/11/r-20261103-2341-ritratto.md';

// L'archivio minimo di verifica (il caso Galimberti) in una cartella nuova, fuori da ogni repository.
function archivio(t) {
  const dir = mkdtempSync(join(tmpdir(), 'applica-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(join(RADICE, 'test/fixture/verifica/archivio'), dir, { recursive: true });
  process.env.ATLANTE_ORA = ORA;
  process.env.MEMO_RETE = 'no'; // mai la rete nei test: l'oEmbed si finge con l'opzione `rete`
  return dir;
}
const restituzioni = (dir) => readdirSync(join(dir, 'restituzioni/2026/11')).sort();
const ritratto = (testo, voci, extra = {}) => ({ ciclo: 'ritratto', 'letto-da': 'lettore-di-prova',
  operazioni: [{ op: 'restituzione', forma: 'ritratto', testo, voci, ...extra }] });
const TESTO = [
  '# Il punto zero: 31 frasi, entro il 4 ottobre',
  '✦ tue · ◌ proposta',
  '',
  '1. *«uno spezzone di galimberti a teatro»* ✦, il 3 novembre.',
  '2. Il nichilismo e la cultura tornano insieme ◌ [1].',
  '',
  'Che cosa ti manca, quando non sai a chi dirlo?',
].join('\n');
const VOCI = [
  { rif: FID, voce: 'sua', cosa: 'frase' },
  { rif: 'nichilismo', voce: 'proposta', cosa: 'convergenza' },
];

test('un ritratto: id dall\'ora di Roma, voci numerate nell\'ordine, corpo intatto, verifica passa', (t) => {
  const dir = archivio(t);
  const e = applica(ritratto(TESTO, VOCI, { aggancio: { a: FID } }), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.scritti, [RIT]);
  const { dati, corpo } = frontmatter(readFileSync(join(dir, RIT), 'utf8'));
  assert.deepEqual(dati, { schema: 3, forma: 'ritratto', 'letto-da': 'lettore-di-prova', registrato: '2026-11-03T23:41:30+01:00',
    aggancio: { a: FID }, voci: VOCI.map((v, i) => ({ n: i + 1, ...v })) });
  assert.equal(corpo, TESTO + '\n');
  assert.deepEqual(verifica(dir), []);
});

test('l\'id collide: -2, poi -3 (§3.1)', (t) => {
  const dir = archivio(t);
  for (let i = 0; i < 3; i++) assert.deepEqual(applica(ritratto('Una domanda?', []), dir).errori, []);
  assert.deepEqual(restituzioni(dir).filter((f) => f.includes('ritratto')),
    ['r-20261103-2341-ritratto-2.md', 'r-20261103-2341-ritratto-3.md', 'r-20261103-2341-ritratto.md']);
});

test('i numeri del corpo: "1." a inizio riga o "[1]"; non 2[127], non [1](url), non un "1." a metà riga', () => {
  assert.deepEqual(numeriDelTesto('1. a\n  2. b [1] e [3]\nFrammenti postumi 2[127], [4](https://x) e 5. no'), [1, 2, 1, 3]);
  assert.deepEqual(controllaNumeri('[1] a\n2. b\ndi nuovo [1]', 2), []);
  assert.deepEqual(controllaNumeri('niente numeri', 0), []);
  const e = controllaNumeri('2. a\n1. b\n3. c', 2).join('\n');
  assert.match(e, /il 2 viene prima del 1/);
  assert.match(e, /il numero 3 ma le voci sono 2/);
  assert.match(controllaNumeri('1. a', 2).join('\n'), /manca la voce 2/);
});

test('rifiuto con l\'elenco dei motivi, e nessun file scritto', (t) => {
  const dir = archivio(t);
  const prima = restituzioni(dir);
  const e = applica(ritratto('1. a\n3. c', [
    { rif: 'galimberti', voce: 'mondo', cosa: 'persona' },
    { rif: '@Il mondo delle emozioni', voce: 'mondo', cosa: 'opera' },
    { rif: 'r-20261103-2341-risposta#9', voce: 'proposta', cosa: 'ponte' },
  ], { legami: [{ p: 'parla-di', a: 'nichilismo', voce: 'proposta', perche: 'torna', da: 4 }] }), dir);
  const tutto = e.errori.join('\n');
  assert.match(tutto, /manca la voce 2/);
  assert.match(tutto, /il 3 viene prima del 2/);
  assert.match(tutto, /riferimento inesistente galimberti/);
  assert.match(tutto, /@Il mondo delle emozioni: nessun crea-nodo/);
  assert.match(tutto, /riferimento inesistente r-20261103-2341-risposta#9/);
  assert.match(tutto, /dalla voce 4, ma le voci sono 3/);
  assert.deepEqual(e.scritti, []);
  assert.deepEqual(restituzioni(dir), prima);
});

test('lo schema del piano: un ritratto scrive solo la sua restituzione, mai n né registrato', (t) => {
  const dir = archivio(t);
  const m = (p) => prepara(p, dir).errori.join('\n');
  assert.match(m({ ciclo: 'ritratto', operazioni: [] }), /letto-da/);
  assert.match(m({ ...ritratto('x', []), operazioni: [{ op: 'lettura', frammento: FID, intento: ['salva'], legami: [] }] }), /piano\/operazioni\/0/);
  assert.match(m(ritratto('x', [], { forma: 'risposta', per: FID })), /piano\/operazioni\/0\/forma/);
  assert.match(m(ritratto('1. x', [{ n: 1, rif: FID, voce: 'sua', cosa: 'frase' }])), /additional properties/);
  assert.match(m(ritratto('x', [], { registrato: '2026-11-03' })), /additional properties/);
});

test('risposta unica per frammento; aggiorna-nodo, lapide, riserva ancora rifiutati (blocco 8)', (t) => {
  const dir = archivio(t);
  const smista = (operazioni) => ({ ciclo: 'smista', 'letto-da': 'lettore-di-prova', operazioni });
  assert.match(prepara(smista([{ op: 'restituzione', forma: 'risposta', per: FID, testo: 'Ci sono.', voci: [] }]), dir).errori.join('\n'),
    /c'è già la risposta r-20261103-2341-risposta/);
  const e = prepara({ ciclo: 'consolida', 'letto-da': 'lettore-di-prova', operazioni: [
    { op: 'aggiorna-nodo', nodo: 'umberto-galimberti', campi: { alias: ['umberto'] } },
    { op: 'riserva', file: 'ritorno', testo: '' },
    { op: 'lapide', da: 'nichilismo', in: 'umberto-galimberti', perche: 'fusione' },
    { op: 'lettura', frammento: FID, versione: 2, intento: ['salva'], legami: [] },
  ] }, dir).errori.join('\n');
  for (const op of ['aggiorna-nodo', 'riserva', 'lapide']) assert.match(e, new RegExp(`${op}: non ancora fatta da applica.mjs \\(blocco 8`));
  assert.match(e, /lettura 20261103-2340-k7q2: le versioni ≥ 2 non sono ancora fatte/);
});

test('transazionale: se verifica.mjs non passa, il ritratto scritto si toglie', (t) => {
  const dir = archivio(t);
  const f = join(dir, `frammenti/2026/11/${FID}.md`);
  writeFileSync(f, readFileSync(f, 'utf8').replace('teatro, credo', 'teatro credo'));
  const e = applica(ritratto('Una domanda?', []), dir);
  assert.ok(e.errori.some((m) => m.includes('hash diverso')), e.errori.join('\n'));
  assert.match(e.errori.at(-1), /nessun file resta/);
  assert.equal(existsSync(join(dir, RIT)), false);
});

test('prompt: SHA-1 del blob git di CLAUDE.md + prompt/<ciclo>.md + prompt/formato-piano.md, prime 7 cifre', (t) => {
  const dir = archivio(t);
  mkdirSync(join(dir, 'prompt'));
  writeFileSync(join(dir, 'CLAUDE.md'), '# Memo\n');
  writeFileSync(join(dir, 'prompt/ritratto.md'), '# ritratto\n');
  writeFileSync(join(dir, 'prompt/formato-piano.md'), '# piano\n');
  const atteso = execFileSync('git', ['hash-object', '--stdin'], { input: '# Memo\n# ritratto\n# piano\n' }).toString().slice(0, 7);
  const h = hashPrompt(dir, 'ritratto');
  assert.equal(h, atteso);
  writeFileSync(join(dir, 'prompt/formato-piano.md'), '# piano!\n');
  assert.notEqual(hashPrompt(dir, 'ritratto'), h);
  assert.match(hashPrompt(RADICE, 'ritratto'), /^[0-9a-f]{7}$/);
});

test('la riga di comando: 0 e "scritto", poi 1 e "RIFIUTO"', (t) => {
  const dir = archivio(t);
  const piano = join(dir, 'piano.json');
  const lancia = (p) => { writeFileSync(piano, JSON.stringify(p)); return spawnSync('node', [SCRIPT, piano, '--radice', dir], { encoding: 'utf8', env: process.env }); };
  const ok = lancia(ritratto(TESTO, VOCI));
  assert.equal(ok.status, 0, ok.stdout);
  assert.match(ok.stdout, new RegExp(`scritto ${RIT}\nverifica: ok`));
  const no = lancia(ritratto('1. a', []));
  assert.equal(no.status, 1);
  assert.match(no.stdout, /^RIFIUTO restituzione ritratto: nel testo c'è il numero 1 ma le voci sono 0$/m);
});

// ── Blocco 5 ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// L'archivio prima di "smista" per B01: il frammento, il tema dello sguardo, i prompt (per `prompt`), nient'altro.
function primaDiSmista(t) {
  const dir = archivio(t);
  for (const f of ['letture/2026/11/20261103-2340-k7q2.md', 'persone/umberto-galimberti.md', 'opere/spettacolo-sulle-emozioni.md',
    'citazioni/il-nichilismo-e-l-ospite-inquietante.md', 'restituzioni/2026/11/r-20261103-2341-risposta.md']) rmSync(join(dir, f));
  cpSync(join(RADICE, 'CLAUDE.md'), join(dir, 'CLAUDE.md'));
  cpSync(join(RADICE, 'prompt'), join(dir, 'prompt'), { recursive: true });
  return dir;
}
// Un frammento nuovo, come lo lascia `smista.mjs prepara` (con la sua riga in frammenti/.hash).
function frammento(dir, id, corpo, extra = '') {
  const d = join(dir, `frammenti/${id.slice(0, 4)}/${id.slice(4, 6)}`);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, `${id}.md`), `---\nregistrato: ${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}T${id.slice(9, 11)}:${id.slice(11, 13)}:00+01:00\ncanale: telefono\n${extra}---\n${corpo}\n`);
  aggiornaHash(dir);
}
const leggi = (dir, f) => frontmatter(readFileSync(join(dir, f), 'utf8'));
const smista = (operazioni, ciclo = 'smista') => ({ ciclo, 'letto-da': 'lettore-di-prova', operazioni });
const B01 = () => smista([
  { op: 'crea-nodo', genere: 'persone', nome: 'Umberto Galimberti', alias: ['galimberti'], cerchia: 'mondo' },
  { op: 'crea-nodo', genere: 'opere', nome: 'spettacolo sulle emozioni', autore: '@Umberto Galimberti' },
  { op: 'crea-nodo', genere: 'citazioni', nome: "Il nichilismo è l'ospite inquietante", 'attribuita-a': ['@Umberto Galimberti'],
    corpo: 'Passo 1: la frase circola come immagine di Nietzsche, ripresa da Galimberti in un libro (da verificare).' },
  { op: 'lettura', frammento: FID, intento: ['salva'], reazione: [{ parole: 'molto interessante', verso: '+' }],
    legami: [
      { p: 'nomina', a: '@Umberto Galimberti', voce: 'sua', perche: '«uno spezzone di galimberti a teatro»' },
      { p: 'nomina', a: '@spettacolo sulle emozioni', voce: 'sua', perche: '«credo lo spettacolo sulle emozioni»' },
      { p: 'nomina', a: "@Il nichilismo è l'ospite inquietante", voce: 'sua', perche: "«il nichilismo è l'ospite inquietante», detto da Galimberti secondo te" },
      { p: 'parla-di', a: 'nichilismo', voce: 'sua', perche: 'parola tua' }],
    parole: ['ragazzo', 'cultura'] },
  { op: 'restituzione', forma: 'risposta', per: FID,
    testo: '**Salvato.**\n1. "L\'ospite inquietante" è un\'immagine di Nietzsche ○, che Galimberti ha ripreso in un libro ⚠.\n2. Lo spettacolo forse è *Il mondo delle emozioni* ⚠.',
    voci: [
      { rif: "@Il nichilismo è l'ospite inquietante", voce: 'mondo', cosa: 'citazione', riferimento: 'Frammenti postumi, 2[127] (da verificare)' },
      { rif: '@spettacolo sulle emozioni', voce: 'mondo', cosa: 'opera' }] },
]);

test('B01 dal piano: i file del modello §3.3–§3.5, @Nome → slug, nato-da dal frammento, risposta collegata', (t) => {
  const dir = primaDiSmista(t), FIXA = join(RADICE, 'test/fixture/verifica/archivio');
  const e = applica(B01(), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.avvisi, []);
  const RISP = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
  assert.deepEqual(e.scritti.sort(), ['citazioni/il-nichilismo-e-l-ospite-inquietante.md', `letture/2026/11/${FID}.md`,
    'opere/spettacolo-sulle-emozioni.md', 'persone/umberto-galimberti.md', RISP]);
  for (const f of e.scritti.filter((x) => !x.startsWith('letture') && !x.startsWith('restituzioni')))
    assert.deepEqual(leggi(dir, f), leggi(FIXA, f), f); // la citazione: solo nome, attribuita-a, nato-da e la traccia (G4)
  const l = leggi(dir, `letture/2026/11/${FID}.md`).dati, atteso = leggi(FIXA, `letture/2026/11/${FID}.md`).dati;
  assert.deepEqual(l, { ...atteso, 'letto-da': 'lettore-di-prova', prompt: hashPrompt(dir, 'smista') });
  assert.equal(l.risposta, 'r-20261103-2341-risposta');
  assert.deepEqual(Object.keys(l).slice(0, 4), ['schema', 'versione', 'letto-da', 'prompt']);
  assert.deepEqual(leggi(dir, RISP).dati.voci, leggi(FIXA, RISP).dati.voci);
  assert.deepEqual(verifica(dir), []);
});

test('lo slug: una citazione dalle prime 6 parole; lo stesso nodo non rinasce (alias); un\'altra cosa prende il genere', (t) => {
  const dir = archivio(t);
  cpSync(join(RADICE, 'CLAUDE.md'), join(dir, 'CLAUDE.md'));
  cpSync(join(RADICE, 'prompt'), join(dir, 'prompt'), { recursive: true });
  assert.equal(baseSlug('citazioni', 'Ciò a cui resisti persiste, e diventa più forte'), 'cio-a-cui-resisti-persiste-e');
  assert.equal(baseSlug('persone', 'Ciò a cui resisti persiste, e diventa più forte'), 'cio-a-cui-resisti-persiste-e-diventa-piu-forte');
  const F2 = '20261104-0812-b3n8';
  frammento(dir, F2, 'ancora galimberti, il nichilismo. come un nichilismo da romanzo');
  const prima = readFileSync(join(dir, 'opere/spettacolo-sulle-emozioni.md'));
  const e = applica(smista([
    { op: 'crea-nodo', genere: 'persone', nome: 'umberto galimberti', alias: ['Galimberti', 'Umberto'], cerchia: 'mondo' },
    { op: 'crea-nodo', genere: 'opere', nome: 'Nichilismo' },
    { op: 'crea-nodo', genere: 'citazioni', nome: "Il nichilismo è l'ospite inquietante", alias: ["l'ospite inquietante"] },
    { op: 'crea-nodo', genere: 'citazioni', nome: 'Come un nichilismo da romanzo russo di fine secolo' },
    { op: 'lettura', frammento: F2, intento: ['salva'], risposta: 'salvato', legami: [
      { p: 'nomina', a: '@umberto galimberti', voce: 'sua', perche: '«ancora galimberti»' },
      { p: 'nomina', a: '@Nichilismo', voce: 'sua', perche: '«un nichilismo da romanzo»' },
      { p: 'nomina', a: "@Il nichilismo è l'ospite inquietante", voce: 'sua', perche: '«il nichilismo»' },
      { p: 'nomina', a: '@Come un nichilismo da romanzo russo di fine secolo', voce: 'sua', perche: '«come un nichilismo da romanzo»' }] },
  ]), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.scritti.sort(), ['citazioni/come-un-nichilismo-da-romanzo-russo.md', 'citazioni/il-nichilismo-e-l-ospite-inquietante.md',
    `letture/2026/11/${F2}.md`, 'opere/nichilismo-opera.md', 'persone/umberto-galimberti.md']);
  assert.deepEqual(leggi(dir, 'persone/umberto-galimberti.md').dati.alias, ['galimberti', 'Umberto']); // §8.2: niente doppioni
  assert.deepEqual(leggi(dir, 'persone/umberto-galimberti.md').dati['nato-da'], [FID]);
  assert.deepEqual(leggi(dir, 'opere/nichilismo-opera.md').dati, { schema: 3, nome: 'Nichilismo', 'nato-da': [F2] });
  assert.deepEqual(leggi(dir, 'citazioni/il-nichilismo-e-l-ospite-inquietante.md').dati.alias, ["l'ospite inquietante"]);
  assert.deepEqual(leggi(dir, 'citazioni/come-un-nichilismo-da-romanzo-russo.md').dati,
    { schema: 3, nome: 'Come un nichilismo da romanzo russo di fine secolo', 'nato-da': [F2] });
  assert.deepEqual(leggi(dir, `letture/2026/11/${F2}.md`).dati.legami.map((x) => x.a),
    ['umberto-galimberti', 'nichilismo-opera', 'il-nichilismo-e-l-ospite-inquietante', 'come-un-nichilismo-da-romanzo-russo']);
  assert.deepEqual(readFileSync(join(dir, 'opere/spettacolo-sulle-emozioni.md')), prima);
});

test('alias: si aggiunge al nodo (per chiave, senza doppioni); un nodo che non c\'è si rifiuta; a un nodo nuovo va nella nascita', (t) => {
  const dir = archivio(t);
  const e = applica(smista([
    { op: 'alias', nodo: 'umberto-galimberti', alias: ['umberto', 'GALIMBERTI', 'Umberto'] },
    { op: 'alias', nodo: 'spettacolo-sulle-emozioni', alias: ['lo spettacolo sulle emozioni'] }, // la stessa chiave: niente
  ]), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.scritti, ['persone/umberto-galimberti.md']);
  assert.deepEqual(leggi(dir, 'persone/umberto-galimberti.md').dati,
    { schema: 3, nome: 'Umberto Galimberti', alias: ['galimberti', 'umberto'], cerchia: 'mondo', 'nato-da': [FID] });
  assert.match(prepara(smista([{ op: 'alias', nodo: 'marco', alias: ['marchino'] }]), dir).errori.join('\n'), /alias marco: il nodo marco non esiste/);
  const p = prepara(smista([
    { op: 'crea-nodo', genere: 'persone', nome: 'Marco', cerchia: 'vita', 'nato-da': [FID] },
    { op: 'alias', nodo: '@Marco', alias: ['marco della palestra'] }]), dir);
  assert.deepEqual(p.errori, []);
  assert.deepEqual(p.file.map((f) => [f.percorso, f.dati.alias]), [['persone/marco.md', ['marco della palestra']]]);
});

test('transazionale: se verifica.mjs non passa, il nodo a cui si era aggiunto un alias torna com\'era', (t) => {
  const dir = archivio(t);
  const nodo = join(dir, 'persone/umberto-galimberti.md'), prima = readFileSync(nodo);
  const f = join(dir, `frammenti/2026/11/${FID}.md`);
  writeFileSync(f, readFileSync(f, 'utf8').replace('teatro, credo', 'teatro credo'));
  const e = applica(smista([{ op: 'alias', nodo: 'umberto-galimberti', alias: ['umberto'] }]), dir);
  assert.match(e.errori.at(-1), /nessun file resta/);
  assert.deepEqual(readFileSync(nodo), prima);
});

test('la lettura: risposta dal piano (per e copre), oppure salvato / ci-sono / l\'id di una risposta che c\'è', (t) => {
  const dir = primaDiSmista(t);
  const A = '20261104-0810-aaa1', B = '20261104-0811-bbb2', C = '20261104-0812-ccc3';
  frammento(dir, A, 'primo pezzo');
  frammento(dir, B, 'secondo pezzo');
  frammento(dir, C, 'boh');
  const lett = (frammento, extra = {}) => ({ op: 'lettura', frammento, intento: ['salva'], legami: [], ...extra });
  const e = applica(smista([
    lett(A), lett(B),
    { op: 'restituzione', forma: 'risposta', per: B, copre: [A], testo: '**Salvato.**', voci: [] },
    lett(C, { intento: ['niente'], risposta: 'ci-sono' }),
  ]), dir);
  assert.deepEqual(e.errori, []);
  const r = (id) => leggi(dir, `letture/2026/11/${id}.md`).dati.risposta;
  assert.deepEqual([r(A), r(B), r(C)], ['r-20261103-2341-risposta', 'r-20261103-2341-risposta', 'ci-sono']);
  const D = '20261104-0813-ddd4';
  frammento(dir, D, 'ah e un\'altra cosa');
  assert.deepEqual(applica(smista([lett(D, { risposta: 'r-20261103-2341-risposta' })]), dir).errori, []); // §8.2: la raffica di prima
});

test('la lettura si rifiuta con l\'elenco dei motivi', (t) => {
  const dir = primaDiSmista(t);
  const N = '20261104-0900-nnn1';
  frammento(dir, N, 'chi ha detto che il dolore è un dono? mi ha fatto pensare', 'intento: [chiedi]\n');
  const e = prepara(smista([
    { op: 'lettura', frammento: N, intento: ['salva'], reazione: [{ parole: 'mi ha fatto riflettere', verso: '+' }], legami: [], risposta: 'salvato' },
    { op: 'restituzione', forma: 'risposta', per: N, testo: 'Ci sono.', voci: [] },
    { op: 'lettura', frammento: '20261104-0901-zzz9', intento: ['salva'], legami: [], risposta: 'salvato' },
    { op: 'lettura', frammento: FID, intento: ['salva'], legami: [] },
    { op: 'crea-nodo', genere: 'temi', nome: 'sofferenza', 'nato-da': [N] },
    { op: 'crea-nodo', genere: 'temi', nome: 'dolori', 'nato-da': [N] }, // "dolore" con un'altra vocale: è una parola tua
    { op: 'restituzione', forma: 'risposta', per: FID, testo: '1. x', voci: [{ rif: '@Kierkegaard', voce: 'mondo', cosa: 'persona' }] },
  ]), dir).errori.join('\n');
  assert.match(e, /lettura 20261104-0900-nnn1: la reazione «mi ha fatto riflettere» non è copiata esatta/);
  assert.match(e, /lettura 20261104-0900-nnn1: manca l'intento "chiedi" del frammento/);
  assert.match(e, /lettura 20261104-0900-nnn1: "risposta: salvato", ma il piano scrive la risposta/);
  assert.match(e, /lettura 20261104-0901-zzz9: il frammento non c'è in frammenti\//);
  assert.match(e, /@Kierkegaard: nessun crea-nodo/);
  assert.match(e, /crea-nodo "sofferenza": "smista" crea un tema solo se è una parola tua/);
  assert.doesNotMatch(e, /crea-nodo "dolori"/);
  assert.match(prepara(smista([{ op: 'lettura', frammento: N, intento: ['salva', 'chiedi'], legami: [] }]), dir).errori.join('\n'),
    /manca "risposta": salvato, ci-sono/);
  assert.match(prepara(smista([{ op: 'lettura', frammento: N, intento: ['chiedi'], legami: [], risposta: 'r-20261104-0900-risposta' }]), dir).errori.join('\n'),
    /risposta r-20261104-0900-risposta non è una restituzione "risposta" che c'è già/);
  const gia = applica(B01(), dir);
  assert.deepEqual(gia.errori, []);
  assert.match(prepara(B01(), dir).errori.join('\n'), /lettura 20261103-2340-k7q2: c'è già/);
});

test('i link: si= via, t= tenuto, http → https, il pin normalizzato (banco B13, B14, B15)', () => {
  assert.equal(pulisciLink('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3'), 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC');
  assert.equal(pulisciLink('https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2'), 'https://youtu.be/dQ9xLmP0aBc?t=754');
  assert.equal(pulisciLink('https://it.pinterest.com/pin/1234567890123/?mt=login'), 'https://www.pinterest.com/pin/1234567890123/');
  assert.equal(pulisciLink('http://www.youtube.com/watch?si=x&v=abc&t=12s'), 'https://www.youtube.com/watch?v=abc&t=12s');
  assert.deepEqual(linkDelTesto('guarda https://youtu.be/a1?si=x, e (https://youtu.be/a1). poi https://example.org/p?q=1!'),
    ['https://youtu.be/a1', 'https://example.org/p?q=1']);
});

test('l\'oEmbed: il titolo nella lettura; 404 o rete assente → link senza titolo e un avviso, il piano passa', (t) => {
  const dir = primaDiSmista(t);
  const S = '20261209-1800-sp01', Y = '20261210-2300-yt01';
  frammento(dir, S, 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3');
  frammento(dir, Y, 'https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello\nhttps://it.pinterest.com/pin/1234567890123/?mt=login');
  const chiesti = [];
  const rete = (u) => { chiesti.push(u); return u.includes('spotify') ? { stato: 'ok', titolo: 'Never Gonna Give You Up' } : { stato: 'assente' }; };
  const piano = smista([
    { op: 'lettura', frammento: S, intento: ['salva'], legami: [] },
    { op: 'restituzione', forma: 'risposta', per: S, testo: '**Salvato** *Never Gonna Give You Up*. Che cosa ti ha preso?', voci: [] },
    { op: 'lettura', frammento: Y, intento: ['salva'], legami: [{ p: 'nomina', a: '~video di YouTube', momento: '12:34', voce: 'sua', perche: '«dal minuto 12 in poi»' }], risposta: 'salvato' },
  ]);
  const e = applica(piano, dir, { rete });
  assert.deepEqual(e.errori, []);
  assert.deepEqual(chiesti, ['https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Ftrack%2F4uLU6hMCjMI75M1A2tKUQC',
    'https://www.youtube.com/oembed?format=json&url=https%3A%2F%2Fyoutu.be%2FdQ9xLmP0aBc%3Ft%3D754']);
  assert.deepEqual(leggi(dir, `letture/2026/12/${S}.md`).dati.link, [{ url: 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC', titolo: 'Never Gonna Give You Up' }]);
  assert.deepEqual(leggi(dir, `letture/2026/12/${Y}.md`).dati.link, [{ url: 'https://youtu.be/dQ9xLmP0aBc?t=754' }, { url: 'https://www.pinterest.com/pin/1234567890123/' }]);
  assert.deepEqual(e.avvisi, [`lettura ${Y}: l'oEmbed non trova https://youtu.be/dQ9xLmP0aBc?t=754: link senza titolo`]);
  assert.match(readFileSync(join(dir, `frammenti/2026/12/${S}.md`), 'utf8'), /\?si=a1b2c3/); // G1: il frammento non si tocca
  // Senza rete: nessun titolo, un avviso, i file scritti lo stesso; un piano rifiutato non chiede niente alla rete.
  const Z = '20261210-2310-yt02';
  frammento(dir, Z, 'https://www.youtube.com/watch?v=abc');
  const z = applica(smista([{ op: 'lettura', frammento: Z, intento: ['salva'], legami: [], risposta: 'salvato' }]), dir, { rete: () => ({ stato: 'rete' }) });
  assert.deepEqual(z.errori, []);
  assert.match(z.avvisi.join('\n'), /oEmbed non raggiunto per https:\/\/www\.youtube\.com\/watch\?v=abc \(rete\): link senza titolo; il titolo, se lo sai, in "nota" con ⚠/);
  assert.deepEqual(leggi(dir, `letture/2026/12/${Z}.md`).dati.link, [{ url: 'https://www.youtube.com/watch?v=abc' }]);
  chiesti.length = 0;
  frammento(dir, '20261210-2320-yt03', 'https://youtu.be/x');
  prepara(smista([{ op: 'lettura', frammento: '20261210-2320-yt03', intento: ['salva'], legami: [] }]), dir, { rete });
  assert.deepEqual(chiesti, []);
});

test('la riga di comando senza rete: AVVISO, poi "scritto" e 0', (t) => {
  const dir = primaDiSmista(t);
  const S = '20261209-1800-sp01';
  frammento(dir, S, 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3');
  const piano = join(dir, 'piano.json');
  writeFileSync(piano, JSON.stringify(smista([{ op: 'lettura', frammento: S, intento: ['salva'], legami: [], risposta: 'salvato' }])));
  const r = spawnSync('node', [SCRIPT, piano, '--radice', dir], { encoding: 'utf8', env: process.env });
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /^AVVISO lettura 20261209-1800-sp01: oEmbed non raggiunto/m);
  assert.match(r.stdout, new RegExp(`scritto letture/2026/12/${S}.md\nverifica: ok`));
});
