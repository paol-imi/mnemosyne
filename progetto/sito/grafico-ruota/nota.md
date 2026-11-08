# La ruota e le tavole

**L'idea.** Una ruota ad anelli, uno per asse. Si gira col dito, e ciò che si ferma sulla linea di mezzogiorno si
allinea. Il foglio mostra la tua frase ✦ che tiene insieme quelle cose. Toccando un nodo, l'anello lo porta a mezzogiorno
e si apre la sua Tavola: un piano scuro alla Warburg con biglietti di frasi, opere, persone e citazioni ○, e i fili tra
loro.

Il file è uno solo (`index.html`), senza librerie: SVG scritto a mano e font da Google Fonts. I dati sono sintetici, senza
delicati e senza persone `vita`. Tutte le frasi sono inventate. Il confronto con l'intero repository (`frammenti/`,
`CLAUDE.md`, il vecchio prototipo) dà **0 sequenze di 5 parole in comune** a ognuna delle tre misure.

## I gesti
- **Trascinare un anello** lo gira; quando lo lasci si ferma con un nodo esattamente a mezzogiorno.
- **Il centro («gira»)** porta le ruote su una frase tua vera.
- **Toccare un nodo** lo porta a mezzogiorno e apre la Tavola.
- **Pizzico, rotella, + e −** cambiano lo zoom, che è semantico. Sul telefono la ruota si apre già vicina, sulla metà
  alta.
- **Il nome di un anello** apre il suo vassoio di filtri: dentro un anello le scelte si sommano (O), tra anelli diversi
  si incrociano (E).
- **Il tempo** ha tre comandi: le barre dei mesi, il cursore «fino a» e ▶, che fa crescere la ruota.
- **«vai a un nome…»** (nuovo): scrivi e tocchi, cioè due gesti, e la cosa arriva a mezzogiorno. La ricerca guarda nomi
  e alias, per esempio *Colloqui con sé stesso* → *Pensieri*.
- **I vicini** (nuovo): nel foglio di un nodo ci sono le 6 cose che stanno più spesso nelle stesse frasi tue. Un tocco e
  ci sei.
- **Indietro** (nuovo):
  - l'indirizzo tiene `#nodo=ID` o `#tavola=ID`;
  - il tasto indietro del browser ripercorre i passi;
  - il Filo nella Tavola tiene gli ultimi 8 passi.
- **«rimescola» e «perché lo vedo?»**: vedi la regola delle anteprime, più sotto.

## Gli assi in forma visiva
| anello | forma | colore | luce |
|---|---|---|---|
| gesto | archi | indaco | opacità = numero di frasi |
| sentimenti | punti | malva | grandezza = log(frasi ✦●) |
| temi | punti per specie | ocra | grandezza |
| campo ◌ | archi sottili | grigio, al 50% | — |
| persone | punti per campo | verde acqua | grandezza |
| cose | 5 forme: suono ●, pagina ■, schermo ▲, altro ◆, citazione ❞; ⚠ ambra | blu | grandezza |
| tempo | archi dei mesi | seppia | opacità = numero di frasi |

L'alone va solo ai più forti e a ciò che è allineato. Ciò che non passa un filtro resta al suo posto, al 22%. Il ◌ è
spento di default. Il rosso non c'è. Il ○ compare solo nella Tavola, con opera e passo.

## La regola delle anteprime (quando non c'entra tutto)
1. **Budget.** Ogni anello ha un budget di glifi: lo spazio d'arco visibile sullo schermo diviso per 15 px sul telefono
   e 17 px sul desktop. Due glifi accesi non stanno mai più vicini di uno spazio. Avvicinandosi il budget cresce e si
   accendono altre cose nel tratto che guardi.
2. **I 3 più detti** di ogni anello, tra quelli che si vedono, sono sempre accesi.
3. **Il resto del budget** si riempie con un campionamento pesato e con seme (Efraimidis–Spirakis):
   - ~60% **forti**: le menzioni ✦●, ciascuna pesata per e^(−età/240 giorni);
   - ~20% **recenti**: le menzioni degli ultimi 30 giorni;
   - ~20% **coda lunga**: cose tue che non ritornano da più di 45 giorni, con un peso che cresce con l'assenza;
   - al più il 40% del budget va a un solo gruppo dell'anello (un tipo, una specie, un campo).
4. **Il seme è la data**: l'anteprima cambia ogni giorno ed è stabile per tutta la giornata. **«rimescola»** cambia il
   seme: a 3.000 nodi si rinnovano 69 accesi su 100. **Le posizioni non cambiano mai.**
5. **Il resto è polvere.** Ciò che non è acceso resta un granello di 2 px al suo posto. Al bordo interno di ogni anello
   una tacca ogni 2° dice quante cose ci sono: si vede dove l'anello è denso.
6. **«perché lo vedo?»** dice in una riga da dove viene un nodo acceso: tra i 3 più detti, sorteggiato tra i forti, tra
   i recenti o dalla coda lunga, oppure portato lì da te.
7. **«affiora oggi»**, in testa al foglio, è una cosa della coda lunga del giorno, con la tua frase più recente su di lei.
8. **Esclusi sempre**: i delicati, le persone `vita` e il ◌ quando la lente è spenta.

## La prova di scala
Si sceglie con `?n=200` (predefinito), `?n=1000` o `?n=3000`.
- **Dati.** 235 nodi e 452 frammenti; 1.000 e 2.217; 3.000 e 6.217. Le menzioni seguono una legge di potenza: a 3.000
  nodi, 1.944 sono detti una volta sola, mentre *I fratelli Karamazov* ha 56 frasi e Marco Aurelio 203.
- **Gli autori amati** (Peterson, Dostoevskij, Marco Aurelio, Camus) hanno 5 o 6 frasi inventate a testa e pesano di più nel
  sorteggio dei dati. Nessuna citazione nuova è attribuita a loro: restano solo i due ○ veri e noti, *Pensieri* V 20 e
  l'ultima riga del *Mito di Sisifo*.

Misure su Chromium headless, CPU (telefono 390 px / desktop 1440 px):

| nodi | primo disegno | etichette (sovrapposte) | glifi accesi (sovrapposti) | fps zoom | fps giro | ricalcolo dell'evidenza | elementi SVG |
|---|---|---|---|---|---|---|---|
| 200 | 349 / 241 ms | 31 (0) / 49 (0) | 105 (0) / 204 (0) | 61 / 61 | 60 / 60 | 3 / 5 ms | 672 / 771 |
| 1.000 | 300 / 366 ms | 34 (0) / 48 (0) | 111 (1) / 202 (3) | 60 / 60 | 60 / 60 | 8 / 15 ms | 799 / 778 |
| 3.000 | 448 / 487 ms | 33 (1) / 48 (0) | 110 (0) / 212 (2) | 59 / 54 | 60 / 59 | 19 / 22 ms | 829 / 811 |

Che cosa si rompeva e che cosa è cambiato:
- **Elementi SVG.** Con 3.000 glifi la ruota sarebbe stata un muro di elementi. Ora si disegnano solo quelli in
  evidenza, mai più di circa 830 elementi in tutto; la polvere sta in un solo tracciato per anello.
- **Giro a 35 fps.** A ogni fotogramma si ricalcolava la convergenza su 6.000 frasi. Ora ci sono una cache, un indice
  nodo→frasi, una ricerca binaria del mezzogiorno e granelli quadrati, più veloci da disegnare: si torna a 59–60 fps.
- **Glifi ammucchiati** al centro dei gruppi: ora c'è una distanza minima tra due glifi accesi.
- **Spazio tra i gruppi.** Con mille nodi spariva: ora vale almeno l'1,2% del giro.

## I giudici
- **Primo giro**: la scala del telefono, il filtro che spegneva tutto, il vicolo cieco del tempo, la quiete del ◌, le 5
  forme.
- **Secondo giro, l'utente**:
  - Marco Aurelio non si vedeva proprio quando aveva più frasi: ora i 3 più detti sono fuori dal sorteggio;
  - «perché lo vedo?» era generico: ora dice il motivo vero;
  - sul telefono persone e cose erano senza nomi: ora i nomi si girano verso l'interno vicino al bordo;
  - il foglio diceva sempre la stessa frase: ora in testa c'è «affiora oggi».
- **Secondo giro, il designer**:
  - la densità non si vedeva: ora ci sono le tacche, e la polvere è più leggibile;
  - niente nomi entro ±12° dal mezzogiorno, perché si confondevano con i nomi degli anelli;
  - il foglio non copre più la ruota dopo una ricerca.

## Che cosa resta debole
- **Il glifo non dice la quota.** Il designer proponeva pieno per forte, anello per recente, puntino per coda: non è
  fatto, e la quota la dice solo «perché lo vedo?».
- **A ruota intera sul telefono** i 44 px veri si hanno solo da vicino. La «fisarmonica» dell'anello toccato non è fatta.
- **Le frasi generate** (oltre il 90% a 3.000 nodi) si riconoscono, e i titoli inventati a volte suonano strani.
- **Il primo disegno** è di circa 0,5 s a 3.000 nodi. Con dati veri il sito leggerà un JSON già pronto, non lo genererà.
- **Le misure** vengono da Chromium headless senza GPU: su un telefono vero vanno ripetute.
