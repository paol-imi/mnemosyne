// Schema 4, le dimensioni (progetto/sito/dimensioni.md): faccette(a) e gesti(a, id), la sezione «Da classificare»,
// il controllo `dimensioni` di verifica.mjs (vita senza campo, campo solo sulle correnti, congelamento) e la migrazione 004.
// Dati solo sintetici.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { faccette, gesti, righeDaClassificare } from '../scripts/contesto.mjs';
import { verifica } from '../scripts/verifica.mjs';
import { prepara, migra, VALORI } from '../scripts/migra/004-dimensioni.mjs';

const RADICE = new URL('../', import.meta.url).pathname;
const ENV = { ...process.env, GIT_AUTHOR_NAME: 'memo', GIT_AUTHOR_EMAIL: 'memo@local', GIT_COMMITTER_NAME: 'memo',
  GIT_COMMITTER_EMAIL: 'memo@local', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' };
delete ENV.GITHUB_REF_NAME;
delete process.env.GITHUB_REF_NAME;
const git = (dir, ...a) => execFileSync('git', a, { cwd: dir, env: ENV, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const commit = (dir, msg) => { git(dir, 'add', '-A'); git(dir, 'commit', '-q', '-m', msg); };

// Un archivio in memoria, come lo dà carica(): Map id → {id, dati, corpo[, genere]}.
function archivio({ frammenti = {}, letture = {}, restituzioni = {}, nodi = {} }) {
  const m = (o, extra = () => ({})) => new Map(Object.entries(o).map(([id, x]) => [id, { id, corpo: x.corpo ?? '', dati: x.dati ?? x, ...extra(x) }]));
  return { frammenti: m(frammenti), letture: m(letture), restituzioni: m(restituzioni),
    nodi: new Map(Object.entries(nodi).map(([id, x]) => [id, { id, genere: x.genere, corpo: '', dati: x.dati }])) };
}
const F = (reg, corpo, extra = {}) => ({ dati: { registrato: reg, canale: 'telefono', ...extra }, corpo });
const L = (legami, extra = {}) => ({ dati: { schema: 3, versione: 1, intento: ['salva'], legami, risposta: 'salvato', ...extra } });
const nomina = (a, voce = 'sua', extra = {}) => ({ p: 'nomina', a, voce, perche: 'parola tua', ...extra });
const parla = (a, voce = 'sua', extra = {}) => ({ p: 'parla-di', a, voce, perche: 'parola tua', ...extra });

const A1 = '20261101-0900-aaaa', A2 = '20261102-0900-bbbb', A3 = '20261103-0900-cccc', A4 = '20261104-0900-dddd';
const A5 = '20261105-0900-eeee', I1 = '20261004-0000-u99';
const NODI = {
  spinoza: { genere: 'persone', dati: { nome: 'Baruch Spinoza', cerchia: 'mondo', campo: ['filosofia'] } },
  etica: { genere: 'opere', dati: { nome: 'Etica', autore: 'spinoza', tipo: 'libro', campo: ['filosofia'] } },
  'twin-peaks': { genere: 'opere', dati: { nome: 'Twin Peaks', tipo: 'serie', campo: ['cinema'] } },
  'signora-del-ceppo': { genere: 'persone', dati: { nome: 'la signora del ceppo', cerchia: 'finzione', in: 'twin-peaks' } },
  'il-gufo': { genere: 'citazioni', dati: { nome: 'i gufi non sono quello che sembrano', 'attribuita-a': ['signora-del-ceppo'] } },
  zia: { genere: 'persone', dati: { nome: 'zia', cerchia: 'vita' } },
  rabbia: { genere: 'temi', dati: { nome: 'rabbia', specie: 'stato' } },
  stoicismo: { genere: 'temi', dati: { nome: 'stoicismo', specie: 'corrente', campo: ['filosofia'] } },
  'rabbia-vecchia': { genere: 'temi', dati: { nome: 'ira', 'fuso-in': 'rabbia' } },
  tatuaggi: { genere: 'raccolte', dati: { nome: 'tatuaggi' } },
  paterson: { genere: 'opere', dati: { nome: 'Paterson' } },
};

const a = archivio({
  frammenti: {
    [A1]: F('2026-11-01T09:00:00+01:00', 'rileggo spinoza, l\'etica, il libro quarto'),
    [A2]: F('2026-11-02T09:00:00+01:00', 'la frase del gufo, credo sia della signora del ceppo'),
    [A3]: F('2026-11-03T09:00:00+01:00', 'oggi una rabbia che non so dove mettere, la zia mi capirebbe'),
    [A4]: F('2026-11-04T09:00:00+01:00', 'una notte che non passa e non so come fare'),
    [A5]: F('2026-11-05T09:00:00+01:00', 'paterson da vedere, per il braccio uno stoico', { intento: ['chiedi'] }),
    [I1]: { dati: { registrato: '2026-10-04', canale: 'importato', voce: 'sua' }, corpo: 'una frase dell\'archivio d\'origine' },
  },
  letture: {
    [A1]: L([nomina('spinoza'), nomina('etica')]),
    [A2]: L([nomina('il-gufo')]),
    [A3]: L([parla('rabbia-vecchia', 'sua', { come: 'stato' }), nomina('zia'),
      { p: 'contraddice', a: A1, voce: 'proposta', perche: 'una riga mia' }]),
    [A4]: L([parla('rabbia')], { delicato: true, risposta: 'ci-sono' }),
    [A5]: L([nomina('paterson', 'sua', { fruizione: 'da-fare' }), parla('stoicismo', 'proposta'),
      { p: 'serve-a', a: 'tatuaggi', voce: 'sua', perche: '«per il braccio»' }], { intento: ['chiedi'] }),
    [I1]: L([], { vissuto: '≤2026-10-04', fonte: 'a.md:1@abcdef1', risposta: undefined }),
  },
  nodi: NODI,
});
const valori = (id, asse) => faccette(a).get(id)?.valori.filter((v) => !asse || v.asse === asse) ?? null;
const nomi = (id, asse) => valori(id, asse).map((v) => v.valore);

test('faccette: un passo più l\'autore (persona, opera, campo e tipo)', () => {
  assert.deepEqual(nomi(A1, 'persone'), ['spinoza']);
  assert.deepEqual(valori(A1, 'cose'), [{ asse: 'cose', valore: 'libro', voce: 'sua', nodo: 'etica' }]);
  assert.deepEqual(valori(A1, 'campo').map((v) => `${v.valore}@${v.nodo}`), ['filosofia@spinoza', 'filosofia@etica']);
  assert.deepEqual(nomi(A1, 'tempo'), ['2026-11']);
});

test('faccette: la catena dell\'`in` dà opera e tipo, mai il campo; la citazione ⚠ non dà campo', () => {
  const cose = valori(A2, 'cose');
  assert.deepEqual(cose.map((v) => `${v.valore}@${v.nodo}${v.esito ? ` ${v.esito}` : ''}`), ['citazione@il-gufo ⚠', 'serie@twin-peaks']);
  assert.deepEqual(nomi(A2, 'persone'), ['signora-del-ceppo']);
  assert.deepEqual(valori(A2, 'campo'), []);
});

test('faccette: la persona della vita non è un valore; la lapide porta al tema vivo con la sua specie', () => {
  assert.deepEqual(nomi(A3, 'persone'), []);
  assert.deepEqual(valori(A3, 'temi'), [{ asse: 'temi', valore: 'rabbia', voce: 'sua', specie: 'stato' }]);
});

test('faccette: un delicato non ripreso non c\'è; ripreso, torna', () => {
  assert.equal(faccette(a).has(A4), false);
  assert.deepEqual(gesti(a, A4), []);
  const b = { ...a, letture: new Map(a.letture) };
  b.letture.set(A5, { ...a.letture.get(A5), dati: { ...a.letture.get(A5).dati,
    legami: [...a.letture.get(A5).dati.legami, { p: 'ritorna-su', a: A4, voce: 'sua', come: 'aggiunge', perche: 'parola tua' }] } });
  assert.deepEqual(faccette(b).get(A4).valori.find((v) => v.asse === 'temi').valore, 'rabbia');
});

test('faccette: la corrente dà il campo con la voce del legame (◌ resta ◌, per la lente)', () => {
  assert.deepEqual(valori(A5, 'campo'), [{ asse: 'campo', valore: 'filosofia', voce: 'proposta', nodo: 'stoicismo' }]);
  assert.deepEqual(valori(A5, 'cose'), [{ asse: 'cose', valore: null, voce: 'sua', nodo: 'paterson' }], 'tipo non ancora scritto');
});

test('faccette: l\'importato è una frase, nel tempo «archivio»', () => {
  assert.equal(faccette(a).get(I1).importato, true);
  assert.deepEqual(nomi(I1, 'tempo'), ['archivio']);
  assert.deepEqual(gesti(a, I1), [], 'la data-tetto non è un ricordo');
});

test('gesti: penso (◌ proposto, solo per la lente), sento, chiedo, voglio fare, per la raccolta', () => {
  assert.deepEqual(gesti(a, A3).map((g) => `${g.valore}:${g.voce}`), ['penso:proposta', 'sento:sua']);
  assert.deepEqual(gesti(a, A1).map((g) => `${g.valore}:${g.voce}`), ['penso:proposta'], 'tutti e due i capi');
  assert.deepEqual(gesti(a, A5).map((g) => `${g.valore}${g.raccolta ? `>${g.raccolta}` : ''}`), ['chiedo', 'voglio-fare', 'per>tatuaggi']);
});

test('gesti: un contraddice proposto e rifiutato toglie il gesto; accolto diventa ●', () => {
  const R = 'r-20261103-0901-risposta';
  const con = (come) => {
    const b = { ...a, letture: new Map(a.letture), restituzioni: new Map([[R, { id: R, corpo: '', dati: { forma: 'risposta', per: A3,
      voci: [{ n: 1, rif: A1, voce: 'proposta', cosa: 'tensione' }] } }]]) };
    b.letture.set(A5, { ...a.letture.get(A5), dati: { ...a.letture.get(A5).dati,
      legami: [...a.letture.get(A5).dati.legami, { p: 'ritorna-su', a: R, n: 1, voce: 'sua', come, perche: 'parola tua' }] } });
    return gesti(b, A3).filter((g) => g.valore === 'penso').map((g) => g.voce);
  };
  assert.deepEqual(con('accoglie'), ['accolta']);
  assert.deepEqual(con('rifiuta'), []);
});

test('gesti: voglio fare cade con una «fatta» più recente; trascrivo e ricordo dalle mie parole', () => {
  const b = { ...a, frammenti: new Map(a.frammenti), letture: new Map(a.letture) };
  const A6 = '20261106-0900-ffff';
  b.frammenti.set(A6, { id: A6, corpo: 'visto paterson ieri sera, bello', dati: { registrato: '2026-11-06T09:00:00+01:00', canale: 'telefono' } });
  b.letture.set(A6, { id: A6, dati: L([nomina('paterson', 'sua', { fruizione: 'fatta' })], { altrui: true, vissuto: 'da piccolo' }).dati });
  assert.ok(!gesti(b, A5).some((g) => g.valore === 'voglio-fare'));
  assert.deepEqual(gesti(b, A6).map((g) => g.valore), ['ricordo', 'trascrivo']);
});

test('Da classificare: le opere senza tipo, i temi senza specie, chi non ha campo; mai la vita né la lapide', () => {
  const r = righeDaClassificare(a);
  assert.deepEqual(r, [
    '- paterson · opere · Paterson · senza tipo, campo',
    '- signora-del-ceppo · persone · la signora del ceppo · senza campo',
  ]);
});

// La fixture di verifica (il caso Galimberti, sintetico) in un repository nuovo.
function repo(t) {
  const dir = mkdtempSync(join(tmpdir(), 'dimensioni-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(join(RADICE, 'test/fixture/verifica/archivio'), dir, { recursive: true });
  git(dir, 'init', '-q', '-b', 'banco/zero');
  commit(dir, 'smista: 1 memo');
  return dir;
}
const PROVA = { 'umberto-galimberti': { campo: ['filosofia', 'psicologia'] }, 'spettacolo-sulle-emozioni': { tipo: 'spettacolo', campo: ['filosofia'] },
  nichilismo: { specie: 'corrente', campo: ['filosofia'] } };

test('migrazione 004: schema 4 su tutti i nodi, i valori, verifica verde; la seconda volta niente da fare', (t) => {
  const dir = repo(t);
  const r = migra({ radice: dir, valori: PROVA });
  assert.deepEqual(r.errori, []);
  assert.equal(r.scritti.length, 4);
  assert.deepEqual(r.conti, { schema: 4, valori: 5, nodi: 3 });
  assert.match(readFileSync(join(dir, 'opere/spettacolo-sulle-emozioni.md'), 'utf8'), /^schema: 4\n[\s\S]*tipo: spettacolo\ncampo: \[filosofia\]\n/m);
  assert.deepEqual(verifica(dir), []);
  assert.equal(prepara(dir, PROVA).file.length, 0, 'idempotente');
  assert.equal(r.piano.ciclo, 'migra');
});

test('migrazione 004: --prova non sposta niente; un valore diverso già scritto è un rifiuto', (t) => {
  const dir = repo(t), prima = readFileSync(join(dir, 'temi/nichilismo.md'), 'utf8');
  assert.deepEqual(migra({ radice: dir, valori: PROVA, prova: true }).errori, []);
  assert.equal(readFileSync(join(dir, 'temi/nichilismo.md'), 'utf8'), prima);
  migra({ radice: dir, valori: PROVA });
  const r = prepara(dir, { ...PROVA, nichilismo: { specie: 'idea' } });
  assert.ok(r.errori.some((e) => e.includes('congelato')), r.errori.join('\n'));
});

test('migrazione 004: la tabella vera nomina solo nodi che ci sono, 58 valori su 49 nodi', () => {
  const r = prepara(RADICE);
  assert.deepEqual(r.errori, []);
  const n = Object.values(VALORI).reduce((s, v) => s + Object.keys(v).length, 0);
  assert.deepEqual([n, Object.keys(VALORI).length], [58, 49]);
});

test('verifica dimensioni: vita senza campo, campo solo sulle correnti, il congelamento e la correzione', (t) => {
  const dir = repo(t);
  migra({ radice: dir, valori: PROVA });
  commit(dir, 'migrazione 004');
  const p = 'persone/umberto-galimberti.md', l = 'letture/2026/11/20261103-2340-k7q2.md';
  const testo = readFileSync(join(dir, p), 'utf8');
  writeFileSync(join(dir, p), testo.replace('campo: [filosofia, psicologia]', 'campo: [filosofia]'));
  assert.ok(verifica(dir).some((e) => e.startsWith(`ERRORE ${p}:`) && e.includes('congelato')));
  const lettura = readFileSync(join(dir, l), 'utf8');
  writeFileSync(join(dir, l), lettura.replace('\nparole:', '\n  - {p: ritorna-su, a: 20261103-2340-k7q2, voce: sua, come: corregge, perche: "«solo filosofo»", nodo: umberto-galimberti, campo: campo, vecchio: "filosofia, psicologia", valore: filosofia}\nparole:'));
  assert.deepEqual(verifica(dir), []);
  writeFileSync(join(dir, l), lettura);
  writeFileSync(join(dir, p), testo.replace('cerchia: mondo', 'cerchia: vita'));
  assert.ok(verifica(dir).some((e) => e.includes('una persona della vita non ha campo')));
  writeFileSync(join(dir, p), testo);
  const tema = readFileSync(join(dir, 'temi/nichilismo.md'), 'utf8');
  writeFileSync(join(dir, 'temi/nichilismo.md'), tema.replace('specie: corrente', 'specie: idea'));
  assert.ok(verifica(dir).some((e) => e.includes('il campo sta solo sulle correnti')));
});

test('piano: tipo, specie e campo solo con aggiorna-nodo (consolida, migra); crea-nodo li rifiuta', async () => {
  const { prepara: piano } = await import('../scripts/applica.mjs');
  const errori = (p) => piano(p, RADICE).errori.filter((e) => e.startsWith('piano'));
  const agg = { op: 'aggiorna-nodo', nodo: 'camus', campi: { campo: ['filosofia'] } };
  assert.deepEqual(errori({ ciclo: 'migra', 'letto-da': 'mmm', operazioni: [agg] }), []);
  assert.notDeepEqual(errori({ ciclo: 'smista', 'letto-da': 'mmm', operazioni: [agg] }), []);
  assert.notDeepEqual(errori({ ciclo: 'migra', 'letto-da': 'mmm', operazioni: [{ op: 'alias', nodo: 'camus', alias: ['x'] }] }), []);
  assert.notDeepEqual(errori({ ciclo: 'consolida', 'letto-da': 'mmm', operazioni: [{ op: 'crea-nodo', genere: 'opere', nome: 'X', tipo: 'film' }] }), []);
  assert.notDeepEqual(errori({ ciclo: 'consolida', 'letto-da': 'mmm', operazioni: [{ ...agg, campi: { campo: ['filosofia', 'arte', 'musica'] } }] }), []);
});
