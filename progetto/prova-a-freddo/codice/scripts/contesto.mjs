// contesto.mjs, PROVVISORIO (blocco 4-5; quello vero, ~300 righe e 4 file, è del blocco 7: modello §6.1).
// node scripts/contesto.mjs [--fino-a ID] [--radice DIR] → contesto/recenti.md e contesto/mappa.md.
// recenti.md: gli ultimi 30 frammenti del telefono con la loro risposta, le ultime 5 chat, le ultime 10 restituzioni intere.
// mappa.md: solo le sezioni Stato (data d'inizio, conti grezzi: niente giorni attivi né soglie) e Alias (§3.6).
// Mancano: parole.md, ritratto.md e le altre 15 sezioni di mappa.md.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { iso } from './ora.mjs';
import { GENERI } from './schema.mjs';
import { carica, tabellaAlias } from './archivio.mjs';

const testata = (fino, corpo) => {
  const t = Math.round(corpo.length / 3.5);
  return `---\naggiornato: ${iso()}\nfino-a: ${fino ?? 'nessuno'}\ntoken-stimati: ${t}\nprovvisorio: true\n---\n${corpo}`;
};
const giorno = (id) => `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;

export function contesto(radice, finoA) {
  const a = carica(radice);
  const tutti = [...a.frammenti.values()].filter((f) => !finoA || f.id <= finoA);
  const nostri = tutti.filter((f) => f.dati.canale !== 'importato');
  const fino = tutti.at(-1)?.id;
  const voce = (f) => {
    const l = a.letture.get(f.id), r = l?.dati.risposta;
    const coda = r ? `\n→ risposta: ${r}` : l ? '' : '\n→ ancora senza lettura';
    return `### ${f.id} · ${f.dati.registrato}\n${f.corpo.trim()}${coda}\n`;
  };
  const restituzioni = [...a.restituzioni.values()].filter((r) => r.dati.forma !== 'eredita' && (!finoA || r.id.slice(2, 15) <= finoA.slice(0, 13)));
  const recenti = [
    '# Recenti (provvisorio)\n', '## Frammenti del telefono (ultimi 30)\n',
    ...nostri.filter((f) => f.dati.canale === 'telefono').slice(-30).map(voce),
    '## Chat (ultime 5)\n', ...nostri.filter((f) => f.dati.canale === 'chat').slice(-5).map(voce),
    '## Restituzioni (ultime 10, intere)\n',
    ...restituzioni.slice(-10).map((r) => [`### ${r.id} · ${r.dati.forma}${r.dati.per ? ` per ${r.dati.per}` : ''}`,
      ...(r.dati.voci ?? []).map((v) => `- ${v.n}. ${v.rif} (${v.voce}, ${v.cosa}${v.turno ? `, ${v.turno}` : ''})`),
      r.corpo.trim(), ''].join('\n')),
  ].join('\n');
  const conti = [
    `- frammenti tuoi: ${nostri.length} (telefono ${nostri.filter((f) => f.dati.canale === 'telefono').length}, chat ${nostri.filter((f) => f.dati.canale === 'chat').length})`,
    `- frammenti importati: ${tutti.length - nostri.length}`,
    `- letture: ${a.letture.size}; senza lettura: ${nostri.filter((f) => !a.letture.has(f.id)).length}`,
    `- restituzioni: ${restituzioni.length} (eredita a parte: ${a.restituzioni.size - [...a.restituzioni.values()].filter((r) => r.dati.forma !== 'eredita').length})`,
    `- nodi: ${GENERI.map((g) => `${g} ${[...a.nodi.values()].filter((n) => n.genere === g).length}`).join(', ')}`,
  ];
  const mappa = ['# Mappa (provvisoria: solo Stato e Alias)\n', '## Stato\n',
    `- data d'inizio: ${nostri[0] ? giorno(nostri[0].id) : 'nessun memo ancora'}`, ...conti, '',
    '## Alias\n', ...tabellaAlias(a.nodi).map((r) => `- ${r}`), ''].join('\n');
  mkdirSync(join(radice, 'contesto'), { recursive: true });
  writeFileSync(join(radice, 'contesto/recenti.md'), testata(fino, recenti));
  writeFileSync(join(radice, 'contesto/mappa.md'), testata(fino, mappa));
  return { fino, frammenti: nostri.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2), o = { radice: fileURLToPath(new URL('..', import.meta.url)) };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--fino-a') o.finoA = argv[++i];
    else if (argv[i] === '--radice') o.radice = argv[++i];
    else { console.log(`ERRORE argomento sconosciuto: ${argv[i]}`); process.exit(1); }
  }
  const e = contesto(o.radice, o.finoA);
  console.log(`contesto: fino a ${e.fino ?? 'nessuno'}, ${e.frammenti} frammenti tuoi (provvisorio)`);
}
