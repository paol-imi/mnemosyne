// contesto.mjs (modello §6.1, §6.2): recenti.md, parole.md e mappa.md §1–5 e §8 con la testata. Un archivio finto in
// una cartella temporanea: un importato e un seme, quattro memo del telefono (uno non parlante, uno delicato), una chat,
// una risposta, una eredita con una voce accolta, una lapide, una citazione verificata, una raccolta senza scopo, due
// correzioni (una in attesa, una già applicata). In fondo la finestra mobile di parole.md sotto il tetto.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { contesto, parlante } from '../scripts/contesto.mjs';
import { sezione } from '../banco/esegui.mjs';

const SCRIPT = new URL('../scripts/contesto.mjs', import.meta.url).pathname;
const ORA = '2026-11-12T21:00:00+01:00'; // un giovedì
const L = (intento, legami = '[]', extra = '') =>
  `---\nschema: 3\nversione: 1\nletto-da: m\nprompt: "abcdef1"\nintento: [${intento}]\nlegami: ${legami}\n${extra}---\n`;
const FILE = {
  'frammenti/2026/10/20261004-0000-u01.md': '---\nregistrato: 2026-10-04\ncanale: importato\nvoce: sua\n---\nsolitudine, rabbia e il resto del percorso\n',
  'letture/2026/10/20261004-0000-u01.md': L('salva', '\n  - {p: parla-di, a: solitudine, voce: sua, perche: «solitudine»}\n'),
  'frammenti/2026/11/20261103-2340-k7q2.md': '---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---\nho visto galimberti a teatro, molto interessante\n',
  'frammenti/2026/10/20261005-0000-s01.md': '---\nregistrato: 2026-10-05\ncanale: importato\nvoce: seme\n---\nil nucleo dello sguardo, a parte\n',
  'letture/2026/11/20261103-2340-k7q2.md': L('salva', '\n  - {p: nomina, a: umberto-galimberti, voce: sua, perche: «galimberti»}\n  - {p: serve-a, a: tatuaggi, voce: sua, perche: «interessante»}\n  - {p: parla-di, a: stare-da-solo, voce: sua, perche: «teatro»}\n  - {p: ritorna-su, a: 20261004-0000-u01, come: corregge, nodo: umberto-galimberti, campo: cerchia, vecchio: vita, valore: mondo, voce: sua, perche: «x»}\n',
    'parole: [greci]\nrisposta: r-20261103-2341-risposta\n'),
  'frammenti/2026/11/20261105-0900-a1b2.md': '---\nregistrato: 2026-11-05T09:00:00+01:00\ncanale: telefono\n---\nancora galimberti stamattina, il nichilismo\n',
  'letture/2026/11/20261105-0900-a1b2.md': L('salva', '\n  - {p: nomina, a: umberto-galimberti, voce: sua, perche: «galimberti»}\n  - {p: ritorna-su, a: r-20261007-0000-eredita-domande, n: 1, come: accoglie, voce: sua, perche: «sì»}\n  - {p: parla-di, a: solitudine, come: stato, voce: sua, perche: «stamattina»}\n  - {p: ritorna-su, a: 20261103-2340-k7q2, come: corregge, nodo: bisogna-immaginare-sisifo-felice, campo: attribuita-a, vecchio: ~Camus, valore: "@Albert Camus", voce: sua, perche: «era camus»}\n',
    'parole: [greci, padre]\ndelicato: true\nrisposta: salvato\n'),
  'frammenti/2026/11/20261110-1200-c3d4.md': '---\nregistrato: 2026-11-10T12:00:00+01:00\ncanale: telefono\n---\nok\n',
  'letture/2026/11/20261110-1200-c3d4.md': L('niente', '\n  - {p: nomina, a: umberto-galimberti, voce: sua, perche: «ok»}\n'),
  'frammenti/2026/11/20261111-2104-e5f6.md': '---\nregistrato: 2026-11-11T21:04:30+01:00\ncanale: chat\n---\n[21:04] canzoni sulla solitudine stasera\n[21:07] altre\n',
  'letture/2026/11/20261111-2104-e5f6.md': L('chiedi', '\n  - {p: nomina, a: umberto-galimberti, voce: sua, perche: «di nuovo lui»}\n'),
  'frammenti/2026/11/20261112-0800-g7h8.md': '---\nregistrato: 2026-11-12T08:00:00+01:00\ncanale: telefono\n---\nsenza lettura per ora, tre parole\n',
  'restituzioni/2026/11/r-20261103-2341-risposta.md': '---\nschema: 3\nforma: risposta\nletto-da: m\nregistrato: 2026-11-03T23:41:05+01:00\nper: 20261103-2340-k7q2\nvoci:\n  - {n: 1, rif: umberto-galimberti, voce: mondo, cosa: persona}\n---\n**Salvato.**\n1. Galimberti ○.\n',
  'restituzioni/2026/10/r-20261007-0000-eredita-domande.md': '---\nschema: 3\nforma: eredita\nletto-da: m\nregistrato: 2026-10-07\nvoci:\n  - {n: 1, rif: chi-sono, voce: proposta, cosa: domanda}\n  - {n: 2, rif: solitudine, voce: proposta, cosa: domanda}\nfonte: a.md:1@abcdef1\n---\n1. Chi sono?\n2. Perché soli?\n',
  'persone/umberto-galimberti.md': '---\nschema: 3\nnome: Umberto Galimberti\nalias: [galimberti]\ncerchia: mondo\nnato-da: [20261103-2340-k7q2]\n---\n',
  'temi/solitudine.md': '---\nschema: 3\nnome: solitudine\nnato-da: [20261004-0000-u01]\n---\n',
  'temi/chi-sono.md': '---\nschema: 3\nnome: Chi sono?\nnato-da: [20261105-0900-a1b2]\n---\n',
  'temi/stare-da-solo.md': '---\nschema: 3\nnome: stare da solo\nfuso-in: solitudine\nnato-da: [20261103-2340-k7q2]\n---\n',
  'citazioni/bisogna-immaginare-sisifo-felice.md': '---\nschema: 3\nnome: Bisogna immaginare Sisifo felice\nattribuita-a: [~Camus]\noriginale: Il faut imaginer Sisyphe heureux.\ntraduzione: edizione pubblicata\nriferimento: x\nesito: verificata\nnato-da: [20261004-0000-u01]\n---\n',
  'raccolte/tatuaggi.md': '---\nschema: 3\nnome: tatuaggi\nnato-da: [20261004-0000-u01]\n---\n',
  'riserva/pronte.md': '# Pronte\n- una convergenza in attesa\n',
};

function archivio(t) {
  const d = mkdtempSync(join(tmpdir(), 'contesto-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  for (const [p, x] of Object.entries(FILE)) { mkdirSync(join(d, p, '..'), { recursive: true }); writeFileSync(join(d, p), x); }
  return d;
}
function conOra(f) {
  const prima = process.env.ATLANTE_ORA;
  process.env.ATLANTE_ORA = ORA;
  try { return f(); } finally { if (prima === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = prima; }
}

test('parlante: non importato, non solo niente, almeno 3 parole senza link e senza le ore dei turni', () => {
  const f = (corpo, canale = 'telefono') => ({ dati: { canale }, corpo });
  assert.equal(parlante(f('ho visto galimberti a teatro')), true);
  assert.equal(parlante(f('https://youtu.be/x?si=1 bello')), false);
  assert.equal(parlante(f('[21:04] sì\n[21:05] ok', 'chat')), false); // le ore non sono parole
  assert.equal(parlante(f('solitudine e rabbia insieme', 'importato')), false);
  assert.equal(parlante(f('ho visto galimberti a teatro'), { dati: { intento: ['niente'] } }), false);
});

test('mappa.md: testata, Stato senza l\'importato, Nodi con ✦ ◌ ● e vicenda, Alias', (t) => {
  const d = archivio(t);
  const e = conOra(() => contesto(d));
  assert.equal(e.fino, '20261112-0800-g7h8');
  const m = readFileSync(join(d, 'contesto/mappa.md'), 'utf8');
  const [, testa, corpo] = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(m);
  assert.equal(testa, `aggiornato: ${ORA}\nfino-a: 20261112-0800-g7h8\ntoken-stimati: ${Math.round(corpo.length / 3.5)}`);
  const stato = sezione(m, 'Stato');
  assert.match(stato, /- inizio: 2026-11-03\n/);
  assert.match(stato, /- giorni attivi: 4\n/); // 3, 5, 11, 12 novembre: non il 10 ("ok"), non il 4 ottobre (importato)
  assert.match(stato, /- frammenti parlanti: 4; questa settimana \(da lunedì 2026-11-09\): 2\n/);
  assert.match(stato, /intervallo mediano: 2 giorni/);
  assert.match(stato, /- lettera: sì \(4 parlanti senza lettere ancora; proposte pronte: 1;/);
  assert.match(stato, /- sogno: spento \(4 parlanti/);
  assert.match(stato, /- ritratto: 4 parlanti nel mese 2026-11, 0 nel mese 2026-10, 4 negli ultimi tre mesi/);
  for (const r of stato.split('\n').filter((x) => /\d/.test(x))) assert.doesNotMatch(r, /\b(5|35)\b parlanti/);
  const nodi = sezione(m, 'Nodi');
  // galimberti: ✦ dal 3, 5, 10 (non parlante: conta come legame), 11; ○ dalla risposta; vicenda (3, 5, 11 in 30 giorni attivi)
  assert.match(nodi, /- umberto-galimberti · persone · Umberto Galimberti · ✦4 ◌0 ●0 ○1 · 2026-11-03–2026-11-11 · vicenda\n/);
  assert.match(nodi, /- chi-sono · temi · Chi sono\? · ✦0 ◌0 ●1 · 2026-10-07–2026-11-05\n/);
  assert.match(nodi, /- solitudine · temi · solitudine · ✦2 ◌1 ●0 · 2026-10-04–2026-11-05\n/);
  assert.match(nodi, /- stare-da-solo → solitudine · temi · stare da solo · lapide\n/);
  assert.match(nodi, /- bisogna-immaginare-sisifo-felice · citazioni · .* · esito verificata · originale «Il faut imaginer Sisyphe heureux\.» · traduzione edizione pubblicata/);
  assert.match(nodi, /- tatuaggi · raccolte · tatuaggi · .* · senza scopo/);
  const alias = sezione(m, 'Alias');
  assert.match(alias, /- galimberti → umberto-galimberti \(persone, mondo\)\n/);
  assert.match(alias, /- umberto galimberti → umberto-galimberti \(persone, mondo\)\n/);
  assert.doesNotMatch(alias, /stare da solo/); // le lapidi non sono nodi vivi
});

test('mappa.md §4, §5, §8: parole candidate, conti senza importati né id dei delicati, correzioni', (t) => {
  const d = archivio(t);
  conOra(() => contesto(d));
  const m = readFileSync(join(d, 'contesto/mappa.md'), 'utf8');
  assert.deepEqual([...m.matchAll(/^## (.+)$/gm)].map((x) => x[1]),
    ['1. Stato', '2. Nodi', '3. Alias', '4. Parole candidate', '5. Conti', '8. Correzioni']);
  const par = sezione(m, 'Parole candidate');
  assert.match(par, /- greci · 2026-11-03, 2026-11-05 · 2 giorni\n- padre · 2026-11-05 · 1 giorno\n/);
  assert.match(par, /(?<![\w-])greci(?![\w-]).*\d/); // la regex di banco/prove/B02.json
  const conti = sezione(m, 'Conti');
  assert.match(conti, /- frammenti parlanti \(domande escluse\): 3 \(di cui delicati: 1, contati e non nominati\)/);
  assert.match(conti, /- per mese: 2026-11 3\n- per mezzo: telefono 3\n- dalle 22 alle 3: 1 su 3\n/);
  assert.match(conti, /- per tema \(frammenti\): solitudine 1\n/); // dalla lapide stare-da-solo al nodo vivo
  assert.match(conti, /- per stato d'animo \(parla-di come: stato\): solitudine 1\n/);
  assert.match(conti, /- per raccolta \(serve-a\): tatuaggi 1\n/); // non l'importato u01
  assert.match(conti, /- domande \(intento chiedi\): 1; .*umberto-galimberti 1\n/);
  assert.doesNotMatch(conti, /10-0[45]|ottobre/);
  assert.doesNotMatch(m.replace(/^---\n[\s\S]*?\n---\n/, ''), /a1b2/); // il delicato non si nomina (B12, B25)
  const corr = sezione(m, 'Correzioni');
  assert.match(corr, /- bisogna-immaginare-sisifo-felice · attribuita-a → @Albert Camus \(corregge 20261103-2340-k7q2, in attesa\) · era ~Camus · da un frammento delicato\n/);
  assert.match(corr, /- umberto-galimberti · cerchia → mondo \(corregge 20261004-0000-u01, applicata\)/);
  assert.doesNotMatch(corr, /peterson|casa in ordine/i); // B22: nessuna correzione senza corregge
});

test('parole.md: ✦ parlanti e importati con la data-tetto, niente seme, turni muti, non parlanti; delicati marcati', (t) => {
  const d = archivio(t);
  conOra(() => contesto(d));
  const p = readFileSync(join(d, 'contesto/parole.md'), 'utf8');
  assert.match(p, /^---\naggiornato: 2026-11-12T21:00:00\+01:00\nfino-a: 20261112-0800-g7h8\ntoken-stimati: \d+\n---\n# Parole\n/);
  assert.doesNotMatch(p, /tagliato:/);
  assert.deepEqual([...p.matchAll(/^### (\S+)/gm)].map((x) => x[1]),
    ['20261004-0000-u01', '20261103-2340-k7q2', '20261105-0900-a1b2', '20261111-2104-e5f6', '20261112-0800-g7h8']);
  assert.match(p, /### 20261004-0000-u01 · ≤2026-10-04 · importato, entro il 4 ottobre, nell'archivio d'origine\nsolitudine, rabbia/);
  assert.match(p, /### 20261105-0900-a1b2 · 2026-11-05 09:00 · telefono · delicato\n/);
  assert.match(p, /\[21:04\] canzoni sulla solitudine stasera\n/);
  assert.doesNotMatch(p, /altre|nucleo dello sguardo|\nok\n/);
  // altrui e riportata (§6.1, banco D02), su un importato con vissuto ≤
  writeFileSync(join(d, 'frammenti/2026/10/20261004-0000-u19.md'), `---\nregistrato: 2026-10-05\ncanale: importato\nvoce: sua\nforma: riportata\n---\nil monologo di rust, parole sue\n`);
  writeFileSync(join(d, 'letture/2026/10/20261004-0000-u19.md'), L('salva', '[]', 'altrui: true\nvissuto: ≤2026-10-04\n'));
  conOra(() => contesto(d));
  assert.match(readFileSync(join(d, 'contesto/parole.md'), 'utf8'),
    /### 20261004-0000-u19 · ≤2026-10-04 · importato, entro il 4 ottobre, nell'archivio d'origine · trascritta da Claude nel seme · altrui: ✦ il gesto, ○ le parole\n/);
});

test('parole.md: oltre il tetto, finestra mobile compatta dichiarata con tagliato: e i periodi alla lettera', (t) => {
  const d = mkdtempSync(join(tmpdir(), 'contesto-tetto-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  const frase = 'una frase lunga abbastanza da pesare, ripetuta per riempire il contesto fino al tetto dichiarato. '.repeat(3);
  for (let i = 0; i < 1500; i++) {
    const g = new Date(Date.UTC(2023, 0, 1 + i)).toISOString().slice(0, 10), id = `${g.replaceAll('-', '')}-2100-a${String(i).padStart(3, '0')}`;
    const dir = join(d, 'frammenti', g.slice(0, 4), g.slice(5, 7)), dl = join(d, 'letture', g.slice(0, 4), g.slice(5, 7));
    mkdirSync(dir, { recursive: true }); mkdirSync(dl, { recursive: true });
    writeFileSync(join(dir, `${id}.md`), `---\nregistrato: ${g}T21:00:00+01:00\ncanale: telefono\n---\nnumero ${i}: ${frase}\n`);
    writeFileSync(join(dl, `${id}.md`), L('salva', '[]', i === 7 ? 'reazione:\n  - {parole: "numero", verso: "+"}\n' : ''));
  }
  conOra(() => contesto(d));
  const leggi = (f) => readFileSync(join(d, 'contesto', f), 'utf8');
  const p = leggi('parole.md');
  const tok = readdirSync(join(d, 'contesto')).reduce((s, f) => s + leggi(f).length / 3.5, 0);
  assert.ok(tok <= 72000, `contesto/ pesa ${tok} token`);
  const [, data] = /\ntagliato: le parole prima del (\d{4}-\d{2}-\d{2}) non sono qui\n---\n/.exec(p) ?? [];
  assert.ok(data, 'manca tagliato: nella testata');
  const fin = sezione(p, 'Finestra');
  assert.ok(fin.trim().startsWith(`- ${data} · numero `), 'la finestra comincia dal giorno del taglio');
  assert.doesNotMatch(fin, /\d{8}-\d{4}-/); // formato compatto: niente id
  const per = sezione(p, 'Periodi');
  assert.match(per, /^- 2023-01: 31 frammenti$/m);
  assert.match(per, /^ {2}- 2023-01-08 · numero 7: una frase/m); // la frase con una reazione viene prima
  assert.ok(fin.indexOf('numero 1498:') < fin.indexOf('numero 1499:'), 'in ordine di tempo');
});

test('recenti.md: il telefono con le risposte, la chat a parte, le restituzioni intere senza le eredita', (t) => {
  const d = archivio(t);
  conOra(() => contesto(d));
  const r = readFileSync(join(d, 'contesto/recenti.md'), 'utf8');
  assert.match(r, /^---\naggiornato: 2026-11-12T21:00:00\+01:00\nfino-a: 20261112-0800-g7h8\ntoken-stimati: \d+\n---\n# Recenti\n/);
  const tel = sezione(r, 'Telefono');
  assert.deepEqual([...tel.matchAll(/^### (\S+)/gm)].map((x) => x[1]),
    ['20261103-2340-k7q2', '20261105-0900-a1b2', '20261110-1200-c3d4', '20261112-0800-g7h8']);
  assert.match(tel, /molto interessante\n→ risposta r-20261103-2341-risposta:\n\*\*Salvato\.\*\*\n1\. Galimberti ○\./);
  assert.match(tel, /il nichilismo\n→ Salvato\./);
  assert.match(tel, /tre parole\n→ ancora senza lettura/);
  assert.doesNotMatch(tel, /canzoni/);
  assert.match(sezione(r, 'Chat'), /### 20261111-2104-e5f6 · 2026-11-11T21:04:30\+01:00\n\[21:04\] canzoni/);
  const rest = sezione(r, 'Restituzioni');
  assert.match(rest, /### r-20261103-2341-risposta · risposta per 20261103-2340-k7q2 · 2026-11-03T23:41:05\+01:00\n- 1\. umberto-galimberti \(○ persona\)\n\*\*Salvato\.\*\*/);
  assert.doesNotMatch(rest, /eredita-domande/);
});

test('contesto.mjs da riga di comando, anche su un archivio vuoto', (t) => {
  const d = mkdtempSync(join(tmpdir(), 'contesto-vuoto-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  const r = spawnSync('node', [SCRIPT, '--radice', d], { encoding: 'utf8', env: { ...process.env, ATLANTE_ORA: ORA } });
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /contesto: fino a nessuno; 0 frammenti, 0 nodi \(recenti\.md, parole\.md, mappa\.md §1–5 e §8\)/);
  const m = readFileSync(join(d, 'contesto/mappa.md'), 'utf8');
  assert.match(m, /fino-a: nessuno\n/);
  assert.match(m, /## 1\. Stato\n\n- inizio: nessun frammento parlante ancora\n- giorni attivi: 0\n/);
  assert.match(readFileSync(join(d, 'contesto/recenti.md'), 'utf8'), /## Telefono \(ultimi 30\)\n\nnessuno ancora\n/);
  assert.match(m, /## 4\. Parole candidate\n\n- nessuna ancora\n/);
  assert.doesNotMatch(sezione(m, 'Conti'), /[1-9]/); // senza parlanti, § Conti non ha numeri (B12, B25: il criterio cade)
  assert.match(m, /## 8\. Correzioni\n\n- nessuna\n/);
  assert.match(readFileSync(join(d, 'contesto/parole.md'), 'utf8'), /# Parole\n\nnessuna ancora\n/);
  assert.equal(spawnSync('node', [SCRIPT, '--boh'], { encoding: 'utf8' }).status, 1);
});
