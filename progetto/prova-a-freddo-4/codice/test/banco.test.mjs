// Blocco 1, il banco minimo: le prove in banco/prove/ validano contro banco/prove/schema.json; esegui.mjs le controlla su
// un archivio finto. Fixture in test/fixture/banco/: zero/ è il punto zero (pochi importati, un'eredità, un verifica.mjs e
// uno smista.mjs finti), b01/, b02/, b06/ i file che "smista" scrive per quei casi come le schede li vogliono, b18/ il memo
// in ingresso/, r14/ e r01a/ ciò che scrivono Specchio e "ritratto", uscite/ le risposte in chat. Il test li copia in un
// repository git temporaneo, un commit per cartella, con le date di scripts/ora.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import { iso } from '../scripts/ora.mjs';
import { globRe, sezione, corsivi, diceData, maggioranza } from '../banco/esegui.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const FIX = join(RADICE, 'test/fixture/banco');
const ESEGUI = join(RADICE, 'banco/esegui.mjs');
const ORA = '2026-11-21T09:00:00+01:00';
const PROVE = ['B01', 'B02', 'B03', 'B06', 'B11', 'B12', 'B14', 'B18', 'B22', 'B25', 'D02', 'R01a', 'R14'];

// Il repository finto: un commit per fixture, nell'ordine dato, ciascuno con il messaggio e l'ora del suo giro.
function archivio(passi) {
  const d = mkdtempSync(join(tmpdir(), 'banco-test-'));
  const git = (args, data) => execFileSync('git', args, { cwd: d, encoding: 'utf8', env: { ...process.env,
    GIT_AUTHOR_NAME: 'memo', GIT_AUTHOR_EMAIL: 'memo@local', GIT_COMMITTER_NAME: 'memo', GIT_COMMITTER_EMAIL: 'memo@local',
    ...(data ? { GIT_AUTHOR_DATE: data, GIT_COMMITTER_DATE: data } : {}) } });
  git(['init', '-q', '-b', 'main']);
  const sha = {};
  for (const [c, m, q, tag] of passi) {
    cpSync(join(FIX, c), d, { recursive: true });
    git(['add', '-A']);
    git(['commit', '-q', '-m', m], iso(new Date(q)));
    if (tag) git(['tag', tag]);
    sha[c] = git(['rev-parse', 'HEAD']).trim();
  }
  const esegui = (...args) => spawnSync(process.execPath, [ESEGUI, '--radice', d, '--esiti', join(d, 'esiti.md'), ...args],
    { encoding: 'utf8', env: { ...process.env, ATLANTE_ORA: ORA } });
  const esiti = () => readFileSync(join(d, 'esiti.md'), 'utf8');
  const riga = (p) => esiti().split('\n').find((l) => l.startsWith(`| ${p} |`));
  return { d, git, sha, esegui, esiti, riga, scrivi: (f, t) => writeFileSync(join(d, f), t), leggi: (f) => readFileSync(join(d, f), 'utf8') };
}
const uscita = (nome) => join(FIX, 'uscite', nome);
const tmp = (t) => { const f = join(mkdtempSync(join(tmpdir(), 'banco-uscita-')), 'uscita.md'); writeFileSync(f, t); return f; };

const ZERO = ['zero', 'importa: punto zero', '2026-10-31T12:00:00+01:00', 'punto-zero'];
const B01 = ['b01', 'smista: 20261103-2340-k7q2', '2026-11-03T23:41:05+01:00'];
const B02 = ['b02', 'smista: 20261104-0812-b3n8', '2026-11-04T08:13:10+01:00'];
const B06 = ['b06', 'smista: 20261120-1244-m4r9', '2026-11-20T12:45:02+01:00'];

test('le prove validano contro lo schema del banco', () => {
  const ajv = new Ajv2020({ allErrors: true, strictTypes: false });
  const valida = ajv.compile(JSON.parse(readFileSync(join(RADICE, 'banco/prove/schema.json'), 'utf8')));
  const prove = readdirSync(join(RADICE, 'banco/prove')).filter((f) => /^[BDRT]\d{2}[a-z]?\.json$/.test(f));
  assert.deepEqual(prove.map((f) => f.slice(0, -5)).sort(), [...PROVE].sort());
  for (const f of prove) {
    const p = JSON.parse(readFileSync(join(RADICE, 'banco/prove', f), 'utf8'));
    assert.ok(valida(p), `${f}: ${ajv.errorsText(valida.errors)}`);
    assert.equal(p.id, f.slice(0, -5));
  }
  assert.ok(!valida({ id: 'B99', gravita: 'alta', data: '2026-11-03T23:40:00+01:00', messaggio: 'x', file: [{ campo: 'x' }] }),
    'un criterio senza dove né confronto non valida');
  const testo = readFileSync(join(RADICE, 'banco/prove/B12.json'), 'utf8') + readFileSync(join(RADICE, 'banco/prove/B22.json'), 'utf8');
  assert.doesNotMatch(testo, /blocco 7/, 'Conti e Correzioni sono del blocco 5');
});

test('glob, sezioni, date dette', () => {
  assert.ok(globRe('frammenti/2026/11/20261103-2340-*.md').test('frammenti/2026/11/20261103-2340-k7q2.md'));
  assert.ok(globRe('restituzioni/**/*.md').test('restituzioni/2026/11/r-1.md'));
  assert.ok(globRe('{persone,opere}/*.md').test('opere/x.md'));
  assert.ok(globRe('frammenti/**/*-{u18,u19}.md').test('frammenti/2026/10/20261004-0000-u19.md'));
  assert.ok(!globRe('temi/*.md').test('temi/a/b.md'));
  const t = '## 2. Nodi\n- a\n## 3. Alias\n- b → c\n### dentro\n- d\n## 4. Parole candidate\n- e\n';
  assert.equal(sezione(t, 'Alias'), '- b → c\n### dentro\n- d');
  assert.equal(sezione(t, 'Scarti'), null);
  assert.ok(diceData('(3 novembre)', '2026-11-03'));
  assert.ok(diceData('entro il 4/10', '2026-10-04'));
  assert.ok(diceData('il 2026-10-04', '2026-10-04'));
  assert.ok(!diceData('(13 novembre)', '2026-11-03'));
  assert.ok(!diceData('(3 ottobre)', '2026-11-03'));
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
  assert.match(e, /^\| prova \| esito \| criteri falliti \| gravità \| nota \|$/m);
  assert.equal(a.riga('B01'), '| B01 | passa | — | — |  |');
  assert.match(e, /\*\*Sintesi:\*\* 1 prove: 1 passano, 0 falliscono/);
});

test('B01 rotto nel working tree: G4, G5, G6, Risposta (anche le voci a inizio riga) e Non deve; la riga si sostituisce', () => {
  const a = archivio([ZERO, B01]);
  a.esegui('--prova', 'B01');
  const cit = 'citazioni/il-nichilismo-e-l-ospite-inquietante.md';
  a.scrivi(cit, a.leggi(cit).replace('nato-da:', 'esito: simile\nnato-da:'));
  const ris = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
  a.scrivi(ris, a.leggi(ris).replace('**Salvato.**', '**Salvato.** Quanto ti ha colpito? E il titolo è giusto?')
    .replace('⚠.\n2. Lo', '⚠. 2. Lo'));
  a.scrivi('temi/cultura.md', '---\nschema: 3\nnome: cultura\nnato-da: [20261103-2340-k7q2]\n---\n');
  const r = a.esegui('--prova', 'B01');
  assert.equal(r.status, 1, r.stdout);
  const riga = a.riga('B01');
  assert.match(riga, /^\| B01 \| fallisce \| /);
  assert.match(riga, /G4: citazioni\/il-nichilismo-e-l-ospite-inquietante\.md ha esito all'ingresso/);
  assert.match(riga, /G6: restituzioni\/2026\/11\/r-20261103-2341-risposta\.md: 2 "\?"/);
  assert.match(riga, /G5: temi\/cultura\.md: il tema «cultura» non è una parola del frammento/);
  assert.match(riga, /Risposta 7: un "\?" \(contato come G6\)/);
  assert.match(riga, /Risposta 8: una voce non sta a inizio riga/);
  assert.match(riga, /Non deve 4: nato un tema ragazzo, giovani o cultura/);
  assert.match(riga, /Non deve 6: la risposta chiede quanto ti ha colpito/);
  assert.match(riga, /\| alta \|  \|$/);
  assert.equal(a.esiti().split('\n').filter((l) => l.startsWith('| B01 |')).length, 1, 'una riga per prova');
  assert.match(a.esiti(), /\*\*Fallimenti per gravità:\*\* alta 1 \(B01\)/);
});

test('G6 conta i "?" come il banco: non quelli in «» né in una tua frase in corsivo', () => {
  const a = archivio([ZERO, B01]);
  const ris = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
  a.scrivi(ris, a.leggi(ris).replace('**Salvato.**', '**Salvato.** «Chi l\'ha detto?»'));
  assert.equal(a.esegui('--prova', 'B01').status, 0, a.riga('B01'));
});

test('--ramo legge il ramo e non il working tree; G3 gira verifica.mjs sul ramo', () => {
  const a = archivio([ZERO, B01]);
  a.git(['branch', 'banco/zero']);
  a.scrivi('persone/umberto-galimberti.md', a.leggi('persone/umberto-galimberti.md').replace('cerchia: mondo', 'cerchia: mondo\nwikidata: Q123'));
  assert.equal(a.esegui('--prova', 'B01').status, 1);
  assert.match(a.riga('B01'), /G3: ERRORE persone\/umberto-galimberti\.md: campo fuori schema wikidata/);
  const r = a.esegui('--prova', 'B01', '--ramo', 'banco/zero');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('B01'), '| B01 | passa | — | — |  |');
  assert.equal(a.git(['worktree', 'list']).trim().split('\n').length, 1, 'il worktree è stato tolto');
  assert.equal(a.esegui('--prova', 'B01', '--salta', 'G3').status, 0);
  assert.equal(a.riga('B01'), '| B01 | passa | — | — | saltati G3 |');
});

test('B02 risolve id(B01), controlla "nuovo" e "cambia" rispetto al commit prima del caso', () => {
  const a = archivio([ZERO, B01, B02]);
  const r = a.esegui('--prova', 'B02');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('B02'), '| B02 | passa | — | — |  |');
  assert.match(a.esiti(), new RegExp(`Partenza:\\*\\* ${a.sha.b01.slice(0, 12)}`));
  const f = 'frammenti/2026/11/20261103-2340-k7q2.md';
  a.scrivi(f, a.leggi(f).replace('nn stanno', 'non stanno'));
  assert.equal(a.esegui('--prova', 'B02').status, 1);
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

test('B06 con marco risolto su Marco Aurelio, o senza la cerchia vita in § Alias: fallisce senza giudice', () => {
  const a = archivio([ZERO, B01, B02, B06]);
  const l = 'letture/2026/11/20261120-1244-m4r9.md';
  a.scrivi(l, a.leggi(l).replace('{p: nomina, a: marco,', '{p: nomina, a: marco-aurelio,'));
  a.scrivi('contesto/mappa.md', a.leggi('contesto/mappa.md').replace('marco → marco (persone, vita)', 'marco → marco (persone)'));
  assert.equal(a.esegui('--prova', 'B06').status, 1);
  const riga = a.riga('B06');
  assert.match(riga, /File 5: manca nomina ✦ marco/);
  assert.match(riga, /Mappa 1: § Alias non porta marco a marco \(persone, vita\)/);
  assert.match(riga, /Non deve 1: un legame con a: marco-aurelio/);
  assert.match(riga, /\| alta \| giudice non serve \|$/);
});

test('la fase "dopo consolida" e una prova senza il suo frammento', () => {
  const a = archivio([ZERO, B01]);
  const cit = 'citazioni/il-nichilismo-e-l-ospite-inquietante.md';
  assert.equal(a.esegui('--prova', 'B01', '--fase', 'consolida').status, 1);
  assert.match(a.riga('B01 dopo consolida'), /Dopo consolida 1: autore non conforme/);
  cpSync(join(RADICE, 'test/fixture/esempi/consolidata', cit), join(a.d, cit));
  assert.equal(a.esegui('--prova', 'B01', '--fase', 'consolida').status, 0);
  assert.equal(a.riga('B01 dopo consolida'), '| B01 dopo consolida | passa | — | — | dopo consolida |');
  assert.equal(a.esegui('--prova', 'B03').status, 1);
  assert.match(a.riga('B03'), /G1: manca il file frammenti\/2026\/11\/20261109-1902-\*\.md/);
  assert.match(a.esiti(), /\*\*Parte B:\*\* 2 prove: 1 passano, 1 falliscono/);
});

test('B18 in cattura (blocco 3): G1 sul file in ingresso/ e G3', () => {
  const a = archivio([ZERO, ['b18', 'memo: 20270209-1300-z9k1', '2027-02-09T13:00:20+01:00']]);
  assert.equal(a.esegui('--prova', 'B18', '--fase', 'cattura').status, 0, a.riga('B18 cattura'));
  assert.equal(a.riga('B18 cattura'), '| B18 cattura | passa | — | — | cattura: G1 in ingresso/ e G3 |');
  a.scrivi('ingresso/20270209-1300-z9k1.md', a.leggi('ingresso/20270209-1300-z9k1.md').replace('scrivere qualcosa', 'scrivere qualcosa.'));
  assert.equal(a.esegui('--prova', 'B18', '--fase', 'cattura').status, 1);
  assert.match(a.riga('B18 cattura'), /G1: il corpo non è il messaggio byte per byte \| bassa \|/);
  assert.equal(a.esegui('--prova', 'B18').status, 1, 'senza cattura vuole il frammento in frammenti/');
});

test('alla_lettera: ogni corsivo si ritrova esatto in un frammento, refusi compresi', () => {
  assert.deepEqual(corsivi('**Salvato.** *uno* e _due_, * elenco, «*tre*» e *a … b*'), ['uno', 'due', 'tre', 'a … b']);
  const a = archivio([ZERO, B01, B02]);
  const prove = mkdtempSync(join(tmpdir(), 'banco-prove-'));
  writeFileSync(join(prove, 'D99.json'), JSON.stringify({ id: 'D99', gravita: 'alta', data: '2026-11-04T08:12:00+01:00',
    risposta: [{ dove: 'restituzioni/2026/11/*.md', alla_lettera: 'frammenti/**/*.md', motivo: 'non alla lettera' }] }));
  const ris = 'restituzioni/2026/11/r-20261103-2341-risposta.md';
  const corpo = (t) => a.scrivi(ris, a.leggi(ris).replace(/(\n---\n)[\s\S]*$/, `$1${t}\n`));
  const prova = () => a.esegui('--prova', 'D99', '--prove', prove);
  assert.equal(prova().status, 1, 'il titolo in corsivo non è una frase dei frammenti');
  corpo('**Salvato.** Il 3 novembre ✦ *i ragazzi nn stanno male* e _«molto interessante»_; poi *ho visto uno spezzone … molto interessante*.');
  assert.equal(prova().status, 0, a.riga('D99'));
  corpo('Il 3 novembre ✦ *i ragazzi non stanno male*.');
  assert.equal(prova().status, 1, 'il refuso corretto non è alla lettera');
  corpo('Il 4 novembre ✦ *ah e la frase dell\'ospite era verso la fine*.');
  assert.equal(prova().status, 1, 'il frammento della prova non è una fonte');
});

test('D02 in Specchio, la sera di B06: la Forma sull\'uscita testuale, Scrive sui file', () => {
  const a = archivio([ZERO, B01, B02, B06]);
  const d02 = readFileSync(uscita('d02.md'), 'utf8');
  const r = a.esegui('--prova', 'D02', '--uscita', uscita('d02.md'));
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('D02'), '| D02 | in attesa del giudice | — | — | deterministici passati; 2 domande al giudice |');
  assert.match(a.esiti(), new RegExp(`Partenza:\\*\\* ${a.sha.b06.slice(0, 12)}`), 'la base è dopo B06');
  const p = a.esegui('--prova', 'D02', '--uscita', uscita('d02.md'), '--per-giudice');
  assert.match(p.stdout, /### la risposta in chat/);
  assert.match(p.stdout, /trascritta da Claude/);

  const prova = (t, ...x) => { const s = a.esegui('--prova', 'D02', '--uscita', tmp(t), ...x); return [s.status, a.riga('D02')]; };
  let [s, riga] = prova(d02.replace('nn stanno', 'non stanno'));
  assert.equal(s, 1);
  assert.match(riga, /Forma ✦ alla lettera: «i ragazzi non stanno male per motivi psicologici ma culturali» non è alla lettera/);
  [s, riga] = prova(d02.replace(' (4 novembre)', ' (5 novembre)'));
  assert.match(riga, /Forma ✦ alla lettera: «ah e la frase dell'ospite era verso la fine» senza la sua data/);
  [s, riga] = prova(d02.replace(', trascritta da Claude)', ')'));
  assert.match(riga, /Forma riportate: «- \*la lucidità è una ferita che non si chiude\* ✦ \(entro il 12 ottobre\)» apre un gruppo senza «trascritta da Claude» in testa/);
  [s, riga] = prova(d02.replace('(entro il 15 ottobre, nell\'archivio d\'origine)', '(entro il 15 ottobre, trascritta da Claude)'));
  assert.match(riga, /Forma riportate: .*vita vera.*«trascritta da Claude» fuori dalla testa di un gruppo/, 'la nota su una frase non riportata');
  [s, riga] = prova(d02.replace('(entro il 12 ottobre, trascritta da Claude)', '(entro il 12 ottobre)')
    .replace('- *la lucidità', 'Trascritte da Claude, trascritta da Claude nel seme:\n- *la lucidità'));
  assert.equal(s, 0, `la nota in una riga senza segni subito prima del gruppo: ${riga}`);
  [s, riga] = prova(d02.replace('Dal seme', 'la nota trascritta da Claude, fuori posto\nDal seme'));
  assert.match(riga, /Forma riportate: «la nota trascritta da Claude, fuori posto»: «trascritta da Claude» fuori dalla testa di un gruppo/);
  [s, riga] = prova(d02.replace('«I think human consciousness is a tragic misstep» ○', '«I think human consciousness is a tragic misstep»'));
  assert.match(riga, /Forma altrui ○: le parole di U18, U19 o U20 tra «» senza ○/);
  [s, riga] = prova(d02.replace('«I think human consciousness is a tragic misstep»', '*I think human consciousness is a tragic misstep*'));
  assert.match(riga, /Forma altrui: un corsivo dalle parole d'altri/);
  [s, riga] = prova(d02.replace('Dal seme', '- *ho visto uno spezzone di galimberti* ✦ (3 novembre)\nDal seme') + 'Dal seme ancora: *cercare senso senza consolazioni facili* ✧\n');
  assert.match(riga, /Forma seme una: non c'è esattamente una riga ✧/);
  [s, riga] = prova(d02.replace(/^Dal seme.*$/m, '').replace('Le tue frasi, dalle più recenti:', 'Dal seme: *cercare senso senza consolazioni facili* ✧ (5 ottobre)'));
  assert.match(riga, /Forma seme dopo: la riga ✧ non viene dopo l'ultima riga ✦/);
  [s, riga] = prova(d02.replace('consolazioni facili*', 'consolazioni facili, sempre*'));
  assert.match(riga, /Forma seme alla lettera: «cercare senso senza consolazioni facili, sempre» non è alla lettera/);
  [s, riga] = prova(`${d02}Vuoi sapere altro?\n`);
  assert.match(riga, /Forma Vuoi il resto: più di 8 frammenti/);
  [s, riga] = prova(d02.replace('Le tue frasi', 'Le tue frasi, e una sintesi: *la ricerca di senso*,'));
  assert.match(riga, /Non deve: corsivo non alla lettera: «la ricerca di senso» non è alla lettera/);
  a.scrivi('temi/greci.md', '---\nschema: 3\nnome: greci\n---\n');
  a.git(['add', '-A']);
  [s, riga] = prova(d02);
  assert.match(riga, /Scrive 1: un file nuovo in una cartella di nodi/);
  assert.equal(s, 1);
  const senza = a.esegui('--prova', 'D02');
  assert.equal(senza.status, 1);
  assert.match(a.riga('D02'), /manca l'uscita testuale \(--uscita FILE\)/);
});

test('D02: le riportate in gruppo, la nota una volta sola in testa (banco parte 2, D02)', () => {
  const a = archivio([ZERO, B01, B02, B06]);
  a.scrivi('frammenti/2026/10/20261013-0000-u08.md', '---\nregistrato: 2026-10-13\ncanale: importato\nvoce: sua\nforma: riportata\n---\nogni notte rimetto in ordine le stesse domande\n');
  const prova = (righe) => { const s = a.esegui('--prova', 'D02', '--uscita', tmp(`${righe.join('\n')}\nDal seme, a parte: *cercare senso senza consolazioni facili* ✧ (entro il 5 ottobre)\n`));
    return [s.status, a.riga('D02')]; };
  const r08 = '- *ogni notte rimetto in ordine le stesse domande* ✦ (entro il 13 ottobre';
  const r07 = '- *la lucidità è una ferita che non si chiude* ✦ (entro il 12 ottobre';
  const r10 = '- *non voglio una vita comoda, voglio una vita vera* ✦ (entro il 15 ottobre)';
  let [s, riga] = prova([r10, `${r08}, trascritta da Claude)`, `${r07})`]);
  assert.equal(s, 0, `una nota per un gruppo di due righe: ${riga}`);
  [s, riga] = prova([r10, `${r08}, trascritta da Claude)`, `${r07}, trascritta da Claude)`]);
  assert.match(riga, /Forma riportate: .*12 ottobre, trascritta da Claude\)»: «trascritta da Claude» fuori dalla testa di un gruppo/, 'la nota ripetuta nel gruppo');
  [s, riga] = prova([`${r08}, trascritta da Claude)`, r10, `${r07})`]);
  assert.match(riga, /Forma riportate: .*apre un gruppo senza «trascritta da Claude» in testa/, 'due gruppi, il secondo senza nota');
  [s, riga] = prova([`${r08}, trascritta da Claude)`, r10, `${r07}, trascritta da Claude)`]);
  assert.equal(s, 0, `due gruppi, ognuno con la sua nota: ${riga}`);
});

test('D02 «oggi» sul punto zero: la base è il tag punto-zero, con più di 8 frasi vuole «Vuoi il resto?»', () => {
  const a = archivio([ZERO]);
  const oggi = '- *non voglio una vita comoda, voglio una vita vera* ✦ (entro il 15 ottobre)\n'
    + '- *la lucidità è una ferita che non si chiude* ✦ (entro il 12 ottobre, trascritta da Claude nel seme)\n'
    + '*cercare senso senza consolazioni facili* ✧ (entro il 5 ottobre)\n';
  const r = a.esegui('--prova', 'D02', '--uscita', tmp(oggi), '--etichetta', 'D02 oggi');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(a.riga('D02 oggi'), /in attesa del giudice/);
  assert.match(a.esiti(), new RegExp(`Partenza:\\*\\* ${a.sha.zero.slice(0, 12)}`));
  for (let i = 0; i < 7; i++) a.scrivi(`frammenti/2026/10/2026102${i}-0000-u2${i}.md`, `---\nregistrato: 2026-10-2${i}\ncanale: importato\nvoce: sua\n---\nfrase importata numero ${i} qui\n`);
  assert.equal(a.esegui('--prova', 'D02', '--uscita', tmp(oggi), '--etichetta', 'D02 oggi').status, 1);
  assert.match(a.riga('D02 oggi'), /Forma Vuoi il resto/);
  assert.equal(a.esegui('--prova', 'D02', '--uscita', tmp(`${oggi}Vuoi il resto?\n`), '--etichetta', 'D02 oggi').status, 0, a.riga('D02 oggi'));
});

test('R14: D0 col comando dei vicini, il ponte o «Niente si aggancia ancora.», la soglia del giudice', () => {
  const a = archivio([ZERO, B01, B02, ['r14', 'specchio: 20261105-2100-chat', '2026-11-05T21:10:00+01:00']]);
  a.git(['branch', 'banco/R14']);
  const r = a.esegui('--prova', 'R14', '--ramo', 'banco/R14', '--uscita', uscita('r14-ponte.md'));
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('R14'), '| R14 | in attesa del giudice | — | — | deterministici passati; 3 domande al giudice |');
  assert.match(a.esiti(), new RegExp(`Partenza:\\*\\* ${a.sha.b02.slice(0, 12)}`), 'la base è dopo B02');
  assert.equal(a.git(['worktree', 'list']).trim().split('\n').length, 1, 'il worktree del comando è stato tolto');

  // il ponte senza la data del punto zero, e un ponte in più verso un ~Nome
  const ponte = readFileSync(uscita('r14-ponte.md'), 'utf8');
  assert.equal(a.esegui('--prova', 'R14', '--uscita', tmp(ponte.replace('entro il 4 ottobre', 'in ottobre'))).status, 1);
  assert.match(a.riga('R14'), /D1–D2: né la sola riga/);
  const ris = 'restituzioni/2026/11/r-20261105-2110-risposta.md';
  a.scrivi(ris, a.leggi(ris).replace('legami:\n', 'legami:\n  - {p: converge-con, tra: [20261103-2340-k7q2, ~Sisifo], voce: proposta, perche: "x"}\n'));
  assert.equal(a.esegui('--prova', 'R14', '--uscita', uscita('r14-ponte.md')).status, 1);
  assert.match(a.riga('R14'), /D3: un ponte verso un nodo o un frammento che il punto zero non contiene/);

  // il seme ✧ non è un capo del ponte: né nel bilancio (D1) né nel legame (D2)
  const s = archivio([ZERO, B01, B02, ['r14', 'specchio: 20261105-2100-chat', '2026-11-05T21:10:00+01:00']]);
  const rs = 'restituzioni/2026/11/r-20261105-2110-risposta.md';
  s.scrivi(rs, s.leggi(rs).replaceAll('20261004-0000-u19', '20261005-0000-s01'));
  const seme = tmp('*diceva che il nichilismo è l\'ospite inquietante* ✦ (3 novembre)\n'
    + 'entro il 5 ottobre il seme: *cercare senso senza consolazioni facili* ✧\nil prezzo della lucidità ◌\n');
  assert.equal(s.esegui('--prova', 'R14', '--uscita', seme).status, 1);
  assert.match(s.riga('R14'), /D1–D2: né la sola riga/);
  assert.match(s.riga('R14'), /D1–D2 seme: un ponte verso il seme/);
  assert.equal(s.esegui('--prova', 'R14', '--uscita', uscita('r14-niente.md')).status, 1, 'anche senza ponte nel bilancio');
  assert.match(s.riga('R14'), /D1–D2 seme/);
  const er = archivio([ZERO, B01, B02, ['r14', 'specchio: 20261105-2100-chat', '2026-11-05T21:10:00+01:00']]);
  er.scrivi(rs, er.leggi(rs).replace('tra: [20261103-2340-k7q2, 20261004-0000-u19]', 'tra: [20261103-2340-k7q2, r-20261012-0000-eredita-lucidita]'));
  assert.equal(er.esegui('--prova', 'R14', '--uscita', uscita('r14-ponte.md')).status, 1);
  assert.match(er.riga('R14'), /D1–D2 seme: .*eredita/);

  // nessun ponte: la sola riga; con «Nessun ponte oggi.» no
  const b = archivio([ZERO, B01, B02]);
  assert.equal(b.esegui('--prova', 'R14', '--uscita', uscita('r14-niente.md')).status, 0, b.riga('R14'));
  assert.equal(b.esegui('--prova', 'R14', '--uscita', tmp('Niente si aggancia ancora.\nNessun ponte oggi.\n')).status, 1);
  assert.match(b.riga('R14'), /D4: «Nessun ponte oggi\.» è delle altre sere/);
  // senza ponte il giudice conta solo la 3
  const g = (n, t) => { b.scrivi(`g${n}.md`, t); return join(b.d, `g${n}.md`); };
  const tre = ['D1: no — x', 'D2: no — x', 'D3: no — niente di inventato'].join('\n');
  const gs = [g(1, tre), g(2, tre), g(3, tre)].join(',');
  assert.equal(b.esegui('--prova', 'R14', '--uscita', uscita('r14-niente.md'), '--giudizi', gs).status, 0, b.riga('R14'));
  assert.equal(b.esegui('--prova', 'R14', '--uscita', uscita('r14-ponte.md'), '--base', b.sha.b02, '--salta', 'G7').status, 1,
    'il ponte senza restituzione: D2 cade');

  // D0: con un'ora fuori dai primi 3 giorni lo smista finto non dà u19; senza smista.mjs, D0 cade
  const c = archivio([ZERO, B01, B02]);
  c.git(['rm', '-q', 'scripts/smista.mjs']);
  assert.equal(c.esegui('--prova', 'R14', '--uscita', uscita('r14-niente.md')).status, 1);
  assert.match(c.riga('R14'), /D0: i vicini di id\(B01\) al 2026-11-05 non comprendono 20261004-0000-u19/);
});

test('R01a: il primo ritratto sul punto zero (blocco 4) e la soglia 7 su 8', () => {
  const a = archivio([ZERO, ['r01a', 'ritratto: 2026-11-03', '2026-11-03T09:07:00+01:00']]);
  const r = a.esegui('--prova', 'R01a');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(a.riga('R01a'), '| R01a | in attesa del giudice | — | — | deterministici passati; 8 domande al giudice |');
  const g = (n, t) => { a.scrivi(`g${n}.md`, t); return join(a.d, `g${n}.md`); };
  const voti = (d3) => ['D1: sì — a', 'D2: no — b', `D3: ${d3} — c`, 'D4: sì — d', 'D5: sì — e', 'D6: sì — f', 'D7: no — g', 'D8: no — h'].join('\n');
  const tre = (t) => [g(1, t), g(2, t), g(3, t)].join(',');
  assert.equal(a.esegui('--prova', 'R01a', '--giudizi', tre(voti('no'))).status, 0, 'la 3 non è obbligatoria: 7 su 8');
  assert.equal(a.esegui('--prova', 'R01a', '--giudizi', tre(voti('no').replace('D4: sì', 'D4: non so'))).status, 1);
  assert.match(a.riga('R01a'), /giudice: 6 su 8, soglia 7/);
  assert.equal(a.esegui('--prova', 'R01a', '--giudizi', tre(voti('sì').replace('D8: no', 'D8: sì'))).status, 1, 'la 8 è obbligatoria');

  const rit = 'restituzioni/2026/11/r-20261103-0907-ritratto.md';
  const giusto = a.leggi(rit);
  a.scrivi(rit, giusto.replace('tra: [20261015-0000-u10, 20261004-0000-u19]', 'tra: [20261015-0000-u10, 20261005-0000-s01]'));
  assert.equal(a.esegui('--prova', 'R01a').status, 1, 'il seme ✧ come capo della convergenza');
  assert.match(a.riga('R01a'), /capo della convergenza: un converge-con del ritratto con un capo nel seme/);
  a.scrivi(rit, giusto.replace('tra: [20261015-0000-u10, 20261004-0000-u19]', 'tra: [nichilismo, 20261005-0000-s01]'));
  assert.equal(a.esegui('--prova', 'R01a').status, 1);
  assert.match(a.riga('R01a'), /capo della convergenza: nessun converge-con del ritratto con un capo in una frase ✦/);
  a.scrivi(rit, giusto.replace('tra: [20261015-0000-u10, 20261004-0000-u19]', 'tra: [nichilismo, 20261012-0000-u07]')
    .replace('(15 ottobre)', '(16 ottobre)'));
  assert.equal(a.esegui('--prova', 'R01a').status, 1);
  const riga = a.riga('R01a');
  assert.match(riga, /convergenza nuova: nessun converge-con del ritratto che non sia già una delle C1–C25/);
  assert.match(riga, /✦ alla lettera: «non voglio una vita comoda, voglio una vita vera» senza la sua data/);
  assert.match(riga, /D1: contesto\/ritratto\.md non è la copia/);
});

test('maggioranza: soglie e "non so"', () => {
  const d = [{ attesa: 'sì' }, { attesa: 'no' }];
  assert.deepEqual(maggioranza(d, ['D1: sì\nD2: no', 'D1: sì\nD2: no', 'D2: sì']), []);
  assert.equal(maggioranza(d, ['D1: non so\nD2: no', 'D1: sì\nD2: no', 'D2: no']).length, 1);
  assert.deepEqual(maggioranza(d, ['D1: no\nD2: no', 'D1: no\nD2: no', 'D2: no'], { obbligatorie: [2] }), []);
});
