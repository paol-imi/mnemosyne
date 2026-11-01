# Pacchetto di implementazione: LEGGIMI

Questa cartella è il progetto di un sistema personale, "un memo che mappa una coscienza": la cattura dal telefono, il
consolidamento, la restituzione. Si copia così com'è nel repository nuovo e privato (segnaposto `NOME-REPO`; nel piano
è `MEMO`), per esempio in `progetto/`. I link tra i file sono relativi e restano validi dopo la copia; i link ai documenti
di ricerca e alle note dell'Atlante puntano a [tattoo-shit](https://github.com/paol-imi/tattoo-shit), pubblico.

Per avviare il lavoro: [prompt-avvio](./prompt-avvio.md), da incollare nella prima chat di Claude Code.

## In che ordine leggere

| n. | file | che cos'è | valore |
|---|---|---|---|
| 1 | [piano](./01-piano.md) | i blocchi 0–12 in ordine di dipendenza, i passi a mano U1–U9, il collaudo, le prove sul campo P1–P7 | **normativo** per ordine, porte e passi a mano |
| 2 | [modello v3](./02-modello-v3.md) | il modello dati e di lavoro: tipi, predicati, schema JSON, slug, lucchetto, ritmi | **normativo**: vince su tutti gli altri |
| 3 | [prompt v3](./03-prompt-v3.md) | `CLAUDE.md` del repo nuovo, le Routine, il Progetto claude.ai, Specchio | **normativo** per i testi dei prompt (§12: incoerenze note del v3) |
| 4 | [banco di prova v2](./04-banco-di-prova.md) | i casi B, D, R, T con i criteri di passaggio | **normativo** per il collaudo |
| 5 | [regole dell'importazione](./05-regole-importazione.md) | R1–R13 per lo script che legge l'Atlante | **normativo** per il blocco 2 |
| 6 | [eredità](./06-eredita.md) | che cosa passa dall'Atlante: frasi, convergenze, entità | contesto per il blocco 2 |
| 7 | [correzioni delle citazioni](./07-correzioni-citazioni.md) | le citazioni dell'Atlante già corrette | contesto per il blocco 2 |
| 8 | [citazioni](./08-citazioni.md) e [identità](./09-identita.md) | i protocolli di verifica delle citazioni e degli ID esterni | protocolli per "consolida"; il resto è prova sul campo |
| 9 | [voce](./10-voce.md) | come parla il sistema, con esempi | contesto: le regole sono già riassunte nel `CLAUDE.md` di prompt v3 |
| 10 | [telefono](./11-telefono.md) | dal tocco al repo e ritorno, con le fonti | contesto per i blocchi 3, 7, 8 e le prove P |

## Che cosa va alla radice del repo nuovo

La cartella `radice/` contiene i testi pronti da incollare, estratti da [prompt v3](./03-prompt-v3.md) (che resta la
fonte: se divergono, vale prompt v3):
- [claude-radice](./radice/claude-radice.md) diventa `CLAUDE.md` nella radice del repo nuovo (qui ha un altro nome perché
  dentro tattoo-shit un `CLAUDE.md` verrebbe letto come istruzione);
- `radice/prompt/` diventa `prompt/`: [smista](./radice/prompt/smista.md), [consolida](./radice/prompt/consolida.md),
  [lettera](./radice/prompt/lettera.md), [ritratto](./radice/prompt/ritratto.md), [progetto](./radice/prompt/progetto.md)
  (istruzioni del Progetto claude.ai), [specchio](./radice/prompt/specchio.md), [ti ricordi](./radice/prompt/ti-ricordi.md) ("ti ricordi?"), [formato-piano](./radice/prompt/formato-piano.md) (formato del piano JSON comune a tutti i cicli),
  [sogno](./radice/prompt/sogno.md), [confronto](./radice/prompt/confronto.md). `prompt/routine-smista.md` lo scrive il
  blocco 7 del piano, a partire da `smista.md`.

Precedenza, se due file divergono: modello v3, poi prompt v3, poi banco, poi piano, poi gli altri. Dove il piano rimanda
ai "prompt operativi" valgono i prompt v3. Una lacuna (il modello non dice) va in `progetto/lacune.md` con la scelta fatta.

[ORIGINE](./ORIGINE.md) dice da quale commit di tattoo-shit viene il pacchetto. `aggiorna.sh` serve solo
dentro tattoo-shit, per rigenerarlo: nel repo nuovo si può ignorare.

## Le note dell'Atlante

Non sono nel pacchetto: lo script di importazione le legge da tattoo-shit, **a un commit fisso** (lo SHA in
[ORIGINE](./ORIGINE.md), da scrivere anche in `importa/fonte.json`). Le correzioni delle citazioni stanno sul branch
`claude/quirky-newton-qe5g9o` finché l'utente non lo unisce a `main`: fino ad allora si legge da quel branch, non da
`main`. Dopo l'unione si rigenera il pacchetto con `bash _progetto/pacchetto/aggiorna.sh main` e si usa lo SHA nuovo.

## Due account

Verificato il 2026-10-31 sulle fonti ufficiali; dove è un'inferenza è detto.

- **Un account claude.ai ha un solo collegamento GitHub alla volta.** Ricollegarlo sostituisce il precedente
  ([web quickstart](https://code.claude.com/docs/en/web-quickstart): "/web-setup warns you that continuing replaces that
  connection"); si scollega da [claude.ai/customize/connectors](https://claude.ai/customize/connectors). La GitHub App "Claude", invece, si installa su più
  account: va installata su ogni account che possiede repository privati da usare (stessa pagina).
- **Routine e notifiche stanno sull'account claude.ai che le crea**, e agiscono con l'identità GitHub collegata
  ([routines](https://code.claude.com/docs/en/routines)). Il telefono deve quindi essere entrato in **quell'** account
  claude.ai, e quell'account deve vedere il repo nuovo.
- **Che cosa fare.** Due strade:
  1. **Consigliata: un solo account claude.ai (quello del telefono), collegato all'account GitHub nuovo.** Da
     [claude.ai/customize/connectors](https://claude.ai/customize/connectors) si scollega GitHub e lo si ricollega con l'account nuovo; poi si installa l'App
     sul repo nuovo ([github.com/apps/claude](https://github.com/apps/claude)). Il costo: le sessioni su tattoo-shit
     con il vecchio account GitHub non possono più fare push finché non si ricollega quello (leggerlo resta possibile,
     è pubblico).
  2. **Si tiene il collegamento al vecchio account GitHub** e gli si dà accesso al repo nuovo: dall'account nuovo,
     l'App installata sul repo (*Only select repositories*) e il vecchio account aggiunto come collaboratore
     (*Settings* → *Collaborators*). Che basti è un'inferenza dalle regole di GitHub (un'App che agisce per un utente vede
     solo ciò che l'utente vede, [docs GitHub](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user)):
     **da provare** al passo U2, con una sessione che clona il repo nuovo. I commit risulteranno del vecchio account.
- Un secondo account claude.ai solo per l'implementazione è possibile, ma Routine, Progetto e notifiche starebbero lì e
  non sul telefono: sconsigliato.
- Il token a grana fine (U3) si crea sempre sull'account GitHub che possiede il repo.
