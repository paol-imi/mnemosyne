# Progetto: dal tatuaggio al memo-coscienza

Documenti di progettazione (2026-10-31), proposte di Claude da validare. Non fanno parte dell'archivio.

- [Proposta unica](/_progetto/proposta.md): il documento da leggere per primo, che unifica gli altri quattro.
- [Schema](/_progetto/schema.md): il cervello e il modello dati.
- [Domande](/_progetto/domande.md): che cosa chiederò e come si risponde.
- [Acquisizione](/_progetto/acquisizione.md): dal messaggio alla nota, la skill `/memo`.
- [Migrazione](/_progetto/migrazione.md): inventario, nuovo repo, hosting.
- [Avvio](/_progetto/avvio.md): il prompt da incollare in una nuova chat per avviare l'MVP.
- [Essenza (v2)](/_progetto/v2/essenza.md): che cosa chiedo davvero, principi, scene d'uso e giudizio sulla proposta.
- [v2: il corpus degli esempi in ingresso](/_progetto/v2/esempi-ingresso.md): 68 messaggi realistici e le 10 lezioni per lo schema.
- [v2 · Esempi di domande](/_progetto/v2/esempi-domande.md): 108 domande dal telefono, 25 risposte ideali smontate, 10 lezioni per il progetto.
- [Cervello (v2)](/_progetto/v2/cervello.md): come il cervello tiene ricordi e pensieri, e che cosa ne segue per il modello.
- [Stato dell'arte (v2)](/_progetto/v2/stato-arte.md): chi ha già provato a mappare una coscienza, lezioni e critica della proposta.
- [L'archivio reale](/_progetto/v2/archivio-reale.md): che cosa un mese di Atlante insegna sul modo di pensare dell'utente (raffinamento v2).
- [Restituzione (v2)](/_progetto/v2/restituzione.md): ritratto, convergenze, sogno, confronto, "ti ricordi?" e tre risposte, fatti sui dati veri da giudicare a pancia.
- [Il telefono (v2)](/_progetto/v2/telefono.md): dal tocco al repo e ritorno, verificato sulle fonti, con l'architettura in due tappe e i passi a mano.
- [L'eredità (v2)](/_progetto/v2/eredita.md): l'inventario puntuale di che cosa passa al nuovo sistema (frasi sue, convergenze, entità vive, progetto tatuaggi) e delle regole per lo script di importazione.
- [Citazioni (v2)](/_progetto/v2/citazioni.md): prova sul campo su 25 citazioni e il protocollo di verifica raccomandato.
- [Identità (v2)](/_progetto/v2/identita.md): prova sul campo di Wikidata e MusicBrainz su 30 entità difficili, procedura e abbozzo di `risolvi.mjs`.
- [Modello v2](/_progetto/v2/modello.md) e [banco di prova](/_progetto/v2/banco-di-prova.md): il modello definitivo del secondo giro (4 tipi, 8 predicati, cicli) e i 50 casi per collaudarlo.
- [Coordinamento](/_progetto/v2/coordinamento.md): stato del lavoro, sessioni in corso e prossimi passi.
- [Critica del tempo (v2)](/_progetto/v2/critica-tempo.md): il modello v2 messo alla prova del primo mese, di un anno e di cinque anni; 15 crolli con gravità e correzioni.
- [Critica della semplicità (v2)](/_progetto/v2/critica-semplicita.md): il modello dimezzato sul banco, tre buchi da chiudere (la chat non scrive, identità dei nodi, grammatica dei legami), stime di codice e il nucleo minimo vitale della prima settimana.
- [Simulazione dell'importazione](/_progetto/v2/simulazione/regole-importazione.md): regole R1–R13 con i nomi del modello, [i file importati di un campione](/_progetto/v2/simulazione/importazione.md) e [gli attriti](/_progetto/v2/simulazione/attriti-importazione.md).
- [Modello v3](/_progetto/v2/modello-v3.md): il modello definitivo e autosufficiente (piano dell'AI + script, 4 tipi, 6 predicati, schema JSON, slug, lucchetto, ritmi della restituzione, migrazioni) con il registro delle decisioni rispetto al v2.
- [Banco di prova definitivo (v3)](/_progetto/v2/banco-di-prova-v2.md): i 50 casi corretti dopo la simulazione, 14 prove di restituzione, 10 di tempo e uso, come si esegue e si registra l'esito.
- [Voce (v3)](/_progetto/v2/voce.md) e [prompt operativi](/_progetto/v2/prompt-operativi.md): la guida alla voce del sistema, con esempi buoni e cattivi, e le bozze complete di ogni prompt (CLAUDE.md, smista, consolidamento, lettera, ritratto, "ti ricordi?", sogno, confronto, Specchio), con la prova della voce.
- [Simulazione delle domande](/_progetto/v2/simulazione/domande-simulate.md): le 25 domande del banco eseguite sull'archivio importato (contesto/ simulato, catene per intero, Progetto contro Code) e [gli attriti con i verdetti](/_progetto/v2/simulazione/attriti-domande.md).
- [Simulazione d'ingresso (v3)](/_progetto/v2/simulazione/ingresso.md) e [attriti](/_progetto/v2/simulazione/attriti-ingresso.md): i 25 messaggi del banco passati davvero nel modello v2, con un consolidamento, la lettera della domenica, gli attriti e il verdetto.
- [Piano di implementazione (v3)](/_progetto/v2/piano.md): i blocchi in ordine di dipendenza (giorno 0 → tappa 2), i passi a mano dell'utente, l'eredità portata dall'altro account, il collaudo con le soglie, rischi e piani B, le prove sul campo.
- [Prove di tempo e uso (v4)](/_progetto/v2/simulazione/prova-tempo.md): le dieci prove T eseguite sul modello v3 con dati sintetici (3000 frammenti), un prototipo di `contesto.mjs`, il simulatore del lucchetto e gli indicatori della voce in due scenari, e [gli attriti del tempo](/_progetto/v2/simulazione/attriti-tempo.md).
- [Correzioni delle citazioni](/_progetto/v2/correzioni-citazioni.md): il protocollo applicato alle 24 citazioni (17 vive e 9 segnalate), con le note dell'Atlante corrette.
- [Prova della restituzione](/_progetto/v2/simulazione/prova-restituzione.md): le 14 prove R eseguite sul modello v3 (produttore e giudice cieco per prova, uscite come sul telefono; primo turno 7/14, secondo turno sul v3 finale 10/14 con R01 e R06 fallite per una riga di forma) e [gli attriti](/_progetto/v2/simulazione/attriti-restituzione.md).
- [Prompt v3 (definitivi)](/_progetto/v2/prompt-v3.md): CLAUDE.md del nuovo repo, le quattro Routine (smista, consolida in due fasi, lettera, ritratto), le istruzioni del Progetto con il memo YAML, Specchio, ricordo, sogno e confronto, allineati al modello v3; differenze dai prompt operativi e 15 incoerenze del v3.
- [Pacchetto di implementazione](/_progetto/pacchetto/LEGGIMI.md): la cartella da copiare nel repo nuovo (documenti finali, [prompt di avvio](/_progetto/pacchetto/prompt-avvio.md), `aggiorna.sh` per rigenerarla).
- [Prompt v3: i file per il nuovo repo](/_progetto/v2/prompt-v3.md): `CLAUDE.md` e la cartella `prompt/` (piano, smista, consolida in due fasi, lettera, ritratto, Specchio, ricordo, sogno, confronto, Progetto con il memo YAML), allineati al modello v3 finale; differenze dai prompt operativi e incoerenze residue.
- [Prova a freddo del pacchetto](/_progetto/v2/prova-a-freddo.md): una sessione senza contesto esegue il prompt di avvio fino alla porta del blocco 6; registro di 69 punti (18 gravi), misure, il primo ritratto e il verdetto ("va corretto"); il codice in `_progetto/prova-a-freddo/codice/`.
- [Handoff](/_progetto/handoff.md): il prompt per proseguire su un altro account (checkpoint del 2026-11-01).
