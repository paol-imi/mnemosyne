# Attriti della simulazione d'ingresso

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Raccoglie gli attriti emersi simulando
> [il modello](/progetto/v2/modello.md) sui 25 messaggi di [il banco](/progetto/v2/banco-di-prova.md):
> i file, le risposte e i costi sono in [la simulazione](/progetto/v2/simulazione/ingresso.md).

## In breve

- **Verdetto:** 14 passano, 10 passano male, 1 fallisce (B21). La simulazione ne dava 17 e 8: ho abbassato B09, B19 e B25,
  e B21 fallisce perché manca un punto di **File**. Consolidamento e lettera: passano male.
- **A1** Le domande all'ingresso hanno quattro regole che si contraddicono: un elenco unico nel §4.1.
- **A2** L'importazione del punto zero non ha regole (voci del nucleo, date, nomi, domande senza frammento): una tabella d'import nel §2.5.
- **A3** Il caso Galimberti (§5.2) viola il §3.1 e il §8.5 (Nietzsche nodo, `wikidata` e `originale` all'ingresso): riscriverlo.
- **A4** Il "mentre eri via" scatta 3 volte su 5 e diventa un ritornello: soglia legata al ritmo, contenuto fissato.
- **A5** Un consolidamento saltato non ha regola, e la settimana non ha confini: "dall'ultimo consolidamento riuscito".

## Verdetto sui criteri del banco

| caso | esito | motivo |
|---|---|---|
| B01 | passa | file e risposta coincidono; Nietzsche in chiaro (§8.5), niente `wikidata` (§3.1 contro §5.2) |
| B02 | passa | `ritorna-su` aggiunge, nessun tema "greci", frammento di ieri intatto |
| B03 | passa | nodo Jung, reazione d'impatto, nessun esito; la scheda trovata al passo 1 finisce nel corpo |
| B04 | passa male | il modello rinvia il titolo (§2.6): la domanda diventa "ti ricordi il titolo?" invece di "La 3 è X?" |
| B05 | passa | Recalcati ○ senza nodo, "Correggo?"; il sì però non ha un atto scrivibile (A11) |
| B06 | passa | Marco `vita`, `apocrifa` dal passo 1, reazione − |
| B07 | passa | Camus `autore`, `serve-a: tatuaggi`; *La peste* resta solo nel `perche` (lacuna confermata) |
| B08 | passa male | la risposta dice ✦ dove il banco dice ✧; "ci ha preso" letto come identificazione, non giudizio |
| B09 | passa male | **abbassato:** `autore: Nietzsche` scritto all'ingresso, mentre il banco lo vuole dal consolidamento |
| B10 | passa | `parla-di` metafora, nessun Camus; nasce il nodo Sisifo (non elencato) |
| B11 | passa | salva e chiede; kintsugi nasce per il §2.6, contro il §4.1.4 (A7) |
| B12 | passa | riga umana, nonna Lina `vita`; l'esclusione dalla lettera non ha un campo (A9) |
| B13 | passa | `?si=` conservato, link pulito; l'artista viene dalla pagina, non dall'oEmbed |
| B14 | passa male | video inesistente (404): niente titolo né canale, fallback preso per analogia da B13 |
| B15 | passa | pin normalizzato, una sola citazione; il "(1899)" detto come prima parte |
| B16 | passa male | manca il Platone ○ (un aggancio solo, §4.3); in più un "mentre eri via" non previsto |
| B17 | passa | nessuna interpretazione, niente Telemaco; c'è un "mentre eri via" in più |
| B18 | passa | `intento: [niente]`, "Ci sono." |
| B19 | passa male | **abbassato:** la risposta cita "la lettera del 15 febbraio" (era domenica 14) e apre col "mentre eri via" su una giornata col litigio |
| B20 | passa male | manca "è un cambio, o un'altra faccia?": il §6.5 vieta la domanda all'ingresso |
| B21 | fallisce | **abbassato:** mancano due punti di File: il `.webp` non è ridimensionato (nessuno lo fa) e manca `originale`; manca anche "Da che libro?" |
| B22 | passa | nessun atto, "me la riscrivi?"; la domanda però non la prescrive il modello |
| B23 | passa male | mancano Cohen ○ e "Te le metto in fila?": un aggancio solo, nessuna domanda |
| B24 | passa male | manca "forse meglio partire da lì?", non ammessa all'ingresso |
| B25 | passa male | **abbassato:** niente "Tutto bene?" né libro (che era sbagliato); la riga umana c'è, ma la risposta non è quella del banco, come B20 e B24 |
| Consolidamento e lettera (4 aprile) | passa male | la lettera rispetta le regole di forma (frase datata, direzione, fatto ○ verificato, un "ti ricordi?", B12 e B25 fuori); ma recupera tre settimane senza regola, l'importanza del "ti ricordi?" è stimata a mano, vicende e serie `sente` restano vuote |

**Totali sui 25 casi:** 14 passano, 10 passano male, 1 fallisce. Nessun "Non deve" accade in nessun caso: i cedimenti sono
risposte più povere di quelle attese e punti di File che il modello non assegna a nessuno.

## Attriti

### Gravità alta

**A1 · Le domande all'ingresso: quattro regole in conflitto.** **gravità** alta.
Dove: B20; si ripete in B04, B21, B22, B23, B24, B25.
Il §6.5 dice che il link muto è "l'unico caso" di domanda; il §4.1 (2.3) la ammette per l'entità ambigua, il §6.6 per Sisifo,
il §4.3 riserva la domanda-confronto alla lettera. Il banco ne vuole sei che il modello vieta.
**Correzione al modello:** nel §4.1, punto 2.5, un elenco unico: «la risposta fa al massimo **una** domanda, solo se: entità
ambigua con errore permanente; link muto; riferimento che non si risolve ("me la riscrivi?"); testo da foto senza fonte
("Da che libro?"); una tensione fresca con lo sguardo (una volta per tema); un frammento delicato può chiudere con "Tutto
bene?"». Il §6.5 e il §6.6 rinviano lì.

**A2 · L'importazione del punto zero non ha regole.** **gravità** alta.
Dove: punto zero; si ripete in B08 (✦ contro ✧) e in C (ID mancanti).
Il nucleo mescola voce sua (U1, U3, U11–U17) e passi misti, ma il §2.5 lo vuole un frammento solo `voce: seme`; il corpo
"esatto" ha titoli, link e un blocco proposta; un frammento importato può venire da più righe; `registrato` non ha ora;
i nomi collidono nello stesso minuto; le 8 domande nascono senza frammento e con una `voce` che è dei legami, non dei nodi;
il brief tatuaggi non ha un testo unico; lo sguardo ha due date (4 e 5 ottobre); `sente` su undici emozioni di un racconto.
**Correzione al modello:** nel §2.5 una tabella d'import, riga per riga U/M: in quale frammento finisce e con che voce.
Più cinque regole: corpo = testo della fonte senza markup di navigazione (il resto nel `link`); un frammento importato può
unire più righe di una nota (numeri di riga nel `link`); `registrato` = commit della fonte, il limite "≤" va in `vissuto`;
suffisso obbligatorio per frammenti e restituzioni importati; le 8 domande nascono da un frammento importato "le 8 domande"
con legami ◌, i nodi non hanno `voce`. Lo sguardo ha una data sola. Il vocabolario delle emozioni entra con `parla-di`,
non `sente`. Gli alias importati vengono solo da parole sue nell'Atlante.

**A3 · Il caso Galimberti (§5.2) contraddice le regole che illustra.** **gravità** alta.
Dove: B01; si ripete in B09.
Il §5.2 usa `autore: friedrich-nietzsche` come nodo ereditato (il §8.5 non lo porta) e scrive all'ingresso `wikidata`,
`originale`, `traduzione` e `riferimento`, che il §3.1 rinvia al consolidamento; le date del frammento postumo non
concordano (1885-87, 1885-86, 1887-88).
**Correzione al modello:** nel §5.2 il nodo citazione all'ingresso ha solo `nome`, `attribuita-a`, `prova: memoria` e,
se il passo 1 lo dà, l'autore in chiaro; Nietzsche in chiaro; `wikidata`, `originale`, `traduzione`, `riferimento` nel
blocco "dopo il consolidamento"; anni "(da verificare)".

**A4 · Il "mentre eri via" diventa un ritornello.** **gravità** alta.
Dove: B16; si ripete in B17 e B19.
Con un ritmo mensile scatta in 3 messaggi su 5; non dice da dove viene la "una cosa" né in che file va; se nel silenzio non
è successo niente ripete "la lettera è ancora lì", anche su una giornata storta (B19).
**Correzione al modello:** nel §4.3, riga "quando torni": soglia relativa (il doppio dell'intervallo mediano, almeno 14
giorni); contenuto = una lettera o un ritratto non aperti, altrimenti niente; una riga dentro la stessa `forma: risposta`,
mai su un frammento delicato o d'impatto −. Togliere `forma: ritorno`.

**A5 · Consolidamento saltato e settimana senza confini.** **gravità** alta.
Dove: C; si ripete in B18 e B22.
Se la Routine "sogno" fallisce o un frammento resta in sospeso, il modello tace; B22–B25 cadono in quattro domeniche
diverse. Una settimana col solo "boh niente" fa partire una lettera.
**Correzione al modello:** nel §4.2: «la fase 1 copre tutti i frammenti dopo l'ultimo consolidamento riuscito (data in
`.indice/ultimo-consolidamento`); la fase 2 sceglie comunque una cosa sola; la settimana va da lunedì 00:00 a domenica
21:00; i frammenti con `intento: [niente]` non fanno partire consolidamento né lettera».

**A6 · Le notifiche premiano le correzioni e ignorano le domande.** **gravità** alta.
Dove: B11; si ripete in B05, B06, B07, B09 (4 correzioni notificate in dieci giorni).
Chi chiede "chi è che diceva…?" dal telefono non sa che la risposta c'è; intanto la correzione di fatto diventa la cosa
più notificata, contro la misura.
**Correzione al modello:** nel §4.3, colonna "forma" della prima riga: notifica senza contenuto quando l'intento comprende
`chiedi`, e per una correzione solo se tocca qualcosa che userebbe (un `serve-a`, una frase da tatuare); le altre stanno
in `contesto/recenti.md`. Nel §4.1: una correzione di fatto è solo un errore scritto dall'utente (B05 sì, B01 no).

### Gravità media

**A7 · Quando nasce un nodo: regole in conflitto.** **gravità** media.
Dove: B11; si ripete in B13, B16, B21, B23, B24.
Il §2.6 fa nascere kintsugi alla prima occorrenza, il §4.1 dice "nessun tema nuovo"; "eraclito il fiume" fa due nodi
perché i temi non hanno un "di chi"; una frase senza autore è citazione in B11 e parola in B23; un link muto e un "questa"
su una foto fissano subito uno slug immutabile.
**Correzione al modello:** nel §4.1 (2.4) «nessun tema *dedotto*: un concetto o un'immagine che nomini tu nasce in
`temi/`»; nel §2.2 un campo `di` per i temi con nome proprio (la persona nasce solo se nominata da sola); una frase
riconoscibile che riporti è citazione anche senza autore, un'immagine con nome comune resta parola finché non ritorna;
per il link muto e per la riga da foto il nodo nasce al primo ritorno o alla verifica, prima il testo sta nella lettura.

**A8 · Il passo 1 trova più di quanto può scrivere.** **gravità** media.
Dove: B03; si ripete in B07, B09, B11, B15, B25.
Il passo 1 è "apocrifi noti", ma trova anche autore vero, opera vera e schede secondarie, che si perdono in `prova: memoria`;
non è detto se l'attribuzione dell'utente va in `autore` o `attribuita-a`; l'opera sbagliata (*La peste*) non ha campo.
**Correzione al modello:** nel §3.1, riga "verifica, passo 1": «una-due ricerche sulla frase così com'è; se danno una scheda,
`esito` e `prova: secondaria` qualunque esito; altrimenti `prova: memoria` e la traccia nel corpo del nodo». Nel §2.2:
all'ingresso l'attribuzione dell'utente va sempre in `attribuita-a`, `autore` solo se verificato; `attribuita-a` ammette
un'opera in chiaro.

**A9 · I frammenti delicati non hanno un segno.** **gravità** media.
Dove: B12; si ripete in B25 e C.
La prudenza li vuole fuori da lettera, "ti ricordi?" e sogno, ma nessun campo lo dice: l'indice li riconosce solo con l'AI,
ogni volta. Nemmeno i temi vicini sono protetti (Schopenhauer due giorni dopo Cioran).
**Correzione al modello:** nel §2.2, lettura, un campo `cura: delicato`, scritto all'ingresso, letto dallo script, che cade
quando un tuo frammento ci `ritorna-su`; nel §4.1, "La prudenza": la lettera successiva non tocca il suo campo e lo dice
nel `perche`.

**A10 · Un aggancio solo, e il mondo non ci sta.** **gravità** media.
Dove: B16; si ripete in B23.
Il §4.3 ammette conto, ponte o correzione: un fatto del mondo che arricchisce senza correggere (Platone, Cohen) non ha posto.
**Correzione al modello:** nel §4.3, prima riga: aggiungere «un fatto del mondo ○, verificato, che la frase chiama»,
sempre uno solo.

**A11 · Idee attribuite e correzioni senza bersaglio.** **gravità** media.
Dove: B05; si ripete in B01 e B22.
"Correggo?" non ha un atto: `corregge` vuole `{nodo, campo}`, ma l'idea di Telemaco non è un nodo. Un'idea riferita
("i ragazzi stanno male per motivi culturali") non ha legame. "Quella di ieri" non risolta non ha destino, e "3 giorni" non
è definito.
**Correzione al modello:** nel §6.3 `corregge: {lettura, legame, da, a}` per le idee attribuite, e il sì crea il nodo della
persona giusta; nel §2.3 il `perche` del `nomina` di una persona può riportare "dice che…"; nel §4.1 (2.1) «se il
riferimento non si trova: nessun atto, una domanda; la finestra è di 3 giorni di calendario più oggi».

**A12 · Le persone della vita: nomi nudi, parentele, omonimi.** **gravità** media.
Dove: B06; si ripete in B19.
La regola "nome nudo → `vita`" sta solo nel §6.2; "mio padre" non è un nome nudo, e un alias "padre" catturerebbe Telemaco;
un secondo Marco non ha slug.
**Correzione al modello:** nel §4.1 (2.3): parentele in prima persona danno un nodo `vita` con slug fisso (papa, mamma,
nonna-…), alias solo col possessivo ("mio padre", "papà"); un secondo omonimo fa una domanda e prende uno slug con
l'iniziale, senza toccare il primo.

**A13 · Link che non si leggono.** **gravità** media.
Dove: B13; si ripete in B14 e C.
L'oEmbed di Spotify dà solo il titolo, non l'artista; per un link non muto che dà 404 il modello non ha fallback, e nessuno
riprova.
**Correzione al modello:** nel §6.5: «titolo dall'oEmbed, artista dalla pagina (`og:description`); se il link non si legge:
nessun nodo, il link nella lettura, "Salvato il link, non riesco a leggerlo"; il consolidamento riprova una volta».

**A14 · Allegati: percorso doppio e nessun ridimensionamento.** **gravità** media (fa fallire B21).
Dove: B21.
Il §2.2 dice "accanto, con lo stesso nome" e il campo `allegati` dice `img/…webp`; nessun passo ridimensiona.
**Correzione al modello:** nel §2.2 un percorso solo (accanto al frammento); nel §4.1 (2) il ridimensionamento è il primo
passo della Routine, prima della lettura.

**A15 · Il titolo della "la 3" non ha fonte all'ingresso.** **gravità** media.
Dove: B04; si ripete in C (*ecdysis* confermata solo dalla lettera).
Il §4.1 vuole **una** domanda su "la 3", il §2.6 rinvia la tracklist al consolidamento: la domanda non può proporre un titolo.
**Correzione al modello:** nel §2.6 una ricerca leggera della tracklist all'ingresso (pagina dell'album, nessun ID), o
nessuna domanda all'ingresso e "La 3 è X?" nella lettera.

**A16 · Oggetti in chiaro e voci del mondo.** **gravità** media.
Dove: punto zero; si ripete in B05, B10, B14, C.
`converge-con` e `nomina` puntano a cose che non sono nodi (Sisifo, Recalcati, il video), e quando il nodo nasce (Sisifo)
i vecchi legami non lo agganciano; i fatti ○ di una restituzione non hanno `prova` né `riferimento`.
**Correzione al modello:** nel §2.3 «un oggetto può essere un nome in chiaro; quando il nodo nasce, lo script lo aggancia
per alias»; un legame `mondo` verso una persona non nominata porta `attribuzione: probabile`; nel §2.2 le voci `mondo`
di una restituzione hanno `prova` e `riferimento`, con un esempio YAML di `voci`.

**A17 · Il ritorno spontaneo non si conta.** **gravità** media.
Dove: B19; si ripete in C.
Il riascolto di *La cura* è un secondo `nomina`, senza segno: il "ritorno che pesa più di un voto" (§4.4) resta fuori dalla
vitalità. E un ritorno ◌ vale quanto uno ✦ (kintsugi primo per un legame proposto).
**Correzione al modello:** nel §3.1: ogni `nomina` ✦ di un nodo già nominato da un frammento ✦ conta come ritorno (+1);
nella vitalità contano solo i ritorni ✦ e ●.

**A18 · Soglie del consolidamento che non scattano o non sono definite.** **gravità** media.
Dove: C.
L'importanza del "ti ricordi?" non ha formula; "2ª–3ª ricorrenza" è ambigua (`padre`, `mare` con referenti diversi);
vicende e serie `sente` restano vuote per cinque mesi.
**Correzione al modello:** nel §4.4 importanza = reazione d'impatto o identificazione, o `serve-a`, o un ritorno, esclusi i
delicati; nel §4.2 un tema nasce a 3 frammenti ✦ con lo stesso referente (2 se lo nomini tu); nel §3.1 le vicende con
soglia relativa (3 negli ultimi 15 frammenti) e un avviso nel ritratto se una serie resta vuota.

**A19 · Domande rimaste senza risposta.** **gravità** media.
Dove: C; si ripete in B01, B13, B22.
Il consolidamento non sa se ripeterle, chiuderle o portarle nella lettera.
**Correzione al modello:** nel §4.2: «una domanda senza risposta si chiude dopo 7 giorni senza atto e non si ripete; solo
quella su un'entità torna, una volta, nella lettera».

**A20 · `tramite` e citazione riportata.** **gravità** media.
Dove: B09; si ripete in B03, B06, B12, B15.
"Tramite Frankl" non dice che cosa è passato di lì, e Frankl, che dà il merito a Nietzsche, finisce in `attribuita-a` come
se sbagliasse lui. Non è detto se "X: frase" genera anche `nomina` di X (B03 sì, B06 no).
**Correzione al modello:** nel §2.3 `tramite` col qualificatore `di: <nodo>`; nel §2.2 un campo `citata-da` distinto da
`attribuita-a`; nel §6.2 «l'autore attribuito vive nei campi della citazione; `nomina` della persona solo se è nominata
fuori dalla frase».

**A21 · Miti col nome del protagonista.** **gravità** media.
Dove: B10.
Il §2.5 fa scegliere tra opera e persona `finzione`; "Il mito di Sisifo" è anche il saggio di Camus.
**Correzione al modello:** nel §2.5 un nodo solo in `persone/` (`cerchia: finzione`, `in: mito greco`); il mito come opera
solo se lo nomini come racconto; il saggio di Camus ha slug suo.

**A22 · Domanda all'AI o domanda a sé.** **gravità** media.
Dove: B16.
"Nel dubbio salva e chiedi" farebbe rispondere l'AI a "sono la stessa persona di 5 anni fa?", che il banco vieta.
**Correzione al modello:** nel §4.1 (2.2): `chiedi` solo per un fatto del mondo o dell'archivio; le domande su di sé sono
`salva`, con al più un `parla-di` ◌ verso una delle 8 domande.

### Gravità bassa

**A23 · Reazioni senza casella.** **gravità** bassa. Dove: B08; si ripete in B12, B17, B19.
"Ci ha preso" sta tra giudizio e identificazione; una commozione non è né + né −; "non avevo paura" non è un segnale.
**Correzione al modello:** nel §2.2 identificazione = "si riconosce in…", con "ci ha preso" tra gli esempi; `verso: misto`;
un segnale `stato` non pesato.

**A24 · Traduzioni e traduttore.** **gravità** bassa. Dove: B15; si ripete in C.
La forma inglese di Rilke non ha posto; Wikiquote dà edizioni senza traduttore.
**Correzione al modello:** nel §2.2 `traduzioni:` come elenco di {lingua, testo, traduttore, edizione}; `traduttore: da verificare` ammesso.

**A25 · Piccoli campi da fissare.** **gravità** bassa. Correzione al modello, una riga ciascuno:
- B02: nel §2.2 `momento` indica il punto dell'opera contenitrice anche se l'oggetto è una citazione.
- B04: nel §3.1 `anno` e `autore` all'ingresso solo se verificati.
- B05: nel §6.4 "padre" compare da E53, e "aspettare" sta nelle parole di E53.
- B15: nel §2.6 un pin dà `serve-a: tatuaggi` ◌.
- B17: nel §2.5 dire dove vanno i `simboli/` dell'Atlante (o che non entrano).
- B19: nel §2.2 `contesto` ammesso anche come qualificatore del singolo legame.
- B23: nel §2.2 `in-risposta-a` lo scrive la Routine nella lettura, solo se il memo riprende parole della restituzione.
- Punto zero: nel §2.5 `persone/` comprende i gruppi (Radiohead, Deftones); un tema nato da una negazione ("non nichilismo")
  lo dice nel `perche`.
- C: `forma: ricordi` solo quando il "ti ricordi?" esce da solo; candidato Wikidata vicino ma non identico → `wikidata: no`
  con il candidato in nota; `risolvi.mjs` con User-Agent e backoff anche per Wikidata (metà delle chiamate prende «too many
  requests»).

## Lacune del banco smentite

- **B04:** "in macchina, tutto di fila" ha un campo: `contesto` della lettura (§2.2). Resta vera la lacuna della tracklist (A15).
- **B10:** il §2.3 ammette `parla-di` verso qualunque nodo usato come immagine: la metafora ha il suo predicato.
- **B13:** il link pulito ha un campo, `link` della lettura.
- **B21:** il testo estratto ha un campo, `trascrizione`. Resta vera la seconda metà (il nodo nasce da un "questa", A7).
- **B11 e B16:** il §2.6 fa nascere kintsugi e la nave di Teseo; la lacuna diventa un conflitto col §4.1 (A7), non un vuoto.

Confermate: B05 (idea attribuita), B07 (opera sbagliata), B19 (ritorno spontaneo), B25 (frammento delicato).

## Errori del banco

- **B15:** *Libro d'ore* non è del 1899: il 1899 è la prima parte (*Il libro della vita monastica*); il volume esce nel 1905.
- **B25:** la frase di Cioran non risulta in *L'inconveniente di essere nati*: Wikiquote la dà nei *Sillogismi dell'amarezza*
  (1952; Adelphi 2007, p. 63).
- **B13:** l'oEmbed di Spotify non dà l'artista, solo il titolo. L'id è un brano reale (*Never Gonna Give You Up*).
- **B14:** l'id YouTube non esiste (oEmbed 404): titolo e canale attesi sono impossibili.
- **B07 e B11:** l'esito atteso è `verificata`, ma è `simile`: in B07 l'opera è sbagliata e la forma è parafrasata;
  in B11 lui scrive «alcuni», il testo dice «many».
- **Come si usa e B01 contro B09:** il banco porta Nietzsche tra i nodi ereditati, ma il §8.5 no; e vuole `autore` Nietzsche
  all'ingresso in B01, ma solo dal consolidamento in B09.
- **B20:** data il nucleo al 4 ottobre, l'eredità dice 5 ottobre (A2).
- Confermati dalle verifiche: B09 «Sentenze e frecce» §12; B16 *Cratilo* 402a; B05 Recalcati, Feltrinelli 2013; B04 *Private
  Music* 2025; B01 il libro di Galimberti del 2007.

## Costi

Ogni messaggio rigenera anche `contesto/` (3 file), non contato sotto. "Ricerche" comprende le richieste HTTP (oEmbed, pagine).

| caso | file toccati | ricerche | minuti | notifica |
|---|---|---|---|---|
| B01 | 6 | 3 | 3-4 | |
| B02 | 3 | 0 | 1-2 | |
| B03 | 5 | 1 | 2-3 | |
| B04 | 4 | 1 | 2-3 | |
| B05 | 4 | 2 | 3 | sì |
| B06 | 5 | 1 | 2-3 | sì |
| B07 | 4 | 2 | 3 | sì |
| B08 | 3 | 0 | 1-2 | |
| B09 | 6 | 3 | 3-4 | sì |
| B10 | 4 | 0 | 1-2 | |
| B11 | 5 | 1 | 3 | |
| B12 | 6 | 1 | 2-3 | |
| B13 | 4 | 2 | 2 | |
| B14 | 3 | 2 | 1-2 | |
| B15 | 5 | 2 | 3 | |
| B16 | 7 | 0 | 2 | |
| B17 | 4 | 0 | 1 | |
| B18 | 3 | 0 | <1 | |
| B19 | 6 | 1 | 2 | |
| B20 | 3 | 0 | 1-2 | sì |
| B21 | 5 | 0 | 2 (+OCR) | |
| B22 | 3 | 0 | 1-2 | |
| B23 | 3 | 1 | 2 | sì |
| B24 | 5 | 2 | 3 | sì |
| B25 | 5 | 2 | 3 | |
| **Totale** | **111** | **27** | **circa 55** | **7** |
| **Media** | **4,4** | **1,1** | **circa 2,2** | |

**A parte.** Punto zero: 21 file simulati (5 frammenti, 5 letture, 9 nodi sui 33 dello script, 2 restituzioni).
Consolidamento del 4 aprile: 6 file nel repository, 3 di `contesto/`, 5 locali in `.indice/`; circa 7 richieste; circa
10-12 minuti e 60-80 mila token. Le undici domeniche precedenti (C.0): circa 54 richieste, circa 25 minuti, 2-3 a domenica.

**Giudizio:** l'ingresso costa poco (circa 2 minuti e una ricerca a messaggio); il costo vero sta nelle notifiche di
correzione (7 su 25, A6) e nei consolidamenti recuperati senza regola (A5).
