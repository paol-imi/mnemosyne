# Il modello v2

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Non tocca note né script.
> Sintesi del secondo giro: [essenza](/progetto/v2/essenza.md), [archivio reale](/progetto/v2/archivio-reale.md),
> [esempi in ingresso](/progetto/v2/esempi-ingresso.md) (E01–E72), [esempi di domande](/progetto/v2/esempi-domande.md)
> (n.1–108, R1–R25), [cervello](/progetto/v2/cervello.md), [stato dell'arte](/progetto/v2/stato-arte.md).
> Il [primo giro](/progetto/proposta.md) serve solo da termine di confronto. Il collaudo è nel
> [banco di prova](/progetto/v2/banco-di-prova.md).

**In una riga.** Tu scrivi e basta. Ogni tuo messaggio diventa un **frammento** immutabile. L'AI lo **legge**, gli aggancia
**nodi** (persone, opere, citazioni, temi, raccolte) e ti **restituisce** ciò che vede. Nei file ci sono quattro tipi e otto
predicati. Tutto il resto (forza, vicende, stati nel tempo, convergenze, ritratto) si calcola.

---

## 1. Principi

Sono dieci. Ognuno ha la prova che lo fonda; se la prova cade, cade anche il principio.

1. **Le tue parole sono sacre.** Ciò che scrivi si conserva parola per parola, separato da ogni lettura, e l'AI non parla
   mai con la tua voce. *Prova:* "te le sia inventate tu di sana pianta", l'unico scatto d'irritazione documentato
   ([archivio reale §1](/progetto/v2/archivio-reale.md)). R2 (n.75): "le mie frasi, solo le mie" deve poter funzionare.
2. **Catturare costa zero.** Nessun campo, nessun comando, nessuna domanda obbligatoria; la cattura è cieca e
   l'elaborazione arriva dopo. *Prova:* 0 risposte su ~18 domande "a pancia", 0 su 3 "perché mi colpisce", `risonanza`
   vuota ovunque ([essenza §0](/progetto/v2/essenza.md)). Una sessione Code dal telefono costa 1-2 minuti
   ([stato dell'arte §4](/progetto/v2/stato-arte.md)): la cattura passa da un Comando rapido (1 secondo) e la sessione serve
   solo per conversare ([telefono](/progetto/v2/telefono.md)).
3. **La struttura è una lettura dell'AI: marcata, motivata, usabile subito.** Ogni legame dice da quale frammento viene,
   perché, e con quale voce. Nessun cancello di validazione. *Prova:* 0 decisioni su ~300 proposte, poi 23 giorni di
   silenzio ([archivio reale §1](/progetto/v2/archivio-reale.md)). Mem.ai si abbandona perché "non sai che cosa ha
   fatto l'IA" ([stato dell'arte §1](/progetto/v2/stato-arte.md)).
4. **La validazione è l'uso.** Una proposta diventa tua quando la riprendi, la porti da te o dici sì. Un no si registra
   e non torna più. Ciò che resta intatto sbiadisce nella vista, mai nei dati. *Prova:* il caso Karamazov, dove la proposta
   diventa sua perché lui porta la stessa frase ([archivio reale §5, prova 3](/progetto/v2/archivio-reale.md)), e R5
   (n.40–41: "salvami la terza", "la seconda non c'entra").
5. **Il significato si costruisce dopo, rileggendo il vecchio insieme al nuovo.** All'ingresso si fissano solo entità
   certe; i temi nascono nel consolidamento. *Prova:* la sequenza "padre" (S1): sei frammenti in cinque mesi, e "padre" compare solo di
   passaggio, mai come argomento (il padre di Telemaco, un litigio) ([esempi in ingresso, lezione 9](/progetto/v2/esempi-ingresso.md)). Negli studi sulla memoria, il sistema
   lento lavora *intercalando* nuovo e vecchio ([cervello §1](/progetto/v2/cervello.md)).
6. **La restituzione è il prodotto, e si scrive in prosa ancorata alle tue parole.** *Prova:* la meraviglia dell'Atlante
   sta in una ventina di convergenze in prosa; le 88 schede enciclopediche di Claude non le usa nessuno
   ([archivio reale §2–3](/progetto/v2/archivio-reale.md)). L'unico sì entusiasta, "vai con la mappa", è andato a una
   *vista* ([essenza §0](/progetto/v2/essenza.md)).
7. **Il tempo è sincero.** C'è un doppio tempo, quello del sistema e quello vissuto; le posizioni si superano e non si
   cancellano; le note importate non fanno serie storica; nessuna evoluzione si racconta se i dati non la mostrano.
   *Prova:* R10 (n.73 "com'è cambiato il mio modo di vedere il dolore?"): oggi la risposta onesta è "non lo so ancora".
   E70 "cosa pensavo a novembre?" vuole le tue parole e le date ([esempi in ingresso, lezione 10](/progetto/v2/esempi-ingresso.md);
   [esempi di domande, lezione 8](/progetto/v2/esempi-domande.md)).
8. **L'archivio è anche una lente sul mondo.** Le risposte uniscono ciò che è tuo e ciò che l'AI sa, e il confine resta
   visibile. Le citazioni sono verificate oppure dichiarate incerte. *Prova:* tre delle tue quattro domande d'esempio
   chiedono il mondo ([essenza §2.8](/progetto/v2/essenza.md)). Nel corpus, quasi metà delle citazioni d'autore ha
   l'autore o l'opera sbagliati: 8 su ~25, più 6 parafrasi ([esempi in ingresso §4](/progetto/v2/esempi-ingresso.md)).
9. **I nomi li dai tu, il sé non si precompila.** I temi prendono le tue parole, e quelle dotte vanno negli alias.
   Il tuo sguardo cambia solo con frasi tue. *Prova:* l'effetto Bartlett, l'AI che normalizza ("i greci" diventa "filosofia
   antica"), in [cervello §3](/progetto/v2/cervello.md). Ed E60: "Non l'hai mai chiamato così".
10. **Uno specchio che contraddice, con misura.** Poche cose forti, a volte una tensione, una domanda solo quando nasce
    da una differenza vera; il silenzio è legittimo. *Prova:* "attraversare il dolore a occhi aperti" (nucleo); E69
    contraddice il nucleo; i 23 giorni di silenzio; "troppo caos". E71 ("apatia totale"): la risposta giusta è "Ci sono".

---

## 2. Il nucleo scritto nei file

### 2.1 Quattro strati, una regola

| strato | che cosa | chi lo scrive | si modifica? | se si perde |
|---|---|---|---|---|
| **Detto** | `ingresso/` → `frammenti/` | tu, con il Comando rapido (oppure l'importazione); la Routine "smista" lo sposta, testo invariato | **mai** | perso per sempre: è l'unica verità |
| **Letto** | `letture/`, nodi (`persone/`, `opere/`, `citazioni/`, `temi/`, `raccolte/`) | l'AI | sì, per versioni; lo slug di un nodo **mai** | si rifà dai frammenti, a costo di token |
| **Restituito** | `restituzioni/` | l'AI | **mai**: è un fatto che quel giorno ti ha detto quella cosa | perso: ti ha detto qualcosa che non si ritrova |
| **Calcolato** | `.indice/` (locale, in `.gitignore`) e `contesto/` (versionato: `ritratto.md`, `indice.md`, `recenti.md` e `parole.md`, cioè tutti i tuoi frammenti parola per parola, letto dal Progetto claude.ai) | uno script, senza AI, a ogni passata della Routine | si rigenera | si rifà in un secondo |

**La regola che regge cinque anni:** il formato di `frammenti/` non deve cambiare mai. Le letture si possono rifare tutte
con un modello migliore. I nodi cambiano descrizione e alias, ma il loro slug resta (Luhmann:
[cervello §8](/progetto/v2/cervello.md)). Le restituzioni sono un diario di ciò che lo specchio ha detto.

Qui contraddico la decisione 1 del coordinatore: "tutto il resto è ricalcolabile" vale per le letture, non per lo slug di
un nodo né per le restituzioni. Se un ricalcolo rinomina `umberto-galimberti`, si rompono cinque anni di rimandi. Se si
riscrive una restituzione, "la terza" non punta più a niente.

### 2.2 Quattro tipi

#### `frammento`: ciò che hai detto

Un frammento è ogni tuo messaggio, comprese le domande ("dammi canzoni sul padre": E58 dice che la domanda è un segnale;
la lezione 6 delle domande dice che le domande che fai sono il tuo ritratto più fedele) e comprese le risposte di una
parola ("sì", "la terza", "no").

Si chiama `frammenti/AAAA/MM/AAAAMMGG-HHMM-xxxx.md`, con lo stesso nome che il Comando rapido gli ha dato in `ingresso/`
(`xxxx` evita le collisioni tra due memo dello stesso minuto; negli esempi lo ometto). L'id è l'ora del messaggio: la
cattura non ha bisogno di AI per dare un nome. Allegati: `.webp`, `.m4a` accanto, con lo stesso nome.

| campo | obbligatorio | perché esiste (senza, che cosa fallisce) |
|---|---|---|
| `registrato` | sì | il tempo del sistema. Senza: E70 "cosa pensavo a novembre?" |
| `canale` | sì | `telefono` · `chat` · `importato`. Senza: R13 (n.66) e la regola "le importate fuori dalle serie" |
| `voce` | solo se importato | `sua` · `seme`. Senza: R2 (n.75) "le mie frasi, solo le mie" tratterebbe il seme (voce mista) come tuo |
| `in-risposta-a` | se è una risposta | l'id della restituzione a cui rispondi. Senza: n.40 "salvami la terza" non ha referente |
| `allegati` | se ci sono | `img/…webp`. Senza: E42 (la foto della pagina sottolineata) |

Il corpo è il testo **esatto**, link compresi, refusi compresi ("chioran", "nn"). Niente titolo e niente sezioni.

```md
---
registrato: 2026-11-03T23:40:12+01:00
canale: telefono
---
ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante
```

**Tolti dal primo giro**, perché nessun esempio li richiede alla cattura: `titolo`, `mezzo`, `contesto`, `pancia`,
`stato`, `quando`. Mezzo, momento e tempo vissuto si *leggono* dal testo e vanno nella lettura.

#### `lettura`: ciò che l'AI ha capito di un frammento

C'è una lettura per frammento, con lo stesso id, in `letture/AAAA/MM/`. Contiene **tutti** i legami che partono da quel
frammento: la provenienza è nella posizione stessa. Una lettura nuova (consolidamento, modello migliore) sostituisce la
vecchia e alza `versione`; la storia resta in git.

| campo | che cosa | prova |
|---|---|---|
| `versione`, `letto` | numero e data della lettura | un ricalcolo deve essere riconoscibile |
| `intento` | uno o più tra `salva` · `chiedi` · `correggi` · `accogli` · `rifiuta` · `sguardo` · `niente` (ciò che vuoi tu; gli `atti` dicono che cosa ne segue, in terza persona: `accoglie`, `rifiuta`, `corregge`) | lezione 1 degli ingressi: E12 è salva **e** chiedi; E49 non è nessuno dei due |
| `vissuto` | quando è accaduto, se diverso dal momento del messaggio; ammette l'incerto (`~2009`, `stanotte`) | E47 "a 17 anni", E55 il sogno |
| `reazione` | le tue parole di reazione **citate**, ciascuna con un segnale: `impatto` · `giudizio` · `identificazione`, e un verso `+` / `−` | lezione 8 degli ingressi: E08 "da bacio perugina" (giudizio −), E03 "mi ha spaccato" (impatto +), E28 "il disco della mia vita" (identificazione) |
| `legami` | elenco, vedi §2.3 | |
| `link`, `trascrizione`, `contesto` | i link puliti (senza `?si=`, con `t=`); il testo letto da una foto, riletto; il dove e il come in una riga ("in macchina") | E27, E37; E42; E22, E30 |
| `parole` | parole candidate a tema, non ancora temi | il tema nasce alla seconda o terza ricorrenza ([stato dell'arte §6](/progetto/v2/stato-arte.md)) |
| `atti` | che cosa fa questo frammento sui legami di altri: accoglie, rifiuta, corregge | R5, E51 |

#### `nodo`: una cosa che ritorna

Un nodo è un'entità invariante, come una concept cell: lo stesso nodo che lo si chiami "Galimberti", "Umberto" o "quello
dell'Ospite" ([cervello §5](/progetto/v2/cervello.md)). Ha cinque generi, ciascuno con la sua cartella.
Nasce **solo** quando un tuo frammento lo nomina, oppure quando tu accogli una proposta (n.40). Mai per copertura
([archivio reale, lezione 7](/progetto/v2/archivio-reale.md)). La scheda è un **documento d'identità**, non una voce
d'enciclopedia: il sapere generale l'AI ce l'ha già.

Campi comuni: `nome`, `alias`, `nato-da` (elenco di id di frammenti o restituzioni), facoltativi `link` e gli ID esterni
([identità](/progetto/v2/identita.md)): `wikidata` (un QID, oppure `no` con la data della prova: un ID sbagliato è peggio
di nessuno), `musicbrainz` (il work per un brano, il release-group per un album, l'artista), `registrazione` (il recording,
solo se conta la versione: Cash e non NIN), `openlibrary` (libri senza QID), `titolo-vero` (quando il titolo che hai scritto
è sbagliato). Generi e alias esterni non si salvano: si leggono dall'ID quando servono, in una cache fuori dalle note.
I campi che puntano ad altro (`autore`, `in`, `attribuita-a`, `versione-di`) contengono uno slug se il nodo esiste,
altrimenti il nome in chiaro: un nodo non nasce per riempire un campo.

| genere | campi propri | prova |
|---|---|---|
| `persone/` | `cerchia`: `mondo` · `vita` · `finzione`; `in` (per la finzione: l'opera) | E08/E45 "marco" ≠ Marco Aurelio; E26 nonna Lina, privata; E56 Hohenheim, E53 Telemaco |
| `opere/` | `autore`, `in` (album, serie, film che la contiene), `versione-di`, `anno` | E22 la traccia 3 di un album; E54 la poesia dentro *Interstellar*; E23/E24 le cover |
| `citazioni/` | `originale`, `traduzione` e `traduttore` (oppure `resa di Claude`); `autore` (vero), `attribuita-a` (come circola), `detta-da` (personaggio); `riferimento` (opera, luogo, url, data della verifica); `esito`: `verificata` · `simile` · `attribuzione-errata` · `apocrifa` · `non-trovata`; `prova`: `primaria` · `secondaria` · `memoria` (con `memoria` niente esito) | E03–E10; la prova di [citazioni](/progetto/v2/citazioni.md): 0 su 12 giuste alla lettera; n.43 "top quote di Dostoevskij" usa solo `autore`; E18, la battuta di Ivan non è Dostoevskij che parla |
| `temi/` | nessuno oltre ai comuni; `nato-da` è l'elenco dei frammenti-prova | E60 "padre"; le emozioni sono temi (apatia, gioia), e il predicato `sente` le distingue |
| `raccolte/` | `scopo` (una riga, parole tue) | "tatuaggi", con E09 "me la tatuerei" ed E65; R11 (n.82) |

Le **varianti** di una citazione non sono un campo: sono i frammenti che la citano, ciascuno con le tue parole. La
versione "come circola" sta nel tuo frammento, quella vera nel nodo, e la vista le mette una accanto all'altra (E03).
Un campo `varianti` duplicherebbe il frammento e prima o poi gli darebbe torto.

Una **persona della vita** (`cerchia: vita`) non si fonde mai con un autore, non riceve temi proposti, non ha `wikidata`,
e il repository che la contiene è privato. **Il nuovo repository deve essere privato**: l'Atlante è pubblico, e nonna Lina
non può stare in un sito pubblico (E26).

#### `restituzione`: ciò che lo specchio ti ha detto

`restituzioni/AAAA/MM/r-AAAAMMGG-HHMM-forma.md` (il prefisso `r-` la distingue da un frammento della stessa ora),
scritta una volta e mai cambiata.

| campo | che cosa | prova |
|---|---|---|
| `forma` | `risposta` · `settimana` · `ritratto` · `ricordi` (il "ti ricordi?") · `ritorno` (dopo un silenzio) | il ritmo del §4 |
| `per` | il frammento che l'ha chiesta, se è una risposta | la catena n.37 → 40 → 41 |
| `importata` | `true` per le restituzioni venute dall'Atlante: fuori dai conti e mai rilanciate | §8.5 |
| `voci` | gli elementi numerati della risposta, ciascuno con un riferimento a un nodo o al mondo | n.40 "salvami la terza" deve sapere che cos'era la terza |
| `legami` | i legami che la restituzione propone (convergenze, ponti), con `perche` | archivio reale lezione 6: la convergenza vale solo in prosa |

Il corpo è il testo consegnato, con i segni di voce (§2.4).

**Le convergenze sono restituzioni.** Una convergenza è prosa più legami `converge-con`: vive nella restituzione che l'ha
detta, è proposta finché non la riprendi, e il suo testo resta com'era quel giorno. Le 25 convergenze che
[eredità](/progetto/v2/eredita.md) porta dall'Atlante entrano come restituzioni importate (`forma: ritratto`,
`importata: true`), con legami di voce `seme` ✧ dove la convergenza era già nel seme e `proposta` ◌ dove era di Claude. Non serve un quinto tipo.

**Lo sguardo non è un tipo.** Il nucleo entra come frammento importato (`voce: seme`), e la sua lettura ha
`intento: sguardo`. Una versione nuova dello sguardo è un tuo frammento che tu dichiari tale ("questo è dove sono adesso"),
oppure il sì a una restituzione che ti mette davanti **le tue frasi** da riunire. L'AI non scrive mai uno sguardo.
Il "working self" strutturato del [cervello §2](/progetto/v2/cervello.md) (temi di vita, io sono, obiettivi) è una
**vista** calcolata dai frammenti con `intento: sguardo` e con reazione di identificazione. Non è un file da compilare.

### 2.3 Otto predicati

Un legame è una voce dell'elenco `legami:` di una lettura (o di una restituzione). Ha un predicato, un oggetto, la `voce`,
il `perche` e, se servono, dei qualificatori.

| predicato | da → a | qualificatori | prova (senza, che cosa fallisce) |
|---|---|---|---|
| `nomina` | frammento → persona, opera, citazione | `momento` (12:34, cap. 34, atto, traccia), `fruizione` (`da-fare` · `in-corso` · `fatta`) | E01, E37 "dal minuto 12", E44 "devo leggere", E50 "finito karamazov" |
| `parla-di` | frammento → tema, o qualunque nodo usato come immagine | `come: metafora` | E67 "mi sento come Sisifo": parla di Sisifo come metafora, non come argomento |
| `sente` | frammento → tema (emozione) | | E71 "apatia totale"; la serie dell'inverno (S4); lezione 7: lo stato appartiene al momento, non all'opera |
| `tramite` | frammento → persona, opera | | E08 Marco, E10 Frankl, E46 la nonna: chi te l'ha fatta incontrare |
| `serve-a` | frammento, nodo, restituzione → raccolta | | E09 "me la tatuerei"; R11 (n.82) |
| `ritorna-su` | frammento → frammento o restituzione | `come`: `aggiunge` · `corregge` · `ripensa` · `effetto` | E02 "era verso la fine"; E51 "non era jung"; n.51 "mi ha fatto bene"; il ritorno di dicembre su Galimberti |
| `contraddice` | frammento → frammento | | E69 contro il nucleo, E70 contro E66: la linea delle posizioni |
| `converge-con` | tra due o più nodi o frammenti | (solo con `perche` in prosa) | E62 "è uguale a cohen!!" (voce sua); le convergenze delle restituzioni |

`autore`, `attribuita-a`, `in`, `versione-di` e `detta-da` sono **campi dei nodi**, non legami: sono fatti del mondo,
con il loro `esito`.

**Tolti dal primo giro:** `cita` (è `nomina` di un nodo citazione), `suscita` sull'opera (lezione 7: l'emozione di
un'opera si calcola dai tuoi frammenti), `evoca` (è `parla-di` con `come: metafora`), `simile-a` (è `converge-con`),
`sviluppa` (è `ritorna-su`), `influenzato-da` (fatto del mondo, si dice in risposta, non si scrive), `scoperto-tramite`
(diventa `tramite`), `polarita`, `prototipo`, `fondante`, `sorpresa` (si calcolano o non servono: §3).

### 2.4 Le voci (la provenienza)

Ogni legame, e ogni riga di una restituzione, porta una di queste voci:

| voce | segno | che cosa vuol dire | come ci si arriva |
|---|---|---|---|
| `sua` | ✦ | l'hai detto tu, in quel frammento ("galimberti", "è uguale a cohen") | lettura |
| `seme` | ✧ | dalla chat d'origine: parole tue con sintesi di Claude | importazione |
| `accolta` | ● | proposta dall'AI e poi ripresa o confermata da te | **calcolata** dagli `atti` successivi |

Oltre alla voce, ogni legame ha uno **stato**, sempre calcolato: `vivo` (il normale), `rifiutato` (un tuo no: non entra più
nelle risposte né si ripropone), `sbiadito` (proposta intatta da 60 giorni), `superato` (posizione contraddetta più tardi).
| `proposta` | ◌ | lettura dell'AI | lettura, consolidamento, restituzione |
| `mondo` | ○ | fatto esterno, con il suo `esito` e la sua `prova` | lettura, consolidamento |

Nella lettura si scrive la voce con cui il legame **nasce** (sua, seme, proposta o mondo). `accolta` e `rifiutata` non si
scrivono mai sopra: le calcola l'indice dagli `atti` dei frammenti successivi. Così la storia della validazione è fatta
di tuoi messaggi datati, e non di un campo cambiato in silenzio.

```yaml
# letture/2026/11/20261121-1505.md   ("sì, ha senso, tienila")
atti:
  - accoglie: {di: r-20261108-2100-settimana, n: 1}
    perche: "«sì, ha senso, tienila»"
```

Che cosa conta come accoglienza: un sì esplicito a una restituzione; un tuo frammento che porta da sé lo stesso legame
(Karamazov); "salvami…". Che cosa **non** conta: averla letta, o fare una domanda su di essa (n.58 "perché me l'avevi messa?"
chiede, non accoglie).

### 2.5 L'eredità dell'Atlante, con i nomi del modello

I segnaposto delle regole R1–R13 di [eredità](/progetto/v2/eredita.md), riempiti:

| segnaposto | nel modello |
|---|---|
| `<frammento>`, `<testo originale>`, `<data>` | `frammento` con `canale: importato`, corpo esatto, `registrato` = la data dell'Atlante (punto zero: ≤ 2026-10-07, fuori dalle serie) |
| `<voce:utente>` · `<voce:mista>` | `voce: sua` · `voce: seme` |
| `<provenienza: file:riga>` | `link` al file dell'Atlante su GitHub, nella lettura del frammento importato |
| `<sguardo datato>` | il frammento importato del nucleo, `voce: seme`, lettura con `intento: sguardo` |
| `<convergenza>`, `<aggancio>` | `restituzione` con `forma: ritratto`, `importata: true`, legami `converge-con` con `perche`, e un legame verso la frase U/M che la ancora |
| `<entità persona/opera/mito/concetto>` | nodi in `persone/`, `opere/` (il mito è un'opera, i suoi personaggi persone `finzione`), `temi/` (il concetto) |
| `<progetto: tatuaggi>`, il brief | `raccolte/tatuaggi.md`: `scopo` in una riga; il brief è un frammento importato `voce: seme` con `serve-a: tatuaggi` |
| `<idea attiva>` (le 2 sue) · `<candidato dormiente>` | frammento `voce: sua` · restituzione importata ◌ con `serve-a: tatuaggi` |
| `<riferimento visivo esterno>` (pin) | il link del pin nel frammento importato che lo conteneva; nessuna immagine nel repo |
| `<proposta>`, `<origine: claude>` · `<soglia di decadimento>` | voce `proposta` ◌ · 60 giorni, poi stato `sbiadito` |
| `<verifica: sicura / da-verificare>` | `esito` + `prova`; "da verificare" = `prova: memoria`, senza esito |
| `<vocabolario emozioni>` | le 10 parole tue come nodi `temi/` nati dal frammento del percorso interiore; le 4 di Claude come proposta |
| `<fonte esterna: URL>` · `<pista>` | `link` del nodo · `nomina` con `fruizione: da-fare` |
| `<domanda>` hub (le 8 domande) | nodi `temi/` con il titolo-domanda come `nome`, `voce: seme`; i cori restano nell'Atlante |
| `<preferenze-di-lavoro>`, `<spunto-per-claude>` | non sono dati: vanno nel `CLAUDE.md` del nuovo repo |
| `<tradizione>` | non è un tipo: un tema col tuo nome ("i greci") se ricorre |

### 2.6 Regole di confine (dal collaudo sul banco)

- **Un nodo nasce se lo nomini tu**, anche alla prima occorrenza: persona, opera, ma anche un concetto o un'immagine con un
  nome proprio (kintsugi, nave di Teseo). La regola della ricorrenza (2-3 frammenti) vale per i **temi che l'AI deduce**
  ("padre"). Un'idea attribuita che non è una frase (Telemaco secondo Recalcati) è un `nomina` della persona giusta con voce
  `mondo` e il `perche`: non diventa una citazione.
- **"La 3" di un album (E22).** All'ingresso: `nomina` dell'album con `momento: traccia 3` e una domanda; il titolo si
  risolve nel consolidamento con MusicBrainz e diventa un nodo opera con `in: <album>`.
- **Un ritorno su una restituzione** usa `ritorna-su: {di: r-…, n: 1}` e `come: effetto` ("mi ha fatto bene", n.51).
  Un effetto positivo vale come accoglienza.
- **`contraddice` rende `superata` una posizione** solo se ha voce `sua` ("camus si sbagliava", E70) o se è stato accolto.
  Proposto dall'AI (E69 contro il nucleo) è una tensione da mostrare, non una posizione chiusa.
- **La chat del Progetto legge `contesto/`.** Le domande sulle tue parole esatte di mesi fa trovano tutto in
  `contesto/parole.md`. Quando diventerà troppo grande per il Progetto, si passa al tab Code o al connettore.

---

## 3. Il livello derivato

### 3.1 Che cosa si calcola, quando, dove

| che cosa | quando | chi | dove vive |
|---|---|---|---|
| intento, riferimenti ("quella di ieri"), entità certe, `reazione`, legami di voce sua e mondo, al massimo 2 proposti | **ingresso**, dalla Routine "smista", in pochi minuti (da misurare) | AI | `letture/` |
| verifica di una citazione: passo 1 (apocrifi noti: Quote Investigator, PolitiFact) | ingresso, 1-2 ricerche; fino al consolidamento `prova: memoria` | AI + ricerca | nodo `citazioni/` |
| verifica, passi 2-3 (testo primario, traduzione pubblicata) | consolidamento, fase 1, un subagent ogni 3 citazioni; **obbligatoria** prima di proporre una citazione scelta dall'AI | AI + ricerca | `esito`, `prova`, `riferimento` |
| temi nuovi (alla 2ª–3ª ricorrenza, con il tuo nome), fusione dei doppioni, divisione dei temi troppo larghi | **consolidamento, fase 1** | AI | `temi/`, letture in versione nuova |
| ID esterni, mai all'ingresso (MusicBrainz può metterci 15 s) né per persone della vita e citazioni sciolte | consolidamento, fase 1, quando l'entità diventa un nodo | `risolvi.mjs` propone i candidati, l'AI sceglie; a te una domanda sola, e solo se restano due candidati dello stesso tipo | `wikidata`, `musicbrainz`, `registrazione`, `openlibrary`, `titolo-vero` |
| contraddizioni con le posizioni e con lo sguardo | consolidamento, fase 1 | AI | legame `contraddice` |
| il sogno, il "ti ricordi?", la convergenza della settimana | **consolidamento, fase 2** | AI | `restituzioni/` |
| voce calcolata (`accolta`) e stato di ogni legame (vivo, rifiutato, sbiadito, superato), forza dei legami, vitalità dei nodi | **a ogni commit** | script, senza AI | `.indice/grafo.json` |
| serie degli stati (`sente` nel tempo), linea delle posizioni con la loro validità | a ogni commit | script | `.indice/tempo.json` |
| **vicende** (≥3 frammenti sullo stesso nodo, tema o parola candidata in ≤60 giorni) | a ogni commit | script | `.indice/vicende.json` |
| scarti (ciò che hai rifiutato, in quale contesto) | a ogni commit | script | `.indice/scarti.json`, letto prima di ogni proposta |
| conteggi per voce, per tema, per emozione, per mese (fuori le importate) | a ogni commit | script | `.indice/conti.json` |
| convergenze, risonanza (PageRank personalizzato a due passi), lente sul mondo, ritratto su richiesta | **al momento della domanda** | AI + script | nella risposta; nei file solo come restituzione |

**Le formule, semplici e scritte nel codice (non nei dati):**
- *forza di un legame tra due nodi* = numero di frammenti che li legano, con peso 2 se la reazione è d'impatto o
  d'identificazione, 2 se il frammento è un ritorno, 0 se il legame è rifiutato;
- *vitalità di un nodo* = somma dei frammenti che lo toccano, ciascuno smorzato con l'età (mezza vita di 90 giorni), più
  1 per ogni ritorno; serve a scegliere il "ti ricordi?" (alta importanza, bassa vitalità) e a ordinare le viste;
- *sbiadito* = legame `proposta` mai toccato da 60 giorni: scende in fondo alla vista e non entra nelle risposte "nella mia
  testa", ma resta nei dati e può risalire se ritorna;
- *validità di una posizione* = dal suo frammento al primo frammento che la `contraddice` (bi-temporale: si sa sia
  quando l'hai pensato sia quando hai smesso);
- *sorpresa* = un frammento che non aggancia nessun tema esistente o che `contraddice` lo sguardo; non si scrive, serve
  solo a mettere quel frammento in cima al consolidamento.

**Che cosa resta fuori dai calcoli nel tempo.** I frammenti con `canale: importato` sono "il punto zero" (4–7 ottobre
2026): rispondono a "cosa pensavo a ottobre", ma non entrano nelle serie né nei "da febbraio compare quattro volte".
Il git log dell'Atlante non è la storia del tuo pensiero (R10).

**Come si ricalcola.** La Routine è una sessione nuova a ogni avvio: `.indice/` si rifà a ogni passata con `node indice.mjs`,
in un secondo, e `scripts/contesto.mjs` rigenera `contesto/`, che è versionato perché il Progetto claude.ai lo legge da GitHub. Le letture si rifanno con
`rileggi --da 2026-11 --versione 2`: si rileggono i frammenti nel loro ordine, perché gli `atti` dipendono da ciò che
c'era prima; gli slug esistenti si passano al modello come vincolo e le restituzioni si leggono come contesto, senza
riscriverle. Se una rilettura non trova più un legame che avevi accolto, **vince l'atto**: il legame accolto si conserva.

### 3.2 Le viste (sul telefono, in markdown)

Sono calcolate e generate su richiesta, mai salvate a mano:
- **la pagina di un nodo**: in testa 3–5 "porte" (i tuoi frammenti più forti, con la data), poi le convergenze, poi il
  resto per modalità: parole, suoni, immagini, persone ([cervello §5, §8](/progetto/v2/cervello.md));
- **la linea del tempo**: posizioni e stati per mese, con le tue parole;
- **il ritratto**: §4.3;
- **la mappa**, che dal primo giorno può essere il sito VitePress dell'Atlante puntato sul nuovo indice, privato.

---

## 4. I cicli

### 4.1 Ingresso (secondi, poi minuti)

1. **Cattura, in 1 secondo e senza AI.** Il Comando rapido "Memo" fa un `PUT` via API GitHub in `ingresso/` e poi
   il `fire` della Routine "smista". Sul telefono vedi "Salvato". Se tutto il resto fallisce, il grezzo c'è: la cattura
   non si perde mai (essenza, principio 1). Una passata ogni 3 ore raccoglie i rimasti.
2. **Lettura, in pochi minuti, in modo asincrono** (la Routine "smista"; [telefono](/progetto/v2/telefono.md)).
   Sposta il grezzo in `frammenti/` con `registrato` e `canale`, poi, in quest'ordine:
   1. legge gli ultimi 3 giorni di frammenti e le ultime 5 restituzioni, per risolvere "quella di ieri", "la terza",
      "di questo genere" (lezione 10 degli ingressi);
   2. classifica l'intento; nel dubbio fa insieme salva e chiedi;
   3. risolve le entità: prima `cerchia: vita` per i nomi propri nudi (Marco), poi alias e ortografia fonetica ("chioran");
      crea il nodo solo se lo nomini tu; se l'entità è ambigua e un errore sarebbe permanente (E22 "la 3"), fa **una**
      domanda;
   4. scrive la lettura: legami di voce sua e mondo, al massimo 2 proposti e motivati, nessun tema nuovo, scarti letti
      prima di proporre;
   5. scrive la risposta di 1-2 righe come restituzione `forma: risposta`;
   6. rigenera `contesto/`, lancia la verifica, fa push su `main`.
3. **Le domande** si fanno nella chat del Progetto claude.ai, che legge `contesto/` (o nel tab Code, per quelle pesanti).
   Ogni domanda e ogni risposta della chat vanno salvate come frammento e restituzione: alla tappa 1 lo fa la chat stessa
   con un memo; alla tappa 2 lo fa il connettore MCP. Un memo-domanda riceve la risposta in `restituzioni/` e in
   `contesto/recenti.md`.

**La prudenza.** Su un tema delicato (E52 il suicidio, E26 il lutto, E71 l'apatia) la risposta è una riga umana, senza
proposte né temi, senza diagnosi, e non finge che non sia successo niente. Questi frammenti restano fuori dalla lettera,
dal "ti ricordi?" e dal sogno, finché non li riprendi tu.

### 4.2 Consolidamento (una notte a settimana, in due fasi)

Gira solo se nella settimana c'è almeno un frammento. Se sei stato in silenzio, non accumula niente.

**Fase 1, astrarre** (il sonno lento, [cervello §7](/progetto/v2/cervello.md)):
- rilegge i frammenti della settimana **insieme a un campione di quelli vecchi** sugli stessi nodi (venti al massimo),
  partendo dalle sorprese e da ciò che tocca lo sguardo;
- fa nascere i temi ricorrenti, con il tuo nome e i frammenti-prova (il "padre" di E60 nasce qui, non a caldo);
- fonde i doppioni, propone di dividere i temi troppo larghi, verifica le citazioni rimaste in sospeso, ancora gli ID;
- segna `contraddice` dove una posizione nuova urta una vecchia o lo sguardo;
- **tagging all'indietro**: un frammento d'impatto forte fa rileggere i 7 giorni prima, in cerca di frammenti deboli che
  c'entrano ([cervello §4](/progetto/v2/cervello.md));
- riscrive le letture toccate, in versione nuova.

**Fase 2, associare** (il sonno REM): sceglie **una** cosa sola tra
- una convergenza in prosa, agganciata a una frase tua di questa settimana;
- un confronto, se c'è una contraddizione fresca;
- un sogno: un legame lontano e ardito, dichiarato come gioco.

### 4.3 Restituzione: il ritmo e la forma sul telefono

| quando | che cosa | forma | lunghezza |
|---|---|---|---|
| a ogni messaggio | "Salvato" dal Comando rapido; poi la risposta della lettura: al massimo un aggancio ("ne hai già 3 su Galimberti", un ponte se è forte, una correzione di fatto) | tappa 1: in `contesto/recenti.md`, la vedi alla prima domanda o nella lettera; una notifica senza contenuto solo per una correzione di fatto o un ponte forte. Tappa 2: in chat | 1–2 righe |
| la domenica sera, se hai scritto | **la lettera della settimana**: una cosa tra convergenza, confronto e sogno, più al massimo un "ti ricordi?" | notifica senza contenuto ("la lettera è pronta" + link), dalla Routine "sogno" la domenica | una schermata del telefono |
| quando torni dopo 14 giorni o più | "mentre eri via": una sola cosa, mai un arretrato | nella risposta al primo messaggio | 2 righe |
| ogni tre mesi | **il ritratto**: che cosa torna, che cosa è nuovo, che cosa è sparito, **che cosa manca** (mai salvato, per tema e per mezzo), una tensione, **una** domanda | notifica senza contenuto + `contesto/ritratto.md` | una schermata |
| quando chiedi | tutto: ritratto, linea del tempo, confronti, la lente sul mondo | chat | breve, poi "vuoi il resto?" |

**Le regole di forma** (dalle prove di [restituzione](/progetto/v2/restituzione.md)): ogni pezzo parte da una tua frase ✦
con la data; il vuoto è un dato ("nessuna canzone", "nessun perché"); una convergenza ha una **direzione** (le fonti dicono
cose diverse sullo stesso legame, non la stessa cosa tre volte); il sogno si dichiara gioco, un legame solo, il motivo in una
riga; il confronto mette contro di te una voce che stimi e chiude con una domanda, l'unico caso in cui la lettera ne fa una.
Il mondo esterno si verifica prima, o si dichiara (⚠, "simile").

**I segni nelle risposte**, sempre gli stessi: ✦ sua (tua) · ✧ seme · ● accolta · ◌ proposta · ○ mondo · ⚠ da verificare.
[Restituzione](/progetto/v2/restituzione.md) usa ● per "tuo": va allineata a questi, perché lì ● vorrebbe dire due cose.
Le risposte "nella mia testa" o "solo le mie" usano ✦ e ●, e mostrano ✧ a parte, come voce mista (R2, n.75). Le altre mettono prima il tuo e poi il mondo. Ogni elenco
contiene **una voce della coda lunga**, qualcosa che non rivedi da tempo, perché richiamare sempre le stesse cose fa
dimenticare le altre ([cervello §6](/progetto/v2/cervello.md)).

### 4.4 Ritorni

- **"Ti ricordi?"**: un indizio, non il frammento intero: l'inizio della frase, con la fine nascosta ("A novembre, a teatro, Galimberti chiamava il nichilismo con
  un nome preso da Nietzsche: quale?"). Lo sceglie la vitalità: cose importanti e sbiadite. Gli intervalli crescono
  (una settimana, un mese, quattro mesi, un anno), uno per lettera al massimo.
- **La tua risposta è un frammento** con `ritorna-su`: completa l'indizio, dice "mi ha fatto bene" (`come: effetto`, n.51),
  oppure "adesso mi suona diverso" (`come: ripensa`). Il frammento vecchio non cambia: è la prova di chi eri allora.
- **Il ritorno spontaneo** ("rivisto interstellar", "ogni volta che…") pesa più di qualsiasi voto.

### 4.5 Decadimento

- Una proposta mai toccata sbiadisce dopo 60 giorni; un rifiuto non torna più nello stesso contesto (`.indice/scarti.json`).
- Un nodo con vitalità bassa scende nelle viste. Il dato resta, e un frammento nuovo lo rianima.
- Una posizione superata resta, con la sua finestra di validità.
- Non si cancella niente, mai: l'oblio sta nella vista, non nei dati (Funes rovesciato, [cervello §6](/progetto/v2/cervello.md)).

---

## 5. Il caso Galimberti, per intero

### 5.1 I messaggi (E01, E02)

> **Martedì 3 novembre 2026, 23:40** · ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni,
> diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante
>
> **Mercoledì 4 novembre, 08:12** · ah e la frase dell'ospite era verso la fine, quando parlava dei greci

### 5.2 I file scritti

**Alla cattura (23:40:12, 1 secondo):** `frammenti/2026/11/20261103-2340.md`, come nell'esempio del §2.2.

**Alla lettura (23:41):** `letture/2026/11/20261103-2340.md`

```yaml
---
versione: 1
letto: 2026-11-03T23:41:05+01:00
intento: [salva]
reazione:
  - parole: "molto interessante"
    segnale: giudizio
    verso: "+"
legami:
  - nomina: umberto-galimberti
    voce: sua
    perche: "«uno spezzone di galimberti a teatro»"
  - nomina: spettacolo-sulle-emozioni
    voce: sua
    perche: "«credo lo spettacolo sulle emozioni»; titolo proposto: Il mondo delle emozioni (da verificare)"
  - nomina: nichilismo-ospite-inquietante
    voce: sua
    perche: "«il nichilismo è l'ospite inquietante», detto da Galimberti secondo te"
  - parla-di: nichilismo
    voce: sua
    perche: "parola tua"
parole: [ragazzi, cultura]
---
```

**Tre nodi nuovi.** Il tema `nichilismo` esiste già dall'importazione (nel nucleo, "non nichilismo"), e così Nietzsche.

```yaml
# persone/umberto-galimberti.md
---
nome: Umberto Galimberti
alias: [galimberti, umberto galimberti]
cerchia: mondo
nato-da: [20261103-2340]
wikidata: Q4003398
---
```

```yaml
# opere/spettacolo-sulle-emozioni.md
---
nome: lo spettacolo sulle emozioni
alias: [spettacolo sulle emozioni]
autore: umberto-galimberti
nato-da: [20261103-2340]
---
```

```yaml
# citazioni/nichilismo-ospite-inquietante.md
---
nome: Il nichilismo, l'ospite inquietante
autore: friedrich-nietzsche
attribuita-a: [umberto-galimberti]
prova: memoria            # niente esito finché il consolidamento non fa i passi 2-3
originale: "Der Nihilismus steht vor der Tür: woher kommt uns dieser unheimlichste aller Gäste? (da verificare)"
traduzione: "Il nichilismo è alla porta: da dove ci viene questo, il più inquietante fra tutti gli ospiti?"
traduttore: resa di Claude
riferimento:
  opera: "Frammenti postumi 1885-1887"
  luogo: "2[127] (da verificare)"
nato-da: [20261103-2340]
---
L'immagine è di Nietzsche; Galimberti ne ha fatto il titolo di un libro (L'ospite inquietante, Feltrinelli 2007).
```

Il consolidamento fa i passi 2-3: testo primario, poi la traduzione pubblicata. Allora la nota prende `esito`, `prova:
primaria` e un `riferimento` con url e data; fino ad allora ogni risposta la segna ⚠. Il libro del 2007 **non** diventa un
nodo: tu non l'hai nominato, e lo si dice soltanto nella risposta.

**Il mattino dopo (08:12):** il frammento `20261104-0812` e la sua lettura, che risolve "la frase dell'ospite" sugli
ultimi 3 giorni:

```yaml
atti: []
legami:
  - ritorna-su: 20261103-2340
    come: aggiunge
    voce: sua
    perche: "«la frase dell'ospite era verso la fine»"
  - nomina: nichilismo-ospite-inquietante
    momento: "verso la fine"
    voce: sua
    perche: "«era verso la fine»"
parole: [greci]
```

"Greci" per ora resta una **parola** (prima occorrenza). Il frammento del 3 novembre non si tocca: l'aggiunta è un
frammento nuovo che lo punta. La vista dello spezzone li mostra insieme.

### 5.3 Che cosa ricevi subito

Sul telefono, all'istante: "Salvato". Pochi minuti dopo, in `contesto/recenti.md` (e in chat alla tappa 2):

> 23:41 · **Salvato.** "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro (2007) ○.
> Lo spettacolo era *Il mondo delle emozioni*? ⚠

> 08:13 · **Aggiunto allo spezzone di ieri.**

Niente temi elencati, niente "quanto ti ha colpito". C'è una domanda sola, perché il titolo è un'entità che resterebbe
sbagliata per sempre. Se non rispondi, il titolo resta una proposta nella lettura e sbiadisce; non succede niente di male.

### 5.4 Dopo una settimana: la lettera di domenica 8 novembre

Il consolidamento rilegge i frammenti della settimana, E01, E02 ed E66 ("bisogna immaginare Sisifo felice… stasera
sto bene", giovedì 5), insieme a un campione del vecchio sul nichilismo: il nucleo, il monologo di
Rust, Zapffe. Trova una **tensione**, che vale più di una conferma:

> **La settimana.** Martedì Galimberti ti ha portato l'ospite di Nietzsche ✦. Nel tuo nucleo c'è scritto "non
> nichilismo: accettare il peso, non nascondermi" ✧. Rust, che hai trascritto parola per parola, l'ospite lo fa sedere a
> tavola ✦ ("la coscienza come passo falso"). Giovedì, con Sisifo, hai scritto "oggi ci credo davvero" ✦.
> Tre voci sulla stessa porta: chi apre, chi la chiude e chi la guarda ◌.
>
> *Ti ricordi?* A inizio ottobre, nel tuo percorso interiore: "calma nell'esplorarne i concetti data dall'immensità…"

Nessuna domanda da compilare (la lettera ne fa una solo quando è un confronto): è da leggere. Se rispondi "sì, Rust è l'ospite", quel frammento **accoglie** la
voce 1 e il legame diventa ●.

### 5.5 Dopo tre mesi: febbraio 2027

Nel frattempo sono arrivati E53 (Telemaco attribuito a Galimberti, probabilmente Recalcati), E54 (*Interstellar*),
E55 (il sogno del papà al mare) ed E56 (Hohenheim).

- **Il nodo Galimberti** ha due frammenti tuoi più uno che gli era attribuito per sbaglio. La vista mostra: "2 ✦, 1
  attribuito da te e corretto: Telemaco è di Recalcati ○". Se a E53 avevi risposto "sì correggi", la correzione è ●.
- **Il tema `i-greci`**, se nel frattempo i greci sono tornati in altri due frammenti (ipotesi: il corpus non li ha), è
  nato alla terza occorrenza con il tuo nome, non "filosofia antica". Altrimenti è ancora una parola candidata.
- **Il "ti ricordi?" a un mese** (dicembre) è stato completato? Se sì, la vitalità sale e il prossimo arriva ad aprile;
  se no, l'indizio torna una volta, più facile, poi tace.
- **Il ritratto del trimestre** (inizio febbraio; i numeri sono di simulazione, le date vengono dal corpus):

> **Novembre–gennaio, 31 frammenti tuoi.** Tornano: il dolore (9), Sisifo (4), la musica di notte (6, quasi tutti dopo
> mezzanotte). È nuovo: quattro volte un padre, senza che tu l'abbia mai scritto: Telemaco, Murph che aspetta, il sogno al mare,
> Hohenheim ◌. È sparito: Rust non torna da ottobre. Una tensione: il 5 novembre Sisifo era felice, il 30 "oggi mi sento come Sisifo",
> e non era lo stesso ✦. **Una domanda:** nel nucleo l'oltre è "amore e verità"; da novembre hai salvato molta verità e un
> solo amore. È una tappa o una scelta?

Il padre è segnato ◌ perché è una lettura: il tema `padre` nasce solo a E60, quando lo chiedi tu ("cosa mi colpisce
ultimamente?"). Fino ad allora è una vicenda calcolata, e il ritratto lo dice come tale.

---

## 6. Sei casi difficili in ingresso

### 6.1 L'apocrifo: E04 "ciò a cui resisti persiste, jung. verissimo"

- **Frammento:** il testo. **Lettura:** `nomina: cio-a-cui-resisti-persiste` (sua); `reazione: "verissimo"` (giudizio +).
- **Nodo:** `citazioni/cio-a-cui-resisti-persiste.md` con `attribuita-a: [carl-gustav-jung]`, **nessun `autore`**,
  `esito: attribuzione-errata`, `prova: secondaria`, e una riga: "Slogan moderno; il passo di Jung più vicino è sull'ombra (da verificare)".
- **Risposta:** "Salvata, ma non risulta in Jung: è uno slogan moderno ○. È vicina a quella di ieri ✦."
- **Senza il modello, fallirebbe:** n.43 / "le migliori di Jung" la metterebbe in cima. Con `autore` vuoto non ci entra
  mai; resta trovabile con "le frasi che mi hanno colpito attribuite a Jung".

### 6.2 La persona della vita: E08, poi E45

- **E08** ("marco mi ha mandato quella di camus… da bacio perugina"): "marco" si risolve **prima** su `cerchia: vita`.
  Non c'è nessuno, ed è un nome proprio nudo detto in prima persona: nasce `persone/marco.md`, `cerchia: vita`,
  nessun alias pubblico. Legami: `tramite: marco` (sua), `nomina: non-camminare-davanti-a-me` (citazione con
  `attribuita-a: [albert-camus]`, `esito: apocrifa`). La reazione è `giudizio −`.
- **E45** ("marco stasera mi ha detto che sono sempre in guerra con me stesso"): `nomina: marco` (sua), `parla-di:
  battaglie-interiori` (proposta: le parole sono di Marco, il concetto è tuo dal seme). Le parole di Marco **non** diventano una citazione da verificare:
  restano nel frammento.
- **Risposta a E45:** "Salvato. 'Battaglie interiori' è una tua parola dal primo giorno ✧."
- **Senza il modello:** Marco Aurelio con un "da bacio perugina" attaccato; oppure Marco su un sito pubblico.

### 6.3 La correzione: E51 "no aspetta quella di ieri sulla casa in ordine non era jung era peterson"

- **Lettura:** risolve "quella di ieri" sugli ultimi 3 giorni (il frammento dell'11 marzo); `intento: [correggi]`;
  `ritorna-su: 20270311-…` con `come: corregge`.
- **Atto:**
  ```yaml
  atti:
    - corregge: {nodo: metti-in-ordine-la-tua-casa, campo: attribuita-a, da: carl-gustav-jung, a: jordan-peterson}
      perche: "«non era jung era peterson»"
  ```
- **Che cosa cambia nei file:** il nodo citazione aggiorna `attribuita-a`. La lettura di ieri passa a
  `versione: 2`, con `nomina` Peterson; il legame a Jung non resta come un fantasma. Il frammento di ieri **non cambia**.
- **Risposta:** "Corretto: Peterson ✦. La tua riga di ieri resta com'era, con la correzione accanto."
- **La trappola del primo giro** (il testo immutabile, ma la correzione dove sta?) si scioglie così: la correzione è un
  frammento, e il suo effetto è un atto sulla lettura.

### 6.4 La sequenza "padre" (S1: E53 → E60)

| data | frammento | che cosa scrive l'ingresso | che cosa vede il consolidamento |
|---|---|---|---|
| 16 nov | E53 Telemaco, "galimberti" | `nomina: telemaco` (finzione, in *Odissea*); `nomina: umberto-galimberti` (sua) + **mondo**: "più probabile Recalcati". Domanda: "Correggo?" | — |
| 13 dic | E54 *Interstellar*, "do not go gentle", "non dormo" | `nomina: interstellar`; `nomina: do-not-go-gentle` (opera con `autore: dylan-thomas`, `in: interstellar` come citata) | parola "aspettare" ricorrente (Telemaco, Murph) |
| 6 gen | E55 il sogno del papà | `nomina: papa` (vita); `sente`: nessuno, "strano" è reazione. **Nessun aggancio detto**: è intimo e presto | vicenda calcolata: 3 frammenti in 51 giorni sull'attesa di un padre |
| 20 gen | E56 Hohenheim | `nomina: hohenheim` (finzione, `in: fma`); `reazione`: "solo adesso capisco" (giudizio +; "da ragazzo lo odiavo": giudizio −, vissuto anni fa) | 4 prove; il tema `padre` è **candidato** (parola mai tua) |
| 1 mar | E50 "litigato con mio padre" | `nomina: papa`; `parole: [padre]`, di passaggio, il suo; **nessuna domanda** | 5 prove |
| 14 mar | E58 "dammi canzoni sul rapporto padre figlio" | `intento: chiedi`; "padre" torna, ora come argomento | il tema può nascere: ha il tuo nome |
| 10 apr | E60 "cosa mi colpisce ultimamente? sii sincero" | restituzione | — |

**Risposta a E60:** "Il padre ◌. Telemaco (16 nov), Murph che aspetta (13 dic), il sogno al mare (6 gen), Hohenheim
(20 gen), il litigio (1 mar), le canzoni (14 mar) ✦. La parola c'è, di passaggio; come filo non l'hai mai nominato."
Il tema `temi/padre.md` nasce con `nato-da` uguale ai sei frammenti. Il primo giro (tag messi a caldo) qui non vedeva niente.

### 6.5 Il link nudo: E27 `https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3`

- **Frammento:** il link così com'è, con `?si=`: il detto non si normalizza.
- **Lettura:** il link pulito, titolo e artista dall'oEmbed (mondo); `nomina: <brano>`; **niente reazione, niente temi**.
  L'artista diventa un nodo solo se c'è già, o al primo frammento che lo nomina con parole tue.
- **Risposta:** "Salvato *[titolo]*, [artista]. Che cosa ti ha preso?" È l'unico caso in cui l'ingresso fa una domanda
  senza ambiguità: il frammento è **muto**, senza nessuna parola tua. La domanda non si ripete. Se non rispondi, il
  frammento resta muto e la vitalità lo fa scendere.
- **Dopo:** se tre giorni più tardi scrivi "quella canzone di ieri sera…", la lettura la risolve sugli ultimi 3 giorni.

### 6.6 Lo stato d'animo vago: E67 "oggi mi sento come sisifo" (e E71, E49)

- **E67:** `parla-di: sisifo` con `come: metafora`, **non** `nomina` del mito né del saggio di Camus. Nessun `sente`
  dichiarato (la metafora non dice quale emozione). Il consolidamento vede la vicinanza con E66 di 25 giorni prima
  (Sisifo felice) e la mette nella linea delle posizioni, **senza** `contraddice`: un umore non è una posizione.
- **Risposta:** "Salvato." Al massimo, e solo se E66 è recente: "Il masso o la discesa?"
- **E71** ("apatia totale. niente mi tocca. anche la musica è grigia", 2:40): `sente: apatia` (sua), ora 02:40. Risposta:
  "Ci sono." Nessuna proposta, nessuna domanda. Entra nella serie dell'inverno: "dimmi come stavo quest'inverno" troverà
  E29, E49, E71, E72 con le tue parole.
- **E49** ("boh niente volevo solo scrivere qualcosa"): frammento sì, lettura con `intento: [niente]` e nessun legame.
  Risposta: "Ci sono." La traccia del giorno vuoto basta.

---

## 7. Sei domande difficili

### 7.1 n.73 "come è cambiato il mio modo di vedere il dolore?" (R10)

**Dati:** frammenti con `parla-di: dolore` o `sente: dolore`, divisi in importati e vivi; la linea delle posizioni.
**Oggi:** l'unica frase datata è del 4 ottobre ✧ ("la dimensione principale della realtà è il dolore"), ed è importata.
**Risposta:** "Non lo so ancora: da allora non hai scritto niente sul dolore. Ottobre ✧: 'la dimensione principale…'.
I cambiamenti nell'Atlante sono miei, non tuoi. Mi dai una frase di oggi?"
**A marzo 2027:** "Ottobre ✧: il dolore è la dimensione principale. 8 marzo ✦: 'forse è la noia, il dolore almeno ti
muove'. In mezzo ci sono 9 frammenti, quasi tutti di notte. È la prima volta che lo metti in dubbio."
**Non deve:** usare il git log, narrare una curva che i dati non hanno, riassumere "eri in una fase…".

### 7.2 n.52 "cosa collega berserk e marco aurelio nella mia testa?" (R12)

**Dati:** cammini di 1–3 passi tra i due nodi, **filtrati per voce** (solo ✦ ✧ ●), poi lo strato ◌ separato.
**Risposta:** "Nella tua testa, oggi, una cosa sola: stanno nella stessa lista del nucleo ✧. Il resto sono ponti miei ◌:
le battaglie interiori, Sisifo, la rabbia che diventa pace. Ti torna?" Se rispondi "sì, la rabbia che diventa pace", quel
legame diventa ●.
**Non deve:** presentare la frattura rabbia → pace come un fatto.

### 7.3 La catena n.37 → n.40 → n.41: "canzoni sulla solitudine" → "salvami la terza" → "no la seconda non c'entra niente"

- **n.37:** `voci` numerate: "Salvate da te: nessuna ✦ (Radiohead e Deftones sono atmosfera ✧). Fuori archivio ○: 1… 5",
  scelti sul tuo gusto, verificati. La restituzione è scritta **con la numerazione**.
- **n.40:** `in-risposta-a` quella restituzione; atto `accoglie: {di: r-…, n: 3}`. Nasce `opere/<brano-3>.md` con
  `nato-da: r-…`, e un legame `parla-di: solitudine` voce `proposta` reso ● dall'atto. La vista dice: "portata da me,
  accolta da te, il 14 marzo, cercando canzoni sulla solitudine".
- **n.41:** atto `rifiuta: {di: r-…, n: 2}`; lo scarto va in `.indice/scarti.json` con il contesto "solitudine".
  Non si cancella niente, e quel brano non tornerà più per la solitudine.
- **Non deve:** salvare tutte e cinque le canzoni, o chiedere conferme.

### 7.4 n.82 "idee per un tatuaggio da tutto quello che ho salvato su sisifo" (R11)

**Dati:** il vicinato di `sisifo` a 1–2 passi (mito, il saggio di Camus, Tiziano, von Stuck, Berserk), E66 ed E67, la
raccolta `tatuaggi` (E09, E65), le restituzioni importate dall'Atlante (la discesa di Sisifo ◌), lo stile del nucleo
(patchwork, incisione).
**Risposta:** prima l'inventario con i segni: "Tuoi ✦: Sisifo felice (5 nov), 'mi sento come Sisifo' (30 nov). Dal seme ✧:
Camus, il masso. Miei ◌: la discesa come 'ora della coscienza'". Poi tre strade ◌, ognuna di una riga e con il concetto
prima del soggetto. Poi una domanda sola: "Quale ti prende a pancia?"
**Perché funziona:** i tatuaggi sono una raccolta *dentro* il sistema, e pescano dalla stessa base (decisione 9).

### 7.5 n.104 "cosa non sto guardando?" (R14)

**Dati:** `.indice/conti.json` per voce (✦ ✧ ●), per tema e per emozione, confrontati con lo sguardo: nel nucleo l'oltre è
amore e verità.
**Risposta** (oggi, sul punto zero dell'Atlante, e dichiarandolo: i numeri contano anche le note di Claude): "Tre assenze. La gioia: 4 legami contro 76 per il dolore. Le persone della tua
vita: zero, fino a Marco. Te stesso: nessun 'perché mi colpisce', mai. E una domanda: che cosa c'è nell'amore che non salvi?"
**Non deve:** contare le 91 fonti di Claude; trasformare l'assenza in una diagnosi.

### 7.6 n.43 "top quote di dostoevskij" → n.47 "è vera? chi l'ha detta davvero?"

**Dati:** nodi `citazioni/` con `autore: fedor-dostoevskij`, ordinati per reazione e ritorni; poi il mondo, con Wikiquote
che separa le citazioni con fonte da quelle attribuite ([stato dell'arte §5](/progetto/v2/stato-arte.md)).
**Risposta:** "Una top tua non c'è: hai 2 citazioni, entrambe mie ◌. Dal mondo ○, scelte vicino al tuo filone (il dolore
attraversato): 1… 5, con opera e capitolo o ⚠." Ognuna ha una riga che la aggancia: "accanto al tuo Camus", "risponde a Rust".
**n.47** su "se Dio non esiste tutto è permesso": "Così non è testuale ⚠: è una sintesi del pensiero di Ivan; il passo
vero è [libro, capitolo]." Si aggiornano `esito` e `riferimento` del nodo, e questo **non** è una validazione.

---

## 8. Dove contraddico le decisioni, e perché

1. **"Tutto il resto è ricalcolabile" (decisione 1).** Vale per letture e indice, non per gli slug dei nodi né per le
   restituzioni: la prima regola li vuole stabili, la seconda li vuole immutabili come eventi (§2.1).
2. **"Distingui lo scritto dal calcolato" (decisione 4).** C'è uno strato in mezzo, *letto*: è dell'AI, sta nei file e si
   rifà a pagamento. Metterlo tutto nell'indice costerebbe una rilettura con l'AI a ogni domanda e cambierebbe i nomi a ogni
   giro.
3. **"Le note importate fuori dalla linea del tempo" (decisione 5).** Entrano come **punto zero**: hanno una data e
   rispondono a "cosa pensavo a ottobre", ma non fanno serie. Tenerle del tutto fuori renderebbe muta R10.
4. **Le vicende** (cervello) non si scrivono: si calcolano. I **periodi** non esistono finché non ne nomini uno tu; a quel
   punto sono un tema con le date nella lettura. Il working self non è un file (decisione 7): è una vista.
5. **"Dall'Atlante solo il vivo" (decisione 9).** R11 (Sisifo) ha bisogno anche delle idee di tatuaggio di Claude. Per
   questo le idee e i 31 candidati del progetto tatuaggi di [eredità](/progetto/v2/eredita.md) (R8) entrano come
   restituzioni importate ◌ con `serve-a: tatuaggi`, non come "candidati dormienti": fuori dai conti, mai rilanciate, trovabili.
   Delle 46 entità vive diventano nodi solo le 13 che hai nominato tu; le altre 33 restano testo dentro le convergenze, e
   le citazioni scelte da Claude restano nelle restituzioni finché non le accogli. Le 107 entità morte restano nell'Atlante.
6. **Lo sguardo scritto dall'AI (eredità, R2).** I passi misti M1–M10 restano nel frammento importato del nucleo, con
   `voce: seme`: nessuno sguardo nuovo composto dall'AI.
7. **La risposta immediata** ([telefono](/progetto/v2/telefono.md)). Con il Comando rapido la tappa 1 non ha una chat in
   cui rispondere a ogni memo. La scena 1 dell'[essenza](/progetto/v2/essenza.md) (Galimberti che trova Rust subito) è
   meraviglia, non un dettaglio: per questo il connettore MCP, che riporta la risposta in chat, è la priorità della tappa 2.

---

## 9. Tensioni aperte e scelte che spettano a te

1. **Quanto parla per primo lo specchio?** *Raccomando:* una lettera la domenica, solo se hai scritto, più il ritratto ogni
   tre mesi. Niente se taci.
2. **Il "sogno della settimana"** (un legame ardito e dichiarato come gioco): ti diverte o ti disturba? *Raccomando:* sì,
   ma al massimo uno al mese, a turno con convergenza e confronto.
3. **Il canale sul telefono.** *Raccomando:* il Comando rapido "Memo" per catturare (1 secondo, "Salvato"; la lettura arriva in
   pochi minuti) e la chat del Progetto per chiedere. Una sola conversazione per tutto si può fare solo con un
   connettore MCP, ed è il secondo traguardo.
4. **Un nuovo repository privato.** Le persone della tua vita non possono stare nel repository pubblico dell'Atlante.
   *Raccomando:* un repo privato per il memo; l'Atlante resta pubblico e intatto, come archivio d'origine.
5. **Una sola domanda sul link muto** (E27 "che cosa ti ha preso?"). *Raccomando:* sì, una e mai ripetuta. Se la trovi
   una seccatura, si toglie, e il link resta muto finché non ci torni.

**Il primo traguardo** non è la pipeline: è una **restituzione vera**. Un ritratto fatto sul nucleo, sulle 31 frasi tue
dell'Atlante (U1–U31 di [eredità](/progetto/v2/eredita.md)) e su 10 messaggi nuovi, con questo modello sotto, collaudato sul [banco di prova](/progetto/v2/banco-di-prova.md).
