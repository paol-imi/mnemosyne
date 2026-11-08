# Il cielo: nota sul prototipo

Prototipo standalone: `index.html` (d3@7.9.0 da jsdelivr, font Google; nessun'altra chiamata). Dati **sintetici**:
183 nodi e 388 frammenti di base, con 8 proposte ◌ e un ●. Non ci sono delicati né persone `vita`. `?n=1000` e
`?n=3000` aggiungono nodi inventati (nomi, titoli e temi generati) per la prova di scala. Le foto sono in `foto/`:
10 stati per telefono (390×844) e desktop (1440×900), più le foto `scala-*` per le tre misure.

## L'idea, in tre righe
Il Firmamento dell'Atlante, rovesciato. Al centro del cielo ci sono le tue parole, cioè i temi ✦; intorno, le dieci
regioni del campo. La luce dice quante volte hai detto una cosa, e ogni stella porta a una tua frase datata, in
corsivo e alla lettera. All'apertura, in basso, c'è già la tua frase più recente: la prima cosa che vedi è tua.

## I gesti
- **Pan e pinch** (rotella sul desktop, frecce e `+ −` da tastiera). Lo zoom è semantico, su 4 distanze: regioni,
  temi, nomi, frasi. I quattro tasti in alto portano a ciascuna distanza.
- **Tocco su una stella**: si accende la costellazione e la vista la inquadra. Il foglio sale dal basso (sul desktop
  è una scheda a destra), con la frase ✦, le altre frasi, il seme ✧ a parte, il ○ con opera e passo oppure il ⚠,
  «perché lo vedo?» e i vicini come pastiglie («e altri N» se sono tanti).
- **Cerca e vai** (`⌕ cerca`, o il tasto `/`): scrivi qualche lettera e premi Invio, e vai al nome che comincia così
  e che hai detto più spesso. Sono due gesti. La ricerca trova anche le frasi, alla lettera.
- **Indietro**: ogni nodo aperto è una voce della cronologia, e il tasto indietro del browser riporta al nodo prima.
  Il **filo** tiene in alto i nodi visitati, uniti sulla mappa da una linea punteggiata.
- **Rimescola**: un'altra anteprima, cioè altri nomi in evidenza; le stelle non si muovono. **Salto**: una stella a caso.
- **I filtri** stanno sulla mappa, negli assi in basso: dentro un asse le scelte valgono in O, tra assi in E. Il resto
  del cielo si spegne ma non sparisce. **Il tempo**: un cursore con ▷ fa nascere le stelle mese per mese.
- **◌ proposte**: un interruttore, spento di default.

## Le anteprime: che cosa si vede quando non c'entra tutto
La regola è la stessa per ogni distanza:
1. **Budget.** I nomi in evidenza sono proporzionali all'area libera dello schermo: un nome ogni 26.000 px² da
   lontano (al più 7 sul telefono, 14 sul desktop), uno ogni 14.000 ai temi (al più 16 e 36), uno ogni 6.000 ai nomi.
   Le frasi sono da 4 a 8. I primi 8 nomi dell'anteprima sono più grandi, gli altri piccoli e più quieti. Il nodo
   aperto e i suoi vicini hanno sempre il nome, fuori budget.
2. **I fissi.** Le quattro cose che dici di più (non le raccolte) sono sempre in evidenza, fuori dal sorteggio: oggi,
   con i dati di base, sono i tuoi quattro autori: Dostoevskij, Camus, Marco Aurelio e Peterson.
3. **Campionamento pesato e con seme.** Il resto del budget si riempie alternando tre code nel ritmo forte, forte, forte,
   recente, coda (circa 60/20/20):
   - **forti**: il peso è la somma delle frasi ✦●, ciascuna con un decadimento lento (e^(−giorni/540));
   - **recenti**: le frasi degli ultimi 30 giorni;
   - **coda lunga**: le cose tue che non nomini da più di 120 giorni, con un peso che cresce con l'assenza.
   Dentro ogni coda il sorteggio è pesato (Efraimidis–Spirakis): più peso, più probabilità, mai certezza.
4. **Quota per gruppo.** Al più un terzo del budget per gruppo (la specie per i temi, il campo per il resto), così una
   regione non si prende tutto.
5. **Il seme è la data**: ogni giorno un'anteprima diversa, stabile per tutta la giornata. «Rimescola» cambia il seme.
6. **Le posizioni non cambiano mai**: il layout ha un seme fisso ed è salvato nel browser. Al rimescolo cambia solo
   chi ha il nome. Nella prova a 3.000 nodi, al rimescolo, sono rimasti in comune 2 nomi su 16, con le posizioni identiche.
7. **Mai** il ◌ a lente spenta; i delicati e le persone `vita` non sono nei dati, e nella versione vera escono prima del
   campionamento.
8. **«Perché lo vedo?»**, nella scheda, dice in una riga da quale coda viene: «Sempre in evidenza: è tra le quattro
   cose che dici di più (24 volte).», «In evidenza tra i tuoi forti: detto 5 volte.», «Dalla coda lunga: non lo nominavi dal 3 giugno 2026.», oppure «Non era tra i nomi in evidenza: ci
   sei arrivato tu.».

Con tanti nodi, da lontano i nodi poco detti diventano **polvere**, cioè un punto. La soglia è relativa: alla distanza
delle regioni ha forma il 3% più detto, a quella dei temi il 20%, e l'alone spetta solo ai 15 più detti in vista. Da
lontano un nome non passa mai sopra una stella. Alla distanza dei temi può passarci, ma su un velo scuro; mai sopra un
altro nome. I nomi delle regioni stanno attaccati ai loro nodi luminosi, 24 px verso l'esterno.

## La prova di scala (Chromium headless su CPU, senza GPU: numeri pessimisti)
| nodi · frasi | schermo | primo disegno | di cui layout | un fotogramma, mediana · p95 | nomi per distanza (sovrapposti) |
|---|---|---|---|---|---|
| 183 · 388 | 390 | 0,50 s | 0,46 s | 1,7 · 2,4 ms | 11 · 13 · 22 · 21 (0) |
| 183 · 388 | 1440 | 0,61 s | 0,55 s | 1,6 · 3,1 ms | 17 · 43 · 44 · 39 (0) |
| 1.001 · 1.677 | 390 | 0,42 s | 0,36 s | 3,0 · 4,0 ms | 16 · 26 · 11 · 25 (0) |
| 1.001 · 1.677 | 1440 | 0,39 s | 0,35 s | 3,0 · 5,2 ms | 25 · 46 · 90 · 73 (0) |
| 3.001 · 4.759 | 390 | 1,51 s | 1,43 s | 7,8 · 10,6 ms | 16 · 26 · 10 · 17 (0) |
| 3.001 · 4.759 | 1440 | 1,70 s | 1,61 s | 7,6 · 10,4 ms | 25 · 46 · 80 · 82 (0) |

Il conto dei nomi comprende i nomi delle regioni e i riquadri delle frasi. Il primo disegno è quello della prima visita:
dalla seconda il layout viene dalla cache del browser e non si ricalcola.

Il gesto (90 fotogrammi di pan e zoom, ciascuno con il suo disegno) resta sotto i 16,7 ms, quindi a 60 fps, a ogni
misura. Prima delle correzioni, a 3.000 nodi, il primo disegno richiedeva 24,6 s (una simulazione di forze da 420 passi
a 41 ms l'uno) e le regioni erano macchie piene.

Che cosa si è rotto e come l'ho corretto:
- **Layout lento**: un innesco a girasole intorno alle ancore (i più detti al centro del gruppo), 70 passi senza
  repulsione oltre 800 nodi, e la cache nel browser.
- **Regioni a macchia**: la polvere, con la soglia relativa, e gli aloni pre-disegnati (un'immagine per colore).
- **Stelle accavallate da vicino**: le distanze dello zoom crescono con la scala del cielo, e la grandezza dei nodi ha un
  tetto.
- **Etichette lente**: la collisione passa da una griglia spaziale; i legami vanno in un solo tracciato; i conti dei
  filtri si fanno in un solo passaggio; liste e chip si tagliano a 60 (la ricerca trova il resto).

## Gli autori che ami
Jordan Peterson (psicologia), Fëdor Dostoevskij (*Delitto e castigo*, *I fratelli Karamazov*, *Memorie dal
sottosuolo*, *L'idiota*), Marco Aurelio (*Pensieri*, i *Colloqui con sé stesso*), Albert Camus (*Il mito di Sisifo*,
*Lo straniero*). Sono nodi forti (14–17 frasi ✦ con le loro opere), legati ai temi assurdo, colpa, responsabilità,
disciplina e stoicismo. Le loro frasi ✦ sono inventate. I ○ sono solo passi noti con il luogo esatto: Camus, *Il mito
di Sisifo*, ultima riga; Dostoevskij, *L'idiota*, III, 5; Marco Aurelio, *Pensieri*, VII, 21 (resa mia). Per Peterson
nessuna citazione.

## Come ogni asse diventa visivo
| asse | come si vede |
|---|---|
| Cose (genere e tipo) | **forma**: stella = tema, disco = opera con il glifo del tipo (da «nomi»), anello = persona (sottile e con un punto se è un personaggio), rombo = citazione, esagono = raccolta |
| Temi (specie) | luminosità delle stelle, quasi bianche e appena tinte: la tinta forte è riservata ai campi |
| Campo ◌ | **posizione** (la regione) e **colore** (nebulosa e tinta); la legenda dice che è ◌ |
| Gesto | solo nei filtri: è un fatto della frase, non del nodo |
| Tempo | la nascita delle stelle, con il cursore |
| la voce | ✦ luce piena con alone; ● stella con il cuore scuro; ◌ cerchio tratteggiato, solo con la lente; ⚠ triangolo ambra. Nessun rosso |

## Che cosa hanno fatto cambiare i giudici
Primo giro (7/10 utente, 6/10 designer): la tua frase all'apertura; segnavia delle regioni al bordo; inquadratura della
costellazione; etichette fuori dai comandi; tinte e contrasto; filtri come pastiglie removibili.

Secondo giro, sulla scala (6/10 tutti e due, prima di queste correzioni):
- i quattro più detti sono fissi: i tuoi autori non spariscono nel sorteggio (utente);
- alla distanza dei temi, il budget è dimezzato e ha una gerarchia di corpo (i due);
- niente nomi sopra le stelle da lontano, e un velo sotto i nomi alla distanza dei temi (designer);
- i nomi delle regioni sono attaccati ai loro gruppi; le tinte dei campi sono più distinte (cinema e mito, letteratura
  e scienza erano gemelle) (designer);
- la polvere al 3° percentile, gli aloni ai soli 15 più detti, da 4 a 8 frasi da vicino (i due);
- «perché lo vedo?» su una riga sua.
Il terzo giro di foto non è stato rigiudicato.

## Che cosa resta debole
- Sul telefono il foglio aperto copre il dock: per filtrare bisogna chiuderlo.
- Con migliaia di temi il centro resta un ammasso: andrebbe diviso per specie in sotto-ammassi.
- Da lontano, con tanti nodi, un nome sopra una stella si legge grazie all'ombra, ma resta meno pulito.
- Le frasi e i nomi generati suonano meccanici; servono solo a misurare.
- L'accessibilità del canvas passa da «cerca»: da tastiera non si va di stella in stella.

## Le prove
In `prove/`, con Playwright: `scala.js` (foto e misure alle tre misure), `esplora.js` (rimescola, cerca e vai, vicino e
indietro, «perché lo vedo?»), `conf.js [n]` (il confronto a 5 parole di tutte le frasi sintetiche con `CLAUDE.md`,
`frammenti/`, `letture/`, `restituzioni/`, `contesto/`, `riserva/` e il vecchio prototipo: 0 coincidenze a 200, 1.000
e 3.000 nodi).
