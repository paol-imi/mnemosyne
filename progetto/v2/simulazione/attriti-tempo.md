# Attriti del tempo

> Simulazione v4, 2026-10-31. Proposta di Claude, da validare. Gli attriti trovati eseguendo le prove T01–T10 sul
> [modello v3](/_progetto/v2/modello-v3.md), come descritto in [prove di tempo e uso](/_progetto/v2/simulazione/prova-tempo.md).
> Gravità: **alta** = si perde qualcosa di suo, o il sistema dice il falso senza saperlo; **media** = ritardo,
> doppione o ambiguità che lo script deve decidere; **bassa** = ritocco.

## 0. In breve

| | attrito | gravità | prova | misura |
|---|---|---|---|---|
| V2 | il tetto di 80k cade al 4° mese; la regola di taglio non toglie niente | **alta** | T08 | 224k token a un anno |
| V3 | il sigillo d'ufficio di una chat viva perde turni | **alta** | T04 | 10 turni persi su una pausa di 2 h 15 |
| V5 | i ritornelli a "≥ 3 parole di contenuto" non vedono le metafore brevi | **alta** | T07 | 2 trovati su 6 metafore, 8 falsi nel disciplinato |
| V6 | Q-eco senza base lessicale dà falsi allarmi; frammenti o parole? | **alta** | T07 | 31% contro 5,0% |
| V8 | l'atto `corregge` non nomina il nodo | **alta** | T03 | — |
| V9 | la taratura del lettore non ha un posto né uno script | **alta** | T06 | 0,7–1,1 M token |
| V12 | lucchetto rubato a una sessione viva e lenta | **alta** (rara) | fuzz | 1 run su 2000 |
| V1 | uscita al passo 2 con un fire fallito: il memo aspetta la passata | media | T01, fuzz | fino a 119 min |
| V4 | la parafrasi trova l'ago solo con l'espansione dell'AI | media | T08 | rango 318 → 1 |
| V7 | Q-nomi e Q-contesto si fanno riciclare dall'eco | media | T07 | 100% e 3% nello scenario che colonizza |
| V10 | "smista" esce sul lucchetto; "consolida" non svuota la coda | media | T09 | 3 h 13 min |
| V11 | *toccato* troppo largo: le proposte verso temi frequenti non sbiadiscono | media | T10 | 3,6% sbiadite in un anno |
| V13 | raffica spezzata tra giri o sessioni: due risposte | media | fuzz | 1672 run su 2000 |
| V14 | `contraddice` doppio, e il "fino a" senza formato | media | T05 | — |
| V15 | `ricordabili` come elenco: 10k token | media | T08 | 10.000 → 120 |
| V16 | ritocchi (banco T09, D7 di T09, Q-ancore su 6 dati, "zio", controlli [S]) | bassa | varie | — |

## 1. Alta

**V2 · Il tetto di `contesto/` (T08).** Con il profilo B il totale supera 80.000 token (caratteri/3,5) **a inizio
marzo 2027**, ~730 frammenti parlanti; a un anno è 223.800 (195.800 a caratteri/4). `parole.md` è l'85%, e le chat
ne fanno più della metà anche dopo il filtro dei turni. La regola del §6.1 ("via i più vecchi di tre anni senza
reazioni né ritorni") nel primo anno non toglie nulla, e "si passa all'MCP" non dice che cosa scrive `contesto.mjs`.
*Correzione* (§6.1): `parole.md` è una **finestra mobile dichiarata**: dal più recente all'indietro finché il totale
sta sotto il tetto meno il 10% di margine; la testata porta `tagliato: le parole prima del AAAA-MM-GG non sono qui`
(nel prototipo, a un anno: 2027-08-10, cioè 3 mesi; 4 col formato compatto). Formato compatto obbligatorio (una riga
per frammento, data corta, niente id: −13%). Il resto delle parole si raggiunge con `cerca` o con Specchio, e
l'istruzione del Progetto obbliga a dirlo. La regola dei tre anni si toglie.

**V3 · Il sigillo d'ufficio di una chat viva (T04).** "Smista" sigilla dopo 2 ore senza turni; se lui riprende a
scrivere nella stessa sessione Specchio, Specchio riscrive `ingresso/` e al suo sigillo sovrascrive il frammento:
10 turni persi, una lettura scritta due volte, un frammento "immutabile" riscritto. *Correzione* (§3.2, §8.2):
il sigillo d'ufficio solo alla **prima passata dopo le 04:00 del giorno dopo**; e Specchio, se trova la propria chat
già sigillata, continua in un frammento nuovo con `continua: id` senza toccare il vecchio (simulato: 0 turni persi).

**V5 · I ritornelli (T07).** Le metafore che colonizzano sono brevi: "chi apre la porta", "la soglia del buio",
"il fuoco che resta" hanno **due** parole di contenuto. La regola del §9.4 e del §9.5 (≥ 3 parole di contenuto) ne
trova 2 su 6 nello scenario che ripete, e nello scenario disciplinato produce **8 falsi** (sequenze di parole comuni
messe in fila dalla rimozione delle parole vuote) e fa rifiutare a `verifica.mjs` **5 restituzioni a torto**.
*Correzione*: ritornello = **due parole di contenuto entro una finestra di 4 parole del testo vero**, fuori dalle «»,
in ≥ 3 restituzioni, assenti dai ✦; `verifica.mjs` rifiuta alla terza comparsa. Misurato: 0 falsi nel disciplinato,
le 6 metafore tutte trovate nell'altro ("fuoco che resta" ×28, "apre la porta" ×22).

**V6 · Q-eco (T07).** "Parole nate in una restituzione" senza filtro prende le parole comuni che l'AI ha usato per
prima per caso ("treno", "notte", "silenzio"): 31% di frammenti con eco nello scenario disciplinato, allarme fisso.
E il v3 ("in % sulle tue parole del mese") e il banco (D4: "5% ± 1", che torna solo in frammenti) misurano due cose
diverse: lo stesso eco vale 5% o 0,5%. *Correzione* (§9.5): una **base lessicale** versionata (un elenco di
frequenza dell'italiano, le prime ~10.000 forme, più il lessico ✦ e ✧) esclusa dal conto; Q-eco **in frammenti**
del mese; allarme sopra il 10% o al raddoppio. Misurato: 5,0% esatto nel disciplinato (i 9 piantati), 15% nello
scenario che ripete (33% a febbraio), con le parole giuste ("trasformazione", "lucidità", "soglia", "porta").

**V8 · `corregge` senza nodo (T03).** `a` punta al frammento, ma `campo: attribuita-a` è di un nodo, e un frammento
può nominare più nodi; mancano anche `da` e la regola per i campi lista. *Correzione* (§4, §3.7): qualificatori
`nodo: slug` e `da: valore`; su un campo lista si sostituisce `da` con `valore`; `valore` accetta `@Nome` quando il
campo è `autore`, `attribuita-a` o `in`. E niente v2 della lettura colpita per una correzione di nodo: il §3.3
("un atto non riscrive mai la lettura di un altro") e il §4 ("consolida scrive la versione nuova della lettura
colpita") si contraddicono; vince il §3.3, "consolida" aggiorna solo il nodo. Fino a domenica, in `mappa.md` sotto
il nodo: `attribuita-a → jordan-peterson (corregge id, in attesa)`.

**V9 · La taratura del lettore (T06).** Senza `.indice/` il risultato non ha dove stare; non c'è uno script; il
branch delle letture M2 non è previsto; il costo non è dichiarato. *Correzione* (§11): file `taratura/AAAAMMGG.md`
(frequenze M1/M2 per tema, scarto, decisione), citato da `mappa.md`; `migra/tara.mjs` [S] conta; la rilettura è una
migrazione semantica con lucchetto, a lotti di 20 frammenti per subagent; campione **stratificato per tema** (≥ 20
per tema con ≥ 30 frammenti), non per mese; "cambio di lettore" = data della taratura, per `letto-da` **o** `prompt`.
Tetto dichiarato: ~1 M token.

**V12 · Lucchetto rubato (fuzz).** Una sessione viva che resta più di 20 minuti senza rinnovare (un passo AI lungo)
si vede prendere il lucchetto, e poi cancella con il suo rilascio quello del nuovo detentore: 4 letture scritte da
due processi in 1 run su 2000. *Correzione* (§8.1): **fencing**, al rinnovo e prima del rilascio, dopo il pull,
`.in-corso` deve portare ancora il proprio id, altrimenti la sessione abbandona senza spingere (17 abbandoni nel
fuzz, 0 doppi).

## 2. Media

**V1 · Uscita al passo 2 con un fire fallito.** La sessione esce se vede un memo più recente, dando per scontato che
il suo fire parta: se è fallito, tutti aspettano la passata delle 3 ore (119 min in T01; 393 memo nel fuzz).
*Correzione*: uscire solo se il memo più recente ha meno di 4 minuti, poi rifare il pull; se è ancora lì, procedere.
Il Comando rapido ripete il fire su un errore HTTP.

**V4 · La parafrasi (T08).** Con il lessico realistico ("segno" in 572 frammenti, "famiglia" in 577) la ricerca
lessicale mette l'ago al rango 318; con l'espansione della domanda fatta dall'AI (zio, cicatrice, polso, addosso,
pelle) al rango 1. *Correzione* (§7.3): `cerca` dell'MCP e Specchio espandono sempre la domanda (sinonimi e
parentele, 6–10 parole) prima di cercare, e dicono che la risposta viene dalla ricerca; indice con parole da **3**
lettere ("zio", "dio", "re").

**V7 · Il riciclaggio degli indicatori.** Quando lui riprende le parole dell'AI, queste diventano ✦: Q-nomi resta al
100% e Q-contesto al 3% anche nello scenario che colonizza. *Correzione*: per Q-nomi e Q-contesto contano solo i ✦
**anteriori** alla prima restituzione che usa la parola.

**V10 · Arretrato dietro "consolida" (T09).** "Smista" esce sul lucchetto e il 12° memo aspetta 3 h 13 min; in più
"consolida" lavora sulla settimana mentre 11 memo sono ancora in `ingresso/`. *Correzione*: anche "smista" aspetta il
lucchetto (fino a 45 min, un pull al minuto; da verificare sui limiti delle Routine); il primo passo di "consolida"
è un giro di "smista" sulla coda.

**V11 · *Toccato* troppo largo (T10).** "Un frammento ✦ nomina uno dei suoi capi": il capo d'arrivo di quasi ogni
proposta è un tema, e i temi frequenti sono nominati ogni giorno. Sull'anno di T08 sbiadisce il 3,6% delle proposte.
*Correzione* (§5): *toccato* = un frammento ✦ porta **entrambi** i capi (o lo stesso legame), oppure un `ritorna-su`
alla proposta.

**V13 · La raffica spezzata.** Due giri della stessa sessione, o due sessioni, danno due risposte allo stesso
pensiero (1672 run su 2000; 673 con la correzione). *Correzione* (§8.2): raffica = tutti i memo della stessa sessione,
in tutti i giri; tra sessioni, se esiste una risposta con `per` a meno di 10 minuti, si aggiorna `copre` senza
notifica nuova (non simulato).

**V14 · `contraddice` (T05).** Possono scriverlo sia "smista" sia "consolida", e niente vieta i doppioni; non c'è un
criterio tra `sua` e `proposta`; la riga di `mappa.md` §6 non ha formato. *Correzione*: lo scrive solo "consolida";
[S] rifiuta due `contraddice` verso lo stesso `a` nella stessa lettura; `sua` solo se il nuovo nega con parole sue
un enunciato del vecchio; riga `vecchio-id (data) ⟷ nuovo-id (data) · voce · nodi comuni`.

**V15 · I ricordabili.** L'elenco di tutti gli id oltre i 60 giorni attivi pesa 10.000 token a un anno.
*Correzione* (§6.1, sezione 10): il conteggio e 20 id scelti a caso, ruotati a ogni rigenerazione (120 token).

## 3. Bassa

**V16 · Ritocchi.**
- Banco T09: la preparazione sospende la passata fino a sabato 23:59, l'azione la fa riprendere alle 06:00; con la
  passata di mezzanotte la prova è banale. Fissare: sospesa fino alle 05:59 di domenica.
- T09 D7 (≤ 5 min a sessione): il giro dell'arretrato dura ~15 min; il criterio va riferito al singolo memo.
- Q-ancore su 6 ancore è rumore: calcolarlo sul trimestre e solo con ≥ 15 ancore.
- Controlli [S] mancanti: `reazione.parole` sottostringa esatta del frammento (T06 D4); `verifica.mjs` controlla chi
  scrive le v ≥ 2, non solo la v1 (T03 D2); la verifica rapida del §7.2 vale solo per i nodi nuovi (T03 D6).
- "Ultimi 3 giorni" per una correzione: di calendario. L'esempio del §4 (`20270311-1822-p0x4`) va allineato al banco
  (21:10).
- "Consolida" che aspetta 30 minuti e non prende il lucchetto: ritenta alla passata successiva, scritto nel §8.1.
- Un lucchetto orfano più vecchio di 20 minuti lo cancella la passata delle 3 ore.
- Il ciclo della finestra di V2 va scritto lineare (somma cumulativa): 2,7 s → < 0,5 s.

## Collegamenti

- [Prove di tempo e uso](/_progetto/v2/simulazione/prova-tempo.md) · [Modello v3](/_progetto/v2/modello-v3.md) ·
  [Banco definitivo](/_progetto/v2/banco-di-prova-v2.md) · [Critica del tempo](/_progetto/v2/critica-tempo.md)
