# L'essenza: che cosa chiedi davvero

> Raffinamento, 2026-10-31. Proposta di Claude, da validare. Non tocca note né script.
> Si legge prima della [proposta](/_progetto/proposta.md): ne è il metro di giudizio.

## 0. Le prove, in numeri

Prima di interpretare le tue parole, ho guardato che cosa hai *fatto* in un mese di Atlante (diari, git, frontmatter).

| fatto | dato |
|---|---|
| Note portate da te | **6** (2 spunti, 2 idee, 2 ricerche), più il seme compilato in chat |
| Note proposte da Claude | **~106** idee e fonti, più ~150 collegamenti proposti: rapporto circa 1 a 15 |
| Proposte di Claude validate o rifiutate | **0 su 106**. Nessuna riga "validato il", nessuna "tolto il" |
| Domande "a pancia" di Claude con risposta | **0 su ~18** (una in coda a ogni diario) |
| `## Perché mi colpisce` compilati | **0 su 3**; il campo `risonanza` è vuoto ovunque |
| Immagini in `img/` · note in `inbox/` · pin | **0 · 0 · 6** |
| Ritmo | 4 giorni intensi (4–8 ottobre), poi **23 giorni di silenzio**, poi la richiesta di espandere |
| Codice costruito | sito ~7.200 righe, script ~1.500 |

E che cosa hai fatto con fatica, di tua iniziativa: **hai trascritto parola per parola il monologo di Rust**
([La coscienza come passo falso](/spunti/true-detective-coscienza/index.md)), hai portato Invictus intero, hai
aperto la lettura di Marco Aurelio. Le tue tre frasi più forti sulla macchina sono correzioni:
*"le altre mi sembra che te le sia inventate tu di sana pianta"*, *"troppo caos"*, e *"vai con la mappa"*
(l'unico sì entusiasta: a una **vista**, non a un contenuto).

**Lettura.** Tu porti parole di altri che ti hanno colpito, e non scrivi mai il perché. Non validi, non rispondi
alle domande, non curi. Torni quando c'è qualcosa da *vedere*. Il primo Atlante è cresciuto dalla parte sbagliata:
struttura e proposte, mentre il tuo flusso era un rivolo. Il nuovo sistema deve essere progettato per **questo**
utente, non per quello ideale che compila campi.

## 1. Che cos'è, in una frase

> **Uno specchio che ascolta: getti dentro, al volo, ciò che ti colpisce; lui lo tiene con le tue parole,
> lo intreccia con ciò che sa del mondo e te lo restituisce come la mappa di chi stai diventando,
> e come una voce che ti risponde con il tuo gusto.**

**Che cosa NON è.**
- **Non un second brain produttivo.** Nessun task, nessun progetto da far avanzare, nessuna "revisione settimanale"
  da fare tu. I tatuaggi stessi diventano una nicchia: un *uso* della mappa, non il suo scopo.
- **Non un diario.** Non racconti la giornata: porti ciò che ti ha colpito (una frase, un brano, una scena).
  La vita entra di sbieco, nel contesto del frammento.
- **Non un archivio da curare.** Zero validazioni in un mese lo dice: se il valore dipende dal tuo lavoro di
  manutenzione, il valore non arriva.
- **Non un oracolo generico.** "Top quote di Dostoevskij" chiesto a un'AI qualunque dà la lista di tutti.
  Qui deve dare il Dostoevskij che parla a *te*, accanto a Rust e a Camus.
- **Non un'opera tua da comporre.** È un'opera che l'AI compone *per* te, e tu la guardi.

**La meraviglia di mappare una coscienza**, in concreto, nasce in quattro momenti, e nessuno è la cattura:
1. **Riconoscimento:** "è vero, è questo che mi tocca" (vedere i propri fili ricorrenti, nominati).
2. **Il ponte inatteso:** un frammento di oggi che si aggancia a uno di tre mesi fa, da un'altra tradizione
   (Galimberti ↔ Rust ↔ Zapffe). È il tuo principio fondatore: *"le convergenze valgono più delle citazioni"* (seme, §1).
3. **Il tempo che si vede:** *"le versioni di me morte lungo il percorso"* (nucleo, tue parole). Accorgersi di
   essere cambiato, con le prove.
4. **La domanda che non sapevi di volere:** è scritta nel [nucleo](/nucleo.md), come desiderio estetico. Il sistema
   deve, di rado, parlare per primo.

La cattura è il prezzo, la restituzione è la ricompensa. Il primo Atlante ha costruito solo il prezzo.

## 2. Principi di progetto

1. **Catturare costa zero e non chiede niente.** *Prova:* 0 risposte su ~18 domande, 0 "perché mi colpisce";
   *"Non ti azzardare a farmi perdere tempo"*; lavori dal telefono. *Quindi:* il messaggio si salva sempre, anche
   se l'AI non capisce nulla; nessuna domanda obbligatoria; la risposta sta in 2 righe.
2. **Le tue parole sono sacre, l'invenzione è il peccato originale.** *Prova:* "di sana pianta"; le 14 idee del seme
   riportate a `validata: false`. *Quindi:* il testo che mandi si conserva intatto e separato da tutto ciò che
   l'AI aggiunge; nessuna frase dell'AI scritta "con la tua voce"; fatti e citazioni verificati o dichiarati incerti.
3. **Provenienza sì, cancello no.** *Prova:* 0/106 validazioni; con "troppo caos" la soluzione fu *nascondere* le
   proposte, e oggi più di un terzo dell'archivio è invisibile di default. *Quindi:* ciò che l'AI estrae (temi, legami,
   convergenze) è una **lettura** marcata come sua e sempre rigenerabile, ma **usabile subito** nelle risposte.
   Non serve approvarla. Conta come segnale ciò che tu riprendi, ignori o correggi in chat, non un campo da spuntare.
4. **La reazione è già nel messaggio.** *Prova:* "molto interessante" nel tuo esempio di Galimberti; il monologo
   trascritto per intero *è* la reazione (nessuno trascrive 90 parole di ciò che non lo tocca). *Quindi:* l'intensità
   si legge dal gesto e dalle parole ("mi ha distrutto", una trascrizione lunga, un ritorno), non da un voto 1–3.
5. **Prima il concetto, poi il soggetto.** *Prova:* CLAUDE.md; nel tuo esempio il messaggio parla di Galimberti, ma
   tu vuoi uscirne con *"amore, arte, i greci, tristezza, rapporti"*. *Quindi:* la persona e l'opera sono la maniglia,
   il significato è il nodo. Le domande per tema devono funzionare dal giorno uno.
6. **Pop e alto sullo stesso piano.** *Prova:* nel nucleo Peterson, Marco Aurelio e Camus stanno accanto a FMA, Berserk
   e Deftones; *"il riferimento pop va nascosto nel dettaglio, l'archetipo deve reggere da solo"*. *Quindi:* nessuna
   gerarchia di fonti; il mezzo (reel, canzone, anime) è un attributo, mai una categoria che separa.
7. **Il tempo è la dimensione della coscienza.** *Prova:* nucleo *"è vivo"*; *"il tatuaggio racconta il viaggio, non
   la tappa"*; *"versioni di me morte"*. *Quindi:* tutto è datato e niente si sovrascrive; il punto di vista si
   fotografa a date; il sistema sa dire "a marzo / adesso".
8. **Il mondo entra filtrato dalla tua lente.** *Prova:* tre delle tue quattro domande d'esempio ("canzoni con questo
   tema", "di questo genere", "top quote di Dostoevskij") chiedono conoscenza del mondo, non ciò che hai salvato:
   di Dostoevskij oggi non hai salvato niente. *Quindi:* l'archivio è soprattutto un **profilo** che orienta la
   conoscenza dell'AI. Risposta = mondo × la tua coscienza, con il confine "tuo / fuori archivio" sempre visibile.
9. **Vedere, non sfogliare.** *Prova:* l'unico sì entusiasta è a una mappa; "troppo caos" è una reazione a ciò che
   *vedi*. *Quindi:* la restituzione visiva (o un ritratto scritto) non è un "dopo l'MVP": è la ricompensa, e va presto.
10. **La struttura è dell'AI, non tua.** *Prova:* non hai mai toccato un frontmatter; il rapporto struttura/contenuto
    del primo Atlante (1 a 15 sulle note, peggio sul codice). *Quindi:* lo schema serve a far rispondere bene l'AI;
    tu non devi conoscerne né i tipi né i predicati. Ogni campo che richiede te è un campo morto.
11. **Affrontare, non compiacere.** *Prova:* *"attraversare il dolore a occhi aperti"*, *"non nascondermi,
    affrontarlo"*; distingui con cura assurdo e nichilismo. *Quindi:* lo specchio deve saper contraddire: mostrarti
    una tensione, una frase che smentisce il tuo nucleo, non solo conferme.
12. **Il silenzio è legittimo.** *Prova:* 23 giorni senza scrivere, poi il ritorno. *Quindi:* niente solleciti,
    niente code che crescono mentre sei via; al ritorno funziona tutto come prima, e il ritorno stesso può essere un
    momento di meraviglia ("mentre eri via, ecco cosa si è collegato").

## 3. Scene d'uso

Le citazioni altrui nelle scene sono segnaposto quando non verificate: qui conta la forma, non il contenuto.

**1. Martedì, 23:40, a letto.** Un reel di Galimberti. Scrivi: *"ho visto questo spezzone di galimberti, del suo
spettacolo x, diceva "....", molto interessante"*. Ricevi: *"Salvato. Parla di amore e di tristezza, e dei Greci.
Si lega a Rust ('la coscienza come passo falso'), che hai salvato il 4 ottobre: entrambi sul prezzo della lucidità.
Lo spettacolo potrebbe essere 'X' (da verificare)."* Nessuna domanda. *Provi:* la cosa di stasera ha trovato posto
accanto a una tua cosa vecchia, senza fatica.

**2. Giovedì, 19:10, in macchina sotto la pioggia.** Detti tre parole: *"digital bath, mi scioglie"*. Ricevi:
*"Salvato."* Basta. *Provi:* niente. Ed è giusto: è la cattura a costo zero.

**3. Domenica, 16:00, sul divano.** *"Dammi canzoni sul sentirsi svuotati ma in pace."* Ricevi: due cose tue (Digital
Bath, "giovedì scorso"; un brano Radiohead dal nucleo), poi tre **fuori archivio**, scelte sul tuo gusto (wave eterea,
malinconica), ognuna con titolo, album e il momento giusto del brano. *"E di questo genere?"* Ne arrivano altre.
Dici *"la seconda sì"*: entra. *Provi:* l'AI ti conosce; non è una playlist di tutti.

**4. Un pomeriggio qualunque.** *"Top quote di Dostoevskij."* Ricevi cinque frasi **verificate** (opera e capitolo,
o "da verificare"), ordinate non per fama ma per vicinanza al tuo filone (dolore attraversato → amore e verità),
ognuna con una riga: *"accanto al tuo Camus"*, *"risponde al monologo di Rust"*. *Provi:* il classico diventa tuo.

**5. Una sera storta.** *"Mi sento vuoto."* Il sistema non fa terapia e non ti consola con frasi sue: ti restituisce
le tue. *"Il 4 ottobre avevi scritto: 'calma nell'esplorarne i concetti data dall'immensità del dolore superato'. E
avevi salvato il promontorio di Marco Aurelio."* *Provi:* ti risponde una versione di te che c'era già passata.

**6. Fine aprile 2027, sei mesi.** Senza che tu chieda (una volta a stagione), un **ritratto**: 40 frammenti; il dolore
domina ancora, ma da febbraio "amore" compare quattro volte, prima mai; Rust non torna da dicembre; tre ponti nuovi
tra tradizioni. In fondo, **una** domanda: *"Nel nucleo l'oltre è 'amore e verità'. Hai salvato molta verità e quasi
niente amore: è una tappa o una scelta?"* *Provi:* la domanda che non sapevi di volere.

**7. Ottobre 2028, due anni.** *"Che cosa pensavo dell'assurdo due anni fa?"* Ricevi lo sguardo di allora accanto a
quello di oggi, con le frasi che hanno segnato il passaggio. Oppure decidi un tatuaggio: *"quali cose sono tornate
più spesso in due anni?"* Le costanti di lungo periodo sono, letteralmente, *il viaggio e non la tappa*: il tatuaggio
nasce da ciò che è sopravvissuto al tempo. *Provi:* vedere le versioni di te morte lungo il percorso.

**8. Dopo tre settimane di silenzio.** Mandi un link Spotify nudo. Ricevi: *"Salvato. Mentre eri via non è successo
niente da fare."* Nessun arretrato, nessuna coda. *Provi:* che tornare non costa.

## 4. I rischi di tradire l'essenza

- **La coda di validazione.** È già successo: 106 proposte ferme, archivio nascosto. Ogni meccanismo che richiede
  un tuo "sì" per funzionare è morto in partenza.
- **Le domande.** 18 senza risposta. Una domanda è un costo; vale solo se senza risposta il dato è falso
  (un'entità ambigua), mai per arricchire.
- **La struttura che cresce più del contenuto.** Quattro sessioni su sette del primo Atlante erano infrastruttura.
  Ogni giorno di costruzione deve produrre una restituzione che tu vedi.
- **La voce dell'AI che copre la tua.** Una citazione oggi porta 9 concetti, 4 simboli, 4 fonti, 4 percorsi
  ([La coscienza come passo falso](/spunti/true-detective-coscienza/index.md)): la tua frase sparisce sotto la
  lettura di Claude. Serve una proporzione: poche connessioni forti, non tutte quelle possibili.
- **Convergenze banali.** "Anche Nietzsche parlava di dolore" è rumore. Un ponte vale se è sorprendente e preciso
  (un'immagine, una frase), altrimenti non si dice.
- **Il cimitero.** Un archivio che cresce e non torna mai indietro: cattura senza restituzione.
- **L'eco.** Uno specchio che conferma soltanto. Tu chiedi di affrontare: servono anche le tensioni.
- **Le citazioni false.** Dostoevskij, Marco Aurelio, Nietzsche sono tra gli autori più mal citati del web. Una
  citazione inventata, in un sistema che si regge sulla fiducia, lo avvelena tutto.
- **L'etichetta che ti congela.** "Assurdista" oggi è una tappa; se diventa un attributo del profilo, il sistema
  smette di vederti cambiare.
- **Lentezza e costo.** 10–40k token e una sessione Code per ogni messaggio dal telefono: se salvare richiede un minuto,
  smetti di salvare.

## 5. La proposta alla luce dell'essenza

**Che cosa coglie.** Il repo privato. Il messaggio conservato parola per parola. Il frammento datato come episodio.
Le citazioni come note proprie, con un asse di verifica distinto dalla provenienza (ottimo, e cruciale per il punto 4
dei rischi). La modalità "solo cattura". Lo **sguardo** datato e mai sovrascritto: è il principio 7 tradotto bene.
Il consolidamento come lavoro dell'AI, non tuo. "Prima l'archivio, poi fuori archivio".

**Che cosa manca.**
1. **La restituzione.** Ritratto, ritorni, "ti ricordi?", mappa: tutti "dopo l'MVP" o facoltativi. L'MVP è solo
   ingestione: ripete esattamente la traiettoria del primo Atlante. Il primo traguardo dovrebbe essere una
   **restituzione** (un ritratto fatto sui 6 frammenti veri, sul seme e su 10 messaggi nuovi), e la pipeline dopo.
2. **La lente sul mondo.** Le domande 3 e 4 trattano la conoscenza esterna come ripiego. Per te è il caso principale:
   il profilo deve orientare le risposte sul mondo (principio 8).
3. **Il segnale implicito.** `pancia: 1–3` "solo mia" e la domanda "quanto ti ha colpito?" ripetono il campo
   `risonanza` rimasto vuoto ovunque. L'intensità va dedotta (principio 4), e marcata come deduzione.
4. **Che cosa vale prima della validazione.** Con `proposti:` separato, una ricerca per tema conta le proposte o no?
   Se no, il giorno uno nessuna domanda per tema trova niente (tutti i temi saranno proposti). Va deciso: per me
   **sì, contano**, distinte nella risposta.
5. **Il confronto.** `contraddice` esiste tra i predicati, ma nessuna scena lo usa per sfidarti.
6. **Un criterio di successo.** Nessuna misura dice se funziona. Proposta: messaggi a settimana dopo 3 mesi; quante
   restituzioni ti hanno fatto rispondere; zero code arretrate.

**Che cosa è sovra-ingegnerizzato.**
- **17 predicati e 11 tipi** per un flusso reale di qualche messaggio a settimana. All'inizio bastano: chi l'ha detto
  (`autore`), dove (`fonte`), di cosa parla (`parla-di`), che cosa cita (`cita`). Convergenze, contraddizioni,
  "evoca", "scoperto-tramite" l'AI può calcolarle al momento della domanda invece di scriverle.
- **~25 campi**, tra cui `stato` a tre valori, `ritorni`, `visibilita`, forza `slug@2`, `fruizione`, `quando` ≠
  `creato`: ognuno è una promessa di manutenzione.
- **Vocabolari chiusi a due livelli** (generi `rock > post-rock`) prima di avere dieci canzoni.
- **`trova.mjs` con Levenshtein, `indice.mjs` che riscrive i `## Collegamenti`, l'Action di merge automatico:**
  servono a un archivio di migliaia di note sfogliato su GitHub. Sotto le mille note, l'AI che legge un indice
  semplice basta; e tu non sfogli GitHub.
- **3–4 giorni di MVP** quasi tutti di tubature, con la prova vera (5 messaggi) all'ultimo passo.

**In una riga:** la proposta modella bene la *memoria*, ma progetta un archivista; tu hai chiesto uno specchio.
Tienine il nucleo (frammento verbatim, citazioni verificate, sguardo datato, repo privato), taglia metà dello
schema, e metti la restituzione al primo posto.
