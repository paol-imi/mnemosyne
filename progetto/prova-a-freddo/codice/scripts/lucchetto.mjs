// lucchetto.mjs: una sola sessione lavora (modello §8.1). Uscita: 0 preso/fatto, 3 occupato o perso, 4 "non tocca a te".
// node scripts/lucchetto.mjs prendi|rinnova|lascia [--ciclo X] [--fire ID] [--aspetta MIN] [--senza-push] [--radice DIR]
// `ingresso/.in-corso` porta sessione, ciclo, ora e gettone (il precedente + 1, anche dai messaggi di commit). La sessione
// ricorda il suo gettone in .git/lucchetto (non versionato); il suo id è ATLANTE_SESSIONE, se c'è. LUCCHETTO_ATTESA:
// i secondi dell'attesa iniziale (90; 0 nei test). `lascia` toglie il file dall'indice: il commit è quello del lavoro.
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ora, iso } from './ora.mjs';
import { frontmatter } from './schema.mjs';

const SCADENZA = 20 * 60e3, ASPETTA = { smista: 45, consolida: 30, ritratto: 30, specchio: 0 };
const FILE = 'ingresso/.in-corso';
const dorme = (s) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, s * 1000);

export function lucchetto(azione, { radice = process.cwd(), ciclo = 'smista', fire, aspetta, senzaPush = false } = {}) {
  const git = (...a) => execFileSync('git', a, { cwd: radice, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const prova = (...a) => { try { git(...a); return true; } catch { return false; } };
  const remoto = !senzaPush && git('remote').trim() !== '';
  const pull = () => remoto && prova('pull', '-q', '--rebase', '--autostash');
  const statoF = join(git('rev-parse', '--git-dir').trim().replace(/^(?!\/)/, `${radice}/`), 'lucchetto');
  const mio = existsSync(statoF) ? JSON.parse(readFileSync(statoF, 'utf8')) : {};
  const sessione = process.env.ATLANTE_SESSIONE ?? mio.sessione ?? `s-${randomBytes(4).toString('hex')}`;
  const leggi = () => {
    if (!existsSync(join(radice, FILE))) return null;
    const o = Object.fromEntries(readFileSync(join(radice, FILE), 'utf8').split('\n').filter(Boolean).map((r) => r.split(/: (.*)/s).slice(0, 2)));
    return { ...o, gettone: Number(o.gettone) };
  };
  const scrivi = (l) => writeFileSync(join(radice, FILE), `sessione: ${l.sessione}\nciclo: ${l.ciclo}\nora: ${l.ora}\ngettone: ${l.gettone}\n`);
  const nostro = (l) => l && l.sessione === sessione && l.gettone === mio.gettone;
  const spingi = (msg) => {
    git('add', '-f', FILE);
    if (!prova('diff', '--cached', '--quiet', '--', FILE)) git('commit', '-q', '-m', msg, '--', FILE);
    if (!remoto || prova('push', '-q')) return true;
    git('reset', '-q', '--soft', 'HEAD~1'); git('reset', '-q', '--', FILE); rmSync(join(radice, FILE), { force: true });
    pull(); return false;
  };

  if (azione === 'prendi') {
    const attesa = Number(process.env.LUCCHETTO_ATTESA ?? 90);
    if (ciclo !== 'specchio' && attesa > 0) dorme(attesa);
    pull();
    if (fire) { // un memo del telefono più recente e con meno di 4 minuti: lo elabora la sua sessione (V1)
      const dir = join(radice, 'ingresso');
      for (const f of existsSync(dir) ? readdirSync(dir).filter((x) => /^\d{8}-\d{4}-[a-z0-9]{3,4}\.md$/.test(x)) : []) {
        const { dati } = frontmatter(readFileSync(join(dir, f), 'utf8'));
        if (f.slice(0, -3) > fire && dati.canale === 'telefono' && ora() - new Date(dati.registrato) < 4 * 60e3)
          return { codice: 4, messaggio: `non tocca a te: c'è ${f.slice(0, -3)}` };
      }
    }
    const fine = Date.now() + (aspetta ?? ASPETTA[ciclo] ?? 30) * 60e3;
    for (;;) {
      const l = leggi();
      if (!l || ora() - new Date(l.ora) >= SCADENZA) {
        const storia = prova('rev-parse', '-q', '--verify', 'HEAD') ? git('log', '--format=%s', '-200') : '';
        const visti = [...storia.matchAll(/gettone (\d+)/g)].map((m) => +m[1]);
        const gettone = Math.max(0, l?.gettone || 0, ...visti) + 1;
        scrivi({ sessione, ciclo, ora: iso(), gettone });
        if (spingi(`lucchetto: prende ${ciclo} (gettone ${gettone})`)) {
          writeFileSync(statoF, JSON.stringify({ sessione, gettone }));
          return { codice: 0, messaggio: `preso (gettone ${gettone})` };
        }
        continue; // un altro ha spinto prima: si rilegge
      }
      if (Date.now() >= fine) return { codice: 3, messaggio: `occupato da ${l.sessione} (${l.ciclo}, ${l.ora})` };
      dorme(60); pull();
    }
  }
  pull();
  const l = leggi();
  if (!nostro(l)) return { codice: 3, messaggio: `il lucchetto non è più tuo${l ? ` (è di ${l.sessione}, gettone ${l.gettone})` : ''}: abbandona senza spingere` };
  if (azione === 'rinnova') {
    scrivi({ ...l, ora: iso() });
    return spingi(`lucchetto: rinnova (gettone ${l.gettone})`) ? { codice: 0, messaggio: 'rinnovato' } : { codice: 3, messaggio: 'push rifiutato' };
  }
  if (azione === 'lascia') {
    if (!prova('rm', '-q', '--cached', FILE)) rmSync(join(radice, FILE), { force: true });
    rmSync(join(radice, FILE), { force: true }); rmSync(statoF, { force: true });
    return { codice: 0, messaggio: 'lasciato: il file è tolto, va nel commit del lavoro' };
  }
  throw new Error(`azione sconosciuta: ${azione}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [azione, ...argv] = process.argv.slice(2), o = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--senza-push') o.senzaPush = true;
    else if (['--ciclo', '--fire', '--aspetta', '--radice'].includes(argv[i])) o[argv[i].slice(2)] = argv[++i];
    else { console.log(`ERRORE argomento sconosciuto: ${argv[i]}`); process.exit(1); }
  }
  if (o.aspetta !== undefined) o.aspetta = Number(o.aspetta);
  try {
    const e = lucchetto(azione, o);
    console.log(e.messaggio);
    process.exit(e.codice);
  } catch (err) { console.log(`ERRORE lucchetto: ${err.message}`); process.exit(1); }
}
