# Regole di importazione, con i nomi del modello

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Non tocca note né script.
> Riscrive le regole R1–R13 di [eredità §7](/progetto/v2/eredita.md) con i nomi di [modello](/progetto/v2/modello.md)
> (§2.2 tipi, §2.3 predicati, §2.4 voci, §2.5 tabella dei segnaposto, §8.5 correzione dell'eredità).
> Dove il modello non basta a decidere, la scelta presa qui è segnata **[A n]**: rinvia all'attrito n di
> [attriti](/progetto/v2/simulazione/attriti-importazione.md). I file d'esempio sono in
> [importazione](/progetto/v2/simulazione/importazione.md).

## 0. Costanti

| costante | valore |
|---|---|
| canale | `canale: importato` su ogni frammento dell'Atlante |
| punto zero | 2026-10-04 → 2026-10-07 (più il diario del 2026-10-31, U31): tutto fuori dalle serie, dentro le risposte "cosa pensavo a ottobre" |
| ora | ignota: id con `0000`, `registrato` solo data **[A 4]** |
| suffisso dell'id (`xxxx`) | `u01`…`u31` frase sua · `s01` nucleo · `s02` brief · `s03` racconto della chat d'origine (M12) |
| letto | `2026-10-31` (data dell'importazione), `versione: 1` |
| `link` della lettura | `https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/<file>#L<riga>`: la provenienza `file:riga` |
| restituzioni importate | `restituzioni/2026/10/r-AAAAMMGG-0000-ritratto-<sigla>.md`, `importata: true`, `forma: ritratto`; data = `creato` della nota d'origine **[A 5]** |

## 1. Le regole

**R1. Frase sua → frammento.** Ogni riga U1–U31 di eredità §1.1 diventa
`frammenti/2026/10/2026MMGG-0000-uNN.md` con `registrato` = la data di eredità (certa o limite), `canale: importato`,
`voce: sua`, corpo = il testo esatto della fonte primaria (elenchi, refusi, link compresi). Le copie non generano frammenti.
Nella lettura: `link` alla riga d'origine; se la data è un limite, `vissuto: "≤2026-10-04, chat d'origine"`.
U4–U9 e U2 (scritti da Claude "dalla mia lista") restano `voce: sua` con `contesto: "forma forse ritoccata da Claude nel seme"` **[A 2]**.
Legami: `nomina`/`parla-di` di voce `sua` verso ciò che la frase nomina **e che diventa nodo** (R5); nessun legame proposto.

**R2. Passi misti → il frammento-sguardo.** Il nucleo intero (`nucleo.md`, aggiornato 2026-10-05) diventa **un** frammento
`20261005-0000-s01`, `voce: seme`, corpo esatto. M1–M10 non si spezzano: restano dentro quel corpo. La lettura ha
`intento: [sguardo]`, e i legami del nucleo hanno voce `seme`. Il percorso interiore (U1) dentro il nucleo è una copia: non
genera legami propri **[A 3]**. M11 → R3. M12 → frammento `s03`, `voce: seme`, lettura `intento: [niente]`: è storia del
progetto, non pensiero.

**R3. Frase sul sistema → frammento + CLAUDE.md.** U27–U31 sono parole sue: entrano **anche** come frammenti (R1).
M11 è una sintesi di Claude nel diario, non una frase sua: va solo nel `CLAUDE.md`, con la sua provenienza.
La lettura di U27–U31 ha `intento: [correggi]` (U27), `[accogli]` (U28, U30), `[chiedi]` (U29, U31). La regola che ne segue
va nel `CLAUDE.md` del nuovo repo, con la data e l'id del frammento **[A 6]**.

**R4. Convergenza → restituzione importata.** Ogni C1–C25 (e la riserva) diventa
`restituzioni/2026/10/r-AAAAMMGG-0000-ritratto-cNN.md` con `forma: ritratto`, `importata: true`, `per:` l'id del frammento
d'aggancio **[A 7]**, corpo = il passo copiato intero (link interni riscritti in testo semplice, i marcatori di blocco
proposta tolti), `voci` numerate (una per tradizione accostata), ciascuna con `rif:` uno slug di nodo **se esiste**, altrimenti
`mondo: "<nome>"`. Legami: un `converge-con` con `tra:` l'aggancio più i nodi esistenti, voce `seme` ✧ se la nota d'origine
è di mappa del seme (C1, C2, C5–C8, C10, C11, C16), altrimenti `proposta` ◌; `perche` = la frase-chiave del passo **[A 1]**.

**R5. Fonte viva → nodo, solo se nominata da lui** (modello §8.5). Le 13 fonti di eredità §3.1, più Sooraj Saxena, diventano
nodi; le 33 di §3.2 restano testo nelle convergenze (`mondo:` nelle voci). Mappatura:

| forma nell'Atlante | genere | nota |
|---|---|---|
| autore | `persone/`, `cerchia: mondo` | |
| opera | `opere/` con `autore` (slug se il nodo esiste, altrimenti il nome in chiaro) e `anno` | |
| mito | `opere/`; i personaggi → `persone/` `cerchia: finzione`, `in:` | |
| concetto, corrente (stoicismo, romanticismo) | `temi/` con il nome che usa lui | **[A 9]** |
| band (Radiohead, Deftones) | `persone/` `cerchia: mondo` | genere "persona" per un gruppo **[A 10]** |

Campi: `nome`, `alias` (forme sue), `nato-da: [id del frammento che lo nomina]`, `wikidata` lasciato vuoto (lo ancora il
consolidamento, mai l'importazione). Niente descrizione: il corpo è vuoto o una riga di identità. `influenzato-da` non passa.

**R6. Proposta → voce proposta.** Tutto ciò che ha `origine: claude` (o è in un blocco proposta) entra solo dentro una
restituzione importata, con legami di voce `proposta` ◌: nessun `validata`, nessuna coda. Sbiadisce dopo 60 giorni come ogni
proposta, ma **non** si calcola sul punto zero: il conto dei 60 giorni parte dal primo giorno del nuovo sistema **[A 11]**.

**R7. Citazione → nodo o voce.** (a) Citazione presente in un **frammento suo** (U19 il monologo, U20 la frase di Rust,
U18 Invictus che però è un'opera intera) → nodo `citazioni/` con `prova: memoria` e niente `esito`, `detta-da` il personaggio,
`autore` il vero autore, `nato-da` il frammento. (b) Citazione scelta da Claude su un'entità viva (eredità §3.3) → una voce
della restituzione `r-20261007-0000-ritratto-citazioni`, **già corretta** secondo [citazioni §4](/progetto/v2/citazioni.md)
(forma italiana marcata "resa di Claude" o "(traduzione da verificare)"), voce `proposta` ◌; il nodo nasce solo se lui la
accoglie **[A 8]**.

**R8. Idea di tatuaggio → frammento o restituzione con `serve-a`.** `origine: mia` (sognatore insonne, monologo di Rust) → le sue
frasi sono già frammenti (U21, U22) con `serve-a: tatuaggi` voce `sua`. `seme` e `claude` → restituzione importata
`r-…-ritratto-tNN` con titolo, una riga di concetto, placement, `serve-a: tatuaggi` voce `proposta` e `per:` il frammento della
convergenza che la regge. Il grimorio → `r-…-ritratto-grimorio` come proposta di cornice.

**R9. Spunto e ricerca → frammento e `nomina` con fruizione.** Lo spunto è già R1 (U18–U20) più `serve-a: tatuaggi`. La ricerca:
la frase sua (U24, U25) è il frammento; la pista è un `nomina` con `fruizione: da-fare` (Sooraj) o `in-corso` (i Pensieri).
`stato` e `link` della ricerca vanno nel nodo (`link`) e nel qualificatore `fruizione` **[A 12]**.

**R10. Pin → link nel frammento.** U26 è un frammento con i due URL normalizzati; le descrizioni di Claude **non** entrano nel
corpo (non sono parole sue) ma nella lettura, `contesto`, marcate "descrizione di Claude".

**R11. Emozioni → temi.** Le 10 parole di U1 diventano `temi/<parola>.md` con `nato-da: [20261004-0000-u01]`, nessun corpo.
Le 4 di Claude (lucidità, malinconia, meraviglia, passione) **non entrano**: un nodo non nasce da una proposta **[A 13]**.

**R12. Ciò che non passa → link all'Atlante.** Nessun campo nuovo: la lettura del frammento importato ha già `link`; i nodi
possono avere `link` alla scheda dell'Atlante (`https://paol-imi.github.io/tattoo-shit/...`), mai copiarne il corpo.

**R13. Le 8 domande → non entrano come nodi.** Il modello §2.5 le vuole `temi/` "voce seme", ma (1) un nodo non ha voce e
(2) sono `origine: claude`, create il 2026-10-07, e nessuna frase sua le nomina: per il modello stesso non possono nascere
**[A 14]**. Entrano come **una** restituzione importata `r-20261007-0000-ritratto-domande` con 8 voci; diventano temi solo
se lui ne riprende una.

## 2. Ordine dello script

1. frammenti (R1, R2, R3), in ordine di data e di numero;
2. nodi (R5, R7a, R11), con `nato-da` ai frammenti appena scritti;
3. letture, con legami ai nodi esistenti;
4. restituzioni importate (R4, R7b, R8, R13), che rimandano a frammenti e nodi;
5. `node indice.mjs` e `scripts/contesto.mjs`; verifica che nessun conto, serie o vicenda contenga `canale: importato` o `importata: true`.

## 3. Che cosa cambia dopo la simulazione

La prova sul campione ([attriti](/progetto/v2/simulazione/attriti-importazione.md)) chiede di correggere queste regole
prima dello script:
- **R1:** corpo = testo grezzo senza markup né etichette di Claude; `forma: riportata` per le frasi sue scritte da altri
  (A2, A19); `intento: [salva]` di default (A22); una provenienza in `fonte:`, non in `link` (A20).
- **R2:** nessuna copia genera legami (A3); un frammento-sguardo `s04` per M8–M10 (A15); niente blocchi proposta nel corpo (A24);
  lo sguardo fa nascere nodi, il racconto `s03` no (A16).
- **R4:** `aggancio: {di, passo}` al posto di `per` (A7); `tra:` ammette le voci; le voci `mondo:` si indicizzano per nome (A1);
  data dal passo, suffisso = slug (A5).
- **R5, R11:** concetti e stili nominati da lui diventano temi (A9); `dostoevskij` da U31 (A18); `sente` solo per lo stato d'arrivo (A21).
- **R6:** le importate non sbiadiscono (A11).
- **R7:** protocollo completo sulle 17 citazioni vive prima dell'import (A8).
- **R13:** U30 accoglie le 8 domande, che nascono come temi (A14).
- Il **brief** `s02` sparisce: è una vista (A3).
