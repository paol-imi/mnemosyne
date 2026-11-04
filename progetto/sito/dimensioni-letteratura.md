# Le dimensioni: la letteratura sul raggruppare i concetti in assi

Consegna per il progetto del sito (`progetto/sito/progetto.md`), 4 novembre 2026. Risponde alla richiesta dell'utente:
«sono aperto a diverse idee, ma la fondamentale era proprio la possibilità di navigare, filtrare e gestire i concetti, se
voglio qualcosa legato alla filosofia, ad un autore in particolare, ad un pensiero, un sentimento, ecc... oppure voglio
cercare una canzone, o una parola,.. il tuo compito è capire non solo come, ma come raggruppare i concetti, se magari
"canzone" e "sentimento" sono dimensioni diverse, ecc....»

Le ricerche web sono state fatte solo su temi generali (classificazione, interfacce, emozioni, sistemi), mai sul
contenuto del repository. Ogni affermazione presa da una fonte ha il suo link; "(non verificato)" vuol dire che il
testo primario non è stato letto. Le §1–§5 sono la letteratura; la §6 è la proposta; la §7 i dubbi.

## Che cosa prendere per Mnemosyne

1. **Sì: "canzone" e "sentimento" stanno su assi diversi, e la letteratura dice perché.** Una canzone è una *cosa del
   mondo* che nomino, un'opera di una certa forma (Wikidata la classifica con `P31` → song `Q7366`, MusicBrainz con
   `Work`); un sentimento è *ciò di cui parlo*, un tema. Wikidata tiene separati per regola genere (`P136`), soggetto
   (`P921`) e campo di una persona (`P101`). Le due cose si combinano in AND («le canzoni nei frammenti sulla
   nostalgia») proprio perché non stanno sullo stesso asse (§4.1, §4.3).
2. **Sei assi, più la voce come lente e la parola come campo di ricerca** (§6): *Cose* (opere per forma e citazioni),
   *Persone* (con il ruolo sull'arco), *Temi* (con la loro specie: sentimento, idea, immagine…), *Campo* (filosofia,
   musica…), *Gesto* (penso, chiedo, ricordo, voglio fare, trascrivo), *Tempo*. È PMEST in piccolo (Ranganathan): ogni
   asse risponde a una sola domanda, con un solo principio di divisione (Vickery, CRG).
3. **AND tra assi, OR dentro un asse, conteggio accanto a ogni valore, nessuno zero raggiungibile.** È la lezione più
   solida di Flamenco (Hearst 2003: i vicoli ciechi scendono da 82 a 26) e di Baymard. Su telefono: chip dei filtri
   attivi in una riga che scorre, il totale sempre visibile, un pannello sopra i risultati, filtri live perché
   l'archivio è piccolo e locale (NN/g).
4. **I valori aperti (temi, persone, opere) hanno le parole dell'utente; i vocabolari chiusi sono minuscoli e decisi
   prima.** Le etichette inventate dalla macchina sono instabili tra esecuzioni, duplicate, troppo specifiche e a volte
   allucinate: lo dicono gli autori di TopicGPT. Quindi la macchina non inventa nomi di valori: *sceglie* tra 6–12 valori
   fissi (forma, specie, campo, gesto) e li *congela* (li scrive "consolida", li cambia solo una correzione). È anche la
   risposta al «troppo caos» dell'Atlante: le proposte ◌ non creano valori nuovi.
5. **Il sentimento nominato è un tema ✦, con la sua parola; il tono del frammento non si deduce.** La granularità sta
   nella parola dell'utente (Barrett), non in una ruota da 8 (Plutchik) o 27 categorie (GoEmotions: F1 0,46, e il lutto
   tra le categorie con meno accordo umano). Il solo "verso" che si tiene è quello che c'è già: la `reazione`
   (+ − ±) *verso un'opera*, con le parole esatte, che è un sentimento sul bersaglio e non uno stato d'animo.
6. **Il "pensiero" non è un tema: è una posizione.** Il tema dice di che cosa parlo; la posizione è una mia frase datata
   che sostiene qualcosa (Toulmin, IBIS, AIF, discourse graph). Nel filtro "pensiero" è un valore dell'asse *Gesto*
   («penso»), e le tensioni sono i `contraddice` tra posizioni, già nel modello.
7. **"Filosofia" è un punto di vista, non un argomento: il *Campo* sta sui nodi del mondo, non sui frammenti.** Dewey
   stesso mette lo stesso soggetto in tre discipline. Il campo si dà ◌ a persone `mondo`, opere, citazioni e ai temi
   dotti, da un vocabolario di ~10 voci derivato dalle classi Dewey/UDC; il frammento lo eredita dai nodi che nomina.
   Mai su persone `vita`, mai sui delicati.
8. **La parola si cerca alla lettera; il senso lo chiede Specchio.** Per nomi, citazioni e parole rare il lessicale
   (BM25) batte i modelli densi (BEIR, EntityQuestions); per «che cosa pensavo di…» serve il senso, e lì il modello
   denso è fuori dominio su memo italiani trascritti. Il campo di ricerca resta lessicale (progetto §3.8); i risultati si
   restringono con gli stessi assi.
9. **La voce (✦ ✧ ● ◌ ○) è una lente su tutti gli assi, non un asse.** Per default i valori ✦ prima, i ◌ in un gruppo
   piegato «letti da me»: le proposte non entrano nei conteggi principali.
10. **Il modello oggi ha tre buchi per reggere questi filtri** (§6.4): la *forma* dell'opera (le opere non sanno se sono
    canzoni o libri; solo le restituzioni hanno `cosa: brano · libro · film`), la *specie* del tema e il *campo* dei nodi.
    Il *Gesto* invece si calcola quasi tutto da campi esistenti (`intento`, `altrui`, `fruizione`, `vissuto`, Posizioni).
11. **Che cosa non prendere:** un asse "emozione" inferita sui frammenti; la gerarchia dei temi costruita dalla macchina
    (SKOS `broader` solo se l'utente lo dice); il clustering come navigazione principale (cluster imprevedibili e senza
    nome: Hearst 2006); i tag folksonomici della folla (Last.fm) come sostituto delle parole dell'utente; la
    "database-ite" di Notion e Tana, dove i campi crescono finché nessuno li riempie.

## 1. La classificazione a faccette

### Ranganathan e la Colon Classification

- La Colon Classification (CC) fu concepita tra il 1924 e il 1928 alla Madras University Library e "first published in 1933" ([Satija, ISKO Encyclopedia, "Colon Classification"](https://isko.org/cyclo/colon_classification)).
- Satija divide le edizioni in tre versioni: a faccette rigide (1933-1950), analitico-sintetica (1950-1963), a faccette libere (1963-1987). La sesta edizione è la più "popular, used and stable"; la settima, postuma, fu "discarded by the Indian library profession" ([ISKO, CC](https://isko.org/cyclo/colon_classification)).
- Le cinque categorie fondamentali: "personality, matter, energy, space, and time, famously known as PMEST" ([ISKO, CC](https://isko.org/cyclo/colon_classification)). Ognuna ha il suo simbolo di connessione dalla quarta edizione: virgola per P, punto e virgola per M, due punti per E, punto per S, apostrofo per T. Nella prima versione "The colon was the only connecting symbol for all the facets" (da qui il nome).
  - Energy "manifests actions, activities, processes, and problems"; Space è "the manifestation of geographical and political areas"; Time è "chronological, diurnal, or seasonal" (stessa fonte).
- Ordine di citazione: le categorie vanno "in order of decreasing concreteness", P prima e T ultima; l'ordine sullo scaffale è invertito, dal generale allo specifico. Il principio guida è il wall-picture principle: "Since there cannot be any mural without a wall, so the wall is made the first facet" ([ISKO, CC](https://isko.org/cyclo/colon_classification)).
- I canoni: in ogni piano lavorano "a total of 55 canons, 22 principles, and 13 postulates". Tra i canoni degli array e delle catene: esaustività (un array "should be inclusive of all the classes"), esclusività ("an entity should belong to one and only one array"), estensione decrescente, modulazione ("no link in the chain should be missed") ([ISKO, CC](https://isko.org/cyclo/colon_classification)).
- Contro l'enumerativo: i sistemi enumerativi "provide an exhaustive top down list of all subjects recorded at a given time"; la CC è analitico-sintetica e la notazione deve essere "hospitable to new subjects" ([ISKO, CC](https://isko.org/cyclo/colon_classification)).

### Il Classification Research Group (CRG)

- Il CRG nasce nel febbraio 1952 a Londra (l'idea è del 1950, J.D. Bernal); quindici membri iniziali, tra cui Vickery, Foskett, Coates, Mills, Kyle ([ISKO Encyclopedia, "Classification Research Group"](https://www.isko.org/cyclo/crg)).
- Nel maggio 1955 presenta alla Library Association un memorandum intitolato "The need for a faceted classification as the basis of all methods of information retrieval", poi pubblicato negli atti della Dorking Conference (1957) ([ISKO, CRG](https://www.isko.org/cyclo/crg)). Il titolo varia tra le fonti: altrove "...the basis of all information retrieval", e Wikipedia lo colloca in *Library Association Record* 57(7), 262-268 ([Wikipedia, CRG](https://en.wikipedia.org/wiki/Classification_Research_Group)) (sede esatta non verificata sull'originale).
- Le 13 categorie fondamentali del CRG: "Thing-Kind-Part-Property-Material-Process-Operation-Patient-Product-Byproduct-Agent-Place-Time", proposte negli anni '60 e base della revisione della Bliss (BC2) ([Slavic 2011, preprint arXiv, p. 4](https://arxiv.org/pdf/1705.07058), che rimanda a Hutchins 1975). Nota: nella lista CRG il luogo è "Place", non "Space"; e le categorie sono 13 solo includendo Patient, Product, Byproduct.
- Le liste di Vickery variano nel tempo. L'ISKO Encyclopedia ne riporta una con "Substance (product)", "Organ", "Constituent", "Structure", "Shape", "Property", "Object of action (patient, raw material)", "Action", "Operation", "Process", "Agent", "Space", "Time" ([Hjørland, ISKO, "Facet analysis"](https://isko.org/cyclo/facet_analysis)). Non attribuire a Vickery da solo la lista "Thing, Kind, Part…": è del CRG.
- Avvertenza: le categorie CRG funzionano bene nelle scienze naturali e applicate, meno nelle scienze sociali e umane (riportato da una sintesi di ricerca; non verificato sul testo primario).

### Perché le faccette battono l'enumerazione

- Definizione: "in the enumerative kinds all classes are listed"; nelle faccette le classi "are constructed when needed by combinations of building blocks" ([ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis)).
- Tre vantaggi, che sono la conseguenza di questa definizione:
  1. **Niente esplosione combinatoria.** Un albero enumerativo deve prevedere ogni combinazione (n valori × m valori × ...); le faccette elencano solo i valori e li combinano al bisogno. Ragionamento mio, coerente con la definizione sopra.
  2. **Ospitalità.** Un soggetto nuovo entra come nuovo valore di una faccetta, senza rifare l'albero ([ISKO, CC](https://isko.org/cyclo/colon_classification): notazione "hospitable to new subjects").
  3. **Più punti d'accesso.** Lo stesso oggetto si raggiunge da ogni faccetta; l'ordine di citazione decide solo la sequenza lineare (scaffale, notazione), non l'accesso. In un sistema digitale l'ordine di citazione conta molto meno: resta per l'ordinamento della lista e per le etichette (osservazione mia).
- L'ordine di citazione: "Deciding the citation order ... consists primarily of deciding which classification criterion should be the primary"; regola generale: "reverse the filing order in relation to the citation order" (inversione) ([ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis)).

### Come si scelgono faccette ortogonali

- Il criterio di Vickery: facet analysis è "the sorting of terms in a given field of knowledge into homogeneous, mutually exclusive facets, each derived from single characteristic of division" ([ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis)). Quindi: un solo principio di divisione per faccetta ("Only one characteristic of division should be applied at a time", Parry & Hacker, citati ivi); i valori dentro una faccetta si escludono a vicenda; le faccette tra loro si combinano liberamente.
- **Spiteri 1998**, "A simplified model for facet analysis: Ranganathan 101", *Canadian Journal of Information and Library Science* 23(1/2): 1-30. Unisce i principi di Ranganathan e del CRG in un modello didattico ([annuncio SIGIA-L, 2003](https://asist-archive.ischool.illinois.edu/sigia-l/2003-February/004739.html): "incorporates the principles of facet analysis proposed by both Ranganathan and the CRG"). Motivazione: "The semantic and syntactic structure of Ranganathan's language may serve to hinder easy comprehension" (Spiteri, citata in [ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis)). Elenco dei singoli principi del modello: non verificato (il full text su aifia.org non è più raggiungibile).
- **Broughton**: *Essential Classification* (Facet Publishing, 2004; 2ª ed. 2015) ha un capitolo che segue la sequenza: categorie fondamentali → array → relazioni tra termini → ordine di citazione → ordine dello schedario → inversione ([estratto ALA](https://www.alastore.ala.org/sites/default/files/book_samples/Broughton_2d.pdf), indice). Sulle categorie CRG: "have been found to be sufficient for the analysis of vocabulary in almost all areas of knowledge" (citata in [ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis)).
- **La Barre**: "Facet analysis", *ARIST* 44 (2010): 243-284, doi:10.1002/aris.2010.1440440113 ([scheda Information Today](https://store.infotoday.com/product/arist-44/); full text non letto). Due frasi, citate in [ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis): l'analisi a faccette "is a form of conceptual analysis that collects commonly used terms in a given domain"; "faceted techniques are increasingly being used in the design of web pages".
- Regola pratica che ne viene: si parte dai termini reali del dominio (bottom-up), li si raggruppa per un solo criterio, si verifica che ogni oggetto prenda al più un valore per faccetta (o lo dichiara multivalore), e solo dopo si sceglie l'ordine.

## 2. La ricerca a faccette come interfaccia

### Flamenco (Yee, Swearingen, Li, Hearst, CHI 2003)

- "Faceted metadata for image search and browsing", CHI 2003, pp. 401-408, doi:10.1145/642611.642681 ([PDF, Flamenco](https://flamenco.berkeley.edu/papers/flamenco-chi03.pdf)).
- Studio: "32 art history students explored a collection of 35,000 fine arts images". L'abstract: "90% of the participants preferred the metadata approach overall, 97% said that it helped them learn more about the collection, 75% found it more flexible, and 72% found it easier to use". Nel corpo il dato complessivo è 91% ("91% said they preferred FC to Baseline overall"): le due cifre convivono nel paper.
- Obiettivo esplicito: "avoiding negative consequences like empty result sets or feelings of being lost". Risultato: risultati vuoti 82 volte con il baseline, "only 26 times" con le faccette.
- Query preview: "Every hyperlink that selects a new result set is displayed with a query preview (an indicator of the number of results to expect)". Commento spontaneo di un utente: "The collection seems more complete because I can tell how many are available in different categories from the front page."
- La query corrente è sempre visibile in alto, sopra la lista di categorie per faccetta e i risultati (stesso PDF).
- Il costo: l'interfaccia era "an order of magnitude longer" nei tempi di risposta, eppure preferita.

### Hearst, *Search User Interfaces* (Cambridge UP, 2009), cap. 8

Testo libero: [searchuserinterfaces.com, cap. 8](https://searchuserinterfaces.com/book/sui_ch8_navigation_and_search.html). La navigazione a faccette è al §8.6, categorie contro cluster al §8.9.
- La ricerca parametrica è criticata perché porta "often leading to empty results sets" (§8.6).
- La query è "a conjunction of different categories at different levels of hierarchy" (§8.6.1): AND tra faccette. L'OR dentro una faccetta non è trattato nel capitolo.
- Breadcrumb: "Faceted systems should instead keep the path within each facet in a separate visual component" (§8.6.1). In eBay Express "The ordering of the facets in the query breadcrumbs reflected their order of selection by the user" (§8.6.2).
- Misura: "The facets should not be too wide nor too deep", per evitare "clutter, dead ends, and confusion".
- Nello studio Flamenco, per il compito a una sola faccetta circa metà dei partecipanti preferiva il baseline (§8.6.1): le faccette rendono di più quando si combinano.

### Hearst, "Clustering versus faceted categories" (CACM 49(4), 2006, 59-61)

[PDF](https://flamenco.ischool.berkeley.edu/papers/cacm06.pdf).
- Contro i cluster: "lack of predictability, their conflation of many dimensions simultaneously, the difficulty of labeling the groups".
- A favore delle categorie faccettate: "Study participants find the design easy to understand, flexible, and less likely to result in dead ends."
- Il limite: "the categories of interest must be known in advance, and so important trends in the data may not be shown."
- Un pregio dei cluster da non dimenticare: "their utility for eliminating groups of documents from consideration".

### Hearst, "Design recommendations for hierarchical faceted search interfaces" (SIGIR 2006 Workshop on Faceted Search)

[PDF](https://flamenco.berkeley.edu/papers/faceted-workshop06.pdf). Riassume gli studi Flamenco in raccomandazioni. Il PDF ha caratteri non estraibili: contenuto delle singole raccomandazioni non verificato. Su conteggi, zero e breadcrumb valgono le fonti sopra.

### Tunkelang, *Faceted Search* (Morgan & Claypool, 2009)

Synthesis Lectures on Information Concepts, Retrieval, and Services, circa 80 pagine, doi:10.2200/S00190ED1V01Y200904ICR005 ([DBLP](https://dblp.uni-trier.de/rec/series/synthesis/2009Tunkelang.html)). Copre storia, teoria e pratica della ricerca a faccette. Contenuto dei capitoli non verificato.

### Mobile: Nielsen Norman Group

- Whitenton, "Mobile Faceted Search with a Tray: New and Improved" (NN/g, 26 luglio 2015) ([link](https://www.nngroup.com/articles/mobile-faceted-search/)): le faccette a tutto schermo fanno "work harder to understand how the facet controls affect the results set"; meglio "a 'push-out' style tray on top of the search results", che dà "continuous visibility of results"; "The total number of results is always visible"; il pannello va ancorato a destra, perché il margine sinistro dei risultati "is more likely to have meaningful content"; etichette in parole ("Filter", "Refine"), non icone.
- Sherwin, "Applying Filters: Batch vs. Interactive" (NN/g, 7 febbraio 2016) ([link](https://www.nngroup.com/articles/applying-filters/)): la scelta "will depend on both user intent" e sulla velocità del sito; filtri interattivi (live) "if your users are exploratory in their search"; il batch con pulsante Apply "is the recommended approach on mobile devices, even with the new tray design pattern".

### Mobile ed errori classici: Baymard Institute

- Filtri applicati: senza un riepilogo, tre problemi: "No Obvious and Immediate Confirmation that Filters Have Been Applied", "Not Having a Quick Way to Remove Filters", "Not Having a Context for the Product List"; il 28% dei siti "don't display an overview at all"; su mobile i filtri applicati "can be placed in a horizontally scrolling list above the product list" (chip) ([Reeves, Baymard, 2020, agg. 2026](https://baymard.com/research-articles/how-to-design-applied-filters)).
- AND/OR: i tipi di filtro "should follow an “AND” logic", i valori dentro un tipo "should follow an “OR” logic"; "15% of sites in our benchmark don’t let users select multiple filter options"; i partecipanti cercavano spesso di selezionare più valori ([Olah, Baymard, 2024](https://baymard.com/research-articles/allow-applying-of-multiple-filter-values)). La cifra "98% dei top 50 siti" che circola online non è in questa pagina (non verificato).
- Altri errori misurati da Baymard: il 61% non mette in evidenza i filtri importanti, il 62% non spiega i filtri di settore, il 38% non offre filtri per tutte le informazioni mostrate nella lista ([indice ricerche Baymard](https://baymard.com/research-articles/external-article-state-of-ecommerce-filters)).
- Liste di valori lunghe: la troncatura batte lo scroll interno e la lista completa, ma solo se fatta bene, altrimenti la lista troncata sembra completa ([Baymard, truncation design](https://baymard.com/research-articles/truncation-design); dettagli non letti per intero).
- Pulsante "apply" con il conteggio dei risultati dentro, e "troppe faccette / faccette non pertinenti": guideline Baymard esistenti (es. [#1125](https://baymard.com/guidelines/1125-apply-buttons-in-mobile-filtering-interfaces)) ma dietro abbonamento; contenuto non verificato. Sugli zeri le fonti divergono: valori a zero disabilitati e con conteggio ([Shopify, storefront filtering UX](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering/storefront-filtering-ux)) oppure nascosti. Flamenco li evita mostrando solo i valori presenti nel risultato corrente.

### Lezioni per un archivio personale di frammenti di pensiero visto su telefono

1. **Poche faccette, ciascuna con un solo principio.** Per esempio: quando (tempo), chi (persone), che cosa (opere, citazioni), di che cosa (temi), che voce (✦ ✧ ◌ ○). Sono PMEST in piccolo: tempo e luogo restano faccette a parte, mai mescolate ai temi. Un valore che risponde a due domande va diviso.
2. **Conteggio accanto a ogni valore, mai uno zero raggiungibile.** In un archivio piccolo un vicolo cieco pesa più che in un catalogo: si mostrano solo i valori presenti nel risultato corrente, con il loro numero (Flamenco). Il conteggio dice anche quanto è pieno l'archivio ("collection seems more complete").
3. **AND tra faccette, OR dentro una faccetta, e la query sempre visibile.** Chip dei filtri attivi in una riga che scorre in orizzontale sopra i risultati, ciascuno rimovibile con un tocco. Il totale dei risultati resta sempre a vista.
4. **Su telefono: un pannello sopra la lista, non un'altra pagina.** Va bene il filtro live se la risposta è istantanea (l'archivio è piccolo e locale). Il pulsante "applica" con il numero serve solo se il calcolo è lento. Le etichette vanno scritte in parole, e l'elenco dei valori si tronca intorno ai dieci con un "altri" ben visibile.
5. **Le categorie vanno decise prima, con le parole di chi scrive; il resto lo mostra la ricerca.** Le faccette nascondono ciò che non si era previsto (Hearst 2006). Per i temi che emergono servono un ingresso testuale libero e un posto per l'inatteso. L'ospitalità vuol dire che una parola nuova diventa un valore nuovo senza ristrutturare niente.

## 3. I vocabolari

### 3.1 SKOS

- Stato: "W3C Recommendation 18 August 2009" ([SKOS Reference](https://www.w3.org/TR/skos-reference/)).
- Classi: `skos:Concept`, `skos:ConceptScheme` (lo schema che raccoglie i concetti), `skos:Collection` (gruppi etichettati o ordinati di concetti) ([SKOS Reference](https://www.w3.org/TR/skos-reference/)).
- Relazioni semantiche: `broader`, `narrower` (gerarchiche), `related` (associativa).
- La gerarchia **non è transitiva**: "Note that skos:broader is not a transitive property" (§8.6.6). La chiusura transitiva c'è (`skos:broaderTransitive`), ma "By convention, the properties skos:broaderTransitive and skos:narrowerTransitive are not used to make assertions" (§8.1) ([SKOS Reference](https://www.w3.org/TR/skos-reference/)). In pratica: si scrive solo il legame diretto; la catena si calcola, non si dichiara. È una buona norma per qualunque sistema che separa il dichiarato dal calcolato.
- Etichette: `prefLabel`, `altLabel`, `hiddenLabel` "are each sub-properties of rdfs:label" (§5.3). Vincolo d'integrità: "A resource has no more than one value of skos:prefLabel per language tag" (§5.4). Le etichette nascoste servono "where a knowledge organization system is being queried via a text index" (§1.2): cioè i refusi e le varianti che si cercano ma non si mostrano ([SKOS Reference](https://www.w3.org/TR/skos-reference/)).
- Collezioni: "SKOS concept collections are labeled and/or ordered groups of SKOS concepts" (§9.1); "skos:Concept and skos:Collection are disjoint classes" (§9.6.4) ([SKOS Reference](https://www.w3.org/TR/skos-reference/)). Una raccolta non è un concetto: un raggruppamento d'uso ("i tatuaggi") non deve finire nella gerarchia dei temi.

### 3.2 Folksonomie contro vocabolario controllato

- Il termine. Thomas Vander Wal lo conia sulla lista dell'IA Institute (allora AIFIA) il 24 luglio 2004, rispondendo a Gene Smith; "folk classification" era stato proposto da Eric Scheid. Definizione: "Folksonomy is the result of personal free tagging of information and objects (anything with a URL) for one's own retrieval" ([Vander Wal, Folksonomy Coinage and Definition](https://vanderwal.net/folksonomy.html)). Nota: "for one's own retrieval", il recupero personale, non la condivisione.
- Mathes, dicembre 2004, "Folksonomies - Cooperative Classification and Communication Through Shared Metadata". Forza: "Perhaps the most important strength of a folksonomy is that it directly reflects the vocabulary of users". Debolezza: "The problems inherent in an uncontrolled vocabulary lead to a number of limitations and weaknesses in folksonomies" (ambiguità, sinonimi) ([Mathes 2004](https://adammathes.com/academic/computer-mediated-communication/folksonomies.html)).
- Golder & Huberman, "Usage patterns of collaborative tagging systems", *Journal of Information Science* 32(2), 198–208, 2006, DOI [10.1177/0165551506062337](https://journals.sagepub.com/doi/10.1177/0165551506062337) ([PDF](https://collablab.northwestern.edu/CollabolabDistro/nucmc/GolderAndHuberman-usage%20patterns%20collab%20tagging.pdf)). Preprint del 2005 con altro titolo ("The Structure of Collaborative Tagging Systems"): trovano "a remarkable stability in the relative proportions of tags within a given url" su Del.icio.us e la spiegano con imitazione e conoscenza condivisa ([arXiv cs/0508082](https://arxiv.org/abs/cs/0508082)). Discutono tre problemi comuni a tag e tassonomie: **polisemia**, **sinonimia**, **variazione del livello base** (il livello di specificità a cui una persona nomina la cosa: "gatto" o "animale" o "siamese", da Rosch) ([PDF](https://collablab.northwestern.edu/CollabolabDistro/nucmc/GolderAndHuberman-usage%20patterns%20collab%20tagging.pdf); l'estensione della trattazione non l'ho letta per intero).
- Shirky, "Ontology is Overrated: Categories, Links, and Tags", 2005 ([shirky.com](https://shirky.com/writings/herecomeseverybody/ontology_overrated.html), sito irraggiungibile al momento; [scheda BibSonomy](https://bibsonomy.org/bibtex/22e9cc2bd3d99096ad62c3277ca7e1977/blees)). Tesi: le categorie decise in anticipo funzionano per domini piccoli, stabili, con catalogatori esperti e utenti che ne condividono la visione; sul web vincono link e tag liberi, e il senso emerge a posteriori dall'aggregato (non verificato alla lettera). La risposta di Peter Merholz: chi difende i tag "underestimate the loss from erasing difference of expression" (parafrasi riportata, non verificata) ([peterme.com](https://www.peterme.com/?p=295)).
- Lezione comune: il vocabolario libero rispecchia l'utente ma soffre di sinonimi, omonimi e livelli diversi; il vocabolario controllato risolve quei problemi ma impone una visione. SKOS tiene le due cose separate: una `prefLabel` per concetto, le varianti negli `altLabel`/`hiddenLabel`.

### 3.3 Faccette e gerarchie che emergono dai dati

- **Scatter/Gather** (Cutting, Karger, Pedersen, Tukey, SIGIR 1992, pp. 318–329, DOI 10.1145/133160.133214): il clustering non serve a migliorare la ricerca ma come modo di accesso in sé; si sfoglia la collezione per gruppi, si raccolgono quelli scelti e si riclusterizza ([scheda Webis](https://ir.webis.de/anthology/1992.sigirconf_conference-92.30)). Le etichette dei cluster sono parole frequenti, non nomi: il problema dell'etichetta nasce qui.
- **Castanet** (Stoica, Hearst, Richardson, "Automating Creation of Hierarchical Faceted Metadata Structures", NAACL-HLT 2007, pp. 244–251) ([ACL Anthology](https://aclanthology.org/N07-1031/); [PDF](https://biotext.ischool.berkeley.edu/papers/castanet.pdf)). Dalle descrizioni testuali degli oggetti prende i termini, risale i loro iperonimi in WordNet, costruisce un albero, lo comprime e lo divide in faccette; usa solo la relazione IS-A ([demo Flamenco](https://flamenco.berkeley.edu/castanet_demo.html)). Pensato come semiautomatico: l'umano rifinisce. Precursore: Stoica & Hearst 2004, "Nearly-Automated Metadata Hierarchy Creation" (non verificato oltre la citazione).
- **Dakka & Ipeirotis**, "Automatic Extraction of Useful Facet Hierarchies from Text Databases", ICDE 2008 ([scheda Sciweavers](https://www.sciweavers.org/node/19918)). Osservazione chiave: i termini di faccetta raramente compaiono nei documenti; servono risorse esterne (WordNet, Wikipedia) per espandere le frasi importanti con frasi di "contesto". Prima, CIKM 2005 "Automatic construction of multifaceted browsing interfaces" ([Sciweavers](https://www.sciweavers.org/node/120268)). Lezione: la parola giusta per la faccetta spesso non è quella del testo; ma importarla dall'esterno allontana dal lessico dell'utente.

### 3.4 Tassonomie ed etichette generate da LLM

- **BERTopic** (Grootendorst, 2022): embedding, riduzione, clustering, poi rappresentazione dei topic con un "class-based variation of TF-IDF" ([arXiv 2203.05794](https://arxiv.org/abs/2203.05794)). La libreria permette di far generare l'etichetta a un LLM dalle parole chiave del cluster ([GitHub](https://github.com/MaartenGr/BERTopic); metodo `generate_topic_labels()`).
- **TopicGPT** (Pham et al., NAACL 2024; [arXiv 2311.01449](https://arxiv.org/abs/2311.01449)). Il modello genera i topic e poi li assegna, con una citazione di supporto per documento. Fatti utili: il raffinamento serve a "merge near-duplicate pairs" ed "eliminate topics with low frequency of occurrence"; "most of the generated topics are overly specific with a low frequency of occurrence"; serve "a parser to identify hallucinated or invalid assignments"; e "TopicGPT produces slightly different outputs between two runs with identical settings" (P₁ 0,95 tra due esecuzioni) ([arXiv HTML v2](https://arxiv.org/html/2311.01449v2)). Cioè: duplicati, frammentazione, invenzioni e instabilità sono documentati dagli autori stessi.
- **TnT-LLM** (Wan et al., Microsoft, [arXiv 2403.12173](https://arxiv.org/abs/2403.12173), marzo 2024). Due fasi: (1) l'LLM costruisce e rifinisce iterativamente una tassonomia di etichette, zero-shot, a più passi di ragionamento; (2) l'LLM etichetta un campione che addestra classificatori leggeri da usare in scala. Applicato agli intenti e ai domini delle conversazioni di Bing Copilot. Motivazione: i metodi classici "rely heavily on domain expertise and manual curation, making the process expensive and time-consuming".
- **Instabilità tra esecuzioni**: un confronto su tassonomie nel dominio dell'ingegneria del software ripete la generazione cinque volte e misura lo scarto; TnT-LLM risulta meno stabile di CLIMB sulle metriche strutturali ([arXiv 2608.01592](https://arxiv.org/pdf/2608.01592), letto solo in sintesi). Su tabelle, GeTT mostra deviazioni standard da 0,089 a 0,288 nel punteggio di coerenza della tassonomia ([arXiv 2503.21810](https://arxiv.org/pdf/2503.21810), sintesi). Yearsley e Kurteva propongono una misura di stabilità indipendente dai nomi (coppie di categorie sorelle in tutte le esecuzioni / in almeno una) e una tassonomia di consenso dalle ricorrenze ([CEUR-WS Vol-4293, paper 38](https://ceur-ws.org/Vol-4293/paper38.pdf); non verificato: PDF non leggibile dallo strumento). La sensibilità a piccole variazioni dell'input rende instabile anche la valutazione ([LiTe, arXiv 2504.01369](https://arxiv.org/html/2504.01369v1)).
- **Rischi riassunti** (con evidenza diretta dove c'è):
  - incoerenza e duplicati quasi uguali: TopicGPT deve fonderli;
  - granularità sbagliata, troppo specifica o troppo larga: TopicGPT ("overly specific", "too narrow/broad");
  - allucinazione nell'assegnazione: TopicGPT (parser dedicato);
  - instabilità tra esecuzioni identiche: TopicGPT, 2608.01592, 2503.21810;
  - deriva nel tempo (etichette che cambiano col modello o col prompt): non ho trovato uno studio diretto su archivi personali (non verificato); è però la conseguenza dell'instabilità sopra, sommata a ogni cambio di lettore;
  - etichette generiche: le parole chiave del clustering (Scatter/Gather, c-TF-IDF) tendono al frequente; l'LLM tende al nome di categoria comune (non verificato con uno studio specifico).

## 4. Le dimensioni dell'utente

### 4.1 I tipi di cose

#### 4.1.1 FRBR (IFLA, 1998)

- Rapporto finale approvato nel settembre 1997, pubblicato nel 1998, emendato fino a febbraio 2009; sostituito da LRM nel 2017 ([Dublin Core MSI, scheda FRBR](https://msi.dublincore.org/standards/frbr)). Il PDF IFLA ([frbr_2008.pdf](https://www.ifla.org/files/assets/cataloguing/frbr/frbr_2008.pdf)) ha risposto 403: definizioni lette da fonti secondarie ([RDA Demystified, FSU](https://myweb.fsu.edu/aglerum/assets/RDA-Demystified-1-Fundamentals-of-FRBR.pdf)).
- Gruppo 1: **Work** (creazione intellettuale o artistica), **Expression** (sua realizzazione: un testo, una traduzione, un'esecuzione), **Manifestation** (incarnazione fisica di un'espressione: un'edizione), **Item** (un esemplare).
- Gruppo 2: **Person**, **Corporate Body**, responsabili delle entità del gruppo 1.
- Gruppo 3: **Concept**, **Object**, **Event**, **Place**, come soggetti delle opere (più, come soggetti, le entità dei gruppi 1 e 2).
- La formula "a distinct intellectual or artistic creation" per Work la trovo citata da MusicBrainz ([MusicBrainz Entity](https://musicbrainz.org/doc/MusicBrainz_Entity)); nel testo IFLA non l'ho verificata.

#### 4.1.2 IFLA LRM (2017)

- Consolida FRBR, FRAD, FRSAD; adottato dal Professional Committee IFLA il 18 agosto 2017 ([repository IFLA](https://repository.ifla.org/handle/123456789/47); [testo approvato, .docx su CIDOC-CRM](https://site2024.cidoc-crm.org/sites/default/files/IFLA%20LRM_approved_20170818_0.docx), non letto per intero).
- Entità: Res, Work, Expression, Manifestation, Item, Agent (Person, Collective Agent), Nomen, Place, Time-span (elenco da fonti secondarie, [DC-2017](https://dcevents.dublincore.org/IntConf/dc-2017/paper/download/499/606)).
- **Res**: "Any entity in the universe of discourse" ([mappatura LRM→LRMoo](https://site2024.cidoc-crm.org/sites/default/files/mapping_LRM_to_LRMoo_2.0%28MR%29.doc)). Sostituisce il "Thema" di FRSAD: qualunque cosa può essere soggetto ([DC-2017](https://dcevents.dublincore.org/IntConf/dc-2017/paper/download/499/606)).
- **Nomen**: "An association between an entity and a designation that refers to it" ([Zeng, Getty 2020](https://www.getty.edu/research/tools/vocabularies/m_zeng_visual_nomen_itwg2020.pdf)). Il nome è un'entità a sé, con la sua stringa: in FRBR era un attributo. È la mossa che rende pensabili alias, nomi sbagliati e correzioni come dati.
- Il gruppo 2 di FRBR diventa Agent; i soggetti diventano una relazione Work "has as subject" Res (non verificato sul testo).

#### 4.1.3 BIBFRAME 2.0 (Library of Congress)

- Tre livelli, non quattro ([BIBFRAME 2.0 Model](https://www.loc.gov/bibframe/docs/bibframe2-model.html)): **Work** "reflects the conceptual essence of the cataloged resource" (autori, lingua, soggetto); **Instance**, "individual, material embodiments, for example, a particular published form"; **Item**, "an actual copy (physical or electronic) of an Instance". Expression e Work di FRBR sono fusi nel Work.
- Classi di contorno: **Agent**, "Agents are people, organizations, jurisdictions, etc.", legati a Work o Instance tramite un ruolo; **Subject**, "A Work might be 'about' one or more concepts"; **Event**, "Occurrences, the recording of which may be the content of a Work" (stessa fonte).
- Lezione: il ruolo (autore, illustratore) sta sulla relazione, non sulla persona.

#### 4.1.4 MusicBrainz

- Entità principali: Artist, Event, Label, Place, Recording, Release, Release Group, Series, URL, Work ([MusicBrainz Entity](https://musicbrainz.org/doc/MusicBrainz_Entity)).
- **Work**: la composizione dietro una o più registrazioni. **Recording**: dati audio unici con titolo, artist credit, durata. **Release Group**: l'"album" astratto. **Release**: il prodotto concreto (data, paese, etichetta, barcode). **Artist**: musicista, gruppo, ma anche collaboratore non musicale o personaggio di finzione (stessa fonte).
- Autore e interprete si distinguono con le **relazioni**: Composer, Lyricist (o Writer quando non si sa) puntano al Work; i performer (subtipi "instruments", "vocal") alla Recording ([Style/Relationships](https://musicbrainz.org/doc/Style/Relationships)). Esempio della guida: i Mogwai che scrivono un brano strumentale si accreditano con "Composer" invece di "Writer".
- Lezione: "la canzone" è ambigua tra opera (Work) e incisione (Recording); chi la canta non è per forza chi l'ha scritta, e il modello lo dice con due archi diversi.

#### 4.1.5 Wikidata

Id controllati sull'API e sulle pagine di Wikidata il 4 novembre 2026.

- **P31** instance of; **P279** subclass of: "K2 is an instance of mountain; volcano is a subclass of mountain" ([P31](https://www.wikidata.org/wiki/Property:P31), [P279](https://www.wikidata.org/wiki/Property:P279)).
- **Q5** human; **Q7725634** literary work, "written work read for enjoyment or edification"; **Q47461344** written work; **Q7366** song, "musical composition for voice(s)" ([Q5](https://www.wikidata.org/wiki/Q5), [Q7725634](https://www.wikidata.org/wiki/Q7725634), [Q47461344](https://www.wikidata.org/wiki/Q47461344), [Q7366](https://www.wikidata.org/wiki/Q7366)).
- Musica, tre voci vicine e distinte: **Q2188189** musical work, "generic term for any work of art related to music" (comprende album e film musicali); **Q207628** composed musical work ("musical composition"), sottoclasse di Q2188189; **Q105543609** musical work/composition, "legal concept of uniquely identifiable piece or work of music", esclude registrazioni e copie, pensata per P31 e per assorbire "musical composition", "song", "symphony" ([Q2188189](https://www.wikidata.org/wiki/Q2188189), [Q207628](https://www.wikidata.org/wiki/Q207628), [Q105543609](https://www.wikidata.org/wiki/Q105543609)). Anche Wikidata ha dovuto rattoppare la stessa ambiguità opera/incisione.
- Proprietà: **P50** author, "main creator(s) of a written work (use on works, not humans)"; **P175** performer; **P86** composer, "[for lyricist, use "lyrics by" (P676)]"; **P921** main subject, "primary topic of a work"; **P136** genre, con la nota "Use main subject (P921) to relate creative works to their topic"; **P101** field of work, "specialization of a person or organization"; **P1441** present in work, per entità di finzione ([P50](https://www.wikidata.org/wiki/Property:P50), [P175](https://www.wikidata.org/wiki/Property:P175), [P86](https://www.wikidata.org/wiki/Property:P86), [P921](https://www.wikidata.org/wiki/Property:P921), [P136](https://www.wikidata.org/wiki/Property:P136), [P101](https://www.wikidata.org/wiki/Property:P101), [P1441](https://www.wikidata.org/wiki/Property:P1441)).
- Lezione: genere (P136) e soggetto (P921) sono separati per regola; il campo di una persona (P101) è un'altra cosa ancora.

#### Cinque lezioni per un archivio personale dove la macchina deriva la struttura e l'utente non tagga nulla

1. **Il nome viene dall'utente, la struttura dalla macchina.** Vander Wal definisce la folksonomia "for one's own retrieval" e Mathes ne vede la forza nel riflettere "the vocabulary of users": la `prefLabel` deve essere la parola che l'utente ha scritto; le forme dotte, i sinonimi e i refusi vanno in `altLabel`/`hiddenLabel`. L'esperienza di Dakka & Ipeirotis (la parola di faccetta spesso manca nel testo) è un motivo per cercare fuori, non per rinominare.
2. **Dichiarare poco, calcolare il resto.** SKOS vieta per convenzione di asserire `broaderTransitive`; allo stesso modo l'archivio dovrebbe scrivere solo legami diretti, ciascuno con la sua prova, e derivare catene, raggruppamenti e conteggi. Raccolte d'uso e temi sono classi disgiunte (`Collection` ≠ `Concept`).
3. **Le etichette della macchina sono instabili: vanno congelate e versionate.** TopicGPT dà output diversi a parità di impostazioni, produce duplicati da fondere, topic troppo specifici e assegnazioni allucinate; i confronti su più esecuzioni mostrano scarti strutturali. Quindi: un'etichetta nata non si rigenera a ogni passaggio; si fonde (lapide, redirect) o si corregge con una traccia; ogni assegnazione porta il passo del testo che la giustifica, come la citazione di supporto di TopicGPT.
4. **Distinguere i tipi dove l'ambiguità costa.** Opera, interpretazione, esemplare (FRBR, BIBFRAME, MusicBrainz) e i ruoli sulle relazioni (P50, P86, P676, P175; Composer contro performer): "la canzone di X" va risolta tra autore e interprete prima di diventare un nodo, perché l'errore resta. Basta poco: opera e persona, con il ruolo sull'arco; il resto solo se serve.
5. **Il nome è un dato, non un attributo.** Con il Nomen di LRM alias, nomi sbagliati e attribuzioni errate diventano oggetti con storia (chi l'ha chiamato così, quando). Tenere separati "come l'ha chiamato l'utente" (`attribuita-a`) e "come è" (verificato), e tenere distinti genere, soggetto e campo (P136, P921, P101): un tema non è un genere, e un sistema senza tag umani non ha altro modo di correggersi che questa doppia registrazione.

### 4.2 Discipline e domini

**Dewey (DDC).** Il sommario ufficiale OCLC (DDC 22) dice: "In the DDC, basic classes are organized by disciplines or
fields of study" ([OCLC, *DDC Summaries*, 2003, p. 1](https://www.oclc.org/content/dam/oclc/dewey/resources/summaries/deweysummaries.pdf)).
Le dieci classi: 000 Computer science, information & general works; 100 Philosophy & psychology; 200 Religion; 300
Social sciences; 400 Language; 500 Science; 600 Technology; 700 Arts & recreation; 800 Literature; 900 History &
geography. Le divisioni della 100: 110 Metafisica, 120 Epistemologia, 130 Parapsicologia e occultismo, 140 Scuole
filosofiche, 150 Psicologia, 160 Logica, 170 Etica, 180 Filosofia antica, medievale e orientale, 190 Filosofia
occidentale moderna (stessa fonte, "Second Summary"). Il punto decisivo per noi è lo stesso documento: "A subject may
appear in more than one discipline": l'abbigliamento sta in 155.95 (psicologia), 391 (costumi) o 746.92 (moda) secondo
il punto di vista. Cioè la disciplina non è l'argomento: è l'angolo da cui lo si guarda. Lo stesso tema si sparpaglia.

**UDC.** Classi 0 Scienza e conoscenza; 1 Filosofia, psicologia; 2 Religione; 3 Scienze sociali; 4 vacante; 5
Matematica e scienze naturali; 6 Scienze applicate; 7 Arti, svago, sport; 8 Lingua e letteratura; 9 Geografia e storia.
Gli ausiliari comuni sono faccette che si combinano con qualunque classe: lingua `=…`, forma `(0…)`, luogo `(1/9)`,
etnia `(=…)`, tempo `"…"`, caratteristiche generali `-0…` (proprietà, materiali, relazioni, persone). L'UDC si definisce
"an analytico-synthetic and/or faceted classification" che "allows an unlimited combination of attributes of a subject"
([UDC Consortium, *Structure*](https://udcc.org/index.php/site/page?view=about_structure)). Lezione: le faccette
trasversali (tempo, luogo, forma, persona) servono più dell'albero delle discipline.

**Wikidata.** `Q11862829` "academic discipline": "field of study organized around a distinct body of knowledge,
theories, methods, or subject matter", sottoclasse di "field of study" (Q1047113)
([Wikidata Q11862829](https://www.wikidata.org/wiki/Q11862829)). `P101` "field of work": "specialization of a person
or organization" ([Wikidata P101](https://www.wikidata.org/wiki/Property:P101)): si applica a persone e organizzazioni,
non a testi. Per un'opera si usa `P921` "main subject": "primary topic of a work or act of communication"
([Wikidata P921](https://www.wikidata.org/wiki/Property:P921)). Anche Wikidata, dunque, separa il campo di una persona
dall'argomento di un'opera; e un "campo del sapere" per un frammento non ha una proprietà propria: passerebbe per P921
che punta a una disciplina.

**Aboutness (Hutchins 1978).** W. J. Hutchins, "The concept of 'aboutness' in subject indexing", *Aslib Proceedings*
30(5), 172–181, [doi:10.1108/eb050629](https://doi.org/10.1108/eb050629). Preferiva "aboutness" a "subject" perché
toglieva alcuni problemi epistemologici; Hjørland (1992, 1997) ha replicato che gli stessi problemi restano e che i due
termini vanno trattati come sinonimi ([voce "Aboutness", Wikipedia](https://en.wikipedia.org/wiki/Aboutness), fonte
secondaria). Secondo fonti secondarie Hutchins usa la distinzione tema/rema: l'aboutness sta in ciò che l'autore
presuppone noto al lettore, non nel riassunto del nuovo; il riassunto andrebbe bene solo nelle biblioteche
specialistiche, dove si conoscono i lettori (non verificato sul testo).

**Domini (Hjørland).** Hjørland e Albrechtsen, "Toward a new horizon in information science: domain-analysis", *JASIS*
46(6), 400–425, 1995 ([RePEc](https://ideas.repec.org/a/bla/jamest/v46y1995i6p400-425.html)): la proposta è studiare i
domini come "thought or discourse communities" (dall'abstract, citato in secondaria). Per Hjørland la classificazione
presuppone conoscenza della materia e resta legata alle discipline.

**La critica interdisciplinare.** Szostak, "Interdisciplinarity and classification: a response to Hjørland", *Journal
of Documentation* 64(4), 2008 ([repository U. Alberta](https://ualberta.scholaris.ca/handle/123456789/23436)): sostiene
che una classificazione non per discipline, ma per fenomeni, teorie e metodi, è possibile e serve proprio al lavoro
interdisciplinare (abstract non disponibile nella pagina; sintesi da fonti secondarie). Il caso del Dewey
sull'abbigliamento è la stessa obiezione vista dall'altro lato.

**Domanda: un asse "campo del sapere" ha senso in un archivio personale?** Poco. (1) La disciplina è un punto di vista
istituzionale, non ciò di cui parla un frammento (Dewey stesso lo dice). (2) Un memo di trenta parole su un lutto o su
una canzone non "appartiene" a nessuna disciplina; assegnarne una è un'inferenza, cioè una lettura ◌, non un dato. (3)
Wikidata lega il campo alle persone (P101), non ai testi. Può servire come attributo di un nodo (un autore è filosofo,
un'opera è di psicologia), non come asse dei frammenti.

### 4.3 Sentimenti ed emozioni

**Plutchik.** Modello psicoevolutivo: R. Plutchik, *Emotion: A Psychoevolutionary Synthesis*, Harper & Row, 1980 (non
verificato sul volume); divulgato in "The Nature of Emotions", *American Scientist* 89(4), 344–350, 2001
([JSTOR 27857503](https://www.jstor.org/stable/27857503)). Otto primarie in quattro coppie opposte (gioia/tristezza,
fiducia/disgusto, paura/rabbia, sorpresa/attesa); l'intensità cresce verso il centro della ruota (es. fastidio, rabbia,
furia); le diadi sono mescolanze: amore = gioia + fiducia (diade primaria) ([voce "Robert Plutchik"](https://en.wikipedia.org/wiki/Robert_Plutchik), secondaria; etichette delle diadi variabili tra fonti, non verificate sull'articolo).

**GoEmotions** (Demszky et al., ACL 2020, [aclanthology 2020.acl-main.372](https://aclanthology.org/2020.acl-main.372.pdf)).
"58k English Reddit comments, labeled for 27 emotion categories or Neutral" (58.009 esempi). Agli annotatori si
chiedeva "to identify the emotions expressed by the writer of the text": l'emozione espressa, non quella del lettore.
L'accordo è misurato come correlazione tra annotatori (Spearman, media sulle persone), con il kappa di Cohen in
appendice: "gratitude, admiration and amusement have the highest and grief and nervousness have the lowest interrater
correlation". Il modello BERT arriva a "an average F1-score of .46 over our taxonomy, .64 over an Ekman-style grouping"
e .69 sul raggruppamento per sentiment (positivo, negativo, ambiguo, più neutro). Il dato utile: più le categorie sono
fini, più cala l'affidabilità; il lutto ("grief") è tra le più difficili.

**Russell, il circumplesso.** J. A. Russell, "A circumplex model of affect", *JPSP* 39(6), 1161–1178, 1980,
[doi:10.1037/h0077714](https://doi.org/10.1037/h0077714) ([PDF](https://pdodds.w3.uvm.edu/research/papers/others/1980/russell1980a.pdf)):
le parole d'affetto si dispongono in cerchio su due assi bipolari, piacere/dispiacere (valenza) e attivazione
(arousal). Poi "Core affect and the psychological construction of emotion", *Psychological Review* 110(1), 145–172,
2003, [doi:10.1037/0033-295X.110.1.145](https://doi.org/10.1037/0033-295X.110.1.145)
([PDF](https://cs.uwaterloo.ca/~jhoey/teaching/cs886-affect/papers/Russell-CoreAffect-PsychRev03.pdf)): il "core
affect" è uno stato semplice di piacere/dispiacere e attivazione; diventa un episodio emotivo quando viene attribuito a
una causa (sintesi dall'abstract via fonti secondarie).

**Barrett.** La granularità (emotion differentiation) nasce in Barrett, Gross, Christensen, Benvenuto, "Knowing what
you're feeling and knowing what to do about it", *Cognition and Emotion* 15, 713–724, 2001
([doi:10.1080/02699930143000239](https://doi.org/10.1080/02699930143000239), non verificato il DOI): chi distingue
meglio le emozioni negative le regola di più. Rassegna: Kashdan, Feldman Barrett, McKnight, "Unpacking emotion
differentiation", *Current Directions in Psychological Science* 24(1), 10–16, 2015
([PDF](https://www.affective-science.org/pubs/2015/kashdan-et-all-unpacking-emotion-differentiation-2015.pdf)). La
teoria dell'emozione costruita: Barrett, "The theory of constructed emotion", *SCAN* 12(1), 1–23, 2017
([PMC5390700](https://pmc.ncbi.nlm.nih.gov/articles/PMC5390700/)): "Emotion categories are as real as any other
conceptual categories"; e una critica al metodo: "Scientists begin with emotion concepts that are most recognizably
English". Sulle parole: Barrett, Lindquist, Gendron, "Language as context for the perception of emotion", *Trends in
Cognitive Sciences* 11(8), 327–332, 2007 ([PMC2225544](https://pmc.ncbi.nlm.nih.gov/articles/PMC2225544)): le parole
emotive fanno da contesto che vincola la percezione; Lindquist et al., *Emotion*, 2006
([PDF](https://www.affective-science.org/pubs/2006/Lindquist_et_al_2006.pdf)): saziare una parola emotiva rallenta la
categorizzazione dei volti. Conseguenza per noi: la parola che uso ("apatia", "malinconia", "rabbia") è già il dato più
fine; una mappa a 8 o 27 categorie la impoverisce.

**Espressa, provata, evocata, nominata.** Buechel e Hahn, *EmoBank*, EACL 2017
([E17-2092](https://aclanthology.org/E17-2092.pdf)): 10k frasi annotate due volte, emozione dello scrittore e del
lettore; "We find evidence for the supremacy of the reader's perspective in terms of IAA and rating intensity" (lo
studio pilota sullo stesso corpus aveva trovato il contrario per altri generi: la prospettiva migliore dipende dal
dominio, secondo fonti secondarie). Kim e Klinger, "Who Feels What and Why?", COLING 2018
([C18-1114](https://aclanthology.org/C18-1114.pdf)): ridurre l'analisi all'emozione espressa "is a simplification which
leads to an overgeneralized interpretation", perché ignora "who experiences an emotion and why"; annotano esperiente,
bersaglio, causa. Una rassegna dei corpora: Bostan e Klinger, COLING 2018 ([C18-1179](https://aclanthology.org/C18-1179/)):
schemi, domini e formati diversi, mai confrontati prima. Quindi in un memo ci sono almeno tre cose: l'emozione di cui
parlo ("ho paura di…": un tema), l'emozione che il testo esprime (il tono), e il mio stato mentre registro (che il testo
non garantisce). L'accordo umano è basso già sulla seconda.

**Domanda: un sentimento è un tema, un tono o altro?** Due cose distinte. Quando nomino un sentimento, è un tema (✦, la
mia parola, come vuole Barrett: granularità). Il tono del frammento è un'altra dimensione: inferita, poco affidabile
(GoEmotions F1 .46), e da tenere al più grossolana (valenza, come la `reazione` con `verso`), mai come etichetta fine.

### 4.4 Pensieri e temi

**Toulmin.** S. Toulmin, *The Uses of Argument*, Cambridge University Press, 1958: claim (la tesi), data (i fatti a
sostegno), warrant (la regola che autorizza il passaggio), più backing, qualifier, rebuttal; esempio: Harry è nato alle
Bermuda, dunque è suddito britannico ([Verheij, *Argumentation* 19, 2005](https://www.ai.rug.nl/~verheij/publications/pdf/toulmin2005.pdf)).

**IBIS.** Kunz e Rittel, "Issues as Elements of Information Systems", Working Paper 131, 1970 (editore: Berkeley IURD o
Heidelberg, le fonti divergono; non verificato). Tre nodi: Issue (una domanda), Position (una risposta), Argument (pro o
contro una posizione). L'erede software è Compendium: Buckingham Shum et al., "Hypermedia Support for Argumentation-Based
Rationale: 15 Years on from gIBIS and QOC", 2006 ([KMI-05-18](https://research-archive.stem.open.ac.uk/stemra-data/uploads/files/KMI-05-18.pdf)),
con la pratica del "dialogue mapping".

**AIF.** Chesñevar et al., "Towards an argument interchange format", *Knowledge Engineering Review* 21(4), 293–316,
2006 ([doi:10.1017/S0269888906001044](https://doi.org/10.1017/S0269888906001044)). Nella specifica: I-node (contenuto
proposizionale) e S-node (lo schema della relazione: RA inferenza, CA conflitto, PA preferenza); due I-node non si
collegano mai direttamente, la relazione dev'essere esplicita ([AIF spec](https://arg-tech.org/wp-content/uploads/2011/09/aif-spec.pdf)).

**Discourse Graphs (Joel Chan).** Chan et al., "Steps Towards an Infrastructure for Scholarly Synthesis"
([arXiv:2407.20666](https://arxiv.org/abs/2407.20666)): "a discourse graph of claims, and evidence, along with key
rhetorical relationships between them". I nodi Question e Source, e le relazioni supporta/contrasta, sono descritti in
fonti secondarie e nei materiali di Chan (non verificato sul testo primario; l'articolo 2021 "Discourse Graphs for
Augmented Knowledge Synthesis: What and Why" non l'ho trovato).

**Stance detection.** Mohammad et al., SemEval-2016 Task 6 ([S16-1003](https://aclanthology.org/S16-1003.pdf)): "Stance
detection is the task of automatically determining from text whether the author of the text is in favor of, against,
or neutral towards a proposition or target". Il punto chiave: il bersaglio "may not be explicitly mentioned in the text
and it may not be the target of opinion" (un tweet che loda Jeb Bush è contro Trump), e i sistemi vanno "markedly
worse" proprio lì. Rassegna: Küçük e Can, *ACM Computing Surveys* 53(1), 2020,
[doi:10.1145/3369026](https://doi.org/10.1145/3369026).

**Topic vs claim.** Il topic è un nome (di che cosa si parla: "la morte", "Jung"); il claim è una proposizione con un
verso (che cosa sostengo: "le versioni di me muoiono lungo il cammino"). Due frammenti sullo stesso tema possono
sostenere cose opposte, e due su temi diversi la stessa cosa. Toulmin, IBIS, AIF e Chan modellano tutti il secondo
livello; stance detection mostra che la posizione si legge male se si guarda solo al tema nominato. Per un archivio:
`parla-di` è il topic; una "posizione" è una mia frase ✦ con data; `contraddice` è un CA-node tra due posizioni.

### 4.5 La parola: lessicale e semantico

**Dense.** DPR, Karpukhin et al., EMNLP 2020 ([arXiv:2004.04906](https://arxiv.org/abs/2004.04906)): il recuperatore
denso "outperforms a strong Lucene-BM25 system largely by 9%-19% absolute" sulla top-20, ma in domini dove è addestrato.

**Fuori dominio.** BEIR, Thakur et al., NeurIPS 2021 ([arXiv:2104.08663](https://arxiv.org/abs/2104.08663)): "BM25 is a
robust baseline"; i modelli densi hanno "considerable room for improvement in their generalization capabilities".

**Entità rare.** Sciavolino et al., "Simple Entity-Centric Questions Challenge Dense Retrievers", EMNLP 2021
([arXiv:2109.08535](https://arxiv.org/abs/2109.08535)): "dense retrievers drastically underperform sparse methods" su
domande semplici con entità; generalizzano "only to common entities unless the question pattern is explicitly observed
during training".

**Ibrido.** Chen et al., "Out-of-Domain Semantics to the Rescue! Zero-Shot Hybrid Retrieval Models", ECIR 2022
([arXiv:2201.10582](https://arxiv.org/abs/2201.10582)): fusione non parametrica dei punteggi lessicali e densi, +20,4%
relativo sul denso e +9,54% sul lessicale in tre dataset fuori dominio.

**Che cosa vuole chi cerca.** Marchionini, "Exploratory search: from finding to understanding", *CACM* 49(4), 41–46,
2006 ([PDF](https://ils.unc.edu/courses/2018_fall/inls509_001/Reading/Marchionini06.pdf)): tre attività, lookup,
learn, investigate; "Lookup is the most basic kind of search task" (vi rientrano known-item search, verifica, fatti);
l'esplorativa riguarda imparare e indagare, con confronti e riformulazioni. In un archivio personale: "la frase su mio
zio", un nome proprio, una citazione sono lookup, dove serve la parola esatta e il lessicale vince; "che cosa pensavo
della fede" è esplorativo, dove serve il senso.

**Nota italiana.** Le prove sopra sono quasi tutte su inglese e Wikipedia; trascrizioni vocali in italiano hanno refusi,
nomi storpiati e dialetto: condizioni fuori dominio per un modello denso, dove BM25 (con stemming italiano) regge meglio
(inferenza mia, non verificata).

#### Cinque lezioni per un archivio personale di frammenti brevi

1. **Niente asse "disciplina" sui frammenti.** La disciplina è un punto di vista (Dewey stesso sparpaglia
   l'abbigliamento in tre classi); in un memo di trenta parole è un'inferenza. Tenerla, se serve, come attributo dei
   nodi (autore, opera), come Wikidata fa con P101 sulle persone. Le faccette trasversali utili sono quelle dell'UDC:
   tempo, persona, forma, luogo.
2. **Il sentimento nominato è un tema, con la mia parola.** "Apatia", "nostalgia" sono temi ✦ e vanno tenuti nella forma
   in cui li dico: la granularità (Barrett) è nella parola, non nella ruota di Plutchik o nelle 27 di GoEmotions.
3. **Il tono è un'altra dimensione, grossolana e dichiarata come lettura.** L'emozione espressa si annota male
   (GoEmotions F1 .46; il lutto tra le categorie con accordo più basso); conviene una valenza (+, -, ±) con le parole
   esatte a sostegno, mai una diagnosi, mai una categoria fine inventata. E il mio stato reale non si deduce dal testo
   (Kim e Klinger: chi prova che cosa, e perché).
4. **Separare il tema dalla posizione.** Il tema dice di che cosa parlo; la posizione è una mia frase datata che
   sostiene qualcosa. Solo tra posizioni ha senso una tensione (un CA-node AIF, un `contraddice`); due frammenti sullo
   stesso tema non sono per questo in accordo né in contrasto, e la posizione può riguardare un bersaglio che non nomino
   (SemEval 2016).
5. **Ricerca ibrida, con il lessicale prima per nomi e citazioni.** Per un nome, una frase ricordata, una parola rara il
   lessicale è più affidabile (BEIR, EntityQuestions); per "che cosa pensavo di…" serve il senso. Usare entrambi, fondere
   i punteggi, ed espandere la domanda con sinonimi e parentele, perché sulle trascrizioni italiane il denso è fuori
   dominio.

## 5. I sistemi personali

### 5.1 Obsidian

- **Tag.** `#tag`, annidabili con `/` (`#inbox/to-read`). Cercare il padre trova anche i figli: `tag:inbox` prende `#inbox/to-read`; in Bases `file.hasTag("a")` prende `#a` e `#a/b`. Niente spazi, almeno un carattere non numerico (`#1984` non vale), maiuscole e minuscole indifferenti. [obsidian.md/help/tags](https://obsidian.md/help/tags)
- **Properties.** È il frontmatter tipizzato. I tipi: Text, List, Number, Checkbox, Date, Date & time, Tags. `tags`, `aliases` e `cssclasses` sono predefinite. **Il tipo vale per tutto il vault**: se lo dai a un nome, vale per ogni nota che usa quel nome. [obsidian.md/help/properties](https://obsidian.md/help/properties)
- **Ricerca.** Gli operatori sono `file:`, `path:`, `content:`, `tag:`, `line:`, `block:`, `section:` e `task:`/`task-todo:`/`task-done:`. Per le proprietà: `[prop]`, `[prop:valore]`, `[prop:null]`, e confronti numerici come `[duration:<5]`. Lo spazio fa da AND; poi ci sono `OR`, le parentesi, la negazione `-`, le frasi esatte tra virgolette e le regex `/…/`. [obsidian.md/help/plugins/search](https://obsidian.md/help/plugins/search)
- **Bases (2025).** Una base contiene più viste: tabella, lista, card, kanban e mappa (la mappa vuole un plugin). Ogni vista ha il suo ordinamento, i suoi filtri e il suo raggruppamento. Un filtro è proprietà + operatore + valore. Si combinano con "All" (and), "Any" (or) e "None" (not), in gruppi annidabili. Il filtro vale per tutta la base o per una sola vista. Si filtra anche per cartella e tag, con le proprietà del file e con formule. [obsidian.md/help/bases/views](https://obsidian.md/help/bases/views)
- **Chi riempie.** L'utente, a mano. Obsidian non ha un'AI nativa che metta tag (non verificato per i plugin di terzi).
- **Critiche.** Matuschak sostiene che i tag sono "a low-signal way of describing relationships": l'elemento è attaccato al tag per intero anche quando l'argomento ne tocca poche frasi. Meglio link espliciti con il loro perché, come un indice che tiene "a handful of top references". [Matuschak, Tags are an ineffective association structure](https://notes.andymatuschak.org/Tags_are_an_ineffective_association_structure); [Indexed references vs. tags](https://notes.andymatuschak.org/z2qjVZKqSqrqkhFhvUpPDtd). Dal forum: i link si aggiornano da soli quando rinomini, i tag no; i tag obsoleti si accumulano. [forum.obsidian.md](https://forum.obsidian.md/t/what-you-gain-and-lose-when-choosing-between-tags-links-and-folders/41616) (fonte di comunità)
- **Insegna:** tipizzare una proprietà una volta per tutto il vault evita la deriva dei valori. Quando il frontmatter è già tipizzato, i filtri (and/or/not, per vista) sono quasi gratis. Il tag gerarchico che include i figli è comodo, ma si rinomina male e porta poco significato.

### 5.2 Bear

- **Tag annidati, nessuna cartella.** Il tag annidato si scrive con `/`. Un tag di più parole si chiude con un altro `#` (`#school projects/biology 101#`). I livelli sono illimitati da Bear 1.1. [bear.app/faq/nested-tags](https://www.bear.app/faq/nested-tags); [blog Bear 2017](https://blog.bear.app/2017/08/bear-tips-organize-notes-with-tags-and-infinite-nested-tags/)
- Bear presenta il tag come sostituto delle cartelle: "instead of rigid folders… simply by adding a #tag". Si rinominano e si cancellano dalla barra laterale. [blog.bear.app](https://blog.bear.app/2017/08/bear-tips-organize-notes-with-tags-and-infinite-nested-tags/); [FAQ tag](https://bear.app/faq/how-to-use-tags-in-bear)
- **Chi riempie.** L'utente, scrivendo il tag dentro il testo. Il tag vive nel corpo della nota, non in metadati separati. Secondo i forum non legge i tag dal frontmatter YAML. [community.bear.app](https://community.bear.app/t/2-basic-must-have-features-i-found-missing-after-more-than-2-years-of-using-this-app/18502/11) (fonte di comunità, data incerta)
- **Critiche.** Le richieste ricorrenti di cartelle mostrano che la gerarchia annidata finisce per rifare le cartelle con un altro nome. [community.bear.app](https://community.bear.app/t/how-to-make-people-stop-asking-for-folders/2752)
- **Insegna:** una sola dimensione, il tag in linea, abbassa il costo di classificare a zero. In cambio non ci sono campi tipizzati né filtri composti, e i tag si confondono con il testo.

### 5.3 Notion

- **Proprietà.** Basiche: Text, Number, Checkbox, URL, Email, Phone, Place. Di scelta: Select, Multi-select, Status. Date. Di collegamento: Relation, Rollup, Person, File. Calcolate: Formula, ID, Button. Automatiche: Created/Last edited time e by. [notion.com/help/database-properties](https://www.notion.com/help/database-properties)
- **Filtri e viste.** Il filtro semplice si salva per sé o "for everyone". Il filtro avanzato combina AND e OR in gruppi annidati fino a tre livelli. Ogni vista ha i suoi filtri, che non passano alle altre viste. [notion.com/help/views-filters-and-sorts](https://www.notion.com/help/views-filters-and-sorts)
- **AI Autofill.** È una proprietà riempita dall'AI: riassunto, traduzione, parole chiave o un prompt su misura che può leggere le altre proprietà della riga. Esiste in modalità Basic e Custom Agent; la seconda può cercare sul web e avere condizioni come "Only fill this property if Status is In Progress". [notion.com/help/autofill](https://www.notion.com/it/help/autofill). Se si aggiorni a ogni modifica della pagina (non verificato).
- **Chi riempie.** L'utente; il sistema per i campi automatici; l'AI per le proprietà Autofill.
- **Insegna:** Relation e Rollup trasformano le categorie in legami tra oggetti, invece che in etichette. Un campo AI separato e dichiarato tiene distinta la proposta della macchina dal dato dell'utente. Il rischio è la "database-ite": troppe proprietà, che nessuno riempie con costanza (non verificato come fonte: è osservazione comune).

### 5.4 Tana

- **Supertag.** Trasforma un nodo in un oggetto tipizzato. La prova è "è un": "Marisha" *è una* Person. Tutti i nodi con lo stesso supertag formano una collezione, mostrata di default come tabella. I campi sono gli attributi del tipo (una Task ha Status, Deadline, Priority). Il template può dare valori di default. Un nodo può avere più supertag. [outliner.tana.inc/learn/features/supertags](https://outliner.tana.inc/learn/features/supertags)
- **Extend (ereditarietà).** "Design task" estende "Task" e ne eredita i campi. Il contenuto ereditato non si sposta né si cancella. Chi cerca il tag base trova anche i tag che lo estendono. [stessa pagina](https://outliner.tana.inc/learn/features/supertags); [When to use extend](https://tana.inc/articles/when-to-use-extend-in-supertags)
- **Search node.** È una query salvata e viva. Tutto il nodo è in AND; ci sono OR e NOT (per esempio #todo NOT DONE). Si filtra per valore di campo o per la sola presenza del campo. Massimo 2.500 risultati. I template possono contenere search node legati all'istanza: un Project che raccoglie le sue Task. [tana.inc/docs/search-nodes](https://tana.inc/docs/search-nodes); [live search](https://tana.inc/docs/live-search)
- **AI.**
  - Propone i campi dei nuovi supertag. Un campo usato due volte diventa opzionale da solo.
  - Un supertag può avere "AI instructions" per quando l'AI deve riconoscere gli oggetti da taggare.
  - Il meeting agent riconosce da solo Persons, Organizations, Tasks, Locations e Products.
  - L'autofill riempie titolo, campi e descrizione.
  [outliner.tana.inc/learn/features/supertags](https://outliner.tana.inc/learn/features/supertags). L'auto-tag dei memo vocali compare solo in fonti terze (non verificato).
- **Insegna:** distingue un tipo ("è un") da un tema ("parla di"), e solo il tipo porta campi. L'ereditarietà evita di duplicare gli schemi. L'AI qui *riconosce oggetti* secondo istruzioni scritte per ogni tipo, invece di inventare etichette libere. Il prezzo è la complessità: la curva d'apprendimento è la critica più ricorrente nelle recensioni (fonti secondarie, per esempio [blog.saner.ai](https://blog.saner.ai/tana-reviews)).

### 5.5 Capacities

- **Object types.** "Every piece of content is an object". Ci sono tipi di base e tipi su misura (Book, Person, Page…). "Use object types when you have recurring content with consistent structure." Le proprietà valgono per tutti gli oggetti del tipo, Title e Tags compresi. La proprietà "object select" collega un oggetto a un altro tipo. [docs.capacities.io/reference/organizational-structures](https://docs.capacities.io/reference/organizational-structures); [content types](https://docs.capacities.io/reference/content-types)
- **Tag.** "Tags work across types" e si applicano anche ai singoli blocchi. Le **collezioni** sono scelte a mano dentro un solo tipo ("Collections don't auto-update"). Le **query** sono viste a regole che si aggiornano da sole. [organizational-structures](https://docs.capacities.io/reference/organizational-structures)
- **Query** (Pro). Si parte da tutto e "Everything you add narrows the results". Tag e backlink si combinano con Any of / All of; le proprietà con and/or. Si può escludere per tipo, tag o backlink. Ci sono condizioni sul conteggio dei link in uscita e in entrata e la variabile "This object". Si ordina, si raggruppa e si limita, anche con un sottoinsieme casuale. [docs.capacities.io/reference/queries](https://docs.capacities.io/reference/queries)
- **AI.** I suggerimenti di tag dall'AI Assistant, accettati dall'utente, sono citati solo da un blog terzo dell'era GPT-4 (non verificato). [flytrapp](https://flytrapp.squarespace.com/articles/blog-post-title-two-fw2ay)
- **Insegna:** tiene separate tre cose: la struttura (il tipo), il tema (il tag, che attraversa i tipi) e il gruppo (la collezione a mano o la query a regole). Il limite casuale della query è un modo di far *riemergere* il materiale, non solo di filtrarlo.

### 5.6 Are.na

- "There are no tags, no folders, no real hierarchies — just channels, blocks, and connections." "Channels are more about defining a context rather than strict and specific organization." [help.are.na: personal taxonomies](https://help.are.na/docs/guides/creating-personal-taxonomies)
- Un canale contiene blocchi e altri canali. [help.are.na/getting-started/channels](https://help.are.na/getting-started/channels)
- Non esistono like né preferiti: "there is no such thing as a 'like'… instead we have connections". Navigare significa "traversing connections"; "every connection was made by a human". [help.are.na: connections](https://help.are.na/docs/getting-started/connections). Lo stesso blocco sta in più canali con "Connect" (dedotto dalla pagina, non detto alla lettera).
- **Chi riempie.** Solo persone. Nessun algoritmo di classificazione.
- **Insegna:** il contesto (in quale canale l'ho messo, e accanto a che cosa) conta più della categoria. Ogni collegamento è un gesto umano e porta significato. Il limite: non c'è un filtro per faccette, e si ritrova le cose camminando, non interrogando.

### 5.7 Readwise e Reader

- **Due tipi di tag.** Di documento e di highlight. In Reader i tag degli highlight non sono ricercabili: si sincronizzano su readwise.io/tags. Tra i due tipi non c'è ereditarietà. [docs.readwise.io FAQ highlights/tags](https://docs.readwise.io/reader/docs/faqs/highlights-tags-notes)
- **Inline tagging.** Una nota che comincia con un punto (`.prob`) diventa un tag all'importazione, da Kindle, iBooks e Instapaper. Rinomini una volta e Readwise impara a convertire `.prob` in `.probability`. Alcuni tag sono "action tag" (`.inbox`, `.qa`). [blog.readwise.io](https://blog.readwise.io/tag-your-highlights-while-you-read/); [action tags](https://docs.readwise.io/readwise/guides/action-tags)
- **Filtered views (Reader).** I parametri sono:
  - date: `saved`, `published`, `last_opened`;
  - testo: `tag`, `author`, `domain`, `category`/`type`, `rss_source`, `location`, `title`;
  - numeri: `words`, `highlights`, `progress`, `minutes`;
  - altro: `has:highlights|tags|notes`.

  Gli operatori sono `__gt`, `__lt`, `__contains`, `__not`, `__before`, `__after`, uniti da AND, OR e parentesi. Le categorie sono article, epub, email, pdf, tweet, rss, video, podcast. [syntax guide](https://docs.readwise.io/reader/guides/filtering/syntax-guide)
- **Ghostreader auto-tagging.** Un prompt su misura applica i tag ai documenti in base ai metadati, anche con logica if-else. Riguarda i documenti, non gli highlight (non verificato per gli highlight). [Ghostreader tips](https://docs.readwise.io/reader/guides/ghostreader/tips-tricks)
- **Insegna:** la fonte (tipo, autore, dominio) è una faccetta *gratuita*, perché arriva dai metadati, mentre il tema costa. Il tag scritto in linea mentre si legge, con una scorciatoia, rende la classificazione un gesto della lettura. L'auto-tag a regole funziona sui metadati, non sul significato.

### 5.8 Day One

- **Faccette.** Journal multipli (non elencati nella pagina dei filtri), tag, luogo, preferiti, media (foto, audio, video, PDF), musica, attività, checklist, pubblicato, data e "On This Day" (macOS). Su Android i filtri sono meno e non c'è il filtro per data. [dayoneapp.com/guides/tips-and-tutorials/filters](https://dayoneapp.com/guides/tips-and-tutorials/filters)
- **Combinazioni.** Con più tag compare il selettore "Any / All". La pagina non dice come si combinano faccette diverse. [stessa pagina](https://dayoneapp.com/guides/tips-and-tutorials/filters)
- **Metadati automatici.** Luogo, data e ora, attività, musica. Il meteo si aggiunge da solo quando c'è il luogo, e per toglierlo bisogna rimuovere il luogo o il meteo a mano. [Entry Info/Metadata](https://dayoneapp.com/guides/tips-and-tutorials/entry-info-metadata-in-day-one-for-ios/)
- **AI.**
  - Go Deeper: domande nell'editor a partire da ciò che hai scritto.
  - Title Suggestions.
  - Entry Summary, sostituito dalla 2025.19 da Entry Highlights.
  - Multi-Entry Summary.

  Su Apple può girare in locale con Apple Intelligence; altrimenti il testo va al servizio AI di Day One. [AI features](https://dayoneapp.com/guides/ai-features/); [Title Suggestions](https://dayoneapp.com/guides/ai-features/ai-entry-title-suggestions/); [Multi-Entry Summary](https://dayoneapp.com/guides/ai-features/ai-multi-entry-summary/). Tag assegnati dall'AI: non trovati (non verificato).
- **Insegna:** il contesto catturato in automatico (dove, quando, meteo, musica) fa da faccetta a costo zero, e la ricorrenza per data ("On This Day") è il modo principale di far tornare le cose. L'AI qui *riformula e interroga*, ma non classifica.

### 5.9 Last.fm e Letterboxd

**Last.fm.**
- "Scrobbling is when Last.fm tracks the music you listen to and automatically adds it to your music profile." [last.fm/about/trackmymusic](https://www.last.fm/about/trackmymusic)
- Le dimensioni sono quelle del dato: artista, album, brano, data e ora. Uno scrobble richiede artista, titolo e timestamp. [API, via pydrag](https://pydrag.readthedocs.io/en/latest/api.html) (fonte secondaria)
- I tag sono una **folksonomia**: etichette libere degli utenti su artisti, album e brani, ordinate per frequenza d'uso. L'API dà i top tag globali e anche i tag del singolo utente. [ISMIR 2007](https://archives.ismir.net/ismir2007/paper/000525.pdf); [liblastfm](https://hackage.haskell.org/package/liblastfm-0.7.0/docs/Lastfm-Tag.html). Non ho trovato la pagina d'aiuto ufficiale sui tag (non verificato).
- **Insegna:** quando il registro si riempie da solo (lo scrobble), i conti sono veri. Il significato invece arriva dagli altri: i tag della folla descrivono il consenso, non il mio rapporto con il brano.

**Letterboxd.**
- Il log ha data del diario, voto, like, rewatch e tag. Le bozze e i voti delle voci "Close Friends" o "You" non entrano nelle statistiche. [letterboxd.com/about/faq](https://letterboxd.com/about/faq/) (rimanda a support.letterboxd.com)
- Le pagine annuali degli utenti hanno sezioni per generi, paesi e lingue, temi e nanogeneri, cast e registi. [esempio letterboxd.com/mitchell/year/2021](https://letterboxd.com/mitchell/year/2021/)
- Le statistiche annuali e di sempre e il filtro per servizi di streaming sono di Pro (dal piè di pagina del sito, non dalla pagina Pro, che rispondeva 403).
- Il filtro dei film visti per genere, decennio e paese esiste nell'interfaccia (non verificato in una pagina d'aiuto).
- **Insegna:** le faccette oggettive (genere, paese, decennio, regista) le porta il catalogo, non l'utente. L'utente aggiunge solo il gesto: quando, quanto gli è piaciuto, se ci è tornato, con parole sue. Il riepilogo dell'anno funziona perché conta dati che nessuno ha dovuto classificare.

### Critiche trasversali

- **Shirky, "Ontology is Overrated" (2005).** Contro le categorie decise prima per coprire ogni caso, "badly overrated" nel digitale; i tag sono metadati a posteriori. [copia d'archivio, gwern.net](https://gwern.net/doc/philosophy/ontology/2005-04-shirky-ontologyisoverratedcategorieslinksandtags.html)
- **Tietze, "The Collector's Fallacy".** Raccogliere dà la sensazione di sapere senza che il sapere cresca. [zettelkasten.de/posts/collectors-fallacy](https://www.zettelkasten.de/posts/collectors-fallacy)
- **Matuschak.** Preferisce le ontologie associative alle tassonomie gerarchiche e avverte contro la gerarchia prematura. [notes.andymatuschak.org](https://notes.andymatuschak.org/Prefer_associative_ontologies_to_hierarchical_taxonomies)
- **"Tag overwhelm"** (nome alternativo a "tag soup", che non ho trovato in fonti autorevoli). Una tassonomia definita prima di catturare porta fatica di decisione, e i tag vecchi, se nessuno li toglie, gonfiano la lista. [ai-wiki-pkm](https://ai-wiki-pkm.pages.dev/tag-overwhelm) (fonte minore, non autorevole)

### Tabella sintetica

| sistema | dimensioni | combinazione nei filtri | chi riempie |
|---|---|---|---|
| Obsidian | tag annidati, properties tipizzate (tipo unico per vault), cartella, link | spazio=AND, OR, -, (), [prop:val], regex; Bases: all/any/none annidati, per vista | utente |
| Bear | tag annidati in linea | navigazione per tag (+ ricerca) | utente |
| Notion | proprietà (select, multi-select, status, relation, rollup, formula, date…) | AND/OR in gruppi fino a 3 livelli, per vista | utente; sistema (tempi, autori); AI Autofill |
| Tana | supertag (tipi con campi, extend), campi, nodi | search node: AND implicito, OR, NOT, campi | utente; AI per i campi suggeriti, riconoscimento di oggetti e autofill |
| Capacities | object type, proprietà, tag trasversali, collezioni, backlink | Any/All per i tag, and/or per le proprietà, esclusioni, conteggi di link | utente (AI suggerisce tag: non verificato) |
| Are.na | canali, blocchi, connessioni; niente tag | nessuno: si attraversano le connessioni | solo persone |
| Readwise/Reader | tag di documento e di highlight, categoria, autore, dominio, date, conteggi | AND/OR/(), operatori __gt, __not… | metadati automatici; utente (tag inline); Ghostreader (tag di documento) |
| Day One | journal, tag, luogo, meteo, media, musica, attività, data, On This Day | Any/All sui tag | automatici (luogo, meteo, ora); utente (tag); AI riassume e propone titoli |
| Last.fm | artista/album/brano, tempo, tag della folla | classifiche per periodo | scrobble automatico; tag dalla comunità |
| Letterboxd | data, voto, like, rewatch, tag, liste; genere, paese, decennio, regista dal catalogo | filtri del profilo; statistiche Pro | utente (il gesto); catalogo (le faccette oggettive) |

## 6. La risposta: sei assi, una lente, un campo

### 6.1 "Canzone" e "sentimento" sono dimensioni diverse?

Sì, e non per gusto: rispondono a due domande diverse sul frammento. *Che cosa nomino?* (una canzone, un libro, una
frase di un altro) e *di che cosa parlo?* (la nostalgia, il tempo, la fede). La prima ha per valori cose del mondo,
verificabili ○, che i cataloghi già classificano per forma (Wikidata `P31`, MusicBrainz `Work`/`Recording`, FRBR e
BIBFRAME `Work`, §4.1). La seconda ha per valori le parole dell'utente ✦, e un sentimento è una di queste parole
(Barrett: la granularità sta nella parola, §4.3). Wikidata separa per regola il genere di un'opera (`P136`) dal suo
soggetto (`P921`): «Use main subject (P921) to relate creative works to their topic»
([P136](https://www.wikidata.org/wiki/Property:P136)). Il test di Vickery, «homogeneous, mutually exclusive facets, each
derived from single characteristic of division» ([ISKO, Facet analysis](https://isko.org/cyclo/facet_analysis)), dice lo
stesso: "canzone" divide le cose per forma, "nostalgia" divide i frammenti per argomento; mescolarle in un'unica lista
di tag (come i tag di Obsidian e Bear, o i nodi «emozione» accanto ai «concetti» nell'Atlante) produce una lista dove
nulla si combina.

Il guadagno sta nella combinazione: "canzoni" AND "nostalgia" è la domanda che l'utente fa, e la ricerca a faccette dà il
meglio quando si combinano più faccette (Flamenco: con una sola faccetta metà dei partecipanti preferiva il baseline,
[Hearst, SUI §8.6.1](https://searchuserinterfaces.com/book/sui_ch8_navigation_and_search.html)).

Una sfumatura: "sentimento" e "canzone" sono anche *specie* dentro i loro generi. "Canzone" è una forma di opera;
"sentimento" è una specie di tema (accanto a idea, immagine, pratica). Nel filtro quindi l'utente trova "sentimenti"
come raggruppamento dentro l'asse *Temi*, e "canzoni" come raggruppamento dentro l'asse *Cose*: due livelli, un solo
principio per livello, come gli array e le catene di Ranganathan
([ISKO, CC](https://isko.org/cyclo/colon_classification)).

### 6.2 Gli assi

Ogni asse filtra i **frammenti** (le parole dell'utente) attraverso i legami che il modello già scrive; i nodi si
aprono dalla loro pagina. PMEST tra parentesi, come verifica che ogni categoria fondamentale abbia un posto e che nessun
asse ne mescoli due.

| asse | domanda | valori | chi lo riempie | vocabolario | dal modello |
|---|---|---|---|---|---|
| **Cose** (Personality) | che cosa nomino? | le opere, raggruppate per **forma**: canzone · album · libro · poesia · film · serie · spettacolo · opera d'arte · gioco · altro; più le **citazioni** con il loro esito | il legame `nomina` ✦ (lo legge "smista"); la forma ✦ se la dico io («lo spettacolo di galimberti»), altrimenti ○ dal catalogo (Wikidata `P31`, MusicBrainz), scritta da "consolida" | istanze aperte (i nodi); forma **chiusa**, ~10 voci | `nomina` → opere, citazioni; manca il campo `forma` |
| **Persone** (Personality) | chi? | le persone, con il **ruolo sull'arco**: autore · interprete · citato · ne parlo; la cerchia (`mondo` · `vita` · `finzione`) | `nomina` ✦; il ruolo da `autore`, `attribuita-a`, `in` dei nodi (○ verificato o ⚠) | aperto (i nodi); ruoli chiusi | `nomina`, `autore`, `attribuita-a`, `citata-da` |
| **Temi** (Matter) | di che cosa parlo? | i temi, ciascuno con la sua **specie**: sentimento · idea · immagine · pratica · luogo · relazione | i temi ✦ nascono dalle mie parole; i ◌ alla 2ª–3ª ricorrenza; la specie ◌, scritta da "consolida" | temi **aperti** con le mie parole (SKOS `prefLabel` = la mia parola, le dotte in `altLabel`); specie **chiusa**, 6 voci | `parla-di`; manca il campo `specie` |
| **Campo** (punto di vista, Dewey) | da quale sapere? | filosofia · psicologia · religione · scienza · storia · letteratura · musica · cinema e teatro · arte · società | ◌ sempre, scritto da "consolida" sui nodi `mondo` (persone, opere, citazioni) e sui temi dotti, da Wikidata `P101`/`P136` quando c'è; il frammento lo **eredita** dai nodi | **chiuso**, ~10 voci, dalle classi Dewey/UDC | manca; si calcola il resto |
| **Gesto** (Energy) | che cosa faccio con le parole? | penso (una posizione) · chiedo · ricordo · voglio fare · trascrivo · reagisco | **calcolato** quasi tutto: `intento: chiedi` → chiedo; `vissuto` → ricordo; `fruizione: da-fare` → voglio fare; `altrui` → trascrivo; `reazione` → reagisco; Posizioni di `mappa.md` → penso | **chiuso**, 6 voci, più valori per frammento | esiste quasi tutto |
| **Tempo** (Time) | quando? | mese e anno del `registrato`; a parte, il `vissuto` («~2009»); gli importati con la data-tetto | lo script | continuo | esiste |

**La voce come lente.** ✦ ✧ ● ◌ ○ non è un settimo asse: è il modo in cui ogni valore si mostra. Su ogni asse i valori
✦ (e ●) vengono prima e contano nel numero accanto; i ◌ stanno in un gruppo piegato «letti da me», con il loro numero a
parte. Una chip «solo le mie parole» toglie tutto ciò che non è ✦. Così il caos dell'Atlante («troppo caos») non torna:
le proposte non crescono mai più delle cose dell'utente nella prima schermata.

**La parola come campo.** Non è un asse: è il campo di ricerca in testa, lessicale e alla lettera (anche di tre
lettere), come in progetto §3.8. La ricerca e gli assi si compongono (Hearst, SUI cap. 8, «Integrating Navigation with
Search»): si scrive «mare», poi si restringe con *Cose: canzoni*. Il senso («che cosa pensavo della fede») resta a
Specchio, che espande la domanda (`CLAUDE.md`, «Cercare nei file»), perché sulle trascrizioni italiane il denso è fuori
dominio (§4.5).

**Lo spazio.** PMEST ha una quinta categoria, il luogo; qui non è un asse, perché la cattura non registra il dove. Un
luogo nominato è un tema di specie «luogo».

### 6.3 Come si combinano nei filtri

1. **AND tra assi, OR dentro un asse** ([Baymard 2024](https://baymard.com/research-articles/allow-applying-of-multiple-filter-values)).
   *Cose: canzoni* + *Temi: nostalgia, tempo* = canzoni nominate in frammenti sulla nostalgia **o** sul tempo.
2. **Il numero accanto a ogni valore, calcolato sul risultato corrente; i valori a zero non si mostrano**
   ([Flamenco, CHI 2003](https://flamenco.berkeley.edu/papers/flamenco-chi03.pdf)). In un archivio piccolo un vicolo
   cieco pesa di più. I numeri contano i frammenti ✦ parlanti, come ogni soglia (`CLAUDE.md`, regola di provenienza 3);
   gli importati in un numero a parte.
3. **I filtri attivi come chip in una riga che scorre in orizzontale sopra i risultati, ciascuno con la sua ×, e il totale
   sempre visibile** ([Baymard, applied filters](https://baymard.com/research-articles/how-to-design-applied-filters);
   [NN/g 2015](https://www.nngroup.com/articles/mobile-faceted-search/)). L'URL tiene i filtri (come già l'Atlante,
   `?nodo=`).
4. **Su telefono: un pannello che sale dal basso sopra la lista, un asse per sezione, i primi ~8 valori e «altri N»**
   ([Baymard, truncation](https://baymard.com/research-articles/truncation-design)). Live, senza «applica», perché il
   calcolo è locale e istantaneo ([NN/g 2016](https://www.nngroup.com/articles/applying-filters/)).
5. **L'ordine degli assi è quello della domanda dell'utente:** Cose, Persone, Temi, Campo, Gesto, Tempo. Dentro un
   asse, per numero, salvo il Tempo (cronologico) e la forma (ordine fisso, per non far saltare le chip).
6. **Il delicato.** Un frammento delicato non ripreso non entra nei numeri mostrati e non dà valori agli assi: in fondo
   ai risultati, «e N delicati · mostrali», lo stesso gesto di progetto §3.8. Nessun asse ha un valore «lutto» o
   «apatia» inferito; se l'utente l'ha nominato è un suo tema, ma resta sotto la stessa regola.
7. **Le persone `vita`** compaiono nell'asse Persone solo come filtro dei frammenti dell'utente (sono parole dell'utente, viste
   solo dall'utente), mai con un Campo, mai come ponte, mai in una chiamata esterna (progetto §10, dubbio 6).
8. **Dal valore al nodo:** ogni valore aperto (una persona, un'opera, un tema) ha accanto «apri», che porta alla pagina
   del nodo; i valori chiusi (forma, specie, campo, gesto) no, perché non sono nodi.

### 6.4 Che cosa chiederebbe al modello (da decidere, non da fare qui)

| campo | dove | chi lo scrive | vocabolario | perché |
|---|---|---|---|---|
| `forma` | nodo `opere` | "smista" alla creazione se lo dicono le mie parole (come `autore`); altrimenti "consolida", da fonte ○ | chiuso | oggi un'opera non sa se è una canzone; solo `cosa` delle voci lo dice (`brano`, `libro`, `film`) |
| `specie` | nodo `temi` | "consolida" | chiuso, 6 | per filtrare «i sentimenti» senza un asse di emozioni inferite |
| `campo` | nodi `persone` (`mondo`), `opere`, `citazioni`, `temi` | "consolida", ◌ | chiuso, ~10 | per «qualcosa legato alla filosofia»; mai su `vita` |
| *Gesto* | calcolato in `contesto/` | `contesto.mjs` | chiuso, 6 | quasi tutto da campi esistenti; «penso» dalle Posizioni |

I tre campi nuovi rispettano «un file, un solo scrittore»: la creazione resta di "smista", ogni altro campo di
"consolida". I valori chiusi non si rigenerano: si scrivono una volta e cambiano solo per una correzione (`ritorna-su`,
`come: corregge`), contro l'instabilità documentata delle etichette prodotte da LLM (§3.4).

## 7. Dubbi

1. **La specie del tema è un vocabolario chiuso inventato qui** (sentimento · idea · immagine · pratica · luogo ·
   relazione). Viene dalle categorie fondamentali (CRG, Vickery) ridotte al dominio, ma va provata sui temi veri: se un
   tema cade in due specie, il vocabolario è sbagliato.
2. **Il Campo è ◌ per costruzione.** È utile per «filosofia», ma è una lettura, non un dato: se nel sito pesa più dei temi
   ✦, ripete l'errore dell'Atlante (le discipline come regioni del cielo). Proposta: mostrarlo sempre con ◌, e solo dopo
   gli assi ✦.
3. **«Penso» richiede di riconoscere una posizione** (stance), che si legge male quando il bersaglio non è nominato
   (SemEval 2016, §4.4). Le Posizioni di `mappa.md` ci sono già; resta da decidere se ogni frase affermativa è una
   posizione o solo quelle che "consolida" mette in Posizioni (la seconda è più prudente).
4. **"Canzone" contro "album" contro "brano"**: MusicBrainz e Wikidata distinguono opera e incisione. Per l'utente basta
   la forma «canzone» (con `in` → album); la distinzione opera/incisione non serve finché non c'è un caso.
5. **Il vocabolario della forma andrebbe allineato a `cosa` delle restituzioni** (`brano`, `libro`, `film`) per non
   avere due nomi per la stessa cosa: «brano» o «canzone»? La parola dell'utente è «canzone».
6. **Gli importati** entrano negli assi (sono parole dell'utente) ma non nei numeri principali: un numero a parte, o
   nessun numero? La regola 5 di `CLAUDE.md` li tiene fuori dai conti.
