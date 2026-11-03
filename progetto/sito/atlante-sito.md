# L'autopsia del sito dell'Atlante

Per chi progetterà il sito di Mnemosyne. Qui c'è che cosa era il sito del predecessore, che cosa funzionava, che cosa era «troppo caos» e che cosa si può riusare.

**Fonti.** `[A]` è il repository `paol-imi/tattoo-shit` al commit `3a7ea794e6595c15ecdc1e6fd51de965a28841c3`, branch `claude/quirky-newton-qe5g9o`, letto in sola lettura da un clone in `/tmp/atlante`. Il codice del sito è identico a quello di `main` (`e35616b`, 8 ottobre 2026): `git diff e35616b 3a7ea794 -- .vitepress package.json .github` è vuoto. Quindi il sito pubblicato su <https://paol-imi.github.io/tattoo-shit/> è esattamente il sito di quel commit. I percorsi `progetto/…` sono di questo repository.

**Come l'ho fotografato.** L'ambiente non mi ha lasciato eseguire in locale il codice del repo esterno (`npm run docs:build`); le dipendenze si sono installate solo con `--ignore-scripts`. Ho fotografato allora il sito pubblicato, con Playwright, il 3 novembre 2026. I formati sono 390×844 (telefono, a 2×) e 1440×900 (desktop, a 1×). Ogni pagina è fotografata a proposte spente (il default); dove conta, anche con `?proposte=1`. Le 51 immagini sono in [`atlante-sito/`](atlante-sito/) e si chiamano `NOME-tel.jpg` / `NOME-desk.jpg`.

Il contenuto personale non è riportato. Le foto stanno solo in questo repository privato, anche se ritraggono un sito già pubblico.

---

## 1. Che cos'era, in una riga

Un sito statico VitePress. Si generava a ogni push dalle note markdown dell'archivio (`[A] .github/workflows/deploy.yml`: verifica, poi `vitepress build`, poi GitHub Pages). Aveva un tema «carta e inchiostro» con un solo colore, il rosso delle rubriche (`[A] .vitepress/theme/style.css:1-5`, `--atl-rubrica: #8c2f24`). Le sue porte erano tre: **Bacheca**, **Testi** e **Mappa**. Era **pubblico**: il repository e il sito erano aperti (`progetto/acquisizione.md:158`, `progetto/domande.md:163`).

In tutto sono 46 file e 7.162 righe sotto `.vitepress/` (`wc -l`, escluse cache e dist). Sono cresciute in quattro giorni:

| data | commit `[A]` | che cosa nasce |
|---|---|---|
| 4 ott | `04a88a2` | il sito: sidebar fatta dalle cartelle, ricerca locale, tema, Home, «Collegato da», embed Pinterest, deploy |
| 5 ott | `e061e32` (PR #2) | Bacheca, Tavola, Ornamento, Testi e una prima mappa a grafo (force-graph) |
| 5 ott | `3f318b7` (PR #3) | `origine`/`validata`, il blocco «Proposta di Claude», la pagina Da validare, le proposte in rosso tratteggiato |
| 5 ott | `9cfb383` | **«troppo caos»**: di default solo il validato, e l'interruttore «proposte» |
| 7 ott | `172fb32` (PR #6) | il refactor in `core/` + `viste/`, i componenti asincroni (chunk del tema da ~438 a ~62 KB) |
| 7 ott | `75a4470`, `aee7911` | **l'Atlante dei concetti**: `motore.ts` (Tavole, Ruota, Firmamento) sostituisce la mappa a grafo |
| 8 ott | `e35616b` (PR #7) | il merge. **È l'ultimo commit che tocca il sito.** |

Dopo l'8 ottobre ci sono 23 giorni di silenzio (`progetto/v2/archivio-reale.md:13`, `:68-71`) e poi, dal 31 ottobre, solo progettazione.

---

## 2. Inventario delle viste

Tutti i percorsi sono relativi a `[A] .vitepress/`. **G** vuol dire generico, cioè riusabile su un altro archivio markdown; **D** vuol dire legato al dominio (tatuaggi, domande × discipline).

### 2.1 Le pagine e i loro file

| vista | foto | file (righe) | che cosa fa |
|---|---|---|---|
| **Home** | `home-*`, `home-proposte-*` | `theme/components/AtlanteHome.vue` (156), `core/viste/home.ts` (123) · D | In testa la frase del nucleo. Poi «tre porte» con un'icona incisa e un conteggio («5 tavole · 4 pin», «8 domande · 134 voci · 219 fili»), poi un estratto della bacheca, i percorsi e le idee per stato. |
| **Mappa / Atlante dei concetti** | `mappa-*` | `theme/components/atlante/motore.ts` (1686, `@ts-nocheck`, «il JS del prototipo portato così com'è», riga 1), `MappaAtlante.vue` (144), `filtra.ts` (123), `stile.css` (501), `core/viste/atlante.ts` (201) · D | Tre viste della stessa rete «domande × discipline» (si veda §2.2). |
| **Bacheca** | `bacheca-*`, `bacheca-proposte-desk` | `Bacheca.vue` (247), `Tavola.vue` (126), `Ornamento.vue` (237, 16 disegni SVG), `core/viste/bacheca.ts` (149), `core/pin.ts` (71), `pinterest.ts` (46) · D | Un muro a colonne di «tavole»: idee e spunti, con il pin Pinterest incorporato o, senza pin, una **tavola tipografica** con un ornamento inciso, scelto dal primo simbolo collegato (`bacheca.ts:49,97`). Filtri `tipo`, `stato`, `nodo`, `q` nell'URL (`Bacheca.vue:26`); i chip dei nodi portano a `/bacheca?nodo=…`. |
| **Testi** | `testi-*` | `Testi.vue` (139), `core/viste/testi.ts` (72), `core/testo.ts` (113) · G\* | «Le parole che potrei portare addosso»: ogni citazione `>` dell'archivio, composta come un saggio di stampa, con il capolettera rosso. È raggruppata per fonte e ha la **misura** (breve fino a 90 caratteri, lunga oltre 320 o con più di 6 righe). Filtri `fonte` e `misura` nell'URL; contatore `aria-live`. |
| **Da validare** | `da-validare-*` | `DaValidare.vue` (95), `core/viste/validare.ts` (105), `core/proposte.ts` (97) · G | Mostra sempre tutto: «124 note proposte · 42 proposte nelle tue note · 164 collegamenti» (foto `da-validare-desk`). Al telefono è alta **54.491 px**. |
| **Pagina di nota** (concetto, simbolo, fonte, idea, emozione, domanda, disciplina, percorso, ricerca, spunto, stile, diario, nucleo) | `concetto-*`, `idea-*` e le altre | il layout di default di VitePress più `CollegatoDa.vue` (32), `Scheda.vue` (96), `core/viste/note.ts` (90), `theme/pagina.ts` (12) · G | Una riga in testa con il tipo e i rimandi «→ sulla mappa», «→ N tavole in bacheca». Poi il corpo markdown con le sezioni del template, `## Collegamenti` per tipo, e **«Collegato da»**, cioè i backlink raggruppati per tipo. A sinistra una sidebar con 14 gruppi generata dalle cartelle (`config.mts:18-74`), a destra l'indice «In questa pagina». In fondo «Modifica su GitHub» e la data dell'ultima modifica. |
| **Interruttore «proposte»** | in alto in ogni foto; acceso in `*-proposte-*` | `Interruttore.vue` (28), `shared/proposte.ts` (28), `theme/proposte.ts` (43), `config.mts:94` · G | Si veda §2.3. |
| **Ricerca** | — | la ricerca locale di VitePress (`config.mts:163`), solo sul validato · G | |

Il resto è infrastruttura generica:
- `core/archivio.ts` (235): legge i file, ha un parser minimale del frontmatter, una cache e i link interni; contiene `BASE='/tattoo-shit/'` cablato alla riga 18.
- `core/blocchi.ts` (115) e `proposta.ts` (76): riconoscono il blocco `> [!NOTE] **Proposta di Claude…**`.
- `collegamenti.ts` (83): marca i link proposti.
- `theme/url.ts` (31) e `shared/indirizzo.ts` (15): tengono i filtri nella query string.
- `theme/*.data.ts`: i loader di VitePress, uno per vista.
- CSS: `style.css` (353) e `pagine.css` (897).

### 2.2 La mappa nel dettaglio (`motore.ts`)

**Tavole** (`motore.ts:299-508`) è la vista d'ingresso. Le 8 domande sono schede: titolo grande, tre parole in corsivo, «55 risposte da 7 discipline». Sotto ciascuna c'è il **coro**, cioè le citazioni che rispondono, con un pallino del colore della disciplina e l'autore. In fondo c'è «✦ Le tue», le cose dell'utente, con il bordo tratteggiato se sono proposte (foto `mappa-proposte-desk`). «Parti da Domanda / Disciplina» rovescia l'incrocio.

**Ruota** (`:509-948`, SVG) ha anelli concentrici: al centro le domande, poi le discipline, le emozioni, i simboli e, fuori, «le tue cose». Si trascina un anello per girarlo, o si preme «Gira le ruote». A destra, «**Allineati sul raggio di mezzogiorno**» elenca che cosa sta sulla stessa linea: una domanda, una voce di scienza, un'emozione, un concetto, una tua idea. È una macchina per trovare convergenze tra mondi lontani (`convergenza`, `:811`). Foto `mappa-ruota-*`.

**Firmamento** (`:949-1482`, canvas e d3-zoom) dispone le discipline come regioni del cielo e le domande come **costellazioni** da accendere. Lo zoom è **semantico**, su quattro livelli: Regioni → Filoni → Nomi → Frasi (`:951`). Ci sono anche «Salto», per un volo a caso (`salto`, `:1419`), e il layout con seme fisso (`layoutCielo`, `:971`). Foto `mappa-firmamento-*`.

Valgono per tutte e tre le viste:
- `vaiA` (`:209`) è il gesto unico per andare a un nodo;
- la **scheda laterale** (`renderDettaglio`, `:1484`) mostra la frase che riassume il nodo, il coro e «Chi risponde: 10 mondi»; sul telefono diventa un foglio dal basso (`misuraFoglio`, `:1560`). Foto `mappa-scheda-*`;
- il **Filo** è il percorso che hai fatto, al più 16 passi (`aggiungiFilo`, `:202`);
- **Salva tavola** salva in localStorage (`:274-292`);
- `?nodo=ID` apre un nodo all'avvio (`:1664`);
- `prefers-reduced-motion` è rispettato (`:55`, `stile.css:480`);
- ci sono ruoli ARIA (tablist e tabpanel, `MappaAtlante.vue:66-137`). Da tastiera però funziona solo Esc, e il canvas non ha un'alternativa testuale.

### 2.3 L'interruttore «proposte»

Uno script in `<head>` mette la classe `mostra-proposte` su `<html>` prima del primo disegno, così non c'è il lampo di contenuto e l'idratazione non va in disaccordo (`shared/proposte.ts:15`, `config.mts:94`). La classe dipende da `?proposte=1/0`, altrimenti da `localStorage['atlante-proposte']`.

Che cosa nasconde:
- i blocchi proposta, i titoli fatti solo di proposte e i link proposti, via CSS (`pagine.css:819-822`);
- le note non validate, ma solo dalla sidebar e dalla ricerca: la pagina resta raggiungibile;
- le proposte nei backlink, nella bacheca, in Testi e sulla mappa, che quando l'interruttore cambia si smonta e si rimonta (`MappaAtlante.vue:44`, `filtra.ts:94`).

Ci sono due falle:
- `citazione.proposta` non è filtrato, quindi una citazione scelta da Claude dentro una nota validata compare sulla mappa anche a proposte spente;
- `costellazioni.nodiProposti` è ignorato del tutto (`filtra.ts:12`).

### 2.4 Il modello dei dati che il sito leggeva

Le note markdown hanno un frontmatter piatto (`core/archivio.ts:35`). I campi letti sono:
- `tipo`, che altrimenti si deduce dalla cartella (`shared/tipi.ts:5,13`);
- `titolo`, `stato`, `formato`, `data`, `creato`, `disciplina`;
- `origine` (`seme` · `mia` · `claude`) e `validata`, che se manca vale `origine !== 'claude'` (`shared/nota.ts:12`);
- `risonanza` (1–5);
- le chiavi di collegamento di `CAMPI_LINK` (`domande`, `concetti`, `fonti`…, `tipi.ts:34`).

Le proposte dentro una nota sono blocchi `> [!NOTE]`. I backlink si calcolano dai link del corpo (`core/viste/note.ts:22-50`). La mappa riceve un JSON del tipo `{domande[], discipline[], filoni[], nodi[{…, citazione{testo,fonte,verificata,proposta}, domande[], domandeProposte[], validata}], legami[{da,a,tipo,proposto}], costellazioni[]}` (`core/viste/atlante.ts:18-80`).

La differenza da Mnemosyne è di fondo:
- l'unità era la **nota-pagina**, scritta e riscritta, non il frammento datato e immutabile;
- la provenienza era un **booleano** (validata / proposta) più un blocco di testo, non un segno per ogni voce (✦ ✧ ● ◌ ○ ⚠);
- il **tempo** non c'era: solo il diario e «Ultima modifica».

---

## 3. Le prove sull'uso reale

- **Non esistono dati d'uso**: niente analytics, niente conteggi di visite, in nessuno dei due repository. Ogni frase su quanto il sito fosse usato è un'inferenza.
- La frase «nell'Atlante la mappa visiva non è stata usata» è **di Claude**, non dell'utente (`progetto/v2/piano.md:717-718`). Rimanda all'archivio reale, che però non contiene un dato d'uso del sito. Il fatto su cui poggia è che dopo il merge della mappa (8 ottobre) l'utente non è tornato per 23 giorni (`archivio-reale.md:13`). È un indizio, non una prova: non tornò nemmeno per il resto.
- **Le parole dell'utente sul sito sono tre:**
  1. «vai con la mappa», l'approvazione del prototipo il 7 ottobre (`[A] diario/2026-10-07-atlante-dei-concetti.md:11`). È «l'unico sì entusiasta: a una **vista**, non a un contenuto» (`progetto/v2/essenza.md:24-25`).
  2. «Il sito mostrava tutto, con i segni rossi: troppo caos» (`[A] diario/2026-10-05-validazione.md:53`; commit `9cfb383`). Va notato che il diario è scritto da Claude in prima persona: la frase è riportata come dell'utente (`progetto/v2/archivio-reale.md:57`, `eredita.md:109`), ma non è una trascrizione verbatim verificabile.
  3. Il «Sì al sito, alla Bacheca, all'Atlante» come approvazione della **struttura, mai del contenuto** (`archivio-reale.md:52`).
- **Il comportamento.** Le decisioni sono 0 su ~130 proposte e 168 collegamenti (`archivio-reale.md:12,34`). Le 38 sezioni «_Nessun pin collegato._» e le 44 righe identiche di `## Evoluzione` sono rimaste vuote o automatiche (`archivio-reale.md:145-148`). Le discipline hanno zero link in entrata, le 8 domande 56 (`archivio-reale.md:256`). «Torni quando c'è qualcosa da *vedere*» (`essenza.md:28`), e da qui il principio 9, «Vedere, non sfogliare» (`essenza.md:88-89`).
- **La consegna del modello v3 per le viste** (`progetto/v2/modello-v3.md:920-925`, §6.3). Le viste si calcolano e non si salvano:
  - la pagina di un nodo, con 3–5 «porte» (i frammenti più forti con data), poi le convergenze, poi il resto per modalità;
  - la linea del tempo;
  - il ritratto;
  - le assenze, al massimo tre.

  Ogni elenco ha una voce della coda lunga. La tappa 2 prevede un sito privato «generato da `contesto/` e dai nodi, dietro login» (`piano.md:705-718`).

---

## 4. Il giudizio

### 4.1 Le «idee carine», con le prove

1. **La mappa come vista d'insieme, l'unica che ha acceso l'utente.** L'incrocio «le domande che mi faccio × chi ci ha risposto» trasforma un archivio per tipi in una domanda. Il dato forte non è il grafo ma l'**orientamento**: si entra da una domanda, non da una cartella. Prova: «vai con la mappa»; la mappa a grafo (force-graph, `e061e32`) fu *sostituita* da questa (`aee7911`).
2. **Lo zoom semantico del Firmamento.** Allontanandosi si vedono le regioni, avvicinandosi i nomi e poi le frasi (`motore.ts:951`). È la soluzione giusta al «molti frammenti piccoli rendono il grafo illeggibile» (`progetto/acquisizione.md:159`): il dettaglio compare solo quando c'è spazio per leggerlo.
3. **La Ruota e il «raggio di mezzogiorno».** Una convergenza si fa *vedere*: cose di mondi diversi allineate sulla stessa linea (foto `mappa-ruota-desk`). È la «convergenza con una direzione» di `CLAUDE.md`, resa come gesto fisico.
4. **Il coro sotto la domanda.** Le citazioni sono la risposta «a colpo d'occhio», ciascuna con il suo autore e la sua disciplina (foto `mappa-proposte-desk`). La frase di un altro in corsivo, con il luogo accanto, è già la grammatica del ○.
5. **Testi come saggio di stampa.** È la pagina più bella e la più riusabile (`progetto/migrazione.md:57`, «il più riusabile»): tipografia seria, il capolettera rosso, la **misura** come filtro (breve, media, lunga), il gruppo per fonte. Foto `testi-tel`.
6. **La tavola tipografica con l'ornamento**, quando non c'è un'immagine: il vuoto diventa composizione, non un riquadro grigio (`Tavola.vue:34`, `Ornamento.vue`). Foto `home-proposte-giu-desk`.
7. **L'estetica «carta e inchiostro» con un solo colore**: serif da libro, carta calda, rubrica rossa (`style.css:1-21`). È coerente con «un amico colto che parla poco».
8. **Ogni vista porta alle altre.** «→ sulla mappa», «→ 3 tavole in bacheca» in testa alla nota, poi «Collegato da» raggruppato per tipo (foto `concetto-desk`). I filtri nell'URL rendono condivisibile ogni stato, e `?nodo=` apre la mappa su un punto preciso.
9. **Il Filo di Arianna e Salva tavola**: il percorso che hai fatto resta visibile e si può tenere (`motore.ts:202,274`).
10. **I dettagli di mestiere**: niente lampo all'avvio (lo script in head), il foglio dal basso sul telefono, `prefers-reduced-motion`, i bersagli da 44 px con `pointer: coarse`, i componenti asincroni e il motore d3 caricato solo sulla mappa.

### 4.2 Che cosa era «troppo caos», e perché

1. **Le proposte erano sette volte il contenuto dell'utente.** Ho contato sul sito pubblicato:
   - Bacheca: **5** tavole a proposte spente, **37** accese;
   - Testi: **2** contro **16**;
   - Mappa: «**0 risposte da 0 discipline**» in ogni domanda a proposte spente (foto `mappa-desk`), da 50 a 76 risposte per domanda accese (foto `mappa-proposte-desk`).

   Il «troppo caos» non era un problema di stile: il sito mostrava soprattutto Claude.
2. **L'interruttore binario non risolve: sceglie tra vuoto e rumore.** Spento, la mappa (la vista amata) è vuota e la home dice «2 testi». Acceso, ogni pagina si riempie di bordi rossi tratteggiati e di etichette «PROPOSTA DI CLAUDE · DA VALIDARE» (foto `bacheca-proposte-desk`, `idea-proposte-desk`). «Più di un terzo dell'archivio è invisibile di default» e «l'interruttore spento ha nascosto le proposte anche a lui» (`essenza.md:68-69`, `archivio-reale.md:148`).
3. **Il rosso voleva dire due cose.** Era il colore dell'identità (link, titoli, capolettera, conteggi: `--vp-c-brand-1: var(--atl-rubrica)`, `style.css:18`) e anche il segnale «proposta da validare». Quando il segnale ha lo stesso colore della decorazione, ogni pagina sembra un compito corretto.
4. **La validazione era un cancello, e il cancello è diventato una pagina-arretrato.** Da validare è alta 54.491 px al telefono, con 124 + 42 + 164 voci. Le decisioni prese sono state 0. Il principio di Mnemosyne è l'opposto: «Provenienza sì, cancello no» (`essenza.md:66-70`).
5. **La struttura prima del contenuto.** Ci sono 8 voci di menu, una sidebar con 14 gruppi, 3 viste della mappa, l'interruttore e «da validare». Le pagine sono fatte di sezioni-template vuote: «Nessuna immagine ancora», «Nessun pin collegato», «Evoluzione» automatica (foto `idea-proposte-desk`; 38 sezioni vuote, `archivio-reale.md:146`). Le tassonomie, le discipline, non le usava nessuno (zero link in entrata). E «Collegamenti» e «Collegato da» ripetono quasi la stessa lista.
6. **La voce dell'utente era in fondo.** Sulla mappa le cose dell'utente stanno in coda a ogni colonna («✦ Le tue»), nell'anello più esterno della Ruota e al centro, indistinte, nel Firmamento. In cima ci sono le citazioni scelte da Claude. È il contrario di «ogni pezzo parte da una mia frase ✦ con la data» (`CLAUDE.md`, La voce).
7. **A distanza, il cielo non si legge.** Nella vista d'insieme del Firmamento le etichette si sovrappongono ai grappoli di punti, e regioni come «Psicologia» o «Simboli e concetti» restano illeggibili (foto `mappa-firmamento-desk`).
8. **Mancava il tempo.** Nessuna vista ordinava per data: il sito era un'enciclopedia, non una memoria. Per Mnemosyne la data è la metà del significato («datate e intatte»).
9. **Era pubblico, con i tracker.** La bacheca carica `widgets.pinterest.com`, `log.pinterest.com` e `i.pinimg.com` (misurato con Playwright). Sul sito ci sono «Modifica su GitHub» e la storia completa del repository. Per un archivio con lutti e persone della vita è inaccettabile (`CLAUDE.md`, Privacy).
10. **Il codice era pesante dove contava.** `motore.ts` ha 1.686 righe `@ts-nocheck`, legate allo schema domande × discipline («bella ma pesante», `progetto/migrazione.md:55`). Il filtro delle proposte perde pezzi (§2.3).

---

## 5. Il riuso

### 5.1 Codice

| pezzo `[A] .vitepress/` | verdetto | perché |
|---|---|---|
| `theme/style.css`, `pagine.css` (token, serif, carta, rubrica, media query, `:focus-visible`, 44 px) | **sì, come punto di partenza** | L'estetica regge. Il rosso va però tolto dal ruolo di segnale (§4.2.3). |
| `Testi.vue`, `core/viste/testi.ts`, `core/testo.ts` (impaginazione, misura, gruppo per fonte, deduplica) | **sì, da adattare** | Diventa la vista delle citazioni e delle «mie frasi». Le fonti vanno lette dai nodi `citazioni/` e `opere/` con `esito` e `riferimento`, non dai blocchi `>`. |
| `CollegatoDa.vue`, `core/viste/note.ts` (backlink raggruppati) | **sì, l'idea; il codice in parte** | In Mnemosyne i legami sono nel frontmatter delle letture, con un predicato: si raggruppano per predicato e per segno, non per cartella. |
| `theme/url.ts`, `shared/indirizzo.ts` (filtri nella query string) | **sì** | Generici, 46 righe. |
| Lo schema dello script in head anti-lampo (`shared/proposte.ts:15`) | **sì, lo schema** | Serve per ogni preferenza di vista (tema, strato ◌ visibile o no). |
| I loader `*.data.ts` di VitePress | **sì, se si resta su VitePress** | Il modello «una vista = un loader che calcola un JSON al build» coincide con §6.3: le viste si calcolano e non si salvano. |
| `Ornamento.vue` (16 SVG incisi) | **forse** | Bello. Ma i disegni sono simboli da tatuaggio (vite, clessidra, chiave…). Si può riprendere l'idea dell'ornamento per i temi; i disegni andrebbero rifatti. |
| `motore.ts` (Tavole, Ruota, Firmamento) | **no il codice, sì le idee** | 1.686 righe portate da un prototipo, `@ts-nocheck`, cablate su domande × discipline. Le idee da riscrivere sono lo zoom semantico a livelli, il volo verso un nodo, il layout con seme fisso, il foglio dal basso e il Filo. |
| `core/archivio.ts` (parser del frontmatter) | **no** | Mnemosyne ha `schema/frontmatter.json`, script propri e `contesto/`: il sito deve leggere quelli, non un secondo parser. `BASE` è cablato. |
| `proposta.ts`, `core/blocchi.ts`, `collegamenti.ts`, `core/proposte.ts`, `DaValidare.vue`, `Interruttore.vue` | **no** | Servono un modello (blocchi proposta nel testo, `validata` booleano) che Mnemosyne ha abolito: niente code di validazione. |
| `Bacheca.vue`, `Tavola.vue`, `pinterest.ts`, `core/pin.ts` | **no** | Legati ai pin e ai tatuaggi. In più l'embed Pinterest è un tracker («i pin restano link», `CLAUDE.md`). |
| La sidebar generata dalle cartelle (`config.mts:18-74`) | **no** | È la navigazione per tipo che ha prodotto i 14 gruppi. |
| `deploy.yml` su GitHub Pages | **no** | Pubblico. Serve un hosting privato dietro login (`piano.md:705-718`; opzioni in `progetto/migrazione.md:88-92`). |

### 5.2 Idee, senza codice

- La **domanda come porta d'ingresso**: la vista parte da una domanda, non da una cartella.
- Il **coro**: le frasi accanto a chi le ha dette, con il luogo.
- L'**allineamento** come prova visiva di una convergenza.
- Lo **zoom che cambia che cosa si vede**, non solo quanto è grande.
- I **conteggi sobri nelle porte** («8 domande · 134 voci»): in Mnemosyne vengono da `contesto/mappa.md`, mai a occhio.

---

## Che cosa prendere per Mnemosyne

1. **Niente interruttore binario: ogni frase col suo segno, e lo strato dell'AI come livello separato.** Il «troppo caos» nasceva dal fatto che Claude era sette volte l'utente e che l'unico rimedio era spegnerlo, lasciando la mappa vuota (`mappa-desk`: «0 risposte»). In Mnemosyne, in ogni pagina:
   - in testa vengono le frasi ✦ (e ✧ a parte);
   - il ● sta nel corpo;
   - lo strato ◌ è un livello visibile ma separato e più quieto, come prevede la ricetta «nella mia testa» di `CLAUDE.md`;
   - il ○ ha sempre opera e passo.

   La provenienza si legge dal segno, non da un cancello.
2. **La mappa resta, ma deve partire dalle parole dell'utente.** «Vai con la mappa» è l'unico sì entusiasta a una vista. Si conserva la forma: si entra da una domanda o da un tema, il coro sta sotto, la scheda di lato o dal basso. Il contenuto si rovescia: prima le 3–5 «porte» ✦ datate (§6.3), poi le convergenze, poi il mondo ○. Domande × discipline era impalcatura di Claude: in Mnemosyne i poli sono i temi che nomina l'utente (✦, «I nomi li do io»).
3. **Il tempo è un asse primario, che l'Atlante non aveva.** Servono una linea del tempo per mese con le parole dell'utente, le posizioni con «dal / messa in discussione il», i cambi di lettore segnati. Ogni pagina di nodo ha le sue date. È la differenza tra un'enciclopedia e una memoria.
4. **Lo zoom semantico del Firmamento è il modello per tenere insieme il tanto e il poco.** Da lontano i temi, poi le vicende, poi i frammenti, poi la frase alla lettera. Senza questo, «molti frammenti piccoli rendono il grafo illeggibile» (`acquisizione.md:159`), come si vede nella foto `mappa-firmamento-desk`.
5. **La tipografia di Testi è la base per la voce.** Le «mie frasi» e le citazioni vanno composte come in Testi: serif, misura, gruppo per fonte, nota «trascritte da Claude» una volta in testa al gruppo, data-tetto per gli importati (regole 1 e 6). Va ripresa `Testi.vue` con le sue righe sulla misura.
6. **Un colore non può essere insieme identità e segnale.** La palette si può tenere, ma ⚠ e ◌ vanno resi con forma e peso (il segno, il tondo, un tratto più chiaro), non con il rosso del marchio. Il ⚠ deve vedersi, «mai nascosto», senza fare di ogni pagina un compito corretto.
7. **Poche porte, nessuna sezione vuota.** Bastano tre ingressi come nella home dell'Atlante: per esempio l'ultima lettera, la mappa e le mie frasi. Niente sidebar per cartelle, niente sezioni-template vuote («Nessun pin collegato»), niente arretrati («Da validare»). Il vuoto si dice in una riga («Niente si aggancia ancora.»), non si impagina.
8. **I delicati e le persone della vita si filtrano al build, non con il CSS.** L'Atlante nascondeva le proposte con `display:none` e la pagina restava raggiungibile all'indirizzo. In Mnemosyne:
   - un frammento `delicato` non entra in nessuna vista spontanea finché un frammento successivo non ci torna sopra;
   - le persone `cerchia: vita` non generano una pagina pubblica;
   - nessun embed di terze parti: niente Pinterest, niente oEmbed lato client, nessuna chiamata esterna dal browser.
9. **Privato per costruzione.** Hosting dietro login, nessun «Modifica su GitHub», nessuna storia git esposta, ricerca locale nel bundle privato. È una condizione di partenza, non un ritocco.
10. **Il sito si genera da `contesto/` e dai file, come l'Atlante si generava dalle note: niente database.** Il modello «un loader per vista, un JSON al build» va bene. Può leggere i file calcolati (`mappa.md`, `parole.md`) e le letture, mai scriverli. Tutti i numeri delle porte vengono da `mappa.md`.
11. **Ogni vista rimanda alle altre e ogni stato ha un indirizzo.** Da tenere: «→ sulla mappa», `?nodo=`, i filtri nella query string, il Filo di Arianna. Il Filo è la versione visiva di «che cosa collega A e B».
12. **Il mestiere da conservare:** niente lampo all'avvio, il foglio dal basso sul telefono, `prefers-reduced-motion`, i bersagli da 44 px, il codice pesante caricato solo dove serve. In più ciò che mancava: la tastiera sulla mappa e un'alternativa testuale al canvas.

---

## Dubbi aperti

- **Non è provato che la mappa non sia stata usata.** Non ci sono analytics: c'è solo il silenzio dopo l'8 ottobre, che riguarda tutto l'archivio. Va chiesto all'utente se ha aperto la mappa dal telefono e quale delle tre viste.
- **«troppo caos» è una citazione indiretta**, scritta da Claude nel diario in prima persona (`[A] diario/2026-10-05-validazione.md:53`). La sostanza è confermata dalla richiesta che ne è seguita (`9cfb383`), non la lettera.
- **Quale vista della mappa piacesse non si sa.** «Vai con la mappa» approvava un prototipo (`S/prototipo-mappa/atlante.html`, `motore.ts:1`) che non è nel repository.
- **VitePress o altro?** I loader e il tema sono riusabili. Restano due domande per chi progetta: il login, e il fatto che un sito di frammenti datati ha più pagine calcolate che pagine markdown. Questa autopsia non lo decide.
- **Le foto sono del sito pubblicato, non di una build locale.** Il codice è lo stesso del commit (§ Fonti), ma Ruota e Firmamento sono stati fotografati solo a proposte accese e nello stato iniziale.
