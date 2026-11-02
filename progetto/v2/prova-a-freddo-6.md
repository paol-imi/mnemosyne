# Sesta prova a freddo del pacchetto (giro 10)

**Verdetto: non ancora pronto. Resta una voce alta (P6-1): la Forma di D02 nel banco vieta ogni corsivo di u18, mentre
la regola 7 di `CLAUDE.md` ammette la riga sua di u18, e così una porta per nome si chiude su un'uscita giusta.**

## Fin dove

Ho costruito in `/tmp/memo` (clone locale, mai spinto) i blocchi 0–6, con le prove del banco del piano e le porte del
piano §4. Mi sono fermato alla porta del blocco 6, come vuole `prompt-avvio`: R14 passa nel caso (b), con la formula
«Niente si aggancia ancora.»; la domanda a pancia è scritta e senza risposta. Ho letto soltanto `progetto/pacchetto/`,
le note dell'Atlante allo SHA di `ORIGINE.md` (`3a7ea79…`, clonato in `/tmp/atlante`) e il codice della quinta prova.
Niente da `progetto/v2/`, dai resoconti delle prove precedenti o dalla storia git (l'unico file di `v2/` toccato è
questo resoconto).

- Codice: quello della quinta, riusato per intero. Cambiano 89 righe di `banco/` e un test: 3.061 righe di script con
  i 674 di `banco/esegui.mjs`, 126 test verdi, nessuno saltato (il test del punto zero vero gira, perché il tag
  `punto-zero` c'è).
- Prove: 14 eseguite, 14 passate, tutte al primo giro di Claude. Tre però sono passate solo dopo una correzione del
  checker (D02 «oggi», R01a, e D02 sera con lo stesso checker): l'uscita era giusta secondo `CLAUDE.md`, il checker la
  rifiutava.
- Misure: 36 subagent più 9 sessioni `claude -p` (la prova del ponte in R14); ~2,77 M token di subagent; ~34 minuti di
  orologio dalla copia della radice alla porta del blocco 6. I giudici girano su un modello diverso da chi scrive.

### Passi a mano (U1–U9), simulati

| passo | come |
|---|---|
| U1, U2 | già fatti: il repo c'è, con `progetto/`. Il clone era sul branch della sessione, non su `main`: ho creato `main` in `/tmp/memo` (P6-13) |
| U3, U4, P3 | non fatti (niente telefono né PAT): i memo li scrive `scripts/simula-memo.mjs`, byte per byte come la ricetta, e li committa con la data del caso. Le ricette in `telefono/` sono quelle della quinta, senza token |
| U5–U9 | non servono prima del blocco 7 |
| Routine "smista" col `fire` | un subagent per memo, con «oggi è …» e `LUCCHETTO_ATTESA=0` per saltare i 90 secondi (P6-19) |
| pancia del blocco 4 | non simulata: «ti ha detto qualcosa che non sapevi?» |
| pancia del blocco 6 | non simulata: «In questi tre giorni, aprire Specchio la sera ti ha dato qualcosa che non avevi?». Un ponte è stato scartato dalla prova del passo 2, quindi in più: «Se ti dico *…diceva che il nichilismo è l'ospite inquietante…* (3 novembre) e «I think human consciousness is a tragic misstep in human evolution» ○ (True Detective s1e1, entro il 4 ottobre), il nesso lo vedi da te?» |

## Per blocco

I token sono quelli dei subagent. Il tempo è il percorso critico, con quelli in parallelo contati una volta. Le righe
sono quelle degli script, cambiate o scritte.

| blocco | subagent | token | tempo | righe di codice | prove passate / fallite | giri | voti dei giudici |
|---|---|---|---|---|---|---|---|
| 0 fondamenta | 1 (verifica degli schemi) | ~112k | ~3 min | `ora` 38, schemi 496: nessun cambio; +1 test (le fixture sono gli esempi del modello) | collaudo ok (124 verdi, 1 saltato senza tag) | 1 | — |
| 1 slug, verifica, banco | 2 in parallelo (prove B; D02, R01a, R14 e giudice) | ~248k | ~3 min | `esegui` +3 (capi dei legami da `tra` e `a`); B03, B22, D02, R01a, R14 riallineati | 44/44 test di slug, verifica e banco | 1 | — |
| 2 importazione | 6 (tabella, citazioni, Specchio D02, 3 giudici) | ~468k | ~6 min | nessun cambio (`importa` 497, `contesto` 505); `esegui` +4 e `D02.json` (P6-1, P6-2) | conti 35/52/60, quattro controlli della tabella, 17/17 citazioni; D02 «oggi» passa | 2 (il primo giro è caduto sul checker, non sull'uscita) | D02: 2/2 domande, 3 su 3 |
| 3 cattura | 0 | — | ~1 min | nessuno (`simula-memo` 83) | B18 ridotta passa; memo con accenti, emoji e a capo valido | 1 | — |
| 4 primo ritratto | 4 (1 ritratto, 3 giudici) | ~278k | ~4 min | `applica` 364, nessun cambio; `esegui` +2 (P6-3) | R01a passa | 2 (il primo è caduto sul checker: titolo in corsivo dopo ○) | 8/8, 8/8, 8/8 |
| 5 smista e Specchio | 19 (9 "smista", 1 Specchio D02 sera, 9 giudici) | ~1,40 M | ~16 min | nessun cambio (`smista` 346, `lucchetto` 172) | 10/10: B01, B02, B03, B06, D02 sera, B11, B12, B14, B22, B25 | 1 | B06 3/3, B14 3/3, D02 sera 3/3 |
| 6 prova della meraviglia | 4 (1 Specchio, 3 giudici) + 9 `claude -p` | ~260k | ~3 min | nessuno | R14 passa nel caso (b); D0 ok (32 vicini, con u19) | 1 | D3 «no» 3/3 |
| **totale** | **36 + 9 `claude -p`** | **~2,77 M** | **~34 min** | 89 righe di `banco/` e un test cambiati | **14/14** | | |

Nel blocco 6 Specchio ha provato tre candidati (B01 con u19, u06 e u03), tre sessioni ciascuno: nessuno è risultato
forte per la maggioranza (0/3, 0/3, 0/3; un «sì con riserve» conta come no). Quindi la formula, nessun file. I vicini
di B01 e B02 sono 32 ciascuno: non sono pochi, e il tetto resta 10.

## Registro

| id | file e § | che cosa manca o diverge | che cosa ho scelto | gravità | correzione proposta (file) |
|---|---|---|---|---|---|
| P6-1 | `04-banco-di-prova` D02, Forma «altrui» e Non deve; contro `03-prompt-v3` §1 (`CLAUDE.md` regola 7) | Il banco vuole che nessun tratto in corsivo si ritrovi in u18, u19 o u20. La regola 7 dà ✦ «il gesto **e il mio commento**», e u18 comincia con una riga sua («Un candidato se vorrò fare testi lunghi.»; la lettura: «sua la riga e il gesto»). Specchio l'ha citata in corsivo ✦ con il gesto: D02 «oggi», una porta per nome, è caduta su un'uscita che segue il prompt. La quinta era passata solo perché quella riga non l'aveva scelta | Ha vinto prompt v3 (precedenza del LEGGIMI): `D02.json` esclude quella riga (`tranne`) | **alta**: chiude una porta per nome a caso, e chi segue il banco «corregge» il prompt nel verso sbagliato | `04-banco-di-prova` D02: «nessun tratto in corsivo si ritrova nelle **parole d'altri** di u18–u20 (la poesia, il monologo); la riga sua di u18 può stare ✦, in corsivo, con il gesto (regola 7)». Nel codice: `D02.json` con `tranne` (già in `prova-a-freddo-6/codice`) |
| P6-2 | `03-prompt-v3` §1 (`CLAUDE.md` regola 6) e `04-banco` D02, Forma «riportate» | La regola dice la nota «con le stesse parole» ("trascritta da Claude nel seme"), ma il suo esempio scrive «trascritte da Claude nel seme:». Il checker della quinta cercava la stringa esatta «trascritta da Claude» e ha bocciato l'uscita, che seguiva l'esempio | Ammesse tutte e due: regex `trascritt[ae] da Claude` | media | `03-prompt-v3` §1, regola 6: «la nota, al singolare o al plurale»; `04-banco` D02: «"trascritta da Claude" (o "trascritte")» |
| P6-3 | `01-piano` blocco 4, Collaudo («ogni frase in corsivo segnata ✦ esiste alla lettera»); contro `CLAUDE.md` regola 1 | La regola 1 ammette in corsivo il titolo di un'opera. Su una riga di gesto ✦ con ○ (`*The Long Bright Dark*`), il checker ha preso il titolo per una frase ✦ non alla lettera, e R01a è caduta | Contano come ✦ solo i corsivi prima del primo ○ della riga | media | `01-piano` blocco 4 e `R01a`: «i corsivi dopo ○ (titoli d'opera) non sono frasi ✦» |
| P6-4 | `04-banco` §5 «Il giudice AI» e R14; contro `01-piano` blocco 6 («un sì con riserve conta come no») e `specchio.md` passo 2 | La regola del giro 10 sul «sì con riserve» è scritta solo per la prova interna di Specchio. Per il giudice del banco no: `esegui.mjs` conta ancora un «sì con riserve» come sì. È proprio il caso del 2 a 1 della quinta | Per i miei giudici vale la regola più severa (non è servita: nessuna riserva) | media | `04-banco` §5: «una risposta con riserve conta come esito contrario a quello richiesto»; poi `esegui.mjs` |
| P6-5 | `01-piano` blocco 5 («hanno un giudice solo B06, B14 e B22»; «12 giudici»); contro `04-banco` B22 | La scheda B22 non ha punti di giudizio: «frase inventata» sta solo nella colonna «perché» di §5, che non è un criterio | Vince il banco: B22 senza giudice, quindi 9 giudici al blocco 5 | media | `01-piano` blocco 5: «hanno un giudice solo B06 e B14» e la misura dei giudici |
| P6-6 | `04-banco` B03 contro `03-prompt-v3` (smista, «X: frase» → `@X`) | La scheda ammette in `attribuita-a` anche un `~Jung`; il prompt vuole il nodo persona | La prova resta permissiva, come la scheda | bassa | `04-banco` B03: una forma sola, `@X` |
| P6-7 | `02-modello` §3.4 contro §3.7 | §3.4 dà `in` solo alle persone `finzione`; lo schema lo vieta solo alle persone `vita` | Lo schema, che è eseguibile | bassa | `02-modello` §3.7: `in` vietato anche a `mondo` |
| P6-8 | `schema/piano.json` (dal §3.7) contro `prompt/formato-piano.md` | L'operazione `restituzione` ammette `forma: lettera`, ma «lettera non ha piano» | Lasciato | bassa | `formato-piano.md`: dire chi scrive la lettera ("consolida") |
| P6-9 | `01-piano` §1 e blocco 2 (formato di `citazioni.json`); `02-modello` §14 R7 | In 8 voci di `citazioni.json` la «resa di Claude» sta nel campo `traduzione`, non nel `riferimento`. `importa.mjs` la riporta nel `riferimento` (verificato sull'uscita), ma il piano non dice che il passaggio è dello script | Uscita verificata: ok | bassa | `01-piano` blocco 2: «la resa nel `traduzione` di `citazioni.json`; `importa.mjs` la porta nel `riferimento`» |
| P6-10 | `importa/tabella.json` (prototipo) | 17 avvisi: i riferimenti delle voci della tabella sono diversi da `citazioni.json`, e la voce 9 (Marco Aurelio) ha l'estratto di Moricca con «Resa di Claude». Vince `citazioni.json` (R7) | Nessun cambio | bassa | allineare la tabella a `citazioni.json` (`prova-a-freddo-6/codice/importa/`) o dirlo nel piano |
| P6-11 | `03-prompt-v3` (smista, «Il mentre eri via») | Dice «file vuoto: niente», non «file mancante». `riserva/ritorno.md` nasce al blocco 9 (piano blocco 5): quattro sessioni su nove se lo sono chieste, e tutte hanno scelto bene | Mancante = vuoto | bassa | `smista.md`: «se `riserva/ritorno.md` manca o è vuoto: niente» |
| P6-12 | `03-prompt-v3` (specchio, passo 2) | Non dice in che forma dare i «luoghi» ai tre giudizi, né come contare un «no, se la presenti come ipotesi» | Il memo intero e l'opera con l'episodio; il condizionale contato come riserva | bassa | `specchio.md` passo 2: un esempio dei luoghi |
| P6-13 | `01-piano` §4 e `prompt-avvio` | «Si lavora su `main`» e «`banco/zero` prende il codice da `main`», ma una sessione cloud nasce sul suo branch. Inoltre `prompt-avvio` mette gli esiti in `banco/esiti/` e il banco §5 sul ramo di prova | Creato `main`; gli esiti copiati anche su `main` | bassa | `prompt-avvio` passo 1: «se non sei su `main`, `git checkout -B main`»; banco §5 e piano §4: un posto solo per gli esiti |
| P6-14 | `01-piano` blocco 4 e `ritratto.md`, variante giorno 1 | «Che cosa torna (con i numeri)» il giorno 1, senza conti mensili: da dove vengono i numeri? E un titoletto della tensione vuole un segno? | I conti ✦ di § Nodi; titoletto senza segno | bassa | `ritratto.md`: «giorno 1: i numeri da § Nodi, o nessuno» |
| P6-15 | `03-prompt-v3` (specchio, passo 3) | «Giorni 1–7»: di calendario o attivi? | Quelli dello script (di calendario, dal primo memo) | bassa | `specchio.md`: «giorni di calendario dal primo frammento non importato (modello §6.2)» |
| P6-16 | `06-eredita` contro `02-modello` §14.1 | U22, U23 e U28: 06 li data al 4 ottobre, §14.1 al 5 con `vissuto: 2026-10-04`, ma il caso dubbio 4 è ancora «da verificare» | §14.1 | bassa | `02-modello` §14.1: chiudere il caso dubbio 4 |
| P6-17 | `03-prompt-v3` §1 (`CLAUDE.md`, «le mie frasi») | Non dice come ordinare frasi con la stessa data-tetto, né se una richiesta all'Atlante di 4 parole («vai con la mappa») sia una frase da mostrare | Ordine dei file; mostrata | bassa | `CLAUDE.md`, ricetta «le mie frasi»: una riga |
| P6-18 | `03-prompt-v3` (smista, passo 3) | Nessuna regola per una `reazione` assente, per la forma di un `momento` detto a parole («verso la fine»), per un delicato con `parole` | `reazione: []`; testo alla lettera; niente `parole` | bassa | `smista.md` passo 3: tre righe |
| P6-19 | `01-piano` §4 («Il tempo») | Nel banco il `fire` aspetterebbe 90 s a ogni caso. Lo scavalca solo `LUCCHETTO_ATTESA`, una variabile dei test che il piano non nomina | `LUCCHETTO_ATTESA=0` nelle Routine simulate | bassa | `01-piano` §4: «nel banco, `LUCCHETTO_ATTESA=0`» |

## Correzioni proposte, per file

- **`04-banco-di-prova.md`**
  - D02, Forma «altrui» e Non deve: la riga sua di u18 ammessa ✦ (P6-1, **alta**);
  - D02, «riportate»: la nota al singolare o al plurale (P6-2);
  - §5 «Il giudice AI»: una risposta con riserve conta come esito contrario (P6-4);
  - B03: solo `@X` (P6-6);
  - §5 «Come si registra l'esito»: il posto degli esiti (P6-13).
- **`03-prompt-v3.md`**
  - §1 (`CLAUDE.md`), regola 6: la nota al plurale (P6-2); ricetta «le mie frasi» (P6-17);
  - `smista.md`: «ritorno.md manca o è vuoto» (P6-11); reazione assente, `momento` a parole, delicato e `parole` (P6-18);
  - `specchio.md`: i luoghi nella prova del ponte (P6-12); i giorni 1–7 di calendario (P6-15);
  - `ritratto.md`, giorno 1: i numeri (P6-14);
  - `formato-piano.md`: la lettera non ha piano, ma lo schema la ammette (P6-8);
  - poi `bash progetto/pacchetto/aggiorna.sh`, che rigenera `radice/`.
- **`01-piano.md`**
  - blocco 4, Collaudo: i corsivi dopo ○ (P6-3);
  - blocco 5: B22 senza giudice, quindi 9 giudici (P6-5);
  - blocco 2: chi porta la resa nel `riferimento` (P6-9);
  - §4: `LUCCHETTO_ATTESA=0` e un posto per gli esiti (P6-19, P6-13);
  - in testa, la sesta prova: il suo codice e le sue misure.
- **`02-modello-v3.md`**: §3.7, `in` e le persone `mondo` (P6-7); §14.1, il caso dubbio 4 (P6-16).
- **`prompt-avvio.md`**
  - passo 1: `main` (P6-13);
  - passo 2: il codice della sesta (`progetto/prova-a-freddo-6/codice/`) come punto di partenza al posto della quinta,
    perché ha `D02.json`, `R01a`, `esegui.mjs` e le prove B03 e B22 già allineati.
- **Codice** (non normativo, già in `progetto/prova-a-freddo-6/codice/`, con `rispetto-alla-quinta.diff`):
  - `banco/esegui.mjs`: `tranne`, la nota come regex, i corsivi dopo ○, i capi dei legami da `tra` e `a`;
  - `banco/prove/D02.json`, `R01a.json`, `R14.json`, `B03.json`, `B22.json` e `schema.json`;
  - `test/schema.test.mjs`;
  - da fare: `importa/tabella.json` allineata a `citazioni.json` (P6-10), e la regola delle riserve in `esegui.mjs`
    dopo il banco (P6-4).
