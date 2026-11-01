# Prova a freddo del pacchetto

> 2026-10-31. Proposta di Claude, da validare. Una sessione Claude Code ha fatto finta di essere la prima chat sull'account
> nuovo, in un repo privato appena creato (`/tmp/memo`), **senza contesto**: ha letto solo il
> [pacchetto](/_progetto/pacchetto/LEGGIMI.md) e le note dell'Atlante che il pacchetto fa importare. Ha eseguito il
> [prompt di avvio](/_progetto/pacchetto/prompt-avvio.md) alla lettera, da coordinatore con subagent dal compito piccolo,
> fino alla porta del blocco 6 esclusa. Il codice scritto è in `_progetto/prova-a-freddo/codice/` (39 file: script,
> schemi, test, tabella d'importazione in JSON; senza le note markdown dei dati né le fixture `.md`).

## In breve

- **Fin dove:** blocchi 0, 1, 2, 3 e 4 fatti e collaudati; blocco 5 fatto, collaudato in due giri, **porta chiusa**:
  B01, B02 e B11 falliscono ancora dopo una correzione del prompt. Il blocco 6 non si apre.
- **Codice:** ~1.390 righe di script, ~920 di test, 474 di schemi; 67 test su 68 verdi (1 todo, "Chiedi").
- **Il punto zero c'è ed è giusto:** 35 frammenti, 52 nodi, 60 restituzioni `eredita`, esattamente i conti del modello;
  43 controlli su 43; le 17 citazioni vive verificate sul web (17 su 17, due con una traduzione pubblicata nuova).
- **Il primo ritratto passa:** convergenza nuova (Rilke) ancorata a una frase sua, 3 giudici su 3 su R01 e R14.
- **Il registro:** 69 voci in cui la sessione si è bloccata o ha dovuto indovinare; **18 gravi**.
- **Verdetto:** il pacchetto **va corretto in questi punti** (§ Verdetto). Regge come progetto e come ordine dei lavori;
  non regge ancora come istruzione eseguibile a freddo, soprattutto per tre cose: il banco parla ancora il v2, lo schema
  del modello ha un difetto e un buco, e i blocchi 4–5 dipendono da `contesto.mjs` e da `setup.sh`, che il piano mette al
  blocco 7.

## Che cosa ha fatto la sessione

| blocco | che cosa | subagent | token (subagent) | tempo reale | righe di codice | prove del banco |
|---|---|---|---|---|---|---|
| passo 1–2 | clone (opzione A), pacchetto in `progetto/`, `CLAUDE.md`, `prompt/`; lettura | — | coordinatore | 2 min | — | — |
| 0 fondamenta | `package.json`, cartelle, `ora.mjs`, `schema/frontmatter.json`, `schema/piano.json` | 1 | 109k | 4 min | 84 + schemi 474 + test 157 | 32/32 test; i tre esempi §3.3–§3.5 validano (uno solo dopo un ritocco, R12) |
| 1 slug, verifica, banco | `slug.mjs`, `verifica.mjs`, `banco/esegui.mjs`, 3 prove JSON, `giudice.md` | 3 | 248k | 4 min (in parallelo) | 387 + test 227 | test di slug 7/7 (con una regola in più, R10); B03/B20 meccanico e restituzione ritoccata: rifiutati come devono |
| 2 importazione | tabella in 5 parti + riconciliazione, 17 citazioni, `importa.mjs`, `punto-zero.mjs`, import con data 2026-10-07, tag `punto-zero` | 9 | ~1.100k | 22 min (parti in parallelo) | 393 + test 113 + tabella JSON | conti 3/3, divieti 3/3, raccolta, 8 domande, 32 U verbatim: 43/43; **D02 "oggi"** passa (6/6 frasi alla lettera) |
| 3 cattura | `telefono/memo-ios.md`, `http-shortcuts.json`, `chiedi-ios.md`, test | 1 | 98k | 4 min | ricette 235 + test 153 | B18 (vuoto) passa nel test; **P3 e U4 non eseguibili** (telefono vero) |
| 4 primo ritratto | `applica.mjs` (condiviso col 5), la Routine "ritratto" variante giorno 1, 3 giudici | 4 | 245k | 3 min | (in 5) | deterministici 5/5; R01.1-2-3-5 e R14.1-3: 3 giudici su 3; **pancia: non simulabile** |
| 5 smista | `applica`, `lucchetto`, `smista prepara`, `contesto` provvisorio, `archivio`; 9 messaggi del banco su copie del punto zero; correzione del prompt; secondo giro su 5 | 12 | ~1.170k | 14 min | 525 + test 255 | giro 1: 4/9; giro 2: 2/5 in più. Passano B03, B06, B12, B14, B22, B25; falliscono B01, B02, B11. D02 sulle frasi nuove e P6 non eseguite |
| totale | | 30 | **~2,9 M** | **~40 min** | **~1.390 + test 924 + schemi 474** | |

Il tempo è di orologio, con i subagent in parallelo; i token sono quelli dei subagent (il coordinatore ne ha usati
~150k in più). Le stime del piano erano 12–17 ore per i blocchi 0–5: la sessione ci ha messo 40 minuti, ma con un
collaudo più leggero (un solo giudice per le B, tre per il ritratto) e senza i passi a mano dell'utente.

**Passi a mano simulati.** U1 (repo privato) e U2 (App, ambiente *Trusted*) sostituiti da `git init` in `/tmp/memo`
con la rete del container; il clone di tattoo-shit è passato. U3 (PAT) e U4 (Comando rapido) servono per P3: un iPhone
e un Android, il PAT a grana fine solo *Contents*, tre memo (testo, link, foto da 3 MB) e un vocale da 1 minuto, poi il
controllo di `ingresso/`. U5–U9 appartengono ai blocchi 7–8, oltre la porta.

## Il primo ritratto prodotto

`restituzioni/2026/11/r-20261103-0830-ritratto.md`, 235 parole, prodotto dalla Routine "ritratto" nella variante del
giorno 1 senza vedere il banco.

> **Ritratto, giorno 1.** Il nucleo e 35 frammenti importati. Memo tuoi dal telefono: ancora nessuno.
>
> ✦ tue · ✧ seme · ◌ mia · ○ mondo
>
> **Che cosa torna.** Entro il 4 ottobre, nell'archivio d'origine: 1. *la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? Amore e verità.* ✦ Il nucleo ✧, entro il 5 ottobre, la riprende quasi intera e la mette in cammino: il peso, lo sguardo, l'oltre. Il dolore sta in tutte e due. L'oltre resta una domanda.
>
> **Che cosa è nuovo.** Niente ancora. Il conto parte oggi.
>
> **Che cosa è sparito.** Troppo presto per dirlo.
>
> **Che cosa manca.** 2. *Radiohead, Deftones, quella wave rock eterea e malinconica.* ✦ (trascritta da Claude) Nell'archivio, però, nessuna canzone tua. La serie è vuota.
>
> **Una tensione.** Entro il 4 ottobre, due tue frasi ✦, trascritte da Claude:
> 3. *sacrificarsi per altri o per un bene superiore*
> 4. *non esiste un bene assoluto, ma solo relativo al negativo esplorato*
> Un bene superiore, senza un bene assoluto.
>
> **Una convergenza.** 5. Rilke, Decima elegia di Duino (1923): «Wir, Vergeuder der Schmerzen» ○, noi che sprechiamo i dolori (resa mia). Li guardiamo oltre, nella speranza che finiscano; e invece sono «Siedelung, Lager, Boden, Wohnort» ○: insediamento, giaciglio, suolo, dimora (resa mia).
> Partite dallo stesso punto: il dolore come terreno, non come incidente. Poi andate in direzioni opposte ◌. Tu chiedi che cosa c'è oltre. Per lui guardare oltre è lo spreco.
>
> Il dolore, per te, è una strada o una casa?

Collaudo: le quattro frasi ✦ si trovano alla lettera nei frammenti; date come tetto; Rilke non è tra le 60 convergenze
importate; una domanda sola; nessun ⚠ dato per certo (Rilke letto su de.wikisource, vv. 10–15). I tre giudici a contesto
vuoto: R01.1 sì, R01.2 no, R01.3 sì, R01.5 sì, R14.1 sì, R14.2 sì, R14.3 no, all'unanimità. Resta da fare la domanda a
pancia all'utente vero: "ti ha detto qualcosa che non sapevi?". Due cose da guardare: la sezione "nuovo" e "sparito" al
giorno 1 è vuota per forza (R59), e "Il nucleo… la riprende quasi intera" è un'affermazione del sistema non marcata ◌.

## Il collaudo del blocco 5

Ogni messaggio è passato per la Routine "smista" vera (prompt v3 alla lettera) su una copia del punto zero, con
`ATLANTE_ORA` uguale alla data del banco; un collaudatore separato ha confrontato i file con la scheda, traducendo i nomi
del v2 con il dizionario del modello §16.

| prova | giro 1 | giro 2 (prompt corretto) | che cosa |
|---|---|---|---|
| B01 Galimberti | fallisce (alta) | fallisce, lieve | giro 1: lo spettacolo detto con "credo" non nasce. Giro 2 nasce, ma manca la riga "forse è *Il mondo delle emozioni* ⚠". Nessun titolo dato per certo, nessun nodo vietato |
| B02 il seguito | fallisce (media) | fallisce (media) | giro 1: manca `parole: [greci]`. Giro 2: c'è, ma ora scrive un file di risposta che il v3 §13.4 non vuole (regressione della correzione) |
| B03 Jung parafrasato | passa | — | |
| B06 Marco non è Marco Aurelio | fallisce (alta) | **passa** | giro 1: `verso: ±` per "da bacio perugina" |
| B11 la domanda nel memo | fallisce (alta) | fallisce | giro 2: intento e `converge-con` giusti; ma nascono Hemingway e *Addio alle armi* dalla verifica (§3.4 lo vieta) e il kintsugi resta `~Kintsugi` invece di tema (A9) |
| B12 il lutto | passa | — | "Ci sono.", `delicato` |
| B14 link con il momento | fallisce (alta) | **passa** | giro 1: domanda vietata, momento perso |
| B22 "quella di ieri" | passa | — | "Me la riscrivi?" (senza preparazione: vedi R54) |
| B25 Cioran, delicato | passa al limite | — | v3 "Ci sono." contro il banco "Cioran, sì… Tutto bene?" (R64) |

La correzione del prompt (12 righe in `prompt/smista.md`, ognuna ricavata dal modello e non dal banco: nome incerto,
`parole` in ogni frammento, verso della reazione, `[salva, chiedi]`, nessi suoi come `converge-con`, link con un momento)
ha chiuso B06 e B14 e ne ha aperto uno nuovo (B02). Il piano chiede che B01, B02, B06 e D02 passino tutti prima del
blocco 6: **la porta resta chiusa**. Nella sessione vera si farebbe un terzo giro; qui ci si ferma, perché il compito
era misurare il pacchetto, non finire il prodotto.

## Registro: dove la sessione si è bloccata o ha indovinato

Gravità: **alta** = blocca un collaudo o cambia un dato per sempre; media = una scelta che un'altra sessione farebbe
diversa; bassa = attrito. "Come scriverlo" è la correzione proposta al pacchetto.

### Gravi (18)

| n. | dove | che cosa | scelta fatta | come scriverlo |
|---|---|---|---|---|
| R7 | 05-regole tutto; modello §14 | 05 è "normativo per il blocco 2" ma usa nomi superati: `r-…-ritratto-cNN`, `per`, `importata`, intento `correggi`/`accogli`, R13 senza temi. La sua coda "Che cosa cambia" lo smentisce | modello §14 | togliere 05 dal pacchetto o riscriverlo con i nomi del §14; nel LEGGIMI, §14 è la sola norma del blocco 2 |
| R10 | modello §3.6; piano blocco 1, collaudo | con le regole del §3.6 "galimberti" non trova `umberto-galimberti` e "De André" non trova `fabrizio-de-andre`: il collaudo del piano non si può passare | aggiunta la regola "cognome" (ultime parole intere = candidato debole) e "nome" (prime parole = debole, per B06) | aggiungerle al §3.6 |
| R12 | modello §3.5; piano blocco 0, collaudo | §3.5 non ha esempio YAML; quello del §13.2 non ha `registrato`, obbligatorio | §13.2 con `registrato` aggiunto | un esempio completo di restituzione in §3.5 |
| R13 | formato-piano, tabella; prompt/specchio.md | `lettura` e `crea-nodo` "smista, consolida", ma Specchio scrive letture | Specchio ammesso | aggiungere "specchio" nella colonna "chi" |
| R23 | modello §3.7 (riga ~557) | `if: cerchia const vita` senza `required: [cerchia]`: è vero anche senza `cerchia`, e ogni opera, tema o citazione con `link` viene rifiutata | aggiunto `required` | correggere lo schema nel modello |
| R24 / R62 | piano blocco 1 e banco ("nessun esito all'ingresso salvo apocrifi") contro modello §3.4, §7.2 passo 5 e prompt/smista.md ("qualunque sia l'esito") | contraddizione vista sul campo due volte (B11): la Routine scrive l'esito, `verifica.mjs` lo rifiuta, la sessione cancella i file a mano | seguito il piano (contro la precedenza dichiarata) | decidere una regola sola e scriverla uguale in modello, prompt e piano |
| R27 | piano blocco 2, "la prepara una sessione con 4–6 subagent" | le parti scritte da subagent diversi divergono negli slug (7 casi); serve un passo di riconciliazione che il piano non ha | aggiunto un subagent di riconciliazione | fissare prima l'elenco dei nodi (slug e nome), poi le parti; o un passo "unisci e controlla" esplicito |
| R30 | banco §1, tutte le schede B e D | "Indice", "vitalità", "il legame pesa", `tramite`, `esito: apocrifa`, `prova`, id senza suffisso: nomi del v2. Il dizionario §16.1 non basta; nessuna scheda si trascrive in criteri meccanici senza riscriverla | tradotte a giudizio dal collaudatore, criteri senza equivalente "non applicabili" | riscrivere File/Indice/Non deve delle 25 B nel v3, o dare `banco/prove/*.json` già pronti |
| R33 | piano blocco 3, "Chiedi" con `intento: chiedi` | il frammento non ha `intento` (sta nella lettura): il file che scrive "Chiedi" non passa lo schema | test lasciato in sospeso | dire dove va l'intento del Comando "Chiedi" (frontmatter del frammento nello schema, o messaggio di commit) |
| R36 | eredità §2 contro modello §14 R4 (A23) | eredità dà C5, C8, C10, C16 come ✧ seme, ma contengono idee del seme non validate | ◌ | segnare nella tabella §14 quali C sono ✧ |
| R41 | modello §3.3/§3.7 contro §14.1 | `nota` della lettura ≤ 200 caratteri, ma §14.1 ci mette cornici e descrizioni lunghe (7 casi): la scrittura si blocca | nota corta + corpo della lettura | ammettere un corpo nella lettura importata, o dire "le cornici lunghe vanno nel corpo" |
| R44 | prompt/ritratto.md passi 1, 4, 5, 8; smista.md; specchio.md | chiamano `contesto.mjs` e leggono `mappa.md`, `parole.md`, `recenti.md`, ma il piano scrive `contesto.mjs` al blocco 7: i blocchi 4 e 5 non sono eseguibili come scritti | scritto un `contesto.mjs` provvisorio (recenti, alias, stato) | spostare le sezioni 1–3 di `contesto.mjs` al blocco 1 o 2 |
| R55 | piano blocco 7, `ambiente/setup.sh` | ogni sessione su un clone pulito (Routine, Specchio, banco) non ha `ajv` e `yaml`: `applica` e `verifica` non partono. Tutti i runner hanno dovuto fare `npm ci` da sé | `npm ci` a mano | `setup.sh` al blocco 0 e U2 lo indica subito |
| R64 | banco B14, B25 contro modello §3.4, §7.2.1 | la risposta attesa dal banco e quella del v3 divergono (link con momento senza nodo; delicato "Ci sono." contro "Cioran, sì… Tutto bene?"); il banco è "normativo per il collaudo" ma il modello "vince su tutto" | il v3 | allineare le "Risposta" del banco al §7.2.1 |
| R65 | prompt/smista.md | le regole fini che il banco controlla (verso − per l'ironia, `[salva, chiedi]`, nessi suoi come `converge-con`, nome incerto, momento dei link) stanno nel modello ma non nel prompt: causa dei fallimenti del giro 1, non il codice | 12 righe aggiunte, dal modello | portarle nel prompt v3 (diff in fondo) |
| R66 | smista.md passo 3; banco B01 | un'entità detta con "credo" non nasce per il prompt, nasce per il banco | nasce (giro 2) | regola esplicita nel prompt |
| R70 | piano §4 e blocco 5 contro banco §5 "Gravità" | la gravità del banco è del caso (scatta solo se avviene il fatto grave), il piano ferma su "un fallimento di gravità alta" e vuole "B01, B02, B06, D02 tutti" | lettura stretta: porta chiusa | una frase: "blocca un fallimento in cui scatta il caso grave" oppure "blocca ogni fallimento delle B elencate" |
| R44b | piano blocco 4 contro prompt/ritratto.md | il piano dice che il ritratto si può fare "anche prima del blocco 3", ma il prompt usa il lucchetto (blocco 5) e `contesto.mjs` (blocco 7) | lucchetto scritto prima | allineare (va con R44) |

### Medie (36)

| n. | dove | che cosa · scelta |
|---|---|---|
| R5 | piano blocchi 4–5 contro modello §2.3 e formato-piano | `smista.mjs applica` contro `scripts/applica.mjs`; piano piatto §2.2 contro involucro `{ciclo, letto-da, operazioni}` · modello |
| R6 | piano blocco 2, modello §14, 05 | rimandano agli attriti A1–A31 e a `importazione.md`, fuori dal pacchetto · bastano i riassunti di §14 |
| R11 | §3.6 contro piano | `chiave` senza articoli o no; `candidati(nome, alias)` senza `cerchia` · articoli in testa tolti, indice con `cerchia` |
| R14 | §3.7 | come si riconosce il tipo di un frontmatter · dalla cartella e dalle chiavi |
| R16 | §14 R7 contro §15 | `detta-da` tolto nel v3 · `attribuita-a` |
| R17 | §14.1 contro eredità §3.2 | s04 nomina Machiavelli, lamed-vav, tre metamorfosi; nasce solo `divina-commedia` · modello |
| R18 | §14.1 U31 | U31 nomina Galimberti, ma B01 vuole che al punto zero non esista · nessun nodo; va scritto nella tabella |
| R20 | 08-citazioni §3 | cinque esiti contro tre (CLAUDE.md) e quattro (schema §3.7, R63) · i tre del CLAUDE.md |
| R21 | 08-citazioni | una scheda secondaria specializzata basta per "verificata"? · sì, con la traccia |
| R25 | piano §4 | `sintetico: true` non è nello schema |
| R26 | §3.1 | che cosa è un "riferimento" e un "ID esterno scritto da smista" · elenco scelto |
| R28 | §14 R1 | si tolgono le etichette di Claude dentro il seme e i numeri d'elenco? U20 ha in §14.1 un punto finale che la fonte non ha · tolti |
| R31 | B01 contro §3.4 | `autore` in chiaro all'ingresso o solo `attribuita-a` · `attribuita-a` |
| R34 | blocco 3 | foto iOS non in WebP, lo schema vuole webp; formato d'import di HTTP Shortcuts ricostruito a mano |
| R37 | §3.1 | id delle restituzioni `eredita` in collisione (5 casi) · suffisso `-2` |
| R38 | §3.5, §5 | l'enum di `cosa` non ha mito, tradizione, luogo; numerazione delle voci dentro la prosa · `opera`/`persona`, `[n]` |
| R40 | §14, §14.1 | piste e percorsi nominati nel nucleo diventano nodi? slug di una citazione-monologo contro l'idea omonima |
| R42 | §3.7 `fonte` | un file solo, §14.1 ne dà più d'uno |
| R43 | R7 | chi vince tra l'esito di eredità §3.3 e il protocollo · il protocollo |
| R46 | banco | rimandi interni stantii (modello "§4.3", "R2 dove intende R19", `.indice/` in X5, percorso delle restituzioni) |
| R47 | piano blocco 2 | "ricerca esatta di tutte le U": 7 U sono mosaici di righe · riga per riga |
| R48 | §14.1 U20 | "I don't sleep, I just dream." senza `altrui`: D02 la tratterebbe come sua |
| R50 | §8.1 | codice d'uscita di `--fire` con un memo più recente; `lascia` senza commit |
| R51 | smista.md Limiti contro §3.4 | smista crea temi o no · no |
| R52 | §6.2 | i vicini non si calcolano bene senza `contesto.mjs` |
| R53 | piano §4 | "banco/zero dal tag punto-zero" non ha il codice scritto dopo il tag · ramo con dati del punto zero e codice di main |
| R54 | banco B22 | "quella di ieri" senza preparazione |
| R56 | smista.md passo 3 | `parole` singolare contro l'esempio "ragazzi"; "gruppi = persone" ("i greci"); l'esempio del prompt è quasi B01 |
| R57 | piano §4 | i commit degli script (lucchetto) non sanno di `ATLANTE_ORA` |
| R58 | smista.md messaggio finale | se il messaggio è "1 memo, 1 risposta", dove legge l'utente la risposta? il banco non lo dice |
| R60 | applica + shell | un piano scritto con heredoc ha perso gli apostrofi; la sessione ha riscritto una restituzione |
| R62 | B11, B12 | autore non nominato (Hemingway), "mia cugina", alias col possessivo: nessuna regola; un'opera con `in: ~Album` rifiutata |
| R63 | schema §3.7 | `esito` a quattro valori contro tre e cinque |
| R67 | modello | non decide se la risposta riprende la reazione, né il nodo di un link senza nome |
| R68 | formato-piano | i tipi dei campi per genere (`autore`, `in`: stringa o elenco) |
| R69 | applica | dopo un rifiuto di `verifica` i file restano scritti: il prompt non dice come annullare |

### Basse (15)

R1 il loop del prompt di avvio clona la punta del branch e non fa il checkout dello SHA di ORIGINE (fatto a mano) ·
R2 `main` di tattoo-shit non ha il pacchetto: preso al secondo tentativo · R3 dopo la copia resta `progetto/radice/`
doppione · R4 il LEGGIMI rimanda a "prompt v3 §12: incoerenze note", che sono al §14 · R8 righe "al commit 4c9fdce"
contro lo SHA di ORIGINE (verificato: cambia solo il diario del 31) · R9 `CLAUDE.md` cita `_schema.md`, che nessun
blocco crea · R15 `node --test test/` non funziona su Node 22 · R19 slug non dati per `rust-cohle`,
`resilienza-napoleonica` · R22 `prova` di 08 (primaria/secondaria) contro un URL · R29 "esoterismo", "mistero",
"malinconia" temi o no · R32 manca uno stato "deterministici ok, giudice da fare" · R35 `text` del fire: id o percorso ·
R39 la riserva oltre C1–C25 · R49 "le mie frasi" senza argomento non ha ricetta · R59 "nuovo" e "sparito" al giorno 1;
commit `ritratto: AAAA-MM`; ◌ o ○ per una convergenza · R61 dove va "Ci sono." senza file; `1.` obbligatorio anche con
una voce.

## Verdetto

**Il pacchetto va corretto in questi punti** prima di darlo all'altro account. In ordine di urgenza:

1. **Il banco nel v3** (R30, R64, R46, R70): riscrivere le schede B e D con i nomi del modello v3 (o consegnare le prove
   in JSON), allineare le "Risposta" al §7.2.1 e dire in una frase che cosa blocca. Oggi ogni collaudo passa per un
   traduttore umano o AI, che decide da sé.
2. **Lo schema** (R23, R12, R41, R33, R63): correggere l'`if` su `cerchia`, dare l'esempio di §3.5, una lettura importata
   con un corpo, l'intento di "Chiedi", un elenco solo di esiti.
3. **L'ordine dei blocchi** (R44, R55, R53): `setup.sh` e le prime sezioni di `contesto.mjs` vanno al blocco 0–2; il ramo
   del banco prende il codice da `main`.
4. **Una regola sull'esito all'ingresso** (R24/R62), uguale in modello, prompt e piano.
5. **Il blocco 2** (R7, R27, R10, R36): togliere o riscrivere 05-regole, fissare gli slug dei nodi prima delle parti della
   tabella, aggiungere al §3.6 la regola del cognome, segnare le C ✧.
6. **Il prompt "smista"** (R65, R66): portare dal modello le regole fini (il diff sotto è un punto di partenza, non ancora
   sufficiente: B01, B02, B11).

Che cosa invece regge già: l'ordine dei blocchi 0–3, il prompt di avvio (con R1), la tabella §14.1 (i conti tornano
esatti), il protocollo delle citazioni, la Routine "ritratto" (il primo ritratto passa al primo colpo), la separazione
tra il piano dell'AI e gli script che scrivono, e la disciplina del lavoro a subagent piccoli, che ha tenuto il
coordinatore sotto i 200k token.

## La correzione del prompt "smista" usata nel secondo giro

Righe aggiunte a `prompt/smista.md` (passo 3), ognuna con il paragrafo del modello da cui viene:

```text
- intento: … una domanda dentro un memo che dice anche altro (un ricordo, un nesso, un nome) è [salva, chiedi] (§3.3)
- Nome incerto ("credo X", "forse X"): il nodo nasce col nome che ho detto, con nomina ✦ e le mie parole nel perche;
  il titolo probabile va con ⚠ in una riga della risposta ("forse è Y ⚠"); alias solo quando lo confermo (§13.2, §7.2.1)
- link con parole mie non è muto: niente domanda 3. Un momento detto va in `momento` sul nomina dell'opera; t= resta
  nel link; un'indicazione va in nota. Risposta: "Salvato." con il momento (§4, §3.3, §7.2.1)
- parole … in ogni frammento, anche in un seguito o in un ritorna-su (§13.4)
- nessi miei ("tipo X"): converge-con di voce sua, con ~X se X non c'è; la risposta non lo smentisce (§4, A1, §7.2.1)
- reazione: ironia, sufficienza, "carino ma…" = -; ± solo per una commozione o un "ci ha preso" (§3.3)
```

## Collegamenti

- [Pacchetto](/_progetto/pacchetto/LEGGIMI.md) · [Prompt di avvio](/_progetto/pacchetto/prompt-avvio.md) ·
  [Piano](/_progetto/pacchetto/01-piano.md) · [Modello v3](/_progetto/pacchetto/02-modello-v3.md) ·
  [Banco di prova](/_progetto/pacchetto/04-banco-di-prova.md)
