---
tipo: progetto-sito
origine: claude
validata: false
data: 2026-11-04
---

# Il sito di Mnemosyne: il progetto

> Il documento normativo del sito, per chi lo costruirà dopo la porta del blocco 6. È una proposta di Claude, da
> validare. Sintetizza cinque consegne, senza riaprirne le decisioni:
> - [`dimensioni.md`](dimensioni.md), gli assi per navigare e filtrare, con la proposta per lo schema 4 (che riconcilia
>   [`dimensioni-dati.md`](dimensioni-dati.md) e [`dimensioni-letteratura.md`](dimensioni-letteratura.md));
> - [`letteratura.md`](letteratura.md), la ricerca;
> - [`atlante-sito.md`](atlante-sito.md), l'autopsia del sito vecchio;
> - [`tecnica.md`](tecnica.md), la pila e la cifratura;
> - [`vista-tatuaggi.md`](vista-tatuaggi.md), la tavola dei tatuaggi.
>
> Le divergenze già decise (in fondo a `progetto/v2/coordinamento.md`, «Il sito (H)») qui sono vincoli:
> - nessuna mappa globale: la tavola si apre da un nodo o da una domanda, con zoom semantico e le porte ✦ prima;
> - la pila di `tecnica.md`, con la cifratura;
> - il sito non scrive mai: i gesti passano dal Comando rapido "Memo";
> - il tema segue il sistema;
> - i segni per peso tipografico, mai col rosso;
> - niente sparkline;
> - la tavola dei tatuaggi con la stampa;
> - cattura cieca e struttura derivata, niente code «da validare»;
> - la meraviglia sta nella restituzione;
> - mai un ○ senza opera e passo;
> - i delicati non si riportano spontaneamente;
> - le persone `cerchia: vita` non escono mai.
>
> Il prototipo è in [`prototipo/index.html`](prototipo/index.html), su dati **solo sintetici** (inventati: nessun nome
> né frase del repository). Le foto sono in [`prototipo/foto/`](prototipo/foto/).

**La soglia in due righe.** Aprendo il sito vedi una cosa sola: le due tue frasi su cui si regge l'ultima restituzione,
datate, una sotto l'altra, con l'intervallo di giorni tra loro, e il link alla lettera. Se non c'è una restituzione di
questa settimana, torna una tua frase dai ricordabili, una al giorno; in un periodo delicato, solo la data e le porte.

**Esplora in due righe: il cuore.** Una vista sola per navigare, filtrare e cercare: sei assi (cose, persone, temi,
campo ◌, gesto, tempo) che si incrociano, con il numero accanto a ogni valore, le scelte in chip sempre visibili e la
parola come campo di ricerca; il risultato sono le tue frasi datate e i nomi che le tengono. Ogni valore, ovunque nel
sito (un nodo, un frammento, la soglia), è una porta che apre Esplora con quel filtro (§3.12).

---

## 1. I principi

Dieci, in ordine di peso. Ognuno porta la sua fonte; quando la regola è già in `CLAUDE.md`, il sito la fa diventare forma.

1. **Una cosa sola per pagina, con un bordo.** Ogni vista sta in una schermata di telefono, o ha un ordine evidente
   dall'alto. Niente feed, niente "non letti", niente "altro da leggere", niente contatori di attività.
   *Fonti:* letteratura «Che cosa prendere» 8 (Dear Data, Richter, Spring '83; Lazar 2015 ed Epstein 2016 sull'abbandono);
   atlante-sito §4.2.5 («la struttura prima del contenuto»).
2. **La tua voce in testa, il resto le sta intorno.** Ogni vista si apre con una frase ✦ datata, in corsivo, alla lettera;
   ✧ sta sempre a parte; ◌ e ○ vengono dopo, più quieti.
   *Fonti:* atlante-sito §4.2.6 («la voce dell'utente era in fondo») e «Che cosa prendere» 1; `CLAUDE.md`, La voce.
3. **La provenienza è struttura: transclusione e "citato in".** Una tua frase citata in una restituzione non è una copia:
   il sito la legge dal frammento al momento di mostrarla, e il tocco porta al frammento. Sotto ogni frammento,
   piegato, "citato in".
   *Fonti:* letteratura 3 (Nelson, «the same thing knowably and visibly in more than one place»; Matuschak; Are.na).
4. **Gli strati si scelgono, non si validano.** Su ogni vista calcolata c'è lo stesso selettore a tre posizioni:
   *mie* (✦ ✧) · *e accolte* (●) · *e proposte* (◌ ○ ⚠). Il default è *e accolte*. Lo strato nascosto non sparisce:
   resta una riga quieta che lo conta ("e 1 convergenza ◌ · 1 voce ○") e che, toccata, lo apre. Così non si sceglie
   tra vuoto e rumore. In Esplora e nel nodo il selettore diventa **la lente**: una riga quieta in fondo, «anche le
   mie proposte ◌» (giudice della meraviglia sul nodo: il selettore a pillola «sembra un programma», §9).
   *Fonti:* letteratura 4 (i viewspecs di Engelbart; Shipman & Marshall 1999, «Inferred structure cannot be treated
   identically»); atlante-sito §4.2.2 (l'interruttore binario: «0 risposte da 0 discipline» contro 37 tavole su 5).
5. **I segni per peso tipografico.** ✦ in corsivo e a pieno inchiostro; ◌ in tondo, tono smorzato, peso più leggero;
   ○ in tondo con il luogo in piccolo sotto; ⚠ piccolo, sempre accanto. Nessun colore fa da segnale; il rosso non c'è.
   *Fonti:* letteratura 4 (Gwern, «you must earn your ornaments»; Bernstein, «use punctuation sparingly»);
   atlante-sito §4.2.3 («il rosso voleva dire due cose»).
6. **La porta è il nome; il tempo è la spina; gli assi sono i corridoi.** Si entra da un nodo, da una domanda, da una
   tua frase, o da un valore di un asse («canzone», «filosofia»), e gli assi si incrociano in Esplora (§3.12); la data
   sta in testa a ogni frase e a ogni pagina. Nessuna mappa globale: la tavola di un nodo mostra i vicini a un passo, al più
   dieci, con zoom semantico (i nomi, poi le frasi che li tengono insieme).
   *Fonti:* dimensioni §1–§2 (Flamenco, Hearst 2003: le faccette incrociate battono la porta unica); letteratura 1 (la "hairball"; Marshall & Shipman 1995: la memoria spaziale vale per chi ha disposto le
   cose; Sellen & Whittaker 2010: i nomi sono indizi più forti del tempo) e 6 (Mangen 2019, Lifestreams);
   atlante-sito §4.1.2 (lo zoom semantico del Firmamento) e §4.2.8 («mancava il tempo»).
7. **Navigazioni nominate, una direzione alla volta.** In fondo a un frammento, binari con il criterio scritto:
   «← giorno prima · giorno dopo →», «nel filo», «rimandi», e a parte «◌ vicino». Mai una lista "correlati".
   *Fonti:* letteratura 7 (Luhmann a Bielefeld, l'Arquivo LdoD di Pessoa); atlante-sito §4.1.8 e il Filo (§4.1.9).
8. **Il ritorno è lento, uno alla volta, dal mazzo filtrato.** Una tua frase torna sulla soglia al più una al giorno,
   solo dai ricordabili di `mappa.md` (che escludono i delicati per costruzione), mai per anniversario, senza
   pulsante "un altro".
   *Fonti:* letteratura 9 (Pensieve, Photobox; Meyer, «Inadvertent Algorithmic Cruelty»; Esiodo, *Teogonia* 55, le
   Muse come «λησμοσύνην κακῶν»).
9. **Il delicato si protegge con la forma, e con i dati che non ci sono.** Un frammento delicato non ripreso non entra
   nell'archivio principale (`delicati.bin` a parte, `tecnica.md` §5.2); nelle viste resta un conto, e solo un gesto
   esplicito lo apre. La sua pagina ha il testo e l'ora, nient'altro.
   *Fonti:* letteratura 10 (Calle, *Douleur exquise*; Felton 2010; l'avvertimento di Pavese); atlante-sito
   «Che cosa prendere» 8 (l'Atlante nascondeva con il CSS: la pagina restava raggiungibile).
10. **Ogni cosa ha un indirizzo stabile, e il sito non scrive.** Ogni frammento, nodo, restituzione, voce `r-…#n` e
    mese ha un URL che non cambia; lo stesso indirizzo è quello che il gesto mette nel memo («sì alla 3 →
    r-…#3»). Il sito è un lettore: il gesto apre il Comando rapido "Memo" con il testo già scritto.
    *Fonti:* letteratura 12 (Luhmann, Engelbart, i numeri delle tavole di Warburg) e tensione 3; tecnica §3.

Il vuoto è un dato, e non è un principio a parte: ogni vista ha il suo stato vuoto in una riga ("Niente si aggancia
ancora.", "Nessun ponte oggi."), mai una sezione-template vuota (atlante-sito §4.2.5: 38 «Nessun pin collegato»).

---

## 2. La mappa delle viste

Il routing è con l'hash (`tecnica.md` §4.4: il percorso non arriva a Cloudflare). Il `<title>` è sempre «Mnemosyne».

```
                         ┌───────────── barra: oggi · tempo · frasi · esplora ─────────────┐
                         │                                                                  │
  #/  LA SOGLIA ─────────┼──► #/r/<id>  RESTITUZIONE (tavola) ──► foglio voce n ──► gesto (Comando rapido)
   │  porte:             │        │ le frasi ✦ citate                                        
   │  il tempo ──────────┼──► #/tempo ──► #/tempo/AAAA-MM                                    
   │  le tue frasi ──────┼──► #/frasi                                                         
   │  un nodo vivo ──────┼──► #/nodo/<slug> ──► #/nodo/<slug>/tavola (zoom: nomi → frasi)    
   │  tatuaggi ──────────┼──► #/tatuaggi ──► #/tatuaggi/stampa                               
   │  un valore ─────────┼──► #/esplora?cose=f:canzone&temi=t:malinconia (assi, chip, parola)
   │                     └──► #/esplora (senza filtri: l'indice degli assi)                   
   └─ (senza restituzione fresca) il ritorno: #/ritorno/<id>                                  
  ogni frase ✦ ──► #/frammento/<id> (citato in · binari · i suoi valori) ──► nodi, restituzioni, Esplora
  ogni valore di un nodo o di un frammento ──► #/esplora con quel filtro (dal nodo: «da <nodo>» + il valore)
  #/assenze: dalla pagina del tempo e dal ritratto, mai dalla soglia
  #/r/<id-ritratto>: i ritratti, ciascuno con la sua data; «i ritratti precedenti» in fondo
```

| vista | indirizzo | ci si arriva da | foto |
|---|---|---|---|
| la soglia | `#/` | apertura, «oggi» nella barra, il marchio | `soglia-*`, `soglia-ritorno-tel`, `soglia-delicato-tel` |
| la restituzione | `#/r/<id>`, `#/r/<id>/<n>` | la soglia, il tempo, "citato in", un nodo | `lettera-*`, `lettera-voce-tel` |
| il frammento | `#/frammento/<id>` | ogni frase ✦ | `frammento-tel` |
| il nodo | `#/nodo/<slug>` | le porte della soglia, i legami, Esplora (i nomi), le anteprime | `nodo-tel`, `nodo-giu-tel`, `nodo-opera-tel`, `nodo-persona-tel`, `nodo-proposte-tel` |
| la tavola del nodo | `#/nodo/<slug>/tavola` | la pagina del nodo, una domanda (risultato della ricerca) | `tavola-nodo-*` |
| la linea del tempo | `#/tempo`, `#/tempo/AAAA-MM` | barra, soglia | `tempo-*` |
| le mie frasi | `#/frasi`, `#/frasi/<slug>` | barra, soglia | `frasi-*` |
| **Esplora** (navigare, filtrare, cercare) | `#/esplora`, `#/esplora?da=&cose=&persone=&temi=&campo=&gesto=&tempo=&q=&lente=` | barra, la soglia (riga «esplora»), ogni valore di un nodo o di un frammento; `#/cerca?q=` vi rimanda | `esplora-*` |
| le assenze | `#/assenze` | il tempo, il ritratto | `assenze-tel` |
| la tavola dei tatuaggi | `#/tatuaggi`, `#/tatuaggi/stampa` | soglia (porta fissa), il nodo `tatuaggi` | `tatuaggi-*`, `tatuaggi-stampa-tel` |
| il ritorno lento | `#/ritorno/<id>` (la soglia del giorno) | la soglia, quando non c'è restituzione fresca | `soglia-ritorno-tel` |

**I due formati.** Il telefono (390 px) è il caso completo. Lo schermo grande (1440 px) dà **più spazio, non più
funzioni** (letteratura 5): la colonna di lettura resta a 34em, e a destra, sopra i 900 px, compare un pannello
laterale (le anteprime al passaggio, "questa settimana" sulla soglia). Niente pannelli impilati né tele sotto i 900 px.

**Le anteprime.** Ogni link a un nodo o a un frammento porta l'odore delle tue parole (letteratura 11): al passaggio
(schermo grande) o al tocco lungo (telefono, foglio dal basso) compaiono il nome, il conto da `mappa.md` e la riga ✦ più
recente con la data. Mai un'etichetta nuda. Un'anteprima non apre mai su un delicato.

---

## 3. Le viste

Ogni vista dice: scopo · dati · disegno a 390 e a 1440 · vuoto · delicato · segni · che cosa NON mostra. I **dati** sono
solo campi del modello (`progetto/v2/modello-v3.md` §3–§5) e di `contesto/` (§6), più le funzioni pure che il §7 chiede a
`main`. Le viste si calcolano al build e non si salvano nel repo (modello §6.3; `tecnica.md` §2.1).

### 3.1 La soglia

**Scopo.** Aprire il sito oggi e vedere, in un minuto, una cosa che ti riguarda. La meraviglia sta nella restituzione:
la soglia è la sua faccia.

**Dati.**
- l'ultima restituzione `lettera` o `ritratto` (`forma`, `registrato`, `aggancio`); in mancanza, l'ultima `risposta`
  con un `aggancio` (un ponte);
- è **fresca** se `registrato` cade negli ultimi 7 giorni di calendario (`Europe/Rome`);
- la **coppia**: il frammento dell'`aggancio` e la frase ✦ che la restituzione gli mette accanto (la prima voce
  `cosa: ponte | convergenza | confronto` con `rif` a un frammento, o la seconda frase ✦ del corpo); il testo viene
  dal frammento, mai dal corpo della restituzione (transclusione);
- l'intervallo: i giorni di calendario tra i due `registrato` (o la data-tetto per un importato), calcolati;
- il **periodo delicato** (≥ 2 delicati in 7 giorni, funzione pura, §7);
- il ritorno: `ricordabili(a)` (§7), uno al giorno.
- Le porte: il tempo, le tue frasi, **un nodo vivo** (il nodo con l'ultima vicenda in `mappa.md` § Nodi), i tatuaggi;
  ognuna con una riga di servizio, senza frasi.

**Disegno a 390 px** (foto `soglia-tel.png`, `soglia-tel-scuro.png`).
- In alto, piccolo, «Mnemosyne» in maiuscoletto.
- Una riga di servizio: «martedì 3 novembre · la lettera di domenica».
- La prima frase ✦, grande (≈ 24 px), con la data sopra in piccolo.
- L'intervallo: un filo verticale e «15 giorni». È lo *Zwischenraum* di Warburg (letteratura §2.2), ma non lo dice.
- La seconda frase ✦, che compare dopo un respiro (0,7 s di dissolvenza; nessuna con `prefers-reduced-motion`): è
  l'«indizio parziale, poi l'affermazione completa» del ricordo (modello §9.3), applicato all'accostamento.
- «la lettera →». **La prima schermata finisce qui**: sotto c'è solo carta.
- Dopo lo scorrimento, oltre un filo, le **porte**: una griglia 2×2, ognuna con il nome e la sua riga (✦ in corsivo,
  oppure una riga di servizio in tondo). Le porte non citano frasi: solo righe di servizio («mese per mese», «un tema
  tuo, vivo»), così non c'è una frase senza data e nel periodo delicato non resta niente di tuo da evocare (giudice
  delle regole, secondo giro). Stanno fuori dalla prima schermata perché, viste insieme alla coppia, la
  facevano sembrare un menu (giudice della meraviglia, primo giro, §9).
- Sotto le porte, una riga **«esplora»**: canzoni · libri · film · sentimenti ◌ · domande ◌ · filosofia ◌, solo i
  valori che hanno almeno una frase. Sono valori, non
  frasi: ognuno apre Esplora con quel filtro (§3.12). Nel periodo delicato la riga non c'è, e la porta del nodo vivo
  diventa «esplora».
- La barra fissa in basso: oggi · tempo · frasi · esplora.

**A 1440 px** (`soglia-desk.png`). La stessa colonna, al centro, e nient'altro: niente pannello laterale sulla soglia
(una colonna «questa settimana» la indeboliva, §9).

**I tre stati.**
1. *Restituzione fresca*: la coppia, come sopra.
2. *Niente di fresco*: **il ritorno** (§3.10), una frase sola, con la sua data; la riga di servizio dice «dai
   ricordabili» (mai «torna», che è nella lista dei solleciti).
3. *Periodo delicato*: solo la data e le porte. Nessuna frase, nessun ritorno, nessun nodo vivo (la porta diventa
   «i nomi», senza riga). È la soglia sobria di `tecnica.md` §5.1.

**Vuoto.** Il primo giorno, senza restituzioni né ricordabili: la data, «Niente si aggancia ancora.», le porte.

**Delicato.** La coppia non contiene mai un delicato non ripreso (le restituzioni non li evocano, ma il controllo è
ripetuto al build). Un ritratto o una lettera che toccasse un tema vicino a un delicato fresco resta raggiungibile dal
tempo ma non sale sulla soglia per 7 giorni.

**Segni.** ✦ accanto a ogni frase; nessuna legenda (la soglia non è una forma lunga); nessun ◌ né ○ sulla soglia.

**NON mostra.** Contatori, "nuovo", "non letto", streak, il tempo di lettura, un "un altro", il perché ◌ della coppia
(sta nella lettera, dietro un tocco), un anniversario ("un anno fa"), notifiche, un'anteprima della lettera.

### 3.2 La restituzione come tavola

**Scopo.** Leggere una risposta, una lettera, un ritratto o un'eredità come è stata consegnata, e da ogni voce
risalire alla provenienza o fare un gesto.

**Dati.** La restituzione: `forma`, `registrato`, `letto-da`, `per`, `copre`, `aggancio`, `voci` (`n`, `rif`, `voce`,
`cosa`, `turno`, `esito`, `riferimento`), `legami`, il corpo. Lo stato di ogni voce, calcolato: ● se un tuo
`ritorna-su` con `n` la accoglie, rifiutata se la rifiuta (funzione `statoVoci`, §7). Le frasi ✦ del corpo, ritrovate nei
frammenti (funzione `corsiviDelCorpo`, §7).

**Disegno a 390 px** (`lettera-tel.png`, `lettera-voce-tel.png`).
- In testa: il titolo («Lettera di domenica 1 novembre»), la data e l'ora in maiuscoletto, la legenda in una riga
  (solo nelle forme lunghe, solo i segni usati).
- Il corpo su un **campo** uniforme (`--campo`, appena più scuro della carta): la tavola. Le due frasi d'apertura
  affiancate (una sotto l'altra sul telefono, una accanto all'altra sopra i 900 px), ciascuna con la sua data.
- Le voci: il numero in un cerchio (bersaglio da 44 px) a sinistra, il testo a destra; il ○ con il luogo in piccolo
  sotto; il ◌ in tono smorzato.
- Il tocco sul numero apre **il foglio dal basso**: «voce 1 · mondo ○», il testo, il `riferimento` e l'`esito` (o
  ⚠), l'indirizzo `r-…#1`, e tre gesti (§5).
- In fondo, piegato, «citata in».
- **A 1440 px**: il foglio diventa un pannello a destra, la colonna resta a 34em.
- Una `risposta` di una chat mostra le sezioni per turno (`### 21:04 · …`) con le voci sotto; un ritratto ha in fondo
  «i ritratti precedenti», ciascuno con la sua data (letteratura 13: l'incompiuto si mostra).

**Vuoto.** "Salvato." senza file non ha una pagina: lo mostra il frammento, come riga di servizio.

**Delicato.** Una risposta `ci-sono` resta una riga nel frammento delicato. Una restituzione non si filtra (è
immutabile), ma se cita un delicato non ripreso non compare sulla soglia né nel tempo come pezzo; resta raggiungibile
dal frammento.

**Segni.** Quelli del corpo, così come sono stati consegnati; il ● e "rifiutata" come stato della voce, accanto al
numero (● pieno; rifiutata: il numero barrato, in tono smorzato). Il ● accoglie il legame, non le parole: la formula
resta in tondo.

**NON mostra.** Il selettore di strati (una restituzione è un testo, non una vista calcolata); i perché ◌ dei legami
che non sono nel corpo; voti; "ti è piaciuta?".

### 3.3 Il frammento

**Scopo.** La pagina della cosa detta, intatta, con i suoi legami e chi la cita.

**Dati.** Il frammento (`registrato`, `canale`, `voce`, `forma`, `allegati`, `continua`, `intento`, il corpo) e la sua
lettura (`intento`, `reazione`, `legami`, `parole`, `link`, `trascrizione`, `altrui`, `vissuto`, `delicato`, `nota`,
`risposta`); i `ritorna-su` in entrata; `citatoIn(a, id)` (§7); i vicini (`vicini`, §7); il giorno prima e dopo.

**Disegno a 390 px** (`frammento-tel.png`).
- La data piena e l'ora, il canale in maiuscoletto (o «archivio d'origine» con la data-tetto e la nota «trascritta da
  Claude nel seme»).
- Il corpo alla lettera, a 21 px, a capo e refusi compresi. Una chat: i tuoi turni con `[HH:MM]` in tondo piccolo.
  Un `altrui`: il gesto ✦ e il tuo commento in corsivo; le parole d'altri in tondo, tra «», ○.
- La riga di risposta, se è senza file («Salvato.», «Ci sono.»), o il link alla risposta.
- Il selettore degli strati, poi i **legami** come nomi con il loro segno (✦ per i tuoi, ◌ per i proposti, nello strato
  delle proposte).
- La riga **«esplora»**: i valori del frammento sugli assi, calcolati a un passo (dimensioni §2): il tipo delle opere
  che nomina, la specie dei suoi temi, i suoi gesti, il mese, il campo ◌ in fondo. «canzone · sentimenti ◌ · sento ·
  settembre 2026 · musica ◌». Ogni valore apre Esplora con quel filtro (`frammento-tel.png`).
- «citato in», piegato, aperto se non è vuoto: ogni restituzione che lo cita, con il luogo («in apertura, accanto al 14
  ottobre»).
- I **binari**: ← giorno prima · giorno dopo →, nel filo (il tema ✦ della sua vicenda), rimandi (i `ritorna-su`), ◌
  vicino (solo nello strato delle proposte).
- Le foto degli `allegati`: la copia WebP, a tutta larghezza; un vocale con il lettore nativo.
- **A 1440 px**: a destra il pannello con le anteprime dei nodi.

**Vuoto.** «Nessuna restituzione lo cita.»

**Delicato.** La pagina di un delicato non ripreso ha solo la data, l'ora e il testo: nessun legame, nessun segno
dell'AI, nessun binario, nessun vicino. Si raggiunge solo con il gesto esplicito (§3.6). Se ci torni sopra tu, i tuoi
ritorni gli si allineano sotto, con i giorni passati, senza parole dell'AI (letteratura 10).

**Segni.** ✦ sul corpo; i legami con il loro segno; ⚠ accanto a una citazione senza `esito`.

**NON mostra.** Il JSON della lettura, `letto-da` e `prompt` (stanno nella linea del tempo come "cambio di lettore"),
`nota` come se fosse tua (se c'è, in tondo smorzato, ◌).

### 3.4 Il nodo

**Scopo.** La porta d'ingresso a una cosa che ritorna: una persona, un'opera, una citazione, un tema, una raccolta. Si
legge come una pagina, non si usa come un pannello: le tue frasi in testa, poi le parole intorno, ciascuna una porta su
Esplora.

**Dati.** Il nodo (`nome`, `alias`, `cerchia`, `in`, `autore`, `anno`, `attribuita-a`, `citata-da`, `originale`,
`traduzione`, `riferimento`, `esito`, `scopo`, `fuso-in`, `link`, e dallo schema 4 `tipo`, `specie`, `campo`); la
riga di `mappa.md` § Nodi; le Correzioni in attesa; le Fruizioni; le frasi del nodo a un passo, più l'autore e l'`in`
(`faccette(a)`, §7.1); `statoLegami` per il ●.

**Disegno a 390 px** (`nodo-tel.png`, `nodo-tel-scuro.png`, `nodo-giu-tel.png`, `nodo-opera-tel.png`,
`nodo-persona-tel.png`, `nodo-proposte-tel.png`).
- Il nome grande; sotto, in una riga, **le faccette del nodo**, ciascuna una porta su Esplora:
  - un tema: «tema · idea ◌» (la specie, con il ◌: è una lettura di "consolida");
  - un'opera: «serie · David Lynch · 1990 · cinema ◌» (il tipo, l'autore come nodo, l'anno, il campo ◌);
  - una persona: «persona · filosofia ◌»; un personaggio: «personaggio · Twin Peaks»;
  - una citazione: «citazione · attribuita a Rumi · da verificare ⚠».
  È il posto del «genere», che prima stava in fondo come «una riga tecnica»: qui sono parole da toccare, non etichette.
- **La prima schermata è come la soglia**: due frasi ✦ grandi, datate, con l'intervallo in giorni. Sono **la prima e
  l'ultima** tua frase sul nodo (non importate): la regola è semplice e si vede («la prima e l'ultima»), e fa leggere
  come è cambiato il pensiero. Con una frase sola, una. Sotto: «tutte le frasi in Esplora →».
- **Le altre**: subito dopo la coppia, fino a 4 frasi ✦, dalla più recente; poi gli importati, con la data-tetto e la
  nota una volta in testa. Tutte le tue frasi stanno insieme, prima di ogni altra cosa (giudice delle domande, secondo
  giro). Per una persona della vita, tutte.
- **Intorno alle tue frasi**: tre o quattro righe di parole, ognuna un asse calcolato sulle frasi del nodo, senza
  numeri (i numeri stanno in Esplora; qui il giudice li leggeva come «un programma»), con etichette in parole:
  - «insieme a» i temi che stanno nelle stesse frasi;
  - «nomini» le persone e le opere;
  - «dentro» i gesti (penso, sento, voglio fare, per i tatuaggi);
  - «ci torni in» i mesi.
  Ogni parola apre Esplora **dal nodo** con quel valore («da attenzione» + «aspettare»): è il modo per incrociare due
  temi, che dentro un asse si sommerebbero. Una riga vuota non si scrive. Sostituisce la tavola a due vicini, che il
  giudice trovava povera: dice gli stessi vicini, con le parole e i numeri, e porta oltre.
- **Dal mondo**: il ○ con le sue parole tra «» e il suo luogo, e solo con il luogo (senza, la riga non c'è) (Weil per attenzione, con il link alla lettera che l'ha
  portata; il passo verificato per un'opera); per una citazione,
  l'`esito` (o ⚠) e la traccia della verifica.
- In fondo, piccolo: la riga dei conti da `mappa.md` (gli importati detti a parte), e «la tavola →» **solo** se il nodo
  ha almeno tre vicini tenuti ciascuno da almeno due tue frasi (§3.5).
- **La lente** al posto del selettore: l'ultima riga, quieta, «anche le mie proposte ◌», solo se il nodo ha proposte.
  Aperta, mostra le frasi che entrano per un tuo legame ◌, con «una mia lettura ◌, non tua», e le convergenze ◌.
- Una frase compare **una volta sola** nella pagina.
- **A 1440 px**: a destra le anteprime al passaggio.

**Vuoto.** «Niente si aggancia ancora.» al posto della coppia. Una raccolta senza `scopo`: «raccolta · senza scopo».

**Delicato.** Le frasi e l'intorno non contengono delicati non ripresi, e un delicato non dà valori all'intorno; al loro
posto, se c'è, «e 1 delicato» in fondo, che non si apre da qui.

**Persone `cerchia: vita`.** Il nome, «persona della tua vita», tutte le tue frasi nella pagina. Niente faccette,
niente intorno, niente proposte, niente tavola, nessun link a Esplora (non sono un filtro), mai in un ponte, mai in
una ricerca web; nella build degli ospiti non c'è.

**Segni.** ✦ sulle frasi; ◌ sulla specie, sul campo e sulle proposte, smorzato; ○ con il luogo; ⚠ sempre. Il tipo
non ha segno, come l'anno: ha sempre una fonte (dimensioni §1.2).

**NON mostra.** Un grafo globale, sparkline, una scala d'intensità, il selettore a pillola, "importance", stadi di
crescita, un "potrebbe interessarti", le persone della vita nell'intorno.

### 3.5 La tavola del nodo (zoom semantico)

**Scopo.** Vedere che cosa sta accanto a un nodo, e perché, senza mappa globale: la forma amata della vecchia mappa
(«vai con la mappa», atlante-sito §3) a partire dalle tue parole.

**Dati.** I vicini a un passo: i nodi legati davvero (che compaiono nelle stesse letture ✦, o in un legame ◌ ○ di una
restituzione; mai un nodo senza legame), al più 10,
ordinati per numero di frammenti ✦ in comune, poi per data. Per ogni vicino, `frasiCheTengono(a, x, y)` (§7): i
frammenti ✦ che portano entrambi i capi. Il layout è fisso, con un seme dallo slug (atlante-sito §2.2, `layoutCielo`).

**Disegno a 390 px** (`tavola-nodo-tel.png`, `tavola-nodo-zoom-tel.png`).
- Livello 1, **i nomi**: il nodo al centro, i vicini in cerchio, tutti allo stesso corpo (nessuna intensità).
  Linea piena: una tua frase li tiene insieme. Tratteggio: un legame non tuo (◌ o ○).
- Livello 2, **le frasi**: il tocco su un vicino avvicina (scala 1,6, 320 ms), spegne gli altri nomi, e sotto la tela
  compaiono le frasi ✦ che li tengono insieme, con le date. Senza frasi tue: «Nessuna tua frase li tiene insieme:
  proposta sbiadita ◌».
- Livello 3, **la frase**: il tocco su una frase porta al frammento.
- Una riga di servizio sotto: «Fuori dalla tavola: 2 persone della tua vita.».
- Da tastiera: Tab tra i nomi, Invio per avvicinare, Esc per tornare; sotto la tela, sempre, l'elenco testuale degli
  stessi vicini (l'alternativa al canvas che mancava all'Atlante).
- **A 1440 px**: la tela a sinistra (540 px), le frasi a destra, senza cambiare pagina.

**Da una domanda.** La ricerca (§3.8) può aprire la tavola di un nodo trovato, con la domanda in testa («che cosa
collega attenzione e mare»): i cammini sono quelli del modello (§6.2), che non attraversano un frammento con più di 8
nodi né una persona della vita.

**Quando si offre.** Solo con almeno tre vicini tenuti ciascuno da almeno due tue frasi (giudice della meraviglia,
terzo giro: con due vicini «non mi mostra niente che non sapessi già»). Sotto, il nodo ha già l'intorno (§3.4), che
dice gli stessi vicini in parole. Nei dati sintetici nessun nodo arriva alla soglia: la tavola resta raggiungibile solo
dall'indirizzo, per le foto.

**Vuoto.** Un nodo sotto la soglia: la tavola non si offre.

**Delicato.** Un delicato non ripreso non conta come frammento in comune.

**Segni.** Sui legami (pieno = ✦ o ●, tratteggio = ◌ o ○); sulle frasi, ✦.

**NON mostra.** Più di un passo, più di 10 vicini, forze, animazioni continue, la tavola sotto un nodo `vita`.

### 3.6 La linea del tempo

**Scopo.** La spina: che cosa hai detto e pensato, mese per mese.

**Dati.** `mappa.md`: Conti per mese, Posizioni (frase, dal, messa in discussione il, tensioni), i giorni attivi; i
"periodi" di `parole.md` per i mesi fuori dalla finestra; le restituzioni del mese; i `cambiLettore(a)` (§7: date in
cui cambia `letto-da` o `prompt` delle letture); il conto dei delicati per mese, senza nome né id.

**Disegno a 390 px** (`tempo-tel.png`, `tempo-tel-scuro.png`).
- Un mese per sezione, dal più recente; l'intestazione in maiuscoletto («ottobre 2026»; «in corso»; «periodo» per
  quelli riassunti).
- **Il calendario**: quadratini tutti uguali; pieno = giorno attivo. Nessuna scala d'intensità (letteratura 6 e «Che
  cosa NON prendere»).
- I conti in una riga di servizio, copiati da `mappa.md`: «9 frammenti parlanti e 1 delicato · 10 giorni attivi».
- Le **posizioni**: la frase ✦ con «dal 14 ottobre · messa in discussione il 29 ottobre», o «tensione con il 14
  ottobre». Mai "superato".
- Il **cambio di lettore**: un filo punteggiato con la data.
- Le frasi ✦ del mese, una riga ciascuna; le restituzioni del mese come link.
- In fondo, **l'archivio d'origine**: fuori dai conti, la data-tetto e la nota una volta in testa al gruppo.
- **A 1440 px**: due colonne, i mesi a sinistra (calendario e conti), le frasi a destra.

**Vuoto.** Un mese senza parlanti: «Nessun frammento.», il calendario vuoto.

**Delicato.** I delicati si contano («e 1 delicato»), non si nominano, non si aprono da qui. In un periodo delicato,
il mese in corso mostra solo i conti.

**Segni.** ✦ sulle frasi; nessun ◌ nella spina; ◌ e ○ solo nello strato delle proposte (le tensioni proposte dall'AI).

**NON mostra.** Grafici, sparkline, medie, "il tuo mese migliore", confronti tra mesi, streak.

### 3.7 Le mie frasi

**Scopo.** La ricetta «le mie frasi» di `CLAUDE.md`, come pagina.

**Dati.** `parole.md` per l'ordine e la finestra; `frammenti/` per ciò che è prima del taglio (il sito ha l'archivio
intero nel blob); il seme ✧ dalla sezione `## Seme ✧`; le restituzioni di `recenti.md` per la coda lunga.

**Disegno a 390 px** (`frasi-tel.png`, `frasi-tel-scuro.png`).
- Le prime 8 righe: le frasi ✦ dalla più recente, alla lettera, con la data, una della coda lunga («da tempo»). Le
  riportate con la nota una volta in testa al gruppo e la data-tetto. Gli `altrui` come gesto, con il tuo commento.
- La riga ✧, a parte, in corsivo, con il passo e la data-tetto, dopo le tue.
- «il resto», piegato: tutte le altre, per mese.
- In fondo al resto, se c'è: «e 1 frase dell'11 ottobre, delicata · mostrala». Il tocco scarica e decifra
  `delicati.bin` per quella visita (`tecnica.md` §5.2) e la mostra alla lettera, mai in testa.
- `#/frasi/<slug>`: «le mie frasi su X», le stesse regole.
- **A 1440 px**: la stessa colonna; a destra i nodi delle frasi visibili.

**Vuoto.** «Nessuna frase tua ancora.»

**Segni.** ✦ e ✧, nient'altro. Nessuna formula dell'AI.

**NON mostra.** "Le frasi più forti", un ordinamento per reazione, le parole d'altri come tue, i non parlanti (un link
nudo, «boh»).

### 3.8 La parola (la ricerca dentro Esplora)

**Scopo.** Ritrovare per parole: chi, quando, che cosa (letteratura 15). Non è più una vista a parte: è il campo in
testa a Esplora (§3.12), e si incrocia con gli assi. `#/cerca?q=` rimanda a `#/esplora?q=`.

**Dati.** L'indice MiniSearch precalcolato nel blob (`tecnica.md` §4.1): il corpo dei frammenti, i nomi e gli alias dei
nodi, la prosa delle restituzioni; i delicati in un indice a parte, in `delicati.bin`.

**Disegno.** Il campo, «una parola, alla lettera»: alla lettera, anche di tre lettere, con gli accenti piegati; per
cercare per senso si chiede a Specchio. I risultati sono quelli di Esplora: i nomi trovati, poi le tue frasi con la
data; gli assi restringono («mare» + gesto: ricordo, `esplora-parola-tel.png`). Le citazioni con il loro `esito` o ⚠.

**Vuoto.** «Nessuna tua parola.»; mai un "forse cercavi".

**Delicato.** Un delicato non ripreso non compare: in fondo, «e 1 risultato delicato · mostralo», con lo stesso
gesto delle frasi. Solo la parola lo trova: un filtro sugli assi mai.

**NON mostra.** Suggerimenti automatici, la cronologia delle ricerche salvata, risultati dal web.

### 3.9 Le assenze

**Scopo.** «Che cosa non sto guardando», al più tre, con numeri ✦ (modello D23).

**Dati.** `mappa.md`: Conti per mese e per tema, Fruizioni (le «da fare» senza ritorni), Nodi (ultima data). La scelta
delle tre è deterministica (`assenze(a)`, §7): un tema con ✦ ≥ 2 che tace da 30 giorni attivi; una fruizione «da
fare» senza ritorni; le domande (✦ con `intento: chiedi`) se tacciono.

**Disegno a 390 px** (`assenze-tel.png`). Il titolo, una riga di servizio («Al più tre. I numeri vengono da
mappa.md.»), l'elenco numerato: il nome come link, le tue parole se ci sono, i numeri ✦.

**Vuoto.** «Niente manca, per ora.»

**Delicato.** Mai un tema delicato o vicino a un delicato; mai «non scrivi da…».

**NON mostra.** Solleciti, «torna», consigli, giudizi.

### 3.10 Il ritorno lento

**Scopo.** Far tornare una tua frase, una alla volta, da fuori.

**Dati.** `ricordabili(a)` (§7): i frammenti ✦ più vecchi di 60 giorni di calendario con almeno 10 giorni attivi in
mezzo, e gli importati ✦, non delicati, mai ricordati in una lettera; ordinati come vuole il modello (§6.2, I18).

**La regola.** Il giorno sceglie: l'indice è `giorniDallImportazione mod n` sull'elenco ordinato, così ogni frase torna
una volta per giro, e due giorni di fila non danno la stessa. Compare **solo sulla soglia, solo se non c'è una
restituzione fresca**, mai in un periodo delicato. Nessun pulsante "un altro". Nessuna notifica (il sito non ne manda).

**Disegno a 390 px** (`soglia-ritorno-tel.png`). «dai ricordabili», la data, la frase ✦ grande; le porte dopo lo
scorrimento. Il tocco porta al
frammento.

**Vuoto.** Nessun ricordabile: la soglia dice solo la data.

**NON mostra.** «Un anno fa oggi», un ricordo per anniversario, un contatore di giri.

### 3.11 La tavola dei tatuaggi e la sua stampa

**Scopo.** La raccolta `tatuaggi` come tavola: i tuoi pezzi, posati su un campo, di misure diverse, come forma da
guardare; e il brief da portare in studio, che è la stessa pagina stampata (vista-tatuaggi, Forma B e C).

**Dati.** Il nodo `raccolte/tatuaggi.md` (`scopo`); i frammenti ✦ con `serve-a: tatuaggi` (le letture) e i `ritorna-su
… aggiunge` verso di loro; le restituzioni `eredita` con `serve-a` (◌); la **misura** da `reazione` e "Ritorni con
effetto" (grande), default (medio), meno di 3 parole tue (piccolo: un pin nudo); i **fili** dai nodi nominati in comune
da due o più pezzi; gli `allegati` (WebP cifrate); per i pin, il `link[].titolo` della lettura. Funzione `tavolaRaccolta`
(§7).

**Disegno a 390 px** (`tatuaggi-tel.png`).
- Sopra il campo: il nome, «senza scopo» (riga di servizio, finché lo `scopo` manca; non lo chiede).
- Il **campo scuro** (anche nel tema chiaro: è la tela nera di Warburg, e qui non è una scelta di tema ma di forma),
  la legenda in una riga.
- I **pezzi** in una griglia a 6 colonne: grande su 6, medio su 3, piccolo su 3; ogni pezzo con la data (o, per un gruppo
  di importati, la data-tetto e la nota una volta in testa), la tua frase in corsivo con ✦, la tua foto sopra quando c'è.
  Un pin è una carta tipografica: il titolo dal link e ↗, **nessuna miniatura e nessun embed**.
- Un ○ dentro il pezzo, se il pezzo nomina un testo verificato: una riga tra «», con opera e passo.
- I **fili**: un'etichetta tratteggiata tra i pezzi che condividono un nodo («✦ linea», «✦ faro»).
- **Ai margini**, fuori dal campo: un solo link, «le idee arrivate con l'importazione →», che apre la pagina della
  raccolta (Forma A) con le `eredita` ◌. **Nessuna idea ◌ in vista sul campo.** Vista-tatuaggi proponeva un ◌ ai
  margini; il giudice delle regole (terzo giro) ha fatto notare che un'`eredita` «non si rilancia» (`CLAUDE.md`,
  regola 5): mostrarne una scelta dal sito è rilanciarla. Senza conti («le 6 idee» era un contatore).
- «il brief da stampare →».
- **A 1440 px**: la griglia a 12 colonne, grande su 5×2, medio su 4, piccolo su 3.

**La stampa** (`tatuaggi-stampa-tel.png`, e `@media print`). Fondo bianco, pezzi con il bordo, i segni restano (il
tatuatore deve sapere che cosa è tuo). Fuori: il link alle idee importate, ogni pezzo delicato, ogni pezzo che nomina una persona
`cerchia: vita`, la barra, i link. Il filtro si fa sui **dati** (la funzione esclude), non solo con il CSS. È l'unica
uscita voluta del sito.

**Vuoto.** «Nessun pezzo ancora.» e il link alle idee importate, se c'è.

**Delicato.** Un delicato con `serve-a: tatuaggi` (un tatuaggio per un lutto) non entra finché un tuo frammento non ci
torna sopra.

**NON mostra.** Una sagoma del corpo (sarebbe un ◌ presentato come mappa), un `placement` o uno `stato` inventati,
l'embed di Pinterest, il muro delle eredità, l'accostamento Warburg spiegato a parole.

### 3.12 Esplora: navigare, filtrare, cercare (il cuore)

**Scopo.** «Se voglio qualcosa legato alla filosofia, ad un autore in particolare, ad un pensiero, un sentimento […]
oppure voglio cercare una canzone, o una parola»: una vista sola per tutte queste porte, che si incrociano. Gli assi, i
vocabolari e le regole sono in [`dimensioni.md`](dimensioni.md); qui la forma.

**Dati.** `faccette(a)` (§7.1): per ogni frase ✦ (parlante o importata, mai delicata non ripresa) i valori dei sei assi,
ciascuno con la voce del legame che lo dà; i nodi con `tipo`, `specie`, `campo`; l'indice della parola. Tutto in
memoria: ogni scelta ricalcola risultati e numeri in meno di 50 ms (`tecnica.md` §4.3), senza «applica».

**Gli assi, in quest'ordine** (dimensioni §1): **cose** (forme e opere; citazioni ed esiti) · **persone** · **temi**
(specie e temi) · **campo ◌** · **gesto** (penso · sento · chiedo · ricordo · voglio fare · trascrivo · per i
tatuaggi) · **tempo** (i mesi; l'archivio d'origine). Dentro un asse O, tra assi E; il punto di partenza «da <nodo>»
sempre in E.

**Disegno a 390 px**, il caso principale.
- **In testa, ferma mentre scorri** (`position: sticky`): il campo della parola e, sotto, **la riga delle chip** che
  scorre in orizzontale. La prima chip è «＋ filtra», che apre il foglio; poi i filtri attivi, ciascuno con la sua ×
  (il punto di partenza «da attenzione» con il bordo; le chip del campo in tono smorzato, con il ◌). Bersagli da 44 px.
- **Senza filtri, l'indice** (`esplora-tel.png`, `esplora-giu-tel.png`): sotto una riga di servizio («Tocca una parola
  per filtrare; le scelte si incrociano.»), un asse per sezione, con i valori come parole e il numero piccolo accanto:
  «canzone 2 · libro 4 · film 2 · serie 3 · citazioni 4», poi in corsivo le opere più presenti; le persone; i temi per
  specie («sentimenti ◌ 6 · idee ◌ 8 · domande ◌ 2…») e poi i temi; il campo, smorzato, con «◌ scelto da me, sui nomi del
  mondo»; i gesti; i mesi. È la parte del **navigare**: si vede che cosa c'è prima di filtrare.
- **Con un filtro, i risultati** (`esplora-risultati-tel.png`, `esplora-filosofia-tel.png`): la riga del totale («3
  frasi · e 1 dall'archivio d'origine, fuori dai conti · 5 nomi»), poi **nomi** (i nodi che danno il valore scelto, come
  link, con ⚠ accanto alle citazioni senza esito), poi **le tue frasi**, dalla più recente, ognuna con la data, la frase
  ✦ e, in piccolo, i nomi che la legano. In fondo gli importati, con la data-tetto e la nota una volta in testa.
- **Il foglio dei filtri** (`esplora-filtri-tel.png`): sale dal basso (lo stesso foglio delle voci, §3.2), «filtra · 2
  frasi» in testa, un asse per sezione, i valori come pillole con il numero, i primi 8 e «altri N». Il tocco aggiunge o
  toglie un valore e tutto si ricalcola sotto e dentro il foglio; i valori a zero spariscono. In fondo, fermo, «mostra
  2 frasi», che chiude. Il foglio, non una colonna: a 390 px una colonna di faccette non ci sta accanto ai risultati.
- **Restringi** e **o anche**: sotto il totale, due righe di chip che scorrono, con il numero. «restringi»: i valori
  degli altri assi che restringono davvero (meno frasi, mai zero), e, se sono scelte le citazioni, i loro esiti (⚠ da
  verificare, verificata), che le raffinano. «o anche»: gli altri valori degli assi già scelti, che allargano (O:
  esoterismo o mito e religione; film o serie). Nessun taglio silenzioso: ogni riga finisce con «tutti i filtri», che
  apre il foglio. Incrociare o allargare è un tocco (giudice delle domande, primo e secondo giro).
- **La parola** scritta diventa una chip «mare» con la sua ×, come gli altri filtri.
- **Dal nodo** (`esplora-da-nodo-tel.png`): «da attenzione» + «aspettare» = le frasi su attenzione **e** aspettare.
- **La lente**, ultima riga: «anche le mie proposte ◌». Aperta, i legami ◌ contano; una frase che entra solo per un ◌
  porta sotto «entra per una mia lettura ◌: nostalgia».
- **A 1440 px** (`esplora-desk.png`): la stessa colonna; il foglio diventa il pannello a destra, come per le voci.
  Più spazio, non più funzioni.

**I numeri.** Accanto a ogni valore, le frasi che resterebbero scegliendolo, sugli altri filtri attivi. Contano solo i
parlanti (regola 3); un valore con sole frasi importate ha «·» al posto del numero. Nessuno zero raggiungibile: un
vicolo cieco si ha solo con la parola, e si dice («Nessuna canzone tua.», «Nessuna tua parola.»).

**L'indirizzo.** `#/esplora?da=attenzione&cose=f:canzone&temi=t:malinconia&campo=filosofia&q=mare&lente=proposte`.
Ogni stato si può tenere, mandare a se stessi, riaprire (principio 10). Le chip sono link: togliere una chip è tornare
indietro di un passo.

**Vuoto.** Togliere l'ultima chip riporta all'indice; un risultato vuoto dice che cosa manca, in una riga.

**Delicato.** Un delicato non ripreso non ha valori: nessun filtro lo trova, nessun numero lo conta. Solo la parola, in
fondo, «e 1 risultato delicato · mostralo». Un tema che vive solo in delicati non compare nell'indice. In un periodo
delicato Esplora resta raggiungibile dalla barra, ma la soglia non lo propone con i valori.

**Persone `cerchia: vita`.** Non sono valori dell'asse persone e non hanno campo; non compaiono tra i nomi sotto le
frasi. Le trova solo la parola (scrivendo il nome).

**Segni.** ✦ sulle frasi; ◌ sul campo e sulle frasi che entrano per una proposta; ⚠ sulle citazioni senza esito, anche
dentro la frase che le nomina; la specie con il ◌ (sentimenti ◌); tipo e gesto senza segno (un fatto del mondo verificabile; un calcolo dai tuoi campi). Nessuna legenda: non è una forma lunga.

**NON mostra.** Emozioni dedotte, un tono del frammento, «correlati», «popolari», un ordinamento per reazione,
suggerimenti, un grafico dei conteggi, valori a zero, le persone della vita nelle liste, il seme ✧ tra i risultati
(sta in «le mie frasi»).

---

## 4. Il sistema visivo

### 4.1 Tipografia

| ruolo | font (licenza) | corpo a 390 / ≥ 900 px | note |
|---|---|---|---|
| testo, titoli, corsivo | **Source Serif 4** variabile (SIL OFL 1.1), con il vero corsivo | 18 / 20 px, interlinea 1,45 | `font-optical-sizing: auto`; titoli a opsz 48, frasi della soglia a opsz 36 |
| segni ✦ ✧ ● ◌ ○ ⚠ | **Noto Sans Symbols 2** (SIL OFL 1.1), sottoinsieme di 6 glifi | 0,7 em, alzati di 0,12 em | un solo disegno per tutti i segni, in ogni sistema |
| codice dei gesti | il monospazio di sistema | 0,7 em | solo nel foglio dei gesti |

- **Misura**: 34em al massimo (≈ 66 caratteri, Bringhurst §2.1.2, letteratura 5).
- **Numeri**: minuscoli proporzionali nella prosa; maiuscoli tabulari nelle date di servizio e nei numeri delle voci.
- **Maiuscoletto** (`all-small-caps`, spaziatura 0,07–0,08 em) per le etichette, mai per le frasi.
- **Corpi**: frasi della soglia 1,32 em; corpo del frammento 1,18 em; date e luoghi 0,78 em.
- I font si servono dal guscio (self-hosted, `tecnica.md` §4.3), in WOFF2, sottoinsieme latino + i 6 segni: ≈ 90 KB
  fuori dal budget del guscio, in cache dal service worker. Il prototipo li prende da Google Fonts solo per comodità.

### 4.2 Colori

Due temi; il tema **segue il sistema** (`prefers-color-scheme`), senza interruttore (decisione H). Nessun colore fa da
segnale.

| token | chiaro | scuro | uso |
|---|---|---|---|
| `--carta` | `#f5f1e8` | `#151412` | fondo |
| `--campo` | `#ebe5d8` | `#0c0b0a` | il campo della tavola di una restituzione |
| `--inchiostro` | `#1c1a17` | `#e8e2d6` | testo, ✦, ●, la barra attiva |
| `--tenue` | `#6a645a` | `#9b9488` | date, luoghi, ◌, ○, righe di servizio |
| `--filo` | `#d9d1c1` | `#2e2b27` | fili, bordi, linee della tavola |
| `--sotto` | `#fbf8f2` | `#1d1b18` | il foglio dal basso |
| campo dei tatuaggi | `#11100e` | `#11100e` | sempre scuro; in stampa bianco |

Contrasti (WCAG): inchiostro su carta ≈ 16:1; tenue su carta ≈ 5,5:1 (AA anche per il testo piccolo); nello scuro
≈ 14:1 e ≈ 6:1. La prova B2 li misura.

### 4.3 Il peso dei segni

| segno | come si legge | resa |
|---|---|---|
| ✦ tua | la voce che regge | corsivo, inchiostro pieno, il segno in inchiostro |
| ✧ seme | voce mista | corsivo, inchiostro pieno, sempre in una riga a parte |
| ● accolta | un legame che hai fatto tuo | tondo, inchiostro pieno; la formula in tondo, mai corsivo |
| ◌ mia | la proposta | tondo, `--tenue`, peso 350; nello strato separato |
| ○ mondo | il fatto | tondo, il segno in `--tenue`, il luogo sotto in 0,78 em; senza luogo **non si rende** |
| ⚠ | da verificare | 0,62 em, alzato, inchiostro; mai nascosto, anche nei risultati |

La legenda solo nelle forme lunghe (lettera, ritratto, la tavola dei tatuaggi), in testa, solo i segni usati.

### 4.4 I movimenti

- Il foglio dal basso: 220 ms, `cubic-bezier(.2,.8,.2,1)`; il velo 200 ms.
- Lo zoom della tavola: 320 ms, scala 1,6.
- Il respiro della soglia: la seconda frase in 0,9 s, dopo 0,7 s. Una volta per apertura.
- Nient'altro si muove: niente parallasse, niente animazioni continue, niente scheletri di caricamento (i dati sono in
  memoria: un cambio di vista < 50 ms, `tecnica.md` §4.3).
- `prefers-reduced-motion: reduce` toglie tutti i movimenti.
- Bersagli ≥ 44 px; `:focus-visible` con un contorno di 2 px in inchiostro; la tastiera arriva ovunque.

---

## 5. I gesti

Il sito non scrive mai (decisione H; `tecnica.md` §3). Ogni gesto è un link
`shortcuts://run-shortcut?name=Memo&input=text&text=…`: apre il Comando rapido "Memo" con il testo già scritto, che puoi
cambiare prima di mandarlo. Da lì è un memo come gli altri: `ingresso/`, "smista", la lettura con il `ritorna-su`, il ●
al build dopo. Su Android il testo va negli appunti con «Incolla nel Memo».

Il testo porta sempre il **bersaglio esplicito** (`→ id`): la regola dei 3 giorni non basta per una restituzione
vecchia. Se il modello sceglierà un campo (`da-sito`, §7), cambierà il trasporto, non il testo.

| dove | gesto | testo pronto | che cosa ne fa "smista" |
|---|---|---|---|
| voce di una restituzione | accogli | `sì alla 1 → r-20261101-2130-lettera#1` | `ritorna-su`, `n: 1`, `come: accoglie` |
| voce di una restituzione | rifiuta | `la 1 no → r-20261101-2130-lettera#1` | `ritorna-su`, `n: 1`, `come: rifiuta` (→ Scarti) |
| voce di una restituzione | chiedi il perché | `perché la 1? → r-20261101-2130-lettera#1` | `ritorna-su`, `n: 1`, `come: chiede` |
| restituzione intera | un effetto | `mi ha fatto bene → r-20261101-2130-lettera` | `ritorna-su`, `come: effetto` (senza `n`: non è accoglienza) |
| frammento | aggiungi | `aggiungo su 20261003-1930-d4f1: ` (il cursore dopo i due punti) | `ritorna-su`, `come: aggiunge` |
| frammento | ripensa | `ci ripenso su 20261014-2201-g6k2: ` | `ritorna-su`, `come: ripensa` |
| frammento | metti nei tatuaggi | `questa tra i tatuaggi → 20261020-2214-k3q1` | `serve-a: tatuaggi` + `ritorna-su`, `come: aggiunge` |
| frammento | in una raccolta | `questa tra i <nome> → <id>` (il nome si scrive) | `serve-a` + `ritorna-su` |
| nodo citazione | correggi l'attribuzione | `non è di Rumi, è di  → quello-che-cerchi-ti-sta-cercando` | `ritorna-su`, `come: corregge`, `campo: attribuita-a` |
| nodo opera | correggi l'autore | `l'autore di <nome> è  → <slug>` | `come: corregge`, `campo: autore` |
| nodo raccolta | dai lo scopo | `i tatuaggi servono a  → tatuaggi` | lo scopo con parole tue (A30) |
| fruizione | fatta | `finito → <slug>` | `nomina` con `fruizione: fatta` |
| nodo (tipo, specie, campo) | correggi lo scaffale | `twin peaks è un film, non una serie → twin-peaks` | `ritorna-su`, `come: corregge`, `campo: tipo` (o `specie`, `campo`; bersaglio il nodo stesso, dimensioni §3.3) |

Nessun gesto è un bottone "accetta/rifiuta" dentro una lista: stanno solo nel foglio di una voce o in fondo a una
pagina, uno alla volta (nessuna coda di validazione, atlante-sito §4.2.4).

---

## 6. Che cosa NON c'è nel sito, in una lista

La mappa globale; la sala a 360°; il Firmamento; l'interruttore binario delle proposte; la pagina «da validare»;
"un anno fa oggi"; sparkline; scale di colore; contatori di attività; streak; badge; notifiche; "non letti";
il tempo di lettura; "potrebbe interessarti"; embed di terzi (Pinterest, YouTube, Spotify); oEmbed nel browser;
analytics; «Modifica su GitHub»; un login fatto da noi (c'è Access); un editor; la cronologia delle ricerche; una
vista "le frasi più forti"; i delicati nella soglia, nei mesi, nelle tavole, nelle anteprime, nei filtri; le emozioni
dedotte; i valori a zero nei filtri; una colonna di faccette sul telefono.

---

## 7. Che cosa chiede al modello e agli script di `main`

**Solo proposte.** Nessun file normativo è toccato da questa sessione; decide il coordinatore, e l'implementazione le
fa dopo il blocco 6.

### 7.1 Funzioni pure da esportare (da `scripts/contesto.mjs`, salvo dove detto)

Oggi `contesto.mjs` esporta `carica`, `parlante`, `righeAlias`, `contesto`; il resto è interno (`stato`, `righeNodi`,
`recenti`, `voceParole`, `periodi`, `righeSeme`, `righeConti`, `correzioni`, `righeScarti`, `dataTetto`, `tetto`…).
Il sito deve importare le regole, non riscriverle (`tecnica.md` §2.1, §7.3). Ogni funzione riceve l'archivio `a` di
`carica()` e restituisce dati, non markdown:

| funzione | restituisce | la usa |
|---|---|---|
| `statoLegami(a)` | per ogni legame: voce, `accolto` (●), `rifiutato`, `sbiadito`, con la data | nodo, frammento, tavole |
| `statoVoci(a, idRestituzione)` | per ogni `n`: ●, rifiutata, chiesta, con il frammento che lo dice | restituzione |
| `giorniAttivi(a)` | l'elenco dei giorni attivi | tempo, ritorno, sbiadito |
| `periodoDelicato(a, oggi)` | `true/false` e le date | soglia, ogni vista |
| `delicatiAperti(a)` | i delicati non ancora ripresi (da escludere dall'archivio principale) | build |
| `ricordabili(a)` | l'elenco **intero** ordinato (la `mappa.md` ne dà 20 a caso) | ritorno, soglia |
| `codaLunga(a, elenco)` | la voce della coda lunga di un elenco | nodo, frasi, tempo |
| `porte(a, slug)` | le 3–5 frasi ✦ più forti di un nodo | nodo, soglia |
| `vicini(a, id)` | i vicini di un frammento (oggi in `smista.mjs vicini`) | frammento |
| `posizioni(a)`, `conti(a)`, `fruizioni(a)`, `scarti(a)` | le sezioni di `mappa.md` come dati | tempo, assenze |
| `dataTetto(f, l)` e `tetto(d)` | la data-tetto e la sua frase | ovunque |
| `cambiLettore(a)` | le date in cui cambiano `letto-da` o `prompt` | tempo |
| `citatoIn(a)` | per ogni frammento, le restituzioni che lo citano (voci, `aggancio`, corsivi del corpo) con il luogo | frammento |
| `corsiviDelCorpo(testo, a)` (da `verifica.mjs`, che già controlla i corsivi) | i tratti in corsivo ✦ e il frammento e la riga da cui vengono | restituzione, soglia |
| `frasiCheTengono(a, x, y)` | i frammenti ✦ che portano entrambi i nodi | tavola del nodo |
| `tavolaRaccolta(a, slug)` | pezzi con misura, fili, il ◌ dei margini, i filtri della stampa | tatuaggi |
| `assenze(a)` | al più tre, con i numeri | assenze |
| `faccette(a)` | per ogni frase ✦, i valori dei sei assi (un passo, più l'autore e l'`in`), ciascuno con la voce del legame | Esplora, nodo (intorno), frammento |
| `gesti(a, id)` | i gesti di una frase (dimensioni §1.6) | Esplora |

Un test `node --test` per ciascuna, sui dati sintetici di `test/`.

### 7.2 Campi e righe che mancano

1. **Il bersaglio del gesto.** O l'id nel testo del memo (come oggi nel §5), o un campo di frontmatter del frammento
   (`da-sito: r-…#3`) scritto dal Comando rapido. Il campo è più pulito: le parole restano sacre e "smista" non deve
   riconoscere un id dentro il testo. Lo decide il modello (`tecnica.md` §3).
2. **Il titolo dei pin salvato.** `link[].titolo` esiste nella lettura; va garantito che "smista" lo scriva sempre
   (vista-tatuaggi §4.4), perché la build non chiama Pinterest.
3. **Una riga in `modello-v3.md` §6.3** per due viste nuove: «la tavola di una raccolta: i frammenti ✦ con `serve-a`
   come pezzi, misura da `reazione` e ritorni, fili dai nodi nominati in comune, al più un ◌ fuori campo; stampabile come
   brief, senza delicati e senza persone `vita`» e «la soglia: la coppia d'aggancio dell'ultima restituzione fresca,
   altrimenti un ricordabile al giorno; niente in un periodo delicato».
4. **La coppia d'aggancio.** Oggi una restituzione ha `aggancio` (una frase) ma non dice quale seconda frase ✦ le mette
   accanto. Proposta: nessun campo nuovo; la seconda frase è la prima voce con `cosa: ponte | convergenza | confronto` e
   `rif` a un frammento. Se il corpo la cita solo in corsivo, `corsiviDelCorpo` la trova. Da confermare con il formato del
   piano.
5. **Lo schema 4** (dimensioni §3): `tipo` sulle opere, `specie` sui temi, `campo` su persone (non `vita`), opere e
   correnti; `brano` → `canzone` in `voci[].cosa`; la sezione «Da classificare» di `mappa.md`; il congelamento in
   `verifica.mjs`; la migrazione 004 (58 valori su 49 nodi; letture e restituzioni non si toccano). Senza lo schema 4 Esplora funziona a metà: cose solo per opera,
   temi senza specie, niente campo.
6. **Il ritorno sul sito non consuma il ricordabile.** Il sito non scrive, quindi la frase tornata sulla soglia può
   tornare anche in una lettera. Si accetta; se disturba, la lettera può escludere il ricordabile del giorno (è
   deterministico).

---

## 8. I blocchi di costruzione, con le prove e i costi

Tutte le prove girano su dati sintetici (il prototipo ne contiene un primo insieme). I costi sono giorni di lavoro di
una sessione; quelli tecnici vengono da `tecnica.md` §8, ridistribuiti per vista.

| blocco | che cosa | prova (criterio verificabile) | costo |
|---|---|---|---|
| **B0** | prototipo Access + service worker su iOS standalone | a sessione scaduta l'app mostra «Accesso scaduto. Rientra» e non resta bianca; fatto a mano sul telefono, con foto | 0,5 |
| **B1** | le funzioni pure di §7.1 in `main` (chieste, non fatte qui) | `node --test` verde; ogni funzione ha un caso con delicato, importato, ◌ sbiadito, ● | (a `main`) |
| **B2** | `sito/costruisci.mjs`: carica, calcola le viste, i due blob, i controlli | la build fallisce se: un ○ senza `riferimento`; un ● letto da file; un delicato non ripreso in `archivio.bin`; un nome `vita` nel guscio o nei nomi dei file; test sui dati sintetici | 3,5 |
| **B3** | il guscio: routing, sistema visivo, segni, strati, foglio | axe senza errori; contrasto misurato ≥ 4,5:1 per `--tenue` nei due temi; a 390 px nessuno scorrimento orizzontale su ogni vista; `<title>` sempre «Mnemosyne»; foto 390×844 @2 dei due temi | 2,5 |
| **B4** | soglia, restituzione, frammento | i tre stati della soglia dai dati sintetici; la coppia è transclusa (cambiando il frammento di prova cambia la soglia); **giudice cieco** (sotto) | 2 |
| **B5** | nodo e tavola del nodo | la prima e l'ultima frase; l'intorno uguale ai conteggi di Esplora con «da <nodo>»; la tavola solo sopra la soglia (§3.5); nessun `vita` nell'intorno né nella tavola; tastiera: Tab, Invio, Esc; **giudice cieco** sul nodo | 2 |
| **B6** | tempo, le mie frasi, assenze | «le mie frasi» rispetta la ricetta riga per riga (≤ 8 ✦, una coda lunga, ✧ a parte, nota una volta per gruppo): il controllo è lo stesso di `verifica.mjs` sui corsivi; i conti uguali a `mappa.md` carattere per carattere | 1,5 |
| **B7** | **Esplora**: indice, motore delle faccette, foglio, chip, parola, URL (dopo lo schema 4) | le 12 domande di dimensioni §6 come test automatici sui dati sintetici (combinazione → frasi attese); nessun numero diverso dalle frasi mostrate; nessun valore a zero; nessun delicato in un filtro; nessun nome `vita` nelle liste; «zio» (3 lettere) e l'accento piegato; **giudice cieco** sulle 12 domande | 2,5 |
| **B8** | tatuaggi e stampa | i pezzi = i frammenti ✦ con `serve-a`; la stampa (PDF di Chromium) non contiene ◌, delicati, nomi `vita`: verificato estraendo il testo del PDF | 1 |
| **B9** | cifratura, offline, immagini, deploy | il blob non si apre senza passphrase; offline la soglia si apre dalla cache; nessuna richiesta verso terzi (CSP e log di Playwright) | 3 |
| **B10** | un mese d'uso | l'utente dice dove l'ha aperto e che cosa ha letto; si correggono le tre cose che dice | 0,5 |
| | **totale** | | **~19** |

**Il giudice cieco della soglia (B4).** Tre subagent separati, che non hanno visto né il progetto né il ragionamento,
ricevono solo le foto 390×844 della soglia nei due temi e dei suoi tre stati, con un brief di tre righe («tieni un
archivio di pensieri; questo è il sito con cui lo leggerai»). Domanda: «ti dà meraviglia? sì o no; "sì con riserve"
vale no». Passa con **3 sì su 3**. Un secondo giudice, con `CLAUDE.md`, cerca le violazioni (segni, corsivi, delicato,
rumore) e passa con **zero violazioni sostanziali**. Al più tre giri; gli esiti si scrivono nel commit.

---

## 9. Gli esiti dei giudici sul prototipo

### 9.1 La soglia e il nodo vecchio (3 novembre)

Due subagent separati, senza il ragionamento di questa sessione, a ogni giro. **Giudice A** (le regole): ha
`CLAUDE.md`, il prototipo e le foto, e cerca le violazioni. **Giudice B** (la meraviglia): ha solo cinque foto
(soglia chiara, scura, desktop; nodo; tavola del nodo) e un brief di tre righe; risponde sì o no, e «sì con riserve»
vale no. Al più tre giri.

| giro | giudice A (regole) | giudice B: soglia | giudice B: nodo |
|---|---|---|---|
| 1 | **non passa**: 9 violazioni, 4 sostanziali (un ○ senza passo sul nodo citazione; la coppia della lettera non era forte e il ◌ era una convergenza banale; conti con gli importati dentro e un «30 giorni attivi» impossibile; vicini senza legame nella tavola) | **no**: «sotto c'è una griglia di quattro riquadri che sembra un menu» | **no**: «le stesse quattro frasi compaiono due volte», una riga tecnica in testa |
| 2 | **non passa**: 4 sostanziali (la lettera diventava due cose, Weil sull'attenzione e la coppia sull'attesa; un ⚠ mancante su un legame a una citazione; un conto con un importato; le porte con frasi ✦ nel periodo delicato) | **sì**: «due mie frasi che si smentiscono, con 15 giorni in mezzo, e nient'altro: mi colgo in flagrante» | **no**: «sembra il pannello di un database»; la frase più bella sepolta sotto «le porte» |
| 3 | **passa**: nessuna violazione sostanziale; i conti tornano con i frammenti sintetici. 9 minori | **sì**: «è come trovarmi colto in flagrante da me stesso. Non c'è niente intorno e niente spiega» | **no**: la parte alta tiene; poi un vuoto lungo e il selettore a pillola: «smetto di leggermi e comincio a usare un programma» |

**Che cosa è cambiato tra i giri.**
- La soglia ha una sola coppia nella prima schermata; le porte sono dopo lo scorrimento e senza frasi.
- La lettera sintetica è diventata una tensione (14 e 29 ottobre), con una sola voce ○ verificata sullo stesso tema e la
  chiusa su una frase ✦ che tiene insieme attenzione e attesa.
- Il nodo si apre come la soglia, con due frasi accostate; conti, genere e selettore sono scesi sotto.
- Ogni ○ ha il suo luogo; i conti escludono gli importati.

**Dopo il terzo giro** (non rigiudicate, perché i giri erano finiti): le 9 minori del giudice A sono corrette (il ◌ dei
margini dei tatuaggi tolto, la legenda in ordine, il ✦ sul delicato aperto, un ⚠ doppio, le «» su un nome, una
promessa della ricerca, un'assenza che suonava come sollecito, il segno nel foglio della voce). Sul nodo: è sparito il
vuoto, e il selettore è sceso sotto i conti, in piccolo; la pagina finisce su una frase.

**Esito: il nodo non è passato al giudice della meraviglia in tre giri.** La tensione è reale: il principio 4 vuole lo
stesso selettore su ogni vista calcolata, e il giudice lo legge come «un programma». La proposta, da provare in B5
con il giudice cieco: sul nodo il selettore diventa una riga di servizio in fondo alla pagina («mostra anche le mie
proposte»), e la tavola del nodo si offre solo quando ha almeno tre vicini tenuti da tue frasi (con due, «non mi
mostra niente che non sapessi già»).

### 9.2 Esplora e il nodo nuovo (4 novembre)

Due subagent separati per giro, senza il ragionamento della sessione. **Giudice A** (le regole): `CLAUDE.md`,
`dimensioni.md`, le sezioni nuove di questo documento, il prototipo e le foto. **Giudice B** (l'utente): solo il
prototipo e le 12 domande di `dimensioni-dati.md` §4 (con i nomi dei dati sintetici); a ogni domanda dice se ci arriva,
in quanti tocchi dalla soglia, se il risultato è giusto; poi sì o no a pancia su Esplora e sul nodo («sì con riserve»
vale no).

| giro | giudice A (regole) | giudice B: domande (sì · in parte) | tocchi medi | B: Esplora | B: nodo |
|---|---|---|---|---|---|
| 1 | **non passa**: 3 sostanziali (la migrazione toccava le restituzioni immutabili; la correzione di un valore congelato senza bersaglio; «penso» da una tensione dell'AI senza ◌) e 8 minori | 11 · 1 (Arendt fuori da «filosofia») | 2,7 | **sì** | **sì** (il fondo «sa di programma») |
| 2 | **non passa**: 4 sostanziali (la `a` della correzione dev'essere un frammento; «penso» con due definizioni; un'attribuzione a un personaggio inventata dall'AI; la specie senza ◌ in §3.4) e 6 minori | 10 · 2 (O dentro un asse; «da verificare» sotto «citazioni») | 2,3 | **sì** | **sì** |
| 3 | **non passa**: 1 sostanziale (`brano` → `canzone` dimenticato in `schema/piano.json` e `prompt/progetto.md`) e 13 minori | 11 · 1 (Arendt, di nuovo) | 2,3 | **sì** | **sì** |

**Che cosa è cambiato tra i giri.**
- Lo schema 4 tocca solo i nodi: letture e restituzioni restano a 3 e lo schema le accetta (dimensioni §3, §5).
- `forma` è diventato `tipo` (due significati di `forma` nel modello); il tipo ha sempre una fonte e non porta segno;
  specie e campo sono ◌, in pagina.
- «Penso» ha una definizione sola (i capi di un `contraddice` ✦ o ●; i proposti solo con la lente, con il ◌).
- La correzione di un valore ha come `a` il primo frammento di `nato-da`, non delicato e non importato.
- Esplora: «restringi» e «o anche» sotto il totale, senza tagli; gli esiti raffinano le citazioni; un tema raffina la
  sua specie; la parola è una chip. Il nodo: tutte le frasi insieme prima dell'intorno; l'intorno senza numeri e con
  etichette in parole; la persona della vita senza link a Esplora. La tavola dei tatuaggi calcolata dai dati.

**Dopo il terzo giro** (non rigiudicate, perché i giri erano finiti): la sostanziale è chiusa (dimensioni §3.2 e
§4.5); delle minori sono corrette: il vincolo di `piano.json` allargato a `migra`; `crea-nodo` rifiuta i tre campi
chiunque crei; `schema 3 o 4` anche per la restituzione in `CLAUDE.md`; il tipo non più «dal nome»; il bersaglio non
delicato e non importato; come `verifica.mjs` lega il congelamento alla correzione; il refuso e il ◌ in §3.12; il
margine ◌ dei tatuaggi; il conto di «mare» nelle assenze calcolato; il controllo `vita` sull'`attribuita-a`; «filosofia
◌» smorzata sulla soglia; l'etichetta del campo («e sulle correnti»); il ⚠ accanto a ogni frase che nomina una citazione
senza esito; l'opera che nomina le sue citazioni; più temi nell'indice. Il giudice B, giro 3, chiedeva anche il campo
«filosofia» per una citazione ⚠ attribuita a una filosofa: **non si fa**, per la regola del giudice A (un'attribuzione
non verificata non dà campo); la frase si trova da Persone e da «citazioni › da verificare».

**Esito.** Il giudice B ha detto sì a Esplora e al nodo in tutti e tre i giri: il nodo, bocciato tre volte nella
sessione precedente, passa. Il giudice A non ha passato nessun giro, con le sostanziali scese da 3 a 4 a 1; l'ultima è
chiusa ma non rigiudicata. Va rigiudicato in B5 e B7, con il giudice cieco.

---

## 10. Dubbi aperti

1. **Il nodo** (§9.2) ora passa il giudice dell'utente; resta da provare su dati veri, dove un nodo può avere 40 frasi:
   «le altre» sono 4, il resto è in Esplora. Il fondo («intorno alle tue frasi») è la parte che sa ancora un po' di
   programma.
8. **Una citazione ⚠ non dà campo** (dimensioni §1.5): «filosofia» non trova una frase che attribuisco a una filosofa
   finché "consolida" non la verifica. È prudente, ma l'utente se lo aspetterebbe (giudice B, giri 1 e 3).
9. **Lo schema 4 è una proposta** (dimensioni.md): senza, Esplora funziona a metà. Va deciso con la porta del blocco 6.
2. **La soglia ha una sola cosa, ma due stati che si alternano** (la coppia e il ritorno). Se le restituzioni sono
   frequenti, il ritorno non compare quasi mai. Da guardare dopo un mese (B10).
3. **Il campo scuro dei tatuaggi anche nel tema chiaro** è una scelta di forma, non di tema: va confermata dall'utente.
4. **L'intervallo in giorni** («15 giorni») è un numero calcolato, non preso da `mappa.md`. È un conto di calendario, non
   una soglia; se la regola 2 di `CLAUDE.md` lo volesse in `contesto/`, va tolto.
5. **Il bersaglio del gesto**: id nel testo o campo `da-sito` (§7.2.1).
6. **Le persone della vita nella pagina di un tema** (una tua frase che nomina «mio padre» come porta): sono parole tue,
   viste solo da te, e restano. Non diventano mai vicini né ponti.
7. **I font da Google nel prototipo**: nel sito vero sono self-hosted; il prototipo pubblicato chiama Google Fonts.
