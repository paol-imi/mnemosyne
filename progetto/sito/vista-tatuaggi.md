# La vista dei tatuaggi

> Domanda dell'utente: «la sezione tattoo, quella del repo scorso, c'è spazio per averla? magari come "vista"?»
> Risposta breve: **sì, e quasi senza toccare il modello.** I dati ci sono già: la raccolta `tatuaggi`, i legami
> `serve-a` e le restituzioni `eredita`. Manca solo la pagina. La forma raccomandata è **la tavola**: una pagina sola
> per la raccolta, con le tue parole e le tue immagini disposte come i pezzi di una patchwork sleeve. Il brief per il
> tatuatore è la stessa pagina stampata, con un filtro in più.

Fonti lette: l'Atlante al checkpoint `3a7ea79` (sola lettura, in `/tmp/atlante`); `progetto/v2/modello-v3.md` (§3, §6.3,
§14 R8 e R10, decisione 35); `progetto/v2/archivio-reale.md`; `progetto/v2/simulazione/attriti-importazione.md` (A3,
A9, A30); i dati di `main` al commit `281ff1b` (`raccolte/tatuaggi.md`, letture e restituzioni con `serve-a: tatuaggi`,
`contesto/mappa.md`).

Le immagini sono in `vista-tatuaggi/`. Vengono dal sito pubblicato dell'Atlante (`paol-imi.github.io/tattoo-shit`):
la build locale del repository clonato non è stata permessa in questa sessione. Per ogni pagina ci sono due versioni,
telefono (390 px) e schermo (1280 px).

---

## 1. Che cosa c'era nell'Atlante

L'Atlante **era** un progetto di tatuaggi: «Repository personale di idee, pensieri e sketch per tatuaggi» (README).
La mappa filosofica gli è cresciuta intorno. Le parti sui tatuaggi:

| parte | dove | che cosa | di chi |
|---|---|---|---|
| **idee** | `idee/<slug>/index.md`, 34 | proposte di tatuaggio. Campi: `stato` (seme · in-esplorazione · forte · scelta · tatuata · archiviata), `formato` (pezzo-singolo · patchwork · sleeve · schiena · serie), `placement` (avambraccio, polpaccio…), `stile`, `risonanza` 1–5, `## Composizione`, `## Immagini`, `## Pinterest`, `## Evoluzione` | **2 tue** (`sognatore-insonne`, `monologo-di-rust`), 11 dal seme, 21 di Claude; sul sito 5 tavole validate su 37 |
| **spunti** | `spunti/`, 3 | scintille: una frase, un'opera | 2 tue, 1 dal seme |
| **stile** | `stile/`, 9 note | patchwork, incisione/xilografia, blackwork, dotwork, dissolvenze, spazio negativo, lettering, sleeve unita, black-and-grey | patchwork e incisione sono **decisioni tue** (U16, U17); il resto è catalogo |
| **nucleo** | `nucleo.md:39, 61–63` | «Il tatuaggio deve rappresentare il viaggio…»; esoterico, «domande che ancora non so di volere»; patchwork sleeve; «nero, incisione/xilografia antica, mistero». L'idea che tiene insieme tutto: **il grimorio** | parole tue riportate dal seme (U15–U17) più lo sguardo ✧ |
| **Pinterest** | sezione `## Pinterest`, `core/pin.ts` | un pin per riga, reso sul sito come **embed ufficiale** (iframe), con le proporzioni chieste a Pinterest | **2 pin distinti** in tutto, ripetuti in 6 note; 0 immagini tue; 38 sezioni «_Nessun pin collegato._» |
| **testi** | `testi.md`, `Testi.vue` | «Le parole che potrei portare addosso»: tutte le citazioni, per fonte; le candidate al lettering | per lo più scelte da Claude |

**Il sito** (VitePress, GitHub Pages pubblico) aveva tre porte: Bacheca, Testi e Mappa, più la pagina «Da validare».

- **La Bacheca** (`Bacheca.vue`, `Tavola.vue`): ogni idea o spunto è una «tavola di un vecchio libro». Ha il pin come
  embed, oppure, senza pin, una carta tipografica con un ornamento inciso. Porta chip filtrabili (simbolo, fonte,
  concetto), stato, formato e i pallini della risonanza. Le misure del testo cambiano con la lunghezza.
- **L'interruttore «proposte»**: di default il sito mostra solo ciò che è validato. Accendendolo compaiono le proposte
  di Claude, segnate in rosso.

Gli screenshot mostrano il punto debole:

- con le proposte spente la bacheca ha **5 tavole**, tutte da *True Detective* e tutte rette da due pin
  (`atlante-bacheca-schermo.png`);
- con le proposte accese le tavole sono **37**, e 36 sono «da validare» (`atlante-bacheca-proposte-telefono.png`);
- la tua idea, *Il sognatore insonne*, a proposte spente ha tre righe tue e poi «Nessuna ancora»
  (`atlante-idea-sognatore-insonne-telefono.png`).

**Il corpo.** C'era un campo `placement`, ma **l'hanno riempito solo le proposte**: 22 idee su 34, tutte del seme o di
Claude. Le tue due idee hanno `placement: []`. Nelle tue frasi ✦ importate l'unica parola del corpo è *sleeve* (U16).
Non c'era nessuna sagoma e nessuna mappa del corpo. Nemmeno `stato: tatuata` è mai stato usato.

**In sintesi:** l'Atlante dei tatuaggi era un catalogo di proposte che non hai mai validato. Intorno c'erano poche
decisioni tue, forti: il concetto prima del soggetto, il patchwork, il nero e l'incisione, due frasi di *True Detective*,
Invictus per i testi lunghi, i Pensieri da rileggere.

## 2. Che cosa ne dice Mnemosyne (e che cosa c'è già su `main`)

- **R8** (`modello-v3.md:1593`): `raccolte/tatuaggi.md` con `nato-da: [s03]` e senza `scopo` finché non lo dici tu. Le
  tue idee sono frammenti con `serve-a`; le idee dell'Atlante sono restituzioni `eredita` con `serve-a` ◌. **Il brief
  `s02` non esiste: è una vista (A3)**, e la decisione 35 lo conferma. Il motivo (attrito A3): il brief rimontava U15–U17,
  M6 e M7, cioè copiava le tue frasi in un secondo frammento, e le copie non generano legami.
- **A9 / R5**: patchwork e incisione, che nomini tu, diventano temi.
- **A30**: lo `scopo` non ha parole tue. `mappa.md` segnala che manca, e nessuna risposta lo chiede.
- **R10**: il pin è un link nel frammento, e la descrizione di Claude va nella `nota` della lettura. In `CLAUDE.md`:
  «Immagini: solo mie; i pin restano link».
- **§6.3**: le viste si calcolano e non si salvano. La pagina di un nodo ha 3–5 porte ✦, poi le convergenze, poi il
  resto. Ogni elenco contiene una voce della coda lunga.

**I dati di oggi** (`contesto/mappa.md:73`: `tatuaggi · raccolte · ✦10 ◌34 ●0 · 2026-10-04–2026-10-06 · senza scopo`):

| strato | che cosa | quanti |
|---|---|---|
| ✦ frammenti tuoi con `serve-a: tatuaggi` | U15 (concetto prima del soggetto, nessun limite di tono), U16 (patchwork), U17 (la direzione: incisione), U18 (Invictus, `altrui`, con la tua riga), U21 (sagoma, fumo, frase e due domande), U22, U23, U24 (i Pensieri), U26a e U26b (i due pin) | 10, tutti importati, tutti con la data-tetto |
| ◌ restituzioni `eredita` con `serve-a` | le 32 idee del seme e di Claude, più *L'ora nel giardino* e il monologo cancellato. Nel corpo resta il testo dell'Atlante, con il `placement` in prosa in 19 di loro | 32 file (34 legami nella mappa) |
| ● accolte | nessuna | 0 |
| allegati (immagini tue) | nessuno, in tutto l'archivio | 0 |
| memo dal telefono dopo l'importazione | nessuno nomina i tatuaggi | 0 |

Un'insidia da ricordare: il corpo delle `eredita` parla in prima persona con la voce di Claude. Per esempio, nel grimorio:
«Corrisponde alle mie preferenze emerse (patchwork + esoterico)». La vista deve mostrarlo **come ◌**, mai come se le
parole fossero tue.

## 3. C'è spazio? Tre forme

### Forma A: la pagina della raccolta

È la pagina di un nodo (§6.3) applicata a `raccolte/tatuaggi.md`, con la stessa impaginazione delle altre.

- **Che cosa mostra.** In testa il nome e lo scopo, oppure la riga di servizio «senza scopo». Poi 3–5 porte ✦: i
  frammenti con `serve-a: tatuaggi`, in corsivo e con la data. Poi le opere e le persone che quei frammenti nominano,
  ○ con l'esito. Poi, a parte e chiuse, le 32 eredità ◌, una riga ciascuna con il titolo. Infine una voce della coda
  lunga.
- **Da quali dati.** Il nodo raccolta, i legami `serve-a` (✦ dalle letture, ◌ dalle `eredita`), i `ritorna-su` che li
  accolgono (●), i `nomina` degli stessi frammenti, `allegati`, `link`.
- **Che cosa manca nel modello.** Niente. Esiste già come caso generale.
- **Provenienza e «poco e forte».** Il rischio è basso: è la stessa macchina delle altre pagine. Però è anche **la
  bacheca dell'Atlante con meno colori**: un elenco. Il ◌ chiuso evita il muro di 36 proposte.
- **Le immagini.** Gli allegati tuoi si mostrano (la copia WebP). I pin restano link, con il titolo oEmbed o la `nota`.
- **Il corpo.** Assente.
- **Il giudizio.** È corretta ma non dà meraviglia. È il pavimento: c'è comunque, perché il sito ha la pagina di ogni
  nodo.

### Forma B: la tavola (raccomandata)

**L'idea.** La raccolta tatuaggi si mostra come **una tavola alla Warburg**: un campo scuro, pezzi separati di misure
diverse, pelle libera fra loro. Questo sistema si chiama *Mnemosyne* come l'atlante di immagini di Aby Warburg
(*Bilderatlas Mnemosyne*, 1924–1929 ○, tavole di foto fissate su tele nere), e la tua U16 descrive quasi la stessa
forma: *pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera* ✦
(entro il 4 ottobre, nell'archivio d'origine, trascritta da Claude nel seme). La tavola usa per mostrare i pezzi la
forma che hai scelto per portarli addosso. La meraviglia sta nell'accostamento, non in un testo che lo spieghi.

- **Che cosa mostra.**
  - I **pezzi** sono i tuoi frammenti ✦ con `serve-a: tatuaggi`. Ogni pezzo è una tua frase in corsivo con la data, la
    tua immagine quando c'è un allegato, oppure un pin come carta-link.
  - **La misura viene dai dati**, mai dal gusto di un modello: grande se il frammento ha `reazione` `+` o ritorni ✦ ●
    (dalla `mappa.md`, «Ritorni con effetto»), medio di default, piccolo se ha meno di 3 parole tue (un pin nudo). È la
    regola della patchwork in U16: poche ancore, alcuni medi, tanti piccoli.
  - I **fili** (la cucitura): i nodi che due o più pezzi nominano in comune, come *True Detective* tra U21, U23 e i due
    pin, o Invictus. Compaiono come piccole etichette ○ fra i pezzi, mai come prosa.
  - **Ai margini, in grigio, al più un ◌**: l'idea dell'Atlante più vicina ai pezzi grandi, scelta in modo
    deterministico (quella con più legami verso nodi che i pezzi ✦ nominano). Le altre eredità stanno dietro un
    «le 32 idee dell'Atlante ◌» che apre la Forma A.
  - In testa la legenda in una riga (`✦ tue · ◌ mia · ○ mondo · ⚠ da verificare`). In fondo nessuna frase di chiusura.
- **Da quali dati.** Gli stessi della Forma A. `reazione` e i ritorni per la misura. I `nomina` condivisi per i fili.
  `allegati` per le immagini. `link` e la `nota` della lettura per i pin.
- **Che cosa manca nel modello.** Niente di obbligatorio. Due cose sono **facoltative**, e non le aggiungerei ora:
  1. *L'ordine dei pezzi*. Warburg li spostava a mano. Qui l'ordine è il tempo, oppure la misura: un ordine scelto a
     mano sarebbe un campo nuovo e un file scritto a mano, contro le regole. Va lasciato derivato.
  2. *Lo stato* (in esplorazione, scelta, tatuata). Non serve: «l'ho fatto», con la foto, è un memo come gli altri
     (`serve-a: tatuaggi` più `ritorna-su`, `come: aggiunge`, verso il frammento dell'idea). La tavola lo mostra
     perché è il pezzo più recente e ha un'immagine. Il segno è il memo, non un campo.
- **Provenienza.** I pezzi sono solo ✦ (gli importati con la data-tetto e la nota «trascritta da Claude nel seme»,
  regola 6). U18 si mostra come gesto ✦, con la tua riga *Un candidato se vorrò fare testi lunghi.* e al più una riga
  di Invictus ○ con opera e passo (regola 7). I fili sono ○, oppure niente. Il ◌ è uno solo, grigio, fuori dal campo.
  I delicati non entrano mai, anche se un giorno un memo delicato portasse `serve-a: tatuaggi` (un tatuaggio per un
  lutto è un caso realistico): restano fuori finché un tuo frammento non ci torna sopra.
- **Le immagini.** Solo `allegati` tuoi. I pin restano link: una carta tipografica con il titolo oEmbed o la `nota`
  (la descrizione di Claude, ◌ in grigio), e la freccia verso Pinterest. **Niente embed e niente miniatura.**
  L'iframe dell'Atlante caricava l'immagine di un altro dentro la tua tavola e chiamava Pinterest a ogni visita.
- **Il corpo.** Non c'è, ed è giusto così. L'unica parola del corpo nelle tue frasi è *sleeve*. Una sagoma con i pezzi
  posati sopra sarebbe una mia invenzione (◌) presentata come una mappa. Se un giorno scrivi «sul polpaccio», la
  parola è tua e sta nel pezzo: la tavola la mostra così com'è.
- **Il giudizio.** È la forma più semplice che dà meraviglia. È una pagina sola, deterministica, che si calcola dai
  dati di oggi, e la sua forma è una tua frase.

### Forma C: il brief per il tatuatore

**L'idea.** Un foglio da portare in studio, generato al momento e mai salvato (A3), per un'idea o per tutta la raccolta.

- **Che cosa mostra.** Il concetto (le tue frasi ✦ dell'idea), lo stile (U15, U16, U17 alla lettera), le immagini, i
  link dei pin, le domande aperte che hai scritto tu (le due di U21), e il testo da tatuare se c'è, con l'esito
  della citazione o ⚠.
- **Da quali dati.** Gli stessi, filtrati per un frammento e i suoi `ritorna-su`, più i nodi di stile (`patchwork`,
  `incisione`) e i loro frammenti.
- **Che cosa manca nel modello.** Niente, se è una stampa della tavola (CSS di stampa, «salva come PDF»). Se invece
  fosse una prosa composta dall'AI («riassumi per il tatuatore»), sarebbe una restituzione nuova, cioè una quinta
  `forma` con le sue lunghezze: da non fare.
- **Provenienza.** Si **esce dal repository**: è l'unica forma che va in mano a un terzo. Valgono quindi il filtro dei
  delicati e quello delle persone `cerchia: vita`: un pezzo che le nomina non entra. Non c'è nessun ◌, e i segni restano,
  perché il tatuatore deve sapere che cosa è tuo e che cosa è una proposta.
- **Le immagini e il corpo.** Le immagini come nella tavola. Il corpo è il posto giusto per una riga sola, se l'hai
  scritta tu. Nell'Atlante il «consiglio pratico» di `stile/patchwork.md` diceva proprio di portare concetto e reference
  e lasciare al tatuatore il progetto sul braccio.
- **Il giudizio.** È utile, ma solo il giorno in cui vai in studio, e oggi non c'è un'idea scelta. Va tenuto come
  **variante di stampa della Forma B**, non come pagina a sé.

## 4. Raccomandazione

**La tavola (B), con la pagina della raccolta (A) dietro un link e il brief (C) come sua stampa.** Una sola porta nel
sito, «tatuaggi», che apre la tavola.

**Che cosa cambierebbe** (da proporre al coordinatore, non scritto nei file normativi):

1. `modello-v3.md` §6.3, una riga tra le viste: «la tavola di una raccolta: i frammenti ✦ con `serve-a` come pezzi,
   misura da `reazione` e ritorni, fili dai nodi nominati in comune, al più un ◌ fuori campo; stampabile come brief,
   senza delicati e senza persone `vita`». Rende esplicito quello che R8/A3 già dicono («il brief è una vista»).
2. **Nessun campo nuovo.** Né `placement`, né `stato`, né `ordine`. Il corpo e lo stato vivono nelle tue parole.
3. **Nessun prompt cambia per forza.** Una nota per "smista", da verificare sul prompt attuale: una foto con «tatuaggio» o
   «da tatuare» porta `serve-a: tatuaggi` ✦. Senza foto, oggi la tavola è fatta solo di parole e di due pin.
4. Per chi costruisce il sito: il titolo oEmbed dei pin oggi vive nel pacchetto di "smista" e non è detto che resti nei
   file. La tavola ha bisogno di un titolo **salvato** (nella `nota` della lettura c'è già la descrizione di Claude) per
   non chiamare Pinterest a ogni build.

## 5. Dubbi aperti

- **La tavola è povera, oggi.** Ha 10 pezzi, 0 immagini tue e 2 pin, e i pezzi sono tutti del 4–5 ottobre. Senza
  embed, la vista è fatta di parole. Va bene così (il vuoto è un dato), ma l'Atlante «sembrava» più ricco proprio per le
  immagini altrui. Va detto all'utente prima che la veda.
- **L'accostamento Warburg è un ◌.** È accostato a una frase ✦ e regge alla prova del «forte», ma non va scritto nella
  pagina. La pagina deve **essere** la tavola, non spiegarla. Al più si dice una volta, altrove.
- **Lo `scopo`** resta vuoto. La tavola mostra «senza scopo» come riga di servizio e non lo chiede.
- **Le 32 eredità ◌**: tenerle dietro un link o mostrarne una sola ai margini? Proposta: una sola, deterministica.
- **Pubblico o privato.** L'Atlante stava su GitHub Pages pubblico. La tavola contiene parole tue: dove si ospita il
  sito lo decide la sessione tecnica, e questa vista non cambia la risposta. Il brief stampato è l'unica uscita voluta.

## Immagini (`vista-tatuaggi/`)

| file | che cosa |
|---|---|
| `atlante-home-*.png` | la home dell'Atlante |
| `atlante-bacheca-*.png` | la Bacheca, proposte spente: 5 tavole, i due pin |
| `atlante-bacheca-proposte-*.png` | la Bacheca, proposte accese: 37 tavole, 36 da validare |
| `atlante-idea-sognatore-insonne-*.png` | una tua idea: tre righe tue, poi il vuoto |
| `atlante-idea-grimorio-*.png` | l'idea-quadro del seme |
| `atlante-stile-patchwork-*.png` | la nota di stile, con il «consiglio pratico» |
| `atlante-testi-*.png` | «Le parole che potrei portare addosso» |
