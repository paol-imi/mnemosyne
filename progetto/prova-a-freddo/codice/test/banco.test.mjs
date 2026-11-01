import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const ESEGUI = new URL('../banco/esegui.mjs', import.meta.url).pathname;

// Un archivio finto, una prova finta, una risposta finta.
function banco() {
  const d = mkdtempSync(join(tmpdir(), 'banco-'));
  const scrivi = (f, t) => { mkdirSync(join(d, f, '..'), { recursive: true }); writeFileSync(join(d, f), t); };
  scrivi('frammenti/2026/11/20261103-2340-k7q2.md', '---\nschema: 3\ncanale: telefono\n---\nciao nn so\n');
  scrivi('letture/2026/11/20261103-2340-k7q2.md',
    '---\nschema: 3\nversione: 1\nintento: [salva]\nlegami:\n  - {p: nomina, a: umberto-galimberti, voce: sua, perche: "x"}\n---\n');
  scrivi('persone/umberto-galimberti.md', '---\nschema: 3\nnome: Umberto Galimberti\ncerchia: mondo\n---\n');
  scrivi('risposta.md', 'Salvato. Ti chiedo una cosa sola?\n');
  const prova = (id, extra = {}) => scrivi(`prove/${id}.json`, JSON.stringify({
    id, gravita: 'alta', uscita: 'contesto/recenti.md',
    file_attesi: ['frammenti/2026/11/20261103-2340*.md', 'persone/*galimberti*.md'],
    ricerche_esatte: [{ glob: 'frammenti/**/*.md', testo: 'ciao nn so' }, { file: '@uscita', testo: 'Salvato' }],
    frontmatter: [{ glob: 'letture/**/*.md', campo: 'legami', contiene: [{ p: 'nomina', a: 'umberto-galimberti' }] },
      { file: 'persone/umberto-galimberti.md', campo: 'cerchia', vale: 'mondo' }],
    divieti: [{ glob: '{persone,letture}/**', regex: '^wikidata:', flag: 'm' }],
    conteggi: [{ glob: 'persone/*nietzsche*.md', max: 0 }, { file: '@uscita', testo: '?', min: 1, max: 1 }],
    giudice: [{ domanda: 'Una domanda sola?', attesa: 'sì' }], ...extra }));
  const esegui = (id) => spawnSync(process.execPath, [ESEGUI, '--prova', id, '--radice', d, '--prove', join(d, 'prove'),
    '--uscita', join(d, 'risposta.md'), '--esiti', join(d, 'esiti'), '--cosa', 'finto', '--lettore', 'lettore-x'],
    { encoding: 'utf8', env: { ...process.env, ATLANTE_ORA: '2026-11-03T23:45:00+01:00' } });
  return { d, prova, esegui };
}

test('una prova finta che passa: codice 0, riga "passa" sotto la testata', () => {
  const { d, prova, esegui } = banco();
  prova('B90');
  const r = esegui('B90');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const esiti = readFileSync(join(d, 'esiti', '20261103-finto.md'), 'utf8');
  assert.match(esiti, /\*\*Modello lettore:\*\* lettore-x/);
  assert.match(esiti, /\*\*Partenza:\*\*/);
  assert.match(esiti, /^\| B90 \| passa \| — \| — \| deterministici; giudice da fare \(1 domande\) \|$/m);
});

test('una prova finta che fallisce: codice 1, criteri e gravità nella riga', () => {
  const { d, prova, esegui } = banco();
  prova('B91', {
    file_attesi: ['persone/friedrich-nietzsche.md'],
    divieti: [{ file: '@uscita', testo: 'Salvato', motivo: 'dice Salvato' }],
    frontmatter: [{ file: 'persone/umberto-galimberti.md', campo: 'cerchia', vale: 'vita' }],
  });
  prova('B90');
  const r = esegui('B91');
  assert.equal(r.status, 1);
  esegui('B90');
  const esiti = readFileSync(join(d, 'esiti', '20261103-finto.md'), 'utf8');
  const riga = esiti.split('\n').find((l) => l.startsWith('| B91 '));
  assert.match(riga, /\| fallisce \|/);
  assert.match(riga, /file_attesi\[0\]: manca persone\/friedrich-nietzsche\.md/);
  assert.match(riga, /divieti\[0\]: dice Salvato/);
  assert.match(riga, /frontmatter\[0\]: cerchia non conforme/);
  assert.match(riga, /\| alta \| giudice non serve \|$/);
  assert.equal(esiti.match(/^# Banco/gm).length, 1, 'una sola testata per giro');
  assert.deepEqual(readdirSync(join(d, 'esiti')), ['20261103-finto.md']);
});
