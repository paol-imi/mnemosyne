import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { verifica, aggiornaHash } from '../scripts/verifica.mjs';

const FIX = new URL('./fixture/', import.meta.url).pathname;
const SCRIPT = new URL('../scripts/verifica.mjs', import.meta.url).pathname;
const F = 'frammenti/2026/11/20261103-2340-k7q2.md';
const R = 'restituzioni/2026/11/r-20261103-2341-risposta.md';

// Il punto di partenza: gli esempi del modello §3.2–3.5 messi nelle loro cartelle, con i nodi che citano.
const ESEMPI = {
  [F]: 's3.2/frammenti/20261103-2340-k7q2.md',
  'frammenti/2026/11/20261114-2104-c1a7.md': 's3.2/frammenti/20261114-2104-c1a7.md',
  'letture/2026/11/20261103-2340-k7q2.md': 's3.3/letture/20261103-2340-k7q2.md',
  'persone/umberto-galimberti.md': 's3.4/persone/umberto-galimberti.md',
  'citazioni/il-nichilismo-e-l-ospite-inquietante.md': 's3.4/citazioni/il-nichilismo-e-l-ospite-inquietante.md',
  [R]: 's3.5/restituzioni/r-20261103-2341-risposta.md',
};
const nodo = (nome) => `---\nschema: 3\nnome: ${nome}\nnato-da: [20261103-2340-k7q2]\n---\n`;

function scrivi(radice, p, testo) {
  mkdirSync(dirname(join(radice, p)), { recursive: true });
  writeFileSync(join(radice, p), testo);
}
const git = (radice, ...a) => execFileSync('git', a, { cwd: radice, stdio: 'pipe' });

function repo() {
  const radice = mkdtempSync(join(tmpdir(), 'memo-verifica-'));
  git(radice, 'init', '-q', '-b', 'main');
  git(radice, 'config', 'user.email', 'prova@example.org');
  git(radice, 'config', 'user.name', 'prova');
  for (const [p, f] of Object.entries(ESEMPI)) scrivi(radice, p, readFileSync(join(FIX, f), 'utf8'));
  scrivi(radice, 'opere/spettacolo-sulle-emozioni.md', nodo('spettacolo sulle emozioni'));
  scrivi(radice, 'temi/nichilismo.md', nodo('nichilismo'));
  aggiornaHash(radice);
  git(radice, 'add', '-A');
  git(radice, 'commit', '-q', '-m', 'punto zero');
  return radice;
}
const conRepo = (fn) => () => { const r = repo(); try { fn(r); } finally { rmSync(r, { recursive: true, force: true }); } };
const cambia = (radice, p, da, a) => {
  const t = readFileSync(join(radice, p), 'utf8');
  assert.ok(t.includes(da));
  writeFileSync(join(radice, p), t.replace(da, a));
};

test('un repo pulito passa (anche dalla riga di comando)', conRepo((r) => {
  assert.deepEqual(verifica(r), []);
  const out = spawnSync(process.execPath, [SCRIPT, '--radice', r], { encoding: 'utf8' });
  assert.equal(out.status, 0, out.stdout);
}));

test('B03, B20: un frammento con una virgola cambiata fallisce', conRepo((r) => {
  cambia(r, F, 'galimberti a teatro, credo', 'galimberti a teatro; credo');
  const e = verifica(r, ['hash']);
  assert.equal(e.length, 1);
  assert.match(e[0], /^ERRORE frammenti\/2026\/11\/20261103-2340-k7q2\.md: il frammento è cambiato/);
  const out = spawnSync(process.execPath, [SCRIPT, '--radice', r, '--solo', 'hash'], { encoding: 'utf8' });
  assert.equal(out.status, 1);
}));

test('ricalcolare l\'hash non lava il frammento, e non si riscrive una riga già in HEAD', conRepo((r) => {
  cambia(r, F, 'molto interessante', 'molto interessante.');
  aggiornaHash(r); // non tocca le righe esistenti
  assert.equal(verifica(r, ['hash']).length, 1);
  cambia(r, 'frammenti/.hash', readFileSync(join(r, 'frammenti/.hash'), 'utf8').split('  ')[0], '0'.repeat(64));
  assert.ok(verifica(r, ['hash']).some((e) => /cambiata o tolta rispetto a HEAD/.test(e)));
}));

test('una restituzione ritoccata dopo il commit fallisce', conRepo((r) => {
  cambia(r, R, 'ha ripreso in un libro', 'ha ripreso in un saggio');
  assert.deepEqual(verifica(r, ['immutabili']), [`ERRORE ${R}: restituzione cambiata dopo il commit`]);
}));

test('uno slug doppio fallisce, anche tra generi diversi', conRepo((r) => {
  scrivi(r, 'temi/umberto-galimberti.md', nodo('umberto galimberti'));
  const e = verifica(r, ['slug']);
  assert.equal(e.length, 1);
  assert.match(e[0], /slug "umberto-galimberti" già usato/);
}));

test('un riferimento a un nodo inesistente fallisce', conRepo((r) => {
  cambia(r, 'citazioni/il-nichilismo-e-l-ospite-inquietante.md', '[umberto-galimberti]', '[friedrich-nietzsche]');
  assert.deepEqual(verifica(r, ['rif']),
    ['ERRORE citazioni/il-nichilismo-e-l-ospite-inquietante.md: riferimento a nodo inesistente: friedrich-nietzsche']);
}));

test('ID esterni, esito all\'ingresso, sintetico su main', conRepo((r) => {
  scrivi(r, 'citazioni/cio-a-cui-resisti-persiste.md',
    `---\nschema: 3\nnome: Ciò a cui resisti persiste\nattribuita-a: [umberto-galimberti]\nesito: verificata\nlink: ["https://www.wikidata.org/wiki/Q123"]\nnato-da: [20261103-2340-k7q2]\n---\n`);
  assert.equal(verifica(r, ['esito']).length, 1);
  assert.equal(verifica(r, ['smista']).length, 1);
  cambia(r, 'citazioni/cio-a-cui-resisti-persiste.md', 'esito: verificata', 'esito: errata\nriferimento: "Quote Investigator; fonte secondaria"');
  assert.deepEqual(verifica(r, ['esito']), []);
  cambia(r, 'temi/nichilismo.md', 'schema: 3', 'schema: 3\nsintetico: true');
  assert.equal(verifica(r, ['sintetico']).length, 1);
  // lo schema ignora `sintetico` (rami banco/*). Il `link` si toglie: §3.7 rifiuta ogni nodo con link e senza cerchia (da correggere).
  cambia(r, 'citazioni/cio-a-cui-resisti-persiste.md', 'link: ["https://www.wikidata.org/wiki/Q123"]\n', '');
  assert.deepEqual(verifica(r, ['schema']), []);
}));
