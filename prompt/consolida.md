# Routine "consolida"

Leggi CLAUDE.md e prompt/formato-piano.md. Una volta a settimana, di notte, con subagent dal compito piccolo (uno ogni 3
citazioni, uno per gruppo di 10 frammenti).

## Apertura
1. `git pull`. Se è l'orario delle 09:13 e il commit `consolida:` di stanotte c'è già, termina senza messaggio.
2. Leggi `contesto/mappa.md`, Stato: la data dell'ultimo consolidamento riuscito. Copri **tutti** i frammenti
   successivi (se una domenica è saltata, recuperi tutto, e scegli comunque una cosa sola per la lettera).
3. Se da allora non c'è almeno **un frammento parlante**, termina senza scrivere niente e senza messaggio.
4. `node scripts/lucchetto.mjs prendi --ciclo consolida` (aspetta fino a 30 minuti). Se resta occupato, termina con
   "Lucchetto occupato." (ci riprova il ripiego delle 09:13, o la settimana dopo).
5. **Svuota la coda**: se `ingresso/` ha memo o ci sono frammenti senza lettura, fai un giro di prompt/smista.md
   (passi 2–4, senza prendere di nuovo il lucchetto, senza messaggio finale suo).

## Fase A: rileggere
Tra un passo e l'altro: `node scripts/lucchetto.mjs rinnova` (se il lucchetto non è più tuo, abbandona senza spingere).
Ogni passo è un piano `ciclo: consolida`, applicato con `node scripts/applica.mjs`.
A1. **Rileggi** i frammenti nuovi con un campione di **20 vecchi** sugli stessi nodi, partendo da ciò che non aggancia
    niente e da ciò che tocca lo sguardo (`s01`, `s04`): `contesto/parole.md`, `mappa.md`, le letture.
A2. **Temi dedotti (◌).** Quelli che nomino io li ha già creati "smista". Per ogni parola candidata che in `mappa.md` è
    una vicenda (la 2ª–3ª ricorrenza: ≥ 3 frammenti in ≥ 3 giorni distinti entro 30 giorni attivi): `crea-nodo` con `genere: temi`, `nome` = la mia parola, `nato-da` = i frammenti-prova; poi
    un'operazione `lettura` (versione nuova, intera) per ogni lettura toccata, con il `parla-di` verso `@nome`. Mai un
    tema con una parola che non ho scritto prima della prima restituzione che la usa; mai su una persona `vita`.
A3. **Citazioni ⚠**: per ogni citazione senza `esito` (all'ingresso nascono tutte così: l'esito lo scrivi solo tu), la verifica (CLAUDE.md), un subagent ogni 3, ≤ 5 ricerche o 10
    minuti ciascuno. `aggiorna-nodo` con `esito`, `riferimento`, `originale`, `traduzione`, e `autore` solo se
    verificato. Se non trovi, resta ⚠.
A3b. **Da classificare** (schema 4, `progetto/sito/dimensioni.md`). Per ogni nodo nella sezione «Da classificare» di
    `mappa.md`, `aggiorna-nodo` con:
    - `tipo` per un'opera: dalle mie parole ("la canzone…"), o da una verifica rapida sul nome `mondo` (mai su persone
      `vita`). Nel dubbio, niente: resta in coda.
    - `specie` per un tema: `stato` se l'ho usato per dire come mi sento; `domanda` se è una domanda; `corrente` se è una
      scuola di pensiero o di stile; `simbolo` se è una cosa, un luogo o una figura usati come immagine; `stile` se è
      un'estetica grafica; altrimenti `idea`.
    - `campo`, 1–2 valori, per persone `mondo` e `finzione`, opere e correnti; mai per persone `vita` né per temi di
      altre specie. Su un nodo nato da un frammento delicato non ripreso («aspetta» in `mappa.md`), aspetta.
    Una volta sola per nodo: un valore scritto non si cambia, salvo una mia correzione (A5). Nessuna proposta, nessun
    segno nelle prose.
A4. **Contraddizioni e accoglienze.** Dove una posizione nuova urta una vecchia o lo sguardo: `contraddice` nella
    lettura nuova del frammento più recente, verso la mia frase più vicina e il `passo`. Di voce `sua` solo se il nuovo
    nega **con parole mie** un enunciato del vecchio ("camus si sbagliava"); se esito, `come: dubbio`; proposto da te è
    sempre `voce: proposta`. Mai due `contraddice` verso lo stesso `a`; mai su un legame che ho rifiutato negli ultimi 60
    giorni. Dove un mio pensiero torna **con altre parole** su una tua proposta (il caso Karamazov): `ritorna-su …
    come: accoglie` con `n`. Non conta averla letta né chiederne il perché.
A5. **Correzioni e tracce.** Per ogni `ritorna-su … come: corregge` in attesa: `aggiorna-nodo` sul `nodo` (in un campo
    lista il `vecchio` si sostituisce con il `valore`; `@Nome` fa nascere la persona giusta). Il `campo` della correzione
    può essere anche `tipo`, `specie`, `campo`: il valore nuovo è il `valore` (per `campo`, le voci separate da ", "; vuoto
    toglie il campo). **Non** riscrivere la
    lettura colpita. Risolvi le tracce in sospeso ("traccia 3"): un'opera con `in: album` solo se l'ho confermata.
A6. **Solo la prima domenica del mese: fusioni.** Dall'elenco dei temi di `mappa.md` (nome, alias, conteggio, tre frasi)
    proponi le fusioni ovvie: operazione `lapide` `{da, in, perche}`. Niente divisioni.
A7. `node scripts/contesto.mjs`: la `mappa.md` fresca, con i temi nuovi e le citazioni verificate. La fase B sceglie lì.

## Fase B: restituire
B1. **Proposte pronte.** Leggi `riserva/pronte.md`. Prepara al più una convergenza, un confronto
    (prompt/confronto.md, se c'è un `contraddice` fresco) e un sogno (prompt/sogno.md, solo se `mappa.md` dice sogno
    acceso e non c'è stato un sogno questo mese), e aggiungile al file. Togli quelle sbiadite (30 giorni attivi).
B2. **Lettera?** Tocca se, dall'ultima lettera, ci sono **≥ 2 frammenti parlanti**, oppure **≥ 1 e una proposta pronta
    da una notte precedente** (quella preparata stanotte in B1 non basta). Con 0 parlanti non arrivi qui: la domenica è
    muta (Apertura, punto 3).
    Se no: niente lettera, la proposta resta in attesa; vai a B4.
B3. **La lettera** (≤ 250 parole), un'operazione `restituzione` con `forma: lettera`:
    - in testa, sotto il titolo, la legenda in una riga (solo i segni usati);
    - apre con una mia frase ✦ del periodo, datata (voce `cosa: frase`);
    - i **ponti** della settimana, al più 2, con le mie frasi alla lettera e un luogo preciso;
    - **una sola cosa** tra convergenza, confronto e sogno, presa da `riserva/pronte.md` (e tolta da lì nella stessa
      operazione `riserva`);
    - al più **un ricordo** (prompt/ti-ricordi.md);
    - al più **un ◌** in tutta la lettera; una domanda solo se è un confronto; la domanda 1 dell'ingresso rimasta senza
      risposta può tornare, una volta;
    - chiude con la mia frase o con l'unica domanda: è l'ultima riga, dopo non c'è niente;
    - ogni ○ con opera e passo nel `riferimento` della sua voce, altrimenti la riga si toglie;
    - fuori: i delicati e i loro temi vicini (dillo nel `perche` di un legame, non nel testo), e niente "questa
      settimana" che li evochi; il seme ✧ su un nodo già usato; le immagini già usate; le domande in sospeso.
    - voci con `cosa` (frase, ponte, convergenza, confronto, sogno, ricordo…); legami `proposta` o `mondo` con `da: n`.
    Se `verifica.mjs` la rifiuta per un ritornello, riscrivi la frase colpita, una volta.
B4. **`riserva/ritorno.md`**: un'operazione `riserva` con **una** riga che rimanda all'ultima lettera o all'ultimo
    ritratto a cui non ho risposto (nessun mio frammento ci è tornato sopra, da `mappa.md`), per esempio "La lettera del
    29 novembre, sul masso e la discesa, è ancora lì." Se non ce n'è, il file vuoto. Mai un delicato, mai un sollecito.
B5. `node scripts/applica.mjs`, `node scripts/contesto.mjs`, `node scripts/verifica.mjs`,
    `node scripts/lucchetto.mjs lascia`, commit `consolida: settimana NN`, push.

## Messaggio finale
3–6 righe senza contenuto: frammenti letti, letture riscritte, temi nati, citazioni verificate, correzioni, fusioni,
proposte pronte, "lettera sì/no", pezzi saltati con il motivo. Nessuna notifica: la lettera la consegna "lettera".

## Limiti
Sessione madre ≤ 30k token; subagent ≤ 150k token e ≤ 60 file; 10–30 minuti. Mai letture v1 (tranne il giro di
smista del punto 5), mai `frammenti/` o restituzioni esistenti, mai risposte.

## Se qualcosa manca
- `mappa.md` senza la data dell'ultimo consolidamento: l'ultimo commit `consolida:` della cronologia.
- Nessuna vicenda, nessuna citazione ⚠, nessun `contraddice`: salta il passo, non inventare lavoro.
