# Quinta prova a freddo del pacchetto (giro 9)

**Verdetto: il pacchetto non è ancora pronto. Resta una voce alta, P5-1: la variante giorno 1 di `ritratto.md` non chiede la data sui due capi della convergenza. La correzione è una riga; con quella, nessuna voce alta.**

## Fin dove sono arrivato

Sono arrivato alla porta del blocco 6, chiusa come vuole `prompt-avvio`. Ho costruito i blocchi 0–6 in `/tmp/memo`, un clone del repo senza push, seguendo alla lettera il prompt di avvio da coordinatore con subagent. Ho riusato il codice della quarta prova, escluse le parti che il piano dice superate. Tutte le prove dei blocchi passano: D02 "oggi", B18 ridotta, R01a (al terzo giro, dopo P5-1), le dieci prove della porta del blocco 5 al primo giro, e R14 (caso a, un ponte forte B01 ↔ u09, al primo giro ma per 2 a 1). Alla fine 125 test, tutti verdi.

Ho letto soltanto `progetto/pacchetto/`, il codice delle prove (prima la quarta) e le note dell'Atlante allo SHA di ORIGINE. Non ho letto niente di `progetto/v2/`, né i resoconti, né la storia git. Il pacchetto non mi ha mai indirizzato con un link a un file di `v2/` che servisse per costruire.

**I passi a mano, simulati.**
- U1: il repo esiste già (il clone).
- U2: l'ambiente è questo container; il setup script l'ho lanciato a mano (`bash ambiente/setup.sh`) su ogni clone.
- U3 (il PAT), U4 (il Comando rapido) e P3 (il PUT di foto e audio): non fatti, non c'è un telefono. Ogni memo l'ha scritto `scripts/simula-memo.mjs`, come la ricetta, con commit alla data del caso.
- U5–U9: sono dei blocchi 7–8, non raggiunti.

**Al blocco 6 la domanda a pancia non si simula. Sarebbe:** «In questi tre giorni, aprire Specchio la sera ti ha dato qualcosa che non avevi?». La seconda domanda («Se ti dico X e Y, il nesso lo vedi da te?») non si applica: Specchio ha consegnato un ponte, non la formula.

**Numeri.** 41 subagent, circa 3,2 M token, circa 52 minuti di orologio (02:43–03:35 UTC). Ci sono in più 6 sessioni `claude -p`, lanciate da Specchio per la prova del ponte e non contate nei token. Righe di script: 3.060 (con i 673 di `banco/esegui.mjs`); sul codice della quarta ne cambiano 129 e se ne tolgono 14.

## Tabelle per blocco

Il tempo è quello dei subagent sul percorso critico; quelli in parallelo contano una volta.

| blocco | subagent | token | tempo | righe di codice | prove passate / fallite | giri |
|---|---|---|---|---|---|---|
| 0 fondamenta | 1 (verifica degli schemi) | ~94k | ~4 min | schemi 496 + 1 correzione (`lapide.in` solo slug), `ora` 38 | 121 test verdi (1 saltato senza tag) | 1 |
| 1 slug, verifica, banco | 1 | ~109k | ~5 min | `slug` 75, `verifica` 307, `esegui` 673 (+7: i frammenti della Preparazione al giudice, `R14.json` riallineata) | 123 test verdi | 1 |
| 2 importazione | 6 (tabella, citazioni, Specchio per D02, 3 giudici) | ~473k | ~7 min | `importa` 497, `contesto` 505 (nessun cambio) | conti 35/52/60; i 4 controlli della tabella e la ricerca esatta delle U; 17/17 citazioni; D02 "oggi" passa (3/3) | 1 (il congedo tolto dall'uscita: P5-13) |
| 3 cattura | 0 | — | ~1 min | `simula-memo` 83 | B18 ridotta passa; un memo con accenti, emoji e a capo valida | 2 (il primo con un corpo vuoto: P5-12) |
| 4 primo ritratto | 6 (3 ritratti, 3 giudici) | ~491k | ~10 min | `applica` 364; `ritratto.md` +1 riga | R01a: caduta 2 volte sui deterministici, poi passa (giudici 8/8, 8/8, 7/8) | 3 |
| 5 smista + Specchio | 23 (1 di verifica, 9 "smista", 1 Specchio, 12 giudici) | ~1,71 M | ~37 min | `smista` 346, `lucchetto` 172, `contesto` 505 (2 correzioni: la data-tetto nei vicini, "dopo le 22" nell'ora di Roma) | 10 su 10: B01, B02, B03, B06, D02 sera, B11, B12, B14, B22, B25; 125 test verdi | 1 |
| 6 meraviglia | 1 Specchio (+6 `claude -p`) + 3 giudici | ~284k | ~5 min | nessuno | R14 passa, caso (a): giudici sì-sì-no, sì-sì-no, sì-no-sì | 1 |
| **totale** | **41** | **~3,2 M** | **~52 min di orologio** | **3.060** | **14 su 14** | |

R14 è girata in parallelo al blocco 5, su un ramo che parte dal commit dopo B02, come vuole la base del banco. Il blocco 5 non ha poi cambiato `specchio.md`, quindi non è servito rifarla. La correzione di `ritratto.md` non tocca nessuna prova del blocco 5 né R14: niente prove rifatte (piano §4).

Esiti in `progetto/prova-a-freddo-5/codice/banco/esiti/`; uscite e giudizi in `progetto/prova-a-freddo-5/uscite/`.

## Registro

| id | file e § | che cosa manca o diverge | che cosa ho scelto | gravità | correzione proposta (file) |
|---|---|---|---|---|---|
| P5-1 | `03-prompt-v3` §ritratto (`radice/prompt/ritratto.md`), variante giorno 1 | Dice «le date come tetto», ma non che la data va su **ogni** frase ✦ citata. In due giri su due il ritratto ha messo la data alla tensione e l'ha lasciata fuori dalle due frasi della convergenza: R01a cade sui deterministici, porta del blocco 4 chiusa. | Ho aggiunto una riga al prompt nel repo («su **ogni** frase ✦ citata, i due capi della convergenza compresi, sulla riga o una volta in testa al gruppo»). Al terzo giro passa. | **alta** | La stessa riga in `prompt-v3.md` §ritratto, variante giorno 1, poi `aggiorna.sh` |
| P5-2 | stesso punto | Dice «le frasi importate sono `forma: riportata`», ma 7 su 32 non lo sono (banco, "Il punto zero"). Così la nota "trascritta da Claude" rischia di coprire frasi non riportate (D02 Forma, R01a). | Nessuna: le sessioni hanno guardato il campo | media | «quelle `forma: riportata` (non tutte) con la nota…» (`prompt-v3.md` §ritratto) |
| P5-3 | `03-prompt-v3` §specchio, passo 2 (la prova a tre) | Non dice come contare un sì con riserve («sì, ma solo per il nesso minimo») né quanti candidati provare. Le domande 2 e 3 copiate da R14 nominano «la riga del perché (◌)», «lui», «modello §7.5», che il giudice interno non vede. In R14 il ponte è passato 2 a 1 grazie a un sì con riserve, e 2 a 1 anche tra i giudici: il risultato è fragile. | Lo Specchio ha contato il sì con riserve come sì | media | In `specchio.md` passo 2: «un sì con riserve conta come no»; il testo delle due domande per il giudice interno scritto lì, senza ◌ né rimandi; «prova i candidati in ordine, fino al primo che passa» (`prompt-v3.md` §specchio) |
| P5-4 | `03-prompt-v3` §smista "La risposta" e §specchio passo 2; `04-banco` R14 | La definizione di "forte" sta solo nel banco: 5 sessioni di produzione su 12 hanno dovuto aprire il file di collaudo, contro il divieto di leggere il banco. Nel banco la domanda 3 contiene l'attesa («deve essere no»), che il giudice così vede. | Ho tolto l'attesa dal testo per il giudice (`R14.json`) | media | Definizione e domande 2–3 in `CLAUDE.md` (una regola), con il banco che la richiama; nel banco, l'attesa fuori dal testo della domanda (`prompt-v3.md` §1, `banco-di-prova-v2.md` R14) |
| P5-5 | `03-prompt-v3` §1 (`CLAUDE.md`), regola 6 | Nota "trascritta" e data comune una volta per gruppo: tre sessioni, tre forme. D02 "oggi" la mette su una riga sua; R01a in testa al gruppo; D02 sera in coda alla prima riga, con la riga dopo senza data. Il controllo le accetta tutte, ma ognuna indovina. | — | media | Un esempio di tre righe nella regola 6 (`prompt-v3.md` §1) |
| P5-6 | `CLAUDE.md` regola 3 contro la ricetta "le mie frasi" | «Parlante» vuol dire non importato, eppure la ricetta vuole gli importati e insieme «i non parlanti fuori». Le due sessioni D02 l'hanno segnalato tutte e due. | Importati dentro; fuori i link e i frammenti sotto 3 parole | media | Nella ricetta: «qui "non parlanti" sono i frammenti senza parole (link, sotto 3 parole); gli importati valgono» (`prompt-v3.md` §1) |
| P5-7 | `01-piano` §4 "Dove"; `lucchetto.mjs` | Il piano non dice che i cloni del banco non hanno remoto. Nel primo Specchio di D02, `prendi` e il push finale hanno scritto su `banco/zero` del repo d'origine; l'ho rimesso a mano sul tag. | Da lì in poi, cloni del banco senza `origin` | media | Piano §4: «i cloni del banco si fanno senza remoto (`git remote remove origin`): `lucchetto` e Specchio non spingono» (`piano.md`) |
| P5-8 | `03-prompt-v3` §formato-piano, Regole | Tra i campi vietati a una citazione all'ingresso manca `link`, che il modello §3.4 e G4 vietano. Lo schema segue il §3.4; il testo che la sessione legge no. | Lo schema rifiuta `link` | media | Aggiungere `link` all'elenco (`prompt-v3.md` §formato-piano) |
| P5-9 | `02-modello` §6.1 Stato e `03-prompt-v3` §smista "Il mentre eri via" | Dopo `prepara`, Stato dice «silenzio: 0 giorni», perché conta già il memo di oggi: il "mentre eri via" non si ricava (B11, B22: 92 giorni reali). È caduto solo perché `riserva/ritorno.md` non c'è ancora. | — | media | `smista.md`: «il silenzio si legge da `contesto/` prima di `prepara`»; oppure in Stato una riga "silenzio prima dell'ultimo memo" (`prompt-v3.md` §smista o `modello-v3.md` §6.1) |
| P5-10 | `03-prompt-v3` §specchio, passi 3 e 6 | Una sessione senza chat (R14: l'utente apre e non scrive) non sa che `per` dare alla restituzione, se lanciare `prepara --sigilla`, né che messaggio di commit usare. Non è detto nemmeno che cosa fare del bilancio del giorno 3 se Specchio non si apre il giorno 3 (D02 sera, 20/11). | `per` sull'ultimo memo, `copre` sui due; niente sigillo; "specchio: 1 conversazione" | media | Un caso «apertura senza chat» e una riga sul bilancio mancato (`prompt-v3.md` §specchio) |
| P5-11 | `01-piano` blocco 1, `04-banco` §5 "Il giudice AI" | Quali frammenti della Preparazione vede il giudice: «per R14, u19» o i capi che l'uscita sceglie? Un ponte può andare a qualunque uNN. | u19, B01 e B02, più i capi del `tra` dell'uscita | media | Piano blocco 1: «i frammenti della Preparazione e i capi dei legami dell'uscita» (`piano.md`) |
| P5-12 | `01-piano` blocco 3, Collaudo | «B18 ridotta… messaggio vuoto», ma la scheda B18 ha un testo («boh niente volevo solo scrivere qualcosa»). Al primo giro ho simulato un corpo vuoto e G1 è caduta. | Il testo della scheda | bassa | «messaggio senza contenuto (B18)» (`piano.md`) |
| P5-13 | `04-banco` D02, `banco/esegui.mjs` | L'uscita di Specchio chiusa contiene il congedo («Chiuso.») dopo «Vuoi il resto?», e la Forma cade. Il congedo è un turno a parte (specchio.md passo 6), ma niente lo dice per l'uscita. | Congedo tolto dall'uscita | bassa | Banco §5: «l'uscita è la risposta alla domanda, senza congedo» (`banco-di-prova-v2.md`) |
| P5-14 | `03-prompt-v3` §smista passo 2 contro `01-piano` blocco 5 | Sigillo d'ufficio: «prima delle 04:00 di oggi» contro «le ultime 04:00 passate». Tra le 00 e le 04 danno esiti diversi. | Lo script segue il piano | bassa | Allineare `smista.md` al piano (`prompt-v3.md` §smista) |
| P5-15 | `04-banco` §5 parte 1 contro `01-piano` blocco 5 | Le domeniche in mezzo alle B fanno girare "consolida" e "lettera", che nascono al blocco 9. | Saltate (`lacune.md`) | bassa | Piano blocco 5: «senza le domeniche: "consolida" non c'è ancora» (`piano.md`) |
| P5-16 | `03-prompt-v3` §ritratto | "Giorno 1" non è definito (il primo ritratto o il primo del mese?). Il passo 5 legge sezioni di `mappa.md` che al blocco 4 non ci sono, e il ripiego vale solo «se `lucchetto.mjs` non esiste». `aggancio.passo` non ha un formato per una frase di una riga. `[1]` contro `1.` di formato-piano. | Variante giorno 1 al primo ritratto; `passo` omesso | bassa | «Giorno 1 = il primo ritratto»; il ripiego vale per ogni sezione che manca (`prompt-v3.md` §ritratto) |
| P5-17 | `CLAUDE.md` "I quattro tipi" contro `smista.md` §3 "reazione" | `±`: «solo per un giudizio a metà» contro «per una commozione» (B12) | `±` | bassa | Una sola regola (`prompt-v3.md`) |
| P5-18 | `CLAUDE.md` "le mie frasi"; `specchio.md` passo 5; `smista.md` "Messaggio finale" | «Coda lunga» senza definizione (2 volte); formato di `ID.risposte.md` non dato (2 volte); messaggio finale con zero risposte (3 volte) | A giudizio | bassa | Una riga per ciascuno (`prompt-v3.md`) |
| P5-19 | `01-piano` blocco 2; `02-modello` §14.1 | L'esempio `~Friedrich Nietzsche` contro `~Nietzsche` della tabella; il `rif` sta in `tabella.json`, non in `citazioni.json`. Il seme nella `fonte` di s04 (M8–M10). Il `@commit` lo aggiunge `importa.mjs` e il piano non lo dice. «Nessuna parola cambiata» contro R1/R28 (markup, l'etichetta «La mia visione:» di u03). | Tabella com'è (passa i 4 controlli) | bassa | Esempio `~Nietzsche`; una riga sul `@commit` (`piano.md`) |
| P5-20 | `03-prompt-v3` §formato-piano | `lapide`: `da`/`in` «sono slug» (non `@Nome`); `versione` «la mette lo script» senza dire quale per "consolida"; `alias` messo tra "i campi del genere"; modello §3.5 contro §3.7 su `voce: seme` | Lo schema segue la lettera (`in` solo slug) | bassa | Precisare (`prompt-v3.md` §formato-piano) |
| P5-21 | `01-piano` blocco 0, "Dipende da" | U1–U3, ma il PAT (U3) serve solo dal blocco 3 | — | bassa | «U1–U2» (`piano.md`) |
| P5-22 | `01-piano` blocco 5, "Tempo"; §4 "L'ordine" | Le B del banco minimo non hanno giudice (`giudice: []`), salvo B06, B14 e B22. Il piano parla di «24 giudici» e di «se passano, il giudice». | — | bassa | «le B con un giudice: B06, B14, B22» (`piano.md`) |
| P5-23 | `03-prompt-v3` §specchio passo 2 | Le sessioni `claude -p` della prova del ponte leggono l'orologio vero e segnalano «memo nel futuro» | — | bassa | Passare «oggi è …» anche ai tre giudizi (`prompt-v3.md` §specchio) |
| P5-24 | `01-piano`, introduzione | Dice che la quarta ha corretto `vicini`, ma per un importato il campo `data` era ancora il `registrato` (la data-tetto stava in un campo a parte) | Corretto (`data` = data-tetto) | bassa | Togliere o precisare (`piano.md`) |
| P5-25 | `CLAUDE.md` "Il ruolo" | Il valore di `letto-da` non è detto | Il nome del modello | bassa | Una riga (`prompt-v3.md` §1) |

Solo P5-1 mi ha fermato. Tutte le altre voci si sono risolte a giudizio, e le prove sono passate lo stesso.

## Correzioni proposte, per file

Il pacchetto si rigenera da `progetto/v2/` con `aggiorna.sh`: le correzioni vanno nelle fonti.

- **`prompt-v3.md` §ritratto** (→ `radice/prompt/ritratto.md`): **P5-1** (la riga della data, già provata: è nel diff `progetto/prova-a-freddo-5/codice/radice-rispetto-al-pacchetto.diff`); P5-2 (non tutte riportate); P5-16 (giorno 1, ripiego per sezione, `passo`, `[1]`).
- **`prompt-v3.md` §specchio** (→ `specchio.md`): P5-3 (il sì con riserve conta no, le domande per il giudice interno, l'ordine dei candidati); P5-10 (apertura senza chat, bilancio mancato); P5-23 («oggi è» ai giudizi).
- **`prompt-v3.md` §1** (→ `CLAUDE.md`): P5-4 (la definizione di "forte" come regola); P5-5 (un esempio per la regola 6); P5-6 (i non parlanti in "le mie frasi"); P5-17; P5-18; P5-25.
- **`prompt-v3.md` §smista**: P5-9 (silenzio prima di `prepara`); P5-14 (le 04:00); P5-18 (zero risposte).
- **`prompt-v3.md` §formato-piano**: P5-8 (`link` vietato); P5-20.
- **`banco-di-prova-v2.md`**: P5-4 (R14, l'attesa fuori dalla domanda 3; la definizione richiamata da `CLAUDE.md`); P5-13 (l'uscita senza congedo).
- **`piano.md`**: P5-7 (cloni del banco senza remoto); P5-11 (frammenti al giudice); P5-12 (B18); P5-15 (domeniche); P5-19; P5-21; P5-22; P5-24.
- **`modello-v3.md` §6.1** (in alternativa a `smista.md`): P5-9.
