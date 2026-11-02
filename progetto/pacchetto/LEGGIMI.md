# Pacchetto di implementazione: LEGGIMI

Questa cartella è il progetto di un sistema personale, "un memo che mappa una coscienza": la cattura dal telefono, il
consolidamento, la restituzione. Sta già nel repository nuovo e privato, in `progetto/pacchetto/` (nel piano il repo è
`MEMO`), accanto ai documenti di progetto da cui è generata (`progetto/v2/`). I link tra i file sono relativi e si risolvono
in questo repo; i link alle note dell'Atlante puntano a [tattoo-shit](https://github.com/paol-imi/tattoo-shit), pubblico.

Per avviare il lavoro: [prompt-avvio](./prompt-avvio.md), da incollare nella prima chat di Claude Code.

## In che ordine leggere

| n. | file | che cos'è | valore |
|---|---|---|---|
| 1 | [piano](./01-piano.md) | i blocchi 0–12 in ordine di dipendenza, i passi a mano U1–U9, il collaudo, le prove sul campo P1–P7 | **normativo** per ordine, porte e passi a mano |
| 2 | [modello v3](./02-modello-v3.md) | il modello dati e di lavoro: tipi, predicati, schema JSON, slug, lucchetto, ritmi, l'importazione (§14) | **normativo**: vince su tutti gli altri |
| 3 | [prompt v3](./03-prompt-v3.md) | `CLAUDE.md` del repo nuovo, le Routine, il Progetto claude.ai, Specchio | **normativo** per i testi dei prompt (incoerenze note: §14 e appendici A/B) |
| 4 | [banco di prova](./04-banco-di-prova.md) | i casi B, D, R, T con i criteri di passaggio, nel vocabolario del v3 | **normativo** per il collaudo |
| 5 | [regole dell'importazione](./05-regole-importazione.md) | R1–R13 con i nomi del v2 | **superato** dal §14 del modello: solo storia |
| 6 | [eredità](./06-eredita.md) | che cosa passa dall'Atlante: frasi, convergenze, entità | contesto per il blocco 2 |
| 7 | [correzioni delle citazioni](./07-correzioni-citazioni.md) | le citazioni dell'Atlante già corrette | contesto per il blocco 2 |
| 8 | [citazioni](./08-citazioni.md) e [identità](./09-identita.md) | i protocolli di verifica delle citazioni e degli ID esterni | protocolli per "consolida"; il resto è prova sul campo |
| 9 | [voce](./10-voce.md) | come parla il sistema, con esempi | contesto: le regole sono già riassunte nel `CLAUDE.md` di prompt v3 |
| 10 | [telefono](./11-telefono.md) | dal tocco al repo e ritorno, con le fonti | contesto per i blocchi 3, 7, 8 e le prove P |
| 11 | [codice della seconda prova a freddo](../prova-a-freddo-2/codice/) e, prima, [della prima](../prova-a-freddo/codice/) | script, schemi e test scritti da due sessioni senza contesto: la seconda arriva alla porta del blocco 6 (108 test verdi), la prima al blocco 5 ([resoconto 2](../v2/prova-a-freddo-2.md), [resoconto 1](../v2/prova-a-freddo.md)) | **punto di partenza non normativo**: da leggere e riusare a giudizio, prima la seconda; dove diverge vince il modello, poi il piano |

Il codice della prova a freddo sta in questo repo, in `progetto/prova-a-freddo/codice/`: dove il piano lo cerca nel clone
dell'Atlante (sotto `/tmp/atlante/`) vale questa copia. Il suo `importa/fonte.json` ha uno SHA
vecchio: vale quello di [ORIGINE](./ORIGINE.md).

## Che cosa va alla radice del repo

La cartella `radice/` contiene i testi pronti da copiare, estratti da [prompt v3](./03-prompt-v3.md) (che resta la
fonte: se divergono, vale prompt v3):
- [claude-radice](./radice/claude-radice.md) diventa `CLAUDE.md` nella radice del repo (qui ha un altro nome perché
  un `CLAUDE.md` in questa cartella verrebbe letto come istruzione);
- `radice/prompt/` diventa `prompt/`: [smista](./radice/prompt/smista.md), [consolida](./radice/prompt/consolida.md),
  [lettera](./radice/prompt/lettera.md), [ritratto](./radice/prompt/ritratto.md), [progetto](./radice/prompt/progetto.md)
  (istruzioni del Progetto claude.ai), [specchio](./radice/prompt/specchio.md), [ti ricordi](./radice/prompt/ti-ricordi.md) ("ti ricordi?"), [formato-piano](./radice/prompt/formato-piano.md) (formato del piano JSON comune a tutti i cicli),
  [sogno](./radice/prompt/sogno.md), [confronto](./radice/prompt/confronto.md). La Routine "smista" non ha un prompt a
  parte: contiene la sola riga «leggi ed esegui `prompt/smista.md`» (piano, blocco 7 e U5).

Precedenza, se due file divergono: modello v3, poi prompt v3, poi banco, poi piano, poi gli altri. Dove il piano rimanda
ai "prompt operativi" valgono i prompt v3. Dove il piano nomina un file del pacchetto in `progetto/` (per esempio
`progetto/ORIGINE.md`), il file è in `progetto/pacchetto/`. Una lacuna (il modello non dice) va in `progetto/lacune.md`
con la scelta fatta.

[ORIGINE](./ORIGINE.md) dice da quale commit di questo repo viene il pacchetto e a quale commit di tattoo-shit si leggono
le note. `aggiorna.sh` rigenera il pacchetto da `progetto/v2/` (`bash progetto/pacchetto/aggiorna.sh`): serve solo se
cambiano i documenti di progetto.

## Le note dell'Atlante

Non sono in questo repo: lo script di importazione le legge da tattoo-shit, **a un commit fisso**, il checkpoint scritto in
[ORIGINE](./ORIGINE.md) (da scrivere anche in `importa/fonte.json`), mai da un branch che si muove. Per il lavoro su
questo repo il clone di tattoo-shit serve solo a questo.

## Un solo account

C'è un solo account claude.ai, quello del telefono, collegato all'account GitHub `paol-imi`; la GitHub App "Claude"
([github.com/apps/claude](https://github.com/apps/claude)) sta sul repo nuovo (passo U2 del piano). Routine, Progetto claude.ai e
notifiche stanno su quell'account, che è lo stesso del telefono. Il token a grana fine (U3) si crea su `paol-imi`, che
possiede il repo.
