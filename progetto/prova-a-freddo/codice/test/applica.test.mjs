// Blocco 4-5: applica.mjs, il piano → i file (prompt/formato-piano.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applica, pulisciLink, hashPrompt } from '../scripts/applica.mjs';
import { validaFile, frontmatter } from '../scripts/schema.mjs';

const FID = '20261103-2340-k7q2';
const TESTO = 'ho visto uno spezzone di galimberti a teatro https://open.spotify.com/track/0abc?si=12ef&t=30 molto interessante';
const scrivi = (p, t) => { mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, t); };
const piano = (operazioni, ciclo = 'smista') => ({ ciclo, 'letto-da': 'claude-opus-5-5', operazioni });

function ambiente() {
  const r = mkdtempSync(join(tmpdir(), 'memo-applica-'));
  scrivi(join(r, 'prompt/smista.md'), '# smista\n');
  scrivi(join(r, 'prompt/consolida.md'), '# consolida\n');
  scrivi(join(r, `frammenti/2026/11/${FID}.md`), `---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---\n${TESTO}`);
  scrivi(join(r, 'persone/marco.md'), '---\nschema: 3\nnome: Marco\ncerchia: vita\nnato-da: [20261103-2340-k7q2]\n---\n');
  process.env.ATLANTE_ORA = '2026-11-03T22:41:30Z';
  return r;
}
const leggi = (r, p) => frontmatter(readFileSync(join(r, p), 'utf8'));
const tutti = (r, c) => (existsSync(join(r, c)) ? readdirSync(join(r, c), { recursive: true }).filter((f) => f.endsWith('.md')) : []);

test('il piano di prompt/formato-piano.md: nodi, lettura v1, risposta numerata, tutto valido', () => {
  const r = ambiente();
  const p = JSON.parse(readFileSync(new URL('./fixture/piano-formato.json', import.meta.url), 'utf8'));
  p.operazioni[2].reazione[0].parole = 'molto interessante';
  const e = applica(p, r);
  assert.deepEqual(e.errori, []);
  assert.equal(e.scritti.length, 4);
  for (const f of e.scritti) assert.deepEqual(validaFile(f, readFileSync(join(r, f), 'utf8')), [], f);
  const l = leggi(r, `letture/2026/11/${FID}.md`);
  assert.equal(l.dati.versione, 1);
  assert.equal(l.dati.prompt, hashPrompt(r, 'smista'));
  assert.match(readFileSync(join(r, `letture/2026/11/${FID}.md`), 'utf8'), /^prompt: "[0-9a-f]{7}"$/m);
  assert.equal(l.dati.legami[0].a, 'umberto-galimberti');
  assert.equal(l.dati.risposta, 'r-20261103-2341-risposta');
  assert.deepEqual(l.dati.link, [{ url: 'https://open.spotify.com/track/0abc?t=30' }]);
  const c = leggi(r, 'citazioni/il-nichilismo-e-l-ospite-inquietante.md');
  assert.deepEqual(c.dati['attribuita-a'], ['umberto-galimberti']);
  assert.deepEqual(c.dati['nato-da'], [FID]);
  const rr = leggi(r, 'restituzioni/2026/11/r-20261103-2341-risposta.md');
  assert.equal(rr.dati.registrato, '2026-11-03T23:41:30+01:00');
  assert.deepEqual(rr.dati.voci, [{ n: 1, rif: 'il-nichilismo-e-l-ospite-inquietante', voce: 'mondo', cosa: 'citazione' }]);
  assert.equal(rr.corpo, '**Salvato.** 1. …\n');
});

test('rifiuto: slug già presente, reazione non esatta, numeri, @Nome ignoto; nessun file scritto', () => {
  const r = ambiente();
  const e = applica(piano([
    { op: 'crea-nodo', genere: 'persone', nome: 'Marco', cerchia: 'vita' },
    { op: 'lettura', frammento: FID, intento: ['salva'], reazione: [{ parole: 'molto bello', verso: '+' }],
      legami: [{ p: 'nomina', a: '@Umberto', voce: 'sua', perche: '«galimberti»' }] },
    { op: 'restituzione', forma: 'risposta', per: FID, testo: '**Salvato.** 2. x',
      voci: [{ rif: '~Galimberti', voce: 'mondo', cosa: 'persona' }] },
  ]), r);
  const tutto = e.errori.join('\n');
  assert.match(tutto, /slug marco esiste già/);
  assert.match(tutto, /reazione "molto bello" non è nel frammento/);
  assert.match(tutto, /manca "1\."/);
  assert.match(tutto, /@Umberto: nessun crea-nodo/);
  assert.deepEqual(e.scritti, []);
  assert.deepEqual(tutti(r, 'letture'), []);
  assert.deepEqual(tutti(r, 'restituzioni'), []);
});

test('rifiuto dello schema del piano e di uno slug inventato', () => {
  const r = ambiente();
  assert.match(applica({ ciclo: 'smista', operazioni: [] }, r).errori.join('\n'), /letto-da/);
  const e = applica(piano([{ op: 'lettura', frammento: FID, intento: ['salva'],
    legami: [{ p: 'nomina', a: 'umberto-galimberti', voce: 'sua', perche: '«galimberti»' }] }]), r);
  assert.match(e.errori.join('\n'), /riferimento inesistente umberto-galimberti/);
});

test('una sola risposta per frammento; id -2 se l\'ora collide; alias su un nodo esistente', () => {
  const r = ambiente();
  const ris = (testo = 'Ci sono.') => ({ op: 'restituzione', forma: 'risposta', per: FID, testo, voci: [] });
  assert.deepEqual(applica(piano([ris(), { op: 'alias', nodo: 'marco', alias: ['il mio amico marco', 'Marco'] }]), r).errori, []);
  assert.deepEqual(leggi(r, 'persone/marco.md').dati.alias, ['il mio amico marco']);
  assert.match(applica(piano([ris()]), r).errori.join('\n'), /c'è già la risposta r-20261103-2341-risposta/);
  const e = applica(piano([{ op: 'restituzione', forma: 'lettera', testo: 'x', voci: [] }]), r);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.scritti, ['restituzioni/2026/11/r-20261103-2341-lettera.md']);
  assert.deepEqual(applica(piano([{ op: 'restituzione', forma: 'lettera', testo: 'x', voci: [] }]), r).scritti,
    ['restituzioni/2026/11/r-20261103-2341-lettera-2.md']);
});

test('versione: smista non riscrive una lettura, consolida la porta a 2', () => {
  const r = ambiente();
  const l = { op: 'lettura', frammento: FID, intento: ['salva'], legami: [], risposta: 'salvato' };
  assert.deepEqual(applica(piano([l]), r).errori, []);
  assert.match(applica(piano([l]), r).errori.join('\n'), /c'è già \(versione 1\)/);
  assert.deepEqual(applica(piano([l], 'consolida'), r).errori, []);
  assert.equal(leggi(r, `letture/2026/11/${FID}.md`).dati.versione, 2);
});

test('smista non crea temi; le operazioni di consolida non ancora fatte si rifiutano', () => {
  const r = ambiente();
  assert.match(applica(piano([{ op: 'crea-nodo', genere: 'temi', nome: 'nichilismo', 'nato-da': [FID] }]), r).errori.join('\n'), /non crea temi/);
  assert.match(applica(piano([{ op: 'riserva', file: 'ritorno', testo: '' }], 'consolida'), r).errori.join('\n'), /non ancora implementata/);
});

test('link puliti: si via, t tenuto, pin normalizzato', () => {
  assert.equal(pulisciLink('https://open.spotify.com/track/0abc?si=12ef'), 'https://open.spotify.com/track/0abc');
  assert.equal(pulisciLink('https://youtu.be/xyz?si=aa&t=95'), 'https://youtu.be/xyz?t=95');
  assert.equal(pulisciLink('https://it.pinterest.com/pin/123456789/?mt=login'), 'https://www.pinterest.com/pin/123456789/');
  assert.equal(pulisciLink('http://pinterest.co.uk/pin/42'), 'https://www.pinterest.com/pin/42/');
});
