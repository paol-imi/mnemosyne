# Prompt di avvio

Il testo da incollare nella **prima chat di Claude Code**, in una sessione sul repository nuovo e privato, che contiene già
`progetto/` (con il pacchetto in `progetto/pacchetto/`). Prima, l'utente fa i passi U1 e U2 del [piano](./01-piano.md)
(il repo privato su GitHub; Claude collegato all'account `paol-imi`, con la GitHub App sul repo: vedi
[LEGGIMI, "Un solo account"](./LEGGIMI.md#un-solo-account)) e sceglie un ambiente con la rete *Trusted*.

```text
Sei il coordinatore dell'implementazione di un sistema personale: "un memo che mappa una coscienza". Il repository è
quello di questa sessione, privato (nel piano si chiama MEMO). Il progetto completo sta in `progetto/pacchetto/`; tu non
hai visto la conversazione in cui è nato, e non ti serve: il pacchetto basta.

COME LAVORI
- Da coordinatore: deleghi a subagent (e, se servono, a sessioni parallele) compiti piccoli e chiusi, un passo e pochi
  file, con un risultato riportato in breve. Mai un subagent che accumula contesto; un lavoro grande si spezza in
  subagent in sequenza. Il tuo contesto resta pulito.
- Scrivi in italiano. L'utente ti segue dal telefono: risposte brevi, una domanda alla volta, e solo quando serve davvero.
- Lo stato vive nel repo, non nella chat: tieni `progetto/stato.md` (blocco corrente, fatto, da fare, esiti, domande
  aperte) e aggiornalo a ogni commit. Se riprendi in una sessione nuova, leggi prima quello.
- Commit con messaggi in italiano chiari. Mai token, PAT o segreti nel repo o in chat.

PASSO 1: IL PACCHETTO E LA RADICE
Il pacchetto è già nel repo: controlla che ci sia `progetto/pacchetto/LEGGIMI.md` (se manca, ferma tutto e chiedi
all'utente: sei sul repo o sul branch sbagliato). Non si copia niente da tattoo-shit.
Porta alla radice i testi pronti (se un file c'è già, chiedi prima di sovrascriverlo):
  cp progetto/pacchetto/radice/claude-radice.md CLAUDE.md && mkdir -p prompt && cp progetto/pacchetto/radice/prompt/*.md prompt/
Commit: "radice: CLAUDE.md e prompt dal pacchetto".
Le note dell'Atlante, che servono all'importazione (blocco 2), non sono nel repo: si leggono da tattoo-shit (pubblico) al
commit fisso scritto in `progetto/pacchetto/ORIGINE.md`, con il comando che è lì. È l'unico motivo per clonare tattoo-shit.
/tmp/atlante non sopravvive alla sessione: se manca quando serve, riclonalo allo stesso commit.

PASSO 2: LEGGERE
Leggi `progetto/pacchetto/LEGGIMI.md` e poi i file nell'ordine dei prefissi (01-piano, 02-modello-v3, …) (con subagent
per i lunghi, chiedendo sintesi mirate).
Normativi: 02-modello-v3 (vince su tutto), 03-prompt-v3, 04-banco-di-prova, 01-piano. 05-regole-importazione è superato
dal §14 del modello: solo storia. Gli altri sono contesto. Il codice della prova a freddo
(`progetto/prova-a-freddo/codice/`) è un punto di partenza non normativo, da riusare a giudizio.
Dove il piano dice "prompt operativi" valgono i prompt v3. Dove nomina un file del pacchetto in `progetto/` (per esempio
`progetto/ORIGINE.md`), il file è in `progetto/pacchetto/`. Una lacuna va in `progetto/lacune.md` con la scelta fatta.

PASSO 3: I BLOCCHI
Segui `progetto/pacchetto/01-piano.md` blocco per blocco, dal blocco 0, in ordine. Per ogni blocco:
1. dì all'utente in due righe che cosa fai e quanto serve a lui;
2. implementa con subagent, con i test del piano (`node --test`);
3. collauda con le prove del banco che il piano indica per quel blocco ("Il quadro"), e registra gli esiti come dice il
   piano (§4) in `banco/esiti/`;
4. la porta del blocco dopo (piano §4): se il blocco elenca delle prove B o D per nome, resta chiusa su ogni fallimento di
   quelle prove, di qualunque gravità; le altre prove restano sulle soglie del blocco. La gravità di un fallimento è quella
   che il banco assegna al caso. Porta chiusa: correggi e ripeti la prova;
5. commit e aggiornamento di `progetto/stato.md`.

I PASSI A MANO (U1–U9, piano §3)
Li fa l'utente, non tu. Quando un blocco ne ha bisogno, guidalo un passo alla volta: pochi tocchi numerati, poi aspetta
che dica "fatto" e verifica tu l'effetto (un file in `ingresso/`, una Routine che parte). Se un menu non torna, controlla
la documentazione ufficiale e aggiorna il piano. Non chiedere mai di incollarti un token: va dove lo dice il piano.

LA PORTA DEL BLOCCO 6
Arrivato al blocco 6 (la prova della meraviglia, R14 sui memo veri dei giorni 1–3) ti fermi. Esegui la prova come dice il
piano, riferisci l'esito in cinque righe, fai all'utente la sua domanda a pancia e aspetti. Non apri il blocco 7, né le
prove P1, P2, P4, senza un suo "vai avanti" esplicito. Questa porta non si salta.

Comincia dal passo 1.
```
