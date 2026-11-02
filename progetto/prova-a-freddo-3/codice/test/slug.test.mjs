import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slug, chiave, scheletro, candidati } from '../scripts/slug.mjs';

const indice = [
  { slug: 'umberto-galimberti', nome: 'Umberto Galimberti', alias: [], genere: 'persone', cerchia: 'mondo' },
  { slug: 'fabrizio-de-andre', nome: 'Fabrizio De André', alias: ['Faber'], genere: 'persone', cerchia: 'mondo' },
  { slug: 'cioran', nome: 'Emil Cioran', alias: ['Cioran'], genere: 'persone', cerchia: 'mondo' },
  { slug: 'marco-aurelio', nome: 'Marco Aurelio', alias: [], genere: 'persone', cerchia: 'mondo' },
  { slug: 'nome-della-rosa', nome: 'Il nome della rosa', alias: [], genere: 'opere' },
];
const primo = (n, i = indice) => candidati(n, i)[0];

test('slug: kebab-case, accenti, legature, troncamento, vuoto', () => {
  assert.equal(slug('Fabrizio De André'), 'fabrizio-de-andre');
  assert.equal(slug("L'Étranger, è già"), 'l-etranger-e-gia');
  assert.equal(slug('Straße Œuvre Æther'), 'strasse-oeuvre-aether');
  assert.equal(slug('  --Ciò a cui resisti, persiste!-- '), 'cio-a-cui-resisti-persiste');
  const lungo = slug('parola '.repeat(20));
  assert.ok(lungo.length <= 60 && !lungo.endsWith('-'));
  assert.equal(slug('?!'), 'senza-nome');
});

test('chiave e scheletro', () => {
  assert.equal(chiave('De André'), chiave('de andre'));
  assert.equal(chiave("L'Estate"), 'estate');
  assert.equal(chiave('Il nome della rosa'), 'nome della rosa');
  assert.equal(chiave('Uno, nessuno e centomila'), 'uno nessuno e centomila'); // "uno" non è nell'elenco §3.6
  assert.equal(chiave('Il'), 'il');
  assert.equal(scheletro('chioran'), 'crn');
  assert.equal(scheletro('Cioran'), 'crn');
});

test('i due Galimberti cadono su umberto-galimberti', () => {
  assert.deepEqual(primo('Umberto Galimberti'), { slug: 'umberto-galimberti', via: 'esatta', debole: false });
  assert.deepEqual(primo('galimberti'), { slug: 'umberto-galimberti', via: 'cognome', debole: true });
});

test('i due De André cadono su fabrizio-de-andre', () => {
  assert.equal(primo('De André').slug, 'fabrizio-de-andre');
  assert.equal(primo('de andre').slug, 'fabrizio-de-andre');
  assert.equal(primo('faber').via, 'esatta');
});

test('chioran trova cioran: la via che il modello dà è levenshtein (distanza 1), più forte dello scheletro', () => {
  assert.equal(scheletro('chioran'), scheletro('cioran')); // "crn"
  assert.deepEqual(primo('chioran'), { slug: 'cioran', via: 'levenshtein', debole: true });
  // Lo stesso con lo slug moderno e le righe della tabella degli alias (mappa.md).
  const righe = [
    { chiave: 'emil cioran', slug: 'emil-cioran', genere: 'persone', cerchia: 'mondo' },
    { chiave: 'cioran', slug: 'emil-cioran', genere: 'persone', cerchia: 'mondo' },
  ];
  assert.deepEqual(candidati('chioran', righe), [{ slug: 'emil-cioran', via: 'levenshtein', debole: true }]);
  // Senza l'alias "Cioran" nessuna regola del §3.6 lega "chioran" a "Emil Cioran" (cognome vuole la parola esatta).
  assert.deepEqual(candidati('chioran', [righe[0]]), []);
});

test('lo scheletro dove Levenshtein non arriva: oltre distanza 2, o sotto le 5 lettere', () => {
  assert.deepEqual(primo('chiorrhann'), { slug: 'cioran', via: 'scheletro', debole: true });
  const kant = [{ slug: 'kant', nome: 'Immanuel Kant', alias: ['Kant'], genere: 'persone', cerchia: 'mondo' }];
  assert.deepEqual(candidati('Kanth', kant), [{ slug: 'kant', via: 'scheletro', debole: true }]); // "kant" ha 4 lettere
});

test('B06: "marco" non è marco-aurelio come candidato certo', () => {
  assert.deepEqual(candidati('marco', indice), [{ slug: 'marco-aurelio', via: 'nome', debole: true }]);
  const conVita = [...indice, { slug: 'marco', nome: 'Marco', alias: [], genere: 'persone', cerchia: 'vita' }];
  assert.deepEqual(candidati('marco', conVita), [
    { slug: 'marco', via: 'esatta', debole: false },
    { slug: 'marco-aurelio', via: 'nome', debole: true },
  ]);
});

test('cognome e nome solo per le persone; righe della tabella degli alias', () => {
  assert.deepEqual(candidati('rosa', indice), []); // "nome della rosa" è un'opera
  const righe = [{ chiave: 'galimberti', slug: 'umberto-galimberti', genere: 'persone', cerchia: 'mondo' }];
  assert.deepEqual(primo('Galimberti', righe), { slug: 'umberto-galimberti', via: 'esatta', debole: false });
});

test('nessun candidato per un nome nuovo o vuoto', () => {
  assert.deepEqual(candidati('Recalcati', indice), []);
  assert.deepEqual(candidati('?!', indice), []);
});
