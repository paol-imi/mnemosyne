# Il modello v3

> Progettazione v3, 2026-10-31; ritoccato il 2026-11-02 dopo la [seconda prova a freddo](../v2/prova-a-freddo-2.md)
> (§15, riga 79), dopo la [terza](../v2/prova-a-freddo-3.md) (§15, riga 80) e dopo la
> [quarta](../v2/prova-a-freddo-4.md) (§15, riga 81). Proposta di Claude, da validare. Non tocca note né script.
> È il modello **definitivo e autosufficiente**: chi lo legge non ha bisogno del [modello v2](../v2/modello.md).
> Integra le prove sul v2: [critica del tempo](../v2/critica-tempo.md) (crolli **C1–C15**),
> [critica della semplicità](../v2/critica-semplicita.md) (**CS §n**), gli
> [attriti dell'importazione](../v2/simulazione/attriti-importazione.md) (**A1–A31**) e le
> [regole d'importazione](./05-regole-importazione.md). È allineato al
> [banco di prova definitivo](./04-banco-di-prova.md), a [voce](./10-voce.md) e ai
> [prompt operativi](../v2/prompt-operativi.md) (§16). Integra anche le
> simulazioni delle [domande](../v2/simulazione/attriti-domande.md) (**Q1–Q33**) e
> dell'[ingresso](../v2/simulazione/attriti-ingresso.md) (**I1–I25**, gli A1–A25 di quel file, rinominati per non
> confonderli con gli attriti dell'importazione) e la [prova del tempo](../v2/simulazione/attriti-tempo.md) sul v3
> (**V1–V16**).
> Il collaudo è il [banco di prova definitivo](./04-banco-di-prova.md) (casi **B01–B25**, **D01–D25**,
> prove di restituzione **R01–R14**, prove di tempo **T01–T10**).
> I rimandi a file di `progetto/v2/` che il pacchetto non contiene (critiche, simulazioni e attriti, prompt operativi,
> coordinamento, modello e banco v2) sono **storia**: dicono da dove viene una regola, non servono per costruire.

**In una riga.** Tu scrivi e basta. Ogni messaggio diventa un **frammento** immutabile. L'AI lo **legge** e scrive un
*piano*; uno **script** trasforma il piano in file (letture, nodi, restituzioni) con nomi, numeri e formati identici ogni
volta. Una volta a settimana l'AI rilegge il nuovo con il vecchio e ti scrive una **lettera**. Nei file ci sono quattro
tipi, sei predicati, quattro voci. Tutto il resto si calcola, e sta in quattro file di `contesto/`.

**Come si legge.** Ogni regola operativa porta un segno: **[S]** la fa uno script, deterministico, sempre uguale;
**[AI]** è un giudizio dell'AI, che lo scrive come dato perché le sessioni dopo lo ritrovino. Il §12 li mette in fila.

---

## 1. Principi

Sono dodici. Ognuno ha la prova che lo fonda.

1. **Le tue parole sono sacre.** Si conservano byte per byte, separate da ogni lettura; l'AI non parla mai con la tua
   voce. *Prova:* "te le sia inventate tu di sana pianta", l'unico scatto d'irritazione documentato
   ([archivio reale §1](../v2/archivio-reale.md)); D02 "le mie frasi, solo le mie".
2. **Catturare costa zero.** Un tocco, "Salvato", nessuna domanda obbligatoria. *Prova:* 0 risposte su ~18 domande
   "a pancia" ([essenza §0](../v2/essenza.md)).
3. **La struttura è dell'AI: marcata, motivata, usabile subito.** Ogni legame dice da dove viene, perché e con quale voce.
   Nessun cancello di validazione. *Prova:* 0 decisioni su ~130 proposte, poi 23 giorni di silenzio.
4. **La validazione è l'uso.** Una proposta diventa tua quando la riprendi, la porti da te o dici sì; un no non torna più;
   ciò che resta intatto sbiadisce nella vista, mai nei dati. *Prova:* il caso Karamazov; D17–D18.
5. **Il significato nasce dopo.** All'ingresso solo entità certe (compresi i concetti che
   nomini tu); i temi **dedotti** nascono alla ricorrenza, rileggendo il vecchio
   con il nuovo. *Prova:* la sequenza "padre" (D24, [cervello §1](../v2/cervello.md)).
6. **La restituzione è il prodotto.** Prosa ancorata a tue frasi datate. Sogno, "ti ricordi?" e ritratto restano, con
   soglie e ritmi (§9). *Prova:* [essenza](../v2/essenza.md) §1 e scene 1–6, [restituzione](../v2/restituzione.md).
7. **Il tempo è sincero.** Doppio tempo (registrato e vissuto); le posizioni non si cancellano; l'importato non fa serie;
   nessuna curva che i dati non mostrano; un cambio di lettore non si spaccia per un cambio tuo (C13).
8. **L'archivio è una lente sul mondo.** Le risposte uniscono il tuo e il mondo, con il confine visibile; le citazioni
   sono verificate o dichiarate ⚠. *Prova:* 0 su 12 citazioni giuste alla lettera ([citazioni](./08-citazioni.md)).
9. **I nomi li dai tu.** I temi prendono le tue parole; il sé non si precompila; la voce dell'AI non diventa la tua (C14).
10. **Uno specchio che contraddice, con misura.** Poche cose forti; il silenzio è legittimo; mai un sollecito.
11. **Ciò che deve essere identico lo fa uno script; ciò che è giudizio lo fa l'AI e lo scrive.** Slug, nomi di file,
    numerazioni, conteggi, pulizia dei link, spostamenti: script. Intento, entità, reazioni, legami, prosa: AI, dentro un
    *piano* che lo script applica e verifica. *Prova:* [CS §3.2](../v2/critica-semplicita.md); il primo Atlante,
    dove l'AI ricopiava e normalizzava.
12. **Un file, un solo scrittore alla volta.** Un lucchetto per il repository, un proprietario per ogni file. *Prova:* C6, C9.

---

## 2. L'architettura in breve

### 2.1 Quattro strati

| strato | cartelle | chi scrive | si modifica? | se si perde |
|---|---|---|---|---|
| **Detto** | `ingresso/` → `frammenti/` | tu (Comando rapido, memo del Progetto, sessione Specchio) o l'importazione; [S] lo sposta senza toccarlo (il memo del Progetto lo separa, §7.3) | **mai** (verifica con hash) | perso per sempre |
| **Letto** | `letture/`, nodi in `persone/ opere/ citazioni/ temi/ raccolte/` | [AI] decide, [S] scrive | sì, per versioni; lo slug **mai** | si rifà dai frammenti, a costo di token |
| **Restituito** | `restituzioni/` | [AI] scrive la prosa, [S] numera e salva | **mai** | perso: ti ha detto qualcosa che non si ritrova |
| **Calcolato** | `contesto/` (4 file, versionato) | [S] `contesto.mjs`, senza AI | si rigenera | si rifà in un secondo |

Il formato di `frammenti/` è congelato per sempre (§11). Le restituzioni sono un diario di ciò che lo specchio ha detto.
Non esiste più `.indice/`: un solo script calcola in memoria e scrive `contesto/` (CS §1.2). Fuori dagli strati c'è un
sola cartella che si sovrascrive: `riserva/`, scritta solo da `applica.mjs` con l'operazione `riserva` del piano di "consolida", con il "mentre eri via" pronto (§7.2.1) e le proposte in
attesa della lettera (§7.4).

### 2.2 Il piano: come l'AI scrive senza scrivere file

L'AI non crea file a mano. In ogni ciclo riceve un **pacchetto** preparato da [S] (il frammento, `contesto/recenti.md`,
la tabella degli alias, i candidati per ogni nome, i frammenti vicini) e restituisce un **piano** JSON, nel formato di
`prompt/formato-piano.md`. [S] `applica.mjs` lo convalida, calcola slug e numerazioni, pulisce i link, scrive i file e
rifiuta il piano se qualcosa non torna (la sessione lo corregge, al massimo due volte, poi lascia il frammento in coda e
lo segnala).

**Ogni ciclo scrive un piano** ("smista", "consolida", "ritratto", Specchio), sempre con lo stesso involucro
`{ciclo, letto-da, operazioni: [...]}`. Le operazioni sono di sette tipi: `crea-nodo`, `aggiorna-nodo` (solo "consolida"
e le migrazioni semantiche, che scrivono un piano `ciclo: consolida`; quelle meccaniche sono script e non hanno piano, §11:
qualunque campo di un nodo esistente tranne `schema`, `_genere`, che viene dalla cartella, e `fuso-in`, che
scrive solo `lapide`; lo slug mai), `alias`, `lettura`, `restituzione`, `riserva`, `lapide`. Nella `lettura` la `versione`
è **facoltativa**: se c'è, [S] controlla che sia 1 per "smista" e la precedente + 1 per "consolida" o una migrazione; se
manca, la scrive [S]. Il piano di "smista" per il memo di Galimberti:

```json
{
  "ciclo": "smista",
  "letto-da": "<modello>",
  "operazioni": [
    {"op": "crea-nodo", "genere": "persone", "nome": "Umberto Galimberti", "alias": ["galimberti"], "cerchia": "mondo"},
    {"op": "crea-nodo", "genere": "opere", "nome": "spettacolo sulle emozioni", "autore": "@Umberto Galimberti"},
    {"op": "crea-nodo", "genere": "citazioni", "nome": "Il nichilismo è l'ospite inquietante",
     "attribuita-a": ["@Umberto Galimberti"]},
    {"op": "lettura", "frammento": "20261103-2340-k7q2", "versione": 1, "intento": ["salva"],
     "reazione": [{"parole": "molto interessante", "verso": "+"}],
     "legami": [
       {"p": "nomina", "a": "@Umberto Galimberti", "voce": "sua", "perche": "«uno spezzone di galimberti a teatro»"},
       {"p": "parla-di", "a": "nichilismo", "voce": "sua", "perche": "parola tua"}],
     "parole": ["ragazzo", "cultura"]},
    {"op": "restituzione", "forma": "risposta", "per": "20261103-2340-k7q2", "testo": "…",
     "voci": [
       {"rif": "@Il nichilismo è l'ospite inquietante", "voce": "mondo", "cosa": "citazione"},
       {"rif": "@spettacolo sulle emozioni", "voce": "mondo", "cosa": "opera"}]}
  ]
}
```

`@Nome` rimanda a un nodo creato nello stesso piano: [S] lo sostituisce con lo slug calcolato. Così l'AI non inventa mai
uno slug, e due piani con lo stesso nome producono lo stesso file. La **verifica rapida** di una citazione nuova (§7.2) sta
**dentro** il suo `crea-nodo` (la traccia della ricerca nel corpo del nodo, mai `esito` né `riferimento`: §7.2 passo 4):
avviene prima di `applica`, ed è ancora la creazione.

**Chi è il lettore.** `letto-da` lo dichiara l'AI nel piano (il modello che sta girando); nell'importazione, che non ha
piano, lo passa chi la lancia (§14 R1). Le copie di codice e di dati che escono dal repository privato (il codice delle prove
a freddo) portano un valore neutro, non un nome di modello. `prompt` lo calcola [S]: le prime 7 cifre esadecimali
dell'**id blob di git** del concatenato di `CLAUDE.md`, `prompt/<ciclo>.md` e `prompt/formato-piano.md`, messi in fila byte
per byte in quest'ordine, cioè di `cat CLAUDE.md prompt/<ciclo>.md prompt/formato-piano.md | git hash-object --stdin` (lo
SHA-1 dell'intestazione `blob <lunghezza>\0` seguita dai tre file, non quello dei soli tre file), perché il lettore dipende da tutti e tre (cambiarne uno è un cambio di lettore, C13). `<ciclo>` è il `ciclo` del
piano: Specchio che fa il lavoro di "smista" scrive un piano `ciclo: smista`. Solo le **letture** portano `prompt`: una
restituzione dice il suo lettore con `letto-da` e `registrato` (§3.5). I prompt sono cinque, `smista`, `consolida`,
`lettera`, `ritratto` e `specchio`, ognuno con il suo file in `prompt/`; il `ciclo` di un piano è uno di `smista`,
`consolida`, `ritratto`, `specchio`, perché "lettera" non scrive niente (§7.4).

[S] controlla il piano con uno schema suo, piccolo (l'involucro, le chiavi di ogni operazione, gli stessi `legame` e `voce`
del §3.7, `@Nome` ammesso dove il §3.7 vuole uno slug), e poi i file prodotti con lo schema del §3.7. Le chiavi di ogni
operazione sono quelle della tabella "Le sette operazioni" di `prompt/formato-piano.md` ([prompt v3](./03-prompt-v3.md)
§2), che è la norma di `schema/piano.json`; i valori ammessi vengono dal §3.7.

### 2.3 Gli script (tutto il codice)

| script | che cosa fa | stima |
|---|---|---|
| `smista.mjs` | `prepara`: sposta il grezzo, separa i memo del Progetto, riduce le foto, costruisce il pacchetto; `vicini ID`: i vicini di un frammento già smistato, in sola lettura (§6.2) | ~180 righe |
| `applica.mjs` | piano → file, per tutti i cicli: slug, numeri, link puliti, `prompt` | ~150 |
| `slug.mjs` | `slug()`, `chiave()`, `scheletro()`, la ricerca dei candidati (§3.6) | ~60 |
| `contesto.mjs` | calcola tutto (conti, vicende, sbiadimento, accoglienze, alias) e scrive `contesto/`; le sezioni Stato, Nodi e Alias di `mappa.md` e `recenti.md` servono già a "smista" e al primo ritratto, quindi si scrivono per prime (R44) | ~300 |
| `verifica.mjs` | schema JSON, hash dei frammenti, immutabilità delle restituzioni, link, Q-nomi, ritornelli, budget | ~200 |
| `lucchetto.mjs` | `prendi`, `rinnova`, `lascia`, con il gettone e il fencing (§8.1) | ~70 |
| `importa.mjs` | l'Atlante, una volta sola (§14) | ~250 |
| `migra/NNN-*.mjs`, `migra/fondi.mjs`, `migra/tara.mjs` | le migrazioni meccaniche, la fusione dei temi, la taratura del lettore (§11) | quando servono |

Circa **1.100 righe**, contro le ~2.000–2.300 del v2 pieno. I prompt sono file in `prompt/`: `formato-piano.md` più uno per ciclo (`smista`, `consolida`, `lettera`, `ritratto`,
`specchio`), oltre a `CLAUDE.md` e all'istruzione del Progetto. Le loro bozze sono in [prompt v3](./03-prompt-v3.md).

---

## 3. Tipi e file

### 3.1 Identificatori e percorsi

| cosa | id | percorso |
|---|---|---|
| frammento | `AAAAMMGG-HHMM-xxxx` (ora locale del messaggio: l'ora e il fuso del telefono, gli stessi di `registrato`; `xxxx` = 4 caratteri `[a-z0-9]` casuali del Comando rapido) | `frammenti/AAAA/MM/<id>.md`, allegati accanto nel formato originale (`<id>.jpg`, `<id>.heic`, `<id>.m4a`…), più la copia ridotta `<id>.webp` di una foto (§3.2) |
| frammento importato | `AAAAMMGG-0000-<sigla>`, sigla `u01`…`u31`, `u26a`, `s01`, `s03`, `s04` | come sopra |
| lettura | lo stesso id del frammento | `letture/AAAA/MM/<id>.md` |
| restituzione | `r-AAAAMMGG-HHMM-<forma>` (+ `-2`, `-3` se collide): data e ora in cui [S] la scrive (`applica`), le stesse di `registrato`; per una lettera o un ritratto, l'ora della sessione che la scrive, non quella della consegna | `restituzioni/AAAA/MM/<id>.md` |
| restituzione importata | `r-AAAAMMGG-0000-eredita-<slug dell'idea o convergenza>` (A5) | come sopra |
| nodo | `<slug>`, unico in **tutto** il repository | `persone/ opere/ citazioni/ temi/ raccolte/<slug>.md` |
| voce di una restituzione | `r-…#n` (n da 1) | — |

Tutti i riferimenti nei frontmatter sono uno di questi id, uno slug, oppure `~Nome in chiaro` (tilde) per ciò che non è
un nodo (CS §2.3). Mai link markdown nel frontmatter.

**Fusi.** Il **giorno** di un frammento è la data del suo `registrato` nel fuso che porta (un memo delle 23:40 scritto in
viaggio resta di quel giorno). Ciò che scrive [S] (restituzioni, lucchetto, commit, testate di `contesto/`) usa
`Europe/Rome`, o l'ora simulata del banco (`ATLANTE_ORA`).

### 3.2 `frammento`: ciò che hai detto

Lo scrive il Comando rapido, già completo, in `ingresso/`; [S] lo sposta con `git mv` e ne registra l'hash in
`frammenti/.hash`: una riga per file (il frammento e i suoi allegati originali) nel formato di `sha256sum`
(`<sha256>  frammenti/AAAA/MM/<file>`), in ordine di percorso.

| campo | obbligatorio | valori | senza, che cosa fallisce |
|---|---|---|---|
| `registrato` | sì | data e ora ISO con fuso; **solo data** per `canale: importato` (A4) | D11 "cosa pensavo a marzo" |
| `canale` | sì | `telefono` · `chat` · `importato` | D01, D23: l'importato fuori dai conti |
| `voce` | solo importato | `sua` · `seme` | D02 conterebbe il nucleo come tuo |
| `forma` | importato o chat | `riportata`: frase tua messa per iscritto da Claude (A2), o ricopiata dalla chat del Progetto nel memo (§7.3) | D02 la mostrerebbe come scritta da te |
| `allegati` | se ci sono | nomi di file accanto, nel formato originale (`<id>.jpg`, `.heic`, `.webp`, `.m4a`); la copia ridotta `<id>.webp` la ricava [S] accanto e **non** entra in `allegati`, perché il frammento non cambia (I14) | B21 la foto della pagina |
| `intento` | no (lo scrive solo "Chiedi") | facoltativo; una lista dallo stesso elenco della lettura, e "Chiedi" (§7.1) scrive il predefinito `[chiedi]`; "Memo" non lo scrive. È un gesto tuo, non una lettura: la lettura contiene sempre i valori del frammento (e può aggiungerne, `[salva, chiedi]`) | C15e; prova a freddo R33 |

Il corpo è il testo **esatto**, link, refusi e a capo compresi ("chioran", "nn", `?si=`). Niente titolo, niente sezioni.

```md
---
registrato: 2026-11-03T23:40:12+01:00
canale: telefono
---
ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante
```

**Il frammento di chat** (C15): una conversazione è **un** frammento, `canale: chat`, con l'id del primo turno. Il corpo
contiene **solo i tuoi turni**, parola per parola, ciascuno preceduto dall'ora tra quadre (una cornice di [S], non parole
tue). Le risposte dell'AI stanno in **una** restituzione per la conversazione: nel corpo, **una sezione per domanda**
(`### 21:04 · canzoni sulla solitudine`), e le voci numerate di seguito, ciascuna con il suo `turno` (R13).

```md
---
registrato: 2026-11-14T21:04:30+01:00
canale: chat
---
[21:04] canzoni sulla solitudine
[21:07] altre
[21:09] salvami la terza
[21:10] no la seconda non c'entra niente
```

Durante la conversazione il file vive in `ingresso/` e cresce, con le risposte in una bozza accanto
(`ingresso/<id>.risposte.md`): l'ingresso è l'unico posto mutabile. Frammento e restituzione si sigillano insieme alla fine
della sessione, o d'ufficio alla **prima passata di "smista" dopo le 04:00 del giorno dopo** (V3: con 2 ore, una pausa
lunga perdeva i turni). Se Specchio trova la propria chat già sigillata, continua in un frammento nuovo con
`continua: <id>`, senza toccare il vecchio.

### 3.3 `lettura`: ciò che l'AI ha capito di un frammento

Una per frammento, stesso id. Contiene **tutti** i legami che partono da quel frammento. La versione 1 la scrive "smista";
le versioni successive solo il consolidamento (C9). Un atto (accogli, rifiuta, correggi) **non riscrive mai** la lettura
di un altro frammento: sta nella lettura del frammento che lo compie, e lo applica [S] nel calcolo.

| campo | obbl. | che cosa | prova |
|---|---|---|---|
| `schema` | sì | `3` | C12 |
| `versione` | sì | 1 = ingresso, ≥2 = consolidamento | C9: chi l'ha scritta si controlla |
| `letto-da` | sì | il modello che l'ha letta | C13 |
| `prompt` | sì | le prime 7 cifre dell'hash del prompt usato | C13 |
| `intento` | sì | uno o più tra `salva` · `chiedi` · `sguardo` · `niente` | B11 salva **e** chiedi; B18 niente |
| `reazione` | no | `[{parole: "…citate…", verso: + / - / ±}]`; l'iperbole d'entusiasmo, anche quando dice una commozione, è `+` ("mi ha spaccato", "mi ha distrutto", "mi ha colpito tanto"); ± solo per un giudizio che sta tra i due ("ci ha preso") (I23; quarta prova a freddo, P4-5) | B03, B04, B05 +; B06 "da bacio perugina" −; D03 il conforto |
| `legami` | sì (anche vuoto) | §4 | |
| `parole` | no | parole candidate a tema, **sempre una lista** (anche di una sola parola: `[greci]`): un **nome**, non un aggettivo, singolare, minuscolo, dalla tua parola ("padre", non "padri"; "i ragazzi" → `ragazzo`; "motivi culturali" → `cultura`, §13.2); i nomi di popolo restano come li scrivi (`greci`: un popolo è un tema con il tuo nome, §3.4) | D24; CS §2.3; B01 |
| `link` | no | [S] `[{url, titolo, autore}]`: puliti (`?si=` via, `t=` tenuto), titolo da oEmbed | B13, B14 |
| `trascrizione` | no | il testo letto da una foto o da un vocale; **non** è voce tua | B21 |
| `altrui` | no | `true`: il corpo è in gran parte parole d'altri che hai trascritto (un monologo, una citazione lunga); ✦ il gesto, ○ le parole | [voce §5](./10-voce.md); U19 |
| `vissuto` | no | quando è accaduto, se diverso (`stanotte`, `~2009`, `≤2026-10-04`) | B17; A4 |
| `delicato` | no | `true`: fuori da lettera, ricordo, sogno, ritratto finché non ci torni tu | B12, B25; CS §2.3 |
| `nota` | no | una riga (≤ 200 caratteri): il dove e il come ("in macchina"), o la cornice breve di Claude per un importato. Le cornici e le descrizioni lunghe (§14.1) vanno nel **corpo della lettura**, che per il resto è vuoto (R41) | B04; A2, A19 |
| `fonte` | solo importato | `file:riga@commit` dell'Atlante | A20 |
| `risposta` | sì, tranne gli importati (con `fonte`) | id della restituzione, oppure `salvato` / `ci-sono` se non c'è file | C11; B11 |

Un frammento è **parlante** [S] se non è importato, l'intento non è solo `niente` e, tolti i link, restano almeno 3
parole sue. Tutte le soglie (lettera, sogno, ritratto, giorni attivi) contano solo i parlanti così definiti: i ~32
importati ✦ non ci entrano ([prompt v3](./03-prompt-v3.md), appendice A n. 8). I non
parlanti (link nudi, "boh", "sì", "ok") restano nei dati ma non contano (§6.2). Gli importati `voce: sua` non sono
parlanti ma sono parole tue: stanno in `parole.md`, marcati con la data-tetto (§6.1, §6.2).

```yaml
# letture/2026/11/20261103-2340-k7q2.md
---
schema: 3
versione: 1
letto-da: <modello>
prompt: 3f9a2c1
intento: [salva]
reazione:
  - {parole: "molto interessante", verso: "+"}
legami:
  - {p: nomina, a: umberto-galimberti, voce: sua, perche: "«uno spezzone di galimberti a teatro»"}
  - {p: nomina, a: spettacolo-sulle-emozioni, voce: sua, perche: "«credo lo spettacolo sulle emozioni»"}
  - {p: nomina, a: il-nichilismo-e-l-ospite-inquietante, voce: sua, perche: "«il nichilismo è l'ospite inquietante», detto da Galimberti secondo te"}
  - {p: parla-di, a: nichilismo, voce: sua, perche: "parola tua"}
parole: [ragazzo, cultura]
risposta: r-20261103-2341-risposta
---
```

### 3.4 `nodo`: una cosa che ritorna

Un'entità invariante: lo stesso nodo che tu dica "Galimberti", "Umberto" o "quello dell'ospite". **Nasce** quando:
- un tuo frammento la **nomina** (persona, opera, citazione, e anche un concetto o un'immagine con un nome: kintsugi,
  nave di Teseo, stoicismo, patchwork: A9);
- tu **accogli** una proposta (D17);
- il consolidamento vede un **tema** tornare (§7.4), con il tuo nome;
- l'importazione la trova **nello sguardo** (`s01`, `s04`) o in una frase tua (A16). Il racconto `s03` non fa nascere nodi,
  salvo `raccolte/tatuaggi.md` (§14 R8).

Mai per copertura, mai per riempire un campo. La scheda è un documento d'identità, non una voce d'enciclopedia.

**I casi di confine** (I7, I12, I20, I21):
- **Concetto con il suo autore** ("eraclito il fiume"): un tema solo, `il-fiume-di-eraclito`, con l'autore nel nome; la
  persona nasce solo se la nomini da sola.
- **Una frase riconoscibile che riporti** è una citazione anche senza autore (B11); un'**immagine con un nome comune**
  ("la crepa") resta parola candidata finché non torna.
- **Il link muto e il "questa" su una foto** non fissano subito uno slug immutabile: il testo sta nella lettura
  (`link`, `trascrizione`) e il nodo nasce al primo ritorno o alla verifica.
- **"X: frase"** fa nascere la citazione con X in `attribuita-a`; la persona X ha un `nomina` solo se la nomini fuori
  dalla frase.
- **Le parentele in prima persona** ("mio padre", "la nonna") danno un nodo `vita` con slug fisso (`papa`, `mamma`,
  `nonna-lina`) e alias **solo con il possessivo** ("mio padre", "papà"): l'alias "padre" catturerebbe Telemaco. Un secondo
  omonimo della vita fa una domanda e prende lo slug con l'iniziale (`marco-b`), senza toccare il primo.
- **I miti col nome del protagonista** (Sisifo): un nodo solo in `persone/`, `cerchia: finzione`, `in: ~mito greco`; il
  mito come opera solo se lo nomini come racconto; il saggio di Camus ha il suo slug (`il-mito-di-sisifo`).
- **I gruppi** (Radiohead, Deftones) sono persone `mondo` (A10); un popolo o una tradizione ("i greci") no: è un tema
  con il tuo nome (principio 9). "Mia cugina" è una parentela: slug `cugina`, alias "mia cugina" (R62). Un tema nato da una negazione ("non nichilismo") lo dice
  nel `perche`.

**Chi la scrive.** La crea "smista" (file nuovo; per una citazione l'**elenco unico dell'ingresso**: solo `schema`, `nome`,
`nato-da` e, se ci sono, `alias` e `attribuita-a`; mai `esito`, cioè ⚠, `autore`, `riferimento`, `originale`, `traduzione`,
`citata-da`, `link`; la traccia della verifica rapida nel corpo: è ancora la creazione. Vale per le citazioni: un'opera
nasce già con il suo `autore`, §2.2, B01). Dopo, "smista" può solo **aggiungere un alias**; ogni altra modifica la fa il
consolidamento (§8.3).

| campo | generi | che cosa |
|---|---|---|
| `schema`, `nome`, `nato-da` | tutti, obbligatori | `nato-da`: id di frammenti o restituzioni (le prove) |
| `alias` | tutti | le forme tue e quelle dotte (le dotte solo qui, mai nel `nome`: principio 9) |
| `link` | tutti tranne `cerchia: vita` | URL esterni (anche la scheda dell'Atlante) |
| `fuso-in` | tutti | la **lapide**: questo slug è confluito in un altro (C8) |
| `cerchia` | `persone`, obbligatorio | `mondo` · `vita` · `finzione`. Le band sono persone `mondo` (A10) |
| `in` | `persone` (finzione), `opere` | l'opera che la contiene (Telemaco → Odissea; la traccia → l'album) |
| `anno` | `opere` | intero, negativo = a.C. (B04) |
| `autore` | `opere`, `citazioni` | l'autore **vero**: slug o `~Nome`. Vuoto se ignoto |
| `attribuita-a` | `citazioni` | a chi **tu** o la voce comune la attribuite (lista; anche un'opera in chiaro, `~La peste`) |
| `citata-da` | `citazioni` | chi la riporta dando il merito giusto (Frankl che cita Nietzsche): non sbaglia, e non va in `attribuita-a` (I20) |
| `originale`, `traduzione` | `citazioni` | il testo; per la traduzione, chi l'ha fatta oppure "resa di Claude" |
| `riferimento` | `citazioni` | una riga: opera, luogo, url, data della verifica; "fonte primaria" o "secondaria" in parole |
| `esito` | `citazioni` | `verificata` · `simile` · `errata` · `non-trovata`. **Senza esito = ⚠** |
| `scopo` | `raccolte` | una riga, parole tue; finché manca, `mappa.md` lo segnala; nessuna risposta lo chiede, perché non è tra i 7 casi dell'elenco unico (§7.2.1, §9.1) (A30) |

`esito` giudica l'attribuzione all'`autore`. "Autore giusto, opera sbagliata" (B07) è `verificata` con un `riferimento`
che dice l'opera vera: la vista lo mette accanto al tuo frammento. Il **vero autore ignoto** (B06) è `errata` con `autore`
vuoto; noto (B09: Nietzsche dietro Frankl) è `errata` con `autore` pieno.

Una **persona della vita** non si fonde mai con un autore, non riceve temi proposti, non ha `link`, non va mai in una
ricerca web (§10).

```yaml
# persone/umberto-galimberti.md
---
schema: 3
nome: Umberto Galimberti
alias: [galimberti]
cerchia: mondo
nato-da: [20261103-2340-k7q2]
---
```

```yaml
# citazioni/il-nichilismo-e-l-ospite-inquietante.md, all'ingresso (I3): nome e attribuzione, nient'altro
---
schema: 3
nome: Il nichilismo è l'ospite inquietante
attribuita-a: [umberto-galimberti]
nato-da: [20261103-2340-k7q2]
---
Passo 1: la frase circola come immagine di Nietzsche, ripresa da Galimberti in un libro (da verificare).
```

```yaml
# citazioni/il-nichilismo-e-l-ospite-inquietante.md, dopo "consolida" (testo primario e traduzione pubblicata)
---
schema: 3
nome: Il nichilismo è l'ospite inquietante
autore: "~Friedrich Nietzsche"
attribuita-a: [umberto-galimberti]
originale: "Der Nihilismus steht vor der Tür: woher kommt uns dieser unheimlichste aller Gäste? (da verificare)"
traduzione: "Il nichilismo è alla porta: da dove ci viene questo, il più inquietante fra tutti gli ospiti? (resa di Claude)"
riferimento: "Frammenti postumi, 2[127], anni da verificare; fonte primaria"
esito: simile
nato-da: [20261103-2340-k7q2]
---
```

```yaml
# temi/stare-da-solo.md, dopo la fusione mensile: una lapide
---
schema: 3
nome: stare da solo
fuso-in: solitudine
nato-da: [20270203-2210-a8f1]
---
```

### 3.5 `restituzione`: ciò che lo specchio ti ha detto

Scritta una volta, mai cambiata ([S] confronta l'hash a ogni verifica).

| campo | obbl. | che cosa |
|---|---|---|
| `schema`, `letto-da` | sì | come nella lettura (C13d: è un fatto che *quel* modello te l'ha detto); **nessun** `prompt`, che portano solo le letture (§2.2) |
| `registrato` | sì | quando è stata scritta ([S]); per `eredita` la sola data del passo (A5) |
| `forma` | sì | `risposta` · `lettera` · `ritratto` · `eredita` (le importate dall'Atlante). Il "mentre eri via" è una riga di una `risposta` (I4) |
| `per` | per `risposta` | il frammento che l'ha chiesta (per una chat, il frammento della conversazione) |
| `copre` | no | gli altri frammenti di una raffica a cui la stessa risposta risponde (T01) |
| `aggancio` | no | `{a: <id frammento>, passo: "nucleo:19"}`: la frase su cui si regge (A7). Non è "chi l'ha chiesta" |
| `voci` | sì (anche vuoto) | gli elementi numerati: `{n, rif, voce, cosa}` |
| `legami` | no | i legami che propone (convergenze, ponti), sempre `voce: proposta` o `mondo` (o `seme`, solo per le `eredita`); `da: 3` se il legame parte dalla voce 3 (un brano che parla di solitudine: Q25) |
| `fonte` | solo `eredita` | `file:riga@commit` (A20) |

`voci[].rif` è uno slug, un id di frammento o un `~Nome`; `voci[].turno` dice a quale turno di una chat appartiene; `voci[].cosa` dice che cosa è: `brano`, `libro`, `citazione`,
`frase` (la tua frase d'apertura), `tensione`, `vuoto`, `film`, `opera`, `persona`, `idea`, `correzione`, `ponte`, `convergenza`, `confronto`, `sogno`, `ricordo`, `domanda`, `assenza`. `voci[].esito` registra una verifica del mondo fatta in quella risposta (D15, Q21): `mappa.md` la elenca tra le voci già
verificate e non si rifà. `voci[].estratto` (solo `eredita`) è la riga centrale del passo, ≤ 25 parole, **copiata** dal
corpo: [S] controlla che sia una sottostringa (Q3). Il numero `n` lo assegna [S], nell'ordine
in cui le voci compaiono nel corpo; il corpo mostra gli stessi numeri. Così "la terza" è stabile (D17).

Il corpo è il testo consegnato, con i segni di voce (§5). Le voci compaiono nel corpo come `1.` a inizio riga (anche
quando ce n'è una sola) oppure `[1]` dentro la prosa; [S] controlla che i numeri del corpo e quelli di `voci` coincidano
(R38, R61). Un esempio completo (R12):

```md
---
schema: 3
forma: risposta
letto-da: <modello>
registrato: 2026-11-03T23:41:05+01:00
per: 20261103-2340-k7q2
voci:
  - {n: 1, rif: il-nichilismo-e-l-ospite-inquietante, voce: mondo, cosa: citazione, riferimento: "Frammenti postumi, 2[127] (da verificare)"}
  - {n: 2, rif: spettacolo-sulle-emozioni, voce: mondo, cosa: opera}
---
**Salvato.**
1. "L'ospite inquietante" è un'immagine di Nietzsche ○, che Galimberti ha ripreso in un libro ⚠.
2. Lo spettacolo forse è *Il mondo delle emozioni* ⚠.
```

Una risposta non ripete la tua reazione (R67). Senza file (`risposta: salvato` o `ci-sono`), la riga "Salvato." o
"Ci sono." la mostra `recenti.md`, letta dalla lettura (R61). Le convergenze dell'Atlante e i ritratti importati sono
restituzioni `eredita`: fuori dai conti, mai rilanciate, mai sbiadite, trovabili.

### 3.6 Lo slug e gli alias

**`slug(nome)`** [S], deterministica:
1. normalizza in NFKD e togli i segni diacritici; `ß`→`ss`, `æ`→`ae`, `œ`→`oe`;
2. minuscolo;
3. ogni sequenza di caratteri fuori da `[a-z0-9]` (spazi, apostrofi, punteggiatura) diventa un trattino; togli i
   trattini in testa e in coda;
4. oltre 60 caratteri, tronca all'ultimo trattino prima del sessantesimo;
5. se resta vuoto: `senza-nome`.

**Da quale nome** si parte (lo dà l'AI nel piano, la regola è fissa):

| genere | base dello slug | esempio |
|---|---|---|
| persone `mondo` | nome completo come lo conosce il mondo | `umberto-galimberti` |
| persone `vita` | il nome come lo scrivi tu; per le parentele in prima persona uno slug fisso (`papa`, `mamma`, `nonna-<nome>`), mai `mio-padre` | `marco`, `papa`, `nonna-lina` |
| persone `finzione` | il nome del personaggio | `telemaco`, `rust-cohle` |
| opere | il titolo come lo dici tu; quello vero va in `alias` e nella risposta | `spettacolo-sulle-emozioni` |
| citazioni | le prime **6 parole** del `nome`, cioè della forma che circola (dal tuo frammento, o dalla `trascrizione` se dici solo "questa", B21); una parola è un tratto tra due spazi del `nome`, prima di `slug()` ("l'ospite" è una parola) | `cio-a-cui-resisti-persiste`, `il-nichilismo-e-l-ospite-inquietante` |
| temi, raccolte | la tua parola | `padre`, `tatuaggi` |

Il `genere` (nel piano, nel pacchetto, in `mappa.md`) è il nome della cartella, al plurale: `persone`, `opere`,
`citazioni`, `temi`, `raccolte`; il singolare serve solo al suffisso di una collisione, qui sotto (quarta prova, P4-21).

**Collisioni.** Se lo slug esiste in un **altro genere**, è un'altra cosa per definizione: [S] aggiunge il genere al
singolare senza chiedere (`-persona`, `-opera`, `-citazione`, `-tema`, `-raccolta`: `sisifo-opera`), poi `-2`, `-3`. Se
esiste nello **stesso genere**, [AI] decide nel piano "è lo stesso?" (alias, o nodo nuovo con `-2`, `-3`). Per due persone della vita con lo stesso nome, l'AI propone un qualificatore tuo
(`marco-palestra`).

**Slug ereditati.** I nodi importati tengono lo slug dell'Atlante (`camus`, `marco-aurelio`): uno slug non cambia mai, e
la tabella degli alias assorbe la differenza (A16). `rust-cohle` non ha una scheda nell'Atlante: nasce all'importazione da
u19 (il monologo che hai trascritto è suo) e u20, con la regola delle persone `finzione` qui sopra. Uno slug fuso resta come lapide (§3.4).

**La tabella degli alias** [S] sta in `contesto/mappa.md` (§6.1): una riga per ogni `nome` e `alias` di ogni nodo vivo,
nella forma `chiave → slug (genere, cerchia)`. `chiave(s)` = i passi 1–3 di `slug()` con lo spazio al posto del trattino,
senza gli articoli in testa (R11). L'elenco degli articoli è chiuso: il, lo, la, i, gli, le, l', un, una, the (non "uno"
né altro).

**La risoluzione di un nome** (in "smista"):
1. [S] cerca la `chiave` esatta tra nomi e alias; per i nomi propri nudi guarda **prima** `cerchia: vita` (B06 Marco);
2. [S] propone i candidati vicini: distanza di Levenshtein ≤ 2 tra due chiavi di almeno 5 lettere ciascuna, oppure lo stesso
   **scheletro** (`scheletro(s)` = chiave senza vocali, senza `h`, doppie ridotte: "chioran" e "cioran" danno entrambe `crn`);
   e due regole che valgono **solo per i nodi di `persone/`** (R10): **cognome**, la chiave detta coincide con le ultime parole intere di un nome
   ("galimberti" → `umberto-galimberti`, "de andre" → `fabrizio-de-andre`); **nome**, coincide con le prime parole
   ("marco" → `marco-aurelio`). Sono candidati **deboli**: li mostra all'AI, mai una scelta automatica, e un nome nudo
   in prima persona va prima alla `cerchia: vita` (B06);
3. [AI] sceglie tra i candidati o dice "nuovo"; se l'entità è ambigua e un errore sarebbe permanente (B04 "la 3"), fa
   **una** domanda nella risposta e intanto scrive `~Nome`;
4. [S] se la forma usata è nuova, la aggiunge agli `alias` del nodo (unica modifica di un nodo concessa a "smista").

**La firma** [S] (come nel codice della seconda prova e nel piano, blocco 1): `candidati(nome, alias)` → `[{slug, via,
debole}]`. `alias` sono le righe `{chiave, slug, genere, cerchia?}` della tabella (o i nodi, `{slug, nome, alias, genere,
cerchia?}`); `via` è una di `esatta`, `cognome`, `levenshtein`, `scheletro`, `nome`, in quest'ordine di forza; `debole` è
`false` solo per `esatta`. Per slug resta la via più forte; l'elenco è ordinato per forza, a pari forza `cerchia: vita` in
testa (B06), poi per slug. Propone, non decide.

**I nomi del testo** [S] (a chi `prepara` chiede i candidati): ogni sequenza di 1–4 parole consecutive dentro una frase
del frammento, tolti i link e le ore dei turni. Una corrispondenza `esatta` conta sempre; le deboli solo per una sequenza
che non comincia né finisce con una parola vuota (articoli, preposizioni, congiunzioni) e, se è di una parola, di almeno 4
lettere. Ogni slug resta sotto la sua forma migliore; una forma contenuta in una corrispondenza esatta più lunga cade.

### 3.7 La grammatica: lo schema JSON dei frontmatter

[S] `verifica.mjs` converte il frontmatter YAML in JSON, aggiunge `_genere` (dalla cartella, per i nodi) e lo valida con
questo schema prima di ogni push. Un piano che non passa non diventa file. Il tipo lo dice la cartella (`frammenti/` →
`frammento`, `letture/` → `lettura`, i cinque generi → `nodo`, `restituzioni/` → `restituzione`: si valida
`memo/schema-3#/$defs/<tipo>`); chi valida senza la cartella usa la radice, che sceglie il tipo dalle chiavi (`canale` →
frammento, `_genere` → nodo, `versione` → lettura, `voci` → restituzione) e rifiuta tutto il resto. Il file è
`schema/frontmatter.json` (§11).

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "memo/schema-3",
  "type": "object",
  "if": {"required": ["canale"]}, "then": {"$ref": "#/$defs/frammento"},
  "else": {"if": {"required": ["_genere"]}, "then": {"$ref": "#/$defs/nodo"},
    "else": {"if": {"required": ["versione"]}, "then": {"$ref": "#/$defs/lettura"},
      "else": {"if": {"required": ["voci"]}, "then": {"$ref": "#/$defs/restituzione"}, "else": false}}},
  "$defs": {
    "idF": {"type": "string", "pattern": "^\\d{8}-\\d{4}-[a-z0-9]{3,4}$"},
    "idR": {"type": "string", "pattern": "^r-\\d{8}-\\d{4}-[a-z0-9-]+$"},
    "slug": {"type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$", "maxLength": 60},
    "chiaro": {"type": "string", "pattern": "^~\\S.*$"},
    "nodo-o-chiaro": {"anyOf": [{"$ref": "#/$defs/slug"}, {"$ref": "#/$defs/chiaro"}]},
    "oggetto": {"anyOf": [
      {"$ref": "#/$defs/slug"}, {"$ref": "#/$defs/chiaro"}, {"$ref": "#/$defs/idF"},
      {"type": "string", "pattern": "^r-\\d{8}-\\d{4}-[a-z0-9-]+(#\\d+)?$"}]},
    "voce": {"enum": ["sua", "seme", "proposta", "mondo"]},
    "quando": {"type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}(:\\d{2})?(Z|[+-]\\d{2}:\\d{2}))?$"},
    "fonte1": {"type": "string", "pattern": "^[^:]+:\\d+(-\\d+)?(, ?\\d+(-\\d+)?)*@[0-9a-f]{7}$"},
    "fonte": {"anyOf": [{"$ref": "#/$defs/fonte1"}, {"type": "array", "minItems": 1, "items": {"$ref": "#/$defs/fonte1"}}]},
    "modello": {"type": "string", "minLength": 3},
    "intento": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["salva", "chiedi", "sguardo", "niente"]}},

    "legame": {
      "type": "object",
      "required": ["p", "voce", "perche"],
      "additionalProperties": false,
      "properties": {
        "p": {"enum": ["nomina", "parla-di", "serve-a", "ritorna-su", "contraddice", "converge-con"]},
        "a": {"$ref": "#/$defs/oggetto"},
        "tra": {"type": "array", "minItems": 2, "items": {"$ref": "#/$defs/oggetto"}},
        "voce": {"$ref": "#/$defs/voce"},
        "perche": {"type": "string", "minLength": 3, "maxLength": 300},
        "momento": {"type": "string", "maxLength": 60},
        "fruizione": {"enum": ["da-fare", "in-corso", "fatta"]},
        "come": {"enum": ["metafora", "stato", "aggiunge", "corregge", "ripensa", "effetto", "accoglie", "rifiuta", "chiede", "dubbio"]},
        "da": {"type": "integer", "minimum": 1},
        "n": {"type": "integer", "minimum": 1},
        "passo": {"type": "string", "pattern": "^[a-z0-9-]+:\\d+(-\\d+)?$"},
        "turno": {"type": "string", "pattern": "^\\d{2}:\\d{2}$"},
        "nodo": {"$ref": "#/$defs/slug"},
        "campo": {"enum": ["autore", "attribuita-a", "in", "nome"]},
        "vecchio": {"type": "string"},
        "valore": {"type": "string"}
      },
      "allOf": [
        {"if": {"properties": {"p": {"const": "converge-con"}}},
         "then": {"required": ["tra"], "not": {"required": ["a"]}},
         "else": {"required": ["a"], "not": {"required": ["tra"]}}},
        {"if": {"properties": {"p": {"enum": ["nomina", "parla-di", "serve-a"]}}},
         "then": {"properties": {"a": {"$ref": "#/$defs/nodo-o-chiaro"}}}},
        {"if": {"properties": {"p": {"const": "serve-a"}}},
         "then": {"properties": {"a": {"$ref": "#/$defs/slug"}}}},
        {"if": {"properties": {"p": {"enum": ["ritorna-su", "contraddice"]}}},
         "then": {"properties": {"a": {"anyOf": [{"$ref": "#/$defs/idF"}, {"$ref": "#/$defs/idR"}]}}}},
        {"if": {"properties": {"p": {"const": "ritorna-su"}}},
         "then": {"required": ["come"], "properties": {"come": {"enum": ["aggiunge", "corregge", "ripensa", "effetto", "accoglie", "rifiuta", "chiede"]}}}},
        {"if": {"properties": {"p": {"const": "contraddice"}}},
         "then": {"properties": {"come": {"const": "dubbio"}}}},
        {"if": {"properties": {"p": {"const": "parla-di"}}},
         "then": {"properties": {"come": {"enum": ["metafora", "stato"]}}}},
        {"if": {"properties": {"p": {"enum": ["nomina", "serve-a", "converge-con"]}}},
         "then": {"not": {"required": ["come"]}}},
        {"if": {"properties": {"p": {"not": {"const": "nomina"}}}},
         "then": {"not": {"anyOf": [{"required": ["momento"]}, {"required": ["fruizione"]}]}}},
        {"if": {"required": ["campo"]},
         "then": {"required": ["nodo", "valore"], "properties": {"p": {"const": "ritorna-su"}, "come": {"const": "corregge"}}}}
      ]
    },

    "frammento": {
      "type": "object",
      "required": ["registrato", "canale"],
      "additionalProperties": false,
      "properties": {
        "registrato": {"$ref": "#/$defs/quando"},
        "canale": {"enum": ["telefono", "chat", "importato"]},
        "voce": {"enum": ["sua", "seme"]},
        "forma": {"const": "riportata"},
        "continua": {"$ref": "#/$defs/idF"},
        "intento": {"$ref": "#/$defs/intento"},
        "allegati": {"type": "array", "items": {"type": "string", "pattern": "^\\d{8}-\\d{4}-[a-z0-9]{3,4}(-\\d)?\\.(webp|jpg|jpeg|png|heic|m4a)$"}}
      },
      "allOf": [
        {"if": {"properties": {"canale": {"const": "importato"}}},
         "then": {"required": ["voce"]},
         "else": {"not": {"required": ["voce"]}, "properties": {"registrato": {"pattern": "T"}}}},
        {"if": {"properties": {"canale": {"const": "telefono"}}},
         "then": {"not": {"required": ["forma"]}}}
      ]
    },

    "lettura": {
      "type": "object",
      "required": ["schema", "versione", "letto-da", "prompt", "intento", "legami"],
      "additionalProperties": false,
      "properties": {
        "schema": {"const": 3},
        "versione": {"type": "integer", "minimum": 1},
        "letto-da": {"$ref": "#/$defs/modello"},
        "prompt": {"type": "string", "pattern": "^[0-9a-f]{7}$"},
        "intento": {"$ref": "#/$defs/intento"},
        "reazione": {"type": "array", "items": {"type": "object", "required": ["parole", "verso"], "additionalProperties": false,
          "properties": {"parole": {"type": "string"}, "verso": {"enum": ["+", "-", "±"]}}}},
        "legami": {"type": "array", "items": {"$ref": "#/$defs/legame"}},
        "parole": {"type": "array", "uniqueItems": true, "items": {"type": "string", "pattern": "^[a-zàèéìòù]+( [a-zàèéìòù]+)*$"}},
        "link": {"type": "array", "items": {"type": "object", "required": ["url"], "additionalProperties": false,
          "properties": {"url": {"type": "string", "pattern": "^https://"}, "titolo": {"type": "string"}, "autore": {"type": "string"}}}},
        "trascrizione": {"type": "string"},
        "altrui": {"const": true},
        "vissuto": {"type": "string", "maxLength": 40},
        "delicato": {"const": true},
        "nota": {"type": "string", "maxLength": 200},
        "fonte": {"$ref": "#/$defs/fonte"},
        "risposta": {"anyOf": [{"enum": ["salvato", "ci-sono"]}, {"$ref": "#/$defs/idR"}]}
      },
      "if": {"not": {"required": ["fonte"]}}, "then": {"required": ["risposta"]}
    },

    "nodo": {
      "type": "object",
      "required": ["schema", "nome", "nato-da", "_genere"],
      "additionalProperties": false,
      "properties": {
        "_genere": {"enum": ["persone", "opere", "citazioni", "temi", "raccolte"]},
        "schema": {"const": 3},
        "nome": {"type": "string", "minLength": 1},
        "alias": {"type": "array", "uniqueItems": true, "items": {"type": "string"}},
        "nato-da": {"type": "array", "minItems": 1, "items": {"anyOf": [{"$ref": "#/$defs/idF"}, {"$ref": "#/$defs/idR"}]}},
        "link": {"type": "array", "items": {"type": "string", "pattern": "^https://"}},
        "fuso-in": {"$ref": "#/$defs/slug"},
        "cerchia": {"enum": ["mondo", "vita", "finzione"]},
        "in": {"$ref": "#/$defs/nodo-o-chiaro"},
        "autore": {"$ref": "#/$defs/nodo-o-chiaro"},
        "attribuita-a": {"type": "array", "items": {"$ref": "#/$defs/nodo-o-chiaro"}},
        "citata-da": {"type": "array", "items": {"$ref": "#/$defs/nodo-o-chiaro"}},
        "originale": {"type": "string"},
        "traduzione": {"type": "string"},
        "riferimento": {"type": "string"},
        "esito": {"enum": ["verificata", "simile", "errata", "non-trovata"]},
        "scopo": {"type": "string"},
        "anno": {"type": "integer"}
      },
      "allOf": [
        {"if": {"required": ["fuso-in"]},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "nato-da", "fuso-in"]}}},
        {"if": {"properties": {"_genere": {"const": "persone"}}, "not": {"required": ["fuso-in"]}},
         "then": {"required": ["cerchia"], "propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "cerchia", "in"]}}},
        {"if": {"required": ["cerchia"], "properties": {"cerchia": {"const": "vita"}}},
         "then": {"not": {"anyOf": [{"required": ["link"]}, {"required": ["in"]}]}}},
        {"if": {"properties": {"_genere": {"const": "opere"}}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in", "autore", "in", "anno"]}}},
        {"if": {"properties": {"_genere": {"const": "citazioni"}}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in", "autore", "attribuita-a", "citata-da", "originale", "traduzione", "riferimento", "esito"]}}},
        {"if": {"properties": {"_genere": {"const": "temi"}}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in"]}}},
        {"if": {"properties": {"_genere": {"const": "raccolte"}}, "not": {"required": ["fuso-in"]}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "scopo"]}}}
      ]
    },

    "restituzione": {
      "type": "object",
      "required": ["schema", "forma", "letto-da", "registrato", "voci"],
      "additionalProperties": false,
      "properties": {
        "schema": {"const": 3},
        "forma": {"enum": ["risposta", "lettera", "ritratto", "eredita"]},
        "letto-da": {"$ref": "#/$defs/modello"},
        "registrato": {"$ref": "#/$defs/quando"},
        "per": {"$ref": "#/$defs/idF"},
        "copre": {"type": "array", "items": {"$ref": "#/$defs/idF"}},
        "aggancio": {"type": "object", "required": ["a"], "additionalProperties": false,
          "properties": {"a": {"$ref": "#/$defs/idF"}, "passo": {"type": "string", "pattern": "^[a-z0-9-]+:\\d+(-\\d+)?$"}}},
        "voci": {"type": "array", "items": {"type": "object", "required": ["n", "rif", "voce", "cosa"], "additionalProperties": false,
          "properties": {
            "n": {"type": "integer", "minimum": 1},
            "turno": {"type": "string", "pattern": "^\\d{2}:\\d{2}$"},
            "perche": {"type": "string", "maxLength": 300},
            "rif": {"$ref": "#/$defs/oggetto"},
            "voce": {"$ref": "#/$defs/voce"},
            "estratto": {"type": "string", "maxLength": 200},
            "esito": {"enum": ["verificata", "simile", "errata", "non-trovata"]},
            "riferimento": {"type": "string"},
            "cosa": {"enum": ["frase", "tensione", "vuoto", "correzione", "opera", "brano", "libro", "film", "citazione", "persona", "ponte", "convergenza", "confronto", "sogno", "ricordo", "domanda", "assenza", "idea"]}}}},
        "legami": {"type": "array", "items": {"allOf": [{"$ref": "#/$defs/legame"},
          {"properties": {"voce": {"enum": ["proposta", "mondo", "seme"]}}}]}},
        "fonte": {"$ref": "#/$defs/fonte"}
      },
      "allOf": [
        {"if": {"properties": {"forma": {"const": "risposta"}}}, "then": {"required": ["per"]}},
        {"if": {"properties": {"forma": {"const": "eredita"}}}, "then": {"required": ["fonte"]}, "else": {"not": {"required": ["fonte"]}}}
      ]
    }
  }
}
```

**ID esterno** (G3, B24; tolti dalla tappa 1, §15 riga 19): un campo che porti l'identificativo di un registro esterno
(`wikidata`, `qid`, `musicbrainz`, `mbid`, `isbn`, `imdb`, `discogs`, `viaf`, `goodreads`, `openlibrary`), che lo schema
rifiuta già (`additionalProperties: false`), o un `link` verso uno di quei registri (`wikidata.org`, `musicbrainz.org`,
`isbnsearch.org`, `imdb.com`, `discogs.com`, `viaf.org`, `goodreads.com`, `openlibrary.org`), che [S] rifiuta in qualunque
file, chiunque lo scriva ("smista", "consolida", l'importazione), nel frontmatter e nel corpo di letture, nodi e
restituzioni; non nel corpo di un frammento, che è il tuo testo byte per byte e tiene i link che hai mandato.

**Che cosa lo schema non vede, e controlla [S] a parte:** che ogni slug citato esista (o sia una lapide, che si segue);
che `n` esista nella restituzione puntata; che `ritorna-su … come: accoglie|rifiuta` punti a una restituzione o a un
legame proposto; che la `voce: sua` di un legame stia solo nella lettura di un frammento non importato o importato con
`voce: sua`; che i numeri `n` siano 1…k senza buchi e compaiano nel corpo; che l'hash di frammenti e restituzioni non sia
cambiato; che `versione: 1` sia scritta solo da "smista" (anche da Specchio che ne fa il lavoro, con `ciclo: smista` o, per la chat che
sigilla, `ciclo: specchio`) o dall'importazione, e le versioni ≥ 2 solo da "consolida" o da una migrazione; che
`reazione.parole` sia una sottostringa esatta del frammento (V16); che ogni ○ abbia il suo luogo (§9.1, S7); Q-nomi con la regola del §9.5 (C14). I temi nati da un'accoglienza (`nato-da` è la restituzione `r-…` della voce accolta, senza `#n`, come le 8
domande dell'Atlante: A14) sono esenti: il nome è una formula dell'AI accolta da te, e le viste la mostrano ◌→● come ogni legame accolto.

---

## 4. I sei predicati

Un legame è un oggetto dell'elenco `legami:` di una lettura (o di una restituzione), **sempre nella stessa forma**:
`{p, a | tra, voce, perche, …qualificatori}`. `perche` è obbligatorio: o le tue parole tra «», o una riga dell'AI.

| `p` | da → `a` | qualificatori | prova (senza, che cosa fallisce) |
|---|---|---|---|
| `nomina` | frammento → persona, opera, citazione (o `~Nome`) | `momento` (12:34, cap. 34, traccia 3, "verso la fine"), `fruizione` (`da-fare` · `in-corso` · `fatta`) | B01, B02, B14 "dal minuto 12", B24 "devo leggere", D13 |
| `parla-di` | frammento → tema, o qualunque nodo usato come immagine | `come: metafora` · `come: stato` (lo stato d'animo del momento) | B10 "mi sento come sisifo" = metafora; D03, l'inverno: `stato` |
| `serve-a` | frammento, restituzione → raccolta | — | B07, B23, D20 |
| `ritorna-su` | frammento → frammento o restituzione (`n` per una voce, `passo` per un punto dello sguardo, `turno` nella chat) | `come`: `aggiunge` · `corregge` (+ `nodo`, `campo`, `vecchio`, `valore`) · `ripensa` · `effetto` · `accoglie` · `rifiuta` · `chiede` | B02, B22, D05 "mi ha fatto bene", D08, D17, D18 |
| `contraddice` | frammento → la frase tua più vicina (`passo` per lo sguardo) | `come: dubbio` se esiti | B20 il dolore contro u03; D25 "camus si sbagliava" |
| `converge-con` | `tra`: due o più tra nodi, frammenti, voci di restituzione (`r-…#2`), `~Nome` (A1) | (solo `perche`, in prosa) | B16 Eraclito = nave di Teseo, voce sua; le convergenze dell'Atlante |

**Tutti gli atti passano da `ritorna-su`** (CS §1.2): niente più `atti` e `in-risposta-a`. Esempi:

```yaml
# "salvami la terza" (turno 21:09 della chat del 14 novembre)
- {p: ritorna-su, a: r-20261114-2105-risposta, n: 3, come: accoglie, turno: "21:09", voce: sua, perche: "«salvami la terza»"}
# "no aspetta quella di ieri non era jung era peterson" (B22)
- {p: ritorna-su, a: 20270311-2110-p0x4, come: corregge, nodo: metti-in-ordine-la-tua-casa, campo: attribuita-a, vecchio: carl-gustav-jung, valore: jordan-peterson, voce: sua, perche: "«non era jung era peterson»"}
# "sì, Rust è l'ospite" sulla lettera dell'8 novembre
- {p: ritorna-su, a: r-20261108-0313-lettera, n: 1, come: accoglie, voce: sua, perche: "«sì, rust è l'ospite»"}
```

**Regole di confine.**
- **Che cosa conta come accoglienza** [S]: `come: accoglie`; `come: effetto` positivo **con `n`** su una voce che
  porta un legame ◌ (un effetto senza `n` vale per tutta la restituzione e **non** è accoglienza: D05, Q16); un tuo frammento che porta
  **lo stesso legame** (stessi capi, stesso predicato). Che lo stesso pensiero torni **con altre parole** (Karamazov) lo
  decide [AI] nel consolidamento, scrivendo `come: accoglie`. **Non** conta: averla letta, o chiederne il perché (D08):
  quella è `come: chiede`, che pesa come un richiamo e non come un ritorno (Q16).
- **Un rifiuto** non si ripropone più nello stesso contesto (Q4, Q17). [S] lo scrive nella sezione `## Scarti` di
  `mappa.md`, che leggono tutti, Progetto compreso: **chiave** = lo slug, oppure la `chiave()` di `~Nome` (per un brano
  "artista · titolo"); **contesto** = i temi `parla-di` del frammento che aveva chiesto ("solitudine"). **Portata**: il
  rifiuto vale per il legame; se le tue parole nominano l'entità e non il legame ("questa di buddha non mi rappresenta"),
  vale per l'entità in quel contesto, e la risposta lo dice.
- **Una correzione** (V8) nomina il **nodo** (`nodo`), il `campo`, il `vecchio` valore e il `valore` nuovo; su un campo
  lista (`attribuita-a`) il `vecchio` si sostituisce con il `valore`; `valore` ammette `@Nome` per `autore`,
  `attribuita-a` e `in` (la persona giusta nasce allora). Vale subito nelle viste: [S] la mostra in `mappa.md` sotto il
  nodo, `attribuita-a → jordan-peterson (corregge <id>, in attesa)`. "Consolida" aggiorna **solo il nodo**: la lettura
  colpita non passa a una versione nuova (un atto non riscrive mai la lettura di un altro, §3.3). Una correzione cerca il
  bersaglio negli ultimi 3 giorni di calendario più oggi; senza bersaglio non c'è atto (B22).
- **`contraddice`** punta alla **frase tua più vicina** (u03 «la dimensione principale…», non tutto il nucleo) e, se
  serve, al **passo** dello sguardo (`passo: nucleo:19`): mai a un frammento intero da cui prenderebbe con sé tutto
  (Q6, Q23). Lo scrive **solo "consolida"** (V14: due scrittori facevano
  doppioni), e [S] rifiuta due `contraddice` verso lo stesso `a` nella stessa lettura. È di voce `sua` solo se il nuovo
  nega **con parole tue** un enunciato del vecchio ("camus si sbagliava"); allora segna, **per quel passo**, la data in cui
  la posizione è stata messa in discussione; se il frammento esita ("forse", una domanda) porta
  `come: dubbio` e resta **tensione** finché non ci torni. Proposto dall'AI (B20) è sempre tensione. Non esiste lo stato
  `superato`: [S] scrive in `mappa.md` le **posizioni** per passo (data · frase · voce · dal · messa in discussione il ·
  tensioni; una riga `vecchio-id (data) ⟷ nuovo-id (data) · voce · nodi comuni`), e "che cosa pensavo a gennaio" si
  risponde con quelle date (Q12).
- **Anche una domanda nomina** (Q18): "top quote di dostoevskij" fa nascere `persone/fedor-dostoevskij` se manca. Le opere
  che lo portavano come `~Fëdor Dostoevskij` si ricollegano nel calcolo (`mappa.md`, nomi senza nodo), senza riscriverle.
- **Una idea attribuita che non è una frase** (Telemaco secondo Recalcati, B05) è `nomina` della persona con voce `mondo`
  e il `perche`; non diventa una citazione.
- **`momento`** porta anche la traccia di un album ("traccia 3", B04): il titolo si risolve nel consolidamento con una
  ricerca, e nasce un'opera con `in: <album>` solo dopo la tua conferma.
- **Le copie non generano legami** (A3): se lo stesso testo vive in due frammenti importati, i legami partono solo dalla
  fonte primaria.
- **Mettere in una raccolta un frammento precedente** («quella di ieri la voglio tra i tatuaggi»): il memo nuovo porta
  `serve-a: tatuaggi` e `ritorna-su` verso il frammento vecchio (`come: aggiunge`); il frammento vecchio e la sua lettura
  non si toccano.
- **Tolti:** `sente` (è `parla-di` con `come: stato`), `tramite` (è `nomina` + il `perche`: "«marco mi ha mandato»").

---

## 5. Le voci e la provenienza

| voce | segno | che cosa vuol dire | come ci si arriva |
|---|---|---|---|
| `sua` | ✦ | l'hai detto tu, in quel frammento | lettura |
| `seme` | ✧ | dalla chat d'origine dell'Atlante: parole tue con sintesi di Claude | importazione |
| `proposta` | ◌ | lettura dell'AI | lettura, consolidamento, restituzione |
| `mondo` | ○ | fatto esterno, con il suo `esito` | lettura, consolidamento |
| *accolta* | ● | proposta e poi ripresa o confermata da te | **calcolata** [S] dai `ritorna-su` successivi; mai scritta |

Segni delle risposte, sempre gli stessi: ✦ ✧ ● ◌ ○ e ⚠ (da verificare). Una frase `forma: riportata` (A2) si mostra ✦
con la nota "trascritta da Claude" (per gli importati "trascritta da Claude nel seme"; ogni controllo cerca le prime tre
parole); in un elenco di righe la nota compare **una volta sola**, in testa al gruppo di righe riportate a cui si applica. Un **testo altrui che hai trascritto** (lettura `altrui: true`) è ✦ per il
gesto e per il tuo commento, ○ per le parole, che vanno tra «» (§9.1): "le mie frasi" non le contano come tue.

**Gli stati** [S], calcolati e mai scritti:
- `rifiutato`: un tuo no; non entra più nelle risposte né si ripropone in quel contesto;
- `sbiadito`: un legame `proposta` mai toccato per **30 giorni attivi** (C10). *Toccato* (V11) = un frammento ✦ porta
  **entrambi** i capi (o lo stesso legame), oppure un `ritorna-su` alla proposta: con un capo solo, le proposte verso un
  tema frequente non sbiadirebbero mai. Scende in fondo alle viste, esce dalle risposte "nella mia testa", resta nei dati e risale se torna. Le
  restituzioni `eredita` **non** sbiadiscono (A11): sono già fuori dai conti e salgono solo se un frammento le tira.

**Il ● accoglie il legame, non le parole** (C14a). Dopo "sì, la rabbia che diventa pace", il legame
`berserk ↔ marco-aurelio` è ●, ma la formula resta dell'AI: si mostra "◌→● la rabbia che diventa pace (formula mia,
accolta da te il 14 marzo)", in tondo. **Le citazioni tue sono solo testo ✦.** Le risposte "le mie frasi, solo le mie"
(D02) mostrano solo ✦; il seme ✧ va a parte, come voce mista, con il suo passo alla lettera in corsivo come ogni passo
citato (il corsivo dice "alla lettera", non "mio": il segno ✧ dice di chi è). Le risposte "nella mia testa" (D19) mostrano i legami ✦ ✧ ●,
e lo strato ◌ separato.

---

## 6. Il calcolato: `contesto/`

### 6.1 Quattro file, un tetto

`contesto.mjs` [S] li rigenera alla fine di ogni sessione che ha il lucchetto (§8). Ognuno si apre con:

```yaml
aggiornato: 2026-11-07T23:41:05+01:00
fino-a: 20261107-2338-m2c9     # l'ultimo frammento compreso
token-stimati: 18400            # caratteri / 3,5
```

| file | che cosa | chi lo legge |
|---|---|---|
| `contesto/parole.md` | i frammenti **✦ parlanti** (C7, T08), in ordine di tempo, parola per parola, con data e id; gli importati `voce: sua` (non parlanti, ma parole tue) marcati con la data-tetto (§6.2); i turni di chat senza contenuto tolti; i `delicato` e gli `altrui` marcati. **In fondo**, in una sezione breve `## Seme ✧` e mai mescolato alle righe ✦, il seme: i passi di `s01`, `s03` e `s04` alla lettera, con `passo` e data-tetto (così il Progetto può dare la riga ✧ di D02 senza leggere `frammenti/`) | Progetto, Specchio, "consolida" |
| `contesto/recenti.md` | gli ultimi **30** frammenti del telefono, anche non parlanti e di qualunque età (T02: dopo un silenzio servono quelli di prima), ciascuno con la sua risposta; **a parte**, le ultime 5 conversazioni di chat; le ultime 10 restituzioni **intere** (le `eredita` escluse), con le voci numerate (così le domande non scacciano i messaggi: Q5) | "smista" (per "quella di ieri", "la terza"), Progetto, Specchio |
| `contesto/ritratto.md` | la copia dell'ultimo ritratto, senza frontmatter ([S] la copia, non la riscrive) | Progetto |
| `contesto/mappa.md` | tutto il resto, per nodo e non per frammento (C7): sotto | tutti |

`mappa.md` contiene, in quest'ordine, una sezione `##` ciascuno:
1. **Stato**: giorni attivi totali, frammenti parlanti totali e della settimana (la settimana ISO, da lunedì, in
   `Europe/Rome`), soglie (lettera sì/no, sogno acceso/spento, ritratto), la data dell'ultimo "consolida" riuscito (§6.2);
2. **Nodi**: una riga ciascuno, `slug · genere · nome · ✦n ✧n ◌n ●n · prima–ultima data · vicenda?`; la voce è quella **del
   legame**, non dell'origine della nota (Q33); lapidi con la freccia. Per le citazioni anche `esito`, l'originale breve e
   la traduzione o "resa di Claude" (Q20); la `nota` della lettura quando c'è ("esempio", "citata da Claude": Q19).
   Es.: `- umberto-galimberti · persone · Umberto Galimberti · ✦1 ✧0 ◌0 ●0 · 2026-11-03–2026-11-03`;
3. **Alias**: `chiave → slug (genere, cerchia)`, la cerchia solo per le persone (§3.6). Es.: `- galimberti → umberto-galimberti
   (persone, mondo)`;
4. **Parole candidate**: parola · date · giorni distinti (D24). Es.: `- mare · 2026-11-16, 2027-02-03 · 2`;
5. **Conti** per mese, per tema, per voce, importati esclusi; i delicati contati ma non nominati; le domande a parte (C15d, Q22).
   Es.: `- 2026-11 · nichilismo · ✦2` (una riga per mese e tema), `- 2026-11 · frammenti parlanti · 10 · dopo le 22: 3`,
   `- 2026-12 · delicati · 1` (senza nome né id);
6. **Posizioni**: per passo, data · frase · voce · dal · messa in discussione il · tensioni (§4, Q6, Q12);
7. **Fruizioni**: da fare, in corso, fatte;
8. **Correzioni**: quelle in attesa di "consolida" (`attribuita-a → jordan-peterson (corregge <id>, in attesa)`, §4) e quelle
   applicate, con la data (`attribuita-a → jordan-peterson (corregge <id>, applicata il 2027-03-14)`). Una correzione è
   **applicata** quando il valore è già nel nodo, chiunque l'abbia scritto;
9. **Scarti**: chiave · contesto · portata · data · parole tue (§4, Q4, Q17);
10. **Eredità**: per ogni restituzione `eredita`, una riga con le voci (rif, voce, esito) e, se ha `serve-a` o `converge-con`
    verso un nodo, il suo `estratto` (≤ 25 parole). Così il Progetto non ripropone come nuovo ciò che ottobre aveva già
    proposto (Q3, D19–D21);
11. **Ritorni con effetto**: data · restituzione · voci in breve · le tue parole (D04, D05);
12. **Mondo verificato**: le voci ○ con `esito` già verificate in una risposta, per non rifarle (Q21);
13. **Nomi senza nodo** (A1, A17, Q18): ogni `~Nome` e ogni `rif` di voce, per `chiave`, con i file che lo citano. Quando
    nasce un nodo con la stessa chiave, [S] lo collega qui **nel calcolo** (le restituzioni non si toccano): "Sisifo" trova
    le convergenze dell'Atlante anche se il nodo `sisifo` è nato dopo;
14. **Ricordabili** (la regola unica del §9.3): quanti sono i frammenti ✦ nuovi più vecchi di **60 giorni di calendario** con almeno **10 giorni attivi** in mezzo, e gli **importati ✦ da subito**, con la data-tetto, non delicati, mai ricordati; e **20 id**
    scelti a caso tra i primi per ordine (§6.2), ruotati a ogni rigenerazione (V15: l'elenco intero pesa 10.000 token a un
    anno); i ricordi già usati;
15. **In sospeso**: le domande che le restituzioni ti hanno fatto negli ultimi 30 giorni, da non ripetere (Q29);
16. **Seme già usato**: i nodi su cui una lettera si è già appoggiata al ✧ (C14c); le **immagini già usate** (§9.4);
17. **Voce**: gli indicatori Q (§9.5).

**Il tetto: 80.000 token in tutto** (C7, V2). Con un uso intenso (profilo B) `contesto/` lo supera al quarto mese e
arriva a ~224.000 token in un anno, per l'85% `parole.md`. Quindi:
- `parole.md` è una **finestra mobile dichiarata**: [S] parte dal frammento più recente e va all'indietro finché il totale
  di `contesto/` resta sotto il tetto meno il 10%; formato compatto (una riga per frammento, data corta, niente id). La
  testata dice `tagliato: le parole prima del 2027-08-10 non sono qui`;
- prima della finestra, `parole.md` porta i **periodi**: per ogni mese uscito, una riga di conti (frammenti, temi più
  frequenti) e le 3 frasi ✦ con più reazioni o ritorni, **alla lettera**. È un riassunto deterministico: scelto da [S],
  non riscritto dall'AI;
- l'archivio intero si raggiunge solo da Specchio (o da `cerca` dell'MCP), e l'istruzione del Progetto obbliga a dire
  "prima del 10 agosto non vedo le tue parole: chiedilo in Specchio". **Mai** il recupero muto.

### 6.2 Le definizioni [S]

- **Giorno attivo**: un giorno con almeno un frammento parlante non importato. È l'unità di tutti gli orologi
  (sbiadimento, vicende), perché tu sparisci per settimane e il sistema non deve invecchiare mentre taci (C10).
- **Turno parlante** (chat): come il frammento parlante, turno per turno; "sì", "no", "ok", "grazie", "altre" e simili
  non lo sono (C15b, T04). È il vecchio `intento: niente` per turno, calcolato invece che scritto.
- **Conti**: escludono `canale: importato`, le restituzioni `eredita`, i non parlanti. Le domande (`intento: chiedi`) si
  contano a parte: "hai chiesto tre volte di padri".
- **Vicenda**: ≥ 3 frammenti sullo stesso nodo, tema o parola candidata in **≥ 3 giorni distinti** entro 30 giorni attivi
  (C15c). Una sera di chat vale una volta.
- **Accolta**, **rifiutato**, **sbiadito**: §5.
- **Ritorno spontaneo** (I17): un `nomina` ✦ di un nodo che un tuo frammento ✦ aveva già nominato ("riascoltata la
  cura") conta come ritorno, e pesa più di un voto nelle viste. Contano solo i ritorni ✦ e ●, non quelli su un legame ◌.
- **Ricordabili**: i frammenti ✦ nuovi più vecchi di **60 giorni di calendario** con almeno **10 giorni attivi** in mezzo, e gli **importati ✦ da subito**, con la data-tetto (§9.3). In ordine (I18): prima quelli con una reazione, un `serve-a` o un ritorno spontaneo; mai i delicati.
- **Serie vuote** (I18): se una serie che il ritratto mostrerebbe (gli stati d'animo, una vicenda) è ancora vuota, il
  ritratto lo dice invece di tacere.
- **Vicini** di un frammento: fino a **10** frammenti ✦ con lettura (il seme ✧ no: non è un capo del ponte, §7.5), non delicati, registrati più di 7 giorni prima del
  `registrato` del frammento, che condividono con il frammento un nodo (i suoi candidati, tranne la sola via `nome`: B06) o
  una parola candidata (le `parole` della sua lettura; in `prepara`, dove la lettura non c'è ancora, le chiavi delle parole
  del testo); prima quelli con più cose in comune, a pari merito i più vecchi. **Nei primi 3 giorni** (di calendario, in
  `Europe/Rome`, contati dal giorno del primo frammento non importato, §7.5) in più **tutti** gli importati `voce: sua` non delicati, **oltre** il tetto di 10. [S] li dà nel pacchetto
  di "smista" e, con la stessa regola, a Specchio per un memo **già smistato** (i nodi dalla sua lettura): senza, a memo
  smistati nessuno vede i vicini. È da qui che nasce il ponte inatteso.
- **Data-tetto** di un importato: il `vissuto` della lettura se è una data, con `≤` (`≤2026-10-04`) o senza (`2026-10-04`,
  U22, U23, U28), altrimenti il `registrato`; `parole.md` e ogni risposta usano questa, mai il `registrato` quando c'è il
  `vissuto`; si dice sempre come limite: "entro il 4 ottobre, nell'archivio d'origine" (A4).
- **Ultimo consolida**: la data dell'ultimo commit il cui messaggio comincia con `consolida:`
  (`git log -1 --grep='^consolida:' --format=%cI`); senza, la data dell'importazione. [S] la scrive in `mappa.md`, Stato.
- **Il pacchetto di "smista"** (§2.2, §7.2): il frammento, `recenti.md`, la tabella degli alias, per ogni nome del testo
  (§3.6) i suoi `candidati`, i vicini, gli **scarti** (tutte le righe di `mappa.md` § Scarti; vuoto finché la sezione non
  c'è) e, per ogni link, titolo e autore. È il file `ingresso/.pacchetti/<id>.json`, con le chiavi `frammento` (id,
  percorso, frontmatter, `testo`, allegati), `bozza` (solo per una chat che si sigilla), `recenti`, `alias`, `candidati`,
  `vicini`, `scarti`, `link: [{url, titolo?, autore?}]`. Gli altri memo della stessa passata non ci sono: la sessione ha tutti
  i pacchetti, e la raffica (§8.2) è l'insieme dei pacchetti che elabora.
- **Cammini** tra due nodi (D19 "che cosa collega…"): un frammento che nomina più di 8 nodi (lo sguardo, una lista) vale
  come "stessa lista" e **non** si attraversa (Q9); un frammento che nomina una persona `cerchia: vita` non fa da ponte,
  salvo che la domanda la nomini (Q24).
- **Serie nel tempo** (D10): si contano prima le **tue parole** (ricerca nel testo dei frammenti ✦), poi, a parte, i
  legami dell'AI. Una data in cui è cambiato `letto-da` è segnata "cambio di lettore" (C13).

### 6.3 Le viste

Si calcolano al momento della domanda e non si salvano: la pagina di un nodo (3–5 "porte", cioè i tuoi frammenti più forti
con la data, poi le convergenze, poi il resto per modalità), la linea del tempo (posizioni e stati per mese, con le tue
parole), il ritratto su richiesta, le assenze (D23: al massimo tre, con numeri ✦). Ogni elenco contiene **una voce della
coda lunga**, qualcosa che non rivedi da tempo ([cervello §6](../v2/cervello.md)).

---

## 7. I cicli e i ritmi

### 7.1 La cattura (1 secondo, senza AI)

Il **Comando rapido "Memo"** (iOS; HTTP Shortcuts su Android) scrive il frammento completo (frontmatter compreso) con un
`PUT /repos/{owner}/{repo}/contents/ingresso/<id>.md` (PAT a grana fine, solo quel repository, Contents RW), poi fa il
`fire` della Routine "smista" passando l'id come `text`. Sul telefono: "Salvato". Foto e vocali passano dallo stesso PUT,
con lo stesso id. Se tutto il resto fallisce, il grezzo c'è.

Il **Comando rapido "Chiedi"** fa lo stesso con una domanda (C15e), con in più `intento: [chiedi]` nel frontmatter (il
predefinito; il campo è facoltativo, §3.2), e poi apre il Progetto: la domanda resta anche se la
conversazione del Progetto no.

### 7.2 "Smista" (minuti, asincrono)

Routine con due inneschi: il `fire` e una passata ogni 3 ore (`7 */3 * * *`) che raccoglie i rimasti. Passi (gli attriti
citati **I1–I25** sono quelli della [simulazione dell'ingresso](../v2/simulazione/attriti-ingresso.md)):

1. [S] **attesa e lucchetto** (§8.1);
2. [S] `smista.mjs`: sposta in `frammenti/` **tutto** `ingresso/` (tranne le chat aperte), in ordine di tempo;
   **prima di tutto** ricava da ogni foto la copia ridotta (lato lungo 2000 px, WebP qualità 85) accanto all'originale,
   che resta intatto (I14), con lo strumento di sistema `cwebp` (nessuna dipendenza di Node); se manca, niente copia e un
   avviso; separa i memo del Progetto (§7.3); per ciascun frammento costruisce il pacchetto (frammento,
   `recenti.md`, alias, candidati per ogni nome, vicini, scarti); per i link chiede titolo all'oEmbed e autore alla pagina
   (`og:description`) (I13);
3. [AI] per ciascun frammento, un piano:
   - l'**intento**: `chiedi` solo per un fatto del mondo o dell'archivio; una domanda su di te ("sono la stessa persona di
     5 anni fa?") è `salva`, con al più un `parla-di` ◌ verso una delle 8 domande (I22); se il frammento porta già un
     `intento` (da "Chiedi", §3.2), la lettura lo contiene sempre;
   - i **riferimenti** ("quella di ieri") nella finestra di 3 giorni di calendario più oggi; se non si trovano, nessun
     atto (I11);
   - le **entità** certe (§3.6, con le regole del §3.4 su quando un nodo nasce), la `reazione`, i legami di voce sua e
     mondo, **al massimo 2 proposti** e motivati, nessun tema **dedotto**, `delicato` se serve;
   - "la 3" di un album: una ricerca leggera della tracklist (la pagina dell'album, nessun ID), per poter chiedere
     "La 3 è *ecdysis*, giusto?" (I15);
   - la **risposta** (§7.2.1), **solo se ha contenuto** (C11), **una sola** per una raffica (T01). Altrimenti
     `risposta: salvato` (o `ci-sono` per "boh" e per il delicato);
4. [AI] **la verifica rapida** di una citazione **nuova**, dentro il suo `crea-nodo`, prima di `applica` (I8, V16): una-due ricerche sulla frase così come l'hai scritta. All'ingresso il
   nodo ha solo l'**elenco unico** del §3.4 (`schema`, `nome`, `nato-da`, ed eventuali `alias` e `attribuita-a`): nasce
   **senza `esito`** (⚠, l'ex `prova: memoria`), senza `autore`, `riferimento`, `originale`, `traduzione`, `citata-da` né
   `link`, qualunque cosa trovino: ciò
   che trovano (una scheda di Quote Investigator o Wikiquote, un apocrifo noto) va come traccia nel corpo del nodo e, se
   conta, in una riga della risposta con ⚠; quei campi li scrive solo "consolida"
   (§7.4 passo 3), e sulla citazione soltanto: un'opera nasce già con il suo `autore` (§2.2). L'attribuzione tua va **sempre** in `attribuita-a` (anche un'opera: `~La peste`). Questa è la **regola
   unica** sull'esito all'ingresso (prova a freddo R24/R62): vale per modello, prompt, piano e banco, e `verifica.mjs` la
   accetta. **All'ingresso**, in modo meccanico, vuol dire: un nodo `citazioni/` il cui file è stato aggiunto da un commit
   `smista:` o `specchio:` e che nessun commit `consolida:` ha ancora toccato (`git log --format=%s -- <file>`).
   Unica eccezione voluta: una citazione dell'Atlante che accogli nasce già con `esito` e `riferimento`, perché
   l'importazione fa le veci di "consolida" e quelle citazioni sono già verificate ([correzioni](./07-correzioni-citazioni.md); §14 R7). La verifica **non fa nascere nodi**: l'autore vero o l'opera vera che trova (Hemingway, *Addio alle armi*)
   restano `~Nome` finché non li nomini tu. "Smista" crea temi solo per i concetti che nomini tu (§3.4), mai dedotti (R51);
5. [S] `applica.mjs`: file, slug, numeri, link puliti. È **transazionale** (R69): scrive in una cartella di lavoro, lancia
   `verifica.mjs` e sposta i file al loro posto solo se passa; se no, non resta niente. Il piano arriva da un file scritto
   con lo strumento di scrittura, mai da un heredoc della shell, che perde gli apostrofi (R60);
6. [S] `contesto.mjs`, `verifica.mjs`, commit `smista: N memo` (senza contenuto), push, lucchetto rilasciato.

#### 7.2.1 La risposta all'ingresso

**Che cosa può contenere** (I10): al più **un aggancio** dall'archivio (un ponte forte a un vicino, "ne hai già 3 su
Galimberti") e al più **un fatto del mondo ○**, verificato, che la tua frase chiama (Platone dietro il fiume, Cohen dietro
la crepa): la risposta non perde una convergenza perché ha già un aggancio. Una **correzione di fatto** solo per un errore
scritto da te (B05 sì; B01, dove il titolo è solo incerto, no) (I6).

**L'elenco unico delle domande** (I1). La risposta fa al massimo **una** domanda, e solo in questi casi:
1. un'entità ambigua il cui errore resterebbe per sempre: "La 3 è *ecdysis*, giusto?";
2. un fatto scritto da te che resterebbe sbagliato: "Correggo?" (B05);
3. un link muto: "Che cosa ti ha preso?" (una volta, mai ripetuta);
4. un riferimento che non si risolve: "Me la riscrivi?" (B22);
5. un testo da foto senza fonte: "Da che libro?" (B21);
6. una tensione fresca con lo sguardo, una volta per tema: "È un cambio, o un'altra faccia?" (B20);
7. un frammento delicato può chiudere con "Tutto bene?" (B25), e nient'altro.

Fuori da questi casi, nessuna domanda: né "quanto ti ha colpito", né "vuoi che…". Una domanda senza risposta si chiude
dopo 7 giorni e non si ripete; solo quella su un'entità (caso 1) torna, una volta, nella lettera (I19).

**Le notifiche** (I6, C1a): nessuna per un memo, tranne quando l'intento comprende `chiedi` (hai fatto una domanda dal
telefono e la risposta c'è). Mai per una correzione: sta in `recenti.md` e, se conta, nella lettera.

**La prudenza.** Su un tema delicato (lutto, suicidio, apatia) la risposta è una riga umana, senza proposte, temi o
diagnosi, e non finge che non sia successo niente: B12, B25, "Ci sono", al più "Tutto bene?". La lettura ha
`delicato: true`, che [S] legge e che **cade** quando un tuo frammento ci torna sopra (`ritorna-su`) (I9). Finché vale, il
frammento resta fuori da lettera, ricordo, sogno e ritratto, e la lettera successiva non tocca nemmeno i suoi temi vicini
(Schopenhauer due giorni dopo Cioran), e lo dice nel `perche`. Dopo (Q10): se chiedi esplicitamente le tue parole, i
delicati si riportano alla lettera, mai in testa a un elenco e mai come prova di un tratto ("dopo le 22", "l'amore solo
lì"); nei conteggi si contano, non si nominano; una proposta solo se la chiedi tu, una, prima le tue parole.

**Il "mentre eri via"** (I4, T10). Scatta al primo memo dopo un silenzio **più lungo del doppio del tuo intervallo mediano
tra giorni attivi, e comunque di almeno 14 giorni**: con un ritmo mensile non scatta a ogni messaggio. Il contenuto è
fissato: "consolida" scrive ogni settimana in `riserva/ritorno.md` **una** riga che rimanda all'ultima lettera o
all'ultimo ritratto a cui non hai ancora risposto (nessun tuo frammento ci è tornato sopra); se non ce n'è, il file è
vuoto e il "mentre eri via" **non c'è**. È una riga dentro la stessa `risposta`, mai una forma a sé; mai su un frammento
delicato o con una reazione −; mai un arretrato, mai "bentornato" (T02).

### 7.3 Le domande: il Progetto, con il memo da rimandare, e Specchio

La simulazione delle domande ([attriti](../v2/simulazione/attriti-domande.md)) dice: dal Progetto 69 criteri
passano, 30 male, 1 fallisce; da Code 29/3/0, ma Code costa 4–6 volte il tempo. Quindi **il Progetto è la via di
default**, e Specchio quella per i casi che lo richiedono.

**Il Progetto claude.ai** legge `contesto/` ed è in sola lettura (Q1). Le sue istruzioni obbligatorie:
- se la domanda tocca giorni dopo `aggiornato`, o un riferimento ("quella", "me l'avevi messa") non si trova in
  `contesto/`, dillo prima di rispondere e chiedi il Sync (C2, Q8); una catena resta nella stessa chat;
- se la domanda presuppone una cosa che non hai, correggi la premessa prima di aggiungere mondo (Q32);
- ogni risposta che conta si **chiude con un memo** da rimandare (Q1, Q2): un blocco di testo che tu copi e mandi con il
  Comando rapido "Memo" (un tocco dal foglio di condivisione). Il memo è YAML:

```yaml
memo: chat
turni:                       # le tue frasi di questa chat dall'ultimo memo, con l'ora
  - {ora: "21:04", testo: "canzoni sulla solitudine"}
  - {ora: "21:09", testo: "salvami la terza"}
risposte:
  - turno: "21:04"
    risponde-a: null         # oppure l'id r-… di contesto/ a cui la domanda si riferisce
    voci:
      - {n: 1, rif: "~Radiohead · Exit Music (For a Film)", voce: mondo, cosa: brano, perche: "→ la solitudine come attesa"}
      - {n: 2, rif: "~Mazzy Star · Into Dust", voce: mondo, cosa: brano, perche: "→ …"}
    testo: "…la risposta così come l'hai letta…"
```

  [S] `smista.mjs` lo riconosce dalla prima riga e lo **separa in modo deterministico**: le tue frasi diventano il frammento
  `canale: chat` (una riga `[ora]` per turno), le risposte una restituzione `forma: risposta` con le voci già numerate e il
  `perche` di ogni ◌; la lettura poi scrive i `ritorna-su` (la "terza" con il suo `n`). Le tue frasi le ha ricopiate la
  chat, quindi il frammento porta `forma: riportata`, **salvo** che la stessa domanda sia già arrivata con il Comando
  rapido "Chiedi" (C15e): allora fa testo quella, byte per byte, e il memo aggiunge solo le risposte. Se non rimandi il
  memo, la risposta resta detta in chat e basta: nessun danno, nessun sollecito.

  **Due memo della stessa chat** (stesso id, [prompt v3](./03-prompt-v3.md), appendice B n. 10): il memo successivo
  **sostituisce** il precedente solo se lo contiene come **prefisso**, cioè gli stessi turni e le stesse voci, con turni o
  voci nuovi solo in coda e i numeri `n` continui. Altrimenti [S] `applica.mjs` lo rifiuta e lo mette in coda come
  **conflitto**, che la Specchio successiva ti mostra. Il frammento di chat resta immutabile nel senso del v3: vale l'ultima
  versione completa, e le precedenti restano nella storia di git (l'hash di verifica è quello dell'ultima).

**Specchio** è una sessione Claude Code sul repository (1–2 minuti d'avvio). Ci si va quando (regola della simulazione):
1. la domanda va **verificata sul mondo** con il testo primario ("top quote", "è vera?", i capitoli: Q7);
2. la domanda deve **scrivere** qualcosa che conta (una posizione, una contraddizione, un'accoglienza) e non vuoi
   rimandare il memo;
3. la risposta vive in ciò che `contesto/` non porta (la prosa intera delle restituzioni importate, le letture, i testi
   altrui);
4. il periodo chiesto è uscito da `contesto/` (§6.1, il tetto).

All'apertura, se `ingresso/` ha memo e il lucchetto è libero, Specchio **fa il lavoro di "smista"** (§7.2, con il
lucchetto, un piano `ciclo: smista` e lo stesso commit `smista: N memo`) e ti dice i ponti della giornata (≤ 3 righe per memo): nei giorni 1–7, finché le Routine non sono attive, è l'unico modo in
cui i memo vengono letti. Poi conversa: il frammento di chat cresce in `ingresso/` turno per turno, le risposte in una
bozza accanto (`ingresso/<id>.risposte.md`). Alla fine, con il lucchetto, sigilla **un** frammento e **una** restituzione
per la conversazione. Usa `contesto/` e, per il resto, la ricerca nei file. **I numeri vengono da `mappa.md`: l'AI non
conta.**

**La ricerca espande sempre la domanda** (V4). Una parafrasi ("quella cosa sul segno che mi ha lasciato lo zio") con la
sola ricerca lessicale esce al 318° posto; con 6–10 parole d'espansione scelte dall'AI (sinonimi e parentele: zio,
cicatrice, polso, addosso, pelle) esce prima. Specchio e `cerca` dell'MCP espandono **prima** di cercare, indicizzano anche
le parole di 3 lettere ("zio", "dio", "re") e dicono che la risposta viene da una ricerca.

La memoria di claude.ai va **spenta** nel Progetto (C15f). **Tappa 2, dal secondo mese** (C1c): un connettore MCP
personale (`cerca`, `leggi`, poi `salva`) che fa da sé ciò che oggi fa il memo rimandato.

### 7.4 Le Routine della settimana e del mese

Quattro Routine in tutto: "smista" (§7.2),
"consolida", "lettera", "ritratto". Gli orari hanno minuti sfalsati, come vuole il servizio, e tutti i cron portano
`CRON_TZ=Europe/Rome` (senza, il servizio li legge in UTC). Il prompt di ogni Routine, nell'interfaccia di claude.ai, è
una riga sola: "leggi ed esegui `prompt/<nome>.md`". I prompt veri sono **file del repository** (`prompt/smista.md`,
`prompt/consolida.md`, …): così [S] ne calcola l'hash (`prompt` delle letture, §2.2) e la loro storia sta in
git.

**"Consolida"**, domenica notte (`CRON_TZ=Europe/Rome 13 3 * * 0`). Copre **tutti i frammenti dopo l'ultimo consolidamento riuscito** (la data
la ricava [S] dall'ultimo commit `consolida:` ed è scritta in `mappa.md`, Stato): se una domenica salta, la successiva
recupera tutto, e sceglie comunque **una** cosa sola per la lettera (I5). Gira solo se da allora c'è almeno un frammento
parlante: un "boh niente" non fa partire né consolidamento né lettera. Prende il
lucchetto (se è occupato aspetta, fino a 30 minuti, perché il cron non torna prima di sette giorni). **Una passata**
(CS §1.2), con subagent dal compito piccolo:

0. [S+AI] svuota la coda: un giro di "smista" su `ingresso/` (V10);
1. [AI] rilegge i frammenti della settimana con un campione di **20 vecchi** sugli stessi nodi (partendo da ciò che non
   aggancia niente e da ciò che tocca lo sguardo);
2. [AI] fa nascere i **temi** ricorrenti: una parola candidata che è una vicenda (§6.2) diventa `temi/<tua parola>.md`,
   con `nato-da` uguale ai frammenti-prova; le letture toccate passano a versione nuova;
3. [AI] completa la **verifica delle citazioni** rimaste ⚠ (testo primario, poi traduzione pubblicata; un subagent ogni
   3 citazioni, [citazioni](./08-citazioni.md)): `esito`, `riferimento`, `originale`;
4. [AI] segna `contraddice` dove una posizione nuova urta una vecchia o lo sguardo; riconosce le accoglienze "con altre
   parole" (Karamazov);
5. [AI] applica le correzioni ai nodi (§4) e risolve le tracce in sospeso (B04);
6. [S] `contesto.mjs`: `mappa.md` fresca, con i temi nuovi e le citazioni verificate (la lettera sceglie lì);
7. [AI] prepara le **proposte pronte** (una convergenza, un confronto, un sogno se acceso) e le aggiunge a
   `riserva/pronte.md`, dove restano **in attesa** finché una lettera le consegna o sbiadiscono (30 giorni attivi). Per la
   soglia "≥ 1 parlante e una proposta pronta" contano solo le proposte pronte **da una notte precedente** (S8): quella
   preparata la stessa notte non basta;
8. [AI] scrive la **lettera** della domenica, se la soglia c'è (§9.2), prendendo una proposta pronta: il file nasce qui,
   una volta sola, e la proposta consegnata esce da `riserva/pronte.md`;
9. [AI] riscrive `riserva/ritorno.md`: la riga del "mentre eri via" (§7.2.1);
10. [S] `applica` (piano → file, come per "smista": §2.2), `contesto.mjs`, `verifica.mjs`, commit, push.

`riserva/` è l'unica cartella che si sovrascrive: la scrive solo `applica.mjs`, con le operazioni `riserva` del piano di
"consolida".

**La prima domenica del mese**, in più, la **fusione dei temi** (C8a). [AI] guarda solo l'elenco dei temi (nome, alias,
conteggio, tre frasi d'esempio) e propone le fusioni; [S] `migra/fondi.mjs <da> <in>` riscrive i legami nelle letture
**senza rileggerle**, lascia la lapide e aggiunge il nome fuso agli alias. Niente divisioni scritte: i sottofili di un
tema largo si calcolano al momento della domanda (C8c).

**"Lettera"**, domenica sera (`CRON_TZ=Europe/Rome 37 17 * * 0`). **Non scrive niente**: se "consolida" ha scritto una
lettera, la consegna; **se non c'è** (soglia mancata o "consolida" fallito), la sessione finisce in silenzio, senza
notifica: dalla tua parte non succede niente ([prompt v3](./03-prompt-v3.md), appendice A n. 9).
Il testo della lettera è il **messaggio finale** della sessione (C1b); la notifica, 5–7 parole senza contenuto, dice
"La lettera è pronta". Così il lavoro pesante sta di notte e la lettura arriva di sera.

**"Ritratto"**, il primo del mese (`CRON_TZ=Europe/Rome 7 9 1 * *`). Decide da sé se tocca a lui: **mensile nei primi tre mesi** (la
ricompensa deve arrivare presto), poi **trimestrale**. Con l'inizio a novembre: 1 dicembre, 1 gennaio, 1 febbraio, poi
1 maggio, 1 agosto, 1 novembre. Prende il lucchetto, rigenera `contesto/`, scrive il piano del ritratto (§9.2), `applica`, rigenera `contesto/`.

### 7.5 La prima settimana (il nucleo minimo vitale)

Prima della pipeline, una restituzione vera (CS §4):

| giorno | che cosa |
|---|---|
| 0 | Claude Code: repository privato, importazione (§14), `smista.mjs`, `verifica.mjs`, `CLAUDE.md`. Tu: repo, App GitHub, PAT, Comando rapido **solo PUT** (~20 minuti) |
| 1 | **il primo ritratto**, sul nucleo e sulle 31 frasi tue, con **una** convergenza nuova ancorata a una tua frase |
| 1–3 | cattura cieca; **ogni sera** (e così fino al giorno 7) apri Specchio, che fa "smista" e ti dice i ponti della giornata (al massimo uno per memo, solo se forte). Anche se i memo sono già stati smistati, Specchio non risponde "nessun memo nuovo": rilegge i memo dal giorno 1 e cerca il ponte |
| 3 | **il bilancio dei ponti**: Specchio rilegge **tutti** i memo dei giorni 1–3, con i loro vicini dati da [S] (§6.2), e chiude con il migliore dei ponti **forti** (sotto), oppure con "Niente si aggancia ancora." e nient'altro. È la prova della meraviglia: un ponte inatteso e forte, con il tuo frammento vecchio e la data (la frase alla lettera, o per un testo trascritto il gesto e le parole ○: sotto), oppure la franchezza di dire che non c'è; nessun ponte particolare è dovuto |
| 4–7 | Specchio ogni sera, come nei giorni 1–3, finché le Routine non sono attive; al giorno 7 (o prima, se l'apertura serale pesa) si attivano il `fire` e le Routine, e la domenica parte la prima lettera |

**Il ponte dei primi giorni** (decisione di progetto, [prova di restituzione](../v2/simulazione/attriti-restituzione.md) A2):
- nei primi 3 giorni i **vicini** di un memo (§6.2) comprendono **tutti** gli importati ✦, non solo quelli che condividono
  un nodo, e li dà [S] anche a memo già smistati: un testo senza parole in comune con il memo (per B01, il monologo di
  Rust, u19) deve poter essere **tra i vicini**. È la condizione di un ponte, non un ponte dovuto: nessun documento
  prescrive un ponte particolare (la provenienza viene prima della meraviglia);
- un ponte si consegna solo se è **forte** e ha un **luogo preciso** da entrambe le parti: la tua frase con la data, e per
  un ○ l'opera e il passo. Un ○ senza luogo non si consegna mai. **Forte** ha una sola definizione, le domande 2 e 3 del
  giudice di R14 nel [banco](./04-banco-di-prova.md) (la riga "Forte" sotto il giudice): il nesso si vede già
  dalle due frasi, coprendo il perché ◌, e non è forzato. In Specchio lo giudicano, prima della consegna, tre subagent che
  vedono solo le due frasi (`prompt/specchio.md`);
- il **capo vecchio** di un ponte (in Specchio, nel bilancio del giorno 3, nel ritratto) è un tuo frammento del punto zero o di un giorno prima: una tua frase ✦ alla lettera
  con la data (per un importato la data-tetto), oppure un frammento `altrui` (sotto). **Il seme ✧** (`s01`, `s03`, `s04`)
  **non** è un capo del ponte: è una sintesi scritta da Claude, e un ponte verso di lui accosterebbe una tua frase alle
  parole di Claude;
- **un testo altrui che hai trascritto** (`altrui: true`, u18–u20) può essere il capo vecchio di un ponte: il capo ✦ è il
  **gesto** ("hai trascritto il monologo di Rust", con la data-tetto), le parole stanno tra «» con ○, al più una riga,
  **alla lettera nella lingua in cui le hai trascritte**, con l'opera e il passo (*True Detective*, st. 1, ep. 1). Non si
  scarta perché non ha una frase tua;
- meglio una formula che un ponte forzato: "Nessun ponte oggi." la sera dei giorni 1–2 e 4–7, "Niente si aggancia
  ancora." al bilancio del giorno 3; una sola, mai le due insieme.

Le prove del banco da far passare per prime: **B01–B02** (Galimberti), **B06** (Marco non è Marco Aurelio), **D02** (solo
le mie).

### 7.6 Il quadro dei ritmi

| quando | che cosa | dove lo leggi (tappa 1) | soglia |
|---|---|---|---|
| a ogni memo | "Salvato." | telefono | — |
| pochi minuti dopo | la risposta, se ha contenuto; **una sola** per una raffica | nel Progetto (`recenti.md`) o in Specchio; i ponti forti anche nella lettera | C11 |
| al primo memo dopo un silenzio lungo (> 2 × il tuo intervallo mediano, ≥ 14 giorni) | il "mentre eri via": la riga di `riserva/ritorno.md`, preparata dall'ultimo "consolida" prima del silenzio e non rigenerata; se è vuota, niente | nella risposta | — |
| domenica sera | la lettera | messaggio finale di "lettera" + notifica | ≥ 2 frammenti parlanti dall'ultima lettera, o ≥ 1 e una proposta pronta |
| il primo del mese (mesi 1–3), poi ogni tre mesi | il ritratto | come la lettera | ≥ 10 frammenti parlanti nel mese, ≥ 20 nel trimestre |
| una volta al mese al più | il sogno, dentro la lettera | lettera | ≥ 50 frammenti parlanti in tutto |
| quando chiedi | tutto | il Progetto, con il memo da rimandare; Specchio per verificare o scrivere (poi MCP) | — |

---

## 8. Concorrenza

### 8.1 Il lucchetto

Le raffiche sono il modo naturale in cui scrivi (Galimberti alle 23:40, "ah e…" tre minuti dopo): due `fire` aprono due
sessioni in parallelo (C6). La regola: **l'ultima sessione vince, e una sola lavora**.

1. [S] Una sessione nata da un `fire` aspetta **90 secondi**, poi `git pull`. La passata delle 3 ore, Specchio e le
   Routine a orario non aspettano: fanno subito il `pull`.
2. [S] Se in `ingresso/` c'è un memo **più recente** di quello del suo `fire` (contano solo i file `canale: telefono`; non
   le chat aperte, le bozze o `.in-corso`) **e con meno di 4 minuti**, esce: lo elaborerà la sessione di quel file. Se
   quel memo è più vecchio (il suo `fire` è fallito), procede lei (V1). Il Comando rapido ripete il `fire` su un errore
   HTTP. (La passata delle 3 ore, Specchio e le Routine a orario non escono mai per questo motivo.)
3. [S] `lucchetto.mjs prendi`: se `ingresso/.in-corso` esiste ed è più giovane di **20 minuti**, **aspetta**: "smista" fino
   a 45 minuti, con un `pull` al minuto (V10, da verificare sui limiti delle Routine); "consolida" e "ritratto" fino a 30.
   Altrimenti scrive `ingresso/.in-corso` (YAML: `ciclo`, `sessione`, `ora`, `gettone`) con il ciclo, l'id della sessione,
   l'ora e un **gettone** (un numero che cresce:
   l'ultimo che compare nella storia git di `ingresso/.in-corso`, anche dopo un `lascia` che l'ha cancellato, + 1; senza
   storia, 1) e fa **commit e push**. L'id della sessione sono 8 caratteri `[a-z0-9]` casuali che `prendi` sceglie e
   stampa con il gettone, e scrive anche in `.git/lucchetto` (locale, mai committato); `rinnova` e `lascia` li ricevono come
   argomenti (`--sessione ID --gettone N`) o, senza, li rileggono da `.git/lucchetto`. Ogni tempo del lucchetto, negli script e nelle
   loro opzioni (`--aspetta`), si scrive in **secondi** (45 minuti = `2700`). Il push è l'arbitro: se fallisce perché un altro ha spinto prima, `pull`,
   rilegge il lucchetto e aspetta.
4. Lavora. [S] Ogni 10 minuti, e tra un passo e l'altro di "consolida", **rinnova** il lucchetto. **Fencing** (V12): al
   rinnovo e prima di ogni push, dopo il `pull`, `.in-corso` deve portare ancora il **proprio** id e gettone; se no, un
   altro l'ha preso (la sessione era rimasta ferma più di 20 minuti) e questa **abbandona senza spingere**. [S] rifiuta
   ogni commit di lavoro il cui gettone non è quello del lucchetto.
5. [S] Prima di rilasciare, `pull`: se nel frattempo sono arrivati memo, li elabora (al massimo 3 giri, poi li lascia
   alla passata delle 3 ore, che non perde niente).
6. [S] `lucchetto.mjs rinnova` un'ultima volta, dopo il `pull` (è lì il fencing del punto 4), poi `lucchetto.mjs lascia`:
   cancella `.in-corso` nello stesso commit del lavoro e spinge.

Un lucchetto più vecchio di 20 minuti è di una sessione morta: si prende, e la passata delle 3 ore cancella quelli
orfani. Il lavoro della sessione morta non era stato spinto, quindi non c'è niente da riparare. Se "consolida" non
prende il lucchetto entro 30 minuti, ritenta con il suo secondo orario (`CRON_TZ=Europe/Rome 13 9 * * 0`), che gira solo se quello delle
03:13 non è riuscito.

### 8.2 Idempotenza

Elaborare due volte non fa danni [S]:
- un frammento **senza lettura** è la coda. `prepara` salta ciò che ha già una lettura;
- `applica` non crea un nodo se lo slug esiste: aggiunge l'alias;
- una restituzione `risposta` è unica per il suo `per`: se esiste già, il piano viene scartato. Una raffica ha **una** risposta, con
  `per` l'ultimo e `copre` gli altri (T01). Raffica (V13) = tutti i memo elaborati dalla **stessa sessione**, in tutti i
  suoi giri. Tra due sessioni: se esiste già una risposta con `per` a meno di 10 minuti, la sessione dopo non ne scrive
  un'altra (la restituzione è immutabile, `copre` non si aggiorna): la lettura punta alla risposta esistente;
- una chat ha **un** frammento e **una** restituzione; se Specchio muore, il primo "smista" dopo le 04:00 del giorno dopo
  li sigilla dalla bozza in `ingresso/` (V3).

### 8.3 Chi scrive che cosa

| file | lo scrive | quando |
|---|---|---|
| `ingresso/<id>` e le bozze di chat | Comando rapido (anche il memo del Progetto), Specchio | sempre, senza lucchetto (file nuovi o propri) |
| `frammenti/` | "smista" o Specchio che ne fa il lavoro (sposta, sigilla) | con il lucchetto |
| `letture/` v1 | "smista", o Specchio quando ne fa il lavoro | con il lucchetto |
| `letture/` v≥2 | "consolida", migrazioni | con il lucchetto |
| nodi: creazione, alias; i temi solo se li nomini tu (✦), e nascono subito | "smista" | con il lucchetto |
| temi dedotti (◌) | "consolida" | alla 2ª–3ª ricorrenza, cioè a una vicenda (§6.2), con il lucchetto |
| nodi: ogni altro campo, lapidi | "consolida", migrazioni | con il lucchetto |
| `restituzioni/` `risposta` | "smista"; Specchio per la chat | con il lucchetto |
| `restituzioni/` `lettera` | "consolida" ("lettera" la consegna e basta) | con il lucchetto |
| `restituzioni/` `ritratto` | "ritratto" | con il lucchetto |
| `riserva/ritorno.md`, `riserva/pronte.md` | `applica.mjs`, dal piano di "consolida" | con il lucchetto |
| `taratura/` | `migra/tara.mjs` | con il lucchetto, a ogni cambio di lettore |
| `contesto/` | `contesto.mjs` | solo alla fine di una sessione con il lucchetto |

I messaggi di commit non portano contenuto ("smista: 2 memo", "consolida: settimana 45"): la cronologia di git si vede
anche da notifiche e strumenti esterni.

---

## 9. La restituzione e la voce

Le regole di stile intere sono in [voce](./10-voce.md); qui quelle che il modello deve garantire.

### 9.1 Le regole di forma (valgono per tutto)

Dalle prove di [restituzione](../v2/restituzione.md) e da [voce](./10-voce.md):
- ogni pezzo parte da una **tua frase ✦ con la data**; le tue parole sono **in corsivo**, alla lettera; le date degli
  importati si dicono come tetto: "entro il 4 ottobre, nell'archivio d'origine" (la data vera non si sa: A4);
- le parole **d'altri** che hai trascritto (un monologo, una citazione, una pagina fotografata) vanno tra «», mai in
  corsivo, al più una riga, con ○: il **gesto** di trascriverle e il tuo commento sono ✦, le parole no (B21; lettura
  `altrui: true`, §3.3);
- le formule dell'AI sono in tondo, anche quando le hai accolte (●): mai in corsivo, mai tra «»;
- i **titoli** di opere (libri, film, album, brani) vanno in corsivo, come nell'uso editoriale (*Il mondo delle emozioni*,
  B01): un titolo non porta ✦ e non è una frase tua; i controlli sulle tue frasi guardano i tratti in corsivo segnati ✦ o
  che si ritrovano nei frammenti;
- un passo del **seme ✧** citato alla lettera va in corsivo, con ✧ e mai con ✦ (voce mista, §5): è l'unica formula scritta
  da Claude che si mostra in corsivo;
- il segno sta accanto alla frase; la legenda, in una riga, solo nelle forme lunghe (lettera, ritratto);
- il vuoto è un dato ("nessuna canzone tua", "nessun perché");
- una convergenza ha una **direzione**: le fonti dicono cose diverse sullo stesso legame, non la stessa cosa tre volte;
  una convergenza banale non si dice;
- il mondo si verifica prima, o si dichiara ⚠; nel confronto **mai** ⚠: si usano solo voci verificate. **Un ○ senza
  luogo non passa** (S7, controllo [S] in `verifica.mjs`): ogni voce `mondo` di una lettera o di un ritratto ha un
  `riferimento` con l'opera **e** il passo (capitolo, pagina, minuto, traccia); in una risposta, `riferimento` oppure il ⚠
  sulla stessa riga; e ogni ○ del corpo rimanda a una voce numerata. Altrimenti il piano torna all'AI;
- **nessuna domanda**, tranne: il confronto (una, in fondo), il ritratto (una, che non ripete una domanda "in sospeso"),
  e all'ingresso i 7 casi dell'elenco unico (§7.2.1). Mai un sollecito, mai "torna", mai "bentornato" (principio 10);
- niente lodi, niente diagnosi, niente frasi fatte, niente testi di canzoni;
- al più **un ◌ per lettera**: una sola proposta forte.

**Le lunghezze** ([voce §3](./10-voce.md)): risposta a un memo "Salvato." più 0–2 righe (≤ 40 parole; "Salvato."
da solo è una risposta completa, e non lascia file: C11); risposta a una domanda fino a 150 parole, tolte le tue frasi citate alla lettera (il minimo di 50 solo con ≥ 3 voci ✦;
"vuoi il resto?" solo se il resto c'è); un elenco delle tue frasi (D02) si misura in righe: al più 8 righe ✦, più la riga
✧ e "Vuoi il resto?";
lettera ≤ 250; ricordo 2–3 righe; sogno ≤ 120; confronto ≤ 150; ritratto ≤ 400; "mentre eri via" una riga; Specchio ≤ 3 righe per
memo; notifica 5–7 parole.

### 9.2 Le forme

| forma | quando | che cosa contiene | soglie e limiti |
|---|---|---|---|
| `risposta` | all'ingresso, a una domanda, a una chat | 1–2 righe; un aggancio, una correzione, o la risposta con voci numerate | solo se ha contenuto (C11); una per raffica (T01) |
| `lettera` | scritta da "consolida", consegnata domenica sera | **una** cosa tra convergenza, confronto e sogno; i ponti della settimana (≤ 2: "martedì, salvando Galimberti, ho visto Rust"); al massimo **un ricordo** | parte con **≥ 2 frammenti parlanti** dall'ultima lettera consegnata, **oppure ≥ 1 e una proposta pronta** in `riserva/pronte.md`; altrimenti slitta, senza notifica e senza niente da vedere, e la proposta resta in attesa (C3 ammorbidita: con 3 la lettera mancava 6 volte su 9, [prova di restituzione](../v2/simulazione/attriti-restituzione.md) A1) |
| `ritratto` | il primo del mese nei mesi 1–3, poi ogni tre mesi | che cosa torna, che cosa è nuovo, che cosa è sparito, **che cosa manca**, una tensione, **una** domanda; una riga sulla voce (§9.5) | ≥ 10 frammenti parlanti nel mese (≥ 20 nel trimestre), altrimenti slitta; la riga sulla voce sta **prima** della domanda, che chiude (M2) |
| `eredita` | importazione | le convergenze e le idee dell'Atlante | fuori dai conti, mai rilanciate |

**Il primo ritratto** (giorno 1) è la prima restituzione del sistema, prima del primo memo (§7.5).

### 9.3 Il sogno, il ricordo, il confronto

- **Il sogno**: un solo legame lontano e ardito. Si apre con "Gioco ◌." seguito subito dalla tua frase ✦; il motivo in
  una riga, un colpo di coda che rovescia la tua formula (la *Colonia penale* di Kafka contro la pelle che scrive); al più
  **un** fatto ○ verificato (M6). È **spento sotto i 50 frammenti parlanti** (C5; gli importati non contano): con meno
  materiale pescherebbe per forza nel seme. Poi al massimo **uno al mese**, a turno con convergenza e confronto.
- **Il ricordo** ("ti ricordi?") apre con un **indizio parziale** (l'inizio della tua frase, la data) e subito dopo dà
  l'**affermazione completa**: la frase intera e una riga d'oggi che dice perché torna adesso. Non è un quiz e non aspetta
  risposta (C4): l'indizio è solo il tempo di un respiro. **La regola unica** (S2, uguale nel modello e nei
  prompt): sono ricordabili solo i frammenti **✦**, non delicati, mai ricordati prima: gli **importati ✦ da subito**, con
  la data-tetto ("entro il 4 ottobre, nell'archivio d'origine"), e i frammenti nuovi più vecchi di **60 giorni di
  calendario** con almeno **10 giorni attivi** in mezzo. Con i soli giorni attivi (C10) il primo ricordo di un uso normale
  cadeva in primavera, o mai nel primo anno. [S] li elenca in `mappa.md`; [AI] sceglie. Al massimo uno per lettera. Una
  domenica senza frammenti parlanti resta **muta per scelta**: il ricordo non fa partire una lettera da solo.
  > A inizio ottobre, nell'archivio d'origine, scrivevi: *la dimensione principale…* — *la dimensione principale della
  > realtà è il dolore* ✦ (entro il 4 ottobre). Questa settimana, con Sisifo, hai scritto *stasera sto bene* ✦.
- **Il confronto**: mette due tue frasi una accanto all'altra e ti oppone una voce che stimi, **dall'altra parte** della
  frase nuova; rispettoso, senza sconti, una domanda in fondo. Nasce da un `contraddice` **fresco** (scritto dopo la
  lettera precedente). La voce contro può essere un nodo verificato o una voce ○ verificata nella sessione (M7). Un
  `ritorna-su … come: rifiuta` non genera `contraddice` per 60 giorni sullo stesso legame (M8).

**Altre regole di voce dalla prova di restituzione.**
- Le parole d'altri **che ricordi** a memoria (una citazione nel tuo memo) sono tue: ✦ in corsivo, nella versione in cui
  le ricordi; il testo verificato accanto è ○ tra «». `altrui: true` vale solo per le trascrizioni (foto, copia) (M5).
- Una resa mia di un testo verificato è ○, con "resa mia" accanto.
- Le righe di servizio ("Ci sono.", "Vuoi il resto?", un conteggio) non portano segni.
- I delicati contano per la soglia della lettera, ma la lettera lo sa: niente "questa settimana" che li evochi; ≥ 2
  delicati in 7 giorni fanno un periodo delicato, che vale per tutta la sessione (M9).
- La risposta a una domanda è **fino a** 150 parole: il minimo di 50 vale solo con ≥ 3 voci ✦; "vuoi il resto?" solo se
  il resto c'è (M1).

### 9.4 La colonizzazione: le parole di chi?

La voce dell'AI entra da tre porte (C14). Le chiusure:
1. **Il seme si consuma** [S+AI]: una lettera si appoggia al ✧ **una volta per nodo** (`mappa.md`, "seme già usato"); dopo,
   solo al ✦. Mai due lettere di fila sullo stesso nodo d'appoggio importato.
2. **Il ● non è un passaporto**: §5.
3. **Niente ritornelli** [S+AI] (V5): un ritornello è una coppia di **2 parole di contenuto** entro una finestra di 4
   parole del testo vero ("chi apre la porta", "il fuoco che resta"), fuori dalle «», presente in ≥ 3 restituzioni e
   assente dai frammenti ✦. `verifica.mjs` rifiuta una restituzione nuova che lo farebbe comparire per la terza volta. Con
   3 parole di contenuto ne trovava 2 su 6 e dava 8 falsi; così 6 su 6 e nessun falso. In più `mappa.md` elenca le **immagini già usate** (parole di contenuto rare, nate in una restituzione
   e assenti dai ✦), **per lemma**, e l'AI le evita da sé (R03); una parola tua resta libera solo dentro la tua citazione (M12).

### 9.5 La misura della voce

[S] `contesto.mjs` calcola in `mappa.md` (è il `voce.mjs` del banco), e il ritratto ne porta una riga:

| indicatore | come | soglia |
|---|---|---|
| **Q-nomi** | ogni tema ha il `nome` (minuscolo, prefisso di 5 lettere) in almeno **2** frammenti ✦ o ✧ **anteriori** alla prima restituzione che usa la parola (V7), o in tutti i suoi frammenti-prova se ne ha uno solo (un concetto nominato una volta, A9); esenti i temi nati da un'accoglienza (A14) | 100%: è un errore di verifica |
| **Q-citato** | % di caratteri di lettere e ritratti del **trimestre** in corsivo e segnati ✦ (non della singola lettera: una lettera con Camus tra «» scende da sola al 15%, M4) | ≥ 35% |
| **Q-ancore** | tra i frammenti vecchi citati dalle lettere del trimestre, % ✦ contro ✧; solo con ≥ 15 ancore (V16) | ✦ > 50% dal sesto mese |
| **Q-eco** | % di **frammenti** ✦ del mese che contengono una parola nata in una restituzione e comparsa dopo in un tuo frammento, escluse le parole della **base lessicale** (V6): le ~10.000 forme più frequenti dell'italiano più il tuo lessico ✦ e ✧ di prima, in un elenco versionato | allarme sopra il 10% o al raddoppio; si mostra: "parole che hai preso da me: *convergenza*, *lucidità*" |
| **ritornelli** | coppie di 2 parole di contenuto entro 4 parole, in ≥ 3 restituzioni, assenti dai ✦ (§9.4) | 0 |
| **Q-contesto** | parole di contenuto di `contesto/ritratto.md` e dei nomi di `mappa.md` assenti dai frammenti ✦ o ✧ **anteriori** alla prima restituzione che le usa (V7) | ≤ 30% (soglia del banco, T07) |

---

## 10. Privacy

- **Il repository è privato.** L'Atlante resta pubblico e intatto; nel nuovo ci sono persone della tua vita, lutti,
  pensieri delicati (B12, B25).
- **Persone della vita** (`cerchia: vita`): niente `link`, niente temi proposti, mai fuse con un autore, **mai** in una
  ricerca web né in una chiamata esterna. Le ricerche (citazioni, oEmbed, titoli) partono solo da nomi `mondo` e da URL che
  hai mandato tu.
- **Delicato**: fuori da lettera, ricordo, sogno e ritratto finché non ci torni tu con un frammento che lo riprende;
  marcato in `parole.md`; mai citato spontaneamente.
- **Notifiche senza contenuto** ("La lettera è pronta"), perché lo schermo bloccato è pubblico. Ripiego: Pushover; ntfy no
  (topic pubblici).
- **Credenziali**: PAT a grana fine su quel solo repository, Contents RW, scadenza annuale; il token del `fire` vale solo
  per quella Routine. Nessuna credenziale nei file.
- **claude.ai**: la memoria spenta nel Progetto; da controllare l'opzione sull'uso dei dati per l'addestramento.
- **Immagini**: solo tue (foto, schermate tue, vocali); i pin restano link.
- **Uscita**: tutto è markdown e YAML in un repository git; si porta via con un `clone`.

---

## 11. Migrazioni ed evoluzione dello schema

- **`_schema.md`** alla radice, creato al giorno 0 (R9): il numero di versione (oggi **3**), un rimando a
  `schema/frontmatter.json`, che contiene lo schema JSON del §3.7 per esteso (e accanto `schema/piano.json`, §2.2), e la
  storia delle migrazioni, vuota al giorno 0: una riga per migrazione, `- AAAA-MM-GG · NNN · che cosa cambia`. Lo schema non si copia in `_schema.md`: una sola fonte.
  Il campo `schema: 3` sta in ogni lettura, nodo e restituzione (C12a).
- **Il frammento non ha `schema`**: il suo formato è congelato per sempre (`registrato`, `canale`, testo; per l'importato
  `voce` e `forma`). È la scelta che regge cinque anni.
- **Migrazioni meccaniche** [S] (rinominare un campo, spostare una cartella, fondere due temi): `scripts/migra/NNN-nome.mjs`,
  idempotenti, lanciate una volta, un commit "migrazione NNN", **senza AI** (C12b).
- **Migrazioni semantiche** [AI] (un genere nuovo, per esempio `luoghi/`): si rileggono solo i frammenti trovati da una
  ricerca testuale, non l'archivio intero (C12c).
- **Riletture in parallelo** (C12d): gli atti puntano a id stabili, quindi le letture si rifanno in qualunque ordine. Le
  risoluzioni dell'ingresso ("quella di ieri" → id) e i legami accolti passano al lettore nuovo come **vincoli**: vince
  l'atto.
- **Cambio di lettore** (C13, V9): quando cambia il modello **o** il prompt (`letto-da`, `prompt`), una **taratura**.
  Il campione è **stratificato per tema** (≥ 20 frammenti per ogni tema che ne ha ≥ 30), riletto dal lettore nuovo su un
  branch a parte; [S] `migra/tara.mjs` conta la frequenza dei predicati per tema con i due lettori e scrive
  `taratura/AAAAMMGG.md` (frequenze, scarto, decisione), citato da `mappa.md`. Scarto > 20% su un tema che compare nelle
  serie: si rileggono tutte le letture di quel tema, come migrazione semantica con il lucchetto, a lotti di 20 frammenti
  per subagent. Altrimenti la data della taratura si segna "cambio di lettore" nelle serie. Tetto dichiarato: ~1 M token.
- **Come entra un campo nuovo**: solo quando una domanda vera fallisce senza (un caso del banco o della vita), scritto nel
  registro (§15) con la prova. Ogni campo di una lettura si può aggiungere dopo rileggendo; frammenti e restituzioni no.
- **Dipendenze in anteprima** (il `fire` con `experimental-cc-routine-2026-04-01`, le notifiche, il Sync): se una cade, la
  cattura regge comunque (il PUT è GitHub puro) e la passata delle 3 ore raccoglie l'ingresso.

---

## 12. Deterministico e giudizio

| lavoro | chi | perché |
|---|---|---|
| scrivere il frammento e il suo nome | [S] Comando rapido | principio 1: un LLM che ricopia "chioran" lo corregge |
| spostare in `frammenti/`, hash | [S] | idem |
| pulire i link, normalizzare i pin, oEmbed | [S] (l'AI solo se oEmbed fallisce) | è una regex e una chiamata |
| slug, collisioni, lapidi, fusioni eseguite | [S] | "la stessa cosa, lo stesso nome" |
| alias: ricerca esatta e candidati | [S] | |
| alias: scegliere tra i candidati, "è lo stesso?" | [AI] | è un giudizio |
| numerazione delle voci | [S] | "la terza" deve essere stabile |
| accolta, rifiutato, sbiadito, vicende, conti, giorni attivi, ricordabili, soglie, Q | [S] | l'AI che conta inventa (D10, D11) |
| lucchetto, attesa, idempotenza | [S] | |
| schema, immutabilità, ritornelli, budget | [S] | |
| intento, entità, reazione, legami, `delicato`, `parole` | [AI] | giudizi, scritti come dati |
| riconoscere un'accoglienza con altre parole | [AI] | lo script vede solo legami identici |
| far nascere un tema, proporre una fusione | [AI] | |
| verificare una citazione | [AI] + ricerca | |
| scegliere il ricordo, la forma della lettera, il sogno | [AI] su `mappa.md` | nessuna formula tarata su zero dati |
| scrivere ogni prosa | [AI] | |

---

## 13. Il caso Galimberti, dall'inizio alla fine

### 13.1 Prima: il punto zero

Dall'importazione (§14) esistono già: il frammento-sguardo `20261005-0000-s01` (il nucleo, ✧), che fa nascere il tema
`nichilismo` ("non nichilismo: accettare il peso"); il frammento `20261004-0000-u19` (il monologo di Rust trascritto da te: ✦ il gesto, ○ le parole, in
inglese) con il nodo `rust-cohle` e `true-detective-s1` (`momento: "episodio 1"`, il luogo del ○: §14.1). Nessun nodo Galimberti, nessun Nietzsche se lo sguardo non lo nomina (da verificare nell'eredità):
nei campi si scrive allora `~Friedrich Nietzsche`.

### 13.2 Martedì 3 novembre, 23:40: la cattura

> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite
> inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

1. Il Comando rapido scrive `ingresso/20261103-2340-k7q2.md` (il frammento del §3.2) e fa il `fire`. "Salvato" in un secondo.
2. 23:40 + 90 s: la sessione fa `pull`; nessun file più recente; prende il lucchetto (push di `ingresso/.in-corso`).
3. `prepara`: `git mv` in `frammenti/2026/11/`; il pacchetto: i candidati per "galimberti" (nessuno: nuovo), per "spettacolo
   sulle emozioni" (nessuno), per "nichilismo" (`nichilismo`, esatto); i vicini (`s01`, che condivide
   `nichilismo`, e, perché è il giorno 1, tutti gli importati ✦, fra cui `u19`: §6.2, §7.5).
4. Il piano dell'AI (§2.2): tre nodi nuovi (lo spettacolo nasce con il nome che gli dai tu: l'identità è certa, è il
   titolo vero a essere incerto, e va negli alias quando lo confermi), quattro legami ✦, la reazione, le parole `ragazzo` e `cultura`, la risposta.
   Dentro il `crea-nodo` della citazione, la verifica rapida (§7.2 passo 4): nessun apocrifo noto, la traccia va nel
   corpo del nodo, nessun `esito`.
   L'AI vede il ponte con Rust ma lo giudica **non forte** a caldo (il legame c'è solo per una parola): lo tiene per la
   lettera, che lo porterà solo se è forte (§7.5).
5. `applica`: la lettura del §3.3, `persone/umberto-galimberti.md`, `opere/spettacolo-sulle-emozioni.md`,
   `citazioni/il-nichilismo-e-l-ospite-inquietante.md` (§3.4, la versione d'ingresso: senza `esito`, ⚠), e la risposta:

```md
---
schema: 3
forma: risposta
letto-da: <modello>
registrato: 2026-11-03T23:41:05+01:00
per: 20261103-2340-k7q2
voci:
  - {n: 1, rif: il-nichilismo-e-l-ospite-inquietante, voce: mondo, cosa: citazione, riferimento: "Frammenti postumi, 2[127] (da verificare)"}
  - {n: 2, rif: spettacolo-sulle-emozioni, voce: mondo, cosa: opera}
---
**Salvato.**
1. "L'ospite inquietante" è un'immagine di Nietzsche ○, che Galimberti ha ripreso in un libro ⚠.
2. Lo spettacolo forse è *Il mondo delle emozioni* ⚠.
```

6. `contesto.mjs`; commit `smista: 1 memo`; lucchetto rilasciato; push. Tempo stimato: 3–5 minuti.
   **Nessuna notifica** (C1a): la risposta la vedi nel Progetto (`recenti.md`) o in Specchio, se li apri.

### 13.3 La raffica (variante)

Se l'"ah e…" fosse arrivato alle 23:43, il secondo `fire` avrebbe aperto una seconda sessione. La prima, al risveglio dopo
90 s, avrebbe trovato in `ingresso/` un file più recente del suo ed **esce**. La seconda elabora entrambi in ordine: la
lettura dell'"ah e…" vede già il frammento delle 23:40 e risolve "la frase dell'ospite" senza fatica. Un solo push, un solo
`contesto/`.

### 13.4 Mercoledì 4 novembre, 08:12

> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

```yaml
# letture/2026/11/20261104-0812-b3n8.md (estratto)
intento: [salva]
legami:
  - {p: ritorna-su, a: 20261103-2340-k7q2, come: aggiunge, voce: sua, perche: "«la frase dell'ospite era verso la fine»"}
  - {p: nomina, a: il-nichilismo-e-l-ospite-inquietante, momento: "verso la fine", voce: sua, perche: "«era verso la fine»"}
parole: [greci]
risposta: salvato
```

Nessun file di risposta (C11): "Aggiunto allo spezzone di ieri" non ha contenuto. Il frammento del 3 non si tocca.

### 13.5 Domenica 8 novembre: la prima lettera

Frammenti parlanti della settimana: E01, E02 e Sisifo felice di giovedì 5 ("stasera sto bene"): 3, la soglia c'è. Il sogno è
spento (meno di 50). Ricordabili: solo gli importati ✦, e la lettera non ne usa (ha già due ponti). "Consolida", alle 03:13, verifica la citazione
(testo primario: il frammento postumo; `esito: simile` se la frase di Galimberti è una parafrasi dell'immagine di
Nietzsche), scrive la lettera e riscrive `riserva/ritorno.md`. Alle 17:37 "lettera" la consegna. (Un esempio di forma, non
un esito dovuto: il ponte con Rust entra nella lettera solo se è forte, §7.5; se le due frasi non lo reggono da sole, la
settimana dice soltanto Sisifo.)

> **La settimana.** Martedì, salvando Galimberti, ho visto Rust. Tu hai scritto *diceva che il nichilismo è l'ospite
> inquietante* ✦ (l'immagine è di Nietzsche ○); entro il 4 ottobre avevi trascritto il monologo di Rust ✦, «I think human
> consciousness is a tragic misstep in human evolution» ○ (*True Detective*, st. 1, ep. 1). Nel tuo nucleo c'è *non nichilismo: accettare il peso, non nascondermi* ✧.
> Giovedì, con Sisifo: *stasera sto bene* ✦.
> 1. Chi apre la porta all'ospite, chi la chiude, chi lo guarda sedersi ◌.
>
> ✦ tue · ✧ seme · ◌ mia · ○ mondo

La notifica dice solo "La lettera è pronta". `mappa.md` registra: seme usato su `nichilismo` (la prossima lettera non potrà
appoggiarsi di nuovo al nucleo per questo nodo); "porta" e "chi apre la porta" entrano tra le immagini già usate, e la
formula non potrà tornare in un'altra restituzione se non la scrivi tu. (La riga di Rust è citata come l'hai trascritta, in u19; il confronto
con il testo della serie, che secondo l'Atlante dice "in evolution" senza "human", va fatto prima di consegnarla.)

Se rispondi "sì, Rust è l'ospite" (nel Progetto, rimandando il memo, o in Specchio), il frammento di chat accoglie la voce 1 (§4) e il legame diventa ●, con la
formula ancora mia, in tondo.

### 13.6 Novembre–dicembre

- **16 novembre**, E53: Telemaco attribuito a Galimberti. `nomina: umberto-galimberti` ✦ e `nomina: ~Massimo Recalcati`
  ○ con il `perche` "l'idea del figlio che aspetta è di Recalcati (da verificare)"; risposta: "Correggo?". Se dici sì, è un
  `ritorna-su … come: corregge`.
- **20 novembre**, in Specchio: "è vera la frase dell'ospite?". Risposta dai dati: il nodo ha già `esito` e `riferimento`;
  nessun nodo nuovo nasce da una verifica (D15).
- **Sabato 28 novembre**: "oggi mi sento come sisifo" (`parla-di: sisifo, come: metafora`). La lettera del 29 mette a
  confronto il Sisifo felice del 5 con questo; quella notte "consolida" scrive in `riserva/ritorno.md`: "La lettera del
  29 novembre, sul masso e la discesa, è ancora lì."
- **1 dicembre, il primo ritratto mensile**: novembre ha 14 frammenti parlanti (≥ 10), quindi parte (§13.7).
- **Silenzio dal 29 novembre al 15 dicembre** (17 giorni, nessun giorno attivo): gli orologi si fermano, nessuna lettera
  parte. Il tuo intervallo mediano è di 3 giorni, quindi 17 giorni superano la soglia (≥ 14): il 16 dicembre la risposta al
  primo memo chiude con la riga della riserva, scritta il 29 e non rigenerata.
- **Il ricordo del 3 novembre** diventa possibile dopo 60 giorni di calendario con almeno 10 giorni attivi in mezzo: con il
  ritmo di questo caso (circa due giorni attivi a settimana) a inizio gennaio. Arriva con l'indizio e subito la frase
  intera, senza domanda (§9.3).

### 13.7 I ritratti: dicembre, poi febbraio

Il 1 dicembre (mensile, su novembre) e il 1 febbraio (l'ultimo mensile, su gennaio), poi ogni tre mesi. Quello di febbraio,
con uno sguardo indietro sui tre mesi:

> **Gennaio, e i tre mesi da novembre: 31 frammenti tuoi.** Tornano: il dolore (9), Sisifo (4), la musica di notte (6,
> quasi tutti dopo mezzanotte). È nuovo: quattro volte un padre, senza che tu l'abbia mai scritto come tema ◌. È sparito:
> Rust non torna da ottobre. Una tensione: il 5 novembre *stasera sto bene*, il 28 *oggi mi sento come sisifo* ✦.
> **Una domanda:** nel nucleo l'oltre è *amore e verità* ✧; da novembre hai salvato molta verità e un solo amore. È una
> tappa o una scelta?
>
> Voce: il 41% di queste righe sono parole tue; hai preso da me "ospite" e "soglia".

### 13.8 Marzo 2027 e oltre

- **La fusione mensile** vede `il-nulla` (2 frammenti) accanto a `nichilismo` (7): propone la fusione; [S] la esegue;
  `temi/il-nulla.md` diventa una lapide.
- **2028, cambio di lettore**: la taratura su 100 campioni trova `parla-di: nichilismo` più raro del 30% → si rileggono
  in parallelo le 40 letture del tema, con i vincoli degli atti. La serie "nichilismo nel tempo" conta prima la parola
  nelle tue frasi, che non cambia.

---

## 14. L'importazione dall'Atlante (una volta sola)

Le regole R1–R13 dell'[eredità](./06-eredita.md), riscritte con gli attriti della
[simulazione](../v2/simulazione/attriti-importazione.md). Script `importa.mjs` [S]; i giudizi segnati [AI] si
preparano prima, in una tabella che lo script legge. **Questa sezione è la sola norma dell'importazione**: le
[regole d'importazione](./05-regole-importazione.md) (il file 05 del pacchetto) sono **superate** e
usano nomi del v2 (`ritratto-cNN`, `per`, `importata`, `correggi`); valgono solo come storia (prova a freddo R7).

| regola | che cosa |
|---|---|
| **R1 frasi sue** | U1–U31 → `frammenti/2026/10/2026MMGG-0000-uNN.md`, `canale: importato`, `voce: sua`, `registrato` solo data; corpo = **testo grezzo senza markup**, link interni resi in testo, a capo conservati (A19); la cornice di Claude va in `nota`; `forma: riportata` per le frasi scritte da Claude dalle tue parole (A2); `fonte` nella lettura (A20), con il commit del checkpoint (`@3a7ea79`); `intento: [salva]` di default (A22). U26 si divide in `u26a` e `u26b` (A25). Le letture importate hanno `letto-da` = il modello della sessione d'importazione (lo passa chi lancia lo script, con la variabile `LETTORE`; neutro nelle copie che escono dal repo, §2.2) e `prompt` = `3a7ea79`, le prime 7 cifre dello SHA del checkpoint dell'Atlante (non c'è un prompt da cui calcolarlo) |
| **R2 lo sguardo** | il nucleo → `20261005-0000-s01`, `voce: seme`, `intento: [sguardo]`, senza i blocchi proposta (A24). Le tensioni, virtù e fortuna, evoluzione → `s04`, `voce: seme` (A15). Lo sguardo fa nascere nodi (A16); i passi si citano con `passo: <nota>:<riga>`, dove `<nota>` è il nome del file
dell'Atlante senza cartella e senza `.md` e `<riga>` la sua riga al checkpoint (A7): `nucleo:19` in `s01`; `tensioni:15`,
`virtu-e-fortuna:13`, `evoluzione-e-percorso:14` in `s04`. Il racconto della chat d'origine → `s03`, `intento: [niente]`, non fa nascere nodi, salvo `raccolte/tatuaggi.md` (R8) |
| **R3 frasi sul sistema** | U27–U31 sono frammenti (R1) e regole nel `CLAUDE.md` con id e data. U28 ("dimmi tu") non ha un referente importato: `intento: [salva]` e una `nota` su che cosa accolse, nessun atto. U30 sì: vedi R13 (A6) |
| **R4 convergenze** | C1–C25 → restituzioni `eredita`, `r-AAAAMMGG-0000-eredita-<slug>`, data del passo (riga di `## Evoluzione` o commit: A5), `aggancio: {a, passo}`, voci numerate con `rif` a un nodo o `~Nome`; `converge-con` con `tra` che ammette voci e `~Nome` (A1); voce ✧ solo se tutto il passo è del seme validato, altrimenti ◌ (A23) |
| **R5 entità vive** | diventano nodi solo quelle nominate da te o dallo sguardo; slug dell'Atlante conservati; concetti e stili nominati da te → temi (A9); band → persone `mondo` (A10); Dostoevskij da U31 (A18); Napoleone resta alias di `resilienza-napoleonica` (A31) |
| **R6 proposte** | tutto ciò che è di Claude entra solo dentro restituzioni `eredita`, ◌, che **non sbiadiscono** (A11) |
| **R7 citazioni** | se l'esito dell'eredità e il protocollo delle [citazioni](./08-citazioni.md) divergono, vince il protocollo (R43); nelle tue frasi → nodi senza `esito` (⚠); quelle scelte da Claude → voci di `r-20261007-0000-eredita-citazioni`, **dopo** il protocollo sulle 17 vive (A8); se ne accogli una, il nodo nasce già con `esito` e `riferimento`: è l'eccezione voluta alla regola dell'esito all'ingresso (§7.2 passo 4), perché l'importazione fa le veci di "consolida" e queste citazioni sono già verificate ([correzioni](./07-correzioni-citazioni.md)); la voce di una restituzione ha solo `esito` e `riferimento`: la traduzione con il suo traduttore, oppure «resa di Claude» con il suo "da verificare" (otto delle 17 vive, ermetismo compreso: una resa non si mostra mai come testo d'autore), la fonte intermedia e la traccia della prova del protocollo vanno nel `riferimento` e nel corpo della restituzione, e nel nodo che nasce da un'accoglienza nel `riferimento` e nel corpo del nodo; le correzioni sulle entità morte si fanno sull'Atlante, fuori dallo script; quelle sulle entità vive che al checkpoint non sono ancora corrette (Marco Aurelio: la traduzione di Moricca al posto della resa di Claude) le applica `importa.mjs` da `importa/correzioni-citazioni.json`, solo alle voci `eredita`, mai alle tue frasi |
| **R8 tatuaggi** | `raccolte/tatuaggi.md` con `nato-da: [s03]` e senza `scopo` finché non lo dici tu (`mappa.md` lo segnala; nessuna domanda: §7.2.1) (A30); le tue idee sono frammenti con `serve-a`; le altre restituzioni `eredita` con `serve-a` ◌. Il brief `s02` non esiste: è una vista (A3) |
| **R9 ricerche** | la tua frase è il frammento; la pista è `nomina` con `fruizione: da-fare`; lo stato della ricerca nell'Atlante va in `nota` (A12) |
| **R10 pin** | link nel frammento; le descrizioni di Claude in `nota` |
| **R11 emozioni** | le 10 parole di U1 → temi; `parla-di` per le tappe, `come: stato` solo per lo stato d'arrivo, con `vissuto` (A21); le 4 di Claude non entrano |
| **R12 il resto** | un `link` alla scheda dell'Atlante, tranne sulle citazioni senza `esito` (l'elenco unico del §3.4 non ha `link`) e sulle persone `cerchia: vita` |
| **R13 le 8 domande** | `r-20261007-0000-eredita-domande` con 8 voci; la lettura di U30 ("vai con la mappa") le **accoglie**: nascono 8 temi ● (A14) |
| **ordine** | **0. l'elenco dei nodi** (slug, nome, genere), fissato per primo da una sola sessione; poi, **in memoria**, frammenti → nodi → letture → restituzioni → **riconciliazione**; solo dopo la riconciliazione si scrivono i file (le restituzioni sono immutabili dal loro primo commit) → `contesto.mjs` → verifica che nessun conto contenga l'importato |
| **riconciliazione** (R27) | se le parti sono scritte da subagent diversi, divergono negli slug (7 casi nella prova a freddo): un passo [S] unisce le parti, sostituisce ogni slug e ogni `~Nome` con quello dell'elenco 0 (per `chiave` e alias), e fallisce se resta uno slug fuori elenco |

**Precisazioni della prova a freddo:** le convergenze C5, C8, C10 e C16 sono ◌, non ✧, perché contengono idee del seme non
validate (R36, A23); `s04` fa nascere solo `divina-commedia` (Machiavelli, i lamed-vav e le tre metamorfosi restano testo,
R17); U31 non fa nascere Galimberti, che al punto zero non esiste (B01, R18); U20 ha `altrui: true` (R48); le etichette e
i numeri d'elenco di Claude dentro il seme si tolgono dal corpo (R28). C1 resta ✧ anche con la riga ritoccata da Claude il
7 ottobre: un ritocco su un passo del seme validato non lo rende ◌ (A23 vale per le idee non validate).

Numeri attesi: ~35 frammenti, ~52 nodi, ~60 restituzioni `eredita`, di cui **26** con un legame `converge-con`: le 25
convergenze C1–C25 più la convergenza "riserva" dell'eredità (*Il monologo cancellato*, agganciata a u22), che sta fuori
dalla numerazione C; fa testo la tabella dell'importazione (quarta prova, P4-18). Al giorno 1, 20 domande del banco su 25 hanno il
materiale per rispondere; D21 (tatuaggi da Sisifo) si chiude con A1 (voci indicizzate per nome).


### 14.1 La tabella riga per riga (I2)

Righe scritte al commit `4c9fdce` e verificate al checkpoint `3a7ea79` (tornano uguali: seconda prova a freddo); "seme" =
`diario/2026-10-04-seed.md` (commit `030c29a`). `registrato` è la data del commit che
crea il file fonte (sola data); il momento vero, se diverso o solo come limite, va in `vissuto`. Un frammento può unire più
righe di una nota, anche di file diversi: la `fonte` **della lettura** (il frammento non ha `fonte`: §3.3) le elenca
tutte, un elemento per file (`file:riga, riga@commit`). Gli alias importati vengono solo da parole tue nell'Atlante o dallo sguardo (Napoleone, da M9, è alias di
`resilienza-napoleonica`: A31), più «Rust» per `rust-cohle`, che viene dai testi che hai trascritto (u19, u20): sono gli unici
due alias senza una tua frase, e restano. Nella colonna fonte gli intervalli si scrivono qui con il trattino lungo; nella
`fonte` della lettura con il trattino corto (`nucleo.md:29-31`), come vuole lo schema (§3.7, `fonte1`). I `simboli/`
dell'Atlante non entrano, se non come nodi che nomini tu.

| riga | fonte (file:riga dell'Atlante) | frammento | `voce` | `forma` | note |
|---|---|---|---|---|---|
| U1 | `diario/2026-10-04-seed.md:282` | `20261004-0000-u01` | sua | — | percorso interiore, intero; `vissuto: "≤2026-10-04"`; copia `nucleo.md:43`; 10 emozioni → `parla-di` (A21), più un `parla-di` per ogni altro concetto dell'elenco dei nodi che U1 nomina (avventura, caos, assurdo: R5): la tabella ne conta 13 |
| U2 | seme:630 | `20261004-0000-u02` | sua | riportata | la mia lista; `vissuto: "≤2026-10-04"`; copia `diario/2026-10-04-origine.md:17` (anche in s03) |
| U3 | seme:268 | `20261004-0000-u03` | sua | — | dolore, amore e verità; `vissuto: "≤2026-10-04"`; copie `nucleo.md:23`, `emozioni/dolore.md:15` |
| U4 | seme:315 | `20261004-0000-u04` | sua | riportata | sacrificio anonimo; `vissuto: "≤2026-10-04"`; copia `concetti/sacrificio-anonimo.md:16`; fonti accodate fuori |
| U5 | seme:325 | `20261004-0000-u05` | sua | riportata | il condottiero; etichetta di Claude ("Guida e condottiero") in `nota`; `vissuto: "≤2026-10-04"`; copia `concetti/guida-e-condottiero.md:14` |
| U6 | seme:326 | `20261004-0000-u06` | sua | riportata | l'avventura; `vissuto: "≤2026-10-04"`; copia `concetti/avventura-e-scoperta.md:14` |
| U7 | seme:327 | `20261004-0000-u07` | sua | riportata | dissoluzione dell'io; `vissuto: "≤2026-10-04"`; copia `concetti/dissoluzione-dell-io.md:15` |
| U8 | seme:328 | `20261004-0000-u08` | sua | riportata | battaglie interiori; `vissuto: "≤2026-10-04"`; copie `concetti/battaglie-interiori.md:14`, `percorsi/versioni-morte.md:11` |
| U9 | seme:329 | `20261004-0000-u09` | sua | riportata | bene relativo; `vissuto: "≤2026-10-04"`; copia `concetti/bene-relativo.md:12` |
| U10 | seme:258 | `20261004-0000-u10` | sua | riportata | primaria seme:258 (A29); copie seme:633, `nucleo.md:61`, `concetti/soglia-e-mistero.md:16`, `diario/2026-10-04-origine.md:20`; `vissuto: "≤2026-10-04"` |
| U11 | seme:253 | `20261004-0000-u11` | sua | riportata | Peterson, Marco Aurelio, Camus; `vissuto: "≤2026-10-04"`; copia `nucleo.md:55` |
| U12 | seme:254 | `20261004-0000-u12` | sua | riportata | FMA:B, True Detective, Berserk; `vissuto: "≤2026-10-04"`; copia `nucleo.md:56` |
| U13 | seme:255 | `20261004-0000-u13` | sua | riportata | Radiohead, Deftones; `vissuto: "≤2026-10-04"`; copia `nucleo.md:57` |
| U14 | seme:251 | `20261004-0000-u14` | sua | riportata | territori; `vissuto: "≤2026-10-04"`; copia `nucleo.md:51` |
| U15 | seme:249 | `20261004-0000-u15` | sua | riportata | prima il concetto; `vissuto: "≤2026-10-04"`; copia `nucleo.md:49` |
| U16 | seme:259 | `20261004-0000-u16` | sua | riportata | patchwork sleeve; `vissuto: "≤2026-10-04"`; copie seme:469, 634, `nucleo.md:62`, `stile/patchwork.md:11` |
| U17 | seme:455 | `20261004-0000-u17` | sua | riportata | incisione e xilografia; reazione in coda al catalogo di Claude; `vissuto: "≤2026-10-04"`; copia `stile/incisione-xilografia.md:11` |
| U18 | `spunti/capitano-della-mia-anima/index.md:25` (testo 27–45) | `20261004-0000-u18` | sua | — | Invictus intero + la sua riga; `altrui: true`; più righe in un frammento (A2); cornice in `nota` (A19); file `c8ad322` |
| U19 | `spunti/true-detective-coscienza/index.md:28` | `20261004-0000-u19` | sua | — | monologo di Rust trascritto da lui, in inglese; `altrui: true`; legami `nomina rust-cohle` e `nomina true-detective-s1` con `momento: "episodio 1"` (il luogo del ○ per un ponte, §7.5), più la citazione; file `e600282` |
| U20 | `spunti/true-detective-sogno/index.md:23` | `20261004-0000-u20` | sua | — | "I don't sleep, I just dream" (senza punto, come nell'Atlante); `altrui: true` (R48); legami `nomina rust-cohle` e `nomina true-detective-s1` con `momento: "episodio 1"` (dalla cornice), più la citazione; copia `idee/sognatore-insonne/index.md:27`; file `c8ad322` |
| U21 | `idee/sognatore-insonne/index.md:38, 41, 42` | `20261004-0000-u21` | sua | riportata | sagoma, fumo, frase + due domande; virgolettati nella prosa di Claude (A2); `serve-a: tatuaggi`; file `c8ad322` |
| U22 | `idee/monologo-di-rust/index.md:33`; `diario/2026-10-05-revisione-seme.md:30` | `20261005-0000-u22` | sua | riportata | "quanto tenere del testo?"; file `20b6850` (2026-10-05), eredità dice 2026-10-04 → `vissuto: "2026-10-04"`; copia `_archivio/corona-cieca/index.md:32` |
| U23 | `diario/2026-10-05-revisione-seme.md:30` | `20261005-0000-u23` | sua | riportata | "due idee, entrambe legate a true detective"; commit 2026-10-05, eredità 2026-10-04 → `vissuto: "2026-10-04"` |
| U24 | `ricerche/pensieri-marco-aurelio/index.md:7` | `20261004-0000-u24` | sua | riportata | rileggere i Pensieri; campo `oggetto` scritto da Claude; `fruizione: da-fare` (A12); file `ab1a2f2` |
| U25 | `ricerche/soorajsaxena/index.md:25` | `20261004-0000-u25` | sua | riportata | @soorajsaxena; `fruizione: da-fare`; file `ab1a2f2` |
| u26a | `spunti/true-detective-sogno/index.md:42` | `20261004-0000-u26a` | sua | — | pin `970173944741790982` (Rust sotto il crocifisso); descrizione di Claude in `nota` (R10) |
| u26b | `spunti/true-detective-coscienza/index.md:65` | `20261004-0000-u26b` | sua | — | pin `150378075043142308` (testa bendata con le corna); descrizione di Claude in `nota` |
| U27 | `diario/2026-10-05-revisione-seme.md:11` | `20261005-0000-u27` | sua | riportata | "te le sia inventate tu"; `intento: [salva]`, regola nel `CLAUDE.md` (l'intento `correggi` non esiste più) |
| U28 | `diario/2026-10-05-validazione.md:40` | `20261005-0000-u28` | sua | riportata | "dimmi tu"; commit 2026-10-05, eredità 2026-10-04 → `vissuto: "2026-10-04"`; `intento: [salva]`, `nota` su ciò che accolse (A6) |
| U29 | `diario/2026-10-06-nuove-proposte.md:71` | `20261006-0000-u29` | sua | riportata | prossima wave dalle reference; `intento: [chiedi]`; `CLAUDE.md` |
| U30 | `diario/2026-10-07-atlante-dei-concetti.md:11` | `20261007-0000-u30` | sua | riportata | "vai con la mappa"; accoglie le 8 voci di `r-20261007-0000-eredita-domande` (R13, A14) |
| U31 | `diario/2026-10-31-memo-coscienza.md:11` | `20261031-0000-u31` | sua | riportata | domande d'esempio; fa nascere `persone/dostoevskij` (A18); `intento: [chiedi]` |
| M1 | `nucleo.md:11` (seme:271) | `20261005-0000-s01` | seme | — | frase-formula; resta nel corpo del nucleo; `passo: nucleo:11` |
| M2 | `nucleo.md:15` (seme:264) | `20261005-0000-s01` | seme | — | il filone; `passo: nucleo:15` |
| M3 | `nucleo.md:19` (seme:266) | `20261005-0000-s01` | seme | — | stadio assurdista; `passo: nucleo:19`; `nichilismo` nasce dallo sguardo (A16) |
| M4 | `nucleo.md:29–31` (seme:274–276) | `20261005-0000-s01` | seme | — | i tre movimenti |
| M5 | `nucleo.md:35` (seme:278) | `20261005-0000-s01` | seme | — | sfumatura esoterica |
| M6 | `nucleo.md:39` (seme:280) | `20261005-0000-s01` | seme | — | avvertenza a me stesso |
| M7 | `nucleo.md:63` (seme:260) | `20261005-0000-s01` | seme | — | estetica; blocco proposta sul grimorio tolto dal corpo (A24) |
| M8 | `concetti/tensioni.md:15–17` (seme:349–351) | `20261005-0000-s04` | seme | — | le tre tensioni (A15); fa nascere `divina-commedia` |
| M9 | `concetti/virtu-e-fortuna.md:13–15` (seme:324) | `20261005-0000-s04` | seme | — | virtù e fortuna; Napoleone alias di `resilienza-napoleonica` (A31) |
| M10 | `concetti/evoluzione-e-percorso.md:14` (seme:330) | `20261005-0000-s04` | seme | — | l'evoluzione |
| M11 | `diario/2026-10-05-validazione.md:53` | nessuno | — | — | solo `CLAUDE.md` con provenienza (R3) |
| M12 | seme:627–635; `diario/2026-10-04-origine.md:15–22` | `20261004-0000-s03` | seme | — | racconto della chat d'origine; `intento: [niente]`; non fa nascere nodi, salvo `raccolte/tatuaggi.md` (R8); `vissuto: "≤2026-10-04"` |


Totale: 32 frammenti U più `s01`, `s03`, `s04` = **35**. Nel nucleo U1, U3, U10–U17 sono copie e non generano legami.

**Casi dubbi** (da decidere prima dello script):
1. Data di `s03`: le regole non la fissano; scelto 2026-10-04 (seme e diario d'origine) (da verificare).
2. `s04` datato 2026-10-05 come `s01`, ma le tre note di mappa sono state create il 2026-10-04 (`e600282`) (da verificare).
3. "Commit della fonte": il file o la riga? Con `git blame`, `spunti/true-detective-sogno/index.md:23` è del 2026-10-06 e `idee/sognatore-insonne/index.md:38` del 2026-10-05; qui vale il commit che crea il file (da verificare, forse le righe si sono spostate).
4. U22, U23, U28: fonte del 2026-10-05, momento del 2026-10-04 secondo eredità; scelto `registrato` 2026-10-05 con `vissuto: "2026-10-04"` (da verificare). La data-tetto è il `vissuto` (§6.2): "entro il 4 ottobre", in `parole.md` come nelle risposte.
5. U1 e U3 stanno nel seme scritto da Claude come U2 e U4–U17, ma non sono marcati `riportata`: U1 è "con le mie parole", U3 resta (da verificare).
6. U18–U20 e u26a/b senza `forma`: testi incollati da lui, cornice di Claude in `nota`; U24 è un `oggetto` scritto da Claude (da verificare).

---

## 15. Registro delle decisioni (che cosa cambia rispetto al v2)

| # | v2 | v3 | perché |
|---|---|---|---|
| 1 | l'AI scrive i file | l'AI scrive un **piano**, [S] i file | CS §3.2; principio 11 |
| 2 | il Comando rapido mette il grezzo, la Routine scrive il frontmatter | il Comando rapido scrive il frammento completo; [S] lo sposta con hash | CS §3.2 |
| 3 | ogni turno di chat è un frammento | una conversazione = un frammento `chat`, solo i tuoi turni | C15a |
| 4 | domande nel Progetto, "salvate con un memo" | Progetto di default, che chiude con un **memo YAML** (turni, voci numerate, `perche`, `risponde-a`) da rimandare; [S] lo separa in frammento e restituzione; Specchio per verificare o scrivere; "Chiedi"; MCP al mese 2 | CS §2.1; C1c, C2, C15e |
| 5 | risposta a ogni memo in `recenti.md`, notifiche "senza contenuto" | risposta solo se ha contenuto; nessuna notifica per memo; ponti nella lettera; la lettera è il messaggio finale della Routine | C1, C11 |
| 6 | due fasi di consolidamento, 6 azioni + 3 | una passata settimanale ("consolida", domenica 03:13); fusione mensile; ritratto mensile nei mesi 1–3, poi trimestrale | CS §1.2; C8; decisione di progetto; banco R01, T05 |
| 7 | `.indice/` (5 JSON) + 4 file in `contesto/` | 4 file in `contesto/` (`parole` solo ✦, `recenti` ultimi 30, `ritratto` copia, `mappa`), con `aggiornato` e tetto di 80k token | CS §1.2; C2, C7; T02, T08 |
| 8 | 5 formule (forza, vitalità, sbiadito, validità, sorpresa) | conteggi e regole; sbiadito in **30 giorni attivi** | CS §1.2; C10 |
| 9 | stati `vivo`, `rifiutato`, `sbiadito`, `superato` | `rifiutato` e `sbiadito` calcolati; `superato` tolto, si risponde con le date | CS §1.2 |
| 10 | 8 predicati | 6: `sente` → `parla-di come: stato`; `tramite` → `nomina` + `perche` | CS §1.2 |
| 11 | `atti` + `in-risposta-a` + `ritorna-su` | tutto in `ritorna-su` con `n`, `passo`, `turno`, `come` | CS §1.2; D05; A7 |
| 12 | legami con chiave variabile | grammatica unica `{p, a|tra, voce, perche}`, `~Nome`, schema JSON | CS §2.3 |
| 13 | slug "mai cambiato" ma senza regola | `slug()` deterministica, alias con `chiave` e `scheletro`, collisioni, lapidi `fuso-in` | CS §2.2; C8b |
| 14 | concorrenza non trattata | attesa di 90 s, l'ultima vince, lucchetto via push, un solo scrittore per file | C6, C9; CS §2.2 |
| 15 | lettura: 11 campi | `versione`, `letto-da`, `prompt`, `schema` (tracciabilità); tolti `letto`, `contesto` (→ `nota`), `segnale` | C9, C12, C13; CS §1.2 |
| 16 | — | `delicato` nella lettura | CS §2.3; B12, B25 |
| 17 | — | `parlante` (calcolato) e `giorno attivo` come unità di tempo | C3, C10, C15 |
| 18 | intento a 7 valori | 4: `salva`, `chiedi`, `sguardo`, `niente` | CS §1.2 |
| 19 | ID esterni e `risolvi.mjs` | tolti dalla tappa 1 | CS §1.2: nessun caso del banco li usa |
| 20 | `esito` a 5 valori, `prova` | 4 valori; senza esito = ⚠ | CS §1.2 |
| 21 | `ti ricordi?` come indizio da completare, a intervalli | affermazione, solo ✦ oltre **60 giorni attivi**, mai ripetuta | C4, C10; prompt operativi (f) |
| 22 | lettera "se hai scritto" | soglia di 3 frammenti parlanti, se no slitta | C3 |
| 23 | sogno a turno dal primo mese | spento sotto 50 parlanti, poi max 1 al mese | C5 |
| 24 | ● calcolato e mostrato come tuo | ● accoglie il legame, non le parole; seme una volta per nodo; ritornelli vietati; indicatori Q | C14 |
| 25 | vicende: ≥ 3 frammenti in 60 giorni | ≥ 3 frammenti in ≥ 3 giorni distinti | C15c |
| 26 | `versione` = versione della lettura | in più `schema`, `_schema.md`, migrazioni a script, riletture parallele | C12 |
| 27 | — | taratura al cambio di lettore; serie prima sul testo ✦ | C13 |
| 28 | `importata: true` | `forma: eredita`, non sbiadisce, `fonte` | A5, A11, A20 |
| 29 | `per` sulle convergenze importate | `aggancio: {a, passo}` | A7 |
| 30 | `converge-con` solo tra nodi | anche voci di restituzione e `~Nome` | A1 |
| 31 | voce `sua`/`seme` sul frammento | + `forma: riportata` per l'importato | A2 |
| 32 | `registrato` sempre con ora | solo data per l'importato; viste orarie lo escludono | A4 |
| 33 | il nucleo un solo frammento-sguardo | + `s04`; lo sguardo fa nascere nodi; slug dell'Atlante conservati | A15, A16 |
| 34 | le 8 domande temi "voce seme" | restituzione `eredita`, accolte da U30 → 8 temi ● | A14 |
| 35 | il brief `s02` | tolto: è una vista | A3 |
| 36 | `prova: memoria` sulle citazioni di Claude | protocollo sulle 17 vive prima dell'import | A8 |
| 37 | 2 Routine (smista, sogno) | 4 Routine: "smista", "consolida" (notte), "lettera" (sera, consegna e basta), "ritratto" (il primo del mese) | prompt operativi; T05: il lavoro pesante di notte, la lettura di sera; CS §1.2 corretto: una Routine ha un solo prompt |
| 38 | primo traguardo: un ritratto | prima settimana senza Routine né Progetto; il ritratto al giorno 1; prova della meraviglia al giorno 3 | CS §4 |
| 39 | una restituzione per ogni risposta | una per **raffica** (`copre`) e una per **conversazione** (voci con `turno`); `registrato` su ogni restituzione | T01, T04; prompt operativi (a, i) |
| 40 | "mentre eri via" composto al ritorno | `riserva/ritorno.md`, riscritto da "consolida" ogni settimana, mai al ritorno | C (nota finale); T10 |
| 41 | voce: segni e basta | ✦ in corsivo, parole altrui tra «» con ○ (`altrui: true`), formule mie in tondo, ◌ al più uno per lettera, lunghezze, data-tetto degli importati | [voce](./10-voce.md) §3, §5 |
| 42 | lucchetto `ingresso/.lavoro` | `ingresso/.in-corso`, 20 minuti, rinnovato ogni 10; "consolida" e "ritratto" aspettano fino a 30 | C6; prompt operativi; decisione di progetto |
| 43 | Specchio scrive solo file nuovi | Specchio fa il lavoro di "smista" con il lucchetto (prima settimana, senza Routine) | prompt operativi (i); CS §4 |
| 44 | — | `anno` sulle opere; Q-contesto; immagini già usate | B04; T07; R03 |
| 45 | `contraddice` frammento → frammento, rende `superata` la posizione | verso la frase tua più vicina e il `passo`; `come: dubbio`; posizioni per passo in `mappa.md`; il ✦ netto lo scrive già "smista" | [attriti delle domande](../v2/simulazione/attriti-domande.md) Q6, Q12, Q23, Q31 |
| 46 | scarti in `.indice/` | sezione `## Scarti` in `mappa.md` con chiave, contesto, portata | Q4, Q17 |
| 47 | le restituzioni importate in `contesto/` come titoli | riga per ognuna in `mappa.md`, con voci, esito ed `estratto` ≤ 25 parole; ritorni con effetto; mondo verificato | Q3, Q21 |
| 48 | `recenti.md` per numero di frammenti, chat comprese | ultimi 30 del telefono con le risposte, le chat a parte | Q5 |
| 49 | — | `come: chiede`; effetto senza `n` non è accoglienza; legami di restituzione `da` una voce; una domanda fa nascere il nodo | Q16, Q25, Q18 |
| 50 | cammini su tutto il grafo | lo sguardo e le liste non si attraversano; niente ponti per persone della vita; delicati a richiesta | Q9, Q24, Q10 |
| 51 | quattro regole in conflitto sulle domande all'ingresso | un elenco unico di 7 casi, al più una domanda; la tracklist di "la 3" cercata all'ingresso | [attriti dell'ingresso](../v2/simulazione/attriti-ingresso.md) I1, I15 |
| 52 | citazione all'ingresso con `originale`, `riferimento`, autore | all'ingresso solo `nome` e `attribuita-a`, senza `esito` (⚠; la traccia del passo 1 nel corpo); il resto da "consolida" | I3, I8 |
| 53 | `forma: ritorno` a ogni silenzio di 14 giorni | una riga nella risposta, soglia sul tuo ritmo (> 2 × intervallo mediano, ≥ 14 giorni), contenuto fissato da `riserva/ritorno.md`, mai su delicati | I4 |
| 54 | consolidamento saltato senza regola | "consolida" copre tutto dall'ultimo riuscito | I5 |
| 55 | notifiche per le correzioni | notifica solo se hai chiesto; correzione solo di un errore tuo | I6 |
| 56 | un aggancio solo | un aggancio e un fatto ○ | I10 |
| 57 | `delicato` per sempre | cade quando ci torni sopra; protegge anche i temi vicini nella lettera | I9 |
| 58 | foto ridotta al posto dell'originale | l'originale resta (è il detto), [S] ricava la copia ridotta come primo passo | I14 |
| 59 | — | casi di confine sui nodi (concetto con autore, parentele, omonimi, miti, link muti); `citata-da`; `verso: ±`; ritorni spontanei; ricordabili in ordine; `chiedi` solo per il mondo | I7, I12, I17, I18, I20, I21, I22, I23 |
| 60 | `parole.md` intero, taglio dopo tre anni | finestra mobile dichiarata sotto il tetto, formato compatto, periodi riassunti da [S] alla lettera, archivio intero da Specchio | [prova del tempo](../v2/simulazione/attriti-tempo.md) V2 |
| 61 | la ricerca lessicale | espansione della domanda obbligatoria (6–10 parole), parole da 3 lettere | V4 |
| 62 | sigillo d'ufficio della chat dopo 2 ore | dopo le 04:00 del giorno dopo; `continua: <id>` | V3 |
| 63 | ritornelli a ≥ 3 parole; Q-eco sulle parole | ritornelli a 2 parole di contenuto entro 4; Q-eco in frammenti con base lessicale; Q-nomi e Q-contesto sui ✦ anteriori | V5, V6, V7 |
| 64 | `corregge` con `campo` e `valore`; v2 della lettura colpita | `nodo`, `vecchio`, `valore`, `@Nome`; "consolida" aggiorna solo il nodo | V8 |
| 65 | taratura senza posto | `taratura/AAAAMMGG.md`, `migra/tara.mjs`, campione per tema, ~1 M token | V9 |
| 66 | lucchetto rinnovato | gettone e fencing; "smista" aspetta fino a 45 minuti; uscita solo per un memo di meno di 4 minuti; "consolida" svuota prima la coda e ha un secondo orario | V1, V10, V12 |
| 67 | `contraddice` ✦ scritto da "smista" (Q31) | solo "consolida", niente doppioni, `sua` solo se nega con parole tue | V14 (rovescia Q31: due scrittori facevano doppioni) |
| 68 | *toccato* = un capo; elenco intero dei ricordabili; raffica per giro | entrambi i capi o un `ritorna-su`; conteggio + 20 id; raffica per sessione | V11, V15, V13 |
| 69 | lettera con ≥ 3 parlanti, proposte perse se slitta | ≥ 2 parlanti, o ≥ 1 e una proposta pronta; `riserva/pronte.md` tiene le proposte in attesa; senza lettera, silenzio | [prova di restituzione](../v2/simulazione/attriti-restituzione.md) A1; coordinatore |
| 70 | ponte dei primi giorni senza strada | Specchio ogni sera dei giorni 1–3, bilancio dei ponti al giorno 3, vicini = tutti gli importati ✦, mai un ○ senza luogo | A2; coordinatore |
| 71 | ricordo come affermazione, nessuno nei primi mesi | indizio parziale + affermazione; nei primi mesi gli importati ✦ | A3; coordinatore |
| 72 | restituzione di chat senza struttura | un file per conversazione, una sezione per domanda | A4; coordinatore |
| 73 | piano solo per l'ingresso; prompt in claude.ai | piano per ogni ciclo, `applica.mjs`; prompt come file in `prompt/`, hash da lì; `CRON_TZ=Europe/Rome`; `rinnova`; `contesto.mjs` prima della lettera; parlante senza importati | le 15 incoerenze di [prompt v3](./03-prompt-v3.md), appendice A |
| 74 | — | sogno con "Gioco ◌." più frase ✦ e al più un ○; confronto con la voce dall'altra parte; citazioni ricordate ✦; Q-citato sul trimestre; immagini per lemma; delicati nella soglia | M1–M9, M12 |
| 75 | piano piatto per "smista"; hash di un solo file; verifica rapida dopo `applica`; `riserva/` scritta dall'AI | involucro con 7 operazioni anche nell'esempio; hash di `CLAUDE.md` + `prompt/<ciclo>.md` + `prompt/formato-piano.md`, `prompt/specchio.md`; verifica rapida dentro `crea-nodo`; `riserva/` solo da `applica.mjs`; Specchio nei giorni 1–7; ricordabili con gli importati | [prompt v3](./03-prompt-v3.md), appendice B; coordinatore |
| 76 | ricordo dopo 60 giorni attivi, importati solo "nei primi mesi" | regola unica: importati ✦ da subito, nuovi dopo 60 giorni di calendario e ≥ 10 attivi; domenica senza parlanti muta; proposte pronte solo da una notte precedente; nessun ○ senza opera e passo | [seconda prova di restituzione](../v2/simulazione/attriti-restituzione.md) S2, S7, S8; coordinatore |
| 77 | due memo della stessa chat senza regola | il successivo sostituisce solo se contiene il precedente come prefisso (crescita in coda, `n` continui); altrimenti conflitto per Specchio | [prompt v3](./03-prompt-v3.md), appendice B n. 10; coordinatore |
| 78 | schema con `if` su `cerchia: vita` senza `required`; nessun esempio in §3.5; "Chiedi" fuori schema; `nota` stretta; "galimberti" non trova `umberto-galimberti` | `required: [cerchia]` (verificato con ajv: 34 casi validi e non validi); esempio di restituzione; `intento` facoltativo nel frammento (predefinito `[chiedi]` da "Chiedi"); corpo della lettura per le cornici; regole cognome e nome; riconciliazione degli slug nell'importazione; 05 dichiarato superato; esito all'ingresso con regola unica (solo `attribuita-a`, senza `esito`); `applica.mjs` transazionale; `parole` sempre lista; §8.3: temi nominati ✦ subito, dedotti ◌ a una vicenda | [prova a freddo](../v2/prova-a-freddo.md) R7, R10, R12, R13, R23, R24, R27, R33, R36, R41, R43, R44, R51, R56, R60–R62, R67, R69 |
| 79 | buchi e contraddizioni della seconda prova: hash `prompt` senza algoritmo e anche sulle restituzioni; `versione` nel piano sì e no; tre elenchi dei campi vietati alla citazione; allegati `.webp`; nessuna radice dello schema; vicini "fino a 10" contro "tutti gli importati", e nessuno per Specchio a memo smistati; u19 scartato perché `altrui`; il seme fuori da `contesto/`; `parole` "la tua forma" contro `cultura`; due formule senza ponte | SHA-1 dei tre file (`git hash-object`), solo nelle letture; `versione` facoltativa e controllata; un elenco unico (§3.4, uguale al G4 del banco); originale + copia fuori da `allegati`; radice per chiavi; vicini oltre il tetto nei primi 3 giorni, anche per Specchio; l'altrui come capo di un ponte (gesto ✦, parole ○ alla lettera con il passo); sezione `## Seme ✧` in fondo a `parole.md`; `parole` come nomi; una formula per giorno; firma di `candidati`, nomi del testo, collisioni per genere, articoli, lucchetto (gettone, id, secondi), `risposta` obbligatoria, ID esterni elencati, §14 (ordine in memoria, `prompt` importato, 26 `converge-con`, U20, C1) (verificato con ajv: 9 esempi del modello validi, 7 casi attesi) | [seconda prova a freddo](../v2/prova-a-freddo-2.md) P2-4–P2-8, P2-11, P2-13, P2-15, P2-17, P2-18, P2-20, P2-27–P2-35, P2-39, P2-42, P2-45, P2-50–P2-53, P2-56–P2-59, P2-63–P2-65, P2-69, P2-70, P2-72, P2-77, P2-87, P2-88 |
| 80 | buchi della terza prova: il seme ✧ ammesso come capo di un ponte; hash `prompt` con due numeri diversi; chiavi del piano "in sintesi"; lucchetto senza formato e con il fencing finale in `lascia`; vicini senza riferimento di tempo; formati di Conti e Correzioni; data-tetto di U22, U23, U28; `parole` contro `greci`; Moricca solo dal codice | il seme non è un capo del ponte (§7.5); id blob di git del concatenato; le chiavi di `formato-piano.md` sono la norma di `schema/piano.json`; `.in-corso` in YAML, `--sessione --gettone` o `.git/lucchetto`, fencing nell'ultimo `rinnova`; vicini rispetto al `registrato`, primi 3 giorni di calendario, senza il seme; esempi di Conti e Correzioni, colonna ✧; data-tetto dal `vissuto`; i popoli come li scrivi; `correzioni-citazioni.json` nella R7; la nota "trascritta" una volta per gruppo | [terza prova a freddo](../v2/prova-a-freddo-3.md), P3-79 e le medie; coordinatore |
| 81 | buchi della quarta prova: un ponte "atteso" (Galimberti–Rust) che le domande del giudice di R14 non reggono, e "forte" senza definizione; `reazione` ± contro + per l'iperbole; il `genere` al plurale o al singolare; "all'ingresso" e "nessun ID esterno" senza confini meccanici; il 26° `converge-con` e il formato del passo di `s04`; U20 e U1 in §14.1 | nessun ponte è dovuto: u19 tra i vicini è la condizione, non la risposta (§7.5); "forte" = le domande 2 e 3 del giudice di R14, dette solo nel banco; l'iperbole è `+` (§3.3); `genere` = la cartella (§3.6); "all'ingresso" dal `git log` del file, ID esterni anche nel corpo, mai nel frammento (§3.7, §7.2); la convergenza "riserva", `<nota>:<riga>` (§14); U20 `altrui` con i suoi `nomina`, U1 con i concetti nominati (§14.1) | [quarta prova a freddo](../v2/prova-a-freddo-4.md), P4-1, P4-5, P4-17, P4-18, P4-21; coordinatore |

**Scartati, con il motivo:**
- *Togliere sogno, "ti ricordi?" e ritratto* (CS §1.2): restano. Il banco non li collaudava, ma la ricerca dice che la
  meraviglia sta lì ([essenza](../v2/essenza.md), [restituzione](../v2/restituzione.md),
  [cervello §6–7](../v2/cervello.md)); li governano le soglie di C3–C5.
- *Togliere `versione` della lettura* (CS §1.2): resta, perché serve a controllare l'unico scrittore (C9).
- *Togliere `vissuto`* (CS §1.2): resta facoltativo, perché l'importazione ne ha bisogno (A4, A21).
- *Togliere `recenti.md`* (CS §1.2): resta, perché `parole.md` ha solo i ✦ parlanti (C7) e "la terza" vuole le restituzioni intere.
- *Q-nomi su ≥ 2 frammenti ✦* (C14, T07): accolto con un'eccezione, perché un concetto nominato una volta (A9) ha un solo
  frammento-prova: allora basta quello. I temi nati da un'accoglienza (A14) sono esenti.
- *Lucchetto di 10 minuti* (CS §2.2): 20 minuti con rinnovo, perché "consolida" dura 10–30 minuti (C §2).
- *A6* è accolto con un ritocco: l'intento `accogli` non esiste più; vedi R3.
- *Gli attriti bassi A10, A12, A13, A22, A25, A26, A27, A28, A29, A31* sono accolti come scritti negli attriti (§14),
  tranne A27 (`punto-zero.md`), che non serve più: gli importati ✦ stanno in `parole.md`, marcati.

---

## 16. Allineamento con il banco, la voce e i prompt operativi

Il [banco definitivo](./04-banco-di-prova.md), [voce](./10-voce.md) e i
[prompt operativi](../v2/prompt-operativi.md) sono scritti con il vocabolario del v2. La regola: si leggono **per
funzione** (CS §0). Un punto *File* o *Indice* passa se l'informazione si trova, anche sotto un altro nome; una *Risposta*
e un *Non deve* passano solo se restano identici. Dove v3 e banco divergono nel comportamento, segue
[critica del tempo](../v2/critica-tempo.md), salvo una prova contraria scritta qui.

### 16.1 Il dizionario (nome nel banco e nei prompt → nome nel v3)

| banco, prompt operativi | v3 |
|---|---|
| `20261103-2340.md` | `20261103-2340-k7q2.md` (§3.1) |
| `.indice/grafo.json`, `tempo.json`, `vicende.json`, `scarti.json`, `conti.json`, `voce.json`, `taratura-*.json`; `indice.mjs`, `voce.mjs`, `conti`, `cerca.mjs` | le sezioni di `contesto/mappa.md` (§6.1), calcolate da `contesto.mjs`; per cercare, `grep` |
| `contesto/indice.md`, `punto-zero.md` | `contesto/mappa.md`; gli importati ✦ marcati in `parole.md` |
| `intento: correggi · accogli · rifiuta`, `atti: {accoglie, rifiuta, corregge}`, `in-risposta-a` | `ritorna-su` con `come: corregge · accoglie · rifiuta`, `n`, `campo`, `valore` (§4) |
| intento `niente` di un turno di chat | turno non parlante, calcolato (§6.2) |
| `sente` · `tramite` | `parla-di … come: stato` · `nomina` + `perche` |
| `converge-con` con `a` · `contraddice` con `a: [x, y]` | `converge-con` con `tra`; il confronto è una voce `cosa: confronto` della lettera, il `contraddice` sta nella lettura (§4) |
| `prova: memoria · primaria · secondaria` | senza `esito` = ⚠; "primaria" o "secondaria" dentro `riferimento` |
| `esito: apocrifa · attribuzione-errata` | `esito: errata`, con `autore` vuoto o pieno |
| `traduttore`, `detta-da`, `wikidata`, `musicbrainz` | dentro `traduzione` e `riferimento`; ID esterni tolti dalla tappa 1 |
| `reazione` con `segnale` (impatto, giudizio, identificazione); "il legame pesa 2"; vitalità e mezza vita | `reazione` con `verso` e basta; nessun peso, nessuna formula (CS §1.2) |
| `superato`, validità `fino:` | `contraddice` con le date in `mappa.md`; nessuno stato `superato` |
| `importata: true`; `r-…-ritratto-cNN`, `r-…-ritratto-citazioni` | `forma: eredita`; `r-…-eredita-<slug>`, `r-…-eredita-citazioni` |
| `forma: settimana · ricordi · sogno · confronto`; `in-attesa`, `gioco`, `contiene` | `forma: lettera`; ricordo, sogno, confronto sono voci (`cosa`); la lettera nasce da "consolida" e "lettera" la consegna, senza stato in attesa |
| `contesto` (campo della lettura) | `nota` |
| `letto` | `letto-da`, `prompt`, `versione`; la data la dà git |
| Routine "sogno" · "settimana" | "consolida" + "lettera" |
| domande nella chat del Progetto, che scrive | il Progetto chiude con il memo da rimandare; Specchio quando serve (§7.3) |

### 16.2 Dove il v3 non segue il banco

| prova | il banco vuole | il v3 fa | perché |
|---|---|---|---|
| R02, R04 | "ti ricordi?" come indizio con la fine nascosta; un richiamo sul nucleo ✧; uno a 40 giorni | indizio parziale e subito l'affermazione intera; solo ✦ (nei primi mesi gli importati ✦ con la data-tetto), mai ✧ | C4, C10; decisione di progetto |
| R05 | un sogno il 10 gennaio con 16 frammenti | sogno spento sotto 50 frammenti parlanti | C5 |
| T02 D7 | sbiadimento a 60 giorni | 30 giorni attivi | C10 (la stessa unità di T10) |
| R06, R12 | U3 e U1 come nucleo ✧, `contraddice` verso il nucleo | sono frasi ✦; le copie nel nucleo non generano legami | A3; il banco stesso lo corregge in B20 e D03 |
| X5 | diff solo in `restituzioni/`, `letture/`, `contesto/`, `.indice/` | "consolida" scrive anche i nodi (temi, esiti, lapidi) e `riserva/` | §8.3; da estendere nel banco |
| T07 D1 | Q-nomi su ≥ 2 frammenti ✦ senza eccezioni | eccezione per i concetti nominati una volta e per i temi accolti | A9, A14 |
| B22 | la lettura di ieri passa a `versione: 2` subito | la correzione vale subito nelle viste; la v2 la scrive "consolida" | C9 (come T03) |

Le correzioni al banco trovate dalla simulazione delle domande (voci ✧ che sono ✦, D15 e il libro V, cap. 5, i conti di
D01 e D24, "coda lunga" in D16) sono in [attriti delle domande §3](../v2/simulazione/attriti-domande.md): il v3
le dà per buone. "Coda lunga" vuol dire sempre l'archivio (qualcosa che non rivedi da tempo); un brano poco noto del mondo
è "fuori dai soliti" (Q30).

Gli **errori del banco** trovati dalla simulazione dell'ingresso, che il v3 dà per buoni: B25, la frase di Cioran è nei
*Sillogismi dell'amarezza* (1952), non nell'*Inconveniente di essere nati*; B04, la traccia 3 di *Private Music* è *ecdysis*
(dalla tracklist, da verificare); B15, il *Libro d'ore* esce nel 1905 (il 1899 è la prima parte); B13, l'oEmbed di Spotify
non dà l'artista; B14, l'id YouTube non esiste; B07 e B11, l'esito è `simile`, non `verificata`; B01 e B09, Nietzsche non è
un nodo ereditato e non va in `autore` all'ingresso; B20, il nucleo è del 5 ottobre. B25 e B04 sono corretti anche nel
banco.

Le *Lacune* del banco che il v3 chiude: B05 (l'idea attribuita), B07 (l'opera sbagliata), B10 (la metafora su un nodo
qualunque), B13 (`link`), B20 (niente `superato`), B21 (`trascrizione`), B25 (`delicato`), D05 (`n`), D23 (importati fuori
dai conti).

### 16.3 Voce

Accolto da [voce](./10-voce.md): corsivo per le tue parole, «» e ○ per le parole altrui trascritte, tondo per le
formule mie anche accolte, legenda in una riga nelle forme lunghe, ◌ al più uno per lettera, le lunghezze, i divieti, la
data-tetto degli importati, la notifica di 5–7 parole (§9.1). **Non** accolto:
- *una domanda in fondo a ogni lettera*: la lettera ne fa una solo quando è un confronto (0 risposte su ~18 domande "a
  pancia"; principio 10);
- *il ricordo senza soglia* (l'esempio a 30 giorni): oltre 60 giorni attivi (C4, C10);
- *i ritornelli controllati solo dall'AI su sé stessa*: li controlla anche [S] (§9.4);
- i nomi dei campi del v2 (`prova`, `importata`): §16.1.

### 16.4 Prompt operativi

Accolto: i nomi delle quattro Routine e gli orari, `ingresso/.in-corso` con 90 s e 20 minuti, "consolida" che aspetta fino
a 30 minuti, Specchio che fa il lavoro di "smista" nella prima settimana, una restituzione per conversazione, i commit
senza contenuto, la lettera ≤ 250 parole, "Gioco ◌.", "mai ⚠ nel confronto". **Diverso, e i prompt vanno riallineati:**
- i prompt fanno scrivere i file all'AI; nel v3 l'AI scrive il **piano** e `applica.mjs` scrive (principio 11);
- i nomi di campi, valori, forme, script e file di §16.1;
- il ciclo "torna al passo 4" senza limite: al massimo 3 giri, poi la passata delle 3 ore (§8.1);
- il ritratto "con più di 0 frammenti": ≥ 10 nel mese, ≥ 20 nel trimestre (§9.2);
- la "lettera" che lavora senza lucchetto e il ritratto senza `contesto.mjs`: "lettera" non scrive niente; "ritratto"
  prende il lucchetto e rigenera `contesto/`.

---

## 17. Che cosa resta aperto

1. **La notifica della Routine apre la sessione con la lettera leggibile nell'app?** È la prova da fare per prima: se no,
   la tappa 1 va ripensata attorno a un canale letto davvero (Pushover con un link a Specchio).
2. **I tempi veri** di "smista" (stimati 3–5 minuti) e di "consolida" (10–30 minuti), e il costo in token a memo.
3. **Rifare la prova di restituzione** sul v3 aggiornato (con una correzione per prova saliva da 7 a 12 su 14); restano
   aperti M3 (`scarto` sul nodo citazione per contare "5 su 6"), M10 (rigenerare l'importazione simulata con le regole v3)
   e l'intenzione esplicita di farsi del male (lacuna nota del banco).
4. **Riallineare** [prompt v3](./03-prompt-v3.md) a questo modello (le 15 incoerenze della sua appendice A sono risolte
   qui: registro, riga 73; le 10 dell'appendice B alle righe 75 e 77) e il resto del [banco](./04-banco-di-prova.md) ai nomi del v3 (§16). Lo schema del piano non è più in
   sintesi: le sue chiavi sono la tabella di `formato-piano.md` (§2.2).
5. **Scelte tue**: quanto parla per primo lo specchio (racc.: lettera la domenica, ritratto mensile per tre mesi e poi
   trimestrale); il sogno (racc.: sì, max 1 al mese, dai 50 frammenti); la domanda sul link muto (racc.: una, mai
   ripetuta); il nome del repository.
6. **Da verificare**: se lo sguardo nomina Nietzsche (per lo slug del §13); i riferimenti delle citazioni e la riga di Rust
   del §13.

## Collegamenti

- [Modello v2](../v2/modello.md) · [Banco di prova](../v2/banco-di-prova.md) ·
  [Critica del tempo](../v2/critica-tempo.md) · [Critica della semplicità](../v2/critica-semplicita.md) ·
  [Attriti dell'importazione](../v2/simulazione/attriti-importazione.md) ·
  [Regole d'importazione](./05-regole-importazione.md) · [Telefono](./11-telefono.md) ·
  [Essenza](../v2/essenza.md) · [Restituzione](../v2/restituzione.md) · [Eredità](./06-eredita.md) ·
  [Banco definitivo](./04-banco-di-prova.md) · [Voce](./10-voce.md) · [Prompt operativi](../v2/prompt-operativi.md)
