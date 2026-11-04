# Lo schema dei file

**Versione: 4**

Lo schema JSON dei frontmatter (modello v3 §3.7) sta per esteso in [`schema/frontmatter.json`](schema/frontmatter.json),
che ne è la copia eseguibile: qui non si copia, la fonte è una sola. Accanto, `schema/piano.json` è lo schema del piano
che l'AI passa a `scripts/applica.mjs` (modello v3 §2.2).

Il campo `schema` sta in ogni lettura, nodo e restituzione. Dalla versione 4 ogni file nuovo nasce `schema: 4`; letture e
restituzioni scritte prima restano a 3 (le restituzioni non cambiano mai, le letture solo per versioni) e lo schema le
accetta. Il frammento non ha `schema`: il suo formato è congelato.

## Storia delle migrazioni

- 004 (schema 4, `scripts/migra/004-dimensioni.mjs`, `progetto/sito/dimensioni.md` §3 e §5): i nodi a `schema: 4`;
  campi nuovi solo sui nodi, `tipo` sulle opere, `specie` sui temi, `campo` (1–2) su persone non `vita`, opere e
  correnti; 58 valori su 49 nodi; `brano` → `canzone` in `voci[].cosa`; letture e restituzioni restano a 3. Data: quella
  del commit "migrazione 004".

(Ogni migrazione: `scripts/migra/NNN-nome.mjs`, un commit "migrazione NNN", una riga qui con data, numero e che
cosa cambia.)
