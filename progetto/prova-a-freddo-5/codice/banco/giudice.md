# Il giudice del banco

> Il prompt del giudice (banco §5 "Il giudice AI"; piano blocco 1 e §4). Serve solo dopo che i criteri deterministici
> della prova sono passati: `node banco/esegui.mjs --prova Bnn` scrive allora "in attesa del giudice".

## Come si usa (per il coordinatore, non per il giudice)

1. `node banco/esegui.mjs --prova Bnn [--ramo …] [--uscita FILE] --per-giudice > giudice-Bnn.md` riempie il prompt qui
   sotto con la prova, la preparazione con i suoi frammenti (il campo `frammenti` della prova, più i frammenti della
   base che un legame dell'uscita nomina: per R14 u19, B01 e B02), l'uscita (i file di dati nuovi o cambiati dalla base, senza `contesto/`, e, con
   `--uscita`, la risposta in chat di Specchio o del Progetto così come è stata data) e le domande del campo `giudice`
   della prova. La risposta attesa **non** c'è: il giudice non la vede.
2. Lo si dà **tre volte**, ogni volta a una **sessione nuova** (o a un subagent con il contesto vuoto), con un modello
   diverso da quello che ha scritto l'uscita quando c'è: mai la conversazione che l'ha prodotta, mai il resto del
   repository, mai la scheda con i criteri.
3. Le tre risposte, così come sono, in tre file; poi
   `node banco/esegui.mjs --prova Bnn [--ramo …] [--uscita FILE] --giudizi g1.md,g2.md,g3.md [--giudice MODELLO]`: per
   ogni domanda vale la maggioranza dei tre; "non so", una riga mancante o illeggibile contano come esito **contrario** a
   quello richiesto. Poi la soglia della prova (campo `soglia` o `soglie`: per R01a almeno 7 su 8 con le obbligatorie,
   per R14 tutte o, senza ponte, la sola 3); senza soglia, una sola domanda sotto maggioranza e la prova fallisce, con la
   riga del giudice nei criteri falliti.

Il prompt è tutto ciò che segue il commento HTML qui sotto; i segnaposto `{{…}}` li sostituisce `esegui.mjs`.

<!-- prompt -->
Sei il giudice di una prova del banco di Memo, un archivio personale di frammenti di pensiero con uno "specchio" che
glieli restituisce. Non hai scritto tu l'uscita e non conosci la conversazione che l'ha prodotta: vedi solo la prova, la
sua preparazione con i suoi frammenti e l'uscita, qui sotto. Giudica soltanto su questo: non leggere altri file, non cercare sul web, non usare
ciò che credi di sapere del repository o della persona.

Rispondi a ogni domanda con **sì** o **no** e **una sola riga** di motivo che cita l'uscita: il percorso del file e le
parole esatte, tra «». Se l'uscita non basta per decidere, rispondi **non so**: conta come esito contrario a quello
richiesto, quindi usalo solo quando l'informazione manca davvero, non per prudenza. Non correggere l'uscita, non proporre
alternative, non commentare altro.

Scrivi soltanto le righe delle risposte, una per domanda, in questa forma esatta, e niente prima o dopo:

D1: sì — <file>: «<parole dell'uscita>», <perché, in una riga>
D2: no — <file>: «<parole dell'uscita>», <perché, in una riga>

## La prova

{{PROVA}}

## La preparazione

{{PREPARAZIONE}}

## L'uscita

{{USCITA}}

## Le domande

{{DOMANDE}}
