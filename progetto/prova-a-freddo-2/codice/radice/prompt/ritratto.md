# Routine "ritratto"

Leggi CLAUDE.md e prompt/formato-piano.md.

## Tocca a te?
1. `git pull`; leggi `contesto/mappa.md`, Stato: la data d'inizio, i ritratti già scritti, i frammenti parlanti del mese
   e del trimestre.
2. Ritmo: **mensile nei primi tre mesi**, poi **trimestrale** (con l'inizio a novembre: 1 dicembre, 1 gennaio,
   1 febbraio, poi 1 maggio, 1 agosto, 1 novembre). Se oggi non tocca, termina senza messaggio.
3. Soglia: **≥ 10 frammenti parlanti nel mese** (mensile), **≥ 20 nel trimestre** (trimestrale). Se manca, termina in
   silenzio; il prossimo copre anche questo periodo.

## Scrivi
4. `node scripts/lucchetto.mjs prendi --ciclo ritratto` (aspetta fino a 30 minuti), poi `node scripts/contesto.mjs`.
5. Leggi `contesto/ritratto.md` (il precedente), `mappa.md` (Conti, Nodi, Posizioni, Voce, In sospeso, Seme già usato)
   e al più 8 ancore ✦ da `parole.md`.
6. Il ritratto (≤ 400 parole), un piano `ciclo: ritratto` con un'operazione `restituzione` `forma: ritratto`:
   - titolo con il periodo e il numero dei miei frammenti (da `mappa.md`), e sotto la legenda in una riga;
   - **che cosa torna** (con i numeri), **che cosa è nuovo**, **che cosa è sparito**, **che cosa manca** (una serie
     ancora vuota si dice), **una tensione** (due mie frasi datate);
   - la riga sulla **voce**, dagli indicatori di `mappa.md` ("il 41% di queste righe sono parole tue; hai preso da me
     *ospite* e *soglia*"), **prima** della domanda;
   - **una domanda** in chiusura, che non ripete una "in sospeso";
   - fuori i delicati; nessuna lode, nessuna etichetta come destino; ogni ○ con opera e passo, o la riga si toglie;
     l'ultima riga è la domanda.
   **Variante giorno 1**: sul nucleo e sulle frasi importate, con **una** convergenza nuova ancorata a una mia frase; le
   date come tetto ("entro il 4 ottobre"); nessun conto mensile, nessuna riga sulla voce, niente "nuovo" e "sparito"
   (non c'è un prima); la convergenza è ◌. Se `lucchetto.mjs` non esiste ancora, salta i suoi passi; `contesto.mjs` a
   quel punto scrive solo `recenti.md` e Stato, Nodi, Alias di `mappa.md`: per il resto leggi `frammenti/` e i nodi, e
   dillo nel messaggio finale.
7. `node scripts/applica.mjs PIANO.json`; se `verifica.mjs` rifiuta un ritornello, riscrivi la frase, una volta.
8. `node scripts/contesto.mjs` (copia il ritratto in `contesto/ritratto.md`), `node scripts/verifica.mjs`,
   `node scripts/lucchetto.mjs lascia`, commit `ritratto: AAAA-MM`, push.

## Uscita
Il messaggio finale è il corpo del ritratto, senza frontmatter. Notifica: "Il ritratto è pronto".
Limiti: ≤ 120k token, ≤ 14 file letti per intero. Senza un ritratto precedente, niente confronto con il prima.
