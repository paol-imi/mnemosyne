# Il piano

Ogni ciclo che scrive (smista, consolida, ritratto, specchio) produce **un piano JSON** e lo passa a
`node scripts/applica.mjs PIANO.json`; "lettera" non scrive e non ha piano. Lo script lo convalida, calcola slug e numeri,
pulisce i link, scrive i file, mette nelle letture `prompt` (le prime 7 cifre dello SHA-1 di `CLAUDE.md`,
`prompt/CICLO.md` e `prompt/formato-piano.md` messi in fila), `registrato`, `schema` e, se manca, `versione`, o rifiuta con il motivo. È
transazionale: i file vanno al loro posto solo se `verifica.mjs` passa, altrimenti non resta niente.

```json
{
  "ciclo": "smista",
  "letto-da": "il modello che sta girando",
  "operazioni": [
    {"op": "crea-nodo", "genere": "persone", "nome": "Umberto Galimberti", "alias": ["galimberti"], "cerchia": "mondo"},
    {"op": "crea-nodo", "genere": "opere", "nome": "spettacolo sulle emozioni", "autore": "@Umberto Galimberti"},
    {"op": "crea-nodo", "genere": "citazioni", "nome": "Il nichilismo è l'ospite inquietante",
     "attribuita-a": ["@Umberto Galimberti"], "corpo": "Verifica rapida: nessun apocrifo noto; … (traccia)"},
    {"op": "lettura", "frammento": "20261103-2340-k7q2", "versione": 1, "intento": ["salva"],
     "reazione": [{"parole": "molto interessante", "verso": "+"}],
     "legami": [{"p": "nomina", "a": "@Umberto Galimberti", "voce": "sua", "perche": "«uno spezzone di galimberti a teatro»"}],
     "parole": ["ragazzo", "cultura"]},
    {"op": "restituzione", "forma": "risposta", "per": "20261103-2340-k7q2",
     "testo": "**Salvato.**\n1. …\n2. …",
     "voci": [{"rif": "@Il nichilismo è l'ospite inquietante", "voce": "mondo", "cosa": "citazione"},
              {"rif": "@spettacolo sulle emozioni", "voce": "mondo", "cosa": "opera"}]}
  ]
}
```

## Le sette operazioni
| op | campi | chi |
|---|---|---|
| `crea-nodo` | `genere`, `nome`, e i campi del genere (`alias`, `cerchia`, `in`, `autore`, `attribuita-a`, `citata-da`, `anno`, `scopo`, `esito`, `riferimento`, `originale`, `traduzione`, `link`), `nato-da` (di default il frammento letto), `corpo` | smista, specchio, consolida |
| `alias` | `nodo`, `alias` | smista, specchio, consolida |
| `aggiorna-nodo` | `nodo`, `campi: {…}` | solo consolida |
| `lettura` | `frammento`, `versione` (1 all'ingresso; se manca la mette lo script), `intento`, `reazione`, `legami`, `parole`, `trascrizione`, `altrui`, `vissuto`, `delicato`, `nota`, `risposta` (`salvato` · `ci-sono` · id esistente) | smista e specchio (v1), consolida (v ≥ 2) |
| `restituzione` | `forma`, `per`, `copre`, `aggancio`, `testo`, `voci` (`rif`, `voce`, `cosa`, `turno`, `perche`, `esito`, `riferimento`), `legami` (con `da`) | smista, specchio, consolida, ritratto |
| `riserva` | `file` (`ritorno` · `pronte`), `testo` (il file intero) | solo consolida |
| `lapide` | `da`, `in`, `perche` (la fusione: lo script chiama `migra/fondi.mjs`) | solo consolida |

**I tipi dei campi.** Stringa (slug, `@Nome` o `~Nome`): `autore`, `in`, `nodo`, `a`. Elenco: `alias`,
`attribuita-a`, `citata-da`, `nato-da`, `copre`, `parole`, `tra`, `intento`. Intero: `anno`, `n`, e `da` di un legame
di restituzione (la voce da cui parte); nell'operazione `lapide`, `da` e `in` sono slug. Un mito, una tradizione, un
luogo come voce: `cosa: opera` (il racconto) o `persona` (il protagonista); l'enum non ha altro.

## Regole
- **Mai uno slug inventato**: per un nodo nuovo `@Nome`, che lo script risolve anche dentro le altre operazioni dello
  stesso piano; per un nodo esistente lo slug di `mappa.md` (Alias) o dei candidati del pacchetto.
- **Mai un numero `n`** nelle voci nuove: lo script li assegna nell'ordine in cui compaiono nel `testo`, che li scrive
  come `1.`, `2.`… **a inizio riga**, anche quando la voce è una sola ("**Salvato.**" sta sulla sua riga, le voci sotto).
- Ogni legame ha `p`, `a` oppure `tra`, `voce`, `perche`. `legami` della lettura e `voci` della restituzione ci sono
  sempre, anche vuoti (`[]`).
- `reazione.parole` è copiata **esatta** dal frammento (lo script controlla che sia una sottostringa).
- Una citazione creata da "smista" o da Specchio ha solo `nome`, `nato-da`, eventuali `alias`, `attribuita-a` (se la
  attribuisco) e, nel
  `corpo`, la traccia della verifica rapida: mai `esito`, `riferimento`, `autore`, `originale`, `traduzione`, `citata-da`
  (li scrive "consolida" con `aggiorna-nodo`). Un'opera invece può nascere con `autore`, se lo dicono le mie parole.
- `parole` e `intento` sono sempre liste, anche di un solo valore (`["greci"]`, `["chiedi"]`).
- Rifiuto: correggi seguendo il messaggio, **al massimo due volte**; poi togli l'operazione colpita (o lascia il
  frammento senza lettura: resta in coda) e scrivilo nel messaggio finale, con l'id e il motivo, senza contenuto.
