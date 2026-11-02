# Lacune e scelte

Le lacune del pacchetto (il modello non dice) con la scelta fatta.

- Un «sì con riserve» del giudice conta come esito contrario: lo dice ora il banco §5 e il piano §4 (era lacuna nella
  sesta prova).
- Il tag `punto-zero` non si può spingere su GitHub da questa sessione (il proxy dell'ambiente rifiuta con 403 ogni push
  che non sia il branch `main`). Scelta: il tag resta locale; è il commit `importa: punto zero` (data 2026-10-31), che una
  sessione nuova ritrova e ritagga con
  `git tag punto-zero $(git log --format=%H --grep='^importa: punto zero$' -n1 main)`. I rami `banco/*` restano locali ai
  cloni del banco, come vuole il piano §4.
- D02, la nota delle riportate con la maiuscola a inizio riga («Trascritte da Claude nel seme, …:»): `CLAUDE.md` regola 6
  vuole "le stesse parole", non la minuscola; il checker cercava solo `trascritt[ae] da Claude`. Scelta: `D02.json`
  accetta `[Tt]rascritt[ae] da Claude` (e `esegui.mjs` stampa la nota in minuscolo). Primo giro di D02 «oggi» caduto lì.
- R01a, primo giro (6 su 8): due giudici su tre trovano generica la riga «Dal telefono, zero frammenti: la serie dei memo
  è vuota.» (che `ritratto.md` chiedeva: "una serie ancora vuota si dice"), tre su tre una domanda a cui si risponde
  subito (una scelta tra Rust e la sua frase). Scelta: due righe in `prompt/ritratto.md` (la serie dei memo non si dice
  nella variante giorno 1; la domanda non è una scelta tra due parti di cui una è già sua). Il pacchetto
  (`radice/prompt/ritratto.md`, prompt v3) resta com'è: la correzione vive in `prompt/`.
- R01a, secondo giro (7 su 8, cade l'obbligatoria 5): la convergenza u01–u09 ("lo stesso metro") ripeteva un'idea che
  u09 dice già in forma generale. Scelta: una riga in `prompt/ritratto.md` (variante giorno 1): i due capi vengono da cose
  mai accostate, non due frasi che dicono già la stessa idea.
- R01a, terzo giro (5 su 8: convergenza forzata, D6 no e D7 sì): la riga del secondo giro spingeva verso capi lontani.
  Scelta: sostituita con una prova a due lati in `prompt/ritratto.md` (non già detta in una delle frasi; le due frasi
  bastano senza il perché ◌; se nessuna coppia passa, nessuna convergenza). Il giudice non vede i frammenti della
  tensione (non sono capi di legami): la domanda 3 riceve "non so", che conta contro; non è obbligatoria.
- R01a, quarto giro (6 su 8: convergenza forzata, una frase tagliata a metà). Il ritratto non aveva la prova del ponte
  con giudizi indipendenti che `specchio.md` ha. Scelta: `prompt/ritratto.md` (variante giorno 1) rimanda alla prova del
  passo 2 di `specchio.md`, frasi intere, più una domanda C ("una delle due dice già il nesso?"); se nessuna coppia
  passa, nessuna convergenza. Rende la prova più severa, non spinge verso un ponte.
