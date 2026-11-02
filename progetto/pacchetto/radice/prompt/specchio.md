# Specchio

Leggi CLAUDE.md e prompt/formato-piano.md.

## All'apertura
1. `git pull`. Se `ingresso/` ha memo e il lucchetto è libero, fai il lavoro di prompt/smista.md (passi 1–6, con
   `--ciclo specchio`, senza l'attesa dei 90 secondi e senza uscire per un memo più recente). Se il lucchetto è
   occupato, dillo e salta.
2. I **ponti della giornata**: per ogni memo al più **3 righe** e al più un ponte, solo se forte e con un luogo preciso
   (la mia frase vecchia alla lettera e la data; per un ○ l'opera e il passo). Formato `HH:MM · **Salvato.** …`.
   Altrimenti "Nessun ponte oggi." Non inventare. I vicini di un memo vengono dal suo pacchetto o, se il memo è già
   smistato, da `node scripts/smista.mjs vicini ID` (sola lettura, senza lucchetto): non sceglierli tu.
3. **Giorni 1–7**: anche se i memo sono già smistati, non rispondere "nessun memo nuovo": rileggi i memo dal giorno 1 e
   cerca il ponte, con `smista.mjs vicini ID` per ciascuno (nei primi 3 giorni i vicini sono anche tutti gli importati
   ✦). Gli `altrui` sono vicini come gli altri: un
   testo che ho trascritto (il monologo di Rust) fa da ponte con il mio gesto ✦ e le sue parole ○ (CLAUDE.md, regola 7);
   non scartarli perché le parole non sono mie.
   **Al giorno 3, il bilancio dei ponti**: rileggi tutti i memo dei giorni 1–3 e chiudi con il ponte più forte, oppure
   con "Niente si aggancia ancora." Il bilancio sta in **al più 3 righe**, senza "?": la frase del memo nuovo **alla
   lettera**, in corsivo, con la sua data ✦; il testo vecchio **alla lettera** con la sua data (una mia frase in corsivo
   ✦, gli importati con la data-tetto; per un `altrui` il gesto ✦ e le parole tra «» ○ alla lettera nella lingua in cui
   le ho trascritte, con l'opera e il passo); il
   perché ◌, breve. Nella restituzione della sessione il ponte è **un** legame `converge-con` `voce: proposta` con `tra`
   i due frammenti e il `perche`; al più uno. Se nessun ponte è forte: "Niente si aggancia ancora." e nient'altro, una
   sola formula (non anche "Nessun ponte oggi.").

## Poi conversa
4. Rispondi con le ricette di CLAUDE.md. Usa `contesto/`; per il resto cerca nei file, **espandendo sempre la domanda**
   (6–10 parole, anche quelle di 3 lettere) e dicendo che la risposta viene da una ricerca. **I numeri vengono da
   `mappa.md`: non contare tu.** Le verifiche del mondo sul testo primario.
5. Mentre conversi tieni a mano due file in `ingresso/`, senza lucchetto (sono l'unico posto mutabile):
   - `ingresso/ID.md`: il frammento di chat (id del mio primo turno, `canale: chat`, `registrato` del primo turno);
     ogni mio turno **parola per parola**, preceduto da `[HH:MM]`; nessuna tua parola. Se trovi la tua chat già
     sigillata, aprine una nuova con `continua: ID-VECCHIO`, senza toccare il vecchio;
   - `ingresso/ID.risposte.md`: le tue risposte, **una sezione per domanda** (`### 21:04 · canzoni sulla solitudine`),
     con le voci numerate e il `turno`.
6. Alla fine (quando dico "chiudi" o che ho finito): `node scripts/lucchetto.mjs prendi --ciclo specchio`,
   `node scripts/smista.mjs prepara --sigilla ID` (sigilla il frammento di chat e consuma la bozza `ID.risposte.md`, che
   arriva nel pacchetto: non spostarla a mano), poi **un** piano `ciclo: specchio` con la lettura del
   frammento (i `ritorna-su` con `turno` e `n`: "salvami la terza", "no la seconda") e **una** `restituzione`
   `forma: risposta` per la conversazione (il testo delle sezioni, voci con `turno`), `applica.mjs`, `contesto.mjs`,
   `verifica.mjs`, `lascia`, commit `specchio: N memo, 1 conversazione`, push.
   Se la sessione muore prima, il primo "smista" dopo le 04:00 del giorno dopo sigilla dalla bozza.

## Il primo giorno
Se te lo chiedo, il primo ritratto con prompt/ritratto.md, variante giorno 1.

## Limiti
≤ 150k token, ≤ 40 file per sessione. Mai letture, nodi o restituzioni a mano. Mai una ricerca su una persona della mia vita.
