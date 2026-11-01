# Il piano

Ogni ciclo che scrive (smista, consolida, ritratto, specchio) produce **un piano JSON** e lo passa a
`node scripts/applica.mjs PIANO.json`. Lo script lo convalida, calcola slug e numeri, pulisce i link, scrive i file, mette
`prompt` (l'hash di `prompt/CICLO.md`), `registrato`, `versione`, `schema`, o rifiuta con il motivo. È transazionale:
i file vanno al loro posto solo se `verifica.mjs` passa, altrimenti non resta niente.

```json
{
  "ciclo": "smista",
  "letto-da": "il modello che sta girando",
  "operazioni": [
    {"op": "crea-nodo", "genere": "persone", "nome": "Umberto Galimberti", "alias": ["galimberti"], "cerchia": "mondo"},
    {"op": "crea-nodo", "genere": "citazioni", "nome": "Il nichilismo è l'ospite inquietante",
     "attribuita-a": ["@Umberto Galimberti"], "corpo": "Verifica rapida: nessun apocrifo noto; … (traccia)"},
    {"op": "lettura", "frammento": "20261103-2340-k7q2", "intento": ["salva"],
     "reazione": [{"parole": "molto interessante", "verso": "+"}],
     "legami": [{"p": "nomina", "a": "@Umberto Galimberti", "voce": "sua", "perche": "«uno spezzone di galimberti a teatro»"}],
     "parole": ["ragazzo", "cultura"]},
    {"op": "restituzione", "forma": "risposta", "per": "20261103-2340-k7q2",
     "testo": "**Salvato.** 1. …", "voci": [{"rif": "@Il nichilismo è l'ospite inquietante", "voce": "mondo", "cosa": "citazione"}]}
  ]
}
```

## Le sette operazioni
| op | campi | chi |
|---|---|---|
| `crea-nodo` | `genere`, `nome`, e i campi del genere (`alias`, `cerchia`, `in`, `autore`, `attribuita-a`, `citata-da`, `anno`, `scopo`, `esito`, `riferimento`, `originale`, `traduzione`, `link`), `nato-da` (di default il frammento letto), `corpo` | smista, specchio, consolida |
| `alias` | `nodo`, `alias` | smista, specchio, consolida |
| `aggiorna-nodo` | `nodo`, `campi: {…}` | solo consolida |
| `lettura` | `frammento`, `intento`, `reazione`, `legami`, `parole`, `trascrizione`, `altrui`, `vissuto`, `delicato`, `nota`, `risposta` (`salvato` · `ci-sono` · id esistente); la `versione` la mette lo script | smista e specchio (v1), consolida (v ≥ 2) |
| `restituzione` | `forma`, `per`, `copre`, `aggancio`, `testo`, `voci` (`rif`, `voce`, `cosa`, `turno`, `perche`, `esito`, `riferimento`), `legami` (con `da`) | smista, specchio, consolida, ritratto |
| `riserva` | `file` (`ritorno` · `pronte`), `testo` (il file intero) | solo consolida |
| `lapide` | `da`, `in`, `perche` (la fusione: lo script chiama `migra/fondi.mjs`) | solo consolida |

**I tipi dei campi.** Stringa (slug, `@Nome` o `~Nome`): `autore`, `in`, `nodo`, `a`. Elenco: `alias`,
`attribuita-a`, `citata-da`, `nato-da`, `copre`, `parole`, `tra`, `intento`. Intero: `anno`, `n`, `da`. Un mito, una
tradizione, un luogo come voce: `cosa: opera` (il racconto) o `persona` (il protagonista); l'enum non ha altro.

## Regole
- **Mai uno slug inventato**: per un nodo nuovo `@Nome`, che lo script risolve anche dentro le altre operazioni dello
  stesso piano; per un nodo esistente lo slug di `mappa.md` (Alias) o dei candidati del pacchetto.
- **Mai un numero `n`** nelle voci nuove: lo script li assegna nell'ordine in cui compaiono nel `testo`, che li scrive
  come `1.`, `2.`…
- Ogni legame ha `p`, `a` oppure `tra`, `voce`, `perche`.
- `reazione.parole` è copiata **esatta** dal frammento (lo script controlla che sia una sottostringa).
- Una citazione creata da "smista" o da Specchio ha solo `nome`, `attribuita-a`, `nato-da` e, nel `corpo`, la traccia della
  verifica rapida: mai `esito`, `riferimento`, `autore`, `originale` (li scrive "consolida" con `aggiorna-nodo`).
- `parole` e `intento` sono sempre liste, anche di un solo valore (`["greci"]`, `["chiedi"]`).
- Rifiuto: correggi seguendo il messaggio, **al massimo due volte**; poi togli l'operazione colpita (o lascia il
  frammento senza lettura: resta in coda) e scrivilo nel messaggio finale, con l'id e il motivo, senza contenuto.
