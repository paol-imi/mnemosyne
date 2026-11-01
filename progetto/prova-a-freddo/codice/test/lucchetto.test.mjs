// Blocco 5: il lucchetto (modello §8.1), su un repository temporaneo senza remote.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { lucchetto } from '../scripts/lucchetto.mjs';

const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
function repo() {
  const r = mkdtempSync(join(tmpdir(), 'memo-lucchetto-'));
  git(r, 'init', '-q', '-b', 'main');
  git(r, 'config', 'user.email', 'prova@example.org');
  git(r, 'config', 'user.name', 'prova');
  mkdirSync(join(r, 'ingresso'));
  writeFileSync(join(r, 'ingresso/.gitkeep'), '');
  git(r, 'add', '-A'); git(r, 'commit', '-q', '-m', 'inizio');
  process.env.LUCCHETTO_ATTESA = '0';
  return r;
}
const come = (sessione, ora, f) => {
  process.env.ATLANTE_SESSIONE = sessione; process.env.ATLANTE_ORA = ora;
  try { return f(); } finally { delete process.env.ATLANTE_SESSIONE; }
};

test('prendi, occupato, rinnova, fencing, lascia, gettone che cresce', () => {
  const r = repo(), o = { radice: r, senzaPush: true, aspetta: 0 };
  const a = come('a', '2026-11-03T22:41:00Z', () => lucchetto('prendi', o));
  assert.equal(a.codice, 0);
  assert.match(readFileSync(join(r, 'ingresso/.in-corso'), 'utf8'), /sessione: a\nciclo: smista\nora: 2026-11-03T23:41:00\+01:00\ngettone: 1\n/);
  assert.match(git(r, 'log', '-1', '--format=%s'), /gettone 1/);
  assert.equal(come('b', '2026-11-03T22:50:00Z', () => lucchetto('prendi', o)).codice, 3);
  assert.equal(come('b', '2026-11-03T22:50:00Z', () => lucchetto('rinnova', o)).codice, 3);
  assert.equal(come('a', '2026-11-03T22:51:00Z', () => lucchetto('rinnova', o)).codice, 0);
  assert.equal(come('a', '2026-11-03T22:52:00Z', () => lucchetto('lascia', o)).codice, 0);
  assert.equal(existsSync(join(r, 'ingresso/.in-corso')), false);
  git(r, 'commit', '-q', '-m', 'smista: 1 memo');
  assert.equal(come('b', '2026-11-03T22:53:00Z', () => lucchetto('prendi', o)).codice, 0);
  assert.match(readFileSync(join(r, 'ingresso/.in-corso'), 'utf8'), /gettone: 2/);
});

test('un lucchetto più vecchio di 20 minuti si prende, e il vecchio padrone lo perde', () => {
  const r = repo(), o = { radice: r, senzaPush: true, aspetta: 0 };
  assert.equal(come('a', '2026-11-03T22:00:00Z', () => lucchetto('prendi', o)).codice, 0);
  assert.equal(come('b', '2026-11-03T22:21:00Z', () => lucchetto('prendi', o)).codice, 0);
  assert.equal(come('a', '2026-11-03T22:22:00Z', () => lucchetto('rinnova', o)).codice, 3);
});

test('--fire: un memo del telefono più recente e fresco → non tocca a te (4)', () => {
  const r = repo(), o = { radice: r, senzaPush: true, aspetta: 0, fire: '20261103-2340-k7q2' };
  writeFileSync(join(r, 'ingresso/20261103-2343-a1b2.md'), '---\nregistrato: 2026-11-03T23:43:00+01:00\ncanale: telefono\n---\nah e\n');
  assert.equal(come('a', '2026-11-03T22:45:00Z', () => lucchetto('prendi', o)).codice, 4);
  assert.equal(come('a', '2026-11-03T22:48:00Z', () => lucchetto('prendi', o)).codice, 0);
});

test('con un remote: il push è l\'arbitro, la seconda copia vede il lucchetto dopo il pull', () => {
  const r = repo(), nudo = mkdtempSync(join(tmpdir(), 'memo-nudo-'));
  git(nudo, 'init', '-q', '--bare', '-b', 'main');
  git(r, 'remote', 'add', 'origin', nudo); git(r, 'push', '-q', '-u', 'origin', 'main');
  const b = mkdtempSync(join(tmpdir(), 'memo-copia-'));
  git(b, 'clone', '-q', nudo, '.'); git(b, 'config', 'user.email', 'p@example.org'); git(b, 'config', 'user.name', 'p');
  assert.equal(come('a', '2026-11-03T22:41:00Z', () => lucchetto('prendi', { radice: r, aspetta: 0 })).codice, 0);
  assert.match(git(nudo, 'log', '-1', '--format=%s'), /gettone 1/);
  assert.equal(come('b', '2026-11-03T22:42:00Z', () => lucchetto('prendi', { radice: b, aspetta: 0 })).codice, 3);
});
