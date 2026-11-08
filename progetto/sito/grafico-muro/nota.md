# Il muro: nota sul prototipo

**L'idea, in tre righe.** Tutti i concetti sono tessere su un muro continuo. Ogni tipo ha la sua sagoma: una canzone è un disco, un libro una copertina (da piccolo, un dorso), un film una pellicola, un sentimento una macchia di colore, una persona un medaglione, una domanda una tessera scura, una citazione un foglietto. La grandezza dice quante volte l'hai detto (✦ e ●, solo i parlanti). «Raggruppa per» ricompone il muro; i filtri spengono; il tempo lo fa crescere. Toccando una tessera arrivi a una tua frase datata, alla lettera.

File: `index.html`, standalone. Nessuna libreria, solo i font da Google Fonts. Dati sintetici, generati con un seme fisso, senza delicati e senza persone `vita`: con `?n=200` (predefinita), `?n=1000` o `?n=3000` nodi. Oltre ai circa 200 scritti a mano, i nodi sono inventati (titoli, persone, temi di fantasia), con una coda lunga alla Zipf: pochi molto detti, la maggior parte detta una volta. Peterson, Dostoevskij (*Delitto e castigo*, *I fratelli Karamazov*, *Memorie dal sottosuolo*), Marco Aurelio (*Pensieri*) e Camus (*Il mito di Sisifo*, *Lo straniero*) sono nodi forti, legati ad assurdo, colpa, ordine, responsabilità, stoicismo e mare; nessuna citazione è attribuita a loro, tranne il passo di Camus su «Ritorno a Tipasa» (○, resa mia); tutte le frasi sono inventate e confrontate con `frammenti/`, `letture/`, `restituzioni/`, `contesto/` e `CLAUDE.md` (nessuna sequenza di 5 parole in comune, a tutte e tre le misure). Foto in `foto/`, prima e dopo i giudici (sono le finali).

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

## Secondo giro: la scala
Misure con Playwright: telefono 390 px con CPU rallentata 4×, desktop 1440 px a piena velocità. Nella colonna «tessere», i nodi sul muro: le persone mai nominate e le ◌ restano fuori.

| misura | tessere | primo disegno tel / desk | riordino, fotogramma peggiore tel / desk | zoom, peggiore tel / desk | un filtro tel / desk | etichette sovrapposte |
|---|---|---|---|---|---|---|
| 200 | 168 | 0,73 s / 0,22 s | 150 ms / 17 ms | 200 ms / 50 ms | 38 / 15 ms | 0 |
| 1.000 | 812 | 1,16 s / 0,44 s | 550 ms / 67 ms | 150 ms / 100 ms | 186 / 53 ms | 0 |
| 3.000 | 2.381 | 2,14 s / 0,54 s | 900 ms / 150 ms | 900 ms / 83 ms | 755 / 107 ms | 0 |

Lo scorrimento resta a 54–60 fps a ogni misura. Prima delle correzioni, a 3.000 sul telefono, il primo disegno era a 9,6 s e il riordino si fermava 24 s. Che cosa si è rotto, e come l'ho corretto:
- il generatore contava i nodi a ogni giro, e il costo cresceva col quadrato;
- l'animazione FLIP chiedeva la posizione a ogni tessera, e così costringeva i blocchi fuori schermo a impaginarsi (3,5 s solo lì). Ora misura e anima soltanto le tessere vicine allo schermo, al più 260;
- i gruppi lunghi ora sono spezzati in blocchi di 160 tessere con `content-visibility: auto`;
- i conti dei filtri ora si fanno in una passata per asse, non per valore.

## Le anteprime: che cosa si vede quando non c'entra tutto
- **Budget.** Ogni schermata ha un numero massimo di nomi, contati tutti, anche quelli dentro le tessere: lo spazio sullo schermo diviso lo spazio di un'etichetta, a una densità leggibile. Sono circa 8 sul telefono e 30 sul desktop a «nomi»; a «insieme» poco di più, a «frasi» di meno.
- **Le tessere giganti** (3×3 celle e oltre) tengono sempre il nome e lo pagano per prime.
- **Il resto del budget** si riempie per ogni banda alta una schermata, con un campionamento pesato e con seme (Efraimidis–Spirakis):
  - circa 20% «di recente»: le menzioni degli ultimi 30 giorni;
  - circa 20% «coda lunga»: le cose che non riaffiorano da più di 60 giorni, più pesanti quanto più vecchie;
  - il resto ai «tuoi forti», con le menzioni ✦● e un decadimento di un anno.

  Ciò che una quota non riempie passa ai forti, e nessun gruppo prende più di un terzo del budget.
- **Seme**: il giorno locale (con `?giorno=` per le foto) più il numero di rimescoli. Lo stesso giorno dà la stessa anteprima, e il giorno dopo ne dà un'altra. **⟳ rimescola** cambia il seme e non sposta niente: ho verificato che le posizioni sono identiche prima e dopo e che l'evidenza cambia.
- **Fuori dal budget** la tessera tiene forma e colore e perde solo il testo: lo spento resta solo dei filtri. Le tessere piccole scelte prendono una pillola scura dentro il loro bordo basso, posata senza collisioni con la misura vera del testo: 0 sovrapposizioni a tutte le misure e a tutti gli zoom.
- **Esclusi**: mai i delicati, mai le persone `vita` (nei dati non ci sono), mai le ◌ con la lente spenta.
- **«perché lo vedo?»** nella scheda risponde in una riga: «Tra i recenti di oggi: l'hai detto il 1 novembre.»

## Esplorabilità a 3.000
Verificata con Playwright sul telefono:
- **la lente in alto** («vai a») trova *I fratelli Karamazov* in due gesti: la lente, poi il risultato. Se la cosa è spenta dai filtri, riporta al muro intero;
- **dai vicini e indietro**: dalla scheda ai vicini (Dostoevskij), poi con il tasto indietro del browser si torna ai Karamazov e poi al muro chiuso. L'hash va nella storia, e il filo resta nella scheda.

Il secondo giro dei due giudici ha fatto cambiare:
- il budget, che ora conta tutti i nomi;
- la desaturazione fuori budget, tolta perché si confondeva con lo spento dei filtri;
- le pillole, ora scure e ancorate dentro la tessera;
- «perché lo vedo?», ora detto in parole umane;
- i glifi, che coprivano la frase;
- il medaglione di Peterson;
- il conto di «vai a», ora uguale a quello della tessera.

## Che cosa resta debole
- **«Insieme» non è un vero colpo d'occhio.** Sul telefono il minimo di 44 px al dito lascia vedere una decina di tessere; a 3.000 il muro si scorre, non si abbraccia. Servirebbe un livello lontano a celle piene per gruppo, non toccabili una per una, con «+120 libri».
- **Le tessere grandi sono sempre le stesse.** Il seme ruota i nomi delle medie e delle piccole; le giganti e le posizioni restano, per scelta, perché l'orientamento non cambi.
- **I numeri peggiori a 3.000, telefono 4×**: primo disegno 2,1 s; fotogramma peggiore di riordino e zoom 0,9 s; un filtro 0,76 s.
- **La grandezza tra forme diverse.** Un cerchio o una macchia, a parità di celle, pesano meno di un quadrato pieno. La scala vale per celle, non per area d'inchiostro.
- **I fili.** Ora passano sotto le tessere e sono al più 8, ma restano visibili solo negli spazi tra le tessere. Sono leggibili nel gruppo «intorno», ma non c'è una vista a rete del muro intero.
- **Le ◌ stanno in coda al loro gruppo.** Non stanno vicino alle frasi da cui nascono.
- **Il generatore di frasi** produce un italiano a volte meccanico («c'entra il silenzio»). I dati veri non avranno questo difetto.
- **La tastiera.** Le tessere sono pulsanti (Tab, Invio, Esc), ma l'ordine di tabulazione segue il DOM e non la geometria del muro.
