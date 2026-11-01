// L'unica fonte dell'ora per tutti gli script: ATLANTE_ORA (ISO 8601) se c'è, altrimenti adesso. Fuso: Europe/Rome.
const FUSO = 'Europe/Rome';

export function ora() {
  const e = process.env.ATLANTE_ORA;
  if (!e) return new Date();
  const d = new Date(e);
  if (Number.isNaN(d.getTime())) throw new Error(`ATLANTE_ORA non è una data ISO 8601: ${e}`);
  return d;
}

// Le parti della data nel fuso di Roma, più lo scarto in minuti da UTC.
function parti(d = ora()) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: FUSO, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  const locale = Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return { ...p, scarto: Math.round((locale - Math.floor(d.getTime() / 1000) * 1000) / 60000) };
}

export function oggi(d = ora()) {
  const p = parti(d);
  return `${p.year}-${p.month}-${p.day}`;
}

export function iso(d = ora()) {
  const p = parti(d);
  const s = p.scarto < 0 ? '-' : '+';
  const a = Math.abs(p.scarto);
  const hh = String(Math.floor(a / 60)).padStart(2, '0');
  const mm = String(a % 60).padStart(2, '0');
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${s}${hh}:${mm}`;
}
