# Critica del modello v2: semplicità e implementabilità

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. È la voce del critico avversario: non tocca note né
> script. Mette alla prova il [modello](/_progetto/v2/modello.md) con il suo [banco di prova](/_progetto/v2/banco-di-prova.md)
> e con le avvertenze di [essenza](/_progetto/v2/essenza.md) §5 ("progetta un archivista; tu hai chiesto uno specchio") e
> di [stato dell'arte](/_progetto/v2/stato-arte.md) §7 ("11 tipi, ~25 campi, 17 predicati prima del primo frammento vero.
> È la strada di Tana").

**In una riga.** Il modello v2 ha ripetuto l'errore che denuncia. Ha tolto 9 predicati, ma ha aggiunto 5 file JSON, 5 formule,
4 stati, 5 ID esterni, 5 forme di restituzione e 2 fasi di consolidamento. Si può dimezzare senza perdere un solo caso del
banco. Restano tre buchi che chi lo implementa colmerebbe a caso. Il primo è il più grave: **la chat del Progetto non può
scrivere**, e tutte le 25 domande del banco chiedono di scrivere.

---

## 0. Come leggo il banco

Il banco è scritto con il vocabolario del modello: "`tramite: marco` ✦" e "`versione: 2`" sono nomi di campi, non funzioni.
Se lo si leggesse alla lettera, ogni taglio fallirebbe per definizione. Quindi lo leggo **per funzione**:
- un punto **File** o **Indice** passa se l'informazione si trova ancora, anche in un altro posto;
- una **Risposta** e un **Non deve** passano solo se restano identici.

In pratica, un elemento serve se senza di esso una *risposta* cambia o un *divieto* scatta.

**La regola che decide quasi ogni taglio** viene dal modello stesso (§2.1). Le letture si rifanno dai frammenti, e il
calcolato si rifà in un secondo. Quindi ogni campo di una lettura e ogni file calcolato **si può aggiungere dopo**: basta
rileggere, a costo di token. Solo due cose vanno decise bene subito, perché non cambiano mai: il formato dei `frammenti/`
e quello delle `restituzioni/`. Su quegli strati sono prudente; sugli altri taglio senza paura.

---

## 1. Il modello dimezzato

### 1.1 Il conto

| categoria | v2 | ridotto | che cosa resta |
|---|---|---|---|
| tipi · generi di nodo | 4 · 5 | 4 · 5 | tutti (vedi §1.3) |
| campi del frammento | 5 | 4 | `registrato`, `canale`, `voce`, `allegati` |
| campi della lettura | 11 | 7 | `intento`, `reazione`, `legami`, `link`, `trascrizione`, `parole`, **`delicato`** (nuovo) |
| valori di `intento` | 7 | 4 | `salva`, `chiedi`, `sguardo`, `niente` |
| campi dei nodi (comuni + propri) | 9 + 14 | 4 + 9 | `nome`, `alias`, `nato-da`, `link`; `cerchia`, `in`, `autore`, `attribuita-a`, `originale`, `traduzione`, `riferimento`, `esito`, `scopo` |
| valori di `esito` · di `prova` | 5 · 3 | 4 · 0 | `verificata`, `simile`, `errata`, `non-trovata`; senza esito = ⚠ |
| predicati | 8 | 6 | `nomina`, `parla-di`, `serve-a`, `ritorna-su`, `contraddice`, `converge-con` |
| canali di validazione | legami + `atti` + `in-risposta-a` | 1 | tutto passa da `ritorna-su` |
| voci · stati | 5 · 4 | 5 · 1 | voci intatte (4 scritte, `accolta` calcolata); stato: solo `rifiutato` |
| file calcolati | 9 (5 JSON in `.indice/`, 4 in `contesto/`) | 2 | `contesto/parole.md`, `contesto/mappa.md` |
| formule | 5 | 1 | i conteggi |
| forme di restituzione | 5 | 2 | `risposta`, `lettera` |
| azioni del consolidamento | 6 + 3 (due fasi) | 4 (una passata) | temi alla ricorrenza, verifica citazioni, `contraddice`, una lettera |
| Routine | 2 | 1 (0 nella prima settimana, §4) | |
| script | 7 | 3 | `smista.mjs`, `contesto.mjs`, `verifica.mjs` (più l'importazione, una volta sola) |

Gli elementi passano da circa 130 a circa 65.

### 1.2 Che cosa tolgo, con la prova

| tolto | perché non serviva (banco) | rischio, e quando rimetterlo |
|---|---|---|
| **`.indice/` intero** (grafo, tempo, vicende, scarti, conti) | Chi legge l'indice? La chat del Progetto legge **solo** `contesto/` (banco, intro parte 2; [telefono](/_progetto/v2/telefono.md) §3). Quindi ogni numero che D01, D11, D18, D23 e D24 usano deve comunque stare in `contesto/`. Ci sono due strati derivati, e chi fa le domande ne vede uno solo. Un unico `contesto.mjs` calcola in memoria e scrive `mappa.md` (conti per mese e per tema, importati esclusi; parole candidate con date; rifiuti con contesto; `contraddice` con date; da fare / in corso / fatte; alias → slug). | nessuno: è lo stesso calcolo, scritto in un file solo |
| `recenti.md`, `indice.md`, `ritratto.md` | `recenti` è contenuto in `parole.md` (tutti i frammenti, alla lettera, in ordine). `indice.md` serve quando `parole.md` non entra più nel contesto: a 25–50 frammenti succede tra anni (stima del modello: 30 token a riga). Il ritratto è una restituzione e vive in `restituzioni/`. **In più:** in `parole.md` le restituzioni stanno in mezzo ai frammenti, in ordine di tempo e con le voci numerate. Così "la terza" (D17) e "ok grazie" (D05) hanno il referente subito sopra. | `indice.md` torna quando `parole.md` supera ~150k token |
| **formule**: forza, vitalità, `sbiadito`, validità, sorpresa | Nessuna risposta del banco dipende da un peso. "Pesa 2" (B03) e "vitalità 1/bassa" (B01, B13) sono righe **Indice** che nessuna **Risposta** usa. D14 ordina "per reazione": l'AI legge le reazioni citate. Nessun caso supera i 60 giorni di una proposta intatta, quindi `sbiadito` non è mai messo alla prova. | `sbiadito` torna quando le proposte ◌ intatte superano 100 (il mausoleo: [archivio reale](/_progetto/v2/archivio-reale.md) lezione 2) |
| stato `superato` | Il banco stesso lo dice lacuna (B20). D10 e D12 si risolvono con `contraddice` più le date: "ottobre ✧ → 8 marzo ✦". La finestra bi-temporale non cambia nessuna risposta. | quando servirà "che cosa pensavo *ancora* a gennaio" |
| `atti` e `in-risposta-a` | Fanno lo stesso lavoro di `ritorna-su {di, n}`. Il caso D05 lo dimostra: `in-risposta-a` punta a D04, l'effetto è su D03, e `ritorna-su` non ha `n`. Unificando, `ritorna-su` prende `{di: r-…, n: 3}` e `come: aggiunge · corregge · effetto · accoglie · rifiuta`. D17, D18, D05, B02 e B22 passano tutti, e la lacuna di D05 si chiude. | nessuno: c'è un meccanismo in meno da spiegare |
| `intento`: `accogli`, `rifiuta`, `correggi` | Sono già nel `come` di `ritorna-su`: si scriverebbero due volte. | — |
| `sente` | Diventa `parla-di` con `come: stato`. D03 (svuotato) e B10 ("entra come umore, non come posizione") distinguono già lo stato dalla posizione. E71 non è nel banco. | — |
| `tramite` | Basta `nomina` più il `perche` ("«marco mi ha mandato»"). B06, B09 e B24 non perdono Frankl, Marco o *Evangelion*. Nessuna domanda del banco chiede "chi me l'ha fatta conoscere". | quando quella domanda arriva davvero |
| `versione`, `letto` | Li dà git: `git log letture/…`. B22 ("passa a versione 2") resta verificabile. Con loro va anche il comando `rileggi --versione`: nessun caso rilegge tutto. | quando si rilegge tutto con un modello migliore |
| `vissuto`, `contesto` | Solo B17 usa `vissuto` ("stanotte" alle 07:10: lo dice già `registrato`). `contesto` è lacuna in B04. Entrambi vanno nel `perche`. | si aggiungono rileggendo: sono letture |
| `segnale` della reazione (impatto, giudizio, identificazione) | Serviva solo alla formula della forza. Resta la frase citata con `verso` ±: B06 ("non deve segnare +") e B08 (due versi) passano. | — |
| **ID esterni** (`wikidata`, `musicbrainz`, `registrazione`, `openlibrary`, `titolo-vero`) e `risolvi.mjs` | **Nessuna** risposta del banco usa un ID. All'ingresso sono **vietati** (banco, "Come si usa"), e il consolidamento li scrive soltanto. D16 verifica i brani con una ricerca al momento della domanda. B04 ("la 3") non si risolve con MusicBrainz, che all'ingresso è vietato: si risolve con una ricerca. Tolgo ~95 righe, una fase e la domanda di disambiguazione. | alla tappa 2, quando i doppioni Levenshtein diventano un problema vero (stato dell'arte §7.4) |
| `prova` (`primaria`, `secondaria`, `memoria`) | `memoria` vuol dire "senza esito", e si segna ⚠. `primaria` o `secondaria` diventano una parola dentro `riferimento`. B03, B06, B09 e B15 passano. | — |
| `apocrifa` / `attribuzione-errata` | Diventano `errata`. Che il vero autore sia noto (B09: Nietzsche) o ignoto (B06) lo dice `autore`, pieno o vuoto. | — |
| `detta-da`, `traduttore`, `versione-di`, `anno` | Ivan (D15) va nel `riferimento`. "Resa di Claude" va nella `traduzione`. E23 ed E24 (le cover) non sono nel banco. L'anno sta nel nome o nella risposta. | si aggiungono rileggendo |
| fase 1 del consolidamento: tagging all'indietro, fusione dei doppioni, divisione dei temi | Nessun caso. | quando i temi superano 30 |
| fase 2 a rotazione; sogno; "ti ricordi?" a intervalli crescenti; ritratto trimestrale; "mentre eri via" | **Il banco non ne collauda nessuna** (nessun caso B o D). Tengo **una** lettera settimanale (vedi §1.3), la cui forma sceglie l'AI. Il "ti ricordi?" può starci dentro, una volta. | il ritmo si decide dopo il primo mese, dalle reazioni vere ([restituzione](/_progetto/v2/restituzione.md): nessuna ancora registrata) |
| Routine "sogno" separata | È lo stesso prompt di "smista" con `--settimana`. | — |
| Action che pulisce i `claude/*` | Il prompt dice già "lavora su `main`". | se i branch appaiono davvero (va misurato, [telefono](/_progetto/v2/telefono.md) prova 1) |

### 1.3 Che cosa ho provato a togliere e ho dovuto rimettere

| elemento | caso che fallisce senza |
|---|---|
| la `restituzione` come tipo immutabile con `voci` numerate | D17 "salvami la terza" e D18 "la seconda no" non hanno referente; D08 "perché me l'avevi messa?" non trova il `perche` |
| la `lettura` separata dal frammento | Unirle in un file solo (frontmatter dell'AI sopra il testo esatto) dimezzerebbe i file. Ma B02 e B22 vogliono "il frammento di ieri identico", e il principio 1 vuole che l'AI non tocchi mai il file delle parole. Due file sono il prezzo dell'immutabilità |
| `voce: seme` ✧ | D02 "le mie frasi, solo le mie" conterebbe il nucleo come tuo |
| `cerchia` | B06 (Marco Aurelio), B12 (nonna Lina negli ID esterni o in una proposta), D19 (Marco come ponte), D22 |
| `parole` candidate | D24 non vede il padre (B05, B19) senza temi messi a caldo. B05 vieta di parlarne come tema |
| `converge-con` distinto da `parla-di` | B16, "Non deve": "ridurla a `parla-di: identita`" |
| `serve-a` | B07, B23, D20 ("non mettere le idee nella raccolta come tue"), D21 |
| `importata` sulle restituzioni, `canale: importato` | D01 ("non contare le note dell'Atlante"), D11, D23 |
| `autore` ≠ `attribuita-a` | B06 (Camus non deve contare), B09, D14 ("non ordinare per `attribuita-a`") |
| `momento`, `fruizione` | B02, B04, B14; B09, B24, D13 ("non proporre i Karamazov") |
| `allegati` + `trascrizione` | B21 ("non trattare l'OCR come parole tue") |
| `alias` | B25 "chioran" |
| **una** lettera settimanale | Il banco non la chiede, ma essenza §1 sì: "la cattura è il prezzo, la restituzione è la ricompensa". Senza, il sistema ripete l'MVP di sola ingestione che "ripete esattamente la traiettoria del primo Atlante" (essenza §5) |

Tengo i 5 generi di nodo. Fonderli in una cartella `nodi/` con un campo `genere` non toglie niente: sposta solo dove sta
l'informazione.

---

## 2. Dove il modello è troppo povero: tre buchi che chi lo implementa colmerebbe a caso

### 2.1 La chat non può scrivere, e tutte le domande del banco scrivono

Il Progetto claude.ai è **in sola lettura** e il Sync è manuale ([telefono](/_progetto/v2/telefono.md) §1d, §3). Il modello
(§4.1, passo 3) dice che "alla tappa 1 lo fa la chat stessa con un memo", ma una chat di Progetto non ha strumenti per
scrivere nel repo. L'utente dovrebbe copiare la domanda e la risposta nel Comando rapido, a mano, ogni volta: è il
contrario del principio 2. Il risultato:
- falliscono i punti **Scrive** di D05 (`ritorna-su … come: effetto`), D13 (la cattura nascosta), D17 (`accoglie`), D18
  (`rifiuta`) e D25 (`contraddice`);
- D04 e D08 rispondono "non lo so" per sempre, perché la catena non si salva.

Chi implementa a caso sceglierebbe tra tre strade, tutte sbagliate: ignorare la persistenza, chiedere all'utente di
incollare, oppure far passare ogni domanda dalla Routine, con minuti d'attesa.

**Che cosa aggiungere.** Una regola esplicita: **finché non c'è il connettore MCP, le domande si fanno in una sessione
Code sul repo**, che può scrivere. Il Progetto resta facoltativo, per chiacchierare senza memoria. La sessione Code costa
1-2 minuti d'avvio ([stato dell'arte](/_progetto/v2/stato-arte.md) §4). Per una domanda è accettabile, per una cattura no:
la lezione 1 ("l'attesa si toglie di mezzo") riguarda la cattura. Così sparisce anche il Sync manuale.

### 2.2 L'identità dei nodi: slug, alias, concorrenza

Il modello vuole lo slug "mai cambiato" (§2.1), ma non dice né come nasce né dove si trova. Restano aperte tre domande:
- **La forma dello slug.** `umberto-galimberti` o `galimberti`? `nichilismo-ospite-inquietante` (B01) segue quale regola?
  E per una citazione senza nome (B21, "questa")?
- **Dove l'AI cerca gli alias.** La Routine apre una sessione nuova a ogni passata. Con 500 nodi deve leggere 500 file per
  trovare "chioran" (B25)?
- **Due fire ravvicinati** sono due sessioni in parallelo ([telefono](/_progetto/v2/telefono.md) §2). Se due memo nominano
  Galimberti, possono nascere sia `galimberti` sia `umberto-galimberti`, e il `pull --rebase` non li fonde: sono due file
  diversi.

**Che cosa aggiungere:**
- una funzione `slug(nome)` deterministica nello script: il `nome` completo, minuscolo, ASCII, kebab-case; per le
  citazioni, le prime 5 parole dell'`originale` o della forma che circola;
- una tabella **alias → slug** in `contesto/mappa.md`, che l'AI legge prima di risolvere un'entità;
- **una sola elaborazione alla volta**: il fire avvia la sessione, ma la sessione prende in ordine *tutto* ciò che è in
  `ingresso/`; se trova un `ingresso/.lavoro` più recente di 10 minuti, esce.

### 2.3 La grammatica dei legami e il campo `delicato`

`legami:` è un elenco di mappe in cui la chiave del predicato varia (`- nomina: x`, `- ritorna-su: y`, accanto a `voce`
e `perche`), e l'oggetto è "uno slug se il nodo esiste, altrimenti il nome in chiaro". Per un parser `camus` può essere
tutte e due le cose. `ritorna-su` vuole a volte un id, a volte `{di, n}`. Senza una grammatica, `verifica.mjs` non può
controllare niente: ogni sessione della Routine scriverà una variante, e l'indice mancherà i legami in silenzio. È la
causa d'abbandono di Tana: "tag incoerenti che le query mancano in silenzio" (stato dell'arte §1).

**Che cosa aggiungere:**
- una forma sola, `{p: nomina, a: umberto-galimberti, voce: sua, perche: "…"}`, con `a: "~Nome in chiaro"` (tilde) per
  ciò che non è un nodo;
- `ritorna-su` sempre `a: <id>` più `n:` facoltativo;
- uno schema JSON di 40 righe che `verifica.mjs` applica prima di ogni push.

**E il campo che manca: `delicato: true` nella lettura.** B25 lo lascia lacuna: non si sa se un frammento delicato resta
fuori dalla lettera. B12 vieta di mettere la nonna in una lettera. La "prudenza" del §4.1 è un giudizio dell'AI preso
all'ingresso, che però deve valere per mesi, in sessioni diverse. Se non è scritto, la sessione della domenica non lo sa,
e lo script che sceglie che cosa mostrare non lo può filtrare.

*Un quarto buco, minore.* Le `parole` candidate vanno normalizzate (singolare, minuscolo, la parola dell'utente): "padri"
in B05 e "padre" in B19 devono essere la stessa parola, se no il conteggio di D24 si spezza. Basta una riga nel prompt e
una nella verifica.

---

## 3. Implementabilità

### 3.1 Stima, righe di codice (stime mie, non misure)

| pezzo | MVP del modello v2 | versione ridotta |
|---|---|---|
| Comando rapido (configurazione, nessun codice) | ~15 azioni | uguale |
| `smista` (sposta il grezzo e scrive frontmatter, nome e canale) | dentro il prompt (AI) | **`smista.mjs`, ~60** |
| `indice.mjs` (5 JSON, 5 formule, stati, voce calcolata dagli atti) | ~500 | — |
| `contesto.mjs` | ~200 (4 file) | ~250 (2 file, con il calcolo dentro) |
| `cerca.mjs` | ~100 | — (la sessione Code usa `grep`) |
| `risolvi.mjs` + integrazione | ~95 + ~50 | — |
| `rileggi` | ~150 + prompt | — |
| `verifica.mjs` (4 tipi, slug, link, immutabilità di frammenti e restituzioni, schema) | ~300 | ~150 |
| importazione dall'Atlante (regole R1–R13 di [eredità](/_progetto/v2/eredita.md)) | ~400 | ~200 (nucleo, 31 frasi U, 25 convergenze, raccolta tatuaggi) |
| Action di pulizia dei branch | ~25 YAML | — |
| collaudo automatico sul banco | ~200 | ~100 |
| **codice** | **~2.000–2.300 righe, 8 script + 1 Action** | **~750–850 righe, 3 script + l'importazione** |
| prompt (CLAUDE.md, smista, consolidamento in due fasi, sogno, istruzioni del Progetto) | ~550 righe | ~250 (CLAUDE.md, smista, settimana) |

Il riferimento: il primo Atlante aveva ~7.200 + ~1.500 righe, e "quattro sessioni su sette erano infrastruttura"
(essenza §0, §4). La v2 piena ne è un terzo, la ridotta un decimo.

### 3.2 Il confine tra prompt e script

| lavoro | nel modello v2 | dove deve stare | perché |
|---|---|---|---|
| spostare il grezzo in `frammenti/`, `registrato`, `canale`, nome del file | Routine (AI) | **script** | Il principio 1 non può dipendere da un LLM che ricopia "nn" e "chioran" senza correggerli. Lo script sposta il file, senza riscriverlo; la verifica controlla con un hash |
| pulire i link (`?si=` via, `t=` tenuto), normalizzare il pin | lettura (AI) | **script** | è una regex (B13, B14, B15) |
| titolo da oEmbed (Spotify, YouTube) | lettura (AI) | **script** (curl), l'AI solo se fallisce | è deterministico e costa zero token |
| slug, alias → slug | AI | **script** + tabella | §2.2 |
| numerazione delle `voci` di una restituzione | AI | **script** dalla struttura | "la terza" deve essere stabile |
| voce `accolta`, rifiuti, conteggi, parole candidate con date | script | script ✔ | |
| "un tuo frammento porta lo stesso legame" vale come accoglienza (Karamazov) | script | **AI**, che scrive `ritorna-su … come: accoglie` | Lo script trova solo legami identici. Riconoscere che la stessa idea torna con altre parole è un giudizio |
| intento, entità, reazione, `delicato`, `contraddice`, temi alla ricorrenza, verifica delle citazioni, scelta della lettera | AI | AI ✔ | |
| scelta del "ti ricordi?" | formula (vitalità) | **AI** su `mappa.md` | Una formula con mezza vita di 90 giorni, tarata su zero dati, sceglie peggio dell'AI che legge le date |
| numeri citati nelle risposte ("6 frammenti, 3 dopo le 22") | indice → AI | script → `mappa.md`; l'AI **non conta** | D10 e D11: "i numeri vengono dall'indice". L'AI che conta inventa |

Le regole del confine sono quattro:
- ciò che deve essere **identico** (le parole, i numeri, gli slug, la numerazione) lo fa uno script;
- ciò che è un **giudizio** lo fa l'AI, e lo scrive come dato perché le sessioni dopo lo trovino (`delicato`, `come: accoglie`);
- le formule senza dati si tolgono;
- il modello v2 sbaglia in tutte e due le direzioni: dà all'AI la copia esatta, che va allo script, e allo script la
  scelta del ricordo, che va all'AI.

---

## 4. Il nucleo minimo vitale (la prima settimana)

**Il criterio di riuscita.** Entro il **terzo giorno d'uso**, l'utente riceve almeno un **ponte inatteso**: un suo memo
nuovo agganciato a una sua frase vecchia dell'Atlante, citata alla lettera e con la data, che non aveva messo insieme lui.
È la scena 1 di [essenza](/_progetto/v2/essenza.md) §3 (Galimberti ↔ Rust, "entrambi sul prezzo della lucidità"), il
"ponte inatteso" di essenza §1, e la lezione 6 dell'[archivio reale](/_progetto/v2/archivio-reale.md) ("la convergenza
è il prodotto").

**Il problema del modello v2.** Alla tappa 1 la risposta di ogni memo finisce in `contesto/recenti.md`, e l'utente la vede
solo "alla prima domanda o nella lettera" (modello §4.3). La notifica push della Routine non è verificata (telefono §4).
Il ponte della scena 1 arriverebbe quindi, nel caso migliore, la domenica. Il modello lo ammette (§8.7) e rimanda la
soluzione alla tappa 2, cioè a 1-3 mesi. La meraviglia è rimandata proprio dove serve.

**La proposta: una prima settimana senza Routine, senza Progetto e senza `contesto/`.**

| giorno | che cosa | quanto codice |
|---|---|---|
| 0 (Claude Code, prima dell'utente) | Repo privato. Importazione minima: il nucleo come frammento ✧, le 31 frasi U ✦, le 25 convergenze e le idee di tatuaggio come restituzioni importate, `raccolte/tatuaggi.md`. Poi `smista.mjs`, `verifica.mjs` con lo schema (§2.3), CLAUDE.md. | ~400 righe |
| 0 (l'utente, ~20 min) | Tre passi soli di [telefono](/_progetto/v2/telefono.md): repo e App GitHub, PAT, Comando rapido **solo `PUT`**, senza fire. "Salvato" in un secondo; nessuna AI nella cattura. | — |
| 1 | **La prima restituzione, prima ancora del primo memo** (è il "primo traguardo" del modello, §9): un ritratto breve sul nucleo e sulle 31 frasi, con **una** convergenza nuova ancorata a una sua frase. Le forme sono già provate in [restituzione](/_progetto/v2/restituzione.md) §1–§2. | prompt |
| 1–3 | Cattura cieca dal Comando rapido. **Una volta al giorno, la sera**, l'utente apre la sessione Code "Specchio" (1-2 minuti d'avvio, a un'ora sola e per scelta: è aprire una lettera, non salvare un pensiero). La sessione lancia `smista.mjs`, scrive le letture e risponde con i ponti della giornata: al massimo uno per memo, **solo se è forte**, sempre da una frase sua e datata. Le domande e i "salvami la terza" si fanno lì, e si salvano come frammento più restituzione (§2.1 risolto). | prompt "Specchio" ~120 righe |
| 3 | **Prova della meraviglia**: c'è stato almeno un ponte? L'utente ha risposto, ripreso o detto "sì"? Se nessun memo ha trovato un ponte, la sessione lo dice ("niente si aggancia ancora"), e non lo inventa. | — |
| 5–7 | Solo se l'apertura serale pesa: la Routine "smista" con il fire e `contesto.mjs` per il Progetto. La domenica, la prima lettera. | ~250 righe |

**Che cosa resta fuori dalla prima settimana:** ID esterni, consolidamento in due fasi, sogno, "ti ricordi?" a intervalli,
ritratto trimestrale, notifiche push, Action, connettore MCP, `.indice/`. Nessuno di questi è un caso del banco, e nessuno
serve alla scena 1.

**Le tre prove del banco da far passare per prime:**
- **B01** e **B02**: Galimberti, il ponte con Rust se è forte, e la domanda sul titolo;
- **B06**: Marco della vita, non Marco Aurelio. Se fallisce questa, la fiducia si rompe subito;
- **D02**: "le mie frasi, solo le mie". È il principio 1 reso visibile.

Le altre 47 prove possono aspettare la seconda settimana.

**Il rischio di questa proposta.** La sessione serale va aperta dall'utente, e il silenzio di 23 giorni dice che se il
sistema non chiama, lui non torna ([archivio reale](/_progetto/v2/archivio-reale.md) §0). Lo accetto per sette giorni, per
due ragioni:
- il ponte arriva lo stesso giorno, non la domenica;
- la Routine con la notifica serve a *richiamare*, non a *meravigliare*, e si aggiunge al giorno 5–7 se la prova del
  giorno 3 è passata.

---

## Collegamenti

- [Il modello v2](/_progetto/v2/modello.md) · [Banco di prova](/_progetto/v2/banco-di-prova.md) · [Essenza](/_progetto/v2/essenza.md) ·
  [Stato dell'arte](/_progetto/v2/stato-arte.md) · [Telefono](/_progetto/v2/telefono.md) · [Archivio reale](/_progetto/v2/archivio-reale.md) ·
  [Restituzione](/_progetto/v2/restituzione.md)
