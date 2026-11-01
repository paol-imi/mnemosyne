# Critica del modello v2: il tempo e l'uso reale

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Non tocca note né script.
> Critica avversaria del [modello v2](/progetto/v2/modello.md), letto con [essenza](/progetto/v2/essenza.md),
> [archivio reale](/progetto/v2/archivio-reale.md) e [telefono](/progetto/v2/telefono.md). Non cerca conferme:
> cerca dove il modello crolla col passare del tempo e con un utente vero.
> I numeri marcati *stima* sono calcoli nostri. I tempi e i costi delle Routine vanno misurati sul campo.

**In una riga.** Il modello regge sui dati: frammenti immutabili, letture rifacibili, slug stabili. Crolla in cinque
punti: (1) le raffiche, che sono il modo naturale di scrivere dell'utente, producono push concorrenti e "quella di ieri"
non risolta; (2) alla tappa 1 la risposta a ogni memo non si vede, e il primo mese si riduce a "Salvato" più tre lettere;
(3) le chiacchiere salvate come frammenti gonfiano tutto da 3 a 6 volte e falsano il ritratto; (4) quando cambia il
modello che fa le letture, le serie storiche mostrano gradini finti, e il principio del tempo sincero cade; (5) nei primi
mesi la voce del sistema è quella di Claude, e il segno ● fa passare le parole dell'AI per sue.

---

## 0. Le ipotesi di simulazione

**Il ritmo osservato.** In un mese di Atlante ci sono 5 giorni attivi (4–8 ottobre), poi ~23 giorni di silenzio ([archivio reale](/progetto/v2/archivio-reale.md)), poi una
giornata intensa il 31 ottobre (26 commit). Il corpus degli ingressi ha 72 messaggi in cinque mesi simulati, lunghi in media
**17 parole**. Ne seguono due profili per l'anno:

| profilo | frammenti suoi | turni di chat salvati | restituzioni | da dove viene |
|---|---|---|---|---|
| **A, realistico** | ~400 (1,1 al giorno, a raffiche) | 0, oppure riassunti (§5) | ~450 | ritmo osservato, con il sistema che funziona |
| **B, come scritto** | ~1.000 | ~1.500 ("sì", "altre", "grazie", domande) | ~2.500 | il §4.1 punto 3: "ogni domanda e ogni risposta della chat vanno salvate" |

I 1.500–3.000 frammenti l'anno dell'ipotesi del coordinatore si raggiungono **solo** con il profilo B. È già il primo
segnale: in quel volume, la parte più grossa non è pensiero suo, è conversazione.

**Le misure di un file** (*stima*). Il frammento in `contesto/parole.md`, con la riga della data, vale ~50 token. La lettura
di §5.2 occupa ~700 caratteri, cioè ~250 token. Una riga di `contesto/indice.md` vale ~30 token (lo dice
[telefono §3](/progetto/v2/telefono.md)). Una restituzione di risposta vale 50–150 token, una lettera ~400.

---

## 1. Il primo mese, giorno per giorno (novembre 2026)

### La scena

| settimana | che cosa fa lui | che cosa riceve | effetto |
|---|---|---|---|
| **0** (1 nov) | i 10 passi a mano di [telefono](/progetto/v2/telefono.md): repo, PAT, ambiente, due Routine, Comando rapido, Progetto | niente | **rischio zero-giorno**: è il genere di compito che nell'Atlante restava senza risposta (0 decisioni su ~130) |
| **1** (2–8) | 7 memo in 3 giorni: Galimberti mar 23:40, "ah e…" mer 08:12, un link Spotify, Sisifo felice gio, un reel. Sabato chiede nel Progetto "cosa ho salvato questa settimana?" | 7 volte "Salvato". Le 7 risposte di 1–2 righe finiscono in `contesto/recenti.md`, che non apre mai. La domanda di sabato riceve una risposta vecchia, perché il **Sync è manuale** | domenica 8: **la lettera della tensione** (Galimberti, il nucleo, Rust). **Primo stupore.** |
| **2** (9–15) | 3 memo, due in raffica. Una sera, 6 turni nel Progetto ("canzoni sulla solitudine", "altre", "la seconda sì") | 3 "Salvato". La chat è di sola lettura e non salva niente: "la seconda sì" **si perde** | domenica 15: lettera magra. L'unico materiale "vecchio" è l'importato, quindi tornano Rust e il nucleo. Il "ti ricordi?" a una settimana cade su Galimberti, **di 12 giorni prima**: se lo ricorda benissimo. **Prima noia: la ripetizione.** |
| **3** (16–22) | silenzio dal 14 al 24 | niente; il consolidamento non gira (corretto) | intanto l'orologio dei 60 giorni corre sulle proposte della settimana 1 |
| **4** (23–29) | mer 25 un link Spotify nudo, ven 27 "boh niente", sab 28 "oggi mi sento come sisifo" | il "che cosa ti ha preso?" del link finisce in `recenti.md`, **non lo vede** | domenica 29: il confronto "Sisifo felice il 5, Sisifo il 28". **Secondo stupore**, ed è quello che il modello promette. |

**I conti del mese:** ~14 memo, 14 "Salvato", ~12 risposte che non legge, 3 lettere (8, 15, 29), 2 "ti ricordi?" di cui
uno banale, 0 risposte salvate dalla chat.

### Il giudizio

- **Che cosa stupisce:** la lettera dell'8 e quella del 29. Tutte e due vengono dalla **tensione** e dal **confronto**, non dal
  sogno e non dal "ti ricordi?".
- **Che cosa annoia:** la lettera 2, che ricicla il seme, e il "ti ricordi?" di cose recenti.
- **Quando smette:** il punto di rottura cade nella settimana 3. Se l'ultima cosa ricevuta prima del silenzio è stata una
  lettera ripetitiva, il ritorno non è garantito. È lo stesso profilo dei 23 giorni.
- **La causa di fondo:** la **scena 1 dell'[essenza](/progetto/v2/essenza.md)** (Galimberti che trova Rust nell'attimo
  della cattura) alla tappa 1 non accade mai. Il modello lo ammette (§8.7), ma lascia il primo mese senza la meraviglia
  della cattura, che è proprio il mese in cui si decide l'abitudine.

### I crolli del primo mese

**C1. La risposta a ogni memo è invisibile.** *Gravità alta.* Stare in `recenti.md` più il Sync manuale vuol dire non
leggerla mai. La notifica "senza contenuto", che porta a un file su GitHub, educa a ignorare le notifiche. Inoltre il file
di una restituzione si apre con il frontmatter (`voci`, `legami`), che GitHub mostra come una tabella **sopra** la lettera:
la ricompensa arriva con l'aspetto di un file di configurazione.
**Correzione:**
- (a) Alla tappa 1 le risposte per memo **non si notificano**. Quelle con un aggancio vero confluiscono nella lettera
  ("martedì, salvando Galimberti, avevo visto Rust").
- (b) Il testo della lettera è il **messaggio finale della sessione Routine**. Se la notifica della Routine apre la
  sessione nell'app Claude, che è privata dietro il login, la lettera si legge lì, in prosa e senza YAML. È da provare
  per primo (punto 2 di telefono, "che cosa resta da provare").
- (c) Il connettore MCP di sola lettura (`cerca`, `leggi`) va **anticipato** al secondo mese, non rimandato "dopo 1-3 mesi" come in [telefono](/progetto/v2/telefono.md).

**C2. La domanda su cose recenti fallisce in silenzio.** *Gravità alta.* "Cosa ho salvato ieri?" nel Progetto non
sincronizzato risponde con dati vecchi, senza dirlo. È il primo tradimento di fiducia, e arriva nella settimana 1.
**Correzione:** ogni file di `contesto/` porta in testa `aggiornato: 2026-11-07T23:41`. L'istruzione del Progetto è
**obbligatoria**: "se la domanda tocca giorni più recenti di `aggiornato`, dillo prima di rispondere". Non è una mitigazione
facoltativa.

**C3. La lettera senza soglia.** *Gravità media.* La regola "se hai scritto" fa partire la lettera anche per un solo "boh".
Con poco materiale, la fase 2 riempie con il seme: è l'eco.
**Correzione:** la lettera parte solo con **≥ 3 frammenti parlanti** nella settimana (con parole sue, cioè non link nudi,
non "boh", non "sì"). Altrimenti la settimana slitta e la lettera successiva copre due settimane. Mai due lettere di fila
con lo stesso nodo d'appoggio importato.

**C4. Il "ti ricordi?" come quiz.** *Gravità media.* L'indizio con la fine nascosta ("…quale?") è una domanda, e il dato
dice 0 risposte su ~18. "Torna una volta, più facile" è un sollecito, e il principio 12 dell'[essenza](/progetto/v2/essenza.md) lo vieta. Inoltre gli intervalli
(una settimana, un mese…) contati dal salvataggio producono ricordi di cose di 12 giorni prima.
**Correzione:**
- il "ti ricordi?" è un'**affermazione**: la frase intera, la data, una riga d'oggi, e nessuna attesa di risposta;
- solo su frammenti ✦ (mai ✧) **più vecchi di 60 giorni**: nel primo mese e mezzo non ce n'è, e va bene così;
- niente ripetizione.

**C5. Il sogno troppo presto.** *Gravità bassa.* Con 10 frammenti suoi, un legame "lontano e ardito" pesca per forza nel
seme. **Correzione:** il sogno resta spento fino a **50 frammenti parlanti**.

**C6. Le raffiche spezzano l'ingresso.** *Gravità alta: settimana 1, prima sera.* Galimberti alle 23:40 e poi "ah e…"
qualche minuto dopo (succede, E01–E02) fanno partire **due sessioni in parallelo** ([telefono §2](/progetto/v2/telefono.md)).
I guasti sono tre:
- la seconda sessione legge gli "ultimi 3 giorni" da un `main` che non contiene ancora il primo frammento, e "la frase
  dell'ospite" non si risolve;
- tutte e due rigenerano `contesto/indice.md`, `parole.md` e `recenti.md` (stesse righe, conflitto certo) e magari creano
  lo stesso nodo (`persone/umberto-galimberti.md`, un conflitto add/add);
- `pull --rebase`, "riprova una volta": il secondo push fallisce.

**Correzione:** l'ultima sessione vince.
1. Il Comando rapido fa il PUT e poi il fire, come oggi.
2. La sessione aspetta 90 s, fa `pull` e guarda `ingresso/`. Se c'è un file **più recente del suo**, esce: lo elaborerà
   la sessione più recente.
3. Altrimenti elabora **tutto** `ingresso/` in ordine di tempo.

Inoltre `contesto/` **non lo rigenera la Routine "smista"**: lo rigenera un passo unico alla fine (o la passata delle
3 ore), con un file `ingresso/.in-corso` come lucchetto. Elaborare deve essere idempotente: un frammento senza lettura
**è** la coda.

---

## 2. Un anno dopo (novembre 2027)

### Le misure

| | profilo A | profilo B | da dove viene (*stima*) |
|---|---|---|---|
| frammenti | ~400 | ~2.500 | §0 |
| nodi | ~300 (240 entità, 60 temi) | ~800 (le risposte accolte e le domande creano opere e persone) | ~0,6 nodi nuovi a frammento all'inizio, poi in calo |
| letture | 400 × ~250 token ≈ 100k token, ~0,3 MB | 2.500 × 250 ≈ 625k token, ~1,75 MB | |
| versioni medie di una lettura | 3–4 | 3–4 | v1 all'ingresso; v2 al consolidamento della settimana; v3 quando nasce un tema; +1 per fusione, tagging all'indietro, correzione |
| `contesto/` | parole 20k + indice 12k + ritratto 2k + recenti 3k ≈ **37k token** | parole ~100k (i turni di chat sono corti, ~40 token) + indice 75k + resto 5k ≈ **180k token** | |
| esecuzioni di "smista" | ~400 | ~2.500, con picchi di 20–30 in una sera di chat | il limite è **30 fire all'ora per Routine** ✔ |
| consolidamenti | ~35 (le settimane con frammenti) | 52 | |
| proposte ◌ create | ~1.700 | ~10.000 | 2 per lettura + 3 per lettera + 2 per risposta |
| proposte accolte | 2–5% | 2–5% | nell'Atlante erano 0 su 106 |

### Il costo e il tempo

- **"Smista"** (*stima, da misurare*). Una sessione nuova a ogni esecuzione: clonazione e avvio 30–90 s, lavoro
  dell'agente 1–3 min, in tutto **2–5 minuti**. Che cosa legge: `CLAUDE.md`, la tabella dei nomi e degli alias di tutti i
  nodi (A ~7k token, B ~20k), gli ultimi 3 giorni, 5 restituzioni, `scarti.json`, poi gli script. Contando i giri del ciclo
  agentico, sono **100–300k token d'ingresso** (in gran parte in cache) a memo.
  - Profilo A: va bene.
  - Profilo B: 2.500 sessioni l'anno pesano sul piano in modo che va misurato, e una sera di chat con 30 domande **sbatte
    contro il limite orario**.
- **Consolidamento.** I frammenti della settimana, 20 vecchi, la lista dei temi, gli alias, 2–5 ricerche web per le
  citazioni e la riscrittura di ~30 letture: **10–30 minuti, 0,3–1M token**. Una volta a settimana regge.
  - **`indice.mjs`** su 3.000 file YAML ci mette meno di 2 s. **Non serve correggerlo.**
  - **La dimensione del repo** dopo un anno è di pochi MB di testo; `parole.md` e `indice.md` riscritti a ogni commit si
    comprimono bene in git. Le immagini, se arrivano, pesano più di tutto il resto. **Non serve correggerla.**

### Che cosa entra nel contesto di una domanda

- **Profilo A:** tutto `contesto/` sta comodo nel Progetto per **3–4 anni** (parole.md cresce di ~20k token l'anno).
- **Profilo B:** a ~180k token il Progetto passa da solo al recupero (RAG) ✔ ([telefono §3](/progetto/v2/telefono.md)).
  Allora "tutte le volte che ho parlato di mio padre" restituisce **una parte**, senza dirlo. I conteggi del ritratto
  fatto in chat diventano falsi. Il modello lo rimanda a "quando diventerà troppo grande": col profilo B succede tra il
  sesto e il nono mese.

**C7. `contesto/` non ha un budget.** *Gravità alta col profilo B, media con l'A.*
**Correzione:** un tetto fisso di **≤ 80k token** per `contesto/`.
- `parole.md` contiene **solo** i frammenti parlanti ✦: niente turni di chat, niente "sì", niente link nudi.
- `indice.md` si fa **per nodo** (~300–800 righe) e non per frammento. Il dettaglio per frammento è già in `parole.md`,
  quindi oggi lo stesso contenuto c'è due volte.
- Quando si supera il tetto: si tagliano prima i link nudi, poi si passa all'MCP. Mai il RAG muto.

### La deriva dei temi

**C8. Doppioni, divisioni impossibili e slug immortali.** *Gravità media.* Con i temi presi dalle sue parole nascono
varianti vicine ("solitudine", "stare da solo", "isolamento"), perché ognuna è una parola sua. *Stima:* 10–20% di temi
doppi dopo un anno. Il consolidamento vede la settimana e 20 frammenti vecchi, e quindi **non può** dividere un tema
largo come "dolore", che ha 100 e più frammenti. La fusione uccide uno slug, e la regola dice che uno slug non cambia mai.
**Correzione:**
- (a) Una passata **mensile, solo sull'indice dei temi** (nome, alias, conteggio, tre frasi d'esempio): propone le fusioni;
  le esegue uno **script** sulle letture, senza rileggerle.
- (b) Lo slug fuso resta come **lapide**: un file con `fuso-in: <slug>`, così i rimandi vecchi funzionano.
- (c) **Niente divisioni scritte.** I sottofili di "dolore" si calcolano al momento della domanda, perché è lì che si
  vedono. Il modello non ha bisogno di nuovi predicati.

### Le letture riscritte

**C9. Le riscritture incrociate.** *Gravità media-alta.* Il §6.3 fa riscrivere a "smista" la lettura di ieri (la
correzione Peterson), e il consolidamento domenicale riscrive le letture toccate. Se arriva un memo durante il
consolidamento, due scrittori lavorano sullo stesso file. Ogni riscrittura alza anche il rischio di perdere un legame
accolto. "Vince l'atto" è una regola giusta, ma va applicata a ogni giro.
**Correzione:** **ogni lettura ha un solo scrittore.** "Smista" scrive solo la v1 del frammento che elabora; le versioni
successive le scrive solo il consolidamento. Gli atti (correggi, accogli, rifiuta) **non riscrivono mai** una lettura
altrui: li applica l'indice, come già fa per `accolta`. È lo stesso principio del modello, esteso alle correzioni.

### Lo sbiadimento a 60 giorni

**C10. Un orologio a calendario per un utente che sparisce.** *Gravità media.* Basta un silenzio di due mesi
(plausibile: il primo è durato 23 giorni) e al ritorno **tutte** le proposte sono sbiadite insieme. Il sistema sembra
vuoto proprio quando dovrebbe dire "mentre eri via". Anche il "toccato" non è definito: conta se lui scrive del nodo, o
solo se riprende proprio quel legame?
**Correzione:**
- lo sbiadimento si conta in **giorni attivi** (giorni con almeno un frammento parlante): **30 giorni attivi**, che con
  il profilo A sono circa 3–4 mesi di calendario;
- "toccato" vuol dire un frammento ✦ che nomina uno dei due capi del legame;
- la stessa unità vale per la mezza vita della vitalità e per gli intervalli del "ti ricordi?".

**C11. Una restituzione per ogni "Salvato."** *Gravità bassa.* ~400–2.500 file di testo dell'AI, quasi tutti vuoti di
contenuto. **Correzione:** si scrive una restituzione `risposta` solo se contiene un aggancio, una correzione o una
domanda. Il resto è un `risposta: salvato` nella lettura.

---

## 3. Cinque anni dopo (2031)

### Lo schema

**Che cosa regge.** Il formato di `frammenti/` è minimo (`registrato`, `canale`, testo). È la scelta più solida del
modello, e **non serve toccarla**. Anche la cattura via `PUT` regge: è GitHub puro e sopravvive alla fine di qualunque
anteprima.

**C12. Né una versione dello schema né un modo di migrare.** *Gravità media, che cresce col tempo.* `versione` nella
lettura numera le **letture**, non lo **schema**. Prima o poi arriverà un genere nuovo (`luoghi/`), un campo rinominato o
un predicato diviso. Oggi l'unica via è `rileggi`, che passa dall'AI e procede in ordine, un frammento dopo l'altro
"perché gli atti dipendono da ciò che c'era prima". Il conto *stimato*, con 2.000–12.500 frammenti a 5 anni: rileggerli
tutti dentro Routine da ~20 frammenti l'una (*ipotesi*) costa da 100 a 500 sessioni in sequenza, cioè **giorni**, e con le API decine o
centinaia di dollari.
**Correzione:**
- (a) Un file `_schema.md` con il numero di versione, e il campo `schema: 2` in ogni lettura e in ogni nodo.
- (b) Le migrazioni **meccaniche** (rinominare, spostare, dividere un campo) sono script deterministici,
  `scripts/migra/003-….mjs`: si lanciano una volta e si fa un commit "migrazione 003". **Senza AI.**
- (c) Le migrazioni **semantiche** (un genere nuovo) rileggono con l'AI solo i frammenti trovati da una ricerca testuale
  (i nomi di luogo), non l'archivio intero.
- (d) Gli atti puntano a id stabili (`di: r-…, n: 3`). Quindi le letture si possono rifare **in parallelo**, e poi lo
  script riapplica gli atti. L'ordine conta solo per risolvere "quella di ieri", e quella risoluzione si salva nella v1 e
  non si rifà.

### Il cambio di modello

**C13. Le letture di modelli diversi fanno gradini nelle serie storiche.** *Gravità alta: tocca il principio 7, "il tempo
è sincero".* Mettiamo che il modello del 2026 metta `parla-di: dolore` con generosità e quello del 2028 con parsimonia.
La domanda n.73, "com'è cambiato il mio modo di vedere il dolore?", vedrebbe allora un calo a marzo 2028: **un artefatto
del cambio di lettore** raccontato come un'evoluzione sua. Lo stesso succede alla voce delle lettere, che cambia tono da
un mese all'altro. Succede al prompt della Routine, ritoccato più volte. E alle tre dipendenze in anteprima: il fire
`experimental-cc-routine-2026-04-01`, il Sync del Progetto, le notifiche push (**?**). In cinque anni cambieranno di
sicuro.
**Correzione:**
- (a) In ogni lettura `letto-da: <modello>` e `prompt: <hash del prompt di smista>`.
- (b) Quando cambia il lettore, una **taratura**: si rileggono 100 frammenti campione col nuovo lettore e si confronta la
  frequenza dei predicati per tema. Se lo scarto supera ~20% su un tema che compare nelle serie, si rileggono tutte le
  letture di quel tema (in parallelo, C12d). Altrimenti la vista segna la data come "**cambio di lettore**".
- (c) Le serie del tempo contano **i frammenti ✦ e le loro parole** (stabili) prima dei legami dell'AI (instabili).
  "Dolore" detto da lui si conta con una ricerca nel testo. "Parla di dolore secondo l'AI" si mostra a parte.
- (d) Le restituzioni restano immutabili. Portano anche loro `letto-da`: è un fatto che quel giorno *quel* modello gli
  ha detto quella cosa.

---

## 4. La colonizzazione: dopo un anno, le parole di chi?

**C14. La voce dell'AI entra da tre porte.** *Gravità alta, perché il primo scatto d'irritazione documentato è proprio
"te le sia inventate tu".*
1. **Il seme fa da materiale vecchio.** Nei primi mesi gli unici frammenti "di prima" sono importati: il nucleo, le 31
   frasi, 25 convergenze di Claude. Ogni lettera si appoggia lì. Al mese 1 la memoria lunga del sistema è **in
   gran parte ✧ o ◌**, cioè sintesi di Claude.
2. **Il ● fa da passaporto.** "Sì, la rabbia che diventa pace" rende ● un legame la cui **formulazione** è dell'AI. Il
   modello mette ● nelle risposte "nella mia testa" e "solo le mie" (R2): dopo un sì, la frase di Claude rientra come sua.
3. **I ritornelli.** Le metafore delle lettere ("chi apre la porta", "il prezzo della lucidità") tornano di lettera in
   lettera, diventano il lessico del sistema e poi, per eco, il suo.

**Correzione:**
- (a) **Il ● accoglie il legame, non le parole.** Nelle risposte "le mie frasi" un legame ● si mostra con la formula
  dell'AI tra segni (◌→●), **mai come citazione sua**. Le citazioni sono solo testo ✦.
- (b) **Niente ritornelli senza accoglienza.** Una metafora di una restituzione non si riusa in un'altra, a meno che lui
  non l'abbia scritta in un frammento.
- (c) **Il seme si consuma.** Una lettera può appoggiarsi al ✧ **una volta per nodo**. Dopo, solo al ✦.

**La misura.** Uno script, senza AI, scrive `.indice/voce.json`, e una riga va nel ritratto di ogni trimestre:

| indicatore | come si calcola | soglia |
|---|---|---|
| **Q-nomi** | % di temi il cui `nome` compare (in minuscolo, prefisso di 5 lettere) in ≥ 2 frammenti ✦ | **100%**: è un **errore di `verifica`**, non un dato statistico |
| **Q-citato** | % di caratteri delle lettere e dei ritratti tra virgolette e segnati ✦ | ≥ 35% |
| **Q-ancore** | tra i frammenti "vecchi" citati dalle lettere del trimestre, % ✦ contro ✧ | ✦ > 50% dal mese 6; se no, il sistema sta rileggendo l'Atlante |
| **Q-eco** | parole di contenuto nate in una restituzione e comparse **dopo** in un frammento ✦, in % sulle parole ✦ del mese | allarme se > 10% o se raddoppia sul primo trimestre |
| **ritornelli** | sequenze di ≥ 3 parole ripetute in ≥ 3 restituzioni e assenti dai ✦ | 0 |

**Q-eco non è un male in sé**: imparare parole è vivere. Va però **mostrato**. Una riga nel ritratto, "parole che hai
preso da me: *convergenza*, *lucidità*", è onesta, e di suo è già un pezzo di meraviglia.

---

## 5. Il confine tra conversazione e memoria

**C15. Ogni turno di chat diventa un frammento.** *Gravità alta.* Il §4.1 punto 3 salva come frammento ogni domanda
e ogni risposta, compresi "sì", "la terza", "altre", "grazie", "e più cupo?". Le conseguenze:
- **vicende false.** Una sera di curiosità su Dostoevskij, 4 turni, fa scattare la regola "≥ 3 frammenti sullo stesso nodo
  in 60 giorni". Il ritratto dirà "torna Dostoevskij (4)" per **una** sera;
- **conteggi falsati.** Il criterio di successo dell'essenza ("messaggi a settimana") misura la loquacità in chat, non il
  pensiero;
- **contesto saturo.** È il profilo B (C7);
- **limite orario.** Si arriva ai 30 fire all'ora (§2);
- **eco.** Le restituzioni di chat sono 2–3 volte più lunghe dei frammenti e vengono rilette dal consolidamento come
  contesto: il sistema finisce per leggere più sé stesso che lui;
- **l'opposto alla tappa 1.** La chat del Progetto è **in sola lettura** e "lo fa la chat con un memo" vuol dire che
  dovrebbe farlo lui, a mano. Quindi alla tappa 1 le domande **si perdono tutte**, comprese quelle che la lezione 6
  chiama "il tuo ritratto più fedele". Il modello è troppo largo a regime e troppo stretto all'inizio.

**Correzione:**
- (a) **L'unità è la conversazione, non il turno.** Una chat produce **un** frammento, `canale: chat`. Contiene **solo i
  suoi turni**, parola per parola e con l'ora di ciascuno, più una restituzione con le `voci` numerate delle risposte. Gli
  atti ("la terza sì", "la seconda no") restano atti di quel frammento.
- (b) I turni senza contenuto (sì, no, grazie, altre, ok) restano nel testo ma hanno `intento: niente`. Sono esclusi dai
  conteggi, dalle vicende e da `parole.md`.
- (c) **Le vicende contano i giorni distinti**: ≥ 3 frammenti in **≥ 3 giorni diversi**. Una sera vale una volta.
- (d) Le **domande** restano un segnale, ma si contano a parte ("hai chiesto tre volte di padri"). Non si sommano ai
  frammenti in cui porta qualcosa.
- (e) **Tappa 1:** un Comando rapido "Chiedi" che fa il PUT della domanda (`intento: chiedi`) prima di aprire il Progetto.
  Così la domanda resta, anche se la conversazione no. Costa un tocco, lo stesso di "Memo".
- (f) **La memoria di claude.ai** (ricerca nelle chat, memoria) va **spenta nel Progetto**, oppure dichiarata. Altrimenti
  ci sono due memorie che divergono: una che il repo non vede e una che la chat ricorda male.

---

## 6. Il quadro, per gravità

| # | crollo | quando | gravità | correzione in una riga |
|---|---|---|---|---|
| C6 | raffiche: push concorrenti, "quella di ieri" non risolta | settimana 1 | **alta** | vince l'ultima sessione (attesa di 90 s), lucchetto, `contesto/` scritto da un passo solo |
| C1 | risposta per memo invisibile; lettera dentro lo YAML | mese 1 | **alta** | lettera = messaggio finale della sessione; nessuna notifica per memo; MCP in lettura al mese 2 |
| C15 | chat salvata turno per turno | dal mese 2 | **alta** | un frammento per conversazione; `niente` fuori dai conti; vicende su giorni distinti |
| C13 | gradini da cambio di lettore nelle serie | anno 2+ | **alta** | `letto-da`, taratura su 100 campioni, serie sul testo ✦ |
| C14 | colonizzazione: seme, ● come passaporto, ritornelli | mesi 1–12 | **alta** | ● accoglie il legame e non le parole; seme una volta per nodo; `.indice/voce.json` |
| C2 | domanda su cose recenti, risposta vecchia muta | settimana 1 | alta | `aggiornato:` in `contesto/`, dichiarazione obbligatoria |
| C7 | `contesto/` senza budget, RAG muto | mese 6–9 (B) | alta / media | tetto di 80k token; `parole.md` solo ✦ parlanti; indice per nodo |
| C9 | riscritture incrociate delle letture | mese 2+ | media-alta | un solo scrittore per lettura; atti solo nell'indice |
| C12 | nessuna versione dello schema, `rileggi` sequenziale | anno 2+ | media | `_schema.md`, `schema:`, migrazioni a script, riletture parallele |
| C8 | doppioni di temi, slug che non può morire | mese 4+ | media | fusione mensile sull'indice, lapidi `fuso-in`, niente divisioni scritte |
| C10 | sbiadimento a calendario contro i silenzi | primo silenzio lungo | media | 30 giorni **attivi**; "toccato" definito |
| C3 | lettera senza soglia, che ricicla il seme | mese 1 | media | ≥ 3 frammenti parlanti, se no slitta |
| C4 | "ti ricordi?" come quiz e sollecito | mese 1 | media | affermazione, solo ✦ oltre i 60 giorni, mai ripetuto |
| C5 | sogno con troppo poco materiale | mesi 1–3 | bassa | spento fino a 50 frammenti parlanti |
| C11 | una restituzione per ogni "Salvato." | sempre | bassa | file solo se c'è contenuto |

**Che cosa non serve correggere**, perché i conti tornano: il formato del frammento; la cattura con PUT e poi fire;
`indice.mjs` (meno di 2 s); il peso del repo in un anno; il consolidamento settimanale (10–30 minuti); il "mentre eri via"
a 14 giorni, a patto che l'elemento si prepari **all'ultimo consolidamento prima del silenzio** e non si generi al ritorno.

**La cosa da provare per prima**, prima di qualunque pipeline: **la notifica della Routine apre la sessione con la lettera
leggibile nell'app?** Se sì, C1 si risolve gratis e il primo mese ha la sua ricompensa. Se no, la tappa 1 va ripensata
attorno a un canale che lui legge davvero.
