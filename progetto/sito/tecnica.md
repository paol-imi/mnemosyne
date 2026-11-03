# Il sito: i vincoli tecnici e la privacy

Consegna della sessione "tecnica e privacy" (H, `progetto/v2/coordinamento.md`). Ricerca con raccomandazione: nessun account,
nessun deploy, nessun contenuto del repo uscito. Fonti consultate il 3 novembre 2026; le versioni dei pacchetti vengono dal
registro npm dello stesso giorno. ⚠ = non confermato da una fonte ufficiale, da provare.

## 0. La raccomandazione in dieci righe

1. **Un'app di una pagina (Vite 8 + Preact 11)** che legge **un archivio cifrato** (`archivio.bin`, AES-GCM). Lo
   calcola al build uno script Node che rilegge il repo con le stesse funzioni di `scripts/contesto.mjs`.
2. **La build gira in GitHub Actions** a ogni push su `main` che tocca gli strati. Il deploy va con `wrangler` su
   **Cloudflare Workers static assets**, senza l'integrazione Git: Cloudflare non vede mai il repo.
3. **Davanti c'è Cloudflare Access** (Zero Trust Free, gratis fino a 50 utenti), con l'elenco degli indirizzi ammessi.
   Dietro c'è una **passphrase** che apre la chiave sul telefono, una volta per dispositivo.
4. **Due serrature indipendenti.** Il rischio principale che la documentazione segnala è un hostname lasciato senza
   Access. Qui al più espone byte cifrati.
5. **Ricerca con MiniSearch.** L'indice è precalcolato e sta dentro l'archivio cifrato, perché Pagefind scriverebbe in
   chiaro sull'host. Funziona offline con un service worker; le immagini sono WebP, cifrate anch'esse.
6. **I delicati stanno in un secondo archivio**, `delicati.bin`. Non si scarica né si decifra se non lo chiedi.
7. **Il sito non scrive mai.** Un gesto (accogliere la voce 3) apre il Comando rapido "Memo" con il testo già scritto,
   che puoi modificare: passa dall'ingresso come ogni memo.
8. **Costo:** 0 € al mese. Cloudflare chiede di registrare una carta anche per il piano Free, senza addebiti.
9. **Lavoro:** circa **11 giorni**, esclusa la progettazione visiva (§8).

---

## 1. L'hosting privato

### 1.1 Il confronto

| opzione | come entra il login | costo | dove finiscono i dati | aggiornamento a ogni push | rischio di esporre |
|---|---|---|---|---|---|
| **GitHub Pages** | solo con "private Pages", che vuole un'**organizzazione su Enterprise Cloud** ([visibilità](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site), [piani](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)) | 21 $/utente/mese ([pricing](https://github.com/pricing)) | GitHub, dove il repo sta già | Actions, nativo | senza Enterprise il sito è **pubblico** anche da repo privato: "publicly available on the internet, even if the repository for the site is private" ([doc](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)). **Escluso** (decisione del coordinatore: mai Pages pubblico) |
| **Cloudflare Workers/Pages + Access** | Access all'edge, prima di servire il file: OTP per email, GitHub, OIDC/SAML ([IdP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/), [OTP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/)); sessione fino a un mese ([sessioni](https://developers.cloudflare.com/cloudflare-one/identity/users/session-management/)) | 0 € fino a 50 utenti, carta obbligatoria senza addebito ([piani](https://www.cloudflare.com/plans/sase-zero-trust/), [setup](https://developers.cloudflare.com/cloudflare-one/setup/)); asset statici "free and unlimited" ([billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)) | edge globale Cloudflare; log di Access (email, IP, paese, esito) conservati 24 ore sul Free ([log](https://developers.cloudflare.com/cloudflare-one/insights/logs/audit-logs/)) | Workers Builds (3.000 min/mese, [limiti](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/)) oppure Actions + `wrangler` ([direct upload](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)) | gli **hostname secondari**: i preview URL dei Workers sono pubblici per default ([previews](https://developers.cloudflare.com/workers/configuration/previews/)); `workers.dev` spento dalla dashboard torna acceso al deploy successivo, a meno di `workers_dev = false` ([routing](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)); su Pages, `*.pages.dev` vuole un'applicazione Access sua ([known issues](https://developers.cloudflare.com/pages/platform/known-issues/)) |
| **Vercel Hobby** | "Vercel Authentication" su tutti i piani; con lo scope **All Deployments** copre anche la produzione ([doc](https://vercel.com/docs/deployment-protection), [changelog](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)) | 0 €; password solo su Pro, 20 $/mese per progetto ([password](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection)) | soprattutto AWS, USA per default ([compliance](https://vercel.com/docs/security/compliance#where-does-my-data-live)) | push su `main` → produzione; 100 deploy al giorno ([git](https://vercel.com/docs/git#production-branch), [hobby](https://vercel.com/docs/plans/hobby)) | lo scope predefinito ("Standard") **lascia pubblica la produzione**; un URL di anteprima per ogni ramo; Hobby ammette **un solo utente esterno** ([auth](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)); niente repo privati di organizzazione ([git](https://vercel.com/docs/git#using-hobby-teams)) |
| **Netlify Free** | password e basic auth solo su Pro ([password](https://docs.netlify.com/manage/security/secure-access-to-sites/password-protection/), [basic auth](https://docs.netlify.com/manage/security/secure-access-to-sites/basic-authentication-with-custom-http-headers/)); un progetto "Private" lo vede solo il proprietario ([visibilità](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/)) | 300 crediti al mese, 15 per ogni deploy di produzione ([crediti](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)) | AWS/GCP USA ([trust](https://www.netlify.com/trust-center/)) | a ogni push | circa 20 push al mese esauriscono i crediti e allora "all of your web projects are paused" ([doc](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)). **Escluso**: smista spinge più volte al giorno |
| **PWA "solo locale"** | non esiste da sola: va servita da un host; la PWA è il modo di **funzionare offline** sopra una delle righe precedenti | — | cache dell'iPhone; ITP cancella lo storage dopo 7 giorni senza uso, ma le web app sulla Home hanno un contatore loro ([WebKit](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)); quote da iOS 17 ([WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)) | — | il service worker può **nascondere il redirect al login** di Access quando il cookie scade ([caso](https://discourse.nodered.org/t/dashboard-2-0-pwa-service-worker-prevents-authentication-redirect-when-session-expires/100574)); il rimedio è nel §4.4 |
| **Obsidian + Working Copy** | token GitHub dentro Working Copy, più lo sblocco del telefono | Working Copy Pro 35,99 $ una tantum, serve per collegare le cartelle ([App Store](https://apps.apple.com/app/id896694807), [manuale](https://workingcopy.app/manual/)) | solo sull'iPhone | pull a mano o da un Comando rapido | il più basso. Ma non c'è nessuna **vista calcolata**: niente porte, niente ●, niente sbiadito. Le proprietà annidate (`legami`, `voci`) "not currently supported", si vedono solo come YAML grezzo ([Properties](https://obsidian.md/help/properties)); Obsidian Git su mobile è "very unstable" ([README](https://github.com/Vinzent03/obsidian-git)). Resta come **ripiego di lettura grezza** |
| **Artifact privati di claude.ai** | account Claude | incluso nell'abbonamento | server Anthropic | serve una sessione Claude a ogni push per ripubblicare | condivisione per link ([support](https://support.claude.com/en/articles/9547008-share-artifacts.md)). Non sono uno specchio del repo: al più una vista singola (un ritratto). E le regole del progetto vietano gli artifact con contenuto personale. **Escluso** |
| **App iOS leggera** | Face ID e token | 99 $/anno; ogni build TestFlight scade dopo 90 giorni ([membership](https://developer.apple.com/support/compare-memberships), [TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)); senza abbonamento, la firma scade ogni 7 giorni | sull'iPhone | sync da costruire | basso, ma è il lavoro di un'app intera per una persona sola. **Rinviata**: la PWA dà quasi tutto senza App Store |
| **Tailscale + server di casa** | la VPN: `tailscale serve` resta dentro la tailnet ([serve](https://tailscale.com/kb/1312/serve)) | 0 € per il Personal, fino a 6 utenti ([pricing](https://tailscale.com/pricing)) | a casa | il server fa `git pull` | basso, ma il server deve restare acceso e la VPN accesa per leggere. **Ripiego** se un giorno non si vorrà nessun host terzo |

### 1.2 La scelta: Cloudflare Workers static assets + Access, con l'archivio cifrato

- **Perché Workers e non Pages.** Cloudflare consiglia "Start new projects with Workers"
  ([Pages](https://developers.cloudflare.com/pages/)). Su Workers, Access protegge produzione e anteprime, e le anteprime si
  spengono dalla configurazione stessa (`preview_urls = false`, `workers_dev` sotto controllo).
- **Perché il deploy diretto e non l'integrazione Git.** La GitHub App di Cloudflare non viene installata sul repo, e
  Cloudflare riceve solo l'output già cifrato.
- **La regola che la scelta fa rispettare** (§10 del modello): le persone `cerchia: vita` e i lutti non escono dal repo in
  chiaro. L'host conserva `archivio.bin`, `delicati.bin`, le immagini cifrate e il guscio dell'app. Il guscio non contiene
  nemmeno un nome.
- **Se Access fosse configurato male**, un estraneo scaricherebbe byte che non si aprono senza la passphrase.
- **Perché non Vercel.** Il suo login va bene per una persona sola ed è l'alternativa onesta. Però lo scope predefinito
  lascia pubblica la produzione, Hobby si ferma a un utente esterno e il fornitore è uno in più. Con l'archivio cifrato
  la scelta dell'host conta poco; Cloudflare vince per gli ospiti (50) e per le anteprime governabili.
- **Il login, concretamente.**
  - Un'applicazione Access sul solo hostname `*.workers.dev` del Worker (oppure su un dominio proprio, se l'utente lo
    vorrà; non serve).
  - Una policy "Allow" con l'elenco delle email; mai "Bypass", che toglie i controlli e non registra niente
    ([policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)).
  - Sessione di un mese.
  - IdP: l'OTP per email, oppure GitHub. ⚠ Dal 19 maggio 2026 i nuovi account partono con l'IdP "Cloudflare"
    ([changelog](https://developers.cloudflare.com/changelog/post/2026-05-19-cloudflare-as-identity-provider/)): verificare
    al montaggio che l'OTP si possa ancora aggiungere.
  - ⚠ Le passkey dirette non sono documentate: arrivano solo da un IdP che le supporta.
- **La passphrase.**
  - Da lei si deriva la chiave con PBKDF2-SHA256: almeno 600.000 iterazioni
    ([OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)), WebCrypto `deriveKey`
    ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey)).
  - La chiave si salva in IndexedDB come `CryptoKey` **non estraibile**, e la si chiede una volta per dispositivo.
  - Al build la stessa passphrase arriva come secret di Actions (`ARCHIVIO_PASSPHRASE`). È l'unica credenziale nuova
    del progetto, oltre al token di deploy.
  - Il token di deploy si limita al permesso Workers Scripts Edit sull'account.

### 1.3 L'aggiornamento a ogni push

`.github/workflows/sito.yml`, da aggiungere dopo la porta del blocco 6:

```yaml
on:
  push:
    branches: [main]
    paths: [frammenti/**, letture/**, persone/**, opere/**, citazioni/**, temi/**, raccolte/**, restituzioni/**, contesto/**, sito/**]
concurrency: { group: sito, cancel-in-progress: true }   # una raffica di push = una build
jobs:
  build:
    runs-on: ubuntu-latest
    permissions: { contents: read }                        # il job non può scrivere nel repo
    steps:
      - uses: actions/checkout@v5
      - run: bash ambiente/setup.sh && npm --prefix sito ci
      - run: node sito/costruisci.mjs                      # calcola, cifra, scrive sito/dist (mai nel repo)
        env: { ARCHIVIO_PASSPHRASE: ${{ secrets.ARCHIVIO_PASSPHRASE }} }
      - uses: cloudflare/wrangler-action@v4
        with: { apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}, accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}, command: deploy --config sito/wrangler.toml }
```

- **Il filtro sui percorsi:** il PUT in `ingresso/` dal telefono non fa partire la build. La fa partire il commit di
  smista che sposta il memo in `frammenti/`.
- **La spesa in Actions:**
  - i repo privati sul Free hanno 12 $ di credito al mese, circa 2.000 minuti Linux
    ([billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)); la conversione in minuti è un
    calcolo;
  - stima: 15 push al giorno per 1,5 minuti fanno circa 700 minuti al mese, e la `concurrency` li riduce;
  - ⚠ va misurato sul primo mese.
- **Chi può far partire la build.** I push dei token GitHub App e dei PAT fanno partire i workflow; quelli del
  `GITHUB_TOKEN` no. Il job non fa mai push.
- **Il `wrangler.toml`:**
  - `workers_dev = true` e `preview_urls = false`;
  - `assets = { directory = "dist", not_found_handling = "single-page-application" }`
    ([SPA](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/));
  - nessun codice Worker: solo asset.

## 2. Il generatore

| | VitePress 1.6.4 | Astro 7.4.5 | Eleventy 3.1.8 | **SPA Vite 8 + Preact 11 su JSON** |
|---|---|---|---|---|
| stato | la v2 è ancora alpha ([release](https://github.com/vuejs/vitepress/releases)) | 7.0 del giugno 2026 ([blog](https://astro.build/blog/astro-7/)) | nome in transizione, "Build Awesome" ([blog](https://www.11ty.dev/blog/build-awesome/)) | Vite 8.3.5, Preact 11.1.1 (npm) |
| pagine da dati | `paths()`; i dati importati finiscono nel bundle ([data loading](https://vitepress.dev/guide/data-loading)) | `getStaticPaths()` + `reference()` ([collections](https://docs.astro.build/en/guides/content-collections/)) | `pagination` ([doc](https://www.11ty.dev/docs/pages-from-data/)) | le viste si calcolano in Node e si rendono sul client |
| JS spedito | SPA Vue idratata | zero di default ([islands](https://docs.astro.build/en/concepts/islands/)) | zero | ~15–40 KB gz ⚠ da misurare |
| immagini | niente pipeline integrata | sharp, `<Picture>` ([images](https://docs.astro.build/en/guides/images/)) | eleventy-img ([doc](https://www.11ty.dev/docs/plugins/image/)) | sharp direttamente nello script di build |
| offline | `@vite-pwa/vitepress` | `@vite-pwa/astro` ([vite-pwa](https://vite-pwa-org.netlify.app/frameworks/)) | a mano | `vite-plugin-pwa` 2.0.0 |
| **cifratura di tutto** | no | no: ogni pagina sarebbe HTML in chiaro sull'host | no | **sì: un blob** |

**La scelta è la SPA, e la ragione è una sola: la cifratura.**

- **Senza cifratura vincerebbe Astro.** Ha zero JS, HTML per ogni nodo e un'integrazione naturale con Pagefind; è il
  ripiego se la sintesi deciderà che Access basta (§7).
- **Con la cifratura, generare HTML statico non serve più:**
  - le pagine dovrebbero essere cifrate una per una (alla StatiCrypt), e l'indice Pagefind, che è in chiaro
    ([indexing](https://pagefind.app/docs/indexing/)), le scoprirebbe;
  - un archivio unico invece si decifra una volta in ~ms (WebCrypto è nativo) e poi tutte le viste sono istantanee,
    offline comprese.
- **Le dimensioni lo permettono.**
  - Oggi `frammenti/` pesa 156 KB, e tutti gli strati sono 195 file.
  - A 5.000 frammenti con letture e nodi si stimano 5–10 MB di JSON, 1–3 MB compressi ⚠.
  - Oltre si spezza per anno: `archivio-2026.bin`.

### 2.1 Che cosa calcola il build (`sito/costruisci.mjs`)

Lo script legge, non scrive: importa `carica()` e `parlante()` da `scripts/contesto.mjs` e non rifà le regole a mano.
Per tutto ciò che `contesto.mjs` calcola già, serve che la sessione di implementazione **esporti funzioni pure**
(richiesta per dopo il blocco 6, §7):

- **i segni:** la voce di ogni legame, con il ● calcolato dai `ritorna-su … accoglie` (oggi è dentro `contesto.mjs`, alla
  riga 132);
- **gli stati:** `rifiutato` e `sbiadito` (30 giorni attivi), con gli Scarti;
- **i giorni attivi e il periodo delicato;**
- **i ricordabili e la coda lunga.**

Le viste del §6.3, calcolate al build come dati (il modello dice "si calcolano al momento della domanda e non si
salvano": qui non si salvano nel repo, vivono solo nel blob):

| vista | dati |
|---|---|
| **pagina di nodo** | 3–5 porte (i frammenti ✦ più forti, con la data), poi le convergenze, poi il resto per modalità (`nomina`, `parla-di`, `serve-a`…), gli sbiaditi in fondo, una voce della coda lunga; per le citazioni, `esito` o ⚠ sempre visibile |
| **linea del tempo** | per mese: le Posizioni di `mappa.md` (frase, dal, messa in discussione il), i conti ✦, le date di cambio di lettore (il campo `prompt` delle letture cambia) |
| **assenze** | al più tre, con i numeri ✦ presi da `mappa.md` (copiati, mai ricalcolati a occhio) |
| **frammento** | il corpo alla lettera, la lettura con i segni, le risposte, i `ritorna-su` in entrata |
| **restituzione** | la prosa com'è, le voci numerate con lo stato (●, rifiutata) |
| **"le mie frasi"** | la stessa ricetta di `CLAUDE.md` (✧ a parte, note "trascritta da Claude" una volta per gruppo) |

**I controlli del build**, che falliscono la build come `verifica.mjs` fallisce un push:

- nessun ○ senza `riferimento`: la riga non si rende;
- nessun ● letto da un file;
- nessun delicato nell'archivio principale (§5);
- nessun nome `cerchia: vita` nel guscio, nei titoli o nei nomi dei file serviti;
- un test `node --test` su dati sintetici, sul modello di `test/`.

## 3. Il sito resta un lettore

- Il sito **non ha nessuna credenziale di scrittura**. Il build ha `contents: read`, e l'output va solo a Cloudflare,
  mai nel repo.
- Un **gesto** (accogliere la voce 3, rifiutarla, «salvami questa», correggere un autore) diventa un memo, cioè ciò che
  l'utente avrebbe scritto a mano.
  - Il bottone apre il Comando rapido esistente con lo schema URL di Comandi Rapidi
    ([Apple](https://support.apple.com/guide/shortcuts/run-a-shortcut-from-a-url-apd624386f42/ios)), con il testo già
    scritto:
    `shortcuts://run-shortcut?name=Memo&input=text&text=s%C3%AC%20alla%203%20%E2%86%92%20r-20261108-0900-lettera%233`
  - Il Comando rapido mostra il testo, che l'utente può modificare, e lo manda. Da lì il percorso è quello di sempre:
    PUT in `ingresso/` (§7.1), il `fire` di smista, la lettura con il `ritorna-su` (`come: accoglie`, `n: 3`), il ●
    calcolato al build successivo.
  - Il PAT resta nel Comando rapido, dov'è già.
- **Il bersaglio esplicito.** La regola dei "3 giorni di calendario" per i riferimenti non basta più quando il gesto
  parte da una restituzione vecchia. Il testo porta quindi l'id esplicito (`→ r-…#3`).
  - Dubbio per la sessione di implementazione: un campo di frontmatter (per esempio `da-sito: r-…#3`) sarebbe più pulito
    di un id dentro le parole, che sono sacre. Lo decide il modello, non il sito.
- **Senza iPhone** (Android con HTTP Shortcuts, `telefono/http-shortcuts.json`): lo stesso testo va negli appunti, con
  "Incolla nel Memo".
- **Rifiutato:** un Worker con il PAT tra i secret che fa il PUT per conto del sito. Funzionerebbe, ma mette una
  credenziale di scrittura dietro un'app web.

## 4. Le altre esigenze

### 4.1 La ricerca

- **MiniSearch 7.2.0** ([repo](https://github.com/lucaong/minisearch), [API `loadJSON`](https://lucaong.github.io/minisearch/classes/MiniSearch.MiniSearch.html)). L'indice si costruisce al build, si serializza
  con `toJSON()` dentro il blob cifrato e si ricarica con `loadJSON()`: sul telefono non si indicizza niente.
- **La normalizzazione.** Minuscole e accenti piegati (`perché` = `perche`); ricerca per prefisso e un poco fuzzy, che
  copre i refusi tenuti "refusi compresi".
- **L'espansione.** Le 6–10 parole d'espansione della ricetta "Cercare nei file" sono un lavoro di Specchio, non del
  sito. Il sito cerca alla lettera e dice "ricerca a parole".
- **I campi indicizzati:** il corpo dei frammenti, i nomi e gli alias dei nodi, la prosa delle restituzioni. Il filtro
  per genere e per segno va fatto con `filter`.
- **Pagefind 1.6.0** (stemming italiano, [multilingual](https://pagefind.app/docs/multilingual/)) resta il motore del
  ripiego Astro: è migliore come motore, ma scrive l'indice in chiaro.

### 4.2 Le immagini

- Le foto degli `allegati` (`.webp|.jpg|.png|.heic`) passano da **sharp 0.35.5**: WebP a 1600 px e una miniatura a 480 px.
  Si cifrano e si servono con un nome hash, che non rivela l'id.
- Si decifrano in un `Blob` URL solo quando entrano nello schermo (`loading=lazy` più un IntersectionObserver).
- ⚠ HEIC: i binari precompilati di sharp di solito non decodificano HEVC. Conviene che sia `smista` a ridurre le foto a
  WebP prima che entrino in `frammenti/` (lo fa già, "riduce le foto": verificare che converta anche l'HEIC).
- Vocali `.m4a`: cifrati e decifrati a richiesta; Safari li suona nativamente.
- Nessuna immagine di terzi: i link a YouTube e Spotify restano link, senza anteprime né oEmbed nel sito.

### 4.3 Le prestazioni (budget, da misurare sul telefono vero)

| misura | budget |
|---|---|
| guscio (HTML+JS+CSS, gz) | ≤ 60 KB |
| `archivio.bin` oggi | < 300 KB; a 5.000 frammenti ≤ 3 MB, poi si spezza per anno |
| prima apertura (scarico + PBKDF2 + decifra + `JSON.parse`) | ≤ 1,5 s su 4G; le aperture successive dalla cache ≤ 300 ms ⚠ |
| cambio di vista | < 50 ms: tutto è già in memoria |

- Il guscio non usa font esterni (font di sistema o uno solo, self-hosted) né librerie di grafi pesanti.
- Una mappa dei legami, se la sintesi la vorrà, si disegna in SVG su un sottoinsieme, mai sull'archivio intero.

### 4.4 Offline

- **Il service worker** (`vite-pwa-plugin` 2.0.0, modalità `injectManifest`) mette in precache il guscio e i blob, e
  aggiorna i blob quando `versione.json` (hash del build) cambia.
- **Il routing con l'hash** (`#/nodo/umberto-galimberti`):
  - l'unica navigazione verso il server è `/`;
  - il percorso letto non arriva mai a Cloudflare, quindi non finisce nei log;
  - offline basta `index.html`.
- **Il login scaduto** (il problema noto del service worker che nasconde il redirect di Access):
  - la navigazione verso `/` è *network-first* con 3 s di timeout, e un redirect verso `*.cloudflareaccess.com` non si
    mette in cache e non si intercetta: arriva la pagina di login;
  - i dati si chiedono con `redirect: 'manual'`. Una risposta `opaqueredirect` vuol dire "sessione scaduta": l'app resta
    sulla copia in cache e mostra una riga ("Accesso scaduto. Rientra"), che ricarica la pagina fuori dal service worker.
  - ⚠ Da provare in modalità standalone su iOS 26: non c'è una ricetta verificata.
- **Lo storage:** `navigator.storage.persist()` all'installazione sulla Home, concesso con euristiche
  ([WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)). Se iOS sfratta i dati, al giro dopo si riscarica
  tutto: non si perde niente, perché la verità è nel repo.
- **"Dimentica questo telefono":** cancella IndexedDB (la chiave) e le cache.

## 5. Il delicato e la privacy nel sito

### 5.1 Che cosa non si mostra mai di default

| che cosa | regola (`CLAUDE.md`) | nel sito |
|---|---|---|
| frammenti con `delicato: true` non ancora ripresi da un tuo `ritorna-su` | "non si riportano mai spontaneamente"; "nei conti si contano, non si nominano" | fuori da porte, linea del tempo, coda lunga, ricerca, pagine dei temi vicini e anteprime; al loro posto, dove serve, solo il conto ("e 1 delicato") |
| periodo delicato (≥ 2 in 7 giorni) | vale per tutta la sessione | per tutto il periodo, niente coda lunga né "un ricordo" in apertura: la pagina iniziale resta sobria |
| delicati ripresi da te | escono dal divieto | rientrano nell'archivio principale al build dopo il tuo `ritorna-su` |
| persone `cerchia: vita` | mai `link`, mai in una chiamata esterna | visibili a te nella loro pagina; mai come ponte nei cammini (salvo che li cerchi tu); nessun link esterno, nessuna immagine di terzi; **assenti dalla build per gli ospiti** |
| legami `rifiutato` | non si ripropongono | assenti dalle viste; visibili solo nella pagina della restituzione, come stato della voce |
| ○ senza opera e passo | "non si consegna mai" | la build lo scarta |
| citazioni senza `esito` | ⚠ mai nascosto | ⚠ sempre accanto, anche nei risultati di ricerca |

### 5.2 Come lo si nasconde (tecnicamente, non solo con il CSS)

1. **Due archivi.**
   - `archivio.bin` non contiene i delicati chiusi: ne porta solo i conti per mese e per tema.
   - `delicati.bin` (cifrato con la stessa chiave) ha i loro testi e un indice di ricerca suo. Si scarica e si decifra
     solo dopo un gesto esplicito:
     - la vista "le mie frasi", dove la ricetta li vuole alla lettera e mai in testa;
     - il tocco su "e 1 delicato".
   - L'apertura vale per quella visita e non si ricorda: niente `localStorage`, la memoria si libera alla chiusura.
   - Un errore di rendering non può quindi mostrare un delicato che non è in memoria.
2. **Nessun contenuto in ciò che il telefono mostra fuori dall'app.**
   - Il `<title>` è sempre "Mnemosyne", perché la cronologia e il selettore delle app lo vedono.
   - Niente notifiche e niente badge; il `manifest` non ha scorciatoie con nomi.
   - ⚠ L'istantanea del selettore delle app di iOS non si controlla da una PWA: si può velare la pagina su
     `visibilitychange`, da provare.
3. **Nessuna richiesta verso terzi:**
   - CSP `default-src 'self'; img-src 'self' blob:; connect-src 'self'`;
   - `Referrer-Policy: no-referrer`, `X-Robots-Tag: noindex`, `rel="noreferrer"` sui link esterni;
   - niente analytics: Cloudflare Web Analytics resta spento.
4. **La build per gli ospiti** (in futuro): un terzo blob, con una chiave sua, senza `cerchia: vita`, senza delicati e
   senza ritratti, e un'applicazione Access con l'elenco degli ospiti. Si spegne revocando la chiave e l'email.
5. **Cloudflare vede:** chi entra (email, IP, paese, per 24 ore) e quando si scaricano i blob. Non vede che cosa si
   legge: i blob sono cifrati e il percorso sta nell'hash.

## 6. La pila, in una riga per pezzo

| pezzo | scelta | versione |
|---|---|---|
| calcolo | `sito/costruisci.mjs`, Node ≥ 20, importa da `scripts/contesto.mjs` | — |
| interfaccia | Vite + Preact, routing con l'hash | 8.3.5 / 11.1.1 |
| ricerca | MiniSearch, indice precalcolato | 7.2.0 |
| cifratura | WebCrypto: PBKDF2-SHA256 (≥ 600k iterazioni) → AES-GCM 256 | nativa |
| immagini | sharp → WebP 1600/480, cifrate | 0.35.5 |
| offline | vite-plugin-pwa (`injectManifest`) | 2.0.0 |
| build e deploy | GitHub Actions → `wrangler deploy` (asset statici, SPA) | wrangler 4.157.0, wrangler-action v4 |
| login | Cloudflare Access Free, email ammesse, sessione di un mese | — |
| costo | 0 €/mese (carta registrata su Cloudflare) | — |

## 7. Rischi e dubbi aperti

1. **La passphrase è il punto singolo.**
   - Se si perde, basta rigenerarla: nel secret di Actions e sul telefono. Non si perde niente, perché il repo è in
     chiaro su GitHub.
   - Se è debole, la cifratura vale poco. Servono almeno 5 parole a caso.
2. **Access + service worker su iOS standalone** non è provato: è la prima cosa da prototipare (mezza giornata), con
   dati sintetici.
3. **Le funzioni pure in `contesto.mjs`** (segni, stati, periodo delicato, coda lunga) vanno chieste alla sessione di
   implementazione dopo il blocco 6. Senza, il sito duplicherebbe regole e si separerebbe da `contesto/`.
4. **Il gesto dal sito**: id esplicito nel testo del memo, oppure un campo di frontmatter. Decide il modello (§3).
5. **Cifrare o no.** Se la sintesi giudica che Access basta, il ripiego è Astro 7 + Pagefind 1.6 (zero JS e HTML per
   nodo), più semplice di circa 2 giorni. Così però i nomi della vita e i delicati stanno in chiaro sull'edge di
   Cloudflare, e un hostname scoperto li espone. Raccomando di cifrare.
6. **Il primo IdP di Access** sui nuovi account è "Cloudflare" ⚠: va verificato che l'OTP per email resti disponibile.
7. **Il consumo di Actions** è stimato, non misurato: se supera il credito, si filtra di più (per esempio niente build
   per i soli `contesto/`) o si usano Workers Builds (3.000 minuti). Workers Builds però vuole l'integrazione Git.

## 8. Il costo in giorni di lavoro

| pezzo | giorni |
|---|---|
| `costruisci.mjs`: caricamento, viste (nodo, tempo, assenze, frammento, restituzione, "le mie frasi"), controlli | 3,5 |
| guscio Preact: routing, rendering dei segni, quattro viste principali | 3,5 (la grafica è della sessione di sintesi) |
| cifratura, due archivi, sblocco con la passphrase | 1 |
| service worker, offline, sessione scaduta | 1 |
| ricerca MiniSearch | 0,5 |
| immagini e vocali | 0,5 |
| Actions, `wrangler.toml`, Access (con i passi manuali dell'utente: carta, email, secret) | 0,5 |
| test su dati sintetici (delicati assenti dal blob, ○ senza luogo scartati, nessun nome della vita nel guscio) | 0,5 |
| **totale** | **~11** |

Il primo mezzo giorno va al prototipo del dubbio 2. Se Access + service worker non regge su iOS, il ripiego è Tailscale
(§1.1) con la stessa app: cambia solo l'host, non la pila.
