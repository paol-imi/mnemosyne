// Blocco 5: smista.mjs prepara (modello §2.2, §3.2, §6.2, §7.2, §7.3, §7.5, §8.2). Un archivio finto in una cartella
// temporanea: due importati (uno ✦, uno ✧), un memo vecchio, nodi con alias, un rifiuto; in ingresso/ una raffica con
// una foto, una chat aperta con la sua bozza, un memo del Progetto.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { prepara, nomi, tabellaAlias } from '../scripts/smista.mjs';
import { carica } from '../scripts/contesto.mjs';
import { verifica } from '../scripts/verifica.mjs';

const SCRIPT = new URL('../scripts/smista.mjs', import.meta.url).pathname;
const ORA = '2026-11-03T23:50:00+01:00';
const fm = (righe, corpo = '') => `---\n${righe.join('\n')}\n---\n${corpo}`;
const L = (legami, extra = []) => fm(['schema: 3', 'versione: 1', 'letto-da: m', 'prompt: "abc1234"', 'intento: [salva]', 'legami:', ...legami, ...extra]);
const MEMO = 'ho visto uno spezzone di galimberti a teatro, chioran e Camus sulla solitudine. i ragazzi nn stanno bene. molto interessante';
const FILE = {
  'frammenti/2026/10/20261004-0000-u01.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: sua'], 'la solitudine delle battaglie'),
  'letture/2026/10/20261004-0000-u01.md': L(['  - {p: parla-di, a: solitudine, voce: sua, perche: «solitudine»}'], ['parole: [battaglia]']),
  'frammenti/2026/10/20261004-0000-u19.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: sua'], 'Rust e il tempo piatto'),
  'letture/2026/10/20261004-0000-u19.md': L(['  - {p: nomina, a: rust-cohle, voce: sua, perche: «Rust»}']),
  'frammenti/2026/10/20261004-0000-s01.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: seme'], 'il ragazzo e la cultura'),
  'letture/2026/10/20261004-0000-s01.md': L(['  - {p: nomina, a: camus, voce: seme, perche: «Camus»}'], ['parole: [ragazzo]']),
  'frammenti/2026/11/20261101-2200-zz01.md': fm(['registrato: 2026-11-01T22:00:00+01:00', 'canale: telefono'], 'camus di nuovo'),
  'letture/2026/11/20261101-2200-zz01.md': L(['  - {p: nomina, a: camus, voce: sua, perche: «camus»}', '  - {p: ritorna-su, a: "r-20261101-2201-risposta#1", come: rifiuta, voce: sua, perche: «non c\'entra»}'], ['risposta: r-20261101-2201-risposta']),
  'restituzioni/2026/11/r-20261101-2201-risposta.md': fm(['schema: 3', 'forma: risposta', 'letto-da: m', 'registrato: 2026-11-01T22:01:00+01:00', 'per: 20261101-2200-zz01',
    'voci:', '  - {n: 1, rif: "~Mazzy Star · Into Dust", voce: mondo, cosa: brano}'], '**Salvato.**\n'),
  'temi/solitudine.md': fm(['schema: 3', 'nome: solitudine', 'nato-da: [20261004-0000-u01]']),
  'persone/camus.md': fm(['schema: 3', 'nome: Albert Camus', 'alias: [Camus]', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/cioran.md': fm(['schema: 3', 'nome: Emil Cioran', 'alias: [cioran]', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/umberto-galimberti.md': fm(['schema: 3', 'nome: Umberto Galimberti', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/marco-aurelio.md': fm(['schema: 3', 'nome: Marco Aurelio', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/rust-cohle.md': fm(['schema: 3', 'nome: Rust Cohle', 'alias: [Rust]', 'cerchia: finzione', 'nato-da: [20261004-0000-u19]']),
  'contesto/recenti.md': '---\naggiornato: 2026-11-03T09:00:00+01:00\nfino-a: 20261101-2200-zz01\ntoken-stimati: 10\n---\n# Recenti\n',
  'contesto/mappa.md': '---\naggiornato: x\n---\n# Mappa\n\n## 3. Alias\n\n- albert camus → camus (persone, mondo)\n- camus → camus (persone, mondo)\n- solitudine → solitudine (temi)\n\n## 4. Parole candidate\n\n- niente\n',
  'ingresso/.gitkeep': '',
  'ingresso/20261103-2343-b2c3.md': fm(['registrato: 2026-11-03T23:43:00+01:00', 'canale: telefono'], 'ah e anche marco, quello della palestra'),
  'ingresso/20261103-2340-k7q2.md': fm(['registrato: 2026-11-03T23:40:12+01:00', 'canale: telefono', 'allegati: [20261103-2340-k7q2.jpg]'], MEMO),
  'ingresso/20261103-2340-k7q2.jpg': 'finta foto',
  'ingresso/20261103-2100-c4at.md': fm(['registrato: 2026-11-03T21:00:00+01:00', 'canale: chat'], '[21:00] ciao'),
  'ingresso/20261103-2100-c4at.risposte.md': 'bozza',
  'ingresso/20261103-2200-pr0g.md': fm(['registrato: 2026-11-03T22:00:00+01:00', 'canale: telefono'], 'memo: chat\nturni:\n  - {ora: "21:04", testo: "canzoni"}\n'),
};

function archivio(t, extra = {}) {
  const d = mkdtempSync(join(tmpdir(), 'smista-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  for (const [p, x] of Object.entries({ ...FILE, ...extra })) { mkdirSync(join(d, p, '..'), { recursive: true }); writeFileSync(join(d, p), x); }
  return d;
}
function conOra(f, ora = ORA) {
  const prima = process.env.ATLANTE_ORA;
  process.env.ATLANTE_ORA = ora;
  try { return f(); } finally { if (prima === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = prima; }
}
const pacchetto = (r, id) => JSON.parse(readFileSync(join(r, `ingresso/.pacchetti/${id}.json`), 'utf8'));

test('prepara: sposta in ordine di tempo senza riscrivere, con gli allegati; chat, memo del Progetto e nascosti restano', (t) => {
  const r = archivio(t), prima = readFileSync(join(r, 'ingresso/20261103-2340-k7q2.md'));
  const e = conOra(() => prepara(r));
  assert.deepEqual(e.spostati, ['20261103-2340-k7q2', '20261103-2343-b2c3']);
  assert.deepEqual(readFileSync(join(r, 'frammenti/2026/11/20261103-2340-k7q2.md')), prima);
  assert.ok(existsSync(join(r, 'frammenti/2026/11/20261103-2340-k7q2.jpg')));
  assert.deepEqual(readdirSync(join(r, 'ingresso')).sort(),
    ['.gitkeep', '.pacchetti', '20261103-2100-c4at.md', '20261103-2100-c4at.risposte.md', '20261103-2200-pr0g.md']);
  assert.match(e.errori.join('\n'), /pr0g\.md: memo del Progetto .*non è ancora fatta \(modello §7\.3\)/);
  assert.match(e.avvisi.join('\n'), /copia ridotta .* dipendenza nuova/);
  const hash = readFileSync(join(r, 'frammenti/.hash'), 'utf8');
  assert.match(hash, /  frammenti\/2026\/11\/20261103-2340-k7q2\.jpg\n/);
  assert.deepEqual(verifica(r, ['hash']), []);
  assert.deepEqual(e.pacchetti, ['20261103-2340-k7q2', '20261103-2343-b2c3']);
});

test('il pacchetto: frammento, allegati, recenti.md, alias, candidati per nome, coda, scarti', (t) => {
  const r = archivio(t);
  conOra(() => prepara(r));
  const p = pacchetto(r, '20261103-2340-k7q2');
  assert.equal(p.frammento.testo, MEMO);
  assert.equal(p.frammento.registrato, '2026-11-03T23:40:12+01:00');
  assert.deepEqual(p.frammento.allegati, [{ file: '20261103-2340-k7q2.jpg', percorso: 'frammenti/2026/11/20261103-2340-k7q2.jpg', ridotta: null }]);
  assert.equal(p.recenti['fino-a'], '20261101-2200-zz01');
  assert.match(p.recenti.testo, /# Recenti/);
  assert.ok(p.alias.includes('- albert camus → camus (persone, mondo)'), 'dalla mappa');
  assert.ok(p.alias.includes('- emil cioran → cioran (persone, mondo)'), 'e dai nodi che la mappa non ha ancora');
  const per = Object.fromEntries(p.candidati.map((n) => [n.nome, n.candidati.map((c) => `${c.slug}:${c.via}`)]));
  assert.deepEqual(per, { galimberti: ['umberto-galimberti:cognome'], chioran: ['cioran:levenshtein'], Camus: ['camus:esatta'], solitudine: ['solitudine:esatta'] });
  assert.deepEqual(p.coda, []);
  assert.deepEqual(p.scarti, [{ chiave: 'mazzy star into dust', contesto: [], portata: 'legame', data: '2026-11-01', parole: '«non c\'entra»' }]);
  const b = pacchetto(r, '20261103-2343-b2c3');
  assert.deepEqual(b.coda.map((x) => x.id), ['20261103-2340-k7q2'], 'la raffica: il memo di tre minuti prima');
  assert.deepEqual(b.candidati, [{ nome: 'marco', candidati: [{ slug: 'marco-aurelio', via: 'nome', debole: true, nome: 'Marco Aurelio', genere: 'persone', cerchia: 'mondo' }] }]);
});

test('i vicini: più vecchi di 7 giorni, un nodo o una parola in comune; nei primi 3 giorni tutti gli importati ✦', (t) => {
  const r = archivio(t);
  conOra(() => prepara(r));
  const v = pacchetto(r, '20261103-2340-k7q2').vicini;
  const comuni = v.filter((x) => x.comuni.length).map((x) => [x.id, x.segno, x.comuni]);
  assert.deepEqual(comuni, [['20261004-0000-s01', '✧', ['camus', 'ragazzo']], ['20261004-0000-u01', '✦', ['solitudine']]],
    'zz01 (camus) ha meno di 7 giorni; "i ragazzi" trova la parola "ragazzo"');
  assert.deepEqual(v.filter((x) => !x.comuni.length).map((x) => x.id), ['20261004-0000-u19'], 'Rust deve poter rispondere a Galimberti');
  // Dopo i primi 3 giorni gli importati senza niente in comune non ci sono più.
  const r2 = archivio(t, { 'frammenti/2026/10/20261031-1000-aaaa.md': fm(['registrato: 2026-10-31T10:00:00+01:00', 'canale: telefono'], 'primo'),
    'letture/2026/10/20261031-1000-aaaa.md': L([]) });
  conOra(() => prepara(r2));
  assert.deepEqual(pacchetto(r2, '20261103-2340-k7q2').vicini.map((x) => x.id), ['20261004-0000-s01', '20261004-0000-u01']);
});

test('nomi: una forma dentro un nome esatto più lungo cade; i deboli solo su parole piene; i link non contano', (t) => {
  const r = archivio(t), a = carica(r), { voci } = tabellaAlias(r, a.nodi);
  const n = (s) => nomi(s, voci, a.nodi).map((x) => [x.nome, x.candidati.map((c) => c.slug)]);
  assert.deepEqual(n('rileggo marco aurelio stasera'), [['marco aurelio', ['marco-aurelio']]]);
  assert.deepEqual(n('https://example.com/camus e poi niente'), []);
  assert.deepEqual(n('di camus, e di Albert Camus'), [['Albert Camus', ['camus']]]);
});

test('idempotenza e --solo: niente da spostare la seconda volta; un pacchetto solo; un doppione resta in ingresso', (t) => {
  const r = archivio(t);
  conOra(() => prepara(r));
  const e = conOra(() => prepara(r, '20261103-2343-b2c3'));
  assert.deepEqual([e.spostati, e.pacchetti], [[], ['20261103-2343-b2c3']]);
  assert.match(conOra(() => prepara(r, '20261101-2200-zz01')).errori.join('\n'), /--solo 20261101-2200-zz01: non è un frammento senza lettura/);
  writeFileSync(join(r, 'ingresso/20261103-2343-b2c3.md'), fm(['registrato: 2026-11-03T23:43:00+01:00', 'canale: telefono'], 'doppione'));
  assert.match(conOra(() => prepara(r)).errori.join('\n'), /c'è già frammenti\/2026\/11\/20261103-2343-b2c3\.md/);
  assert.ok(existsSync(join(r, 'ingresso/20261103-2343-b2c3.md')));
  // una lettura toglie il frammento dalla coda (§8.2)
  mkdirSync(join(r, 'letture/2026/11'), { recursive: true });
  writeFileSync(join(r, 'letture/2026/11/20261103-2340-k7q2.md'), L([]));
  rmSync(join(r, 'ingresso/20261103-2343-b2c3.md'));
  assert.deepEqual(conOra(() => prepara(r)).pacchetti, ['20261103-2343-b2c3']);
});

test('la chat ferma da prima delle 04:00 resta in ingresso con un avviso; da riga di comando: codice 1 per il memo del Progetto', (t) => {
  const r = archivio(t);
  const e = conOra(() => prepara(r), '2026-11-04T05:00:00+01:00');
  assert.match(e.avvisi.join('\n'), /c4at\.md: chat ferma .* il sigillo non è ancora fatto/);
  assert.ok(existsSync(join(r, 'ingresso/20261103-2100-c4at.md')));
  const p = spawnSync(process.execPath, [SCRIPT, 'prepara', '--radice', r], { encoding: 'utf8', env: { ...process.env, ATLANTE_ORA: ORA } });
  assert.equal(p.status, 1);
  assert.match(p.stdout, /^ERRORE ingresso\/20261103-2200-pr0g\.md: memo del Progetto/m);
  assert.match(p.stdout, /spostati: 0; pacchetti: ingresso\/\.pacchetti\/20261103-2340-k7q2\.json/);
});
