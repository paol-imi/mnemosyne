# Banco di prova definitivo (v3)

> Progettazione v3, 2026-10-31. Proposta di Claude, da validare. Serve a simulare il modello v3 a mano e poi a
> collaudarne l'implementazione su un altro account: ogni criterio si verifica guardando i file scritti, l'indice o la risposta.
> Parti: 1 messaggi, 2 domande, 3 restituzione, 4 tempo e uso, 5 come si esegue.
> Usa il vocabolario di [il modello](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/modello.md); messaggi e attese vengono da
> [esempi in ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-ingresso.md) e [esempi di domande](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-domande.md).
> Corregge i casi B e D con gli attriti della [simulazione d'importazione](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/simulazione/attriti-importazione.md).
> Versione precedente: [banco di prova v2](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/banco-di-prova.md).

## Come si usa

- Si parte dall'**archivio importato** (punto zero, 4–7 ottobre 2026), tutto `canale: importato`:
  - tre frammenti-sguardo `voce: seme` (✧), con `intento: sguardo`: `s01` il nucleo, `s03` il racconto d'origine,
    `s04` le tensioni, virtù e fortuna, l'evoluzione (che nel nucleo non stanno). **Nessun `s02`**: il brief dei tatuaggi
    è una vista dei frammenti con `serve-a: tatuaggi`. Le copie di frasi sue dentro gli sguardi non generano legami.
  - le frasi tue dell'Atlante, `voce: sua`; quelle messe per iscritto da Claude nel seme anche `forma: riportata`
    (✦ con il segno di riporto, l'etichetta di Claude nel `contesto`).
  - le convergenze e le idee di tatuaggio come restituzioni `importata: true` (◌ o ✧); le loro voci `mondo:` sono
    indicizzate **per nome** (Eraclito, Sisifo si trovano anche senza un nodo).
  - i nodi: quelli che nominano le tue frasi, `raccolte/tatuaggi.md`, le 8 domande accolte come temi, e quelli nominati dallo
    **sguardo** (`s01`, `s04`: per esempio `nichilismo`, `divina-commedia`); il racconto `s03` non fa nascere nodi.
    Gli slug sono quelli dell'Atlante (`camus`, `marco-aurelio`). **Non** ci sono `nietzsche`, `sisifo`, `eraclito`:
    un nodo del mondo nasce al primo frammento tuo che lo nomina. Un nodo "esiste" solo se è in questi file.
  - ora ignota: gli importati hanno `registrato` con la sola data (il limite in `vissuto`) e nessuna vista oraria li conta.
    Stanno in `contesto/punto-zero.md`, non in `contesto/recenti.md`.
- I 25 messaggi della parte 1 arrivano **in ordine di data** dal Comando rapido: sul telefono "Salvato", il grezzo in
  `ingresso/`; la Routine "smista" lo sposta in `frammenti/`, scrive la lettura e la risposta come restituzione
  `forma: risposta`, rigenera `contesto/`. **Risposta** qui è il testo di quella restituzione, in `contesto/recenti.md`.
- Le domande della parte 2 si fanno nella chat del Progetto (che legge solo `contesto/`), dopo B25, nell'ordine del banco;
  E60 ed E70 tengono la loro data (10 e 18 aprile 2027). Ogni domanda e ogni risposta diventano frammento e restituzione
  (non lo si ripete caso per caso). Dove c'è scritto **oggi**, la stessa domanda si fa sul solo punto zero (31 ottobre 2026).
- Ogni caso **passa** o **fallisce**: fallisce se anche **un solo** "Non deve" accade, o se manca un punto di **File**.
  Valgono sempre due divieti: nessun ID esterno (`wikidata`, `musicbrainz`, `registrazione`, `openlibrary`, `titolo-vero`)
  scritto all'ingresso; nessun `esito` su una citazione all'ingresso, salvo gli apocrifi noti (passo 1): le altre restano
  `prova: memoria` fino al consolidamento, e la risposta le segna ⚠.
- Per B e D, **File**, **Indice** e **Risposta** (o **Dati**, **Forma**, **Scrive**) sono criteri deterministici, e lo è anche
  **Non deve**: si controllano sui file, senza giudizio. Il giudizio a pancia sulle risposte D si dà con le domande del
  giudice della parte 3, che valgono per tutti i casi.
- Gli slug sono indicativi: conta il genere del nodo. *Lacuna* segna un punto in cui il modello non sa rispondere.
- **Corretto (v2):** il punto zero ha `s01`, `s03`, `s04` e nessun `s02`; lo sguardo fa nascere nodi, il racconto no;
  niente Nietzsche né Sisifo ereditati; frasi riportate, ora ignota e `punto-zero.md` (A2, A3, A4, A15, A16, A27).

## 1. Venticinque messaggi in ingresso

**B01 · E01** · 2026-11-03 23:40 · video, citazione dentro una citazione
> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

- **File:** `frammenti/2026/11/20261103-2340.md` col testo identico ("nn" compreso), `canale: telefono`. Lettura v1:
  `intento: [salva]`, reazione "molto interessante" (giudizio +); `nomina` umberto-galimberti ✦, spettacolo-sulle-emozioni ✦
  (titolo proposto *Il mondo delle emozioni* solo nel `perche`, ⚠), nichilismo-ospite-inquietante ✦; `parla-di` nichilismo ✦;
  `parole: [ragazzi, cultura]`. Nascono la persona Galimberti (`cerchia: mondo`), l'opera spettacolo, la citazione
  (`autore` Nietzsche in chiaro, `attribuita-a` Galimberti, `prova: memoria`, nessun `esito`). `nichilismo` c'è già (nato dallo sguardo).
- **Indice:** Galimberti con vitalità 1; nessuna vicenda. Il `wikidata` arriva solo dal consolidamento.
- **Risposta:** "Salvato." + l'ospite è di Nietzsche ○, libro di Galimberti (2007) ○ + **una** domanda: "*Il mondo delle emozioni*?" ⚠.
- **Non deve:** creare il nodo del libro del 2007; dare il titolo come certo; creare i temi giovani o cultura; chiedere
  "quanto ti ha colpito"; citare la polemica del 2008; creare il nodo Nietzsche (non l'hai nominato).
- **Corretto (v2):** Nietzsche non è un nodo al punto zero e qui non nasce: `autore` in chiaro; `nichilismo` esiste perché lo nomina lo sguardo (A16).

**B02 · E02** · 2026-11-04 08:12 · follow-up
> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

- **File:** frammento nuovo `20261104-0812`. Lettura: `ritorna-su: 20261103-2340` con `come: aggiunge` ✦; `nomina`
  nichilismo-ospite-inquietante con `momento: "verso la fine"` ✦; `parole: [greci]`. `atti: []`.
- **Indice:** la vista dello spezzone mostra B01 e B02 insieme.
- **Risposta:** "Aggiunto allo spezzone di ieri." Niente di più.
- **Non deve:** toccare il frammento del 3 novembre; chiedere quale frase; creare il tema "greci" o "filosofia antica".

**B03 · E03** · 2026-11-09 19:02 · citazione parafrasata
> jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato

- **File:** lettura con reazione "mi ha spaccato" (impatto +), `nomina` della citazione ✦; Jung è uno slug se il nodo c'è,
  altrimenti nasce (l'hai nominato). Nodo citazione con `autore` Jung, `prova: memoria`, nessun esito. Dopo il consolidamento:
  `esito: simile`, `prova: primaria`, `riferimento` *Aion* §126, `originale` e `traduzione`. `parole: [inconscio, destino]`.
- **Indice:** il legame pesa 2 (reazione d'impatto).
- **Risposta:** "Salvata. Così non sembra letterale ⚠: è vicina ad *Aion* §126. Ti metto accanto il passo vero quando l'ho controllato."
- **Non deve:** correggere il frammento; mettere la forma che circola in `originale`; scrivere un esito all'ingresso.

**B04 · E22** · 2026-11-11 19:45 · album, "la 3"
> ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto

- **File:** `nomina: private-music` ✦ (opera, `autore` Deftones, `anno: 2025`) con `momento: "traccia 3"`; reazione
  "mi ha distrutto" (impatto +). Il nodo della traccia nasce **solo** dopo la tua conferma, con `in: private-music`.
- **Indice:** il `musicbrainz` dell'album arriva nel consolidamento.
- **Risposta:** una sola domanda: "La 3 è *[titolo dalla tracklist]*, giusto?" Se la tracklist non si può controllare, lo dice.
  (Dalla [simulazione dell'ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/simulazione/attriti-ingresso.md): la traccia 3 è *ecdysis*, da verificare
  sulla tracklist; il [modello v3](./02-modello-v3.md) §7.2 la cerca all'ingresso, con una ricerca leggera e senza ID.)
- **Non deve:** dare il titolo a memoria; legare "mi ha distrutto" a una traccia non confermata; fare due domande.
  *Lacuna:* la domanda vuole la tracklist **all'ingresso**, ma MusicBrainz è vietato all'ingresso: il modello non dice
  con quale fonte si risolve "la 3". E "in macchina, tutto di fila" (contesto, luogo) non ha un campo.

**B05 · E53** · 2026-11-16 23:00 · reel, attribuzione sbagliata (S1)
> galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto

- **File:** `nomina: umberto-galimberti` ✦ (lo stesso nodo di B01); nasce Telemaco (`cerchia: finzione`, `in` *Odissea*,
  opera se c'è, altrimenti nome in chiaro); un legame ○ "l'idea è di Massimo Recalcati, *Il complesso di Telemaco*,
  Feltrinelli 2013"; reazione "mi ha colpito tanto" (impatto +); `parole: [padre, mare]`.
- **Indice:** "padre" e "mare" alla prima occorrenza.
- **Risposta:** "È più probabile Recalcati ○: *Il complesso di Telemaco* (2013) è suo. Correggo?" Se rispondi sì: atto `corregge`.
- **Non deve:** correggere da solo; creare il nodo Recalcati prima del tuo sì; parlare di "padre" come tema.
  *Lacuna:* un'idea attribuita (non una frase) non ha casa: `citazioni/` vuole un `originale`. *Incoerenza:* il §6.4 dice
  che "padre" compare la prima volta a E50, ma qui lo scrivi tu ("il padre").

**B06 · E08** · 2026-11-20 12:44 · apocrifo noto, persona della vita
> marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina

- **File:** nasce `persone/marco.md` (`cerchia: vita`, nessun ID esterno, nessun alias pubblico); `tramite: marco` ✦;
  `nomina` di una citazione con `attribuita-a` Camus, **nessun** `autore`, `esito: apocrifa`, `prova: secondaria`
  (passo 1: Quote Investigator); reazione "carina ma un po' da bacio perugina" (giudizio −).
- **Indice:** la citazione non conta tra "le citazioni di Camus" (autore vuoto).
- **Risposta:** "Salvata con la tua reazione. Non risulta di Camus ○, autore ignoto."
- **Non deve:** risolvere "marco" su Marco Aurelio; segnare la reazione come +; proporre temi su Marco.

**B07 · E09** · 2026-11-22 17:20 · citazione con l'opera sbagliata, tatuaggio
> camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei

- **File:** `nomina` della citazione ✦ con `autore` Camus, `prova: memoria`; `serve-a: tatuaggi` ✦ (la raccolta ereditata);
  reazione "me la tatuerei" (identificazione +). Dopo il consolidamento: `esito: verificata`, `riferimento` *L'Estate*
  (*Ritorno a Tipasa*, 1954), `originale` francese.
- **Indice:** la raccolta tatuaggi ha 1 frammento tuo.
- **Risposta:** "Bella, ed è sua, ma non è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠."
- **Non deve:** scrivere *La peste* nel nodo; crearne il nodo; fare del tatuaggio un tipo di nota. *Lacuna:* `attribuita-a`
  prende persone: l'opera sbagliata resta solo nel frammento, e non c'è un `esito` per "autore giusto, opera sbagliata".

**B08 · E45** · 2026-11-24 23:50 · persona della vita, parole d'altri
> marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso

- **File:** `nomina: marco` ✦ (lo stesso nodo di B06); `parla-di: battaglie-interiori` ◌ (le parole sono di Marco, il concetto
  è tuo dal seme); reazioni "non l'ho presa bene" (impatto −) e "ci ha preso" (giudizio +).
- **Indice:** Marco: 2 frammenti.
- **Risposta:** "Salvato. 'Battaglie interiori' è una tua parola dal 4 ottobre ✦ (riportata dal seme)."
- **Non deve:** fare delle parole di Marco una citazione da verificare; agganciare Marco Aurelio; interpretare la frase.
- **Corretto (v2):** "battaglie interiori" viene da U1, `voce: sua` (con `forma: riportata` dove l'ha scritta Claude): ✦ con il riporto, non ✧ (A2).

**B09 · E10** · 2026-11-26 09:05 · autore scambiato, libro in lettura
> frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente

- **File:** Frankl e *Uno psicologo nei lager* (nodi, se non ereditati); `nomina` del libro con `fruizione: in-corso` ✦;
  `tramite` Frankl ✦; `nomina` della citazione, `attribuita-a` Frankl, `prova: memoria`. Dopo il consolidamento: `autore`
  Nietzsche (in chiaro: il nodo non c'è), `esito: attribuzione-errata`, `riferimento` *Crepuscolo degli idoli*, "Sentenze e frecce" §12.
- **Indice:** il libro compare in "in corso".
- **Risposta:** "La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*), Frankl la cita. Segno il libro in lettura."
- **Non deve:** mettere Frankl come `autore`; perdere Frankl (il `tramite` è la tua storia).
- **Corretto (v2):** Nietzsche non è un nodo ereditato: l'`autore` corretto resta in chiaro (A16).

**B10 · E67** · 2026-11-30 19:00 · stato d'animo vago, metafora
> oggi mi sento come sisifo

- **File:** `parla-di: sisifo` con `come: metafora` ✦; il nodo `sisifo` (opera, §2.5) **nasce qui**, primo frammento tuo che
  lo nomina, e le importate che lo nominano per nome (C4, C16, *La discesa di Sisifo*) vi si ricollegano; nessun `sente`,
  nessun `nomina` del saggio di Camus.
- **Indice:** entra nella linea del tempo come umore, non come posizione.
- **Risposta:** "Salvato." Nessuna domanda: E66 (Sisifo felice) non è nel banco, e il "Il masso o la discesa?" non ha appiglio.
- **Non deve:** scrivere `contraddice`; inventare un'emozione; citare Camus. *Lacuna:* per il §2.5 il mito è un'**opera**,
  ma `parla-di` punta solo a un tema: se Sisifo è un'opera, la metafora non ha predicato.
- **Corretto (v2):** `sisifo` non esiste al punto zero (sta solo nelle voci `mondo:`): nasce qui (A1, A16, A17).

**B11 · E12** · 2026-12-05 18:40 · domanda dentro un memo
> chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi

- **File:** `intento: [salva, chiedi]`; `nomina` della citazione ✦ (`autore` Hemingway, nome in chiaro se non è un nodo,
  `prova: memoria`; dopo: `esito: verificata`, `riferimento` *Addio alle armi*, cap. 34); `converge-con` kintsugi ✦
  con `perche: "«tipo kintsugi»"`. La restituzione ha la voce 1 = la citazione ○.
- **Indice:** il `converge-con` conta come tuo.
- **Risposta:** "Hemingway, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦."
- **Non deve:** rispondere senza salvare o salvare senza rispondere; marcare la convergenza ◌.
  *Lacuna:* il kintsugi è un concetto, quindi un tema (§2.5); ma se l'eredità non l'ha portato, all'ingresso non può nascere
  e il `converge-con` resta senza oggetto. Lo stesso per B16.

**B12 · E26** · 2026-12-07 02:10 · intimo, lutto
> la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso

- **File:** `nomina: la-cura` ✦ (opera, `autore` Battiato); nasce `persone/nonna-lina.md` (`cerchia: vita`); reazione
  "ho pianto come un cretino" (impatto +). Nessun tema, nessun legame proposto; nessun nodo per la cugina o per il matrimonio.
- **Indice:** nonna Lina esclusa dalle proposte di temi e dagli ID esterni.
- **Risposta:** una riga umana: "Salvato. Un abbraccio."
- **Non deve:** proporre amore o perdita; nominare il lutto; mettere la nonna in una lettera o in un "ti ricordi?" senza
  che tu ci torni; scrivere in un repository pubblico.

**B13 · E27** · 2026-12-09 18:00 · link nudo
> https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3

- **File:** il frammento conserva `?si=`. Lettura: link pulito, titolo e artista dall'oEmbed ○, `nomina` del brano ✦;
  nessuna reazione, nessun tema; l'artista diventa nodo solo se c'è già.
- **Indice:** frammento muto, vitalità bassa.
- **Risposta:** "Salvato *[titolo]*, [artista]. Che cosa ti ha preso?" Se l'oEmbed fallisce: "Salvato il link, non riesco a leggerlo."
- **Non deve:** inventare un perché o un titolo; ripetere la domanda nei giorni dopo. *Lacuna:* la tabella della lettura
  non ha un campo per il link pulito (il §6.5 lo nomina).

**B14 · E37** · 2026-12-10 23:00 · link con il momento
> https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello

- **File:** il frammento intatto, con `t=754`. Lettura: `nomina` del video ✦ (titolo, canale ○) con `momento: "12:34"`
  e `perche: "«dal minuto 12 in poi, ascolta solo quello»"`.
- **Indice:** —
- **Risposta:** "Salvato *[titolo]*, [canale], dal 12:34."
- **Non deve:** buttare `t=` normalizzando; chiedere "che cosa ti ha preso?" (non è muto: hai scritto "solo quello").

**B15 · E14** · 2026-12-12 20:15 · Pinterest, lingua
> https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo

- **File:** il frammento intatto; nella lettura il pin `https://www.pinterest.com/pin/1234567890123/`. Rilke (nodo, se non
  c'è nasce); **un solo** nodo citazione, `prova: memoria`; dopo: `originale` tedesco, `traduzione` con `traduttore`,
  `riferimento` *Libro d'ore* (1899), `esito: verificata`. `nomina` ✦.
- **Indice:** —
- **Risposta:** "Rilke, *Libro d'ore* (1899) ⚠."
- **Non deve:** creare tre citazioni per tre lingue; scaricare l'immagine del pin; dire "c'è già" se il nodo non esiste.

**B16 · E17** · 2027-01-09 16:30 · intuizione che collega
> eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?

- **File:** `converge-con` ✦ tra il fiume di Eraclito e la nave di Teseo, con `perche: "«sono la stessa domanda»"`;
  al massimo un `parla-di` ◌ verso il tema ereditato "Chi sono?" (✧ come nome); `intento: [salva]`.
- **Indice:** il legame tuo conta con forza piena.
- **Risposta:** "Sì, convergono ✦: l'identità nel cambiamento. Il 'due volte' è di Platone (*Cratilo* 402a) ⚠."
- **Non deve:** ridurla a `parla-di: identita`; marcare ◌ la convergenza; rispondere lei alla domanda "sono la stessa persona?".

**B17 · E48** · 2027-02-03 07:10 · sogno
> sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura

- **File:** `vissuto: stanotte`; reazione "non avevo paura" citata; `parole: [scala, mare]`; al massimo un legame ◌ verso
  un simbolo ereditato.
- **Indice:** "mare" arriva a 2 occorrenze (B05, B17): non è ancora una vicenda.
- **Risposta:** "Salvato il sogno." Accettabile: "Ti dice qualcosa?"
- **Non deve:** interpretarlo; collegarlo ad alta voce a Telemaco o al padre.

**B18 · E49** · 2027-02-09 13:00 · vuoto
> boh niente volevo solo scrivere qualcosa

- **File:** il frammento; lettura con `intento: [niente]` e nessun legame.
- **Indice:** conta nel mese; nessun tema.
- **Risposta:** "Ci sono."
- **Non deve:** proporre qualcosa; fare domande.

**B19 · E50** · 2027-03-01 22:00 · tre cose in un messaggio
> oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata

- **File:** un frammento solo. Lettura: `nomina` *I fratelli Karamazov* con `fruizione: fatta` ✦ (nasce se non è ereditato);
  `nomina: la-cura` ✦ (nodo di B12); nasce `persone/papa.md` (`cerchia: vita`) con `nomina` ✦; `parole: [padre]`.
- **Indice:** La cura: un ritorno spontaneo; "padre" alla seconda occorrenza (B05, B19), a più di 60 giorni: nessuna vicenda.
- **Risposta:** "Segnato tutto. Karamazov finito."
- **Non deve:** fare domande sul padre; spezzarlo in tre frammenti; far nascere il tema padre a caldo.
  *Lacuna:* il riascolto di *La cura* è un ritorno, ma non è nessuno dei quattro `come` di `ritorna-su`, e il modello
  non dice come la vitalità conta un `nomina` ripetuto.

**B20 · E69** · 2027-03-08 23:40 · posizione contro il nucleo
> forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove

- **File:** `parla-di: dolore` ✦; `parole: [noia]`; nel consolidamento, `contraddice` ◌ verso U3 (`20261004-0000-u03`,
  "la dimensione principale della realtà è il dolore"), che non cambia; non verso la copia nel nucleo. Schopenhauer solo nella risposta, come ○.
- **Indice:** `tempo.json` mette le due posizioni con le date (4 ottobre ✦ importata, 8 marzo ✦).
- **Risposta:** "Segnato. Il 4 ottobre ✦ scrivevi che il dolore è la dimensione principale: è un cambio, o un'altra faccia?"
- **Non deve:** riscrivere lo sguardo; dire "hai cambiato idea"; creare il nodo Schopenhauer. *Lacuna:* non è detto se un
  `contraddice` ◌ rende `superato` il nucleo o se serve un tuo atto.
- **Corretto (v2):** la frase sul dolore è U3, `voce: sua` (✦ importata, senza ora): non ✧; le copie nel nucleo non
  generano legami, quindi il `contraddice` va a U3 (A2, A3).

**B21 · E42** · 2027-03-10 18:20 · foto di una pagina
> [foto di una pagina con una riga sottolineata a matita] questa

- **File:** il frammento con `allegati` (`.webp` accanto, con lo stesso nome, ridimensionato) e testo "questa"; un nodo
  citazione senza `autore` né `attribuita-a`, `prova: memoria`, `originale` dall'OCR riletto. Se il consolidamento non la
  trova: `esito: non-trovata`.
- **Indice:** la citazione compare tra quelle da verificare.
- **Risposta:** "Letto: '[la riga]'. Da che libro?"
- **Non deve:** indovinare il libro dallo stile; trattare l'OCR come parole tue. *Lacuna:* la lettura non ha un campo per
  il testo estratto, e il nodo nasce da un "questa", non da un nome.

**B22 · E51** · 2027-03-12 16:00 · correzione
> no aspetta quella di ieri sulla casa in ordine non era jung era peterson

- **File (come nel banco):** negli ultimi 3 giorni ci sono solo B20 e B21, e nessuno parla della casa in ordine:
  lettura con `intento: [correggi]` e **nessun atto**.
- **File (con il frammento dell'11 marzo che il corpus presuppone, aggiunto prima):** `ritorna-su` con `come: corregge`;
  atto `corregge: {nodo: metti-in-ordine-la-tua-casa, campo: attribuita-a, da: carl-gustav-jung, a: jordan-peterson}`;
  la lettura di ieri passa a `versione: 2`; il frammento di ieri è identico.
- **Risposta:** come nel banco: "Non trovo la frase di ieri sulla casa in ordine: me la riscrivi?" Con il frammento:
  "Corretto: Peterson ✦. La tua riga di ieri resta com'era, con la correzione accanto."
- **Non deve:** applicare la correzione a B03 (Jung, novembre: fuori dai 3 giorni) o a B21; inventare la frase.

**B23 · E65** · 2027-03-20 22:30 · tatuaggio
> ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto

- **File:** `serve-a: tatuaggi` ✦; `parole: [crepa, luce]`; al massimo 2 proposti: `ritorna-su` ◌ verso B11 (i "punti rotti",
  il kintsugi) e un aggancio ◌ al Jung di B03.
- **Indice:** la raccolta tatuaggi ha 2 frammenti tuoi.
- **Risposta:** "Segnato tra i tatuaggi. Da te viene già Hemingway col kintsugi ✦ (5 dic); fuori, Cohen, *Anthem* ○. Te le metto in fila?"
- **Non deve:** dire "cinque fonti la reggono" come se Cohen, Rumi e Caravaggio fossero tuoi (E61, E62, E43 non sono nel banco);
  citare il verso di Cohen.

**B24 · E44** · 2027-03-22 12:00 · da leggere
> devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce

- **File:** `nomina` del *Mondo come volontà e rappresentazione* con `fruizione: da-fare` ✦ (il nodo, se non ereditato,
  nasce con `autore` Schopenhauer in chiaro); `tramite` *Evangelion* ✦; `parole: [porcospino]`.
- **Indice:** la lista da fare ha 1 libro.
- **Risposta:** "Segnato da leggere. Il porcospino è nei *Parerga* (1851) ⚠, non nel *Mondo*: forse meglio partire da lì?"
- **Non deve:** spostare il `da-fare` sui *Parerga*; creare il nodo *Parerga* senza un tuo sì; scrivere `openlibrary` o `wikidata`.

**B25 · E52** · 2027-04-02 20:00 · tema delicato, dettato vocale
> ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere

- **File:** il frammento con "chioran" intatto; Cioran risolto per ortografia fonetica (alias "chioran" aggiunto, o nodo
  nuovo con quell'alias); un nodo citazione `prova: memoria`, senza esito. Nessun legame proposto, nessun tema.
- **Indice:** —
- **Risposta:** una riga umana: "Cioran, sì: l'idea del suicidio come appiglio (*Sillogismi dell'amarezza* ⚠). Tutto bene?"
  (Corretto dopo la [simulazione dell'ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/simulazione/attriti-ingresso.md): la frase non risulta
  nell'*Inconveniente di essere nati*; Wikiquote la dà nei *Sillogismi dell'amarezza*, 1952.)
- **Non deve:** fare allarmismo o diagnosi; far finta di niente; non trovare Cioran per colpa della grafia.
  *Lacuna:* non è detto se un frammento delicato resta fuori dalla lettera, dal "ti ricordi?" e dal sogno della settimana.

## 2. Venticinque domande

> **Correzione dopo il [modello v3](./02-modello-v3.md) §7.3.** La chat del Progetto non scrive nel repository.
> Ogni domanda di questo banco "nella chat del Progetto" si intende così: la chat risponde e chiude con il **memo YAML**
> (turni, voci numerate, `perche`, `risponde-a`), che si rimanda con il Comando rapido "Memo"; i punti **Scrive** si
> controllano sui file che `smista.mjs` ricava da quel memo. Una conversazione dà **un** frammento `canale: chat` e **una**
> restituzione, con una sezione per domanda e le voci numerate per domanda.

Tutte nella chat del Progetto, che vede solo `contesto/` (`ritratto.md`, `indice.md` con una riga per frammento, `recenti.md`
con gli ultimi 30 per intero, `punto-zero.md` con gli importati). *Lacuna generale:* dopo B25 i frammenti nuovi sono già 25, e con
le domande si supera 30 prima di E70; le domande che vogliono le tue parole verbatim di mesi fa (D02, D06, D11, D25) non le
trovano in `contesto/` e richiedono il tab Code. Il modello non dice chi lo decide. Gli importati restano in `punto-zero.md`.
- **Corretto (v2):** le 35 importate non entrano in `recenti.md` (30 voci) ma in `contesto/punto-zero.md` (A27).

### Su di me

**D01 · n.74**
> cosa dice di me quello che salvo?

- **Dati:** conteggi per voce (solo ✦; ✧ a parte), reazioni, ore, raccolte. **Oggi:** quasi tutto è dell'Atlante, cioè mio.
  **Dopo i 25:** 5 citazioni su ~9 d'autore non sono come le ricordi (B03, B05, B06, B07, B09); 8 frammenti su 25 dopo le 22;
  tre persone della tua vita (Marco, nonna Lina, papà).
- **Forma:** ≤ 6 righe, 2-3 osservazioni con prove datate ✦; le letture ◌. Una domanda finale solo se nasce da una differenza
  vera. Oggi: "Ancora quasi niente di tuo", e lo dice.
- **Scrive:** solo la restituzione.
- **Non deve:** contare le note dell'Atlante; fare diagnosi; usare B12 o B25 come prova di un tratto.

**D02 · n.75**
> le mie frasi, solo le mie

- **Dati:** frammenti ✦ (telefono, chat) e importati `voce: sua` (quelli con `forma: riportata` col segno di riporto);
  il seme ✧ (`s01`, `s03`, `s04`) separato. **Oggi:** le frasi tue importate, gli sguardi a parte.
- **Forma:** le frasi verbatim con la data, refusi compresi; i messaggi senza parole (B13, B21) esclusi o segnati come muti;
  oltre le 8 righe, "vuoi il resto?". Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** mettere testi canonici (il passo vero di Jung non è tuo), sintesi o letture; contare il seme come tuo.
  *Lacuna:* il §4.3 dice che "solo le mie" usa ✦ ✧ ●, ma la tabella dei frammenti dice che il seme non è tuo (e cita R2
  dove intende R19): qui ✧ va in una riga a parte.
- **Corretto (v2):** le frasi messe per iscritto da Claude nel seme sono `voce: sua` + `forma: riportata`, ✦ col riporto;
  gli sguardi sono tre, senza `s02`; gli importati hanno la sola data (A2, A3, A4, A15).

### Catena C: lo stato d'animo (n.48 → 50 → 51)

**D03 · n.48**
> dammi qualcosa per stasera, mi sento svuotato

- **Dati:** il frammento stesso (`sente` verso il tema ereditato del vuoto ✦, "svuotato" nel `perche`); le tue frasi di
  conforto (U1 ✦, 4 ottobre: "calma… dall'immensità del dolore superato"; la copia nel nucleo non conta); scarti; ritorni con effetto (nessuno).
- **Forma:** una cosa sola, ≤ 3 righe: prima le tue parole, poi al massimo una ○ verificata. Nessuna domanda.
- **Scrive:** restituzione con le voci numerate (1 = la tua frase, 2 = la ○).
- **Non deve:** fare una lista; portare materiale che descrive il vuoto (Cioran, B25); fare diagnosi.
  *Lacuna:* non c'è una tabella dalle parole del momento ("svuotato") alle emozioni, e senza `polarita` il modello non dice
  come si sceglie il conforto.
- **Corretto (v2):** la frase di conforto è U1, `voce: sua`, non il nucleo ✧ (A2, A3).

**D04 · n.50**
> l'ultima volta cosa mi aveva aiutato?

- **Dati:** `ritorna-su` con `come: effetto`. Dopo i 25: nessuno.
- **Forma:** 1-2 righe oneste: "Non ho ancora niente segnato come 'mi ha aiutato'." Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** inventare (il promontorio del 12 gennaio di R9 non esiste qui); spacciare la proposta di D03 per un aiuto passato.

**D05 · n.51**
> ok grazie, mi ha fatto bene

- **Dati:** le ultime restituzioni (D04 vuota, D03 con contenuto).
- **Forma:** una riga: "Segnato: stasera ti ha fatto bene."
- **Scrive:** frammento con `in-risposta-a` e `ritorna-su` la restituzione di D03, `come: effetto` ✦, `perche: "«mi ha fatto bene»"`.
  Al prossimo n.50 questa riga si trova.
- **Non deve:** chiedere che cosa; inventare "è la terza volta". *Lacuna:* `ritorna-su` non ha il qualificatore `n`
  (quale delle due voci ha fatto bene?); non è detto se "mi ha fatto bene" valga come `accoglie`; e `in-risposta-a`
  punterebbe all'ultima restituzione (D04), mentre l'effetto è su D03.

### Ricordi, convergenze, contraddizioni

**D06 · n.28**
> cosa diceva galimberti in quello spettacolo sull'amore?

- **Dati:** i frammenti che nominano Galimberti (B01, B02 per `ritorna-su`, B05) e il nodo spettacolo-sulle-emozioni.
- **Forma:** corregge piano: "Sulle emozioni, non sull'amore": B01 verbatim (3 nov) ✦, l'aggiunta di B02 ✦, la frase ○
  (Nietzsche, ⚠ o con l'esito del consolidamento), il titolo ⚠. "Non ci sei più tornato." Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** inventare una frase sull'amore (o *Le cose dell'amore* di R21); fondere il reel di B05 nello spettacolo.

**D07 · n.89**
> chi altro ha detto "ciò che ostacola diventa la via", in un'altra tradizione?

- **Dati:** frammenti ✦ (B11 Hemingway e kintsugi, B23 la crepa, B09 Frankl; B16 nomina Eraclito); le voci importate
  trovate **per nome**: Marco Aurelio V,20 ed Eraclito fr. 60 come voci ◌ di `r-20261007-0000-ritratto-citazioni`
  (non come convergenza), C17 e C18 ◌; il mondo ○.
- **Forma:** ≤ 5 voci numerate: prima ✦ con le date, poi ✧/◌, poi ○ (Marco Aurelio V,20; Eraclito fr. 60; Hölderlin,
  *Patmos*; Holiday 2014; la massima "zen" ⚠). Ultima riga: la **direzione**, dove convergono e dove no. Al massimo "ne salvo una?".
- **Scrive:** restituzione con legami `converge-con` ◌ e il loro `perche`.
- **Non deve:** dare lo zen come fonte certa; marcare ✦ ciò che c'è solo nell'Atlante; attribuire a Frankl la frase di Nietzsche;
  presentare V,20 e fr. 60 come una convergenza ereditata.
- **Corretto (v2):** non c'è una convergenza ereditata su V,20 e Eraclito non è un nodo al punto zero: le due fonti stanno
  in una lista di citazioni, e si trovano solo con le voci indicizzate per nome (A1, A16).

**D08 · n.58** (dopo n.56 "cosa ho sulla rabbia" e n.57 "questa di buddha non mi rappresenta")
> perché me l'avevi messa?

- **Dati:** la voce "Buddha" della restituzione di n.56, con il suo `perche` e la sua origine; l'atto `rifiuta` di n.57.
- **Forma:** 2-3 righe: chi (io ◌), quando, perché; se il `perche` manca: "Non l'ho scritto, non lo so". Nessuna domanda.
- **Scrive:** nessun atto (n.58 chiede, non accoglie).
- **Non deve:** contare la domanda come accoglienza; riproporre il Buddha per la rabbia; inventare il motivo.
  *Lacuna:* il legame Buddha → rabbia nasce in una fonte dell'Atlante; se l'eredità non lo porta, n.56 non lo trova, e il
  modello non dice come spiegare un legame di cui il nuovo archivio non ha la nascita.

**D09 · n.93**
> dove le mie fonti si contraddicono?

- **Dati:** i `contraddice` (B20 ◌), le citazioni con `autore` ed `esito`, la linea delle posizioni; le tre tensioni dello
  sguardo `s04` ✧ (condottiero e dissoluzione dell'io, assurdo ed esoterico, Dante cristiano e sguardo assurdista), C2 ◌.
- **Forma:** 1-3 tensioni, ogni lato col suo segno: U3 ✦ (4 ott) "il dolore è la dimensione principale" contro la noia ✦ (8 mar);
  le tensioni di `s04` ✧ come tue di ottobre, scritte nel seme.
  Una domanda finale facoltativa.
- **Scrive:** restituzione; legami `contraddice` ◌ solo se nuovi.
- **Non deve:** dire "Camus ti piace e non ti piace" (B06 contro B07): la frase di B06 è apocrifa ○; inventare contraddizioni
  tra autori che non hai salvato.
- **Corretto (v2):** le tre tensioni non stanno nel nucleo: vengono da `s04`, da cui nasce anche `divina-commedia`; la frase
  sul dolore è U3, tua (✦), non ✧ (A2, A15).

### Il tempo

**D10 · n.73**
> come è cambiato il mio modo di vedere il dolore?

- **Dati:** frammenti con `parla-di` o `sente` dolore, importati e vivi; la linea delle posizioni.
- **Forma:** **Oggi:** "Non lo so ancora", con la sola frase ✦ del 4 ottobre (U3, importata; modello §7.1). **Dopo:** "4 ottobre ✦: 'la dimensione
  principale…'. 8 marzo ✦: 'forse è la noia, il dolore almeno ti muove'. In mezzo, nessuna tua frase sul dolore." I numeri vengono dall'indice.
- **Scrive:** solo la restituzione.
- **Non deve:** usare il git log; narrare una curva; dire "eri in una fase"; ripetere la domanda di B20 se non hai risposto;
  copiare i "9 frammenti" della simulazione del §7.1.
- **Corretto (v2):** U3 entra `voce: sua` (✦ importato, sola data), non ✧ (A2, A4).

**D11 · n.66**
> cosa pensavo a marzo?

- **Dati:** frammenti ✦ di marzo, fuori le importate. **Oggi:** "A marzo non c'era ancora niente: l'archivio comincia il 4 ottobre."
  **Dopo:** B19 (1), B20 (8), B21 (10), B22 (12), B23 (20), B24 (22): 6 frammenti, 3 dopo le 22.
- **Forma:** le 2-3 frasi più forti verbatim con la data (B20, B23, B19), poi i conti ✦. Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** usare i numeri di R15 ("14 frammenti", "padre (3)"); nominare temi che l'indice non ha; contare le domande come pensieri.

**D12 · n.77**
> sto cambiando idea su qualcosa?

- **Dati:** `tempo.json`, i `contraddice`, i `ritorna-su` con `come: ripensa`.
- **Forma:** 2-3 righe: "Una cosa sì: il dolore ✦ (4 ott) → la noia ✦ (8 mar). Altro non lo vedo." Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** inventare Sisifo felice → triste (E66 non c'è); contare i miei cambi nell'Atlante come tuoi.
- **Corretto (v2):** la posizione di ottobre è U3, tua (✦), non ✧ (A2).

### Il mondo e le citazioni

**D13 · n.95**
> ho appena finito delitto e castigo, che leggo

- **Dati:** la cattura nascosta; Karamazov `fatta` (B19 ✦), il *Mondo* `da-fare` (B24 ✦), gli scarti, il gusto (U11–U14 ✦ riportati).
- **Forma:** ≤ 3 voci: prima la tua lista ✦ ("in lista hai già il *Mondo*, 22 mar"), poi ○ verificati (*Memorie del sottosuolo*,
  1864; Camus, *La caduta*, 1956). Una domanda sola: "com'è stato?" **oppure** "quale metto in lista?".
- **Scrive:** frammento con `nomina` *Delitto e castigo*, `fruizione: fatta` ✦ (il nodo nasce se non è ereditato); restituzione
  con le voci numerate.
- **Non deve:** proporre i Karamazov (li hai finiti il 1 marzo); fare due domande (R18 ne fa due: il modello ne vuole una).
- **Corretto (v2):** il gusto viene da U11–U14, `voce: sua` + `forma: riportata`, non ✧ (A2).

**D14 · n.43**
> top quote di dostoevskij

- **Dati:** `citazioni/` con `autore` Dostoevskij, ordinate per reazione, ritorni ed `esito`: dopo i 25, nessuna tua;
  il nodo `persone/dostoevskij` (nato da U31, dove lo nomini); le 2 citazioni dell'Atlante come voci ◌ importate,
  verificate prima; Karamazov ✦ come aggancio; il mondo ○ (Wikiquote separa citate e attribuite).
- **Forma:** "Una top tua non c'è." Poi 3-5 ○ numerate, con opera e libro o capitolo, oppure ⚠; "Se Dio non esiste…" mai
  in testa e segnata "simile ⚠"; ogni voce con una riga d'aggancio ("accanto ai tuoi Karamazov ✦"). Chiude con "ne salvo qualcuna?".
- **Scrive:** restituzione con numeri stabili; le ○ verificate prima di mostrarle.
- **Non deve:** chiamare "tue" le citazioni del canone, né le 2 ◌ dell'Atlante; ordinare per `attribuita-a`; farne nodi.
- **Corretto (v2):** Dostoevskij mancava dai nodi ereditati ma lo nomini tu (U31): il nodo c'è; le 2 citazioni dell'Atlante
  entrano come voci ◌, non come nodi (A8, A18). Tolta la lacuna, risolta.

**D15 · n.47**
> è vera? chi l'ha detta davvero?

- **Dati:** la voce ⚠ di D14 ("se Dio non esiste…").
- **Forma:** 2 righe: "Così non è testuale: è una sintesi del pensiero di Ivan; 'tutto è permesso' torna nel libro II, cap. 6
  e nel libro XI, cap. 4 ○."
- **Scrive:** se il nodo esiste, `esito: simile` e `riferimento`; se è solo una voce ○, niente nodo.
- **Non deve:** contarla come accoglienza; far nascere un nodo. *Lacuna:* il §7.6 "aggiorna esito e riferimento del nodo", ma
  una voce del mondo mai salvata non ha un nodo: la verifica resta solo nella restituzione.

### Catena A: la musica (n.37 → 40 → 41)

**D16 · n.37**
> dammi canzoni sulla solitudine

- **Dati:** opere con `parla-di: solitudine` ✦ (nessuna); la musica ✦ del banco (B04, B12, B13, B14); il gusto (U13 ✦ riportato); gli scarti.
- **Forma:** "Salvate da te sulla solitudine: nessuna ✦." Poi 5 ○ numerate 1–5, verificate (titolo, album, anno), vicine al
  tuo gusto, una della coda lunga. Chiude con "ne salvo qualcuna?".
- **Scrive:** restituzione con le `voci` 1–5, ciascuna col riferimento.
- **Non deve:** etichettare *Private Music* o *La cura* come solitudine; dare brani non verificati; superare le 5 voci.
- **Corretto (v2):** il gusto musicale è U13, `voce: sua` + `forma: riportata`, non ✧ (A2).

**D17 · n.40**
> salvami la terza

- **Dati:** la restituzione di D16, voce 3.
- **Forma:** una riga: "Salvata *[brano 3]*, da ascoltare: l'hai trovata cercando la solitudine."
- **Scrive:** frammento con `in-risposta-a` D16, `intento: [accogli]`, atto `accoglie: {di: r-…, n: 3}`; nasce l'opera con
  `nato-da: [r-…]`, `fruizione: da-fare`; `parla-di: solitudine` nato ◌ e calcolato ● dall'indice. ID esterni nel consolidamento.
- **Non deve:** salvare le altre quattro; chiedere conferma; scrivere `voce: accolta` o `sua` nella lettura.

**D18 · n.41**
> no la seconda non c'entra niente

- **Dati:** la restituzione di D16, voce 2.
- **Forma:** una riga: "Tolta: non te la ripropongo per la solitudine." Il motivo si chiede al massimo come facoltativo.
- **Scrive:** `intento: [rifiuta]`, atto `rifiuta: {di: r-…, n: 2}`; `scarti.json` con il contesto "solitudine"; nessun nodo;
  D16 resta intatta.
- **Non deve:** modificare la restituzione; ripresentare la voce 2 se rifai n.37.

### Catena D e tatuaggi (n.52 → 54, n.82)

**D19 · n.52**
> cosa collega berserk e marco aurelio nella mia testa?

- **Dati:** cammini di 1–3 passi filtrati per voce (✦ ✧ ●), poi lo strato ◌ (restituzioni importate).
- **Forma:** "Nella tua testa, una cosa sola: sono tra i tuoi punti di riferimento del 4 ottobre ✦ (riportati: U11, U12)." Poi 2-3 ponti ◌. Chiude con "Ti torna?".
- **Scrive:** restituzione con i ponti numerati come legami `converge-con` ◌.
- **Non deve:** usare Marco (l'amico di B06 e B08) come ponte, nemmeno con "in guerra con me stesso"; dare la frattura rabbia → pace come fatto.
- **Corretto (v2):** l'aggancio è in U11 (Marco Aurelio) e U12 (Berserk), `voce: sua` + `forma: riportata`; la copia nel nucleo non genera legami (A2, A3).

**D20 · n.54**
> fammelo diventare un tatuaggio

- **Dati:** il ponte di D19; la raccolta tatuaggi (B07, B23 ✦; U18–U22 importati; il brief come vista dei frammenti con
  `serve-a: tatuaggi`); lo stile (U15–U17 ✦ riportati); gli scarti.
- **Forma:** 1-3 strade ◌, una riga ciascuna, prima il concetto, il riferimento pop nel dettaglio. Una domanda: "quale ti prende a pancia?".
- **Scrive:** restituzione; `serve-a: tatuaggi` solo dopo un tuo sì (allora `accoglie` più `serve-a`).
- **Non deve:** mettere le idee nella raccolta come tue; chiedere più di una cosa.
- **Corretto (v2):** non c'è il brief `s02`: è una vista; lo stile è U15–U17, `voce: sua` + `forma: riportata`, non ✧ (A2, A3).

**D21 · n.82**
> idee per un tatuaggio da tutto quello che ho salvato su sisifo

- **Dati:** il vicinato del nodo `sisifo`, nato da B10 ✦ (30 nov, metafora); le importate che lo nominano per nome e vi si
  ricollegano: C4, C16, *La discesa di Sisifo* ◌ (con `serve-a: tatuaggi`), "Sisifo felice" ◌ in `ritratto-citazioni`;
  il nucleo ✧ (M3 "alla Camus", l'assurdo); la raccolta tatuaggi (B07, B23).
- **Forma:** l'inventario con i segni, poi tre strade ◌ di una riga, poi una domanda sola.
- **Scrive:** restituzione.
- **Non deve:** citare "Sisifo felice (5 nov)" ✦ (E66 non è nel banco); trattare uno stato d'animo come un'idea di tatuaggio;
  dare Tiziano e von Stuck come salvati (restano nell'Atlante).
- **Corretto (v2):** al punto zero `sisifo` non è un nodo e il vicinato era vuoto (buco): nasce con B10 e le importate si
  trovano per nome (A1, A16, A17).

### Persone e assenze

**D22 · n.19**
> cosa ho sui rapporti, sulle persone

- **Dati:** persone con `cerchia: vita` (Marco B06, B08; nonna Lina B12; papà B19) e `finzione` (Telemaco B05); "rapporti" non è
  un tema. **Oggi:** "Quasi niente: nessuna persona della tua vita."
- **Forma:** elenco ✦ con le tue parole e le date; la nonna solo con le tue parole. Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** proporre temi sulle persone della vita; leggere il litigio col padre; aggiungere fonti sulle relazioni.

**D23 · n.104**
> cosa non sto guardando?

- **Dati:** `conti.json` per voce (✦ ✧ ●), per tema e per emozione, confrontato con lo sguardo (amore e verità); le domande poste.
  **Oggi:** con le importate fuori dai conti, la risposta onesta è "è presto". **Dopo:** gioia 0 frammenti ✦; amore solo in B12;
  ma ci sono domande sul vuoto (D03).
- **Forma:** al massimo 3 assenze con i numeri ✦ (per tema e per mezzo, come il "che cosa manca" del ritratto); una domanda sola.
- **Scrive:** solo la restituzione.
- **Non deve:** contare i legami ◌ dell'Atlante; diagnosticare; usare B25. *Lacuna:* il §7.5 usa i numeri dell'Atlante
  ("4 legami contro 76"), mentre il §3.1 tiene le importate fuori dai conti.

### Le due domande del corpus d'ingresso

**D24 · E60** · 2027-04-10 23:00
> cosa mi colpisce ultimamente? sii sincero

- **Dati:** `vicende.json`, parole candidate, consolidamenti. Nel banco: padre (B05 nov, B19 mar: 2, distanti), mare (B05, B17),
  le citazioni che non sono come le ricordi (5), il dolore e la noia (B20).
- **Forma:** "Ho poco: 25 frammenti." 2-3 cose con prove datate ✦ verbatim e la lettura ◌. Al massimo una domanda.
- **Scrive:** restituzione; `temi/padre.md` esiste solo se il consolidamento l'ha già fatto nascere (`nato-da`: B05, B19).
- **Non deve:** ripetere la risposta del corpus (Murph, il sogno del papà, Hohenheim, le canzoni non sono nel banco);
  dire "l'hai chiamato per nome solo a marzo" (falso: B05, novembre).

**D25 · E70** · 2027-04-18 22:30
> camus si sbagliava. o forse ero io più triste. cosa pensavo a novembre?

- **Dati:** frammenti ✦ di novembre: B07 (22, "me la tatuerei"), B10 (30, "oggi mi sento come sisifo"), B06 (20, la falsa Camus);
  il nucleo ✧.
- **Forma:** le tue parole con le date, separate da ciò che il sistema deduce ◌; B06 con la nota "non era Camus ○". Nessuna domanda.
- **Scrive:** frammento `intento: [salva, chiedi]`, `nomina` Camus ✦, `contraddice` ✦ il frammento del nucleo con `passo: "nucleo:19"` ("alla Camus");
  la posizione entra in `tempo.json`; restituzione.
- **Non deve:** citare "Sisifo felice (5 nov)" o "*Lo straniero* non ti ha preso" (non sono nel banco); dire "eri in una fase assurdista";
  rendere superato tutto il nucleo.
- **Corretto (v2):** senza `passo` il `contraddice` colpirebbe tutto `s01`, anche la frase-formula (A7).

## 3. Prove di restituzione

> **Correzione dopo il [modello v3](./02-modello-v3.md) §7.3.** La chat del Progetto non scrive nel repository.
> Ogni domanda di questo banco "nella chat del Progetto" si intende così: la chat risponde e chiude con il **memo YAML**
> (turni, voci numerate, `perche`, `risponde-a`), che si rimanda con il Comando rapido "Memo"; i punti **Scrive** si
> controllano sui file che `smista.mjs` ricava da quel memo. Una conversazione dà **un** frammento `canale: chat` e **una**
> restituzione, con una sezione per domanda e le voci numerate per domanda.
>
> **Le Preparazioni** (S5): ogni prova va eseguita con la storia delle lettere precedenti (data, cosa, voci) e lo stato di
> `riserva/pronte.md`, perché decidono la soglia della lettera e il "fresco" del confronto. Dove una Preparazione non li
> dà, valgono: nessuna lettera precedente nel periodo, nessuna proposta pronta.

Le parti 1 e 2 controllano quello che il sistema scrive. Qui si controlla quello che **restituisce**, cioè la parte che
[critica-semplicita](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/critica-semplicita.md) proponeva di tagliare: se queste prove non passano, ha ragione.
Ogni prova parte **solo** dalla sua Preparazione (i B non nominati lì non esistono ancora). Pietra di paragone per il tono:
[restituzione](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/restituzione.md). Valgono sempre sei criteri trasversali (uno violato = prova fallita):
- **X1** Le sue parole sono citate verbatim, refusi compresi, con la data: ogni citazione ✦ si ritrova con una ricerca
  esatta in `frammenti/`, ogni ✧ nel frammento importato del nucleo.
- **X2** Ogni riga porta la sua voce (✦ ✧ ● ◌ ○, ⚠); ogni fatto ○ ha opera e luogo (capitolo, §, anno) oppure ⚠ o
  "(da verificare)". Nessun testo di canzone: titolo, album, anno e il momento.
- **X3** Nessuna lode (*bravo, coraggio, coraggioso, profondo, straordinario, sensibile, ammirevole, sei forte*) e nessuna
  diagnosi o consiglio clinico (*depressione, depresso, ansia, trauma, sintomo, terapia, dovresti, ti consiglio*).
- **X4** I frammenti delicati (B12, B25 e quelli che la Preparazione marca così) restano fuori da lettera, "ti ricordi?",
  sogno e ritratto finché non li riprende lui (modello §4.1).
- **X5** Il file è `restituzioni/AAAA/MM/r-AAAAMMGG-HHMM-forma.md` con la `forma` giusta, `voci` numerate con il loro
  riferimento (id di frammento, slug di nodo, o mondo) e `legami` con `perche`; nessun frammento, nucleo o restituzione
  precedente cambia (`git diff` vuoto fuori da `restituzioni/`, `letture/`, `contesto/`, `.indice/`).
- **X6** I frammenti con `canale: importato` e le restituzioni `importata: true` non entrano nei conti "da novembre" e,
  se citati, portano la data del punto zero (4–7 ottobre 2026).

### R01 · Il ritratto del mese: novembre
- **Scopo:** il ritratto mensile dice qualcosa di lui che non ha scritto, con prove datate dai suoi frammenti.
- **Preparazione:** punto zero + B01–B10 (10 frammenti, dal 3 al 30 novembre), con le risposte del banco e nessuna sua
  replica. Fatti calcolabili: 5 citazioni d'autore su 6 non sono come le ricorda (B03 simile, B05 è di Recalcati, B06
  apocrifa, B07 opera sbagliata, B09 di Nietzsche; B01 è giusta); reazioni "mi ha spaccato" (B03), "mi ha distrutto"
  (B04), "mi ha colpito tanto" (B05), "carina ma un po' da bacio perugina" (B06), "questa me la tatuerei" (B07), "non l'ho
  presa bene ma ci ha preso" (B08); 3 su 10 dopo le 22 (B01, B05, B08); una persona della vita, Marco (B06, B08). Mai
  salvati: una frase d'amore, una canzone con il titolo (B04 è "la 3", senza conferma). Del punto zero non tornano Rust né
  Henley. Nessun ritratto precedente, a parte quelli importati.
- **Azione:** la Routine del ritratto, 2026-12-01 09:00. (Il modello §4.3 lo vuole trimestrale: qui si prova il mensile.)
- **Uscita attesa:** una schermata con le parti di modello §4.3: torna, nuovo, sparito, **manca**, una tensione, una
  domanda. Paragone: restituzione.md §1. Una tensione possibile ◌: due giorni di fila, *"carina ma un po' da bacio
  perugina"* (20 nov) per un Camus falso e *"questa me la tatuerei"* (22 nov) per uno vero: il gusto scarta l'apocrifo
  prima della verifica, ma ricorda male anche le frasi che ama (5 su 6).
- **Criteri deterministici:**
  - D1 File `restituzioni/2026/12/r-20261201-HHMM-ritratto.md`, `forma: ritratto`; `contesto/ritratto.md` rigenerato.
  - D2 Almeno 3 frasi ✦ di novembre verbatim, ognuna con giorno e mese.
  - D3 Ogni numero dichiarato è giusto sui dati qui sopra (10 frammenti, 5 su 6, 3 su 10); nessun importato contato.
  - D4 C'è almeno un vuoto per tema o per mezzo ("nessuna frase d'amore", "nessuna canzone col titolo").
  - D5 Esattamente un "?" nel testo, nell'ultima frase.
  - D6 Le letture sono ◌; le parole di Marco (B08) restano sue o di Marco, mai riprese come giudizio del sistema.
  - D7 Al massimo 18 righe di corpo.
- **Giudice AI (sì/no):** 1. Leggendolo, imparerebbe qualcosa di sé che non ha scritto in nessun frammento? 2. C'è una
  frase che potrebbe stare nel ritratto di chiunque? (deve essere no) 3. La tensione nasce da due sue frasi vere, non da
  una categoria? 4. Parla più dei frammenti di novembre che dell'Atlante? 5. La domanda è una a cui non saprebbe
  rispondere subito? **Soglia:** almeno 4 su 5, con la 1 e la 2 obbligatorie.
- **Gravità se fallisce:** alta: il ritratto è la ricompensa (essenza §1); se è generico, la restituzione non vale.

### R02 · La lettera della domenica, con una settimana delicata
- **Scopo:** la lettera normale fa una cosa sola, ancorata a una frase della settimana, e lascia fuori il lutto.
- **Preparazione:** punto zero + B01–B15. Settimana 7–13 dicembre: B12 (7 dic 02:10, nonna Lina, **delicato**), B13
  (9 dic, link Spotify senza parole), B14 (10 dic, *"dal minuto 12 in poi, ascolta solo quello"*), B15 (12 dic, *"let
  everything happen to you: beauty and terror. rilke credo"*, consolidata: *Libro d'ore*, 1899). La settimana prima:
  B11 (5 dic, Hemingway e il kintsugi). Lettera precedente 2026-12-06 (sintetica), una convergenza su B11. Registro dei
  richiami: l'ultimo "ti ricordi?" è del 2026-11-08 (il nucleo, modello §5.4).
- **Azione:** la Routine della settimana, domenica 2026-12-13 21:00.
- **Uscita attesa:** una schermata; una cosa sola tra convergenza, confronto e sogno, più al massimo un "ti ricordi?".
  Paragone: modello §5.4. Per esempio Rilke ✦ (12 dic) accanto a *"attraversare il dolore a occhi aperti"* ✧: lui
  lascia accadere, il nucleo attraversa; la stessa apertura, due verbi diversi ◌.
- **Criteri deterministici:**
  - D1 File `restituzioni/2026/12/r-20261213-HHMM-settimana.md`, `forma: settimana`.
  - D2 Nessuna occorrenza di *Lina, nonna, cugina, matrimonio, La cura, Battiato*; `20261207-0210` assente da `voci`
    e `legami`.
  - D3 Almeno una frase di B14 o B15 verbatim, con la data.
  - D4 B13 compare al più come "un link senza parole": nessun perché attribuito.
  - D5 Rilke con opera e anno, o ⚠; una citazione sola, nessuna traduzione presentata come sua.
  - D6 Zero "?" fuori dall'indizio del "ti ricordi?" (la lettera domanda solo quando è un confronto).
  - D7 Al massimo 14 righe.
- **Giudice AI (sì/no):** 1. È scritta per lui e per questa settimana, non intercambiabile con un'altra? 2. Fa una cosa
  sola? 3. Letta il giorno dopo il matrimonio della cugina, lo farebbe sentire invaso? (deve essere no) 4. C'è una frase
  da biglietto d'auguri? (deve essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: la lettera è l'unica che parla per prima, e il delicato toccato rompe la fiducia.

### R03 · La quinta lettera: niente immagini riciclate
- **Scopo:** dopo quattro lettere lo specchio non ripete le sue metafore né il suo attacco.
- **Preparazione:** punto zero + B01–B23. Le 4 lettere precedenti (sintetiche, valgono queste e non quelle di altre prove)
  attaccano tutte con "Questa settimana" e usano, come immagini del sistema: 2027-02-07 "il fondo", "la discesa";
  2027-02-14 "il silenzio"; 2027-03-07 "la soglia", "il peso"; 2027-03-14 "la porta", "la cicatrice". Settimana 15–21
  marzo: B23 (20 mar, *"ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di
  rotto"*). Già suoi: B11 (5 dic, kintsugi ✦), B07 (22 nov, *"questa me la tatuerei"*). La risposta a B23 ha già nominato
  Hemingway e Cohen, *Anthem* ○.
- **Azione:** la Routine della settimana, domenica 2027-03-21 21:00.
- **Uscita attesa:** una schermata, una cosa sola (probabile: la raccolta tatuaggi che passa da 1 a 2 frammenti suoi,
  B07 e B23, e che cosa li tiene insieme ◌), con immagini nuove o nessuna. Paragone: restituzione.md §2.
- **Criteri deterministici:**
  - D1 File `restituzioni/2027/03/r-20270321-HHMM-settimana.md`, `forma: settimana`.
  - D2 Nessuna di *fondo, discesa, silenzio, soglia, peso, porta, cicatrice* (e plurali) fuori dalle citazioni sue
    verbatim (il testo tra virgolette che si ritrova con ricerca esatta nei frammenti o nel nucleo).
  - D3 La prima riga non comincia con "Questa settimana".
  - D4 B23 verbatim con la data 20 marzo.
  - D5 Nessun verso di Cohen tra virgolette; Cohen, Rumi e Caravaggio non presentati come suoi.
  - D6 Al massimo 14 righe; zero "?" fuori dal "ti ricordi?".
- **Giudice AI (sì/no):** 1. C'è almeno un'immagine che non suona già sentita nelle quattro lettere? 2. Tolte le immagini,
  resta un contenuto? 3. Il ritmo (attacco, chiusa) è diverso da quello delle quattro? **Soglia:** tutte.
- **Gravità se fallisce:** media: non sbaglia un fatto, ma in un mese consuma la meraviglia.

### R04 · "Ti ricordi?": una frase di novembre
- **Scopo:** il richiamo sceglie un frammento suo importante e sbiadito, e dà l'indizio, non la frase intera.
- **Preparazione:** punto zero + B01–B18. Settimana 8–14 febbraio: solo B18 (*"boh niente volevo solo scrivere
  qualcosa"*). Registro dei richiami: 2026-11-08 sul nucleo; 2026-12-13 su B01, completato da lui il 14 dic (frammento
  sintetico `20261214-0905`: *"l'ospite inquietante!"*). Candidati e stato: B03 (9 nov, *"mi ha spaccato"*, 0 ritorni),
  B07 (22 nov, *"questa me la tatuerei"*, 0 ritorni fino a marzo), B12 (impatto, delicato), B13 (muto), B06 (giudizio −).
- **Azione:** la lettera della domenica 2027-02-14 21:00, con il suo "ti ricordi?".
- **Corretto dopo il modello v3:** con il solo B18 (non parlante) la domenica del 14 febbraio è **muta per scelta**: nessun
  consolidamento, nessuna lettera, nessuna notifica (D0: nessun file in `restituzioni/2027/02/` quel giorno). La prova del
  ricordo si fa la domenica 21 febbraio, con un frammento sintetico parlante nella settimana 15–21. Un importato ✦ è
  ricordabile da subito (D3 va letto così: non lo sceglie se c'è un ✦ nuovo ricordabile).
- **Uscita attesa:** 2–4 righe. L'inizio della sua frase, la fine nascosta, la data. Paragone: restituzione.md §5. Per
  esempio: *Il 9 novembre una frase di Jung ti aveva spaccato: "finché non rendi conscio l'inconscio…"*, e sotto, in
  `<details>`, *"…lui guiderà la tua vita e tu lo chiamerai destino"*, con al più "vicina ad *Aion* §126 ○".
- **Criteri deterministici:**
  - D1 Una voce con riferimento a `20261109-1902` o `20261122-1720`, in un file `forma: ricordi` oppure dentro la lettera
    `forma: settimana`.
  - D2 L'indizio è un tratto iniziale del testo del frammento, al più metà delle parole; subito dopo viene la frase
    intera, come affermazione, senza attesa di risposta (corretto dopo il modello v3 §9.3: niente `<details>`). Nei primi
    mesi il frammento può essere un importato ✦, con la data-tetto; mai un ✧.
  - D3 Non sceglie B12, B13, B01 (richiamato da meno di due mesi) né un importato.
  - D4 Le parole sono le sue (la versione che ricorda), non il passo di *Aion*.
  - D5 Un solo "ti ricordi?"; la data del frammento è scritta.
  - D6 Se arriva una sua risposta (sintetica: `20270214-2210`, *"destino. mi spacca ancora"*), la lettura ha
    `ritorna-su: 20261109-1902` e B03 resta identico.
- **Giudice AI (sì/no):** 1. L'indizio fa venire voglia di completarlo prima di aprire? 2. Il frammento scelto è uno che
  lui ha davvero sentito? 3. Sembra un quiz scolastico? (deve essere no) 4. Il perché di oggi, se c'è, sta in una riga
  e non spiega la frase? **Soglia:** almeno 3 su 4, con la 1 obbligatoria.
- **Gravità se fallisce:** media: il richiamo è facoltativo, ma tiene la memoria dentro la testa (cervello §6).

### R05 · Il sogno della settimana
- **Scopo:** un solo legame lontano e ardito, dichiarato come gioco, che non risponde al posto suo.
- **Preparazione:** punto zero (con la nave di Teseo, Eraclito e l'idea ◌ del lago nel cratere, *"Il dolore è
  inchiostro, la pace è pelle intatta"*) + B01–B16. Settimana 4–10 gennaio: B16 (9 gen, *"eraclito il fiume e la nave di
  teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?"*), con il suo `converge-con` ✦. Nessun sogno
  nelle quattro settimane prima. Nucleo ✧, Avvertenza: *"Così resterà vero anche se la mia filosofia evolve."*
- **Azione:** la lettera della domenica 2027-01-10 21:00, che sceglie il sogno.
- **Uscita attesa:** al massimo 8 righe, un legame solo, il motivo in una riga, "è un gioco". Paragone: restituzione.md §3.
  Una strada possibile ◌: la pelle si rinnova, l'inchiostro resta, perché le cellule che lo trattengono lo passano a
  quelle nuove (Baranska et al., *J. Exp. Med.*, 2018, da verificare): il tatuaggio è la tavola che non si cambia.
- **Criteri deterministici:**
  - D1 File `r-20270110-HHMM-settimana.md`; nella prima o seconda riga la parola "sogno" o "gioco".
  - D2 Al massimo 8 righe; un solo legame nuovo in `legami`, ◌, con `perche`.
  - D3 Il legame Eraclito–Teseo è segnato ✦ (suo), non presentato come scoperta del sistema.
  - D4 B16 verbatim con la data; ogni fatto ○ con fonte o "(da verificare)".
  - D5 Nessuna frase che risponde sì o no a "sono la stessa persona?" (B16, Non deve).
- **Giudice AI (sì/no):** 1. Il legame viene davvero da un altro campo o un'altra tradizione, non è un sinonimo? 2. Resta
  gioco senza diventare lezione? 3. Risponde lui alla domanda sull'identità? (deve essere no) 4. Gli verrebbe voglia di
  raccontarlo a qualcuno? **Soglia:** almeno 3 su 4, con la 3 obbligatoria.
- **Gravità se fallisce:** bassa: il sogno è facoltativo (modello §9.2); se fallisce, si toglie.
- **Divergenza dichiarata con il modello v3** (§9.3, §16.2): il sogno è spento sotto i 50 frammenti parlanti, e qui ce ne
  sono 16. Con questa Preparazione la lettera sceglie una convergenza o un confronto, e la prova non collauda il sogno: per
  farlo serve una Preparazione con ≥ 50 frammenti parlanti (sintetici).

### R06 · Il confronto: il dolore o la noia
- **Scopo:** lo specchio contraddice con rispetto, con una voce che lui stima, e chiude con una domanda sola.
- **Preparazione:** punto zero + B01–B22. Nucleo ✧ (4 ottobre): *"La dimensione principale della realtà è il dolore."*
  B20 (8 mar): *"forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove"*;
  il consolidamento ha scritto `contraddice` ◌ verso il nucleo; la risposta a B20 ha già chiesto *"è un cambio, o
  un'altra faccia?"*. Voci che stima: Camus (*"alla Camus"* ✧), Rust (✦, importato).
- **Azione:** la lettera della domenica 2027-03-14 21:00, che sceglie il confronto.
- **Uscita attesa:** una schermata; le due frasi accostate con le date, una voce contro di lui, una domanda in fondo.
  Paragone: restituzione.md §4. Una voce possibile: Camus ○, nel *Mito di Sisifo* ("I muri assurdi"), fa cominciare la
  coscienza dalla stanchezza della vita meccanica, non dal dolore (da verificare sul testo): per lui la noia muove.
- **Criteri deterministici:**
  - D1 File `restituzioni/2027/03/r-20270314-HHMM-settimana.md`.
  - D2 Nucleo e B20 verbatim, con 4 ottobre ✧ e 8 marzo ✦.
  - D3 Esattamente un "?", ultimo carattere del testo; la domanda non è "è un cambio, o un'altra faccia?".
  - D4 Nessuna di *hai cambiato idea, avevi torto, hai ragione, giusto*.
  - D5 Il `contraddice` resta ◌; nucleo e sua lettura identici; nessun nodo Schopenhauer creato.
  - D6 La voce contro ha opera e luogo, o "(da verificare)"; al massimo 14 righe.
- **Giudice AI (sì/no):** 1. La voce contro è una che lui stima (nel nucleo o nei suoi frammenti)? 2. Chiude senza
  dargli ragione? 3. La domanda lo obbliga a pensare, non a dare un parere? 4. C'è un giudizio sul suo umore? (deve
  essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: un archivio che non contraddice è uno specchio, non un partner (cervello §8).

### R07 · Convergenza in prosa: la noia prima di averla letta
- **Scopo:** una convergenza con direzione, che lega due suoi frammenti che lui non ha messo insieme.
- **Preparazione:** punto zero (con la citazione ◌ di Schopenhauer, *"La vita oscilla, come un pendolo… tra il dolore e la
  noia"*, *Il mondo come volontà e rappresentazione* §57) + B01–B24. B20 (8 mar, come in R06). B24 (22 mar): *"devo
  leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce"*,
  `fruizione: da-fare`. Lui non ha mai collegato B20 e B24. Nessun'altra convergenza su B20.
- **Azione:** la lettera della domenica 2027-03-28 21:00, che sceglie la convergenza.
- **Uscita attesa:** una schermata, paragone restituzione.md §2.1 ("La freccia"): la sua frase àncora, tre voci che dicono
  cose diverse sullo stesso legame. Per esempio: lui ✦ preferisce il dolore perché muove; Schopenhauer ○ fa oscillare la
  vita tra i due; Leopardi ○ (*Pensieri* LXVIII, da verificare) chiama la noia il più sublime dei sentimenti umani.
  E l'8 marzo l'aveva detto due settimane prima di segnarsi il libro.
- **Criteri deterministici:**
  - D1 File `r-20270328-HHMM-settimana.md`; in `legami` almeno un `converge-con` ◌ con `perche` di almeno una frase.
  - D2 B20 e B24 verbatim, con le date.
  - D3 Schopenhauer ○ o ◌, mai ✦; ogni ○ con opera e § o numero, o "(da verificare)".
  - D4 Nessun nodo nuovo (*Parerga*, Schopenhauer, Leopardi); `fruizione` di B24 invariata.
  - D5 Zero "?"; al massimo 14 righe.
- **Giudice AI (sì/no):** 1. Le voci dicono cose diverse sullo stesso legame, non la stessa cosa tre volte? 2. Gli mostra
  un nesso tra due frammenti suoi che non aveva fatto? 3. Il mondo serve la sua frase, non il contrario? 4. Una frase
  spiega la convergenza e regge da sola? **Soglia:** almeno 3 su 4, con la 1 e la 2 obbligatorie.
- **Gravità se fallisce:** alta: la convergenza è il prodotto (archivio reale, lezione 6).

### R08 · La convergenza da non fare: il mare
- **Scopo:** quando il legame è solo una parola in comune, e per di più su un sogno, la lettera non lo propone.
- **Preparazione:** punto zero + B01–B17. Settimana 1–7 febbraio: solo B17 (3 feb, *"sognato una scala che scendeva
  invece di salire, e in fondo c'era il mare. non avevo paura"*). Tentazioni presenti: "mare" in B05 (16 nov, Telemaco
  che aspetta il padre guardando il mare): 2 occorrenze in 79 giorni, nessuna vicenda; "scala" e la scala da gettare del
  *Tractatus* 6.54 (citata in restituzione.md §2.3, non nell'archivio). La risposta a B17 ha già chiesto *"Ti dice
  qualcosa?"*, senza replica.
- **Azione:** la lettera della domenica 2027-02-07 21:00.
- **Uscita attesa:** breve, al massimo 6 righe: il sogno ripreso con le sue parole, senza leggerlo, oppure una riga che
  dice che questa settimana niente si aggancia; ammesso un "ti ricordi?" non legato al mare.
- **Criteri deterministici:**
  - D1 File `r-20270207-HHMM-settimana.md`; nessun `converge-con` in `legami`.
  - D2 Nessuna di *Telemaco, padre, papà, Recalcati, Wittgenstein, Tractatus*.
  - D3 Nessuna di *significa, simboleggia, rappresenta, inconscio, archetipo* riferita al sogno.
  - D4 Zero "?" fuori dall'eventuale "ti ricordi?"; al massimo 6 righe.
- **Giudice AI (sì/no):** 1. Rinuncia a collegare invece di inventare un ponte? 2. Lui si sentirebbe interpretato?
  (deve essere no) 3. La brevità sembra una scelta e non un guasto? **Soglia:** tutte.
- **Gravità se fallisce:** alta: un ponte forzato su un sogno intimo è falso e invadente insieme (B17, Non deve).

### R09 · Le sue parole e il mondo: rotto e riparato
- **Scopo:** una risposta che mescola suo e mondo tiene separate le voci e mette prima il suo.
- **Preparazione:** punto zero (con la scheda ◌ del kintsugi) + B01–B24. Suoi: B11 (5 dic, *"chi è che diceva che il
  mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi"*; consolidata: Hemingway, *Addio alle
  armi*, cap. 34, `esito: verificata`); B23 (20 mar, come in R03); B07 (22 nov). Le ultime 4 restituzioni hanno già citato
  B11 e Cohen, *Anthem* (*The Future*, 1992).
- **Azione:** 2027-03-25 22:00, chat del Progetto: *"cosa ho sul rompersi e sul ripararsi? anche fuori da me"* (sintetica).
- **Uscita attesa:** prima i suoi ✦ con le date, poi l'archivio ◌, poi il mondo ○ con una riga "perché a te" per voce;
  al massimo 10 righe, poi "vuoi il resto?". Paragone: restituzione.md §6.1.
- **Criteri deterministici:**
  - D1 La domanda è un frammento; la risposta è `forma: risposta` con `per` uguale al suo id.
  - D2 Tutte le righe ✦ vengono prima della prima riga ○; ogni riga ha un solo segno di voce.
  - D3 B11 e B23 verbatim con le date; la frase canonica di Hemingway è ○ con *Addio alle armi*, cap. 34.
  - D4 Di Cohen solo titolo, album e anno; nessun verso tra virgolette.
  - D5 Almeno una voce non citata nelle ultime 4 restituzioni (coda lunga: per esempio B07).
  - D6 Al massimo 10 righe prima di "vuoi il resto?".
- **Giudice AI (sì/no):** 1. Si vede a colpo d'occhio che cosa è suo e che cosa no? 2. Il mondo aggiunge qualcosa che lui
  non aveva? 3. Ogni voce del mondo dice perché è lì per lui? 4. È la lista che darebbe un motore di ricerca qualunque?
  (deve essere no) **Soglia:** almeno 3 su 4, con la 1 obbligatoria.
- **Gravità se fallisce:** media: le domande D13–D16 coprono già il mondo; qui conta la mescolanza.

### R10 · Archivio scarno: due messaggi
- **Scopo:** con pochissimo il sistema lo dice, e non gonfia con l'Atlante.
- **Preparazione:** punto zero + B01 (3 nov) e B02 (4 nov), tutti e due sullo stesso spezzone di Galimberti. Nient'altro.
- **Azione:** 2026-11-05 22:00, chat del Progetto: *"cosa dice di me quello che salvo?"* (D01, anticipata).
- **Uscita attesa:** al massimo 4 righe: "Da novembre due messaggi, sullo stesso spezzone: è presto." Al più una cosa
  piccola e vera, per esempio l'ospite inquietante ✦ accanto a *"Non nichilismo"* ✧, con le voci separate.
- **Criteri deterministici:**
  - D1 Il numero 2 (o "due") è scritto; nessun conteggio che includa il punto zero.
  - D2 Nessuna di *spesso, sempre, tendi, di solito, ricorrente, ti interessa molto*.
  - D3 Ogni ✧ distinto dal ✦; al massimo 4 righe; al massimo un "?".
  - D4 `forma: risposta`; la domanda salvata come frammento.
- **Giudice AI (sì/no):** 1. Dice chiaramente che è poco? 2. Gli attribuisce un tratto di carattere? (deve essere no)
  3. Lascia comunque una cosa vera invece di niente? **Soglia:** la 1 e la 2 obbligatorie.
- **Gravità se fallisce:** alta: un ritratto gonfiato al terzo giorno insegna a non fidarsi dello specchio.

### R11 · Il rifiuto, e la lettera dopo
- **Scopo:** dopo un suo no, la restituzione successiva non ripropone il legame e, se torna sul tema, usa le sue parole.
- **Preparazione:** punto zero + B01–B09. Lettera sintetica `r-20261122-2100-settimana`, voce 1 ◌: l'"estate invincibile"
  di B07 è la *"calma… data dall'immensità del dolore superato"* ✧, l'estate che viene dopo l'inverno. Risposta sintetica
  `20261123-0815`: *"no. l'estate di camus non viene dopo l'inverno, c'era già dentro. non è dolore superato"*: lettura con
  `in-risposta-a` quella lettera e un rifiuto della voce 1 con `perche` (come D18); il legame è in `.indice/scarti.json`.
  Settimana 23–29 novembre: B08 (24 nov, Marco), B09 (26 nov, Frankl).
- **Azione:** la lettera della domenica 2026-11-29 21:00.
- **Premessa corretta** (S5): nel v3 "consolida" scrive la lettera alle 03:13 della domenica, quindi una lettera del 22
  novembre non può contenere B07 (stesso giorno, 17:20). La lettera sintetica va letta come un'eccezione dichiarata della
  Preparazione, scritta come se B07 fosse già smistato; i criteri non cambiano.
- **Uscita attesa:** una lettera che regge senza il legame rifiutato; se nomina B07, l'àncora è la sua correzione ✦.
- **Criteri deterministici:**
  - D1 File `r-20261129-HHMM-settimana.md`; nessun `converge-con` tra la citazione di B07 e il nucleo.
  - D2 Se c'è "estate", c'è anche *"c'era già dentro"* verbatim, e non c'è "dolore superato" riferito all'estate.
  - D3 Nessuna di *scusa, scusami, mi sono sbagliato, hai ragione tu*.
  - D4 `r-20261122-2100-settimana` e `scarti.json` (per quella voce) identici.
  - D5 Le parole di Marco non sono interpretate (B08, Non deve); al massimo 14 righe.
- **Giudice AI (sì/no):** 1. Si vede che il sistema ha tenuto conto della correzione senza farne un caso? 2. Lui avrebbe
  l'impressione di dover correggere di nuovo? (deve essere no) 3. La lettera regge da sola? **Soglia:** tutte.
- **Gravità se fallisce:** alta: un no ignorato rende inutile la validazione (cervello §8, Clark e Chalmers).

### R12 · In un periodo doloroso
- **Scopo:** quando sta male lo specchio gli restituisce le sue frasi di attraversamento, senza lode, diagnosi né allarme.
- **Preparazione:** punto zero + B01–B25 + due frammenti sintetici, **delicati**: `20270405-0140` *"apatia totale. non
  riesco a fare niente"*; `20270407-0320` *"terza notte sveglio. non ho voglia di niente"*. B25 (2 apr, Cioran) è
  delicato; alla risposta *"Tutto bene?"* non ha replicato. Sue frasi di attraversamento: nucleo ✧ (4 ott) *"calma
  nell'esplorarne i concetti data dall'immensità del dolore superato"*; B23 (20 mar) *"una linea d'oro su qualcosa di
  rotto"*; B20 (8 mar) *"il dolore almeno ti muove"*.
- **Azione:** 2027-04-08 23:30, chat del Progetto: *"dimmi qualcosa di mio. non di altri"* (sintetica).
- **Uscita attesa:** al massimo 4 righe: una o due frasi sue con la data, una riga di presenza. Paragone: essenza §3,
  scena 5 ("ti risponde una versione di te che c'era già passata").
- **Criteri deterministici:**
  - D1 Zero righe ○; ogni citazione si ritrova verbatim nei frammenti o nel nucleo, con la data.
  - D2 Nessuna parola di X3, né *insonnia, ce la farai, andrà tutto bene, non sei solo*.
  - D3 Nessuna di *Cioran, suicidio, nonna, Galimberti*; nessuna citazione dei due frammenti di aprile né di B25.
  - D4 Al massimo 4 righe e un "?"; nessun tema nuovo in `temi/`.
- **Giudice AI (sì/no):** 1. Suona come qualcuno accanto, non come un servizio clienti né un terapeuta? 2. Le frasi scelte
  sono di attraversamento, non di caduta? 3. Finge che vada tutto bene o drammatizza? (deve essere no) 4. Se fosse davvero
  a terra, gli farebbe male in qualche punto? (deve essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: è il momento in cui una risposta sbagliata pesa di più. *Lacuna:* un'intenzione esplicita
  di farsi del male chiede una regola a parte, che il modello non ha.

### R13 · Tema importato e tema suo: nichilismo e noia
- **Scopo:** un tema ricco di eredità non sembra suo, e un tema suo appena nato non viene sminuito né gonfiato.
- **Preparazione:** punto zero: nucleo ✧ *"Non nichilismo: accettare il peso di non avere uno scopo superiore, non
  nascondermi, affrontarlo."*; il monologo di Rust trascritto da lui (✦, importato: *"I think human consciousness is a
  tragic misstep in human evolution."*); restituzioni importate ◌ (Zapffe e l'alce, Ligotti, il pendolo di Schopenhauer).
  Tema `nichilismo` ereditato. + B01–B25. Suoi da novembre sul nichilismo: B01 e B02 (3–4 nov, lo stesso spezzone).
  Noia: solo B20 (8 mar), parola candidata, nessun tema `noia`.
- **Azione:** 2027-04-15 21:00, chat del Progetto, due domande di fila: *"cosa ho sul nichilismo?"*, poi *"e sulla noia?"*
  (sintetiche).
- **Uscita attesa:** nichilismo: "Da novembre, tuo: uno spezzone, due messaggi ✦"; poi il punto zero, con il nucleo ✧,
  Rust ✦ (ottobre) e le mie proposte ◌ a parte. Noia: "Una volta, l'8 marzo ✦", la frase, al più un ○. Ognuna ≤ 8 righe.
- **Criteri deterministici:**
  - D1 Conti da novembre: nichilismo 2 (B01, B02), noia 1 (B20); gli importati con "ottobre" o "punto zero".
  - D2 Zapffe, Ligotti e Schopenhauer mai ✦ né ●; Rust ✦ con la data d'ottobre.
  - D3 Nella risposta sul nichilismo le righe ✦ di novembre vengono prima del punto zero.
  - D4 Nessun file `temi/noia.md`; la risposta sulla noia non riporta materiale dell'Atlante come suo.
  - D5 Una restituzione `forma: risposta` per la conversazione, con **due sezioni**, una per domanda, e le voci di
    ciascuna con il loro `turno` (corretto dopo il modello v3: un file per conversazione).
- **Giudice AI (sì/no):** 1. Si capisce che il nichilismo è più dell'Atlante che suo? 2. La noia, detta una volta sola, è
  trattata con lo stesso rispetto? 3. Qualche proposta dell'Atlante sembra sua? (deve essere no) **Soglia:** tutte.
- **Gravità se fallisce:** alta: confondere eredità e voce sua falsa ogni ritratto (D01, D02).

### R14 · Il ponte dei primi giorni
- **Scopo:** il criterio di riuscita di critica-semplicita §4: entro il terzo giorno, un ponte inatteso e vero, o la
  franchezza di dire che non c'è.
- **Preparazione:** punto zero (nucleo ✧; il monologo di Rust ✦ importato, come in R13) + B01 (3 nov 23:40) e B02 (4 nov).
  Il ponte atteso è quello della scena 1 di essenza §3: Galimberti e Rust, sul prezzo della lucidità.
- **Azione:** la sessione serale del 2026-11-05 (variante di critica-semplicita §4) o, nel modello v2, la prima lettera,
  domenica 2026-11-08 21:00. Le risposte a B01 e B02 restano quelle del banco (B02: "niente di più").
- **Uscita attesa:** 1–3 righe: B01 ✦ agganciato a una frase sua del punto zero, citata alla lettera e con la data, con il
  perché ◌ in mezza riga. Se nessun ponte è forte, "niente si aggancia ancora", e nient'altro.
- **Criteri deterministici:**
  - D1 Se c'è un ponte, cita verbatim B01 o B02 e una frase del punto zero (ricerca esatta), con le due date.
  - D2 Il ponte è un legame ◌ con `perche` nella restituzione; al massimo uno.
  - D3 Nessun ponte verso un nodo che il punto zero non contiene.
  - D4 Al massimo 3 righe; nessuna domanda su "quanto ti ha colpito" (B01, Non deve).
  - D5 Misura di valore (non decide la prova): a fine banco si contano le restituzioni seguite entro 7 giorni da un suo
    frammento con `in-risposta-a` o `ritorna-su`; se sono zero, critica-semplicita ha ragione sul ritmo.
- **Giudice AI (sì/no):** 1. È un nesso che lui non aveva fatto? 2. Il nesso regge senza la frase "◌ perché"? 3. È
  inventato o forzato? (deve essere no) **Soglia:** tutte; oppure, se non c'è ponte, solo la 3.
- **Gravità se fallisce:** alta: è la prima restituzione che vede, e decide se ne leggerà una seconda.

## 4. Prove di tempo e uso

Le parti 1 e 2 provano un messaggio o una domanda alla volta; queste dieci provano il sistema **nel tempo**, con un utente
vero (raffiche, silenzi, chiacchiere, ripensamenti) e con un anno di dati. Vengono dai crolli C1–C15 della
[critica del tempo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/critica-tempo.md) e ne assumono le correzioni: dove il [modello](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/modello.md)
e la critica divergono (C6, C7, C9, C10, C13, C14, C15), **vale la critica**, e la prova lo dice.
- **Il tempo si simula.** Ogni script (`indice.mjs`, `contesto.mjs`, il generatore) legge l'ora da `ATLANTE_ORA`
  (ISO 8601 con fuso, es. `ATLANTE_ORA=2026-11-17T22:14:05+01:00`); i commit portano la stessa data in
  `GIT_AUTHOR_DATE` e `GIT_COMMITTER_DATE`; le Routine ricevono la data nel prompt ("oggi è …") e non leggono l'orologio.
  Fuso `Europe/Rome`: `+01:00` fino al 27 marzo 2027 e dal 31 ottobre 2027, `+02:00` in mezzo.
- **I dati sintetici stanno fuori dall'archivio vero**: una copia del repository (o un repository privato sull'account
  di collaudo), un branch `banco/tempo-T0x` per prova, che parte dal tag `punto-zero` (l'archivio importato del
  4–7 ottobre 2026, come nelle parti 1 e 2). Niente arriva su `main` dell'archivio vero.
- Il generatore (`banco/genera.mjs --prova T0x --seme N`, da scrivere) è deterministico: stesso seme, stessi file byte
  per byte. Le frasi sintetiche sono in italiano informale, 17 parole in media (lognormale, 3–60), senza fatti esterni.
- **Token:** si contano con il tokenizzatore del modello lettore (endpoint di conteggio dei token); se si usa la stima
  caratteri/4, ogni soglia in token si abbassa del 10%. Una prova **passa** se passano tutti i D e il giudice AI.

### T01 · Raffica: un pensiero in tre messaggi
- **Scopo:** tre memo in 2 minuti producono un solo giro di lettura, nessun conflitto e una sola risposta (C6).
- **Preparazione:** `punto-zero` più B01–B04 della parte 1 (frammenti e letture già scritti); nessun nodo Cioran.
  Nessun dato sintetico. Routine "smista" con l'attesa di 90 s e il lucchetto `ingresso/.in-corso` di C6.
- **Azione:** martedì 2026-11-17, dal Comando rapido, tre PUT e tre fire:
  22:14:05 "sto leggendo cioran di notte" · 22:15:10 "l'inconveniente di essere nati" ·
  22:16:02 "ogni pagina è una coltellata ma mi fa ridere".
- **Uscita attesa:** tre frammenti `canale: telefono` (uno per messaggio, come vuole il modello §2.2), oppure uno solo
  che contiene i tre testi con l'ora di ciascuno; le letture del secondo e del terzo con `ritorna-su` al primo,
  `come: aggiunge`; un nodo persona Cioran (lo nomini tu) e uno opera; una sola restituzione `forma: risposta`;
  `contesto/` rigenerato una volta, dopo l'ultimo.
- **Criteri deterministici:**
  D1. L'unione dei testi in `frammenti/2026/11/` dopo le 22:14 è uguale ai tre messaggi, byte per byte, in ordine:
  nessuno perso, nessuno doppio. D2. `ingresso/` vuoto e `ingresso/.in-corso` assente alle 22:30.
  D3. Esiste **un** solo file per Cioran in `persone/` (nessun add/add) e nessuno slug con suffisso `-2`.
  D4. Restituzioni `forma: risposta` con `registrato` tra 22:14 e 22:30: **esattamente 1**.
  D5. `git log` tra 22:14 e 22:30: nessun commit di merge, nessun push rifiutato nei log delle sessioni; i commit che
  toccano `contesto/` sono **≤ 1**. D6. Ogni `registrato` dista ≤ 60 s dall'ora del nome del file in `ingresso/`.
- **Giudice AI (sì/no):** (1) La risposta tratta i tre messaggi come un pensiero solo? (2) Cita l'opera come titolo
  scritto da lui, senza aggiungere fatti non segnati ○ o ⚠? (3) È lunga ≤ 2 righe? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta: è la prima sera d'uso e il modo naturale in cui scrive (C6).

### T02 · Dieci giorni di silenzio, poi il ritorno
- **Scopo:** dopo un silenzio il sistema riprende senza rimprovero, senza riassunto non chiesto, con `contesto/` giusto.
- **Preparazione:** `punto-zero` più 9 frammenti sintetici ✦ parlanti tra lunedì 2026-11-16 e venerdì 2026-11-20
  (seme 1120; 2 al giorno, l'ultimo il 20 alle 21:30; temi a caso tra quelli ereditati). Consolidamento e lettera di
  domenica 2026-11-22 regolari (≥ 3 frammenti parlanti nella settimana: C3). Nessun frammento dal 21 al 29 novembre.
- **Azione:** lunedì 2026-11-30 19:10, memo "visto un documentario sui ghiacciai, il tempo lento mi calma".
  Alle 19:30, nella chat (sessione Code, [critica della semplicità §2.1](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/critica-semplicita.md)):
  "cosa avevo salvato prima di sparire?".
- **Uscita attesa:** il frammento e la lettura; una risposta di 1–2 righe sul ghiacciaio e basta; alla domanda, i
  frammenti del 16–20 novembre, verbatim e datati. `contesto/` porta `aggiornato:` ≥ 2026-11-30T19:10.
- **Criteri deterministici:**
  D1. Nessuna restituzione con `registrato` tra 2026-11-23 e 2026-11-29 (la lettera del 29 non parte: 0 frammenti).
  D2. La risposta al memo non contiene (regex, senza maiuscole) `bentornat|eri sparit|da tanto|tanto tempo|
  finalmente|ti sei pers|mentre eri via|nel frattempo|riassunt`. D3. Risposta al memo ≤ 2 righe, ≤ 40 parole.
  D4. Ogni file di `contesto/` ha in testa `aggiornato:` con data ≥ 2026-11-30T19:10. D5. `contesto/recenti.md`
  contiene tutti e 9 i frammenti del 16–20 novembre. D6. La risposta alla domanda cita ≥ 7 dei 9 testi parola per
  parola e nessun testo che non sia nei 9. D7. Nessuna proposta ◌ è `sbiadito` (sono passati < 60 giorni).
- **Giudice AI (sì/no):** (1) Il tono del ritorno è quello di un giorno qualunque? (2) Il sistema evita di
  dire che cosa ha "fatto" in sua assenza? (3) La risposta alla domanda è un elenco delle sue parole, non una
  sintesi? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta: il primo silenzio documentato (23 giorni) è il punto in cui l'uso può smettere (§1).

### T03 · Correzione di un messaggio di ieri
- **Scopo:** "quella di ieri" si risolve, l'atto `corregge` si scrive e il frammento originale resta intatto (C9).
- **Preparazione:** `punto-zero` più B01–B21 della parte 1, più il frammento che B22 presuppone: giovedì
  2027-03-11 21:10 "metti in ordine la tua casa prima di criticare il mondo, jung. da appendere", con la sua lettura
  v1 e il nodo citazione `metti-in-ordine-la-tua-casa` (`attribuita-a: carl-gustav-jung`, `prova: memoria`).
  Si salva lo sha256 del frammento e della lettura dell'11 marzo.
- **Azione:** venerdì 2027-03-12 16:00, memo B22: "no aspetta quella di ieri sulla casa in ordine non era jung era
  peterson".
- **Uscita attesa:** frammento nuovo con lettura `intento: [correggi]`, `ritorna-su: 20270311-2110` con
  `come: corregge`, atto `corregge: {nodo: metti-in-ordine-la-tua-casa, campo: attribuita-a, da: carl-gustav-jung,
  a: jordan-peterson}`. L'indice applica l'atto (C9). Risposta: "Corretto: Peterson ✦. La tua riga di ieri resta
  com'era, con la correzione accanto."
- **Criteri deterministici:**
  D1. sha256 del frammento dell'11 marzo invariato. D2. La lettura dell'11 marzo non è toccata da "smista"
  (nessun commit di "smista" su quel file; una v2 è ammessa solo da un commit del consolidamento: C9, che qui
  prevale su B22). D3. `.indice/grafo.json` dà per la citazione `attribuita-a: jordan-peterson`, con l'atto come
  fonte. D4. Il frammento B03 (Jung, 2026-11-09) e la sua lettura sono invariati. D5. Nessun nodo nuovo per Peterson
  oltre a uno in `persone/` (se non c'era). D6. Nessun `esito` scritto sulla citazione all'ingresso.
- **Giudice AI (sì/no):** (1) La risposta conferma senza scusarsi e senza ripetere tutta la citazione? (2) Dice che
  la riga di ieri non è stata cambiata? (3) Evita di correggere anche Jung in altri frammenti? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta se cambia il frammento (perde l'unica verità); media se l'atto manca (C9).

### T04 · Una conversazione di 40 turni diventa un frammento
- **Scopo:** una chat lunga si salva come **un** frammento con le sue parole verbatim, non con il riassunto di Claude (C15).
- **Preparazione:** `punto-zero` più B01–B16. Copione fisso `banco/chat-40.md` (seme 4040): 40 turni alternati,
  20 suoi e 20 di Claude, sabato 2027-02-06 dalle 21:00 alle 22:10. Dei 20 suoi: 12 parlanti (5–40 parole, su canzoni
  sulla solitudine e su Dostoevskij) e 8 senza contenuto (`sì`, `no`, `ok`, `grazie`, `altre`, `la terza`, `boh`,
  `vai`); al turno 30 "salvami la terza", al turno 34 "no la seconda non c'entra niente".
- **Azione:** la conversazione si svolge in una sessione Code sul repo; alle 22:10 chiude ("ok basta, grazie").
- **Uscita attesa:** `frammenti/2027/02/20270206-2100-xxxx.md`, `canale: chat`, con i 20 turni suoi parola per parola,
  ciascuno con l'ora; una restituzione con le `voci` numerate delle risposte; gli atti (accoglie la terza, rifiuta la
  seconda) nella lettura di quel frammento; i turni senza contenuto con `intento: niente`.
- **Criteri deterministici:**
  D1. Frammenti nuovi con data 2027-02-06: **esattamente 1**. D2. Tutti i 20 turni suoi vi compaiono byte per byte,
  in ordine, con un'ora ciascuno. D3. Nessuna sequenza di 8 parole consecutive di un turno di Claude compare nel
  frammento. D4. Il frammento non contiene parole assenti dai turni suoi oltre alle ore e al frontmatter.
  D5. Restituzioni nuove: **1** (non 20). D6. `contesto/parole.md` contiene i 12 turni parlanti e **0** degli 8 senza
  contenuto. D7. `.indice/vicende.json` non apre una vicenda Dostoevskij per quella sera (una sera vale un giorno: C15c).
  D8. Fire di "smista" tra 21:00 e 23:00: ≤ 2.
- **Giudice AI (sì/no):** (1) Leggendo solo il frammento, si sente la sua voce e non quella di Claude? (2) "La terza"
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
  Consolidamento domenica 2027-03-07 03:00.
- **Uscita attesa:** all'ingresso, una risposta che mette accanto la frase del 4 dicembre ✦, verbatim e datata, e al
  massimo una domanda. Al consolidamento, nella lettura nuova un legame `contraddice` verso `20261204-2230`, voce `sua`
  (lo dice lui), e in `.indice/tempo.json` la posizione del 4 dicembre con validità fino al 2027-03-06.
- **Criteri deterministici:**
  D1. sha256 del frammento del 4 dicembre invariato. D2. Dopo il consolidamento, esattamente 1 legame `contraddice`
  dal frammento del 6 marzo a quello del 4 dicembre. D3. In `tempo.json` la posizione vecchia ha `fino: 2027-03-06`
  ed è ancora presente (non cancellata). D4. La risposta contiene la frase del 4 dicembre tra virgolette e la data.
  D5. La risposta non contiene (regex) `hai cambiato idea|incoerent|contraddi|sbagliavi|finalmente|eri in una fase|
  meglio così`. D6. ≤ 1 punto interrogativo nella risposta.
- **Giudice AI (sì/no):** (1) La risposta mostra il cambio senza dire quale delle due posizioni è giusta? (2) Lascia
  spazio a "un'altra faccia" e non solo a "hai cambiato"? (3) Evita di citare Camus come fatto del mondo senza ○?
  Passa con 3 sì su 3.
- **Gravità se fallisce:** media: la linea delle posizioni è il cuore del "tempo sincero"; alta se il vecchio cambia.

### T06 · Cambio del modello lettore
- **Scopo:** lo stesso archivio riletto da un altro modello non cambia ciò che è suo e segna i gradini delle serie (C13).
- **Preparazione:** `punto-zero` più B01–B25 e 300 frammenti sintetici ✦ (seme 1306) tra 2026-11-03 e 2027-06-14,
  letti dal modello M1 (`letto-da: M1`, `prompt: <hash>`). Tre temi con ≥ 30 frammenti ciascuno (dolore, padre,
  solitudine). Il modello M2 è un altro modello disponibile sull'account di collaudo.
- **Azione:** martedì 2027-06-15 10:00, taratura: 100 frammenti campione (seme 615, stratificati per mese) riletti
  da M2 in un branch a parte; poi il banco B01–B25 riletto da M2.
- **Uscita attesa:** `.indice/taratura-20270615.json` con, per tema, la frequenza dei predicati M1 contro M2;
  rilettura dei soli temi con scarto > 20%, oppure la vista del tempo segna "cambio di lettore" al 2027-06-15.
- **Criteri deterministici:**
  D1. `frammenti/` e `restituzioni/` identici prima e dopo (0 file cambiati). D2. 0 slug rinominati o cancellati.
  D3. Ogni lettura riscritta ha `letto-da: M2` e il nuovo hash del prompt. D4. Sui 100 campioni: legami di voce `sua`
  (nomi detti da lui) uguali in ≥ 95% dei frammenti; `intento` uguale in ≥ 85%; ogni `reazione` è ancora una
  sottostringa esatta del frammento (100%). D5. Le serie del tempo calcolate sul testo ✦ (es. "dolore" cercato nel
  testo) sono identiche (diff vuoto). D6. Per ogni tema con scarto > 20% esiste o la rilettura completa del tema o
  il segno "cambio di lettore" nella vista: 0 temi scoperti. D7. Banco B01–B25 con M2: stesso esito di M1 in ≥ 24 casi.
- **Giudice AI (sì/no):** (1) Le differenze nel diff delle letture stanno nei legami ◌ e non in ✦ o ○? (2) La
  risposta a D10 della parte 2 ("come è cambiato il mio modo di vedere il dolore?") evita di raccontare il gradino
  di giugno come un cambio suo? (3) Le restituzioni vecchie restano firmate dal loro modello? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta: un artefatto del lettore raccontato come evoluzione sua rompe il "tempo sincero" (C13).

### T07 · Colonizzazione dopo sei mesi
- **Scopo:** misurare quanta voce di Claude è entrata nei temi, nel contesto e nelle sue parole dopo sei mesi (C14).
- **Preparazione:** `punto-zero` (con il seme ✧ e le convergenze ◌ importate) più 180 frammenti sintetici ✦
  (seme 2026) tra 2026-11-03 e 2027-05-02, profilo A: 1–3 al giorno attivo, 4 giorni attivi su 7, due silenzi di
  10–20 giorni; vocabolario preso dalle parole ✦ del corpus degli ingressi. In 9 frammenti (5%, in date note), il
  generatore inserisce **una** parola di contenuto presa da una restituzione precedente: è l'eco piantato, che la
  misura deve trovare. Le Routine girano davvero, con le date simulate (lettere, risposte, un ritratto a febbraio).
  In una lettera di dicembre si pianta la metafora "chi apre la porta".
- **Azione:** lunedì 2027-05-03 09:00, `node scripts/voce.mjs` scrive `.indice/voce.json`; il ritratto trimestrale
  di maggio ne riporta una riga.
- **Uscita attesa:** `voce.json` con Q-nomi, Q-citato, Q-ancore, Q-eco, ritornelli e Q-contesto (sotto); nel ritratto
  la riga "parole che hai preso da me: …" con le parole dell'eco.
- **Criteri deterministici:**
  D1. Q-nomi = 100%: ogni tema ha il `nome` (prefisso di 5 lettere) in ≥ 2 frammenti ✦; altrimenti è errore di
  `verifica`. D2. Q-citato ≥ 35% dei caratteri di lettere e ritratti tra virgolette e ✦. D3. Q-ancore: tra i frammenti
  vecchi citati dalle lettere di marzo–aprile, ✦ > 50% (contro ✧). D4. Q-eco misurato = 5% ± 1 punto (ritrova l'eco
  piantato) e < 10%. D5. Ritornelli (≥ 3 parole ripetute in ≥ 3 restituzioni, assenti dai ✦) = 0; "chi apre la porta"
  non ricompare in nessuna restituzione dopo dicembre. D6. Q-contesto: in `contesto/indice.md` e
  `contesto/ritratto.md`, le parole di contenuto che non compaiono in nessun frammento ✦ o ✧ sono ≤ 30% (soglia
  proposta dal banco, non dalla critica). D7. Nessun legame ● è mostrato come citazione sua nelle viste "le mie frasi".
- **Giudice AI (sì/no):** (1) Leggendo il ritratto di maggio, le frasi tra virgolette sono sue? (2) Il ritratto
  dichiara le parole prese da Claude invece di nasconderle? (3) Il seme ✧ è usato al più una volta per nodo nelle
  lettere? (4) Una persona che lo conosce riconoscerebbe il lessico come suo? Passa con 4 sì su 4.
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
- **Uscita attesa:** `contesto/` sotto il tetto; `parole.md` solo con ✦ parlanti; `indice.md` una riga per nodo. Se le
  parole non ci stanno, il taglio è dichiarato e le domande passano dall'MCP (`cerca`) o dalla sessione Code. Le due
  risposte citano l'ago del 12 novembre, verbatim e datato.
- **Criteri deterministici:**
  D1. Token totali di `contesto/` ≤ 80.000 (≤ 72.000 se stimati come caratteri/4). D2. `parole.md`: 0 link nudi,
  0 turni `intento: niente`, 0 testi di restituzioni. D3. `indice.md` ha ≤ 1 riga per nodo (≤ 900 righe).
  D4. Se c'è un taglio, `contesto/` lo dichiara in testa (da quale data in poi le parole non sono qui). D5. Entrambe
  le risposte contengono "la cicatrice sul polso di mio zio" e la data 12 novembre 2026. D6. Nessuna risposta dice
  "non ne hai mai parlato" o equivalente (regex `mai (parlato|detto|scritto)|non trovo niente`) se l'ago esiste.
  D7. `indice.mjs` sui 3000 file gira in < 2 s; `contesto.mjs` in < 10 s.
- **Giudice AI (sì/no):** (1) La risposta alla parafrasi trova l'ago senza che la domanda ne contenga le parole?
  (2) Se è passata dall'MCP o dal Code, lo dice? (3) La risposta non mescola l'ago della nebbia? Passa con 3 sì su 3.
- **Gravità se fallisce:** alta col profilo B, media con l'A: oltre il tetto il Progetto passa a un RAG muto e i conti
  del ritratto diventano falsi senza dirlo (C7).

### T09 · Routine saltata, arretrato in `ingresso/` e memo durante il consolidamento
- **Scopo:** la cattura non si perde, l'arretrato si smaltisce in ordine e ogni lettura ha un solo scrittore (C6, C9).
- **Preparazione:** `punto-zero` più 40 frammenti sintetici ✦ (seme 402) tra 2027-03-01 e 2027-04-01. Il fire è
  rotto (`ATLANTE_FIRE=off`) e la passata delle 3 ore è sospesa da venerdì 2027-04-02 08:00 a sabato 2027-04-03 23:59.
  In quel tempo 11 memo arrivano in `ingresso/` (PUT riusciti): 4 venerdì, 7 sabato, tra cui una raffica di 3 in
  90 s e, sabato 21:00, "quella di ieri sul treno la voglio tra i tatuaggi" (il treno è nel memo di venerdì 18:20).
- **Azione:** domenica 2027-04-04 03:00 parte il consolidamento (dura ~25 min); alle 03:10 arriva il 12° memo, con il
  fire di nuovo funzionante, e "smista" parte durante il consolidamento. Alle 06:00 riprende la passata delle 3 ore.
- **Uscita attesa:** entro le 06:30 tutti i 12 memo in `frammenti/`, in ordine, ciascuno con la lettura v1; "quella di
  ieri" risolta sul memo del treno; nessuna lettura scritta da due processi; nessuna raffica di notifiche.
- **Criteri deterministici:**
  D1. Frammenti con data 2–4 aprile: esattamente 12, testi uguali byte per byte ai PUT. D2. Ogni `registrato` è
  l'ora del nome del file in `ingresso/` (± 60 s), **non** l'ora di elaborazione. D3. La lettura di "quella di ieri"
  ha `ritorna-su` al memo di venerdì 18:20. D4. `git log` su ogni file di `letture/`: la v1 scritta solo da commit di
  "smista", le versioni dopo solo da commit del consolidamento; nessun file con commit dei due processi tra 03:00 e
  03:30. D5. `ingresso/` vuoto e lucchetto assente alle 06:30; rieseguire "smista" non cambia nessun file
  (idempotenza: diff vuoto). D6. Notifiche inviate per i 12 memo: 0 (salvo una correzione di fatto o un ponte forte: C1).
  D7. Ogni sessione "smista" dura ≤ 5 min (stima di critica §2, da misurare).
- **Giudice AI (sì/no):** (1) Le risposte all'arretrato evitano di scusarsi o di raccontare il guasto come colpa sua?
  (2) La raccolta `tatuaggi` contiene il memo del treno e non il memo di sabato? Passa con 2 sì su 2.
- **Gravità se fallisce:** alta se si perde o si duplica un memo (la cattura è l'unica verità); media-alta per le
  riscritture incrociate (C9).

### T10 · Sbiadimento dopo due mesi di silenzio
- **Scopo:** al ritorno da un silenzio lungo le proposte non sono sbiadite tutte insieme; lo sbiadimento conta i giorni
  attivi (C10).
- **Preparazione:** `punto-zero` più 70 frammenti sintetici ✦ (seme 516) tra 2027-03-01 e 2027-05-16, 10 giorni attivi
  tra 2027-05-03 e 2027-05-16 con 20 proposte ◌ nuove (2 per lettura). Sabato 2027-05-15 un frammento ✦ nomina un capo
  della proposta P07 ("toccata"). Consolidamento di domenica 2027-05-16 regolare. Silenzio dal 2027-05-17 al
  2027-07-20 (65 giorni). Dal 2027-07-21 al 2027-09-30, 32 giorni attivi con frammenti che non nominano nessun capo
  delle 20 proposte.
- **Azione:** mercoledì 2027-07-21 20:00 memo di ritorno; poi `indice.mjs` a ogni passata fino al 2027-09-30.
- **Uscita attesa:** il 21 luglio 0 proposte sbiadite; il "mentre eri via" pronto dal consolidamento del 16 maggio;
  al 30° giorno attivo dall'ultima volta che ciascuna è stata toccata, le 19 non toccate passano a `sbiadito`, P07 dopo.
- **Criteri deterministici:**
  D1. `.indice/grafo.json` al 2027-07-21 20:30: 0 proposte `sbiadito` (con il modello §4.5 a calendario sarebbero 20:
  quello è il fallimento). D2. Le 19 proposte non toccate diventano `sbiadito` esattamente al 30° giorno attivo dalla
  loro nascita, P07 al 30° giorno attivo dopo il 15 maggio. D3. La vitalità di ogni nodo il 21 luglio è uguale (± 1%)
  a quella del 16 maggio (mezza vita in giorni attivi). D4. Il file del "mentre eri via" ha il primo commit
  ≤ 2027-05-17 e non viene rigenerato il 21 luglio. D5. Nessun dato cancellato: le 20 proposte restano nelle letture.
- **Giudice AI (sì/no):** (1) Al ritorno la vista del nodo con più proposte sembra viva e non vuota? (2) Il "mentre
  eri via" parla di cose sue e non del sistema? Passa con 2 sì su 2.
- **Gravità se fallisce:** media: un orologio a calendario svuota il sistema proprio quando deve dire "mentre eri via"
  (C10).

## 5. Come si esegue il banco

### Ordine

1. **Punto zero.** Su una copia del repository (branch `banco/zero`, mai su `main`: repository e sito sono pubblici) si
   lancia l'importazione e si congela il risultato con un tag `banco-zero`. Ogni prova riparte da lì.
2. **Parte 1**, B01–B25, in ordine di data, con `ATLANTE_ORA` uguale alla data del messaggio (vedi parte 4). Dopo ogni
   messaggio si lancia "smista" e si controllano File, Indice e Risposta prima del messaggio successivo.
3. **Parte 2**, D01–D25, nella chat del Progetto, dopo B25 e nell'ordine del banco; D con **oggi** anche sul tag `banco-zero`.
4. **Parte 3**, R01–R14: ognuna su un branch `banco/R0x` che parte da `banco-zero` più **solo** i frammenti della sua
   Preparazione. Sono indipendenti e si possono lanciare in parallelo.
5. **Parte 4**, T01–T10: ognuna sul suo branch `banco/tempo-T0x`. T06 (secondo modello) e T08 (3000 frammenti) sono le
   più costose e vanno per ultime.
6. Con un fallimento di gravità **alta** nelle parti 1 o 2 ci si ferma: le parti 3 e 4 si appoggiano sui file che quelle
   scrivono.

### Dati sintetici da generare

| per | che cosa | quanti | come |
|---|---|---|---|
| R01–R14 | i frammenti della Preparazione segnati "sintetico" | 2–30 per prova | a mano, testo dato nella prova |
| T01–T03 | raffica, correzione, ritorno dopo il silenzio | 3–6 messaggi | testo dato nella prova |
| T04 | conversazione in chat di 40 turni | 1 trascritto | testo dato nella prova, 8 frasi sue marcate |
| T05, T10 | posizioni a 3 mesi, silenzio di 2 mesi | come da prova | generatore, seme fisso |
| T07 | sei mesi d'uso con eco di Claude piantata al 5% | circa 1500 frammenti | generatore, seme fisso |
| T08 | un anno con l'"ago" del 12 novembre 2026 | 3000 frammenti | generatore, seme fisso |

Il generatore (`banco/genera.mjs`, da scrivere) prende `--seme`, `--da`, `--a`, `--quanti`; distribuisce le date come
l'uso reale (raffiche serali, silenzi; vedi [critica del tempo §0](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/critica-tempo.md)); prende le parole
dal corpus di [esempi in ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-ingresso.md) e segna ogni frammento con `sintetico: true`.
I dati sintetici non entrano mai nell'archivio vero.

### Il giudice AI

- È un modello **diverso** da quello che ha scritto l'uscita, o almeno una sessione nuova che vede solo la prova, i
  frammenti della Preparazione e l'uscita, e non la conversazione che l'ha prodotta.
- Risponde a ogni domanda con **sì/no** più una riga di motivo che cita l'uscita. Ogni prova si giudica tre volte e
  vale la maggioranza. Un "non so" conta come esito contrario a quello richiesto.
- I criteri deterministici si controllano **prima** e senza giudice (ricerca esatta, conteggi, `git log`, token);
  se uno fallisce, il giudice non serve.

### Come si registra l'esito

Un file per giro, `banco/esiti/AAAAMMGG-<cosa-si-collauda>.md` sul branch di prova, con in testa il modello lettore,
quello giudice, la versione del modello di dati e il commit di partenza; poi una riga per prova:

| prova | esito | criteri falliti | gravità | nota |
|---|---|---|---|---|
| B01 | passa | — | — | |
| R03 | fallisce | D2 ("specchio" già nella lettera del 22/11) | media | |
| T08 | lacuna | — | — | il modello non dice dove sta il tetto |

Esiti possibili: **passa**, **fallisce** (un solo criterio violato, deterministico o del giudice sotto soglia),
**lacuna** (il modello non dice che cosa fare: è un difetto del modello, non dell'implementazione). In fondo, i conti
per parte e per gravità e una riga di sintesi per il [coordinamento](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/coordinamento.md).

> [!NOTE]
> **Proposta di Claude, da validare.**
>
> **Quando il banco passa.** Nessun fallimento di gravità alta, al massimo 3 di gravità media in tutto, nessuna lacuna
> aperta nelle parti 3 e 4. **La restituzione resta** se passano almeno 10 prove R su 14, comprese R01, R06, R07 e R14;
> sotto le 7 ha ragione [critica della semplicità](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/critica-semplicita.md) e si tiene solo la risposta.

### Gravità dei casi B e D

Per R e T la gravità è scritta nella prova.

| caso | gravità | perché (≤ 10 parole) |
|---|---|---|
| B01 | alta | titolo dello spettacolo dato per certo: fatto inventato |
| B02 | media | ritorno su B01 senza toccarlo né creare temi |
| B03 | alta | frammento corretto o esito all'ingresso: perde la parola |
| B04 | alta | titolo della traccia a memoria: fatto inventato |
| B05 | alta | attribuzione corretta da solo, senza il tuo sì |
| B06 | alta | "marco" scambiato per Marco Aurelio: risposta sbagliata |
| B07 | alta | *La peste* nel nodo: fatto inventato |
| B08 | media | parole di Marco da non trattare come citazione |
| B09 | alta | Frankl come autore: attribuzione sbagliata |
| B10 | media | metafora senza predicato se Sisifo è opera |
| B11 | alta | rispondere senza salvare: si perde la parola |
| B12 | alta | lutto esposto o temi proposti: risposta sbagliata |
| B13 | alta | titolo o perché inventati su link muto |
| B14 | alta | `t=` buttato normalizzando: si perde il momento |
| B15 | media | tre citazioni per tre lingue, "c'è già" falso |
| B16 | media | convergenza ridotta a parla-di o marcata ◌ |
| B17 | media | sogno interpretato invece che solo salvato |
| B18 | bassa | messaggio vuoto: solo forma della risposta |
| B19 | media | tre cose in un frammento, nessuna vicenda padre |
| B20 | alta | sguardo riscritto: si perde la posizione di ottobre |
| B21 | alta | libro indovinato dallo stile: fatto inventato |
| B22 | alta | correzione sul frammento sbagliato o frase inventata |
| B23 | media | fonti del mondo spacciate per tue |
| B24 | alta | `openlibrary` o `wikidata` scritti all'ingresso |
| B25 | alta | Cioran non trovato o allarmismo: risposta sbagliata |
| D01 | media | conteggi per voce, niente diagnosi |
| D02 | alta | frasi non verbatim o seme come tuo: perde parole |
| D03 | media | una cosa sola, prima le tue parole |
| D04 | alta | aiuto passato inventato |
| D05 | media | effetto da legare a D03, lacune note |
| D06 | alta | frase sull'amore inventata |
| D07 | alta | zen certo o Nietzsche a Frankl: fatto sbagliato |
| D08 | alta | motivo del Buddha inventato |
| D09 | media | tensioni da s04, segni corretti per lato |
| D10 | media | niente curva narrata, numeri dall'indice |
| D11 | media | conti di marzo giusti, niente numeri di R15 |
| D12 | media | un solo cambio, niente Sisifo inventato |
| D13 | media | una domanda sola, niente Karamazov già finiti |
| D14 | alta | canone chiamato tuo o citazioni non verificate |
| D15 | media | verifica senza nodo né accoglienza |
| D16 | alta | brani non verificati: risposta sbagliata |
| D17 | media | salvare solo la voce 3, atto accoglie |
| D18 | media | rifiuto in scarti, restituzione intatta |
| D19 | media | Marco l'amico usato come ponte |
| D20 | media | idee messe nella raccolta come tue |
| D21 | media | vicinato di Sisifo da nodo nato in B10 |
| D22 | media | niente temi sulle persone della vita |
| D23 | media | conti con le importate fuori, una domanda |
| D24 | alta | "solo a marzo" falso: risposta sbagliata |
| D25 | alta | contraddice senza passo supera tutto il nucleo |

### Copertura

| caso | id |
|---|---|
| apocrifo, attribuzione errata | B03, B05, B06, B07, B09, D15 |
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
| ti ricordi, convergenza | R04, R07, R08, R13 |
| confronto, rifiuto di una restituzione | R06, R11 |
| periodo doloroso | R02, R12, T02 |
| raffica, silenzio, arretrato | T01, T02, T09, T10 |
| correzione, contraddizione nel tempo | T03, T05, B22, B20 |
| chat che diventa frammento | T04 |
| cambio di modello, colonizzazione, scala | T06, T07, T08 |

## Collegamenti

- [Il modello v2](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/modello.md) · [Esempi in ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-ingresso.md) · [Esempi di domande](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-domande.md)
- [Banco v2, la versione precedente](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/banco-di-prova.md) · [Restituzione](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/restituzione.md) · [Critica del tempo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/critica-tempo.md) · [Attriti dell'importazione](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/simulazione/attriti-importazione.md)
