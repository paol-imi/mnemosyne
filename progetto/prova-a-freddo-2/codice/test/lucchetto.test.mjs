// Blocco 5: il lucchetto (modello §8.1), su repository temporanei: in locale senza origin, e con un remoto bare locale.
// L'attesa di 90 s si toglie con LUCCHETTO_ATTESA=0; LUCCHETTO_PASSO accorcia i controlli mentre aspetta.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { lucchetto } from '../scripts/lucchetto.mjs';

const SCRIPT = fileURLToPath(new URL('../scripts/lucchetto.mjs', import.meta.url));
const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
const identita = (r) => { git(r, 'config', 'user.email', 'prova@example.org'); git(r, 'config', 'user.name', 'prova'); };
const tmp = (n) => mkdtempSync(join(tmpdir(), `memo-lucchetto-${n}-`));

function repo() {
  const r = tmp('locale');
  git(r, 'init', '-q', '-b', 'main'); identita(r);
  mkdirSync(join(r, 'ingresso'));
  writeFileSync(join(r, 'ingresso/.gitkeep'), '');
  git(r, 'add', '-A'); git(r, 'commit', '-q', '-m', 'inizio');
  return r;
}
// Un remoto bare e due copie, A e B, come due sessioni su due macchine.
function remoto() {
  const a = repo(), nudo = tmp('nudo'), b = tmp('copia');
  git(nudo, 'init', '-q', '--bare', '-b', 'main');
  git(a, 'remote', 'add', 'origin', nudo); git(a, 'push', '-q', '-u', 'origin', 'main');
  git(b, 'clone', '-q', nudo, '.'); identita(b);
  return { a, b, nudo };
}
// Esegue f come la sessione `sessione` all'ora `ora`, poi rimette l'ambiente.
function come(sessione, ora, f) {
  const prima = { ...process.env };
  Object.assign(process.env, { ATLANTE_SESSIONE: sessione, ATLANTE_ORA: ora, LUCCHETTO_ATTESA: '0', LUCCHETTO_PASSO: '1' });
  try { return f(); } finally {
    for (const k of ['ATLANTE_SESSIONE', 'ATLANTE_ORA', 'LUCCHETTO_ATTESA', 'LUCCHETTO_PASSO']) {
      if (prima[k] === undefined) delete process.env[k]; else process.env[k] = prima[k];
    }
  }
}
const inCorso = (r) => readFileSync(join(r, 'ingresso/.in-corso'), 'utf8');

test('in locale: prendi, occupato, rinnova, fencing, lascia, il gettone cresce', () => {
  const r = repo(), o = { radice: r, aspetta: 0 };
  const a = come('a', '2026-11-03T22:41:00Z', () => lucchetto('prendi', o));
  assert.equal(a.codice, 0);
  assert.match(a.messaggio, /preso \(gettone 1\).*in locale: nessun remoto origin/);
  assert.equal(inCorso(r), 'sessione: a\nciclo: smista\nora: 2026-11-03T23:41:00+01:00\ngettone: 1\n');
  assert.equal(git(r, 'log', '-1', '--format=%s|%aI|%cI'), 'lucchetto: prende smista (gettone 1)|2026-11-03T23:41:00+01:00|2026-11-03T23:41:00+01:00\n');
  assert.equal(git(r, 'status', '--porcelain'), '');

  const b = come('b', '2026-11-03T22:50:00Z', () => lucchetto('prendi', o));
  assert.equal(b.codice, 3);
  assert.match(b.messaggio, /occupato da a \(smista, dalle 2026-11-03T23:41:00\+01:00, gettone 1\)/);
  assert.equal(come('b', '2026-11-03T22:50:00Z', () => lucchetto('rinnova', o)).codice, 3);
  assert.equal(come('b', '2026-11-03T22:50:00Z', () => lucchetto('lascia', o)).codice, 3);
  assert.ok(existsSync(join(r, 'ingresso/.in-corso')), 'il fencing non toglie il lucchetto altrui');

  // il rinnovo committa solo .in-corso: il lavoro in corso resta nell'indice, non entra nel commit
  writeFileSync(join(r, 'lavoro.md'), 'piano\n'); git(r, 'add', 'lavoro.md');
  assert.equal(come('a', '2026-11-03T22:51:00Z', () => lucchetto('rinnova', o)).codice, 0);
  assert.equal(git(r, 'show', '--name-only', '--format=%s', 'HEAD'), 'lucchetto: rinnova (gettone 1)\n\ningresso/.in-corso\n');
  assert.match(inCorso(r), /ora: 2026-11-03T23:51:00\+01:00\ngettone: 1/);
  assert.equal(git(r, 'status', '--porcelain'), 'A  lavoro.md\n');

  const l = come('a', '2026-11-03T22:52:00Z', () => lucchetto('lascia', o));
  assert.equal(l.codice, 0);
  assert.equal(existsSync(join(r, 'ingresso/.in-corso')), false);
  assert.equal(git(r, 'status', '--porcelain'), 'D  ingresso/.in-corso\nA  lavoro.md\n');
  git(r, 'commit', '-q', '-m', 'smista: 1 memo');
  assert.equal(come('a', '2026-11-03T22:52:00Z', () => lucchetto('rinnova', o)).codice, 3, 'lasciato, non è più tuo');

  assert.equal(come('b', '2026-11-03T22:53:00Z', () => lucchetto('prendi', { ...o, ciclo: 'consolida' })).codice, 0);
  assert.equal(inCorso(r), 'sessione: b\nciclo: consolida\nora: 2026-11-03T23:53:00+01:00\ngettone: 2\n');
});

test('un lucchetto di 20 minuti è di una sessione morta: si prende, e il vecchio padrone lo perde', () => {
  const r = repo(), o = { radice: r, aspetta: 0 };
  assert.equal(come('a', '2026-11-03T22:00:00Z', () => lucchetto('prendi', o)).codice, 0);
  assert.equal(come('b', '2026-11-03T22:19:59Z', () => lucchetto('prendi', o)).codice, 3);
  const b = come('b', '2026-11-03T22:20:00Z', () => lucchetto('prendi', o));
  assert.equal(b.codice, 0);
  assert.match(b.messaggio, /gettone 2, quello di a era scaduto/);
  const a = come('a', '2026-11-03T22:21:00Z', () => lucchetto('rinnova', o));
  assert.equal(a.codice, 3);
  assert.match(a.messaggio, /non è più tuo \(è di b, gettone 2\): abbandona senza spingere/);
  assert.equal(come('a', '2026-11-03T22:21:00Z', () => lucchetto('lascia', o)).codice, 3);
});

test('--fire: un memo del telefono più recente e fresco → non tocca a te (4); vecchio, chat o Specchio → si procede', () => {
  const r = repo(), o = { radice: r, aspetta: 0, fire: '20261103-2340-k7q2' };
  writeFileSync(join(r, 'ingresso/20261103-2340-k7q2.md'), '---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---\nGalimberti\n');
  writeFileSync(join(r, 'ingresso/20261103-2343-a1b2.md'), '---\nregistrato: 2026-11-03T23:43:00+01:00\ncanale: telefono\n---\nah e\n');
  writeFileSync(join(r, 'ingresso/20261103-2344-c3d4.md'), '---\nregistrato: 2026-11-03T23:44:00+01:00\ncanale: chat\n---\n[23:44] ciao\n');
  const n = come('a', '2026-11-03T22:45:00Z', () => lucchetto('prendi', o));
  assert.equal(n.codice, 4);
  assert.match(n.messaggio, /non tocca a te: c'è 20261103-2343-a1b2/);
  assert.equal(existsSync(join(r, 'ingresso/.in-corso')), false);
  assert.equal(come('a', '2026-11-03T22:45:00Z', () => lucchetto('prendi', { ...o, ciclo: 'specchio' })).codice, 0);
  come('a', '2026-11-03T22:45:00Z', () => lucchetto('lascia', o)); git(r, 'commit', '-q', '-m', 'specchio: 0 memo');
  // il memo più recente ha 4 minuti: il suo fire è fallito, procede questa sessione (V1)
  assert.equal(come('a', '2026-11-03T22:47:00Z', () => lucchetto('prendi', o)).codice, 0);
});

test('con un remoto: il push è l\'arbitro, la seconda copia vede il lucchetto dopo il pull', () => {
  const { a, b, nudo } = remoto();
  const pa = come('a', '2026-11-03T22:41:00Z', () => lucchetto('prendi', { radice: a, aspetta: 0 }));
  assert.equal(pa.codice, 0);
  assert.doesNotMatch(pa.messaggio, /in locale/);
  assert.equal(git(nudo, 'log', '-1', '--format=%s'), 'lucchetto: prende smista (gettone 1)\n');
  assert.equal(come('b', '2026-11-03T22:42:00Z', () => lucchetto('prendi', { radice: b, aspetta: 0 })).codice, 3);

  // A lascia nel commit del lavoro e spinge; B ora lo prende, con il gettone dopo
  writeFileSync(join(a, 'lavoro.md'), 'x\n'); git(a, 'add', 'lavoro.md');
  assert.equal(come('a', '2026-11-03T22:43:00Z', () => lucchetto('lascia', { radice: a })).codice, 0);
  git(a, 'commit', '-q', '-m', 'smista: 1 memo'); git(a, 'push', '-q');
  assert.equal(come('b', '2026-11-03T22:44:00Z', () => lucchetto('prendi', { radice: b, aspetta: 0 })).codice, 0);
  assert.match(git(nudo, 'show', 'main:ingresso/.in-corso'), /sessione: b\n[\s\S]*gettone: 2\n/);
  assert.ok(existsSync(join(b, 'lavoro.md')), 'B ha fatto pull prima di prendere');
  // fencing con il remoto: A non vede più il suo lucchetto dopo il pull
  assert.equal(come('a', '2026-11-03T22:45:00Z', () => lucchetto('rinnova', { radice: a })).codice, 3);
});

test('con un remoto: se un altro spinge tra il pull e il push, il push è rifiutato e il commit si annulla', () => {
  const { a, b, nudo } = remoto();
  // un pre-push in B che, la prima volta, fa spingere ad A il suo lucchetto: il push di B arriva secondo
  const gancio = join(b, '.git/hooks/pre-push');
  writeFileSync(gancio, `#!/bin/sh\nrm "$0"\ncd '${a}' && printf 'sessione: a\\nciclo: smista\\nora: 2026-11-03T23:41:30+01:00\\ngettone: 7\\n' > ingresso/.in-corso && git add -f ingresso/.in-corso && git commit -q -m 'lucchetto: prende smista (gettone 7)' && git push -q origin HEAD:main\nexit 0\n`);
  chmodSync(gancio, 0o755);
  const testaPrima = git(b, 'rev-parse', 'HEAD');
  const e = come('b', '2026-11-03T22:42:00Z', () => lucchetto('prendi', { radice: b, aspetta: 0 }));
  assert.equal(e.codice, 3);
  assert.match(e.messaggio, /occupato da a .*gettone 7/);
  assert.equal(git(b, 'status', '--porcelain'), '');
  assert.equal(git(b, 'rev-parse', 'HEAD'), git(nudo, 'rev-parse', 'main'));
  assert.notEqual(git(b, 'rev-parse', 'HEAD'), testaPrima);
  assert.equal(git(nudo, 'log', '--format=%s', '-1'), 'lucchetto: prende smista (gettone 7)\n');
});

test('chi aspetta prende il lucchetto appena è lasciato (pull a ogni passo)', async () => {
  const { a, b } = remoto();
  assert.equal(come('a', '2026-11-03T22:41:00Z', () => lucchetto('prendi', { radice: a, aspetta: 0 })).codice, 0);
  const env = { ...process.env, ATLANTE_SESSIONE: 'b', ATLANTE_ORA: '2026-11-03T22:42:00Z', LUCCHETTO_ATTESA: '0', LUCCHETTO_PASSO: '1' };
  const figlio = spawn(process.execPath, [SCRIPT, 'prendi', '--ciclo', 'consolida', '--aspetta', '0.5', '--radice', b], { env });
  let uscita = '';
  figlio.stdout.on('data', (d) => { uscita += d; });
  const fine = new Promise((ok) => figlio.on('exit', ok));
  await new Promise((ok) => setTimeout(ok, 2500));
  come('a', '2026-11-03T22:43:00Z', () => lucchetto('lascia', { radice: a }));
  git(a, 'commit', '-q', '-m', 'smista: 1 memo'); git(a, 'push', '-q');
  assert.equal(await fine, 0, uscita);
  assert.match(uscita, /preso \(gettone 2\)/);
});

test('riga di comando: codici di uscita e argomenti', () => {
  const r = repo();
  const env = { ...process.env, ATLANTE_SESSIONE: 'a', ATLANTE_ORA: '2026-11-03T22:41:00Z', LUCCHETTO_ATTESA: '0' };
  const esegui = (...a) => spawnSync(process.execPath, [SCRIPT, ...a], { cwd: r, env, encoding: 'utf8' });
  const p = esegui('prendi', '--ciclo', 'ritratto', '--aspetta', '0');
  assert.equal(p.status, 0, p.stdout);
  assert.match(p.stdout, /preso \(gettone 1\) \(in locale/);
  const di = esegui('prendi', '--aspetta', '0');
  assert.equal(di.status, 0);
  assert.match(di.stdout, /già tuo \(gettone 1\)/);
  assert.equal(spawnSync(process.execPath, [SCRIPT, 'prendi', '--aspetta', '0'], { cwd: r, env: { ...env, ATLANTE_SESSIONE: 'b' }, encoding: 'utf8' }).status, 3);
  assert.equal(esegui('lascia').status, 0);
  assert.equal(esegui('apri').status, 1);
  assert.match(esegui('prendi', '--forza').stdout, /ERRORE lucchetto: argomento sconosciuto/);
  assert.equal(esegui('prendi', '--aspetta').status, 1);
  assert.equal(esegui('prendi', '--aspetta', 'mezz\'ora').status, 1);
  assert.equal(spawnSync(process.execPath, [SCRIPT, 'prendi'], { cwd: r, env: { ...env, LUCCHETTO_ATTESA: 'tanto' }, encoding: 'utf8' }).status, 1);
});
