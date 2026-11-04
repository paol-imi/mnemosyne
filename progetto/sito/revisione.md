---
tipo: progetto-sito
origine: claude
validata: false
data: 2026-11-04
---

# La revisione avversaria del sito

Letti `CLAUDE.md`, `progetto.md`, `dimensioni.md`, `tecnica.md`, `vista-tatuaggi.md` e il prototipo (dati sintetici:
si giudica il comportamento). Ogni rilievo dice la vista, che cosa appare e la regola. Corretti solo i rilievi certi e
locali, sul ramo `claude/sito-revisione`; gli altri chiedono una scelta.

## Corretti (13)

1. **Ritorno lento con una frase non ricordabile** · prototipo `#/ritorno` mostrava il 21 settembre (43 giorni) · ricordabili solo oltre 60 giorni di calendario o importati (`prompt/ti-ricordi.md` righe 4–6; `CLAUDE.md` riga 104) → ora un importato, con la nota.
2. **○ senza luogo** · prototipo, tavola di attenzione, zoom su Weil: «la lettera del 1 novembre, voce 2 ○» · ogni ○ con opera e passo (`CLAUDE.md` riga 184) → il luogo accanto.
3. **Frase ricopiata** · prototipo `#/assenze`: «la voglio rileggere» scritta a mano · le parole lette dal frammento (`CLAUDE.md` riga 99, `progetto.md` principio 3) → trasclusa.
4. **Conto del mese che non è quello di `mappa.md`** · `#/tempo` «9 parlanti e 1 delicato»: `mappa.md` mette i delicati dentro i parlanti (`contesto.mjs` riga 379) · regola 2 (`CLAUDE.md` riga 104) → «10 frammenti parlanti, di cui 1 delicato», nel prototipo e in §3.6.
5. **Testo altrui come frase tua** · `frase()` del prototipo e ogni lista (Esplora con il gesto «trascrivo», nodo, tempo, tatuaggi, ritorno) avrebbe reso un `altrui` in corsivo ✦ · regola 7 (`CLAUDE.md` riga 121) → `altrui()` nel prototipo e un capoverso in `progetto.md` §1.
6. **○ senza luogo sul frammento altrui** · §3.3 «le parole d'altri … ○» anche senza fonte (una foto: caso 5) · `CLAUDE.md` riga 184 → ○ solo con `fonte`, se no ⚠.
7. **Nota e data-tetto di un gruppo di importati** · prototipo: la data del primo valeva per tutti · regola 6 (`CLAUDE.md` righe 109–120: la data in testa solo se comune) → `gruppoOrig()`.
8. **Il conto «e 1 delicato» sul nodo** · §3.4 lo metteva in fondo alla pagina di un tema o di una persona: dice di che cosa parla il delicato, e `mappa.md` non lo conta per tema · `CLAUDE.md` righe 206–208 («si contano, non si nominano») e riga 104 → tolto; i delicati si contano solo nel tempo; `tecnica.md` §5.2 allineata.
9. **Coda lunga nel periodo delicato** · §3.7 la teneva, `tecnica.md` §5.1 la toglie · coerenza, e `CLAUDE.md` riga 205 → tolta in §3.7.
10. **`delicati.bin` in precache** · `tecnica.md` §4.4 metteva in cache «i blob», §5.2 lo vuole scaricato solo dopo il gesto · coerenza → solo `archivio.bin` in cache.
11. **Gli ospiti e i nomi nel testo** · `tecnica.md` §5.2.4 toglieva i nodi `vita` ma non i frammenti che li nominano («luca dice che…») · «le persone `cerchia: vita` non escono mai» (vincolo H, `CLAUDE.md` riga 211) → lo stesso filtro della stampa.
12. **Log di Actions in chiaro** · i controlli del build avrebbero stampato testo o nomi nell'errore · `CLAUDE.md` riga 214 (per analogia con i commit) → «la regola e l'id, mai il testo».
13. **Incoerenze tra documenti** · porta del periodo delicato «i nomi» contro «esplora» (§3.1); rimando §3.6 per il delicato (era §3.7/§3.8); `porte()` «le 3–5 più forti» contro «la prima e l'ultima» (§7.1 e `tecnica.md` §2.1); «il ◌ dei margini» rimasto in §7.1 e §7.2.3 contro §3.11; `campo` «sui temi» in dimensioni §0 (solo correnti); specie senza ◌ nella tabella di dimensioni §1.4; l'indirizzo senza prefissi in dimensioni §2.13; `vista-tatuaggi.md` con il ◌ ai margini e i fili ○ (ora una nota in testa).

## Aperti, con l'opzione più semplice (4)

- **A1 · I gesti non producono atti, oggi** (il più grave) · «sì alla 2 → r-…#2» su una lettera di 10 giorni fa: `prompt/smista.md` riga 31 cerca solo nei 3 giorni e in `recenti.md`, quindi nessun `ritorna-su`, e «Me la riscrivi?» (`CLAUDE.md` riga 193). Lo stesso per «correggi l'attribuzione» e «tra i tatuaggi». §5 ora lo dice. **Raccomandato:** una riga nei Confini di `CLAUDE.md` e in `smista.md` riga 31: «un bersaglio esplicito (`→ id`, `→ r-…#n`) vale senza la finestra dei 3 giorni»; niente campo `da-sito`.
- **A2 · brano → canzone, rigiudicato: non chiuso** · `test/applica.test.mjs` riga 202 usa `cosa: 'brano'` e si aspetta zero errori (ora elencato in dimensioni §3.2); e un memo del Progetto scritto prima del cambio va ripetuto come prefisso dai memo successivi della stessa chat (`prompt/progetto.md` riga 66): dopo il cambio, rifiutato per sempre; così pure una copia vecchia delle istruzioni nel Progetto di claude.ai. Esplora non ne ha bisogno: l'asse Cose legge `opere.tipo`, non `voci[].cosa`. **Raccomandato:** non rinominare `voci[].cosa`; «canzone» solo come `tipo` e come parola in pagina.
- **A3 · Un nodo nato solo da un delicato non ripreso** (una persona `vita` nominata solo in un lutto) sta in `archivio.bin` con nome e `nato-da`, e la parola lo trova tra i nomi · `CLAUDE.md` righe 203–206 · **Raccomandato:** in `delicati.bin` finché il delicato non è ripreso.
- **A4 · Le dimensioni di `delicati.bin` dicono quando nasce un delicato** a chi vede l'host (Cloudflare, o un hostname scoperto) · **Raccomandato:** riempirlo fino a una misura fissa (64 KB, poi a gradini).

## Scartati (8)

- I font da Google nel prototipo: dati sintetici, nessun contenuto nella richiesta; il sito vero è self-hosted (§4.1, dubbio 7).
- Il `tipo` senza segno: è un'etichetta, non una frase, e ha sempre una fonte; i segni stanno sulle frasi (dimensioni §1.2).
- La legenda nella tavola dei tatuaggi: la regola delle forme lunghe vale per le prose; la stampa la richiede per il tatuatore.
- L'intervallo «15 giorni»: un conto di calendario dello script, non «a occhio» (regola 2); resta il dubbio 4.
- I numeri di Esplora senza delicati: non sono i conti di `mappa.md`; contarli li legherebbe a un valore.
- «Accesso scaduto. Rientra»: una riga di servizio sul login, non un sollecito a scrivere.
- L'assenza «mare» senza 30 giorni attivi: i dati sintetici coprono 44 giorni; la regola è scritta in §3.9.
- Le persone `vita` trovate dalla parola: voluto (le nomini tu, dimensioni §1.3), mai tra i valori né nei ponti.
