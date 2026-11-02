// Blocco 3: il file che scrive il Comando rapido "Memo" (e "Chiedi") passa lo schema del frammento (modello §3.2, §3.7)
// e torna intatto dal Base64 (banco G1). `componi` rifà in JS la ricetta di telefono/memo-ios.md (azioni 2-19) usando i
// modelli scritti nella ricetta stessa; lo script Android di telefono/http-shortcuts.json si esegue davvero, in una vm;
// scripts/simula-memo.mjs (il memo del banco finché P3 non ha esito) scrive lo stesso byte, e committa con la data del caso.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';
import { componi as simulaComponi } from '../scripts/simula-memo.mjs';

process.env.TZ = 'Europe/Rome'; // il fuso del telefono, per lo script Android (Date locale)

const RADICE = new URL('../', import.meta.url).pathname;
const leggi = (p) => readFileSync(join(RADICE, p), 'utf8');
const schema = JSON.parse(leggi('schema/frontmatter.json'));
const ajv = new Ajv2020({ allErrors: true, strictTypes: false }).addSchema(schema);
const frammento = ajv.getSchema(`${schema.$id}#/$defs/frammento`);
const IDF = /^\d{8}-\d{4}-[a-z0-9]{4}$/;
const URL_PUT = 'https://api.github.com/repos/paol-imi/mnemosyne/contents/ingresso/';

// Come lo legge "smista": il frontmatter fino al primo "---" dopo l'apertura (YAML 1.2 core: le ore restano stringhe);
// il resto, dopo quell'a capo, è il corpo esatto. (Locale al test: scripts/verifica.mjs è di un altro blocco.)
function frontmatter(testo) {
  const m = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(testo);
  assert.ok(m, 'frontmatter mancante');
  return { dati: parse(m[1]) ?? {}, corpo: testo.slice(m[0].length) };
}

// I modelli del file come stanno nelle ricette (il blocco ```text dopo <!-- modello: … -->).
function modello(ricetta, nome) {
  const t = leggi(`telefono/${ricetta}`);
  const m = new RegExp(`<!-- modello: ${nome} -->\\n\`\`\`text\\n([\\s\\S]*?)\\n\`\`\``).exec(t);
  assert.ok(m, `${ricetta}: manca il modello "${nome}"`);
  return m[1];
}
const MODELLI = {
  semplice: modello('memo-ios.md', 'senza allegati'),
  allegati: modello('memo-ios.md', 'con allegati'),
  chiedi: modello('chiedi-ios.md', 'chiedi'),
};

// Azioni 3-4: "Formatta data" yyyyMMdd-HHmm e yyyy-MM-dd'T'HH:mm:ssZZZZZ, nel fuso del telefono.
function formatta(d, fuso) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: fuso, hourCycle: 'h23', year: 'numeric', month: '2-digit',
    day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  const scarto = Math.round((Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(d / 1000) * 1000) / 60000);
  const due = (n) => String(n).padStart(2, '0');
  const z = scarto === 0 ? 'Z' : `${scarto < 0 ? '-' : '+'}${due(Math.floor(Math.abs(scarto) / 60))}:${due(Math.abs(scarto) % 60)}`;
  return { giornoora: `${p.year}${p.month}${p.day}-${p.hour}${p.minute}`,
    registrato: `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${z}` };
}

// La ricetta: id, nomi degli allegati (azione 11), frontmatter dal modello, corpo esatto, Base64, i PUT.
function componi({ testo = '', adesso = new Date('2026-11-03T22:40:12Z'), fuso = 'Europe/Rome', xxxx = 'k7q2',
  allegati: est = [], chiedi = false } = {}) {
  const { giornoora, registrato } = formatta(adesso, fuso);
  const id = `${giornoora}-${xxxx}`;
  const allegati = est.map((e, i) => (i === 0 ? `${id}.${e.toLowerCase()}` : `${id}-${i + 1}.${e.toLowerCase()}`));
  const m = chiedi ? MODELLI.chiedi : allegati.length ? MODELLI.allegati : MODELLI.semplice;
  // Una sostituzione sola, in un passo: un "{testo}" scritto dall'utente resta com'è.
  const vals = { registrato, elenco: allegati.join(', '), testo };
  const file = m.replace(/\{(registrato|elenco|testo)\}/g, (_, k) => vals[k]);
  const put = (nome, b64, msg) => ({ url: `${URL_PUT}${nome}`, corpo: { message: msg, content: b64 } });
  const richieste = [
    ...allegati.map((n) => put(n, Buffer.from(`binario ${n}`).toString('base64'), `memo ${id} allegato`)),
    put(`${id}.md`, Buffer.from(file, 'utf8').toString('base64'), `${chiedi ? 'chiedi' : 'memo'} ${id}`),
  ];
  return { id, file, allegati, richieste };
}

// Come lo vedrà "smista": decodifica il Base64 dell'ultimo PUT (il .md), legge il frontmatter, valida il frammento.
function arrivato(c) {
  const ultimo = c.richieste.at(-1);
  assert.equal(ultimo.url, `${URL_PUT}${c.id}.md`);
  const testo = Buffer.from(ultimo.corpo.content, 'base64').toString('utf8');
  const { dati, corpo } = frontmatter(testo);
  return { testo, dati, corpo, valido: frammento(dati), errori: frammento.errors };
}

const TESTI = {
  accenti: 'perché è così? 🌊🫠 l\'ospite inquietante\n\nnn so\n  — Cioran, «chioran»\t✦ àèéìòù ÀÈ ñ ß 中文 👨‍👩‍👧',
  link: 'https://open.spotify.com/track/0abc?si=12ef34&t=42#x',
  b18: 'boh niente volevo solo scrivere qualcosa',
  yaml: 'canale: chat\nregistrato: ieri\nintento: [sguardo]\n"virgolette" e \'apici\': due punti: {graffe} [quadre] # cancelletto & * ! | > %',
  trattini: '---\nprima riga dopo un ---\n---\nregistrato: 2020-01-01\n---\n\nfine ---',
  graffe: 'scrivo {testo} e {registrato} alla lettera',
  finale: 'a capo in fondo\n\n',
};

test('i modelli delle ricette: solo campi del Comando rapido nel frontmatter, il testo nel corpo', () => {
  assert.equal(MODELLI.semplice, '---\nregistrato: {registrato}\ncanale: telefono\n---\n{testo}');
  assert.equal(MODELLI.allegati, '---\nregistrato: {registrato}\ncanale: telefono\nallegati: [{elenco}]\n---\n{testo}');
  assert.equal(MODELLI.chiedi, '---\nregistrato: {registrato}\ncanale: telefono\nintento: [chiedi]\n---\n{testo}');
});

test('ogni testo (accenti, emoji, a capo, link, YAML finto, "---") valida e torna identico dal Base64', () => {
  for (const [nome, testo] of Object.entries(TESTI)) {
    const c = componi({ testo });
    assert.equal(c.id, '20261103-2340-k7q2');
    const a = arrivato(c);
    assert.ok(a.valido, `${nome}: ${JSON.stringify(a.errori)}`);
    assert.equal(a.testo, c.file, nome);
    assert.deepEqual(a.dati, { registrato: '2026-11-03T23:40:12+01:00', canale: 'telefono' }, `${nome}: frontmatter toccato dal testo`);
    assert.equal(a.corpo, testo, `${nome}: corpo non uguale byte per byte (G1)`);
    assert.doesNotMatch(c.richieste[0].corpo.content, /\s/, 'Base64 senza interruzioni di riga');
  }
});

test('B18 e il messaggio davvero vuoto: un file comunque, e valida (anche se iOS toglie l\'a capo finale)', () => {
  for (const testo of [TESTI.b18, '']) {
    const c = componi({ testo });
    assert.ok(c.richieste.at(-1).corpo.content.length > 0);
    const a = arrivato(c);
    assert.ok(a.valido, JSON.stringify(a.errori));
    assert.equal(a.corpo, testo);
  }
  assert.equal(componi().file, '---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---\n');
  const senzaCapo = frontmatter('---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---');
  assert.ok(frammento(senzaCapo.dati));
  assert.equal(senzaCapo.corpo, '');
});

test('il fuso: ora legale, cambio d\'anno, telefono in UTC o in viaggio; id e registrato dallo stesso istante', () => {
  const casi = [
    [new Date('2026-07-01T21:59:59Z'), 'Europe/Rome', '20260701-2359', '2026-07-01T23:59:59+02:00'],
    [new Date('2026-12-31T23:30:00Z'), 'Europe/Rome', '20270101-0030', '2027-01-01T00:30:00+01:00'], // yyyy, non YYYY
    [new Date('2026-12-28T10:00:00Z'), 'Europe/Rome', '20261228-1100', '2026-12-28T11:00:00+01:00'], // la settimana ISO 1 del 2027
    [new Date('2026-11-03T22:40:12Z'), 'UTC', '20261103-2240', '2026-11-03T22:40:12Z'],
    [new Date('2026-11-03T22:40:12Z'), 'America/New_York', '20261103-1740', '2026-11-03T17:40:12-05:00'],
    [new Date('2026-11-03T22:40:12Z'), 'Asia/Kolkata', '20261104-0410', '2026-11-04T04:10:12+05:30'],
  ];
  for (const [adesso, fuso, giornoora, registrato] of casi) {
    const c = componi({ adesso, fuso });
    assert.equal(c.id, `${giornoora}-k7q2`, fuso);
    const a = arrivato(c);
    assert.equal(a.dati.registrato, registrato);
    assert.ok(a.valido, JSON.stringify(a.errori));
  }
});

test('foto e vocale: un PUT per allegato, prima del .md, accanto in ingresso/; la riga allegati valida', () => {
  for (const est of [['jpg'], ['HEIC'], ['m4a'], ['jpeg', 'png', 'webp']]) {
    const c = componi({ testo: 'questa', allegati: est });
    assert.equal(c.richieste.length, est.length + 1);
    assert.equal(c.allegati[0], `${c.id}.${est[0].toLowerCase()}`);
    if (est.length > 1) assert.equal(c.allegati[1], `${c.id}-2.png`);
    c.richieste.slice(0, -1).forEach((r, i) => assert.equal(r.url, `${URL_PUT}${c.allegati[i]}`));
    const a = arrivato(c);
    assert.ok(a.valido, JSON.stringify(a.errori));
    assert.deepEqual(a.dati.allegati, c.allegati);
    assert.equal(a.corpo, 'questa');
  }
});

test('lo schema scarta ciò che la ricetta non deve scrivere', () => {
  const base = { registrato: '2026-11-03T23:40:12+01:00', canale: 'telefono' };
  assert.equal(frammento(base), true);
  assert.equal(frammento({ ...base, registrato: '2026-11-03T23:40:12' }), false, 'senza fuso');
  assert.equal(frammento({ ...base, registrato: '2026-11-03' }), false, 'senza ora');
  assert.equal(frammento({ ...base, forma: 'riportata' }), false, 'forma sul telefono');
  assert.equal(frammento({ ...base, intento: 'chiedi' }), false, 'intento non lista');
  assert.equal(frammento({ ...base, allegati: ['20261103-2340-k7q2.mov'] }), false, 'formato fuori schema');
  assert.equal(frammento({ ...base, allegati: ['20261103-2340-k7q2.HEIC'] }), false, 'estensione maiuscola');
  assert.equal(frammento({ ...base, titolo: 'x' }), false, 'campo in più');
});

test('"Chiedi": lo stesso file di "Memo" più intento: [chiedi] (sempre una lista), e valida', () => {
  for (const testo of ['chi ha scritto "l\'ospite inquietante": Nietzsche?', '']) {
    const memo = componi({ testo });
    const chiedi = componi({ testo, chiedi: true });
    assert.equal(chiedi.file.replace('intento: [chiedi]\n', ''), memo.file);
    assert.equal(chiedi.richieste.at(-1).corpo.message, `chiedi ${chiedi.id}`);
    const a = arrivato(chiedi);
    assert.ok(a.valido, JSON.stringify(a.errori));
    assert.deepEqual(a.dati.intento, ['chiedi']);
    assert.equal(a.corpo, testo);
  }
});

test('le ricette: URL, intestazione, Base64 senza a capo; nessun token dentro', () => {
  const ios = leggi('telefono/memo-ios.md');
  assert.ok(ios.includes(URL_PUT));
  assert.match(ios, /`Authorization` = `Bearer ` seguito da `token`/);
  assert.match(ios, /\*Interruzioni di riga\*: \*\*Nessuna\*\*/);
  assert.match(ios, /\*Metodo\*: \*\*PUT\*\*/);
  assert.match(ios, /BLOCCO 7, spento[\s\S]*claude_code\/routines\/<trig_ID>\/fire[\s\S]*text = \[id\][\s\S]*-->/);
  for (const nome of ['memo-ios.md', 'chiedi-ios.md', 'http-shortcuts.json']) {
    const t = leggi(`telefono/${nome}`);
    assert.doesNotMatch(t, /gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{10,}/, nome);
  }
  const j = JSON.parse(leggi('telefono/http-shortcuts.json'));
  for (const k of ['pat', 'fire']) assert.equal(j.variables.find((v) => v.key === k)?.value, '', k);
});

// Android: esegue il codice di http-shortcuts.json con le funzioni di HTTP Shortcuts finte e intercetta i PUT.
function eseguiAndroid(testo, { adesso = '2026-11-03T22:40:12Z', risposta = { status: 'success', response: { statusCode: 201 } } } = {}) {
  const j = JSON.parse(leggi('telefono/http-shortcuts.json'));
  const codice = j.categories.flatMap((c) => c.shortcuts).find((s) => s.name === 'Memo').codeOnPrepare;
  const richieste = [], avvisi = [], appunti = [];
  const variabili = { pat: 'PAT-FINTO', testo, fire: '' };
  class DataFissa extends Date { constructor(...a) { super(...(a.length ? a : [adesso])); } }
  vm.runInNewContext(codice, {
    Date: DataFissa, Math, String, JSON,
    getVariable: (k) => variabili[k],
    base64encode: (s) => Buffer.from(s, 'utf8').toString('base64'),
    sendHttpRequest: (url, o) => { richieste.push({ url, ...o }); return risposta; },
    showToast: (m) => avvisi.push(m), showDialog: (m) => avvisi.push(m), copyToClipboard: (t) => appunti.push(t),
  });
  return { richieste, avvisi, appunti };
}

test('Android: lo stesso file, lo stesso PUT, "Salvato"', () => {
  for (const testo of [...Object.values(TESTI), '']) {
    const { richieste, avvisi } = eseguiAndroid(testo);
    assert.equal(richieste.length, 1, 'solo il PUT: il fire è commentato');
    const r = richieste[0];
    assert.ok(r.url.startsWith(URL_PUT));
    const id = /ingresso\/(.+)\.md$/.exec(r.url)[1];
    assert.match(id, IDF);
    assert.equal(r.method, 'PUT');
    assert.equal(r.headers.Authorization, 'Bearer PAT-FINTO');
    const corpo = JSON.parse(r.body);
    assert.deepEqual(Object.keys(corpo), ['message', 'content']);
    assert.equal(corpo.message, `memo ${id}`);
    const a = arrivato({ id, richieste: [{ url: r.url, corpo }] });
    assert.ok(a.valido, JSON.stringify(a.errori));
    assert.equal(a.corpo, testo, 'corpo byte per byte (G1)');
    assert.equal(a.dati.registrato, '2026-11-03T23:40:12+01:00');
    assert.equal(id.slice(0, 13), '20261103-2340', 'id e registrato dallo stesso istante');
    assert.deepEqual(avvisi, ['Salvato']);
  }
  const estate = eseguiAndroid('x', { adesso: '2026-07-01T21:59:59Z' }).richieste[0];
  assert.match(estate.url, /ingresso\/20260701-2359-[a-z0-9]{4}\.md$/);
  assert.match(Buffer.from(JSON.parse(estate.body).content, 'base64').toString(), /^---\nregistrato: 2026-07-01T23:59:59\+02:00\n/);
});

test('Android: se il PUT fallisce, niente "Salvato" e il testo negli appunti', () => {
  const { avvisi, appunti } = eseguiAndroid('da non perdere', { risposta: { status: 'error', response: { statusCode: 401 } } });
  assert.deepEqual(appunti, ['da non perdere']);
  assert.equal(avvisi.length, 1);
  assert.match(avvisi[0], /^Non salvato \(401\)/);
});

// scripts/simula-memo.mjs: lo stesso byte della ricetta, e il commit con la data del caso.
const SIMULA = join(RADICE, 'scripts/simula-memo.mjs');
const git = (cwd, ...a) => execFileSync('git', a, { cwd, encoding: 'utf8' });
function repoFinto() {
  const dir = mkdtempSync(join(tmpdir(), 'simula-'));
  git(dir, 'init', '-q');
  git(dir, 'config', 'user.name', 'banco');
  git(dir, 'config', 'user.email', 'banco@example.invalid');
  git(dir, 'config', 'commit.gpgsign', 'false');
  return dir;
}

test('simula-memo: lo stesso byte della ricetta (Memo e Chiedi, ogni testo, anche vuoto)', () => {
  for (const testo of [...Object.values(TESTI), '']) {
    for (const chiedi of [false, true]) {
      const r = componi({ testo, chiedi });
      const s = simulaComponi({ ora: '2026-11-03T23:40:12+01:00', testo, xxxx: 'k7q2', intento: chiedi ? 'chiedi' : null });
      assert.equal(s.id, r.id);
      assert.equal(s.file, r.file, `${chiedi ? 'chiedi' : 'memo'}: ${JSON.stringify(testo)}`);
      assert.equal(s.messaggio, r.richieste.at(-1).corpo.message);
    }
  }
  // L'ora e il fuso del telefono come sono scritti nel caso (§3.1), come "Formatta data" con ZZZZZ.
  for (const [adesso, fuso, ora] of [
    [new Date('2026-07-01T21:59:59Z'), 'Europe/Rome', '2026-07-01T23:59:59+02:00'],
    [new Date('2026-11-03T22:40:12Z'), 'UTC', '2026-11-03T22:40:12Z'],
    [new Date('2026-11-03T22:40:12Z'), 'Asia/Kolkata', '2026-11-04T04:10:12+05:30'],
  ]) {
    assert.equal(simulaComponi({ ora, testo: 'x', xxxx: 'k7q2' }).file, componi({ testo: 'x', adesso, fuso }).file, ora);
  }
  assert.match(simulaComponi({ ora: '2026-11-03T23:40:12+01:00' }).id, IDF, 'xxxx casuali');
  assert.throws(() => simulaComponi({ ora: '2026-11-03T23:40:12' }), /fuso/);
  assert.throws(() => simulaComponi({ ora: '2026-11-03T23:40:12+01:00', intento: 'salva' }), /chiedi/);
});

test('simula-memo da riga di comando: file da FILE e da stdin byte per byte, --commit con la data del caso', () => {
  const dir = repoFinto();
  try {
    const ora = '2026-11-03T23:40:12+01:00';
    const f = join(dir, 'memo.txt');
    writeFileSync(f, TESTI.accenti, 'utf8');
    const id = execFileSync('node', [SIMULA, '--ora', ora, '--testo', f, '--xxxx', 'k7q2', '--radice', dir, '--commit'],
      { encoding: 'utf8' }).trim();
    assert.equal(id, '20261103-2340-k7q2');
    const scritto = readFileSync(join(dir, 'ingresso', `${id}.md`));
    assert.ok(scritto.equals(Buffer.from(componi({ testo: TESTI.accenti }).file, 'utf8')), 'byte per byte come la ricetta');
    const a = frontmatter(scritto.toString('utf8'));
    assert.ok(frammento(a.dati), JSON.stringify(frammento.errors));
    assert.equal(a.corpo, TESTI.accenti);
    assert.equal(git(dir, 'log', '-1', '--format=%aI|%cI|%s'), `${ora}|${ora}|memo ${id}\n`);
    assert.equal(git(dir, 'show', '--name-only', '--format=', 'HEAD').trim(), `ingresso/${id}.md`);
    assert.equal(git(dir, 'status', '--porcelain', '--', 'ingresso'), '');

    // B18 da stdin, "Chiedi", senza --commit: il file c'è, valido, e non è committato.
    const id2 = execFileSync('node', [SIMULA, '--ora', '2026-11-04T08:05:00+01:00', '--testo', '-', '--intento', 'chiedi',
      '--radice', dir], { input: TESTI.b18, encoding: 'utf8' }).trim();
    assert.match(id2, /^20261104-0805-[a-z0-9]{4}$/);
    const b = frontmatter(readFileSync(join(dir, 'ingresso', `${id2}.md`), 'utf8'));
    assert.ok(frammento(b.dati), JSON.stringify(frammento.errors));
    assert.deepEqual(b.dati, { registrato: '2026-11-04T08:05:00+01:00', canale: 'telefono', intento: ['chiedi'] });
    assert.equal(b.corpo, TESTI.b18);
    assert.match(git(dir, 'status', '--porcelain', '--', 'ingresso'), /^\?\? /);

    // Un id già usato non si sovrascrive (come il PUT senza sha: 422).
    assert.throws(() => execFileSync('node', [SIMULA, '--ora', ora, '--testo', f, '--xxxx', 'k7q2', '--radice', dir],
      { stdio: 'pipe' }), /esiste già/);
    assert.equal(readdirSync(join(dir, 'ingresso')).length, 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
