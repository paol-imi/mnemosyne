# Seconda prova a freddo del pacchetto

**Verdetto: va corretto in questi punti** (11 voci alte, tutte in prompt v3, piano e banco; il modello v3 regge).

> 2026-11-01. Una sessione nuova, che ha letto solo `progetto/pacchetto/`, le note dell'Atlante allo SHA di
> [ORIGINE](../pacchetto/ORIGINE.md) e il codice prototipo `progetto/prova-a-freddo/codice/`, ha eseguito alla lettera
> [prompt-avvio](../pacchetto/prompt-avvio.md) in `/tmp/memo`, da coordinatore con subagent dal compito piccolo. Nessun
> file di `progetto/v2/` letto (nemmeno quelli che il pacchetto linka: vedi P2-2). Nessun push di `/tmp/memo`. Il codice
> scritto sta in [`progetto/prova-a-freddo-2/codice/`](../prova-a-freddo-2/codice/), le correzioni ai prompt fatte durante
> la prova in [correzioni-ai-prompt.diff](../prova-a-freddo-2/correzioni-ai-prompt.diff).

## Fin dove

**Blocchi 0–6 tutti eseguiti; ferma alla porta del blocco 6**, come vuole prompt-avvio (aspetta il "vai avanti" dell'utente).
- Porte 1→2, 2→3, 4→5 aperte al primo giro sui deterministici; **D02** (blocco 2) passa al **terzo** giro.
- Porta del blocco 5 (B01, B02, B06, D02; poi B03, B11, B12, B14, B22, B25): **10 su 10 al giro finale**, dopo **5 fallimenti**
  (B01, B02, B03, D02, B14), tutti chiusi correggendo i **prompt**, mai il codice. Per aprirla è stato necessario anticipare
  dal blocco 7 `parole.md` e tre sezioni di `mappa.md` (P2-66).
- Blocco 6, R14 su memo sintetici del banco (B01, B02; Specchio la sera del 5 novembre): giro 1 **fallisce** sui
  deterministici (ponte vero su u01 ma consegnato male), giro 2 **passa** con "Niente si aggancia ancora." (giudice 3/3 su
  R14.3). Esito del piano: *nessun ponte ma nessuna invenzione → si continua, e si controllano i vicini*. Il ponte atteso dal
  banco (Galimberti–Rust, u19) non è uscito in nessun giro (P2-87).
- **Passi a mano simulati:** U1 e U2 (il repo e la sessione esistono già: `/tmp/memo` è un clone di questo repo); U3 (PAT) e
  U4 (Comando rapido) non fatti: il PUT è simulato da uno script che scrive il file come la ricetta `telefono/memo-ios.md`
  (frontmatter `registrato` + `canale: telefono`, corpo byte per byte) e lo committa con la data del caso; P3 resta in
  attesa. La scelta "l'utente non vuole toccare l'Atlante" (piano §1, piano B) è simulata (P2-22). U5–U9 non servono fino
  al blocco 7.
- **Domande a pancia, non simulate.** Blocco 4: «ti ha detto qualcosa che non sapevi?». Blocco 6 (il piano non la scrive:
  P2-89), quella che farei: «In questi tre giorni, aprire Specchio la sera ti ha dato qualcosa che non avevi? E se ti
  dico Galimberti e Rust, il nesso lo vedi da te?».

## I numeri, per blocco

Tempo: orologio della sessione, con i subagent in parallelo dove possibile; in tutto **~1 h 50 min**, **63 subagent**,
**~5,7 M token di subagent**. Righe finali in `/tmp/memo`: script 2.006 (più `banco/esegui.mjs` 420), test 1.982, schemi e
prove 1.034, ricette 269, prompt 708 (dal pacchetto, più 31 righe di correzioni). `npm test`: **108/108** in `/tmp/memo`
(nella copia in `codice/` 9 test falliscono perché cercano `CLAUDE.md`, `prompt/` e le cartelle alla radice).

| blocco | subagent | token | tempo | righe di codice | prove del banco |
|---|---|---|---|---|---|
| 0 fondamenta | 1 | 133k | 5 min | 45 script, 498 schemi, 167 test | clone pulito: setup + `npm test` 23/23; schemi compilano; esempi §3.3–§3.5 validano, copie sbagliate no |
| 1 slug, verifica, banco | 3 | 400k | 14 min | 773 (slug 75, verifica 293, esegui 405), 4 prove JSON, giudice 51; test 456 | test di slug 8/8 (Galimberti, De André, chioran→cioran, marco≠marco-aurelio); B03 meccanico passa |
| 2 importazione | 15 (3 lavoro, 3 risposte D02, 9 giudici) | 1,34 M | 25 min | importa 439, contesto 240, test 318; tabella e citazioni dal prototipo, riviste | conti 35/52/60, nodi vietati, tatuaggi, 8 domande, U alla lettera, mappa: **passano**; D02 "oggi": fallisce 2 volte, **passa al 3° giro** |
| 3 cattura | 1 | 135k | 6 min | ricette 269, test 251 | B18 passa; accenti, emoji, a capo passano; **P3 in attesa** (telefono) |
| 4 primo ritratto | 5 (applica, ritratto, 3 giudici) | 395k | 6 min | applica 184, test 147 | verbatim, convergenza nuova (Montaigne, Plutarco), 316 parole, nessun ⚠: passano; R01.1/2/3/5 e R14.1–3: **3/3**; pancia in attesa |
| 5 smista e Specchio | 33 (5 codice, 16 sessioni smista/Specchio, 12 giudici) | 2,9 M | 60 min | smista 243, applica +163, lucchetto 146, contesto +185 (anticipato), esegui +15; test +638 | giro finale **10/10**; falliti nei giri prima: B01, B02, B03, D02, B14 (4 alte, 1 media) |
| 6 meraviglia | 5 (2 Specchio, 3 giudici) | 420k | 8 min | 0 | R14: giro 1 **fallisce** (D1, D2, D4), giro 2 **passa** (nessun ponte, nessuna invenzione); D5 in attesa |

Un incidente mio, non del pacchetto: `/tmp/memo` aveva come remoto il checkout locale di questo repo, e il primo
`lucchetto.mjs prendi` ci ha spinto un ramo `banco/zero` (solo locale, mai su GitHub). Rimosso il ramo e il remoto, la
prova è ripartita da capo su quel caso.

## Il registro

Gravità: **alta** = ti ferma o ti fa costruire una cosa sbagliata (qui: ha chiuso una porta, o l'avrebbe tenuta chiusa per
costruzione); media; bassa. "Scelta" è ciò che la prova ha fatto per andare avanti.

| id | file e § | che cosa manca o diverge | scelta | gravità | correzione proposta (file) |
|---|---|---|---|---|---|
| P2-1 | radice/claude-radice.md righe 4 e 45; banco §5 Ordine | rimandano a `_schema.md`; il piano (blocco 0) vuole `schema/frontmatter.json` | `schema/` | bassa | `_schema.md` → `schema/frontmatter.json` (prompt-v3 §1, banco §5) |
| P2-2 | piano blocco 2; modello §14 | "un giudizio per ogni attrito A1–A31" di `../v2/simulazione/attriti-importazione.md`, fuori dal pacchetto | solo §14, §14.1 e la tabella del prototipo | media | togliere il rimando agli A1–A31 dal piano o copiare gli attriti nel pacchetto (piano blocco 2) |
| P2-3 | piano blocco 0 | `CLAUDE.md` = "bozza (a) dei prompt operativi" (v2), ma prompt-avvio copia `radice/claude-radice.md` | prompt v3 | bassa | piano blocco 0: "`CLAUDE.md` = `radice/claude-radice.md`" |
| P2-4 | piano blocco 1 (tabella) | `candidati()` dà "slug", ma B06 ha bisogno della forza (certo/debole); forma di `alias` non detta | `{slug, via, debole}` | media | piano blocco 1 e modello §3.6: la firma esatta |
| P2-5 | modello §3.6 vs §6.1 | riga di alias con e senza `cerchia` | cerchia facoltativa | bassa | §6.1: `chiave → slug (genere, cerchia)` |
| P2-6 | modello §3.6 | articoli in testa ("uno"?), regole cognome/nome solo per le persone? | solo persone; "uno" tolto | bassa | §3.6: l'elenco degli articoli |
| P2-7 | modello §2.2 vs formato-piano | `versione` nell'esempio del piano vs "la mette lo script" | facoltativa | media | formato-piano o §2.2: una sola regola |
| P2-8 | modello §2.2 vs formato-piano | ciclo `lettera` sì/no | modello | bassa | formato-piano: elenco dei cicli |
| P2-9 | formato-piano "Tipi dei campi" | `da` intero, ma in `lapide` è uno slug | intero nel legame, slug nella lapide | bassa | formato-piano |
| P2-10 | formato-piano, §3.4 vs banco G4 | citazione all'ingresso: con o senza `alias` | G4 | media | vedi P2-62 |
| P2-11 | modello §2.2, §17.4 | `aggiorna-nodo` solo "campi" | tutti i campi tranne schema/_genere/fuso-in | bassa | §2.2 |
| P2-12 | piano blocco 0 | identità git del bot non data | memo / memo@local | bassa | piano blocco 0 (`ambiente/setup.sh`) |
| P2-13 | modello §3.7 | nessuna radice che riconosca il tipo del file | radice per chiavi | bassa | §3.7 |
| P2-14 | piano §4 vs banco §5 "Dati sintetici" | `sintetico: true` nel frontmatter (piano) vs nessun campo in più, elenco in `banco/sintetici.txt` (banco) | entrambi | media | piano §4: allineare al banco |
| P2-15 | modello §3.2 | formato di `frammenti/.hash` | sha256sum | bassa | §3.2 |
| P2-16 | banco G4, G5 | "nato da smista" si riconosce solo dal messaggio di commit | `git log --diff-filter=A` | bassa | banco "I controlli": dirlo |
| P2-17 | modello §7.2 passo 4 vs banco G4 vs formato-piano | tre elenchi diversi dei campi vietati all'ingresso | G4 | media | §7.2 e formato-piano = l'elenco di G4 |
| P2-18 | piano blocco 1, banco G3, B24 | "ID esterno" non definito | chiavi note e link ai registri | bassa | modello §3.7: l'elenco |
| P2-19 | banco G6 vs schede B07, B25 | "Salvato." obbligatorio vs esempi senza | solo "≤ 1 ?" e conteggio | media | banco G6 |
| P2-20 | modello §6.1 | formato delle righe di § Nodi e § Parole candidate | regex `slug · genere · … ✦n` | bassa | §6.1: una riga d'esempio per sezione |
| P2-21 | piano blocco 1 | `--esiti` file o cartella | file | bassa | — |
| P2-22 | piano §1 | correggere le citazioni sull'Atlante "con il sì dell'utente" è un passo a mano che non è fra U1–U9, e la sessione non può scrivere su tattoo-shit | piano B, simulato | media | piano §1: togliere (vedi P2-24) |
| P2-23 | piano blocco 2 | rifare il protocollo delle 17 citazioni se c'è già `citazioni.json` del prototipo? | riuso + 6 verifiche | bassa | piano blocco 2 |
| P2-24 | piano §1 (tabella e piano B) | al checkpoint 3a7ea79 l'Atlante ha **già** tutte le correzioni di 07: 8 su 9 senza effetto, 7 su entità morte | `correzioni-citazioni.json` con le 2 utili | media | piano §1: "già fatte al checkpoint" |
| P2-25 | 08-citazioni §3 vs modello §3.4 | cinque esiti contro quattro | modello | media | 08 §3 (o una riga nel piano blocco 2) |
| P2-26 | 06 §3.3, 07, piano blocco 2 | le 17 vive non sono elencate in un posto; formato dei JSON non fissato | prototipo | bassa | piano blocco 2: l'elenco |
| P2-27 | modello §14.1 U20 | «I don't sleep, I just dream.» col punto; l'Atlante no | come l'Atlante | bassa | §14.1 |
| P2-28 | modello §3.6, banco punto zero | `rust-cohle` "slug dell'Atlante" ma nessuna scheda con quel nome | nasce da u19/u20 | bassa | §3.6 |
| P2-29 | modello §14 R4 e precisazioni | C1 ha una riga ritoccata da Claude il 7/10: ✧ o ◌? | ✧ | media | §14 precisazioni: dire C1 |
| P2-30 | modello §14.1 vs R5/A31 | "alias solo da parole tue" vs Napoleone | tenuto | bassa | §14.1 |
| P2-31 | modello §14.1 | righe "al commit 4c9fdce"; tornano a 3a7ea79 ma va verificato | — | bassa | §14.1: "verificate a 3a7ea79" |
| P2-32 | modello §14 "ordine" | riconciliazione dopo le restituzioni (immutabili) | in memoria, prima di scrivere | media | §14 ordine |
| P2-33 | modello §2.2 | `prompt` delle letture importate | 7 cifre dello SHA dell'Atlante | bassa | §14 |
| P2-34 | modello §14 R12 vs §7.2 | `link` alla scheda su una citazione senza esito | tolto | bassa | §14 R12 |
| P2-35 | modello §6.1 Stato | "ultimo consolida" chiede la storia git | — | bassa | §6.2 |
| P2-36 | piano blocco 2 Collaudo vs banco D02 vs piano blocco 7 | D02 "oggi" al blocco 2 legge `parole.md`, che nasce al blocco 7 | D02 da Specchio | media | piano blocco 2: D02 in Specchio, o `parole.md` al blocco 2 (vedi P2-66) |
| P2-37 | piano blocco 2 Uscita, banco | commit del punto zero datato 7/10 con dentro u31 del 31/10 | come il piano | bassa | piano blocco 2: data 2026-10-31 |
| **P2-38** | prompt-v3 §11 `progetto.md` vs §1 `CLAUDE.md` regola 6 e banco D02 | la regola "`forma: riportata` ✦ con la nota *trascritta da Claude*" sta solo in `CLAUDE.md`, che il Progetto non legge: D02 giro 1 l'ha omessa (3/3 no) | regola aggiunta | **alta** | prompt-v3 §11 (e `radice/prompt/progetto.md`): righe "riportata" e "altrui" |
| P2-39 | banco D02 vs prompt `progetto.md` | "oltre le 8 righe" vs "fino a 150 parole" | "elenco fino a 8 righe" | media | prompt-v3 §11 |
| P2-40 | banco D02, G6 | un "?" dentro una frase citata conta? | no | bassa | banco "Come si leggono i criteri" |
| **P2-41** | banco D02 Forma vs prompt `progetto.md` | "il seme, se c'è, in una riga ✧": il prompt non lo dice (giro 2, 2/3 no); e i giudici lo leggono in due modi (al blocco 5 "se c'è" = facoltativo: 3/3 sì senza riga ✧) | riga aggiunta al prompt | **alta** | banco D02: "il seme sempre in una riga ✧"; prompt-v3 §11 e §1 ricette |
| P2-42 | modello §3.1, 11-telefono vs §3.2, B21 | allegati `.webp` vs formato originale | originale | media | §3.1 |
| P2-43 | piano blocco 3 vs modello §7.1 | "Chiedi" apre l'app o il Progetto | il Progetto | bassa | piano blocco 3 |
| P2-44 | 11-telefono §1 vs modello §7.1, U7 | `text` del fire: percorso o id | id | bassa | 11-telefono |
| P2-45 | ricetta vs `ora.mjs` | fuso del telefono vs sempre Roma | — | bassa | modello §3.1 |
| P2-46 | piano blocco 3, Quadro | P3 manca: blocca il 5? | no | bassa | piano Quadro |
| P2-47 | piano | data del giorno 0 e ora del primo ritratto non fissate | 2/11, 3/11 09:07 | bassa | piano §0 |
| P2-48 | prompt `ritratto.md` | la variante giorno 1 non dice di saltare ritmo e soglia (con 0 parlanti la Routine tace) | saltati | media | prompt-v3 §6 |
| P2-49 | prompt `ritratto.md` | titolo con 0 frammenti; "dillo nel messaggio" vs "l'ultima riga è la domanda"; ≤ 14 file | — | bassa | prompt-v3 §6 |
| P2-50 | piano, modello §14 | 26 `converge-con` eredita, non 25 | — | bassa | §14 |
| P2-51 | modello §2.2 vs formato-piano, §3.7 | hash `prompt`: quali file, quale algoritmo; la restituzione non ha `prompt` | §2.2, SHA-1 blob | media | §2.2 e formato-piano |
| P2-52 | modello §3.5 vs esempio di formato-piano | voci a inizio riga vs "**Salvato.** 1. …" | §3.5 | media | formato-piano e prompt-v3 §3 (esempi) |
| P2-53 | modello §3.1 | data dell'id di un ritratto | ora di scrittura | bassa | §3.1 |
| P2-54 | prompt `ritratto.md` passo 8 vs piano | `contesto/ritratto.md` nasce al blocco 7: il ritratto del giorno 1 non arriva al Progetto | niente copia | media | piano blocco 2: anticipare la copia |
| P2-55 | piano blocco 5 vs modello §8.1 | codici del lucchetto: manca "non tocca a te" | codice 4 | media | piano blocco 5 |
| P2-56 | modello §8.1 | gettone dopo `lascia`, identità della sessione, unità di `--aspetta` | — | bassa | §8.1 |
| P2-57 | modello §8.1 vs `specchio.md` | attesa di 90 s per Specchio | prompt | bassa | §8.1 |
| P2-58 | modello §6.2 vs §7.5 vs piano blocco 6 | vicini "fino a 10" vs "tutti gli importati" vs "alzare a 20" | importati oltre il tetto | media | §6.2 |
| P2-59 | modello §6.2, piano blocco 5 | "nomi" del testo e "scarti" del pacchetto non definiti | n-grammi | bassa | §6.2 |
| P2-60 | piano blocco 5 | `ingresso/.pacchetti/` si committa? | ignorato | bassa | piano blocco 0 (.gitignore) |
| P2-61 | piano blocco 5 vs B13, B14 vs §7.2 vs `smista.md` | titolo da oEmbed; l'AI "solo se fallisce" contro "mai un titolo non da oEmbed" | nota ⚠ | media | piano blocco 5 |
| P2-62 | banco G4 vs formato-piano e `CLAUDE.md` | `alias` della citazione all'ingresso ammesso solo dal banco | schema ammette alias | media | prompt-v3 §1 e §2 |
| P2-63 | modello §3.3 vs banco | `risposta` della lettura facoltativa vs sempre | obbligatoria | bassa | §3.3 |
| P2-64 | modello §3.6 vs §8.2 | slug che collide con un nodo di altro genere | `-opera` | bassa | §3.6 |
| P2-65 | modello §3.6 | "prime 6 parole" della citazione | parole del nome | bassa | §3.6 |
| **P2-66** | piano blocco 5 (porta) vs blocchi 2 e 7 | B02 vuole "§ Parole candidate", B12 e B25 "§ Conti", D02 `parole.md`: il piano li costruisce al blocco 7, che dipende dal 6. **Alla lettera la porta del blocco 5 non si apre mai** | anticipati al blocco 5 | **alta** | piano blocco 2 (o 5): `parole.md` e mappa §4, §5, §8 subito |
| P2-67 | `CLAUDE.md` vs modello §13.2, B01, B12 | `autore` solo da consolida vs sull'opera già all'ingresso | modello | media | prompt-v3 §1 |
| P2-68 | banco D02 vs piano blocco 5 vs §7.3 | D02 al blocco 5 non ha data né via (memo del Progetto non separato) | Specchio, sera di B06 | media | piano blocco 5: "D02 in Specchio" |
| P2-69 | modello §3.3 vs §6.1, D02 | "parlante" esclude gli importati ma `parole.md` li vuole; data-tetto non definita | tetto = vissuto o registrato | media | §6.2 |
| P2-70 | modello §6.1 punto 8 vs T03 | Correzioni "applicate" vs "in attesa" | entrambe | bassa | §6.1 |
| P2-71 | `smista.md` esempio | voci sulla stessa riga: `applica` rifiuta il piano | esempio rifatto | media | prompt-v3 §3 |
| **P2-72** | banco B01, modello §13.2 vs `smista.md` | `parole: cultura` da "culturali"; il prompt dice "la mia forma" → `culturale` (B01 giro 1 fallito) | "un nome, non un aggettivo" | **alta** | prompt-v3 §3 (riga `parole`) |
| **P2-73** | banco B01 vs `smista.md` | le voci di un fatto del mondo sono ○: il prompt non lo dice (lo spettacolo è uscito ✦; B01 giro 1 fallito) | regola aggiunta | **alta** | prompt-v3 §3 ("La risposta") |
| P2-74 | piano §4, modello §8.1 | con `ATLANTE_ORA` ferma un lucchetto orfano non scade mai | ripulire il ramo | bassa | piano §4 |
| **P2-75** | `smista.md` vs modello §13.4, B02 | "momento sul `nomina` dell'opera" contro il modello (sulla citazione): B02 giro 1 fallito | "sul nodo a cui si riferisce" | **alta** | prompt-v3 §3 (riga `link con parole mie`) |
| **P2-76** | `smista.md` vs modello §3.4, B03 | "X: frase" ha perso la seconda metà ("la persona X ha un `nomina` solo se la nomini fuori"): B03 giro 1 fallito | regola intera | **alta** | prompt-v3 §3 ("Confini") |
| P2-77 | `CLAUDE.md` vs esempio di `smista.md` e B01 | il corsivo è solo per le mie frasi, ma l'esempio e B01 mettono un titolo in corsivo | a caso, per sessione | media | prompt-v3 §1 o banco B01 |
| **P2-78** | `CLAUDE.md` Ricette vs banco D02 (e LEGGIMI: prompt v3 vince sul banco) | "le mie frasi" = "le ultime 5 + una della coda lunga" contro D02 (fino a 8 righe, riportate con nota, seme ✧): la precedenza dà ragione al prompt, la porta al banco | ricetta allineata a D02 | **alta** | prompt-v3 §1 (ricetta) |
| P2-79 | banco D02 | "il seme, se c'è": due esiti opposti dei giudici | — | (in P2-41) | banco D02 |
| P2-80 | `smista.md`, modello §7.2.1 | `riserva/ritorno.md` nasce al blocco 9: il "mentre eri via" non c'è mai prima | — | bassa | piano blocco 5 |
| **P2-81** | banco B14 vs `smista.md` | `momento: "12:34"` da `t=754`: nessuna regola; e senza nodo dove va (B14 giro 1 fallito) | regola aggiunta | **alta** | prompt-v3 §3 |
| P2-82 | piano §4 | dopo una correzione del prompt, le prove già passate si rifanno? | no | bassa | piano §4 |
| **P2-83** | banco R14 D1, D2, D4 vs `specchio.md` passi 2–3 | il prompt non dice: frase del memo alla lettera, ≤ 3 righe in tutto, il ponte come legame `voce: proposta` nella restituzione (R14 giro 1 fallito) | forma del bilancio scritta | **alta** | prompt-v3 §7 |
| P2-84 | piano blocco 6 Esiti | manca l'esito "ponte vero consegnato male" | porta chiusa, rifatta | media | piano blocco 6 |
| P2-85 | piano blocco 5, `smista.md`, `specchio.md` passo 6 | nessuno script sigilla la chat di Specchio né consuma `.risposte.md`; il piano non lo elenca tra le righe di `smista.mjs` | a mano (mv + hash) | media | piano blocco 5 (riga smista.mjs) |
| P2-86 | `lucchetto.mjs`, piano blocco 0 | i commit del lucchetto senza l'identità del bot fuori da setup.sh | — | bassa | — |
| **P2-87** | modello §7.5 e banco R14 vs `specchio.md`, `smista.mjs`, `CLAUDE.md` | in Specchio, a memo già smistati, **nessuno script dà i vicini**; e "altrui: ✦ il gesto, ○ le parole" fa scartare u19. Due giri, due esiti (ponte su u01; nessun ponte); il ponte atteso (Rust) mai | — | **alta** | piano blocco 5 e prompt-v3 §7: `smista.mjs vicini ID` anche per Specchio; una riga su altrui come ponte |
| P2-88 | banco R14 vs `specchio.md` | "Nessun ponte oggi." e "Niente si aggancia ancora." insieme | — | bassa | prompt-v3 §7 |
| P2-89 | prompt-avvio vs piano blocco 6 | "la sua domanda a pancia" del blocco 6 non è scritta | proposta qui sopra | bassa | piano blocco 6 |

## Le correzioni proposte, per file

**`03-prompt-v3.md` (e `radice/`), il grosso: tutte le alte tranne P2-66.**
- §1 `CLAUDE.md`: ricetta "le mie frasi" come D02 (P2-78); `autore` ammesso sull'opera all'ingresso (P2-67); corsivo dei
  titoli: sì o no, una volta (P2-77); `_schema.md` → `schema/frontmatter.json` (P2-1); `alias` della citazione all'ingresso (P2-62).
- §2 `formato-piano.md`: esempi con le voci a inizio riga (P2-52); `versione` (P2-7); elenco unico dei campi vietati
  all'ingresso, uguale a G4 (P2-17); `lettera` (P2-8); `da` (P2-9); `legami` obbligatorio anche vuoto.
- §3 `smista.md`: `parole` come nomi (P2-72); voci ○ per i fatti del mondo (P2-73); il momento sul nodo a cui si
  riferisce (P2-75); "X: frase" senza `nomina` verso X (P2-76); `t=` → `mm:ss` e `~Nome` per il link senza nome (P2-81);
  esempio di risposta su righe separate (P2-71).
- §6 `ritratto.md`: la variante giorno 1 salta ritmo e soglia (P2-48); titolo e nota finale (P2-49).
- §7 `specchio.md`: forma del bilancio del giorno 3 (P2-83); i vicini da uno script anche a memo smistati, altrui come
  ponte (P2-87); una sola formula senza ponte (P2-88).
- §11 `progetto.md`: riportate e altrui (P2-38); il seme in una riga ✧ (P2-41); "fino a 8 righe" (P2-39).
- Le righe esatte che hanno fatto passare le prove: [correzioni-ai-prompt.diff](../prova-a-freddo-2/correzioni-ai-prompt.diff).

**`01-piano.md`.**
- Blocco 2 (o 5): `contesto.mjs` scrive subito `parole.md` e `mappa.md` §4, §5, §8; il blocco 7 fa il resto (P2-66, P2-36,
  P2-54 per `ritratto.md`).
- Blocco 5: D02 in Specchio, la sera di B06 (P2-68); `smista.mjs` sigilla le chat di Specchio e dà i vicini anche fuori
  dal pacchetto (P2-85, P2-87); codici del lucchetto (P2-55); oEmbed e titolo (P2-61).
- Blocco 6: l'esito "ponte vero consegnato male" (P2-84) e la domanda a pancia (P2-89).
- §1: le correzioni delle citazioni sono già nell'Atlante al checkpoint; niente passo a mano (P2-22, P2-24).
- Blocco 2: via il rimando ad A1–A31 (P2-2); elenco delle 17 vive (P2-26); data del commit del punto zero (P2-37).
- Blocco 0: `CLAUDE.md` = `radice/claude-radice.md` (P2-3); identità del bot (P2-12); `.gitignore` con `ingresso/.pacchetti/` (P2-60).
- §4: sintetici come il banco (P2-14); l'ora nel banco e i lucchetti orfani (P2-74); rifare o no le prove già passate (P2-82).
- Blocco 1: firma di `candidati()` (P2-4). §0: giorno 0 (P2-47).

**`04-banco-di-prova.md`.**
- D02: "il seme sempre in una riga ✧" (P2-41, P2-79); "?" dentro una citazione (P2-40).
- G6 e B07/B25 (P2-19); G4/G5 "nato da smista" (P2-16); §5 `_schema.md` (P2-1).

**`02-modello-v3.md`** (solo precisazioni, nessuna voce alta).
- §2.2 hash `prompt` e `aggiorna-nodo` (P2-51, P2-11); §3.1 allegati e id del ritratto (P2-42, P2-53); §3.2 `.hash` (P2-15).
- §3.6 articoli, firma, collisioni, slug delle citazioni (P2-5, P2-6, P2-64, P2-65, P2-28).
- §6.1–§6.2 formati delle sezioni, data-tetto, vicini (P2-20, P2-69, P2-70, P2-58, P2-35).
- §7.2 elenco unico dei campi vietati (P2-17); §8.1 lucchetto (P2-56, P2-57).
- §14 ordine della riconciliazione, C1, U20, righe a 3a7ea79 (P2-32, P2-29, P2-27, P2-31, P2-30, P2-33, P2-34, P2-50).

**Altri.** `08-citazioni.md` §3: i quattro esiti del modello (P2-25). `11-telefono.md` §1: `text` del fire (P2-44).
`ORIGINE.md`: nessuna correzione (SHA giusto, righe del §14.1 tornano).

## Collegamenti

- [Pacchetto](../pacchetto/LEGGIMI.md) · [Codice della seconda prova](../prova-a-freddo-2/codice/) ·
  [Correzioni ai prompt](../prova-a-freddo-2/correzioni-ai-prompt.diff)
