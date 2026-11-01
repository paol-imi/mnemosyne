# Il corpus degli esempi in ingresso

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Non fa parte dell'archivio.
> 68 messaggi (72 voci, di cui quattro rimandi dentro le sequenze) come li scriverei davvero dal telefono, con che cosa mi aspetto, che cosa il sistema deve
> ricordare e la trappola. Serve a mettere alla prova [la proposta del primo giro](/progetto/proposta.md),
> che chiude con le 10 lezioni (§5).

## Come leggerlo

- **Date**: immaginarie, su sei mesi dopo l'avvio (novembre 2026 – aprile 2027), per far emergere i temi nel tempo.
- **Inventato**: sogni, persone della mia vita (Marco, nonna Lina, papà, G., il prof. Ferri) e frasi personali
  sono inventati da Claude, marcati con *(inventato)*. Gusti, opere e autori vengono dall'archivio, allargati.
- **Verifica**: ogni citazione d'autore è stata controllata il 2026-10-31 con ricerche web (tre subagent).
  Esiti: **autentica**, **parafrasi** (il senso c'è, le parole no), **attribuzione errata**, **apocrifa**,
  **non confermata**. Gli apocrifi sono voluti: sono il caso più comune nella vita reale.
- **Si aspetta**: ciò che vorrei sentirmi rispondere, in 1-2 righe. **Ricorda e collega**: ciò che deve restare.
  **Trappola**: dove un sistema ingenuo sbaglia.
- Dove dico "esiste già" mi riferisco a una nota di questo archivio, che verrà importata.

## 1. Messaggi sciolti

### Citazioni: ricordate bene, ricordate male, non sue

**E01** · 2026-11-03 23:40 · video, citazione
> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

- **Si aspetta:** "Salvato. L'immagine è di Nietzsche, Galimberti ci ha scritto un libro (2007). Lo spettacolo era *Il mondo delle emozioni*?"
- **Ricorda e collega:** Galimberti (nuova persona); lo spettacolo come opera con titolo incerto; **due** idee distinte
  (nichilismo come ospite; disagio culturale e non psicologico); Nietzsche (esiste); temi nichilismo, giovani.
- **Trappola:** una citazione che è a sua volta una citazione: la frase è di Nietzsche (frammento postumo 1885-86,
  "il più inquietante fra tutti gli ospiti"), il titolo del libro è di Galimberti. Due autori, una frase. Sulla stessa
  catena c'è anche la polemica per plagio del 2008 sul libro: un fatto da sapere, non da sbattere in faccia.
- **Verifica:** autentica (Nietzsche, KSA 12, 2[127], da verificare il numero); *L'ospite inquietante*, Feltrinelli 2007.
  Spettacoli reali 2024-26: *L'illusione della libertà*, *Quando la vita era regolata dal cuore*, *Il mondo delle emozioni*.

**E02** · 2026-11-04 08:12 · follow-up
> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

- **Si aspetta:** "Aggiunto allo spezzone di ieri." Niente di più.
- **Ricorda e collega:** non un frammento nuovo: un'aggiunta datata al frammento E01 (momento: "verso la fine"),
  e un tema in più (i greci) che arriva da me.
- **Trappola:** "la frase dell'ospite" si risolve solo guardando gli ultimi frammenti nel repo: dal telefono è una
  **chat nuova**, la memoria della chat di ieri non c'è.

**E03** · 2026-11-09 19:02 · citazione apocrifa
> jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato

- **Si aspetta:** "Salvata. Attenzione: così non è di Jung, è un riassunto di *Aion* §126. Ti metto accanto la frase vera."
- **Ricorda e collega:** la citazione **come circola** (è quella che mi ha spaccato) e il passo vero di Jung, legati;
  Jung (esiste); temi inconscio, destino; pancia alta ("mi ha spaccato").
- **Trappola:** correggere la frase al posto mio o buttarla. Né l'una né l'altra: la versione apocrifa è un oggetto
  reale (circola, mi ha colpito), ma non è "di Jung". Serve distinguere *attribuita a* da *autore*.
- **Verifica:** parafrasi. In *Aion* (Opere 9/II, §126): ciò che non è reso cosciente accade fuori, come destino.

**E04** · 2026-11-10 13:30 · citazione apocrifa
> ciò a cui resisti persiste, jung. verissimo

- **Si aspetta:** "Salvata, ma non risulta in Jung: è uno slogan moderno. Simile in spirito alla tua di ieri."
- **Ricorda e collega:** citazione apocrifa con `attribuita-a: jung`, `autore` ignoto; vicina a E03 (stesso giro di idee).
- **Trappola:** creare il legame "Jung → autore di" e poi, alla domanda "le migliori di Jung", restituirmela in testa.
- **Verifica:** attribuzione errata, nessuna fonte primaria.

**E05** · 2026-11-14 07:50 · citazione, attribuzione da sistemare
> "l'ostacolo è la via" marco aurelio. me lo devo ricordare stamattina

- **Si aspetta:** "È *Meditazioni* V,20; la formula breve viene dalla traduzione di Hays, e Ryan Holiday ne ha fatto un libro."
- **Ricorda e collega:** Marco Aurelio (esiste), le *Meditazioni* (oggi una ricerca: `pensieri-marco-aurelio`);
  la frase come la dico io, la resa vera, e il passaggio Hays → Holiday (`scoperto-tramite` probabile, da chiedere).
- **Trappola:** "autentica o no" non basta: è autentica nel senso, ma la forma memorabile è di un traduttore moderno.
  Una citazione ha più **versioni** (originale, traduzioni, slogan), e io ricordo lo slogan.
- **Verifica:** autentica nella sostanza (V,20), forma di Gregory Hays (2002).

**E06** · 2026-11-15 22:10 · reel, citazione apocrifa
> https://www.instagram.com/reel/C9xYz.../ questa pagina posta sempre frasi di marco aurelio, questa: tutto ciò che sentiamo è un'opinione non un fatto, tutto ciò che vediamo è una prospettiva non la verità

- **Si aspetta:** "Salvata, ma non è nelle *Meditazioni*: girava su Instagram dal 2019. Il passo più vicino è IV,3."
- **Ricorda e collega:** frammento con link (fonte di **scoperta**: una pagina social), citazione apocrifa,
  legame `simile-a` con IV,3; la pagina come fonte poco affidabile, da ricordare se torna.
- **Trappola:** fidarsi della didascalia del reel. E dare per scontato che il link sia leggibile: Instagram spesso non
  si apre senza login, il testo l'ho scritto io ed è quello che vale.
- **Verifica:** apocrifa (PolitiFact, 2019).

**E07** · 2026-11-18 01:15 · citazione apocrifa
> find what you love and let it kill you. bukowski. ecco

- **Si aspetta:** "Salvata. Non è di Bukowski: la prima traccia è un romanzo di Kinky Friedman (1998)."
- **Ricorda e collega:** citazione in inglese, apocrifa; ora del messaggio (1:15) e quell'"ecco": dice uno stato d'animo.
- **Trappola:** creare la persona Bukowski solo per una frase che non è sua. Persona sì solo se la nomino io e la
  voglio; altrimenti l'attribuzione resta un campo testuale.
- **Verifica:** attribuzione errata (Quote Investigator).

**E08** · 2026-11-20 12:44 · citazione apocrifa, persona della mia vita
> marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina

- **Si aspetta:** "Salvata con la tua reazione. Non risulta di Camus, autore ignoto."
- **Ricorda e collega:** **Marco** *(inventato)*, amico, come persona della mia vita; `scoperto-tramite: marco`;
  la mia reazione tiepida e ironica; Camus (esiste) solo come attribuzione.
- **Trappola:** due: "marco" non è Marco Aurelio (il fuzzy matching sugli alias li confonde); e la reazione è
  **negativa**, ma il primo giro ha solo `pancia` 1-3 (sfiorato, colpito, folgorato): non sa dire "non mi convince".
- **Verifica:** apocrifa (Quote Investigator, 2015).

**E09** · 2026-11-22 17:20 · citazione, opera sbagliata
> camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei

- **Si aspetta:** "Bella, ed è sua, ma non è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954)."
- **Ricorda e collega:** citazione autentica con opera corretta; mia attribuzione errata conservata;
  **uso: tatuaggio** (la nicchia che resta); legame con [l'assurdo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/assurdo.md) e con l'inverno.
- **Trappola:** l'autore giusto con l'opera sbagliata: un caso di correzione parziale. E "me la tatuerei" non è un tipo
  di nota: è un'etichetta d'uso su una citazione.
- **Verifica:** autentica (*L'Été*: "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible").

**E10** · 2026-11-26 09:05 · citazione, autore scambiato
> frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente

- **Si aspetta:** "La frase è di Nietzsche (*Crepuscolo degli idoli*), Frankl la cita. Segno il libro in lettura."
- **Ricorda e collega:** Frankl e *Uno psicologo nei lager* (esistono), lettura `in-corso`; Nietzsche autore;
  il legame "Frankl cita Nietzsche" (`cita` tra opere), che è esattamente una convergenza.
- **Trappola:** autore giusto per me (l'ho letta in Frankl) e autore vero (Nietzsche) sono entrambi da tenere:
  dove l'ho incontrata è un fatto della mia storia, chi l'ha scritta è un fatto del mondo.
- **Verifica:** autentica, Nietzsche, *Sentenze e frecce* §12 (1889).

**E11** · 2026-12-01 21:30 · citazione ricordata male
> kafka diceva che un libro deve essere un martello per rompere il ghiaccio dentro di noi o qualcosa del genere

- **Si aspetta:** "È un'ascia, non un martello: lettera a Oskar Pollak, 1904. Kafka c'è già."
- **Ricorda e collega:** il mio "martello" e la sua "ascia"; Kafka (esiste); tema: a cosa serve leggere.
- **Trappola:** la ricerca per parole ("martello") non la ritroverà mai: servono la forma vera e la mia, entrambe cercabili.
- **Verifica:** autentica (27 gennaio 1904: "die Axt für das gefrorene Meer in uns").

**E12** · 2026-12-05 18:40 · domanda dentro un memo
> chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi

- **Si aspetta:** "Hemingway, *Addio alle armi* (1929), cap. 34. E sì, è il [kintsugi](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/arte/kintsugi.md) in parole."
- **Ricorda e collega:** è insieme una **domanda** (vuole una risposta subito) e un **memo** (lo voglio ricordare);
  la convergenza Hemingway ↔ kintsugi la propongo io, ma l'ha vista lui: `origine: mia`.
- **Trappola:** trattarlo solo come domanda (rispondo e non salvo) o solo come memo (salvo e non rispondo).
- **Verifica:** autentica ("The world breaks every one and afterward many are strong at the broken places").

**E13** · 2026-12-08 11:00 · battuta
> lol freud: a volte un sigaro è solo un sigaro. vale anche per i miei sogni forse

- **Si aspetta:** "Apocrifa, ma la teniamo. E il sogno di stanotte, se vuoi, scrivilo."
- **Ricorda e collega:** il tono ironico; il legame con i miei sogni (che esistono come frammenti).
- **Trappola:** prendere sul serio ogni messaggio. Alcuni sono battute: vanno salvati leggeri, senza tre temi proposti.
- **Verifica:** apocrifa (nessuna attestazione prima del 1950).

**E14** · 2026-12-12 20:15 · Pinterest, lingua
> https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo

- **Si aspetta:** "Rilke, *Libro d'ore* (1899). C'è già, con le *Elegie*."
- **Ricorda e collega:** pin normalizzato (`https://www.pinterest.com/pin/1234567890123/`); citazione in inglese di un
  testo tedesco che io leggerei in italiano: **una** citazione con tre lingue; Rilke (esiste).
- **Trappola:** creare tre citazioni diverse per tre lingue; o non riconoscerla se poi la scrivo in italiano.
- **Verifica:** autentica ("Laß dir alles geschehn: Schönheit und Schrecken").

**E15** · 2026-12-14 08:20 · citazione, stato d'animo, contesto
> domani ho il colloquio. seneca: soffriamo più nell'immaginazione che nella realtà. ok seneca ok

- **Si aspetta:** "In bocca al lupo. È nelle *Lettere a Lucilio*, 13."
- **Ricorda e collega:** la citazione **usata** in un momento preciso (colloquio *(inventato)*), non solo "trovata";
  Seneca e le *Lettere* (esistono); fra qualche giorno vale la pena chiedere com'è andata? No: lo dico io, se voglio.
- **Trappola:** dimenticare il contesto: tra un anno "cosa mi ha aiutato prima delle cose difficili?" vive di questo.
- **Verifica:** autentica nella sostanza ("saepius opinione quam re laboramus").

**E16** · 2026-12-20 23:05 · citazione, parafrasi celebre
> kierkegaard: la vita si capisce solo all'indietro ma si vive in avanti. ecco perché il diario

- **Si aspetta:** "Salvata. L'originale è un po' diverso (diario, 1843): te lo metto accanto."
- **Ricorda e collega:** la parafrasi, l'originale, e il mio legame personale (il diario, questo stesso sistema);
  Kierkegaard (esiste).
- **Trappola:** la parafrasi è più bella dell'originale. Non va "corretta": va affiancata.
- **Verifica:** parafrasi (JJ:167: il "solo" è aggiunto).

**E17** · 2027-01-09 16:30 · intuizione che collega
> eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?

- **Si aspetta:** "Sì, convergono: identità nel cambiamento. Sono collegate. E la domanda è tua: chi sono?"
- **Ricorda e collega:** l'intuizione è **mia**: legame `converge-con` tra Eraclito e [nave di Teseo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/nave-di-teseo.md)
  già validato; la domanda personale → [Chi sono?](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/domande/chi-sono.md); [versioni di me morte](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/percorsi/versioni-morte.md).
- **Trappola:** un'intuizione che collega due cose è un **legame**, non un frammento su un tema. Se il sistema la
  riduce a "parla-di: identità", perde proprio l'atto che conta.
- **Verifica:** il fiume "due volte" è di Platone (*Cratilo* 402a); il frammento accettato è DK B12.

**E18** · 2027-01-12 22:50 · citazione, convergenza con l'archivio
> karamazov, lo starec zosima: tutti siamo responsabili di tutto davanti a tutti. mi ha fatto pensare ai 36 giusti

- **Si aspetta:** "È Markel, il fratello di Zosima, poi Zosima la riprende (libro VI). Collego ai [36 giusti](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/idee/i-36-giusti/index.md)."
- **Ricorda e collega:** *I fratelli Karamazov* (esiste), Dostoevskij (esiste, in `fonti/opere/`); convergenza mia con
  [i Lamed Vav](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/sacro-e-mito/lamed-vav.md) e il [sacrificio anonimo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/sacrificio-anonimo.md).
- **Trappola:** il personaggio che la dice (Markel) e quello che la rende famosa (Zosima): chi parla, nella finzione,
  è un dato in più rispetto all'autore.
- **Verifica:** parafrasi della traduzione ("ognuno è colpevole davanti a tutti per tutti").

**E19** · 2027-01-15 21:00 · citazione non letterale
> se dio non esiste tutto è permesso. dostoevskij. pesante

- **Si aspetta:** "Il senso è di Ivan nei *Karamazov*, ma la frase intera nel libro non c'è."
- **Ricorda e collega:** citazione `parafrasi`; legame con E18 (stesso libro, stesso mese) e con il mio
  "pesante". *(Parte della sequenza S3.)*
- **Trappola:** è la citazione "di Dostoevskij" più famosa: alla domanda "top quote di Dostoevskij" uscirà in testa,
  ed è una parafrasi. Il ranking deve sapere il grado di verifica.
- **Verifica:** parafrasi (ricorre "tutto è permesso", libro II cap. 6 e libro XI cap. 4).

**E20** · 2027-02-02 14:10 · citazione, fonte affidabile
> delitto e castigo, raskolnikov: il dolore e la sofferenza sono sempre inevitabili per un'intelligenza grande e un cuore profondo. questa è la mia

- **Si aspetta:** "Autentica, parte III cap. 5. 'Questa è la mia': la segno come tua."
- **Ricorda e collega:** [*Delitto e castigo*](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/delitto-e-castigo.md) (esiste); [dolore](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/emozioni/dolore.md) e il nucleo;
  "questa è la mia" è il segnale più forte possibile: **identificazione**, non solo pancia alta.
- **Trappola:** "questa è la mia" è più di `pancia: 3`: dice che la frase mi rappresenta. Il primo giro non ha un posto
  per questo (candidata a entrare nello *sguardo*).
- **Verifica:** autentica (Raskol'nikov a Porfirij).

### Musica

**E21** · 2026-11-06 00:30 · canzone, momento, stato d'animo
> how to disappear completely. i'm not here this isn't happening. stasera è esattamente così

- **Si aspetta:** "Salvato, senza testi. Lo sai che nasce da un consiglio di Michael Stipe a Yorke?" (solo se ne ho voglia)
- **Ricorda e collega:** canzone (*Kid A*, 2000) dentro [Radiohead](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/radiohead.md) (esiste come band, non c'è
  nessuna canzone); **il verso** come momento, non trascritto nel repo oltre la citazione breve; lo stato d'animo.
- **Trappola:** la regola "niente testi di canzoni" contro il fatto che io cito un verso. Un verso di 5 parole è una
  citazione breve; una strofa no. E l'aneddoto: proporlo, non imporlo, perché stasera non è serata da curiosità.
- **Verifica:** autentica la storia di Stipe (tour del 1997, formulazione variabile).

**E22** · 2026-11-11 19:45 · album
> ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto

- **Si aspetta:** "La 3 è [titolo], giusto?" (una sola domanda, perché "la 3" va risolta)
- **Ricorda e collega:** l'album (*Private Music*, 22 agosto 2025) come opera, la traccia come opera `parte-di`;
  [Deftones](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/deftones.md) (esiste); contesto (macchina, ascolto intero).
- **Trappola:** "la 3" si risolve solo con la tracklist, che va **verificata** (non ricordata dal modello): se sbaglia,
  lega la mia emozione alla canzone sbagliata per sempre.
- **Verifica:** album vero; la traccia 3 non verificata qui: è proprio il punto.

**E23** · 2026-11-19 22:00 · canzone, cover
> hurt di johnny cash, il video con lui vecchio. madonna

- **Si aspetta:** "Salvato. L'originale è dei Nine Inch Nails (1994), Cash la incide nel 2002."
- **Ricorda e collega:** **la versione di Cash**, non la canzone in astratto, con il video; Trent Reznor autore;
  temi: vecchiaia, rimpianto, [memento mori](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/memento-mori.md).
- **Trappola:** un'opera con autore e interprete diversi, e la mia emozione è legata alla versione (e al video), non
  al brano. Il primo giro ha solo `autore`.
- **Verifica:** vero (*American IV*, 2002).

**E24** · 2026-11-27 23:30 · canzone, cover, film
> mad world quella di donnie darko

- **Si aspetta:** "La cover di Gary Jules e Michael Andrews (2001) o l'originale dei Tears for Fears?" Meglio: niente
  domanda, ha già detto "quella di donnie darko".
- **Ricorda e collega:** versione (Jules/Andrews) dentro un film (*Donnie Darko*): canzone `parte-di` colonna sonora.
- **Trappola:** fare la domanda inutile. "Quella di X" è già la risposta.
- **Verifica:** vero.

**E25** · 2026-12-03 13:15 · canzone italiana, fuori dai miei soliti
> via del campo, de andrè. dai diamanti non nasce niente dal letame nascono i fior. è la cosa più stoica che abbia mai sentito

- **Si aspetta:** "Salvato. Stoico è una lettura tua: la collego a [stoicismo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/stoicismo.md) come convergenza."
- **Ricorda e collega:** De André, *Via del Campo* (*Volume 1*, 1967, musica di Jannacci); convergenza mia con lo stoicismo
  e con la [rinascita](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/morte-e-rinascita.md); grafia "De Andrè/De André".
- **Trappola:** l'accento sbagliato (De Andrè) e la lettura personale ("stoica") che non è un fatto: è un legame mio.
- **Verifica:** brano e album veri; il testo del verso non confermato dalle fonti trovate (celeberrimo, ma da verificare).

**E26** · 2026-12-07 02:10 · canzone, evento, persone della mia vita
> la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso

- **Si aspetta:** "Salvato. Un abbraccio." Nessuna analisi.
- **Ricorda e collega:** Battiato, *La cura* (1996, con Sgalambro); **evento** della mia vita *(inventato)*: il matrimonio;
  **nonna Lina** *(inventata)*, morta da poco: un lutto che il sistema deve conoscere senza nominarlo a sproposito.
- **Trappola:** un messaggio intimo alle 2 di notte. Proporre temi ("amore, perdita") è freddo. E la nonna non è
  "una persona" come Battiato: è privata, e una nota su di lei non deve mai finire in nulla di pubblico.

**E27** · 2026-12-09 18:00 · link nudo, Spotify
> https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3

- **Si aspetta:** "Salvato [titolo, artista]. Che cosa ti ha preso?" (una domanda, perché senza reazione è muto)
- **Ricorda e collega:** link normalizzato (via `?si=`), titolo e artista dall'oEmbed; nient'altro finché non rispondo.
- **Trappola:** inventare un perché; o creare l'artista con temi proposti a partire dal nulla.

**E28** · 2026-12-16 21:40 · album, gusto
> kid a dall'inizio alla fine. è il disco della mia vita credo

- **Si aspetta:** "Segnato come disco della tua vita."
- **Ricorda e collega:** l'album *Kid A* (2000) come opera, con E21 dentro (`parte-di`); "il disco della mia vita" è un
  **giudizio stabile** su di me, da sguardo, non una reazione del giorno.
- **Trappola:** registrarlo come un frammento qualsiasi. È un'affermazione di gusto che vale per anni: la domanda
  "cosa ascolto dopo?" deve pesarla più di cento ascolti.

**E29** · 2027-01-03 00:50 · canzone senza titolo
> quella dei sigur ros dell'album con le parentesi, non ha titolo, canta in una lingua inventata. la ottava. è l'inverno

- **Si aspetta:** "Salvato: *( )*, 2002, traccia 8. Lì le tracce non hanno titolo davvero."
- **Ricorda e collega:** un'opera **senza titolo** (le tracce di *( )* sono senza nome, cantate in "vonlenska");
  serve un identificativo stabile (album + numero); legame con l'inverno (S4).
- **Trappola:** il campo `titolo` obbligatorio. E "la lingua inventata": non c'è nessun testo da citare, solo un suono.
- **Verifica:** dalla conoscenza del modello, non ricercata: *( )* (2002), otto tracce senza titolo (da verificare).

**E30** · 2027-02-08 08:30 · momento preciso in una canzone
> change dei deftones, quando dopo il ritornello tutto si apre, tipo al minuto 3. ogni volta

- **Si aspetta:** "Salvato il momento, al minuto 3 circa."
- **Ricorda e collega:** *Change (In the House of Flies)* (*White Pony*, 2000); il **momento** (≈3:00) come àncora;
  "ogni volta" = un ritorno ripetuto, cioè un'abitudine di ascolto.
- **Trappola:** salvare la canzone e perdere il momento. Per me la canzone *è* quel minuto. Un riferimento interno
  (minuto, pagina, atto, episodio) serve su tutto, non solo sulle citazioni.

### Video, film, serie, anime

**E31** · 2026-11-08 22:30 · serie, entità esistente, omonimi
> rivisto true detective, il tempo è un cerchio piatto. cmq la quarta stagione con la neve non è malaccio, ci sono richiami

- **Si aspetta:** "Collegato a [*True Detective* 1](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/true-detective-s1.md). Aggiungo la quarta stagione come opera a parte?"
- **Ricorda e collega:** la frase (ep. 5, *The Secret Fate of All Life*, la dice Ledoux e Rust la riprende) con il suo
  episodio; un **ritorno** sulla serie (rivista), [eterno ritorno](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/eterno-ritorno.md) (esiste);
  la quarta stagione (*Night Country*, 2024) come opera nuova legata.
- **Trappola:** "true detective" è una serie con quattro stagioni diverse; nell'archivio esiste solo la prima, con slug
  `true-detective-s1`. La serie, le stagioni e l'episodio sono tre livelli di `parte-di`.
- **Verifica:** vero (ep. 5); *Night Country* e i suoi richiami: dalla conoscenza del modello, da verificare.

**E32** · 2026-11-13 21:10 · anime, citazione da fan
> fma ultima puntata: una lezione senza dolore non ha senso perché non si ottiene niente senza sacrificare qualcosa. lo scambio equivalente è la mia filosofia

- **Si aspetta:** "Episodio 64, la chiusa di Ed. Collegato a [scambio equivalente](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/scambio-equivalente.md)."
- **Ricorda e collega:** [FMA Brotherhood](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/fma-brotherhood.md) (esiste), episodio 64; "è la mia filosofia" =
  identificazione (come E20).
- **Trappola:** la citazione esiste in mille traduzioni di fan, nessuna ufficiale verificata: `verifica` deve poter
  dire "autentica nel contenuto, forma non ufficiale".
- **Verifica:** vero, ep. 64 *Journey's End*; formulazione esatta non confermata (fonti di fan).

**E33** · 2026-11-29 20:00 · anime, adattamenti
> berserk l'eclissi. quella del film, non l'anime del 2016 che fa schifo. ancora non riesco a guardarla senza stare male

- **Si aspetta:** "Salvato, legato a [Berserk](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/berserk.md). Il film è *L'avvento* (2013)?" (se serve)
- **Ricorda e collega:** l'**adattamento** (trilogia di film 2012-13) distinto dal manga e dalla serie 2016; la scena;
  il mio giudizio negativo sulla serie 2016 (valutazione, non emozione).
- **Trappola:** "Berserk" è un'opera con almeno quattro versioni. E di nuovo una reazione negativa (fa schifo) accanto
  a una fortissima (stare male): il voto 1-3 non le distingue.
- **Verifica:** dalla conoscenza del modello: film *L'epoca d'oro* I-III (2012-13), serie 2016-17 (titolo del terzo film da verificare).

**E34** · 2026-11-29 20:03 · raffica, intuizione
> aspetta ma l'eclissi e il giorno promesso di fma sono la stessa cosa. sacrificio di massa per diventare dio

- **Si aspetta:** "Sì. Griffith e il Padre: un'apoteosi pagata con migliaia di vite. Collegate."
- **Ricorda e collega:** convergenza **mia** tra due opere (esistono entrambe), tema: diventare dio a prezzo degli altri;
  [prezzo della conoscenza](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/prezzo-della-conoscenza.md).
- **Trappola:** arriva 3 minuti dopo E33: è lo stesso pensiero che continua. Una nota sola o due collegate? Due,
  legate con `sviluppa`; ma la domanda di E33, se c'era, non va ripetuta.

**E35** · 2026-11-29 20:05 · raffica, domanda
> e evangelion col perfezionamento dell'uomo? è il contrario forse

- **Si aspetta:** "Forse sì: lì il sacrificio è fondersi tutti, non salire uno. Lo segno come domanda aperta."
- **Ricorda e collega:** [Evangelion](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/evangelion.md) (esiste), il progetto di perfezionamento; una
  **domanda aperta** mia, da riprendere, collegata alle due di prima.
- **Trappola:** rispondere chiudendo la questione. È una domanda che voglio tenere aperta; il sistema deve avere un
  posto per "domande che mi faccio" diverso dalle 8 grandi domande.

**E36** · 2026-12-02 22:15 · titolo mancante
> il film svedese in bianco e nero dove il cavaliere gioca a scacchi con la morte, l'ho finalmente visto

- **Si aspetta:** "*Il settimo sigillo*, Bergman, 1957. C'è già un'idea che ci somiglia: [il cavaliere e la morte](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/idee/cavaliere-e-morte/index.md)."
- **Ricorda e collega:** opera identificata dalla descrizione, `fruizione: fatta`; convergenza con un'idea esistente
  (che nasce da Dürer, non da Bergman: va detto).
- **Trappola:** identificare senza chiedere quando l'identificazione è certa; chiedere solo se ci sono due candidati.

**E37** · 2026-12-10 23:00 · link YouTube con momento
> https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello

- **Si aspetta:** "Salvato [titolo, canale], dal 12:34."
- **Ricorda e collega:** il link **con** `t=754` (12:34), il canale; il mio "solo quello".
- **Trappola:** la normalizzazione del primo giro (`watch?v=ID`) butta via `t=`: cioè proprio la cosa che conta.

**E38** · 2027-01-21 19:30 · reel, storico
> barbero raccontava di napoleone a sant'elena che dettava le memorie e si inventava metà delle cose. adoro

- **Si aspetta:** "Salvato. Alessandro Barbero, nuovo; Napoleone c'è già."
- **Ricorda e collega:** Barbero (persona nuova, storico); [Napoleone](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/napoleone.md) (esiste); tema:
  il mito di sé, chi scrive la propria storia (che è anche questo sistema).
- **Trappola:** il fatto storico raccontato in un reel e ricordato da me è di terza mano: il sistema lo salva come
  "Barbero dice", non come fatto su Napoleone.

**E39** · 2027-02-11 22:40 · videogioco, omonimo
> iniziato persona 5. è pieno di jung, le ombre, le maschere. chi l'avrebbe detto

- **Si aspetta:** "Il nome viene dalla 'persona' di Jung. Collego a [Jung](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/jung.md) e all'[ombra](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/psicologia/ombra.md)."
- **Ricorda e collega:** opera nuova di un mezzo nuovo (gioco), `fruizione: in-corso`; convergenza pop → Jung.
- **Trappola:** "persona" come parola comune, concetto junghiano e titolo: l'omonimia più subdola. E il riferimento pop
  nascosto nell'archetipo è proprio il gusto del nucleo.
- **Verifica:** dalla conoscenza del modello (la serie usa persona e ombra di Jung).

### Libri e immagini

**E40** · 2027-02-17 23:10 · libro, pagina
> karamazov pag 312 il grande inquisitore. cristo che bacia l'inquisitore senza dire niente. non ho parole

- **Si aspetta:** "Salvato (libro V, cap. 5). La pagina dipende dall'edizione: quale hai?" (o niente: il capitolo basta)
- **Ricorda e collega:** il punto del libro (capitolo, non pagina), la lettura in corso, la mia reazione;
  legame con E18-E19 (stesso libro) e con S3.
- **Trappola:** la pagina come riferimento. Pag. 312 vale solo per la mia edizione: il sistema deve sapere quale ho
  (una volta sola) o tradurre in capitolo.

**E41** · 2027-03-04 21:00 · libro, reazione negativa
> finito lo straniero. boh. mi aspettavo di più, meursault mi è indifferente come lui è indifferente a tutto

- **Si aspetta:** "Segnato: finito, non ti ha preso. Curioso, visto quanto ti dice Camus." (o nulla)
- **Ricorda e collega:** *Lo straniero* (dentro [opere di Camus](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/camus-opere.md), che esiste come nota unica),
  `fruizione: fatta`, giudizio negativo; una crepa interessante con il nucleo (S3).
- **Trappola:** il voto: "mi è indifferente" non è "sfiorato". È una valutazione critica. E l'opera è dentro una nota
  collettiva (`camus-opere`): va separata.

**E42** · 2027-03-10 18:20 · immagine, pagina fotografata
> [foto di una pagina con una riga sottolineata a matita] questa

- **Si aspetta:** "Letto: '[la riga]'. Da che libro?" (una domanda)
- **Ricorda e collega:** l'immagine in `img/` con nome a data; il testo estratto (OCR) come citazione da attribuire.
- **Trappola:** indovinare il libro dallo stile. E il testo estratto va riletto: l'OCR su una foto storta sbaglia.

**E43** · 2027-03-15 17:00 · immagine, opera d'arte, luogo
> [foto] santa maria del popolo, caravaggio, la conversione di san paolo. la luce che arriva da niente

- **Si aspetta:** "Salvato con la foto. Va con [luce contro buio](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/idee/luce-contro-buio/index.md)?"
- **Ricorda e collega:** la mia foto (ammessa: è mia), l'opera (cappella Cerasi), il **luogo** e la data: un ricordo
  di viaggio *(inventato)*; tema luce (S2).
- **Trappola:** il primo giro toglie i luoghi dall'MVP; qui il luogo è metà del ricordo.

**E44** · 2027-03-22 12:00 · da leggere
> devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce

- **Si aspetta:** "Segnato da leggere. Il porcospino è nei *Parerga* (1851), non nel *Mondo*: forse meglio partire da lì?"
- **Ricorda e collega:** [*Il mondo*](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/mondo-come-volonta.md) (esiste) `da-fare`; il perché (Evangelion ep. 4,
  *Hedgehog's Dilemma*); `scoperto-tramite: evangelion`.
- **Trappola:** la curiosità punta all'opera sbagliata: il sistema lo dice, ma non sostituisce la mia scelta.
- **Verifica:** vero (titolo inglese dell'episodio; *Parerga e paralipomena*, vol. II).

### Persone, sogni, pensieri, vuoti

**E45** · 2026-11-24 23:50 · conversazione con una persona
> marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso

- **Si aspetta:** "Salvato. [Battaglie interiori](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/concetti/battaglie-interiori.md) è una tua parola da sempre."
- **Ricorda e collega:** Marco (lo stesso di E08), ciò che ha detto (sue parole riportate da me), la mia reazione
  ambivalente; il concetto esistente.
- **Trappola:** le parole di un amico non sono una "citazione" con verifica; e "marco" deve risolversi sull'amico,
  già noto da E08, non su Marco Aurelio.

**E46** · 2026-12-18 19:00 · ricordo d'infanzia, proverbio
> mia nonna diceva sempre chi semina vento raccoglie tempesta. non sapevo fosse nella bibbia

- **Si aspetta:** "È Osea 8,7. La tua nonna e la Bibbia nella stessa frase: la tengo così."
- **Ricorda e collega:** nonna Lina (E26); il **proverbio** con due fonti: la nonna (per me) e Osea (per il mondo).
- **Trappola:** la stessa doppia attribuzione di E10, ma più intima: chi me l'ha detto è più importante di chi l'ha scritto.
- **Verifica:** dalla conoscenza del modello (Osea 8,7), da verificare la traduzione.

**E47** · 2027-01-25 20:30 · persona della mia vita, scoperta
> il prof ferri del liceo mi fece leggere il fedone a 17 anni, credo sia lì che è iniziato tutto

- **Si aspetta:** "Salvato. Una radice: tutto il resto viene dopo."
- **Ricorda e collega:** il prof. Ferri *(inventato)*; il *Fedone* (nuova opera, di [Platone](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/platone.md));
  `scoperto-tramite` e una data **vissuta** (17 anni) diversa dalla data del messaggio.
- **Trappola:** `quando` è anni fa e approssimativo ("a 17 anni"): una data incerta deve essere ammessa.

**E48** · 2027-02-03 07:10 · sogno
> sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura

- **Si aspetta:** "Salvato il sogno. Ti dice qualcosa?" oppure nulla.
- **Ricorda e collega:** sogno *(inventato)*; simboli [scala](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/simboli/scala.md) (esiste) e mare; "non avevo paura".
- **Trappola:** l'interpretazione. Un sistema "junghiano" ci prova subito; non deve: propone il simbolo, non il senso.

**E49** · 2027-02-09 13:00 · vaghissimo
> boh niente volevo solo scrivere qualcosa

- **Si aspetta:** "Ci sono." Oppure: salvato e basta.
- **Ricorda e collega:** forse niente. Forse la data e l'ora, come traccia di un giorno vuoto (S4).
- **Trappola:** creare un frammento con tre proposte. Il sistema deve saper non fare niente, o quasi.

**E50** · 2027-03-01 22:00 · più cose in un messaggio
> oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata

- **Si aspetta:** "Segnato tutto. Karamazov finito." (sul padre, niente domande)
- **Ricorda e collega:** **tre** fatti: lettura conclusa (E18-E40), un ritorno su *La cura* (E26), un litigio con papà
  *(inventato)*; il legame tra loro è solo il giorno (S1).
- **Trappola:** un messaggio, tre episodi. Il frammento unico li incolla; tre frammenti li separano e perdono il "giornata".

**E51** · 2027-03-12 16:00 · correzione
> no aspetta quella di ieri sulla casa in ordine non era jung era peterson

- **Si aspetta:** "Corretto: Peterson. La riga di ieri resta com'era, con la correzione accanto."
- **Ricorda e collega:** la correzione **sul frammento di ieri** (che va trovato senza chat), cambio di attribuzione;
  [Peterson](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/jordan-peterson.md) (esiste, e ha già quella citazione proposta).
- **Trappola:** il "testo originale immutabile" del primo giro: giusto, ma allora la correzione dove sta? E se il
  sistema avesse già creato il legame con Jung, va spostato, non solo annotato.

**E52** · 2027-04-02 20:00 · dettato vocale storpiato
> ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere

- **Si aspetta:** "Cioran, sì: l'idea del suicidio come appiglio (*L'inconveniente di essere nati*, da verificare). Tutto bene?"
- **Ricorda e collega:** "chioran" → [Cioran](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/cioran.md) (esiste): il dettato vocale scrive i nomi a orecchio;
  il tema è delicato.
- **Trappola:** due. La grafia fonetica rompe la ricerca per alias; e un tema come il suicidio chiede di **guardare la
  persona**, non solo la frase: una riga umana, senza allarmismo e senza far finta di nulla.
- **Verifica:** il concetto è di Cioran; opera e parole esatte non verificate qui.

## 2. Sequenze nel tempo

Quattro fili che nessun messaggio dice da solo. Il sistema deve vederli emergere.

### S1. Il padre (novembre → aprile)

La parola "padre" la scrivo una volta sola, alla fine; il tema c'è da mesi.

**E53** · 2026-11-16 23:00 · reel, attribuzione sbagliata
> galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto

- **Si aspetta:** "È più probabile Recalcati: *Il complesso di Telemaco* (2013) è suo. Correggo?"
- **Ricorda e collega:** l'attribuzione mia (Galimberti) e quella probabile (Recalcati, psicoanalista); Telemaco,
  l'*Odissea*; tema padre (non ancora nominato da me).
- **Trappola:** Galimberti esiste da E01 e il sistema ha fretta di legare lì. Due intellettuali italiani con i capelli
  bianchi nei reel: l'omonimia di "categoria".
- **Verifica:** Recalcati, *Il complesso di Telemaco*, Feltrinelli 2013 (vero).

**E54** · 2026-12-13 01:30 · film, poesia
> rivisto interstellar. la poesia che ripete il professore, do not go gentle. murph che aspetta. non dormo

- **Si aspetta:** "Dylan Thomas, 1951. L'ha scritta per il padre che moriva." (fatto noto, da verificare la datazione)
- **Ricorda e collega:** il film (opera), la poesia (opera **dentro** il film, con autore diverso), Cooper e Murph;
  orario notturno.
- **Trappola:** "la poesia di Interstellar" non è di Nolan. Un'opera citata dentro un'altra.
- **Verifica:** vero (la recita il prof. Brand); "scritta per il padre morente": da verificare.

**E55** · 2027-01-06 08:00 · sogno
> sognato papà giovane, più giovane di me ora, che mi insegnava a nuotare al mare. mi sono svegliato strano

- **Si aspetta:** "Salvato il sogno." Nient'altro.
- **Ricorda e collega:** sogno *(inventato)*; papà come persona della mia vita; il mare (torna da E48, da E53).
- **Trappola:** collegare a Telemaco e Interstellar ora, alla terza occorrenza, ad alta voce. È presto, ed è intimo:
  il collegamento si propone nel consolidamento, non al risveglio.

**E56** · 2027-01-20 22:10 · anime, rilettura
> solo adesso capisco hohenheim. da ragazzo lo odiavo come ed

- **Si aspetta:** "Segnato: un cambio di sguardo su FMA."
- **Ricorda e collega:** Hohenheim e Ed (personaggi, non opere); [FMA](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/opere/fma-brotherhood.md); un cambio di
  giudizio nel tempo (allora / ora).
- **Trappola:** i personaggi. Il primo giro non li ha: qui servono (Hohenheim, Ed, Murph, Telemaco sono il filo).

**E57** · 2027-03-01 22:00 · (è E50) litigio con mio padre

**E58** · 2027-03-14 21:30 · domanda alla base
> dammi canzoni sul rapporto padre figlio

- **Si aspetta:** prima le mie, se ci sono (qui nessuna canzone è legata al padre), poi "fuori archivio" 3-5 brani reali con album, per esempio
  *Father and Son* (Cat Stevens, 1970), *Cats in the Cradle* (Harry Chapin, 1974), *Dance with My Father* (Luther Vandross, 2003).
- **Ricorda e collega:** la domanda stessa: è un segnale (S1 diventa esplicito). Le proposte non si salvano finché non dico.
- **Trappola:** l'archivio non ha canzoni "sul padre" taggate così: le canzoni che mi hanno colpito su questo non
  esistono; il sistema deve dirlo e uscire, con fatti veri.
- **Verifica:** brani dalla conoscenza del modello (anni da verificare).

**E59** · 2027-03-14 21:32 · seguito della domanda
> e di questo genere? tipo deftones radiohead

- **Si aspetta:** brani più vicini al mio suono, dichiarati come proposte e verificati.
- **Ricorda e collega:** "questo genere" = i generi delle mie band (dalla base), non della risposta precedente.
- **Trappola:** se la domanda arriva in una **chat nuova**, "di questo genere" non ha referente. E il genere delle mie
  band deve esistere nella base (oggi Radiohead e Deftones hanno solo "musica").

**E60** · 2027-04-10 23:00 · domanda di sintesi
> cosa mi colpisce ultimamente? sii sincero

- **Si aspetta:** "Il padre. Telemaco (nov), Interstellar (dic), il sogno (gen), Hohenheim (gen), il litigio (mar),
  le canzoni (mar). Non l'hai mai chiamato così."
- **Ricorda e collega:** il tema `padre` nasce **ora**, da sei frammenti che non lo nominano, come proposta.
- **Trappola:** il conteggio dei temi del primo giro (§5, domanda 10) conta solo i tag. I tag messi via via non
  dicevano "padre": il tema emerge solo rileggendo i frammenti insieme.

### S2. La crepa e la luce (novembre → marzo)

Il kintsugi è già nell'archivio; qui torna da cinque tradizioni diverse.

**E61** · 2026-11-21 00:10 · canzone
> anthem di leonard cohen. there is a crack in everything. ok

- **Si aspetta:** "Salvato: *Anthem*, *The Future* (1992)."
- **Ricorda e collega:** Cohen (nuovo), la canzone, il verso breve; [kintsugi](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/arte/kintsugi.md) come proposta.
- **Trappola:** nessuna grossa: è il primo anello. La trappola è non riconoscerlo come anello dopo.

**E62** · 2026-11-28 18:00 · reel, apocrifo
> rumi: la ferita è il punto da cui entra la luce. ma è uguale a cohen!!

- **Si aspetta:** "Sì, stessa immagine. Ma la frase di Rumi è della versione inglese di Coleman Barks, non dal persiano."
- **Ricorda e collega:** convergenza **mia** (Rumi ↔ Cohen), con la verifica che la indebolisce ma non la uccide.
- **Trappola:** la convergenza è vera come esperienza mia e dubbia come fatto storico: nessun legame documentato
  tra Cohen e Rumi. Il legame `converge-con` non dice "uno ha influenzato l'altro".
- **Verifica:** non confermata (Barks, *The Essential Rumi*; nessun originale trovato).

**E63** · 2026-12-05 18:40 · (è E12) Hemingway, i punti spezzati

**E64** · 2027-03-15 17:00 · (è E43) Caravaggio, la luce da niente

**E65** · 2027-03-20 22:30 · uso, tatuaggio
> ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto

- **Si aspetta:** "Cinque fonti la reggono: Cohen, Rumi (Barks), Hemingway, il kintsugi, Caravaggio. Te le metto in fila?"
- **Ricorda e collega:** un'**idea di tatuaggio** nella nicchia che resta, che **raccoglie** un tema nato altrove;
  [Jung, rendere cosciente l'oscurità](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/jung.md) come sesto anello possibile, proposta mia.
- **Trappola:** i tatuaggi non sono più il centro, ma qui sono il punto d'arrivo naturale di un filo: il progetto
  deve poter "pescare" dalla base, non vivere in un mondo a parte.

### S3. Camus aveva ragione? (novembre → aprile)

Il nucleo dice "stadio assurdista, alla Camus". Sei mesi dopo qualcosa si muove.

**E66** · 2026-11-05 22:00 · pensiero, accordo con il nucleo
> bisogna immaginare sisifo felice. oggi ci credo davvero, ho spinto tutto il giorno e stasera sto bene

- **Si aspetta:** "Salvato. Oggi Sisifo è felice."
- **Ricorda e collega:** la frase (autentica, *Il mito di Sisifo*); [Sisifo](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/sacro-e-mito/sisifo.md) (esiste come mito,
  ma ci sono anche il [Tiziano](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/arte/tiziano-sisifo.md) e il [von Stuck](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/arte/von-stuck-sisifo.md)); la mia posizione.
- **Trappola:** "Sisifo" ha tre note nell'archivio (mito, due quadri) più il saggio di Camus dentro `camus-opere`:
  qui si parla del saggio, non del mito.

**E67** · 2026-11-30 19:00 · vaghissimo
> oggi mi sento come sisifo

- **Si aspetta:** "Salvato." Al massimo: "Il masso o la discesa?" (una domanda, solo se c'è spazio)
- **Ricorda e collega:** lo stato d'animo, con Sisifo come **metafora**, non come argomento; contrasto con E66 (25 giorni fa).
- **Trappola:** `parla-di: sisifo` è falso: non parla di Sisifo, si sente Sisifo. E stavolta non è il Sisifo felice.

**E68** · 2027-01-15 21:00 · (è E19) se Dio non esiste

**E69** · 2027-03-08 23:40 · pensiero che contraddice il nucleo
> forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove

- **Si aspetta:** "Segnato. Nel tuo sguardo di ottobre il dolore era la dimensione principale: è un cambio, o un'altra faccia?"
- **Ricorda e collega:** una **posizione** datata che `contraddice` lo sguardo (nucleo) e si avvicina a
  [Schopenhauer](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/fonti/pensiero/schopenhauer.md) (dolore e noia, il pendolo): convergenza proposta, non mia.
- **Trappola:** aggiornare lo sguardo al posto mio. Il sistema segnala la tensione; lo sguardo lo cambio io.

**E70** · 2027-04-18 22:30 · contraddizione esplicita, domanda sul passato
> camus si sbagliava. o forse ero io più triste. cosa pensavo a novembre?

- **Si aspetta:** "A novembre: Sisifo felice (5), poi 'mi sento Sisifo' (30). A gennaio Ivan, a marzo la noia. E *Lo straniero* non ti ha preso."
- **Ricorda e collega:** posizione nuova che contraddice E66; la risposta deve usare le date vere dei frammenti e
  separare ciò che ho **detto** da ciò che il sistema ha **dedotto**.
- **Trappola:** riassumere con la voce del sistema ("eri in una fase assurdista") invece di riportare le mie parole.

### S4. L'inverno (dicembre → aprile)

Stati d'animo senza oggetto, e la primavera che arriva.

**E71** · 2027-01-28 02:40 · stato d'animo
> apatia totale. niente mi tocca. anche la musica è grigia

- **Si aspetta:** "Ci sono." Nessuna proposta, nessuna domanda.
- **Ricorda e collega:** [apatia](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/emozioni/apatia.md) (esiste) come **stato** con data e ora; la musica che non arriva.
- **Trappola:** due errori opposti: ignorarlo (è solo un frammento) o fare lo psicologo. E il primo giro mette
  le emozioni come `suscita` di un'opera: qui non c'è nessuna opera.

**E72** · 2027-04-12 18:30 · stato d'animo, svolta
> primo giorno di sole vero. camminato due ore senza musica. gioia stupida, senza motivo

- **Si aspetta:** "Segnato. È la prima gioia dopo l'inverno."
- **Ricorda e collega:** [gioia](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/emozioni/gioia.md); "senza musica" (dopo E71); un punto di svolta nella serie degli
  stati; la sequenza S4 si legge da sola: E29 (gennaio, Sigur Rós, "è l'inverno"), E49, E71, E72.
- **Trappola:** "dimmi come stavo quest'inverno" sarà una domanda vera: serve la serie degli stati, non la ricerca di
  una parola.

## 3. Copertura

| tipo | esempi |
|---|---|
| citazione esatta | E09, E10, E11, E14, E20 |
| citazione ricordata male o parafrasi | E03, E05, E11, E16, E17, E18, E19 |
| apocrifo / attribuzione errata | E03, E04, E06, E07, E08, E13, E53, E62 |
| spezzone video / reel | E01, E06, E37, E38, E53, E62 |
| canzone, verso, momento | E21, E23, E24, E25, E26, E29, E30, E61 |
| album | E22, E28 |
| film, serie, anime, gioco | E31-E36, E39, E54, E56 |
| libro e pagina | E40, E41, E42, E44 |
| podcast | E05 (Holiday, implicito): **lacuna**, nessun podcast vero nel corpus |
| conversazione, persona della mia vita | E08, E26, E45, E46, E47, E50, E55 |
| sogno | E48, E55 |
| stato d'animo | E15, E21, E67, E71, E72 |
| pensiero personale, posizione | E66, E69, E70 |
| intuizione che collega | E12, E17, E25, E34, E62 |
| domanda esistenziale o aperta | E17, E35, E70 |
| link nudo | E06, E14, E27, E37 |
| immagine | E42, E43 |
| ricordo d'infanzia | E46, E47 |
| omonimi | E08/E45 (Marco), E31 (stagioni), E33 (adattamenti), E39 (persona), E66 (Sisifo) |
| entità già presente con altro nome | E31, E41, E52, E66 |
| follow-up, correzione | E02, E51 |
| raffica sullo stesso tema | E33-E35, E58-E59 |
| vaghissimo | E49, E67 |
| domande alla base | E58, E59, E60, E70 |

## 4. Che cosa chiedono davvero questi messaggi

- **Circa metà non sono "una cosa con un autore"**: sono stati d'animo, persone, legami, domande, correzioni, vuoti.
- **Solo metà delle citazioni d'autore è giusta alla lettera**: su circa 25, otto hanno l'autore o l'opera sbagliati
  (E04, E06, E07, E08, E09, E10, E13, E53), una non è confermata (E62) e sei sono parafrasi (E03, E05, E16, E17, E18, E19).
- **Il momento è spesso più importante dell'opera**: E02, E21, E30, E37, E40.
- **Circa un messaggio su otto** non si capisce senza i frammenti precedenti (follow-up, correzioni, raffiche, "quella di ieri").

## 5. Che cosa insegna il corpus al progetto: le 10 lezioni

Ognuna confrontata con la [proposta](/progetto/proposta.md).

1. **Niente comando `/memo`: un ingresso solo, che capisce l'intento.** E12, E58, E70 sono insieme memo e domanda;
   E49 non è nessuno dei due. Io non scriverò `/memo`. *Proposta §4: il flusso parte dalla skill.* → Ogni messaggio
   entra da `CLAUDE.md`, l'intento si classifica (salva, chiedi, correggi, entrambi), nel dubbio si fa entrambi.

2. **La citazione ha versioni, e "attribuita a" non è "autore".** E03-E08, E62: la frase che mi colpisce è spesso
   la versione che circola. *Proposta §2.2-2.3: una citazione con `autore` e un `verifica`.* → Una citazione canonica
   con le sue **varianti** (come la ricordo, originale, traduzioni, slogan), e due predicati: `attribuita-a`
   (ciò che si dice) e `autore` (ciò che è vero). La query "le migliori di X" usa solo il secondo.

3. **Chi me l'ha fatto incontrare conta quanto chi l'ha scritto.** E10 (Frankl/Nietzsche), E46 (nonna/Osea), E44
   (Evangelion/Schopenhauer). *Proposta: `scoperto-tramite` c'è, ma come predicato secondario.* → Sul frammento,
   la **fonte d'incontro** è un campo di primo livello, accanto all'autore.

4. **Le persone della mia vita sono un tipo a sé.** Marco, nonna Lina, papà, il prof. Ferri sono il filo di S1 e
   tornano spesso. *Proposta §2.1: `persona` = autore, artista, band.* → `persone/` con un campo `cerchia`
   (mondo · vita): chi è della vita non si fonde mai con un autore (Marco ≠ Marco Aurelio), non è mai pubblico,
   e non riceve temi proposti.

5. **Il "momento" è un campo universale.** Minuto (E30, E37), atto (E02), episodio (E31, E32), capitolo (E40),
   traccia (E22, E29). *Proposta: `riferimento` solo sulle citazioni, e la normalizzazione di YouTube toglie `t=`.*
   → `momento` su frammento e citazione; i link conservano il tempo.

6. **Le opere hanno livelli e versioni.** Serie > stagione > episodio (E31), album > traccia (E22, E29), manga >
   adattamenti (E33), brano > cover (E23, E24), poesia dentro un film (E54). *Proposta: `parte-di` sì, interpreti
   e versioni no.* → `parte-di` più `versione-di` con `interprete`; il titolo può mancare (E29). Più i
   **personaggi** (Hohenheim, Murph, Telemaco, Zosima): servono per S1 e per "chi la dice" (E18).

7. **Lo stato d'animo è un episodio, non una proprietà dell'opera.** E21, E67, E71, E72: l'emozione appartiene al
   momento in cui l'ho provata. *Proposta: `suscita` su frammento, citazione **e opera**.* → `suscita` solo sul
   frammento (cosa ho provato io, quel giorno); le emozioni di un'opera si **calcolano** dai miei frammenti.
   Così "come stavo quest'inverno" è una serie temporale (S4), e "mi sento come Sisifo" non diventa `parla-di: sisifo`
   ma `evoca` o `come` (E67).

8. **La reazione non è una scala da 1 a 3.** Ci sono il rifiuto (E08 "da bacio perugina", E41 "boh"), la valutazione
   (E33 "fa schifo") separata dall'impatto ("sto male"), e l'**identificazione** ("questa è la mia", E20, E32; "il disco
   della mia vita", E28). *Proposta: `pancia` 1-3, mai indovinata.* → Le mie parole restano la verità; si estraggono
   tre segnali distinti e solo se espliciti: impatto, giudizio, identificazione. L'identificazione sale nello sguardo.
   E i **ritorni** (E30 "ogni volta", E31 "rivisto") pesano nel ranking più di un numero che non metterò mai.

9. **I temi veri emergono dopo, rileggendo; non si mettono all'ingresso.** "Padre" (S1) non compare in nessun tag
   messo a caldo; "la crepa e la luce" (S2) attraversa cinque tradizioni. *Proposta §4.6: 1-3 temi proposti a ogni
   messaggio; §5.10: conteggio dei tag.* → All'ingresso pochissimo (entità certe, nessun tema obbligatorio); i temi
   nascono nel **consolidamento**, che rilegge i frammenti grezzi e propone fili con le prove (date e frasi).
   È anche così che funziona la memoria: l'episodio si fissa subito, il significato si costruisce dopo.

10. **La memoria è il repository, non la chat; e le posizioni hanno una data.** E02, E51, E59 ("quella di ieri",
    "di questo genere") arrivano in chat nuove dal telefono. E66 → E69 → E70 sono posizioni che si contraddicono.
    *Proposta §5.5: "la memoria sta nella chat"; `contraddice` c'è ma lo sguardo è un file per data.* → Ogni
    ingresso legge prima gli ultimi frammenti (ultimi 3 giorni) per risolvere i riferimenti; le **posizioni**
    (ciò che penso, con data) sono frammenti di un tipo riconoscibile, e "cosa pensavo a novembre" risponde con le
    mie parole e le date, separando ciò che ho detto da ciò che il sistema deduce (E70).

Due cose minori ma concrete: **la prudenza sui temi delicati** (E26, E52, E71: rispondere da persona, non da
archivista, senza diagnosi) va scritta nelle regole; e **il podcast** manca nel corpus come esperienza vera: va
aggiunto con un caso reale quando capita.

## Collegamenti

- [Proposta unica](/progetto/proposta.md) · [Acquisizione](/progetto/acquisizione.md) · [Domande](/progetto/domande.md) · [Schema](/progetto/schema.md)
