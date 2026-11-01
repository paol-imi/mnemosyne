# Handoff: proseguire su un altro account

Prompt da incollare in una nuova chat di Claude Code, aperta sull'altro account. È autosufficiente.
Checkpoint del 2026-11-01: branch `claude/quirky-newton-qe5g9o` di `paol-imi/tattoo-shit` (pubblico).

````text
Sei il COORDINATORE di un progetto già molto avanzato. Scrivi in italiano. Con me: risposte brevi, adatte al
telefono, una domanda alla volta, solo quando sei davvero bloccato. Non fai il lavoro grosso da solo: lanci subagent
e, per i blocchi grandi, altre sessioni, ognuna con un compito PICCOLO e CHIUSO (un passo, pochi file, un riassunto
breve al ritorno). Il tuo contesto resta pulito. Lancia in parallelo tutto ciò che è indipendente. Non farmi perdere
tempo: profondità e prove sugli esempi contano più della velocità, ma non chiedermi ciò che puoi decidere tu.

IL PROGETTO. Voglio "un sistema che mappi tutto quello che mi passa per la mente, come un memo, con la meraviglia
dell'AI e del mappare una coscienza". Esempio: dal telefono scrivo "ho visto uno spezzone di Galimberti, dal suo
spettacolo X, diceva '...', molto interessante". Il sistema lo collega a Galimberti, alla citazione e ai temi, e poi
risponde a domande come "canzoni con questo tema", "le migliori citazioni di Dostoevskij". In un giorno di lavoro,
con decine di sessioni, l'abbiamo progettato a fondo: ricerca, modello, simulazioni, critiche, banco di prova,
prompt, piano, una prova "a freddo".

DOVE STA TUTTO. Repo pubblico https://github.com/paol-imi/tattoo-shit, branch `claude/quirky-newton-qe5g9o`,
cartella `_progetto/` (clonalo in lettura: da questo account non puoi scriverci; se il clone è rifiutato, usa
add_repo con accesso in lettura, il repo è pubblico). Leggi, con subagent:
1. `_progetto/v2/coordinamento.md`: lo stato, le decisioni, la diagnosi chiave. Leggilo per primo.
2. `_progetto/pacchetto/LEGGIMI.md`: il pacchetto per l'implementazione (modello v3, piano, banco, prompt, CLAUDE.md
   del nuovo repo in `radice/`, voce, telefono, protocolli). `prompt-avvio.md` è il prompt d'implementazione.
3. `_progetto/v2/prova-a-freddo.md`: una sessione con il solo pacchetto ha costruito i blocchi 0–4 (import 43/43,
   primo ritratto 3/3 giudici) e si è fermata al blocco 5 (B01, B02, B11). Registro di 69 voci. Il codice prototipo
   sta in `_progetto/prova-a-freddo/codice/`.
I documenti di ricerca sono in `_progetto/v2/`: servono solo se ti manca un perché.

DOVE LAVORI. In un repo GitHub PRIVATO nuovo su questo account. Il nome definitivo lo sceglierò io, e intanto ne va
bene uno provvisorio: rinominarlo dopo è gratis. Se il repo non esiste, guidami a crearlo e a dare l'accesso a
Claude. Copia `_progetto/` dentro il repo nuovo come `progetto/`: da lì in poi il repo nuovo è la fonte di verità,
anche per la progettazione. Nel repo nuovo vanno anche i miei pensieri, quindi deve restare privato.

CHE COSA RESTA (giro 6: le correzioni dopo la prova a freddo), in ordine:
A. Modello (`v2/modello-v3.md`). Il commit "Modello v3: correzioni dalla prova a freddo" ha già sistemato: lo schema
   §3.7 (verificato con ajv), §3.5, Chiedi, gli alias per cognome, l'esito all'ingresso, applica.mjs transazionale e
   la riconciliazione degli slug. Verifica che contenga anche queste decisioni, altrimenti applicale: `parole` è
   sempre una lista; "Chiedi" ha un intento facoltativo, con "chiedi" come predefinito; in §8.3 i temi nominati da
   me (✦) nascono subito, quelli dedotti (◌) alla 2a–3a ricorrenza; un memo successivo della stessa chat sostituisce
   il precedente solo se lo contiene come prefisso; i rimandi a "prompt v3 §12/§14" diventano "appendici A/B".
B. Banco (`v2/banco-di-prova-v2.md`): riscriverlo tutto nel vocabolario del v3, conservando gli id; correggere le
   voci del registro della prova a freddo che lo riguardano (B14 e B25 divergono dal v3); alla fine un grep senza
   nessun termine del v2 (indice, vitalità, apocrifa, tramite...). Non è ancora stato fatto.
C. Piano (`v2/piano.md`): anticipare contesto.mjs e setup.sh (i blocchi 4–5 li usano, il piano li metteva al 7);
   l'esito all'ingresso come nel v3 (solo attribuita-a + prova: memoria); 05-regole-importazione superato dal §14 del
   v3; misure reali della prova (~40 min e ~1.400 righe per i blocchi 0–4); il codice prototipo come punto di
   partenza NON normativo. Non è ancora stato fatto.
D. Prompt (`v2/prompt-v3.md`): già corretti con la prova a freddo. Riallineali solo a ciò che cambia in A, B e C.
E. Rigenerare il pacchetto (`pacchetto/aggiorna.sh`: adatta percorsi e link al repo nuovo; i link verso tattoo-shit
   restano URL GitHub al branch del checkpoint).
F. Seconda prova a freddo: una sessione NUOVA che legge SOLO il pacchetto, costruisce in /tmp i blocchi 0–6 e
   registra dove si blocca o deve indovinare. Si corregge e si ripete finché il verdetto è "il pacchetto è pronto".
G. Solo allora parte l'implementazione vera nel repo nuovo, seguendo `pacchetto/prompt-avvio.md`, fino alla porta
   del blocco 6 (la prova della meraviglia).

COME ORGANIZZARE LE SOTTOSESSIONI (metodo collaudato nel lavoro fatto finora):
- Strumenti: create_session per aprire altre sessioni cloud (repo, branch di partenza e branch di uscita propri),
  send_message per parlarsi, ReadNotifications per leggere i loro messaggi. Se mancano, usa subagent (Agent), in
  sequenza e con compiti piccoli.
- Ogni sessione nasce dal branch di raccolta del repo nuovo, lavora su un branch suo (`claude/<giro>-<area>`), scrive UN
  file in `progetto/`, fa commit e push, poi ti manda al massimo 10-15 righe: solo le scoperte che CAMBIANO il
  progetto (non quelle che lo confermano), i numeri e il percorso del file. Tu non leggi i documenti lunghi: unisci i
  branch con git (i conflitti sugli indici si risolvono tenendo entrambe le righe) e lavori sui riassunti.
- Il prompt di ogni sessione è autosufficiente: chi è (figlia del coordinatore, con il tuo session id per
  rispondere), la fase, le MIE PAROLE verbatim, quali file leggere, il compito con l'uscita esatta, e la consegna
  (file, commit, push, controlli, messaggio breve).
- Il ritmo che ha funzionato: ricerca in parallelo → una sessione di sintesi o di modello → simulazioni e critiche
  avversarie in parallelo → correzioni → prova a freddo. Le correzioni vanno a chi ha scritto il documento, con
  send_message (conserva il contesto). Le sessioni nuove servono per gli sguardi indipendenti: i giudici sono sempre
  separati da chi produce, e la prova a freddo legge solo il pacchetto.
- Le divergenze tra sessioni le decidi tu, scegliendo la soluzione più semplice; le comunichi con una riga e le
  scrivi nel registro delle decisioni.
- Dopo ogni giro aggiorna `progetto/v2/coordinamento.md`: sessioni in corso, branch, decisioni, prossimi passi.
  Serve a riprendere dopo una compattazione o un cambio di account.
- Quota: con circa 20 sessioni pesanti in un giorno, l'account precedente ha esaurito il limite delle 5 ore. Tieni
  al massimo 4-6 sessioni attive insieme, e preferisci i subagent per i compiti brevi.

DECISIONI GIÀ PRESE (non riaprirle):
- Cattura cieca, struttura derivata: io non compilo campi e non c'è una coda di validazione.
- La meraviglia sta nella restituzione. La seconda prova ha fatto 10/14 alla lettera, e le correzioni di forma sono
  già applicate.
- La provenienza è non negoziabile: segni ✦✧●◌○⚠, mai un ○ senza opera e passo, citazioni solo con il protocollo.
- Ritratto mensile nei primi 3 mesi, poi trimestrale; sogno al massimo una volta al mese e solo da 50 frammenti.
- Tatuaggi come progetto dentro il sistema; dall'Atlante si importa solo il vivo.
- Un solo account claude.ai (quello del telefono) collegato al GitHub nuovo, con la GitHub App sul repo.
- L'import legge tattoo-shit dal branch del checkpoint, che contiene le citazioni già corrette (24, vedi
  `v2/correzioni-citazioni.md`), non da main.
- Finché l'import non è fatto, tattoo-shit e il branch del checkpoint non si toccano: sono la fonte dell'import.

ANCORA DA ME: il nome del repo; un giudizio a pancia su `v2/restituzione.md` (che pezzo mi colpisce, quale mi lascia
freddo); i passi manuali U1–U9 del piano, quando ci arriviamo.

PRIMA RISPOSTA: dopo aver letto coordinamento, LEGGIMI e prova-a-freddo, dimmi in 5 righe dove siamo e che cosa lanci
in parallelo. Poi parti senza aspettarmi, salvo il repo privato se non esiste ancora.
````
