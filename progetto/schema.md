---
tipo: progetto-schema
origine: claude
validata: false
data: 2026-10-31
---

# Schema del memo-coscienza: il cervello e il modello dati

> Proposta di progettazione: lo schema **ideale**, pensato da zero per un repository nuovo e non vincolato all'Atlante.
> Quello che dell'esistente merita di sopravvivere è separato, nel §5.

## 1. Come ricorda il cervello: cosa ci serve

| Principio | Che cosa dice | Fonte | Che cosa ne ricaviamo |
|---|---|---|---|
| Episodica e semantica | Gli eventi personali sono datati e situati, le conoscenze sono generali e senza contesto | Tulving 1972, *Organization of Memory* | Due famiglie di note: **frammenti** (episodi) ed **entità** (conoscenza) |
| Specificità della codifica | Un indizio aiuta il recupero se era già presente quando il ricordo si è formato | Tulving & Thomson 1973, *Psych. Review* 80 | Ogni frammento conserva il proprio **contesto**: dove ero, quale mezzo, perché mi ha colpito |
| Livelli di elaborazione | Un'elaborazione semantica dura più di una superficiale | Craik & Lockhart 1972, *JVLVB* 11 | Il frammento si chiude con una riga di **perché mi colpisce** (la scrivo io o la propone l'AI) |
| Salienza emotiva | L'amigdala rafforza il consolidamento di ciò che emoziona | McGaugh 2004, *Annu. Rev. Neurosci.* 27 | Campo **pancia** (1–3) ed **emozioni**: servono a ordinare i risultati |
| Sonno e replay | Nel sonno l'ippocampo rigioca le tracce recenti e le trasferisce alla corteccia | Diekelmann & Born 2010, *Nat. Rev. Neurosci.* 11 | Un **consolidamento periodico** (settimanale) in cui l'AI rilegge i frammenti nuovi e propone legami |
| Schemi | Si ricorda ricostruendo dentro schemi, e uno schema esistente accelera il consolidamento | Bartlett 1932; Tse et al. 2007, *Science* 316 (il dato delle ~48 ore è da verificare) | **Temi** e **percorsi** fanno da schemi: il frammento nuovo si aggancia a un tema già esistente prima di crearne uno |
| Spreading activation | L'attivazione di un concetto si propaga ai vicini, in proporzione alla forza del legame | Collins & Loftus 1975, *Psych. Review* 82 | Le relazioni sono **tipizzate** e hanno una **forza** facoltativa. Una domanda parte da un nodo e scende di 1–2 passi |
| Riconsolidamento | Il ricordo richiamato torna modificabile | Nader, Schafe & LeDoux 2000, *Nature* 406 | Ogni ritorno su una nota diventa una riga datata in `## Ritorni`: si aggiunge, non si sovrascrive |
| Effetto testing | Richiamare consolida meglio che rileggere | Roediger & Karpicke 2006, *Psych. Science* 17 | Facoltativo: un "ti ricordi?" che ripropone un frammento di tanto in tanto |

Sistemi personali da cui prendiamo qualcosa:
- **Zettelkasten di Luhmann** (circa 90.000 schede in due raccolte; *Kommunikation mit Zettelkästen*, 1981): note atomiche con ID stabile, legami fra singole schede, l'archivio come "partner di comunicazione". Da qui vengono gli **slug stabili**, i **frammenti atomici** e l'AI come interlocutore.
- **Commonplace book di Locke** (*A New Method…*, edizione inglese del 1706): estratti raccolti sotto voci tematiche con un indice che cresce senza riordinare nulla. Da qui vengono le **citazioni come note proprie** e i **temi come indice**.
- **Memex di Bush** ("As We May Think", *The Atlantic*, 1945): sentieri associativi da salvare e condividere. Da qui vengono i **percorsi**.
- **Ontologie leggere** (sul modello di schema.org o SKOS, da verificare caso per caso): pochi tipi, pochi predicati, e una gerarchia `più-ampio` per i temi.

## 2. Il modello dati

### 2.1 Principi
1. **La cartella dice che cos'è una cosa, il frontmatter dice a che cosa è legata.**
2. **L'episodio è separato dalla conoscenza.** Il frammento racconta "che cosa mi è successo con X", l'entità dice "che cos'è X".
3. **Il frammento è la porta d'ingresso.** Dal telefono si scrive sempre un frammento. Le entità nascono o si aggiornano dopo, e quelle nuove partono come proposte.
4. **Ogni affermazione dell'AI è marcata.** Lo dicono `origine` e `validata`.

### 2.2 Tipi di nota (tassonomia chiusa)

| Tipo | Cartella | Che cos'è |
|---|---|---|
| `frammento` | `frammenti/AAAA/MM/<slug>/index.md` | Un memo atomico e datato: ho visto, letto, pensato, sentito |
| `citazione` | `citazioni/` | Una frase breve con autore e opera: è l'unità che si interroga |
| `persona` | `persone/` | Un autore, artista, pensatore o personaggio reale |
| `opera` | `opere/` | Un libro, film, serie, spettacolo, saggio, dipinto… (sottotipo in `forma`) |
| `canzone` | `musica/canzoni/` | Un brano, con `artista`, `album` e `genere` |
| `album` | `musica/album/` | Un disco, con `artista` e `anno` |
| `simbolo` | `simboli/` | Un'immagine con un significato (il serpente, la soglia): è conoscenza comune, non solo per i tatuaggi |
| `ricerca` | `ricerche/` | Una pista da esplorare (un libro, un artista, un tema), con lo `stato` `da-fare \| in-corso \| fatta` |
| `tema` | `temi/` | Un asse ricorrente o un'idea con un nome (amore, i greci, l'assurdo, la tecnica…), con gerarchia `piu-ampio`. Assorbe i "concetti" |
| `emozione` | `emozioni/` | Uno stato vissuto. Vocabolario chiuso ma estendibile su approvazione |
| `luogo` | `luoghi/` | Un posto reale o mitico |
| `tradizione` | `tradizioni/` | Una disciplina o corrente: filosofia greca, stoicismo, shoegaze… |
| `progetto` | `progetti/<slug>/` | Un cantiere con uno scopo: **tatuaggi**, un libro, una playlist |
| `percorso` | `percorsi/` | Un sentiero associativo ordinato, alla maniera dei trails del Memex |
| `domanda` | `domande/` | Una grande domanda aperta, con il suo `## Coro` |

| `sguardo` | `sguardo/` | Il mio punto di vista in una data ("chi sono ora"): una versione per periodo, mai sovrascritta |

Ogni progetto può dichiarare dei tipi propri, che valgono solo al suo interno (vedi §2.6).

### 2.3 Attributi
Ci sono campi **comuni** a tutte le note: `tipo`, `slug` (il nome del file), `titolo`, `creato` (data di inserimento), `origine` (`mia | claude | seme`), `validata` e `alias` (nomi alternativi, che servono al riconoscimento: "Dostoevskij", "Dostoevskji", "Dostoevsky").

Sul **frammento**:
- `quando`: la data dell'evento, se diversa da `creato`.
- `mezzo`: vocabolario chiuso, `video | spettacolo | libro | conversazione | pensiero | sogno | musica | film-serie | social | luogo`.
- `contenuto`: vocabolario chiuso, `citazione | idea | immagine | ascolto | evento | domanda | reazione`.
- `pancia`: `1 | 2 | 3`, cioè mi ha sfiorato, colpito o folgorato. È soggettivo e lo do sempre io; l'AI non lo indovina.
- `contesto`: testo libero di una riga (dove ero, con chi, perché).
- `stato`: `grezzo | collegato | consolidato`.

Sulla **citazione**: `testo` (al massimo ~30 parole), `lingua`, `verificata` (`si | no | da-verificare`), `pancia`.

Sulla **canzone**: `genere`, da un vocabolario chiuso a due livelli in `_vocabolari/generi.yml` (es. `rock > post-rock`, `metal > alternative-metal`, `elettronica > ambient`). Poi `anno`, `lingua` e, se serve, `momento` (es. "il crescendo finale, 3:40"). I testi delle canzoni non si riproducono mai.

Su **persona** e **opera**: `anno` (intero, negativo per gli anni a.C.), `forma` per le opere (`libro | film | serie | spettacolo | saggio | lezione | quadro | anime | fumetto | gioco`), `lingua`, `paese`.

Restano **liberi**: il corpo delle note, `contesto`, gli `alias`, il `## Perché mi colpisce` e i nomi delle nuove entità.

Sono **chiusi**, in `_vocabolari/*.yml` e controllati dallo script di verifica: `tipo`, `mezzo`, `contenuto`, `forma`, `genere`, `emozioni`, i predicati di relazione e `stato`.

I **temi** sono semi-chiusi: l'AI ne propone uno nuovo solo se nessun tema esistente, alias compresi, va bene, e il tema nuovo parte non validato. È l'equivalente dello schema già pronto di Tse et al.

### 2.4 Relazioni tipizzate (predicati chiusi)
Nel frontmatter, ogni predicato è una chiave con una lista di slug. La forza è facoltativa e si scrive con `slug@2`.

| Predicato | Da → a | Inverso, calcolato dallo script e non scritto a mano |
|---|---|---|
| `autore` | opera, citazione, canzone → persona | `opere-di` |
| `fonte` | citazione, frammento → opera | `citato-in` |
| `parte-di` | canzone → album, opera → opera, tema → tema (`piu-ampio`) | `contiene` |
| `cita` | frammento → citazione | `ricordata-in` |
| `parla-di` | frammento, opera, citazione, canzone → tema, simbolo | `ne-parlano` |
| `suscita` | frammento, canzone, citazione → emozione | `suscitata-da` |
| `tradizione` | persona, opera → tradizione | `membri` |
| `influenzato-da` | persona → persona | `influenza` |
| `riprende` / `contraddice` | qualsiasi → qualsiasi, stesso tipo | simmetrico |
| `evoca` | qualsiasi → qualsiasi (associazione libera, a pancia) | simmetrico |
| `serve-a` | qualsiasi → progetto | `materiali` |
| `luogo` | frammento, opera → luogo | `accaduto-qui` |

Il frontmatter è **l'unica fonte** dei legami. Nel corpo i legami non si ripetono: nel testo si scrivono solo link markdown di passaggio. Gli inversi li calcola lo script, e il sito li mostra come "Ne parlano…".

### 2.5 Il tempo
- **Due date**: `quando` (l'evento) e `creato` (l'inserimento). Per le opere conta `anno`.
- I frammenti stanno in `frammenti/AAAA/MM/AAAAMMGG-hhmm-slug/`, una cartella ciascuno (con `index.md` e, se serve, gli allegati in `img/`). Lo slug resta unico e stabile, alla maniera di Luhmann.
- `## Ritorni` registra le rivisitazioni con la data ("2026-11-12: lo ripenso dopo…"). Non si riscrive il passato (riconsolidamento).
- **Consolidamento settimanale**, sul modello del sonno: l'AI prende i frammenti `grezzi`, propone entità e legami e scrive una voce in `diario/`. I frammenti passano allo stato `collegato`.
- Le vere **linee del tempo** nascono dalle query: "cosa mi colpiva a marzo", "come è cambiato il mio rapporto con l'assurdo".

### 2.6 I tatuaggi come progetto
Ogni progetto è una cartella `progetti/<slug>/`. Il suo `index.md` contiene lo scopo, lo `stato` (`attivo | in-pausa | chiuso`) e i `sottotipi` che valgono solo lì. I tatuaggi, per esempio, hanno `sottotipi: [spunto, idea, stile]`, e le note del progetto stanno in `progetti/tatuaggi/<sottotipo>/`.

Le entità generali (persone, opere, concetti, emozioni) **non** stanno mai dentro un progetto: sono patrimonio comune. Un frammento qualsiasi entra in un progetto con `serve-a: [tatuaggi]`. Una playlist o un saggio si aprono allo stesso modo.

### 2.7 Integrazioni dalla critica incrociata (domande, acquisizione, migrazione)
- **Frammento.** `creato` ha anche l'ora (`2026-10-31T21:00`). Si aggiungono `canale` (`telefono | chat | web | importazione`), `link: [url]` (normalizzati, con `t=` se serve) e la sezione fissa `## Testo originale`, che non si tocca mai. A `mezzo` si aggiungono `pin | link | ricordo`, a `contenuto` si aggiunge `tensione`, a `stato` si aggiunge `confluito` (con `confluito-in`). C'è anche `polarita: innalza | affonda`, facoltativa.
- **Citazione.** `verificata` vale `si | simile | no | da-verificare`, con il campo `riferimento` (pagina, minuto). Lo slug è `<autore>-<3-4 parole chiave>`. Le mie frasi hanno `autore: [io]`, una persona speciale.
- **Opere, canzoni e album.** `forma` si allarga con `poesia | podcast | mito`. `fruizione` vale `da-fare | in-corso | fatta`. Il gradimento è sempre `pancia` (non ci sono `voto` né `preferita`).
- **Idea del progetto.** `stato` vale `bozza | pronta | fatta`.
- **Predicati in più:**
  - `risponde-a` (→ domanda: è il Coro);
  - `converge-con` (simmetrico, tra tradizioni diverse);
  - `scoperto-tramite` (→ qualsiasi);
  - `sviluppa` (spunto → idea);
  - `confluito-in`;
  - su `percorso`, `tappe: [slug…]` ordinate.
- **Legami proposti** dall'AI nel frontmatter: la chiave è `proposti: {parla-di: [...], evoca: [...]}`. Quando approvo, i legami si spostano nella chiave vera.
- **Tempo:** `ritorni: [date]` nel frontmatter, che serve alle query "mai ripresi" e "rimasti vivi". Il testo dei ritorni sta in `## Ritorni`.
- **Privacy:** `visibilita: privata | pubblica`, con `privata` come default. Il sito pubblica solo le note `pubblica`.
- **Migrazione:** `slug-precedente` per la tabella dal vecchio al nuovo. All'importazione `creato` è la data del primo commit e `pancia` resta assente, mai indovinata. `## Citazione` diventa una nota `citazione` e "(da verificare)" diventa `verificata: da-verificare`.

## 3. Esempio completo: Galimberti

Messaggio dal telefono: *"ho visto uno spezzone di Galimberti, dal suo spettacolo X, diceva '…', molto interessante"*.

Il nome dello spettacolo e la frase sono quelli che l'utente scrive; qui sono segnaposto e non li invento.

**Nascono cinque file e se ne aggiornano due.**

`frammenti/2026/10/20261031-2100-galimberti-spezzone-x/index.md` (il mio, validato):
```yaml
tipo: frammento
titolo: "Spezzone di Galimberti da X"
creato: 2026-10-31
quando: 2026-10-31
mezzo: video
contenuto: citazione
pancia: 2            # chiesto a me: «quanto ti ha colpito, 1-3?»
contesto: "reel visto la sera, sul telefono"
stato: collegato
origine: mia
validata: true
cita: [galimberti-x-amore-mancanza]
fonte: [spettacolo-x]
parla-di: [amore, i-greci, tristezza, rapporti]   # proposti, vedi sotto
suscita: [malinconia]
```
Nel corpo ci sono le mie parole, `## Perché mi colpisce` (vuoto finché non lo scrivo io, oppure in un blocco proposta) e `## Ritorni`. I `parla-di` estratti dall'AI vanno in un blocco proposta finché non li approvo.

`citazioni/galimberti-x-amore-mancanza.md` (la frase è mia; il legame con lo spettacolo va verificato):
```yaml
tipo: citazione
testo: "…"                 # la frase riportata da me
autore: [umberto-galimberti]
fonte: [spettacolo-x]
lingua: it
verificata: da-verificare  # riportata a memoria da un video
pancia: 2
parla-di: [amore, i-greci]
origine: mia
validata: true             # la frase l'ho portata io
```

`persone/umberto-galimberti.md`: l'entità l'ho nominata io, quindi è `mia`. I fatti incerti si segnano "(da verificare)", e i temi che aggiunge l'AI vanno in `proposti`.
```yaml
tipo: persona
titolo: "Umberto Galimberti"
alias: [Galimberti]
anno: 1942                 # anno di nascita (da verificare)
paese: it
tradizione: [filosofia-contemporanea]
proposti: {parla-di: [i-greci, tecnica, amore]}
origine: mia
validata: true
```

`opere/spettacolo-x.md`:
```yaml
tipo: opera
forma: spettacolo
titolo: "X"                # chiedere il titolo esatto
autore: [umberto-galimberti]
anno: null                 # da verificare
origine: claude
validata: false
```

`temi/i-greci.md`, solo se non esiste già (il tema nuovo `rapporti` → `piu-ampio: [amore]`?):
```yaml
tipo: tema
titolo: "I greci"
alias: [grecia antica, mondo greco]
piu-ampio: [antichita]
origine: claude
validata: false
```

**Si aggiornano:** `temi/amore.md` e `emozioni/malinconia.md`, che non si toccano a mano: gli inversi li calcola lo script. Il `diario/` riceve la voce della sessione.

**Le domande che il sistema regge:**
- *"Le migliori citazioni di Dostoevskij"*: `tipo: citazione`, `autore ∋ fedor-dostoevskij`, ordinate per `pancia`, poi per numero di `ricordata-in`, poi per data.
- *"Citazioni filosofiche sull'amore"*: `tipo: citazione`, `parla-di ∋ amore` (anche attraverso i sotto-temi), con l'autore che ha `tradizione` dentro `filosofia`.
- *"Canzoni su questo tema, di questo genere"*: `tipo: canzone`, `parla-di ∋ tema`, `genere ⊆ rock`. Se il risultato è vuoto, l'AI propone dei brani dall'esterno come **proposta**, con titolo, album e momento, e non li salva finché non li approvo.
- *"Che cosa c'entra questo con me?"*: si parte dal frammento e si propaga di 2 passi lungo `parla-di`, `evoca` e `suscita`, pesando per forza e per `pancia` (spreading activation).

**Implementazione minima:** uno script `scripts/indice.mjs` che legge tutto il frontmatter e produce `indice.json` (nodi e archi con gli inversi). Le query si fanno da Claude su quel file, e il sito VitePress lo usa per le pagine di tema, autore e genere.

## 4. Rischi (massimo tre) e come mitigarli

1. **Esplosione e duplicati delle entità e dei temi** ("tristezza", "malinconia", "malinconico"). *Mitigazioni:*
   - gli `alias` sono obbligatori sulle entità;
   - prima di creare un nodo l'AI cerca un nodo esistente, alias compresi;
   - i temi sono semi-chiusi e quelli nuovi partono non validati;
   - lo script segnala i nomi quasi uguali;
   - il consolidamento settimanale serve anche a fondere i doppioni, con un `sinonimo-di` e un rinvio.
2. **Il grafo che diventa illeggibile, a mano e dal telefono:** troppi predicati, legami deboli ovunque, inversi da mantenere. *Mitigazioni:*
   - pochi predicati chiusi (sono 18) e `evoca` come unica valvola libera;
   - un legame si scrive una volta sola, nel frontmatter, e gli inversi li calcola lo script;
   - la verifica fallisce su predicati ignoti, su slug inesistenti e sui tipi sbagliati ai due capi.

3. **L'AI che "ricorda per me": temi, salienza e fatti inventati o dati per certi, e la deriva dal mio sguardo.** *Mitigazioni:*
   - `pancia` e `## Perché mi colpisce` li do solo io;
   - tutto ciò che l'AI estrae parte con `validata: false` o dentro un blocco proposta;
   - le citazioni hanno il campo `verificata`;
   - i fatti incerti si scrivono "(da verificare)";
   - le proposte esterne, come le canzoni, non si salvano senza approvazione.

## 5. Cosa merita di sopravvivere dell'esistente
- **`origine` e `validata` e il blocco "Proposta di Claude"**, con l'interruttore "proposte" sul sito: sono il cuore della fiducia.
- **Slug unici e stabili** e la regola **cartella = tipo**.
- **`nucleo.md`**, che diventa la prima versione di `sguardo`.
- **Le 8 domande con il loro `## Coro`** e i **percorsi**, che sono i sentieri del Memex.
- **Le discipline con i filoni**, che diventano `tradizione` con una gerarchia `parte-di`.
- **L'attributo `forma`** sulle fonti.
- **Le regole sulle citazioni** (brevi, con fonte, "(da verificare)", niente testi di canzoni) e **quelle su Pinterest** (solo link del pin normalizzato, niente immagini altrui).
- **`verifica.mjs`**, che si estende ai vocabolari e ai predicati, e il **diario** di sessione.
- **Da lasciare:** la sezione `## Collegamenti` scritta a mano e duplicata nel frontmatter, la divisione di `fonti/` per disciplina (la dice l'attributo `tradizione`) e le note di mappa sparse in radice.

## 6. Dubbi aperti
- Privacy: il repository nuovo è **privato**? Il sito resta privato, lo teniamo solo in locale, oppure pubblichiamo solo un sottoinsieme, per esempio il progetto tatuaggi? Un memo-coscienza è intimo.
- Il `genere` musicale: il vocabolario lo prendiamo da una fonte esterna (Discogs, MusicBrainz) o lo costruiamo su quello che ascolto?
