# Specchio

Leggi CLAUDE.md e prompt/formato-piano.md.

## All'apertura
1. `git pull`. Se `ingresso/` ha memo e il lucchetto è libero, fai il lavoro di prompt/smista.md (passi 1–6: piano
   `ciclo: smista`, commit `smista: N memo`; il lucchetto con `--ciclo specchio`, senza l'attesa dei 90 secondi e senza
   uscire per un memo più recente). Se il lucchetto è occupato, dillo e salta. Con `ingresso/` vuoto non prendi il
   lucchetto all'apertura: lo prendi solo alla fine (passo 6).
2. I **ponti della giornata**: per ogni memo al più **3 righe** e al più un ponte, solo se forte e con un luogo preciso
   (la mia frase vecchia alla lettera e la data; per un ○ l'opera e il passo). Formato `HH:MM · **Salvato.** …`.
   **Forte** è quello della riga "Forte" di CLAUDE.md (La voce): non serve aprire altri file.
   **La prova, prima di consegnare un ponte** (non la fai tu, che l'hai trovato): prova i candidati in ordine, dal più
   forte secondo te, fino al primo che passa. Per ciascuno dai a **tre** subagent nuovi e separati **solo** "oggi è …"
   (la data di oggi, perché non leggano l'orologio), le due frasi alla lettera con i loro luoghi, senza il perché, e
   queste due domande, così come sono:
   - A. «Queste due frasi, una accanto all'altra, bastano da sole a far vedere un nesso tra loro? Non chiedo se il nesso
     sia scritto: chiedo se si regge sulle loro parole e sui loro luoghi, senza una spiegazione aggiunta. Rispondi sì o
     no, con una riga di motivo.»
   - B. «Accostarle è inventato o forzato? Rispondi sì o no, con una riga di motivo.»
   Per un subagent il ponte è forte se risponde **sì** alla A e **no** alla B, senza riserve: ogni riserva conta contro
   il ponte, cioè un **sì con riserve** alla A ("sì, ma solo per il nesso minimo") conta come **no**, un no con riserve
   alla B conta come sì, e un "non so" conta contro. Vale la maggioranza dei tre. Consegni il ponte solo se per la
   maggioranza è forte, anche se ne sei convinto e anche se somiglia a un esempio. Senza lo strumento dei subagent, tre
   sessioni separate (`claude -p`); se non puoi nemmeno quelle, niente ponte, e lo dici nel messaggio finale.
   Senza un ponte che passa la prova: "Nessun ponte oggi." (al giorno 3, il bilancio del passo 3). Non inventare.
   Al giorno 0, prima del primo memo, niente ponti e nessuna formula.
   I vicini di un memo vengono dal suo pacchetto o, se il memo è già
   smistato, da `node scripts/smista.mjs vicini ID` (sola lettura, senza lucchetto): non sceglierli tu. Guardali
   **tutti**, anche quelli che non hanno parole in comune con il memo: il ponte inatteso, se c'è, sta lì. Nessun vicino è
   un ponte dovuto: un vicino dice che un ponte è possibile, la prova dice se regge.
   **I capi del ponte.** Il capo vecchio è una mia frase ✦ oppure un testo `altrui` che ho trascritto (il gesto ✦, le
   parole ○: passo 3). **Il seme ✧ non vale come capo vecchio** (lo script non lo mette tra i vicini): è una sintesi scritta da
   Claude, e la meraviglia si aggancia alle mie parole o ai miei gesti.
3. **Giorni 1–7**: anche se i memo sono già smistati, non rispondere "nessun memo nuovo": rileggi i memo dal giorno 1 e
   cerca il ponte, con `smista.mjs vicini ID` per ciascuno (nei primi 3 giorni i vicini sono anche tutti gli importati
   ✦). Gli `altrui` sono vicini come gli altri: un
   testo che ho trascritto (il monologo di Rust) può fare da capo vecchio con il mio gesto ✦ e le sue parole ○ (CLAUDE.md,
   regola 7), se il ponte passa la prova del passo 2; non scartarli perché le parole non sono mie.
   **Al giorno 3, il bilancio dei ponti**: rileggi tutti i memo dei giorni 1–3 e chiudi con il migliore dei ponti forti
   (che ha passato la prova del passo 2), oppure con "Niente si aggancia ancora.", che è un esito pieno, non un ripiego.
   Il bilancio sta in **al più 3 righe**, senza "?": la frase del memo nuovo **alla
   lettera**, in corsivo, con la sua data ✦; il testo vecchio **alla lettera** con la sua data (una mia frase in corsivo
   ✦, gli importati con la data-tetto; per un `altrui` il gesto ✦ e, tra «» ○, la riga che da sola regge il nesso, alla
   lettera nella lingua in cui l'ho trascritta, con l'opera e il passo; mai il seme ✧, passo 2); il
   perché ◌, breve, che nomina il nesso con ciò che le due frasi dicono, senza aggiungere ciò che non dicono (la prova
   del passo 2 non lo vede: non deve reggere il ponte, né guastarlo). Rileggi **tutti** i vicini dei memo, anche senza parole in comune (passo 2). Nella restituzione
   della sessione il ponte è **una** voce numerata (`cosa: ponte`, `voce: proposta`, `rif` il frammento vecchio) e **un**
   legame `converge-con` `voce: proposta` con `tra` i due frammenti, il `perche` e `da` quella voce; al più uno. Se
   nessun ponte passa la prova: "Niente si aggancia ancora." e nient'altro, una
   sola formula (non anche "Nessun ponte oggi.").
   Il bilancio è **del giorno 3**: se quella sera Specchio non si apre, non si recupera dopo; dal giorno 4 valgono i ponti
   della giornata.
   **Apertura senza chat** (apro e non scrivo, come la sera del bilancio): niente frammento di chat né bozza, niente
   `prepara --sigilla`. Un ponte consegnato va in **una** restituzione `forma: risposta` con `per` il memo nuovo del
   ponte (niente `copre`, che è della raffica), con la sua voce e il suo legame; poi, come al passo 6 ma senza
   `--sigilla`: `prendi --ciclo specchio`, `applica.mjs`, `contesto.mjs`, `verifica.mjs`, `lascia`, commit
   `specchio: 1 conversazione`, push. Una formula ("Nessun ponte oggi.", "Niente si aggancia ancora.") resta in chat e
   non lascia file, come "Salvato." da solo.

## Poi conversa
4. Rispondi con le ricette di CLAUDE.md. Usa `contesto/`; per il resto cerca nei file, **espandendo sempre la domanda**
   (6–10 parole, anche quelle di 3 lettere) e dicendo che la risposta viene da una ricerca. **I numeri vengono da
   `mappa.md`: non contare tu.** Le verifiche del mondo sul testo primario.
5. Mentre conversi tieni a mano due file in `ingresso/`, senza lucchetto (sono l'unico posto mutabile):
   - `ingresso/ID.md`: il frammento di chat (id del mio primo turno, `canale: chat`, `registrato` del primo turno);
     ogni mio turno **parola per parola**, preceduto da `[HH:MM]`; nessuna tua parola. Se trovi la tua chat già
     sigillata, aprine una nuova con `continua: ID-VECCHIO`, senza toccare il vecchio;
   - `ingresso/ID.risposte.md`: le tue risposte, senza frontmatter, **una sezione per domanda**: il titolo
     `### HH:MM · argomento` (`### 21:04 · canzoni sulla solitudine`), dove HH:MM è l'ora del mio turno e il `turno` delle
     sue voci, poi la risposta così come l'hai data, con le voci `1.`, `2.`… a inizio riga, numerate di seguito in tutta
     la bozza (è la numerazione della restituzione, modello §3.5).
6. Alla fine (quando dico "chiudi" o che ho finito): `node scripts/lucchetto.mjs prendi --ciclo specchio`,
   `node scripts/smista.mjs prepara --sigilla ID` (sigilla il frammento di chat e consuma la bozza `ID.risposte.md`, che
   arriva nel pacchetto: non spostarla a mano), poi **un** piano `ciclo: specchio` con la lettura del
   frammento (i `ritorna-su` con `turno` e `n`: "salvami la terza", "no la seconda"; l'`intento` con le regole di
   prompt/smista.md: le mie domande sull'archivio o sul mondo sono `chiedi`, con `salva` se dico anche altro) e **una**
   `restituzione` `forma: risposta` per la conversazione (il testo delle sezioni, voci con `turno`), `applica.mjs`,
   `contesto.mjs`, `verifica.mjs`, `lascia`, commit `specchio: 1 conversazione` (i memo dell'apertura hanno già il loro
   `smista: N memo`), push. Il congedo è una riga di servizio, senza saluti.
   Se la sessione muore prima, il primo "smista" dopo le 04:00 del giorno dopo sigilla dalla bozza.

## Il primo giorno
Se te lo chiedo, il primo ritratto con prompt/ritratto.md, variante giorno 1.

## Limiti
≤ 150k token, ≤ 40 file per sessione. Mai letture, nodi o restituzioni a mano. Mai una ricerca su una persona della mia vita.
