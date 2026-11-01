# Progetto: inventario e migrazione

> Bozza di progettazione, 2026-10-31. Non è stato toccato nulla: note, cartelle e script restano com'erano.
> Obiettivo: passare da un archivio di idee per tatuaggi a un **memo-coscienza** (citazioni, brani, canzoni,
> libri, pensieri, con temi ed emozioni) da interrogare con l'AI. I tatuaggi diventano una nicchia o spariscono.

## 1. Inventario

### Note (circa 300)

| Area | N | Verdetto | Note |
|---|---|---|---|
| `fonti/` (6 sottocartelle) | 153 | **generico** | Autori, opere, miti: anno, filone, autore, influenzato-da, `## Citazione`. Il cuore da salvare. 99 su 153 sono `claude`/non validate |
| `concetti/` | 26 | **generico** | Temi. 22 su 26 linkano idee di tatuaggio (link tagliabili) |
| `emozioni/` | 14 | **generico** | Corpo breve, solo significato |
| `domande/` | 8 | **generico** | Le 8 grandi domande con il `## Coro`: ottima impalcatura per "citazioni su X" |
| `discipline/` + filoni | 7 | **generico** | Tassonomia del sapere (filosofia, religioni, arte…) |
| `simboli/` | 25 | generico, tinto | Significato autonomo, ma 22 su 25 linkano idee |
| `percorsi/` | 5 | generico, tinto | Fili tra nodi; tutti legati a idee |
| `spunti/` | 3 | **generico** | Frammento + "perché mi colpisce" = nota di lettura/ascolto |
| `ricerche/` | 2 | **generico** | Piste con stato, oggetto, link |
| `diario/`, `inbox/`, `_archivio/` | 11 / 1 / 2 | generico (meccanismo) | Il diario parla di tatuaggi in 7 voci su 11 |
| `nucleo.md` | 1 | generico, da riscrivere | Oggi è un manifesto sul tatuaggio |
| `idee/` | 34 | **tatuaggi** | placement, formato, sleeve, stato "tatuata"; 32 non validate |
| `stile/` | 9 | **tatuaggi** | Tecnica e composizione del tatuaggio |
| Pinterest / immagini | 6 pin, 0 immagini | da buttare (per la base) | Quasi inutilizzati |

Contaminazione: nel **testo** delle note generiche il tatuaggio compare sotto il 5%; il legame passa quasi tutto dai
**collegamenti verso `idee/`**, che uno script può tagliare.

### Script e controlli

| Pezzo | Righe | Verdetto |
|---|---|---|
| `scripts/verifica.mjs` | 230 | **generico** nei controlli 1–7: slug unici, link rotti, frontmatter ↔ `## Collegamenti`, ritorni, orfane, riepilogo |
| └ provenienza (`origine`/`validata`, blocchi proposta, coerenza col sito) | – | **generico** per una base gestita con Claude |
| └ filoni, `disciplina`, `forma`, `anno`, `autore` | – | specifico di questo schema: da trasformare in regole sui campi dichiarate |
| └ eccezioni cablate (`NON_ANALIZZARE`, tipi esenti) | – | da buttare / da spostare in config |
| `scripts/immagini.mjs` | 30 | generico (WebP, 2000 px) |
| `package.json`, `deploy.yml` | – | generico (Node 22, VitePress, verifica → build → Pages) |

Lo schema dei tipi è già centralizzato in `.vitepress/shared/tipi.ts` (128 righe): è di fatto il file di config, solo
che è codice. Renderlo dichiarativo: mezza giornata; regole sui campi generiche: 1–2 giorni.

### Sito VitePress (circa 7.200 righe)

| Pezzo | Righe | Verdetto |
|---|---|---|
| `core/archivio.ts` (lettore unico delle note, usato anche da verifica) | 235 | **generico**; `BASE='/tattoo-shit/'` cablato |
| `core/testo.ts`, `core/discipline.ts`, backlink (`viste/note.ts`, `CollegatoDa.vue`) | ~330 | **generico** |
| Proposte: `blocchi.ts`, `proposta.ts`, `collegamenti.ts`, `proposte.ts`, `Interruttore.vue`, `theme/proposte.ts` | ~420 | **generico** (validazione umano/AI); la parte "migrazione fase 1" è da buttare |
| `viste/testi.ts` + `Testi.vue` (tutte le citazioni, filtri per fonte e misura) | 211 | **generico, il più riusabile** |
| `viste/validare.ts` + `DaValidare.vue` | 200 | **generico** |
| `theme/url.ts` (filtri nella query string) | 31 | generico |
| Mappa/Atlante (Tavole, Ruota, Firmamento; `motore.ts` 1686 righe `@ts-nocheck`) | ~2.650 | tatuaggi/atlante: bella ma pesante, legata a domande × discipline |
| Bacheca + pin + `Ornamento.vue` | ~830 | tatuaggi |
| Home (`AtlanteHome.vue`) | ~280 | tatuaggi (nucleo, idee per stato) |
| `style.css`, `pagine.css` (estetica da libro antico) | ~1.250 | tema riusabile se piace |

Nucleo generico: circa **1.500 righe** ben separate. Ricerca: solo testo pieno locale; nessun filtro per emozione;
**nessun indice JSON su disco**, ma i dati esistono già come funzioni pure (`datiAtlante`, `datiTesti`):
un `scripts/indice.mjs` di poche decine di righe può scriverli.

## 2. Cosa manca alla nuova base

- **Unità atomica.** Oggi la citazione vive dentro la fonte (una per nota). Per "le migliori citazioni di Dostoevskij"
  o "canzoni su X di questo genere" servono note proprie: `citazione`, `brano` (canzone), `opera` (libro, film, album),
  `persona` (autore, artista), `pensiero` (mio). Ognuna con temi ed emozioni come collegamenti.
- **Attributi interrogabili:** `genere`, `lingua`, `anno`, `voto`/`preferita`, `contesto` (dove l'ho incontrata).
- **Indice per l'AI:** un JSON generato (nodi, legami, attributi, testo breve) che Claude legge per rispondere,
  più un `CLAUDE.md` con le ricette di interrogazione.
- **Privacy:** pensieri personali e reazioni non possono stare su un repo pubblico.
- **Diritti:** testi di canzoni mai riprodotti (già regola); citazioni brevi. Vale ancora di più in pubblico.

## 3. Opzioni

| | Cosa | Pro | Contro |
|---|---|---|---|
| **A** | Evolvere questo repo | Nessuna migrazione, storia intatta | Repo **pubblico**: niente pensieri personali; nome e schema nati per i tatuaggi; si rompe ciò che funziona |
| **B** | Nuovo repo per la parte generica; i tatuaggi restano qui | Separazione netta; qui non si rompe nulla; il nuovo nasce privato | Due repo da curare; collegare un'idea di tatuaggio a una citazione richiede un link esterno |
| **C** | Nuovo repo con i tatuaggi come sottoprogetto (`progetti/tatuaggi/`) | Un solo grafo: l'idea di tatuaggio linka la citazione | Porta dentro schema e codice dei tatuaggi; più lavoro subito |
| **D** | Ripartenza da zero: nuovo repo, schema nuovo, si importano solo le note di valore | Schema pensato per il memo-coscienza; nessuna inerzia; codice snello | Si riscrive parte del sito; serve uno script di importazione |

### Pubblico / privato

| Soluzione | Costo | Note |
|---|---|---|
| Repo privato + GitHub Pages | piano a pagamento (Pro, ~4 $/mese, da verificare) | E il sito resta comunque pubblico, salvo Enterprise |
| Repo privato + **Cloudflare Pages** + Cloudflare Access | gratis per uso personale (da verificare limiti attuali) | Sito protetto da login (email); build dal repo privato |
| Repo privato + Netlify | gratis il sito; la protezione con password è a pagamento (da verificare) | Più semplice ma meno privato |
| Repo privato, **sito solo locale** (`npm run docs:dev`) | gratis | Zero rischi; niente consultazione dal telefono, salvo l'app Claude sul repo |
| Pubblico + privato | gratis | Repo privato con tutto; uno script esporta su un repo/sito pubblico solo le note marcate `pubblico: true` |

### Raccomandazione: **D con il motore di B**, privato

1. **Nuovo repo privato** (nome da scegliere), schema nuovo pensato per citazioni, brani, opere, persone, pensieri.
   Si parte da zero sulla struttura, **non sul codice**: si porta il motore generico (~1.500 righe: lettore, verifica,
   proposte, Testi, Da validare, backlink) reso configurabile da uno `schema` dichiarativo.
2. **Si importano con uno script** le note di valore: fonti, concetti, emozioni, domande, discipline, simboli,
   spunti; le citazioni escono dalle fonti e diventano note proprie. Si tagliano i link verso `idee/` e `stile/`.
   `origine`/`validata` restano: 99 fonti di Claude arrivano ancora "da validare".
3. **Questo repo resta com'è**, pubblico, come progetto tatuaggi (si congela o continua). La Mappa/Atlante non si
   porta subito: si valuta dopo, quando il nuovo grafo ha la sua forma.
4. **Sito:** Cloudflare Pages + Access (privato, dal telefono); in alternativa, all'inizio, solo locale.

Perché: la privacy esclude A; C trascina dentro ~3.500 righe specifiche e lo schema dei tatuaggi; D puro butterebbe
un motore che funziona e passa la verifica. Il rischio di rompere qualcosa è nullo, perché qui non si tocca niente.
L'utente ha dato il via libera a ripartire: lo si fa sullo schema, dove l'inerzia pesa, non sul codice sano.

## 4. Piano a fasi (da non eseguire ora)

**Fase 0. Decisioni** (vedi sezione 5). Nessun file.

**Fase 1. Scheletro del nuovo repo** (½–1 giorno)
- Repo privato; `package.json`, `deploy` verso l'host scelto, `CLAUDE.md` nuovo (riprende lingua, slug, link,
  validazione, citazioni brevi; toglie Pinterest, immagini, tatuaggi).
- Copia del motore generico: `core/archivio.ts` (BASE configurabile), `testo.ts`, `blocchi.ts`, proposte,
  `verifica.mjs`, `immagini.mjs`.
- `schema.ts` dichiarativo: tipi → cartelle, campi di collegamento, campi attributo (enum/intero/slug, obbligatori),
  tipi con provenienza obbligatoria, esenzioni da ritorno e orfane.

**Fase 2. Schema nuovo e template** (½ giorno)
- Cartelle proposte (da validare con l'utente): `citazioni/`, `brani/`, `opere/`, `persone/`, `pensieri/`,
  `temi/` (ex concetti), `emozioni/`, `simboli/`, `domande/`, `discipline/`, `percorsi/`, `ricerche/`, `inbox/`,
  `diario/`, `_archivio/`.
- Template per ognuno; `nucleo.md` nuovo, scritto con l'utente.

**Fase 3. Importazione con script** (1 giorno, `scripts/importa.mjs` nel nuovo repo, legge questo in sola lettura)
- `fonti/*` con `forma: autore` → `persone/`; `forma: opera` → `opere/`; miti → `opere/` o `simboli/` (da decidere).
- `## Citazione` di ogni fonte → nota in `citazioni/` (slug dal testo), collegata a persona/opera; provenienza ereditata.
- `concetti/` → `temi/`; `emozioni/`, `domande/`, `discipline/`, `simboli/`, `percorsi/`, `ricerche/` → uguali.
- `spunti/` → `pensieri/` o `citazioni/` secondo il formato.
- Si tolgono chiavi e link verso `idee/`, `stile/`, `spunti` di tatuaggio, `## Pinterest`, `## Immagini`.
- Le note rimaste con meno di 2 collegamenti finiscono in un elenco per l'utente, non vengono cancellate.
- Diario: una sola voce "importazione" con la tabella delle corrispondenze vecchio slug → nuovo slug.
- `verifica.mjs` deve passare.

**Fase 4. Sito minimo** (1–2 giorni)
- Pagine: Home semplice, Citazioni (da `Testi.vue`, con filtri per tema, emozione, persona, disciplina), Brani
  (genere, tema, emozione), Da validare, backlink su ogni nota, interruttore proposte, ricerca locale.
- Deploy privato; prova dal telefono.

**Fase 5. Interrogazione con l'AI** (½ giorno)
- `scripts/indice.mjs` → `indice.json` (nodi, legami, attributi, testo breve), rigenerato in CI.
- Sezione in `CLAUDE.md`: "per rispondere a domande sulla base, leggi prima `indice.json`", con esempi
  ("citazioni filosofiche su X", "brani malinconici di genere Y", "le migliori di Dostoevskij" → `preferita`/`voto`).
- Cattura al volo dal telefono: una frase o un link → nota in `inbox/` o già smistata, collegata, commit.

**Fase 6. Dopo**
- Valutare se portare la Mappa/Atlante (Tavole domande × discipline) sul nuovo grafo.
- Decidere il destino di questo repo: congelato con un rimando nel README, o vivo come progetto tatuaggi
  che linka il nuovo (solo verso parti pubbliche, se esistono).

Stima complessiva: 4–6 giorni di lavoro con Claude, in sessioni brevi.

## 5. Scelte che spettano all'utente

1. **Privacy e hosting:** tutto privato (Cloudflare Access o solo locale) oppure privato + vetrina pubblica?
2. **Destino dei tatuaggi:** questo repo congelato, vivo a parte, o sottoprogetto nel nuovo (C)?
3. **Unità di base:** la citazione come nota propria (consigliato) o ancora dentro la fonte?
4. **Cosa importare:** anche le 99 fonti e le citazioni proposte da Claude non validate, o solo il validato?
5. **Nome** del nuovo repo e del sito (oggi "Atlante").
6. **Mappa/Atlante:** portarla subito, dopo, o mai?
7. **Lingua dello schema:** cartelle e chiavi in italiano come oggi (consigliato) o in inglese?
