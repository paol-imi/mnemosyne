// lucchetto.mjs: una sola sessione lavora (modello §8.1).
// node scripts/lucchetto.mjs prendi|rinnova|lascia [--ciclo NOME] [--fire ID] [--aspetta MINUTI] [--radice DIR]
// Uscita: 0 preso / rinnovato / lasciato; 3 occupato, o il lucchetto non è più tuo (abbandona senza spingere);
// 4 "non tocca a te" (un memo del telefono più recente e fresco: lo elabora la sua sessione); 1 errore.
// `ingresso/.in-corso` porta sessione, ciclo, ora e gettone (il precedente + 1, letto dai commit del lucchetto).
// La sessione ricorda id e gettone in .git/lucchetto (fuori dal repository); il suo id è ATLANTE_SESSIONE, se c'è.
// Senza il remoto `origin` lavora in locale (niente pull né push) e lo dice. L'ora viene solo da ora.mjs, anche per
// le date dei commit quando c'è ATLANTE_ORA. LUCCHETTO_ATTESA: i secondi dell'attesa iniziale (90); LUCCHETTO_PASSO: i
// secondi tra due controlli mentre aspetta (60). `lascia` toglie il file dall'indice: il commit e il push sono del lavoro.
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { parse } from 'yaml';
import { ora, iso } from './ora.mjs';

const SCADENZA = 20 * 60e3, FRESCO = 4 * 60e3, FILE = 'ingresso/.in-corso';
const ASPETTA = { smista: 45, consolida: 30, ritratto: 30, specchio: 0 }; // minuti di attesa di un lucchetto preso
const MEMO = /^(\d{8}-\d{4}-[a-z0-9]{3,4})\.md$/;
const dorme = (s) => s > 0 && Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, s * 1000);
const secondi = (nome, predefinito) => {
  const v = Number(process.env[nome] ?? predefinito);
  if (!Number.isFinite(v) || v < 0) throw new Error(`${nome} non è un numero di secondi: ${process.env[nome]}`);
  return v;
};

function registrato(testo) {
  const m = /^---\n([\s\S]*?)\n---/.exec(testo);
  try { return m ? parse(m[1]) ?? {} : {}; } catch { return {}; }
}

export function lucchetto(azione, { radice = process.cwd(), ciclo = 'smista', fire, aspetta } = {}) {
  if (!['prendi', 'rinnova', 'lascia'].includes(azione)) throw new Error(`azione sconosciuta: ${azione ?? '(nessuna)'}`);
  radice = resolve(radice);
  const env = { ...process.env };
  if (process.env.ATLANTE_ORA) env.GIT_AUTHOR_DATE = env.GIT_COMMITTER_DATE = iso();
  const git = (...a) => execFileSync('git', a, { cwd: radice, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const prova = (...a) => { try { git(...a); return true; } catch { return false; } };
  const remoto = prova('remote', 'get-url', 'origin');
  const ramo = git('rev-parse', '--abbrev-ref', 'HEAD').trim();
  const pull = () => remoto && prova('pull', '-q', '--rebase', '--autostash', 'origin', ramo);
  const statoF = resolve(radice, git('rev-parse', '--git-dir').trim(), 'lucchetto');
  const mio = existsSync(statoF) ? JSON.parse(readFileSync(statoF, 'utf8')) : {};
  const sessione = process.env.ATLANTE_SESSIONE || mio.sessione || `s-${randomBytes(4).toString('hex')}`;
  const dove = remoto ? '' : ' (in locale: nessun remoto origin, niente pull né push)';
  const esito = (codice, messaggio) => ({ codice, messaggio: messaggio + dove });
  const percorso = join(radice, FILE);

  const leggi = () => {
    if (!existsSync(percorso)) return null;
    const d = registrato(`---\n${readFileSync(percorso, 'utf8')}\n---`);
    return { sessione: String(d.sessione ?? ''), ciclo: String(d.ciclo ?? ''), ora: String(d.ora ?? ''), gettone: Number(d.gettone) || 0 };
  };
  const scrivi = (l) => writeFileSync(percorso, `sessione: ${l.sessione}\nciclo: ${l.ciclo}\nora: ${l.ora}\ngettone: ${l.gettone}\n`);
  const nostro = (l) => l && l.sessione === sessione && mio.sessione === sessione && l.gettone === mio.gettone;
  const scaduto = (l) => !(ora() - new Date(l.ora) < SCADENZA); // anche un'ora illeggibile vale come scaduta
  // Commit del solo .in-corso e push: il push è l'arbitro. Se è rifiutato, il commit si annulla e si fa pull.
  const spingi = (msg) => {
    const cera = prova('cat-file', '-e', `HEAD:${FILE}`);
    git('add', '-f', '--', FILE);
    git('commit', '-q', '--no-verify', '-m', msg, '--', FILE);
    if (!remoto || prova('push', '-q', 'origin', `HEAD:${ramo}`)) return true;
    git('reset', '-q', '--soft', 'HEAD~1');
    if (cera) git('checkout', '-q', 'HEAD', '--', FILE);
    else { git('rm', '-q', '--cached', '--', FILE); rmSync(percorso, { force: true }); }
    pull();
    return false;
  };

  if (azione === 'prendi') {
    if (ciclo !== 'specchio') dorme(secondi('LUCCHETTO_ATTESA', 90)); // §8.1 passo 1; Specchio non aspetta
    pull();
    if (fire && ciclo !== 'specchio') { // §8.1 passo 2 (V1): un memo del telefono più recente e con meno di 4 minuti
      const dir = join(radice, 'ingresso');
      const nomi = existsSync(dir) ? readdirSync(dir).filter((f) => MEMO.test(f)) : [];
      const proprio = nomi.find((f) => f === `${fire}.md`);
      const mioIstante = proprio ? new Date(registrato(readFileSync(join(dir, proprio), 'utf8')).registrato ?? NaN) : null;
      for (const f of nomi) {
        if (f === proprio) continue;
        const d = registrato(readFileSync(join(dir, f), 'utf8')), t = new Date(d.registrato ?? NaN);
        const dopo = mioIstante && !isNaN(mioIstante) && !isNaN(t) ? t > mioIstante : MEMO.exec(f)[1] > fire;
        if (dopo && d.canale === 'telefono' && ora() - t < FRESCO)
          return esito(4, `non tocca a te: c'è ${MEMO.exec(f)[1]}, più recente`);
      }
    }
    const minuti = aspetta ?? ASPETTA[ciclo] ?? 30, passo = secondi('LUCCHETTO_PASSO', 60) || 60;
    let giri = Math.ceil((minuti * 60) / passo), rifiuti = 0;
    for (;;) {
      const l = leggi();
      if (nostro(l)) return esito(0, `già tuo (gettone ${l.gettone})`);
      if (!l || scaduto(l)) {
        const storia = prova('rev-parse', '-q', '--verify', 'HEAD') ? git('log', '--format=%s', '--', FILE) : '';
        const visti = [...storia.matchAll(/gettone (\d+)/g)].map((m) => Number(m[1]));
        const gettone = Math.max(0, l?.gettone ?? 0, ...visti) + 1;
        scrivi({ sessione, ciclo, ora: iso(), gettone });
        if (spingi(`lucchetto: prende ${ciclo} (gettone ${gettone})`)) {
          writeFileSync(statoF, JSON.stringify({ sessione, gettone }));
          return esito(0, `preso (gettone ${gettone}${l ? `, quello di ${l.sessione} era scaduto` : ''})`);
        }
        if (++rifiuti >= 5) return esito(3, 'push rifiutato 5 volte: occupato');
        continue; // un altro ha spinto prima: si rilegge il lucchetto dopo il pull
      }
      if (giri-- <= 0) return esito(3, `occupato da ${l.sessione} (${l.ciclo}, dalle ${l.ora}, gettone ${l.gettone})`);
      dorme(passo); pull();
    }
  }

  // rinnova e lascia: il fencing (§8.1 passo 4), dopo il pull.
  pull();
  const l = leggi();
  if (!nostro(l)) {
    return esito(3, `il lucchetto non è più tuo${l ? ` (è di ${l.sessione}, gettone ${l.gettone})` : ' (non c\'è)'}: abbandona senza spingere`);
  }
  if (azione === 'rinnova') {
    for (let i = 0; i < 2; i++) {
      scrivi({ ...l, ora: iso() });
      if (spingi(`lucchetto: rinnova (gettone ${l.gettone})`)) return esito(0, `rinnovato (gettone ${l.gettone})`);
      if (!nostro(leggi())) return esito(3, 'il lucchetto non è più tuo: abbandona senza spingere');
    }
    return esito(3, 'push del rinnovo rifiutato due volte: abbandona senza spingere');
  }
  prova('rm', '-q', '--cached', '--', FILE); // se non era nell'indice, basta toglierlo dal disco
  rmSync(percorso, { force: true });
  rmSync(statoF, { force: true });
  return esito(0, `lasciato (gettone ${l.gettone}): il file è tolto dall'indice, va nel commit del lavoro`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [azione, ...argv] = process.argv.slice(2), o = {};
  try {
    for (let i = 0; i < argv.length; i++) {
      const k = argv[i].slice(2);
      if (!['--ciclo', '--fire', '--aspetta', '--radice'].includes(argv[i]) || argv[i + 1] === undefined)
        throw new Error(`argomento sconosciuto o senza valore: ${argv[i]}`);
      o[k] = argv[++i];
    }
    if (o.aspetta !== undefined) {
      o.aspetta = Number(o.aspetta);
      if (!Number.isFinite(o.aspetta) || o.aspetta < 0) throw new Error('--aspetta vuole i minuti');
    }
    const e = lucchetto(azione, o);
    console.log(e.messaggio);
    process.exit(e.codice);
  } catch (err) { console.log(`ERRORE lucchetto: ${err.message}`); process.exit(1); }
}
