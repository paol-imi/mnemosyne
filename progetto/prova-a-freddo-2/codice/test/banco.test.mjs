// Blocco 1, il banco minimo (e le prove della porta del blocco 5): le prove in banco/prove/ validano contro banco/prove/schema.json; esegui.mjs le controlla
// su un archivio finto. Fixture in test/fixture/banco/: zero/ è il punto zero (con un verifica.mjs finto per G3), b01/,
// b02/, b06/ i file che "smista" scrive per quei casi come le schede li vogliono. Il test li copia in un repository git
// temporaneo, un commit per cartella, con le date di scripts/ora.mjs (GIT_AUTHOR_DATE e GIT_COMMITTER_DATE).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import { iso } from '../scripts/ora.mjs';
import { globRe, sezione, corsivi } from '../banco/esegui.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const FIX = join(RADICE, 'test/fixture/banco');
const ESEGUI = join(RADICE, 'banco/esegui.mjs');
const ORA = '2026-11-21T09:00:00+01:00';

// Il repository finto: un commit per fixture, nell'ordine dato, ciascuno con il messaggio e l'ora del suo giro.
function archivio(passi) {
  const d = mkdtempSync(join(tmpdir(), 'banco-test-'));
  const git = (args, data) => execFileSync('git', args, { cwd: d, encoding: 'utf8', env: { ...process.env,
    GIT_AUTHOR_NAME: 'memo', GIT_AUTHOR_EMAIL: 'memo@local', GIT_COMMITTER_NAME: 'memo', GIT_COMMITTER_EMAIL: 'memo@local',
    ...(data ? { GIT_AUTHOR_DATE: data, GIT_COMMITTER_DATE: data } : {}) } });
  git(['init', '-q', '-b', 'main']);
  const commit = (cartella, messaggio, quando) => {
    cpSync(join(FIX, cartella), d, { recursive: true });
    git(['add', '-A']);
    git(['commit', '-q', '-m', messaggio], iso(new Date(quando)));
    return git(['rev-parse', 'HEAD']).trim();
  };
  const sha = {};
  for (const [c, m, q] of passi) sha[c] = commit(c, m, q);
  const esegui = (...args) => spawnSync(process.execPath, [ESEGUI, '--radice', d, '--esiti', join(d, 'esiti.md'), ...args],
    { encoding: 'utf8', env: { ...process.env, ATLANTE_ORA: ORA } });
  const esiti = () => readFileSync(join(d, 'esiti.md'), 'utf8');
  const riga = (p) => esiti().split('\n').find((l) => l.startsWith(`| ${p} |`));
  return { d, git, sha, esegui, esiti, riga, scrivi: (f, t) => writeFileSync(join(d, f), t), leggi: (f) => readFileSync(join(d, f), 'utf8') };
}

const ZERO = ['zero', 'importa: punto zero', '2026-10-07T12:00:00+02:00'];
const B01 = ['b01', 'smista: 20261103-2340-k7q2', '2026-11-03T23:41:05+01:00'];
const B02 = ['b02', 'smista: 20261104-0812-b3n8', '2026-11-04T08:13:10+01:00'];
const B06 = ['b06', 'smista: 20261120-1244-m4r9', '2026-11-20T12:45:02+01:00'];

test('le prove validano contro lo schema del banco', () => {
  const ajv = new Ajv2020({ allErrors: true, strictTypes: false });
  const valida = ajv.compile(JSON.parse(readFileSync(join(RADICE, 'banco/prove/schema.json'), 'utf8')));
  const prove = readdirSync(join(RADICE, 'banco/prove')).filter((f) => /^[BDRT]\d{2}\.json$/.test(f));
  assert.deepEqual(prove.sort(), ['B01.json', 'B02.json', 'B03.json', 'B06.json', 'B11.json', 'B12.json', 'B14.json',
    'B22.json', 'B25.json', 'D02.json']);
  for (const f of prove) {
    const p = JSON.parse(readFileSync(join(RADICE, 'banco/prove', f), 'utf8'));
    assert.ok(valida(p), `${f}: ${ajv.errorsText(valida.errors)}`);
    assert.equal(p.id, f.slice(0, 3));
  }
  assert.ok(!valida({ id: 'B99', gravita: 'alta', data: '2026-11-03T23:40:00+01:00', messaggio: 'x', file: [{ campo: 'x' }] }),
    'un criterio senza dove né confronto non valida');
});

test('glob e sezioni', () => {
  assert.ok(globRe('frammenti/2026/11/20261103-2340-*.md').test('frammenti/2026/11/20261103-2340-k7q2.md'));
  assert.ok(globRe('restituzioni/**/*.md').test('restituzioni/2026/11/r-1.md'));
  assert.ok(globRe('{persone,opere}/*.md').test('opere/x.md'));
  assert.ok(!globRe('temi/*.md').test('temi/a/b.md'));
  const t = '## 2. Nodi\n- a\n## 3. Alias\n- b → c\n### dentro\n- d\n## 4. Parole candidate\n- e\n';
  assert.equal(sezione(t, 'Alias'), '- b → c\n### dentro\n- d');
  assert.equal(sezione(t, 'Scarti'), null);
});

test('B01 su un giro giusto: passa, con la testata del banco §5', () => {
  const a = archivio([ZERO, B01]);
  const r = a.esegui('--prova', 'B01', '--lettore', 'lettore-x', '--giudice', 'giudice-y');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const e = a.esiti();
  assert.match(e, /^# Banco: banco, 2026-11-21$/m);
  assert.match(e, /^- \*\*Modello lettore:\*\* lettore-x$/m);
  assert.match(e, /^- \*\*Modello giudice:\*\* giudice-y$/m);
  assert.match(e, /^- \*\*Schema:\*\* 3$/m);
  assert.match(e, new RegExp(`^- \\*\\*Partenza:\\*\\* ${a.sha.zero.slice(0, 12)}$`, 'm'), 'la partenza è il commit prima del caso');
  assert.equal(a.riga('B01'), '| B01 | passa | — | — |  |');
  assert.match(e, /\*\*Sintesi:\*\* 1 prove: 1 passano, 0 falliscono/);
  // la data del commit viene da ora.mjs: 23:41:05 di Roma
  assert.equal(a.git(['log', '-1', '--format=%aI']).trim(), '2026-11-03T23:41:05+01:00');
});

test('B01 rotto nel working tree: fallisce su G4, G5, G6, Risposta e Non deve; la riga si sostituisce', () => {
  const a = archivio([ZERO, B01]);
  a.esegui('--prova', 'B01');
  const cit = 'citazioni/il-nichilismo-e-l-ospite-inquietante.md';
  a.scrivi(cit, a.leggi(cit).replace('nato-da:', 'esito: simile\nnato-da:'));
  const ris = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
  a.scrivi(ris, a.leggi(ris).replace('**Salvato.**', '**Salvato.** Quanto ti ha colpito? E il titolo è giusto?'));
  a.scrivi('temi/cultura.md', '---\nschema: 3\nnome: cultura\nnato-da: [20261103-2340-k7q2]\n---\n');
  const r = a.esegui('--prova', 'B01');
  assert.equal(r.status, 1, r.stdout);
  const riga = a.riga('B01');
  assert.match(riga, /^\| B01 \| fallisce \| /);
  assert.match(riga, /G4: citazioni\/il-nichilismo-e-l-ospite-inquietante\.md ha esito all'ingresso/);
  assert.match(riga, /G6: restituzioni\/2026\/11\/r-20261103-2341-risposta\.md: 2 "\?"/);
  assert.match(riga, /G5: temi\/cultura\.md: il tema «cultura» non è una parola del frammento/);
  assert.match(riga, /Risposta 7: un "\?": il titolo è solo incerto/);
  assert.match(riga, /Non deve 4: nato un tema ragazzo, giovani o cultura/);
  assert.match(riga, /Non deve 6: la risposta chiede quanto ti ha colpito/);
  assert.match(riga, /\| alta \|  \|$/);
  assert.equal(a.esiti().split('\n').filter((l) => l.startsWith('| B01 |')).length, 1, 'una riga per prova');
  assert.match(a.esiti(), /\*\*Fallimenti per gravità:\*\* alta 1 \(B01\)/);
});

test('--ramo legge il ramo e non il working tree; G3 gira verifica.mjs sul ramo', () => {
  const a = archivio([ZERO, B01]);
  a.git(['branch', 'banco/zero']);
  a.scrivi('persone/umberto-galimberti.md', a.leggi('persone/umberto-galimberti.md').replace('cerchia: mondo', 'cerchia: mondo\nwikidata: Q123'));
  const wt = a.esegui('--prova', 'B01');
  assert.equal(wt.status, 1);
  assert.match(a.riga('B01'), /G3: ERRORE persone\/umberto-galimberti\.md: campo fuori schema wikidata/);
  const r = a.esegui('--prova', 'B01', '--ramo', 'banco/zero');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('B01'), '| B01 | passa | — | — |  |');
  assert.equal(a.git(['worktree', 'list']).trim().split('\n').length, 1, 'il worktree di G3 è stato tolto');
  assert.equal(a.esegui('--prova', 'B01', '--salta', 'G3').status, 0);
  assert.equal(a.riga('B01'), '| B01 | passa | — | — | saltati G3 |');
});

test('B02 risolve id(B01), controlla "nuovo" e "cambia" rispetto al commit prima del caso', () => {
  const a = archivio([ZERO, B01, B02]);
  const r = a.esegui('--prova', 'B02');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('B02'), '| B02 | passa | — | — |  |');
  assert.match(a.esiti(), new RegExp(`Partenza:\\*\\* ${a.sha.b01.slice(0, 12)}`));
  // il frammento di B01 ritoccato dopo: lo vede Non deve 1 e G7
  const f = 'frammenti/2026/11/20261103-2340-k7q2.md';
  a.scrivi(f, a.leggi(f).replace('nn stanno', 'non stanno'));
  const r2 = a.esegui('--prova', 'B02');
  assert.equal(r2.status, 1);
  assert.match(a.riga('B02'), /G7: cambiati frammenti\/2026\/11\/20261103-2340-k7q2\.md; Non deve 1: cambiato il frammento di B01 \| media \|/);
});

test('B06: deterministici passati, poi il giudice; la maggioranza decide e "non so" è contro', () => {
  const a = archivio([ZERO, B01, B02, B06]);
  const r = a.esegui('--prova', 'B06');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('B06'), '| B06 | in attesa del giudice | — | — | deterministici passati; 1 domanda al giudice |');

  const p = a.esegui('--prova', 'B06', '--per-giudice');
  assert.equal(p.status, 0);
  assert.match(p.stdout, /^Sei il giudice/);
  assert.match(p.stdout, /> marco mi ha mandato quella di camus/);
  assert.match(p.stdout, /### restituzioni\/2026\/11\/r-20261120-1245-risposta\.md/);
  assert.match(p.stdout, /### persone\/marco\.md/);
  assert.match(p.stdout, /^D1\. La risposta riprende/m);
  assert.doesNotMatch(p.stdout, /\{\{|attesa|contesto\/mappa|20261104-0812/, 'niente segnaposto, attese, contesto/ o file di altri casi');

  const g = (n, t) => { a.scrivi(`g${n}.md`, t); return join(a.d, `g${n}.md`); };
  const sì = g(1, 'D1: sì — restituzioni/…: «carina», la commenta');
  const no = g(2, 'D1: no — restituzioni/…: «Non risulta di Camus ○», nessuna ripresa');
  const nonso = g(3, '**D1:** non so — non basta');
  assert.equal(a.esegui('--prova', 'B06', '--giudizi', [no, no, sì].join(',')).status, 0);
  assert.equal(a.riga('B06'), '| B06 | passa | — | — | giudice: maggioranza di 3 |');
  assert.equal(a.esegui('--prova', 'B06', '--giudizi', [no, sì, nonso].join(',')).status, 1);
  assert.match(a.riga('B06'), /^\| B06 \| fallisce \| giudice D1: sì, restituzioni\/…: «carina», la commenta \| alta \|/);
  assert.equal(a.esegui('--prova', 'B06', '--giudizi', [no, no].join(',')).status, 2, 'servono tre giudizi');
});

test('B06 con marco risolto su Marco Aurelio: fallisce senza giudice', () => {
  const a = archivio([ZERO, B01, B02, B06]);
  const l = 'letture/2026/11/20261120-1244-m4r9.md';
  a.scrivi(l, a.leggi(l).replace('{p: nomina, a: marco,', '{p: nomina, a: marco-aurelio,'));
  const r = a.esegui('--prova', 'B06');
  assert.equal(r.status, 1);
  const riga = a.riga('B06');
  assert.match(riga, /File 5: manca nomina ✦ marco/);
  assert.match(riga, /Non deve 1: un legame con a: marco-aurelio/);
  assert.match(riga, /\| alta \| giudice non serve \|$/);
});

test('la fase "dopo consolida" e una prova senza il suo frammento', () => {
  const a = archivio([ZERO, B01]);
  const cit = 'citazioni/il-nichilismo-e-l-ospite-inquietante.md';
  const r = a.esegui('--prova', 'B01', '--fase', 'consolida');
  assert.equal(r.status, 1);
  assert.match(a.riga('B01 dopo consolida'), /Dopo consolida 1: autore non conforme/);
  cpSync(join(RADICE, 'test/fixture/esempi/consolidata', cit), join(a.d, cit));
  assert.equal(a.esegui('--prova', 'B01', '--fase', 'consolida').status, 0);
  assert.equal(a.riga('B01 dopo consolida'), '| B01 dopo consolida | passa | — | — | dopo consolida |');
  const b03 = a.esegui('--prova', 'B03');
  assert.equal(b03.status, 1);
  assert.match(a.riga('B03'), /G1: manca il frammento frammenti\/2026\/11\/20261109-1902-\*\.md/);
  assert.match(a.esiti(), /\*\*Parte B:\*\* 2 prove: 1 passano, 1 falliscono/);
});

test('alla_lettera: ogni corsivo della risposta si ritrova esatto in un frammento, refusi compresi', () => {
  assert.deepEqual(corsivi('**Salvato.** *uno* e _due_, * elenco, «*tre*» e *a … b*'), ['uno', 'due', 'tre', 'a … b']);
  const a = archivio([ZERO, B01, B02]);
  const prove = mkdtempSync(join(tmpdir(), 'banco-prove-'));
  // la prova sta sul frammento di B02 (escluso dalle fonti) e guarda la risposta di B01
  writeFileSync(join(prove, 'D99.json'), JSON.stringify({ id: 'D99', gravita: 'alta', data: '2026-11-04T08:12:00+01:00',
    risposta: [{ dove: 'restituzioni/**/*.md', alla_lettera: 'frammenti/**/*.md', motivo: 'non alla lettera' }] }));
  const ris = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
  const corpo = (t) => a.scrivi(ris, a.leggi(ris).replace(/(\n---\n)[\s\S]*$/, `$1${t}\n`));
  const prova = () => a.esegui('--prova', 'D99', '--prove', prove);
  assert.equal(prova().status, 1, 'il titolo in corsivo non è una frase dei frammenti');
  assert.match(a.riga('D99'), /Risposta 1: non alla lettera/);
  corpo('**Salvato.** Il 3 novembre ✦ *i ragazzi nn stanno male* e _«molto interessante»_; poi *ho visto uno spezzone … molto interessante*.');
  assert.equal(prova().status, 0, a.riga('D99'));
  corpo('Il 3 novembre ✦ *i ragazzi non stanno male*.');
  assert.equal(prova().status, 1, 'il refuso corretto non è alla lettera');
  corpo('Il 4 novembre ✦ *ah e la frase dell\'ospite era verso la fine*.');
  assert.equal(prova().status, 1, 'il frammento della prova non è una fonte');
});
