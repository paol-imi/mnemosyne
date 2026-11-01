# Il cervello, sul serio: come tiene ricordi e pensieri, e che cosa ne segue per il memo-coscienza

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Approfondisce il §1 di [schema](/_progetto/schema.md)
> e mette alla prova il modello di [proposta](/_progetto/proposta.md). Nessuna nota, cartella o script esistente è stato toccato.
> Le fonti sono state controllate con ricerche mirate, ma su abstract e fonti secondarie, non sui testi integrali:
> volumi e pagine segnati "(da verificare)" vanno ricontrollati prima di citarli altrove.
> Legenda: **[consenso]** = risultato solido e condiviso · **[dibattuto]** = dati veri, interpretazione contesa · **[ipotesi]** = quadro teorico.

## 0. In sette righe

1. Il cervello non archivia esperienze: archivia **un indice** che lega pezzi sparsi. Il frammento non va pensato come un contenitore ma come un **nodo di congiunzione**: il suo valore è *quella* combinazione (Galimberti + i greci + quella sera + quella frase + quel brivido).
2. Ci sono **due velocità**: catturare in fretta senza toccare nulla, e integrare piano **rileggendo il vecchio insieme al nuovo**. Il consolidamento che guarda solo i frammenti nuovi è sbagliato.
3. Il ricordo autobiografico è **gerarchico e governato dal sé**: temi di vita → periodi → vicende → episodi. Mancano due livelli (periodo, vicenda), e lo sguardo deve diventare un *working self* con obiettivi e domande, non un testo.
4. Si ricorda bene **ciò che combacia con uno schema e ciò che lo viola**; il mezzo si perde. Il sistema deve dire, a ogni cattura, se il frammento è **congruente** o **sorprendente**, e trattare le sorprese come il materiale più prezioso.
5. L'emozione agisce **dopo**, e **all'indietro**: un "folgorato" rende importanti anche le cose neutre dei giorni prima che c'entrano. La `pancia` non è solo un voto, è un innesco.
6. Il nemico non è l'oblio (il repository non dimentica) ma la **colonizzazione**: gli schemi dell'AI che si sostituiscono a quelli dell'utente, come la cultura di Bartlett normalizzava i racconti. Il confine `validata` è la condizione perché l'archivio sia davvero parte della mente (Clark & Chalmers), non burocrazia.
7. Dimenticare serve a generalizzare: **non si cancella nulla, ma la vista dimentica**. Le forze del legame e la "vitalità" di una nota si **calcolano** dall'uso, non si scrivono a mano.

---

## 1. L'ippocampo come indice

**Che cosa dice.**
- *Teoria dell'indicizzazione* (Teyler & DiScenna 1986, *Behav. Neurosci.* 100(2); aggiornata in Teyler & Rudy 2007, *Hippocampus* 17(12)): il contenuto dell'esperienza resta nelle aree neocorticali che l'hanno elaborata (visione, suono, linguaggio, emozione). L'ippocampo conserva solo un **indice**: la congiunzione di puntatori a quei luoghi, legata dal potenziamento a lungo termine. **[consenso ampio sull'idea]**
- *Completamento e separazione dei pattern* (Marr 1971, *Phil. Trans. R. Soc. B* 262): da un indizio parziale l'indice ricompone l'intero; due esperienze simili devono restare codici distinti per non confondersi. **[consenso sul principio; dettagli anatomici di Marr superati]**
- *Sistemi complementari* (McClelland, McNaughton & O'Reilly 1995, *Psych. Review* 102(3)): l'ippocampo impara in fretta e con codici separati; la neocorteccia impara piano e **intercalando** il nuovo con il vecchio. Un unico sistema veloce produrrebbe *interferenza catastrofica*: il nuovo cancella il vecchio. **[consenso]**
- *Consolidamento*: per la teoria standard (Squire & Alvarez 1995, *Curr. Opin. Neurobiol.* 5(2)) col tempo la traccia diventa indipendente dall'ippocampo; per la Multiple Trace Theory e la teoria della trasformazione (Nadel & Moscovitch 1997; Winocur & Moscovitch 2011, *JINS* 17) il ricordo **si semantizza**: in corteccia resta il succo, mentre il dettaglio vivido continua a dipendere dall'ippocampo, e ogni richiamo crea una traccia nuova. **[dibattuto]**
- *Engram* (Liu et al. 2012, *Nature* 484; Josselyn & Tonegawa 2020, *Science* 367): un insieme rado di neuroni marcato durante l'apprendimento, se riattivato, basta a far riaffiorare il ricordo. **[solido nei roditori, indiretto nell'uomo]**

**Che cosa ne segue.**
- **Il frammento è un indice, le entità sono la corteccia.** Il frammento non deve "contenere" Galimberti, i greci, la tristezza: deve **puntarli** e conservare ciò che solo lui ha, cioè la *congiunzione* e il *contesto*. È esattamente la divisione frammento/entità della proposta: la confermo, e ne do la ragione profonda.
- **Recupero da indizio parziale.** Le domande vere saranno vaghe: *"quella cosa sui greci che diceva quel filosofo, vista di sera"*. La ricerca deve partire da **qualsiasi** pezzo della congiunzione (un tema + un'ora + un mezzo) e risalire al frammento, poi ricomporre il resto. Ricetta nuova: `cerca --indizi "greci, sera, video"` che pesa le corrispondenze parziali.
- **Separazione.** Due spezzoni di Galimberti visti a una settimana di distanza **non si fondono** mai in un frammento solo, anche se dicono cose simili: sono due indici. Si fondono solo le *entità* doppie (`sinonimo-di`).
- **Due velocità (CLS).** Cattura veloce e cieca (verbatim, una domanda al massimo); integrazione lenta e **intercalata**: il consolidamento rilegge i frammenti nuovi **accanto a un campione di vecchi** dello stesso tema, altrimenti i temi si deformano sull'ultima settimana.
- **Ogni ritorno è una traccia nuova (MTT).** Ritornare su un frammento con una lettura nuova non modifica il frammento: crea un frammento nuovo con `ritorna-su: [slug]`.

**Esempio.** A dicembre l'utente scrive *"ripensavo a quel Galimberti sui greci, adesso con quello che è successo mi suona diverso"*. Nasce `20261212-ripenso-galimberti-greci` con `ritorna-su: [20261031-galimberti-spezzone-x]`. Il frammento di ottobre resta com'era: è la prova di chi era a ottobre.

**Dove la metafora inganna.** Il cervello *perde* il dettaglio mentre semantizza; noi non dobbiamo. Il repository è senza perdite: la semantizzazione si fa **nella vista** (prima il succo, il dettaglio su richiesta) e nelle note di sintesi, mai togliendo dal frammento.

---

## 2. Il sé che ricorda: il Self-Memory System di Conway

**Che cosa dice.** (Conway & Pleydell-Pearce 2000, *Psych. Review* 107(2); Conway, Singer & Tagini 2004, *Social Cognition* 22(5); Conway 2005, *J. Memory and Language* 53(4))
- Un ricordo autobiografico non si ripesca: si **costruisce** sul momento, quando la base di conoscenza autobiografica incontra il **working self**. **[consenso sull'idea costruttiva]**
- Il *working self* è una **gerarchia di obiettivi attivi**: decide che cosa viene codificato, che cosa è accessibile, e inibisce ciò che minaccia gli obiettivi in corso. Il *long-term self* contiene il sé concettuale (immagini di sé, valori) e la conoscenza autobiografica.
- La conoscenza è a livelli: **storia di vita e temi di vita → periodi di vita** (anni: "quando vivevo a…") **→ eventi generali** (ripetuti o estesi, da giorni a mesi) **→ conoscenza specifica dell'evento** (i dettagli sensoriali, che svaniscono presto se non si legano a obiettivi).
- Due spinte: **corrispondenza** (fedeltà all'esperienza) e **coerenza** (compatibilità con gli obiettivi e l'immagine di sé). Col tempo tende a vincere la coerenza. **[ipotesi teorica]**
- Due modi di ricordare: **generativo** (lento, dall'alto: periodo → evento → dettaglio) e **diretto** (un indizio fa riaffiorare l'episodio da solo). Il diretto è più frequente di quanto il modello pensasse (Uzer, Lee & Brown 2012, *JEP:LMC* 38(5), da verificare).
- I ricordi si addensano attorno a quando è nata un'**immagine di sé** ("io sono…": Rathbone, Moulin & Conway 2008, *Memory & Cognition* 36(8)). I **ricordi fondanti** (*self-defining memories*, Singer & Salovey 1993) sono vividi, emotivi, ripetuti, legati a un conflitto irrisolto. L'identità è una storia interiorizzata (McAdams 2001, *Rev. Gen. Psychol.* 5(2)).
- Limiti: modello ampio, costrutti ("obiettivi") difficili da misurare, confini tra i livelli non netti.

**Che cosa ne segue.**
- **Lo sguardo è il working self, e va strutturato.** Oggi `sguardo` è un testo (l'ex [nucleo](/nucleo.md)). Deve avere parti riconoscibili, perché l'AI le usa per orientare cattura e proposte:
  - `## Temi di vita` (oggi: il peso → lo sguardo → l'oltre; dolore, amore, verità);
  - `## Io sono` (frasi datate dell'utente, mai dell'AI: "sono in uno stadio assurdista");
  - `## Obiettivi e progetti attivi` (il tatuaggio; capire l'assurdo senza nichilismo);
  - `## Domande aperte` (quelle che "incubano", §7).
- **Due livelli nuovi** tra tema e frammento:
  - `periodo`: un tratto di vita **nominato dall'utente** ("lo stadio assurdista", "l'estate della rabbia"), con `dal`/`al` (aperto se in corso). Non lo inventa l'AI: al massimo lo propone come domanda.
  - `vicenda` (l'evento generale): un'unità di giorni-mesi che raccoglie frammenti ("la rilettura di Berserk", "le sere con Galimberti"). Può proporla l'AI quando vede ≥3 frammenti legati nel tempo.
- **`fondante: true`** sui pochi frammenti che l'utente riconosce come ricordi fondanti. Solo lui lo mette; l'AI può chiedere "questo è uno di quelli?" se un frammento torna spesso e ha `pancia: 3`.
- **Due interfacce di recupero**: *diretta* (indizi, §1) e *generativa* (navigazione dall'alto: periodo → vicende → frammenti). La seconda risponde a "cosa pensavo quando…", "com'ero nell'estate…".
- **Coerenza contro corrispondenza, tradotto**: la corrispondenza la garantisce il `## Testo originale` immutabile; la coerenza la produce lo sguardo. Le due cose devono restare **in file diversi**, così si vede quando la storia che l'utente si racconta si allontana da ciò che ha davvero scritto.

**Esempio.** Le citazioni di [Marco Aurelio](/fonti/pensiero/marco-aurelio.md) raccolte nel 2025 e quelle di [Camus](/fonti/pensiero/camus.md) del 2026 possono stare nello stesso tema (accettare ciò che non dipende da noi), ma in **periodi** diversi. "Com'è cambiato il mio modo di stare nel dolore?" si risponde mettendo a confronto i due periodi, non mescolando tutto in un tema.

**Dove la metafora inganna.** Il working self *inibisce* ciò che minaccia gli obiettivi. Un sistema che usa lo sguardo per filtrare farebbe lo stesso, e sarebbe un difetto: l'utente vuole vedere anche ciò che stona. Lo sguardo serve a **orientare** le proposte, mai a nascondere un frammento.

---

## 3. Schemi, ricostruzione, riconsolidamento

**Che cosa dice.**
- *Bartlett 1932* (*Remembering*, Cambridge UP): con "La guerra dei fantasmi" mostra che ricordare è **ricostruire** dentro uno schema; i racconti si accorciano, si razionalizzano, si piegano alle convenzioni di chi ricorda ("effort after meaning"). Metodo informale; le repliche controllate confermano solo in parte. **[consenso sull'idea, effetti dipendenti dal compito]**
- *Piaget*: **assimilazione** (il nuovo entra nello schema) e **accomodamento** (lo schema cambia perché il nuovo non ci entra). È un parallelo concettuale, non un dato sulla memoria.
- *Tse et al. 2007* (*Science* 316): ratti che hanno uno **schema** (associazioni sapore-luogo apprese in settimane) imparano coppie nuove in una prova sola, e già 48 ore dopo la lesione dell'ippocampo non le cancella (dato confermato dal commento di Squire nello stesso numero). Tse et al. 2011 (*Science* 333) mostrano l'attivazione genica in corteccia prefrontale mediale. **[solido, ma un solo paradigma nei ratti]**
- *SLIMM* (van Kesteren, Ruiter, Fernández & Henson 2012, *Trends Neurosci.* 35(4)): il congruente passa dalla prefrontale mediale e si aggancia a ciò che c'è; il **nuovo**, che genera errore di previsione, passa dall'ippocampo. La memoria ha una forma **a U**: si ricorda bene il molto congruente e il molto nuovo, il mezzo si perde. **[ipotesi con sostegno parziale]**
- *Riconsolidamento* (Nader, Schafe & LeDoux 2000, *Nature* 406): una memoria consolidata, riattivata, torna labile. Ma la destabilizzazione richiede un **errore di previsione** durante il richiamo (Sevenster, Beckers & Kindt 2013, *Science* 339). Negli animali è consenso; **nell'uomo è fragile** e con repliche fallite (Bos et al. 2014; Stemerding et al. 2022).
- *Loftus & Palmer 1974* (*JVLVB* 13): la parola della domanda ("smashed" o "hit") cambia la velocità ricordata e fa comparire vetri rotti mai visti. Il meccanismo (sovrascrittura o compiacenza) è conteso.

**Che cosa ne segue.**
- **Classificare ogni cattura: congruente, nuovo o nel mezzo.** È la scoperta che più cambia il flusso `/memo`:
  - *congruente* (combacia con un tema esistente): assimilazione rapida, legami proposti senza cerimonia;
  - *nuovo/sorprendente* (nessun tema regge, o va **contro lo sguardo**): `sorpresa: true`, nessun tema forzato, entra nella lista "sorprese" del consolidamento;
  - *nel mezzo* (vagamente legato a tutto): è la zona dove le cose si perdono. Invece di agganciarlo a un tema generico, l'AI chiede l'unica cosa utile: *"che cosa ti ha colpito, esattamente?"*
- **Accomodamento.** Quando un tema accumula frammenti che non si somigliano più (il tema "amore" che tiene insieme eros, perdita e amicizia), il consolidamento propone di **dividerlo**. Quando molte sorprese puntano nella stessa direzione, propone di **riscrivere lo sguardo** (una versione nuova, la vecchia resta).
- **Contro Bartlett: le parole dell'utente prima delle categorie dell'AI.** L'AI normalizza come la cultura di Bartlett: "i greci" diventa "filosofia antica", "rapporti" diventa "relazioni interpersonali". Regola: un tema nuovo prende **il nome che usa l'utente**; il nome "tecnico" va negli `alias`.
- **Contro Loftus: le domande dell'AI non suggeriscono.** Non "ti ha commosso?", ma "che effetto ti ha fatto?". La parola dell'AI non deve entrare nel ricordo.
- **Riconsolidamento, tradotto bene.** Rileggere non cambia nulla. Una nota "si riapre" solo quando c'è **scarto**: l'utente dice qualcosa che contraddice ciò che aveva scritto. Allora nasce un ritorno (frammento nuovo, §1) con `cambia: true`, e il `## Perché mi colpisce` riceve una riga datata in più. Si aggiunge, non si sovrascrive.

**Esempio.** Galimberti dice qualcosa sull'amore dei greci. "Amore" esiste ed è nel cuore dello sguardo → *congruente*. "I greci" non esiste come tema, ma l'archivio ha [Sisifo](/fonti/sacro-e-mito/sisifo.md), [Psiche](/fonti/sacro-e-mito/psiche.md), l'[eterno ritorno](/concetti/eterno-ritorno.md): c'è uno **schema implicito** a cui agganciarsi. Se invece Galimberti dicesse che l'amore *non* nasce dall'attraversare il dolore, sarebbe una **sorpresa** contro lo sguardo: la cosa più interessante della settimana, da non annacquare.

**Dove la metafora inganna.** Nel cervello lo schema *distorce* il ricordo, ed è il prezzo della velocità. Noi possiamo avere la velocità dello schema senza la distorsione, perché il verbatim resta. Va però ammesso che la distorsione si sposta: **sull'AI che sceglie i temi**. Lì va il controllo.

---

## 4. Emozione e salienza: perché ricordiamo ciò che ci ha colpito

**Che cosa dice.**
- *McGaugh* (2000, *Science* 287; 2004, *Annu. Rev. Neurosci.* 27): l'attivazione emotiva (adrenalina, cortisolo → noradrenalina) agisce sull'**amigdala basolaterale**, che **modula** il consolidamento che avviene altrove. L'amigdala non è il magazzino: è il volume. L'effetto funziona anche **dopo** l'evento. **[consenso, soprattutto da dati animali]**
- *Flashbulb* (Brown & Kulik 1977, *Cognition* 5; Talarico & Rubin 2003, *Psych. Science* 14(5)): per l'11 settembre la coerenza del ricordo cala come per un evento qualunque; restano alte solo **vividezza e fiducia**. **[consenso: vivido non vuol dire vero]**
- *Centro e periferia* (Kensinger 2009, *Emotion Review* 1(2)): l'emozione rafforza il dettaglio **centrale** a scapito della periferia; il negativo favorisce il dettaglio sensoriale, il positivo il succo (quest'ultima parte è un'ipotesi).
- *Tagging retroattivo* (Frey & Morris 1997, *Nature* 385, sulle sinapsi; Dunsmoor, Murty, Davachi & Phelps 2015, *Nature* 520, nell'uomo): un evento emotivo rafforza **all'indietro** il ricordo di cose neutre viste prima e **concettualmente legate**; l'effetto compare dopo ore (6 e 24) ed è più forte per le tracce deboli. Il meccanismo nell'uomo è un'interpretazione.
- *Novità e dopamina* (Lisman & Grace 2005, *Neuron* 46(5)): l'ippocampo rileva la novità e, attraverso l'area tegmentale ventrale, apre la porta della memoria a lungo termine. **[ipotesi influente]**
- *Dare un nome all'emozione* (Lieberman et al. 2007, *Psych. Science* 18(5)): nominare l'emozione riduce l'attivazione dell'amigdala. È uno studio fMRI correlazionale, non riguarda la memoria.

**Che cosa ne segue.**
- **`pancia` resta solo dell'utente, e vale anche se arriva dopo.** Il consolidamento è modulato *dopo* l'evento: chiedere "quanto ti ha colpito?" un giorno più tardi non è un ripiego.
- **`pancia: 3` è un innesco (tagging retroattivo).** Quando l'utente dà "folgorato", l'AI rilegge i frammenti **dei 7 giorni prima** e propone i legami con quelli concettualmente vicini, soprattutto i deboli (senza pancia, senza temi). È la scoperta più concreta del filone.
- **Per il folgorato si chiede il centro, non il contesto.** "Quale frase, quale istante?" (con Kensinger), non "dov'eri?".
- **Salienza ≠ affidabilità.** Una citazione con `pancia: 3` non è più sicura: è anzi quella da verificare per prima, perché è quella che l'utente ripeterà con più fiducia.
- **Due assi distinti: emozione e novità.** `pancia` misura quanto ha colpito; `sorpresa` (§3) misura quanto è nuovo rispetto all'archivio e allo sguardo. Un frammento può essere tiepido e sorprendente: va tenuto d'occhio lo stesso.
- **Il nome dell'emozione lo sceglie l'utente.** Il vocabolario chiuso delle emozioni vale per l'AI (che propone solo da lì); la parola dell'utente ("mi ha inquietato", "un vuoto bello") resta in `reazione`, intatta. Nominare ha già un valore per lui; non va rubato.

**Esempio.** Martedì l'utente salva, senza commento, un brano dei [Radiohead](/fonti/opere/radiohead.md) ascoltato in macchina. Giovedì lo spezzone di Galimberti: `pancia: 3`. Il tagging retroattivo propone: *"martedì hai salvato quel brano: c'entra con i rapporti di cui parla Galimberti?"*. Una proposta, una riga, mai salvata senza sì.

**Dove la metafora inganna.** Nel cervello l'emozione *restringe* e talvolta *falsa*. Il sistema deve prendere dall'emozione la **selezione** (che cosa conta) e lasciarle fuori la **certezza**.

---

## 5. Concetti e associazioni: reti, prototipi, concept cells, cognizione incarnata

**Che cosa dice.**
- *Collins & Quillian 1969* (*JVLVB* 8): gerarchia con proprietà salvate una volta sola (economia cognitiva). In parte smentita: conta la tipicità più della distanza nella gerarchia.
- *Collins & Loftus 1975* (*Psych. Review* 82(6)): rete non gerarchica; l'attivazione **si diffonde** dai nodi e si attenua con la distanza; spiega il priming (Meyer & Schvaneveldt 1971, *J. Exp. Psychol.* 90(2): "pane" accelera "burro"). Limite: così flessibile da essere poco falsificabile.
- *Rosch* (1975, *JEP: General* 104; 1978): le categorie hanno **prototipi** e una struttura graduata; il **livello di base** ("sedia", non "mobile" né "sedia da cucina") è il più informativo e quello che nominiamo per primo.
- *Concept cells* (Quiroga, Reddy, Kreiman, Koch & Fried 2005, *Nature* 435; Quiroga 2012, *Nat. Rev. Neurosci.* 13(8)): neuroni del lobo temporale mediale rispondono a **una persona o un concetto in modo invariante**: foto diverse, il nome scritto. Il codice è rado. Ison, Quiroga & Fried 2015 (*Neuron* 87(1)): un'associazione nuova persona-luogo si forma **dopo una sola esposizione**. Non sono "neuroni della nonna": piccole popolazioni, campione clinico.
- *Barsalou*: le **categorie ad hoc** nascono da un obiettivo ("cose da salvare in un incendio", 1983, *Memory & Cognition* 11(3)) e hanno comunque prototipi; i concetti sono **simulazioni** multimodali, fondate su corpo e situazione (1999, *BBS* 22; 2008, *Annu. Rev. Psychol.* 59). **[influente ma conteso]**
- *Hub-and-spoke* (Patterson, Nestor & Rogers 2007, *Nat. Rev. Neurosci.* 8(12)): i "raggi" sono le modalità (forma, suono, azione, parola), il "mozzo" nel lobo temporale anteriore le integra. **[consenso forte]**

**Che cosa ne segue.**
- **L'entità è una concept cell: invariante.** Galimberti è lo stesso nodo che lo si chiami "Galimberti", "Umberto", "quello dell'*Ospite inquietante*", o che arrivi come una foto o un link YouTube. Gli `alias` sono la condizione dell'invarianza; `trova.mjs` ne è il riconoscimento. Confermato e rafforzato.
- **L'entità è un mozzo, le modalità sono i raggi.** La pagina di un'entità aggrega per modalità: le parole (citazioni), le immagini (pin, foto), i suoni (brani, momenti), i luoghi, i frammenti. Non un elenco piatto di "ne parlano".
- **Un legame nasce da un frammento solo; un tema no.** Con Ison 2015: basta uno spezzone per legare Galimberti ai greci. Ma un *tema* nuovo (uno schema) richiede ricorrenza. Corregge la proposta, che chiedeva ≥3 frammenti per tutto.
- **I temi stanno al livello di base.** "Amore", "morte", "i greci", "l'assurdo"; non "esistenza" (troppo alto) né "amore non corrisposto nei greci" (troppo basso: è un frammento, o una vicenda). Ogni tema ha un **prototipo**: un frammento o una citazione scelti dall'utente come "il più tema di tutti" (`prototipo: slug`).
- **Le categorie ad hoc non sono temi.** "Frasi da tatuare", "cose per quando sto male", "canzoni per guidare di notte" sono categorie nate da un obiettivo: diventano **raccolte** (`raccolta`: una query salvata con un nome, più eventuali scelte a mano), non temi. Così i temi restano pochi e i desideri dell'utente restano liberi.
- **La forza del legame si calcola.** Lo `slug@2` scritto a mano va tolto: la forza è il numero di frammenti che legano i due nodi, pesato per `pancia` e per i ritorni. La diffusione dell'attivazione (la query "con cosa risuona questo?") usa quella forza e si ferma a due passi.
- **Il grounding: non buttare il sensoriale.** Il momento del brano (3:40), il pin, il "sotto la pioggia" sono i raggi che rendono vivo il concetto. Restano facoltativi ma il `/memo` non li scarta mai.

**Esempio.** "Con cosa risuona questo?" sul frammento Galimberti: da *amore* e *i greci* l'attivazione raggiunge Psiche (mito di eros), il Simposio se c'è, e per *tristezza* un brano dei Deftones. La risposta mostra **il percorso** ("Galimberti → amore → Psiche, perché 4 frammenti li legano"), non solo l'arrivo.

**Dove la metafora inganna.** La diffusione nel cervello è automatica e invisibile; qui deve essere **limitata e spiegata**, altrimenti tutto è legato a tutto e la risposta non dice nulla.

---

## 6. Codificare e ritrovare: specificità, contesto, testing, spaziatura, oblio

**Che cosa dice.**
- *Specificità di codifica* (Tulving & Thomson 1973, *Psych. Review* 80(5)): un indizio aiuta solo se era presente quando il ricordo si è formato. **[consenso]**
- *Contesto* (Godden & Baddeley 1975, *Br. J. Psychol.* 66(3), i subacquei): la replica di Murre 2021 (*R. Soc. Open Sci.* 8) non trova l'effetto; la meta-analisi di Smith & Vela 2001 (*Psychon. Bull. Rev.* 8(2)) lo trova **reale ma modesto**, più debole se l'elaborazione è profonda. **[l'effetto esiste ed è piccolo]**
- *Umore* (Bower 1981, *Am. Psychol.* 36(2)): la **congruenza** (si richiama materiale con lo stesso tono) è solida; la stato-dipendenza è fragile (Eich 1995, da verificare).
- *Transfer-appropriate processing* (Morris, Bransford & Franks 1977, *JVLVB* 16(5)): conta quanto la codifica somiglia all'uso che se ne farà. **[consenso]**
- *Testing* (Roediger & Karpicke 2006, *Psych. Science* 17(3)): richiamare consolida più che rileggere, a distanza di giorni. *Spaziatura* (Cepeda et al. 2006, *Psych. Bull.* 132(3); 2008, *Psych. Science* 19(11)): l'intervallo ottimale cresce con la ritenzione voluta. **[tra gli effetti più solidi]**
- *Oblio* (Ebbinghaus 1885; replica di Murre & Dros 2015, *PLoS ONE* 10(7)): perdita rapida e poi lenta. *New Theory of Disuse* (Bjork & Bjork 1992): la **forza di archiviazione** non cala, cala la **forza di recupero**; recuperare quando è bassa rafforza di più ("difficoltà desiderabili"). **[quadro teorico influente]**
- *Oblio indotto dal recupero* (Anderson, Bjork & Bjork 1994, *JEP:LMC* 20(5)): richiamare alcuni esemplari di una categoria fa dimenticare gli altri. **[replicato, meccanismo discusso]**
- *Il valore di dimenticare* (Richards & Frankland 2017, *Neuron* 94(6)): la memoria serve a decidere, non a conservare; dimenticare toglie il superato ed evita di "imparare a memoria" episodi singoli, favorendo la generalizzazione. **[prospettiva teorica]** Borges, "Funes el memorioso" (1942): Funes ricorda tutto e non riesce a pensare, perché pensare è dimenticare differenze.

**Che cosa ne segue.**
- **Il miglior indizio futuro sono le parole dell'utente.** Specificità di codifica: l'utente ritroverà le cose con le parole con cui le ha dette. La ricerca a testo pieno sul `## Testo originale` vale quanto i temi. Niente riassunti al posto suo.
- **Contesto leggero.** L'effetto del contesto è piccolo: basta `contesto` in una riga e `mezzo`. Non vanno aggiunti campi (luogo, meteo, compagnia). Conferma la proposta e la frena.
- **Salvare nella forma in cui servirà.** Se l'utente chiederà "citazioni sull'amore", la citazione deve essere un'unità a sé (TAP): conferma il tipo `citazione`.
- **L'umore congruente è una trappola da aprire.** "Mi sento vuoto" porterà per natura a frammenti vuoti. Lo sguardo dell'utente è *attraversare* il dolore: la ricetta 8 risponde con ciò che c'è nel vuoto **e** con un passo oltre (ciò che in passato, dallo stesso vuoto, ha portato ad amore o verità), dichiarandolo.
- **"Ti ricordi?" fatto bene: richiamo attivo, intervalli crescenti.** Non riproporre il frammento intero, ma l'indizio: *"Galimberti, sui greci, diceva che l'amore…?"*. Intervalli indicativi: 1 settimana, 1 mese, 4 mesi, 1 anno. Un solo richiamo per volta, facoltativo, mai più di due a settimana.
- **La vitalità si calcola (Bjork).** Il repository ha forza di archiviazione infinita; ciò che cala è il recupero, cioè l'attenzione dell'utente. `vitalita` è un valore **calcolato** (dai ritorni, dai richiami riusciti, dalla pancia, dal tempo) e serve a due cose: scegliere cosa richiamare (le cose importanti e sbiadite, dove il richiamo rende di più) e ordinare la vista.
- **Contro l'oblio indotto dal recupero: rotazione.** Se "le migliori di Camus" restituisce sempre le stesse tre, le altre spariscono dalla mente. Ogni risposta di elenco include **una voce della coda lunga** ("e una che non rivedi da tempo").
- **L'oblio della vista.** I frammenti grezzi, vecchi, mai ripresi, senza pancia scendono di sotto: non cancellati, non mostrati per primi. Le note di sintesi (vicende, temi) portano il succo; il dettaglio resta a un clic. È il Funes rovesciato: tutto è conservato, non tutto è presente.

**Dove la metafora inganna.** Il cervello dimentica per necessità; noi scegliamo **che cosa mettere in primo piano**. Dimenticare davvero (cancellare) resta vietato.

---

## 7. La mente che prevede, vaga e sogna

**Che cosa dice.**
- *Mente predittiva* (Friston 2010, *Nat. Rev. Neurosci.* 11(2); Clark 2013, *BBS* 36(3)): il cervello riduce l'errore di previsione aggiornando i modelli o agendo. Che l'errore di previsione sia un segnale di apprendimento è **[consenso]** (dopamina e ricompensa, Schultz); che tutto il cervello sia minimizzazione dell'energia libera è **[ipotesi]** criticata come poco falsificabile.
- *Incubazione e insight* (Sio & Ormerod 2009, *Psych. Bull.* 135(1)): l'incubazione funziona, **poco o moderatamente**, soprattutto nei problemi creativi e dopo una preparazione lunga. Wagner et al. 2004 (*Nature* 427): dopo il sonno circa il 59% scopre una regola nascosta, contro circa il 23% di chi resta sveglio (uno studio, un compito). Kounios & Beeman 2014 (*Annu. Rev. Psychol.* 65) sui correlati dell'"aha"; il cliché "creatività = emisfero destro" va evitato.
- *Default mode network* (Raichle et al. 2001, *PNAS* 98(2); Buckner, Andrews-Hanna & Schacter 2008, *Ann. NY Acad. Sci.* 1124): la rete attiva a riposo, legata al pensiero su di sé, alla memoria, al futuro, alle altre menti. **[consenso]** Mente che vaga (Smallwood & Schooler 2015, *Annu. Rev. Psychol.* 66): costi e benefici. Baird et al. 2012 (*Psych. Science* 23(10)): una pausa poco impegnativa aiuta i problemi **già visti** (repliche miste).
- *Simulazione episodica* (Schacter & Addis 2007, *Phil. Trans. R. Soc. B* 362): ricordare e immaginare il futuro usano la stessa rete (dato solido); che la memoria sia costruttiva *per* servire il futuro è un'ipotesi.
- *Sonno* (Diekelmann & Born 2010, *Nat. Rev. Neurosci.* 11(2)): nel sonno NREM le memorie vengono **riattivate** e trasferite verso la corteccia (replay: Wilson & McNaughton 1994, *Science* 265). Stickgold & Walker 2013 (*Nat. Neurosci.* 16(2)): il sonno farebbe un **triage**, privilegiando ciò che conta per il futuro (quadro interpretativo con alcuni dati). Lewis, Knoblich & Poe 2018 (*TiCS* 22(6)): il NREM **astrae le regolarità**, il REM crea **legami lontani**; l'alternanza favorirebbe la soluzione creativa. **[modello teorico, prove dirette scarse]** Il sogno come riflesso della riattivazione: Wamsley et al. 2010 (*Curr. Biol.* 20(9)), correlazionale; Llewellyn 2013 (*BBS* 36(6)) lo accosta all'arte della memoria (ipotesi).

**Che cosa ne segue.**
- **L'AI tiene un modello dell'utente e ne misura l'errore.** Il modello è lo sguardo. La `sorpresa` (§3) è l'errore di previsione: un frammento che lo sguardo non avrebbe previsto (un pezzo pop gioioso in pieno stadio assurdista; un passo di Peterson letto con fastidio). Il consolidamento parte **dalle sorprese**, non dal più recente.
- **Domande in incubazione.** Le `## Domande aperte` dello sguardo e le domande del progetto tatuaggi ("che cosa c'è *oltre* il dolore, in immagine?") sono problemi preparati. Il consolidamento cerca, tra i frammenti nuovi, quelli che toccano una domanda aperta, e li porta lì: *"questo potrebbe rispondere a…"*. È l'incubazione resa esplicita, con la modestia che i dati impongono.
- **Accogliere il pensiero che vaga.** `mezzo: pensiero` senza obbligo di tema, di pancia, di nulla. Il pensiero libero è il materiale del DMN: forzarlo in categorie lo uccide. Il consolidamento lo lascia grezzo finché non risuona con altro.
- **Consolidamento in due fasi, come NREM e REM.**
  1. *Astrarre*: temi emergenti, vicende da proporre, doppioni da fondere, temi da dividere, tagging retroattivo, triage (prima ciò che tocca obiettivi e domande aperte dello sguardo).
  2. *Associare lontano*: **una sola** convergenza ardita tra tradizioni lontane, dichiarata come tale ("il sogno della settimana"). Per un utente che ama l'esoterico e il mistero è anche un piacere; resta una proposta, con la sua ragione in una riga.
- **Il futuro è parte della memoria.** I progetti (tatuaggio) e le `intenzioni` (da leggere, da ascoltare) sono memoria prospettica: la ricetta "cosa leggo dopo" e il `serve-a` restano. Confermati.

**Esempio.** Il sogno di una settimana: *"Galimberti sui greci e l'eclissi di [Berserk](/fonti/opere/berserk.md): in entrambi l'amore (eros, ambizione) diventa ciò che divora. Convergenza ardita, da prendere come gioco."* (Il contenuto della frase di Galimberti resta segnaposto: il legame va controllato sul testo vero.)

**Dove la metafora inganna.** Il sonno è involontario e gratuito; il consolidamento qui costa attenzione all'utente. Deve stare in **10 proposte e una domanda**, e saltarlo non deve rompere niente.

---

## 8. La memoria fuori dalla testa: mente estesa, memoria transattiva, Luhmann

**Che cosa dice.**
- *Mente estesa* (Clark & Chalmers 1998, *Analysis* 58(1)): il taccuino di Otto, malato di Alzheimer, vale come una sua credenza se è **costantemente disponibile**, **facilmente accessibile**, **accettato automaticamente** e il suo contenuto è stato **approvato consapevolmente** in passato (formulazione dei criteri da verificare sul testo). Critica: accoppiamento causale non è costituzione (Adams & Aizawa 2008, *The Bounds of Cognition*). **[filosofia, dibattuto]**
- *Memoria transattiva* (Wegner 1987, in *Theories of Group Behavior*, Springer): in una coppia o un gruppo ciascuno sa **chi sa cosa**; la memoria del gruppo è anche un indice di competenze.
- *Effetto Google* (Sparrow, Liu & Wegner 2011, *Science* 333): chi sa di poter ritrovare un'informazione la ricorda meno e ricorda meglio dove trovarla. La replica di Camerer et al. 2018 (*Nat. Hum. Behav.* 2) **non** ha confermato l'esperimento 1. *Offloading* (Risko & Gilbert 2016, *TiCS* 20): ciò che si scarica fuori si ricorda meno. *Saving-enhanced memory* (Storm & Stone 2015, *Psych. Science* 26(2)): salvare libera risorse per imparare il materiale dopo.
- *Luhmann* ("Kommunikation mit Zettelkästen", 1981, in *Öffentliche Meinung und sozialer Wandel*, Westdeutscher Verlag, pp. 222–228): lo schedario come **seconda memoria** ("Zweitgedächtnis") e **partner di comunicazione** capace di sorprendere. Circa 90.000 schede in due raccolte (circa 24.000 dal 1952 al 1962, circa 66.000 dal 1963 al 1996, dati dell'archivio di Bielefeld). Principi (da verificare sul testo): **posizione fissa** e nessun ordine per argomento; numerazione a ramificazione; un **indice per parole chiave con pochi ingressi per voce**; rinvii incrociati. "Senza scrivere non si pensa" è attribuita a questo saggio (collocazione da verificare).

**Che cosa ne segue.**
- **`validata` è il quarto criterio di Clark & Chalmers.** L'archivio diventa parte della mente solo se l'utente lo **accetta automaticamente**. Ma l'accettazione automatica è giustificata solo per ciò che ha **approvato in passato**. Una proposta dell'AI scivolata senza marca diventa una falsa credenza dell'utente. Il confine tra validato e proposto è la ragione d'essere del sistema, non un'aggiunta. Da scrivere così nel CLAUDE.md nuovo.
- **Disponibile e accessibile: il telefono, in secondi.** Una risposta deve arrivare in 2–3 righe, con il dettaglio a richiesta. La lentezza rompe il primo criterio più di qualsiasi difetto di schema.
- **L'AI come partner transattivo.** L'utente non deve ricordare *che cosa* ha salvato, ma ricordarsi di **chiedere**. L'AI è "quello che sa dove sta". Ne segue una ricetta: *"ho già qualcosa su questo?"* all'inizio di ogni cattura, detta in una riga ("ne hai già 3 su Galimberti, l'ultima a settembre").
- **Contro l'offloading: un gesto proprio.** Scaricare tutto fuori fa ricordare meno. Il `## Perché mi colpisce` scritto dall'utente (anche tre parole) e il richiamo attivo (§6) sono il contrappeso: costano poco e tengono la memoria dentro la testa oltre che fuori.
- **Luhmann: posizione fissa, pochi ingressi, sorpresa.**
  - Posizione fissa: lo slug non cambia mai (`slug-precedente` per la migrazione). Confermato.
  - **Le porte del tema.** La pagina di un tema non elenca 200 frammenti: mostra **3–5 porte** (il prototipo e pochi frammenti scelti), da cui si segue la catena dei legami. L'elenco completo resta sotto. È l'indice parsimonioso di Luhmann.
  - Il partner sorprende solo se ha una complessità propria e **non rispecchia** l'utente: per questo servono le sorprese (§3), il sogno (§7) e la coda lunga (§6). Un archivio che restituisce solo ciò che l'utente si aspetta è uno specchio, non un partner.

**Dove la metafora inganna.** Il taccuino di Otto non ha opinioni. L'AI sì: ha i suoi schemi, le sue parole preferite, le sue convergenze facili. La mente estesa con un'AI è **una memoria transattiva con un partner che ha un'agenda involontaria**. Per questo i campi che solo l'utente può dare (`pancia`, `reazione`, `perché mi colpisce`, `fondante`, `periodo`, `io sono`) non vanno mai compilati dall'AI, nemmeno come proposta precompilata.

---

## 9. Il modello che ne deriva

### 9.1 Livelli (dal sensoriale al sé)

| livello | unità | che cos'è | chi lo crea | analogo |
|---|---|---|---|---|
| 0. Tracce | allegati, link, pin, momenti | il sensoriale | l'utente | i "raggi" (hub-and-spoke) |
| 1. Episodi | `frammento` | indice di una congiunzione: verbatim, quando, contesto, pancia | l'utente (cattura) | l'indice ippocampale |
| 2. Conoscenza | `persona`, `opera`, `citazione`, `simbolo`, `tradizione` | invarianti con alias | l'utente le nomina, l'AI le struttura | concept cells, il "mozzo" |
| 3. Schemi | `tema` (livello di base, con `prototipo`), `emozione` | ciò di cui le cose parlano | semi-chiuso, nuovo = proposto | schemi (Tse, SLIMM) |
| 4. Tempo vissuto | **`vicenda`** (giorni-mesi), **`periodo`** (anni) | il tempo autobiografico | vicenda: anche l'AI propone; periodo: solo l'utente | eventi generali, periodi di vita |
| 5. Sé | `sguardo` (versionato) con temi di vita, io sono, obiettivi, domande aperte | il working self | l'utente, con proposte marcate | working self, life story |

Accanto: `progetto` (gli obiettivi), `domanda` (le grandi domande, con il Coro), `percorso` (sentieri ordinati), **`raccolta`** (categorie ad hoc: una query salvata con un nome).

### 9.2 Legami

- **Dichiarati**: pochi predicati tipizzati nel frontmatter, come in [proposta](/_progetto/proposta.md) §2.3. Nuovi: `ritorna-su` (frammento → frammento), `in-vicenda` (frammento → vicenda), `in-periodo` (vicenda o frammento → periodo; di solito calcolato dalle date), `prototipo` (tema → frammento o citazione).
- **Proposti**: chiave `proposti:`, invariata.
- **Emergenti, calcolati e mai scritti**: forza dei legami (co-occorrenze nei frammenti, pesate per pancia e ritorni), `vitalita`, `sorpresa` suggerita (nessun tema regge, o contrasto con lo sguardo), vicinanza nel tempo. Li produce `indice.mjs`; nessuno li tocca a mano. Via lo `slug@2`.

### 9.3 Campi nuovi (pochi)

| campo | su | chi | valori |
|---|---|---|---|
| `sorpresa` | frammento | proposta dall'AI, confermata dall'utente | `true` |
| `fondante` | frammento | solo l'utente | `true` |
| `cambia` | frammento con `ritorna-su` | l'utente (o il suo testo) | `true` se la lettura è cambiata |
| `prototipo` | tema | l'utente | slug |
| `dal`, `al` | periodo, vicenda | utente (periodo), AI propone (vicenda) | date |
| `vitalita` | tutti | **calcolato**, non nel frontmatter | 0–1 in `indice.json` |

### 9.4 Dinamiche nel tempo

1. **Cattura** (veloce, cieca): verbatim, link, `stato: grezzo`. Classificazione *congruente / sorprendente / nel mezzo*. "Ne hai già N su questo". Una domanda al massimo, e non suggestiva.
2. **Innesco emotivo**: alla `pancia: 3`, tagging retroattivo sui 7 giorni prima.
3. **Consolidamento settimanale, intercalato e in due fasi**: nuovo + campione di vecchio; prima le sorprese e ciò che tocca obiettivi e domande aperte; poi astrazione (temi, vicende, fusioni, divisioni) e infine un solo legame lontano ("il sogno"). Max 10 proposte e una domanda.
4. **Ritorni**: un ritorno con lettura nuova è un frammento nuovo `ritorna-su`, con `cambia: true` se c'è scarto. Il passato non si riscrive.
5. **Richiamo attivo**: "ti ricordi?" sull'indizio, a intervalli crescenti, scelto per alta importanza e bassa vitalità. Facoltativo.
6. **Accomodamento del sé**: quando le sorprese si accumulano contro lo sguardo, l'AI propone una versione nuova dello sguardo (la vecchia resta). È il momento in cui il sistema "vede" l'evoluzione della filosofia dell'utente, il cuore del suo nucleo.
7. **Oblio della vista**: ciò che è vecchio, grezzo e mai ripreso scende sotto; il succo sale nelle vicende e nei temi.

### 9.5 Che cosa si può chiedere (per processo di memoria)

| processo | domanda tipo | ricetta |
|---|---|---|
| recupero diretto | "quella cosa sui greci vista di sera" | `cerca --indizi` (§1), testo pieno sul verbatim |
| recupero generativo | "cosa pensavo nello stadio assurdista?" | periodo → vicende → frammenti |
| semantico | "citazioni filosofiche sull'amore" | tema + tipo + tradizione (invariata) |
| autobiografico | "com'è cambiato il mio rapporto col dolore?" | stesso tema in periodi diversi; versioni dello sguardo |
| associativo | "con cosa risuona questo?" | diffusione a 2 passi, con il percorso spiegato |
| prospettico | "cosa c'è per il tatuaggio?", "cosa leggo dopo?" | progetto, intenzioni, domande aperte |
| metacognitivo | "che cosa mi sorprende di me?", "cosa ho lasciato sbiadire?" | lista sorprese; alta importanza e bassa vitalità |

### 9.6 Il caso Galimberti, attraverso il modello

1. **Cattura**: `frammenti/2026/20261031-galimberti-spezzone-x.md`, verbatim. "Ne hai già 0 su Galimberti; 12 sull'amore."
2. **Indice**: punta a `umberto-galimberti` (alias: Galimberti), `spettacolo-x` (titolo da chiedere), la citazione (solo se attribuita), proposti `amore`, `i-greci`, `tristezza`, `rapporti`. I nomi dei temi nuovi sono **quelli dell'utente**.
3. **Classificazione**: *amore* → congruente con lo sguardo; *i greci* → nuovo tema, ma con uno schema implicito (Sisifo, Psiche) da proporre come aggancio. Se la frase contraddicesse lo sguardo → `sorpresa`.
4. **Domanda unica**: "Che effetto ti ha fatto, 1–3?" (o il titolo dello spettacolo, se è l'entità ambigua).
5. **Se pancia 3**: "Martedì hai salvato quel brano: c'entra?"
6. **Settimana dopo**: se è il terzo spezzone in quindici giorni, il consolidamento propone la vicenda "le sere con Galimberti", dentro il periodo "stadio assurdista" (se l'utente l'ha nominato).
7. **Un mese dopo**: "Galimberti, sui greci, diceva che l'amore…?". L'utente completa o no; la vitalità si aggiorna.
8. **A dicembre**: un ritorno con lettura cambiata → frammento nuovo `ritorna-su`, `cambia: true`; forse la prima crepa nello sguardo.

---

## 10. Confronto con schema e proposta

**Confermo (ora con una ragione):**
- frammento ed entità separati (indice e corteccia); il verbatim immutabile (corrispondenza); `pancia` e `reazione` solo dell'utente;
- gli `alias` e `trova.mjs` (invarianza delle concept cells); il tipo `citazione` (TAP); slug fissi (Luhmann);
- `proposti:` e `validata` (quarto criterio di Clark & Chalmers); temi semi-chiusi; una domanda al massimo;
- il contesto in una riga, senza altri campi (l'effetto del contesto è piccolo);
- il consolidamento settimanale con max 10 proposte; il `serve-a` verso i progetti.

**Cambio:**
- **Consolidamento**: non solo i frammenti grezzi, ma **intercalato** con un campione di vecchi (CLS), in **due fasi** (astrarre, poi un solo legame lontano), con **priorità alle sorprese** e a ciò che tocca obiettivi e domande aperte (triage).
- **Ritorni**: da date nel frontmatter a **frammenti nuovi** con `ritorna-su` (e `cambia`). Il conteggio dei ritorni lo calcola l'indice.
- **Forza dei legami**: da `slug@2` scritto a mano a **forza calcolata** dalle co-occorrenze.
- **Soglia "≥3 frammenti"**: vale per i **temi** e le **vicende**, non per i **legami**, che possono nascere da un frammento solo.
- **Sguardo**: da testo libero a **working self strutturato** (temi di vita, io sono, obiettivi, domande aperte), versionato.
- **Temi**: al livello di base, con il **nome dell'utente** e un **prototipo**; pagina con **poche porte** invece di elenchi lunghi.
- **"Ti ricordi?"**: da riproposta del frammento a **richiamo attivo sull'indizio**, a intervalli crescenti.
- **Ricetta 8 ("mi sento…")**: non solo emozioni della stessa polarità, ma anche il passo oltre, coerente con lo sguardo.

**Aggiungo:**
- tipi `vicenda`, `periodo`, `raccolta`;
- campi `sorpresa`, `fondante`, `cambia`, `prototipo`; `vitalita` calcolata;
- il **tagging retroattivo** alla `pancia: 3`;
- la classificazione *congruente / sorprendente / nel mezzo* nel `/memo`, e il "ne hai già N";
- la ricerca **per indizi parziali** e la navigazione **generativa** per periodi;
- la **rotazione** con la coda lunga nelle risposte a elenco;
- l'**oblio della vista**;
- tre regole contro la colonizzazione: nomi dei temi dell'utente; domande non suggestive; campi del sé mai precompilati.

**Tolgo o lascio fuori:**
- `polarita` sul frammento (schema §2.7): la dice la `reazione` dell'utente; resta solo sull'emozione;
- più campi di contesto (luogo, compagnia, meteo): non valgono il costo;
- ogni idea di riassumere o "pulire" un frammento vecchio: si semantizza la vista, non il dato.

## 11. Domande aperte (una alla volta, all'utente)

1. "Periodo" e "vicenda": li senti tuoi? Se dovessi nominare il periodo in cui sei, come lo chiameresti?
2. Il "sogno della settimana" (un legame ardito e dichiarato): ti diverte o ti disturba?
3. Il "ti ricordi?": lo vuoi davvero, e quante volte al massimo?
4. Ci sono già, nell'Atlante, ricordi che chiameresti fondanti?

## Fonti principali (per filone)

1. Teyler & DiScenna 1986; Teyler & Rudy 2007; Marr 1971; McClelland, McNaughton & O'Reilly 1995; Squire & Alvarez 1995; Nadel & Moscovitch 1997; Winocur & Moscovitch 2011; Liu et al. 2012; Josselyn & Tonegawa 2020.
2. Conway & Pleydell-Pearce 2000; Conway, Singer & Tagini 2004; Conway 2005; Rathbone, Moulin & Conway 2008; Singer & Salovey 1993; McAdams 2001; Haque & Conway 2001; Uzer, Lee & Brown 2012 (da verificare).
3. Bartlett 1932; Tse et al. 2007 e 2011; van Kesteren et al. 2012; Nader, Schafe & LeDoux 2000; Sevenster, Beckers & Kindt 2013; Bos et al. 2014; Stemerding et al. 2022; Loftus & Palmer 1974.
4. McGaugh 2000 e 2004; Brown & Kulik 1977; Talarico & Rubin 2003; Kensinger 2009; Frey & Morris 1997; Dunsmoor et al. 2015; Lisman & Grace 2005; Lieberman et al. 2007.
5. Collins & Quillian 1969; Collins & Loftus 1975; Meyer & Schvaneveldt 1971; Rosch 1975, 1978; Quiroga et al. 2005; Quiroga 2012; Ison, Quiroga & Fried 2015; Barsalou 1983, 1999, 2008; Patterson, Nestor & Rogers 2007.
6. Tulving & Thomson 1973; Godden & Baddeley 1975; Murre 2021; Smith & Vela 2001; Bower 1981; Eich 1995 (da verificare); Morris, Bransford & Franks 1977; Roediger & Karpicke 2006; Cepeda et al. 2006, 2008; Ebbinghaus 1885; Murre & Dros 2015; Bjork & Bjork 1992; Anderson, Bjork & Bjork 1994; Richards & Frankland 2017; Borges 1942.
7. Friston 2010; Clark 2013; Sio & Ormerod 2009; Wagner et al. 2004; Kounios & Beeman 2014; Raichle et al. 2001; Buckner, Andrews-Hanna & Schacter 2008; Smallwood & Schooler 2015; Baird et al. 2012; Schacter & Addis 2007; Diekelmann & Born 2010; Wilson & McNaughton 1994; Stickgold & Walker 2013; Wamsley et al. 2010; Llewellyn 2013; Lewis, Knoblich & Poe 2018.
8. Clark & Chalmers 1998; Adams & Aizawa 2008; Wegner 1987; Sparrow, Liu & Wegner 2011; Camerer et al. 2018; Risko & Gilbert 2016; Storm & Stone 2015; Luhmann 1981.
