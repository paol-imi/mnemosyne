# Coordinamento (stato del lavoro)

Stato aggiornato al 2026-10-31 dal coordinatore (session_01WgHifzjvpDEAT85Q78BpuF), per riprendere il lavoro dopo una compattazione.
Branch di raccolta: `claude/quirky-newton-qe5g9o`. Ogni sessione lavora su un branch suo; il coordinatore lo unisce qui (conflitti solo su `_progetto/README.md`: si risolvono tenendo entrambe le righe).

## Richiesta dell'utente
- Un sistema che "mappi tutto quello che mi passa per la mente, come un memo, con la meraviglia dell'AI e del mappare una coscienza" (esempio Galimberti; domande come "canzoni con questo tema", "top quote di Dostoevskij").
- Il coordinatore coordina e basta: lancia sessioni e subagent con compiti piccoli e chiusi, e tiene pulito il proprio contesto.
- Dopo il primo giro, troppo veloce, l'utente ha chiesto un raffinamento profondo ("sangue sudore lacrime... lavorare sugli esempi, non farmi perdere tempo").
- L'implementazione la farà un'altra chat su un ALTRO account GitHub. Il prompt finale deve essere autosufficiente: dentro ci va tutto il necessario, senza dipendere da questo repo.
- Il nome del nuovo repo privato è ancora da scegliere e non blocca il lavoro.
- Lancia in parallelo tutto quello che serve.

## Giri completati
1. Primo giro (superato): `_progetto/proposta.md` + schema, domande, acquisizione, migrazione; `avvio.md` è il prompt vecchio, da sostituire.
2. Ricerca v2, in `_progetto/v2/`: essenza, esempi-ingresso (68), esempi-domande (108), cervello, stato-arte, archivio-reale, restituzione (prove vere, mandata all'utente), telefono, eredita, citazioni, identita.
3. Modello v2: `_progetto/v2/modello.md` + `banco-di-prova.md` (25 messaggi + 25 domande).

## Completati
- Giro 3: critiche (tempo, semplicità), simulazioni (importazione, ingresso, domande), banco-di-prova-v2.md, voce.md, prompt-operativi.md.
- Giro 4: piano.md (13 blocchi, passi manuali U1–U9), prova-tempo (4/10 passano), prova-restituzione (7/14 alla lettera, 12/14 con le soglie corrette), correzioni-citazioni.md (24 citazioni corrette SULL'ATLANTE, ma solo su questo branch: per l'import vanno unite a main, su decisione dell'utente), prompt-v3.md (prompt allineati, con 15 incoerenze del v3 segnalate).

## Checkpoint del 2026-11-01: il lavoro passa a un altro account
Le sessioni di questo account hanno raggiunto il limite delle 5 ore e sono ferme. Il lavoro continua in una chat su un
altro account con il prompt in [handoff](/progetto/handoff.md), che riprende tutto ciò che segue.

Stato del giro 6 (correzioni dopo la prova a freddo):
- Modello: fatto (commit "Modello v3: correzioni dalla prova a freddo"). Da verificare le ultime decisioni: `parole`
  sempre lista; Chiedi con intento predefinito; temi nominati ✦ subito e dedotti ◌ alla 2a–3a ricorrenza; rimandi
  alle appendici A/B di prompt-v3.
- Prompt: fatto (prova a freddo, ricordo n. 76, memo n. 77).
- Banco: da fare (riscriverlo nel vocabolario v3).
- Piano: da fare (contesto.mjs e setup.sh anticipati, esito all'ingresso, misure reali, prototipo non normativo).
- Poi: rigenerare il pacchetto, seconda prova a freddo, implementazione.

## Giro 6 sul repo nuovo (dal 2026-11-01)
Coordinatore: session_016XqAM2avfjohJSKH8PQkwq (account claude.ai collegato a GitHub `paol-imi`). Da qui il repo nuovo
(privato, `paol-imi/mnemosyne`: il nome l'ha scelto l'utente, vedi `nome.md`) è la fonte di verità; `progetto/` = copia di `_progetto/` da
tattoo-shit `claude/quirky-newton-qe5g9o` @ 3a7ea79. Finché il repo non esiste, il lavoro sta in un clone locale
(branch `raccolta`) e lo fanno subagent; le sessioni cloud partono quando il repo esiste.

Stato:
- A. Modello: fatto. `intento` lista con predefinito `[chiedi]`; temi ✦ subito (smista), ◌ alla 2ª–3ª ricorrenza
  (consolida); prefisso per il memo successivo (c'era); appendici A/B; esito all'ingresso con una regola unica;
  verifica rapida prima di `applica`; raccolta con un frammento precedente.
- B. Banco: fatto, riscritto nel v3 (1570 righe, grep dei termini v2 a zero), registro chiuso lato banco.
- C. Piano: fatto. `setup.sh` al blocco 0, `contesto.mjs` in parte al blocco 2, §14 al posto di 05, misure reali,
  prototipo non normativo.
- D. Prompt: fatto (esito, `intento`, temi, §9.1, `setup.sh`, appendici A/B; la Routine "smista" è una riga sola e
  le due regole del fire stanno in `prompt/smista.md`).
- E. Pacchetto: rigenerato con `bash progetto/pacchetto/aggiorna.sh`; link interni relativi (0 rotti), le note
  dell'Atlante come URL al branch del checkpoint; 05 resta come storia, superato dal §14.
- F. Seconda prova a freddo: fatta (session_016XqALybr9EWMWePrP1czPF): blocchi 0–6, fermo alla porta del 6, verdetto
  «va corretto» (11 voci alte, quasi tutte nei prompt; 63 subagent, ~5,7 M token, ~1 h 50). Resoconto in
  `prova-a-freddo-2.md`, codice in `progetto/prova-a-freddo-2/codice/`.
- Giro 7: correzioni dalla seconda prova applicate a prompt, piano, banco e modello (subagent); pacchetto rigenerato.
  Decisioni: il seme ✧ entra in `contesto/` (sezione in fondo a `parole.md`), quindi D02 si fa anche nel Progetto;
  `_schema.md` alla radice dal blocco 0 (versione, rimando a `schema/frontmatter.json`, migrazioni); `contesto.mjs`
  in tre tappe (blocchi 2, 5, 7); `smista.mjs vicini ID` e `prepara --sigilla ID` al blocco 5; un frammento `altrui`
  può essere il capo vecchio di un ponte (§7.5), il che rende possibile il ponte Galimberti–Rust di R14; i delicati,
  a una richiesta esplicita delle mie parole, si riportano alla lettera e mai in testa (§7.2.1 Q10); la citazione
  all'ingresso ammette `alias`.
- F3. Terza prova a freddo: fatta (session_016XqALyBdruYiG9ctJjfGpt): blocchi 0–6, R14 passa, verdetto «va corretto»
  (4 alte, nessuna bloccante; 51 subagent, ~4,5 M token). Resoconto `prova-a-freddo-3.md`.
- Giro 8: correzioni applicate. Decisioni: il seme ✧ va in corsivo come ogni frase alla lettera, esce dai vicini
  (§6.2) e non è mai capo vecchio di un ponte (§7.5): valgono solo le frasi sue ✦ o un `altrui`; la nota «trascritta
  da Claude» compare una volta, in testa al gruppo; la domanda 2 del giudice di R14 riscritta; §14 R7: la traduzione
  (col traduttore o «resa di Claude») va nel riferimento e nel corpo (8 citazioni su 17 la perdevano).
- F4. Quarta prova a freddo: fatta (session_016XqAM3XusSJqhWWU6FVzZg): blocchi 0–5 con porte aperte, R14 fallisce
  5/5 (2 alte). Resoconto `prova-a-freddo-4.md`.
- Giro 9. Decisione di prodotto: nessun documento prescrive un ponte particolare (via il «ponte atteso»
  Galimberti–Rust). R14 passa con un ponte forte (definito una volta nel banco: sì alla domanda 2, no alla 3) oppure
  con la sola riga «Niente si aggancia ancora.». La porta vera del blocco 6 è la domanda a pancia sui memo veri.
  D02: la domanda 1 del giudice esclude la riga ✧. Aperta, bassa: P4-15 (9 o 8 rese di Claude in 07, vale il file).
- F5. Quinta prova a freddo: fatta (session_016XqALyzWuXrKDX9JMULbM4): blocchi 0–6, 14/14 prove, 1 voce alta (P5-1,
  data sui capi del ritratto del giorno 1). R14 passata 2 a 1 per una causa nel pacchetto (un «sì con riserve»).
- Giro 10: P5-1…P5-25 chiuse (aperta, bassa, una parte di P5-19 sul §14). «Forte» anche in `CLAUDE.md`; in Specchio
  un «sì con riserve» conta come no e il perché ◌ non aggiunge ciò che le due frasi non dicono.
- F6. Sesta prova a freddo: fatta (session_016XqAM1948dqULYKHpKdKWM): blocchi 0–6, 14/14, R14 nel caso (b); una voce
  alta (P6-1), del banco e non del sistema: un controllo troppo stretto su un'uscita giusta.
- Giro 11: P6-1…P6-19 chiuse (aperte, basse, P6-7 e P6-16 sul modello). Sei regole portate dal checker al banco.
  Verifica mirata del checker corretto: uscite giuste accettate 4/4, varianti sbagliate rifiutate 20/20; correzioni
  applicate anche al codice della sesta. **Verdetto del coordinatore: il pacchetto è pronto** (nessuna voce alta
  aperta). Prossimo: G, implementazione vera con `progetto/pacchetto/prompt-avvio.md` fino alla porta del blocco 6.
- Nome: Mnemosyne (sessione session_016XqALzZG9b2QGQbSqhNrc7, documento `nome.md`).
- G. Implementazione: dopo F.

Decisioni del coordinatore (giro 6):
- R70: se un blocco elenca le B/D per nome, la sua porta resta chiusa su ogni fallimento di quelle prove; le prove
  non elencate restano sulle soglie del blocco (e sulla regola dei 3 medi). La gravità di un fallimento è quella che
  il banco assegna al caso.
- Esito all'ingresso: solo `nome`, `attribuita-a`, `nato-da`, senza `esito` (⚠); esito, riferimento, autore e
  originale li scrive solo "consolida". Eccezione: le citazioni dell'Atlante accolte all'importazione (§14 R7).
- La verifica rapida avviene prima di `applica` (§7.2 passo 4; §13.2 allineato).
- §9.1: niente domande nelle risposte fuori da ingresso, confronto e ritratto; tolte dalle schede D del banco.
- Raccolta con un frammento precedente: il memo nuovo ha `serve-a` verso la raccolta e `ritorna-su` verso il
  frammento vecchio, che non si tocca.
- Il banco segue il §3.4: B12 fa nascere `persone/cugina.md`; in B21 la citazione non nasce all'ingresso.
- Routine "smista": nessun `prompt/routine-smista.md`; la Routine dice solo «leggi ed esegui `prompt/smista.md`».
- Lo `scopo` mancante di una raccolta lo segnala `mappa.md` e nessuna risposta lo chiede. La raccolta con un frammento
  precedente usa `ritorna-su` con `come: aggiunge`.
- Misure della prova: meno di un'ora di orologio (la tabella somma 53 min).
- Da verificare al passo U2: che la rete *Trusted* lasci passare `registry.npmjs.org` per `npm ci` in `setup.sh`.

## Diagnosi chiave da non perdere
- Nell'Atlante l'utente ha scritto ~8 note su ~320, ha preso 0 decisioni su ~130 proposte, ha dato 0 risposte "a pancia", poi 23 giorni di silenzio.
- Da qui il principio "cattura cieca, struttura derivata": niente coda di validazione, la validazione avviene con l'uso, e la meraviglia sta nella restituzione.
- Provenienza non negoziabile; citazioni con protocollo rigoroso (0/12 giuste alla lettera); ID esterni solo nel consolidamento, mai in automatico.
- Telefono: Comando rapido → `ingresso/` → Routine "smista" → push su main → `contesto/` → Progetto claude.ai per le domande; MCP nella tappa 2.

## Restano all'utente
- Il nome del repo.
- Quanto parla per primo il sistema (racc.: lettera domenicale + ritratto trimestrale).
- Il sogno (racc.: max 1 al mese).
- Il giudizio a pancia su `restituzione.md` (chiesto, ancora senza risposta).
- Fuori ambito, da proporre: correggere le citazioni sbagliate dell'Atlante (vedi citazioni.md, simulazione/attriti-importazione.md A8).
