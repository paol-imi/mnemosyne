// applica.mjs (blocco 4, base del blocco 5): un piano ritratto, un piano smista, i rifiuti, la transazione, la chat sigillata.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applica, prepara, hashPrompt, numeriDelTesto, controllaNumeri, pulisciLink } from '../scripts/applica.mjs';
import { frontmatter, verifica, aggiornaHash } from '../scripts/verifica.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const SCRIPT = join(RADICE, 'scripts/applica.mjs');
const FID = '20261103-2340-k7q2';
const F2 = '20261104-0812-b3n8';
const ORA = '2026-11-04T08:20:30Z'; // 09:20:30 a Roma
const RIT = 'restituzioni/2026/11/r-20261104-0920-ritratto.md';

// L'archivio minimo (il caso Galimberti) in una cartella nuova, con CLAUDE.md e i prompt (per `prompt`).
function archivio(t) {
  const dir = mkdtempSync(join(tmpdir(), 'applica-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(join(RADICE, 'test/fixture/verifica/archivio'), dir, { recursive: true });
  cpSync(join(RADICE, 'CLAUDE.md'), join(dir, 'CLAUDE.md'));
  cpSync(join(RADICE, 'prompt'), join(dir, 'prompt'), { recursive: true });
  process.env.ATLANTE_ORA = ORA;
  return dir;
}
// Un frammento come lo lascia `smista.mjs prepara` (con la sua riga in frammenti/.hash).
function frammento(dir, id, corpo, canale = 'telefono') {
  const d = join(dir, `frammenti/${id.slice(0, 4)}/${id.slice(4, 6)}`);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, `${id}.md`), `---\nregistrato: ${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}T${id.slice(9, 11)}:${id.slice(11, 13)}:00+01:00\ncanale: ${canale}\n---\n${corpo}\n`);
  aggiornaHash(dir);
}
const leggi = (dir, f) => frontmatter(readFileSync(join(dir, f), 'utf8'));
const elenco = (dir, c) => (existsSync(join(dir, c)) ? readdirSync(join(dir, c)).sort() : []);
const piano = (ciclo, operazioni) => ({ ciclo, 'letto-da': 'lettore-di-prova', operazioni });

// ── Il piano ritratto (blocco 4) ─────────────────────────────────────────────────────────────────────────────────────
const TESTO_R = [
  'Tre settimane fa scrivevi *«ancora galimberti, il nichilismo»* ✦ (4 novembre).',
  '',
  '1. *«uno spezzone di galimberti a teatro»* ✦, il 3 novembre.',
  '2. Le due frasi convergono ◌: il nichilismo ti arriva sempre da una voce altrui [1].',
  '',
  'Da chi l\'hai sentito per la prima volta?',
].join('\n');
const VOCI_R = [
  { rif: FID, voce: 'sua', cosa: 'frase' },
  { rif: 'nichilismo', voce: 'proposta', cosa: 'convergenza', perche: 'due frasi sulla stessa parola' },
];
const RITRATTO = () => piano('ritratto', [{ op: 'restituzione', forma: 'ritratto', aggancio: { a: F2 }, testo: TESTO_R, voci: VOCI_R,
  legami: [{ p: 'converge-con', tra: [FID, F2], voce: 'proposta', perche: 'il nichilismo detto da altri, due volte', da: 2 }] }]);

test('ritratto: id dall\'ora di Roma, voci numerate nell\'ordine del corpo, converge-con proposta, verifica passa', (t) => {
  const dir = archivio(t);
  frammento(dir, F2, 'ancora galimberti, il nichilismo');
  const e = applica(RITRATTO(), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.scritti, [RIT]);
  const { dati, corpo } = leggi(dir, RIT);
  assert.deepEqual(dati, { schema: 4, forma: 'ritratto', 'letto-da': 'lettore-di-prova', registrato: '2026-11-04T09:20:30+01:00',
    aggancio: { a: F2 }, voci: VOCI_R.map((v, i) => ({ n: i + 1, ...v })),
    legami: [{ p: 'converge-con', tra: [FID, F2], voce: 'proposta', perche: 'il nichilismo detto da altri, due volte', da: 2 }] });
  assert.equal('prompt' in dati, false); // solo le letture portano `prompt` (§2.2)
  assert.equal(corpo, TESTO_R + '\n');
  assert.deepEqual(verifica(dir), []);
  // Un secondo ritratto nello stesso minuto: -2 (§3.1).
  assert.deepEqual(applica(RITRATTO(), dir).scritti, ['restituzioni/2026/11/r-20261104-0920-ritratto-2.md']);
});

test('i numeri del corpo: "1." a inizio riga o "[1]"; non 2[127], non [1](url)', () => {
  assert.deepEqual(numeriDelTesto('1. a\n  2. b [1] e [3]\nFrammenti postumi 2[127], [4](https://x) e 5. no'), [1, 2, 1, 3]);
  assert.deepEqual(controllaNumeri('[1] a\n2. b\ndi nuovo [1]', 2), []);
  assert.match(controllaNumeri('2. a\n1. b\n3. c', 2).join('\n'), /il 2 viene prima del 1[\s\S]*il numero 3 ma le voci sono 2/);
});

// ── Il piano smista (base del blocco 5) ──────────────────────────────────────────────────────────────────────────────
const LINK = 'https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2';
test('smista: crea-nodo (@Nome → slug), alias, lettura v1 con prompt e link dal pacchetto, risposta numerata', (t) => {
  const dir = archivio(t);
  frammento(dir, F2, `ancora galimberti, mi ha mandato questo Marco ${LINK} sul nichilismo. bellissimo`);
  mkdirSync(join(dir, 'ingresso/.pacchetti'), { recursive: true });
  writeFileSync(join(dir, `ingresso/.pacchetti/${F2}.json`), JSON.stringify({ frammento: F2,
    link: [{ url: LINK, titolo: 'Galimberti: il nichilismo e i giovani', autore: 'Rai Cultura' }] }));
  const e = applica(piano('smista', [
    { op: 'crea-nodo', genere: 'persone', nome: 'Marco', cerchia: 'vita' },
    { op: 'alias', nodo: 'umberto-galimberti', alias: ['Galimberti', 'umberto'] },
    { op: 'lettura', frammento: F2, intento: ['salva'], reazione: [{ parole: 'bellissimo', verso: '+' }],
      legami: [
        { p: 'nomina', a: 'umberto-galimberti', voce: 'sua', perche: '«ancora galimberti»' },
        { p: 'nomina', a: '@Marco', voce: 'sua', perche: '«mi ha mandato questo Marco»' },
        { p: 'parla-di', a: 'nichilismo', voce: 'sua', perche: 'parola tua' }],
      parole: ['nichilismo'] },
    { op: 'restituzione', forma: 'risposta', per: F2, testo: '**Salvato.**\n1. Ne hai già uno su Galimberti, il 3 novembre ◌.',
      voci: [{ rif: FID, voce: 'proposta', cosa: 'ponte' }] },
  ]), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.avvisi, []);
  const RISP = 'restituzioni/2026/11/r-20261104-0920-risposta.md', LETT = `letture/2026/11/${F2}.md`;
  assert.deepEqual(e.scritti.sort(), [LETT, 'persone/marco.md', 'persone/umberto-galimberti.md', RISP]);
  assert.deepEqual(leggi(dir, 'persone/marco.md').dati, { schema: 4, nome: 'Marco', cerchia: 'vita', 'nato-da': [F2] });
  assert.deepEqual(leggi(dir, 'persone/umberto-galimberti.md').dati.alias, ['galimberti', 'umberto']); // per chiave, niente doppioni
  const l = leggi(dir, LETT).dati;
  assert.equal(l.versione, 1);
  assert.equal(l.prompt, hashPrompt(dir, 'smista'));
  assert.deepEqual(l.legami.map((x) => x.a), ['umberto-galimberti', 'marco', 'nichilismo']);
  assert.deepEqual(l.link, [{ url: 'https://youtu.be/dQ9xLmP0aBc?t=754', titolo: 'Galimberti: il nichilismo e i giovani', autore: 'Rai Cultura' }]);
  assert.equal(l.risposta, 'r-20261104-0920-risposta');
  assert.deepEqual(leggi(dir, RISP).dati.voci, [{ n: 1, rif: FID, voce: 'proposta', cosa: 'ponte' }]);
  assert.match(readFileSync(join(dir, `frammenti/2026/11/${F2}.md`), 'utf8'), /si=Hk2/); // il frammento non si tocca
  assert.deepEqual(verifica(dir), []);
});

test('link: si= via, t= tenuto, pin normalizzato; senza pacchetto nessun titolo, un avviso, il piano passa', (t) => {
  assert.equal(pulisciLink('https://open.spotify.com/track/4uLU?si=a1b2c3'), 'https://open.spotify.com/track/4uLU');
  assert.equal(pulisciLink('http://www.youtube.com/watch?si=x&v=abc&t=12s'), 'https://www.youtube.com/watch?v=abc&t=12s');
  assert.equal(pulisciLink('https://it.pinterest.com/pin/123/?mt=login'), 'https://www.pinterest.com/pin/123/');
  const dir = archivio(t);
  frammento(dir, F2, LINK);
  const e = applica(piano('smista', [{ op: 'lettura', frammento: F2, intento: ['salva'], legami: [], risposta: 'salvato' }]), dir);
  assert.deepEqual(e.errori, []);
  assert.match(e.avvisi.join('\n'), /senza titolo \(manca ingresso\/\.pacchetti\/20261104-0812-b3n8\.json\)/);
  assert.deepEqual(leggi(dir, `letture/2026/11/${F2}.md`).dati.link, [{ url: 'https://youtu.be/dQ9xLmP0aBc?t=754' }]);
});

// ── I rifiuti ────────────────────────────────────────────────────────────────────────────────────────────────────────
test('rifiuto: titolo inventato, slug inesistente, numeri che non coincidono; elenco dei motivi e nessun file', (t) => {
  const dir = archivio(t);
  frammento(dir, F2, `guarda ${LINK}`);
  const prima = [elenco(dir, 'letture/2026/11'), elenco(dir, 'restituzioni/2026/11'), elenco(dir, 'persone')];
  // Il titolo dato dal piano.
  const tit = applica(piano('smista', [{ op: 'lettura', frammento: F2, intento: ['salva'], legami: [], risposta: 'salvato',
    link: [{ url: LINK, titolo: 'Il titolo che mi ricordo' }] }]), dir);
  assert.match(tit.errori.join('\n'), /"titolo" nel piano: il titolo di un link viene solo dall'oEmbed del pacchetto/);
  // Uno slug che non esiste, un @Nome senza crea-nodo, i numeri del corpo diversi dalle voci.
  const e = applica(piano('smista', [
    { op: 'lettura', frammento: F2, intento: ['salva'], legami: [{ p: 'nomina', a: 'marco-aurelio', voce: 'sua', perche: '«marco»' }] },
    { op: 'restituzione', forma: 'risposta', per: F2, testo: '**Salvato.**\n1. uno\n3. tre', voci: [
      { rif: 'umberto-galimberti', voce: 'mondo', cosa: 'persona' },
      { rif: '@Il mondo delle emozioni', voce: 'mondo', cosa: 'opera' },
      { rif: 'galimberti', voce: 'mondo', cosa: 'persona' }] },
  ]), dir);
  const tutto = e.errori.join('\n');
  assert.match(tutto, /riferimento inesistente marco-aurelio/);
  assert.match(tutto, /riferimento inesistente galimberti/);
  assert.match(tutto, /@Il mondo delle emozioni: nessun crea-nodo/);
  assert.match(tutto, /manca la voce 2/);
  assert.match(tutto, /il 3 viene prima del 2/);
  for (const r of [tit, e]) assert.deepEqual(r.scritti, []);
  assert.deepEqual([elenco(dir, 'letture/2026/11'), elenco(dir, 'restituzioni/2026/11'), elenco(dir, 'persone')], prima);
});

test('rifiuto dallo schema e dalle regole: n nelle voci, ritratto con lettura, risposta doppia, consolida non ancora', (t) => {
  const dir = archivio(t);
  const m = (p) => prepara(p, dir).errori.join('\n');
  assert.match(m(piano('ritratto', [{ op: 'restituzione', forma: 'ritratto', testo: '1. x', voci: [{ n: 1, rif: FID, voce: 'sua', cosa: 'frase' }] }])), /additional properties \(n\)/);
  assert.match(m(piano('ritratto', [{ op: 'lettura', frammento: FID, intento: ['salva'], legami: [] }])), /piano\/operazioni\/0/);
  assert.match(m(piano('smista', [{ op: 'restituzione', forma: 'risposta', per: FID, testo: 'Ci sono.', voci: [] }])), /c'è già la risposta r-20261103-2341-risposta/);
  assert.match(m(piano('consolida', [{ op: 'riserva', file: 'ritorno', testo: '' }])), /riserva: non ancora fatta/);
});

// ── La transazione ───────────────────────────────────────────────────────────────────────────────────────────────────
test('transazionale: se verifica.mjs non passa nella cartella di lavoro, niente arriva al suo posto', (t) => {
  const dir = archivio(t);
  frammento(dir, F2, 'ancora galimberti, il nichilismo');
  const nodo = join(dir, 'persone/umberto-galimberti.md'), prima = readFileSync(nodo);
  const f = join(dir, `frammenti/2026/11/${FID}.md`);
  writeFileSync(f, readFileSync(f, 'utf8').replace('teatro, credo', 'teatro credo'));
  const e = applica(piano('smista', [{ op: 'alias', nodo: 'umberto-galimberti', alias: ['umberto'] }]), dir);
  assert.ok(e.errori.some((x) => x.includes('hash diverso')), e.errori.join('\n'));
  assert.match(e.errori.at(-1), /verifica\.mjs non passa: nessun file scritto/);
  assert.deepEqual(readFileSync(nodo), prima);
  const r = applica(RITRATTO(), dir);
  assert.deepEqual(r.scritti, []);
  assert.equal(existsSync(join(dir, RIT)), false);
});

test('transazionale in un repository: la verifica nella cartella di lavoro vede HEAD (una restituzione cambiata)', (t) => {
  const dir = archivio(t);
  const git = (...a) => execFileSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...a], { cwd: dir, stdio: 'pipe' });
  git('init', '-q', '-b', 'prova'); git('add', '-A'); git('commit', '-qm', 'zero');
  const r = join(dir, 'restituzioni/2026/11/r-20261103-2341-risposta.md');
  writeFileSync(r, readFileSync(r, 'utf8').replace('Salvato', 'Salvata'));
  const e = applica(piano('ritratto', [{ op: 'restituzione', forma: 'ritratto', testo: 'Una domanda?', voci: [] }]), dir);
  assert.match(e.errori.join('\n'), /restituzione cambiata rispetto a HEAD/);
  assert.equal(existsSync(join(dir, 'restituzioni/2026/11/r-20261104-0920-ritratto.md')), false);
  git('checkout', '--', '.');
  assert.deepEqual(applica(piano('ritratto', [{ op: 'restituzione', forma: 'ritratto', testo: 'Una domanda?', voci: [] }]), dir).errori, []);
});

// ── Specchio sigilla la chat (blocco 5) ──────────────────────────────────────────────────────────────────────────────
test('specchio: la risposta della chat sigillata toglie la bozza ingresso/ID.risposte.md', (t) => {
  const dir = archivio(t);
  const CHAT = '20261104-2104-ch01';
  frammento(dir, CHAT, '[21:04] canzoni sulla solitudine\n[21:09] salvami la terza', 'chat');
  mkdirSync(join(dir, 'ingresso'), { recursive: true });
  writeFileSync(join(dir, `ingresso/${CHAT}.risposte.md`), '### 21:04 · canzoni sulla solitudine\n1. …\n');
  const e = applica(piano('specchio', [
    { op: 'lettura', frammento: CHAT, intento: ['chiedi'], legami: [] },
    { op: 'restituzione', forma: 'risposta', per: CHAT, testo: '### 21:04 · canzoni sulla solitudine\n1. *Eleanor Rigby* ○.',
      voci: [{ rif: '~Eleanor Rigby', voce: 'mondo', cosa: 'canzone', turno: '21:04' }] },
  ]), dir);
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.tolti, [`ingresso/${CHAT}.risposte.md`]);
  assert.equal(existsSync(join(dir, `ingresso/${CHAT}.risposte.md`)), false);
  assert.equal(leggi(dir, `letture/2026/11/${CHAT}.md`).dati.prompt, hashPrompt(dir, 'specchio'));
});

test('prompt: come cat CLAUDE.md prompt/<ciclo>.md prompt/formato-piano.md | git hash-object --stdin', (t) => {
  const dir = archivio(t);
  const atteso = execFileSync('git', ['hash-object', '--stdin'], { input: Buffer.concat(['CLAUDE.md', 'prompt/smista.md', 'prompt/formato-piano.md']
    .map((f) => readFileSync(join(dir, f)))) }).toString().slice(0, 7);
  assert.equal(hashPrompt(dir, 'smista'), atteso);
  writeFileSync(join(dir, 'prompt/formato-piano.md'), 'altro\n');
  assert.notEqual(hashPrompt(dir, 'smista'), atteso);
});

test('la riga di comando: 0 con "scritto" e "verifica: ok", 1 con "RIFIUTO"', (t) => {
  const dir = archivio(t);
  frammento(dir, F2, 'ancora galimberti, il nichilismo');
  const f = join(dir, 'piano.json');
  const lancia = (p) => { writeFileSync(f, JSON.stringify(p)); return spawnSync('node', [SCRIPT, f, '--radice', dir], { encoding: 'utf8', env: process.env }); };
  const ok = lancia(RITRATTO());
  assert.equal(ok.status, 0, ok.stdout);
  assert.match(ok.stdout, new RegExp(`scritto ${RIT}\nverifica: ok`));
  const no = lancia(piano('ritratto', [{ op: 'restituzione', forma: 'ritratto', testo: '1. a', voci: [] }]));
  assert.equal(no.status, 1);
  assert.match(no.stdout, /^RIFIUTO restituzione ritratto: nel testo c'è il numero 1 ma le voci sono 0$/m);
});
