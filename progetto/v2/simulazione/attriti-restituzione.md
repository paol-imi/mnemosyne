# Attriti della prova di restituzione

> Simulazione v3, 2026-10-31. Proposta di Claude, da validare. Raccoglie i punti in cui il [modello v3](/progetto/v2/modello-v3.md),
> i [prompt operativi](/progetto/v2/prompt-operativi.md) o il [banco](/progetto/v2/banco-di-prova-v2.md) hanno costretto
> i produttori delle [14 prove R](/progetto/v2/simulazione/prova-restituzione.md) a improvvisare. Uniti per tema: tra
> parentesi le prove che li hanno incontrati. Gravità: alta = cambia un esito o rende una prova impossibile; media = forza
> una scelta non scritta; bassa = nome o campo mancante.

## Alta

| # | attrito | dove | correzione proposta |
|---|---|---|---|
| A1 | **La soglia della lettera spegne la restituzione.** "≥ 3 frammenti parlanti dall'ultima lettera" non scatta in 6 prove su 9 lettere (R03 1 parlante, R04 0, R05 1, R06 2, R07 1, R08 2): domenica non arriva niente, e la convergenza o il confronto trovati da "consolida" si perdono, perché il v3 ha tolto lo stato `in-attesa`. Il §16.2 lo dichiara solo per il sogno. (R03–R08) | v3 §7.4, §7.6, §9.2; prompt (d) | contare i parlanti **dall'ultima lettera consegnata**, ma con soglia **2** oppure "≥ 1 parlante e una voce pronta (convergenza, `contraddice` fresco)"; la proposta preparata e non consegnata resta in `mappa.md` ("pronte") e la prende la lettera successiva |
| A2 | **Il ponte dei primi giorni non ha una strada.** Specchio la sera del 5 novembre trova B01 e B02 già smistati e risponde "Nessun memo nuovo."; la prima lettera slitta (2 parlanti). Un ponte "tenuto per la lettera" (§13.2) non ha né campo né consegna, e Rust (u19) non è tra i vicini di B01 per la definizione del §6.2. Il criterio di critica-semplicita §4 non viene né soddisfatto né dichiarato mancato. (R14) | v3 §7.5, §6.2, §13.2; prompt (i) | al giorno 3 Specchio fa sempre il **bilancio dei ponti** dei memo dei giorni 1–3 (non solo dei nuovi) e chiude con il ponte o con "Niente si aggancia ancora."; i vicini dei primi giorni includono tutti gli importati ✦ |
| A3 | **Ricordo: banco e v3 vogliono due forme diverse.** Il banco chiede l'indizio con la fine nascosta; il v3 un'affermazione intera, oltre 60 giorni attivi. Con il ritmo del banco (17 giorni attivi a febbraio) non c'è nessun ricordabile, e i richiami dell'8 novembre e del 13 dicembre della Preparazione per il v3 non possono esistere. (R04, R02, R08) | v3 §9.3, §16.2; banco R04 | decidere: o si corregge R04 (D2, giudice 1) sull'affermazione, o il v3 riprende l'indizio. Raccomandato: **correggere il banco**, e abbassare la soglia a 60 **giorni di calendario** con almeno 10 giorni attivi, altrimenti il ricordo non arriva prima dell'estate |
| A4 | **Una restituzione per conversazione contro una per domanda.** Due domande di fila producono un frammento e una restituzione nel v3; il banco ne vuole due con `per`. (R13) | v3 §7.3, §16.4; banco R13 D5 | una restituzione **per domanda parlante** dentro la stessa sessione (la conversazione resta un frammento): cambia il v3, non il banco |
| A5 | **Il Progetto non scrive.** Le prove R09, R10, R12, R13 fanno domande "nella chat del Progetto", che nel v3 legge e basta: preso alla lettera, nessun file e X5 fallisce. Tutti i produttori le hanno spostate in Specchio. (R09, R10, R12, R13) | v3 §7.3, §16.1; banco parte 3 | riscrivere nel banco "chat del Progetto" come "Specchio" (il dizionario §16.1 lo fa già, il banco no) |

## Media

| # | attrito | dove | correzione proposta |
|---|---|---|---|
| M1 | **Lunghezza delle risposte a domanda.** 50–150 parole e "vuoi il resto?" spingono a riempire quando il materiale è scarso o quando lui sta male; voce §4.2 dice "una riga umana, poi silenzio". (R10, R12, R13, R09) | v3 §9.1; voce §4.2 | "fino a 150 parole"; il minimo vale solo quando ci sono ≥ 3 voci ✦; il "vuoi il resto?" solo se il resto esiste |
| M2 | **Il ritratto: domanda in fondo e conti in coda si escludono**; il prompt (e) è trimestrale alle 18:41, il v3 mensile per tre mesi alle 09:07. (R01) | prompt (e); v3 §7.4 | la riga sulla voce (§9.5) va **prima** della domanda; riallineare orario e frequenza del prompt |
| M3 | **"5 su 6" non si calcola.** `esito` non distingue l'opera sbagliata (B07) e l'idea di un altro (B05, non citazione); B01 risulterebbe `simile`. (R01) | v3 §3.4 citazioni, §6.1 conti | un campo `scarto: testo · autore · opera · nessuno` sul nodo citazione, calcolato dal consolidamento |
| M4 | **Q-citato ≥ 35% contro le «» delle parole altrui.** Una lettera che riporta Camus o Rilke tra «» scende al 15–18% (R11 al 15%, R01 alla prima stesura al 18%), e nessun prompt la controlla. (R01, R11) | v3 §9.5; prompt (d), (e) | Q-citato si calcola sul trimestre, non sulla singola lettera; il prompt la riporta solo nel ritratto |
| M5 | **Parole d'altri a memoria: ✦ o «» ○?** B07, B11, B15, B03 sono citazioni ricordate da lui: il banco le vuole verbatim ✦, il v3 §9.1 tra «» ○. (R02, R04, R09, R03) | v3 §9.1, §3.3 `altrui` | regola: la **versione che ricorda** è sua (✦, corsivo); il testo verificato è ○ tra «»; `altrui: true` solo per le trascrizioni (foto, copia) |
| M6 | **Fatti del mondo nel sogno.** Il prompt (g) li vieta, l'esempio di restituzione.md §3 (Baranska 2018) ci si appoggia. "Gioco ◌." in testa contro l'apertura con una frase ✦ del prompt (d). (R05) | prompt (g), (d) | ammesso **un** ○ verificato nel sogno; l'apertura è "Gioco ◌." seguita subito dalla frase ✦ |
| M7 | **Confronto con una voce senza nodo.** Il prompt (h) vuole la fonte da un nodo verificato: Camus c'è, il *Mito di Sisifo* no. "Fresco" non è definito. Il rischio, visto dal giudice: la voce contro finisce per dargli ragione. (R06) | prompt (h); v3 §9.3 | ammessa una voce ○ verificata nella sessione; "fresco" = `contraddice` dalla lettera precedente; nel prompt: la voce deve stare **dall'altra parte** della frase nuova |
| M8 | **Il rifiuto e il `contraddice`.** Il "non è…" di un rifiuto si può leggere come posizione contro: il prompt farebbe un confronto proprio sul tema rifiutato. (R11) | v3 §4; prompt (c) passo 4 | un `ritorna-su … come: rifiuta` non genera `contraddice` per 60 giorni sullo stesso legame |
| M9 | **Il delicato nella soglia.** B12 (lutto) conta tra i parlanti: senza di lui la lettera del 13 dicembre non partirebbe. Una domanda neutra in un periodo delicato non eredita il segno. (R02, R12) | v3 §6.2, §9.2 | i delicati contano per la soglia (è giusto che la lettera esista) ma la lettera lo sa: niente "Questa settimana"; il periodo delicato (≥ 2 delicati in 7 giorni) vale per la sessione |
| M10 | **Materiali che il punto zero v3 non ha.** La scheda ◌ del kintsugi, l'alce di Zapffe e la genealogia con Ligotti, la nave di Teseo sono nel banco ma non nell'importazione simulata (che ha ancora `s02`, non `s04`); i produttori li hanno aggiunti come sintetici. (R05, R09, R13) | simulazione/importazione.md; banco "Come si usa" | rigenerare l'importazione simulata con le regole v3, e scrivere nel banco gli importati che ogni prova presuppone |
| M11 | **Orari e nomi.** Il banco: 21:00, `forma: settimana`, `ricordi`, `sogno`, `confronto`; il v3: "consolida" 03:13, consegna 17:37, `forma: lettera` con voci `cosa`. Ogni giudice ha dovuto passare D1 "per funzione". (tutte le lettere) | banco parte 3; v3 §16.1 | riallineare il banco (lo chiede già v3 §17.4) |
| M12 | **Le immagini già usate** escludono le parole presenti in una frase sua (*fondo* sta in B17) e non lavorano per lemma. (R03) | v3 §9.4 | lista per lemma; una parola sua resta libera solo dentro la sua citazione |

## Bassa

- `voci[].cosa` non ha un valore per la sua frase d'apertura, per la tensione, per l'assenza, per l'accostamento; `rif` ammette un solo riferimento (R01, R02, R03, R05, R10, R11, R13). Aggiungere `cosa: frase · tensione · vuoto` e `rif` come lista.
- Il v3 non dice che cosa vede lui quando la lettera slitta, né se c'è una notifica ("Lettera rimandata." senza notifica è la scelta dei produttori) (R03, R06, R08).
- Le righe di servizio ("Ci sono.", "Vuoi il resto?", il conteggio d'oggi) non hanno un segno di voce e X2 le vorrebbe segnate (R04, R12, R13). Esentarle in X2.
- Una resa propria dal tedesco o dall'inglese di un testo verificato vale come ○? (R07, R09). Sì, con "resa mia" accanto.
- La risposta del banco a B17, B20, B24 fa domande che il v3 §9.1 vieta (R06, R07, R08).
- X5 non ammette diff in `citazioni/`, `riserva/`, `frammenti/` (domande) (R02, R08, R11, R12): estendere, come dice già v3 §16.2.
- Il prompt (a) e il (i) usano ancora i nomi di campo del v2 (R10, R14).
- Non è detto se una domanda in Specchio rende un giorno attivo (R10).
- Il link Spotify fittizio di B13 apre un brano vero (R02): nel banco usare un id non valido.
- Nessuna regola per un'intenzione esplicita di farsi del male (R12): lacuna già nota del banco, resta aperta.

## Che cosa cambierei per primo

1. **A1** (soglia della lettera): da sola, fa passare R03, R05–R08 da A a B, cioè da 7 a 12 su 14.
2. **A2** (bilancio dei ponti al giorno 3): è la prova di cui critica-semplicita fa dipendere tutto.
3. **A3–A5** e **M11**: allineare il banco al v3 dove il v3 ha deciso di proposito, così il prossimo giro misura il modello e non i nomi.

## Secondo turno: attriti residui sul v3 finale

> Secondo turno, 2026-10-31. Proposta di Claude, da validare. Dalle note dei 14 produttori nuovi e dai giudizi del
> [secondo turno](/progetto/v2/simulazione/prova-restituzione.md) (10 su 14). A1–A5 e M1–M12 del primo turno sono
> integrati nel v3; quelli che restano aperti sono qui sotto con un nome nuovo.

### Alta

| # | attrito | dove | correzione proposta |
|---|---|---|---|
| S1 | **Prompt e modello non dicono la stessa soglia.** Il prompt v3 §4 B1 chiede ancora ≥ 3 parlanti e non nomina `riserva/pronte.md`; il modello v3 §9.2 dice ≥ 2, o ≥ 1 e una proposta pronta. Con il prompt alla lettera 7 lettere su 9 non esisterebbero. Tutti i produttori hanno seguito il modello. (R02, R03, R04, R05, R06, R07, R08, R11) | prompt v3 §4 B1, §4 fase B | riscrivere B1 con la soglia del modello e il passo `riserva/pronte.md` |
| S2 | **Il ricordo non arriva mai nel primo anno di un uso normale.** Con 0 parlanti la settimana non parte né "consolida" né la lettera; e i 60 giorni attivi, a circa due giorni attivi a settimana, cadono in primavera. I ricordabili nei primi mesi sono ammessi dal modello (§9.3, §16.2: importati ✦) ma negati da §6.1 punto 14, §13.5 e dal prompt §9.1. (R04, R02, R08) | v3 §6.1, §9.3, §13.5; prompt §9.1; banco R04 | una sola regola: importati ✦ ricordabili da subito, frammenti nuovi dopo **60 giorni di calendario e ≥ 10 attivi**; un ricordo può far partire la lettera anche con 0 parlanti, una volta al mese; R04 nel banco con una settimana da ≥ 1 parlante |
| S3 | **La sera storta in chat.** Il prompt §2 e §7 dice che se chiede le sue parole "i delicati si riportano": alla lettera R12 citerebbe le due notti di aprile e Cioran, e D3 fallirebbe. Il periodo delicato (M9) vale solo per la lettera; il Progetto non ha una ricetta per "dimmi qualcosa di mio" in un periodo delicato. (R12) | prompt v3 §2 "Delicato", §7 | ricetta: in un periodo delicato, solo frasi ✦ non delicate di attraversamento, ≤ 3 righe, nessun ○; i delicati si riportano solo se li nomina lui |
| S4 | **Un memo per risposta contro uno per conversazione.** Il prompt §7 fa un memo "dall'ultimo memo" per ogni risposta: due domande, due frammenti e due restituzioni; il v3 §3.2 ne vuole uno con sezioni. (R13) | prompt v3 §7; v3 §3.2, §3.5 | il memo si scrive alla fine della conversazione, uno solo; `r-…#n` numerato per tutta la restituzione, non per sezione |
| S5 | **Premesse del banco impossibili nel v3.** R11 suppone una lettera delle 21:00 del 22 novembre che contiene B07 (17:20), ma "consolida" la scrive alle 03:13; le Preparazioni non danno la storia delle lettere né lo stato di `riserva/pronte.md`, che decidono la soglia e il "fresco". (R11, R01, R06, R07, R08, R13) | banco parte 3 | ogni Preparazione elenca le lettere precedenti (data, cosa, voci) e le proposte pronte |

### Media

| # | attrito | dove | correzione proposta |
|---|---|---|---|
| S6 | **La legenda dopo la domanda.** Il prompt chiude le forme lunghe con la legenda: nel confronto il "?" non è più l'ultimo carattere e R06 fallisce su D3, con giudice 4/4. (R06) | prompt v3 §4 fase B; banco R06 D3 | legenda **in testa** (una riga sotto il titolo) in lettera e ritratto; oppure D3 dice "ultima frase" |
| S7 | **Un ○ senza fonte passa i controlli.** Il ritratto di novembre ha una riga ○ ("Galimberti il 3") senza opera né luogo: R01 fallisce su X2, con giudice 5/5. (R01) | v3 §9.1; `verifica.mjs` | controllo [S]: ogni voce `mondo` ha `riferimento` o ⚠, e ogni ○ nel corpo rimanda a una voce numerata |
| S8 | **"≥ 1 e una proposta pronta" è quasi sempre "≥ 1".** La proposta si prepara la stessa notte in cui si controlla la soglia. (R03, R05, R08) | v3 §7.4 passo 7, §9.2 | contano solo le proposte pronte da **una notte precedente** |
| S9 | **I numeri delle voci nel corpo.** "Il corpo mostra gli stessi numeri" (§3.5) fa diventare lettere e ritratti elenchi numerati, e il giudice li sente "da verbale". (R01, R02, R03, R06, R07, R13) | v3 §3.5 | numeri solo dove una voce del mondo o una proposta ◌ ha bisogno di riferimento; le sue frasi senza numero |
| S10 | **Il Progetto non verifica.** Può citare solo ciò che ha un `esito` in `mappa.md`: ogni ○ nuovo esce ⚠; le citazioni importate e le voci `eredita` non vengono mai verificate e restano ⚠ a vita. (R09, R13) | prompt v3 §7; v3 §7.4 passo 3 | "consolida" verifica anche gli importati citati da una restituzione; il Progetto chiede "verifico?" e lo mette in sospeso |
| S11 | **Lo schema del memo non coincide con il v3.** `rif` senza id di frammento, nessun posto per il `perche` delle voci né per `cosa: frase`. (R09, R12, R13, R10) | prompt v3 §7; v3 §3.5, §3.7 | allineare il memo allo schema JSON del v3 |
| S12 | **Lunghezza e notifiche ancora del v2 nel prompt.** "50–150 parole, poi vuoi il resto?" (§2, §7) contro "fino a 150, il resto solo se c'è" (v3 §9.1); "smista" notifica "La risposta è pronta" anche per una risposta già letta in chat. (R10, R13) | prompt v3 §2, §3, §7 | riallineare al v3; nessuna notifica per `canale: chat` |
| S13 | **Il sogno resta fuori dal banco.** R05 non può passare finché il sogno è spento sotto 50; la convergenza che lo sostituisce prende 3/4 ma è "da dossier". (R05) | banco R05; v3 §9.3 | spostare R05 a una Preparazione con ≥ 50 parlanti, o accettarla come divergenza dichiarata |
| S14 | **Il bilancio dei ponti non ha un posto suo.** Il ponte sui memo già smistati è scritto come seconda `risposta` con `per` = B01; il prompt di Specchio fa la prova del giorno 3 solo su richiesta, il v3 d'ufficio. (R14) | prompt v3 Specchio; v3 §7.5 | una forma `bilancio` (o `risposta` con `per` a più frammenti) d'ufficio la sera del giorno 3 |
| S15 | **"5 su 6" dipende da chi decide l'esito.** Il banco dà B01 giusta, il v3 la darebbe `simile`, e allora sarebbero 6 su 6. (R01) | v3 §3.4; banco R01 | fissare nel banco l'esito di B01 come lo dà il v3 |

### Bassa

- La notifica "La lettera è pronta" ha 4 parole, contro le 5–7 di v3 §9.1 (R03, R07, R08, R11): "La lettera della domenica è pronta".
- I titoli in corsivo si confondono con le sue parole, che sono le sole in corsivo (R01, R03, R07): titoli tra virgolette basse o in tondo.
- Il nome del delicato nel `perche` del frontmatter (R03): `verifica.mjs` cerchi gli id e le parole dei delicati anche nei `perche`.
- "Niente si aggancia ancora" promette un seguito (R08): "Niente si aggancia, e va bene così" o la sola riga del sogno.
- Il ponte di R14 è un contrasto scritto come `converge-con` (R14): manca un valore per "stesso problema, risposte opposte".
- Segnaposto `<modello>` e `<7 cifre>` nei file (R01) e riga tecnica sul Sync in testa alla risposta (R10): il Sync solo se l'ultimo frammento è più vecchio di un giorno.
- `cosa` senza valori per una sua frase vecchia accostata, un passo del nucleo, uno studio (R03, R05, R10).
- L'importazione simulata non è nel formato v3 (`s02`, markup, mancano kintsugi, Teseo, Zapffe): tutti l'hanno adattata, in modi diversi. Rigenerarla prima del prossimo giro.

### Che cosa cambierei per primo

1. **S6 e S7**: due righe di forma, e il banco passa la regola (12/14 con R01, R06, R07, R14).
2. **S1**: il prompt dice la soglia del modello, altrimenti l'implementazione vera rifà il primo turno.
3. **S2 e S3**: il ricordo che arriva davvero e la sera storta in chat sono le due cose che contano di più per lui e che il v3 non garantisce ancora.
