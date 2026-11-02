// Blocco 3: simula il Comando rapido "Memo" (o "Chiedi") finché P3 non ha un esito (piano, blocco 3).
// Scrive ingresso/<id>.md byte per byte come telefono/memo-ios.md (azioni 2-16; modelli §3.1, §3.2) e, con --commit,
// lo committa con la data del caso (GIT_AUTHOR_DATE = GIT_COMMITTER_DATE = --ora), messaggio "memo <id>" come il PUT.
//
//   node scripts/simula-memo.mjs --ora 2026-11-03T23:40:12+01:00 --testo memo.txt [--intento chiedi] [--commit]
//   echo -n "testo" | node scripts/simula-memo.mjs --ora … --testo -
// Opzioni di servizio: --xxxx k7q2 (i 4 caratteri, altrimenti casuali), --radice DIR (il repo, predefinito questo).
// Senza --ora vale ATLANTE_ORA (scripts/ora.mjs), letta nel fuso di Roma. Stampa l'id.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { randomInt } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { ora, iso } from './ora.mjs';

const ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;
const ALFABETO = 'abcdefghijklmnopqrstuvwxyz0123456789';

// L'ora del telefono come la scrive "Formatta data" (yyyyMMdd-HHmm e yyyy-MM-dd'T'HH:mm:ssZZZZZ): l'ora locale del caso
// e il suo fuso così come sono scritti (§3.1: l'ora e il fuso del telefono). Z resta Z, come con ZZZZZ in UTC.
export function istante(s) {
  const m = ISO.exec(s);
  if (!m) throw new Error(`--ora non è un'ora ISO 8601 con fuso: ${s}`);
  const [, a, me, g, h, mi, se = '00', z] = m;
  return { giornoora: `${a}${me}${g}-${h}${mi}`, registrato: `${a}-${me}-${g}T${h}:${mi}:${se}${z}` };
}

// Il file del Comando rapido: i modelli di telefono/memo-ios.md ("senza allegati") e telefono/chiedi-ios.md ("chiedi").
// Il testo va solo nel corpo, intatto (accenti, emoji, a capo, anche vuoto: B18); nessun a capo aggiunto in fondo.
export function componi({ ora: s, testo = '', intento = null, xxxx = null }) {
  const { giornoora, registrato } = istante(s);
  const x = xxxx ?? Array.from({ length: 4 }, () => ALFABETO[randomInt(ALFABETO.length)]).join('');
  if (!/^[a-z0-9]{4}$/.test(x)) throw new Error(`--xxxx: 4 caratteri [a-z0-9], non ${x}`);
  if (intento !== null && intento !== 'chiedi') throw new Error(`--intento: solo "chiedi" (lo scrive solo "Chiedi", §7.1)`);
  const id = `${giornoora}-${x}`;
  const righe = ['---', `registrato: ${registrato}`, 'canale: telefono'];
  if (intento) righe.push('intento: [chiedi]'); // sempre una lista (§3.2)
  const file = `${righe.join('\n')}\n---\n${testo}`;
  return { id, file, messaggio: `${intento ? 'chiedi' : 'memo'} ${id}` };
}

function argomenti(argv) {
  const o = { commit: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--commit') o.commit = true;
    else if (['--ora', '--testo', '--intento', '--xxxx', '--radice'].includes(a)) {
      if (i + 1 >= argv.length) throw new Error(`${a} vuole un valore`);
      o[a.slice(2)] = argv[++i];
    } else throw new Error(`argomento sconosciuto: ${a}`);
  }
  if (o.testo === undefined) throw new Error('manca --testo FILE|-');
  return o;
}

export function simula(o) {
  const radice = resolve(o.radice ?? fileURLToPath(new URL('../', import.meta.url)));
  const testo = (o.testo === '-' ? readFileSync(0) : readFileSync(o.testo)).toString('utf8');
  const s = o.ora ?? iso(ora());
  const c = componi({ ora: s, testo, intento: o.intento ?? null, xxxx: o.xxxx ?? null });
  const dir = join(radice, 'ingresso');
  const rel = `ingresso/${c.id}.md`;
  mkdirSync(dir, { recursive: true });
  // Come il PUT senza sha: un id già usato non sovrascrive niente (GitHub risponde 422).
  if (existsSync(join(radice, rel))) throw new Error(`${rel} esiste già (422)`);
  writeFileSync(join(radice, rel), c.file, 'utf8');
  if (o.commit) {
    const env = { ...process.env, GIT_AUTHOR_DATE: s, GIT_COMMITTER_DATE: s };
    execFileSync('git', ['add', '--', rel], { cwd: radice, env, stdio: 'pipe' });
    execFileSync('git', ['commit', '-q', '-m', c.messaggio, '--', rel], { cwd: radice, env, stdio: 'pipe' });
  }
  return { ...c, rel };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const r = simula(argomenti(process.argv.slice(2)));
    process.stdout.write(`${r.id}\n`);
  } catch (e) {
    process.stderr.write(`simula-memo: ${e.message}\n`);
    process.exit(1);
  }
}
