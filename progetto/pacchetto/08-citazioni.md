# Citazioni: prova sul campo del protocollo di verifica (v2)

> 2026-10-31. Proposta di Claude, da validare. Nove subagent in parallelo, uno per gruppo di tre citazioni, con ricerca web.
> Nessuna nota o script è stato toccato. Le citazioni sono brevi e nessuna è un testo di canzone.
> Perché conta: l'unica irritazione documentata dell'utente verso Claude è l'invenzione
> ("te le sia inventate tu di sana pianta", vedi [l'archivio reale](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/archivio-reale.md)). La provenienza non si negozia.

## 0. In cinque righe

1. **25 citazioni, nessuna giusta alla lettera come l'ha scritta l'utente.** Le 12 del corpus si dividono così:
   5 simili, 3 attribuite all'autore sbagliato, 3 apocrife, 1 non trovata.
2. Nell'archivio **9 citazioni su 13 reggono nell'originale**, ma la forma italiana è quasi sempre **una resa di Claude**,
   non il testo di un'edizione. Solo 1 su 13 è stata confrontata con una traduzione pubblicata, ed era diversa.
3. Ne vanno **corrette 4 prima dell'import** (Marco Aurelio, Nietzsche e l'abisso, Cioran, Yalom) e **integrate 5**.
4. Nell'archivio **nessuna** citazione porta "(da verificare)": il segno esiste solo nel modello di nota. Le 83 citazioni
   sembrano certe senza esserlo. È il rischio maggiore, perché appaiono affidabili.
5. Costo: **71 ricerche, circa 2 ore di lavoro stimato (circa 4-5 minuti a citazione), circa 6 minuti di tempo reale** in parallelo.
   Un apocrifo famoso si chiude in 1-2 ricerche. Una traduzione italiana quasi mai.

## 1. I 25 casi

Legenda. **Esito**: verificata · simile (la forma corretta è accanto) · attribuzione errata · apocrifa · non trovata.
**Prova**: P = testo primario letto (Gutenberg, Perseus, archive.org, ilibrary.ru, sottotitoli); S = solo fonti secondarie
affidabili (Quote Investigator, PolitiFact, studi, fondazioni). **It.** = la forma italiana è stata confrontata con una
traduzione pubblicata (sì/no). R/min = ricerche e minuti stimati.

### Dal corpus (come le scrive l'utente, [esempi in ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-ingresso.md))

| # | Citazione come arriva | Esito | Fonte vera e forma corretta | Prova | It. | R/min |
|---|---|---|---|---|---|---|
| C1 (E03) | "finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino", Jung | simile | *Aion* (1951), CW 9/II §126: "when an inner situation is not made conscious, it happens outside, as fate" | S | no | 3/5 |
| C2 (E04) | "ciò a cui resisti persiste", Jung | attribuzione errata | Nessun testo di Jung. Prima traccia: i seminari *est* di Werner Erhard, anni '70 (non è provato che l'abbia coniata lui) | S | — | 2/4 |
| C3 (E07) | "find what you love and let it kill you", Bukowski | attribuzione errata | Kinky Friedman, *Houston Chronicle*, 18 set 1986: "Find what you like…". La forma "love" viene da una citazione di Van Dyke Parks (1998) | S | — | 1/2 |
| C4 (E05) | "l'ostacolo è la via", Marco Aurelio | simile | *A se stesso* V 20, ultima frase. La forma breve è di G. Hays (2002) e l'ha resa popolare R. Holiday (2014). Il greco dice: "ciò che sbarra questa via diventa via" | P | no | 5/7 |
| C5 (E06) | "tutto ciò che sentiamo è un'opinione non un fatto…", Marco Aurelio | apocrifa | Non c'è nelle *Meditazioni*. Traccia del 2011 (PolitiFact 2019). Il passo vicino è II 15, "tutto è opinione" | S | — | 1/2 |
| C6 (E08) | "non camminare davanti a me potrei non seguirti…", Camus | apocrifa | Anonima: *Quincy Sun*, 1971. Attribuita a Camus dal dicembre 1971 (Quote Investigator 2015) | S | — | 1/2 |
| C7 (E09) | "nel mezzo dell'inverno… un'estate invincibile", Camus, *La peste* | simile (opera sbagliata) | Parole giuste, opera sbagliata: è «Retour à Tipasa», in *L'Été* (1954): "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible" | S | no | 2/3 |
| C8 (E10) | "chi ha un perché per vivere sopporta quasi ogni come", Frankl | attribuzione errata | Nietzsche, *Crepuscolo degli idoli*, «Sentenze e frecce» (n. 12, da verificare). Frankl la cita dichiarando l'autore | S | no | 3/4 |
| C9 (E11) | "un libro deve essere un martello per rompere il ghiaccio dentro di noi", Kafka | simile | Lettera a O. Pollak, 27 gen 1904: "die Axt für das gefrorene Meer in uns". Trad. Nervi (Bompiani): "l'ascia per il mare ghiacciato che è dentro di noi" | S | sì | 2/3 |
| C10 (E13) | "a volte un sigaro è solo un sigaro", Freud | apocrifa | Non si trova negli scritti di Freud. Prima traccia: Wheelis, *Psychiatry*, 1950, dove è già detta "famosa battuta" (Quote Investigator 2011) | S | — | 0/1 |
| C11 (E16) | "la vita si capisce solo all'indietro ma si vive in avanti", Kierkegaard | simile | *Journalen* JJ:167 (1843), SKS 18, p. 306: "deve essere compresa all'indietro… vissuta in avanti". Il "solo" è aggiunto | S | no | 2/3 |
| C12 (E62) | "la ferita è il punto da cui entra la luce", Rumi | non trovata | Nessun verso persiano rintracciato. Probabile condensazione della resa libera di Coleman Barks (titolo della poesia da verificare) | S | — | 3/4 |

### Dall'archivio (come sono registrate oggi in `## Citazione`)

| # | Citazione registrata (nota) | Esito | Verifica | Prova | It. | R/min | Correggere? |
|---|---|---|---|---|---|---|---|
| A1 | "Mi rivolto, dunque siamo." ([Camus, opere](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/camus-opere.md)) | verificata | *L'Homme révolté*, parte I, in chiusura: "Je me révolte, donc nous sommes". La forma italiana è quella delle antologie Eleuthera; la trad. Magrini (Bompiani) non è controllata | S | no | 3/3 | no (precisare "parte I") |
| A2 | "Ciò che ostacola l'azione fa avanzare l'azione. Ciò che sta sulla via diventa la via." ([Marco Aurelio](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/marco-aurelio.md)) | simile | V 20 è giusto, ma il testo è un ricalco dell'inglese di Hays, non una traduzione dal greco né un'edizione italiana | P | no | 4/7 | **sì** |
| A3 | "Bisogna avere ancora un caos dentro di sé per partorire una stella danzante." ([Zarathustra](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/zarathustra.md)) | verificata | Prologo § 5: "Ich sage euch: man muss noch Chaos in sich haben…". La resa di Montinari (Adelphi) è probabile ma non controllata | P | no | 1/3 | no (facoltativo: "Io vi dico:") |
| A4 | "Se guardi a lungo in un abisso, anche l'abisso guarda dentro di te." ([Al di là del bene e del male](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/al-di-la-del-bene-e-del-male.md)) | simile | § 146 è giusto. Masini (Adelphi): "E se tu scruterai a lungo in un abisso, anche l'abisso scruterà dentro di te." La forma registrata è una parafrasi corrente | P | sì | 2/5 | **sì** |
| A5 | "La bellezza salverà il mondo." ([Dostoevskij](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/dostoevskij.md)) | verificata | *L'idiota* III, 5. La dice Ippolit, riferendo il principe, che in scena non la pronuncia mai. Riferimento giusto | P | no | 2/4 | no |
| A6 | "Non essere nati: solo a pensarci, che felicità, che libertà, che spazio!" ([Cioran](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/cioran.md)) | simile | "N'être pas né, rien que d'y songer, quel bonheur…": il francese ha il singolare, "nato". Forma corrente: "al solo pensarci". Trad. Adelphi (Zilli, da verificare) | S | no | 4/9 | **sì** |
| A7 | "Non si diventa illuminati immaginando figure di luce, ma rendendo cosciente l'oscurità." ([Jung](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/jung.md)) | verificata (in inglese) | CW 13 § 335 (Hull) confermato da fonti secondarie. Opere 13 Boringhieri non controllata | S | no | 5/7 | integrare: "(traduzione da verificare)" |
| A8 | "Ognuno porta con sé un'ombra…" ([Ombra](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/psicologia/ombra.md)) | verificata (in inglese) | *Psychology and Religion*, scritta in inglese (1938), CW 11 § 131. Boringhieri non controllata | S | no | 4/6 | integrare: "(traduzione da verificare)" |
| A9 | "Segui la tua beatitudine." ([Campbell](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/sacro-e-mito/campbell.md)) | verificata | *The Power of Myth*, «Sacrifice and Bliss», p. 120 (Joseph Campbell Foundation). Il motto è più antico (1971). Neri Pozza 2012 non controllata | S | no | 4/6 | integrare: pagina e "(traduzione da verificare)" |
| A10 | "Nulla nella vita è importante quanto pensi che sia mentre ci stai pensando." ([Kahneman](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/psicologia/kahneman.md)) | verificata | *Thinking, Fast and Slow*, cap. 38, letto su archive.org. La trad. Serra (Mondadori 2012) non è controllata | P | no | 3/5 | no |
| A11 | "Il coraggio non è l'assenza di disperazione…" ([Rollo May](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/psicologia/rollo-may.md)) | verificata (in inglese) | *The Courage to Create* (1975), cap. 1. L'edizione italiana (titolo, editore) non è stata trovata | S | no | 3/6 | integrare: titolo italiano "(da verificare)" |
| A12 | "Benché la fisicità della morte ci distrugga, l'idea della morte ci salva." ([Yalom](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/psicologia/yalom.md)) | attribuzione da precisare | L'idea e la frase vengono da E. M. Forster, *Casa Howard* (1910), cap. XXVII: "Death destroys a man: the idea of Death saves him". La forma registrata è la ripresa di Yalom | P | no | 7/9 | **sì** |
| A13 | "Siamo un modo in cui il cosmo conosce se stesso." ([Sagan](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/scienza/sagan.md)) | verificata | *Cosmos*, ep. 1 (6:18), ripetuta nell'ep. 13. Nel libro non c'è (cap. 13 ha una variante) | P | — | 4/7 | integrare: "anche ep. 13; non nel libro" |

Galimberti non ha una `## Citazione` nell'archivio: il suo caso sta nel corpus (E01, Nietzsche dentro un titolo di Galimberti).

### Due correzioni al corpus stesso

La verifica di ottobre del corpus aveva due imprecisioni, e una prova serve anche a questo:
- **E07**: la prima traccia di "find what you like" non è un romanzo di Friedman del 1998, ma il *Houston Chronicle* del 1986.
- **E04**: "nessuna fonte primaria" resta vero, ma c'è una pista d'origine, il gruppo *est* di Erhard (non provata).

## 2. Che cosa ha insegnato la prova

- **Gli apocrifi famosi costano poco**: Quote Investigator e PolitiFact li chiudono in 1-2 ricerche (C3, C5, C6, C10).
- **L'originale si trova, la traduzione no.** Gutenberg, Perseus, ilibrary.ru, i sottotitoli e i file `_djvu.txt` di archive.org,
  letti con `curl` e `grep`, danno il testo originale con certezza. Le traduzioni italiane sotto diritto d'autore non si leggono
  online: in 25 casi ne sono state confrontate solo 2 (Masini, Nervi), tramite Wikiquote e un estratto dell'editore.
- **WebFetch tronca** le pagine lunghe e i PDF. Scaricare il testo e cercarci dentro è più affidabile.
- **Non tutto si apre.** Nietzsche Source non risponde via fetch, i libri in prestito su archive.org sono bloccati e
  la quota di Google Books API era esaurita.
- **Wikiquote italiano** è utile solo dove riporta traduttore ed edizione (formato raw). I siti italiani di citazioni non danno mai la fonte.
- **Il caso più insidioso non è l'apocrifo, è la resa di Claude**: una traduzione dall'inglese presentata come testo d'autore (A2, A4).
  È proprio "inventata di sana pianta", in piccolo.

## 3. Il protocollo raccomandato

**Passi** (ci si ferma al primo che dà un esito netto):
1. **Apocrifi noti**: Quote Investigator, PolitiFact/Snopes, i blog che smascherano i falsi (per Jung, carljungdepthpsychologysite).
   Se c'è una scheda, esito chiuso.
2. **Originale**: le parole chiave nella lingua dell'autore, poi il testo primario scaricato e letto con `grep`
   (Gutenberg, Liber Liber, Perseus, archive.org `_djvu.txt`, ilibrary.ru, SKS per Kierkegaard, sottotitoli per film e serie).
   Si annotano opera, capitolo/paragrafo, pagina ed edizione, se si trovano.
3. **Traduzione italiana**: Wikiquote it in formato raw, estratti degli editori, anteprime di Google Books, OPAC SBN per il traduttore.
   Se il testo non si trova: si scrive la resa propria come tale e si mette "(traduzione da verificare)".
4. **Ci si ferma** dopo circa 5 ricerche o 10 minuti a citazione. Si registra ciò che si sa e "(da verificare)" sul resto.
   Non si riempiono i vuoti con il ricordo.

**Come registrarla** (campi, non prosa):
- `esito`: verificata | simile | attribuzione-errata | apocrifa | non-trovata.
- `prova`: primaria | secondaria | memoria. "Memoria" non basta mai per scrivere "verificata".
- `riferimento`: opera, luogo (cap./§/pagina/edizione), URL della verifica, data.
- **tre forme distinte**: come l'ha scritta l'utente (sempre conservata e cercabile), l'originale, la traduzione
  con il suo traduttore, oppure "resa di Claude".
- `attribuita-a` separato da `autore` (C2, C3, C8): l'attribuzione sbagliata è un fatto della storia dell'utente,
  l'autore vero è un fatto del mondo.

**Che cosa dire all'utente, in una riga**, solo quando l'esito non è "verificata":
- simile: "Salvata. Il testo vero dice X (*opera*, luogo): te lo metto accanto."
- attribuzione errata o apocrifa: "Salvata così. Non è di Y: viene da Z (fonte)." Senza correggere la sua frase e senza fare la predica.
- non trovata: "Salvata. Non trovo l'originale: la segno da verificare."

**Quando farlo.** Due tempi:
- **Subito, all'ingresso**, solo il passo 1 (1-2 ricerche, meno di un minuto): è l'unico che cambia la risposta all'utente
  ("non è di Jung").
- **Nel consolidamento**, i passi 2-3, a lotti, un subagent per tre citazioni. Fino ad allora la citazione è `prova: memoria`.
- **Prima di proporre una citazione scelta da Claude** (come le 83 dell'archivio), il protocollo completo è obbligatorio:
  Claude non deve mai proporre una citazione con `prova: memoria`.

**Quanto costa**: in media circa 3 ricerche e circa 5 minuti di lavoro a citazione, circa 25.000 token di subagent.
Le 83 citazioni dell'archivio costerebbero circa 30 subagent da tre, circa 2 milioni di token, mezz'ora di tempo reale in parallelo.

## 4. Le citazioni dell'archivio da correggere prima dell'import

**Da correggere** (il testo registrato è sbagliato o è attribuito male):
1. **Marco Aurelio V 20**: è un ricalco di Hays. Va sostituita con una traduzione italiana d'edizione verificata,
   oppure resa dal greco e marcata "resa di Claude".
2. **Nietzsche, § 146**: va usata la forma di Masini o va marcata come parafrasi. Si può aggiungere la frase che la precede, sui mostri.
3. **Cioran**: "Non essere nato", "al solo pensarci", con la traduzione Adelphi "(da verificare)".
4. **Yalom**: va indicato Forster (*Casa Howard*, cap. XXVII) come origine, e Yalom come chi la riprende.

**Da integrare** (il testo regge, il riferimento è incompleto):
5-6. **Jung** (A7, A8): "(traduzione da verificare)" sulla forma italiana.
7. **Campbell**: p. 120, «Sacrifice and Bliss», "(traduzione da verificare)".
8. **Rollo May**: edizione italiana da trovare.
9. **Sagan**: anche nell'ep. 13; non è nel libro.

Restano sane così come sono A1, A3, A5 e A10. Il numero dice molto: il 70% delle citazioni scelte da Claude,
estratte apposta tra le più a rischio, richiede almeno un ritocco. Prima dell'import conviene passare
tutte le 83 col protocollo, e di default marcarle `prova: memoria`.
