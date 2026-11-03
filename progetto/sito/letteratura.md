---
tipo: progetto-ricerca
origine: claude
validata: false
data: 2026-11-03
---

# Il sito: la letteratura per navigare una knowledge base personale e "mappare una coscienza"

> Progettazione del sito, 2026-11-03. È una proposta di Claude, da validare. È la ricerca da cui partire per progettare il sito con cui
> leggerai Mnemosyne; il sito si costruisce dopo la porta del blocco 6. Le ricerche sul web sono sette, ognuna affidata a
> un subagent e tutte su temi generali, mai sul contenuto del repository:
> - la storia;
> - Warburg;
> - giardini e spatial hypertext;
> - PKM e visualizzazione;
> - diari e archivi d'artista;
> - il telefono;
> - l'abbandono.
>
> Le fonti primarie sono state lette quando erano raggiungibili. Quello che viene da recensioni o abstract è segnato "(non verificato)",
> "solo abstract" o "di seconda mano"; ogni parte chiude con le fonti che non si sono potute leggere. Gli esempi non usano
> contenuto personale. Ogni voce segue lo stesso schema:
> - **che cosa è**;
> - **fonte**;
> - **perché funziona o fallisce**;
> - **compatibilità con Mnemosyne**;
> - **da prendere**.

**Il filo conduttore, in una frase.** Da Bush a Warburg, da Luhmann a Readwise, gli archivi personali che restano vivi hanno
quattro tratti in comune:
- mostrano **poche cose accostate** invece di tutto;
- tengono il testo intatto e mettono **l'ordine come uno strato dichiarato** sopra di esso;
- fanno **tornare** le cose, una alla volta, da fuori;
- non chiedono manutenzione.

Quelli che falliscono hanno anche loro tratti in comune:
- costruiscono una mappa globale, che solo chi l'ha disegnata sa leggere;
- chiedono di confermare la struttura;
- contano, sollecitano, riportano il dolore per anniversario.

L'Atlante aveva già:
- le "tavole" (`Tavola.vue`, "una carta come la tavola di un vecchio libro");
- un interruttore per le proposte, segnate in rosso;
- una mappa d3 a tre viste ("Tavole, Ruota, Firmamento").

La letteratura conferma la prima idea, corregge la seconda (il peso tipografico invece del rosso, un default austero) e spiega perché la
terza non è stata usata.

---

## Che cosa prendere per Mnemosyne

In ordine di importanza. Tra parentesi la parte del documento dove stanno le fonti.

1. **Niente mappa globale: la porta d'ingresso è la pagina del nodo.**
   - **Perché il grafo globale non serve:**
     - un grafo node-link di centinaia di nodi diventa una "hairball" che non si legge; già oltre una ventina di nodi
       una matrice si legge meglio (Ghoniem, Fekete, Castagliola, attraverso Munzner) (§4.1);
     - la memoria spaziale funziona solo per chi ha disposto le cose (Marshall & Shipman 1995; Kinopio). Una mappa
       composta dall'AI non è la tua mappa (§3.2, §3.3), ed è la spiegazione più sobria del "la mappa visiva non è stata usata".
   - **Che cosa mostra la pagina del nodo:**
     - in testa, le "porte" del §6.3 del modello;
     - sotto, le righe ✦ alla lettera e datate dei frammenti che lo nominano;
     - le proposte ◌ in uno strato separato e più leggero;
     - un vicinato locale solo se serve, a profondità 1, con layout fisso e ≤ 10 nodi.
   - **Perché la porta è il nome e non la data:** persone, luoghi ed eventi sono indizi di richiamo più forti del tempo
     (Sellen & Whittaker 2010, pp. 75–76) (§4.4). L'indice di Leopardi e il registro di Luhmann sono pagine-voce brevi,
     e il resto lo fanno i rimandi (§1.4, §5.1).

2. **La tavola è l'unità di pagina delle restituzioni.**
   - **Com'è fatta:**
     - una risposta, una lettera o un ritratto è una tavola: un campo uniforme e poche voci posate;
     - ogni voce porta il suo numero stabile (`r-…#n`), che è anche il bottone che apre la provenienza
       (il modello è la pagina Cornell sul Bilderatlas, con i bottoni 7.4 posati sulle immagini) (§2.8);
     - il ponte e il `contraddice` si mostrano come due frasi ✦ con data e luogo, una accanto all'altra,
       **senza il perché ◌ in vista**: il perché sta dietro un tocco.
   - **Le fonti:**
     - Warburg apre l'Introduzione con lo «Zwischenraum» come «Grundakt menschlicher Zivilisation»;
     - Michaud parla di una «iconologie des intervalles», irriducibile al discorso (§2.2, §2.9).
   - **Il nesso con le regole:** è la definizione di "forte" di `CLAUDE.md`, fatta interfaccia. Se un accostamento ha bisogno della spiegazione per
     reggersi, non va sulla tavola.

3. **La provenienza come struttura, non come nota: la transclusione.**
   - **La citazione:** una frase ✦ citata in una lettera non è una copia. Si legge dal frammento quando la pagina si
     apre, e un tocco porta al frammento con la riga evidenziata, l'ora e il canale. È la transclusione di Nelson,
     «the same thing knowably and visibly in more than one place» (§1.2).
   - **I backlink calcolati:** sotto ogni frammento, piegato, compare "citato in" / "compare anche in", calcolato. Viene da
     - i backlink di Matuschak;
     - il «This channel appears in» di Are.na;
     - il pannello delle lavagne di Heptabase (§3.1, §3.3).

     È anche il link tra tavole che manca sia al tour del Warburg Institute sia a Cornell (§2.8).
   - **Il ○:** nella stessa riga porta opera e passo, che si aprono sotto la riga; mai note finali (la rassegna di Gwern
     sulle sidenote) (§6.3).

4. **Strati di vista, con un default austero e senza rosso.**
   - **Il selettore:** è lo stesso su ogni pagina e ha tre posizioni: *mie* (✦ ✧) · *e accolte* (●) · *e proposte* (◌ ○ ⚠).
     Viene dai viewspecs di Engelbart (§1.3).
   - **Perché la struttura dedotta sta a parte:** «Inferred structure cannot be treated identically to user specified information»
     (Shipman & Marshall 1999, §4.4) (§3.2).
   - **Come si vede la provenienza:** con il peso tipografico, non con il colore d'allarme:
     - ✦ pieno, in corsivo;
     - ◌ e ○ in tono smorzato;
     - ⚠ piccolo accanto.

     Le fonti: Marshall & Shipman (lo "spostare fuori allineamento" per dire il dubbio); Gwern («you must *earn* your ornaments»);
     Bernstein («use punctuation sparingly») (§3.1, §3.2).
   - **Il nesso con l'Atlante:** il segno di provenienza è l'unico ornamento. Il "troppo caos" dell'Atlante era la vista
     unica a ingrandimento massimo, in rosso.

5. **Il telefono prima, e completo; lo schermo grande dà più spazio, non più funzioni.**
   - **Le prove:**
     - NN/g 2016 non trova differenze pratiche di comprensione tra telefono e computer;
     - nella meta-analisi di Delgado et al. 2018 (171.055 partecipanti) lo svantaggio dello schermo non è significativo
       sui palmari (g = −.12, p = .11) e nullo sui testi narrativi; cresce con il tempo contingentato e con lo scorrimento (§6.1).

     Le restituzioni di Mnemosyne sono brevi, personali e lette senza fretta: il caso più favorevole.
   - **Che cosa lasciare allo schermo grande:**
     - pannelli impilati alla Matuschak solo sopra ~800–900 px (Quartz e il CSS di Matuschak li spengono sotto) (§3.1, §6.3);
     - niente tela sul telefono: «A phone is probably too small to legibly render a whole board» (Muse) (§3.3).
   - **I numeri di partenza:**
     - corpo 18 px sul telefono e 20–21 px sopra i 900 px;
     - interlinea 1,45 per la prosa;
     - misura massima 34em, circa 66 caratteri (Bringhurst §2.1.2, Butterick);
     - un vero corsivo caricato in locale, perché è il segno della tua voce;
     - chiaro di default, scuro da `prefers-color-scheme` più un interruttore (Piepenbrock 2013, tramite NN/g) (§6.2).
   - **I limiti:** sono indizi, non misure su archivi riflessivi (§6.4).

6. **Il tempo è una forma visibile: la spina, non la porta.**
   - **Che cosa mostra:**
     - la data in testa a ogni frase e a ogni pagina;
     - nella pagina di un nodo, i mesi come intestazioni leggere;
     - i mesi chiusi riassunti nei "periodi" di `parole.md`.
   - **Perché:** sullo schermo si perde soprattutto la cronologia (Mangen et al. 2019) (§6.1). Lifestreams voleva il passato
     visibilmente immutabile (§4.4). Con un archivio lungo servono le viste per mese e per anno (Epstein 2016) (§7.1).
   - **Il calendario:** se c'è, è fatto di quadratini tutti uguali, **senza scala d'intensità**, che diventerebbe un voto o un
     sollecito (Darboven, Feltron, §5.2, §5.5).

7. **Leggere per binari: navigazioni distinte e nominate, una direzione alla volta.**
   - **Che cosa sono:** in fondo a ogni frammento, poche frecce, ognuna con il suo criterio scritto:
     - «← giorno prima · giorno dopo →»;
     - «nel filo» (la stessa vicenda o lo stesso tema ✦);
     - «rimandi» (i legami);
     - e, a parte, «◌ vicino».

     Il filo che stai seguendo resta scritto in alto. Mai un'unica lista "correlati".
   - **Le fonti:**
     - l'edizione digitale di Luhmann a Bielefeld separa l'ordine numerico, il filone («Anfang des Strangs») e l'ordine fisico (§1.4);
     - l'Arquivo LdoD (il *Livro do Desassossego* di Pessoa, Portela e Rito Silva) rende esplicito il criterio di ogni
       ordinamento dei frammenti (DHQ 15.3) (§5.1).
   - **Il nesso con le regole:** il testo resta, l'ordine si sovrappone e dichiara chi l'ha fatto.

8. **Una porta, non un cruscotto: unità finite, niente feed, niente contatori.**
   - **La prima pagina:** mostra una cosa sola, l'ultima restituzione oppure una frase ✦ riemersa, e si legge in un minuto.
     Ogni vista sta in una schermata e ha un bordo:
     - la cartolina di *Dear Data*;
     - la tavola di Richter;
     - il board di Spring '83 (§5.4, §5.5).
   - **Che cosa non c'è:**
     - niente "non letti";
     - niente strisce né badge "nuovo";
     - niente tempo di lettura;
     - niente "altro da leggere".
   - **Le prove:**
     - la manutenzione è la prima causa d'abbandono: Lazar 2015, quasi l'80% dei dispositivi abbandonato in due mesi;
     - la colpa dopo aver smesso arriva fino al 16,2% (Epstein 2016) (§7.1).

     È la regola "niente solleciti, niente arretrati" fatta interfaccia.

9. **Il ritorno: uno alla volta, lento, da un mazzo già filtrato, mai per anniversario.**
   - **Che cosa funziona:**
     - in Pensieve i ricordi arrivavano per email: il 61% delle risposte è arrivato entro 24 ore e solo 9 utenti su 72
       hanno spento il servizio;
     - in Photobox la rarità rende il pezzo «more special but also more easy to take in» (§7.2);
     - Readwise fa tornare meno spesso ciò che è già stato mostrato (§4.3).
   - **Che cosa ferisce:** il caso puro e l'anniversario automatico:
     - l'«Inadvertent Algorithmic Cruelty» di Eric Meyer (2014) e i filtri aggiunti dopo da Facebook e Google Photos;
     - in Photobox, le foto di ex cancellate (§4.3, §7.3).
   - **Per Mnemosyne:**
     - il mazzo sono i "ricordabili" di `mappa.md`, che escludono per costruzione i delicati e i rifiutati;
     - nessun pulsante "un altro";
     - la notifica, se c'è, senza contenuto.
   - **Il nome:** Esiodo fa nascere le Muse da Mnemosyne come «λησμοσύνην κακῶν», oblio dei mali (*Teogonia* 55) (§2.6). Il nome
     del progetto contiene già la regola del delicato.

10. **Il delicato si protegge con la forma, non con un avviso.**
    - **Dove sta:**
      - il frammento delicato resta nel suo giorno, senza segni dell'AI e senza "vicini";
      - se ci torni sopra tu, i tuoi ritorni gli si allineano sotto, con i giorni passati e senza parole dell'AI.
    - **Le fonti:**
      - *Douleur exquise* di Sophie Calle: lo stesso racconto del dolore riscritto ogni giorno, che si accorcia
        accanto ai racconti altrui;
      - il report 2010 di Felton sulla vita del padre morto (§5.3, §5.5).
    - **Le esclusioni:**
      - nessuna vista "le frasi più forti", che estrarrebbe il dolore (l'avvertimento di Pavese, §5.1);
      - nessun delicato nella home, nei mesi, nelle tavole;
      - nessuna anteprima, scheda di persona o di tema che apra su una frase delicata (§7).

11. **Ogni link ha l'odore delle tue parole.**
    - **Che cosa è:** è l'*information scent* di Pirolli & Card: chi cerca segue l'indizio che promette di più (§4.5).
    - **Che cosa porta ogni link:** l'anteprima di un nodo o di un frammento è una riga ✦ con la data, più un conto
      preso da `mappa.md`. Mai un'etichetta nuda, mai un pallino senza testo.
    - **Sul telefono:** non c'è hover, quindi il tocco apre un foglio dal basso con il nome e 2–3 frasi ✦ datate;
      sul desktop compare la stessa anteprima al passaggio (§6.3).

12. **Ogni parte ha un indirizzo stabile.**
    - **Che cosa:** ogni frammento, voce `r-…#n`, nodo e mese ha un URL che non cambia, anche con i buchi.
    - **Le fonti:**
      - i numeri a ramo di Luhmann;
      - i link a punti precisi di Engelbart;
      - i numeri «79» e «7.4» delle tavole di Warburg, conservati dai curatori del 2020 anche dove sono incoerenti
        (§1.3, §1.4, §2.7).
    - **A che cosa serve:** è anche l'indirizzo con cui dici «salvami la terza».

13. **L'incompiuto si mostra.**
    - **Che cosa:** ogni ritratto ha la sua data ed è "il ritratto del 3 novembre", non "chi sei". Le versioni precedenti
      restano consultabili.
    - **Le fonti:**
      - Warburg rimontò l'atlante più volte, dalle 77 tavole e 1292 immagini dell'agosto 1928 alle 63 tavole e 971
        immagini dell'ultima versione;
      - i curatori del 2020 ne hanno conservato il «provisional character»;
      - Didi-Huberman lo chiama il *tavolo* contrapposto al *quadro* (§2.1, §2.7, §2.9).
    - **Il nesso con le regole:** coincide con la regola "non esiste lo stato `superato`".

14. **Lo stato epistemico sì, i voti no.**
    - **Il sì:** il ⚠ e l'`esito` corrispondono all'"epistemic status" di Appleton e alla "confidence" di Gwern, e si
      vedono sempre, in piccolo (§3.1).
    - **Il no, perché sono giudizi sulle tue parole:**
      - "importance";
      - gli stadi di crescita (seedling, evergreen);
      - i like;
      - le stelle.
    - **La prova:** Are.na dimostra che si può togliere la metrica senza perdere l'uso (§3.3).

15. **La ricerca per indizi, accanto al caso.**
    - **I numeri:** in list.it il 21% delle note è stato ritrovato passandoci sopra e il 34% cercato di proposito
      (Van Kleek et al. 2009) (§7.4).
    - **Che cosa serve:** l'incontro di lato e la ricerca per chi, quando e parole vicine, con l'espansione già prescritta da
      `CLAUDE.md`, che il sito può mostrare ("ho cercato anche: zio, polso, segno").

16. **Il percorso è un'opera dell'autore, non del sistema.**
    - **Le fonti:** i trail di Bush, il teatro di Camillo e il palazzo di Ricci funzionano per chi li ha costruiti (§1.1, §1.6).
    - **Per Mnemosyne:**
      - le restituzioni sono i trail di Mnemosyne, e il sito le mostra bene, una alla volta;
      - le raccolte sono i tuoi trail;
      - il sito non ne genera altri ("potrebbe interessarti").

### Che cosa NON prendere

- **Il grafo globale e la sala a 360°.** Sono il "Firmamento" dell'Atlante e il tour virtuale del Warburg Institute:
  riproducono la mostra, non il pensiero (§2.8, §4.1).
- **Le code di conferma.** Accetta e rifiuta come pulsanti contraddicono la cattura cieca e Shipman & Marshall 1999 (§3.2).
- **"Un anno fa oggi".** Facebook e Google Photos hanno dovuto aggiungere i filtri dopo i danni (§4.3, §7.3).
- **La gamification e i contatori.** Strisce, badge, "review quotidiana" da completare (§4.3, §7.1).
- **La scala di colore per "quanto ho scritto".** Diventa un voto o un sollecito (§5.2).
- **Le tele e i pannelli impilati sul telefono** (§3.1, §3.3, §6.3).

### Tensioni tra le fonti e dubbi aperti

1. **Nero o chiaro?**
   - **Per il nero:** il campo nero di Warburg è il Denkraum (§2.2).
   - **Per il chiaro:** la ricerca sulla polarità dà un vantaggio al testo scuro su fondo chiaro (Piepenbrock 2013), e la
     lettera della domenica letta a letto chiede invece un tema scuro e caldo (§6.2, §6.4).
   - **Una via possibile, da provare:** fondo chiaro per leggere, scuro di sistema la sera, e la tavola come campo
     uniforme, non per forza nero.
2. **Small multiples o niente intensità?**
   - **Per le sparkline:** Tufte e Shneiderman suggeriscono un indice di temi e persone con sparkline sulla stessa scala (§4.6).
   - **Contro:** i diari d'artista e l'abbandono avvertono che ogni misura d'intensità diventa voto o sollecito (§5.2, §7.1).
   - **Una via possibile:** sparkline solo nelle pagine di un nodo, mai in home, con conti da `mappa.md`.
3. **Il sito scrive o solo legge?**
   - **Per scrivere:** Pensieve e Sas & Whittaker indicano che poter rispondere subito, dallo stesso posto, fa rileggere;
     in Pensieve il 51% del diario nasce dalle risposte (§7.2). Ne viene l'idea di due tocchi, "aggiungo" e "questo no",
     che scriverebbero un **memo nuovo** in `ingresso/` (con `ritorna-su` `aggiunge` o `rifiuta`), mai una modifica.
   - **Il rischio:** è tecnicamente compatibile con "un atto sta nel frammento che lo compie", ma trasforma il sito in un
     canale di cattura e rischia di diventare una coda di validazione travestita.
   - **Chi decide:** il coordinatore.
4. **Il telefono come consumo principale.**
   - **Che cosa dicono le prove:** sono indirette, perché nessuno studio misura archivi personali riflessivi. La lettura che
     reggono meglio è una divisione per compito:
     - il ritorno breve e quotidiano (la risposta, "Oggi", la lettera) sul telefono;
     - l'esplorazione (seguire i legami, confrontare due periodi) dove c'è spazio (§6.4).
   - **La conseguenza:** progettare il telefono come caso completo e verificarlo dopo un mese d'uso.
5. **I limiti delle fonti.**
   - **Non raggiungibili da questa sessione:**
     - il sito del Warburg Institute (403);
     - l'interfaccia viva del Luhmann-Archiv (solo JavaScript);
     - gerhard-richter.com/atlas.
   - **Letti solo di seconda mano:** molti libri (Yates, Blair, Didi-Huberman, Tufte, Munzner). Ogni parte li elenca in fondo.

---

## 1. La storia: Memex, Xanadu, Engelbart, Zettelkasten, commonplace book, palazzi della memoria

Letteratura per il sito di Mnemosyne. Sei voci, dalla più recente come idea di macchina alla più antica come tecnica;
poi le lezioni trasversali. Le citazioni sono alla lettera, nella lingua della fonte che ho letto; dove ho letto solo una
traduzione o una fonte secondaria lo dico.

---

### 1.1 Il Memex di Vannevar Bush ("As We May Think", 1945)

- **Che cosa è**: un saggio uscito su *The Atlantic* nel luglio 1945. Bush immagina una scrivania con schermi e
  microfilm, "a sort of mechanized private file and library", e la definisce così: "It is an enlarged intimate
  supplement to his memory" (§6). Il cuore non è l'archivio ma il legame: "associative indexing, the basic idea of which
  is a provision whereby any item may be caused at will to select immediately and automatically another. This is the
  essential feature of the memex. The process of tying two items together is the important thing." (§7).
  Il **trail**: "When the user is building a trail, he names it, inserts the name in his code book" (§7); una volta
  legati, gli elementi si scorrono "as though the physical items had been gathered together to form a new book. It is
  more than this, for any item can be joined into numerous trails." (§7). Le **note**: "He can add marginal notes and
  comments" (§6); e nel percorso sull'arco turco "Occasionally he inserts a comment of his own, either linking it into
  the main trail or joining it by a side trail to a particular item" (§7). Il **trail blazer**: "There is a new
  profession of trail blazers, those who find delight in the task of establishing useful trails through the enormous
  mass of the common record." (§8). Il trail si consegna: "photographs the whole trail out, and passes it to his friend"
  (§7).
- **Fonte**: testo primario nella trascrizione di D. Duchier (1994), sezioni numerate 1–8:
  https://web.mit.edu/STS.035/www/PDFs/think.pdf ; pagina originale (non letta, l'host blocca lo strumento):
  https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/
- **Perché funziona / fallisce**: non è mai stato costruito (microfilm e fotocellule), ma è la matrice dichiarata di
  Engelbart, che lo cita e lo commenta per esteso nel 1962 (sezione III.A.1–2 di *Augmenting Human Intellect*, voce 3) e
  di Nelson. L'intuizione che regge ancora: l'indice gerarchico costringe a "emerge from the system and re-enter on a new
  path" (§6), mentre la mente "operates by association" (§6). Un dettaglio che conta per Mnemosyne: Bush oppone la
  memoria umana, dove "trails that are not frequently followed are prone to fade" (§6), alla macchina, dove "his trails
  do not fade" (§7).
- **Compatibilità con Mnemosyne**: **sì, in gran parte.** Il trail nominato, ordinato e con i commenti del proprietario
  inseriti a lato è quasi esattamente una restituzione (lettera, ritratto, risposta): un percorso dell'AI fra frammenti,
  con un nome e voci numerate. La distinzione fra item (il documento) e comment (la nota propria) è già la distinzione
  fra ✦ e ◌. Il punto su cui Mnemosyne diverge in modo consapevole: lo "sbiadito" (30 giorni attivi senza ritorno) è
  proprio il fade umano che Bush voleva eliminare; nel sito va mostrato come stato, non come cancellazione. Il trail
  blazer professionista, invece, è rumore: un solo lettore (l'AI) che traccia percorsi, e pochi.
- **Da prendere**: ogni restituzione ha una pagina che si legge **come un trail**: una colonna di voci in ordine, ogni
  voce che si apre sul frammento d'origine, con una leva "avanti / indietro" (tastiera o swipe) e una "deviazione"
  laterale (side trail) verso il nodo, senza perdere il punto. I trail non si generano a raffica: esistono solo quelli
  che l'AI ha già scritto nelle restituzioni.

---

### 1.2 Ted Nelson: Xanadu, la transclusione, i link visibili

- **Che cosa è**: Project Xanadu, fondato nel 1960, "The Original Hypertext Project" (home page). Due forme di
  connessione: "survivable deep linkage (content links) and recognizable, visible re-use (transclusion)". La
  transclusione: "Transclusions are not copies and they are not instances, but *the same thing knowably and visibly in
  more than once place*." Lo scopo letterario: una letteratura "where links do not break as versions change; where
  documents may be closely compared side by side and closely annotated; where it is possible to see the origins of
  every quotation". I link: "Serious electronic literature [...] must support bidirectional and profuse links, which
  cannot be embedded". Il confronto col web: "Today's embedded links, as in HTML-- a later and cruder design-- cannot be
  profuse, overlapping, bidirectional, or diversely created in this way". L'interfaccia proposta: "PARALLEL PAGES,
  VISIBLY CONNECTED" (home page), con "trails of origin, or origin beams, showing content transcluded from one version
  to another" (fig. 6), e un esempio di email in cui la citazione mantiene "the connection to the original context"
  (fig. 21). Nota storica di Nelson nello stesso saggio: i trail di Bush "were to be built from transclusions, not
  links".
  *Computer Lib / Dream Machines* (1974) e *Literary Machines* (1981, edizioni successive) sono i libri in cui Nelson
  espone hypertext e (in *Literary Machines*) la transclusione; non ho potuto leggerne il testo: la datazione è quella
  comunemente riportata (non verificato), e così la frase "everything is deeply intertwingled" attribuita a *Computer
  Lib* (non verificato: nessuna pagina primaria letta).
- **Fonte**: T. H. Nelson, "Xanalogical Structure, Needed Now More than Ever: Parallel Documents, Deep Links to
  Content, Deep Versioning and Deep Re-Use", ACM Computing Surveys 31(4es), 1999, versione dell'autore:
  https://www.xanadu.com.au/ted/XUsurvey/xuDation.html ; home page del progetto: https://www.xanadu.com/ ; il fallimento:
  G. Wolf, "The Curse of Xanadu", *Wired* 3.06, giugno 1995: https://www.wired.com/1995/06/xanadu/
- **Perché funziona / fallisce**: Wolf lo chiama "the longest-running vaporware project in the history of computing - a
  30-year saga of rabid prototyping and heart-slashing despair". Le ragioni che il pezzo documenta: l'ambizione totale
  (biblioteca universale, indice globale, "a computerized royalty system"); il nodo commerciale della transclusione, che
  era "the heart of Xanadu's most innovative commercial feature - a royalty and copyright scheme" (la copia letterale
  era vietata, ogni lettura pagava); la segretezza tecnica (l'"enfilade" era un "closely guarded trade secret");
  l'organizzazione (Nelson "an ineffective manager" secondo Wolf; l'acquisizione Autodesk e il suo abbandono). Nelson ha
  contestato il pezzo punto per punto (la replica è citata spesso; non l'ho letta: non verificato). La lezione tecnica,
  detta da Nelson stesso: il web ha vinto con link incorporati e a senso unico, più semplici da creare in modo
  distribuito; la transclusione esige un deposito unico, stabile e indirizzabile al carattere.
- **Compatibilità con Mnemosyne**: **sì, ed è la voce più vicina.** Mnemosyne ha esattamente le precondizioni che a
  Xanadu mancavano nel mondo aperto: un solo deposito, contenuti immutabili (frammenti con hash), identificatori stabili
  (`AAAAMMGG-HHMM-xxxx`, `r-…#n`), nessuna questione di diritti. La transclusione è la forma tecnica della regola di
  provenienza: una frase ✦ in una lettera non è una copia, è *la stessa* frase, e il sito può renderlo vero e visibile.
  I link bidirezionali sono già nei dati (i legami hanno due capi, `ritorna-su` punta indietro). Il rischio è l'eccesso
  di Nelson: "profuse links" e fasci visibili ovunque sono il "troppo caos" dell'Atlante.
- **Da prendere**: (a) **ogni corsivo ✦ in una restituzione è una transclusione cliccabile**: si apre sul frammento
  intero, con la riga evidenziata e la data, nel suo contesto (il resto del memo, la chat con i suoi `[HH:MM]`). Il
  testo mostrato è letto dal frammento al momento del rendering, mai copiato nella pagina: così non può divergere.
  (b) Sulla pagina del frammento, in fondo e piegato, "citato in": le restituzioni che lo transcludono (il backlink).
  (c) La vista **a pagine parallele** solo dove serve davvero: il `contraddice` (due frasi datate affiancate) e il ponte
  (le due frasi con i loro luoghi), con una sola linea che le unisce, non fasci ovunque.

---

### 1.3 Douglas Engelbart: *Augmenting Human Intellect* (1962), la demo del 1968, i view specs

- **Che cosa è**: il rapporto SRI del 1962 apre così: "By "augmenting human intellect" we mean increasing the capability
  of a man to approach a complex problem situation, to gain comprehension to suit his particular needs" (§1a). Nella
  parte III commenta Bush ("The process of tying two items together is the important thing", III.A.1) e immagina, nel
  dialogo con "Joe", strutture viste a livelli diversi: sottostrutture che "wouldn't appear when you normally viewed the
  statement, but could be brought in by simple request" (3b6s), "zones of variable magnification as you scan the
  structure—higher magnification where you are inspecting detail, lower magnification in the surrou[nding]" (3b6ab),
  "a choice of several relevant views at different levels of the structure" (3b8i), e gli "'antecedent links'" che
  puntano alle affermazioni da cui un'altra dipende (3b6u). Il 9 dicembre 1968, alla Fall Joint Computer Conference di
  San Francisco, la demo di NLS mostra mouse, outline, link e lavoro condiviso a distanza ("members of his research lab
  teleconferenced in from SRI").
  I **view specs** (viewspecs) di NLS/Augment: codici di una lettera che cambiano *come* si vede un file senza
  cambiarne il contenuto: "level clipping" (quanti livelli dell'outline), "paragraph truncation" (quante righe per
  affermazione), filtri sul contenuto. La pagina NLS dell'Istituto: "Outline offers a bird's eye view", "you can create
  a link to any paragraph or line of code or email paragraph". L'indirizzamento fine: ogni affermazione ha un numero
  strutturale (es. 3b5) e un identificatore stabile (SID) che resta anche se l'affermazione si sposta.
- **Fonte**: testo primario del 1962, Doug Engelbart Institute (paragrafi numerati):
  https://www.dougengelbart.org/content/view/138 ; la demo: https://www.dougengelbart.org/content/view/209/ ; NLS:
  https://dougengelbart.org/firsts/nls.html ; viewspecs e SID: Engelbart, "Authorship Provisions in Augment", COMPCON
  '84, scansione https://dougengelbart.org/pubs/papers/scanned-original/1984-oad-2250-Authorship-Support-Provisions-in-Augment.pdf
  (l'OCR è illeggibile: i termini "level clipping" e "paragraph truncation" li ho letti nel testo estratto, le
  definizioni di dettaglio dei SID vengono da fonti secondarie: non verificato alla lettera). Che i viewspecs fossero
  già nella demo del 1968 lo dicono fonti secondarie (non verificato).
- **Perché funziona / fallisce**: quasi tutto ciò che la demo mostrò è entrato nell'informatica personale (mouse,
  finestre, link, editing condiviso); i viewspecs no, se non come "outliner" e "zoom". Il motivo documentato è il costo
  d'apprendimento: Engelbart progettava per professionisti addestrati (la tastiera a cinque tasti, i codici di una
  lettera), e diceva apertamente di preferire potenza a facilità (non verificato alla lettera). L'idea che resta
  valida: lo stesso testo a granularità diverse, con indirizzi stabili per ogni parte.
- **Compatibilità con Mnemosyne**: **sì per i livelli e gli indirizzi, no per la complessità.** I segni sono già
  livelli naturali: ✦ (solo le mie parole), ✦✧● (ciò che è mio o accolto), poi ◌ (le proposte), poi ○ (il mondo).
  Un "view spec" a tre posizioni rispetta "poco e forte" se il default è il più austero. L'indirizzo stabile c'è già:
  id del frammento, `r-…#n` per la voce; serve solo renderlo URL.
- **Da prendere**: un **selettore a tre posizioni**, stesso su ogni pagina, con default "solo mie": *mie* (✦ ✧) ·
  *e legami* (● e i nodi) · *e proposte* (◌ ○ ⚠). Il rumore dell'Atlante è stato mostrare tutto allo stesso livello;
  qui il ◌ c'è ma si chiede. Più il "level clipping" sulle liste: in un elenco di frammenti, una riga ciascuno (la prima
  riga, alla lettera, mai riassunta), il resto al tocco. Ogni frammento e ogni voce ha un URL (`/f/20261103-0912-ab3c`,
  `/r/…#3`) che non cambia mai.

---

### 1.4 Niklas Luhmann e lo Zettelkasten

- **Che cosa è**: lo schedario di Luhmann (circa 90.000 schede: ZK I, ca. 1952–1962, con registro di ca. 1.250
  voci; ZK II, ca. 1963–1996, con registro di ca. 3.200 voci). Nel saggio "Kommunikation mit Zettelkästen" (in *Öffentliche
  Meinung und sozialer Wandel*, 1981) Luhmann descrive lo schedario come un interlocutore. Dalla traduzione inglese
  (M. Kuehn): lo scopo è creare "in the system of notes a competent partner o[f] communication" (§I); "One of the most
  basic presuppositions of communication is that the partners can mutually surprise each other" (§I). La tecnica: un
  posto fisso, non un ordine per argomenti, "a firm fixed place (*Stellordnung*)", e "It is sufficient that we give every
  slip a number" (§II); la ramificazione: "We do not need to add notes at the end, but we can connect them anywhere"
  (§II.1, la numerazione 1/1, 1/1a, 1/1a1…); i rimandi: "Since all papers have fixed numbers, you can add as many
  references to them as you may want" (§II.2); il registro: "we need a register of keywords that we constantly update"
  (§II.3); e infine la qualità del tutto, che riceve "its quality only from the network of links and back-links within
  the system" (§II, chiusa).
  **Il Luhmann-Archiv di Bielefeld** (niklas-luhmann-archiv.de; progetto dell'Accademia NRW all'Università di
  Bielefeld, 2015–2030) pubblica schedario e manoscritti in edizione digitale. Dalla presentazione tecnica del 2018
  (J. Schmidt, M. Gödel, S. Zimmer): per ogni scheda, scansione dell'immagine e trascrizione, una scheda per file TEI;
  quattro porte d'ingresso intorno alla singola nota: "Inhaltsübersicht", "Schlagwortregister", "Personenregister",
  "Bibliographie" (slide 33). Il principio del registro: "pro Schlagwort ist die Nennungen weniger Systemstellen
  ausreichend, da die übrigen relevanten Notizen durch das Verweisungssystem erschlossen werden"; "erst die Kombination
  von Schlagwortregister und Verweisungssystem erschließt den Zettelkasten" (slide 30). I rimandi sono il
  "‚Überraschungsgenerator'", "ca. 20.000" interni in ZK I e "ca. 30.000" in ZK II (slide 25), classificati in quattro
  tipi (rimandi collettivi in testa a un blocco, rimandi di struttura, rimando a una scheda complementare vicina,
  rimando a una scheda lontana). Soprattutto, ogni scheda porta **quattro navigazioni distinte** (slide 43–44): numerica
  ("vorwaerts-im-nummerierten-Gliederungsverlauf"), logica per filoni ("vorwaerts-in-diesem-Strang",
  "Anfang-des-Strangs", "zurueck-zu-hoeherem-Strang"), fisica com'era nella scatola ("naechste-vorderseite-im-zettelkasten",
  "kehrseite") e fisica corretta. Strumenti di visualizzazione "BranchView/LinkView" per le reti di schede.
- **Fonte**: traduzione inglese del saggio: https://luhmann.surge.sh/communicating-with-slip-boxes (originale tedesco non
  letto); presentazione Bielefeld 2018:
  https://uni-bielefeld.de/einrichtungen/bits/ueber-uns/knowledge-transfer/2018/2018-04-19_Vortrag_Das_Digitalisierungsprojekt_Luhmann-Zettelkasten.pdf ;
  progetto: https://www.uni-bielefeld.de/fakultaeten/soziologie/forschung/luhmann-archiv/ ; portale:
  https://niklas-luhmann-archiv.de/ (applicazione JavaScript, non leggibile dallo strumento: l'interfaccia viva non l'ho
  vista, la descrizione viene dalla presentazione del 2018).
- **Perché funziona / fallisce**: funziona per Luhmann (la slide 2 della presentazione dice "40 Monographien / 500
  Aufsätze zu Lebzeiten") perché l'ordine è *posizionale* e i rimandi lo superano; il
  registro è volutamente povero (pochi ingressi per parola), il resto lo fanno i rimandi. Il limite documentato
  dall'edizione: lo schedario non si capisce scheda per scheda; servono più modi di scorrere (quattro navigazioni) e la
  distinzione fra ordine fisico e ordine logico. Il "partner" sorprende solo perché Luhmann ci lavorava ogni giorno;
  la sorpresa è un effetto dei rimandi, non un'interfaccia.
- **Compatibilità con Mnemosyne**: **sì.** Il posto fisso è già lì: `frammenti/AAAA/MM/` è una *Stellordnung*
  cronologica, e il frammento non si sposta mai. I nodi sono il registro; i legami sono i rimandi; il "partner che
  sorprende" è il ruolo dello specchio. Scansione + trascrizione affiancate = frammento (immutabile) + lettura
  (versionata): due strati distinti, come nell'edizione. Il registro povero è "poco e forte" applicato all'indice.
- **Da prendere**: (a) la pagina di un frammento come una scheda dell'edizione: il testo esatto in alto, e sotto le
  **navigazioni separate e nominate**: *prima / dopo nel tempo* (l'ordine fisico), *nel filo* (lo stesso tema o la
  stessa vicenda: avanti, indietro, inizio del filo), *rimandi* (i legami, con il segno). (b) Una pagina nodo che non
  elenca tutto: pochi ingressi scelti (le frasi ✦ più forti, al più tre) e poi "segui i rimandi", come il registro di
  Luhmann. (c) Un indice dei nodi in ordine alfabetico, sobrio, senza conteggi in evidenza.

---

### 1.5 Il commonplace book e il florilegio

- **Che cosa è**: il quaderno dei luoghi comuni: estratti di lettura copiati sotto "capi" (*loci*, *heads*) per
  riusarli. Erasmo ne dà il metodo nel *De copia* (1512) (non letto direttamente: non verificato). Locke pubblica nel 1685
  la *Méthode nouvelle de dresser des recueils*, tradotta nel 1706 come *A New Method of Making Common-Place-Books*:
  in testa al quaderno un indice di due pagine, ogni lettera dell'alfabeto incrociata con le vocali; un capo si indicizza
  con la sua iniziale e la prima vocale che segue: "When I meet with any thing, that I think fit to put into my
  common-place-book, I first find a proper head. Suppose for example that the head be EPISTOLA. I look unto the index for
  the first letter and the following vowel which in this instance are E. i." (citato dalla Public Domain Review
  dall'edizione 1706). Darnton (2000) descrive la lettura che ne viene: i lettori "read in fits and starts and jumped from
  book to book", "broke texts into fragments and assembled them into new patterns", e così "you made a book of your own,
  one stamped with your personality". Ann Blair, *Too Much to Know: Managing Scholarly Information before the Modern Age*
  (Yale UP, 2010), legge florilegi, quaderni e opere di consultazione come risposta al sovraccarico, con quattro
  operazioni, "storing, sorting, selecting, and summarizing" (riportato da recensioni; il testo del libro non l'ho letto:
  non verificato alla pagina).
- **Fonte**: Locke: https://publicdomainreview.org/collection/john-lockes-method-for-common-place-books-1685/ ;
  scansione 1706: https://archive.org/details/13925922180LockeCommonplaceBook/page/n10 (non sfogliata);
  R. Darnton, "Extraordinary Commonplaces", *The New York Review of Books*, 21 dicembre 2000:
  https://www.nybooks.com/articles/2000/12/21/extraordinary-commonplaces/ ; Blair, recensione di *Books & Culture*:
  https://booksandculture.com/articles/2011/mayjun/overloaded.html
- **Perché funziona / fallisce**: funziona per secoli perché è povero: un quaderno, dei capi, un indice di una pagina
  che si consulta in un colpo d'occhio. Il metodo di Locke risolve un problema preciso (trovare un capo senza un ordine
  alfabetico prestabilito delle pagine) con una struttura fissa e minuscola. Fallisce quando i capi si moltiplicano e i
  passi perdono la fonte: la tradizione del florilegio è anche la storia delle citazioni attribuite male, cioè il motivo
  per cui Mnemosyne verifica (non verificato come affermazione storica generale; è il punto di Blair sulla circolazione
  dei florilegi, riferito da fonti secondarie).
- **Compatibilità con Mnemosyne**: **in parte.** Le raccolte (`serve-a`) sono capi di commonplace scelti da lui
  ("tatuaggi"); il nodo citazione con `esito` e `riferimento` è il florilegio fatto bene (passo + fonte + verifica). Ma
  il commonplace book è fatto di parole *altrui*; Mnemosyne è prima di tutto di parole sue: gli ○ restano subordinati,
  una riga, con opera e passo. Il "book of your own, stamped with your personality" di Darnton è invece esattamente il
  ritratto.
- **Da prendere**: (a) una pagina **Indice** alla Locke: una sola schermata, i capi (temi ✦, raccolte, persone del
  mondo, opere) in ordine alfabetico, compatti, senza grafici; è l'ingresso più veloce dal telefono. (b) Una pagina
  **Citazioni** come un florilegio pulito: ogni citazione col suo segno di esito (verificata, simile, errata, ⚠) e il
  luogo; le ⚠ visibili, mai nascoste, ma senza rosso.

---

### 1.6 I palazzi della memoria

- **Che cosa è**: l'arte della memoria classica: si fissano luoghi (*loci*) in un edificio noto e vi si depongono
  immagini. Il mito fondativo in Cicerone, *De oratore* II.86.351–354: Simonide, uscito un attimo dal banchetto di
  Scopa, sopravvive al crollo della sala e riconosce i morti sfigurati ricordando dove sedeva ciascuno: "ex eo, quod
  meminisset quo eorum loco quisque cubuisset, demonstrator unius cuiusque sepeliendi fuisse"; e ne ricava "ordinem esse
  maxime, qui memoriae lumen adferret" (§353). La regola: "locos esse capiendos [...] sic fore, ut ordinem rerum locorum
  ordo conservaret [...] atque ut locis pro cera, simulacris pro litteris uteremur" (§354). Frances Yates, *The Art of
  Memory* (Routledge, 1966), ne fa la storia fino al Rinascimento. Giulio Camillo costruisce a Venezia un teatro di
  legno (descritto nel 1532 da Viglius Zuichemus in una lettera a Erasmo, secondo Yates 1966, pp. 131–132: riferito da
  fonte secondaria, non verificato), e nell'*Idea del theatro* (postuma, 1550) lo spiega: sette pianeti, sette gradi, e
  lo studioso messo al posto dello spettatore: "habbiamo dato sette porte, o gradi, o distintioni, che dir le vogliamo,
  a ciascun pianeta. Ma per dar (per così dir) ordine all'ordine con tal facilita, che facciamo gli studiosi come
  spettatore, mettiamo loro davanti le dette sette misure" (ed. Liber Liber dall'edizione di Venezia 1554, pp. 6–7).
  Jonathan Spence, *The Memory Palace of Matteo Ricci* (1984), costruisce il libro sulle quattro immagini che Ricci
  insegnava nel trattato cinese *Xiguo jifa* (1596), associate a quattro incisioni religiose (recensione LRB, vol. 8 n. 2).
- **Fonte**: Cicerone, testo latino: https://www.thelatinlibrary.com/cicero/oratore2.shtml (§§351–354); Camillo:
  https://linux.studenti.polito.it/static_resources/liberliber/biblioteca/c/camillo/l_idea_del_teatro/pdf/l_idea_p.pdf ;
  Yates: libro non letto (non verificato oltre i dati bibliografici); Spence: recensione di P. Burke, *London Review of
  Books* vol. 8 n. 2: https://www.lrb.co.uk/v08/n02/peter-burke/the-exotic-west (non letta per intero).
- **Perché funziona / fallisce**: come mnemotecnica funziona per chi l'ha costruita: il palazzo è *suo*, percorso mille
  volte, e la memoria sta nell'ordine dei luoghi, non nelle immagini. Come interfaccia per altri fallisce: il teatro di
  Camillo non fu mai finito né usato fuori da lui, e restò un enigma (Yates). Lo stesso succede alle "mappe" spaziali dei
  software di note: belle da guardare, poco percorse. È l'esperienza dell'Atlante: «la mappa visiva non è stata usata».
- **Compatibilità con Mnemosyne**: **no come mappa, sì come principio di posto fisso.** Una mappa spaziale generata
  dall'AI non è il palazzo dell'utente: è il palazzo di un altro. Da tenere, invece, "ordinem rerum locorum ordo
  conservaret": ogni cosa ha un luogo che non cambia (URL, posizione nella pagina, ordine cronologico), e lo si impara
  usandolo. Una nota di delicatezza: il racconto fondativo dell'arte della memoria è un riconoscimento di morti; il
  "luogo" che fa ricordare è anche quello che fa tornare un lutto. Il sito non deve mai riportare un luogo-lutto
  spontaneamente (regola "delicato").
- **Da prendere**: (a) nessuna mappa a grafo come vista principale; al più, se proprio, una vista secondaria e statica.
  (b) **Luoghi stabili**: le stesse quattro o cinque stanze fisse (Oggi/ultima restituzione, Frammenti per mese, Indice,
  Ritratto, Cerca), sempre nello stesso ordine e nello stesso posto della barra, così che la mano le impari. (c) La
  cronologia per mesi come "stanze" (`/2026/10`): il mese è il luogo che l'utente già ricorda.

---

### Lezioni trasversali

1. **Il legame vale più del contenitore.** Bush ("The process of tying two items together is the important thing"),
   Engelbart che lo ripete, Luhmann (la qualità viene "from the network of links and back-links"). Per il sito: la
   pagina di un frammento mostra prima il testo, poi pochi legami con il loro segno; non categorie, cartelle o tag.
2. **Provenienza come struttura, non come nota.** La transclusione di Nelson ("the same thing knowably and visibly in
   more than once place") è la forma tecnica della regola ✦: una frase citata in una lettera si legge dal frammento e ci
   riporta, con data e contesto. Mai copie nella pagina.
3. **Indirizzi stabili per ogni parte.** Numeri fissi di Luhmann, SID di Engelbart, deep links di Nelson: ogni
   frammento, voce `r-…#n`, nodo ha un URL che non cambia e si può condividere con se stessi (dal telefono a un appunto).
4. **Livelli di vista, default austero.** I viewspecs di Engelbart e le "zones of variable magnification" diventano un
   selettore a tre posizioni basato sui segni (mie · e legami · e proposte). Il "troppo caos" dell'Atlante era la vista
   unica a ingrandimento massimo.
5. **Pochi ingressi, poi i rimandi.** Il registro di Luhmann nomina poche schede per parola e lascia il resto ai
   rimandi; l'indice di Locke sta in due pagine. Pagine nodo e indice corti; la profondità si raggiunge camminando.
6. **Navigazioni distinte e nominate.** L'edizione di Bielefeld separa ordine numerico, filone logico, ordine fisico.
   Il sito separa *nel tempo* (prima/dopo), *nel filo* (stessa vicenda o tema) e *rimandi* (legami), e non li mescola in
   un'unica lista "correlati".
7. **Il percorso è un'opera dell'autore, non del sistema.** I trail di Bush, il teatro di Camillo, il palazzo di Ricci
   funzionano per chi li ha costruiti. Le restituzioni sono i trail di Mnemosyne: il sito li mostra bene, uno alla
   volta, invece di generarne altri (niente "potrebbe interessarti").
8. **Lo spazio come abitudine, non come grafico.** Dai palazzi della memoria si prende il posto fisso, non la mappa:
   stanze sempre uguali, mesi come luoghi, nessuna visualizzazione a grafo come ingresso. E il luogo può far tornare un
   lutto: niente ricomparse spontanee.

---

## 2. Aby Warburg e il Bilderatlas *Mnemosyne*

Bozza di ricerca. Fonti lette davvero: la cartella stampa HKW 2020 (comunicati, saggio di Ohrt e Heil, saggio di Claudia
Wedepohl "The Making of Warburg's Bilderatlas Mnemosyne", estratti del volume in folio Hatje Cantz); il sito Cornell
(home, About, tavola 79, scheda di un'immagine, codice della pagina); il pieghevole del Reina Sofía 2010; la recensione
di Golsenne ad *Atlas ou le gai savoir inquiet*; l'articolo di Victoria Cirlot su Zwischenraum/Denkraum (Engramma 153,
2018), che riporta il testo tedesco dell'Introduzione; Esiodo su Perseus; la pagina della Warburg-Haus. I siti del
Warburg Institute (warburg.sas.ac.uk) rispondono 403 e archive.warburg.sas.ac.uk non è raggiungibile da questa sessione:
quello che dico del tour virtuale viene da risultati di ricerca, dal comunicato e da due recensioni.

---

### 2.1 Il Bilderatlas: tavole nere, immagini agganciate, sempre rimontate

- **Che cosa è**: un atlante di immagini senza testo continuo, lavorato da Warburg tra il 1926 e la morte (26 ottobre
  1929) con Gertrud Bing e Fritz Saxl. Ci è arrivato solo come fotografie su lastra di vetro di 63 tavole con 971
  oggetti: «photographic reproductions, newspaper clippings, postcards, advertisements, postage stamps, booklets and
  book pages, sketches drawn by his wife Mary and two original prints – attached to these panels with clamping hooks»
  (Wedepohl, cartella stampa HKW, saggio "The Making…", § 1). Le tavole erano telai di legno di circa 120 × 150 cm
  rivestiti di tela (Hessian), fotografati nella sala di lettura della KBW, Heilwigstraße 116, Amburgo (ivi). Non sono
  "spilli": sono ganci a morsetto, cioè le immagini si staccano e si rimettono senza danni. Le versioni: a marzo 1928 un
  "primo volume" esposto nella vecchia sala di lettura; il 28 agosto 1928 una seconda serie di **77 tavole con 1292
  riproduzioni**, fotografata; tre settimane dopo un nuovo ordine, con undici tavole diverse, detto «definitive» il
  1° settembre; nel 1929 le tavole orizzontali della conferenza alla Bibliotheca Hertziana (19 gennaio) e l'ultima
  versione di 63 tavole numerate, fotografate dopo la morte, con una lacuna tra la 8 e la 20 («a lacuna of 11
  numbers», ivi, § 2 "Synthesis: 1929"). Il progetto editoriale cambiava di continuo: l'8 aprile 1929 Warburg annota un
  atlante «of about 2,000 images»; tre settimane prima di morire parla di «500 to 600 images on circa 200 plates»
  (ivi, § 3). Saxl raccomandava di tenere le tavole «moveable instead of fixing» (ivi).
- **Fonte**: Haus der Kulturen der Welt, *Aby Warburg: Bilderatlas Mnemosyne – The Original*, cartella stampa
  (3 settembre 2020), https://archiv.hkw.de/media/en/texte/pdf/2020_2/presse_10/aby_warburg_bilderatlas_mnemosyne_pressemappe.pdf
- **Perché funziona / fallisce**: funziona come strumento di pensiero proprio perché è provvisorio: il comunicato HKW
  dice che «the Atlas developed into an instrument of cognition» (ivi, comunicato p. 2). Fallisce come pubblicazione:
  non uscì mai, e per settant'anni è stato noto solo dalle fotografie in bianco e nero («Known only from the
  black-and-white photos», comunicato Warburg Institute, 2 settembre 2020, nella stessa cartella).
- **Compatibilità con Mnemosyne**: sì, profonda. Il frammento è immutabile (l'immagine riprodotta, il memo con l'hash);
  ciò che cambia è la disposizione (la tavola, la lettura per versioni). È esattamente la divisione tra strato Detto e
  strato Letto.
- **Da prendere**: la tavola come pagina che *si rimonta* e *si data*. Ogni tavola del sito è una versione con una data
  (come le fotografie di agosto 1928 e del 1929), e le versioni precedenti restano consultabili, mai sovrascritte.

### 2.2 Quasi senza testo: titoli secchi, un'Introduzione mai finita, il Denkraum

- **Che cosa è**: sulle tavole non c'è prosa. Le tavole hanno al più un titolo-elenco di parole chiave, che nelle
  edizioni moderne sono ricostruiti (sul sito Cornell la tavola 79 si apre con «Mass. Devouring of God.», una fila di
  sostantivi separati da punti). Warburg tentò più volte di dettare un'Introduzione («made repeated attempts to dictate
  an introduction», Wedepohl, § 2): restò un testo frammentario del 1929, pubblicato solo nel 2000 (Gesammelte
  Schriften II.1, a cura di Martin Warnke e Claudia Brink). Si apre così: «Bewusstes Distanzschaffen zwischen sich und
  der Aussenwelt darf man wohl als Grundakt menschlicher Zivilisation bezeichnen; dieser Zwischenraum das Substrat
  künstlerischer Gestaltung» (§ A1 nella numerazione di Gombrich, citato da Cirlot, Engramma 153, p. 84). Poco dopo
  compare il Denkraum: la memoria viene in aiuto all'artista «nicht ohne weiteres Denkraum schaffend» (§ A2, ivi,
  p. 87). Nel diario della KBW (1929) Warburg dà al progetto la formula «Ikonologie des Zwischenraumes» (Tagebuch VII,
  1929, p. 267, citato da Gombrich 1970, p. 253, via Cirlot, p. 101).
- **Fonte**: V. Cirlot, *Zwischenraum/Denkraum*, La Rivista di Engramma 153 (febbraio 2018), pp. 83-108,
  https://www.engramma.it/eOS/resources/images/500/e153/e153_cirlot_83-108.pdf ; pagina tavola 79 Cornell,
  https://warburg.library.cornell.edu/panels/panel-79
- **Perché funziona / fallisce**: il Denkraum è lo spazio di distanza che permette di pensare invece di reagire. Sulla
  tavola questo spazio è letterale: il nero tra le immagini. Il limite è evidente: senza testo l'atlante era illeggibile
  fuori dalla cerchia di Warburg, e tutte le edizioni successive hanno dovuto aggiungere didascalie e commenti (Ohrt e
  Heil: «We focussed above all on developing a commentary on each panel», cartella HKW, saggio dei curatori).
- **Compatibilità con Mnemosyne**: sì. È la regola del ponte forte: due frasi accostate senza il perché ◌. Il titolo
  secco della tavola è compatibile con le regole (nessuna formula retorica), purché sia una parola sua ✦ o il nome di un
  tema che ha dato lui.
- **Da prendere**: il vuoto tra due frammenti come elemento di progetto, non come margine. Nessuna didascalia
  interpretativa sotto le frasi; il "perché" ◌ esiste ma sta dietro un gesto (toccare, aprire), mai sulla tavola.

### 2.3 Pathosformel e Nachleben der Antike: ciò che ritorna

- **Che cosa è**: la *Pathosformel* è una formula gestuale dell'emozione estrema (la ninfa che corre, la menade, il
  lamento) che l'antichità consegna e che riappare, trasformata, nel Rinascimento e oltre, fino ai giornali; il
  *Nachleben* è questa sopravvivenza, una vita postuma delle forme. Warburg elenca tra i cinque grandi temi
  dell'atlante «'B. Gestus heroicus' (i.e. the pathos formula)» (Wedepohl, § 3). Il comunicato HKW riassume:
  «tracing recurring visual themes, gestures and patterns across time» (p. 1). Le tavole mettono insieme opere antiche,
  rinascimentali e ritagli contemporanei: la 79 accosta l'Eucaristia e due ritagli dello *Hamburger Fremdenblatt*
  (sito Cornell, tavola 79).
- **Fonte**: cartella HKW (sopra); Didi-Huberman, *L'image survivante. Histoire de l'art et temps des fantômes selon
  Aby Warburg*, Minuit 2002 (scheda: https://www.cca.qc.ca/en/search/details/library/publication/54373241, non letto
  il testo); Desideri, *L'estetica possibile di Aby Warburg*, https://flore.unifi.it/bitstream/2158/1044022/1/Desideri_Warburg.pdf
- **Perché funziona / fallisce**: funziona perché il ritorno di una forma è visibile senza spiegazione quando le
  occorrenze stanno una accanto all'altra. Fallisce quando l'accostamento è solo per somiglianza superficiale: è la
  critica di Didi-Huberman alle «ressemblances dissemblantes» (cfr. Hagelstein e Hamers,
  https://orbi.uliege.be/bitstream/2268/168810/1/HagelsteinHamers.pdf, non letto per intero).
- **Compatibilità con Mnemosyne**: sì, è il cuore dei temi dedotti alla 2ª-3ª ricorrenza e delle "vicende". Il
  Nachleben di Mnemosyne è il ritorno delle *sue* parole nel tempo, non dell'antico.
- **Da prendere**: una tavola "ritorni": le occorrenze ✦ di una stessa immagine o parola sua, in ordine di data,
  ciascuna con il suo giorno. Nessuna linea che le unisca: la sequenza basta.

### 2.4 "Der liebe Gott steckt im Detail": il dettaglio come unità

- **Che cosa è**: la massima che Warburg mise in testa al suo seminario del 1925 sull'arte italiana del primo
  Rinascimento: «unter die Aby Warburg 1925 sein Seminar über die italienische Kunst der Frührenaissance stellte»
  (Klappentext del volume *Der liebe Gott steckt im Detail. Mikrostrukturen des Wissens*, a cura di Schäffner,
  Weigel, Macho, 2003). L'origine della frase resta incerta (attribuita anche a Flaubert e a Mies van der Rohe, senza
  prova): non verificato sul testo primario di Warburg.
- **Fonte**: https://www.perlentaucher.de/buch/der-liebe-gott-steckt-im-detail-mikrostrukturen-des-wissens.html ;
  M. Warnke, *God is in the details* (2011), https://archiv.ub.uni-heidelberg.de/artdok/4006/1/Warnke_God_is_in_the_details_2011.pdf
  (non scaricabile da qui, non letto).
- **Perché funziona / fallisce**: sulle tavole il senso sta nei particolari (un panneggio mosso, un gesto della mano),
  per questo tutte le interfacce digitali investono nello zoom. La recensione del tour virtuale del Warburg Institute
  loda lo zoom («extremely accurate») e ne segnala i limiti (alcune tavole «open to the fascination of pixellisation»)
  (Arshake, https://www.arshake.com/en/aby-warburg-bilderatlas-mnemosyne-and-virtual-exhibitions/).
- **Compatibilità con Mnemosyne**: sì. Il dettaglio di Mnemosyne è la parola esatta, il refuso, l'ora: "il testo
  esatto, refusi compresi".
- **Da prendere**: lo zoom testuale. Dalla tavola si apre un frammento intero; dal frammento, la riga citata è
  evidenziata nel suo contesto (la riga, non le righe unite). Il dettaglio è l'unico posto dove compaiono ora, canale e
  link al frammento.

### 2.5 La KBW: il buon vicino, la sala ellittica, ΜΝΗΜΟΣΥΝΗ sulla porta

- **Che cosa è**: la Kulturwissenschaftliche Bibliothek Warburg, Heilwigstraße 116, costruita 1925-26. I libri non
  erano in ordine alfabetico ma secondo «the 'law of the good neighbour'» (Warburg-Haus), così che sullo scaffale il
  lettore trovasse il libro che non cercava. Quattro sezioni: «'Orientation', 'Image, 'Word', and 'Action'» (ivi). La
  sala di lettura è «an ellipsoidal reading room and lecture hall», e per Warburg «the ellipse as the defining element
  of this space was central to the design process» (ivi). Sopra l'ingresso la parola «mnemosyne» «is inscribed in Greek
  letters» (ivi); l'architrave, su disegno di Fritz Schumacher, è del 1925 (blog del Warburg Institute, "Under the
  protection of Mnemosyne", visto solo nel risultato di ricerca: non verificato). È nella sala di lettura che le tavole
  venivano montate e fotografate (Wedepohl, § 1). La frase di Saxl spesso citata sul buon vicino («the book of which one
  knew was in most cases not the book which one needed») non l'ho trovata in una fonte: non verificato.
- **Fonte**: https://www.warburg-haus.de/en/kulturwissenschaftliche-bibliothek-warburg/ ;
  https://warburg.sas.ac.uk/news-events/blogs/under-protection-mnemosyne-fritz-schumachers-drawing-k-b-w-lintel-rediscovered
  (403, non letto)
- **Perché funziona / fallisce**: il buon vicino funziona per la scoperta laterale; è anche la ragione per cui la
  biblioteca si poteva usare davvero solo con Warburg o Saxl accanto. Un ordine per vicinanza di senso è personale:
  vale per chi l'ha costruito.
- **Compatibilità con Mnemosyne**: sì, ed è un caso raro in cui l'idiosincrasia è un pregio: l'archivio è di una sola
  persona. Ma il buon vicino non deve diventare un suggerimento continuo ("forse ti interessa anche…"): sarebbe rumore.
- **Da prendere**: in fondo a un frammento, al più uno o due "vicini" (i vicini che lo script già calcola), senza
  commento, come il libro accanto sullo scaffale. E la soglia: una parola in greco sopra la porta, nient'altro, come
  unica intestazione del sito.

### 2.6 Mnemosyne, madre delle Muse

- **Che cosa è**: in Esiodo le Muse sono figlie di Zeus e di Mnemosyne, che le partorisce in Pieria:
  «τὰς ἐν Πιερίῃ Κρονίδῃ τέκε πατρὶ μιγεῖσα / Μνημοσύνη» (*Teogonia* 53-54), e nate come
  «λησμοσύνην τε κακῶν ἄμπαυμά τε μερμηράων» (55), oblio dei mali e tregua degli affanni. Nove notti, nove figlie
  (56-60). Il comunicato del Warburg Institute ricorda che Warburg chiamò l'atlante «Mnemosyne, after the Greek goddess
  of memory» (cartella HKW, 2 settembre 2020).
- **Fonte**: Esiodo, *Teogonia*, testo greco su Perseus, https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0129:card=53
- **Perché funziona / fallisce**: il mito dice che dalla memoria nascono le arti, e insieme che le Muse servono a
  dimenticare i mali. Non è una contraddizione: la memoria ordinata è anche ciò che permette di non essere sopraffatti.
- **Compatibilità con Mnemosyne**: sì, e illumina la regola del delicato: la memoria che il sito custodisce non deve
  riportare spontaneamente il male (λησμοσύνη κακῶν). La memoria qui ha anche il compito di tacere.
- **Da prendere**: nessun "un anno fa oggi" automatico; i frammenti delicati non compaiono mai su una tavola composta
  dal sistema, solo dove li chiama lui.

### 2.7 La ricostruzione 2020: gli originali, la provvisorietà conservata

- **Che cosa è**: *Aby Warburg: Bilderatlas Mnemosyne – The Original*, Haus der Kulturen der Welt, Berlino, 4 settembre
  - 30 novembre 2020, a cura di Roberto Ohrt e Axel Heil con il Warburg Institute; mostra parallela alla Gemäldegalerie
  (*Between Cosmos and Pathos*, a cura di Neville Rowley e Jörg Völlnagel). I curatori hanno ritrovato «971 images from
  the 400,000 individual objects in the Institute's Photographic Collection» per mostrare le 63 tavole «for the first
  time since his death», più 20 fotografie grandi di tavole delle versioni precedenti, per lo più dell'autunno 1928
  (comunicato, p. 2). Circa l'80 per cento degli originali identificati nel 2019 (saggio dei curatori, nota 7). Le
  tavole rifatte: «150 × 125 cm, covered with black fabric», secondo le foto dell'estate-autunno 1929. Il criterio:
  «Keeping the provisional character of Warburg's work was uppermost» (ivi). La numerazione delle immagini dei
  Gesammelte Schriften è stata mantenuta «even if it is inconsistent in places» (ivi).
- **Fonte**: cartella stampa HKW (sopra); e-flux, https://www.e-flux.com/announcements/339146/aby-warburg-bilderatlas-mnemosyne-the-original
- **Perché funziona / fallisce**: la scoperta è che gli originali erano in parte a colori («multi-colored images»,
  comunicato p. 1): per decenni l'atlante era stato visto solo in bianco e nero. Mantenere la numerazione incoerente ma
  stabile è una scelta di identificatori: meglio un numero brutto che uno che cambia.
- **Compatibilità con Mnemosyne**: sì. La stessa idea degli id immutabili e dello slug che non cambia mai.
- **Da prendere**: numeri di tavola e di voce stabili e visibili (79, 7.4; per noi `r-…#n`), anche se la sequenza ha
  buchi. I buchi restano buchi.

### 2.8 Le interfacce online: tour a 360°, Cornell, Engramma

- **Che cosa è**: tre modi di mostrare le tavole in rete.
  1. **Tour virtuale del Warburg Institute** (novembre 2020, direzione tecnica Marco Vedana, documentart.de): «over 100
     viewpoints created from over 1000 high-res photographs, alongside audio and video commentaries» (risultato di
     ricerca dalla pagina del Warburg Institute, non letta: 403). Si muove tra le sale come in Street View, «echoing to
     some extent the use of Google Street View» (Arshake); lo SMB conferma che si può «move freely through the
     exhibition spaces» e avere «close-up views of individual objects»
     (https://www.smb.museum/en/whats-new/detail/two-exhibitions-on-aby-warburgs-mnemosyne-atlas-are-now-online-as-360-tours/).
     La critica di Arshake: mancano i legami tra le tavole; propone un archivio virtuale «in which the hypertextual
     links inherent to the project could be revealed».
  2. **Cornell, *Mnemosyne: Meanderings through Aby Warburg's Atlas*** (Christopher D. Johnson, Cornell University
     Library con il Warburg Institute, collana Signale; compagno del libro *Memory, Metaphor, and Aby Warburg's Atlas of
     Images*, 2012). Dieci tavole, ciascuna con una guida diversa («Pathways»). La pagina di una tavola: titolo a parole
     chiave, un saggio introduttivo, la fotografia in un visore a zoom profondo (OpenSeadragon con tessere IIIF: nel
     codice, `tileSources: …/warburg/Panel_79/info.json`), su cui ogni immagine porta un **bottone con il suo numero**
     (1.1, 1.2, … 7.4) posato nel punto esatto; sotto, gli stessi numeri come elenco di link. Il bottone apre la scheda:
     un solo campo «Identification» («Chair of St. Peter [Cathedri Petri], ca. 875; Rome, Vatican.») e un link
     all'immagine; nessun precedente/successivo, solo il ritorno alla tavola
     (https://warburg.library.cornell.edu/panel-images/panel-79-image-1.1/). Johnson nell'About: zoom «in and out on the
     panels and on individual images», e i percorsi «meant to be at best exemplary, but never exhaustive»
     (https://warburg.library.cornell.edu/about).
  3. **Engramma** (Venezia): edizione online dal n. 101 (novembre 2012), aggiornata nel n. 219 (dicembre 2024), con una
     «didascalia lunga» per tavola (risultati di ricerca; non verificato sull'interfaccia).
- **Fonte**: sopra; Cornell home https://warburg.library.cornell.edu/
- **Perché funziona / fallisce**: il tour a 360° riproduce la mostra, non l'atlante: si cammina in una sala, si perde
  la tavola come pagina. Cornell funziona perché tiene la tavola intera come unità e il numero come indirizzo; fallisce
  nella scheda povera e senza navigazione tra le occorrenze della stessa immagine in altre tavole (proprio ciò che
  Arshake chiede).
- **Compatibilità con Mnemosyne**: Cornell sì; il tour no (è spettacolo, ed è la "mappa visiva" che l'utente non ha
  usato nell'Atlante).
- **Da prendere**: il modello Cornell senza il saggio: la tavola intera, i numeri delle voci posati accanto alle frasi,
  un tocco sul numero apre la provenienza (data, segno, frammento d'origine). In più quello che a Cornell manca: dalla
  scheda, "compare anche in" (le altre restituzioni che usano la stessa frase).

### 2.9 La critica: montaggio, tavolo, intervallo, scienza senza nome

- **Che cosa è**:
  - **Didi-Huberman**. *L'image survivante* (Minuit 2002, 592 pp., tre parti: «L'image-fantôme», «L'image-pathos»,
    «L'image-symptôme», scheda CCA citata sopra) legge il Nachleben come tempo dei fantasmi. *Atlas ou le gai savoir
    inquiet* (Minuit 2011, L'Œil de l'histoire 3; BnF https://catalogue.bnf.fr/ark:/12148/cb425287675) e la mostra
    *Atlas ¿Cómo llevar el mundo a cuestas?* (Reina Sofía, 26 novembre 2010 - 28 marzo 2011, poi ZKM e Amburgo)
    oppongono la *table* (tavolo di montaggio) al *tableau* (quadro finito). Nel pieghevole del museo: «Una mesa no se
    usa ni para establecer una clasificación definitiva, ni un inventario exhaustivo, ni para catalogar de una vez por
    todas» (sezione «Reconfigurar el orden de las cosas»; accenti ripristinati: il PDF ha un font cifrato,
    https://recursos.museoreinasofia.es/Exposiciones/2010021-fol_es-002-Atlas.pdf). Nel libro: «Contre toute pureté
    esthétique, il introduit le multiple, le divers, l'hybridité de tout montage» (p. 13) e l'atlante come riserva
    «inépuisable» di relazioni (p. 14), citati da Th. Golsenne, Acta fabula (https://www.fabula.org/revue/document7565.php).
  - **Michaud**, *Aby Warburg et l'image en mouvement* (Macula 1998, prefazione di Didi-Huberman): con Mnemosyne
    Warburg fonda «une iconologie des intervalles» che «ne porte plus sur des objets, mais sur des tensions, analogies,
    contrastes ou contradictions», un'iconologia delle relazioni tra le figure «dans un dispositif visuel autonome,
    irreductible à l'ordre du discours» (Michaud 2012, pp. 260 e 321, citato da Cirlot, Engramma 153, pp. 102-103).
    Il libro lega l'atlante al cinema e alla cronofotografia (Universalis, https://www.universalis.fr/encyclopedie/aby-warburg-et-l-image-en-mouvement/).
  - **Agamben**, *Aby Warburg e la "scienza senza nome"*, «Aut aut» 199-200 (1984), pp. 51-66, riprende da Robert Klein
    l'idea di una disciplina che esiste ma non ha nome (via Desideri, p. 64 nota 2; testo di Agamben non letto).
  - **Gombrich**, *Aby Warburg: An Intellectual Biography* (Warburg Institute 1970): il biografo ufficiale, che cita il
    passo «Ikonologie des Zwischenraumes» (p. 253) ma, secondo Cirlot, non usa il termine Zwischenraum e solo Denkraum
    (Cirlot, p. 84). La recensione critica più nota fu di Edgar Wind (TLS 1971, ripubblicata in Engramma 153,
    https://www.engramma.it/eOS/resources/images/500/e153/e153_wind_183-195.pdf, non letta).
- **Perché funziona / fallisce**: la tesi comune è che il senso nasce dall'accostamento e dall'intervallo, non dalla
  didascalia. Il rischio, che Didi-Huberman stesso nomina nel titolo («inquiet»), è l'infinito: una riserva
  «inépuisable» non chiude mai; la mostra del 2010 raccoglieva quasi quattrocento opere (Afterall,
  https://afterall.org/articles/atlas-how-to-carry-the-world-on-ones-back, dal risultato di ricerca).
- **Compatibilità con Mnemosyne**: in parte. Il montaggio come argomento sì (è il ponte forte). L'inesauribile no: la
  regola è poco e forte, un aggancio per messaggio, una cosa per lettera.
- **Da prendere**: il "tavolo" e non il "quadro": la tavola del sito è sempre un montaggio datato e rifacibile, mai
  presentata come il ritratto definitivo di una persona. E il tetto: una tavola contiene poche voci, non 971.

---

### Lezioni per il sito

1. **La tavola è l'unità di pagina.** Ogni restituzione (risposta, lettera, ritratto) si mostra come una tavola: un
   campo scuro, poche voci posate, il numero della voce accanto a ciascuna. Una pagina, una tavola; niente scorrimento
   infinito, niente cruscotto.
2. **Lo sfondo nero (o comunque profondo e uniforme) come Denkraum.** Lo spazio vuoto tra due frasi è l'argomento, non
   un margine. Più aria che contenuto; tipografia piccola e precisa sulle voci, nessun ornamento, nessun segno rosso:
   l'opposto del "troppo caos" dell'Atlante.
3. **L'accostamento è l'argomento.** Un ponte si mostra come due frasi ✦ con data e luogo, una accanto all'altra, senza
   il perché ◌ in vista. Il perché esiste, dietro un tocco. Se l'accostamento ha bisogno della spiegazione per reggersi,
   non va sulla tavola (è la definizione di "forte").
4. **Numeri stabili e visibili.** Come «79» e «7.4»: le tavole e le voci hanno numeri che non cambiano mai, anche con
   buchi. Il numero è l'indirizzo con cui lui dice «salvami la terza». Il numero sulla tavola è anche il bottone che
   apre la provenienza (modello Cornell).
5. **Il dettaglio come secondo livello.** Dalla voce si apre il frammento intero, con la riga citata evidenziata, l'ora,
   il canale, il segno; e "compare anche in" (le altre tavole dove torna la stessa frase): il link tra tavole che il tour
   del Warburg Institute non ha.
6. **I segni sono la didascalia.** Al posto delle didascalie di Warburg, ✦ ✧ ● ◌ ○ ⚠ accanto a ogni voce; il ○ porta
   opera e passo, come le schede di Ohrt e Heil portano luogo e fonte. La legenda in una riga, in testa, solo sulle
   tavole lunghe.
7. **L'incompiuto si mostra.** Ogni tavola ha la sua data e le sue versioni; le precedenti restano consultabili come le
   foto dell'agosto 1928. Nessuna tavola si presenta come definitiva; il ritratto è "il ritratto del …", non "chi sei".
8. **Poco e forte, contro l'inesauribile.** Warburg oscillava tra 2000 e 500 immagini; il sito sceglie il basso: poche
   voci per tavola, e niente coda di ciò che non è stato visto. La biblioteca del buon vicino entra solo come uno o due
   vicini in fondo a un frammento, senza commento.
9. **Mnemosyne e λησμοσύνη.** La madre delle Muse fa nascere anche l'oblio dei mali: nessuna tavola composta dal sistema
   riporta un frammento delicato, nessun anniversario automatico. La memoria del sito sa anche tacere.
10. **No alla sala in 360°.** La "mappa visiva" e la camminata in uno spazio virtuale riproducono la mostra, non il
    pensiero; l'utente l'ha già scartata. Restare alla tavola piatta, letta su un telefono, una alla volta, con lo zoom
    sul dettaglio.

---

## 3. Il presente (1): digital garden, spatial hypertext, tele e canali

Fonti lette direttamente: Appleton, Caulfield, Matuschak (pagina e CSS), Gwern (/about, /design), Bernstein ("Hypertext
Gardens", testo integrale dal PDF dell'Univ. of Washington; "Patterns of Hypertext", versione Eastgate), Marshall &
Shipman 1995, Shipman & Marshall 1999 (CSCW, testo integrale; ACM Computing Surveys, pagina Brown),
Are.na (help e about), Kinopio (about), Muse e Local-first (Ink & Switch). Tom Critchlow e Joel Hooks lasciati fuori: non
aggiungono nulla che Appleton non dica già.

---

### 3.1 Il giardino digitale

#### Maggie Appleton, "A Brief History & Ethos of the Digital Garden"
- **Che cosa è**: il saggio-manifesto del giardino digitale (pagina "planted" intorno al 2020; la data esatta non è
  sulla pagina, il riferimento più vicino è un thread dell'aprile 2020). Sei principi, sotto il titolo "The Six Patterns
  of Gardening": *Topography over Timelines* («Gardens are organised around contextual relationships and associative
  links»), *Continuous Growth*, *Imperfection & Learning in Public* («Gardens are imperfect by design»), *Playful,
  Personal, and Experimental*, *Intercropping & Content Diversity*, *Independent Ownership*. Gli stadi di crescita:
  «🌱 *Seedlings* for very rough and early ideas», «🌿 *Budding* for work I've cleaned up and clarified», «🌳 *Evergreen*
  for work that is reasonably complete (though I still tend these over time)». E l'"epistemic status": «a short
  statement that makes clear how they know what they know, and how much time they've invested in researching it».
- **Fonte**: https://maggieappleton.com/garden-history
- **Perché funziona / fallisce**: funziona perché sposta l'asse dal tempo al legame («Gardens don't consider publication
  dates the most important detail of a piece of writing», sez. Topography over Timelines) e perché dichiara quanto è
  solida ogni pagina invece di fingere che tutto sia finito. Il limite: lo stadio di crescita è un'etichetta che
  l'autore deve mettere a mano, ed è un giudizio sul *testo*, non sulla *provenienza* delle singole frasi. Le pagine di
  Appleton sono scritte da lei: non conoscono il problema di distinguere la voce dell'autore da quella di un lettore
  automatico.
- **Compatibilità con Mnemosyne**: in parte. Sì alla topografia contro la cronologia (i nodi), sì all'imperfezione
  dichiarata (è il ⚠). No alla "crescita" applicata alle parole dell'utente: un frammento è immutabile, non diventa
  evergreen. Lo stadio può valere per i nodi e le letture (che hanno versioni), mai per il Detto.
- **Da prendere**: un solo indicatore discreto di maturità sul *nodo* (quante volte lui ci è tornato, da `mappa.md`),
  calcolato e non scritto, al posto di seedling/budding/evergreen. Niente icone di piantine: il segno è già il ✦/◌/●.

#### Mike Caulfield, "The Garden and the Stream: A Technopastoral" (2015)
- **Che cosa è**: keynote a dLRN 2015 (Stanford, 16 ottobre), pubblicata il 17 ottobre 2015. Due metafore del web: il
  Giardino, «The Garden is the web as topology»; lo Stream, che «presents us with a single, time ordered path with our
  experience (and only our experience) at the center» (sez. 2, "the garden and the stream"). Nel giardino le cose «are
  related to one another in a relatively timeless way»; «Whereas the garden is integrative, the Stream is
  self-assertive»; «If the Garden is exposition, the stream is conversation and rhetoric». Sul Memex: «Your machine is a
  library not a publication device» e «Links are made by readers as well as writers».
- **Fonte**: https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/ (letti i primi 100.000 caratteri
  su 291.000; il resto non verificato)
- **Perché funziona / fallisce**: è una diagnosi, non un'interfaccia. Spiega bene perché il flusso cronologico produce
  rumore (ogni elemento chiede attenzione ora, poi sparisce) e perché il giardino integra. Non dice come si naviga un
  giardino su un telefono, che è per natura uno stream.
- **Compatibilità con Mnemosyne**: sì, ed è quasi una descrizione dei quattro strati: il Detto è uno stream (datato,
  in fila), il Letto è un giardino (nodi, legami). «Links are made by readers as well as writers» è esattamente il ◌
  (il lettore AI) contro il ● (l'utente che accoglie).
- **Da prendere**: due porte, non una. Una porta "stream" (le restituzioni, le parole in ordine di data) e una porta
  "giardino" (i nodi). Il sito non deve fondere le due in un'unica bacheca, che è l'errore dell'Atlante («mostrava
  tutto»).

#### Andy Matuschak, le note evergreen e i pannelli impilati
- **Che cosa è**: un archivio pubblico di note di lavoro. Definizione: «_Evergreen notes_ are written and organized to
  evolve, contribute, and accumulate over time, across projects.» Principi (titoli di note): «Evergreen notes should be
  atomic», «…concept-oriented», «…densely linked», «Prefer associative ontologies to hierarchical taxonomies», «Write
  notes for yourself by default, disregarding audience». La pagina "About these notes" avverte: «For now, there's no index
  or navigational aids». L'interfaccia: cliccare un link apre la nota accanto, in una colonna che scorre di lato
  (stacked notes); in fondo a ogni nota, i backlink.
- **Fonte**: https://notes.andymatuschak.org/Evergreen_notes ; https://notes.andymatuschak.org/About_these_notes ;
  sul telefono: il CSS della pagina stessa (`@media screen and (max-width: 800px) { .NoteColumnsContainer { width: unset
  !important; } }`, e `.noteLink { display: none; }` nell'intestazione). Implementazioni derivate: Quartz,
  https://quartz.jzhao.xyz/plugins/stackedpages : «Stacked pages are disabled on mobile by default (below 800px) since
  horizontal panning doesn't work well on small screens. On mobile, links navigate normally.»
- **Perché funziona / fallisce**: sullo schermo largo i pannelli tengono il contesto (vedi da dove vieni) senza la
  "pagina madre"; i backlink in fondo mostrano chi cita questa nota senza che l'autore l'abbia deciso. Sul telefono il
  modello crolla: sotto gli 800px le colonne smettono di affiancarsi (dal CSS; il comportamento esatto su iPhone non
  l'ho provato: non verificato) e i derivati lo dicono apertamente. Il "nessun indice" è voluto ma disorienta chi non è
  l'autore.
- **Compatibilità con Mnemosyne**: in parte. Sì al backlink calcolato (è un dato, non un'opinione), sì al "per me, non
  per un pubblico". No ai pannelli impilati come navigazione primaria: il telefono è il dispositivo dell'utente.
- **Da prendere**: in fondo a ogni nodo, "Dove torna": l'elenco dei frammenti che lo toccano, ciascuno con data e segno,
  ordinati per data; sul telefono una pagina per volta con un "indietro" che ricorda il cammino (una briciola sola, non
  una pila).

#### Gwern.net: popup, sidenote, confidence e importance
- **Che cosa è**: un sito di saggi lunghi con metadati epistemici e una tipografia molto curata. Dalla pagina About,
  sez. "Confidence tags": la confidenza è la probabilità soggettiva dell'autore, «These are used to express my feeling
  about how well-supported the essay is», su una scala: certain, highly likely, likely, possible, unlikely, highly
  unlikely, remote, impossible. Sez. "Importance tags": «I've ranked pages in deciles from 0--10». E: «the date is the
  last time the page was meaningfully modified»; «The "status" tag describes the state of completion». Dalla pagina
  Design: «link popup annotations (… 'popover' on small screens or mobile)»; «sidenotes instead of footnotes on wide
  windows»; «when the browser window is wide enough, the floating footnotes are instead replaced with marginal
  notes/*sidenotes*»; i backlink sono «provided as a transcluded collapsed appendix at the bottom of each item»;
  principio: «Anything besides the content is distraction and not design» e «you must *earn* your ornaments».
- **Fonte**: https://gwern.net/about ; https://gwern.net/design (letti 100.000 caratteri su 128.000)
- **Perché funziona / fallisce**: funziona come "iceberg" («instant popup access to excerpts enables iceberg-like pages
  where most information is hidden», sez. Abstract di Design): la pagina resta pulita, il dettaglio si apre a richiesta.
  Le sidenote degradano in note a piè di pagina sul telefono: è progressive enhancement esplicito. Il costo: la densità di
  icone e popup è alta, e lo stesso Gwern ammette (Demo-mode) che le descrizioni ripetute sono «a lot of clutter for
  readers who have learned them». Il popup al passaggio del mouse non esiste su telefono: diventa un popover a tocco.
- **Compatibilità con Mnemosyne**: in parte. Sì alla provenienza come metadato discreto e alla regola "l'ornamento si
  guadagna". No ai voti di importanza: sono un giudizio dell'autore sul proprio testo; in Mnemosyne nessuno dà voti alle
  parole dell'utente (vietati anche "i voti" nelle risposte).
- **Da prendere**: il segno (✦ ◌ ○ ⚠) come unico ornamento, toccabile: un tocco sul segno apre un popover di una riga con
  la provenienza ("il 4 ottobre, memo dal telefono"; "○ Marco Aurelio, Ricordi, II.1"). La legenda si mostra la prima
  volta, poi sparisce (la lezione del Demo-mode).

---

### 3.2 Tinderbox e lo spatial hypertext

#### Mark Bernstein, "Hypertext Gardens: Delightful Vistas" (1998)
- **Che cosa è**: saggio ipertestuale di Eastgate sul progetto dei siti. Tesi: tra la wilderness (lo sprawl non
  pianificato) e la struttura rigida c'è il giardino. «Unplanned hypertext sprawl is wilderness: complex and
  interesting, but uninviting» (sez. Gardens and Paths). Dai "Seven Lessons from Gardening": «1 Hypertext disorientation
  most often arises from muddled writing, or from the complexity of the subject. Many hypertexts do not require
  elaborate navigational apparatus.» «3 The shortest path is not always the best.» «5 Visual effects and other
  irregularities enhance pathways. But use punctuation sparingly; unwanted interruptions are tiresome and intrusive.»
  «7 Rigid structure makes a large hypertext seem smaller.» Sez. The Limits of Structure: «Revisiting a landmark always
  suggests closure, prematurely inviting the reader to leave the hypertext and do something else.» e «Articles mentioned
  on key pages receive traffic; others are rarely read.»
- **Fonte**: https://www.eastgate.com/garden/Enter.html ; testo integrale: 
  https://faculty.washington.edu/farkas/TC510-Fall2011/BernsteinGardens.pdf (stampa del 2002 delle pagine Eastgate)
- **Perché funziona / fallisce**: è il più vicino alla diagnosi dell'Atlante. La lezione 5 descrive i "segni rossi":
  la punteggiatura usata ovunque diventa interruzione. La lezione sui centri di navigazione spiega perché una home con
  "tutto" consuma l'attenzione: ciò che è in vetrina viene letto, il resto no. È un saggio di progetto, non uno studio
  con utenti: le evidenze sono argomenti, non misure.
- **Compatibilità con Mnemosyne**: sì. "Poco e forte" è la lezione 5 detta con altre parole; la coda lunga
  (rilanciare una frase vecchia mai ripresa) risponde al problema che solo la vetrina viene letta.
- **Da prendere**: nessuna home-indice. L'ingresso è una sola cosa (l'ultima restituzione, o una frase), con al più due
  sentieri; i "landmark" (indice dei nodi) esistono ma stanno un livello sotto, non in testa.

#### Mark Bernstein, "Patterns of Hypertext" (1998) e Tinderbox
- **Che cosa è**: un catalogo di forme ricorrenti negli ipertesti letterari (ACM Hypertext '98, pp. 21-29). Fra le
  altre: «In the Cycle, the reader returns to a previously-visited node and eventually departs along a new path»;
  «The Tangle confronts the reader with a variety of links without providing sufficient clues to guide the reader's
  choice»; «The Feint establishes the existence of a navigational opportunity that is not meant to be followed
  immediately»; il Neighborhood, nodi associati da «proximity, shared ornament, or common navigational landmarks».
  Tinderbox (Mac) ne è lo strumento: «the tool for notes», con mappe, attributi, prototipi e agenti che «scan your notes
  continuously»; "The Tinderbox Way" (3ª ed., 2017) ha un capitolo intitolato "Emergent Structure".
- **Fonte**: https://eastgate.com/patterns/Print.html ; https://www.eastgate.com/Tinderbox/ ;
  https://www.eastgate.com/Tinderbox/TinderboxWay/ (il libro non l'ho letto: solo l'indice. Il contenuto del capitolo
  "Emergent Structure" è non verificato)
- **Perché funziona / fallisce**: gli agenti di Tinderbox sono la forma operativa della "struttura derivata": l'utente
  scrive note, una regola le raccoglie. Il prezzo è la curva d'apprendimento e il solo Mac; nessuna versione telefono
  (la pagina rimanda all'app Note di iPhone per catturare, poi «on your Mac»).
- **Compatibilità con Mnemosyne**: in parte. Gli agenti sono il modello giusto (raccolte calcolate, non curate a mano);
  il Tangle è il rischio della mappa visiva dell'Atlante. Il Cycle è il "ritorno" (ritorna-su). La Feint è utile: mostrare
  che un sentiero esiste senza spingerci dentro.
- **Da prendere**: nella pagina di un nodo, un "ritorno" come Cycle: il frammento più vecchio e il più recente che lo
  toccano, affiancati, con le date. E una Feint discreta in fondo ("altre 6 frasi su questo"), senza contatori in rosso.

#### Catherine Marshall & Frank Shipman, "Spatial Hypertext: Designing for Change" (CACM 38(8), 1995)
- **Che cosa è**: il paper che fonda lo spatial hypertext e descrive VIKI. Le relazioni si esprimono con la posizione,
  il colore, l'allineamento, non con link dichiarati. «the ability to leave structure implicit and informal -- is one of
  the crucial distinctions of spatial hypertext» (p. 5). «Ambiguity may be left unresolved without compromising the
  integrity of the structure»: spostare un nodo fuori allineamento dice «our uncertainty about whether Node E really
  belongs». «interpretive structure is not inherent in document content, but evolves opportunistically through work»
  (sez. The interpretive task). Sulla ricognizione automatica: «Because structure is not enforced, but available on
  demand, expressive flexibility is not hampered by the definition of formal interconnections» e «Recognition is an
  accelerator» (sez. Recognition).
- **Fonte**: https://doi.org/10.1145/208344.208350 ; testo letto da
  https://typeset.io/pdf/spatial-hypertext-designing-for-change-3532t615lt.pdf (preprint degli autori, 19 pp.)
- **Perché funziona / fallisce**: evidenza dall'uso: nel lavoro con Aquanet e VIKI gli utenti lasciavano i link
  espliciti per le relazioni spaziali; nel survey del 1999 gli autori scrivono: «Users avoided the explicit linking
  mechanisms in favor of the more implicit expression of relationships» (Shipman & Marshall, "Spatial Hypertext: An
  Alternative to Navigational and Semantic Links", ACM Computing Surveys 31(4), 1999,
  https://cs.brown.edu/memex/ACM_HypertextTestbed/papers/37.html). Ma lo spazio funziona per chi lo dispone con le mani;
  in Mnemosyne la struttura la deriva l'AI, e una disposizione che l'utente non ha fatto non porta la sua memoria
  spaziale. È la ragione più probabile per cui «la mappa visiva non è stata usata».
- **Compatibilità con Mnemosyne**: in parte. Sì all'ambiguità lasciata aperta (il ◌ è esattamente una struttura
  "non risolta"); no alla tela come superficie principale: il telefono non ha spazio, e la disposizione non è sua.
- **Da prendere**: rendere visibile l'incertezza con un mezzo tipografico, non con un colore d'allarme: il ◌ in grigio,
  il ● pieno; un legame proposto resta visibilmente "fuori allineamento" finché lui non ci torna.

#### Frank Shipman & Catherine Marshall, "Formality Considered Harmful" (CSCW 8(4), 1999)
- **Che cosa è**: un bilancio di dieci anni di sistemi (ipermedia, design rationale, sistemi esperti). Tesi
  (Abstract): le difficoltà nascono da «users' unwillingness or inability to make structure, content, or procedures
  explicit». Quattro cause (sez. 3): Cognitive Overhead, Tacit Knowledge, Enforcing Premature Structure, Situational
  Structure. Sul costo: le formalizzazioni richiedono «chunking, naming, linking, and labeling» (3.1). Sulla struttura
  prematura, la citazione di Malone su una pila di carte da archiviare: «Leaving them out means that I defer for now
  having to decide» (3.3). Rimedi (sez. 4.3): «incremental formalization strategies do not require people to impose
  premature structure when they record information»; i suggerimenti del sistema «have the possibility of bringing
  previously tacit knowledge to consciousness». Il limite, sez. 4.4: i suggerimenti funzionano «as long as they don't
  overwhelm a user with too many requests to acknowledge inferred structure». E: «Inferred structure cannot be treated
  identically to user specified information.»
- **Fonte**: https://link.springer.com/article/10.1023/A:1008716330212 ; testo letto da
  https://typeset.io/pdf/formality-considered-harmful-experiences-emergingthemes-and-1nutddb0t9.pdf (18 pp.)
- **Perché funziona / fallisce**: è il fondamento teorico di "cattura cieca, struttura derivata", con esperienze
  concrete (HOS, VIKI, Infoscope). La frase della 4.4 è la ragione esatta per cui niente code di validazione: ogni
  richiesta di conferma è overhead, e troppe richieste annullano il guadagno. La frase "inferred structure cannot be
  treated identically" è la regola ◌ ≠ ●, scritta nel 1999.
- **Compatibilità con Mnemosyne**: sì, pienamente.
- **Da prendere**: nessun pulsante "accetta/rifiuta" sotto ogni ◌. L'accoglienza resta un atto in un memo, come oggi.
  Il sito mostra la struttura dedotta solo come "servizio" transitorio (ordinare, avvicinare), mai come elenco da
  smaltire; e la distingue sempre, graficamente, da ciò che lui ha detto.

---

### 3.3 Tele e canali: Are.na, Kinopio, Heptabase, Muse

#### Are.na
- **Che cosa è**: una piattaforma di blocchi (link, immagini, testi, file) raccolti in canali. Dall'help: «Connections are
  what join channels and blocks to each other»; «On Are.na, there is no such thing as a "like" or a "favorite", instead we
  have connections»; «every connection was made by a human, connections are paths we lay out for each other». Un blocco
  può stare in molti canali; il canale mostra «This channel appears in». Dalla pagina About: «Are.na is a mindful space
  where you can work through any project over time»; «We are the only social media company whose only customers are the
  people who use it». Il cofondatore Charles Broskoski: «I tend to think of my channels as areas of thought that become
  more articulated over time» e «we are more interested in tools for thinking rather than tools for organizing».
- **Fonte**: https://help.are.na/docs/getting-started/connections ; https://www.are.na/about ;
  https://upstatement.com/blog/interview-with-charles-broskoski . L'assenza di contatori di follower: solo fonti
  secondarie (https://en.wikipedia.org/wiki/Are.na), non verificato su fonte primaria.
- **Perché funziona / fallisce**: togliere il like toglie la metrica di popolarità, e quindi il rumore di ritorno; la
  connessione fatta a mano è una provenienza implicita (si vede chi l'ha fatta e in quale canale). L'estetica è sobria:
  griglia, testo, poco colore. Il limite: tutto dipende dalla cura manuale, che in Mnemosyne è proprio ciò che non si
  chiede. Sull'app di telefono non ho trovato fonti primarie sul comportamento: non verificato.
- **Compatibilità con Mnemosyne**: sì per l'ethos (niente metriche, niente solleciti, «connections are paths» = un
  legame accolto ●), in parte per il modello (le raccolte di Mnemosyne nascono dalle sue parole, non da un gesto di
  "connect").
- **Da prendere**: la sezione "Appare in" su ogni frammento: le raccolte e i nodi in cui compare, come "This channel
  appears in". E l'estetica: griglia sobria, nessun numero di popolarità, nessun colore d'allarme.

#### Kinopio
- **Che cosa è**: spazi liberi di carte colorate unite da connessioni. «Connect related ideas by dragging from the
  connector»; «Spatial memory is the magic that makes big ideas easier to recall and reason about»; «An oasis for the
  mind, with no ads, tracking, or AI bloat». Sul telefono: un'app iOS che avvolge il sito; lo sviluppatore scrive che
  Kinopio è stato pensato touch fin dall'inizio, con swipe per scorrere, pinch per lo zoom, pressione lunga per
  selezionare (sintesi del motore di ricerca di https://pketh.org/kinopio-ios.html : la pagina non l'ho letta, non
  verificato alla lettera).
- **Fonte**: https://kinopio.club/help/about/ ; https://pketh.org/kinopio-ios.html (non letta)
- **Perché funziona / fallisce**: la memoria spaziale funziona se la disposizione è tua: è lo stesso argomento di
  Marshall & Shipman. Una tela su un telefono di 6 pollici è usabile per toccare, poco per leggere.
- **Compatibilità con Mnemosyne**: no come superficie di lettura; in parte come spirito ("no AI bloat" è una promessa che
  Mnemosyne mantiene con il silenzio, non con l'assenza di AI).
- **Da prendere**: poco. Al più il colore come segno di genere (persona, opera, tema), tenue e costante, mai come
  allarme.

#### Heptabase
- **Che cosa è**: whiteboard e carte per studiare argomenti complessi: «Use whiteboards and cards to clarify your thinking
  and stay in flow». Una carta può stare in più whiteboard, e il desktop le mostra in un pannello: «you can see all the
  whiteboards that a card appears on in the right sidebar» (newsletter, https://wiki.heptabase.com/newsletters). Sul
  telefono la descrizione dell'App Store dice: «The mobile app provides full access to all your cards and journals, and
  allows you to read all your whiteboards»; la modifica delle whiteboard su iPhone è arrivata più tardi (nota di
  versione 1.17.0, "Support whiteboard operations").
- **Fonte**: https://heptabase.com/ ; https://apps.apple.com/us/app/heptabase/id6445801508 ;
  https://wiki.heptabase.com/newsletters (le citazioni da App Store e newsletter vengono dalla sintesi di ricerca, non
  dalle pagine lette: non verificate alla lettera)
- **Perché funziona / fallisce**: la divisione dei compiti è onesta: sul telefono si cattura e si legge, la tela si
  costruisce sul grande schermo. Il pannello "dove compare questa carta" è provenienza strutturale.
- **Compatibilità con Mnemosyne**: in parte. Utile la divisione telefono/schermo e il pannello delle presenze; la
  whiteboard non serve.
- **Da prendere**: sul telefono, la carta (il frammento, la restituzione) a tutta pagina; l'eventuale vista d'insieme
  solo su schermo largo e mai come ingresso.

#### Muse (Ink & Switch, 2019)
- **Che cosa è**: un prototipo di ricerca per iPad, poi prodotto. «Muse is a prototype iPad app for reading, thinking,
  and developing your ideas»; «We chose a spatial layout for Muse: mixed-media cards organized with a boards metaphor»;
  principio «No chrome»; navigazione a zoom, «no discrete navigation jumps». Contro l'ordine sterile: gli spazi fisici
  sono «messy, informal, mixed together, freeform, and personal», mentre «digital workspaces are structured, sterile,
  and impersonal». Sul telefono: «A phone is probably too small to legibly render a whole board»; «Phones are better for
  on-the-go lookups»; e «Touchscreen-only devices are poor for text entry and manipulation».
- **Fonte**: https://www.inkandswitch.com/muse/ (McGranaghan, Keskin, Wiggins, Roggatz, aprile 2019)
- **Perché funziona / fallisce**: la ricerca riporta che gli utenti «quickly learned the interface»; il punto debole
  dichiarato è far entrare i documenti («Right now it's too hard to get documents into Muse»). Lo stesso gruppo dice che
  il telefono non regge una tavola intera: è l'evidenza più diretta contro una mappa visiva sul telefono.
- **Compatibilità con Mnemosyne**: in parte. "No chrome" e il telefono come strumento di consultazione rapida sì; la
  tavola no.
- **Da prendere**: sul telefono, consultazione ("on-the-go lookups"): una ricerca e una frase, non un'esplorazione.
  Nessuna barra di strumenti: la pagina è la frase.

Ink & Switch, "Local-first software" (Kleppmann e altri, 2019, https://www.inkandswitch.com/essay/local-first/):
pertinente solo per «6. Security and privacy by default» e «5. The Long Now» («your work should continue to be
accessible indefinitely, even after the company that produced the software is gone»). Da prendere: il sito come vista
generata dai file del repository, senza un database proprio, leggibile in cache sul telefono.

---

### Lezioni trasversali

1. **Due porte, mai una bacheca.** Lo stream (le restituzioni, le parole in ordine di data) e il giardino (i nodi) sono
   modi diversi (Caulfield). L'Atlante li fondeva in una pagina che «mostrava tutto». L'ingresso è una cosa sola
   (Bernstein: i centri di navigazione mangiano l'attenzione).
2. **La tela non va sul telefono.** Matuschak, i suoi derivati (Quartz sotto gli 800px), Muse («A phone is probably too
   small…») e Heptabase (lettura sul telefono, costruzione sul grande schermo) dicono la stessa cosa. E la memoria
   spaziale vale solo per chi ha disposto le cose (Marshall & Shipman; Kinopio): una mappa composta dall'AI non è la
   sua. È la spiegazione più sobria del «la mappa visiva non è stata usata».
3. **La struttura dedotta non si mette in coda.** Shipman & Marshall 1999, sez. 4.4: i suggerimenti funzionano finché
   non sommergono di richieste di conferma; la struttura inferita «cannot be treated identically» a quella dichiarata.
   Quindi: niente pulsanti accetta/rifiuta, ◌ sempre distinto da ●, l'accoglienza resta un atto nel memo.
4. **L'ornamento si guadagna.** Gwern («you must *earn* your ornaments») e Bernstein (lezione 5: «use punctuation
   sparingly») descrivono i "segni rossi". Il solo ornamento ammesso è il segno di provenienza, piccolo, e un tocco lo
   apre in una riga (popover alla Gwern), con la legenda solo la prima volta.
5. **Provenienza come "dove compare", calcolata.** I backlink di Matuschak e di Gwern, il «This channel appears in» di
   Are.na, il pannello delle whiteboard di Heptabase: tutti mostrano da dove viene e dove torna una cosa senza che
   nessuno lo scriva. Per Mnemosyne: in fondo a ogni nodo, i frammenti con data e segno; su ogni frammento, i nodi e le
   raccolte in cui appare.
6. **Lo stato epistemico sì, i voti no.** Appleton (epistemic status) e Gwern (confidence) dichiarano quanto è solida una
   pagina: è il ⚠ e l'`esito`. Ma importance, stadi di crescita e like sono giudizi o metriche: in Mnemosyne le parole
   dell'utente non si valutano e non "crescono". Are.na prova che si può togliere la metrica senza perdere l'uso.
7. **L'incertezza si mostra con la tipografia, non con l'allarme.** Lo "spostare fuori allineamento" di Marshall &
   Shipman per dire il dubbio: ◌ in tono smorzato, ● pieno, ⚠ piccolo accanto, mai una campitura rossa.
8. **Telefono = consultazione e una frase; schermo largo = giardino.** Muse («Phones are better for on-the-go
   lookups»), Gwern (sidenote solo su finestre larghe, piè di pagina altrove): progressive enhancement. Sul telefono una
   pagina per volta, una briciola di ritorno, nessuna pila di pannelli; sullo schermo largo si può aggiungere il margine.

Fonti non lette direttamente: il libro "The Tinderbox Way" (solo indice); il post sull'app iOS di Kinopio
(pketh.org); la descrizione App Store e la newsletter di Heptabase (citate da sintesi di ricerca); la seconda metà del
saggio di Caulfield; l'ultimo quarto di gwern.net/design; il comportamento reale del sito di Matuschak su iPhone
(dedotto dal CSS).

---

## 4. Il presente (2): PKM, visualizzazione, riemersione, serendipità

Bozza per il sito di Mnemosyne. Ogni voce: che cosa è, fonte, perché funziona o fallisce, compatibilità, da prendere.
Dove non ho letto la fonte primaria lo dico.

---

### 4.1 Obsidian: il graph view, il "hairball" e il grafo locale

- **Che cosa è**: Obsidian ha due grafi. La documentazione: «Graph view is a core plugin that lets you visualize the
  relationships between the notes in your vault» e «While the Graph view shows all notes in your vault, a local Graph
  view shows you notes connected to the active note»; la profondità: «Each level of depth will show notes connected to
  the notes revealed at the previous depth» (pagina *Graph view*).
- **Fonte**: https://obsidian.md/help/Plugins/Graph+view ; forum: https://forum.obsidian.md/t/usage-of-graph-view/ ,
  https://forum.obsidian.md/t/whats-the-point-of-the-graph-view-how-are-you-using-it/71316 ; letteratura: Ghoniem,
  Fekete, Castagliola, *A Comparison of the Readability of Graphs Using Node-Link and Matrix-Based Representations*,
  IEEE InfoVis 2004, pp. 17–24 (https://dblp.org/rec/conf/infovis/GhoniemFC04), versione estesa in *Information
  Visualization* 4:2 (2005), 114–135; Munzner, slide del corso CPSC 531 (2016), lezioni 7–8:
  https://www.cs.ubc.ca/~tmm/courses/531-16/lectures/lect7-8.pdf
- **Perché funziona / fallisce**:
  - Le critiche degli utenti sono costanti. Sul forum: «I just can’t get my head around the graph view and find how it
    could improve my workflow» (spolanski) e, sul limite pratico, «then I have to zoom out to see all of them, but then I
    don’t see their names…» (stesso thread). In un altro thread: «I have never seen the point of graph view other than
    “hey look at this!”» (writtenfool) e «the position of each note changes on every load» (zhMGjFoyz). Chi lo difende
    parla del grafo **locale**: «It’s much more intuitive to use» (Edmund). Sono aneddoti, non uno studio: ma
    ripetono quasi alla lettera la frase dell'utente sull'Atlante («la mappa visiva non è stata usata»).
  - Due cause misurabili. (a) Leggibilità: Ghoniem et al. trovano che oltre circa venti vertici la matrice batte il
    node-link nella maggior parte dei compiti, e il node-link vince solo nel **path finding** (riassunto dell'abstract
    via indice bibliografico e slide di Fekete, GD 2014: https://mozart.diei.unipg.it/gd/gd2014/data/uploads/gd2014-fekete-keynote.pdf ;
    il testo pieno del paper non l'ho letto). Munzner lo riassume così nelle slide: «node-link best for small
    networks», «matrix best for large networks», «if tasks don’t involve topological structure!» (lect7-8, slide
    "Idiom: adjacency matrix view"); e per il force-directed: «scalability –nodes, edges: 1K-10K», «hairball problem
    eventually hits» (slide "Idiom: force-directed placement"). Il libro *Visualization Analysis and Design* (2014)
    non l'ho letto: le cifre vengono dalle slide. (b) Instabilità: un layout a forze che si ridispone a ogni apertura
    distrugge la memoria spaziale, quindi non si impara a "leggere" la propria mappa.
  - Il grafo globale non risponde a nessuna domanda. Il grafo locale sì: "che cosa sta accanto a questo?". È anche
    l'unico compito (il cammino) in cui il node-link vince.
- **Compatibilità con Mnemosyne**: il grafo globale **no** (rumore, nessuna provenienza leggibile, mostra tutto come
  l'Atlante). Il locale **in parte**: utile a profondità 1, pochi nodi, solo se ogni arco porta il suo segno (✦ ● ◌) e
  i legami ◌ sono distinguibili o nascosti; le persone `vita` e i frammenti delicati non devono comparire come nodi
  visitabili per caso.
- **Da prendere**: nessuna "mappa" in home. Sulla pagina di un nodo, un **vicinato a profondità 1** con al più 7–9
  vicini, layout **fisso** (deterministico, calcolato una volta e salvato, non a forze in tempo reale), archi etichettati
  con il predicato e il segno. Il "che cosa collega A e B" del CLAUDE.md è un compito di cammino: lì, e solo lì, un
  piccolo disegno node-link del cammino trovato (3–5 nodi), non del grafo. Per una vista d'insieme dei legami tra temi,
  se servisse, una matrice (temi × temi, celle = numero di frammenti ✦ in comune), non un gomitolo.

### 4.2 Roam e Logseq: backlink, "unlinked references", journal

- **Che cosa è**: Roam (2019–20) ha reso popolari tre cose: i **backlink** in fondo a ogni pagina (i "Linked
  References"), le **Unlinked References** (le menzioni testuali del nome della pagina non ancora collegate) e la
  **Daily Notes** come pagina d'ingresso. Logseq è un outliner open source che apre per default sui journal.
- **Fonte**: Roam: https://roamresearch.com/ (la pagina non restituisce testo leggibile: documentazione ufficiale non
  letta); descrizione d'uso: https://www.anthrodendum.org/2020/05/05/roam-if-you-want-to/ («Roam will still catch it in
  a section called, unsurprisingly, "Unlinked References."», «there is an option to turn those into real links if you
  like»; e sul journal: «tagging something creates a new page that will automatically have a back-link» che «includes
  what you are writing in the daily journal!»). Logseq: README https://github.com/logseq/logseq («A privacy-first,
  open-source platform for knowledge management and collaboration»); il comportamento "apre sui journal" viene da file
  `config.edn` di utenti («If not specified, Logseq default opens journals page on startup»,
  https://gist.github.com/fishyer/ec7520ae794c5456470a0c62dc30f2c0 ): documentazione ufficiale non letta (pagina troppo
  grande per lo strumento).
- **Perché funziona / fallisce**: il backlink funziona perché è **contesto, non navigazione**: in fondo alla pagina di
  un concetto vedi i paragrafi in cui l'hai nominato, ciascuno con il suo intorno e la sua data. La pagina del giorno
  funziona perché la cattura non chiede dove mettere le cose (coerente con "cattura cieca"). Le unlinked references
  funzionano come suggerimento a costo zero, ma trasformano il lettore in un archivista: chiedono "vuoi collegarlo?",
  cioè una coda di validazione. Il fallimento noto di questi strumenti è l'altro lato: la manutenzione dei link e la
  proliferazione di pagine vuote create da un tag (non ho uno studio che lo misuri: è esperienza diffusa, non
  verificata).
- **Compatibilità con Mnemosyne**: backlink **sì**, ed è già il modello dei nodi (persone, opere, temi): la pagina di un
  nodo è l'elenco dei frammenti che lo nominano, con le parole ✦ alla lettera. Daily notes **in parte**: la cattura è il
  telefono, non il sito; ma una vista "giorno" che raccoglie i frammenti e la risposta del giorno è naturale. Unlinked
  references come **pulsante "collega"**: **no** (coda di validazione); come strato ◌ calcolato, separato, "forse
  parla anche di…", **in parte**.
- **Da prendere**: la pagina di un nodo è un **elenco di backlink cronologico inverso**, ogni voce = la riga ✦ in
  corsivo, data, segno; i legami ◌ in una sezione a parte, più piccola, sotto ("letture mie"); le menzioni non
  collegate non esistono come azione: se lo script le vede, diventano proposte ◌ in quella sezione. Nessun outliner,
  nessuna modifica: il sito si legge.

### 4.3 Readwise e la riemersione; Memories, On This Day e la crudeltà algoritmica

- **Che cosa è**: Readwise manda ogni giorno una **Daily Review** di evidenziazioni scelte a caso con pesi; la
  **Mastery** è una ripetizione spaziata opzionale. Facebook "On This Day" (dal 24 marzo 2015), Google Photos
  "Memories", Timehop: riemersione per anniversario.
- **Fonte**: Readwise, FAQ "Reviewing Highlights": https://docs.readwise.io/readwise/docs/faqs/reviewing-highlights ;
  Mastery: https://help.readwise.io/article/26-how-does-the-readwise-spaced-repetition-algorithm-work ; Eric Meyer,
  *Inadvertent Algorithmic Cruelty*, 24 dicembre 2014:
  https://meyerweb.com/eric/thoughts/2014/12/24/inadvertent-algorithmic-cruelty/ ; On This Day: CSMonitor, 25 marzo
  2015, https://proof.csmonitor.com/Technology/2015/0325/Facebook-s-On-This-Day-celebrates-cherished-memories-hides-bad-ones ;
  filtri di ottobre 2015: https://mic.com/articles/126764/facebook-on-this-day-feature-lets-you-block-painful-memories-here-s-how-to-do-it ;
  Google Photos: https://support.google.com/photos/answer/9454489 ; Vice, 12 luglio 2017:
  https://www.vice.com/en/article/facebooks-on-this-day-brings-bad-memories-back-to-life/ ; tesi qualitativa su Facebook
  Memories e lutto (Univ. of Denver, 2020): https://digitalcommons.du.edu/capstone_masters/375 ; ripetizione
  spaziata e rilettura: Rawson & Kintsch 2005, *Rereading effects depend on time of test*, J. Educ. Psych. 97(1),
  70–80, letto solo attraverso https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6333692/ (non verificato sul testo
  originale).
- **Perché funziona / fallisce**:
  - Readwise non è un calendario: è un'estrazione con pesi. «there's a 20% chance your Daily Review will contain a
    highlight from that book» (se quel libro ha il 20% delle evidenziazioni); «Each time a highlight is shown, its
    probability of resurfacing is significantly decreased»; c'è un filtro di qualità che «checks for 'low quality'
    highlights, such as sentence fragments»; e il **Frequency Tuning** per documento (FAQ citata). Funziona perché è
    piccola, finita, e perché ciò che è già stato mostrato si allontana. La Mastery (mezza vita iniziale di 7, 14 o 28
    giorni; riemerge quando la probabilità stimata di ricordo scende al 50%) serve a memorizzare, non a rileggere: la
    letteratura sulla rilettura distribuita (Rawson & Kintsch, nel riassunto citato) mostra un vantaggio della
    rilettura distanziata solo al test differito, cioè per ricordare un testo; Mnemosyne non vuole che l'utente
    *impari* i suoi frammenti, vuole che li ritrovi. Pertinenza bassa: si prende l'idea del decadimento, non
    l'algoritmo.
  - L'anniversario fallisce sui ricordi dolorosi, ed è documentato. Meyer: il "Year in Review" gli presenta «A picture
    of my daughter, who is dead»; la diagnosi: «This inadvertent algorithmic cruelty is the result of code that works
    in the overwhelming majority of cases»; i rimedi che propone: «don't pre-fill a picture until you're sure the user
    actually wants to see pictures from their year», «maybe ask them if they'd like to try a preview — just a simple yes
    or no», «And then, of course, honor their choices». Facebook al lancio dice di voler tenere fuori ex e «the
    departed» (CSMonitor, parafrasi del giornale, non dichiarazione diretta); sette mesi dopo aggiunge filtri per date e
    persone: «The preference settings now allows the user to filter out specific dates and people from their memory
    feed» (Mic, 14 ottobre 2015). Google Photos ha "Hide dates" («When you hide a date, you won't get photos taken on
    that date in the featured memories carousel») e due livelli per le persone, «Show less» e «Blocked». Lo studio
    qualitativo su 41 persone in lutto trova che Memories offre «both connection to a deceased loved one and social
    support» ma anche «potentially retraumatizing unexpected reminders of grief» (abstract, DU 2020). Non ho trovato un
    paper CHI specifico su On This Day e lutto: lacuna da colmare (cercare in ACM DL).
  - Timehop: non verificato (nessuna fonte letta).
- **Compatibilità con Mnemosyne**: Readwise **in parte**: il decadimento dopo la mostra e il filtro dei frammenti
  poveri coincidono con "parlante"; la "review quotidiana" come rito con contatore **no** (è un sollecito, una coda).
  L'anniversario **no** nella forma "un anno fa oggi": è esattamente il caso della regola DELICATO. Mnemosyne è già un
  passo avanti rispetto ai filtri di Facebook e Google: il delicato è escluso **per costruzione**, non per un'opzione
  che l'utente deve trovare dopo essersi fatto male.
- **Da prendere**: una sola cosa che riemerge, scelta con peso e con decadimento (ciò che è stato mostrato si allontana
  per mesi), mai per data-anniversario, mai un delicato (la regola esistente), mai con un numero ("3 da rivedere"). Se
  si vuole comunque l'asse del calendario, un "in questi giorni, negli anni" che compare **solo** se c'è qualcosa di
  non delicato e parlante, e tace altrimenti. Un controllo "non mostrarmi più questo" sull'oggetto riemerso, che vale
  per sempre (il «honor their choices» di Meyer), registrato come atto `rifiuta` passando dal piano, non come
  impostazione nascosta.

### 4.4 Timeline e lifelogging: Lifestreams, MyLifeBits, "Beyond Total Capture"

- **Che cosa è**: Lifestreams (Freeman & Gelernter 1996) sostituisce il desktop con un unico flusso temporale di
  documenti, con passato, presente e futuro, e "substream" come filtri. MyLifeBits (Gemmell, Bell, Lueder 2006) è il
  database di tutto ciò che Gordon Bell ha visto e scritto. Sellen & Whittaker (2010) ne sono la critica.
- **Fonte**: Freeman & Gelernter, *Lifestreams: A Storage Model for Personal Data*, SIGMOD Record 25(1), 1996, pp.
  80–86: https://sigmodrecord.org/publications/sigmodRecord/9603/pdfs/381854.381893.pdf ; Gemmell, Bell, Lueder,
  *MyLifeBits: A Personal Database for Everything*, CACM 49(1), 2006, pp. 88–95:
  https://www.dourish.com/classes/readings/Gemmell-MyLifeBits.pdf ; Sellen & Whittaker, *Beyond Total Capture: A
  Constructive Critique of Lifelogging*, CACM 53(5), 2010, pp. 70–77:
  https://www.microsoft.com/en-us/research/wp-content/uploads/2020/04/Beyond-total-capture.pdf
- **Perché funziona / fallisce**:
  - Lifestreams difende il tempo come ordine: «time is a natural guide to experience; it is the attribute that comes
    closest to a universal skeleton-key for stored experience» (sez. "Chronology as a storage model", p. 81), e chiede
    che il sistema sappia riassumere un gruppo di documenti «on a single screen» (p. 80, requisito 4). Interessante
    per Mnemosyne la sua idea di immutabilità: i documenti del passato diventano «read-only (in the past, set in stone
    for history)» (p. 81).
  - MyLifeBits mostra i risultati «as a list, variable-sized thumbnails, and a timeline» (p. 92) e ammette il costo
    dell'annotazione: «we are still asking the user to become a filing clerk» (sez. "Experience and Observations");
    conclude che un diario di viaggio con «a timeline, animated maps, and annotations is substantially more valuable
    [...] than a collection of unlabeled photos» (stessa sezione). Cioè: il valore sta nella **storia** costruita,
    non nell'archivio.
  - Sellen & Whittaker smontano l'assunto. Le cinque R: «recollecting, reminiscing, retrieving, reflecting, and
    remembering intentions» (sez. "Defining the Benefits: Five Rs", p. 72). La riflessione: «the value is not in
    reliving past events [...] but in seeing things anew and framing the past differently» (p. 73). Le evidenze:
    archivi digitali di memorabilia «rarely accessed», e alle persone che dovevano scegliere oggetti significativi in
    casa «less than 2% of the objects they reported were digital» (p. 74). Il punto di progetto: i dati sono
    **indizi**, non ricordi («Not "capturing experience" but designing effective retrieval cues», p. 75); e soprattutto
    «place, events, and people are stronger cues than time» (pp. 75–76), «in contrast to the design of many lifelogging
    user interfaces». Infine: «systems supporting reminiscence and reflection have received far less attention than
    those supporting recollection and retrieval» (p. 76); per la riflessione servono modi di vedere i dati «that might
    surprise, provoke, or educate users» (p. 76).
- **Compatibilità con Mnemosyne**: **sì**, ed è la fonte più utile del gruppo. Mnemosyne non è un lifelog a cattura
  totale: è cattura volontaria di frasi, e le restituzioni sono già "reflecting" (lettera, ritratto). La timeline pura
  come asse principale è **in parte** compatibile: va bene come spina, ma le persone, le opere e i temi sono indizi
  più forti del calendario.
- **Da prendere**: due assi, non uno. La **cronologia** come spina (un flusso verticale per mese, i frammenti ✦ e le
  restituzioni intercalate, il passato immutabile e lo si vede), e l'ingresso **per persona, opera, tema** come via
  principale per ritrovare. Ogni mese chiuso si riassume in una schermata (i "periodi" di `parole.md`: conti e tre
  frasi alla lettera) — il requisito 4 di Lifestreams applicato. Il ritratto è la "reflection" di Sellen & Whittaker:
  merita la sua pagina, non un widget.

### 4.5 Information Foraging: odore, chiazze, dieta

- **Che cosa è**: la teoria di Pirolli e Card tratta chi cerca informazioni come un animale che massimizza il guadagno
  per unità di costo. Le *patch* sono raggruppamenti dove l'informazione si concentra; la *diet* è la scelta di che
  cosa vale la pena consumare; l'*information scent* sono gli indizi prossimali (etichette, anteprime) con cui si
  stima il valore di una fonte prima di aprirla.
- **Fonte**: Pirolli & Card, *Information Foraging*, Psychological Review 106(4), 1999, 643–675,
  https://doi.org/10.1037/0033-295X.106.4.643 (testo pieno **non letto**); il precursore Pirolli & Card, *Information
  Foraging in Information Access Environments*, CHI 1995:
  https://www.chi1995.chistatic.hosting.acm.org/proceedings/papers/ppp_bdy.htm ; sintesi applicata: Nielsen Norman
  Group, *Information Scent*: https://www.nngroup.com/articles/information-scent/
- **Perché funziona / fallisce**: dal paper del 1995: «A user's encounters with valuable or relevant information will
  typically have a clumpy structure over space and time» e «Models of this situation are called patch models» (sez.
  "Example 1: Foraging in information patches"); la dieta: «we have a problem of determining the optimal information
  diet» (sez. "Example 2: Information diet"). NN/g definisce l'odore come «the user’s imperfect estimate of the value
  that the source will deliver», «derived from a representation of the source»; un'etichetta «too obscure and vague»
  fa perdere buone fonti; un'anteprima deve «convey the gist of that information source»; e se la pagina d'arrivo non
  conferma l'odore, la gente «simply leave». È la spiegazione del perché il grafo dell'Atlante non si usava: un pallino
  con un nome non ha odore; non si sa che cosa c'è dentro prima di cliccare, e cliccare costa.
- **Compatibilità con Mnemosyne**: **sì**. L'odore migliore che Mnemosyne possiede sono le parole dell'utente, alla
  lettera e datate: sono già la sintesi più fedele di un frammento.
- **Da prendere**: ogni link a un nodo o a un frammento porta un'**anteprima fatta di una riga ✦** (la più recente o la
  più forte, alla lettera, in corsivo, con la data) e un conto da `mappa.md` (es. "11 frammenti, da marzo"). Niente
  etichette nude. Le patch sono le pagine di nodo e i mesi: dentro una patch, lettura densa senza clic. La dieta: il
  sito filtra per default ai parlanti (gli altri sono raggiungibili, non mostrati).

### 4.6 Shneiderman, Tufte, Bret Victor: panoramica, densità, grafica invece di interazione

- **Che cosa è**: (a) il mantra di Shneiderman; (b) Tufte: small multiples, sparkline, *layering and separation*; (c)
  Bret Victor: *Magic Ink* (il software informativo è grafica), *Up and Down the Ladder of Abstraction*,
  *Explorable Explanations*.
- **Fonte**: Shneiderman, *The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations*, IEEE Symp.
  Visual Languages 1996, pp. 336–343, PDF: https://webspace.science.uu.nl/~telea001/uploads/VACourse/Shneiderman96.pdf ;
  Tufte, sparkline: https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/ ; Tufte,
  *Envisioning Information* (1990), capitoli "Layering and separation" e "Small multiples" (indice da catalogo:
  https://www.cca.qc.ca/en/search/details/library/publication/874831772 ; libro **non letto**); Victor, *Magic Ink*
  (2006): http://worrydream.com/MagicInk/ ; *Up and Down the Ladder of Abstraction* (2011):
  http://worrydream.com/LadderOfAbstraction/ ; *Explorable Explanations* (2011):
  http://worrydream.com/ExplorableExplanations/
- **Perché funziona / fallisce**:
  - Shneiderman: «Overview first, zoom and filter, then details-on-demand» (Abstract e sez. 2, "Visual Information
    Seeking Mantra"); ma lui stesso dice che «this is only a starting point» (Abstract). I sette compiti includono
    «Relate» e «History» (sez. 2). Il mantra non dice che la panoramica debba essere un grafo: dice che deve esserci
    una vista del tutto. Il grafo dell'Atlante era una panoramica senza zoom né filtro utilizzabili.
  - Tufte: «Sparklines are datawords: data-intense, design-simple, word-sized graphics» (*Beautiful Evidence*,
    riportato sulla pagina citata). Small multiples e layering/separation: non verificati sul testo; la loro idea
    corrente (molte piccole figure con la stessa scala; più strati sulla stessa superficie distinti per peso visivo)
    è nota ma qui non citabile alla lettera.
  - Victor, *Magic Ink*: «interactivity is actually a curse for users and a crutch for designers» (Abstract);
    «information software should be approached initially and primarily as a graphic design project» (sez. "Information
    software design is graphic design"); «Interaction should be used judiciously and sparingly» (sez. "Interactivity
    considered harmful"); e il contesto si deduce: «Context can be inferred from a history of past environments and
    interactions» (Summary). *Ladder*: «the most powerful way to gain insight into a system is by moving between
    levels of abstraction» (apertura) e l'insight sta «in the transitions between them» (sez. "Stepping Back Down");
    «Every point on a visual abstraction typically corresponds to a particular concrete state» (stessa sezione).
    *Explorable Explanations*: il testo come «an environment to think in» (Introduzione), con l'idea del testo
    dell'autore come «base layer» (sez. "Contextual Information").
- **Compatibilità con Mnemosyne**: **sì**, con una correzione: la panoramica di Mnemosyne è una pagina che si legge,
  non un disegno da esplorare. *Magic Ink* è quasi una dichiarazione della regola "poco e forte" per l'interfaccia. Il
  *layering* di Tufte è la soluzione grafica dei segni: ✦ in primo piano, ◌ e ○ in uno strato più leggero, invece di
  "segni rossi" su tutto (la critica all'Atlante).
- **Da prendere**:
  - Panoramica = un **indice di small multiples**: per ogni tema o persona, una riga con nome, una sparkline dei mesi
    (frammenti ✦ parlanti per mese, stessa scala per tutti), il conto da `mappa.md`. Si legge in una schermata, si
    tocca una riga per andare alla pagina.
  - Ogni punto della sparkline porta a un frammento concreto (la "scala" di Victor: dall'astratto alla frase e
    ritorno).
  - **Strati, non colori d'allarme**: le parole ✦ in corsivo, pieno contrasto; ◌ e ○ in grigio e corpo minore; ⚠ un
    segno piccolo accanto, non un colore che invade la pagina. Le proposte ◌ si possono nascondere tutte con un
    interruttore unico ("solo le mie").
  - Poca interazione: pagine che si scorrono; nessun pannello di filtri; il contesto (ultima lettera, ultimo mese) è
    dedotto, non chiesto.

### 4.7 Serendipità progettata

- **Che cosa è**: la ricerca sull'incontro inatteso con informazioni utili e come favorirlo senza rumore. Nei PKM: il
  "random note" di Obsidian, i mazzi di carte come *Oblique Strategies*.
- **Fonte**: Makri & Blandford, *Coming across information serendipitously – Part 1: A process model*, Journal of
  Documentation 68(5), 2012, 684–705, versione aperta:
  https://openaccess.city.ac.uk/id/eprint/14402/6/Coming%20Across%20Information%20Serendipitously%20%28Part%201%29.pdf ;
  Part 2: https://openaccess.city.ac.uk/id/eprint/14401/ ; André, Teevan, Dumais, *From X-Rays to Silly Putty via
  Uranus: Serendipity and its Role in Web Search*, CHI 2009, pp. 2033–2036: https://eprints.soton.ac.uk/267019/ (pagina
  bloccata, letto solo il riassunto via ricerca: **non verificato**); McCay-Peet, tesi di dottorato (Dalhousie 2013):
  https://dal.scholaris.ca//items/17f0d03c-3821-429d-ac92-6f5e690bdd61/full ; McCay-Peet & Toms, *Researching
  Serendipity in Digital Information Environments* (2017, libro non letto); Obsidian Random note:
  https://obsidian.md/help/plugins/random-note ; *Oblique Strategies* (Eno & Schmidt 1975):
  https://en.wikipedia.org/wiki/Oblique_Strategies (fonte secondaria).
- **Perché funziona / fallisce**:
  - Makri & Blandford (28 interviste): la serendipità è «a new connection» che «involves a mix of unexpectedness and
    insight and has the potential to lead to a valuable outcome» (Abstract, "Findings"). Tre componenti, non una: il
    caso da solo (il random) dà solo l'inatteso; l'intuizione e il valore devono essere già nel materiale o nella
    persona. Nella Part 2 le mescolanze di inatteso, intuizione e valore definiscono una «serendipity space» con
    "forze" diverse.
  - McCay-Peet: tre fattori della scala del "serendipitous digital environment": «enables connections,
    trigger-rich, and leads to the unexpected» (abstract della tesi).
  - André, Teevan, Dumais: molte query restituiscono risultati interessanti ma non direttamente pertinenti, e la
    personalizzazione non sembra ridurre la serendipità (dal riassunto: non verificato sul testo).
  - Il random puro: Obsidian lo presenta come «Rediscover notes to add new insights, or link to recently added notes»
    (pagina del plugin). È economico ma cieco: in un archivio con molti frammenti poveri estrae soprattutto rumore, ed
    è per questo che nascono varianti filtrate (il "Smart Random Note" da risultati di ricerca, citato nel forum
    https://forum.obsidian.md/t/rfc-oblique-strategies-writing-prompts-reflection-creators-block/9997/18 ). *Oblique
    Strategies* funziona per l'opposto: il mazzo è piccolo e ogni carta è già stata scelta come forte; il caso sta solo
    nell'ordine.
- **Compatibilità con Mnemosyne**: **sì** se l'inatteso è estratto da un insieme già filtrato (parlanti, non delicati,
  non mostrati di recente, non rifiutati), come un mazzo di Eno; **no** come "nota a caso" su tutto l'archivio. Il
  "ponte" forte del CLAUDE.md (due frasi alla lettera accostate che fanno vedere il nesso da sole) è esattamente
  «unexpectedness and insight»: l'inatteso è l'accostamento, l'intuizione la porta la persona, il valore è che sono
  sue.
- **Da prendere**: un solo elemento "inatteso" nel sito, e il suo materiale è il **ponte**: due righe ✦ alla lettera,
  con data e luogo, una sopra l'altra, nessun commento (o il commento ◌ nascosto dietro un tocco). Pescato da un mazzo
  costruito dallo script (ponti già consegnati e non rifiutati, coda lunga, mai delicati), con decadimento alla
  Readwise. Se il mazzo è vuoto, il vuoto: "Nessun ponte oggi." Un secondo gesto, a richiesta e mai in home: "pesca"
  (un frammento ✦ dalla coda lunga), che è il random note ma dentro il mazzo filtrato.

---

### Lezioni trasversali

1. **Niente mappa globale.** Le critiche a Obsidian, i dati di Ghoniem et al. e le slide di Munzner concordano con
   l'Atlante: un grafo di centinaia di nodi non si legge e non si usa. Il node-link serve solo per cammini e vicinati
   piccoli (≤ 10 nodi), con layout fisso.
2. **La pagina del nodo è il cuore**: backlink alla Roam, cioè le righe ✦ alla lettera e datate dei frammenti che lo
   nominano, con le proposte ◌ in uno strato separato e più leggero. È anche la via d'ingresso che la psicologia
   preferisce: persone, eventi, luoghi sono indizi più forti del tempo (Sellen & Whittaker, pp. 75–76).
3. **Il tempo è la spina, non la porta.** Una cronologia per mesi, con i mesi chiusi riassunti in una schermata
   (Lifestreams, requisito 4) e il passato visibilmente immutabile; ma si entra soprattutto per nome.
4. **L'odore sono le sue parole.** Ogni link ha un'anteprima fatta di una riga ✦ e di un conto da `mappa.md`; nessuna
   etichetta nuda, nessun pallino senza testo (Pirolli & Card; NN/g).
5. **Panoramica come small multiples, non come disegno.** Un indice di temi e persone con sparkline sulla stessa scala;
   ogni punto scende a una frase concreta (Shneiderman, Tufte, Victor *Ladder*).
6. **Strati invece di allarmi.** La provenienza si vede con il peso tipografico (✦ pieno, ◌ ○ leggeri, ⚠ piccolo),
   non con il rosso; un interruttore unico "solo le mie" toglie lo strato dell'AI. È la risposta diretta a «troppo
   caos».
7. **Una sola riemersione, da un mazzo filtrato, mai per anniversario.** Peso, decadimento dopo la mostra, esclusione
   per costruzione dei delicati e dei rifiutati; un "non più" che vale per sempre (Meyer, Facebook, Google Photos,
   Readwise). Nessun contatore, nessuna "review quotidiana" da completare.
8. **Poca interazione.** Il sito si legge come una pagina stampata ben composta; il contesto si deduce (*Magic Ink*).
   Ogni pulsante che chiede di collegare, confermare o ordinare è una coda di validazione travestita.

### Fonti che non ho potuto leggere direttamente

- Pirolli & Card 1999 (testo pieno): usato il paper CHI 1995 e NN/g.
- Ghoniem, Fekete, Castagliola 2004/2005 (testo pieno): usati abstract via indici e le slide di Munzner e Fekete.
- Munzner, *Visualization Analysis and Design* (libro): solo le slide del corso.
- Tufte, *Envisioning Information*: solo indice dei capitoli e la pagina sulle sparkline.
- André, Teevan, Dumais 2009: pagina bloccata (403), solo il riassunto via ricerca.
- McCay-Peet & Toms 2017 (libro): solo l'abstract della tesi di McCay-Peet.
- Documentazione ufficiale di Roam e di Logseq; Nick Milo e Steph Ango sul graph view (nessuna dichiarazione diretta
  trovata); Timehop; un paper CHI su On This Day e lutto (non trovato); Business Insider sul design di On This Day
  (dominio non raggiungibile dalla sessione).

---

## 5. Diari e archivi personali come oggetti estetici e intimi

Fonti lette davvero: il paper DHQ su LdoD Visual (PDF integrale), le pagine di LdoD su archivio e codifica, l'articolo
Ca' Foscari sul Digital Zibaldone, Wikisource per Pavese, Centre Pompidou per Calle, feltron.com, dear-data.com,
giorgialupi.com, gwern.net, craigmod.com, The Creative Independent (Schwulst), robinsloan.com, maggieappleton.com,
sive.rs. Non raggiungibili (403/503/sito spento): gerhard-richter.com/atlas, diaart.org, si.edu, wittgensteinsource.org,
il Medium di Lupi. Per queste voci uso cataloghi e recensioni, e lo dico.

---

### 5.1 Diari e taccuini pubblicati

#### Lo Zibaldone di Leopardi: l'indice, le polizzine, il Digital Zibaldone
- **Che cosa è**: un diario di pensieri (1817–1832) senza ordine tematico, che Leopardi stesso, nel 1827, rende
  navigabile con un indice alfabetico autografo e con le "polizzine": foglietti con rimandi raggruppati sotto pochi titoli
  di libri mai scritti. L'edizione digitale di Silvia Stoyanova e Ben Johnston (digitalzibaldone.net, 2011–23) codifica
  ogni paragrafo in TEI con un `xml:id`, tipizza i rimandi interni (reciproci, entranti, uscenti; interlineari, a margine)
  e sovrappone la rete dei rimandi a quella delle voci d'indice. Per ogni paragrafo un riquadro mostra i rimandi di prima
  generazione e i temi dell'indice; ogni voce d'indice ha una pagina che raccoglie i paragrafi e un grafico di frequenza;
  c'è un grafo esportabile (§4.1–4.3).
- **Fonte**: Stoyanova, "Articulating Intra- and Intertextual Relationships in the Fragment Collection", Ca' Foscari 2023,
  https://edizionicafoscari.unive.it/editorial-files/journals/000017/2023/000284/ef_art_001562_01_stoyanova_12462_2023-06-05_12-56-16.html
  (il principio della «logica combinatoria», §1: ogni frammento sotto più voci; le polizzine non richiamate raccolgono
  2.533 rimandi sotto otto argomenti simili a titoli di libro, §3.2.4; circa il 20% delle voci del 1827 rimanda ad altre
  voci, §3.2.4). Manoscritti dell'indice e delle polizzine digitalizzati dalla Biblioteca Nazionale di Napoli:
  https://dl.bnnonline.it/handle/20.500.12113/35470 (segnature C.L. II, C.L. IV.1, C.L. IV.2, dal record di catalogo).
  Sito: http://digitalzibaldone.net (non aperto direttamente).
- **Perché funziona / fallisce**: funziona perché la struttura la fa l'autore *dopo*, sopra un testo che resta com'è: il
  diario non viene riordinato, gli si mette accanto un indice. È esattamente "cattura cieca, struttura derivata", con 190
  anni d'anticipo. Fallisce, nella versione digitale, dove diventa grafo: utile allo studioso, muto per chi rilegge
  (il "la mappa visiva non è stata usata" di Atlante).
- **Compatibilità con Mnemosyne**: **sì**, è il modello più vicino. Il frammento immutabile + l'indice come strato
  separato corrisponde a Detto / Letto. Le polizzine sono le "raccolte": titoli di libri possibili sotto cui un frammento
  sta senza muoversi.
- **Da prendere**: la **pagina-voce** come unità di navigazione, non il grafo. Ogni tema/raccolta ha una pagina che
  elenca i frammenti alla lettera, datati, nell'ordine in cui li ho scritti, con a margine il conto (da `mappa.md`).
  Nel frammento, un piccolo riquadro a margine "sta anche sotto: …", come le polizzine. Il grafo, se c'è, in fondo e
  facoltativo.

#### I Cahiers di Valéry: le rubriche
- **Che cosa è**: mezzo secolo di quaderni; la Pléiade di Judith Robinson (Gallimard 1973–74) li ridistribuisce per
  rubriche: *Ego, Ego scriptor, Gladiator, … Mémoire, Temps*; *Rêve, … Eros, Thêta, Bios, … Poïétique, … Homo*.
- **Fonte**: indice dei volumi nei cataloghi, https://libcat.library.tamu.edu/Record/in00000063723/Details,
  https://catalogue.bnf.fr/ark:/12148/cb34309929t. Che le rubriche vengano da Valéry stesso: (non verificato).
- **Perché funziona / fallisce**: leggibile perché tagliato per temi; ma perde la data, cioè che *Gladiator* ed *Eros*
  stavano sulla stessa pagina dello stesso mattino.
- **Compatibilità con Mnemosyne**: **in parte**: i nomi privati delle rubriche sì (regola 10); il riordino che cancella
  la data no.
- **Da prendere**: da ogni pagina-tema un frammento torna sempre **al suo giorno**, accanto agli altri di quella mattina.

#### Kafka: i quaderni come "Arbeitsbuch" (FKA)
- **Che cosa è**: l'edizione storico-critica di Reuß e Staengle (Stroemfeld dal 1995, poi Wallstein, Klostermann) dà
  ogni quaderno in facsimile con trascrizione e rifiuta la categoria "diario" della Fischer: i quaderni sono un
  "Arbeitsbuch", annotazioni e abbozzi mescolati.
- **Fonte**: https://perlentaucher.de/buch/franz-kafka/oxforder-quarthefte-1-und-2.html
- **Perché funziona / fallisce**: contro la pulizia editoriale, che separando diario e prove falsifica il quaderno;
  costosa e da studiosi.
- **Compatibilità con Mnemosyne**: **sì** sul principio: il frammento com'è, refusi compresi.
- **Da prendere**: il corpo del frammento in un carattere suo, a capo e refusi intatti; ciò che è dell'AI sta fuori dal
  blocco, mai interfoliato.

#### Wittgenstein: il Nachlass di Bergen
- **Che cosa è**: la Bergen Electronic Edition (Oxford UP 1998–2000), poi Wittgenstein Source: facsimile, trascrizione
  diplomatica e normalizzata, tre viste «interrelated, but independent» dello stesso Nachlass.
- **Fonte**: https://wab.uib.no/ojs/index.php/agora-wab/article/view/3092 (dal sommario); wittgensteinsource.org in 503:
  interfaccia attuale non verificata.
- **Perché funziona / fallisce**: nessuna vista privilegiata; per chi non è filologo, tre colonne sono rumore.
- **Compatibilità con Mnemosyne**: **in parte**: più viste sullo stesso oggetto immutabile sì, affiancate di default no.
- **Da prendere**: una vista per default (le mie parole) e un interruttore "mostra la lettura" che apre lo strato ◌
  sotto. Gli strati si aprono, non si affiancano.

#### Il mestiere di vivere (Pavese)
- **Che cosa è**: il diario 1935–1950, trovato tra le carte dopo la morte. L'ultima voce, 18 agosto 1950, chiude:
  «Non parole. Un gesto. Non scriverò piú.» (Einaudi, p. 378).
- **Fonte**: https://it.wikisource.org/wiki/Pagina:Pavese_-_Il_mestiere_di_vivere.pdf/382
- **Perché funziona / fallisce**: è il diario che la ricezione legge all'indietro dall'ultima pagina, ogni voce un
  presagio; i siti di "frasi di Pavese" lo riducono a citazioni staccate.
- **Compatibilità con Mnemosyne**: un **avvertimento**: mostra che cosa succede quando un archivio intimo si legge dal
  suo punto più doloroso, ciò che la regola "delicato" vieta.
- **Da prendere**: nessun "ultimo frammento" in evidenza come chiusa, nessuna vista "le frasi più forti" fuori contesto;
  i delicati non compaiono in nessuna vista d'insieme (home, mese, tema), solo nel loro giorno.

#### Pessoa: il baule e l'Arquivo LdoD (Portela e Rito Silva) — **da studiare bene**
- **Che cosa è**: il *Livro do Desassossego* è un libro che non esiste: circa 600 frammenti (il paper: «circa 600
  pieces») senza ordine definito, trovati tra i quasi 30.000 fogli del baule di Pessoa, ora alla Biblioteca Nacional; il
  baule stesso fu venduto all'asta nel 2008. L'Arquivo LdoD (Coimbra, online dal dicembre 2017) mette insieme facsimili,
  trascrizioni nuove e le trascrizioni delle quattro edizioni critiche (Coelho, Sobral Cunha, Zenith, Pizarro: 1982–2012),
  con questi menu: *Leitura* (leggere in sequenze diverse), *Documentos*, *Edições* (confronto delle edizioni),
  *Pesquisa*, *Virtual* (fare la propria edizione con la propria tassonomia, e un gioco di classificazione), *Escrita*
  (scrivere variazioni; in sviluppo).
  Tre cose da guardare:
  1. **Le sequenze di lettura**: ogni editore ha messo i frammenti in un ordine diverso; l'Archivio li tratta tutti come
     varianti sullo stesso piano. L'interfaccia di lettura ha «un look and feel più vicino alla tipografia a stampa
     dell'epoca» e permette di leggere «vertically within a particular sequence or horizontally across the entire
     corpus» (paper DHQ, §1, par. 21–22).
  2. **La raccomandazione del prossimo frammento**: l'interfaccia «suggests the next fragment to read, given the fragment
     being read and a set of criteria, such as, for instance, text similarity» (§1). La distanza tra frammenti è il
     coseno su quattro vettori: data (un anno per cella, 1913–1934), eteronimo, categorie, TF-IDF (§2.4.1).
  3. **LdoD Visual**: un lettore visivo «In-Out-In»: dal testo si esce a una vista globale (quadratini ordinati per
     edizione, per data, per somiglianza, per categoria o eteronimo) e si rientra in un altro frammento; frecce gialle
     passano al frammento precedente/successivo *secondo il criterio scelto* (§4.2). Gli autori distinguono due letture:
     «pleasurable assisted user-driven reading … continuous and immersive flow» e la lettura da ricercatore,
     «discontinuous and interruptive» (§5); la prima è il fine principale.
- **Fonte**: https://ldod.uc.pt/about/archive; https://ldod.uc.pt/about/encoding; Raposo, Rito Silva, Portela, "LdoD
  Visual – A Visual Reader for Fernando Pessoa's Book of Disquiet: An In-Out-In Metaphor", DHQ 15.3 (2021),
  https://dhq-static.digitalhumanities.org/pdf/000569.pdf; sul baule:
  https://impactum-journals.uc.pt/matlit/article/view/1890 e https://www.change.org/p/find-the-trunk (fonte debole).
- **Perché funziona / fallisce**: funziona perché accetta che un libro di frammenti non ha un ordine vero e fa
  dell'ordine una *scelta dichiarata* (di Coelho, di Zenith, mia): la provenienza dell'ordine è visibile. Il test
  d'usabilità nel paper (SUS, §5) è positivo ma su pochi utenti; ed è un'interfaccia ricca, con molte modalità: per un
  lettore solo, ogni sera, sono troppe. La codifica tiene perfino la probabilità delle letture incerte (0,5 / 0,5;
  https://ldod.uc.pt/about/encoding): l'incertezza è un dato, come il nostro ⚠.
- **Compatibilità con Mnemosyne**: **sì, molto**. I frammenti immutabili con molti ordini possibili sono il caso esatto.
  "Edição virtual" = una raccolta (`serve-a`). La distinzione tra testo autoriale e strato editoriale è la distinzione
  ✦ / ◌. Attenzione a due punti: la raccomandazione "prossimo frammento" non deve mai pescare un delicato; e il
  criterio deve dichiararsi ("vicino per data", "stesso tema ✦", "proposta ◌"), mai una somiglianza anonima.
- **Da prendere**: la **lettura a binari**. In fondo a ogni frammento, non un feed ma due o tre frecce dichiarate:
  "← giorno prima · giorno dopo →", "stesso tema ✦: precedente · successivo", e, separata, "◌ vicino per parole".
  Si legge in verticale (il tempo) o in orizzontale (un filo), e il filo seguito resta scritto in alto ("stai leggendo:
  *tema* zio"). Niente grafo di default: la vista globale è una striscia di quadratini per mese, cliccabile, con il
  frammento corrente acceso.

---

### 5.2 Archivi d'artista

#### Gerhard Richter, *Atlas*
- **Che cosa è**: dal 1962 foto di famiglia, ritagli, schizzi montati su tavole; le cifre cambiano (circa 4.000 immagini
  su 583 tavole a Dia nel 1995; 733 tavole nell'edizione Friedel, Walther König 2006). Non viaggia più; esiste
  *Atlas: Overview*.
- **Fonte**: gerhard-richter.com spento, diaart.org in 403; dai sommari:
  https://www.diaart.org/about/press/gerhard-richter-atlas-at-dia-center-for-the-arts, https://printcouncil.org.au/?p=1.
  Cifre non verificate sulla fonte primaria.
- **Perché funziona / fallisce**: la tavola è un'unità di misura: una griglia di nuvole dice "tema" senza una parola; il
  rischio è l'accumulo che nessuno guarda una per una.
- **Compatibilità con Mnemosyne**: **in parte**: la tavola come vista di una raccolta sì; il montaggio senza didascalia
  no, da noi ogni elemento ha segno e data.
- **Da prendere**: la **tavola**: una raccolta come griglia fissa di schede uguali, una tavola per schermata, numerata,
  ogni scheda con data e segno. Mai scroll infinito.

#### Hanne Darboven, *Kulturgeschichte 1880–1983*
- **Che cosa è**: 1.590 fogli e 19 oggetti in griglia a parete (calendari, cifre, cartoline, copertine), a Dia:Beacon.
- **Fonte**: https://mitpressbookstore.mit.edu/book/9781846380501; https://www.artforum.com/columns/hanne-darboven-2-191156/
  (dai sommari; diaart.org in 403).
- **Perché funziona / fallisce**: il tempo diventa materia visibile, la griglia è il calendario; ma la densità è
  schiacciante: davanti si sta in piedi, non si legge.
- **Compatibilità con Mnemosyne**: **in parte**: il calendario sì, la sopraffazione no (il "troppo caos" di Atlante).
- **Da prendere**: una vista anno a quadratini tutti uguali, pieno o vuoto, senza scala d'intensità; il giorno delicato
  identico agli altri.

#### Joseph Cornell: i dossier e le "esplorazioni"
- **Che cosa è**: "dossiers" per persona (diari su di lei, lettere, ritagli) e file di "explorations" lunghe anni; diari
  divisi in carte datate e un grande blocco non datato; tutto digitalizzato (Archives of American Art).
- **Fonte**: https://www.si.edu/object/archives/sova-aaa-cornjose (dal sommario; si.edu in 403).
- **Perché funziona / fallisce**: il dossier è un contenitore affettivo; la parte non datata è la più vasta, e lì
  l'archivio si perde.
- **Compatibilità con Mnemosyne**: **in parte**: per opere e temi `mondo` sì; un dossier ricco su una persona `vita`
  è proprio ciò che la privacy esclude.
- **Da prendere**: la scheda di un'opera: in alto la mia prima menzione ✦ datata, poi i frammenti, in fondo il mondo ○.
  Per una persona della vita: solo l'elenco dei giorni in cui la nomino.

#### Malraux, *Le Musée imaginaire* (1947)
- **Che cosa è**: il saggio (Skira 1947; 1951; 1965) sul museo che ognuno si fa con le riproduzioni fotografiche.
- **Fonte**: https://www.apollo-magazine.com/andre-malraux-museum-without-walls/ (testo primario non letto).
- **Perché funziona / fallisce**: la riproduzione accosta opere che non si sono mai incontrate; ma il montaggio fa
  sembrare evidente un confronto che ha deciso lui.
- **Compatibilità con Mnemosyne**: **in parte**: è la logica del ponte, con il suo rischio.
- **Da prendere**: il dittico: due frammenti affiancati, con date e luoghi, niente in mezzo; il perché ◌ sotto, chiuso.

---

### 5.3 Sophie Calle

#### *Douleur exquise* (1984–2003)
- **Che cosa è**: un conto alla rovescia di 92 giorni verso la rottura (il viaggio in Giappone), poi il racconto di quel
  dolore ripetuto ogni giorno, sempre la stessa storia, accanto ai racconti del «più grande dolore» di altre persone.
  Ogni elemento: una fotografia e un ricamo su lino; nella mostra del Pompidou 2003, 72 dittici. Il testo ricamato
  sbiadisce: l'intensità del colore «diminue au fur et à mesure que la douleur s'estompe», e il racconto si accorcia. I
  ricami portano frasi come «Il y a 5 jours..».
- **Fonte**: Centre Pompidou, https://www.centrepompidou.fr/fr/ressources/oeuvre/cdLKEda («un compte à rebours de
  quatre-vingt-douze jours»; «Polyptyque composé de 4 éléments»). Le fonti divergono tra 92 e 99 giorni:
  https://brooklynrail.org/2005/06/artseen/SophieCalle1 (92) e https://www.artforum.com/events/sophie-calle-3-203024/ (99).
- **Perché funziona / fallisce**: il dolore non viene interpretato né consolato: viene **ripetuto** finché si consuma da
  solo, e la forma (il ricamo che sbiadisce, il testo che si accorcia) misura l'attenuazione senza dirla. Funziona perché
  è lei a ripetere; nessuno le dice "è passato". Il rischio è l'esibizione, ma qui è una scelta dell'autrice.
- **Compatibilità con Mnemosyne**: **sì, sul principio "delicato"**. Il delicato non si riporta: si lascia tornare
  solo se torno io. E il passare del tempo si mostra con la forma, non con un commento.
- **Da prendere**: un frammento `delicato` non ha mai segni ◌, legami proposti o "vicini"; si mostra in tondo, nel suo
  giorno, e basta. Se ci torno sopra io, i ritorni si allineano sotto, **in ordine, con i giorni passati** ("12 giorni
  dopo"), senza parole dell'AI: la lunghezza dei miei ritorni racconta da sola come cambia. Nessun "un anno fa oggi".

#### *Prenez soin de vous* (2007)
- **Che cosa è**: una mail di rottura che finiva «Prenez soin de vous», consegnata a 107 donne che la leggono ciascuna
  col proprio mestiere; Biennale di Venezia 2007.
- **Fonte**: https://www.perrotin.com/press_release/press_release_8948_1.pdf (dal sommario).
- **Perché funziona / fallisce**: la provenienza della lettura è il contenuto; ma 107 letture si attraversano, non si
  consultano.
- **Compatibilità con Mnemosyne**: **in parte**: la lettura firmata sì, la moltiplicazione no.
- **Da prendere**: sotto il frammento una lettura sola in vista, firmata e datata ("letto da claude-opus-5-5, 3
  novembre"), le versioni precedenti dietro "versioni".

---

### 5.4 Siti personali

#### Gwern.net: i metadati epistemici
- **Che cosa è**: un sito di saggi lunghi che si aggiornano per anni; ogni pagina dichiara data dell'ultima modifica
  significativa, `status` (stato di completezza), `confidence` («how well-supported the essay is») e `importance` in
  decili 0–10; il principio del «Long Content» è fare pagine che siano «improved *by* time». Design monocromo con
  anteprime dei link a comparsa.
- **Fonte**: https://gwern.net/about (sezioni "Long Content", "Confidence tags", "Importance tags").
- **Perché funziona / fallisce**: il lettore sa sempre quanto fidarsi; ma i metadati, numerosi, diventano rumore per chi
  non è un lettore di saggi.
- **Compatibilità con Mnemosyne**: **sì**: è la nostra legenda di segni (✦ ◌ ○ ⚠) applicata alla pagina. L'importanza
  in decili no: è un voto.
- **Da prendere**: in testa a ogni pagina di lettura una riga sola: data, versione, `letto-da`. I popup per i nodi (un
  tocco su una persona `mondo` apre la sua scheda senza lasciare la pagina): sul telefono, come foglio dal basso.

#### Digital garden (Caulfield, Appleton)
- **Che cosa è**: il "giardino" contro il "flusso": note legate per temi, non per data, con stadi *seedling, budding,
  evergreen* e il principio «Gardens are imperfect by design».
- **Fonte**: https://maggieappleton.com/garden-history (sez. "Topography over Timelines", "Imperfection & Learning in
  Public").
- **Perché funziona / fallisce**: ricompensa chi torna; ma senza date disorienta, e molti giardini restano germogli.
- **Compatibilità con Mnemosyne**: **in parte**: noi teniamo separati flusso (Detto) e giardino (Letto); gli stadi
  somigliano a ◌ → ● → sbiadito, ma calcolati.
- **Da prendere**: uno sbiadito si mostra più chiaro e in fondo, mai cancellato.

#### Laurel Schwulst, "My website is a shifting house next to a river of knowledge"
- **Che cosa è**: un saggio-elenco di metafore per un sito personale: stanza, scaffale, casa, pianta, giardino,
  pozzanghera. «a room is comforting because it's finite»; «Plants can't be rushed. They grow on their own.»; «I would love
  to see a website evaporate slowly, too.»
- **Fonte**: The Creative Independent, 2018,
  https://thecreativeindependent.com/essays/laurel-schwulst-my-website-is-a-shifting-house-next-to-a-river-of-knowledge-what-could-yours-be/
- **Perché funziona / fallisce**: dà un linguaggio non tecnico a un sito come luogo; è un manifesto, non un'interfaccia.
- **Compatibilità con Mnemosyne**: **sì**: la stanza finita è "poco e forte"; l'evaporare lento è lo sbiadito.
- **Da prendere**: la home come **stanza finita**: una sola schermata, sempre uguale nella forma (l'ultima lettera, il
  giorno di oggi, l'ingresso all'archivio), mai un feed.

#### Robin Sloan, Spring '83
- **Che cosa è**: un protocollo sperimentale: ogni autore ha una sola "board" di al più 2217 byte di HTML/CSS, senza
  JavaScript; il client le mostra affiancate come in un'edicola; «every board holds its place, regardless of when it was
  last updated»; niente cronologia, niente notifiche, niente raccomandazioni.
- **Fonte**: https://www.robinsloan.com/lab/specifying-spring-83/
- **Perché funziona / fallisce**: il limite fisico di dimensione obbliga alla misura; il posto fisso toglie l'ansia del
  "nuovo in cima". Esperimento, non adottato su larga scala.
- **Compatibilità con Mnemosyne**: **sì**: è "niente solleciti, niente code" fatto protocollo.
- **Da prendere**: ogni sezione della home ha **un posto fisso** che non si sposta quando cambia; niente badge
  "nuovo", niente contatori di non letti.

#### Craig Mod, Ridgeline · Derek Sivers, /now
- **Che cosa è**: Ridgeline, newsletter numerata (001 nel 2019, 237 a ottobre 2026) archiviata per anno; /now, una
  pagina su che cosa si fa ora, «A public declaration of priorities».
- **Fonte**: https://craigmod.com/ridgeline/; https://sive.rs/nowff
- **Perché funziona / fallisce**: il numero progressivo misura il tempo con calma; /now è sovrascritta, senza storia.
- **Compatibilità con Mnemosyne**: **sì** per la numerazione; /now **in parte**: da noi lo stato è calcolato e la storia
  resta.
- **Da prendere**: lettere numerate con un indice per anno; una pagina "ora" calcolata (temi attivi, fruizioni
  `in-corso`), senza conti in evidenza.

---

### 5.5 Felton, Dear Data, Lupi

#### Feltron Annual Report (2005–2014) e il report 2010 sul padre
- **Che cosa è**: dieci rapporti annuali sulla propria vita in forma di bilancio aziendale (tipografia sobria, molte
  cifre, colori piatti). Nel 2010, dopo la morte del padre, Felton fa il rapporto della vita di lui: «After losing his
  father in 2010, Nicholas poured through his calendars, passports, slides and mementos to create a data-biography of
  his life»; 16 pagine, 10×8 pollici, quattro colori spot e oro a caldo, 3.000 copie numerate a mano. Poi Daytum (con
  Ryan Case) e Reporter (2014), un'app che più volte al giorno fa un piccolo questionario.
- **Fonte**: http://feltron.com/FAR10.html; https://www.creativereview.co.uk/the-feltron-2010-annual-report/;
  https://www.engadget.com/2014-02-06-reporter-tracks-your-life.html
- **Perché funziona / fallisce**: il 2010 funziona perché il lutto non viene detto: viene fatto con le carte del padre
  (calendari, passaporti, diapositive), e la forma fredda del report diventa pudore. Reporter, al contrario, è un
  sollecito periodico: la cattura imposta, il contrario della cattura cieca.
- **Compatibilità con Mnemosyne**: **in parte**. La forma-report con i numeri è vicina al calcolato (`contesto/`); ma un
  "rapporto annuale" con conti e grafici in evidenza scivola nella gamification. Reporter: **no** (solleciti).
- **Da prendere**: **i conti in piccolo, a margine, mai come titolo**. E per un lutto: nessuna "biografia" generata;
  se mai, solo i miei frammenti su quella persona in ordine, a mia richiesta, nel formato più spoglio del sito.

#### Dear Data (Lupi e Posavec, 2014–2015) e il manifesto "Data Humanism"
- **Che cosa è**: per un anno, ogni settimana, due designer raccolgono un tipo di dato sulla propria vita e se lo
  spediscono disegnato a mano su una cartolina: «a type of "slow data" transmission». Il manifesto di Lupi: «Let's just
  stop thinking data is perfect. It's not.»; «Dense and unconventional data visualizations promote slowness»; principi
  come «SNEAK CONTEXT IN. (ALWAYS)» e «REMEMBER THAT DATA IS IMPERFECT. (AS WE ARE)».
- **Fonte**: http://www.dear-data.com/theproject; https://www.giorgialupi.com/data-humanism-my-manifesto-for-a-new-data-wold
  (il testo su Medium ha risposto 403).
- **Perché funziona / fallisce**: la cartolina è un formato finito (una settimana, un foglio) e il disegno a mano
  mostra il gesto, quindi la provenienza. La legenda sul retro di ogni cartolina è essenziale e spesso più lunga del
  disegno: la densità chiede tempo al lettore.
- **Compatibilità con Mnemosyne**: **sì** per il formato finito e il contesto sempre presente; **no** per la
  visualizzazione densa come vista principale (Atlante: la mappa non è stata usata).
- **Da prendere**: la **lettera come cartolina**: un formato fisso, una cosa sola, con la legenda in una riga in testa
  (come già chiede il CLAUDE.md) e il "retro" (le fonti, i riferimenti ○) da girare con un tocco.

---

### Lezioni trasversali

1. **Il testo resta, l'ordine si sovrappone** (Leopardi, Kafka-FKA, LdoD): il frammento si mostra com'è e ogni ordine
   (tempo, tema, raccolta, proposta) è uno strato dichiarato sopra, con il suo nome e il suo autore. Il lettore sa sempre
   chi ha ordinato.
2. **Pagine-voce, non grafi** (Zibaldone digitale, Atlante): la navigazione utile è la pagina che raccoglie alla lettera
   i frammenti di un tema in ordine di data; il grafo è uno strumento da studioso, al più in fondo.
3. **Leggere per binari** (LdoD Visual): in fondo a ogni frammento poche frecce con il criterio scritto ("giorno dopo",
   "stesso tema ✦", "◌ vicino"); il filo seguito resta visibile. È la risposta al "troppo caos": una sola direzione per
   volta.
4. **Il dolore si mostra con la forma, non con il commento** (Calle, Felton 2010): un delicato sta nel suo giorno, senza
   segni dell'AI; i miei ritorni gli si allineano sotto con i giorni passati; niente anniversari, niente "frasi più forti"
   estratte (l'avvertimento di Pavese).
5. **Unità finite** (cartolina di Dear Data, tavola di Richter, board di Sloan, stanza di Schwulst): ogni vista sta in una
   schermata di telefono e ha un bordo; niente scroll infinito, niente feed.
6. **Posti fissi, niente novità urlate** (Spring '83, Ridgeline): le sezioni non si spostano quando cambiano; il tempo si
   misura con numeri progressivi e date, non con badge "nuovo" o contatori.
7. **L'incertezza è un dato visibile** (codifica probabilistica di LdoD, tag di Gwern, «data is imperfect» di Lupi): il ⚠
   e il ◌ si vedono sempre, in piccolo, mai nascosti e mai urlati in rosso (il "segni rossi" di Atlante).
8. **Calendario sì, intensità no** (Darboven, Feltron): la vista per anno o per mese è un calendario di quadratini tutti
   uguali; nessuna scala di colore per "quanto ho scritto", che diventerebbe un voto o un sollecito.

---

## 6. Il telefono: lettura su schermo piccolo e tipografia

Bozza. Fonti consultate il 3 novembre 2026. Dove ho letto solo un abstract o una fonte secondaria lo dico.

---

### 6.1 Che cosa dice la ricerca: schermo piccolo, schermo grande, carta

#### NN/g, "Reading Content on Mobile Devices" (Kate Moran, 2016)
- **Che cosa è**: studio di Nielsen Norman Group, 276 partecipanti, 1.629 casi; articoli "facili" (~404 parole, livello 8ª classe) e "difficili" (~988 parole, livello 12ª), letti su telefono o computer.
- **Fonte**: https://www.nngroup.com/articles/mobile-content/
- **Perché funziona / fallisce**: la comprensione è risultata pari: nessuna "practical differences"; il telefono era anzi ~3 punti sopra (IC 95% 1–5%). Ma i testi difficili si leggono più lentamente sul telefono, circa 30 ms in più per parola: i lettori rallentano per non perdere comprensione. Lo studio contraddice Singh et al. (Alberta, 2010-11), che con un cloze test su informative sulla privacy trovavano comprensione peggiore su mobile; gli autori attribuiscono la differenza alla metrica e alla difficoltà del testo. Conclusione degli autori: "the need for brevity and prioritization is still critical".
- **Compatibilità con Mnemosyne**: sì. Le forme di Mnemosyne sono già brevi (risposta ≤ 40 parole, lettera ≤ 250, ritratto ≤ 400): stanno nella fascia "facile/media" dove il telefono non perde nulla.
- **Da prendere**: il telefono basta per tutto ciò che il sistema produce; non serve una "versione ridotta" mobile. Il costo è il tempo, non la comprensione: niente che metta fretta.

#### Delgado, Vargas, Ackerman, Salmerón 2018 (meta-analisi)
- **Che cosa è**: "Don't throw away your printed books", *Educational Research Review* 25, 2018: studi 2000–2017, 38 a gruppi separati e 16 entro-soggetti, 171.055 partecipanti.
- **Fonte**: testo dell'articolo accettato, https://www.uv.es/lasalgon/papers/Delgado%202018%20dont%20throw%20away%20your%20printed%20books.pdf (abstract, p. 1; risultati, sezione "Moderators", pp. 17-18)
- **Perché funziona / fallisce**: vantaggio della carta "Hedge's g = -.21". Tre moderatori significativi: (1) il vantaggio della carta cresce con il tempo contingentato rispetto alla lettura a ritmo libero; (2) c'è per i testi informativi (g = -.27), non per i soli narrativi (g = .01); (3) cresce con l'anno di pubblicazione. Due moderatori non significativi ma rilevanti per noi: il vantaggio della carta "was significant when studies used computers (Hedges' g = -.23, p < .001), but not when they used hand-held devices (Hedges' g = -.12, p = .11)"; e lo scorrimento: g = -.25 con scrolling, -.13 (marginale) senza. Gli autori: "scrolling may add a cognitive load to the reading task by making spatial orientation to the text more difficult" (Discussione, p. 21 circa).
- **Compatibilità con Mnemosyne**: sì. I testi di Mnemosyne sono brevi, personali, a ritmo libero, quasi narrativi: la zona dove l'"inferiorità dello schermo" quasi sparisce. Il rischio residuo è l'orientamento spaziale nel testo lungo (scroll).
- **Da prendere**: niente timer, niente "letto in 2 min", niente pressione temporale. Una lettera sta in una schermata o poco più: non va spezzata ma neanche annegata in una pagina infinita. Punti fissi di orientamento (data in testa, titolo, fine visibile).

#### Clinton 2019 (meta-analisi)
- **Che cosa è**: V. Clinton, "Reading from paper compared to screens: A systematic review and meta-analysis", *Journal of Research in Reading* 42(2), 288–325; 33 studi sperimentali randomizzati 2008–2018, n = 2.799.
- **Fonte**: abstract riportato da Reading Rockets, https://www.readingrockets.org/resources/resource-library/reading-paper-compared-screens-systematic-review-and-meta-analysis ; DOI 10.1111/1467-9817.12269 (testo pieno non letto)
- **Perché funziona / fallisce**: piccolo svantaggio dello schermo (g = −.25), forse limitato ai testi espositivi: "no difference with narrative texts". Nessuna differenza nei tempi. Calibrazione migliore su carta (g = .20): sullo schermo si sopravvaluta quanto si è capito.
- **Compatibilità con Mnemosyne**: in parte. Il punto utile è la calibrazione: sullo schermo si crede di aver letto. Per frasi personali di poche righe conta poco; per un ritratto di 400 parole un po' di più.
- **Da prendere**: il ritratto e la lettera si possono rileggere con calma: un link stabile, una vista "solo testo", forse una versione stampabile (CSS `@media print`) per chi vuole la carta.

#### Singer & Alexander 2017 (rassegna sistematica)
- **Che cosa è**: "Reading on Paper and Digitally: What the Past Decades of Empirical Research Reveal", *Review of Educational Research* 87(6), 2017; 36 studi.
- **Fonte**: abstract ERIC EJ1159689, https://eric.ed.gov/?q=%22Reading+on+Paper+and+Digitally%22+Singer+Alexander (troncato); il testo pieno su SAGE dà 403, non letto.
- **Perché funziona / fallisce**: dall'abstract: "medium plays an influential role under certain text or task conditions or for certain readers". Secondo le sintesi secondarie (non verificato sul testo), il vantaggio della carta compare per testi più lunghi di una pagina, mentre i lettori preferiscono il digitale e si sopravvalutano.
- **Compatibilità con Mnemosyne**: sì, conferma il confine: sotto la pagina, il mezzo conta poco.
- **Da prendere**: tenere ogni unità di lettura sotto "una pagina" (la regola della schermata del telefono che CLAUDE.md già impone).

#### Mangen et al. 2013 e 2019
- **Che cosa è**: (a) Mangen, Walgermo, Brønnick 2013, 72 studenti norvegesi, testi di 1.400–2.000 parole, carta vs PDF su schermo: la carta vince in comprensione. (b) Mangen, Olivier, Velay 2019, 50 lettori, racconto giallo di 28 pagine su Kindle vs tascabile: risultati identici, tranne la cronologia.
- **Fonte**: (a) https://pepe.univ-paris8.fr/s/impact_num/item/6295 (scheda; testo pieno non letto) (b) https://pubmed.ncbi.nlm.nih.gov/30828309/ (abstract)
- **Perché funziona / fallisce**: dall'abstract 2019: "on measures related to chronology and temporality, those who had read in the print pocket book, performed better than those who had read on a Kindle". La spiegazione proposta è il feedback cinestetico: la carta dice dove sei nel libro, lo schermo no.
- **Compatibilità con Mnemosyne**: sì, ed è il punto più vicino a noi: un archivio è soprattutto *cronologia*. Lo schermo indebolisce il senso del "quando".
- **Da prendere**: rendere visibile il tempo in modo fisico: una data sempre in testa a ogni frase, una colonna o un filo del tempo leggero nella pagina di un nodo ("ottobre → novembre"), un indicatore discreto di posizione nell'anno. Il tempo deve essere una forma, non solo un metadato.

#### Maryanne Wolf, *Reader, Come Home* (2018)
- **Che cosa è**: saggio di neuroscienze della lettura: le abitudini digitali (scorrere, saltare, multitasking) indeboliscono i processi lenti della lettura profonda; proposta del "cervello bi-alfabetizzato" che passa da un modo all'altro secondo il compito.
- **Fonte**: libro non letto; sintesi secondarie: https://www.klingensteincenter.org/klingbrief/building-the-biliterate-brain , https://www.supersummary.com/reader-come-home/themes/ ; l'articolo di Wolf sul Guardian (2018, https://www.theguardian.com/commentisfree/2018/aug/25/skim-reading-new-normal-maryanne-wolf) non è raggiungibile da qui. Citazioni: (non verificato).
- **Perché funziona / fallisce**: è una tesi, non una misura; le meta-analisi sopra le danno un sostegno parziale (testi espositivi, tempo contingentato, cronologia).
- **Compatibilità con Mnemosyne**: sì per lo spirito: "poco e forte" è già una difesa contro la lettura a zig-zag.
- **Da prendere**: la pagina non deve invitare a scorrere: niente feed infinito, niente elenco di "altro da leggere" sotto una lettera. Una cosa, poi la fine.

#### NN/g: F-pattern e scorrimento
- **Che cosa è**: lo scorrere a "F" compare, anche su mobile, con muri di testo non formattato e lettori poco coinvolti: "The F-pattern is the default pattern when there are no strong cues to attract the eyes towards meaningful information". Nel 2018 il 57% del tempo di visione cadeva sopra la piega (misura su desktop).
- **Fonte**: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ ; https://www.nngroup.com/articles/scrolling-and-attention/
- **Perché funziona / fallisce**: il coinvolgimento spezza la F; chi legge cose sue legge ogni parola. Le ricette anti-F (grassetti, titoletti) sarebbero rumore.
- **Compatibilità con Mnemosyne**: in parte: vale solo "la cosa importante nelle prime righe", che coincide con "ogni pezzo parte da una mia frase ✦".
- **Da prendere**: la frase ✦ datata come prima cosa visibile di ogni pagina, sopra ogni navigazione.

---

### 6.2 Tipografia per il telefono

#### La misura (caratteri per riga)
- **Che cosa è**: Bringhurst, *The Elements of Typographic Style* §2.1.2: "Anything from 45 to 75 characters is widely regarded as a satisfactory length of line [...]" e "The 66-character line (counting both letters and spaces) is widely regarded as ideal." Butterick: "Aim for an average line length of 45–90 characters, including spaces", cioè "between two and three alphabets on a line".
- **Fonte**: http://webtypography.net/2.1.2 (adattamento web di Bringhurst, R. Rutter); https://practicaltypography.com/line-length.html
- **Perché funziona / fallisce**: su un telefono di 360–390 px CSS di larghezza, con 16 px di margine per lato e un corpo di 17–18 px, si stanno sui 35–42 caratteri: sotto il minimo di Bringhurst (calcolo mio, a ~0,5 em per carattere, il rapporto che webtypography.net usa per dire che 33em ≈ 66 caratteri). Sul telefono il vincolo è il contrario del desktop: la riga è corta per forza, e il rischio è una colonna troppo stretta per margini troppo larghi. Butterick: "The major flaw in many responsive web layouts? Insufficient attention to line length."
- **Compatibilità con Mnemosyne**: sì. Le frasi ✦ sono brevi: molte stanno in una o due righe anche a 38 caratteri.
- **Da prendere**: `max-width: 34em` (≈ 66 caratteri) per il testo su schermo grande; sul telefono, margini di 16–20 px e niente colonne affiancate. Misura in `em`/`ch`, non in pixel, perché segua il corpo scelto dal lettore.

#### Corpo e interlinea
- **Che cosa è**: Butterick: "For websites, I recommend body text of 15–25 pixels"; interlinea "between 120% and 145% of the point size", con `line-height` "preferably without units". iA: il telefono si tiene più vicino agli occhi, quindi il corpo può essere più piccolo che su un monitor; interlinea di riferimento ~140%; contrasto mai debole ("grey text on a light grey background").
- **Fonte**: https://practicaltypography.com/point-size.html ; https://practicaltypography.com/line-spacing.html ; https://ia.net/topics/responsive-typography-the-basics
- **Perché funziona / fallisce**: sono regole di mestiere, non esperimenti; ma convergono. Medium: corpo in Charter (https://medium.design/project-tnt-4b9b4ea97cda, scheda del redesign); i valori spesso citati, 21 px e interlinea ~1,4–1,58, li ho trovati solo in fonti non ufficiali (non verificato).
- **Compatibilità con Mnemosyne**: sì.
- **Da prendere**: corpo 18 px sul telefono, 20–21 px sopra i 900 px; `line-height: 1.45` per la prosa, 1.3 per le frasi ✦ isolate; rispettare lo zoom del sistema (unità `rem`, niente `maximum-scale`). Grigio del testo non sotto il contrasto 7:1 per la prosa.

#### Polarità: chiaro su scuro o scuro su chiaro
- **Che cosa è**: Piepenbrock, Mayr, Mund, Buchner (2013, *Ergonomics*): in compiti di acuità e correzione di bozze, giovani e anziani vanno meglio con testo scuro su fondo chiaro; un secondo studio dello stesso gruppo (2014) trova pupille più piccole e bozze migliori con polarità positiva; il vantaggio cresce quando il testo è piccolo.
- **Fonte**: scheda dello studio 2013, https://documentacion.fundacionmapfre.org/documentacion/publico/pt/bib/143702.do ; sintesi NN/g (R. Budiu, 2020) https://www.nngroup.com/articles/dark-mode/ ; limite: Mathôt & Ivanov 2019, https://peerj.com/articles/8220 (l'effetto della pupilla conta solo per stimoli piccolissimi, alla soglia dell'acuità).
- **Perché funziona / fallisce**: NN/g: "light mode won across all dimensions", ma i partecipanti non percepivano differenze; raccomanda di non imporre il buio di default e insieme "allow users to switch to dark mode", soprattutto per siti di lettura lunga. Con corpo 18 px siamo lontani dalla soglia: la differenza pratica è piccola. La lettura serale al buio è il caso in cui il fondo bianco abbaglia.
- **Compatibilità con Mnemosyne**: sì.
- **Da prendere**: chiaro di default, scuro seguendo `prefers-color-scheme`, e un interruttore manuale. In scuro: fondo non nero puro, testo non bianco puro, peso del carattere leggermente ridotto (asse `wght` di un font variabile) per compensare l'irraggiamento.

#### Movimento ridotto
- **Che cosa è**: `prefers-reduced-motion` "is used to detect if a user has enabled a setting on their device to minimize the amount of non-essential motion"; valori `no-preference` e `reduce`.
- **Fonte**: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **Perché funziona / fallisce**: è uno standard; il costo è zero.
- **Compatibilità con Mnemosyne**: sì; "niente rumore" vale anche per le animazioni.
- **Da prendere**: nessuna animazione decorativa in assoluto; le sole transizioni funzionali (un'anteprima che si apre) sotto i 150 ms e a zero con `reduce`.

#### Craig Mod, "Subcompact Publishing" (2012)
- **Che cosa è**: un manifesto per l'editoria digitale piccola: "Small issue sizes (3-7 articles / issue)", "Small file sizes", "Scroll (don't paginate)", "Clear navigation", "HTML(ish) based", "Touching the open web". "Subcompact Publishing tools are first and foremost straightforward."
- **Fonte**: https://craigmod.com/journal/subcompact_publishing/ ("Hacking the Cover" non letto)
- **Perché funziona / fallisce**: è un argomento di progetto, non una misura. Ma è la descrizione esatta di una lettera settimanale.
- **Compatibilità con Mnemosyne**: sì, quasi parola per parola ("poco e forte").
- **Da prendere**: la lettera come numero di una rivista minima: un URL suo, una pagina, scorrimento verticale, una sola navigazione chiara (precedente / successiva), file leggeri.

---

### 6.3 Navigazione mobile per contenuti lunghi e collegati

#### Niente hover sul touch
- **Che cosa è**: la media feature `hover` dice se il dispositivo principale può passare sopra gli elementi; con `none` "many mobile devices emulate hovering when the user performs an inconvenient long tap".
- **Fonte**: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
- **Perché funziona / fallisce**: le anteprime al passaggio del mouse (Wikipedia, Gwern) sul telefono non esistono; emularle con il tocco lungo è scomodo e si scontra con il menu del sistema.
- **Compatibilità con Mnemosyne**: sì, e conta molto: una frase ✦ che nomina un nodo deve far capire dove porta senza costringere a uscire.
- **Da prendere**: sul telefono, toccare un nodo apre un foglio dal basso (bottom sheet) con l'anteprima del nodo (nome, prime 2-3 frasi ✦ datate, "apri"); un secondo tocco su "apri" va alla pagina. Su desktop con `hover: hover`, la stessa anteprima al passaggio.

#### Note a margine su schermo stretto (rassegna di Gwern)
- **Che cosa è**: rassegna di decine di implementazioni di sidenote; su schermo stretto quasi tutte ricadono in "pop-in" (la nota si apre dentro il testo), in nota inline o in note finali.
- **Fonte**: https://gwern.net/sidenote (sezioni "Tufte-CSS", "Implementation Strategies", "Matthew Butterick")
- **Perché funziona / fallisce**: la raccomandazione è che le note "collapse to pop-ins" su mobile; Tufte CSS: "the margin notes are not floated, simply indented, and toggled". Le note finali costringono a saltare avanti e indietro; i pop-up flottanti coprono il testo.
- **Compatibilità con Mnemosyne**: sì. La provenienza (○ con opera e passo, ⚠, la traccia di una verifica) è materiale da nota: c'è, ma non deve stare in mezzo alla frase.
- **Da prendere**: su desktop, il luogo di un ○ (libro, capitolo) a margine; sul telefono, il segno ○ è toccabile e apre il luogo sotto la riga, chiuso di default. Mai note finali.

#### Pannelli impilati ("stacked notes", Matuschak) sul telefono
- **Che cosa è**: le note di Andy Matuschak aprono i link in pannelli affiancati verso destra. Le implementazioni pubbliche li spengono sotto una soglia: il plugin Quartz ha `mobileBreakpoint` di 800 px e `enableOnMobile` falso di default.
- **Fonte**: https://quartz.jzhao.xyz/plugins/stackedpages ; https://github.com/deathau/sliding-panes-obsidian ; il comportamento del sito di Matuschak su mobile non l'ho trovato documentato (non verificato).
- **Perché funziona / fallisce**: sul telefono un pannello è l'intero schermo: impilare diventa la normale navigazione avanti-indietro.
- **Compatibilità con Mnemosyne**: in parte. Utile su schermo grande per l'esplorazione dei nodi; sul telefono no.
- **Da prendere**: telefono = una pagina alla volta e il gesto "indietro" del sistema; desktop = pannelli impilati per le pagine dei nodi. Stessi URL in entrambi.

#### PWA, lettura offline, schermata Home
- **Che cosa è**: un sito installabile sulla schermata Home, con service worker per l'offline.
- **Fonte**: WebKit, "Full Third-Party Cookie Blocking and More" (2020), https://webkit.org/?p=10218 , e il chiarimento in https://bugs.webkit.org/show_bug.cgi?id=211775
- **Perché funziona / fallisce**: in Safari i dati scritti da script si cancellano dopo 7 giorni d'uso di Safari senza interazione con il sito; le web app sulla schermata Home "have their own counter of days of use", quindi il loro archivio locale non dovrebbe sparire. Ci sono segnalazioni contrarie (2020-2022) e non ho trovato aggiornamenti recenti.
- **Compatibilità con Mnemosyne**: in parte. L'offline è utile (lettura in metro, a letto in aereo); ma un sito privato con persone della vita in cache su un telefono va pensato per la privacy.
- **Da prendere**: installabile, con offline delle sole ultime restituzioni e delle pagine visitate; nessun dato come unica copia nel browser (la fonte resta il repository); cache cancellabile con un tasto.

#### Ricordare senza ferire ("On This Day")
- **Che cosa è**: Day One mostra ogni giorno le voci degli anni passati nella stessa data, con notifica facoltativa e un'opzione per diario "Show in On This Day" che le esclude. Il caso negativo noto: Eric Meyer e il "Year in Review" di Facebook che gli mostrò la figlia morta.
- **Fonte**: https://dayoneapp.com/guides/tips-and-tutorials/on-this-day/ ; https://meyerweb.com/eric/thoughts/2014/12/24/inadvertent-algorithmic-cruelty/
- **Perché funziona / fallisce**: Meyer chiede di non riempire in anticipo e di "ask them if they'd like to try a preview".
- **Compatibilità con Mnemosyne**: in parte. Il ritorno quotidiano è proprio l'uso da telefono; ma i delicati non si riportano mai spontaneamente, e niente notifiche che sollecitano.
- **Da prendere**: una pagina "Oggi" che si apre se la si apre, non una notifica: una frase ✦ datata, scelta tra i non delicati (lo decide lo script, non il front-end), e niente altro.

---

### 6.4 Il telefono sarà davvero il dispositivo principale di lettura?

#### I dati generali
- **Che cosa è**: (a) Pew, agosto 2026: l'88% degli adulti USA riceve notizie da dispositivi digitali (smartphone, computer, tablet) almeno talvolta, il 59% spesso; la scheda non separa il telefono. Pew 2017 (fonte secondaria): 57% spesso da mobile contro 30% da computer. (b) Digital News Report, Spagna: smartphone primo dispositivo per le notizie (79% settimanale), ma il computer, sceso al 36% nel 2022, risale al 54-58% dal 2024: i due si affiancano.
- **Fonte**: https://www.pewresearch.org/journalism/fact-sheet/news-platform-fact-sheet/ ; https://en.unav.edu/web/digital-news-report/entradas/-/blogs/el-smartphone-primera-pantalla-informativa-dispositivos-y-consumo-de-noticias-en-espana-2017-2026- ; il dato aggregato Reuters 2025 "smartphone come dispositivo principale" non l'ho trovato (non verificato).
- **Perché funziona / fallisce**: sono notizie, non lettura riflessiva; ma dicono che il telefono è il primo schermo e che il computer non sparisce.

#### Diario e ripasso: Day One, Readwise, Obsidian
- **Che cosa è**: Day One ha portato "On This Day" sul web solo il 9 settembre 2025 ("now accessible from any browser"): per anni il ritorno quotidiano è vissuto sulle app (telefono e Mac). Readwise lega il ripasso quotidiano all'app e a un'email giornaliera di 3-5 frasi. Obsidian: nessun dato pubblico mobile/desktop; il sondaggio "State of Obsidian" non è ancora uscito.
- **Fonte**: https://dayoneapp.com/releases/on-this-day-now-available-on-web/ ; https://apps.apple.com/us/app/-/id1476885528 e https://entreresource.com/readwise/ (secondaria); https://obsidian.md/es/blog/2026-obsidian-october/
- **Perché funziona / fallisce**: indizi, non misure: chi progetta il ritorno breve lo progetta per il telefono o la casella di posta; chi progetta il lavoro sul grafo (Obsidian) parte dal desktop.

#### La sera, a letto
- **Che cosa è**: AASM 2023, 2.005 adulti USA: l'87% dorme con il telefono in camera (91-92% tra 25 e 44 anni). Un'indagine Philips 2020 (fonte secondaria) dà il 39% che usa il telefono subito prima di dormire. Chang et al. 2015 (PNAS, 12 adulti): leggere su iPad prima di dormire, rispetto a un libro, ritarda il sonno e riduce la melatonina.
- **Fonte**: https://aasm.org/wp-content/uploads/2023/11/sleep-prioritization-survey-2023-phones-in-the-bedroom.pdf ; https://sleepreviewmag.com/curated/we-spend-nearly-an-hour-on-tech-in-bed-before-we-sleep/ (secondaria, non verificato); https://pmc.ncbi.nlm.nih.gov/articles/PMC4313797
- **Compatibilità con Mnemosyne**: sì: la lettera della domenica sera, letta a letto, è uno scenario realistico; la modalità scura e un fondo caldo servono a quello.

#### Valutazione
Le prove indicano una divisione per compito più che per persona. (1) Il ritorno breve e quotidiano (la risposta a un memo, "Oggi", la lettera) è già un'attività da telefono: lì nasce la cattura, lì arrivano le notifiche, lì i prodotti di "ripasso" la mettono; e per testi sotto la pagina, a ritmo libero e personali, il telefono non costa comprensione (NN/g 2016; Delgado 2018: nessun effetto significativo sui palmari e nessuno sul narrativo). (2) L'esplorazione (seguire legami tra nodi, confrontare due periodi, leggere un ritratto con calma) è il caso dove contano orientamento e cronologia, e dove lo schermo piccolo e lo scorrimento pesano (Delgado: scroll; Mangen 2019: cronologia; Clinton: calibrazione). L'Atlante ne è la prova inversa: la mappa visiva, roba da schermo grande, "non è stata usata". Ne segue: progettare per il telefono come caso principale e completo, e dare allo schermo grande più spazio, non più funzioni. Limite: nessun dato diretto su archivi personali riflessivi; è un'inferenza da indizi.

---

### Lezioni per il sito

1. **Telefono prima, e completo.** Ogni pagina funziona intera a 360 px; lo schermo grande aggiunge margini e pannelli, mai contenuti che il telefono non ha.
2. **Corpo 18 px sul telefono, 20–21 px sopra i 900 px**; unità `rem`, zoom del sistema rispettato, niente `maximum-scale`.
3. **Interlinea 1,45** per la prosa (lettere, ritratti), **1,3** per le frasi ✦ isolate; spazio tra le voci di un elenco pari a una riga.
4. **Misura**: `max-width: 34em` (≈ 66 caratteri) su schermo grande; sul telefono margini di 16–20 px, una sola colonna (≈ 38–42 caratteri).
5. **Un vero corsivo** caricato in locale, mai sintetico: è il segno della voce dell'utente, quindi deve leggersi bene a 18 px e al buio; i segni ✦ ✧ ● ◌ ○ ⚠ dello stesso carattere o di un font di simboli verificato su iOS e Android.
6. **Chiaro di default, scuro da `prefers-color-scheme` più interruttore**; in scuro fondo grigio-nero caldo, testo non bianco puro, peso un poco ridotto.
7. **Il tempo come forma**: data sempre in testa a ogni frase e a ogni pagina; nella pagina di un nodo, le frasi in ordine con un filo cronologico visibile (mesi come intestazioni leggere). È la risposta allo svantaggio di cronologia dello schermo (Mangen 2019).
8. **Una cosa per pagina, poi la fine.** La lettera ha il suo URL, si chiude con la sua ultima riga e con "precedente / successiva": niente feed, niente "altro da leggere", niente contatori di non letti, niente tempo di lettura stimato.
9. **Anteprime senza hover**: sul telefono un tocco su un nodo apre un foglio dal basso con nome e 2–3 frasi ✦ datate; su desktop la stessa anteprima al passaggio. La provenienza di un ○ (opera e passo) si apre sotto la riga, chiusa di default; mai note finali.
10. **Pannelli impilati solo sopra ~900 px**, per esplorare i nodi; sotto, navigazione normale con il gesto indietro. Stessi URL.
11. **Navigazione minima**: al più tre voci in basso (Oggi, Lettere, Cerca), nascoste durante la lettura, senza badge (pattern di mestiere, nessuna ricerca letta: non verificato).
12. **Installabile e leggero**: PWA con offline delle sole pagine recenti, cache cancellabile, font con `font-display` che mostra subito il testo, nessuna animazione decorativa e zero movimento con `prefers-reduced-motion: reduce`. "Oggi" si apre quando lo si apre: nessuna notifica di ricordi, e i delicati esclusi a monte dallo script.

### Fonti che non ho potuto leggere
- Singer & Alexander 2017, testo pieno (SAGE 403; letto solo l'abstract ERIC troncato).
- Clinton 2019 e Mangen 2013, testo pieno (solo abstract e schede).
- Wolf, *Reader, Come Home* e l'articolo sul Guardian (non raggiungibile): solo sintesi secondarie.
- Craig Mod, "Hacking the Cover"; Robin Rendle (solo un commento); specifiche tipografiche ufficiali di Medium.
- Reuters Digital News Report 2025, dato aggregato sul dispositivo principale; dati di uso di Obsidian mobile/desktop (non pubblicati).

---

## 7. L'abbandono: perché questi strumenti si lasciano, e che cosa li fa rileggere

Letteratura HCI su personal informatics, lifelogging, note e ricordi digitali; poi due saggi. I PDF letti per intero
sono indicati come tali; dove ho visto solo l'abstract lo dico.

---

### 7.1 Personal informatics: l'abbandono è la norma, non il guasto

#### Modello a stadi (Li, Dey, Forlizzi, CHI 2010)
- **Che cosa è**: il primo modello dei sistemi di personal informatics, con cinque stadi: preparazione, raccolta,
  integrazione, riflessione, azione. Si basa su un sondaggio con 68 persone (recluse da Quantified Self e simili) e su 11
  interviste.
- **Fonte**: Li, Dey, Forlizzi, "A Stage-Based Model of Personal Informatics Systems", CHI 2010 —
  http://www.ianli.com/publications/2010-ianli-chi-stage-based-model.pdf (letto per intero).
- **Perché funziona / fallisce**: la tesi centrale è che le barriere *si propagano a cascata*: «barriers cascade, i.e.,
  problems in earlier stages affect the later stages» (sezione "Barriers Cascade"). Una raccolta lacunosa rende la
  riflessione impossibile: «my lack of regular collection has made this difficult» (P44, stessa sezione). Le barriere
  della raccolta: dimenticarsi di registrare (12/68), mancanza di tempo (11/68), motivazione (5/68): «Sometimes life isnʼt
  interesting enough to make me want to write it down» (P54, Tabella 2). Le barriere della riflessione: mancanza di
  tempo (10/68), visualizzazione (6/68), autocritica (5/68), interpretazione (5/68), dati sparsi (3/68). Una frase della
  Tabella 4 riguarda proprio i diari: «Itʼs extremely difficult (psychologically) to look back on my earliest journals.
  Much of that information is very emotional and innocent.» (P12). Il modello distingue la riflessione a breve termine
  (subito dopo aver registrato) da quella a lungo termine, che «reveals trends and patterns» (sezione "Reflection Stage").
- **Compatibilità con Mnemosyne**: sì. Mnemosyne ha già tolto la barriera più forte, quella della raccolta (la cattura è
  cieca e il resto è derivato). Il rischio si sposta tutto sulla riflessione: il tempo, l'autocritica e il dolore di
  rileggersi (P12).
- **Da prendere**: il sito non deve chiedere tempo. Una sola pagina d'ingresso che si legge in un minuto, e
  l'archivio intero dietro, mai davanti.

#### Il modello della "lived informatics" (Epstein, Ping, Fogarty, Munson, UbiComp 2015)
- **Che cosa è**: un modello alternativo, nato da sondaggi su 105 persone che tracciavano l'attività fisica, 99 le
  finanze e 83 la posizione, più 22 interviste. Al posto della linea del cambiamento di comportamento descrive la vita
  reale dello strumento: decidere di tracciare, scegliere lo strumento, poi raccolta, integrazione e riflessione
  intrecciate, e infine la **ricaduta (lapsing)** e l'eventuale **ripresa**.
- **Fonte**: DOI 10.1145/2750858.2804250; abstract e scheda: https://library.selfresearch.org/?p=1243 (ho letto solo
  l'abstract; il modello è riassunto anche nel paper del 2016 qui sotto).
- **Perché funziona / fallisce**: le persone smettono e riprendono; la pausa fa parte dell'uso. Il paper del 2016
  riassume: «Epstein et al. refer to this idea that people stop actively tracking as lapsing», e alcuni tornano
  «either by resuming use of the same tool or selecting a new tool» (Introduzione).
- **Compatibilità con Mnemosyne**: sì, ed è già la sua regola: niente solleciti, niente arretrati.
- **Da prendere**: un ritorno dopo settimane non deve mostrare nessun "ti sei perso": la stessa pagina di sempre, con la
  riga del "mentre eri via".

#### "Beyond Abandonment to Next Steps" (Epstein et al., CHI 2016)
- **Che cosa è**: un sondaggio su che cosa succede dopo aver smesso: 193 persone (attività fisica, finanze, posizione),
  12 interviste.
- **Fonte**: https://pmc.ncbi.nlm.nih.gov/articles/PMC5428074 (letto tramite un riassunto del testo completo).
- **Perché funziona / fallisce**: la colpa esiste, ma riguarda una minoranza e dipende dal dominio. Nella Tabella 1,
  chi ha smesso per il costo del tracciamento e ne ha provato colpa: il 16,2% per l'attività fisica, l'8,9% per le
  finanze, lo 0% per la posizione. Alcuni descrivono il sollievo di essere "free". Gli autori chiedono di sostenere
  il ritorno con programmi di ripresa, invece che con notifiche che ricordano di aver smesso, e di accettare
  l'abbandono felice.
- **Compatibilità con Mnemosyne**: sì. La colpa nasce dove lo strumento promette un cambiamento (dimagrire,
  risparmiare). Mnemosyne non promette niente: è uno specchio, e quindi il terreno della colpa è più piccolo.
- **Da prendere**: nessun contatore di continuità, nessuna striscia di giorni consecutivi, nessun "ultimo memo 23 giorni
  fa" in vista.

#### "Reconsidering the Device in the Drawer" (Epstein, Kang, Pina, Fogarty, Munson, UbiComp 2016)
- **Che cosa è**: 141 persone che avevano smesso di usare il Fitbit guardano sette rappresentazioni dei propri vecchi
  dati e sette modi di presentarli.
- **Fonte**: https://homes.cs.washington.edu/~jfogarty/publications/ubicomp2016.pdf (letto per intero).
- **Perché funziona / fallisce**: i dati vecchi interessano ancora, ma dipende da quanti ce ne sono. Chi aveva usato il
  dispositivo poco preferiva viste aggregate; chi l'aveva usato a lungo preferiva «timelines and histograms of their
  use, aggregated by month or year» (Introduzione, elenco dei risultati). Gli inviti a tornare piacevano a chi provava
  colpa, ma chi considerava il tracciamento inutile li trovava «presumptive and inconsistent with their experiences»
  (ibid.). Dalla letteratura precedente: il Fish'n'Steps mostrava un pesce triste per i pochi passi, e questo
  «discouraged inactive participants from looking at their data» (sezione "Framing in Self-Tracking"). Il concetto di
  «happy abandonment» è di Clawson et al. (ibid.).
- **Compatibilità con Mnemosyne**: in parte. La lezione sulla densità dei dati vale. Le cornici persuasive no:
  Mnemosyne non vuole persuadere.
- **Da prendere**: la vista dell'archivio cambia con la quantità. Con pochi frammenti, una pagina sola; con mesi di
  materiale, una linea del tempo per mese (i "periodi" di `parole.md` sono già questa forma). Mai un segno che giudica
  la scarsità (il pesce triste, il giardino vuoto).

#### "No longer wearing" (Clawson, Pater, Miller, Mynatt, Mamykina, UbiComp 2015)
- **Che cosa è**: un'analisi di circa 1.600 annunci Craigslist, in un mese e in tutti gli Stati Uniti, di chi rivendeva
  il proprio dispositivo di tracciamento della salute, per leggere nelle descrizioni le ragioni dell'abbandono.
- **Fonte**: https://ecl.cc.gatech.edu/node/242 (pagina non raggiungibile durante la ricerca; ho visto solo l'abstract
  tramite schede secondarie. Le ragioni nel dettaglio sono **non verificate**.) La nozione di «happy abandonment» è
  attribuita a questo paper da Epstein et al. 2016 (sopra).
- **Perché funziona / fallisce**: si abbandona anche perché lo scopo è stato raggiunto. L'abbandono non è sempre un
  fallimento del prodotto.
- **Compatibilità con Mnemosyne**: sì, come cornice mentale: se l'utente smette per un mese, il sistema non ha fallito.
- **Da prendere**: niente nel sito deve misurare il successo con la frequenza d'uso.

#### "Why we use and abandon smart devices" (Lazar, Koehler, Tanenbaum, Nguyen, UbiComp 2015)
- **Che cosa è**: 17 persone scelgono e comprano liberamente dispositivi per un proprio obiettivo; vengono intervistate
  dopo circa due mesi. In tutto 49 dispositivi.
- **Fonte**: https://thatlab.umd.edu/papers/2015_p635-lazar.pdf (letto per intero).
- **Perché funziona / fallisce**: «Participants abandoned almost 80% of devices purchased for this study within the
  first two months» (sezione "Why Did Participants Stop Using Devices?"). Tre ragioni: il dispositivo non corrisponde
  all'idea di sé (se lo immaginano utile per altri tipi di persone), i dati non sono utili, la manutenzione diventa
  ingestibile. Si continua a usarlo per abitudine, utilità, curiosità e speranza. Gli autori si chiedono se l'uso
  continuo a lungo termine sia l'ideale giusto per tutti (abstract).
- **Compatibilità con Mnemosyne**: sì. Il punto "idea di sé" è il più delicato: un sito che ti restituisce un'immagine
  in cui non ti riconosci (un'etichetta, una diagnosi) si abbandona. È la ragione delle regole "mai un'etichetta come
  destino" e "nessuna diagnosi".
- **Da prendere**: zero manutenzione per l'utente. Nessuna coda da validare, nessun tag da sistemare. È già la regola
  della cattura cieca; il sito non deve reintrodurla con pulsanti come "conferma", "ordina" o "archivia".

---

### 7.2 Rilettura e riflessione: che cosa fa tornare

#### "Beyond Total Capture" e le cinque R (Sellen & Whittaker, CACM 2010)
- **Che cosa è**: la critica costruttiva del lifelogging. Il valore di un archivio sta in cinque attività:
  «recollecting, reminiscing, retrieving, reflecting, and remembering intentions».
- **Fonte**: Communications of the ACM 53(5), 2010; DOI 10.1145/1735223.1735243; PDF:
  https://scispace.com/pdf/beyond-total-capture-a-constructive-critique-of-lifelogging-1sclhy1ev1.pdf (letto per intero).
- **Perché funziona / fallisce**: tre evidenze. (1) Con SenseCam la capacità delle immagini di far ricordare
  «rapidly decreased after only three months». (2) Citando Petrelli & Whittaker 2010, «digital archives are rarely
  accessed», e tra gli oggetti di valore mnemonico scelti in casa da persone con grandi collezioni digitali «less than 2%
  of the objects they reported were digital». (3) Chi ha migliaia di foto digitali «never access the majority of them»
  (tutte nella sezione sulle evidenze). Le raccomandazioni: «Selectivity, not total capture» e «Cues not capture»: i
  dati sono indizi che fanno affiorare un ricordo, non il ricordo stesso; «people may sometimes want to forget»
  (sezione conclusiva). Il "reflecting" è definito così: «the value is not in reliving past events (as in recollecting)
  but in seeing things anew and framing the past differently» (sezione "Reflecting").
- **Compatibilità con Mnemosyne**: sì, è quasi la sua carta fondativa: poco e forte, la frase come indizio, il diritto
  di dimenticare (il delicato).
- **Da prendere**: il sito separa le cinque R in cinque gesti. *Retrieving*: la ricerca. *Reminiscing*: il ricordo
  che riemerge. *Reflecting*: la lettera e il ritratto. *Remembering intentions*: le fruizioni `da-fare`. *Recollecting*:
  la pagina del giorno. Non un'unica mappa che fa tutto.

#### Ricordi di famiglia: fisico contro digitale (Petrelli & Whittaker, PUC 2010)
- **Che cosa è**: un'etnografia in 13 famiglie (17 persone): un giro della casa tra gli oggetti-ricordo, poi
  un'intervista sui ricordi digitali.
- **Fonte**: https://shura.shu.ac.uk/2907/1/PUC-journal-digitalVSphysical.pdf (letto in parte).
- **Perché funziona / fallisce**: «digital mementos were initially perceived as less valuable [...] and infrequently
  accessed» (Abstract). Nel giro della casa fu nominato spontaneamente un solo oggetto digitale («As only one digital
  object was spontaneously mentioned in the memory tour», §3.2). Le foto erano solo il 16% degli oggetti scelti; i
  ricordi fisici stanno *in vista*, nella vita quotidiana. Le linee guida chiedono di integrare il digitale
  «into everyday life».
- **Compatibilità con Mnemosyne**: sì: le restituzioni sono già il modo di "esporre" un frammento, uno alla volta.
- **Da prendere**: un oggetto esposto, non un archivio da aprire: una sola frase ✦ in testa alla pagina, che cambia
  piano e senza clic.

#### Photobox e la tecnologia lenta (Odom et al., CHI 2014; Hallnäs & Redström 2001)
- **Che cosa è**: un baule di quercia che stampa quattro o cinque foto a caso dall'archivio Flickr, a intervalli casuali,
  ogni mese. È stato provato in tre case per quattordici mesi. Alle spalle c'è la *slow technology*: «a design agenda
  for technology aimed at reflection and moments of mental rest rather than efficiency in performance».
- **Fonte**: https://www.dourish.com/classes/infx161f14/readings/Odom-DesigningForSlowness-CHI2014.pdf (letto per
  intero, Best Paper); Hallnäs & Redström, *Personal and Ubiquitous Computing* 5(3), 2001, DOI 10.1007/PL00000019
  (letto solo l'abstract, tramite schede).
- **Perché funziona / fallisce**: si passa dalla frustrazione all'accettazione. Nelle prime 4-8 settimane le famiglie
  controllavano il baule ogni giorno; tra il terzo e il sesto mese restava la tensione per la lentezza. Poi la lentezza
  diventa il valore: un partecipante dice che con gli album fotografici «I have to make time and get absorbed in them.
  [...] But, realistically I don't do it much», mentre il baule dava «that same sort of feeling but without having to
  prepare to get too deep» (sezione "Anticipating re-encounters with the archive"). La casualità costruiva l'attesa:
  «It could've printed anything from seven years ago to last month» (ibid.). Il riaffiorare riporta all'archivio: «It
  has certainly reinvigorated my [Flickr] account». Il rovescio: a volte uscivano ricordi da dimenticare (oggetti
  rubati, ex partner), e due partecipanti hanno buttato la stampa e cancellato le foto (ibid.).
- **Compatibilità con Mnemosyne**: sì, con un limite netto. Il caso puro viola la regola del delicato: un ex o un lutto
  possono uscire. Il caso va filtrato (fuori i delicati, fuori le persone `vita` in contesti dolorosi).
- **Da prendere**: un solo ricordo alla volta, con un ritmo lento e non controllabile, preso dai "ricordabili" di
  `mappa.md` e mai dai delicati. Nessun pulsante "un altro".

#### Visual mementos (Thudt, Baur, Huron, Carpendale, IEEE TVCG 2016)
- **Che cosa è**: le visualizzazioni di dati personali fatte per ricordare e condividere, non per analizzare.
- **Fonte**: IEEE TVCG 22(1), 369-378; scheda: https://dblp1.uni-trier.de/rec/journals/tvcg/ThudtBHC16.html
  (letto solo l'abstract).
- **Perché funziona / fallisce**: tre sfide indicate dagli autori: «mapping data to evoke familiarity, expressing
  subjectivity, and obscuring sensitive details for sharing» (abstract). Il risultato della sonda tecnologica è che
  queste visualizzazioni sostengono il ricordo (abstract).
- **Compatibilità con Mnemosyne**: in parte. La mappa dell'Atlante non è stata usata; se si visualizza qualcosa, deve
  essere familiare (luoghi, mesi, parole sue), non un grafo astratto.
- **Da prendere**: se c'è un'immagine, che sia una linea dei mesi con una parola ✦ per mese, non una rete di nodi.

#### Pensieve: ricordi via email (Cosley et al., 2009; Peesapati et al., CHI 2010)
- **Che cosa è**: un servizio che manda per email, in momenti inattesi, dei "trigger" di ricordo: foto proprie da
  Picasa o Flickr, oppure domande generiche. Si può rispondere all'email, e la risposta entra in un diario.
- **Fonte**: Cosley et al., "Experiences with a publicly deployed tool for reminiscing",
  https://ceur-ws.org/Vol-499/paper07-Cosley.pdf (letto per intero); CHI 2010, DOI 10.1145/1753326.1753635 (non letto;
  i 91 utenti in cinque mesi citati da una scheda sono **non verificati**).
- **Perché funziona / fallisce**: in 4 mesi, 72 utenti, oltre 8.000 trigger e 654 risposte. Solo 9 utenti su 72 hanno
  spento il servizio. Il 61% (396/654) delle risposte arriva entro 24 ore, con un picco nella prima ora. Il 38% delle
  voci arriva entro un'ora da un'altra voce, quindi i ricordi vanno "a catena". Le proprie foto ottengono più risposte
  delle domande di testo (11% contro 8,3%, p<0,05), ma più brevi (circa 35 parole contro 47). Il 51% delle voci del
  diario nasce rispondendo all'email (333/654): «Minimizing effort [...] was a major reason the diary worked». Sui
  trigger negativi: «Why would you want to elicit bad memories?? My triggers have been very negative lately, and it
  makes me hate getting those emails.»; gli autori concludono che «avoiding negative prompts may be a good design
  decision».
- **Compatibilità con Mnemosyne**: in parte. Il ricordo che arriva da fuori funziona, e anche la risposta sullo stesso
  canale. Però il tasso di risposta è basso (circa il 9%): la maggior parte dei trigger cade nel vuoto, e va bene così.
  Il canale email/notifica rischia di diventare un sollecito.
- **Da prendere**: il ricordo vive sul sito, e la notifica dice soltanto che c'è (5-7 parole, mai il contenuto). Dal
  ricordo si deve poter rispondere con un tocco ("aggiungo"), e la risposta diventa un frammento nuovo con un
  `ritorna-su`. È il punto più forte di Pensieve: catturare nel momento in cui il ricordo è vivo.

#### Echo e la riflessione mediata dalla tecnologia (Isaacs et al., CHI 2013; Konrad et al., TOCHI 2016)
- **Che cosa è**: un'app per Android per registrare eventi quotidiani, con un voto di felicità, e per riceverli indietro
  dopo un giorno, una settimana o un mese, con la possibilità di riflettere sopra.
- **Fonte**: https://typeset.io/pdf/echoes-from-the-past-how-technology-mediated-reflection-162o2eqjut.pdf (letto per
  intero); Konrad, Isaacs, Whittaker, TOCHI 23(4), 2016 (solo l'abstract, tramite schede).
- **Perché funziona / fallisce**: tre prove con 44 utenti e oltre 12.000 registrazioni e riflessioni. Il benessere
  migliora (effetto pre/post significativo, V=.31, p=.03, ηp²=.31), ma **sia** in chi rilegge **sia** in chi registra
  soltanto: la differenza tra i due gruppi non è significativa (p=.48). I meccanismi però sono diversi: chi registra
  e basta gusta il positivo e scarica il negativo; chi rilegge «benefitted by generalizing from positive experiences
  and by drawing positive lessons from negative events» e vede abitudini ricorrenti (Discussione). Otto mesi dopo, 6
  partecipanti usavano ancora l'app. Nel caso lungo (una delle autrici, quasi 4 anni, 5.324 registrazioni e 4.093
  riflessioni) gli eventi molto negativi, riletti, migliorano più di quelli moderati (fading affect bias, d=.91). C'è
  un rovescio: «being reminded of eating habits and body issues negatively affected well-being after one month».
- **Compatibilità con Mnemosyne**: sì: il valore sta anche nella sola cattura; la rilettura aggiunge pattern e
  lezioni. Il voto di felicità invece no (niente voti).
- **Da prendere**: i ritorni a intervalli fissi (un giorno, una settimana, un mese, un anno) sono una regola semplice e
  comprensibile, ma solo per i frammenti non delicati, e mai su corpo e abitudini.

#### La riscoperta sottovalutata (Zhang, Kim, Brooks, Gino, Norton, Psychological Science 2014)
- **Che cosa è**: quattro studi. Le persone sottostimano quanto le interesserà, in futuro, ritrovare annotazioni banali
  del presente.
- **Fonte**: DOI 10.1177/0956797614542274; abstract: https://pesquisa.bvsalud.org/fiocruz/resource/pt/mdl-25172482
  (letto solo l'abstract).
- **Perché funziona / fallisce**: chi sottostima la riscoperta rinuncia a documentare, ma poi preferisce rivedere quei
  momenti piuttosto che fare un'attività piacevole alternativa. La sottostima è legata alla fiducia sbagliata nella
  propria memoria degli eventi quotidiani (abstract).
- **Compatibilità con Mnemosyne**: sì: giustifica la cattura cieca e la "coda lunga" delle frasi vecchie.
- **Da prendere**: tra le frasi riproposte ce ne sia sempre una ordinaria e vecchia, non solo le "importanti".

#### Ritorni all'anniversario: Facebook "On This Day" / Memories, Day One
- **Che cosa è**: il ritorno automatico del contenuto di "un anno fa oggi".
- **Fonte**: blog di ricerca di Facebook, 2017:
  https://research.facebook.com/blog/2017/09/facebook-memories-the-research-behind-the-products-that-connect-you-with-your-past/ ;
  filtri per persone e date, ottobre 2015: https://techcrunch.com/2015/10/13/facebook-now-helps-you-get-rid-of-memories
- **Perché funziona / fallisce**: le persone vogliono «reminders of fun, interesting, and important life moments» e non
  i post su violenza, incidenti e imprese fallite. Resta il problema dei ricordi positivi diventati negativi, chiamati
  «contamination sequences», che a volte passano i filtri. Sul controllo: «people said we would be crossing a boundary
  if we didn't provide them with control» (sezione "Respecting the boundary lines"). I filtri del 2015 (persone e date)
  sono manuali. Per Day One "On This Day" e per Timehop **non ho trovato studi accademici**.
- **Compatibilità con Mnemosyne**: in parte. La data dell'anniversario è un aggancio debole e pericoloso: in Mnemosyne
  il delicato è già marcato e il ritorno può essere scelto per affinità, non per calendario.
- **Da prendere**: nessun "un anno fa oggi" automatico. Il ricordo si sceglie tra i "ricordabili", che escludono i
  delicati; serve una via per dire "questo no", che diventa un `rifiuta` e uno scarto.

---

### 7.3 Ricordi dolorosi che riemergono

#### "Inadvertent Algorithmic Cruelty" (Eric Meyer, 2014)
- **Che cosa è**: il saggio scritto dopo che il "Year in Review" di Facebook gli aveva proposto, tra coriandoli e
  festeggianti, la foto della figlia morta quell'anno.
- **Fonte**: https://meyerweb.com/eric/thoughts/2014/12/24/inadvertent-algorithmic-cruelty/ (letto).
- **Perché funziona / fallisce**: «This inadvertent algorithmic cruelty is the result of code that works in the
  overwhelming majority of cases» (§6). Le proposte: «don't pre-fill a picture until you're sure the user actually
  wants to see pictures from their year» e chiedere prima «just a simple yes or no» (§12); considerare «the failure
  modes, the edge cases, the worst-case scenarios» (§14).
- **Compatibilità con Mnemosyne**: sì: la regola del delicato è la risposta diretta.
- **Da prendere**: nessuna anteprima preriempita di contenuti personali nelle pagine automatiche (ricordo, anniversari,
  anteprime dei link condivisi). La riga di notifica non contiene mai il contenuto: è già una regola.

#### Tecnologia e lutto (Massimi & Baecker, CHI 2010 e 2011; Brubaker, Hayes, Dourish 2013)
- **Che cosa è**: Massimi e Baecker hanno studiato con sondaggi e interviste come le persone in lutto usano dispositivi e
  archivi del defunto (CHI 2010) e hanno proposto un design "tanatosensibile", che integra la morte nel progetto invece
  di trattarla come un caso limite (CHI 2009, con Charise). Brubaker studia Facebook come luogo del lutto.
- **Fonte**: Massimi & Baecker, "A death in the family", CHI 2010, pp. 1821-1830 (solo la scheda:
  https://bibtex.github.io/CHI-2010-MassimiB.html; il contenuto è **non verificato**); "Dealing with death in design",
  CHI 2011: https://www.microsoft.com/en-us/research/?p=163714 (solo la scheda); Brubaker, Hayes, Dourish,
  *The Information Society* 29(3), 2013: https://cmci.colorado.edu/idlab/assets/bibliography/pdf/Brubaker2013.pdf
  (letto in parte).
- **Perché funziona / fallisce**: Brubaker descrive gli «unexpected encounters» con la morte, tra cui i casi in cui
  «automated parts of the Facebook system presented users with content regarding their dead friends» (sezione
  "Unexpected Encounters"), e una «temporal slippage»: si scrive per un compleanno suggerito dal sistema e si scopre
  che l'amico è morto da settimane (Discussione). Per evitarli serve un'azione esplicita: una partecipante toglie
  l'amica morta dagli amici (ibid.).
- **Compatibilità con Mnemosyne**: sì. Il rischio dell'incontro inatteso nasce dai sistemi automatici, cioè proprio da
  pagine come "ricordo" o "persone".
- **Da prendere**: la scheda di una persona non mostra mai per prima cosa l'ultima frase su di lei se quella frase è
  delicata. Un lutto si apre solo se lo cerca lui.

#### Disfarsi dei ricordi digitali dopo una rottura (Sas & Whittaker, CHI 2013)
- **Che cosa è**: 24 interviste su che cosa si fa dei propri beni digitali dopo una rottura sentimentale.
- **Fonte**: https://eprints.lancs.ac.uk/id/eprint/60831/4/Design_for_Forgetting_final.pdf (letto in parte).
- **Perché funziona / fallisce**: tre strategie: 12 cancellano tutto, 8 tengono tutto, 4 tengono solo pochi oggetti
  cari (sezione "Strategies for Disposing of Possessions"). Chi cancella tutto a volte se ne pente; la selezione evita il
  rimpianto. Gli autori parlano di «strong evidence for the value of intentional forgetting» (abstract).
- **Compatibilità con Mnemosyne**: in parte. I frammenti sono immutabili e non si cancellano, ma si può smettere di
  *mostrarli*.
- **Da prendere**: invece del "cancella", un gesto "non riproporre", che diventa un `rifiuta` o uno scarto e lascia
  intatto il frammento.

---

### 7.4 Note personali (PKM): si scrive molto, si rilegge poco

#### "Note to self" / list.it (Van Kleek et al., CHI 2009)
- **Che cosa è**: un esperimento di 10 giorni con uno strumento minimo per le note (list.it); 42 persone, 37 hanno
  risposto al questionario. Prosegue lo studio sulle "information scraps" (Bernstein et al., TOIS 2008, 27 lavoratori
  in 5 organizzazioni: https://hci.stanford.edu/publications/paper.php?id=236, letto solo l'abstract).
- **Fonte**: https://people.csail.mit.edu/emax/papers/listit-camera.pdf (letto per intero).
- **Perché funziona / fallisce**: la cattura è velocissima: il 50% delle note scritto in 10 secondi o meno, nota
  mediana di 7 parole. Le note non si toccano più: «75% of notes were never edited again»; solo il 28% è stato
  cancellato. La rilettura è minoritaria: i partecipanti dichiarano che il 34% delle note è stato cercato di proposito
  almeno una volta e il 21% è stato ritrovato senza cercarlo, «by browsing or being "run across" unintentionally»
  (sezione "Search is Infrequent and Targeted"). La ricerca è rara: 32 persone su 42 hanno cercato meno di 10 volte.
- **Compatibilità con Mnemosyne**: sì. La nota non si rivede (immutabile in pratica) e una parte importante delle
  riletture è un incontro casuale.
- **Da prendere**: progettare per l'incontro casuale più che per la ricerca: ogni pagina mostra di lato un frammento
  vicino (dai `vicini` o dai legami), come in una libreria.

#### "I deleted my second brain" (Westenberg, 2025)
- **Che cosa è**: il saggio di chi ha cancellato il proprio vault di Obsidian e le Apple Notes dal 2015: circa 10.000
  note.
- **Fonte**: https://www.joanwestenberg.com/i-deleted-my-second-brain-692aa40d59d5f06dd5131e43 (già noto; non riletto).
- **Perché funziona / fallisce**: il sistema per non dimenticare niente finisce per sostituire il pensiero invece di
  aiutarlo; l'archivio diventa un debito.
- **Compatibilità con Mnemosyne**: sì, come avvertimento: un sito che mostra tutto ricrea il debito ("troppo caos"
  dell'Atlante).
- **Da prendere**: nessun conteggio di "non letti", nessun inbox.

---

### 7.5 Scrittura espressiva e rileggersi

#### Scrittura espressiva (Pennebaker; meta-analisi Frattaroli 2006)
- **Che cosa è**: scrivere di esperienze emotive, di solito 15-20 minuti per pochi giorni.
- **Fonte**: Frattaroli, *Psychological Bulletin* 2006: https://www.gwern.net/doc/psychology/2006-frattaroli.pdf (solo
  l'abstract, tramite una scheda); Guo 2023, *British Journal of Clinical Psychology* (solo una scheda).
- **Perché funziona / fallisce**: su 146 studi randomizzati l'effetto medio è piccolo ma significativo (r = .075). Una
  meta-analisi del 2023 (31 studi, N=4.012) trova g = −0,12 su depressione, ansia e stress, con effetti che compaiono
  dopo un intervallo e non subito (scheda, **non verificato** sul testo). Echo (sopra) conferma che lo scrivere da solo
  porta già beneficio.
- **Compatibilità con Mnemosyne**: sì, con la cautela del delicato: il beneficio sta nello scrivere, non nel vedersi
  riproporre subito.
- **Da prendere**: un frammento delicato non torna presto; se torna, è perché ci torna lui.

#### Rileggere i propri diari
- Evidenza diretta trovata: la frase di P12 in Li et al. 2010 (rileggere i primi diari è «extremely difficult
  (psychologically)»), il caso lungo di Echo (gli eventi negativi riletti si attenuano) e Zhang et al. 2014 (la
  riscoperta vale più di quanto ci si aspetta). **Non ho trovato** studi sistematici sulla rilettura di diari privati
  fuori dall'HCI.

---

### Che cosa fa abbandonare

1. **La manutenzione**: tenere carico, taggare, validare; le barriere si propagano a cascata dalla raccolta alla
   riflessione (Li 2010; Lazar 2015: quasi l'80% dei dispositivi abbandonato in due mesi).
2. **I dati che non dicono niente di utile** (Lazar 2015; Li 2010: «What else do I really want to know?»).
3. **Un'immagine di sé in cui non ci si riconosce**: lo strumento "per altri tipi di persone" (Lazar 2015).
4. **Il giudizio implicito**: il pesce triste, le notifiche "hai smesso", la colpa (Epstein 2016: fino al 16,2% per
   l'attività fisica).
5. **Il ricordo doloroso che arriva senza preavviso** (Meyer 2014; Brubaker 2013; Photobox: foto di ex cancellate;
   Pensieve: «hate getting those emails»).
6. **La mancanza di tempo per riflettere** e l'archivio che chiede di "prepararsi" (Li 2010; Photobox, gli album).
7. **L'accumulo come debito**: tutto conservato, niente riaperto (Sellen & Whittaker 2010: <2% digitali tra gli oggetti
   cari; Westenberg).
8. **Lo scopo raggiunto**: l'abbandono felice, che non è un fallimento (Clawson 2015).

### Che cosa fa rileggere

1. **Un indizio che arriva da fuori, al momento giusto e inatteso** (Pensieve: 61% delle risposte entro 24 ore; Photobox).
2. **Poco, lento, uno alla volta**: la rarità rende il pezzo «more special but also more easy to take in» (Photobox).
3. **Le proprie cose, non le domande generiche** (Pensieve: le proprie foto 11% contro 8,3% per il testo).
4. **Poter rispondere subito, dallo stesso posto** (Pensieve: 51% del diario nasce dalla risposta all'email).
5. **L'incontro casuale** più della ricerca (list.it: 21% delle note ritrovate "passandoci sopra").
6. **Il tono positivo o neutro dei ritorni** (Pensieve, Facebook Memories).
7. **La riscoperta dell'ordinario**, che vale più di quanto ci si aspetti (Zhang 2014).
8. **Le viste per mese e per anno quando l'archivio è lungo** (Epstein 2016).

### Implicazioni per il sito

1. **Una porta, non un archivio.** La prima pagina mostra una cosa sola (l'ultima restituzione oppure una frase ✦
   riemersa) e si legge in un minuto. L'archivio esiste, ma dietro.
2. **Il ricordo lento e filtrato.** Un frammento alla volta dai "ricordabili", con un ritmo non controllabile (niente
   "un altro"), mai delicati, mai un "un anno fa oggi" automatico.
3. **Risposta in un tocco.** Da ogni frase riproposta: "aggiungo" (un nuovo frammento con `ritorna-su`) e "questo no"
   (`rifiuta` e scarto). Nessun altro pulsante.
4. **Zero manutenzione, zero contatori.** Niente "non letti", strisce, giorni dall'ultimo memo, code da validare. Il
   ritorno dopo una pausa mostra la stessa pagina e la riga del "mentre eri via".
5. **L'incontro di lato.** In ogni pagina, un vicino (un legame forte o un frammento vecchio della coda lunga), come
   un libro accanto a un altro sullo scaffale, al posto di una mappa visiva.
6. **Il tempo come linea, non come rete.** Per un archivio lungo, la vista per mese con i "periodi" (conti e tre frasi
   alla lettera); niente grafo dei nodi.
7. **Il delicato protetto anche nelle anteprime.** Nessuna anteprima preriempita; schede persona e tema che non aprono
   mai su una frase delicata; notifiche senza contenuto.
8. **La ricerca per indizi** (quando, con chi, parole vicine), perché la rilettura voluta passa da lì quando c'è (list.it:
   il 34% delle note cercato di proposito).

---
