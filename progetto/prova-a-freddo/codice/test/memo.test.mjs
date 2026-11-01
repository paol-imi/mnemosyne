// Blocco 3: il file che scrive il Comando rapido "Memo" (e "Chiedi") passa lo schema del frammento.
// La funzione `componi` rifà in JS la ricetta di telefono/memo-ios.md (azioni 3-16); lo script Android si esegue davvero.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { validatore, validaFile, frontmatter } from '../scripts/schema.mjs';

const TEL = new URL('../telefono/', import.meta.url);
const IDF = /^\d{8}-\d{4}-[a-z0-9]{4}$/;

// Azioni 4-5: "Formatta data" personalizzato, nel fuso del telefono (qui fissato: Europe/Rome).
function formatta(d, fuso = 'Europe/Rome') {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: fuso, hourCycle: 'h23', year: 'numeric', month: '2-digit',
    day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  const scarto = Math.round((Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(d / 1000) * 1000) / 60000);
  const due = (n) => String(n).padStart(2, '0');
  const zzzzz = scarto === 0 ? 'Z' : `${scarto < 0 ? '-' : '+'}${due(Math.floor(Math.abs(scarto) / 60))}:${due(Math.abs(scarto) % 60)}`;
  return { giornoora: `${p.year}${p.month}${p.day}-${p.hour}${p.minute}`,
    registrato: `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${zzzzz}` };
}

// La ricetta: id, frontmatter (riga allegati facoltativa, intento solo per "Chiedi"), corpo esatto, Base64, corpo del PUT.
export function componi({ testo = '', adesso = new Date('2026-11-03T22:40:12Z'), xxxx = 'k7q2', allegato, chiedi = false } = {}) {
  const { giornoora, registrato } = formatta(adesso);
  const id = `${giornoora}-${xxxx}`;
  const allegati = allegato ? `allegati: [${id}.${allegato}]\n` : '';
  const file = `---\nregistrato: ${registrato}\ncanale: telefono\n${chiedi ? 'intento: chiedi\n' : ''}${allegati}---\n${testo}`;
  const corpo = { message: `${chiedi ? 'chiedi' : 'memo'} ${id}`, content: Buffer.from(file, 'utf8').toString('base64') };
  return { id, file, percorso: `ingresso/${id}.md`, corpo };
}

// Come lo vedrà "smista" dopo lo spostamento: decodifica il Base64 del PUT e valida come frammento.
function arrivato(corpo, id) {
  const testo = Buffer.from(corpo.content, 'base64').toString('utf8');
  return { testo, errori: validaFile(`frammenti/2026/11/${id}.md`, testo) };
}

test('testo con accenti, emoji e a capo: valida e torna identico dal Base64', () => {
  const testo = 'perché è così? 🌊🫠 l\'ospite inquietante\n\nnn so\n  — Cioran, «chioran»\t✦';
  const { id, file, corpo } = componi({ testo });
  assert.equal(id, '20261103-2340-k7q2');
  assert.equal(file, `---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---\n${testo}`);
  const { testo: t, errori } = arrivato(corpo, id);
  assert.deepEqual(errori, []);
  assert.equal(t, file);
  assert.equal(frontmatter(t).corpo, testo);
  assert.doesNotMatch(corpo.content, /\s/, 'Base64 senza interruzioni di riga');
});

test('un link (con parametri) resta intero', () => {
  const testo = 'https://open.spotify.com/track/0abc?si=12ef34';
  const { id, corpo } = componi({ testo, xxxx: 'a9z0' });
  const { testo: t, errori } = arrivato(corpo, id);
  assert.deepEqual(errori, []);
  assert.equal(frontmatter(t).corpo, testo);
});

test('B18: messaggio vuoto → un file comunque, e valida', () => {
  const { id, file, corpo } = componi({ testo: '' });
  assert.equal(file, '---\nregistrato: 2026-11-03T23:40:12+01:00\ncanale: telefono\n---\n');
  assert.ok(corpo.content.length > 0);
  assert.deepEqual(arrivato(corpo, id).errori, []);
});

test('ora legale e cambio d\'anno: id e registrato dallo stesso istante, fuso giusto', () => {
  const estate = componi({ adesso: new Date('2026-07-01T21:59:59Z') });
  assert.equal(estate.id, '20260701-2359-k7q2');
  assert.match(estate.file, /registrato: 2026-07-01T23:59:59\+02:00\n/);
  const capodanno = componi({ adesso: new Date('2026-12-31T23:30:00Z') }); // yyyy, non YYYY
  assert.equal(capodanno.id, '20270101-0030-k7q2');
  for (const c of [estate, capodanno]) assert.deepEqual(arrivato(c.corpo, c.id).errori, []);
});

test('foto e vocale: la riga allegati valida', () => {
  for (const allegato of ['webp', 'm4a']) {
    const { id, file, corpo } = componi({ allegato });
    assert.match(file, new RegExp(`\\nallegati: \\[${id}\\.${allegato}\\]\\n---\\n$`));
    assert.deepEqual(arrivato(corpo, id).errori, []);
  }
});

test('lo schema scarta ciò che la ricetta non deve scrivere', () => {
  const v = validatore('frammento');
  assert.equal(v({ registrato: '2026-11-03T23:40:12+01:00', canale: 'telefono' }), true);
  assert.equal(v({ registrato: '2026-11-03T23:40:12', canale: 'telefono' }), false, 'senza fuso');
  assert.equal(v({ registrato: '2026-11-03', canale: 'telefono' }), false, 'senza ora');
  assert.equal(v({ registrato: '2026-11-03T23:40:12+01:00', canale: 'telefono', allegati: ['20261103-2340-k7q2.jpg'] }), false);
});

test('"Chiedi": stesso file di "Memo" più intento: chiedi', () => {
  const memo = componi({ testo: 'chi ha scritto l\'ospite inquietante?' });
  const chiedi = componi({ testo: 'chi ha scritto l\'ospite inquietante?', chiedi: true });
  assert.equal(chiedi.file.replace('intento: chiedi\n', ''), memo.file);
  assert.equal(chiedi.corpo.message, `chiedi ${chiedi.id}`);
});

test('"Chiedi" passa lo schema del frammento', { todo: 'lo schema del frammento non ha `intento` (additionalProperties: false): da decidere prima del blocco 8' }, () => {
  const { id, corpo } = componi({ testo: 'una domanda?', chiedi: true });
  assert.deepEqual(arrivato(corpo, id).errori, []);
});

test('le ricette non contengono token', () => {
  for (const nome of ['memo-ios.md', 'chiedi-ios.md', 'http-shortcuts.json']) {
    const t = readFileSync(new URL(nome, TEL), 'utf8');
    assert.doesNotMatch(t, /gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}/, nome);
  }
  const j = JSON.parse(readFileSync(new URL('http-shortcuts.json', TEL), 'utf8'));
  const pat = j.variables.find((v) => v.key === 'pat');
  assert.equal(pat?.value, '');
});

// Android: esegue il codice di http-shortcuts.json con le funzioni di HTTP Shortcuts finte e intercetta il PUT.
function eseguiAndroid(testo, adesso = '2026-11-03T22:40:12Z') {
  const j = JSON.parse(readFileSync(new URL('http-shortcuts.json', TEL), 'utf8'));
  const codice = j.categories.flatMap((c) => c.shortcuts).find((s) => s.name === 'Memo').codeOnPrepare;
  const richieste = [];
  const variabili = { pat: 'PAT-FINTO', testo, fire: '' };
  const RealDate = Date;
  class DataFissa extends RealDate { constructor(...a) { super(...(a.length ? a : [adesso])); } }
  const avvisi = [];
  vm.runInNewContext(codice, {
    Date: DataFissa, Math, String, JSON,
    getVariable: (k) => variabili[k],
    base64encode: (s) => Buffer.from(s, 'utf8').toString('base64'),
    sendHttpRequest: (url, o) => { richieste.push({ url, ...o }); return { status: 'success', response: { statusCode: 201 } }; },
    showToast: (m) => avvisi.push(m), showDialog: (m) => avvisi.push(m), copyToClipboard: () => {},
  });
  return { richieste, avvisi };
}

test('Android: lo stesso file, lo stesso PUT, "Salvato"', () => {
  process.env.TZ ??= 'Europe/Rome';
  for (const testo of ['perché 🌊\nè così', '', 'https://youtu.be/x?si=1&t=42']) {
    const { richieste, avvisi } = eseguiAndroid(testo);
    assert.equal(richieste.length, 1, 'solo il PUT: il fire è commentato');
    const r = richieste[0];
    const id = /ingresso\/(.+)\.md$/.exec(r.url)[1];
    assert.match(id, IDF);
    assert.match(r.url, /^https:\/\/api\.github\.com\/repos\/OWNER\/MEMO\/contents\/ingresso\//);
    assert.equal(r.method, 'PUT');
    assert.equal(r.headers.Authorization, 'Bearer PAT-FINTO');
    const corpo = JSON.parse(r.body);
    assert.deepEqual(Object.keys(corpo), ['message', 'content']);
    const { testo: t, errori } = arrivato(corpo, id);
    assert.deepEqual(errori, []);
    assert.equal(frontmatter(t).corpo, testo);
    const ore = /^registrato: \d{4}-(\d{2})-(\d{2})T(\d{2}):(\d{2})/m.exec(t);
    assert.equal(id.slice(4, 13), `${ore[1]}${ore[2]}-${ore[3]}${ore[4]}`, 'id e registrato dallo stesso istante');
    assert.deepEqual(avvisi, ['Salvato']);
  }
});
