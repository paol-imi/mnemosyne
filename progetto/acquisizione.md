# Flusso di acquisizione: dal messaggio alla nota

> Progettazione, 2026-10-31. Proposta di Claude, da validare. Nessuna nota, cartella o script esistente è stato toccato.
> Il flusso è pensato per il sistema nuovo (memo-coscienza): l'Atlante di oggi è il riferimento più vicino, non un vincolo.

## Principi

1. **Prima catturare, poi capire.** Il messaggio grezzo si salva subito, parola per parola: niente va perso, anche se la chat si interrompe.
2. **Le parole dell'utente sono sacre.** Si riportano tali e quali (`origine: mia`). Tutto ciò che Claude aggiunge (temi, collegamenti, commenti) è marcato come proposta.
3. **Mai inventare.** Ogni citazione e attribuzione ha uno stato di verifica esplicito.
4. **Una domanda, solo se serve.** Se il messaggio basta, zero domande. Se manca qualcosa di essenziale, una domanda, poi si committa comunque.
5. **Costo basso per messaggio, intelligenza nel consolidamento.** L'acquisizione è rapida; i collegamenti profondi li cerca la routine periodica.

## Il flusso in 8 passi

| # | Passo | Cosa fa Claude | Esce con |
|---|---|---|---|
| 1 | **Cattura** | Salva il messaggio grezzo in `frammenti/AAAA/MM/AAAAMMGG-hhmm-slug/index.md`, sezione `## Testo originale`, con data, ora e canale. | un file, sempre |
| 2 | **Riconosci il tipo** | Classifica: `citazione`, `video`, `canzone`, `libro`, `pensiero`, `sogno`, `immagine`, `pin`, `link`, `ricordo`. Un messaggio può avere più tipi (una canzone *e* un pensiero). Dagli URL: normalizza (YouTube → `https://www.youtube.com/watch?v=ID`, Spotify → `https://open.spotify.com/track/ID`, Pinterest come in CLAUDE.md). | `tipo`, `link` normalizzati |
| 3 | **Trova le entità** | Estrae nomi (persone, opere, luoghi, concetti) e li cerca nell'archivio con `scripts/trova.mjs` (titolo, slug, alias, fuzzy). Esito per ciascuna: *esiste* (slug), *ambigua* (2+ candidati), *nuova*. | elenco entità con slug o "nuova" |
| 4 | **Verifica** | Per ogni citazione o attribuzione: ricerca web (subagent piccolo). Stato: `verificata` (fonte primaria o affidabile trovata, con riferimento), `simile` (esiste una frase vicina: si riportano entrambe), `da-verificare` (non trovata). Il testo dell'utente non si corregge mai: la versione verificata va accanto. | `verifica:` + riferimento |
| 5 | **Estrai i temi** | Propone 1-3 temi/concetti esistenti e, se serve, un tema nuovo; collega alle grandi domande. Tutto come proposta. | campi di collegamento proposti |
| 6 | **Collega** | Scrive i collegamenti nel frontmatter e in `## Collegamenti`; aggiorna le note di arrivo (bidirezionale) solo per le entità *citate dall'utente*; i collegamenti tematici scelti da Claude restano proposte (blocco o elenco nel diario). | note aggiornate |
| 7 | **Chiedi l'essenziale** | Al massimo una domanda, scelta per priorità: (a) entità ambigua, (b) "cosa ti ha colpito, a pancia?" se manca, (c) momento/contesto se il tipo lo richiede (canzone, sogno). Se l'utente non risponde, la nota resta valida e `stato: grezzo`. | 0-1 domanda |
| 8 | **Verifica e commit** | `node scripts/verifica.mjs`, poi commit `memo: <slug>` e push. Risposta al telefono in 2-3 righe: cosa ho salvato, cosa è da verificare, la domanda. | commit |

Quando l'utente risponde alla domanda: si aggiorna la stessa nota (`## Perché mi colpisce`), nuovo commit.

## Requisiti che il flusso impone allo schema

- **Un tipo di nota "frammento"** (unità minima, una per lancio), distinto da spunto/idea: oggi lo spunto richiede `fonte` e un `formato` troppo stretto; un pensiero personale non ha fonte.
- **`tipo-contenuto`** come lista: `[citazione, video, canzone, libro, pensiero, sogno, immagine, pin, link, ricordo]`.
- **`quando` e `contesto`** (momento vissuto, diverso da `creato`): per la canzone ascoltata in un momento preciso o il sogno.
- **`verifica`** per ogni citazione: `verificata | simile | da-verificare`, più `riferimento` (opera, capitolo, minuto del video).
- **`link`** strutturati e normalizzati (YouTube, Spotify, Pinterest, articolo), con eventuale minuto (`t=`).
- **`alias` usati davvero** su tutte le entità (oggi quasi vuoti): "Dosto", "Dostoevskij", "Dostoevskii" → stesso slug. Senza alias la ricerca di entità fallisce.
- **Entità "persona" ed "opera" separate** (oggi `forma: autore | opera`): un video di Galimberti è un'opera/evento di una persona.
- **`testo originale` immutabile**: sezione che Claude non riscrive mai.
- **Stato del frammento**: `grezzo → collegato → consolidato` (o `confluito` in un'idea).

## Prova a secco (5 messaggi)

Stime: tempo con risposta al telefono; token = contesto letto + ricerca + scrittura, ordine di grandezza.

### 1. «ho visto questo spezzone di Galimberti, dal suo spettacolo X, diceva "il nichilismo è l'ospite inquietante", molto interessante»
- **Capisce:** tipi `video` + `citazione`; entità *Umberto Galimberti* (nuova), spettacolo "X" (da identificare).
- **Verifica:** «L'ospite inquietante» è il titolo di un suo libro (2007) sul nichilismo e i giovani, che riprende un'espressione di Nietzsche: stato `simile`, riferimento al libro; lo spettacolo X `da-verificare` finché non si trova. Spettacoli reali verificati, tra i candidati per "X": *Quando la vita era governata dal cuore* (Milano e Genova, 2025) e *L'illusione della libertà* (Lamezia, 2025). Nota: alcune pagine del libro sono state contestate come plagio, quindi la fonte va segnalata con cautela.
- **Chiede:** «Ricordi dove l'hai visto (link o titolo dello spettacolo)?» (entità ambigua > pancia, perché "molto interessante" basta per ora).
- **File:** crea `frammenti/2026/10/20261031-1210-galimberti-ospite-inquietante/index.md`; crea `persone/galimberti.md` (fatti verificati, non marcati; collegamenti tematici in proposta); propone collegamento a nichilismo/assurdo e a Nietzsche (esistente).
  ```yaml
  tipo: frammento
  origine: mia
  validata: true
  tipo-contenuto: [video, citazione]
  persone: [galimberti]
  fonti: [nietzsche]          # proposta: in blocco nel corpo
  citazioni:
    - testo: "il nichilismo è l'ospite inquietante"
      verifica: simile
      riferimento: "L'ospite inquietante (Feltrinelli, 2007)"
  stato: grezzo
  creato: 2026-10-31
  ```
- **Costo:** ~1 min; ~25-40k token (2 ricerche web).

### 2. «stasera in macchina sotto la pioggia, Digital Bath dei Deftones, mi sono sentito sciogliere»
- **Capisce:** `canzone` + `pensiero`; entità *Deftones* (esiste: `deftones`), brano *Digital Bath* (album *White Pony*, 2000, traccia 3: verificato); `quando`: 2026-10-31 sera; `contesto`: in macchina, pioggia.
- **Verifica:** solo titolo/album/anno; nessun testo riprodotto.
- **Chiede:** niente: il "a pancia" c'è già ("sciogliere"). Al massimo, nel consolidamento: "è una dissolvenza o un abbandono?"
- **File:** frammento nuovo; aggiunge il frammento all'elenco della nota `deftones` (bidirezionale: l'ha citata l'utente). Proposta: emozione `malinconia`, stile `dissolvenze` (già legato ai Deftones).
  ```yaml
  tipo-contenuto: [canzone, pensiero]
  quando: 2026-10-31T21:00
  contesto: "in macchina, sotto la pioggia"
  fonti: [deftones]
  opera: { titolo: "Digital Bath", album: "White Pony", anno: 2000 }
  link: ["https://open.spotify.com/track/ID"]   # solo se l'utente lo manda
  ```
- **Costo:** ~30 s; ~10-15k token.

### 3. «mi rendo conto che ho paura di fermarmi, perché quando mi fermo sento tutto»
- **Capisce:** `pensiero`; nessuna entità; nessuna fonte, nessuna verifica.
- **Chiede:** niente, oppure una sola domanda aperta se il frammento è molto breve: "quando ti è successo l'ultima volta?" (mai interpretare al posto suo).
- **File:** frammento con il testo intatto. Proposta in blocco: legami con dolore (emozione), lucidità, lo sguardo del percorso peso→sguardo→oltre. Nessuna nota esterna toccata (i legami sono di Claude).
- **Costo:** ~20 s; ~8-12k token.

### 4. «https://youtu.be/abc123?si=xyz»
- **Capisce:** `link` YouTube; normalizza a `https://www.youtube.com/watch?v=abc123`; recupera titolo e canale (WebFetch/oEmbed). Se non raggiungibile: salva il link e basta.
- **Chiede:** «Cosa ti ha colpito, e a che minuto?» (senza reazione il link è muto).
- **File:** frammento `20261031-hhmm-<slug-dal-titolo>`; se il canale/autore esiste nell'archivio, collega; altrimenti nessuna entità nuova finché l'utente non dice perché è importante.
- **Costo:** ~30 s; ~10-20k token.

### 5. «c'era una frase di Dostoevskij tipo "la bellezza salverà... qualcosa"»
- **Capisce:** `citazione` incompleta; entità *Dostoevskij* (esiste, oggi `validata: false`).
- **Verifica:** «La bellezza salverà il mondo», *L'idiota*: frase attribuita al principe Myškin, riportata da altri personaggi (è Ippolit a chiedergli se l'abbia detto davvero; parte III, cap. 5, capitolo da verificare sull'edizione). Se l'utente avesse detto "se Dio non esiste tutto è permesso", lo stato sarebbe `simile`: è una parafrasi, nei *Karamazov* Ivan lo dice in forma di domanda. Stato `verificata` per il romanzo, `da-verificare` per il capitolo.
- **Chiede:** «Era questa: "La bellezza salverà il mondo" (L'idiota)?» (conferma prima di fissare).
- **File:** frammento con il testo originale ("salverà... qualcosa") e accanto la versione verificata; propone nota opera nuova `l-idiota` (`origine: claude`, `validata: false`) collegata a `dostoevskij`.
- **Costo:** ~1 min; ~20-30k token.

**Totale indicativo:** 10-40k token per messaggio; la maggior parte è il contesto (CLAUDE.md + nucleo + ricerca entità). Con `trova.mjs` Claude non legge le note intere: legge solo i 3-5 candidati.

## Renderlo ripetibile

1. **Skill `/memo`** (`.claude/skills/memo/SKILL.md`): il flusso degli 8 passi, invocabile anche implicitamente quando arriva un messaggio breve dal telefono.
2. **Sezione corta in CLAUDE.md**: "Messaggi al volo → usa la skill memo". Le regole lunghe stanno nella skill, non nel contesto di ogni sessione.
3. **Template** `_templates/frammento.md` (frontmatter sopra + sezioni `## Testo originale`, `## Citazioni`, `## Perché mi colpisce`, `## Collegamenti`).
4. **Script di supporto**:
   - `scripts/trova.mjs "<nome>"`: cerca per titolo, slug, alias, con tolleranza (accenti, traslitterazioni, distanza di Levenshtein); stampa `slug · tipo · titolo · validata` dei 5 migliori. Usa il parser di `.vitepress/core/archivio.ts`.
   - `scripts/normalizza-link.mjs <url>`: YouTube, Spotify, Pinterest, Instagram → forma canonica + tipo.
   - `scripts/nuovo-frammento.mjs --slug … --tipo …`: crea cartella e file dal template con data/ora.

### Bozza della skill

```md
---
name: memo
description: Acquisisce un messaggio al volo (frase, citazione, canzone, video, sogno, link) come frammento collegato dell'archivio. Usala per ogni messaggio breve dal telefono che porta un contenuto da salvare.
---

# /memo

1. Salva subito il messaggio, parola per parola, in un frammento nuovo
   (`node scripts/nuovo-frammento.mjs`). `origine: mia`, `validata: true`.
2. Riconosci i tipi di contenuto; normalizza i link (`node scripts/normalizza-link.mjs`).
3. Per ogni nome: `node scripts/trova.mjs "<nome>"`. Esiste / ambiguo / nuovo.
4. Citazioni e attribuzioni: un subagent fa la ricerca web e riporta testo, opera, capitolo, URL.
   Stati: verificata | simile | da-verificare. Non correggere il testo dell'utente: affianca la versione verificata.
   Mai testi di canzoni: titolo, album, momento.
5. Proponi 1-3 temi esistenti e le domande; tutto ciò che scegli tu va in un blocco proposta.
6. Collega: entità citate dall'utente → link bidirezionali; legami tematici tuoi → proposta.
   Entità nuove: crea la nota solo se l'utente l'ha nominata (fatti verificati, non marcati);
   le opere/autori che introduci tu → `origine: claude`, `validata: false`.
7. Al massimo UNA domanda: ambiguità > "cosa ti ha colpito, a pancia?" > momento/contesto.
8. `node scripts/verifica.mjs`, commit `memo: <slug>`, push.
   Rispondi in 2-3 righe: salvato dove, cosa è da verificare, la domanda.
```

## Consolidamento (routine settimanale)

**Quando:** una Routine (trigger programmato) la domenica sera, sessione nuova, branch `consolidamento/AAAA-MM-GG`; oppure `/consolida` a mano.

**Cosa fa** (un subagent per passo, ognuno su pochi file):
1. **Raccoglie** i frammenti con `stato: grezzo` o `collegato` della settimana (`git log --since`).
2. **Verifiche rimaste**: riprova le citazioni `da-verificare`.
3. **Temi emergenti**: raggruppa i frammenti per parole e concetti ricorrenti (≥3 frammenti → tema candidato).
4. **Convergenze**: lo stesso significato in tradizioni diverse (es. il "sciogliersi" dei Deftones e la dissolvenza del sé nello zen), cercando nell'archivio intero via `trova.mjs` e i collegamenti.
5. **Collegamenti proposti**: tra frammenti e note esistenti, nell'elenco `- Collegamenti proposti:` del diario (formato già letto dalla pagina Da validare).
6. **Tensioni col nucleo**: se un frammento contraddice o sposta il nucleo, lo segnala (mai modifica `nucleo.md` da sola).
7. **Scrive** `diario/AAAA-MM-GG-consolidamento.md`: max 10 proposte, ordinate per forza; una domanda per l'utente. Commit e notifica push al telefono.

**Esito:** l'utente valida dal telefono ("sì 1, 3; no 2"); una sessione applica: `validata: true`, frammenti `consolidato`, voci del diario "— validato il …".

## Punti critici

- **Verifica delle citazioni:** costosa e fallibile; serve una politica netta (una ricerca, poi `da-verificare`) per non bruciare token a ogni messaggio.
- **Entità ambigue e alias vuoti:** senza alias ricchi si creano doppioni (Dostoevskij / Dostoevskij autore / L'idiota). `trova.mjs` è il cuore del sistema.
- **Confine mia/claude:** la nota creata su richiesta dell'utente è sua, ma i temi scelti da Claude no. Va mantenuto anche nei frammenti piccoli, o il validato si inquina.
- **Privacy:** repo e sito oggi sono **pubblici**. Pensieri personali e sogni non possono finirci: serve un repository privato (o una cartella esclusa dal sito) prima di partire.
- **Rumore:** molti frammenti piccoli rendono il grafo illeggibile; il sito dovrebbe mostrare i frammenti per tema/tempo, non come nodi del grafo.
- **Costo di contesto:** CLAUDE.md lungo + nucleo a ogni messaggio. Spostare le regole nella skill e tenere CLAUDE.md breve.
- **Telefono:** ogni messaggio = un commit; il push deve funzionare anche da sessioni brevi (branch unico per l'acquisizione, merge automatico o periodico).
