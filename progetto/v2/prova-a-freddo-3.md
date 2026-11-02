# Terza prova a freddo del pacchetto

**Verdetto: va corretto in questi punti** (quattro voci alte: P3-55, P3-56, P3-69, P3-79; nessuna mi ha fermato, ma tre
hanno chiuso una porta per una divergenza tra i testi del pacchetto e la quarta l'ha aperta su un ponte che il banco stesso
non sa dire se valga).

## Fin dove sono arrivato

Ho fatto il passo 1 di `prompt-avvio` e costruito in `/tmp/memo` (un clone di questo repo, senza push) i blocchi da 0 a 6.
Il collaudo è andato così:
- blocchi 0–1: test verdi; banco minimo con 13 prove JSON (B01, B02, B03, B06, B11, B12, B14, B18, B22, B25, D02, R01a, R14);
- blocco 2: punto zero importato da tattoo-shit `3a7ea79` (35 frammenti, 52 nodi, 60 `eredita`, 26 `converge-con`), tag
  `punto-zero`; **D02 "oggi" fallisce al primo giro** (P3-55, P3-56) e passa al secondo, dopo due righe nel `CLAUDE.md`;
- blocco 3: ricette e `simula-memo.mjs`;
- blocco 4: primo ritratto del giorno 1; **R01a fallisce al primo giro del giudice** (P3-69) e passa al secondo, sulla
  stessa uscita, con la domanda resa univoca;
- blocco 5: **10 prove elencate su 10 al primo giro** (B01, B02, B03, B06, D02 in Specchio la sera del 20/11, B11, B12, B14,
  B22, B25), sul ramo `banco/zero`, in ordine di data, una sessione "smista" per memo;
- blocco 6: R14 sui memo sintetici B01 e B02, Specchio la sera del 5/11; **passa**, con un ponte B01 ↔ seme `s01` ✧ e non
  quello atteso con Rust (P3-79).

Sono **fermo alla porta del blocco 6**, come vuole `prompt-avvio`.
- Esito in cinque righe: R14 passa sia nei criteri deterministici (D0: u19 tra i vicini di B01) sia per i tre giudici
  (sì, sì, no). Il ponte è «*diceva che il nichilismo è l'ospite inquietante* ✦ (3 novembre)» contro il seme «Non nichilismo:
  accettare il peso…» ✧ (entro il 5 ottobre). Il ponte atteso Galimberti–Rust non è uscito. Specchio non l'ha visto: `vicini`
  lo dà, ma senza parole in comune.
- La domanda a pancia, che non si simula, sarebbe: «In questi tre giorni, aprire Specchio la sera ti ha dato qualcosa che non
  avevi?». La seconda domanda («Se ti dico Galimberti e Rust, il nesso lo vedi da te?») il piano la vuole solo se il ponte non
  esce; qui è uscito un altro ponte, quindi la farei comunque, per capire se quello vero si vede.
- Resta aperta anche la pancia del blocco 4: «ti ha detto qualcosa che non sapevi?».

**I passi a mano.**
- U1 (il repo privato) e U2 (Claude sull'account, l'ambiente *Trusted*, il setup script): simulati dal clone locale, con
  `ambiente/setup.sh` lanciato a mano in ogni clone.
- U3 (il PAT) e U4 (il Comando rapido): non fatti, perché non c'è il telefono. I memo del banco li ha scritti
  `scripts/simula-memo.mjs` byte per byte come la ricetta, con la data del caso (piano, blocco 3). P3 resta da fare.
- U5–U9: appartengono ai blocchi 7–8, non raggiunti.
- Nessuna sessione ha mai chiesto o toccato un token.

**Che cosa ho letto fuori dal pacchetto.**
- Le note di tattoo-shit al checkpoint.
- Il codice delle due prove precedenti, che il pacchetto indica come non normativo (`progetto/prova-a-freddo-2/codice/`, il
  codice della prima non è servito).
- Nessun file di `progetto/v2/`, né i resoconti delle prove precedenti, né la storia git. Il pacchetto rimanda a diversi file
  di quel tipo (P3-1, P3-2, P3-4) e non li ho seguiti.

**Errore mio, non del pacchetto.** Ho lanciato uno `git stash` sul ramo del banco mentre la sessione di B11 ci lavorava. L'ho
ripristinato con `stash pop` prima del suo commit, e `verifica.mjs` è passata.

## I numeri, blocco per blocco

Token e tempi sono quelli dei subagent (somma dei token; il tempo è quello dei subagent sul percorso critico, con quelli in
parallelo contati una volta). L'orologio del container non era affidabile.

| blocco | subagent | token | tempo | righe di codice | prove passate / fallite | giri |
|---|---|---|---|---|---|---|
| lettura (passo 2) | 3 (modello, banco, diagnosi del codice della seconda prova) | ~397k | ~4 min | — | — | 1 |
| 0 fondamenta | 1 | ~101k | ~1,5 min | `ora` 38; schemi 497; test 175 | 24/24 test | 1 |
| 1 slug, verifica, banco | 2 in parallelo | ~356k | ~14 min | `slug` 75, `verifica` 308, `esegui` 649, giudice 54, 13 prove JSON; test 649 | 60 + 17 test; B03 meccanico | 1 |
| 2 importazione | 8 (importa e contesto; revisione della tabella; riverifica delle citazioni; 2 Specchio; 3 giudici) | ~801k | ~14 min | `importa` 439, `contesto` 386; test 411 | conti, U alla lettera 32/32, divieti; D02 "oggi" 0/1 poi 1/1 | 2 |
| 3 cattura | 1 | ~102k | ~2 min | ricette 270, `simula-memo` 83; test 318 | 12/12 test, B18 (G1 e schema) | 1 |
| 4 primo ritratto | 8 (`applica`, ritratto, 3 + 3 giudici) | ~595k | ~9 min | `applica` 364; test 230 | R01a: deterministici sì; giudice 0/1 poi 1/1 | 2 (del giudice) |
| 5 smista e Specchio | 24 (2 di codice, 10 sessioni, 12 giudici) | ~1,88 M | ~27 min | `smista` 344, `lucchetto` 172, `contesto` +115; test ~430 | 10/10 elencate; 117/117 test | 1 |
| 6 meraviglia | 4 (Specchio, 3 giudici) | ~287k | ~3,5 min | 0 | R14 1/1 | 1 |
| **in tutto** | **51** | **~4,5 M** | **~75 min** | **~2.970 di script** (con `esegui`), ~2.200 di test, ~1.460 di schemi e prove | — | — |

Al confronto con la seconda prova (63 subagent, ~5,7 M token, ~1 h 50), questa ha fatto meno giri sulle porte: i prompt v3
reggono B01–B25 al primo colpo. Ha anche fatto meno lavoro di quanto chieda il piano in due punti: un subagent invece di 4–6
per la tabella, uno invece di 6 per le citazioni. Lo dico qui perché cambia il conto dei token.

## Il registro

Gravità: **alta** = mi ferma o mi fa costruire una cosa sbagliata; media; bassa. "Scelta" è ciò che ho fatto. "Correzione"
è la proposta, con il file da cambiare (i percorsi sono quelli di `progetto/pacchetto/`; la fonte sta in `progetto/v2/`).

### Le alte

| id | file e § | che cosa diverge | scelta | correzione (file) |
|---|---|---|---|---|
| P3-55 | `CLAUDE.md` (prompt v3 §1) regola 1 e ricetta "le mie frasi"; banco D02 Forma "seme" | Il `CLAUDE.md` dice "un corsivo è sempre una mia frase alla lettera, oppure il titolo di un'opera" e vuole il seme "a parte… (voce mista)". Il banco vuole la riga ✧ "con un tratto in corsivo alla lettera di s01, s03 o s04". Specchio ha scritto il seme in tondo, `esegui` l'ha bocciato, e la porta del blocco 2 è rimasta chiusa. | Nella ricetta: "con un passo del seme alla lettera **in corsivo** (l'unica eccezione alla regola 1)"; lo stesso in `progetto.md`. Al secondo giro passa. | prompt v3 §1 (ricetta "le mie frasi", regola 1) e `progetto.md` |
| P3-56 | `CLAUDE.md` regola 6 e ricetta "le mie frasi"; tabella delle lunghezze; banco D02 Forma "riportate" | "Con la nota" non dice "su ogni riga". Il banco lo vuole su ogni riga `riportata`. Con 7 riportate su 8 la nota ripetuta sfora le 150 parole della tabella, quindi Specchio l'ha messa una volta sola in testa, e la porta è rimasta chiusa. | Nella ricetta: "la nota ripetuta **su ogni** loro riga (questa ricetta ha il tetto delle 8 righe, non quello delle 150 parole)". Al secondo giro passa. Lo stesso problema c'è nel ritratto ("Entrambe trascritte…", P3-68). | prompt v3 §1 (regola 6, ricetta, tabella delle lunghezze), `progetto.md` |
| P3-69 | banco R14 "Giudice AI" domanda 2, ripresa dal piano (blocco 4) per R01a | «Il nesso regge senza la frase "◌ perché"?» si legge in due modi. I tre giudici, all'unanimità, hanno risposto "no": "senza quella riga il nesso non è scritto". Così R01a fallisce su una convergenza che le loro stesse risposte alla domanda dopo dicono "ancorata alle sue parole". La lettura sbagliata spinge a correggere il prompt del ritratto, che non c'entra. | Domanda riformulata in `R01a.json` e `R14.json`: «Le due frasi citate, accostate da sole e senza leggere la riga del perché (◌), lasciano già vedere il nesso? (Non si chiede se il nesso sia scritto…)». Ri-giudicata la stessa uscita: 3 su 3, 8/8. | banco R14 (Giudice, domanda 2) e piano blocco 4 (Collaudo) |
| P3-79 | banco R14 "Uscita attesa" contro D1/D2; `specchio.md` (capi del ponte); modello §7.5 | L'uscita attesa vuole come capo vecchio "un frammento suo del punto zero: una sua frase… oppure… U18–U20". D1 e D2 dicono solo "un frammento del punto zero", e il seme `s01` lo è. `specchio.md` elenca i capi vecchi senza il seme; il modello §7.5 non lo esclude. Specchio ha consegnato B01 ↔ `s01` ✧ (parola in comune: "nichilismo"); `esegui` e i tre giudici l'hanno promosso. La porta del blocco 6, che è una decisione sul prodotto, si è aperta su un ponte che forse non doveva valere. | R14 registrato come passato, alla lettera dei criteri, con questa voce. | Da decidere. O il banco R14 D1/D2 dice "un frammento `voce: sua` del punto zero (non il seme ✧)" e `specchio.md` con il modello §7.5 dicono "il seme non è un capo del ponte"; o il seme si ammette in tutti e tre. In più, `specchio.md`: il bilancio del giorno 3 guarda anche i vicini senza parole in comune (u19 c'era, D0 passa, ma nessuno l'ha usato). |

### Le medie

| id | file e § | che cosa | scelta | correzione (file) |
|---|---|---|---|---|
| P3-6 (= P3-24) | modello §2.2 e §17.4; piano blocco 0 | `schema/piano.json` è "in sintesi": mancano le chiavi di `alias`, `lapide`, `riserva`, `aggiorna-nodo`, `copre`/`aggancio`/`legami` della restituzione, `nato-da` di `crea-nodo`, `salvato`/`ci-sono` | `formato-piano.md` più il codice della seconda prova | modello §2.2: una tabella delle chiavi per operazione, o "`formato-piano.md` è la norma di `schema/piano.json`" |
| P3-9 | banco §5 "Gravità e porte"; piano blocco 5 | il banco dice "per la porta del blocco 5: B01, B02, B06, D02"; il piano ne elenca dieci. Per LEGGIMI il banco viene prima del piano | le dieci (il sovrainsieme) | banco §5: "le dieci del piano; B01, B02, B06, D02 per prime" |
| P3-14 (= P3-62) | piano blocco 4, Collaudo | "le domande di R01 che non dipendono da novembre" e "R14.1–R14.3" non sono individuate; mancano la soglia adattata e la data; "nessun ⚠ citato come certo" sta tra i deterministici ma non si meccanizza | R01 1, 2, 3, 5 più R14 1–3 più una D8 sul ⚠; soglia 7/8 con obbligatorie 1, 2, 5, 6, 7, 8; data 2026-11-03 09:07 | piano blocco 4 |
| P3-15 | prove JSON della seconda prova (non normative, "punto di partenza") | D02.json è scritto per il Progetto (richiede `forma: riportata`); le note di B12, B22 e B25 dicono "§ Conti e § Correzioni al blocco 7"; mancano B18, R01a e R14 | riscritte | LEGGIMI o piano, introduzione: un'avvertenza sulle prove superate |
| P3-18 | modello §2.2, r. 121–123 | "SHA-1 dei tre file in fila" e "lo stesso numero di `cat … \| git hash-object --stdin`" sono due numeri diversi, perché hash-object antepone l'intestazione `blob <len>\0` | la semantica di `git hash-object` | modello §2.2: "l'id blob git del concatenato" |
| P3-19 | piano blocco 5 (riga del lucchetto); modello §8.1 | il piano scrive `--aspetta MINUTI`, il modello vuole tutto in secondi; il modello passa id e gettone come argomenti a `rinnova`/`lascia`, il piano no; il formato di `.in-corso` non è detto | il modello (secondi, `--sessione --gettone`); `.in-corso` in YAML | piano blocco 5 |
| P3-20 | piano blocco 1, Collaudo | "chioran trova `cioran` con lo scheletro", ma con le vie del §3.6 la distanza è 1, quindi vince `levenshtein`, che è più forte | il test accetta `levenshtein`; lo scheletro si prova su "Kanth" → `kant` | piano blocco 1 |
| P3-21 | piano blocco 5 (`vicini`); modello §6.2 | il piano tace "non delicati" e "la sola via `nome` non conta"; il modello non dice rispetto a che cosa "più vecchi di 7 giorni", né se i "primi 3 giorni" sono di calendario; in `prepara` il frammento non ha ancora `parole` | rispetto al `registrato` di ID; giorni di calendario Europe/Rome; in `prepara`, le chiavi delle parole del testo | modello §6.2, piano blocco 5 |
| P3-28 (= P3-63) | modello §6.1 | mancano i formati di § Conti, dei "parlanti della settimana" e delle "Correzioni applicate", che B12, B22, B25 e B18 leggono alla porta | `- AAAA-MM · tema · ✦n`; settimana ISO; "applicata" = il valore è già nel nodo | modello §6.1: un esempio per sezione |
| P3-36 | modello §8.1 contro piano blocco 5, `CLAUDE.md` "Gli script", prompt v3 | il modello vuole che `rinnova` e `lascia` ricevano id e gettone; gli altri tre testi li chiamano senza argomenti | argomenti facoltativi, con ripiego su `.git/lucchetto` | modello §8.1: "o li rilegge da `.git/lucchetto`" |
| P3-37 | codice della seconda prova, `verifica.mjs` | marca i sintetici con `sintetico: true` nel frontmatter, contro il piano §4 (`banco/sintetici.txt`, nessun campo in più) | riscritto | LEGGIMI o piano, introduzione: avvertenza |
| P3-41 | piano blocco 1 (tabella di `slug`); modello §3.6 | `debole: true` per le ultime tre vie nel piano, per tutte tranne `esatta` nel modello (quindi anche `cognome`) | il modello | piano blocco 1 |
| P3-45 (= P3-52) | piano §1; modello §14 R7 | il §1 dice che "al checkpoint ci sono già tutte e nove" le correzioni e che si fanno sull'Atlante; al checkpoint `fonti/pensiero/marco-aurelio.md:29` e `fonti/sacro-e-mito/ermetismo.md:21` hanno ancora la "resa di Claude". Moricca arriva solo da `importa/correzioni-citazioni.json` (codice della seconda prova). Chi non riusa quel file importa la resa di Claude | `correzioni-citazioni.json` applicato | piano §1: "otto su nove sono nell'Atlante; Marco Aurelio e l'ermetismo no: li corregge `importa.mjs` da `importa/correzioni-citazioni.json`, che va tenuto"; modello §14 R7 di conseguenza |
| P3-48 | `tabella.json` della seconda prova ("da rivedere, non da rifare") | a u19 manca `nomina rust-cohle`, che il §14.1 (riga U19) e la preparazione di R14 vogliono; due citazioni senza esito hanno `link`, contro R12 | corretta (u19 e u20 → `rust-cohle`; `link` tolti) | `progetto/prova-a-freddo-2/codice/importa/tabella.json`, oppure una riga nel piano blocco 2 |
| P3-51 | piano blocco 2, r. 175–177 | le 17 citazioni sono elencate "per entità" con slug (`eraclito`, `nietzsche`, `kant`, `jung`…) che non sono nodi, e il collaudo vieta `nietzsche` ed `eraclito` | `~Nome` | piano blocco 2: "(`~Nome` dove l'entità non è un nodo)" |
| P3-66 | `prompt/ritratto.md`, variante giorno 1 | non dice se il ritratto ha `voci` numerate, come si compilano `copre` e `aggancio`, quale titolo e data-tetto, né il mese del commit `ritratto: AAAA-MM` | una voce (la convergenza); `copre` = i frammenti citati; "entro il 31 ottobre"; 2026-11 | `ritratto.md`, tre righe |
| P3-77 | modello §3.3 r. 233; `smista.md` r. 60; `formato-piano.md` r. 58 | `parole` "singolare… ('padre', non 'padri')" e nello stesso rigo l'esempio `[greci]`; il banco B02 vuole `greci`. Il prompt v3 §14 n. 1 la dice "risolta" | la sessione ha seguito l'esempio (B02 passa) | modello §3.3, `smista.md`, `formato-piano.md`: "i nomi di popolo restano come li scrivo", o il banco B02 accetta `greco` |

### Le basse

| id | file e § | che cosa | scelta | correzione (file) |
|---|---|---|---|---|
| P3-1 | LEGGIMI riga 11; piano, introduzione | rimandano ai resoconti delle prove precedenti come lettura del codice | non letti | togliere i link o dire "non serve leggerli" (LEGGIMI, piano) |
| P3-2 | piano, introduzione | link a `../v2/nome.md` | non seguito | togliere (piano) |
| P3-3 | LEGGIMI, "il codice della prova a freddo…" | parla della prima prova con lo SHA vecchio; è ambiguo con la seconda | — | LEGGIMI: "della prima prova" |
| P3-4 | prompt v3 §14 | rimanda a `../prova-a-freddo-2/correzioni-ai-prompt.diff` e `../v2/prova-a-freddo.md` | non seguiti | prompt v3 §14 |
| P3-5 | modello §2.2 | `aggiorna-nodo` è "solo consolida e migrazioni", ma non c'è un `ciclo` per le migrazioni | 4 cicli | modello §2.2 |
| P3-7 | codice della seconda prova | `piano.json` ammette `ciclo: lettera`; `frontmatter.json` non ha la regola if/then sulla lettura senza `fonte` | rifatti dal modello | — |
| P3-8 | modello §11 | il formato della storia delle migrazioni in `_schema.md` non è detto | "data, numero, che cosa cambia" | modello §11 |
| P3-10 | banco §5 Ordine; piano §4 | il banco prende da `main` `scripts/ schema/ prompt/ _schema.md CLAUDE.md`, il piano `… banco/ package*.json ambiente/` | l'unione | banco §5 e piano §4: l'unione |
| P3-11 | banco §5; piano §4 | `schema: 3` in testa agli esiti c'è nel banco, non nel piano | messo | piano §4 |
| P3-12 | banco B25; piano blocco 1 | il banco vuole `emil-cioran` "trovato per scheletro", ma il punto zero non ha Cioran | test con alias di fixture; B25 accetta "nuovo" | piano blocco 1 |
| P3-13 | piano blocchi 2 e 5 | manca l'ora di D02 (punto zero e "la sera" del 20/11) | 21:00 e 21:30 | piano |
| P3-16 | piano blocco 3 | B18 è ridotta a "un file"; la scheda del banco chiede smista e mappa (blocco 5), con data 2027 | al blocco 3 solo G1 e lo schema | piano blocco 3 |
| P3-17 | banco D02 | il 20/11 i criteri su muti e delicati sono vuoti | non applicabili | banco D02 |
| P3-22 | modello §6.2; piano | il pacchetto porta "§ Scarti" (sezione 9, blocco 7) | sezione 9 vuota al blocco 5 | piano blocco 5 |
| P3-23 | modello §7.2; piano | la copia WebP non è nel piano, che vieta altre dipendenze | `cwebp` se c'è | piano blocco 5 |
| P3-25 | modello §3.7 r. 698 | "nato-da è una voce r-…", ma lo schema vuole un idR senza `#` | senza `#n` | modello §3.7 |
| P3-26 | modello §14 R2 contro R8 | s03 "non fa nascere nodi", ma `tatuaggi` ha `nato-da: [s03]` | R8 come eccezione | modello §14 R2 |
| P3-27 | modello §6.1 Nodi | non c'è la colonna ✧ | aggiunta | modello §6.1 |
| P3-29 | modello §6.1 `recenti.md` | non dice se le eredita contano tra le "ultime 10 restituzioni" | escluse | modello §6.1 |
| P3-30 | modello §3.7 r. 697 | "versione 1 solo da smista", ma `ciclo: specchio` sigilla la chat | specchio vale come smista | modello §3.7 |
| P3-31 | piano §2, convenzioni | il formato di `ATLANTE_ORA` c'è solo al §4 | ISO con fuso | piano §2 |
| P3-32 | piano blocco 0 | "i tre esempi YAML" sono sei | tutti | piano blocco 0 |
| P3-33 | modello §14.1 | fonti con il trattino lungo, contro il pattern dello schema | normalizzate | modello §14.1 |
| P3-34 | piano blocco 2 | `citazioni.json` con `prova`, `originale` (nomi del v2) | riferimento e corpo | piano blocco 2 |
| P3-35 | piano, introduzione | "108 verdi, 9 falliscono nella copia": misurato 106/108, poi 107/108 | — | piano |
| P3-38 | piano, introduzione | non elenca che cosa manca al codice della seconda prova (`vicini`, `--sigilla`, oEmbed nel pacchetto, `## Seme ✧`, attesa dei 90 s per ogni ciclo, `--aspetta` in minuti) | trovato confrontando | piano, introduzione: un elenco breve |
| P3-39 | modello §2.3; `CLAUDE.md` | `smista.mjs vicini` manca dal §2.3; `--solo ID` manca dal `CLAUDE.md` | — | modello §2.3 |
| P3-40 | banco B25 | un nodo `emil-cioran` senza alias `cioran` non dà candidati per "chioran" | "nuovo con alias" | banco B25 |
| P3-42 | piano §4; banco §5 | il formato di `banco/sintetici.txt` non è detto | un id per riga | piano §4 |
| P3-43 | modello §3.7 contro piano blocco 1 | link a registri di ID esterni: rifiutati sempre (modello) o solo da smista (piano) | il piano | modello §3.7 |
| P3-44 | piano U7; telefono | il fire manda l'id; telefono parla di "percorso" | l'id | telefono |
| P3-46 | modello §14 R7 | non dice dove vanno `intermedia` e `prova` di una citazione accolta in una voce eredita | riferimento e corpo | modello §14 R7 |
| P3-47 | citazioni.json | sei ritocchi minori (peterson, eraclito, zapffe, iside, divina-commedia, ermetismo) | non applicati | `progetto/prova-a-freddo-2/codice/importa/citazioni.json` |
| P3-49 | modello §14.1 riga U5 | manca la copia `concetti/guida-e-condottiero.md:14` | — | modello §14.1 |
| P3-50 | modello §14.1 | gli alias "Rust" e "napoleone" non hanno una frase sua | tenuti | modello §14.1 |
| P3-53 | tabella della seconda prova | a u22 manca una riga di fonte, quindi il collaudo fallisce al primo giro; u18, u21, s04 citano solo il primo file | corretta | tabella |
| P3-54 | modello §14 R1 / §2.2 | `letto-da` = "il modello che sta girando" scrive un nome di modello nei dati | nella copia consegnata, valore neutro | modello §2.2 |
| P3-57 | `specchio.md` passo 2 | al giorno 0 senza memo, "Nessun ponte oggi." va detto? | una volta sì, una volta no | `specchio.md` |
| P3-58 | modello §6.2 / §14.1 | u22, u23, u28: `vissuto` senza "≤" e `registrato` di un giorno dopo; `parole.md` e frontmatter dicono date diverse | il frontmatter | modello §14.1 |
| P3-59 | `specchio.md`, `smista.md` | `git pull` senza remoto (rami del banco) | saltato | — |
| P3-60 | modello §6.2 | le chiavi di `ingresso/.pacchetti/ID.json` non sono fissate | `link: [{url, titolo?, autore?}]` | modello §6.2 |
| P3-61 | banco D02 | la riga di un gesto altrui o di un muto non ha corsivo | esclusa dal controllo | banco D02 |
| P3-64 | banco | per D e R senza frammento manca la "base" del confronto | campo `base` | banco §5 |
| P3-65 | `ritratto.md` giorno 1 | "contesto.mjs scrive solo recenti e Stato, Nodi, Alias", ma scrive anche `parole.md` | usato | `ritratto.md` |
| P3-67 | `ritratto.md` | senza § Immagini e § Seme già usato, le convergenze già fatte si cercano a mano | a mano | — (blocco 10) |
| P3-68 | `ritratto.md`; `CLAUDE.md` regola 6 | la nota "trascritta" data una volta per coppia | — | come P3-56 |
| P3-70 | `smista.md` passo 2; `CLAUDE.md` | "separa i memo del Progetto" (dal blocco 8) | restano con un avviso | `smista.md` |
| P3-71 | modello §6.2, §8.2 | il pacchetto non porta gli altri memo della raffica | nessun campo | modello §6.2 |
| P3-72 | modello §7.2 | l'"autore dalla pagina" su YouTube dà 429 | `author_name` dell'oEmbed | — |
| P3-73 | modello §8.1 passo 6 | il fencing del push finale non può farlo `lascia` | in `rinnova` | modello §8.1 |
| P3-74 | modello §6.1 n. 9 | `portata` non è un campo | calcolata | — |
| P3-75 | `smista.md` | punti non detti emersi in B01 (`fruizione`, `parla-di` verso un tema esistente…) | — | — |
| P3-76 | piano §4 | un clone del banco con `origin` spinge `banco/zero` | — | — |
| P3-78 | `smista.md` "X: frase" | non dice se X nasce come persona o resta `~Nome` | persona `mondo` | `smista.md` |
| P3-80 | `specchio.md` | lucchetto con `ingresso/` vuoto; congedo senza saluti; N in "specchio: N memo"; voci di un ponte | — | `specchio.md` |
| P3-81 | `specchio.md` | il seme fuori dalla ricetta: corsivo o «»? | «» | `specchio.md` |
| P3-82 | `smista.md` | una passata con un memo fresco in `ingresso/`: tre sessioni su quattro chiedono se cedere | no (codice 4 solo con `--fire`) | `smista.md`: una riga |
| P3-83 | `smista.md` | "marco" senza nodo: crearlo `vita` o `~Marco`? | creato | `smista.md` |
| P3-84 | `smista.md` | una smentita con fonte secondaria vale come ○? | sì, con ⚠ | `smista.md` |
| P3-85 | `CLAUDE.md` r. 60 | `estratto?` tra le voci: un piano non lo accetta (solo eredita) | rifiuto di `applica` | `CLAUDE.md` |
| P3-86 | `specchio.md` | intento di una chat che chiede; il seme è una voce numerata? | `[chiedi]`; numerata | `specchio.md` |
| P3-87 | `smista.md` | il silenzio si legge da `mappa.md` vecchia | a mano | `smista.md`: `contesto.mjs` dopo `prepara` |
| P3-88 | `CLAUDE.md`, tabella delle lunghezze | una risposta a un `chiedi`: 40 o 150 parole nel file? | 40 | `CLAUDE.md` |
| P3-89 | `smista.md` | per avere lo slug giusto si sceglie il `nome`; `.pacchetti/` non si pulisce | — | `smista.md` |
| P3-90 | `formato-piano.md` | non dice che `link` non va nel piano | un rifiuto | `formato-piano.md` |
| P3-91 | `smista.md` B14 | "Salvato." con il momento "se serve"; un `~Nome` per un video senza nome | solo `salvato` | `smista.md` |
| P3-92 | `smista.md`, `formato-piano.md` | `risposta` della lettura data dallo script; voce di una domanda dell'ingresso | — | `formato-piano.md` |

Le correzioni al **codice** fatte da me durante la prova non sono voci del pacchetto: l'avviso di `applica.mjs` ereditato
dalla seconda prova diceva "se lo sai, in nota con ⚠", contro `smista.md`. Ora segue `smista.md`.

## Le correzioni proposte, per file

**`03-prompt-v3.md` §1 (`radice/claude-radice.md`) e `radice/prompt/progetto.md`** (le due alte del blocco 2: righe già
provate in `progetto/prova-a-freddo-3/codice/radice/`)
- Ricetta "le mie frasi": la nota "trascritta da Claude…" ripetuta su ogni riga riportata, con il tetto delle 8 righe al
  posto delle 150 parole (P3-56); la riga ✧ dopo le mie, con il passo del seme alla lettera in corsivo, come unica eccezione
  alla regola 1 (P3-55). Lo stesso in `progetto.md`.
- Riga 60: `estratto` solo per eredita (P3-85). Tabella delle lunghezze: risposta a un `chiedi` (P3-88).

**`04-banco-di-prova.md`**
- R14, Giudice, domanda 2: la formula univoca (P3-69, alta).
- R14, Uscita attesa contro D1/D2: decidere se il seme ✧ è un capo del ponte (P3-79, alta).
- §5 "Gravità e porte": le dieci prove della porta del blocco 5 (P3-9); §5 Ordine: i percorsi del codice (P3-10).
- B25 (P3-40); D02 (P3-61, P3-17); B02 `greci` (P3-77); la "base" delle D e delle R (P3-64).

**`01-piano.md`**
- Introduzione: un'avvertenza su che cosa è superato nel codice della seconda prova (D02.json, le note di B12/B22/B25,
  `sintetico: true`, l'attesa dei 90 s, `--aspetta` in minuti, le mancanze di smista e contesto) (P3-15, P3-37, P3-38); i
  numeri dei test (P3-35); i link a resoconti e `nome.md` (P3-1, P3-2).
- §1: Marco Aurelio ed ermetismo non sono corretti nell'Atlante; `importa/correzioni-citazioni.json` va tenuto (P3-45).
- Blocco 1: "chioran" via `levenshtein` (P3-20); `debole` come nel modello (P3-41); Cioran (P3-12).
- Blocco 2: `~Nome` per le citazioni senza nodo (P3-51); controllare u19 → `rust-cohle` e R12 (P3-48); ora di D02 (P3-13).
- Blocco 3: B18 ridotta (P3-16). Blocco 4: le domande, la soglia, i 18 righi (P3-14, P3-69).
- Blocco 5: il lucchetto in secondi con `--sessione --gettone` (P3-19); `vicini` non delicati e senza la via `nome`
  (P3-21); § Scarti (P3-22); WebP (P3-23).
- §4: `schema: 3` negli esiti (P3-11); formato di `sintetici.txt` (P3-42).

**`02-modello-v3.md`**
- §2.2: l'hash del prompt (P3-18); le chiavi per operazione del piano (P3-6); `ciclo` per le migrazioni (P3-5); `letto-da`
  (P3-54).
- §3.3: `parole` e `greci` (P3-77). §3.7: `nato-da` delle voci (P3-25), versione 1 e specchio (P3-30), ID esterni (P3-43).
- §6.1: i formati di Conti, settimana, Correzioni (P3-28); la colonna ✧ (P3-27); eredita in `recenti.md` (P3-29). §6.2: i
  vicini (P3-21), le chiavi del pacchetto (P3-60), la raffica (P3-71).
- §7.5: il seme come capo del ponte (P3-79). §8.1: argomenti di `rinnova`/`lascia` (P3-36), fencing finale (P3-73).
- §14: R2 contro R8 (P3-26), R7 e le correzioni (P3-45, P3-46); §14.1: U5, U22/U23/U28, i trattini, gli alias (P3-49,
  P3-58, P3-33, P3-50).

**`radice/prompt/`**
- `specchio.md`: i capi del ponte (P3-79); il bilancio guarda anche i vicini senza parole in comune (P3-79); giorno 0 senza
  memo (P3-57); lucchetto, congedo, N, voci (P3-80, P3-81, P3-86).
- `smista.md`: `contesto.mjs` dopo `prepara` (P3-87); "X: frase" (P3-78); nome nudo (P3-83); passata e memo fresco (P3-82);
  B14 (P3-91); Progetto dal blocco 8 (P3-70).
- `ritratto.md`, variante giorno 1: voci, `copre`, `aggancio`, titolo, mese del commit, `parole.md` (P3-66, P3-65).
- `formato-piano.md`: niente `link` nel piano; `risposta` della lettura data dallo script (P3-90, P3-92).

**`progetto/prova-a-freddo-2/codice/importa/`**: `tabella.json` (u19/u20 → `rust-cohle`, R12, fonti di u18/u21/u22/s04:
P3-48, P3-53), `citazioni.json` (P3-47).

**LEGGIMI**: P3-1, P3-3 e un rimando all'avvertenza del piano sul codice superato.

## Il codice

In `progetto/prova-a-freddo-3/codice/`, senza `node_modules`, senza i dati personali e senza gli esiti:
- non ci sono le cartelle dei dati del punto zero, `importa/tabella.json`, `importa/citazioni.json` (che contengono le frasi
  importate) né `banco/esiti/` (che riporta le risposte di Specchio con le sue frasi);
- `tabella.json` è quella della seconda prova con le correzioni di P3-48 e P3-53;
- `radice/` contiene `CLAUDE.md` e `prompt/` come li ho lasciati, cioè il pacchetto più le due righe di P3-55 e P3-56.

I test sono 117, tutti verdi: alcuni leggono `progetto/pacchetto/02-modello-v3.md` e `/tmp/atlante`, quindi vanno lanciati
dalla radice di un repo che li ha. Il valore di `letto-da` dell'importazione è neutro (`LETTORE`, variabile d'ambiente).
