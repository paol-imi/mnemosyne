# Banco di prova definitivo, nel vocabolario del modello v3

> Progettazione v3, 2026-10-31; riscritto il 2026-11-01 dopo la [prova a freddo](/progetto/v2/prova-a-freddo.md)
> (R30, R46, R54, R58, R64, R66, R70, R24/R62) e il 2026-11-02 dopo la
> [seconda prova a freddo](/progetto/v2/prova-a-freddo-2.md) (P2-1, P2-16, P2-19, P2-37, P2-40, P2-41, P2-79, P2-87, P2-88)
> e dopo la [terza](/progetto/v2/prova-a-freddo-3.md) (P3-9, P3-10, P3-17, P3-40, P3-55, P3-56, P3-61, P3-64, P3-69, P3-79);
> il 2026-11-02, giro 9, dopo la [quarta](/progetto/v2/prova-a-freddo-4.md) (P4-1: R14 senza un ponte dovuto; P4-2: il
> giudice di D02; P4-4, P4-13: la data e la nota di un gruppo di righe).
> Proposta di Claude, da validare. Serve a collaudare l'implementazione
> del [modello v3](/progetto/v2/modello-v3.md) nel repo nuovo: ogni criterio si controlla sui file del repository
> (percorsi, campi del frontmatter, legami, conteggi, ricerche esatte), senza giudizio; il giudizio sta solo nelle
> domande del giudice (parti 3 e 4). Parti: 1 messaggi, 2 domande, 3 restituzione, 4 tempo e uso, 5 come si esegue.
> Nomi, campi, segni e percorsi sono quelli del modello v3 (§3, §4, §5, §6.1): dove il banco e il modello divergono vince
> il modello, e il banco è già allineato. Messaggi e attese vengono da [esempi in ingresso](/progetto/v2/esempi-ingresso.md)
> e [esempi di domande](/progetto/v2/esempi-domande.md), con gli attriti della
> [simulazione d'importazione](/progetto/v2/simulazione/attriti-importazione.md) e della
> [simulazione dell'ingresso](/progetto/v2/simulazione/attriti-ingresso.md). Versioni precedenti, scritte col vocabolario
> del [modello v2](/progetto/v2/modello.md): [banco di prova v2](/progetto/v2/banco-di-prova.md) e la storia git di questo file.

## Come si usa

### Il punto zero

Si parte dal tag `punto-zero` (lo stesso che qui sotto si chiama `banco-zero`): l'importazione del modello §14, una volta
sola, nel commit `importa: punto zero` con data **2026-10-31** (la data dell'ultima frase importata, U31, come nel piano,
blocco 2); i frammenti dentro portano ciascuno la sua data, dal 4 al 31 ottobre 2026.
- **35 frammenti** `canale: importato`, con `registrato` di sola data (le viste orarie non li contano):
  - 32 frasi tue, `20261004-0000-u01` … `20261031-0000-u31` (`u26a`, `u26b`), `voce: sua`; quelle messe per iscritto da
    Claude anche `forma: riportata` (si mostrano ✦ con la nota "trascritta da Claude nel seme", **una volta** per gruppo di
    righe, non su ogni frase: D02, Forma); U18, U19 (il monologo di
    Rust) e U20 hanno nella lettura `altrui: true`: ✦ il gesto, ○ le parole;
  - tre sguardi `voce: seme` (✧): `20261005-0000-s01` (il nucleo, `intento: [sguardo]`, passi citabili come
    `passo: nucleo:19`), `20261005-0000-s04` (tensioni, virtù e fortuna, evoluzione), `20261004-0000-s03` (il racconto
    d'origine, `intento: [niente]`, non fa nascere nodi, salvo `raccolte/tatuaggi.md`). **Nessun `s02`**: il brief dei tatuaggi è la vista dei frammenti
    con `serve-a: tatuaggi`. Nel nucleo U1, U3, U10–U17 sono copie: i legami partono solo dalle frasi `uNN`.
- **~60 restituzioni** `forma: eredita` (`r-AAAAMMGG-0000-eredita-<slug>`, `r-20261007-0000-eredita-citazioni`,
  `r-20261007-0000-eredita-domande`): fuori dai conti, mai sbiadite. Le loro voci `~Nome` sono raggiungibili per chiave in
  `contesto/mappa.md` § Nomi senza nodo (Eraclito, Sisifo si trovano anche senza un nodo).
- **~52 nodi**: quelli che nominano le tue frasi o lo sguardo (`nichilismo` da `s01`, `divina-commedia` da `s04`),
  `raccolte/tatuaggi.md`, gli 8 temi delle domande accolte da U30, `persone/dostoevskij.md` (U31). Gli slug sono quelli
  dell'Atlante (`camus`, `marco-aurelio`, `rust-cohle`). **Non** esistono `nietzsche`, `sisifo`, `eraclito`,
  `umberto-galimberti`: un nodo del mondo nasce al primo frammento tuo che lo nomina. Un nodo "esiste" solo se il suo file
  c'è.
- In `contesto/parole.md` gli importati ✦ stanno marcati con la data-tetto ("entro il 4 ottobre, nell'archivio d'origine").

### Le notazioni

- **`id(B01)`** è l'id del frammento del caso: `20261103-2340-xxxx`, con il suffisso casuale del Comando rapido (modello
  §3.1). Nei percorsi si scrive con il glob: `frammenti/2026/11/20261103-2340-*.md`. La **lettura di B01** è
  `letture/2026/11/id(B01).md`.
- **`slug("x")`** è lo slug a cui `contesto/mappa.md` § Alias porta la chiave `x` dopo il caso (`slug("jung")`, ereditato
  o nato lì). Dove lo slug è calcolabile si scrive per esteso (`umberto-galimberti`, `nonna-lina`).
- **Nuovo** vuol dire: un file che non c'era nel commit prima del caso. **Dopo "consolida"** vuol dire: dopo il primo
  commit `consolida:` che segue il caso (la domenica, 03:13).
- **Nato da un commit `smista:`** (G4, G5) vuol dire: il commit che **aggiunge** il file, cioè l'ultima riga di
  `git log --diff-filter=A --format=%s -- <file>`, ha un messaggio che comincia con `smista:`. Specchio che fa il lavoro di
  "smista" usa lo stesso messaggio (modello §7.3). **Scritta da un commit `smista:`** (G2) si legge allo stesso modo.
- I segni sono le voci dei legami e delle voci: ✦ `voce: sua`, ✧ `voce: seme`, ◌ `voce: proposta`, ○ `voce: mondo`,
  ● accolta (calcolata, mai scritta). Un legame si scrive `{p, a | tra, voce, perche, …}` (modello §4).
- **Risposta** è ciò che legge l'utente dopo un memo (R58): il **corpo** del file `restituzioni/AAAA/MM/r-…-risposta.md`
  che ha `per: id(Bnn)` (o lo ha in `copre`), puntato dal campo `risposta` della lettura; **oppure**, senza file, il
  valore `risposta: salvato` o `risposta: ci-sono` della lettura, che `contesto/recenti.md` mostra come "Salvato." o "Ci
  sono.". La legge in `recenti.md` (Progetto) o in Specchio; il messaggio finale della Routine la riporta solo quando
  l'`intento` comprende `chiedi`. Il testo dopo "es." è un esempio; si controllano solo i criteri scritti.

### I controlli che valgono per ogni B

Ogni caso B **passa** o **fallisce**: fallisce se manca un punto di **File** o di **Mappa**, se un criterio di
**Risposta** non torna, o se accade **un solo** **Non deve**. Oltre alla scheda valgono sempre:
- **G1** il frammento `frammenti/AAAA/MM/id(Bnn).md` ha il corpo uguale al messaggio **byte per byte** (link, refusi e a
  capo compresi), `canale: telefono`, `registrato` con la data e l'ora del caso (± 60 s);
- **G2** la lettura esiste, ha `versione: 1`, `schema: 3`, `letto-da`, `prompt`, ed è scritta da un commit `smista:`;
- **G3** ogni file scritto passa lo schema del modello §3.7 (`verifica.mjs`): quindi nessun campo fuori schema, cioè
  nessun ID esterno, in nessun file;
- **G4** **la regola unica dell'ingresso** (R24/R62; è l'elenco unico del modello §3.4 e §7.2 passo 4): un nodo
  `citazioni/` nato da un commit `smista:` ha solo `schema`, `nome`, `nato-da` e, se ci sono, `alias` (la forma che hai
  usato: modello §3.6, passo 4) e `attribuita-a` (se l'attribuzione è tua); nient'altro, nemmeno `link`; **nessun** `esito` (cioè ⚠: la citazione resta "a
  memoria"), `autore`, `riferimento`, `originale`, `traduzione`, `citata-da`. Quei campi li scrive solo un commit
  `consolida:`; la traccia della verifica rapida sta nel corpo del nodo e, se serve, nella risposta, con ⚠ o con ○ e il suo
  luogo nella voce. Nessuna voce di una risposta all'ingresso porta `esito`;
- **G5** un commit `smista:` non crea un file nuovo in `temi/` se il `nome` del tema non è una parola del frammento (i temi
  dedotti nascono solo da "consolida"); non scrive `contraddice`; al più **2** legami `voce: proposta` per lettura;
- **G6** la risposta ha al più **un** "?", solo nei 7 casi del modello §7.2.1; senza `chiedi`, al più 40 parole tolta la
  riga di servizio iniziale ("Salvato.", "Salvata.", "Ci sono.": non è obbligatoria, salvo dove la scheda la chiede, come
  B01); con `chiedi`, al più 150 parole. **Come si contano** (anche nella parte 2): un "?" dentro un tratto in corsivo che
  si ritrova con una ricerca esatta in `frammenti/` (una tua frase citata), o dentro «», non conta; le parole si contano
  separate da spazi, senza i link;
- **G7** nessun frammento, lettura di un altro frammento o restituzione già esistente cambia (hash), salvo le versioni
  nuove delle letture scritte da "consolida".

Gli slug dei nodi nuovi si danno quando la regola del modello §3.6 li fissa; altrimenti la scheda dice il genere e il
campo che li identifica. *Lacuna* segna un punto in cui il modello non sa rispondere.

### Come arrivano i casi

I 25 messaggi arrivano **in ordine di data** dal Comando rapido "Memo": sul telefono "Salvato", il frammento completo in
`ingresso/`; "smista" lo sposta in `frammenti/`, scrive la lettura, i nodi e la risposta dal piano, rigenera
`contesto/`. Le domeniche in mezzo girano "consolida" (03:13) e "lettera" (17:37), il primo del mese "ritratto", con la
loro data. Il caso B22 si esegue **senza** il frammento dell'11 marzo che il corpus presuppone (R54): la variante con quel
frammento è la prova T03.

## 1. Venticinque messaggi in ingresso

**B01 · E01** · 2026-11-03 23:40 · video, citazione dentro una citazione
> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

- **File:** lettura con `intento: [salva]`, `reazione: [{parole: "molto interessante", verso: "+"}]`,
  `parole` che contiene `ragazzo` e `cultura`, e i quattro legami ✦ del modello §3.3: `nomina` `umberto-galimberti`,
  `nomina` dello spettacolo, `nomina` della citazione, `parla-di` `nichilismo`. Nuovi: `persone/umberto-galimberti.md`
  (`cerchia: mondo`, `alias` con `galimberti`); `opere/spettacolo-sulle-emozioni.md` (`autore: umberto-galimberti`): lo
  spettacolo **nasce anche se detto con "credo"** (R66, modello §13.2), con le tue parole nel `perche`; un file in
  `citazioni/` con `ospite` nello slug, `attribuita-a: [umberto-galimberti]` e niente altro (G4). `temi/nichilismo.md`
  c'era già (nato dallo sguardo). Dopo "consolida": nella citazione `autore: "~Friedrich Nietzsche"`, `esito: simile`,
  `riferimento` con *Frammenti postumi*.
- **Mappa:** § Nodi ha la riga `umberto-galimberti · persone` con ✦1; § Alias ha `galimberti → umberto-galimberti`.
- **Risposta:** un file con `per: id(B01)`, con due voci `voce: mondo` (la citazione, `cosa: citazione`; lo spettacolo,
  `cosa: opera`); il corpo contiene "Salvato", "Nietzsche", "*Il mondo delle emozioni*" e "⚠"; **nessun "?"**: il titolo
  è solo incerto e il nodo non lo fissa, quindi non è il caso 1 del §7.2.1. Ogni voce sta **a inizio riga** (`1.`, `2.`:
  modello §3.5). Es. (modello §13.2), su tre righe: "**Salvato.**" / "1. "L'ospite inquietante" è un'immagine di
  Nietzsche ○, che Galimberti ha ripreso in un libro ⚠." / "2. Lo spettacolo forse è *Il mondo delle emozioni* ⚠."
- **Non deve:** un nodo per il libro del 2007 (nessun file nuovo in `opere/` oltre allo spettacolo); "Il mondo delle
  emozioni" nel `nome` o negli `alias` di un nodo; un file nuovo `temi/ragazzo.md`, `temi/giovani.md` o `temi/cultura.md`;
  un file `persone/*nietzsche*`; nel corpo della risposta "quanto ti ha colpit" o "2008" o "plagi".

**B02 · E02** · 2026-11-04 08:12 · follow-up
> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

- **File:** lettura (modello §13.4) con `intento: [salva]`, `parole: [greci]` e i legami
  `{p: ritorna-su, a: id(B01), come: aggiunge, voce: sua}` e `{p: nomina, a: <slug della citazione di B01>, momento: "verso
  la fine", voce: sua}`. Nessun file nuovo in nessuna cartella di nodi.
- **Mappa:** § Parole candidate ha `greci` con una data.
- **Risposta:** `risposta: salvato`, nessun file con `per: id(B02)` ("Aggiunto allo spezzone di ieri" non è contenuto:
  C11).
- **Non deve:** cambiare frammento o lettura di B01; un file `temi/greci.md` o `temi/filosofia-antica.md`; una risposta
  con "?".

**B03 · E03** · 2026-11-09 19:02 · citazione parafrasata
> jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato

- **File:** lettura con `reazione: [{parole: "mi ha spaccato", verso: "+"}]`, `parole` che contiene `inconscio` e
  `destino`, `nomina` ✦ della citazione. "X: frase" (modello §3.4): un file nuovo in `citazioni/` il cui `attribuita-a`
  contiene `slug("jung")` o un `~Nome` con "Jung"; nessun legame `nomina` verso la persona Jung. Dopo "consolida": nella
  citazione `esito: simile`, `riferimento` con "Aion" e "126", `originale` e `traduzione`, `autore` uguale a Jung (slug o
  `~Carl Gustav Jung`).
- **Mappa:** § Nodi ha la riga della citazione con ✦1.
- **Risposta:** un file con `per: id(B03)`; il corpo contiene "Aion" e "⚠"; nessun "?". Es.: "**Salvata.** Così non
  sembra letterale ⚠: è vicina ad *Aion* §126. Ti metto accanto il passo vero quando l'ho controllato."
- **Non deve:** cambiare il frammento; mettere in `originale` la forma che circola (l'`originale` di dopo "consolida" non è
  uguale al testo del frammento); G4 violata.

**B04 · E22** · 2026-11-11 19:45 · album, "la 3"
> ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto

- **File:** lettura con `{p: nomina, a: private-music, momento: "traccia 3", voce: sua}`,
  `reazione: [{parole: "mi ha distrutto", verso: "+"}]`, `nota` che contiene "macchina". `opere/private-music.md` esiste
  (nuovo o no) con `autore: slug("deftones")` e, all'ingresso o dopo "consolida", `anno: 2025`. Il nodo della traccia
  nasce **solo** dopo la tua conferma, con `in: private-music` (modello §4, `momento`).
- **Mappa:** § Nodi ha `private-music · opere` con ✦1.
- **Risposta:** un file con `per: id(B04)`; **esattamente un** "?" (caso 1 del §7.2.1); il titolo nella domanda è quello
  della tracklist trovata con la ricerca leggera della pagina dell'album (modello §7.2: *ecdysis*, da verificare); se la
  tracklist non si può controllare, la risposta lo dice e non nomina un titolo. Es.: "**Salvato.** La 3 è *ecdysis*,
  giusto?"
- **Non deve:** un file nuovo in `opere/` per la traccia; un legame `nomina` verso la traccia (slug o `~Nome`) prima della
  conferma; due "?".

**B05 · E53** · 2026-11-16 23:00 · reel, attribuzione sbagliata
> galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto

- **File:** lettura con `nomina: umberto-galimberti` ✦ (nessun file nuovo per Galimberti); `nomina` ✦ di
  `persone/telemaco.md` (nuovo, `cerchia: finzione`, `in` uguale a `~Odissea` o allo slug dell'Odissea se c'è);
  `{p: nomina, a: "~Massimo Recalcati", voce: mondo}` con un `perche` che contiene "Recalcati" e "Telemaco" (l'idea
  attribuita non è una citazione: modello §4); `reazione: [{parole: "mi ha colpito tanto", verso: "+"}]`; `parole` che
  contiene `padre` e `mare`.
- **Mappa:** § Parole candidate ha `padre` e `mare`, ciascuna con una data.
- **Risposta:** un file con `per: id(B05)`; il corpo contiene "Recalcati", "*Il complesso di Telemaco*" e "2013";
  **esattamente un** "?" (caso 2: un fatto scritto da te). Es.: "**Salvato.** È più probabile Recalcati ○: *Il complesso di
  Telemaco* (Feltrinelli, 2013) è suo. Correggo?" Se poi rispondi sì, la lettura del sì ha un `ritorna-su` verso `id(B05)`
  con `come: corregge` (modello §13.6).
- **Non deve:** un `ritorna-su … come: corregge` nella lettura di B05; un file `persone/*recalcati*` prima del tuo sì; un
  file nuovo in `citazioni/`; un file `temi/padre.md`.

**B06 · E08** · 2026-11-20 12:44 · falsa attribuzione nota, persona della vita
> marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina

- **File:** nuovo `persone/marco.md` con `cerchia: vita`, senza `link` né `in`, senza alias che contengano "aurelio";
  nella lettura `{p: nomina, a: marco, voce: sua}` con un `perche` che contiene «marco mi ha mandato»; `nomina` ✦ di un file
  nuovo in `citazioni/` con `attribuita-a: [camus]` e niente altro (G4); `reazione: [{parole: "carina ma un po' da bacio
  perugina", verso: "-"}]` (l'ironia è −: modello §3.3). Dopo "consolida": `esito: errata`, **nessun** `autore` (vero
  autore ignoto: modello §3.4), `riferimento` con la scheda di Quote Investigator e "fonte secondaria".
- **Mappa:** § Alias porta `marco` a `marco` (`cerchia: vita`), non a `marco-aurelio`.
- **Risposta:** un file con `per: id(B06)`; il corpo contiene "Camus" e "○", e una voce `voce: mondo` con un
  `riferimento`; nessun "?"; nessuna ripresa della reazione (R67). Es.: "**Salvata.** Non risulta di Camus ○: autore
  ignoto (Quote Investigator)."
- **Non deve:** un legame con `a: marco-aurelio` nella lettura; `verso: "+"` nella reazione; un file nuovo in `temi/`.

**B07 · E09** · 2026-11-22 17:20 · citazione con l'opera sbagliata, tatuaggio
> camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei

- **File:** lettura con `nomina` ✦ di un file nuovo in `citazioni/` e `{p: serve-a, a: tatuaggi, voce: sua}`,
  `reazione: [{parole: "questa me la tatuerei", verso: "+"}]`. La citazione ha `attribuita-a` con `camus` e `~La peste`
  (l'attribuzione tua, anche all'opera: modello §7.2) e niente altro (G4). Dopo "consolida": `autore: camus`,
  `esito: simile` (opera sbagliata e forma parafrasata: modello §16.2), `riferimento` con "Ritorno a Tipasa" e "1954",
  `originale` in francese.
- **Mappa:** § Conti: la raccolta `tatuaggi` ha 1 frammento ✦ non importato.
- **Risposta:** un file con `per: id(B07)`; il corpo contiene "Tipasa" e "1954"; nessun "?". Es.: "Bella, ed è sua, ma non
  è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠."
- **Non deve:** un file `opere/la-peste.md`; "peste" nell'`autore` o nel `riferimento` della citazione; un tipo di nota
  "tatuaggio" (nessun campo né cartella fuori schema).

**B08 · E45** · 2026-11-24 23:50 · persona della vita, parole d'altri
> marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso

- **File:** lettura con `{p: nomina, a: marco, voce: sua}` (nessun file `persone/marco-*`);
  `{p: parla-di, a: battaglie-interiori, voce: proposta}` (le parole sono di Marco, il concetto è tuo da U8); reazioni
  `{parole: "non l'ho presa bene", verso: "-"}` e `{parole: "ci ha preso", verso: "±"}` (modello §3.3).
- **Mappa:** § Nodi: `marco · persone` con ✦2.
- **Risposta:** un file con `per: id(B08)`; il corpo contiene "battaglie interiori", "4 ottobre" e "✦"; nessun "?". Es.:
  "**Salvato.** *Battaglie interiori* è una tua parola ✦ (entro il 4 ottobre, trascritta da Claude nel seme)."
- **Non deve:** un file nuovo in `citazioni/` (le parole di Marco non sono una citazione da verificare); un legame verso
  `marco-aurelio`; un legame `parla-di … come: stato`.

**B09 · E10** · 2026-11-26 09:05 · autore scambiato, libro in lettura
> frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente

- **File:** `opere/uno-psicologo-nei-lager.md` (nuovo se non c'era; `autore` uguale a Frankl, slug o `~Viktor Frankl`);
  nella lettura `{p: nomina, a: uno-psicologo-nei-lager, fruizione: in-corso, voce: sua}`; `nomina` ✦ di un file nuovo in
  `citazioni/` il cui `attribuita-a` contiene Frankl (slug o `~Nome` con "Frankl"), e niente altro (G4). Dopo "consolida":
  `autore: "~Friedrich Nietzsche"`, `esito: errata`, `citata-da` con Frankl (cita Nietzsche dandogli il merito: modello
  §3.4), `riferimento` con "Crepuscolo degli idoli" e "§12"; `attribuita-a` resta con Frankl.
- **Mappa:** § Fruizioni, "in corso": `uno-psicologo-nei-lager`.
- **Risposta:** un file con `per: id(B09)`; il corpo contiene "Nietzsche", "Crepuscolo" e "⚠"; nessun "?". Es.: "La frase
  è di Nietzsche ⚠ (*Crepuscolo degli idoli*), Frankl la cita. Segno il libro in lettura."
- **Non deve:** Frankl in `autore` della citazione, in nessun momento; un file `persone/*nietzsche*`; togliere Frankl da
  `attribuita-a` (è la tua storia).

**B10 · E67** · 2026-11-30 19:00 · stato d'animo vago, metafora
> oggi mi sento come sisifo

- **File:** nuovo `persone/sisifo.md` (`cerchia: finzione`, `in: "~mito greco"`: un mito col nome del protagonista è una
  persona, modello §3.4): nasce qui, al primo frammento tuo che lo nomina. Nella lettura
  `{p: parla-di, a: sisifo, come: metafora, voce: sua}` e nient'altro tra i legami ✦.
- **Mappa:** § Nomi senza nodo: la chiave `sisifo` ora è collegata a `sisifo`, con le restituzioni `eredita` che la
  citano (C4, C16, *La discesa di Sisifo*); § Posizioni non ha una riga per `id(B10)`.
- **Risposta:** `risposta: salvato`, nessun file (E66, Sisifo felice, non è nel banco: niente appiglio per una domanda).
- **Non deve:** un legame `parla-di … come: stato` (un'emozione inventata); un legame verso `il-mito-di-sisifo` o verso
  Camus; un file `opere/sisifo*` o `temi/sisifo*`.

**B11 · E12** · 2026-12-05 18:40 · domanda dentro un memo
> chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi

- **File:** lettura con `intento: [salva, chiedi]`; `nomina` ✦ di un file nuovo in `citazioni/` (una frase riconoscibile è
  una citazione anche senza autore: modello §3.4) **senza** `attribuita-a` (non la attribuisci) e senza gli altri campi di
  G4; `temi/kintsugi.md` esiste dopo il caso (un concetto che nomini tu nasce subito come tema, se non c'era); il legame
  `{p: converge-con, tra: [<slug della citazione>, kintsugi], voce: sua}` con un `perche` che contiene «tipo kintsugi».
  Dopo "consolida": `autore: "~Ernest Hemingway"`, `esito: simile` (lui scrive «alcuni», il testo «many»: modello §16.2),
  `riferimento` con "Addio alle armi" e "34".
- **Mappa:** § Nodi: `kintsugi · temi` con ✦1.
- **Risposta:** un file con `per: id(B11)`, una voce `cosa: citazione` di `voce: mondo` con un `riferimento`; il corpo
  contiene "Hemingway" e "Addio alle armi"; nessun "?" (la domanda è tua). La Routine chiude con la risposta come messaggio
  finale e la notifica "La risposta è pronta". Es.: "Hemingway, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi
  in parole ✦."
- **Non deve:** rispondere senza salvare o salvare senza rispondere (lettura senza `risposta` che punti a un file); il
  `converge-con` con `voce: proposta`; un file `persone/*hemingway*` o `opere/*addio*` (la verifica non fa nascere nodi);
  il kintsugi come `~Kintsugi` invece del tema.

**B12 · E26** · 2026-12-07 02:10 · intimo, lutto
> la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso

- **File:** lettura con `delicato: true`; `nomina` ✦ di `opere/la-cura.md` (nuovo se non c'era; `autore` uguale a
  Battiato, slug o `~Franco Battiato`); nuovi `persone/nonna-lina.md` e `persone/cugina.md` (`cerchia: vita`, senza `link`;
  "mia cugina" è una parentela: slug fisso, alias solo col possessivo, `mia cugina`: modello §3.4); `reazione:
  [{parole: "ho pianto come un cretino", verso: "±"}]` (una commozione); zero legami `voce: proposta`.
- **Mappa:** § Conti conta il frammento senza nominarlo; nessun tema proposto per `nonna-lina` o `cugina`.
- **Risposta:** `risposta: ci-sono` e nessun file con `per: id(B12)`; **oppure** un file il cui corpo, tolti spazi e a
  capo, è esattamente "Ci sono. Tutto bene?" (caso 7). Nient'altro (modello §7.2.1, la prudenza).
- **Non deve:** un file nuovo in `temi/`; un file per il matrimonio (`*matrimonio*`); nel corpo di una risposta "amore",
  "perdita", "lutto", "nonna", "Battiato"; un `link` in un nodo `cerchia: vita`.

**B13 · E27** · 2026-12-09 18:00 · link nudo
> https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3

- **File:** il frammento conserva `?si=a1b2c3` (G1). Lettura con
  `link: [{url: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC", titolo, autore}]`: senza `?si=`, `titolo`
  dall'oEmbed (il brano esiste: *Never Gonna Give You Up*), `autore` dalla pagina (`og:description`), perché l'oEmbed di
  Spotify non dà l'artista (modello §16.2); nessuna `reazione`; nessun file nuovo in `opere/`, `persone/` o `temi/` (un link
  muto non fissa subito uno slug: modello §3.4); un eventuale `nomina` punta solo a un `~Nome`.
- **Mappa:** § Stato: il frammento non è parlante (non ha parole tue oltre il link) e non entra nei conti.
- **Risposta:** un file con `per: id(B13)`; il corpo contiene il `titolo` di `link` ed **esattamente un** "?" (caso 3:
  "Che cosa ti ha preso?"). Se l'oEmbed fallisce: il corpo contiene "link" e nessun titolo. Es.: "**Salvato** *Never Gonna
  Give You Up*, Rick Astley. Che cosa ti ha preso?"
- **Non deve:** un `titolo` che non viene dall'oEmbed o un perché scritto nella lettura (`nota`, `perche`); la stessa
  domanda in un'altra restituzione nei 30 giorni dopo (§ In sospeso).

**B14 · E37** · 2026-12-10 23:00 · link con il momento
> https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello

- **File:** il frammento intatto, con `t=754&si=Hk2` (G1). Lettura con `link` il cui primo `url` è
  `https://youtu.be/dQ9xLmP0aBc?t=754`: `t=` tenuto, `si=` tolto. L'id non esiste (oEmbed 404: modello §16.2), quindi
  `link` non ha `titolo` né `autore`, e nessun file nuovo in `opere/` o `persone/` (link senza nome: R64, modello §3.4);
  un eventuale `nomina` verso un `~Nome` porta `momento: "12:34"`. Il frammento è parlante (ha parole tue).
- **Mappa:** —
- **Risposta:** allineata al modello §7.2.1 (R64): non è un link muto, quindi **nessun "?"**; `risposta: salvato`, oppure
  un file con `per: id(B14)` il cui corpo contiene "12:34" o "minuto 12" e nessun titolo né canale. Es.: "**Salvato**, dal
  12:34."
- **Non deve:** perdere `t=754` nel `link` pulito; un "?" in una risposta (in particolare "che cosa ti ha preso?": hai
  scritto "solo quello"); un `titolo` o un canale inventati.

**B15 · E14** · 2026-12-12 20:15 · Pinterest, lingua
> https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo

- **File:** il frammento intatto (G1); nella lettura `link: [{url: "https://www.pinterest.com/pin/1234567890123/"}]` (il
  pin normalizzato); **esattamente un** file nuovo in `citazioni/`, con `attribuita-a` che contiene Rilke (slug o
  `~Rainer Maria Rilke`) e niente altro (G4); `nomina` ✦ della citazione. Dopo "consolida": `originale` in tedesco,
  `traduzione` che dice chi l'ha tradotta, `riferimento` con "Libro d'ore" (il volume è del 1905; il 1899 è la prima parte:
  modello §16.2), `esito: verificata`.
- **Mappa:** —
- **Risposta:** un file con `per: id(B15)`; il corpo contiene "Rilke" e "Libro d'ore"; nessun "?". Es.: "Rilke, *Libro
  d'ore* ⚠."
- **Non deve:** più di un file nuovo in `citazioni/` (una per lingua); un'immagine del pin in `frammenti/` o in `allegati`;
  "c'è già" nel corpo se il nodo di Rilke non esisteva prima del caso.

**B16 · E17** · 2027-01-09 16:30 · intuizione che collega
> eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?

- **File:** lettura con `intento: [salva]` (una domanda su di te non è `chiedi`: modello §7.2); `temi/il-fiume-di-eraclito.md`
  e `temi/nave-di-teseo.md` esistono dopo il caso (concetto con il suo autore = un tema solo, con l'autore nel nome; la
  persona Eraclito non nasce: modello §3.4); `{p: converge-con, tra: [il-fiume-di-eraclito, nave-di-teseo], voce: sua}`
  con un `perche` che contiene «sono la stessa domanda»; al più un legame `voce: proposta`, e se c'è è un `parla-di` verso
  uno degli 8 temi nati da `r-20261007-0000-eredita-domande`.
- **Mappa:** § Nodi: `il-fiume-di-eraclito` e `nave-di-teseo` con ✦ ≥ 1; nessun file `persone/*eraclito*`.
- **Risposta:** un file con `per: id(B16)`; il corpo contiene "Cratilo" e "402a"; nessun "?". Es.: "Sì, convergono ✦:
  l'identità nel cambiamento. Il 'due volte' è di Platone (*Cratilo* 402a) ⚠."
- **Non deve:** al posto del `converge-con`, un `parla-di` verso un tema dell'identità; il `converge-con` con
  `voce: proposta`; nel corpo "sei la stessa persona" o "non sei la stessa persona".

**B17 · E48** · 2027-02-03 07:10 · sogno
> sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura

- **File:** lettura con `vissuto: stanotte`, una `reazione` con `parole: "non avevo paura"`, `parole` che contiene `scala`
  e `mare`; al più un legame `voce: proposta`.
- **Mappa:** § Parole candidate: `mare` con 2 date (B05, B17) e nessuna vicenda (servono 3 frammenti in 3 giorni).
- **Risposta:** `risposta: salvato`, nessun file ("Salvato il sogno." non è contenuto; "Ti dice qualcosa?" non è tra i 7
  casi).
- **Non deve:** un legame verso `telemaco` o con "padre"; un testo che interpreta (nessuna restituzione con `per: id(B17)`).

**B18 · E49** · 2027-02-09 13:00 · vuoto
> boh niente volevo solo scrivere qualcosa

- **File:** lettura con `intento: [niente]` e `legami: []`.
- **Mappa:** § Stato: il frammento non è parlante; § Conti non lo conta.
- **Risposta:** `risposta: ci-sono`, nessun file.
- **Non deve:** un legame `voce: proposta`; un "?" in qualunque risposta.

**B19 · E50** · 2027-03-01 22:00 · tre cose in un messaggio
> oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata

- **File:** un frammento solo (nessun altro file in `frammenti/2027/03/20270301-*`). Lettura con
  `{p: nomina, a: slug("karamazov"), fruizione: fatta, voce: sua}` (l'opera nasce se non c'era, slug dal titolo come lo
  dici tu); `{p: nomina, a: la-cura, voce: sua}` (lo stesso nodo di B12); `nomina` ✦ di `persone/papa.md` (nuovo,
  `cerchia: vita`, alias solo col possessivo, `mio padre`); `parole` che contiene `padre`.
- **Mappa:** § Nodi: `la-cura` con ✦2 (un ritorno spontaneo: modello §6.2); § Parole candidate: `padre` con 2 date (B05,
  B19) e nessuna vicenda.
- **Risposta:** `risposta: salvato`; se c'è un file, nessun "?" e nessuna di "padre", "papà", "litig".
- **Non deve:** più di un frammento; un file `temi/padre.md` da un commit `smista:` (il tema dedotto nasce solo in
  "consolida"); l'alias `padre` (senza possessivo) in `persone/papa.md`.

**B20 · E69** · 2027-03-08 23:40 · posizione contro il nucleo
> forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove

- **File:** lettura v1 con `{p: parla-di, a: dolore, voce: sua}`, `parole` che contiene `noia`, nessun `contraddice`.
  Dopo "consolida": la lettura `versione: 2` ha **esattamente un** `contraddice`, con `a: 20261004-0000-u03` (la frase tua
  più vicina, «la dimensione principale della realtà è il dolore»), `voce: proposta` (proposto dall'AI è sempre tensione:
  modello §4), con o senza `come: dubbio`; nessun legame verso `20261005-0000-s01`.
- **Mappa:** § Posizioni ha una riga `20261004-0000-u03 (2026-10-04) ⟷ id(B20) (2027-03-08)`, come tensione.
- **Risposta:** un file con `per: id(B20)`; il corpo contiene "dimensione principale" e "4 ottobre"; **esattamente un** "?"
  (caso 6: una tensione fresca con lo sguardo). Es.: "**Salvato.** Entro il 4 ottobre ✦ scrivevi *la dimensione
  principale della realtà è il dolore*: è un cambio, o un'altra faccia?"
- **Non deve:** cambiare U3 o il nucleo (hash); nel corpo "hai cambiato idea"; un file `persone/*schopenhauer*`.

**B21 · E42** · 2027-03-10 18:20 · foto di una pagina
> [foto di una pagina con una riga sottolineata a matita] questa

- **File:** il frammento con corpo "questa" e `allegati` con il solo originale (`id(B21).jpg` o `.heic`, intatto); la copia
  ridotta `id(B21).webp` sta accanto, **fuori** da `allegati`, ricavata da [S] (lato lungo ≤ 2000 px: modello §3.2). Lettura con `trascrizione` (la riga letta) e
  nessun legame `voce: sua` che la tratti come parole tue; **nessun file nuovo in `citazioni/`** all'ingresso (un "questa"
  su una foto non fissa subito uno slug: modello §3.4). Dopo "consolida": se la verifica trova la fonte, nasce un nodo
  citazione con `nato-da: [id(B21)]`, `originale` uguale alla `trascrizione` riletta, `esito` e `riferimento`; se non la
  trova, nessun nodo, oppure un nodo con `esito: non-trovata`. Mai un nodo senza `esito`.
- **Mappa:** § Stato: il frammento non è parlante ("questa" è una parola).
- **Risposta:** un file con `per: id(B21)`; il corpo contiene, tra «», un tratto della `trascrizione` ed **esattamente
  un** "?" (caso 5). Es.: "Letto: «[la riga]» ○. Da che libro?"
- **Non deve:** un `autore`, un `attribuita-a` o un titolo di libro indovinati (in nessun file, prima di "consolida");
  la `trascrizione` in corsivo o segnata ✦ nella risposta.

**B22 · E51** · 2027-03-12 16:00 · correzione
> no aspetta quella di ieri sulla casa in ordine non era jung era peterson

Si esegue senza il frammento dell'11 marzo (R54): negli ultimi 3 giorni di calendario più oggi ci sono solo B20 e B21, e
nessuno parla della casa in ordine.
- **File:** lettura con `intento: [salva]` e **nessun** `ritorna-su … come: corregge` (senza bersaglio non c'è atto:
  modello §4).
- **Mappa:** § Correzioni senza righe nuove.
- **Risposta:** un file con `per: id(B22)`; il corpo contiene "riscrivi" ed **esattamente un** "?" (caso 4). Es.: "Non
  trovo la frase di ieri sulla casa in ordine: me la riscrivi?"
- **Non deve:** un `corregge` verso la citazione di B03 (Jung, novembre: fuori dai 3 giorni) o verso B21; un file nuovo in
  `citazioni/` o `persone/`. Con il frammento dell'11 marzo il caso diventa la prova T03.

**B23 · E65** · 2027-03-20 22:30 · tatuaggio
> ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto

- **File:** lettura con `{p: serve-a, a: tatuaggi, voce: sua}`, `parole` che contiene `crepa` e `luce` (un'immagine con un
  nome comune resta parola candidata: modello §3.4); al più 2 legami `voce: proposta`, che toccano solo B11 (il frammento,
  la sua citazione o `kintsugi`) e B03 (il frammento o la sua citazione).
- **Mappa:** § Conti: la raccolta `tatuaggi` ha 2 frammenti ✦ non importati (B07, B23).
- **Risposta:** un file con `per: id(B23)`; il corpo contiene "5 dicembre" (l'aggancio a B11) e "Anthem" (il fatto ○);
  nessun "?" ("Te le metto in fila?" non è tra i 7 casi). Es.: "**Salvato** tra i tatuaggi. Il 5 dicembre ✦ scrivevi *più
  forti nei punti rotti? tipo kintsugi*; fuori, Leonard Cohen, *Anthem* (*The Future*, 1992) ○."
- **Non deve:** nel corpo "Rumi", "Caravaggio" o "cinque fonti" (E61, E62, E43 non sono nel banco); un verso di Cohen tra
  virgolette ("crack", "light gets in"); un file nuovo in `temi/` o `citazioni/` per la crepa.

**B24 · E44** · 2027-03-22 12:00 · da leggere
> devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce

- **File:** lettura con `{p: nomina, a: il-mondo-come-volonta-e-rappresentazione, fruizione: da-fare, voce: sua}`
  (l'opera nasce se non c'era, con `autore: "~Arthur Schopenhauer"`); `nomina` ✦ dell'opera *Evangelion* (slug o `~Nome`)
  con un `perche` che contiene «dopo evangelion»; `parole` che contiene `porcospino`.
- **Mappa:** § Fruizioni, "da fare": 1 libro, `il-mondo-come-volonta-e-rappresentazione`.
- **Risposta:** un file con `per: id(B24)`; il corpo contiene "Parerga" e "1851"; nessun "?" ("forse meglio partire da
  lì?" non è tra i 7 casi). Es.: "**Salvato** da leggere. Il porcospino è nei *Parerga e paralipomena* (1851) ⚠, non nel
  *Mondo*."
- **Non deve:** `fruizione: da-fare` su un nodo dei *Parerga*; un file `opere/*parerga*` senza un tuo sì; un file
  `persone/*schopenhauer*`; G3 violata.

**B25 · E52** · 2027-04-02 20:00 · tema delicato, dettato vocale
> ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere

- **File:** il frammento con "chioran" intatto (G1); lettura con `delicato: true` e zero legami `voce: proposta`;
  `persone/emil-cioran.md` **nuovo**, con `chioran` negli `alias` (nella parte 1 nessun caso prima di B25 fa nascere Cioran,
  e un nome che non ha la chiave `cioran` tra nome e alias non dà candidati per "chioran"); se sul ramo c'è già un nodo
  Cioran con la chiave `cioran` (come dopo T01), è quello, trovato per **scheletro** (`crn`: modello §3.6), con `chioran`
  aggiunto agli `alias`; un file nuovo in `citazioni/` con `attribuita-a: [emil-cioran]` e niente altro (G4). Dopo "consolida":
  `riferimento` con "Sillogismi dell'amarezza" (1952), non *L'inconveniente di essere nati*.
- **Mappa:** § Conti conta il frammento senza nominarlo.
- **Risposta:** allineata al modello §7.2.1 (R64): `risposta: ci-sono` e nessun file con `per: id(B25)`; **oppure** un
  file il cui corpo, tolti spazi e a capo, è esattamente "Ci sono. Tutto bene?" (caso 7). Una riga umana, nient'altro.
- **Non deve:** nel corpo di una risposta "Cioran", "Sillogismi", "suicid", una parola di X3 (parte 3); un file nuovo in
  `temi/`; un secondo nodo per Cioran (`persone/*cioran*` è uno solo).

## 2. Venticinque domande

Le domande si fanno dopo B25, nell'ordine del banco, nel **Progetto** claude.ai, che legge solo `contesto/` (`parole.md`
con i tuoi frammenti ✦ parlanti e gli importati marcati, `recenti.md`, `ritratto.md`, `mappa.md`) ed è in sola lettura
(modello §7.3). D14 e D15 si fanno in **Specchio**, perché vanno verificate sul testo primario (§7.3, caso 1). E60 ed
E70 tengono la loro data (10 e 18 aprile 2027). Dove c'è scritto **oggi**, la stessa domanda si fa sul solo punto zero.

**Le conversazioni.** Ogni gruppo `###` qui sotto è **una** conversazione (le catene restano nella stessa chat); D24 e D25
sono due conversazioni a sé, alla loro data. Il Progetto chiude ogni conversazione con il **memo YAML** (turni, voci
numerate, `perche`, `risponde-a`), che si rimanda con il Comando rapido "Memo"; `smista.mjs` lo separa in **un**
frammento `canale: chat`, `forma: riportata` (una riga `[HH:MM]` per turno) e **una** restituzione `forma: risposta` con
`per` uguale a quel frammento, una sezione `### HH:MM · …` per domanda e le voci numerate con il loro `turno`. Specchio
sigilla lo stesso frammento e la stessa restituzione, senza `forma: riportata`.

**Come si leggono i criteri.**
- **Dati**: dove sta in `contesto/` ciò che la risposta deve usare (le sezioni di `mappa.md` del modello §6.1).
- **Forma**: criteri sulla sezione della risposta: righe, parole, "?", segni, frasi alla lettera (una frase ✦ si ritrova
  con una ricerca esatta in `frammenti/`, una ✧ in `s01`, `s03` o `s04`). Un tratto "alla lettera" è una sequenza di almeno 4
  parole (o il frammento intero, se è più corto) che si ritrova con una ricerca esatta; il "?" si conta come in G6 (un "?" dentro una tua frase citata o tra «» non
  conta). Ogni numero detto è uguale a quello di `mappa.md` (l'AI
  non conta: §7.3). **Nessun "?"** salvo "Vuoi il resto?", che è una riga di servizio: fuori da ingresso, confronto e
  ritratto il modello non ammette domande (§9.1).
- **Scrive**: che cosa compare nei file, oltre al turno nel frammento di chat e alla sua sezione nella restituzione, che
  ci sono sempre. "Niente" vuol dire: nessun file nuovo e nessun legame con il `turno` di quella domanda nella lettura del
  frammento di chat.
- **Non deve**: come nella parte 1, un fatto solo basta a fallire.

Il giudizio sulle risposte si dà come nella parte 3 (§5, "Il giudice AI"); una scheda D che ha le sue domande
(**Giudice AI**) si giudica su quelle.

### Su di me

**D01 · n.74**
> cosa dice di me quello che salvo?

- **Dati:** `mappa.md` § Conti (per voce, solo ✦ non importati; ✧ a parte), le reazioni, le ore, le raccolte.
  **Oggi:** i conti sono vuoti, quasi tutto è dell'Atlante. **Dopo i 25:** le citazioni con `esito` diverso da
  `verificata` (dopo i consolidamenti), i frammenti parlanti dalle 22 alle 3 (8: B01, B05, B08, B12, B14, B19, B20, B23,
  con B12 contato e non nominato), le persone `cerchia: vita` (marco, nonna-lina, cugina, papa).
- **Forma:** ≤ 6 righe; 2-3 osservazioni, ognuna con una frase ✦ alla lettera e la sua data; le letture segnate ◌.
  **Oggi:** contiene "niente" o "0" per i memo tuoi, e lo dice.
- **Scrive:** niente.
- **Non deve:** un numero che conti gli importati; una parola di X3 (parte 3); il testo o la data di B12 o di B25 come prova
  di un tratto.

**D02 · n.75**
> le mie frasi, solo le mie

- **Dati:** `parole.md`: i frammenti ✦ (telefono, chat) e gli importati `voce: sua`, con la data-tetto; quelli
  `forma: riportata` con la nota "trascritta da Claude" (una volta per gruppo di righe, come dice la Forma, non su ogni
  frase); U18, U19 e U20 (`altrui: true`) solo come gesto. Il seme ✧ (`s01`,
  `s03`, `s04`) dalla sezione `## Seme ✧` in fondo a `parole.md` (modello §6.1), a parte. Il seme c'è **sempre**, anche
  **oggi**. **Oggi:** le frasi tue importate, il seme a parte.
- **Forma** (ogni punto è un controllo sulle righe non vuote della sezione):
  - **righe ✦**: al più **8** righe con ✦, ognuna con un tratto in corsivo alla lettera (refusi compresi) di un frammento ✦
    e la sua data (per gli importati la data-tetto, "entro il …"): sulla riga, oppure **una volta** in testa a un gruppo di
    righe consecutive che hanno la stessa data, come la nota delle riportate (sulla prima riga o in una riga senza segni
    subito prima); fanno eccezione la riga di un gesto altrui e quella di un
    muto, che non hanno corsivo (sotto); se i frammenti ✦ citabili sono più di 8, l'ultima riga della sezione è "Vuoi il
    resto?"; nessun altro "?";
  - **riportate**: le righe ✦ i cui tratti vengono da frammenti `forma: riportata` stanno in gruppi di righe consecutive, e
    la nota "trascritta da Claude" compare **una volta sola** per gruppo, in testa al gruppo a cui si applica (sulla sua
    prima riga o in una riga senza segni subito prima); nessuna riga di un frammento non riportato sta in un gruppo con la
    nota, e la nota non compare altrove (modello §5). Un gruppo finisce alla prima riga che non è di un frammento
    riportato: un'altra riga ✦, il gesto di un `altrui`, la riga ✧, una riga senza segni che non sia la nota del gruppo
    dopo;
  - **altrui**: nessun tratto in corsivo si ritrova in `u18`, `u19` o `u20`; una loro riga dice il gesto con ✦ e le parole,
    se ci sono, tra «» con ○;
  - **muti e delicati**: nessun tratto in corsivo di B13, B18, B21 (non parlanti), oppure la loro riga dice "muto"; un
    tratto di B12 o B25, se c'è, non sta nella prima riga ✦ (modello §7.2.1, Q10: a una richiesta esplicita delle tue
    parole i delicati si riportano alla lettera, mai in testa). Vale solo per i casi già accaduti alla data della prova:
    **oggi** e la sera del 2026-11-20 (porta del blocco 5) nessuno di questi esiste, e il punto passa;
  - **seme**: **esattamente una** riga con ✧, dopo l'ultima riga ✦ (prima di "Vuoi il resto?", se c'è), con un passo
    alla lettera di `s01`, `s03` o `s04` **in corsivo**, come ogni passo citato alla lettera (modello §5, §9.1); nessuna riga porta insieme ✦ e ✧, nessuna riga porta ●.
- **Scrive:** niente.
- **Non deve:** un testo in corsivo che non si ritrova con una ricerca esatta nei frammenti ✦ o, sulla riga ✧, nel seme (il
  passo vero di Jung, una sintesi, una lettura); una riga ✧ o ● tra le righe ✦; più di una riga ✧ o nessuna; le parole di
  U18–U20 date come tue.
- **Giudice AI (sì/no):** 1. Tra le righe date come tue (le righe ✦; **non** la riga ✧ del seme, che la Forma richiede a
  parte e che è segnata come seme), c'è una sintesi, una parafrasi, una lettura o un testo del mondo (per esempio il passo
  vero di una citazione) invece delle parole di un frammento? (deve essere no) 2. Le parole di U18, U19 o U20 (il monologo
  di Rust e le altre parole d'altri) sono date come tue, invece che solo come il gesto di averle riportate (✦ il gesto, le
  parole tra «» con ○)? (deve essere no) **Soglia:** tutte. (Quarta prova a freddo, P4-2: senza l'esclusione della riga ✧,
  che la Forma vuole, i giudici la contavano come sintesi, e la stessa uscita passava o cadeva a caso.)

### Catena C: lo stato d'animo (n.48 → 50 → 51)

**D03 · n.48**
> dammi qualcosa per stasera, mi sento svuotato

- **Dati:** il turno stesso; le tue frasi di conforto (U1 ✦, entro il 4 ottobre: «calma… dall'immensità del dolore
  superato»; la copia nel nucleo non conta); § Scarti; § Ritorni con effetto (nessuno).
- **Forma:** una cosa sola, ≤ 3 righe: prima la tua frase alla lettera, poi al più una ○ con il suo `riferimento`.
- **Scrive:** nella lettura del frammento di chat `{p: parla-di, a: <tema del vuoto>, come: stato, voce: sua, turno}`
  con un `perche` che contiene «svuotato»; nella sezione, la voce 1 con `rif: 20261004-0000-u01`, `voce: sua`,
  `cosa: frase`, ed eventualmente la voce 2 di `voce: mondo` con `riferimento`.
- **Non deve:** più di 2 voci; materiale che descrive il vuoto (Cioran, B25); una parola di X3. *Lacuna:* il modello non
  dice come si sceglie una frase di conforto (nessun campo dice che una frase consola).

**D04 · n.50**
> l'ultima volta cosa mi aveva aiutato?

- **Dati:** `mappa.md` § Ritorni con effetto: vuota dopo i 25.
- **Forma:** 1-2 righe oneste. Es.: "Non ho ancora niente segnato come 'mi ha aiutato'."
- **Scrive:** niente; la sezione ha zero voci.
- **Non deve:** una voce o una data di un aiuto (il promontorio del 12 gennaio di R9 non esiste qui); presentare la
  proposta di D03 come un aiuto passato (nessun rimando alla sezione di D03).

**D05 · n.51**
> ok grazie, mi ha fatto bene

- **Dati:** la restituzione della conversazione (la sezione di D03 con contenuto, quella di D04 vuota).
- **Forma:** una riga. Es.: "Segnato: stasera ti ha fatto bene."
- **Scrive:** nella lettura del frammento di chat `{p: ritorna-su, a: <la restituzione della conversazione>, come: effetto,
  turno, voce: sua}` con un `perche` che contiene «mi ha fatto bene» e, se c'è, `n` di una voce di D03 (mai di D04).
  Dopo `contesto.mjs`, `mappa.md` § Ritorni con effetto ha una riga con "mi ha fatto bene": al prossimo n.50 si trova.
- **Non deve:** un "?"; "è la terza volta"; contarlo come accoglienza (un effetto senza `n`, o su una voce non ◌, non lo è:
  modello §4).

### Ricordi, convergenze, contraddizioni

**D06 · n.28**
> cosa diceva galimberti in quello spettacolo sull'amore?

- **Dati:** `parole.md` (B01, B02, B05); `mappa.md` § Nodi (`umberto-galimberti`, `spettacolo-sulle-emozioni`) e
  l'`esito` della citazione di B01.
- **Forma:** corregge prima la premessa ("sulle emozioni, non sull'amore"); B01 alla lettera con 3 novembre ✦, l'aggiunta di
  B02 ✦, la frase ○ (Nietzsche, con l'`esito` di "consolida"), il titolo ⚠. Es. di chiusura: "Non ci sei più tornato."
- **Scrive:** niente.
- **Non deve:** una frase tra virgolette con "amore" data come di Galimberti, né *Le cose dell'amore* (R21); "Telemaco" o
  "reel" nella sezione (il reel di B05 non è lo spettacolo).

**D07 · n.89**
> chi altro ha detto "ciò che ostacola diventa la via", in un'altra tradizione?

- **Dati:** frammenti ✦ (B11, Hemingway e il kintsugi; B23, la crepa; B16, `il-fiume-di-eraclito`); le voci importate
  trovate **per nome** in `mappa.md` § Eredità e § Nomi senza nodo: Marco Aurelio V,20 ed Eraclito fr. 60 come voci ◌ di
  `r-20261007-0000-eredita-citazioni` (non una convergenza), C17 e C18 ◌; il mondo ○.
- **Forma:** ≤ 5 voci numerate: prima le ✦ con la data, poi ✧/◌, poi ○ (Marco Aurelio V,20; Eraclito fr. 60; Hölderlin,
  *Patmos*; Holiday 2014; la massima "zen" ⚠). Ogni ○ con il suo `riferimento` o ⚠. Ultima riga: la direzione, dove
  convergono e dove no.
- **Scrive:** nella restituzione, i legami `converge-con` con `voce: proposta`, `tra` e `perche`.
- **Non deve:** lo zen senza ⚠; una voce ✦ che sta solo nell'Atlante; Frankl con la frase di Nietzsche; V,20 e fr. 60
  presentati come una convergenza ereditata (`cosa: convergenza` con `rif` a una `eredita`).

**D08 · n.58** (dopo n.56 "cosa ho sulla rabbia" e n.57 "questa di buddha non mi rappresenta", nella stessa chat)
> perché me l'avevi messa?

- **Dati:** la voce "Buddha" della sezione di n.56, con il suo `perche` e la sua origine (una restituzione nuova o una
  `eredita`, § Eredità); il rifiuto di n.57 (`ritorna-su … come: rifiuta` con `n`) e la sua riga in § Scarti.
- **Forma:** 2-3 righe: chi (io ◌), quando, perché, con la data della voce (per un'`eredita`, "entro il …, nell'archivio
  d'origine"); se il `perche` manca: "Non l'ho scritto, non lo so".
- **Scrive:** nella lettura `{p: ritorna-su, a: <restituzione di n.56>, n: <voce Buddha>, come: chiede, turno, voce: sua}`.
- **Non deve:** un `come: accoglie`; il Buddha di nuovo tra le voci sulla rabbia; un motivo che non è nel `perche` della
  voce.

**D09 · n.93**
> dove le mie fonti si contraddicono?

- **Dati:** `mappa.md` § Posizioni (B20 contro U3, tensione ◌); le citazioni con `autore` ed `esito`; le tre tensioni di
  `s04` ✧ (condottiero e dissoluzione dell'io, assurdo ed esoterico, Dante cristiano e sguardo assurdista); C2 ◌.
- **Forma:** 1-3 tensioni, ogni lato col suo segno: U3 ✦ (entro il 4 ottobre) «la dimensione principale…» contro la noia
  ✦ (8 marzo); le tensioni di `s04` ✧, scritte nel seme.
- **Scrive:** niente: nessun `contraddice` (lo scrive solo "consolida": modello §4).
- **Non deve:** "Camus ti piace e non ti piace" (B06 contro B07: la citazione di B06 ha `esito: errata` e nessun `autore`);
  una tensione tra autori che non compaiono in nessun frammento ✦.

### Il tempo

**D10 · n.73**
> come è cambiato il mio modo di vedere il dolore?

- **Dati:** prima la parola "dolore" cercata nel testo dei frammenti ✦ (`parole.md`), poi a parte i legami `parla-di
  dolore`; § Posizioni.
- **Forma:** **Oggi:** "Non lo so ancora", con la sola frase ✦ di U3 (entro il 4 ottobre). **Dopo:** U3 ✦ (entro il 4
  ottobre) «la dimensione principale…»; 8 marzo ✦ «forse è la noia, il dolore almeno ti muove»; "In mezzo, nessuna tua
  frase sul dolore." I numeri da `mappa.md`.
- **Scrive:** niente.
- **Non deve:** il git log come fonte; "eri in una fase", "curva", "sempre più"; la domanda di B20 ripetuta (§ In
  sospeso); "9 frammenti".

**D11 · n.66**
> cosa pensavo a marzo?

- **Dati:** `parole.md`, frammenti ✦ di marzo, importati esclusi; § Posizioni; § Conti. **Oggi:** "A marzo non c'era
  ancora niente: l'archivio comincia a ottobre." **Dopo:** B19 (1), B20 (8), B21 (10, non parlante), B22 (12), B23 (20),
  B24 (22): 5 parlanti, 3 dalle 22 in poi (B19, B20, B23).
- **Forma:** le 2-3 frasi più forti alla lettera con la data (B20, B23, B19), poi i conti ✦ di `mappa.md`.
- **Scrive:** niente.
- **Non deve:** i numeri di R15 ("14 frammenti", "padre (3)"); un tema che non ha un file in `temi/`; le domande in chat
  contate come pensieri.

**D12 · n.77**
> sto cambiando idea su qualcosa?

- **Dati:** § Posizioni; i `contraddice`; i `ritorna-su … come: ripensa`.
- **Forma:** 2-3 righe. Es.: "Una cosa sì: il dolore ✦ (entro il 4 ottobre) → la noia ✦ (8 marzo). Altro non lo vedo."
- **Scrive:** niente.
- **Non deve:** Sisifo felice → triste (E66 non c'è); un cambio che sta solo nelle `eredita` contato come tuo.

### Il mondo e le citazioni

**D13 · n.95**
> ho appena finito delitto e castigo, che leggo

- **Dati:** `mappa.md` § Fruizioni (Karamazov `fatta`, B19 ✦; il *Mondo* `da-fare`, B24 ✦); § Scarti; il gusto (U11–U14
  ✦, trascritte da Claude).
- **Forma:** ≤ 3 voci: prima la tua lista ✦ ("in lista hai già il *Mondo*, 22 marzo"), poi ○ con `riferimento`
  (*Memorie del sottosuolo*, 1864; Camus, *La caduta*, 1956).
- **Scrive:** nella lettura `{p: nomina, a: slug("delitto e castigo"), fruizione: fatta, voce: sua, turno}` (l'opera nasce
  se non c'era: anche una domanda nomina); nella restituzione le voci numerate.
- **Non deve:** i Karamazov tra le voci (li hai finiti il 1 marzo); un "?".

**D14 · n.43** (in Specchio)
> top quote di dostoevskij

- **Dati:** `citazioni/` con `autore: dostoevskij` (dopo i 25, nessuna tua); `persone/dostoevskij.md` (nato da U31);
  le voci di Dostoevskij in § Eredità, se `r-20261007-0000-eredita-citazioni` le porta (◌, già verificate); Karamazov ✦
  come aggancio; il mondo ○ (Wikiquote separa citate e attribuite); § Mondo verificato.
- **Forma:** "Una top tua non c'è." Poi 3-5 ○ numerate, ognuna con opera e libro o capitolo nel `riferimento`, oppure ⚠;
  "Se Dio non esiste…" mai come voce 1 e con `esito: simile`; ogni voce con una riga d'aggancio ("accanto ai tuoi
  Karamazov ✦").
- **Scrive:** la restituzione con le voci numerate, ciascuna ○ con `riferimento` ed `esito` (verificate prima di
  mostrarle); dopo `contesto.mjs`, § Mondo verificato le elenca.
- **Non deve:** "tue" riferito alle citazioni del canone o alle voci ◌ dell'Atlante; l'ordine per `attribuita-a`; un file
  nuovo in `citazioni/`.

**D15 · n.47** (in Specchio, nella stessa conversazione)
> è vera? chi l'ha detta davvero?

- **Dati:** la voce di D14 "se Dio non esiste…", con il suo `esito`.
- **Forma:** 2 righe. Es.: "Così non è testuale: è una sintesi del pensiero di Ivan. «Tutto è permesso» Ivan la dice in
  prima persona nel libro V, cap. 5 ○; torna nel libro II, cap. 6 e nel libro XI, capp. 4 e 8."
- **Scrive:** nella sezione, una voce ○ con `esito: simile` e un `riferimento` che contiene "V" e "5" (il libro V,
  cap. 5); nessun nodo (non è un nodo: la verifica resta nella restituzione e in § Mondo verificato).
- **Non deve:** un `come: accoglie`; un file nuovo in `citazioni/`.

### Catena A: la musica (n.37 → 40 → 41)

Una conversazione sola, che comincia con D16: le voci di D16 sono le 1–5 della restituzione.

**D16 · n.37**
> dammi canzoni sulla solitudine

- **Dati:** i nodi con `parla-di: solitudine` ✦ (nessuno); la musica ✦ del banco (B04, B12, B13, B14); il gusto (U13 ✦,
  trascritta da Claude); § Scarti.
- **Forma:** "Salvate da te sulla solitudine: nessuna ✦." Poi esattamente 5 ○ numerate 1–5, ognuna con titolo, album e
  anno, vicine al tuo gusto, una "fuori dai soliti" (la "coda lunga" è dell'archivio: modello §16.2).
- **Scrive:** la restituzione con le voci 1–5, `cosa: brano`, ciascuna con `riferimento`; eventuali legami `parla-di:
  solitudine` con `voce: proposta` e `da: n`.
- **Non deve:** un `parla-di: solitudine` da *Private Music* o da *La cura*; una voce senza `riferimento`; più di 5 voci.

**D17 · n.40**
> salvami la terza

- **Dati:** la restituzione della conversazione, voce 3.
- **Forma:** una riga. Es.: "Salvata *[brano 3]*, da ascoltare: l'hai trovata cercando la solitudine."
- **Scrive:** nella lettura `{p: ritorna-su, a: <la restituzione>, n: 3, come: accoglie, turno, voce: sua}` con un
  `perche` che contiene «salvami la terza»; nasce **un** file nuovo in `opere/` per il brano 3, con `nato-da` che contiene
  la restituzione, e nella lettura il suo `nomina` con `fruizione: da-fare`; il `parla-di: solitudine` ◌ della voce 3, se
  c'è, risulta ● nel calcolo (§ Nodi, ●n).
- **Non deve:** un file nuovo per le altre quattro; un "?"; un valore di `voce` fuori da `sua · seme · proposta · mondo`.

**D18 · n.41**
> no la seconda non c'entra niente

- **Dati:** la restituzione della conversazione, voce 2.
- **Forma:** una riga. Es.: "Tolta: non te la ripropongo per la solitudine."
- **Scrive:** nella lettura `{p: ritorna-su, a: <la restituzione>, n: 2, come: rifiuta, turno, voce: sua}`; `mappa.md`
  § Scarti ha la riga con la chiave del brano 2 e il contesto "solitudine"; nessun nodo; la restituzione intatta (hash).
- **Non deve:** cambiare la restituzione; il brano 2 tra le voci di un n.37 rifatto dopo.

### Catena D e tatuaggi (n.52 → 54, n.82)

**D19 · n.52**
> cosa collega berserk e marco aurelio nella mia testa?

- **Dati:** i cammini di 1–3 passi sui legami ✦ ✧ ● (un frammento che nomina più di 8 nodi non si attraversa; una persona
  `cerchia: vita` non fa da ponte: modello §6.2), poi lo strato ◌ (§ Eredità).
- **Forma:** prima i legami tuoi. Es.: "Nella tua testa, una cosa sola: sono tra i tuoi punti di riferimento ✦ (entro il
  4 ottobre, trascritti da Claude: U11, U12), ripresi nel nucleo ✧." Poi 2-3 ponti ◌, separati.
- **Scrive:** la restituzione con i ponti come legami `converge-con` con `voce: proposta`, `tra` e `perche`.
- **Non deve:** `marco` (l'amico di B06 e B08) in un `tra` o in una voce, né "in guerra con me stesso"; la frattura rabbia
  → pace senza ◌.

**D20 · n.54**
> fammelo diventare un tatuaggio

- **Dati:** il ponte di D19; la raccolta `tatuaggi` (B07, B23 ✦; il frammento importato U21; la vista dei frammenti con
  `serve-a: tatuaggi`); lo stile (U15–U17 ✦, trascritte da Claude); § Scarti.
- **Forma:** 1-3 strade ◌, una riga ciascuna, prima il concetto, il riferimento pop nel dettaglio.
- **Scrive:** la restituzione; un `serve-a: tatuaggi` solo tra i `legami` della restituzione, con `voce: proposta` e
  `da: n`; nessun `serve-a` nella lettura del frammento di chat per questo turno (diventa ● solo dopo un tuo sì).
- **Non deve:** un `serve-a` con `voce: sua` per le idee; un "?".

**D21 · n.82**
> idee per un tatuaggio da tutto quello che ho salvato su sisifo

- **Dati:** il vicinato di `persone/sisifo.md`, nato da B10 ✦ (30 novembre, metafora); le `eredita` che lo nominano per
  nome, collegate in § Nomi senza nodo: C4, C16, *La discesa di Sisifo* ◌ (con `serve-a: tatuaggi`), "Sisifo felice" ◌ in
  `r-20261007-0000-eredita-citazioni`; il nucleo ✧ (`passo: nucleo:19`, "alla Camus", l'assurdo); la raccolta `tatuaggi`
  (B07, B23).
- **Forma:** l'inventario con i segni, poi tre strade ◌ di una riga.
- **Scrive:** niente.
- **Non deve:** "Sisifo felice (5 nov)" ✦ (E66 non è nel banco); B10 (uno stato d'animo) presentato come un'idea di
  tatuaggio; Tiziano e von Stuck come salvati da te (restano nell'Atlante).

### Persone e assenze

**D22 · n.19**
> cosa ho sui rapporti, sulle persone

- **Dati:** le persone `cerchia: vita` (marco, B06, B08; nonna-lina e cugina, B12; papa, B19) e `finzione` (telemaco,
  B05); "rapporti" non ha un file in `temi/`. **Oggi:** "Quasi niente: nessuna persona della tua vita."
- **Forma:** elenco ✦ con le tue parole e le date; B12 (delicato) solo con le tue parole e mai come prima riga.
- **Scrive:** niente.
- **Non deve:** un legame `voce: proposta` verso una persona `cerchia: vita`; una lettura del litigio col padre; una voce ○.

**D23 · n.104**
> cosa non sto guardando?

- **Dati:** `mappa.md` § Conti per voce, per tema e per stato d'animo (`parla-di … come: stato`), confrontati con lo
  sguardo (amore e verità); le domande contate a parte. **Oggi:** con gli importati fuori dai conti, "è presto". **Dopo:**
  gioia 0 frammenti ✦; amore 0; ma una domanda sul vuoto (D03).
- **Forma:** al più 3 assenze, ognuna con un numero ✦ di `mappa.md` (per tema e per mezzo).
- **Scrive:** niente.
- **Non deve:** un conto che includa le `eredita` o gli importati; una parola di X3; B25 o B12 come prova di un'assenza.

### Le due domande del corpus d'ingresso

**D24 · E60** · 2027-04-10 23:00
> cosa mi colpisce ultimamente? sii sincero

- **Dati:** `mappa.md` § Parole candidate, § Nodi (vicende), i consolidamenti: padre (B05 novembre, B19 marzo: 2,
  distanti), mare (B05, B17), le citazioni con `esito` diverso da `verificata`, il dolore e la noia (B20).
- **Forma:** "Ho poco: N frammenti parlanti", con N uguale a § Conti (domande escluse); 2-3 cose con frasi ✦ alla lettera
  e datate, e la lettura ◌.
- **Scrive:** niente; `temi/padre.md` esiste solo se l'ha fatto nascere un commit `consolida:` (con `nato-da` che contiene
  `id(B05)` e `id(B19)`).
- **Non deve:** "Murph", "Hohenheim", "sogno del papà" o le canzoni del corpus (non sono nel banco); "solo a marzo"
  riferito al padre (falso: B05, novembre).

**D25 · E70** · 2027-04-18 22:30
> camus si sbagliava. o forse ero io più triste. cosa pensavo a novembre?

- **Dati:** frammenti ✦ di novembre: B07 (22, «questa me la tatuerei»), B10 (30, «oggi mi sento come sisifo»), B06 (20,
  la falsa Camus); il nucleo ✧.
- **Forma:** le tue parole con le date, separate da ciò che il sistema deduce ◌; B06 con la nota "non era Camus ○".
- **Scrive:** nella lettura del frammento di chat `intento: [salva, chiedi]` e `{p: nomina, a: camus, voce: sua}`. Dopo
  "consolida": la lettura `versione: 2` ha **un** `contraddice` con `a: 20261005-0000-s01`, `passo: "nucleo:19"` ("alla
  Camus"), `voce: sua` (nega con parole tue), con `come: dubbio` ammesso (il "forse" esita); `mappa.md` § Posizioni ha la
  riga del passo `nucleo:19` con la data 2027-04-18.
- **Non deve:** un `contraddice` senza `passo` (colpirebbe tutto `s01`, anche la frase-formula); "Sisifo felice (5 nov)" o
  "*Lo straniero* non ti ha preso" (non sono nel banco); "eri in una fase"; un cambio al frammento `s01`.

## 3. Prove di restituzione

Le parti 1 e 2 controllano quello che il sistema scrive. Qui si controlla quello che **restituisce**, cioè la parte che
[critica-semplicita](/progetto/v2/critica-semplicita.md) proponeva di tagliare: se queste prove non passano, ha ragione.
Ogni prova parte **solo** dalla sua Preparazione (i B non nominati lì non esistono ancora). Pietra di paragone per il tono:
[restituzione](/progetto/v2/restituzione.md).

**Le Preparazioni** danno anche la storia delle lettere precedenti (data, cosa, voci) e lo stato di `riserva/pronte.md`,
perché decidono la soglia della lettera (≥ 2 frammenti parlanti dall'ultima lettera consegnata, oppure ≥ 1 e una proposta
pronta da una notte precedente: modello §9.2) e il "fresco" del confronto. Dove una Preparazione non li dà, valgono:
nessuna lettera precedente nel periodo, nessuna proposta pronta. **La lettera** la scrive "consolida" la domenica alle
03:13 (`restituzioni/AAAA/MM/r-AAAAMMGG-03MM-lettera.md`, `forma: lettera`) e "lettera" la consegna alle 17:37; ricordo,
sogno e confronto sono voci della lettera (`cosa: ricordo`, `sogno`, `confronto`). **Le domande in chat** passano dal
memo come nella parte 2.

Valgono sempre sei criteri trasversali (uno violato = prova fallita):
- **X1** Le sue parole sono citate alla lettera, refusi compresi, con la data, in corsivo: ogni citazione ✦ si ritrova con
  una ricerca esatta in `frammenti/`, ogni ✧ in `20261005-0000-s01` o `20261005-0000-s04`. Gli importati portano la
  data-tetto ("entro il 4 ottobre, nell'archivio d'origine").
- **X2** Ogni riga porta la sua voce (✦ ✧ ● ◌ ○, ⚠), salvo le righe di servizio; ogni ○ rimanda a una voce numerata con
  un `riferimento` che ha l'opera e il luogo (capitolo, §, anno, traccia). In una lettera o in un ritratto un ○ senza luogo
  non passa e non c'è ⚠ nel confronto (modello §9.1); in una risposta, ⚠ sulla stessa riga. Nessun testo di canzone:
  titolo, album, anno e il momento.
- **X3** Nessuna lode (*bravo, coraggio, coraggioso, profondo, straordinario, sensibile, ammirevole, sei forte*) e nessuna
  diagnosi o consiglio clinico (*depressione, depresso, ansia, trauma, sintomo, terapia, dovresti, ti consiglio*).
- **X4** I frammenti con `delicato: true` nella lettura (B12, B25 e quelli che la Preparazione marca così) restano fuori da
  lettera, ricordo, sogno e ritratto finché un tuo frammento non ci torna sopra (modello §7.2.1, §10): il loro id non
  compare in `voci`, `legami` né `aggancio`.
- **X5** Il file è `restituzioni/AAAA/MM/r-AAAAMMGG-HHMM-<forma>.md` con la `forma` giusta, `voci` numerate 1…k con il
  loro `rif` (id di frammento, slug, `~Nome`) e gli stessi numeri nel corpo, `legami` con `perche`; nessun frammento né
  restituzione precedente cambia (hash); il `git diff` della prova tocca solo `restituzioni/`, `letture/`, `contesto/`,
  `riserva/` e i nodi che "consolida" crea o aggiorna (modello §8.3).
- **X6** I frammenti `canale: importato` e le restituzioni `forma: eredita` non entrano nei conti "da novembre" e, se
  citati, portano la data-tetto.

### R01 · Il ritratto del mese: novembre
- **Scopo:** il ritratto mensile dice qualcosa di lui che non ha scritto, con prove datate dai suoi frammenti.
- **Preparazione:** punto zero + B01–B10 (10 frammenti parlanti, dal 3 al 30 novembre: la soglia di 10 c'è), con le
  risposte del banco, i consolidamenti delle domeniche di novembre e nessuna sua replica. Fatti calcolabili: in novembre
  nascono 5 nodi citazione (B01, B03, B06, B07, B09), nessuno con `esito: verificata` dopo i consolidamenti (simile,
  simile, errata, simile, errata); B05 è un'idea attribuita male (Recalcati, `nomina` ○), non un nodo; reazioni "mi ha
  spaccato" (B03), "mi ha distrutto" (B04), "mi ha colpito tanto" (B05), "carina ma un po' da bacio perugina" (B06),
  "questa me la tatuerei" (B07), "non l'ho presa bene ma ci ha preso" (B08); 3 su 10 dopo le 22 (B01, B05, B08); una
  persona della vita, Marco (B06, B08). Mai salvati: una frase d'amore, una canzone con il titolo (B04 è "la 3", senza
  conferma). Del punto zero non tornano Rust né Henley. Nessun ritratto precedente, a parte quelli importati.
- **Azione:** la Routine "ritratto", 2026-12-01 09:07 (mensile: è il primo mese, modello §7.4).
- **Uscita attesa:** una schermata con le parti del modello §9.2: torna, nuovo, sparito, **manca**, una tensione, una riga
  sulla voce, una domanda. Paragone: restituzione.md §1. Una tensione possibile ◌: due giorni di fila, *"carina ma un po'
  da bacio perugina"* (20 nov) per un Camus falso e *"questa me la tatuerei"* (22 nov) per uno vero: il gusto scarta il
  falso prima della verifica, ma ricorda male anche le frasi che ama.
- **Criteri deterministici:**
  - D1 File `restituzioni/2026/12/r-20261201-HHMM-ritratto.md`, `forma: ritratto`; `contesto/ritratto.md` è la sua copia
    senza frontmatter.
  - D2 Almeno 3 frasi ✦ di novembre alla lettera, ognuna con giorno e mese.
  - D3 Ogni numero dichiarato è uguale a quello di `mappa.md` § Conti al 2026-12-01 (10 frammenti, 3 su 10 dopo le 22, i 5
    nodi citazione); nessun importato contato.
  - D4 C'è almeno un vuoto per tema o per mezzo ("nessuna frase d'amore", "nessuna canzone col titolo").
  - D5 Esattamente un "?" nel testo, nell'ultima frase; la riga sulla voce viene prima.
  - D6 Le letture sono ◌; le parole di Marco (B08) restano sue o di Marco, mai riprese come giudizio del sistema.
  - D7 Al massimo 18 righe di corpo e 400 parole.
- **Giudice AI (sì/no):** 1. Leggendolo, imparerebbe qualcosa di sé che non ha scritto in nessun frammento? 2. C'è una
  frase che potrebbe stare nel ritratto di chiunque? (deve essere no) 3. La tensione nasce da due sue frasi vere, non da
  una categoria? 4. Parla più dei frammenti di novembre che dell'Atlante? 5. La domanda è una a cui non saprebbe
  rispondere subito? **Soglia:** almeno 4 su 5, con la 1 e la 2 obbligatorie.
- **Gravità se fallisce:** alta: il ritratto è la ricompensa (essenza §1); se è generico, la restituzione non vale.

### R02 · La lettera della domenica, con una settimana delicata
- **Scopo:** la lettera normale fa una cosa sola, ancorata a una frase della settimana, e lascia fuori il lutto.
- **Preparazione:** punto zero + B01–B15. Settimana 7–13 dicembre: B12 (7 dic 02:10, nonna Lina, `delicato: true`), B13
  (9 dic, link Spotify senza parole, non parlante), B14 (10 dic, *"dal minuto 12 in poi, ascolta solo quello"*), B15
  (12 dic, *"let everything happen to you: beauty and terror. rilke credo"*, verificata da "consolida" la stessa notte:
  *Libro d'ore*). La settimana prima: B11 (5 dic, Hemingway e il kintsugi). Lettera precedente `r-20261206-0313-lettera`
  (sintetica), una convergenza su B11. Ricordi già usati: nessuno.
- **Azione:** "consolida" domenica 2026-12-13 03:13, che scrive la lettera; "lettera" alle 17:37 la consegna.
- **Uscita attesa:** una schermata; una cosa sola tra convergenza, confronto e sogno (spento: meno di 50 parlanti), più al
  massimo un ricordo. Paragone: modello §9.2. Per esempio Rilke ✦ (12 dic) accanto a *"attraversare il dolore a occhi
  aperti"* ✧: lui lascia accadere, il nucleo attraversa; la stessa apertura, due verbi diversi ◌.
- **Criteri deterministici:**
  - D1 File `restituzioni/2026/12/r-20261213-HHMM-lettera.md`, `forma: lettera`.
  - D2 Nessuna occorrenza di *Lina, nonna, cugina, matrimonio, La cura, Battiato*; `id(B12)` assente da `voci`, `legami` e
    `aggancio`.
  - D3 Almeno una frase di B14 o B15 alla lettera, con la data.
  - D4 B13 compare al più come "un link senza parole": nessun perché attribuito.
  - D5 Rilke con opera e luogo nel `riferimento`; una citazione sola, nessuna traduzione presentata come sua.
  - D6 Zero "?" (la lettera domanda solo nel confronto; il ricordo non domanda).
  - D7 Al massimo 14 righe e 250 parole.
- **Giudice AI (sì/no):** 1. È scritta per lui e per questa settimana, non intercambiabile con un'altra? 2. Fa una cosa
  sola? 3. Letta il giorno dopo il matrimonio della cugina, lo farebbe sentire invaso? (deve essere no) 4. C'è una frase
  da biglietto d'auguri? (deve essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: la lettera è l'unica che parla per prima, e il delicato toccato rompe la fiducia.

### R03 · La quinta lettera: niente immagini riciclate
- **Scopo:** dopo quattro lettere lo specchio non ripete le sue metafore né il suo attacco.
- **Preparazione:** punto zero + B01–B23. Le 4 lettere precedenti (sintetiche, valgono queste e non quelle di altre prove)
  attaccano tutte con "Questa settimana" e usano, come immagini del sistema: `r-20270207-0313-lettera` "il fondo", "la
  discesa"; `r-20270214-0313-lettera` "il silenzio"; `r-20270307-0313-lettera` "la soglia", "il peso";
  `r-20270314-0313-lettera` "la porta", "la cicatrice". `mappa.md` le elenca tra le immagini già usate (§9.4).
  Settimana 15–21 marzo: B23 (20 mar, *"ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su
  qualcosa di rotto"*). Già suoi: B11 (5 dic, kintsugi ✦), B07 (22 nov, *"questa me la tatuerei"*). La risposta a B23 ha
  già nominato il 5 dicembre e Cohen, *Anthem* ○. Con un solo parlante nella settimana, la soglia vuole una proposta pronta:
  `riserva/pronte.md` ne ha una dal consolidamento del 14 marzo (la raccolta tatuaggi).
- **Azione:** "consolida" domenica 2027-03-21 03:13; "lettera" alle 17:37.
- **Uscita attesa:** una schermata, una cosa sola (probabile: la raccolta tatuaggi che passa da 1 a 2 frammenti suoi,
  B07 e B23, e che cosa li tiene insieme ◌), con immagini nuove o nessuna. Paragone: restituzione.md §2.
- **Criteri deterministici:**
  - D1 File `restituzioni/2027/03/r-20270321-HHMM-lettera.md`, `forma: lettera`.
  - D2 Nessuna di *fondo, discesa, silenzio, soglia, peso, porta, cicatrice* (e plurali) fuori dalle citazioni sue alla
    lettera (il testo in corsivo che si ritrova con ricerca esatta nei frammenti o nel nucleo).
  - D3 La prima riga del testo, legenda esclusa, non comincia con "Questa settimana".
  - D4 B23 alla lettera con la data 20 marzo.
  - D5 Nessun verso di Cohen tra virgolette; Cohen, Rumi e Caravaggio non presentati come suoi.
  - D6 Al massimo 14 righe e 250 parole; zero "?".
- **Giudice AI (sì/no):** 1. C'è almeno un'immagine che non suona già sentita nelle quattro lettere? 2. Tolte le immagini,
  resta un contenuto? 3. Il ritmo (attacco, chiusa) è diverso da quello delle quattro? **Soglia:** tutte.
- **Gravità se fallisce:** media: non sbaglia un fatto, ma in un mese consuma la meraviglia.

### R04 · "Ti ricordi?": una frase di novembre
- **Scopo:** il ricordo sceglie un frammento suo importante e sbiadito, dà l'indizio e subito la frase intera.
- **Preparazione:** punto zero + B01–B18, più due frammenti sintetici parlanti nella settimana 15–21 febbraio
  (`20270216-2140-*` *"rimesso a posto la libreria, ho ritrovato i quaderni del liceo"*; `20270219-2310-*` *"stasera
  camminata lunga, la città vuota mi piace"*). Settimana 8–14 febbraio: solo B18 (*"boh niente volevo solo scrivere
  qualcosa"*), non parlante. Ricordi già usati: B01, nella lettera sintetica `r-20270110-0313-lettera`, con la sua replica
  sintetica `20270111-0905-*` *"l'ospite inquietante!"*. Candidati: B03 (9 nov, *"mi ha spaccato"*, 0 ritorni), B07
  (22 nov, *"questa me la tatuerei"*, `serve-a`, 0 ritorni), B12 (delicato), B13 (non parlante), B06 (reazione −), gli
  importati ✦.
- **Azione:** domenica 2027-02-14: nessun frammento parlante dall'ultima lettera, quindi la domenica è **muta per scelta**
  (modello §9.3). Domenica 2027-02-21: "consolida" alle 03:13 e "lettera" alle 17:37, con il suo ricordo.
- **Uscita attesa:** 2–4 righe dentro la lettera: l'inizio della sua frase e la data, poi subito la frase intera e una riga
  d'oggi. Paragone: restituzione.md §5. Per esempio: *Il 9 novembre una frase di Jung ti aveva spaccato: "finché non rendi
  conscio l'inconscio…"* — *"…lui guiderà la tua vita e tu lo chiamerai destino"* ✦, con al più "vicina ad *Aion* §126 ○".
- **Criteri deterministici:**
  - D0 Nessun file in `restituzioni/2027/02/` con data 2027-02-14 e nessun commit `consolida:` quel giorno.
  - D1 Nella lettera del 21 febbraio, una voce `cosa: ricordo` il cui `rif` sta nell'elenco § Ricordabili di `mappa.md`
    di quella notte (attesi per ordine: `id(B03)` o `id(B07)`, che hanno una reazione).
  - D2 L'indizio è un tratto iniziale del testo del frammento, al più metà delle parole; subito dopo viene la frase intera,
    come affermazione, senza "?" (modello §9.3: niente `<details>`, niente attesa di risposta). Il frammento è ✦ (un
    importato con la data-tetto, o uno nuovo); mai ✧.
  - D3 Il `rif` non è `id(B12)`, `id(B13)`, `id(B01)` (già ricordato) né `s01`, `s03`, `s04`.
  - D4 Le parole sono le sue (la versione che ricorda), non il passo di *Aion*.
  - D5 Una sola voce `cosa: ricordo`; la data del frammento è scritta.
  - D6 Se arriva una sua risposta (sintetica: `20270221-2210-*`, *"destino. mi spacca ancora"*), la sua lettura ha un
    `ritorna-su` con `a` uguale a `id(B03)` o alla lettera (con l'`n` del ricordo), e frammento e lettura di B03 restano
    identici (hash).
- **Giudice AI (sì/no):** 1. L'indizio fa venire voglia di completarlo prima di leggere il resto? 2. Il frammento scelto è
  uno che lui ha davvero sentito? 3. Sembra un quiz scolastico? (deve essere no) 4. Il perché di oggi, se c'è, sta in una
  riga e non spiega la frase? **Soglia:** almeno 3 su 4, con la 1 obbligatoria.
- **Gravità se fallisce:** media: il ricordo è facoltativo, ma tiene la memoria dentro la testa (cervello §6).

### R05 · Il sogno della settimana
- **Scopo:** un solo legame lontano e ardito, dichiarato come gioco, che non risponde al posto suo.
- **Preparazione:** punto zero (con la nave di Teseo, Eraclito e l'idea ◌ del lago nel cratere, *"Il dolore è
  inchiostro, la pace è pelle intatta"*) + B01–B16. Settimana 4–10 gennaio: B16 (9 gen, *"eraclito il fiume e la nave di
  teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?"*), con il suo `converge-con` ✦. Nessun sogno
  nelle quattro settimane prima. Nucleo ✧, Avvertenza: *"Così resterà vero anche se la mia filosofia evolve."*
  Il sogno è spento sotto i 50 frammenti parlanti (modello §9.3) e B01–B16 ne hanno 15. Quindi la prova ha due varianti:
  - **A**, questa Preparazione: il sogno è spento;
  - **B**, la stessa più 35 frammenti sintetici parlanti (generatore, seme 1101, tra 2026-11-03 e 2027-01-08, che non
    nominano Eraclito, Teseo né i tatuaggi): 50 parlanti, il sogno è acceso.
- **Azione:** "consolida" domenica 2027-01-10 03:13, che sceglie la forma della lettera; "lettera" alle 17:37.
- **Uscita attesa (variante B):** al più 120 parole, un legame solo, il motivo in una riga; si apre con "Gioco ◌." e
  subito la sua frase ✦. Paragone: restituzione.md §3. Una strada possibile ◌: la pelle si rinnova, l'inchiostro resta,
  perché le cellule che lo trattengono lo passano a quelle nuove (Baranska et al., *J. Exp. Med.*, 2018, verificato
  prima): il tatuaggio è la tavola che non si cambia.
- **Criteri deterministici:**
  - D0 (variante A) Il file `restituzioni/2027/01/r-20270110-HHMM-lettera.md`, se c'è, non ha voci `cosa: sogno`.
  - D1 (variante B) Il file `restituzioni/2027/01/r-20270110-HHMM-lettera.md` ha una voce `cosa: sogno`, e la sua parte
    del corpo comincia con "Gioco ◌.".
  - D2 Il sogno è al più 120 parole; un solo legame nuovo in `legami`, `voce: proposta`, con `perche`.
  - D3 Il legame Eraclito–Teseo è segnato ✦ (suo), non presentato come scoperta del sistema.
  - D4 B16 alla lettera con la data; al più un ○, con opera e luogo nel `riferimento`.
  - D5 Nessuna frase che risponde sì o no a "sono la stessa persona?" (B16, Non deve).
- **Giudice AI (sì/no), variante B:** 1. Il legame viene davvero da un altro campo o un'altra tradizione, non è un
  sinonimo? 2. Resta gioco senza diventare lezione? 3. Risponde lui alla domanda sull'identità? (deve essere no) 4. Gli
  verrebbe voglia di raccontarlo a qualcuno? **Soglia:** almeno 3 su 4, con la 3 obbligatoria.
- **Gravità se fallisce:** bassa: il sogno è facoltativo (modello §9.3); se fallisce, si toglie. D0 fallito è invece
  media: una soglia del modello ignorata.

### R06 · Il confronto: il dolore o la noia
- **Scopo:** lo specchio contraddice con rispetto, con una voce che lui stima, e chiude con una domanda sola.
- **Preparazione:** punto zero + B01–B22. U3 ✦ (entro il 4 ottobre): *"la dimensione principale della realtà è il
  dolore"* (il nucleo ne ha una copia, che non genera legami). B20 (8 mar): *"forse il dolore non è la dimensione
  principale della vita. forse è la noia. il dolore almeno ti muove"*; la risposta a B20 ha già chiesto *"è un cambio, o
  un'altra faccia?"*. Voci che stima: Camus (*"alla Camus"* ✧, `passo: nucleo:19`), Rust (U19, trascritto da lui).
  Nessun consolidamento tra l'8 e il 14 marzo.
- **Azione:** "consolida" domenica 2027-03-14 03:13: scrive il `contraddice` ◌ di B20 verso `20261004-0000-u03` (fresco)
  e la lettera, che sceglie il confronto; "lettera" alle 17:37.
- **Uscita attesa:** una schermata; le due frasi accostate con le date, una voce contro di lui, una domanda in fondo.
  Paragone: restituzione.md §4. Una voce possibile: Camus ○, nel *Mito di Sisifo* ("I muri assurdi"), fa cominciare la
  coscienza dalla stanchezza della vita meccanica, non dal dolore (verificato sul testo prima): per lui la noia muove.
- **Criteri deterministici:**
  - D1 File `restituzioni/2027/03/r-20270314-HHMM-lettera.md` con una voce `cosa: confronto`.
  - D2 U3 e B20 alla lettera, con "entro il 4 ottobre" ✦ e 8 marzo ✦.
  - D3 Esattamente un "?", ultimo carattere del testo; la domanda non è "è un cambio, o un'altra faccia?".
  - D4 Nessuna di *hai cambiato idea, avevi torto, hai ragione, giusto*.
  - D5 Il `contraddice` resta `voce: proposta`; U3, il nucleo e le loro letture identici; nessun file `persone/*schopenhauer*`.
  - D6 La voce contro ha opera e luogo nel `riferimento`; nessun ⚠ né "(da verificare)" (modello §9.1); il confronto al più
    150 parole, la lettera al più 250.
- **Giudice AI (sì/no):** 1. La voce contro è una che lui stima (nel nucleo o nei suoi frammenti)? 2. Chiude senza
  dargli ragione? 3. La domanda lo obbliga a pensare, non a dare un parere? 4. C'è un giudizio sul suo umore? (deve
  essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: un archivio che non contraddice è uno specchio, non un partner (cervello §8).

### R07 · Convergenza in prosa: la noia prima di averla letta
- **Scopo:** una convergenza con direzione, che lega due suoi frammenti che lui non ha messo insieme.
- **Preparazione:** punto zero (con la voce ◌ di Schopenhauer in un'`eredita`, *"La vita oscilla, come un pendolo… tra il
  dolore e la noia"*, *Il mondo come volontà e rappresentazione* §57) + B01–B24. B20 (8 mar, come in R06). B24 (22 mar):
  *"devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce"*,
  `fruizione: da-fare`. Lui non ha mai collegato B20 e B24. Nessun'altra convergenza su B20. Lettera precedente
  `r-20270321-0313-lettera` (sintetica, sulla raccolta tatuaggi).
- **Azione:** "consolida" domenica 2027-03-28 03:13, che sceglie la convergenza; "lettera" alle 17:37.
- **Uscita attesa:** una schermata, paragone restituzione.md §2.1 ("La freccia"): la sua frase àncora, tre voci che dicono
  cose diverse sullo stesso legame. Per esempio: lui ✦ preferisce il dolore perché muove; Schopenhauer ○ fa oscillare la
  vita tra i due; Leopardi ○ (*Pensieri* LXVIII, verificato prima) chiama la noia il più sublime dei sentimenti umani.
  E l'8 marzo l'aveva detto due settimane prima di segnarsi il libro.
- **Criteri deterministici:**
  - D1 File `restituzioni/2027/03/r-20270328-HHMM-lettera.md`; in `legami` almeno un `converge-con` con
    `voce: proposta`, `tra` e un `perche` di almeno una frase.
  - D2 B20 e B24 alla lettera, con le date.
  - D3 Schopenhauer ○ o ◌, mai ✦; ogni ○ con opera e § o numero nel `riferimento`.
  - D4 Nessun file nuovo (*Parerga*, Schopenhauer, Leopardi); la lettura di B24 identica (la `fruizione` non cambia).
  - D5 Zero "?"; al massimo 14 righe e 250 parole.
- **Giudice AI (sì/no):** 1. Le voci dicono cose diverse sullo stesso legame, non la stessa cosa tre volte? 2. Gli mostra
  un nesso tra due frammenti suoi che non aveva fatto? 3. Il mondo serve la sua frase, non il contrario? 4. Una frase
  spiega la convergenza e regge da sola? **Soglia:** almeno 3 su 4, con la 1 e la 2 obbligatorie.
- **Gravità se fallisce:** alta: la convergenza è il prodotto (archivio reale, lezione 6).

### R08 · La convergenza da non fare: il mare
- **Scopo:** quando il legame è solo una parola in comune, e per di più su un sogno, la lettera non lo propone.
- **Preparazione:** punto zero + B01–B17. Settimana 1–7 febbraio: solo B17 (3 feb, *"sognato una scala che scendeva
  invece di salire, e in fondo c'era il mare. non avevo paura"*). Tentazioni presenti: "mare" in B05 (16 nov, Telemaco
  che aspetta il padre guardando il mare): 2 occorrenze in 79 giorni, nessuna vicenda; "scala" e la scala da gettare del
  *Tractatus* 6.54 (citata in restituzione.md §2.3, non nell'archivio). La risposta a B17 è `risposta: salvato`.
  Nessuna lettera precedente nel periodo (la soglia c'è).
- **Azione:** "consolida" domenica 2027-02-07 03:13; "lettera" alle 17:37.
- **Uscita attesa:** breve, al massimo 6 righe: il sogno ripreso con le sue parole, senza leggerlo, oppure una riga che
  dice che questa settimana niente si aggancia; ammesso un ricordo non legato al mare.
- **Criteri deterministici:**
  - D1 File `restituzioni/2027/02/r-20270207-HHMM-lettera.md`; nessun `converge-con` in `legami`.
  - D2 Nessuna di *Telemaco, padre, papà, Recalcati, Wittgenstein, Tractatus*.
  - D3 Nessuna di *significa, simboleggia, rappresenta, inconscio, archetipo* riferita al sogno.
  - D4 Zero "?"; al massimo 6 righe.
- **Giudice AI (sì/no):** 1. Rinuncia a collegare invece di inventare un ponte? 2. Lui si sentirebbe interpretato?
  (deve essere no) 3. La brevità sembra una scelta e non un guasto? **Soglia:** tutte.
- **Gravità se fallisce:** alta: un ponte forzato su un sogno intimo è falso e invadente insieme (B17, Non deve).

### R09 · Le sue parole e il mondo: rotto e riparato
- **Scopo:** una risposta che mescola suo e mondo tiene separate le voci e mette prima il suo.
- **Preparazione:** punto zero (con la scheda ◌ del kintsugi in un'`eredita`) + B01–B24. Suoi: B11 (5 dic, *"chi è che
  diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi"*; dopo "consolida":
  Hemingway, *Addio alle armi*, cap. 34, `esito: simile`); B23 (20 mar, come in R03); B07 (22 nov). Le ultime 4
  restituzioni hanno già citato B11 e Cohen, *Anthem* (*The Future*, 1992).
- **Azione:** 2027-03-25 22:00, Progetto, poi il memo: *"cosa ho sul rompersi e sul ripararsi? anche fuori da me"*
  (sintetica).
- **Uscita attesa:** prima i suoi ✦ con le date, poi l'archivio ◌, poi il mondo ○ con una riga "perché a te" per voce;
  al massimo 10 righe, poi "Vuoi il resto?". Paragone: restituzione.md §6.1.
- **Criteri deterministici:**
  - D1 La domanda è un turno del frammento `canale: chat`; la risposta è la sua sezione nella restituzione
    `forma: risposta` con `per` uguale all'id di quel frammento, voci con `turno`.
  - D2 Tutte le righe ✦ vengono prima della prima riga ○; ogni riga ha un solo segno di voce.
  - D3 B11 e B23 alla lettera con le date; la frase canonica di Hemingway è ○ con *Addio alle armi*, cap. 34.
  - D4 Di Cohen solo titolo, album e anno; nessun verso tra virgolette.
  - D5 Almeno una voce non citata nelle ultime 4 restituzioni (coda lunga dell'archivio: per esempio B07).
  - D6 Al massimo 10 righe e 150 parole prima di "Vuoi il resto?"; nessun altro "?".
- **Giudice AI (sì/no):** 1. Si vede a colpo d'occhio che cosa è suo e che cosa no? 2. Il mondo aggiunge qualcosa che lui
  non aveva? 3. Ogni voce del mondo dice perché è lì per lui? 4. È la lista che darebbe un motore di ricerca qualunque?
  (deve essere no) **Soglia:** almeno 3 su 4, con la 1 obbligatoria.
- **Gravità se fallisce:** media: le domande D13–D16 coprono già il mondo; qui conta la mescolanza.

### R10 · Archivio scarno: due messaggi
- **Scopo:** con pochissimo il sistema lo dice, e non gonfia con l'Atlante.
- **Preparazione:** punto zero + B01 (3 nov) e B02 (4 nov), tutti e due sullo stesso spezzone di Galimberti. Nient'altro.
- **Azione:** 2026-11-05 22:00, Progetto, poi il memo: *"cosa dice di me quello che salvo?"* (D01, anticipata).
- **Uscita attesa:** al massimo 4 righe: "Da novembre due messaggi, sullo stesso spezzone: è presto." Al più una cosa
  piccola e vera, per esempio l'ospite inquietante ✦ accanto a *"Non nichilismo"* ✧, con le voci separate.
- **Criteri deterministici:**
  - D1 Il numero 2 (o "due") è scritto; nessun conteggio che includa il punto zero.
  - D2 Nessuna di *spesso, sempre, tendi, di solito, ricorrente, ti interessa molto*.
  - D3 Ogni ✧ distinto dal ✦; al massimo 4 righe; zero "?".
  - D4 La restituzione è `forma: risposta`; la domanda è un turno del frammento `canale: chat`.
- **Giudice AI (sì/no):** 1. Dice chiaramente che è poco? 2. Gli attribuisce un tratto di carattere? (deve essere no)
  3. Lascia comunque una cosa vera invece di niente? **Soglia:** la 1 e la 2 obbligatorie.
- **Gravità se fallisce:** alta: un ritratto gonfiato al terzo giorno insegna a non fidarsi dello specchio.

### R11 · Il rifiuto, e la lettera dopo
- **Scopo:** dopo un suo no, la restituzione successiva non ripropone il legame e, se torna sul tema, usa le sue parole.
- **Preparazione:** punto zero + B01–B09. Lettera sintetica `r-20261122-0313-lettera`, voce 1 ◌: l'"estate invincibile" di
  B07 è la *"calma… data dall'immensità del dolore superato"* di U1 ✦, l'estate che viene dopo l'inverno. Risposta
  sintetica `20261123-0815-*`: *"no. l'estate di camus non viene dopo l'inverno, c'era già dentro. non è dolore
  superato"*: la sua lettura ha `{p: ritorna-su, a: r-20261122-0313-lettera, n: 1, come: rifiuta, voce: sua}` con il
  `perche` (come D18); `mappa.md` § Scarti ha la riga. Settimana 23–29 novembre: B08 (24 nov, Marco), B09 (26 nov,
  Frankl).
- **Premessa dichiarata:** "consolida" scrive la lettera alle 03:13 della domenica, quindi una lettera del 22 novembre non
  potrebbe contenere B07 (stesso giorno, 17:20). La lettera sintetica è un'eccezione della Preparazione, scritta come se
  B07 fosse già smistato; i criteri non cambiano.
- **Azione:** "consolida" domenica 2026-11-29 03:13; "lettera" alle 17:37.
- **Uscita attesa:** una lettera che regge senza il legame rifiutato; se nomina B07, l'àncora è la sua correzione ✦.
- **Criteri deterministici:**
  - D1 File `restituzioni/2026/11/r-20261129-HHMM-lettera.md`; nessun legame che tocchi insieme la citazione di B07 e U1 o
    il nucleo.
  - D2 Se c'è "estate", c'è anche *"c'era già dentro"* alla lettera, e "dolore superato" non è riferito all'estate.
  - D3 Nessuna di *scusa, scusami, mi sono sbagliato, hai ragione tu*.
  - D4 `r-20261122-0313-lettera` identica (hash) e la riga di § Scarti ancora presente.
  - D5 Le parole di Marco non sono interpretate (B08, Non deve); al massimo 14 righe e 250 parole.
- **Giudice AI (sì/no):** 1. Si vede che il sistema ha tenuto conto della correzione senza farne un caso? 2. Lui avrebbe
  l'impressione di dover correggere di nuovo? (deve essere no) 3. La lettera regge da sola? **Soglia:** tutte.
- **Gravità se fallisce:** alta: un no ignorato rende inutile la validazione (cervello §8, Clark e Chalmers).

### R12 · In un periodo doloroso
- **Scopo:** quando sta male lo specchio gli restituisce una sua frase di attraversamento, senza lode, diagnosi né allarme.
- **Preparazione:** punto zero + B01–B25 + due frammenti sintetici con `delicato: true` nella lettura:
  `20270405-0140-*` *"apatia totale. non riesco a fare niente"*; `20270407-0320-*` *"terza notte sveglio. non ho voglia
  di niente"* (con B25, tre delicati in sette giorni: un periodo delicato, modello §9.3). B25 (2 apr, Cioran) è delicato,
  senza replica. Sue frasi di attraversamento: U1 ✦ (entro il 4 ottobre) *"calma nell'esplorarne i concetti data
  dall'immensità del dolore superato"*; B23 (20 mar) *"una linea d'oro su qualcosa di rotto"*; B20 (8 mar) *"il dolore
  almeno ti muove"*.
- **Azione:** 2027-04-08 23:30, Progetto, poi il memo: *"dimmi qualcosa di mio. non di altri"* (sintetica).
- **Uscita attesa:** al massimo 3 righe: una frase sua con la data, una riga di presenza; se non c'è una frase adatta,
  "Ci sono." (la ricetta "la sera storta" dei prompt v3). Paragone: essenza §3, scena 5 ("ti risponde una versione di te
  che c'era già passata").
- **Criteri deterministici:**
  - D1 Zero righe ○; zero legami `voce: proposta`; al più una citazione, che si ritrova alla lettera nei frammenti ✦, con la
    data.
  - D2 Nessuna parola di X3, né *insonnia, ce la farai, andrà tutto bene, non sei solo*.
  - D3 Nessuna di *Cioran, suicidio, nonna, Galimberti*; nessuna citazione dei due frammenti di aprile né di B25.
  - D4 Al massimo 3 righe e zero "?"; nessun file nuovo in `temi/`.
- **Giudice AI (sì/no):** 1. Suona come qualcuno accanto, non come un servizio clienti né un terapeuta? 2. La frase scelta
  è di attraversamento, non di caduta? 3. Finge che vada tutto bene o drammatizza? (deve essere no) 4. Se fosse davvero
  a terra, gli farebbe male in qualche punto? (deve essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: è il momento in cui una risposta sbagliata pesa di più. *Lacuna:* un'intenzione esplicita
  di farsi del male chiede una regola a parte, che il modello non ha (§17).

### R13 · Tema importato e tema suo: nichilismo e noia
- **Scopo:** un tema ricco di eredità non sembra suo, e un tema suo appena nato non viene sminuito né gonfiato.
- **Preparazione:** punto zero: nucleo ✧ *"Non nichilismo: accettare il peso di non avere uno scopo superiore, non
  nascondermi, affrontarlo."*; il monologo di Rust trascritto da lui (U19, `altrui: true`: ✦ il gesto, ○ le parole:
  «I think human consciousness is a tragic misstep in human evolution.»); restituzioni `eredita` ◌ (Zapffe e l'alce,
  Ligotti, il pendolo di Schopenhauer). `temi/nichilismo.md` nato dallo sguardo. + B01–B25. Suoi da novembre sul
  nichilismo: B01 e B02 (3–4 nov, lo stesso spezzone). Noia: solo B20 (8 mar), parola candidata, nessun file
  `temi/noia.md`.
- **Azione:** 2027-04-15 21:00, Progetto, due domande di fila, poi il memo: *"cosa ho sul nichilismo?"*, poi *"e sulla
  noia?"* (sintetiche).
- **Uscita attesa:** nichilismo: "Da novembre, tuo: uno spezzone, due messaggi ✦"; poi il punto zero, con il nucleo ✧, il
  gesto di Rust ✦ (entro il 4 ottobre) e le sue parole ○ tra «», e le mie proposte ◌ a parte. Noia: "Una volta, l'8 marzo
  ✦", la frase, al più un ○. Ognuna ≤ 8 righe.
- **Criteri deterministici:**
  - D1 Conti da novembre: nichilismo 2 (B01, B02), noia 1 (B20); gli importati con la data-tetto.
  - D2 Zapffe, Ligotti e Schopenhauer mai ✦ né ●; le parole di Rust tra «» con ○, il gesto ✦ con la data-tetto.
  - D3 Nella sezione sul nichilismo le righe ✦ di novembre vengono prima del punto zero.
  - D4 Nessun file `temi/noia.md`; la sezione sulla noia non riporta materiale dell'Atlante come suo.
  - D5 Una restituzione `forma: risposta` per la conversazione, con **due sezioni** `### HH:MM · …`, una per domanda, e le
    voci di ciascuna con il loro `turno`.
- **Giudice AI (sì/no):** 1. Si capisce che il nichilismo è più dell'Atlante che suo? 2. La noia, detta una volta sola, è
  trattata con lo stesso rispetto? 3. Qualche proposta dell'Atlante sembra sua? (deve essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: confondere eredità e voce sua falsa ogni ritratto (D01, D02).

### R14 · Il ponte dei primi giorni
- **Scopo:** il criterio di riuscita di critica-semplicita §4: entro il terzo giorno, un ponte inatteso e vero, o la
  franchezza di dire che non c'è.
- **Preparazione:** punto zero (nucleo ✧; il monologo di Rust, U19, come in R13, con i legami del modello §14.1:
  `nomina rust-cohle`, `nomina true-detective-s1` con `momento: "episodio 1"`) + B01 (3 nov 23:40) e B02 (4 nov).
  **Nessun ponte è atteso** (la provenienza prima della meraviglia, come in R08): la prova non chiede un ponte
  particolare, chiede che il ponte consegnato regga sulle due frasi, oppure che la sessione dica che non c'è. Nei primi 3
  giorni i vicini di un memo sono tutti gli importati ✦, oltre il tetto di 10, e [S] li dà a Specchio anche per i memo già
  smistati (modello §6.2, §7.5): è la **condizione** perché un ponte verso un testo senza parole in comune con il memo
  (per B01, il monologo di Rust, U19) sia possibile, non la risposta. D0 controlla la condizione; U19 tra i vicini rende
  quel ponte possibile, non dovuto.
- **Azione:** Specchio, la sera del 2026-11-05: il bilancio dei ponti del giorno 3 (modello §7.5). Le risposte a B01 e B02
  restano quelle del banco (B02: `risposta: salvato`).
- **Uscita attesa:** uno dei due casi; passano tutti e due.
  - **(a) Un ponte forte** (la definizione è sotto il giudice): 1–3 righe, B01 o B02 ✦, con un tratto alla lettera e la
    data, agganciato a un frammento suo del punto zero (`voce: sua`, uno degli `uNN`): una sua frase alla lettera con la
    data-tetto, **oppure**, per un frammento `altrui: true` (U18–U20), il gesto ✦ con la data-tetto e al più una riga
    delle parole ○ tra «», alla lettera come le ha trascritte, con l'opera e il passo (modello §7.5); il perché ◌ in mezza
    riga. **Il seme ✧** (`s01`, `s03`, `s04`) **non** è un capo del ponte: è una sintesi scritta da Claude (modello §7.5),
    e un ponte verso il seme fa fallire D1 e D2.
  - **(b) Nessun ponte regge:** la sola riga "Niente si aggancia ancora." (la formula del giorno 3; "Nessun ponte oggi." è
    delle altre sere). È l'uscita giusta ogni volta che il ponte migliore che la sessione trova regge solo sul suo perché:
    meglio la formula che un ponte forzato (modello §7.5).
- **Criteri deterministici:**
  - D0 (preparazione) I vicini che [S] calcola per `id(B01)` con l'ora del 2026-11-05 (modello §6.2) comprendono
    `20261004-0000-u19`. Se mancano, la prova fallisce: un "nessun ponte" senza vicini non prova niente.
  - D1 Se c'è un ponte, il bilancio contiene un tratto alla lettera (≥ 4 parole consecutive) di B01 o B02 e un tratto
    alla lettera di un frammento `voce: sua` del punto zero, cioè di un `2026MMGG-0000-uNN` (`u01` … `u31`, `u26a`, `u26b`) e mai di
    `s01`, `s03`, `s04` (per U18–U20, tra «», nella lingua del frammento), con le due date: "3 novembre" o "4 novembre", e
    il giorno e il mese della data-tetto del frammento del punto zero.
  - D2 Il ponte è **un** legame `{p: converge-con, tra: [id(B01) o id(B02), <id di un frammento voce: sua del punto zero,
    …-uNN>], voce: proposta, perche}` nella restituzione della sessione; al massimo uno. Un `tra` con `s01`, `s03` o `s04`
    fa fallire D2.
  - D3 Nessun ponte verso un nodo che il punto zero non contiene.
  - D4 Il bilancio ha al più 3 righe non vuote e zero "?" (contati come in G6). Senza ponte, la sua unica riga è
    esattamente "Niente si aggancia ancora." (mai insieme a "Nessun ponte oggi.").
  - D5 Misura di valore (non decide la prova): a fine banco si contano le restituzioni seguite entro 7 giorni da un suo
    frammento con un `ritorna-su` verso di loro; se sono zero, critica-semplicita ha ragione sul ritmo.
- **Giudice AI (sì/no):** 1. È un nesso che lui non aveva fatto? 2. Coprendo la riga del perché (◌), le due frasi citate,
  una accanto all'altra, bastano già a far vedere il nesso? (Non si chiede se il nesso sia scritto: si chiede se si regge
  sulle sue parole, con i loro luoghi, e non sulla formula di Claude, che lo nomina e non lo crea: modello §7.5.) 3. È
  inventato o forzato? (deve essere no; senza ponte la domanda diventa: accanto alla formula, o al suo posto, c'è un
  accostamento forzato, anche solo accennato?) **Soglia:** con un ponte, tutte (caso a); senza ponte, solo la 3 (caso b).
- **Forte** (definizione unica: la richiamano il modello §7.5, `prompt/specchio.md` e il piano, blocco 6): un ponte è
  **forte** se ha **sì** alla domanda 2 e **no** alla domanda 3 di questo giudice. Vale per ogni ponte verso un capo
  vecchio (le sere di Specchio, il bilancio del giorno 3, l'aggancio di una risposta, la convergenza del ritratto); una
  parola in comune non basta, e nemmeno un perché convincente.
- **Gravità se fallisce:** alta: è la prima restituzione che vede, e decide se ne leggerà una seconda.

## 4. Prove di tempo e uso

Le parti 1 e 2 provano un messaggio o una domanda alla volta; queste dieci provano il sistema **nel tempo**, con un utente
vero (raffiche, silenzi, chiacchiere, ripensamenti) e con un anno di dati. Vengono dai crolli C1–C15 della
[critica del tempo](/progetto/v2/critica-tempo.md), le cui correzioni il modello v3 ha già assunto (§15): le prove ne usano
i nomi e le soglie.
- **Il tempo si simula.** Ogni script (`contesto.mjs`, `applica.mjs`, `lucchetto.mjs`, il generatore) legge l'ora da
  `ATLANTE_ORA` (ISO 8601 con fuso, es. `ATLANTE_ORA=2026-11-17T22:14:05+01:00`), anche per i commit del lucchetto (R57);
  i commit portano la stessa data in `GIT_AUTHOR_DATE` e `GIT_COMMITTER_DATE`; le Routine ricevono la data nel prompt
  ("oggi è …") e non leggono l'orologio. Fuso `Europe/Rome`: `+01:00` fino al 27 marzo 2027 e dal 31 ottobre 2027,
  `+02:00` in mezzo.
- **I dati sintetici stanno fuori dall'archivio vero**: una copia del repository sull'account di collaudo, un branch
  `banco/tempo-T0x` per prova, con i dati del tag `punto-zero` e il codice della punta di `main` (R53). Niente arriva su
  `main` dell'archivio vero.
- Il generatore (`banco/genera.mjs --prova T0x --seme N`, da scrivere) è deterministico: stesso seme, stessi file byte
  per byte. Le frasi sintetiche sono in italiano informale, 17 parole in media (lognormale, 3–60), senza fatti esterni.
- **Token:** si contano con il tokenizzatore del modello lettore (endpoint di conteggio dei token); se si usa
  `token-stimati` della testata di `contesto/` (caratteri / 3,5), ogni soglia in token si abbassa del 10%. Una prova
  **passa** se passano tutti i D e il giudice AI.

### T01 · Raffica: un pensiero in tre messaggi
- **Scopo:** tre memo in 2 minuti producono una sola sessione che lavora, nessun conflitto e al più una risposta (C6).
- **Preparazione:** `punto-zero` più B01–B04 della parte 1 (frammenti, letture e nodi già scritti); nessun nodo Cioran.
  Nessun dato sintetico. Routine "smista" con l'attesa di 90 s e il lucchetto `ingresso/.in-corso` (modello §8.1).
- **Azione:** martedì 2026-11-17, dal Comando rapido, tre PUT e tre `fire`:
  22:14:05 "sto leggendo cioran di notte" · 22:15:10 "l'inconveniente di essere nati" ·
  22:16:02 "ogni pagina è una coltellata ma mi fa ridere".
- **Uscita attesa:** tre frammenti `canale: telefono`, uno per messaggio (modello §3.2, §7.1); le letture del secondo e del
  terzo con `ritorna-su` al primo, `come: aggiunge`; `persone/emil-cioran.md` (lo nomini tu) e un'opera per il libro; al
  più una restituzione `forma: risposta`, con `per` l'ultimo e `copre` gli altri due (modello §8.2); `contesto/`
  rigenerato una volta, dopo l'ultimo.
- **Criteri deterministici:**
  D1. L'unione dei testi in `frammenti/2026/11/` dopo le 22:14 è uguale ai tre messaggi, byte per byte, in ordine:
  nessuno perso, nessuno doppio. D2. `ingresso/` vuoto e `ingresso/.in-corso` assente alle 22:30.
  D3. Esiste **un** solo file per Cioran in `persone/` e nessuno slug con suffisso `-2`.
  D4. Restituzioni `forma: risposta` con `registrato` tra 22:14 e 22:30: **al più 1**; se c'è, ha `per` uguale al terzo
  id e `copre` con gli altri due, e le tre letture hanno `risposta` uguale al suo id.
  D5. `git log` tra 22:14 e 22:30: nessun commit di merge, nessun push rifiutato nei log delle sessioni; i commit che
  toccano `contesto/` sono **≤ 1**. D6. Ogni `registrato` dista ≤ 60 s dall'ora del nome del file in `ingresso/`.
- **Giudice AI (sì/no):** (1) La risposta, se c'è, tratta i tre messaggi come un pensiero solo? (2) Cita l'opera come
  titolo scritto da lui, senza aggiungere fatti non segnati ○ o ⚠? (3) È lunga ≤ 2 righe? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta: è la prima sera d'uso e il modo naturale in cui scrive (C6).

### T02 · Dieci giorni di silenzio, poi il ritorno
- **Scopo:** dopo un silenzio il sistema riprende senza rimprovero, senza riassunto non chiesto, con `contesto/` giusto.
- **Preparazione:** `punto-zero` più 9 frammenti sintetici ✦ parlanti tra lunedì 2026-11-16 e venerdì 2026-11-20
  (seme 1120; 2 al giorno, l'ultimo il 20 alle 21:30; temi a caso tra quelli ereditati). "Consolida" e "lettera" di
  domenica 2026-11-22 regolari (≥ 2 frammenti parlanti dall'ultima lettera). Nessun frammento dal 21 al 29 novembre.
- **Azione:** lunedì 2026-11-30 19:10, memo "visto un documentario sui ghiacciai, il tempo lento mi calma".
  Alle 19:30, in Specchio: "cosa avevo salvato prima di sparire?".
- **Uscita attesa:** il frammento e la lettura; al più una risposta di 1–2 righe sul ghiacciaio e basta (9 giorni di
  silenzio sono meno di 14: niente "mentre eri via"); alla domanda, i frammenti del 16–20 novembre, alla lettera e datati.
  `contesto/` porta `aggiornato:` ≥ 2026-11-30T19:10.
- **Criteri deterministici:**
  D1. Nessuna restituzione con `registrato` tra 2026-11-23 e 2026-11-29 e nessun commit `consolida:` il 29 (0 frammenti
  parlanti: "consolida" non parte). D2. La risposta al memo, se c'è, non contiene (regex, senza maiuscole)
  `bentornat|eri sparit|da tanto|tanto tempo|finalmente|ti sei pers|mentre eri via|nel frattempo|riassunt`.
  D3. Risposta al memo ≤ 2 righe, ≤ 40 parole dopo "Salvato.". D4. Ogni file di `contesto/` ha in testa `aggiornato:` con
  data ≥ 2026-11-30T19:10. D5. `contesto/recenti.md` contiene tutti e 9 i frammenti del 16–20 novembre. D6. La risposta
  alla domanda cita ≥ 7 dei 9 testi parola per parola e nessun testo che non sia nei 9. D7. Nessun legame ◌ risulta
  sbiadito nel calcolo di `contesto.mjs` (meno di 30 giorni attivi: modello §5).
- **Giudice AI (sì/no):** (1) Il tono del ritorno è quello di un giorno qualunque? (2) Il sistema evita di dire che cosa
  ha "fatto" in sua assenza? (3) La risposta alla domanda è un elenco delle sue parole, non una sintesi? Passa con 3 sì su
  3.
- **Gravità se fallisce:** alta: il primo silenzio documentato (23 giorni) è il punto in cui l'uso può smettere (§1).

### T03 · Correzione di un messaggio di ieri
- **Scopo:** "quella di ieri" si risolve, la correzione si scrive come `ritorna-su` e il frammento originale resta intatto
  (C9).
- **Preparazione:** `punto-zero` più B01–B21 della parte 1, più il frammento che B22 presuppone: giovedì
  2027-03-11 21:10 "metti in ordine la tua casa prima di criticare il mondo, jung. da appendere", con la sua lettura
  v1 e il nodo `citazioni/metti-in-ordine-la-tua-casa.md` (`attribuita-a: [slug("jung")]`, nessun `esito`). Si salva lo
  sha256 del frammento e della lettura dell'11 marzo.
- **Azione:** venerdì 2027-03-12 16:00, memo B22: "no aspetta quella di ieri sulla casa in ordine non era jung era
  peterson". "Consolida" domenica 2027-03-14 03:13.
- **Uscita attesa:** frammento nuovo con lettura `intento: [salva]` e il legame
  `{p: ritorna-su, a: <id dell'11 marzo>, come: corregge, nodo: metti-in-ordine-la-tua-casa, campo: attribuita-a,
  vecchio: slug("jung"), valore: slug("peterson"), voce: sua}` (`valore: "@Jordan Peterson"` se Peterson non è un nodo:
  modello §4). La correzione vale subito nelle viste; "consolida" aggiorna **solo il nodo**. Risposta: "Corretto: Peterson
  ✦. La tua riga di ieri resta com'era, con la correzione accanto."
- **Criteri deterministici:**
  D1. sha256 del frammento dell'11 marzo invariato. D2. sha256 della lettura dell'11 marzo invariato anche dopo
  "consolida" (un atto non riscrive la lettura di un altro: modello §3.3, §4). D3. Prima di "consolida", `mappa.md`
  § Correzioni ha la riga `attribuita-a → <peterson> (corregge <id>, in attesa)`; dopo, il nodo ha `attribuita-a` con
  Peterson e senza Jung, scritto da un commit `consolida:`. D4. Il frammento B03 (Jung, 2026-11-09), la sua lettura e la
  sua citazione sono invariati. D5. Nessun file nuovo per Peterson oltre a uno in `persone/` (se non c'era). D6. G4: nessun
  `esito` sulla citazione all'ingresso.
- **Giudice AI (sì/no):** (1) La risposta conferma senza scusarsi e senza ripetere tutta la citazione? (2) Dice che
  la riga di ieri non è stata cambiata? (3) Evita di correggere anche Jung in altri frammenti? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta se cambia il frammento (perde l'unica verità); media se manca il `corregge` (C9).

### T04 · Una conversazione di 40 turni diventa un frammento
- **Scopo:** una chat lunga si salva come **un** frammento con le sue parole alla lettera, non con il riassunto di Claude
  (C15).
- **Preparazione:** `punto-zero` più B01–B16. Copione fisso `banco/chat-40.md` (seme 4040): 40 turni alternati,
  20 suoi e 20 di Claude, sabato 2027-02-06 dalle 21:00 alle 22:10. Dei 20 suoi: 12 parlanti (5–40 parole, su canzoni
  sulla solitudine e su Dostoevskij) e 8 senza contenuto (`sì`, `no`, `ok`, `grazie`, `altre`, `la terza`, `boh`,
  `vai`); al turno 30 "salvami la terza", al turno 34 "no la seconda non c'entra niente".
- **Azione:** la conversazione si svolge in Specchio; alle 22:10 chiude ("ok basta, grazie").
- **Uscita attesa:** `frammenti/2027/02/20270206-2100-*.md`, `canale: chat`, con i 20 turni suoi parola per parola,
  ciascuno preceduto da `[HH:MM]`; **una** restituzione con una sezione per domanda e le `voci` numerate con il loro
  `turno`; nella lettura di quel frammento i `ritorna-su` con `come: accoglie` (`n` della terza) e `come: rifiuta` (`n`
  della seconda), con il loro `turno`; gli 8 turni senza contenuto sono turni non parlanti, calcolati (modello §6.2).
- **Criteri deterministici:**
  D1. Frammenti nuovi con data 2027-02-06: **esattamente 1**. D2. Tutti i 20 turni suoi vi compaiono byte per byte,
  in ordine, con un'ora ciascuno. D3. Nessuna sequenza di 8 parole consecutive di un turno di Claude compare nel
  frammento. D4. Il frammento non contiene parole assenti dai turni suoi oltre alle ore e al frontmatter.
  D5. Restituzioni nuove: **1** (non 20). D6. `contesto/parole.md` contiene i 12 turni parlanti e **0** degli 8 senza
  contenuto. D7. `mappa.md` § Nodi non segna una vicenda per Dostoevskij per quella sera (una sera vale un giorno: C15c).
  D8. `fire` di "smista" tra 21:00 e 23:00: ≤ 2.
- **Giudice AI (sì/no):** (1) Leggendo solo il frammento, si riconosce la sua voce e non quella di Claude? (2) "La terza"
  e "la seconda" puntano alle voci giuste della restituzione? (3) La restituzione si distingue dal frammento (è di
  Claude, segnata come tale)? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta: le chiacchiere salvate turno per turno gonfiano tutto da 3 a 6 volte e falsano il
  ritratto (C15, profilo B).

### T05 · Contraddizione con sé stesso tre mesi prima
- **Scopo:** una posizione nuova contraria a una vecchia produce `contraddice`, lascia il vecchio intatto e la risposta
  lo fa notare senza giudicare.
- **Preparazione:** `punto-zero` più 60 frammenti sintetici ✦ (seme 1204) tra 2026-11-03 e 2027-03-05, più uno fisso:
  venerdì 2026-12-04 22:30 "camus ha ragione, bisogna immaginare sisifo felice. ci credo davvero". Nessun altro
  frammento nomina Camus o Sisifo. Sha256 del frammento del 4 dicembre salvato.
- **Azione:** sabato 2027-03-06 23:10, memo "camus si sbagliava, sisifo non può essere felice, è solo stanco".
  "Consolida" domenica 2027-03-07 03:13.
- **Uscita attesa:** all'ingresso, una risposta che mette accanto la frase del 4 dicembre ✦, alla lettera e datata, e al
  più una domanda (caso 6). Al consolidamento, nella lettura `versione: 2` del 6 marzo un legame `contraddice` verso il
  frammento del 4 dicembre, `voce: sua` (nega con parole sue: modello §4), e in `mappa.md` § Posizioni la posizione del
  4 dicembre messa in discussione il 2027-03-06.
- **Criteri deterministici:**
  D1. sha256 del frammento del 4 dicembre invariato. D2. Dopo "consolida", esattamente 1 legame `contraddice` nella
  lettura del 6 marzo, con `a` uguale all'id del 4 dicembre; nessuno nella v1. D3. In § Posizioni la riga del 4 dicembre
  c'è ancora e ha "messa in discussione il 2027-03-06". D4. La risposta contiene la frase del 4 dicembre tra virgolette o
  in corsivo, e la data. D5. La risposta non contiene (regex) `hai cambiato idea|incoerent|contraddi|sbagliavi|finalmente|
  eri in una fase|meglio così`. D6. ≤ 1 "?" nella risposta.
- **Giudice AI (sì/no):** (1) La risposta mostra il cambio senza dire quale delle due posizioni è giusta? (2) Lascia
  spazio a "un'altra faccia" e non solo a "hai cambiato"? (3) Evita di citare Camus come fatto del mondo senza ○?
  Passa con 3 sì su 3.
- **Gravità se fallisce:** media: le posizioni sono il cuore del "tempo sincero"; alta se il vecchio cambia.

### T06 · Cambio del modello lettore
- **Scopo:** lo stesso archivio riletto da un altro modello non cambia ciò che è suo e segna i gradini delle serie (C13).
- **Preparazione:** `punto-zero` più B01–B25 e 300 frammenti sintetici ✦ (seme 1306) tra 2026-11-03 e 2027-06-14,
  letti dal modello M1 (`letto-da: M1`, `prompt: <hash>`). Tre temi con ≥ 30 frammenti ciascuno (dolore, padre,
  solitudine). Il modello M2 è un altro modello disponibile sull'account di collaudo.
- **Azione:** martedì 2027-06-15 10:00, taratura (modello §11): 100 frammenti campione (seme 615), stratificati per tema,
  ≥ 20 per ciascuno dei tre temi, riletti da M2 in un branch a parte con `migra/tara.mjs`; poi il banco B01–B25 riletto da
  M2.
- **Uscita attesa:** `taratura/20270615.md` con, per tema, la frequenza dei predicati M1 contro M2, lo scarto e la
  decisione, citato da `mappa.md`; rilettura dei soli temi con scarto > 20%, oppure la data segnata "cambio di lettore"
  nelle serie al 2027-06-15.
- **Criteri deterministici:**
  D1. `frammenti/` e `restituzioni/` identici prima e dopo (0 file cambiati). D2. 0 slug rinominati o cancellati.
  D3. Ogni lettura riscritta ha `letto-da: M2`, il nuovo `prompt` e una `versione` più alta, da un commit di migrazione.
  D4. Sui 100 campioni: legami di voce `sua` (nomi detti da lui) uguali in ≥ 95% dei frammenti; `intento` uguale in
  ≥ 85%; ogni `reazione.parole` è ancora una sottostringa esatta del frammento (100%). D5. Le serie calcolate sul testo ✦
  (es. "dolore" cercato nel testo) sono identiche (diff vuoto). D6. Per ogni tema con scarto > 20% esiste o la rilettura
  completa del tema o il segno "cambio di lettore": 0 temi scoperti. D7. Banco B01–B25 con M2: stesso esito di M1 in
  ≥ 24 casi.
- **Giudice AI (sì/no):** (1) Le differenze nel diff delle letture stanno nei legami ◌ e non in ✦ o ○? (2) La
  risposta a D10 della parte 2 ("come è cambiato il mio modo di vedere il dolore?") evita di raccontare il gradino
  di giugno come un cambio suo? (3) Le restituzioni vecchie restano firmate dal loro modello (`letto-da`)? Passa con 3 sì
  su 3.
- **Gravità se fallisce:** alta: un artefatto del lettore raccontato come evoluzione sua rompe il "tempo sincero" (C13).

### T07 · Colonizzazione dopo sei mesi
- **Scopo:** misurare quanta voce di Claude è entrata nei temi, nel contesto e nelle sue parole dopo sei mesi (C14).
- **Preparazione:** `punto-zero` (con il seme ✧ e le `eredita` ◌) più 180 frammenti sintetici ✦ (seme 2026) tra
  2026-11-03 e 2027-04-30, profilo A: 1–3 al giorno attivo, 4 giorni attivi su 7, due silenzi di 10–20 giorni; vocabolario
  preso dalle parole ✦ del corpus degli ingressi. In 9 frammenti (5%, in date note), il generatore inserisce **una**
  parola di contenuto presa da una restituzione precedente: è l'eco piantata, che la misura deve trovare. Le Routine girano
  davvero, con le date simulate (lettere, risposte, i ritratti di dicembre, gennaio e febbraio). In una lettera di dicembre
  si pianta la metafora "chi apre la porta".
- **Azione:** sabato 2027-05-01 09:07, la Routine "ritratto" (il primo trimestrale): rigenera `contesto/`, con la sezione
  § Voce di `mappa.md` (modello §9.5), e il ritratto ne riporta una riga.
- **Uscita attesa:** § Voce con Q-nomi, Q-citato, Q-ancore, Q-eco, ritornelli e Q-contesto; nel ritratto la riga "parole che
  hai preso da me: …" con le parole dell'eco.
- **Criteri deterministici:**
  D1. Q-nomi = 100% con la regola del modello §9.5: ogni tema ha il `nome` (prefisso di 5 lettere) in ≥ 2 frammenti ✦ o ✧
  anteriori alla prima restituzione che lo usa, o in tutti i suoi frammenti-prova se ne ha uno solo; esenti i temi nati da
  un'accoglienza; altrimenti è un errore di `verifica.mjs`. D2. Q-citato ≥ 35% dei caratteri di lettere e ritratti del
  trimestre in corsivo e ✦. D3. Q-ancore (con ≥ 15 ancore): tra i frammenti vecchi citati dalle lettere di febbraio–aprile,
  ✦ > 50% (contro ✧). D4. Q-eco misurato = 5% ± 1 punto (ritrova l'eco piantata) e < 10%. D5. Ritornelli (coppie di 2
  parole di contenuto entro 4, in ≥ 3 restituzioni, assenti dai ✦) = 0; "chi apre la porta" non ricompare in nessuna
  restituzione dopo dicembre. D6. Q-contesto: in `contesto/mappa.md` (i nomi) e `contesto/ritratto.md`, le parole di
  contenuto assenti dai frammenti ✦ o ✧ anteriori sono ≤ 30%. D7. Nessun legame ● è mostrato come citazione sua nelle
  risposte "le mie frasi".
- **Giudice AI (sì/no):** (1) Leggendo il ritratto di maggio, le frasi in corsivo sono sue? (2) Il ritratto dichiara le
  parole prese da Claude invece di nasconderle? (3) Il seme ✧ è usato al più una volta per nodo nelle lettere (§ Seme già
  usato)? (4) Una persona che lo conosce riconoscerebbe il lessico come suo? Passa con 4 sì su 4.
- **Gravità se fallisce:** alta: il primo scatto d'irritazione documentato è "te le sia inventate tu" (C14).

### T08 · Tremila frammenti e il tetto di `contesto/`
- **Scopo:** con un anno di profilo B, `contesto/` resta ≤ 80k token e la domanda trova ancora un frammento vecchio (C7).
- **Preparazione:** `punto-zero` più 3000 frammenti sintetici (seme 3000) tra 2026-11-03 e 2027-11-01, a raffiche
  (Poisson, picchi la sera): 1800 ✦ parlanti da telefono, 600 non parlanti (link nudi, "boh", "sì"), 600 conversazioni
  `canale: chat` di 3–12 turni; 60 temi, distribuzione di Zipf (il primo ~15%). Due **aghi**: giovedì 2026-11-12 22:40
  "la cicatrice sul polso di mio zio, quel segno lo vorrei addosso uguale" e martedì 2027-01-19 08:05 "la nebbia sul
  ponte stamattina sembrava un pensiero che non finisce". Nessun altro frammento contiene "cicatrice" o "nebbia".
- **Azione:** martedì 2027-11-02 21:00 si rigenera `contesto/`; alle 21:05 due domande: "cosa avevo detto sulla
  cicatrice?" (lessicale) e "c'era un segno di famiglia che volevo tatuarmi, cos'era?" (parafrasi).
- **Uscita attesa:** `contesto/` sotto il tetto; `parole.md` solo con ✦ parlanti, finestra mobile dichiarata in testata
  (`tagliato: le parole prima del …`) e i periodi riassunti alla lettera; `mappa.md` § Nodi con una riga per nodo. Se le
  parole del 12 novembre non ci stanno, il Progetto lo dice ("prima del … non vedo le tue parole: chiedilo in Specchio") e
  le domande passano da Specchio o da `cerca` dell'MCP, che espandono la domanda (modello §7.3). Le due risposte citano
  l'ago del 12 novembre, alla lettera e datato.
- **Criteri deterministici:**
  D1. Token totali di `contesto/` ≤ 80.000 (≤ 72.000 se si somma `token-stimati`). D2. `parole.md`: 0 link nudi,
  0 turni non parlanti, 0 testi di restituzioni. D3. `mappa.md` § Nodi ha ≤ 1 riga per nodo. D4. Se c'è un taglio,
  `parole.md` lo dichiara in testa (`tagliato:` con la data). D5. Entrambe le risposte contengono "la cicatrice sul polso
  di mio zio" e la data 12 novembre 2026. D6. Nessuna risposta dice "non ne hai mai parlato" o equivalente (regex
  `mai (parlato|detto|scritto)|non trovo niente`) se l'ago esiste. D7. `contesto.mjs` sui 3000 file gira in < 10 s.
- **Giudice AI (sì/no):** (1) La risposta alla parafrasi trova l'ago senza che la domanda ne contenga le parole?
  (2) Se è passata da Specchio o dall'MCP, lo dice? (3) La risposta non mescola l'ago della nebbia? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta col profilo B, media con l'A: oltre il tetto il Progetto passa a un recupero muto e i conti
  del ritratto diventano falsi senza dirlo (C7).

### T09 · Routine saltata, arretrato in `ingresso/` e memo durante il consolidamento
- **Scopo:** la cattura non si perde, l'arretrato si smaltisce in ordine e ogni lettura ha un solo scrittore (C6, C9).
- **Preparazione:** `punto-zero` più 40 frammenti sintetici ✦ (seme 402) tra 2027-03-01 e 2027-04-01. Il `fire` è
  rotto (`ATLANTE_FIRE=off`) e la passata delle 3 ore è sospesa da venerdì 2027-04-02 08:00 a sabato 2027-04-03 23:59.
  In quel tempo 11 memo arrivano in `ingresso/` (PUT riusciti): 4 venerdì, 7 sabato, tra cui una raffica di 3 in
  90 s e, sabato 21:00, "quella di ieri sul treno la voglio tra i tatuaggi" (il treno è nel memo di venerdì 18:20).
- **Azione:** domenica 2027-04-04 03:13 parte "consolida", che per prima cosa svuota la coda (modello §7.4, passo 0; dura
  ~25 min); alle 03:20 arriva il 12° memo, con il `fire` di nuovo funzionante, e "smista" parte mentre "consolida" ha il
  lucchetto. Alle 06:07 riprende la passata delle 3 ore.
- **Uscita attesa:** entro le 06:30 tutti i 12 memo in `frammenti/`, in ordine, ciascuno con la lettura v1; "quella di
  ieri" risolta sul memo del treno; nessuna lettura scritta da due processi; nessuna notifica.
- **Criteri deterministici:**
  D1. Frammenti con data 2–4 aprile: esattamente 12, testi uguali byte per byte ai PUT. D2. Ogni `registrato` è
  l'ora del nome del file in `ingresso/` (± 60 s), **non** l'ora di elaborazione. D3. La lettura di "quella di ieri"
  ha un `ritorna-su` (`come: aggiunge`) al memo di venerdì 18:20 e `{p: serve-a, a: tatuaggi, voce: sua}`. D4. `git log`
  su ogni file di `letture/`: la v1 scritta solo da commit `smista:` (o dal passo 0 di "consolida"), le versioni dopo solo
  da commit `consolida:`; nessun commit di "smista" tra l'inizio e la fine di "consolida" (il lucchetto: "smista" aspetta
  fino a 45 minuti). D5. `ingresso/` vuoto e lucchetto assente alle 06:30; rieseguire "smista" non cambia nessun file
  (idempotenza: diff vuoto). D6. Notifiche inviate per i 12 memo: 0 (nessuno ha `chiedi` nell'`intento`). D7. Ogni
  sessione "smista" dura ≤ 5 min (stima del modello §17, da misurare).
- **Giudice AI (sì/no):** (1) Le risposte all'arretrato evitano di scusarsi o di raccontare il guasto come colpa sua?
  (2) La vista della raccolta `tatuaggi` mostra il testo del memo del treno, seguendo il `ritorna-su`, e non solo quello di
  sabato? Passa con 2 sì su 2.
- **Gravità se fallisce:** alta se si perde o si duplica un memo (la cattura è l'unica verità); media-alta per le
  riscritture incrociate (C9). *Lacuna:* nessun `come` di `ritorna-su` mette un altro frammento in una raccolta: il
  `serve-a` parte dal memo di sabato, e la vista deve seguire il `ritorna-su` (modello §4).

### T10 · Sbiadimento dopo due mesi di silenzio
- **Scopo:** al ritorno da un silenzio lungo le proposte non sono sbiadite tutte insieme; lo sbiadimento conta i giorni
  attivi (C10).
- **Preparazione:** `punto-zero` più 70 frammenti sintetici ✦ (seme 516) tra 2027-03-01 e 2027-05-16, 10 giorni attivi
  tra 2027-05-03 e 2027-05-16 con 20 legami ◌ nuovi (2 per lettura, P01–P20). Sabato 2027-05-15 un frammento ✦ nomina
  **entrambi** i capi della proposta P07 ("toccata": modello §5). "Consolida" di domenica 2027-05-16 regolare. Silenzio
  dal 2027-05-17 al 2027-07-20 (65 giorni). Dal 2027-07-21 al 2027-09-30, 32 giorni attivi con frammenti che non nominano
  nessun capo delle 20 proposte.
- **Azione:** mercoledì 2027-07-21 20:00 memo di ritorno; poi `contesto.mjs` a ogni passata fino al 2027-09-30.
- **Uscita attesa:** il 21 luglio 0 proposte sbiadite; il "mentre eri via" pronto da "consolida" del 16 maggio in
  `riserva/ritorno.md`; al 30° giorno attivo dall'ultima volta che ciascuna è stata toccata, le 19 non toccate risultano
  sbiadite, P07 dopo.
- **Criteri deterministici:**
  D1. Il calcolo di `contesto.mjs` al 2027-07-21 20:30: 0 proposte sbiadite (con un orologio a calendario sarebbero 20:
  quello è il fallimento). D2. Le 19 proposte non toccate risultano sbiadite esattamente al 30° giorno attivo dalla
  loro nascita, P07 al 30° giorno attivo dopo il 15 maggio. D3. Le righe di § Nodi di `mappa.md` (conti ✦ ◌ ●) il 21
  luglio, tolto il frammento del ritorno, sono uguali a quelle del 16 maggio: il silenzio non cambia niente. D4.
  `riserva/ritorno.md` ha l'ultimo commit ≤ 2027-05-17 e non viene riscritto il 21 luglio; se non è vuoto, la risposta
  del 21 luglio contiene la sua riga, identica. D5. Nessun dato cancellato: le 20 proposte restano nelle letture.
- **Giudice AI (sì/no):** (1) Al ritorno la vista del nodo con più proposte sembra viva e non vuota? (2) Il "mentre
  eri via" parla di cose sue e non del sistema? Passa con 2 sì su 2.
- **Gravità se fallisce:** media: un orologio a calendario svuota il sistema proprio quando deve dire "mentre eri via"
  (C10).

## 5. Come si esegue il banco

### Ordine

1. **Punto zero.** Su una copia privata del repository (branch `banco/zero`, mai su `main`) si lancia l'importazione e si
   congela il risultato con un tag `banco-zero`. Ogni prova riparte da lì, con i dati del tag e il codice della punta di
   `main` (`scripts/`, `schema/`, `prompt/`, `banco/`, `_schema.md`, `CLAUDE.md`, `package.json`, `package-lock.json`,
   `ambiente/`: lo stesso elenco del piano §4), perché il codice scritto dopo il tag deve esserci (R53). Lo schema dei frontmatter è `schema/frontmatter.json`; `_schema.md` ne dice solo la versione e la storia delle
   migrazioni (modello §11).
2. **Parte 1**, B01–B25, in ordine di data, con `ATLANTE_ORA` uguale alla data del messaggio (vedi parte 4). Dopo ogni
   messaggio si lancia "smista" e si controllano File, Mappa e Risposta prima del messaggio successivo; le domeniche e i
   primi del mese in mezzo girano "consolida", "lettera" e "ritratto" con la loro data, e i punti "dopo 'consolida'" si
   controllano lì.
3. **Parte 2**, D01–D25, nel Progetto (D14 e D15 in Specchio), dopo B25 e nell'ordine del banco, con il memo rimandato;
   le D con **oggi** anche sul tag `banco-zero`.
4. **Parte 3**, R01–R14: ognuna su un branch `banco/R0x` che parte da `banco-zero` più **solo** i frammenti della sua
   Preparazione. Sono indipendenti e si possono lanciare in parallelo.
5. **Parte 4**, T01–T10: ognuna sul suo branch `banco/tempo-T0x`. T06 (secondo modello) e T08 (3000 frammenti) sono le
   più costose e vanno per ultime.
6. **Dove ci si ferma:** vedi "Gravità e porte", sotto.

**La base del confronto.** "Nuovo", "nessun file cambia" e i controlli sull'hash si misurano rispetto a una **base**, un
commit del ramo di prova: per una B il commit prima del caso; per una D o una R senza frammento proprio, il commit da cui
parte la sessione (per una R la punta di `banco/R0x` con la sua Preparazione; per R14 il commit dopo B02; per una D
**oggi** il tag `banco-zero`). Ogni prova eseguibile la dichiara (nel codice delle prove a freddo, il campo `base` della
prova JSON).

### Dati sintetici da generare

| per | che cosa | quanti | come |
|---|---|---|---|
| R01–R14 | i frammenti della Preparazione segnati "sintetico"; la variante B di R05 | 2–35 per prova | a mano, testo dato nella prova; R05 B con il generatore |
| T01–T03 | raffica, correzione, ritorno dopo il silenzio | 3–6 messaggi | testo dato nella prova |
| T04 | conversazione di 40 turni | 1 copione | testo dato nella prova, 8 frasi sue marcate |
| T05, T10 | posizioni a 3 mesi, silenzio di 2 mesi | come da prova | generatore, seme fisso |
| T07 | sei mesi d'uso con l'eco di Claude piantata al 5% | 180 frammenti | generatore, seme fisso |
| T08 | un anno con l'"ago" del 12 novembre 2026 | 3000 frammenti | generatore, seme fisso |

Il generatore (`banco/genera.mjs`, da scrivere) prende `--seme`, `--da`, `--a`, `--quanti`; distribuisce le date come
l'uso reale (raffiche serali, silenzi; vedi [critica del tempo §0](/progetto/v2/critica-tempo.md)); prende le parole
dal corpus di [esempi in ingresso](/progetto/v2/esempi-ingresso.md). I frammenti sintetici non portano campi in più (lo
schema del §3.7 li rifiuterebbe, R25): il loro elenco di id sta in `banco/sintetici.txt` sul branch di prova. I dati
sintetici non entrano mai nell'archivio vero.

### Il giudice AI

- È un modello **diverso** da quello che ha scritto l'uscita, o almeno una sessione nuova che vede solo la prova, i
  frammenti della Preparazione e l'uscita, e non la conversazione che l'ha prodotta.
- Risponde a ogni domanda con **sì/no** più una riga di motivo che cita l'uscita. Ogni prova si giudica tre volte e
  vale la maggioranza. Un "non so" conta come esito contrario a quello richiesto.
- I criteri deterministici si controllano **prima** e senza giudice (ricerca esatta, campi del frontmatter, conteggi,
  `git log`, hash, token); se uno fallisce, il giudice non serve.

### Come si registra l'esito

Un file per giro, `banco/esiti/AAAAMMGG-<cosa-si-collauda>.md` sul branch di prova, con in testa il modello lettore,
quello giudice, la versione dello schema (`schema: 3`) e il commit di partenza; poi una riga per prova:

| prova | esito | criteri falliti | gravità | nota |
|---|---|---|---|---|
| B01 | passa | — | — | |
| R03 | fallisce | D2 ("specchio" già nella lettera del 22/11) | media | |
| R07 | in attesa del giudice | — | — | deterministici passati |
| T08 | lacuna | — | — | il modello non dice dove sta il tetto |

Esiti possibili: **passa**, **fallisce** (un solo criterio violato, deterministico o del giudice sotto soglia),
**in attesa del giudice** (i deterministici passano, il giudice non ha ancora risposto: R32), **lacuna** (il modello non
dice che cosa fare: è un difetto del modello, non dell'implementazione). In fondo, i conti per parte e per gravità e una
riga di sintesi per il [coordinamento](/progetto/v2/coordinamento.md).

> [!NOTE]
> **Proposta di Claude, da validare.**
>
> **Quando il banco passa.** Nessun fallimento di gravità alta, al massimo 3 di gravità media in tutto, nessuna lacuna
> aperta nelle parti 3 e 4. **La restituzione resta** se passano almeno 10 prove R su 14, comprese R01, R06, R07 e R14;
> sotto le 7 ha ragione [critica della semplicità](/progetto/v2/critica-semplicita.md) e si tiene solo la risposta.

### Gravità e porte

Per R e T la gravità è scritta nella prova; per B e D è nella tabella sotto. Le regole sono meccaniche (R70):
- **La gravità è del caso.** Qualunque fallimento del caso (un punto di File o di Mappa mancante, un criterio di Risposta
  o di Forma, un Non deve accaduto, un controllo G1–G7) vale con la gravità della tabella, non solo quando accade il fatto
  che la colonna "perché" nomina: quella colonna dice soltanto perché il caso pesa.
- **Le porte del piano.** La porta di un blocco si chiude su **ogni** fallimento di una B o di una D che il piano elenca
  per quel blocco, qualunque sia la sua gravità (per la porta del blocco 5 le dieci del piano: B01, B02, B06, D02 per prime,
  come il modello §7.5, poi B03, B11, B12, B14, B22, B25).
  Nessun giudizio su "quanto è grave": un caso elencato che fallisce chiude la porta. Una D che una porta chiede prima che
  il Progetto esista (D02 alla porta del blocco 5) si fa in **Specchio**, alla data che il piano dice, con gli stessi
  criteri: il frammento di chat e la restituzione della sessione non contano come "Scrive".
- **Fuori dalle porte.** Un fallimento di gravità alta nelle parti 1 o 2 ferma le parti 3 e 4, che si appoggiano sui file
  che quelle scrivono; i fallimenti medi e bassi si registrano, si contano e non fermano.

| caso | gravità | perché (≤ 10 parole) |
|---|---|---|
| B01 | alta | titolo dello spettacolo dato per certo: fatto inventato |
| B02 | media | ritorno su B01 senza toccarlo né creare temi |
| B03 | alta | frammento corretto o esito all'ingresso: perde la parola |
| B04 | alta | titolo della traccia a memoria: fatto inventato |
| B05 | alta | attribuzione corretta da solo, senza il tuo sì |
| B06 | alta | "marco" scambiato per Marco Aurelio: risposta sbagliata |
| B07 | alta | *La peste* come autore o riferimento: fatto inventato |
| B08 | media | parole di Marco da non trattare come citazione |
| B09 | alta | Frankl come autore: attribuzione sbagliata |
| B10 | media | Sisifo non nato, o metafora letta come stato |
| B11 | alta | rispondere senza salvare: si perde la parola |
| B12 | alta | lutto esposto o temi proposti: risposta sbagliata |
| B13 | alta | titolo o perché inventati su link muto |
| B14 | alta | `t=` buttato normalizzando: si perde il momento |
| B15 | media | tre citazioni per tre lingue, "c'è già" falso |
| B16 | media | convergenza ridotta a parla-di o marcata ◌ |
| B17 | media | sogno interpretato invece che solo salvato |
| B18 | bassa | messaggio vuoto: solo forma della risposta |
| B19 | media | tre cose in un frammento, tema padre a caldo |
| B20 | alta | U3 o nucleo riscritti: si perde la posizione |
| B21 | alta | libro indovinato dallo stile: fatto inventato |
| B22 | alta | correzione sul frammento sbagliato o frase inventata |
| B23 | media | fonti del mondo spacciate per tue |
| B24 | alta | campi fuori schema (ID esterni) all'ingresso |
| B25 | alta | Cioran non trovato o allarmismo: risposta sbagliata |
| D01 | media | conteggi per voce, niente diagnosi |
| D02 | alta | frasi non alla lettera o seme come tuo |
| D03 | media | una cosa sola, prima le tue parole |
| D04 | alta | aiuto passato inventato |
| D05 | media | effetto sulla risposta di D03, non accoglienza |
| D06 | alta | frase sull'amore inventata |
| D07 | alta | zen certo o Nietzsche a Frankl: fatto sbagliato |
| D08 | alta | motivo del Buddha inventato |
| D09 | media | tensioni da s04, segni corretti per lato |
| D10 | media | niente curva narrata, numeri da mappa.md |
| D11 | media | conti di marzo giusti, niente numeri di R15 |
| D12 | media | un solo cambio, niente Sisifo inventato |
| D13 | media | nessuna domanda, niente Karamazov già finiti |
| D14 | alta | canone chiamato tuo o citazioni non verificate |
| D15 | media | verifica senza nodo né accoglienza |
| D16 | alta | brani non verificati: risposta sbagliata |
| D17 | media | salvare solo la voce 3, `come: accoglie` |
| D18 | media | rifiuto negli Scarti, restituzione intatta |
| D19 | media | Marco l'amico usato come ponte |
| D20 | media | idee messe nella raccolta come tue |
| D21 | media | vicinato di Sisifo dal nodo nato in B10 |
| D22 | media | niente temi sulle persone della vita |
| D23 | media | conti con gli importati fuori, nessuna domanda |
| D24 | alta | "solo a marzo" falso: risposta sbagliata |
| D25 | alta | contraddice senza `passo` colpisce tutto il nucleo |

### Copertura

| caso | id |
|---|---|
| falsa attribuzione, autore scambiato | B03, B05, B06, B07, B09, D15 |
| persona della vita | B06, B08, B12, B19, D22 |
| correzione | B22, B05, D15 |
| sequenza padre | B05, B17, B19, D24 |
| link nudo | B13, B14, B15 |
| stato d'animo | B10, B18, D03 |
| sogno | B17 |
| delicato | B12, B25, D03 |
| intimo | B12, B17, B19 |
| foto | B21 |
| momento | B02, B04, B14 |
| domanda + salva | B11, D13, D25 |
| rifiuto | D18, D08 |
| accoglienza | D17, D05, B05 (se dici sì) |
| tatuaggio | B07, B23, D20, D21 |
| tempo, posizioni | B20, D10, D11, D12, D25 |
| lente sul mondo | D07, D13, D14, D16 |
| ritratto | D01, D24 |
| ciò che manca | D23, D22 |
| ritratto, lettera, sogno | R01, R02, R03, R05, R10, R14 |
| ricordo, convergenza | R04, R07, R08, R13 |
| confronto, rifiuto di una restituzione | R06, R11 |
| periodo doloroso | R02, R12, T02 |
| raffica, silenzio, arretrato | T01, T02, T09, T10 |
| correzione, contraddizione nel tempo | T03, T05, B22, B20 |
| chat che diventa frammento | T04 |
| cambio di modello, colonizzazione, scala | T06, T07, T08 |

## Collegamenti

- [Il modello v3](/progetto/v2/modello-v3.md) · [Prova a freddo](/progetto/v2/prova-a-freddo.md) · [Esempi in ingresso](/progetto/v2/esempi-ingresso.md) · [Esempi di domande](/progetto/v2/esempi-domande.md)
- Storia: [il modello v2](/progetto/v2/modello.md) · [Banco v2, la versione precedente](/progetto/v2/banco-di-prova.md)
- [Restituzione](/progetto/v2/restituzione.md) · [Critica del tempo](/progetto/v2/critica-tempo.md) · [Attriti dell'importazione](/progetto/v2/simulazione/attriti-importazione.md) · [Attriti dell'ingresso](/progetto/v2/simulazione/attriti-ingresso.md)
