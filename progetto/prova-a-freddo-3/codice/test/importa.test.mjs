// Blocco 2: importa.mjs (modello §14). Un Atlante minimo in git e una mini-tabella: i file attesi, validi per verifica.mjs,
// gli stessi byte al secondo giro; --prova non scrive; lo SHA sbagliato e lo slug fuori elenco fermano tutto; la
// riconciliazione porta ~Nome e alias allo slug dell'elenco; il piano B tocca solo le voci eredita; contesto.mjs gira, con il seme in fondo a parole.md.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { importa, oraDelPasso } from '../scripts/importa.mjs';
import { verifica, leggiHash, sha256 } from '../scripts/verifica.mjs';

const SCRIPT = new URL('../scripts/importa.mjs', import.meta.url).pathname;
const ENV = { ...process.env, GIT_AUTHOR_NAME: 'prova', GIT_AUTHOR_EMAIL: 'prova@local', GIT_COMMITTER_NAME: 'prova',
  GIT_COMMITTER_EMAIL: 'prova@local', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' };
const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, env: ENV, encoding: 'utf8', stdio: 'pipe' });
const scrivi = (p, t) => { mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, t); };
const json = (radice, nome) => JSON.parse(readFileSync(join(radice, 'importa', nome), 'utf8'));
const salva = (radice, nome, o) => writeFileSync(join(radice, 'importa', nome), JSON.stringify(o));

function ambiente(t) {
  const atlante = mkdtempSync(join(tmpdir(), 'atlante-'));
  const radice = mkdtempSync(join(tmpdir(), 'memo-importa-'));
  t.after(() => { rmSync(atlante, { recursive: true, force: true }); rmSync(radice, { recursive: true, force: true }); });
  git(atlante, 'init', '-q', '-b', 'main');
  scrivi(join(atlante, 'nucleo.md'), 'uno\ndue\ntre\nquattro\n');
  scrivi(join(atlante, 'diario/seme.md'), 'a\nb\nc\nd\ne\n');
  git(atlante, 'add', '-A');
  git(atlante, 'commit', '-q', '-m', 'atlante');
  const sha = git(atlante, 'rev-parse', 'HEAD').trim();
  git(radice, 'init', '-q', '-b', 'main'); // senza commit: per verifica.mjs ogni file è nuovo
  const tabella = {
    nodi: [
      { genere: 'temi', slug: 'solitudine', nome: 'solitudine', alias: ['solitudini'], 'nato-da': ['20261004-0000-u01'],
        link: 'https://paol-imi.github.io/tattoo-shit/emozioni/solitudine', dubbio: 'nota di lavoro', corpo: '' },
      { genere: 'persone', slug: 'camus', nome: 'Albert Camus', alias: ['Camus'], cerchia: 'mondo', 'nato-da': ['20261005-0000-s01'] },
      { genere: 'raccolte', slug: 'tatuaggi', nome: 'tatuaggi', alias: [], 'nato-da': ['20261004-0000-s03'], scopo: '' },
    ],
    frammenti: [
      { id: '20261004-0000-u01', fonte: ['diario/seme.md:2', 'nucleo.md:1'], registrato: '2026-10-04', voce: 'sua',
        vissuto: '≤2026-10-04', testo: 'battaglie interiori, solitudine.\nE poi il resto.', nota: 'Etichetta del seme.',
        'serve-a': 'tatuaggi', dubbio: 'x',
        lettura: { intento: ['salva'], fonte: 'diario/seme.md:2', nota: 'Copia non importata: nucleo.md:1.', corpo: 'Il seguito.',
          legami: [{ p: 'parla-di', a: 'solitudini', voce: 'sua', perche: '«solitudine»' }], parole: ['percorso'] } },
      { id: '20261005-0000-s01', fonte: ['nucleo.md:1-3'], registrato: '2026-10-05', voce: 'seme', testo: 'uno due tre',
        lettura: { intento: ['sguardo'], legami: [{ p: 'nomina', a: '~Albert Camus', voce: 'seme', perche: 'lo sguardo lo nomina' }] } },
      { id: '20261004-0000-s03', fonte: ['diario/seme.md:4-5'], registrato: '2026-10-04', voce: 'seme', testo: 'il racconto',
        lettura: { intento: ['niente'], legami: [] } },
    ],
    restituzioni: [
      { id: 'r-20261006-0000-eredita-sisifo', forma: 'eredita', data: '2026-10-06', fonte: ['nucleo.md:4', 'diario/seme.md:1'],
        aggancio: { a: '20261004-0000-u01' }, 'serve-a': 'tatuaggi', placement: ['braccio'],
        testo: '1. Sisifo, ma la vecchia frase: il masso è leggero.', voci: [{ n: 1, rif: '~Camus', voce: 'proposta', cosa: 'idea',
          estratto: 'il masso è leggero.' }] },
      { id: 'r-20261007-0000-eredita-citazioni', forma: 'eredita', data: '2026-10-07', fonte: 'nucleo.md:4',
        voci: [{ n: 1, rif: 'camus', voce: 'proposta', cosa: 'citazione' }],
        legami: [{ p: 'converge-con', tra: ['20261004-0000-u01', 'solitudine', '~Camus'], voce: 'proposta', perche: 'la stessa solitudine' }] },
    ],
  };
  const citazioni = [{ entita: 'camus', citazione: 'Bisogna immaginare Sisifo felice.', esito: 'verificata',
    riferimento: 'Camus, Il mito di Sisifo (1942)', traduzione: 'edizione pubblicata' }];
  scrivi(join(radice, 'importa/tabella.json'), JSON.stringify(tabella));
  scrivi(join(radice, 'importa/citazioni.json'), JSON.stringify(citazioni));
  scrivi(join(radice, 'importa/fonte.json'), JSON.stringify({ url: 'x', sha }));
  return { atlante, radice, sha };
}

function istantanea(radice) {
  const fuori = {}, giu = (d) => {
    for (const e of readdirSync(d)) {
      if (['importa', '.git'].includes(e)) continue;
      const p = join(d, e);
      statSync(p).isDirectory() ? giu(p) : (fuori[relative(radice, p)] = readFileSync(p, 'utf8'));
    }
  };
  giu(radice);
  return fuori;
}

test('importa: i file attesi, validi per verifica.mjs, con frammenti/.hash; un secondo giro non cambia un byte', (t) => {
  const { atlante, radice, sha } = ambiente(t);
  const e = importa({ da: atlante, radice });
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.verifica, []);
  const prima = istantanea(radice);
  assert.deepEqual(Object.keys(prima).sort(), [
    'contesto/mappa.md', 'contesto/parole.md', 'contesto/recenti.md', 'frammenti/.hash',
    'frammenti/2026/10/20261004-0000-s03.md', 'frammenti/2026/10/20261004-0000-u01.md', 'frammenti/2026/10/20261005-0000-s01.md',
    'letture/2026/10/20261004-0000-s03.md', 'letture/2026/10/20261004-0000-u01.md', 'letture/2026/10/20261005-0000-s01.md',
    'persone/camus.md', 'raccolte/tatuaggi.md',
    'restituzioni/2026/10/r-20261006-0000-eredita-sisifo.md', 'restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md',
    'temi/solitudine.md',
  ]);
  assert.equal(prima['frammenti/2026/10/20261004-0000-u01.md'],
    '---\nregistrato: 2026-10-04\ncanale: importato\nvoce: sua\n---\nbattaglie interiori, solitudine.\nE poi il resto.\n');
  // frammenti/.hash nel formato di verifica.mjs: "<sha256>  <percorso>", una riga per file, in ordine
  const h = leggiHash(prima['frammenti/.hash']);
  assert.equal(h.size, 3);
  for (const [p, x] of h) assert.equal(x, sha256(readFileSync(join(radice, p))));
  const l = prima['letture/2026/10/20261004-0000-u01.md'];
  assert.match(l, /^---\nschema: 3\nversione: 1\nletto-da: lettore-importazione\nprompt: "[0-9a-f]{7}"\nintento: \[salva\]\n/);
  assert.match(l, new RegExp(`fonte: diario/seme.md:2@${sha.slice(0, 7)}\n`));
  assert.match(l, /\{p: parla-di, a: solitudine, voce: sua/); // l'alias "solitudini" riconciliato
  assert.match(l, /\{p: serve-a, a: tatuaggi, voce: sua/);
  assert.match(l, /---\nIl seguito\.\n\nCopia non importata: nucleo\.md:1\.\n$/);
  assert.doesNotMatch(l + prima['temi/solitudine.md'], /dubbio|nota di lavoro/);
  assert.match(prima['letture/2026/10/20261005-0000-s01.md'], /\{p: nomina, a: camus, voce: seme/); // ~Albert Camus → camus
  const s = prima['restituzioni/2026/10/r-20261006-0000-eredita-sisifo.md'];
  assert.match(s, new RegExp(`fonte:\\n  - nucleo.md:4@${sha.slice(0, 7)}\\n  - diario/seme.md:1@${sha.slice(0, 7)}\\n`));
  assert.match(s, /rif: camus/);
  assert.match(s, /\{p: serve-a, a: tatuaggi, voce: proposta/);
  assert.doesNotMatch(s, /placement|braccio/);
  const r = prima['restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md'];
  assert.match(r, /estratto: Bisogna immaginare Sisifo felice\., esito: verificata/);
  assert.match(r, /tra: \[20261004-0000-u01, solitudine, camus\]/);
  assert.match(r, /---\n1\. Bisogna immaginare Sisifo felice\.\n— Camus, Il mito di Sisifo \(1942\)\n$/);
  assert.equal(prima['raccolte/tatuaggi.md'], '---\nschema: 3\nnome: tatuaggi\nnato-da: [20261004-0000-s03]\n---\n');
  // contesto alla data dell'ultimo passo; nessun conto di Stato contiene l'importato
  const m = prima['contesto/mappa.md'];
  assert.match(m, /^---\naggiornato: 2026-10-07T00:00:00\+02:00\nfino-a: 20261005-0000-s01\ntoken-stimati: \d+\n---\n/);
  assert.match(m, /- giorni attivi: 0\n- frammenti parlanti: 0;/);
  assert.match(m, /- camus · persone · Albert Camus · ✦0 ◌2 ●0 ✧1 · 2026-10-05–2026-10-07/);
  assert.match(m, /- solitudini → solitudine \(temi\)/);
  assert.match(prima['contesto/parole.md'], /\n## Seme ✧\n[\s\S]*### 20261004-0000-s03 · ✧ seme · ≤2026-10-04[\s\S]*### 20261005-0000-s01 · ✧ seme · ≤2026-10-05[\s\S]*\nuno due tre\n$/);

  const due = importa({ da: atlante, radice });
  assert.deepEqual(due.errori, []);
  assert.deepEqual(due.scritti, []);
  assert.deepEqual(istantanea(radice), prima);
  // un frammento ritoccato a mano: l'importazione non lo sovrascrive
  writeFileSync(join(radice, 'frammenti/2026/10/20261004-0000-s03.md'), 'altro');
  assert.match(importa({ da: atlante, radice }).errori[0], /20261004-0000-s03\.md: esiste già ed è diverso/);
});

test('importa --prova: i conti e nessun file; SHA sbagliato, Atlante sporco e slug fuori elenco fermano tutto', (t) => {
  const { atlante, radice } = ambiente(t);
  const r = spawnSync('node', [SCRIPT, '--da', atlante, '--radice', radice, '--prova'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /conti: frammenti 3 \(sua 1, seme 2; attesi ~35\), letture 3, nodi 3 .*restituzioni 2 .*voci 2/);
  assert.match(r.stdout, /riconciliazione: 4 sostituzioni/);
  assert.deepEqual(Object.keys(istantanea(radice)), []);

  const tab = json(radice, 'tabella.json');
  tab.frammenti[0].lettura.legami.push({ p: 'nomina', a: 'nietzsche', voce: 'sua', perche: '«nietzsche»' });
  salva(radice, 'tabella.json', tab);
  const e = importa({ da: atlante, radice });
  assert.deepEqual(e.errori, ['letture/2026/10/20261004-0000-u01.md (nomina): slug fuori elenco: nietzsche']);
  assert.deepEqual(Object.keys(istantanea(radice)), []);

  writeFileSync(join(atlante, 'nucleo.md'), 'cambiato\n');
  assert.match(importa({ da: atlante, radice, prova: true }).errori[0], /^Atlante con modifiche locali/);
  salva(radice, 'fonte.json', { sha: '0'.repeat(40) });
  assert.match(importa({ da: atlante, radice, prova: true }).errori[0], /^Atlante a [0-9a-f]{40}, atteso 0{40}/);
});

test('importa: piano B solo sulle voci eredita (mai sul frammento); citazioni.json vince; fonte oltre la fine', (t) => {
  const { atlante, radice } = ambiente(t);
  const tab = json(radice, 'tabella.json');
  tab.frammenti[0].testo = 'il masso è leggero, scrivevo.';
  tab.restituzioni[1].voci[0] = { ...tab.restituzioni[1].voci[0], esito: 'simile', riferimento: 'vecchio' };
  salva(radice, 'tabella.json', tab);
  salva(radice, 'correzioni-citazioni.json', { correzioni: [
    { entita: 'camus', prima: 'il masso è leggero.', dopo: 'il masso pesa ancora.', esito: 'simile', riferimento: 'Camus, cap. IV' },
    { entita: 'cioran', viva: false, prima: 'Non essere nati', dopo: 'Non essere nato' }] });
  const e = importa({ da: atlante, radice, prova: true });
  assert.deepEqual(e.errori, []);
  assert.ok(e.avvisi.includes('correzioni-citazioni (piano B) camus: 1 voci corrette'));
  assert.ok(e.avvisi.includes('correzioni-citazioni (piano B) cioran: nessuna voce eredita'));
  assert.ok(e.avvisi.some((a) => /#1: esito della tabella diverso da citazioni\.json/.test(a)));
  const w = importa({ da: atlante, radice });
  assert.deepEqual([...w.errori, ...w.verifica], []);
  const s = readFileSync(join(radice, 'restituzioni/2026/10/r-20261006-0000-eredita-sisifo.md'), 'utf8');
  assert.match(s, /estratto: il masso pesa ancora\., esito: simile, riferimento: "Camus, cap\. IV"/);
  assert.match(s, /\n1\. Sisifo, ma la vecchia frase: il masso pesa ancora\.\n$/);
  assert.match(readFileSync(join(radice, 'frammenti/2026/10/20261004-0000-u01.md'), 'utf8'), /il masso è leggero, scrivevo\./);
  assert.doesNotMatch(readFileSync(join(radice, 'restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md'), 'utf8'), /vecchio/);

  const radice2 = ambiente(t);
  const tab2 = json(radice2.radice, 'tabella.json');
  tab2.restituzioni[0].fonte = 'nucleo.md:9';
  tab2.restituzioni[0].voci[0].estratto = 'non c\'è nel corpo';
  salva(radice2.radice, 'tabella.json', tab2);
  const f = importa({ da: radice2.atlante, radice: radice2.radice, prova: true });
  assert.ok(f.errori.includes('r-20261006-0000-eredita-sisifo: fonte nucleo.md:9 oltre la fine (5 righe)'), f.errori.join('\n'));
  assert.ok(f.errori.some((x) => /l'estratto della voce 1 non è nel corpo/.test(x)));
});

test('oraDelPasso: la mezzanotte di Roma con lo scarto del giorno (ora legale fino al 25 ottobre 2026)', () => {
  assert.equal(oraDelPasso('2026-10-04'), '2026-10-04T00:00:00+02:00');
  assert.equal(oraDelPasso('2026-10-31'), '2026-10-31T00:00:00+01:00');
});

test('verifica accetta ciò che importa scrive anche dopo il commit del punto zero', (t) => {
  const { atlante, radice } = ambiente(t);
  assert.deepEqual(importa({ da: atlante, radice }).verifica, []);
  git(radice, 'add', '-A');
  git(radice, 'commit', '-q', '-m', 'importa: punto zero');
  assert.deepEqual(verifica(radice), []);
});
