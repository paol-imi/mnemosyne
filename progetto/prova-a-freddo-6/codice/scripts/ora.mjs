// L'unica fonte dell'ora per tutti gli script: ATLANTE_ORA (ISO 8601 con fuso) se c'è, altrimenti l'orologio.
// Le date si leggono sempre nel fuso di Roma.
export const FUSO = 'Europe/Rome';

// ora() → Date (un istante); il fuso entra in gioco quando lo si legge con oggi() o iso().
export function ora() {
  const e = process.env.ATLANTE_ORA;
  if (!e) return new Date();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(e)) {
    throw new Error(`ATLANTE_ORA non è un'ora ISO 8601 con fuso: ${e}`);
  }
  return new Date(e);
}

const formato = new Intl.DateTimeFormat('en-CA', {
  timeZone: FUSO, hourCycle: 'h23',
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
});

function parti(d) {
  const p = Object.fromEntries(formato.formatToParts(d).map((x) => [x.type, x.value]));
  const locale = Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return { ...p, scarto: Math.round((locale - Math.floor(d.getTime() / 1000) * 1000) / 60000) };
}

// oggi() → "AAAA-MM-GG", la data di Roma.
export function oggi(d = ora()) {
  const p = parti(d);
  return `${p.year}-${p.month}-${p.day}`;
}

// iso() → "AAAA-MM-GGTHH:MM:SS+01:00", l'ora di Roma con il suo scarto (per `registrato`).
export function iso(d = ora()) {
  const p = parti(d);
  const a = Math.abs(p.scarto);
  const hhmm = `${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${p.scarto < 0 ? '-' : '+'}${hhmm}`;
}
