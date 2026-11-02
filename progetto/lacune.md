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
