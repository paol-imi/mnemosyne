// verifica.mjs finto, per G3: rifiuta un nodo con un ID esterno (wikidata:), come lo schema del modello §3.7.
import { readdirSync, readFileSync } from 'node:fs';
let errori = 0;
for (const d of ['persone', 'opere', 'citazioni', 'temi']) {
  let fs = [];
  try { fs = readdirSync(d); } catch { continue; }
  for (const f of fs) if (/^wikidata:/m.test(readFileSync(`${d}/${f}`, 'utf8'))) { console.log(`ERRORE ${d}/${f}: campo fuori schema wikidata`); errori++; }
}
process.exit(errori ? 1 : 0);
