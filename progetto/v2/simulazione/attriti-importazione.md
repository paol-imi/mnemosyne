# Attriti dell'importazione simulata

> Simulazione v2, 2026-10-31. Proposta di Claude, da validare. Raccoglie ciò che si è inceppato applicando le
> [regole](/progetto/v2/simulazione/regole-importazione.md) al campione di [importazione](/progetto/v2/simulazione/importazione.md)
> (sette lotti, uno per subagent). A1–A14 sono i rinvii già scritti nelle regole; A15–A31 sono emersi dai lotti.
> Gravità: **alta** = si perde significato o il modello si contraddice; **media** = ambiguità che lo script deve decidere;
> **bassa** = ritocco.

## 0. In breve

- **Numeri dell'importazione completa:** 169 file: 34 frammenti, 34 letture, 41 nodi (9 persone, 6 opere, 2 citazioni,
  23 temi, 1 raccolta), 60 restituzioni importate. Con le correzioni sotto: 35 frammenti (via `s02`, più `s04` e `u26b`), circa 52 nodi
  (+8 domande accolte, Dostoevskij, `nichilismo` dallo sguardo, patchwork e incisione; −napoleone), 60 restituzioni.
- **Banco di prova al giorno 1:** 20 domande su 25 hanno il materiale per una prima risposta, 4 in parte (D07 Eraclito,
  D08 Buddha e la rabbia, D09 le tensioni, D14 Dostoevskij), 1 è un buco (D21, i tatuaggi da Sisifo).
- **Campione delle convergenze:** 12 voci puntano a un nodo, 21 al mondo; 3 su 8 restano mute nel grafo.
- **I cinque più gravi:** A16, A1, A15, A7, A8.

## 1. Gli attriti

| # | gravità | attrito | correzione proposta |
|---|---|---|---|
| A1 | **alta** | **Convergenze mute.** Con §8.5 del modello diventano nodi solo le entità nominate da lui. Nel campione C13 non ha nessun nodo: il suo `converge-con` ha un capo solo e non è un legame. C8 e C25 ne hanno uno solo. Nell'import completo restano senza nodi anche C10 e C20. La prosa resta, ma il grafo non la vede. | `tra:` ammette anche le voci della restituzione (`r-…#v2`), e l'indice registra per nome le voci `mondo:` delle restituzioni importate: "Eraclito" o "Sisifo" si trovano senza un nodo. Il nodo nasce al primo frammento suo. |
| A2 | **alta** | **Frasi miste seme/utente.** U2, U4–U17 e U10 sono parole sue messe per iscritto da Claude nel seme, con etichette di Claude (U5: "Guida e condottiero" per "il condottiero"). U17 è una sua reazione in coda a una voce del catalogo di Claude. U21–U31 sono virgolettati dentro la prosa di Claude. `voce` ammette solo `sua` o `seme`. | Per l'importato `voce: sua` più `forma: riportata` (frase sua scritta da altri). Il corpo è solo la frase; l'etichetta di Claude va nel `contesto` della lettura. Le risposte "solo le mie" la mostrano ✦ con un segno di riporto. |
| A3 | **alta** | **La stessa frase vive due volte.** U1, U3 e U10–U17 sono copiati nel nucleo `s01`; U2 e U10 nel racconto `s03`. Il brief `s02` rimonta U15–U17, M6 e M7. C1 si apre con U4 e C16 contiene M3. n.75 vedrebbe la stessa frase con due voci. | Nessuna copia genera legami o `nato-da` (R2 esteso a tutte le copie). Si toglie `s02`: il brief è una **vista** dei frammenti con `serve-a: tatuaggi`. |
| A4 | media | **Ora ignota.** L'id `0000` fa sembrare mezzanotte, e la vista "di notte" li conterebbe. `registrato: 2026-10-04` è un limite che il campo non dichiara, mentre il commit `030c29a` ha un'ora (22:12). | Per `canale: importato` ammettere `registrato` con la sola data; il limite va in `vissuto: "≤2026-10-04"`. Ogni vista oraria esclude gli importati. |
| A5 | media | **Data e nome delle restituzioni importate.** `creato` della nota non è la data del passo: il blocco di C25 è del 2026-10-06, la nota del 2026-10-04. Con l'ora `0000` sei ritratti dello stesso giorno collidono; i suffissi `-cNN` e `-tNN` sono arbitrari. | La data è quella della riga di `## Evoluzione` (o del commit) del passo. Il suffisso è lo slug dell'idea o della convergenza (`ritratto-discesa-di-sisifo`). Il modello lo dichiara per le importate. |
| A6 | bassa | **Frasi sul sistema.** U27–U31 stanno sia nei frammenti sia nel `CLAUDE.md`. U28 ("dimmi tu") e U30 ("vai con la mappa") sono un `accogli` senza referente importato. | `intento: [accogli]` senza `atti`, salvo U30 (vedi A14); il `contesto` dice che cosa accolse. |
| A7 | **alta** | **L'aggancio non ha un campo, e lo sguardo non si cita per passo.** Le regole usano `per`, che nel modello vuol dire "chi l'ha chiesta": un indice che segue le catene (n.37 → 40) prenderebbe U4 per una domanda. M1–M7 hanno un id solo: C5 e C8 agganciano lo stesso `s01`, e un `contraddice` su M3 renderebbe superato anche M1. | Un campo `aggancio: {di: <id>, passo: "nucleo:19"}` sulle restituzioni, e il qualificatore `passo` ammesso in `ritorna-su`, `contraddice` e `accoglie` verso un frammento-sguardo. In alternativa si spezza `s01` per sezioni, ma si perde l'unità del nucleo. |
| A8 | **alta** | **Le citazioni di Claude non si possono importare corrette.** Delle 17 voci vive, [citazioni §4](/progetto/v2/citazioni.md) ne corregge 2 (Marco Aurelio V 20, Jung). Le altre 15 restano `prova: memoria`, che citazioni §3 vieta a Claude di proporre. 7 delle 9 correzioni di §4 (Nietzsche § 146, Cioran, Yalom, l'ombra di Jung, Campbell, Rollo May, Sagan) riguardano entità che **non** si importano. E una restituzione è immutabile, quindi non può ricevere l'`esito`. | Prima dell'import si passa il protocollo sulle 17 vive (6 subagent da tre). Le correzioni sulle entità morte si fanno sull'Atlante pubblico, fuori dallo script. Il nodo citazione nasce con l'`esito` quando lui ne accoglie una. |
| A9 | bassa | **Concetti e stili.** Stoicismo e romanticismo diventano temi; patchwork e incisione, che lui nomina (U16, U17), restano parole perché R5 e R11 hanno elenchi chiusi. | R5b: un concetto o uno stile nominato da lui diventa tema al primo nome (modello §2.6). |
| A10 | bassa | **Le band come persone** (Radiohead, Deftones). | Si accetta `persone/` per i gruppi, `cerchia: mondo`; lo dice una riga del modello. |
| A11 | media | **Sbiadimento di massa.** 60 restituzioni importate ◌ sbiadirebbero tutte lo stesso giorno, il 60°. | Le importate non sbiadiscono: sono già fuori dai conti e salgono solo se un frammento le tira. |
| A12 | bassa | **Fruizione dei Pensieri** (U24): `in-corso` misura il lavoro di Claude, non la sua lettura. | `fruizione: da-fare`; lo stato della ricerca va nel `contesto`. |
| A13 | bassa | **Emozioni di Claude escluse.** "Malinconica" (U13) però è parola sua. | Va bene così: `malinconia` nasce alla seconda occorrenza. |
| A14 | media | **Le 8 domande.** Il modello §2.5 le vuole temi "voce seme", ma un nodo non ha voce e le note sono `origine: claude`. Le regole le tengono fuori, ma hanno `validata: true`, U30 ("vai con la mappa") le approva e "cosa c'è oltre?" sono parole sue (U3). | La lettura di U30 **accoglie** le 8 voci di `r-20261007-0000-ritratto-domande`: nascono 8 temi ● (i cori restano fuori). Si corregge §2.5. |
| A15 | **alta** | **M8–M10 non stanno nel nucleo.** Le tre tensioni, virtù e fortuna, evoluzione stanno in tre note di mappa: con corpo = `nucleo.md` si perdono. `divina-commedia` ("Dante cristiano", M8) non ha un frammento da cui nascere, e D09 (le tensioni) resta a metà. | Un quarto frammento-sguardo `s04`, `voce: seme`, con `concetti/tensioni.md:15–17`, M9 e M10 e la loro provenienza. |
| A16 | **alta** | **Il modello contraddice §8.5.** §5.2 dà per esistenti `nichilismo` e `friedrich-nietzsche`, §7.4 `sisifo`, Tiziano e von Stuck, ma nessuno nasce. `nichilismo` sta solo nel nucleo, come negazione e con voce seme. Gli slug importati sono quelli dell'Atlante (`camus`), mentre §5.2 usa `friedrich-nietzsche`. | Decidere che **lo sguardo** (`s01`, `s04`) fa nascere nodi e il racconto `s03` no, altrimenti nascono Iside, Fludd e Ofanim. Correggere §5.2 e §7.4. Gli slug dell'Atlante si conservano. |
| A17 | media | **Sisifo, buco di D21 (n.82).** Nessuna frase sua lo nomina; nel grafo il vicinato è vuoto, e per testo si trovano C4, C16, la discesa, il grimorio e s03. | Si risolve con A1 (le voci indicizzate per nome). Il nodo `opere/sisifo` nasce al primo frammento, e lì si ricollegano le importate. |
| A18 | media | **Dostoevskij** (U31) è nominato da lui ma manca dalle 13; §7.6 presuppone 2 citazioni. | Un nodo `persone/dostoevskij` con `nato-da: [20261031-0000-u31]`; le 2 citazioni dell'Atlante come voci ◌, verificate prima (A8). |
| A19 | media | **"Testo esatto" contro il markup della nota.** Etichette, slug, `>` e `\` di a capo, link interni. In U18 e U20 la cornice (forse di Claude) è l'unica che nomina Rust ed Henley. | R1: corpo = testo grezzo senza markup, link interni resi in testo, a capo conservati. La cornice va nel `contesto`; i nodi che nomina nascono con voce `seme`. |
| A20 | media | **Provenienza senza campo.** `link` della lettura serve sia alla riga d'origine sia ai link del messaggio (in U26 si mescolano GitHub e i pin); le restituzioni importate non hanno `link`. | Un campo `fonte: file:riga@4c9fdce` sulle letture importate e sulle restituzioni importate. |
| A21 | media | **`sente` su un percorso.** U1 elenca dieci emozioni come tappe passate: "che cosa sentivo a ottobre" le mostrerebbe tutte insieme. | `parla-di` per le tappe; `sente` solo per lo stato d'arrivo (calma, pace interiore), con `vissuto`. |
| A22 | bassa | **`intento` non deciso** per U1–U26. | `intento: [salva]` di default. |
| A23 | bassa | **✧ su passi non validati.** C5, C8 e C16 prendono la voce seme anche dove il passo sta in idee del seme mai approvate. | Se una parte del passo viene da un'idea non validata, tutta la convergenza è ◌. |
| A24 | bassa | **Una proposta dentro lo sguardo.** Il blocco sul grimorio sta nel corpo di `s01`. | R2 toglie i blocchi proposta dal corpo, come R4; il grimorio vive già in `r-…-ritratto-grimorio`. |
| A25 | bassa | **U26 unisce due pin** di due idee diverse. | Due frammenti, `u26a` e `u26b`. |
| A26 | bassa | **Rust personaggio o serie.** C5 e C25 puntano a `rust-cohle`, C11 a `true-detective-s1`. | Il personaggio quando il passo parla di lui, l'opera quando parla della serie. |
| A27 | bassa | **`contesto/recenti.md` tiene 30 voci**, le importate sono 34. | Un file a parte, `contesto/punto-zero.md`. |
| A28 | bassa | **Modello §2.4**: il paragrafo sullo stato è finito in mezzo alla tabella delle voci, e ◌ ○ ne escono. | Spostarlo dopo la tabella. |
| A29 | bassa | **Eredità da ritoccare.** U10 ha la fonte primaria in seme:258 (copia 633); C1 ha 8 voci (c'è anche il Milite Ignoto), C13 ne ha 4 (il serpente); l'aggancio di C22 oscilla tra U1 e U8. | Correggere le tabelle di eredità §1.1 e §2. |
| A30 | media | **Lo `scopo` della raccolta tatuaggi** non ha parole sue; la migliore riga è in M12, con voce seme. | `nato-da: s03` per ora; glielo si chiede alla prima risposta sulla raccolta. |
| A31 | bassa | **Napoleone nasce da un aggettivo** ("resilienza napoleonica"). | Basta il tema `resilienza-napoleonica`, con "Napoleone" come alias; il nodo persona nasce solo se lo nomina. |

## 2. I buchi del banco di prova

| domanda | che cosa manca | correzione |
|---|---|---|
| D21 (n.82, tatuaggi da Sisifo) | il nodo `sisifo` e il suo vicinato | A1 + A17 |
| D14 (Dostoevskij) | il nodo e le 2 citazioni | A18 |
| D09 (le tensioni) | M8 | A15 |
| D07 (Eraclito) | un nodo che tenga insieme fr. 60 in tre posti | A1 (le voci indicizzate per nome) |
| D08 (Buddha e la rabbia) | il legame sta in una fonte di Claude non importata | nessuna: è giusto che resti fuori; la risposta lo pesca dal mondo con il suo `perche` |

Il dettaglio domanda per domanda è in [importazione §0](/progetto/v2/simulazione/importazione.md).
