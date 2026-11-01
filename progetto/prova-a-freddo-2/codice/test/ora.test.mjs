import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ora, oggi, iso } from '../scripts/ora.mjs';

// Esegue fn con ATLANTE_ORA impostata (o tolta) e poi la rimette com'era.
function con(valore, fn) {
  const prima = process.env.ATLANTE_ORA;
  if (valore === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = valore;
  try { return fn(); } finally {
    if (prima === undefined) delete process.env.ATLANTE_ORA; else process.env.ATLANTE_ORA = prima;
  }
}

test('ora() legge ATLANTE_ORA', () => {
  con('2026-11-03T23:40:12+01:00', () => assert.equal(ora().toISOString(), '2026-11-03T22:40:12.000Z'));
});

test('ora() senza ATLANTE_ORA è adesso', () => {
  con(undefined, () => assert.ok(Math.abs(ora().getTime() - Date.now()) < 1000));
});

test('ATLANTE_ORA senza fuso o non valida: errore', () => {
  for (const v of ['ieri sera', '2026-11-03', '2026-11-03T23:40:12']) con(v, () => assert.throws(() => ora(), /ATLANTE_ORA/));
});

test('oggi() è la data di Roma, non di UTC', () => {
  con('2026-11-03T23:30:00Z', () => assert.equal(oggi(), '2026-11-04'));
  con('2026-07-01T21:59:00Z', () => assert.equal(oggi(), '2026-07-01'));
  con('2026-07-01T22:00:00Z', () => assert.equal(oggi(), '2026-07-02'));
  con('2026-11-03T23:40:12+01:00', () => assert.match(oggi(), /^\d{4}-\d{2}-\d{2}$/));
});

test('iso() ha lo scarto di Roma: +01:00 fino al 27 marzo 2027, +02:00 dopo', () => {
  con('2026-11-03T22:40:12Z', () => assert.equal(iso(), '2026-11-03T23:40:12+01:00'));
  con('2027-03-28T00:59:59Z', () => assert.equal(iso(), '2027-03-28T01:59:59+01:00'));
  con('2027-03-28T01:00:00Z', () => assert.equal(iso(), '2027-03-28T03:00:00+02:00'));
  // il ritorno all'ora solare: 25 ottobre 2026, alle 03:00 legali si torna alle 02:00
  con('2026-10-25T00:59:59Z', () => assert.equal(iso(), '2026-10-25T02:59:59+02:00'));
  con('2026-10-25T01:00:00Z', () => assert.equal(iso(), '2026-10-25T02:00:00+01:00'));
});

test('iso() rilegge lo stesso istante', () => {
  con('2027-03-28T01:30:00Z', () => assert.equal(new Date(iso()).getTime(), ora().getTime()));
});
