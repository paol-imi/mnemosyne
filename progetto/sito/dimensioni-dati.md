# Le dimensioni dal basso: dai dati veri al modello

Consegna per il coordinatore del sito (novembre 2026). Domanda dell'utente: come **navigare, filtrare e gestire i concetti**
(filosofia, un autore, un pensiero, un sentimento, una canzone, una parola), e come **raggruppare** i concetti in
dimensioni diverse.

Materiale letto (sola lettura):
- su `main`: i 35 frammenti importati con le loro 35 letture; i 52 nodi (8 persone, 6 opere, 2 citazioni, 35 temi,
  1 raccolta); le 60 restituzioni `eredita`, con 177 voci;
- l'Atlante (`tattoo-shit` @ `3a7ea79`): 287 note con frontmatter, i template, le 8 domande, le 7 discipline;
- il modello: `CLAUDE.md`, `schema/frontmatter.json`, `progetto/v2/modello-v3.md`, `progetto/sito/progetto.md`.

Qui ci sono solo conti, nomi di assi e parafrasi. Nessuna frase dell'utente alla lettera e nessun contenuto delicato.

---

## 0. In breve

1. L'archivio distingue bene **chi dice** una cosa (✦ ✧ ◌ ○) e male **che cosa** si dice. Quasi tutto finisce in un
   `parla-di` verso un tema, e quel nodo assorbe insieme sentimento, campo del sapere, tesi, stile grafico e domanda
   esistenziale. Dei 35 temi: 10 sono stati d'animo, 10 concetti, 8 domande, 3 correnti di pensiero, 2 stili di
   tatuaggio, 2 figure.
2. Gli assi chiesti dall'utente esistono già nei dati, ma **solo dentro il percorso del `link`** verso l'Atlante
   (`/emozioni/`, `/concetti/`, `/domande/`, `/stile/`, `/fonti/pensiero/`, `/fonti/opere/`). Nessun campo del
   frontmatter porta il tipo di un'opera, il campo del sapere o la natura del tema. L'importazione ha buttato via la
   classificazione insieme al caos.
3. Nell'Atlante gli assi del sapere erano pieni ma quasi tutti di Claude:
   - `domande` con 445 legami e `filone` su 152 fonti;
   - `origine: claude` su 116 note e `mia` su 7;
   - `risonanza`, il giudizio «a pancia» dell'utente, mai riempita (0 su 34).

   Il caos non stava negli assi. Stava nel fatto che l'AI li riempiva **su ogni legame**, generando proposte da
   validare.
4. **La proposta**: tre campi nuovi, tutti sui **nodi** (circa 50 file) e mai sui frammenti:
   - `tipo` sulle opere;
   - `campo` su persone, opere e temi-corrente;
   - `classe` sui temi.

   Si aggiungono due regole su campi che esistono già (`parla-di come: stato`, `esito` filtrabile) e una regola di
   combinazione nel sito. Il valore di una faccetta su una frase si **calcola** attraverso i legami e non si scrive
   mai. Copre 11 domande su 12; la dodicesima (la parte del corpo per i tatuaggi) resta alla ricerca per parola.

---

## 1. Ordinamento delle carte: gli assi che tornano

### 1.1 Frequenze

Le fonti dei conti sono quattro:
- **F** = i 35 frammenti importati;
- **N** = i 52 nodi;
- **E** = le 177 voci `eredita`;
- **A** = le 287 note dell'Atlante.

Il conteggio dei frammenti è per frammento; quello dell'Atlante è per numero di note che portano il campo.

| asse | F | N | E | A | dove sta oggi in Mnemosyne |
|---|---|---|---|---|---|
| **chi dice** (sua, seme, riportata, altrui, proposta) | 35 | — | 177 | 138 con `origine` | `voce`, `forma`, `altrui`, `legami[].voce` ✔ |
| **forma del frammento** (tesi, domanda, elenco, trascrizione, link nudo, richiesta) | 35 (circa 13 valori) | — | — | `tipo` di nota | in parte `intento`, `altrui`; il resto nessuno |
| **tema** | circa 20 | 35 | — | 187 concetti | `parla-di` ✔ |
| **tipo di cosa** (persona, opera, citazione…) | 18 | 52 | 177 (`cosa`) | 298, la cartella | genere del nodo ✔ |
| **tipo di opera** (canzone, libro, poesia, serie, quadro…) | 9 | 6 opere | 48 voci `opera` | 0 campi: si ricava da `disciplina` e `filone` | **nessuno** (solo il nome) |
| **scopo** (tatuaggio, da leggere, da esplorare) | 15 | 1 raccolta | 34 `serve-a` | 34 idee | `serve-a`, `fruizione` ✔ |
| **persona o autore** | circa 11 | 8 | 53 | 35 `autore`, 46 `influenzato-da` | `nomina`, `autore`, `attribuita-a` ✔ |
| **campo del sapere** (filosofia, psicologia, mito, esoterismo…) | circa 11 (detto esplicitamente in 2) | circa 11 | circa 40 persone `~` | 153 (cartella e `filone`), 29 `disciplina` | **nessuno** |
| **sentimento o stato** | 11 (9 detti, 2 dedotti) | 10 temi | 0 | 89 legami, ma 22 idee su 34 vuote | tema più `come: stato` (usato 1 volta) più `reazione` |
| **posizione o tesi** | 8 | — | 32 `idea` | — | nessuno (le Posizioni si calcolano in `mappa.md`) |
| **domanda esistenziale** (le 8) | 1 (l'accoglienza) | 8 temi | 8 `domanda` | 225 note, 445 legami | tema, indistinto dagli altri |
| **atto verso Claude** (correggi, delega, accogli) | 7 | — | — | — | `ritorna-su`, `intento` ✔ |
| **estetica, stile grafico** | 5 | 2 temi | — | 61 `stile` | tema, indistinto |
| **momento della vita** | 4 | — | — | 12 diari | `vissuto` (una data); la fase della vita non c'è |
| **tensione** | 3 | — | 19 convergenze | 1 concetto | `contraddice` ✔ (di consolida) |
| **lingua** | 3 trascrizioni in inglese | — | — | — | nessuno |
| **epoca** | — | 5 `anno` | — | 128 `anno` | `anno` sulle opere |
| **parte del corpo** (tatuaggi) | 0 | — | — | 20 idee | nessuno |
| **giudizio o reazione** | 3 | — | — | 0 (`risonanza`) | `reazione.verso` |

### 1.2 Assi ortogonali e assi che si confondono

Questi assi sono **ortogonali** e reggono:
- chi dice;
- tempo;
- tipo di cosa;
- scopo;
- fruizione.

Un elemento può avere qualunque combinazione di valori, e i dati la mostrano. Per esempio un libro, da leggere, per i
tatuaggi, detto dall'utente, a ottobre.

Questi assi **si confondono**, e la causa è sempre la stessa: il tema fa da contenitore unico.

- **Tema e sentimento.**
  - In un elenco d'origine stati d'animo e concetti stanno alla pari.
  - Il dolore è insieme un'emozione e la tesi centrale (il dolore come dimensione, oltre la quale vengono amore e
    verità).
  - Caos, libertà e lucidità stavano tra le emozioni dell'Atlante, ma sono concetti.
  - La malinconia non è neanche un tema: sta solo in `parole`.
- **Tema e campo.**
  - Stoicismo, romanticismo e nichilismo sono temi, ma sono correnti.
  - L'esoterismo è stato assorbito nel tema «soglia e mistero».
- **Tema e posizione.** Bene relativo e sacrificio anonimo sono tesi, registrate come temi.
- **Tema e figura.**
  - Napoleone è un alias di un tema («resilienza napoleonica»), non una persona.
  - Il condottiero è un archetipo, non un concetto.
- **Tipo e campo.**
  - L'utente chiama «cultura pop» un territorio: è un campo o un insieme di tipi (serie, anime, band)?
  - Nell'Atlante, `disciplina: arte` con `filone: musica` ospitava due band.
- **Persona e opera.**
  - Deftones e Radiohead sono nodi persona, ma il loro link d'origine punta a `/fonti/opere/`.
  - Nelle `eredita`, sotto `persona` stanno anche Sisifo, Odino, Iside, Psiche e il Milite Ignoto.
  - Sotto `opera` stanno anche un lago, l'Averno, l'alchimia e un rito.
- **Scopo e fruizione.** Un classico stoico è insieme da rileggere (fruizione) e materia per i tatuaggi (scopo). Sono
  due assi: va bene così.
- **Forma e intento.** Domanda, richiesta, delega e correzione portano tutte `intento: salva` oppure `chiedi`.

### 1.3 Casi limite (parafrasi)

1. **Una battuta di un personaggio di una serie.** È insieme citazione, opera, persona di finzione, tema (il sogno) e
   soggetto grafico. Sono cinque assi per un oggetto solo, e devono restare cinque legami, non cinque classi.
2. **Un monologo trascritto** porta una tesi pessimista che non è dell'utente. Una faccetta «posizioni» che la
   raccogliesse attribuirebbe all'utente parole d'altri: la regola 7 di `CLAUDE.md` vale anche per i filtri.
3. **Una poesia inglese trascritta.** L'autore compare solo nella `nota` della lettura, e la posizione (resilienza) è
   dedotta.
4. **Due band e un genere musicale** detti insieme a una malinconia: il genere è insieme un tipo e un tono.
5. **True Detective.** Il nodo si chiama come la serie, lo slug dice «stagione 1». La granularità dell'opera
   (serie, stagione, episodio) è ambigua; il `momento` del legame la risolve senza nodi nuovi.
6. **Le 8 domande** sono codificate due volte: come temi con il punto interrogativo e come `voci[].cosa: domanda`.
7. **Nelle `eredita`, sotto `citazione`** compaiono persone e opere (Jung, Schopenhauer, il Tao Te Ching): il
   riferimento indica la fonte, non il testo.
8. **Due pin d'immagine senza parole.** Il contenuto esiste solo nella descrizione di Claude: non danno nessuna
   faccetta ✦.
9. **Un metodo** («prima il concetto, poi il soggetto», con un registro libero) non è né un sentimento né un tema: è
   uno scopo, o un'estetica.
10. **Nell'Atlante, la stessa cosa in due cartelle**:
    - fenice / fenice-simbolo;
    - albero-della-vita / albero-della-vita-simbolo;
    - tre-metamorfosi in concetti e in percorsi.

    Classificare per cartella moltiplica i nodi. Un campo sul nodo no.

---

## 2. Come era organizzato l'Atlante, e la lezione

- **Cartella = che cos'è** (emozione, concetto, simbolo, stile, fonte, idea, spunto, ricerca).
- **Dentro `fonti/` = un campo del sapere**: pensiero, psicologia, sacro-e-mito, scienza. Ma `opere` e `arte` dicono
  il tipo di oggetto: il criterio è misto. Gli esempi:
  - Jung sta in pensiero con `disciplina: psicologia`;
  - Dante, Borges e Leopardi stanno in opere con `forma: autore`;
  - Pascal sta in scienza.
- **Assi trasversali** (aggiunti il 7 ottobre):
  - le 8 domande, `domande:` su 225 note;
  - le 7 discipline, con 34 filoni (`filone` su 152 fonti);
  - la Mappa come griglia domande × discipline.
- **Le idee di tatuaggio** avevano assi propri:
  - `stato` (seme, in-esplorazione, scelta, tatuata…);
  - `formato` (pezzo singolo, serie, sleeve, patchwork);
  - `placement`;
  - `stile`;
  - `risonanza` da 1 a 5.
- **Chi riempiva**: quasi sempre Claude.
  - `validata: false` su 123 note;
  - la provenienza scritta in prosa («proposta di Claude, da validare») su 125 note;
  - nessun segno di provenienza nei campi.

La lezione per Mnemosyne ha tre parti:

- **Gli assi non erano sbagliati.** L'utente li ha chiesti di nuovo con parole quasi uguali: filosofia, un autore, un
  sentimento, una canzone. Ha approvato la mappa delle domande, accolta poi nel modello come 8 temi ●.
- **Era sbagliato il punto in cui si scrivevano.** L'Atlante metteva la classificazione sui **legami e sulle note di
  contenuto**: ogni fonte riceveva 3 domande, 2 concetti e un'emozione. Erano centinaia di decisioni dell'AI, ciascuna
  una proposta. Un asse sul **nodo del mondo** è invece una sola decisione per nodo, verificabile (Jung è uno
  psicologo, Invictus è una poesia) e quasi mai da discutere.
- **Gli assi «interiori»** (emozione, risonanza, momento) erano previsti ma vuoti. Non vanno inventati dall'AI: si
  riempiono solo con le parole dell'utente.

---

## 3. Il confronto con il modello v3

| asse dai dati | il modello lo cattura? | con quale campo | il sito oggi lo filtra? |
|---|---|---|---|
| chi dice | sì | `voce` del frammento e del legame, `forma: riportata`, `altrui`; ● calcolato | sì, il selettore a tre strati (mie · e accolte · e proposte) |
| tempo | sì | `registrato`, `vissuto`, `momento` sul legame | sì, è la spina (`#/tempo/`) |
| parola | sì | il corpo del frammento | sì, ricerca MiniSearch alla lettera |
| tipo di cosa | sì, grosso | genere del nodo (5 cartelle) | no: il genere compare piccolo in fondo al nodo |
| **tipo di opera** | **no** | solo `voci[].cosa` (brano · libro · film), che sta sulla voce di una restituzione e non sul nodo; `in` verso un album; `momento` («traccia 3») | no |
| **campo del sapere** | **no** | solo se l'utente nomina la corrente, e allora è un tema; principio 9 e Q-nomi | no; il sito ha scartato l'interruttore per discipline dell'Atlante |
| sentimento | in parte | tema (la parola dell'utente), più `parla-di come: stato`, più `reazione` | no: un tema-emozione non si distingue da un tema-concetto |
| tema | sì | `parla-di`; nessuna gerarchia (i sottofili si calcolano, C8c) | sì, dal nodo e da `#/frasi/<slug>` |
| domanda esistenziale | sì, come 8 temi ● | nessun segno che le distingua dagli altri temi | no |
| posizione o tesi | calcolata | Posizioni in `mappa.md`; `contraddice` | no |
| scopo | sì | `serve-a` → raccolta; `scopo` della raccolta | sì, la tavola `#/tatuaggi` |
| fruizione | sì | `nomina.fruizione` | no |
| persona o autore | sì | `nomina`, `autore`, `attribuita-a`, `in`, `cerchia` | sì, dalla pagina del nodo |
| esito di una citazione | sì | `esito` (assente = ⚠) | si vede, non si filtra |
| forma del frammento | in parte | `intento`, `altrui`; il link nudo si calcola | no |
| estetica, stile grafico | come tema | — | no |
| reazione | sì | `reazione.verso` | escluso di proposito (§3.7 del sito) |
| delicato | sì | `delicato` | esclude, non filtra (giusto) |
| epoca, lingua, parte del corpo | no (solo `anno` sulle opere) | — | no |

### Le tre domande centrali

**Le opere hanno un tipo?** No. Lo schema delle opere ammette solo `autore`, `in` e `anno`. Il tipo si legge oggi
solo dal nome o dal percorso del vecchio link: per esempio, Berserk si sa che è un manga perché lo sa chi legge.

Eppure il tipo è la seconda domanda più frequente dell'utente: una canzone, un libro, i film. Lo schema delle voci lo
conosce già (`brano`, `libro`, `film`), ma solo per le restituzioni. È un **buco**.

**Esiste un asse «campo del sapere»?** No. Ci sono tre ragioni per cui manca:
- la regola «i nomi li do io»;
- il rifiuto della griglia per discipline dell'Atlante;
- l'idea che il campo fosse un tema.

La regola, però, riguarda i **nomi dei temi**, cioè le parole con cui l'utente pensa. Che Marco Aurelio sia filosofia
e Jung psicologia è un fatto del mondo (○), come il suo `anno`. Non è un'interpretazione dell'utente.

L'utente stesso divide i suoi territori di partenza in filosofie, religioni e cultura pop. Il buco è reale. Si chiude
senza colonizzare a una condizione: il campo sta sui nodi del mondo, non sui frammenti, e non dà nomi ai temi.

**Un sentimento dove finisce?** In tre posti, nessuno dei quali dice «questo è un sentimento»:
1. un tema con la parola dell'utente (rabbia, gioia, solitudine);
2. `parla-di come: stato`, usato **1 volta** su circa 11 frammenti che nominano uno stato;
3. `reazione`, la reazione a un oggetto.

Manca la classe del tema: senza, il sito non può elencare «i tuoi sentimenti», né rispondere a «quando mi sono sentito
così» separandolo da «quando ho parlato della rabbia come idea».

### I buchi

1. Nessun **tipo** sulle opere.
2. Nessun **campo** su persone, opere e correnti.
3. Nessuna **classe** sui temi. Stato d'animo, concetto, domanda, corrente, figura e stile sono indistinti.
4. `come: stato` è previsto ma quasi mai scritto.
5. **Nessuna regola di combinazione** nel sito. Si entra da una porta (tempo, frase, nodo, parola), non si incrociano
   due porte.
6. I nomi `~Nome` delle `eredita` (Nietzsche, Kant, Sisifo, Friedrich…), circa 100 riferimenti, non sono nodi. Una
   domanda su Nietzsche oggi trova solo la ricerca per parola.
7. `esito` si vede ma non si filtra.
8. Fuori dal minimo: epoca delle persone, lingua, parte del corpo, fase della vita.

---

## 4. Le 12 domande dell'utente

Le domande sono ricavate dalla sua richiesta e dai suoi dati. «Oggi» vuol dire con il modello v3 e il progetto del sito
così come sono.

| # | domanda | oggi | con quale filtro | che cosa manca |
|---|---|---|---|---|
| 1 | Tutto ciò che è filosofia | **no** | — | `campo: filosofia` su persone e opere, più i temi-corrente; poi le frasi che li nominano (un passo di legame) |
| 2 | Le cose su Nietzsche (o su Marco Aurelio) | in parte | pagina del nodo: `nomina`, opere con `autore`, citazioni con `attribuita-a` | Nietzsche è solo un `~Nome` nelle `eredita`: diventa nodo alla prima menzione (regola esistente, «anche una domanda nomina») |
| 3 | Quando mi sono sentito così (rabbia, solitudine) | in parte | tema rabbia, poi le frasi | `classe: stato` per elencare i sentimenti; `come: stato` scritto davvero da smista; la spina del tempo per il «quando» |
| 4 | Una canzone per la malinconia | **no** | — | `tipo: canzone`; la malinconia come tema (oggi sta solo in `parole`). Nei dati non c'è nessuna canzone: la risposta onesta è il vuoto, poi il mondo ○ da Specchio |
| 5 | La parola X | **sì** | ricerca alla lettera | — |
| 6 | I miei pensieri sul dolore | sì | `#/frasi/dolore`, strato «mie» | solo la distinzione tra tesi e menzione; non nel minimo (§5.3) |
| 7 | I film o le serie che volevo vedere | **no** | `fruizione: da-fare` esiste (2 usi) | `tipo: film · serie` per incrociarlo |
| 8 | Tutto quello che viene da True Detective | in parte | nodo opera, `in` (Rust), `attribuita-a` (le battute) | l'aggregazione per `in` nella pagina dell'opera: è sito, non modello |
| 9 | Le mie grandi domande (e che cosa ho detto su «perché soffro») | in parte | i temi-domanda uno per uno | `classe: domanda` per elencarle insieme |
| 10 | Per i tatuaggi: le cose esoteriche, o di mito | **no** | `serve-a tatuaggi` esiste | `campo: esoterismo · mito`, più la combinazione di due faccette |
| 11 | Le citazioni ancora da verificare, o quelle vere | in parte | `esito` si vede | `esito` come faccetta (⚠ · verificata · errata) |
| 12 | A ottobre, sul dolore, solo le mie | in parte | tempo, tema e strato, ma separati | la regola di combinazione (§5.2) |

Fuori dai 12 c'è «le idee per il braccio». La parte del corpo non diventa un asse: sta nel testo e si trova con la
ricerca per parola, come le 20 note dell'Atlante che la portavano.

---

## 5. La proposta: l'insieme minimo di assi

### 5.1 Gli assi

Gli assi sono **nove**. Sei esistono già e vanno solo esposti; tre sono campi nuovi, tutti sui nodi.

| # | asse | si applica a | vocabolario | chi lo riempie | campo nel modello |
|---|---|---|---|---|---|
| 1 | **Chi dice** | frasi, legami | ✦ · ✧ · ● · ◌ (· ○) | calcolato | esiste: `voce` |
| 2 | **Quando** | frasi | mese, giorno; data-tetto per l'importato | calcolato | esiste: `registrato`, `vissuto` |
| 3 | **Parola** | frasi | libero, alla lettera | l'utente, ✦ | esiste: il corpo |
| 4 | **Cosa** (genere e tipo) | nodi; frasi per un passo di legame | genere: persona · opera · citazione · tema · raccolta. Più **`tipo`** dell'opera, chiuso: `canzone · album · libro · poesia · film · serie · anime · fumetto · quadro · scultura · fotografia · testo-sacro · spettacolo` | genere: smista. `tipo`: smista alla creazione se lo dicono le parole dell'utente («la canzone…», «lo spettacolo di…»), altrimenti consolida con verifica. È ○ | **nuovo**: `opere.tipo` (uno) |
| 5 | **Campo** | persone `mondo` e `finzione`, opere, temi-corrente; frasi per un passo | chiuso, 10 valori: `filosofia · psicologia · religione · mito · esoterismo · scienza · letteratura · arte · musica · cinema` | consolida, con verifica; è ○ (fatto del mondo). Sui temi-corrente è ◌, perché è un'interpretazione della parola dell'utente | **nuovo**: `campo`, lista di al più 2, su persone, opere e temi (sui temi solo con `classe: corrente`) |
| 6 | **Tema**, diviso in faccette dalla **classe** | temi; frasi via `parla-di` | il nome resta la parola dell'utente (regola 10). La **classe**, chiusa: `concetto · stato · domanda · corrente · figura · stile` | smista, alla creazione del tema (una parola); consolida corregge. È ◌ e non si mostra con un segno: è una scaffalatura, non una lettura | **nuovo**: `temi.classe` (uno) |
| 7 | **Scopo** | frasi, restituzioni | le raccolte, con il nome dell'utente | esiste | `serve-a` |
| 8 | **Da fare** | legami `nomina` | da-fare · in-corso · fatta | esiste | `fruizione` |
| 9 | **Esito** | citazioni | verificata · simile · errata · non-trovata · ⚠ | esiste | `esito` (si espone e basta) |

Con la classe, i 35 temi di oggi si distribuiscono così:

| classe | temi |
|---|---|
| stato | 10 |
| concetto | 10 |
| domanda | 8 |
| corrente | 3 |
| stile | 2 |
| figura | 2 |

Nel sito diventano quattro faccette leggibili: **Sentimenti** (stato), **Domande**, **Temi** (concetto, figura,
corrente) e, solo dentro la raccolta tatuaggi, **Stile**.

I dieci valori di `campo` danno le parole all'utente in due modi:
- **«Filosofia» nel campo è sapere** (Camus, Marco Aurelio, Zarathustra).
- **«Stoicismo» nel tema è il suo pensiero**: un tema `classe: corrente` con `campo: filosofia`. Le due cose restano
  distinte.

Musica e cinema stanno nel campo perché una band è una persona, e una persona non ha un `tipo`. La «cultura pop» non
è un valore del campo: si ricostruisce come unione di tipi (serie, anime, fumetto, film, canzone), e la vista può
offrirla con quel nome.

**Due regole su campi esistenti:**
- **`parla-di come: stato`.** Smista lo scrive ogni volta che le parole dell'utente dicono uno stato vissuto
  («mi sento…», «ho…»), verso un tema `classe: stato`. Oggi c'è una volta sola.
- **`esito`** entra tra le faccette così com'è. L'assenza vale ⚠.

### 5.2 Come si combinano nel sito

- **L'unità** è la frase ✦, cioè il frammento parlante. La vista «cose» (i nodi) è il secondo modo della stessa
  pagina.
- **Dentro un asse le scelte si sommano (O)**: filosofia o psicologia. **Tra assi diversi si incrociano (E)**:
  filosofia e ottobre e ✦.
- **Una frase ha una faccetta** se nomina, o parla di, un nodo che la porta. È un solo passo di legame, più
  l'`autore` per le opere: Zarathustra ha campo filosofia anche tramite Nietzsche. Mai due passi: niente
  «filosofia» perché un nodo vicino a un nodo è filosofico.
- **I valori senza riscontri non compaiono**, e il vuoto si dice con una riga: «Nessuna canzone tua». Niente contatori
  (§6 del sito), niente «correlati».
- **Lo strato predefinito è ✦.** Le faccette ◌ (temi dedotti, il `campo` di un tema) compaiono solo con «e proposte»
  e restano smorzate.
- **I delicati restano fuori** dai risultati delle faccette, a meno che non sia l'utente a nominarli. Una frase che
  sta solo dentro un frammento delicato non porta faccette.
- **Le persone `cerchia: vita`** non compaiono mai nelle liste delle faccette. Non hanno `campo`. Si raggiungono solo
  scrivendone il nome.
- **L'URL** ha la forma `#/cerca?campo=filosofia&classe=stato&da=2026-10&strato=mie`, sullo stesso indice della
  ricerca: è sito, non modello.

### 5.3 Che cosa resta fuori, e perché

- **`specie` del frammento** (tesi, domanda, ricordo, elenco, trascrizione, richiesta). Servirebbe solo per distinguere
  i «pensieri» (la domanda 6) e le domande poste. È un campo in più su **ogni** lettura: è proprio il genere di
  classificazione per frammento che ha fatto l'Atlante. Rinvio. Le domande poste si avvicinano già con
  `intento: chiedi`.
- **Il filone** (34 valori), la griglia domande × discipline, le emozioni assegnate a ogni fonte, la parte del corpo,
  la risonanza: sono gli assi dell'Atlante pieni di Claude oppure vuoti.
- **L'epoca delle persone e la lingua**: nessuna delle 12 domande li chiede.
- **La posizione o tesi** come asse: resta calcolata (Posizioni, `contraddice`), perché un filtro «le tue tesi»
  rischia di attribuire all'utente le tesi dei testi che ha trascritto (caso limite 2).

### 5.4 Che cosa cambia nel modello

Schema da migrare: `schema: 4`.

| campo | genere | tipo | scrive alla creazione | scrive dopo |
|---|---|---|---|---|
| `tipo` | opere | enum, uno, facoltativo | smista, solo dalle parole dell'utente | consolida (○, verificato) |
| `campo` | persone (non `vita`), opere, temi con `classe: corrente` | lista di enum, al più 2, facoltativa | — | consolida (○ su persone e opere, ◌ sui temi) |
| `classe` | temi | enum, uno, **obbligatorio** dalla v4 | smista (per i temi ✦) e consolida (per i temi ◌) | consolida (correzione) |

Il resto del modello:
- `verifica.mjs`:
  - rifiuta `campo` su una persona `vita`;
  - rifiuta `campo` su un tema che non sia `classe: corrente`;
  - rifiuta valori fuori dal vocabolario.
- `contesto.mjs`: in `mappa.md` una riga «Nodi senza tipo o campo», cioè la coda per consolida, come le «correzioni in
  attesa».
- `CLAUDE.md`, §I quattro tipi e §Un file, un solo scrittore: i tre campi e i loro scrittori. Si aggiunge una frase: il
  campo non dà nomi, i temi restano parole dell'utente.
- La migrazione una tantum (`migra/`), come lettura v2 di consolida:
  - 6 `tipo`;
  - circa 8 `campo` sulle persone;
  - 6 `campo` sulle opere;
  - 3 `campo` sui temi-corrente;
  - 35 `classe`.

  Sono circa 58 valori, ricavabili quasi tutti dal percorso del vecchio `link` (`/emozioni/` → stato, `/domande/` →
  domanda, `/stile/` → stile).

### 5.5 Quanto costa

- **smista**: un valore per ogni tema nuovo (`classe`) e, raramente, un `tipo` quando l'utente dice «la canzone…».
  Più la disciplina di `come: stato`. Nessun campo in più sulle letture.
- **consolida**: i nodi del mondo nati nella settimana senza `tipo` o `campo`, di solito da 0 a 5. Per ciascuno una
  verifica rapida, che è un fatto pubblico su un nome `mondo`: è ammessa. Ogni nodo si classifica **una volta per
  sempre**. Nessuna proposta all'utente, nessuna coda da validare, nessun segno nelle prose.
- **Il sito**: un pannello di faccette sopra la ricerca, la regola E/O e l'aggregazione per `in` nella pagina
  dell'opera. L'indice (`cerca.json`) porta, per ogni frase, gli slug dei nodi a un passo; i valori delle faccette si
  leggono dai nodi.

### 5.6 Dubbi aperti

1. **Delicato.** Il frammento d'origine con l'elenco degli stati interiori nomina l'apatia, ma la sua lettura non porta
   `delicato: true`. Il monologo trascritto tocca l'estinzione volontaria, senza marcatura. `CLAUDE.md` mette l'apatia
   tra i delicati: va deciso se i due frammenti sono delicati, perché la faccetta «Sentimenti» li toccherebbe per
   prima.
2. **Le band.** Deftones e Radiohead sono nodi persona. Con `campo: musica` funzionano, ma un'opera `album` con
   `autore` verso la band sarebbe più fedele. Basta non creare nodi senza una menzione.
3. **Il valore `mito`.** È separato da `religione` perché l'utente li tiene distinti (religioni da una parte, mito e
   esoterismo dall'altra). Se servono meno valori, `religione-e-mito`, come nell'Atlante.
4. **Le discipline dell'Atlante non hanno un ●.** In `r-20261007-0000-eredita-domande` e in U30 le discipline non
   compaiono: l'accoglienza riguarda solo le 8 domande. Il vocabolario del `campo` è quindi una scelta di
   classificazione (○ sui nodi del mondo), non una parola accolta dall'utente.
