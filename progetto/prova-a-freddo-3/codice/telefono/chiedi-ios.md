# Il Comando rapido "Chiedi" (iOS): la ricetta

Piano blocco 3 (per il blocco 8); modello §3.2 (il campo `intento`) e §7.1; telefono §3. Salva una **domanda** in
`ingresso/` con lo stesso `PUT` di "Memo", con in più `intento: [chiedi]` nel frontmatter, e poi apre il Progetto
claude.ai: la domanda resta anche se la conversazione del Progetto no.

Si costruisce **duplicando** "Memo" (tieni premuto → *Duplica* → rinomina "Chiedi"), così token, data e id sono già
fatti. Le differenze, sotto, si riferiscono ai numeri delle azioni di `telefono/memo-ios.md`. Il token resta solo sul
telefono, mai nel repo.

## Le differenze

1. **Azioni 1–9**: identiche (token, *Data attuale*, `giornoora`, `registrato` con il fuso, i 4 caratteri, `id`).
2. **Azioni 10–11 e 14**: **toglile**. "Chiedi" prende solo testo (la domanda); niente allegati: una domanda su una foto
   si fa in Specchio. Nelle impostazioni (icona *i*) i tipi accettati sono solo *Testo* e *URL*.
3. **Azione 12**: resta (`Combina testo` dell'*Input comando rapido* con *Nuova riga* → `testo`).
4. **Azione 13**: la condizione diventa solo `testo` *non ha alcun valore*; la domanda di **Chiedi input** è `Che cosa vuoi
   chiedere?`. Anche qui un testo vuoto si salva lo stesso (come B18): la regola è una sola, "il grezzo c'è".
5. **Azioni 15–16**: un solo modello, senza `Se`. `intento` è **sempre una lista**, anche con un valore solo (schema §3.7:
   `intento` è un array; `intento: chiedi` senza parentesi non passa). "Memo" non lo scrive mai.

<!-- modello: chiedi -->
```text
---
registrato: {registrato}
canale: telefono
intento: [chiedi]
---
{testo}
```

6. **Azione 17**: resta (`Copia negli appunti` `testo`): qui serve due volte, perché nel Progetto la domanda si incolla.
7. **Azioni 18–20**: identiche (Base64 senza interruzioni di riga; `PUT` a
   `https://api.github.com/repos/paol-imi/mnemosyne/contents/ingresso/` + `id` + `.md` con `Authorization: Bearer ` + `token`),
   salvo il campo `message` del corpo JSON: `chiedi ` seguito da `id`.
8. **Azione 21**, ramo *Se* (salvato):
   - **Mostra notifica** `Salvato. Incolla la domanda.`;
   - **Apri URL** (Open URLs) con il link del Progetto (da claude.ai → il Progetto → *Condividi link* o la barra degli
     indirizzi: `https://claude.ai/project/<id-del-progetto>`), che si apre nell'app Claude. Se il link si apre in
     Safari invece che nell'app, al suo posto **Apri app** (Open App) → *Claude*, e il Progetto si sceglie a mano.
   - (dal blocco 7, il `fire`: lo stesso di "Memo", in fondo a `telefono/memo-ios.md`; "smista" legge `intento` e la
     lettura lo ricopia, §3.2.)

   Ramo *Altrimenti*: come "Memo" (`Non salvato: …`, il testo è negli appunti).

## Il collaudo (blocco 8)

Una domanda con un apostrofo e due punti (`chi ha scritto "l'ospite inquietante": Nietzsche?`): su GitHub, in `ingresso/`,
un file con `intento: [chiedi]` e la domanda intera nel corpo; l'app Claude si apre sul Progetto; la domanda è negli
appunti.
