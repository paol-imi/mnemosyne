// lucchetto.mjs: una sola sessione lavora (modello §8.1; piano blocco 5).
// node scripts/lucchetto.mjs prendi|rinnova|lascia [--ciclo NOME] [--fire ID] [--aspetta SECONDI]
//                            [--sessione ID --gettone N] [--radice DIR]
// Uscita: 0 preso / rinnovato / lasciato; 3 occupato, o il lucchetto non è più tuo (abbandona senza spingere);
// 4 "non tocca a te" (solo con --fire: in ingresso/ un memo del telefono più recente del tuo e con meno di 4 minuti);
// 1 errore.
// `ingresso/.in-corso` (YAML) porta ciclo, sessione, ora e gettone. Il gettone è il massimo che compare nella storia git
// di quel file (anche dopo un `lascia` che l'ha cancellato) + 1. La sessione sono 8 caratteri [a-z0-9] scelti da
// `prendi`, che li stampa con il gettone e li ricorda in .git/lucchetto (fuori dal repository): `rinnova` e `lascia`
// li prendono da --sessione/--gettone e, se mancano, da lì (i prompt li chiamano senza argomenti).
// Tempi in secondi (§8.1). Solo una sessione con --fire aspetta 90 s prima del pull (LUCCHETTO_ATTESA, per i test);
// Specchio, la passata e le Routine a orario no. Un lucchetto preso si aspetta fino a --aspetta secondi (di serie:
// smista 2700, consolida e ritratto 1800, gli altri 0), con un pull ogni LUCCHETTO_PASSO secondi (60). Scade dopo 20
// minuti. Fencing (passo 4): dopo il pull e prima di ogni push, il file deve portare ancora la propria sessione e il
// proprio gettone. Senza il remoto `origin` (i rami del banco) pull e push si saltano, con un avviso. L'ora viene solo
// da ora.mjs, anche per le date dei commit quando c'è ATLANTE_ORA. `lascia` toglie il file (anche dall'indice): il
// commit e il push sono quelli del lavoro (§8.1 passo 6).
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { parse } from 'yaml';
import { ora, iso } from './ora.mjs';

const SCADENZA = 20 * 60e3, FRESCO = 4 * 60e3, FILE = 'ingresso/.in-corso';
const ASPETTA = { smista: 2700, consolida: 1800, ritratto: 1800 }; // secondi di attesa di un lucchetto preso
const MEMO = /^(\d{8}-\d{4}-[a-z0-9]{3,4})\.md$/;
const dorme = (s) => s > 0 && Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, s * 1000);
const secondi = (nome, predefinito) => {
  const v = Number(process.env[nome] ?? predefinito);
  if (!Number.isFinite(v) || v < 0) throw new Error(`${nome} non è un numero di secondi: ${process.env[nome]}`);
  return v;
};
const nuovaSessione = () => [...randomBytes(8)].map((b) => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');

function yaml(testo) {
  try { const d = parse(testo); return d && typeof d === 'object' ? d : {}; } catch { return {}; }
}
const frontmatter = (testo) => { const m = /^---\n([\s\S]*?)\n---/.exec(testo); return m ? yaml(m[1]) : {}; };

export function lucchetto(azione, { radice = process.cwd(), ciclo, fire, aspetta, sessione, gettone } = {}) {
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
  const percorso = join(radice, FILE);
  const avviso = remoto ? '' : '\navviso: nessun remoto origin (ramo del banco?): pull e push saltati';
  const esito = (codice, messaggio) => ({ codice, messaggio: messaggio + avviso });

  const leggi = () => {
    if (!existsSync(percorso)) return null;
    const d = yaml(readFileSync(percorso, 'utf8'));
    return { ciclo: String(d.ciclo ?? ''), sessione: String(d.sessione ?? ''), ora: String(d.ora ?? ''), gettone: Number(d.gettone) || 0 };
  };
  const scrivi = (l) => {
    mkdirSync(join(radice, 'ingresso'), { recursive: true });
    writeFileSync(percorso, `ciclo: ${l.ciclo}\nsessione: ${l.sessione}\nora: ${l.ora}\ngettone: ${l.gettone}\n`);
  };
  const scaduto = (l) => !(ora() - new Date(l.ora) < SCADENZA); // anche un'ora illeggibile vale come scaduta
  const di = (l, id) => !!l && !!id && l.sessione === id.sessione && l.gettone === id.gettone;
  // Il fencing sul remoto, subito prima del push: il lucchetto di origin è ancora `id` (o non c'è ancora il ramo)?
  const remotoTuo = (id) => {
    if (!remoto || !prova('fetch', '-q', 'origin', ramo)) return true;
    let t;
    try { t = git('show', `FETCH_HEAD:${FILE}`); } catch { return false; }
    const d = yaml(t);
    return String(d.sessione ?? '') === id.sessione && Number(d.gettone) === id.gettone;
  };
  // Commit del solo .in-corso e push: il push è l'arbitro. Se è rifiutato, il commit si annulla e si fa pull.
  const spingi = (msg, id, fencing) => {
    const cera = prova('cat-file', '-e', `HEAD:${FILE}`);
    git('add', '-f', '--', FILE);
    git('commit', '-q', '--no-verify', '-m', msg, '--', FILE);
    if (!remoto) return 'spinto';
    if (fencing && !remotoTuo(id)) { annulla(cera); pull(); return 'non tuo'; }
    if (prova('push', '-q', 'origin', `HEAD:${ramo}`)) return 'spinto';
    annulla(cera); pull();
    return 'rifiutato';
  };
  const annulla = (cera) => {
    git('reset', '-q', '--soft', 'HEAD~1');
    if (cera) git('checkout', '-q', 'HEAD', '--', FILE);
    else { git('rm', '-q', '--cached', '--', FILE); rmSync(percorso, { force: true }); }
  };
  const ricordato = () => { try { return JSON.parse(readFileSync(statoF, 'utf8')); } catch { return null; } };

  if (azione === 'prendi') {
    if (!ciclo) throw new Error('prendi vuole --ciclo NOME');
    if (fire) dorme(secondi('LUCCHETTO_ATTESA', 90)); // §8.1 passo 1: solo le sessioni nate da un fire
    pull();
    if (fire) { // §8.1 passo 2 (V1): un memo del telefono più recente del fire e con meno di 4 minuti
      const dir = join(radice, 'ingresso');
      const nomi = existsSync(dir) ? readdirSync(dir).filter((f) => MEMO.test(f)) : [];
      const proprio = nomi.includes(`${fire}.md`) ? new Date(frontmatter(readFileSync(join(dir, `${fire}.md`), 'utf8')).registrato ?? NaN) : null;
      for (const f of nomi) {
        if (f === `${fire}.md`) continue;
        const d = frontmatter(readFileSync(join(dir, f), 'utf8')), t = new Date(d.registrato ?? NaN);
        if (d.canale !== 'telefono' || isNaN(t)) continue;
        const dopo = proprio && !isNaN(proprio) ? t > proprio : MEMO.exec(f)[1] > fire;
        if (dopo && ora() - t < FRESCO) return esito(4, `non tocca a te: c'è ${MEMO.exec(f)[1]}, più recente e di meno di 4 minuti`);
      }
    }
    const attesa = aspetta ?? ASPETTA[ciclo] ?? 0, passo = secondi('LUCCHETTO_PASSO', 60) || 60;
    const fine = Date.now() + attesa * 1000;
    const mio = ricordato();
    let rifiuti = 0;
    for (;;) {
      const l = leggi();
      if (di(l, mio)) return esito(0, `già tuo\nsessione: ${l.sessione}\ngettone: ${l.gettone}`);
      if (!l || scaduto(l)) {
        const storia = prova('rev-parse', '-q', '--verify', 'HEAD') ? git('log', '-p', '--format=', '--', FILE) : '';
        const visti = [...storia.matchAll(/^[+-]gettone:\s*(\d+)/gm)].map((m) => Number(m[1]));
        const id = { sessione: nuovaSessione(), gettone: Math.max(0, l?.gettone ?? 0, ...visti) + 1 };
        scrivi({ ciclo, ...id, ora: iso() });
        if (spingi(`lucchetto: prende ${ciclo} (gettone ${id.gettone})`, id, false) === 'spinto') {
          writeFileSync(statoF, JSON.stringify({ ...id, ciclo }));
          return esito(0, `preso${l ? ` (quello di ${l.sessione}, gettone ${l.gettone}, era scaduto)` : ''}\nsessione: ${id.sessione}\ngettone: ${id.gettone}`);
        }
        if (++rifiuti >= 5) return esito(3, 'push rifiutato 5 volte: occupato');
        continue; // un altro ha spinto prima: dopo il pull si rilegge il lucchetto
      }
      if (Date.now() + passo * 1000 > fine) return esito(3, `occupato da ${l.sessione} (${l.ciclo}, dalle ${l.ora}, gettone ${l.gettone})`);
      dorme(passo); pull();
    }
  }

  // rinnova e lascia: chi sono (dagli argomenti o da .git/lucchetto), poi il fencing dopo il pull (§8.1 passo 4).
  const id = sessione !== undefined || gettone !== undefined ? { sessione: String(sessione ?? ''), gettone: Number(gettone) } : ricordato();
  if (!id?.sessione || !Number.isInteger(id.gettone)) return esito(3, 'nessun lucchetto tuo (né --sessione/--gettone né .git/lucchetto): abbandona senza spingere');
  pull();
  const l = leggi();
  const nonTuo = (x) => esito(3, `il lucchetto non è più tuo${x ? ` (è di ${x.sessione}, gettone ${x.gettone})` : ' (non c\'è)'}: abbandona senza spingere`);
  if (!di(l, id)) return nonTuo(l);
  if (azione === 'rinnova') {
    for (let i = 0; i < 2; i++) {
      scrivi({ ...l, ora: iso() });
      const r = spingi(`lucchetto: rinnova (gettone ${id.gettone})`, id, true);
      if (r === 'spinto') return esito(0, `rinnovato\nsessione: ${id.sessione}\ngettone: ${id.gettone}`);
      if (r === 'non tuo' || !di(leggi(), id)) return nonTuo(leggi());
    }
    return esito(3, 'push del rinnovo rifiutato due volte: abbandona senza spingere');
  }
  if (!prova('rm', '-q', '-f', '--', FILE)) rmSync(percorso, { force: true }); // se non era nell'indice, basta il disco
  rmSync(statoF, { force: true });
  return esito(0, `lasciato (gettone ${id.gettone}): il file è tolto, va nel commit del lavoro, con il push`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [azione, ...argv] = process.argv.slice(2), o = {};
  try {
    for (let i = 0; i < argv.length; i++) {
      if (!['--ciclo', '--fire', '--aspetta', '--sessione', '--gettone', '--radice'].includes(argv[i]) || argv[i + 1] === undefined)
        throw new Error(`argomento sconosciuto o senza valore: ${argv[i]}`);
      o[argv[i].slice(2)] = argv[++i];
    }
    if (o.aspetta !== undefined) {
      o.aspetta = Number(o.aspetta);
      if (!Number.isFinite(o.aspetta) || o.aspetta < 0) throw new Error('--aspetta vuole i secondi');
    }
    if (o.gettone !== undefined && !/^\d+$/.test(o.gettone)) throw new Error('--gettone vuole un numero');
    const e = lucchetto(azione, o);
    console.log(e.messaggio);
    process.exit(e.codice);
  } catch (err) { console.log(`ERRORE lucchetto: ${err.message}`); process.exit(1); }
}
