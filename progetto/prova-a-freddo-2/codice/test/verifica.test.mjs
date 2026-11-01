// Blocco 1: verifica.mjs. Collaudo del piano (una virgola cambiata in un frammento, B03 e B20; una restituzione ritoccata)
// e i controlli della riga di verifica.mjs: schema, hash, immutabili, slug, rif, smista, esito (§7.2 passo 4), sintetico.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifica, aggiornaHash, leggiHash, CONTROLLI } from '../scripts/verifica.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const FIX = join(RADICE, 'test/fixture/verifica');
const SCRIPT = join(RADICE, 'scripts/verifica.mjs');
const FRAMMENTO = 'frammenti/2026/11/20261103-2340-k7q2.md';
const RISPOSTA = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
const CITAZIONE = 'citazioni/il-nichilismo-e-l-ospite-inquietante.md';
const ENV = { ...process.env, GIT_AUTHOR_NAME: 'memo', GIT_AUTHOR_EMAIL: 'memo@local', GIT_COMMITTER_NAME: 'memo',
  GIT_COMMITTER_EMAIL: 'memo@local', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' };
delete ENV.GITHUB_REF_NAME;
delete process.env.GITHUB_REF_NAME;

const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, env: ENV, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const leggi = (dir, p) => readFileSync(join(dir, p), 'utf8');
const scrivi = (dir, p, t) => { mkdirSync(join(dir, p, '..'), { recursive: true }); writeFileSync(join(dir, p), t); };
const commit = (dir, msg) => { git(dir, 'add', '-A'); git(dir, 'commit', '-q', '--allow-empty', '-m', msg); };

// Un archivio minimo valido (il caso Galimberti, modello §3.2–§3.5) in un repository nuovo; `msg` null = niente commit.
function archivio(t, { msg = 'smista: 1 memo', ramo = 'banco/zero' } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'verifica-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(join(FIX, 'archivio'), dir, { recursive: true });
  git(dir, 'init', '-q', '-b', ramo);
  if (msg) commit(dir, msg);
  return dir;
}
const conErrore = (errori, file, parola) => errori.some((e) => e.startsWith(`ERRORE ${file}:`) && e.includes(parola));

test('il repository vuoto di oggi passa: codice 0', () => {
  const r = spawnSync('node', [SCRIPT], { cwd: RADICE, encoding: 'utf8', env: ENV });
  assert.equal(r.status, 0, r.stdout);
  assert.doesNotMatch(r.stdout, /ERRORE/);
});

test('l\'archivio minimo passa tutti i controlli, prima e dopo il commit', (t) => {
  const dir = archivio(t, { msg: null });
  assert.deepEqual(verifica(dir), []);
  commit(dir, 'smista: 1 memo');
  assert.deepEqual(verifica(dir), []);
});

test('collaudo: un frammento con una virgola cambiata è rifiutato (B03, B20)', (t) => {
  const dir = archivio(t);
  scrivi(dir, FRAMMENTO, leggi(dir, FRAMMENTO).replace('teatro, credo', 'teatro credo'));
  const errori = verifica(dir, ['hash']);
  assert.ok(conErrore(errori, FRAMMENTO, 'hash diverso'), errori.join('\n'));
  // Riscrivere anche la riga dell'hash non basta: la riga in HEAD non cambia mai.
  rmSync(join(dir, 'frammenti/.hash'));
  aggiornaHash(dir);
  const ancora = verifica(dir, ['hash']);
  assert.ok(conErrore(ancora, 'frammenti/.hash', 'rispetto a HEAD'), ancora.join('\n'));
  // E da riga di comando: codice 1 e righe "ERRORE file: motivo".
  const r = spawnSync('node', [SCRIPT, '--solo', 'hash', '--radice', dir], { encoding: 'utf8', env: ENV });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /^ERRORE frammenti\/\.hash: /m);
});

test('collaudo: una restituzione ritoccata (o tolta) è rifiutata', (t) => {
  const dir = archivio(t);
  scrivi(dir, RISPOSTA, leggi(dir, RISPOSTA).replace('Salvato.', 'Salvato!'));
  assert.ok(conErrore(verifica(dir, ['immutabili']), RISPOSTA, 'cambiata'));
  rmSync(join(dir, RISPOSTA));
  assert.ok(conErrore(verifica(dir, ['immutabili']), RISPOSTA, 'tolta'));
  // Prima del commit la stessa restituzione si può ancora scrivere: è nuova.
  const nuova = archivio(t, { msg: null });
  scrivi(nuova, RISPOSTA, leggi(nuova, RISPOSTA).replace('Salvato.', 'Salvato!'));
  assert.deepEqual(verifica(nuova, ['immutabili']), []);
});

test('hash: un frammento senza riga, una riga senza frammento, un allegato senza hash', (t) => {
  const dir = archivio(t);
  const altro = 'frammenti/2026/11/20261104-0812-b3n8.md';
  scrivi(dir, altro, '---\nregistrato: 2026-11-04T08:12:00+01:00\ncanale: telefono\n---\nah e\n');
  assert.ok(conErrore(verifica(dir, ['hash']), altro, 'senza hash'));
  assert.deepEqual(aggiornaHash(dir), [altro]);
  assert.deepEqual(aggiornaHash(dir), []); // idempotente
  assert.equal(leggiHash(leggi(dir, 'frammenti/.hash')).size, 2);
  assert.deepEqual(verifica(dir, ['hash']), []);
  rmSync(join(dir, altro));
  assert.ok(conErrore(verifica(dir, ['hash']), altro, 'non c\'è più'));
  writeFileSync(join(dir, 'frammenti/2026/11/20261104-0812-b3n8.webp'), 'x');
  assert.ok(conErrore(verifica(dir, ['hash']), 'frammenti/2026/11/20261104-0812-b3n8.webp', 'senza hash'));
});

test('schema: un campo fuori schema (un ID esterno, B24) è rifiutato, e `sintetico` solo fuori da main', (t) => {
  const dir = archivio(t);
  const p = 'persone/umberto-galimberti.md';
  scrivi(dir, p, leggi(dir, p).replace('cerchia: mondo', 'cerchia: mondo\nwikidata: Q336406'));
  const errori = verifica(dir);
  assert.ok(conErrore(errori, p, 'schema:'), errori.join('\n'));
  assert.ok(conErrore(errori, p, 'ID esterno: wikidata'), errori.join('\n'));

  const banco = archivio(t);
  scrivi(banco, 'temi/nichilismo.md', leggi(banco, 'temi/nichilismo.md').replace('schema: 3', 'schema: 3\nsintetico: true'));
  assert.deepEqual(verifica(banco), []);
  const main = archivio(t, { ramo: 'main' });
  scrivi(main, 'temi/nichilismo.md', leggi(main, 'temi/nichilismo.md').replace('schema: 3', 'schema: 3\nsintetico: true'));
  assert.ok(conErrore(verifica(main), 'temi/nichilismo.md', 'sintetico su main'));
});

test('smista: un nodo nuovo con il link di un registro di ID è rifiutato', (t) => {
  const dir = archivio(t, { msg: null });
  const p = 'persone/umberto-galimberti.md';
  scrivi(dir, p, leggi(dir, p).replace('cerchia: mondo', 'cerchia: mondo\nlink: ["https://www.wikidata.org/wiki/Q336406"]'));
  assert.ok(conErrore(verifica(dir, ['smista']), p, 'ID esterno scritto all\'ingresso'));
});

test('slug: unico in tutto il repository, nella forma giusta; gli id al loro posto', (t) => {
  const dir = archivio(t);
  scrivi(dir, 'temi/umberto-galimberti.md', '---\nschema: 3\nnome: galimberti\nnato-da: [20261103-2340-k7q2]\n---\n');
  scrivi(dir, 'temi/Nichilismo.md', '---\nschema: 3\nnome: Nichilismo\nnato-da: [20261103-2340-k7q2]\n---\n');
  scrivi(dir, 'frammenti/2026/12/20261103-2341-zz11.md', '---\nregistrato: 2026-11-03T23:41:00+01:00\ncanale: telefono\n---\nx\n');
  const errori = verifica(dir, ['slug']);
  assert.ok(conErrore(errori, 'temi/umberto-galimberti.md', 'già usato da persone/umberto-galimberti.md'), errori.join('\n'));
  assert.ok(conErrore(errori, 'temi/Nichilismo.md', 'slug non valido'));
  assert.ok(conErrore(errori, 'frammenti/2026/12/20261103-2341-zz11.md', 'fuori posto'));
});

test('rif: slug, frammenti, restituzioni e voci che non esistono', (t) => {
  const dir = archivio(t);
  rmSync(join(dir, 'temi/nichilismo.md'));
  const p = 'opere/spettacolo-sulle-emozioni.md';
  scrivi(dir, p, leggi(dir, p).replace('nato-da: [20261103-2340-k7q2]', 'nato-da: [20261103-2340-k7q2, r-20261103-2341-risposta]\nin: "~Teatro Carcano"'));
  assert.deepEqual(verifica(dir, ['rif']).filter((e) => e.includes(p)), []); // il ~Nome non è un riferimento
  const l = 'letture/2026/11/20261103-2340-k7q2.md';
  scrivi(dir, l, leggi(dir, l).replace('risposta: r-20261103-2341-risposta', 'risposta: r-20261103-2342-risposta'));
  const lr = 'letture/2026/11/20261104-0812-b3n8.md';
  scrivi(dir, lr, leggi(dir, l).replace('legami:\n', 'legami:\n  - {p: ritorna-su, a: "r-20261103-2341-risposta#7", come: accoglie, voce: sua, perche: "la settima"}\n'));
  const errori = verifica(dir, ['rif']);
  assert.ok(conErrore(errori, l, 'nodo inesistente: nichilismo'), errori.join('\n'));
  assert.ok(conErrore(errori, l, 'restituzione inesistente: r-20261103-2342-risposta'));
  assert.ok(conErrore(errori, lr, 'lettura senza il suo frammento'));
  assert.ok(conErrore(errori, lr, 'la voce r-20261103-2341-risposta#7 non c\'è'));
});

test('esito, regola unica (§7.2 passo 4): all\'ingresso solo attribuita-a, mai esito', (t) => {
  const dir = archivio(t, { msg: null });
  assert.deepEqual(verifica(dir, ['esito']), []); // nome, attribuita-a, nato-da: va bene
  scrivi(dir, CITAZIONE, readFileSync(join(FIX, 'varianti/citazione-consolidata.md'), 'utf8'));
  const errori = verifica(dir, ['esito']);
  for (const k of ['"esito"', '"autore"', '"riferimento"', '"originale"', '"traduzione"']) assert.ok(conErrore(errori, CITAZIONE, k), k);
  // Con esito ma senza riferimento: rifiutata anche se "verificata".
  scrivi(dir, CITAZIONE, leggi(dir, CITAZIONE).replace(/^(autore|originale|traduzione|riferimento):.*\n/gm, ''));
  assert.equal(verifica(dir, ['esito']).length, 1);
});

test('esito: l\'eccezione dell\'importazione (§14 R7) vale solo con esito e riferimento e nato-da importato', (t) => {
  const dir = archivio(t, { msg: null });
  const p = 'citazioni/la-vita-non-e-quella-che-si-e-vissuta.md', testo = readFileSync(join(FIX, 'varianti/citazione-importata.md'), 'utf8');
  scrivi(dir, p, testo);
  assert.deepEqual(verifica(dir, ['esito', 'schema']), []);
  scrivi(dir, p, testo.replace(/^riferimento:.*\n/m, ''));
  assert.ok(conErrore(verifica(dir, ['esito']), p, 'senza "riferimento"'));
  scrivi(dir, p, testo.replace('r-20261007-0000-eredita-citazioni', '20261103-2340-k7q2'));
  assert.ok(conErrore(verifica(dir, ['esito']), p, '"esito" all\'ingresso'));
});

test('esito: conta la nascita in un commit smista:, non ciò che "consolida" aggiunge dopo', (t) => {
  const dir = archivio(t); // la citazione nasce in "smista: 1 memo" con solo attribuita-a
  scrivi(dir, CITAZIONE, readFileSync(join(FIX, 'varianti/citazione-consolidata.md'), 'utf8'));
  commit(dir, 'consolida: settimana 45');
  assert.deepEqual(verifica(dir), []);
  // Una citazione nata già con esito in un commit smista: resta un errore anche dopo.
  const p = 'citazioni/la-vita-non-e-quella-che-si-e-vissuta.md';
  scrivi(dir, p, readFileSync(join(FIX, 'varianti/citazione-importata.md'), 'utf8').replace('r-20261007-0000-eredita-citazioni', '20261103-2340-k7q2'));
  commit(dir, 'smista: 1 memo');
  assert.ok(conErrore(verifica(dir, ['esito']), p, 'alla nascita (commit smista:)'));
  // La stessa nata dall'importazione no.
  const imp = archivio(t, { msg: null });
  scrivi(imp, p, readFileSync(join(FIX, 'varianti/citazione-importata.md'), 'utf8'));
  commit(imp, 'importa: punto zero');
  assert.deepEqual(verifica(imp, ['esito']), []);
});

test('esito: nessuna voce di una risposta all\'ingresso porta esito (banco G4)', (t) => {
  const dir = archivio(t, { msg: null });
  scrivi(dir, RISPOSTA, leggi(dir, RISPOSTA).replace('cosa: opera}', 'cosa: opera, esito: simile}'));
  assert.ok(conErrore(verifica(dir, ['esito']), RISPOSTA, 'la voce 2'));
});

test('--solo sceglie i controlli; un controllo sconosciuto è un errore', (t) => {
  const dir = archivio(t);
  scrivi(dir, FRAMMENTO, leggi(dir, FRAMMENTO).replace('teatro, credo', 'teatro credo'));
  assert.deepEqual(verifica(dir, CONTROLLI.filter((c) => c !== 'hash')), []);
  const r = spawnSync('node', [SCRIPT, '--solo', 'schema,boh', '--radice', dir], { encoding: 'utf8', env: ENV });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /^ERRORE verifica: controlli sconosciuti: boh$/m);
});
