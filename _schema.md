# Lo schema dei file

**Versione: 3**

Lo schema JSON dei frontmatter (modello v3 §3.7) sta per esteso in [`schema/frontmatter.json`](schema/frontmatter.json),
che ne è la copia eseguibile: qui non si copia, la fonte è una sola. Accanto, `schema/piano.json` è lo schema del piano
che l'AI passa a `scripts/applica.mjs` (modello v3 §2.2).

Il campo `schema: 3` sta in ogni lettura, nodo e restituzione. Il frammento non ha `schema`: il suo formato è congelato.

## Storia delle migrazioni

Nessuna. (Ogni migrazione: `scripts/migra/NNN-nome.mjs`, un commit "migrazione NNN", una riga qui con data, numero e che
cosa cambia.)
