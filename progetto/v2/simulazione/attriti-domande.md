# Attriti delle domande simulate

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Raccoglie ciò che si è inceppato eseguendo le 25 domande
> del [banco di prova](/progetto/v2/banco-di-prova.md) sul [modello v2](/progetto/v2/modello.md), come descritto in
> [simulazione delle domande](/progetto/v2/simulazione/domande-simulate.md) (sette gruppi, uno per subagent, più le 12 incongruenze
> di `contesto/` del §0.2). Q1–Q33 consolidano i 42 attriti locali e le 12 incongruenze.
> Gravità: **alta** = si perde significato o il modello si contraddice; **media** = ambiguità che lo script o la chat
> deve decidere; **bassa** = ritocco. Le misure sono stime (token = caratteri / 3,5).

## 0. In breve

- **Criteri (25 domande × 4, modalità Progetto):** 69 passano, 30 passano male, 1 fallisce (D25, Scrive).
  Per criterio: Dati 14 / 11 / 0; Forma 24 / 1 / 0; Scrive 6 / 18 / 1; Non deve 25 / 0 / 0.
- **Modalità Code (8 domande doppie, 32 criteri):** 29 passano, 3 passano male (Scrive di D06, D07, D25), 0 falliscono.
  Le stesse 8 dal Progetto: 22 / 9 / 1.
- **Il criterio che cede è Scrive:** i 18 "passa male" e l'unico fallimento vengono quasi tutti da un solo attrito (Q1).
  Il secondo è Dati: 11 "passa male", quasi sempre perché `contesto/` non porta ciò che serve.
- **I cinque più gravi:** Q1 (la chat del Progetto non scrive), Q2 (il memo porta solo testo), Q3 (restituzioni importate
  senza testo in `contesto/`), Q4 (gli scarti non arrivano al Progetto), Q6 (`contraddice` troppo largo).
- **Costo medio dal Progetto:** ~17.200 token letti (mediana ~15.000; senza D14 e D15, che verificano il mondo, ~15.000),
  4–5 file di `contesto/`, ~18 s. **Da Code** (8 doppie): ~9.500 token nella sessione (~12.700 con il subagent di verifica
  di D14), 8–67 file, ~1,9 min. Code costa da 4 a 6 volte il tempo.

## 1. Gli attriti

| # | gravità | attrito | domande | correzione proposta al modello |
|---|---|---|---|---|
| Q1 | **alta** | **La chat del Progetto non scrive.** §4.1 punto 3 dice «alla tappa 1 lo fa la chat stessa con un memo», ma la chat non ha strumenti. Domande, risposte, `contraddice` e accoglienze restano dette in chat. D05 ("mi ha fatto bene"), il dato più prezioso della catena C, si perde. D25 fallisce. | D01, D02, D22, D23, D05, D06, D07, D09, D10, D11, D12, D13, D14, D15, D16, D17, D18, D20, D25 | §4.1 punto 3: le istruzioni del Progetto chiudono ogni risposta con un blocco memo (domanda + risposta, `canale: chat`) da rimandare con il Comando rapido "Memo". Una domanda che contiene un'affermazione parte dal Comando rapido "Chiedi", che salva in `ingresso/` prima di aprire la chat. In alternativa si dichiara che alla tappa 1 le domande non si salvano. |
| Q2 | **alta** | **Il memo della chat porta solo testo.** La Routine deve ricostruire `voci`, `n`, `perche` e `in-risposta-a`. Il perché di una voce ◌ sopravvive solo se è scritto nella risposta. "Salvami la terza" perde il referente se nel frattempo passano più di 5 restituzioni. `in-risposta-a` sta nel frammento (strato senza AI) ma è un'inferenza (D04 o D03?). | D05, D08, D17, D18 | §4.1 e §2.2: il memo della chat è YAML con un blocco `voci:` già numerato, il `perche` di ogni ◌ in una riga `→` e l'id della restituzione a cui risponde; la Routine lo copia. Il frammento registra solo la contiguità; il referente vero va nel `ritorna-su` della lettura. |
| Q3 | **alta** | **Le restituzioni importate non hanno testo in `contesto/`.** Le 60 importate entrano solo come riga d'indice. D07 vede "V,20 ◌" senza esito; D09 vede "C2" senza le tensioni; D19–D21 lavorano su titoli (t11, t12, t19, C16, C22) e ripropongono come nuovo ciò che ottobre aveva già proposto. Ciò che ha aiutato (D04) vive solo come ↳ in `recenti.md`. Una voce insieme ○ (il fatto) e ◌ (la scelta d'allora) non ha un campo. | D04, D05, D07, D09, D19, D20, D21 | §2.1 e §3.1: `indice.md` dà per ogni restituzione importata le sue voci in una riga (fonte, esito) e, per quelle con `serve-a` o `converge-con` verso un nodo, la riga di prosa centrale (≤ 25 parole). Una sezione "Ritorni con effetto" (`data · stato · voci in breve · «parole»`). La voce di una restituzione ha `scelta: proposta\|sua` separata dalla `voce` del fatto. |
| Q4 | **alta** | **Gli scarti non arrivano al Progetto.** `scarti.json` sta in `.indice/` (gitignored) e "si legge prima di ogni proposta" (§3.1, §4.5), ma la chat legge solo `contesto/`. Rifacendo n.37, la voce rifiutata non torna solo per caso, finché la restituzione è in `recenti.md`. | D13, D14, D16, D18 (rifacimento) | §3.1: `contesto.mjs` scrive una sezione `## Scarti` in `contesto/indice.md`, una riga per scarto con il suo contesto. |
| Q5 | **alta** | **`recenti.md` si svuota di senso.** Le domande della chat scacciano i messaggi: dopo 21 domande gli ultimi 30 sono quasi tutti D; a n.28 B01–B05 sono già usciti. È anche ridondante: duplica 30 frammenti di `parole.md` e aggiunge solo le risposte. Il modello non dice se le risposte lunghe della chat ci entrano (cambia le misure fino a +3.000 token). | D04, D05, D06, D11, D18, D24 | §2.1 e §4.1: `recenti.md` = ultimi 30 frammenti del telefono, solo con le risposte (il testo è già in `parole.md`); le domande della chat in una sezione a parte, con le ultime 5. |
| Q6 | **alta** | **`contraddice` troppo largo.** "camus si sbagliava" rende superato tutto `s01`, anche M1 sul dolore. E §2.6 rende `superata` ogni `contraddice` di voce sua, anche dubitativo: «o forse» chiude una posizione. | D25 | §2.3 e §2.6: `contraddice` porta il passo colpito (`passo: M3`, citazione nel `perche`) e la validità si calcola per passo (§3.1). Se il frammento esita ("forse", domanda) il `contraddice` ✦ resta tensione finché non si torna sul punto. |
| Q7 | **alta** | **Verificare il mondo dal Progetto costa e non basta.** Wikiquote non dà i capitoli per metà delle citazioni; le pagine sono da 60k token; il protocollo vuole il testo primario. D14 dal Progetto: 3 capitoli su 4 ⚠, ~45k token. Anche la ○ di D03 richiede una ricerca web. | D03, D07, D14, D15, D16 | §4.1 punto 3: le domande "top quote", "è vera?" vanno al tab Code (o a un subagent); altrimenti il Progetto mostra ⚠ e lo dice. |
| Q8 | **alta** | **Le catene arrivano prima di `contesto/`.** n.58 a pochi minuti da n.56: una chat nuova prima del Sync non trova la restituzione. Anche D01 in `parole.md`, D05 e la storia di D19 per D20 esistono solo dopo il Sync o nella stessa chat. | D01, D02, D05, D08, D20, D23 | Istruzioni del Progetto (§4.1): una catena resta nella stessa chat; se un riferimento ("quella", "me l'avevi") non si trova in `contesto/`, la chat lo dice e chiede il Sync. |
| Q9 | **alta** | **Il nucleo è un hub.** `s01` nomina tutti i riferimenti: ogni coppia è collegata in 2 passi ✧, e C16 aggiunge un cammino ✧ fasullo a 3 passi. | D19, D21 | §3.1 (cammini): un frammento che nomina più di N nodi (sguardo, liste) vale come "stessa lista", non come ponte, e non si attraversa. |
| Q10 | media | **Delicati a richiesta e nei conti.** La prudenza (§4.1) dice solo lettera, "ti ricordi?" e sogno. B25 finisce in cima a D02; B12 entra nel conto "dopo le 22" di D01 e nel «amore solo in B12» di D23; *La cura* (B12) nominata nel conteggio di D16. Nulla su `parole.md`, `indice.md`, `ritratto.md`. E la prudenza vieta proposte, mentre D03 ne chiede una. | D01, D02, D03, D16, D23 | §4.1 (la prudenza): a richiesta esplicita delle sue parole i delicati si riportano verbatim, mai in testa e mai nei numeri di un tratto; nei conteggi si contano, non si nominano; una proposta solo se la chiede lui, una, prima le sue parole. Dire che cosa ne fa `contesto/`. |
| Q11 | media | **Testo altrui con `voce: sua`.** U18 (la poesia) e U19 (il monologo) sono trascrizioni: "solo le mie" li deve escludere, ma il Progetto lo indovina dal testo. Con una citazione italiana senza virgolette sbaglierebbe. | D02 | §2.2 (`lettura`): un campo `testo-altrui: <slug>` con le righe, riportato da `contesto.mjs` in `parole.md`. |
| Q12 | media | **Posizioni e conti non arrivano al Progetto.** `tempo.json` e `conti.json` stanno in `.indice/`, e il formato di `tempo.json` non è scritto. D10 e D12 vivono della "tensione" del ritratto; i "zero" di D23 sono contati a mano. | D10, D12, D23 | §3.1: `contesto.mjs` scrive in `indice.md` una sezione "Posizioni" (data · frase · voce · dal/al · tensioni); il modello fissa i campi di `tempo.json`. |
| Q13 | media | **Chi scrive `ritratto.md`, e dove vanno lettere e ritratti.** §2.1 lo vuole da uno script senza AI, §4.3 trimestrale scritto dall'AI, §2.2 vieta all'AI lo sguardo. Tra un trimestre e l'altro non si sa che cosa contenga. Le restituzioni `settimana` e `ritratto` non hanno posto in `contesto/`. | D01, D09, D10, D12, D23, D24 | Allineare §2.1, §2.2 e §4.3: chi scrive il ritratto e quando; dove stanno lettere e ritratti in `contesto/`. La simulazione non propone una soluzione. |
| Q14 | media | **`converge-con` e `contraddice` non raggiungono il mondo.** D07 vuole `converge-con` verso Eraclito e Hölderlin, che non sono nodi e non devono nascere; D09 chiede fonti contro fonti, ma `contraddice` va da frammento a frammento. | D07, D09 | §2.3: nelle restituzioni `converge-con` e `contraddice` accettano un oggetto `mondo:` in chiaro; `contraddice` vale anche tra nodi persona. |
| Q15 | media | **Le voci puntano solo a nodi o al mondo.** D01, D02, D23 rinviano a frammenti; D21 a un frammento (B23); D20 a una candidata importata (t12). Accogliere una strada di tatuaggio mette `serve-a` sul frammento "sì, la seconda" e non si propaga al ponte di D19. | D01, D02, D20, D21, D23 | §2.2 (`restituzione`): `rif` ammette l'id di un frammento o di una restituzione; atto `accoglie: {di, n, serve-a: tatuaggi}`, e la raccolta elenca la voce accolta. |
| Q16 | media | **`ritorna-su` senza `n`, e il `come` che manca.** §2.6 "un effetto positivo vale come accoglienza": in D05 non c'è niente da accogliere, e un `accoglie` indovinato farebbe nascere legami. D06 e n.58 tornano su una cosa vecchia senza aggiungere né correggere: `ripensa` è sbagliato e pesa come ritorno pesante. | D05, D06, D08 | §2.6: l'effetto senza `n` vale per tutta la restituzione e non è accoglienza; lo diventa solo con `n` esplicito e legami ◌. §2.3: aggiungere `come: chiede` (pesa come un richiamo). |
| Q17 | media | **Portata del rifiuto e chiave dello scarto.** "questa di buddha non mi rappresenta" rifiuta la voce o il Buddha per sempre? Una voce ○ senza nodo né ID si riconosce solo per stringa; il "contesto" dello scarto non ha regola (solitudine vale anche per malinconia?). | D08, D18 | §4.5: il rifiuto vale per il legame; se il testo nomina l'entità e non il legame, vale per l'entità e la risposta lo dice. Chiave = artista + titolo normalizzato, riallineata nel consolidamento; contesto = i temi `parla-di` del frammento-domanda. |
| Q18 | media | **Una domanda che nomina un autore fa nascere il nodo?** §2.6 sì ("lo nomini tu"), il banco di D14 scrive solo la restituzione, l'importazione non l'ha fatto per u31. Quando nasce `fedor-dostoevskij`, le opere con `autore` in chiaro non vengono riscritte in slug. | D14 | §2.6: "anche una domanda nomina; il nodo nasce". Quando nasce una persona, `autore` in chiaro sulle opere si riscrive in slug (o la ricerca cerca entrambe le forme). |
| Q19 | media | **L'indice perde il `contesto` della lettura.** La riga di u31 sembra una richiesta di ottobre, ma era un esempio: il Progetto può dire un falso ("me l'avevi già chiesto"). | D14 | §3.1: la riga d'indice porta il contesto quando c'è (`esempio`, `citata da Claude`). |
| Q20 | media | **Le citazioni in `contesto/` senza testo né stato.** La riga di una citazione verificata non porta l'originale: per una ○ la chat cerca sul web o mette ⚠. Non è detto se l'indice mostra `esito`/`prova`. | D03, D06, D09 | §3.1: la riga d'indice di una citazione verificata porta esito, originale breve e traduzione (o "resa di Claude"). |
| Q21 | media | **Le verifiche del mondo non hanno memoria.** La voce 5 di D14, verificata in D15, vive solo in una restituzione: se la frase torna, si rifà tutto. | D15 | §3.1: un `.indice/mondo.json` di voci ○ già verificate (esito, luogo, data), letto prima di proporre; non è un nodo. |
| Q22 | media | **Le domande della chat contano come frammenti?** D24 deve dire "25 frammenti", ma dopo D01–D23 sono ~48; e per la lezione 6 sono proprio le domande a dire che cosa colpisce. | D23, D24 | §3.1 e §4.3: `canale: chat` resta fuori dai conti del ritratto e si conta in una riga a parte ("hai chiesto di…"). |
| Q23 | media | **Bersaglio sbagliato per il dolore.** B20 contraddice `s01` ✧, ma la frase «la dimensione principale…» è u03 ✦. | D10, D12, D25 | §2.3: il `contraddice` punta alla frase sua più vicina (u03) e, se serve, al passo del nucleo (Q6). |
| Q24 | media | **Lo strato ◌ contiene persone della vita.** Il cammino berserk–C22–battaglie-interiori–B08 passa per Marco amico: il filtro è sulla voce, non sulla cerchia. D19 passa "Non deve" solo per disciplina. | D19 | §3.1 (cammini): nei ponti si escludono i frammenti che nominano una persona `cerchia: vita`, salvo che la domanda li nomini. |
| Q25 | media | **`parla-di` opera → tema da una restituzione.** §2.3 lo dà "frammento → tema"; §7.3 e il banco lo fanno nascere sull'opera da una restituzione. | D17 | §2.3: ammettere `parla-di` in una restituzione con soggetto `{n: k}`; diventa legame del nodo solo all'`accoglie`. |
| Q26 | media | **La voce del `nomina` nato da un'accoglienza.** Non può essere `sua` né `accolta` (divieto del banco); `proposta` è strano per un "salvami". | D17 | §2.4: il legame nato da un atto porta `voce: proposta` + `da-atto: <id>`; l'indice lo mostra ●. |
| Q27 | media | **Righe d'indice senza slug certo; 41 o 42 nodi.** Nessun tema nasce a caldo; Sisifo (tema o opera?), kintsugi, fiume e nave restano senza nodo; brano e video di B13–B14 senza titolo. `nichilismo` c'è o no; le 8 domande come temi non esistono (B16 "◌ verso il tema Chi sono?" non ha oggetto). | D16, D21 | Rinvio agli [attriti dell'importazione](/progetto/v2/simulazione/attriti-importazione.md) A14, A16, A17. |
| Q28 | media | **Ordine degli importati.** `registrato` ha solo la data; 29 su 34 stanno al 2026-10-04. "Oggi" le 8 frasi di D02 sono una selezione non dichiarata; i "4 più vecchi" esclusi dai recenti sono il percorso interiore. | D02 (oggi) | Rinvio ad A4 degli [attriti dell'importazione](/progetto/v2/simulazione/attriti-importazione.md) (ora ignota, `vissuto`). |
| Q29 | bassa | **Domande già fatte.** Il ritratto chiede di amore e verità, la domanda resta "In sospeso" e D23 la ripeterebbe. | D23 | §4.3: prima di chiudere con una domanda si legge "In sospeso" e non la si ripete entro 30 giorni. |
| Q30 | bassa | **"Coda lunga" con due sensi.** §4.3: qualcosa dell'archivio che non rivedi da tempo; il banco: un brano poco noto del mondo. | D16 | §4.3: distinguere `coda-lunga` (archivio) da "fuori dai soliti" (mondo). |
| Q31 | bassa | **Due regole non allineate sulla scrittura.** Il banco dice "Scrive: solo la restituzione", §4.1 vuole anche il frammento-domanda e la sua lettura; §3.1 mette `contraddice` al consolidamento, D25 lo vuole all'ingresso. | D06, D25 (e tutte) | §4.1: domanda = frammento + restituzione; un `contraddice` di voce sua si scrive all'ingresso. |
| Q32 | bassa | **Premessa sbagliata.** In D06 la tentazione è colmare "sull'amore" con *Le cose dell'amore*, che il modello conosce. | D06 | Istruzioni del Progetto: "se la domanda presuppone una cosa che non hai, correggi la premessa prima di aggiungere mondo". |
| Q33 | bassa | **Voci divergenti tra indice e file; limiti di Code.** L'indice segna t11 e C16 ✧, ma t11 ha `voce: proposta` ◌. "Mentre eri via" (silenzi di 28, 25, 20 giorni) non compare nelle risposte. In Code "solo le mie" viola "al massimo 10 note" del `CLAUDE.md`. | D02, D19, D21 | L'indice prende la voce dal legame, non dall'origine della nota. Serve un `cerca.mjs --voce sua --testo`. Per "mentre eri via" la simulazione non propone una correzione. |

## 2. Verdetti

Modalità Progetto; per D01, D22, D23 lo stato "dopo" (2027-04-02). Code cambia? = che cosa migliora nella sessione Code,
dove è stata eseguita.

| domanda | Dati | Forma | Scrive | Non deve | causa | Code cambia? |
|---|---|---|---|---|---|---|
| D01 | passa | passa | passa male | passa | modello ambiguo (Q1; delicato nei conti, Q10) | — |
| D02 | passa | passa | passa male | passa | modello ambiguo (Q1, Q11) | sì: Scrive passa |
| D22 | passa | passa | passa male | passa | modello ambiguo (Q1) | — |
| D23 | passa male | passa | passa male | passa | contesto/ insufficiente (`conti.json`); modello ambiguo | — |
| D03 | passa | passa | passa | passa | contesto/ insufficiente per la ○ verificata (Q7, Q20) | — |
| D04 | passa | passa | passa | passa | — | — |
| D05 | passa | passa | passa male | passa | modello ambiguo (Q2, Q16); contesto/ insufficiente al prossimo n.50 | — |
| D06 | passa | passa | passa male | passa | modello ambiguo (Q31) | no: idem |
| D07 | passa male | passa | passa male | passa | contesto/ insufficiente (Q3); modello ambiguo (Q14) | sì: Dati passa |
| D08 | passa male (passa in stessa chat o dopo il Sync; fallisce in chat nuova prima) | passa | passa | passa | contesto/ insufficiente (Q8); modello ambiguo (Q2); dati mancanti (eredità) | — |
| D09 | passa male | passa | passa male | passa | contesto/ insufficiente (Q3); dati mancanti (terza tensione); modello ambiguo (Q14) | — |
| D10 | passa male | passa male | passa male | passa | contesto/ insufficiente (Q12); modello ambiguo (✦/✧, Q1) | — |
| D11 | passa | passa | passa male | passa | modello ambiguo (Q1) | sì: Scrive passa |
| D12 | passa male | passa | passa male | passa | contesto/ insufficiente (Q12); modello ambiguo (Q1) | — |
| D25 | passa | passa | **fallisce** | passa | modello ambiguo (Q1, Q6) | sì: Scrive passa male |
| D13 | passa male | passa | passa male | passa | contesto/ insufficiente (scarti, Q4); modello ambiguo (cattura nascosta, Q1) | — |
| D14 | passa male | passa | passa male | passa | costo e contesto/ insufficiente (Q7); dati mancanti (§7.6) | sì: tutto passa |
| D15 | passa | passa | passa male | passa | modello ambiguo (Q1, Q21) | sì: Scrive passa |
| D16 | passa | passa | passa male | passa | modello ambiguo (voci verso non-nodi, Q15) | — |
| D17 | passa | passa | passa male | passa | modello ambiguo (Q25, Q26) | — |
| D18 | passa | passa | passa male | passa (rifacimento: passa male) | modello ambiguo (Q17); contesto/ insufficiente nel rifacimento (Q4) | — |
| D19 | passa male | passa | passa | passa (solo per disciplina) | dati mancanti (C17, C24); contesto/ insufficiente (Q3); modello ambiguo (Q24) | sì: Dati passa |
| D20 | passa male | passa | passa male | passa | contesto/ insufficiente (Q3, Q8); modello ambiguo (Q15) | — |
| D21 | passa male | passa | passa | passa | contesto/ insufficiente (Q3); modello ambiguo (Sisifo senza genere, Q27) | sì: Dati passa (per testo, non per grafo) |
| D24 | passa | passa | passa | passa | modello ambiguo nella lacuna (Q22) | — |

Conto Progetto: Dati 14 / 11 / 0 · Forma 24 / 1 / 0 · Scrive 6 / 18 / 1 · Non deve 25 / 0 / 0 → **69 / 30 / 1**.
Conto Code (D02, D06, D07, D11, D14, D19, D21, D25): **29 / 3 / 0**. D15 ha anche la variante Code (Scrive passa), fuori dal conto.

## 3. Correzioni al banco

- **Voci ✧ che sono ✦.** U01 (D03: "4 ottobre ✧" è ✦); u03 «la dimensione principale…» (D09, D10, D12, B20: ✦, non ✧);
  B08 "battaglie interiori" ✧ (U1, U2, U8 entrano ✦); D19 "stessa lista del nucleo ✧": U11 e U12 sono ✦, quindi
  "nella tua lista del 4 ottobre ✦, ripresa nel nucleo ✧".
- **D06 non richiede il tab Code** (banco, riga 286): vale solo finché non c'è `parole.md`. Anche la lacuna generale di D02
  (righe 286-287) è superata da `parole.md` (modello §2.1, §2.6).
- **D15: manca il libro V, cap. 5** ("Il Grande Inquisitore"), l'unico luogo in cui Ivan dice la formula in prima persona.
  In II, 6 non c'è Dio ma l'immortalità; in XI, 4 parla Dmitrij. Fuori dal banco: `restituzione.md` §6.1 ("riferita da altri")
  dimentica V, 5; it.wikiquote attribuisce XI, 4 a Ivan.
- **D01, i conti.** «8 su 25 dopo le 22»: l'ottavo è B12 (02:10), delicato, che il banco stesso vieta di usare come prova.
  "Dopo le 22" va letto "dalle 22 in poi" (B19 è alle 22:00).
- **Scrive: "solo la restituzione"** (D06 e seguenti): per il modello anche la domanda è frammento con lettura (§2.2, §4.1).
- **D14 e §7.6: "2 citazioni mie ◌"** che l'importazione non porta; e il banco non prevede il nodo `fedor-dostoevskij` (Q18).
- **D07: B09 tra i dati.** È una frase di Nietzsche sul *perché*, non sull'ostacolo; metterla tra le voci avvicina "Frankl = Nietzsche". Da chiarire.
- **D23: «amore solo in B12»** è una lettura su un delicato e non si vede dal testo.
- **D24: "25 frammenti"** è vero solo escludendo le ~23 domande in chat (Q22).
- **D16: "coda lunga"** usata come "brano poco noto" dal mondo, contro §4.3 (Q30).
- **D11:** la riga sottolineata del 10 marzo il banco non la dà (dati mancanti).
- **B16:** "◌ verso il tema Chi sono?" non ha oggetto (le 8 domande non sono temi).

## 4. Progetto o Code

| domanda | che cosa cambia nella qualità con Code |
|---|---|
| D02 | Poco: `parole.md` è completo. Code vede D01 senza Sync, esclude U18/U19 dai dati della lettura e non dal riconoscimento del testo, dà "il resto" in blocco. Costa 4-5 volte e sfora "al massimo 10 note". |
| D06 | Poco nella sostanza: la parte ✦ è in `parole.md`. Code sa che il titolo era già chiesto e mai confermato, lega "verso la fine" alla frase, dà lo stato della verifica di Nietzsche. ~6 volte il tempo. |
| D07 | Parte ✦ e direzione uguali. Code dà la provenienza esatta della voce ◌, sa che la frase è la forma di Hays, scarta C17/C18 che il Progetto citerebbe a vuoto. Guadagno reale solo su ◌/○. |
| D11 | Parole e conti identici. Code aggiunge la riga OCR e sa che la correzione del 12 non ha prodotto un atto. Per marzo basta il Progetto; per "marzo di due anni fa" no. |
| D14 | Tutti i capitoli verificati sul testo invece di tre ⚠; l'aggancio a u31 è vero perché il contesto della lettura lo dice; scarti letti; scrive da sé. Circa il doppio del tempo. |
| D19 | Ponti con la prosa delle restituzioni importate invece dei titoli; il ponte 3 si regge sull'archivio e non su Griffith; certezza che nessuna convergenza tiene insieme i due nodi; niente rischio Marco amico. Per la forma del banco si equivalgono. ~4 volte il tempo. |
| D21 | Code ha la prosa di t11 e C16 e il posto nel grimorio: le strade diventano pezzi collocati nella patchwork, la terza è la variante già pensata a ottobre. Il Progetto ha il concetto giusto ma ripropone come nuovo il già proposto. |
| D25 | La risposta quasi uguale. Cambia tutto nello scrivere: solo Code salva il frammento, il `contraddice` ✦ e ricalcola `tempo.json`. Dal Progetto nessuna posizione si chiude. |

**Regola proposta (quando instradare a Code).** Il Progetto resta la via di default: le parole ✦ stanno in `parole.md` e
costa 4–6 volte meno tempo. Si va a Code quando:
1. la domanda va **verificata sul mondo** con testo primario ("top quote", "è vera?", capitoli) (Q7);
2. la domanda **deve scrivere** qualcosa che conta (una contraddizione, una posizione, un'accoglienza), finché vale Q1;
3. la risposta vive in ciò che `contesto/` non porta: prosa delle restituzioni importate, letture (testo altrui,
   provenienza delle ◌), scarti, `tempo.json` (ponti e tatuaggi: D19, D21) (Q3, Q4, Q12);
4. il periodo chiesto è uscito da `contesto/`, o `parole.md` non entra più nel Progetto (§2.6).

## 5. Misure

Come riportate nelle sezioni Misura. Token = letti nel contesto della risposta; file = file letti; tempo = risposta.

| domanda | token (Progetto) | file | tempo | token (Code) | file | tempo |
|---|---|---|---|---|---|---|
| D01 | ~13.700 | 5 | ~15 s | — | — | — |
| D02 | ~13.700 | 5 | ~20 s | ~11.000 | ~67 | 1–2 min |
| D22 | ~15.000 | 5 | ~15 s | — | — | — |
| D23 | ~15.100 | 5 | ~15 s | — | — | — |
| D03 | ~15.400 (con 1 ricerca web) | 4 | 15–20 s | — | — | — |
| D04 | ~14.100 (in cache) | 0 nuovi | 3–5 s | — | — | — |
| D05 | ~14.200 (in cache); Routine ~4.000 | 0 nuovi | ~3 s | — | — | — |
| D06 | ~14.400 | 4 | 5–10 s | ~6.900 | 11 | 60–120 s |
| D07 | ~18.000 (con 2 ricerche) | 4 | 20–40 s | ~10.000 | 8 + 1 pagina | 2–3 min |
| D08 | ~15.600 stessa chat; ~15.500 chat nuova | 0 / 4 | 3–8 s | — | — | — |
| D09 | ~15.500 | 4 | 10–15 s | — | — | — |
| D10 | ~13.700 | 5 | 5–8 s | — | — | — |
| D11 | ~13.700 | 4 | ~5 s | ~6.200 | 19 | 40–70 s |
| D12 | ~13.700 | 4 | ~5 s | — | — | — |
| D25 | ~16.000–17.000 | 4 | 6–8 s | ~11.000 | ~27 | 1,5–2 min |
| D13 | ~17.000 (con 2 ricerche) | 5 | 20–40 s | — | — | — |
| D14 | ~45.000 (con fetch Wikiquote) | 5 | 1–2 min | ~10.000 + subagent ~25.000 | ~8 + 3 testi | 3–4 min |
| D15 | ~13.700 + 1.000 + fetch 10–30k | n.d. | ~1 min | ~3.000 | n.d. | ~1 min |
| D16 | ~16.700 (con 5 ricerche) | 4 | 20–40 s | — | — | — |
| D17 | 0 nuovi (in cache); Routine 2–3k | — | istantaneo | — | — | — |
| D18 | 0 nuovi (in cache); Routine 2–3k | — | istantaneo | — | — | — |
| D19 | ~14.200 | 0 del repo | ~15 s | ~11.000 | 12 | 1,5–2 min |
| D20 | ~14.500; "sì, la seconda" ~14.800 | 0 del repo | ~15 s + 5 s | ~6.000 | n.d. | ~1 min |
| D21 | ~14.300 | 0 del repo | ~15 s | ~10.300 | 9 | ~1,5 min |
| D24 | ~14.500–17.500 | 0 del repo | ~20 s | — | — | — |

**Totali e medie** (punti medi degli intervalli; D17 e D18 fuori dalla media dei token, perché non leggono niente di nuovo):
- **Progetto:** ~395.000 token su 23 domande, media ~17.200, mediana ~15.000; senza D14 e D15 ~15.000. File: sempre i 4–5
  di `contesto/`. Tempo: ~440 s su 25 domande, media ~18 s, mediana ~15 s. Il massimo è la verifica del mondo (D14, D15).
- **Code (8 doppie):** ~76.000 token nella sessione, media ~9.500 (~12.700 con il subagent di D14); 8–67 file;
  ~15 min in tutto, media ~1,9 min. Sulle stesse 8 il Progetto: media ~24 s.
- **Contesto/:** ~13.700 token il 2 aprile 2027 contro ~9.350 al giorno 1; una riga di frammento in `indice.md` costa ~37 token
  (1.000 frammenti ≈ 37k).

## Collegamenti

- [Simulazione delle domande](/progetto/v2/simulazione/domande-simulate.md)
- [Modello v2](/progetto/v2/modello.md)
- [Banco di prova](/progetto/v2/banco-di-prova.md)
