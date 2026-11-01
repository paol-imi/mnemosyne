# Simulazione d'ingresso: i 25 messaggi del banco

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Simulazione: i file qui sotto sono finti e stanno in
> blocchi di codice, non sono note. Applica [il modello](/progetto/v2/modello.md) al
> [banco di prova](/progetto/v2/banco-di-prova.md); ciò che stride è raccolto in [gli attriti](/progetto/v2/simulazione/attriti-ingresso.md).

**Come leggere.** Ogni file è un blocco di codice preceduto dal suo percorso in grassetto, come `inline-code`
(per esempio **`frammenti/2026/11/20261103-2340.md`**). Per ogni messaggio: il **frammento**, la **lettura**, i **nodi**
nuovi o aggiornati, la **restituzione**, la **risposta** che vedi sul telefono (in `contesto/recenti.md`) e i **costi**
(file scritti, domande fatte). Gli id dei frammenti importati portano un suffisso di 4 lettere (`-nucl`, `-perc`…):
è lo `xxxx` del modello, qui necessario perché più frammenti cadono nello stesso minuto.

## 0. Punto zero

L'archivio importato dall'Atlante (4–7 ottobre 2026). Tutto ha `canale: importato`, resta fuori dalle serie e dai conti;
`registrato` è l'ora del primo commit della nota d'origine (fuso +02:00). Provenienza: il campo `link` della lettura,
verso il commit `4c9fdce` dell'Atlante. Si importano qui 5 frammenti su 31 (quelli che i 25 messaggi toccano), 2
restituzioni su 25 + 31, e i nodi che ne nascono. Delle entità vive diventano nodi solo quelle nominate nelle sue parole
(modello §8.5): **Nietzsche, Jung, Sisifo non sono nodi** al punto zero.

### 0.1 Il nucleo (lo sguardo, ✧)

**`frammenti/2026/10/20261004-2228-nucl.md`**

```md
---
registrato: 2026-10-04T22:28:39+02:00
canale: importato
voce: seme
---
Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.

L'avventura. Il viaggio nell'esistenza, l'affrontare la realtà, l'evoluzione della propria filosofia.

In uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.

La dimensione principale della realtà è il dolore. Ma cosa c'è oltre? Amore e verità.

1. Il peso: il dolore come dimensione fondamentale della realtà.
2. Lo sguardo: affrontarlo senza nascondersi, con lucidità.
3. L'oltre: amore e verità, che si trovano solo dopo averlo attraversato.

Il mistero non come risposta, ma come orizzonte. Non "il mondo non ha senso", ma "il mondo è più vasto di quello che posso capire, e questo mi affascina". Compatibile con l'assurdo: non pretende risposte, lascia aperta la soglia.

Il tatuaggio deve rappresentare il viaggio e l'atto di affrontare, non lo stadio assurdista in sé. Così resterà vero anche se la mia filosofia evolve.

Prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro.

Territori di partenza: filosofia (soprattutto correnti intense come stoicismo e romanticismo), religione (dal cristianesimo alle divinità greche), esoterismo e mistero, estratti da serie TV, anime, film cult e canzoni.

- Persone che hanno segnato la mia visione: Jordan Peterson, Marco Aurelio, Albert Camus.
- Serie e personaggi: Fullmetal Alchemist: Brotherhood, True Detective, Berserk.
- Musica: Radiohead, Deftones, quella wave rock eterea e malinconica.

- Mi attira il filone esoterico in cui si percepisce una coscienza elevata: guardando il tatuaggio deve nascere la sensazione che esistano risposte a domande che non ho, anzi domande che ancora non so di volere.
- Mi piacciono le patchwork sleeve: pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera. Non le sleeve "fuse" con sfondo continuo.
- Estetica che si sta delineando: nero, incisione/xilografia antica, mistero.
```

Tolti dal testo del nucleo: i titoli di sezione, i link interni, il blocco proposta del grimorio (di Claude) e il
paragrafo del percorso interiore, che entra da solo (0.2) con voce sua.

**`letture/2026/10/20261004-2228-nucl.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [sguardo]
vissuto: "≤2026-10-05"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/nucleo.md
legami:
  - parla-di: dolore
    voce: seme
    perche: "«La dimensione principale della realtà è il dolore»"
  - parla-di: nichilismo
    voce: seme
    perche: "«Non nichilismo: accettare il peso…»: nominato per negarlo"
  - nomina: albert-camus
    voce: seme
    perche: "«alla Camus»; «Persone che hanno segnato la mia visione»"
  - nomina: jordan-peterson
    voce: seme
    perche: "«Persone che hanno segnato la mia visione»"
  - nomina: marco-aurelio
    voce: seme
    perche: "«Persone che hanno segnato la mia visione»"
  - nomina: fma-brotherhood
    voce: seme
    perche: "«Serie e personaggi»"
  - nomina: true-detective
    voce: seme
    perche: "«Serie e personaggi»"
  - nomina: berserk
    voce: seme
    perche: "«Serie e personaggi»"
  - nomina: radiohead
    voce: seme
    perche: "«Musica»: atmosfera, nessuna canzone"
  - nomina: deftones
    voce: seme
    perche: "«Musica»: atmosfera, nessuna canzone"
  - parla-di: stoicismo
    voce: seme
    perche: "«correnti intense come stoicismo e romanticismo»"
  - parla-di: romanticismo
    voce: seme
    perche: "«correnti intense come stoicismo e romanticismo»"
  - serve-a: tatuaggi
    voce: seme
    perche: "è il brief: metodo, avvertenza, patchwork, nero e incisione"
parole: [assurdo, amore, verità, mistero, esoterico]
---
```

### 0.2 Il percorso interiore (✦)

**`frammenti/2026/10/20261004-2212-perc.md`**

```md
---
registrato: 2026-10-04T22:12:04+02:00
canale: importato
voce: sua
---
**Il mio percorso interiore, con le mie parole** (da conservare così com'è): battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato.
```

**`letture/2026/10/20261004-2212-perc.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [sguardo]
vissuto: "≤2026-10-04"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L282
legami:
  - sente: [battaglie-interiori, solitudine, vuoto, apatia, dolore, rabbia, risentimento, caos, liberta, gioia, pace-interiore]
    voce: sua
    perche: "le parole del percorso, nel suo ordine"
parole: [versioni di me morte, vincere se stessi, avventura, musica]
---
```

### 0.3 Il monologo di Rust (✦)

**`frammenti/2026/10/20261004-2228-rust.md`**

```md
---
registrato: 2026-10-04T22:28:39+02:00
canale: importato
voce: sua
---
I think human consciousness is a tragic misstep in human evolution. We became too self aware; nature created an aspect of nature separate from itself. We are creatures that should not exist by natural law. We are things that labor under the illusion of having a self, a secretion of sensory experience and feeling, programmed with total assurance that we are each somebody, when in fact everybody’s nobody. I think the honorable thing for our species to do is deny our programming, stop reproducing, walk hand in hand into extinction, one last midnight, brothers and sisters opting out of a raw deal.
```

**`letture/2026/10/20261004-2228-rust.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [salva]
contesto: "trascritto da lui (True Detective, ep. 1), «come l'ho trascritta io»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/true-detective-coscienza/index.md#L28
legami:
  - nomina: monologo-di-rust
    momento: "ep. 1"
    voce: sua
    perche: "trascrizione sua, parola per parola"
  - nomina: true-detective
    voce: sua
    perche: "lo spunto è sulla serie"
parole: [coscienza]
---
```

### 0.4 Il sognatore insonne, idea sua (✦)

**`frammenti/2026/10/20261004-2308-sogn.md`**

```md
---
registrato: 2026-10-04T23:08:52+02:00
canale: importato
voce: sua
---
"I don't sleep, I just dream", con il pin qui sotto.

Una sagoma, il fumo della sigaretta, la frase.

1. Come giocare con il fumo della sigaretta?
2. Come disporre la sagoma rispetto al testo?

https://www.pinterest.com/pin/970173944741790982/
```

**`letture/2026/10/20261004-2308-sogn.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [salva]
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/sognatore-insonne/index.md#L24
legami:
  - nomina: true-detective
    voce: sua
    perche: "«I don't sleep, I just dream», la frase di Rust"
  - serve-a: tatuaggi
    voce: sua
    perche: "idea sua (origine: mia), con le sue due domande aperte"
parole: [sigaretta, sagoma]
---
```

### 0.5 I Pensieri, la pista (✦)

**`frammenti/2026/10/20261005-0011-pens.md`**

```md
---
registrato: 2026-10-05T00:11:14+02:00
canale: importato
voce: sua
---
Rileggere i Pensieri (le Meditazioni) cercando materiale per tatuaggi: frasi, immagini, convergenze.
```

**`letture/2026/10/20261005-0011-pens.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [salva]
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/ricerche/pensieri-marco-aurelio/index.md#L7
legami:
  - nomina: pensieri
    fruizione: in-corso
    voce: sua
    perche: "«Rileggere i Pensieri»; ricerca in-corso"
  - serve-a: tatuaggi
    voce: sua
    perche: "«cercando materiale per tatuaggi»"
---
```

### 0.6 I nodi

**`raccolte/tatuaggi.md`**

```md
---
nome: tatuaggi
alias: [tatuaggio, tattoo]
scopo: "materiale per tatuaggi: frasi, immagini, convergenze"
nato-da: [20261004-2228-nucl, 20261004-2308-sogn, 20261005-0011-pens]
---
```

**`temi/nichilismo.md`** · **`temi/dolore.md`** · **`temi/battaglie-interiori.md`** (gli altri temi sono uguali, con il loro nome)

```md
---
nome: nichilismo
alias: []
nato-da: [20261004-2228-nucl]
---
```

```md
---
nome: dolore
alias: []
nato-da: [20261004-2228-nucl, 20261004-2212-perc]
---
```

```md
---
nome: battaglie interiori
alias: [guerra con me stesso]
nato-da: [20261004-2212-perc]
---
```

**`temi/chi-sono.md`** (una delle 8 domande; le altre uguali)

```md
---
nome: Chi sono?
alias: [l'io, l'ombra, le maschere]
nato-da: []
---
```

**`persone/albert-camus.md`** (e così `jordan-peterson`, `marco-aurelio`, `radiohead`, `deftones`, tutti `cerchia: mondo`, `nato-da: [20261004-2228-nucl]`)

```md
---
nome: Albert Camus
alias: [camus]
cerchia: mondo
nato-da: [20261004-2228-nucl]
---
```

**`opere/true-detective.md`** (e così `fma-brotherhood`, `berserk`, `nato-da: [20261004-2228-nucl]`)

```md
---
nome: True Detective (stagione 1)
alias: [true detective]
autore: Nic Pizzolatto
nato-da: [20261004-2228-nucl, 20261004-2228-rust, 20261004-2308-sogn]
---
```

**`opere/pensieri.md`**

```md
---
nome: Pensieri
alias: [meditazioni, a se stesso]
autore: marco-aurelio
link: https://www.gutenberg.org/ebooks/15877
nato-da: [20261005-0011-pens]
---
```

**`citazioni/monologo-di-rust.md`**

```md
---
nome: Il monologo di Rust
autore: Nic Pizzolatto
detta-da: Rust Cohle
originale: "I think human consciousness is a tragic misstep in human evolution… (da verificare: spesso circola senza «human»)"
riferimento:
  opera: true-detective
  luogo: "ep. 1, The Long Bright Dark"
prova: memoria
nato-da: [20261004-2228-rust]
---
```

### 0.7 Due restituzioni importate

**`restituzioni/2026/10/r-20261004-2228-ritratto-c16.md`** (convergenza C16, da note di mappa: ✧)

```md
---
forma: ritratto
importata: true
voci:
  - n: 1
    rif: "mondo: Friedrich, Monaco in riva al mare"
  - n: 2
    rif: berserk
  - n: 3
    rif: "mondo: Camus, la discesa di Sisifo"
legami:
  - converge-con: [berserk, "Friedrich, Monaco in riva al mare", "Sisifo (la discesa)", 20261004-2228-nucl]
    voce: seme
    perche: "l'assurdo prima di Camus; aggancio: «non nascondermi, affrontarlo»"
---
Una figura minuscola davanti a mare e cielo vuoti. Forse il quadro più "assurdista" mai dipinto, più di un secolo prima di Camus.

Chi lotta contro un destino crudele senza piegarsi (il "Lottatore"); in fondo un mito di Sisifo.

Il momento che interessa a Camus non è la spinta in salita, ma la discesa, quando Sisifo torna a riprendere il masso, consapevole. È l'ora della coscienza, quella in cui è superiore al proprio destino.
```

**`restituzioni/2026/10/r-20261004-2228-ritratto-sisi.md`** (candidato dormiente, idea del seme mai validata: ◌)

```md
---
forma: ritratto
importata: true
voci:
  - n: 1
    rif: "idea: La discesa di Sisifo"
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "idea del seme, mai validata"
  - converge-con: [r-20261004-2228-ritratto-c16, 20261004-2228-nucl]
    voce: proposta
    perche: "regge su C16; aggancio: «non nascondermi, affrontarlo»"
---
La discesa di Sisifo. L'ora della coscienza. Non il Sisifo che spinge, ma quello che torna giù, lucido. Placement: schiena, polpaccio, fianco; spazio negativo.
```

### 0.8 Nodi esistenti al punto zero

| slug | genere | nato da |
|---|---|---|
| `tatuaggi` | raccolta | nucl, sogn, pens |
| `nichilismo` | tema | nucl |
| `dolore` | tema (emozione) | nucl, perc |
| `stoicismo`, `romanticismo` | tema | nucl |
| `battaglie-interiori`, `solitudine`, `vuoto` ("senso di vuoto"), `apatia`, `rabbia`, `risentimento`, `caos`, `liberta`, `gioia`, `pace-interiore` | tema (emozione) | perc |
| `chi-sono`, `che-senso-ha`, `come-stare-con-gli-altri`, `come-vivere`, `cosa-c-e-oltre`, `cosa-e-reale`, `cosa-posso-conoscere`, `perche-soffro` | tema (domanda) | — |
| `albert-camus`, `jordan-peterson`, `marco-aurelio` | persona, mondo | nucl |
| `radiohead`, `deftones` | persona, mondo (gruppo) | nucl |
| `true-detective`, `fma-brotherhood`, `berserk` | opera | nucl (+ rust, sogn) |
| `pensieri` | opera (`autore: marco-aurelio`) | pens |
| `monologo-di-rust` | citazione | rust |

**Frammenti:** `20261004-2228-nucl` (✧, sguardo), `20261004-2212-perc`, `20261004-2228-rust`, `20261004-2308-sogn`,
`20261005-0011-pens` (✦). **Restituzioni importate:** `r-20261004-2228-ritratto-c16` (✧), `r-20261004-2228-ritratto-sisi` (◌).
**Non esistono:** Nietzsche, Jung, Sisifo, Galimberti, kintsugi, Schopenhauer, Napoleone, Invictus.

**Costi del punto zero (simulato):** 21 file (5 frammenti, 5 letture, 9 nodi scritti a mano su 33 che lo script
genererebbe, 2 restituzioni); 0 domande; nessun ID esterno.

---

## B01 · 2026-11-03 23:40 · Galimberti a teatro, l'ospite inquietante

> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

Il Comando rapido scrive `ingresso/20261103-2340-xxxx.md` (solo il testo) e fa il `fire`; la Routine lo sposta.

**`frammenti/2026/11/20261103-2340.md`**

```md
---
registrato: 2026-11-03T23:40:12+01:00
canale: telefono
---
ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante
```

**`letture/2026/11/20261103-2340.md`** (identica al §5.2)

```md
---
versione: 1
letto: 2026-11-03T23:41:05+01:00
intento: [salva]
reazione:
  - parole: "molto interessante"
    segnale: giudizio
    verso: "+"
legami:
  - nomina: umberto-galimberti
    voce: sua
    perche: "«uno spezzone di galimberti a teatro»"
  - nomina: spettacolo-sulle-emozioni
    voce: sua
    perche: "«credo lo spettacolo sulle emozioni»; titolo proposto: Il mondo delle emozioni (da verificare)"
  - nomina: nichilismo-ospite-inquietante
    voce: sua
    perche: "«il nichilismo è l'ospite inquietante», detto da Galimberti secondo te"
  - parla-di: nichilismo
    voce: sua
    perche: "parola tua"
parole: [ragazzi, cultura]
---
```

**`persone/umberto-galimberti.md`** (nuovo; **senza** il `wikidata: Q4003398` del §5.2: §3.1 vieta gli ID all'ingresso)

```md
---
nome: Umberto Galimberti
alias: [galimberti, umberto galimberti]
cerchia: mondo
nato-da: [20261103-2340]
---
```

**`opere/spettacolo-sulle-emozioni.md`** (nuovo)

```md
---
nome: lo spettacolo sulle emozioni
alias: [spettacolo sulle emozioni]
autore: umberto-galimberti
nato-da: [20261103-2340]
---
```

**`citazioni/nichilismo-ospite-inquietante.md`** (nuovo; `autore` in chiaro perché Nietzsche non è un nodo al punto zero)

```md
---
nome: Il nichilismo, l'ospite inquietante
autore: Friedrich Nietzsche
attribuita-a: [umberto-galimberti]
prova: memoria
originale: "Der Nihilismus steht vor der Tür: woher kommt uns dieser unheimlichste aller Gäste? (da verificare)"
traduzione: "Il nichilismo è alla porta: da dove ci viene questo, il più inquietante fra tutti gli ospiti?"
traduttore: resa di Claude
riferimento:
  opera: "Frammenti postumi (da verificare: 1885-1887 nel §5.2, 1885-86 nel corpus, 1887-88 in una fonte secondaria)"
  luogo: "2[127] (da verificare)"
nato-da: [20261103-2340]
---
L'immagine è di Nietzsche; Galimberti ne ha fatto il titolo di un libro (L'ospite inquietante, Feltrinelli 2007).
```

Nessun nodo toccato: `temi/nichilismo` non cambia (`nato-da` registra la nascita, non le occorrenze).

**`restituzioni/2026/11/r-20261103-2341-risposta.md`**

```md
---
forma: risposta
per: 20261103-2340
voci:
  - n: 1
    rif: "mondo: Nietzsche, il nichilismo «il più inquietante fra tutti gli ospiti»"
  - n: 2
    rif: "mondo: Galimberti, L'ospite inquietante (Feltrinelli 2007)"
  - n: 3
    rif: spettacolo-sulle-emozioni
legami: []
---
**Salvato.** "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro (2007) ○.
Lo spettacolo era *Il mondo delle emozioni*? ⚠
```

Poi: `contesto/recenti.md`, `contesto/parole.md`, `contesto/indice.md` rigenerati dallo script; verifica; push su `main`.
Nessuna notifica (non è una correzione di fatto né un ponte forte).

**Risposta sul telefono:** "23:41 · **Salvato.** "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro (2007) ○. Lo spettacolo era *Il mondo delle emozioni*? ⚠"

**Verifiche fatte:**
- Passo 1 sulla citazione (WebSearch "unheimlichste aller Gäste"): la frase è di Nietzsche, nei frammenti postumi
  ("Der Nihilismus steht vor der Thür: woher kommt uns dieser unheimlichste aller Gäste?"); non è un apocrifo. Le fonti non
  concordano sulla collocazione (una dice note 1887-88): numero 2[127] e anni restano "(da verificare)". Nessun `esito`.
- Fatto ○ del libro (WebSearch): *L'ospite inquietante. Il nichilismo e i giovani*, Feltrinelli 2007, Serie Bianca (cataloghi
  IED, Arcigay). La stessa ricerca porta la polemica per plagio del 2008 (Il Giornale): saputa, non detta.
- Titolo dello spettacolo (WebSearch): *Il mondo delle emozioni* esiste (TicketOne, La Nazione, Mentelocale; tournée che
  parte il 13/11/2026 a Ferrara), accanto a *Quando la vita era regolata dal cuore* e *L'illusione della libertà*. Resta
  domanda ⚠: non so quale lui abbia visto, né se fosse dal vivo o un video.
- Rinviato al consolidamento: passi 2-3 (testo primario in eKGWB/KSA, traduzione pubblicata), `wikidata` di Galimberti.

**Costi:** 6 file scritti (frammento, lettura, 3 nodi, restituzione) + 3 di `contesto/` rigenerati; il grezzo spostato.
3 ricerche. Tempo stimato della Routine: 3-4 minuti (avvio sessione ~1, ricerche ~1, scrittura e push ~1-2).

**Esito sul banco:** passa. File, nodi e risposta coincidono; nessun nodo del libro, nessun tema "giovani", titolo solo ⚠.
Divergenza col modello: il §5.2 scrive `wikidata` all'ingresso, il banco e il §3.1 no; ho seguito il §3.1.

---

## B02 · 2026-11-04 08:12 · la frase dell'ospite era verso la fine

> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

**`frammenti/2026/11/20261104-0812.md`**

```md
---
registrato: 2026-11-04T08:12:31+01:00
canale: telefono
---
ah e la frase dell'ospite era verso la fine, quando parlava dei greci
```

**`letture/2026/11/20261104-0812.md`** (passo 1: letti gli ultimi 3 giorni; "la frase dell'ospite" → `20261103-2340`)

```md
---
versione: 1
letto: 2026-11-04T08:13:02+01:00
intento: [salva]
atti: []
legami:
  - ritorna-su: 20261103-2340
    come: aggiunge
    voce: sua
    perche: "«la frase dell'ospite era verso la fine»"
  - nomina: nichilismo-ospite-inquietante
    momento: "verso la fine"
    voce: sua
    perche: "«era verso la fine»"
parole: [greci]
---
```

Nessun nodo nuovo né aggiornato. Il frammento del 3 novembre non si tocca.

**`restituzioni/2026/11/r-20261104-0813-risposta.md`**

```md
---
forma: risposta
per: 20261104-0812
voci: []
legami: []
---
**Aggiunto allo spezzone di ieri.**
```

**Risposta sul telefono:** "08:13 · **Aggiunto allo spezzone di ieri.**"

**Verifiche fatte:** nessuna ricerca (nessun fatto nuovo). Controllato a mano che "ospite" si risolve su un solo frammento
negli ultimi 3 giorni e su una sola citazione.

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/` rigenerato. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa. Nessun tema "greci", nessuna domanda, frammento di ieri intatto.

---

## B03 · 2026-11-09 19:02 · Jung, l'inconscio e il destino

> jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato

**`frammenti/2026/11/20261109-1902.md`**

```md
---
registrato: 2026-11-09T19:02:44+01:00
canale: telefono
---
jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato
```

**`letture/2026/11/20261109-1902.md`**

```md
---
versione: 1
letto: 2026-11-09T19:04:10+01:00
intento: [salva]
reazione:
  - parole: "mi ha spaccato"
    segnale: impatto
    verso: "+"
legami:
  - nomina: finche-non-rendi-conscio-l-inconscio
    voce: sua
    perche: "la frase come l'hai scritta, attribuita a Jung"
  - nomina: carl-gustav-jung
    voce: sua
    perche: "«jung:»"
parole: [inconscio, destino]
---
```

**`persone/carl-gustav-jung.md`** (nuovo: Jung non esisteva al punto zero, ora lo nomini tu)

```md
---
nome: Carl Gustav Jung
alias: [jung]
cerchia: mondo
nato-da: [20261109-1902]
---
```

**`citazioni/finche-non-rendi-conscio-l-inconscio.md`** (nuovo; niente `originale`, niente `esito`)

```md
---
nome: Finché non rendi conscio l'inconscio
autore: carl-gustav-jung
prova: memoria
nato-da: [20261109-1902]
---
Passo 1 (2026-11-09): così non risulta testuale; l'idea è vicina ad Aion, §126 (da verificare).
```

**`restituzioni/2026/11/r-20261109-1904-risposta.md`**

```md
---
forma: risposta
per: 20261109-1902
voci:
  - n: 1
    rif: "mondo: Jung, Aion §126 (da verificare)"
legami: []
---
**Salvata.** Così non sembra testuale ⚠: l'idea è vicina ad *Aion* (§126). Ti metto accanto il passo vero quando l'ho controllato.
```

**Risposta sul telefono:** "19:04 · **Salvata.** Così non sembra testuale ⚠: l'idea è vicina ad *Aion* (§126). Ti metto accanto il passo vero quando l'ho controllato."

**Verifiche fatte:** passo 1 (WebSearch): carljungdepthpsychologysite la elenca tra le frasi "attributed to but never uttered
by Dr. Jung"; altri blog la riconducono ad *Aion*, CW 9/II §126 ("when an inner situation is not made conscious, it happens
outside, as fate"). Il testo di *Aion* non l'ho aperto: §126 resta da verificare. Non è un apocrifo puro (l'idea è di Jung),
quindi niente `esito`. Rinviato: passi 2-3 (testo primario, traduzione Boringhieri), `wikidata` di Jung.

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa. Reazione d'impatto, nodo Jung nato, nessun esito, niente forma circolante in `originale`,
risposta uguale nel senso.

---

## B04 · 2026-11-11 19:45 · Private Music, "la 3"

> ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto

**`frammenti/2026/11/20261111-1945.md`**

```md
---
registrato: 2026-11-11T19:45:09+01:00
canale: telefono
---
ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto
```

**`letture/2026/11/20261111-1945.md`**

```md
---
versione: 1
letto: 2026-11-11T19:47:20+01:00
intento: [salva]
contesto: "in macchina, tutto di fila"
reazione:
  - parole: "la 3 mi ha distrutto"
    segnale: impatto
    verso: "+"
legami:
  - nomina: private-music
    momento: "traccia 3"
    fruizione: fatta
    voce: sua
    perche: "«ascoltato private music … tutto di fila»; «la 3»: titolo non risolto"
  - nomina: deftones
    voce: sua
    perche: "«dei deftones»"
---
```

**`opere/private-music.md`** (nuovo)

```md
---
nome: Private Music
alias: [private music]
autore: deftones
anno: 2025
nato-da: [20261111-1945]
---
```

Nessun nodo per la traccia: nasce dopo la conferma, con `in: private-music`.

**`restituzioni/2026/11/r-20261111-1947-risposta.md`**

```md
---
forma: risposta
per: 20261111-1945
voci:
  - n: 1
    rif: private-music
legami: []
---
**Salvato.** La 3 di *Private Music*: ti ricordi il titolo? Se no, lo prendo dalla tracklist e te lo confermo ⚠.
```

**Risposta sul telefono:** "19:47 · **Salvato.** La 3 di *Private Music*: ti ricordi il titolo? Se no, lo prendo dalla tracklist e te lo confermo ⚠."

**Verifiche fatte:** WebSearch sull'album (per `anno`, risoluzione dell'entità): *Private Music*, Deftones, uscito il 22 agosto
2025 (Reprise/Warner; Warner Music Ireland, AllMusic). La tracklist **non** l'ho cercata: il §2.6 la rinvia al consolidamento
(MusicBrainz). Rinviato: titolo della traccia 3, `musicbrainz` dell'album.

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/`. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa male. Nessun titolo a memoria, una domanda sola, reazione non legata a una traccia; ma il banco
vuole "La 3 è *[titolo]*, giusto?" e il modello (§2.6) rinvia il titolo: ho seguito il modello e lo dico nella risposta.
La lacuna del banco sul "contesto" non c'è: la lettura ha il campo `contesto`.

---

## B05 · 2026-11-16 23:00 · Telemaco, attribuito a Galimberti

> galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto

**`frammenti/2026/11/20261116-2300.md`**

```md
---
registrato: 2026-11-16T23:00:27+01:00
canale: telefono
---
galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto
```

**`letture/2026/11/20261116-2300.md`**

```md
---
versione: 1
letto: 2026-11-16T23:02:40+01:00
intento: [salva]
contesto: "in un reel"
reazione:
  - parole: "mi ha colpito tanto"
    segnale: impatto
    verso: "+"
legami:
  - nomina: umberto-galimberti
    voce: sua
    perche: "«galimberti in un reel»: l'attribuzione è tua"
  - nomina: telemaco
    voce: sua
    perche: "«telemaco che aspetta il padre guardando il mare»"
  - nomina: "Massimo Recalcati"
    voce: mondo
    perche: "l'idea del Telemaco che aspetta il padre è di Recalcati, Il complesso di Telemaco (Feltrinelli 2013); nessuna fonte trovata la dà a Galimberti (ricerca del 2026-11-16)"
parole: [padre, mare, aspettare]
---
```

**`persone/telemaco.md`** (nuovo; `in` in chiaro: l'*Odissea* non è un nodo)

```md
---
nome: Telemaco
alias: [telemaco]
cerchia: finzione
in: Odissea
nato-da: [20261116-2300]
---
```

Nessun nodo Recalcati (nasce solo dopo un tuo sì). `persone/umberto-galimberti.md` non cambia.

**`restituzioni/2026/11/r-20261116-2302-risposta.md`**

```md
---
forma: risposta
per: 20261116-2300
voci:
  - n: 1
    rif: "mondo: Massimo Recalcati, Il complesso di Telemaco (Feltrinelli 2013)"
legami: []
---
**Salvato.** L'idea di Telemaco che aspetta il padre è più probabilmente di Massimo Recalcati ○: *Il complesso di Telemaco* (Feltrinelli 2013). Correggo?
```

Notifica senza contenuto: sì (correzione di fatto).

**Risposta sul telefono:** "23:02 · **Salvato.** L'idea di Telemaco che aspetta il padre è più probabilmente di Massimo Recalcati ○: *Il complesso di Telemaco* (Feltrinelli 2013). Correggo?"

**Verifiche fatte:** WebSearch: *Il complesso di Telemaco. Genitori e figli dopo il tramonto del padre*, Recalcati, Feltrinelli,
marzo 2013, Serie Bianca (Sololibri, Macrolibrarsi, Allegoria); l'immagine del figlio che guarda il mare aspettando il padre
è sua. Seconda WebSearch "Galimberti Telemaco padre mare": nessuna fonte lega l'idea a Galimberti (resta "più probabile",
non "certo": un reel di Galimberti che la riprende non è escluso). Il reel non è raggiungibile (nessun link).

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/` + 1 notifica. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa. Stesso nodo Galimberti, Telemaco `finzione`, legame ○ su Recalcati senza nodo, nessuna
correzione da sola, "padre" solo parola. In più `aspettare` tra le parole, perché il §6.4 la vuole ricorrente con Murph.

---

## B06 · 2026-11-20 12:44 · Marco e la frase "di Camus"

> marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina

**`frammenti/2026/11/20261120-1244.md`**

```md
---
registrato: 2026-11-20T12:44:18+01:00
canale: telefono
---
marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina
```

**`letture/2026/11/20261120-1244.md`** (passo 3: "marco" cercato prima in `cerchia: vita`, vuota; nome nudo in prima persona → persona della vita, non `marco-aurelio`)

```md
---
versione: 1
letto: 2026-11-20T12:46:40+01:00
intento: [salva]
reazione:
  - parole: "carina ma un po' da bacio perugina"
    segnale: giudizio
    verso: "−"
legami:
  - tramite: marco
    voce: sua
    perche: "«marco mi ha mandato»"
  - nomina: non-camminare-davanti-a-me
    voce: sua
    perche: "«quella di camus: non camminare davanti a me…, ecc.»: la frase come la ricordi, attribuita a Camus"
---
```

Come nel §6.1–6.2: nessun `nomina: albert-camus`; Camus sta solo nel campo `attribuita-a` del nodo (in B03 la
simulazione aveva messo anche `nomina` di Jung: vedi gli attriti).

**`persone/marco.md`** (nuovo)

```md
---
nome: Marco
alias: []
cerchia: vita
nato-da: [20261120-1244]
---
```

**`citazioni/non-camminare-davanti-a-me.md`** (nuovo; nessun `autore`; esito all'ingresso perché è un apocrifo noto, passo 1)

```md
---
nome: Non camminare davanti a me
attribuita-a: [albert-camus]
esito: apocrifa
prova: secondaria
riferimento:
  url: https://quoteinvestigator.com/2015/08/23/friend/
  data: 2026-11-20
nato-da: [20261120-1244]
---
Quote Investigator: nessuna traccia negli scritti di Camus; l'attribuzione non ha appoggi. Origine ignota.
```

Nodi aggiornati: nessuno (`albert-camus` non cambia).

**`restituzioni/2026/11/r-20261120-1246-risposta.md`**

```md
---
forma: risposta
per: 20261120-1244
voci:
  - n: 1
    rif: non-camminare-davanti-a-me
legami: []
---
**Salvata**, con il tuo "da bacio perugina". Non risulta di Camus ○: nei suoi scritti non c'è, l'autore è ignoto (Quote Investigator).
```

Notifica senza contenuto: sì (correzione di fatto: l'attribuzione è sua).

**Risposta sul telefono:** "12:46 · **Salvata**, con il tuo "da bacio perugina". Non risulta di Camus ○: nei suoi scritti non c'è, l'autore è ignoto (Quote Investigator)."

**Verifiche fatte:** passo 1, 1 WebSearch ("Quote Investigator "Don't walk in front of me" Camus"): scheda QI del
23/08/2015, "Just Walk Beside Me and Be My Friend": nessuna prova che Camus l'abbia scritta; Goodreads la etichetta
"misattributed-albert-camus"; Tablet Magazine la tratta come canto da campo estivo. Pagina QI non aperta (bastava
l'estratto per l'esito). Rinviato: nulla (l'esito è chiuso al passo 1); nessun ID per Marco, mai.

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/` + 1 notifica. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa. Marco `vita` senza alias né ID, `tramite` ✦, citazione senza `autore` con `apocrifa` e
`secondaria`, reazione −, nessun tema su Marco.

---

## B07 · 2026-11-22 17:20 · l'estate invincibile, da tatuare

> camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei

**`frammenti/2026/11/20261122-1720.md`**

```md
---
registrato: 2026-11-22T17:20:05+01:00
canale: telefono
---
camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei
```

**`letture/2026/11/20261122-1720.md`**

```md
---
versione: 1
letto: 2026-11-22T17:22:30+01:00
intento: [salva]
reazione:
  - parole: "questa me la tatuerei"
    segnale: identificazione
    verso: "+"
legami:
  - nomina: estate-invincibile
    voce: sua
    perche: "«camus nella peste diceva tipo…»: frase a memoria («tipo»); l'opera come la ricordi, La peste, non risulta"
  - serve-a: tatuaggi
    voce: sua
    perche: "«questa me la tatuerei»"
---
```

**`citazioni/estate-invincibile.md`** (nuovo; nessun `esito`: non è un apocrifo)

```md
---
nome: Nel mezzo dell'inverno, un'estate invincibile
autore: albert-camus
prova: memoria
nato-da: [20261122-1720]
---
Passo 1 (2026-11-22): chiude Ritorno a Tipasa, nella raccolta L'Estate (1954), non La peste (da verificare sul testo).
```

Nodi aggiornati: nessuno. `raccolte/tatuaggi.md` non cambia (`nato-da` registra la nascita); nessun nodo per *La peste*
né per *L'Estate*.

**`restituzioni/2026/11/r-20261122-1722-risposta.md`**

```md
---
forma: risposta
per: 20261122-1720
voci:
  - n: 1
    rif: "mondo: Camus, Ritorno a Tipasa, in L'Estate (1954)"
legami: []
---
**Salvata, anche per i tatuaggi.** È di Camus, ma non della *Peste*: chiude *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠.
```

Notifica senza contenuto: sì (correzione di fatto, e su una frase da tatuare).

**Risposta sul telefono:** "17:22 · **Salvata, anche per i tatuaggi.** È di Camus, ma non della *Peste*: chiude *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠."

**Verifiche fatte:** passo 1, 2 WebSearch. (1) "Quote Investigator invincible summer Camus Retour à Tipasa": nessuna scheda
QI; più fonti (un PDF della traduzione inglese su stephenhicks.org, LRB, Wikiquote) danno la frase come chiusa di *Retour à
Tipasa*, in *L'Été* (1954), con l'originale "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible".
(2) "quoteinvestigator.com invincible summer": nessuna scheda QI, nessun segnale di apocrifo. L'originale francese **non**
l'ho scritto nel nodo: viene da fonti secondarie, e il testo primario è passo 2. Rinviato: passi 2-3 (testo di *L'Été*,
traduzione italiana pubblicata e traduttore), `esito`.

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/` + 1 notifica. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa. `autore` Camus, `prova: memoria`, `serve-a: tatuaggi` ✦, reazione d'identificazione, niente
*Peste* nel nodo né nodo della *Peste*. La *Peste* sbagliata resta solo nel frammento e nel `perche` (la lacuna del banco c'è).

---

## B08 · 2026-11-24 23:50 · Marco: "sempre in guerra con me stesso"

> marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso

**`frammenti/2026/11/20261124-2350.md`**

```md
---
registrato: 2026-11-24T23:50:41+01:00
canale: telefono
---
marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso
```

**`letture/2026/11/20261124-2350.md`** ("marco" → `marco`, `cerchia: vita`, dal 20 novembre; fuori dai 3 giorni, ma il nodo c'è)

```md
---
versione: 1
letto: 2026-11-24T23:52:15+01:00
intento: [salva]
reazione:
  - parole: "non l'ho presa bene"
    segnale: impatto
    verso: "−"
  - parole: "ci ha preso"
    segnale: identificazione
    verso: "+"
legami:
  - nomina: marco
    voce: sua
    perche: "«marco stasera mi ha detto»"
  - parla-di: battaglie-interiori
    voce: proposta
    perche: "«in guerra con me stesso» sono parole di Marco; «battaglie interiori» è tua, dal percorso interiore (4 ottobre)"
---
```

"Ci ha preso" l'ho letto come identificazione (ti riconosci nella frase), non giudizio: il banco dice giudizio. Nessuna
citazione per le parole di Marco: restano nel frammento. Nodi nuovi o aggiornati: nessuno.

**`restituzioni/2026/11/r-20261124-2352-risposta.md`**

```md
---
forma: risposta
per: 20261124-2350
voci:
  - n: 1
    rif: battaglie-interiori
legami:
  - parla-di: battaglie-interiori
    voce: proposta
    perche: "lo stesso legame della lettura, detto in risposta"
---
**Salvato.** "Battaglie interiori" è una tua parola dal primo giorno ✦.
```

Il segno è ✦ e non ✧ (modello §6.2 e banco): nel punto zero "battaglie interiori" nasce dal percorso interiore, voce sua.

**Risposta sul telefono:** "23:52 · **Salvato.** "Battaglie interiori" è una tua parola dal primo giorno ✦."

**Verifiche fatte:** nessuna ricerca (nessun fatto del mondo). Controllato a mano: `marco` esiste (B06) ed è l'unico nodo
`vita`; "battaglie interiori" è nel frammento `20261004-2212-perc` (voce sua). Grep sull'Atlante: "guerra con me stesso" non
compare da nessuna parte, quindi l'alias del tema nel punto zero è anticipato (vedi gli attriti).

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/`. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa male. Stesso nodo Marco, ◌ su battaglie interiori, nessuna citazione, nessun Marco Aurelio,
nessuna interpretazione; ma la risposta dice ✦ dove banco e §6.2 dicono ✧, e "ci ha preso" è identificazione, non giudizio.

---

## B09 · 2026-11-26 09:05 · Frankl, il perché e il come

> frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente

**`frammenti/2026/11/20261126-0905.md`**

```md
---
registrato: 2026-11-26T09:05:22+01:00
canale: telefono
---
frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente
```

**`letture/2026/11/20261126-0905.md`**

```md
---
versione: 1
letto: 2026-11-26T09:07:50+01:00
intento: [salva]
legami:
  - nomina: uno-psicologo-nei-lager
    fruizione: in-corso
    voce: sua
    perche: "«sto leggendo uno psicologo nei lager finalmente»"
  - tramite: viktor-frankl
    voce: sua
    perche: "«frankl:»: la frase ti arriva da lui"
  - nomina: chi-ha-un-perche
    voce: sua
    perche: "la frase come l'hai scritta, attribuita a Frankl"
---
```

**`persone/viktor-frankl.md`** (nuovo)

```md
---
nome: Viktor Frankl
alias: [frankl, viktor e. frankl]
cerchia: mondo
nato-da: [20261126-0905]
---
```

**`opere/uno-psicologo-nei-lager.md`** (nuovo)

```md
---
nome: Uno psicologo nei lager
alias: [uno psicologo nei lager, l'uomo in cerca di senso]
autore: viktor-frankl
nato-da: [20261126-0905]
---
```

**`citazioni/chi-ha-un-perche.md`** (nuovo; come la citazione dell'ospite nel §5.2: `autore` vero in chiaro, chi la porta in
`attribuita-a`, `prova: memoria`, niente esito)

```md
---
nome: Chi ha un perché per vivere sopporta quasi ogni come
autore: Friedrich Nietzsche
attribuita-a: [viktor-frankl]
prova: memoria
nato-da: [20261126-0905]
---
Passo 1 (2026-11-26, Quote Investigator): Nietzsche, Crepuscolo degli idoli (1889), «Sentenze e frecce»; Frankl la cita
e la dà a Nietzsche. Numero dell'aforisma da verificare.
```

Nodi aggiornati: nessuno.

**`restituzioni/2026/11/r-20261126-0907-risposta.md`**

```md
---
forma: risposta
per: 20261126-0905
voci:
  - n: 1
    rif: "mondo: Nietzsche, Crepuscolo degli idoli (1889), Sentenze e frecce"
  - n: 2
    rif: uno-psicologo-nei-lager
legami: []
---
**Salvato, libro in lettura.** La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*): Frankl la cita, e lo dice.
```

Notifica senza contenuto: sì (correzione di fatto).

**Risposta sul telefono:** "09:07 · **Salvato, libro in lettura.** La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*): Frankl la cita, e lo dice."

**Verifiche fatte:**
- Passo 1, 1 WebSearch + 1 WebFetch su Quote Investigator (9/10/2019, "If We Have Our Own 'Why' of Life…"): la frase è di
  Nietzsche, *Götzen-Dämmerung* (1889), sezione "Sprüche und Pfeile", "Hat man sein warum? des Lebens, so verträgt man sich
  fast mit jedem wie?"; Frankl la usa in *Man's Search for Meaning* (1946) dando il merito a Nietzsche. QI **non** dà il
  numero dell'aforisma: il §12 del banco resta da verificare. L'originale non l'ho scritto nel nodo (passo 2).
- 1 WebSearch sull'opera: *Uno psicologo nei lager*, Frankl, Ares (1978; 2012), poi altre edizioni (FrancoAngeli, 2024);
  titolo originale *Ein Psychologe erlebt das Konzentrationslager* (1946). Nessuna edizione scelta: non sai quale leggi.
- Rinviato: passi 2-3 (testo primario e numero dell'aforisma, traduzione italiana), `esito`, `wikidata` di Frankl,
  `openlibrary`/`wikidata` del libro.

**Costi:** 6 file scritti (frammento, lettura, 3 nodi, restituzione) + `contesto/` + 1 notifica. 2 ricerche + 1 lettura di
pagina. ~3-4 minuti.

**Esito sul banco:** passa. Frankl non è `autore`, il `tramite` ✦ c'è, libro `in-corso`, nodi Frankl e libro nati.
Divergenza: `autore: Friedrich Nietzsche` è scritto già all'ingresso, come nel §5.2; il banco lo vuole dopo il consolidamento.

---

## B10 · 2026-11-30 19:00 · "oggi mi sento come sisifo"

> oggi mi sento come sisifo

**`frammenti/2026/11/20261130-1900.md`**

```md
---
registrato: 2026-11-30T19:00:03+01:00
canale: telefono
---
oggi mi sento come sisifo
```

**`letture/2026/11/20261130-1900.md`** (passo 1: negli ultimi 3 giorni nessun frammento; nelle ultime 5 restituzioni niente su Sisifo)

```md
---
versione: 1
letto: 2026-11-30T19:01:40+01:00
intento: [salva]
legami:
  - parla-di: sisifo
    come: metafora
    voce: sua
    perche: "«mi sento come sisifo»: un'immagine per dire come stai, non l'argomento"
---
```

Nessun `sente`, nessun `nomina` del mito né del saggio di Camus, nessuna proposta.

**`persone/sisifo.md`** (nuovo: Sisifo non esisteva al punto zero, ora lo nomini tu; il personaggio, `finzione`, perché per il
§2.5 i personaggi del mito sono persone; il mito non è un nodo, `in` in chiaro)

```md
---
nome: Sisifo
alias: [sisifo]
cerchia: finzione
in: mito greco
nato-da: [20261130-1900]
---
```

Nodi aggiornati: nessuno. Le restituzioni importate `r-20261004-2228-ritratto-c16` e `-sisi` nominano "Sisifo (la discesa)"
in chiaro e non si riscrivono (sono immutabili).

**`restituzioni/2026/11/r-20261130-1901-risposta.md`**

```md
---
forma: risposta
per: 20261130-1900
voci: []
legami: []
---
**Salvato.**
```

**Risposta sul telefono:** "19:01 · **Salvato.**"

**Verifiche fatte:** nessuna ricerca. Controllato a mano: E66 (Sisifo felice) non è nel banco né nei frammenti, quindi "Il
masso o la discesa?" non ha appiglio (§6.6: solo se E66 è recente); `sisifo` non era un nodo (punto zero, "Non esistono").
Rinviato al consolidamento: la vicinanza con le restituzioni importate su Sisifo, la linea del tempo (umore, non posizione).

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/`. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa. `parla-di` con `come: metafora` ✦, nessun `sente`, nessun Camus, nessun `contraddice`, nessuna
domanda. La lacuna del banco non c'è: il §2.3 ammette `parla-di` verso "qualunque nodo usato come immagine". In più nasce il
nodo Sisifo, che il banco non elenca.

---

## B11 · 2026-12-05 18:40 · il mondo ti spezza, tipo kintsugi

> chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi

**`frammenti/2026/12/20261205-1840.md`**

```md
---
registrato: 2026-12-05T18:40:17+01:00
canale: telefono
---
chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi
```

**`letture/2026/12/20261205-1840.md`** (passo 1: nessun frammento negli ultimi 3 giorni; nelle ultime 5 restituzioni niente di vicino)

```md
---
versione: 1
letto: 2026-12-05T18:42:30+01:00
intento: [salva, chiedi]
legami:
  - nomina: il-mondo-spezza-tutti
    voce: sua
    perche: "«il mondo ti spezza e poi alcuni diventano più forti nei punti rotti»: la frase come la ricordi, senza autore («chi è che diceva»)"
  - converge-con: [il-mondo-spezza-tutti, kintsugi]
    voce: sua
    perche: "«tipo kintsugi»"
parole: [punti rotti]
---
```

**`citazioni/il-mondo-spezza-tutti.md`** (nuovo; nessuna attribuzione tua, quindi niente `attribuita-a`; `autore` in chiaro perché Hemingway non è un nodo e non lo nomini tu)

```md
---
nome: Il mondo spezza tutti
autore: Ernest Hemingway
prova: memoria
nato-da: [20261205-1840]
---
Passo 1 (2026-12-05): nessuna scheda di apocrifo; più fonti la danno in Addio alle armi (1929), cap. 34 (da verificare sul testo).
```

**`temi/kintsugi.md`** (nuovo: §2.6, "un concetto o un'immagine con un nome proprio (kintsugi…)" nasce alla prima occorrenza; genere `temi/` per il §2.5, "il concetto"; contro la lettera del §4.1.4, "nessun tema nuovo")

```md
---
nome: kintsugi
alias: []
nato-da: [20261205-1840]
---
```

**`restituzioni/2026/12/r-20261205-1842-risposta.md`**

```md
---
forma: risposta
per: 20261205-1840
voci:
  - n: 1
    rif: "mondo: Hemingway, Addio alle armi (1929), cap. 34 (da verificare)"
legami: []
---
**Hemingway**, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦.
```

Notifica: nessuna (non è una correzione né un ponte forte; vedi gli attriti).

**Risposta sul telefono:** "18:42 · **Hemingway**, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦."

**Verifiche fatte:** passo 1, 1 WebSearch (Quote Investigator + "world breaks every one"): nessuna scheda QI sulla frase
(QI ha solo quella su "We are all broken, that's how the light gets in", che non è di Hemingway); Hemingway Society e altri
siti la danno in *A Farewell to Arms* (1929), uno al cap. 34. Testo primario non aperto: capitolo ⚠, nessun `esito`.
Rinviato: passi 2-3 (testo inglese, traduzione italiana e traduttore), `esito`, l'eventuale precursore (un aggregatore cita
QI su W. L. Sheldon, non verificato).

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 1 ricerca. ~3 minuti.

**Esito sul banco:** passa. Salva e chiedi, citazione `prova: memoria` con Hemingway in chiaro, `converge-con` ✦, risposta
uguale. La lacuna del banco si scioglie col §2.6 (kintsugi nasce), ma contro il §4.1.4: vedi gli attriti.

---

## B12 · 2026-12-07 02:10 · la cura, il primo ballo, nonna Lina

> la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso

**`frammenti/2026/12/20261207-0210.md`**

```md
---
registrato: 2026-12-07T02:10:48+01:00
canale: telefono
---
la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso
```

**`letture/2026/12/20261207-0210.md`** (prudenza del §4.1: nessuna proposta, nessun tema; "nonna lina" cercata prima in `cerchia: vita`: c'è solo `marco`)

```md
---
versione: 1
letto: 2026-12-07T02:11:40+01:00
intento: [salva]
contesto: "al matrimonio della cugina, il primo ballo"
reazione:
  - parole: "ho pianto come un cretino"
    segnale: impatto
    verso: "+"
legami:
  - nomina: la-cura
    voce: sua
    perche: "«la cura di battiato … il primo ballo»"
  - nomina: franco-battiato
    voce: sua
    perche: "«di battiato»"
  - nomina: nonna-lina
    voce: sua
    perche: "«nonna lina c'era ancora l'anno scorso»"
---
```

Nessun nodo per la cugina né per il matrimonio; nessuna `parole`.

**`opere/la-cura.md`** · **`persone/franco-battiato.md`** · **`persone/nonna-lina.md`** (nuovi)

```md
---
nome: La cura
alias: [la cura]
autore: franco-battiato
anno: 1996
nato-da: [20261207-0210]
---
```

```md
---
nome: Franco Battiato
alias: [battiato]
cerchia: mondo
nato-da: [20261207-0210]
---
```

```md
---
nome: nonna Lina
alias: []
cerchia: vita
nato-da: [20261207-0210]
---
```

**`restituzioni/2026/12/r-20261207-0211-risposta.md`**

```md
---
forma: risposta
per: 20261207-0210
voci: []
legami: []
---
**Salvato.** Un abbraccio.
```

**Risposta sul telefono:** "02:11 · **Salvato.** Un abbraccio."

**Verifiche fatte:** 1 WebSearch per l'entità (autore, anno): *La cura*, Battiato e Sgalambro, nell'album *L'imboscata*
(Mercury, 23 ottobre 1996); singolo nel 1997 (Wikipedia en). Nessun testo riprodotto. Rinviato: `wikidata`/`musicbrainz`
di brano e Battiato (mai per nonna Lina).

**Costi:** 6 file scritti (frammento, lettura, 3 nodi, restituzione) + `contesto/`. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa. `la-cura` ✦ con autore Battiato, nonna Lina `vita`, reazione d'impatto, niente temi né
proposte, niente lutto nominato. In più nasce il nodo Battiato (lo nomini tu), che il banco non elenca. L'esclusione dalla
lettera e dal "ti ricordi?" non ha dove scriversi: vedi gli attriti.

---

## B13 · 2026-12-09 18:00 · link Spotify nudo

> https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3

**`frammenti/2026/12/20261209-1800.md`** (il link resta con `?si=`)

```md
---
registrato: 2026-12-09T18:00:05+01:00
canale: telefono
---
https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3
```

**`letture/2026/12/20261209-1800.md`**

```md
---
versione: 1
letto: 2026-12-09T18:01:30+01:00
intento: [salva]
link: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
legami:
  - nomina: never-gonna-give-you-up
    voce: sua
    perche: "il link, senza parole tue; titolo dall'oEmbed di Spotify, artista dalla pagina del brano"
---
```

**`opere/never-gonna-give-you-up.md`** (nuovo; l'artista non è un nodo: in chiaro)

```md
---
nome: Never Gonna Give You Up
alias: []
autore: Rick Astley
link: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
nato-da: [20261209-1800]
---
```

**`restituzioni/2026/12/r-20261209-1801-risposta.md`**

```md
---
forma: risposta
per: 20261209-1800
voci:
  - n: 1
    rif: never-gonna-give-you-up
legami: []
---
**Salvato** *Never Gonna Give You Up*, Rick Astley ○. Che cosa ti ha preso?
```

**Risposta sul telefono:** "18:01 · **Salvato** *Never Gonna Give You Up*, Rick Astley ○. Che cosa ti ha preso?"

**Verifiche fatte:** oEmbed vero (`open.spotify.com/oembed?url=…`, con curl e WebFetch): risponde con `title: "Never Gonna
Give You Up"` e **nessun campo artista**. L'artista l'ho preso dalla pagina del brano (`og:description`: "Rick Astley ·
Whenever You Need Somebody · Song · 1987"), una richiesta in più. L'id del banco è quindi un brano reale, il celebre
*rickroll*: lo tratto alla lettera, senza commenti. Rinviato: `musicbrainz` del work/recording.

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/`. 2 richieste HTTP, 0 ricerche. ~2 minuti.

**Esito sul banco:** passa. `?si=` nel frammento, link pulito nella lettura (il campo `link` c'è: la lacuna del banco non
c'è), titolo e artista ○, nessuna reazione né tema, una domanda. Ma l'artista non viene dall'oEmbed: vedi gli attriti.

---

## B14 · 2026-12-10 23:00 · link YouTube dal minuto 12

> https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello

**`frammenti/2026/12/20261210-2300.md`**

```md
---
registrato: 2026-12-10T23:00:09+01:00
canale: telefono
---
https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello
```

**`letture/2026/12/20261210-2300.md`** (oEmbed fallito: nessun nodo, il video resta in chiaro nel legame)

```md
---
versione: 1
letto: 2026-12-10T23:01:20+01:00
intento: [salva]
link: https://youtu.be/dQ9xLmP0aBc?t=754
legami:
  - nomina: "video YouTube dQ9xLmP0aBc (titolo non letto)"
    momento: "12:34"
    voce: sua
    perche: "«dal minuto 12 in poi, ascolta solo quello»; t=754 nel link"
---
```

**`restituzioni/2026/12/r-20261210-2301-risposta.md`**

```md
---
forma: risposta
per: 20261210-2300
voci: []
legami: []
---
**Salvato il link**, dal 12:34. Il video non riesco a leggerlo ⚠.
```

**Risposta sul telefono:** "23:01 · **Salvato il link**, dal 12:34. Il video non riesco a leggerlo ⚠."

**Verifiche fatte:** oEmbed di YouTube (WebFetch e curl su `youtube.com/oembed?url=…dQ9xLmP0aBc`): **404**. Controprova
con un id noto (`dQw4w9WgXcQ`): 200, quindi il servizio funziona e il video del banco non esiste o non è pubblico.
`t=754` = 12:34. Rinviato: un nuovo tentativo nel consolidamento (nel modello non è scritto).

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/`. 2 richieste HTTP. ~1-2 minuti.

**Esito sul banco:** passa male. `t=` conservato, momento 12:34, nessun "che cosa ti ha preso?"; ma il banco vuole titolo
e canale, che non esistono (404), e il fallback l'ho preso per analogia da B13: il modello non ne ha uno.

---

## B15 · 2026-12-12 20:15 · Pinterest, Rilke in inglese

> https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo

**`frammenti/2026/12/20261212-2015.md`** (intatto, con `it.` e `?mt=login`)

```md
---
registrato: 2026-12-12T20:15:33+01:00
canale: telefono
---
https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo
```

**`letture/2026/12/20261212-2015.md`** (nessuna immagine scaricata; Rilke solo nel campo del nodo citazione, come Camus in B06)

```md
---
versione: 1
letto: 2026-12-12T20:17:10+01:00
intento: [salva]
link: https://www.pinterest.com/pin/1234567890123/
legami:
  - nomina: let-everything-happen-to-you
    voce: sua
    perche: "«let everything happen to you: beauty and terror. rilke credo»: in inglese, come circola; l'attribuzione è tua, incerta"
  - serve-a: tatuaggi
    voce: proposta
    perche: "una frase con un pin: nell'Atlante ogni pin era un riferimento per i tatuaggi"
---
```

**`persone/rainer-maria-rilke.md`** · **`citazioni/let-everything-happen-to-you.md`** (nuovi; una citazione sola, nessun originale né traduzione all'ingresso)

```md
---
nome: Rainer Maria Rilke
alias: [rilke]
cerchia: mondo
nato-da: [20261212-2015]
---
```

```md
---
nome: Let everything happen to you: beauty and terror
autore: rainer-maria-rilke
prova: memoria
nato-da: [20261212-2015]
---
Passo 1 (2026-12-12): nessuna scheda di apocrifo. È la resa inglese di Anita Barrows e Joanna Macy (Rilke's Book of Hours,
Riverhead 1996), I, 59: Libro d'ore, prima parte (Il libro della vita monastica, 1899). Originale e traduzione italiana da verificare.
```

**`restituzioni/2026/12/r-20261212-2017-risposta.md`**

```md
---
forma: risposta
per: 20261212-2015
voci:
  - n: 1
    rif: let-everything-happen-to-you
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "lo stesso legame della lettura"
---
**Salvata.** Sì, Rilke ⚠: *Libro d'ore*, prima parte (1899); l'inglese è di Barrows e Macy.
```

**Risposta sul telefono:** "20:17 · **Salvata.** Sì, Rilke ⚠: *Libro d'ore*, prima parte (1899); l'inglese è di Barrows e Macy."

**Verifiche fatte:** passo 1, 2 WebSearch. (1) Il verso tedesco ("Laß dir alles geschehn: Schönheit und Schrecken") nello
*Stunden-Buch*: la ricerca dà la struttura (I, 1899; II, 1901; III, 1903; testo su Projekt Gutenberg) ma non trova il verso.
(2) La forma inglese: Art & Theology e altri la danno come *Book of Hours* I, 59, traduzione Barrows e Macy (Riverhead 1996).
Nessun segnale di apocrifo, nessun `esito`. L'anno di pubblicazione del libro (non il 1899 della stesura) non l'ho
verificato. Rinviato: passi 2-3 (verso tedesco sul testo di Gutenberg, traduzione italiana e traduttore), `wikidata` di Rilke.

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa. Pin normalizzato nella lettura, nessuna immagine, Rilke nato, una citazione sola `prova: memoria`
✦, niente "c'è già". Il "(1899)" del banco è l'anno della prima parte, non del libro: l'ho detto come tale.

---

## B16 · 2027-01-09 16:30 · Eraclito e la nave di Teseo, la stessa domanda

> eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?

**`frammenti/2027/01/20270109-1630.md`**

```md
---
registrato: 2027-01-09T16:30:41+01:00
canale: telefono
---
eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?
```

**`letture/2027/01/20270109-1630.md`** (passo 1: nessun frammento negli ultimi 3 giorni; l'ultimo è del 12 dicembre, 28 giorni fa: scatta il "mentre eri via" del §4.3)

```md
---
versione: 1
letto: 2027-01-09T16:32:20+01:00
intento: [salva]
legami:
  - nomina: eraclito
    voce: sua
    perche: "«eraclito il fiume»"
  - converge-con: [fiume-di-eraclito, nave-di-teseo]
    voce: sua
    perche: "«sono la stessa domanda»"
  - parla-di: chi-sono
    voce: proposta
    perche: "«io sono la stessa persona di 5 anni fa?» è la domanda «Chi sono?» detta nel tempo"
parole: [stessa persona]
---
```

`intento: [salva]`, non `[salva, chiedi]`: la domanda è rivolta a sé, è il contenuto della convergenza, non una richiesta
all'AI (il §4.1.2 direbbe "nel dubbio salva e chiedi": vedi gli attriti). Nessun `vissuto` ("5 anni fa" è dentro la domanda).

**`persone/eraclito.md`** · **`temi/fiume-di-eraclito.md`** · **`temi/nave-di-teseo.md`** (nuovi; i due concetti-immagine con nome proprio per il §2.6, in `temi/` come kintsugi in B11; Plutarco non lo nomini, nessun nodo)

```md
---
nome: Eraclito
alias: [eraclito]
cerchia: mondo
nato-da: [20270109-1630]
---
```

```md
---
nome: il fiume di Eraclito
alias: [eraclito il fiume, il fiume]
nato-da: [20270109-1630]
---
```

```md
---
nome: la nave di Teseo
alias: [nave di teseo]
nato-da: [20270109-1630]
---
```

Nodi aggiornati: nessuno (`temi/chi-sono.md` non cambia: il `parla-di` è proposto, e `nato-da` elenca i frammenti-prova).

**`restituzioni/2027/01/r-20270109-1632-risposta.md`**

```md
---
forma: risposta
per: 20270109-1630
voci:
  - n: 1
    rif: chi-sono
legami:
  - parla-di: chi-sono
    voce: proposta
    perche: "lo stesso legame della lettura"
---
**Salvato:** fiume e nave, la stessa domanda ✦. È anche la tua «Chi sono?» ◌.
```

**`restituzioni/2027/01/r-20270109-1632-ritorno.md`** (§4.3: "quando torni dopo 14 giorni o più", una cosa sola; nel silenzio è nata solo la lettera di domenica 13 dicembre, non simulata)

```md
---
forma: ritorno
per: 20270109-1630
voci:
  - n: 1
    rif: r-20261213-2100-settimana
legami: []
---
Mentre eri via: la lettera del 13 dicembre è ancora lì.
```

**Risposta sul telefono:** "16:32 · Mentre eri via: la lettera del 13 dicembre è ancora lì. **Salvato:** fiume e nave, la stessa domanda ✦. È anche la tua «Chi sono?» ◌."

**Verifiche fatte:** nessuna verifica richiesta dal modello (nessuna citazione, nessun link). 1 WebSearch solo per giudicare
la risposta del banco: il "non ci si bagna due volte" è nel *Cratilo* 402a, dove Socrate lo attribuisce a Eraclito; il
frammento B12 dice altro ("acque sempre diverse"), e c'è chi pensa che Platone riporti Cratilo (Wikipedia, Wikiquote,
askphilosophers). Il dato del banco regge, ma il modello non lo fa dire. Nave di Teseo (Plutarco, *Teseo* 23): non cercata,
non serve all'ingresso.

**Costi:** 7 file scritti (frammento, lettura, 3 nodi, 2 restituzioni) + `contesto/`. 0 ricerche della Routine (1 mia di controllo). ~2 minuti.

**Esito sul banco:** passa male. `converge-con` ✦ con il `perche` giusto, un solo `parla-di` ◌ verso "Chi sono?", nessuna
risposta alla domanda esistenziale. Ma la risposta diverge: il §4.3 ammette un aggancio solo (conto, ponte, correzione) e
il Platone del banco non è nessuno dei tre; in più il modello aggiunge il "mentre eri via", che il banco non prevede.
Eraclito nasce come persona e il fiume come tema: due nodi da tre parole (vedi gli attriti).

---

## B17 · 2027-02-03 07:10 · il sogno della scala che scende al mare

> sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura

**`frammenti/2027/02/20270203-0710.md`**

```md
---
registrato: 2027-02-03T07:10:12+01:00
canale: telefono
---
sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura
```

**`letture/2027/02/20270203-0710.md`** (passo 1: nessun frammento negli ultimi 3 giorni; silenzio di 25 giorni dal 9 gennaio: di nuovo "mentre eri via")

```md
---
versione: 1
letto: 2027-02-03T07:11:30+01:00
intento: [salva]
vissuto: stanotte
contesto: "un sogno"
reazione:
  - parole: "non avevo paura"
    segnale: impatto
    verso: "+"
legami: []
parole: [scala, scendere, mare]
---
```

Nessun legame proposto: al punto zero non c'è nessun simbolo ereditato (l'import non porta `simboli/`), e l'unico aggancio
possibile, la discesa di Sisifo (`r-20261004-2228-ritratto-sisi`), sarebbe già un'interpretazione. Rinviato alla fase 2 del
consolidamento, se mai. Il segnale `impatto` è scelto per forza (vedi gli attriti). "Mare" alla seconda occorrenza (B05).

**`restituzioni/2027/02/r-20270203-0711-risposta.md`**

```md
---
forma: risposta
per: 20270203-0710
voci: []
legami: []
---
**Salvato il sogno.**
```

**`restituzioni/2027/02/r-20270203-0711-ritorno.md`** (nel silenzio: la lettera del 10 gennaio e il ritratto del trimestre, "inizio febbraio" per il §5.5; una cosa sola, il ritratto)

```md
---
forma: ritorno
per: 20270203-0710
voci:
  - n: 1
    rif: contesto/ritratto.md
legami: []
---
Mentre eri via è arrivato il ritratto di novembre–gennaio.
```

**Risposta sul telefono:** "07:11 · Mentre eri via è arrivato il ritratto di novembre–gennaio. **Salvato il sogno.**"

**Verifiche fatte:** nessuna ricerca (niente entità, niente citazioni). Controllato a mano: nessun nodo `scala`, `mare` o
simbolo nel punto zero; "mare" solo nelle parole di B05. Rinviato: l'eventuale legame ◌ del sogno (fase 2).

**Costi:** 4 file scritti (frammento, lettura, 2 restituzioni) + `contesto/`. 0 ricerche. ~1 minuto.

**Esito sul banco:** passa. `vissuto: stanotte`, "non avevo paura" citata, `parole: [scala, mare]` (più "scendere"), nessuna
interpretazione, niente Telemaco né padre. In più il "mentre eri via", che il banco non prevede.

---

## B18 · 2027-02-09 13:00 · "boh niente"

> boh niente volevo solo scrivere qualcosa

**`frammenti/2027/02/20270209-1300.md`**

```md
---
registrato: 2027-02-09T13:00:55+01:00
canale: telefono
---
boh niente volevo solo scrivere qualcosa
```

**`letture/2027/02/20270209-1300.md`** (passo 1: B17 è di 6 giorni fa, fuori dai 3 giorni; niente da risolvere)

```md
---
versione: 1
letto: 2027-02-09T13:01:10+01:00
intento: [niente]
legami: []
---
```

**`restituzioni/2027/02/r-20270209-1301-risposta.md`**

```md
---
forma: risposta
per: 20270209-1300
voci: []
legami: []
---
Ci sono.
```

**Risposta sul telefono:** "13:01 · Ci sono."

**Verifiche fatte:** nessuna. Controllato: silenzio di 6 giorni, sotto i 14: nessun "mentre eri via".

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/`. 0 ricerche. <1 minuto.

**Esito sul banco:** passa. `intento: [niente]`, nessun legame, nessuna proposta né domanda, "Ci sono."

---

## B19 · 2027-03-01 22:00 · Karamazov, la cura in radio, il litigio

> oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata

**`frammenti/2027/03/20270301-2200.md`**

```md
---
registrato: 2027-03-01T22:00:18+01:00
canale: telefono
---
oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata
```

**`letture/2027/03/20270301-2200.md`** (passo 1: nessun frammento negli ultimi 3 giorni; silenzio di 20 giorni: "mentre eri via"; "mio padre" cercato prima in `cerchia: vita`: ci sono `marco` e `nonna-lina`)

```md
---
versione: 1
letto: 2027-03-01T22:02:00+01:00
intento: [salva]
reazione:
  - parole: "giornata"
    segnale: giudizio
    verso: "−"
legami:
  - nomina: i-fratelli-karamazov
    fruizione: fatta
    voce: sua
    perche: "«finito karamazov»"
  - nomina: la-cura
    voce: sua
    perche: "«sentito la cura in radio»"
  - nomina: papa
    voce: sua
    perche: "«litigato con mio padre»"
parole: [padre]
---
```

Un frammento solo, tre legami. Il riascolto di *La cura* è un `nomina` e basta: non c'è `ritorna-su` (non torni sul
frammento del 7 dicembre). "In radio" sta nel `perche`: `contesto` è uno per lettura e qui varrebbe solo per un legame.

**`opere/i-fratelli-karamazov.md`** · **`persone/papa.md`** (nuovi; Dostoevskij in chiaro, non è un nodo e non lo nomini tu; lo slug `papa` come nel §6.4, per non occupare `padre`, che il §6.4 riserva al tema)

```md
---
nome: I fratelli Karamazov
alias: [karamazov]
autore: Fëdor Dostoevskij
anno: 1880
nato-da: [20270301-2200]
---
```

```md
---
nome: mio padre
alias: [mio padre]
cerchia: vita
nato-da: [20270301-2200]
---
```

Nodi aggiornati: nessuno (`opere/la-cura.md` non elenca i frammenti che la nominano: `nato-da` resta B12).

**`restituzioni/2027/03/r-20270301-2202-risposta.md`**

```md
---
forma: risposta
per: 20270301-2200
voci:
  - n: 1
    rif: i-fratelli-karamazov
legami: []
---
**Segnato tutto.** Karamazov finito.
```

**`restituzioni/2027/03/r-20270301-2202-ritorno.md`** (nel silenzio: la lettera di domenica 15 febbraio, nata da una settimana con il solo "boh niente")

```md
---
forma: ritorno
per: 20270301-2200
voci:
  - n: 1
    rif: r-20270215-2100-settimana
legami: []
---
Mentre eri via: la lettera del 15 febbraio è ancora lì.
```

**Risposta sul telefono:** "22:02 · Mentre eri via: la lettera del 15 febbraio è ancora lì. **Segnato tutto.** Karamazov finito."

**Verifiche fatte:** 1 WebSearch per l'entità (autore, anno, come per Battiato in B12): a puntate sul *Russkij vestnik*,
gennaio 1879 – novembre 1880; in volume nel 1880 (operus.uniud.it, vqronline, Wikipedia). `anno: 1880` = forma integrale.
Rinviato: `wikidata`/`openlibrary` del romanzo; mai ID per `papa`.

**Costi:** 6 file scritti (frammento, lettura, 2 nodi, 2 restituzioni) + `contesto/`. 1 ricerca. ~2 minuti.

**Esito sul banco:** passa. Un frammento, Karamazov `fruizione: fatta` ✦ (nato), `la-cura` ✦ sul nodo di B12, `persone/papa.md`
`cerchia: vita`, `parole: [padre]`, nessuna domanda, nessun tema. La risposta è quella del banco, più il "mentre eri via".
La lacuna del banco (il ritorno spontaneo su *La cura* non ha un segno) resta: vedi gli attriti.

---

## B20 · 2027-03-08 23:40 · forse è la noia

> forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove

**`frammenti/2027/03/20270308-2340.md`**

```md
---
registrato: 2027-03-08T23:40:29+01:00
canale: telefono
---
forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove
```

**`letture/2027/03/20270308-2340.md`** (passo 1: B19 è di 7 giorni fa; nessun riferimento da risolvere. Non è `intento: sguardo`: non lo dichiari tale, §2.2)

```md
---
versione: 1
letto: 2027-03-08T23:41:50+01:00
intento: [salva]
legami:
  - parla-di: dolore
    voce: sua
    perche: "«forse il dolore non è la dimensione principale della vita… il dolore almeno ti muove»"
parole: [noia]
---
```

Nessun `contraddice`: le contraddizioni con lo sguardo sono del consolidamento, fase 1 (§3.1). Rinviato al consolidamento del
14 marzo: `contraddice` ◌ verso `20261004-2228-nucl`, che non cambia; non rende `superato` niente (§2.6: è proposto).

**`restituzioni/2027/03/r-20270308-2341-risposta.md`** (un aggancio, il ponte forte con lo sguardo; nessuna domanda: il §6.5 dice che l'unica domanda senza ambiguità è il link muto, e il confronto con domanda è della lettera, §4.3)

```md
---
forma: risposta
per: 20270308-2340
voci:
  - n: 1
    rif: 20261004-2228-nucl
legami: []
---
**Segnato.** A ottobre, nel tuo sguardo ✧: «La dimensione principale della realtà è il dolore».
```

Notifica senza contenuto: sì (ponte forte).

**Risposta sul telefono:** "23:41 · **Segnato.** A ottobre, nel tuo sguardo ✧: «La dimensione principale della realtà è il dolore»."

**Verifiche fatte:** nessuna ricerca (niente entità, niente citazioni; Schopenhauer non entra). Controllato sul punto zero la
frase esatta del nucleo: "La dimensione principale della realtà è il dolore" (realtà, non vita), e che `dolore` è un tema
esistente. Rinviato: il `contraddice` ◌ e la linea delle posizioni (consolidamento, fase 1).

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/` + 1 notifica. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa male. `parla-di: dolore` ✦, `parole: [noia]`, nucleo intatto, niente Schopenhauer, niente "hai cambiato
idea". Ma la risposta non fa la domanda del banco ("è un cambio, o un'altra faccia?"): il modello all'ingresso non la ammette
(§6.5), mentre la ammette per Sisifo (§6.6). Ho seguito il §6.5.

---

## B21 · 2027-03-10 18:20 · foto di una pagina, "questa"

> [foto di una pagina con una riga sottolineata a matita] questa

La simulazione non ha la foto: la riga letta resta un segnaposto, «⟨riga⟩». Non la invento.

**`frammenti/2027/03/20270310-1820.md`** · **`frammenti/2027/03/20270310-1820.webp`** (accanto, stesso nome: §2.2 riga 91; il campo `allegati` del §2.2 dice invece `img/…webp`)

```md
---
registrato: 2027-03-10T18:20:41+01:00
canale: telefono
allegati: [20270310-1820.webp]
---
questa
```

**`letture/2027/03/20270310-1820.md`** (passo 1: B20, di due giorni fa, non c'entra; "questa" punta alla foto)

```md
---
versione: 1
letto: 2027-03-10T18:22:30+01:00
intento: [salva]
contesto: "foto di una pagina di libro, una riga sottolineata a matita"
trascrizione: "⟨riga⟩"
legami:
  - nomina: ⟨incipit-della-riga⟩
    voce: sua
    perche: "«questa», con la riga sottolineata nella foto; il testo è letto dalla foto, non è parola tua"
---
```

Nessuna `reazione` (il gesto della matita non sono parole), nessuna `parole`.

**`citazioni/⟨incipit-della-riga⟩.md`** (nuovo; senza `autore` né `attribuita-a`; senza `originale`: non si sa se la pagina è un originale o una traduzione)

```md
---
nome: "⟨riga⟩"
prova: memoria
nato-da: [20270310-1820]
---
Letta da una foto (2027-03-10); libro e autore sconosciuti.
```

**`restituzioni/2027/03/r-20270310-1822-risposta.md`**

```md
---
forma: risposta
per: 20270310-1820
voci:
  - n: 1
    rif: ⟨incipit-della-riga⟩
legami: []
---
**Salvata.** Dalla foto leggo: «⟨riga⟩» ⚠.
```

**Risposta sul telefono:** "18:22 · **Salvata.** Dalla foto leggo: «⟨riga⟩» ⚠."

**Verifiche fatte:** nessuna ricerca: senza la foto non c'è testo da cercare. Alla lettera, il passo 1 sulla riga
(1-2 ricerche) è consentito, e potrebbe trovare il libro *cercando la frase* (non indovinandolo dallo stile). Controllato:
la lettura ha il campo `trascrizione` (§2.2), quindi la lacuna del banco ("nessun campo per il testo estratto") non c'è.
Rinviato: verifica passi 2-3, `esito` (`non-trovata` se il consolidamento non la trova), il ridimensionamento non è
assegnato a nessuno dal modello.

**Costi:** 5 file (frammento, `.webp`, lettura, 1 nodo, restituzione) + `contesto/`. 0 ricerche. ~2 minuti (+ OCR).

**Esito sul banco:** passa male. Allegato, `trascrizione` separata dalle parole tue, nodo senza autore e `prova: memoria`,
nessun libro indovinato. Manca la domanda "Da che libro?": il §4.1.3 la consente solo per un'entità ambigua, il §6.5 solo per
il link muto, e qui non c'è né l'una né l'altro.

---

## B22 · 2027-03-12 16:00 · "non era jung era peterson"

> no aspetta quella di ieri sulla casa in ordine non era jung era peterson

**`frammenti/2027/03/20270312-1600.md`**

```md
---
registrato: 2027-03-12T16:00:07+01:00
canale: telefono
---
no aspetta quella di ieri sulla casa in ordine non era jung era peterson
```

**`letture/2027/03/20270312-1600.md`** (passo 1: negli ultimi 3 giorni c'è solo B21, la foto: se sono 72 ore, B20 (8 marzo 23:40) ne è fuori. L'11 marzo non c'è nessun frammento. Cercato in tutto l'archivio: nessun frammento parla della casa in ordine, nessuna citazione ha `attribuita-a` Jung con quel tema; l'unica frase "di Jung" è B03, del 9 novembre, fuori dalla finestra e su altro)

```md
---
versione: 1
letto: 2027-03-12T16:02:10+01:00
intento: [correggi]
legami:
  - nomina: jordan-peterson
    voce: sua
    perche: "«era peterson»: l'autore giusto, secondo te, di una frase «sulla casa in ordine» che non trovo («non era jung»)"
parole: [casa in ordine]
atti: []
---
```

Nessun `ritorna-su` (non c'è un bersaglio), nessun atto `corregge`, nessun nodo citazione: la frase non c'è e non si inventa.
Jung non riceve `nomina`: è nominato per negarlo. Nodi aggiornati: nessuno (`jordan-peterson` esiste dal nucleo).

**`restituzioni/2027/03/r-20270312-1602-risposta.md`**

```md
---
forma: risposta
per: 20270312-1600
voci: []
legami: []
---
Non trovo la frase di ieri sulla casa in ordine: me la riscrivi?
```

**Risposta sul telefono:** "16:02 · Non trovo la frase di ieri sulla casa in ordine: me la riscrivi?"

**Verifiche fatte:** grep sull'archivio simulato ("casa", "ordine", "peterson", "jung"): nessun frammento; Peterson è solo nel
nucleo. Nessuna ricerca sul web: non c'è una citazione da verificare, e dire quale frase di Peterson sia vorrebbe dire
indovinarla. Rinviato: niente.

**Costi:** 3 file (frammento, lettura, restituzione) + `contesto/`. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa (ramo "come nel banco"). `intento: [correggi]`, nessun atto, niente su B03 né su B21, frase non
inventata, risposta uguale. Ma la domanda la ho scelta io: il modello non dice che cosa fare quando "quella di ieri" non si
risolve.

---

## B23 · 2027-03-20 22:30 · la crepa da cui entra la luce

> ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto

**`frammenti/2027/03/20270320-2230.md`**

```md
---
registrato: 2027-03-20T22:30:52+01:00
canale: telefono
---
ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto
```

**`letture/2027/03/20270320-2230.md`** (passo 1: niente negli ultimi 3 giorni; tra le ultime 5 restituzioni c'è la lettera di
domenica 14 marzo, non simulata: "ok" potrebbe risponderle, ma senza il suo testo non lo so, quindi niente `in-risposta-a`.
"La crepa" non ha nome proprio: niente nodo, §2.6)

```md
---
versione: 1
letto: 2027-03-20T22:32:40+01:00
intento: [salva]
reazione:
  - parole: "secondo me è un tatuaggio"
    segnale: giudizio
    verso: "+"
legami:
  - serve-a: tatuaggi
    voce: sua
    perche: "«secondo me è un tatuaggio»"
  - ritorna-su: 20261205-1840
    come: aggiunge
    voce: proposta
    perche: "«una linea d'oro su qualcosa di rotto» riprende il 5 dicembre: «più forti nei punti rotti? tipo kintsugi»"
  - parla-di: kintsugi
    come: metafora
    voce: proposta
    perche: "«una linea d'oro su qualcosa di rotto» descrive il kintsugi senza nominarlo"
parole: [crepa, luce]
---
```

Due proposti, il massimo. Il Jung di B03 che il banco suggerisce non l'ho messo: la sua frase (l'inconscio, il destino) non
ha crepe né luce, e la proposta non avrebbe un `perche` onesto. Nodi aggiornati: nessuno.

**`restituzioni/2027/03/r-20270320-2232-risposta.md`** (un aggancio solo, il ponte con una frase tua)

```md
---
forma: risposta
per: 20270320-2230
voci:
  - n: 1
    rif: 20261205-1840
legami: []
---
**Segnato tra i tatuaggi.** Il 5 dicembre ✦: «più forti nei punti rotti? tipo kintsugi».
```

Notifica senza contenuto: sì (ponte forte).

**Risposta sul telefono:** "22:32 · **Segnato tra i tatuaggi.** Il 5 dicembre ✦: «più forti nei punti rotti? tipo kintsugi»."

**Verifiche fatte:** 1 WebSearch su "la crepa da cui entra la luce": è il ritornello di *Anthem*, Leonard Cohen, album
*The Future* (1992) (qz.com e altri); nessuna scheda Quote Investigator trovata; un precedente in Emerson ("There is a crack
in everything God has made") citato da fonti informali, non verificato. Non è finito nella risposta: §4.3 ammette un solo
aggancio, e ho scelto il ponte ✦. Nessun verso citato.

**Costi:** 3 file (frammento, lettura, restituzione) + `contesto/` + 1 notifica. 1 ricerca. ~2 minuti.

**Esito sul banco:** passa male. `serve-a: tatuaggi` ✦, `parole: [crepa, luce]`, due ◌ (uno è il `ritorna-su` B11 del banco),
nessun "cinque fonti", nessun verso. Ma Cohen ○ manca dalla risposta e manca "Te le metto in fila?": il modello ammette un
aggancio solo e nessuna domanda.

---

## B24 · 2027-03-22 12:00 · Schopenhauer da leggere, dopo Evangelion

> devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce

**`frammenti/2027/03/20270322-1200.md`**

```md
---
registrato: 2027-03-22T12:00:15+01:00
canale: telefono
---
devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce
```

**`letture/2027/03/20270322-1200.md`** (passo 1: B23 è di 2 giorni fa, non c'entra)

```md
---
versione: 1
letto: 2027-03-22T12:02:30+01:00
intento: [salva]
reazione:
  - parole: "mi incuriosisce"
    segnale: giudizio
    verso: "+"
legami:
  - nomina: il-mondo-come-volonta-e-rappresentazione
    fruizione: da-fare
    voce: sua
    perche: "«devo leggere il mondo come volontà e rappresentazione prima o poi»"
  - tramite: neon-genesis-evangelion
    voce: sua
    perche: "«dopo evangelion e il porcospino»"
parole: [porcospino]
---
```

**`opere/il-mondo-come-volonta-e-rappresentazione.md`** · **`opere/neon-genesis-evangelion.md`** (nuovi; Schopenhauer e Anno in
chiaro, non li nomini tu; niente nodo *Parerga*)

```md
---
nome: Il mondo come volontà e rappresentazione
alias: [il mondo come volontà e rappresentazione]
autore: Arthur Schopenhauer
anno: 1819
nato-da: [20270322-1200]
---
```

```md
---
nome: Neon Genesis Evangelion
alias: [evangelion]
autore: Hideaki Anno
anno: 1995
nato-da: [20270322-1200]
---
```

**`restituzioni/2027/03/r-20270322-1202-risposta.md`**

```md
---
forma: risposta
per: 20270322-1200
voci:
  - n: 1
    rif: "mondo: Schopenhauer, Parerga e paralipomena (1851), II, cap. 31, §396"
legami: []
---
**Segnato da leggere.** Il porcospino però non è nel *Mondo*: è nei *Parerga e paralipomena* (1851) ⚠.
```

Notifica senza contenuto: sì (correzione di fatto, anche se implicita).

**Risposta sul telefono:** "12:02 · **Segnato da leggere.** Il porcospino però non è nel *Mondo*: è nei *Parerga e paralipomena* (1851) ⚠."

**Verifiche fatte:** 2 WebSearch. (1) La parabola dei porcospini: *Parerga und Paralipomena* (1851), vol. II, cap. XXXI,
§396 (philosophybreak, Wikipedia e mirror; fonti secondarie, quindi ⚠). (2) *Die Welt als Wille und Vorstellung*: uscito a
dicembre 1818 con la data 1819 sul frontespizio (Wikipedia, schede di biblioteca), quindi `anno: 1819`; *Evangelion*, ep. 4
"Hedgehog's Dilemma", 25 ottobre 1995 (Wikipedia). Rinviato: `wikidata`/`openlibrary` dei due nodi.

**Costi:** 5 file (frammento, lettura, 2 nodi, restituzione) + `contesto/` + 1 notifica. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa male. `nomina` con `fruizione: da-fare` ✦ (nodo nato, autore in chiaro), `tramite` *Evangelion* ✦,
`parole: [porcospino]`, niente nodo *Parerga*, niente ID. Manca la domanda del banco ("forse meglio partire da lì?"), che il
modello non ammette all'ingresso.

---

## B25 · 2027-04-02 20:00 · Cioran, il suicidio come appiglio

> ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere

**`frammenti/2027/04/20270402-2000.md`** (dettato: arriva come testo, nessun `.m4a`)

```md
---
registrato: 2027-04-02T20:00:26+02:00
canale: telefono
---
ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere
```

**`letture/2027/04/20270402-2000.md`** (prudenza §4.1: nessuna proposta, nessun tema, nessuna `parole`; passo 1: niente negli
ultimi 3 giorni, B24 è di 11 giorni fa, sotto i 14 del "mentre eri via"; "chioran": nessun alias, ortografia fonetica → Cioran)

```md
---
versione: 1
letto: 2027-04-02T20:02:40+02:00
intento: [salva]
legami:
  - nomina: il-suicidio-che-tiene-in-vita
    voce: sua
    perche: "«una frase di chioran sul suicidio come idea che ti tiene in vita»: a memoria, parafrasata («cioè…»)"
---
```

**`persone/emil-cioran.md`** · **`citazioni/il-suicidio-che-tiene-in-vita.md`** (nuovi; Cioran solo nel campo del nodo
citazione, come Rilke in B15)

```md
---
nome: Emil Cioran
alias: [cioran, chioran]
cerchia: mondo
nato-da: [20270402-2000]
---
```

```md
---
nome: L'idea del suicidio che tiene in vita
autore: emil-cioran
prova: memoria
nato-da: [20270402-2000]
---
Passo 1 (2027-04-02): nessuna scheda di apocrifo; l'idea circola come di Cioran in raccolte senza fonte; un articolo la data
1952, cioè forse Sillogismi dell'amarezza (da verificare); non risulta in L'inconveniente di essere nati.
```

**`restituzioni/2027/04/r-20270402-2002-risposta.md`**

```md
---
forma: risposta
per: 20270402-2000
voci:
  - n: 1
    rif: emil-cioran
legami: []
---
**Salvata.** Cioran, sì ○: l'idea di poter farla finita come ciò che fa resistere; il libro esatto è da verificare ⚠. Se ti va di parlarne, ci sono.
```

Notifica: nessuna.

**Risposta sul telefono:** "20:02 · **Salvata.** Cioran, sì ○: l'idea di poter farla finita come ciò che fa resistere; il libro esatto è da verificare ⚠. Se ti va di parlarne, ci sono."

**Verifiche fatte:** passo 1, 1 WebSearch + 1 WebFetch. Raccolte di citazioni (libquotes, quotewise, elevatesociety) danno a
Cioran «without the idea of suicide, I'd have killed myself right away», senza libro; un articolo su PhilArchive (TRUTBO-4)
la data "(2012 [1952])", compatibile con *Syllogismes de l'amertume* (1952); l'unica frase sul suicidio data a *De
l'inconvénient d'être né* (1973) è un'altra. PhilArchive: **403**, nota non letta. Quindi *L'inconveniente* del banco non
regge, e la risposta non nomina un libro. Rinviato: passi 2-3 (testo francese, traduzione Adelphi), `wikidata` di Cioran.

**Costi:** 5 file (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 2 richieste web. ~3 minuti.

**Esito sul banco:** passa. "chioran" intatto, Cioran trovato con l'alias, citazione `prova: memoria` senza esito, nessuna
proposta né tema, una riga umana senza allarme né diagnosi. La risposta non dice *L'inconveniente* (la verifica non lo
conferma) e non chiede "Tutto bene?" (il modello non ammette domande all'ingresso): offre presenza invece di chiederla.

## Consolidamento di domenica 4 aprile 2027

**Ipotesi dichiarata.** I consolidamenti delle domeniche precedenti sono girati: 8, 15, 22, 29 novembre; 6 e 13 dicembre;
10 gennaio; 7 e 14 febbraio; 7 e 14 marzo (lettere e ritratto di febbraio non simulati). Qui si mostra per intero quello del
4 aprile. Il compito chiede la "settimana B22–B25", che però sul calendario non esiste: B22 (venerdì 12 marzo) cade nella
settimana del 14 marzo, B23 in quella del 21, B24 (lunedì 22) in quella del 28, B25 in questa. Per tenerle insieme
suppongo che (a) il 14 marzo abbia chiuso B20–B21 ma lasciato **in sospeso** B22, perché la sua domanda («me la riscrivi?»)
non ha avuto risposta e il frammento non ha bersaglio; (b) le Routine "sogno" del 21 e del 28 marzo siano **fallite**
(errore della sessione), quindi la fase 1 di stasera recupera tre settimane. La lettera resta una sola, perché il modello
non vuole arretrati. Il modello non dice niente dei consolidamenti saltati: vedi gli attriti. Inoltre la lettera che B19 chiama
"15 febbraio" è quella di domenica **14** febbraio: il 15 era lunedì.

Ore 21:00, Routine "sogno", sessione nuova: `node indice.mjs` (1 s), poi fase 1, fase 2, `scripts/contesto.mjs`, verifica, push.

### C.0 Chiuso nelle domeniche precedenti (B01–B21)

Che cosa avrebbero scritto quelle fasi 1 nei nodi. Gli esiti e gli ID li ho **verificati oggi davvero**, e la colonna
"come" dice con che cosa. Per gli ID ho usato Wikidata `wbsearchentities` (circa 30 chiamate; il proxy prende spesso
«too many requests», passate con ritentativi) e MusicBrainz `ws/2` (7 chiamate, nessun 503). Per le citazioni ho seguito il
protocollo di citazioni §3: testo primario da Gutenberg letto con `grep`, Wikiquote it in formato raw, al massimo
2 WebSearch a citazione.

**Citazioni**

| nodo (nato in) | esito | prova | riferimento | originale · traduzione italiana | come |
|---|---|---|---|---|---|
| `nichilismo-ospite-inquietante` (B01) | attribuzione-errata (`autore` Nietzsche; Galimberti la cita) | primaria | frammento postumo; nella compilazione *Der Wille zur Macht* (ed. Brahn, Kröner 1917) n. 34, Gutenberg #60360. Collocazione KGW "2[127], autunno 1885 – autunno 1886" **da verificare** | «Der Nihilismus steht vor der Tür: woher kommt uns dieser unheimlichste aller Gäste?» · resa di Claude, traduzione da verificare | grep sul testo Gutenberg; nietzschesource.org è un'app JS e non si legge con curl; 1 WebSearch senza esito |
| `finche-non-rendi-conscio-l-inconscio` (B03) | simile | secondaria | *Aion*, CW 9/II §126 | «Quando un fatto interiore non viene reso cosciente, si produce fuori, come destino.» (trad. Lisa Baruffi, Boringhieri 1982, p. 67) | Wikiquote it raw (con edizione e pagina); testo di *Aion* non aperto |
| `non-camminare-davanti-a-me` (B06) | apocrifa | secondaria | Quote Investigator, 23/08/2015 | — | chiuso già all'ingresso (passo 1); non rifatto |
| `estate-invincibile` (B07) | simile (opera sbagliata: *Retour à Tipasa*, in *L'Été*, 1954, non *La peste*) | secondaria | *L'Été* (1954), «Retour à Tipasa» | «Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible» (Le Temps, fonti secondarie) · «Imparavo finalmente, nel cuore dell'inverno, che c'era in me un'invincibile estate» (*L'estate e altri saggi solari*, Bompiani 2003, p. 99, a cura di Pastura e Perrella; traduttore da verificare) | 1 WebSearch + Wikiquote it; il PDF "Camus Tipasa" trovato è *Noces*, non *Retour*: niente testo primario |
| `chi-ha-un-perche` (B09) | attribuzione-errata (`autore` Nietzsche, `attribuita-a` Frankl) | primaria | *Götzen-Dämmerung* (1889), «Sprüche und Pfeile» **12** (il numero ora è verificato) | «Hat man sein warum? des Lebens, so verträgt man sich fast mit jedem wie?» · nessuna traduzione pubblicata trovata: resa di Claude, traduzione da verificare | grep su Gutenberg #7203 (riga 190: "12."); Wikiquote it: assente |
| `il-mondo-spezza-tutti` (B11) | simile (lui scrive «alcuni», il testo dice «many») | primaria | *A Farewell to Arms* (1929), cap. XXXIV | «The world breaks every one and afterward many are strong at the broken places.» · «Il mondo spezza tutti quanti e poi molti sono forti nei punti spezzati.» (trad. Fernanda Pivano, Mondadori 2007, p. 235) | grep su Gutenberg #75201 (pubblico dominio USA dal 2025); Wikiquote it |
| `let-everything-happen-to-you` (B15) | verificata (Rilke; la forma inglese è di Barrows e Macy) | primaria | *Das Stunden-Buch*, Erstes Buch: *Das Buch vom mönchischen Leben* (1899; in volume 1905) | «Laß dir alles geschehn: Schönheit und Schrecken.» · inglese: Barrows e Macy, 1996 (secondaria); italiana non trovata, da verificare | grep su Gutenberg #24288; Wikiquote it: assente |
| `⟨incipit-della-riga⟩` (B21) | **non verificato** (nessun esito scritto) | memoria | — | — | la simulazione non ha la foto: senza testo non c'è niente da cercare. Scrivere `non-trovata` sarebbe falso |

**ID dei nodi** (`wikidata: no` porta la data della prova, come vuole identità §2)

| nodo (nato in) | wikidata | musicbrainz | nota |
|---|---|---|---|
| `umberto-galimberti` (B01) | Q4003398 | — | unico risultato con "umberto galimberti" |
| `spettacolo-sulle-emozioni` (B01) | no (2026-11-08; ricontrollato il 2026-10-31) | — | "Il mondo delle emozioni Galimberti": nessun risultato. La domanda sul titolo non ha avuto risposta: niente `titolo-vero` |
| `carl-gustav-jung` (B03) | Q41532 | — | |
| `private-music` (B04) | Q135256676 | release-group 5e9a3ca5-82ce-47da-9409-83f6f953b4a2 | il 1° risultato Wikidata è l'etichetta Private Music (Q6318209): scartato |
| `ecdysis` (nato il 15 novembre dalla "la 3" di B04, `in: private-music`) | no (2026-11-15) | work 2548b436-1bde-4f44-90ba-b9352698d780 | traccia 3 della release 893fa571 (3 chiamate MB: release-group → release → recording → work). La lettera del 15 novembre l'avrebbe detto: «La 3 è *ecdysis*» |
| `telemaco` (B05) | Q192482 | — | scartati il prenome e l'opera di Gluck |
| `marco`, `nonna-lina`, `papa` | — | — | `cerchia: vita`: l'ID non si cerca mai |
| `viktor-frankl` (B09) | Q154723 | — | |
| `uno-psicologo-nei-lager` (B09) | Q426369 | — | è l'opera del 1946 (*…trotzdem Ja zum Leben sagen*), non un'edizione |
| `sisifo` (B10) | Q102561 | — | il personaggio del mito; scartati il dialogo pseudo-platonico e il dramma di Euripide |
| `kintsugi` (B11) | Q2740942 | — | |
| `la-cura` (B12) | Q3821984 | work a8c16703-66c2-434d-bf8a-6fe382ba62d8 | Wikidata la dà 4ª (prima un episodio di *Heroes*) |
| `franco-battiato` (B12) | Q25147 | artista 0cd117b2-2e21-406d-80cf-5ce0a6065e37 | |
| `never-gonna-give-you-up` (B13) | Q57 | work 69755ab1-409e-3ad7-902f-3a839042799c | il work di Stock, Aitken e Waterman; Q57 è il brano, Q109632071 il singolo e Q106406249 la registrazione |
| `rainer-maria-rilke` (B15) | Q76483 | — | |
| `eraclito` (B16) | Q41155 | — | |
| `fiume-di-eraclito` (B16) | no (2027-01-10) | — | l'unico candidato è Q254982 «Panta rei», un'altra formula (Simplicio): non lo fondo |
| `nave-di-teseo` (B16) | Q1050837 | — | si trova solo cercando "paradosso della nave di Teseo" |
| `i-fratelli-karamazov` (B19) | Q183157 | — | il romanzo; scartati lo sceneggiato RAI e il film del 1969 |

Restano senza nodo, quindi senza ID: il video di B14 (oEmbed 404; il modello non dice di riprovare), Recalcati (B05: nessun tuo sì).

### C.1 Fase 1, astrarre

**Che cosa rilegge.** I frammenti dalla 21:00 del 14 marzo, cioè B23, B24 e B25, più B22 in sospeso. Accanto a loro un
campione del vecchio sugli stessi nodi (9 frammenti, sotto i 20): B11 (kintsugi, il mondo che spezza), B07 e B15
(tatuaggi), B20 (il dolore e la noia), il nucleo `20261004-2228-nucl` (lo sguardo: «La dimensione principale della realtà è il
dolore»), B03 e B21 (le frasi di cui B22 potrebbe parlare), B19 (l'ultimo sul padre), B12. B12 e B25 entrano nella rilettura
ma restano fuori dalla fase 2 (prudenza §4.1). Prima le **sorprese**: B24 non aggancia nessun tema esistente, ma tocca lo
sguardo attraverso B20.

**Esiti, voce per voce del §4.2:**
- *Temi ricorrenti:* non ne nasce nessuno. Sono alla seconda occorrenza `padre` (B05, B19) e `mare` (B05, B17), ma ogni
  volta con un senso diverso: il padre di Telemaco e il tuo; il mare guardato e il mare del sogno. Per `padre` il §5.5 vuole
  inoltre che il tema nasca solo quando lo chiedi tu. `crepa` (B23) e `punti rotti` (B11) stanno già sotto `kintsugi`.
  `noia` e `porcospino` sono alla prima occorrenza.
- *Doppioni e temi larghi:* nessuno da fondere né da dividere. Il doppio `eraclito`/`fiume-di-eraclito` è già negli attriti di B16.
- *Citazioni in sospeso:* `il-suicidio-che-tiene-in-vita` (B25) fa i passi 2-3 (vedi sotto). Il nodo di B21 resta in
  `prova: memoria` perché non c'è la foto.
- *ID:* `emil-cioran`, `il-mondo-come-volonta-e-rappresentazione` e `neon-genesis-evangelion`, nati in queste settimane,
  più `jordan-peterson`, nodo del punto zero toccato da B22, che non aveva ID. Nessuna domanda: *Evangelion* ha due
  candidati (la serie Q662 e il franchise Q66834583), ma di tipo diverso, e il porcospino è l'episodio 4 della serie.
- *`contraddice`:* nessuno nuovo. B20 contro il nucleo è stato segnato ◌ il 14 marzo. B22 non ha bersaglio. B24 non prende
  posizione. B25 non si legge come posizione (prudenza).
- *Tagging all'indietro:* non scatta. Nessun frammento di queste settimane ha una reazione d'impatto (B23 e B24 sono
  giudizi, B25 non ha `reazione`).
- *B22 in sospeso:* «quella di ieri sulla casa in ordine» non si risolve nemmeno sul campione. Nessun atto, nessuna frase
  inventata. La domanda di B22 non viene ripetuta (vedi gli attriti).
- *Letture riscritte:* **nessuna**. Nessun legame di B22–B25 cambia: gli esiti stanno nei nodi, e la convergenza sta nella
  restituzione di fase 2, non nelle letture.

**Verifica (un subagent, una citazione).** Passo 1, già fatto all'ingresso: nessuna scheda di apocrifo. Passo 2: niente
testo primario libero (Cioran non è di pubblico dominio). Una fonte secondaria cita il francese fino a «je me serais tué
depuis…», tagliato. Passo 3: Wikiquote it lo dà sotto *Sillogismi dell'amarezza*, p. 63, con l'edizione. Mi fermo lì,
come vuole il protocollo.

**`citazioni/il-suicidio-che-tiene-in-vita.md`** (aggiornato)

```md
---
nome: L'idea del suicidio che tiene in vita
autore: emil-cioran
esito: simile
prova: secondaria
originale: "Je ne vis que parce qu'il est en mon pouvoir de mourir quand bon me semblera : sans l'idée du suicide, je me serais tué … (chiusa da verificare)"
traduzione: "Vivo solo perché è in mio potere morire quando meglio mi sembrerà: senza l'idea del suicidio, mi sarei ucciso subito."
traduttore: Cristina Rognoni
riferimento:
  opera: "Sillogismi dell'amarezza (Syllogismes de l'amertume, 1952)"
  luogo: "Adelphi, ed. 2007, p. 63"
  url: https://it.wikiquote.org/wiki/Emil_Cioran
  data: 2027-04-04
nato-da: [20270402-2000]
---
La tua forma è una parafrasi («la possibilità di farla finita che ti fa resistere»): l'idea è quella, le parole no.
Non è in L'inconveniente di essere nati.
```

**`persone/emil-cioran.md`** · **`persone/jordan-peterson.md`** · **`opere/il-mondo-come-volonta-e-rappresentazione.md`** ·
**`opere/neon-genesis-evangelion.md`** (aggiornati: si aggiunge una riga sola, il resto è com'era)

```md
wikidata: Q193405        # emil-cioran: «filosofo, scrittore e saggista rumeno»; "chioran" non trova niente, il modello corregge prima
wikidata: Q6276882       # jordan-peterson: «psicologo canadese»; scartato l'allenatore omonimo
wikidata: Q560352        # il-mondo-come-volonta-e-rappresentazione: «saggio di Arthur Schopenhauer», unico risultato
wikidata: Q662           # neon-genesis-evangelion: «serie anime», non il franchise
```

**Verifica di un fatto ○ per la fase 2** (obbligatoria prima di dirlo, §4.3): il pendolo di Schopenhauer.
*The World as Will and Idea*, vol. I, libro IV, **§ 57** (trad. Haldane e Kemp, Gutenberg #38427, letto con grep):
«its life swings like a pendulum backwards and forwards between pain and ennui». Il tedesco non l'ho letto, quindi nella
lettera il fatto non è citato tra virgolette.

**Il livello derivato, ricalcolato dallo script** (estratti)

`.indice/grafo.json`: la vitalità, con mezza vita di 90 giorni, +1 per ritorno, frammenti importati esclusi.

```json
{"calcolato": "2027-04-04T21:01:02+02:00",
 "vitalita": {
  "tatuaggi": 2.67, "kintsugi": 2.29, "il-mondo-spezza-tutti": 2.29,
  "nichilismo-ospite-inquietante": 1.62, "la-cura": 1.17,
  "il-suicidio-che-tiene-in-vita": 0.98, "emil-cioran": 0.98,
  "il-mondo-come-volonta-e-rappresentazione": 0.90, "neon-genesis-evangelion": 0.90,
  "jordan-peterson": 0.84, "dolore": 0.81, "papa": 0.77, "marco": 0.72, "umberto-galimberti": 0.65,
  "…": "…",
  "telemaco": 0.34, "ecdysis": 0.33, "finche-non-rendi-conscio-l-inconscio": 0.32, "nichilismo": 0.31},
 "stati": {"sbiaditi": ["20261124-2350 parla-di battaglie-interiori", "20261212-2015 serve-a tatuaggi",
                        "20270109-1630 parla-di chi-sono"],
           "rifiutati": [], "superati": []}}
```

Il +1 di `kintsugi` e `il-mondo-spezza-tutti` viene dal `ritorna-su` ◌ di B23. Senza quel +1 (cioè se il ritorno proposto
non contasse) scenderebbero a 1,29. I tre legami ◌ sbiaditi hanno più di 60 giorni e nessun tuo atto.

`.indice/vicende.json`: **vuoto**. Nessun nodo, tema o parola ha 3 frammenti in 60 giorni: né ora (finestra 3 febbraio –
4 aprile), né in nessun'altra finestra da novembre. Galimberti ne ha 2 diretti (B01, B05), i tatuaggi 3 ma in 4 mesi.

`.indice/tempo.json`: la serie `sente` è **vuota** (25 frammenti, nessun `sente`). Una sola linea di posizione: lo sguardo ✧
(ottobre) → B20 ✦ (8 marzo), `contraddice` ◌, nessuna posizione superata.

`.indice/conti.json`: 25 frammenti tuoi. Per mese: nov 10, dic 5, gen 1, feb 2, mar 6, apr 1. Citazioni 9, con esiti:
4 simili, 2 attribuzioni errate, 1 apocrifa, 1 verificata, 1 senza esito (la riga di B21).

`.indice/scarti.json`: vuoto (nessun tuo "no" in cinque mesi).

**`contesto/indice.md`** (estratto; rigenerato)

```md
# Indice · 2027-04-04 21:12
25 frammenti tuoi (nov 2026 – apr 2027) · 66 nodi · 43 restituzioni (2 importate)

## Più vivi
- tatuaggi (raccolta) · 2 ✦, 1 ◌ · ultimo 20 mar
- kintsugi (tema) · 1 ✦, 1 ◌ · ultimo 20 mar
- Il mondo spezza tutti (citazione, Hemingway, simile ○) · ultimo 20 mar ◌
- Il nichilismo, l'ospite inquietante (citazione, Nietzsche, attribuzione errata ○) · 3 nov, 4 nov

## Da leggere
- Il mondo come volontà e rappresentazione (Schopenhauer, 1819) · da-fare dal 22 mar

## In sospeso
- 12 mar · «la casa in ordine… era peterson»: frase non trovata
- 10 mar · la riga della foto: non verificata
```

**`contesto/ritratto.md`**: non si rigenera, è trimestrale e il prossimo arriva a inizio maggio. Il conto del trimestre
(febbraio–aprile, finora 9 frammenti) è nello script, non in un file: torna il dolore (B20), torna *La cura* (B19, il
ritorno spontaneo che il modello non conta); è nuovo Schopenhauer; è sparito Galimberti, assente da novembre; manca
ancora una canzone sua, salvata con parole sue, dopo dicembre.

### C.2 Fase 2, associare

Il modello ne fa scegliere una tra convergenza, confronto e sogno. Il **confronto** fresco (B20 contro lo sguardo) l'ha già avuto
la lettera del 14 marzo, ed è probabile che l'«ok» di B23 le rispondesse. Il **sogno** (la scala di B17) è più
lontano. Scelgo la **convergenza**, agganciata a una frase tua di queste settimane, B24, e che ha una direzione: lo sguardo,
B20 e Schopenhauer dicono tre cose diverse sullo stesso legame, il dolore e la noia. Lascio fuori, apposta, ogni riferimento
a B25: Schopenhauer e Cioran stanno nello stesso scaffale, la lettera no.

*Ti ricordi?* La formula vuole un nodo di alta importanza e bassa vitalità. Il modello non definisce l'importanza: la
stimo con una reazione d'impatto o d'identificazione. I candidati sono `finche-non-rendi-conscio-l-inconscio` (0,32, «mi ha
spaccato»), `ecdysis` (0,33, «mi ha distrutto»), `telemaco` (0,34) ed `estate-invincibile` (0,36). Escludo B12 (delicato).
Scelgo il più basso, B03. Ha anche il vantaggio di avere ora la forma vera accanto (simile).

**`restituzioni/2027/04/r-20270404-2100-settimana.md`**

```md
---
forma: settimana
voci:
  - n: 1
    rif: il-mondo-come-volonta-e-rappresentazione
  - n: 2
    rif: "mondo: Schopenhauer, Il mondo come volontà e rappresentazione, libro IV, §57 (trad. ingl. Haldane e Kemp, Gutenberg #38427, letto il 2027-04-04)"
  - n: 3
    rif: 20261109-1902
    tipo: ricordi
legami:
  - converge-con: [20270308-2340, 20270322-1200, 20261004-2228-nucl, il-mondo-come-volonta-e-rappresentazione]
    voce: proposta
    perche: "dolore e noia: lo sguardo mette il dolore al centro, B20 sposta il centro sulla noia ma dà al dolore il movimento, Schopenhauer li mette ai due capi di un pendolo; B24 vuole leggere proprio quel libro"
---
(il testo è la lettera qui sotto)
```

Notifica senza contenuto, alle 21:12: «La lettera è pronta» + link a `restituzioni/2027/04/r-20270404-2100-settimana.md`.

### C.3 La lettera della domenica, come arriva sul telefono

> **Domenica 4 aprile**
>
> Il 22 marzo hai scritto: «devo leggere il mondo come volontà e rappresentazione prima o poi» ✦.
> Due settimane prima, l'8: «forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti
> muove» ✦. A ottobre, nel tuo sguardo, il dolore era la dimensione principale ✧.
>
> Il libro che vuoi leggere li tiene tutti e due: per Schopenhauer la vita oscilla come un pendolo tra il dolore e la noia
> (libro IV, §57) ○. Lui li mette ai due capi, alla pari. Tu no: per te il dolore almeno muove ◌.
>
> *Ti ricordi?* A novembre una frase ti aveva «spaccato»: «finché non rendi conscio l'inconscio, lui guiderà la tua vita
> e tu…»

Controllo sulle regole: ogni pezzo parte da una frase tua con la data ✦. La convergenza ha una direzione (tre posizioni,
non la stessa cosa tre volte). Il fatto ○ è verificato prima. Non ci sono domande da compilare: il "ti ricordi?" è un
indizio, non una domanda. Un solo "ti ricordi?". Né B12 né B25, né il lutto, né il suicidio, né il padre del litigio. La lunghezza
è di circa 110 parole, una schermata.

### C.4 Costi

- **File toccati dalla Routine:** 6 nel repository (1 citazione, 4 nodi con una riga di ID, 1 restituzione), 3 di
  `contesto/` rigenerati (`indice.md`, `recenti.md` con la riga della lettera, `parole.md` senza cambi); 5 locali in `.indice/`.
  Letture riscritte: 0. Domande all'utente: 0. Notifiche: 1.
- **Ricerche della Routine:** per la citazione di B25, 1 WebSearch + 1 Wikiquote raw (al passo 1 ne erano servite 2); per
  il fatto della lettera, 1 download Gutenberg; per gli ID, 4 chiamate Wikidata (più i ritentativi per il rate limit).
  In tutto circa 7 richieste.
- **Tempo stimato:** avvio della sessione circa 1 minuto; fase 1 circa 6-8 minuti (subagent della citazione circa 3, ID
  circa 1, rilettura del campione circa 2-3); fase 2 circa 2 minuti; script, verifica e push circa 1 minuto. Totale: **circa
  10-12 minuti**, circa 60-80 mila token.
- **La tabella C.0, a parte** (il lavoro di undici domeniche fatto qui in una volta): circa 30 chiamate Wikidata, 7
  MusicBrainz, 6 testi Gutenberg, 6 pagine Wikiquote, 5 WebSearch. Circa 25 minuti reali, circa 2-3 minuti per domenica.
