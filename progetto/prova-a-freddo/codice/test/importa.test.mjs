import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { importa } from '../scripts/importa.mjs';
import { validaFile } from '../scripts/schema.mjs';

const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
const scrivi = (p, t) => { mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, t); };

// Un Atlante minimo in git, e un memo con la mini-tabella (2 frammenti, 2 nodi, 1 restituzione).
function ambiente() {
  const atlante = mkdtempSync(join(tmpdir(), 'atlante-'));
  git(atlante, 'init', '-q', '-b', 'main');
  git(atlante, 'config', 'user.email', 'prova@example.org');
  git(atlante, 'config', 'user.name', 'prova');
  scrivi(join(atlante, 'nucleo.md'), 'uno\ndue\ntre\nquattro\n');
  scrivi(join(atlante, 'diario/seme.md'), 'a\nb\nc\nd\ne\n');
  git(atlante, 'add', '-A');
  git(atlante, 'commit', '-q', '-m', 'atlante');
  const sha = git(atlante, 'rev-parse', 'HEAD').trim();

  const radice = mkdtempSync(join(tmpdir(), 'memo-importa-'));
  const tabella = {
    frammenti: [
      { id: '20261004-0000-u01', fonte: ['diario/seme.md:2'], registrato: '2026-10-04', voce: 'sua', vissuto: '≤2026-10-04',
        testo: 'battaglie interiori, solitudine.\nE poi il resto.', nota: 'Etichetta del seme.', 'serve-a': 'tatuaggi',
        lettura: { intento: ['salva'], fonte: 'diario/seme.md:2', nota: 'Copia non importata: nucleo.md:1.',
          legami: [{ p: 'parla-di', a: 'solitudine', voce: 'sua', perche: '«solitudine»' }], parole: ['percorso'] } },
      { id: '20261005-0000-s01', fonte: ['nucleo.md:1-3'], registrato: '2026-10-05', voce: 'seme', testo: 'uno due tre',
        lettura: { intento: ['sguardo'], fonte: 'nucleo.md:1-3', legami: [] } },
    ],
    nodi: [
      { genere: 'temi', slug: 'solitudine', nome: 'solitudine', 'nato-da': ['20261004-0000-u01'],
        link: 'https://paol-imi.github.io/tattoo-shit/emozioni/solitudine', corpo: '' },
      { genere: 'raccolte', slug: 'tatuaggi', nome: 'tatuaggi', alias: [], 'nato-da': ['20261005-0000-s01'], scopo: '', corpo: '' },
    ],
    restituzioni: [
      { id: 'r-20261007-0000-eredita-citazioni', forma: 'eredita', data: '2026-10-07', fonte: 'nucleo.md:4',
        voci: [{ n: 1, rif: '~Camus', voce: 'proposta', cosa: 'citazione' }],
        legami: [{ p: 'converge-con', tra: ['20261004-0000-u01', 'solitudine', '~Camus'], voce: 'proposta', perche: 'la stessa solitudine' }] },
    ],
  };
  const citazioni = [{ entita: 'camus', citazione: 'Bisogna immaginare Sisifo felice.', esito: 'verificata',
    riferimento: 'Camus, Il mito di Sisifo (1942)', traduzione: 'edizione pubblicata' }];
  scrivi(join(radice, 'importa/tabella.json'), JSON.stringify(tabella));
  scrivi(join(radice, 'importa/citazioni.json'), JSON.stringify(citazioni));
  scrivi(join(radice, 'importa/fonte.json'), JSON.stringify({ url: 'x', sha }));
  return { atlante, radice };
}

function istantanea(radice) {
  const fuori = {}, giu = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (e === 'importa') continue;
      statSync(p).isDirectory() ? giu(p) : (fuori[relative(radice, p)] = readFileSync(p, 'utf8'));
    }
  };
  giu(radice);
  return fuori;
}

test('importa: la mini-tabella dà i file attesi, validi, e un secondo giro non cambia un byte', () => {
  const { atlante, radice } = ambiente();
  const e = importa({ da: atlante, radice, prova: false });
  assert.deepEqual(e.errori, []);
  assert.deepEqual(e.verifica, []);
  const prima = istantanea(radice);
  assert.deepEqual(Object.keys(prima).sort(), [
    'frammenti/.hash',
    'frammenti/2026/10/20261004-0000-u01.md',
    'frammenti/2026/10/20261005-0000-s01.md',
    'letture/2026/10/20261004-0000-u01.md',
    'letture/2026/10/20261005-0000-s01.md',
    'raccolte/tatuaggi.md',
    'restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md',
    'temi/solitudine.md',
  ]);
  for (const p of Object.keys(prima).filter((x) => x.endsWith('.md'))) assert.deepEqual(validaFile(p, prima[p]), [], p);
  assert.equal(prima['frammenti/2026/10/20261004-0000-u01.md'],
    '---\nregistrato: 2026-10-04\ncanale: importato\nvoce: sua\n---\nbattaglie interiori, solitudine.\nE poi il resto.\n');
  const l = prima['letture/2026/10/20261004-0000-u01.md'];
  assert.match(l, /versione: 1\n/);
  assert.match(l, /fonte: diario\/seme.md:2@[0-9a-f]{7}\n/);
  assert.match(l, /\{p: serve-a, a: tatuaggi, voce: sua/);
  const r = prima['restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md'];
  assert.match(r, /esito: verificata/);
  assert.match(r, /1\. Bisogna immaginare Sisifo felice\.\n— Camus, Il mito di Sisifo \(1942\)\n$/);

  const due = importa({ da: atlante, radice, prova: false });
  assert.deepEqual(due.errori, []);
  assert.deepEqual(due.scritti, []);
  assert.deepEqual(istantanea(radice), prima);
});

test('importa --prova: conti, nessun file; slug assente e SHA sbagliato sono errori', () => {
  const { atlante, radice } = ambiente();
  const t = JSON.parse(readFileSync(join(radice, 'importa/tabella.json'), 'utf8'));
  t.frammenti[0].lettura.legami.push({ p: 'nomina', a: 'nietzsche', voce: 'sua', perche: '«nietzsche»' });
  writeFileSync(join(radice, 'importa/tabella.json'), JSON.stringify(t));
  const e = importa({ da: atlante, radice, prova: true });
  assert.equal(e.conti.frammenti, 2);
  assert.equal(e.conti.nodi, 2);
  assert.equal(e.conti.restituzioni, 1);
  assert.deepEqual(e.errori, ['letture/2026/10/20261004-0000-u01.md: riferimento a nodo assente: nietzsche']);
  assert.deepEqual(Object.keys(istantanea(radice)), []);

  writeFileSync(join(radice, 'importa/fonte.json'), JSON.stringify({ sha: '0'.repeat(40) }));
  assert.match(importa({ da: atlante, radice, prova: true }).errori[0], /^Atlante a [0-9a-f]{40}, atteso 0{40}/);
});

test('importa: citazioni.json vince su esito e riferimento; entita esplicita; corpo della lettura dalla tabella', () => {
  const { atlante, radice } = ambiente();
  const t = JSON.parse(readFileSync(join(radice, 'importa/tabella.json'), 'utf8'));
  t.restituzioni[0].voci = [{ n: 1, rif: '~Sisifo', entita: 'camus', voce: 'proposta', cosa: 'citazione',
    estratto: 'Sisifo felice.', esito: 'simile', riferimento: 'vecchio' }];
  t.restituzioni[0].testo = 'vecchio corpo';
  t.frammenti[0].lettura.corpo = 'Il seguito della nota.';
  writeFileSync(join(radice, 'importa/tabella.json'), JSON.stringify(t));
  const e = importa({ da: atlante, radice, prova: false });
  assert.deepEqual(e.errori, []);
  const r = readFileSync(join(radice, 'restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md'), 'utf8');
  assert.match(r, /estratto: Bisogna immaginare Sisifo felice\., esito: verificata, riferimento: "Camus, Il mito di Sisifo \(1942\)"/);
  assert.doesNotMatch(r, /entita|vecchio|simile/);
  assert.match(r, /1\. Bisogna immaginare Sisifo felice\.\n— Camus, Il mito di Sisifo \(1942\)\n$/);
  assert.ok(e.avvisi.some((a) => /#1: esito della tabella diverso da citazioni\.json \(vince citazioni\.json\)/.test(a)));
  const l = readFileSync(join(radice, 'letture/2026/10/20261004-0000-u01.md'), 'utf8');
  assert.match(l, /---\nIl seguito della nota\.\n\nCopia non importata: nucleo\.md:1\.\n$/);
});
