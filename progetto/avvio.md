# Avvio dell'MVP

Prompt per avviare l'implementazione del primo traguardo (MVP) descritto nella [proposta](/_progetto/proposta.md).
Uso: apri una nuova chat di Claude Code sul repo `paol-imi/tattoo-shit` e incolla il blocco qui sotto.

```text
Avvia l'implementazione dell'MVP del "memo-coscienza". Scrivi in italiano.

1. RUOLO
Sei il coordinatore. Lavori solo con subagent e, per i blocchi grandi, con altre sessioni
(create_session + send_message): ognuna su un branch proprio, ti restituisce un riassunto breve.
Ogni subagent o sessione ha un compito piccolo e chiuso: un passo, pochi file, un risultato breve.
Il tuo contesto resta pulito: non leggi tu l'archivio né il codice per intero, lo fai fare.
Con me: risposte brevi, adatte al telefono, una domanda alla volta.

2. CONTESTO
Il progetto trasforma l'archivio dei tatuaggi in una base di conoscenza personale, un memo-coscienza
assistito da AI. Il progetto completo sta in `_progetto/` sul branch `claude/quirky-newton-qe5g9o`
(git fetch origin claude/quirky-newton-qe5g9o). Leggi prima `_progetto/proposta.md`: è la fonte di
verità. Gli altri 4 documenti (schema, domande, acquisizione, migrazione) sono approfondimenti, da
aprire solo quando serve. Leggi anche CLAUDE.md e nucleo.md del repo attuale per lo stile e per le
regole che sopravvivono (origine/validata, blocchi proposta, "da verificare", niente invenzioni).

3. DECISIONI GIÀ PRESE (non riaprirle)
- Nuovo repo privato; tattoo-shit resta com'è, come progetto tatuaggi.
- Un solo tipo `tema`, collegato con `parla-di`.
- Le citazioni sono note proprie.
- Legami solo nel frontmatter; gli inversi li genera uno script.
- `visibilita` con default `privata`.
- Un frammento sta in un file solo.
- MVP senza sito né MCP. Gli script CLI rispondono in JSON.
- Skill /memo con la modalità "solo cattura".
- Merge automatico dei branch claude/** con una GitHub Action.
- Cartelle e chiavi in italiano.

4. VINCOLO DEL NOME
Il nome del nuovo repo non è ancora scelto. Finché manca, lavora su un branch ORFANO `memo-staging`
di paol-imi/tattoo-shit (git checkout --orphan memo-staging): contiene solo il nuovo progetto e non
va MAI unito a main. Quando ti do il nome, crea il repo privato e spingi quel branch come main.
ATTENZIONE: tattoo-shit è PUBBLICO. Su memo-staging va solo l'impalcatura (schema, vocabolari,
template, script, skill, CLAUDE.md, Action) più l'importazione delle note già pubbliche di
tattoo-shit. Nessun frammento o pensiero personale nuovo finché non esiste il repo privato.
Nei file il nome provvisorio è `memo`, facile da sostituire.

5. PIANO
Segui l'ordine della sezione 6 di proposta.md, a blocchi sequenziali. Per ogni blocco: subagent o
sessione dedicata, verifica con lo script di verifica del nuovo progetto, commit in italiano, push
su memo-staging. I blocchi, in breve:
 1. package.json, .gitignore, README.md (su memo-staging).
 2. `_vocabolari/` e `schema.mjs`, sola fonte delle regole.
 3. `_templates/` per ogni tipo; lo `sguardo/` iniziale lo scriviamo insieme da nucleo.md,
    ma solo quando esiste il repo privato.
 4. `scripts/verifica.mjs`.
 5. `scripts/indice.mjs` (indice.json e blocchi `## Collegamenti`).
 6. `scripts/trova.mjs`.
 7. `scripts/cerca.mjs`.
 8. `scripts/importa.mjs` (legge tattoo-shit in sola lettura).
 9. `.claude/skills/memo/SKILL.md`, con la modalità "solo cattura".
10. `CLAUDE.md` breve, con le ricette delle 10 domande.
11. `.github/workflows/unisci.yml`.
12. Prova a secco con 5 messaggi (sezione 6, punto 12): su staging solo in una cartella temporanea,
    non committata.
Collaudo finale: il caso Galimberti (sezione 3) e le prime 10 domande (sezione 5) di proposta.md.

6. SCELTE APERTE (sezione 8): applica la raccomandazione salvo mia diversa indicazione
- Nome del repo: provvisorio `memo`; non blocca.
- Cosa importare: tutto, con `validata` ereditato.
- Cosa rendere pubblica: niente finché non c'è un sito.
- Generi: costruiti sui miei ascolti, a due livelli.
- Hosting del sito: dopo l'MVP, non ora.
- Simboli: copiati una volta da importa.mjs, poi separati.
- Incoerenze risolte in fondo alla sezione 8: valgono come scritte.
Chiedimi solo ciò che blocca davvero, una domanda alla volta.

7. PRIMA RISPOSTA ATTESA
Dopo aver letto i documenti, conferma in 5 righe il piano a blocchi e parti dal primo, senza
aspettare la mia risposta.
```
