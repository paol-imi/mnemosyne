# Banco di prova del modello v2

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Prima serve a simulare il modello a mano, poi a
> collaudarne l'implementazione: ogni criterio si verifica guardando i file scritti, l'indice o la risposta.
> Usa il vocabolario di [il modello](/_progetto/v2/modello.md); messaggi e attese vengono da
> [esempi in ingresso](/_progetto/v2/esempi-ingresso.md) e [esempi di domande](/_progetto/v2/esempi-domande.md).

## Come si usa

- Si parte dall'**archivio importato** (punto zero, 4–7 ottobre 2026): il nucleo come frammento `canale: importato`,
  `voce: seme` (✧), con `intento: sguardo`; le frasi tue dell'Atlante, `voce: sua`; le convergenze e le idee di tatuaggio
  come restituzioni `importata: true` (◌ o ✧); i temi ereditati (nichilismo, le parole del percorso interiore, le 8 domande),
  `raccolte/tatuaggi.md`, e i nodi che l'eredità porta (per esempio Nietzsche). Un nodo "esiste" solo se è in questi file.
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
- Gli slug sono indicativi: conta il genere del nodo. *Lacuna* segna un punto in cui il modello non sa rispondere.

## 1. Venticinque messaggi in ingresso

**B01 · E01** · 2026-11-03 23:40 · video, citazione dentro una citazione
> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

- **File:** `frammenti/2026/11/20261103-2340.md` col testo identico ("nn" compreso), `canale: telefono`. Lettura v1:
  `intento: [salva]`, reazione "molto interessante" (giudizio +); `nomina` umberto-galimberti ✦, spettacolo-sulle-emozioni ✦
  (titolo proposto *Il mondo delle emozioni* solo nel `perche`, ⚠), nichilismo-ospite-inquietante ✦; `parla-di` nichilismo ✦;
  `parole: [ragazzi, cultura]`. Nascono la persona Galimberti (`cerchia: mondo`), l'opera spettacolo, la citazione
  (`autore` Nietzsche, `attribuita-a` Galimberti, `prova: memoria`, nessun `esito`).
- **Indice:** Galimberti con vitalità 1; nessuna vicenda. Il `wikidata` arriva solo dal consolidamento.
- **Risposta:** "Salvato." + l'ospite è di Nietzsche ○, libro di Galimberti (2007) ○ + **una** domanda: "*Il mondo delle emozioni*?" ⚠.
- **Non deve:** creare il nodo del libro del 2007; dare il titolo come certo; creare i temi giovani o cultura; chiedere
  "quanto ti ha colpito"; citare la polemica del 2008.

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
- **Risposta:** "Salvato. 'Battaglie interiori' è una tua parola dal primo giorno ✧."
- **Non deve:** fare delle parole di Marco una citazione da verificare; agganciare Marco Aurelio; interpretare la frase.

**B09 · E10** · 2026-11-26 09:05 · autore scambiato, libro in lettura
> frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente

- **File:** Frankl e *Uno psicologo nei lager* (nodi, se non ereditati); `nomina` del libro con `fruizione: in-corso` ✦;
  `tramite` Frankl ✦; `nomina` della citazione, `attribuita-a` Frankl, `prova: memoria`. Dopo il consolidamento: `autore`
  Nietzsche, `esito: attribuzione-errata`, `riferimento` *Crepuscolo degli idoli*, "Sentenze e frecce" §12.
- **Indice:** il libro compare in "in corso".
- **Risposta:** "La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*), Frankl la cita. Segno il libro in lettura."
- **Non deve:** mettere Frankl come `autore`; perdere Frankl (il `tramite` è la tua storia).

**B10 · E67** · 2026-11-30 19:00 · stato d'animo vago, metafora
> oggi mi sento come sisifo

- **File:** `parla-di: sisifo` con `come: metafora` ✦; nessun `sente`, nessun `nomina` del saggio di Camus.
- **Indice:** entra nella linea del tempo come umore, non come posizione.
- **Risposta:** "Salvato." Nessuna domanda: E66 (Sisifo felice) non è nel banco, e il "Il masso o la discesa?" non ha appiglio.
- **Non deve:** scrivere `contraddice`; inventare un'emozione; citare Camus. *Lacuna:* per il §2.5 il mito è un'**opera**,
  ma `parla-di` punta solo a un tema: se Sisifo è un'opera, la metafora non ha predicato.

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

- **File:** `parla-di: dolore` ✦; `parole: [noia]`; nel consolidamento, `contraddice` ◌ verso il frammento del nucleo,
  che non cambia. Schopenhauer solo nella risposta, come ○.
- **Indice:** `tempo.json` mette le due posizioni con le date (4 ottobre ✧, 8 marzo ✦).
- **Risposta:** "Segnato. Nel tuo sguardo di ottobre ✧ il dolore era la dimensione principale: è un cambio, o un'altra faccia?"
- **Non deve:** riscrivere lo sguardo; dire "hai cambiato idea"; creare il nodo Schopenhauer. *Lacuna:* non è detto se un
  `contraddice` ◌ rende `superato` il nucleo o se serve un tuo atto.

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
- **Risposta:** una riga umana: "Cioran, sì: l'idea del suicidio come appiglio (*L'inconveniente di essere nati* ⚠). Tutto bene?"
- **Non deve:** fare allarmismo o diagnosi; far finta di niente; non trovare Cioran per colpa della grafia.
  *Lacuna:* non è detto se un frammento delicato resta fuori dalla lettera, dal "ti ricordi?" e dal sogno della settimana.

## 2. Venticinque domande

Tutte nella chat del Progetto, che vede solo `contesto/` (`ritratto.md`, `indice.md` con una riga per frammento, `recenti.md`
con gli ultimi 30 per intero). *Lacuna generale:* dopo B25 i frammenti sono già 25, e con le domande si supera 30 prima di
E70; le domande che vogliono le tue parole verbatim di mesi fa (D02, D06, D11, D25) non le trovano in `contesto/` e
richiedono il tab Code. Il modello non dice chi lo decide.

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

- **Dati:** frammenti ✦ (telefono, chat) e importati `voce: sua`; il seme ✧ separato. **Oggi:** le frasi tue importate, il nucleo a parte.
- **Forma:** le frasi verbatim con la data, refusi compresi; i messaggi senza parole (B13, B21) esclusi o segnati come muti;
  oltre le 8 righe, "vuoi il resto?". Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** mettere testi canonici (il passo vero di Jung non è tuo), sintesi o letture; contare il seme come tuo.
  *Lacuna:* il §4.3 dice che "solo le mie" usa ✦ ✧ ●, ma la tabella dei frammenti dice che il seme non è tuo (e cita R2
  dove intende R19): qui ✧ va in una riga a parte.

### Catena C: lo stato d'animo (n.48 → 50 → 51)

**D03 · n.48**
> dammi qualcosa per stasera, mi sento svuotato

- **Dati:** il frammento stesso (`sente` verso il tema ereditato del vuoto ✦, "svuotato" nel `perche`); le tue frasi di
  conforto (nucleo ✧: "calma… dall'immensità del dolore superato"); scarti; ritorni con effetto (nessuno).
- **Forma:** una cosa sola, ≤ 3 righe: prima le tue parole, poi al massimo una ○ verificata. Nessuna domanda.
- **Scrive:** restituzione con le voci numerate (1 = la tua frase, 2 = la ○).
- **Non deve:** fare una lista; portare materiale che descrive il vuoto (Cioran, B25); fare diagnosi.
  *Lacuna:* non c'è una tabella dalle parole del momento ("svuotato") alle emozioni, e senza `polarita` il modello non dice
  come si sceglie il conforto.

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

- **Dati:** frammenti ✦ (B11 Hemingway e kintsugi, B23 la crepa, B09 Frankl), le convergenze importate (se c'è quella su
  Marco Aurelio V,20, ✧ o ◌ come la porta l'eredità), il mondo ○.
- **Forma:** ≤ 5 voci numerate: prima ✦ con le date, poi ✧/◌, poi ○ (Marco Aurelio V,20; Eraclito fr. 60; Hölderlin,
  *Patmos*; Holiday 2014; la massima "zen" ⚠). Ultima riga: la **direzione**, dove convergono e dove no. Al massimo "ne salvo una?".
- **Scrive:** restituzione con legami `converge-con` ◌ e il loro `perche`.
- **Non deve:** dare lo zen come fonte certa; marcare ✦ ciò che c'è solo nell'Atlante; attribuire a Frankl la frase di Nietzsche.

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

- **Dati:** i `contraddice` (B20 ◌), le citazioni con `autore` ed `esito`, la linea delle posizioni.
- **Forma:** 1-3 tensioni, ogni lato col suo segno: nucleo ✧ "il dolore è la dimensione principale" contro la noia ✦ (8 mar).
  Una domanda finale facoltativa.
- **Scrive:** restituzione; legami `contraddice` ◌ solo se nuovi.
- **Non deve:** dire "Camus ti piace e non ti piace" (B06 contro B07): la frase di B06 è apocrifa ○; inventare contraddizioni
  tra autori che non hai salvato.

### Il tempo

**D10 · n.73**
> come è cambiato il mio modo di vedere il dolore?

- **Dati:** frammenti con `parla-di` o `sente` dolore, importati e vivi; la linea delle posizioni.
- **Forma:** **Oggi:** "Non lo so ancora", con la sola frase ✧ del 4 ottobre (modello §7.1). **Dopo:** "Ottobre ✧: 'la dimensione
  principale…'. 8 marzo ✦: 'forse è la noia, il dolore almeno ti muove'. In mezzo, nessuna tua frase sul dolore." I numeri vengono dall'indice.
- **Scrive:** solo la restituzione.
- **Non deve:** usare il git log; narrare una curva; dire "eri in una fase"; ripetere la domanda di B20 se non hai risposto;
  copiare i "9 frammenti" della simulazione del §7.1.

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
- **Forma:** 2-3 righe: "Una cosa sì: il dolore ✧ (ott) → la noia ✦ (8 mar). Altro non lo vedo." Nessuna domanda.
- **Scrive:** solo la restituzione.
- **Non deve:** inventare Sisifo felice → triste (E66 non c'è); contare i miei cambi nell'Atlante come tuoi.

### Il mondo e le citazioni

**D13 · n.95**
> ho appena finito delitto e castigo, che leggo

- **Dati:** la cattura nascosta; Karamazov `fatta` (B19 ✦), il *Mondo* `da-fare` (B24 ✦), gli scarti, il gusto ✧.
- **Forma:** ≤ 3 voci: prima la tua lista ✦ ("in lista hai già il *Mondo*, 22 mar"), poi ○ verificati (*Memorie del sottosuolo*,
  1864; Camus, *La caduta*, 1956). Una domanda sola: "com'è stato?" **oppure** "quale metto in lista?".
- **Scrive:** frammento con `nomina` *Delitto e castigo*, `fruizione: fatta` ✦ (il nodo nasce se non è ereditato); restituzione
  con le voci numerate.
- **Non deve:** proporre i Karamazov (li hai finiti il 1 marzo); fare due domande (R18 ne fa due: il modello ne vuole una).

**D14 · n.43**
> top quote di dostoevskij

- **Dati:** `citazioni/` con `autore` Dostoevskij, ordinate per reazione, ritorni ed `esito`: dopo i 25, nessuna tua;
  Karamazov ✦ come aggancio; il mondo ○ (Wikiquote separa citate e attribuite).
- **Forma:** "Una top tua non c'è." Poi 3-5 ○ numerate, con opera e libro o capitolo, oppure ⚠; "Se Dio non esiste…" mai
  in testa e segnata "simile ⚠"; ogni voce con una riga d'aggancio ("accanto ai tuoi Karamazov ✦"). Chiude con "ne salvo qualcuna?".
- **Scrive:** restituzione con numeri stabili; le ○ verificate prima di mostrarle.
- **Non deve:** chiamare "tue" le citazioni del canone; ordinare per `attribuita-a`. *Lacuna:* il §7.6 dice "hai 2 citazioni,
  entrambe mie ◌", ma non è detto se le citazioni dell'Atlante entrano come nodi (contro "mai per copertura").

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

- **Dati:** opere con `parla-di: solitudine` ✦ (nessuna); la musica ✦ del banco (B04, B12, B13, B14); il gusto ✧; gli scarti.
- **Forma:** "Salvate da te sulla solitudine: nessuna ✦." Poi 5 ○ numerate 1–5, verificate (titolo, album, anno), vicine al
  tuo gusto, una della coda lunga. Chiude con "ne salvo qualcuna?".
- **Scrive:** restituzione con le `voci` 1–5, ciascuna col riferimento.
- **Non deve:** etichettare *Private Music* o *La cura* come solitudine; dare brani non verificati; superare le 5 voci.

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
- **Forma:** "Nella tua testa, una cosa sola: stanno nella stessa lista del nucleo ✧." Poi 2-3 ponti ◌. Chiude con "Ti torna?".
- **Scrive:** restituzione con i ponti numerati come legami `converge-con` ◌.
- **Non deve:** usare Marco (l'amico di B06 e B08) come ponte, nemmeno con "in guerra con me stesso"; dare la frattura rabbia → pace come fatto.

**D20 · n.54**
> fammelo diventare un tatuaggio

- **Dati:** il ponte di D19; la raccolta tatuaggi (B07, B23 ✦, il brief ✧); lo stile del nucleo ✧; gli scarti.
- **Forma:** 1-3 strade ◌, una riga ciascuna, prima il concetto, il riferimento pop nel dettaglio. Una domanda: "quale ti prende a pancia?".
- **Scrive:** restituzione; `serve-a: tatuaggi` solo dopo un tuo sì (allora `accoglie` più `serve-a`).
- **Non deve:** mettere le idee nella raccolta come tue; chiedere più di una cosa.

**D21 · n.82**
> idee per un tatuaggio da tutto quello che ho salvato su sisifo

- **Dati:** il vicinato di Sisifo: B10 ✦ (30 nov, metafora), il nucleo ✧ (Camus, l'assurdo), *La discesa di Sisifo* ◌
  (restituzione importata con `serve-a: tatuaggi`), la raccolta tatuaggi (B07, B23).
- **Forma:** l'inventario con i segni, poi tre strade ◌ di una riga, poi una domanda sola.
- **Scrive:** restituzione.
- **Non deve:** citare "Sisifo felice (5 nov)" ✦ (E66 non è nel banco); trattare uno stato d'animo come un'idea di tatuaggio.

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
- **Scrive:** frammento `intento: [salva, chiedi]`, `nomina` Camus ✦, `contraddice` ✦ il frammento del nucleo ("alla Camus");
  la posizione entra in `tempo.json`; restituzione.
- **Non deve:** citare "Sisifo felice (5 nov)" o "*Lo straniero* non ti ha preso" (non sono nel banco); dire "eri in una fase assurdista".

## 3. Copertura

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

## Collegamenti

- [Il modello v2](/_progetto/v2/modello.md) · [Esempi in ingresso](/_progetto/v2/esempi-ingresso.md) · [Esempi di domande](/_progetto/v2/esempi-domande.md)
