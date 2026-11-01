---
tipo: progetto-ricerca
origine: claude
validata: false
data: 2026-10-31
---

# Identità: prova sul campo degli ID esterni

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Non fa parte dell'archivio.
> [Lo stato dell'arte](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/stato-arte.md) propone di ancorare persone e opere a Wikidata e MusicBrainz,
> ma solo nel consolidamento. Qui la proposta è messa alla prova: 30 entità prese dal
> [corpus degli esempi in ingresso](https://github.com/paol-imi/tattoo-shit/blob/claude/quirky-newton-qe5g9o/_progetto/v2/esempi-ingresso.md), scelte apposta tra i casi difficili,
> cercate davvero con le API pubbliche partendo dal testo come lo scrivo io dal telefono.
> Circa 150 chiamate in tutto: Wikidata (`wbsearchentities`, ricerca a testo pieno, SPARQL), MusicBrainz WS/2
> (User-Agent dichiarato, 1 richiesta al secondo), Open Library e una ricerca web. Due subagent: uno per i generi.

## In breve

- **8 su 30 (27%)**: il primo risultato, cercando il testo così com'è, è quello giusto.
- **20 su 30 (67%)**: si trova, ma serve contesto. Bisogna espandere il nome dal messaggio, dare il tipo o l'artista,
  fare una seconda chiamata o correggere il titolo. In **9 di questi** il primo risultato è sbagliato ma *credibile*:
  un film al posto del romanzo, il manga al posto dell'anime, l'originale al posto della cover, il singolo al posto
  dell'album. Sono questi i casi pericolosi, perché un sistema automatico li salverebbe senza accorgersene.
- **2 su 30 (7%)**: non c'è un ID Wikidata. Lo spettacolo di Galimberti non c'è proprio; *L'ospite inquietante*
  esiste solo su Open Library. Reel, video, frasi e persone della mia vita non sono entità: lì l'ID non va nemmeno cercato.
- **Da chiedere a me**: 2 casi su 30. Quale *Fullmetal Alchemist* (manga, anime del 2003 o *Brotherhood*)
  e il titolo dello spettacolo, che io stesso do per incerto. Tutti gli altri si decidono leggendo il messaggio.
- **Tempi**: Wikidata risponde in 90-300 ms (circa 140 ms tipici) e non ha mai rifiutato una richiesta.
  SPARQL risponde in circa 270 ms, Open Library in 200-400 ms. MusicBrainz risponde in 0,2-1,3 s,
  ma **il 25% circa delle chiamate prende un 503** anche rispettando 1 richiesta al secondo
  (23 su ~100 tra le mie e quelle del subagent; l'IP del proxy è probabilmente condiviso). Con i ritentativi
  passano tutte, ma una canzone può richiedere da 1,3 a 15 s.
- **Fragilità**: `wbsearchentities` non tollera refusi (*chioran* non trova Cioran) e nemmeno accenti diversi
  (*de andrè* dà una fermata del tram; Fabrizio De André esce solo con *de andre* o *de andré*). Per i refusi
  serve il modello, non l'API.

## 1. I 30 casi

Esito: **A** = il primo risultato è giusto col testo grezzo; **B** = serve contesto; **C** = nessun ID.
⚠ = il primo risultato è sbagliato ma credibile.

| # | Come lo scrivo | Tipo | 1° risultato col testo grezzo | Risolto con | ID | Esito |
|---|---|---|---|---|---|---|
| 1 | galimberti | persona | il cognome, poi Francesco Galimberti (pittore) | "umberto galimberti", nome dal contesto (teatro, nichilismo) | [Q4003398](https://www.wikidata.org/wiki/Q4003398) | B |
| 2 | barbero | persona | il cognome, poi Jacopo de' Barbari | "alessandro barbero" (Napoleone, storia) | [Q960451](https://www.wikidata.org/wiki/Q960451) | B |
| 3 | chioran | persona | il cognome Chioran, un paese in Sabina | il modello corregge il refuso in *cioran* | [Q193405](https://www.wikidata.org/wiki/Q193405) | B |
| 4 | peterson | persona | il cognome, città in Iowa | "jordan peterson" (dalla "casa in ordine" del messaggio) | [Q6276882](https://www.wikidata.org/wiki/Q6276882) | B |
| 5 | hohenheim | personaggio | quartiere di Stoccarda | 2° risultato, con l'indizio FMA (omonimo: Paracelso) | [Q2559231](https://www.wikidata.org/wiki/Q2559231) | B |
| 6 | starec zosima | personaggio | Father Zosima, *I fratelli Karamazov* | — | [Q24935037](https://www.wikidata.org/wiki/Q24935037) | A |
| 7 | de andrè | persona | fermata del tram a Scandicci | accento corretto; su MusicBrainz invece *de andrè* va al primo colpo | [Q25106](https://www.wikidata.org/wiki/Q25106) | B |
| 8 | marco aurelio | persona | l'imperatore | — | [Q1430](https://www.wikidata.org/wiki/Q1430) | A |
| 9 | bukowski | persona | il cognome, una birra, un brano dei Modest Mouse | "charles bukowski" | [Q76409](https://www.wikidata.org/wiki/Q76409) | B |
| 10 | lo spettacolo sulle emozioni (Galimberti) | spettacolo | nessuno | esiste: *Il mondo delle emozioni*, su TicketOne, non in Wikidata | — | C |
| 11 | l'ospite inquietante | libro | nessuno su Wikidata | Open Library, ricerca per titolo | OL2811005W | C |
| 12 | aion (Jung, E03) | libro | il dio fenicio, l'album dei Dead Can Dance | testo pieno con autore Jung (`haswbstatement:P50=Q41532`) | [Q16385032](https://www.wikidata.org/wiki/Q16385032) | B |
| 13 | lo straniero | libro | *L'Étranger* di Camus (poi i film di Welles e Visconti) | — | [Q163297](https://www.wikidata.org/wiki/Q163297) | A |
| 14 | karamazov | libro | ⚠ il film del 1958 | 4° risultato, filtro "romanzo" | [Q183157](https://www.wikidata.org/wiki/Q183157) | B |
| 15 | il film svedese in b/n col cavaliere che gioca a scacchi con la morte | film | nessuno (la ricerca non legge descrizioni) | il modello lo riconosce: *Il settimo sigillo* | [Q217189](https://www.wikidata.org/wiki/Q217189) | B |
| 16 | true detective | serie | la serie del 2014 | — | [Q7847400](https://www.wikidata.org/wiki/Q7847400) | A |
| 17 | fma ultima puntata | anime | una ontologia di anatomia; ⚠ al 3° posto il manga | "fullmetal alchemist brotherhood"; quale versione va chiesta | [Q437808](https://www.wikidata.org/wiki/Q437808) | B |
| 18 | berserk l'eclissi, quella del film | film | nessuno; con "berserk", ⚠ il manga | titolo inglese: *The Golden Age Arc III – The Advent* | [Q52229064](https://www.wikidata.org/wiki/Q52229064) | B |
| 19 | caravaggio, la conversione di san paolo, santa maria del popolo | quadro | l'episodio degli Atti; ⚠ con filtro Caravaggio, la versione Odescalchi | "Santa Maria del Popolo" nel messaggio sceglie la versione Cerasi | [Q2273517](https://www.wikidata.org/wiki/Q2273517) | B |
| 20 | kintsugi | concetto | la pratica giapponese | — | [Q2740942](https://www.wikidata.org/wiki/Q2740942) | A |
| 21 | la nave di teseo | concetto | nessuno; a testo pieno, ⚠ la casa editrice | "paradosso della nave di Teseo" | [Q1050837](https://www.wikidata.org/wiki/Q1050837) | B |
| 22 | how to disappear completely | canzone | Wikidata: la canzone. MusicBrainz grezzo: 4 cover | MB con `artist:radiohead`, poi il work | [Q3141502](https://www.wikidata.org/wiki/Q3141502) · work f74f1b23 | A |
| 23 | private music dei deftones | album | MB: l'album del 2025 (su Wikidata da solo esce prima l'etichetta) | — | release-group 5e9a3ca5 · [Q135256676](https://www.wikidata.org/wiki/Q135256676) | A |
| 24 | hurt di johnny cash | canzone (cover) | Wikidata: il mirtillo. ⚠ poi il singolo dei Nine Inch Nails | testo pieno; MB: recording di Cash → work di Trent Reznor | [Q18235107](https://www.wikidata.org/wiki/Q18235107) · work ca56bd56 | B |
| 25 | mad world quella di donnie darko | canzone (cover) | ⚠ l'originale dei Tears for Fears; MB: versioni karaoke | 2° risultato Wikidata (Michael Andrews e Gary Jules) | [Q103714267](https://www.wikidata.org/wiki/Q103714267) · work 879ba403 | B |
| 26 | la cura di battiato | canzone | un episodio di *Heroes* | 4° risultato Wikidata; MB con `artist:battiato` | [Q3821984](https://www.wikidata.org/wiki/Q3821984) · work a8c16703 | B |
| 27 | sigur ros, l'album con le parentesi, la ottava | canzone | ⚠ MB: il *singolo* "( )" prima dell'album | release-group di tipo Album → release → traccia 8: *[Popplagið]* (3 chiamate) | release-group 950a650b | B |
| 28 | change dei deftones | canzone | ⚠ MB grezzo: la cover dei Seether | `recording:change AND artist:deftones` → *Change (In the House of Flies)* | work dde233bf | B |
| 29 | anthem di leonard cohen | canzone | Wikidata: "inno", un videogioco. MB: due cover | MB per campo (solo versioni live in testa); Wikidata ha la poesia, non la canzone | [Q141196418](https://www.wikidata.org/wiki/Q141196418) (poesia) | B |
| 30 | kid a | album | l'album del 2000, sia su Wikidata sia su MB | — | [Q220726](https://www.wikidata.org/wiki/Q220726) · release-group e75c0549 | A |

Che cosa dice la tabella, oltre ai numeri:

- **Il cognome da solo non va mai risolto da solo.** In 4 casi su 4 il primo risultato è il cognome o un omonimo
  (Francesco Galimberti è un pittore *credibile*). È il modello, leggendo il messaggio, a dire "Umberto".
- **Il tipo decide più del nome.** *Karamazov*, *Berserk*, *FMA*, *Lo straniero*: lo stesso titolo è romanzo, film,
  serie, manga. Dal messaggio il tipo quasi sempre si capisce ("finito", "ultima puntata", "quella del film").
- **Per una canzone servono due ID, non uno.** Il *work* di MusicBrainz è il brano (*Hurt* di Trent Reznor,
  *Mad World* di Roland Orzabal); la *recording* è la versione che mi ha colpito (Cash, Gary Jules). Ogni brano
  ha decine o centinaia di registrazioni (*Change* 38, *Karma Police* 281), quasi tutte dal vivo o rimasterizzate:
  la recording va salvata solo quando conta la versione.
- **Il titolo che scrivo è spesso sbagliato** (*change*, *l'ottava*, *quella con le parentesi*): MusicBrainz restituisce
  il titolo vero, ed è un regalo da mostrarmi.
- **I casi C non sono un fallimento.** Lo spettacolo esiste, ha un titolo e delle date: basta una nota con `link`
  a una pagina reale. La mancanza dell'ID è un'informazione, non un buco da riempire.

## 2. La procedura raccomandata

**Quando cercare.** Mai durante l'acquisizione dal telefono: lì la risposta deve arrivare in pochi secondi e
MusicBrainz può impiegarne 15. Si cerca nel **consolidamento**, quando un'entità diventa nota (persona, opera,
brano, album). Una citazione sciolta o un reel non diventano note, quindi non hanno ID.

**Con quali indizi**, in quest'ordine:

1. **Il modello normalizza prima di chiamare l'API.** Corregge il refuso (*chioran* → Cioran), espande il cognome
   dal contesto (*galimberti* + teatro → Umberto Galimberti), dà un nome alla descrizione (*il cavaliere e la morte*
   → *Il settimo sigillo*), sceglie il tipo e la lingua del titolo (*l'eclissi del film* → *The Golden Age Arc III*).
2. **Prima la ricerca per etichetta**, `wbsearchentities` in italiano, poi il filtro sul tipo atteso
   (dalla descrizione: "romanzo", "dipinto", "serie televisiva anime"…). Si scartano cognomi, disambiguazioni ed episodi.
3. **Se non trova nulla, la ricerca a testo pieno** con un vincolo: autore (`haswbstatement:P50=…`),
   creatore (`P170`), interprete (`P175`).
4. **Musica: MusicBrainz per campo**, sempre con l'artista: `recording:… AND artist:"…"`, poi il work collegato
   alla registrazione (`inc=work-rels`). Per un album: `releasegroup:"…"` di tipo *Album* (non *Single*).
5. **Il ponte**: da un QID, con SPARQL, si leggono gli ID di MusicBrainz (P434 artista, P436 album, P435 brano)
   e di Open Library (P648). Verificato: Kid A, *La cura*, *Private Music* e Cioran hanno già il ponte.

**Quando chiedere a me.** Solo se restano **due candidati dello stesso tipo** e il messaggio non sceglie
(FMA manga o anime; quale delle due *Conversione* se non avessi scritto la chiesa). Una domanda sola, a fine
consolidamento, mai al momento dell'invio: "*FMA* è *Brotherhood*?".

**Quando lasciare senza ID.** Quando non c'è nessun candidato (spettacoli, reel, persone minori, persone della mia
vita), quando il nome viene solo da un cognome che il contesto non sa espandere, quando l'unico risultato è
di un altro tipo. Si scrive `wikidata: no` con la data della prova, per non ripeterla a ogni consolidamento.
**Un ID sbagliato è peggio di nessun ID**: fonde due cose diverse e non si vede.

**Chi decide.** Lo script propone i candidati; il modello sceglie e scrive l'ID; l'ID entra come proposta
(`validata: false` come il resto della nota). Nessuna scelta automatica senza un controllo.

## 3. Quali campi salvare

**Da salvare nel frontmatter** (pochi, stabili, costosi da ritrovare):

| Campo | Su | Perché |
|---|---|---|
| `wikidata` (QID, oppure `no` con la data) | persone, opere, film, serie, quadri, concetti | l'ancora contro i doppioni; dà gratis alias e ponti |
| `musicbrainz` (work MBID) | canzoni | il brano, comune a originale e cover |
| `registrazione` (recording MBID) | canzoni, solo se conta la versione | Cash e non Nine Inch Nails, Gary Jules e non Tears for Fears |
| `musicbrainz` (release-group MBID) | album | l'album astratto, non una sua edizione |
| `musicbrainz` (artist MBID) | artisti | serve ai generi |
| `openlibrary` (work) | libri senza QID | l'unico ID per *L'ospite inquietante* |
| `titolo-vero` | quando il mio titolo è sbagliato | *Change (In the House of Flies)*, *[Popplagið]* |
| `anno` | opere | già nello schema attuale; serve a ordinare, ed è utile vederlo |

**Da calcolare al bisogno** (cambiano, o si ricavano in un secondo dall'ID): generi, alias in altre lingue,
ID di Discogs, TMDB e AniList, durata, tracce di un album, opere di un autore (una query SPARQL: le opere di Jung
con l'anno escono in 260 ms), relazioni tra artisti. Se servono spesso, si tengono in una **cache** fuori dalle note
(un file JSON rigenerabile), non nel frontmatter.

## 4. I generi musicali: MusicBrainz basta?

Prova su 10 artisti (subagent, 58 richieste). Il primo risultato era giusto in 10 casi su 10.

| Artista | Generi con più voti |
|---|---|
| Radiohead | alternative rock 43, art rock 30, rock 19, electronic 14, experimental rock 14 |
| Deftones | alternative metal 27, nu metal 19, alternative rock 7, metal 6, shoegaze 2 |
| Sigur Rós | post-rock 28, ambient 9, dream pop 9, art pop 8, ambient pop 7 |
| Cocteau Twins | dream pop 18, ethereal wave 10, shoegaze 9, post-punk 8, gothic rock 6 |
| Massive Attack | trip hop 23, electronic 18, downtempo 12, ambient 7, dub 6 |
| Johnny Cash | country 27, rockabilly 9, folk 7, country gospel 6, americana 5 |
| Franco Battiato | progressive rock 4, new wave 3, experimental rock 2, pop 2, singer-songwriter 2 |
| Fabrizio De André | singer-songwriter 3, folk 2, folk rock 1 (tag libero "cantautore" 5) |
| Chelsea Wolfe | singer-songwriter 4, alternative rock 2, gothic rock 2, dark wave 1 |
| Slowdive | shoegaze 26, dream pop 21, ambient pop 9, noise pop 6, post-rock 5 |

- **Per gli artisti sì, per le canzoni no.** I generi sono affidabili sull'artista e un po' meno sull'album
  (*White Pony*: alternative metal 10; *Kid A*: electronic 14, art rock 11). Sulla singola canzone ci sono pochi voti
  (*Change*: alternative metal 6), sparsi su decine di registrazioni.
- **"Canzoni di questo genere"** quindi si fa per via indiretta: dai generi degli artisti che amo agli artisti vicini,
  poi alle loro canzoni, filtrando con le *mie* note (pancia, temi). La ricerca per genere da sola fa rumore:
  `artist?query=tag:shoegaze` mette in testa Smashing Pumpkins, Oasis e Blur, prima di Slowdive. I risultati vanno
  riordinati in base ai voti del genere.
- **Il vocabolario regge**: ethereal wave, dream pop, nu metal, alternative metal, shoegaze, trip hop e post-rock sono
  tutti generi curati (l'elenco completo, 2.220 voci, si scarica con `genre/all?fmt=txt`). Manca "cantautorato";
  c'è "canzone d'autore", ma De André non ha voti lì. **Gli italiani sono coperti male** (1-5 voti): per loro
  il genere lo scrivo io, e quello di MusicBrainz serve solo come alias.
- **Non salvare i generi nelle note**: si calcolano dall'MBID dell'artista e si tengono in cache.

## 5. Abbozzo di `risolvi.mjs`

Provato il 2026-10-31 sui casi più difficili della tabella. Funziona: Cioran, Van Hohenheim (con l'indizio),
I fratelli Karamazov, la *Conversione* Cerasi, Aion, *Change*, *Hurt* (work di Reznor e recording di Cash),
*Mad World*, *La cura*, l'album "( )". Si ferma, come deve, su *galimberti* senza nome e sullo spettacolo.
Non è un file del repository: è un abbozzo, da copiare se il disegno viene approvato.

```js
// risolvi.mjs: propone ID esterni per un'entità citata in un messaggio. Non scrive nulla: restituisce candidati.
// Uso: node risolvi.mjs <tipo> "<nome come lo scrive l'utente>" ["indizio"]
//   tipo: persona | opera | film | serie | anime | gioco | quadro | concetto | canzone | album | artista
const UA = 'atlante/0.1 ( indirizzo-di-contatto )';
const WD = 'https://www.wikidata.org/w/api.php';
const MB = 'https://musicbrainz.org/ws/2';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ultimaMB = 0;

async function get(url, { mb = false, tentativi = 4 } = {}) {
  for (let i = 0; i < tentativi; i++) {
    if (mb) { const d = 1100 - (Date.now() - ultimaMB); if (d > 0) await sleep(d); ultimaMB = Date.now(); }
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (r.ok) return r.json();
    if (r.status !== 503 && r.status !== 429) throw new Error(`${r.status} ${url}`);
    await sleep(2000 * 2 ** i); // 503/429: limite di richieste, ritenta con attesa crescente
  }
  throw new Error(`troppi 503: ${url}`);
}

// Wikidata, ricerca per etichetta e alias (veloce, non tollera refusi)
async function wdCerca(testo) {
  const j = await get(`${WD}?action=wbsearchentities&format=json&language=it&uselang=it&type=item&limit=7&search=${encodeURIComponent(testo)}`);
  return j.search.map((h) => ({ id: h.id, nome: h.label, descr: h.description || '' }));
}
// Wikidata, ricerca a testo pieno con filtri (es. haswbstatement:P50=Q41532 = autore Jung)
async function wdTesto(q) {
  const j = await get(`${WD}?action=query&list=search&format=json&srlimit=5&srsearch=${encodeURIComponent(q)}`);
  const ids = j.query.search.map((s) => s.title);
  if (!ids.length) return [];
  const e = await get(`${WD}?action=wbgetentities&format=json&props=labels|descriptions&languages=it|en&ids=${ids.join('|')}`);
  return ids.map((id) => { const x = e.entities[id]; return { id, nome: x.labels?.it?.value || x.labels?.en?.value, descr: x.descriptions?.it?.value || x.descriptions?.en?.value || '' }; });
}

// Parole della descrizione Wikidata che ci aspettiamo per ogni tipo (filtro grezzo, poi decide il modello)
const ATTESO = {
  persona: /personaggio|filosof|scrittor|poet|psicolog|storic|cantautor|music|cantant|attor|regist|pittor|imperator|mistic|saggist|\(\d{4}/i,
  opera: /romanzo|libro|saggio|trattato|poesia|poem|novel|book/i, film: /film/i, serie: /serie/i, anime: /anime|film|serie/i,
  gioco: /videogioco|video game/i, quadro: /dipinto|painting/i, concetto: /pratica|concetto|paradosso|questione|concept/i,
};
const scarta = /cognome|prenome|disambiguazione|category|categoria|template|episodio|centro abitato|comune|city|quarter/i;

async function wikidata(tipo, testo, indizio) {
  let c = (await wdCerca(testo)).filter((h) => !scarta.test(h.descr));
  if (indizio) c.sort((a, b) => (b.descr + b.nome).toLowerCase().includes(indizio.toLowerCase()) - (a.descr + a.nome).toLowerCase().includes(indizio.toLowerCase()));
  let ok = c.filter((h) => !ATTESO[tipo] || ATTESO[tipo].test(h.descr));
  if (!ok.length) ok = await wdTesto(indizio ? `${testo} ${indizio}` : testo); // secondo tentativo: testo pieno
  return ok.slice(0, 3);
}

// MusicBrainz: ricerca per campo. Per una canzone l'ancora è il work (il brano), non la registrazione.
async function musicbrainz(tipo, titolo, artista) {
  const a = artista ? ` AND artist:"${artista}"` : '';
  if (tipo === 'artista') {
    const j = await get(`${MB}/artist?fmt=json&limit=3&query=${encodeURIComponent(`artist:"${titolo}"`)}`, { mb: true });
    return j.artists.map((x) => ({ id: x.id, nome: x.name, descr: x.disambiguation || x.country || '' }));
  }
  if (tipo === 'album') {
    const j = await get(`${MB}/release-group?fmt=json&limit=5&query=${encodeURIComponent(`releasegroup:"${titolo}"${a}`)}`, { mb: true });
    return j['release-groups'].sort((x, y) => (y['primary-type'] === 'Album') - (x['primary-type'] === 'Album'))
      .map((x) => ({ id: x.id, nome: x.title, descr: `${x['primary-type']} ${x['first-release-date'] || ''} ${x['artist-credit'][0].name}` })).slice(0, 3);
  }
  // canzone: registrazioni dell'artista (danno il titolo vero), poi il work collegato (il brano, valido anche per le cover)
  const r = await get(`${MB}/recording?fmt=json&limit=15&query=${encodeURIComponent(`recording:${titolo}${a}`)}`, { mb: true });
  const giuste = r.recordings.filter((x) => !artista || x['artist-credit'].some((c) => c.name.toLowerCase().includes(artista.toLowerCase())))
    .filter((x) => !/live|remix|demo|instrumental/i.test(x.disambiguation || ''))
    .sort((x, y) => x.title.toLowerCase().startsWith(titolo.toLowerCase()) ? -1 : y.title.toLowerCase().startsWith(titolo.toLowerCase()) ? 1 : 0);
  for (const g of giuste.slice(0, 3)) { // non tutte le registrazioni sono legate al work: ne provo fino a tre
    const rec = await get(`${MB}/recording/${g.id}?fmt=json&inc=work-rels`, { mb: true }); // "change" → "Change (In the House of Flies)"
    const works = (rec.relations || []).filter((z) => z.work).map((z) => ({ id: z.work.id, nome: z.work.title, descr: 'work (il brano)' }));
    if (works.length) return works.concat({ id: rec.id, nome: rec.title, descr: `recording di ${g['artist-credit'][0].name}` });
  }
  const w = await get(`${MB}/work?fmt=json&limit=2&query=${encodeURIComponent(`work:"${titolo}"${a}`)}`, { mb: true }); // ultimo tentativo
  return w.works.filter((x) => x.score > 90).map((x) => ({ id: x.id, nome: x.title, descr: 'work (il brano)' }))
    .concat(giuste.slice(0, 1).map((g) => ({ id: g.id, nome: g.title, descr: `recording di ${g['artist-credit'][0].name}` })));
}

// Ponte: da un QID agli ID esterni già noti a Wikidata (MusicBrainz artista/album/brano, Open Library)
async function ponte(qid) {
  const q = `SELECT ?p ?v WHERE { VALUES ?p {wdt:P434 wdt:P436 wdt:P435 wdt:P648} wd:${qid} ?p ?v }`;
  const j = await get(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(q)}`);
  return Object.fromEntries(j.results.bindings.map((b) => [b.p.value.split('/').pop(), b.v.value]));
}

const [tipo, testo, indizio] = process.argv.slice(2);
if (!testo) { console.error('uso: node risolvi.mjs <tipo> "<testo>" ["indizio"]'); process.exit(1); }
const musica = ['canzone', 'album', 'artista'].includes(tipo);
const candidati = musica ? await musicbrainz(tipo, testo, indizio) : await wikidata(tipo, testo, indizio);
if (!musica && candidati[0]) candidati[0].ponte = await ponte(candidati[0].id);
const n = candidati.filter((c) => !c.descr.startsWith('recording')).length;
const soloCognome = tipo === 'persona' && !testo.trim().includes(' ');
const esito = soloCognome ? 'solo cognome: espandere il nome dal contesto e rilanciare' : n === 0 ? 'nessuno: lasciare senza ID' : n === 1 ? 'uno: proporre' : 'più di uno: decide il contesto o si chiede';
console.log(JSON.stringify({ tipo, testo, indizio, esito, candidati }, null, 2));
```

Limiti noti dell'abbozzo: il filtro sul tipo legge la descrizione italiana, che a volte manca (molte voci hanno
solo quella inglese); con un indizio sbagliato, la ricerca a testo pieno restituisce rumore (articoli scientifici);
non c'è la cache, che in uso vero è obbligatoria per MusicBrainz.

## 6. Per la v2, in una riga

Gli ID esterni valgono la pena, ma come **attributo proposto nel consolidamento**, scelto dal modello sui candidati
di uno script e mai in automatico: nei casi difficili il primo risultato è giusto solo una volta su quattro, e in
quasi un caso su tre (9 su 30) è sbagliato ma credibile.
