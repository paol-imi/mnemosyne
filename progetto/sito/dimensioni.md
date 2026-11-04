---
tipo: progetto-sito
origine: claude
validata: false
data: 2026-11-04
---

# Le dimensioni: la proposta per lo schema 4

> Proposta normativa per navigare, filtrare e gestire i concetti. Risponde alla richiesta dell'utente («la fondamentale
> era proprio la possibilità di navigare, filtrare e gestire i concetti […] se magari "canzone" e "sentimento" sono
> dimensioni diverse») e riconcilia due consegne:
> - [`dimensioni-dati.md`](dimensioni-dati.md), dal basso, sui dati veri: 9 assi;
> - [`dimensioni-letteratura.md`](dimensioni-letteratura.md), dalla letteratura: 6 assi, una lente, un campo di ricerca.
>
> È una **proposta per lo schema 4**, da applicare dopo la porta del blocco 6. Nessun file normativo, script o prompt di
> `main` è toccato qui: le righe per `CLAUDE.md`, i prompt e lo schema sono scritte come diff da approvare. Il sito che
> la usa è in [`progetto.md`](progetto.md) §3.12 (Esplora); il prototipo, a dati solo sintetici, in
> [`prototipo/index.html`](prototipo/index.html), `#/esplora`.
>
> Qui non c'è nessuna frase dei frammenti: la sola frase dell'utente è la richiesta, citata in testa; gli esempi sono sintetici, i conti sui dati veri vengono da
> `dimensioni-dati.md`.

---

## 0. In breve

1. **Sei assi, una lente, un campo di ricerca.** Gli assi: **Cose**, **Persone**, **Temi**, **Campo**, **Gesto**,
   **Tempo**. La lente: **la voce** (✦ di default, ◌ a richiesta). Il campo: **la parola**, alla lettera.
2. **«Canzone» e «sentimento» stanno su assi diversi.** «Canzone» è il **tipo** di un'opera (asse Cose): divide le cose
   che nomino. «Sentimento» è la **specie** di un tema (asse Temi): divide ciò di cui parlo. Si combinano in E: «una
   canzone per la malinconia» è Cose: canzone **e** Temi: malinconia.
3. **Tre campi nuovi, solo sui nodi:** `tipo` sulle opere, `specie` sui temi, `campo` su persone (non `vita`), opere e
   correnti (i temi di specie `corrente`). Mai sui frammenti né sulle letture. Il valore di una frase si **calcola** a un passo di legame.
4. **Li scrive solo "consolida",** una volta per nodo, da vocabolari chiusi (11 forme, 6 specie, 10 campi), e poi non
   li tocca più, salvo una correzione dell'utente. Il `campo` è sempre ◌: una scelta dell'AI, anche sui nodi del mondo.
5. **Il Gesto non chiede campi nuovi:** si calcola da `intento`, `vissuto`, `altrui`, `fruizione`, `come: stato`,
   `serve-a` e dalle Posizioni. «Un pensiero» è una posizione (Gesto: penso), non un tema.
6. **Le 12 domande dell'utente** (`dimensioni-dati.md` §4) si risolvono tutte con al più tre scelte (§6). Oggi ne
   passano 1 per intero e 7 in parte.
7. **Costo**: la migrazione allo schema 4 sono 58 valori su 49 nodi, e nessun altro file; a regime, 0–5 nodi a settimana per "consolida".

---

## 1. Gli assi definitivi

### 1.1 La riconciliazione dei nomi

Un nome solo per asse, una parola italiana che l'utente capisce senza spiegazione.

| asse definitivo | letteratura (6) | dati (9) | che cosa ci entra |
|---|---|---|---|
| **Cose** | Cose | Cosa (genere e tipo) · Esito | le opere per tipo, le citazioni per esito |
| **Persone** | Persone | — (era nel genere) | le persone, anche come autori |
| **Temi** | Temi (specie) | Tema (classe) | i temi, raggruppati per specie |
| **Campo** | Campo | Campo | il sapere di persone, opere e correnti |
| **Gesto** | Gesto | Da fare · Scopo | che cosa faccio con le parole |
| **Tempo** | Tempo | Quando | il mese |
| lente: **la voce** | la voce come lente | Chi dice | ✦ ● di default; ◌ a richiesta |
| campo: **la parola** | la parola come campo | Parola | la ricerca alla lettera |

Tre nomi di campo, riconciliati: `tipo` (dati) e `forma` (letteratura) diventano **`tipo`**, perché `forma` ha già
due significati nel modello (`forma: riportata` del frammento, `forma` della restituzione); `classe` e `specie`
diventano **`specie`**; `campo` resta. L'asse «Da fare» dei dati entra nel Gesto («voglio fare»), lo «Scopo» pure («per i tatuaggi»),
l'«Esito» nelle Cose (sotto «citazione»).

### 1.2 Cose

- **Domanda:** che cosa nomino?
- **Valori:** i **tipi** (chiusi) e, dentro ciascuna, le **opere** (aperte, i nodi). Più **citazione**, che si apre in
  quattro esiti più ⚠.
- **Vocabolario chiuso del tipo**, 11 voci, in quest'ordine fisso (l'ordine non cambia, perché le scelte non saltino):

  | `tipo` | che cosa ci entra |
  |---|---|
  | `canzone` | una canzone, un brano, una traccia |
  | `album` | un disco intero |
  | `libro` | romanzo, saggio, raccolta, testo sacro |
  | `poesia` | una poesia sola |
  | `film` | un film, anche d'animazione |
  | `serie` | una serie, anche anime; la stagione sta nel `momento` del legame |
  | `fumetto` | fumetto, manga, graphic novel |
  | `spettacolo` | teatro, conferenza dal vivo, concerto come evento |
  | `immagine` | quadro, fotografia, incisione, scultura |
  | `gioco` | videogioco, gioco da tavolo |
  | `video` | un video, una conferenza registrata, un podcast |

  `canzone` sostituisce `brano` anche in `voci[].cosa` delle restituzioni: «canzone» è la parola dell'utente, e oggi
  nessuna restituzione usa `brano` (0 su 177 voci), quindi nessun file si migra. `libro` e `film` coincidono già.
- **Esiti della citazione:** `verificata · simile · errata · non trovata · ⚠` (l'assenza di `esito`).
- **Chi lo riempie, con quale segno:** il tipo lo scrive "consolida", e in pagina **non porta segno**, come l'`anno`,
  perché ha sempre una fonte: le parole dell'utente («la canzone…», «lo spettacolo di…») o la verifica rapida sul nome
  `mondo` (un catalogo: una canzone è una canzone). Senza l'una o l'altra il tipo non si scrive e il nodo resta in
  «Da classificare». Il campo e la specie invece sono scelte di classificazione senza fonte: per questo sono ◌. L'esito c'è già, ○
  quando è scritto, ⚠ quando manca.
- **Si legge da:** `opere.tipo` (nuovo); `citazioni.esito` (esiste).
- **Una frase ha il tipo T** se nomina un'opera di tipo T. **Una frase ha l'opera O** se la nomina, oppure nomina una
  persona `finzione` con `in: O`, oppure una citazione che **io** attribuisco (`attribuita-a`, scritta da "smista" solo
  dalle mie parole) a una di quelle persone: è **la catena dell'`in`**, l'unica eccezione al passo singolo (§2.5), e dà solo l'opera e il suo
  tipo, mai il campo.
- **Esempi sintetici:**
  - «nick drake stamattina, pink moon in loop» → Cose: canzone › *Pink Moon*.
  - «la frase del gufo, credo sia di twin peaks» → Cose: citazione › ⚠, e Cose: serie › *Twin Peaks* (la nomino).
  - «twin peaks rivisto, la signora del ceppo» → Cose: serie › *Twin Peaks*, anche per la persona `finzione` con
    `in: twin-peaks` (la catena dell'`in` parte solo da un personaggio che nomino; l'AI non attribuisce a un personaggio
    una frase che io non gli attribuisco).

### 1.3 Persone

- **Domanda:** chi?
- **Valori:** aperti, le persone `mondo` e `finzione`. Le persone `vita` **non sono nella lista**: si raggiungono solo
  scrivendone il nome nel campo della parola.
- **Chi lo riempie:** esiste. `nomina` ✦ di "smista"; `autore`, `attribuita-a` dei nodi.
- **Si legge da:** `nomina`; `opere.autore`; `citazioni.autore` e `attribuita-a`; `persone.in`.
- **Una frase ha la persona P** se la nomina, o nomina un'opera di cui P è `autore`, o una citazione `attribuita-a` P o
  con `autore` P. È il solo secondo passo ammesso: l'autore.
- **Esempi sintetici:**
  - «rileggo spinoza, l'etica, il libro quarto» → Persone: Baruch Spinoza (direttamente e come autore dell'*Etica*).
  - «hannah arendt: pensare è fermarsi» → Persone: Hannah Arendt (per `attribuita-a`; la frase non la nomina fuori
    dalla citazione).

### 1.4 Temi

- **Domanda:** di che cosa parlo?
- **Valori:** aperti, i temi con le parole dell'utente (regola 10), raggruppati per **specie** (chiusa). Si sceglie un
  tema o una specie intera («tutti i sentimenti»).
- **Vocabolario chiuso della specie**, 6 voci:

  | `specie` | in pagina | che cosa ci entra | dai dati veri (35 temi) |
  |---|---|---|---|
  | `stato` | sentimenti ◌ | uno stato d'animo nominato: rabbia, malinconia, quiete | 10 |
  | `idea` | idee ◌ | un concetto: attenzione, libertà, tempo | ~9 |
  | `domanda` | domande ◌ | una grande domanda, con il punto interrogativo | 8 |
  | `corrente` | correnti ◌ | una corrente di pensiero o di stile nominata: stoicismo, romanticismo | 3 |
  | `simbolo` | simboli ◌ | una cosa, un luogo o una figura usati come immagine: faro, mare, fenice | ~3 |
  | `stile` | stili ◌ | un'estetica grafica: linea, blackwork | 2 |

  Il file porta il valore della prima colonna; la pagina mostra la seconda, sempre la stessa. «stato» resta il valore
  del modello (come `parla-di come: stato`); «sentimenti» è la parola che l'utente usa.
- **Chi lo riempie:** il tema nasce come oggi (✦ da "smista" se lo nomino, ◌ da "consolida" se dedotto). La specie la
  scrive "consolida", ed è ◌ **con il segno** in pagina, come il campo: dire che «rabbia» è un sentimento è una lettura,
  anche se la parola è dell'utente. Il nome del tema resta ✦; la sua scaffalatura è ◌.
- **Si legge da:** `parla-di`; `temi.specie` (nuovo).
- **Una frase ha il tema T** se ha un `parla-di` verso T (✦ o ●; ◌ solo con la lente aperta).
- **Nessuna emozione dedotta.** Un sentimento entra solo come tema che l'utente ha nominato. Il tono di un frammento non
  si deduce, e la specie non si dà mai a un frammento.
- **Esempi sintetici:**
  - «oggi una rabbia che non so dove mettere» → Temi: sentimenti › rabbia.
  - «a che cosa serve ricordare?» → Temi: domande › a che cosa serve ricordare?

### 1.5 Campo

- **Domanda:** da quale sapere?
- **Valori:** chiusi, 10 voci, ordine fisso:
  `filosofia · psicologia · mito-e-religione · esoterismo · scienza · storia · letteratura · arte · musica · cinema`.
  In pagina con gli spazi («mito e religione»). `cinema` comprende le serie e l'animazione; `arte` le arti visive.
- **Chi lo riempie, con quale segno:** "consolida", **sempre ◌**, anche su Spinoza: è una scelta di classificazione
  dell'AI su un vocabolario chiuso, non una parola dell'utente né un fatto con un luogo. In pagina l'intestazione
  dell'asse porta il ◌, in tondo smorzato, e l'asse sta **dopo** i Temi ✦: non pesa più di loro.
- **Dove sta:** su persone `mondo` e `finzione`, opere, temi di specie `corrente` (al più 2 valori). **Mai** su persone
  `vita`, mai su temi di altre specie, mai su citazioni (la ereditano solo dall'`autore`, che c'è solo se verificato: un'attribuzione ⚠ può essere `errata`, e non dà campo), mai su un frammento.
- **Si legge da:** `campo` (nuovo).
- **Una frase ha il campo C** se nomina un nodo con C, o un'opera il cui `autore` ha C, o una citazione il cui `autore`
  (verificato) ha C, o parla di una corrente con C. «chi diceva che pensare è fermarsi? arendt credo» è Persone: Hannah
  Arendt, non Campo: filosofia, finché "consolida" non verifica la citazione. Un passo, più l'autore; mai due passi.
- **Un frammento delicato non ripreso** non dà valori a nessun asse, e quindi nemmeno al campo.
- **Esempi sintetici:**
  - «rileggo spinoza, l'etica, il libro quarto» → Campo: filosofia (da Spinoza e dall'*Etica*).
  - «il caduceo di ermete trismegisto, a linea sottile» → Campo: esoterismo (dalla figura Ermete Trismegisto); il
    tema `linea` è uno `stile` e non ha campo.

### 1.6 Gesto

- **Domanda:** che cosa faccio con le parole?
- **Valori:** chiusi, calcolati; una frase può averne più d'uno.

  | gesto | si calcola da | chi lo scrive già |
  |---|---|---|
  | **penso** | la frase è un capo di un `contraddice` di voce `sua` («di voce `sua` solo se il nuovo nega con parole mie un enunciato del vecchio», `prompt/consolida.md` A4, anche come `dubbio`) o di uno accolto ●; non rifiutato. I `contraddice` proposti (`voce: proposta`) contano solo con la lente aperta, e il gesto porta il ◌ | "consolida" |
  | **sento** | un `parla-di` con `come: stato` | "smista" (regola rafforzata, §4) |
  | **chiedo** | `intento` contiene `chiedi` | "smista" |
  | **ricordo** | la lettura ha `vissuto` (regola precisata in §4.2: solo quando le mie parole danno il tempo) | "smista" |
  | **voglio fare** | un `nomina` con `fruizione: da-fare` o `in-corso`, senza una `fatta` più recente | "smista" |
  | **trascrivo** | `altrui: true` | "smista" |
  | **per *raccolta*** | un `serve-a` verso la raccolta (una voce per raccolta: «per i tatuaggi») | "smista" |

- **Nessun campo nuovo.** `contesto.mjs` lo calcola; il sito lo legge.
- **«Penso» è prudente:** vale solo per le frasi che stanno ai capi di un `contraddice` ✦ (o ● se accolto), non per
  ogni frase affermativa né per una tensione proposta dall'AI, che conta solo con la lente aperta e porta il ◌. Un
  `contraddice` rifiutato toglie il gesto. Un monologo trascritto (`altrui`) non è mai «penso»: le tesi d'altri non diventano dell'utente.
- **Esempi sintetici:**
  - «aspettare non è perdere tempo, è il tempo che lavora» e, 15 giorni dopo, «mi sono rotto di aspettare» → tutte e
    due Gesto: penso (i capi di un `contraddice`).
  - «paterson di jarmusch, da vedere» → Gesto: voglio fare, e Cose: film › *Paterson*.

### 1.7 Tempo

- **Domanda:** quando?
- **Valori:** i mesi del `registrato`, dal più recente; più **archivio d'origine** per gli importati, con la data-tetto.
- **Chi lo riempie:** lo script. **Si legge da:** `registrato`. Il `vissuto` non è un valore del Tempo: è il Gesto
  «ricordo».
- **Esempi sintetici:** Tempo: ottobre 2026 → le frasi registrate in ottobre; Tempo: archivio d'origine → gli importati,
  «entro il 12 settembre».

### 1.8 La lente: la voce

Non è un asse: decide quali legami contano.
- **Di default** contano i legami ✦ e ● (accolti).
- **«anche le mie proposte ◌»**, una riga in fondo alla vista, aggiunge i legami ◌ (i temi dedotti, i `parla-di` ◌).
  Le frasi che entrano solo per un ◌ si mostrano smorzate, con il segno.
- Le frasi sono sempre ✦ (o ✧ a parte, mai mescolato). Il ○ non è un filtro: compare dentro la pagina del nodo, con il
  suo luogo.

### 1.9 La parola

Il campo di ricerca in testa a Esplora, lessicale e alla lettera, anche di tre lettere, con gli accenti piegati
(`progetto.md` §3.8). Cerca nel corpo dei frammenti e nei nomi e negli alias dei nodi. Si combina in E con gli assi.
Il senso («che cosa pensavo della fede») resta a Specchio, che espande la domanda.

---

## 2. Come si combinano

1. **L'unità è la frase ✦**: un frammento parlante, oppure un importato (con la data-tetto). I nodi sono il secondo
   gruppo dei risultati: quelli che danno alle frasi trovate i valori scelti.
2. **Dentro un asse le scelte si sommano (O), tra assi diversi si incrociano (E).** Canzone o album; canzone e malinconia.
3. **Gli esiti raffinano le citazioni.** «citazioni» e «da verificare ⚠» stanno nello stesso asse, ma l'esito è una
   specie della citazione: sceglierlo sostituisce «citazioni», non si somma in O.
4. **Il punto di partenza.** Aprendo Esplora da un nodo («le frasi di attenzione») il nodo è un filtro in più, sempre
   in E e sempre visibile come prima chip. Serve per «attenzione e aspettare»: dentro l'asse Temi due temi sono in O.
5. **Un passo di legame, più l'autore.** Mai due passi: Zarathustra non è «filosofia» perché sta vicino a qualcosa di
   filosofico, ma perché il suo autore ha quel campo. **Una sola eccezione, per nome: la catena dell'`in`** (§1.2), che
   porta un personaggio, e una citazione che gli attribuisco, alla sua opera; dà l'opera e il tipo, non il campo.
6. **Il numero accanto a ogni valore** conta le frasi che resterebbero scegliendolo, calcolate sugli altri filtri attivi
   (non sul proprio asse: dentro l'asse si somma). **Conta solo i parlanti** (regola 3): gli importati sono fuori dai
   conti (regola 5).
7. **I valori senza frasi non si mostrano.** Un valore con sole frasi dell'archivio d'origine si mostra senza numero.
8. **Il totale** in una riga di servizio sempre visibile: «7 frasi · e 2 dall'archivio d'origine, fuori dai conti».
9. **Il vuoto si dice:** «Nessuna canzone tua.», mai un vicolo cieco senza parole. Togliere l'ultima chip riporta
   all'indice.
10. **I delicati.** Un frammento delicato non ripreso non porta valori e non entra mai nei risultati di un filtro, né
   nei numeri. Se la parola scritta lo trova, in fondo: «e 1 risultato delicato · mostralo» (lo stesso gesto della
   ricerca). Un tema che sta solo in frammenti delicati non compare nella lista.
11. **Le persone `vita`** non sono valori; non hanno campo; una frase che le nomina conserva gli altri valori. Le
    trova solo la parola.
12. **L'ordine degli assi** è quello della domanda dell'utente: Cose, Persone, Temi, Campo ◌, Gesto, Tempo. Dentro
    Persone e Temi per numero; Cose e Campo in ordine fisso; Tempo cronologico; Gesto in ordine fisso.
13. **L'indirizzo** tiene tutto: `#/esplora?da=attenzione&cose=f:canzone&temi=t:malinconia&campo=filosofia&q=mare&lente=proposte`
    (i prefissi distinguono il tipo `f:`, l'opera `o:`, la specie `s:`, il tema `t:`, come in `progetto.md` §3.12).

---

## 3. Il diff dello schema 4

### 3.1 Campo per campo

| campo | dove | tipo | obbligatorio | chi lo scrive | quando |
|---|---|---|---|---|---|
| `schema` | nodi: `const: 4`; letture e restituzioni: `enum: [3, 4]` | | sì | tutti | ogni file nuovo nasce 4; la migrazione porta a 4 **solo i nodi**. Le restituzioni non si modificano mai e le letture cambiano solo per versioni: restano a 3, e lo schema le accetta |
| **`tipo`** | nodo `opere` | enum, uno | no | solo "consolida" (`aggiorna-nodo`) | la prima domenica dopo la nascita del nodo |
| **`specie`** | nodo `temi` | enum, uno | no (lo diventa di fatto: `mappa.md` elenca chi manca) | solo "consolida" | idem |
| **`campo`** | nodo `persone` con `cerchia` ≠ `vita`; `opere`; `temi` con `specie: corrente` | lista di enum, 1–2, senza doppioni | no | solo "consolida" | idem |
| `voci[].cosa` | restituzione | enum: `brano` → **`canzone`** | — | come oggi | solo per i file nuovi; nessuna restituzione esistente usa `brano` (0 su 177 voci), quindi nessuna diventa invalida |

Nessun campo nuovo su frammenti e letture. `parla-di` con `come: stato` esiste già: cambia solo la regola di "smista"
(§4). Il frammento non ha `schema` e non cambia.

### 3.2 Il JSON Schema dei campi nuovi

Da aggiungere a `schema/frontmatter.json`, in `$defs`:

```json
"tipo": {"enum": ["canzone", "album", "libro", "poesia", "film", "serie", "fumetto",
                   "spettacolo", "immagine", "gioco", "video"]},
"specie": {"enum": ["stato", "idea", "domanda", "corrente", "simbolo", "stile"]},
"campo": {"type": "array", "minItems": 1, "maxItems": 2, "uniqueItems": true,
          "items": {"enum": ["filosofia", "psicologia", "mito-e-religione", "esoterismo", "scienza",
                             "storia", "letteratura", "arte", "musica", "cinema"]}}
```

Nel nodo, `properties`:

```json
"schema": {"const": 4},
"tipo": {"$ref": "#/$defs/tipo"},
"specie": {"$ref": "#/$defs/specie"},
"campo": {"$ref": "#/$defs/campo"}
```

E nei vincoli per genere (`allOf`), le liste dei nomi ammessi si allungano così:

```json
{"if": {"properties": {"_genere": {"const": "persone"}}, "not": {"required": ["fuso-in"]}},
 "then": {"required": ["cerchia"], "propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da",
          "link", "cerchia", "in", "campo"]}}},
{"if": {"required": ["cerchia"], "properties": {"cerchia": {"const": "vita"}}},
 "then": {"not": {"anyOf": [{"required": ["link"]}, {"required": ["in"]}, {"required": ["campo"]}]}}},
{"if": {"properties": {"_genere": {"const": "opere"}}},
 "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in",
          "autore", "in", "anno", "tipo", "campo"]}}},
{"if": {"properties": {"_genere": {"const": "temi"}}},
 "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in",
          "specie", "campo"]}}},
{"if": {"properties": {"_genere": {"const": "temi"}}, "required": ["campo"]},
 "then": {"required": ["specie"], "properties": {"specie": {"const": "corrente"}}}}
```

Una lapide (`fuso-in`) non porta i campi nuovi: la regola che c'è già lo garantisce.

Nel legame, l'enum di `campo` della correzione si allunga: `{"enum": ["autore", "attribuita-a", "in", "nome", "tipo",
"specie", "campo"]}`. In `lettura` e `restituzione`, `"schema": {"enum": [3, 4]}`.

In `restituzione.voci.items.properties.cosa` la voce `brano` diventa `canzone`, e così **in ogni posto che la elenca**:
l'enum di `cosa` in `schema/piano.json` (oggi alla riga 265) e l'esempio e l'elenco di `cosa` in `prompt/progetto.md`
(oggi alle righe 79–80 e 89), altrimenti una risposta del Progetto su una canzone sarebbe rifiutata (§4.5); e il test
`test/applica.test.mjs` (oggi alla riga 202), che usa `cosa: 'brano'` e si aspetta zero errori. Il passaggio (un memo
del Progetto scritto prima del cambio, che i memo successivi della stessa chat devono ripetere come prefisso) è aperto:
`revisione.md`, A2. In
`schema/piano.json`, `ciclo` ammette anche `migra` (lo scrittore della migrazione, §5), e il vincolo che oggi tiene
`aggiorna-nodo` solo in "consolida" si allarga a `consolida | migra`; `aggiorna-nodo` accetta `tipo`, `specie`,
`campo`; `crea-nodo` **no**: li rifiuta, chiunque crei il nodo ("smista", Specchio o "consolida").

### 3.3 Che cosa controlla `verifica.mjs`

1. `campo` su una persona `vita`: rifiuto (lo fa già lo schema; il messaggio dice «una persona della vita non ha
   campo»).
2. `campo` su un tema che non sia `specie: corrente`: rifiuto.
3. Un valore fuori vocabolario: rifiuto (lo schema).
4. **Il congelamento.** Un `aggiorna-nodo` che cambia un `tipo`, una `specie` o un `campo` già scritti è rifiutato,
   salvo che risponda a un `ritorna-su … come: corregge` dell'utente con `campo: tipo | specie | campo`. Come lo sa
   `verifica.mjs`, che legge i file: confronta il nodo con HEAD e, se uno dei tre valori cambia, cerca nella stessa
   transazione (le letture nuove o in attesa) un `corregge` con lo stesso `nodo` e lo stesso `campo`, il cui `valore`
   è il valore nuovo; senza, rifiuta. I valori chiusi non si rigenerano (letteratura §3.4: le etichette dei modelli sono instabili tra esecuzioni).
5. **Come l'utente corregge o rifiuta un valore.** In `ritorna-su … corregge`, `campo` ammette anche `tipo`, `specie`,
   `campo` (oggi: autore, attribuita-a, in, nome). Il nodo si nomina in `nodo`, come oggi; la `a` del `ritorna-su`
   resta un frammento, come vuole lo schema: **il primo frammento di `nato-da` del nodo che non sia delicato né
   importato** (un `ritorna-su` verso un delicato lo farebbe «ripreso» senza volerlo; un importato è fuori dai conti).
   Se non ce n'è, la correzione si fa nominando il nodo in un memo, e `a` è quel memo stesso. Questi valori non stanno in
   nessuna prosa recente, quindi per una correzione di `tipo`, `specie` o `campo` la finestra dei 3 giorni non si
   applica: è un'eccezione nuova, da scrivere nei «Confini» di `CLAUDE.md` (§4.1). Il gesto del sito (`progetto.md` §5)
   mette nel memo il nome del nodo («twin peaks è un film, non una serie → twin-peaks»); "smista" risolve lo slug e
   scrive `a` = il frammento di `nato-da`. Per `campo`, `valore` è una stringa con le voci separate da «, » («filosofia,
   psicologia»), o vuota per toglierlo; `vecchio` idem. Il `campo` della correzione e il campo `campo` del nodo
   coincidono nel nome: `campo: campo` è valido e voluto.

### 3.4 Che cosa calcola `contesto.mjs`

- In `mappa.md`, una sezione nuova **«Da classificare»**: i nodi senza `tipo` (opere), senza `specie` (temi), senza
  `campo` (persone `mondo` e `finzione`, opere, correnti). È la coda di "consolida", come le correzioni in attesa.
- Una funzione pura **`faccette(a)`**, esportata per il sito (`progetto.md` §7.1): per ogni frase ✦, i valori dei sei
  assi, ciascuno con la voce del legame che lo dà (per la lente). Il sito non riscrive la regola del passo.
- Una funzione pura **`gesti(a, id)`**: i gesti di una frase (§1.6).

---

## 4. Che cosa cambia nei prompt

Righe proposte, da approvare; i file restano come sono fino alla porta del blocco 6.

### 4.1 `CLAUDE.md`

- §I quattro tipi, **nodo**, dopo «raccolte `scopo`»: «; opere `tipo`; temi `specie`; persone (non `vita`), opere e
  correnti `campo` (1–2). Vocabolari chiusi in `schema/frontmatter.json`.»
- §Un file, un solo scrittore, nella riga dei nodi, dopo «ogni altro campo»: «(anche `tipo`, `specie`, `campo`, ◌,
  una volta sola: poi cambiano solo per una mia correzione)».
- §Privacy, persone `cerchia: vita`: «niente `link`, niente `campo`, niente temi proposti…».
- §Un file, un solo scrittore, riga dei nodi, in coda: «e le migrazioni (ciclo `migra`)».
- §I quattro tipi, **lettura**: «`schema: 3` o `4`»; **restituzione**, `cosa`: «canzone» al posto di «brano».
- §Confini: «una correzione di `tipo`, `specie` o `campo` non ha la finestra dei 3 giorni: `a` è il primo frammento di
  `nato-da` del nodo, non delicato e non importato».
- §I quattro tipi, **restituzione**: «`schema: 3` o `4`».
- §I quattro tipi, **lettura**: nessun campo nuovo. Il gesto «penso» e gli altri si calcolano.
- §Regole di provenienza 10, in coda: «Il `campo` e la `specie` non danno nomi: i temi restano le mie parole, e
  "filosofia" nel campo non è un tema.»

### 4.2 `prompt/smista.md`

Una riga sola, nel passo **legami**:

> - **stati vissuti**: quando le mie parole dicono uno stato in prima persona («mi sento…», «ho una rabbia…», «oggi
>   malinconia»), il `parla-di` verso quel tema porta `come: stato`. Se il tema non c'è, nasce ✦ con la mia parola.
>   Non scrivere `tipo`, `specie` né `campo`: li scrive "consolida".
> - **vissuto** (già nei campi della lettura, «se il momento è diverso»): solo quando le mie parole danno il tempo
>   («da piccolo», «nel 2009», «quell'estate»), mai dedotto. È la fonte del gesto «ricordo».

Nient'altro: "smista" non classifica.

### 4.3 `prompt/consolida.md`

Un passo nuovo nella Fase A, dopo A3:

> A3b. **Da classificare.** Per ogni nodo nella sezione «Da classificare» di `mappa.md`, `aggiorna-nodo` con:
> - `tipo` per un'opera: dalle mie parole («la canzone…»), o da una verifica rapida sul nome `mondo` (mai su
>   persone `vita`). Nel dubbio, niente: resta in coda.
> - `specie` per un tema: `stato` se l'ho usato per dire come mi sento; `domanda` se è una domanda; `corrente` se è una
>   scuola di pensiero o di stile; `simbolo` se è una cosa, un luogo o una figura usati come immagine; `stile` se è
>   un'estetica grafica; altrimenti `idea`.
> - `campo`, 1–2 valori, per persone `mondo` e `finzione`, opere e correnti; mai per persone `vita` né per temi di
>   altre specie. Su un nodo nato da un frammento delicato non ripreso, aspetta.
>
> Una volta sola per nodo: un valore scritto non si cambia, salvo una mia correzione (A5). Nessuna proposta all'utente,
> nessun segno nelle prose.

E in A5 (correzioni): «`campo` della correzione può essere anche `tipo`, `specie`, `campo`».

### 4.4 `prompt/formato-piano.md`

Nella tabella delle operazioni, `aggiorna-nodo` elenca `tipo`, `specie`, `campo` tra i campi ammessi; `crea-nodo` no.

### 4.5 `prompt/progetto.md`

Nell'esempio e nell'elenco di `cosa` del memo del Progetto, `brano` diventa `canzone`. Nient'altro.

---

## 5. La migrazione

Una migrazione `scripts/migra/004-dimensioni.mjs`, un commit «migrazione 004», una riga in `_schema.md`. Un piano unico
con `ciclo: migra` (§3.2; le migrazioni sono già scrittrici ammesse delle letture, `CLAUDE.md`, e qui lo diventano dei
nodi), fatto di `aggiorna-nodo`, applicato da `applica.mjs`, che porta **i nodi** a `schema: 4` e
scrive i valori. Letture e restituzioni non si toccano (le restituzioni sono immutabili, le letture cambiano solo per
versioni): lo schema 4 le accetta anche a 3.

| che cosa | quanti | da dove si ricava |
|---|---|---|
| `schema: 3 → 4` | 52 nodi (le 35 letture e le 60 restituzioni restano a 3) | meccanico |
| `tipo` sulle opere | 6 | dalle parole dell'utente o da una verifica rapida sul nome (il vecchio percorso `/fonti/opere/` non dice il tipo) |
| `specie` sui temi | 35 | 22 dal percorso del `link`: `/emozioni/` → `stato` (10), `/domande/` → `domanda` (8), `/stile/` → `stile` (2), `/fonti/pensiero/` → `corrente` (2); 12 `/concetti/` letti uno per uno (`idea`, `simbolo` o `corrente`); 1 senza link |
| `campo` sulle persone | 8 (7 `mondo`, 1 `finzione`) | il vecchio percorso del `link` (`/fonti/pensiero/`, `/fonti/psicologia/`, `/fonti/sacro-e-mito/`) e una verifica rapida |
| `campo` sulle opere | 6 | idem |
| `campo` sulle correnti | 3 | dal tema stesso |
| **totale dei valori** | **58** | |

Il campo ◌ sulle persone del mondo non è una parola accolta dall'utente: le 7 discipline dell'Atlante non hanno mai
avuto un ● (`dimensioni-dati.md` §5.6.4). Per questo è ◌ e congelato, non ●.

Restano fuori dalla migrazione, come oggi: i circa 100 `~Nome` delle `eredita` (non sono nodi; diventano nodi alla prima
menzione o domanda), e i frammenti, che non cambiano.

**Prova della migrazione:** `verifica.mjs` verde; `contesto.mjs` con la sezione «Da classificare» vuota, salvo i temi
nati da frammenti delicati; nessun `campo` su persone `vita` (0).

---

## 6. Le 12 domande dell'utente

Da `dimensioni-dati.md` §4. «Tocchi» = dalla barra, nel prototipo (la colonna sta in `progetto.md` §9).

| # | domanda | combinazione | nel prototipo |
|---|---|---|---|
| 1 | Tutto ciò che è filosofia | Campo: filosofia | le frasi che nominano filosofi, le loro opere e le correnti |
| 2 | Le cose su un autore (Spinoza) | Persone: Baruch Spinoza; oppure la parola «spinoza» | le frasi che lo nominano, l'*Etica* per autore, le citazioni attribuite |
| 3 | Quando mi sono sentito così (rabbia) | Temi: rabbia + Gesto: sento | le frasi in ordine di tempo; senza «sento», anche quelle in cui la rabbia è un'idea |
| 4 | Una canzone per la malinconia | Cose: canzone + Temi: malinconia | una frase; scelta «canzone», tra i temi restano solo quelli che hanno una canzone (malinconia, quiete) |
| 5 | La parola X | la parola | come la ricerca di oggi |
| 6 | I miei pensieri sul dolore | Temi: dolore + Gesto: penso | le posizioni sul dolore |
| 7 | I film o le serie che volevo vedere | Cose: film, serie + Gesto: voglio fare | O dentro Cose, E con il Gesto |
| 8 | Tutto quello che viene da un'opera (Twin Peaks) | Cose: serie › Twin Peaks | la frase che la nomina e quella sulla citazione del personaggio (per `in`) |
| 9 | Le mie grandi domande | Temi: domande (la specie intera) | tutte le frasi su un tema-domanda |
| 10 | Per i tatuaggi, le cose esoteriche o di mito | Gesto: per i tatuaggi + Campo: esoterismo, mito e religione | |
| 11 | Le citazioni da verificare (o quelle vere) | Cose: citazione › ⚠ (o › verificata) | |
| 12 | A ottobre, sul dolore, solo le mie | Tempo: ottobre + Temi: dolore (lente di default) | |

Fuori dalle 12, «le idee per il braccio»: la parola («braccio») + Gesto: per i tatuaggi. La parte del corpo non diventa
un asse.

---

## 7. I dubbi, chiusi

Ogni dubbio dei due documenti, con la scelta più semplice.

1. **Mito e religione: un valore solo, `mito-e-religione`.** L'utente nomina «mito» e «religioni» come due territori,
   ma nessuna delle 12 domande li separa, e la domanda 10 li vuole insieme («esoteriche o di mito»). L'esoterismo resta
   a parte, perché l'utente lo nomina da solo. Se un giorno servisse dividere, è una migrazione di una parola.
2. **Le band: nodi persona con `campo: musica`.** Nessun nodo `album` nasce senza una menzione. Una canzone nominata è
   un'opera `tipo: canzone` con `autore` verso la band. Così «Deftones» e «Radiohead» restano dove sono.
3. **Gli importati nei conteggi: fuori dai numeri, dentro i risultati.** I numeri accanto ai valori contano solo i
   parlanti (regole 3 e 5); le frasi importate compaiono in fondo ai risultati, nel loro gruppo con la data-tetto e la
   nota una volta in testa, e il totale le dice a parte («e 2 dall'archivio d'origine, fuori dai conti»). Un valore con
   sole frasi importate si mostra senza numero.
4. **Il delicato degli elenchi d'origine** (`dimensioni-dati.md` §5.6.1). Non si decide qui. La regola è comunque sicura:
   un frammento non marcato delicato porta i suoi valori; se la lettura diventa `delicato: true`, li perde. La faccetta
   «sentimenti» non mostra mai un tema che vive solo in frammenti delicati.
5. **«Penso»**: la definizione è una sola, quella del §1.6 (i capi di un `contraddice` di voce `sua` o accolto ●; i
   `contraddice` proposti solo con la lente, con il ◌), non ogni affermazione (letteratura, dubbio 3). È più povero, ma
   non attribuisce tesi.
6. **Le specie della letteratura** (sentimento · idea · immagine · pratica · luogo · relazione) e le classi dei dati
   (concetto · stato · domanda · corrente · figura · stile): vince la lista dei dati, provata sui 35 temi veri, con due
   ritocchi: `concetto` → `idea` (parola più semplice) e `figura` → `simbolo` (comprende anche luoghi e cose).
   `pratica`, `luogo`, `relazione` non hanno temi veri che le reggano.
7. **«Brano» o «canzone»**: «canzone», ovunque, anche in `voci[].cosa`.
8. **La granularità dell'opera** (serie, stagione, episodio): resta il `momento` del legame. Nessun nodo per stagione.
9. **Il campo sui temi**: solo sulle correnti. «Filosofia» resta un punto di vista sui nomi del mondo, non sulle parole
   dell'utente.
10. **La lente** al posto del selettore a tre posizioni: in Esplora e nel nodo diventa una riga in fondo, «anche le mie
    proposte ◌». Il selettore resta solo dove `progetto.md` lo tiene (frammento, tempo).
