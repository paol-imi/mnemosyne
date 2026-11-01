# Simulazione: i file che l'importazione scriverebbe

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. **Non sono note vere**: ogni file sta in un blocco di
> codice preceduto dal suo percorso. Applica le [regole di importazione](/_progetto/v2/simulazione/regole-importazione.md)
> a un campione di [eredità](/_progetto/v2/eredita.md): i 31 frammenti suoi (U1–U31), lo sguardo (il nucleo, `s01`) e il
> racconto d'origine (`s03`), 8 convergenze, 21 nodi, le citazioni corrette secondo [citazioni](/_progetto/v2/citazioni.md),
> le 8 domande, il progetto tatuaggi. Gli attriti sono in [attriti](/_progetto/v2/simulazione/attriti-importazione.md).
> Lavoro diviso in sette lotti, uno per subagent; le scelte locali di un lotto sono dichiarate nel suo attrito.

## 0. Numeri dell'importazione completa e banco di prova


### Numeri

| tipo | file | conto |
|---|---|---|
| frammenti | **34** | 31 frasi sue U1–U31 (R1; U27–U31 anche per R3) + `s01` nucleo + `s02` brief + `s03` racconto M12 (R2, costanti §0) |
| letture | **34** | una per frammento, `letto: 2026-10-31`, `versione: 1`, `link` a `file:riga` del commit `4c9fdce` |
| nodi · persone | **9** | 7 `cerchia: mondo` (jordan-peterson, marco-aurelio, camus, napoleone, radiohead e deftones come gruppo [A 10], william-ernest-henley da U18) + sooraj-saxena (U25) + rust-cohle `cerchia: finzione` (`detta-da` di R7a) |
| nodi · opere | **6** | fma-brotherhood, true-detective-s1, berserk, invictus, divina-commedia (R5) + pensieri-marco-aurelio (`nomina` U24, `fruizione: in-corso`, R9) |
| nodi · citazioni | **2** | R7a: il monologo di Rust (U19) e "I don't sleep, I just dream" (U20); Invictus è opera, non citazione |
| nodi · temi | **23** | 10 emozioni di U1 (R11) + 8 concetti della lista U2 (sacrificio-anonimo, resilienza-napoleonica, condottiero, avventura, dissoluzione-dell-io, battaglie-interiori, bene-relativo, evoluzione) + stoicismo, romanticismo (U14, [A 9]) + amore, verita (U3) + esoterico (U10) |
| nodi · raccolte | **1** | `tatuaggi`: il progetto, con `serve-a` sui frammenti U18–U22 e sulle restituzioni R8 |
| **nodi in tutto** | **41** | 9 + 6 + 2 + 23 + 1 |
| restituzioni importate | **60** | 25 convergenze C1–C25 + 1 riserva (R4) + 31 candidati `tNN` (R8) + grimorio (R8) + `ritratto-citazioni` con 17 voci (R7b) + `ritratto-domande` con 8 voci (R13) |
| **totale** | **169** | 34 + 34 + 41 + 60; più la regola di U27–U31 e M11 nel `CLAUDE.md` del nuovo repo, e l'indice ricalcolato (non contati) |

Note sul conto:
- Le 4 emozioni di Claude, le 8 domande come temi, le 33 entità di §3.2 e i 8 riferimenti d'arte di §4 **non** diventano nodi:
  le 33 restano `mondo:` nelle voci; i riferimenti d'arte non hanno nessuna regola (vedi Buchi, 6).
- Delle 25 convergenze, 3 non toccano nessun nodo oltre al frammento d'aggancio (C10 il velo, C13 la cicala, C20 la calma
  scavata): tutte le loro voci sono `mondo:`.
- `divina-commedia` non ha un frammento da cui nascere: "Dante cristiano" (M8) non sta in `nucleo.md` (vedi Buchi, 3).
- Le 34 importate superano i 30 di `contesto/recenti.md`: al giorno 1 le 4 più vecchie restano fuori dai recenti.

### Le 25 domande

"Giorno 1" = dopo l'import, prima di ogni messaggio nuovo. Dove la domanda presuppone il banco (B01–B25 o una domanda
precedente), l'esito giudica **solo la parte che dipende dall'eredità**; la colonna "perché" dice che cosa viene dai nuovi.

| n. | domanda (breve) | materiale dall'import | esito | perché |
|---|---|---|---|---|
| D01 | cosa dice di me ciò che salvo | 31 frasi `sua` + nucleo `seme`, tutte fuori dai conti | sì | la risposta del giorno 1 è "ancora quasi niente di tuo" più il punto zero di ottobre; i conti veri vengono dai nuovi |
| D02 | le mie frasi, solo le mie | U1–U31 `voce: sua`; `s01`–`s03` a parte | sì | c'è tutto; ma 34 > 30 recenti: le frasi del seme vanno cercate nel tab Code (lacuna già nota) |
| D03 | stasera mi sento svuotato | tema `vuoto`; U1 "calma… dolore superato"; C20 ◌ | sì | la tua frase di conforto c'è ed è tua; manca solo la scelta per `polarita` (lacuna del modello, non dell'import) |
| D04 | cosa mi aveva aiutato | nessun `ritorna-su` `effetto` | sì | il vuoto è la risposta giusta; l'Atlante non ha niente del genere da perdere |
| D05 | mi ha fatto bene | nessuno | sì | dipende solo da D03; l'eredità non serve |
| D06 | Galimberti e lo spettacolo | nessuno | sì | tutto dai nuovi (B01, B02, B05); la frase ○ di Nietzsche viene dal mondo, il nodo `nietzsche` non serve |
| D07 | "ciò che ostacola diventa la via" | marco-aurelio; V,20 ed Eraclito fr. 60 come voci ◌ di `ritratto-citazioni`; C17, C18 | parziale | le due fonti chiave ci sono solo come voci di una lista di citazioni, non come convergenza; `eraclito` non è nodo e "Eraclito B60 accanto a Sisifo" è una convergenza muta; ✦ (B09, B11, B23) dai nuovi |
| D08 | perché mi avevi messo il Buddha | tema `rabbia`; C14 (senza Buddha) | parziale | il legame Buddha → rabbia nasce in `fonti/pensiero/buddha.md` (claude, morta): resta nell'Atlante. Si risponde solo se la restituzione di n.56 ha scritto il suo `perche` |
| D09 | dove le mie fonti si contraddicono | U3 (dolore); C2 ◌ con 2 tensioni su 3; Schopenhauer "pendolo dolore/noia" ◌ in `ritratto-citazioni` | parziale | le tre tensioni M8 non stanno in `nucleo.md`: R2 le perde; C2 ne porta due, "Dante cristiano vs assurdista" (`tensioni.md:17`) sparisce; la noia (B20) viene dai nuovi |
| D10 | il dolore nel tempo | U3, tema `dolore` | sì | giorno 1: "non lo so ancora" con la frase di ottobre; nota: U3 entra `sua` (✦ importato), il banco la segna ✧ |
| D11 | cosa pensavo a marzo | nessuno | sì | giorno 1: "l'archivio comincia il 4 ottobre"; il resto dai nuovi |
| D12 | sto cambiando idea | U3 come unico punto | sì | giorno 1: un punto solo, nessun cambio; dolore → noia dai nuovi |
| D13 | finito Delitto e castigo | camus (per *La caduta*), U11–U14 gusto | sì | Karamazov e il *Mondo* dai nuovi; *Delitto e castigo* nasce come nodo (nell'Atlante c'è solo come fonte di Claude, giustamente non importata) |
| D14 | top quote di Dostoevskij | U31 nomina Dostoevskij, ma senza nodo | parziale | "una top tua non c'è" regge; ma Dostoevskij è **nominato da lui** (U31) e manca dalle 13 di §3.1; le 2 citazioni ◌ dell'Atlante (`dostoevskij.md`, `fratelli-karamazov.md`) che il modello §7.6 dà per presenti restano fuori |
| D15 | è vera? | nessuno | sì | dipende da D14; nessun nodo da aggiornare (atteso) |
| D16 | canzoni sulla solitudine | radiohead, deftones (vuoti), tema `solitudine`, U13 "wave rock eterea" | sì | nessuna canzone salvata è la risposta giusta; il gusto per scegliere le ○ c'è; nell'Atlante non ci sono brani da perdere |
| D17 | salvami la terza | nessuno | sì | dipende da D16 |
| D18 | la seconda non c'entra | nessuno | sì | dipende da D16 |
| D19 | Berserk e Marco Aurelio | entrambi nodi; nucleo (U11, U12); ponti C3+C24 (via U5 la guida) e C17+C22 (via le battaglie interiori) | sì | "stessa lista del nucleo ✧" più 2-3 ponti ◌ a due passi attraverso un frammento d'aggancio |
| D20 | fammelo tatuaggio | raccolta `tatuaggi`, brief `s02`, U15–U17, 31 candidati e grimorio ◌ | sì | tutto ciò che serve a 1-3 strade c'è |
| D21 | tatuaggio da tutto su Sisifo | camus; "Sisifo felice" ◌ in `ritratto-citazioni`; C4, C16 e il candidato "La discesa di Sisifo" ◌ come testo | buco | `sisifo` non è nodo (è §3.2): il vicinato a 1–2 passi del modello §7.4 non si calcola, si trova solo per testo; Tiziano e von Stuck (riferimenti d'arte) non hanno regola e restano nell'Atlante; B10 dai nuovi |
| D22 | i rapporti, le persone | solo persone `mondo` | sì | giorno 1: "nessuna persona della tua vita", ed è vero |
| D23 | cosa non sto guardando | temi `gioia`, `amore`, `verita` a 0 nei conti | sì | giorno 1 "è presto" (importate fuori dai conti); la lacuna §7.5 vs §3.1 è del modello |
| D24 | cosa mi colpisce (E60) | nessuno | sì | tutto dai nuovi; padre e mare non sono nell'Atlante |
| D25 | Camus, cosa pensavo a novembre (E70) | camus; `s01` con "alla Camus" (M3) per il `contraddice` | sì | il nodo e il frammento-sguardo da contraddire ci sono; novembre dai nuovi |

Totale: **20 sì, 4 parziali, 1 buco.**


I buchi sono in [attriti](/_progetto/v2/simulazione/attriti-importazione.md), §2.

## 1. Frammenti U1–U10 (lotto A)

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Regole applicate:
> [regole di importazione](/_progetto/v2/simulazione/regole-importazione.md) R1, R5, R11.
> Fonte primaria di tutti e dieci: `diario/2026-10-04-seed.md` (il seme) al commit `4c9fdce`.
> Corpo = le parole della riga, senza il marcatore d'elenco, senza l'etichetta e lo slug messi da Claude
> e senza le code di Claude ("Fonti: …", "Collegamento con il Tao…", "vedi il mio percorso in 4.2"). Il grassetto resta.

##### `frammenti/2026/10/20261004-0000-u01.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato.
```

##### `letture/2026/10/20261004-0000-u01.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L282
contesto: "nel seme sotto «Il mio percorso interiore, con le mie parole (da conservare così com'è)»"
legami:
  - sente: solitudine
    voce: sua
    perche: "«solitudine»"
  - sente: vuoto
    voce: sua
    perche: "«senso di vuoto»"
  - sente: apatia
    voce: sua
    perche: "«apatia»"
  - sente: dolore
    voce: sua
    perche: "«dolore», e «l'immensità del dolore superato»"
  - sente: rabbia
    voce: sua
    perche: "«rabbia»"
  - sente: risentimento
    voce: sua
    perche: "«risentimento»"
  - sente: caos
    voce: sua
    perche: "«caos»"
  - sente: liberta
    voce: sua
    perche: "«libertà»"
  - sente: gioia
    voce: sua
    perche: "«gioia»"
  - sente: pace-interiore
    voce: sua
    perche: "«pace interiore nel guardare alle battaglie interiori»"
  - parla-di: battaglie-interiori
    voce: sua
    perche: "«battaglie interiori», due volte; «vincere se stessi», «le versioni di me morte lungo il percorso»"
  - parla-di: avventura
    voce: sua
    perche: "«Percorso, avventura»"
parole: [percorso, musica, consapevolezza, assurdita, dimensione-superiore]
---
```

##### `frammenti/2026/10/20261004-0000-u02.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
Ho buttato giù la mia lista: sacrificio anonimo, resilienza napoleonica, il condottiero, l'avventura, la dissoluzione dell'io, le battaglie interiori, il bene relativo, l'evoluzione.
```

##### `letture/2026/10/20261004-0000-u02.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L630
contesto: "forma forse ritoccata da Claude nel seme"
legami:
  - parla-di: sacrificio-anonimo
    voce: sua
    perche: "«sacrificio anonimo»"
  - parla-di: resilienza-napoleonica
    voce: sua
    perche: "«resilienza napoleonica»"
  - parla-di: napoleone
    come: metafora
    voce: sua
    perche: "«resilienza napoleonica»: Napoleone come immagine della resilienza"
  - parla-di: condottiero
    voce: sua
    perche: "«il condottiero»"
  - parla-di: avventura
    voce: sua
    perche: "«l'avventura»"
  - parla-di: dissoluzione-dell-io
    voce: sua
    perche: "«la dissoluzione dell'io»"
  - parla-di: battaglie-interiori
    voce: sua
    perche: "«le battaglie interiori»"
  - parla-di: bene-relativo
    voce: sua
    perche: "«il bene relativo»"
  - parla-di: evoluzione
    voce: sua
    perche: "«l'evoluzione»"
---
```

##### `frammenti/2026/10/20261004-0000-u03.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.**
```

##### `letture/2026/10/20261004-0000-u03.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L268
contesto: "nel seme sotto «La mia visione»"
legami:
  - parla-di: dolore
    voce: sua
    perche: "«la dimensione principale della realtà è il dolore»"
  - parla-di: amore
    voce: sua
    perche: "«cosa c'è oltre? Amore e verità»"
  - parla-di: verita
    voce: sua
    perche: "«cosa c'è oltre? Amore e verità»"
parole: [realta, oltre]
---
```

##### `frammenti/2026/10/20261004-0000-u04.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
sacrificarsi per altri o per un bene superiore, sapendo che chi ne beneficia non saprà mai chi è stato.
```

##### `letture/2026/10/20261004-0000-u04.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L315
contesto: "forma forse ritoccata da Claude nel seme; voce «Sacrificio anonimo» della sua lista"
legami:
  - parla-di: sacrificio-anonimo
    voce: sua
    perche: "definisce «sacrificio anonimo», voce della sua lista: «chi ne beneficia non saprà mai chi è stato»"
---
```

##### `frammenti/2026/10/20261004-0000-u05.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
il leader, la guida spirituale, la persona a cui affidarsi nelle difficoltà.
```

##### `letture/2026/10/20261004-0000-u05.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L325
contesto: "forma forse ritoccata da Claude nel seme; voce «il condottiero» della sua lista"
legami:
  - parla-di: condottiero
    voce: sua
    perche: "definisce «il condottiero»: «il leader, la guida spirituale»"
---
```

##### `frammenti/2026/10/20261004-0000-u06.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
voglia di esperienza, accettare di non avere risposte alle grandi domande, lasciarsi prendere dal fascino della vita, trovare valore nelle piccole cose.
```

##### `letture/2026/10/20261004-0000-u06.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L326
contesto: "forma forse ritoccata da Claude nel seme; voce «l'avventura» della sua lista"
legami:
  - parla-di: avventura
    voce: sua
    perche: "definisce «l'avventura»: «voglia di esperienza»"
parole: [esperienza, grandi-domande, piccole-cose]
---
```

##### `frammenti/2026/10/20261004-0000-u07.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
distacco dall'io occidentale, consapevolezza di essere parte di una forza più grande; questa vita come una delle tante manifestazioni della coscienza nell'infinità del tempo; elevazione e glorificazione di questo nuovo concetto di io.
```

##### `letture/2026/10/20261004-0000-u07.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L327
contesto: "forma forse ritoccata da Claude nel seme; voce «la dissoluzione dell'io» della sua lista"
legami:
  - parla-di: dissoluzione-dell-io
    voce: sua
    perche: "definisce «la dissoluzione dell'io»: «distacco dall'io occidentale»"
parole: [coscienza, io]
---
```

##### `frammenti/2026/10/20261004-0000-u08.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
Vincere se stessi, le versioni di me morte lungo il cammino.
```

##### `letture/2026/10/20261004-0000-u08.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L328
contesto: "forma forse ritoccata da Claude nel seme; voce «le battaglie interiori» della sua lista"
legami:
  - parla-di: battaglie-interiori
    voce: sua
    perche: "definisce «le battaglie interiori»: «vincere se stessi»"
  - ritorna-su: 20261004-0000-u01
    come: ripensa
    voce: sua
    perche: "riprende quasi alla lettera il percorso interiore: «vincere se stessi», «le versioni di me morte lungo il percorso»"
---
```

##### `frammenti/2026/10/20261004-0000-u09.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
non esiste un bene assoluto, ma solo relativo al negativo esplorato.
```

##### `letture/2026/10/20261004-0000-u09.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L329
contesto: "forma forse ritoccata da Claude nel seme; voce «il bene relativo» della sua lista"
legami:
  - parla-di: bene-relativo
    voce: sua
    perche: "«non esiste un bene assoluto, ma solo relativo al negativo esplorato»"
parole: [negativo]
---
```

##### `frammenti/2026/10/20261004-0000-u10.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
Mi attira il filone esoterico in cui si percepisce una coscienza elevata: guardando il tatuaggio deve nascere la sensazione che esistano risposte a domande che non ho, anzi **domande che ancora non so di volere**.
```

##### `letture/2026/10/20261004-0000-u10.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L258
contesto: "forma forse ritoccata da Claude nel seme («Preferenze emerse durante il lavoro»); ripresa in seme:633 come «la svolta»"
reazione:
  - parole: "Mi attira il filone esoterico"
    segnale: giudizio
    verso: "+"
legami:
  - parla-di: esoterico
    voce: sua
    perche: "«Mi attira il filone esoterico in cui si percepisce una coscienza elevata»"
parole: [coscienza-elevata, domande]
---
```

## 2. Frammenti U11–U20 e i primi nodi (lotto B)

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Applica [regole di importazione](/_progetto/v2/simulazione/regole-importazione.md)
> su [eredità §1.1](/_progetto/v2/eredita.md), righe al commit `4c9fdce`. Nessun file reale scritto.
> Scelte del lotto: corpo = solo le parole sue, senza il markup dell'Atlante (link interni resi in testo, `> ` e `\` delle
> citazioni tolti: vedi attriti B3, B4); `intento` `[niente]` per i profili del seme, `[salva]` per gusto e spunti (B6);
> "patchwork" e "incisione" restano `parole`, non temi (B7).

### Frammenti

##### `frammenti/2026/10/20261004-0000-u11.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
**Persone che hanno segnato la mia visione:** Jordan Peterson, Marco Aurelio, Albert Camus.
```

##### `frammenti/2026/10/20261004-0000-u12.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
**Serie e personaggi:** Fullmetal Alchemist: Brotherhood, True Detective, Berserk.
```

##### `frammenti/2026/10/20261004-0000-u13.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
**Musica:** Radiohead, Deftones, quella wave rock eterea e malinconica.
```

##### `frammenti/2026/10/20261004-0000-u14.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
**Territori di partenza:** filosofia (soprattutto correnti intense come stoicismo e romanticismo), religione (dal cristianesimo alle divinità greche), esoterismo e mistero, estratti da serie TV, anime, film cult e canzoni.
```

##### `frammenti/2026/10/20261004-0000-u15.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
**Metodo scelto:** prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro.
```

##### `frammenti/2026/10/20261004-0000-u16.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
- Mi piacciono le **patchwork sleeve**: pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera. Non le sleeve "fuse" con sfondo continuo.
```

##### `frammenti/2026/10/20261004-0000-u17.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
- **Incisione / xilografia antica** (`incisione-xilografia`) — linee e tratteggio incrociato alla Doré e Dürer, legni del Cinquecento. La direzione che mi attira di più.
```

##### `frammenti/2026/10/20261004-0000-u18.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
Invictus di William Ernest Henley, per intero. Un candidato se vorrò fare testi lunghi.

Out of the night that covers me,
Black as the pit from pole to pole,
I thank whatever gods may be
For my unconquerable soul.

In the fell clutch of circumstance
I have not winced nor cried aloud.
Under the bludgeonings of chance
My head is bloody, but unbowed.

Beyond this place of wrath and tears
Looms but the Horror of the shade,
And yet the menace of the years
Finds, and shall find me, unafraid.

It matters not how strait the gate,
How charged with punishments the scroll,
I am the master of my fate,
I am the captain of my soul.
```

##### `frammenti/2026/10/20261004-0000-u19.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
I think human consciousness is a tragic misstep in human evolution. We became too self aware; nature created an aspect of nature separate from itself. We are creatures that should not exist by natural law. We are things that labor under the illusion of having a self, a secretion of sensory experience and feeling, programmed with total assurance that we are each somebody, when in fact everybody’s nobody. I think the honorable thing for our species to do is deny our programming, stop reproducing, walk hand in hand into extinction, one last midnight, brothers and sisters opting out of a raw deal.
```

##### `frammenti/2026/10/20261004-0000-u20.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
True Detective, stagione 1, Rust Cohle: "I don't sleep, I just dream" (episodio 1, *The Long Bright Dark*).
```

### Letture

##### `letture/2026/10/20261004-0000-u11.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [niente]
vissuto: "≤2026-10-04, chat d'origine"
reazione:
  - parole: "hanno segnato la mia visione"
    segnale: identificazione
    verso: "+"
legami:
  - nomina: jordan-peterson
    voce: sua
    perche: "«Jordan Peterson»"
  - nomina: marco-aurelio
    voce: sua
    perche: "«Marco Aurelio»"
  - nomina: camus
    voce: sua
    perche: "«Albert Camus»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L253
contesto: "seme §4.1, profilo e punti di riferimento"
---
```

##### `letture/2026/10/20261004-0000-u12.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [niente]
vissuto: "≤2026-10-04, chat d'origine"
legami:
  - nomina: fma-brotherhood
    voce: sua
    perche: "«Fullmetal Alchemist: Brotherhood»"
  - nomina: true-detective-s1
    voce: sua
    perche: "«True Detective»"
  - nomina: berserk
    voce: sua
    perche: "«Berserk»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L254
contesto: "seme §4.1, profilo e punti di riferimento"
---
```

##### `letture/2026/10/20261004-0000-u13.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [niente]
vissuto: "≤2026-10-04, chat d'origine"
legami:
  - nomina: radiohead
    voce: sua
    perche: "«Radiohead»"
  - nomina: deftones
    voce: sua
    perche: "«Deftones»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L255
contesto: "seme §4.1, profilo e punti di riferimento"
parole: [wave rock, eterea, malinconica]
---
```

##### `letture/2026/10/20261004-0000-u14.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [niente]
vissuto: "≤2026-10-04, chat d'origine"
legami:
  - parla-di: stoicismo
    voce: sua
    perche: "«correnti intense come stoicismo e romanticismo»"
  - parla-di: romanticismo
    voce: sua
    perche: "«correnti intense come stoicismo e romanticismo»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L251
contesto: "seme §4.1, profilo e punti di riferimento"
parole: [filosofia, religione, cristianesimo, divinità greche, esoterismo, mistero, serie TV, anime, film cult, canzoni]
---
```

##### `letture/2026/10/20261004-0000-u15.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [niente]
vissuto: "≤2026-10-04, chat d'origine"
legami: []
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L249
contesto: "seme §4.1; è anche una regola di lavoro: già nel CLAUDE.md dell'Atlante (Come ragionare con me)"
parole: [macabro, puro]
---
```

##### `letture/2026/10/20261004-0000-u16.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
reazione:
  - parole: "Mi piacciono le patchwork sleeve"
    segnale: giudizio
    verso: "+"
  - parole: "Non le sleeve \"fuse\""
    segnale: giudizio
    verso: "−"
legami: []
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L259
contesto: "seme §4.1, preferenze emerse durante il lavoro"
parole: [patchwork sleeve, sleeve fusa, pelle libera, unica opera]
---
```

##### `letture/2026/10/20261004-0000-u17.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
reazione:
  - parole: "La direzione che mi attira di più"
    segnale: giudizio
    verso: "+"
legami: []
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L455
contesto: "seme §4.7, catalogo degli stili di Claude: riga mista, sua di certo solo «La direzione che mi attira di più»; slug e «alla Doré e Dürer, legni del Cinquecento» forse di Claude"
parole: [incisione, xilografia, tratteggio incrociato]
---
```

##### `letture/2026/10/20261004-0000-u18.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
reazione:
  - parole: "Un candidato se vorrò fare testi lunghi"
    segnale: giudizio
    verso: "+"
legami:
  - nomina: invictus
    voce: sua
    perche: "«Invictus … per intero»"
  - nomina: william-ernest-henley
    voce: sua
    perche: "«di William Ernest Henley»"
  - serve-a: tatuaggi
    voce: sua
    perche: "«Un candidato se vorrò fare testi lunghi»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/capitano-della-mia-anima/index.md#L25
contesto: "spunto «Il capitano della mia anima», origine mia; testo della poesia alle righe 27–45, che nell'Atlante sta solo qui"
---
```

##### `letture/2026/10/20261004-0000-u19.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
legami:
  - nomina: monologo-di-rust
    voce: sua
    perche: "il monologo trascritto per intero («come l'ho trascritta io», riga 26)"
  - serve-a: tatuaggi
    voce: proposta
    perche: "spunto per tatuaggio; qui non dice «tatuaggio» né «candidato» (lo dirà l'idea del monologo, U22)"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/true-detective-coscienza/index.md#L28
contesto: "spunto «La coscienza come passo falso» (origine seme, ma la trascrizione è sua); True Detective s1, ep. 1, in macchina con Marty"
parole: [coscienza, illusione del sé, estinzione]
---
```

##### `letture/2026/10/20261004-0000-u20.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
legami:
  - nomina: i-dont-sleep-i-just-dream
    voce: sua
    perche: "«I don't sleep, I just dream»"
  - nomina: true-detective-s1
    momento: "episodio 1, The Long Bright Dark"
    voce: sua
    perche: "«True Detective, stagione 1 … (episodio 1)»"
  - nomina: rust-cohle
    voce: sua
    perche: "«Rust Cohle»"
  - serve-a: tatuaggi
    voce: proposta
    perche: "spunto per tatuaggio; qui non dice «tatuaggio» né «candidato» (lo fa l'idea del sognatore, U21)"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/true-detective-sogno/index.md#L23
contesto: "spunto «Non dormo, sogno soltanto», origine mia; copia in idee/sognatore-insonne/index.md:27; il pin è U26"
---
```

### Nodi (R5, R7a)

##### `persone/william-ernest-henley.md`

```md
---
nome: William Ernest Henley
alias: [Henley, William Ernest Henley]
cerchia: mondo
nato-da: [20261004-0000-u18]
wikidata:
---
```

##### `persone/rust-cohle.md`

```md
---
nome: Rust Cohle
alias: [Rust, Rust Cohle]
cerchia: finzione
in: true-detective-s1
nato-da: [20261004-0000-u20]
wikidata:
---
```

##### `citazioni/monologo-di-rust.md`

```md
---
nome: Il monologo di Rust sulla coscienza
alias: [monologo di Rust, il monologo]
autore: Nic Pizzolatto
detta-da: rust-cohle
riferimento:
  opera: true-detective-s1
  luogo: "episodio 1, The Long Bright Dark, in macchina con Marty (da verificare)"
prova: memoria
nato-da: [20261004-0000-u19]
---
```

##### `citazioni/i-dont-sleep-i-just-dream.md`

```md
---
nome: I don't sleep, I just dream
alias: ["I don't sleep, I just dream"]
autore: Nic Pizzolatto
detta-da: rust-cohle
riferimento:
  opera: true-detective-s1
  luogo: "episodio 1, The Long Bright Dark (da verificare)"
prova: memoria
nato-da: [20261004-0000-u20]
---
```

## 3. U21–U31, lo sguardo e il racconto d'origine (lotto C)

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Nessun file del repository è stato toccato: i file qui
> sotto sono quelli che lo script d'importazione scriverebbe, secondo le [regole](/_progetto/v2/simulazione/regole-importazione.md)
> R1, R2, R3, R9, R10. Provenienza: commit `4c9fdce` (le righe citate coincidono con `HEAD`).
> Slug dei nodi usati e non scritti qui (li scrivono gli altri lotti): `jordan-peterson`, `marco-aurelio`, `camus`,
> `napoleone`, `radiohead`, `deftones`, `rust-cohle` (persone); `fma-brotherhood`, `true-detective-s1`, `berserk`,
> `divina-commedia`, `invictus` (opere); `stoicismo`, `romanticismo`, `avventura`, `evoluzione`, `amore`, `verita`,
> `esoterismo-e-mistero`, `dolore` (temi); `tatuaggi` (raccolta). Gli slug dei temi sono un'ipotesi: vedi gli attriti.

### 1. U21–U26: idee e ricerche (R1, R8, R9, R10)

##### `frammenti/2026/10/20261004-0000-u21.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
Una sagoma, il fumo della sigaretta, la frase.

1. Come giocare con il fumo della sigaretta?
2. Come disporre la sagoma rispetto al testo?
```

##### `letture/2026/10/20261004-0000-u21.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva, chiedi]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/sognatore-insonne/index.md#L38-L42"
contesto: "nell'Atlante le tre righe stanno nella Composizione del sognatore insonne; l'etichetta «Domande aperte (mie)» è di Claude e resta fuori dal corpo"
legami:
  - ritorna-su: 20261004-0000-u20
    come: aggiunge
    voce: sua
    perche: "«la frase» è I don't sleep, I just dream (U20)"
  - serve-a: tatuaggi
    voce: sua
    perche: "«una sagoma, il fumo della sigaretta, la frase»: la composizione di un tatuaggio (idea origine: mia)"
parole: [fumo, sagoma]
---
```

##### `frammenti/2026/10/20261004-0000-u22.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
1. Quanto tenere del testo?

da capire quanto poi tenere
```

##### `letture/2026/10/20261004-0000-u22.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva, chiedi]
link:
  - "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/monologo-di-rust/index.md#L33"
  - "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-05-revisione-seme.md#L30"
contesto: "due forme della stessa domanda: la prima è nella nota dell'idea, la seconda è citata da Claude nel diario (forse la più vicina al messaggio d'origine)"
legami:
  - ritorna-su: 20261004-0000-u19
    come: aggiunge
    voce: sua
    perche: "«il testo» è il monologo di Rust, che ha trascritto lui (U19)"
  - serve-a: tatuaggi
    voce: sua
    perche: "«quanto tenere del testo?»: la misura del testo da tatuare (idea origine: mia)"
---
```

##### `frammenti/2026/10/20261004-0000-u23.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
ti condivido due idee, entrambe legate a true detective
```

##### `letture/2026/10/20261004-0000-u23.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-05-revisione-seme.md#L30"
contesto: "citata da Claude nel diario del 2026-10-05; il messaggio era del 2026-10-04 e portava il sognatore insonne (U20, U21) e il monologo con la testa bendata (U19, U22, U26)"
legami:
  - nomina: true-detective-s1
    voce: sua
    perche: "«entrambe legate a true detective»"
  - serve-a: tatuaggi
    voce: sua
    perche: "«due idee»: le due idee di tatuaggio sue"
---
```

##### `frammenti/2026/10/20261004-0000-u24.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
Rileggere i Pensieri (le Meditazioni) cercando materiale per tatuaggi: frasi, immagini, convergenze.
```

##### `letture/2026/10/20261004-0000-u24.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/ricerche/pensieri-marco-aurelio/index.md#L7"
contesto: "è il campo `oggetto` della ricerca (stato: in-corso); i dodici passi trovati e il loro perché sono scelte di Claude e restano nell'Atlante (R12)"
legami:
  - nomina: pensieri-marco-aurelio
    fruizione: in-corso
    voce: sua
    perche: "«rileggere i Pensieri»; la ricerca dell'Atlante è segnata in-corso"
  - serve-a: tatuaggi
    voce: sua
    perche: "«cercando materiale per tatuaggi»"
---
```

##### `opere/pensieri-marco-aurelio.md`

```md
---
nome: Pensieri
alias: [Pensieri, Meditazioni, le Meditazioni, I Pensieri di Marco Aurelio]
autore: marco-aurelio
anno: 175   # composti tra il 170 e il 180 circa (da verificare)
nato-da: [20261004-0000-u24]
wikidata:
link:
  - "https://www.gutenberg.org/ebooks/15877"
  - "https://paol-imi.github.io/tattoo-shit/ricerche/pensieri-marco-aurelio/"
---
```

##### `frammenti/2026/10/20261004-0000-u25.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
L'account Instagram [@soorajsaxena](https://www.instagram.com/soorajsaxena/). Da cercare bene: c'è qualcosa di interessante?
```

##### `letture/2026/10/20261004-0000-u25.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/ricerche/soorajsaxena/index.md#L25"
contesto: "ricerca dell'Atlante, stato da-fare; i fatti trovati da Claude (non è un tatuatore, è un filmmaker) restano nell'Atlante (R12)"
legami:
  - nomina: sooraj-saxena
    fruizione: da-fare
    voce: sua
    perche: "«da cercare bene: c'è qualcosa di interessante?»"
---
```

##### `persone/sooraj-saxena.md`

```md
---
nome: Sooraj Saxena
alias: [soorajsaxena, "@soorajsaxena"]
cerchia: mondo
nato-da: [20261004-0000-u25]
wikidata:
link:
  - "https://www.instagram.com/soorajsaxena/"
  - "https://www.soorajsaxena.com/information"
  - "https://www.youtube.com/watch?v=t_lGJqloVp0"
  - "https://paol-imi.github.io/tattoo-shit/ricerche/soorajsaxena/"
---
Filmmaker e divulgatore (SHVKTI), molto tatuato; non è un tatuatore.
```

##### `frammenti/2026/10/20261004-0000-u26.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
https://www.pinterest.com/pin/970173944741790982/
https://www.pinterest.com/pin/150378075043142308/
```

##### `letture/2026/10/20261004-0000-u26.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
link:
  - "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/true-detective-sogno/index.md#L42"
  - "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/true-detective-coscienza/index.md#L65"
  - "https://www.pinterest.com/pin/970173944741790982/"
  - "https://www.pinterest.com/pin/150378075043142308/"
contesto: "descrizione di Claude: il primo pin è Rust a torso nudo che accende una sigaretta sotto un crocifisso appeso al muro spoglio, al centro la scritta «I don't sleep / I just dream» in caratteri da macchina da scrivere (va con il sognatore, U20–U21); il secondo è un'illustrazione a penna, testa bendata con capelli lunghi, rami e corna di cervo, una collana, sotto la scritta «True Detective» (va con il monologo, U19, U22)"
legami:
  - serve-a: tatuaggi
    voce: sua
    perche: "i due pin che ha portato con le sue due idee di tatuaggio"
---
```

### 2. U27–U31: frasi sul sistema (R3)

##### `frammenti/2026/10/20261005-0000-u27.md`

```md
---
registrato: 2026-10-05
canale: importato
voce: sua
---
le altre mi sembra che te le sia inventate tu di sana pianta
```

##### `letture/2026/10/20261005-0000-u27.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [correggi]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-05-revisione-seme.md#L11"
contesto: "guardando la bacheca, sulle idee del seme che il sito dava per sue: Claude aveva trattato «dal seme» come «approvato»"
legami: []
---
```

##### `frammenti/2026/10/20261004-0000-u28.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: sua
---
dimmi tu
```

##### `letture/2026/10/20261004-0000-u28.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [accogli]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-05-validazione.md#L40"
contesto: "affida a Claude la scelta su dove mettere la sua seconda idea (il monologo con la testa bendata); Claude la fonde come variante nell'alce di Zapffe, proposta sua. Il 2026-10-05 la variante torna una nota a sé (diario revisione-seme:30)"
legami: []
---
```

##### `frammenti/2026/10/20261006-0000-u29.md`

```md
---
registrato: 2026-10-06
canale: importato
voce: sua
---
Mi piacerebbe che la prossima wave fosse legata alle reference che ti ho dato, film/serie/personaggi.
```

##### `letture/2026/10/20261006-0000-u29.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [chiedi]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-06-nuove-proposte.md#L71"
contesto: "«le reference che ti ho dato» sono la sua lista: True Detective, Fullmetal Alchemist, Berserk, Napoleone (U12, U2)"
legami: []
---
```

##### `frammenti/2026/10/20261007-0000-u30.md`

```md
---
registrato: 2026-10-07
canale: importato
voce: sua
---
vai con la mappa
```

##### `letture/2026/10/20261007-0000-u30.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [accogli]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-07-atlante-dei-concetti.md#L11"
contesto: "approva la struttura proposta da Claude (le 8 domande e le 7 discipline); il contenuto (91 note, i cori) resta proposta. La proposta non è stata importata come restituzione distinta: l'atto non ha un referente"
legami: []
---
```

##### `frammenti/2026/10/20261031-0000-u31.md`

```md
---
registrato: 2026-10-31
canale: importato
voce: sua
---
canzoni su questo tema
le migliori citazioni di Dostoevskij
```

##### `letture/2026/10/20261031-0000-u31.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [chiedi]
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-31-memo-coscienza.md#L11"
contesto: "domande d'esempio per il memo-coscienza (il nuovo sistema), citate da Claude nel diario; non sono richieste fatte all'archivio"
legami: []
parole: [canzoni, citazioni, dostoevskij]
---
```

##### `CLAUDE.md` (sezione del nuovo repo)

```md
## Come vuole essere aiutato (dall'Atlante)

Regole dedotte dalle sue frasi sul sistema. Ogni regola rimanda al frammento che la fonda; M11 è una sintesi di Claude,
non una frase sua, e lo dice.

- **Le mie parole solo se sono mie.** Ciò che viene dalla chat d'origine (voce `seme`) o da te è proposta finché non
  lo riprendo: non trattarlo mai come mio o come approvato. *2026-10-05, [20261005-0000-u27](/frammenti/2026/10/20261005-0000-u27.md)
  («le altre mi sembra che te le sia inventate tu di sana pianta»).*
- **"Dimmi tu" non è un sì.** Quando ti lascio una scelta, la scelta resta una tua proposta (voce `proposta`) e non deve
  nascondere ciò che ho portato io: non fondere una mia idea dentro una tua proposta. *2026-10-04,
  [20261004-0000-u28](/frammenti/2026/10/20261004-0000-u28.md) («dimmi tu»; la fusione nell'alce di Zapffe è stata disfatta il 2026-10-05).*
- **Proposte dai miei riferimenti.** Quando proponi, parti dalle opere, serie e persone che ho nominato io, non da fonti
  scelte da te. *2026-10-06, [20261006-0000-u29](/frammenti/2026/10/20261006-0000-u29.md).*
- **Prima la struttura, con un mio sì.** Un cambio di struttura lo proponi e aspetti un sì esplicito; il sì alla struttura
  non approva i contenuti che ci metti dentro. *2026-10-07, [20261007-0000-u30](/frammenti/2026/10/20261007-0000-u30.md) («vai con la mappa»).*
- **Rispondi alle domande dirette.** Devo poter chiedere "canzoni su questo tema" o "le migliori citazioni di
  Dostoevskij" e avere una risposta dai miei frammenti e nodi, con le citazioni verificate o segnate. *2026-10-31,
  [20261031-0000-u31](/frammenti/2026/10/20261031-0000-u31.md).*
- **Di default solo ciò che è mio.** Mostrami ciò che ho detto o accolto; le proposte stanno a parte e le vedo quando le
  chiedo. *2026-10-05, M11: sintesi di Claude ("Il sito mostrava tutto, con i segni rossi: troppo caos"), nessun frammento;
  [diario validazione:53](https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-05-validazione.md#L53).*
```

### 3. Lo sguardo: il nucleo (R2)

##### `frammenti/2026/10/20261005-0000-s01.md`

```md
---
registrato: 2026-10-05
canale: importato
voce: seme
---
# Il nucleo

> Il mio punto di vista attuale. È vivo: si aggiorna quando cambio io.

> **Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.**

## Il filone

L'avventura. Il viaggio nell'esistenza, l'affrontare la realtà, l'evoluzione della propria filosofia.

## Dove sono ora

In uno stadio assurdista, alla [Camus](/fonti/pensiero/camus.md). Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo. Vedi [l'assurdo](/concetti/assurdo.md).

## La mia visione

La dimensione principale della realtà è il [dolore](/emozioni/dolore.md). Ma cosa c'è oltre? **[Amore](/concetti/amore.md) e [verità](/concetti/verita.md).**

## I tre movimenti

Il percorso principale: [il peso → lo sguardo → l'oltre](/percorsi/peso-sguardo-oltre.md).

1. **Il peso:** il dolore come dimensione fondamentale della realtà.
2. **Lo sguardo:** affrontarlo senza nascondersi, con [lucidità](/emozioni/lucidita.md).
3. **L'oltre:** amore e verità, che si trovano solo dopo averlo attraversato.

## La sfumatura esoterica

Il mistero non come risposta, ma come orizzonte. Non "il mondo non ha senso", ma "il mondo è più vasto di quello che posso capire, e questo mi affascina". Compatibile con l'assurdo: non pretende risposte, lascia aperta la soglia. Vedi [la soglia e il mistero](/concetti/soglia-e-mistero.md) e le [tensioni aperte](/concetti/tensioni.md).

## Avvertenza a me stesso

Il tatuaggio deve rappresentare il viaggio e l'atto di affrontare, non lo stadio assurdista in sé. Così resterà vero anche se la mia filosofia evolve.

## Il mio percorso interiore, con le mie parole

Battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato.

Vedi [battaglie interiori](/concetti/battaglie-interiori.md) e [le versioni di me morte lungo il cammino](/percorsi/versioni-morte.md).

## Metodo

Prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro.

**Territori di partenza:** filosofia (soprattutto correnti intense come [stoicismo](/fonti/pensiero/stoicismo.md) e [romanticismo](/fonti/pensiero/romanticismo.md)), religione (dal cristianesimo alle divinità greche), esoterismo e mistero, estratti da serie TV, anime, film cult e canzoni.

## Punti di riferimento

- **Persone che hanno segnato la mia visione:** [Jordan Peterson](/fonti/pensiero/jordan-peterson.md), [Marco Aurelio](/fonti/pensiero/marco-aurelio.md), [Albert Camus](/fonti/pensiero/camus.md).
- **Serie e personaggi:** [Fullmetal Alchemist: Brotherhood](/fonti/opere/fma-brotherhood.md), [True Detective](/fonti/opere/true-detective-s1.md), [Berserk](/fonti/opere/berserk.md).
- **Musica:** [Radiohead](/fonti/opere/radiohead.md), [Deftones](/fonti/opere/deftones.md), quella wave rock eterea e malinconica.

## Preferenze emerse

- Mi attira il filone esoterico in cui si percepisce una coscienza elevata: guardando il tatuaggio deve nascere la sensazione che esistano risposte a domande che non ho, anzi **domande che ancora non so di volere**.
- Mi piacciono le **[patchwork sleeve](/stile/patchwork.md)**: pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera. Non le sleeve "fuse" con sfondo continuo.
- Estetica che si sta delineando: nero, [incisione/xilografia antica](/stile/incisione-xilografia.md), mistero.

> [!NOTE]
> **Proposta di Claude, da validare.**
>
> L'idea che oggi tiene insieme tutto questo è [il grimorio](/idee/grimorio/index.md).
```

##### `letture/2026/10/20261005-0000-s01.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [sguardo]
vissuto: "≤2026-10-04, chat d'origine (seme:249–282); il nucleo è aggiornato il 2026-10-05"
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/nucleo.md#L7-L68"
contesto: "frammento-sguardo, voce seme: parole sue e sintesi di Claude (M1–M7) insieme a copie di frasi sue (U1, U3, U10–U17). Il blocco finale sul grimorio è una proposta di Claude: resta nel corpo per esattezza ma non genera legami (R6). I link del corpo puntano all'Atlante"
legami:
  - parla-di: dolore
    voce: seme
    perche: "M1, nucleo:11 «Attraversare il dolore a occhi aperti»; anche nucleo:23 e 29 (copia di U3)"
  - parla-di: amore
    voce: seme
    perche: "M1, nucleo:11 «trovare dall'altra parte amore e verità»; nucleo:31 l'oltre"
  - parla-di: verita
    voce: seme
    perche: "M1, nucleo:11 «amore e verità»; nucleo:31 l'oltre"
  - parla-di: avventura
    voce: seme
    perche: "M2, nucleo:15 «L'avventura. Il viaggio nell'esistenza»"
  - parla-di: evoluzione
    voce: seme
    perche: "M2, nucleo:15 «l'evoluzione della propria filosofia»; M6, nucleo:39 «anche se la mia filosofia evolve»"
  - nomina: camus
    voce: seme
    perche: "M3, nucleo:19 «In uno stadio assurdista, alla Camus»"
  - parla-di: esoterismo-e-mistero
    voce: seme
    perche: "M5, nucleo:35 «il mondo è più vasto di quello che posso capire, e questo mi affascina»; nucleo:61 (copia di U10)"
  - serve-a: tatuaggi
    voce: seme
    perche: "M6, nucleo:39 «Il tatuaggio deve rappresentare il viaggio e l'atto di affrontare»"
  - parla-di: stoicismo
    voce: seme
    perche: "nucleo:51, copia di U14 «correnti intense come stoicismo e romanticismo»"
  - parla-di: romanticismo
    voce: seme
    perche: "nucleo:51, copia di U14"
  - nomina: jordan-peterson
    voce: seme
    perche: "nucleo:55, copia di U11 «Persone che hanno segnato la mia visione»"
  - nomina: marco-aurelio
    voce: seme
    perche: "nucleo:55, copia di U11"
  - nomina: fma-brotherhood
    voce: seme
    perche: "nucleo:56, copia di U12 «Serie e personaggi»"
  - nomina: true-detective-s1
    voce: seme
    perche: "nucleo:56, copia di U12"
  - nomina: berserk
    voce: seme
    perche: "nucleo:56, copia di U12"
  - nomina: radiohead
    voce: seme
    perche: "nucleo:57, copia di U13 «quella wave rock eterea e malinconica»"
  - nomina: deftones
    voce: seme
    perche: "nucleo:57, copia di U13"
parole: [assurdo, nichilismo, lucidità, peso, sguardo, oltre, incisione, patchwork]
---
```

**Dove M1–M10 in un solo frammento non si agganciano.** Il passo vive solo nel `perche` («…», `nucleo:NN`): nessun campo
del modello punta a una riga del corpo.

- **M1–M7 condividono un id.** Le restituzioni R4 con aggancio M1 (C5 "dal buio alle stelle", C8 "a occhi aperti"),
  M3 (C9 "non nascondermi") e M5 (C10 il velo) hanno tutte `per: 20261005-0000-s01`: la vista non sa quale frase le regge,
  e "salvami la terza" su una di loro accoglie lo sguardo intero.
- **Il `superato` è per frammento.** Se un frammento suo contraddice M3 ("non sono più assurdista", E69), `contraddice`
  colpisce s01 tutto: anche M1 (la frase-formula) e M6 risulterebbero superati.
- **M8, M9, M10 non sono nel nucleo.** Stanno in `concetti/tensioni.md:15–17`, `concetti/virtu-e-fortuna.md:13–15`,
  `concetti/evoluzione-e-percorso.md:14`: il corpo di s01 non li contiene, e così i legami a `divina-commedia`
  (Dante, M8) e `napoleone` (M9) non hanno testo su cui poggiare. Non li ho scritti.
- **M4** (nucleo:29–31) è un elenco di tre movimenti: un legame a `dolore` non dice se è "il peso" o "l'oltre".
- **Copie dentro lo sguardo.** Le righe 43 (U1), 23 (U3), 49–62 (U10–U17) duplicano frammenti suoi: i legami alle 13 fonti
  esistono già con voce `sua` (U11–U14) e qui ricompaiono con voce `seme`, più debole.

### 4. Il racconto della chat d'origine (M12)

##### `frammenti/2026/10/20261004-0000-s03.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: seme
---
**Come è nato il progetto.** Conversazione con Claude, in cui il percorso è andato così:
1. Ho chiesto aiuto per trovare un concetto (non un soggetto) per un tatuaggio: filosofia, religione, esoterismo, pop culture. Metodo concordato: prima il concetto, poi il soggetto.
2. Primi territori proposti: memento mori, amor fati, sublime, caduta e redenzione, morte e rinascita, prezzo della conoscenza, dualità.
3. Ho buttato giù la mia lista: sacrificio anonimo, resilienza napoleonica, il condottiero, l'avventura, la dissoluzione dell'io, le battaglie interiori, il bene relativo, l'evoluzione. Più i miei riferimenti (Peterson, Marco Aurelio, Camus, FMA, True Detective, Berserk, Radiohead, Deftones).
4. È emerso un nucleo: il viaggio, l'affrontare la realtà, lo stadio assurdista non nichilista, il dolore come dimensione principale e, oltre, amore e verità.
5. Proposte artistiche: sleeve dantesca, discesa di Sisifo, Prigioni di Michelangelo, Psiche di Canova, Verità di Bernini, Porta della Verità.
6. Svolta: mi attira l'esoterico con una coscienza elevata, le "domande che non so di volere". Nuove reference: incisione Flammarion, Melencolia, velo di Iside, Ofanim, Mutus Liber, Fludd, Blake.
7. Ragionamento sulla sleeve coesa, poi chiarimento: mi piacciono le patchwork. Nasce l'idea del grimorio.
8. Decisione di spostare tutto in un repository GitHub gestito con Claude Code, per collegare Pinterest e ragionamenti e avere uno storico.
```

##### `letture/2026/10/20261004-0000-s03.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [niente]
vissuto: "≤2026-10-04, chat d'origine"
link: "https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L627-L635"
contesto: "storia del progetto, scritta da Claude con la sua voce nel seme (§4.11); copiata quasi uguale, con i link, in diario/2026-10-04-origine.md:15–22. I passi 2, 5 e 7 (la seconda frase) sono proposte dell'assistente; il passo 3 contiene U2 e il passo 6 U10, che sono frammenti a sé"
legami: []
---
```

## 4. Otto convergenze come restituzioni (lotto D)

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Nessun file esistente toccato.
> Regola applicata: R4 di [regole-importazione](/_progetto/v2/simulazione/regole-importazione.md), con R5 (solo i nodi
> ammessi) e R6 (voce `proposta` per le idee di Claude). Data = `creato` della nota d'origine (per i passi su più note:
> la prima, tutte con lo stesso `creato`). Righe dei passi: [eredità §2](/_progetto/v2/eredita.md).

##### `restituzioni/2026/10/r-20261004-0000-ritratto-c01.md`

Fonte: `concetti/sacrificio-anonimo.md:16–26` (`creato: 2026-10-04`, nota di mappa del seme).

```md
---
forma: ritratto
importata: true
per: 20261004-0000-u04
voci:
  - n: 1
    mondo: "Lamed Vav, i 36 giusti nascosti (tradizione ebraica)"
  - n: 2
    mondo: "Maimonide, gli otto livelli della carità"
  - n: 3
    mondo: "Vangelo di Matteo 6,3"
  - n: 4
    rif: marco-aurelio
  - n: 5
    mondo: "Tao Te Ching, cap. 17"
  - n: 6
    mondo: "Kṣitigarbha (Jizō)"
  - n: 7
    mondo: "Il Milite Ignoto"
  - n: 8
    rif: fma-brotherhood
legami:
  - converge-con:
      tra: [20261004-0000-u04, marco-aurelio, fma-brotherhood]
    voce: seme
    perche: "il sacrificio il cui valore sta nell'anonimato"
---

Sacrificarsi per altri o per un bene superiore, sapendo che chi ne beneficia non saprà mai chi è stato.

Fonti:
- *Lamed Vav*: nella tradizione ebraica esistono sempre 36 giusti nascosti, e il mondo esiste grazie a loro; nessuno sa chi siano, spesso nemmeno loro. Si scrive ל״ו.
- *Maimonide*: nella scala degli otto livelli della carità, uno dei più alti è il dono in cui né chi dà né chi riceve conosce l'altro.
- *Vangelo di Matteo (6,3)*: non sappia la tua sinistra ciò che fa la tua destra.
- *Marco Aurelio, Meditazioni V.6*: l'uomo buono è come la vite che produce l'uva e non chiede altro, poi passa alla stagione successiva.
- *Tao Te Ching, cap. 17*: del miglior leader, a lavoro compiuto, il popolo dice "l'abbiamo fatto da soli".
- *Kṣitigarbha (Jizō)*: il bodhisattva che fa voto di non raggiungere la buddhità finché gli inferi non saranno vuoti.
- *Il Milite Ignoto*: il sacrificio il cui valore sta nell'anonimato.
- *Fullmetal Alchemist: Brotherhood*: nel finale Ed rinuncia per sempre alla propria alchimia (la sua Porta) per riavere il fratello. Rinuncia al potere che lo definiva.
```

##### `restituzioni/2026/10/r-20261004-0000-ritratto-c05.md`

Fonti: `fonti/opere/divina-commedia.md:21–26`, `percorsi/dal-dolore-alle-stelle.md:14`, `idee/sleeve-dantesca/index.md:26, 36`
(tutte `creato: 2026-10-04`; le prime due di mappa, la terza un'idea `origine: seme`, `validata: false`).

```md
---
forma: ritratto
importata: true
per: 20261005-0000-s01
voci:
  - n: 1
    rif: divina-commedia
  - n: 2
    rif: rust-cohle
legami:
  - converge-con:
      tra: [20261005-0000-s01, divina-commedia, rust-cohle]
    voce: seme
    perche: "La stessa uscita, a settecento anni di distanza."
---

La struttura archetipica del viaggio dal dolore all'amore e alla verità.

Tutte e tre le cantiche finiscono con la parola "stelle":
- l'uscita dall'Inferno, "a riveder le stelle";
- il Purgatorio, "puro e disposto a salire a le stelle";
- il Paradiso, con "l'amor che move il sole e l'altre stelle".

Dante che esce "a riveder le stelle", Rust che nel finale guarda il cielo. La stessa uscita, a settecento anni di distanza.

La Commedia come struttura archetipica del viaggio dal dolore all'amore e alla verità. Le tre cantiche finiscono tutte con "stelle": il dolore attraversato porta all'amore.

Ponte con True Detective: Rust che esce dal buio e guarda le stelle.
```

##### `restituzioni/2026/10/r-20261004-0000-ritratto-c08.md`

Fonti: `concetti/prezzo-della-conoscenza.md:15–17`, `idee/porta-della-verita/index.md:26` (entrambe `creato: 2026-10-04`;
la seconda è un'idea `origine: seme`, `validata: false`).

```md
---
forma: ritratto
importata: true
per: 20261005-0000-s01
voci:
  - n: 1
    mondo: "Prometeo"
  - n: 2
    mondo: "Odino che sacrifica un occhio"
  - n: 3
    mondo: "L'albero della conoscenza (Genesi)"
  - n: 4
    rif: fma-brotherhood
legami:
  - converge-con:
      tra: [20261005-0000-s01, fma-brotherhood]
    voce: seme
    perche: "La lucidità pagata cara."
---

La lucidità pagata cara.

Fonti: Prometeo, Odino che sacrifica un occhio, l'albero della conoscenza, la Porta della Verità di Fullmetal Alchemist.

Lo scambio equivalente: la verità si paga, e la si può guardare solo dopo aver perso qualcosa. Il riferimento a Fullmetal Alchemist resta nascosto: chi conosce l'anime lo riconosce, chi non lo conosce vede un simbolo esoterico.
```

##### `restituzioni/2026/10/r-20261004-0000-ritratto-c11.md`

Fonti: `simboli/ouroboros.md:14–16`, `concetti/eterno-ritorno.md:14` (entrambe `creato: 2026-10-04`, mappa).

```md
---
forma: ritratto
importata: true
per: 20261004-0000-u07
voci:
  - n: 1
    rif: fma-brotherhood
  - n: 2
    rif: true-detective-s1
  - n: 3
    mondo: "Nietzsche, l'eterno ritorno"
  - n: 4
    mondo: "L'alchimia"
legami:
  - converge-con:
      tra: [20261004-0000-u07, fma-brotherhood, true-detective-s1]
    voce: seme
    perche: "Un unico simbolo antico tiene insieme quasi tutti i miei riferimenti."
---

**Convergenza notevole.** È il simbolo degli Homunculus in Fullmetal Alchemist, richiama il "tempo come cerchio piatto" di True Detective, l'eterno ritorno di Nietzsche, l'alchimia, e la mia idea della coscienza che si manifesta in infinite vite.

Un unico simbolo antico tiene insieme quasi tutti i miei riferimenti.

Nietzsche; il "tempo è un cerchio piatto" di True Detective; l'ouroboros.
```

##### `restituzioni/2026/10/r-20261006-0000-ritratto-c13.md`

Fonte: `idee/mute-della-cicala/index.md:27–31, 45–48` (`creato: 2026-10-06`, `origine: claude`).

```md
---
forma: ritratto
importata: true
per: 20261004-0000-u08
voci:
  - n: 1
    mondo: "Platone, Fedro 259b-d"
  - n: 2
    mondo: "Cicale di giada della dinastia Han"
  - n: 3
    mondo: "Utsusemi, Genji monogatari cap. 3"
  - n: 4
    mondo: "Il serpente che muta, morte e rinascita"
legami:
  - converge-con:
      tra: [20261004-0000-u08]
    voce: proposta
    perche: "Le versioni di me morte non sono cadaveri ma gusci vuoti, ancora aggrappati al ramo."
---

Le versioni di me morte non sono cadaveri ma gusci vuoti, ancora aggrappati al ramo. E quello che ne è uscito canta.

## Da dove nasce

Dal tuo percorso interiore, nel nucleo: "pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso". E da una parola che nella stessa riga sta in mezzo al cammino e che nell'archivio non ha ancora prodotto niente: "musica".

- **Platone, *Fedro*** (259b-d): le cicale erano uomini che, quando nacquero le Muse e il canto, ne furono così presi da dimenticarsi di mangiare e bere, fino a morire. Da loro nacque la stirpe delle cicale, che canta dalla nascita alla morte e poi riferisce alle Muse chi le ha onorate. La musica come ciò per cui vale la pena consumarsi.
- **Cina, dinastia Han:** cicale di giada poste sulla lingua dei defunti, come augurio di rinascita: l'insetto che vive anni sotto terra, risale e lascia il guscio.
- **Giappone, *utsusemi*:** il guscio vuoto della cicala, e insieme "questa vita, questo mondo". È il titolo del terzo capitolo del *Genji monogatari*.
- **Il serpente che muta**, già nell'archivio, e morte e rinascita: qui però la vecchia pelle non si butta, resta sul ramo, guardata.
```

##### `restituzioni/2026/10/r-20261004-0000-ritratto-c16.md`

Fonti: `fonti/arte/friedrich-monaco.md:17`, `fonti/opere/berserk.md:17`, `fonti/pensiero/camus.md:22`,
`idee/discesa-di-sisifo/index.md:26–32` (tutte `creato: 2026-10-04`; l'ultima è un'idea `origine: seme`, `validata: false`).

```md
---
forma: ritratto
importata: true
per: 20261005-0000-s01
voci:
  - n: 1
    mondo: "Caspar David Friedrich, Monaco in riva al mare e Viandante sul mare di nebbia"
  - n: 2
    rif: berserk
  - n: 3
    rif: camus
legami:
  - converge-con:
      tra: [20261005-0000-s01, berserk, camus]
    voce: seme
    perche: "Forse il quadro più \"assurdista\" mai dipinto, più di un secolo prima di Camus."
---

Una figura minuscola davanti a mare e cielo vuoti. Forse il quadro più "assurdista" mai dipinto, più di un secolo prima di Camus.

Chi lotta contro un destino crudele senza piegarsi (il "Lottatore"); in fondo un mito di Sisifo.

**Dettaglio chiave dal *Mito di Sisifo*:** il momento che interessa a Camus non è la spinta in salita, ma la **discesa**, quando Sisifo torna a riprendere il masso, consapevole. È l'ora della coscienza, quella in cui è superiore al proprio destino.

L'ora della coscienza. Non il Sisifo che spinge, ma quello che torna giù, lucido. Il mio "non nascondermi, affrontarlo".

## Composizione

Pezzo singolo verticale. Sisifo di spalle che scende il pendio, il masso fermo in cima dietro di lui, un cielo enorme davanti. La composizione del Viandante di Friedrich, ma con il peso alle spalle invece che l'ignoto davanti.

**Variante minimale e assurdista:** una figura minuscola davanti a un mare e un cielo immensi e vuoti, quasi tutto spazio negativo (dal Monaco in riva al mare di Friedrich).
```

##### `restituzioni/2026/10/r-20261006-0000-ritratto-c22.md`

Fonte: `idee/lotta-al-guado/index.md:27–31, 41, 45–48` (`creato: 2026-10-06`, `origine: claude`).

```md
---
forma: ritratto
importata: true
per: 20261004-0000-u01
voci:
  - n: 1
    mondo: "Giacobbe al guado dello Iabbok, Genesi 32,23-33"
  - n: 2
    rif: jordan-peterson
  - n: 3
    rif: berserk
  - n: 4
    mondo: "Giacobbe e l'angelo nell'arte: Rembrandt, Delacroix, Gauguin, Doré"
legami:
  - converge-con:
      tra: [20261004-0000-u01, jordan-peterson, berserk]
    voce: proposta
    perche: "Non si vince abbattendo l'avversario, ma non lasciandolo andare finché non ti dà qualcosa: una ferita e un nome nuovo."
---

La battaglia interiore combattuta fino all'alba. Non si vince abbattendo l'avversario, ma non lasciandolo andare finché non ti dà qualcosa: una ferita e un nome nuovo.

## Da dove nasce

"Battaglie interiori" è la prima parola del tuo percorso interiore, nel nucleo, e "vincere se stessi" l'ultima del secondo movimento. Nella tua lista le battaglie interiori stanno accanto a Peterson e a Berserk.

Nell'acqua del guado il riflesso dell'angelo non è un angelo: è un **segugio nero**, la Bestia dell'oscurità di Berserk, la rabbia di Guts che vive dentro di lui. Chi non conosce l'opera vede un'ombra inquieta; chi la conosce capisce contro chi si stava lottando.

- **Genesi 32,23-33** (32,22-32 in altre numerazioni): Giacobbe lotta tutta la notte al guado dello Iabbok con "un uomo"; l'anca gli viene slogata; non lo lascia andare finché non lo benedice; riceve il nome Israele, "colui che lotta con Dio"; l'avversario non dice il suo nome; il luogo diventa Penuel, "volto di Dio". Osea 12 lo chiama angelo.
- **Jordan Peterson:** *Jacob: Wrestling with God*, una lezione della sua serie sulla Bibbia (2017), e il libro *We Who Wrestle with God* (2024).
- **Berserk:** la Bestia dell'oscurità, un grande cane-lupo nero dagli occhi rossi, è l'odio e la sete di sangue di Guts, l'avversario interno che non si uccide ma si tiene a bada.
- **Nell'arte:** Rembrandt (1659), Delacroix (Saint-Sulpice, 1861), Gauguin (*La visione dopo il sermone*, 1888) e Doré, nella sua *Bibbia* (1866, incisione di C. Laplante): un soggetto che l'incisione ha già amato.
```

##### `restituzioni/2026/10/r-20261004-0000-ritratto-c25.md`

Fonte: `idee/sognatore-insonne/index.md:65–67` (blocco proposta in una nota `origine: mia`, `creato: 2026-10-04`;
il blocco è del 2026-10-06, commit `5614055`).

```md
---
forma: ritratto
importata: true
per: 20261004-0000-u20
voci:
  - n: 1
    rif: rust-cohle
  - n: 2
    mondo: "Il Getsemani, Matteo 26,36-46"
  - n: 3
    mondo: "Il Buddha, il risvegliato sotto l'albero"
  - n: 4
    mondo: "Eraclito, fr. B89"
legami:
  - converge-con:
      tra: [20261004-0000-u20, rust-cohle]
    voce: proposta
    perche: "Lo stesso uomo sveglio sotto un albero torna altrove."
---

**L'ora nel giardino**, una risposta possibile alla domanda sul crocifisso. Lo spiega Rust stesso, nel primo episodio: Marty gli chiede perché tenga una croce in casa, se non è cristiano, e lui risponde che è una forma di meditazione, "I contemplate the moment in the garden, the idea of allowing your own crucifixion". Il giardino è il Getsemani (Matteo 26,36-46): l'unico sveglio mentre gli altri dormono, "restate qui e vegliate con me". Il nome viene dall'aramaico *gat shemanim*, "frantoio per l'olio": la pressione che fa l'olio della lampada.

Una scena per il sognatore: un olivo antico, il tronco cavo e attorcigliato, di notte, in incisione. Seduta contro il tronco, la sagoma con gli occhi aperti; l'unica luce è la brace della sigaretta, e il fumo sale tra i rami. La croce non è disegnata: è il buio tra due rami, in spazio negativo. Chi non conosce la serie vede un uomo che veglia sotto un olivo. Lo stesso uomo sveglio sotto un albero torna altrove: il Buddha, "il risvegliato"; ed Eraclito, per cui i desti hanno un mondo comune e chi dorme si volge ciascuno al proprio (fr. B89).
```

#### Conti

| C | voci a nodo | voci al mondo | nodi nel converge-con | muta? |
|---|---|---|---|---|
| C1 | 2 | 6 | 2 (marco-aurelio, fma-brotherhood) | no |
| C5 | 2 | 0 | 2 (divina-commedia, rust-cohle) | no |
| C8 | 1 | 3 | 1 (fma-brotherhood) | **sì** |
| C11 | 2 | 2 | 2 (fma-brotherhood, true-detective-s1) | no |
| C13 | 0 | 4 | 0 | **sì** (il legame ha un solo capo) |
| C16 | 2 | 1 | 2 (berserk, camus) | no |
| C22 | 2 | 2 | 2 (jordan-peterson, berserk) | no |
| C25 | 1 | 3 | 1 (rust-cohle) | **sì** |
| **totale** | **12** | **21** | | **3 su 8** |

Il frammento d'aggancio non è contato tra i nodi. Le 12 voci a nodo si reggono su 8 slug: fma-brotherhood (3),
berserk (2), rust-cohle (2), gli altri una volta.

## 5. Quindici nodi, le citazioni e le domande (lotto E)

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Non tocca note né script. Applica
> [regole di importazione](/_progetto/v2/simulazione/regole-importazione.md) R5, R7b, R11, R12, R13 con
> [modello](/_progetto/v2/modello.md) §2.2, §2.5–2.6, §8.5, [eredità](/_progetto/v2/eredita.md) §1.1 e §3,
> [citazioni](/_progetto/v2/citazioni.md) §1 e §4. Commit di riferimento `4c9fdce`.
>
> Criteri usati per `nato-da` (coerenti con i lotti A e B):
> - un id entra solo se il **corpo** del frammento nomina il nodo. U2 si ferma a "l'evoluzione." (lotto A): la coda
>   "Più i miei riferimenti (Peterson, Marco Aurelio, …)" non è nel frammento. U20 invece contiene "True Detective,
>   stagione 1" (lotto B). U19 (il monologo) non nomina la serie. U24 nomina i *Pensieri*, che sono l'opera
>   `pensieri-marco-aurelio` (lotto G), non la persona.
> - nel nucleo `s01` contano solo i passi M (M1, M3, M4): le copie di U3, U11–U14 e U1 dentro il nucleo non generano
>   nulla, come R2 [A 3] dice per U1. Così `s01` sta in `camus` (M3 "alla Camus"), `dolore` (M1, M4), `nichilismo` (M3).
> - `s03` (racconto M12, seme:627–635) conta solo per ciò che non copia U2: "non nichilista" (punto 4), "sleeve
>   dantesca" (punto 5, che però riferisce una proposta di Claude).
> - niente `wikidata` (consolidamento). Le persone non hanno `anno`: l'`anno` dell'Atlante sulle persone era un floruit
>   e il modello non lo prevede.

### Nodi

##### `persone/marco-aurelio.md`

```md
---
nome: Marco Aurelio
alias: [Marco Aurelio]
cerchia: mondo
nato-da: [20261004-0000-u11]
link: https://paol-imi.github.io/tattoo-shit/fonti/pensiero/marco-aurelio
---
Imperatore romano e filosofo stoico, autore dei Pensieri (A se stesso).
```

##### `persone/camus.md`

```md
---
nome: Albert Camus
alias: [Albert Camus, Camus]
cerchia: mondo
nato-da: [20261004-0000-u11, 20261005-0000-s01]
link: https://paol-imi.github.io/tattoo-shit/fonti/pensiero/camus
---
Scrittore e filosofo francese dell'assurdo.
```

##### `persone/jordan-peterson.md`

```md
---
nome: Jordan Peterson
alias: [Jordan Peterson, Peterson]
cerchia: mondo
nato-da: [20261004-0000-u11]
link: https://paol-imi.github.io/tattoo-shit/fonti/pensiero/jordan-peterson
---
Psicologo canadese.
```

##### `persone/napoleone.md`

```md
---
nome: Napoleone Bonaparte
alias: [napoleonica]        # la sola forma sua: «resilienza napoleonica» (U2), un aggettivo
cerchia: mondo
nato-da: [20261004-0000-u02]
link: https://paol-imi.github.io/tattoo-shit/fonti/pensiero/napoleone
---
```

##### `persone/radiohead.md`

```md
---
nome: Radiohead
alias: [Radiohead]
cerchia: mondo              # un gruppo come persona [A 10]
nato-da: [20261004-0000-u13]
link: https://paol-imi.github.io/tattoo-shit/fonti/opere/radiohead
---
Gruppo rock inglese.
```

##### `opere/true-detective-s1.md`

```md
---
nome: True Detective, stagione 1
alias: [True Detective, true detective, "True Detective, stagione 1"]
autore: Nic Pizzolatto
anno: 2014
nato-da: [20261004-0000-u12, 20261004-0000-u20, 20261004-0000-u23]
link: https://paol-imi.github.io/tattoo-shit/fonti/opere/true-detective-s1
---
Serie TV HBO, prima stagione (Rust Cohle e Marty Hart).
```

##### `opere/fma-brotherhood.md`

```md
---
nome: "Fullmetal Alchemist: Brotherhood"
alias: ["Fullmetal Alchemist: Brotherhood", FMA]   # «FMA» sta solo in s03/seme:630, fuori da U2: vedi attriti
autore: Hiromu Arakawa      # il manga; la serie è dello studio Bones
anno: 2009
nato-da: [20261004-0000-u12]
link: https://paol-imi.github.io/tattoo-shit/fonti/opere/fma-brotherhood
---
Serie anime tratta dal manga di Hiromu Arakawa.
```

##### `opere/divina-commedia.md`

```md
---
nome: Divina Commedia
alias: [dantesca]           # «sleeve dantesca», s03 punto 5; «Dante cristiano» (M8) non è in nessun frammento
autore: Dante Alighieri     # in chiaro: `dante` non diventa nodo
anno: 1321
nato-da: []                 # nessun frammento la nomina: vedi attriti (s03 debole, oppure s04 del lotto G)
link: https://paol-imi.github.io/tattoo-shit/fonti/opere/divina-commedia
---
```

##### `opere/invictus.md`

```md
---
nome: Invictus
alias: [Invictus]
autore: william-ernest-henley   # il nodo nasce da U18 (lotto B)
anno: 1888                       # scritta nel 1875, pubblicata nel 1888
nato-da: [20261004-0000-u18]
link: https://paol-imi.github.io/tattoo-shit/fonti/opere/invictus
---
Poesia di William Ernest Henley.
```

##### `opere/berserk.md`

```md
---
nome: Berserk
alias: [Berserk]
autore: Kentaro Miura
anno: 1989
nato-da: [20261004-0000-u12]
link: https://paol-imi.github.io/tattoo-shit/fonti/opere/berserk
---
Manga di Kentaro Miura.
```

##### `temi/stoicismo.md`

```md
---
nome: stoicismo
alias: []
nato-da: [20261004-0000-u14]
link: https://paol-imi.github.io/tattoo-shit/fonti/pensiero/stoicismo
---
```

##### `temi/dolore.md`

```md
---
nome: dolore
alias: []
nato-da: [20261004-0000-u01, 20261004-0000-u03, 20261005-0000-s01]   # R11 dice solo u01: vedi attriti
link: https://paol-imi.github.io/tattoo-shit/emozioni/dolore
---
```

##### `temi/battaglie-interiori.md`

```md
---
nome: battaglie interiori
alias: []
nato-da: [20261004-0000-u01, 20261004-0000-u02, 20261004-0000-u08]
link: https://paol-imi.github.io/tattoo-shit/concetti/battaglie-interiori
---
```

##### `temi/sacrificio-anonimo.md`

```md
---
nome: sacrificio anonimo
alias: [Sacrificio anonimo]
nato-da: [20261004-0000-u02, 20261004-0000-u04]
link: https://paol-imi.github.io/tattoo-shit/concetti/sacrificio-anonimo
---
```

##### `temi/nichilismo.md`

```md
---
nome: nichilismo
alias: [nichilista]         # «non nichilista», s03 punto 4
nato-da: [20261005-0000-s01, 20261004-0000-s03]   # solo voce seme (M3 «Non nichilismo», M12); nessuna U1–U31
---
```

Nessun `link`: l'Atlante non ha una nota sul nichilismo.

### Restituzioni

##### `restituzioni/2026/10/r-20261007-0000-ritratto-citazioni.md`

```md
---
forma: ritratto
importata: true
voci:
  - n: 1
    rif: divina-commedia
    testo: "E quindi uscimmo a riveder le stelle."
    riferimento: "Inferno XXXIV, 139"
    prova: memoria
    voce: proposta
  - n: 2
    rif: true-detective-s1
    testo: "Una volta c'era solo il buio. Se vuoi saperlo, la luce sta vincendo."
    traduttore: resa di Claude
    originale: "Once, there was only dark. If you ask me, the light's winning. (da verificare sui sottotitoli)"
    detta-da: Rust Cohle
    riferimento: "ep. 8, «Form and Void» (2014)"
    prova: memoria
    voce: proposta
  - n: 3
    rif: camus
    testo: "Bisogna immaginare Sisifo felice."
    traduttore: "(traduzione da verificare)"
    riferimento: "Il mito di Sisifo (1942), ultima frase"
    prova: memoria
    voce: proposta
  - n: 4
    mondo: "Eraclito"
    testo: "La via in su e la via in giù sono una e la stessa."
    traduttore: "(traduzione da verificare)"
    riferimento: "fr. 60 DK"
    prova: memoria
    voce: proposta
  - n: 5
    rif: jordan-peterson
    testo: "Metti perfettamente in ordine la tua casa prima di criticare il mondo."
    traduttore: "(traduzione da verificare)"
    riferimento: "12 regole per la vita (2018), regola 6 (è il titolo della regola)"
    prova: memoria
    voce: proposta
  - n: 6
    mondo: "Carl Gustav Jung"
    testo: "Non si diventa illuminati immaginando figure di luce, ma rendendo cosciente l'oscurità."
    traduttore: "(traduzione da verificare)"     # Opere 13, Boringhieri, non controllata
    originale: "One does not become enlightened by imagining figures of light, but by making the darkness conscious."
    riferimento: "L'albero filosofico (1945), Opere 13 / CW 13, § 335 (trad. inglese Hull); verificata in inglese da fonti secondarie, citazioni A7"
    esito: verificata
    prova: secondaria
    voce: proposta
  - n: 7
    mondo: "Immanuel Kant"
    testo: "Il cielo stellato sopra di me, la legge morale in me."
    traduttore: "(traduzione da verificare)"
    riferimento: "Critica della ragion pratica, Conclusione (forma ridotta)"
    prova: memoria
    voce: proposta
  - n: 8
    mondo: "Maimonide"
    testo: "Il silenzio è lode per te."
    traduttore: "(traduzione da verificare)"
    riferimento: "Guida dei perplessi I, 59, che cita Salmi 65, 2 (la forma cambia con la traduzione, da verificare)"
    prova: memoria
    voce: proposta
  - n: 9
    rif: marco-aurelio
    testo: "Ciò che impedisce l'azione diventa avanzamento dell'azione, e ciò che sbarra questa via diventa via."
    traduttore: resa di Claude      # dal greco, da verificare su un'edizione italiana
    riferimento: "Pensieri (A se stesso) V, 20, ultima frase; letto in originale (citazioni A2)"
    esito: simile
    prova: primaria
    nota: "la forma dell'Atlante («Ciò che ostacola l'azione fa avanzare l'azione. Ciò che sta sulla via diventa la via.») ricalca l'inglese di G. Hays (2002), resa popolare da R. Holiday (2014): non è una traduzione dal greco"
    voce: proposta
  - n: 10
    mondo: "Friedrich Nietzsche"
    testo: "Amor fati: questo sia d'ora innanzi il mio amore!"
    traduttore: "(traduzione da verificare)"
    riferimento: "La gaia scienza, § 276"
    prova: memoria
    voce: proposta
  - n: 11
    mondo: "Arthur Schopenhauer"
    testo: "La vita oscilla, come un pendolo, di qua e di là, tra il dolore e la noia."
    traduttore: "(traduzione da verificare)"
    riferimento: "Il mondo come volontà e rappresentazione, § 57"
    prova: memoria
    voce: proposta
  - n: 12
    rif: stoicismo
    testo: "Delle cose, alcune dipendono da noi, altre non dipendono da noi."
    traduttore: "(traduzione da verificare)"
    autore: Epitteto
    riferimento: "Manuale, 1"
    prova: memoria
    voce: proposta
  - n: 13
    mondo: "Tao Te Ching"
    testo: "Il Tao che può essere detto non è l'eterno Tao."
    traduttore: "(traduzione da verificare)"
    riferimento: "cap. 1"
    prova: memoria
    voce: proposta
  - n: 14
    mondo: "Peter Wessel Zapffe"
    testo: "Conoscete voi stessi, siate infecondi, e lasciate che la terra resti silenziosa dopo di voi."
    traduttore: "(traduzione da verificare)"
    riferimento: "L'ultimo Messia (1933), finale"
    prova: memoria
    voce: proposta
  - n: 15
    mondo: "Tavola di smeraldo (ermetismo)"
    testo: "Ciò che è in basso è come ciò che è in alto, e ciò che è in alto è come ciò che è in basso."
    traduttore: "(traduzione da verificare)"
    riferimento: "Tavola di smeraldo, versione latina medievale"
    prova: memoria
    voce: proposta
  - n: 16
    mondo: "Iside (Plutarco)"
    testo: "Io sono tutto ciò che è stato, che è e che sarà, e nessun mortale ha mai sollevato il mio velo."
    traduttore: "(traduzione da verificare)"
    riferimento: "Plutarco, Iside e Osiride, 9"
    prova: memoria
    voce: proposta
  - n: 17
    mondo: "Vangelo di Matteo"
    testo: "Non sappia la tua sinistra ciò che fa la tua destra."
    traduttore: "(traduzione da verificare)"
    riferimento: "Matteo 6, 3"
    prova: memoria
    voce: proposta
---
Le citazioni che l'Atlante accostava alle sue fonti, scelte da Claude (tutte in un blocco proposta) ◌.
Con «prova: memoria» non sono verificate; la 6 e la 9 sono state controllate il 2026-10-31.

1. Dante, Inferno XXXIV, 139: «E quindi uscimmo a riveder le stelle.» ◌
2. True Detective, ep. 8, Rust Cohle: «Una volta c'era solo il buio. Se vuoi saperlo, la luce sta vincendo.» (resa di Claude) ◌
3. Camus, Il mito di Sisifo: «Bisogna immaginare Sisifo felice.» ◌
4. Eraclito, fr. 60: «La via in su e la via in giù sono una e la stessa.» ◌
5. Peterson, 12 regole, regola 6: «Metti perfettamente in ordine la tua casa prima di criticare il mondo.» ◌
6. Jung, Opere 13 § 335: «Non si diventa illuminati immaginando figure di luce, ma rendendo cosciente l'oscurità.» (traduzione da verificare) ◌
7. Kant, Critica della ragion pratica: «Il cielo stellato sopra di me, la legge morale in me.» ◌
8. Maimonide, Guida dei perplessi I, 59: «Il silenzio è lode per te.» (da verificare) ◌
9. Marco Aurelio, A se stesso V, 20: «Ciò che impedisce l'azione diventa avanzamento dell'azione, e ciò che sbarra questa via diventa via.» (resa di Claude dal greco; la forma corrente viene da Hays) ◌
10. Nietzsche, La gaia scienza § 276: «Amor fati: questo sia d'ora innanzi il mio amore!» ◌
11. Schopenhauer, Il mondo… § 57: «La vita oscilla, come un pendolo, di qua e di là, tra il dolore e la noia.» ◌
12. Epitteto, Manuale 1: «Delle cose, alcune dipendono da noi, altre non dipendono da noi.» ◌
13. Tao Te Ching, cap. 1: «Il Tao che può essere detto non è l'eterno Tao.» ◌
14. Zapffe, L'ultimo Messia: «Conoscete voi stessi, siate infecondi, e lasciate che la terra resti silenziosa dopo di voi.» (traduzione da verificare) ◌
15. Tavola di smeraldo: «Ciò che è in basso è come ciò che è in alto, e ciò che è in alto è come ciò che è in basso.» ◌
16. Plutarco, Iside e Osiride 9: «Io sono tutto ciò che è stato, che è e che sarà, e nessun mortale ha mai sollevato il mio velo.» ◌
17. Matteo 6, 3: «Non sappia la tua sinistra ciò che fa la tua destra.» ◌
```

##### `restituzioni/2026/10/r-20261007-0000-ritratto-domande.md`

```md
---
forma: ritratto
importata: true
voci:
  - n: 1
    testo: "Chi sono?"
    sottotitolo: "l'io, l'ombra, le maschere"
    link: https://paol-imi.github.io/tattoo-shit/domande/chi-sono
    voce: proposta
  - n: 2
    testo: "Perché soffro?"
    sottotitolo: "il peso, la ferita, il masso"
    link: https://paol-imi.github.io/tattoo-shit/domande/perche-soffro
    voce: proposta
  - n: 3
    testo: "Che senso ha?"
    sottotitolo: "l'assurdo, il vuoto, la rivolta"
    link: https://paol-imi.github.io/tattoo-shit/domande/che-senso-ha
    voce: proposta
  - n: 4
    testo: "Come devo vivere?"
    sottotitolo: "la via, la virtù, l'ostacolo"
    link: https://paol-imi.github.io/tattoo-shit/domande/come-vivere
    voce: proposta
  - n: 5
    testo: "Cosa posso conoscere?"
    sottotitolo: "il limite, il dubbio, la meraviglia"
    link: https://paol-imi.github.io/tattoo-shit/domande/cosa-posso-conoscere
    voce: proposta
  - n: 6
    testo: "Cosa c'è oltre?"
    sottotitolo: "dall'altra parte del dolore: amore e verità"
    link: https://paol-imi.github.io/tattoo-shit/domande/cosa-c-e-oltre
    voce: proposta          # riprende le parole di U3, «Ma cosa c'è oltre?»: vedi attriti
  - n: 7
    testo: "Come stare con gli altri?"
    sottotitolo: "dall'io al noi, il bene nascosto"
    link: https://paol-imi.github.io/tattoo-shit/domande/come-stare-con-gli-altri
    voce: proposta
  - n: 8
    testo: "Cosa è reale?"
    sottotitolo: "il sogno, la caverna, il cerchio"
    link: https://paol-imi.github.io/tattoo-shit/domande/cosa-e-reale
    voce: proposta
---
Le otto grandi domande dell'Atlante (2026-10-07), proposte da Claude come incrocio con le discipline ◌.
I cori di citazioni restano nell'Atlante.

1. Chi sono? (l'io, l'ombra, le maschere) ◌
2. Perché soffro? (il peso, la ferita, il masso) ◌
3. Che senso ha? (l'assurdo, il vuoto, la rivolta) ◌
4. Come devo vivere? (la via, la virtù, l'ostacolo) ◌
5. Cosa posso conoscere? (il limite, il dubbio, la meraviglia) ◌
6. Cosa c'è oltre? (dall'altra parte del dolore: amore e verità) ◌
7. Come stare con gli altri? (dall'io al noi, il bene nascosto) ◌
8. Cosa è reale? (il sogno, la caverna, il cerchio) ◌
```

## 6. Il progetto tatuaggi (lotto F)

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Regole applicate:
> [regole di importazione](/_progetto/v2/simulazione/regole-importazione.md) R2, R4, R6, R8, R12; modello §2.2, §2.5, §8.5;
> [eredità](/_progetto/v2/eredita.md) §4. Fonti al commit `4c9fdce` (righe verificate: invariate rispetto a oggi).
> Le restituzioni non hanno un campo per la provenienza: la scrivo come commento YAML `# fonte:` (vedi attriti).
> Numerazione dei candidati: alfabetica sulle 31 cartelle di `idee/` tolti il grimorio e le due idee sue
> (t11 discesa-di-sisifo, t12 elmo-e-vite, t19 lotta-al-guado). L'eredità non dà una lista numerata.

##### `raccolte/tatuaggi.md`

```md
---
nome: tatuaggi
alias: [tatuaggio, tattoo, sleeve, "me la tatuerei"]
scopo: "trovare un concetto (non un soggetto) per un tatuaggio"
nato-da: [20261004-0000-s03, 20261004-0000-s02]
link: https://paol-imi.github.io/tattoo-shit/
---
```

Lo `scopo` non ha parole **sue** (voce `sua`) adatte: nessuna delle U1–U31 dice a che cosa serve la raccolta. La riga scelta è
di voce `seme`: M12, il racconto della chat d'origine, in prima persona, "Ho chiesto aiuto per trovare un concetto (non un
soggetto) per un tatuaggio" (`diario/2026-10-04-seed.md:628`, frammento `s03`). Alternative scartate: seme:3 "Repository
personale di idee, pensieri e sketch per tatuaggi" (voce di Claude nel seme, descrive il repo) e U24 "cercando materiale per
tatuaggi" (voce sua, ma è l'oggetto della ricerca sui Pensieri). Da chiedergli alla prima occasione.

##### `frammenti/2026/10/20261004-0000-s02.md`

```md
---
registrato: 2026-10-04
canale: importato
voce: seme
---
**Metodo scelto:** prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro.

Mi piacciono le **patchwork sleeve**: pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera. Non le sleeve "fuse" con sfondo continuo.

Estetica che si sta delineando: nero, incisione/xilografia antica, mistero.

**Avvertenza a me stesso:** il tatuaggio deve rappresentare il viaggio e l'atto di affrontare, non lo stadio assurdista in sé. Così resterà vero anche se la mia filosofia evolve.

**Incisione / xilografia antica** — linee e tratteggio incrociato alla Doré e Dürer, legni del Cinquecento. La direzione che mi attira di più.
```

Corpo: le cinque righe del seme in ordine di riga (249 U15, 259 U16, 260 M7, 280 M6, 455 U17), senza marcatori d'elenco e
senza lo slug `(incisione-xilografia)` messo da Claude. Non è un messaggio: è un montaggio dell'importazione (vedi attriti).

##### `letture/2026/10/20261004-0000-s02.md`

```md
---
versione: 1
letto: 2026-10-31
intento: [salva]
vissuto: "≤2026-10-04, chat d'origine"
link:
  - https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L249
  - https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L259
  - https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L260
  - https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L280
  - https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L455
contesto: "brief del progetto tatuaggi, composto all'importazione da cinque passi del seme (U15, U16, M7, M6, U17). U15, U16, U17 sono anche frammenti voce sua (u15, u16, u17); U15, U16, M6, M7 stanno anche nel nucleo (s01: nucleo.md:39, 49, 62, 63)"
legami:
  - serve-a: tatuaggi
    voce: seme
    perche: "«il tatuaggio deve rappresentare il viaggio e l'atto di affrontare»; metodo, formato e stile del progetto"
  - ritorna-su: 20261005-0000-s01
    come: aggiunge
    voce: seme
    perche: "M6 e M7 sono passi del nucleo; qui ripresi come regole del progetto"
parole: [viaggio, patchwork, incisione, xilografia, nero, mistero, macabro, puro]
---
```

`ritorna-su` punta a un frammento con data posteriore (s01 è del 2026-10-05): lo lascio solo per segnare la copia; se lo
script ordina per data, va tolto. Nessun `nomina`: il brief non nomina nodi (Doré e Dürer sono descrizione di Claude, lista §6).

##### `restituzioni/2026/10/r-20261004-0000-ritratto-grimorio.md`

```md
---
# fonte: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/grimorio/index.md#L23-L33  (origine: seme, validata: false)
forma: ritratto
importata: true
per: 20261004-0000-u16
voci:
  - n: 1
    mondo: "Mutus Liber (1677)"
    voce: proposta
  - n: 2
    mondo: "Robert Fludd"
    voce: proposta
  - n: 3
    mondo: "Albrecht Dürer, Melencolia I (1514)"
    voce: proposta
  - n: 4
    mondo: "alchimia"
    voce: proposta
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "cornice proposta per il braccio: «il braccio come le tavole di un antico trattato esoterico»"
  - converge-con:
      tra: [20261004-0000-u16, 20261004-0000-u10]
    voce: proposta
    perche: "l'unica idea che sposa le patchwork («pezzi separati… che però si leggono come un'unica opera») e l'esoterico delle «domande che ancora non so di volere»"
---
# Il grimorio

**Corrisponde alle mie preferenze emerse** (patchwork + esoterico). Il braccio come le tavole di un antico trattato esoterico (Mutus Liber, Fludd, Dürer). Ogni tatuaggio è un'illustrazione dello stesso libro, tutte in stile xilografia cinquecentesca. Chi lo guarda intuisce un sistema di significati senza riuscire a decifrarlo del tutto.

- **Ancore grandi** (le mie tappe): viandante oltre il firmamento, Sisifo in discesa, angelo malinconico, velo di Iside, ruota degli Ofanim.
- **Medi** (oggetti simbolici): clessidra, lampada di Psiche, chiave, poliedro di Dürer, ouroboros.
- **Filler:** stelle, glifi alchemici, piccoli occhi, simboli planetari.

**Vantaggio:** si costruisce nel tempo, un pezzo per ogni tappa del percorso.

Placement: braccio. Formato: patchwork. Stile: patchwork, incisione/xilografia.
```

`per: u16`: il seme (M12, punto 7) dice "chiarimento: mi piacciono le patchwork. Nasce l'idea del grimorio". Le cinque ancore
sono altri candidati (t30, t11, t05, t28, t24), ma una voce può puntare solo a un nodo o al mondo: restano testo.

##### `restituzioni/2026/10/r-20261004-0000-ritratto-t11.md`

```md
---
# fonte: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/discesa-di-sisifo/index.md#L27  (origine: seme, validata: false)
forma: ritratto
importata: true
per: 20261005-0000-s01
voci:
  - n: 1
    mondo: "Sisifo"
    voce: proposta
  - n: 2
    rif: camus
    voce: proposta
  - n: 3
    mondo: "Tiziano, Sisifo"
    voce: proposta
  - n: 4
    mondo: "Franz von Stuck, Sisifo"
    voce: proposta
  - n: 5
    mondo: "Caspar David Friedrich, Viandante sul mare di nebbia (1818); Monaco in riva al mare (1808–10)"
    voce: proposta
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "candidato dormiente; regge su C16, agganciato a «non nascondermi, affrontarlo» (M3, nel nucleo)"
---
# La discesa di Sisifo

L'ora della coscienza. Non il Sisifo che spinge, ma quello che torna giù, lucido. Il mio "non nascondermi, affrontarlo".

Placement: schiena, polpaccio, fianco. Formato: pezzo singolo.
```

##### `restituzioni/2026/10/r-20261006-0000-ritratto-t12.md`

```md
---
# fonte: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/elmo-e-vite/index.md#L27  (origine: claude, validata: false)
forma: ritratto
importata: true
per: 20261004-0000-u05
voci:
  - n: 1
    rif: marco-aurelio
    voce: proposta
  - n: 2
    rif: fma-brotherhood
    voce: proposta
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "candidato dormiente; regge su C3, agganciato al condottiero (U5)"
---
# L'elmo e la vite

Il condottiero che, vinta la guerra, posa l'elmo e lo lascia alla vite. Una forza abbastanza grande da non aver bisogno di essere vista.

Placement: spalla, polpaccio (12-15 cm). Formato: pezzo singolo.
```

Voci: la vite e l'ape (Marco Aurelio V.6) e l'elmo vuoto di Alphonse (dettaglio nascosto, riga 41). Cincinnato, Isaia e il Tao
stanno nella convergenza `r-…-ritratto-c03`, che copia anche la riga 27.

##### `restituzioni/2026/10/r-20261006-0000-ritratto-t19.md`

```md
---
# fonte: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/lotta-al-guado/index.md#L27  (origine: claude, validata: false)
forma: ritratto
importata: true
per: 20261004-0000-u01
voci:
  - n: 1
    mondo: "Giacobbe al guado dello Iabbok (Genesi 32)"
    voce: proposta
  - n: 2
    rif: jordan-peterson
    voce: proposta
  - n: 3
    rif: berserk
    voce: proposta
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "candidato dormiente; regge su C22, agganciato a «battaglie interiori» (U1)"
---
# La lotta al guado

La battaglia interiore combattuta fino all'alba. Non si vince abbattendo l'avversario, ma non lasciandolo andare finché non ti dà qualcosa: una ferita e un nome nuovo.

Placement: polpaccio, avambraccio (18-22 cm, verticale). Formato: pezzo singolo.
```

#### Prova n.82

"idee per un tatuaggio da tutto quello che ho salvato su sisifo". **Non esiste un nodo `sisifo`** (lista B, §8.5: resta `mondo:`),
né il saggio di Camus, Tiziano o von Stuck: il "vicinato di sisifo a 1–2 passi" di modello §7.4 è vuoto.
Per **grafo** si trova solo: la raccolta `tatuaggi` ← `serve-a` (s02, grimorio, t11, t12, t19, più U18–U22 di altri lotti), e
`camus` (nodo, voce n.2 di t11; U11 e s01 lo nominano). Per **testo** soltanto (corpo o stringa `mondo: "Sisifo"`): t11 (la discesa ◌),
il grimorio ("Sisifo in discesa" ◌), `r-…-c16` (Berserk "in fondo un mito di Sisifo", Camus e la discesa ✧), `c04` (mulo e guida ◌),
la restituzione citazioni (Camus, "Sisifo felice" ◌) e `s03` ("discesa di Sisifo" tra le proposte artistiche ✧).
**Tuoi ✦: niente**: nessuna frase U nomina Sisifo. L'inventario di §7.4 ("Sisifo felice 5 nov", "mi sento come Sisifo") esiste solo
dopo E66/E67, che faranno nascere il nodo. Quindi a importazione fatta n.82 risponde, ma solo se la ricerca legge corpi e `mondo:`.
