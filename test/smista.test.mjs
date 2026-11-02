// Blocco 5: smista.mjs prepara e vicini (modello §3.2, §6.2, §7.2, §7.5, §8.2). Un archivio finto in una cartella
// temporanea; la rete non si tocca (chiedi finto, MEMO_SENZA_RETE per la riga di comando). In fondo, la prova sul punto
// zero vero, in un clone usa-e-getta.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, readdirSync, cpSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { prepara, vicini, ultimoTurno, soglia04, descriviLink } from '../scripts/smista.mjs';
import { verifica } from '../scripts/verifica.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const SCRIPT = join(RADICE, 'scripts/smista.mjs');
const ORA = '2026-11-03T23:50:00+01:00';
const fm = (righe, corpo = '') => `---\n${righe.join('\n')}\n---\n${corpo}`;
const L = (legami, extra = []) => fm(['schema: 3', 'versione: 1', 'letto-da: m', 'prompt: "abc1234"', 'intento: [salva]', 'legami:', ...legami, ...extra]);
const MEMO = 'ho visto uno spezzone di galimberti a teatro, chioran e Camus sulla solitudine. i ragazzi nn stanno bene https://open.spotify.com/track/abc?si=x e https://example.com/a';
const FILE = {
  'frammenti/2026/10/20261004-0000-u01.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: sua'], 'la solitudine delle battaglie'),
  'letture/2026/10/20261004-0000-u01.md': L(['  - {p: parla-di, a: solitudine, voce: sua, perche: «solitudine»}'], ['parole: [battaglia]']),
  'frammenti/2026/10/20261004-0000-u19.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: sua'], 'Rust e il tempo piatto'),
  'letture/2026/10/20261004-0000-u19.md': L(['  - {p: nomina, a: rust-cohle, voce: sua, perche: «Rust»}'], ['altrui: true']),
  'frammenti/2026/10/20261004-0000-u07.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: sua'], 'una cosa delicata su Camus'),
  'letture/2026/10/20261004-0000-u07.md': L(['  - {p: nomina, a: camus, voce: sua, perche: «Camus»}'], ['delicato: true']),
  'frammenti/2026/10/20261004-0000-s01.md': fm(['registrato: 2026-10-04', 'canale: importato', 'voce: seme'], 'il ragazzo e la cultura'),
  'letture/2026/10/20261004-0000-s01.md': L(['  - {p: nomina, a: camus, voce: seme, perche: «Camus»}'], ['parole: [ragazzo]']),
  'frammenti/2026/11/20261101-2200-zz01.md': fm(['registrato: 2026-11-01T22:00:00+01:00', 'canale: telefono'], 'camus di nuovo stasera'),
  'letture/2026/11/20261101-2200-zz01.md': L(['  - {p: nomina, a: camus, voce: sua, perche: «camus»}']),
  'temi/solitudine.md': fm(['schema: 3', 'nome: solitudine', 'nato-da: [20261004-0000-u01]']),
  'persone/camus.md': fm(['schema: 3', 'nome: Albert Camus', 'alias: [Camus]', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/cioran.md': fm(['schema: 3', 'nome: Emil Cioran', 'alias: [cioran]', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/umberto-galimberti.md': fm(['schema: 3', 'nome: Umberto Galimberti', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/marco-aurelio.md': fm(['schema: 3', 'nome: Marco Aurelio', 'cerchia: mondo', 'nato-da: [20261004-0000-u01]']),
  'persone/rust-cohle.md': fm(['schema: 3', 'nome: Rust Cohle', 'alias: [Rust]', 'cerchia: finzione', 'nato-da: [20261004-0000-u19]']),
  'contesto/recenti.md': '---\naggiornato: 2026-11-03T09:00:00+01:00\nfino-a: 20261101-2200-zz01\ntoken-stimati: 10\n---\n# Recenti\n',
  'contesto/mappa.md': '---\naggiornato: x\n---\n# Mappa\n\n## 3. Alias\n\n- camus → camus (persone, mondo)\n\n## 9. Scarti\n\n- mazzy star · solitudine · legame · 2026-11-01 · «non c\'entra»\n',
  'ingresso/.gitkeep': '',
  'ingresso/20261103-2343-b2c3.md': fm(['registrato: 2026-11-03T23:43:00+01:00', 'canale: telefono'], 'ah e anche marco, quello della palestra'),
  'ingresso/20261103-2340-k7q2.md': fm(['registrato: 2026-11-03T23:40:12+01:00', 'canale: telefono', 'allegati: [20261103-2340-k7q2.jpg]'], MEMO),
  'ingresso/20261103-2340-k7q2.jpg': 'finta foto',
  'ingresso/20261103-2100-c4at.md': fm(['registrato: 2026-11-03T21:00:00+01:00', 'canale: chat'], '[21:00] canzoni sulla solitudine\n[23:48] altre\n'),
  'ingresso/20261103-2100-c4at.risposte.md': '### 21:00 · canzoni sulla solitudine\n1. Mazzy Star\n',
  'ingresso/20261103-2200-pr0g.md': fm(['registrato: 2026-11-03T22:00:00+01:00', 'canale: telefono'], 'memo: chat\nturni:\n  - {ora: "21:04", testo: "canzoni"}\n'),
};

function archivio(t, extra = {}, senza = []) {
  const d = mkdtempSync(join(tmpdir(), 'smista-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  for (const [p, x] of Object.entries({ ...FILE, ...extra })) {
    if (senza.includes(p)) continue;
    mkdirSync(join(d, p, '..'), { recursive: true }); writeFileSync(join(d, p), x);
  }
  return d;
}
function conOra(f, ora = ORA) {
  const prima = process.env.ATLANTE_ORA;
  process.env.ATLANTE_ORA = ora;
  try { return f(); } finally { if (prima === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = prima; }
}
const pacchetto = (r, id) => JSON.parse(readFileSync(join(r, `ingresso/.pacchetti/${id}.json`), 'utf8'));
const RETE = {
  'https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Ftrack%2Fabc': '{"title":"Into Dust"}',
  'https://open.spotify.com/track/abc': '<meta name="music:musician_description" content="Mazzy Star"/>',
};
const chiedi = (u) => RETE[u] ?? null;
const haCwebp = spawnSync('cwebp', ['-version']).status === 0;

test('prepara: sposta in ordine di tempo senza riscrivere, con gli allegati e gli hash; chat aperta e memo del Progetto restano', (t) => {
  const r = archivio(t), prima = readFileSync(join(r, 'ingresso/20261103-2340-k7q2.md'));
  const e = conOra(() => prepara(r, { chiedi }));
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.spostati, ['20261103-2340-k7q2', '20261103-2343-b2c3']);
  assert.deepEqual(e.sigillate, []);
  assert.deepEqual(readFileSync(join(r, 'frammenti/2026/11/20261103-2340-k7q2.md')), prima);
  assert.ok(existsSync(join(r, 'frammenti/2026/11/20261103-2340-k7q2.jpg')));
  assert.deepEqual(readdirSync(join(r, 'ingresso')).sort(),
    ['.gitkeep', '.pacchetti', '20261103-2100-c4at.md', '20261103-2100-c4at.risposte.md', '20261103-2200-pr0g.md']);
  assert.match(e.avvisi.join('\n'), /pr0g\.md: memo del Progetto .*blocco 8/);
  if (!haCwebp) assert.match(e.avvisi.join('\n'), /cwebp non c'è/);
  assert.match(readFileSync(join(r, 'frammenti/.hash'), 'utf8'), /^[0-9a-f]{64} {2}frammenti\/2026\/11\/20261103-2340-k7q2\.jpg$/m);
  assert.deepEqual(verifica(r, ['hash']), []);
  assert.deepEqual(e.pacchetti, ['20261103-2340-k7q2', '20261103-2343-b2c3']); // zz01 ha già una lettura (§8.2)
});

test('il pacchetto: frammento, recenti, alias, candidati per nome, vicini, scarti, link con titolo e autore', (t) => {
  const r = archivio(t);
  conOra(() => prepara(r, { chiedi }));
  const p = pacchetto(r, '20261103-2340-k7q2');
  assert.equal(p.frammento.testo, MEMO);
  assert.equal(p.frammento.registrato, '2026-11-03T23:40:12+01:00');
  assert.deepEqual(p.frammento.allegati.map((x) => x.percorso), ['frammenti/2026/11/20261103-2340-k7q2.jpg']);
  assert.equal(p.recenti['fino-a'], '20261101-2200-zz01');
  assert.ok(p.alias.includes('- camus → camus (persone, mondo)') && p.alias.includes('- umberto galimberti → umberto-galimberti (persone, mondo)'));
  const per = Object.fromEntries(p.candidati.map((n) => [n.nome.toLowerCase(), n.candidati.map((c) => `${c.slug}:${c.via}`)]));
  assert.deepEqual(per.galimberti, ['umberto-galimberti:cognome']);
  assert.deepEqual(per.chioran, ['cioran:levenshtein']);
  assert.deepEqual(per.camus, ['camus:esatta']);
  assert.deepEqual(per.solitudine, ['solitudine:esatta']);
  assert.deepEqual(p.scarti, ["mazzy star · solitudine · legame · 2026-11-01 · «non c'entra»"]);
  assert.deepEqual(p.link, [
    { url: 'https://open.spotify.com/track/abc', titolo: 'Into Dust', autore: 'Mazzy Star' },
    { url: 'https://example.com/a' },
  ]);
  // primo giorno (zz01 del 1° novembre): gli importati voce sua non delicati, tutti; zz01 ha meno di 7 giorni
  const v = Object.fromEntries(p.vicini.map((x) => [x.id, x]));
  assert.deepEqual(Object.keys(v).sort(), ['20261004-0000-u01', '20261004-0000-u19']); // mai il seme ✧ (s01), né per nodo né per parola
  assert.deepEqual(v['20261004-0000-u01'].comune, ['solitudine']);
  assert.equal(v['20261004-0000-u19'].altrui, true);
  assert.equal(v['20261004-0000-u19'].testo, 'Rust e il tempo piatto');
  assert.equal(v['20261004-0000-u19']['data-tetto'], '2026-10-04');
  // "marco" trova Marco Aurelio solo per via nome: candidato sì, vicino no
  const p2 = pacchetto(r, '20261103-2343-b2c3');
  assert.deepEqual(p2.candidati.find((n) => n.nome === 'marco').candidati.map((c) => c.via), ['nome']);
});

test('link: se l\'oEmbed fallisce, niente titolo', () => {
  assert.deepEqual(descriviLink('https://youtu.be/x', () => null), { url: 'https://youtu.be/x' });
  assert.deepEqual(descriviLink('https://youtu.be/x', (u) => (u.includes('oembed') ? '{"title":"T","author_name":"Canale"}' : null)),
    { url: 'https://youtu.be/x', titolo: 'T', autore: 'Canale' });
});

test('--solo: un pacchetto solo; --sigilla: la chat va in frammenti/ e la bozza nel pacchetto (resta per applica)', (t) => {
  const r = archivio(t);
  const e = conOra(() => prepara(r, { solo: '20261103-2343-b2c3', chiedi }));
  assert.deepEqual(e.pacchetti, ['20261103-2343-b2c3']);
  const bozza = readFileSync(join(r, 'ingresso/20261103-2100-c4at.risposte.md'), 'utf8');
  const s = conOra(() => prepara(r, { sigilla: '20261103-2100-c4at', solo: '20261103-2100-c4at', chiedi }));
  assert.deepEqual(s.errori, []);
  assert.deepEqual(s.sigillate, ['20261103-2100-c4at']);
  assert.ok(existsSync(join(r, 'frammenti/2026/11/20261103-2100-c4at.md')) && !existsSync(join(r, 'ingresso/20261103-2100-c4at.md')));
  assert.ok(existsSync(join(r, 'ingresso/20261103-2100-c4at.risposte.md')));
  assert.deepEqual(verifica(r, ['hash']), []);
  const p = pacchetto(r, '20261103-2100-c4at');
  assert.deepEqual(p.bozza, { file: 'ingresso/20261103-2100-c4at.risposte.md', testo: bozza });
  assert.equal(p.frammento.canale, 'chat');
  const ancora = conOra(() => prepara(r, { sigilla: '20261103-2100-c4at', chiedi }));
  assert.match(ancora.avvisi.join('\n'), /già sigillata/);
  assert.match(conOra(() => prepara(r, { sigilla: '20261103-2101-nope', chiedi })).errori.join('\n'), /nessuna chat/);
});

test('sigillo d\'ufficio: la chat ferma da prima delle 04:00 di oggi, non prima', (t) => {
  assert.equal(ultimoTurno({ registrato: '2026-11-03T23:50:00+01:00' }, '[23:50] a\n[00:20] b\n'), Date.parse('2026-11-04T00:20:00+01:00'));
  assert.equal(conOra(() => soglia04(), '2026-11-04T03:30:00+01:00'), Date.parse('2026-11-03T04:00:00+01:00'));
  assert.equal(conOra(() => soglia04(), '2026-11-04T04:10:00+01:00'), Date.parse('2026-11-04T04:00:00+01:00'));
  const r = archivio(t, { 'ingresso/20261104-0130-n0tt.md': fm(['registrato: 2026-11-04T01:30:00+01:00', 'canale: chat'], '[01:30] non dormo\n[04:05] ancora\n') });
  const notte = conOra(() => prepara(r, { chiedi }), '2026-11-04T03:59:00+01:00');
  assert.deepEqual(notte.sigillate, []);
  const mattina = conOra(() => prepara(r, { chiedi }), '2026-11-04T04:10:00+01:00');
  assert.deepEqual(mattina.sigillate, ['20261103-2100-c4at']); // l'altra ha un turno alle 04:05: è aperta
  assert.ok(existsSync(join(r, 'ingresso/20261104-0130-n0tt.md')));
  assert.ok(pacchetto(r, '20261103-2100-c4at').bozza);
});

// Vicini: 12 memo che nominano Camus, tutti più vecchi di 7 giorni, uno delicato; il memo del 20 novembre non è dei
// primi 3 giorni (il primo non importato è del 1° novembre).
function conDodici(t) {
  const extra = {};
  for (let i = 1; i <= 12; i++) {
    const g = String(i).padStart(2, '0'), id = `202611${g}-1000-c${g}`;
    if (i === 1) continue; // il 1° novembre c'è già zz01
    extra[`frammenti/2026/11/${id}.md`] = fm([`registrato: 2026-11-${g}T10:00:00+01:00`, 'canale: telefono'], `di nuovo camus il giorno ${i}`);
    extra[`letture/2026/11/${id}.md`] = L(['  - {p: nomina, a: camus, voce: sua, perche: «camus»}', ...(i === 5 ? ['  - {p: parla-di, a: solitudine, voce: sua, perche: «sola»}'] : [])],
      i === 3 ? ['delicato: true'] : []);
  }
  extra['frammenti/2026/11/20261120-2200-v1c1.md'] = fm(['registrato: 2026-11-20T22:00:00+01:00', 'canale: telefono'], 'Camus e la solitudine, di nuovo');
  extra['letture/2026/11/20261120-2200-v1c1.md'] = L(['  - {p: nomina, a: camus, voce: sua, perche: «Camus»}', '  - {p: parla-di, a: solitudine, voce: sua, perche: «solitudine»}'], ['parole: [battaglie]']);
  return archivio(t, extra, Object.keys(FILE).filter((p) => p.startsWith('ingresso/2')));
}

test('vicini: tetto 10, i più ricchi prima e a pari merito i più vecchi, delicati esclusi, niente oltre il tetto dopo i primi giorni', (t) => {
  const r = conDodici(t), v = vicini(r, '20261120-2200-v1c1');
  assert.equal(v['primi-3-giorni'], false);
  assert.equal(v['nodi-da'], 'lettura');
  assert.equal(v.vicini.length, 10);
  assert.deepEqual(v.vicini.slice(0, 2).map((x) => [x.id, x.comune]), [
    ['20261004-0000-u01', ['solitudine', 'battaglia']], ['20261105-1000-c05', ['camus', 'solitudine']]]);
  assert.deepEqual(v.vicini.slice(2, 4).map((x) => x.id), ['20261101-2200-zz01', '20261102-1000-c02']);
  assert.ok(!v.vicini.some((x) => x.id === '20261004-0000-s01')); // il seme ✧ non è un capo del ponte
  assert.ok(!v.vicini.some((x) => ['20261103-1000-c03', '20261004-0000-u07'].includes(x.id))); // delicati
  assert.ok(!v.vicini.some((x) => x.id >= '20261113')); // meno di 7 giorni
  assert.deepEqual(Object.keys(v.vicini[1]).sort(), ['canale', 'comune', 'data', 'id', 'segno', 'testo', 'voce']);
  // la riga di comando: JSON in stdout, sola lettura
  const prima = execFileSync('find', [r, '-type', 'f']).toString();
  const out = spawnSync('node', [SCRIPT, 'vicini', '20261120-2200-v1c1', '--radice', r], { encoding: 'utf8' });
  assert.equal(out.status, 0, out.stdout);
  assert.deepEqual(JSON.parse(out.stdout), v);
  assert.equal(execFileSync('find', [r, '-type', 'f']).toString(), prima);
  assert.match(spawnSync('node', [SCRIPT, 'vicini', '20261199-0000-zzzz', '--radice', r], { encoding: 'utf8' }).stdout, /ERRORE .*non è in frammenti/);
});

test('vicini nei primi 3 giorni: in più tutti gli importati voce sua non delicati, oltre il tetto', (t) => {
  const r = conDodici(t);
  const extra = (id, data) => {
    writeFileSync(join(r, `frammenti/2026/11/${id}.md`), fm([`registrato: ${data}`, 'canale: telefono'], 'Camus ancora una volta'));
    writeFileSync(join(r, `letture/2026/11/${id}.md`), L(['  - {p: nomina, a: camus, voce: sua, perche: «Camus»}']));
  };
  extra('20261103-2300-t3rz', '2026-11-03T23:00:00+01:00'); // terzo giorno di calendario dal 1° novembre
  const v = vicini(r, '20261103-2300-t3rz');
  assert.equal(v['primi-3-giorni'], true);
  const ids = v.vicini.map((x) => x.id);
  assert.deepEqual(ids, ['20261004-0000-u01', '20261004-0000-u19']); // gli ✦ tutti; s01 (✧) no, anche se ha Camus
  assert.deepEqual(v.vicini[1].comune, []);
  assert.match(v.vicini[1].perche, /primi 3 giorni/);
  extra('20261104-0001-q4rt', '2026-11-04T00:01:00+01:00'); // quarto giorno
  assert.equal(vicini(r, '20261104-0001-q4rt')['primi-3-giorni'], false);
});

test('punto zero vero (clone usa-e-getta): vicini di un memo del 3 novembre comprende u19', (t) => {
  const tag = spawnSync('git', ['-C', RADICE, 'rev-parse', '-q', '--verify', 'refs/tags/punto-zero']);
  if (tag.status !== 0) return t.skip('niente tag punto-zero');
  const d = mkdtempSync(join(tmpdir(), 'sm-prova-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  execFileSync('git', ['clone', '-q', RADICE, d]);
  execFileSync('git', ['-C', d, 'checkout', '-q', 'punto-zero']);
  for (const f of readdirSync(join(RADICE, 'scripts'))) cpSync(join(RADICE, 'scripts', f), join(d, 'scripts', f));
  symlinkSync(join(RADICE, 'node_modules'), join(d, 'node_modules'));
  const id = '20261103-2340-k7q2';
  mkdirSync(join(d, 'frammenti/2026/11'), { recursive: true }); mkdirSync(join(d, 'letture/2026/11'), { recursive: true });
  writeFileSync(join(d, `frammenti/2026/11/${id}.md`), fm(['registrato: 2026-11-03T23:40:12+01:00', 'canale: telefono'], 'rileggevo Camus stasera, Sisifo felice'));
  writeFileSync(join(d, `letture/2026/11/${id}.md`), L(['  - {p: nomina, a: camus, voce: sua, perche: «Camus»}']));
  const out = spawnSync('node', [join(d, 'scripts/smista.mjs'), 'vicini', id], { cwd: d, encoding: 'utf8', env: { ...process.env, ATLANTE_ORA: '2026-11-05T09:00:00+01:00' } });
  assert.equal(out.status, 0, out.stdout);
  const v = JSON.parse(out.stdout);
  assert.equal(v['primi-3-giorni'], true);
  assert.equal(v.vicini.find((x) => x.id === '20261004-0000-u19')?.voce, 'sua'); // R14 D0: Rust (altrui) tra i vicini
  assert.ok(!v.vicini.some((x) => /-s\d+$/.test(x.id) || x.voce === 'seme')); // mai il seme ✧
  assert.equal(v.vicini.find((x) => x.id === '20261005-0000-u22')?.['data-tetto'], '2026-10-04'); // vissuto senza ≤
  // blocco 5: per un importato `data` è la data-tetto (u22: registrato 2026-10-05, vissuto 2026-10-04), mai il registrato
  assert.equal(v.vicini.find((x) => x.id === '20261005-0000-u22')?.data, '2026-10-04');
  assert.equal(v.vicini.find((x) => x.id === '20261004-0000-u19')?.data, '2026-10-04'); // vissuto con ≤: la data senza il segno
  assert.ok(v.vicini.some((x) => x.comune.includes('camus')));
});
