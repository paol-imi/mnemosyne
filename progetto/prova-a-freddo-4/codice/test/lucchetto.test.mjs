// Blocco 5: il lucchetto (modello §8.1), da riga di comando, su repository temporanei: due copie di un remoto bare
// locale (due sessioni su due macchine) e una copia senza origin (un ramo del banco). Tempi in secondi.
// LUCCHETTO_ATTESA accorcia l'attesa del fire, LUCCHETTO_PASSO i controlli mentre aspetta.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT = fileURLToPath(new URL('../scripts/lucchetto.mjs', import.meta.url));
const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
const identita = (r) => { git(r, 'config', 'user.email', 'prova@example.org'); git(r, 'config', 'user.name', 'prova'); };
const cartelle = [];
const tmp = (n) => { const d = mkdtempSync(join(tmpdir(), `memo-lucchetto-${n}-`)); cartelle.push(d); return d; };
test.after(() => { for (const d of cartelle) rmSync(d, { recursive: true, force: true }); });

function repo() {
  const r = tmp('locale');
  git(r, 'init', '-q', '-b', 'main'); identita(r);
  mkdirSync(join(r, 'ingresso'));
  writeFileSync(join(r, 'ingresso/.gitkeep'), '');
  git(r, 'add', '-A'); git(r, 'commit', '-q', '-m', 'inizio');
  return r;
}
function remoto() {
  const a = repo(), nudo = tmp('nudo'), b = tmp('copia');
  git(nudo, 'init', '-q', '--bare', '-b', 'main');
  git(a, 'remote', 'add', 'origin', nudo); git(a, 'push', '-q', '-u', 'origin', 'main');
  git(b, 'clone', '-q', nudo, '.'); identita(b);
  return { a, b, nudo };
}
// lucchetto.mjs nella copia `dir` all'ora `ora`: {codice, out, sessione, gettone, ms}
function L(dir, ora, args, env = {}) {
  const t = Date.now();
  const r = spawnSync('node', [SCRIPT, ...args], { cwd: dir, encoding: 'utf8',
    env: { ...process.env, ATLANTE_ORA: ora, LUCCHETTO_ATTESA: '0', LUCCHETTO_PASSO: '0.2', ...env } });
  return { codice: r.status, out: r.stdout + r.stderr, ms: Date.now() - t,
    sessione: /^sessione: (\S+)$/m.exec(r.stdout)?.[1], gettone: Number(/^gettone: (\d+)$/m.exec(r.stdout)?.[1]) };
}
const lucchettoDi = (nudo) => git(nudo, 'show', `main:ingresso/.in-corso`);

test('preso: .in-corso con ciclo, sessione, ora e gettone, commit e push; stampa sessione e gettone', () => {
  const { a, nudo } = remoto();
  const p = L(a, '2026-11-03T22:41:00Z', ['prendi', '--ciclo', 'smista']);
  assert.equal(p.codice, 0, p.out);
  assert.match(p.sessione, /^[a-z0-9]{8}$/);
  assert.equal(p.gettone, 1);
  assert.equal(lucchettoDi(nudo), `ciclo: smista\nsessione: ${p.sessione}\nora: 2026-11-03T23:41:00+01:00\ngettone: 1\n`);
  assert.equal(git(a, 'log', '-1', '--format=%s|%cI'), 'lucchetto: prende smista (gettone 1)|2026-11-03T23:41:00+01:00\n');
  assert.deepEqual(JSON.parse(readFileSync(join(a, '.git/lucchetto'), 'utf8')), { sessione: p.sessione, gettone: 1, ciclo: 'smista' });
  assert.doesNotMatch(p.out, /avviso/);
  // la stessa sessione che lo riprende (Specchio dopo smista) lo trova già suo
  assert.equal(L(a, '2026-11-03T22:42:00Z', ['prendi', '--ciclo', 'specchio']).codice, 0);
});

test('occupato: 3 dopo l\'attesa di --aspetta secondi; senza --fire nessuna attesa di 90 s', () => {
  const { a, b } = remoto();
  assert.equal(L(a, '2026-11-03T22:41:00Z', ['prendi', '--ciclo', 'smista']).codice, 0);
  const o = L(b, '2026-11-03T22:50:00Z', ['prendi', '--ciclo', 'smista', '--aspetta', '1'], { LUCCHETTO_ATTESA: '30' });
  assert.equal(o.codice, 3, o.out);
  assert.match(o.out, /occupato da [a-z0-9]{8} \(smista, dalle 2026-11-03T23:41:00\+01:00, gettone 1\)/);
  assert.ok(o.ms >= 800 && o.ms < 10000, `ha aspettato ${o.ms} ms`); // --aspetta 1, non i 30 s del fire
  assert.equal(L(b, '2026-11-03T22:50:00Z', ['prendi', '--ciclo', 'specchio']).codice, 3); // Specchio non aspetta
});

test('scaduto (20 minuti), fencing di rinnova e lascia, il gettone cresce anche dopo un lascia', () => {
  const { a, b, nudo } = remoto();
  const pa = L(a, '2026-11-03T22:41:00Z', ['prendi', '--ciclo', 'smista']);
  // 19 minuti: ancora occupato; 21 minuti: scaduto, B lo prende con il gettone 2
  assert.equal(L(b, '2026-11-03T23:00:00Z', ['prendi', '--ciclo', 'smista', '--aspetta', '0']).codice, 3);
  const pb = L(b, '2026-11-03T23:02:00Z', ['prendi', '--ciclo', 'smista', '--aspetta', '0']);
  assert.equal(pb.codice, 0, pb.out);
  assert.match(pb.out, new RegExp(`quello di ${pa.sessione}, gettone 1, era scaduto`));
  assert.equal(pb.gettone, 2);
  // A si sveglia: rinnova e lascia (senza argomenti, da .git/lucchetto) dicono 3 e non toccano il lucchetto di B
  for (const az of ['rinnova', 'lascia']) {
    const r = L(a, '2026-11-03T23:03:00Z', [az]);
    assert.equal(r.codice, 3, r.out);
    assert.match(r.out, new RegExp(`non è più tuo \\(è di ${pb.sessione}, gettone 2\\)`));
  }
  assert.match(lucchettoDi(nudo), new RegExp(`sessione: ${pb.sessione}\n`));
  // B rinnova con gli argomenti: l'ora avanza, il gettone resta
  const rb = L(b, '2026-11-03T23:10:00Z', ['rinnova', '--sessione', pb.sessione, '--gettone', '2']);
  assert.equal(rb.codice, 0, rb.out);
  assert.match(lucchettoDi(nudo), /ora: 2026-11-04T00:10:00\+01:00\ngettone: 2\n/);
  assert.equal(L(b, '2026-11-03T23:10:00Z', ['rinnova', '--sessione', pb.sessione, '--gettone', '1']).codice, 3);
  // B lascia: il file è tolto (anche dall'indice) e va nel commit del lavoro
  const lb = L(b, '2026-11-03T23:12:00Z', ['lascia']);
  assert.equal(lb.codice, 0, lb.out);
  assert.ok(!existsSync(join(b, 'ingresso/.in-corso')) && !existsSync(join(b, '.git/lucchetto')));
  assert.match(git(b, 'status', '--porcelain'), /^D {2}ingresso\/\.in-corso$/m);
  git(b, 'commit', '-q', '-m', 'smista: 1 memo'); git(b, 'push', '-q', 'origin', 'HEAD:main');
  // il gettone dopo un lascia: il massimo della storia (2) + 1
  const pa2 = L(a, '2026-11-03T23:20:00Z', ['prendi', '--ciclo', 'consolida', '--aspetta', '0']);
  assert.equal(pa2.codice, 0, pa2.out);
  assert.equal(pa2.gettone, 3);
});

test('fencing prima del push: se un altro l\'ha preso nel frattempo, rinnova non spinge', () => {
  const { a, b, nudo } = remoto();
  const pa = L(a, '2026-11-03T22:41:00Z', ['prendi', '--ciclo', 'smista']);
  const pb = L(b, '2026-11-03T23:05:00Z', ['prendi', '--ciclo', 'smista', '--aspetta', '0']);
  assert.equal(pb.gettone, 2);
  const prima = git(nudo, 'rev-parse', 'main');
  const r = L(a, '2026-11-03T23:06:00Z', ['rinnova', '--sessione', pa.sessione, '--gettone', '1']);
  assert.equal(r.codice, 3, r.out);
  assert.equal(git(nudo, 'rev-parse', 'main'), prima, 'niente spinto');
});

test('codice 4 "non tocca a te": solo con --fire, solo per un memo del telefono più recente e di meno di 4 minuti', () => {
  const { a } = remoto();
  const memo = (id, reg, canale = 'telefono') => writeFileSync(join(a, `ingresso/${id}.md`), `---\nregistrato: ${reg}\ncanale: ${canale}\n---\nciao a tutti voi\n`);
  memo('20261103-2340-k7q2', '2026-11-03T23:40:00+01:00');
  memo('20261103-2343-m2c9', '2026-11-03T23:43:00+01:00');
  const quattro = L(a, '2026-11-03T22:44:00Z', ['prendi', '--ciclo', 'smista', '--fire', '20261103-2340-k7q2']);
  assert.equal(quattro.codice, 4, quattro.out);
  assert.match(quattro.out, /non tocca a te: c'è 20261103-2343-m2c9/);
  assert.ok(!existsSync(join(a, 'ingresso/.in-corso')));
  // senza --fire (passata, Specchio): mai 4
  const s = L(a, '2026-11-03T22:44:00Z', ['prendi', '--ciclo', 'specchio']);
  assert.equal(s.codice, 0, s.out);
  L(a, '2026-11-03T22:44:00Z', ['lascia']); git(a, 'commit', '-q', '-m', 'lascia'); git(a, 'push', '-q', 'origin', 'HEAD:main');
  // il memo più recente ha più di 4 minuti (il suo fire è fallito): procede lei
  const tardi = L(a, '2026-11-03T22:48:00Z', ['prendi', '--ciclo', 'smista', '--fire', '20261103-2340-k7q2']);
  assert.equal(tardi.codice, 0, tardi.out);
  L(a, '2026-11-03T22:48:00Z', ['lascia']); git(a, 'commit', '-q', '-m', 'lascia'); git(a, 'push', '-q', 'origin', 'HEAD:main');
  // una chat aperta più recente non conta; il fire aspetta LUCCHETTO_ATTESA secondi
  rmSync(join(a, 'ingresso/20261103-2343-m2c9.md'));
  memo('20261103-2344-c4t1', '2026-11-03T23:44:00+01:00', 'chat');
  const chat = L(a, '2026-11-03T22:45:00Z', ['prendi', '--ciclo', 'smista', '--fire', '20261103-2340-k7q2'], { LUCCHETTO_ATTESA: '1' });
  assert.equal(chat.codice, 0, chat.out);
  assert.ok(chat.ms >= 900, `il fire aspetta: ${chat.ms} ms`);
});

test('senza remoto (ramo del banco): pull e push saltati con un avviso; argomenti sbagliati = 1', () => {
  const r = repo();
  const p = L(r, '2026-11-03T22:41:00Z', ['prendi', '--ciclo', 'smista']);
  assert.equal(p.codice, 0, p.out);
  assert.match(p.out, /avviso: nessun remoto origin/);
  assert.equal(git(r, 'status', '--porcelain'), '');
  assert.equal(L(r, '2026-11-03T22:42:00Z', ['rinnova']).codice, 0);
  assert.equal(L(r, '2026-11-03T22:43:00Z', ['lascia']).codice, 0);
  assert.equal(L(r, '2026-11-03T22:43:00Z', ['rinnova']).codice, 3); // niente più da rinnovare
  assert.equal(L(r, '2026-11-03T22:43:00Z', ['prendi']).codice, 1); // manca --ciclo
  assert.equal(L(r, '2026-11-03T22:43:00Z', ['apri']).codice, 1);
  assert.equal(L(r, '2026-11-03T22:43:00Z', ['prendi', '--ciclo', 'smista', '--aspetta', 'mezzo']).codice, 1);
});
