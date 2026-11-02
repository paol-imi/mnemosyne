# Quarta prova a freddo del pacchetto (giro 8)

**Verdetto: il pacchetto NON è pronto. Restano 2 voci alte: R14, la porta del blocco 6, che non si apre in 5 giri, e la domanda 1 del giudice D02, che contraddice la Forma della stessa scheda.**

## Fin dove sono arrivato

- **Passo 1.** Fatto alla lettera: radice copiata, commit `radice: CLAUDE.md e prompt dal pacchetto`. Atlante clonato allo SHA di `ORIGINE.md`.
- **Blocchi 0–4: porte aperte.**
  - D02 "oggi" è passata al giro 2.
  - B18 ridotta passa.
  - R01a è passata al giro 2, con 8 su 8 da tutti e tre i giudici.
- **Blocco 5: porta aperta.** Le 10 prove elencate (B01, B02, B06, D02, B03, B11, B12, B14, B22, B25) passano tutte con i prompt finali.
  - Sul ramo `banco/zero` hanno richiesto 2 giri B03 e 2 giri B01 rifatta.
  - Come vuole il piano §4, le ho rifatte su `banco/rifai` dopo le correzioni dei prompt: B01, B02, B03, B06, D02 sera, B11, B12, B14.
- **Blocco 6: porta chiusa.**
  - D0 passa: u19 è tra i vicini.
  - R14 cade 5 volte su 5 sul giudice: la domanda 2 ha avuto "no" in 15 giudizi su 15.
  - In 4 giri su 5 il ponte consegnato è proprio quello che il banco chiama *atteso* (Galimberti–Rust). I giudici lo bocciano perché regge solo sul perché ◌.
  - Mi sono fermato qui, come vuole il prompt di avvio, e non ho aperto il blocco 7.
- **Codice.** È in `progetto/prova-a-freddo-4/codice/`: senza `node_modules`, senza i dati del punto zero e senza `banco/esiti/`.
  - Contiene il diff della radice rispetto al pacchetto (`radice-rispetto-al-pacchetto.diff`), `lacune.md` e `stato.md`.
  - Test: 121 su 121 verdi.

**Passi a mano simulati.**
- U1 e U2: il clone locale `/tmp/memo` fa le veci del repo privato e della sessione con la rete *Trusted*.
- U3 e U4: il PAT e il Comando rapido sono sostituiti da `scripts/simula-memo.mjs`, che scrive il file come la ricetta e lo committa con la data del caso.
- P3 non si può fare: servono un telefono e il PAT.
- U5–U9 non servono prima del blocco 7.

**Le domande a pancia** (non simulate):
- **blocco 4:** «Ti ha detto qualcosa che non sapevi?»
- **blocco 6:** «In questi tre giorni, aprire Specchio la sera ti ha dato qualcosa che non avevi?» Il ponte atteso è uscito ma è stato bocciato, e i vicini lo mostravano: per questo, in più, «Se ti dico *diceva che il nichilismo è l'ospite inquietante* e il monologo di Rust, il nesso lo vedi da te?».

**Totali.**
- **Subagent:** 84, più il mio lavoro di coordinatore: copie, importazione, esecuzione di `esegui.mjs`.
- **Token dei subagent:** circa 6,2 M.
- **Tempo:** circa 70 minuti di orologio, con molte cose in parallelo.
- **Codice:** circa 3.050 righe di script con `esegui.mjs`. Rispetto alla terza prova: +481 e −150 righe in 23 file.

## Tabella per blocco

| blocco | subagent | token (subagent) | tempo sul percorso critico | righe di codice (fine) | prove passate / fallite | giri |
|---|---|---|---|---|---|---|
| 0 fondamenta | 1 (verifica di conformità) | ~107 k | ~3 min | `ora` 38, schemi 496, test di schema e ora | test 24/24; 2 correzioni (piano.json `aggiorna-nodo`, fixture del formato) | 1 |
| 1 slug, verifica, banco | 2 in parallelo | ~284 k | ~7 min | `slug` 75, `verifica` 307, `esegui` 666, 14 prove JSON | B03 meccanico nei test; D02, R14, R01a e B18 JSON riallineati; 2 correzioni in `verifica` | 1 |
| 2 importazione | 8 (tabella, citazioni, `importa`, 2 Specchio, 3 giudici) | ~685 k | ~8 min | `importa` 497, `contesto` 503 | conti 35/52/60/26; tabella: 3 controlli obbligatori su 4 fallivano, corretti; **D02 oggi**: fallita al giro 1, passata al giro 2 | 2 |
| 3 cattura | 0 (lavoro mio) | — | ~1 min | `simula-memo` 83, ricette | B18 ridotta passa; memo con accenti, emoji e a capo validato; P3 non fatta | 1 |
| 4 primo ritratto | 8 (2 ritratti, 6 giudici) | ~577 k | ~6 min | `applica` 364 | R01a: giro 1 deterministici falliti (date per gruppo), poi giudice 5/8; giro 2: 8/8 | 2 |
| 5 smista e Specchio | 45 (1 verifica, 19 smista, 2 Specchio D02, 1 Specchio D02 rifatta, 24 giudici) | ~3,2 M | ~45 min (smista in sequenza su un ramo) | `smista` 344, `lucchetto` 172, `contesto` +parte 2 | 10/10 elencate passate; fallimenti intermedi: B03 g1, B01 rifatta g1, D02 sera rifatta con la domanda vecchia | 2 (B03, B01), più le ripetizioni |
| 6 meraviglia (R14) | 20 (5 Specchio, 15 giudici) | ~1,35 M | ~13 min | nessun codice; `specchio.md` cambiato 4 volte | R14: 0/5 | 5, porta chiusa |

Note sulla tabella:
- Il blocco 5 costa più che nella terza prova (1,88 M). Pesa la regola del piano §4: «si rifanno una volta, con i prompt finali, quelle che leggono un prompt corretto». Tutte le prove leggono `CLAUDE.md` e `formato-piano.md`, quindi ogni correzione rifà l'intero blocco. Qui sono costate 9 prove in più, circa 1,3 M token.
- Le domeniche (`consolida`, `lettera`) e il primo del mese (`ritratto`) non girano: al blocco 5 non esistono ancora. I punti "dopo consolida" non sono controllati, come nelle prove precedenti.

## Registro

Gravità: **alta** = mi ferma o mi fa costruire una cosa sbagliata; media; bassa.

| id | file e § | che cosa manca o diverge | che cosa ho scelto | gravità | correzione proposta (file) |
|---|---|---|---|---|---|
| **P4-1** | `04-banco` R14 (Preparazione e Uscita attesa); `03-prompt-v3` specchio passo 2; `02-modello` §7.5; `01-piano` blocco 6 | Il ponte che il banco indica come atteso non regge le domande 2 e 3 del giudice della stessa scheda. È Galimberti–Rust sul "prezzo della lucidità", con l'esempio «*diceva che il nichilismo è l'ospite inquietante* / «I think human consciousness is a tragic misstep…» / il prezzo della lucidità». Coprendo il perché, le due frasi non hanno niente in comune; i giudici lo dicono 15 volte su 15 e in 11 casi su 15 lo chiamano anche forzato. Il pacchetto spinge verso quel ponte in tre punti: `specchio.md` («il ponte inatteso sta lì (Rust per Galimberti)»), il modello §7.5 («Rust (u19) deve poter rispondere a Galimberti») e il banco («il ponte atteso»). In più "forte" non è definito, e chi produce il ponte lo sopravvaluta. **Giri:** g1 come da pacchetto, perché «Galimberti mette l'ospite nella cultura, Rust nella coscienza»; g2 con "forte" definito come la domanda 2: stesso ponte; g3 con la prova della parola in comune: la prova è aggirata (greci/greche, che il giudice trova forzato); g4 con la prova di un subagent senza il perché: il subagent dice no e la sessione consegna lo stesso; g5 senza il suggerimento «Rust per Galimberti»: la prova del subagent promuove un ponte che al g4 era stato bocciato 3 su 3. | Porta del blocco 6 chiusa, come vuole il prompt di avvio. Ho tenuto in `specchio.md` la definizione di forte, la prova affidata a un subagent e la rimozione del suggerimento (diff nel codice). | **alta** | **Decisione di prodotto prima del pacchetto.** (a) **banco R14:** togliere Galimberti–Rust come "uscita attesa", o tenerlo come caso che deve dare "Niente si aggancia ancora." se le parole non lo reggono; scrivere che D0 (u19 tra i vicini) è la condizione e non la risposta. (b) **`specchio.md`:** togliere «(Rust per Galimberti)»; "forte" = domande 2 e 3 di R14; la prova la fanno 3 subagent separati con maggioranza, come il giudice del banco, e se non passa si scrive la formula. (c) **modello §7.5:** "Rust deve poter essere tra i vicini di Galimberti", non "deve rispondere". (d) **piano blocco 6:** l'esito "giudice D2 no" va in "forzato", e la correzione va in `specchio.md`, non in `smista.md` (P4-11). |
| **P4-2** | `04-banco` D02, Forma e Giudice (`banco/prove/D02.json` delle prove) | La Forma di D02 vuole **esattamente una** riga ✧ del seme. La domanda 1 del giudice («c'è tra le frasi date come tue una sintesi…?») non la esclude. I giudici contano la riga ✧ come sintesi: D02 sera ha avuto 1 sì su 3 al primo giro e 3 sì su 3 sulla rifatta, dove l'uscita era conforme. La porta di un blocco che elenca D02 si apre o si chiude a caso. | Ho riscritto la domanda: «tra le righe date come tue (le ✦; non la riga ✧ del seme, che la Forma richiede a parte)…». Rigiudicata la stessa uscita: 0 sì su 3, passa. | **alta** | `04-banco-di-prova.md` D02, domanda 1 del giudice, e la sua copia in `banco/prove/D02.json`. |
| P4-3 | `03-prompt-v3` CLAUDE.md, ricetta "le mie frasi" | Non dice come citare in corsivo un frammento su più righe. La sessione unisce le righe con " / ", il corsivo non è più alla lettera e D02 "oggi" fallisce al giro 1. | Il corsivo è un tratto di **una** riga. | media | `03-prompt-v3.md` §1 (ricetta "le mie frasi" e regola 1). |
| P4-4 | `04-banco` D02 Forma, R01a; `03-prompt-v3` CLAUDE.md regola 6 | Non è detto dove stia la data di un gruppo di righe riportate. Il ritratto la mette una volta in testa al gruppo, come la nota "trascritta"; il controllo la vuole su ogni riga. R01a fallisce al giro 1. | La data può stare in testa al gruppo, come la nota; ho cambiato `esegui.mjs`. | media | `03-prompt-v3.md` regola 6; `04-banco` D02 Forma («con la sua data»: anche in testa al gruppo). |
| P4-5 | `02-modello` §3.3 (riga `reazione`) contro `04-banco` B03, B04, B05 | Il modello dice «± per una commozione». Il banco vuole `+` per «mi ha spaccato», «mi ha distrutto», «mi ha colpito tanto». La sessione di B03 sceglie ±, legittimamente secondo il modello, e B03 fallisce. | In `CLAUDE.md`: l'iperbole d'entusiasmo è `+`; ± solo per un giudizio tra i due («ci ha preso»). | media | `02-modello-v3.md` §3.3; `03-prompt-v3.md` §1 (campo `reazione`). |
| P4-6 | `03-prompt-v3` formato-piano, esempio di B01 | L'esempio ha solo il `nomina` di Galimberti. Mancano i due `nomina` (spettacolo, citazione) e il `parla-di ✦ nichilismo` che il modello §3.3 e B01 vogliono. Una sessione lo prende come modello e B01 rifatta fallisce; un'altra mette il `parla-di` «contro l'esempio». | Esempio completato, fixture del test rigenerata. | media | `03-prompt-v3.md`, formato-piano (esempio). |
| P4-7 | `01-piano`, introduzione "Che cosa è superato" | Il codice della terza prova ha difetti non elencati tra i superati. `smista.mjs vicini` mette il seme ✧ tra i vicini (contro §6.2 e §7.5) e legge la data-tetto solo con `≤` (u22, u23, u28 risultano del 5 ottobre). `contesto.mjs` § Conti non ha "dopo le 22". `esegui.mjs` legge la data-tetto solo con `≤`. Trovati da una verifica; chi riusa senza verificare costruisce il ponte verso il seme. | Corretti in `smista.mjs`, `contesto.mjs` e `esegui.mjs`. | media | `01-piano.md`, introduzione: aggiungere i quattro punti, oppure indicare la quarta prova come punto di partenza. |
| P4-8 | `01-piano` blocco 2; `02-modello` §14.1 | La tabella della seconda prova fallisce 3 dei 4 controlli obbligatori (u19/u20 senza `nomina rust-cohle`, link su due citazioni senza esito, u22 con una sola riga di fonte); il piano lo prevede. In più «citano tutti i file» non dice se si parla della `fonte` del frammento o di quella della lettura: il frammento era già completo, la lettura no. | Corretta la tabella; la `fonte` della lettura cita tutto. | media | `01-piano.md` blocco 2: «la `fonte` della lettura cita tutti i file». Meglio ancora: indicare come punto di partenza `importa/tabella.json` della quarta prova. |
| P4-9 | `01-piano` blocco 5 (riga di `applica.mjs`) contro `03-prompt-v3` smista e `04-banco` B13 | Il piano dice che senza oEmbed l'AI può proporre il titolo «solo in `nota`, con ⚠». `smista.md` e B13 lo vietano anche in `nota`. | Seguo prompt e banco. | media | `01-piano.md` blocco 5. |
| P4-10 | `01-piano` §4, regola delle prove da rifare | «Si rifanno quelle che leggono un prompt corretto»: `CLAUDE.md` e `formato-piano.md` li leggono tutte, quindi ogni correzione rifà l'intero blocco. Qui sono state 9 prove, ~1,3 M token, ~25 minuti. Il costo non è nel piano e "leggono" non è definito (un file letto ma non usato dalla prova conta?). | Ho rifatto tutte le prove che leggono il file corretto, su un ramo `banco/rifai` dal punto zero. | media | `01-piano.md` §4: definire "leggono" (la regola cambiata tocca la prova) e mettere il costo nella stima. |
| P4-11 | `01-piano` blocco 6, esiti | «Un ponte inventato o forzato → si corregge `prompt/smista.md`». Il bilancio del giorno 3 lo fa Specchio con `specchio.md`. | Corretto `specchio.md`. | media | `01-piano.md` blocco 6. |
| P4-12 | `03-prompt-v3` formato-piano ("I tipi dei campi") contro `02-modello` §3.7 | `nodo` ammette `~Nome`; §3.7 vuole uno slug (o `@Nome`). | Slug o `@Nome`. | media | `03-prompt-v3.md`, formato-piano. |
| P4-13 | `04-banco` "Il punto zero" e D02 Dati contro D02 Forma | Nei Dati la nota "trascritta da Claude" sembra andare su ogni frase; la Forma la vuole una volta per gruppo. Non è detto se una riga altrui o senza segni interrompa un gruppo. | Una volta per gruppo. | media | `04-banco-di-prova.md` (punto zero, D02 Dati). |
| P4-14 | `01-piano` §1 contro `importa/citazioni.json` della seconda prova | Il piano dice che Moricca arriva «solo» da `correzioni-citazioni.json`, ma `citazioni.json` della seconda ha già Moricca, e `correzioni` dice «già corretta». Risultato giusto, testo sbagliato. | Nessuna modifica. | bassa | `01-piano.md` §1. |
| P4-15 | `07-correzioni-citazioni` contro `01-piano` | 07 conta 9 rese di Claude, Schopenhauer compreso; il piano e il file ne contano 8. | Seguo il file. | bassa | `07-correzioni-citazioni.md`. |
| P4-16 | `02-modello` §14.1; `01-piano` blocco 2 | "R14" (§14.1, «nomina rust-cohle») è un id della prima prova a freddo, e si confonde con la prova R14 del banco. | — | bassa | Scrivere "prova a freddo R14". |
| P4-17 | `02-modello` §14.1 | U20 ha anche `nomina true-detective-s1` (§14.1 lo dà solo a U19). U1 ha 13 temi contro le «10 emozioni» di R11. U23 ha `vissuto: "2026-10-04"`, mentre `parole.md` mostra `≤`. | Lasciato. | bassa | `02-modello-v3.md` §14.1. |
| P4-18 | `02-modello` §14, R4 | Per arrivare a 26 `converge-con` serve la convergenza "riserva", fuori da C1–C25; non è detto. Il formato del passo di s04 (`tensioni:15`) non è fissato. | Come la tabella. | bassa | §14 / §14.1. |
| P4-19 | `04-banco` §5 contro `01-piano` blocco 5 | Il piano dice «per primi B01, B02, B06, D02, poi B03…»; il banco dice «in ordine di data» su un ramo solo, e B03 (9/11) viene prima di B06 (20/11). | Ordine di data. | bassa | `01-piano.md` blocco 5: «per primi» = priorità della porta, non ordine. |
| P4-20 | `03-prompt-v3` CLAUDE.md | «Si lavora su `main`», ma il banco gira su `banco/*`: ogni sessione lo segnala. | Il ramo lo dà il coordinatore. | bassa | CLAUDE.md: «su `main`, salvo il banco». |
| P4-21 | `02-modello` §3.6 e §3.7 | `genere` `persone` o `persona`? §3.7 «nessun ID esterno in qualunque file»: anche nel corpo della lettura? "All'ingresso" non è definito in modo meccanico. Come si riconosce `main` con HEAD staccato? | Interpretazioni di `verifica.mjs`. | bassa | §3.6, §3.7, `01-piano.md` §4. |
| P4-22 | `01-piano` §4 ("File, Indice"), blocco 1 (`esegui` ~120 righe) | Vocabolario vecchio: il banco dice "Mappa". La stima di `esegui.mjs` è 120 righe, il codice ne ha 666. | — | bassa | `01-piano.md`. |
| P4-23 | `01-piano` blocco 4 contro codice riusato | Il piano dice che il lucchetto «non c'è ancora», ma il codice della terza lo porta già. | L'ho trattato come assente. | bassa | `01-piano.md` blocco 4. |
| P4-24 | `01-piano` blocco 5 contro `02-modello` §8.2 | «Ferme da prima delle 04:00 di oggi» contro «il primo smista dopo le 04:00 del giorno dopo». L'autore del link: `og:description` (§7.2) o «dalla pagina»? | Le ultime 04:00 passate; l'autore dalla pagina. | bassa | `01-piano.md` blocco 5. |
| P4-25 | `01-piano` e `02-modello`, link in `../v2/` | Rimandi a `prompt-operativi.md`, `critica-semplicita.md`, `attriti-*` in `progetto/v2/`, che il prompt di avvio non fa leggere. Non mi sono serviti; non li ho aperti. | Non letti. | bassa | Togliere o marcare "storia". |
| P4-26 | `03-prompt-v3` specchio (subagent) | Una sessione Specchio lanciata come subagent non ha lo strumento Agent; nel giro 4 ha usato `claude -p`. Nell'uso vero Specchio è una sessione Code e l'ha. | — | bassa | Nessuna, o dirlo nel piano per le prove. |

Altri punti, di codice e non del pacchetto:
- `promptGiudice` di `esegui.mjs` non mostra al giudice i frammenti della Preparazione (u19 in R14). Il banco §5 dice che li vede.
- Un subagent ha usato `git stash` su un clone condiviso. Non ci sono stati danni, ma per un lavoro in parallelo serve un clone per subagent.

## Correzioni proposte, per file

- **`04-banco-di-prova.md`**
  - **R14 (P4-1, alta):** togliere il "ponte atteso" come uscita che passa, oppure riformularlo; D0 come condizione.
  - **D02 (P4-2, alta):** nella domanda 1 del giudice, escludere la riga ✧.
  - **D02, Forma** (data in testa al gruppo, P4-4) e **punto zero/Dati** (nota per gruppo, P4-13).
- **`03-prompt-v3.md`**
  - **`specchio.md`:** definizione di "forte", prova del ponte fatta da subagent separati, via «(Rust per Galimberti)» (P4-1).
  - **`CLAUDE.md`:** corsivo su una riga (P4-3); data in testa al gruppo (P4-4); `reazione`, l'iperbole è `+` (P4-5); «su `main` salvo il banco» (P4-20).
  - **`formato-piano.md`:** esempio di B01 completo (P4-6); `nodo` slug o `@Nome` (P4-12).
  - Le stesse correzioni nella `radice/` del pacchetto (`aggiorna.sh`). Il diff applicato è in `progetto/prova-a-freddo-4/codice/radice-rispetto-al-pacchetto.diff`.
- **`02-modello-v3.md`**
  - **§7.5:** "Rust deve poter essere tra i vicini", non "deve rispondere" (P4-1).
  - **§3.3:** `reazione` ± contro + (P4-5).
  - **§14.1:** id "R14", U20, U1, U23 (P4-16, P4-17); **§14:** convergenza "riserva" (P4-18); **§3.6 e §3.7:** P4-21.
- **`01-piano.md`**
  - **Introduzione:** difetti del codice della terza non elencati (P4-7), oppure indicare la quarta prova come punto di partenza (il suo `importa/` contiene tabella e citazioni già riviste).
  - **Blocco 2:** «la `fonte` della lettura cita tutti i file» (P4-8).
  - **Blocco 4:** lucchetto (P4-23).
  - **Blocco 5:** titolo in `nota` (P4-9), ordine (P4-19), 04:00 (P4-24).
  - **Blocco 6:** esiti e file da correggere (P4-1, P4-11).
  - **§4:** costo e definizione delle prove da rifare (P4-10); "Mappa" (P4-22).
  - **§1:** Moricca (P4-14).
- **`07-correzioni-citazioni.md`:** 8 rese, non 9 (P4-15).
