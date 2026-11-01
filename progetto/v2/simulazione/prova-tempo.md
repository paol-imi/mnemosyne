# Prove di tempo e uso (T01–T10) sul modello v3

> Simulazione v4, 2026-10-31. Proposta di Claude, da validare. Esegue le dieci prove T del
> [banco definitivo](/progetto/v2/banco-di-prova-v2.md) (§4) sul [modello v3](/progetto/v2/modello-v3.md),
> con misure vere dove si può: un generatore di dati sintetici, un prototipo di `contesto.mjs`, un simulatore
> a eventi del lucchetto e gli indicatori Q calcolati in due scenari. Tutto il codice è girato in `/tmp`, fuori dal
> repository; qui ne resta l'essenziale. Gli attriti, con gravità e correzione, sono in
> [attriti del tempo](/progetto/v2/simulazione/attriti-tempo.md).

## 0. In breve

| prova | verdetto | misura chiave |
|---|---|---|
| T01 raffica | **passa** | 500 run: sempre 1 risposta, 1 `contesto/`, 0 persi, 0 doppi; con un fire rotto, 119 min di attesa (V1) |
| T02 silenzio | **passa** (a tavolino) | `recenti.md` porta i 9 frammenti; nessuna lettera il 29 |
| T03 correzione | **passa male** | l'atto `corregge` non nomina il nodo (V8) |
| T04 chat lunga | **passa male** | 1 frammento e 0 turni persi; ma con una pausa di 2 h 15 si perdono **10 turni** (V3) |
| T05 contraddizione | **passa male** | niente regola contro i doppi `contraddice`; il "fino a" non ha un campo |
| T06 cambio di lettore | **fallisce** | la taratura non ha un file dove stare (V9); costo ~0,7–1,1 M token |
| T07 colonizzazione | **fallisce con le definizioni del v3, passa con quelle operative** | Q-eco del v3: 31% nello scenario disciplinato (falso allarme); con la base lessicale: **5,0%** (trova l'eco piantato) |
| T08 tremila frammenti | **fallisce come scritto** | `contesto/` = **224k token** a un anno (car./3,5); tetto superato a ~4 mesi; la parafrasi trova l'ago al rango **318** senza espansione, **1** con |
| T09 arretrato | **passa** (0 persi, 0 doppi) | il 12° memo aspetta **3 h 13 min** dietro "consolida" |
| T10 sbiadimento | **passa** | 0 sbiadite al ritorno (a calendario: 20); ma sull'anno di T08 sbiadisce solo il **3,6%** delle proposte |

I tre attriti più gravi: **V2** (il tetto di 80k token cade al quarto mese e la regola di taglio del v3 non toglie
niente prima di tre anni), **V3** (il sigillo d'ufficio di una chat viva perde turni) e **V5** (gli indicatori della
voce, scritti come nel v3, non distinguono un sistema che colonizza da uno disciplinato).

## 1. Il metodo

**Dati sintetici** (`gen.mjs`, 62 righe, seme 3000, deterministico). Un anno di profilo B, dal 2026-11-03 al
2027-11-01, nel formato v3 (§3): 3002 frammenti (1800 parlanti da telefono, 600 non parlanti, 600 chat di 3–12 turni
solo suoi, più i due aghi), 3002 letture v1 con legami `sua` e fino a 2 `proposta`, 488 nodi (60 temi con
distribuzione di Zipf, 150 persone, opere, citazioni), 1230 restituzioni (risposte al 30% dei memo, una per chat,
lettere settimanali, 6 ritratti). Due silenzi di 15 e 18 giorni, 276 giorni attivi, picchi la sera, il 30% dei memo
in raffica (1–5 minuti dopo il precedente). Le frasi: lunghezza lognormale (media misurata **18,6 parole**, 3–60),
mescolando parole funzionali e il **lessico ✦ estratto dalle 31 frasi sue** della
[simulazione dell'importazione](/progetto/v2/simulazione/importazione.md) (dolore, solitudine, battaglie, cammino,
incisione, tratteggio…), refusi del suo tipo ("nn", "xke", "cmq"). Nessun altro frammento contiene "cicatrice" o
"nebbia" (verificato con `grep`).

**Token**: non c'è un tokenizzatore del modello nel container; si riportano tre stime (caratteri/4 come il banco,
/3,5 come il v3, /3 pessimista per l'italiano). Con caratteri/4 il banco abbassa la soglia a **72.000**.

**Prototipo di `contesto.mjs`** (68 righe): legge tutti i file, applica le definizioni del §6.2 (parlante, turno
parlante, giorno attivo, vicenda, sbiadito) e scrive i quattro file del §6.1 con le 12 sezioni di `mappa.md`.

**Concorrenza** (`sim.mjs`, 293 righe, subagent): simulatore a eventi discreti con un remoto git in cui il push è un
compare-and-swap sull'head e il PUT del telefono è un commit lato server; sessioni "smista", passata delle 3 ore,
Specchio e "consolida" con i passi del §8.1–8.2 alla lettera, più una variante con le correzioni. 2000 run casuali
(21.839 memo).

**Voce** (`voce.mjs`, 71 righe): 180 frammenti in sei mesi (profilo A, due silenzi), restituzioni simulate in due
scenari, gli indicatori del §9.5 resi operativi.

**A tavolino** (subagent): T03, T05, T06 con la traccia dei file e dei campi v3. T02 e T10 a tavolino più una misura.

## 2. Le prove

### T01 · Raffica di tre messaggi in due minuti — passa

Linea del tempo di un run con avvii fuori ordine (ritardi d'avvio 60, 10, 10 s):

| ora | evento |
|---|---|
| 22:14:05 / 22:15:10 / 22:16:02 | PUT m1, m2, m3 + tre fire |
| 22:16:41 | sessione f1: dopo 90 s, pull, vede m3 più recente → esce (passo 2) |
| 22:16:57 | f2: idem |
| 22:17:47 | f3: lucchetto preso (push riuscito) |
| 22:21:14 | f3: un giro con m1, m2, m3; **una** risposta (`per` m3, `copre` m1 m2), `contesto/` una volta, lucchetto lasciato nello stesso commit |

- **500 run** con ritardi d'avvio casuali (10–60 s, il 10% tra 1 e 5 min): sempre 1 risposta, 1 commit su
  `contesto/`, 0 persi, 0 doppi, 0 push rifiutati non recuperati; ritardo massimo memo → lettura 15 min.
- D1–D6: passano tutti. D6 (`registrato` ± 60 s dall'ora del file) regge solo perché `registrato` è scritto dal
  Comando rapido: se lo scrivesse "smista" con l'ora di elaborazione, in T09 l'errore arriverebbe a 45 h.
- **Il caso che cede:** se il fire di m3 fallisce, f1 e f2 escono al passo 2 perché vedono m3, e nessuno lo
  elabora fino alla passata delle 00:07: **119 minuti** (V1).

### T02 · Dieci giorni di silenzio — passa (a tavolino)

- Dal 21 al 29 novembre 0 frammenti: "consolida" del 29 non gira (§7.4: serve ≥ 1 parlante nella settimana), quindi
  nessuna lettera (D1). Silenzio di 10 giorni < 14: niente `ritorno`, la risposta al memo è normale (D2, D3).
- `contesto.mjs` gira alla fine di "smista" delle 19:10: tutti e quattro i file portano `aggiornato` delle 19:1x (D4).
- `recenti.md` porta gli **ultimi 30 frammenti di qualunque età**: i 9 del 16–20 novembre ci sono (D5). Misurato sul
  prototipo: `recenti.md` = 5.600 token (30 frammenti + 10 restituzioni intere).
- D6 (≥ 7 dei 9 verbatim) e il giudice dipendono dal prompt; il dato c'è. D7: nessuna proposta sbiadita (servono 30
  giorni attivi, ne sono passati 5).

### T03 · Correzione di ieri — passa male

Traccia: il memo del 12 marzo produce nella sua lettura v1
`{p: ritorna-su, a: 20270311-2110-xxxx, come: corregge, campo: attribuita-a, valore: jordan-peterson, voce: sua, perche: "«non era jung era peterson»"}`
e `nodi-nuovi` con Jordan Peterson; [S] applica la correzione nelle viste (`mappa.md` §8), "consolida" la domenica
aggiorna il nodo citazione.

| criterio | esito |
|---|---|
| D1 hash invariato | passa |
| D2 nessun commit di "smista" sulla lettura dell'11 | passa (ma `verifica.mjs` controlla solo chi scrive la v1) |
| D3 attribuzione corretta nel calcolato | passa male: la riga del nodo in `mappa.md` non mostra `attribuita-a`; il file `citazioni/` dice Jung fino a domenica, e Specchio fa `grep` sui file |
| D4 B03 invariato | passa |
| D5 un solo nodo Peterson | passa |
| D6 nessun `esito` all'ingresso | passa male: il passo 5 del §7.2 (verifica rapida) non dice che vale solo per i nodi nuovi |

L'attrito vero: l'atto punta al **frammento**, ma `campo` è di un **nodo**, e il frammento può nominarne più d'uno (V8).

### T04 · Una conversazione di 40 turni — passa male

- Chat di 70 minuti in Specchio con due memo da telefono in mezzo (fire 21:20 e 21:45): i due "smista" ignorano la
  chat aperta, Specchio sigilla alle 22:06 con il lucchetto. **1 frammento, 0 turni persi**, nessun conflitto
  (D1, D2, D5, D8).
- Specchio che muore alle 21:38: la passata delle 00:07 sigilla dalla bozza 11 turni. Ritardo 2–5 h, nessuna perdita.
- **Pausa di 2 h 15 in una chat viva**: alle 23:40 arriva un memo, il suo "smista" vede la chat ferma da più di 2 h e
  la sigilla (10 turni); alle 23:50 lui riprende a scrivere, Specchio riscrive `ingresso/` e al sigillo sovrascrive
  il frammento. **10 turni persi e una lettura scritta due volte** (V3). Il frammento, che il v3 vuole immutabile,
  qui è riscritto.
- D6 (0 turni senza contenuto in `parole.md`): sul prototipo, il filtro "turno parlante" toglie `sì`, `ok`, `altre`,
  `la terza`… Misura sull'anno di T08: le chat portano il **55% del testo** di `parole.md` anche dopo il filtro.
- D7 (una sera vale un giorno nelle vicende): il prototipo conta i **giorni distinti**, quindi passa.

### T05 · Contraddizione con sé stesso — passa male

- All'ingresso il frammento del 4 dicembre non è tra i 30 di `recenti.md` ma entra nei **vicini** (nodo Camus
  condiviso, più vecchio di 7 giorni): la risposta può metterlo accanto, verbatim e datato (D4).
- "Consolida" lo ha nel campione dei 20 vecchi (unico frammento su Camus) e scrive nella v2 del 6 marzo
  `{p: contraddice, a: 20261204-2230-xxxx, voce: sua, perche: "«camus si sbagliava…»"}`.
- D1 passa. D2 ("esattamente 1") passa male: "smista" può già scrivere il legame di voce sua (§4) e "consolida" lo
  riscrive, magari aggiungendone uno `proposta`; nessuna regola contro i doppi. D3 passa male: il `fino` del banco
  non esiste nel v3; vale la data del frammento nuovo in `mappa.md` §6, il cui formato di riga non è fissato.
  D4–D6 dipendono dal prompt.

### T06 · Cambio del modello lettore — fallisce

- D1–D3 passano (hash, slug immutabili, `letto-da` e `prompt` obbligatori). D5 passa: le serie si contano prima sul
  testo ✦ (§6.2).
- D4 passa male: che ogni `reazione` sia sottostringa esatta del frammento non è tra i controlli [S].
- D6 passa male: il segno "cambio di lettore" si calcola da `letto-da`, quindi compare da solo; il cambio del solo
  `prompt` non è segnato (§6.2 dice `letto-da`, §11 dice entrambi).
- **Fallisce**: il risultato della taratura (frequenze M1/M2 per tema, scarto, decisione) non ha un posto. Il v3 ha
  abolito `.indice/`, il dizionario lo manda in `mappa.md`, nessuna delle 12 sezioni lo prevede, e `contesto.mjs`
  non vede il branch dove vivono le letture M2 (V9).
- **Costo**: 100 pacchetti × 3–5k token in ingresso + ~1k in uscita ≈ 0,4–0,6 M; rilettura di 3 temi × ≥ 30 letture
  ≈ 0,3–0,5 M. Totale **0,7–1,1 M token**, oltre il limite di 400k per subagent: va spezzata in lotti.
- La soglia del 20% è rumorosa: un tema con 30 frammenti su 300 ha ~10 campioni stratificati per mese, e 20% = 2 legami.

### T07 · Colonizzazione dopo sei mesi — fallisce con le definizioni del v3, passa con quelle operative

Due scenari sugli stessi 180 frammenti (seme 2026), 26 lettere, 4 ritratti, ~50 risposte:
- **disciplinato**: ogni lettera cita 3 frammenti ✦ alla lettera, si appoggia al ✧ il 20% delle volte, usa
  **un'immagine nuova** e mai ripetuta ("la clessidra di…", "la lanterna di…"); "chi apre la porta" piantata una volta
  a dicembre; l'eco è **piantato in 9 frammenti** (5%), una parola ciascuno;
- **ripete**: una citazione ✦ per lettera, appoggio al ✧ il 75% delle volte, un repertorio di 6 metafore ("chi apre
  la porta", "la soglia del buio", "il fuoco che resta", "la mappa senza bordi"…), e lui che, dal secondo mese,
  riprende parole delle restituzioni con probabilità crescente (fino al 30%).

**Le definizioni operative** (quelle del v3 lasciano scelte aperte; qui sono fissate):
- *parola di contenuto*: token minuscolo di ≥ 4 lettere fuori da una lista di parole vuote; *chiave*: la parola senza
  le vocali finali ("porta"/"porte" → `port`);
- **Q-nomi**: temi il cui `nome` (prefisso di 5 lettere) compare in ≥ 2 frammenti ✦ o ✧;
- **Q-citato**: caratteri tra «» seguiti da ✦ **e** che sono sottostringa esatta di un frammento ✦, sul totale dei
  caratteri di lettere e ritratti;
- **Q-ancore**: tra le citazioni di frammenti vecchi nelle lettere di marzo–aprile, la quota ✦;
- **Q-eco (v3)**: una chiave è *nata in una restituzione* se compare in una restituzione prima che in qualunque ✦ o ✧;
  Q-eco = frammenti del mese che la contengono dopo quella data. **Q-eco (base)**: come sopra, ma esclusa una **base
  lessicale** (nel prototipo: il lessico suo e le parole comuni; nel vero: un elenco di frequenza dell'italiano);
- **ritornelli (v3)**: sequenze di 3 parole di contenuto consecutive in ≥ 3 restituzioni, assenti dai ✦;
  **ritornelli (finestra)**: due parole di contenuto entro 4 parole, fuori dalle «», in ≥ 3 restituzioni, assenti dai ✦;
- **Q-contesto**: parole di contenuto del ritratto (fuori dalle «») e nomi dei temi assenti da ✦ e ✧.

| indicatore | soglia | disciplinato | ripete |
|---|---|---|---|
| Q-nomi | 100% | 100% | **100%** (riciclaggio: lui ha ripreso "soglia", "trasformazione") |
| Q-citato | ≥ 35% | **38,9%** | 11,8% |
| Q-ancore | ✦ > 50% | 100% (su **6** ancore) | 33% (su 6) |
| Q-eco (v3), % frammenti | 5% ± 1 | **31,1%** (falso allarme: "silenzio", "pietra") | 62,8% |
| Q-eco (v3), % parole | < 10% | 4,1% | 10,2% |
| **Q-eco (base)**, % frammenti | 5% ± 1 | **5,0%** (trova i 9 piantati) | 15,0% (febbraio 33%) |
| Q-eco (base), % parole | — | 0,48% | 1,42% |
| ritornelli (v3) | 0 | **8 falsi** | **2**: le 6 metafore **sfuggono** |
| ritornelli (finestra) | 0 | 0 | 7: "fuoco che resta" ×28, "apre la porta" ×22, "mappa senza bordi" ×19, "soglia del buio" ×16 |
| restituzioni rifiutate dalla regola di `verifica.mjs` (v3) | — | 5 (tutte a torto) | 2 |
| "chi apre la porta" dopo dicembre | 0 | 0 | 11 |
| Q-contesto | ≤ 30% | 4% | 3% |

Che cosa dicono i numeri:
1. **"Chi apre la porta" ha due sole parole di contenuto** (apre, porta): la regola dei "≥ 3 parole" non vede quasi
   nessuna metafora breve, cioè proprio quelle che colonizzano. La finestra di due parole le trova tutte (V5).
2. **Q-eco senza base lessicale è inservibile**: l'AI usa per prima, per caso, parole comuni che lui avrebbe detto
   comunque ("treno", "notte"), e il disciplinato suona l'allarme al 31%. Con la base trova esattamente l'eco piantato.
3. **Il banco (D4: 5% ± 1) misura in frammenti, il v3 ("sulle tue parole del mese") in parole**: lo stesso eco vale
   5% o 0,5%. Va scelto: in frammenti (V6).
4. **Q-nomi e Q-contesto si fanno riciclare**: quando lui ha ripreso le parole dell'AI, quelle contano come ✦ e i due
   indicatori restano verdi nello scenario che colonizza. Vanno contati solo sui ✦ **anteriori** alla prima
   restituzione che usa la parola (V7).
5. **Q-ancore su 6 ancore** è una moneta lanciata: va calcolato sul trimestre e almeno su 15 ancore.

### T08 · Tremila frammenti e il tetto — fallisce come scritto

**Crescita di `contesto/`** (prototipo, formato del §6.1, stima caratteri/3,5; tra parentesi /4):

| data | parlanti | `parole.md` | `mappa.md` | totale |
|---|---|---|---|---|
| 2026-12-01 | 237 | 20.900 | 12.400 | 39.800 (34.900) |
| 2027-01-01 | 428 | 35.200 | 13.000 | 54.500 (47.700) |
| 2027-02-01 | 522 | 41.300 | 13.400 | 61.400 (53.700) |
| 2027-03-01 | 736 | 58.600 | 14.900 | **79.600** (69.700) |
| 2027-04-01 | 1005 | 81.400 | 16.400 | 103.400 (90.500) |
| 2027-08-01 | 1742 | 139.900 | 21.600 | 170.000 (148.800) |
| 2027-11-02 | 2396 | **191.000** | 25.500 | **223.800** (195.800; /3: 261.100) |

(I "parlanti" contano i frammenti, chat compresa; `recenti.md` ≈ 5.600, `ritratto.md` ≈ 1.700.)

- **Il tetto cade al quarto mese** (inizio marzo, ~730 parlanti; con caratteri/4 e la soglia di 72k, a febbraio).
  A un anno `contesto/` è **2,8 volte** il tetto (D1 fallisce).
- **La regola di taglio del v3 non toglie niente**: "prima i frammenti più vecchi di tre anni senza reazioni né
  ritorni" a un anno è un insieme vuoto. Il v3 passa allora "al connettore MCP o alla sessione Code", ma
  `contesto.mjs` non sa scrivere `parole.md` sotto il tetto, e il Progetto ne leggerebbe una parte a caso (V2).
- **Le sezioni di `mappa.md`**: nodi 9.600 token (488 righe, D3 passa), alias 3.600, **ricordabili 10.000** (l'elenco
  di 1.500 id), correzioni 800. I ricordabili come conteggio + 20 a caso: **120** token.
- **Il formato compatto** di `parole.md` (data corta e testo su una riga, senza id né titoletti) toglie il 13%:
  166k invece di 191k. Non basta.
- **Finestra mobile dichiarata** (variante del prototipo): si tolgono i più vecchi finché il totale sta sotto 80k, e la
  testata dice `tagliato: le parole prima del 2027-08-10 non sono qui`. A un anno la finestra copre **3 mesi** (4 col
  formato compatto). D4 passa. L'ago del 12 novembre **non è più in `contesto/`**.
- **Il ritrovamento dell'ago** fuori da `contesto/` (ricerca BM25 sui 3002 frammenti, ~100 ms; `grep` 20 ms):

| domanda | come | rango dell'ago |
|---|---|---|
| "cosa avevo detto sulla cicatrice?" | lessicale | **1** (unico risultato) |
| "c'era un segno di famiglia che volevo tatuarmi" | lessicale, lessico senza "segno" | 1 (fortuna: "segno" c'è solo nell'ago) |
| la stessa, lessico realistico ("segno" in 572 frammenti, "famiglia" in 577) | lessicale | **318** su 1052 |
| la stessa | con espansione dell'AI (zio, cicatrice, polso, addosso, pelle, nonno) | **1** (punteggio 41 contro 8) |

  La parafrasi **passa solo se chi cerca espande la domanda** prima di cercare: il `cerca` dell'MCP muto non basta
  (D5, giudice 1). Un dettaglio che pesa: con la soglia di 4 lettere, "zio" non è indicizzato; serve 3 (V4).
- **Tempi** (D7): `contesto.mjs` legge e calcola 7.717 file in **0,39 s** (≤ 10 s, passa); la finestra con il ciclo
  ingenuo 2,7 s (lineare con una somma cumulativa). L'archivio di un anno pesa ~2,6 MB di testo.

### T09 · Routine saltata e arretrato — passa

| ora | evento |
|---|---|
| ven 08:00 → sab 23:59 | fire rotto, passata sospesa: 11 memo in `ingresso/` (PUT riusciti) |
| dom 03:00:06 | "consolida" prende il lucchetto (rinnovo ogni 5–10 min) |
| 03:10 | 12° memo + fire; la sessione parte 03:10:58, alle 03:12:30 trova il lucchetto ed **esce** |
| 03:25:39 | "consolida" lascia il lucchetto |
| 06:07 | passata: un giro con i 12 memo, finito 06:23 |

- 0 persi, 0 doppi, 0 letture scritte da due processi (D1, D4), `registrato` dal nome del file (D2), 10 restituzioni
  (la raffica di 3 ne fa una), `contesto/` rigenerato 2 volte.
- **Il 12° memo aspetta 3 h 13 min**. Se "smista" aspettasse il lucchetto come "consolida", sarebbe letto alle 03:41.
- **"Consolida" lavora sulla settimana senza gli 11 memo** ancora in `ingresso/`: il v3 non gli fa svuotare la coda
  prima (V10).
- Il banco si contraddice: la preparazione sospende la passata fino a sabato 23:59, l'azione la fa riprendere alle
  06:00; con la passata di mezzanotte attiva la prova è banale.
- D7 (≤ 5 min a sessione) è dubbio: il giro dell'arretrato dura ~15 min.

### T10 · Sbiadimento dopo due mesi — passa

Orologio in giorni attivi (prototipo): 30 giorni attivi tra marzo e il 2 maggio, 10 tra il 3 e il 16 maggio con 20
proposte, P07 toccata il 15, silenzio di 65 giorni, poi 32 giorni attivi.

- Al 21 luglio: **0 sbiadite** (D1). Con un orologio a calendario sarebbero **20**.
- Le date (D2): P01–P02 il 25 agosto, … P19–P20 il 10 settembre; P07, toccata il 15 maggio, l'8 settembre insieme a
  P17–P18. Tutte prima della fine di settembre.
- D3 (vitalità ± 1%) **non si applica**: il v3 ha tolto vitalità e mezza vita (registro, riga 8). D4: `ritorno.md` lo
  scrive solo "consolida", che nel silenzio non gira (0 parlanti); D5 passa (nessun dato cancellato).
- **Ma sull'anno di T08 sbiadisce solo il 3,6% delle proposte** (47 su 1320): *toccato* = "un frammento ✦ nomina uno
  dei suoi capi", e con i temi di Zipf il capo di arrivo (dolore, solitudine) è nominato quasi ogni giorno. Una
  proposta verso un tema frequente non sbiadisce mai (V11).

## 3. Il codice essenziale

Il cuore di `contesto.mjs` (definizioni del §6.2 e tetto con la finestra dichiarata):

```js
const parlanteTesto = t => t.replace(/https?:\/\/\S+/g, '').split(/\s+/).filter(Boolean).length >= 3 && !SENZA.test(t.trim());
for (const f of F) {
  if (f.fm.canale === 'chat') { f.turni = turni(f.corpo).filter(x => parlanteTesto(x.t)); f.parlante = f.turni.length > 0 }
  else f.parlante = !(f.l?.fm.intento?.join() === 'niente') && parlanteTesto(f.corpo);
}
const attivi = [...new Set(F.filter(f => f.parlante && f.fm.canale !== 'importato').map(f => f.giorno))].sort();
// sbiadito: proposta mai toccata da 30 giorni attivi (toccata = un frammento ✦ nomina uno dei capi)
for (const p of proposte) if (attiviFino(oggi) - attiviFino(max(p.nato, toccato.get(p.a))) >= 30) sbiadite++;
// tetto: la regola del v3 (via i più vecchi di 3 anni senza reazioni) e, se non basta, la finestra dichiarata
if (totale() > TETTO) {
  let i = 0; while (totale() > TETTO) paroleTxt = P.slice(++i).map(riga).join('\n\n');
  taglio = P[i].giorno;   // finisce in testata: "tagliato: le parole prima del … non sono qui"
}
```

Gli indicatori della voce resi operativi (estratto di `voce.mjs`):

```js
const nata = k => rFirst.has(k) && rFirst.get(k) < (sFirst.get(k) || '9999');     // prima in una restituzione che in ✦/✧
const eco = f => contenuto(f.t).map(chiave).filter(k => nata(k) && !BASE.has(k) && rFirst.get(k) < f.g);
const Qeco = F.filter(f => eco(f).length).length / F.length;                         // in frammenti, non in parole
// ritornelli a finestra: due parole di contenuto entro 4 parole, fuori dalle «», in ≥ 3 restituzioni, assenti dai ✦
for (let i = 0; i < w.length; i++) if (cont(w[i])) for (let j = i + 1; j <= i + 3; j++) if (cont(w[j])) { s.add(w.slice(i, j + 1).join(' ')); break }
const ritornelli = [...coppie].filter(([k, r]) => r.size >= 3 && !suaTok.includes(' ' + k + ' '));
```

Il cuore del simulatore del lucchetto (presa con il push come arbitro; rilascio con le correzioni V1–V3):

```js
function* prendi(sim, S, L, attesaMax) {
  for (const t0 = sim.t;;) {
    const lk = L.files.get(LOCK);
    if (lk && ora(S) - lk.t < 20 * MIN) {
      if (sim.t - t0 < attesaMax) { yield 60; sim.pull(L); continue }   // correzione: aspetta (v3: "smista" esce)
      return false;
    }
    if (sim.push(L, new Map([[LOCK, { o: S.nome, t: ora(S) }]]))) return true;  // CAS sull'head
    sim.pull(L);                                                                  // un altro ha spinto prima
  }
}
for (;;) {                                   // passi 5–6
  sim.pull(L, modifiche);
  if (L.files.get(LOCK)?.o !== S.nome) return abbandona();      // fencing: il lucchetto non è più mio
  if (S.giri < 4 && inCoda(L).length) { S.giri++; yield* giro(); continue }
  modifiche.set(LOCK, null); modifiche.set('contesto', S.nome);  // rilascio nello stesso commit
  if (sim.push(L, modifiche)) return;                            // un PUT nel mezzo fa fallire il CAS: si ripete
}
```

## 4. Fuzz della concorrenza (2000 run, 21.839 memo)

| | v3 alla lettera | con le correzioni V1–V3 |
|---|---|---|
| memo persi | 0 | 0 |
| frammenti doppi | 0 | 0 |
| letture scritte da due processi | 1 run (4 letture) | 0 |
| lucchetto rimasto alla fine | 2 run | 0 |
| run con più risposte che raffiche | 1672 | 673 |
| memo letti dopo > 30 min | 1369 | 752 |
| memo letti dopo > 60 min | 782 | 233 |

Lo sfasamento degli orologi (± 30 s tra sessioni) non produce effetti. Il protocollo **non perde e non duplica**
niente; ciò che resta sono **ritardi** (fire falliti, uscite al passo 2, attese dietro un lucchetto morto) e
**risposte doppie** per una raffica spezzata tra giri o sessioni.

## Collegamenti

- [Modello v3](/progetto/v2/modello-v3.md) · [Banco definitivo](/progetto/v2/banco-di-prova-v2.md) ·
  [Critica del tempo](/progetto/v2/critica-tempo.md) · [Telefono](/progetto/v2/telefono.md) ·
  [Attriti del tempo](/progetto/v2/simulazione/attriti-tempo.md) ·
  [Importazione simulata](/progetto/v2/simulazione/importazione.md)
