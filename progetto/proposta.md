# Memo-coscienza: la proposta unica

> Progettazione, 2026-10-31. Proposta di Claude, da validare. Unifica i quattro documenti di
> [schema](/_progetto/schema.md), [domande](/_progetto/domande.md), [acquisizione](/_progetto/acquisizione.md)
> e [migrazione](/_progetto/migrazione.md), applicando le decisioni del coordinatore. Dove i quattro divergono vale questo.
> Nessuna nota, cartella o script esistente è stato toccato.
> Il racconto della sessione è nel [diario del 2026-10-31](/diario/2026-10-31-memo-coscienza.md).

## 1. Visione

- Un **repo nuovo e privato** dove finisce tutto ciò che mi colpisce: frasi, video, canzoni, libri, pensieri, sogni.
- Dal telefono scrivo un messaggio, `/memo` lo salva **parola per parola** come frammento e propone a cosa legarlo.
- Il frammento è l'episodio; persone, opere, citazioni, temi ed emozioni sono la conoscenza che si accumula.
- Le mie parole e le mie reazioni sono sacre (`origine: mia`); ciò che sceglie l'AI resta proposta finché non lo valido.
- Poi chiedo: "cosa ho sulla solitudine?", "le migliori di Dostoevskij", "cosa pensavo a marzo". Questo repo resta il progetto tatuaggi, com'è.

## 2. Modello

### 2.1 Tipi (la cartella dice il tipo; slug = nome del file, unico in tutto il repo)

| tipo | cartella | che cos'è |
|---|---|---|
| frammento | `frammenti/AAAA/AAAAMMGG-slug.md` | un episodio: ciò che ho visto, sentito, pensato, con il contesto; diventa cartella (`…/AAAAMMGG-slug/index.md` + `img/`) solo se ha immagini |
| citazione | `citazioni/` | parole altrui, brevi (max ~30 parole), **sempre** con un'attribuzione |
| persona | `persone/` | autore, artista, pensatore, band |
| opera | `opere/` | libro, canzone, album, film, serie, anime, quadro, spettacolo, mito… (sottotipo in `mezzo`) |
| tema | `temi/` | ciò di cui le cose parlano; `forma: concetto` per i nomi propri (amor fati, eterno ritorno) |
| emozione | `emozioni/` | vocabolario chiuso, estendibile su approvazione |
| simbolo | `simboli/` | entità comune (serpente, soglia, labirinto), non più legata ai tatuaggi |
| tradizione | `tradizioni/` | disciplina, corrente o filone (stoicismo, shoegaze); gerarchia con `parte-di` |
| domanda | `domande/` | le 8 grandi domande, con il `## Coro` |
| percorso | `percorsi/` | un cammino ordinato tra note |
| sguardo | `sguardo/AAAA-MM-GG.md` | il mio punto di vista in una data (l'ex `nucleo.md`), mai sovrascritto |

Fuori dal grafo: `diario/`, `inbox/`, `_archivio/`, `_templates/`, `_vocabolari/`.

### 2.2 Campi

| campo | su | valori |
|---|---|---|
| `tipo`, `titolo`, `creato` | tutti | `creato`: AAAA-MM-GG, con l'ora sui frammenti (`2026-10-31T21:00`) |
| `origine` / `validata` | tutti | `mia` (nominato o scritto da me) · `seme` (importato) · `claude`; `mia` ⇒ `validata: true` |
| `alias` | entità | elenco di grafie (Dostoevskij, Dostoevsky, Dosto): obbligatorio se il nome ha varianti |
| `visibilita` | tutti | `privata` (default, anche se assente) · `pubblica`: un sito futuro mostra solo le `pubblica` |
| `slug-precedente` | note importate | lo slug nell'Atlante, per la tabella vecchio → nuovo |
| `pancia` | frammento, citazione, opera | `1` sfiorato · `2` colpito · `3` folgorato; **solo mia**, l'AI non la indovina |
| `reazione` | idem | una riga libera, facoltativa, mie parole |
| `quando`, `contesto` | frammento | data vissuta (se ≠ `creato`); una riga ("in macchina, sotto la pioggia") |
| `mezzo` | frammento | video · spettacolo · libro · musica · film-serie · conversazione · social · pensiero · sogno · luogo |
| `stato` | frammento | `grezzo` → `collegato` → `consolidato` (oppure `confluito`, con `confluito-in`) |
| `ritorni` | frammento, citazione | elenco di date in cui ci sono tornato; il testo sta in `## Ritorni` |
| `link` | frammento, opera | URL normalizzati (YouTube `watch?v=ID`, Spotify `track/ID`, Pinterest `pin/ID/`) |
| `verifica`, `riferimento`, `lingua` | citazione | `verificata` · `simile` · `da-verificare` · `smentita`; `riferimento`: dove sta davvero (opera, capitolo/anno) o la frase simile |
| `mezzo`, `genere`, `anno` | opera | `mezzo`: libro · poesia · saggio · canzone · album · film · serie · anime · fumetto · quadro · spettacolo · lezione · video · podcast · gioco · mito; `genere` dal vocabolario del suo mezzo |
| `fruizione` | opera | `da-fare` · `in-corso` · `fatta` |
| `anno`, `paese` | persona | intero, negativo = a.C. |
| `forma` | tema | assente = tema comune; `concetto` = nome proprio di un'idea |
| `polarita` | emozione | `affonda` · `innalza` · `ambivalente` |

Vocabolari chiusi in `_vocabolari/*.yml` (mezzi, generi per mezzo a due livelli tipo `rock > post-rock`, emozioni,
predicati, stati), controllati da `verifica.mjs`. I temi sono semi-chiusi: l'AI ne crea uno nuovo solo se nessuno
esistente (alias compresi) va bene, e lo crea `origine: claude`, `validata: false`.

### 2.3 Predicati (chiave del frontmatter → elenco di slug; inversi calcolati)

| predicato | da → a | inverso generato |
|---|---|---|
| `autore` | opera, citazione → persona | opere-di |
| `fonte` | citazione, frammento → opera | citato-in |
| `cita` | frammento → citazione | ricordata-in |
| `parla-di` | frammento, citazione, opera, persona → tema | ne-parlano |
| `suscita` | frammento, citazione, opera → emozione | suscitata-da |
| `simboli` | qualsiasi → simbolo | compare-in |
| `tradizione` | persona, opera → tradizione | membri |
| `parte-di` | opera → opera, tema → tema, tradizione → tradizione | contiene |
| `influenzato-da` | persona → persona | influenza |
| `converge-con` | qualsiasi → qualsiasi, di tradizioni diverse | simmetrico |
| `contraddice` | qualsiasi → qualsiasi | simmetrico |
| `evoca` | qualsiasi → qualsiasi (associazione a pancia, l'unica valvola libera) | simmetrico |
| `risponde-a` | qualsiasi → domanda | coro |
| `scoperto-tramite` | qualsiasi → qualsiasi (chi o cosa me l'ha fatto conoscere) | ha-fatto-scoprire |
| `sviluppa` | frammento → frammento, idea di un progetto | sviluppato-in |
| `confluito-in` | frammento → qualsiasi (con `stato: confluito`) | raccoglie |
| `sinonimo-di` | tema/emozione doppione → quello che resta | — |

Regole:
- **I legami stanno solo nel frontmatter.** Il blocco `## Collegamenti` del corpo e gli inversi li scrive `indice.mjs`
  tra due marcatori; a mano non si toccano. Nel testo restano solo link di passaggio.
- **Le proposte stanno in una chiave a parte**, `proposti:`, con la stessa forma (`proposti: {parla-di: [amore]}`).
  Validare = spostare lo slug nella chiave vera. Così "legami solo nel frontmatter" e "proposte marcate" convivono.
- Forza facoltativa: `slug@2`. Le query scendono al massimo di due passi.

## 3. Esempio: Galimberti, per intero

Messaggio dal telefono: *"ho visto uno spezzone di Galimberti, dal suo spettacolo X, diceva 'il nichilismo è
l'ospite inquietante', molto interessante"*. "X" è un segnaposto: il titolo non si inventa, si chiede.

**Nuovo** `frammenti/2026/20261031-galimberti-spezzone-x.md`

```yaml
tipo: frammento
titolo: Spezzone di Galimberti da X
creato: 2026-10-31T21:00
mezzo: video
contesto: reel visto la sera, sul telefono
stato: collegato
origine: mia
validata: true
cita: [nichilismo-ospite-inquietante]
fonte: [spettacolo-x]
proposti:
  parla-di: [nichilismo, i-greci]
  suscita: [inquietudine]
```

Corpo: `## Testo originale` (il messaggio intatto, immutabile), `## Perché mi colpisce` (vuoto finché non rispondo), `## Ritorni`.

**Nuova** `citazioni/nichilismo-ospite-inquietante.md`

```yaml
tipo: citazione
titolo: Il nichilismo, l'ospite inquietante
autore: [umberto-galimberti]
fonte: [spettacolo-x]
lingua: it
verifica: simile
riferimento: "Galimberti, L'ospite inquietante (Feltrinelli, 2007); l'immagine viene da Nietzsche, frammenti postumi (da verificare)"
origine: mia
validata: true
proposti:
  parla-di: [nichilismo]
  converge-con: [nietzsche-nichilismo-ospite]
```

Corpo: la frase come l'ho riportata io, poi la versione verificata accanto. Il mio testo non si corregge mai.
Nasce perché c'è un'attribuzione (dichiarata da me e trovata simile); senza, la frase resterebbe nel frammento.

**Nuova** `persone/umberto-galimberti.md`: `alias: [Galimberti]`, `anno: 1942` (da verificare),
`paese: it`, `origine: mia` (l'ho nominato io), `validata: true`; `proposti: {tradizione: [filosofia-contemporanea]}`.

**Nuova** `opere/spettacolo-x.md`: `mezzo: spettacolo`, `titolo: X` (da chiedere), `autore: [umberto-galimberti]`,
`fruizione: in-corso` (ne ho visto un pezzo), `origine: mia`, `validata: true`.

**Solo se non esiste** `temi/nichilismo.md`: `forma: concetto`, `alias: [nichilista]`, `origine: claude`, `validata: false`.

**Rigenerati da `indice.mjs`** (non a mano): i `## Collegamenti` di Galimberti, dello spettacolo e del tema.

**Domanda** (una sola): *"Quanto ti ha colpito, 1–3? E sai il titolo dello spettacolo?"* Se rispondo "2, mi ha
inquietato", la stessa nota prende `pancia: 2`, `reazione: mi ha inquietato`, nuovo commit.

## 4. Flusso `/memo`

Skill in `.claude/skills/memo/SKILL.md`; in `CLAUDE.md` solo "Messaggi al volo → skill memo".

1. **Cattura**: `frammenti/AAAA/AAAAMMGG-slug.md`, `## Testo originale` parola per parola, `stato: grezzo`.
2. **Riconosci**: tipo di contenuto e link normalizzati; un link muto → titolo e canale via oEmbed.
3. **Trova**: `trova.mjs "<nome>"` (accenti, traslitterazioni, alias, Levenshtein) → esiste · ambigua · nuova.
   Claude legge solo 3–5 candidati, non l'archivio.
4. **Verifica** citazioni e attribuzioni: un subagent, **una** ricerca; poi `verificata`, `simile` (con le due frasi)
   o `da-verificare`. Mai inventare.
5. **Crea** le entità che ho nominato (`origine: mia`); quelle che introduce Claude partono `claude`/`false`.
6. **Proponi** 1–3 temi, emozioni, domande, convergenze: tutto in `proposti:`. Lo stato passa a `collegato`.
7. **Una domanda al massimo**, in ordine: entità ambigua > "cosa ti ha colpito, a pancia, 1–3?" (se manca) > momento o
   contesto. Se c'è già una reazione nel messaggio, nessuna domanda. Mai interpretare al posto mio.
8. `verifica.mjs` → commit `memo: <slug>` → push. Risposta al telefono in 2–3 righe: dove, cosa è da verificare, la domanda.

**Modalità "solo cattura"** (`/memo solo …`, o quando ho fretta): solo i passi 1 e 8. Niente ricerca, niente proposte,
niente domande, `stato: grezzo`. Ci pensa il consolidamento. Costo stimato 10–40k token a messaggio in modalità piena,
molto meno in sola cattura.

**Branch dal telefono.** Le sessioni dell'app spingono su `claude/*`. Proposta: una GitHub Action
`.github/workflows/unisci.yml`, su push in `claude/**`: installa, lancia `verifica.mjs`, se passa fa rebase su `main`
e `git push origin HEAD:main`, poi cancella il branch. Se fallisce (verifica rossa o conflitto) apre una PR e la
lascia a me. I frammenti sono file nuovi e separati, quindi i conflitti saranno rari. Alternativa più semplice, se
l'Action dà noie: nessun merge automatico, e `cerca.mjs`/`indice.mjs` leggono anche i branch `claude/*` non uniti
(`git ls-tree`), con un `/unisci` manuale una volta a settimana dentro il consolidamento.

## 5. Le domande e come si rispondono

Retrieval in due passi: `cerca.mjs` filtra `indice.json` (JSON in uscita), Claude legge 5–20 note e risponde breve,
**prima l'archivio, poi "fuori archivio, da validare"**, con conteggi e date. Le dieci ricette vanno in `CLAUDE.md`.

| # | domanda | ricetta |
|---|---|---|
| 1 | "Salva questo" | `/memo` (§4) |
| 2 | Cosa ho su [tema] | `cerca --tema X` (segue `parte-di` e `alias`); citazioni in testa, per `pancia` |
| 3 | Le migliori di [autore] | `cerca --tipo citazione --autore X --ordina pancia`, poi per n. di `ricordata-in` |
| 4 | Dammi [mezzo] su [tema] | `cerca --mezzo canzone --tema X`; se vuoto, proposte esterne (titolo, album, momento), mai salvate senza ok |
| 5 | E di questo genere / solo di [tradizione] | stessa query più `--genere` o `--tradizione` (la memoria sta nella chat) |
| 6 | Cosa pensavo a [periodo] | `cerca --tipo frammento --dal 2026-03 --al 2026-03`, raggruppati per tema |
| 7 | Con cosa risuona questo | temi del frammento → nodi a due passi (`parla-di`, `evoca`, `converge-con`) di tradizioni diverse |
| 8 | Mi sento [emozione] | `cerca --emozione X`, più le emozioni della stessa `polarita` se chiedo conforto |
| 9 | Cosa leggo/guardo/ascolto dopo | opere `fruizione: da-fare`, ordinate per temi e generi delle opere `fatta` con `pancia` alta |
| 10 | Cosa mi colpisce ultimamente | conteggio dei temi sui frammenti degli ultimi 30/90 giorni, confronto col periodo prima |

Le altre famiglie (contraddizioni, sé contro sguardo, manutenzione, creatività) usano gli stessi filtri più ragionamento;
la manutenzione (da validare, da verificare, isolate) è già in `verifica.mjs`.

## 6. MVP: file da creare, in ordine

Nessun sito, nessun MCP. Il motore riusa il codice sano dell'Atlante (~1.500 righe: parser, blocchi, proposte, verifica),
con la `BASE` del sito non più cablata.

1. **Repo privato** (nome da scegliere) con `package.json`, `.gitignore`, `README.md`.
2. `_vocabolari/` (mezzi, generi, emozioni, predicati, stati) e `schema.mjs`: tipi → cartelle, campi, predicati con
   dominio, codominio e inverso. È la sola fonte delle regole: gli script la leggono.
3. `_templates/` per ogni tipo; `sguardo/2026-11-…md` scritto con me a partire da `nucleo.md`.
4. `scripts/verifica.mjs`: slug unici, campi e valori ammessi, predicati noti con tipi giusti ai capi, slug esistenti,
   `mia` ⇒ `validata`, `proposti` con predicati noti, citazione senza `autore` né `fonte` ⇒ errore, nomi quasi uguali ⇒ avviso.
5. `scripts/indice.mjs`: scrive `indice.json` (nodi, archi con inversi, attributi, prime righe) e rigenera i blocchi
   `## Collegamenti` nelle note.
6. `scripts/trova.mjs "<nome>"`: i 5 migliori candidati, JSON.
7. `scripts/cerca.mjs`: filtri `--tipo --tema --emozione --autore --mezzo --genere --tradizione --dal --al --ordina`, JSON.
8. `scripts/importa.mjs`: legge questo repo in sola lettura. Fonti `forma: autore` → `persone/`; `forma: opera` → `opere/`;
   miti → `opere/` con `mezzo: mito`; ogni `## Citazione` → nota in `citazioni/` (`verifica` da "(da verificare)");
   concetti → `temi/` con `forma: concetto`; discipline e filoni → `tradizioni/`; emozioni, simboli, domande, percorsi
   → invariati; `idee/`, `stile/`, Pinterest e immagini restano qui. Provenienza ereditata, `slug-precedente`, `creato` = data del primo commit, `pancia` mai indovinata; tabella vecchio → nuovo slug nel diario.
9. `.claude/skills/memo/SKILL.md` con la modalità "solo cattura".
10. `CLAUDE.md` breve: regole, ricette delle 10 domande, "messaggi al volo → memo".
11. `.github/workflows/unisci.yml` (§4).
12. Prova a secco con 5 messaggi veri (Galimberti, una canzone, un pensiero, un link nudo, Dostoevskij).

Stima: 3–4 giorni di sessioni.

## 7. Dopo l'MVP

1. **Consolidamento settimanale** (Routine, domenica sera, sessione nuova, un subagent per passo): frammenti grezzi della
   settimana, citazioni da riverificare, temi emergenti (≥3 frammenti), convergenze, doppioni da fondere con `sinonimo-di`,
   tensioni con lo sguardo (solo segnalate). Esce `diario/AAAA-MM-GG-consolidamento.md` con max 10 proposte e una
   domanda; rispondo "sì 1, 3; no 2" e una sessione applica.
2. **Sito privato**: Netlify (sito privato) o Vercel Hobby (protezione), oppure Cloudflare Pages + Access se accetto
   di dare la carta. Pagine: citazioni, temi, autori, opere, Da validare, interruttore proposte. Costi e limiti da verificare.
3. **MCP** (`salva_frammento`, `cerca`, `citazioni_di`, `cosa_pensavo`, `convergenze`) solo se latenza o costi di
   contesto pesano; indice in SQLite con FTS5 ed eventuali embedding (oltre ~1000 nodi).
4. **Mappa**: portare la Mappa/Atlante dopo, riscritta sul nuovo schema.
5. `ritorni` e un "ti ricordi?" settimanale (effetto testing), facoltativo.

## 8. Scelte che restano a te

Ognuna con la mia raccomandazione.

1. **Nome del repo** (oggi "Atlante"). → Un nome corto e tuo; io proporrei `memo`.
2. **Cosa importare**: tutto (anche le 99 fonti e le citazioni non validate) o solo il validato? → Tutto, con
   `validata` ereditato: il lavoro non va perso, e "Da validare" lo smaltisce.
3. **Merge dal telefono**: Action automatica o lettura dei branch non uniti? → Action, con PR solo se fallisce.
4. **Cosa rendere `pubblica`** (il default è `privata`): niente, o una vetrina (es. citazioni e temi)? → Niente
   finché non c'è un sito; poi si decide nota per nota.
5. **Generi**: vocabolario esterno (MusicBrainz/Discogs) o costruito sui tuoi ascolti? → Sui tuoi ascolti, a due livelli.
6. **Hosting del sito, dopo**: Netlify, Vercel o Cloudflare (con carta)? → Cloudflare Access se la carta non ti pesa,
   altrimenti Vercel Hobby. Prima di sceglierlo, verifico i limiti di oggi.
7. **Simboli**: entità comuni nel nuovo repo, ma anche questo repo ha i suoi. → Li copio una volta (`importa.mjs`)
   e da lì vivono separati; nessuna sincronizzazione nell'MVP.
8. **Lingua di cartelle e chiavi**: italiano o inglese? → Italiano, come oggi.

Incoerenze dei quattro documenti risolte qui con la scelta più semplice (da confermare):
- **Canzone e album** non sono tipi a parte (schema): sono opere con `mezzo`; l'album è legato con `parte-di`.
- **Legami proposti** nel frontmatter ma "in un blocco proposta" (schema): diventano la chiave `proposti:` (come in schema §2.7).
- **`piu-ampio`** (schema) confluisce in `parte-di`; **`sinonimo-di`** entra tra i predicati.
- **`parla-di` su persona** (esempio Galimberti) ammesso nel dominio.
- **`riprende`** (schema) tolto: lo coprono `converge-con`, `influenzato-da` e `scoperto-tramite`.
- **Luoghi e ricerche** (anche se schema §2.7 tiene `ricerca`) non entrano nell'MVP: un luogo è un tema o un simbolo; una ricerca è un'opera `fruizione: da-fare`
  o un frammento. Tornano se servono davvero.
- **Frammento** in un file (`AAAAMMGG-slug.md`) e non in una cartella con ora e mese (acquisizione, schema §2.7):
  diventa cartella `AAAAMMGG-slug/index.md` con `img/` solo se ha immagini. L'ora sta in `creato`.
- **Opere: `mezzo`, non `forma`** (schema): `forma` resta solo sui temi (`concetto`), così una chiave ha un solo significato.
  `poesia`, `podcast` e `mito` sono valori di `mezzo`.
- **`verificata: si | no`** (schema §2.7) cede al vocabolario del coordinatore: `verifica: verificata | simile | da-verificare | smentita`.
  Restano fuori anche `autore: [io]` e `canale`: le mie frasi sono frammenti, il canale si vede da `creato` e dal commit.
- **`domande`** come chiave diventa `risponde-a` (schema §2.7).
- **Citazione `validata: true` con fonte da verificare** (schema): `validata` dice che la nota è mia,
  `verifica` dice quanto è sicura l'attribuzione. Sono due assi distinti.
- **`stato`** ha valori diversi per frammento e (in futuro) progetto: il vocabolario è per tipo.
- **SQLite + MCP subito** (domande, 4bis) contro **JSON** (schema, migrazione): JSON nell'MVP, SQLite con l'MCP.
