# Il muro: nota sul prototipo

**L'idea, in tre righe.** Tutti i concetti sono tessere su un muro continuo. Ogni tipo ha la sua sagoma: una canzone è un disco, un libro una copertina (da piccolo, un dorso), un film una pellicola, un sentimento una macchia di colore, una persona un medaglione, una domanda una tessera scura, una citazione un foglietto. La grandezza dice quante volte l'hai detto (✦ e ●, solo i parlanti). «Raggruppa per» ricompone il muro; i filtri spengono; il tempo lo fa crescere. Toccando una tessera arrivi a una tua frase datata, alla lettera.

File: `index.html`, standalone. Nessuna libreria, solo i font da Google Fonts. Dati sintetici: 179 nodi (14 sono temi dedotti ◌) e 382 frammenti generati con un seme fisso, senza delicati e senza persone `vita`; tutte le frasi sono inventate e confrontate con `frammenti/`, `letture/`, `restituzioni/`, `contesto/` e `CLAUDE.md` (nessuna sequenza di 5 parole in comune). Foto in `foto/`, prima e dopo i giudici (sono le finali).

## I gesti
- **Raggruppa** (barra in alto): tutto · cose · persone · temi · campo ◌ · gesto · tempo. Le tessere volano al loro gruppo con un'animazione FLIP. Ogni gruppo ha un titolo grande.
- **Filtra**: sul telefono un foglio dal basso, e il muro resta visibile sopra e cambia dal vivo; sul desktop una colonna fissa a sinistra. Dentro un asse le scelte sono in O, tra assi diversi in E. Accanto a ogni valore c'è il numero di frasi che restano. Le tessere fuori si spengono senza sparire, le scelte prendono un anello, e le chip attive si tolgono con ×. C'è anche «la parola», una ricerca alla lettera.
- **Tocco su una tessera**: la tessera cresce e le legate le si raccolgono intorno («intorno a X»). Fili sottili le collegano; lo spessore è il numero di frasi in comune. Si apre la scheda:
  - in testa, la tua frase ✦ più recente, datata e in corsivo;
  - poi le altre tue frasi;
  - il ○ con opera e passo, oppure ⚠;
  - le ◌, se la lente è accesa;
  - le legate, poi il filo dei passi fatti;
  - un pulsante, «accendi solo ciò che tocca X».
- **Zoom semantico** a tre livelli, insieme · nomi · frasi: con i pulsanti −/+, con il pizzico o con ctrl+rotella. Le etichette compaiono quando c'è spazio (container queries): da lontano solo i nomi grandi, da vicino la frase dentro la tessera.
- **Tempo**: il cursore «il muro fino a…» e ▶, che lo fa crescere mese per mese. «Raggruppa per tempo» diventa una striscia orizzontale. Ogni mese mostra ciò che hai detto quel mese, con grandezza e numero del mese e la scritta «nuova» la prima volta.
- **Un muro per raccolta**: dalla scheda di «tatuaggi», il pulsante «apri il muro per i tatuaggi». È lo stesso muro, con solo quelle frasi.
- Ogni stato ha un indirizzo (`#per=temi&temi=t:malinconia&nodo=…&fino=2026-05&lente=proposte`). Esc chiude.

## Come ogni asse diventa visivo
| asse | forma | colore | posizione | luce |
|---|---|---|---|---|
| Cose (tipo) | una sagoma per tipo, 11 tipi | una famiglia di tinte per tipo: canzoni blu, album verde acqua, libri copertine sobrie | gruppo per tipo | ✦ piena |
| Persone | medaglione con monogramma; una figura ha un anello d'oro su fondo notte | seppia | il gruppo di una persona raccoglie le sue opere e citazioni | chi non nomini mai (solo autore) compare solo raggruppando per persone |
| Temi (specie ◌) | sentimento: macchia; idea: un segno a inchiostro diverso per ogni idea; domanda: tessera scura; simbolo: glifo; corrente: colonna; stile: campione | ogni sentimento ha il suo colore | gruppo per specie, titolo con ◌ | — |
| Campo ◌ | — | — | gruppo con ◌ nel titolo | — |
| Gesto | — | — | gruppo per il gesto più frequente | — |
| Tempo | — | — | colonne per mese; cursore | ciò che non era ancora detto non c'è |
| Voce | ✦ e ● piene, con ● nell'angolo; ◌ tratteggiate, 2×1, grigie | ⚠ su sabbia, mai rosso | ◌ in coda | ◌ spente di default |

Il rosso non c'è: non è né un segnale né una decorazione.

## Che cosa hanno fatto cambiare i giudici
- **Il designer**:
  - i numeri si contraddicevano (Nick Drake 18 nei filtri e 4 sulla tessera; 152 cose contro 166). Ora la tessera dice «✦ 4 · 18 con le opere», e gli autori mai nominati si contano a parte;
  - nella striscia ogni tessera ripeteva il totale. Ora porta il conto del mese;
  - il ◌ della specie, scritto minuscolo, sembrava un ○. L'ho tolto dalla microscritta e la legenda dice «◌ mie proposte»;
  - le ◌ erano mute. Ora hanno il nome;
  - i bersagli scendevano a 32 px. Ora sono ≥ 44 px al dito;
  - la barra non diceva di scorrere. Ora c'è la freccia «›».
- **L'utente**:
  - «mai una tessera muta»: le tessere 1×1 ora hanno il nome, i dorsi il titolo e il desktop il `title`;
  - «voglio i fili come la Ruota»: ora ci sono i fili dalla tessera aperta;
  - «lo stesso cerchio per tre idee»: ora c'è un segno diverso per ogni idea;
  - la frase si sovrapponeva al titolo di un libro: corretto;
  - nella striscia le tessere erano ripetute e uguali. Ora hanno grandezza e conto del mese.

## Che cosa resta debole
- **La vista «insieme» sul desktop.** Le tessere più piccole (34 px) restano monogrammi o dorsi tagliati, con il nome solo al passaggio del mouse. Manca l'accorpamento in «+12 libri».
- **La grandezza tra forme diverse.** Un cerchio o una macchia, a parità di celle, pesano meno di un quadrato pieno. La scala vale per celle, non per area d'inchiostro.
- **I fili.** Stanno sopra le tessere e attraversano le vicine. Sono leggibili nel gruppo «intorno», ma non c'è una vista a rete del muro intero.
- **Le ◌ stanno in coda al loro gruppo.** Non stanno vicino alle frasi da cui nascono.
- **Il generatore di frasi** produce un italiano a volte meccanico («c'entra il silenzio»). I dati veri non avranno questo difetto.
- **La tastiera.** Le tessere sono pulsanti (Tab, Invio, Esc), ma l'ordine di tabulazione segue il DOM e non la geometria del muro.
