# Il Comando rapido "Memo" (iOS): la ricetta, azione per azione

Piano blocco 3 e passo U4; modello §3.1, §3.2, §7.1; telefono §1 (b). Riceve testo, URL, foto o un vocale (dal menu
Condividi, dal tasto Azione, da Siri), compone il frammento **completo** e lo scrive con un `PUT` in `ingresso/`. Nessuna AI:
"Salvato" in un secondo. Se tutto il resto fallisce, il grezzo c'è.

Claude Code non può firmare un file `.shortcut` per un altro account: le azioni si aggiungono a mano, una per una, nell'app
**Comandi** → "+". I nomi sono quelli dell'interfaccia italiana (tra parentesi l'inglese); se un nome è cambiato, cerca
l'azione con la parola in grassetto. `test/memo.test.mjs` rifà questa ricetta in JavaScript e controlla che il file passi
lo schema del frammento: se cambi un'azione che tocca il file (11–21), cambia anche il test e
`scripts/simula-memo.mjs`, che scrive lo stesso file per il banco finché P3 non ha un esito (piano, blocco 3).

**Il token non va in nessun file del repo.** Si incolla solo nell'azione 1, sul telefono.

## Prima di cominciare

- Il PAT del passo U3 (a grana fine, solo `paol-imi/mnemosyne`, *Contents: Read and write*), copiato negli appunti.
- Nelle impostazioni del Comando rapido (icona *i*): **Mostra nel foglio di condivisione** acceso; tipi accettati: *Testo*,
  *URL*, *Pagine web di Safari*, *Immagini*, *File multimediali*, *File* (gli altri spenti); *Se non c'è input*:
  **Continua**.

## Le azioni

**A. Il token e l'istante**

1. **Testo** (Text): `INCOLLA-QUI-IL-PAT` → sostituiscilo con il PAT. Rinomina la variabile (tocca il risultato → *Rinomina*)
   in `token`.
2. **Data attuale** (Current Date). Una sola: id e `registrato` vengono dallo stesso istante.
3. **Formatta data** (Format Date) sulla *Data attuale*: Formato data *Personalizzato*, stringa `yyyyMMdd-HHmm` (minuscolo
   `yyyy`: con `YYYY` l'ultima settimana di dicembre prende l'anno dopo). → variabile `giornoora`.
4. **Formatta data** sulla stessa *Data attuale*: *Personalizzato*, `yyyy-MM-dd'T'HH:mm:ssZZZZZ` → variabile `registrato`.
   `ZZZZZ` scrive lo scarto del fuso del telefono (`+01:00` d'inverno, `+02:00` d'estate, `Z` se il telefono è in UTC):
   lo schema vuole l'ora **con** il fuso (§3.2, §3.7).

**B. I 4 caratteri casuali e l'id**

5. **Testo**: `abcdefghijklmnopqrstuvwxyz0123456789`.
6. **Dividi testo** (Split Text) per *Ogni carattere* → variabile `alfabeto`.
7. **Ripeti** (Repeat) `4` volte:
   - **Ottieni elemento dalla lista** (Get Item from List): *Elemento casuale* da `alfabeto`;
   - **Aggiungi alla variabile** (Add to Variable) `casuali`.
   **Fine ripetizione**.
8. **Combina testo** (Combine Text) `casuali` con *Personalizzato* e il campo vuoto (nessun separatore) → `xxxx`.
9. **Testo**: `giornoora`-`xxxx` (le due variabili con un trattino in mezzo) → variabile `id`. Esempio:
   `20261103-2340-k7q2`.

**C. Che cosa è arrivato: testo o allegati** (salta a D se usi solo testo e link: è il piano B di P3)

10. **Testo**: `|jpg|jpeg|png|heic|webp|m4a|` → variabile `formati` (le estensioni che lo schema accetta negli `allegati`).
11. **Ripeti con ciascuno** (Repeat with Each) elemento di *Input comando rapido*:
    - **Ottieni dettagli dei file** (Get Details of Files): *Estensione file* dell'*Elemento ripetuto*;
    - **Cambia maiuscole/minuscole** (Change Case) → *minuscolo* → variabile `est` (l'iPhone scrive `HEIC`, lo schema `heic`);
    - **Se** (If) `est` *non ha alcun valore*: è testo, un URL o una pagina di Safari →
      **Aggiungi alla variabile** `parti` l'*Elemento ripetuto* (come testo).
    - **Altrimenti, Se** `formati` *contiene* `|est|`: è una foto o un vocale →
      - **Calcola** (Calculate) `n` + 1 → **Imposta variabile** `n` (la prima volta `n` è vuota, cioè 0);
      - **Se** `n` *è* `1` → **Testo** `id`.`est`; **Altrimenti** → **Testo** `id`-`n`.`est`; **Fine se** → variabile `nome`
        (la prima foto è `20261103-2340-k7q2.jpg`, la seconda `20261103-2340-k7q2-2.jpg`: lo schema ammette `-1`…`-9`);
      - **Codifica Base64** (Base64 Encode) l'*Elemento ripetuto*, *Interruzioni di riga*: **Nessuna** → `dati`;
      - **Ottieni contenuti dell'URL** (Get Contents of URL), come nell'azione 19 ma con URL
        `https://api.github.com/repos/paol-imi/mnemosyne/contents/ingresso/` seguito da `nome`, e nel corpo JSON `message`
        = `memo ` `id` ` allegato`, `content` = `dati`;
      - **Ottieni valore del dizionario** (Get Dictionary Value) per la chiave `content` → **Se** *ha un valore* →
        **Aggiungi alla variabile** `allegati` il `nome`; **Altrimenti** → **Mostra notifica** `Allegato non salvato`.
      **Fine se**.
    - **Altrimenti** (un formato che lo schema non conosce: `.mov`, `.mp3`, `.pdf`…) → **Mostra notifica**
      `Formato non salvato: ` `est`.
    **Fine se**. **Fine ripetizione**.

Gli allegati vanno **prima** del memo, ciascuno con il proprio `PUT` (un PUT scrive un file solo), accanto a lui in
`ingresso/`: quando il `.md` arriva, i file che nomina ci sono già. Nel `.md` entrano solo quelli salvati davvero.
12. **Combina testo** `parti` con *Nuova riga* → variabile `testo`. (Più elementi di testo condivisi insieme: uno per riga.)
13. **Se** `testo` *non ha alcun valore* **e** `allegati` *non ha alcun valore* (il tasto Azione, Siri, un widget):
    **Chiedi input** (Ask for Input) di tipo *Testo*, domanda `Memo`, *Consenti più righe* acceso → **Imposta variabile**
    `testo`. (Oppure **Detta testo**, se lo preferisci a voce.) **Fine se**.
14. **Se** `allegati` *ha un valore* **e** `testo` *non ha alcun valore*: **Chiedi input** *Testo*, domanda `Una riga?`
    (si può lasciare vuota: B21 è una foto con "questa") → **Imposta variabile** `testo`. **Fine se**.

Un messaggio vuoto **si salva lo stesso** (banco B18): nessuna azione controlla che `testo` abbia un valore.

**D. Il frammento**

15. **Combina testo** `allegati` con *Personalizzato* `, ` → variabile `elenco`.
16. **Se** `allegati` *ha un valore* → **Testo** con il modello *con allegati*; **Altrimenti** → **Testo** con il modello
    *senza allegati*; **Fine se** → variabile `file`. Le righe vanno scritte esattamente così, a capo compresi; al posto
    delle parole tra graffe metti le variabili (toccando *Variabili* sopra la tastiera); nient'altro, nemmeno uno spazio
    o una riga vuota in fondo:

<!-- modello: senza allegati -->
```text
---
registrato: {registrato}
canale: telefono
---
{testo}
```

<!-- modello: con allegati -->
```text
---
registrato: {registrato}
canale: telefono
allegati: [{elenco}]
---
{testo}
```

Il testo del messaggio sta **solo nel corpo**, sotto il secondo `---`, mai nel frontmatter: virgolette, due punti,
`---`, `#`, emoji e a capo non toccano lo YAML, e non serve nessun escape. Nel frontmatter entrano solo valori fatti
dal Comando rapido (data, `telefono`, nomi di file `[0-9a-z-.]`). `smista` legge il frontmatter fino al **primo**
`---` dopo l'apertura: un `---` nel testo resta corpo.
17. **Copia negli appunti** (Copy to Clipboard) `testo`. È la rete: se la rete manca, l'azione 19 si ferma con un errore,
    e il testo non è perso.
18. **Codifica Base64** la variabile `file`, *Interruzioni di riga*: **Nessuna** → variabile `contenuto`. (Il testo si
    codifica in UTF-8: accenti ed emoji arrivano intatti; il collaudo lo controlla.)
19. **Ottieni contenuti dell'URL**:
    - URL: `https://api.github.com/repos/paol-imi/mnemosyne/contents/ingresso/` seguito da `id` e da `.md`;
    - *Metodo*: **PUT**;
    - *Intestazioni*: `Authorization` = `Bearer ` seguito da `token` (con lo spazio); `Accept` = `application/vnd.github+json`;
      `X-GitHub-Api-Version` = `2022-11-28`;
    - *Corpo richiesta*: **JSON**, due campi di tipo *Testo*: `message` = `memo ` seguito da `id`; `content` = `contenuto`.
      Nient'altro: niente `branch` (va sul ramo predefinito, `main`), niente `sha` (il file è nuovo; se per caso
      esistesse già, GitHub risponde 422 e non sovrascrive niente). Il messaggio del commit non contiene il testo.
20. **Ottieni valore del dizionario** per la chiave `content` dai *Contenuti dell'URL*.
21. **Se** *Valore del dizionario* *ha un valore*:
    - **Mostra notifica** (Show Notification) `Salvato` (solo questa parola: mai il contenuto nella notifica: telefono §4);
    - (qui, dal blocco 7, l'azione del `fire`: in fondo.)
    **Altrimenti**:
    - **Ottieni valore del dizionario** per la chiave `message` dai *Contenuti dell'URL*;
    - **Mostra avviso** (Show Alert) `Non salvato: ` seguito dal *Valore del dizionario*, `. Il testo è negli appunti.`
      (401: token scaduto o sbagliato; 404: token senza accesso al repo; 422: id già usato, riprova.)
    **Fine se**.

## Il collaudo (U4, P3)

Tre memo, poi su GitHub nella cartella `ingresso/` ci sono i file giusti:
1. testo con accenti, un'emoji e due a capo (`perché è così? 🌊` / riga vuota / `nn so`): il file mostra le stesse lettere,
   `registrato` ha l'ora del telefono (± 1 minuto) e il fuso (`+01:00` in inverno), l'id ha la stessa ora;
2. un link condiviso da Safari o YouTube, con i parametri (`?si=…`, `&t=…`) interi;
3. il tasto Azione senza scrivere niente, *Fine*: un file c'è comunque, con il corpo vuoto (B18);
4. P3: una foto da 3 MB e un vocale da 1 minuto (Memo vocali → Condividi → Memo): accanto al `.md` ci sono
   `<id>.heic` (o `.jpg`) e `<id>.m4a`, apribili, e il `.md` li nomina in `allegati`. Se la foto non passa (limite del PUT
   non documentato; il Base64 pesa un terzo in più), il piano B: solo testo e link nella prima settimana, le foto da
   Specchio.

## Blocco 7 (U7): il `fire` della Routine "smista". **Da non aggiungere adesso**

Si aggiunge solo dopo la prova P1, dentro il ramo *Se* dell'azione 21, **dopo** "Salvato" (il memo è già salvo: se il fire
fallisce, la passata delle 3 ore lo raccoglie). Finché non c'è, il Comando rapido è completo così.

```text
<!-- BLOCCO 7, spento
22. Testo: TOKEN-DI-FIRE  → variabile `fire` (il token della Routine "smista", passo U5; mai nel repo)
23. Dizionario (Dictionary): text = [id]          (solo l'id: il fire lo riceve come dato non fidato)
24. Ottieni contenuti dell'URL:
      URL     https://api.anthropic.com/v1/claude_code/routines/<trig_ID>/fire   (il Fire URL del passo U5)
      Metodo  POST
      Intestazioni  Authorization = Bearer [fire]
                    anthropic-version = 2023-06-01
                    anthropic-beta = experimental-cc-routine-2026-04-01
      Corpo   JSON: text = [id]
-->
```
