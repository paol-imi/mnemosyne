---
tipo: progetto-sito
origine: claude
data: 2026-11-04
---

# Schema 4: le decisioni prese preparando il ramo `claude/schema-4`

Una riga per decisione, dove `dimensioni.md` lascia un margine o dove il codice di `main` lo imponeva. L'opzione più semplice.

1. **`schema` dei nodi è `enum [3, 4]`, non `const 4`**: con `const 4` cadevano decine di fixture dei test e del banco (nodi a 3 scritti a mano); i campi nuovi però valgono solo su un nodo a 4 (regola in `allOf`), la migrazione porta a 4 tutti i nodi veri e `applica.mjs` fa nascere a 4 ogni file nuovo.
2. **`$id` resta `memo/schema-3`** (e `memo/piano-3`): è un nome interno usato da script e test; cambiarlo non aggiunge niente. Il titolo dice lo schema 4.
3. **La migrazione non passa da `applica.mjs`**: `aggiorna-nodo` lì è ancora rifiutato (blocco 9). `004-dimensioni.mjs` fa la stessa transazione (cartella di lavoro → `verifica.mjs` con la storia git → spostamento, `verificaLavoro` ora esportata) e con `--piano FILE` scrive il piano `ciclo: migra` equivalente, che valida contro `schema/piano.json`.
4. **`ciclo: migra` scrive solo `aggiorna-nodo`**; `riserva` e `lapide` restano solo di "consolida".
5. **`crea-nodo` rifiuta `tipo`, `specie`, `campo`** per costruzione: `op-crea-nodo` non li elenca (nessuna regola in più).
6. **Un valore per nodo nella migrazione** per il `campo` (8 + 6 + 3 = 17), come nei conti di `dimensioni.md` §5; il secondo campo lo aggiunge solo una correzione.
7. **Specie dei 12 `/concetti/`**: `simbolo` solo per condottiero e resilienza napoleonica (le due «figure» di `dimensioni-dati.md`), `idea` gli altri 10; nessun `/concetti/` è una corrente. Le correnti sono stoicismo, romanticismo (da `/fonti/pensiero/`) e nichilismo (senza link).
8. **Il campo delle correnti è `filosofia`** per tutte e tre, romanticismo compreso (il percorso `/fonti/pensiero/`).
9. **Campi delle persone**: Camus e Marco Aurelio `filosofia`; Jordan Peterson `psicologia` (è il suo sapere, anche se il vecchio percorso era `/fonti/pensiero/`); Dostoevskij `letteratura`; Deftones e Radiohead `musica`; Rust Cohle (finzione) `cinema`, l'opera da cui viene; Sooraj Saxena `arte`.
10. **Tipi e campi delle opere**: Berserk `fumetto`/`letteratura`; Divina Commedia `libro` (un poema intero non è «una poesia sola»)/`letteratura`; FMA Brotherhood `serie`/`cinema`; Invictus `poesia`/`letteratura`; Pensieri `libro`/`filosofia`; True Detective `serie`/`cinema`.
11. **Anche le 2 citazioni e la raccolta salgono a 4**, senza valori (52 nodi a 4, 58 valori su 49).
12. **Il congelamento in `verifica.mjs`** è un controllo nuovo, `dimensioni`: confronta i nodi cambiati con HEAD; la correzione che lo sblocca va cercata nelle letture nuove o cambiate rispetto a HEAD, con lo stesso `nodo`, lo stesso `campo` e il valore nuovo in `valore` (per `campo` le voci unite da ", ", vuoto per toglierlo). La prima scrittura (nessun valore in HEAD) è sempre ammessa.
13. **`faccette` e `gesti` stanno in `scripts/faccette.mjs`**, riesportate da `scripts/contesto.mjs` (dove il sito importa, `tecnica.md`): così il file di `contesto.mjs`, su cui lavora `main`, cambia di tre righe.
14. **«Da classificare» è la sezione 18 di `mappa.md`**, dopo le 17 previste; un nodo nato solo da delicati non ripresi porta «aspetta».
15. **La forma di `faccette(a)`**: Map id → `{id, importato, valori}`, ogni valore `{asse, valore, voce, nodo?, esito?, specie?, raccolta?}`; il tipo non ancora scritto è `valore: null` (il nodo resta trovabile); la lente la applica il sito sulla `voce`.
16. **Il ● di un legame ◌ di una lettura**: accolto (o rifiutato, e allora tolto) quando una restituzione per quel frammento (`per`, `copre`, `aggancio`) lo propone in una voce con lo stesso `rif` e io la accolgo (o rifiuto) con `n`. Vale anche per il «penso» da un `contraddice` proposto.
17. **«ricordo»** non nasce dalla data-tetto degli importati (`vissuto: ≤2026-10-04` o una data nuda): solo da un `vissuto` a parole.
18. **I legami di voce `mondo`** restano nei valori con la loro voce: è il sito che li tiene fuori dalla lente.
19. **`prompt/smista.md`** riceve le due righe del §4.2 (stati vissuti, `vissuto` solo dalle mie parole), anche se il compito citava solo consolida e formato-piano: il gesto «sento» ne dipende.
20. **Cambio di lettore**: `CLAUDE.md`, `prompt/consolida.md`, `prompt/smista.md` e `prompt/formato-piano.md` cambiano, quindi cambia l'hash `prompt` delle letture nuove. È voluto (CLAUDE.md, «Il calcolato»).
21. **Nessuna rinomina di `voci[].cosa`** (coordinatore, rilievo A2 della revisione avversaria): resta `brano`, come in `schema/frontmatter.json`, `schema/piano.json`, `CLAUDE.md` e `prompt/progetto.md` (i memo del Progetto scritti prima ripetono il prefisso, e verrebbero rifiutati per sempre). «canzone» esiste solo come valore di `opere.tipo`, che è quello che Esplora legge. `dimensioni.md` §3.1, §3.2 e §4.5 su questo punto non valgono più.
22. **Il bersaglio esplicito** (coordinatore, rilievo A1): in `CLAUDE.md` (Confini) e in `prompt/smista.md` (riferimenti), un `→ id` di frammento o un `→ r-…#n` vale senza la finestra dei 3 giorni. Nessun campo `da-sito`. Né `applica.mjs` né `verifica.mjs` controllano la finestra, quindi nessuno script cambia; un test in `test/applica.test.mjs` prova che «sì alla 2 → r-…#2» su una lettera di 10 giorni prima passa, con un `ritorna-su` `n: 2`, `come: accoglie`. Un solo cambio di lettore dopo la porta, insieme allo schema 4.
