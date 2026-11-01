---
tipo: progetto-ricerca
origine: claude
validata: false
data: 2026-10-31
---

# Stato dell'arte: chi ha già provato a mappare una coscienza, e che cosa ha imparato

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Ricerca web su sei famiglie (PKM, memorie per agenti,
> recupero, Claude dal telefono, ontologie e ID esterni, trappole), con un subagent ciascuna. Si chiude con una critica
> della [proposta del primo giro](/_progetto/proposta.md). Le fonti sono in gran parte documentazione ufficiale,
> abstract e recensioni: i paper non sono stati letti per intero. Quello che non abbiamo potuto confermare è segnato "(da verificare)".

Filo conduttore, in una frase: **tutti quelli che ci sono riusciti separano l'episodio grezzo e immutabile dalla
conoscenza derivata, catturano in fretta ed elaborano dopo, e fanno riemergere le cose. Quelli che falliscono
costruiscono lo schema prima di avere i dati.**

L'esempio di prova è sempre lo stesso: *"ho visto uno spezzone di Galimberti, dal suo spettacolo X, diceva '…', molto interessante"*.

---

## 1. PKM e note collegate

| strumento | modello dati | cosa funziona | perché si abbandona |
|---|---|---|---|
| [Obsidian](https://obsidian.md/changelog/2025-08-18-desktop-v1.9.10) | pagine markdown locali, frontmatter YAML, backlink; **Bases** (nel core dalla 1.9.10, agosto 2025) mostra le note come database; [Smart Connections](https://community.obsidian.md/plugins/smart-connections) (embedding locali, c'è un [MCP di terzi](https://github.com/msdanyg/smart-connections-mcp)); [Copilot](https://community.obsidian.md/plugins/copilot) (domande sull'archivio) | i file sono tuoi; le query sulle proprietà | troppi plugin da configurare, note mai riaperte ([Westenberg: "un mausoleo"](https://www.joanwestenberg.com/i-deleted-my-second-brain-692aa40d59d5f06dd5131e43)) |
| [Logseq](https://kompozy.io/news/logseq-2-0-db-version-beta) | outliner a blocchi; la versione DB (beta 2.0.1, luglio 2026) usa SQLite, proprietà tipizzate e tag-classe | riferimenti a blocchi | il passaggio da file a database ha spaccato il prodotto ("OG" contro DB), la migrazione è incerta e la beta può perdere dati ([forum](https://discuss.logseq.com/t/logseq-db-version-release-schedule/29668)) |
| Roam | blocchi con id, backlink: ha inventato "linka tutto" | il backlink come scoperta | Shipper, [The Fall of Roam](https://every.to/superorganizers/the-fall-of-roam): note mai riaperte, ricerca "claustrofobica"; le parentesi manuali sono "una tappa verso una tassonomia automatica" |
| Tana | nodi + **supertag**, cioè un tag che è un tipo con campi (#citazione: autore, opera) | query potentissime per chi costruisce lo schema | curva ripida, "lavoro sul lavoro", tag incoerenti che le query mancano in silenzio, outliner scomodo sul telefono ([recensioni](https://blog.saner.ai/tana-reviews)) |
| Capacities | **oggetti tipizzati** (Persona, Libro, Citazione) con proprietà e backlink | il modello a oggetti è il più apprezzato | app mobile, importazione, IA limitata ([recensione](https://blog.saner.ai/capacities-review)) |
| Heptabase | schede atomiche su lavagne spaziali | vedere le idee e avvicinarle a mano | solo a pagamento, vale soprattutto su desktop |
| Notion AI | pagine + database relazionali; agenti che citano le pagine (3.0) | i database | l'IA piena è nel piano Business; nelle ricerche complesse rende meno di un chatbot generalista ([recensione](https://www.eesel.ai/blog/notion-ai-review)) |
| Reflect | note giornaliere, backlink automatici, cifratura end-to-end | semplicità | poca struttura |
| Mem.ai | "niente cartelle, organizza l'IA"; Mem 2.0 rilanciato nell'ottobre 2025 ([guida](https://get.mem.ai/blog/mem-2-dot-0-transition-guide), [notizia](https://alternativeto.net/news/2025/10/mem-2-0-relaunches-with-smarter-note-taking-tools-offline-support-and-a-new-agentic-chat)) | cattura senza attrito | **l'organizzazione solo implicita non dà fiducia**: non sai cosa ha fatto l'IA |
| Readwise/Reader | highlight + nota + tag; **riemersione giornaliera a intervalli**; chat IA e server MCP | è il modello di ritorno che funziona davvero | pochi difetti (bug nel conteggio della revisione) |

**Lezioni**
1. **Testo originale separato dall'interpretazione** (Readwise: highlight e nota sono due cose). Il messaggio su Galimberti
   resta parola per parola; persona, opera e temi sono livelli sopra.
2. **Pochi tipi, decisi prima, ognuno con il suo template** (Capacities). La deriva di Tana viene dai tipi e tag che
   nascono a ogni nota: "i greci" deve esistere una volta sola (`greci`, `grecia-antica` e `antichi-greci` sono lo stesso nodo).
3. **Collegamenti automatici, ma visibili e reversibili** (contro Mem). Claude riconosce Galimberti da solo, e ogni
   legame scelto da lui resta leggibile come proposta. La fiducia viene dal poter vedere che cosa ha fatto l'IA.
4. **Interrogare per proprietà** (Bases, Dataview, supertag). "Top quote di Dostoevskij" diventa `tipo: citazione,
   autore: fedor-dostoevskij`, ordinate per la tua reazione.
5. **La riemersione tiene vivo l'archivio** (Readwise). Senza ritorno ogni sistema diventa il mausoleo di Westenberg.

**Da rubare**
- Da Readwise la riemersione, e già nell'MVP: *"tre mesi fa Galimberti sull'amore; oggi hai salvato X, regge ancora?"*.
- Da Capacities i tipi come oggetti con template.
- Da Roam e Logseq le ancore citabili dentro una nota (`#citazione-1`).
- Da Obsidian la **compatibilità**: se il repo resta markdown con frontmatter, Obsidian con Bases legge l'archivio gratis,
  come visualizzatore e senza sito. I link assoluti con `/` sono da verificare in Obsidian.
- **Da evitare**: un database proprietario come fonte canonica. Il caso Logseq mostra il rischio.

---

## 2. Memorie per agenti AI

| sistema | episodi | fatti ed entità | tempo | contraddizioni |
|---|---|---|---|---|
| [Mem0](https://arxiv.org/abs/2504.19413) | non sono il centro | un LLM estrae "fatti candidati", poi sceglie **ADD / UPDATE / DELETE / NOOP** contro le memorie simili; Mem0ᵍ aggiunge un grafo | solo il timestamp | si cancella o si riscrive (Mem0ᵍ marca le relazioni come invalide) |
| [Letta/MemGPT](https://arxiv.org/abs/2310.08560) | *recall*: la cronologia completa, consultabile | *core*: blocchi sempre nel prompt che l'agente riscrive; *archival*: passaggi recuperati per similarità | implicito | si riscrive il blocco |
| [Zep/Graphiti](https://arxiv.org/abs/2501.13956) | **episodi immutabili**, fonte di provenienza | entità + archi-fatto, ciascuno rimanda al suo episodio; risoluzione delle entità con embedding, full-text e LLM | **bi-temporale**: `valid_at`/`invalid_at` (nel mondo) e `created_at` (nel sistema) | l'arco vecchio non si cancella, prende `invalid_at` ([repo](https://github.com/getzep/graphiti), [blog](https://blog.getzep.com/beyond-static-knowledge-graphs/)) |
| [A-MEM](https://arxiv.org/abs/2502.12110) | la nota | Zettelkasten agentico: contenuto, parole chiave, tag, contesto, link; una nota nuova genera i link (embedding → LLM) e **fa evolvere le vicine** | solo il timestamp | non gestite: le note cambiano e basta ([repo](https://github.com/agiresearch/A-mem)) |
| [Cognee](https://docs.cognee.ai/core-concepts/overview) | `add` | `cognify` (entità, relazioni, grafo), `memify` (arricchisce e pota) | (da verificare) | (da verificare) |
| [LangMem](https://langchain-ai.github.io/langmem/concepts/conceptual_guide/) | memoria **episodica** | **semantica** (collezione o profilo) e **procedurale** (prompt che si riscrivono); estrazione durante la chat o in background | — | consolidamento |
| Claude | chat passate ([memoria](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context), separata per progetto) | [memory tool](https://platform.claude.com/en/docs/agents-and-tools/tool-use/memory-tool): **file** in `/memories` (view/create/str_replace/…); skill e CLAUDE.md = memoria procedurale | — | sovrascrittura |
| ChatGPT | riferimento alla cronologia, non visibile | *saved memories* esplicite, cancellabili ([FAQ](https://help.openai.com/en/articles/8590148-memory-faq)) | — | sovrascrittura, nessuna provenienza |

**Lezioni**
1. **Graphiti è il modello giusto, e sta in markdown.** Il frammento è l'episodio immutabile; persone, citazioni,
   temi e legami sono fatti derivati che **rimandano al frammento che li ha generati**.
2. **Il tempo serve due volte.** La citazione di Galimberti ha un tempo nel mondo (l'anno dello spettacolo) e un tempo
   tuo (la sera in cui l'hai visto). E le tue *opinioni* cambiano: se ad aprile scrivi "Galimberti ora mi sembra
   banale", non si cancella niente. Il legame "mi interessa" prende una data di fine e il frammento che l'ha chiuso.
   "Cosa pensavo a marzo" diventa così una domanda esatta.
3. **Risolvere l'entità prima di crearla** (Graphiti, Mem0). Le decisioni possibili sono tre: collega a una nota esistente, crea, chiedi.
   **Mai DELETE**: si invalida o si archivia, come vuole già il repo.
4. **L'evoluzione di A-MEM, come proposta.** Un frammento nuovo può suggerire di aggiornare le note vicine ("il tema
   *nichilismo* ora ha 4 frammenti: è un filo?"), ma non le riscrive.
5. **Il lavoro lento in background** (lo *sleep-time compute* di [Letta](https://www.letta.com/blog/sleep-time-compute),
   il `memify` di Cognee). Dal telefono si cattura soltanto; doppioni, convergenze, profilo e diario li fa una sessione separata.
   Il *core memory* di Letta è il nostro `sguardo`/`nucleo.md`, sempre in contesto.

**Da rubare**
- Ogni legame derivato porta la provenienza (`da: 20261031-galimberti-spezzone-x`).
- Validità temporale **solo per i legami che sono opinioni** (`dal`/`fino-a`).
- Le operazioni di Mem0 senza DELETE, come vocabolario delle proposte del consolidamento: "collega", "fondi", "invalida".
- La conferma che **"memoria = file"** (il memory tool di Anthropic) è la scelta giusta, non un ripiego.

---

## 3. Recupero

| tecnica | che cosa fa | per noi |
|---|---|---|
| [GraphRAG](https://arxiv.org/abs/2404.16130) / [LazyGraphRAG](https://www.microsoft.com/en-us/research/blog/lazygraphrag/) | un LLM estrae il grafo, lo divide in comunità e le riassume in anticipo; la versione Lazy non riassume e costa circa lo 0,1% per indicizzare | il grafo ce l'abbiamo già, scritto con cura. Da rubare l'idea della comunità: temi e percorsi sono già riassunti globali |
| [LightRAG](https://arxiv.org/abs/2410.05779) | grafo + vettori su due livelli (entità precise, temi ampi), aggiornamento incrementale | la **doppia chiave**: "Dostoevskij" si risolve per entità, "malinconia" per tema |
| [HippoRAG](https://arxiv.org/abs/2405.14831) / [HippoRAG 2](https://arxiv.org/abs/2502.14802) | ispirato all'ippocampo: le entità della domanda fanno da semi e un **Personalized PageRank** propaga la rilevanza lungo i legami; forte sui compiti associativi | **la tecnica giusta per "con cosa risuona questo?"**. Su qualche migliaio di nodi sono circa 100 righe di Node, senza dipendenze |
| BM25 + embedding con [RRF](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf) | fonde la classifica lessicale e quella semantica (somma di 1/(60+rango)) | lo standard, quando serviranno i sinonimi |
| [Contextual retrieval](https://www.anthropic.com/news/contextual-retrieval) (Anthropic) | anteporre 50-100 token di contesto a ogni pezzo: −49% di fallimenti con BM25, −67% con il reranker | il contesto ce l'abbiamo già, gratis: è il frontmatter. Si indicizza "tipo · autore · temi · testo" |
| [SQLite FTS5](https://www.sqlite.org/fts5.html) + [sqlite-vec](https://github.com/asg017/sqlite-vec) | BM25 nativo, `remove_diacritics`; sqlite-vec è ancora 0.1.x e cerca per forza bruta | **niente stemmer italiano** (`porter` è solo inglese): il tokenizer `trigram` aggira il problema per amore/amori/amoroso |
| Embedding locali | [multilingual-e5-small](https://huggingface.co/Xenova/multilingual-e5-small) (384 dimensioni, transformers.js), [EmbeddingGemma](https://huggingface.co/blog/embeddinggemma), [Qwen3-Embedding-0.6B](https://arxiv.org/pdf/2506.05176) | costo zero, nessuna chiave; la qualità sull'italiano è da verificare |
| Embedding via API | [Voyage](https://docs.voyageai.com/docs/pricing) circa 0,06 $/M token con una quota gratuita (da verificare); OpenAI small circa 0,02 $/M (da verificare) | pochi centesimi per tutto l'archivio; il costo vero è la dipendenza esterna |
| Ricerca agentica con grep | Claude Code è passato da un database vettoriale a glob + grep perché funzionava meglio (Boris Cherny, di seconda mano: [sintesi](https://yage.ai/share/why-coding-agents-still-use-grep-en-20260327.html)); Anthropic consiglia il recupero *just-in-time* ([context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)) | è la base. Il limite: niente sinonimi, e in italiano le flessioni |

**Che cosa serve davvero sotto i 10.000 nodi**

| livello | costo | risponde a |
|---|---|---|
| grep + frontmatter + `git log` | 0 | "top quote di Dostoevskij", "cosa pensavo a marzo", "citazioni sull'amore" (se taggate) |
| + PageRank personalizzato sui legami | ~100 righe | "con cosa risuona questo frammento?", "canzoni con questo tema" a due passi |
| + FTS5 trigram + embedding locali, fusi con RRF | un `.db` rigenerabile, in `.gitignore` | sinonimi, temi vaghi, "qualcosa di triste ma luminoso" |

**Lezioni**
1. Prima la struttura, poi la semantica: le domande dell'utente sono quasi tutte filtri su tipo, autore, tema e data.
2. **L'indice è una cache, non la verità**: si rigenera dai file e, se manca, si torna a grep.
3. Per la risonanza: semi + propagazione (HippoRAG), con un filtro sul tipo alla fine. Per "canzoni sulla malinconia" il seme è
   `malinconia`, si propaga, e alla fine si tengono le opere con `mezzo: canzone`.
4. GraphRAG, LightRAG e HippoRAG completi **non servono**: sono in Python, costano e duplicano un grafo che abbiamo già.

---

## 4. Claude dal telefono: che cosa è vero oggi (2026-10-31)

| via | piano | latenza | scrive nel repo? | note |
|---|---|---|---|---|
| **Tab Code dell'app** (Claude Code nel cloud) ([docs](https://code.claude.com/docs/en/claude-code-on-the-web), [mobile](https://code.claude.com/docs/en/mobile)) | Pro e superiori, nei limiti del piano, VM senza costi a parte | da decine di secondi a 1-2 minuti per l'avvio, con snapshot in cache ([ambienti](https://code.claude.com/docs/en/cloud-environments)) (da verificare) | sì | **il push diretto su `main` è possibile** se il prompt o il CLAUDE.md lo chiedono e non ci sono branch protection |
| **Routine** (scheduled tasks) ([docs](https://code.claude.com/docs/en/routines)) | Pro e superiori, research preview | minuti, ma **asincrona**: non la aspetti | sì | tre inneschi: cron (al massimo ogni ora), **API `POST …/routines/<id>/fire` con un campo `text`**, eventi GitHub. Limiti: 30 avvii/ora per routine, 100/ora per account. Il `text` arriva come dato non fidato: il prompt deve dire che cosa farne |
| **Comando rapido iOS → API GitHub** (`PUT /repos/…/contents/inbox/…` con un PAT) | gratis | circa 1 s | sì, testo grezzo | nessun ragionamento; su Android equivalenti come HTTP Shortcuts o Tasker (da verificare) |
| **Comando rapido → fire della Routine** | Pro | il tocco è immediato, la nota arriva in qualche minuto | sì, nota completa | documentato ma **da provare sul campo** |
| **Progetto claude.ai + GitHub** ([docs](https://support.claude.com/en/articles/10167454-using-the-github-integration)) | anche Free (5 progetti) | risposta immediata | **no, sola lettura**; il "Sync now" è manuale | ottimo per **fare domande** all'archivio dall'app |
| **Connettore MCP personalizzato** ([docs](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)) | tutti i piani (Free: 1 connettore) | pochi secondi a chiamata | sì, se lo espone | si aggiunge dal web e si usa anche sul telefono; OAuth o token; server gratis su [Cloudflare Workers](https://developers.cloudflare.com/agents/guides/remote-mcp-server/) (100.000 richieste/giorno, [prezzi](https://developers.cloudflare.com/workers/platform/pricing/)); il [server MCP ufficiale di GitHub](https://docs.github.com/en/copilot/how-tos/context/model-context-protocol/using-the-github-mcp-server) come connettore di claude.ai è da verificare |
| Telegram ([Channels](https://code.claude.com/docs/en/channels)), [Remote Control](https://code.claude.com/docs/en/remote-control) | piano | secondi | sì | richiedono **un tuo computer sempre acceso**: scartati per ora |
| Memoria di claude.ai | tutti | — | no | ricorda le chat, non il repo: non sostituisce l'archivio |

**Lezioni**
1. **L'attesa di 1-2 minuti non si accorcia: si toglie di mezzo.** Cattura ed elaborazione vanno separate. Il messaggio
   finisce nel repo in un secondo (comando rapido → API GitHub, oppure → fire della Routine) e la Routine lo elabora
   mentre tu fai altro. Al telefono torna una conferma, non una conversazione.
2. **Scrivere e chiedere sono due canali.** Le domande veloci passano da un Progetto con il repo sincronizzato (sola
   lettura, istantaneo) o da un connettore MCP. Quelle che richiedono script, come il PageRank e i conteggi, vanno nel tab Code.
3. **L'Action `unisci.yml` della proposta probabilmente non serve**: basta che `/memo` faccia push su `main`.
   Resta valida come rete di sicurezza solo se si tengono i branch `claude/*`.
4. Il **connettore MCP su Cloudflare Workers** è la soluzione a regime: costo zero, un solo endpoint per "salva" e "cerca",
   disponibile in chat anche sul piano Free. Ma va scritto e mantenuto: non fa parte dell'MVP.

---

## 5. Ontologie leggere e ID esterni

Verificato via API dal container:
- **Umberto Galimberti = [Q4003398](https://www.wikidata.org/wiki/Q4003398)**.
- **Fëdor Dostoevskij = [Q991](https://www.wikidata.org/wiki/Q991)**.
- Cercando solo "Dostoevsky" con [`wbsearchentities`](https://www.wikidata.org/w/api.php?action=help&modules=wbsearchentities),
  il primo risultato è **una monografia del 1976, non l'autore**: la scelta automatica sbaglia.
- Dopo poche richieste, Wikidata risponde "too many requests": i [limiti del 2026](https://www.mediawiki.org/wiki/Wikimedia_APIs/Rate_limits)
  sono bassi per le richieste anonime, più alti con uno [User-Agent conforme](https://meta.wikimedia.org/wiki/User-Agent_policy).
- [MusicBrainz](https://musicbrainz.org/genres) elenca **2.220 generi curati**, ciascuno con il suo MBID e le relazioni "subgenre of".

| vocabolario | che cosa ci dà |
|---|---|
| [Schema.org Quotation](https://schema.org/Quotation) | i nomi dei campi già pensati: `creator`, [`spokenByCharacter`](https://schema.org/spokenByCharacter) (una battuta di Ivan Karamazov non è Dostoevskij che parla!), `isPartOf`, `about`; poi [MusicRecording](https://schema.org/MusicRecording) (`inAlbum`, `byArtist`, `genre`) e [MusicAlbum](https://schema.org/MusicAlbum) |
| Wikidata | ID stabili, alias multilingue (it/en/ru) gratis, e da lì gli ID di MusicBrainz (P434), Open Library (P648), Discogs, TMDB e AniList. Gli spettacoli di un divulgatore spesso **non ci sono** |
| [Wikiquote](https://it.wikiquote.org/wiki/F%C3%ABdor_Dostoevskij) | separa le citazioni con fonte da quelle **"attribuite" ed "errate"**: è il controllo giusto per le "top quote" |
| [MusicBrainz](https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting) | MBID per brano e [release-group](https://musicbrainz.org/doc/Release_Group) (l'album astratto); 1 richiesta al secondo, User-Agent obbligatorio |
| [Open Library](https://openlibrary.org/developers/api), [TMDB](https://developer.themoviedb.org/docs), [AniList](https://docs.anilist.co) | libri, film, anime |
| [SKOS](https://www.w3.org/TR/skos-primer/) | `prefLabel`/`altLabel`/`broader`/`narrower`/`related`: il modello giusto per temi ed emozioni, **senza RDF**, come semplici campi del frontmatter |
| [Every Noise](https://everynoise.com) | mappa dei generi nata con Spotify, ferma da anni (da verificare) |

**Conviene ancorare le entità a ID esterni? Sì, ma con leggerezza, e in consolidamento.**
- **Benefici**: niente doppioni (Dostoevskij, Dostoevsky e Dostoyevsky sono tutti Q991), alias gratis per `trova.mjs`,
  un ponte verso MusicBrainz e Open Library.
- **Costi**: chiamate con limiti, la verifica umana, un campo in più da mantenere.
- **Quando**: mai alla cattura dal telefono, dove conta la velocità. Nel consolidamento uno script propone i primi tre
  candidati, ciascuno con la sua descrizione, e tu scegli.

**Da rubare (Galimberti)**
- `persone/umberto-galimberti.md` prende `wikidata: Q4003398`: un attributo, non un collegamento. Lo slug resta l'ID primario,
  e `verifica.mjs` vieta che due note abbiano lo stesso QID.
- `opere/spettacolo-x.md` non ha QID e non se ne inventa uno: bastano `link` al video.
- La citazione usa i campi di Schema.org (`autore`, `fonte`, `personaggio` se è una battuta) e una `verifica` che
  rispecchia le categorie di Wikiquote.
- Per i generi della musica, **la lista curata di MusicBrainz è il vocabolario**, con la tua etichetta come alias.
  Non serve costruirlo a mano: lo si potrà sempre restringere.

---

## 6. Le trappole note

1. **Collector's fallacy** ([Tietze](https://zettelkasten.de/posts/collectors-fallacy);
   [Matuschak](https://notes.andymatuschak.org/Collecting_material_feels_more_useful_than_it_usually_is)): raccogliere
   dà la sensazione di sapere. Il tuo progetto la rischia per costruzione, perché nasce proprio per raccogliere tutto. Il
   rimedio non è raccogliere meno, ma che **ogni frammento porti una tua reazione** e che qualcosa lo faccia ritornare.
2. **Note transitorie** ([Matuschak](https://notes.andymatuschak.org/Most_people_take_only_transient_notes)): dopo un anno sono
   "un mucchio di note dissociate". Le [evergreen notes](https://notes.andymatuschak.org/Evergreen%5Fnotes) si riprendono nel tempo,
   e la revisione funziona come una ripetizione dilazionata.
3. **Mausolei e productivity porn**: [Westenberg](https://www.joanwestenberg.com/i-deleted-my-second-brain-692aa40d59d5f06dd5131e43)
   ha cancellato 10.000 note; per [Unnikrishnan](https://akhiluk.bearblog.dev/2025/07/a-second-brain-was-never-really-feasible/)
   il sistema "aveva cominciato a modellare la mia attenzione".
4. **Troppa struttura** prima dei dati: le critiche a [progressive summarization](https://www.linkingyourthinking.com/ideaverse/the-potential-side-effects-of-progressive-summarization)
   e a PARA. Milo preferisce mappe che nascono quando servono (il nostro "tema nuovo solo quando ricorre").
5. **Rumore dell'IA**: riassunti che nessuno rilegge, tag automatici, link plausibili ma vuoti. L'IA automatizza proprio lo
   sforzo che dà valore al sistema; un archivio che solo accumula "è un secondo inbox, non un secondo cervello"
   ([toolsforhumans](https://www.toolsforhumans.ai/blog/your-second-brain-is-write-only-heres-why-most-notes-never-get-revisited),
   [Arango](https://jarango.com/2026/03/27/robots-in-the-garden/)).
6. **Lock-in**: [file over app](https://stephango.com/file-over-app) (Ango). Markdown su git risponde già a questo rischio.

**Regole anti-trappola sul caso Galimberti: che cosa l'IA NON deve fare**
- Non riassumere lo spettacolo e non fare un elenco di "temi chiave" in cinque punti.
- Non creare `#nichilismo #tecnica #giovani` alla prima occorrenza: si lega solo a nodi esistenti, e un tema nuovo
  nasce al **secondo o terzo frammento** che lo richiama (fino ad allora resta una parola candidata nel frammento).
- Non proporre dieci legami a Heidegger, Nietzsche e Jung: **al massimo 1-3, ognuno motivato in una riga**.
- Non attribuire a Galimberti la frase che ricorda dal web: si cita la tua versione, accanto a quella verificata.
- Le proposte non validate **scadono** (per esempio dopo 60 giorni) e finiscono in archivio con il motivo.
  Altrimenti "Da validare" diventa un secondo mausoleo.

---

## 7. Critica della proposta del primo giro

### Che cosa regge (confermato dallo stato dell'arte)
- **Il frammento immutabile come episodio** e le entità come conoscenza derivata: è Graphiti, è Readwise.
- **Markdown in git, "memoria = file"**: è la scelta di Anthropic per il memory tool e la risposta al lock-in.
- **Proposte marcate e validazione umana**: è il rimedio esatto al fallimento di Mem.
- **`pancia` solo tua**: è il rimedio alla collector's fallacy. Va resa il cuore del sistema, non un campo facoltativo.
- **Il consolidamento settimanale**: è lo sleep-time compute di Letta.
- **JSON e grep prima di SQLite e vettori**: sotto i 10.000 nodi è la scelta giusta, e Claude Code stesso ha scelto così.

### Che cosa reinventa male
1. **Il flusso `/memo` sincrono dal tab Code.** La proposta fa aspettare l'utente (avvio della VM, ricerca, verifica)
   per ogni messaggio, e lo segnala come costo. Lo stato dell'arte (Letta, LangMem in background, le Routine con `fire`)
   dice: **cattura in un secondo, elabora dopo**.
2. **`unisci.yml`**: una GitHub Action per fondere i branch `claude/*` risolve un problema che non c'è, visto che il push su `main` è permesso.
3. **Il vocabolario dei generi "sui tuoi ascolti"**: MusicBrainz ne ha già 2.220 curati, in gerarchia. Costruirlo a mano è lavoro sprecato.
4. **`trova.mjs` con solo Levenshtein e alias**: va bene per l'MVP, ma senza un ancoraggio esterno i doppioni tornano
   (Dostoevskij/Dostoevsky/Dostoyevsky). Un QID risolve il problema in modo stabile.
5. **11 tipi, ~25 campi, 17 predicati prima del primo frammento vero.** È la strada di Tana: potente, e abbandonata
   per il "lavoro sul lavoro". `ritorni`, `fruizione`, `scoperto-tramite`, `sviluppa`, `confluito-in`, `contraddice` e `polarita`
   possono aspettare di servire davvero.

### Che cosa manca
1. **La provenienza dei legami**: chi ha generato `parla-di: nichilismo`, e da quale frammento? (Graphiti.)
2. **Il tempo delle opinioni**: un legame che smette di valere senza essere cancellato (`dal`/`fino-a`). Lo `sguardo` datato
   copre il punto di vista intero, non il singolo legame.
3. **La riemersione nell'MVP** (Readwise, Matuschak): oggi è il punto 5 del "dopo", facoltativo. È ciò che distingue una
   coscienza da un archivio: va dentro il primo traguardo.
4. **La risonanza vera**: la ricetta 7 ("con cosa risuona") con due passi di filtri è debole. Un PageRank personalizzato
   sul grafo (HippoRAG) costa 100 righe e fa la "meraviglia" che l'utente chiede.
5. **Il canale delle domande dal telefono**: la proposta presuppone il tab Code anche per chiedere. Un Progetto con il repo
   sincronizzato risponde subito alle domande semplici.
6. **Le regole di nascita e di morte**: quando nasce un tema (alla seconda o terza ricorrenza), quando scade una proposta.
7. **Il controllo delle citazioni contro Wikiquote** ("attribuite/errate") e il campo `personaggio` (la battuta di un
   personaggio non è l'autore che parla).
8. **Un banco di prova**: 20 domande vere dell'utente con la risposta attesa, da rilanciare a ogni modifica dello schema.
   Tutti i sistemi del §2 misurano; noi no.

### Architettura raccomandata

**MVP (2-3 giorni)**
1. **Cattura in un secondo.** Un comando rapido sul telefono ("Memo") fa un PUT con l'API GitHub su
   `inbox/AAAAMMGG-HHMM.md` con il testo grezzo. In alternativa fa il `fire` di una Routine con `text`, se la prova sul
   campo regge (meglio ancora, perché fa le due cose in una).
2. **Elaborazione asincrona.** Una Routine "smista" (fire a ogni memo, oppure ogni ora) fa `/memo` sull'inbox:
   - crea il frammento immutabile;
   - risolve le entità, con tre esiti: collega, crea, chiedi;
   - propone al massimo 3 legami motivati in `proposti:`;
   - lancia la verifica e fa push su `main`.

   La domanda per te ("quanto ti ha colpito, 1-3?") la mette in coda. Resta anche `/memo` sincrono dal tab Code per quando vuoi conversare.
3. **Schema ridotto.** Sei tipi: frammento, citazione, persona, opera, tema (emozioni comprese, distinte da `forma`), domanda.
   Otto predicati: `autore`, `fonte`, `cita`, `parla-di`, `suscita`, `evoca`, `converge-con`, `influenzato-da`.
   Ogni legame proposto porta `da:` (il frammento). Simboli, tradizioni, percorsi e sguardo arrivano con l'importazione o dopo.
4. **Recupero.** `indice.json` + `cerca.mjs` con pochi filtri + **`risuona.mjs`** (PageRank personalizzato). Domande
   veloci da un Progetto claude.ai sincronizzato; quelle pesanti dal tab Code.
5. **Riemersione.** Ogni domenica il consolidamento propone **un** frammento vecchio accanto a uno nuovo, con una domanda.
6. **Banco di prova** di 20 domande in `_progetto/` o `test/`.

**A regime (dopo 1-3 mesi di uso vero)**
- **Connettore MCP su Cloudflare Workers** (gratis): `salva`, `cerca`, `risuona`, `citazioni_di`, in chat dal telefono senza VM.
- **ID esterni nel consolidamento**: Wikidata per persone e opere, MusicBrainz per brani e generi, con tre candidati e la tua scelta.
- **Validità temporale delle opinioni** (`dal`/`fino-a`), quando i primi cambi di idea ci saranno davvero.
- **FTS5 trigram + embedding locali (e5-small o EmbeddingGemma) con RRF**, solo se il banco di prova mostra che grep
  manca i sinonimi. Il `.db` resta una cache in `.gitignore`.
- **Evoluzione alla A-MEM**: il consolidamento propone di aggiornare le note vicine, di fondere i doppioni e di far nascere
  i temi ricorrenti.
- **Obsidian con Bases** come visualizzatore gratuito, prima di pensare a un sito privato.

Perché: ogni pezzo dell'MVP è un file o uno script rigenerabile, nessun servizio a pagamento oltre al piano Claude,
e l'attesa al telefono scende da 1-2 minuti a un tocco. Quello che costa (MCP, embedding, ID esterni) entra solo quando
il banco di prova dimostra che serve.
