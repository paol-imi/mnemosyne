// Blocco 5: smista.mjs prepara (lo spostamento e il pacchetto) e contesto.mjs provvisorio.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { prepara } from '../scripts/smista.mjs';
import { contesto } from '../scripts/contesto.mjs';
import { verifica } from '../scripts/verifica.mjs';

const scrivi = (r, p, t) => { mkdirSync(join(r, p, '..'), { recursive: true }); writeFileSync(join(r, p), t); };
const fm = (righe, corpo = '') => `---\n${righe.join('\n')}\n---\n${corpo}`;
const MEMO = 'ho visto uno spezzone di galimberti a teatro, chioran e Camus sulla solitudine. molto interessante';

function ambiente() {
  const r = mkdtempSync(join(tmpdir(), 'memo-smista-'));
  scrivi(r, 'frammenti/2026/10/20261004-0000-u01.md', fm(['registrato: 2026-10-04', 'canale: importato', 'voce: sua'], 'solitudine, battaglie'));
  scrivi(r, 'letture/2026/10/20261004-0000-u01.md', fm(['schema: 3', 'versione: 1', 'letto-da: x-modello', 'prompt: "abc1234"', 'intento: [salva]',
    'legami:', '  - {p: parla-di, a: solitudine, voce: sua, perche: «solitudine»}', 'parole: [battaglia]']));
  scrivi(r, 'frammenti/2026/10/20261030-2200-zz01.md', fm(['registrato: 2026-10-30T22:00:00+01:00', 'canale: telefono'], 'camus di nuovo'));
  scrivi(r, 'letture/2026/10/20261030-2200-zz01.md', fm(['schema: 3', 'versione: 1', 'letto-da: x-modello', 'prompt: "abc1234"', 'intento: [salva]',
    'legami:', '  - {p: nomina, a: camus, voce: sua, perche: «camus»}', 'risposta: salvato']));
  scrivi(r, 'temi/solitudine.md', fm(['schema: 3', 'nome: solitudine', 'nato-da: [20261004-0000-u01]']));
  scrivi(r, 'persone/camus.md', fm(['schema: 3', 'nome: Albert Camus', 'alias: [Camus]', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']));
  scrivi(r, 'persone/cioran.md', fm(['schema: 3', 'nome: Emil Cioran', 'alias: [cioran]', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']));
  scrivi(r, 'ingresso/20261103-2343-b2c3.md', fm(['registrato: 2026-11-03T23:43:00+01:00', 'canale: telefono'], 'ah e anche cioran'));
  scrivi(r, 'ingresso/20261103-2340-k7q2.md', fm(['registrato: 2026-11-03T23:40:12+01:00', 'canale: telefono', 'allegati: [20261103-2340-k7q2.webp]'], MEMO));
  scrivi(r, 'ingresso/20261103-2340-k7q2.webp', 'finta');
  scrivi(r, 'ingresso/20261103-2100-c4at.md', fm(['registrato: 2026-11-03T21:00:00+01:00', 'canale: chat'], '[21:00] ciao'));
  scrivi(r, 'ingresso/20261103-2100-c4at.risposte.md', 'bozza');
  process.env.ATLANTE_ORA = '2026-11-03T22:50:00Z';
  return r;
}

test('prepara: sposta in ordine senza riscrivere, lascia le chat aperte, aggiorna l\'hash, scrive i pacchetti', () => {
  const r = ambiente(), prima = readFileSync(join(r, 'ingresso/20261103-2340-k7q2.md'), 'utf8');
  const e = prepara(r);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.spostati, ['20261103-2340-k7q2', '20261103-2343-b2c3']);
  assert.equal(readFileSync(join(r, 'frammenti/2026/11/20261103-2340-k7q2.md'), 'utf8'), prima);
  assert.ok(existsSync(join(r, 'frammenti/2026/11/20261103-2340-k7q2.webp')));
  assert.ok(existsSync(join(r, 'ingresso/20261103-2100-c4at.md')) && existsSync(join(r, 'ingresso/20261103-2100-c4at.risposte.md')));
  assert.match(readFileSync(join(r, 'frammenti/.hash'), 'utf8'), /frammenti\/2026\/11\/20261103-2343-b2c3\.md/);
  assert.deepEqual(e.pacchetti, ['20261103-2340-k7q2', '20261103-2343-b2c3']);
  assert.deepEqual(verifica(r, ['hash', 'rif']), []);

  const p = JSON.parse(readFileSync(join(r, 'ingresso/.pacchetti/20261103-2340-k7q2.json'), 'utf8'));
  assert.equal(p.frammento.testo, MEMO);
  assert.deepEqual(p.recenti.map((x) => x.id), ['20261030-2200-zz01']);
  assert.ok(p.alias.includes('emil cioran → cioran (persone)'));
  assert.equal(p.candidati.Camus[0].slug, 'camus');
  assert.equal(p.candidati.chioran[0].slug, 'cioran');
  assert.deepEqual(p.vicini.map((v) => [v.id, v.comuni]), [['20261004-0000-u01', ['solitudine']]], 'zz01 ha meno di 7 giorni');
  const b = JSON.parse(readFileSync(join(r, 'ingresso/.pacchetti/20261103-2343-b2c3.json'), 'utf8'));
  assert.deepEqual(b.recenti.map((x) => x.id), ['20261030-2200-zz01', '20261103-2340-k7q2']);
});

test('prepara di nuovo: niente da spostare; --solo fa un pacchetto solo; un doppione resta in ingresso', () => {
  const r = ambiente();
  prepara(r);
  const e = prepara(r, '20261103-2343-b2c3');
  assert.deepEqual([e.spostati, e.pacchetti], [[], ['20261103-2343-b2c3']]);
  scrivi(r, 'ingresso/20261103-2343-b2c3.md', fm(['registrato: 2026-11-03T23:43:00+01:00', 'canale: telefono'], 'doppione'));
  assert.match(prepara(r).errori.join('\n'), /c'è già/);
  assert.ok(existsSync(join(r, 'ingresso/20261103-2343-b2c3.md')));
});

test('contesto provvisorio: recenti e mappa con testata, Stato e Alias', () => {
  const r = ambiente();
  prepara(r);
  contesto(r);
  const rec = readFileSync(join(r, 'contesto/recenti.md'), 'utf8'), mappa = readFileSync(join(r, 'contesto/mappa.md'), 'utf8');
  assert.match(rec, /^---\naggiornato: 2026-11-03T23:50:00\+01:00\nfino-a: 20261103-2343-b2c3\ntoken-stimati: \d+\n/);
  assert.match(rec, /### 20261030-2200-zz01 · .*\ncamus di nuovo\n→ risposta: salvato/);
  assert.doesNotMatch(rec, /20261004-0000-u01/, 'gli importati non sono recenti');
  assert.match(mappa, /## Stato\n\n- data d'inizio: 2026-10-30\n- frammenti tuoi: 3/);
  assert.match(mappa, /## Alias\n\n(- .+\n)*- camus → camus \(persone\)/);
});
