# Lacune e scelte

Le lacune del pacchetto (il modello non dice) con la scelta fatta.

- Un «sì con riserve» del giudice conta come esito contrario: lo dice ora il banco §5 e il piano §4 (era lacuna nella
  sesta prova).
- Il tag `punto-zero` non si può spingere su GitHub da questa sessione (il proxy dell'ambiente rifiuta con 403 ogni push
  che non sia il branch `main`). Scelta: il tag resta locale; è il commit `importa: punto zero` (data 2026-10-31), che una
  sessione nuova ritrova e ritagga con
  `git tag punto-zero $(git log --format=%H --grep='^importa: punto zero$' -n1 main)`. I rami `banco/*` restano locali ai
  cloni del banco, come vuole il piano §4.
