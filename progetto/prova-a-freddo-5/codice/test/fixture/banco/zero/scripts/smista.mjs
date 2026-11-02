// smista.mjs finto, per R14 D0: `vicini ID` stampa i vicini in JSON; nei primi 3 giorni (fino al 2026-11-05) tutti gli importati.
const [cmd, id] = process.argv.slice(2);
if (cmd !== 'vicini' || !id) { console.error('uso: smista.mjs vicini ID'); process.exit(1); }
const ora = process.env.ATLANTE_ORA ?? '';
const vicini = ora && ora < '2026-11-06' ? ['20261004-0000-u19', '20261012-0000-u07', '20261015-0000-u10'] : [];
console.log(JSON.stringify(vicini.map((v) => ({ id: v, comune: ['nichilismo'] }))));
