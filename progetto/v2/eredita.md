# L'eredità: che cosa passa dall'Atlante al nuovo sistema

> Inventario per lo script di importazione, 2026-10-31. È una proposta di Claude, da validare. Si basa su
> [l'archivio reale](/_progetto/v2/archivio-reale.md) e su [l'essenza](/_progetto/v2/essenza.md). Lo schema definitivo
> arriverà da `modello.md`, che è ancora in scrittura: per questo i nomi tra `<…>` sono **segnaposto** e non campi.
> Non ho toccato nessuna nota e nessuno script. Le righe si riferiscono al commit `4c9fdce`.

## 0. In breve

| | si porta | resta nell'Atlante |
|---|---|---|
| le sue parole | **31 frammenti** `<voce:utente>` e **12 passi** `<voce:mista>`, dedotti da 150 righe trovate | i doppioni della stessa frase in seme, nucleo, concetti e diari |
| convergenze in prosa | **25** come testo, più 1 di riserva | 11 convergenze "mute", che esistono solo come link (elencate come spunti, non importate) |
| entità (fonti) | **46** su 153: 13 nominate da lui e 33 dentro una convergenza | **107**: 81 di Claude mai usate, 11 del seme mai usate, 7 agganciate per dovere, 8 riferimenti d'arte che passano al progetto |
| progetto tatuaggi | 1 progetto con brief, 2 idee sue, 3 spunti, 2 ricerche, 2 pin, 2 stili suoi, il grimorio come cornice e 31 idee come candidati dormienti | 7 schede di stile come catalogo, l'idea archiviata, le sezioni vuote |
| struttura | 8 comportamenti (§5) | 7 discipline, 34 filoni, 25 simboli di una riga, 5 percorsi come note, il meccanismo di validazione per riga |

Criterio generale: **si porta ciò che è passato da lui**, cioè le sue frasi, ciò che ha nominato e le convergenze
agganciate a una sua parola. Il sapere generale resta fuori, perché l'AI ce l'ha già.

## 1. Le sue parole

Ho fatto tre estrazioni: il seme (65 righe: 19 sue e 46 miste), il nucleo con spunti, ricerche e diari (66 righe: 20 e 46)
e le note di mappa (25 righe: 10 e 15). Molte righe sono **la stessa frase ripetuta**: il percorso interiore, per esempio,
compare nel seme, nel nucleo e nel diario d'origine. Qui sotto è già deduplicato. Per ogni frammento indico la fonte primaria
(la più vicina a lui) e le copie da non importare.

**Le date.** La chat d'origine non ha date per i singoli momenti: il seme dice "ottobre 2026" (seme:4). L'unico appiglio
certo è il commit `030c29a`, con cui l'utente carica `SEED.md` il **2026-10-04 alle 22:12**. Per questo:
- le frasi del seme hanno una **data limite**, non una data: `<data: ≤2026-10-04, limite da git>`;
- le frasi di spunti, idee e ricerche hanno la data di `creato` (2026-10-04), che coincide con il primo commit della nota: `<data: 2026-10-04, certa>`;
- le frasi riportate nei diari hanno la data del diario: `<data: AAAA-MM-GG, certa>`;
- nessun frammento resta senza data, quindi nessuno finisce "importato, fuori dalla linea del tempo". Se lo schema
  non ammette date limite, le frasi del seme vanno in quella categoria, con nota "chat d'origine, inizio ottobre 2026".

### 1.1 Voce sua (`<voce:utente>`): 31 frammenti

Pensiero:

| # | frammento | fonte primaria | copie | data |
|---|---|---|---|---|
| U1 | **Il percorso interiore**, "con le mie parole (da conservare così com'è)": *Battaglie interiori, solitudine, senso di vuoto… calma nell'esplorarne i concetti data dall'immensità del dolore superato.* Va importato **intero e intatto**. | `diario/2026-10-04-seed.md:282` | `nucleo.md:43` | ≤2026-10-04 |
| U2 | **La mia lista**: sacrificio anonimo, resilienza napoleonica, il condottiero, l'avventura, la dissoluzione dell'io, le battaglie interiori, il bene relativo, l'evoluzione. | seme:630 | `diario/2026-10-04-origine.md:17` | ≤2026-10-04 |
| U3 | "La dimensione principale della realtà è il dolore. Ma cosa c'è oltre? Amore e verità." | seme:268 | `nucleo.md:23`, `emozioni/dolore.md:15` | ≤2026-10-04 |
| U4 | Sacrificio anonimo: "sacrificarsi per altri o per un bene superiore, sapendo che chi ne beneficia non saprà mai chi è stato." | seme:315 | `concetti/sacrificio-anonimo.md:16` | ≤2026-10-04 |
| U5 | Il condottiero: "il leader, la guida spirituale, la persona a cui affidarsi nelle difficoltà." | seme:325 | `concetti/guida-e-condottiero.md:14` | ≤2026-10-04 |
| U6 | L'avventura: "voglia di esperienza, accettare di non avere risposte alle grandi domande, lasciarsi prendere dal fascino della vita, trovare valore nelle piccole cose." | seme:326 | `concetti/avventura-e-scoperta.md:14` | ≤2026-10-04 |
| U7 | Dissoluzione dell'io: "distacco dall'io occidentale… questa vita come una delle tante manifestazioni della coscienza nell'infinità del tempo; elevazione e glorificazione di questo nuovo concetto di io." | seme:327 | `concetti/dissoluzione-dell-io.md:15` | ≤2026-10-04 |
| U8 | Battaglie interiori: "vincere se stessi, le versioni di me morte lungo il cammino." | seme:328 | `concetti/battaglie-interiori.md:14`, `percorsi/versioni-morte.md:11` | ≤2026-10-04 |
| U9 | "Non esiste un bene assoluto, ma solo relativo al negativo esplorato." | seme:329 | `concetti/bene-relativo.md:12` | ≤2026-10-04 |
| U10 | "Domande che ancora non so di volere": la svolta esoterica, "mi attira l'esoterico con una coscienza elevata". | seme:633 (tra virgolette), 258 | `nucleo.md:61`, `concetti/soglia-e-mistero.md:16`, `diario/2026-10-04-origine.md:20` | ≤2026-10-04 |

Su U4–U9: il seme li dà come "dalla mia lista", ma è Claude che li ha messi per iscritto. Vanno importati come sua
voce, con `<nota: forma forse ritoccata da Claude nel seme>`. Le fonti accodate a ciascuno ("Fonti: Eraclito…") sono di Claude e restano fuori.

Riferimenti e gusto:

| # | frammento | fonte primaria | copie | data |
|---|---|---|---|---|
| U11 | Persone che hanno segnato la mia visione: Jordan Peterson, Marco Aurelio, Albert Camus. | seme:253 | `nucleo.md:55` | ≤2026-10-04 |
| U12 | Serie e personaggi: Fullmetal Alchemist: Brotherhood, True Detective, Berserk. | seme:254 | `nucleo.md:56` | ≤2026-10-04 |
| U13 | Musica: Radiohead, Deftones, "quella wave rock eterea e malinconica". | seme:255 | `nucleo.md:57` | ≤2026-10-04 |
| U14 | Territori: filosofia (stoicismo, romanticismo), religione (dal cristianesimo alle divinità greche), esoterismo e mistero, serie TV, anime, film cult e canzoni. | seme:251 | `nucleo.md:51` | ≤2026-10-04 |
| U15 | Metodo: "prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro." | seme:249 | `nucleo.md:49` | ≤2026-10-04 |
| U16 | "Mi piacciono le patchwork sleeve… che però si leggono come un'unica opera. Non le sleeve 'fuse'." | seme:259 | seme:469, 634; `nucleo.md:62`; `stile/patchwork.md:11` | ≤2026-10-04 |
| U17 | Incisione e xilografia: "la direzione che mi attira di più." | seme:455 | `stile/incisione-xilografia.md:11` | ≤2026-10-04 |

Frammenti portati dal telefono (sono il modello del nuovo ingresso):

| # | frammento | fonte primaria | data |
|---|---|---|---|
| U18 | **Invictus** di Henley, per intero, e la sua riga: "Un candidato se vorrò fare testi lunghi." Il testo sta solo nello spunto, non in `fonti/opere/invictus.md`. | `spunti/capitano-della-mia-anima/index.md:25`, testo alle righe 27–45 | 2026-10-04 |
| U19 | Il **monologo di Rust** (ep. 1), trascritto da lui: "I think human consciousness is a tragic misstep in human evolution…". | `spunti/true-detective-coscienza/index.md:28` | 2026-10-04 |
| U20 | "**I don't sleep, I just dream.**" | `spunti/true-detective-sogno/index.md:23` (copia: `idee/sognatore-insonne/index.md:27`) | 2026-10-04 |
| U21 | Il sognatore: "Una sagoma, il fumo della sigaretta, la frase." Poi le sue due domande: "Come giocare con il fumo della sigaretta?" e "Come disporre la sagoma rispetto al testo?" | `idee/sognatore-insonne/index.md:38, 41, 42` | 2026-10-04 |
| U22 | Sul monologo: "Quanto tenere del testo?", "da capire quanto poi tenere". | `idee/monologo-di-rust/index.md:33`; `diario/2026-10-05-revisione-seme.md:30` (copia: `_archivio/corona-cieca/index.md:32`) | 2026-10-04 |
| U23 | "Ti condivido due idee, entrambe legate a true detective." | `diario/2026-10-05-revisione-seme.md:30` | 2026-10-04 |
| U24 | "Rileggere i Pensieri… cercando materiale per tatuaggi: frasi, immagini, convergenze." | `ricerche/pensieri-marco-aurelio/index.md:7` | 2026-10-04 |
| U25 | "L'account Instagram @soorajsaxena. Da cercare bene: c'è qualcosa di interessante?" | `ricerche/soorajsaxena/index.md:25` | 2026-10-04 |
| U26 | Due pin: `970173944741790982` (Rust sotto il crocifisso) e `150378075043142308` (la testa bendata con le corna). Le descrizioni sono di Claude, i link sono suoi. | `spunti/true-detective-sogno/index.md:42`, `spunti/true-detective-coscienza/index.md:65` | 2026-10-04 |

Sul sistema (dicono come vuole essere aiutato; vanno in `<preferenze-di-lavoro>`, non tra i pensieri):

| # | frammento | fonte | data |
|---|---|---|---|
| U27 | "Le altre mi sembra che te le sia inventate tu di sana pianta." | `diario/2026-10-05-revisione-seme.md:11` | 2026-10-05 |
| U28 | "Dimmi tu." Lo dice sulla fusione della corona cieca, e affida la scelta a Claude. | `diario/2026-10-05-validazione.md:40` | 2026-10-04 |
| U29 | "Mi piacerebbe che la prossima wave fosse legata alle reference che ti ho dato, film/serie/personaggi." | `diario/2026-10-06-nuove-proposte.md:71` | 2026-10-06 |
| U30 | "Vai con la mappa." | `diario/2026-10-07-atlante-dei-concetti.md:11` | 2026-10-07 |
| U31 | Le domande d'esempio per il memo: "canzoni su questo tema", "le migliori citazioni di Dostoevskij". | `diario/2026-10-31-memo-coscienza.md:11` | 2026-10-31 |

### 1.2 Voce mista (`<voce:mista>`): 12 passi

Sono sintesi di Claude in prima persona, che lui ha accolto senza mai correggerle. Non diventano frammenti suoi: formano
**il primo sguardo datato**, `<sguardo: 2026-10-05>` (data dell'`aggiornato` del nucleo), con la provenienza scritta accanto a ogni passo.

| # | passo | fonte |
|---|---|---|
| M1 | La frase-formula: "Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità." | `nucleo.md:11` (seme:271) |
| M2 | Il filone: "L'avventura. Il viaggio nell'esistenza, l'affrontare la realtà, l'evoluzione della propria filosofia." | `nucleo.md:15` (seme:264) |
| M3 | Dove sono ora: "stadio assurdista, alla Camus. Non nichilismo… non nascondermi, affrontarlo." | `nucleo.md:19` (seme:266) |
| M4 | I tre movimenti: il peso, lo sguardo, l'oltre. | `nucleo.md:29–31` (seme:274–276) |
| M5 | La sfumatura esoterica: "il mondo è più vasto di quello che posso capire, e questo mi affascina." | `nucleo.md:35` (seme:278) |
| M6 | Avvertenza a me stesso: "il viaggio e l'atto di affrontare, non lo stadio assurdista in sé." | `nucleo.md:39` (seme:280) |
| M7 | Estetica: "nero, incisione/xilografia antica, mistero." | `nucleo.md:63` (seme:260) |
| M8 | Le tre tensioni: il condottiero contro la dissoluzione dell'io, l'assurdo contro l'esoterico, Dante cristiano contro lo sguardo assurdista. | seme:349–351, `concetti/tensioni.md:15–17` |
| M9 | Resilienza napoleonica: "virtù e fortuna, la visione napoleonica e machiavellica". È la sua parola, ma l'ha riformulata Claude. | `concetti/virtu-e-fortuna.md:13–15` (seme:324) |
| M10 | L'evoluzione: "evoluzione, avventura, cammino." | `concetti/evoluzione-e-percorso.md:14` (seme:330) |
| M11 | "Il sito mostrava tutto, con i segni rossi: troppo caos." È una preferenza sul sistema. | `diario/2026-10-05-validazione.md:53` |
| M12 | Il racconto della chat d'origine, in otto passi. Serve come storia del progetto, non come pensiero. | seme:627–635, `diario/2026-10-04-origine.md:15–22` |

Fuori dalle sue parole restano i principi del seme (seme:28–34), le decisioni di default della chat (seme:42–47, poi
rovesciate) e le domande aperte di Claude (seme:638–640). Il campo `risonanza` ("lo compilo io", seme:491) è rimasto
vuoto ovunque: è una prova che le domande a pancia non funzionano (§5), non un dato da importare.

### 1.3 Il vocabolario delle emozioni

Sono sue, perché stanno nel percorso interiore (U1), queste 10: apatia, caos, dolore, gioia, libertà, pace interiore, rabbia,
risentimento, solitudine, vuoto. Le altre 4 (lucidità, malinconia, meraviglia, passione) sono di Claude: si importano
solo come `<proposta>`, oppure si lasciano. Di ogni emozione passa **solo la parola**: le definizioni di una riga sono di Claude.

## 2. Le convergenze: 25 da portare come testo

Criterio: due tradizioni o opere almeno, accostate da una frase che spiega il legame e agganciate a una sua parola (l'"aggancio").
Si porta **il passo intero**, con `<origine: claude>` (o `seme` dove indicato). La loro approvazione verrà dall'uso (§7, R6).
Dove stanno: 15 in idee di Claude, 9 in note di mappa (in parte con un rinvio a un'idea), 1 in un blocco proposta di una nota sua.

| # | convergenza | passo | che cosa collega | aggancio (sua parola) |
|---|---|---|---|---|
| C1 | Il bene senza nome | `concetti/sacrificio-anonimo.md:16–26` | Lamed Vav, Maimonide, Matteo 6,3, Marco Aurelio V.6, Tao 17, Kṣitigarbha, Ed (FMA) | sacrificio anonimo (U4) |
| C2 | Il leone che diventa fanciullo | `concetti/tensioni.md:15–16` | Napoleone, Machiavelli, i 36 giusti, Nietzsche | dissoluzione dell'io (U7) |
| C3 | Posare l'elmo | `idee/elmo-e-vite/index.md:27–31, 41, 43–48` | Cincinnato, Marco Aurelio V.6, Isaia 2,4, Tao 17, Al (FMA) | il condottiero (U5) |
| C4 | Il mulo e la guida | `idee/mulo-e-guida/index.md:27, 33, 44` | David e Delaroche su Napoleone, la guida Dorsaz, Sisifo | resilienza napoleonica (U2) |
| C5 | Dal buio alle stelle | `fonti/opere/divina-commedia.md:21–26`, `percorsi/dal-dolore-alle-stelle.md:14`, `idee/sleeve-dantesca/index.md:26, 36` | le tre cantiche, Rust nel finale | la frase-formula (M1) |
| C6 | L'altro "oltre" | `concetti/amore.md:14` | Dante, Psiche, Camus (dall'io al noi) | amore (U3) |
| C7 | La verità che si paga | `concetti/verita.md:16` | Camus, Rust, la Verità di FMA, Bernini | verità (U3) |
| C8 | Il prezzo della conoscenza | `concetti/prezzo-della-conoscenza.md:15–17`, `idee/porta-della-verita/index.md:26` | Prometeo, l'occhio di Odino, Genesi, la Porta di FMA | "a occhi aperti" (M1) |
| C9 | L'armatura che divora | `idee/visiera-aperta/index.md:27–31, 48–50` | Berserk, i berserkir di Snorri, Odino | "non nascondermi" (M3) |
| C10 | Il velo | `simboli/velo.md:13`, `fonti/sacro-e-mito/iside.md:15`, `fonti/pensiero/kant.md:17`, `idee/velo-di-iside/index.md:26` | Iside a Sais, Bernini, Kant | il mistero come orizzonte (M5) |
| C11 | Il cerchio | `simboli/ouroboros.md:14–16`, `concetti/eterno-ritorno.md:14` | Homunculus (FMA), "cerchio piatto" di Rust, eterno ritorno, alchimia | "infinità del tempo" (U7) |
| C12 | Uno è tutto | `idee/uno-e-tutto/index.md:27–33, 44, 48–51` | Crisopea di Cleopatra, Eraclito B10, Izumi (FMA), la cicala | "una forza più grande" (U7) |
| C13 | Le mute della cicala | `idee/mute-della-cicala/index.md:27–31, 45–48` | Fedro 259, cicale di giada Han, utsusemi del Genji | versioni di me morte (U8) |
| C14 | Solve et coagula | `idee/braccio-del-fratello/index.md:27–33, 50–53` | Scar (FMA), alchimia, Lévi, Eraclito B60 | rabbia, risentimento (U1) |
| C15 | L'amore dentro il buio | `idee/buio-sotto-il-buio/index.md:27–33, 43, 47–50` | Rust ep. 8, Giovanni della Croce, la Nube della non-conoscenza | amore e verità oltre il dolore (U3) |
| C16 | L'assurdo prima di Camus | `fonti/arte/friedrich-monaco.md:17`, `fonti/opere/berserk.md:17`, `fonti/pensiero/camus.md:22`, `idee/discesa-di-sisifo/index.md:26–32` | Friedrich, Berserk, la discesa di Sisifo | "non nascondermi, affrontarlo" (M3) |
| C17 | Invitto | `idee/invitto/index.md:27–31, 43, 47–49` | Marco Aurelio VIII.48, Henley | Invictus (U18), battaglie interiori |
| C18 | Scritti nel colpo | `idee/la-notte-che-mi-copre/index.md:49–50` | Henley in ospedale, Marco Aurelio tra i Quadi | "testi lunghi" (U18) |
| C19 | A se stesso | `idee/a-se-stesso/index.md:27, 45, 49–52` | Marco Aurelio, il Memoriale di Pascal, l'orologio di Ed | il percorso "da conservare così com'è" (U1) |
| C20 | La calma scavata | `idee/lago-nel-cratere/index.md:27–31, 41, 45–48` | l'Averno di Virgilio, Crater Lake, Tao 15 | "calma… dolore superato" (U1) |
| C21 | Alzati e cammina | `idee/alzati-e-cammina/index.md:27–33, 48–51` | Ed e Rose (FMA), Atti 3,6, Paré, Nuada | "vincere se stessi" (U1) |
| C22 | La lotta al guado | `idee/lotta-al-guado/index.md:27–31, 41, 45–48` | Giacobbe (Genesi 32), Peterson, la Bestia di Berserk, Rembrandt, Delacroix | battaglie interiori (U1) |
| C23 | Lo stormo | `idee/lo-stormo/index.md:27–33, 43, 47–49` | la spirale di Rust (ep. 2), il Simurgh di Attar, l'augurio romano | "domande che non so di volere" (U10) |
| C24 | Il cavaliere e la morte | `idee/cavaliere-e-morte/index.md:27–33, 48–51` | il Cavaliere del Teschio (Berserk), Dürer, Erasmo | la guida (U5) |
| C25 | L'ora nel giardino | `idee/sognatore-insonne/index.md:65–67` (blocco proposta) | Rust e la croce, il Getsemani, il Buddha, Eraclito B89 | "I don't sleep, I just dream" (U20) |
| (riserva) | Il monologo cancellato | `idee/monologo-di-rust/index.md:40–44` (blocco proposta) | A Humument di Tom Phillips, Camus | "Quanto tenere del testo?" (U22) |

Origine: C1, C2, C5–C8, C10, C11 e C16 stanno in note di mappa (`<origine: seme>`, validate per default). Le altre stanno
in idee di Claude mai validate, o in blocchi proposta (`<origine: claude>`).

**Le convergenze mute** (si portano come titolo e da qui non va altro): imparare a morire (attorno a `memento-mori`),
le versioni morte fuori da C13, la coscienza come peso (Zapffe, Schopenhauer, Cioran), la dissoluzione dell'io (Advaita,
Eckhart), caduta e redenzione, gli occhi (Odino, il cratere, "a occhi aperti"), le stelle di Kant, Eraclito B60 accanto alla
discesa di Sisifo, sublime e abisso, il masso, il coro delle domande. Per lo script valgono come `<spunto-per-claude>`: domande
che il sistema potrà scrivere in prosa **quando un suo frammento le tirerà in ballo**. Non vanno scritte in blocco ora.

Due correzioni ad [archivio-reale](/_progetto/v2/archivio-reale.md): Faust **non compare** nel testo del "prezzo della conoscenza"
(C8) e l'accostamento di Eraclito B60 a Sisifo esiste solo nel documento di progetto, non nelle note.

## 3. Le entità vive

**Criterio di vitalità.** Una fonte è viva se soddisfa una di due condizioni:
- **A, nominata da lui**: compare in una sua parola (§1.1), nel nucleo, in un suo spunto, idea o ricerca;
- **B, dentro una convergenza importata** (§2): un nome che regge una delle 25 frasi.

Non basta che una nota la colleghi: i link nel frontmatter e nei `## Collegamenti` li ha messi tutti Claude. Le persone e
le opere nominate in una convergenza **senza una nota propria** (Cincinnato, Delaroche, Snorri, Attar, Virgilio, Erasmo,
Paré, Lévi, Tom Phillips…) restano testo della convergenza: non diventano entità, perché lui non le ha nominate.

Ho fatto il conteggio con uno script sui link delle 153 fonti (nucleo, spunti, ricerche, idee, archivio, concetti della sua lista)
e poi l'ho incrociato con §2 a mano.

### 3.1 A: nominate da lui (13)

`jordan-peterson`, `marco-aurelio`, `camus`, `fma-brotherhood`, `true-detective-s1`, `berserk`, `radiohead`, `deftones`,
`invictus` (portata da lui, `origine: mia`), `stoicismo`, `romanticismo` (dai suoi territori), `napoleone` (dalla sua
"resilienza napoleonica"), `divina-commedia` ("Dante cristiano", M8). Una pista in più, Sooraj Saxena, non ha una fonte:
entra come `<persona>` dalla ricerca.

`radiohead` e `deftones` hanno lo stesso corpo e nessuna canzone: si importa solo il nome, `<vuota: atmosfera>`.

### 3.2 B: dentro una convergenza (33)

- Pensiero e mito: `lamed-vav`, `maimonide`, `vangelo-matteo`, `tao-te-ching`, `kshitigarbha`, `machiavelli`, `nietzsche`,
  `eraclito`, `kant`, `iside`, `psiche`, `prometeo`, `odino`, `albero-della-vita`, `sisifo`, `alchimia`, `ermetismo`, `advaita-buddhismo`.
- La genealogia di Rust (lo spunto `true-detective-coscienza` e l'alce di Zapffe, §4.14 dell'archivio reale): `zapffe`,
  `schopenhauer`, `ligotti`; più `jung`, la cui frase sull'oscurità regge la prima prova di [archivio-reale](/_progetto/v2/archivio-reale.md) §5.
- Arte: `bernini-verita`, `friedrich-monaco`, `friedrich-viandante`, `durer-melencolia`, `michelangelo-prigioni`.
- Di Claude, ma nominate per esteso in una convergenza: `platone` (il Fedro, C13), `giovanni-della-croce` e `notte-oscura` (C15),
  `pascal` (C19). Si importano con `<origine: claude>`; il loro testo non va, va solo l'identità.
- Opere sue di contorno: `asino-d-oro` e `canova-amore-psiche` (Psiche, C6).

### 3.3 Le citazioni che le accompagnano

Nessuna delle 83 sezioni `## Citazione` è marcata "(da verificare)". Sulle entità vive le citazioni sono 19: 17 stanno in un
blocco proposta (scelte da Claude), 2 sono "accolte" perché la fonte stessa è di Claude. Le riporto con un mio giudizio, che
**non è una verifica sul testo**:

| entità | citazione | riferimento | stato da importare |
|---|---|---|---|
| divina-commedia | "E quindi uscimmo a riveder le stelle." | Inferno XXXIV, 139 | `<proposta>`, riferimento sicuro |
| true-detective-s1 | "Una volta c'era solo il buio. Se vuoi saperlo, la luce sta vincendo." | ep. 8, Form and Void | `<proposta>`, è una traduzione: va tenuto l'originale inglese |
| camus | "Bisogna immaginare Sisifo felice." | Il mito di Sisifo, ultima frase | `<proposta>`, sicuro |
| eraclito | "La via in su e la via in giù sono una e la stessa." | fr. 60 DK | `<proposta>`, sicuro |
| jordan-peterson | "Metti perfettamente in ordine la tua casa prima di criticare il mondo." | 12 regole, regola 6 | `<proposta>`, sicuro (è il titolo della regola) |
| jung | "Non si diventa illuminati immaginando figure di luce, ma rendendo cosciente l'oscurità." | Opere 13, § 335 | `<proposta>`, da verificare: è molto citata, il paragrafo va controllato |
| kant | "Il cielo stellato sopra di me, la legge morale in me." | Critica della ragion pratica, Conclusione | `<proposta>`, sicuro (è ridotta) |
| maimonide | "Il silenzio è lode per te." | Guida dei perplessi I, 59 | `<proposta>`, da verificare (la versione del Salmo 65 cambia con la traduzione) |
| marco-aurelio | "Ciò che ostacola l'azione fa avanzare l'azione…" | Pensieri V, 20 | `<proposta>`, sicuro |
| nietzsche | "Amor fati: questo sia d'ora innanzi il mio amore!" | La gaia scienza § 276 | `<proposta>`, sicuro |
| schopenhauer | "La vita oscilla, come un pendolo… tra il dolore e la noia." | Il mondo… § 57 | `<proposta>`, sicuro |
| stoicismo | "Delle cose, alcune dipendono da noi…" | Epitteto, Manuale 1 | `<proposta>`, sicuro |
| tao-te-ching | "Il Tao che può essere detto non è l'eterno Tao." | cap. 1 | `<proposta>`, sicuro |
| zapffe | "Conoscete voi stessi, siate infecondi…" | L'ultimo Messia, finale | `<proposta>`, da verificare sulla traduzione |
| ermetismo | "Ciò che è in basso è come ciò che è in alto…" | Tavola di smeraldo | `<proposta>`, sicuro |
| iside | "Io sono tutto ciò che è stato, che è e che sarà…" | Plutarco, Iside e Osiride 9 | `<proposta>`, sicuro |
| vangelo-matteo | "Non sappia la tua sinistra ciò che fa la tua destra." | Matteo 6, 3 | `<proposta>`, sicuro |
| meister-eckhart | "L'occhio con cui vedo Dio è lo stesso occhio con cui Dio mi vede." | Predica 12 | resta fuori: l'entità è morta (§6) |
| ombra (Jung) | "Ognuno porta con sé un'ombra…" | Psicologia e religione § 131 | resta fuori: l'entità è morta (§6) |

Le altre entità vive non hanno una citazione. Le citazioni **dentro le convergenze** (Tao 15, Fedro 259, Eraclito B89…)
viaggiano con il testo e mantengono lo stato della convergenza.

## 4. Il progetto tatuaggi

Diventa **un progetto dentro il sistema**, `<progetto: tatuaggi>`, e non più la cornice di tutto. Forma proposta:

| che cosa | da dove | in che forma |
|---|---|---|
| **Brief** | U15, U16, U17, M6, M7 | testo breve del progetto: metodo, nessun limite di tono, patchwork, nero e incisione, "il viaggio e non la tappa" |
| **Il formato** | `idee/grimorio/index.md` (seme, mai validata) | `<proposta>` di cornice: il braccio come le tavole di un trattato. È l'unica idea che sposa patchwork ed esoterico, cioè U10 e U16 |
| **Idee sue** (2) | `idee/sognatore-insonne/`, `idee/monologo-di-rust/` | `<idea attiva>` con le sue domande (U21, U22); i blocchi proposta che contengono (C25 e la riserva) vanno come convergenze collegate |
| **Spunti** (3) | `spunti/*` | frammenti suoi (U18–U20) collegati al progetto, non al progetto soltanto: Invictus e Rust sono pensiero prima che tatuaggio |
| **Ricerche** (2) | `ricerche/pensieri-marco-aurelio/` (in corso), `ricerche/soorajsaxena/` (da fare) | `<pista>` con stato e link; "Trovato" ed "Esiti" sono vuoti, quindi non c'è altro da portare |
| **Pin** (2) | U26 | `<riferimento visivo>` con l'URL normalizzato; un pin compare in 4 note, va importato una volta sola |
| **Stile** | `stile/patchwork.md`, `stile/incisione-xilografia.md` | parti del brief, perché sono decisioni sue. Le altre 7 schede (lettering di Claude compreso) restano come catalogo |
| **Candidati** (31) | le altre idee: 13 del seme e 18 di Claude | `<candidato dormiente>`: titolo, una riga di concetto, placement e il collegamento alla convergenza che lo regge (C3–C24). Non entrano in nessuna coda da validare |
| **Riferimenti d'arte** (8) | le fonti usate solo da idee: Doré, Fludd, Flammarion, Mutus Liber, Rodin, Tiziano, von Stuck, Ofanim | `<riferimento visivo>` del progetto, non entità del memo |

Restano nell'Atlante `_archivio/corona-cieca/` (il suo materiale è già in U19, U22 e U26), le 38 sezioni "_Nessun pin collegato._",
le "Domande a pancia" di ogni idea e il campo `risonanza`, che è vuoto. Immagini: 0, non c'è niente da portare.

## 5. Otto idee strutturali da conservare come comportamento

Queste non si importano come dati: diventano modi di rispondere e di lavorare.

1. **Il coro**: a una domanda grande rispondono più voci, e conta che **litighino** (Dōgen contro Crick, l'Ecclesiaste contro
   Sagan). Comportamento: quando arriva una domanda, mostrare le posizioni in disaccordo, non una sintesi. Dalle 8 domande si
   tengono **i titoli** come hub; le voci del coro, tutte in blocchi proposta, restano qui.
2. **Il percorso come lente**: peso → sguardo → oltre è l'asse del nucleo (M4), e 12 idee lo usano. Comportamento: collocare
   un frammento nuovo su uno stadio ("questo è il peso, al passo 1"). Gli altri 4 percorsi sono raccolte, e
   `tre-metamorfosi-percorso` è un doppione.
3. **Il blocco proposta, cioè la provenienza per passo**: dentro un testo suo, ciò che è di Claude si vede. È il punto non
   negoziabile (U27). Si conserva la marcatura e si lasciano la pagina "Da validare" e la validazione per riga di diario.
4. **Il nucleo con l'avvertenza a me stesso**: un punto di vista datato, con una regola contro se stesso ("il viaggio,
   non la tappa", M6). Comportamento: ogni sguardo nuovo affianca il vecchio, non lo sostituisce.
5. **La convergenza in prosa agganciata a una sua parola** (§2): è ciò che l'Atlante dimostra essere la meraviglia.
   Comportamento: un collegamento senza una frase non vale; la frase si scrive quando la chiede un suo frammento.
6. **Dal pop all'archetipo, per genealogia**: Rust → Zapffe → Schopenhauer → Ligotti. Il riferimento pop sta nel dettaglio e
   l'archetipo regge da solo. Comportamento: davanti a un frammento pop, risalire di uno o due anelli, non di dieci.
7. **Le tensioni tenute aperte** (M8): il condottiero contro la dissoluzione, l'assurdo contro l'esoterico. Comportamento:
   non risolvere, segnalare quando un frammento nuovo tira da una parte.
8. **Archiviare con il motivo, mai cancellare**: `corona-cieca` racconta una decisione. Comportamento: ciò che sfuma o viene
   scartato lascia una riga di motivo. È ciò che serve al decadimento delle proposte.

## 6. Lo scarto: che cosa resta nell'Atlante

Le note analizzate sono 300, contando i 12 diari e il nucleo. L'Atlante resta com'è, **pubblico e consultabile**: non si
cancella niente e il nuovo sistema può puntarci con un link. Resta qui:

| che cosa | quante | perché |
|---|---|---|
| fonti di Claude mai usate | 81 (85 meno le 4 nominate in una convergenza) | nessuna sua parola, idea o convergenza le tocca: sono schede enciclopediche, scritte tutte il 7 ottobre con un unico stampo |
| fonti agganciate per dovere | 7 (`confucio`, `il-principe`, `meister-eckhart`, `pico-della-mirandola`, `maps-of-meaning`, `ombra` di Claude; `tarocchi` del seme) | sono collegate a un concetto della sua lista, ma senza una frase che spieghi il legame |
| fonti del seme mai usate | 11 (`blake-antico-dei-giorni`, `kintsugi`, `camus-opere`, `evangelion`, `zarathustra`, `seneca`, `ecclesiaste`, `fenice`, `icaro`, `lucifero`, `persefone`) | nessuna idea, nessuno spunto e nessuna convergenza le usa (`prometeo` invece è in B, per C8) |
| riferimenti d'arte | 8 (`dore-commedia`, `fludd`, `incisione-flammarion`, `mutus-liber`, `rodin-porta-inferno`, `tiziano-sisifo`, `von-stuck-sisifo`, `ofanim`) | passano al progetto tatuaggi come riferimenti, non come entità |
| corpo di concetti, emozioni e simboli | 26 + 14 + 25 | passano le sue parole (§1) e i nomi; i testi di una riga di Claude restano. Dei simboli resta tutto tranne `ouroboros` e `velo`, che vivono in C10 e C11 |
| discipline e filoni | 7 + 34 | zero link in entrata e doppioni; `<tradizione>` diventa al più un attributo leggero |
| cori delle 8 domande | 8 | voci di Claude, tutte in proposta: passa la forma (§5.1), non il contenuto |
| percorsi come note | 5 | passa la lente (§5.2) |
| schede di stile | 7 | catalogo |
| collegamenti proposti nei diari | 168 | nessuno è mai stato deciso; nel nuovo sistema i legami nascono dalle convergenze |
| blocchi proposta aperti | 44 | passano solo i 2 che contengono una convergenza (C25 e la riserva); gli altri restano qui |
| `## Evoluzione` automatica, `risonanza`, "Perché mi colpisce", "Domande a pancia" | 44 righe identiche e tutti i campi vuoti | non hanno contenuto |
| sito, script e template | tutto | restano la casa dell'Atlante |

Il bilancio sulle fonti: **46 portate (30%) e 107 lasciate (70%)**, di cui 8 passano al progetto come riferimenti. Dalle note di mappa si portano 31 frammenti e 12 passi misti
(contro circa 300 note), 25 convergenze, 1 progetto e 8 comportamenti. In parole: il testo che passa è forse un decimo
dell'Atlante, ma è quello che lui ha portato o che risponde a una cosa sua.

## 7. Le regole di trasformazione per lo script

I segnaposto valgono finché `modello.md` non fissa i nomi. Ogni regola ha la forma "vecchia forma → nuova".

- **R1. Frase sua → frammento.** Una riga di §1.1 diventa `<frammento>` con il `<testo originale>` intatto (elenchi
  compresi), `<voce: utente>`, `<data>` presa da §1 (certa o limite) e `<provenienza: file:riga>`. Le copie elencate non generano frammenti.
- **R2. Passo misto → sguardo.** Le righe M1–M10 diventano i paragrafi di un `<sguardo datato 2026-10-05>`; ogni paragrafo
  porta `<voce: mista>`. M11 va nelle preferenze, M12 nella storia del progetto.
- **R3. Preferenza sul sistema → istruzione.** U27–U31 e M11 diventano `<preferenze-di-lavoro>` datate, lette dall'agente e non
  mostrate come pensieri.
- **R4. Convergenza → testo.** Ogni riga di §2 diventa `<convergenza>`: il passo copiato intero, i link interni riscritti verso le
  entità di §3 (dove non esistono, il nome resta testo), `<aggancio: id del frammento>` obbligatorio e `<origine>` dalla nota di partenza.
- **R5. Fonte viva → entità.** Una fonte A o B diventa `<entità persona|opera|mito|concetto>`: si portano il titolo, `forma`
  e `anno` (se ci sono) e **una riga** di descrizione al massimo; il corpo resta qui. `autore` e `influenzato-da` diventano legami
  solo se entrambe le entità sono vive.
- **R6. Proposta → stato per uso.** Tutto ciò che ha `<origine: claude>` (le convergenze in idee e blocchi, le citazioni in
  proposta, i candidati) entra come `<proposta>` **fuori da ogni coda**: diventa sua quando lui la richiama o la cita,
  sfuma se non la tocca entro `<soglia di decadimento>`. Nessun `validata: false` arriva nel nuovo sistema come debito.
- **R7. Citazione → citazione con stato.** La citazione passa con `<verifica: sicura|da-verificare>` come in §3.3; la sua `<origine>`
  è sempre `claude` (l'ha scelta Claude) e non coincide con l'origine dell'entità.
- **R8. Idea di tatuaggio → elemento del progetto.** `origine: mia` → `<idea attiva>`; `seme` e `claude` → `<candidato dormiente>`,
  con una riga di concetto e il legame alla sua convergenza. I campi `placement`, `formato` e `stile` restano attributi del progetto.
- **R9. Spunto e ricerca → frammento e pista.** Lo spunto diventa frammento suo (R1) legato al progetto; la ricerca diventa
  `<pista>` con stato, oggetto e link. Le sezioni vuote ("Da scrivere io, a pancia", "Ancora nessuno") non passano.
- **R10. Pin → riferimento visivo.** L'URL normalizzato diventa `<riferimento visivo esterno>`, deduplicato per ID. La descrizione è di Claude e va marcata come tale.
- **R11. Emozione → vocabolario.** Le 10 parole sue entrano in `<vocabolario emozioni>`; le altre 4 entrano come `<proposta>` o non entrano.
- **R12. Ciò che non passa → link.** Ogni nota non importata resta raggiungibile con il suo URL pubblico: lo script, se serve, scrive
  `<fonte esterna: URL Atlante>` sulle entità che ne derivano, senza copiare altro.
- **R13. Domande → hub.** I titoli delle 8 domande diventano `<domanda>` vuote; le voci del coro non passano (R6 non si applica:
  sono troppe e mai toccate).

Fuori dalle regole: i 12 diari non si importano. Ne passano soltanto le frasi sue (§1) e la storia del progetto (M12).
