# Il cielo: nota sul prototipo

Prototipo standalone: `index.html` (d3@7.9.0 da jsdelivr, font Google; nessun'altra chiamata). Dati **sintetici**:
170 nodi e 331 frammenti, con 8 proposte ◌ e un ●. Non ci sono delicati né persone `vita`. Le foto sono in `foto/`:
8 stati per il telefono (390×844) e 8 per il desktop (1440×900).

## L'idea, in tre righe
Il Firmamento dell'Atlante, rovesciato. Al centro del cielo ci sono le tue parole, cioè i temi ✦; intorno, le dieci
regioni del campo. La luce dice quante volte hai detto una cosa, e ogni stella porta a una tua frase datata, in
corsivo e alla lettera. All'apertura, in basso, c'è già la tua frase più recente: la prima cosa che vedi è tua.

## I gesti
- **Pan e pinch** (rotella sul desktop, frecce e `+ −` da tastiera). Lo zoom è semantico, su 4 distanze:
  - **regioni**: i nomi dei campi grandi, più i 5–8 temi più detti;
  - **temi**: i temi e le opere;
  - **nomi**: anche persone e citazioni;
  - **frasi**: accanto a ogni stella la tua frase più recente, datata.
  I quattro tasti in alto portano a ciascuna distanza.
- **Tocco su una stella** (bersaglio di 22 px di raggio): si accende la costellazione, cioè le linee verso tutto ciò che
  vi è legato, e la vista la inquadra. Il foglio sale dal basso (sul desktop è una scheda a destra). Contiene: la frase
  ✦, le altre frasi, il seme ✧ a parte, il ○ con opera e passo oppure il ⚠, e i vicini come pastiglie che portano
  oltre.
- **Il filo**: i nodi visitati restano uniti da una linea punteggiata e elencati in alto.
- **Salto**: vai a una stella a caso tra quelle accese.
- **I filtri** sono sulla mappa. Le schede degli assi in basso (cose, persone, temi, campo ◌, gesto) aprono una fila di
  valori con il conto. Dentro un asse le scelte valgono in O, tra assi in E. Il resto del cielo si spegne ma non
  sparisce, la vista inquadra le stelle accese, e i filtri attivi diventano pastiglie con ×.
- **Il tempo**: «tempo» apre un cursore e ▷. Le stelle nascono nel mese in cui le hai nominate, con un anello che si
  allarga; il cursore dice quante stelle ci sono e quante sono nuove.
- **◌ proposte**: un interruttore in alto, spento di default.
- **Elenco**: l'alternativa testuale al canvas, con la ricerca alla lettera anche dentro le frasi.
- **Indirizzo**: `#nodo=…&temi=…&fino=2026-02&lente=proposte`.

## Come ogni asse diventa visivo
| asse | come si vede |
|---|---|
| Cose (genere e tipo) | **forma**: stella = tema, disco = opera con il glifo del tipo (nota, libro, triangolo del film…, visibile da «nomi»), anello = persona (sottile e con un punto se è un personaggio), rombo = citazione, esagono = raccolta |
| Temi (specie) | luminosità delle stelle, quasi bianche e appena tinte: la tinta forte è riservata ai campi |
| Campo ◌ | **posizione** (la regione) e **colore** (nebulosa e tinta del nodo); la legenda dice che è ◌ |
| Persone | anelli nella regione del loro campo, legati alle loro opere |
| Gesto | solo nei filtri: non ha forma, perché è un fatto della frase e non del nodo |
| Tempo | la nascita delle stelle, con il cursore |
| la voce | ✦ è luce piena con alone; ● è una stella con il cuore scuro; ◌ è un cerchio tratteggiato grigio-azzurro all'60% di opacità, presente solo con la lente; ⚠ è un triangolo ambra accanto al rombo. Nessun rosso |
| frequenza | grandezza e alone, contati sulle frasi ✦ fino al mese scelto |

## Che cosa hanno fatto cambiare i giudici
Primo giro: 7/10 per l'utente, 6/10 per il designer.
- La tua frase all'apertura, al posto della scritta «le tue parole» (utente).
- Le regioni da vicino non sono più scritte fantasma sotto le stelle: diventano **segnavia al bordo** con la freccia
  verso la regione fuori campo (designer). Da lontano le etichette stanno fuori dai nodi, e le regioni con pochi nodi
  sono più tenui.
- Al tocco la vista inquadra il nodo e i suoi vicini nello spazio lasciato dal foglio, e i vicini hanno il nome.
- Le etichette non finiscono più sotto i comandi né sotto il foglio.
- Le specie dei temi non usano più tinte che si confondevano con i campi. I glifi compaiono solo da vicino, e al
  livello «temi» non ci sono più i legami lunghi.
- Le date sono più grandi e più chiare, le etichette ◌ sono leggibili, il conteggio è più corto sul telefono, il mese
  non compare più due volte, e i filtri attivi sono pastiglie removibili.
- I memo sintetici non si ripetono più: un modello si usa una volta per nodo.

## Che cosa resta debole
- Sul telefono il foglio aperto copre il dock: per filtrare bisogna chiuderlo.
- Da lontano il centro è denso; con 180 temi veri andrebbe diviso per specie in sotto-ammassi.
- I segnavia possono comparire anche per una regione in parte visibile, perché il suo baricentro è fuori campo.
- Le frasi sintetiche costruite da modelli suonano a volte meccaniche; quelle scritte a mano, prese dal prototipo,
  reggono meglio.
- Il layout è una simulazione di forze con seme fisso: con i dati veri andrà fissato e salvato, perché le stelle non
  si spostino da una sera all'altra.
- L'accessibilità del canvas passa dall'Elenco: da tastiera non si va di stella in stella.
