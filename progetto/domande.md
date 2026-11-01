# Le domande alla base di conoscenza

> Progettazione, 2026-10-31. Che cosa chiederà l'utente al suo memo-coscienza, e che cosa deve contenere
> il modello dati perché l'AI sappia rispondere. Nessuna nota, cartella o script esistente è stato toccato.

## 0. Chi chiede (dal nucleo e dalle note)

- Filone: il viaggio, il dolore attraversato a occhi aperti, poi amore e verità. Oggi assurdista (Camus), stoico (Marco Aurelio), Peterson.
- Pesca da filosofia, religioni e mito, esoterismo, letteratura (Dostoevskij, Leopardi, Rilke, Kafka), anime e serie (FMA, Berserk, True Detective), musica eterea e malinconica (Radiohead, Deftones).
- Ragiona per **concetti** (amor fati, eterno ritorno, soglia), **emozioni** (malinconia, vuoto, rabbia), **convergenze** tra tradizioni e **reazioni di pancia**.
- Scrive dal telefono, a frammenti: una frase, un link, "ho visto Galimberti che diceva…".
- Oggi l'archivio ha già: 8 domande, 7 discipline con filoni, fonti con `disciplina/filone/forma/anno/autore/influenzato-da`,
  una `## Citazione` per nota, `origine/validata`, `creato`, e un loader del sito (`.vitepress/theme/atlante.data.ts`).

## 1. Catalogo delle domande (62)

### A. Per tema / concetto
1. Dammi canzoni che parlano di solitudine.
2. Citazioni filosofiche sulla morte che non sia tragica.
3. Che cosa ho raccolto sull'amore finora?
4. Opere che parlano di colpa e redenzione.
5. Tutto quello che ho sul tempo che ritorna (eterno ritorno, ciclo, uroboro).
6. Quali temi compaiono più spesso nelle mie note?
7. Cosa ho sui greci?

### B. Per autore / opera / fonte
8. Le migliori citazioni di Dostoevskij.
9. Cosa ho salvato di Galimberti?
10. Chi ha influenzato Camus, e chi ha influenzato lui, nel mio archivio?
11. Quali opere di Rilke ho, e quali mi mancano tra le principali?
12. Che cosa diceva Galimberti in quello spettacolo sull'amore?
13. Gli autori che cito di più.
14. Tutto quello che viene da True Detective.

### C. Per genere / mezzo / forma
15. E di questo genere? (stesso tema, solo post-rock / shoegaze)
16. Film o serie che hanno la stessa atmosfera di True Detective.
17. Solo i miti, non gli autori, sul tema della discesa agli inferi.
18. Quadri e incisioni sul sublime.
19. Anime che parlano di sacrificio.
20. Poesie brevi che potrei leggere ad alta voce.

### D. Per emozione / stato d'animo
21. Mi sento vuoto: che cosa ho che parla di questo?
22. Qualcosa per la rabbia, ma che non la spenga.
23. Quali emozioni tornano più spesso nei miei frammenti?
24. Musica per la malinconia luminosa, non quella che affonda.
25. Che cosa mi ha dato pace, nelle cose che ho salvato?
26. Quando ho scritto da arrabbiato, di cosa parlavo?

### E. Per tempo / memoria ("cosa pensavo a marzo")
27. Cosa pensavo a marzo?
28. Cosa ho salvato questa settimana?
29. Com'è cambiata la mia idea di senso nell'ultimo anno?
30. Quando ho scoperto Zapffe, e da dove ci sono arrivato?
31. Le cose che ho salvato e non ho mai più ripreso.
32. Un anno fa, in questo giorno, cosa annotavo?
33. Quali idee sono rimaste vive più a lungo?

### F. Convergenze tra tradizioni
34. Chi altro ha detto la stessa cosa di Marco Aurelio, in un'altra cultura?
35. Il dolore come via: stoici, buddhismo, cristianesimo, Nietzsche, a confronto.
36. Cosa c'entra Berserk con Giobbe?
37. Trova convergenze che non ho ancora notato.
38. Questo frammento di Galimberti con cosa risuona nel mio archivio?
39. Dove le mie fonti si contraddicono?
40. Lo stesso simbolo (la porta, il serpente) in tradizioni diverse.

### G. Riflessione su di sé
41. Cosa dice di me quello che salvo?
42. Dove sono adesso, rispetto al nucleo?
43. Ci sono tensioni aperte che continuo a evitare?
44. Cosa mi colpisce ultimamente, a pancia?
45. Le mie frasi, solo le mie, sul dolore.
46. Fammi una domanda su di me a partire dalle ultime note.
47. Sto cambiando idea su qualcosa?

### H. Creatività e progetti (tatuaggi e altro)
48. Quali idee di tatuaggio sono pronte per un artista?
49. Proponimi un pezzo che unisca amor fati ed eterno ritorno.
50. Quali spunti non hanno ancora un'idea?
51. Cosa potrebbe stare nella sleeve accanto al grimorio?
52. Da questa citazione, tre soggetti possibili.
53. Idee per un testo o un post a partire da quello che ho.

### I. Raccomandazioni ("cosa dopo")
54. Cosa leggere dopo Delitto e castigo?
55. Ho finito Evangelion: cosa guardo?
56. Un autore che non conosco ma che mi piacerebbe, visto l'archivio.
57. Cosa ho in lista da leggere o guardare?
58. Tre canzoni nuove sul tema del viaggio.

### J. Manutenzione e verifica
59. Cosa devo ancora validare?
60. Quali citazioni sono "da verificare"?
61. Note rimaste isolate o povere di collegamenti.
62. Cosa c'è nell'inbox da smistare?

## 2. Per famiglia: cosa serve nel modello e come si risponde

Legenda motore: **F** = filtro strutturato sull'indice; **S** = ricerca semantica / lettura del testo; **R** = ragionamento dell'AI
(collegare, scegliere, proporre); **K** = conoscenza generale dell'AI, fuori archivio (sempre marcata come proposta).

| Fam. | Attributi e relazioni necessari | Motore |
|---|---|---|
| A tema | `temi` (slug di concetti/emozioni/simboli) su **ogni** nodo, frammenti compresi; alias e sinonimi dei temi | F + S |
| B autore | fonte `forma: autore`; `autore` su opere e citazioni; `influenzato-da`; `da` (opera/spettacolo di provenienza) | F |
| C genere | `mezzo` (libro, poesia, canzone, album, film, serie, anime, quadro, spettacolo, video, podcast) e `genere` libero ma normalizzato | F + K |
| D emozione | `emozioni` sul frammento; `reazione` di pancia e intensità (1–3); polarità opzionale (affonda / innalza) | F + R |
| E tempo | `creato` datato su tutto, `quando` dell'esperienza se diverso, `aggiornato`; storia git; `stato` di vita (vivo, dormiente, archiviato) | F |
| F convergenze | `filone`/`disciplina`/`anno` (tradizione e periodo); relazioni tipizzate `converge-con`, `contraddice`, `risponde-a`; temi condivisi | R su F |
| G sé | `origine: mia` vs `claude`; `voce: mia` sulle citazioni; nucleo datato; tensioni come nodi | S + R |
| H creatività | territorio esistente (spunti, idee, `stato`), simboli, stile; legame idea ↔ temi ↔ fonti | F + R |
| I raccomandazioni | `fruizione` (da-fare, in-corso, fatta), `voto`/"mi è piaciuto"; temi e generi delle opere amate | F + K |
| J manutenzione | `validata`, "(da verificare)", grado dei nodi, `inbox/` | F (già `verifica.mjs`) |

### Esempi di risposta ideale (telefono)

**A** · *Canzoni sulla solitudine*
> Nel tuo archivio: Radiohead, *Ok Computer* (alienazione) · Deftones (solitudine e desiderio).
> Fuori archivio, da validare: Sigur Rós, *Ágætis byrjun*; Low, *Lullaby*. Le aggiungo come ricerca?

**B** · *Le migliori di Dostoevskij*
> 1. "La bellezza salverà il mondo." (L'idiota, III, 5) ⭐
> 2. … (Karamazov, il Grande Inquisitore). Hai 4 citazioni, 2 da verificare.

**C** · *E di questo genere?* → mantiene il tema della domanda precedente e filtra `genere: post-rock`. Serve **memoria di conversazione**, non solo dello schema.

**D** · *Mi sento vuoto*
> Hai annotato il vuoto 6 volte. Ciò che ti ha aiutato: Camus (Sisifo felice), Marco Aurelio IV, 3, Rilke *Elegia I*.
> Vuoi l'ultima frase tua su questo? (12 marzo)

**E** · *Cosa pensavo a marzo?*
> 9 frammenti. Temi: morte (4), libertà (3). Hai scoperto Zapffe e scritto "il pessimismo mi tenta ma non mi basta". Il nucleo non è cambiato.

**F** · *Il dolore come via, a confronto*
> Stoici: l'ostacolo è la via · Buddha: la prima nobile verità · Cristianesimo: la croce · Nietzsche: amor fati.
> Convergono sul *trasformare*, divergono sul *perché*. Nuovo legame proposto: Dhammapada ↔ amor fati.

**G** · *Cosa mi colpisce ultimamente?*
> Negli ultimi 30 giorni il 60% dei frammenti tocca l'amore, non il dolore. Ti sembra vero?

**H** · *Spunti senza idea* → elenco di 3, ciascuno con un soggetto proposto (marcato).

**I** · *Dopo Delitto e castigo*
> Dal tuo archivio: I fratelli Karamazov (già collegato). Fuori: *Memorie del sottosuolo*, poi Camus, *La caduta*.

**J** · *Da validare* → numero e link alla pagina Da validare.

## 3. Requisiti che le domande impongono allo schema

1. **Frammento** come tipo di primo livello (oggi manca): l'annotazione al volo, datata, con `testo` (mie parole),
   `citazione` (parole altrui), `di` (persona), `da` (opera, spettacolo, video, conversazione), `mezzo`, `link`, `reazione`.
2. **Citazioni come entità**, non una sola per nota: più citazioni per fonte, ciascuna con autore, opera, luogo,
   `temi`, `verificata`, `preferita` (per "le migliori"). Forse un file per autore con elenco strutturato.
3. **Temi trasversali** obbligatori su ogni nodo (riuso di concetti, emozioni, simboli come vocabolario), con alias.
   L'AI estrae i temi; quelli nuovi entrano come proposta.
4. **Mezzo e genere** sulle opere (oggi `forma` non distingue canzone, film, anime) e **persone** separate dalle opere.
5. **Tempo**: `creato` su tutto (già quasi ovunque), `quando` dell'esperienza, nucleo versionato (snapshot datati) per "com'è cambiata".
6. **Stato di fruizione e gradimento** sulle opere (lista "da leggere/guardare", "mi è piaciuto").
7. **Relazioni tipizzate** oltre al legame generico: autore-di, influenza (esistono), più `converge-con`, `contraddice`, `risponde-a`.
8. **Provenienza** su tutto: `origine`/`validata` (esistono) e distinzione archivio vs conoscenza dell'AI nelle risposte.
9. **Privacy**: le domande su di sé e sui rapporti producono note intime, ma **repo e sito sono pubblici**.
   Serve una scelta: repo privato, oppure campo `privata: true` escluso dal sito, oppure un livello cifrato.

## 4. Come dovrebbe rispondere l'AI

| Opzione | Pro | Contro |
|---|---|---|
| **a. Indice JSON generato** dalle note (`scripts/indice.mjs` → `indice.json`: slug, tipo, frontmatter, citazioni, temi, date, link entranti/uscenti) + **CLI di ricerca** (`scripts/cerca.mjs --tema vuoto --mezzo canzone --dal 2026-03`) | Deterministico, veloce, zero dipendenze, versionato, verificabile. L'AI lo usa come strumento e poi legge solo le note giuste. Si riusa il parser di `verifica.mjs` e del loader del sito | Non capisce sinonimi né "di cosa parla davvero" un testo |
| **b. Pagine filtrabili sul sito** (dallo stesso indice: per tema, autore, mezzo, mese; pagina citazioni) | Utili dal telefono senza AI, gratis, sfogliabili | Solo filtri; il sito è pubblico (vedi privacy); niente convergenze |
| **c. Embedding** (vettori delle note, ricerca per similarità) | Trova risonanze senza parole in comune (es. Galimberti ↔ Simposio) | Dipendenze e servizio esterno, costi, va rigenerato, opaco; con poche centinaia di note l'AI legge già tutto il necessario |
| **d. Solo l'AI che legge il repo** (grep + lettura) | Nessuna infrastruttura, già funziona | Lento e costoso al crescere; risposte non riproducibili; difficile su tempo e conteggi |

**Raccomandazione: a + b subito, c più tardi.**
- L'**indice JSON** è la colonna vertebrale: copre da solo le famiglie A–E, H, I, J con filtri (circa 2/3 delle domande).
- L'AI (Claude Code, o l'app con accesso al repo) fa **retrieval in due passi**: filtro sull'indice → lettura delle 5–20 note
  trovate → ragionamento (F, G, H, I) → risposta breve con link. La conoscenza esterna (K) è sempre etichettata
  "fuori archivio, da validare" e, se l'utente vuole, diventa una `ricerca/`.
- Le **pagine filtrabili** riusano l'indice (il sito ha già i loader `*.data.ts`): niente doppio lavoro.
- **Embedding** quando l'archivio supera ~1000 nodi o le domande di convergenza falliscono spesso. Si possono
  salvare nell'indice (campo `vettore`) senza cambiare architettura.
- **Memoria di conversazione** per i rimandi ("e di questo genere?"): nella chat, non nello schema.

### 4bis. Se si riparte da zero (nuova indicazione: niente vincoli dall'impianto attuale)

| Opzione | Pro | Contro |
|---|---|---|
| **e. Server MCP dell'archivio** (strumenti `salva_frammento`, `cerca`, `citazioni_di`, `cosa_pensavo`, `convergenze`) sopra l'indice | L'app Claude dal telefono interroga e scrive l'archivio direttamente: è la domanda madre ("salva questo") senza passare da una sessione Code | Va ospitato (o eseguito in locale) e autenticato |
| **f. SQLite come indice** (tabelle nodi, citazioni, temi, legami; FTS5 per il testo; `sqlite-vec` per i vettori) generato dai markdown | Una sola base per filtri, testo pieno, conteggi nel tempo e similarità; query SQL per le famiglie E e J | Un artefatto binario da rigenerare; non si legge su GitHub |
| **g. Database come fonte di verità** (Postgres/Supabase, Notion…) al posto dei markdown | Query ricche, app native | Si perde la leggibilità, git come storia e la portabilità; lock-in |
| **h. App mobile dedicata** (PWA di cattura e ricerca) | Cattura in un tocco, offline | Molto lavoro; l'app Claude fa già da interfaccia |

**Raccomandazione aggiornata.** Restano **markdown in git come fonte di verità** (leggibili, versionati, portabili:
servono già alle domande sul tempo). Sopra: **indice generato** in **SQLite** (FTS5 + vettori), così filtri,
ricerca testuale e similarità stanno insieme fin dall'inizio (gli embedding non sono più "dopo": costano poco su un indice locale).
Davanti: un **server MCP** con 5–6 strumenti, che diventa il vero motore di risposta per l'app Claude dal telefono
e per Claude Code; il sito resta la vetrina sfogliabile, generata dallo stesso indice, con le note `privata` escluse
(o repo privato e sito solo per la nicchia pubblica, es. i tatuaggi).

## 5. Le 10 domande da servire dal primo giorno

1. **Salva questo** (frammento al volo): "ho visto Galimberti… diceva '…'" → nota, temi estratti, collegamenti. È la domanda madre.
2. **Cosa ho su [tema]?** (amore, vuoto, i greci), con citazioni in testa.
3. **Le migliori citazioni di [autore].**
4. **Dammi [mezzo] su [tema]** (canzoni, film, poesie), prima dall'archivio poi fuori, marcato.
5. **E di questo genere / e solo di [tradizione]?** (raffinamento della risposta precedente).
6. **Cosa pensavo a [periodo]?** / cosa ho salvato questa settimana.
7. **Con cosa risuona questo?** (convergenze di un frammento nuovo con l'archivio).
8. **Mi sento [emozione]: cosa ho che ne parla?**
9. **Cosa leggo / guardo / ascolto dopo?** (dalla lista e dai gusti).
10. **Cosa mi colpisce ultimamente?** (temi ricorrenti nel tempo, riflessione su di sé).

Per servirle servono, minimi: tipo **frammento**, **citazioni multiple** con autore e opera, **temi** su ogni nodo,
**mezzo/genere**, **date** ovunque, **indice (JSON o SQLite) + ricerca**, idealmente esposti come **server MCP**, e una decisione sulla **privacy**.
