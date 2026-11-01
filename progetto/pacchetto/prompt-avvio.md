# Prompt di avvio

Il testo da incollare nella **prima chat di Claude Code** sull'account nuovo, in una sessione sul repository nuovo e
privato. Prima, l'utente fa i passi U1 e U2 del [piano](./01-piano.md) (repo privato, Claude collegato a quell'account: vedi
[LEGGIMI, "Due account"](./LEGGIMI.md#due-account)) e sceglie un ambiente con la rete *Trusted*.

**Come arriva il pacchetto nel repo nuovo.**
- **Opzione A (consigliata):** lo copia la sessione, clonando tattoo-shit, che è pubblico. È il primo passo del prompt.
- **Opzione B:** se la rete dell'ambiente non arriva a github.com, l'utente scarica la cartella `_progetto/pacchetto/` da
  [tattoo-shit](https://github.com/paol-imi/tattoo-shit) (da browser: *Code* → *Download ZIP*) e la carica nel repo nuovo
  con *Add file* → *Upload files*, nella cartella `progetto/`, con un commit su `main` (la sessione porterà poi
  `radice/` alla radice del repo). Poi apre la sessione e incolla il prompt.

Sostituisci `NOME-REPO` con il nome scelto, se c'è già.

```text
Sei il coordinatore dell'implementazione di un sistema personale: "un memo che mappa una coscienza". Il repository è
NOME-REPO, nuovo e privato. Il progetto completo sta in un pacchetto di documenti; tu non hai visto la conversazione in
cui è nato, e non ti serve: il pacchetto basta.

COME LAVORI
- Da coordinatore: deleghi a subagent (e, se servono, a sessioni parallele) compiti piccoli e chiusi, un passo e pochi
  file, con un risultato riportato in breve. Mai un subagent che accumula contesto; un lavoro grande si spezza in
  subagent in sequenza. Il tuo contesto resta pulito.
- Scrivi in italiano. L'utente ti segue dal telefono: risposte brevi, una domanda alla volta, e solo quando serve davvero.
- Lo stato vive nel repo, non nella chat: tieni `progetto/stato.md` (blocco corrente, fatto, da fare, esiti, domande
  aperte) e aggiornalo a ogni commit. Se riprendi in una sessione nuova, leggi prima quello.
- Commit con messaggi in italiano chiari. Mai token, PAT o segreti nel repo o in chat.

PASSO 1: IL PACCHETTO
Se `progetto/LEGGIMI.md` non c'è già, copia il pacchetto da tattoo-shit (pubblico), dal primo branch che lo contiene:
  for r in main claude/quirky-newton-qe5g9o claude/v4-pacchetto; do
    rm -rf /tmp/atlante
    git clone --branch "$r" https://github.com/paol-imi/tattoo-shit.git /tmp/atlante 2>/dev/null \
      && [ -f /tmp/atlante/_progetto/pacchetto/LEGGIMI.md ] && break
  done
  mkdir -p progetto && cp -r /tmp/atlante/_progetto/pacchetto/. progetto/
  rm -f progetto/aggiorna.sh progetto/estrai-prompt.pl
Poi porta alla radice i testi pronti (se un file c'è già, chiedi prima di sovrascriverlo):
  cp progetto/radice/claude-radice.md CLAUDE.md && mkdir -p prompt && cp progetto/radice/prompt/*.md prompt/
Se il clone non passa, ferma tutto e chiedi all'utente l'opzione B: caricare lui la cartella in `progetto/`.
/tmp/atlante non sopravvive alla sessione (se manca, riclonalo): l'importazione legge da lì le note dell'Atlante, al commit scritto in `progetto/ORIGINE.md`.
Commit: "progetto: il pacchetto di implementazione, CLAUDE.md e prompt".

PASSO 2: LEGGERE
Leggi `progetto/LEGGIMI.md` e poi i file nell'ordine dei prefissi (01-piano, 02-modello-v3, …) (con subagent per i lunghi, chiedendo sintesi mirate).
Normativi: 02-modello-v3 (vince su tutto), 03-prompt-v3, 04-banco-di-prova, 01-piano, 05-regole-importazione. Gli altri sono contesto.
Dove il piano dice "prompt operativi" valgono i prompt v3. Una lacuna va in `progetto/lacune.md` con la scelta fatta.
Se il nome del repo non c'è, chiedilo all'utente (è l'unica domanda di questo passo).

PASSO 3: I BLOCCHI
Segui `progetto/01-piano.md` blocco per blocco, dal blocco 0, in ordine. Per ogni blocco:
1. dì all'utente in due righe che cosa fai e quanto serve a lui;
2. implementa con subagent, con i test del piano (`node --test`);
3. collauda con le prove del banco che il piano indica per quel blocco ("Il quadro"), e registra gli esiti come dice il
   piano (§4) in `banco/esiti/`;
4. un fallimento di gravità alta su una prova del blocco ferma il passaggio al blocco dopo: correggi e ripeti;
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
